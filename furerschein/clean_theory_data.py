import json
import re

DATA_FILE = 'furerschein-app/src/data/theory_questions.json'

with open(DATA_FILE, 'r', encoding='utf-8') as f:
    questions = json.load(f)

print(f"Initial count: {len(questions)}")

# Dictionary for quick ID lookup
q_map = {q['id']: q for q in questions}

# -------------------------------------------------------------
# 1. FIX 15 QUESTIONS WITH MISSING/WRONG CORRECT ANSWERS
# -------------------------------------------------------------

# ID 361 (1.2.34-002) - Va chạm xe đỗ
if 361 in q_map:
    for o in q_map[361]['options']:
        o['isCorrect'] = (o['id'] == 'opt_2')

# ID 362 (1.2.34-004) - Tai nạn hầm
if 362 in q_map:
    for o in q_map[362]['options']:
        o['isCorrect'] = o['id'] in ['opt_1', 'opt_2']

# ID 363 (1.2.34-005) - Số khẩn cấp
if 363 in q_map:
    q_map[363]['options'] = [
        {'id': 'opt_1', 'text_de': '110', 'text_vn': '110 (Cảnh sát)', 'isCorrect': True},
        {'id': 'opt_2', 'text_de': '112', 'text_vn': '112 (Cứu thương & Cứu hỏa)', 'isCorrect': True},
        {'id': 'opt_3', 'text_de': '115', 'text_vn': '115 (Dịch vụ hành chính công)', 'isCorrect': False}
    ]

# ID 364 (1.2.34-006) - Giấy tờ trình ra
if 364 in q_map:
    for o in q_map[364]['options']:
        o['isCorrect'] = o['id'] in ['opt_1', 'opt_2']

# ID 365 (1.2.34-102) - Thứ tự sơ cứu
if 365 in q_map:
    q_map[365]['options'] = [
        {
            'id': 'opt_1',
            'text_de': 'Erste Hilfe leisten - Rettungsdienst alarmieren - Unfallstelle absichern',
            'text_vn': 'Sơ cứu người bị thương – Gọi cấp cứu – Đảm bảo an toàn nơi tai nạn',
            'isCorrect': False
        },
        {
            'id': 'opt_2',
            'text_de': 'Rettungsdienst alarmieren - Unfallstelle absichern - Erste Hilfe leisten',
            'text_vn': 'Gọi cấp cứu – Đảm bảo an toàn nơi tai nạn – Sơ cứu người bị thương',
            'isCorrect': False
        },
        {
            'id': 'opt_3',
            'text_de': 'Unfallstelle absichern - Erste Hilfe leisten - Rettungsdienst alarmieren',
            'text_vn': 'Đảm bảo an toàn nơi tai nạn – Sơ cứu người bị thương – Gọi cấp cứu',
            'isCorrect': True
        }
    ]

# ID 366 (1.2.34-103) - Làm gì đầu tiên
if 366 in q_map:
    for o in q_map[366]['options']:
        o['isCorrect'] = (o['id'] == 'opt_2')

# ID 367 (1.2.34-106) - Gọi cứu hộ cao tốc
if 367 in q_map:
    for o in q_map[367]['options']:
        o['isCorrect'] = o['id'] in ['opt_1', 'opt_3']

# ID 368 (1.2.34-109) - Tai nạn trong hầm
if 368 in q_map:
    for o in q_map[368]['options']:
        o['isCorrect'] = o['id'] in ['opt_1', 'opt_3']

# ID 369 (1.2.34-110) - Trách nhiệm người gây tai nạn
if 369 in q_map:
    for o in q_map[369]['options']:
        o['isCorrect'] = True

# ID 370 (1.2.34-111) - Đảm bảo an toàn đường liên tỉnh
if 370 in q_map:
    for o in q_map[370]['options']:
        o['isCorrect'] = o['id'] in ['opt_2', 'opt_3']

# ID 371 (1.2.34-112) - Đường ngắn nhất tới cột cứu hộ
if 371 in q_map:
    for o in q_map[371]['options']:
        o['isCorrect'] = (o['id'] == 'opt_2')

# ID 372 (1.2.34-113) - Trách nhiệm khi gặp tai nạn
if 372 in q_map:
    for o in q_map[372]['options']:
        o['isCorrect'] = True

# ID 502 (1.4.41-115) - Làn xe buýt
if 502 in q_map:
    for o in q_map[502]['options']:
        o['isCorrect'] = (o['id'] == 'opt_2')

