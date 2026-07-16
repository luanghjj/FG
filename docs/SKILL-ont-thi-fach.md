---
name: ont-thi-fach
description: Chuẩn form học liệu ôn thi (Fächer → Themen → nội dung/quiz/flashcards) cho app Desktop/ôn thi. Dùng khi user gửi tài liệu PDF/ảnh/ghi chú để thêm môn, Lernfeld, Thema, quiz, từ vựng DE→VI, flashcards, hoặc sửa cấu trúc học.
---

# Ôn thi · Fach/Thema Form Skill

Skill này chuẩn hóa cách nạp học liệu vào app **Fachkraft für Gastronomie** tại:

`/Users/nguyenchilinh/Desktop/ôn thi`

Khi user gửi tài liệu (PDF, ảnh scan, markdown, ghi chú), **không tự invent cấu trúc mới**. Luôn map vào form dưới đây.

## Khi nào dùng

- Thêm/sửa **Fach** (BfK-1, BfK-2, Deutsch, Englisch, GK, WiKO…)
- Thêm/sửa **Thema / Lernfeld**
- Tạo quiz (MC + Freitext)
- Tạo/cập nhật từ vựng DE→VI + flashcards
- User nói: “thêm bài này vào app”, “đúng form”, “theo skill ôn thi”

## Kiến trúc app (bắt buộc)

```
Fächer
└─ Fach (vd BfK-1)
   ├─ Groups / Lernfelder (LF6, LF9…)
   │  └─ Themen
   │     ├─ content HTML (tóm tắt ôn)
   │     ├─ term DE→VI  <span class="term" data-de data-vi>
   │     ├─ pages scan (optional)
   │     ├─ flashcards (auto từ .term)
   │     └─ quiz CTA (theo theme id)
   └─ Quiz hub: chọn Themen, MC/Fill, Error deck, Spaced, Exam, Mastery
```

### File chính

| File | Vai trò |
|------|---------|
| `index.html` | SPA, routing, quiz engine, flashcards UI |
| `bfk1-data.js` | Nội dung Themen BfK-1 (`window.BFK1_THEMES`) |
| `bfk1-quiz.js` | Quiz BfK-1 + helpers study (`window.BFK1_QUIZ`) |
| `faecher.js` | Form chuẩn mọi Fach (`window.FachForm`) |
| `vocab.js` | Tra từ DE→VI (tap `.term`) |
| `2-Bfk1-lf6/`, `2-Bfk1-lf9/` | Ảnh scan gốc |

## Standard form (mọi Fach)

Mỗi Fach là 1 object:

```js
{
  id: "bfk1",                 // URL: #/fach/bfk1  (slug ascii)
  code: "BfK-1",
  name: "Grundlagen Gastronomie",
  icon: "🍳",
  accent: "#2563eb",
  soft: "#eff6ff",
  teacher: "Fr. Schuster",
  examDate: "2026-07-20",     // ISO, optional
  ready: true,
  desc: "LF6 + LF9",
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
  pages: { folder:"2-Bfk1-lf6", from:3, to:10, prefix:"2-Bfk1-lf6" }, // optional
  content: `HTML...`
}
```

### Từ vựng trong content

Chỉ đánh dấu thuật ngữ quan trọng (không bọc cả list UI):

```html
<span class="term" data-de="Bewirtungsvertrag" data-vi="hợp đồng phục vụ">Bewirtungsvertrag</span>
```

Flashcards **tự sinh** từ các `.term` trong `content` qua `renderThemeFlashcards()`.

### Quiz question

**MC:**
```js
{
  theme: "gaestebewertungen",  // = thema id
  cat: "3S",
  q: "Die 3 S der Gästezufriedenheit?",
  opts: ["A","B","C","D"],
  a: 0,                        // index đúng
  ex: "Sauberkeit · Speisenqualität · Service"
}
```

**Freitext (không phân biệt hoa/thường):**
```js
{
  type: "fill",
  theme: "getreide",
  cat: "Mahlgrade",
  q: "Mahlgrade von grob nach fein?",
  answers: ["schrot → grieß → dunst → mehl", "schrot, grieß, dunst, mehl"],
  answer: "Schrot → Grieß → Dunst → Mehl",
  ex: "Von grob nach fein."
}
```

