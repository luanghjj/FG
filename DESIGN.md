# DESIGN.md — AzubiHub Design System & Tokens

> Tài liệu quy chuẩn thiết kế theo chuẩn Impeccable dành riêng cho AzubiHub.
> Bắt buộc tuân thủ nguyên tắc: **Parchment Theme (Giấy da vintage)** + **Monochrome Icons (Biểu tượng đơn sắc)**.
> Chống mọi dạng "AI Slop" (gradient tím SaaS, card lồng card, emoji lòe loẹt, chữ xám khó đọc).

---

## 1. Triết lý Thiết kế (Design Philosophy)
- **Gesetzbuch zum Lernen & Elite Hospitality:** Giao diện mang hơi thở của một cuốn cẩm nang luật nghề cổ điển bằng giấy da, kết hợp sự trang nhã của ngành dịch vụ hiếu khách cao cấp (Ivory + Amber).
- **Trầm tĩnh & Bảo vệ mắt:** Tông màu vàng ngà giấy da kết hợp mực than chì giúp mắt thư giãn tối đa trong các phiên học đêm kéo dài.
- **Tối giản cấu trúc (Structural Simplicity):** Dùng đường nét mảnh (hairline), viền đồng thau và khoảng cách hợp lý để phân cấp nội dung, hạn chế tối đa bóng đổ đậm hoặc các mảng màu chói gắt.

---

## 2. Hệ Thống Màu & Biến CSS (Color Tokens)

### 2.1. Chế độ Sáng — Parchment & Wax (Mặc định)
```css
:root, :root[data-theme="light"] {
  /* Nền và bề mặt */
  --bg: #E2D8C2;            /* Giấy da tự nhiên (parchment) */
  --surface: #FDFBF6;       /* Bề mặt thẻ trắng ngà (ivory) */
  --surface-card: #FDFBF6;  /* Bề mặt thẻ trắc nghiệm / flashcard */
  
  /* Văn bản (Mực in cổ điển) */
  --ink: #0F172A;           /* Mực than sẫm, độ tương phản cao, không chói */
  --muted: #5A5344;         /* Nâu đất nhạt cho chú thích, breadcrumb */
  
  /* Đường viền & Phân cách */
  --line: #B5A27C;          /* Đường chỉ may / viền đồng thau mảnh */
  
  /* Điểm nhấn & Trạng thái */
  --accent: #9A4607;        /* Hổ phách / Sáp niêm phong (wax seal) */
  --accent-soft: #F7E6CC;   /* Nền đệm ấm cho badge, tag, icon chip */
  --accent-2: #D97706;      /* Hổ phách sáng cho hover / trạng thái active */
  
  /* Trạng thái làm bài */
  --ok: #3F5C39;            /* Xanh rêu cổ điển (Đáp án đúng) */
  --okbg: #EEF3EA;          /* Nền xanh rêu nhạt */
  --bad: #9A4607;           /* Nâu đỏ sáp (Đáp án sai / cảnh báo) */
  --badbg: #FDF3E3;         /* Nền nâu đỏ nhạt */
  --warn: #B45309;          /* Hổ phách cảnh báo */
  --warnbg: #FDF3E3;
}
```

### 2.2. Chế độ Tối — Dark Academia
```css
:root[data-theme="dark"] {
  --bg: #1A1916;            /* Nền da thuộc tối màu */
  --surface: #26231E;       /* Thẻ gỗ mun ấm */
  --surface-card: #201D18;
  --line: #5A5040;          /* Viền kim loại mờ */
  --ink: #EAE3D0;           /* Chữ màu ngà sáng */
  --muted: #A39B88;         /* Chữ phụ màu tro */
  --accent: #E08A3C;        /* Hổ phách phát sáng nhẹ */
  --accent-soft: #382522;
}
```

---

## 3. Hệ Thống Font Chữ (Typography)

| Vai trò | Phông chữ chỉ định | Mục đích sử dụng |
|---|---|---|
| **Tiêu đề (Headings)** | `"Playfair Display", Georgia, serif` | Dùng cho `h1`, `h2`, tên Fach, tên Lernfeld, tiêu đề modal trang trọng. |
| **Giao diện & Đọc (Body/UI)** | `"Plus Jakarta Sans", -apple-system, sans-serif` | Dùng cho nội dung câu hỏi, đáp án trắc nghiệm, thanh điều hướng, nút bấm. |
| **Kỹ thuật & Dữ liệu (Mono)** | `"IBM Plex Mono", ui-monospace, monospace` | Dùng cho mã câu hỏi (LF01-Q12), số điểm, phím tắt, đồng hồ đếm giờ. |