# ID 861 (2.2.17-107) - Standlicht ban đêm
if 861 in q_map:
    q_map[861]['options'] = [
        {
            'id': 'opt_1',
            'text_de': 'Ja, wenn innerorts die Fahrbahn ausreichend beleuchtet ist.',
            'text_vn': 'Có, nếu trong khu dân cư khi đường có đủ đèn chiếu sáng',
            'isCorrect': False
        },
        {
            'id': 'opt_2',
            'text_de': 'Nein.',
            'text_vn': 'Không (Không được phép lái xe chỉ bằng đèn đỗ/đèn téc)',
            'isCorrect': True
        },
        {
            'id': 'opt_3',
            'text_de': 'Ja, wenn Sie außerorts in einer Kolonne fahren.',
            'text_vn': 'Có, nếu đi bên ngoài khu dân cư trong 1 đoàn xe',
            'isCorrect': False
        }
    ]

# ID 964 (2.4.42-001) - Biển kết thúc Autobahn
if 964 in q_map:
    q_map[964]['options'] = [
        {
            'id': 'opt_1',
            'text_de': 'Auf eine vorübergehende Sperrung der Autobahn.',
            'text_vn': 'Đường cao tốc phía trước bị chặn tạm thời',
            'isCorrect': False
        },
        {
            'id': 'opt_2',
            'text_de': 'Auf das Ende der Autobahn.',
            'text_vn': 'Kết thúc đường cao tốc (Ende der Autobahn)',
            'isCorrect': True
        },
        {
            'id': 'opt_3',
            'text_de': 'Auf das Ende der Kraftfahrstraße.',
            'text_vn': 'Kết thúc đường dành cho xe cơ giới',
            'isCorrect': False
        }
    ]

# -------------------------------------------------------------
# 2. CLEAN UP CORRUPTED OPTIONS (193, 872, 780)
# -------------------------------------------------------------

# ID 193 - Bremsweg Faustformel
if 193 in q_map:
    q_map[193]['options'] = [
        {
            'id': 'opt_1',
            'text_de': '(Geschwindigkeit in km/h / 10) * (Geschwindigkeit in km/h / 10)',
            'text_vn': '(Vận tốc km/h : 10) x (Vận tốc km/h : 10)',
            'isCorrect': True
        },
        {
            'id': 'opt_2',
            'text_de': '(Geschwindigkeit in km/h / 10) * 3',
            'text_vn': '(Vận tốc km/h : 10) x 3',
            'isCorrect': False
        },
        {
            'id': 'opt_3',
            'text_de': '(Geschwindigkeit in km/h / 10) * 5',
            'text_vn': '(Vận tốc km/h : 10) x 5',
            'isCorrect': False
        }
    ]

# ID 872 (2.2.18-011) - Rettungsgasse 3 Fahrstreifen
if 872 in q_map:
    q_map[872]['options'] = [
        {
            'id': 'opt_1',
            'text_de': 'Zwischen dem mittleren und dem rechten Fahrstreifen.',
            'text_vn': 'Giữa làn giữa và làn bên phải',
            'isCorrect': False
        },
        {
            'id': 'opt_2',
            'text_de': 'Auf dem Seitenstreifen.',
            'text_vn': 'Trên làn dừng khẩn cấp (Seitenstreifen)',
            'isCorrect': False
        },
        {
            'id': 'opt_3',
            'text_de': 'Zwischen dem linken und dem mittleren Fahrstreifen.',
            'text_vn': 'Giữa làn ngoài cùng bên trái và làn bên cạnh',
            'isCorrect': True
        }
    ]

# ID 780 (2.2.03-015) - Faustformel Gefahrbremsung
if 780 in q_map:
    q_map[780]['options'] = [
        {
            'id': 'opt_1',
            'text_de': '((Geschwindigkeit in km/h / 10) * (Geschwindigkeit in km/h / 10)) / 2',
            'text_vn': '((Vận tốc km/h : 10) x (Vận tốc km/h : 10)) chia 2',
            'isCorrect': True
        },
        {
            'id': 'opt_2',
            'text_de': '(Geschwindigkeit in km/h / 10) * (Geschwindigkeit in km/h / 10)',
            'text_vn': '(Vận tốc km/h : 10) x (Vận tốc km/h : 10)',
            'isCorrect': False
        },
        {
            'id': 'opt_3',
            'text_de': '(Geschwindigkeit in km/h / 10) * 3',
            'text_vn': '(Vận tốc km/h : 10) x 3',
            'isCorrect': False
        }
    ]

# -------------------------------------------------------------
# 3. SPLIT SWALLOWED QUESTIONS (739, 839, 1031)
# -------------------------------------------------------------