`answers` = biến thể chấp nhận (normalized). `answer` = hiển thị đáp án đúng.

## Workflow khi user gửi tài liệu

1. **Đọc tài liệu** (PDF/ảnh/OCR nếu cần)
2. **Xác định**
   - Fach nào?
   - Group/LF nào?
   - Tách thành 3–10 Themen rõ ràng
3. **Viết content**
   - Ưu tiên: định nghĩa, bảng, công thức, merksätze, Fälle
   - Song ngữ: thuật ngữ DE + VI qua `.term`
   - Có Schnellmerk-Tipp nếu tài liệu có
4. **Thêm quiz**
   - ≥5 MC / Thema nếu đủ chất liệu
   - ≥2 fill / Thema cho khái niệm then chốt
   - `theme` phải khớp `item.id`
5. **Pages scan**
   - Nếu có folder ảnh: gắn `pages:{folder,from,to,prefix}`
6. **Wire**
   - BfK-1: cập nhật `bfk1-data.js` + `bfk1-quiz.js`
   - Fach khác: cập nhật `faecher.js` (hoặc file data riêng nếu đã tách)
   - Cập nhật `BFK1_THEME_META` labels nếu đổi tên
7. **Kiểm tra**
   - `node --check` các file JS
   - Theme list không bị vỡ layout
   - Flashcards hiện sau content
   - Quiz filter theo theme có câu
8. **Cache bust** query `?v=` + `sw.js` cache name nếu cần
9. **Commit/push** nếu user đang làm trên repo git và muốn deploy

## UI bắt buộc sau mỗi Thema

Trong trang Thema:

1. Nội dung ôn (`content`)
2. **Karteikarten / flashcards** (lật DE↔VI)
3. Nút **Quiz Thema** / **Themen wählen**
4. (Optional) gallery scan

Không bỏ flashcards nếu Thema có ≥1 term.

## Quy tắc nội dung

- Giữ **tiếng Đức** cho thuật ngữ chuyên ngành; VI cho giải thích/nghĩa
- Không bịa USt/pháp lý trái tài liệu user; nếu mâu thuẫn, theo **tài liệu user gửi**
- Không auto-wrap vocab trên list/hub (tránh vỡ UI)
- Id slug: ascii, kebab/underscore ổn định, không đổi id cũ nếu quiz đã gắn

## Mapping tài liệu → form (ví dụ)

User gửi note 8 Themen BfK-1:

| Note | `item.id` | group |
|------|-----------|-------|
| Gästebedarfe und Auswertung | `gaestebewertungen` | lf6 |
| Ernährungsgewohnheiten + Speisekarte | `ernaehrungsformen` | lf6 |
| Obst | `obst` | lf6 |
| Hülsenfrüchte | `huelsenfruechte` | lf6 |
| Getreide | `getreide` | lf6 |
| Menüregeln + Sprache | `menues-erstellen` | lf6 |
| Betriebsarten + Zahlung | `betriebsarten-zahlung` | lf9 |
| Bewirtungsvertrag + Recht/USt | `rechtliche-zahlungsabwicklung` | lf9 |

## Template content HTML

```html
<h2>⭐ Thema · Title</h2>
<div class="hint">Ngữ cảnh ngắn</div>
<h3 class="sub">1. ...</h3>
<table>...</table>
<div class="formula">...</div>
<div class="note">💡 Schnellmerk: ...</div>
```

## Template checklist trước khi xong

- [ ] Fach/group/thema ids đúng
- [ ] content có bảng/formula/merksatz nếu tài liệu có
- [ ] ≥8–20 `.term` quan trọng / Thema (nếu đủ)
- [ ] quiz.theme khớp id
- [ ] fill answers normalized variants
- [ ] flashcards render
- [ ] JS syntax ok
- [ ] không phá list hub

## Khi user chỉ nói “làm đúng form”

1. Đọc skill này
2. So với `faecher.js` + `bfk1-data.js`
3. Nạp tài liệu mới theo schema
4. Không invent UI/flow khác trừ khi user yêu cầu
