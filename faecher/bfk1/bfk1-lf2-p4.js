/* BfK-1 · LF2 · LS07–LS08 (nguồn: sla-lf2.md) */
window.__LF2 = (window.__LF2||[]).concat([
  {
    id: "lf2-ls07",
    icon: "📥",
    name: "LS07 · Warenannahme & Wareneinlagerung",
    nameVi: "Nhận hàng & nhập kho",
    desc: "Ablauf Warenannahme (6 điểm kiểm tra), Checkliste, Bestellformular và Lieferschein — so sánh đơn đặt ↔ phiếu giao để tìm Mängel.",
    source: "sla-lf2.md · trang 38–41",
    theory: `
<h3>Die Warenannahme / Nhận hàng ⚠️</h3>
<div class="note">⚠️ <b>HỌC THUỘC:</b> Zu jeder Warenannahme gehören <b>die Kontrolle des Lieferscheins</b> und eine <b>Wareneingangskontrolle</b>. → Mỗi lần nhận hàng đều gồm <b>kiểm tra phiếu giao hàng (Lieferschein)</b> và <b>kiểm tra hàng nhập (Wareneingangskontrolle)</b>.</div>
<ul>
  <li>Bei der Wareneingangskontrolle werden alle gelieferten Rohstoffe kontrolliert und der Lieferschein mit der <b>Bestellung</b> verglichen. → Kiểm tra tất cả nguyên liệu và <b>đối chiếu phiếu giao hàng với đơn đặt hàng</b>.</li>
  <li>So gelangen nur <b>einwandfreie</b> Rohstoffe in den Betrieb. → Chỉ nguyên liệu hoàn hảo (không lỗi) mới vào cơ sở và được chế biến.</li>
  <li>Rohstoffe, die durch <b>Schädlinge, Mikroorganismen oder Schmutz</b> nicht mehr einwandfrei sind, <b>dürfen nicht angenommen werden</b>. → Nguyên liệu hỏng do sinh vật gây hại, vi sinh vật hoặc bụi bẩn <b>không được nhận</b> (có hại cho sức khỏe, nguy hiểm cho khách).</li>
</ul>

<h3>Auf dem Lieferschein stehen … / Trên phiếu giao hàng có gì ⚠️</h3>
<div class="note">⚠️ <b>HỌC THUỘC:</b> Allgemeine Angaben zum Lieferanten und Kunden (Anschrift Lieferant, Anschrift Kunde, <b>Kundennummer, Bestelldatum, Rechnungsdatum</b>) und die einzelnen Waren in der bestellten Menge. → Thông tin chung về nhà cung cấp & khách hàng (địa chỉ, số khách hàng, ngày đặt, ngày hóa đơn) và từng loại hàng với số lượng đã đặt.</div>
<ul>
  <li>Der Lieferschein darf <b>erst nach Kontrolle der gesamten Lieferung unterschrieben</b> werden. → Chỉ được ký phiếu <b>sau khi đã kiểm tra toàn bộ lô hàng</b>.</li>
  <li><b>Mängel</b> werden aufgeschrieben; der Lieferant muss <b>schnellstmöglich nachliefern</b>. → Khiếm khuyết phải ghi lại; nhà cung cấp phải giao bù càng nhanh càng tốt.</li>
  <li>Angelieferte und zurückgegebene <b>Transportbehälter und Leergut</b> müssen <b>schriftlich vermerkt</b> werden. → Thùng/khay vận chuyển và vỏ rỗng đã giao/trả phải ghi chú bằng văn bản.</li>
</ul>

<h3>Wareneingangskontrolle – 6 điểm phải chú ý ⚠️ HỌC THUỘC</h3>
<table>
  <tr><th>#</th><th>Deutsch</th><th>Tiếng Việt</th></tr>
  <tr><td>1</td><td><b>richtige Ware</b> (Kennzeichnung) in der <b>richtigen Menge</b> (Vergleich mit Bestellung)</td><td>Đúng hàng (chú ý nhãn), đúng số lượng (so với đơn đặt)</td></tr>
  <tr><td>2</td><td><b>Mindesthaltbarkeitsdatum</b> (nicht überschritten)</td><td>Hạn sử dụng tối thiểu (MHD) – không quá hạn</td></tr>
  <tr><td>3</td><td><b>Verpackung</b> (sauber und unbeschädigt)</td><td>Bao bì – sạch và không hư hỏng</td></tr>
  <tr><td>4</td><td><b>Kühl-/Gefriertemperaturen</b> eingehalten (<b>Kühlkette</b>)</td><td>Giữ đúng nhiệt độ mát/đông (chuỗi lạnh)</td></tr>
  <tr><td>5</td><td><b>unverpackte Rohstoffe</b> (Frischobst, Salate) frisch, unverdorben, frei von Schädlingen</td><td>Nguyên liệu không bao gói phải tươi, không thối, không sinh vật gây hại</td></tr>
  <tr><td>6</td><td><b>hygienischer Zustand</b> von Lieferfahrzeug und Transportbehälter</td><td>Tình trạng vệ sinh của xe giao hàng và thùng vận chuyển</td></tr>
</table>
<div class="note">⚠️ <b>HỌC THUỘC – Stichproben (mẫu ngẫu nhiên):</b> Kühlkette (z. B. Milch), leicht verderbliche Rohstoffe (Nüsse: Geschmack, Geruch, Aussehen), Schädlingsbefall bei beschädigter Verpackung, Zustand frischer Rohstoffe (Aussehen und Festigkeit). → Lấy mẫu kiểm: chuỗi lạnh, hàng dễ hỏng (vị/mùi/hình thức), sinh vật gây hại ở bao bì hỏng, độ tươi/độ chắc của hàng tươi.</div>

<h3>Die Wareneinlagerung – FIFO / Lưu kho ⚠️</h3>
<div class="note">⚠️ <b>HỌC THUỘC – FIFO-Prinzip</b> (First in – First out): 'was zuerst reinkam, kommt zuerst wieder raus'. Frisch gelieferte Ware wird <b>hinten</b> eingeräumt, <b>ältere</b> Ware steht <b>vorn</b> und wird <b>zuerst verbraucht</b>. → Nhập trước – xuất trước: hàng mới xếp phía sau, hàng cũ đứng phía trước để dùng trước.</div>
<ul>
  <li>Rohstoffe in <b>geeigneten Behältern mit Deckel</b> lagern. → Đựng trong hộp/thùng phù hợp có nắp.</li>
  <li><b>Unverpackte Rohstoffe dürfen nicht auf den Boden</b> gestellt werden. → Nguyên liệu không bao gói không được đặt trực tiếp trên sàn.</li>
</ul>

<h3>Checkliste Warenannahme – 6 bước theo đúng thứ tự ⚠️ HỌC THUỘC</h3>
<div class="note">⚠️ <b>HỌC THUỘC thứ tự 6 bước:</b> 1. Lieferschein kontrollieren → 2. Wareneingang kontrollieren → 3. Stichprobenkontrolle → 4. Lieferschein bearbeiten &amp; unterschreiben → 5. Waren abladen → 6. Waren einlagern. <br>Mẹo nhớ: <b>giấy trước – hàng sau – mẫu – ký – dỡ – xếp kho.</b></div>
<table>
  <tr><th>#</th><th>Arbeitsschritt</th><th>Was wird kontrolliert / getan</th></tr>
  <tr><td>1</td><td><b>Lieferschein kontrollieren</b><br>Kiểm tra phiếu giao</td><td>Angaben prüfen (Lieferant, Kunde, Artikel, Menge) und <b>mit der Bestellung vergleichen</b> → đối chiếu với đơn đặt</td></tr>
  <tr><td>2</td><td><b>Wareneingang kontrollieren</b><br>Kiểm tra hàng nhập</td><td>Verpackung auf Schäden · <b>MHD kontrollieren</b> · richtige Qualität</td></tr>
  <tr><td>3</td><td><b>Stichprobenkontrolle</b><br>Kiểm tra mẫu</td><td>Kühlkette ⇒ <b>Temperatur messen</b> · Schädlingsbefall · Frische</td></tr>
  <tr><td>4</td><td><b>Bearbeiten &amp; unterschreiben</b><br>Xử lý &amp; ký phiếu</td><td>Mängel notieren · unterschreiben + Name · Leergut (angenommen/zurückgegeben)</td></tr>
  <tr><td>5</td><td><b>Abladen der Waren</b><br>Dỡ hàng</td><td>–</td></tr>
  <tr><td>6</td><td><b>Wareneinlagerung</b><br>Lưu kho</td><td>FIFO beachten · richtiges Lager · aus <b>Kartons in Kisten umräumen</b> (Karton mang bụi/ẩm/Schädlinge vào kho)</td></tr>
</table>

<h3>Bestellformular / Phiếu đặt hàng ⚠️</h3>
<p>Regel tính giá: <b>Stück × Einzelpreis brutto = Gesamtpreis brutto</b>. Chú ý dấu phẩy thập phân kiểu Đức (50,50 = 50.50). <b>brutto</b> = giá đã có thuế; <b>netto</b> = chưa thuế.</p>
<div class="note">⚠️ <b>HỌC THUỘC – 6 thông tin bắt buộc của một Bestellung:</b> 1) Anschrift des Lieferanten; 2) Anschrift/Ansprechpartner des Kunden; 3) Artikel-Nr. und Bezeichnung; 4) Menge (Stück, kg, l); 5) Preise (Einzelpreis/Gesamtpreis); 6) Ort, Datum, Unterschrift. → Địa chỉ nhà cung cấp; địa chỉ & người liên hệ của khách; mã & tên hàng; số lượng kèm đơn vị; đơn giá/tổng giá; địa điểm, ngày, chữ ký.</div>
<p>💡 Liên hệ Lagerarten: đơn hàng trải đủ các kho — Getränkelager (bia, nước khoáng) · Trockenlager (óc chó, khoai tây) · Kühllager (sữa, trứng, xà lách, táo) · Gefrierlager (phúc bồn tử đông lạnh). ⚠️ Reinigungsmittel phải để RIÊNG, không cùng thực phẩm.</p>

<h3>Lieferschein & Mängel finden / Phiếu giao và tìm lỗi ⚠️</h3>
<p>Nhiệm vụ: so sánh Lieferschein với Bestellung theo 3 bước: <b>Artikel</b> (đúng hàng?) → <b>Menge</b> (đủ số lượng?) → <b>Verpackung/Zustand</b> (bao bì, chất lượng?).</p>
<div class="note">⚠️ <b>HỌC THUỘC – 2 Mängel trong ví dụ:</b><br><b>Mangel 1 – falsche Ware:</b> bestellt Eisbergsalat 10 Stück → geliefert Kopfsalat 10 Stück (sai loại, không phải lỗi số lượng).<br><b>Mangel 2 – Menge stimmt nicht:</b> bestellt 2 × 5 kg Walnüsse = 10 kg → geliefert 5 kg (thiếu 5 kg).</div>
<ul>
  <li>Bei Mängeln ký ở dòng <b>'Die Warenlieferung weist Mängel auf'</b> — cần <b>cả hai</b> chữ ký (Lieferant und Besteller); hàng lỗi <b>nicht annehmen</b>; yêu cầu <b>Nachlieferung</b>. → Hàng lỗi không nhận, ghi Mängel lên phiếu, hai bên ký, đòi giao bù.</li>
  <li><b>Leergut/Transportbehälter</b> luôn ghi bằng văn bản (nhận vào & trả lại) vì có <b>Pfand</b> (tiền cọc). → Vỏ/két rỗng có tiền cọc nên phải ghi rõ.</li>
</ul>`,
    qa: [
      {
        q: "Welche drei Dinge werden bei der Wareneingangskontrolle geprüft?",
        qVi: "Ba thứ nào được kiểm khi nhận hàng (Wareneingangskontrolle)?",
        a: "Menge, Qualität und Preis werden mit dem Lieferschein und der Bestellung abgeglichen; zusätzlich Temperatur, MHD/Verbrauchsdatum und sichtbare Schäden/Verpackung.",
        aVi: "Số lượng, chất lượng và giá được đối chiếu với phiếu giao hàng (Lieferschein) và đơn đặt; ngoài ra kiểm nhiệt độ, hạn dùng (MHD) và hư hỏng/bao bì thấy được.",
        why: "Lieferschein muss mit der Bestellung übereinstimmen — nur so erkennt man Fehlmengen und Falschlieferungen sofort.",
        src: "fk_exel Thema 14 · Warenannahme/Lieferschein"
      },
      {
        q: "Bei welcher Temperatur müssen gekühlte Waren bzw. TK-Ware bei der Annahme ankommen?",
        qVi: "Hàng mát và hàng đông lạnh khi nhận phải ở nhiệt độ nào?",
        a: "Kühlprodukte 2–7 °C, Tiefkühlware unter −17 °C (Lagerung −18 °C).",
        aVi: "Hàng mát 2–7 °C, hàng đông lạnh dưới −17 °C (kho trữ −18 °C).",
        why: "Kühlkette darf nicht unterbrochen sein — zu warme Ware sofort reklamieren und nicht annehmen.",
        src: "fk_exel · KT bắt buộc §4 (Nhiệt độ · Warenannahme-Kontrolle)"
      },
      {
        q: "Warum werden rohe und gekochte/gegarte Waren getrennt gelagert?",
        qVi: "Vì sao hàng sống và hàng đã nấu chín phải để riêng?",
        a: "Zur Vermeidung von Kreuzkontamination — Keime von rohem Fleisch/Fisch dürfen nicht auf verzehrfertige Speisen übertragen werden (rein/unrein trennen).",
        aVi: "Để tránh nhiễm chéo — vi khuẩn từ thịt/cá sống không được lây sang món ăn liền (tách hàng sạch/chưa sạch).",
        why: "Grundregel der Lebensmittelhygiene; auch beim Schneidebrett-Farbcode angewendet.",
        src: "fk_exel · KT bắt buộc §7 (Hygiene) + §4 (Fleisch)"
      },
      {
        q: "Was bedeutet FIFO bei der Wareneinlagerung?",
        qVi: "FIFO khi nhập kho nghĩa là gì?",
        a: "First in – first out: zuerst eingelagerte Ware zuerst verbrauchen; neue Ware nach hinten, ältere nach vorne stellen.",
        aVi: "First in – first out: hàng nhập trước dùng trước; hàng mới xếp sau, hàng cũ đưa ra trước.",
        why: "Verhindert Überschreiten des MHD und reduziert Verderb/Abfall.",
        src: "fk_exel Thema 15 · FIFO/Lagerbedingungen"
      }
    ],
    quiz: [
      {
        q: "Was gehört zu jeder Warenannahme?",
        options: [
          "nur das Abladen der Ware",
          "die Kontrolle des Lieferscheins und die Wareneingangskontrolle",
          "nur das Unterschreiben des Lieferscheins",
          "das sofortige Einlagern ohne Kontrolle"
        ],
        answer: 1,
        explain: "Mỗi lần nhận hàng gồm 2 việc: kiểm tra Lieferschein + Wareneingangskontrolle (đối chiếu với Bestellung)."
      },
      {
        q: "Wann darf der Lieferschein unterschrieben werden?",
        options: [
          "sofort bei Ankunft des Lieferanten",
          "erst nach Kontrolle der gesamten Lieferung",
          "erst am nächsten Tag",
          "nur wenn Mängel vorliegen"
        ],
        answer: 1,
        explain: "Chỉ được ký SAU KHI đã kiểm tra toàn bộ lô hàng."
      },
      {
        q: "Was besagt das FIFO-Prinzip?",
        options: [
          "neue Ware wird zuerst verbraucht",
          "was zuerst reinkam, kommt zuerst wieder raus",
          "die teuerste Ware wird zuerst gelagert",
          "Ware wird nur nach MHD sortiert"
        ],
        answer: 1,
        explain: "FIFO = First in – First out: hàng cũ ra trước, hàng mới xếp phía sau."
      },
      {
        q: "Bestellt wurde Eisbergsalat, geliefert wurde Kopfsalat. Welcher Mangel liegt vor?",
        options: [
          "Mangel in der Menge",
          "falsche Ware (Mangel in der Art)",
          "kein Mangel",
          "versteckter Mangel"
        ],
        answer: 1,
        explain: "Sai loại hàng = falsche Ware / Mangel in der Art, không phải lỗi số lượng."
      },
      {
        q: "Warum wird Ware aus Kartons in Kisten umgeräumt?",
        options: [
          "weil Kisten billiger sind",
          "Kartons bringen Staub, Feuchtigkeit und Schädlinge ins Lager",
          "um Platz zu sparen",
          "weil das MHD sich ändert"
        ],
        answer: 1,
        explain: "Carton mang bụi, ẩm và sinh vật gây hại (Schädlinge) từ ngoài vào kho."
      },
      {
        q: "Wie berechnet man den Gesamtpreis brutto einer Position?",
        options: [
          "Einzelpreis geteilt durch Stück",
          "Stück × Einzelpreis brutto",
          "Einzelpreis minus Rabatt",
          "Menge × Netto + MwSt einzeln"
        ],
        answer: 1,
        explain: "Gesamtpreis brutto = Stück × Einzelpreis brutto. Ví dụ 3 × 50,50 = 151,50 €."
      }
    ],
    vokabeln: [
      { de: "die Warenannahme", vi: "việc nhận hàng" },
      { de: "die Wareneingangskontrolle", vi: "kiểm tra hàng nhập" },
      { de: "der Lieferschein", vi: "phiếu giao hàng" },
      { de: "die Bestellung", vi: "đơn đặt hàng" },
      { de: "einwandfrei", vi: "hoàn hảo, không lỗi" },
      { de: "das Mindesthaltbarkeitsdatum (MHD)", vi: "hạn sử dụng tối thiểu" },
      { de: "die Kühlkette", vi: "chuỗi lạnh" },
      { de: "die Verpackung / unbeschädigt", vi: "bao bì / không hư hỏng" },
      { de: "die Stichprobe", vi: "mẫu ngẫu nhiên" },
      { de: "der Schädlingsbefall", vi: "sự xâm nhập của sinh vật gây hại" },
      { de: "die Wareneinlagerung", vi: "việc lưu kho" },
      { de: "das FIFO-Prinzip", vi: "nguyên tắc nhập trước xuất trước" },
      { de: "der Mangel / die Mängel", vi: "khiếm khuyết, lỗi hàng" },
      { de: "nachliefern / die Nachlieferung", vi: "giao bù" },
      { de: "das Leergut / das Pfand", vi: "vỏ rỗng / tiền cọc" },
      { de: "brutto / netto", vi: "đã gồm thuế / chưa thuế" }
    ]
  },
  {
    id: "lf2-ls08",
    icon: "⚖️",
    name: "LS08 · Auf Schlechtleistung reagieren",
    nameVi: "Xử lý hàng giao bị lỗi",
    desc: "Sachmangel vs Rechtsmangel, Erkennbarkeit (offen/versteckt/arglistig) + Fristen, 2 Stufen Rechte des Käufers, Mängelrüge và 7 Übungsfälle.",
    source: "sla-lf2.md · trang 43–50",
    theory: `
<h3>Schlechtleistung (mangelhafte Lieferung) / Giao hàng bị lỗi ⚠️</h3>
<div class="note">⚠️ <b>HỌC THUỘC:</b> Im Kaufvertrag muss der Verkäufer die Ware <b>ohne Mängel</b> übergeben. Wird mangelhaft geliefert, hat der Käufer die <b>Pflicht</b>, den Mangel zu melden (= <b>Mängelrüge</b>). → Người bán phải giao hàng không lỗi; nếu hàng lỗi, người mua có <b>nghĩa vụ</b> báo lỗi (Mängelrüge).</div>

<h3>1. Mängelarten / Các loại lỗi ⚠️</h3>
<p>Es werden <b>Sach- und Rechtsmängel</b> unterschieden. → Phân biệt lỗi về hàng hoá (Sachmangel) và lỗi pháp lý (Rechtsmangel).</p>
<table>
  <tr><th>Sachmangel (§434 BGB)</th><th>Tiếng Việt · Ví dụ</th></tr>
  <tr><td><b>Mangel in der Art</b> (Falschlieferung)</td><td>Sai loại/cỡ · Seelachsfilet thay vì Zanderfilet</td></tr>
  <tr><td><b>Mangel in der Menge</b> (Quantitätsmangel)</td><td>Sai số lượng · giao 3 kg thay vì 5 kg</td></tr>
  <tr><td><b>fehlerhafte Ware</b> (Qualitätsmangel)</td><td>Hàng hỏng/hư hại/lỗi ẩn/phẩm cấp thấp · hàng thường thay vì Bio</td></tr>
  <tr><td><b>falsche Werbeversprechen</b></td><td>Không đúng quảng cáo · máy rửa bát chạy lâu hơn công bố</td></tr>
  <tr><td><b>Montagefehler / mangelhafte Montageanleitung</b></td><td>Lỗi lắp đặt / hướng dẫn sai · bồn rửa lắp sai tường</td></tr>
</table>
<div class="note">⚠️ <b>HỌC THUỘC – Rechtsmangel (§435 BGB):</b> Die Sache ist <b>nicht im rechtlichen Besitz des Verkäufers</b> (Eigentum, Besitz oder Gebrauch beeinträchtigt). → Hàng <b>không thuộc sở hữu hợp pháp</b> của người bán. Ví dụ: bán nhụy nghệ tây (Safran) bị đánh cắp.</div>

<h3>2. Erkennbarkeit der Mängel + Fristen / Nhận biết lỗi và thời hạn ⚠️ HỌC THUỘC</h3>
<div class="note">⚠️ <b>HỌC THUỘC – 3 mốc thời hạn khiếu nại:</b>
<table>
  <tr><th>Mangel</th><th>Erklärung</th><th>Frist</th></tr>
  <tr><td><b>Offener Mangel</b></td><td>thấy ngay khi kiểm hàng (đếm/nhìn)</td><td><b>unverzüglich / sofort</b> (ngay lập tức)</td></tr>
  <tr><td><b>Versteckter Mangel</b></td><td>lộ ra sau một thời gian khi dùng</td><td><b>6 Monate</b> (6 tháng)</td></tr>
  <tr><td><b>Arglistig verschwiegener Mangel</b></td><td>người bán biết mà cố tình im lặng</td><td><b>30 Jahre</b> (30 năm)</td></tr>
</table>
Nhớ nhanh: <b>sofort – 6 Monate – 30 Jahre</b> → càng gian dối, thời hạn càng dài. Wer <b>nicht rügt, verliert seine Rechte</b> (không khiếu nại đúng hạn = mất quyền, hàng coi như đã chấp nhận).</div>
<p>Der Zeitraum, in dem der Verkäufer für Mängelfreiheit haftet, heißt <b>Gewährleistung</b>. Die Mängelrüge kann <b>formlos</b> erfolgen (Telefon, Mail, Fax, Brief) – schriftlich besser zur <b>Beweissicherung</b>. → Thời gian bảo hành theo luật = Gewährleistung; khiếu nại không cần hình thức nhất định, nên viết để có bằng chứng.</p>

<h3>3. Rechte des Käufers bei Sachmängeln – 2 Stufen / Quyền người mua theo 2 bậc ⚠️ HỌC THUỘC</h3>
<div class="note">⚠️ <b>HỌC THUỘC – Stufe 1 (vorrangig / ưu tiên):</b>
<ul>
  <li><b>Nachbesserung</b> (Reparatur) → sửa chữa hàng lỗi.</li>
  <li><b>Ersatzlieferung</b> (neue, mangelfreie Ware) → giao hàng mới thay thế.</li>
</ul>
Alle Kosten (Transport, Arbeit, Material) trägt der <b>Verkäufer</b>. Der Käufer muss nur <b>2 Nachbesserungen</b> akzeptieren; ist die Nacherfüllung erfolglos → Stufe 2. → Mọi chi phí do NGƯỜI BÁN chịu; chỉ phải chấp nhận 2 lần sửa, thất bại thì sang bậc 2.</div>
<div class="note">⚠️ <b>HỌC THUỘC – Stufe 2 (nachrangig / thứ cấp):</b>
<ul>
  <li><b>Minderung</b> (Herabsetzung des Kaufpreises) → giảm giá (giữ hàng, trả ít hơn).</li>
  <li><b>Rücktritt vom Kaufvertrag</b> → hủy hợp đồng, hoàn tiền; không bắt buộc nhận Gutschein; nếu lỗi <b>unerheblich</b> thì KHÔNG được hủy.</li>
  <li><b>Schadensersatz</b> → bồi thường, cần 2 điều kiện: người bán <b>schuldhaft</b> + đã đặt <b>angemessene Frist</b> và Frist đã hết.</li>
  <li><b>Ersatz vergeblicher Aufwendungen</b> → hoàn chi phí đã bỏ ra vô ích (thay cho Schadensersatz).</li>
</ul>
Mẹo nhớ số <b>2</b>: 2 Stufen – 2 Nachbesserungen – 2 Voraussetzungen cho Schadensersatz.</div>

<h3>4. Sachmangel vs Rechtsmangel – câu mẫu học thuộc</h3>
<div class="note">⚠️ <b>HỌC THUỘC – Musterformulierung:</b><br>'Es gibt <b>zwei Arten von Mängeln</b>: Sachmängel und Rechtsmängel.<br>Ein <b>Sachmangel</b> liegt vor, wenn die Ware <b>nicht der Vereinbarung entspricht</b> (falsche Art, Menge, Qualität).<br>Ein <b>Rechtsmangel</b> liegt vor, wenn der Verkäufer <b>kein Recht an der Ware</b> hat.' → Mẫu câu 'Ein … liegt vor, wenn …' dùng cho mọi định nghĩa luật.</div>

<h3>5. Mängelrüge an den Lieferanten / Thư khiếu nại ⚠️</h3>
<div class="note">⚠️ <b>HỌC THUỘC – Aufbau (A–B–M–F–F):</b> <b>A</b>nrede · <b>B</b>ezug (Datum, Lieferschein-Nr.) · <b>M</b>angel (Soll ↔ Ist: nêu cả cái đã ĐẶT và cái đã NHẬN) · <b>F</b>orderung (Stufe 1: Ersatzlieferung/Nachbesserung) · <b>F</b>rist ('bis zum …'). Kết bằng lời chào + tên/chức danh; ghi 'Ware steht zur Verfügung'. Mất điểm nhiều nhất ở phần <b>Mangel</b> và <b>Frist</b>.</div>
<p>Musterbrief: 'Sehr geehrte Damen und Herren, wir haben Ihre Lieferung vom 12.03. erhalten. Leider ist die Ware mangelhaft. Wir hatten 100 Flaschen Teinacher Genussschorle <b>Apfel</b> bestellt, geliefert wurden jedoch 100 Flaschen <b>Apfel-Johannisbeere</b>. Wir bitten Sie um <b>Ersatzlieferung der richtigen Ware bis zum 20.03.</b> … Mit freundlichen Grüßen.' → luôn nêu quyền Stufe 1 trước, Minderung/Rücktritt chỉ nêu sau khi Frist trôi qua vô kết quả.</p>

<h3>6. Antwortschema cho 7 Übungsfälle ⚠️ HỌC THUỘC</h3>
<div class="note">⚠️ <b>HỌC THUỘC – 5 bước làm bài tình huống:</b> 1) Welche <b>Kaufvertragsstörung</b>? (mangelhafte Lieferung · Lieferungsverzug · Nichtlieferung/Unmöglichkeit · Annahmeverzug · Zahlungsverzug); 2) Sach- oder Rechtsmangel + offen/versteckt/arglistig + Frist; 3) Stufe 1 (Nachbesserung/Ersatzlieferung, max. 2 Versuche); 4) Stufe 2 (Minderung, Rücktritt, Schadensersatz, vergebliche Aufwendungen); 5) <b>Verschulden prüfen</b>: höhere Gewalt → KEIN Schadensersatz; Verschulden → MIT Schadensersatz.</div>
<table>
  <tr><th>Fall</th><th>Störung / Verschulden</th><th>Rechte des Käufers</th></tr>
  <tr><td>1 · Klimaanlage (xe tải)</td><td>Sachmangel, <b>versteckt</b> (4 Wochen sau, không phát hiện được dù kiểm kỹ)</td><td>Nachbesserung/Ersatzlieferung, Frist <b>6 Monate</b> → erfolglos: Rücktritt</td></tr>
  <tr><td>2 · 40 TV, 5 xước vỏ</td><td>Sachmangel (Qualität), <b>offen</b></td><td><b>sofort/unmittelbar</b> rügen (stichprobenartig), Ersatzlieferung/Nachbesserung; chỉ 5 máy lỗi, 35 máy tốt vẫn trả tiền</td></tr>
  <tr><td>3 · Fitnessgerät (Montageanleitung)</td><td>Sachmangel qua Montage, <b>offen</b> (IKEA-Klausel)</td><td>korrekte Anleitung anfordern / Nachbesserung → Ersatzlieferung → Rücktritt; Verkäufer haftet cả khi chỉ sai hướng dẫn</td></tr>
  <tr><td>4 · Rieslingsekt trễ 1 ngày</td><td><b>Lieferungsverzug</b> (Fixgeschäft/Fixkauf, fahrlässig → có lỗi)</td><td><b>ohne Nachfrist</b>: Annahme verweigern, Rücktritt + Schadensersatz (Erstattung Kaufpreis + Lieferkosten)</td></tr>
  <tr><td>5 · Metzger, Hochwasser</td><td>Nichtlieferung/Unmöglichkeit, <b>höhere Gewalt → KEIN Verschulden</b></td><td>Vertrag <b>erlischt</b>, KEIN Schadensersatz, không phải trả tiền; Deckungskauf tự chịu chi phí</td></tr>
  <tr><td>6 · Austern hỏng (15 °C)</td><td>Schlechtleistung (Qualität), <b>offen</b>; Nachbesserung unmöglich</td><td>sofort rügen + Ersatzlieferung bis 8.4.; nếu trễ → Lieferverzug (schuldhaft) → Rücktritt + Schadensersatz</td></tr>
  <tr><td>7 · Schnellgarer thu hồi (Konstruktionsfehler)</td><td>Nichtlieferung/Lieferverzug, Verkäufer/Hersteller <b>zu vertreten</b></td><td>Nachfrist setzen → Rücktritt + Schadensersatz (Deckungskauf, entgangener Gewinn)</td></tr>
</table>
<div class="note">⚠️ <b>Câu chốt bằng tiếng Đức:</b><br>'Es liegt <b>ein Verschulden</b> des Lieferanten vor, da er <b>fahrlässig gehandelt</b> hat.' (Fall 4/6/7)<br>'Es liegt <b>kein Verschulden</b> des Lieferanten vor, da es sich um <b>höhere Gewalt</b> handelt.' (Fall 5). Ghi nhớ: Fall 5 vs Fall 7 = cùng loại rối loạn (không giao được), khác nguyên nhân → khác kết quả bồi thường.</div>`,
    qa: [
      {
        q: "Nennen Sie die 4 Arten von Sachmängeln bei einer mangelhaften Lieferung.",
        qVi: "Kể 4 loại lỗi hàng hóa (Sachmangel) khi giao hàng bị lỗi.",
        a: "Mangel in der ART (falsche Ware), in der GÜTE/Qualität (schlechte/verdorbene Ware), in der MENGE (zu wenig/zu viel geliefert) und Rechtsmangel (Ware gehört einem Dritten, z. B. gestohlen).",
        aVi: "Lỗi về LOẠI (giao sai hàng), về CHẤT LƯỢNG (hàng kém/hỏng), về SỐ LƯỢNG (giao thiếu/thừa) và lỗi pháp lý – Rechtsmangel (hàng thuộc về người khác, vd. hàng trộm).",
        why: "Art · Güte · Menge = Sachmängel; Rechtsmangel là loại riêng. Nhớ nhóm 3+1.",
        src: "sla-lf2.md trang 43 · KT Warenwirtschaft Thema 14 (Mängel)"
      },
      {
        q: "Was muss der Käufer bei einem versteckten Mangel (Salmonellen in TK-Ware) tun?",
        qVi: "Với lỗi ẩn (vi khuẩn salmonella trong hàng đông lạnh) người mua phải làm gì?",
        a: "Sofort nach Entdeckung rügen (unverzügliche Mängelrüge). Bei offenen Mängeln muss sofort bei der Warenannahme gerügt werden, bei versteckten Mängeln sofort nach dem Erkennen.",
        aVi: "Phải khiếu nại ngay khi phát hiện (Mängelrüge kịp thời). Lỗi lộ rõ → khiếu nại ngay khi nhận hàng; lỗi ẩn → ngay khi phát hiện ra.",
        why: "Offener Mangel = ngay lúc nhận; versteckter Mangel = ngay khi phát hiện. Trễ thì mất quyền.",
        src: "sla-lf2.md trang 44–45 · Thema 14 (Mängelrüge)"
      },
      {
        q: "Welche 4 Rechte hat der Käufer bei einer Schlechtleistung (Sachmangel)?",
        qVi: "Người mua có 4 quyền gì khi hàng bị lỗi (Sachmangel)?",
        a: "1) Nacherfüllung (Nachbesserung oder Ersatzlieferung), 2) Minderung (Preisnachlass), 3) Rücktritt vom Vertrag, 4) Schadensersatz.",
        aVi: "1) Yêu cầu khắc phục (sửa hoặc giao hàng thay thế), 2) Giảm giá, 3) Rút khỏi hợp đồng, 4) Đòi bồi thường thiệt hại.",
        why: "Khác với Lieferverzug (LS09): ở đây hàng ĐÃ giao nhưng bị lỗi. Nacherfüllung luôn là quyền đầu tiên.",
        src: "sla-lf2.md trang 44 · Thema 14 (Rechte des Käufers bei Sachmängeln)"
      },
      {
        q: "Wie kontrolliert man die Temperatur von Kühl- und TK-Ware bei der Warenannahme?",
        qVi: "Kiểm tra nhiệt độ hàng lạnh và hàng đông khi nhận như thế nào?",
        a: "Kühl-Produkte müssen 2–7 °C haben, Tiefkühlware unter −17 °C. Bei Überschreitung ist die Kühlkette unterbrochen → Mangel in der Güte, Annahme verweigern oder rügen.",
        aVi: "Hàng lạnh phải 2–7 °C, hàng đông dưới −17 °C. Nếu vượt ngưỡng là đứt chuỗi lạnh → lỗi chất lượng, từ chối nhận hoặc khiếu nại.",
        why: "Kühlkette bị đứt → Güte-Mangel. Con số 2–7 °C / dưới −17 °C hay bị hỏi trong KA.",
        src: "KT bắt buộc §4 · Warenannahme-Kontrolle (Fleisch + Nhiệt độ)"
      }
    ],
    quiz: [
      {
        q: "Der Verkäufer bietet gestohlenen Safran an. Welcher Mangel liegt vor?",
        options: [
          "Sachmangel in der Art",
          "Rechtsmangel",
          "offener Sachmangel",
          "Werbeversprechen"
        ],
        answer: 1,
        explain: "Rechtsmangel: hàng không thuộc sở hữu hợp pháp của người bán (Eigentum/Besitz beeinträchtigt)."
      },
      {
        q: "Innerhalb welcher Frist muss ein versteckter Mangel gerügt werden?",
        options: ["unverzüglich/sofort", "6 Monate", "2 Jahre", "30 Jahre"],
        answer: 1,
        explain: "Offener Mangel = sofort; versteckter Mangel = 6 Monate; arglistige Täuschung = 30 Jahre."
      },
      {
        q: "Welche Rechte gehören zur Stufe 1 (vorrangig) bei einem Sachmangel?",
        options: [
          "Minderung und Rücktritt",
          "Nachbesserung und Ersatzlieferung",
          "Schadensersatz und Rücktritt",
          "Minderung und Schadensersatz"
        ],
        answer: 1,
        explain: "Stufe 1 = Nacherfüllung: Nachbesserung (sửa) hoặc Ersatzlieferung (đổi hàng). Stufe 2 mới có Minderung/Rücktritt/Schadensersatz."
      },
      {
        q: "Wer trägt die Kosten der Nacherfüllung (Transport, Arbeit, Material)?",
        options: ["der Käufer", "der Verkäufer", "beide je zur Hälfte", "der Spediteur"],
        answer: 1,
        explain: "Người bán (Verkäufer) chịu toàn bộ chi phí sửa chữa/giao thay thế."
      },
      {
        q: "Metzger kann wegen Hochwasser nicht liefern (Schlachthaus überflutet). Welche Folge?",
        options: [
          "Rücktritt + Schadensersatz, weil der Verkäufer schuld ist",
          "höhere Gewalt: Vertrag erlischt, kein Schadensersatz, kein Bezahlen",
          "Nachbesserung innerhalb von 6 Monaten",
          "Minderung des Kaufpreises"
        ],
        answer: 1,
        explain: "Höhere Gewalt = bất khả kháng → không có lỗi → hợp đồng chấm dứt, không bồi thường, không phải trả tiền (Deckungskauf tự chịu)."
      },
      {
        q: "Der Sekt für die Geburtstagsfeier wird einen Tag zu spät geliefert (Fixgeschäft). Was gilt?",
        options: [
          "Nachfrist von 6 Monaten setzen",
          "ohne Nachfrist: Rücktritt + Schadensersatz möglich",
          "nur Minderung, kein Rücktritt",
          "kein Recht, da Ware mangelfrei ist"
        ],
        answer: 1,
        explain: "Beim Fixgeschäft ist die Leistung nach dem Termin wertlos → keine Nachfrist nötig, sofort Rücktritt + Schadensersatz."
      },
      {
        q: "Wann kann der Käufer zusätzlich Schadensersatz verlangen?",
        options: [
          "immer sofort bei jedem Mangel",
          "wenn der Verkäufer schuldhaft handelte und eine gesetzte Frist abgelaufen ist",
          "nur bei Rechtsmängeln",
          "nie, Schadensersatz gibt es nicht"
        ],
        answer: 1,
        explain: "2 Voraussetzungen: Verkäufer schuldhaft + angemessene Frist zur Nacherfüllung gesetzt und abgelaufen."
      }
    ],
    vokabeln: [
      { de: "die Schlechtleistung", vi: "thực hiện hợp đồng kém, giao hàng lỗi" },
      { de: "die Mängelrüge", vi: "thư/việc khiếu nại lỗi hàng" },
      { de: "der Sachmangel", vi: "lỗi về hàng hoá" },
      { de: "der Rechtsmangel", vi: "lỗi pháp lý (không có quyền với hàng)" },
      { de: "die Falschlieferung", vi: "giao sai hàng (Mangel in der Art)" },
      { de: "der Qualitätsmangel", vi: "lỗi chất lượng" },
      { de: "der offene Mangel", vi: "lỗi thấy ngay" },
      { de: "der versteckte Mangel", vi: "lỗi ẩn" },
      { de: "die arglistige Täuschung", vi: "gian dối cố ý" },
      { de: "unverzüglich", vi: "ngay lập tức, không chậm trễ" },
      { de: "die Gewährleistung", vi: "bảo hành theo luật" },
      { de: "die Nacherfüllung", vi: "thực hiện lại hợp đồng (sửa/đổi)" },
      { de: "die Nachbesserung", vi: "sửa chữa khắc phục" },
      { de: "die Ersatzlieferung", vi: "giao hàng thay thế" },
      { de: "die Minderung", vi: "giảm giá" },
      { de: "der Rücktritt vom Kaufvertrag", vi: "hủy hợp đồng" },
      { de: "der Schadensersatz", vi: "bồi thường thiệt hại" },
      { de: "höhere Gewalt", vi: "bất khả kháng (thiên tai)" },
      { de: "das Fixgeschäft / der Fixkauf", vi: "giao dịch có kỳ hạn cố định" },
      { de: "der Deckungskauf", vi: "mua hàng thay thế ở nơi khác" }
    ]
  }
]);
