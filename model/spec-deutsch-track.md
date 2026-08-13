ok# AzubiHub · Deutsch-Track A1–C1 — Design Spec

Ngày: 2026-08-12 · Trạng thái: đã duyệt (brainstorming) · Repo: `/Users/nguyenchilinh/Desktop/ôn thi`

## 1. Mục tiêu

Mở rộng app AzubiHub thành 2 nhánh học, chọn ngay sau đăng nhập:

1. **Fachkraft für Gastronomie** — các môn nghề hiện tại (BfK-1, BfK-2, Deutsch, Englisch, GK, WiKO), giữ nguyên 100%.
2. **Deutsch A1–C1** — lộ trình tiếng Đức theo khung CEFR, đan xen **Berufsdeutsch Gastgewerbe**.

MVP: **làm trọn cấp A1 trước**, nhân mẫu sang A2…C1 sau.

## 2. Nguyên tắc thiết kế

- **Tái sử dụng tối đa**: quiz engine (MC/fill), flashcards tự sinh từ `.term`, vocab DE→VI (`B1_VOCAB`/`Vocab`), hash-routing, guard/login, Supabase progress, PWA offline (sw.js + CACHE bump), harness `test/verify-links.mjs`.
- **Không đụng** login/Supabase core; không đổi `#/fach` routing; không thêm hệ tracking mới (dùng key prefix `deutsch:`).
- **Audio zero-asset**: Web Speech API (`speechSynthesis` nghe, `SpeechRecognition` nói), không hosting file audio.
- Nội dung dữ liệu theo mẫu đã chuẩn hóa (xem `data-model.md`); id slug bất biến; cache bust `?v=` + CACHE `azubihub-vNN` mỗi lần sửa.

## 3. Màn hình chọn nhánh (TrackGate)

- Overlay `#trackGate` (kiểu `#loginGate`, index.html:922) hiện **sau khi login thành công** (tại điểm gate ẩn, index.html ~5008).
- 2 thẻ lớn:
  - 🧑🍳 **Fachkraft für Gastronomie** → `go('#/fach')`
  - 🇩🇪 **Deutsch A1–C1** → `go('#/deutsch')`
- Hiện **mỗi lần đăng nhập** (không lưu lựa chọn).
- Link nhỏ "↺ Track wählen" trong header để mở lại bất cứ lúc nào (2 dòng code).
- Không thay đổi cơ chế login/Supabase.

## 4. Routing

Namespace mới, không đụng `#/fach`, `#/exam`:

```
#/deutsch                  hub cấp độ: A1–C1 + Berufsdeutsch
#/deutsch/a1               danh sách Units A1
#/deutsch/a1/u1            danh sách Lektion trong Unit u1
#/deutsch/a1/u1/l2         trang Lektion u1-l2
#/deutsch/a1/quiz          kiểm tra cuối cấp độ A1
#/deutsch/beruf            Berufsdeutsch Gastgewerbe
```

## 5. Tính năng Deutsch track

| Tính năng | Cách làm |
|---|---|
| Vocab + flashcards | `.term` DE→VI như cũ → flashcards tự sinh; vocab thêm vào `B1_VOCAB` (js/vocab.js) hoặc theo chunk cấp độ |
| Ngữ pháp + bài tập | Block `grammar` trong Lektion: `rule` + `examples` + `exercise` (MC/fill schema cũ) |
| Quiz + kiểm tra cấp độ | `#/deutsch/a1/quiz` — engine cũ, ≥60 câu A1; đạt ≥80% → mở khóa cấp sau |
| Luyện nghe | Nút 🔊 mọi `.term`/`listen.text` qua `speechSynthesis` (giọng de-DE máy có sẵn); hướng dẫn bật giọng Đức trên iOS |
| Luyện nói | `SpeechRecognition` de-DE: đọc câu → transcript + nhận xét "Nghe được/Chưa rõ" |
| AI trợ giúp | Thêm chunk Deutsch vào nguồn `wissen.js` (vocab + quy tắc ngữ pháp) → chatbox AI hiện có trả lời đúng context; quick-suggest: "Dịch hộ", "Giải thích ngữ pháp" |
| Tiến độ | Key Supabase prefix `deutsch:` (vocab thuộc, bài tập xong, điểm quiz unit); Lektion hiển thị x/y; hub hiển thị tiến độ per cấp |

## 6. Cấu trúc dữ liệu (tóm tắt — chi tiết ở data-model.md)

```
faecher/deutsch/
├─ a1-data.js              window.DEUTSCH_A1  { level:"A1", badge, units:[…] }
├─ a1-quiz.js              window.DEUTSCH_A1_QUIZ (quiz cấp độ, mở khóa)
├─ a2-data.js … c1-data.js (giai đoạn sau, theo mẫu A1)
├─ beruf-data.js           Berufsdeutsch
└─ notes/
```

Unit → Lektion → `content` (HTML, `.term`) + `grammar[]` + `listen[]` + `speak[]`.

## 7. Giai đoạn triển khai

### Phase 0 — Nền tảng
1. `#trackGate` sau login + route `#/deutsch` + switcher header.
2. Hub cấp độ + unit/lektion pages; đăng ký data vào index.html + sw.js PRECACHE; CACHE → v107.
3. 2 Unit mẫu A1 (Begrüßung, Zahlen & Datum) chạy xuyên engine cũ.

### Phase 1 — Nội dung A1 trọn vẹn
4. 10–12 Unit A1 theo giáo trình chuẩn; mỗi Unit: content + vocab 60–80 từ + ngữ pháp + bài tập + 1–2 listen/speak.
5. Ngữ pháp A1: Artikel/Kasus, chia động từ, Perfekt, W-Fragen, Negation, Modalverben, Präpositionen.
6. Quiz tổng A1 (~60 câu) + mở khóa + tiến độ.
7. Berufsdeutsch: 2–3 Unit (Bestellung aufnehmen, Speisekarte erklären, Reklamation).

### Phase 2 — A2 → B1 (B1 = mốc Ausbildung, ưu tiên Berufsdeutsch)

### Phase 3 — B2 → C1 + tinh chỉnh audio/nói

## 8. Kiểm thử

- `node --check` mọi JS sửa; `node test/verify-links.mjs` PASS sau mỗi phase.
- Thủ công: login → TrackGate → cả 2 nhánh → Lektion hiện content/flashcards/exercise/listen/speak → quiz A1 chấm điểm → mở khóa.
- Offline: precache đủ file mới (thêm data chunk vào PRECACHE).

## 9. Ngoài phạm vi (MVP)

- File audio mp3 thật, chấm điểm phát âm chuẩn xác, bài thi mô phỏng telc/Goethe hoàn chỉnh, đa ngôn ngữ UI.
