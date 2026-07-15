/* BfK-1 · detaillierte Themen + DE→VI Begriffe · KA Fr. Schuster */
window.BFK1_THEMES = {
  lf6: {
    id: "lf6", label: "Lernfeld 6", badge: "LF 6",
    title: "Gerichte, Menüs und Produkte anbieten",
    items: [
      {
        id: "gaestebewertungen", icon: "⭐",
        name: "Gästebewertungen auswerten",
        desc: "LS01 · Hotel Wind · Feedback → Maßnahmen",
        pages: { folder: "2-Bfk1-lf6", from: 3, to: 10, prefix: "2-Bfk1-lf6" },
        content: `
          <h2>⭐ LS01 · Gästebewertungen auswerten</h2>
          <div class="hint"><span class="term" data-de="Hotel Wind" data-vi="khách sạn / nhà hàng giả định trong bài">Hotel Wind</span> · Steakrestaurant · Umsatzrückgang</div>

          <h3 class="sub">1. Situation</h3>
          <p>Die <span class="term" data-de="Umsatzzahlen" data-vi="doanh số / số liệu doanh thu">Umsatzzahlen</span> im Steakrestaurant sind gesunken. Die <span class="term" data-de="Restaurantleitung" data-vi="ban quản lý nhà hàng">Restaurantleitung</span> hat Gäste befragt. Du wertest aus und schreibst eine E-Mail an die <span class="term" data-de="Geschäftsleitung" data-vi="ban giám đốc">Geschäftsleitung</span>.</p>

          <h3 class="sub">2. Auftrag (prüfungsrelevant)</h3>
          <ol>
            <li><span class="term" data-de="Gästekommentare" data-vi="nhận xét của khách">Gästekommentare</span> auswerten (Internet + Fragebögen)</li>
            <li>E-Mail mit <b>5 konkreten</b> <span class="term" data-de="Verbesserungsvorschläge" data-vi="đề xuất cải thiện">Verbesserungsvorschlägen</span></li>
          </ol>

          <h3 class="sub">3. Quellen</h3>
          <div class="grid2">
            <div class="mini"><h4><span class="term" data-de="Internetbewertungen" data-vi="đánh giá trên mạng">Internetbewertungen</span></h4><p>Sterne + Positiv / Neutral / Negativ</p></div>
            <div class="mini"><h4><span class="term" data-de="Feedbackbogen" data-vi="phiếu góp ý">Feedbackbogen</span></h4><p>Skala 1–5: Atmosphäre, Preis, Qualität, Sauberkeit, Service + Freitext</p></div>
          </div>

          <h3 class="sub">4. Kategorien &amp; Maßnahmen</h3>
          <table>
            <tr><th>Bereich</th><th>Beispiel-Kritik</th><th>Maßnahme</th></tr>
            <tr><td><span class="term" data-de="Preis-Leistung" data-vi="tỷ lệ giá – chất lượng">Preis-Leistung</span></td><td>„Preise gesalzen“</td><td>Angebote/Menüs prüfen, ehrlich beschreiben</td></tr>
            <tr><td><span class="term" data-de="Garstufe" data-vi="độ chín của thịt">Garstufe</span></td><td>medium → durch</td><td>Schulung, <span class="term" data-de="Ausgabe-Check" data-vi="kiểm tra trước khi mang ra">Ausgabe-Check</span></td></tr>
            <tr><td><span class="term" data-de="Anrichtung" data-vi="cách bày món">Anrichtung</span></td><td>Teller leer, wenig Gemüse</td><td>Standards, mehr Gemüse/Deko</td></tr>
            <tr><td><span class="term" data-de="Service" data-vi="phục vụ">Service</span></td><td>unfreundlich, langsam</td><td><span class="term" data-de="Briefing" data-vi="họp giao ban ngắn">Briefing</span>, Ablauf</td></tr>
            <tr><td><span class="term" data-de="Hygiene" data-vi="vệ sinh">Hygiene</span></td><td>Haare, schmutzige Teller</td><td>Kontrolle, HACCP, Arbeitskleidung</td></tr>
            <tr><td>Angebot</td><td>kaum vegetarisch</td><td>veggie/<span class="term" data-de="vegane Optionen" data-vi="món thuần chay">vegane Optionen</span></td></tr>
            <tr><td>Öffnung</td><td>Buffet zu früh abgeräumt</td><td>Zeiten klar kommunizieren</td></tr>
          </table>

          <h3 class="sub">5. Methode (merken!)</h3>
          <div class="formula"><span class="term" data-de="Sammeln" data-vi="thu thập">Sammeln</span> → <span class="term" data-de="Kategorisieren" data-vi="phân loại">Kategorisieren</span> → Häufigkeit/Schwere → Maßnahmen → <span class="term" data-de="Kontrolle" data-vi="kiểm tra kết quả">Kontrolle</span></div>

          <h3 class="sub">6. E-Mail-Aufbau</h3>
          <div class="formula">Betreff → Anrede → Anlass (kurz) → 5 nummerierte Vorschläge (Problem + Maßnahme) → Gruß</div>
          <div class="note">Jeder Vorschlag muss <b>konkret</b> sein – nicht nur „Service verbessern“.</div>
        `
      },
      {
        id: "ernaehrungsformen", icon: "🥗",
        name: "Ernährungsformen",
        desc: "LS02 · Essgewohnheiten der Gäste",
        pages: { folder: "2-Bfk1-lf6", from: 10, to: 12, prefix: "2-Bfk1-lf6" },
        content: `
          <h2>🥗 Ernährungsformen / Essgewohnheiten</h2>
          <div class="hint">Gäste richtig beraten · Allergene ernst nehmen</div>

          <h3 class="sub">Übersicht</h3>
          <table>
            <tr><th>Form</th><th>Was gilt?</th><th>Service-Hinweis</th></tr>
            <tr><td><span class="term" data-de="Allesesser" data-vi="người ăn đa dạng / không kiêng đặc biệt">Allesesser</span></td><td>keine besondere Einschränkung</td><td>klassisches Angebot</td></tr>
            <tr><td><span class="term" data-de="Vegetarisch" data-vi="ăn chay (không thịt, cá; thường vẫn trứng/sữa)">Vegetarisch</span></td><td>kein Fleisch/Fisch; oft Ei, Milch, Honig ok</td><td>Gemüse, Hülsenfrüchte, Käse-/Eigerichte</td></tr>
            <tr><td><span class="term" data-de="Vegan" data-vi="thuần chay (không sản phẩm động vật)">Vegan</span></td><td>keine tierischen Produkte</td><td>kein Ei, Milch, Honig, <span class="term" data-de="Gelatine" data-vi="gelatin (từ xương/da động vật)">Gelatine</span>, Fischsauce</td></tr>
            <tr><td><span class="term" data-de="Flexitarier" data-vi="ăn chay linh hoạt">Flexitarier</span></td><td>meist pflanzlich, selten Fleisch</td><td>starke veggie Optionen anbieten</td></tr>
            <tr><td><span class="term" data-de="Pescetarisch" data-vi="ăn cá, không thịt đỏ/gia cầm">Pescetarisch</span></td><td>Fisch ja, Fleisch nein</td><td>Fisch + pflanzliche Beilagen</td></tr>
            <tr><td><span class="term" data-de="Laktosefrei" data-vi="không lactose / đường sữa">Laktosefrei</span></td><td>keine/wenig Laktose</td><td>laktosefreie / pflanzliche Alternativen</td></tr>
            <tr><td><span class="term" data-de="Glutenfrei" data-vi="không gluten">Glutenfrei</span></td><td>kein Weizen/Roggen/Gerste</td><td><span class="term" data-de="Kreuzkontamination" data-vi="lây nhiễm chéo">Kreuzkontamination</span> vermeiden</td></tr>
            <tr><td><span class="term" data-de="Low-Carb" data-vi="ít tinh bột / carb">Low-Carb</span> / <span class="term" data-de="Keto" data-vi="chế độ keto">Keto</span></td><td>wenig Kohlenhydrate; Keto sehr fettbetont</td><td>weniger Nudeln/Reis/Brot</td></tr>
            <tr><td><span class="term" data-de="Halal" data-vi="hợp chuẩn Hồi giáo">Halal</span></td><td>islamische Regeln</td><td>kein Schwein; oft kein Alkohol in Speisen</td></tr>
            <tr><td><span class="term" data-de="Koscher" data-vi="hợp chuẩn Do Thái giáo">Koscher</span></td><td>jüdische Speisegesetze</td><td>kein Schwein; Milch &amp; Fleisch trennen</td></tr>
            <tr><td><span class="term" data-de="Bio" data-vi="hữu cơ / organic">Bio</span></td><td>bevorzugt Bio-Produkte</td><td>Herkunft kommunizieren</td></tr>
            <tr><td><span class="term" data-de="Zöliakie" data-vi="bệnh không dung nạp gluten">Zöliakie</span></td><td>Krankheit – strikt glutenfrei</td><td>nie „ein bisschen Weizen“ riskieren</td></tr>
          </table>

          <h3 class="sub">Merke für den Service</h3>
          <ul>
            <li><span class="term" data-de="Allergene" data-vi="chất gây dị ứng">Allergene</span> &amp; Unverträglichkeiten immer ernst nehmen</li>
            <li>Bei Unsicherheit: <b>Küche fragen</b>, nie raten</li>
            <li>Eigene Bretter/Geräte wenn nötig (glutenfrei, vegan)</li>
          </ul>
        `
      },
      {
        id: "speisen-regeln", icon: "📋",
        name: "Regeln für die Zusammenstellung von Speisen",
        desc: "Komponenten · Karte · Menüregeln",
        pages: { folder: "2-Bfk1-lf6", from: 13, to: 18, prefix: "2-Bfk1-lf6" },
        content: `
          <h2>📋 Zusammenstellung von Speisen &amp; Gerichten</h2>

          <h3 class="sub">1. Lebensmittel</h3>
          <p><span class="term" data-de="Lebensmittel" data-vi="thực phẩm">Lebensmittel</span> = pflanzlich oder tierisch, zum Verzehr bestimmt. Dienen der <span class="term" data-de="Sättigung" data-vi="no bụng">Sättigung</span> und dem Genuss.</p>

          <h3 class="sub">2. Gericht = Komponenten</h3>
          <div class="formula">
            <span class="term" data-de="Hauptkomponente" data-vi="thành phần chính (thịt, cá, món chính)">Hauptkomponente</span> +
            <span class="term" data-de="Soße" data-vi="nước sốt">Soße</span> +
            <span class="term" data-de="Gemüsebeilage" data-vi="món rau kèm">Gemüsebeilage</span> +
            <span class="term" data-de="Sättigungsbeilage" data-vi="món no: cơm, khoai, mì">Sättigungsbeilage</span> +
            ggf. <span class="term" data-de="kalte Beilage" data-vi="món nguội kèm (salad, mứt…)">kalte Beilage</span>
          </div>
          <p><b>Beispiel:</b> Gebratene Hähnchenbrust · Schnittlauchsoße · Zucchini-Möhren · Butternudeln · Beilagensalat</p>

          <h3 class="sub">3. Kartengerechte Formulierung</h3>
          <ul>
            <li>Gast muss verstehen, <b>was</b> kommt</li>
            <li>appetitlich, informativ, einheitliche Schreibweise</li>
            <li>nicht alle Komponenten immer nötig (z. B. Wiener Schnitzel mit Pommes)</li>
          </ul>

          <h3 class="sub">4. Aufbau der Speisekarte</h3>
          <ol>
            <li><span class="term" data-de="Empfehlungen" data-vi="món đề xuất">Empfehlungen</span> / Menüs / Saison</li>
            <li><span class="term" data-de="Vorspeisen" data-vi="khai vị">Vorspeisen</span> / Suppen</li>
            <li><span class="term" data-de="Hauptgänge" data-vi="món chính">Hauptgänge</span></li>
            <li><span class="term" data-de="Desserts" data-vi="món tráng miệng">Desserts</span></li>
            <li>Getränke (oft separat)</li>
          </ol>

          <h3 class="sub">5. Menüregeln</h3>
          <div class="grid2">
            <div class="mini"><h4>Keine Wiederholung</h4><p>Gleiche Zutat, Soße, <span class="term" data-de="Garart" data-vi="cách chế biến / phương pháp nấu">Garart</span> nicht mehrfach</p></div>
            <div class="mini"><h4>Abwechslung</h4><p>Farbe, <span class="term" data-de="Konsistenz" data-vi="kết cấu (giòn, mềm…)">Konsistenz</span>, Geschmack</p></div>
            <div class="mini"><h4>Leicht → kräftig → leicht</h4><p>Nicht alles schwer/fett hintereinander</p></div>
            <div class="mini"><h4><span class="term" data-de="Saison" data-vi="mùa vụ">Saison</span></h4><p>Spargel, Wild, Erdbeeren zur echten Zeit</p></div>
          </div>
        `
      },
      {
        id: "obst", icon: "🍎",
        name: "Obst – Inhaltsstoffe & Zubereitung",
        desc: "Nährstoffe · Gararten · Obstsalat",
        pages: { folder: "2-Bfk1-lf6", from: 19, to: 27, prefix: "2-Bfk1-lf6" },
        content: `
          <h2>🍎 Obst – Inhaltsstoffe und Zubereitung</h2>

          <h3 class="sub">Definition</h3>
          <p><span class="term" data-de="Obst" data-vi="trái cây">Obst</span> = essbare, saftige Samen/Früchte meist mehrjähriger Pflanzen.</p>

          <h3 class="sub">Inhaltsstoffe</h3>
          <table>
            <tr><th>Stoff</th><th>Anteil / Rolle</th></tr>
            <tr><td><span class="term" data-de="Wasser" data-vi="nước">Wasser</span></td><td>ca. 60–90 % – Hauptbestandteil</td></tr>
            <tr><td><span class="term" data-de="Kohlenhydrate" data-vi="tinh bột / carbohydrate">Kohlenhydrate</span></td><td><span class="term" data-de="Fructose" data-vi="đường quả">Fructose</span>, Glucose, Saccharose</td></tr>
            <tr><td><span class="term" data-de="Ballaststoffe" data-vi="chất xơ">Ballaststoffe</span></td><td>u. a. <span class="term" data-de="Pektin" data-vi="pectin (tạo gel)">Pektin</span> (Apfel, Hagebutte…)</td></tr>
            <tr><td>Vitamine</td><td>v. a. <span class="term" data-de="Vitamin C" data-vi="vitamin C">Vitamin C</span>; auch B1/B2</td></tr>
            <tr><td><span class="term" data-de="Mineralstoffe" data-vi="khoáng chất">Mineralstoffe</span></td><td>Kalium, Calcium, Magnesium…</td></tr>
            <tr><td>Fett / Eiweiß</td><td>meist gering (Ausnahme: <span class="term" data-de="Schalenobst" data-vi="quả hạch / hạt có vỏ">Schalenobst</span>)</td></tr>
            <tr><td><span class="term" data-de="Sekundäre Pflanzenstoffe" data-vi="hợp chất thực vật thứ cấp">Sekundäre Pflanzenstoffe</span></td><td>z. B. <span class="term" data-de="Carotinoide" data-vi="carotenoid">Carotinoide</span></td></tr>
          </table>
          <div class="note"><span class="term" data-de="5 am Tag" data-vi="5 phần rau củ quả mỗi ngày">5 am Tag</span>: 5 Portionen Obst &amp; Gemüse, davon ca. 2× Obst (1 Portion ≈ Handvoll).</div>

          <h3 class="sub">Vorbereitung</h3>
          <div class="formula">Waschen → schälen / entkernen / entsteinen → schneiden (Scheiben, Würfel, Spalten)</div>

          <h3 class="sub">Zubereitungsarten</h3>
          <table>
            <tr><th>Art</th><th>Was?</th><th>Beispiel</th></tr>
            <tr><td>roh</td><td>frisch, max. Vitamine</td><td><span class="term" data-de="Obstsalat" data-vi="salad trái cây">Obstsalat</span>, zu Käse</td></tr>
            <tr><td><span class="term" data-de="Backen" data-vi="nướng lò">Backen</span></td><td>Ofen / im Teig</td><td><span class="term" data-de="Bratapfel" data-vi="táo nướng">Bratapfel</span></td></tr>
            <tr><td><span class="term" data-de="Pochieren" data-vi="chần / om nhẹ">Pochieren</span></td><td>sanft in Flüssigkeit</td><td><span class="term" data-de="Kompott" data-vi="mứt quả / quả om">Kompott</span></td></tr>
            <tr><td><span class="term" data-de="Sautieren" data-vi="xào nhanh">Sautieren</span></td><td>Pfanne</td><td>Beilage zu Fleisch</td></tr>
            <tr><td><span class="term" data-de="Karamellisieren" data-vi="thắng đường / caramel hóa">Karamellisieren</span></td><td>Zucker rösten</td><td>Dessert</td></tr>
            <tr><td><span class="term" data-de="Frittieren" data-vi="chiên ngập dầu">Frittieren</span></td><td>heißes Fett, oft im Teig</td><td>Apfel, Banane, Ananas</td></tr>
            <tr><td><span class="term" data-de="Mazerieren" data-vi="ướp / ngâm hương">Mazerieren</span></td><td>in Sirup/Alkohol ziehen</td><td>Erdbeeren in Portwein</td></tr>
            <tr><td><span class="term" data-de="Pürieren" data-vi="xay nhuyễn">Pürieren</span></td><td>Mus / Sauce</td><td><span class="term" data-de="Coulis" data-vi="sốt quả xay">Coulis</span>, Smoothie</td></tr>
          </table>

          <h3 class="sub">Selbstgemacht vs. Convenience</h3>
          <div class="grid2">
            <div class="mini"><h4>Selbstgemacht</h4><p>frisch, Sorte wählbar – mehr Arbeit</p></div>
            <div class="mini"><h4><span class="term" data-de="Convenience" data-vi="thực phẩm tiện lợi / chế biến sẵn">Convenience</span></h4><p>schnell, standardisiert – oft teurer/pro kg</p></div>
          </div>
        `
      },
      {
        id: "huelsenfruechte", icon: "🫘",
        name: "Hülsenfrüchte",
        desc: "LS11 · Inhaltsstoffe · Einweichen · Garen",
        pages: { folder: "2-Bfk1-lf6", from: 28, to: 34, prefix: "2-Bfk1-lf6" },
        content: `
          <h2>🫘 Hülsenfrüchte – Inhaltsstoffe und Zubereitung</h2>

          <h3 class="sub">Definition</h3>
          <p><span class="term" data-de="Hülsenfrüchte" data-vi="họ đậu (đậu lăng, đậu, đậu Hà Lan…)">Hülsenfrüchte</span> =
          <span class="term" data-de="getrocknete reife Samen" data-vi="hạt chín sấy khô">getrocknete reife Samen</span> in Fruchthülsen
          (<span class="term" data-de="Leguminosen" data-vi="cây họ đậu">Leguminosen</span> / Schmetterlingsblütler).
          Nur <b>gegart</b> essen.</p>

          <h3 class="sub">Inhaltsstoffe</h3>
          <ul>
            <li>hohes <span class="term" data-de="pflanzliches Eiweiß" data-vi="đạm thực vật">pflanzliches Eiweiß</span> (ca. 20–34 %)</li>
            <li>viel <span class="term" data-de="Stärke" data-vi="tinh bột">Stärke</span> &amp; Ballaststoffe</li>
            <li>wenig Fett (Ausnahme: <span class="term" data-de="Erdnüsse" data-vi="đậu phộng">Erdnüsse</span>, <span class="term" data-de="Sojabohnen" data-vi="đậu nành">Sojabohnen</span>)</li>
            <li>Mineralstoffe: Eisen, Calcium, Phosphor, Magnesium</li>
            <li>roh: <span class="term" data-de="Giftstoffe" data-vi="chất độc">Giftstoffe</span> (z. B. <span class="term" data-de="Hämagglutinine" data-vi="hemagglutinin">Hämagglutinine</span>) → abkochen</li>
          </ul>

          <h3 class="sub">Wichtige Arten</h3>
          <table>
            <tr><th>Art</th><th>Beispiele</th><th>Hinweis</th></tr>
            <tr><td><span class="term" data-de="Linsen" data-vi="đậu lăng">Linsen</span></td><td>Tellerlinsen, rote Linsen, Pardina</td><td>rote oft ohne Einweichen</td></tr>
            <tr><td><span class="term" data-de="Bohnen" data-vi="đậu">Bohnen</span></td><td>Kidney, Wachtelbohnen, Soja</td><td>immer durchgaren</td></tr>
            <tr><td><span class="term" data-de="Erbsen" data-vi="đậu Hà Lan">Erbsen</span></td><td>gelb/grün, geschält</td><td>Püree, Suppe, Eintopf</td></tr>
          </table>

          <h3 class="sub">Küchentechnik (KA!)</h3>
          <ul>
            <li>trocken ca. <b>1 Jahr</b> lagerfähig</li>
            <li><span class="term" data-de="Einweichen" data-vi="ngâm nước">Einweichen</span> vor dem Garen</li>
            <li>Salzwasser / kochendes Übergießen kann Einweichzeit verkürzen</li>
            <li>beim Kochen ca. <b>4× Wasser</b></li>
            <li>quellen stark, schäumen oft → kontrollieren</li>
          </ul>
          <div class="note">⚠️ Rohe Bohnen können giftig sein → immer ausreichend garen.</div>
        `
      },
      {
        id: "getreide", icon: "🌾",
        name: "Getreide",
        desc: "LS12 · Korn · Gluten · Produkte",
        pages: { folder: "2-Bfk1-lf6", from: 35, to: 44, prefix: "2-Bfk1-lf6" },
        content: `
          <h2>🌾 Getreide – Inhaltsstoffe und Zubereitung</h2>

          <h3 class="sub">Aufbau des Korns</h3>
          <div class="grid2">
            <div class="mini"><h4><span class="term" data-de="Mehlkörper" data-vi="phần lõi bột">Mehlkörper</span></h4><p>hauptsächlich <span class="term" data-de="Stärke" data-vi="tinh bột">Stärke</span></p></div>
            <div class="mini"><h4>Rand / <span class="term" data-de="Aleuronschicht" data-vi="lớp aleuron">Aleuron</span></h4><p>Ballaststoffe, Mineralstoffe, B-Vitamine</p></div>
            <div class="mini"><h4><span class="term" data-de="Keimling" data-vi="mầm hạt">Keimling</span></h4><p>Fett, <span class="term" data-de="Vitamin E" data-vi="vitamin E">Vitamin E</span></p></div>
          </div>
          <div class="formula">ca. 60–70 % Stärke · 8–12 % Eiweiß · 2–8 % Ballaststoffe · 10–15 % Wasser</div>

          <h3 class="sub"><span class="term" data-de="Gluten" data-vi="gluten">Gluten</span> (Kleber)</h3>
          <div class="grid2">
            <div class="mini"><h4>mit Gluten</h4><p><span class="term" data-de="Weizen" data-vi="lúa mì">Weizen</span>, <span class="term" data-de="Roggen" data-vi="lúa mạch đen">Roggen</span>, <span class="term" data-de="Gerste" data-vi="lúa mạch">Gerste</span>, <span class="term" data-de="Dinkel" data-vi="lúa mì spelt">Dinkel</span>, Grünkern</p></div>
            <div class="mini"><h4>ohne Gluten</h4><p>Reis, Mais, Hirse, <span class="term" data-de="Buchweizen" data-vi="kiều mạch">Buchweizen</span>, Amaranth, <span class="term" data-de="Quinoa" data-vi="quinoa">Quinoa</span></p></div>
          </div>
          <p><span class="term" data-de="Zöliakie" data-vi="bệnh Celiac / không dung nạp gluten">Zöliakie</span> = Krankheit → strikt glutenfrei. Hafer nur bei sicherer Trennung.</p>

          <h3 class="sub">Glutenfrei arbeiten</h3>
          <ul>
            <li>Soßen mit Mais-/Reis-/Kartoffelstärke binden</li>
            <li>eigene Bretter, Messer, Brotkorb</li>
            <li>Frittierfett nicht mit glutenhaltigen Produkten „verunreinigen“</li>
            <li>Backen oft ohne Umluft neben glutenhaltigem Gebäck</li>
          </ul>

          <h3 class="sub">Produkte</h3>
          <table>
            <tr><th>Produkt</th><th>Erklärung</th></tr>
            <tr><td><span class="term" data-de="Vollkorn" data-vi="nguyên cám">Vollkorn</span></td><td>ganzes Korn</td></tr>
            <tr><td><span class="term" data-de="Schrot" data-vi="bột thô xay vỡ">Schrot</span></td><td>grob zerkleinert</td></tr>
            <tr><td><span class="term" data-de="Flocken" data-vi="yến mạch / ngũ cốc cán dẹt">Flocken</span></td><td>gedämpft, gepresst, getrocknet</td></tr>
            <tr><td><span class="term" data-de="Grütze" data-vi="hạt vỡ / groats">Grütze</span></td><td>zerkleinerte Körner</td></tr>
            <tr><td><span class="term" data-de="Graupen" data-vi="hạt mạch lột vỏ">Graupen</span></td><td>geschälte, polierte Gerste</td></tr>
            <tr><td><span class="term" data-de="Gries" data-vi="bột gries / semolina thô">Gries</span></td><td>feiner als Schrot, gröber als Mehl</td></tr>
            <tr><td><span class="term" data-de="Couscous" data-vi="couscous">Couscous</span></td><td>vorgekochter Hartweizen</td></tr>
          </table>
          <p><span class="term" data-de="Pseudo-Getreide" data-vi="ngũ cốc giả">Pseudo-Getreide</span>: nicht botanisch Getreide, aber ähnlich genutzt (Buchweizen, Amaranth, Quinoa).</p>
        `
      },
      {
        id: "menues-erstellen", icon: "🍽️",
        name: "Menüs erstellen",
        desc: "Menüfolge · Regeln · Sprache",
        pages: { folder: "2-Bfk1-lf9", from: 23, to: 24, prefix: "2-Bfk1-lf9" },
        content: `
          <h2>🍽️ Menüs erstellen</h2>

          <h3 class="sub">Definition</h3>
          <div class="formula"><span class="term" data-de="Menü" data-vi="set menu / thực đơn nhiều món">Menü</span> = ≥3 Gänge, geschmacklich abgestimmt, klassische Reihenfolge</div>

          <h3 class="sub">Beispiel 4-Gang</h3>
          <ol>
            <li><span class="term" data-de="Vorspeise" data-vi="khai vị">Vorspeise</span></li>
            <li><span class="term" data-de="Suppe" data-vi="súp">Suppe</span></li>
            <li><span class="term" data-de="Hauptgericht" data-vi="món chính">Hauptgericht</span></li>
            <li><span class="term" data-de="Nachspeise" data-vi="món tráng miệng">Nachspeise</span> / Dessert</li>
          </ol>
          <p>In der KA oft: vegetarisches Menü, veganes Menü, Saison-Menü.</p>

          <h3 class="sub">Regeln</h3>
          <ul>
            <li>keine Wiederholung von Hauptzutat / Soße / Garart</li>
            <li>Farbe, Konsistenz, Geschmack abwechseln</li>
            <li>nicht zu schwer hintereinander</li>
            <li><span class="term" data-de="Zielgruppe" data-vi="nhóm khách mục tiêu">Zielgruppe</span> &amp; Saison beachten</li>
            <li>Allergene / Kennzeichnung nach Vorgabe</li>
          </ul>

          <h3 class="sub">Sprache auf der Karte</h3>
          <ul>
            <li>korrektes Deutsch, einheitlich</li>
            <li>appetitlich und verständlich</li>
            <li>Gast soll wissen, was er bekommt</li>
          </ul>
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
        name: "Betriebsarten und Zahlungsmöglichkeiten",
        desc: "LS01 · Palmero · Franchise · Zahlungsarten",
        pages: { folder: "2-Bfk1-lf9", from: 3, to: 9, prefix: "2-Bfk1-lf9" },
        content: `
          <h2>💳 Betriebsarten &amp; Zahlungsmöglichkeiten</h2>
          <div class="hint">Restaurant <b>PALMERO</b> · Tübingen · <span class="term" data-de="Franchise" data-vi="nhượng quyền">Franchise</span></div>

          <h3 class="sub">Franchise</h3>
          <p><span class="term" data-de="Franchisegeber" data-vi="bên nhượng quyền">Franchisegeber</span> (FG) erlaubt
          <span class="term" data-de="Franchisenehmer" data-vi="bên nhận quyền">Franchisenehmer</span> (FN)
          Marke und Know-how gegen <span class="term" data-de="Gebühr" data-vi="phí">Gebühr</span>. Beide sind selbstständige Kaufleute.</p>

          <h3 class="sub">Betriebsarten</h3>
          <table>
            <tr><th>Gruppe</th><th>Beispiele</th></tr>
            <tr><td><span class="term" data-de="Beherbergung" data-vi="lưu trú">Beherbergung</span></td><td>Stadthotel, Kurhotel, Hotel garni, Pension, Motel</td></tr>
            <tr><td>Gastronomie</td><td>Restaurant, Steakhouse, Café, Bistro, Bar/Kneipe</td></tr>
            <tr><td><span class="term" data-de="Systemgastronomie" data-vi="nhà hàng hệ thống / chuỗi">Systemgastronomie</span></td><td>Quickservice, Verkehr, Handel, Fullservice-Ketten</td></tr>
            <tr><td>Catering / Event</td><td>Veranstaltungen, Stadien</td></tr>
            <tr><td><span class="term" data-de="Gemeinschaftsverpflegung" data-vi="suất ăn tập thể">Gemeinschaftsverpflegung</span></td><td>Kantine, Schule, Krankenhaus, Mensa</td></tr>
          </table>

          <h3 class="sub">Systemgastronomie – Segmente</h3>
          <ul>
            <li><span class="term" data-de="Quickservice" data-vi="phục vụ nhanh">Quickservice</span>: schnell, straffes Sortiment, oft <span class="term" data-de="Counter" data-vi="quầy order">Counter</span></li>
            <li>Verkehrs-/Messegastronomie: Bahnhof, Flughafen, Autobahn</li>
            <li>Handelsgastronomie: z. B. in Kaufhäusern / IKEA</li>
            <li><span class="term" data-de="Fullservice" data-vi="phục vụ đầy đủ tại bàn">Fullservice</span>: Bedienung wie im Restaurant, oft zentral gesteuert</li>
          </ul>

          <h3 class="sub">Zahlungsmöglichkeiten</h3>
          <table>
            <tr><th>Art</th><th>Vorteile</th><th>Nachteile</th></tr>
            <tr><td><span class="term" data-de="Barzahlung" data-vi="trả tiền mặt">Barzahlung</span></td><td>sofort, einfach, anonym</td><td>Wechselgeld, Diebstahlrisiko</td></tr>
            <tr><td><span class="term" data-de="Debitkarte" data-vi="thẻ ghi nợ">Debitkarte</span> (pay now)</td><td>schnell, PIN/kontaktlos</td><td>Terminal, Gebühren</td></tr>
            <tr><td><span class="term" data-de="Kreditkarte" data-vi="thẻ tín dụng">Kreditkarte</span> (pay later)</td><td>international, hohe Beträge</td><td>höhere Gebühren</td></tr>
            <tr><td><span class="term" data-de="Prepaid-Karte" data-vi="thẻ trả trước">Prepaid</span></td><td>begrenztes Risiko</td><td>Guthabenlimit</td></tr>
            <tr><td><span class="term" data-de="Überweisung" data-vi="chuyển khoản">Überweisung</span></td><td>dokumentiert, hohe Beträge</td><td>nicht sofort</td></tr>
            <tr><td><span class="term" data-de="Mobile Payment" data-vi="thanh toán di động">Mobile Payment</span></td><td>sehr schnell, bequem</td><td>Smartphone/Akku</td></tr>
          </table>
        `
      },
      {
        id: "rechtliche-zahlungsabwicklung", icon: "⚖️",
        name: "Rechtliche Grundlagen zur Zahlungsabwicklung",
        desc: "LS03 · Vertrag · USt · Trinkgeld · Beleg · Fälle",
        pages: { folder: "2-Bfk1-lf9", from: 10, to: 22, prefix: "2-Bfk1-lf9" },
        content: `
          <h2>⚖️ Rechtliche Grundlagen zur Zahlungsabwicklung</h2>
          <div class="hint">Zentral für die KA · Fälle lösen können</div>

          <h3 class="sub">1. <span class="term" data-de="Bewirtungsvertrag" data-vi="hợp đồng phục vụ khách">Bewirtungsvertrag</span></h3>
          <ul>
            <li>im BGB nicht eigens geregelt → <span class="term" data-de="gemischter Vertrag" data-vi="hợp đồng hỗn hợp">gemischter Vertrag</span></li>
            <li>nahe am <span class="term" data-de="Kaufvertrag" data-vi="hợp đồng mua bán">Kaufvertrag</span> (Leistung gegen Geld)</li>
            <li>zustande durch <b>Bestellung + Annahme</b></li>
            <li><span class="term" data-de="Speisekarte" data-vi="thực đơn">Speisekarte</span> / Außenverzeichnis = noch <b>kein</b> verbindliches Angebot</li>
            <li>Wirt darf ablehnen (z. B. Speise aus)</li>
          </ul>
          <div class="grid2">
            <div class="mini"><h4>Pflichten Wirt</h4><p>Qualität in angemessener Zeit liefern</p></div>
            <div class="mini"><h4>Pflichten Gast</h4><p>annehmen und <span class="term" data-de="bezahlen" data-vi="thanh toán">bezahlen</span></p></div>
          </div>
          <p><span class="term" data-de="Reservierung" data-vi="đặt bàn">Reservierung</span> oft vorvertraglich; Nichterscheinen kann Schadensersatz auslösen.</p>

          <h3 class="sub">2. Störungen</h3>
          <h3 class="sub">Durch den Gast</h3>
          <ul>
            <li>Zahlungsverweigerung / <span class="term" data-de="Zechprellerei" data-vi="ăn quỵt / không trả tiền">Zechprellerei</span></li>
            <li><span class="term" data-de="Annahmeverzug" data-vi="chậm nhận hàng/dịch vụ">Annahmeverzug</span></li>
            <li>Vorsatz schon beim Bestellen → möglich <span class="term" data-de="Betrug" data-vi="lừa đảo">Betrug</span></li>
          </ul>
          <h3 class="sub">Durch den Betrieb</h3>
          <ul>
            <li>Nichtlieferung · unangemessen lange Wartezeit</li>
            <li><span class="term" data-de="Schlechtleistung" data-vi="phục vụ/hàng kém">Schlechtleistung</span> (falsch/mangelhaft)</li>
            <li>Rechte: <span class="term" data-de="Nacherfüllung" data-vi="làm lại / giao lại">Nacherfüllung</span>, Rücktritt, <span class="term" data-de="Minderung" data-vi="giảm giá">Minderung</span>, Schadensersatz</li>
          </ul>

          <h3 class="sub">3. <span class="term" data-de="Umsatzsteuer" data-vi="thuế GTGT / VAT">Umsatzsteuer</span> (USt / MwSt)</h3>
          <div class="formula">
            Brutto = inkl. USt · Netto = ohne USt<br>
            Netto = Brutto ÷ (1 + Satz)<br>
            USt = Brutto − Netto · Brutto = Netto × (1 + Satz)
          </div>
          <table>
            <tr><th>Leistung</th><th>Satz (Material 2026)</th></tr>
            <tr><td>Speisen vor Ort / außer Haus</td><td><b>7 %</b></td></tr>
            <tr><td>Getränke (Regelfall)</td><td><b>19 %</b></td></tr>
            <tr><td>Übernachtung</td><td><b>7 %</b></td></tr>
          </table>
          <div class="mini" style="margin-top:10px"><h4>Beispiel</h4><p>Brutto 119 € bei 19 % → Netto <b>100 €</b> · USt <b>19 €</b></p></div>

          <h3 class="sub">4. <span class="term" data-de="Trinkgeld" data-vi="tiền boa">Trinkgeld</span></h3>
          <ul>
            <li>üblich 5–10 %, <b>nicht Pflicht</b></li>
            <li>Lohn darf nicht durch Trinkgeld ersetzt werden</li>
            <li>steuerfrei bei direktem Empfang durch Service</li>
            <li>steuerpflichtig, wenn AG sammelt &amp; verteilt</li>
            <li>≠ <span class="term" data-de="Bedienungsgeld" data-vi="phụ phí phục vụ (tính trong hóa đơn)">Bedienungsgeld</span></li>
          </ul>

          <h3 class="sub">5. <span class="term" data-de="Belegausgabepflicht" data-vi="nghĩa vụ xuất biên lai">Belegausgabepflicht</span></h3>
          <ul>
            <li>seit 01.01.2020 bei elektronischen Kassensystemen</li>
            <li>Beleg dem Gast zur Verfügung stellen (Mitnahme nicht Pflicht)</li>
            <li>Angaben u. a.: Name, Adresse, Datum, Zeiten, Art/Menge, Betrag, Steuersatz, Transaktionsnr.</li>
          </ul>

          <h3 class="sub">🧩 Fall-Muster</h3>
          <div class="mini" style="margin-bottom:8px"><h4>Speise aus</h4><p>Kein Vertragsbruch, wenn noch nicht/unmöglich – Alternative + Entschuldigung.</p></div>
          <div class="mini" style="margin-bottom:8px"><h4>Falsche Garstufe</h4><p>Schlechtleistung → Nacherfüllung / Minderung.</p></div>
          <div class="mini"><h4>USt rechnen</h4><p>Brutto &amp; Satz gegeben → Netto und Steuer mit Formel.</p></div>
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
