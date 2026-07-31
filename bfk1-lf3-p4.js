/* BfK-1 · LF3 · LS09 & LS10 (nguồn: sla-lf3.md & fk_exel) */
window.__LF3 = (window.__LF3||[]).concat([
  {
    id: "lf3-ls09",
    icon: "🧬",
    name: "LS09 · Biologische Wertigkeit & Ergänzungswert",
    nameVi: "Giá trị sinh học, Giá trị bổ sung & Protein",
    desc: "Nährstoffe im Ei, BW-Referenz Hühnerei (100%), Ergänzungswert (Kartoffeln+Ei), Pro/Contra tierisches vs. pflanzliches Eiweiß.",
    source: "sla-lf3.md · trang 85–89 · fk_exel KT bắt buộc §1",
    theory: `
<h3>A. Die Biologische Wertigkeit (BW) / Giá trị sinh học ⚠️</h3>
<p>Die <b>Biologische Wertigkeit (BW)</b> gibt an, wie viel Gramm <b>Körpereieiweiß</b> aus <b>100 g Nahrungseiweiß</b> gebildet werden kann.</p>

<div class="note">⚠️ <b>BW ausgewählter Lebensmittel (HỌC THUỘC):</b>
<ul>
<li>🥚 <b>Hühnerei = 100 %</b> (Referenzwert / Chuẩn tham chiếu)</li>
<li>🥔 <b>Kartoffeln = 95 %</b></li>
<li>🥩 <b>Rindfleisch = 87 %</b></li>
<li>🥛 <b>Kuhmilch = 86 %</b></li>
<li>🌱 <b>Soja = 84 %</b></li>
<li>🌾 <b>Reis = 83 %</b> · 🐟 <b>Fischfilet = 80 %</b> · 🌽 <b>Mais = 74 %</b> · 🌾 <b>Weizenmehl = 35 %</b></li>
</ul></div>

<p><b>Formel:</b> <code>Körpereiweiß (g) = Eiweißgehalt im LM (g) × BW (%)</code></p>
<p><i>Beispiel Rindfleisch (27 % Eiweiß, BW 87 %):</i> 100g Rindfleisch enthalten 27g Eiweiß → 27g × 87 % = <b>23,49 g Körpereieiweiß</b>.</p>

<h3>B. Der Ergänzungswert (Ergänzungseffekt) / Giá trị bổ sung ⚠️</h3>
<p>Durch schlaue <b>Kombination verschiedener Lebensmittel</b> ergänzen sich die Aminosäurenmuster, sodass die Biologische Wertigkeit der Gesamtmischung <b>höher steigt als die der Einzelkomponenten</b> (sogar > 100)!</p>

<div class="note">⚠️ <b>Gute Kombinationen mit hohem Ergänzungswert:</b>
<ul>
<li><b>Kartoffeln + Ei / Milch / Fisch / Fleisch</b> (z. B. <i>Kartoffelpüree mit Spiegelei</i>, <i>Dorade + Salzkartoffeln</i>).</li>
<li><b>Hülsenfrüchte + Getreide / Ei / Milch</b> (z. B. <i>Linsen mit Spätzle und Saitenwürstchen</i>).</li>
<li><b>Getreide + Ei / Milch / Fleisch</b> (z. B. <i>Gebratener Reis mit Ei und Hühnchen</i>).</li>
</ul></div>

<h3>C. Tierisches vs. Pflanzliches Eiweiß (Pro- & Contra-Liste) ⚠️</h3>
<table>
<tr><th>Proteinart</th><th>Pro (+) / Ưu điểm</th><th>Contra (-) / Nhược điểm</th></tr>
<tr><td><b>Tierisches Eiweiß</b><br>(Thịt, Trứng, Sữa, Cá)</td><td>Höhere Biologische Wertigkeit · Schneller resorbiert · Optimale Zusammensetzung essenzieller Aminosäuren für Muskelaufbau.</td><td>Erhöhtes Risiko für Herz-Kreislauf-Erkrankungen bei hohem Konsum · Enthält Cholesterin & Gesättigte Fetts · Umweltbelastung & Massentierhaltung / Tierleid.</td></tr>
<tr><td><b>Pflanzliches Eiweiß</b><br>(Hülsenfrüchte, Nüsse, Tofu)</td><td>Kein Tierleid · Umweltfreundlicher (weniger CO2, Wasser) · Enthält Ballaststoffe & Sekundäre Pflanzenstoffe (Zellschutz) · Geringeres Herz-Kreislauf-Risiko.</td><td>Niedrigere BW einzelner Komponenten · Enthält oft Allergene (Soja, Gluten) · Ergänzungswert muss beachtet werden für vollständiges Aminosäurenprofil.</td></tr>
</table>
`,
    qa: [
      { q: "Was bedeutet eine Biologische Wertigkeit von 100 beim Hühnerei?", qVi: "Giá trị sinh học bằng 100 của trứng gà có nghĩa là gì?", a: "Aus 100 g Eiweiß des Hühnereies können 100 g körpereigenes Eiweiß aufgebaut werden.", aVi: "Từ 100g protein của trứng gà có thể tạo ra 100g protein cơ thể.", why: "Hühnerei dient als Standard-Referenzwert (100 %).", src: "sla-lf3.md trang 87 · fk_exel KT bắt buộc §1" },
      { q: "Nenne ein Beispiel für ein Gericht mit hohem Ergänzungswert.", qVi: "Nêu ví dụ một món ăn có giá trị bổ sung (Ergänzungswert) cao.", a: "Linsen mit Spätzle, Gebratener Reis mit Ei oder Kartoffelpüree mit Spiegelei.", aVi: "Đậu Linsen ăn với mì Spätzle, Cơm chiên trứng hoặc Khoai tây nghiền với trứng ốp la.", why: "Kombination aus Getreide/Kartoffeln + Hülsenfrüchten/Ei steigert die BW.", src: "sla-lf3.md trang 87 · fk_exel KT bắt buộc §1" }
    ],
    quiz: [
      { q: "Welches Lebensmittel hat die höchste Biologische Wertigkeit als Einzelkomponente?", options: ["Weizenmehl (35%)", "Hühnerei (100%)", "Fischfilet (80%)", "Mais (74%)"], answer: 1, explain: "Hühnerei besitzt mit 100% die höchste Einzelwertigkeit und dient als Referenz." },
      { q: "Was ist der Hauptvorteil von pflanzlichem Eiweiß im Vergleich zu tierischem?", options: ["Liefert Ballaststoffe & Sekundäre Pflanzenstoffe ohne Herz-Kreislauf-Risiko", "Enthält mehr Cholesterin", "Wird schneller aufgenommen", "Hat immer BW 100"], answer: 0, explain: "Pflanzliches Eiweiß ist gesundheitsfördernd, ballaststoffreich und schützt die Gefäße." }
    ],
    vokabeln: [
      { de: "die Biologische Wertigkeit (BW)", vi: "giá trị sinh học của protein" },
      { de: "das Körpereieiweiß", vi: "protein cơ thể người" },
      { de: "der Ergänzungswert / Ergänzungseffekt", vi: "giá trị bổ sung khi kết hợp thực phẩm" },
      { de: "das tierische Eiweiß", vi: "protein động vật" },
      { de: "das pflanzliche Eiweiß", vi: "protein thực vật" },
      { de: "die essenziellen Aminosäuren", vi: "các axit amin thiết yếu" }
    ]
  },
  {
    id: "lf3-ls10",
    icon: "🍳",
    name: "LS10 · Küchentechnologische Wirkung von Eiern",
    nameVi: "Tác dụng kỹ thuật bếp của trứng",
    desc: "6 Wirkungen: Stocken/Gerinnen, Schaumbildung, Emulgieren (Lecithin), Binden/Legieren, Kleben, Klären (Consommé).",
    source: "sla-lf3.md · trang 90–92 · fk_exel KT bắt buộc §1",
    theory: `
<h3>Die 6 küchentechnologischen Wirkungen von Eiern ⚠️</h3>
<p>Eier sind in der Küche vielseitig einsetzbar. Ihre Funktionen basieren auf den Eigenschaften von Eigelb und Eiklar:</p>

<table>
<tr><th>Wirkung (Đức)</th><th>Nghĩa Việt</th><th>Cơ chế tác động (Wirkungsweise)</th><th>Küchenbeispiel (Ví dụ trong bếp)</th></tr>
<tr><td><b>1. Gerinnen / Stocken</b></td><td>Đông tụ protein</td><td>Eiweiß gerinnt bei Hitze (Denaturierung ab ca. 60–70 °C) und wird fest.</td><td>Gekochtes Ei, Spiegelei, Stocken von Rührei.</td></tr>
<tr><td><b>2. Schaumbildung</b></td><td>Tạo bọt / Làm xốp</td><td>Eiklar schließt beim Aufschlagen Luftbläschen ein → lockerer Schaum (Lockerungsmittel).</td><td>Eischnee für Biskuitteig, Baiser, Mousse au Chocolat.</td></tr>
<tr><td><b>3. Emulgieren</b></td><td>Nhũ hóa</td><td>Lecithin im Eigelb verbindet Fett und Wasser zu einer stabilen Emulsion (Emulgator).</td><td>Mayonnaise, Sauce Hollandaise, Sauce Bernaise.</td></tr>
<tr><td><b>4. Binden / Legieren</b></td><td>Làm sệt / Làm đặc</td><td>Eier/Eigelb verdicken heiße Flüssigkeiten durch leichtes Stocken (Bindemittel).</td><td>Legieren von Suppen, Vanillesauce, Königsberger Klopse (Hackmasse).</td></tr>
<tr><td><b>5. Kleben</b></td><td>Kết dính</td><td>Ei haftet an Oberflächen und verbindet Zutaten fest miteinander.</td><td>Panieren von Schnitzel (Mehl → Ei → Semmelbrösel).</td></tr>
<tr><td><b>6. Klären</b></td><td>Làm trong nước dùng</td><td>Eiklar gerinnt beim Erhitzen in trüber Brühe und schließt Trübstoffe ein (Klärmittel).</td><td>Klären von Rinder- oder Fischbrühe zu einer klaren <b>Consommé</b>.</td></tr>
</table>

<div class="note">⚠️ <b>Zusammenfassung für Prüfungen:</b>
<ul>
<li><b>Hitze → fest = Gerinnen / Stocken</b></li>
<li><b>Luft → locker = Schaumbildung / Lockerung</b></li>
<li><b>Fett + Wasser → verbinden = Emulgieren (Lecithin)</b></li>
<li><b>Trübe Brühe → klar = Klärmittel (Consommé mit Eiklar)</b></li>
<li><b>Panade am Fleisch → dính = Klebemittel</b></li>
</ul></div>
`,
    qa: [
      { q: "Welcher Inhaltsstoff im Eigelb ist für die emulgierende Wirkung verantwortlich?", qVi: "Thành phần nào trong lòng đỏ trứng chịu trách nhiệm cho tác dụng nhũ hóa?", a: "Lecithin.", aVi: "Lecithin.", why: "Lecithin là chất nhũ hóa tự nhiên liên kết mỡ và nước.", src: "sla-lf3.md trang 92 · fk_exel KT bắt buộc §1" },
      { q: "Wie klärt Eiklar eine trübe Brühe zu einer Consommé?", qVi: "Lòng trắng trứng làm trong nước dùng đục thành Consommé như thế nào?", a: "Beim Erhitzen gerinnt das Eiklar und bindet die Trübstoffe, die dann nach oben steigen und abgeschöpft werden.", aVi: "Khi đun nóng, lòng trắng trứng đông tụ và kết dính các chất đục, nổi lên trên để hớt bỏ.", src: "sla-lf3.md trang 92 · fk_exel KT bắt buộc §1" }
    ],
    quiz: [
      { q: "Warum setzt sich die Butter bei einer Sauce Hollandaise NICHT ab?", options: ["Weil Zucker drin ist", "Weil Lecithin im Eigelb als Emulgator wirkt", "Weil Wasser verdampft ist", "Weil Mehl dazugegeben wurde"], answer: 1, explain: "Lecithin im Eigelb emulgiert flüssige Butter und Wasser zu einer stabilen Sauce." },
      { q: "Was bewirkt Eischnee im Biskuitteig?", options: ["Er macht den Teig gelb", "Er dient als Lockerungsmittel durch eingeschlossene Luft", "Er macht den Teig sauer", "Er konserviert den Teig"], answer: 1, explain: "Eischnee schließt Luft ein und sorgt für eine locker-luftige Struktur beim Backen." }
    ],
    vokabeln: [
      { de: "das Bindemittel", vi: "chất kết dính / làm đặc" },
      { de: "der Emulgator (Lecithin)", vi: "chất nhũ hóa (liên kết dầu+nước)" },
      { de: "das Lockerungsmittel", vi: "chất làm xốp (Eischnee)" },
      { de: "das Klärmittel", vi: "chất làm trong nước dùng (Consommé)" },
      { de: "die Consommé", vi: "súp/nước dùng trong chuẩn" }
    ]
  }
]);