### Quy tắc Typography:
- **Chiều cao dòng (`line-height`):** Luôn duy trì từ `1.5` đến `1.65` đối với văn bản nội dung tiếng Đức dài để tránh dính chữ khi có từ ghép dài (*Komposita*).
- **Kích thước tối thiểu:** Không dùng cỡ chữ nhỏ hơn `12px` (hoặc `0.75rem`) trên bất kỳ thiết bị nào.
- **Tiêu đề:** Tận dụng `font-family: var(--font-head)` với `font-weight: 600` để toát lên tính cổ điển sang trọng.

---

## 4. Quy Chuẩn Icon (Iconography Standards)

Tuân thủ nghiêm ngặt kỹ năng `azubihub-monochrome-icons`:
- **Chỉ dùng SVG inline đơn sắc:** 100% icon phải dùng cú pháp:
  ```html
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="..."/>
  </svg>
  ```
- **Kế thừa màu chữ (`currentColor`):** Không dùng `fill="#hex"` hoặc `stroke="#hex"`. Màu của icon sẽ tự đổi theo màu chữ hoặc màu của container chứa nó.
- **CẤM TUYỆT ĐỐI EMOJI:** Không đặt emoji trong HTML, chuỗi JS, thông báo toast, modal hay tiêu đề. Tất cả các ký hiệu như nghe, nói, đúng, sai, bookmark đều phải là SVG đơn sắc chuẩn nét 24×24.

---

## 5. Bố Cục, Khoảng Cách & Bo Góc (Layout & Spacing)

- **Bo góc (Border Radius):**
  - Thẻ card, container chính: `var(--radius)` = `12px`
  - Nút bấm nhỏ, tag, chip, input: `var(--radius-sm)` = `8px`
  - Nút tròn biểu tượng (avatar, icon button): `border-radius: 9999px`
- **Đổ bóng (Elevation):**
  - Đổ bóng nhẹ dạng sương mù: `var(--elite-shadow-1): 0 4px 20px -3px rgba(27, 28, 26, .06)`
  - Không dùng bóng đen xì (`box-shadow: 0 10px 20px #000`) gây nặng nề bẩn layout.
- **Khu vực bấm cảm ứng (Touch Targets):**
  - Mọi nút bấm, thẻ đáp án trắc nghiệm trên mobile phải có chiều cao tối thiểu **44px** (khuyên dùng **48px**) để người dùng bấm ngón tay cái dễ dàng mà không trúng nhầm nút bên cạnh.

---

## 6. Danh Sách Anti-Patterns — Những Thứ AI Tuyệt Đối Không Được Làm (Anti-Slop)

1. ❌ **Không gradient tím/xanh neon kiểu SaaS:** Tuyệt đối không dùng `linear-gradient` xanh dương - tím - hồng thịnh hành của các mẫu landing page AI thông thường.
2. ❌ **Không đen tuyền `#000000` hoặc xám mờ khó đọc:** Văn bản chính luôn dùng `--ink` (`#0F172A`), văn bản phụ dùng `--muted` (`#5A5344`), đảm bảo tương phản đạt chuẩn WCAG AA trên nền giấy da.
3. ❌ **Không lồng thẻ quá mức (Nested Cards):** Không đặt card trong card rồi lại lồng thêm card con. Hãy phân tách bằng đường kẻ hairline `1px solid var(--line)` hoặc khoảng trống (whitespace).
4. ❌ **Không hiệu ứng nảy giật cục:** Không dùng CSS bounce hoặc spin quá đà khi chọn câu hỏi trắc nghiệm; chỉ dùng transition mềm (`transition: all 0.2s ease`).
5. ❌ **Không xáo trộn Layout (No Layout Shift):** Khi hiện giải thích câu hỏi hoặc âm thanh phát âm, container phải mở rộng mượt mà, không giật màn hình khiến người dùng bấm nhầm.