# Fix #739: Split into 739 (2.1.10-003), 739b (2.1.10-004), 739c (2.1.10-005)
if 739 in q_map:
    q739 = q_map[739]
    q739['question_de'] = 'Welche Gefahr kann bei der Nutzung von Fahrerassistenzsystemen bestehen? Der Fahrzeugführer kann'
    q739['question_vn'] = 'Những nguy hiểm nào có thể có khi sử dụng hệ thống hỗ trợ lái xe? Người lái xe có thể'
    q739['code'] = '2.1.10-003'
    q739['points'] = 3
    q739['options'] = [
        {'id': 'opt_1', 'text_de': 'zu wenig auf das Verkehrsgeschehen achten.', 'text_vn': 'quá ít chú ý đến tình hình giao thông', 'isCorrect': True},
        {'id': 'opt_2', 'text_de': 'die Eigenverantwortung vernachlässigen.', 'text_vn': 'bỏ qua trách nhiệm của bản thân', 'isCorrect': True},
        {'id': 'opt_3', 'text_de': 'falsche Erwartungen an die Systeme haben.', 'text_vn': 'có kỳ vọng sai lệch vào hệ thống', 'isCorrect': True}
    ]

    new_739b = {
        'id': 1125,
        'code': '2.1.10-004',
        'page': 322,
        'points': 3,
        'category': q739['category'],
        'topic': q739['topic'],
        'category_full': q739['category_full'],
        'question_de': 'Welche Gefahr kann bei der Nutzung von Fahrerassistenzsystemen bestehen?',
        'question_vn': 'Nguy hiểm nào có thể phát sinh khi sử dụng hệ thống hỗ trợ lái xe?',
        'image': None,
        'is_numerical': False,
        'options': [
            {'id': 'opt_1', 'text_de': 'Ich kann von meinem Fahrstreifen abkommen.', 'text_vn': 'Tôi có thể bị chệch khỏi làn đường', 'isCorrect': True},
            {'id': 'opt_2', 'text_de': 'Ich kann Verkehrszeichen übersehen.', 'text_vn': 'Tôi có thể bỏ sót biển báo giao thông', 'isCorrect': True},
            {'id': 'opt_3', 'text_de': 'Mein Anhalteweg kann sich verkürzen.', 'text_vn': 'Quãng đường dừng xe của tôi có thể ngắn lại', 'isCorrect': False}
        ]
    }

    new_739c = {
        'id': 1126,
        'code': '2.1.10-005',
        'page': 322,
        'points': 4,
        'category': q739['category'],
        'topic': q739['topic'],
        'category_full': q739['category_full'],
        'question_de': 'Welche Ursache kann dazu führen, dass ein Fahrerassistenzsystem eine Gefahrensituation nicht rechtzeitig erkennt?',
        'question_vn': 'Nguyên nhân nào khiến hệ thống hỗ trợ lái xe không nhận biết kịp thời tình huống nguy hiểm?',
        'image': None,
        'is_numerical': False,
        'options': [
            {'id': 'opt_1', 'text_de': 'übermüdet sind.', 'text_vn': 'quá mệt mỏi', 'isCorrect': True},
            {'id': 'opt_2', 'text_de': 'körperlich erschöpft sind.', 'text_vn': 'kiệt sức về thể chất', 'isCorrect': True},
            {'id': 'opt_3', 'text_de': 'fahruntauglich sind.', 'text_vn': 'không đủ điều kiện sức khỏe để lái xe', 'isCorrect': True}
        ]
    }
    questions.extend([new_739b, new_739c])

# Fix #839: Split into 839 (2.2.14-105) and 839b (2.2.14-106)
if 839 in q_map:
    q839 = q_map[839]
    q839['question_de'] = 'Was ist beim Ein- oder Aussteigen von Kindern richtig?'
    q839['question_vn'] = 'Điều gì là đúng khi trẻ em lên hoặc xuống xe?'
    q839['code'] = '2.2.14-105'
    q839['points'] = 4
    q839['options'] = [
        {'id': 'opt_1', 'text_de': 'Kinder auf der Fahrbahnseite nur unter Beaufsichtigung ein- oder aussteigen lassen', 'text_vn': 'Cho trẻ em lên/xuống phía lòng đường chỉ khi có sự giám sát', 'isCorrect': True},
        {'id': 'opt_2', 'text_de': 'Kinder möglichst auf der Gehwegseite ein- oder aussteigen lassen', 'text_vn': 'Cho trẻ em lên/xuống xe ở phía lề đường dành cho người đi bộ nếu có thể', 'isCorrect': True}
    ]

    new_839b = {
        'id': 1127,
        'code': '2.2.14-106',
        'page': 359,
        'points': 3,
        'category': q839['category'],
        'topic': q839['topic'],
        'category_full': q839['category_full'],
        'question_de': 'Was ist beim Öffnen der Fahrzeugtüren zu beachten?',
        'question_vn': 'Cần chú ý điều gì khi mở cửa xe ô tô?',
        'image': None,
        'is_numerical': False,
        'options': [
            {'id': 'opt_1', 'text_de': 'nach links der fließende Verkehr zu beachten ist.', 'text_vn': 'phía bên trái cần chú ý dòng xe cộ đang lưu thông', 'isCorrect': True},
            {'id': 'opt_2', 'text_de': 'nach rechts auf Fußgänger zu achten ist.', 'text_vn': 'phía bên phải cần chú ý người đi bộ', 'isCorrect': True}
        ]
    }
    questions.append(new_839b)

