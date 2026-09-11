---
name: azubihub-monochrome-icons
description: Use khi thêm/sửa icon, emoji, hoặc biểu tượng bất kỳ trong app AzubiHub (index.html, js/*.js, faecher/**/*.js, klassenarbeiten/*.html) — bắt buộc icon SVG inline đơn sắc, cấm emoji, icon font, SVG có màu/gradient
---

# AzubiHub Icons — Inline & Đơn Sắc

## Overview

App AzubiHub **CHỈ** dùng icon **SVG inline, đơn sắc**: màu của icon = màu chữ hiện tại (qua `currentColor`), đường nét mảnh phong cách feather 24×24. Không emoji, không icon font, không `<img src=icon>`, không SVG có màu/gradient cụ thể. (Người dùng không thích màu mè.)

## When to Use

Dùng khi chạm vào bất kỳ biểu tượng nào:
- Nút, hub tile, nav, breadcrumb, brand logo
- Toast, feedback đúng/sai (✅❌😅🎉 hiện tại → SVG + text)
- Nút nghe 🔊, nói 🎤, chậm 🐢 trong js/deutsch-track.js, js/vocab.js
- Trường `icon` trong file data (unit/lektion icon trong faecher/*.js) — chứa chuỗi SVG raw (field render như HTML)
- Thêm tile/trang mới trong index.html, klassenarbeiten/*.html

KHÔNG dùng khi: sửa ảnh thật (images/scans, images/charts), màu CSS theme (--ok/--bad/accent) — những cái này không phải icon.

## Chuẩn icon (bắt buộc)

Template đúng 1 dạng duy nhất (khớp convention có sẵn trong app, VD index.html:1019):

```html
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="..."/></svg>
```

- **Đơn sắc**: không `fill="#hex"`, không `stroke="#hex"`, không gradient. Chỉ `currentColor` (kế thừa CSS — có thể xám/màu theme tùy chỗ, nhưng luôn 1 màu).
- **Inline**: nhúng thẳng `<svg>` vào HTML/chuỗi JS — không icon font, không ảnh.
- **Emoji bị cấm tuyệt đối** trong code app — kể cả trong chuỗi JS, toast, placeholder, data file.

## Bảng quy đổi emoji → SVG

| Emoji cũ | Mục đích | SVG (đặt trong template chuẩn ở trên) |
|---|---|---|
| ▶ / 🔊 | Nghe, phát âm | `<polygon points="6 4 20 12 6 20"/>` |
| 🎤 | Luyện nói | `<path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>` |
| 🐢 | Chậm | `<path d="M6 3h12v4l-5 5 5 5v4H6v-4l5-5-5-5z"/>` |
| 📘 | Grammatik | `<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>` |
| ✅ | Đúng | `<polyline points="20 6 9 17 4 12"/>` |
| ❌ / 😅 | Sai | `<circle cx="12" cy="12" r="9"/><path d="M9 9h.01"/><path d="M15 9h.01"/><path d="M8.5 15h7"/>` |
| 🎉 | Mở khóa | `<polygon points="13 2 3 14 12 14 11 22 21 10 12 10"/>` |
| 🇩🇪 | Deutsch track | `<path d="M3 8.5 12 4l10 4.5-10 4.5z"/>` (3 dải: `<path d="M3 8.5h18"/><path d="M3 15.5h18"/>`) |
| ⭐ | Thành tích | `<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26"/>` |
| ⚡ | Nhanh | `<polygon points="13 2 3 14 12 14 11 22 21 10 12 10"/>` |
| 🏠 | Home/Start | `<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>` |
| 🔍 | Tìm kiếm | `<circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="21" y2="21"/>` |
| 🔒 | Khóa | `<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>` |
| ← / → | Quay lại / mở | `<path d="M19 12H5"/><path d="M12 5l-7 7 7 7"/>` |
| 🧳 / 🚉 / 🏨 | Unit chủ đề | valise: `<rect x="7" y="7" width="10" height="14" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/><path d="M7 12h10"/>`; nhà ga: `<rect x="4" y="3" width="16" height="18"/><path d="M4 10h16"/><path d="M8 21v-4h8v4"/><circle cx="8" cy="6" r=".5"/><circle cx="16" cy="6" r=".5"/>`; khách sạn: `<rect x="4" y="3" width="16" height="18"/><path d="M9 21v-4a3 3 0 0 1 6 0v4"/><path d="M8 7h.01"/><path d="M12 7h.01"/><path d="M16 7h.01"/>` |

Icon chưa có trong bảng: vẽ path ngắn phong cách feather (stroke, bo tròn), không chép icon nhiều màu.

## Verify (bắt buộc trước khi xong việc)

Chạy với **diff làm việc** (chỉ check DÒNG MỚI — emoji legacy cũ trong HEAD không tính, migration xử lý sau):

```bash
node -e "
const cp=require('child_process');
const emoji=/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}]/gu;
const diff=cp.execSync('git diff -U0').toString();
const adds=diff.split('\n').filter(l=>/^\+[^+]/.test(l)).map(l=>l.slice(1));
const uf=cp.execSync('git ls-files --others --exclude-standard').toString().trim().split('\n').filter(f=>/\.(html|js)$/.test(f));
const lines=adds.concat(uf);
const e=lines.filter(l=>emoji.test(l));
const c=lines.filter(l=>/fill=\"#[0-9a-fA-F]+\"|stroke=\"#[0-9a-fA-F]+\"/.test(l));
if(e.length||c.length) throw new Error('EMOJI: '+(e.join(' | ')).slice(0,300)+'\nHEX: '+(c.join(' | ')).slice(0,300));
console.log('icons OK: 0 emoji, 0 hex màu (dòng mới + file untracked)');
"
```

File mới (untracked) vẫn được scan. Emoji còn lại ở HEAD = việc migration, không chặn code mới.
Cộng thêm: `node test/verify-links.mjs` PASS; `node --check` file js đã sửa.

## Migration — di dời emoji hiện có (mỗi bước verify 0 emoji)

1. Liệt kê emoji còn lại: scan toàn bộ file trong HEAD (không chỉ diff): `node -e "const s=require('fs').readFileSync(process.argv[1],'utf8');const e=s.match(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}]/gu);console.log(process.argv[1]+': '+(e||[]).length)"` cho từng file: index.html (hub, nav, toast, tile), js/deutsch-track.js (📘🔊🎤🐢✅❌😅🎉), js/vocab.js (🔊), faecher/deutsch/*.js (unit/lektion icon 🍽️🛍️🧳…), js/faecher.js, js/wissen.js.
2. Thay từng emoji bằng SVG từ bảng quy đổi — giữ nguyên vị trí, class, nhãn text.
3. Feedback/toast: thay ✅❌😅 bằng icon SVG + text "Đúng"/"Sai" (giữ class .good/.bad).
4. Chạy verify → 0 emoji; bump `?v=` cho file đổi trong index.html; commit theo nhóm.
5. KHÔNG đụng: images/scans (ảnh thật), màu CSS theme, nội dung text bài học.

## Common Mistakes & Rationalization

| Lý do | Thực tế |
|---|---|
| "Emoji là convention cũ trong file (u1..u10 đều dùng)" | Convention cũ SAI, đang được di dời — phải dùng SVG từ bảng |
| "Chỉ 1 emoji thôi thì không màu mè" | Emoji luôn mang màu riêng của hệ thống, phá đơn sắc dù 1 cái |
| "Emoji trong toast/feedback cho dễ hiểu" | SVG + text rõ nghĩa hơn, đúng phong cách |
| "Icon font/ảnh nhẹ hơn" | SVG inline 0 request thêm, không dependency |
| "Nhất thời để emoji, sau này đổi" | Mỗi emoji mới củng cố convention sai — đổi ngay khi viết |
| "Icon này không có trong bảng, lấy tạm emoji" | Vẽ path feather mới (stroke, ngắn), hoặc thêm vào bảng |

## Red Flags — DỪNG và viết lại

- Code mới chứa emoji (kể cả trong chuỗi JS/toast)
- SVG có `fill="#…"` hoặc `stroke="#…"` với mã màu hex
- Thêm icon font/`<img>` cho icon
- "Emoji cho tạm, sau đổi" — làm luôn, không tạm
