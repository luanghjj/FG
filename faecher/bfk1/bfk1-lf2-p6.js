/* BfK-1 · LF2 · LS11 – Warenpflege und Schädlingsbefall
 * Nguồn: tự soạn (không có trong Bfk-SLA-lf2.pdf). Đối chiếu kiến thức chuẩn:
 * LMHV / VO (EG) 852/2004, HACCP, Lehrbuch „Der junge Koch / Die junge Köchin“ (Kap. Lagerung).
 */
window.__LF2 = (window.__LF2||[]).concat([
  {
    id: "lf2-ls11",
    icon: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><ellipse cx=\"12\" cy=\"14\" rx=\"4\" ry=\"6\"/><path d=\"M12 8V4\"/><path d=\"M9 3l3 1 3-1\"/><path d=\"M8 12H4\"/><path d=\"M8 16H4\"/><path d=\"M16 12h4\"/><path d=\"M16 16h4\"/></svg>",
    name: "LS11 · Warenpflege und Schädlingsbefall",
    nameVi: "Chăm sóc hàng lưu kho & sinh vật gây hại",
    desc: "Lagerpflege, Verderbsursachen, Vorratsschädlinge erkennen, Vorbeugung & Bekämpfung.",
    source: "Eigene Zusammenfassung (nicht im Bfk-SLA-lf2) · LMHV, VO (EG) 852/2004, HACCP",
    theory: `
<h3>Situation / Tình huống</h3>
<p>Sie sind Auszubildende/r im <b>Hotel Resort Aussicht Feldberg KG</b> und arbeiten im <b>Zentrallager/Magazin</b>. Bei der wöchentlichen Kontrolle entdecken Sie im Trockenlager <b>kleine Löcher in einer Mehltüte</b>, <b>Gespinste</b> im Grieß und <b>Kotspuren</b> hinter dem Regal. Herr Sebastian bittet Sie, einen <b>Plan zur Warenpflege</b> und ein <b>Vorgehen bei Schädlingsbefall</b> zu erstellen.</p>
<p>→ Bạn là học viên ở kho trung tâm của khách sạn Feldberg. Khi kiểm tra hàng tuần, bạn thấy túi bột mì bị thủng lỗ nhỏ, có tơ mạng trong bột semolina và phân chuột sau kệ. Anh Sebastian nhờ bạn lập kế hoạch chăm sóc hàng lưu kho và quy trình xử lý khi có sinh vật gây hại.</p>

<h3>A. Was ist Warenpflege? / Chăm sóc hàng lưu kho là gì?</h3>
<p><b>Warenpflege</b> umfasst alle Maßnahmen, die die <b>Qualität</b> der eingelagerten Waren bis zum Verbrauch <b>erhalten</b> und <b>Verderb</b> sowie <b>Schwund</b> verhindern.</p>
<p>→ Chăm sóc hàng lưu kho là mọi biện pháp giữ chất lượng hàng đã nhập kho cho đến khi dùng, ngăn hư hỏng và hao hụt.</p>
<table>
<tr><th>Maßnahme</th><th>Nghĩa Việt</th><th>So geht's</th></tr>
<tr><td><b>FIFO-Prinzip</b></td><td>Nhập trước xuất trước</td><td>Neue Ware nach hinten, ältere Ware nach vorne stellen.</td></tr>
<tr><td><b>FEFO-Prinzip</b></td><td>Hết hạn trước xuất trước</td><td>Ware mit dem kürzesten MHD/Verbrauchsdatum zuerst verbrauchen.</td></tr>
<tr><td><b>Temperatur & Luftfeuchte kontrollieren</b></td><td>Kiểm tra nhiệt độ & độ ẩm</td><td>Täglich messen und im <b>Temperaturprotokoll</b> dokumentieren.</td></tr>
<tr><td><b>MHD-Kontrolle</b></td><td>Kiểm tra hạn dùng</td><td>Regelmäßig prüfen, abgelaufene Ware aussortieren.</td></tr>
<tr><td><b>Sichtkontrolle</b></td><td>Kiểm tra bằng mắt</td><td>Verpackungen, Schimmel, Gerüche, Schädlingsspuren prüfen.</td></tr>
<tr><td><b>Ordnung & Sauberkeit</b></td><td>Ngăn nắp & sạch sẽ</td><td>Nichts auf den Boden stellen, Regale mit Abstand zur Wand, Reinigungsplan einhalten.</td></tr>
<tr><td><b>Umfüllen</b></td><td>Chuyển sang hộp</td><td>Angebrochene Ware in <b>saubere, verschließbare Behälter</b> umfüllen und beschriften.</td></tr>
<tr><td><b>Lüften</b></td><td>Thông gió</td><td>Kartoffeln, Zwiebeln, Obst und Gemüse brauchen Luftzirkulation.</td></tr>
</table>
<div class="note"><b>Merke:</b> <b>Kartons</b> gehören nicht ins Lager. Sie bringen Schmutz, Feuchtigkeit und Schädlinge (z. B. Schaben-Eier) mit.<br>→ Không để thùng carton trong kho: carton mang bụi, ẩm và sinh vật gây hại (vd. trứng gián) vào.</div>

<h3>B. Ursachen für Verderb / Nguyên nhân hàng hư hỏng</h3>
<table>
<tr><th>Ursache</th><th>Nghĩa Việt</th><th>Beispiel</th></tr>
<tr><td><b>Mikroorganismen</b> (Bakterien, Hefen, Schimmelpilze)</td><td>Vi sinh vật (vi khuẩn, nấm men, nấm mốc)</td><td>Schimmel auf Brot, saure Milch</td></tr>
<tr><td><b>Enzyme</b> (lebensmitteleigen)</td><td>Enzym có sẵn trong thực phẩm</td><td>braune Äpfel, überreife Bananen</td></tr>
<tr><td><b>Sauerstoff</b></td><td>Oxy</td><td>ranziges Fett</td></tr>
<tr><td><b>Licht</b></td><td>Ánh sáng</td><td>Vitaminverlust, grüne Kartoffeln (Solanin)</td></tr>
<tr><td><b>Wärme</b></td><td>Nhiệt</td><td>schnellere Vermehrung von Keimen</td></tr>
<tr><td><b>Feuchtigkeit</b></td><td>Độ ẩm</td><td>verklumpter Zucker, Schimmel im Mehl</td></tr>
<tr><td><b>Schädlinge</b></td><td>Sinh vật gây hại</td><td>Mehlmotten, Mäuse, Schaben</td></tr>
</table>

<h3>C. Vorratsschädlinge erkennen / Nhận biết sinh vật gây hại</h3>
<table>
<tr><th>Schädling</th><th>Nghĩa Việt</th><th>Befallene Ware</th><th>Erkennungszeichen</th></tr>
<tr><td><b>Mehlmotte / Dörrobstmotte</b></td><td>Bướm bột / bướm hoa quả khô</td><td>Mehl, Grieß, Nüsse, Trockenobst</td><td><b>Gespinste</b>, Raupen, Falter im Raum</td></tr>
<tr><td><b>Mehlkäfer / Brotkäfer</b></td><td>Mọt bột / mọt bánh mì</td><td>Mehl, Getreide, Zwieback, Gewürze</td><td>kleine <b>Löcher</b> in Verpackungen, Käfer, Larven</td></tr>
<tr><td><b>Kornkäfer</b></td><td>Mọt gạo/mọt ngũ cốc</td><td>Getreidekörner, Reis</td><td>ausgehöhlte Körner</td></tr>
<tr><td><b>Mehlmilbe</b></td><td>Ve bột</td><td>Mehl, Käse, Getreide</td><td>„lebender“ Staub, <b>süßlicher Geruch</b></td></tr>
<tr><td><b>Schaben</b> (Kakerlaken)</td><td>Gián</td><td>alle Lebensmittel, warme feuchte Ecken</td><td>nachtaktiv, Kot, Eipakete, unangenehmer Geruch</td></tr>
<tr><td><b>Fliegen</b></td><td>Ruồi</td><td>offene Speisen, Abfälle</td><td>Fliegen, Maden, Kotpunkte</td></tr>
<tr><td><b>Silberfischchen</b></td><td>Cá bạc (côn trùng nhỏ)</td><td>stärkehaltige Ware, Papier</td><td>feuchte Räume, silbrige Tierchen</td></tr>
<tr><td><b>Mäuse / Ratten</b> (Nager)</td><td>Chuột (loài gặm nhấm)</td><td>alle Lebensmittel, Verpackungen</td><td><b>Kotspuren</b>, Nagespuren, Urin-Geruch, Laufspuren</td></tr>
</table>
<div class="note"><b>Gefahr:</b> Schädlinge übertragen <b>Krankheitserreger</b> (z. B. <b>Salmonellen</b>), verunreinigen Lebensmittel mit Kot, Haaren und Häuten und verursachen <b>wirtschaftlichen Schaden</b>.<br>→ Sinh vật gây hại lây mầm bệnh (vd. Salmonella), làm bẩn thực phẩm bằng phân, lông, xác lột và gây thiệt hại kinh tế.</div>
<h3>D. Vorbeugung / Phòng ngừa</h3>
<ul>
<li><b>Wareneingangskontrolle</b>: Verpackungen auf Löcher, Fraß- und Kotspuren prüfen, befallene Ware <b>zurückweisen</b>. → Kiểm tra hàng nhập: bao bì có lỗ, dấu gặm, phân không; hàng nhiễm thì trả lại.</li>
<li><b>Fliegengitter</b> an Fenstern, <b>dichte Türen</b>, Ritzen und Löcher abdichten. → Lưới chắn côn trùng ở cửa sổ, cửa kín, bịt khe hở.</li>
<li>Ware in <b>verschlossenen Behältern</b> lagern, nichts offen stehen lassen. → Bảo quản trong hộp kín, không để hở.</li>
<li><b>Sauberkeit</b>: Reste und Krümel sofort entfernen, Regale und Ecken regelmäßig reinigen. → Dọn ngay vụn thức ăn, lau kệ và góc thường xuyên.</li>
<li><b>Abfälle</b> in geschlossenen Behältern, täglich aus dem Betrieb bringen. → Rác để thùng có nắp, mang ra ngoài mỗi ngày.</li>
<li><b>Monitoring</b>: Klebefallen, Pheromonfallen (Motten) und Köderstationen regelmäßig kontrollieren und dokumentieren. → Theo dõi bằng bẫy dính, bẫy pheromone, hộp bả và ghi chép.</li>
<li>Lagertemperatur und Luftfeuchte niedrig halten, <b>FIFO/FEFO</b> einhalten. → Giữ nhiệt độ và độ ẩm thấp, tuân thủ FIFO/FEFO.</li>
</ul>

<h3>E. Vorgehen bei Schädlingsbefall / Quy trình khi phát hiện</h3>
<table>
<tr><th>#</th><th>Schritt</th><th>Nghĩa Việt</th></tr>
<tr><td>1</td><td><b>Befall feststellen</b> und sofort den Vorgesetzten informieren</td><td>Xác nhận và báo ngay cấp trên</td></tr>
<tr><td>2</td><td>Befallene Ware <b>aussortieren</b> und <b>entsorgen</b> (nicht mehr verwenden!)</td><td>Loại bỏ và hủy hàng bị nhiễm</td></tr>
<tr><td>3</td><td>Benachbarte Ware <b>kontrollieren</b></td><td>Kiểm tra hàng bên cạnh</td></tr>
<tr><td>4</td><td>Lager <b>gründlich reinigen</b> und desinfizieren</td><td>Vệ sinh và khử trùng kỹ kho</td></tr>
<tr><td>5</td><td><b>Schädlingsbekämpfer</b> (Fachfirma) beauftragen</td><td>Gọi công ty diệt côn trùng chuyên nghiệp</td></tr>
<tr><td>6</td><td>Ursache finden und beseitigen (Ritzen, offene Ware …)</td><td>Tìm và loại bỏ nguyên nhân</td></tr>
<tr><td>7</td><td>Alles <b>dokumentieren</b> (HACCP) und Kontrollen verstärken</td><td>Ghi chép (HACCP) và tăng cường kiểm tra</td></tr>
</table>
<div class="note"><b>Merke:</b> Bekämpfungsmittel (Gifte, Köder) darf nur ein <b>sachkundiger Schädlingsbekämpfer</b> einsetzen, <b>nie</b> in der Nähe offener Lebensmittel. Der Betrieb ist nach der <b>Lebensmittelhygiene-Verordnung (LMHV)</b> und der <b>VO (EG) 852/2004</b> verpflichtet, Schädlinge zu bekämpfen.<br>→ Thuốc diệt và bả chỉ do người diệt côn trùng có chuyên môn sử dụng, không bao giờ gần thực phẩm hở. Theo LMHV và VO (EG) 852/2004, cơ sở có nghĩa vụ phòng chống sinh vật gây hại.</div>
<div class="note"><b>Schnellmerk:</b> <b>Erkennen → Melden → Aussortieren → Reinigen → Fachfirma → Dokumentieren.</b><br>→ Nhận biết → Báo cáo → Loại bỏ → Vệ sinh → Công ty chuyên nghiệp → Ghi chép.</div>
`,
    qa: [
      { q: "Was versteht man unter Warenpflege?", qVi: "Chăm sóc hàng lưu kho là gì?", a: "Alle Maßnahmen, die die Qualität der eingelagerten Waren bis zum Verbrauch erhalten und Verderb sowie Schwund verhindern.", aVi: "Mọi biện pháp giữ chất lượng hàng lưu kho đến khi sử dụng, ngăn hư hỏng và hao hụt.", why: "Định nghĩa trọng tâm của LS11.", src: "Eigene Zusammenfassung · Teil A" },
      { q: "Erklären Sie den Unterschied zwischen FIFO und FEFO.", qVi: "Giải thích khác nhau giữa FIFO và FEFO.", a: "FIFO: First in – first out, die zuerst eingelagerte Ware wird zuerst verbraucht.\nFEFO: First expired – first out, die Ware mit dem kürzesten MHD wird zuerst verbraucht.", aVi: "FIFO: hàng nhập trước dùng trước.\nFEFO: hàng hết hạn trước dùng trước.", why: "FEFO an toàn hơn khi lô hàng mới lại có hạn ngắn hơn lô cũ.", src: "Eigene Zusammenfassung · Teil A" },
      { q: "Nennen Sie fünf Ursachen für den Verderb von Lebensmitteln.", qVi: "Nêu 5 nguyên nhân làm thực phẩm hư hỏng.", a: "Mikroorganismen, Enzyme, Sauerstoff, Licht, Wärme, Feuchtigkeit, Schädlinge.", aVi: "Vi sinh vật, enzym, oxy, ánh sáng, nhiệt, độ ẩm, sinh vật gây hại.", why: "Chỉ cần nêu 5 trong 7.", src: "Eigene Zusammenfassung · Teil B" },
      { q: "Woran erkennen Sie einen Befall mit Mehlmotten?", qVi: "Nhận biết bướm bột bằng dấu hiệu nào?", a: "An Gespinsten im Mehl/Grieß, an Raupen und an Faltern im Lagerraum.", aVi: "Tơ mạng trong bột/semolina, sâu non và bướm bay trong kho.", why: "Gespinste là dấu hiệu điển hình nhất.", src: "Eigene Zusammenfassung · Teil C" },
      { q: "Woran erkennen Sie einen Befall mit Mäusen?", qVi: "Nhận biết chuột bằng dấu hiệu nào?", a: "Kotspuren, Nagespuren an Verpackungen, Uringeruch, Laufspuren.", aVi: "Phân chuột, dấu gặm ở bao bì, mùi nước tiểu, dấu chân chạy.", why: "Trong tình huống: phân sau kệ = dấu hiệu chuột.", src: "Eigene Zusammenfassung · Teil C" },
      { q: "Warum sind Schädlinge im Lebensmittelbetrieb gefährlich?", qVi: "Vì sao sinh vật gây hại nguy hiểm trong cơ sở thực phẩm?", a: "Sie übertragen Krankheitserreger (z. B. Salmonellen), verunreinigen Lebensmittel mit Kot und Haaren und verursachen wirtschaftlichen Schaden.", aVi: "Lây mầm bệnh (vd. Salmonella), làm bẩn thực phẩm bằng phân và lông, gây thiệt hại kinh tế.", why: "Sức khỏe khách + tiền + uy tín.", src: "Eigene Zusammenfassung · Teil C" },
      { q: "Nennen Sie vier vorbeugende Maßnahmen gegen Schädlinge.", qVi: "Nêu 4 biện pháp phòng ngừa sinh vật gây hại.", a: "Wareneingangskontrolle, Fliegengitter und dichte Türen, Lagerung in verschlossenen Behältern, Sauberkeit, Abfall täglich entfernen, Monitoring mit Fallen, keine Kartons im Lager.", aVi: "Kiểm tra hàng nhập, lưới chắn và cửa kín, hộp kín, vệ sinh, đổ rác mỗi ngày, theo dõi bằng bẫy, không để carton trong kho.", why: "Phòng ngừa luôn tốt hơn diệt.", src: "Eigene Zusammenfassung · Teil D" },
      { q: "Beschreiben Sie das Vorgehen bei Schädlingsbefall.", qVi: "Mô tả quy trình khi phát hiện sinh vật gây hại.", a: "1) Befall feststellen und Vorgesetzten informieren 2) befallene Ware aussortieren und entsorgen 3) benachbarte Ware kontrollieren 4) Lager reinigen und desinfizieren 5) Schädlingsbekämpfer beauftragen 6) Ursache beseitigen 7) dokumentieren.", aVi: "1) Xác nhận, báo cấp trên 2) loại bỏ, hủy hàng nhiễm 3) kiểm tra hàng bên cạnh 4) vệ sinh, khử trùng 5) gọi công ty diệt côn trùng 6) loại bỏ nguyên nhân 7) ghi chép.", why: "Schnellmerk: Erkennen → Melden → Aussortieren → Reinigen → Fachfirma → Dokumentieren.", src: "Eigene Zusammenfassung · Teil E" },
      { q: "Warum sollen Kartons nicht im Lager bleiben?", qVi: "Vì sao không nên để thùng carton trong kho?", a: "Kartons bringen Schmutz, Feuchtigkeit und Schädlinge (z. B. Schaben-Eier) in das Lager.", aVi: "Carton mang bụi, ẩm và sinh vật gây hại (vd. trứng gián) vào kho.", why: "Liên hệ LS07: chuyển hàng từ carton sang khay nhựa.", src: "Eigene Zusammenfassung · Teil A · vgl. LS07" }
    ],
    qaNote: "Tài liệu SLA-LF2 không có LS11 — nội dung tự soạn theo kiến thức chuẩn (LMHV, HACCP, sách Der junge Koch). Nên đối chiếu với vở ghi trên lớp.",
    quiz: [
      { q: "Was bedeutet FEFO?", options: ["First expired – first out", "First entry – first order", "Fresh eggs – fresh oil", "Fast end – fast out"], answer: 0, explain: "FEFO: Ware mit dem kürzesten MHD wird zuerst verbraucht." },
      { q: "Gespinste im Mehl deuten auf welchen Schädling hin?", options: ["Mäuse", "Mehlmotten", "Schaben", "Fliegen"], answer: 1, explain: "Raupen der Mehlmotte spinnen Fäden im Mehl, Grieß oder in Nüssen." },
      { q: "Ein süßlicher Geruch und „lebender Staub“ im Mehl deuten auf …", options: ["Mehlmilben", "Silberfischchen", "Ratten", "Kornkäfer"], answer: 0, explain: "Mehlmilben sind winzig und riechen süßlich." },
      { q: "Was ist bei Schädlingsbefall der ERSTE Schritt?", options: ["Gift auslegen", "Ware weiterverwenden", "Befall feststellen und Vorgesetzten informieren", "Lager schließen und nichts sagen"], answer: 2, explain: "Zuerst feststellen und melden, dann aussortieren, reinigen, Fachfirma." },
      { q: "Wer darf Gifte und Köder zur Schädlingsbekämpfung einsetzen?", options: ["Jede Küchenhilfe", "Ein sachkundiger Schädlingsbekämpfer", "Der Gast", "Der Lieferant"], answer: 1, explain: "Bekämpfungsmittel nur durch Fachpersonal, nie in der Nähe offener Lebensmittel." },
      { q: "Was gehört NICHT zur Vorbeugung gegen Schädlinge?", options: ["Fliegengitter", "Verschlossene Behälter", "Kartons im Lager sammeln", "Abfall täglich entfernen"], answer: 2, explain: "Kartons bringen Schädlinge und Feuchtigkeit ins Lager." },
      { q: "Welche Krankheitserreger werden häufig von Schädlingen übertragen?", options: ["Salmonellen", "Vitamine", "Enzyme", "Mineralstoffe"], answer: 0, explain: "Mäuse, Schaben und Fliegen übertragen z. B. Salmonellen." },
      { q: "Warum werden Kartoffeln grün, wenn sie hell gelagert werden?", options: ["Durch Licht bildet sich Solanin", "Durch Kälte", "Durch Mehlmotten", "Durch Zucker"], answer: 0, explain: "Licht → grüne Stellen mit giftigem Solanin. Kartoffeln dunkel lagern." }
    ],
    vokabeln: [
      { de: "die Warenpflege", vi: "chăm sóc hàng lưu kho" },
      { de: "der Verderb", vi: "sự hư hỏng" },
      { de: "der Schwund", vi: "hao hụt" },
      { de: "der Schädling", vi: "sinh vật gây hại" },
      { de: "der Schädlingsbefall", vi: "sự xâm nhập của sinh vật gây hại" },
      { de: "der Vorratsschädling", vi: "sinh vật hại kho thực phẩm" },
      { de: "die Mehlmotte", vi: "bướm bột" },
      { de: "der Mehlkäfer", vi: "mọt bột" },
      { de: "die Mehlmilbe", vi: "ve bột" },
      { de: "die Schabe", vi: "con gián" },
      { de: "der Nager", vi: "loài gặm nhấm" },
      { de: "das Gespinst", vi: "tơ mạng (của sâu bướm)" },
      { de: "die Kotspur", vi: "dấu vết phân" },
      { de: "die Nagespur", vi: "dấu gặm" },
      { de: "die Klebefalle", vi: "bẫy dính" },
      { de: "der Köder", vi: "bả" },
      { de: "der Schädlingsbekämpfer", vi: "người/công ty diệt côn trùng" },
      { de: "aussortieren", vi: "loại ra" },
      { de: "entsorgen", vi: "tiêu hủy, vứt bỏ" },
      { de: "das Fliegengitter", vi: "lưới chắn côn trùng" },
      { de: "der Krankheitserreger", vi: "mầm bệnh" },
      { de: "FEFO (first expired – first out)", vi: "hết hạn trước dùng trước" }
    ]
  }
]);
