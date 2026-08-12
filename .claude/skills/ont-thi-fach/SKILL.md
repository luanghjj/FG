---
name: ont-thi-fach
description: Use khi user gửi tài liệu ôn thi (PDF, ảnh scan, markdown, ghi chú) để thêm mới hoặc sửa Fach, Lernfeld, Thema, quiz, từ vựng DE→VI, flashcards, đề thi trong app AzubiHub (repo Desktop/ôn thi), hoặc khi user nói "làm đúng form" / "theo skill ôn thi". Không dùng khi chỉ sửa giao diện app.
---

# Ôn thi · Chuẩn form học liệu AzubiHub

## Overview

App **AzubiHub** (PWA tĩnh, plain HTML/JS, không build step) tại `/Users/nguyenchilinh/Desktop/ôn thi`. Mọi nội dung học (Fach → Lernfeld → Thema → quiz/flashcards) theo một **form chuẩn** duy nhất. Khi user gửi tài liệu: **không invent cấu trúc mới** — luôn map vào form dưới đây.

## When to Use

- Thêm/sửa **Fach** (BfK-1, BfK-2, Deutsch, Englisch, GK, WiKO…)
- Thêm/sửa **Thema / Lernfeld / group**
- Tạo quiz (MC + Freitext/fill)
- Tạo/cập nhật từ vựng DE→VI + flashcards
- Thêm đề thi / lời giải (→ `klassenarbeiten/`)
- User nói: "thêm bài này vào app", "đúng form", "theo skill ôn thi"

## Kiến trúc repo (bắt buộc — đã restructure)

```
root (PWA)
├─ index.html · admin.html · challenge.html     SPA + admin + challenge
├─ sw.js · pwa.js · manifest.webmanifest        PWA — BẮT BUỘC ở root
├─ js/                                          app code
├─ faecher/<fach>/                              data theo môn (+ notes/)
├─ klassenarbeiten/                             25 trang đề + lời giải
├─ images/scans|charts|icons/                   ảnh
├─ faecher/*/notes/                             ghi chú .md
└─ quellen/                                     tài liệu gốc (gitignored, không track)
```

### File chính

| Path | Vai trò |
|------|---------|
| `js/faecher.js` | `window.FachForm` — form chuẩn mọi Fach; `FACH_EXAM_META` (đề thi) |
| `js/vocab.js` | `window.Vocab` + `B1_VOCAB` — từ điển DE→VI, bind `.term` |
| `faecher/bfk1/bfk1-lfN-pM.js` | chunk content Thema LF (dạng `window.__LFN.concat([...])`) |
| `faecher/bfk1/bfk1-lfN-data.js` | định nghĩa group LF (`window.BFK1_LF2…LF9`) |
| `faecher/bfk1/bfk1-data.js` | gộp `window.BFK1_THEMES` + `BFK1_GROUPS` |
| `faecher/bfk1/bfk1-quiz.js` | `window.BFK1_QUIZ` (MC + fill) |
| `faecher/bfk2/bfk2-quiz.js` | `window.BFK2_QUIZ` |
| `faecher/deutsch/deutsch-quiz.js` | `window.DEUTSCH_QUIZ` |
| `faecher/gk/gk-gle-data.js` · `gk-uebungen.js` | `window.GK_GLE_GROUPS` · `GK_UEBUNGEN` |
| `index.html` | SPA + nạp toàn bộ script (thứ tự: chunks → `-data.js` → `faecher.js` → quiz) |
| `klassenarbeiten/*.html` | đề thi/lời giải — có `<script src="../js/guard.js" data-need="pruefungen">` |

## Standard form (mọi Fach)

Mỗi Fach là 1 object (thấy trong `js/faecher.js`):

