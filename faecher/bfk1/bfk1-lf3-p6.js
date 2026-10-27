/* BfK-1 · LF3 · LS14 – Vorbereitung und Zubereitung einfacher Speisen planen (Arbeitsablaufplan)
 * Nguồn: tự soạn (không có trong BfK-SLA-lf3.pdf). Đối chiếu kiến thức chuẩn:
 * Lehrbuch „Der junge Koch / Die junge Köchin“ (Arbeitsplanung, Mise en place), HACCP.
 */
window.__LF3 = (window.__LF3||[]).concat([
  {
    id: "lf3-ls14",
    icon: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x=\"5\" y=\"4\" width=\"14\" height=\"17\" rx=\"2\"/><path d=\"M9 4V3h6v1\"/><path d=\"M9 10h6\"/><path d=\"M9 14h6\"/><path d=\"M9 18h3\"/></svg>",
    name: "LS14 · Arbeitsablaufplan für einfache Speisen",
    nameVi: "Lập kế hoạch quy trình chế biến món đơn giản",
    desc: "Mise en place, Aufbau eines Arbeitsablaufplans, Rückwärtsplanung, Beispiel Schnitzel.",
    source: "Eigene Zusammenfassung (nicht im BfK-SLA-lf3) · Der junge Koch, HACCP",
    theory: `
<h3>Situation / Tình huống</h3>
<p>Sie sind Auszubildende/r in der <b>Froher Seeblick GmbH</b>. Für das Mittagsgeschäft sollen Sie <b>Schnitzel Wiener Art mit Bratkartoffeln und Gurkensalat</b> für <b>10 Personen</b> zubereiten. Die Ausgabe beginnt um <b>12:00 Uhr</b>. Der Küchenchef möchte vorher einen <b>Arbeitsablaufplan</b> sehen.</p>
<p>→ Bạn là học viên ở Froher Seeblick GmbH. Cho bữa trưa, bạn cần làm Schnitzel kiểu Vienna với khoai tây chiên áp chảo và salad dưa chuột cho 10 người. Ra món lúc 12:00. Bếp trưởng muốn xem kế hoạch quy trình làm việc trước.</p>

<h3>A. Warum ein Arbeitsablaufplan? / Vì sao cần kế hoạch quy trình?</h3>
<p>Ein <b>Arbeitsablaufplan</b> legt die <b>Reihenfolge</b> der Arbeitsschritte, die <b>Zeit</b>, die <b>Arbeitsmittel</b> und die <b>Hygienemaßnahmen</b> fest.</p>
<p>→ Kế hoạch quy trình làm việc xác định thứ tự các bước, thời gian, dụng cụ và biện pháp vệ sinh.</p>
<ul>
<li>Alle Komponenten sind <b>gleichzeitig</b> fertig. → Các thành phần món xong cùng lúc.</li>
<li><b>Zeit, Energie und Wege</b> werden gespart. → Tiết kiệm thời gian, năng lượng và quãng đường đi lại.</li>
<li>Nichts wird <b>vergessen</b>, die <b>Qualität</b> bleibt gleich. → Không quên bước nào, chất lượng đồng đều.</li>
<li><b>Hygiene</b> und <b>Arbeitssicherheit</b> werden eingeplant. → Vệ sinh và an toàn lao động được tính trước.</li>
</ul>

<h3>B. Mise en place / Chuẩn bị trước</h3>
<p><b>Mise en place</b> (franz. „an den Platz gestellt“) bedeutet: Alle <b>Zutaten</b>, <b>Geräte</b> und <b>Arbeitsmittel</b> werden <b>vor</b> der Zubereitung bereitgestellt und vorbereitet.</p>
<p>→ Mise en place (tiếng Pháp: "đặt vào chỗ") nghĩa là chuẩn bị sẵn mọi nguyên liệu, thiết bị và dụng cụ trước khi nấu.</p>
<table>
<tr><th>Bereich</th><th>Nghĩa Việt</th><th>Beispiele</th></tr>
<tr><td><b>Waren</b></td><td>Nguyên liệu</td><td>abwiegen, waschen, schälen, schneiden, portionieren</td></tr>
<tr><td><b>Geräte</b></td><td>Thiết bị</td><td>Pfannen, Töpfe, Herd/Fritteuse vorheizen</td></tr>
<tr><td><b>Arbeitsplatz</b></td><td>Nơi làm việc</td><td>sauber, geordnet, Schneidebretter nach Farben</td></tr>
<tr><td><b>Anrichten</b></td><td>Trình bày</td><td>Teller vorwärmen, Garnitur bereitstellen</td></tr>
</table>

<h3>C. Aufbau eines Arbeitsablaufplans / Cấu trúc kế hoạch</h3>
<table>
<tr><th>Spalte</th><th>Nghĩa Việt</th><th>Inhalt</th></tr>
<tr><td><b>Uhrzeit / Dauer</b></td><td>Giờ / thời lượng</td><td>Wann beginnt der Schritt, wie lange dauert er?</td></tr>
<tr><td><b>Arbeitsschritt</b></td><td>Bước công việc</td><td>Was wird gemacht? (Verb + Rohstoff)</td></tr>
<tr><td><b>Arbeitsmittel / Geräte</b></td><td>Dụng cụ / thiết bị</td><td>Messer, Pfanne, Kombidämpfer …</td></tr>
<tr><td><b>Hinweise</b> (Hygiene, Sicherheit, Qualität)</td><td>Lưu ý (vệ sinh, an toàn, chất lượng)</td><td>Kerntemperatur, Hände waschen, Brett wechseln …</td></tr>
</table>
<div class="note"><b>Rückwärtsplanung (Rückwärtsterminierung):</b> Man beginnt beim <b>Ausgabezeitpunkt</b> und rechnet die <b>Garzeiten rückwärts</b>. Die Komponente mit der <b>längsten Garzeit</b> wird zuerst begonnen.<br>→ Lập kế hoạch ngược: bắt đầu từ giờ ra món, tính ngược thời gian nấu. Thành phần nấu lâu nhất bắt đầu đầu tiên.</div>
<h3>D. Musterplan: Schnitzel Wiener Art, 10 Portionen / Kế hoạch mẫu</h3>
<table>
<tr><th>Uhrzeit</th><th>Arbeitsschritt</th><th>Arbeitsmittel</th><th>Hinweise</th></tr>
<tr><td>10:00</td><td>Arbeitsplatz vorbereiten, Waren aus dem Lager holen und abwiegen</td><td>Waage, GN-Behälter</td><td>Hände waschen, Kühlware zuletzt holen</td></tr>
<tr><td>10:10</td><td>Kartoffeln waschen und als Pellkartoffeln kochen (ca. 25 Min.)</td><td>Topf, Herd</td><td>längste Garzeit → zuerst</td></tr>
<tr><td>10:40</td><td>Kartoffeln abgießen, ausdampfen lassen, pellen</td><td>Sieb, Officemesser</td><td>Vorsicht heißer Dampf</td></tr>
<tr><td>10:50</td><td>Gurken waschen, schälen, hobeln; Dressing herstellen</td><td>Gemüsehobel, grünes Brett</td><td>Dressing erst kurz vor Ausgabe untermischen</td></tr>
<tr><td>11:05</td><td>Schnitzel plattieren, würzen, panieren (Mehl → Ei → Semmelbrösel)</td><td>Plattiereisen, rotes Brett</td><td>danach Hände waschen, Brett wechseln</td></tr>
<tr><td>11:25</td><td>Kartoffeln in Scheiben schneiden, Zwiebeln würfeln</td><td>Kochmesser</td><td>Krallengriff</td></tr>
<tr><td>11:30</td><td>Bratkartoffeln braten (ca. 15–20 Min.), Teller vorwärmen</td><td>Pfanne, Wärmeschrank</td><td>gleichmäßig wenden</td></tr>
<tr><td>11:45</td><td>Schnitzel in Butterschmalz goldbraun ausbacken (ca. 3 Min. pro Seite)</td><td>Pfanne, Küchenpapier</td><td>schwimmend ausbacken, Fett nicht überhitzen</td></tr>
<tr><td>11:55</td><td>Gurkensalat anmachen, Zitronenspalten schneiden</td><td>Schüssel</td><td>abschmecken</td></tr>
<tr><td>12:00</td><td>Anrichten und ausgeben</td><td>vorgewärmte Teller</td><td>Tellerrand sauber</td></tr>
</table>
<div class="note"><b>Schnellmerk:</b> <b>Längste Garzeit zuerst · Kaltes vor Warmem vorbereiten · Kurzgebratenes zuletzt.</b><br>→ Nấu lâu nhất làm trước, món lạnh chuẩn bị trước món nóng, món chiên/áp chảo nhanh làm cuối cùng.</div>

<h3>E. Hygiene und Sicherheit im Ablauf / Vệ sinh & an toàn</h3>
<ul>
<li><b>Reine und unreine Arbeiten trennen</b> (rohes Fleisch ↔ Salat). → Tách việc sạch và chưa sạch (thịt sống ↔ salad).</li>
<li><b>Schneidebretter nach Farbe</b>: rot = rohes Fleisch, grün = Obst und Gemüse. → Thớt theo màu: đỏ cho thịt sống, xanh lá cho rau quả.</li>
<li>Nach rohem Fleisch und Ei: <b>Hände waschen</b>. → Sau khi chạm thịt sống, trứng: rửa tay.</li>
<li>Kühlware erst <b>kurz vor der Verarbeitung</b> aus der Kühlung nehmen. → Lấy hàng lạnh ra ngay trước khi chế biến.</li>
<li>Heißes Fett: nie mit Wasser löschen, <b>Deckel</b> oder Löschdecke verwenden. → Dầu nóng cháy: không dập bằng nước, dùng nắp hoặc chăn chống cháy.</li>
</ul>
`,
    qa: [
      { q: "Was ist ein Arbeitsablaufplan?", qVi: "Kế hoạch quy trình làm việc là gì?", a: "Ein Plan, der die Reihenfolge der Arbeitsschritte, die Zeit, die Arbeitsmittel und die Hinweise zu Hygiene und Sicherheit festlegt.", aVi: "Bản kế hoạch xác định thứ tự các bước, thời gian, dụng cụ và lưu ý vệ sinh, an toàn.", why: "Định nghĩa trọng tâm của LS14.", src: "Eigene Zusammenfassung · Teil A" },
      { q: "Nennen Sie vier Vorteile eines Arbeitsablaufplans.", qVi: "Nêu 4 lợi ích của kế hoạch quy trình.", a: "Alle Komponenten sind gleichzeitig fertig, Zeit/Energie/Wege werden gespart, nichts wird vergessen, gleichbleibende Qualität, Hygiene und Sicherheit sind eingeplant.", aVi: "Món xong cùng lúc, tiết kiệm thời gian/năng lượng/đi lại, không quên bước, chất lượng đồng đều, có tính vệ sinh và an toàn.", why: "Câu hỏi thường gặp trong Klassenarbeit.", src: "Eigene Zusammenfassung · Teil A" },
      { q: "Was bedeutet Mise en place?", qVi: "Mise en place nghĩa là gì?", a: "Alle Zutaten, Geräte und Arbeitsmittel werden vor der Zubereitung bereitgestellt und vorbereitet (franz. „an den Platz gestellt“).", aVi: "Chuẩn bị sẵn mọi nguyên liệu, thiết bị, dụng cụ trước khi nấu (tiếng Pháp: \"đặt vào chỗ\").", why: "Mise en place là bước đầu tiên của mọi kế hoạch.", src: "Eigene Zusammenfassung · Teil B" },
      { q: "Welche Spalten hat ein Arbeitsablaufplan?", qVi: "Kế hoạch quy trình có những cột nào?", a: "Uhrzeit/Dauer, Arbeitsschritt, Arbeitsmittel/Geräte, Hinweise (Hygiene, Sicherheit, Qualität).", aVi: "Giờ/thời lượng, bước công việc, dụng cụ/thiết bị, lưu ý (vệ sinh, an toàn, chất lượng).", why: "Thi hay yêu cầu tự kẻ bảng.", src: "Eigene Zusammenfassung · Teil C" },
      { q: "Was versteht man unter Rückwärtsplanung?", qVi: "Lập kế hoạch ngược là gì?", a: "Man beginnt beim Ausgabezeitpunkt und rechnet die Garzeiten rückwärts. Die Komponente mit der längsten Garzeit wird zuerst begonnen.", aVi: "Bắt đầu từ giờ ra món rồi tính ngược thời gian nấu; thành phần nấu lâu nhất bắt đầu trước.", why: "Ví dụ: ra món 12:00, khoai luộc 25 phút + để nguội + áp chảo 20 phút → bắt đầu khoai từ khoảng 10:10.", src: "Eigene Zusammenfassung · Teil C" },
      { q: "Warum werden die Schnitzel erst zum Schluss gebraten?", qVi: "Vì sao Schnitzel chiên cuối cùng?", a: "Kurzgebratenes hat eine kurze Garzeit und verliert beim Warmhalten an Qualität (Panade wird weich).", aVi: "Món áp chảo nhanh có thời gian nấu ngắn và giảm chất lượng khi giữ ấm (lớp áo bột bị mềm).", why: "Quy tắc: Kurzgebratenes zuletzt.", src: "Eigene Zusammenfassung · Teil D" },
      { q: "Nennen Sie drei Hygienemaßnahmen im Arbeitsablauf.", qVi: "Nêu 3 biện pháp vệ sinh trong quy trình.", a: "Reine und unreine Arbeiten trennen, Schneidebretter nach Farbe verwenden, nach rohem Fleisch/Ei Hände waschen, Kühlware erst kurz vor der Verarbeitung herausnehmen.", aVi: "Tách việc sạch/chưa sạch, dùng thớt theo màu, rửa tay sau thịt sống/trứng, lấy hàng lạnh ra ngay trước khi dùng.", why: "Liên hệ LS01/03: Hygiene & HACCP.", src: "Eigene Zusammenfassung · Teil E · vgl. LS01/03" }
    ],
    qaNote: "Tài liệu SLA-LF3 không có LS14 — nội dung tự soạn theo kiến thức chuẩn (sách Der junge Koch, HACCP). Nên đối chiếu với vở ghi trên lớp.",
    quiz: [
      { q: "Welche Komponente wird im Arbeitsablaufplan zuerst begonnen?", options: ["Die mit der kürzesten Garzeit", "Die mit der längsten Garzeit", "Immer der Salat", "Immer das Fleisch"], answer: 1, explain: "Rückwärtsplanung: längste Garzeit zuerst." },
      { q: "Was bedeutet „Mise en place“?", options: ["Anrichten der Teller", "Vorbereiten und Bereitstellen aller Zutaten und Geräte", "Reinigen der Küche", "Bestellen der Ware"], answer: 1, explain: "Mise en place = alles an seinen Platz, vor der Zubereitung." },
      { q: "Wovon geht die Rückwärtsplanung aus?", options: ["Vom Ausgabezeitpunkt", "Vom Dienstbeginn", "Vom Einkaufspreis", "Von der Gästezahl"], answer: 0, explain: "Man rechnet vom Ausgabezeitpunkt rückwärts." },
      { q: "Welche Farbe hat das Schneidebrett für rohes Fleisch?", options: ["Grün", "Blau", "Rot", "Gelb"], answer: 2, explain: "Rot = rohes Fleisch, Grün = Obst/Gemüse, Blau = Fisch, Gelb = Geflügel." },
      { q: "Was gehört NICHT in einen Arbeitsablaufplan?", options: ["Uhrzeit", "Arbeitsschritt", "Arbeitsmittel", "Name des Gastes"], answer: 3, explain: "Spalten: Uhrzeit, Arbeitsschritt, Arbeitsmittel, Hinweise." },
      { q: "Warum wird der Gurkensalat erst kurz vor der Ausgabe angemacht?", options: ["Damit er nicht wässrig wird", "Weil Gurken giftig sind", "Damit er warm bleibt", "Das ist egal"], answer: 0, explain: "Salz und Dressing ziehen Wasser aus den Gurken." },
      { q: "Die richtige Reihenfolge beim Panieren ist …", options: ["Ei → Mehl → Brösel", "Mehl → Ei → Semmelbrösel", "Brösel → Ei → Mehl", "Mehl → Brösel → Ei"], answer: 1, explain: "Mehl → Ei → Semmelbrösel (Panierstraße)." }
    ],
    vokabeln: [
      { de: "der Arbeitsablaufplan", vi: "kế hoạch quy trình làm việc" },
      { de: "der Arbeitsschritt", vi: "bước công việc" },
      { de: "die Reihenfolge", vi: "thứ tự" },
      { de: "das Arbeitsmittel", vi: "dụng cụ làm việc" },
      { de: "die Mise en place", vi: "khâu chuẩn bị trước" },
      { de: "bereitstellen", vi: "chuẩn bị sẵn" },
      { de: "die Rückwärtsplanung", vi: "lập kế hoạch ngược" },
      { de: "der Ausgabezeitpunkt", vi: "thời điểm ra món" },
      { de: "die Garzeit", vi: "thời gian nấu" },
      { de: "die Komponente", vi: "thành phần món" },
      { de: "abwiegen", vi: "cân" },
      { de: "plattieren", vi: "dần mỏng (thịt)" },
      { de: "panieren", vi: "lăn bột chiên xù" },
      { de: "die Semmelbrösel", vi: "vụn bánh mì" },
      { de: "ausbacken", vi: "chiên ngập dầu" },
      { de: "die Pellkartoffel", vi: "khoai tây luộc cả vỏ" },
      { de: "hobeln", vi: "bào mỏng" },
      { de: "anrichten", vi: "bày món" },
      { de: "vorwärmen", vi: "làm ấm trước" },
      { de: "das Schneidebrett", vi: "thớt" },
      { de: "der Krallengriff", vi: "thế tay móng vuốt (khi cắt)" }
    ]
  }
]);
