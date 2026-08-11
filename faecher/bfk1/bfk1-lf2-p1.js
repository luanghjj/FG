/* BfK-1 · LF2 · LS01–LS02 (nguồn: sla-lf2.md) */
window.__LF2 = (window.__LF2||[]).concat([
  {
    id: "lf2-ls01",
    icon: "🔄",
    name: "LS01 · Beschaffungs- und Lagerprozesse",
    nameVi: "Quy trình mua hàng & lưu kho",
    desc: "6 bước của quy trình thu mua và lưu kho (Bedarfsermittlung → Lagerung).",
    source: "sla-lf2.md · trang 02–04",
    theory: `
<h3>Situation / Tình huống</h3>
<p>Sie sind <b>Azubi</b> im <b>Hotel Resort Aussicht Feldberg KG</b> und im <b>Zentrallager/Magazin</b> eingeteilt. Für einen <b>Kochkurs „Regionalität“</b> werden Lebensmittel und Kochschürzen benötigt. Sie helfen Kollege Sebastian bei der Beschaffung und lernen den <b>Ablauf der Warenbeschaffung und Lagerung</b> kennen.</p>
<p>→ Bạn là học viên ở khách sạn Feldberg, được phân về <b>kho trung tâm</b>. Cho lớp nấu ăn chủ đề „thực phẩm địa phương“ cần mua thực phẩm và tạp dề. Bạn giúp đồng nghiệp Sebastian nhập hàng và học <b>trình tự mua hàng + lưu kho</b>.</p>

<div class="note">⚠️ <b>HỌC THUỘC – Prozess der Warenbeschaffung und Lagerung (6 Schritte)</b></div>
<table>
<tr><th>#</th><th>Schritt</th><th>Nghĩa Việt</th><th>Kernpunkte</th></tr>
<tr><td>1</td><td><b>Bedarfsermittlung</b></td><td>Xác định nhu cầu</td><td>welche Ware, wann, welche Menge</td></tr>
<tr><td>2</td><td><b>Bestandskontrolle</b></td><td>Kiểm tra tồn kho</td><td>Lagerbestand ↔ künftiger Bedarf, <b>Lagerkennzahlen</b> → Bestellmenge</td></tr>
<tr><td>3</td><td><b>Lieferantenauswahl</b></td><td>Chọn nhà cung cấp</td><td>Anfragen · Angebote einholen · <b>vergleichen</b> · bestes Angebot annehmen</td></tr>
<tr><td>4</td><td><b>Bestellung</b></td><td>Đặt hàng</td><td>Qualität, Art, Menge, Preis + Zahlungs-/Lieferbedingungen</td></tr>
<tr><td>5</td><td><b>Warenannahme</b></td><td>Nhận hàng</td><td>Verpackung/Schäden · Menge, Qualität, Temperatur, MHD · Lieferschein ↔ Bestellung</td></tr>
<tr><td>6</td><td><b>Einlagerung + Lagerung</b></td><td>Nhập kho + lưu kho</td><td>schnell einlagern · Lagertemperatur & Luftfeuchte · passende <b>Lagerart</b> · Überwachung (Temperatur, Gerüche, Mikroorganismen, Sauberkeit, Haltbarkeit)</td></tr>
</table>

<p>💡 Bản viết tay (trang 04) tách bước 4/5 và 6/7 → thành 7 ô: Bedarfsermittlung · Lieferantenauswahl & Angebotsvergleich · Bestellung · Warenannahme · Wareneingangskontrolle · Einlagerung · Lagerung und Bestandskontrolle. Nội dung như 6 bước, chỉ chia nhỏ hơn.</p>
<p><b>FIFO</b> („first in – first out“) = hàng nhập trước dùng trước — nguyên tắc khi einlagern.</p>
`,
    qa: [
      { q: "Welche Ziele werden mit einem Warenwirtschaftssystem verfolgt?", qVi: "Hệ thống quản lý hàng hóa (Warenwirtschaftssystem) nhằm mục tiêu gì?", a: "Optimierung des Sortiments, Überwachung der Bestände und Überwachung der Lagerkosten. NICHT: Optimierung der Einkommenssteuer.", aVi: "Tối ưu danh mục hàng, giám sát tồn kho và chi phí lưu kho. KHÔNG phải tối ưu thuế thu nhập.", why: "Warenwirtschaftssystem điều phối cả quy trình mua–lưu–bán, đúng tinh thần 6 bước của LS01.", src: "fk_exel · Aufgabe Thema 14 · Frage 12" },
      { q: "Was ist der Zweck der Inventur?", qVi: "Mục đích của kiểm kê (Inventur) là gì?", a: "Sie ist eine wichtige Grundlage für den Jahresabschluss eines Unternehmens.", aVi: "Là cơ sở quan trọng để lập báo cáo tài chính cuối năm (Jahresabschluss).", why: "Inventur = bước Bestandskontrolle trong quy trình; xác định giá trị tồn kho thực tế.", src: "fk_exel · Aufgabe Thema 14 · Frage 13" },
      { q: "Bringen Sie die Arbeitsschritte einer Inventur in die richtige Reihenfolge.", qVi: "Sắp xếp các bước kiểm kê (Inventur) theo đúng thứ tự.", a: "1) Zählen/Messen/Wiegen 2) Inventurbelege erstellen 3) an Mitarbeiter verteilen 4) Ergebnisse eintragen 5) Bestandskorrekturen bei Differenzen 6) im Warenwirtschaftsprogramm speichern.", aVi: "1) Đếm/đo/cân 2) Lập biên bản kiểm kê 3) Phân cho nhân viên 4) Ghi kết quả 5) Chỉnh sai lệch 6) Lưu vào hệ thống.", why: "Trình tự chuẩn của bước Warenbestand erfassen.", src: "fk_exel · Aufgabe Thema 14 · Frage 14" },
      { q: "Wie hoch darf die Temperatur in Tiefkühlräumen höchstens sein?", qVi: "Nhiệt độ tối đa trong kho đông (Tiefkühlraum)?", a: "höchstens −18 °C.", aVi: "Tối đa −18 °C.", why: "Chuẩn HACCP bắt buộc khi einlagern ở bước 6 của quy trình.", src: "fk_exel · Aufgabe Thema 14 · Frage 8" }
    ],
    qaNote: "Nguồn: fk_exel Aufgabe Thema 14 (Warenwirtschaft I) — khớp quy trình tổng LS01.",
    quiz: [
      { q: "Welcher Schritt steht am Anfang des Beschaffungsprozesses?", options: ["Bestellung", "Bedarfsermittlung", "Warenannahme", "Einlagerung"], answer: 1, explain: "Zuerst wird ermittelt, welche Ware wann und in welcher Menge gebraucht wird." },
      { q: "Wobei helfen die Lagerkennzahlen?", options: ["Bei der Bestandskontrolle / Bestellmenge", "Beim Kochen", "Bei der Reklamation", "Beim Servieren"], answer: 0, explain: "Bestandskontrolle: aktueller Bestand ↔ Bedarf → über Lagerkennzahlen die Bestellmenge bestimmen." },
      { q: "Was gehört NICHT in eine korrekte Bestellung?", options: ["Qualität", "Menge", "Name des Gastes", "Preis"], answer: 2, explain: "Bestellung: Qualität, Art, Menge, Preis + Liefer-/Zahlungsbedingungen. Der Gast spielt hier keine Rolle." },
      { q: "Was bedeutet FIFO?", options: ["First in – first out", "Fast in – fast out", "Frisch immer frisch other", "Fisch in – Fisch out"], answer: 0, explain: "First in – first out: zuerst eingelagerte Ware zuerst verbrauchen → vermeidet Verderb." },
      { q: "Warum lohnt sich der Angebotsvergleich?", options: ["Spart Geld + beste Qualität", "Ist gesetzlich verboten", "Nur bei Getränken nötig", "Verlängert die Lieferzeit"], answer: 0, explain: "Anfragen an mehrere Lieferanten → Angebote vergleichen → Geld sparen und beste Qualität einkaufen." }
    ],
    vokabeln: [
      { de: "die Beschaffung", vi: "việc thu mua / cung ứng" },
      { de: "die Bedarfsermittlung", vi: "xác định nhu cầu" },
      { de: "die Bestandskontrolle", vi: "kiểm tra tồn kho" },
      { de: "der Lagerbestand", vi: "lượng tồn kho" },
      { de: "die Lagerkennzahl", vi: "chỉ số kho" },
      { de: "der Lieferant", vi: "nhà cung cấp" },
      { de: "die Anfrage", vi: "thư hỏi hàng" },
      { de: "das Angebot einholen", vi: "thu thập báo giá" },
      { de: "vergleichen", vi: "so sánh" },
      { de: "die Bestellung", vi: "đơn đặt hàng" },
      { de: "die Warenannahme", vi: "việc nhận hàng" },
      { de: "der Lieferschein", vi: "phiếu giao hàng" },
      { de: "die Mindesthaltbarkeit (MHD)", vi: "hạn dùng tối thiểu" },
      { de: "einlagern", vi: "nhập kho" },
      { de: "FIFO (first in – first out)", vi: "hàng nhập trước dùng trước" }
    ]
  },
  {
    id: "lf2-ls02",
    icon: "🧊",
    name: "LS02 · Waren- und Lagerarten, Funktion des Lagers",
    nameVi: "Loại kho & chức năng kho",
    desc: "3 điều kiện bảo quản, 4 loại kho + nhiệt độ, xếp 28 mặt hàng, 8 chức năng của kho.",
    source: "sla-lf2.md · trang 05–08 · KT „Nhiệt độ bảo quản“",
    theory: `
<h3>A. Lagerbedingungen / 3 điều kiện bảo quản ⚠️</h3>
<div class="note">⚠️ <b>HỌC THUỘC – 3 Lagerbedingungen:</b>
<ul>
<li><b>1. Lagertemperatur</b> – wichtig bei leicht verderblichen LM (Mikrobenvermehrung ∝ Temperatur). Gesetzliche Höchsttemperaturen z. B. Hackfleisch, Frischmilch. Aber: <b>Tomaten, Ananas, Banane</b> → NICHT in normale Kühlräume (kälteempfindlich). → Nhiệt độ: quan trọng với hàng dễ hỏng; cà chua/dứa/chuối không để kho lạnh thường.</li>
<li><b>2. Luftfeuchtigkeit</b> – zu niedrig → Salate welk; zu hoch → Brot verliert Frische, Puderzucker klumpt, Schimmel. → Độ ẩm: quá thấp rau héo, quá cao mốc.</li>
<li><b>3. Hygiene</b> – Erdreich/Fische sind Keimträger → <b>reine und unreine Produkte getrennt lagern</b>. → Vệ sinh: tách hàng sạch ↔ chưa sạch.</li>
</ul></div>

<h3>B. Lagerarten / Các loại kho ⚠️</h3>
<table>
<tr><th>Lagerart</th><th>Temperatur</th><th>Luftfeuchte</th><th>Besonderheiten</th></tr>
<tr><td><b>Magazin / Trockenlager</b> (kho khô)</td><td>12–15 °C</td><td>max. 50 %</td><td>trocken und dunkel</td></tr>
<tr><td><b>Kühlräume</b> (kho mát)</td><td>0–8 °C je Produkt</td><td>60–90 %</td><td>Luftzirkulation; rein/unrein getrennt</td></tr>
<tr><td><b>Tiefkühlräume</b> (kho đông)</td><td>max. −18 °C</td><td>–</td><td>alles verpackt (Frostbrand); Gruppen-Trennung nicht nötig</td></tr>
<tr><td><b>Non-Food-Lager</b></td><td>keine regulierte Temp.</td><td>–</td><td>trocken und dunkel</td></tr>
</table>

<div class="note">⚠️ <b>Kühlräume – Trennung nach Produkt (nhớ số!):</b>
<ul>
<li>Gemüse und Obst: <b>+6 bis +8 °C</b></li>
<li>Milch und Milcherzeugnisse: <b>ca. +8 °C</b> (verpackt/offen getrennt)</li>
<li>Frischfleisch, Wild und Geflügel: <b>+4 °C</b></li>
<li>Fische, ganze Tiere, Krebs-/Weichtiere: <b>0 °C</b>, zwischen Eis</li>
</ul></div>

<h3>Zuordnung der Waren / Xếp hàng vào kho ⚠️</h3>
<table>
<tr><th>Lagerart</th><th>Waren</th></tr>
<tr><td><b>Trockenlager</b> (12–15 °C)</td><td>Weizenmehl, Reis, Hülsenfrüchte, Gemüsekonserven, Kartoffeln, Brot, <b>Tomaten</b>, Flaschenwein</td></tr>
<tr><td><b>Kühl: Obst/Gemüse</b> (+6–8 °C)</td><td>Heidelbeeren, Kopfsalat, Spinat</td></tr>
<tr><td><b>Kühl: Milch</b> (+8 °C)</td><td>Käse, Hühnereier, geöffnete Saftflasche</td></tr>
<tr><td><b>Kühl: Fleisch</b> (+4 °C)</td><td>Schweineschnitzel, gegarter Fleischkäse (rein/unrein getrennt)</td></tr>
<tr><td><b>Kühl: Fisch</b> (0 °C)</td><td>Frische Forellen</td></tr>
<tr><td><b>Tiefkühl</b> (−18 °C)</td><td>Vanilleeis, Erdbeersorbet, Tiefkühlblätterteig, Convenience-Pommes</td></tr>
<tr><td><b>Non-Food</b></td><td>Reinigungsmittel, Porzellan, Besteck, Büfettplatten, Kerzen, Geschirrhandtücher</td></tr>
</table>
<div class="note">⚠️ <b>Bẫy hay gặp:</b> Tomaten/Bananen/Ananas → Trockenlager (kälteempfindlich) · Brot → không để lạnh · Kartoffeln → tối, 4–8 °C, thoáng (ánh sáng → Solanin/xanh) · Reinigungsmittel → tách hẳn khỏi thực phẩm.</div>

<h3>Funktion des Lagers / 8 chức năng của kho ⚠️</h3>
<div class="note">⚠️ <b>HỌC THUỘC – 8 Funktionen:</b>
<ol>
<li>Haltbarkeit der Ware verlängern → kéo dài bảo quản</li>
<li>Einhaltung der Kühlkette + Hygienevorschriften → giữ chuỗi lạnh & vệ sinh</li>
<li>Für Zubereitung mancher Speisen (z. B. Crème) → phục vụ chế biến</li>
<li>Abfallvermeidung → giảm rác thải</li>
<li>Vermeiden der Keimvermehrung → tránh vi khuẩn sinh sôi</li>
<li>Organisation → Waren schneller finden → tìm hàng nhanh</li>
<li>Ausreichend Waren auf Vorrat → đảm bảo nguồn cung</li>
<li>Ggf. erhöhter Genusswert (Wein, Stollen, Fleisch) → tăng giá trị cảm quan</li>
</ol></div>
`,
    qa: [
      { q: "Bei welcher Temperatur lagert man Frischfleisch, Wild und Geflügel?", qVi: "Thịt tươi, thú rừng và gia cầm bảo quản ở nhiệt độ nào?", a: "Zusammen bei +4 °C im Kühlraum.", aVi: "Chung ở +4 °C trong kho mát.", why: "Leicht verderblich; gesetzliche Höchsttemperatur für Fleisch = 4 °C.", src: "sla-lf2.md trang 06 · KT „Nhiệt độ bảo quản“" },
      { q: "Warum dürfen Tomaten und Bananen nicht in den normalen Kühlraum?", qVi: "Vì sao cà chua và chuối không được để trong kho lạnh thường?", a: "Sie sind kälteempfindlich → Kälteschäden, Aroma- und Farbverlust. Lagerung im kühlen, dunklen Trockenbereich (ca. 12–15 °C).", aVi: "Chúng nhạy cảm với lạnh → hỏng vì lạnh, mất mùi và màu. Để ở nơi khô, tối, mát (~12–15 °C).", why: "Zu niedrige Temperaturen können bestimmten Waren schaden – ein typischer Prüfungs-Trick.", src: "sla-lf2.md trang 06" },
      { q: "Bei welcher Temperatur lagern Fische am besten?", qVi: "Cá bảo quản tốt nhất ở nhiệt độ nào?", a: "Bei 0 °C, am besten zwischen Eis, getrennt gelagert (Keimträger).", aVi: "Ở 0 °C, tốt nhất giữa lớp đá, để riêng (mang mầm bệnh).", why: "Ganze Tiere/Fische sind Keimträger → separat und am kältesten.", src: "sla-lf2.md trang 06 · KT „Fisch 0–2 °C“" },
      { q: "Nenne 3 Funktionen eines Lagers.", qVi: "Nêu 3 chức năng của kho.", a: "z. B.: Haltbarkeit verlängern · Kühlkette/Hygiene einhalten · Keimvermehrung vermeiden (auch: Abfallvermeidung, Vorrat sichern, Organisation).", aVi: "VD: kéo dài bảo quản · giữ chuỗi lạnh/vệ sinh · tránh vi khuẩn sinh sôi (còn: giảm rác, dự trữ, tổ chức).", why: "8 Funktionen des Lagers stehen im Heftaufschrieb (trang 08).", src: "sla-lf2.md trang 08" }
    ],
    quiz: [
      { q: "Welche Temperatur hat das Trockenlager (Magazin)?", options: ["0–4 °C", "12–15 °C", "−18 °C", "8–10 °C"], answer: 1, explain: "Magazin/Trockenlager: 12–15 °C, max. 50 % Luftfeuchte, trocken und dunkel." },
      { q: "Wie lagert man im Tiefkühlraum?", options: ["Offen, ohne Verpackung", "Alles verpackt bei max. −18 °C", "Bei +4 °C", "Nur Fleisch getrennt"], answer: 1, explain: "−18 °C, alles verpackt gegen Frostbrand; Trennung der LM-Gruppen nicht nötig." },
      { q: "Was passiert bei zu hoher Luftfeuchtigkeit?", options: ["Salate werden welk", "Brot verliert Frische, Puderzucker klumpt, Schimmel", "Nichts", "Ware friert ein"], answer: 1, explain: "Zu hoch → Brot alt, Puderzucker klumpt, Schimmelbildung. Zu niedrig → Salate welk." },
      { q: "Wohin gehört Reinigungsmittel?", options: ["Kühlraum", "Trockenlager bei Lebensmitteln", "Non-Food-Lager, getrennt von LM", "Tiefkühler"], answer: 2, explain: "Non-Food-Lager – niemals bei Lebensmitteln (Kontaminations-/Geruchsgefahr)." },
      { q: "Milch und Milcherzeugnisse lagern bei…", options: ["ca. +8 °C", "0 °C", "−18 °C", "+15 °C"], answer: 0, explain: "Milch ca. +8 °C, verpackte und offene Ware getrennt." },
      { q: "Was bedeutet âreine und unreine Produkte trennen“?", options: ["Bio von konventionell", "Saubere von erd-/keimbehafteten Waren getrennt lagern", "Teuer von billig", "Fest von flÃ¼ssig"], answer: 1, explain: "Hygiene: erdbehaftetes GemÃ¼se/ganze Fische (KeimtrÃ¤ger) getrennt von unverpackter Frischware/Speisen." }
    ],
    vokabeln: [
      { de: "die Lagerart", vi: "loại kho" },
      { de: "die Lagerbedingung", vi: "điều kiện bảo quản" },
      { de: "das Magazin / Trockenlager", vi: "kho khô" },
      { de: "der Kühlraum", vi: "kho mát" },
      { de: "der Tiefkühlraum", vi: "kho đông" },
      { de: "leicht verderblich", vi: "dễ hỏng" },
      { de: "die Luftfeuchtigkeit", vi: "độ ẩm không khí" },
      { de: "kälteempfindlich", vi: "nhạy cảm với lạnh" },
      { de: "der Keimträger", vi: "vật mang mầm bệnh" },
      { de: "rein / unrein", vi: "sạch / chưa sạch" },
      { de: "der Frostbrand", vi: "cháy lạnh (bỏng đông)" },
      { de: "die Kühlkette", vi: "chuỗi lạnh" },
      { de: "die Keimvermehrung", vi: "sự sinh sôi vi khuẩn" },
      { de: "der Genusswert", vi: "giá trị cảm quan" },
      { de: "die Luftzirkulation", vi: "sự lưu thông không khí" }
    ]
  }
]);
