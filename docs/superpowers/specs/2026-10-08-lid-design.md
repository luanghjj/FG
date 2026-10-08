# Leben in Deutschland (LiD) — Design Spec

- Date: 2026-10-08
- Status: approved (3/3 sections)
- Scope: Fach LiD mới, full 460 câu (hướng C), nguồn BAMF chính thức
- Related skills: ont-thi-fach (form chuẩn), brainstorming (quy trình này)

## 0. Kiểm tra tài nguyên hiện có (kết quả)

- Quét toàn repo (`faecher/`, `js/`, `quellen/`, `index.html`) với từ khóa
  `Leben in Deutschland | lid- | einbuergerung | Einbürgerungstest |
  Orientierungskurs | Gesamtfragenkatalog`: **0 hit** trong app code.
- 5 Fach hiện có trong `js/faecher.js`: `bfk1`, `bfk2`, `deutsch`, `englisch`, `gk`.
  Không có Fach `lid`.
- Gần nhất: Fach `gk` (Gemeinschaftskunde) trùng ~30% chủ đề
  (Grundrechte, Demokratie, Gewaltenteilung, Medien) nhưng **không** thay thế
  được LiD (thiếu Geschichte, Bundesländer, Einbürgerung).
- `fuererschein/` là app con standalone (không qua `FAECHER`), `deutsch-a1-c1/`
  là track A1–C1 riêng. LiD sẽ đi theo form `FAECHER` chuẩn, không fork 2 UX này.
- Nguồn chính thức đã xác minh tải được:
  `gesamtfragenkatalog-lebenindeutschland.pdf`, Stand 07.05.2025, 191 trang, 8.6 MB
  (`/tmp/lid-katalog.pdf` khi khảo sát; gốc sẽ lưu `quellen/lid/`, gitignored).

## 1. Luật thi thật (BAMF, đã verify qua web 2026)

- Katalog/người: **310 câu = 300 allgemeine + 10 landesbezogene** (chọn 1 trong 16 bang).
- Tổng kho mọi bang: **460 = 300 + 16×10** (hay bị quảng cáo nhầm thành "460 câu của bạn" —
  thực tế mỗi người chỉ học 310).
- Đề thi: **33 câu = 30 chung + 3 bang**, **60 phút**, 4 đáp án chọn 1,
  **đậu từ 17 đúng**, không trừ điểm sai, bỏ trống tính sai, hết giờ tự nộp.
- Phí 25 EUR/lần, được thi lại. Test "Leben in Deutschland" đậu có thể thay
  Einbürgerungstest (hỏi Einbürgerungsbehörde trước).
- 4 Themenbereiche (300 chung): Leben in der Demokratie (~100),
  Geschichte und Verantwortung (~60), Mensch und Gesellschaft (~100),
  Deutschland in Europa und der Welt (~40). Con số chi tiết đối chiếu lại khi nhập liệu.

## 2. Kiến trúc & Dữ liệu (Section 1 — đã duyệt)

- Fach mới: `id: "lid"`, `code: "LiD"`, name "Leben in Deutschland",
  icon SVG inline đơn sắc (theo skill azubihub-monochrome-icons, cấm emoji),
  đăng ký trong `js/faecher.js` + `index.html` + `sw.js` PRECACHE.
- File mới `faecher/lid/`:
  - `lid-allg-p1..p4.js` — 300 câu chung, 4 chunk theo 4 Themenbereiche,
    dạng `window.__LID_ALLG.concat([...])`.
  - `lid-land-p1..p2.js` — 160 câu bang (16 bang × 10),
    dạng `window.__LID_LAND.concat([...])`, mỗi câu có `land: "BY"|"BW"|...`
    (mã 2 chữ, mapping đủ 16 bang trong spec triển khai).
  - `lid-data.js` — gộp `groups` (4 groups chung + 1 group "Bundesländer" 16 items),
    mỗi Thema: `content` HTML + `.term` DE→VI (chỉ thuật ngữ ngắn) +
    `<div class="note">Mẹo</div>` (Schnellmerk).
  - `lid-quiz.js` — `window.LID_QUIZ`, 460 entries MC
    `{ theme, cat, land|null, q, opts[4], a, ex(VI), tip }`.
  - `lid-tipps.js` — dữ liệu tab Mẹo: ~30 mẹo bẫy (số liệu, năm, cơ quan, ảnh/biểu tượng).
