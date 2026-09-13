import xml.etree.ElementTree as ET
import os, re, json, shutil

SCRATCH_DIR = '/Users/nguyenchilinh/.gemini/antigravity/brain/94458d52-e892-4d05-8293-cbc33bc71266/scratch'
XML_PATH = os.path.join(SCRATCH_DIR, 'theory.xml')
OUTPUT_JSON = '/Users/nguyenchilinh/Desktop/furerschein/data/theory_questions.json'
IMAGE_DEST_DIR = '/Users/nguyenchilinh/Desktop/furerschein/public/images/theory'

os.makedirs(os.path.dirname(OUTPUT_JSON), exist_ok=True)
os.makedirs(IMAGE_DEST_DIR, exist_ok=True)

GREEN_SET = {'#00af50', '#00b050', '#008000', '#00ff00', '#228b22', '#32cd32', '#00a651', '#009933', '#107c41'}
BLUE_SET = {'#006fc0', '#00afef', '#0070c0', '#002060', '#0000ff', '#1f497d', '#2f5597', '#418ab3'}

def is_green(hex_col):
    if not hex_col: return False
    hex_col = hex_col.lower()
    if hex_col in GREEN_SET: return True
    if hex_col.startswith('#') and len(hex_col) == 7:
        try:
            r = int(hex_col[1:3], 16)
            g = int(hex_col[3:5], 16)
            b = int(hex_col[5:7], 16)
            return g > 130 and r < 80 and b < 100
        except ValueError:
            pass
    return False

def clean_text(t):
    t = re.sub(r'\s+', ' ', t)
    return t.strip()

def split_de_vn(text):
    if '**' in text:
        parts = text.split('**', 1)
        return clean_text(parts[0]), clean_text(parts[1])
    return clean_text(text), ''

