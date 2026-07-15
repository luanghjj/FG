/* BfK-1 · KA Fr. Schuster · Inhalte aus 2-Bfk1-lf6 + 2-Bfk1-lf9 (JGDS) */
window.BFK1_THEMES = {
  lf6: {
    id: "lf6",
    label: "Lernfeld 6",
    badge: "LF 6",
    title: "Gerichte, Menüs und Produkte anbieten",
    items: [
      {
        id: "gaestebewertungen",
        icon: "⭐",
        name: "Gästebewertungen auswerten",
        desc: "LS01 · Hotel Wind · Feedback → Verbesserungen",
        pages: { folder: "2-Bfk1-lf6", from: 3, to: 10, prefix: "2-Bfk1-lf6" },
        content: `
          <h2>⭐ LS01 · Gästebedarfe vergleichen / Gästebewertungen</h2>
          <div class="hint">Lernfeld 06 · Betrieb: <b>Hotel Wind</b> (Bad Krozingen) · Steakrestaurant</div>

          <h3 class="sub">Situation (aus der Lernsituation)</h3>
          <p>Umsatz im Steakrestaurant ist zurückgegangen. Die Leitung hat Gäste befragt. Du wertest Kommentare aus und schreibst eine E-Mail mit <b>5 konkreten Verbesserungsvorschlägen</b>.</p>

          <h3 class="sub">Quellen der Bewertung</h3>
          <div class="grid2">
            <div class="mini"><h4>Internetbewertungen</h4><p>Sterne + Positiv / Neutral / Negativ (z. B. 2/5, 5/5).</p></div>
            <div class="mini"><h4>Feedbackbögen</h4><p>Skala 1–5 zu Atmosphäre, Preis, Qualität, Sauberkeit, Service + Freitext.</p></div>
          </div>

          <h3 class="sub">Typische Kritikpunkte (Beispiele aus Anlagen)</h3>
          <table>
            <tr><th>Bereich</th><th>Gästekommentar (Beispiel)</th><th>Mögliche Maßnahme</th></tr>
            <tr><td>Preis</td><td>„Preise kräftig gesalzen“ / Leistung nicht preiswert</td><td>Preis-Leistung prüfen, Menüs/ Mittagsangebote, ehrliche Beschreibung</td></tr>
            <tr><td>Garstufe</td><td>medium bestellt → durchgebraten</td><td>Schulung Garstufen, Check vor Ausgabe, Probeportion</td></tr>
            <tr><td>Anrichtung</td><td>Teller leer, keine Deko, wenig Gemüse</td><td>Anrichtestandards, Gemüseauswahl erweitern</td></tr>
            <tr><td>Service</td><td>unfreundlich, spät begrüßt, Getränke verzögert</td><td>Serviceablauf, Briefing, Arbeitskleidung</td></tr>
            <tr><td>Hygiene</td><td>Haare im Essen, schmutzige Teller, Buffet mitgenommen</td><td>HACCP, Kontrolle Buffet, Personalhygiene</td></tr>
            <tr><td>Öffnungszeiten</td><td>späte Reservierung, Buffet vorzeitig abgeräumt</td><td>klare Zeiten kommunizieren, Küchenschluss regeln</td></tr>
            <tr><td>Angebot</td><td>kaum vegetarisch</td><td>veggie/vegane Gerichte aufnehmen</td></tr>
          </table>

          <h3 class="sub">Auswertung – so gehst du vor</h3>
          <ol>
            <li><b>Sammeln</b> – alle Kommentare lesen</li>
            <li><b>Kategorisieren</b> – Speise / Service / Preis / Hygiene / Wartezeit / Angebot</li>
            <li><b>Häufigkeit &amp; Schwere</b> – was kommt oft? was ist kritisch (Hygiene!)?</li>
            <li><b>Maßnahmen</b> – konkret, machbar, messbar</li>
            <li><b>Kommunizieren</b> – E-Mail an die Geschäftsleitung</li>
          </ol>

          <h3 class="sub">E-Mail an die GL (Aufbau)</h3>
          <div class="formula">Betreff → Anrede → kurzer Anlass → 5 nummerierte Vorschläge → Schluss / Gruß</div>
          <div class="note">💡 Jeder Vorschlag sollte Problem + Maßnahme verbinden (nicht nur „Service verbessern“).</div>
        `
      },
      {
        id: "ernaehrungsformen",
        icon: "🥗",
        name: "Ernährungsformen",
        desc: "LS02 · Vegetarisch, vegan, glutenfrei, halal …",
        pages: { folder: "2-Bfk1-lf6", from: 10, to: 12, prefix: "2-Bfk1-lf6" },
        content: `
          <h2>🥗 Ernährungsformen / Essgewohnheiten</h2>
          <div class="hint">Lernfeld 06 · LS02+LS13 · Vielfalt der Gästebedürfnisse</div>

          <h3 class="sub">Häufige Formen (Deutschland – Orientierung)</h3>
          <table>
            <tr><th>Form</th><th>Kurz erklärt</th><th>Küche / Service</th></tr>
            <tr><td><strong>Keine bestimmte</strong></td><td>„Allesesser“ (häufigste Gruppe)</td><td>klassisches Angebot</td></tr>
            <tr><td><strong>Vegetarisch</strong></td><td>kein Fleisch/Fisch; oft Ei, Milch, Honig ok</td><td>Gemüse, Hülsenfrüchte, Eier-, Käsegerichte</td></tr>
            <tr><td><strong>Flexitarier</strong></td><td>meist pflanzlich, selten Fleisch</td><td>attraktive veggie Optionen anbieten</td></tr>
            <tr><td><strong>Vegan</strong></td><td>keine tierischen Produkte</td><td>kein Ei, Milch, Honig, Gelatine, Fischsauce</td></tr>
            <tr><td><strong>Pescetarisch</strong></td><td>Fisch ja, Fleisch nein</td><td>Fischgerichte + pflanzliche Beilagen</td></tr>
            <tr><td><strong>Laktosefrei</strong></td><td>keine/wenig Laktose</td><td>laktosefreie / pflanzliche Alternativen</td></tr>
            <tr><td><strong>Glutenfrei</strong></td><td>kein Weizen/Roggen/Gerste (Zöliakie!)</td><td>Reis, Mais, Hirse, Buchweizen; Kreuzkontamination vermeiden</td></tr>
            <tr><td><strong>Low-Carb / Keto</strong></td><td>wenig Kohlenhydrate; Keto sehr fettbetont</td><td>weniger Nudeln/Reis/Brot, mehr Gemüse/Eiweiß</td></tr>
            <tr><td><strong>Halal</strong></td><td>islamische Speiseregeln</td><td>kein Schwein; Schlachtung nach Regeln; oft kein Alkohol</td></tr>
            <tr><td><strong>Koscher</strong></td><td>jüdische Speisegesetze</td><td>kein Schwein; Milch &amp; Fleisch trennen</td></tr>
            <tr><td><strong>Bio</strong></td><td>bevorzugt Bio-Produkte</td><td>Herkunft/Zertifizierung kommunizieren</td></tr>
          </table>

          <div class="note">⚠️ Allergene &amp; Unverträglichkeiten nie raten — bei Unsicherheit Küche fragen. Besonders kritisch: Gluten (Zöliakie), Nüsse, Laktose.</div>
        `
      },
      {
        id: "speisen-regeln",
        icon: "📋",
        name: "Regeln für die Zusammenstellung von Speisen",
        desc: "Speisenkomponenten · Kartenformulierung · Menüregeln",
        pages: { folder: "2-Bfk1-lf6", from: 13, to: 18, prefix: "2-Bfk1-lf6" },
        content: `
          <h2>📋 Regeln für die Zusammenstellung von Speisen &amp; Gerichten</h2>
          <div class="hint">Lernfeld 06 · LS02+LS13 · Speisekarte &amp; Menüs</div>

          <h3 class="sub">Gericht = Speisenkomponenten</h3>
          <div class="formula">Hauptkomponente + Soße + Gemüsebeilage + Sättigungsbeilage + ggf. kalte Beilage</div>
          <p><b>Beispiel-Schema:</b> Gebratene Hähnchenbrust · Schnittlauchsoße · Zucchini-Möhren-Gemüse · feine Butternudeln · Beilagensalat</p>

          <h3 class="sub">Kartengerechte Formulierung</h3>
          <ul>
            <li>Gast soll wissen, <b>was</b> kommt — informieren und appetitlich formulieren.</li>
            <li>Nicht nur Zutatenliste durcheinander, sondern lesbare Gerichtsbezeichnung.</li>
            <li>Ausnahmen: nicht immer alle Komponenten nötig (z. B. Wiener Schnitzel mit Pommes).</li>
          </ul>

          <h3 class="sub">Aufbau einer Speisekarte</h3>
          <ol>
            <li>Besondere Empfehlungen (saisonal / Menüs)</li>
            <li>Vorspeisen / Suppen</li>
            <li>Hauptgänge</li>
            <li>Desserts</li>
            <li>Getränke (oft separat)</li>
          </ol>
          <p>Zusätzlich: Wochen-, Tages-, Saisonkarten (Spargel, Erdbeeren, Pfifferlinge, Bärlauch …).</p>

          <h3 class="sub">Menü – Definition</h3>
          <div class="formula">Menü = 3 oder mehr Gänge, geschmacklich abgestimmt, in klassischer Reihenfolge serviert</div>

          <h3 class="sub">Zeitgemäßer Menüaufbau (Orientierung)</h3>
          <ul>
            <li>Kalter / warmer Appetithappen (kann außerhalb der Gangzählung stehen)</li>
            <li>Vorspeise</li>
            <li>Suppe / Zwischengang</li>
            <li>Hauptgang</li>
            <li>Käse (optional, je Region/Anlass)</li>
            <li>Dessert</li>
          </ul>

          <h3 class="sub">Wichtige Menüregeln</h3>
          <div class="grid2">
            <div class="mini"><h4>Keine Wiederholung</h4><p>Gleiche Hauptzutat, gleiche Soße, gleiches Garverfahren oder dasselbe Gemüse nicht mehrfach im Menü.</p></div>
            <div class="mini"><h4>Abwechslung</h4><p>Farbe, Konsistenz, Geschmack und Garmethoden wechseln.</p></div>
            <div class="mini"><h4>Leicht → kräftig → leicht</h4><p>Schwere, fette Gänge nicht hintereinander stapeln.</p></div>
            <div class="mini"><h4>Saison</h4><p>Rohstoffe zur echten Saison einplanen (Spargel, Wild, Erdbeeren …).</p></div>
          </div>
        `
      },
      {
        id: "obst",
        icon: "🍎",
        name: "Obst – Inhaltsstoffe & Zubereitung",
        desc: "Einteilung, Nährstoffe, Gararten, Obstsalat",
        pages: { folder: "2-Bfk1-lf6", from: 19, to: 27, prefix: "2-Bfk1-lf6" },
        content: `
          <h2>🍎 Obst – Inhaltsstoffe und Zubereitung</h2>
          <div class="hint">Lernfeld 06 · selbstgemachter vs. Convenience-Obstsalat argumentieren</div>

          <h3 class="sub">Was ist Obst?</h3>
          <p>Essbare, saftige Samen und Früchte meist mehrjähriger Pflanzen. Dient der Ernährung und dem Genuss.</p>

          <h3 class="sub">Inhaltsstoffe (Merke)</h3>
          <ul>
            <li><b>Wasser:</b> ca. 60–90 % (Hauptbestandteil)</li>
            <li><b>Kohlenhydrate:</b> Fructose, Glucose, Saccharose — Gehalt sortenabhängig</li>
            <li><b>Ballaststoffe:</b> u. a. <b>Pektin</b> (besonders in saurem Obst: Apfel, Hagebutte …) — Gelier-/Verdickungsmittel</li>
            <li><b>Vitamine:</b> v. a. Vitamin C; auch B1/B2</li>
            <li><b>Mineralstoffe:</b> z. B. Kalium, Calcium, Magnesium</li>
            <li><b>Fett/Eiweiß:</b> meist gering (Ausnahme: Schalenobst / Nüsse)</li>
            <li><b>Sekundäre Pflanzenstoffe (SPS):</b> z. B. Carotinoide in dunklem/orange-rötlichem Obst</li>
          </ul>
          <div class="note">💡 Kampagne <b>„5 am Tag“</b>: 5 Portionen Obst &amp; Gemüse/Tag, davon ca. 2× Obst. 1 Portion ≈ eine Handvoll.</div>

          <h3 class="sub">Vorbereitung</h3>
          <p>Waschen → ggf. schälen, entkernen, entsteinen → schneiden (Scheiben, Würfel, Spalten, mundgerecht).</p>

          <h3 class="sub">Zubereitungsarten</h3>
          <table>
            <tr><th>Art</th><th>Was passiert?</th><th>Beispiele / Nutzung</th></tr>
            <tr><td><strong>Roh</strong></td><td>frisch, max. Vitamine</td><td>Obstsalat, zu Käse, Dessert</td></tr>
            <tr><td><strong>Backen</strong></td><td>in Form / im Teig im Ofen</td><td>Bratapfel; Beilage zu Fleisch/Geflügel</td></tr>
            <tr><td><strong>Pochieren / Kompott</strong></td><td>sanft in Flüssigkeit garen</td><td>Kompott, Tortenbelag, Crêpes-Füllung</td></tr>
            <tr><td><strong>Sautieren / Karamellisieren</strong></td><td>in der Pfanne, Zucker röstet</td><td>Beilage zu Fleisch, Desserts</td></tr>
            <tr><td><strong>Frittieren</strong></td><td>im heißen Fett (oft im Teig)</td><td>Äpfel, Birnen, Banane, Ananas (festes Fruchtfleisch!)</td></tr>
            <tr><td><strong>Mazerieren</strong></td><td>in aromatischer Flüssigkeit ziehen lassen</td><td>Erdbeeren in Portwein; Obstsalat</td></tr>
            <tr><td><strong>Pürieren</strong></td><td>zerkleinern zu Mus/Sauce</td><td>Coulis, Smoothie, Kaltschale</td></tr>
          </table>

          <h3 class="sub">Selbstgemacht vs. Convenience</h3>
          <div class="grid2">
            <div class="mini"><h4>Selbstgemacht</h4><p>frisch, Sorte wählbar, weniger Zusatzstoffe, Argument Qualität/Geschmack — mehr Arbeitszeit.</p></div>
            <div class="mini"><h4>Convenience</h4><p>schnell, standardisiert, planbar — oft teurer pro kg, Qualität/Frische schwankend.</p></div>
          </div>
        `
      },
      {
        id: "huelsenfruechte",
        icon: "🫘",
        name: "Hülsenfrüchte – Inhaltsstoffe & Zubereitung",
        desc: "LS11 · Linsen, Bohnen, Erbsen · Einweichen & Kochen",
        pages: { folder: "2-Bfk1-lf6", from: 28, to: 34, prefix: "2-Bfk1-lf6" },
        content: `
          <h2>🫘 Hülsenfrüchte – Inhaltsstoffe und Zubereitung</h2>
          <div class="hint">Lernfeld 06 · LS11 · Leguminosen</div>

          <h3 class="sub">Definition</h3>
          <p>Hülsenfrüchte sind <b>getrocknete, reife Samen</b> in Fruchthülsen (Schmetterlingsblütler / Leguminosen). Sie sind <b>nur gegart</b> zum Verzehr geeignet. Roh enthalten sie Giftstoffe (z. B. Hämagglutinine), die durch Garen abgebaut werden.</p>

          <h3 class="sub">Wichtige Inhaltsstoffe</h3>
          <ul>
            <li>höchster <b>pflanzlicher Eiweißgehalt</b> (ca. 20–34 %) → Alternative zu Fleisch (Vegetarier)</li>
            <li>reich an <b>Stärke</b> und <b>Ballaststoffen</b></li>
            <li>wenig Fett (Ausnahme: Erdnüsse, Sojabohnen)</li>
            <li>Mineralstoffe: Eisen, Calcium, Phosphor, Magnesium</li>
            <li>Vitamine u. a. B-Gruppe, C, E, K</li>
          </ul>

          <h3 class="sub">Wichtige Arten</h3>
          <table>
            <tr><th>Art</th><th>Beispiele</th><th>Hinweis</th></tr>
            <tr><td><strong>Linsen</strong></td><td>Tellerlinsen, rote Linsen, Pardina</td><td>rote oft ohne Einweichen; Tellerlinsen aromatisch</td></tr>
            <tr><td><strong>Bohnen</strong></td><td>Kidney, Wachtelbohnen, Soja</td><td>immer durchgaren; Soja oft verarbeitet (Tofu, Mehl, Öl)</td></tr>
            <tr><td><strong>Erbsen</strong></td><td>gelb/grün, geschält/poliert</td><td>für Püree, Suppe, Eintopf; geschält kürzere Garzeit</td></tr>
            <tr><td><strong>Erdnüsse</strong></td><td>—</td><td>botanisch Hülsenfrucht, viel Fett</td></tr>
          </table>

          <h3 class="sub">Küchentechnik (sehr prüfungsrelevant)</h3>
          <ul>
            <li>getrocknet ca. <b>1 Jahr</b> trocken lagerfähig</li>
            <li><b>Einweichen</b> vor dem Garen (Ausnahmen beachten, z. B. rote Linsen)</li>
            <li>Salzwasser kann Einweichen beschleunigen (Pektin der Schale wird geschwächt)</li>
            <li>mit kochendem Wasser übergießen → kürzere Einweichzeit</li>
            <li>beim Garen ca. <b>4× so viel Wasser</b> wie Hülsenfrüchte</li>
            <li>kochen oft über / schäumen → Garprozess kontrollieren</li>
            <li>quellen stark → Menge planen</li>
          </ul>
          <div class="note">⚠️ Rohe Bohnen können giftig sein → immer ausreichend garen.</div>
        `
      },
      {
        id: "getreide",
        icon: "🌾",
        name: "Getreide – Inhaltsstoffe & Zubereitung",
        desc: "LS12 · Kornaufbau, Gluten, Produkte, Pseudo-Getreide",
        pages: { folder: "2-Bfk1-lf6", from: 35, to: 44, prefix: "2-Bfk1-lf6" },
        content: `
          <h2>🌾 Getreide – Inhaltsstoffe und Zubereitung</h2>
          <div class="hint">Lernfeld 06 · LS12 · inkl. glutenfrei arbeiten</div>

          <h3 class="sub">Aufbau des Getreidekorns</h3>
          <div class="grid2">
            <div class="mini"><h4>Mehlkörper</h4><p>hauptsächlich Stärke (+ etwas Eiweiß) — der größte Anteil des Korns.</p></div>
            <div class="mini"><h4>Randschichten / Aleuron</h4><p>Ballaststoffe, Mineralstoffe, Vitamine der B-Gruppe.</p></div>
            <div class="mini"><h4>Keimling</h4><p>Fett, Vitamin E — wertvoll, aber lagerempfindlich.</p></div>
          </div>

          <h3 class="sub">Durchschnittliche Inhaltsstoffe</h3>
          <table>
            <tr><th>Bestandteil</th><th>Anteil (ca.)</th></tr>
            <tr><td>Wasser</td><td>10–15 %</td></tr>
            <tr><td>Stärke</td><td>60–70 %</td></tr>
            <tr><td>Ballaststoffe</td><td>2–8 %</td></tr>
            <tr><td>Eiweiß (u. a. Gliadin + Glutenin = Kleber)</td><td>8–12 %</td></tr>
            <tr><td>Fett</td><td>2–4 %</td></tr>
          </table>
          <p>Mineralstoffe: Ca, Fe, K, Mg, Na, P · Vitamine: B-Gruppe (Aleuron), E (Keim).</p>

          <h3 class="sub">Gluten – Merksätze</h3>
          <div class="grid2">
            <div class="mini"><h4>Glutenhaltig</h4><p>Weizen, Roggen, Gerste, Grünkern, Dinkel</p></div>
            <div class="mini"><h4>Glutenfrei (üblich)</h4><p>Reis, Mais, Hirse, Buchweizen, Amaranth, Quinoa, Kartoffelstärke; Hafer nur bei sicherer Trennung</p></div>
          </div>
          <h3 class="sub">Arbeiten ohne Gluten</h3>
          <ul>
            <li>Soßen mit Mais-/Reis-/Kartoffelstärke oder Gemüsepüree binden</li>
            <li>panieren mit glutenfreien Bröseln / Maismehl</li>
            <li>Frittierfett nicht „verunreinigen“ mit glutenhaltigen Produkten</li>
            <li>eigene Bretter/Messer/Brotkorb</li>
            <li>Backen: glutenfrei oft <b>ohne Umluft</b> und nicht unter glutenhaltigem Gebäck (Krümel!)</li>
          </ul>

          <h3 class="sub">Getreideprodukte (Test-Wissen)</h3>
          <ul>
            <li><b>Vollkornmehl:</b> ganzes Korn (Keim + Rand + Mehlkörper)</li>
            <li><b>Schrot:</b> grob zerkleinerte Körner</li>
            <li><b>Flocken:</b> gedämpft, gepresst, getrocknet</li>
            <li><b>Grütze:</b> zerkleinerte Körner (oft Hafer/Gerste/Buchweizen)</li>
            <li><b>Graupen:</b> geschälte, polierte Gerste</li>
            <li><b>Gries:</b> feiner als Schrot, gröber als Mehl</li>
            <li><b>Couscous:</b> vorgekochter Hartweizen</li>
          </ul>

          <h3 class="sub">Pseudo-Getreide</h3>
          <p>Nicht botanisch Getreide, aber ähnlich verwendet: z. B. Buchweizen, Amaranth, Quinoa. Oft glutenfrei. Garen ähnlich wie Reis.</p>
        `
      },
      {
        id: "menues-erstellen",
        icon: "🍽️",
        name: "Menüs erstellen",
        desc: "Menüfolge, Menüregeln, sprachliche Gestaltung",
        pages: { folder: "2-Bfk1-lf9", from: 23, to: 24, prefix: "2-Bfk1-lf9" },
        content: `
          <h2>🍽️ Menüs erstellen</h2>
          <div class="hint">Lernfeld 06 · Regeln für Gerichte und Menüs anwenden</div>

          <h3 class="sub">Definition</h3>
          <div class="formula">Ein Menü besteht aus drei oder mehreren Gerichten, die geschmacklich aufeinander abgestimmt sind und nach der klassischen Menüreihenfolge serviert werden.</div>

          <h3 class="sub">Klassische / moderne Folge (Beispiel 4-Gang)</h3>
          <ol>
            <li>Vorspeise</li>
            <li>Suppe</li>
            <li>Hauptgericht</li>
            <li>Nachspeise / Dessert</li>
          </ol>
          <p>Varianten in der KA oft: <b>vegetarisches Menü</b>, <b>veganes Menü</b>, Menü zu Anlass/Saison.</p>

          <h3 class="sub">Menüregeln (prüfen!)</h3>
          <ul>
            <li>keine Wiederholung von Hauptzutat / Soße / gleicher Garart</li>
            <li>Farbe, Konsistenz und Geschmack abwechseln</li>
            <li>nicht zu fett/schwer — bei &gt;3 Gängen keine zwei sehr schweren hintereinander</li>
            <li>Saison der Rohstoffe beachten</li>
            <li>Ernährungsformen der Zielgruppe einplanen</li>
          </ul>

          <h3 class="sub">Sprachliche Gestaltung der Karte</h3>
          <ul>
            <li>korrektes Deutsch, einheitliche Schreibweise</li>
            <li>Gerichte appetitlich und verständlich benennen</li>
            <li>Allergene/Kennzeichnung nach Vorgabe der Schule/des Betriebs</li>
          </ul>
        `
      }
    ]
  },
  lf9: {
    id: "lf9",
    label: "Lernfeld 9",
    badge: "LF 9",
    title: "Zahlungen mit dem Gast abwickeln",
    items: [
      {
        id: "betriebsarten-zahlung",
        icon: "💳",
        name: "Betriebsarten und Zahlungsmöglichkeiten",
        desc: "LS01 · Palmero · Betriebsarten + Zahlungsarten",
        pages: { folder: "2-Bfk1-lf9", from: 3, to: 9, prefix: "2-Bfk1-lf9" },
        content: `
          <h2>💳 LS01 · Betriebsarten &amp; Zahlungsmöglichkeiten</h2>
          <div class="hint">Lernfeld 09 · Betrieb: <b>Restaurant PALMERO</b> (Tübingen) · Franchise</div>

          <h3 class="sub">Franchise (Merke)</h3>
          <p>Ein <b>Franchisegeber (FG)</b> erlaubt einem <b>Franchisenehmer (FN)</b>, Marke und Know-how gegen Gebühr zu nutzen. Beide sind selbstständige Kaufleute.</p>

          <h3 class="sub">Betriebsarten im Gastgewerbe</h3>
          <table>
            <tr><th>Gruppe</th><th>Beispiele</th><th>Kurz</th></tr>
            <tr><td><strong>Beherbergung</strong></td><td>Stadthotel, Kurhotel, Ferienhotel, Hotel garni, Pension, Motel</td><td>Übernachtung + Verpflegung je nach Typ</td></tr>
            <tr><td><strong>Gastronomie</strong></td><td>Restaurant (deutsch/international), Steakhouse, SB-Restaurant, Kneipe/Bar, Café/Bistro</td><td>Speisen und/oder Getränke</td></tr>
            <tr><td><strong>Systemgastronomie</strong></td><td>Quickservice, Verkehrsgastronomie, Handelsgastronomie, Fullservice-Ketten</td><td>standardisierte Abläufe &amp; Angebote</td></tr>
            <tr><td><strong>Catering / Event</strong></td><td>Event-, Sport-Catering</td><td>außer Haus / Veranstaltungen</td></tr>
            <tr><td><strong>Gemeinschaftsverpflegung</strong></td><td>Kantine, Schule, Krankenhaus, Seniorenheim, Mensa</td><td>regelmäßig, wirtschaftlich, viele Personen</td></tr>
          </table>

          <h3 class="sub">Systemgastronomie – Segmente</h3>
          <ul>
            <li><b>Quickservice:</b> schnell (&lt; ca. 45 Min.), straffes Sortiment, oft Counter (McDonald’s, Burger King, Nordsee)</li>
            <li><b>Verkehrs-/Messegastronomie:</b> Bahnhof, Flughafen, Autobahn, Zug/Schiff</li>
            <li><b>Handelsgastronomie:</b> in Handelsunternehmen (z. B. IKEA, Kaufhaus)</li>
            <li><b>Fullservice:</b> Bedienung wie im Restaurant, oft zentral gesteuert (z. B. Block House)</li>
          </ul>

          <h3 class="sub">Zahlungsmöglichkeiten</h3>
          <table>
            <tr><th>Art</th><th>Vorteile</th><th>Nachteile</th></tr>
            <tr><td><strong>Bar</strong></td><td>einfach, anonym, sofort verfügbar, keine Kartengebühr</td><td>Wechselgeld, Diebstahl-/Verlust-Risiko, umständlich zählen</td></tr>
            <tr><td><strong>Debitkarte</strong> (pay now)</td><td>schnell, hygienisch, PIN/kontaktlos, Übersicht</td><td>Terminal nötig, Gebühren, Technikausfall</td></tr>
            <tr><td><strong>Kreditkarte</strong> (pay later)</td><td>international, hohe Beträge</td><td>höhere Gebühren, Terminal</td></tr>
            <tr><td><strong>Prepaid</strong></td><td>begrenztes Risiko</td><td>nicht überall, Guthabenlimit</td></tr>
            <tr><td><strong>Überweisung</strong></td><td>sicher, dokumentiert, hohe Beträge</td><td>nicht sofort, Risiko Nichtzahlung</td></tr>
            <tr><td><strong>Mobile Payment</strong></td><td>sehr schnell, kontaktlos, bequem</td><td>Smartphone/Akku/Internet, nicht alle Gäste</td></tr>
          </table>

          <div class="note">💡 Klassisches Restaurant: oft Tischservice + Kassieren am Tisch. Systemgastronomie: schneller, digitaler, standardisierter (App/Counter/Kasse).</div>
        `
      },
      {
        id: "rechtliche-zahlungsabwicklung",
        icon: "⚖️",
        name: "Rechtliche Grundlagen zur Zahlungsabwicklung",
        desc: "LS03 · Bewirtungsvertrag, USt, Trinkgeld, Beleg · Fälle!",
        pages: { folder: "2-Bfk1-lf9", from: 10, to: 22, prefix: "2-Bfk1-lf9" },
        content: `
          <h2>⚖️ LS03 · Rechtliche Grundlagen zur Zahlungsabwicklung</h2>
          <div class="hint">Lernfeld 09 · <b>Fälle lösen können</b> — zentral für die KA</div>

          <h3 class="sub">1. Bewirtungsvertrag</h3>
          <ul>
            <li>im BGB nicht eigens geregelt → <b>gemischter Vertrag</b> (Anteile aus Kauf-, Werk-, Dienst-, Mietvertrag)</li>
            <li>größte Nähe zum <b>Kaufvertrag</b> (Ware/Leistung gegen Geld)</li>
            <li>kommt zustande durch <b>Bestellung + Annahme</b></li>
            <li>Speisekarte / Außenverzeichnis = noch <b>kein</b> verbindliches Angebot</li>
            <li>Wirt darf ablehnen (z. B. Speise aus) → Gast hat dann keinen Anspruch auf genau dieses Gericht</li>
          </ul>
          <div class="grid2">
            <div class="mini"><h4>Pflichten des Wirts</h4><p>bestellte Speisen/Getränke in einwandfreier Qualität in angemessener Zeit liefern.</p></div>
            <div class="mini"><h4>Pflichten des Gastes</h4><p>annehmen und bezahlen. Bei Rücklassen wird der Wirt Eigentümer (nicht das Personal).</p></div>
          </div>
          <p><b>Reservierung:</b> oft vorvertraglich. Nichterscheinen kann Schadensersatz auslösen. Bei fest vereinbarter Speisenanzahl/Preis/Zeit kann der Wirt den Preis abzüglich ersparter Aufwendungen fordern.</p>

          <h3 class="sub">2. Störungen des Vertrags</h3>
          <h3 class="sub">Durch den Gast</h3>
          <ul>
            <li><b>Zechprellerei / Zahlungsverweigerung</b></li>
            <li><b>Annahmeverzug</b></li>
            <li>„Zechprellerei“ ist kein eigener Straftatbestand — <b>Betrug</b> nur bei Vorsatz schon beim Betreten/Bestellen, nicht bei bloßem Vergessen</li>
          </ul>
          <p><b>Rechte des Gastronomen bei Zahlungsverzug:</b> Gast bis Polizei festhalten dürfen (im Rahmen des Zulässigen), auf Zahlung klagen, Schadensersatz (z. B. Anwalt) fordern.</p>

          <h3 class="sub">Durch den Gastronomen</h3>
          <ul>
            <li><b>Nichtlieferung</b> → Schadensersatz möglich</li>
            <li><b>lange Wartezeit</b> (ca. 1½ Std. unangemessen) → Ablehnung oder Preisminderung</li>
            <li><b>Schlechtleistung</b> (falsch/mangelhaft): Nacherfüllung (neu/nachbessern), Rücktritt, Preisminderung, Schadensersatz (z. B. Getränk auf Kosten des Hauses)</li>
          </ul>
          <div class="note">Beispiel: Steak medium bestellt, durch serviert → Schlechtleistung → Nachbesserung/Neulieferung, sonst Minderung.</div>

          <h3 class="sub">3. Umsatzsteuer (USt / MwSt)</h3>
          <div class="formula">Brutto = inkl. USt · Netto = ohne USt<br>Netto = Brutto ÷ (1 + Steuersatz)<br>USt-Betrag = Brutto − Netto<br>Brutto = Netto × (1 + Steuersatz)</div>
          <table>
            <tr><th>Leistung</th><th>Regel (laut Unterrichtsmaterial Stand 2026)</th></tr>
            <tr><td>Speisen vor Ort</td><td><b>7 %</b> (Senkung ab 01.01.2026 laut Material)</td></tr>
            <tr><td>Speisen außer Haus (Imbiss/Lieferung/Abholung)</td><td><b>7 %</b></td></tr>
            <tr><td>Getränke (Regelfall)</td><td><b>19 %</b></td></tr>
            <tr><td>Milch / bestimmte Milchmischgetränke / Leitungswasser außer Haus</td><td>oft <b>7 %</b></td></tr>
            <tr><td>Übernachtung</td><td><b>7 %</b></td></tr>
          </table>
          <div class="mini" style="margin-top:10px">
            <h4>Rechenbeispiel</h4>
            <p>Brutto 119 € bei 19 % → Netto = 119 ÷ 1,19 = <b>100 €</b> · USt = <b>19 €</b></p>
          </div>

          <h3 class="sub">4. Trinkgeld</h3>
          <ul>
            <li>üblich 5–10 %, aber <b>nicht verpflichtend</b></li>
            <li>Lohn darf nicht durch Trinkgeld ersetzt werden</li>
            <li><b>steuerfrei</b>, wenn Servicekräfte es direkt erhalten</li>
            <li><b>steuerpflichtig</b>, wenn AG es sammelt und verteilt</li>
            <li>≠ Bedienungsgeld (berechnete Umsatzbeteiligung)</li>
          </ul>

          <h3 class="sub">5. Belegausgabepflicht</h3>
          <ul>
            <li>seit 01.01.2020 bei elektronischen Aufzeichnungssystemen</li>
            <li>Beleg dem Gast zur Verfügung stellen (Papier/elektronisch); Mitnahme nicht Pflicht</li>
            <li>Pflichtangaben u. a.: Name/Anschrift Unternehmer, Datum, Beginn/Ende, Menge/Art, Transaktionsnr., Entgelt, Steuerbetrag, Steuersatz</li>
            <li>Verstoß oft nicht direkt bußgeldbewehrt, aber Indiz für Kassenprobleme → Risiko Betriebsprüfung</li>
          </ul>

          <h3 class="sub">🧩 Fälle zum Üben (KA-Stil)</h3>
          <div class="mini" style="margin-bottom:10px"><h4>Fall A – Speise aus</h4><p>Gast bestellt Enchiladas, Küche meldet „aus“. Ist das Vertragsbruch? <b>Nein</b>, wenn noch nicht angenommen bzw. Leistung unmöglich — alternatives Angebot + Entschuldigung.</p></div>
          <div class="mini" style="margin-bottom:10px"><h4>Fall B – Schlechtleistung</h4><p>Glasscherben im Salat / falsche Garstufe → Mangel → Nacherfüllung, ggf. Rücktritt/Schadensersatz.</p></div>
          <div class="mini" style="margin-bottom:10px"><h4>Fall C – Rechnung &amp; Trinkgeld</h4><p>Rechnung mit Karte, Trinkgeld bar → Trinkgeld ist nicht automatisch Teil der USt-Rechnung; steuerliche Behandlung je nach Empfangsweg.</p></div>
          <div class="mini"><h4>Fall D – USt rechnen</h4><p>Bruttobetrag und Satz gegeben → Netto und Steuer ausrechnen (Formeln oben).</p></div>
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