- Quy tắc nhập liệu: giữ nguyên wording DE gốc BAMF; `opts` giữ thứ tự gốc
  (app shuffle khi thi); `ex` + `tip` tiếng Việt ngắn gọn; `theme` khớp `item.id`;
  fill-type không dùng cho LiD (toàn MC 4 đáp án).
- Gốc PDF lưu `quellen/lid/`, không track ảnh scan (LiD không cần scan).

## 3. Bang, Tab, Chấm điểm (Section 2 — đã duyệt)

- (a) Bundesland selector: dropdown 16 bang ngay đầu Fach LiD,
  default Bayern, lưu `localStorage lid-land`. Quiz Lernen lọc
  300 chung + 10 câu bang đã chọn = 310 hiển thị. Đổi bang re-filter không reload.
- (b) 3 tab:
  - Lernen: lọc theo Themenbereich/bang, lật đáp án + giải thích VI, flashcards
    tự sinh từ `.term` (tái dùng `renderThemeFlashcards()`).
  - Mẹo (Tipps): ~30 mẹo + Schnellmerk mỗi Thema, tập trung câu bẫy.
  - Prüfung (Thi thử): đề ngẫu nhiên **30 chung + 3 bang**, timer **60:00** đếm ngược,
    nộp sớm, chấm **đậu ≥17/33**, liệt kê câu sai + làm lại, lưu lịch sử
    (tái dùng `js/exam-sim.js`, không fork engine).
- (c) Điểm như thật: không trừ điểm, bỏ trống = sai, hết giờ tự nộp,
  hiển thị số câu đúng/tổng + đậu/rớt + thời gian còn lại.

## 4. Luồng, Lỗi, Kiểm tra, Cache (Section 3 — đã duyệt)

- Data flow: chunks (`__LID_ALLG`/`__LID_LAND`) → `lid-data.js` (groups) →
  `js/faecher.js` (Fach `lid`) → quiz engine + `exam-sim.js` chung.
  Thứ tự script trong `index.html`: chunks → `-data.js` → `faecher.js` → quiz.
- Lỗi: `land` lạ/thiếu → fallback Bayern + toast; bang thiếu câu → báo thiếu
  thay vì trộn sai; PDF BAMF cập nhật → diff katalog trước khi sửa đáp án.
- Test:
  - `node --check` từng file JS mới/sửa.
  - `node test/verify-links.mjs` PASS.
  - Đếm: 300 chung / 160 bang / 460 tổng / đề mẫu 33 = 30+3 / ngưỡng đậu ≥17.
  - Mở app kiểm tra 3 tab + đổi bang + thi thử hết giờ/nộp sớm.
- Cache bust (bắt buộc): bump `?v=` script sửa trong `index.html`,
  thêm file mới vào `sw.js` PRECACHE, bump `azubihub-v106` → `v107`.
- Không đổi `item.id` cũ của các Fach khác; icon LiD là SVG đơn sắc.

## 5. Không làm (out of scope)

- Không scan ảnh LiD, không đề thi giấy `klassenarbeiten/` cho LiD ở đợt này.
- Không fork `exam-sim.js`; không tạo app con standalone kiểu `fuererschein/`.
- Không tự bịa đáp án: mâu thuẫn thì BAMF PDF thắng; PDF đổi bản thì làm đợt cập nhật riêng.

## 6. Kế tiếp

- Invoke `writing-plans` để lập implementation plan (chia chunk nhập liệu 460 câu,
  mapping 16 mã bang, thứ tự file, test đếm số liệu).
