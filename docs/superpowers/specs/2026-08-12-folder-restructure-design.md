# Design: Restructure repo into clear folders (AzubiHub)

Date: 2026-08-12
Status: Approved (user OK'd v2 tree)

## Goal

Sắp xếp lại toàn bộ repo thành cấu trúc folder rõ ràng: mỗi môn (Fach) gom trong
`faecher/<môn>/`, đề thi tách riêng `klassenarbeiten/`, ảnh vào `images/`, JS core
vào `js/`, tài liệu gốc vào `quellen/`. **App phải chạy y nguyên** — mọi tham chiếu
được cập nhật đồng bộ và kiểm chứng bằng HTTP 200.

## Target tree

```
ôn thi/
├── index.html, admin.html, challenge.html        ← app chrome (giữ root)
├── manifest.webmanifest, sw.js, pwa.js            ← PWA cố định root (SW scope)
├── faecher/
│   ├── bfk1/    *-data/*-quiz/*-p*.js (13 file) + notes/(lf6,lf9,sla-lf2,sla-lf3.md)
│   ├── bfk2/    bfk2-quiz.js + notes/(bfk2-ed.md, Lernzusammenfassung_KA2.md)
│   ├── deutsch/ deutsch-quiz.js
│   ├── gk/      gk-gle-data.js, gk-uebungen.js + notes/(gk-gle.md)
│   └── wiko/    notes/(wiko-leyh.md)
├── klassenarbeiten/   25 trang HTML đề thi/ôn thi
├── js/          supabase, access, guard, vocab, wissen, chatbox, diagrams, faecher.js, challenge.js, challenge-data.js
├── images/
│   ├── scans/  2-Bfk1-lf6/, 2-Bfk1-lf9/, 2-Englisch/, 2-GK/, 2-D/
│   ├── charts/ kraft.png, rind.png, schwein.png, page-01..11.png
│   └── icons/  (từ root icons/)
├── quellen/     PDF (4), zip (5), wiko xlsx (2), _bfk_1_notes/, _ocr/, breakdown-plan/, out.txt
├── api/, test/, docs/, start-ai-server.command    ← giữ nguyên
```

`_bfk_1_notes/`: chỉ còn `fk_exel/` (NGUYÊN VẸN) + `BFK_shusster_2369/` (scan gốc, giữ nguyên bên trong)
sau khi 5 file .md được chuyển về `faecher/*/notes/`.

`sla-lf3.md` (root) và `_bfk_1_notes/sla-lf3.md` trùng md5 → chỉ giữ 1 bản tại `faecher/bfk1/notes/`.

## File mapping (di chuyển)

### faecher/bfk1/
`bfk1-catalog.js`, `bfk1-data.js`, `bfk1-extra-data.js`, `bfk1-extra-p1..p6.js`,
`bfk1-lf2-data.js`, `bfk1-lf2-p1..p5.js`, `bfk1-lf3-data.js`, `bfk1-lf3-p1..p5.js`,
`bfk1-lf6-data.js`, `bfk1-lf6-p1..p7.js`, `bfk1-lf9-data.js`, `bfk1-lf9-p1..p3.js`,
`bfk1-quiz.js`, + notes: `lf6.md`, `lf9.md`, `sla-lf2.md`, `sla-lf3.md`

### faecher/bfk2/
`bfk2-quiz.js` + notes: `bfk2-ed.md`, `Lernzusammenfassung_KA2.md`

### faecher/deutsch/
`deutsch-quiz.js`

### faecher/gk/
`gk-gle-data.js`, `gk-uebungen.js` + notes: `gk-gle.md`

### faecher/wiko/
notes: `wiko-leyh.md` (từ wiko/); xlsx của wiko → `quellen/`

### klassenarbeiten/ (25 file)
`bfk1-ka3.html`, `bfk1-ka3-loesung.html`, `bfk1-ka4.html`, `bfk1-ka4-loesung.html`,
`bfk1-ka5.html`, `bfk1-ka5-loesung.html`, `englisch-ka1.html`, `englisch-ka1-loesung.html`,
`englisch-ka2.html`, `englisch-ka2-loesung.html`, `englisch-ka3.html`, `englisch-ka3-loesung.html`,
`gk-ka1.html`, `gk-ka1-loesung.html`, `gk-ka2.html`, `gk-ka2-loesung.html`, `gk-ka3.html`,
`gk-ka3-loesung.html`, `kiemtra_mau.html`, `loiGiai_mau.html`, `ka2.html`, `gg.html`,
`gk-zusammenfassung.html`, `deutsch.html`, `plan-hoc-lf2-extra.html`

### js/ (10 file core)
`supabase.js`, `access.js`, `guard.js`, `vocab.js`, `wissen.js`, `chatbox.js`,
`diagrams.js`, `faecher.js`, `challenge.js`, `challenge-data.js`

### images/ (di chuyển nguyên folder/nội dung)
- `images/scans/2-Bfk1-lf6/`, `images/scans/2-Bfk1-lf9/`, `images/scans/2-Englisch/`,
  `images/scans/2-GK/`, `images/scans/2-D/`
- `images/charts/`: kraft.png, rind.png, schwein.png, page-01..11.png
- `images/icons/`: toàn bộ `icons/`

### quellen/
PDF: `2 Bfk2.pdf`, `BfK-SLA-lf3.pdf`, `Bfk-SLA-lf2.pdf`, `Plan-hoc-LF2-Extra.pdf`
ZIP: `2-Bfk1-lf6.zip`, `2-Bfk1-lf9.zip`, `2-D.zip`, `2-Englisch.zip`, `2-GK.zip`
Khác: `_bfk_1_notes/` (sau khi đã tách .md), `_ocr/`, `breakdown-plan/`, `wiko/*.xlsx`, `out.txt`

## Reference updates (bắt buộc)

1. **index.html**
   - 45 `<script src>` → `./faecher/…`, `./js/…` + bump `?v=` (+1)
   - tile href tĩnh (1357–1464): kiemtra_mau, loiGiai_mau, ka2, bfk1-ka3..5(+loesung),
     englisch/gk-ka1..3(+loesung), gk-ka3… → `./klassenarbeiten/…`
   - `onclick="location.href='deutsch.html'"` (1004), `route:'deutsch.html'` (2087),
     `external: "deutsch.html"` trong data tile → `./klassenarbeiten/deutsch.html`
   - idx() search entries (4272–4510): deutsch.html, ka2.html, kiemtra_mau.html,
     loiGiai_mau.html, bfk1-ka3..5.html, gk-ka1..3… → `klassenarbeiten/…`
   - imageChart src (1661–1698): rind/schwein/kraft.png → `./images/charts/…`
   - head: apple-touch-icon, icon-192 → `./images/icons/…`
2. **faecher.js**
   - `pages.folder` (643–1464): "2-Englisch"→"images/scans/2-Englisch",
     "2-GK"→"images/scans/2-GK", (bfk1 trong bfk1-data.js tương tự
     "2-Bfk1-lf6"/"2-Bfk1-lf9" → "images/scans/…")
   - `pruefungen` exam/loesung (2383–2421) → `klassenarbeiten/…`
   - `zusammenfassung: "gk-zusammenfassung.html"` (2407) → `klassenarbeiten/…`
   - `external: "deutsch.html"` (584), `<a href="deutsch.html">` (598) → `klassenarbeiten/…`
3. **bfk1-data.js** — `bfk1PageList` trang scan: folder → `images/scans/2-Bfk1-lf6|9`
4. **sw.js** — PRECACHE: thay toàn bộ đường dẫn cũ bằng `./js/…`, `./faecher/…`,
   `./klassenarbeiten/…`, `./images/charts/…`, `./images/icons/…`; CACHE bump → `azubihub-v106`
5. **25 trang HTML dời vào klassenarbeiten/**
   - `./supabase.js?v=16` → `../js/supabase.js?v=17` … (mọi src core)
   - `./diagrams.js`, `./pwa.js` (deutsch.html) → `../js/diagrams.js`, `../pwa.js`
   - `href="index.html"`, `href="./index.html"` → `../index.html`
   - icon/manifest links → `../manifest.webmanifest`, `../images/icons/…`
6. **challenge.html** (giữ root) — script srcs → `./js/…`, `./faecher/…`;
   icon links → `./images/icons/…`
7. **chatbox.js — VÁ BẮT BUỘC**: `fetch('api/ai')` (dòng 206, 651) là đường dẫn
   tương đối theo PAGE; khi page ở klassenarbeiten/ sẽ 404. Thêm helper tính API root
   từ `document.currentScript.src` (script luôn nằm ở `<app-root>/js/chatbox.js` →
   bỏ `/js/…` lấy root), dùng cho cả 2 fetch.
8. **manifest.webmanifest** — icon paths → `./images/icons/…`

## Verification

1. `node --check` tất cả file `.js` đã dời
2. `python3 -m http.server` tại root; script curl: trích mọi `src=`, `href=`, `url(`
   từ các file trong repo, resolve theo thư mục file, curl từng cái → tất cả phải 200
3. Kiểm tra mẫu 1 ảnh scan qua `pageList` path mới (vd
   `images/scans/2-Englisch/2-Englisch-04.jpg`)
4. Grep còn sót tham chiếu cũ: `"./supabase.js`, `"./bfk1-`, `href="bfk1-`, `rind.png` (không prefix)…

## Risks

- Bỏ sót 1 tham chiếu → 404 trên app → bắt bởi curl crawl step 2
- SW cache cũ → CACHE bump v106 (và vì file đã đổi URL, cache cũ tự hết hạn)
- fetch('api/ai') tương đối → vá bằng helper (mục 7)
- `2-D`, `_ocr`, `breakdown-plan` không có tham chiếu runtime — `2-D` là ảnh scan → `images/scans/2-D`; `_ocr`/`breakdown-plan` → `quellen/`