```js
{
  id: "bfk1",                 // URL: #/fach/bfk1 (slug ascii, ổn định)
  code: "BfK-1",
  name: "Grundlagen Gastronomie",
  icon: "🍳",
  accent: "#2563eb",
  soft: "#eff6ff",
  teacher: "Fr. Schuster",
  examDate: "2026-07-20",     // ISO, optional
  ready: true,
  desc: "LF2 Beschaffung · LF6 Speisen · LF9 Zahlung/Recht",
  groups: [
    {
      id: "lf6",
      badge: "LF 6",
      title: "Speisen · Ernährung · Menüs",
      items: [ /* Themen */ ]
    }
  ],
  quiz: [ /* questions */ ]
}
```

### Thema item

```js
{
  id: "gaestebewertungen",     // slug ổn định, dùng cho quiz.theme
  icon: "⭐",
  name: "Gästebedarfe und Auswertung",
  desc: "Kriterien · 3S · Maßnahmen",
  pages: { folder: "images/scans/2-Bfk1-lf6", from: 35, to: 44, prefix: "2-Bfk1-lf6" }, // optional
  content: `HTML...`
}
```

**Scan file naming: zero-padded 2 chữ số** — `from:35,to:44` ⇒ `images/scans/2-Bfk1-lf6/2-Bfk1-lf6-35.jpg` … `2-Bfk1-lf6-44.jpg` (sai: `…-9.jpg`).

### Từ vựng trong content

Chỉ đánh dấu thuật ngữ quan trọng (không bọc cả list UI):

```html
<span class="term" data-de="Bewirtungsvertrag" data-vi="hợp đồng phục vụ">Bewirtungsvertrag</span>
```

Flashcards **tự sinh** từ các `.term` trong `content` (`renderThemeFlashcards()`).

### Quiz question

**MC:**
```js
{
  theme: "gaestebewertungen",  // = item.id
  cat: "3S",
  q: "Die 3 S der Gästezufriedenheit?",
  opts: ["A","B","C","D"],
  a: 0,                        // index đúng
  ex: "Sauberkeit · Speisenqualität · Service"
}
```

**Freitext/fill (không phân biệt hoa/thường):**
```js
{
  type: "fill",
  theme: "getreide",
  q: "Mahlgrade von grob nach fein?",
  answers: ["schrot → grieß → dunst → mehl", "schrot, grieß, dunst, mehl"], // biến thể chấp nhận
  answer: "Schrot → Grieß → Dunst → Mehl",                                  // hiển thị đáp án
  ex: "Von grob nach fein."
}
```

## Workflow khi user gửi tài liệu

1. **Đọc tài liệu** (PDF/ảnh/OCR nếu cần) — gốc lưu vào `quellen/` (gitignored).
2. **Xác định**: Fach nào? LF/group nào? Tách thành 3–10 Themen rõ ràng.
3. **Viết content**: định nghĩa, bảng, formula, merksätze, Fälle; thuật ngữ DE + giải thích VI qua `.term`; `Schnellmerk` (`<div class="note">`) nếu tài liệu có.
4. **Thêm quiz**: ≥5 MC + ≥2 fill / Thema nếu đủ chất liệu; `theme` phải khớp `item.id`.
5. **Pages scan**: nếu có ảnh → `pages:{folder,from,to,prefix}` trỏ `images/scans/<scan>/` (zero-pad).
6. **Wire đúng chỗ** (xem bảng "Ghi vào đâu"):
   - BfK-1 content → chunk `bfk1-lfN-pM.js` (hoặc tạo chunk mới nối vào `__LFN`); group → `bfk1-lfN-data.js`; quiz → `bfk1-quiz.js`
   - BfK-2/Deutsch quiz → `bfk2-quiz.js` / `deutsch-quiz.js`
   - GK → `gk-gle-data.js` (groups) / `gk-uebungen.js` (quiz)
   - Fach mới → tạo `faecher/<fach>/` + data theo form chuẩn, đăng ký load trong `index.html`
7. **Đăng ký file mới / bump cache** (bắt buộc, xem dưới).
8. **Kiểm tra**: `node --check` các file JS sửa + `node test/verify-links.mjs` (harness toàn repo) + mở app kiểm tra theme/flashcards/quiz.
9. **Commit/push** nếu user muốn deploy.

