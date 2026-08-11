# Restructure AzubiHub Repo into Folders — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Di chuyển toàn bộ repo thành cấu trúc folder rõ ràng (faecher/klassenarbeiten/js/images/quellen) mà app chạy y nguyên.

**Architecture:** App là PWA tĩnh (HTML/JS thuần, không build step). Mọi đường dẫn là relative — việc cấu trúc lại = di chuyển file + cập nhật toàn bộ tham chiếu. Có 1 "test harness" (Node script kiểm tra tồn tại file) chạy sau mỗi task để bắt 404.

**Tech Stack:** HTML/JS thuần, bash (git mv, sed), Node >= 18 (script kiểm tra).

## Global Constraints

- `sw.js` BẮT BUỘC ở root (PWA scope). `pwa.js` ở root (head mọi trang ref tương đối).
- `_bfk_1_notes/fk_exel/` **giữ NGUYÊN 100%** — không sửa gì bên trong.
- `sla-lf3.md` (root) == `_bfk_1_notes/sla-lf3.md` (cùng md5 `ddbb4919fd84f631cd184a4ac98b4a8f`) → chỉ giữ 1 bản.
- Tên folder: `faecher/`, `klassenarbeiten/`, `js/`, `images/`, `quellen/` (viết thường, không dấu).
- Mọi tham chiếu được cập nhật ĐỒNG BỘ: nếu 1 file còn ref cũ → FAIL verification.
- Giữ nguyên giá trị `?v=` của script src (URL mới tự cache-bust); chỉ đổi path.
- CACHE sw: `azubihub-v105` → `azubihub-v106`.

---

### Task 1: Vá chatbox.js (fetch api/ai tương đối) + tạo test harness

**Bối cảnh:** `chatbox.js` gọi `fetch('api/ai', …)` (dòng 206, 651) — relative theo PAGE. Khi trang ở `klassenarbeiten/`, path đó thành `klassenarbeiten/api/ai` → 404. Chữa bằng helper tính app-root từ `document.currentScript.src` (chatbox.js LUÔN nằm ở `<root>/js/chatbox.js`).

**Files:**
- Modify: `chatbox.js:206`, `chatbox.js:651` (+ thêm function `aiApiUrl`)
- Create: `test/verify-links.mjs`

- [ ] **Step 1: Tạo test harness `test/verify-links.mjs`**

