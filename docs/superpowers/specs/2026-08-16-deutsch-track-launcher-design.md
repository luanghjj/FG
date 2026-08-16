# AzubiHub · Deutsch A1–C1 — Hub Launcher Restructure Design

Ngày: 2026-08-16 · Trạng thái: đã duyệt (brainstorming) · Repo: `/Users/nguyenchilinh/Desktop/ôn thi`

## 1. Vấn đề

Hub Deutsch trong `index.html` (SPA AzubiHub) hiện đang:

- Hiển thị grid tile cấp độ A1–C1 + Beruf, nhưng **chỉ A1 & Beruf có dữ liệu** → tile rỗng gây rối.
- Điều hướng quá sâu: `#/deutsch` → cấp độ → unit → lektion (4 tầng), trùng lặp nội dung với app React "Sprachziel Master".
- Duplicate nội dung học với app React riêng (`Deutsch_a1-c1/`).

Quyết định: **chỉ dùng app React** làm nguồn học Deutsch duy nhất; index.html giữ lại đúng **1 lối vào launcher** trỏ sang app React ở thư mục con cùng hosting.

## 2. Phương án đã chọn

**A. Hub launcher** — `#/deutsch` trở thành màn hình launcher 1 thẻ, gỡ hẳn nội dung A1/Beruf cũ khỏi index.html.

## 3. Thay đổi

### 3.1 index.html (SPA AzubiHub)

1. **`renderDeutschHub()`** (~index.html:5116) → render 1 thẻ launcher:
   - Icon 🇩🇪, tiêu đề "Deutsch A1–C1 · Sprachziel Master"
   - Mô tả ngắn + badge (36 bài khóa học · 54 bộ đề · 6.000 từ vựng · 86 ngữ pháp)
   - Nút **"Mở app học đầy đủ →"** `href="./deutsch-a1-c1/"`
2. **Routing `#/deutsch`** (~index.html:4258): mọi route `#/deutsch/<level>[/...]` redirect về `#/deutsch` (launcher). Bỏ map `#/fach/deutsch-a1`.
3. **Gỡ script cũ** khỏi index.html ~1714–1721: `faecher/deutsch/deutsch-quiz.js`, `js/deutsch-track.js`, `a1-data.js`, `a1-quiz.js`, `beruf-data.js`.
4. **Gỡ wiring liên quan**:
   - `DeutschTrack.ensureFächer()` trong routing `#/deutsch`
   - Nhánh unlock `fachId.startsWith('deutsch-')` (~index.html:3164)
   - Entry search index trỏ nội dung track cũ (~index.html:4578)
5. **Giữ nguyên**: fach `deutsch` trong `faecher.js` (Visualisierung → `klassenarbeiten/deutsch.html`), trackGate, `klassenarbeiten/deutsch.html`.

### 3.2 App React `Deutsch_a1-c1/`

1. **`vite.config.ts`**: thêm `base: './'` → build file tương đối, deploy được ở thư mục con.
2. **Tab structure** — hoàn thiện phần đã làm dở (uncommitted):
   - 2 main mode: **Học** (Khóa học / Từ vựng / Ngữ pháp / Lộ trình) và **Ôn Thi** (54 đề / Viết mẫu / Luyện nói / Tài liệu).
   - Kiểm tra điều hướng liên màn (VD: nút "Vào học khóa A2" ở Lộ trình → tab Khóa học).
3. **Dọn điểm rối:**
   - Bỏ alias `'a1course'` dư trong `TabType` (đã có `'course'`).
   - RoadmapView mặc định A2 nhưng tab Khóa học mặc định A1 → đảm bảo nhất quán.
4. **Build & copy**: `npm run build` → đưa `dist/` vào thư mục `deutsch-a1-c1/` cùng cấp index.html; cập nhật `.gitignore`.
5. **Footer/hub launcher** đối chiếu số liệu (36 bài, 54 đề, 6000 từ, 86 ngữ pháp) khớp.

## 4. Kiểm thử

- `node --check` các file JS sửa trong index.html (script inline).
- `npx tsc -b` trong `Deutsch_a1-c1/` → pass.
- `npm run build` trong `Deutsch_a1-c1/` → thành công, asset path tương đối.
- Mở index.html: `#/deutsch` hiện launcher; `#/deutsch/a1` redirect về launcher; không còn script lỗi 404 cho `faecher/deutsch/*`.
- Mở `deutsch-a1-c1/` thư mục con: app React load được, tabs điều hướng đúng.

## 5. Ngoài phạm vi

- Nội dung học mới cho A2–C1 (đã có trong app React).
- Thay đổi login/Supabase core.