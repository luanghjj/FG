# Data Model · Deutsch-Track (A1–C1 + Berufsdeutsch)

File này định nghĩa schema dữ liệu nhánh Deutsch. Tuân theo form chuẩn của app (xem `.claude/skills/ont-thi-fach/SKILL.md`) + các trường mở rộng riêng cho tiếng Đức.

## 1. Global data

Mỗi cấp độ 1 file data + 1 file quiz (theo pattern `faecher/bfk1/`):

```js
// faecher/deutsch/a1-data.js
window.DEUTSCH_A1 = {
  level: "A1",
  badge: "A1",
  title: "Anfänger",
  units: [ /* Unit[] */ ]
};

// faecher/deutsch/a1-quiz.js
window.DEUTSCH_A1_QUIZ = [ /* QuizQuestion[] — schema cũ của app */ ];
```

Cấp độ tiếp theo: `a2-data.js` → `window.DEUTSCH_A2`, … tới C1. Berufsdeutsch:

```js
// faecher/deutsch/beruf-data.js
window.DEUTSCH_BERUF = {
  level: "beruf",
  badge: "Beruf",
  title: "Berufsdeutsch Gastgewerbe",
  units: [ /* Unit[] */ ]
};
```

## 2. Unit

```js
{
  id: "u1",                      // slug ascii bất biến, dùng trong URL
  title: "Begrüßung & Vorstellung",
  desc: "Hallo · sich vorstellen · Länder/Sprachen",
  icon: "👋",
  lektionen: [ /* Lektion[] */ ]
}
```

## 3. Lektion (đơn vị học nhỏ nhất)

```js
{
  id: "u1-l2",                   // <unit>-l<n>, dùng cho URL + quiz.theme
  name: "Sich vorstellen",
  content: `HTML…`,              // .term DE→VI như cũ → flashcards tự sinh
  grammar: [ /* GrammarBlock[] */ ],   // optional
  listen:  [ /* ListenItem[] */ ],     // optional
  speak:   [ /* SpeakItem[] */ ]       // optional
}
```

`content` vẫn là nguồn flashcards — mọi `.term` trong Lektion được `Vocab.bindTerms` + flashcards tự render, **không cần khai báo vocab riêng**.

## 4. GrammarBlock (ngữ pháp + bài tập)

```js
{
  id: "a1-artikel",              // dùng cho key tiến độ deutsch:a1:grammar:<id>
  title: "Bestimmter & unbestimmter Artikel",
  rule: "HTML giải thích ngắn (bảng mẹo, mẹo nhớ)",
  examples: ["Der Tisch · die Lampe · das Buch"],
  exercise: {
    // Dùng nguyên 2 schema quiz của app:
    // MC:  { theme, cat, q, opts, a, ex }
    // fill: { type:"fill", theme, q, answers[], answer, ex }
    type: "fill",
    theme: "u1-l2",
    cat: "Artikel",
    q: "___ Buch (das)",
    answers: ["das"],
    answer: "das",
    ex: "Buch ist neutral → das Buch"
  }
}
```

## 5. ListenItem (luyện nghe — TTS, không file audio)

```js
{
  id: "u1-l2-listen-1",
  text: "Hallo! Ich heiße Anna. Wie heißt du?",
  tip: "Nghe rồi chép lại; chú ý intonation của câu hỏi",  // optional
  slow: true        // optional: đọc chậm từng câu trước khi đọc thường
}
```

App phát qua `speechSynthesis` (voice de-DE của máy, fallback bất kỳ voice de). Mọi `.term` có nút 🔊 riêng.

## 6. SpeakItem (luyện nói — SpeechRecognition de-DE)

```js
{
  id: "u1-l2-speak-1",
  prompt: "Hỏi 'Bạn từ đâu đến?' bằng tiếng Đức",   // hiển thị việc cần làm
  model: "Woher kommst du?",                        // câu mẫu cần đọc
  hint: "Wo·her · kommst · du"                      // optional: đánh vần từng âm
}
```

Luồng: bấm 🎤 → user đọc → `SpeechRecognition(lang:"de-DE")` → transcript hiện lên → app so khớp mờ (`model` so với transcript, chuẩn hóa hoa/thường) → nhận xét "✓ Nghe được" hoặc "Nghe lại nhé".

## 7. Quiz cấp độ (window.DEUTSCH_A1_QUIZ)

Dùng đúng schema quiz hiện tại (MC + fill), `theme` = lektion id, `cat` = "A1-Quiz" hoặc chủ đề. ≥60 câu cho quiz cuối A1. Chấm qua engine cũ; đạt ≥80% → mở khóa cấp sau.

## 8. Key tiến độ (Supabase, prefix `deutsch:`)

| Key | Giá trị | Khi set |
|---|---|---|
| `deutsch:a1:vocab:<lektion>:<word>` | 1 | học viên lật flashcards thuộc (✓) |
| `deutsch:a1:grammar:<blockId>` | 1 | làm đúng exercise |
| `deutsch:a1:quiz:<unitId>` | điểm 0–100 | hoàn thành quiz unit |
| `deutsch:a1:passed` | 1 | đạt ≥80% quiz cuối A1 |

Lektion hiển thị `vocab x/y`, `grammar x/y`, trạng thái ✓. Không tạo hệ tracking mới — tận dụng Supabase đã có.

## 9. Đăng ký load (bắt buộc, pattern cũ)

- `index.html`: thêm `<script src="./faecher/deutsch/a1-data.js?v=N">` + `a1-quiz.js` (trước `js/faecher.js` không cần; nạp như `gk-uebungen.js`).
- `sw.js`: thêm vào `PRECACHE` + bump CACHE `azubihub-vNN`.
- Khi sửa nội dung: bump `?v=` + CACHE.

## 10. Naming rules

- id: ascii slug, không đổi id cũ (quiz/key tiến độ đã gắn).
- Lektion id dạng `<unit>-l<N>`; block id `<level>-<tên ngắn>`.
- Vocab chỉ thêm vào `B1_VOCAB` (js/vocab.js) khi là từ chung; từ theo bài đặt ngay trong `.term` của `content`.
