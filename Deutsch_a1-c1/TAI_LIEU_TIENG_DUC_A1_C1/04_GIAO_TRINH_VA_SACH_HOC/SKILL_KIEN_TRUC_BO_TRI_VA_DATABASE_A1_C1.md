# 🇩🇪 SKILL SPECIFICATION: KIẾN TRÚC BỐ TRÍ VÀ HỆ THỐNG DỮ LIỆU TOÀN DIỆN (A1 → C1)
> **Nguồn gốc bóc tách:** Hệ thống nền tảng luyện thi tiếng Đức trực tuyến Sprachziel (https://sprachziel.com/)  
> **Phiên bản:** Master Data & Architecture v2.0 (100% Database Clone)  
> **Cập nhật ngày:** 12/08/2026

---

## 📑 MỤC LỤC
1. [Báo cáo Kiểm toán Dữ liệu (Audit & Completion Report)](#1-báo-cáo-kiểm-toán-dữ-liệu)
2. [Kiến trúc Phân cấp & Bố trí theo từng Cấp độ (A1 → C1)](#2-kiến-trúc-phân-cấp--bố-trí-theo-từng-cấp-độ-a1--c1)
   - [Trình độ A1 (A1.1 – A1.2): Căn bản & Khởi động](#trình-độ-a1-a11--a12)
   - [Trình độ A2 (A2.1 – A2.2): Đời sống & Mở rộng](#trình-độ-a2-a21--a22)
   - [Trình độ B1 (B1.1 – B1.2): Độc lập & Trọng tâm luyện thi](#trình-độ-b1-b11--b12)
   - [Trình độ B2 (B2.1 – B2.2): Chuyên môn & Du học nghề / Đi làm](#trình-độ-b2-b21--b22)
   - [Trình độ C1: Học thuật & Chuyên sâu](#trình-độ-c1)
3. [Kiến trúc Luyện 4 Kỹ năng Chuẩn CEFR & Dạng Đề](#3-kiến-trúc-luyện-4-kỹ-năng-chuẩn-cefr--dạng-đề)
   - [Leseverstehen & Sprachbausteine (Đọc hiểu & Điền từ)](#leseverstehen--sprachbausteine)
   - [Hörverstehen (Nghe hiểu & Audio Subtitles)](#hörverstehen)
   - [Schreiben (Viết thư & Bộ bài mẫu B1/B2)](#schreiben)
   - [Sprechen (Luyện nói, Redemittel & Tiêu chí chấm)](#sprechen)
4. [Bản đồ Cơ sở Dữ liệu 100% (Database Schema & Files)](#4-bản-đồ-cơ-sở-dữ-liệu-100)
5. [Tích hợp Trợ lý Trí tuệ Nhân tạo (AI Reasoning & Feedback)](#5-tích-hợp-trợ-lý-trí-tuệ-nhân-tạo-ai)

---

## 1. BÁO CÁO KIỂM TOÁN DỮ LIỆU

### 🔍 So sánh Dữ liệu Ban đầu vs Dữ liệu Toàn bộ (100%) của Web:

| Thành phần dữ liệu | Dữ liệu cũ của bạn | Cơ sở dữ liệu 100% đã bóc tách bổ sung | Trạng thái |
| :--- | :--- | :--- | :--- |
| **Kho Từ vựng** | 6,000 từ chuyên ngành CSV & JSON | 6,000 từ + 9 bộ ngôn ngữ dịch nghĩa + Audio phát âm | ✅ **Hoàn chỉnh 100%** |
| **Ngữ pháp & Động từ** | 1 file tóm tắt 61 KB | 86 bài giảng chi tiết + Công thức + Bài tập + Giải thích | ✅ **Hoàn chỉnh 100%** |
| **Đề thi Nghe (Hören)** | 1 file tổng hợp 325 KB | 54 đề nghe + 18 bài audio transcript + Subtitles + 70 ngân hàng đề thi | ✅ **Bổ sung Full** |
| **Đề thi Đọc (Lesen)** | 1 file 18 KB | 54 đề đọc Goethe/TELC + 22 đề tổng hợp Teil 1-3 | ✅ **Bổ sung Full** |
| **Sprachbausteine** | 1 file 24 KB | 54 đề điền từ Teil 1 & Teil 2 có đáp án và phân tích | ✅ **Bổ sung Full** |
| **Bài viết mẫu (Schreiben)** | *Chưa có* | **25 bài mẫu TELC B1** + **Bộ bài mẫu TELC B2** (Bewerbung, Beschwerde) | 🌟 **Đã nạp Mới** |
| **Đề thi theo Cấp độ (Goethe A1-B2)** | *Chưa có* | Ngân hàng đề thi Goethe A1 (1-3), A2 (1-4), B1 (1-2), B2, ÖSD B2, DTZ | 🌟 **Đã nạp Mới** |
| **Kho Tài liệu & Sách PDF** | *Chưa có link trực tiếp* | **24 file PDF tải trực tiếp** (Cloudfront) + **66 thư mục Google Drive A1→C1** | 🌟 **Đã nạp Mới** |
| **Giải thích AI & Dịch thuật** | *Chưa có* | Ngân hàng giải thích đáp án song ngữ 394 KB | 🌟 **Đã nạp Mới** |

Toàn bộ dữ liệu bóc tách được lưu trữ độc lập tại thư mục:  
📁 `/Users/nguyenchilinh/Desktop/ôn thi/Deutsch_a1-c1/database_100_percent/`

---

## 2. KIẾN TRÚC PHÂN CẤP & BỐ TRÍ THEO TỪNG CẤP ĐỘ (A1 → C1)

```
        ┌─────────────────────────────────────────────────────────┐
        │                 C1: HỌC THUẬT & CHUYÊN SÂU              │
        │      • Văn bản học thuật, Konjunktiv I, Báo cáo         │
        ├─────────────────────────────────────────────────────────┤
        │           B2: CHUYÊN NGHIỆP & DU HỌC NGHỀ               │
        │   • Điều dưỡng/Bếp/Nhà hàng, Nomen-Verb, Bewerbung      │
        ├─────────────────────────────────────────────────────────┤
        │           B1: TỰ CHỦ & TRỌNG TÂM THI CHỨNG CHỈ          │
        │    • Passiv, Relativsatz, Konjunktiv II, Viết thư 4 ý   │
        ├─────────────────────────────────────────────────────────┤
        │             A2: ĐỜI SỐNG & GIAO TIẾP MỞ RỘNG            │
        │     • Perfekt/Präteritum, Dativ, Wechselpräpositionen   │
        ├─────────────────────────────────────────────────────────┤
        │              A1: NHẬP MÔN & PHÁT ÂM CĂN BẢN             │
        │      • Präsens, der/die/das, Nominativ/Akkusativ, W-Frage │
        └─────────────────────────────────────────────────────────┘
```

---

### Trình độ A1 (A1.1 – A1.2)
* **Đối tượng:** Người mới bắt đầu học tiếng Đức từ con số 0.
* **Mục tiêu năng lực:** Phát âm chuẩn, hiểu và sử dụng các mẫu câu quen thuộc hàng ngày, tự giới thiệu bản thân và người khác, hỏi đáp về nơi ở, bạn bè, đồ vật.
* **Chủ đề từ vựng:**
  * Bảng chữ cái, số đếm, ngày tháng, thời gian.
  * Gia đình, nghề nghiệp, quốc gia, ngôn ngữ.
  * Mua sắm tại siêu thị, gọi món tại nhà hàng, hỏi đường, phương tiện giao thông.
* **Ngữ pháp trọng tâm:**
  * Chia động từ có quy tắc và bất quy tắc ở thì hiện tại (*Präsens*).
  * Động từ khuyết thiếu cơ bản: *können, möchten, müssen*.
  * Mạo từ xác định (*der, die, das*), không xác định (*ein, eine, ein*), mạo từ phủ định (*kein, keine*).
  * Hai cách cơ bản: *Nominativ* và *Akkusativ*.
  * Đại từ nhân xưng: *ich, du, er, sie, es, wir, ihr, sie, Sie*.
  * Cấu trúc câu: Câu trần thuật (V2), Câu hỏi Yes/No (V1), Câu hỏi có từ để hỏi (W-Fragen).
* **Tài liệu học tập tương ứng:**
  * *Giáo trình:* Schritte Plus A1.1 & A1.2, Studio d A1, Menschen A1.
  * *PDF tải trực tiếp:* `TuvungA1DucViet_ec8414e8.pdf`, `TuVungGoetheA1_fa990aaf.pdf`, `SchrittePlusA1.1_2fa5929f.pdf`, `TuVungNguPhapA1_d0c2a79d.pdf`.
  * *Bộ đề thi thực hành:* `GoetheA1LesenSim` (1, 2, 3), `GoetheA1HoerenSim` (1, 2, 3), `GoetheA1SchreibenSim` (1, 2, 3), `GoetheA1SprechenSim` (1, 2, 3).

---

### Trình độ A2 (A2.1 – A2.2)
* **Đối tượng:** Học viên đã hoàn thành A1, cần mở rộng giao tiếp thực tế và sinh sống tại Đức.
* **Mục tiêu năng lực:** Kể lại các sự việc trong quá khứ, miêu tả môi trường xung quanh, trao đổi về công việc, mua sắm phức tạp hơn, đi khám bệnh, thuê nhà.
* **Chủ đề từ vựng:**
  * Nhà ở, nội thất, tìm phòng thuê (*Wohnungssuche*).
  * Sức khỏe, cơ thể người, hẹn lịch bác sĩ (*Arztbesuch*).
  * Công việc, lịch làm việc, trường học, giao tiếp công sở căn bản.
  * Du lịch, đặt phòng khách sạn, thời tiết, kỳ nghỉ.
* **Ngữ pháp trọng tâm:**
  * Thì quá khứ hoàn thành (*Perfekt*) với trợ động từ *haben* hoặc *sein* + *Partizip II*.
  * Thì quá khứ đơn (*Präteritum*) của *sein*, *haben* và các *Modalverben* (*musste, konnte, durfte, wollte*).
  * Cách 3 (*Dativ*): Biến cách của mạo từ và đại từ nhân xưng ở Dativ.
  * Giới từ đi với Dativ (*aus, bei, mit, nach, seit, von, zu*).
  * Giới từ 2 cách (*Wechselpräpositionen*: *an, auf, hinter, in, neben, über, unter, vor, zwischen*): Wohin + Akkusativ / Wo + Dativ.
  * Liên từ phụ đẩy động từ xuống cuối (*weil, dass, wenn*).
  * Đại từ phản thân cơ bản (*Reflexivpronomen*).
  * So sánh hơn và so sánh nhất của tính từ (*Komparativ & Superlativ*).
* **Tài liệu học tập tương ứng:**
  * *Giáo trình:* Schritte Plus A2.1 & A2.2, Studio d A2, Grammatik aktiv A1-B1.
  * *PDF tải trực tiếp:* `tu-vung-duc-viet-a2_da9188cd.pdf`, `tu-vung-goethe-a2_786c1dcd.pdf`, `schritte-plus-a2-2_e138a003.pdf`, `ngu-phap-goethe-a2_35b06360.pdf`.
  * *Bộ đề thi thực hành:* `GoetheA2LesenSim` (1-4), `GoetheA2HoerenSim` (1-4), `GoetheA2SchreibenSim` (1-4), `GoetheA2SprechenSim` (1-4).

---

### Trình độ B1 (B1.1 – B1.2)
* **Đối tượng:** Học viên chuẩn bị thi chứng chỉ (Goethe B1 / TELC B1 / ÖSD B1 / DTZ) để nộp hồ sơ Visa du học nghề, đại học hoặc định cư.
* **Mục tiêu năng lực:** Hiểu các ý chính trong văn bản chuẩn về công việc, học tập, giải trí. Viết văn bản đơn giản có liên kết về các chủ đề quen thuộc, thư từ phàn nàn/cảm ơn. Trình bày ước mơ, hy vọng, mục tiêu và đưa ra lý do, giải thích ngắn gọn.
* **Ngữ pháp trọng tâm:**
  * Thể bị động (*Passiv*): Präsens Passiv, Präteritum Passiv, Passiv với Modalverben (*muss gemacht werden*).
  * Giả định cách II (*Konjunktiv II*): Thể hiện mong muốn (*hätte gern, wäre*), lời khuyên (*sollte*), đề nghị lịch sự (*könnte, würde + Infinitiv*).
  * Mệnh đề quan hệ (*Relativsatz*): Với Nominativ, Akkusativ, Dativ và Giới từ (*in dem, mit der*).
  * Cách 4 (*Genitiv*): Sở hữu cách và giới từ đi với Genitiv (*wegen, während, trotz, statt*).
  * Chia đuôi tính từ (*Adjektivdeklination*): Sau mạo từ xác định, không xác định và mạo từ số 0.
  * Liên từ nâng cao: *obwohl, trotzdem, damit / um...zu, als / wenn, während, seitdem, da*.
  * Động từ đi kèm giới từ cố định (*warten auf, sich freuen über/auf, träumen von*).
* **Tài liệu học tập tương ứng:**
  * *Giáo trình:* Aspekte B1+, Schritte Plus B1, Einfach Grammatik, Grammatik aktiv B1.
  * *PDF tải trực tiếp:* `tu-vung-goethe-b1_57c56580.pdf`, `ngu-phap-b1-goethe_2639f0a3.pdf`, `chung-ta-cung-hoc-tieng-duc_dde2bc90.pdf`, `de-telc-thuong-xuyen-ra-nhat_7d83c852.pdf`.
  * *Bộ đề thi thực hành:* `GoetheB1LesenBank`, `GoetheB1HoerenBank`, `GoetheB1SchreibenBank`, `GoetheB1SprechenBank`, `TelcFullExam B1` (54 đề trọn gói).

---

### Trình độ B2 (B2.1 – B2.2)
* **Đối tượng:** Du học sinh nghề chuyên ngành Điều dưỡng (*Pflege*), Đầu bếp (*Küche*), Nhà hàng - Khách sạn (*Hotelfach/Restaurant*), Kỹ thuật viên cơ khí, nhân viên làm việc tại các công ty Đức.
* **Mục tiêu năng lực:** Hiểu nội dung phức tạp của các văn bản chuyên môn sâu. Giao tiếp trôi chảy tự nhiên với người bản ngữ. Viết thư trang trọng chuyên nghiệp (thư ứng tuyển việc làm, thư khiếu nại chất lượng dịch vụ). Thuyết trình và tranh luận học thuật.
* **Ngữ pháp trọng tâm:**
  * Cụm danh từ - động từ cố định (*Nomen-Verb-Verbindungen*: *zur Verfügung stehen, eine Entscheidung treffen, in Kauf nehmen, Rücksicht nehmen auf*).
  * Tính từ phân từ mở rộng (*Partizipialattribute*: Partizip I + d & Partizip II với định ngữ mở rộng).
  * Gián tiếp cách I (*Konjunktiv I*) dùng trong tường thuật báo chí, văn bản pháp lý.
  * Liên từ đôi (*Zweiteilige Konnektoren*: *nicht nur... sondern auch, sowohl... als auch, weder... noch, entweder... oder, zwar... aber, je... desto/umso*).
  * Danh từ hóa động từ & tính từ (*Nominalisierung*: *beim Lesen, das Schöne*).
  * Cấu trúc thay thế bị động (*Passiversatzformen*: *sein zu + Infinitiv, sich lassen + Infinitiv, -bar, -lich, -fähig*).
* **Tài liệu học tập tương ứng:**
  * *Giáo trình:* Aspekte Neu B2, Mittelpunkt B2, Erkundungen B2, Fit fürs Goethe-Zertifikat B2.
  * *PDF tải trực tiếp:* `TuVungB2_TrinhDo_82e5ba0d.pdf`, `tu-vung-dieu-duong_e475a574.pdf` (Từ vựng chuyên ngành Điều dưỡng).
  * *Bộ đề thi thực hành:* `GoetheB2LesenBank`, `GoetheB2HoerenBank`, `GoetheB2SchreibenBank`, `GoetheB2SprechenBank`, `TelcB2FullExam`, `OsdB2SprechenBank`.

---

### Trình độ C1
* **Đối tượng:** Sinh viên học đại học, thạc sĩ, bác sĩ, kỹ sư và chuyên gia làm việc cấp cao tại Đức.
* **Mục tiêu năng lực:** Hiểu nhiều loại văn bản dài, phức tạp và nhận ra hàm ý ẩn giấu. Diễn đạt ý tưởng một cách lưu loát và tự phát mà không gặp khó khăn trong việc tìm từ ngữ. Sử dụng ngôn ngữ linh hoạt và hiệu quả cho các mục đích xã hội, học thuật và nghề nghiệp.
* **Tài liệu học tập tương ứng:**
  * *Thư mục Google Drive C1 độc quyền:* `https://drive.google.com/drive/u/1/folders/1rGXmOfuu9El-Bu_2d6wYSCPCg1ezb5It`.
  * *Bộ giáo trình:* Erkundungen C1, Aspekte Neu C1, Mit Erfolg zu TELC C1 Hochschule.

---

## 3. KIẾN TRÚC LUYỆN 4 KỸ NĂNG CHUẨN CEFR & DẠNG ĐỀ

### 📖 Leseverstehen & Sprachbausteine (Đọc hiểu & Điền từ)

```
[Leseverstehen]
├── Teil 1: Đọc quét tiêu đề (Skimming & Matching)
│   └── Format: 5 bài báo ngắn + 10 tiêu đề. Tìm từ khóa đồng nghĩa (Synonyms)
├── Teil 2: Đọc chi tiết trắc nghiệm (Scanning & Multiple Choice)
│   └── Format: 1 bài văn dài chuyên sâu + 5 câu hỏi A, B, C
└── Teil 3: Ghép tình huống đời thực (Situations & Advertisements)
    └── Format: 10-12 nhu cầu người thực tế + 10 mẩu quảng cáo (Có đáp án 0/x)

[Sprachbausteine]
├── Teil 1: Điền từ Ngữ pháp (Grammar Cloze Test)
│   └── 10 chỗ trống dạng trắc nghiệm A, B, C (Mạo từ, giới từ, đuôi tính từ, đại từ, liên từ)
└── Teil 2: Điền từ Từ vựng & Liên từ (Vocabulary Cloze Test)
    └── 10 chỗ trống chọn từ hộp 15 từ (a-o) (Từ vựng cố định, liên từ logic)
```

---

### 🎧 Hörverstehen (Nghe hiểu & Audio Subtitles)

* **Teil 1: Thông báo công cộng (Kurze Durchsagen):** Nghe 1 lần các thông báo ở sân bay, nhà ga tàu hỏa, siêu thị, bản tin dự báo thời tiết. Trả lời câu hỏi Đúng/Sai hoặc A/B/C.
* **Teil 2: Phỏng vấn Radio / Phóng sự (Interview & Reportage):** Nghe phỏng vấn người thật (nghe 1-2 lần). Xác định quan điểm nhân vật.
* **Teil 3: Hội thoại đời thường (Alltagsgespräche):** Nghe trao đổi qua lại giữa bạn bè, đồng nghiệp về công việc, kế hoạch học tập.
* **Tính năng hỗ trợ độc quyền:** Hệ thống hiển thị **Audio Waveform + Script đồng bộ thời gian (Subtitles)** giúp học viên nghe chậm từng câu và tra cứu từ vựng không nghe được.

---

### ✍️ Schreiben (Viết thư & Bộ bài mẫu B1/B2)

Hệ thống cung cấp **25 bài mẫu chuẩn điểm tối đa cho B1** và **bộ bài mẫu nâng cao cho B2** với cấu trúc chuẩn 5 phần:

```
[1. LỜI CHÀO ĐẦU THƯ]
  • Thân mật: "Liebe/Lieber [Tên],"
  • Trang trọng: "Sehr geehrte Damen und Herren," / "Sehr geehrte(r) Frau/Herr [Họ],"

[2. ĐOẠN MỞ ĐẦU - NÊU LÝ DO]
  • "Ich schreibe Ihnen/dir, weil..." / "Vielen Dank für Ihre/deine Nachricht..."

[3. THÂN BÀI - BẮT BUỘC 4 ĐIỂM GỢI Ý (LEITPUNKTE)]
  • Leitpunkt 1: Phát triển 2-3 câu hoàn chỉnh + Liên từ logic
  • Leitpunkt 2: Đưa ra dẫn chứng / cảm xúc cá nhân
  • Leitpunkt 3: Giải thích nguyên nhân hoặc đề xuất giải pháp
  • Leitpunkt 4: Đặt câu hỏi tương tác lại người nhận

[4. ĐOẠN KẾT & LỜI HẸN]
  • "Ich würde mich über eine baldige Antwort sehr freuen."
  • "Schreib mir bald wieder!"

[5. LỜI CHÀO KẾT & KÝ TÊN]
  • "Mit freundlichen Grüßen" (Trang trọng) / "Herzliche Grüße" (Thân mật)
```

#### Tiêu chí chấm điểm chuẩn quốc tế (Tổng 45 điểm):
1. **Aufgabenbewältigung (15 điểm):** Trả lời đầy đủ và sâu sắc cả 4 ý gợi ý của đề.
2. **Grammatische Korrektheit (10 điểm):** Chia động từ, vị trí động từ, cách Kasus chuẩn xác.
3. **Wortschatz & Redemittel (10 điểm):** Sử dụng từ vựng phong phú, đúng ngữ cảnh cấp độ.
4. **Kohärenz & Textaufbau (10 điểm):** Đoạn văn mạch lạc, chia đoạn hợp lý, liên từ nối mượt mà.

---

### 🎙️ Sprechen (Luyện nói, Redemittel & Tiêu chí chấm)

* **Teil 1: Tự giới thiệu / Thuyết trình (Präsentation):**
  * *A1/A2:* Tên tuổi, xuất xứ, gia đình, sở thích, nghề nghiệp, ngoại ngữ.
  * *B1/B2:* Thuyết trình 3 phút về một chủ đề xã hội (Cấu trúc: Giới thiệu đề tài -> Trải nghiệm cá nhân tại Việt Nam -> Tình hình chung -> Ưu/nhược điểm -> Quan điểm cá nhân -> Lời cảm ơn).
* **Teil 2: Mô tả tranh / Thảo luận bài báo (Bildbeschreibung & Diskussion):**
  * Sử dụng Redemittel mô tả: *Auf dem Bild sehe ich... Im Vordergrund / Im Hintergrund... Es scheint so, dass...*
  * Đưa ra ý kiến: *Meiner Meinung nach... Ich bin der Ansicht, dass... Da stimme ich Ihnen vollkommen zu.*
* **Teil 3: Lập kế hoạch chung / Giải quyết vấn đề (Gemeinsam etwas planen):**
  * Đưa ra đề xuất: *Ich schlage vor, dass wir... / Wie wäre es, wenn wir...?*
  * Đồng ý/Bác bỏ: *Das klingt gut, aber... / Ich bin ganz deiner Meinung.*
  * Chốt thời gian và phân công: *Wann und wo treffen wir uns? / Ich übernehme die Vorbereitung.*

---

## 4. BẢN ĐỒ CƠ SỞ DỮ LIỆU 100% (DATABASE SCHEMA & FILES)

Toàn bộ dữ liệu của nền tảng Sprachziel đã được xuất ra thành các tệp tin có thể sử dụng ngay:

```
/Users/nguyenchilinh/Desktop/ôn thi/Deutsch_a1-c1/
├── database_100_percent/
│   ├── tu_vung_6000_full.json                       # Kho 6.000 từ vựng đầy đủ A1-B2 & Chuyên ngành
│   ├── ngu_phap_va_dong_tu_86_bai.json               # 86 bài học ngữ pháp + công thức + bài tập
│   ├── de_thi_audio_va_transcript_hoeren_18_bai.json# 18 bài nghe kèm lời thoại & bài tập
│   ├── de_thi_doc_hieu_lesen_54_de.json             # 54 bộ đề đọc hiểu chuẩn hóa
│   ├── de_thi_phan_2_54_de.json                     # 54 bộ đề đọc hiểu Teil 2 chi tiết
│   ├── de_thi_sprachbausteine_54_de.json            # 54 bộ đề điền từ ngữ pháp & từ vựng
│   ├── kho_bai_viet_mau_telc_b1_b2.json             # 25 bài mẫu thư B1 + Toàn bộ bài mẫu B2
│   ├── de_thi_va_ngan_hang_goethe_a1.json           # Ngân hàng đề thi Goethe A1 (Lesen, Hoeren, Schreiben, Sprechen)
│   ├── de_thi_va_ngan_hang_goethe_a2.json           # Ngân hàng đề thi Goethe A2 (1-4)
│   ├── de_thi_va_ngan_hang_goethe_b1.json           # Ngân hàng đề thi Goethe B1 (Lesen, Hoeren, Schreiben, Sprechen)
│   ├── de_thi_va_ngan_hang_goethe_b2_osd_b2.json    # Ngân hàng đề thi Goethe B2 & ÖSD B2
│   ├── de_thi_full_exam_telc_b1_b2.json             # Đề thi trọn vẹn 4 kỹ năng TELC B1 & B2
│   ├── giai_thich_dap_an_va_dich_song_ngu.json      # Ngân hàng giải thích đáp án AI song ngữ 9 thứ tiếng
│   ├── de_thi_tong_hop_q_22_de.json                 # 22 bộ đề tổng hợp nâng cao
│   ├── de_thi_tong_hop_F_15_de.json                 # 15 bộ đề thực hành mở rộng
│   ├── de_thi_tong_hop_L_12_de.json                 # 12 bộ đề đọc hiểu bổ trợ
│   ├── danh_sach_70_ngan_hang_de_thi_raw.json       # Mục lục 70 tệp ngân hàng đề thi thô
│   └── kho_tai_lieu_giao_trinh_va_drive_A1_C1.json  # 24 Link PDF tải trực tiếp + 66 Thư mục Google Drive
├── kho_tai_lieu_giao_trinh_va_drive_A1_C1.json
├── tu_vung_chuyen_nganh_6000.csv
├── tu_vung_chuyen_nganh_6000.json
├── ngu_phap_va_dong_tu.json
├── sprachbausteine_dien_tu.json
├── de_thi_hoeren_nghe.json
├── de_thi_lesen_doc_hieu.json
└── cau_truc_va_phuong_phap_giang_day_A1_B2.md
```

---

## 5. TÍCH HỢP TRỢ LÝ TRÍ TUỆ NHÂN TẠO (AI)

Hệ thống Sprachziel ứng dụng 3 Module AI cốt lõi:

1. **AI Explanation Engine (Giải thích đáp án sâu):**
   * Tự động phân tích câu hỏi học viên làm sai.
   * Cung cấp bằng chứng cụ thể từ đoạn văn bản/audio thoại.
   * Dịch nghĩa câu chứa đáp án sang tiếng Việt và giải thích bẫy ngữ pháp.
2. **AI Writing Corrector (Chấm & sửa bài viết Schreiben):**
   * Kiểm tra lỗi chính tả (*Rechtschreibung*), dấu câu (*Kommasetzung*).
   * Phân tích ngữ pháp (*Kasus, Verbposition, Konjunktionen*).
   * Đánh giá xem bài viết đã thỏa mãn 4 Leitpunkte của đề bài chưa và gợi ý câu viết hay hơn.
3. **AI Speaking Coach (Luyện nói & Phản xạ hội thoại):**
   * Nhận dạng giọng nói qua Microphone.
   * Chấm điểm phát âm (*Aussprache & Intonation*).
   * Đóng vai bạn thi (*Gesprächspartner*) để đối thoại trong phần thi nói Teil 3 (Gemeinsam planen).

---
*Tài liệu này đóng vai trò là kim chỉ nam kiến trúc và chuẩn dữ liệu chuẩn xác 100% để phát triển phần mềm, xây dựng website học tiếng Đức hoặc tổ chức giáo án giảng dạy.*
