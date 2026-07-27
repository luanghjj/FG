/* BfK-1 · LF2 · LS05–LS06 (nguồn: sla-lf2.md) */
window.__LF2 = (window.__LF2||[]).concat([
  {
    id: "lf2-ls05",
    icon: "🗓️",
    name: "LS05 · Bestell- und Lieferzeitpunkte",
    nameVi: "Thời điểm đặt & giao hàng",
    desc: "Meldebestand, Lieferzeit, hai phương pháp đặt hàng (Punkt- ↔ Rhythmusverfahren) và ưu/nhược điểm.",
    source: "sla-lf2.md · trang 24–33",
    theory: `
<h3>Ausgangsproblem / Vấn đề đặt ra</h3>
<p>Im Zentrallager laufen drei typische Bestellfehler zusammen. → Ở kho trung tâm có ba lỗi đặt hàng kinh điển:</p>
<ul>
  <li><b>Zu viel / zu früh bestellt</b> → Ware verdirbt (MHD überschritten). → Đặt quá nhiều / quá sớm → hàng hỏng (quá hạn), phải đổ bỏ.</li>
  <li><b>Zu viel bestellt</b> → die <b>Lagerkapazität</b> reicht nicht. → Đặt quá nhiều → kho không đủ chỗ chứa.</li>
  <li><b>Zu wenig / zu spät bestellt</b> → die Ware <b>geht aus</b>. → Đặt quá ít / quá muộn → hết hàng, không bán được.</li>
</ul>
<div class="note">⚠️ <b>HỌC THUỘC:</b> 1 hl (Hektoliter) = <b>100 Liter</b>. Ví dụ giá bia trong bài: <b>80 €/hl</b>.</div>

<h3>Die drei Zeit-/Bestandsgrößen / Ba mốc tồn kho quan trọng</h3>
<div class="note">⚠️ <b>HỌC THUỘC – 3 Zeitpunkte in der Lagerdatei:</b>
<ul>
  <li><b>Bestellzeitpunkt</b> = Tag, an dem der Bestand den <b>Meldebestand</b> erreicht. → Thời điểm đặt = ngày tồn kho chạm mức Meldebestand.</li>
  <li><b>Lieferzeitpunkt</b> = Bestellzeitpunkt + <b>Lieferzeit</b>. → Thời điểm nhận = thời điểm đặt + thời gian giao hàng.</li>
  <li><b>Höchstbestand</b> = Bestand direkt nach der Lieferung. → Tồn tối đa = tồn kho ngay sau khi hàng về.</li>
</ul></div>

<h3>Rechenformeln / Công thức tính</h3>
<ul>
  <li><b>Meldebestand</b> = (ø Tagesverbrauch × Lieferzeit) + Mindestbestand. → Mức báo đặt hàng = (mức dùng TB/ngày × thời gian giao) + tồn tối thiểu. Ví dụ bia: (2 hl × 4 Tage) + 4 hl = <b>12 hl</b>.</li>
  <li><b>Höchstbestand</b> = Mindestbestand + Bestellmenge. → Tồn tối đa = tồn tối thiểu + lượng đặt. Ví dụ: 4 + 30 = <b>34 hl</b>.</li>
  <li>Bestellung 08.03 + Lieferzeit 4 Tage → Lieferung 12.03. → Đặt 08.03, giao 4 ngày → hàng về 12.03.</li>
</ul>
<div class="note">⚠️ <b>HỌC THUỘC:</b> Lagerbestandsverlauf có dạng <b>Sägezahnkurve</b> (đường răng cưa): giảm đều theo mức dùng ngày, nhảy vọt lên mỗi lần giao hàng. Khi đường cắt <b>Meldebestandslinie</b> thì phải đặt; đường <b>Mindestbestand</b> (eiserner Bestand) không bao giờ được xuống dưới.</div>

<h3>Just-in-Time-Verfahren</h3>
<p>Ware wird sofort nach der Lieferung bereitgestellt, keine Lagerkapazität nötig. → Hàng vừa giao là dùng ngay, <b>không cần kho</b>. Áp dụng cho <b>Brötchen, Blumenschmuck, lebende Tierlieferungen</b> (bánh mì nhỏ, hoa trang trí, động vật sống).</p>

<h3>Die zwei Bestellverfahren / Hai phương pháp đặt hàng ⚠️</h3>
<table>
  <tr><th>Merkmal</th><th>Bestellpunktverfahren<br><span style="font-weight:400">(điểm đặt hàng)</span></th><th>Bestellrhythmusverfahren<br><span style="font-weight:400">(theo chu kỳ thời gian)</span></th></tr>
  <tr><td><b>Auslöser</b><br>Yếu tố kích hoạt</td><td>Meldebestand erreicht/unterschritten → tồn chạm/xuống dưới Meldebestand thì đặt</td><td>fester Zeitpunkt/Termin (z. B. 1×/Woche) → khoảng thời gian cố định, không phụ thuộc tồn</td></tr>
  <tr><td><b>Bestellmenge</b><br>Lượng đặt</td><td>immer <b>gleich</b> → luôn cố định</td><td><b>variabel</b> = Höchstbestand − Lagerbestand → thay đổi mỗi lần</td></tr>
  <tr><td><b>Bestandskontrolle</b><br>Kiểm kho</td><td>nach <b>jeder</b> Entnahme → sau mỗi lần xuất hàng (tốn công)</td><td><b>nicht</b> nach jedem Lagerabgang → không cần kiểm mỗi lần</td></tr>
  <tr><td><b>Verwaltungsaufwand</b><br>Công quản lý</td><td>hoch → cao</td><td>gering → thấp (ökonomisch)</td></tr>
  <tr><td><b>Geeignet für</b><br>Dùng cho</td><td>schwankender/unregelmäßiger Verbrauch, verderbliche Ware → tiêu thụ dao động, hàng dễ hỏng (VD: <b>Bier naturtrüb</b>)</td><td>gleichmäßiger Verbrauch → tiêu thụ đều đặn (VD: <b>Reinigungsmittel</b>)</td></tr>
</table>
<div class="note">⚠️ <b>HỌC THUỘC – Merksatz:</b> <b>Bestellpunkt</b> = feste Menge, variabler Zeitpunkt (lượng cố định, thời điểm thay đổi). <b>Bestellrhythmus</b> = fester Zeitpunkt, variable Menge (thời điểm cố định, lượng thay đổi).</div>

<h3>Vorteile & Nachteile / Ưu & nhược điểm ⚠️</h3>
<table>
  <tr><th></th><th>Bestellpunktverfahren</th><th>Bestellrhythmusverfahren</th></tr>
  <tr><td><b>Vorteile</b><br>Ưu điểm</td><td>Fehlmengengefahr gering (nguy cơ thiếu hàng thấp); Höchstbestand immer genau erreicht; Lagervorrat geht nie aus → hầu như không hết hàng</td><td>geringer Verwaltungs- und Kontrollaufwand (ít công quản lý/kiểm soát); besserer Überblick über Lieferzeitpunkt → dễ nắm thời điểm giao</td></tr>
  <tr><td><b>Nachteile</b><br>Nhược điểm</td><td>hoher Verwaltungs-/Kontrollaufwand (tốn công kiểm tra thường xuyên); hohe Lagerbestände; Höchstbestand kann überschritten werden</td><td>Bestellmenge muss jedes Mal neu berechnet werden (phải tính lại mỗi lần); Gefahr von Fehlmengen größer; Lagervorräte könnten eher ausgehen; für unregelmäßigen Absatz nicht anwendbar</td></tr>
</table>
<div class="note">⚠️ <b>HỌC THUỘC:</b> Sicherheitsbestand (eiserne Reserve) bù cho biến động tiêu thụ — <b>chỉ Leitung F&amp;B mới được phép giải phóng</b>.</div>`,
    qa: [],
    qaNote: "Câu hỏi luyện tập sẽ bổ sung từ fk_exel.",
    quiz: [
      {
        q: "Beim Bestellpunktverfahren wird bestellt, wenn …",
        options: [
          "ein fester Termin (z. B. 1× pro Woche) erreicht ist",
          "der Meldebestand erreicht bzw. unterschritten wird",
          "der Höchstbestand überschritten wird",
          "die Lieferzeit abgelaufen ist"
        ],
        answer: 1,
        explain: "Bestellpunktverfahren = đặt khi tồn kho chạm/xuống dưới Meldebestand. Đặt theo ngày cố định là Bestellrhythmusverfahren."
      },
      {
        q: "Meldebestand = (ø Tagesverbrauch × Lieferzeit) + Mindestbestand. Bia: ø 2 hl/Tag, Lieferzeit 4 Tage, Mindestbestand 4 hl. Meldebestand = ?",
        options: ["8 hl", "10 hl", "12 hl", "34 hl"],
        answer: 2,
        explain: "(2 × 4) + 4 = 12 hl. Đó là mức tồn kho báo hiệu phải đặt hàng."
      },
      {
        q: "Welches Verfahren passt zu Bier naturtrüb (kurze Lagerfähigkeit, schwankender Verbrauch)?",
        options: [
          "Bestellrhythmusverfahren",
          "Just-in-Time-Verfahren",
          "Bestellpunktverfahren",
          "Vorratsbestellung auf fester Menge pro Monat"
        ],
        answer: 2,
        explain: "Hàng dễ hỏng, tiêu thụ dao động → Bestellpunktverfahren (kiểm tra sau mỗi lần xuất, đặt khi chạm Meldebestand)."
      },
      {
        q: "Merksatz: Das Bestellrhythmusverfahren hat …",
        options: [
          "feste Menge und variablen Zeitpunkt",
          "festen Zeitpunkt und variable Menge",
          "feste Menge und festen Zeitpunkt",
          "variable Menge und variablen Zeitpunkt"
        ],
        answer: 1,
        explain: "Rhythmus = fester Zeitpunkt, variable Menge (Bestellmenge = Höchstbestand − Lagerbestand). Punkt thì ngược lại."
      },
      {
        q: "Ein Vorteil des Bestellrhythmusverfahrens ist …",
        options: [
          "geringe Fehlmengengefahr",
          "geringer Verwaltungs- und Kontrollaufwand",
          "der Bestand geht nie aus",
          "es eignet sich für verderbliche Ware"
        ],
        answer: 1,
        explain: "Ít công quản lý/kiểm soát vì không phải kiểm sau mỗi lần xuất. Còn 'ít thiếu hàng' và 'không bao giờ hết' là ưu điểm của Bestellpunktverfahren."
      }
    ],
    vokabeln: [
      { de: "der Meldebestand", vi: "mức báo đặt hàng" },
      { de: "der Mindestbestand / eiserner Bestand", vi: "tồn kho tối thiểu / dự trữ sắt" },
      { de: "der Höchstbestand", vi: "tồn kho tối đa" },
      { de: "die Lieferzeit", vi: "thời gian giao hàng" },
      { de: "der Bestellzeitpunkt", vi: "thời điểm đặt hàng" },
      { de: "der Lieferzeitpunkt", vi: "thời điểm nhận hàng" },
      { de: "das Bestellpunktverfahren", vi: "phương pháp điểm đặt hàng" },
      { de: "das Bestellrhythmusverfahren", vi: "phương pháp đặt theo chu kỳ" },
      { de: "das Just-in-Time-Verfahren", vi: "giao tới dùng ngay, không cần kho" },
      { de: "die Entnahme / der Lagerabgang", vi: "lần lấy/xuất hàng" },
      { de: "die Fehlmenge", vi: "lượng thiếu hụt" },
      { de: "der Verwaltungsaufwand", vi: "công sức quản lý" },
      { de: "verderblich", vi: "dễ hỏng" },
      { de: "ökonomisch", vi: "tiết kiệm, kinh tế" },
      { de: "das Hektoliter (hl)", vi: "100 lít" }
    ]
  },
  {
    id: "lf2-ls06",
    icon: "📝",
    name: "LS06 · Waren bestellen",
    nameVi: "Đặt hàng hoá",
    desc: "Kaufvertrag (2 Willenserklärungen), Ablauf Anfrage→Angebot→Bestellung, nội dung một đơn đặt hàng.",
    source: "sla-lf2.md · trang 34–38",
    theory: `
<h3>Grundsatz Kaufvertrag / Nguyên tắc hợp đồng mua bán ⚠️</h3>
<div class="note">⚠️ <b>HỌC THUỘC:</b> Ein Kaufvertrag kommt immer durch <b>ZWEI übereinstimmende Willenserklärungen</b> zustande (Willenserklärung = rechtlich wirksame Äußerung einer Person). → Hợp đồng mua bán luôn hình thành qua <b>HAI tuyên bố ý chí trùng khớp</b> (tuyên bố ý chí = phát biểu có hiệu lực pháp lý). Merksatz: <b>Angebot + Bestellung</b> hoặc <b>Bestellung + Bestellungsannahme</b>.</div>

<h3>Zwei Teilgeschäfte / Hai phần giao dịch</h3>
<ul>
  <li><b>Verpflichtungsgeschäft</b> (giao dịch nghĩa vụ): Vertragspartner verpflichten sich gegenseitig. Käufer: Ware annehmen + Kaufpreis rechtzeitig zahlen. Verkäufer: Ware frei von Mängeln und ordnungsgemäß übergeben + Kaufpreis annehmen. → Hai bên cam kết: người mua nhận hàng + trả tiền đúng hạn; người bán giao hàng không lỗi, đúng quy định + nhận tiền.</li>
  <li><b>Erfüllungsgeschäft</b> (giao dịch thực hiện): beide erfüllen ihre Pflichten. → Cả hai thực hiện nghĩa vụ đã cam kết.</li>
</ul>

<h3>Ablauf: von der Anfrage bis zum Kaufvertrag / Quy trình 7 bước</h3>
<ol>
  <li><b>Anfrage stellen</b> – bei mehreren Lieferanten nach Preis, Lieferbedingungen, Qualität fragen. → Hỏi nhiều nhà cung cấp về giá, điều kiện giao, chất lượng.</li>
  <li><b>Angebote einholen</b> – Lieferanten schicken Angebote. → Nhận báo giá.</li>
  <li><b>Angebote vergleichen</b> – Preis, Qualität, Lieferbedingungen, Service, Entfernung, Verpackungsgröße. → So sánh giá, chất lượng, điều kiện giao, dịch vụ, khoảng cách, cỡ đóng gói.</li>
  <li><b>Lieferant auswählen</b> – der wirtschaftlich und qualitativ beste. → Chọn nhà cung cấp tốt nhất về giá và chất lượng.</li>
  <li><b>Bestellung aufgeben</b> (= Annahme des Angebots). → Đặt hàng = chấp nhận chào hàng.</li>
  <li><b>Bestellungsannahme durch den Verkäufer.</b> → Người bán xác nhận đơn.</li>
  <li><b>Kaufvertrag entsteht.</b> → Hợp đồng mua bán hình thành.</li>
</ol>

<h3>Rechtswirkung / Hiệu lực pháp lý ⚠️</h3>
<table>
  <tr><th>Aktion</th><th>Rechtliche Konsequenz</th></tr>
  <tr><td><b>Werbung, Speisekarte im Aushang, Preisliste</b><br>quảng cáo, thực đơn niêm yết, bảng giá</td><td><b>kein Angebot</b> – nicht an eine bestimmte Person gerichtet → KHÔNG phải chào hàng</td></tr>
  <tr><td><b>Anfrage</b> (Käufer → Verkäufer)<br>hỏi hàng</td><td><b>unverbindlich</b>, ohne Kaufverpflichtung → không ràng buộc người mua</td></tr>
  <tr><td><b>Angebot</b> (Verkäufer → Käufer)<br>chào hàng</td><td>rechtlich bindend <b>für den Verkäufer</b> → ràng buộc người bán</td></tr>
  <tr><td><b>Bestellung</b> (Käufer → Verkäufer)<br>đặt hàng</td><td>rechtlich bindend <b>für den Käufer</b>; Kaufvertrag rechtsgültig → ràng buộc người mua, hợp đồng có hiệu lực</td></tr>
</table>
<div class="note">⚠️ <b>HỌC THUỘC:</b> <b>Bestellungsannahme</b> (người bán xác nhận đơn) chỉ cần khi: đặt <b>bằng miệng/điện thoại</b>, HOẶC đơn <b>lệch khỏi chào hàng</b> (Menge, Lieferfrist, Preis), HOẶC <b>không có chào hàng</b> trước đó. <b>Widerruf</b> (huỷ đơn) chỉ có hiệu lực nếu đến tay người bán <b>trước hoặc cùng lúc</b> với đơn hàng.</div>

<h3>Grundsatz bedarfsgerechte Bestellung / Đặt hàng đúng nhu cầu</h3>
<div class="note">⚠️ <b>HỌC THUỘC:</b> bedarfsgerecht bestellen — <b>zu viel = Verderb</b> (MHD überschritten, Lager voll), <b>zu wenig = Engpass</b> (Ware geht aus). → Đặt đúng nhu cầu: quá nhiều = hàng hỏng, quá ít = thiếu/hết hàng.</div>

<h3>Inhalt einer Bestellung / Nội dung một đơn đặt hàng ⚠️</h3>
<p>Keine gesetzliche Form vorgeschrieben, aber wichtige Angebotsdaten wiederholen (Irrtümer vermeiden, Auftrag belegen). → Không bị luật quy định hình thức, nhưng nên nhắc lại dữ liệu báo giá để tránh nhầm và làm bằng chứng.</p>
<ul>
  <li><b>Bezug zum Angebot</b> herstellen. → Dẫn chiếu tới báo giá.</li>
  <li><b>Art und Qualität</b> (Artikelnummer, Typ, Farbe, Jahrgang, Handelsklasse). → Loại và chất lượng hàng.</li>
  <li><b>Menge</b> (Einheiten, Stückzahl, Gewicht). → Số lượng.</li>
  <li><b>Preis</b> (Netto-/Bruttopreis). → Giá netto/brutto.</li>
  <li><b>Liefertermin und Lieferbedingungen</b> (frei Haus, frachtfrei, ab Werk, ab Lager). → Ngày giao và điều kiện giao (phí vận chuyển).</li>
  <li><b>Zahlungsbedingungen</b> (Überweisung, bar, Nachnahme, Vorauszahlung). → Điều kiện thanh toán.</li>
  <li><b>Rabatt</b> (Mengen-, Treuerabatt) und/oder <b>Skonto</b> (giảm giá trả sớm). → Chiết khấu và Skonto.</li>
  <li><b>Sonderwünsche</b> (Umtauschrecht, Verpackung) und <b>Dank + Grußformel mit Unterschrift</b>. → Yêu cầu đặc biệt + lời chào và chữ ký.</li>
</ul>

<h3>Lieferbedingungen / Điều kiện giao hàng (Beförderungskosten) ⚠️</h3>
<table>
  <tr><th>Klausel</th><th>Wer zahlt Beförderungskosten?</th></tr>
  <tr><td><b>frei Haus</b></td><td>Verkäufer trägt alles bis zum Haus → người bán trả toàn bộ phí đến nhà</td></tr>
  <tr><td><b>frachtfrei</b></td><td>Verkäufer bis zum Lager, ab Lager der Käufer → người bán trả đến kho, từ kho người mua trả</td></tr>
  <tr><td><b>ab Werk</b></td><td>Käufer (Abholung im Werk) → người mua trả, lấy tại nhà máy</td></tr>
  <tr><td><b>ab Lager</b></td><td>Käufer (Abholung im Lager) → người mua trả, lấy tại kho</td></tr>
</table>`,
    qa: [],
    qaNote: "Câu hỏi luyện tập sẽ bổ sung từ fk_exel.",
    quiz: [
      {
        q: "Wodurch kommt ein Kaufvertrag zustande?",
        options: [
          "durch eine Werbeanzeige des Verkäufers",
          "durch zwei übereinstimmende Willenserklärungen",
          "sobald die Ware geliefert wurde",
          "durch eine unverbindliche Anfrage des Käufers"
        ],
        answer: 1,
        explain: "Hợp đồng cần hai tuyên bố ý chí trùng khớp: Angebot + Bestellung, hoặc Bestellung + Bestellungsannahme."
      },
      {
        q: "Eine Speisekarte im Aushang oder eine Preisliste ist rechtlich …",
        options: [
          "ein bindendes Angebot",
          "eine Bestellung",
          "kein Angebot (nicht an eine bestimmte Person gerichtet)",
          "eine Bestellungsannahme"
        ],
        answer: 2,
        explain: "Quảng cáo/bảng giá không nhắm vào một người cụ thể → không phải Angebot, không ràng buộc pháp lý."
      },
      {
        q: "Für wen ist ein abgegebenes Angebot rechtlich bindend?",
        options: [
          "nur für den Käufer",
          "für den Verkäufer",
          "für niemanden",
          "für den Spediteur"
        ],
        answer: 1,
        explain: "Angebot ràng buộc người bán (Verkäufer). Bestellung mới ràng buộc người mua (Käufer)."
      },
      {
        q: "Wann ist eine Bestellungsannahme durch den Verkäufer nötig?",
        options: [
          "immer, bei jeder Bestellung",
          "nie, die Bestellung reicht immer aus",
          "wenn mündlich bestellt wird, die Bestellung vom Angebot abweicht oder kein Angebot vorlag",
          "nur bei Barzahlung"
        ],
        answer: 2,
        explain: "Cần xác nhận khi: đặt bằng miệng, đơn lệch khỏi chào hàng, hoặc không có chào hàng trước đó."
      },
      {
        q: "Was bedeutet die Lieferbedingung 'frei Haus'?",
        options: [
          "Der Käufer holt die Ware im Werk ab",
          "Der Verkäufer übernimmt die Beförderungskosten bis zum Haus",
          "Der Käufer zahlt ab Lager",
          "Es fallen keine Verpackungskosten an"
        ],
        answer: 1,
        explain: "'frei Haus' = người bán trả toàn bộ phí vận chuyển đến tận nhà người mua."
      },
      {
        q: "Warum soll bedarfsgerecht bestellt werden?",
        options: [
          "weil der Verkäufer es vorschreibt",
          "zu viel führt zu Verderb, zu wenig führt zu Engpässen",
          "weil frei Haus günstiger ist",
          "um die Bestellungsannahme zu umgehen"
        ],
        answer: 1,
        explain: "Đặt đúng nhu cầu: quá nhiều = hàng hỏng (MHD, kho đầy), quá ít = thiếu/hết hàng."
      }
    ],
    vokabeln: [
      { de: "der Kaufvertrag", vi: "hợp đồng mua bán" },
      { de: "die Willenserklärung", vi: "tuyên bố ý chí" },
      { de: "übereinstimmend", vi: "trùng khớp" },
      { de: "die Anfrage", vi: "thư hỏi hàng/hỏi giá" },
      { de: "das Angebot", vi: "chào hàng, báo giá" },
      { de: "die Bestellung", vi: "đơn đặt hàng" },
      { de: "die Bestellungsannahme", vi: "xác nhận đơn hàng" },
      { de: "unverbindlich", vi: "không ràng buộc" },
      { de: "rechtlich bindend / rechtsgültig", vi: "ràng buộc / có hiệu lực pháp lý" },
      { de: "der Widerruf", vi: "việc huỷ/rút lại đơn" },
      { de: "die Lieferbedingungen", vi: "điều kiện giao hàng" },
      { de: "frei Haus", vi: "người bán trả phí đến tận nhà" },
      { de: "ab Werk / ab Lager", vi: "người mua trả phí, lấy tại nhà máy/kho" },
      { de: "die Zahlungsbedingungen", vi: "điều kiện thanh toán" },
      { de: "der Rabatt / das Skonto", vi: "chiết khấu / giảm giá trả sớm" }
    ]
  }
]);
