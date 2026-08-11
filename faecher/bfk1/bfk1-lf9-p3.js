/* BfK-1 · LF9 · LS04 (nguồn: lf9.md) */
window.__LF9 = (window.__LF9||[]).concat([
  {
    id: "lf9-ls04",
    icon: "😤",
    name: "LS04 · Reklamationen bei der Zahlung",
    nameVi: "Xử lý khiếu nại khi thanh toán",
    desc: "Beschwerdemanagement: phân biệt khiếu nại có/không căn cứ, quy trình LEARN 10 bước xử lý và 10 bước phòng tránh lỗi khi thanh toán.",
    source: "lf9.md · trang 17–21",
    theory: `
<h3>Situation / Tình huống</h3>
<p>Số lượng <b>Reklamationen</b> (khiếu nại) tháng trước tăng <b>10 %</b>. Nhân viên không chắc phải phản ứng thế nào khi có khiếu nại trong quá trình <b>Zahlungsabwicklung</b> (thanh toán). Bạn làm trong nhóm <b>Reklamationsmanagement</b> (quản lý khiếu nại), nhiệm vụ là hạ <b>Reklamationsquote</b> (tỷ lệ khiếu nại) và soạn <b>Handlungsanweisungen</b> (hướng dẫn xử lý) cho nhân viên.</p>

<div class="note">⚠️ <b>HỌC THUỘC – 2 Definitionen:</b>
<ul>
  <li><b>Reklamation</b> = <b>Beanstandung eines Sachmangels</b> an einer Ware oder Dienstleistung <b>durch den Käufer</b>; tritt in Kraft bei <b>Defekt</b>, <b>Beschädigung</b> oder <b>Falschlieferung</b>.<br>→ Khiếu nại là việc <b>người mua phản ánh một lỗi/khuyết điểm</b> của hàng hóa hoặc dịch vụ; có hiệu lực khi có <b>lỗi kỹ thuật</b>, <b>hư hỏng</b> hoặc <b>giao sai hàng</b>.</li>
  <li><b>Reklamationsmanagement</b> = <b>alle Maßnahmen</b>, die ein Unternehmen ergreift, um <b>Kundenbeschwerden effizient zu bearbeiten</b> und die <b>Kundenzufriedenheit</b> trotz negativer Erfahrungen <b>aufrechtzuerhalten oder wiederherzustellen</b>. Ziel: <b>Fehlerursachen identifizieren</b> und <b>Abstellmaßnahmen</b> einleiten.<br>→ Quản lý khiếu nại gồm <b>mọi biện pháp</b> doanh nghiệp áp dụng để <b>xử lý khiếu nại của khách hiệu quả</b> và <b>giữ hoặc lấy lại sự hài lòng</b> của khách dù đã có trải nghiệm xấu. Mục tiêu: <b>tìm nguyên nhân lỗi</b> và <b>đưa ra biện pháp khắc phục</b>.</li>
</ul></div>

<h3>Aufträge / Nhiệm vụ</h3>
<ul>
  <li>① <b>Ordnen Sie die Reklamationen</b> zu: <b>berechtigt oder unberechtigt</b> (Anlage 1, Vorgabe 1).<br>→ Phân loại các khiếu nại là <b>có căn cứ / không có căn cứ</b>.</li>
  <li>② <b>Verfassen Sie eine Handlungsanweisung</b> zum <b>Umgang mit Reklamationen</b> (Vorgabe 2) und zur <b>Vermeidung von Fehlern</b> (Vorgabe 3) bei der Zahlungsabwicklung.<br>→ Soạn hướng dẫn về cách <b>xử lý khiếu nại</b> và cách <b>phòng tránh lỗi</b> khi thanh toán.</li>
</ul>

<h3>Anlage 1 – Reklamationsliste: berechtigt (✓) oder unberechtigt (✗)?</h3>
<table>
<tr><th>Datum</th><th>Grund der Reklamation</th><th>Musterlösung</th><th>Giải thích (VN)</th></tr>
<tr><td>01.07.</td><td>Gericht schmeckt nicht, <b>entspricht aber der Beschreibung</b> auf der Speisekarte</td><td>✗ unberechtigt</td><td>Món không ngon nhưng <b>đúng như mô tả</b> trên menu → chỉ là khẩu vị cá nhân, không phải lỗi (kein Sachmangel)</td></tr>
<tr><td>03.07.</td><td>Die <b>Tagessuppe</b> wurde <b>lauwarm</b> serviert</td><td>✓ berechtigt</td><td>Súp dọn ra <b>nguội/âm ấm</b> → Schlechtleistung → có quyền Nacherfüllung</td></tr>
<tr><td>04.07.</td><td>Der <b>Rechnungsbetrag</b> wurde <b>doppelt abgebucht</b></td><td>✓ berechtigt</td><td>Số tiền hóa đơn bị <b>trừ hai lần</b> → lỗi thanh toán, phải hoàn tiền</td></tr>
<tr><td>04.07.</td><td>Gäste reklamieren bereits bestelltes Hauptgericht, da es auf der <b>Terrasse</b> angefangen hat zu <b>regnen</b></td><td>✗ unberechtigt</td><td>Trời <b>mưa</b> không phải lỗi của nhà hàng; món đã gọi rồi → không được hủy</td></tr>
<tr><td>05.07.</td><td>Im <b>Beilagensalat</b> ist ein <b>Haar</b></td><td>✓ berechtigt</td><td>Có <b>sợi tóc</b> trong salad kèm → hàng bị lỗi (Sachmangel), đổi món mới</td></tr>
<tr><td>07.07.</td><td>Die Rechnung enthält <b>nicht bestellte Positionen</b></td><td>✓ berechtigt</td><td>Hóa đơn có <b>món khách không gọi</b> → phải sửa hóa đơn</td></tr>
<tr><td>08.07.</td><td>Ein Gast bestellte <b>versehentlich das falsche Gericht</b> und möchte es nach dem Servieren <b>kostenlos tauschen</b></td><td>✗ unberechtigt</td><td>Khách <b>tự gọi sai</b>, muốn đổi <b>miễn phí</b> sau khi đã dọn ra → lỗi của khách (Kulanz thì được, quyền thì không)</td></tr>
<tr><td>08.07.</td><td>Ein Gast bestellt eine <b>kleine Portion</b> Zwiebelrostbraten und reklamiert dann die <b>zu kleine Portionsgröße</b></td><td>✗ unberechtigt</td><td>Khách <b>tự đặt phần nhỏ</b> rồi kêu phần nhỏ quá → đúng như đã gọi</td></tr>
<tr><td>09.07.</td><td>In der <b>Vorspeise</b> ist ein <b>Allergen</b> enthalten, das <b>nicht auf der Speisekarte vermerkt</b> ist</td><td>✓ berechtigt</td><td><b>Chất gây dị ứng</b> không được ghi trên menu → vi phạm nghĩa vụ ghi chú (Kennzeichnungspflicht)</td></tr>
<tr><td>10.07.</td><td>Ein Gast reklamiert, da er zu lange warten musste. Die <b>Wartezeit betrug 20 Minuten</b></td><td>✗ unberechtigt</td><td>Chờ <b>20 phút</b> là bình thường (Lieferverzug chỉ tính từ khoảng <b>1½ giờ</b>)</td></tr>
</table>

<div class="note">⚠️ <b>Merksatz – nguyên tắc phân biệt:</b>
<ul>
  <li><b>berechtigt</b> = có <b>Sachmangel</b> thật (Defekt, Beschädigung, Falschlieferung, Fehler bei Zahlung/Rechnung, fehlende Kennzeichnung).<br>→ Có lỗi vật chất thật sự thì có căn cứ.</li>
  <li><b>unberechtigt</b> = lỗi hoặc khẩu vị của khách, thời tiết, hoặc dịch vụ vẫn <b>wie beschrieben/wie bestellt</b>.<br>→ Lỗi của khách, thời tiết, hoặc đúng như mô tả/đã gọi thì không có căn cứ.</li>
</ul></div>

<h3>Vorgabe 1 – Tabelle berechtigt ↔ unberechtigt</h3>
<div class="note">⚠️ <b>Achtung (nguyên tắc dễ ra thi):</b><br>Nach <b>„außen“</b> sind nahezu <b>alle Reklamationen berechtigt</b>, d. h. <b>der Gast hat Recht</b>. Nach <b>„innen“</b> muss <b>jede Reklamation dokumentiert und ausgewertet</b> werden, um <b>Schwachstellen</b> und/oder <b>Missbrauch aufzudecken</b>.<br>→ Ra ngoài (với khách): gần như <b>mọi khiếu nại đều được coi là có cơ sở</b>, tức <b>khách luôn đúng</b>. Vào trong (nội bộ): <b>mọi khiếu nại phải được ghi lại và phân tích</b> để phát hiện <b>điểm yếu</b> quy trình và/hoặc <b>hành vi lạm dụng</b>.</div>
<table>
<tr><th>Berechtigte Reklamationen (Sachmangel)</th><th>Unberechtigte Reklamationen</th></tr>
<tr><td>Tagessuppe lauwarm serviert</td><td>Gericht schmeckt nicht, entspricht aber der Beschreibung</td></tr>
<tr><td>Rechnungsbetrag doppelt abgebucht</td><td>Regen auf der Terrasse bei bereits bestelltem Gericht</td></tr>
<tr><td>Haar im Beilagensalat</td><td>Gast bestellte versehentlich das falsche Gericht</td></tr>
<tr><td>Nicht bestellte Positionen auf der Rechnung</td><td>Kleine Portion bestellt, dann Portionsgröße reklamiert</td></tr>
<tr><td>Nicht gekennzeichnetes Allergen</td><td>Wartezeit von nur 20 Minuten</td></tr>
</table>

<h3>Vorgabe 2 – Umgang mit Reklamationen (10 Schritte, Musterlösung)</h3>
<table>
<tr><th>Nr.</th><th>Handlungsanweisung</th><th>Tiếng Việt</th></tr>
<tr><td>1</td><td>Den Gast <b>freundlich begrüßen</b> und <b>ruhig bleiben</b>.</td><td>Chào khách thân thiện và giữ bình tĩnh.</td></tr>
<tr><td>2</td><td>Dem Gast <b>aufmerksam zuhören</b> (<b>Listen</b>).</td><td>Lắng nghe khách một cách chú tâm.</td></tr>
<tr><td>3</td><td><b>Verständnis und Empathie zeigen</b> (<b>Empathy</b>).</td><td>Thể hiện sự thông cảm và đồng cảm.</td></tr>
<tr><td>4</td><td>Sich für die <b>Unannehmlichkeiten entschuldigen</b> (<b>Apologize</b>).</td><td>Xin lỗi vì sự bất tiện.</td></tr>
<tr><td>5</td><td>Die Reklamation und den <b>Zahlungsbeleg/Rechnung sorgfältig prüfen</b> (<b>Notice</b>).</td><td>Kiểm tra kỹ khiếu nại và chứng từ thanh toán/hóa đơn.</td></tr>
<tr><td>6</td><td>Die <b>Ursache des Problems feststellen</b>.</td><td>Xác định nguyên nhân của vấn đề.</td></tr>
<tr><td>7</td><td>Eine <b>passende Lösung anbieten</b> (z. B. <b>Rechnung korrigieren</b> oder <b>Rückerstattung veranlassen</b>).</td><td>Đưa ra giải pháp phù hợp (sửa hóa đơn hoặc hoàn tiền).</td></tr>
<tr><td>8</td><td>Die Lösung dem Gast <b>freundlich und verständlich erklären</b> (<b>Reaction</b>).</td><td>Giải thích giải pháp cho khách một cách thân thiện, dễ hiểu.</td></tr>
<tr><td>9</td><td>Die Reklamation <b>dokumentieren</b> und <b>ggf. den Vorgesetzten informieren</b>.</td><td>Ghi lại khiếu nại và nếu cần thì báo cấp trên.</td></tr>
<tr><td>10</td><td>Sich beim Gast <b>bedanken</b> und ihn <b>freundlich verabschieden</b>.</td><td>Cảm ơn khách và tiễn khách thân thiện.</td></tr>
</table>

<div class="note">⚠️ <b>Merkwort: L E A R N</b> (từ khóa để nhớ)
<table>
<tr><th>L</th><th>E</th><th>A</th><th>R</th><th>N</th></tr>
<tr><td><b>L</b>isten</td><td><b>E</b>mpathy</td><td><b>A</b>pologize</td><td><b>R</b>eaction</td><td><b>N</b>otice</td></tr>
<tr><td>Lắng nghe</td><td>Đồng cảm</td><td>Xin lỗi</td><td>Phản hồi / giải pháp</td><td>Ghi nhận, kiểm tra</td></tr>
</table>
Lưu ý: bước 5 (prüfen) thực chất là <b>N = Notice</b>, bước 8 (erklären) là <b>R = Reaction</b> — thứ tự chữ LEARN vẫn giữ nguyên.</div>

<h3>Vorgabe 3 – Vermeidung von Fehlern (10 Punkte)</h3>
<p>Khác Vorgabe 2: đây là cách <b>TRÁNH lỗi</b> khi thanh toán (Vorgabe 2 là cách XỬ LÝ khi khách đã khiếu nại).</p>
<table>
<tr><th>Nr.</th><th>Handlungsanweisung</th><th>Tiếng Việt</th></tr>
<tr><td>1</td><td>Bestellung sofort und vollständig im Kassensystem erfassen.</td><td>Nhập order vào máy tính tiền ngay và đầy đủ.</td></tr>
<tr><td>2</td><td>Bestellung beim Gast wiederholen (Rückbestätigung).</td><td>Nhắc lại order cho khách xác nhận.</td></tr>
<tr><td>3</td><td>Tischnummer und Gästezahl korrekt eingeben.</td><td>Nhập đúng số bàn và số khách.</td></tr>
<tr><td>4</td><td>Nachbestellungen und Storni sofort einbuchen.</td><td>Ghi ngay món gọi thêm và món huỷ.</td></tr>
<tr><td>5</td><td>Rechnung vor dem Vorlegen selbst kontrollieren (Positionen, Preise, Steuersätze 7 %/19 %).</td><td>Tự kiểm tra hoá đơn trước khi mang ra (món, giá, thuế).</td></tr>
<tr><td>6</td><td>Pflichtangaben prüfen (Datum, Name/Anschrift, Steuernummer/USt-IdNr., Vorgangsbeginn und -ende).</td><td>Kiểm tra các thông tin bắt buộc trên hoá đơn.</td></tr>
<tr><td>7</td><td>Getrennte Rechnungen vor dem Kassieren abklären.</td><td>Hỏi trước khách muốn tính chung hay tách.</td></tr>
<tr><td>8</td><td>Betrag laut nennen, Geld nachzählen, Wechselgeld laut zurückgeben.</td><td>Đọc to số tiền, đếm lại tiền, trả tiền thối và đọc to.</td></tr>
<tr><td>9</td><td>Bei Kartenzahlung Betrag am Terminal zeigen, Beleg abwarten und aushändigen (Belegausgabepflicht).</td><td>Thanh toán thẻ: cho khách xem số tiền trên máy, chờ và đưa hoá đơn.</td></tr>
<tr><td>10</td><td>Kassenabschluss täglich durchführen, Differenzen dokumentieren und melden.</td><td>Chốt két hằng ngày, ghi lại và báo chênh lệch.</td></tr>
</table>`,
    qa: [
      { q: "Wie sollten Sie sich bei einer Reklamation gegenüber dem Gast zu Beginn verhalten?", qVi: "Khi khách khiếu nại, ban đầu bạn nên cư xử thế nào?", a: "Den Gast freundlich begrüßen, ruhig bleiben und ihm aufmerksam zuhören (Listen). Niemals mit „Nein“ oder Rechtfertigung beginnen.", aVi: "Chào khách thân thiện, giữ bình tĩnh và lắng nghe chú tâm (Listen). Tuyệt đối không mở đầu bằng „Nein“ hay biện hộ.", why: "Bình tĩnh + lắng nghe là bước 1–2 của LEARN, giúp khách cảm thấy được tôn trọng và hạ nhiệt.", src: "lf9.md trang 20" },
      { q: "Was bedeutet das Merkwort LEARN im Reklamationsmanagement?", qVi: "Từ khóa LEARN nghĩa là gì trong quản lý khiếu nại?", a: "Listen (zuhören), Empathy (Empathie zeigen), Apologize (entschuldigen), Reaction (Lösung erklären), Notice (Reklamation/Beleg prüfen).", aVi: "Listen (lắng nghe), Empathy (đồng cảm), Apologize (xin lỗi), Reaction (giải thích giải pháp), Notice (kiểm tra khiếu nại/chứng từ).", why: "LEARN là khung 5 bước cốt lõi để nhớ toàn bộ quy trình 10 bước.", src: "lf9.md trang 20" },
      { q: "Wann ist eine Reklamation berechtigt, wann unberechtigt?", qVi: "Khi nào khiếu nại có căn cứ, khi nào không?", a: "Berechtigt bei echtem Sachmangel (Defekt, Beschädigung, Falschlieferung, Zahlungs-/Rechnungsfehler, fehlende Kennzeichnung). Unberechtigt bei Geschmack, Wetter oder wenn Ware wie beschrieben/bestellt ist.", aVi: "Có căn cứ khi có lỗi vật chất thật (hỏng, hư hại, giao sai, lỗi thanh toán/hóa đơn, thiếu ghi chú). Không căn cứ khi do khẩu vị, thời tiết, hoặc hàng đúng như mô tả/đã gọi.", why: "Đây là tiêu chí phân loại trong Anlage 1 / Vorgabe 1.", src: "lf9.md trang 18" },
      { q: "Warum darf man einen Gast nie mit „Nein“ abweisen?", qVi: "Vì sao không được từ chối khách bằng „Nein“?", a: "Nach „außen“ hat der Gast fast immer Recht; ein sofortiges „Nein“ zerstört die Kundenzufriedenheit. Man zeigt Empathie, entschuldigt sich und sucht eine Lösung – die Prüfung erfolgt nach „innen“.", aVi: "Đối ngoại khách gần như luôn đúng; nói „Nein“ ngay sẽ phá hủy sự hài lòng. Nên thể hiện đồng cảm, xin lỗi và tìm giải pháp – việc kiểm tra làm nội bộ.", why: "Nguyên tắc „außen berechtigt – innen dokumentieren/auswerten“.", src: "lf9.md trang 19" },
      { q: "Welche Lösung bietet man bei einem doppelt abgebuchten Rechnungsbetrag an?", qVi: "Với hóa đơn bị trừ tiền hai lần thì đưa giải pháp gì?", a: "Rechnung korrigieren bzw. Rückerstattung veranlassen, den Vorgang dokumentieren und ggf. den Vorgesetzten informieren.", aVi: "Sửa hóa đơn hoặc tiến hành hoàn tiền, ghi lại sự việc và nếu cần thì báo cấp trên.", why: "Là ví dụ „passende Lösung anbieten“ ở bước 7 và dokumentieren ở bước 9.", src: "lf9.md trang 20" }
    ],
    quiz: [
      { q: "Was ist der erste Schritt beim Umgang mit einer Reklamation?", options: ["Sofort widersprechen", "Freundlich begrüßen und ruhig bleiben", "Den Vorgesetzten rufen", "Die Rechnung zerreißen"], answer: 1, explain: "Schritt 1: Gast freundlich begrüßen und ruhig bleiben." },
      { q: "Wofür steht das „A“ in LEARN?", options: ["Antworten", "Apologize (entschuldigen)", "Auswerten", "Abbuchen"], answer: 1, explain: "A = Apologize = sich für die Unannehmlichkeiten entschuldigen." },
      { q: "Welche Reklamation ist berechtigt?", options: ["Gericht schmeckt nicht, ist aber wie beschrieben", "Regen auf der Terrasse", "Rechnungsbetrag doppelt abgebucht", "Wartezeit von 20 Minuten"], answer: 2, explain: "Doppelte Abbuchung = echter Zahlungsfehler = Sachmangel = berechtigt." },
      { q: "Ein Allergen ist nicht auf der Speisekarte vermerkt. Die Reklamation ist …", options: ["unberechtigt", "berechtigt", "reine Kulanz", "Geschmackssache"], answer: 1, explain: "Verstoß gegen die Kennzeichnungspflicht → berechtigt." },
      { q: "Wie behandelt man Reklamationen „nach innen“?", options: ["Ignorieren", "Dokumentieren und auswerten", "Dem Gast sagen, er hat unrecht", "Sofort Geld erstatten"], answer: 1, explain: "Nach innen: jede Reklamation dokumentieren und auswerten, um Schwachstellen/Missbrauch aufzudecken." },
      { q: "Was gehört zur Vermeidung von Fehlern bei der Zahlung?", options: ["Bestellung nur mündlich merken", "Rechnung erst nach dem Vorlegen prüfen", "Kassenabschluss täglich, Differenzen dokumentieren", "Wechselgeld ohne Nachzählen geben"], answer: 2, explain: "Täglicher Kassenabschluss mit dokumentierten Differenzen beugt Fehlern vor." }
    ],
    vokabeln: [
      { de: "die Reklamation", vi: "khiếu nại" },
      { de: "die Beanstandung", vi: "sự phản ánh, chê trách" },
      { de: "der Sachmangel", vi: "lỗi vật chất của hàng hóa" },
      { de: "die Falschlieferung", vi: "giao sai hàng" },
      { de: "die Reklamationsquote", vi: "tỷ lệ khiếu nại" },
      { de: "die Handlungsanweisung", vi: "chỉ dẫn hành động" },
      { de: "die Kundenzufriedenheit", vi: "sự hài lòng của khách" },
      { de: "berechtigt / unberechtigt", vi: "có / không có căn cứ" },
      { de: "aufmerksam zuhören", vi: "lắng nghe chú tâm" },
      { de: "sich entschuldigen", vi: "xin lỗi" },
      { de: "die Unannehmlichkeit", vi: "sự bất tiện" },
      { de: "der Zahlungsbeleg", vi: "chứng từ thanh toán" },
      { de: "die Rückerstattung veranlassen", vi: "tiến hành hoàn tiền" },
      { de: "dokumentieren", vi: "ghi chép lại" },
      { de: "auswerten", vi: "phân tích, đánh giá" },
      { de: "der Kassenabschluss", vi: "chốt két" }
    ]
  }
]);
