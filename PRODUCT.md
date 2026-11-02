# PRODUCT.md — AzubiHub (Ôn thi Fach & Gastronomie)

> Tài liệu định vị sản phẩm theo chuẩn Impeccable. Mọi AI coding assistant và lập trình viên khi phát triển tính năng mới bắt buộc phải tuân theo tài liệu này.

---

## 1. Tầm nhìn & Mục đích Cốt lõi (Vision & Purpose)
**AzubiHub** là nền tảng PWA (Progressive Web App) ôn thi chuyên sâu toàn diện dành cho du học sinh nghề và Azubi ngành Nhà hàng - Khách sạn - Ẩm thực (Gastronomie) tại CHLB Đức.

Sản phẩm sinh ra để giải quyết 3 bài toán lớn của học viên nghề:
1. **Rào cản ngôn ngữ & thuật ngữ chuyên môn:** Chuyển hóa khối lượng kiến thức đồ sộ (Lernfeld 1–10, BfK 1/2, GastroAusbV 2022, Warenkunde, Gesetzbuch) thành hệ thống bài học và đề thi song ngữ Đức – Việt chuẩn xác.
2. **Áp lực thời gian sau giờ làm việc thực tế:** Học viên phải làm ca kíp nặng nhọc tại nhà hàng/khách sạn, do đó ứng dụng phải cho phép ôn bài nhanh 5–15 phút mọi lúc, mọi nơi, hoạt động offline mượt mà.
3. **Mỏi mắt & kiệt sức khi học đêm:** Loại bỏ hoàn toàn giao diện chói lóa hoặc các màu neon gây mỏi mắt; mang lại trải nghiệm đọc sách cổ điển, êm dịu, tĩnh tâm như đang đọc một cuốn cẩm nang nghề bằng da thật.

---

## 2. Đối tượng Người dùng (Target Audience)
- **Học viên nghề Gastronomie tại Đức (Azubi):** Các nghề Koch/Köchin, Hotelfachmann/-frau (HoFa), Restaurantfachmann/-frau (ReFa), Fachmann/-frau für Restaurants und Veranstaltungsgastronomie.
- **Người chuẩn bị thi chứng chỉ IHK:** Ôn thi giữa kỳ (*Zwischenprüfung*) và tốt nghiệp (*Abschlussprüfung Teil 1 & Teil 2*).
- **Người học nâng cao năng lực:** Ôn tiếng Đức chuyên ngành (A1–C1, Inhaltsangabe, 6000 từ vựng), Giáo dục công dân (GK - Gemeinschaftskunde), Bài thi định cư (LiD - Leben in Deutschland), và Bằng lái xe Đức (Führerschein).

---

## 3. Giá trị Cốt lõi & Trải nghiệm Người dùng (Core Experience)
- **Học sâu - Không xao nhãng:** Không banner quảng cáo, không hoạt họa nhảy múa thừa thãi, không gamification rẻ tiền gây phân tâm.
- **Tĩnh tâm & Bền bỉ (Calm & Durable):** Thiết kế mô phỏng trang sách giấy da cổ điển (*Parchment*), đọc văn bản dài và làm 50–100 câu trắc nghiệm liên tục mà không mỏi mắt.
- **Độ tin cậy tuyệt đối:** Thuật ngữ tiếng Đức chuẩn khung đào tạo Đức (BIBB / IHK / Rahmenlehrplan), giải thích tiếng Việt rõ nghĩa, chính xác, không dịch máy cẩu thả.
- **Offline First (PWA):** Tải trang tức thì, lưu trữ tiến độ học tập trên thiết bị (LocalStorage / IndexedDB), hoạt động ổn định trên tàu điện (U-Bahn/S-Bahn) khi mất sóng.

---

## 4. Ngữ điệu & Phong cách Giao tiếp (Voice & Tone)
- **Điềm đạm, Nghiêm cẩn, Học thuật:** Lời văn chỉn chu, tôn trọng người học, chuẩn phong cách nghề nghiệp hiếu khách cao cấp (*Hospitality*).
- **Rõ ràng & Thực dụng:** Giải thích ngắn gọn tại sao đáp án này đúng, tại sao quy trình kia vi phạm an toàn thực phẩm (HACCP).
- **Không nhí nhố:** Không sử dụng emoji giật gân (🔥, 🚀, 😱), không dùng ngôn từ tâng bốc thái quá. Thông báo kết quả đúng/sai văn minh, tích cực.

---

## 5. Ràng buộc Kỹ thuật & Hiệu năng (Technical Constraints)
- **Môi trường chạy:** Progressive Web App (PWA) thuần HTML/CSS/Vanilla JS, không framework cồng kềnh (zero heavy runtime).
- **Tương thích Mobile:** Ưu tiên số một là trải nghiệm một tay trên điện thoại (iPhone Safari, Android Chrome).
- **Tốc độ tải:** File CSS/JS nhẹ, không nạp font bên ngoài quá nhiều, ưu tiên bộ nhớ đệm Cache Storage và Service Worker.
- **Bảo toàn dữ liệu cục bộ:** Kết quả làm bài, streak, thẻ nhớ flashcard phải được bảo toàn ngay cả khi trình duyệt đóng đột ngột.
