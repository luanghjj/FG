/* BfK-1 · LF3 · LS04 & LS06 (nguồn: sla-lf3.md & fk_exel) */
window.__LF3 = (window.__LF3||[]).concat([
  {
    id: "lf3-ls04",
    icon: "🥦",
    name: "LS04 · Obst, Gemüse & Kartoffeltypen",
    nameVi: "Rau củ, Trái cây & Các loại khoai tây",
    desc: "Einteilung von Obst & Gemüse, Kartoffeltypen (festkochend, mehlig), Saisonkalender heimisches Obst/Gemüse.",
    source: "sla-lf3.md · trang 18–29 · fk_exel KT bắt buộc §2",
    theory: `
<h3>A. Einteilung von Obst / Phân loại trái cây ⚠️</h3>
<table>
<tr><th>Obstgruppe</th><th>Nghĩa Việt</th><th>Beispiele (Ví dụ)</th></tr>
<tr><td><b>Kernobst</b></td><td>Trái cây có hạt nhỏ (táo/lê)</td><td>Apfel, Birne, Quitte.</td></tr>
<tr><td><b>Steinobst</b></td><td>Trái cây có hạt cứng lớn</td><td>Zwetschge/Pflaume, Kirsche, Pfirsich, Aprikose, Nektarine.</td></tr>
<tr><td><b>Beerenobst</b></td><td>Trái cây dạng quả mọng</td><td>Erdbeere, Himbeere, Brombeere, Johannisbeere, Stachelbeere, Heidelbeere, Weintraube.</td></tr>
<tr><td><b>Schalenobst (Nüsse)</b></td><td>Trái cây vỏ cứng (hạt)</td><td>Walnuss, Haselnuss, Mandel, Pistazie, Esskastanie (Maroni).</td></tr>
<tr><td><b>Süd- und Zitrusfrüchte</b></td><td>Trái cây phương nam & có múi</td><td>Orange, Zitrone, Mandarine, Grapefruit, Banane, Ananas, Kiwi, Mango.</td></tr>
</table>

<h3>B. Einteilung von Gemüse / Phân loại rau củ ⚠️</h3>
<table>
<tr><th>Gemüsegruppe</th><th>Nghĩa Việt</th><th>Beispiele (Ví dụ)</th></tr>
<tr><td><b>Blattgemüse</b></td><td>Rau ăn lá</td><td>Kopfsalat, Feldsalat, Spinat, Endivie, Mangold.</td></tr>
<tr><td><b>Blütengemüse</b></td><td>Rau ăn hoa</td><td>Blumenkohl, Brokkoli, Artischocke, Romanesco.</td></tr>
<tr><td><b>Fruchtgemüse</b></td><td>Củ/quả ăn như rau</td><td>Tomate, Gurke, Paprika, Zucchini, Kürbis, Aubergine.</td></tr>
<tr><td><b>Wurzel- & Knollesgemüse</b></td><td>Rau ăn củ / rễ</td><td>Karotte (Möhre), Radieschen, Rote Bete, Sellerie, Meerrettich, Pastinake.</td></tr>
<tr><td><b>Zwiebelgemüse</b></td><td>Rau họ hành/tỏi</td><td>Speisezwiebel, Knoblauch, Porree (Lauch), Schnittlauch, Schalotte.</td></tr>
<tr><td><b>Hülsengemüse</b></td><td>Rau họ đậu</td><td>Erbsen, Bohnen, Linsen.</td></tr>
</table>

<h3>C. Kartoffeltypen (Kochtypen) / Các loại khoai tây ⚠️</h3>
<div class="note">⚠️ <b>HỌC THUỘC – 3 Kochtypen der Kartoffel:</b>
<ol>
<li><b>Festkochend (Grüne Kennzeichnung)</b>: Bleiben beim Kochen ganz und fest, geringer Stärkegehalt (~14 %).
  <br>→ <i>Verwendung</i>: Kartoffelsalat, Bratkartoffeln, Salzkartoffeln, Gratins.</li>
<li><b>Vorwiegend festkochend (Rote Kennzeichnung)</b>: Springen beim Kochen leicht auf, mittlerer Stärkegehalt (~15 %).
  <br>→ <i>Verwendung</i>: Pellkartoffeln, Pommes frites, Eintöpfe, Reibekuchen.</li>
<li><b>Mehlig kochend (Blaue Kennzeichnung)</b>: Kochen weich und zerfallen leicht, hoher Stärkegehalt (~16.5 %).
  <br>→ <i>Verwendung</i>: Kartoffelpüree/Kartoffelbrei, Kartoffelknödel/Klöße, Kartoffelsuppen, Gnocchi.</li>
</ol></div>

<h3>D. Einkauf & schonende Verarbeitung / Thu mua & Chế biến ⚠️</h3>
<ul>
<li><b>5 Einkaufskriterien</b>: Reifer, arteigener Geruch · Schädlingsfreiheit · Frische · Saison & Regionalität beachten · Bedarfsgerecht einkaufen.</li>
<li><b>Schonende Vitamin- & Mineralstoffverarbeitung</b>: Kurz & gründlich waschen (nicht im Wasser liegen lassen/wässern) · Erst waschen, dann zerkleinern · Schonende Garverfahren wählen (<b>Dämpfen, Dünsten</b> statt Kochen in viel Wasser).</li>
</ul>
`,
    qa: [
      { q: "Zu welcher Obstgruppe gehören Kirschen und Pfirsiche?", qVi: "Anh đào (Kirsche) và đào (Pfirsich) thuộc nhóm trái cây nào?", a: "Steinobst.", aVi: "Steinobst (trái cây hạt cứng).", why: "Có hạt cứng đơn ở giữa.", src: "sla-lf3.md trang 19 · fk_exel KT bắt buộc §2" },
      { q: "Welcher Kartoffeltyp eignet sich am besten für Kartoffelsalat?", qVi: "Loại khoai tây nào thích hợp nhất làm salad khoai tây?", a: "Festkochende Kartoffeln.", aVi: "Khoai tây festkochend (không bị rã khi luộc).", why: "Chứa ít tinh bột (~14 %), giữ nguyên cấu trúc lát cắt.", src: "sla-lf3.md trang 21 · fk_exel KT bắt buộc §2" },
      { q: "Wie verhindert man Vitaminverluste bei der Gemüseverarbeitung?", qVi: "Làm thế nào để tránh mất vitamin khi chế biến rau củ?", a: "Kurz waschen, erst waschen dann zerkleinern, schonende Garverfahren wie Dämpfen oder Dünsten anwenden.", aVi: "Rửa nhanh, rửa trước khi cắt, dùng phương pháp hấp (Dämpfen) hoặc om (Dünsten).", why: "Vitamin tan trong nước (Vit B, C) dễ bị trôi mất nếu ngâm lâu hoặc luộc nhiều nước.", src: "sla-lf3.md trang 30 · fk_exel KT bắt buộc §2" }
    ],
    quiz: [
      { q: "Zu welcher Gemüsegruppe gehört Brokkoli?", options: ["Blattgemüse", "Blütengemüse", "Wurzelgemüse", "Fruchtgemüse"], answer: 1, explain: "Brokkoli und Blumenkohl sind Blütengemüse." },
      { q: "Welche Kartoffel eignet sich am besten für Kartoffelpüree?", options: ["Festkochend", "Mehlig kochend", "Vorwiegend festkochend", "Süßkartoffel"], answer: 1, explain: "Mehlig kochende Kartoffeln haben viel Stärke und zerfallen leicht zu Püree." },
      { q: "Warum sollte man Gemüse NICHT lange im Wasser liegen lassen (wässern)?", options: ["Es wird zu hart", "Wasserlösliche Vitamine und Mineralstoffe werden ausgewaschen", "Es verfärbt sich schwarz", "Es verliert Fett"], answer: 1, explain: "Wasserlösliche Vitamine (z. B. Vitamin C) gehen ins Waschwasser über." }
    ],
    vokabeln: [
      { de: "das Kernobst", vi: "trái cây hạt nhỏ (táo/lê)" },
      { de: "das Steinobst", vi: "trái cây hạt cứng (đào/mận)" },
      { de: "das Beerenobst", vi: "trái cây quả mọng (dâu/việt quất)" },
      { de: "das Blattgemüse", vi: "rau ăn lá" },
      { de: "das Blütengemüse", vi: "rau ăn hoa (súp lơ)" },
      { de: "festkochend", vi: "khoai tây luộc không rã (làm salad)" },
      { de: "mehlig kochend", vi: "khoai tây luộc xốp rã (làm nghiền)" },
      { de: "das Dämpfen", vi: "hấp bằng hơi nước" },
      { de: "das Dünsten", vi: "om/xào chín bằng ít nước/mỡ" }
    ]
  },
  {
    id: "lf3-ls06",
    icon: "🥗",
    name: "LS06 · Ernährungsphysiologie & Nährwerte",
    nameVi: "Dinh dưỡng học, DGE & Tính toán năng lượng",
    desc: "DGE-Ernährungskreis, 10 DGE-Regeln, Makro- & Mikronährstoffe, Nährwertberechnung (kJ/kcal), Energiebedarf (GU, PAL).",
    source: "sla-lf3.md · trang 30–72 · Lernzusammenfassung KA2",
    theory: `
<h3>A. Nährstoffe & DGE-Empfehlungen / Các chất dinh dưỡng ⚠️</h3>
<p>Die Nährstoffe werden eingeteilt in <b>Baustoffe</b> (Protein, Mineralstoffe), <b>Brennstoffe</b> (Kohlenhydrate, Fett) und <b>Wirk-/Reglerstoffe</b> (Vitamine, Mineralstoffe, Wasser).</p>

<table>
<tr><th>Nährstoffgruppe</th><th>Hauptaufgabe im Körper</th><th>Brennwert je 1 Gramm</th></tr>
<tr><td><b>Kohlenhydrate (Carbohydrate)</b></td><td>Hauptenergiespender für Gehirn & Muskeln</td><td><b>17 kJ</b> (4 kcal)</td></tr>
<tr><td><b>Proteine (Eiweiß)</b></td><td>Baustoff für Muskeln, Zellen, Enzyme, Hormone</td><td><b>17 kJ</b> (4 kcal)</td></tr>
<tr><td><b>Fette (Lipide)</b></td><td>Konzentrierte Energie, Kälteschutz, Träger fettlöslicher Vitamine (A, D, E, K)</td><td><b>37 kJ</b> (9 kcal)</td></tr>
<tr><td><b>Vitamine & Mineralstoffe</b></td><td>Regelung von Körperfunktionen, Immunsystem</td><td><b>0 kJ</b> (kein Energielieferant)</td></tr>
<tr><td><b>Wasser</b></td><td>Lösungs- & Transportmittel, Temperaturregler</td><td><b>0 kJ</b></td></tr>
</table>

<div class="note">⚠️ <b>Die 10 Regeln der DGE (Deutsche Gesellschaft für Ernährung):</b>
<ol>
<li>Lebensmittelvielfalt genießen.</li>
<li>Gemüse und Obst – „5 am Tag“ (3 Portionen Gemüse, 2 Portionen Obst).</li>
<li>Vollkorn wählen.</li>
<li>Mit tierischen Lebensmitteln die Auswahl ergänzen (Milch täglich, Fisch 1-2x/Woche, Fleisch in Maßen).</li>
<li>Gesundheitsfördernde Fette nutzen (pflanzliche Öle wie Raps- / Olivenöl).</li>
<li>Zucker und Salz einsparen.</li>
<li>Am besten Wasser trinken (mind. 1.5 Litern/Tag).</li>
<li>Schonend zubereiten.</li>
<li>Achtsam essen und genießen.</li>
<li>Auf das Gewicht achten und in Bewegung bleiben.</li>
</ol></div>

<h3>B. Nährwertberechnung / Công thức tính năng lượng ⚠️</h3>
<div class="note">⚠️ <b>Formeln (HỌC THUỘC):</b>
<ul>
<li><b>1 kcal = 4,2 kJ</b> (genau 4,184 kJ)</li>
<li><b>Energiewert (kJ)</b> = (g Eiweiß × 17 kJ) + (g KH × 17 kJ) + (g Fett × 37 kJ)</li>
<li><b>Energiewert (kcal)</b> = (g Eiweiß × 4 kcal) + (g KH × 4 kcal) + (g Fett × 9 kcal)</li>
</ul></div>

<p><b>Beispiel Nährwertberechnung:</b> 150g mageres Schweinefleisch (19 % Eiweiß, 7 % Fett, 0 % KH):</p>
<ul>
<li>Eiweiß: 19 % von 150g = 28,5g → 28,5 × 17 kJ = <b>484,5 kJ</b></li>
<li>Fett: 7 % von 150g = 10,5g → 10,5 × 37 kJ = <b>388,5 kJ</b></li>
<li><b>Gesamt-Brennwert: 873 kJ</b> (bzw. ~208 kcal)</li>
</ul>

<h3>C. Energiebedarf (Grundumsatz & Gesamtbedarf) ⚠️</h3>
<ul>
<li><b>Grundumsatz (GU)</b>: Energiebedarf bei völliger Ruhe zur Aufrechterhaltung der Lebensfunktionen (Herz, Atmung, Temp.).
  <br>→ <i>Richtwert</i>: <b>1 kcal je kg Körpergewicht je Stunde</b> (24h × kg × 1 kcal).</li>
<li><b>Gesamtenergiebedarf</b> = <b>Grundumsatz (GU) × PAL-Wert</b> (Physical Activity Level).
  <br>→ <i>PAL-Werte</i>: Nur liegen/sitzen = 1.2 · Büroarbeit = 1.4–1.6 · Baugewerbe/Kellner/Köche (körperlich anstrengend) = <b>1.8–2.0</b>.</li>
</ul>
`,
    qa: [
      { q: "Wie viel kJ Energie liefert 1 g Fett?", qVi: "1 g Fett cung cấp bao nhiêu kJ năng lượng?", a: "37 kJ (bzw. 9 kcal).", aVi: "37 kJ (hoặc 9 kcal).", why: "Fett ist der energiereichste Nährstoff.", src: "sla-lf3.md trang 35 · Lernzusammenfassung KA2" },
      { q: "Wie berechnet man den Grundumsatz (GU) eines Menschen überschlägig?", qVi: "Cách tính ước lượng chuyển hóa cơ bản (GU) của một người như thế nào?", a: "GU = 24 Stunden × Körpergewicht in kg × 1 kcal.", aVi: "GU = 24 giờ × cân nặng (kg) × 1 kcal.", why: "Mỗi kg cân nặng tiêu tốn 1 kcal trong 1 giờ nghỉ ngơi.", src: "sla-lf3.md trang 71 · Lernzusammenfassung KA2" },
      { q: "Welche Vitamine sind fettlöslich?", qVi: "Những vitamin nào tan trong chất béo?", a: "Die Vitamine A, D, E und K (Eselsbrücke: EDEKA).", aVi: "Các vitamin A, D, E và K (Mẹo nhớ: EDEKA).", why: "Chúng cần chất béo để cơ thể hấp thụ được.", src: "sla-lf3.md trang 36" }
    ],
    quiz: [
      { q: "Wie viel kJ entsprechen 1 kcal?", options: ["17 kJ", "4,2 kJ", "37 kJ", "10 kJ"], answer: 1, explain: "1 kcal = 4.2 kJ." },
      { q: "Wie lautet die Regel der DGE bezüglich Obst und Gemüse?", options: ["1 Portion pro Woche", "5 am Tag (3 Portionen Gemüse, 2 Portionen Obst)", "Nur Obst essen", "Nur gekochtes Gemüse"], answer: 1, explain: "DGE empfiehlt '5 am Tag': 3 Portionen Gemüse und 2 Portionen Obst." },
      { q: "Ein Gericht enthält 10g Eiweiß, 20g KH und 5g Fett. Wie viel kJ sind das?", options: ["350 kJ", "695 kJ", "1000 kJ", "500 kJ"], answer: 1, explain: "(10×17) + (20×17) + (5×37) = 170 + 340 + 185 = 695 kJ." }
    ],
    vokabeln: [
      { de: "der Brennwert / Energiewert", vi: "nhiệt lượng / giá trị năng lượng" },
      { de: "der Grundumsatz (GU)", vi: "chuyển hóa cơ bản (khi nghỉ)" },
      { de: "der Gesamtenergiebedarf", vi: "nhu cầu năng lượng tổng cộng" },
      { de: "der PAL-Wert (Physical Activity Level)", vi: "hệ số mức độ hoạt động thể chất" },
      { de: "fettlösliche Vitamine (A, D, E, K)", vi: "các vitamin tan trong chất béo" },
      { de: "die Deutsche Gesellschaft für Ernährung (DGE)", vi: "Hội Dinh dưỡng Đức (DGE)" }
    ]
  }
]);
