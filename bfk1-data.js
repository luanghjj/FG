/* BfK-1 · KA Fr. Schuster · LF6/LF9 (JGDS) · DE UI, VI via .term */
window.BFK1_THEMES = {
  lf6: {
    id: "lf6", label: "Lernfeld 6", badge: "LF 6",
    title: "Gerichte, Menüs und Produkte anbieten",
    items: [
      {
        id: "gaestebewertungen", icon: "⭐",
        name: "Gästebewertungen auswerten",
        desc: "LS01 · Hotel Wind",
        pages: { folder: "2-Bfk1-lf6", from: 3, to: 10, prefix: "2-Bfk1-lf6" },
        content: `
          <h2>⭐ LS01 · Gästebewertungen auswerten</h2>
          <div class="hint">Hotel Wind · Steakrestaurant</div>
          <h3 class="sub">Auftrag</h3>
          <ol>
            <li><span class="term" data-de="Gästekommentare" data-vi="nhận xét của khách">Gästekommentare</span> auswerten</li>
            <li>E-Mail an die <span class="term" data-de="Geschäftsleitung" data-vi="ban giám đốc / lãnh đạo">Geschäftsleitung</span> mit 5 <span class="term" data-de="Verbesserungsvorschläge" data-vi="đề xuất cải thiện">Verbesserungsvorschlägen</span></li>
          </ol>
          <h3 class="sub">Kategorien</h3>
          <table>
            <tr><th>Bereich</th><th>Beispiel</th><th>Maßnahme</th></tr>
            <tr><td>Preis</td><td>zu teuer / Preis-Leistung</td><td>Angebote prüfen</td></tr>
            <tr><td><span class="term" data-de="Garstufe" data-vi="độ chín (của thịt)">Garstufe</span></td><td>medium → durch</td><td>Schulung, Check vor Ausgabe</td></tr>
            <tr><td>Anrichtung</td><td>Teller leer, wenig Gemüse</td><td>Standards setzen</td></tr>
            <tr><td>Service</td><td>unfreundlich, langsam</td><td>Ablauf / Briefing</td></tr>
            <tr><td><span class="term" data-de="Hygiene" data-vi="vệ sinh">Hygiene</span></td><td>Haare, schmutzige Teller</td><td>Kontrolle, HACCP</td></tr>
            <tr><td>Angebot</td><td>kaum vegetarisch</td><td>veggie Optionen</td></tr>
          </table>
          <div class="formula">Sammeln → Kategorisieren → Häufigkeit → Maßnahmen → E-Mail</div>
        `
      },
      {
        id: "ernaehrungsformen", icon: "🥗",
        name: "Ernährungsformen",
        desc: "LS02 · Essgewohnheiten",
        pages: { folder: "2-Bfk1-lf6", from: 10, to: 12, prefix: "2-Bfk1-lf6" },
        content: `
          <h2>🥗 Ernährungsformen</h2>
          <table>
            <tr><th>Form</th><th>Bedeutung</th></tr>
            <tr><td><span class="term" data-de="Vegetarisch" data-vi="ăn chay (không thịt/cá; thường vẫn ăn trứng, sữa)">Vegetarisch</span></td><td>kein Fleisch/Fisch</td></tr>
            <tr><td><span class="term" data-de="Vegan" data-vi="thuần chay (không sản phẩm từ động vật)">Vegan</span></td><td>keine tierischen Produkte</td></tr>
            <tr><td><span class="term" data-de="Flexitarier" data-vi="ăn chay linh hoạt (thỉnh thoảng ăn thịt)">Flexitarier</span></td><td>meist pflanzlich, selten Fleisch</td></tr>
            <tr><td><span class="term" data-de="Pescetarisch" data-vi="ăn cá, không thịt">Pescetarisch</span></td><td>Fisch ja, Fleisch nein</td></tr>
            <tr><td><span class="term" data-de="Laktosefrei" data-vi="không lactose / không đường sữa">Laktosefrei</span></td><td>keine/wenig Laktose</td></tr>
            <tr><td><span class="term" data-de="Glutenfrei" data-vi="không gluten (protein trong lúa mì…)">Glutenfrei</span></td><td>kein Weizen/Roggen/Gerste</td></tr>
            <tr><td><span class="term" data-de="Halal" data-vi="hợp chuẩn Hồi giáo">Halal</span></td><td>islamische Speiseregeln</td></tr>
            <tr><td><span class="term" data-de="Koscher" data-vi="hợp chuẩn Do Thái">Koscher</span></td><td>jüdische Speisegesetze</td></tr>
            <tr><td><span class="term" data-de="Low-Carb" data-vi="ít tinh bột / ít carb">Low-Carb</span> / <span class="term" data-de="Keto" data-vi="chế độ keto (rất ít carb, nhiều chất béo)">Keto</span></td><td>wenig Kohlenhydrate</td></tr>
          </table>
          <div class="note">Allergene nie raten — bei Unsicherheit Küche fragen.</div>
        `
      },
      {
        id: "speisen-regeln", icon: "📋",
        name: "Regeln für die Zusammenstellung von Speisen",
        desc: "Komponenten · Karte · Menü",
        pages: { folder: "2-Bfk1-lf6", from: 13, to: 18, prefix: "2-Bfk1-lf6" },
        content: `
          <h2>📋 Zusammenstellung von Speisen</h2>
          <div class="formula"><span class="term" data-de="Hauptkomponente" data-vi="thành phần chính">Hauptkomponente</span> + <span class="term" data-de="Soße" data-vi="nước sốt">Soße</span> + <span class="term" data-de="Gemüsebeilage" data-vi="món rau kèm">Gemüsebeilage</span> + <span class="term" data-de="Sättigungsbeilage" data-vi="món no (cơm, khoai, mì…)">Sättigungsbeilage</span> + ggf. kalte Beilage</div>
          <h3 class="sub">Speisekarte</h3>
          <ol>
            <li>Empfehlungen / Menüs</li>
            <li>Vorspeisen / Suppen</li>
            <li>Hauptgänge</li>
            <li>Desserts</li>
            <li>Getränke</li>
          </ol>
          <h3 class="sub">Menüregeln</h3>
          <ul>
            <li>keine Wiederholung (Zutat, Soße, Garart)</li>
            <li>Farbe · Konsistenz · Geschmack wechseln</li>
            <li>leicht → kräftig → leicht</li>
            <li><span class="term" data-de="Saison" data-vi="mùa vụ / theo mùa">Saison</span> beachten</li>
          </ul>
        `
      },
      {
        id: "obst", icon: "🍎",
        name: "Obst – Inhaltsstoffe & Zubereitung",
        desc: "Nährstoffe · Gararten",
        pages: { folder: "2-Bfk1-lf6", from: 19, to: 27, prefix: "2-Bfk1-lf6" },
        content: `
          <h2>🍎 Obst</h2>
          <h3 class="sub">Inhaltsstoffe</h3>
          <ul>
            <li>viel <span class="term" data-de="Wasser" data-vi="nước">Wasser</span> (ca. 60–90 %)</li>
            <li><span class="term" data-de="Kohlenhydrate" data-vi="tinh bột / carbohydrate">Kohlenhydrate</span>: Fructose, Glucose, Saccharose</li>
            <li><span class="term" data-de="Ballaststoffe" data-vi="chất xơ">Ballaststoffe</span>, z. B. <span class="term" data-de="Pektin" data-vi="pectin (chất tạo gel)">Pektin</span></li>
            <li>Vitamine (v. a. C), Mineralstoffe</li>
            <li><span class="term" data-de="Sekundäre Pflanzenstoffe" data-vi="hợp chất thực vật thứ cấp">Sekundäre Pflanzenstoffe</span> (z. B. Carotinoide)</li>
          </ul>
          <div class="note"><span class="term" data-de="5 am Tag" data-vi="chiến dịch 5 phần rau củ quả mỗi ngày">5 am Tag</span>: 5 Portionen Obst &amp; Gemüse, davon ca. 2× Obst.</div>
          <h3 class="sub">Zubereitung</h3>
          <table>
            <tr><th>Art</th><th>Nutzung</th></tr>
            <tr><td>roh</td><td>Obstsalat, zu Käse</td></tr>
            <tr><td><span class="term" data-de="Backen" data-vi="nướng lò">Backen</span></td><td>Bratapfel, Beilage</td></tr>
            <tr><td><span class="term" data-de="Pochieren" data-vi="chần / om nhẹ trong nước">Pochieren</span> / Kompott</td><td>Dessert, Belag</td></tr>
            <tr><td><span class="term" data-de="Sautieren" data-vi="xào nhanh">Sautieren</span> / karamellisieren</td><td>Beilage, Dessert</td></tr>
            <tr><td><span class="term" data-de="Frittieren" data-vi="chiên ngập dầu">Frittieren</span></td><td>festes Fruchtfleisch im Teig</td></tr>
            <tr><td><span class="term" data-de="Mazerieren" data-vi="ướp / ngâm hương liệu">Mazerieren</span></td><td>in Sirup/Alkohol ziehen lassen</td></tr>
          </table>
        `
      },
      {
        id: "huelsenfruechte", icon: "🫘",
        name: "Hülsenfrüchte",
        desc: "LS11 · Inhaltsstoffe · Garen",
        pages: { folder: "2-Bfk1-lf6", from: 28, to: 34, prefix: "2-Bfk1-lf6" },
        content: `
          <h2>🫘 Hülsenfrüchte</h2>
          <p><span class="term" data-de="Hülsenfrüchte" data-vi="họ đậu (đậu lăng, đậu Hà Lan, đậu cô ve…)">Hülsenfrüchte</span> = getrocknete reife Samen (<span class="term" data-de="Leguminosen" data-vi="cây họ đậu">Leguminosen</span>). Nur <b>gegart</b> essen.</p>
          <ul>
            <li>viel pflanzliches <span class="term" data-de="Eiweiß" data-vi="protein / đạm">Eiweiß</span> (ca. 20–34 %)</li>
            <li>Stärke, Ballaststoffe; wenig Fett (außer Erdnuss/Soja)</li>
            <li>roh: Giftstoffe (z. B. Hämagglutinine) → abkochen</li>
          </ul>
          <h3 class="sub">Küche</h3>
          <ul>
            <li><span class="term" data-de="Einweichen" data-vi="ngâm nước">Einweichen</span> vor dem Garen (Ausnahmen: z. B. rote Linsen)</li>
            <li>ca. <b>4× Wasser</b> beim Kochen</li>
            <li>trocken ca. 1 Jahr lagerfähig</li>
          </ul>
        `
      },
      {
        id: "getreide", icon: "🌾",
        name: "Getreide",
        desc: "LS12 · Gluten · Produkte",
        pages: { folder: "2-Bfk1-lf6", from: 35, to: 44, prefix: "2-Bfk1-lf6" },
        content: `
          <h2>🌾 Getreide</h2>
          <h3 class="sub">Korn</h3>
          <div class="grid2">
            <div class="mini"><h4><span class="term" data-de="Mehlkörper" data-vi="phần lõi bột (chủ yếu tinh bột)">Mehlkörper</span></h4><p>Stärke</p></div>
            <div class="mini"><h4>Rand / Aleuron</h4><p>Ballaststoffe, Mineralstoffe, B-Vitamine</p></div>
            <div class="mini"><h4><span class="term" data-de="Keimling" data-vi="mầm hạt">Keimling</span></h4><p>Fett, Vitamin E</p></div>
          </div>
          <div class="formula">ca. 60–70 % Stärke · 8–12 % Eiweiß · 2–8 % Ballaststoffe</div>
          <h3 class="sub"><span class="term" data-de="Gluten" data-vi="gluten (protein kết dính trong lúa mì…)">Gluten</span></h3>
          <div class="grid2">
            <div class="mini"><h4>mit Gluten</h4><p>Weizen, Roggen, Gerste, Dinkel, Grünkern</p></div>
            <div class="mini"><h4>ohne Gluten</h4><p>Reis, Mais, Hirse, Buchweizen, Quinoa, Amaranth</p></div>
          </div>
          <h3 class="sub">Produkte</h3>
          <ul>
            <li><span class="term" data-de="Vollkorn" data-vi="nguyên cám / whole grain">Vollkorn</span> = ganzes Korn</li>
            <li>Schrot · Flocken · Grütze · Graupen · Gries · Couscous</li>
            <li><span class="term" data-de="Pseudo-Getreide" data-vi="ngũ cốc giả (không thuộc họ lúa)">Pseudo-Getreide</span>: Buchweizen, Amaranth, Quinoa</li>
          </ul>
        `
      },
      {
        id: "menues-erstellen", icon: "🍽️",
        name: "Menüs erstellen",
        desc: "Folge · Regeln",
        pages: { folder: "2-Bfk1-lf9", from: 23, to: 24, prefix: "2-Bfk1-lf9" },
        content: `
          <h2>🍽️ Menüs erstellen</h2>
          <div class="formula"><span class="term" data-de="Menü" data-vi="thực đơn nhiều món / set menu">Menü</span> = ≥3 Gänge, abgestimmt, klassische Reihenfolge</div>
          <ol>
            <li>Vorspeise</li>
            <li>Suppe</li>
            <li>Hauptgericht</li>
            <li>Dessert</li>
          </ol>
          <ul>
            <li>keine Wiederholung</li>
            <li>nicht zu schwer hintereinander</li>
            <li>Saison &amp; Zielgruppe</li>
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
        desc: "LS01 · Palmero",
        pages: { folder: "2-Bfk1-lf9", from: 3, to: 9, prefix: "2-Bfk1-lf9" },
        content: `
          <h2>💳 Betriebsarten &amp; Zahlung</h2>
          <div class="hint">Restaurant <b>PALMERO</b> · <span class="term" data-de="Franchise" data-vi="nhượng quyền thương mại">Franchise</span></div>
          <p><span class="term" data-de="Franchisegeber" data-vi="bên nhượng quyền">Franchisegeber</span> (FG) erlaubt <span class="term" data-de="Franchisenehmer" data-vi="bên nhận quyền">Franchisenehmer</span> (FN) Marke/Know-how gegen Gebühr.</p>
          <h3 class="sub">Betriebsarten</h3>
          <ul>
            <li><span class="term" data-de="Beherbergung" data-vi="lưu trú / khách sạn">Beherbergung</span>: Hotel, Hotel garni, Pension, Motel</li>
            <li>Gastronomie: Restaurant, Steakhouse, Café, Bar</li>
            <li><span class="term" data-de="Systemgastronomie" data-vi="nhà hàng hệ thống / chuỗi chuẩn hóa">Systemgastronomie</span>: Quickservice, Verkehr, Handel, Fullservice</li>
            <li>Catering / Event · <span class="term" data-de="Gemeinschaftsverpflegung" data-vi="suất ăn tập thể (căng tin, bệnh viện…)">Gemeinschaftsverpflegung</span></li>
          </ul>
          <h3 class="sub">Zahlung</h3>
          <table>
            <tr><th>Art</th><th>+</th><th>−</th></tr>
            <tr><td>Bar</td><td>sofort, einfach</td><td>Wechselgeld, Risiko</td></tr>
            <tr><td><span class="term" data-de="Debitkarte" data-vi="thẻ ghi nợ (trừ tiền ngay)">Debitkarte</span></td><td>schnell, sicher</td><td>Terminal, Gebühren</td></tr>
            <tr><td><span class="term" data-de="Kreditkarte" data-vi="thẻ tín dụng">Kreditkarte</span></td><td>international</td><td>höhere Gebühren</td></tr>
            <tr><td><span class="term" data-de="Mobile Payment" data-vi="thanh toán di động">Mobile Payment</span></td><td>kontaktlos, bequem</td><td>Smartphone nötig</td></tr>
          </table>
        `
      },
      {
        id: "rechtliche-zahlungsabwicklung", icon: "⚖️",
        name: "Rechtliche Grundlagen zur Zahlungsabwicklung",
        desc: "LS03 · Vertrag · USt · Trinkgeld · Beleg",
        pages: { folder: "2-Bfk1-lf9", from: 10, to: 22, prefix: "2-Bfk1-lf9" },
        content: `
          <h2>⚖️ Rechtliche Grundlagen</h2>
          <h3 class="sub"><span class="term" data-de="Bewirtungsvertrag" data-vi="hợp đồng phục vụ / đãi tiệc (khách–nhà hàng)">Bewirtungsvertrag</span></h3>
          <ul>
            <li>gemischter Vertrag (nah am Kaufvertrag)</li>
            <li>zustande durch <b>Bestellung + Annahme</b></li>
            <li>Speisekarte ≠ verbindliches Angebot</li>
            <li>Wirt: Qualität in angemessener Zeit · Gast: annehmen &amp; zahlen</li>
          </ul>
          <h3 class="sub">Störungen</h3>
          <ul>
            <li>Gast: Zahlungsverweigerung, Annahmeverzug</li>
            <li>Betrieb: Nichtlieferung, lange Wartezeit, <span class="term" data-de="Schlechtleistung" data-vi="thực hiện kém / hàng lỗi">Schlechtleistung</span></li>
            <li>Rechte bei Mangel: <span class="term" data-de="Nacherfüllung" data-vi="thực hiện lại / sửa chữa">Nacherfüllung</span>, Rücktritt, Minderung, Schadensersatz</li>
          </ul>
          <h3 class="sub"><span class="term" data-de="Umsatzsteuer" data-vi="thuế doanh thu / VAT (MwSt)">Umsatzsteuer</span> (USt)</h3>
          <div class="formula">Netto = Brutto ÷ (1 + Satz) · USt = Brutto − Netto</div>
          <table>
            <tr><th>Leistung</th><th>Satz (Material 2026)</th></tr>
            <tr><td>Speisen vor Ort / außer Haus</td><td>7 %</td></tr>
            <tr><td>Getränke (Regelfall)</td><td>19 %</td></tr>
            <tr><td>Übernachtung</td><td>7 %</td></tr>
          </table>
          <h3 class="sub"><span class="term" data-de="Trinkgeld" data-vi="tiền boa">Trinkgeld</span></h3>
          <ul>
            <li>üblich 5–10 %, nicht Pflicht</li>
            <li>steuerfrei bei direktem Empfang durch Service</li>
            <li>steuerpflichtig, wenn AG sammelt &amp; verteilt</li>
          </ul>
          <h3 class="sub"><span class="term" data-de="Belegausgabepflicht" data-vi="nghĩa vụ xuất hóa đơn/biên lai">Belegausgabepflicht</span></h3>
          <ul>
            <li>seit 01.01.2020 bei elektronischer Kasse</li>
            <li>Angaben: Name, Adresse, Datum, Zeiten, Art/Menge, Betrag, Steuersatz, Transaktionsnr.</li>
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
