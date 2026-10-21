/* ============================================================
   arena-data.js  —  Bộ ngân hàng đề thi tự luận chuẩn cho Arena
   Hỗ trợ 2 chế độ:
   1. Luyện theo Lernfeld (LF2, LF3, LF6, LF9, LF Fleisch, GK...)
   2. Đề thi tốt nghiệp thật IHK (Abschlussprüfung Sommer 2024, Winter 2023/24, KA3, KA4...)
   ============================================================ */
(function(global){
  "use strict";

  // Ngân hàng câu hỏi tự luận theo từng Lernfeld (LF-Bank)
  const LF_BANK = {
    // ═══ LF6: GERICHTE, MENÜS & PRODUKTE ANBIETEN ═══
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
      }
    ],

    // ═══ LF9: ZAHLUNGEN MIT DEM GAST ABWICKELN ═══
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
      }
    ],

    // ═══ LF2: GÜTER ANNEHMEN, LAGERN UND VORBEREITEN ═══
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
1. Farbcodierte Schneidebretter und Messer verwenden (z. B. Rot für rohes Fleisch, Gelb für Geflügel, Grün für Gemüse).
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
      }
    ],

    // ═══ LF3: GÄSTE EMPFANGEN UND BERATEN ═══
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
      }
    ],

    // ═══ BFK-2 / KÜCHE & WARENKUNDE (FLEISCH & GARMETHODEN) ═══
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
      }
    ],

    // ═══ GEMEINSCHAFTSKUNDE (GK) ═══
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
      }
    ]
  };

  // Ngân hàng các bộ đề thi tốt nghiệp IHK thật (Abschlussprüfungen)
  const IHK_EXAMS = {
    "ihk-sommer-2024": {
      id: "ihk-sommer-2024",
      code: "IHK S24",
      type: "abschluss",
      title: "Abschlussprüfung Sommer 2024",
      subtitle: "Fachkraft für Gastronomie · Muttertagsbuffet & Kasse",
      badge: "IHK · Sommer 2024",
      totalPoints: 100,
      defaultMinutes: 60,
      situation: `Am 12. Mai 2024 richtet das Hotel-Restaurant „Sonnenblick\" ein großes Muttertagsbuffet für 80 angemeldete Gäste aus. Sie sind als Fachkraft für Gastronomie für den Ablauf, das Mise en place, die Gästebetreuung, die Abrechnung und die Hygiene verantwortlich.`,
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
            whyCorrect: `Theo Luật Thuế Giá trị Gia tăng Đức (UStG): Món ăn phục vụ tại chỗ tính 7% (theo quy định mới), đồ uống tính 19%.`,
            whyWrong: `❌ Bẫy toán học: Lấy Brutto nhân trực tiếp với 7% (sai hoàn toàn!). Công thức đúng: Netto = Brutto ÷ 1,07.`,
            keyTakeaway: `Chia 1,07 để ra Netto đồ ăn · Chia 1,19 để ra Netto đồ uống · Trừ ra số thuế.`
          }
        },
        {
          id: "s24_q3",
          no: "2.1",
          points: 20,
          title: "Allergenberatung beim Buffet",
          questionDe: "Ein Gast meldet sich vor Beginn des Essens: Er leidet unter Zöliakie und seine Tochter hat eine schwere Erdnussallergie. Welche 3 Schutzmaßnahmen treffen Sie bei der Speisenausgabe?",
          questionVi: "Một vị khách báo trước bữa ăn: Anh ấy bị bệnh Celiac (dị ứng gluten) và con gái bị dị ứng lạc nặng. Bạn thực hiện 3 biện pháp an toàn nào khi phục vụ tại quầy buffet?",
          placeholderDe: "1. Maßnahme: ...\n2. Maßnahme: ...\n3. Maßnahme: ...",
          keywords: [
            { term: "Allergenkarte", points: 7.0, vi: "Cung cấp bảng tra cứu 14 chất dị ứng / chỉ rõ món không có gluten và đậu phộng", alt: ["Dokumentation", "Kennzeichnung"] },
            { term: "Vorlegebesteck", points: 7.0, vi: "Dụng cụ gắp riêng biệt tuyệt đối, không dùng chung chống lây chéo", alt: ["Besteck", "Zange", "Löffel"] },
            { term: "Küche", points: 6.0, vi: "Báo bếp làm riêng suất ăn từ trong bếp ra đĩa kín", alt: ["separat", "Teller"] }
          ],
          musterloesungDe: `1. Einsicht in den Allergenordner gewähren und die geeigneten Speisen persönlich am Buffet zeigen.
2. Strikt getrenntes Vorlegebesteck für jedes Gericht bereitstellen und Gäste bitten, dieses nicht zu vertauschen.
3. Im Zweifel für den Gast eine sichere Portion direkt frisch aus der Küche zubereiten lassen (Verhinderung von Kontamination durch andere Gäste am Buffet).`,
          musterloesungVi: `1. Cho khách xem sổ tra cứu dị ứng và đích thân chỉ các món ăn an toàn.
2. Bố trí kẹp gắp riêng cho từng khay đồ ăn để tránh lây nhiễm chéo.
3. Lấy phần ăn riêng trực tiếp từ bếp ra đĩa cho khách để đảm bảo tuyệt đối an toàn.`,
          explanation: {
            whyCorrect: `Sốc phản vệ (anaphylaktischer Schock) có thể gây nguy hiểm tính mạng; nhân viên nhà hàng chịu trách nhiệm pháp lý.`,
            whyWrong: `❌ Bẫy: Nói qua loa 'chắc không sao đâu' mà không đối chiếu sổ thành phần nguyên liệu.`,
            keyTakeaway: `Tra sổ dị ứng → Kẹp gắp riêng biệt → Chuẩn bị đĩa riêng từ bếp.`
          }
        },
        {
          id: "s24_q4",
          no: "2.2",
          points: 20,
          title: "Reklamation während des Buffets",
          questionDe: "Eine Gästegruppe beschwert sich lautstark: Das Roastbeef am Buffet sei zäh und vollkommen kalt. Wie reagieren Sie professionell (4 Schritte nach Deeskalation)?",
          questionVi: "Một nhóm khách phàn nàn gay gắt: Món Roastbeef tại quầy buffet dai ngoách và nguội ngắt. Bạn xử lý chuyên nghiệp như thế nào (4 bước giảm xung đột)?",
          placeholderDe: "1. Schritt: ...\n2. Schritt: ...\n3. Schritt: ...\n4. Schritt: ...",
          keywords: [
            { term: "ruhig", points: 5.0, vi: "Bình tĩnh lắng nghe, tách khách ra góc riêng nói chuyện", alt: ["ausreden", "Verständnis"] },
            { term: "entschuldigen", points: 5.0, vi: "Chân thành xin lỗi vì sự bất tiện", alt: ["Bedauern", "Entschuldigung"] },
            { term: "austauschen", points: 5.0, vi: "Kiểm tra khay giữ nhiệt, thay ngay khay thịt nóng mới", alt: ["neu", "Chafing Dish", "Küche"] },
            { term: "Wiedergutmachung", points: 5.0, vi: "Mời đồ uống đền bù (cà phê/rượu tiêu vị) và kiểm tra lại", alt: ["Getränk", "Kaffee", "Espresso"] }
          ],
          musterloesungDe: `1. Ruhe bewahren und aktiv zuhören: Gast ausreden lassen, Verständnis zeigen und nicht vor anderen Gästen diskutieren.
2. Aufrichtige Entschuldigung für die Unannehmlichkeit im Namen des Hauses aussprechen.
3. Sofortige Problemlösung: Den Chafing Dish prüfen (Brennpaste ausgegangen?) und unverzüglich eine frische, heiße Platte Roastbeef aus der Küche bringen.
4. Geste der Aufmerksamkeit: Den Gästen einen Kaffee oder Digestif aufs Haus anbieten und später persönlich nachfragen.`,
          musterloesungVi: `1. Giữ bình tĩnh, lắng nghe chăm chú, kéo khách tránh xa khu đông người.
2. Xin lỗi chân thành thay mặt nhà hàng.
3. Giải quyết ngay: Kiểm tra cồn giữ nhiệt, mang ngay khay thịt nóng sốt mới từ bếp ra.
4. Đền bù chu đáo: Mời cà phê hoặc rượu digestif, sau đó quay lại hỏi thăm sự hài lòng.`,
          explanation: {
            whyCorrect: `Kỹ năng xử lý tình huống giao tiếp (Kommunikationskompetenz) trọng tâm của kỳ thi IHK.`,
            whyWrong: `❌ Bẫy: Tranh cãi tay đôi hoặc bảo khách 'buffet nó phải thế'.`,
            keyTakeaway: `Lắng nghe → Xin lỗi → Đổi món nóng ngay → Mời cà phê đền bù.`
          }
        },
        {
          id: "s24_q5",
          no: "3.1",
          points: 20,
          title: "Nachhaltigkeit & Abfallvermeidung nach dem Buffet",
          questionDe: "Nach dem Muttertagsbuffet sind größere Mengen an Speisen übriggeblieben. Nennen Sie 4 Maßnahmen zur Vermeidung von Lebensmittelverschwendung und umweltgerechten Entsorgung.",
          questionVi: "Sau tiệc buffet còn thừa lượng lớn món ăn. Nêu 4 biện pháp chống lãng phí thực phẩm và xử lý rác thải thân thiện môi trường.",
          placeholderDe: "1. Maßnahme: ...\n2. Maßnahme: ...\n3. Maßnahme: ...\n4. Maßnahme: ...",
          keywords: [
            { term: "Personalessen", points: 5.0, vi: "Món chưa bày ra buffet dùng cho cơm nhân viên trong ngày", alt: ["Mitarbeiter", "Küche"] },
            { term: "Weiterverarbeitung", points: 5.0, vi: "Tái chế biến an toàn hợp chuẩn HACCP (nấu súp, nhân bánh)", alt: ["Suppen", "Kroketten"] },
            { term: "Too Good To Go", points: 5.0, vi: "Bán túi giải cứu đồ ăn qua app hoặc chia sẻ cho tổ chức từ thiện Tafel", alt: ["Tafel", "Spende", "App"] },
            { term: "Speiserestebehälter", points: 5.0, vi: "Thức ăn thừa trên đĩa khách gom vào thùng rác hữu cơ biogas riêng (không đổ vào rác sinh hoạt)", alt: ["Biotonne", "Biogas", "Speisereste"] }
          ],
          musterloesungDe: `1. Weiterverwendung im Betrieb: Unberührte, gekühlte Speisen aus der Küche zeitnah fürs Mitarbeiteressen verwenden.
2. HACCP-konforme Weiterverarbeitung: Geeignete Reste (z. B. Gemüse, Braten) zu Suppen, Fonds oder Füllungen weiterverarbeiten.
3. Abgabe an Dritte: Teilnahme an Plattformen wie „Too Good To Go\" oder Kooperation mit der lokalen Tafel.
4. Fachgerechte Entsorgung: Unvermeidbare Speisereste getrennt in zertifizierten Speiserestebehältern sammeln (Biogaserzeugung), Altspeisefett gesondert recyceln.`,
          musterloesungVi: `1. Đồ trong bếp chưa bày ra: Dùng cho cơm nhân viên trong ngày.
2. Tái chế biến hợp chuẩn: Nấu súp, nước dùng hoặc làm nhân món khác.
3. Chia sẻ: Bán túi giải cứu thực phẩm qua Too Good To Go hoặc quyên góp Tafel.
4. Phân loại rác: Thức ăn thừa thu gom vào thùng riêng để làm khí sinh học biogas, dầu mỡ cũ tái chế riêng.`,
          explanation: {
            whyCorrect: `Tiêu chí bảo vệ môi trường và phát triển bền vững (Umweltschutz & Nachhaltigkeit) bắt buộc trong quy chế đào tạo GastroAusbV 2022.`,
            whyWrong: `❌ Bẫy: Lấy đồ ăn thừa trên đĩa của khách mang bán lại hoặc vứt lẫn dầu ăn vào cống thoát nước.`,
            keyTakeaway: `Cơm nhân viên → Nấu súp → Too Good To Go → Thùng rác hữu cơ Biogas.`
          }
        }
      ]
    },

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
            { term: "Vorspeise", points: 6.0, vi: "Món khai vị nhẹ (Feldsalat, Terrine) kèm vang trắng (Riesling, Weißburgunder)", alt: ["Salat", "Riesling"] },
            { term: "Suppe", points: 6.0, vi: "Súp đậm đà (Maronensuppe, Wildkraftbrühe)", alt: ["Maronen", "Kraftbrühe"] },
            { term: "Gänsebraten", points: 7.0, vi: "Món chính ngỗng quay (Gänsebraten với bắp cải đỏ và bánh bao khoai tây Knödel) kèm vang đỏ đậm (Spätburgunder)", alt: ["Rotkohl", "Knödel", "Spätburgunder", "Rotwein"] },
            { term: "Dessert", points: 6.0, vi: "Tráng miệng (Bratapfel, Lebkuchen-Mousse) kèm rượu ngọt (Eiswein, Portwein)", alt: ["Bratapfel", "Eiswein"] }
          ],
          musterloesungDe: `1. Vorspeise: Feldsalat mit gerösteten Walnüssen und Granatapfelkernen – Wein: Trockener Weißburgunder aus Baden.
2. Suppe: Cremige Maronensamtsuppe mit Croutons.
3. Hauptgang: Knuspriger Gänsebraten an Beifußsoße mit Apfelrotkohl und Kartoffelklößen – Wein: Kräftiger Spätburgunder (trocken) oder Barolo.
4. Dessert: Gefüllter Bratapfel mit Marzipan und Vanille-Zimt-Eis – Wein/Getränk: Edelsüßer Eiswein oder Dessertwein.`,
          musterloesungVi: `1. Khai vị: Salad Feldsalat hạt óc chó và lựu – Vang trắng Weißburgunder.
2. Súp: Súp kem hạt dẻ Maronen thơm bùi.
3. Món chính: Ngỗng quay da giòn sốt ngải cứu ăn kèm bắp cải đỏ táo và bánh viên khoai tây Knödel – Vang đỏ Spätburgunder đậm đà.
4. Tráng miệng: Táo nướng Bratapfel nhồi hạnh nhân kèm kem quế – Vang ngọt Eiswein.`,
          explanation: {
            whyCorrect: `Thực đơn Giáng sinh kinh điển chuẩn nghề Đức: Món ăn đi từ thanh nhẹ đến đậm đà, rượu vang kết hợp hài hòa (vang đỏ đậm đi với ngỗng quay béo ngậy).`,
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
          musterloesungDe: `Unterschied X-Bon und Z-Bon:
- X-Bon (Zwischenbericht): Zeigt den aktuellen Umsatzstand an, ohne die Kasse auf Null zurückzusetzen. Kann beliebig oft am Tag gedruckt werden.
- Z-Bon (Tagesabschluss): Finaler Tagesbericht, der den Tagesumsatz festschreibt und den Speicher auf Null setzt (nicht rückgängig machbar).
Schritte des Kassensturzes:
1. Zählen des tatsächlichen Bargelds (Münzen und Scheine) = Ist-Bestand (Zählprotokoll).
2. Abzug des Wechselgeld-Grundstocks.
3. Abgleich mit dem vom Kassensystem errechneten Soll-Bestand.
4. Festhalten und Klären eventueller Kassendifferenzen (Manko oder Überschuss).`,
          musterloesungVi: `Khác biệt:
- X-Bon: Báo cáo tạm thời kiểm tra doanh số giữa ca, không reset máy.
- Z-Bon: Báo cáo chốt sổ cuối ngày, chốt doanh số và reset máy về 0 cho ngày mới.
Các bước kiểm kê tiền (Kassensturz):
1. Đếm toàn bộ tiền mặt thực tế trong két (Ist-Bestand).
2. Trừ đi tiền vốn thối ban đầu (Wechselgeld).
3. So sánh với số liệu trên máy tính (Soll-Bestand).
4. Lập biên bản chênh lệch nếu thiếu (Manko) hoặc thừa (Überschuss).`,
          explanation: {
            whyCorrect: `Quy tắc kế toán GoBD của Cơ quan Thuế Đức (Finanzamt) bắt buộc kiểm quỹ hàng ngày đối với nhà hàng.`,
            whyWrong: `❌ Bẫy: In nhầm Z-Bon giữa ca làm đóng ca sớm của cả quán; không trừ tiền vốn thối dẫn đến tưởng thừa tiền.`,
            keyTakeaway: `X-Bon = Tạm thời · Z-Bon = Chốt ngày về 0 · Kassensturz = Đếm thực tế (Ist) trừ vốn so với máy (Soll).`
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
            { term: "8 Stunden", points: 9.0, vi: "Tối đa 8 giờ/ngày (hoặc 8,5 giờ nếu bù ngày khác), tối đa 40 giờ/tuần", alt: ["40 Stunden", "täglich"] },
            { term: "22 Uhr", points: 8.0, vi: "Trong ngành nhà hàng được làm tối đa đến 22:00 giờ tối (khi đủ 16 tuổi)", alt: ["22:00", "zehn Uhr"] },
            { term: "12 Stunden", points: 8.0, vi: "Thời gian nghỉ liên tục giữa 2 ca tối thiểu 12 tiếng", alt: ["Ruhezeit", "Freizeit"] }
          ],
          musterloesungDe: `Für den 16-jährigen Azubi gilt das Jugendarbeitsschutzgesetz (JArbSchG):
1. Tägliche Höchstarbeitszeit: Maximal 8 Stunden täglich (bzw. 8,5 Stunden bei Ausgleich) und maximal 40 Stunden in der 5-Tage-Woche.
2. Schichtzeit-Ende: Im Gaststättengewerbe dürfen Jugendliche über 16 Jahre nur bis maximal 22:00 Uhr beschäftigt werden.
3. Ununterbrochene Ruhezeit: Nach Beendigung der Schicht müssen mindestens 12 freie Stunden bis zum nächsten Dienstbeginn liegen.`,
          musterloesungVi: `Dành cho bạn 16 tuổi (Luật JArbSchG):
1. Giờ làm tối đa: 8 tiếng/ngày, tối đa 40 tiếng/tuần (tuần 5 ngày làm việc).
2. Giờ kết thúc: Ngành nhà hàng được làm muộn nhất đến 22:00 tối.
3. Nghỉ ngơi giữa ca: Tối thiểu 12 tiếng liên tục trước khi bắt đầu ca làm việc tiếp theo.`,
          explanation: {
            whyCorrect: `Bảo vệ sức khỏe cho người học nghề chưa thành niên, vi phạm bị thanh tra lao động phạt tiền rất nặng.`,
            whyWrong: `❌ Bẫy: Nhầm lẫn giờ làm của người 19 tuổi (được làm quá 22:00 và nghỉ ngơi 11 tiếng theo ArbZG) áp dụng cho bạn 16 tuổi.`,
            keyTakeaway: `Azubi < 18 tuổi: Tối đa 8h/ngày · Muộn nhất 22h · Nghỉ ca 12h.`
          }
        },
        {
          id: "w23_q4",
          no: "2.2",
          points: 25,
          title: "Serviceablauf – Wein servieren & Dekantieren",
          questionDe: "Für den Hauptgang bestellt der Chef der Firma eine Flasche gereiften Rotwein (Spätburgunder Jahrgang 2015). Beschreiben Sie die Schritte des Weinservices am Tisch inklusive Probeschluck und Dekantieren.",
          questionVi: "Khách gọi 1 chai vang đỏ lâu năm (Spätburgunder 2015). Mô tả các bước phục vụ rượu vang tại bàn bao gồm thử rượu và chiết rượu (Dekantieren).",
          placeholderDe: "1. Präsentation: ...\n2. Öffnen & Korken: ...\n3. Dekantieren: ...\n4. Probeschluck & Einschenken: ...",
          keywords: [
            { term: "Präsentieren", points: 6.0, vi: "Trình nhãn chai bên phải người đặt tiệc, đọc tên vang, nhà sản xuất, niên vụ", alt: ["Etikett", "Jahrgang"] },
            { term: "Korken", points: 6.0, vi: "Mở nút bần không tạo tiếng nổ, ngửi nút và đặt nút lên đĩa nhỏ cho khách kiểm tra", alt: ["Korkenprüfung", "Korkenzieher"] },
            { term: "Dekantieren", points: 7.0, vi: "Rót từ từ qua nến vào bình decanter để tách cặn (Depot) và cho rượu thở", alt: ["Karaffe", "Kerze", "Depot", "Belüften"] },
            { term: "Probeschluck", points: 6.0, vi: "Rót 1 ngụm thử cho người gọi nếm trước, sau khi gật đầu mới rót cho phụ nữ trước, khách trước, chủ tiệc sau cùng", alt: ["Verkosten", "Gastgeber"] }
          ],
          musterloesungDe: `1. Weinpräsentation: Flasche von rechts mit sichtbarem Etikett dem Gastgeber präsentieren (Name, Rebsorte, Jahrgang, Weingut nennen).
2. Kapsel abschneiden und Flasche öffnen: Kapsel unterhalb des Flaschenwulstes sauber abtrennen, Korken leise herausdrehen, Korken auf Fehler prüfen und auf kleinem Untersetzer beim Gast ablegen.
3. Dekantieren: Den gereiften Wein langsam über einer Kerzenflamme in eine Karaffe umfüllen, um das Bodensediment (Depot) in der Flaschenschulter zurückzuhalten.
4. Probeschluck & Service: Dem Gastgeber einen Probeschluck einschenken. Nach Freigabe zuerst den Damen, dann den Herren und zuletzt dem Gastgeber von rechts einschenken.`,
          musterloesungVi: `1. Trình chai rượu: Đứng bên tay phải, ngửa nhãn chai cho chủ tiệc xem, đọc tên rượu, giống nho và năm sản xuất.
2. Cắt vỏ bọc & mở nút: Cắt dưới gờ cổ chai, rút nút nhẹ nhàng không tạo tiếng nổ lớn, ngửi kiểm tra nút bần và đặt lên đĩa nhỏ cho khách xem.
3. Chiết rượu (Dekantieren): Rót từ từ rượu vào bình chiết trên ngọn nến để giữ lại cặn rượu (Depot) trong chai.
4. Thử rượu & rót: Rót một ngụm nhỏ cho chủ tiệc nếm. Khi chủ tiệc đồng ý, rót cho phụ nữ trước, nam giới sau, và chủ tiệc rót cuối cùng từ phía bên phải.`,
          explanation: {
            whyCorrect: `Nghiệp vụ dịch vụ rượu vang nhà hàng cao cấp (Sommelier-Standards) thường xuyên xuất hiện trong phần thi thực hành và tình huống BfK-1/LF6.`,
            whyWrong: `❌ Bẫy: Rót đầy ly ngay cho tất cả mọi người mà quên chưa mời chủ tiệc thử rượu (Probeschluck).`,
            keyTakeaway: `Trình nhãn → Mở khẽ → Soi nến chiết cặn (Dekantieren) → Khách thử → Rót phụ nữ trước, chủ tiệc sau cùng.`
          }
        }
      ]
    },

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

  // Danh mục Lernfeld hỗ trợ lọc
  const LF_CATALOG = [
    { id: "lf6", fach: "bfk1", code: "LF6", title: "LF6: Gerichte, Menüs & Produkte anbieten", count: (LF_BANK.lf6||[]).length },
    { id: "lf9", fach: "bfk1", code: "LF9", title: "LF9: Zahlungen mit dem Gast abwickeln", count: (LF_BANK.lf9||[]).length },
    { id: "lf2", fach: "bfk1", code: "LF2", title: "LF2: Güter annehmen, lagern & vorbereiten", count: (LF_BANK.lf2||[]).length },
    { id: "lf3", fach: "bfk1", code: "LF3", title: "LF3: Gäste empfangen, beraten & bedienen", count: (LF_BANK.lf3||[]).length },
    { id: "fleisch", fach: "bfk2", code: "BfK-2", title: "LF Fleisch, Garmethoden & Küche", count: (LF_BANK.fleisch||[]).length },
    { id: "gk", fach: "gk", code: "GK", title: "Wirtschafts- und Sozialkunde (GK)", count: (LF_BANK.gk||[]).length }
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
