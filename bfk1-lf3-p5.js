/* BfK-1 · LF3 · LS15 & LS16 (nguồn: sla-lf3.md & fk_exel) */
window.__LF3 = (window.__LF3||[]).concat([
  {
    id: "lf3-ls15",
    icon: "📋",
    name: "LS15 · Rezepturauswahl & Speisekarte",
    nameVi: "Lựa chọn công thức, Tiêu chí & Ma trận quyết định",
    desc: "Kriterien für Rezepturauswahl (Nachhaltigkeit, Saisonalität), Spargel-Gerichte, Entscheidungsmatrix & E-Mail.",
    source: "sla-lf3.md · trang 93–97",
    theory: `
<h3>A. Kriterien der Rezepturauswahl / Tiêu chí lựa chọn công thức ⚠️</h3>
<p>Bei der Zusammenstellung einer Speisekarte oder Aktionswoche (z. B. <i>Spargelwoche im Hotel Resort Aussicht Feldberg</i>) müssen verschiedene betriebliche und gastronomische Kriterien berücksichtigt werden:</p>
<ol>
<li><b>Saisonalität & Regionalität</b>: Zutaten aus der Region während der Erntezeit einkaufen → frischer, nachhaltiger, kostengünstiger.</li>
<li><b>Zielgruppe & Gästewünsche</b>: Berücksichtigung von Vegetariern, Veganern, Allergikern, Senioren, Familien.</li>
<li><b>Arbeits- & Küchenkapazität</b>: Zubereitungszeit, vorhandene Geräte (Kombidämpfer, Fritteuse), Arbeitsbelastung der Köche.</li>
<li><b>Wirtschaftlichkeit (Wareneinsatz)</b>: Bezahlbare Rohstoffpreise, angemessener Verkaufspreis, hohe Deckungsbeiträge.</li>
<li><b>Nachhaltigkeit & Abfallvermeidung</b>: Verwendung ganzer Produkte (z. B. Spargelschalen für Spargelcremesuppe).</li>
</ol>

<h3>B. Spargel-Rezepturen im Vergleich (LS15 Situation) ⚠️</h3>
<table>
<tr><th>Rezeptur</th><th>Món ăn</th><th>Besonderheiten & Bewertung</th></tr>
<tr><td><b>Rezeptur A</b></td><td>Weißer Spargel mit Maracuja-Dressing</td><td>Moderne, leichte Vorspeise · Vegan/Vegetarisch · Exotisch (Maracuja ist Importware → geringere Regionalität).</td></tr>
<tr><td><b>Rezeptur B</b></td><td>Spargel-Bärlauch-Fladen</td><td>Deftiges Hauptgericht / Snack · Sehr regional & saisonal (Spargel + Bärlauch) · Gute Vorbereitung (Mise en Place).</td></tr>
<tr><td><b>Rezeptur C</b></td><td>Spargel mit Schinken, Sauce Hollandaise und Salzkartoffeln</td><td>Der absolute Klassiker · Traditionell & beliebt bei Gästen · Höherer Wareneinsatz (Schinken, Butter).</td></tr>
</table>

<h3>C. Die Entscheidungsmatrix (Nutzwertanalyse) ⚠️</h3>
<p>Eine <b>Entscheidungsmatrix</b> hilft, wissenschaftlich begründet die beste Rezeptur auszuwählen. Kriterien werden gewichtet (z. B. 1–5 Punkte) und die Punkte je Gericht addiert. Die Rezeptur mit der höchsten Gesamtzahl gewinnt!</p>
`,
    qa: [
      { q: "Nenne 3 Kriterien bei der Auswahl von Rezepturen für die Speisekarte.", qVi: "Nêu 3 tiêu chí chọn công thức cho thực đơn.", a: "Saisonalität/Regionalität, Zielgruppe/Gästewünsche und Wirtschaftlichkeit (Wareneinsatz).", aVi: "Tính mùa vụ/địa phương, Nhóm khách hàng mục tiêu và Tính kinh tế (giá vốn).", why: "Đây là 3 yếu tố quyết định sự thành công của thực đơn.", src: "sla-lf3.md trang 93" },
      { q: "Wie kann man Spargelschalen nachhaltig in der Küche verwerten?", qVi: "Làm thế nào để tận dụng vỏ măng tây (Spargelschalen) bền vững?", a: "Zur Herstellung eines Spargelfonds für Spargelcremesuppe abkochen.", aVi: "Nấu lấy nước dùng Spargelfond để làm súp măng tây Spargelcremesuppe.", why: "Tránh lãng phí, giảm rác thải và tận dụng tối đa hương vị.", src: "sla-lf3.md trang 96" }
    ],
    quiz: [
      { q: "Wozu dient eine Entscheidungsmatrix im Gastgewerbe?", options: ["Zur Dienstplanerstellung", "Zur objektiven Bewertung und Auswahl von Rezepturen/Lieferanten", "Zur Kassenabrechnung", "Zur Rezeptanmeldung beim Amt"], answer: 1, explain: "Die Entscheidungsmatrix hilft, Alternativen nach festen Kriterien zu bewerten." },
      { q: "Warum sind regionale und saisonale Produkte vorteilhaft?", options: ["Sie sind immer am teuersten", "Höhere Frische, kürzere Transportwege (weniger CO2) und meist günstigerer Preis", "Sie halten jahrelang", "Sie brauchen kein Gewürz"], answer: 1, explain: "Regional & saisonal spart Frachtkosten, schont die Umwelt und bietet beste Qualität." }
    ],
    vokabeln: [
      { de: "die Rezepturauswahl", vi: "lựa chọn công thức" },
      { de: "die Saisonalität", vi: "tính mùa vụ" },
      { de: "die Regionalität", vi: "tính địa phương" },
      { de: "die Entscheidungsmatrix", vi: "ma trận quyết định (đánh giá cho điểm)" },
      { de: "der Spargelfond", vi: "nước dùng măng tây" }
    ]
  },
  {
    id: "lf3-ls16",
    icon: "🧮",
    name: "LS16 · Wareneinsatz & Kalkulation",
    nameVi: "Tính toán lượng nguyên liệu & Giá thành",
    desc: "Materialpreisliste, Rezepturberechnung für Portionsmengen, Kalkulation im Gastgewerbe.",
    source: "sla-lf3.md · trang 98–112 · fk_exel KT bắt buộc §10",
    theory: `
<h3>A. Rezepturberechnung / Tính toán công thức theo số phần ⚠️</h3>
<p>In der Großküche müssen Rezepturen von der Standardmenge (z. B. 1 Portion oder 4 Portionen) auf die benötigte Personenzahl (z. B. 10, 50, 100 Portionen) umgerechnet werden.</p>

<div class="note">⚠️ <b>Formel für Mengenumrechnung:</b>
<br><code>Benötigte Menge = (Menge je 1 Portion) × Anzahl benötigter Portionen</code>
<br><i>Oder mit Umrechnungsfaktor (MF):</i> <code>MF = Zielportionen ÷ Basisportionen</code> → <code>Neues Gewicht = Basisgewicht × MF</code></div>

<p><b>Beispiel:</b> Für 4 Portionen <i>Spargel-Bärlauch-Fladen</i> werden 500 g Mehl benötigt. Wie viel Mehl braucht man für 10 Portionen?</p>
<ul>
<li>Menge je 1 Portion: 500 g ÷ 4 = 125 g</li>
<li>Menge für 10 Portionen: 125 g × 10 = <b>1250 g (1,25 kg) Mehl</b>.</li>
</ul>

<h3>B. Materialeinsatzberechnung (Kalkulationsschema) ⚠️</h3>
<p>Um den Verkaufspreis eines Gerichts festzulegen, berechnet man zuerst den <b>Wareneinsatz (Wareneinzelkosten)</b>:</p>

<table>
<tr><th>Kalkulationsschritt</th><th>Nghĩa Việt</th><th>Berechnung (Cách tính)</th></tr>
<tr><td><b>Wareneinsatz (Materialkosten)</b></td><td>Giá vốn nguyên liệu direct</td><td>Summe aller Zutatenpreise laut Materialpreisliste.</td></tr>
<tr><td>+ Gemeinkostenzuschlag (z. B. 150–200 %)</td><td>+ Chi phí chung (điện, nước, lương, mìn)</td><td>Wareneinsatz × Zuschlagssatz %</td></tr>
<tr><td><b>= Selbstkosten</b></td><td>= Giá thành toàn bộ</td><td>Wareneinsatz + Gemeinkosten</td></tr>
<tr><td>+ Gewinnzuschlag (z. B. 10–20 %)</td><td>+ Lợi nhuận dự kiến</td><td>Selbstkosten × Gewinnzuschlag %</td></tr>
<tr><td><b>= Nettoverkaufspreis (NVP)</b></td><td>= Giá bán thuần (chưa thuế)</td><td>Selbstkosten + Gewinn</td></tr>
<tr><td>+ Umsatzsteuer (19 % oder 7 %)</td><td>+ Thuế giá trị gia tăng (MwSt)</td><td>NVP × 19 % (Speisen im Restaurant) oder 7 % (To-Go)</td></tr>
<tr><td><b>= Bruttoverkaufspreis (BVP)</b></td><td>= Giá bán niêm yết (kèm MwSt)</td><td>Nettoverkaufspreis × 1.19 (bzw. 1.07)</td></tr>
</table>

<div class="note">⚠️ <b>Umsatzsteuer-Regel Gastronomie (HỌC THUỘC):</b>
<ul>
<li><b>19 % MwSt</b>: Speisen zum Verzehr im Restaurant / Getränke allgemein.</li>
<li><b>7 % MwSt</b>: Speisen zum Mitnehmen (Take-away / To-Go) sowie Grundnahrungsmittel.</li>
</ul></div>
`,
    qa: [
      { q: "Wie berechnet man den Bruttoverkaufspreis aus dem Nettoverkaufspreis bei 19 % MwSt?", qVi: "Cách tính giá bán Brutto từ giá Netto với thuế 19 % MwSt?", a: "Bruttoverkaufspreis = Nettoverkaufspreis × 1,19.", aVi: "Bruttoverkaufspreis = Nettoverkaufspreis × 1,19.", why: "Giá Brutto bao gồm 100% Netto + 19% MwSt = 119%.", src: "sla-lf3.md trang 100 · fk_exel KT bắt buộc §10" },
      { q: "Welcher MwSt-Satz gilt für Speisen, die im Restaurant verzehrt werden?", qVi: "Mức thuế MwSt nào áp dụng cho món ăn dùng tại nhà hàng?", a: "19 % Umsatzsteuer.", aVi: "Thuế MwSt 19 %.", why: "Ăn tại chỗ tính thuế dịch vụ nhà hàng chuẩn 19 %.", src: "sla-lf3.md trang 100 · fk_exel KT bắt buộc §6" }
    ],
    quiz: [
      { q: "Wie viel Gramm Mehl benötigt man für 50 Portionen, wenn 1 Portion 120 g benötigt?", options: ["600 g", "6000 g (6 kg)", "1200 g", "5000 g"], answer: 1, explain: "50 × 120 g = 6000 g = 6 kg." },
      { q: "Ein Gericht kostet im Einkauf 3.00 €. Der Kalkulationsfaktor ist 4. Wie hoch ist der Nettoverkaufspreis?", options: ["7.00 €", "12.00 €", "15.00 €", "9.00 €"], answer: 1, explain: "3.00 € × 4 = 12.00 € Nettoverkaufspreis." }
    ],
    vokabeln: [
      { de: "der Wareneinsatz", vi: "giá vốn hàng bán / nguyên liệu" },
      { de: "die Materialpreisliste", vi: "bảng giá nguyên vật liệu" },
      { de: "die Selbstkosten", vi: "giá thành toàn bộ (gồm chi phí chung)" },
      { de: "der Nettoverkaufspreis (NVP)", vi: "giá bán chưa thuế" },
      { de: "der Bruttoverkaufspreis (BVP)", vi: "giá bán đã gồm thuế MwSt" },
      { de: "die Umsatzsteuer (MwSt)", vi: "thuế giá trị gia tăng (19% / 7%)" }
    ]
  }
]);