def parse_theory():
    print(f"Loading XML from {XML_PATH}...")
    tree = ET.parse(XML_PATH)
    root = tree.getroot()
    pages = root.findall('page')
    print(f"Total pages: {len(pages)}")

    # Build global font dictionary across all pages
    global_fonts = {f.attrib['id']: f.attrib.get('color', '#000000').lower() for f in root.findall('.//fontspec')}
    print(f"Global font specs loaded: {len(global_fonts)}")

    all_questions = []
    global_q_id = 1
    current_category = "Grundstoff"

    for p in pages:
        p_num = int(p.attrib.get('number', 0))
        # Keep global fonts
        fonts = global_fonts

        # Extract images on this page
        page_images = []
        for img in p.findall('image'):
            src = img.attrib.get('src', '')
            if src.endswith('.jpg'):
                filename = os.path.basename(src)
                # handle poppler naming where src might be /path/to/theory-X_Y.jpg
                if not os.path.exists(os.path.join(SCRATCH_DIR, filename)):
                    suffix = filename.split('-')[-1]
                    filename = f"theory-{suffix}"
                
                full_src = os.path.join(SCRATCH_DIR, filename)
                if os.path.exists(full_src):
                    top = int(img.attrib.get('top', 0))
                    page_images.append({'top': top, 'file': filename, 'path': full_src})

        # Group text by vertical lines (bucket 4px)
        texts = p.findall('text')
        line_dict = {}
        for t in texts:
            txt = ''.join(t.itertext())
            if not txt.strip():
                continue
            top = int(t.attrib.get('top', 0))
            left = int(t.attrib.get('left', 0))
            fid = t.attrib.get('font')
            color = fonts.get(fid, '#000000').lower()

            bucket = None
            for b in line_dict:
                if abs(top - b) <= 4:
                    bucket = b
                    break
            if bucket is None:
                bucket = top
                line_dict[bucket] = []
            line_dict[bucket].append({'left': left, 'color': color, 'text': txt})

        # Sort lines top to bottom
        sorted_tops = sorted(line_dict.keys())
        lines = []
        for top in sorted_tops:
            line_dict[top].sort(key=lambda x: x['left'])
            full_line_txt = ''.join([x['text'] for x in line_dict[top]]).strip()
            if 'Grundstoff/' in full_line_txt or 'Zusatzstoff/' in full_line_txt:
                current_category = clean_text(full_line_txt)
                continue
            if 'hoclaixetaiduc' in full_line_txt:
                continue
            lines.append({
                'top': top,
                'items': line_dict[top],
                'text': full_line_txt
            })

        # Find questions on this page
        q_indices = []
        for i, l in enumerate(lines):
            m = re.match(r'^(?:<b>\s*)?Câu\s+(\d+)[\.:]?(.*)$', l['text'], re.IGNORECASE)
            if m:
                q_indices.append((i, l))

        for idx, (line_idx, q_line) in enumerate(q_indices):
            next_q_line_idx = q_indices[idx + 1][0] if idx + 1 < len(q_indices) else len(lines)
            q_slice = lines[line_idx:next_q_line_idx]

            header_text = q_line['text']
            header_clean = re.sub(r'<[^>]+>', '', header_text)
            
            code_match = re.search(r'(\d+\.\d+\.\d+(?:-\d+)?(?:-[A-Za-z0-9]+)?)', header_clean)
            q_code = code_match.group(1) if code_match else f"Q-{p_num}-{idx+1}"

            points_match = re.search(r'Punkte[:\s.]*(\d+)', header_clean, re.IGNORECASE)
            if not points_match:
                points_match = re.search(r'\((\d+)\s*Punkte', header_clean, re.IGNORECASE)
            points = int(points_match.group(1)) if points_match else 4
            # Sanity check: points should be 2-5 for the real exam
            if points > 5:
                points = 4  # fallback default

            q_top_start = q_slice[0]['top']
            q_top_end = q_slice[-1]['top'] + 100
            matched_image = None
            for img in page_images:
                if len(q_indices) == 1:
                    matched_image = img
                    break
                elif q_top_start - 30 <= img['top'] <= q_top_end:
                    matched_image = img
                    break

            image_filename = None
            if matched_image:
                image_filename = f"q_{q_code.replace('.', '_').replace('-', '_')}.jpg"
                dest_path = os.path.join(IMAGE_DEST_DIR, image_filename)
                if not os.path.exists(dest_path):
                    shutil.copyfile(matched_image['path'], dest_path)

            q_text_lines = []
            options = []
            curr_opt = None

            for l in q_slice[1:]:
                txt = l['text']
                is_opt_start = False
                stripped = txt.strip()
                if stripped.startswith('-') or stripped.startswith('•') or stripped.startswith('–'):
                    is_opt_start = True
                elif len(l['items']) > 0 and l['items'][0]['text'].strip() in ['-', '•', '–']:
                    is_opt_start = True

                if is_opt_start:
                    if curr_opt:
                        options.append(curr_opt)
                    curr_opt = {
                        'text_items': list(l['items']),
                        'raw_text': txt
                    }
                else:
                    if curr_opt is not None:
                        curr_opt['text_items'].extend(l['items'])
                        curr_opt['raw_text'] += ' ' + txt
                    else:
                        q_text_lines.append(l)

            if curr_opt:
                options.append(curr_opt)

            full_q_text = ' '.join([l['text'] for l in q_text_lines])
            q_de, q_vn = split_de_vn(full_q_text)
            if not q_vn:
                de_parts = []
                vn_parts = []
                for l in q_text_lines:
                    for it in l['items']:
                        if it['color'] in BLUE_SET:
                            vn_parts.append(it['text'])
                        else:
                            de_parts.append(it['text'])
                if vn_parts:
                    q_de = clean_text(''.join(de_parts))
                    q_vn = clean_text(''.join(vn_parts))

            parsed_options = []
            for opt_idx, opt in enumerate(options):
                raw = opt['raw_text']
                raw = re.sub(r'^[\s\-•–]+', '', raw).strip()
                opt_de, opt_vn = split_de_vn(raw)

                has_green = False
                for it in opt['text_items']:
                    if is_green(it['color']):
                        has_green = True
                        break

                if not opt_vn:
                    de_p = []
                    vn_p = []
                    for it in opt['text_items']:
                        if it['color'] in BLUE_SET:
                            vn_p.append(it['text'])
                        else:
                            de_p.append(it['text'])
                    if vn_p:
                        opt_de = clean_text(''.join(de_p).lstrip('-•– '))
                        opt_vn = clean_text(''.join(vn_p))

                parsed_options.append({
                    'id': f"opt_{opt_idx + 1}",
                    'text_de': opt_de,
                    'text_vn': opt_vn,
                    'isCorrect': has_green
                })

            is_numerical = len(parsed_options) == 0

            category_main = "Zusatzstoff (Hạng B)" if "Zusatzstoff" in current_category else "Grundstoff (Cơ bản)"
            topic_clean = current_category.split('/')[-1].strip() if '/' in current_category else current_category

            all_questions.append({
                'id': global_q_id,
                'code': q_code,
                'page': p_num,
                'points': points,
                'category': category_main,
                'topic': topic_clean,
                'category_full': current_category,
                'question_de': q_de,
                'question_vn': q_vn,
                'image': f"/images/theory/{image_filename}" if image_filename else None,
                'is_numerical': is_numerical,
                'options': parsed_options
            })
            global_q_id += 1

    print(f"\nExtraction complete! Total questions extracted: {len(all_questions)}")
    
    with_img = sum(1 for q in all_questions if q['image'])
    with_opts = sum(1 for q in all_questions if len(q['options']) > 0)
    has_correct = sum(1 for q in all_questions if any(o['isCorrect'] for o in q['options']))
    five_pts = sum(1 for q in all_questions if q['points'] == 5)

    print(f"Questions with image: {with_img}")
    print(f"Questions with options: {with_opts}")
    print(f"Questions with verified correct answers: {has_correct}")
    print(f"5-Punkte (câu điểm liệt) questions: {five_pts}")

    with open(OUTPUT_JSON, 'w', encoding='utf-8') as f:
        json.dump(all_questions, f, ensure_ascii=False, indent=2)
    print(f"Saved to {OUTPUT_JSON}")

if __name__ == '__main__':
    parse_theory()
