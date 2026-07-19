/* BfK-1 · KA Fr. Schuster · 8 Themen komplett (Gästebedarfe → Menüregeln) */
window.BFK1_THEMES = {
  lf6: {
    id: "lf6", label: "Lernfeld 6", badge: "LF 6",
    title: "Gerichte, Menüs und Produkte anbieten",
    items: [
      {
        id: "gaestebewertungen", icon: "⭐",
        name: "Gästebedarfe und Auswertung",
        desc: "LS01 · Kriterien · Kritik · 3S · Maßnahmen",
        pages: { folder: "2-Bfk1-lf6", from: 3, to: 10, prefix: "2-Bfk1-lf6" },
        content: `
          <h2>⭐ Thema 1 · Gästebedarfe und Auswertung</h2>
          <div class="hint"><span class="term" data-de="Hotel Wind" data-vi="nhà hàng/khách sạn trong bài học">Hotel Wind</span> · Steakrestaurant · Umsatzrückgang</div>

          <h3 class="sub">1. Bewertungskriterien der Gäste</h3>
          <p>Gäste bewerten einen gastronomischen Betrieb vor allem nach:</p>
          <table>
            <tr><th>Kriterium</th><th>Bedeutung</th></tr>
            <tr><td><span class="term" data-de="Atmosphäre" data-vi="không khí / bầu không khí">Atmosphäre</span></td><td>Ambiente, Gemütlichkeit</td></tr>
            <tr><td><span class="term" data-de="Preisempfinden" data-vi="cảm nhận về giá">Preisempfinden</span></td><td>Preis-Leistung</td></tr>
            <tr><td><span class="term" data-de="Qualität der Speisen" data-vi="chất lượng món ăn">Qualität der Speisen</span></td><td>Geschmack, Garstufe, Temperatur</td></tr>
            <tr><td><span class="term" data-de="Ordnung und Sauberkeit" data-vi="trật tự và sạch sẽ">Ordnung und Sauberkeit</span></td><td>Raum, Toilette, Geschirr</td></tr>
            <tr><td><span class="term" data-de="Personal im Service" data-vi="nhân viên phục vụ">Personal im Service</span></td><td>Freundlichkeit, Kompetenz</td></tr>
          </table>

          <h3 class="sub">2. Häufige Kritikpunkte</h3>
          <ul>
            <li>unfreundliches / arrogantes Personal</li>
            <li>unsaubere Toiletten</li>
            <li>mangelnde <span class="term" data-de="vegetarische Alternativen" data-vi="món chay thay thế">vegetarische Alternativen</span></li>
            <li>schlecht zubereitete Speisen (z. B. Steak komplett durch, kaltes Essen)</li>
            <li>langsame Bedienung, schlechte Anrichtung, überteuerte Preise</li>
          </ul>

          <h3 class="sub">3. Verbesserungsvorschläge (konkret!)</h3>
          <table>
            <tr><th>Problem</th><th>Maßnahme</th></tr>
            <tr><td>Wenig vegetarisch</td><td>Speiseangebot um vegetarische/vegane Gerichte erweitern</td></tr>
            <tr><td>Unsauber</td><td><span class="term" data-de="Reinigungsplan" data-vi="kế hoạch vệ sinh">Reinigungsplan</span>: <b>Was · wann · wie · von wem</b>?</td></tr>
            <tr><td>Unfreundlicher Service</td><td><span class="term" data-de="Teamschulung" data-vi="đào tạo nhóm">Teamschulung</span> Umgang mit Gästen</td></tr>
            <tr><td>Wenig Kartenkenntnis</td><td>Schulung Speisekarte / Allergene / Empfehlungen</td></tr>
            <tr><td>Falsche Garstufe</td><td>Ausgabe-Check, Garstufen-Training</td></tr>
          </table>

          <h3 class="sub">4. Auswertungsmethode</h3>
          <div class="formula">Sammeln → Kategorisieren → Häufigkeit/Schwere → Maßnahmen → Kontrolle</div>
          <div class="formula">E-Mail: Betreff → Anrede → Anlass → 5 konkrete Vorschläge → Gruß</div>

          <div class="note">💡 <b>Schnellmerk – 3 „S“ der Gästezufriedenheit:</b><br>
          <span class="term" data-de="Sauberkeit" data-vi="sạch sẽ">Sauberkeit</span> (Reinigungsplan) ·
          <span class="term" data-de="Speisenqualität" data-vi="chất lượng món">Speisenqualität</span> (auch vegetarisch) ·
          <span class="term" data-de="Service" data-vi="phục vụ">Service</span> (freundlich &amp; kompetent)</div>
        `
      },
      {
        id: "ernaehrungsformen", icon: "🥗",
        name: "Ernährungsgewohnheiten und Speisekartenaufbau",
        desc: "Essformen · Kartenstruktur · Formulierung",
        pages: { folder: "2-Bfk1-lf6", from: 10, to: 18, prefix: "2-Bfk1-lf6" },
        content: `
          <h2>🥗 Thema 2 · Ernährungsgewohnheiten &amp; Speisekarte</h2>

          <h3 class="sub">Ernährungsgewohnheiten in Deutschland</h3>
          <p>Die häufigsten Ernährungsformen — mit Anteil der Bevölkerung (DGE-/VML-Studie):</p>
          <table>
            <tr><th>Form</th><th>%</th><th>Regel</th></tr>
            <tr><td><b>Keine bestimmte Ernährung</b> <span class="term" data-de="isst alles" data-vi="ăn mọi thứ">(isst alles)</span></td><td>68 %</td><td>keine Einschränkung, kein Verzicht — die Mehrheit der Bevölkerung</td></tr>
            <tr><td><span class="term" data-de="Vegetarisch" data-vi="ăn chay">Vegetarisch</span></td><td>9 %</td><td><b>kein Fleisch</b> (Ei/Milch meist erlaubt)</td></tr>
            <tr><td><span class="term" data-de="Flexitarier" data-vi="ăn chay linh hoạt">Flexitarier</span></td><td>7 %</td><td>überwiegend pflanzlich, <b>wenig Fleisch</b> gelegentlich</td></tr>
            <tr><td><span class="term" data-de="Vegan" data-vi="thuần chay">Vegan</span></td><td>4 %</td><td><b>keine tierischen Produkte</b> (auch Ei, Milch, Honig, Gelatine)</td></tr>
            <tr><td><span class="term" data-de="Laktosefrei" data-vi="không lactose">Laktosefrei</span></td><td>4 %</td><td><b>ohne Milch(zucker)</b> — je nach Verträglichkeit</td></tr>
            <tr><td><span class="term" data-de="Low-Carb" data-vi="ít carb">Low-Carb</span> / <span class="term" data-de="No-Carb" data-vi="không carb">No-Carb</span></td><td>4 %</td><td><b>wenig / keine Kohlenhydrate</b></td></tr>
            <tr><td><span class="term" data-de="Halal" data-vi="halal">Halal</span></td><td>3 %</td><td>nach <b>islamischen Regeln</b> (v. a. Schlachtung)</td></tr>
            <tr><td><span class="term" data-de="Mediterran" data-vi="Địa Trung Hải">Mediterran</span></td><td>3 %</td><td><b>viel Gemüse, Fisch, Olivenöl</b></td></tr>
            <tr><td><span class="term" data-de="Ausschließlich bio" data-vi="thuần hữu cơ">Ausschließlich bio</span></td><td>2 %</td><td><b>nur Bio-Produkte</b></td></tr>
            <tr><td><span class="term" data-de="Glutenfrei" data-vi="không gluten">Glutenfrei</span></td><td>2 %</td><td><b>ohne Gluten</b> (z. B. <span class="term" data-de="Zöliakie" data-vi="bệnh Celiac">Zöliakie</span>) → Mais, Reis, Hafer, Hirse</td></tr>
            <tr><td><span class="term" data-de="Keto" data-vi="keto">Keto</span></td><td>1 %</td><td><b>sehr wenig KH, viel Fett</b></td></tr>
            <tr><td><span class="term" data-de="Pescetarier" data-vi="ăn cá không thịt">Pescetarier</span></td><td>1 %</td><td><b>Fisch erlaubt, Fleisch nicht</b></td></tr>
            <tr><td><span class="term" data-de="Koscher" data-vi="kosher">Koscher</span></td><td>1 %</td><td>nach <b>jüdischen Speisegesetzen</b></td></tr>
          </table>
          <div class="note">Allergene nie raten — bei Unsicherheit Küche fragen. Kreuzkontamination vermeiden.</div>

          <h3 class="sub">Gericht = Komponenten (+ Zubereitungsart!)</h3>
          <p>Ein Gericht wird nicht nur aus Beilagen zusammengesetzt — zuerst kommt die
          <span class="term" data-de="Zubereitungsart" data-vi="cách chế biến / phương pháp nấu">Zubereitungsart</span>
          und der <span class="term" data-de="Hauptrohstoff" data-vi="nguyên liệu chính">Hauptrohstoff</span>.</p>
          <div class="formula">
            <span class="term" data-de="Zubereitungsart" data-vi="cách chế biến">Zubereitungsart</span> +
            <span class="term" data-de="Hauptrohstoff" data-vi="nguyên liệu chính">Hauptrohstoff</span>
            (+ ggf. <span class="term" data-de="Garnitur" data-vi="cách trang trí / kiểu món (…-Art)">Garnitur</span>) +
            <span class="term" data-de="Soße" data-vi="sốt">Soße</span> +
            <span class="term" data-de="Gemüsebeilage" data-vi="rau kèm">Gemüsebeilage</span> +
            <span class="term" data-de="Sättigungsbeilage" data-vi="món no">Sättigungsbeilage</span> +
            ggf. <span class="term" data-de="Salat" data-vi="salad / món salad">Salat</span> (kalte Beilage)
          </div>

          <table>
            <tr><th>Baustein</th><th>Beispiele (Mindmap)</th></tr>
            <tr><td><b>Zubereitungsart</b></td><td><span class="term" data-de="gebraten" data-vi="chiên/rán">gebraten</span>,
              <span class="term" data-de="geschmort" data-vi="om / hầm">geschmort</span>,
              <span class="term" data-de="gegrillt" data-vi="nướng vỉ">gegrillt</span>,
              <span class="term" data-de="gedünstet" data-vi="hấp / om nhẹ">gedünstet</span></td></tr>
            <tr><td><b>Hauptrohstoff</b></td><td>Gänsekeule, Schweinehals, Lammrückensteak, Tofu…</td></tr>
            <tr><td><b>Garnitur</b> (optional)</td><td>Müllerin-Art, Baden-Baden, Colbert, Wellington…</td></tr>
            <tr><td><b>Soße</b></td><td>Käsesoße, Béchamelsoße, Pfifferlingrahmsoße, Hollandaise</td></tr>
            <tr><td><b>Gemüsebeilage</b></td><td>Speckbohnen, Rotkohl, Karotten-Julienne, sautierte Rosenkohlblätter</td></tr>
            <tr><td><b>Sättigungsbeilage</b></td><td>Bratkartoffeln, Reisköpfchen, Spätzle, Käsenocken</td></tr>
            <tr><td><b>Salat</b></td><td>Gurkensalat, Kopfsalat, Krautsalat, Rote-Bete-Salat</td></tr>
          </table>
          <div class="formula">Beispiel: <b>Gebratene</b> Gänsekeule · Rotkohl · Spätzle · Käsesoße</div>
          <div class="note">💡 Ohne <b>Zubereitungsart</b> ist die Gerichtsangabe unvollständig — sie gehört fest zum Gerichtsschema (nicht nur Beilagen!).</div>

          <h3 class="sub">Aufbau einer Speisekarte</h3>
          <ol>
            <li><span class="term" data-de="Besondere Empfehlungen" data-vi="món đề xuất / theo mùa">Besondere Empfehlungen</span> (z. B. saisonal)</li>
            <li><span class="term" data-de="Vorspeisen" data-vi="khai vị">Vorspeisen</span></li>
            <li><span class="term" data-de="Hauptgänge" data-vi="món chính">Hauptgänge</span></li>
            <li><span class="term" data-de="Desserts" data-vi="tráng miệng">Desserts</span></li>
            <li><span class="term" data-de="Getränke" data-vi="đồ uống">Getränke</span></li>
          </ol>
          <p><b>Formulierung:</b> informativ und appetitlich — Gast soll wissen, was kommt.</p>
          <div class="note">💡 <b>Schnellmerk Menü-Reihenfolge:</b> Empfehlung → Vor → Haupt → Nach → Getränk</div>
        `
      },
      {
        id: "obst", icon: "🍎",
        name: "Obst – Inhaltsstoffe und Zubereitung",
        desc: "Einteilung · Nährstoffe · Gararten · Convenience",
        pages: { folder: "2-Bfk1-lf6", from: 19, to: 27, prefix: "2-Bfk1-lf6" },
        content: `
          <h2>🍎 Thema 3 · Obst, Inhaltsstoffe und Zubereitung</h2>

          <h3 class="sub">Einteilung des Obstes</h3>
          <table>
            <tr><th>Gruppe</th><th>Beispiele</th></tr>
            <tr><td><span class="term" data-de="Südfrüchte" data-vi="trái cây nhiệt đới / miền nam">Südfrüchte</span></td><td><span class="term" data-de="Orange" data-vi="cam">Orange</span>, <span class="term" data-de="Zitrone" data-vi="chanh">Zitrone</span>, <span class="term" data-de="Banane" data-vi="chuối">Banane</span>, <span class="term" data-de="Ananas" data-vi="dứa/thơm">Ananas</span>, <span class="term" data-de="Grapefruit" data-vi="bưởi tây">Grapefruit</span>, <span class="term" data-de="Dattel" data-vi="chà là">Dattel</span></td></tr>
            <tr><td><span class="term" data-de="Schalenobst" data-vi="quả hạch / quả có vỏ cứng">Schalenobst</span></td><td><span class="term" data-de="Mandel" data-vi="hạnh nhân">Mandel</span>, <span class="term" data-de="Walnuss" data-vi="óc chó">Walnuss</span>, <span class="term" data-de="Erdnuss" data-vi="lạc/đậu phộng">Erdnuss</span>, <span class="term" data-de="Pistazie" data-vi="hạt dẻ cười">Pistazie</span></td></tr>
            <tr><td><span class="term" data-de="Beerenobst" data-vi="quả mọng">Beerenobst</span></td><td><span class="term" data-de="Erdbeere" data-vi="dâu tây">Erdbeere</span>, <span class="term" data-de="Himbeere" data-vi="mâm xôi">Himbeere</span>, <span class="term" data-de="Heidelbeere" data-vi="việt quất">Heidelbeere</span>, <span class="term" data-de="Weintraube" data-vi="nho">Weintraube</span></td></tr>
            <tr><td><span class="term" data-de="Kernobst" data-vi="quả có lõi hạt (táo, lê)">Kernobst</span></td><td><span class="term" data-de="Apfel" data-vi="táo">Apfel</span>, <span class="term" data-de="Birne" data-vi="lê">Birne</span>, <span class="term" data-de="Quitte" data-vi="mộc qua">Quitte</span></td></tr>
            <tr><td><span class="term" data-de="Steinobst" data-vi="quả hạch cứng / có hột">Steinobst</span></td><td><span class="term" data-de="Kirsche" data-vi="anh đào/cherries">Kirsche</span>, <span class="term" data-de="Pflaume" data-vi="mận">Pflaume</span>, <span class="term" data-de="Aprikose" data-vi="mơ">Aprikose</span>, <span class="term" data-de="Pfirsich" data-vi="đào">Pfirsich</span></td></tr>
          </table>

          <h3 class="sub">Nährstoffe</h3>
          <ul>
            <li><b>60–90 % Wasser</b> → energiearm</li>
            <li><span class="term" data-de="Kohlenhydrate" data-vi="tinh bột/đường">Kohlenhydrate</span>: Fructose, Glucose, Saccharose</li>
            <li>Vitamine: C, A, B, <span class="term" data-de="Folsäure" data-vi="axit folic">Folsäure</span></li>
            <li>Mineralstoffe: Kalium, Calcium, Magnesium, Eisen</li>
            <li><span class="term" data-de="Pektin" data-vi="pectin">Pektin</span> (Ballaststoff): Quell-/Verdickungsmittel, hilft bei <span class="term" data-de="Durchfall" data-vi="tiêu chảy">Durchfall</span></li>
            <li><span class="term" data-de="Sekundäre Pflanzenstoffe" data-vi="hợp chất thực vật thứ cấp">Sekundäre Pflanzenstoffe</span> (SPS): <span class="term" data-de="Carotinoide" data-vi="carotenoid">Carotinoide</span>, <span class="term" data-de="Polyphenole" data-vi="polyphenol">Polyphenole</span> — Cholesterin senken, Immunsystem stärken</li>
          </ul>
          <div class="note">Kampagne <b>5 am Tag</b>: 5 Portionen Obst &amp; Gemüse, davon ca. 2× Obst.</div>

          <h3 class="sub">Zubereitungsarten</h3>
          <table>
            <tr><th>Art</th><th>Was passiert?</th></tr>
            <tr><td><span class="term" data-de="Pürieren" data-vi="xay nhuyễn">Pürieren</span></td><td>zerkleinern zur Flüssigkeit (z. B. Sorbet, Coulis)</td></tr>
            <tr><td><span class="term" data-de="Backen" data-vi="nướng lò">Backen</span></td><td>Ofen; Obst wird weich (Bratapfel)</td></tr>
            <tr><td><span class="term" data-de="Pochieren" data-vi="om nhẹ dưới sôi">Pochieren</span></td><td>sanft <b>unter Siedepunkt</b> in Flüssigkeit (Sirup/Wein)</td></tr>
            <tr><td><span class="term" data-de="Sautieren" data-vi="xào nhanh">Sautieren</span> &amp; <span class="term" data-de="Karamellisieren" data-vi="caramel hóa">Karamellisieren</span></td><td>kurz anbraten (Butter) → <span class="term" data-de="Röstaromen" data-vi="hương vị rang">Röstaromen</span></td></tr>
            <tr><td><span class="term" data-de="Frittieren" data-vi="chiên ngập dầu">Frittieren</span></td><td>viel Fett, oft im Ausbackteig</td></tr>
            <tr><td><span class="term" data-de="Mazerieren" data-vi="ngâm / ướp">Mazerieren</span></td><td>in aromatischer Flüssigkeit (Alkohol, Sirup) ziehen lassen</td></tr>
          </table>
          <div class="note">💡 <b>Schnellmerk:</b> Pochieren = sanft (&lt;100°C) · Sautieren = kurz &amp; heiß · Mazerieren = ziehen lassen</div>

          <h3 class="sub">Frisch vs. Convenience</h3>
          <div class="grid2">
            <div class="mini"><h4>Frischer Obstsalat</h4><p>mehr Vitamine, weniger Zucker, keine Zusatzstoffe, umweltfreundlicher</p></div>
            <div class="mini"><h4><span class="term" data-de="Convenience" data-vi="tiện lợi / chế biến sẵn">Convenience</span></h4><p>spart Personalkosten, sofort servierfertig, hygienisch standardisiert</p></div>
          </div>
        `
      },
      {
        id: "huelsenfruechte", icon: "🫘",
        name: "Hülsenfrüchte",
        desc: "Eiweiß · Giftstoffe · Einweichen · Aquafaba",
        pages: { folder: "2-Bfk1-lf6", from: 28, to: 34, prefix: "2-Bfk1-lf6" },
        content: `
          <h2>🫘 Thema 4 · Hülsenfrüchte</h2>

          <h3 class="sub">Vertreter</h3>
          <ul>
            <li><span class="term" data-de="Linsen" data-vi="đậu lăng">Linsen</span>: Tellerlinsen, rote Linsen…</li>
            <li><span class="term" data-de="Bohnen" data-vi="đậu">Bohnen</span>: Kidney, Sojabohnen…</li>
            <li><span class="term" data-de="Erbsen" data-vi="đậu Hà Lan">Erbsen</span>: grüne Erbsen, <span class="term" data-de="Kichererbsen" data-vi="đậu gà / chickpea">Kichererbsen</span></li>
          </ul>

          <h3 class="sub">Eigenschaften</h3>
          <ul>
            <li><b>höchster pflanzlicher Eiweißgehalt</b> (ca. 20–34 %) → extrem wichtig für Vegetarier/Veganer</li>
            <li>viel Stärke, Ballaststoffe, Eisen, Vitamine</li>
            <li>wenig Fett (Ausnahme Erdnuss/Soja)</li>
          </ul>

          <h3 class="sub">⚠️ Giftstoffe – wichtigste Regel</h3>
          <p>Rohe Hülsenfrüchte enthalten natürliche Giftstoffe
          (<span class="term" data-de="Hämagglutinine" data-vi="hemagglutinin">Hämagglutinine</span> /
          <span class="term" data-de="Phasin" data-vi="phasin (độc tố đậu)">Phasin</span>).
          Sie werden erst durch <b>Garen</b> zerstört. <b>Niemals roh verzehren!</b></p>

          <h3 class="sub">Küchentechnischer Umgang</h3>
          <ol>
            <li><span class="term" data-de="Einweichen" data-vi="ngâm nước">Einweichen</span> (getrocknet)</li>
            <li><span class="term" data-de="Einweichwasser" data-vi="nước ngâm">Einweichwasser</span> <b>weggießen</b></li>
            <li>Kochen / garen (ca. 4× Wasser; kontrollieren, schäumen oft)</li>
          </ol>
          <div class="note">Salz im Einweich-/Kochwasser kann den Garprozess beeinflussen (Schale/Pektin) — Unterrichtsregel beachten.</div>
          <p><b>Ausnahme / Tipp:</b> Kochwasser von Kichererbsen =
          <span class="term" data-de="Aquafaba" data-vi="nước đậu gà (thay lòng trắng trứng thuần chay)">Aquafaba</span>
          → veganer Eischnee-Ersatz.</p>

          <div class="note">💡 <b>Schnellmerk:</b> Hülsenfrüchte = Eiweiß-Weltmeister.<br>
          Regel: <b>Einweichen → Wasser weg → Kochen (nie roh!)</b></div>
        `
      },
      {
        id: "getreide", icon: "🌾",
        name: "Getreide und Pseudogetreide",
        desc: "Korn · Gluten · Ausmahlungsgrad · Mahlgrade",
        pages: { folder: "2-Bfk1-lf6", from: 35, to: 44, prefix: "2-Bfk1-lf6" },
        content: `
          <h2>🌾 Thema 5 · Getreide und Pseudogetreide</h2>

          <h3 class="sub">Kornaufbau</h3>
          <table>
            <tr><th>Teil</th><th>Inhalt</th></tr>
            <tr><td><span class="term" data-de="Randschichten" data-vi="lớp vỏ / cám">Randschichten</span> / Aleuron</td><td>Ballaststoffe, Mineralien, B-Vitamine</td></tr>
            <tr><td><span class="term" data-de="Mehlkörper" data-vi="phần lõi bột">Mehlkörper</span></td><td>Hauptanteil <span class="term" data-de="Stärke" data-vi="tinh bột">Stärke</span> + Eiweiß</td></tr>
            <tr><td><span class="term" data-de="Keimling" data-vi="mầm">Keimling</span></td><td>Fett, Vitamine (E) — lagerempfindlich</td></tr>
          </table>

          <h3 class="sub">Gluten</h3>
          <div class="grid2">
            <div class="mini"><h4>Glutenhaltig (Zöliakie-Gefahr)</h4>
              <p><span class="term" data-de="Weizen" data-vi="lúa mì">Weizen</span>,
              <span class="term" data-de="Dinkel" data-vi="spelt">Dinkel</span>,
              <span class="term" data-de="Grünkern" data-vi="lúa mì xanh">Grünkern</span>,
              <span class="term" data-de="Roggen" data-vi="lúa mạch đen">Roggen</span>,
              <span class="term" data-de="Gerste" data-vi="lúa mạch">Gerste</span></p>
            </div>
            <div class="mini"><h4>Glutenfrei</h4>
              <p>Reis, Mais, Hirse; Hafer nur bei sicherer Trennung (Kontamination!)</p>
            </div>
          </div>

          <h3 class="sub"><span class="term" data-de="Pseudo-Getreide" data-vi="ngũ cốc giả">Pseudo-Getreide</span></h3>
          <p><span class="term" data-de="Buchweizen" data-vi="kiều mạch">Buchweizen</span>,
          <span class="term" data-de="Amaranth" data-vi="amaranth">Amaranth</span>,
          <span class="term" data-de="Quinoa" data-vi="quinoa">Quinoa</span> —
          botanisch kein Getreide, ähnlich verwendet, <b>von Natur aus glutenfrei</b>.</p>

          <h3 class="sub"><span class="term" data-de="Ausmahlungsgrad" data-vi="tỷ lệ xay xát">Ausmahlungsgrad</span></h3>
          <p>Gibt an, wie viel Prozent des Korns vermahlen wurden.</p>
          <table>
            <tr><th>Grad</th><th>Bedeutung</th></tr>
            <tr><td><b>Hoch</b> (Vollkornmehl)</td><td>ganzes Korn · gesünder · verdirbt schneller (Fett im Keimling)</td></tr>
            <tr><td><b>Niedrig</b> (helles Mehl)</td><td>fast nur Mehlkörper · bessere Backeigenschaften · länger haltbar</td></tr>
          </table>

          <h3 class="sub">Mahlgrade (grob → fein)</h3>
          <div class="formula">
            <span class="term" data-de="Schrot" data-vi="bột thô">Schrot</span> →
            <span class="term" data-de="Grieß" data-vi="semolina / bột gries">Grieß</span> →
            <span class="term" data-de="Dunst" data-vi="bột mịn trung gian (dunst)">Dunst</span> →
            <span class="term" data-de="Mehl" data-vi="bột mì">Mehl</span>
          </div>

          <div class="note">💡 <b>Schnellmerk:</b> Zöliakie-Gefahr = Weizen, Roggen, Dinkel, Gerste (+ Grünkern).<br>
          Rettung = Reis, Mais, Hirse &amp; Pseudo-Getreide (Quinoa…)</div>
        `
      },
      {
        id: "menues-erstellen", icon: "🍽️",
        name: "Menüregeln und sprachliche Gestaltung",
        desc: "Speisenfolge · Sprache · Rechtschreibung",
        pages: { folder: "2-Bfk1-lf9", from: 23, to: 24, prefix: "2-Bfk1-lf9" },
        content: `
          <h2>🍽️ Thema 8 · Menüregeln und sprachliche Gestaltung</h2>

          <h3 class="sub">Definition Menü</h3>
          <div class="formula"><span class="term" data-de="Menü" data-vi="set menu">Menü</span> = ≥3 Gänge, geschmacklich abgestimmt, in fester Reihenfolge</div>

          <h3 class="sub">Klassischer Menüaufbau</h3>
          <ol>
            <li><span class="term" data-de="Kalte Vorspeise" data-vi="khai vị nguội">Kalte Vorspeise</span></li>
            <li><span class="term" data-de="Suppe" data-vi="súp">Suppe</span></li>
            <li><span class="term" data-de="Warmes Zwischengericht" data-vi="món nóng xen giữa">Warmes Zwischengericht</span></li>
            <li><span class="term" data-de="Hauptgericht" data-vi="món chính">Hauptgericht</span></li>
            <li><span class="term" data-de="Dessert" data-vi="tráng miệng">Dessert</span></li>
          </ol>

          <h3 class="sub">Menüregeln (Abwechslung ist Pflicht)</h3>
          <ul>
            <li><b>Keine Wiederholung der Rohstoffe</b> — nicht Blumenkohlsuppe und danach Blumenkohlpüree</li>
            <li><b>Keine Wiederholung der Zubereitungsarten</b> — nicht gebraten + gebraten hintereinander</li>
            <li><b>Helle und dunkle Gänge abwechseln</b> — optische Abwechslung</li>
            <li><span class="term" data-de="Saisonale Produkte" data-vi="sản phẩm theo mùa">Saisonale Produkte</span> bevorzugen</li>
            <li>nicht zu fett/schwer hintereinander</li>
          </ul>

          <h3 class="sub">Sprachliche Gestaltung der Karte</h3>
          <table>
            <tr><th>Regel</th><th>Beispiel</th></tr>
            <tr><td><b>Keine Abkürzungen</b></td><td>„Frikassee vom Huhn“ — nicht „Frikassee v. Huhn“</td></tr>
            <tr><td><span class="term" data-de="Bindestriche" data-vi="dấu gạch nối">Bindestriche</span> bei 3+ Wörtern</td><td><span class="term" data-de="Preiselbeer-Sahne-Meerrettich" data-vi="nước sốt nam việt quất-kem-cải ngựa">Preiselbeer-Sahne-Meerrettich</span></td></tr>
            <tr><td>Adjektive voranstellen</td><td>richtig: <b>Gepökelte Rinderzunge</b><br>falsch: „Rinderzunge, gepökelt“</td></tr>
            <tr><td>Aussagekräftige Wörter</td><td>statt vage „frisch/knackig“ → z. B. „hausgemacht“, „Blattsalate aus dem Hausgarten“</td></tr>
          </table>

          <div class="note">💡 <b>Schnellmerk:</b> Abwechslung Pflicht — Rohstoff nicht doppelt, Garmethode nicht doppelt.<br>
          Sprache: <b>Abkürzungen sind tabu!</b></div>
        `
      }
    ]
  },
  lf9: {
    id: "lf9", label: "Lernfeld 9", badge: "LF 9",
    title: "Zahlungen mit dem Gast abwickeln",
    items: [
      {
        id: "betriebsarten-zahlung", icon: "💳",
        name: "Betriebsarten und Zahlungsabwicklung",
        desc: "Beherbergung · Gastro · System · Zahlung",
        pages: { folder: "2-Bfk1-lf9", from: 3, to: 9, prefix: "2-Bfk1-lf9" },
        content: `
          <h2>💳 Thema 6 · Betriebsarten und Zahlungsabwicklung</h2>
          <div class="hint">Fallbetrieb <b>PALMERO</b> · <span class="term" data-de="Franchise" data-vi="nhượng quyền">Franchise</span></div>

          <p>Betriebe teilen sich nach <b>Dienstleistung, Bedienform und Zielgruppe</b> in <b>5 Gruppen</b>.</p>

          <h3 class="sub">A · <span class="term" data-de="Beherbergungsbetriebe" data-vi="cơ sở lưu trú">Beherbergungsbetriebe</span></h3>
          <p>Übernachtung mit Verpflegung. Einteilung nach Gästegruppe/Zweck:</p>
          <ul>
            <li><span class="term" data-de="Stadthotel" data-vi="khách sạn nội đô">Stadthotel</span> — Geschäftsreisende, Tagungen, Kultur/Events</li>
            <li><span class="term" data-de="Kurhotel" data-vi="khách sạn nghỉ dưỡng/trị liệu">Kurhotel</span> — im Kurort, medizinische Betreuung, Diätküche</li>
            <li><span class="term" data-de="Ferienhotel" data-vi="khách sạn kỳ nghỉ">Ferienhotel</span> — Familien-, Sporthotel, <span class="term" data-de="Aparthotel" data-vi="khách sạn căn hộ">Aparthotel</span></li>
            <li><span class="term" data-de="Hotel garni" data-vi="khách sạn chỉ phục vụ sáng">Hotel garni</span> — nur Zimmer, Frühstück, Getränke, kleine Speisen</li>
            <li><span class="term" data-de="Hotel-Pension" data-vi="nhà nghỉ">Hotel-Pension</span> / Fremdenheim — eingeschränkter Service, günstig, oft Langzeitgäste</li>
            <li><span class="term" data-de="Motel" data-vi="motel (cho khách đi ô tô)">Motel</span> — an Verkehrswegen, für Autoreisende (Lage, Zufahrt)</li>
          </ul>

          <h3 class="sub">B · <span class="term" data-de="Gastronomiebetriebe" data-vi="cơ sở ăn uống truyền thống">Gastronomiebetriebe</span></h3>
          <ul>
            <li>Restaurants mit <b>deutscher Küche</b> — Gäste mittleres bis höheres Alter</li>
            <li>Restaurants mit <b>internationaler Küche</b> / Steakhäuser — ca. 25–50 Jahre</li>
            <li><span class="term" data-de="Selbstbedienungsrestaurant" data-vi="nhà hàng tự phục vụ">Selbstbedienungsrestaurants</span> — gehoben, für eilige, gesundheitsbewusste Gäste</li>
            <li><span class="term" data-de="Kneipe" data-vi="quán rượu">Kneipen</span> / Bars — Getränke am Tresen, Musik, Atmosphäre</li>
            <li>Cafés / Bistros — alle Altersgruppen, einfache Karte, moderate Preise</li>
          </ul>

          <h3 class="sub">C · <span class="term" data-de="Systemgastronomie" data-vi="chuỗi nhà hàng hệ thống">Systemgastronomie</span></h3>
          <p>Stark <b>standardisierte</b> Abläufe und Produkte — überall vergleichbar.</p>
          <table>
            <tr><th>Segment</th><th>Merkmal / Beispiel</th></tr>
            <tr><td><span class="term" data-de="Quickservice" data-vi="thức ăn nhanh">Quickservice</span></td><td>sehr schnell (&lt; 45 Min.), <span class="term" data-de="Counterservice" data-vi="đặt tại quầy">Counterservice</span> · McDonald’s, Burger King</td></tr>
            <tr><td>Verkehrs-/Messegastronomie</td><td>Bahnhof, Flughafen, Raststätte, Zug, Flugzeug</td></tr>
            <tr><td><span class="term" data-de="Handelsgastronomie" data-vi="ăn uống trong TTTM">Handelsgastronomie</span></td><td>Gastro im Einkaufszentrum · Dinea, IKEA</td></tr>
            <tr><td><span class="term" data-de="Fullservicegastronomie" data-vi="phục vụ đầy đủ tại bàn">Fullservice</span></td><td>Service am Tisch, standardisiert · Block House</td></tr>
          </table>

          <h3 class="sub">D · <span class="term" data-de="Veranstaltungs- und Cateringbetriebe" data-vi="dịch vụ sự kiện & catering">Veranstaltungs- &amp; Cateringbetriebe</span></h3>
          <ul>
            <li><span class="term" data-de="Event-Catering" data-vi="tiệc sự kiện">Event-Catering</span> — Feiern, Weihnachts-/Firmenfeiern</li>
            <li><span class="term" data-de="Sport-Catering" data-vi="catering thể thao">Sport-Catering</span> — Stadien / Arenen</li>
          </ul>

          <h3 class="sub">E · <span class="term" data-de="Gemeinschaftsverpflegung" data-vi="suất ăn tập thể">Gemeinschaftsverpflegung</span></h3>
          <p>Kantinen, Schulen, Krankenhäuser, Seniorenheime, Mensen — viele Personen, regelmäßig, nährstoffgerecht &amp; wirtschaftlich.</p>

          <h3 class="sub">Zahlungsmöglichkeiten (4 Arten)</h3>
          <table>
            <tr><th>Art</th><th>Vorteile</th><th>Nachteile</th></tr>
            <tr><td><span class="term" data-de="Barzahlung" data-vi="tiền mặt">Barzahlung</span></td><td>einfach, anonym, keine Gebühren, Geld sofort, gute Ausgabenkontrolle</td><td>persönlicher Kontakt, Diebstahl-/Verlustrisiko, Wechselgeld/Zählzeit</td></tr>
            <tr><td><span class="term" data-de="Zahlungskarten" data-vi="thẻ thanh toán">Zahlungskarten</span>: <span class="term" data-de="Debitkarte" data-vi="thẻ ghi nợ (trả ngay)">Debit</span>, <span class="term" data-de="Kreditkarte" data-vi="thẻ tín dụng (trả sau)">Kredit</span>, <span class="term" data-de="Prepaid-Karte" data-vi="thẻ trả trước">Prepaid</span></td><td>schnell, hygienisch, sicher (PIN/kontaktlos)</td><td>Terminal + Strom nötig, Gebühren, techn. Störungen, nicht jeder hat Karte</td></tr>
            <tr><td><span class="term" data-de="Überweisung" data-vi="chuyển khoản">Zahlung per Überweisung</span></td><td>sicher, bargeldlos, gute Belegablage, für große Beträge (z. B. Catering)</td><td>Geldeingang später, Risiko dass Gast nicht zahlt</td></tr>
            <tr><td><span class="term" data-de="Mobile Payment" data-vi="thanh toán di động">Mobile Payment</span> (M-Payment)</td><td>sehr schnell, kontaktlos, hygienisch · Smartphone/Smartwatch</td><td>Smartphone + Akku nötig, nicht alle Gäste, techn. Störungen</td></tr>
          </table>
          <div class="note">💡 <b>5 Betriebsarten:</b> Beherbergung · Gastronomie · System · Catering · Gemeinschaftsverpflegung.<br>Systemgastronomie = standardisiert; McDonald’s = Quickservice.</div>
        `
      },
      {
        id: "rechtliche-zahlungsabwicklung", icon: "⚖️",
        name: "Rechtliche Grundlagen – Bewirtungsvertrag",
        desc: "Vertrag · Störungen · USt · Trinkgeld · Beleg",
        pages: { folder: "2-Bfk1-lf9", from: 10, to: 22, prefix: "2-Bfk1-lf9" },
        content: `
          <h2>⚖️ Thema 7 · Rechtliche Grundlagen – Bewirtungsvertrag</h2>

          <h3 class="sub">Vertragsart</h3>
          <p>Der <span class="term" data-de="Bewirtungsvertrag" data-vi="hợp đồng phục vụ ăn uống">Bewirtungsvertrag</span> ist im BGB nicht eigens geregelt, sondern ein
          <span class="term" data-de="gemischter Vertrag" data-vi="hợp đồng hỗn hợp">gemischter Vertrag</span>
          (Elemente aus <span class="term" data-de="Kaufvertrag" data-vi="hợp đồng mua bán">Kauf-</span>, <span class="term" data-de="Werkvertrag" data-vi="hợp đồng gia công">Werk-</span>, <span class="term" data-de="Dienstvertrag" data-vi="hợp đồng dịch vụ">Dienst-</span> und <span class="term" data-de="Mietvertrag" data-vi="hợp đồng thuê">Mietvertrag</span>). Je nach Teil gelten andere Rechtsnormen.</p>
          <p>Die <b>größte Ähnlichkeit</b> besteht mit dem <b>Kaufvertrag</b> (Ware gegen Geld).</p>

          <h3 class="sub">Vertragsabschluss</h3>
          <div class="formula">Entsteht durch <b>Bestellung des Gastes</b> + <b>Bestellungsannahme</b> durch den Wirt</div>
          <p>Es genügt, dass sich Käufer und Verkäufer über <b>Art, Menge und Preis</b> der Ware einig sind.</p>
          <ul>
            <li>Speisekarte / Außenverzeichnis = in der Regel <b>kein verbindliches Angebot</b> — bei Ablehnung (z. B. ausverkauft) hat der Gast <b>keinen Anspruch</b> auf das Gericht</li>
            <li>Wirt: Speisen/Getränke in <b>einwandfreier Qualität</b> in <b>angemessener Zeit</b></li>
            <li>Gast: ordnungsgemäß Serviertes <b>annehmen und bezahlen</b> (bei einwandfreier Lieferung Zahlungspflicht)</li>
            <li>Gast darf <b>keine eigenen Speisen</b> mitbringen/verzehren (außer mit Erlaubnis)</li>
          </ul>

          <h3 class="sub">Tisch- &amp; Essensbestellungen</h3>
          <ul>
            <li><b>Nur Tisch reserviert</b>: meist <span class="term" data-de="vorvertraglicher Bereich" data-vi="giai đoạn tiền hợp đồng">vorvertraglicher Bereich</span> — Vertrag erst beim Bestellen am Tisch</li>
            <li><b>Feste Speisen zu fester Zeit bestellt &amp; angenommen</b>: bei <span class="term" data-de="Nichtinanspruchnahme" data-vi="không đến / không sử dụng">Nichtinanspruchnahme</span> darf der Wirt den <b>vollen Preis</b> verlangen, <b>abzüglich ersparter Aufwendungen</b> (z. B. anderweitig verwertbare Zutaten)</li>
          </ul>

          <h3 class="sub">Störungen durch den Gast</h3>
          <table>
            <tr><th>Fall</th><th>Regel</th></tr>
            <tr><td><span class="term" data-de="Zechprellerei" data-vi="ăn quỵt">Zechprellerei</span> / <span class="term" data-de="Betrug" data-vi="lừa đảo">Betrug</span></td><td>an sich <b>keine</b> Straftat — strafbar nur bei <span class="term" data-de="Vorsatz" data-vi="cố ý">Vorsatz</span> (wollte von Anfang an nicht zahlen)</td></tr>
            <tr><td>Vergessener Geldbeutel</td><td><b>kein Betrug</b> (kein Vorsatz) — zivil klären, Anschrift hinterlassen</td></tr>
            <tr><td>Rechte des Wirtes</td><td>Gast <b>festhalten</b> bis Polizei kommt, <span class="term" data-de="verklagen" data-vi="khởi kiện">verklagen</span>, Beitreibungskosten (z. B. Anwalt) fordern</td></tr>
          </table>

          <h3 class="sub">Störungen durch den Gastronomen</h3>
          <p><b>Lieferverzug:</b></p>
          <ul>
            <li><span class="term" data-de="Nichtlieferung" data-vi="không giao món">Nichtlieferung</span>: Gast kann <span class="term" data-de="Schadensersatz" data-vi="bồi thường thiệt hại">Schadensersatz</span> verlangen</li>
            <li><span class="term" data-de="lange Wartezeit" data-vi="chờ quá lâu">Lange Wartezeit</span> (z. B. 1,5 Std.): Gericht ablehnen oder <span class="term" data-de="Preisminderung" data-vi="giảm giá">Preisminderung</span></li>
          </ul>
          <p><b><span class="term" data-de="Schlechtleistung" data-vi="giao hàng kém / sai món">Schlechtleistung</span></b> (mangelhaft, falsch, Fremdkörper — z. B. versalzene Suppe, falsche Garstufe) → Gast hat <b>4 Rechte</b>:</p>
          <ol>
            <li><span class="term" data-de="Nacherfüllung" data-vi="làm lại / đổi món">Nacherfüllung</span>/Nachbesserung — neues Gericht gratis (<b>Vorrang</b>)</li>
            <li><span class="term" data-de="Rücktritt vom Vertrag" data-vi="rút khỏi hợp đồng">Rücktritt</span> — wenn Austausch nicht möglich, Gericht ablehnen</li>
            <li><span class="term" data-de="Preisminderung" data-vi="giảm giá">Preisminderung</span> — Gericht behalten, weniger zahlen</li>
            <li><span class="term" data-de="Schadensersatz statt Leistung" data-vi="bồi thường thay thế">Schadensersatz</span> — z. B. Getränk/Dessert „<span class="term" data-de="Kosten des Hauses" data-vi="nhà hàng mời">auf Kosten des Hauses</span>“</li>
          </ol>
          <div class="note">💡 Falsches Essen → <b>zuerst Nacherfüllung (Austausch)</b>, dann Rücktritt/Preisminderung.<br>
          Vergessener Geldbeutel ≠ Betrug (kein Vorsatz).</div>

          <h3 class="sub"><span class="term" data-de="Umsatzsteuer" data-vi="thuế GTGT / VAT">Umsatzsteuer</span> (MwSt) — merken für KA</h3>
          <div class="note">⚠️ <b>Neu ab 01.01.2026</b> (Steueränderungsgesetz 2025, Bundesrat 19.12.2025): <b>alle Speisen 7 %</b> — egal ob vor Ort oder Außerhaus. Unterschieden wird jetzt nach <b>Speise (7 %) vs. Getränk (19 %)</b>, nicht mehr nach dem Ort.</div>
          <table>
            <tr><th>Leistung</th><th>Satz</th></tr>
            <tr><td>Speisen <b>vor Ort</b> (Verzehr an Ort und Stelle)</td><td><b>7 %</b></td></tr>
            <tr><td>Speisen <span class="term" data-de="Außerhaus" data-vi="mang về / giao đi">Außerhaus</span> (Imbiss, Lieferung, Abholung)</td><td><b>7 %</b></td></tr>
            <tr><td>Getränke (Regelfall)</td><td><b>19 %</b></td></tr>
            <tr><td>Milch/Milchmischgetränke ≥ 75 % Milch (o. Alkohol), Leitungswasser (Außerhaus)</td><td><b>7 %</b></td></tr>
            <tr><td><span class="term" data-de="Übernachtung" data-vi="lưu trú qua đêm">Übernachtung</span></td><td><b>7 %</b></td></tr>
          </table>
          <div class="formula">Netto = Brutto ÷ (1 + Satz) · USt = Brutto − Netto<br>
          Beispiel Speise 7 %: Brutto 10,70 € → Netto 10,00 € · USt 0,70 €<br>
          Beispiel Getränk 19 %: Brutto 11,90 € → Netto 10,00 € · USt 1,90 €</div>

          <h3 class="sub">Trinkgeld &amp; Beleg</h3>
          <ul>
            <li><span class="term" data-de="Trinkgeld" data-vi="tiền boa">Trinkgeld</span>: üblich 5–10 %, nicht Pflicht; steuerfrei bei direktem Empfang durch Service</li>
            <li><span class="term" data-de="Belegausgabepflicht" data-vi="nghĩa vụ xuất biên lai">Belegausgabepflicht</span> seit 01.01.2020 bei elektronischer Kasse</li>
            <li>Belegangaben u. a.: Name, Adresse, Datum, Zeiten, Art/Menge, Betrag, Steuersatz, Transaktionsnr.</li>
          </ul>
        `
      }
    ]
  }
};
window.bfk1AllItems = function bfk1AllItems() {
  const t = window.BFK1_THEMES;
  return [...t.lf6.items, ...t.lf9.items];
};
window.bfk1PageList = function bfk1PageList(pages) {
  if (!pages) return [];
  const list = [];
  for (let i = pages.from; i <= pages.to; i++) {
    const n = String(i).padStart(2, "0");
    list.push("./" + pages.folder + "/" + pages.prefix + "-" + n + ".jpg");
  }
  return list;
};