```js
#!/usr/bin/env node
/* AzubiHub static link checker — verify-links.mjs
 * Crawl mọi .html/.js/.webmanifest (trừ quellen/docs/.git/test/api/breakdown-plan/_bfk_1_notes)
 * và kiểm tra tồn tại file cho từng tham chiếu local (src/href/url()/PRECACHE/folder field).
 * Chấp nhận resolve theo (a) thư mục chứa file, (b) ROOT (refs page-relative nằm trong JS). */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(new URL('..', import.meta.url).pathname);
const SKIP_DIRS = new Set(['.git', 'quellen', 'docs', 'node_modules', '_bfk_1_notes', 'breakdown-plan', 'test', 'api', 'wiko', '_ocr']);
let errors = 0;

function walk(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.name.startsWith('.') || SKIP_DIRS.has(ent.name)) continue;
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, out);
    else if (/\.(html|js|webmanifest)$/.test(ent.name)) out.push(p);
  }
  return out;
}

function resolve(file, r) {
  if (!r || r.startsWith('#') || /^(https?:|data:|blob:|mailto:|tel:|\/\/|\/)/.test(r)) return null;
  const clean = r.split(/[?#]/)[0];
  if (!clean) return null;
  return clean;
}

function refsIn(file) {
  const txt = fs.readFileSync(file, 'utf8');
  const check = (r) => {
    const clean = r.split(/[?#]/)[0];
    if (!clean || clean.startsWith('#') || /^(https?:|data:|blob:|mailto:|tel:|\/\/|\/)/.test(clean)) return;
    if (/['"`+=${]/.test(clean)) return;                    // template/JS-concat gadget
    if (!/\.(html|js|png|jpg|jpeg|webmanifest|svg|css|xlsx|pdf|zip|md)$/.test(clean)) return;
    const a = path.resolve(path.dirname(file), clean);
    const b = path.resolve(ROOT, clean);
    if (!fs.existsSync(a) && !fs.existsSync(b)) {
      errors++;
      console.error('[MISSING] ' + path.relative(ROOT, file) + ' → ' + clean);
    }
  };
  if (file.endsWith('.html')) {
    for (const m of txt.matchAll(/(?:src|href)=["']([^"']+)["']/g)) check(m[1]);
    for (const m of txt.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/g)) check(m[1]);
    for (const m of txt.matchAll(/["'`]([^"'`\s]+?\.(?:html|js|png|jpg|jpeg|webmanifest|svg))["'`]/g)) check(m[1]);
  }
  if (file.endsWith('.js')) {
    for (const m of txt.matchAll(/["'`]([^"'`\s]+?\.(?:html|js|png|jpg|jpeg|webmanifest|svg|css))["'`]/g)) check(m[1]);
    if (/faecher\.js|bfk1-data\.js$/.test(file)) {
      for (const m of txt.matchAll(/folder\s*:\s*["']([^"']+)["']/g)) check(m[1] + '/');
    }
  }
  if (file.endsWith('sw.js')) {
    for (const m of txt.matchAll(/['"]\.\/([^'"]+)['"]/g)) check(m[1]);
  }
  if (file.endsWith('chatbox.js')) {
    if (/fetch\(\s*['"]api\/ai['"]/.test(txt)) {
      errors++;
      console.error('[VÁ-CHƯA-LÀM] chatbox.js vẫn dùng fetch("api/ai") tương đối');
    }
  }
}

for (const f of walk(ROOT)) refsIn(f);
console.log(errors === 0 ? 'PASS: mọi tham chiếu local đều tồn tại' : 'FAIL: ' + errors + ' lỗi');
process.exit(errors === 0 ? 0 : 1);
```

- [ ] **Step 2: Chạy harness — phải FAIL**

Run: `node test/verify-links.mjs`
Expected: `FAIL: 2 lỗi` — gồm `[VÁ-CHƯA-LÀM] chatbox.js vẫn dùng fetch("api/ai") tương đối` (+1 MISSING `wissen.js`? Không — trước khi di chuyển mọi file đều hiện diện; chỉ có lỗi VÁ. Nếu FAIL do lỗi khác → xem [MISSING] rồi quyết định.)

- [ ] **Step 3: Thêm helper + thay 2 fetch trong `chatbox.js`**

Thêm ngay sau `function aiBase() {...}` (dòng ~172):

```js
  function aiApiUrl() {
    var sc = document.currentScript && document.currentScript.src;
    var m = sc ? sc.match(/^(.*\/)js\/chatbox\.js/) : null;
    return (m ? m[1] : './') + 'api/ai';
  }
```

Thay:
- `var res = await fetch('api/ai', {`  →  `var res = await fetch(aiApiUrl(), {`
- `fetch('api/ai', { method: 'GET' })`  →  `fetch(aiApiUrl(), { method: 'GET' })`

- [ ] **Step 4: Chạy harness + node --check**

Run: `node test/verify-links.mjs && node --check chatbox.js`
Expected: `PASS: mọi tham chiếu local đều tồn tại` và không lỗi syntax.

- [ ] **Step 5: Commit**

```bash
git add test/verify-links.mjs chatbox.js
git commit -m "fix: chatbox AI api path root-aware (prep for folder restructure)"
```

---

### Task 2: Di chuyển core JS → js/ + data/quiz → faecher/<môn>/ và cập nhật script src

**Files:**
- Create: `js/`, `faecher/bfk1/`, `faecher/bfk2/`, `faecher/deutsch/`, `faecher/gk/`
- Move (git mv) 10 file → `js/`: supabase.js, access.js, guard.js, vocab.js, wissen.js, chatbox.js, diagrams.js, faecher.js, challenge.js, challenge-data.js
- Move (git mv) 17 file → `faecher/bfk1/`: bfk1-catalog.js, bfk1-data.js, bfk1-extra-data.js, bfk1-extra-p1..p6.js, bfk1-lf2-data.js, bfk1-lf2-p1..p5.js, bfk1-lf3-data.js, bfk1-lf3-p1..p5.js, bfk1-lf6-data.js, bfk1-lf6-p1..p7.js, bfk1-lf9-data.js, bfk1-lf9-p1..p3.js, bfk1-quiz.js
- Move → `faecher/bfk2/`: bfk2-quiz.js. → `faecher/deutsch/`: deutsch-quiz.js. → `faecher/gk/`: gk-gle-data.js, gk-uebungen.js
- Modify: `index.html:918,1602-1641,5547-5548` (script srcs), `challenge.html:207-217`, `admin.html` (srcs)

**Interfaces:** index.html/challenge.html/admin.html load mọi file mới với giá trị `?v=` GIỮ NGUYÊN.

- [ ] **Step 1: git mv toàn bộ (1 lệnh)**

```bash
mkdir -p js faecher/bfk1 faecher/bfk2 faecher/deutsch faecher/gk && \
git mv supabase.js access.js guard.js vocab.js wissen.js chatbox.js diagrams.js faecher.js challenge.js challenge-data.js js/ && \
git mv bfk1-catalog.js bfk1-data.js bfk1-extra-data.js bfk1-extra-p1.js bfk1-extra-p2.js bfk1-extra-p3.js bfk1-extra-p4.js bfk1-extra-p5.js bfk1-extra-p6.js bfk1-lf2-data.js bfk1-lf2-p1.js bfk1-lf2-p2.js bfk1-lf2-p3.js bfk1-lf2-p4.js bfk1-lf2-p5.js bfk1-lf3-data.js bfk1-lf3-p1.js bfk1-lf3-p2.js bfk1-lf3-p3.js bfk1-lf3-p4.js bfk1-lf3-p5.js bfk1-lf6-data.js bfk1-lf6-p1.js bfk1-lf6-p2.js bfk1-lf6-p3.js bfk1-lf6-p4.js bfk1-lf6-p5.js bfk1-lf6-p6.js bfk1-lf6-p7.js bfk1-lf9-data.js bfk1-lf9-p1.js bfk1-lf9-p2.js bfk1-lf9-p3.js bfk1-quiz.js faecher/bfk1/ && \
git mv bfk2-quiz.js faecher/bfk2/ && git mv deutsch-quiz.js faecher/deutsch/ && git mv gk-gle-data.js gk-uebungen.js faecher/gk/
```

Verify: `ls js faecher/bfk1 | wc -l` (10 và 17) — không lỗi.

- [ ] **Step 2: Cập nhật index.html script srcs (sed có thứ tự)**

```bash
sed -i '' -E \
 -e 's#src="\./bfk1-#src="./faecher/bfk1/bfk1-#g' \
 -e 's#src="\./bfk2-quiz#src="./faecher/bfk2/bfk2-quiz#g' \
 -e 's#src="\./deutsch-quiz#src="./faecher/deutsch/deutsch-quiz#g' \
 -e 's#src="\./gk-gle-data#src="./faecher/gk/gk-gle-data#g' \
 -e 's#src="\./gk-uebungen#src="./faecher/gk/gk-uebungen#g' \
 -e 's#src="\./supabase#src="./js/supabase#g' \
 -e 's#src="\./access#src="./js/access#g' \
 -e 's#src="\./vocab#src="./js/vocab#g' \
 -e 's#src="\./wissen#src="./js/wissen#g' \
 -e 's#src="\./chatbox#src="./js/chatbox#g' \
 -e 's#src="\./faecher\.js#src="./js/faecher.js#g' \
 index.html
```

Verify: `grep -c 'src="./faecher/bfk1/' index.html` = 33; `grep -o 'src="./js/[a-z]*\.js' index.html | sort -u` = chính xác 6: supabase/access/vocab/wissen/chatbox/faecher (không còn src root nào khác ngoài pwa.js).

- [ ] **Step 3: Cập nhật challenge.html + admin.html**

```bash
sed -i '' -E \
 -e 's#src="\./bfk1-#src="./faecher/bfk1/bfk1-#g' \
 -e 's#src="\./bfk2-quiz#src="./faecher/bfk2/bfk2-quiz#g' \
 -e 's#src="\./deutsch-quiz#src="./faecher/deutsch/deutsch-quiz#g' \
 -e 's#src="\./supabase#src="./js/supabase#g' \
 -e 's#src="\./access#src="./js/access#g' \
 -e 's#src="\./guard#src="./js/guard#g' \
 -e 's#src="\./faecher\.js#src="./js/faecher.js#g' \
 -e 's#src="\./challenge#src="./js/challenge#g' \
 challenge.html admin.html
```

Verify: `grep -n 'src="\./[a-z]' challenge.html admin.html | head` — không còn src trỏ file root (trừ pwa.js).

- [ ] **Step 4: Chạy harness**

Run: `node test/verify-links.mjs`
Expected: **PASS** (mọi ref mới tồn tại ở path mới). Nếu FAIL với [MISSING] là chuỗi văn bản không phải đường dẫn (false positive — vd từ nội dung học liệu), kiểm tra thủ công từng dòng và sửa ref thật; không vô hiệu hóa harness.

- [ ] **Step 5: node --check toàn bộ js mới + commit**

```bash
for f in js/*.js faecher/bfk1/*.js faecher/bfk2/*.js faecher/deutsch/*.js faecher/gk/*.js; do node --check "$f" || echo "SYNTAX FAIL: $f"; done
git add -A
git commit -m "refactor: move core js → js/, fach data → faecher/<fach>/"
```

---

### Task 3: Di chuyển ảnh → images/ (scans/charts/icons) + cập nhật folder paths & icon links

**Files:**
- Move: `2-Bfk1-lf6/`, `2-Bfk1-lf9/`, `2-Englisch/`, `2-GK/`, `2-D/` → `images/scans/`
- Move: `kraft.png`, `rind.png`, `schwein.png`, `page-*.png` → `images/charts/`
- Move: `icons/` → `images/icons/`
- Modify: `js/faecher.js` (pages.folder ×11), `manifest.webmanifest` (icons), `index.html` (imageChart src, head icon links), `challenge.html`, `admin.html` (head icon links)

- [ ] **Step 1: git mv ảnh**

```bash
mkdir -p images/scans images/charts images/icons && \
git mv 2-Bfk1-lf6 2-Bfk1-lf9 2-Englisch 2-GK 2-D images/scans/ && \
git mv kraft.png rind.png schwein.png page-01.png page-02.png page-03.png page-04.png page-05.png page-06.png page-07.png page-08.png page-09.png page-10.png page-11.png images/charts/ && \
git mv icons/* images/icons/ && rmdir icons
```

- [ ] **Step 2: faecher.js — pages.folder (11 chỗ)**

```bash
sed -i '' -E \
 -e 's#folder: "2-Englisch"#folder: "images/scans/2-Englisch"#g' \
 -e 's#folder: "2-GK"#folder: "images/scans/2-GK"#g' \
 -e 's#folder:"2-Bfk1-lf6"#folder:"images/scans/2-Bfk1-lf6"#g' \
 -e 's#folder:"2-Bfk1-lf9"#folder:"images/scans/2-Bfk1-lf9"#g' \
 js/faecher.js
```

Verify: `grep -c '"images/scans/' js/faecher.js` = 11.

- [ ] **Step 3: index.html — imageChart + head icons**

```bash
sed -i '' -E \
 -e 's#src:"(rind|schwein|kraft)\.png"#src:"images/charts/\1.png"#g' \
 -e 's#\./icons/#./images/icons/#g' \
 index.html
```

Verify: `grep -n 'images/charts\|images/icons' index.html | head` — 3 charts + 2 head links.

- [ ] **Step 4: manifest + challenge.html + admin.html**

```bash
sed -i '' -e 's#\./icons/#./images/icons/#g' manifest.webmanifest challenge.html admin.html
```

Verify: `grep -n 'images/icons' manifest.webmanifest challenge.html admin.html`.

- [ ] **Step 5: Chạy harness + commit**

Run: `node test/verify-links.mjs` → PASS.
```bash
git add -A && git commit -m "refactor: move images → images/{scans,charts,icons}, update paths"
```

---

### Task 4: Di chuyển 25 trang HTML → klassenarbeiten/ + cập nhật toàn bộ ref + sw.js PRECACHE

**Files:**
- Move: 25 HTML → `klassenarbeiten/` (danh sách đầy đủ trong Step 1)
- Modify (trong file mới): script srcs → `../js/…`, `../pwa.js`; links → `../index.html`, `../manifest.webmanifest`, `../images/icons/…`
- Modify: `index.html` (tile hrefs, idx entries, route:'deutsch.html', location.href, gk tiles)
- Modify: `js/faecher.js` (pruefungen exam/loesung ×12, zusammenfassung, external, `<a href="deutsch.html">`)
- Modify: `sw.js` (PRECACHE đầy đủ + CACHE `azubihub-v106`)

- [ ] **Step 1: git mv 25 file**

```bash
mkdir -p klassenarbeiten && \
git mv bfk1-ka3.html bfk1-ka3-loesung.html bfk1-ka4.html bfk1-ka4-loesung.html bfk1-ka5.html bfk1-ka5-loesung.html \
       englisch-ka1.html englisch-ka1-loesung.html englisch-ka2.html englisch-ka2-loesung.html englisch-ka3.html englisch-ka3-loesung.html \
       gk-ka1.html gk-ka1-loesung.html gk-ka2.html gk-ka2-loesung.html gk-ka3.html gk-ka3-loesung.html \
       kiemtra_mau.html loiGiai_mau.html ka2.html gg.html gk-zusammenfassung.html deutsch.html plan-hoc-lf2-extra.html \
       klassenarbeiten/
```

- [ ] **Step 2: Sửa ref bên trong 25 file (sed toàn cục)**

```bash
sed -i '' -E \
 -e 's#src="\./supabase\.js\?v=16"#src="../js/supabase.js?v=16"#g' \
 -e 's#src="\./access\.js\?v=[0-9]+"#src="../js/access.js?v=2"#g' \
 -e 's#src="\./guard\.js\?v=[0-9]+"#src="../js/guard.js?v=1"#g' \
 -e 's#src="\./vocab\.js\?v=[0-9]+"#src="../js/vocab.js?v=20"#g' \
 -e 's#src="\./wissen\.js\?v=[0-9]+"#src="../js/wissen.js?v=1"#g' \
 -e 's#src="\./chatbox\.js\?v=[0-9]+"#src="../js/chatbox.js?v=13"#g' \
 -e 's#src="\./diagrams\.js\?v=[0-9]+"#src="../js/diagrams.js?v=1"#g' \
 -e 's#src="\./pwa\.js\?v=[0-9]+"#src="../pwa.js?v=6"#g' \
 -e 's#href="\.?/?index\.html"#href="../index.html"#g' \
 -e 's#href="\./manifest\.webmanifest"#href="../manifest.webmanifest"#g' \
 -e 's#href="\./icons/#href="../images/icons/#g' \
 klassenarbeiten/*.html
```

Verify: `grep -rn 'src="\./[a-z]' klassenarbeiten/*.html` → chỉ còn `../js/`/`../pwa.js`; `grep -c 'href="../index.html' klassenarbeiten/*.html`.

- [ ] **Step 3: index.html — tile hrefs + idx + routes (sed thứ tự 1 lượt)**

```bash
sed -i '' -E \
 -e 's#href="(bfk1-ka[0-9](-loesung)?\.html)"#href="klassenarbeiten/\1"#g' \
 -e 's#href="(englisch-ka[0-9](-loesung)?\.html)"#href="klassenarbeiten/\1"#g' \
 -e 's#href="(gk-ka[0-9](-loesung)?\.html)"#href="klassenarbeiten/\1"#g' \
 -e 's#href="(ka2|kiemtra_mau|loiGiai_mau)\.html"#href="klassenarbeiten/\1.html"#g' \
 -e 's#"(ka2|kiemtra_mau|loiGiai_mau|deutsch|gg|gk-zusammenfassung|plan-hoc-lf2-extra)\.html"#"klassenarbeiten/\1.html"#g' \
 -e "s#'(deutsch|ka2|kiemtra_mau|loiGiai_mau|gg|gk-zusammenfassung|plan-hoc-lf2-extra)\.html'#'klassenarbeiten/\1.html'#g" \
 index.html
```

Verify:
- `grep -c 'klassenarbeiten/' index.html` — đếm thủ công khớp: tiles KA (≈24), idx (≈15), route/location.href (2).
- `grep -n 'href="[a-z]' index.html | grep -v klassenarbeiten | grep -v '"#\|icons\|manifest\|admin'` — không còn ref trực tiếp file root trừ admin.html.

- [ ] **Step 4: js/faecher.js — pruefungen + zusammenfassung + external + link**

```bash
sed -i '' -E \
 -e 's#(exam|loesung): "(bfk1-ka|englisch-ka|gk-ka|kiemtra_mau|loiGiai_mau|ka2)[^"]*\.html"#\1: "klassenarbeiten/\2"#g' \
 -e 's#zusammenfassung: "gk-zusammenfassung\.html"#zusammenfassung: "klassenarbeiten/gk-zusammenfassung.html"#g' \
 -e 's#deutsch\.html#klassenarbeiten/deutsch.html#g' \
 js/faecher.js
```

Verify: `grep -c 'klassenarbeiten/' js/faecher.js` = 25 (12 exam + 10 loesung + 1 zusammenfassung + 2 deutsch.html: external: + `<a href>`).

- [ ] **Step 5: sw.js — PRECACHE đầy đủ + CACHE v106**

Thay toàn bộ block từ `const CACHE` đến hết mảng PRECACHE bằng:

```js
const CACHE = 'azubihub-v106';
const PRECACHE = [
  './',
  './js/wissen.js',
  './js/chatbox.js',
  './index.html',
  './klassenarbeiten/deutsch.html',
  './admin.html',
  './challenge.html',
  './js/challenge.js',
  './js/challenge-data.js',
  './js/supabase.js',
  './js/access.js',
  './js/guard.js',
  './js/vocab.js',
  './js/diagrams.js',
  './js/faecher.js',
  './faecher/gk/gk-uebungen.js',
  './faecher/gk/gk-gle-data.js',
  './faecher/bfk1/bfk1-lf2-p1.js',
  './faecher/bfk1/bfk1-lf2-p2.js',
  './faecher/bfk1/bfk1-lf2-p3.js',
  './faecher/bfk1/bfk1-lf2-p4.js',
  './faecher/bfk1/bfk1-lf2-p5.js',
  './faecher/bfk1/bfk1-lf2-data.js',
  './faecher/bfk1/bfk1-lf3-p1.js',
  './faecher/bfk1/bfk1-lf3-p2.js',
  './faecher/bfk1/bfk1-lf3-p3.js',
  './faecher/bfk1/bfk1-lf3-p4.js',
  './faecher/bfk1/bfk1-lf3-p5.js',
  './faecher/bfk1/bfk1-lf3-data.js',
  './faecher/bfk1/bfk1-lf6-p1.js',
  './faecher/bfk1/bfk1-lf6-p2.js',
  './faecher/bfk1/bfk1-lf6-p3.js',
  './faecher/bfk1/bfk1-lf6-p4.js',
  './faecher/bfk1/bfk1-lf6-p5.js',
  './faecher/bfk1/bfk1-lf6-p6.js',
  './faecher/bfk1/bfk1-lf6-p7.js',
  './faecher/bfk1/bfk1-lf6-data.js',
  './faecher/bfk1/bfk1-lf9-p1.js',
  './faecher/bfk1/bfk1-lf9-p2.js',
  './faecher/bfk1/bfk1-lf9-p3.js',
  './faecher/bfk1/bfk1-lf9-data.js',
  './faecher/bfk1/bfk1-extra-p1.js',
  './faecher/bfk1/bfk1-extra-p2.js',
  './faecher/bfk1/bfk1-extra-p3.js',
  './faecher/bfk1/bfk1-extra-p4.js',
  './faecher/bfk1/bfk1-extra-p5.js',
  './faecher/bfk1/bfk1-extra-p6.js',
  './faecher/bfk1/bfk1-extra-data.js',
  './faecher/bfk1/bfk1-data.js',
  './faecher/bfk1/bfk1-catalog.js',
  './faecher/bfk1/bfk1-quiz.js',
  './faecher/bfk2/bfk2-quiz.js',
  './faecher/deutsch/deutsch-quiz.js',
  './manifest.webmanifest',
  './images/icons/icon-192.png',
  './images/icons/icon-512.png',
  './images/icons/apple-touch-icon.png',
  './images/charts/rind.png',
  './images/charts/schwein.png',
  './images/charts/kraft.png',
  './klassenarbeiten/ka2.html',
  './klassenarbeiten/kiemtra_mau.html',
  './klassenarbeiten/loiGiai_mau.html',
  './klassenarbeiten/bfk1-ka3.html',
  './klassenarbeiten/bfk1-ka3-loesung.html',
  './klassenarbeiten/bfk1-ka4.html',
  './klassenarbeiten/bfk1-ka4-loesung.html',
  './klassenarbeiten/bfk1-ka5.html',
  './klassenarbeiten/bfk1-ka5-loesung.html',
  './klassenarbeiten/gk-ka1.html',
  './klassenarbeiten/gk-ka1-loesung.html',
  './klassenarbeiten/gk-ka2.html',
  './klassenarbeiten/gk-ka2-loesung.html',
  './klassenarbeiten/gk-ka3.html',
  './klassenarbeiten/gk-ka3-loesung.html',
  './klassenarbeiten/gk-zusammenfassung.html',
  './klassenarbeiten/englisch-ka1.html',
  './klassenarbeiten/englisch-ka1-loesung.html',
  './klassenarbeiten/englisch-ka2.html',
  './klassenarbeiten/englisch-ka2-loesung.html',
  './klassenarbeiten/englisch-ka3.html',
  './klassenarbeiten/englisch-ka3-loesung.html',
];
```

- [ ] **Step 6: Harness + node --check + commit**

Run: `node test/verify-links.mjs && node --check sw.js && node --check js/faecher.js`
Expected: PASS.
```bash
git add -A && git commit -m "refactor: move exam pages → klassenarbeiten/, relink index+faecher, sw precache v106"
```

---

### Task 5: Notes .md → faecher/*/notes/ + gom tài liệu → quellen/

**Files:**
- Move: `faecher/bfk1/notes/` ← lf6.md, lf9.md, sla-lf2.md, sla-lf3.md (từ _bfk_1_notes); `faecher/bfk2/notes/` ← bfk2-ed.md, Lernzusammenfassung_KA2.md; `faecher/gk/notes/` ← gk-gle.md (root); `faecher/wiko/notes/` ← wiko-leyh.md (từ wiko/)
- Delete: `sla-lf3.md` root (trùng md5 với bản giữ lại)
- Move: `quellen/` ← PDF (2 Bfk2.pdf, BfK-SLA-lf3.pdf, Bfk-SLA-lf2.pdf, Plan-hoc-LF2-Extra.pdf), ZIP (2-Bfk1-lf6.zip, 2-Bfk1-lf9.zip, 2-D.zip, 2-Englisch.zip, 2-GK.zip), wiko/*.xlsx, _ocr/, breakdown-plan/, out.txt, _bfk_1_notes/ (chỉ còn fk_exel + BFK_shusster_2369)
- Modify (chỉ comment): headers `faecher/bfk1/bfk1-lf2-data.js`, `bfk1-lf3-data.js`, `bfk1-lf6-data.js`, `bfk1-lf9-data.js`, `bfk1-extra-data.js` — đường dẫn nguồn

- [ ] **Step 1: Tạo notes folder + git mv .md**

```bash
mkdir -p faecher/bfk1/notes faecher/bfk2/notes faecher/gk/notes faecher/wiko/notes quellen && \
git mv _bfk_1_notes/lf6.md _bfk_1_notes/lf9.md _bfk_1_notes/sla-lf2.md _bfk_1_notes/sla-lf3.md faecher/bfk1/notes/ && \
git mv _bfk_1_notes/bfk2-ed.md Lernzusammenfassung_KA2.md faecher/bfk2/notes/ && \
git mv gk-gle.md faecher/gk/notes/ && \
git mv wiko/wiko-leyh.md faecher/wiko/notes/ && \
git rm sla-lf3.md
```

Warning: `git mv` từng file vì _bfk_1_notes chứa cả fk_exel + BFK_shusster_2369.

- [ ] **Step 2: Gom quellen/**

```bash
git mv "2 Bfk2.pdf" BfK-SLA-lf3.pdf Bfk-SLA-lf2.pdf Plan-hoc-LF2-Extra.pdf quellen/ && \
git mv 2-Bfk1-lf6.zip 2-Bfk1-lf9.zip 2-D.zip 2-Englisch.zip 2-GK.zip quellen/ && \
git mv wiko/*.xlsx quellen/ && rmdir wiko && \
git mv _ocr breakdown-plan _bfk_1_notes out.txt quellen/
```

Verify _bfk_1_notes nguyên vẹn: `ls quellen/_bfk_1_notes` → gồm `fk_exel/` + `BFK_shusster_2369/`; `ls quellen/_bfk_1_notes/fk_exel | wc -l` = 10.

- [ ] **Step 3: Cập nhật comment header trong 5 data js**

```bash
sed -i '' -e 's#_bfk_1_notes/fk_exel#quellen/_bfk_1_notes/fk_exel#g; s#_bfk_1_notes/#faecher/bfk1/notes/#g' \
  faecher/bfk1/bfk1-lf2-data.js faecher/bfk1/bfk1-lf3-data.js faecher/bfk1/bfk1-lf6-data.js faecher/bfk1/bfk1-lf9-data.js faecher/bfk1/bfk1-extra-data.js
```

- [ ] **Step 4: Harness + node --check + commit**

Run: `node test/verify-links.mjs && for f in faecher/bfk1/bfk1-lf2-data.js faecher/bfk1/bfk1-lf3-data.js faecher/bfk1/bfk1-lf6-data.js faecher/bfk1/bfk1-lf9-data.js faecher/bfk1/bfk1-extra-data.js; do node --check "$f" || echo "SYNTAX FAIL: $f"; done`
Expected: PASS.
```bash
git add -A && git commit -m "refactor: notes → faecher/*/notes/, sources → quellen/"
```

---

### Task 6: Sàng lọc cuối + kiểm chứng HTTP thực tế

- [ ] **Step 1: Grep rà soát ref cũ còn sót**

```bash
grep -rEn '(src|href)="\./(supabase|access|guard|vocab|wissen|chatbox|faecher|bfk1|bfk2|deutsch|gk-|challenge|diagrams)\.' --include='*.html' . || echo "CLEAN-1"
grep -rEn '"\./(bfk1|gk|englisch|deutsch|ka2|kiemtra|loiGiai|gg|plan-hoc|rind|schwein|kraft|page-|icons)' --include='*.html' --include='*.js' . | grep -v quellen || echo "CLEAN-2"
grep -rn 'pages.folder\|"2-Englisch"\|"2-GK"' js/faecher.js | grep -v 'images/scans' || echo "CLEAN-3"
```

Expected: cả 3 = CLEAN (không output).

- [ ] **Step 2: node --check toàn bộ JS**

```bash
for f in js/*.js faecher/bfk1/*.js faecher/bfk2/*.js faecher/deutsch/*.js faecher/gk/*.js sw.js pwa.js; do node --check "$f" || echo "SYNTAX FAIL: $f"; done
```

Expected: không dòng nào.

- [ ] **Step 3: HTTP serve + curl các URL quan trọng**

```bash
(cd "$(git rev-parse --show-toplevel)" && python3 -m http.server 8899 >/dev/null 2>&1 &) ; sleep 1
for u in "" "js/chatbox.js" "js/faecher.js" "faecher/bfk1/bfk1-data.js" "faecher/bfk2/bfk2-quiz.js" \
         "klassenarbeiten/deutsch.html" "klassenarbeiten/bfk1-ka3.html" "images/scans/2-Englisch/2-Englisch-04.jpg" \
         "images/charts/kraft.png" "images/icons/icon-192.png" "manifest.webmanifest" "index.html"; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:8899/$u"); echo "$code  $u";
done; kill %1 2>/dev/null
```

Expected: tất cả `200`.

- [ ] **Step 4: Kết luận + commit cuối**

```bash
git status --short
git add -A && git commit -m "chore: restructure verification passed"   # chỉ khi có thay đổi còn sót
```

---

## Self-Review Notes

- **Spec coverage:** mọi mục spec (cây đích, file mapping, 8 nhóm reference updates, chatbox fix, sw v106, dedupe sla-lf3.md, fk_exel nguyên vẹn, verification) đều có task tương ứng.
- **Thứ tự:** Task 1 (fix API) trước mọi move — nếu quên, app vỡ AI chat trên trang dời; Task 4 sửa sw.js cùng task move trang — harness bắt ref để chắc chắn.
- **Harness SKIP_DIRS:** quellen/_bfk_1_notes/breakdown-plan không crawl — chúng không được ref từ runtime, và vì chứa png/xlsx sẽ sinh false-positive nếu crawl.
- **Chấp nhận resolve (file-dir | root):** refs trong JS mang ý nghĩa page-relative (vd idx path trong index.html, pruefungen path trong faecher.js) — resolve theo cả 2 gốc + grep rà ở Task 6 để loại dư thừa.
- **Giá trị ?v= giữ nguyên:** file đổi URL nên cache cũ không trùng URL — không cần bump từng cái; sw CACHE name bump v106 đủ.