# Fix #1031: Clean options for 2.7.01-043
if 1031 in q_map:
    q1031 = q_map[1031]
    q1031['code'] = '2.7.01-043'
    q1031['points'] = 3
    q1031['question_de'] = 'Welche besondere Eigenschaft von Scheibenbremsen müssen Sie bei nasser Fahrbahn berücksichtigen?'
    q1031['question_vn'] = 'Đặc tính đặc biệt nào của phanh đĩa bạn phải lưu ý khi lái xe trên mặt đường ướt?'
    q1031['options'] = [
        {'id': 'opt_1', 'text_de': 'Die Wirkung von Scheibenbremsen setzt in der Regel früher ein als auf trockener Fahrbahn', 'text_vn': 'Tác dụng của phanh đĩa thường xuất hiện sớm hơn trên đường khô', 'isCorrect': False},
        {'id': 'opt_2', 'text_de': 'Die Wirkung von Scheibenbremsen setzt in der Regel später ein als auf trockener Fahrbahn', 'text_vn': 'Tác dụng của phanh đĩa thường xuất hiện muộn hơn so với trên đường khô', 'isCorrect': True}
    ]

# -------------------------------------------------------------
# 4. FIX MISSING VIETNAMESE QUESTION TRANSLATIONS
# -------------------------------------------------------------
vn_translations = {
    54: 'Cần phải tính đến hành vi nào của người đi bộ tại vạch sang đường?',
    83: 'Bạn cần chú ý điều gì khi lái xe vào hầm để xe (Tiefgarage)?',
    403: 'Có ý nghĩa gì khi một phương tiện bật đèn nhấp nháy màu xanh nhưng không có còi ưu tiên?',
    722: 'Bạn cần tính đến điều gì khi gặp đoạn đường dốc trên đường cao tốc?',
    961: 'Biển báo giao thông này chỉ dẫn điều gì?',
    977: 'Bạn cần hỗ trợ trên đường cao tốc. Cột mốc ki-lô-mét cung cấp thông tin gì cho bạn?'
}

for qid, trans in vn_translations.items():
    if qid in q_map:
        q_map[qid]['question_vn'] = trans

# -------------------------------------------------------------
# 5. CLEAN UP DIRTY TOPIC STRINGS ACROSS ALL QUESTIONS
# -------------------------------------------------------------
for q in questions:
    cat = q.get('category_full', '')
    if 'https://www.facebook.com' in cat or 'hoclaixe' in cat:
        cat = cat.split('https')[0].strip()
        q['category_full'] = cat
        q['topic'] = cat.split('/')[-1].strip()

    # Typo fixes
    if 'Prlichten' in q.get('category_full', ''):
        q['category_full'] = q['category_full'].replace('Prlichten', 'Pflichten')
        q['topic'] = q['topic'].replace('Prlichten', 'Pflichten')

    if 'Straßenbenuzung' in q.get('category_full', ''):
        q['category_full'] = q['category_full'].replace('Straßenbenuzung', 'Straßenbenutzung')
        q['topic'] = q['topic'].replace('Straßenbenuzung', 'Straßenbenutzung')

    if 'Verhaltenim Straßenverkehr' in q.get('category_full', ''):
        q['category_full'] = q['category_full'].replace('Verhaltenim Straßenverkehr', 'Verhalten im Straßenverkehr')

    if 'Verhalten anFußgängerüberwegen' in q.get('category_full', ''):
        q['category_full'] = q['category_full'].replace('Verhalten anFußgängerüberwegen', 'Verhalten an Fußgängerüberwegen')

# Re-sort questions by ID
questions.sort(key=lambda x: x['id'])

print(f"Final cleaned count: {len(questions)}")

# Write cleaned data back
with open(DATA_FILE, 'w', encoding='utf-8') as f:
    json.dump(questions, f, ensure_ascii=False, indent=2)

print("Successfully cleaned and saved theory_questions.json!")