### Ghi vào đâu (tóm tắt)

| User gửi | Ghi vào |
|----------|---------|
| Nội dung Thema BfK-1 | `faecher/bfk1/bfk1-lfN-pM.js` (chunk) |
| Group/LF BfK-1 | `faecher/bfk1/bfk1-lfN-data.js` + `bfk1-data.js` |
| Quiz BfK-1 | `faecher/bfk1/bfk1-quiz.js` |
| Quiz BfK-2 / Deutsch | `faecher/bfk2/bfk2-quiz.js` / `faecher/deutsch/deutsch-quiz.js` |
| GK nội dung + quiz | `faecher/gk/gk-gle-data.js` + `gk-uebungen.js` |
| Từ vựng DE→VI | `js/vocab.js` (`B1_VOCAB`) |
| Ghi chú .md | `faecher/<fach>/notes/` |
| Đề thi / lời giải | `klassenarbeiten/<tên>.html` + `FACH_EXAM_META` trong `js/faecher.js` |

### Đề thi mới (klassenarbeiten)

1. Tạo `klassenarbeiten/<tên>.html` theo mẫu có sẵn (`klassenarbeiten/bfk1-ka3.html`) — **path relative từ đây phải `../js/…`, `../index.html`**.
2. Thêm gate: `<script src="../js/guard.js" data-need="pruefungen"></script>`.
3. Đăng ký trong `FACH_EXAM_META` (`js/faecher.js`): `exam: "klassenarbeiten/<tên>.html"`, `loesung: "klassenarbeiten/<tên>-loesung.html"` (path relative root, có đủ `.html`).
4. Thêm vào `sw.js` PRECACHE + bump CACHE.

## Cache bust (bắt buộc khi sửa data/UI)

1. Bump `?v=N` của script đã sửa trong `index.html` (và/hoặc `klassenarbeiten/*.html`).
2. `sw.js`: nếu thêm **file mới** → thêm vào `PRECACHE`; luôn bump tên cache `azubihub-vNN` (hiện tại `azubihub-v106`).
3. Không sửa tên cache đồng nghĩa user offline cũ không cập nhật được.

## Common Mistakes

| Sai | Đúng |
|-----|------|
| Path cũ kiểu `bfk1-data.js`, `2-Bfk1-lf6/` ở root | `faecher/bfk1/…`, `images/scans/…` |
| Từ `klassenarbeiten/*.html` dùng `src="./js/…"` | `src="../js/…"` |
| Scan `…-9.jpg` / `…-35.jpg` khi file có 2 chữ số | `…-09.jpg`, `…-35.jpg` (padStart 2) |
| Thêm file mới nhưng quên `index.html` + `sw.js` PRECACHE | App chạy nhưng **offline/refresh mất file** |
| Đổi `item.id` cũ | Quiz/exam/link gắn theo id cũ lệch — id bất biến |
| `.term` bọc cả cụm/list/hub | Vỡ layout — chỉ bọc thuật ngữ ngắn |
| Bịa số liệu/pháp lý ngoài tài liệu | Theo tài liệu user gửi; mâu thuẫn → tài liệu thắng |
| Xong mà không `node --check` | Syntax error làm chết cả trang |

## Checklist trước khi xong

- [ ] Fach/group/thema ids đúng (không đổi id cũ)
- [ ] Content có bảng/formula/merksatz nếu tài liệu có
- [ ] ≥8–20 `.term` quan trọng / Thema (nếu đủ)
- [ ] `quiz.theme` khớp `item.id`; fill có `answers` + `answer`
- [ ] `pages` trỏ `images/scans/…`, từ/to/prefix + zero-pad đúng
- [ ] File mới đã vào `index.html` + `sw.js` PRECACHE; `?v=` + CACHE đã bump
- [ ] `node --check` file sửa + `node test/verify-links.mjs` PASS
- [ ] Flashcards render sau content; quiz filter theo theme có câu
