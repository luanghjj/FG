/* ============================================================
   arena-data.js  —  Bộ ngân hàng đề thi tự luận chuẩn cho Arena (Full Pro Edition)
   Bao quát toàn bộ:
   - LF1: Gastgewerbe & Berufsbildung
   - LF2: Güter annehmen, lagern & HACCP
   - LF3: Gäste empfangen, beraten & Allergene
   - LF4: Einfache Speisen & Schnittarten
   - LF5: Getränke, Kaffee & Weinservice
   - LF6: Gerichte, Menüs, Getreide & Vegan
   - LF9: Zahlungen, Belege, BGB & USt
   - BfK-2: Fleisch, Garstufen, Fisch & Grundsaucen
   - GK: WiSo, Arbeitsrecht, JArbSchG, 5 Säulen
   - Bộ đề thi tốt nghiệp IHK thật: Sommer 2024, Winter 2024/25, Winter 2023/24, KA3, KA4, KA5
   ============================================================ */
(function(global){
  "use strict";

  const LF_BANK = {
    // ══════════════════════════════════════════════════════════
    // LF1: IN DER GASTRONOMIE ARBEITEN & BERUFSBILDUNG
    // ══════════════════════════════════════════════════════════
    "lf1": [
      {
        id: "lf1_01",
        no: "LF1.1",
        lf: "lf1",
        fach: "bfk1",
        points: 4,
        title: "Rechte und Pflichten des Auszubildenden nach BBiG",
        questionDe: "Nennen Sie je 2 Pflichten und 2 Rechte des Auszubildenden nach dem Berufsbildungsgesetz (BBiG).",
        questionVi: "Nêu 2 nghĩa vụ và 2 quyền của người học nghề (Azubi) theo Luật Đào tạo Nghề Đức (BBiG).",
        placeholderDe: "Pflichten: 1. ... | 2. ...\nRechte: 1. ... | 2. ...",
        keywords: [
          { term: "Lernpflicht", points: 1.0, vi: "Nghĩa vụ học tập / chú ý lắng nghe chỉ dẫn", alt: ["Sorgfaltspflicht", "Berichtsheft", "Gehorsamspflicht", "Schweigepflicht"] },
          { term: "Berichtsheft", points: 1.0, vi: "Nghĩa vụ ghi chép nhật ký học nghề thường xuyên", alt: ["Ausbildungsnachweis", "Schweigepflicht", "Sorgfalt"] },
          { term: "Vergütung", points: 1.0, vi: "Quyền nhận lương học nghề đúng hạn", alt: ["Ausbildungsvergütung", "Geld", "Gehalt"] },
          { term: "Freistellung", points: 1.0, vi: "Quyền được nghỉ làm để đi học trường nghề (Berufsschule)", alt: ["Berufsschule", "Ausbildungsmittel", "Zeugnis"] }
        ],
        musterloesungDe: `Pflichten des Azubis:
1. Lern- und Sorgfaltspflicht: Aufgaben sorgfältig ausführen und Fertigkeiten erlernen wollen.
2. Führen des Ausbildungsnachweises (Berichtsheft): Regelmäßig und wahrheitsgemäß dokumentieren.
(Weitere Pflichten: Schweigepflicht über Betriebsgeheimnisse, Berufsschulpflicht, Befolgen von Weisungen).
Rechte des Azubis:
1. Recht auf angemessene Ausbildungsvergütung (pünktliche Zahlung).
2. Recht auf Freistellung für die Berufsschule und Prüfungen unter Fortzahlung der Vergütung.
(Weitere Rechte: Kostenlose Ausbildungsmittel, qualifizierte Ausbildung durch Ausbilder, Arbeitszeugnis am Ende).`,
        musterloesungVi: `Nghĩa vụ của Azubi:
1. Học tập chăm chỉ & làm việc cẩn thận: Tuân thủ hướng dẫn nghề.
2. Viết nhật ký học nghề (Berichtsheft) đều đặn và trung thực.
Quyền của Azubi:
1. Nhận lương học nghề thỏa đáng và đúng hạn.
2. Được tạo điều kiện nghỉ làm để đi học trường nghề và tham gia thi cử hưởng nguyên lương.`,
        explanation: {
          whyCorrect: `Quy định tại các điều § 13 đến § 16 Luật Đào tạo Nghề Đức (BBiG).`,
          whyWrong: `❌ Bẫy: Nhầm quyền của người lao động bình thường (đòi tiền tăng ca quá giờ) với mục đích học tập của Azubi.`,
          keyTakeaway: `Pflicht: Học + Viết Berichtsheft · Recht: Nhận lương + Được đi học Berufsschule.`
        }
      },
      {
        id: "lf1_02",
        no: "LF1.2",
        lf: "lf1",
        fach: "bfk1",
        points: 4,
        title: "Persönliche Schutzausrüstung (PSA) & Unfallverhütung in der Küche",
        questionDe: "Nennen Sie 4 Bestandteile der persönlichen Schutzausrüstung (PSA) bzw. Sicherheitsmaßnahmen zur Unfallverhütung für Küchenmitarbeiter.",
        questionVi: "Nêu 4 thành phần của trang bị bảo hộ cá nhân (PSA) hoặc biện pháp an toàn chống tai nạn lao động cho nhân viên bếp.",
        placeholderDe: "1. ...\n2. ...\n3. ...\n4. ...",
        keywords: [
          { term: "rutschfeste Schuhe", points: 1.0, vi: "Giày bếp chuyên dụng đế chống trượt, mũi cứng bảo vệ chân", alt: ["Sicherheitsschuhe", "Schuhe", "rutschfest"] },
          { term: "Schnittschutzhandschuh", points: 1.0, vi: "Găng tay lưới kim loại chống cắt khi thái lọc thịt/xương", alt: ["Kettenhandschuh", "Handschuh"] },
          { term: "Kopfbedeckung", points: 1.0, vi: "Mũ bếp / lưới bao tóc tránh tóc rơi và bảo vệ đầu", alt: ["Haarnetz", "Kochmütze"] },
          { term: "Arbeitskleidung", points: 1.0, vi: "Áo quần bếp chịu nhiệt từ 100% cotton chống bắt lửa/bỏng", alt: ["Kochjacke", "Baumwolle", "Schürze"] }
        ],
        musterloesungDe: `1. Sicherheitsschuhe mit rutschfester Sohle und geschlossener Ferse/Schutzkappe (Schutz vor Rutschen und herabfallenden Messern/Töpfen).
2. Stech- bzw. Schnittschutzhandschuh aus Edelstahlgeflecht (beim Ausbeinen oder Schneiden an der Aufschnittmaschine).
3. Kochkleidung aus 100 % Baumwolle (schwer entflammbar, schützt vor Verbrennungen durch heiße Flüssigkeiten/Fett).
4. Kopfbedeckung (Kochmütze oder Haarnetz) zur Vermeidung von Fremdkörpern und Verfangen der Haare.`,
        musterloesungVi: `1. Giày an toàn đế chống trượt có mũi bọc bảo vệ.
2. Găng tay lưới thép chống đâm/cắt khi lọc xương hoặc dùng máy cắt.
3. Áo bếp vải cotton 100% dày chống bỏng dầu mỡ và khó bắt lửa.
4. Mũ bếp hoặc lưới bọc tóc đảm bảo vệ sinh và an toàn.`,
        explanation: {
          whyCorrect: `Quy định bắt buộc theo Quy chuẩn An toàn Lao động DGUV và Berufsgenossenschaft (BGN).`,
          whyWrong: `❌ Bẫy: Đi dép crocs hở gót hoặc gót trơn vào khu vực bếp dễ trượt ngã và bị dao rơi trúng.`,
          keyTakeaway: `Giày chống trượt · Găng tay lưới thép · Áo cotton chống bỏng · Mũ trùm tóc.`
        }
      }
    ],

    // ══════════════════════════════════════════════════════════
    // LF2: GÜTER ANNEHMEN, LAGERN & HACCP
    // ══════════════════════════════════════════════════════════
    "lf2": [
      {
        id: "lf2_01",
        no: "LF2.1",
        lf: "lf2",
        fach: "bfk1",
        points: 4,
        title: "Wareneingangskontrolle (4 Prüfschritte)",
        questionDe: "Nennen Sie 4 Schritte der Wareneingangskontrolle bei Anlieferung von frischen Lebensmitteln.",
        questionVi: "Nêu 4 bước kiểm tra khi nhận hàng thực phẩm tươi sống.",
        placeholderDe: "1. Schritt: ...\n2. Schritt: ...\n3. Schritt: ...\n4. Schritt: ...",
        keywords: [
          { term: "Lieferschein", points: 1.0, vi: "So sánh thực tế với phiếu giao hàng (tên hàng, số lượng)", alt: ["Bestellung", "Menge"] },
          { term: "Temperatur", points: 1.0, vi: "Đo nhiệt độ hàng (Kühlkette)", alt: ["Kühlkette", "Grad"] },
          { term: "Verpackung", points: 1.0, vi: "Kiểm tra bao bì nguyên vẹn, vệ sinh", alt: ["Beschädigung", "unbeschädigt"] },
          { term: "MHD", points: 1.0, vi: "Kiểm tra hạn sử dụng MHD / Frische", alt: ["Mindesthaltbarkeitsdatum", "Verbrauchsdatum", "sensorisch"] }
        ],
        musterloesungDe: `1. Abgleich mit Lieferschein und Bestellung (Art, Menge, Qualität).
2. Temperaturkontrolle und Einhaltung der Kühlkette (Messprotokoll).
3. Unversehrtheit der Verpackung und Sauberkeit des Lieferfahrzeugs.
4. Prüfung von Mindesthaltbarkeitsdatum (MHD) bzw. Verbrauchsdatum und sensorische Prüfung (Geruch, Aussehen).`,
        musterloesungVi: `1. Đối chiếu phiếu giao hàng và đơn đặt (loại hàng, số lượng).
2. Đo nhiệt độ và ghi sổ chuỗi lạnh (Kühlkette).
3. Kiểm tra bao bì lành lặn và vệ sinh xe chở hàng.
4. Kiểm tra hạn sử dụng (MHD) và cảm quan (mùi, màu sắc).`,
        explanation: {
          whyCorrect: `Tiêu chuẩn nhận hàng HACCP đảm bảo thực phẩm an toàn trước khi nhập kho.`,
          whyWrong: `❌ Bẫy: Ký nhận hàng ngay mà chưa đo nhiệt độ bằng nhiệt kế chọc.`,
          keyTakeaway: `Lieferschein (Giấy) → Temperatur (Nhiệt) → Verpackung (Vỏ) → MHD/Sensorik (Hạn/Cảm quan).`
        }
      },
      {
        id: "lf2_02",
        no: "LF2.2",
        lf: "lf2",
        fach: "bfk1",
        points: 3,
        title: "Lagerprinzip FIFO (First in, First out)",
        questionDe: "Erklären Sie das Lagerprinzip FIFO und begründen Sie dessen Bedeutung in der Gastronomie.",
        questionVi: "Giải thích nguyên tắc kho FIFO (First in, First out) và giải thích ý nghĩa của nó trong nhà hàng.",
        placeholderDe: "FIFO-Erklärung: ...\nBedeutung: ...",
        keywords: [
          { term: "zuerst", points: 1.5, vi: "Hàng nhập trước thì xuất dùng trước", alt: ["First in, First out", "alt"] },
          { term: "Verderb", points: 1.5, vi: "Tránh hư hỏng hàng, đảm bảo hạn sử dụng, giảm lãng phí thực phẩm", alt: ["MHD", "Lebensmittelverschwendung", "frisch"] }
        ],
        musterloesungDe: `FIFO bedeutet „First in, First out\": Waren, die zuerst eingelagert wurden (älteres MHD), müssen auch zuerst verbraucht werden (neue Ware wird hinten/unten eingeräumt, ältere nach vorne gestellt).
Bedeutung: Vermeidung von Lebensmittelverderb, Gewährleistung der Frische und Reduzierung von Warenschwund/Kosten.`,
        musterloesungVi: `FIFO: Hàng nhập vào trước phải mang ra dùng trước (xếp hàng mới vào trong, đẩy hàng cũ ra trước).
Ý nghĩa: Tránh hết hạn hỏng hàng, giữ đồ tươi mới và giảm thất thoát chi phí.`,
        explanation: {
          whyCorrect: `Nguyên tắc cốt lõi của kho hàng thực phẩm LF2.`,
          whyWrong: `❌ Bẫy: Nhầm với LIFO (Last in, First out - chỉ dùng cho vật liệu không có hạn sử dụng như cát đá).`,
          keyTakeaway: `FIFO = Cũ dùng trước, mới dùng sau (Hàng mới xếp sau, hàng cũ đẩy trước).`
        }
      },
      {
        id: "lf2_03",
        no: "LF2.3",
        lf: "lf2",
        fach: "bfk1",
        points: 3,
        title: "Kühltemperaturen nach HACCP (Hackfleisch, Geflügel, Fisch)",
        questionDe: "Nennen Sie die maximal zulässigen Lagertemperaturen für: 1. Frisches Hackfleisch, 2. Frisches Geflügelfleisch, 3. Frischen Fisch.",
        questionVi: "Nêu nhiệt độ bảo quản tối đa cho phép theo chuẩn HACCP cho: 1. Thịt băm tươi, 2. Thịt gia cầm tươi, 3. Cá tươi sống.",
        placeholderDe: "1. Hackfleisch: ...\n2. Geflügel: ...\n3. Fisch: ...",
        keywords: [
          { term: "2", points: 1.0, vi: "Hackfleisch: tối đa +2 °C", alt: ["2 °C", "+2°C", "2 Grad"] },
          { term: "4", points: 1.0, vi: "Geflügel: tối đa +4 °C", alt: ["4 °C", "+4°C", "4 Grad"] },
          { term: "2", points: 1.0, vi: "Fisch: 0 °C bis +2 °C (Schmelzeis)", alt: ["0 bis 2", "+2 °C", "Schmelzeis"] }
        ],
        musterloesungDe: `1. Frisches Hackfleisch: maximal +2 °C (Hackfleischverordnung).
2. Frisches Geflügelfleisch: maximal +4 °C.
3. Frischer Fisch: 0 °C bis maximal +2 °C (optimal im Schmelzeis).`,
        musterloesungVi: `1. Thịt băm tươi: Tối đa +2 °C.
2. Thịt gia cầm tươi: Tối đa +4 °C.
3. Cá tươi: 0 °C đến tối đa +2 °C (tốt nhất ướp đá tan Schmelzeis).`,
        explanation: {
          whyCorrect: `Thịt băm có diện tích tiếp xúc lớn vi khuẩn nhân bản cực nhanh; gia cầm tiềm ẩn Salmonella; cá tươi phân hủy rất nhanh.`,
          whyWrong: `❌ Bẫy: Trả lời chung chung +7 °C cho tất cả (thịt băm và gia cầm sẽ bị phạt nặng nếu ở +7 °C).`,
          keyTakeaway: `Hack = +2°C · Geflügel = +4°C · Fisch = 0 đến +2°C (Eis).`
        }
      },
      {
        id: "lf2_04",
        no: "LF2.4",
        lf: "lf2",
        fach: "bfk1",
        points: 3,
        title: "Kreuzkontamination (Vermeidung in 3 Maßnahmen)",
        questionDe: "Was versteht man unter Kreuzkontamination und mit welchen 3 konkreten Maßnahmen verhindern Sie diese in der Küche?",
        questionVi: "Thế nào là lây nhiễm chéo (Kreuzkontamination) và dùng 3 biện pháp cụ thể nào để ngăn ngừa trong bếp?",
        placeholderDe: "Definition: ...\n3 Maßnahmen: ...",
        keywords: [
          { term: "Übertragung", points: 1.0, vi: "Sự truyền vi khuẩn từ thực phẩm sống sang thực phẩm chín/sẵn sàng ăn", alt: ["Keime", "Bakterien", "Roh"] },
          { term: "Farbcodierung", points: 1.0, vi: "Dùng thớt màu phân loại (Đỏ = Thịt, Vàng = Gia cầm, Xanh = Rau)", alt: ["Schneidebretter", "Farben"] },
          { term: "Hände", points: 1.0, vi: "Rửa tay sát khuẩn và khử trùng dụng cụ sau mỗi công đoạn", alt: ["Händewaschen", "Reinigung", "Messer"] }
        ],
        musterloesungDe: `Definition: Die ungewollte Übertragung von Keimen, Krankheitserregern oder Allergenen von einem rohen Lebensmittel auf ein verzehrfertiges Lebensmittel.
3 Maßnahmen:
1. Farbcodierte Schneidebretter und Messer verwenden (z. B. Rot für rohes Fleisch, Gelb für Geflügel, Grün cho rau củ).
2. Striktes Händewaschen und Desinfizieren nach der Bearbeitung von roher Ware.
3. Zeitliche oder räumliche Trennung von Vorbereitung (unrein) und Anrichten (rein).`,
        musterloesungVi: `Định nghĩa: Sự lây truyền vi khuẩn gây bệnh từ thực phẩm sống sang món đã nấu chín/ăn liền.
3 biện pháp:
1. Dùng thớt và dao phân màu riêng biệt (Đỏ: thịt sống, Vàng: gà vịt, Xanh: rau củ).
2. Rửa sạch và sát khuẩn tay ngay sau khi sơ chế đồ sống.
3. Tách biệt khu vực bẩn (sơ chế) và khu vực sạch (ra món).`,
        explanation: {
          whyCorrect: `Tiêu chuẩn cốt lõi của Vệ sinh thực phẩm (Lebensmittelhygiene-Verordnung LMHV).`,
          whyWrong: `❌ Bẫy: Dùng chung một con dao chặt gà sống rồi thái ngay bánh mì hoặc cà chua salad.`,
          keyTakeaway: `Tách sống - chín · Phân màu thớt · Rửa tay sát khuẩn liên tục.`
        }
      },
      {
        id: "lf2_05",
        no: "LF2.5",
        lf: "lf2",
        fach: "bfk1",
        points: 4,
        title: "HACCP-Konzept & Kritische Kontrollpunkte (CCP)",
        questionDe: "Erklären Sie das HACCP-System (Bedeutung der Abkürzung) und nennen Sie 2 typische Critical Control Points (CCPs) im Restaurant.",
        questionVi: "Giải thích hệ thống HACCP (ý nghĩa viết tắt) và nêu 2 điểm kiểm soát tới hạn (CCPs) điển hình trong nhà hàng.",
        placeholderDe: "HACCP: ...\nCCP 1: ... | CCP 2: ...",
        keywords: [
          { term: "Hazard Analysis", points: 1.5, vi: "Hazard Analysis and Critical Control Points (Phân tích mối nguy & điểm kiểm soát tới hạn)", alt: ["Critical Control Point", "Gefahrenanalyse"] },
          { term: "Kerntemperatur", points: 1.25, vi: "Nhiệt độ nấu chín tâm thực phẩm (> 72 °C tối thiểu 2 phút để diệt khuẩn)", alt: ["Erhitzen", "Garen", "72"] },
          { term: "Warmhalten", points: 1.25, vi: "Nhiệt độ giữ nóng đồ ăn buffet (> 65 °C liên tục)", alt: ["Kühlkette", "65", "Abkühlung"] }
        ],
        musterloesungDe: `HACCP = Hazard Analysis and Critical Control Points (Gefahrenanalyse und kritische Kontrollpunkte). Ein präventives System zur Gewährleistung der Lebensmittelsicherheit.
2 typische CCPs:
1. Erhitzen/Durchgaren von Fleisch/Geflügel: Kerntemperatur muss mindestens +72 °C für mindestens 2 Minuten betragen (Abtötung von Salmonellen).
2. Warmhalten am Buffet: Speisen müssen dauerhaft bei mindestens +65 °C gehalten werden, um Keimvermehrung zu verhindern.`,
        musterloesungVi: `HACCP: Hệ thống phân tích mối nguy và điểm kiểm soát tới hạn để đảm bảo an toàn vệ sinh thực phẩm.
2 điểm CCP:
1. Nhiệt độ nấu chín thực phẩm: Tâm thịt phải đạt trên +72 °C trong 2 phút để diệt khuẩn.
2. Giữ nóng tại quầy buffet: Luôn giữ trên +65 °C để vi khuẩn không thể nhân bản.`,
        explanation: {
          whyCorrect: `Theo Luật Vệ sinh Thực phẩm châu Âu (VO EG 852/2004). Mọi nhà hàng bắt buộc phải có sổ kiểm soát HACCP.`,
          whyWrong: `❌ Bẫy: Nhầm CCP với việc quét dọn nhà vệ sinh (đây là vệ sinh thông thường, không phải điểm tới hạn đe dọa trực tiếp tính mạng).`,
          keyTakeaway: `HACCP = Phòng ngừa · Nấu chín > 72°C · Giữ nóng > 65°C.`
        }
      }
    ],

    // ══════════════════════════════════════════════════════════
    // LF3: GÄSTE EMPFANGEN, BERATEN & ALLERGENE
    // ══════════════════════════════════════════════════════════
    "lf3": [
      {
        id: "lf3_01",
        no: "LF3.1",
        lf: "lf3",
        fach: "bfk1",
        points: 4,
        title: "Tisch decken – Grundgedeck nach IHK-Standard",
        questionDe: "Beschreiben Sie das klassische Grundgedeck für ein 3-Gänge-Menü (Besteck, Gläser, Brot) und die Abstandsregeln zur Tischkante.",
        questionVi: "Mô tả bộ đồ ăn cơ bản (Grundgedeck) cho thực đơn 3 món (dao thìa dĩa, ly, đĩa bánh mì) và quy tắc khoảng cách tới mép bàn.",
        placeholderDe: "Besteckanordnung: ...\nGläser: ...\nAbstand: ...",
        keywords: [
          { term: "außen nach innen", points: 1.0, vi: "Nguyên tắc ăn từ ngoài vào trong", alt: ["Reihenfolge", "außen"] },
          { term: "rechts", points: 1.0, vi: "Dao và thìa bên phải, nĩa bên trái", alt: ["Gabel", "Messer"] },
          { term: "Wasserglas", points: 1.0, vi: "Ly rượu vang và ly nước ở góc trên bên phải trên mũi dao", alt: ["Weinglas", "Richtglas"] },
          { term: "1-2 cm", points: 1.0, vi: "Cách mép bàn 1 đến 2 cm (chiều rộng ngón tay cái)", alt: ["Daumenbreite", "Tischkante"] }
        ],
        musterloesungDe: `Besteck: Gabeln links, Messer und Löffel rechts vom Platzteller. Anordnung von außen nach innen entsprechend der Menüfolge (Vorspeisenbesteck außen, Hauptgangbesteck innen).
Gläser: Richtglas (Rotwein-/Hauptgangglas) ca. 1 cm über der Spitze des Hauptgangmessers; Wasserglas rechts darunter oder im 45°-Winkel.
Brotteller: Links neben den Gabeln mit Brotmesser.
Abstand: Besteckunterkante ca. 1 bis 2 cm (eine Daumenbreite) von der Tischkante entfernt.`,
        musterloesungVi: `Dao nĩa: Nĩa bên trái, dao và thìa bên phải. Xếp từ ngoài vào trong theo thứ tự ăn.
Ly: Ly rượu chính đặt ngay trên mũi dao chính 1 cm; ly nước đặt chếch bên cạnh.
Đĩa bánh mì: Đặt bên trái cạnh nĩa kèm dao bơ.
Khoảng cách: Đáy dao nĩa cách mép bàn 1–2 cm (một bề ngang ngón cái).`,
        explanation: {
          whyCorrect: `Tiêu chuẩn bàn tiệc châu Âu được IHK chấm gắt gao trong bài thi thực hành và lý thuyết.`,
          whyWrong: `❌ Bẫy: Xếp dao quay lưỡi ra ngoài (lưỡi dao phải quay vào trong lòng đĩa).`,
          keyTakeaway: `Từ ngoài vào trong · Lưỡi dao quay vào · Cách mép bàn 1 đốt ngón tay (1–2 cm).`
        }
      },
      {
        id: "lf3_02",
        no: "LF3.2",
        lf: "lf3",
        fach: "bfk1",
        points: 4,
        title: "Beschwerdemanagement – Die L-E-A-R-N Methode",
        questionDe: "Erläutern Sie das Vorgehen bei einer Gastbeschwerde anhand der 5 Buchstaben der L-E-A-R-N Methode.",
        questionVi: "Giải thích quy trình xử lý khiếu nại của khách theo 5 chữ cái của phương pháp L-E-A-R-N.",
        placeholderDe: "L: ...\nE: ...\nA: ...\nR: ...\nN: ...",
        keywords: [
          { term: "Listen", points: 0.8, vi: "L - Listen: Lắng nghe chăm chú, không ngắt lời", alt: ["Zuhören", "ausreden"] },
          { term: "Empathize", points: 0.8, vi: "E - Empathize: Thấu cảm, đặt mình vào vị trí khách", alt: ["Verständnis", "Einfühlen"] },
          { term: "Apologize", points: 0.8, vi: "A - Apologize: Chân thành xin lỗi về sự bất tiện", alt: ["Entschuldigen"] },
          { term: "Resolve", points: 0.8, vi: "R - Resolve: Đưa ra giải pháp khắc phục nhanh chóng", alt: ["Lösen", "Lösung"] },
          { term: "Notify", points: 0.8, vi: "N - Notify: Báo cáo cấp trên và theo dõi chăm sóc khách", alt: ["Nachfragen", "Informieren"] }
        ],
        musterloesungDe: `L - Listen (Aktiv zuhören): Den Gast ausreden lassen, Blickkontakt halten, Notizen machen.
E - Empathize (Verständnis zeigen): Sich in die Lage des Gastes versetzen („Ich verstehe Ihren Ärger vollkommen\").
A - Apologize (Entschuldigen): Höflich und aufrichtig für die Unannehmlichkeit entschuldigen, ohne Schuldzuweisungen an Kollegen.
R - Resolve (Lösung anbieten): Sofortige Wiedergutmachung (z. B. neues Gericht zubereiten, Kaffee anbieten).
N - Notify / Follow-up (Informieren & Nachhaken): Küchenchef/Vorgesetzten informieren und sich später erkundigen, ob alles passt.`,
        musterloesungVi: `L - Listen: Lắng nghe không ngắt lời.
E - Empathize: Đồng cảm với cảm xúc khách.
A - Apologize: Xin lỗi chân thành.
R - Resolve: Khắc phục giải quyết ngay (đổi món, mời cà phê).
N - Notify: Báo cáo quản lý và hỏi thăm lại xem khách đã hài lòng chưa.`,
        explanation: {
          whyCorrect: `Phương pháp dịch vụ quốc tế L-E-A-R-N biến khách hàng giận dữ thành khách hàng trung thành.`,
          whyWrong: `❌ Bẫy: Tranh cãi tay đôi hoặc đổ lỗi cho đầu bếp trước mặt khách.`,
          keyTakeaway: `Lắng nghe → Đồng cảm → Xin lỗi → Giải quyết → Theo dõi lại.`
        }
      },
      {
        id: "lf3_03",
        no: "LF3.3",
        lf: "lf3",
        fach: "bfk1",
        points: 4,
        title: "14 Hauptallergene nach LMIV (Nennen Sie 4 mit Beispiel)",
        questionDe: "Nennen Sie 4 der 14 kennzeichnungspflichtigen Hauptallergene nach LMIV und nennen Sie je ein Gericht / eine Zutat als Praxisbeispiel.",
        questionVi: "Nêu 4 trong số 14 chất gây dị ứng bắt buộc phải dán nhãn theo LMIV kèm 1 món ăn/nguyên liệu thực tế làm ví dụ.",
        placeholderDe: "1. Allergen: ... (Beispiel: ...)\n2. Allergen: ... (Beispiel: ...)\n3. Allergen: ... (Beispiel: ...)\n4. Allergen: ... (Beispiel: ...)",
        keywords: [
          { term: "Gluten", points: 1.0, vi: "Glutenhaltiges Getreide (Weizen, Brot, Pasta)", alt: ["Weizen", "Brot"] },
          { term: "Krebstiere", points: 1.0, vi: "Krebstiere (Garnelen, Krabben)", alt: ["Garnelen", "Hummer"] },
          { term: "Eier", points: 1.0, vi: "Eier (Mayonnaise, Sauce Hollandaise)", alt: ["Ei", "Sauce Hollandaise"] },
          { term: "Milch", points: 1.0, vi: "Milch/Laktose (Käse, Sahne, Butter)", alt: ["Laktose", "Käse", "Sahne"] }
        ],
        musterloesungDe: `1. Glutenhaltiges Getreide (z. B. Weizenmehl in Pasta, Soßenbindung, Brot).
2. Krebstiere (z. B. Garnelen im Krabbencocktail).
3. Eier (z. B. Mayonnaise, Sauce Hollandaise, Frischeinudeln).
4. Milch und Milcherzeugnisse einschl. Laktose (z. B. Butter, Sahnesoßen, Käse).
(Weitere gültige: Fisch, Erdnüsse, Soja, Schalenfrüchte/Nüsse, Sellerie, Senf, Sesamsamen, Schwefeldioxid/Sulfite, Lupinen, Weichtiere).`,
        musterloesungVi: `1. Ngũ cốc chứa Gluten: Bột mì trong mì Ý, bánh mì, sốt sệt.
2. Động vật giáp xác: Tôm, cua trong salad.
3. Trứng: Sốt mayonnaise, sốt Hollandaise.
4. Sữa và chế phẩm sữa: Bơ, kem tươi, phô mai.`,
        explanation: {
          whyCorrect: `Nghĩa vụ công bố thông tin theo Quy định Thông tin Thực phẩm châu Âu (LMIV).`,
          whyWrong: `❌ Bẫy: Nhầm lẫn dị ứng (Allergie) với sở thích cá nhân; quên mất hạt cần tây (Sellerie) hay mù tạt (Senf) cũng là Allergen chính thức.`,
          keyTakeaway: `14 Allergen: Gluten, Krebs, Eier, Fisch, Erdnüsse, Soja, Milch, Nüsse, Sellerie, Senf, Sesam, Sulfite, Lupinen, Weichtiere.`
        }
      },
      {
        id: "lf3_04",
        no: "LF3.4",
        lf: "lf3",
        fach: "bfk1",
        points: 4,
        title: "Tischreservierung am Telefon (6 Kerninformationen)",
        questionDe: "Welche 6 Angaben müssen Sie bei der telefonischen Tischreservierung verbindlich vom Gast erfragen und notieren?",
        questionVi: "Những 6 thông tin nào bạn bắt buộc phải hỏi và ghi lại khi nhận đặt bàn qua điện thoại?",
        placeholderDe: "1. ...\n2. ...\n3. ...\n4. ...\n5. ...\n6. ...",
        keywords: [
          { term: "Name", points: 0.7, vi: "Họ tên người đặt bàn", alt: ["Gastname"] },
          { term: "Datum", points: 0.7, vi: "Ngày và giờ đến", alt: ["Uhrzeit", "Wann"] },
          { term: "Personenanzahl", points: 0.7, vi: "Số lượng khách (người lớn/trẻ em)", alt: ["Anzahl", "wie viele Gäste"] },
          { term: "Telefonnummer", points: 0.7, vi: "Số điện thoại liên lạc / Email", alt: ["Kontakt", "Rückruf"] },
          { term: "Sonderwünsche", points: 0.6, vi: "Yêu cầu đặc biệt (dịp kỷ niệm, ghế trẻ em, dị ứng ăn chay)", alt: ["Anlass", "Allergien", "Kinderstuhl"] },
          { term: "Tischwunsch", points: 0.6, vi: "Khu vực ngồi (ngoài trời, góc yên tĩnh, cạnh cửa sổ)", alt: ["Platzierung", "Fenster"] }
        ],
        musterloesungDe: `1. Vollständiger Name des Gastes.
2. Datum und genaue Uhrzeit der Reservierung.
3. Anzahl der Personen (Erwachsene und Kinder).
4. Telefonnummer (oder E-Mail) für eventuelle Rückfragen/Bestätigungen.
5. Besondere Wünsche oder Anlass (z. B. Geburtstag, Hochzeitstag, Kinderstuhl, Allergien).
6. Platzierungswunsch (z. B. Fensterplatz, ruhige Ecke, Terrasse).`,
        musterloesungVi: `1. Họ tên đầy đủ của khách.
2. Ngày và giờ đến chính xác.
3. Số lượng người (người lớn và trẻ em).
4. Số điện thoại liên hệ lại.
5. Dịp đặc biệt hoặc yêu cầu ăn uống (sinh nhật, ghế trẻ em, ăn chay, dị ứng).
6. Nguyện vọng vị trí ngồi (cạnh cửa sổ, góc yên tĩnh, ngoài sân).`,
        explanation: {
          whyCorrect: `Tiêu chuẩn nhận đặt bàn chuyên nghiệp tránh trùng bàn hoặc chuẩn bị thiếu chỗ.`,
          whyWrong: `❌ Bẫy: Quên xin số điện thoại để gọi lại xác nhận khi khách đến muộn.`,
          keyTakeaway: `Tên · Ngày giờ · Số khách · Số ĐT · Dịp đặc biệt · Vị trí bàn.`
        }
      }
    ],

    // ══════════════════════════════════════════════════════════
    // LF4: EINFACHE SPEISEN ZUBEREITEN & SCHNITTARTEN
    // ══════════════════════════════════════════════════════════
    "lf4": [
      {
        id: "lf4_01",
        no: "LF4.1",
        lf: "lf4",
        fach: "bfk1",
        points: 4,
        title: "Klassische Gemüseschnittarten (Julienne, Brunoise, Bâtonnets, Paysanne)",
        questionDe: "Erklären Sie die 4 klassischen Schnittformen für Gemüse mit ihrer jeweiligen Form und Größe: 1. Julienne, 2. Brunoise, 3. Bâtonnets, 4. Paysanne.",
        questionVi: "Giải thích 4 kiểu cắt thái rau củ kinh điển về hình dạng và kích thước: 1. Julienne, 2. Brunoise, 3. Bâtonnets, 4. Paysanne.",
        placeholderDe: "1. Julienne: ...\n2. Brunoise: ...\n3. Bâtonnets: ...\n4. Paysanne: ...",
        keywords: [
          { term: "Julienne", points: 1.0, vi: "Julienne: sợi mảnh như que diêm (ca. 1–2 mm dày, 3–5 cm dài)", alt: ["Streifen", "feine Streifen"] },
          { term: "Brunoise", points: 1.0, vi: "Brunoise: hạt lựu siêu nhỏ (ca. 1–2 mm lập phương)", alt: ["feine Würfel", "Würfel"] },
          { term: "Batonnets", points: 1.0, vi: "Bâtonnets: thỏi dài/que dày (ca. 5 mm cạnh, 3–5 cm dài)", alt: ["Stäbchen", "Balken"] },
          { term: "Paysanne", points: 1.0, vi: "Paysanne: lát mỏng hình vuông/tam giác kiểu nông thôn (ca. 1 cm, dày 1–2 mm)", alt: ["Blättchen", "bäuerlich"] }
        ],
        musterloesungDe: `1. Julienne: Feine Streifen (ca. 1–2 mm breit/dick, ca. 3–5 cm lang), z. B. als Suppeneinlage.
2. Brunoise: Sehr feine Würfel (ca. 1–2 mm Kantenlänge), Ausgangsform ist meist Julienne.
3. Bâtonnets: Größere Stäbchen (ca. 5 mm Kantenlänge, ca. 3–5 cm lang), z. B. Gemüsesticks oder Vorstufe für Paysanne/Macedoine.
4. Paysanne: Flache, quadratische oder dreieckige Blättchen (ca. 1 cm Kantenlänge, ca. 1–2 mm dünn, „bäuerliche Art\").`,
        musterloesungVi: `1. Julienne: Cắt sợi mảnh như que diêm (1–2 mm, dài 3–5 cm), dùng làm nhân súp.
2. Brunoise: Cắt hạt lựu siêu nhỏ (1–2 mm cạnh), cắt từ sợi Julienne.
3. Bâtonnets: Cắt dạng con chì / thanh dài (cạnh 5 mm, dài 3–5 cm).
4. Paysanne: Cắt lát mỏng vuông hoặc tam giác kiểu đồng quê (cạnh 1 cm, mỏng 1–2 mm).`,
        explanation: {
          whyCorrect: `Tiêu chuẩn dao bếp Pháp/Đức bắt buộc trong phần thi nghề nấu ăn và chế biến LF4.`,
          whyWrong: `❌ Bẫy: Nhầm lẫn Brunoise (hạt lựu 1-2mm) với Macedoine (hạt lựu to 5mm).`,
          keyTakeaway: `Julienne = Sợi mảnh · Brunoise = Hạt lựu nhỏ · Bâtonnets = Con chì · Paysanne = Lát mỏng.`
        }
      },
      {
        id: "lf4_02",
        no: "LF4.2",
        lf: "lf4",
        fach: "bfk1",
        points: 4,
        title: "Zubereitung von Rührei (5 Arbeitsschritte) & Salmonellenschutz",
        questionDe: "Beschreiben Sie 5 Arbeitsschritte zur Zubereitung eines frischen Rühreis und nennen Sie 1 Hygienemaßnahme zum Schutz vor Salmonellen.",
        questionVi: "Mô tả 5 bước chế biến món trứng bác (Rührei) từ trứng tươi và nêu 1 biện pháp vệ sinh phòng ngừa vi khuẩn Salmonella.",
        placeholderDe: "5 Schritte: ...\nHygienemaßnahme: ...",
        keywords: [
          { term: "aufschlagen", points: 0.8, vi: "Đập trứng ra bát sạch, đánh tan", alt: ["verquirlen"] },
          { term: "würzen", points: 0.8, vi: "Nêm gia vị muối, tiêu, chút sữa/kem", alt: ["Salz", "Pfeffer"] },
          { term: "Butter", points: 0.8, vi: "Đun chảy bơ trong chảo", alt: ["zerlassen", "Pfanne"] },
          { term: "stocken", points: 0.8, vi: "Đảo nhẹ trên lửa vừa cho trứng đông sánh mềm (cremig)", alt: ["rühren", "mittlere Hitze"] },
          { term: "durchgaren", points: 0.8, vi: "Gia nhiệt chín hoàn toàn hoặc dùng trứng tiệt trùng Past-Ei cho nhóm nguy cơ cao", alt: ["Pasteurisiert", "Salmonellen", "Kühlkette"] }
        ],
        musterloesungDe: `5 Arbeitsschritte:
1. Frische Eier einzeln aufschlagen und mit einer Gabel/Schneebesen kurz verquirlen.
2. Mit Salz, weißem Pfeffer und evtl. einem Schluck Sahne oder Milch abschmecken.
3. Butter in einer Pfanne bei mittlerer Hitze schmelzen lassen (nicht bräunen).
4. Die Eimasse hineingeben und unter sanftem Schieben/Rühren cremig stocken lassen.
5. Sofort auf vorgewärmtem Teller anrichten und servieren (nicht austrocknen lassen).
Salmonellenschutz: Eier immer gekühlt lagern, Eierschalen nicht mit der Masse in Kontakt bringen, Eimasse über 70 °C erhitzen bzw. für Schwangere/Senioren pasteurisiertes Flüssigei nutzen.`,
        musterloesungVi: `5 bước:
1. Đập trứng ra bát, dùng dĩa hoặc phới lồng đánh tan.
2. Nêm muối, tiêu trắng và chút kem tươi/sữa.
3. Đun chảy bơ trong chảo ở lửa vừa (không để cháy bơ).
4. Đổ trứng vào, dùng phới đảo nhẹ tay cho trứng đông mềm mịn béo ngậy.
5. Múc ngay ra đĩa ấm và phục vụ.
Phòng Salmonella: Luôn bảo quản trứng trong tủ lạnh, đun chín nhiệt độ trên 70°C, người già dùng trứng tiệt trùng.`,
        explanation: {
          whyCorrect: `Câu hỏi xuất hiện trong kỳ thi IHK Abschlussprüfung Winter 2024/25.`,
          whyWrong: `❌ Bẫy: Đập trứng trực tiếp vào chảo nóng làm lòng trắng chín trước, lòng đỏ chín sau khiến món trứng khô khốc.`,
          keyTakeaway: `Đánh tan → Nêm gia vị → Bơ chảy → Lửa vừa đảo mịn → Giữ vệ sinh vỏ trứng.`
        }
      }
    ],

    // ══════════════════════════════════════════════════════════
    // LF5: GETRÄNKE AUSSCHENKEN, KAFFEE & WEINSERVICE
    // ══════════════════════════════════════════════════════════
    "lf5": [
      {
        id: "lf5_01",
        no: "LF5.1",
        lf: "lf5",
        fach: "bfk1",
        points: 4,
        title: "Kaffeespezialitäten (Espresso, Cappuccino, Latte Macchiato)",
        questionDe: "Erklären Sie den Aufbau und die Zusammensetzung folgender Kaffeespezialitäten: 1. Espresso, 2. Cappuccino, 3. Latte Macchiato.",
        questionVi: "Giải thích cấu tạo và thành phần của các thức uống cà phê: 1. Espresso, 2. Cappuccino, 3. Latte Macchiato.",
        placeholderDe: "1. Espresso: ...\n2. Cappuccino: ...\n3. Latte Macchiato: ...",
        keywords: [
          { term: "Crema", points: 1.0, vi: "Espresso: 25–30 ml nước ép áp suất cao (ca. 9 bar) với lớp bọt Crema màu hạt dẻ", alt: ["25 ml", "Druck", "Siebträger"] },
          { term: "Dritteln", points: 1.5, vi: "Cappuccino: 1/3 Espresso, 1/3 nóng sữa, 1/3 bọt sữa mịn (Mikroschaum)", alt: ["Espresso", "Milch", "Milchschaum"] },
          { term: "Schichten", points: 1.5, vi: "Latte Macchiato: 3 tầng rõ rệt (dưới: sữa nóng, giữa: espresso, trên: bọt sữa dày)", alt: ["Glas", "drei Schichten"] }
        ],
        musterloesungDe: `1. Espresso: Ca. 25–30 ml konzentrierter Kaffee, der mit 9 bar Brühdruck in ca. 25 Sekunden extrahiert wird. Merkmal: Dichte haselnussbraune Crema.
2. Cappuccino: Besteht zu gleichen Teilen aus 1/3 Espresso, 1/3 heißer Milch und 1/3 feinporigem Milchschaum (Mikroschaum), serviert in einer vorgewärmten Tasse (ca. 150–180 ml).
3. Latte Macchiato („gefleckte Milch\"): Serviert im hohen Glas in 3 sichtbaren Schichten: Unten heiße Milch, in der Mitte der Espresso, oben fester Milchschaum.`,
        musterloesungVi: `1. Espresso: Khoảng 25–30 ml cà phê chiết xuất dưới áp suất 9 bar trong 25 giây. Đặc trưng là lớp bọt Crema màu nâu hạt dẻ.
2. Cappuccino: Tỷ lệ 1/3 espresso, 1/3 sữa nóng và 1/3 bọt sữa mịn (microfoam), phục vụ trong tách sứ dày giữ nhiệt.
3. Latte Macchiato: Phục vụ trong ly thủy tinh cao gồm 3 tầng tách biệt: Dưới là sữa nóng, giữa là espresso, trên là bọt sữa bồng bềnh.`,
        explanation: {
          whyCorrect: `Tiêu chuẩn pha chế Barista trong nhà hàng và thi nghề khách sạn nhà hàng LF5.`,
          whyWrong: `❌ Bẫy: Nhầm Latte Macchiato với Milchkaffee (Milchkaffee là cà phê phin thường pha 50/50 sữa trong bát to).`,
          keyTakeaway: `Espresso = 25ml + Crema · Cappuccino = 3 phần bằng nhau · Latte Macchiato = Ly cao 3 tầng.`
        }
      },
      {
        id: "lf5_02",
        no: "LF5.2",
        lf: "lf5",
        fach: "bfk1",
        points: 4,
        title: "Trinktemperaturen von Wein & Schaumwein",
        questionDe: "Nennen Sie die empfohlenen Serviertemperaturen für: 1. Sekt / Champagner, 2. Leichten trockenen Weißwein, 3. Kräftigen Rotwein.",
        questionVi: "Nêu nhiệt độ phục vụ khuyến nghị cho: 1. Sâm panh / Sekt, 2. Vang trắng thanh nhẹ, 3. Vang đỏ đậm đà.",
        placeholderDe: "1. Sekt: ... °C\n2. Weißwein: ... °C\n3. Rotwein: ... °C",
        keywords: [
          { term: "6-8", points: 1.5, vi: "Sekt / Sâm panh: 6–8 °C", alt: ["6 bis 8", "7 °C", "Eiskübel"] },
          { term: "8-10", points: 1.25, vi: "Vang trắng nhẹ: 8–10 °C (hoặc 10–12 °C cho vang trắng ủ sồi)", alt: ["8 bis 10", "9 °C", "10 °C"] },
          { term: "16-18", points: 1.25, vi: "Vang đỏ đậm: 16–18 °C (nhiệt độ phòng thời xưa)", alt: ["16 bis 18", "16-18 °C", "Zimmertemperatur"] }
        ],
        musterloesungDe: `1. Sekt / Champagner / Schaumwein: 6–8 °C (gut gekühlt, hält die Kohlensäure feinperlig).
2. Leichter, trockener Weißwein (z. B. Riesling, Sauvignon Blanc): 8–10 °C.
3. Kräftiger, tanninreicher Rotwein (z. B. Spätburgunder im Barrique, Cabernet Sauvignon): 16–18 °C.`,
        musterloesungVi: `1. Rượu vang sủi / Sekt / Champagner: 6–8 °C (lạnh sâu giúp giữ bọt tăm mịn lâu tan).
2. Vang trắng khô nhẹ (Riesling): 8–10 °C.
3. Vang đỏ đậm nhiều tannin: 16–18 °C.`,
        explanation: {
          whyCorrect: `Quy tắc Sommelier: Phục vụ vang quá ấm làm bốc mùi cồn cay nồng; vang quá lạnh làm tê lưỡi mất vị thơm.`,
          whyWrong: `❌ Bẫy: Để vang đỏ ở nhiệt độ phòng mùa hè 25 °C (vang sẽ bị nồng cồn gắt cổ).`,
          keyTakeaway: `Sekt = 6–8°C · Vang trắng = 8–10°C · Vang đỏ = 16–18°C.`
        }
      }
    ],

    // ══════════════════════════════════════════════════════════
    // LF6: GERICHTE, MENÜS & PRODUKTE ANBIETEN
    // ══════════════════════════════════════════════════════════
    "lf6": [
      {
        id: "lf6_01",
        no: "LF6.1",
        lf: "lf6",
        fach: "bfk1",
        points: 3,
        title: "Auswertungsmethode der Gästebewertungen",
        questionDe: "Werten Sie die Gästebewertungen systematisch aus. Nennen Sie die Auswertungsmethode in 4 Schritten.",
        questionVi: "Phân tích các nhận xét của khách có hệ thống. Nêu phương pháp phân tích gồm 4 bước.",
        placeholderDe: "1. Schritt: ...\n2. Schritt: ...\n3. Schritt: ...\n4. Schritt: ...",
        keywords: [
          { term: "Sammeln", points: 0.75, vi: "Thu thập ý kiến/khiếu nại" },
          { term: "Kategorisieren", points: 0.75, vi: "Phân loại theo nhóm chủ đề", alt: ["Themen", "Gruppieren"] },
          { term: "Häufigkeit", points: 0.75, vi: "Đánh giá tần suất & mức độ", alt: ["Schwere", "Gewichten"] },
          { term: "Maßnahmen", points: 0.75, vi: "Đề ra biện pháp & kiểm tra", alt: ["Kontrolle"] }
        ],
        musterloesungDe: `1. Sammeln der Bewertungen/Kritikpunkte.
2. Kategorisieren nach Themen (Personal, Sauberkeit, Speisen …).
3. Häufigkeit & Schwere bewerten.
4. Maßnahmen festlegen und Kontrolle durchführen.`,
        musterloesungVi: `1. Thu thập các nhận xét/khiếu nại của khách.
2. Phân loại theo nhóm chủ đề (nhân sự, vệ sinh, món ăn...).
3. Đánh giá tần suất xuất hiện và mức độ nghiêm trọng.
4. Đưa ra giải pháp khắc phục và tiến hành kiểm tra (Kontrolle).`,
        explanation: {
          whyCorrect: `Quy trình 4 bước quản trị chất lượng (Qualitätsmanagement): Thu thập dữ liệu → phân loại theo bộ phận → đo mức độ khẩn cấp → đề ra giải pháp và kiểm tra (Kontrolle) khép kín.`,
          whyWrong: `❌ Bẫy: Trả lời cách xử lý tình huống cá nhân (đến xin lỗi khách) thay vì quy trình phân tích hệ thống; quên bước kiểm tra Kontrolle.`,
          keyTakeaway: `Sammeln → Kategorisieren → Häufigkeit/Schwere → Maßnahmen → Kontrolle.`
        }
      },
      {
        id: "lf6_02",
        no: "LF6.2",
        lf: "lf6",
        fach: "bfk1",
        points: 3,
        title: "Vegan vs. Vegetarisch",
        questionDe: "Erklären Sie den Unterschied zwischen vegan und vegetarisch und nennen Sie je 1 Lebensmittel, das Veganer meiden müssen, Vegetarier aber oft essen dürfen.",
        questionVi: "Giải thích sự khác biệt giữa thuần chay (vegan) và ăn chay thường (vegetarisch). Nêu 1 ví dụ thực phẩm người thuần chay tránh nhưng người ăn chay thường ăn được.",
        placeholderDe: "Vegan: ...\nVegetarisch: ...\nBeispiel: ...",
        keywords: [
          { term: "tierische", points: 1.0, vi: "Loại bỏ mọi sản phẩm động vật", alt: ["tierisch", "Verzicht"] },
          { term: "Fleisch", points: 1.0, vi: "Chỉ kiêng thịt/cá, chấp nhận trứng/sữa", alt: ["Fisch", "Ei", "Milch"] },
          { term: "Milch", points: 1.0, vi: "Ví dụ: Sữa hoặc Trứng", alt: ["Ei", "Käse", "Honig", "Gelatine"] }
        ],
        musterloesungDe: `Vegan: Vollständiger Verzicht auf alle tierischen Produkte (auch Milch, Eier, Honig, Gelatine).
Vegetarisch: Verzicht auf Fleisch und Fisch; tierische Nebenprodukte wie Eier, Milch und Käse werden meist verzehrt.
Beispiel: Milch (oder Eier, Honig) – Veganer meiden sie, Vegetarier konsumieren sie oft.`,
        musterloesungVi: `Thuần chay: Không dùng bất kỳ sản phẩm nào từ động vật (kể cả sữa, trứng, mật ong, gelatin).
Ăn chay thường: Kiêng thịt/cá; vẫn dùng trứng, sữa, mật ong.
Ví dụ: Sữa/trứng/mật ong.`,
        explanation: {
          whyCorrect: `Vegan = 100% keine tierischen Produkte. Vegetarisch = Kein Fleisch, aber tierische Nebenprodukte erlaubt.`,
          whyWrong: `❌ Bẫy: Nói chung chung cả hai đều là ăn rau mà không nêu được điểm mấu chốt là sữa/trứng.`,
          keyTakeaway: `Vegan = Hoàn toàn không động vật. Vegetarier = Kiêng thịt, ăn được sữa trứng.`
        }
      },
      {
        id: "lf6_03",
        no: "LF6.3",
        lf: "lf6",
        fach: "bfk1",
        points: 2,
        title: "Flexitarier vs. Pescetarier",
        questionDe: "Erläutern Sie den Begriff Flexitarier und nennen Sie den Unterschied zu Pescetariern.",
        questionVi: "Giải thích thuật ngữ Flexitarier (ăn chay linh hoạt) và nêu điểm khác biệt với Pescetarier (ăn chay có cá).",
        placeholderDe: "Flexitarier: ...\nPescetarier: ...",
        keywords: [
          { term: "gelegentlich", points: 1.0, vi: "Flexitarier: chủ yếu ăn thực vật, thỉnh thoảng mới ăn thịt", alt: ["überwiegend", "selten"] },
          { term: "Fisch", points: 1.0, vi: "Pescetarier: không ăn thịt, nhưng ăn cá", alt: ["kein Fleisch"] }
        ],
        musterloesungDe: `Flexitarier: Ernähren sich überwiegend pflanzlich, essen aber gelegentlich und bewusst qualitativ hochwertiges Fleisch.
Pescetarier: Verzichten vollständig auf Fleisch von Säugetieren und Geflügel, verzehren aber Fisch und Meeresfrüchte.`,
        musterloesungVi: `Flexitarier: Ăn thực vật là chính, thỉnh thoảng mới ăn thịt chất lượng cao.
Pescetarier: Tuyệt đối không ăn thịt gia súc/gia cầm, nhưng được phép ăn cá và hải sản.`,
        explanation: {
          whyCorrect: `Khái niệm dinh dưỡng hiện đại trong xu hướng thực đơn Gastronomie 2022.`,
          whyWrong: `❌ Lỗi: Nhầm Flexitarier là ăn kiêng hoàn toàn.`,
          keyTakeaway: `Flexi = linh hoạt (thỉnh thoảng ăn thịt). Pesce = Cá (chỉ ăn cá, kiêng thịt).`
        }
      },
      {
        id: "lf6_04",
        no: "LF6.4",
        lf: "lf6",
        fach: "bfk1",
        points: 3,
        title: "Behandlung getrockneter Hülsenfrüchte (3 Schritte)",
        questionDe: "Beschreiben Sie die 3 Schritte der küchentechnischen Behandlung von getrockneten Hülsenfrüchten (Linsen, Bohnen) und begründen Sie, warum Einweichwasser weggeschüttet wird.",
        questionVi: "Mô tả 3 bước sơ chế kỹ thuật bếp đối với các loại đậu hạt khô và giải thích vì sao phải đổ bỏ nước ngâm đậu.",
        placeholderDe: "1. Schritt: ...\n2. Schritt: ...\n3. Schritt: ...\nBegründung Wasser weggießen: ...",
        keywords: [
          { term: "Einweichen", points: 0.75, vi: "Ngâm nước lạnh 8–12 tiếng", alt: ["Wasser", "wässern"] },
          { term: "weggießen", points: 0.75, vi: "Đổ bỏ nước ngâm (chứa độc tố phasin / chất gây đầy bụng)", alt: ["wegschütten", "abgießen", "Giftstoffe", "Phasin", "Blähungen"] },
          { term: "Kochen", points: 0.75, vi: "Nấu chín hoàn toàn bằng nước mới", alt: ["garen"] },
          { term: "Phasin", points: 0.75, vi: "Khử chất độc tự nhiên phasin và hạn chế đầy hơi", alt: ["Gift", "Hämagglutinin"] }
        ],
        musterloesungDe: `1. Einweichen in reichlich kaltem Wasser (ca. 8–12 Std.).
2. Einweichwasser weggießen und Hülsenfrüchte abspülen.
3. In frischem Wasser ohne Salz weich kochen/garen.
Begründung: Das Einweichwasser enthält gelöste Bitterstoffe, blähende Zuckerstoffe und das natürliche Pflanzengift Phasin (Hämagglutinine).`,
        musterloesungVi: `1. Ngâm ngập nước lạnh (8–12 giờ).
2. Đổ bỏ nước ngâm và rửa lại.
3. Nấu chín trong nước mới (không cho muối từ đầu).
Lý do: Nước ngâm hòa tan độc tố tự nhiên Phasin và các chất gây chướng bụng đầy hơi.`,
        explanation: {
          whyCorrect: `Đậu hạt khô sống chứa độc tố Phasin làm vón cục hồng cầu. Chỉ mất độc khi nấu chín và đổ bỏ nước ngâm.`,
          whyWrong: `❌ Bẫy: Dùng luôn nước ngâm để nấu súp vì 'tiếc dưỡng chất' — sai nguyên tắc vệ sinh an toàn thực phẩm.`,
          keyTakeaway: `Einweichen → Wasser WEG (bỏ độc) → Kochen (nấu chín).`
        }
      },
      {
        id: "lf6_05",
        no: "LF6.5",
        lf: "lf6",
        fach: "bfk1",
        points: 3,
        title: "Aufbau einer Speisekarte (5 Schritte)",
        questionDe: "Erläutern Sie den korrekten Aufbau einer Speisekarte in 5 Schritten (Reihenfolge).",
        questionVi: "Giải thích bố cục chuẩn của một thực đơn (Speisekarte) gồm 5 bước theo đúng thứ tự.",
        placeholderDe: "1. ...\n2. ...\n3. ...\n4. ...\n5. ...",
        keywords: [
          { term: "Empfehlung", points: 0.6, vi: "Món đề xuất/món theo mùa", alt: ["saisonal", "Tageskarte"] },
          { term: "Vorspeise", points: 0.6, vi: "Món khai vị", alt: ["Suppen", "Vorspeisen"] },
          { term: "Hauptgang", points: 0.6, vi: "Món chính", alt: ["Hauptgerichte"] },
          { term: "Dessert", points: 0.6, vi: "Món tráng miệng", alt: ["Nachspeise", "Käse"] },
          { term: "Getränk", points: 0.6, vi: "Đồ uống", alt: ["Getränke"] }
        ],
        musterloesungDe: `1. Besondere Empfehlungen (saisonale Angebote, Chef-Empfehlung).
2. Vorspeisen und Suppen.
3. Hauptgänge (Fleisch, Fisch, Vegetarisch/Vegan).
4. Desserts / Nachspeisen und Käseangebot.
5. Getränkeangebot (Aperitif, Weine, Heißgetränke, alkoholfrei).`,
        musterloesungVi: `1. Món đề xuất / theo mùa.
2. Món khai vị và súp.
3. Món chính.
4. Món tráng miệng và phô mai.
5. Đồ uống.`,
        explanation: {
          whyCorrect: `Quy tắc biên soạn thực đơn (Speisekartenregeln) theo trải nghiệm vị giác chuẩn.`,
          whyWrong: `❌ Lỗi: Xếp tráng miệng trước món chính hoặc quên phần Empfehlung.`,
          keyTakeaway: `Empfehlung → Vor → Haupt → Nach → Getränk.`
        }
      },
      {
        id: "lf6_06",
        no: "LF6.6",
        lf: "lf6",
        fach: "bfk1",
        points: 3,
        title: "Kornaufbau des Getreides & Gluten",
        questionDe: "Nennen Sie die 3 Teile des Getreidekorns mit je 1 Inhaltsstoff und erklären Sie, was Gluten ist.",
        questionVi: "Nêu 3 phần cấu tạo của hạt ngũ cốc kèm 1 thành phần dinh dưỡng chính của mỗi phần. Giải thích Gluten là gì.",
        placeholderDe: "1. Kornteil: ...\n2. Kornteil: ...\n3. Kornteil: ...\nGluten-Erklärung: ...",
        keywords: [
          { term: "Randschichten", points: 0.75, vi: "Vỏ cám / Aleuron: chất xơ, vitamin B, khoáng chất", alt: ["Schale", "Aleuron", "Ballaststoffe"] },
          { term: "Mehlkörper", points: 0.75, vi: "Lõi bột: tinh bột và đạm (chiếm phần lớn)", alt: ["Stärke", "Eiweiß"] },
          { term: "Keimling", points: 0.75, vi: "Mầm: chất béo, vitamin E", alt: ["Fett", "Vitamin E"] },
          { term: "Klebereiweiß", points: 0.75, vi: "Gluten là protein liên kết (protein keo), gây hại ruột người bị Celiac", alt: ["Zöliakie", "Eiweiß"] }
        ],
        musterloesungDe: `1. Randschichten / Aleuronschicht: Ballaststoffe, B-Vitamine, Mineralstoffe.
2. Mehlkörper: Stärke und pflanzliches Eiweiß (Hauptteil des Korns).
3. Keimling: Fett (pflanzliche Öle), Vitamin E, Enzyme.
Gluten: Das sogenannte Klebereiweiß in Getreidearten wie Weizen, Roggen, Dinkel. Bei Zöliakie-Patienten führt Gluten zu schweren Entzündungen der Dünndarmschleimhaut.`,
        musterloesungVi: `1. Lớp vỏ cám/Aleuron: Chất xơ, vitamin B, khoáng chất.
2. Thể bột (Mehlkörper): Tinh bột và protein thực vật.
3. Phôi mầm (Keimling): Dầu béo, vitamin E.
Gluten: Protein keo kết dính trong lúa mì, lúa mạch, gây tổn thương niêm mạc ruột non người bệnh Celiac.`,
        explanation: {
          whyCorrect: `Cơ sở sinh hóa về hạt ngũ cốc và dị ứng thực phẩm trong LF6.`,
          whyWrong: `❌ Lỗi: Quên Keimling chứa chất béo (lý do bột nguyên cám nhanh hỏng hơn bột trắng).`,
          keyTakeaway: `Vỏ = Xơ & Khoáng · Lõi = Bột & Đạm · Mầm = Béo · Gluten = Klebereiweiß.`
        }
      },
      {
        id: "lf6_07",
        no: "LF6.7",
        lf: "lf6",
        fach: "bfk1",
        points: 3,
        title: "3 Grundregeln der Menüzusammenstellung",
        questionDe: "Nennen Sie 3 wichtige Grundregeln bei der Zusammenstellung eines mehrgängigen Menüs.",
        questionVi: "Nêu 3 quy tắc cơ bản quan trọng khi thiết kế một thực đơn nhiều món (Menüfolge).",
        placeholderDe: "1. Regel: ...\n2. Regel: ...\n3. Regel: ...",
        keywords: [
          { term: "keine Wiederholung der Rohstoffe", points: 1.0, vi: "Không lặp lại nguyên liệu chính (ví dụ súp lơ trắng trong súp thì món chính không dùng súp lơ)", alt: ["Rohstoffe", "Zutaten nicht wiederholen"] },
          { term: "keine Wiederholung der Garmethoden", points: 1.0, vi: "Không lặp lại phương pháp nấu (không rán cả khai vị lẫn món chính)", alt: ["Zubereitungsarten", "Zubereitung"] },
          { term: "Farb- und Geschmackskontraste", points: 1.0, vi: "Xen kẽ màu sắc sáng tối và hương vị từ thanh nhẹ đến đậm đà", alt: ["hell und dunkel", "Geschmack", "Steigerung"] }
        ],
        musterloesungDe: `1. Keine Wiederholung der Rohstoffe / Zutaten (z. B. nicht Tomatensuppe vor einem Hauptgang mit Tomatensauce).
2. Keine Wiederholung der Zubereitungsarten / Garmethoden (z. B. nicht frittierte Vorspeise und frittierter Hauptgang).
3. Harmonische Steigerung von Geschmack und Gehalt: Vom Leichten zum Schweren, vom Milden zum Kräftigen, optische Abwechslung (helle und dunkle Gänge im Wechsel).`,
        musterloesungVi: `1. Không lặp lại nguyên liệu: Tránh dùng cùng một loại củ quả/thịt trong nhiều món liên tiếp.
2. Không lặp lại cách chế biến: Tránh chiên rán liên tục cả khai vị lẫn món chính.
3. Tăng tiến hương vị hài hòa: Đi từ món thanh nhẹ đến đậm đà, xen kẽ màu sắc món ăn hấp dẫn.`,
        explanation: {
          whyCorrect: `Quy tắc kinh điển trong môn LF6 và Klassenarbeit Nr. 5.`,
          whyWrong: `❌ Bẫy: Xếp món chính quá béo ngậy ngay trước tráng miệng béo ngậy khiến khách bị ngán.`,
          keyTakeaway: `Không trùng nguyên liệu · Không trùng cách nấu · Nhẹ trước nặng sau.`
        }
      }
    ],

    // ══════════════════════════════════════════════════════════
    // LF9: ZAHLUNGEN MIT DEM GAST ABWICKELN & BGB
    // ══════════════════════════════════════════════════════════
    "lf9": [
      {
        id: "lf9_01",
        no: "LF9.1",
        lf: "lf9",
        fach: "bfk1",
        points: 4,
        title: "Systemgastronomie & Quickservice vs. Fullservice",
        questionDe: "Erklären Sie den Begriff Systemgastronomie und nennen Sie den Unterschied zwischen Quickservice und Fullservice (je 1 Merkmal).",
        questionVi: "Giải thích thuật ngữ Systemgastronomie (nhà hàng hệ thống) và nêu sự khác nhau giữa Quickservice và Fullservice (mỗi loại 1 đặc điểm).",
        placeholderDe: "Systemgastronomie: ...\nQuickservice: ...\nFullservice: ...",
        keywords: [
          { term: "standardisiert", points: 1.5, vi: "Quy trình và sản phẩm chuẩn hóa đồng nhất", alt: ["Standards", "einheitlich", "Konzept"] },
          { term: "schnell", points: 1.25, vi: "Quickservice: thời gian nhanh, gọi quầy", alt: ["Theke", "Selbstbedienung", "Counter"] },
          { term: "Tisch", points: 1.25, vi: "Fullservice: phục vụ tận bàn, trải nghiệm đầy đủ", alt: ["Bedienung am Tisch", "Kellner", "Service"] }
        ],
        musterloesungDe: `Systemgastronomie: Ein Gastronomiekonzept mit standardisierten Abläufen, Speisen und Markenauftritten an mehreren Standorten – überall gleiche Qualität und Organisation.
Quickservice: Schnelle Abwicklung (oft Selbstbedienung am Counter/Tresen, begrenzte Speisekarte, z. B. McDonald's).
Fullservice: Vollständiger Service mit Bedienung direkt am Tisch, breiteres Angebot, längere Verweildauer (z. B. Block House, L'Osteria).`,
        musterloesungVi: `Systemgastronomie: Mô hình nhà hàng chuỗi với quy trình vận hành, món ăn và thương hiệu được chuẩn hóa đồng bộ tại mọi chi nhánh.
Quickservice: Phục vụ cực nhanh, khách tự gọi quầy (McDonald's).
Fullservice: Phục vụ tận bàn, đầy đủ dịch vụ (Block House).`,
        explanation: {
          whyCorrect: `Khái niệm then chốt của LF9: Điểm cốt lõi là tính chuẩn hóa (Standardisierung).`,
          whyWrong: `❌ Bẫy: Nhầm tưởng Systemgastronomie chỉ là đồ ăn nhanh (Fullservice vẫn có thể là Systemgastro).`,
          keyTakeaway: `System = Standardisierung · Quick = Counter · Full = Tischservice.`
        }
      },
      {
        id: "lf9_02",
        no: "LF9.2",
        lf: "lf9",
        fach: "bfk1",
        points: 6,
        title: "3 Zahlungsmöglichkeiten (Vorteile & Nachteile)",
        questionDe: "Nennen Sie 3 Zahlungsmöglichkeiten und jeweils 1 Vorteil und 1 Nachteil aus Sicht des Betriebs.",
        questionVi: "Nêu 3 phương thức thanh toán kèm 1 ưu điểm và 1 nhược điểm của mỗi loại dưới góc độ của nhà hàng.",
        placeholderDe: "1. Zahlungsart: ...\n2. Zahlungsart: ...\n3. Zahlungsart: ...",
        keywords: [
          { term: "Barzahlung", points: 2.0, vi: "Tiền mặt: không phí giao dịch - rủi ro trộm cắp/đếm sai", alt: ["Bargeld"] },
          { term: "Karte", points: 2.0, vi: "Thẻ ngân hàng: an toàn, sạch sẽ - mất phí giao dịch/cần mạng", alt: ["Kreditkarte", "Debitkarte", "EC-Karte"] },
          { term: "Mobile Payment", points: 2.0, vi: "Thanh toán ĐT: cực nhanh - phụ thuộc thiết bị/pin khách", alt: ["Apple Pay", "Google Pay", "NFC"] }
        ],
        musterloesungDe: `1. Barzahlung: Vorteil: Keine Gebühren, sofortige Liquidität. Nachteil: Diebstahlrisiko, Zählfehler, Bankeinzahlungsaufwand.
2. Kartenzahlung (Debit/Kredit): Vorteil: Hygienisch, sicher gegen Diebstahl, kein Wechselgeld nötig. Nachteil: Disagio/Terminalgebühren, Abhängigkeit von Strom und Internet.
3. Mobile Payment: Vorteil: Sehr schnell und kontaktlos, kundenorientiert. Nachteil: Gebühren, Akku/Smartphone des Gastes erforderlich.`,
        musterloesungVi: `1. Tiền mặt: Không mất phí quẹt thẻ - Nguy cơ mất trộm, đếm nhầm.
2. Thẻ ngân hàng: Vệ sinh, an toàn không sợ trộm - Mất phí ngân hàng, cần mạng.
3. Di động: Siêu nhanh, tiện lợi - Mất phí thiết bị, phụ thuộc pin khách.`,
        explanation: {
          whyCorrect: `Kiểm tra góc nhìn quản trị thu ngân từ phía chủ doanh nghiệp (Betrieb).`,
          whyWrong: `❌ Bẫy: Nêu góc nhìn khách hàng (tiện lợi cho khách) thay vì góc nhìn nhà hàng.`,
          keyTakeaway: `Bar = Không phí nhưng sợ trộm · Thẻ/NFC = Sạch an toàn nhưng mất phí.`
        }
      },
      {
        id: "lf9_03",
        no: "LF9.3",
        lf: "lf9",
        fach: "bfk1",
        points: 4,
        title: "Belegausgabepflicht & Pflichtangaben",
        questionDe: "Erläutern Sie die Belegausgabepflicht (seit wann gilt sie, bei welcher Kassenart) und nennen Sie 4 Pflichtangaben auf dem Beleg.",
        questionVi: "Giải thích nghĩa vụ xuất biên lai (áp dụng từ khi nào, với loại máy thu ngân nào) và nêu 4 thông tin bắt buộc phải có trên biên lai.",
        placeholderDe: "Seit wann: ... | Kassenart: ...\n4 Pflichtangaben: ...",
        keywords: [
          { term: "2020", points: 1.0, vi: "Bắt buộc từ 01.01.2020", alt: ["01.01.2020"] },
          { term: "elektronisch", points: 1.0, vi: "Máy tính tiền điện tử có chip TSE", alt: ["Kassensystem", "TSE"] },
          { term: "Name", points: 0.5, vi: "Tên & địa chỉ nhà hàng", alt: ["Anschrift"] },
          { term: "Datum", points: 0.5, vi: "Ngày giờ in", alt: ["Uhrzeit"] },
          { term: "Menge", points: 0.5, vi: "Tên món, số lượng, số tiền", alt: ["Leistung", "Betrag", "Preis"] },
          { term: "Steuersatz", points: 0.5, vi: "Thuế suất & mã giao dịch TSE", alt: ["MwSt", "USt", "Transaktionsnummer"] }
        ],
        musterloesungDe: `Belegausgabepflicht: Gilt seit dem 01.01.2020 für alle elektronischen Kassensysteme (mit TSE). Jeder Gast muss ein Beleg angeboten bekommen.
4 Pflichtangaben:
1. Vollständiger Name und Anschrift des Betriebs.
2. Datum und Uhrzeit der Belegausstellung.
3. Menge und Art der Leistung/Speisen, Rechnungsbetrag.
4. Steuersatz (7%/19%) und TSE-Transaktionsnummer.`,
        musterloesungVi: `Áp dụng từ 01.01.2020 cho máy tính tiền điện tử (TSE).
4 thông tin: Tên/địa chỉ quán · Ngày giờ · Món ăn & số tiền · Thuế suất & mã TSE.`,
        explanation: {
          whyCorrect: `Luật bảo vệ máy thu ngân chống trốn thuế (KassenSichV). Khách không bắt buộc lấy, nhưng quán bắt buộc phải in/xuất.`,
          whyWrong: `❌ Bẫy: Ghi sai ngày hoặc tưởng khách bắt buộc phải cầm về.`,
          keyTakeaway: `01.01.2020 · Elektronische Kasse · 4 Angaben: Wer, Wann, Was/Wieviel, Steuer/TSE.`
        }
      },
      {
        id: "lf9_04",
        no: "LF9.4",
        lf: "lf9",
        fach: "bfk1",
        points: 3,
        title: "Trinkgeld im Steuerrecht (§ 3 Nr. 51 EStG)",
        questionDe: "Formulieren Sie einen kurzen Informationstext für Ihren neuen Azubi-Kollegen zum Thema Trinkgeld (üblicher Prozentsatz, Pflicht?, steuerfrei?).",
        questionVi: "Soạn đoạn văn ngắn hướng dẫn bạn mới về Tiền boa (tỷ lệ %, có bắt buộc không, có được miễn thuế không).",
        placeholderDe: "Trinkgeld-Info: ...",
        keywords: [
          { term: "5-10", points: 1.0, vi: "Tỷ lệ phổ biến: 5% đến 10%", alt: ["5–10%", "5 bis 10%"] },
          { term: "freiwillig", points: 1.0, vi: "Tự nguyện / không bắt buộc", alt: ["keine Pflicht"] },
          { term: "steuerfrei", points: 1.0, vi: "Miễn thuế thu nhập khi nhận trực tiếp", alt: ["keine Steuer"] }
        ],
        musterloesungDe: `Trinkgeld ist eine freiwillige Leistung des Gastes für guten Service und keine Pflicht. In Deutschland sind 5–10 % üblich. Wird das Trinkgeld dem Servicepersonal freiwillig und direkt gegeben, ist es nach § 3 Nr. 51 EStG steuer- und sozialabgabenfrei.`,
        musterloesungVi: `Tiền boa là tự nguyện, không bắt buộc, thông thường 5–10%. Được miễn thuế thu nhập và bảo hiểm 100% khi khách trao trực tiếp cho nhân viên.`,
        explanation: {
          whyCorrect: `Theo § 3 Nr. 51 EStG. Chỉ miễn thuế cho nhân viên làm thuê (Arbeitnehmer), không áp dụng cho chủ nhà hàng (Inhaber).`,
          whyWrong: `❌ Bẫy: Cho rằng tiền boa luôn luôn phải nộp thuế.`,
          keyTakeaway: `5–10% · Freiwillig · Steuerfrei cho nhân viên.`
        }
      },
      {
        id: "lf9_05",
        no: "LF9.5",
        lf: "lf9",
        fach: "bfk1",
        points: 4,
        title: "Mängelrüge & Stufe 1: Nacherfüllung",
        questionDe: "Ein Gast bemängelt sein Steak als 'versalzen und kalt' und fordert sofort die Rechnung um 50 % zu kürzen. Erläutern Sie die Rechtslage nach BGB (Stufe 1 vor Stufe 2).",
        questionVi: "Khách chê steak 'mặn chát và nguội ngắt' và đòi trừ tiền 50% ngay lập tức. Giải thích quy định pháp luật theo Bộ luật Dân sự Đức (BGB) về thứ tự xử lý khiếu nại (Cấp độ 1 trước Cấp độ 2).",
        placeholderDe: "Rechtslage: ...\nStufe 1: ...\nStufe 2: ...",
        keywords: [
          { term: "Nacherfüllung", points: 1.5, vi: "Cấp độ 1: Quyền khắc phục/làm lại món mới (Nachbesserung / Nachlieferung)", alt: ["Nachbesserung", "neu", "Ersatz"] },
          { term: "Vorrang", points: 1.5, vi: "Khắc phục có quyền ưu tiên trước; khách không được giảm giá ngay", alt: ["Vorrang der Nacherfüllung", "erst"] },
          { term: "Minderung", points: 1.0, vi: "Chỉ khi khắc phục thất bại thì mới đến Cấp 2: Giảm giá (Minderung) hoặc Hủy hợp đồng (Rücktritt)", alt: ["Rücktritt", "Stufe 2"] }
        ],
        musterloesungDe: `Nach BGB § 439 hat der Gastronom zuerst das Recht auf Nacherfüllung (Stufe 1: Nachbesserung oder Neulieferung eines neuen, einwandfreien Steaks).
Der Gast darf die Zahlung nicht sofort kürzen, da die Nacherfüllung Vorrang hat. Erst wenn die Nacherfüllung verweigert wird oder zweimal fehlschlägt, greift Stufe 2 (Preisminderung oder Rücktritt vom Vertrag).`,
        musterloesungVi: `Theo luật BGB § 439, nhà hàng có quyền ưu tiên khắc phục (Cấp độ 1: làm lại đĩa steak mới chuẩn độ chín).
Khách không được quyền đòi giảm giá ngay vì quyền khắc phục được ưu tiên trước. Chỉ khi nhà hàng từ chối làm lại hoặc làm lại lần 2 vẫn hỏng thì mới sang Cấp độ 2 (giảm giá hoặc hủy hợp đồng).`,
        explanation: {
          whyCorrect: `Nguyên tắc 'Vorrang der Nacherfüllung' trong luật hợp đồng dịch vụ ăn uống (Bewirtungsvertrag / Kaufrecht).`,
          whyWrong: `❌ Bẫy: Đồng ý giảm giá ngay lập tức mà quên rằng nhà hàng có quyền được làm lại món mới trước.`,
          keyTakeaway: `Thần chú khiếu nại món: Nacherfüllung (Làm lại món mới) → Thất bại mới đến Minderung (Giảm giá) hoặc Rücktritt (Hủy HĐ).`
        }
      },
      {
        id: "lf9_06",
        no: "LF9.6",
        lf: "lf9",
        fach: "bfk1",
        points: 4,
        title: "Zechprellerei vs. Vergessen des Geldbeutels (Rechtslage)",
        questionDe: "Ein Gast stellt beim Bezahlen fest, dass er sein Portemonnaie zu Hause vergessen hat. Liegt hier Zechprellerei (§ 263 StGB) vor? Wie reagieren Sie richtig?",
        questionVi: "Một vị khách khi thanh toán mới phát hiện quên ví ở nhà. Đây có phải tội quỵt tiền ăn (Zechprellerei theo luật hình sự § 263 StGB) không? Bạn xử lý thế nào cho đúng?",
        placeholderDe: "Straftat?: ...\nBegründung: ...\nVorgehen: ...",
        keywords: [
          { term: "keine Zechprellerei", points: 1.5, vi: "Không phải tội lừa đảo quỵt tiền vì thiếu ý chí cố ý gian lận (Vorsatz) từ ban đầu", alt: ["kein Betrug", "kein Vorsatz"] },
          { term: "Vorsatz", points: 1.0, vi: "Tội quỵt tiền chỉ xảy ra khi khách cố tình vào ăn mà biết trước mình không trả tiền", alt: ["Absicht"] },
          { term: "Personalien", points: 1.5, vi: "Ghi lại thông tin cá nhân (CCCD / Ausweis) hoặc ký nhận nợ và chuyển khoản sau", alt: ["Ausweis", "Schuldschein", "Adresse", "nachzahlen"] }
        ],
        musterloesungDe: `Rechtslage: Nein, es liegt keine Zechprellerei (Erschleichen von Leistungen / Betrug nach § 263 StGB) vor, da der Vorsatz fehlt. Der Gast wollte zahlen, hat das Geld aber fahrlässig vergessen.
Richtiges Vorgehen:
1. Ruhe bewahren und zivilrechtlich regeln.
2. Personalien aufnehmen (Personalausweis vorzeigen lassen, Anschrift und Telefonnummer notieren).
3. Schuldschein / Zahlungsvereinbarung ausstellen (Zahlung per Überweisung oder Barzahlung am Folgetag).`,
        musterloesungVi: `Pháp luật: Không cấu thành tội lừa đảo quỵt tiền vì không có sự cố ý (Vorsatz). Khách có thiện chí trả tiền nhưng sơ ý quên ví.
Cách xử lý đúng:
1. Giữ bình tĩnh, giải quyết theo hướng dân sự.
2. Kiểm tra giấy tờ tùy thân (CCCD/Ausweis), ghi lại địa chỉ và số điện thoại.
3. Lập giấy hẹn nợ (Schuldschein) để khách chuyển khoản hoặc mang tiền mặt đến trả vào ngày hôm sau.`,
        explanation: {
          whyCorrect: `Theo Bộ luật Hình sự Đức (StGB § 263) và Bộ luật Dân sự Đức (BGB).`,
          whyWrong: `❌ Bẫy: Gọi ngay cảnh sát bắt giữ khách hoặc tịch thu đồ đạc phi pháp (giữ người trái phép).`,
          keyTakeaway: `Quên ví = Thiếu ý đồ xấu (Không phải Betrug) → Kiểm tra CCCD → Viết giấy hẹn nợ.`
        }
      }
    ],

    // ══════════════════════════════════════════════════════════
    // BFK-2: FLEISCH, GARMETHODEN, FISCH & GRUNDSAUCEN
    // ══════════════════════════════════════════════════════════
    "fleisch": [
      {
        id: "fl_01",
        no: "FL.1",
        lf: "fleisch",
        fach: "bfk2",
        points: 4,
        title: "Garstufen beim Rindersteak (Kerntemperatur)",
        questionDe: "Nennen Sie 4 Garstufen für Rinderfilet/Rumpsteak auf Deutsch und Französisch mit der jeweiligen Kerntemperatur in °C.",
        questionVi: "Nêu 4 cấp độ chín của bít tết bò bằng tiếng Đức và Pháp kèm nhiệt độ tâm (Kerntemperatur) tương ứng tính bằng °C.",
        placeholderDe: "1. Garstufe: ...\n2. Garstufe: ...\n3. Garstufe: ...\n4. Garstufe: ...",
        keywords: [
          { term: "Rare", points: 1.0, vi: "Blutig / Rare / Saignant: ca. 48–52 °C", alt: ["Saignant", "blutig", "50"] },
          { term: "Medium rare", points: 1.0, vi: "Englisch / Medium rare: ca. 53–56 °C", alt: ["rosa", "54"] },
          { term: "Medium", points: 1.0, vi: "Medium / À point (hồng đào): ca. 56–60 °C", alt: ["à point", "58"] },
          { term: "Well done", points: 1.0, vi: "Durch / Well done / Bien cuit: über 68–72 °C", alt: ["durchgebraten", "bien cuit", "70"] }
        ],
        musterloesungDe: `1. Blutig / Rare (Französisch: Saignant): Kerntemperatur ca. 48–52 °C (Kern rot und warm).
2. Rosa / Medium rare (Französisch: Anglaise): Kerntemperatur ca. 53–55 °C.
3. Halb durch / Medium (Französisch: À point): Kerntemperatur ca. 56–60 °C (Kern zartrosa).
4. Durch / Well done (Französisch: Bien cuit): Kerntemperatur über 68–72 °C (vollständig durchgegart).`,
        musterloesungVi: `1. Tái sống (Rare / Saignant): Tâm khoảng 48–52 °C.
2. Tái vừa (Medium rare): Tâm khoảng 53–55 °C.
3. Chín vừa hồng (Medium / À point): Tâm khoảng 56–60 °C.
4. Chín kĩ (Well done / Bien cuit): Tâm trên 70 °C.`,
        explanation: {
          whyCorrect: `Tiêu chuẩn quốc tế phục vụ và chế biến món bò trong nhà hàng cao cấp BfK-2.`,
          whyWrong: `❌ Bẫy: Nhầm lẫn nhiệt độ giữa Medium (56-60°C) với Well-done (>70°C) dẫn đến làm cháy thịt của khách.`,
          keyTakeaway: `Rare (50°C) → Medium rare (54°C) → Medium (58°C) → Well done (>70°C).`
        }
      },
      {
        id: "fl_02",
        no: "FL.2",
        lf: "fleisch",
        fach: "bfk2",
        points: 4,
        title: "Garmethoden: Dünsten vs. Schmoren",
        questionDe: "Erklären Sie den Unterschied zwischen Dünsten und Schmoren (Garflüssigkeit, Anbraten, typische Lebensmittel).",
        questionVi: "Giải thích sự khác biệt giữa Dünsten (om/hấp ít nước) và Schmoren (om ninh nhừ) về lượng nước, có áp chảo không, và loại thực phẩm áp dụng.",
        placeholderDe: "Dünsten: ...\nSchmoren: ...",
        keywords: [
          { term: "wenig Flüssigkeit", points: 1.5, vi: "Dünsten: nấu trong ít chất lỏng hoặc chính nước của thực phẩm, không áp chảo xém vàng", alt: ["eigenem Saft", "ohne Anbraten"] },
          { term: "Anbraten", points: 1.5, vi: "Schmoren: áp chảo mạnh lửa tạo vỏ nâu (Röstaromen) rồi mới châm nước đậy vung om nhỏ lửa", alt: ["Röstaromen", "anrösten"] },
          { term: "bindegewebsreich", points: 1.0, vi: "Schmoren dùng cho thịt nhiều mô liên kết (Gulasch, Rouladen); Dünsten dùng cho cá, rau mềm", alt: ["Gulasch", "Rouladen", "Fisch", "Gemüse"] }
        ],
        musterloesungDe: `Dünsten: Garen in wenig Flüssigkeit oder im eigenen Saft bei milder Hitze (ca. 100 °C) ohne vorheriges Anbraten. Geeignet für zarte, empfindliche Lebensmittel wie Fischfilet, Geflügelbrust oder Gemüse.
Schmoren: Kombiniertes Garverfahren: Zuerst kräftiges scharfes Anbraten (für intensive Röstaromen), danach Ablöschen und langsames Weichgaren in Flüssigkeit mit geschlossenem Deckel. Typisch für bindegewebsreiches Fleisch (Rouladen, Gulasch, Ochsenschwanz).`,
        musterloesungVi: `Dünsten: Làm chín trong rất ít nước hoặc chính nước tự nhiên của rau củ/cá, không rán xém nâu. Dùng cho đồ mềm như cá, ức gà, rau.
Schmoren: Phương pháp kết hợp: Đầu tiên rán cháy cạnh lửa to lấy mùi thơm caramel (Röstaromen), sau đó châm nước sốt và đậy vung đun liu riu cho mềm nhừ. Dùng cho thịt nhiều gân mô liên kết (bò kho goulash, thịt cuộn).`,
        explanation: {
          whyCorrect: `Hai kỹ thuật gia nhiệt nền tảng trong bếp chuyên nghiệp Đức (Klassische Garverfahren).`,
          whyWrong: `❌ Bẫy: Trả lời Schmoren không cần rán trước (đó là Kochen hoặc Dünsten).`,
          keyTakeaway: `Dünsten = Dịu dàng ít nước không rán · Schmoren = Rán xém lấy mùi thơm rồi mới om nhừ.`
        }
      },
      {
        id: "fl_03",
        no: "FL.3",
        lf: "fleisch",
        fach: "bfk2",
        points: 4,
        title: "Frischemerkmale bei ganzem Fisch (5 Kriterien)",
        questionDe: "Nennen Sie 5 sensorische Frischemerkmale bei der Anlieferung von ganzem frischen Fisch.",
        questionVi: "Nêu 5 tiêu chí cảm quan nhận biết cá tươi nguyên con khi nhận hàng.",
        placeholderDe: "1. Augen: ...\n2. Kiemen: ...\n3. Haut / Schuppen: ...\n4. Fleisch: ...\n5. Geruch: ...",
        keywords: [
          { term: "Augen", points: 0.8, vi: "Mắt lồi, trong suốt, con ngươi đen lánh (không đục/lõm)", alt: ["klar", "gewölbt"] },
          { term: "Kiemen", points: 0.8, vi: "Mang đỏ tươi, không nhớt nhờn hôi", alt: ["hellrot", "feucht"] },
          { term: "Schuppen", points: 0.8, vi: "Vảy bám chắc vào da, da bóng sáng có lớp nhớt tự nhiên trong suốt", alt: ["Haut", "festsitzend"] },
          { term: "Fleisch", points: 0.8, vi: "Thịt chắc, đàn hồi tốt (ấn ngón tay vào không bị lõm vĩnh viễn)", alt: ["elastisch", "fest", "Druckprobe"] },
          { term: "Geruch", points: 0.8, vi: "Mùi tanh nhẹ dễ chịu của biển/sông, không có mùi hôi ươn thối", alt: ["frisch", "Meer", "Algen"] }
        ],
        musterloesungDe: `1. Augen: Klar, glänzend, prall gewölbt, schwarze Pupille (nicht trüb oder eingefallen).
2. Kiemen: Hellrot bis feuerrot, feucht, ohne Schleimablagerungen.
3. Haut und Schuppen: Glänzend, feucht, Schuppen sitzen fest am Körper, natürlicher dünner Schleimfilm.
4. Fleischkonsistenz: Fest und elastisch (Druckprobe mit dem Finger: Die Delle bildet sich sofort zurück).
5. Geruch: Angenehm frisch nach Meer oder Algen, keinesfalls faulig, ammoniakalisch oder „fischig\".`,
        musterloesungVi: `1. Mắt: Trong veo, lồi sáng, con ngươi đen (không mờ đục hoặc trũng sâu).
2. Mang: Đỏ tươi, ẩm ướt, không có dịch nhầy hôi.
3. Da & vảy: Vảy óng ánh bám chặt vào thân cá.
4. Thịt: Chắc nịch và đàn hồi (ấn tay vào vết lõm tự đàn hồi trở lại ngay).
5. Mùi: Thơm thoang thoảng mùi biển hoặc tảo, không có mùi amoniac ươn thối.`,
        explanation: {
          whyCorrect: `Tiêu chuẩn kiểm tra vệ sinh thủy hải sản nghiêm ngặt theo quy định HACCP.`,
          whyWrong: `❌ Bẫy: Nghĩ rằng cá biển phải có mùi tanh nồng mới là cá (cá tươi chuẩn gần như không có mùi tanh khó chịu).`,
          keyTakeaway: `Mắt trong lồi · Mang đỏ tươi · Vảy bám chắc · Thịt đàn hồi · Mùi biển tươi.`
        }
      },
      {
        id: "fl_04",
        no: "FL.4",
        lf: "fleisch",
        fach: "bfk2",
        points: 4,
        title: "Klassische Grundsaucen der Küche",
        questionDe: "Nennen Sie 4 klassische Grundsaucen der Küche und deren Hauptflüssigkeit bzw. Bindung.",
        questionVi: "Nêu 4 loại nước sốt nền kinh điển (Grundsaucen) trong bếp và chất lỏng tạo nền hoặc cách liên kết của chúng.",
        placeholderDe: "1. Sauce: ...\n2. Sauce: ...\n3. Sauce: ...\n4. Sauce: ...",
        keywords: [
          { term: "Bechamel", points: 1.0, vi: "Sauce Béchamel: sữa nấu với bột xào bơ trắng (weiße Mehlschwitze)", alt: ["Milch", "Mehlschwitze"] },
          { term: "Veloute", points: 1.0, vi: "Sauce Velouté: nước dùng trắng (cá, gà, bê) với bột xào bơ", alt: ["weiße Grundsauce", "Fond"] },
          { term: "Espagnole", points: 1.0, vi: "Sauce Espagnole / Braune Sauce: nước dùng nâu (brauner Kalbsfond) cô đặc", alt: ["braune Grundsauce", "Bratensaft"] },
          { term: "Hollandaise", points: 1.0, vi: "Sauce Hollandaise: sốt bơ trứng đánh bông ấm (Eigelb và bơ lỏng)", alt: ["Buttersauce", "Eigelb"] }
        ],
        musterloesungDe: `1. Béchamelsauce: Weiße Mehlschwitze (Roux blanc) aufgegossen mit Milch.
2. Velouté (Weiße Grundsauce): Helle Mehlschwitze aufgegossen mit weißem Fond (Geflügel-, Kalbs- oder Fischfond).
3. Espagnole / Braune Grundsauce: Dunkle Mehlschwitze bzw. Röstrückstände mit braunem Kalbsfond (Jus / Demi-Glace).
4. Sauce Hollandaise: Warme Emulsionssauce aus schaumig geschlagenem Eigelb und zerlassener Butter.`,
        musterloesungVi: `1. Sốt Béchamel: Bột mì xào bơ trắng nấu với sữa tươi.
2. Sốt Velouté: Bột xào bơ nấu với nước dùng trắng (nước hầm gà, bê hoặc cá).
3. Sốt Espagnole (sốt nâu): Nước dùng xương bê nướng nâu cô đặc.
4. Sốt Hollandaise: Sốt nhũ tương ấm đánh bông từ lòng đỏ trứng và bơ đun chảy.`,
        explanation: {
          whyCorrect: `Di sản ẩm thực Auguste Escoffier, bài học nền tảng của nghề đầu bếp Koch/Köchin và BfK-2.`,
          whyWrong: `❌ Bẫy: Nhầm sốt mayonnaise vào sốt ấm (Mayonnaise là sốt nhũ tương lạnh dùng dầu ăn, còn Hollandaise dùng bơ ấm).`,
          keyTakeaway: `Béchamel = Sữa · Velouté = Nước dùng trắng · Espagnole = Nước dùng nâu · Hollandaise = Bơ trứng.`
        }
      }
    ],

    // ══════════════════════════════════════════════════════════
    // GEMEINSCHAFTSKUNDE (GK / WISO)
    // ══════════════════════════════════════════════════════════
    "gk": [
      {
        id: "gk_01",
        no: "GK.1",
        lf: "gk",
        fach: "gk",
        points: 4,
        title: "Vier Möglichkeiten politischer Partizipation",
        questionDe: "Erläutern Sie vier Möglichkeiten der politischen Einflussnahme (Partizipation) von Bürgerinnen und Bürgern in Deutschland.",
        questionVi: "Giải thích 4 cách thức tham gia và tác động chính trị (Partizipation) của công dân tại Đức.",
        placeholderDe: "1. Möglichkeit: ...\n2. Möglichkeit: ...\n3. Möglichkeit: ...\n4. Möglichkeit: ...",
        keywords: [
          { term: "Wahlen", points: 1.0, vi: "Bầu cử Quốc hội/Bang/Hội đồng xã", alt: ["Wahlrecht", "wählen"] },
          { term: "Demonstration", points: 1.0, vi: "Biểu tình / tuần hành ôn hòa (Grundgesetz Art. 8)", alt: ["Demos", "Kundgebung"] },
          { term: "Petition", points: 1.0, vi: "Gửi kiến nghị / Đơn thỉnh nguyện trực tuyến", alt: ["Bürgerinitiative", "Online-Petition"] },
          { term: "Partei", points: 1.0, vi: "Gia nhập đảng phái hoặc tổ chức công đoàn", alt: ["Gewerkschaft", "Verein", "Bürgerforum"] }
        ],
        musterloesungDe: `1. Wahlen: Teilnahme an Bundestags-, Landtags- oder Kommunalwahlen (wichtigste Form demokratischer Willensbildung).
2. Demonstrationen und Kundgebungen: Öffentliche Meinungsäußerung nach Art. 8 GG (Versammlungsfreiheit).
3. Petitionen und Bürgerinitiativen: Einreichen von Anliegen an den Petitionsausschuss oder lokales Engagement.
4. Mitarbeit in Parteien oder Gewerkschaften: Aktive politische Mitgestaltung und Kandidatur für Ämter.`,
        musterloesungVi: `1. Bầu cử: Tham gia bầu cử Quốc hội, Bang hoặc địa phương.
2. Biểu tình: Thể hiện chính kiến nơi công cộng theo quyền tự do hội họp (Điều 8 Hiến pháp Đức).
3. Đơn kiến nghị & Sáng kiến công dân: Gửi thỉnh nguyện thư lên Ủy ban Kiến nghị.
4. Tham gia đảng phái hoặc công đoàn: Trực tiếp hoạch định chính sách.`,
        explanation: {
          whyCorrect: `Theo Điều 20 và các điều khoản quyền công dân trong Luật Cơ bản Đức (Grundgesetz).`,
          whyWrong: `❌ Bẫy: Chỉ kể tên bạo loạn hoặc hành vi vi phạm pháp luật (không được công nhận là Partizipation hợp hiến).`,
          keyTakeaway: `Wahlen (Bầu cử) · Demos (Biểu tình) · Petitionen (Kiến nghị) · Parteien (Đảng phái).`
        }
      },
      {
        id: "gk_02",
        no: "GK.2",
        lf: "gk",
        fach: "gk",
        points: 4,
        title: "Probezeit im Ausbildungsverhältnis (§ 20 BBiG)",
        questionDe: "Erläutern Sie die gesetzlichen Regelungen zur Probezeit im Ausbildungsvertrag (Mindest- und Höchstdauer, Kündigungsfrist, Begründungspflicht).",
        questionVi: "Giải thích quy định pháp luật về Thời gian thử việc trong hợp đồng học nghề (thời gian tối thiểu và tối đa, thời hạn báo trước khi nghỉ, có cần nêu lý do không).",
        placeholderDe: "Dauer: ...\nKündigungsfrist: ...\nBegründung: ...",
        keywords: [
          { term: "1 bis 4 Monate", points: 1.5, vi: "Thời gian: tối thiểu 1 tháng, tối đa 4 tháng", alt: ["1 Monat", "4 Monate", "mindestens 1", "höchstens 4"] },
          { term: "fristlos", points: 1.5, vi: "Có thể nghỉ ngay lập tức (không cần thời hạn báo trước)", alt: ["ohne Kündigungsfrist", "jederzeit"] },
          { term: "ohne Angabe von Gründen", points: 1.0, vi: "Không cần nêu bất kỳ lý do nào (cả hai bên)", alt: ["keine Begründung"] }
        ],
        musterloesungDe: `Dauer: Mindestens 1 Monat, höchstens 4 Monate (§ 20 BBiG).
Kündigung in der Probezeit: Beide Seiten (Azubi und Betrieb) können das Ausbildungsverhältnis jederzeit fristlos (von heute auf morgen) kündigen.
Begründung: Eine Kündigung in der Probezeit bedarf keinerlei schriftlicher Begründung. Sie muss lediglich schriftlich erfolgen.`,
        musterloesungVi: `Thời gian: Tối thiểu 1 tháng, tối đa 4 tháng (Luật BBiG § 20).
Nghỉ việc trong thử việc: Cả hai bên (Azubi và công ty) đều có thể chấm dứt hợp đồng ngay lập tức không cần chờ thời hạn.
Lý do: Không bắt buộc phải giải thích lý do, chỉ cần viết đơn bằng văn bản.`,
        explanation: {
          whyCorrect: `Theo Luật Đào tạo Nghề Đức (BBiG § 20 và § 22). Sau khi hết thử việc, công ty chỉ được sa thải Azubi vì lý do đặc biệt nghiêm trọng (fristlose Kündigung aus wichtigem Grund).`,
          whyWrong: `❌ Bẫy: Nhầm thời gian thử việc của học nghề với người đi làm bình thường (người đi làm thường tối đa 6 tháng, còn Azubi tối đa chỉ 4 tháng!).`,
          keyTakeaway: `Azubi-Probezeit: 1–4 tháng · Nghỉ ngay lập tức · Không cần lý do.`
        }
      },
      {
        id: "gk_03",
        no: "GK.3",
        lf: "gk",
        fach: "gk",
        points: 5,
        title: "5 Säulen der gesetzlichen Sozialversicherung",
        questionDe: "Nennen Sie die 5 Säulen der gesetzlichen Sozialversicherung in Deutschland und nennen Sie diejenige Versicherung, die der Arbeitgeber alleine bezahlt.",
        questionVi: "Nêu 5 trụ cột của Bảo hiểm Xã hội bắt buộc tại Đức và chỉ ra loại bảo hiểm duy nhất mà người sử dụng lao động (chủ) phải chi trả 100%.",
        placeholderDe: "5 Säulen: ...\nAllein vom Arbeitgeber gezahlt: ...",
        keywords: [
          { term: "Krankenversicherung", points: 0.8, vi: "Bảo hiểm y tế", alt: ["Krankenkasse"] },
          { term: "Pflegeversicherung", points: 0.8, vi: "Bảo hiểm chăm sóc điều dưỡng", alt: ["Pflege"] },
          { term: "Rentenversicherung", points: 0.8, vi: "Bảo hiểm hưu trí", alt: ["Rente"] },
          { term: "Arbeitslosenversicherung", points: 0.8, vi: "Bảo hiểm thất nghiệp", alt: ["Arbeitsamt", "Arbeitslos"] },
          { term: "Unfallversicherung", points: 1.0, vi: "Bảo hiểm tai nạn lao động (Berufsgenossenschaft - do chủ trả 100%)", alt: ["Berufsgenossenschaft", "BG"] },
          { term: "Arbeitgeber allein", points: 0.8, vi: "Bảo hiểm tai nạn (Gesetzliche Unfallversicherung / BGN) do chủ trả toàn bộ", alt: ["nur Arbeitgeber"] }
        ],
        musterloesungDe: `Die 5 Säulen:
1. Gesetzliche Krankenversicherung (GKV)
2. Gesetzliche Pflegeversicherung (GPV)
3. Gesetzliche Rentenversicherung (GRV)
4. Gesetzliche Arbeitslosenversicherung (ALV)
5. Gesetzliche Unfallversicherung (GUV / Berufsgenossenschaft)
Allein vom Arbeitgeber bezahlt: Die Gesetzliche Unfallversicherung (über die Berufsgenossenschaft, in der Gastro die BGN) wird zu 100 % vom Arbeitgeber getragen. Die anderen 4 Säulen werden grundsätzlich paritätisch (50/50) geteilt.`,
        musterloesungVi: `5 trụ cột:
1. Bảo hiểm Y tế (Krankenversicherung)
2. Bảo hiểm Chăm sóc điều dưỡng (Pflegeversicherung)
3. Bảo hiểm Hưu trí (Rentenversicherung)
4. Bảo hiểm Thất nghiệp (Arbeitslosenversicherung)
5. Bảo hiểm Tai nạn nghề nghiệp (Unfallversicherung / BG)
Chủ trả 100%: Bảo hiểm Tai nạn (Berufsgenossenschaft BGN). 4 bảo hiểm còn lại chia đôi 50/50 giữa chủ và người lao động.`,
        explanation: {
          whyCorrect: `Hệ thống an sinh xã hội Otto von Bismarck thành lập năm 1883, câu hỏi cốt lõi luôn xuất hiện trong kỳ thi tốt nghiệp GK của IHK.`,
          whyWrong: `❌ Bẫy: Trả lời bảo hiểm tư nhân (Haftpflicht, Hausrat) — đây là bảo hiểm cá nhân tự nguyện, không thuộc 5 trụ cột an sinh bắt buộc.`,
          keyTakeaway: `5 trụ cột: Y tế - Điều dưỡng - Hưu trí - Thất nghiệp - Tai nạn (Tai nạn: Chủ trả 100%).`
        }
      },
      {
        id: "gk_04",
        no: "GK.4",
        lf: "gk",
        fach: "gk",
        points: 4,
        title: "Kündigung nach der Probezeit (Ordentlich vs. Außerordentlich)",
        questionDe: "Erklären Sie den Unterschied zwischen einer ordentlichen und einer außerordentlichen (fristlosen) Kündigung nach § 626 BGB.",
        questionVi: "Giải thích sự khác biệt giữa sa thải theo thủ tục thông thường (ordentliche Kündigung) và sa thải đặc biệt không báo trước (fristlose Kündigung theo luật § 626 BGB).",
        placeholderDe: "Ordentliche Kündigung: ...\nAußerordentliche Kündigung: ...",
        keywords: [
          { term: "Kündigungsfrist", points: 1.5, vi: "Ordentlich: tuân thủ thời hạn báo trước luật định (thường 4 tuần vào ngày 15 hoặc cuối tháng)", alt: ["Frist", "fristgemäß"] },
          { term: "wichtiger Grund", points: 1.5, vi: "Außerordentlich: cần lý do đặc biệt nghiêm trọng (Diebstahl, Tätlichkeit, Betrug)", alt: ["fristlos", "schwerwiegend"] },
          { term: "sofort", points: 1.0, vi: "Chấm dứt ngay tức thì, thời hạn phát đơn trong vòng 2 tuần kể từ khi biết sự việc", alt: ["zwei Wochen", "fristlos"] }
        ],
        musterloesungDe: `Ordentliche Kündigung: Erfolgt unter Einhaltung der gesetzlichen oder tarifvertraglichen Kündigungsfrist (z. B. 4 Wochen zum 15. oder Monatsende). Bei Auszubildenden nach der Probezeit kann der Betrieb NICHT mehr ordentlich kündigen!
Außerordentliche Kündigung (§ 626 BGB): Beendet das Arbeitsverhältnis mit sofortiger Wirkung ohne Frist. Erfordert einen „wichtigen Grund\", der die Fortsetzung unzumutbar macht (z. B. Diebstahl in der Kasse, tätlicher Angriff). Muss innerhalb von 2 Wochen nach Bekanntwerden ausgesprochen werden.`,
        musterloesungVi: `Sa thải thông thường (Ordentlich): Tuân thủ thời hạn báo trước theo luật định (ví dụ 4 tuần). Đối với Azubi sau khi hết thử việc, công ty KHÔNG ĐƯỢC PHÉP sa thải thông thường nữa!
Sa thải tức thì (Außerordentlich): Chấm dứt hợp đồng ngay lập tức không báo trước. Bắt buộc phải có lý do cực kỳ nghiêm trọng (như thụt két trộm tiền, hành hung đồng nghiệp). Phải ra quyết định trong vòng 2 tuần kể từ khi phát hiện.`,
        explanation: {
          whyCorrect: `Bảo vệ quyền lợi lao động đặc thù của người học nghề theo luật BBiG và luật BGB.`,
          whyWrong: `❌ Bẫy: Tưởng rằng sau thử việc công ty vẫn sa thải Azubi dễ dàng bằng cách báo trước 4 tuần (sai hoàn toàn!).`,
          keyTakeaway: `Học nghề sau thử việc: Cấm sa thải thông thường · Chỉ được đuổi khi phạm lỗi cực nặng (trộm cắp, đánh nhau).`
        }
      }
    ]
  };

  // ══════════════════════════════════════════════════════════
  // CÁC BỘ ĐỀ THI TỐT NGHIỆP IHK THẬT (ABSCHLUSSPRÜFUNGEN)
  // ══════════════════════════════════════════════════════════
  const IHK_EXAMS = {
    // 1. ĐỀ MÙA ĐÔNG 2024/2025 (MỚI NHẤT)
    "ihk-winter-2024": {
      id: "ihk-winter-2024",
      code: "IHK W24",
      type: "abschluss",
      title: "Abschlussprüfung Winter 2024/25",
      subtitle: "Fachkraft für Gastronomie · Frühstücksbuffet, Eierspeisen & Kassenabrechnung",
      badge: "IHK · Winter 2024/25",
      totalPoints: 100,
      defaultMinutes: 60,
      situation: `Sie sind Mitarbeiter im Restaurant FRIENDS in Berlin. Das Restaurant bietet täglich von 8:00 bis 11:30 Uhr ein reichhaltiges Frühstücksbuffet für 60 Personen an. Sie organisieren die Speisenzubereitung, Heißgetränke, Hygiene und Kassenabrechnung.`,
      questions: [
        LF_BANK.lf4[1], // Rührei Zubereitung & Salmonellen
        LF_BANK.lf5[0], // Kaffeespezialitäten (Espresso, Cappuccino, Latte)
        LF_BANK.lf3[1], // Beschwerdemanagement LEARN
        LF_BANK.lf9[2], // Belegausgabepflicht
        LF_BANK.lf9[5]  // Zechprellerei vs Vergessen
      ]
    },

    // 2. ĐỀ MÙA HÈ 2024 (MUTTERTAGSBUFFET)
    "ihk-sommer-2024": {
      id: "ihk-sommer-2024",
      code: "IHK S24",
      type: "abschluss",
      title: "Abschlussprüfung Sommer 2024",
      subtitle: "Fachkraft für Gastronomie · Muttertagsbuffet & Kasse",
      badge: "IHK · Sommer 2024",
      totalPoints: 100,
      defaultMinutes: 60,
      situation: `Am 12. Mai richtet das Hotel-Restaurant „Sonnenblick\" ein großes Muttertagsbuffet für 80 angemeldete Gäste aus. Sie sind als Fachkraft für Gastronomie für den Ablauf, das Mise en place, die Gästebetreuung, die Abrechnung und die Hygiene verantwortlich.`,
      questions: [
        {
          id: "s24_q1",
          no: "1.1",
          points: 20,
          title: "Muttertagsbuffet – Zeit- und Arbeitsablaufplan",
          questionDe: "Erstellen Sie einen Ablaufplan für den Buffetservice am Muttertag (4 Kernschritte von der Vorbereitung bis zum Servicebeginn um 12:00 Uhr).",
          questionVi: "Lập kế hoạch quy trình phục vụ tiệc Buffet ngày của Mẹ (4 bước cốt lõi từ chuẩn bị bàn đến giờ mở buffet lúc 12:00).",
          placeholderDe: "1. Vorbereitung / Mise en place: ...\n2. Buffetaufbau: ...\n3. Speisenausgabe: ...\n4. Begrüßung / Service: ...",
          keywords: [
            { term: "Mise en place", points: 5.0, vi: "Chuẩn bị đồ dùng, bát đĩa, ly cốc, khăn trải bàn", alt: ["Vorbereitung", "Eindecken"] },
            { term: "Buffetaufbau", points: 5.0, vi: "Bố trí bàn buffet, thiết bị giữ nhiệt Chafing Dish", alt: ["Chafing Dish", "Warmhalteplatte"] },
            { term: "Kühlkette", points: 5.0, vi: "Bảo quản lạnh món khai vị, kiểm tra nhiệt độ món nóng > 65°C", alt: ["Temperatur", "HACCP"] },
            { term: "Briefing", points: 5.0, vi: "Họp nhóm giao việc cho nhân viên trước giờ đón khách", alt: ["Servicebesprechung", "Einweisung"] }
          ],
          musterloesungDe: `1. Mise en place im Gastraum: Tische festlich eindecken, Besteck polieren, Menükarten aufstellen (bis 10:30 Uhr).
2. Buffetaufbau und Technik-Check: Chafing Dishes mit Brennpaste vorheizen, Vorlegebesteck bereitstellen (bis 11:15 Uhr).
3. Bestückung des Buffets unter HACCP: Kalte Speisen aus der Kühlung holen, warme Speisen (> 65 °C) einsetzen (11:45 Uhr).
4. Service-Briefing: Aufgabenverteilung (Getränkeservice, Abräumen, Buffetbetreuung) vor Eintreffen der Gäste (11:50 Uhr).`,
          musterloesungVi: `1. Chuẩn bị phòng tiệc: Trải bàn, đánh bóng dao thìa dĩa, cắm hoa.
2. Dựng quầy buffet: Khởi động khay giữ nóng Chafing Dish.
3. Bày món ăn đảm bảo HACCP: Món nguội lấy từ tủ lạnh, món nóng > 65°C.
4. Họp phổ biến công việc cho đội ngũ phục vụ trước giờ mở cửa.`,
          explanation: {
            whyCorrect: `Đề thi IHK kiểm tra năng lực tổ chức sự kiện chuyên nghiệp và an toàn vệ sinh thực phẩm HACCP.`,
            whyWrong: `❌ Bẫy: Bày đồ ăn nguội ra bàn quá sớm trước 2 tiếng làm đứt gãy chuỗi lạnh vi phạm luật vệ sinh.`,
            keyTakeaway: `Mise en place → Technik vorheizen → Speisen kurz vor 12 Uhr → Briefing.`
          }
        },
        {
          id: "s24_q2",
          no: "1.2",
          points: 20,
          title: "Umsatzsteuer-Berechnung (Speisen vs. Getränke)",
          questionDe: "Am Ende des Buffets bezahlt Familie Schmidt bar: Speisenbuffet 214,00 € brutto und Getränke 59,50 € brutto. Berechnen Sie die jeweilige Umsatzsteuer (7 % auf Speisen, 19 % auf Getränke) und den Nettobetrag.",
          questionVi: "Gia đình Schmidt trả tiền mặt: Tiền buffet đồ ăn 214,00 € brutto và đồ uống 59,50 € brutto. Tính thuế GTGT tương ứng (7% đồ ăn, 19% đồ uống) và số tiền Netto.",
          placeholderDe: "Speisen (7%): Netto = ... € | USt = ... €\nGetränke (19%): Netto = ... € | USt = ... €",
          keywords: [
            { term: "200", points: 5.0, vi: "Netto món ăn = 200,00 € (214 ÷ 1,07)", alt: ["200,00", "200 €"] },
            { term: "14", points: 5.0, vi: "Thuế USt món ăn 7% = 14,00 €", alt: ["14,00", "14 €"] },
            { term: "50", points: 5.0, vi: "Netto đồ uống = 50,00 € (59,50 ÷ 1,19)", alt: ["50,00", "50 €"] },
            { term: "9,50", points: 5.0, vi: "Thuế USt đồ uống 19% = 9,50 €", alt: ["9.50", "9,50 €"] }
          ],
          musterloesungDe: `1. Speisenbuffet (7 % USt):
- Netto = 214,00 € ÷ 1,07 = 200,00 €
- USt (7 %) = 214,00 € - 200,00 € = 14,00 €
2. Getränke (19 % USt):
- Netto = 59,50 € ÷ 1,19 = 50,00 €
- USt (19 %) = 59,50 € - 50,00 € = 9,50 €
Gesamt: Netto = 250,00 € | USt gesamt = 23,50 € | Brutto = 273,50 €.`,
          musterloesungVi: `1. Tiền ăn (7% USt): Netto = 214 ÷ 1,07 = 200,00 € · Tiền thuế = 14,00 €.
2. Đồ uống (19% USt): Netto = 59,50 ÷ 1,19 = 50,00 € · Tiền thuế = 9,50 €.`,
          explanation: {
            whyCorrect: `Theo Luật Thuế Giá trị Gia tăng Đức (UStG): Món ăn phục vụ tại chỗ tính 7% (áp dụng luật mới), đồ uống tính 19%.`,
            whyWrong: `❌ Bẫy toán học: Lấy Brutto nhân trực tiếp với 7% (sai hoàn toàn!). Công thức đúng: Netto = Brutto ÷ 1,07.`,
            keyTakeaway: `Chia 1,07 để ra Netto đồ ăn · Chia 1,19 để ra Netto đồ uống · Trừ ra số thuế.`
          }
        },
        LF_BANK.lf3[2], // Allergenberatung LMIV
        LF_BANK.lf9[4], // Mängelrüge Stufe 1 Nacherfüllung
        {
          id: "s24_q5",
          no: "3.1",
          points: 20,
          title: "Nachhaltigkeit & Abfallvermeidung nach dem Buffet",
          questionDe: "Nach dem Buffet sind Speisen übriggeblieben. Nennen Sie 4 Maßnahmen zur Vermeidung von Lebensmittelverschwendung und umweltgerechten Entsorgung.",
          questionVi: "Sau tiệc buffet còn thừa lượng lớn món ăn. Nêu 4 biện pháp chống lãng phí thực phẩm và xử lý rác thải thân thiện môi trường.",
          placeholderDe: "1. Maßnahme: ...\n2. Maßnahme: ...\n3. Maßnahme: ...\n4. Maßnahme: ...",
          keywords: [
            { term: "Personalessen", points: 5.0, vi: "Món chưa bày ra buffet dùng cho cơm nhân viên trong ngày", alt: ["Mitarbeiter", "Küche"] },
            { term: "Weiterverarbeitung", points: 5.0, vi: "Tái chế biến an toàn hợp chuẩn HACCP (nấu súp, nhân bánh)", alt: ["Suppen", "Kroketten"] },
            { term: "Too Good To Go", points: 5.0, vi: "Bán túi giải cứu đồ ăn qua app hoặc chia sẻ cho tổ chức từ thiện Tafel", alt: ["Tafel", "Spende", "App"] },
            { term: "Speiserestebehälter", points: 5.0, vi: "Thức ăn thừa thu gom vào thùng rác hữu cơ riêng (làm khí Biogas)", alt: ["Biotonne", "Biogas", "Speisereste"] }
          ],
          musterloesungDe: `1. Weiterverwendung im Betrieb: Unberührte Speisen aus der Küche zeitnah fürs Mitarbeiteressen verwenden.
2. HACCP-konforme Weiterverarbeitung: Geeignete Reste zu Suppen oder Füllungen verarbeiten.
3. Abgabe an Dritte: Kooperation mit Plattformen wie „Too Good To Go\" oder der Tafel.
4. Fachgerechte Entsorgung: Nicht verzehrte Tellerreste getrennt in zertifizierten Speiserestebehältern (Biogas) entsorgen.`,
          musterloesungVi: `1. Đồ ăn chưa bày ra: Dùng cho cơm nhân viên trong ngày.
2. Tái chế biến hợp chuẩn: Nấu súp hoặc nước dùng.
3. Chia sẻ: Bán qua app Too Good To Go hoặc quyên góp Tafel.
4. Phân loại rác: Thùng rác hữu cơ riêng làm biogas.`,
          explanation: {
            whyCorrect: `Tiêu chí bảo vệ môi trường và phát triển bền vững theo quy chế GastroAusbV 2022.`,
            whyWrong: `❌ Bẫy: Mang đồ thừa trên đĩa của khách bán lại hoặc đổ dầu ăn vào cống thoát nước.`,
            keyTakeaway: `Cơm nhân viên → Nấu súp → Too Good To Go → Biogas.`
          }
        }
      ]
    },

    // 3. ĐỀ MÙA ĐÔNG 2023/2024 (WEIHNACHTSMENÜ)
    "ihk-winter-2023": {
      id: "ihk-winter-2023",
      code: "IHK W23",
      type: "abschluss",
      title: "Abschlussprüfung Winter 2023/24",
      subtitle: "Fachkraft für Gastronomie · Weihnachtsmenü & Kassenabschluss",
      badge: "IHK · Winter 2023",
      totalPoints: 100,
      defaultMinutes: 60,
      situation: `Im Restaurant „Alte Posthalterei\" findet das traditionelle 4-Gänge-Weihnachtsessen für eine Firmenfeier (45 Personen) statt. Sie organisieren die Weinberatung, den Serviceablauf, die Menüfolge und den Kassenabschluss (Z-Bon).`,
      questions: [
        {
          id: "w23_q1",
          no: "1.1",
          points: 25,
          title: "Weihnachtsmenüfolge & Weinbegleitung",
          questionDe: "Erstellen Sie ein harmonisches 4-Gänge-Weihnachtsmenü mit passender Weinbegleitung (Vorspeise, Suppe, Hauptgang mit Gans, Dessert).",
          questionVi: "Thiết kế thực đơn Giáng sinh 4 món hài hòa kèm rượu vang phù hợp (Khai vị, Súp, Món chính với ngỗng quay, Tráng miệng).",
          placeholderDe: "1. Vorspeise + Wein: ...\n2. Suppe: ...\n3. Hauptgang + Wein: ...\n4. Dessert + Wein/Getränk: ...",
          keywords: [
            { term: "Vorspeise", points: 6.0, vi: "Món khai vị nhẹ kèm vang trắng", alt: ["Salat", "Riesling"] },
            { term: "Suppe", points: 6.0, vi: "Súp đậm đà (Maronensuppe)", alt: ["Maronen", "Kraftbrühe"] },
            { term: "Gänsebraten", points: 7.0, vi: "Món chính ngỗng quay kèm vang đỏ đậm (Spätburgunder)", alt: ["Rotkohl", "Knödel", "Spätburgunder", "Rotwein"] },
            { term: "Dessert", points: 6.0, vi: "Tráng miệng kèm rượu ngọt", alt: ["Bratapfel", "Eiswein"] }
          ],
          musterloesungDe: `1. Vorspeise: Feldsalat mit gerösteten Walnüssen – Wein: Trockener Weißburgunder.
2. Suppe: Cremige Maronensamtsuppe mit Croutons.
3. Hauptgang: Knuspriger Gänsebraten an Beifußsoße mit Apfelrotkohl und Kartoffelklößen – Wein: Kräftiger Spätburgunder (trocken).
4. Dessert: Gefüllter Bratapfel mit Marzipan und Vanilleeis – Wein: Edelsüßer Eiswein.`,
          musterloesungVi: `1. Khai vị: Salad Feldsalat hạt óc chó – Vang trắng Weißburgunder.
2. Súp: Súp kem hạt dẻ Maronen thơm bùi.
3. Món chính: Ngỗng quay da giòn kèm bắp cải đỏ và bánh viên khoai tây – Vang đỏ Spätburgunder.
4. Tráng miệng: Táo nướng Bratapfel kèm kem vani – Vang ngọt Eiswein.`,
          explanation: {
            whyCorrect: `Thực đơn Giáng sinh kinh điển chuẩn nghề Đức: Món ăn đi từ thanh nhẹ đến đậm đà, rượu vang đỏ đậm đi với ngỗng quay béo ngậy.`,
            whyWrong: `❌ Bẫy: Chọn rượu vang trắng ngọt cho món ngỗng béo ngậy sẽ gây ngấy và lệch vị.`,
            keyTakeaway: `Feldsalat → Maronensuppe → Gänsebraten (Spätburgunder) → Bratapfel (Eiswein).`
          }
        },
        {
          id: "w23_q2",
          no: "1.2",
          points: 25,
          title: "Kassenabschluss & Kassensturz (Z-Bon)",
          questionDe: "Nach Veranstaltungsende führen Sie den Kassenabschluss durch. Erläutern Sie den Unterschied zwischen X-Bon und Z-Bon und die Schritte eines Kassensturzes.",
          questionVi: "Sau khi xong tiệc, bạn thực hiện chốt sổ thu ngân. Giải thích sự khác biệt giữa X-Bon và Z-Bon và các bước kiểm kê quỹ tiền mặt (Kassensturz).",
          placeholderDe: "X-Bon vs. Z-Bon: ...\nKassensturz-Schritte: ...",
          keywords: [
            { term: "Zwischenbericht", points: 7.0, vi: "X-Bon: Báo cáo tạm thời, không đặt lại doanh số về 0", alt: ["X-Bericht", "Zwischenstand"] },
            { term: "Tagesabschluss", points: 7.0, vi: "Z-Bon: Chốt sổ cuối ngày, xóa doanh số về 0 để sang ngày mới", alt: ["Z-Bericht", "Nullstellung"] },
            { term: "Ist-Bestand", points: 6.0, vi: "Đếm tiền mặt thực tế trong két", alt: ["Zählen", "Bargeld"] },
            { term: "Soll-Bestand", points: 5.0, vi: "So sánh tiền thực tế (Ist) với số liệu máy tính (Soll), tìm chênh lệch", alt: ["Differenz", "Kassendifferenz"] }
          ],
          musterloesungDe: `X-Bon vs. Z-Bon:
- X-Bon (Zwischenbericht): Zeigt den aktuellen Umsatzstand an, ohne die Kasse auf Null zurückzusetzen.
- Z-Bon (Tagesabschluss): Finaler Tagesbericht, der den Tagesumsatz festschreibt und den Speicher auf Null setzt.
Schritte des Kassensturzes:
1. Zählen des tatsächlichen Bargelds (Ist-Bestand).
2. Abzug des Wechselgeld-Grundstocks.
3. Abgleich mit dem Soll-Bestand des Kassensystems.
4. Festhalten eventueller Kassendifferenzen.`,
          musterloesungVi: `Khác biệt:
- X-Bon: Báo cáo tạm thời giữa ca, không reset máy.
- Z-Bon: Báo cáo chốt sổ cuối ngày, reset máy về 0 cho ngày mới.
Các bước kiểm kê tiền:
1. Đếm tiền mặt thực tế trong két (Ist-Bestand).
2. Trừ vốn thối ban đầu.
3. So sánh với số liệu trên máy tính (Soll-Bestand).
4. Xác định chênh lệch thừa/thiếu.`,
          explanation: {
            whyCorrect: `Quy tắc kế toán GoBD của Cơ quan Thuế Đức (Finanzamt) bắt buộc kiểm quỹ hàng ngày.`,
            whyWrong: `❌ Bẫy: In nhầm Z-Bon giữa ca làm đóng ca sớm của quán.`,
            keyTakeaway: `X-Bon = Tạm thời · Z-Bon = Chốt ngày về 0 · Kassensturz = Ist trừ vốn so với Soll.`
          }
        },
        {
          id: "w23_q3",
          no: "2.1",
          points: 25,
          title: "Jugendarbeitsschutzgesetz (JArbSchG) bei der Weihnachtsfeier",
          questionDe: "Zwei Azubis (einer 16 Jahre alt, einer 19 Jahre alt) helfen bei der Abendveranstaltung. Nennen Sie 3 arbeitszeitrechtliche Vorgaben für den 16-jährigen Azubi nach JArbSchG.",
          questionVi: "Hai bạn Azubi (một bạn 16 tuổi, một bạn 19 tuổi) cùng hỗ trợ tiệc tối. Nêu 3 quy định về thời gian làm việc đối với bạn 16 tuổi theo Luật Bảo vệ Lao động Vị thành niên (JArbSchG).",
          placeholderDe: "1. Arbeitszeit: ...\n2. Feierabend / Uhrzeit: ...\n3. Ruhezeit: ...",
          keywords: [
            { term: "8 Stunden", points: 9.0, vi: "Tối đa 8 giờ/ngày, tối đa 40 giờ/tuần", alt: ["40 Stunden", "täglich"] },
            { term: "22 Uhr", points: 8.0, vi: "Trong ngành nhà hàng được làm tối đa đến 22:00 tối", alt: ["22:00", "zehn Uhr"] },
            { term: "12 Stunden", points: 8.0, vi: "Thời gian nghỉ liên tục giữa 2 ca tối thiểu 12 tiếng", alt: ["Ruhezeit", "Freizeit"] }
          ],
          musterloesungDe: `Für den 16-jährigen Azubi gilt das Jugendarbeitsschutzgesetz (JArbSchG):
1. Tägliche Höchstarbeitszeit: Maximal 8 Stunden täglich und maximal 40 Stunden in der Woche.
2. Schichtzeit-Ende: Im Gaststättengewerbe dürfen Jugendliche über 16 Jahre nur bis maximal 22:00 Uhr beschäftigt werden.
3. Ununterbrochene Ruhezeit: Mindestens 12 freie Stunden bis zum nächsten Dienstbeginn.`,
          musterloesungVi: `Dành cho bạn 16 tuổi (Luật JArbSchG):
1. Giờ làm tối đa: 8 tiếng/ngày, tối đa 40 tiếng/tuần.
2. Giờ kết thúc: Làm muộn nhất đến 22:00 tối.
3. Nghỉ ngơi giữa ca: Tối thiểu 12 tiếng liên tục.`,
          explanation: {
            whyCorrect: `Bảo vệ sức khỏe cho người học nghề chưa thành niên theo luật JArbSchG.`,
            whyWrong: `❌ Bẫy: Nhầm lẫn giờ làm của người 19 tuổi (được làm quá 22:00 và nghỉ 11 tiếng theo ArbZG).`,
            keyTakeaway: `Azubi < 18 tuổi: Tối đa 8h/ngày · Muộn nhất 22h · Nghỉ ca 12h.`
          }
        },
        {
          id: "w23_q4",
          no: "2.2",
          points: 25,
          title: "Serviceablauf – Wein servieren & Dekantieren",
          questionDe: "Für den Hauptgang bestellt der Gast eine Flasche gereiften Rotwein. Beschreiben Sie die Schritte des Weinservices am Tisch inklusive Probeschluck und Dekantieren.",
          questionVi: "Khách gọi 1 chai vang đỏ lâu năm. Mô tả các bước phục vụ rượu vang tại bàn bao gồm thử rượu và chiết rượu (Dekantieren).",
          placeholderDe: "1. Präsentation: ...\n2. Öffnen & Korken: ...\n3. Dekantieren: ...\n4. Probeschluck: ...",
          keywords: [
            { term: "Präsentieren", points: 6.0, vi: "Trình nhãn chai bên phải người đặt tiệc, đọc tên vang, nhà sản xuất, niên vụ", alt: ["Etikett", "Jahrgang"] },
            { term: "Korken", points: 6.0, vi: "Mở nút bần không tạo tiếng nổ, ngửi nút và đặt nút lên đĩa nhỏ cho khách kiểm tra", alt: ["Korkenprüfung", "Korkenzieher"] },
            { term: "Dekantieren", points: 7.0, vi: "Rót từ từ qua nến vào bình decanter để tách cặn và cho rượu thở", alt: ["Karaffe", "Kerze", "Depot", "Belüften"] },
            { term: "Probeschluck", points: 6.0, vi: "Rót 1 ngụm thử cho người gọi nếm trước, sau khi gật đầu mới rót cho phụ nữ trước, khách trước, chủ tiệc sau cùng", alt: ["Verkosten", "Gastgeber"] }
          ],
          musterloesungDe: `1. Weinpräsentation: Flasche von rechts mit sichtbarem Etikett dem Gastgeber präsentieren (Name, Rebsorte, Jahrgang).
2. Kapsel abschneiden und Flasche öffnen: Korken leise herausdrehen, auf Fehler prüfen und auf kleinem Untersetzer beim Gast ablegen.
3. Dekantieren: Den gereiften Wein langsam über einer Kerzenflamme in eine Karaffe umfüllen (Bodensatz Depot in der Flaschenschulter zurückhalten).
4. Probeschluck & Service: Dem Gastgeber Probeschluck einschenken. Nach Freigabe zuerst Damen, dann Herren, zuletzt Gastgeber von rechts bedienen.`,
          musterloesungVi: `1. Trình chai rượu: Đứng bên tay phải, ngửa nhãn chai cho chủ tiệc xem.
2. Cắt vỏ bọc & mở nút: Rút nút nhẹ nhàng, ngửi kiểm tra nút bần và đặt lên đĩa nhỏ cho khách xem.
3. Chiết rượu (Dekantieren): Rót từ từ rượu vào bình chiết trên ngọn nến để giữ lại cặn rượu (Depot).
4. Thử rượu & rót: Rót một ngụm nhỏ cho chủ tiệc nếm. Khi chủ tiệc đồng ý, rót cho phụ nữ trước, nam giới sau, và chủ tiệc rót cuối cùng.`,
          explanation: {
            whyCorrect: `Nghiệp vụ dịch vụ rượu vang nhà hàng cao cấp (Sommelier-Standards).`,
            whyWrong: `❌ Bẫy: Rót đầy ly ngay cho tất cả mọi người mà quên chưa mời chủ tiệc thử rượu (Probeschluck).`,
            keyTakeaway: `Trình nhãn → Mở khẽ → Soi nến chiết cặn → Khách thử → Rót phụ nữ trước, chủ tiệc sau.`
          }
        }
      ]
    },

    // 4. KLASSENARBEITEN
    "bfk1-ka3": {
      id: "bfk1-ka3",
      code: "KA3",
      type: "ka",
      title: "Klassenarbeit Nr. 3 – BfK-1",
      subtitle: "LF6 (Gästebewertungen/Obst) + LF9 (Zahlung/Beleg/Trinkgeld)",
      badge: "BfK-1 · LF6/9",
      totalPoints: 35,
      defaultMinutes: 30,
      situation: `Sie wirken aktuell im Hotel-Restaurant „Froher Seeblick\" mit. Mehrere Gästebewertungen liegen vor. Sie werten das Angebot aus und optimieren das Bezahlsystem.`,
      questions: [
        LF_BANK.lf6[0], // Auswertungsmethode
        LF_BANK.lf6[1], // Vegan vs Vegetarisch
        LF_BANK.lf6[4], // Aufbau Speisekarte
        LF_BANK.lf9[0], // Systemgastronomie
        LF_BANK.lf9[1], // Zahlungsmöglichkeiten
        LF_BANK.lf9[3]  // Trinkgeld
      ]
    },

    "bfk1-ka4": {
      id: "bfk1-ka4",
      code: "KA4",
      type: "ka",
      title: "Klassenarbeit Nr. 4 – BfK-1",
      subtitle: "LF6 (Hülsenfrüchte/Vegan) + LF9 (Mängelrüge/Beleg)",
      badge: "BfK-1 · LF6/9",
      totalPoints: 35,
      defaultMinutes: 30,
      situation: `Sie arbeiten im Hotel-Restaurant „Sonnenblick\". Eine vegane Woche ist geplant. Gleichzeitig kommt es zu einer Gästebeschwerde über ein versalzenes Steak.`,
      questions: [
        LF_BANK.lf6[1], // Vegan vs Vegetarisch
        LF_BANK.lf6[2], // Flexitarier
        LF_BANK.lf6[3], // Hülsenfrüchte
        LF_BANK.lf9[2], // Belegausgabepflicht
        LF_BANK.lf9[4]  // Mängelrüge Stufe 1
      ]
    },

    "bfk1-ka5": {
      id: "bfk1-ka5",
      code: "KA5",
      type: "ka",
      title: "Klassenarbeit Nr. 5 – BfK-1",
      subtitle: "LF6 (Getreide/Gluten/Menüregeln) + LF9 (BGB/Zechprellerei/Trinkgeld)",
      badge: "BfK-1 · LF6/9",
      totalPoints: 35,
      defaultMinutes: 30,
      situation: `Sie arbeiten im Hotel-Restaurant „Alpenblick\". Ein neues Menü soll konzipiert werden. An Tisch 4 bemängelt ein Gast die Garstufe und an Tisch 7 hat ein Gast sein Portemonnaie vergessen.`,
      questions: [
        LF_BANK.lf6[5], // Kornaufbau & Gluten
        LF_BANK.lf6[6], // 3 Menüregeln
        LF_BANK.lf9[4], // Mängelrüge Nacherfüllung
        LF_BANK.lf9[5], // Zechprellerei vs Portemonnaie vergessen
        LF_BANK.lf9[3]  // Trinkgeld
      ]
    }
  };

  // Hàm sinh đề thi linh hoạt theo Lernfeld đã chọn (Dynamic Generator)
  function generateExamFromLfs({ fach, lfs, questionCount, timeMinutes }){
    const selectedLfs = Array.isArray(lfs) ? lfs : [lfs];
    let pool = [];

    selectedLfs.forEach(lfKey => {
      if(LF_BANK[lfKey]){
        pool = pool.concat(LF_BANK[lfKey]);
      }
    });

    if(!pool.length){
      pool = LF_BANK.lf6.concat(LF_BANK.lf9);
    }

    // Trộn ngẫu nhiên câu hỏi (Shuffle)
    const shuffled = pool.slice().sort(() => 0.5 - Math.random());
    const count = (questionCount && questionCount !== 'all') ? Math.min(Number(questionCount), shuffled.length) : shuffled.length;
    const questions = shuffled.slice(0, count);

    const totalPts = questions.reduce((sum, q) => sum + (q.points || 0), 0);
    const lfLabel = selectedLfs.map(x => x.toUpperCase()).join(' + ');

    return {
      id: `custom_${Date.now()}`,
      code: "MIX",
      type: "modular",
      title: `Training: ${fach ? fach.toUpperCase() : 'BfK-1'} (${lfLabel})`,
      subtitle: `${questions.length} câu hỏi tự luận chọn lọc · Thang điểm ${totalPts} P.`,
      badge: `${fach ? fach.toUpperCase() : 'BfK-1'} · ${lfLabel}`,
      totalPoints: totalPts,
      defaultMinutes: Number(timeMinutes) || 30,
      situation: `Bộ đề thi tự luận được tạo động từ các chủ đề ${lfLabel}. Hãy trả lời hoàn chỉnh bằng tiếng Đức và kiểm tra đối chiếu với đáp án mẫu.`,
      questions: questions
    };
  }

  // Danh mục Lernfeld hỗ trợ lọc linh hoạt trong giao diện
  const LF_CATALOG = [
    { id: "lf1", fach: "bfk1", code: "LF1", title: "LF1: In der Gastronomie arbeiten & BBiG", count: (LF_BANK.lf1||[]).length },
    { id: "lf2", fach: "bfk1", code: "LF2", title: "LF2: Güter annehmen, lagern & HACCP", count: (LF_BANK.lf2||[]).length },
    { id: "lf3", fach: "bfk1", code: "LF3", title: "LF3: Gäste empfangen, beraten & Allergene", count: (LF_BANK.lf3||[]).length },
    { id: "lf4", fach: "bfk1", code: "LF4", title: "LF4: Einfache Speisen & Schnittarten", count: (LF_BANK.lf4||[]).length },
    { id: "lf5", fach: "bfk1", code: "LF5", title: "LF5: Getränke, Kaffee & Weinservice", count: (LF_BANK.lf5||[]).length },
    { id: "lf6", fach: "bfk1", code: "LF6", title: "LF6: Gerichte, Menüs, Getreide & Vegan", count: (LF_BANK.lf6||[]).length },
    { id: "lf9", fach: "bfk1", code: "LF9", title: "LF9: Zahlungen, Belege, BGB & USt", count: (LF_BANK.lf9||[]).length },
    { id: "fleisch", fach: "bfk2", code: "BfK-2", title: "BfK-2: Fleisch, Fisch & Grundsaucen", count: (LF_BANK.fleisch||[]).length },
    { id: "gk", fach: "gk", code: "GK", title: "Gemeinschaftskunde (WiSo & Arbeitsrecht)", count: (LF_BANK.gk||[]).length }
  ];

  global.ARENA_DATA = {
    LF_BANK: LF_BANK,
    IHK_EXAMS: IHK_EXAMS,
    LF_CATALOG: LF_CATALOG,
    getExam: function(id){
      return IHK_EXAMS[id] || null;
    },
    generateExamFromLfs: generateExamFromLfs,
    listIhkExams: function(){
      return Object.keys(IHK_EXAMS).map(k => ({
        id: k,
        code: IHK_EXAMS[k].code,
        title: IHK_EXAMS[k].title,
        subtitle: IHK_EXAMS[k].subtitle,
        badge: IHK_EXAMS[k].badge,
        points: IHK_EXAMS[k].totalPoints,
        questionsCount: IHK_EXAMS[k].questions.length,
        defaultMinutes: IHK_EXAMS[k].defaultMinutes,
        type: IHK_EXAMS[k].type
      }));
    }
  };
})(typeof window !== 'undefined' ? window : this);
