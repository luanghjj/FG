/* ============================================================
   arena-data.js  —  Bộ đề thi tự luận chuẩn cho Phòng thi chung (Arena)
   Định dạng: Câu hỏi DE/VI, Barem chấm từ khóa, Đáp án mẫu Musterlösung,
   Phân tích chuyên sâu: Vì sao đúng? Bẫy thi & Vì sao sai? Mẹo ăn điểm IHK.
   ============================================================ */
(function(global){
  "use strict";

  const ARENA_EXAMS = {
    "bfk1-ka3": {
      id: "bfk1-ka3",
      code: "KA3",
      title: "Klassenarbeit Nr. 3 – BfK-1",
      subtitle: "LF6 (Gästebewertungen/Obst) + LF9 (Zahlung/Beleg/Trinkgeld)",
      badge: "BfK-1 · LF6/9",
      totalPoints: 35,
      defaultMinutes: 30,
      situation: `Sie wirken aktuell im Hotel-Restaurant „Froher Seeblick" mit. In den letzten Wochen sind mehrere Gästebewertungen eingegangen. Die Hotelleitung möchte das Angebot verbessern và hiện đại hóa hệ thống thanh toán.`,
      questions: [
        {
          id: "q1_1",
          no: "1.1",
          points: 3,
          title: "Auswertungsmethode der Gästebewertungen",
          questionDe: "Werten Sie die Gästebewertungen systematisch aus. Nennen Sie die Auswertungsmethode in 4 Schritten.",
          questionVi: "Phân tích các đánh giá của khách có hệ thống. Nêu phương pháp phân tích gồm 4 bước.",
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
            whyCorrect: `Quy trình 4 bước này là chuẩn mực quản trị chất lượng (Qualitätsmanagement). Thu thập dữ liệu trước → phân loại theo bộ phận chịu trách nhiệm → đo lường mức độ khẩn cấp → đưa ra giải pháp và bắt buộc phải kiểm tra (Kontrolle) để tạo vòng lặp cải tiến khép kín.`,
            whyWrong: `❌ Lỗi 1: Chỉ nêu cách xử lý tình huống cá nhân (đến xin lỗi, đổi món) thay vì quy trình phân tích hệ thống.\n❌ Lỗi 2: Quên bước "Kontrolle" (kiểm tra lại) — lỗi này mất trọn 0.75 điểm phổ biến nhất trong đề thi nghề.`,
            keyTakeaway: `Công thức vàng: Sammeln → Kategorisieren → Häufigkeit/Schwere → Maßnahmen → Kontrolle (Gom → Loại → Đo → Trị → Soát).`
          }
        },
        {
          id: "q1_2",
          no: "1.2",
          points: 3,
          title: "Häufige Kritikpunkte der Gäste",
          questionDe: "Nennen Sie jeweils 2 häufige Kritikpunkte der Gäste: (a) am Personal, (b) an der Sauberkeit, (c) am Speiseangebot.",
          questionVi: "Nêu 2 điểm bị chê phổ biến của khách: (a) về nhân sự, (b) về vệ sinh, (c) về thực đơn/món ăn.",
          placeholderDe: "(a) Personal: ...\n(b) Sauberkeit: ...\n(c) Speiseangebot: ...",
          keywords: [
            { term: "unfreundlich", points: 0.5, vi: "Thái độ không thân thiện", alt: ["arrogant", "langsam"] },
            { term: "langsam", points: 0.5, vi: "Phục vụ chậm chạp", alt: ["Bedienung"] },
            { term: "Toiletten", points: 0.5, vi: "Nhà vệ sinh không sạch", alt: ["WC", "Klo"] },
            { term: "Buffet", points: 0.5, vi: "Buffet lộn xộn, đĩa bẩn", alt: ["Teller", "Geschirr", "unordentlich"] },
            { term: "vegetarisch", points: 0.5, vi: "Thiếu món chay", alt: ["vegan", "Auswahl"] },
            { term: "Obst", points: 0.5, vi: "Ít trái cây tươi / đồ nguội", alt: ["frisch", "kalt"] }
          ],
          musterloesungDe: `(a) Personal: unfreundlich/arrogant, langsame Bedienung.
(b) Sauberkeit: unsaubere Toiletten, unaufgeräumtes Buffet / verschmutztes Geschirr.
(c) Speiseangebot: mangelnde vegetarische Alternativen, kaum frisches Obst / kalte Speisen.`,
          musterloesungVi: `(a) Nhân sự: thái độ không thân thiện/kiêu ngạo, phục vụ chậm.
(b) Vệ sinh: nhà vệ sinh bẩn, quầy buffet lộn xộn/bát đĩa bẩn.
(c) Món ăn: thiếu lựa chọn món chay, hầu như không có hoa quả tươi hoặc đồ ăn bị nguội.`,
          explanation: {
            whyCorrect: `Đề bài yêu cầu mỗi nhóm đủ 2 ý cụ thể trích xuất trực tiếp từ phản hồi thực tế của khách trong tình huống khách sạn Seeblick.`,
            whyWrong: `❌ Lỗi thường gặp: Chỉ nêu chung chung "phục vụ chán" hoặc chỉ nêu được 1 ý mỗi nhóm (mất nửa số điểm).`,
            keyTakeaway: `Ghi nhớ đủ 3 nhóm: Personal (thái độ + tốc độ) · Sauberkeit (WC + bát đĩa/buffet) · Speiseangebot (món chay + hoa quả).`
          }
        },
        {
          id: "q1_3",
          no: "1.3",
          points: 3,
          title: "Vegan vs. Vegetarisch",
          questionDe: "Erklären Sie den Unterschied zwischen vegan und vegetarisch und nennen Sie je 1 Lebensmittel, das Veganer meiden müssen, Vegetarier aber oft essen dürfen.",
          questionVi: "Giải thích sự khác biệt giữa thuần chay (vegan) và ăn chay thường (vegetarisch). Nêu 1 ví dụ thực phẩm người thuần chay tránh nhưng người ăn chay thường ăn được.",
          placeholderDe: "Vegan: ...\nVegetarisch: ...\nBeispiel Lebensmittel: ...",
          keywords: [
            { term: "tierische", points: 1.0, vi: "Loại bỏ mọi sản phẩm động vật", alt: ["tierisch", "Verzicht"] },
            { term: "Fleisch", points: 1.0, vi: "Chỉ kiêng thịt/cá, chấp nhận trứng/sữa", alt: ["Fisch", "Ei", "Milch"] },
            { term: "Milch", points: 1.0, vi: "Ví dụ: Sữa hoặc Trứng", alt: ["Ei", "Käse", "Honig", "Gelatine"] }
          ],
          musterloesungDe: `Vegan: Vollständiger Verzicht auf alle tierischen Produkte (auch Milch, Eier, Honig, Gelatine).
Vegetarisch: Verzicht auf Fleisch und Fisch; tierische Nebenprodukte wie Eier, Milch und Käse werden meist verzehrt.
Beispiel: Milch (oder Eier, Honig) – Veganer meiden sie, Vegetarier konsumieren sie oft.`,
          musterloesungVi: `Thuần chay (Vegan): Từ bỏ hoàn toàn mọi sản phẩm có nguồn gốc động vật (kể cả sữa, trứng, mật ong, gelatin).
Ăn chay thường (Vegetarisch): Chỉ kiêng thịt và cá; các chế phẩm từ động vật như trứng, sữa, bơ phô mai vẫn dùng được.
Ví dụ: Sữa hoặc Trứng, Mật ong — người thuần chay tránh, người ăn chay thường vẫn ăn.`,
          explanation: {
            whyCorrect: `Đây là kiến thức dinh dưỡng bắt buộc trong LF6. Cần nêu rõ ranh giới: Vegan = 100% không dính dáng động vật; Vegetarisch = không ăn thịt động vật bị giết thịt, nhưng dùng sản phẩm từ con vật (trứng, sữa).`,
            whyWrong: `❌ Lỗi: Nói chung chung "đều là ăn rau" mà không chỉ ra được điểm mấu chốt là sữa/trứng/mật ong.`,
            keyTakeaway: `Vegan = Không mọi thứ từ con vật (Keine tierischen Produkte). Vegetarier = Không thịt (Kein Fleisch), nhưng có thể dùng sữa/trứng.`
          }
        },
        {
          id: "q1_4",
          no: "1.4",
          points: 3,
          title: "Aufbau einer Speisekarte (5 Schritte)",
          questionDe: "Erläutern Sie den korrekten Aufbau einer Speisekarte in 5 Schritten (Reihenfolge).",
          questionVi: "Giải thích bố cục chuẩn của một thực đơn (Speisekarte) gồm 5 bước theo đúng thứ tự.",
          placeholderDe: "1. ...\n2. ...\n3. ...\n4. ...\n5. ...",
          keywords: [
            { term: "Empfehlung", points: 0.6, vi: "Món đề xuất/món theo mùa", alt: ["saisonal", "Spezialität", "Tagesempfehlung"] },
            { term: "Vorspeise", points: 0.6, vi: "Món khai vị", alt: ["Suppe", "Vorspeisen"] },
            { term: "Hauptgang", points: 0.6, vi: "Món chính", alt: ["Hauptgerichte", "Hauptgänge"] },
            { term: "Dessert", points: 0.6, vi: "Món tráng miệng", alt: ["Nachspeise", "Käse"] },
            { term: "Getränk", points: 0.6, vi: "Đồ uống", alt: ["Getränke", "Aperitif"] }
          ],
          musterloesungDe: `1. Besondere Empfehlungen (z. B. saisonale Gerichte, Tageskarte).
2. Vorspeisen (und Suppen).
3. Hauptgänge (Fleisch, Fisch, Vegetarisch).
4. Desserts / Nachspeisen (inkl. Käse).
5. Getränke (Aperitif, Weine, alkoholfreie Getränke, Heißgetränke).`,
          musterloesungVi: `1. Món đề xuất đặc biệt (món theo mùa, món gợi ý của bếp).
2. Món khai vị (và các món súp).
3. Món chính (thịt, cá, món chay).
4. Món tráng miệng (kèm phô mai).
5. Đồ uống (khai vị, rượu vang, giải khát, đồ uống nóng).`,
          explanation: {
            whyCorrect: `Thứ tự Speisekarte tuân theo hành trình trải nghiệm vị giác của thực khách từ nhẹ nhàng kích thích vị giác đến món đạm chính và kết thúc ngọt ngào.`,
            whyWrong: `❌ Lỗi: Xếp lộn xộn món tráng miệng trước món chính, hoặc quên phần Món đề xuất đầu menu (Empfehlungen).`,
            keyTakeaway: `Thần chú 5 bước: Empfehlung → Vorspeise → Hauptgang → Dessert → Getränke.`
          }
        },
        {
          id: "q1_5",
          no: "1.5",
          points: 3,
          title: "Obstgruppen & „5 am Tag”",
          questionDe: "Nennen Sie 2 Obstgruppen mit je 2 Beispielen und begründen Sie, warum die Kampagne „5 am Tag\" für die Gesundheit wichtig ist.",
          questionVi: "Nêu 2 nhóm trái cây kèm 2 ví dụ mỗi nhóm. Giải thích vì sao chiến dịch „5 am Tag” (5 phần mỗi ngày) lại quan trọng cho sức khỏe.",
          placeholderDe: "Gruppe 1 + Beispiele: ...\nGruppe 2 + Beispiele: ...\nBegründung 5 am Tag: ...",
          keywords: [
            { term: "Beerenobst", points: 1.0, vi: "Quả mọng (dâu, mâm xôi...)", alt: ["Erdbeere", "Himbeere", "Heidelbeere"] },
            { term: "Kernobst", points: 1.0, vi: "Quả có hạt hạch/lõi (táo, lê...)", alt: ["Steinobst", "Apfel", "Birne", "Pfirsich", "Kirsche", "Südfrüchte"] },
            { term: "Vitamine", points: 1.0, vi: "Cung cấp vitamin, khoáng chất, chất xơ, giảm bệnh tật", alt: ["Mineralstoffe", "Ballaststoffe", "Immunsystem", "Gesundheit"] }
          ],
          musterloesungDe: `Gruppe 1: Beerenobst (z. B. Erdbeere, Himbeere).
Gruppe 2: Kernobst (z. B. Apfel, Birne) oder Steinobst (z. B. Kirsche, Pflaume).
„5 am Tag\": Täglich 5 Portionen Obst und Gemüse liefern lebenswichtige Vitamine, Mineralstoffe und Ballaststoffe, stärken das Immunsystem und senken das Risiko von Herz-Kreislauf-Erkrankungen.`,
          musterloesungVi: `Nhóm 1: Quả mọng (Beerenobst) — ví dụ: dâu tây, mâm xôi.
Nhóm 2: Quả có lõi hạt (Kernobst) — ví dụ: táo, lê (hoặc Steinobst: mận, đào).
„5 am Tag”: Ăn 5 phần trái cây và rau củ mỗi ngày giúp cung cấp vitamin thiết yếu, khoáng chất và chất xơ, tăng đề kháng và phòng ngừa bệnh tim mạch.`,
          explanation: {
            whyCorrect: `Phân loại trái cây theo thực vật học và dinh dưỡng học chuẩn Warenkunde. Chiến dịch '5 am Tag' do DGE (Hiệp hội Dinh dưỡng Đức) khởi xướng.`,
            whyWrong: `❌ Lỗi: Chỉ kể tên hoa quả mà không nêu được tên Nhóm (Obstgruppe) như Beerenobst, Kernobst, Steinobst, Südfrüchte.`,
            keyTakeaway: `Nhớ nhóm: Beerenobst (quả mọng), Kernobst (táo lê), Steinobst (đào mận) + 5 am Tag = Vitamin & Ballaststoffe.`
          }
        },
        {
          id: "q2_1",
          no: "2.1",
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
          musterloesungVi: `Systemgastronomie: Mô hình nhà hàng chuỗi với quy trình vận hành, món ăn và thương hiệu được chuẩn hóa đồng bộ tại mọi chi nhánh — chất lượng đồng đều ở khắp nơi.
Quickservice: Phục vụ cực nhanh, thường khách tự gọi tại quầy, menu tinh gọn (ví dụ McDonald's).
Fullservice: Phục vụ đầy đủ tại bàn, nhân viên bưng bê, trải nghiệm ăn uống chậm rãi (ví dụ Block House, L'Osteria).`,
          explanation: {
            whyCorrect: `Khái niệm then chốt của LF9. Điểm cốt lõi của Systemgastronomie là tính 'chuẩn hóa' (Standardisierung). Quick vs Full khác nhau ở mức độ dịch vụ tại bàn.`,
            whyWrong: `❌ Lỗi: Chỉ định nghĩa 'là chuỗi đồ ăn nhanh' — sai bản chất, vì Fullservice vẫn có thể là Systemgastronomie (như chuỗi Vapiano, Block House).`,
            keyTakeaway: `Systemgastronomie = Standardisierung (Quy trình chuẩn hóa). Quick = Quầy (Counter). Full = Tận bàn (Tischservice).`
          }
        },
        {
          id: "q2_2",
          no: "2.2",
          points: 6,
          title: "3 Zahlungsmöglichkeiten (Vorteile & Nachteile)",
          questionDe: "Nennen Sie 3 Zahlungsmöglichkeiten und jeweils 1 Vorteil und 1 Nachteil aus Sicht des Betriebs.",
          questionVi: "Nêu 3 phương thức thanh toán kèm 1 ưu điểm và 1 nhược điểm của mỗi loại dưới góc độ của nhà hàng.",
          placeholderDe: "1. Zahlungsart: ... | Vorteil: ... | Nachteil: ...\n2. Zahlungsart: ... | Vorteil: ... | Nachteil: ...\n3. Zahlungsart: ... | Vorteil: ... | Nachteil: ...",
          keywords: [
            { term: "Barzahlung", points: 2.0, vi: "Tiền mặt: không phí, tức thì - rủi ro trộm, đếm sai", alt: ["Bargeld"] },
            { term: "Karte", points: 2.0, vi: "Thẻ ngân hàng: an toàn, vệ sinh - mất phí giao dịch, cần mạng", alt: ["Kreditkarte", "Debitkarte", "EC-Karte"] },
            { term: "Mobile Payment", points: 2.0, vi: "Thanh toán ĐT/NFC: cực nhanh - phụ thuộc thiết bị/pin", alt: ["Apple Pay", "Google Pay", "kontaktlos"] }
          ],
          musterloesungDe: `1. Barzahlung (Tiền mặt):
- Vorteil: Sofortige Liquidität, keine Transaktionsgebühren, anonym.
- Nachteil: Diebstahlrisiko, Falschgeldrisiko, Zählfehler, Aufwand beim Bankeinzahlen.

2. Kartenzahlung (Thẻ Debit/Kredit):
- Vorteil: Schnelle Abwicklung, hygienisch, hohe Sicherheit gegen Diebstahl.
- Nachteil: Transaktions- und Terminalgebühren, technische Abhängigkeit von Strom und Internet.

3. Mobile Payment (Apple Pay, Google Pay / NFC):
- Vorteil: Sehr schnell, kontaktlos, kundenfreundlich besonders für jüngere Zielgruppen.
- Nachteil: Terminalgebühren, Smartphone/Akku des Gastes erforderlich.`,
          musterloesungVi: `1. Tiền mặt (Barzahlung):
- Ưu điểm: Tiền vào túi ngay, không mất phí quẹt thẻ.
- Nhược điểm: Nguy cơ mất trộm, đếm nhầm tiền thối, tốn công nộp ngân hàng.

2. Thẻ ngân hàng (Kartenzahlung):
- Ưu điểm: Nhanh, sạch sẽ hợp vệ sinh, không sợ trộm két.
- Nhược điểm: Mất phí phần trăm cho ngân hàng, phụ thuộc đường truyền internet.

3. Thanh toán di động (Mobile Payment):
- Ưu điểm: Chạm là xong, tiện lợi hiện đại.
- Nhược điểm: Vẫn mất phí thiết bị, phụ thuộc pin điện thoại của khách.`,
          explanation: {
            whyCorrect: `Đề thi LF9 luôn kiểm tra khả năng so sánh ưu/nhược điểm thực tế trong quản lý thu ngân nhà hàng.`,
            whyWrong: `❌ Lỗi: Nêu góc nhìn của khách hàng (ví dụ: 'khách không phải mang ví') thay vì góc nhìn của Doanh nghiệp (Betrieb).`,
            keyTakeaway: `Góc nhìn nhà hàng: Barzahlung = Keine Gebühren (nhưng dễ mất trộm); Karte/NFC = Hygienisch/Sicher (nhưng tốn Gebühren).`
          }
        },
        {
          id: "q2_3",
          no: "2.3",
          points: 4,
          title: "Belegausgabepflicht & Pflichtangaben",
          questionDe: "Erläutern Sie die Belegausgabepflicht (seit wann gilt sie, bei welcher Kassenart) und nennen Sie 4 Pflichtangaben auf dem Beleg.",
          questionVi: "Giải thích nghĩa vụ xuất biên lai (áp dụng từ khi nào, với loại máy thu ngân nào) và nêu 4 thông tin bắt buộc phải có trên biên lai.",
          placeholderDe: "Gültig seit: ... | Kassenart: ...\n4 Pflichtangaben:\n- ...\n- ...\n- ...\n- ...",
          keywords: [
            { term: "2020", points: 1.0, vi: "Bắt buộc từ 01.01.2020", alt: ["01.01.2020"] },
            { term: "elektronisch", points: 1.0, vi: "Máy tính tiền điện tử có TSE", alt: ["Kassensystem", "TSE", "elektronische Kasse"] },
            { term: "Name", points: 0.5, vi: "Tên & địa chỉ nhà hàng", alt: ["Anschrift", "Betrieb"] },
            { term: "Datum", points: 0.5, vi: "Ngày và giờ xuất", alt: ["Uhrzeit", "Zeit"] },
            { term: "Menge", points: 0.5, vi: "Tên món, số lượng, giá tiền", alt: ["Leistung", "Betrag", "Preis"] },
            { term: "Steuersatz", points: 0.5, vi: "Thuế suất USt và mã giao dịch TSE", alt: ["MwSt", "USt", "Transaktionsnummer", "Seriennummer"] }
          ],
          musterloesungDe: `Belegausgabepflicht: Gilt seit dem 01.01.2020 für alle elektronischen Aufzeichnungssysteme (Kassensysteme mit TSE). Für jeden Geschäftsvorfall muss ein Beleg erstellt và dem Kunden angeboten werden (Mitnahmepflicht gibt es für den Kunden nicht).

4 Pflichtangaben trên biên lai:
1. Vollständiger Name und Anschrift des Betriebs.
2. Datum và Uhrzeit der Belegausstellung.
3. Menge và handelsübliche Bezeichnung der gelieferten Gegenstände / Leistungen.
4. Entgelt và darauf entfallender Steuerbetrag / Steuersatz (7 % oder 19 %) sowie Transaktionsnummer / Seriennummer der TSE.`,
          musterloesungVi: `Nghĩa vụ xuất hóa đơn: Áp dụng từ 01/01/2020 cho tất cả máy tính tiền điện tử (hệ thống có chip bảo mật TSE). Phải in hoặc xuất hóa đơn điện tử cho khách (khách không bắt buộc phải cầm về).

4 thông tin bắt buộc:
1. Tên đầy đủ và địa chỉ của nhà hàng/doanh nghiệp.
2. Ngày và giờ in hóa đơn.
3. Tên món, số lượng và thành tiền.
4. Thuế suất (7% hoặc 19%), số tiền thuế và mã giao dịch chứng thực TSE.`,
          explanation: {
            whyCorrect: `Theo Luật chống thao túng máy thu ngân (Kassensicherungsverordnung - KassenSichV). Khách không cầm hóa đơn về không phạt, nhưng nhà hàng không in/không xuất là vi phạm pháp luật tài chính.`,
            whyWrong: `❌ Lỗi: Ghi sai ngày áp dụng (phải là 01.01.2020) hoặc nhầm tưởng rằng khách bắt buộc phải cầm hóa đơn về (khách được quyền từ chối cầm).`,
            keyTakeaway: `01.01.2020 + Elektronische Kasse + 4 Angaben: Name/Ort · Datum/Zeit · Speise/Preis · Steuersatz/TSE.`
          }
        },
        {
          id: "q2_4",
          no: "2.4",
          points: 3,
          title: "Trinkgeld (Tiền boa trong Gastronomie)",
          questionDe: "Formulieren Sie einen kurzen Informationstext für Ihren neuen Azubi-Kollegen zum Thema Trinkgeld (üblicher Prozentsatz, Pflicht?, steuerfrei?).",
          questionVi: "Soạn một đoạn văn ngắn hướng dẫn bạn học việc mới về Tiền boa (tỷ lệ phần trăm phổ biến, có bắt buộc không, có được miễn thuế không).",
          placeholderDe: "Trinkgeld-Info:\n- Üblicher Prozentsatz: ...\n- Pflicht?: ...\n- Steuerfrei?: ...",
          keywords: [
            { term: "5-10", points: 1.0, vi: "Tỷ lệ thông thường: 5% đến 10%", alt: ["5–10%", "5 bis 10%", "10%"] },
            { term: "freiwillig", points: 1.0, vi: "Không bắt buộc / Tự nguyện", alt: ["keine Pflicht", "nicht verpflichtend"] },
            { term: "steuerfrei", points: 1.0, vi: "Miễn thuế thu nhập khi nhận trực tiếp", alt: ["keine Steuer", "Steuerfreiheit"] }
          ],
          musterloesungDe: `Trinkgeld ist eine freiwillige Anerkennung des Gastes für guten Service và keine gesetzliche Pflicht. In Deutschland sind 5 bis 10 % des Rechnungsbetrags üblich. Wird das Trinkgeld direkt vom Gast an das Servicepersonal übergeben, ist es nach § 3 Nr. 51 EStG vollständig steuer- và sozialversicherungsfrei.`,
          musterloesungVi: `Tiền boa là khoản tiền tự nguyện của khách nhằm cảm ơn thái độ phục vụ tốt, hoàn toàn không bắt buộc. Ở Đức thông thường từ 5% đến 10% giá trị hóa đơn. Khi nhân viên nhận trực tiếp từ tay khách, khoản tiền này được miễn thuế thu nhập và bảo hiểm 100% theo điều § 3 Nr. 51 Luật Thuế Thu nhập Đức.`,
          explanation: {
            whyCorrect: `Quy định tại § 3 Nr. 51 EStG (Einkommensteuergesetz). Lưu ý quan trọng: Chỉ miễn thuế khi tiền boa được khách tự nguyện trao trực tiếp cho nhân viên làm thuê (Arbeitnehmer). Nếu chủ quán (Inhaber) nhận thì vẫn phải tính thuế.`,
            whyWrong: `❌ Lỗi: Nói rằng tiền boa luôn luôn phải đóng thuế, hoặc nhầm tưởng tiền boa là bắt buộc như ở một số quốc gia tính phí phục vụ cứng vào bill.`,
            keyTakeaway: `Trinkgeld: 5–10 % · Freiwillig (không ép) · Steuerfrei für Personal (miễn thuế cho nhân viên).`
          }
        }
      ]
    }
  };

  global.ARENA_DATA = {
    EXAMS: ARENA_EXAMS,
    getExam: function(id){ return ARENA_EXAMS[id] || null; },
    listExams: function(){
      return Object.keys(ARENA_EXAMS).map(k => ({
        id: k,
        title: ARENA_EXAMS[k].title,
        subtitle: ARENA_EXAMS[k].subtitle,
        badge: ARENA_EXAMS[k].badge,
        points: ARENA_EXAMS[k].totalPoints,
        questionsCount: ARENA_EXAMS[k].questions.length,
        defaultMinutes: ARENA_EXAMS[k].defaultMinutes
      }));
    }
  };
})(typeof window !== 'undefined' ? window : globalThis);
