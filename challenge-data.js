/* Challenge question pools – shared by challenge.html */
(function(global){
  // BfK-2 pool (from index.html QUIZ)
  const BFK2 = [
  {cat:"Rind", q:"Welches ist das zarteste, bindegewebsärmste Stück des Rindes?", opts:["Filet","Hesse","Brust","Hals"], a:0, ex:"Das Filet ist am zartesten – ideal zum Kurzbraten (Filetsteak, Medaillons)."},
  {cat:"Rind", q:"Wofür verwendet man die Hesse (Beinscheibe) vom Rind?", opts:["Steak zum Kurzbraten","Kraftbrühe & Schmoren","Rohschinken","Carpaccio"], a:1, ex:"Die Hesse ist sehr bindegewebsreich (Kollagen) → Kraftbrühe, Schmoren, Ossobuco-Art."},
  {cat:"Rind", q:"Aus welchem Teil schneidet man Rostbraten/Steaks?", opts:["Bauch","Roastbeef (Rücken)","Hals","Querrippe"], a:1, ex:"Roastbeef ist ein zartes Edelstück am Rücken → Steaks, Rostbraten."},
  {cat:"Gewebe", q:"Was passiert mit Kollagen (Bindegewebe) bei langem, feuchtem Garen?", opts:["Es bleibt zäh","Es wird zu Gelatine","Es schmilzt zu Fett","Es gerinnt sofort"], a:1, ex:"Kollagen wird bei langem Garen zu Gelatine → Fleisch wird zart. Elastin bleibt aber zäh."},
  {cat:"Gewebe", q:"Fleisch mit VIEL Bindegewebe gart man am besten wie?", opts:["Kurzbraten / Grillen","Schmoren / Kochen (langsam & feucht)","Frittieren","Roh servieren"], a:1, ex:"Viel Bindegewebe → langsam & feucht garen (schmoren/kochen). Wenig → kurzbraten."},
  {cat:"Gewebe", q:"Welche Aufgabe hat das Fettgewebe beim Erhitzen?", opts:["Es wird zäh","Es gerinnt","Es schmilzt und macht saftig & aromatisch","Es wird zu Gelatine"], a:2, ex:"Fett schmilzt beim Garen und macht das Fleisch saftig und aromatisch."},
  {cat:"Zusammensetzung", q:"Wie viel Prozent Wasser enthält Schlachtfleisch ungefähr?", opts:["ca. 20 %","ca. 50 %","ca. 70 %","ca. 90 %"], a:2, ex:"Fleisch besteht zu ca. 70 % aus Wasser, ca. 20 % Eiweiß, 3–8 % Fett."},
  {cat:"Zusammensetzung", q:"Wie hoch ist der Eiweißanteil (Protein) im Fleisch ungefähr?", opts:["ca. 5 %","ca. 20 %","ca. 40 %","ca. 70 %"], a:1, ex:"Eiweiß ca. 20 %."},
  {cat:"Kalb", q:"Was ist typisch für ein 'Wiener Schnitzel'?", opts:["In Thunfischsoße kalt serviert","Paniert mit Mehl, Ei und Semmelbröseln","Mit Käse gefüllt","In Pilzrahmsoße"], a:1, ex:"Wiener Schnitzel = dünnes Kalbsschnitzel, paniert mit Mehl, Ei und Semmelbröseln."},
  {cat:"Kalb", q:"Cordon bleu ist ein Kalbsschnitzel, gefüllt mit …", opts:["Thunfisch","gekochtem Schinken und Käse","Salbei und Rohschinken","Pilzen"], a:1, ex:"Cordon bleu: mit gekochtem Schinken und Käse gefüllt, dann paniert."},
  {cat:"Kalb", q:"Saltimbocca alla romana wird umhüllt mit …", opts:["rohem Schinken (Parma) + Salbeiblatt","Käse + Ei","Speck + Zwiebeln","Semmelbröseln"], a:0, ex:"Saltimbocca: Kalbsschnitzel mit rohem Parmaschinken und einem Salbeiblatt."},
  {cat:"Kalb", q:"Was ist Osso Buco?", opts:["Kalbsfilet roh","Geschmorte Kalbshaxenscheiben (alla milanese)","Kalbszunge gekocht","Panierte Leber"], a:1, ex:"Osso Buco = geschmorte Kalbshaxenscheiben mit Tomaten & Gemüse, milanesische Art."},
  {cat:"Kalb", q:"Vitello tonnato wird serviert …", opts:["heiß mit Soße","kalt in Thunfischsoße","frittiert","gegrillt"], a:1, ex:"Vitello tonnato = Kalbfleisch in Thunfischsoße, KALT serviert."},
  {cat:"Schwein", q:"Welches Schweineteil ist gut durchwachsen (marmoriert) und eignet sich für Nackensteaks?", opts:["Filet","Nacken / Kamm","Eisbein","Schinken"], a:1, ex:"Der Nacken/Kamm ist saftig & marmoriert → Nackensteak, Kammkotelett, Grillen."},
  {cat:"Schwein", q:"Was ist Szegediner Gulasch?", opts:["Gulasch mit Sauerkraut & saurer Sahne","Lammtopf","Fischeintopf","Gulasch mit Äpfeln"], a:0, ex:"Szegediner Gulasch: Fleischwürfel mit Knoblauch, Kümmel, Sauerkraut und saurer Sahne."},
  {cat:"Schwein", q:"Ein Spanferkel ist …", opts:["ein altes Mutterschwein","ein junges, noch säugendes Ferkel","gepökelte Schulter","geräucherter Bauch"], a:1, ex:"Spanferkel = junges, noch säugendes Ferkel (6–8 Wochen, bis ~20 kg)."},
  {cat:"Schaf", q:"Ein 'Hammel' ist ein Schaf, das …", opts:["unter 1 Jahr alt ist","weiblich und über 1 Jahr ist","kastriert (verschnitten) ist","männlich und über 1 Jahr ist"], a:2, ex:"Hammel = kastriertes (verschnittenes) Schaf. Lamm = bis 1 Jahr, Bock = männlich, Schaf = weiblich."},
  {cat:"Schaf", q:"Was ist Irish Stew?", opts:["Lammtopf mit Zwiebeln & Kartoffelwürfeln","Hammelragout mit Auberginen","Lammcurry mit Mango","gegrillte Koteletts"], a:0, ex:"Irish Stew = Lammtopf auf irische Art mit Zwiebeln und Kartoffelwürfeln."},
  {cat:"Schaf", q:"Moussaka wird zubereitet mit …", opts:["Lammhackfleisch, gebackenen Auberginen & Tomatensauce","Kalbsfilet & Pilzen","Schweinebauch & Sauerkraut","Rindfleisch & Rösti"], a:0, ex:"Moussaka: Hammelhackfleisch mit gebackenen Auberginen und Tomatensauce."},
  {cat:"Grundlagen", q:"Welche 4 Tiere sind die wichtigsten Schlacht-Säugetiere in Deutschland?", opts:["Rind, Schwein, Schaf, Ziege","Rind, Pferd, Huhn, Ente","Schwein, Kaninchen, Reh, Gans","Rind, Schwein, Wildschwein, Hirsch"], a:0, ex:"Rind, Schwein, Schaf und Ziege sind die 4 wichtigsten Schlacht-Säugetiere."},
  {cat:"Küche", q:"Wie viel kJ liefert 1g Fett?", opts:["17 kJ","4 kJ","37 kJ","9 kJ"], a:2, ex:"1g Fett = 37 kJ (= 9 kcal). Eiweiß & KH je 17 kJ (4 kcal)."},
  {cat:"Küche", q:"Was bedeutet die erste Ziffer '0' im Eiercode?", opts:["Bodenhaltung","Freilandhaltung","Bio / Ökologisch","Kleingruppenhaltung"], a:2, ex:"0 = Bio/Öko, 1 = Freiland, 2 = Boden, 3 = Kleingruppe."},
  {cat:"Küche", q:"Welches Lebensmittel hat die biologische Wertigkeit 100 (Referenz)?", opts:["Rindfleisch","Hühnerei","Soja","Kartoffeln"], a:1, ex:"Das Hühnerei ist die Referenz mit BW 100."},
];

  // Deutsch Visualisierung pool (from deutsch.html QUIZ)
  const DEUTSCH = [
  {cat:'Definition', q:'Was bedeutet Visualisierung von Texten?',
   opts:['Text auswendig lernen','Text als Grafik/Schaubild darstellen','Nur die Überschrift abschreiben','Text übersetzen'],
   a:1, ex:'Visualisierung = Text als Grafik darstellen, Wesentliches sichtbar machen.'},
  {cat:'Ziel', q:'Was ist KEIN Ziel der Visualisierung?',
   opts:['Wesentliches reduzieren','Roten Faden sichtbar machen','Möglichst viele ganze Sätze schreiben','Verständlichkeit erhöhen'],
   a:2, ex:'Keine ganzen Sätze – nur Stichworte!'},
  {cat:'Merkhilfe', q:'Welche Merkhilfe gilt?',
   opts:['Zeit ist Geld','Bilder sagen mehr als tausend Worte','Übung macht den Meister','Aller Anfang ist schwer'],
   a:1, ex:'Bilder sagen mehr als tausend Worte.'},
  {cat:'Schritte', q:'Was ist der 1. Arbeitsschritt?',
   opts:['Grafik entwerfen','Fragestellung analysieren','Farbe wählen','Wörter zählen'],
   a:1, ex:'Zuerst die Fragestellung analysieren.'},
  {cat:'Schritte', q:'Richtige Reihenfolge?',
   opts:['Zeichnen → Lesen','Lesen → Markieren → Form wählen → Zeichnen','Form wählen → Lesen','Nur zeichnen'],
   a:1, ex:'Lesen → Markieren → Form wählen → Zeichnen.'},
  {cat:'Formen', q:'Kurvendiagramm eignet sich für …',
   opts:['Anteile in %','Entwicklung über Zeit','Hierarchie','Ideensammlung'],
   a:1, ex:'Kurve = Entwicklung (Zeitachse).'},
  {cat:'Formen', q:'Kreisdiagramm eignet sich für …',
   opts:['Anteile (%)','Nur Hierarchie','Nur Zeitreihen','Nur Teufelskreise'],
   a:0, ex:'Kreis = Anteile in Prozent.'},
  {cat:'Formen', q:'Säulendiagramm eignet sich für …',
   opts:['Vergleich','Nur Ursache–Wirkung','Nur Personen','Gedichte'],
   a:0, ex:'Säule/Balken = Vergleich.'},
  {cat:'Formen', q:'Mindmap eignet sich für …',
   opts:['Ideensammlung und -ordnung','Exakte Kreisanteile','Börsenkurse','Nur Organigramme'],
   a:0, ex:'Mindmap = Ideensammlung/-ordnung.'},
  {cat:'Formen', q:'Strukturbild eignet sich für …',
   opts:['Abläufe, Ursache–Wirkung','Nur Prozent','Nur Jahreskurven','Wortlisten'],
   a:0, ex:'Strukturbild = Abläufe / Ursache–Wirkung.'},
  {cat:'Formen', q:'Organigramm zeigt vor allem …',
   opts:['Hierarchie von Personen','Wetter','Rezepte','Kreisanteile'],
   a:0, ex:'Organigramm = Hierarchie / Personen.'},
  {cat:'Tipps', q:'Warum keine ganzen Sätze?',
   opts:['Weil Lesen verboten ist','Weil Stichworte übersichtlicher sind','Weil Sätze immer falsch sind','Weil es zu bunt wird'],
   a:1, ex:'Stichworte sind klarer und prüfungsgerecht.'},
  {cat:'Tipps', q:'Großschreibung in Schaubildern?',
   opts:['Alles groß','Nur Substantive und Satzanfänge','Nur Verben','Keine Regel'],
   a:1, ex:'Nur Substantive + Satzanfang groß.'},
  {cat:'Tipps', q:'Was braucht jede Grafik?',
   opts:['Nur Farben','Überschrift (und Einheiten/Achsen)','20 ganze Sätze','Kein Titel'],
   a:1, ex:'Überschrift und Größenbezeichnung nicht vergessen.'},
  {cat:'Hirn', q:'Die rechte Hirnhälfte arbeitet vor allem …',
   opts:['digital wie ein Computer','analog und ganzheitlich','nur mit Tabellen','nur mit Grammatik'],
   a:1, ex:'Rechts: analog, ganzheitlich, Bilder, kreativ.'},
  {cat:'Hirn', q:'Die linke Hirnhälfte ist zuständig für …',
   opts:['nur Musik','Sprache, Logik, Mathe, Texte/Tabellen','nur Gefühle','nur Malen'],
   a:1, ex:'Links: analytisch, Sprache, Logik, Struktur.'},
  {cat:'KA', q:'Drei zentrale Aspekte beim Fleischkonsum heute?',
   opts:['Preis, Werbung, Transport','Gesundheit, Umweltschutz, Tierwohl','Salz, Zucker, Fett','Import, Export, Zoll'],
   a:1, ex:'Gesundheit · Umwelt · Tierwohl.'},
  {cat:'KA', q:'Welche Form verlangt die Muster-KA?',
   opts:['Kurvendiagramm','Mindmap','Kreisdiagramm','Organigramm'],
   a:1, ex:'Aufgabe: in Form einer Mindmap.'},
  {cat:'Praxis', q:'Exportzahlen 1992–2000 → beste Form?',
   opts:['Kurvendiagramm','Organigramm','Kreisdiagramm','Mindmap'],
   a:0, ex:'Zeitreihe → Kurve.'},
  {cat:'Praxis', q:'Teufelskreis negatives Denken → Form?',
   opts:['Strukturbild','Kreisdiagramm','Tabelle','Kurvendiagramm'],
   a:0, ex:'Ursache–Wirkung → Strukturbild.'},

  /* ===== more questions ===== */
  {cat:'Formen', q:'Tabelle eignet sich besonders für …',
   opts:['exakte Zahlen mit mehreren Spalten','nur Bilder malen','nur Hierarchie','nur Teufelskreise'],
   a:0, ex:'Tabelle = genauer Zahlenvergleich.'},
  {cat:'Formen', q:'Wann nimmst du KEIN Kreisdiagramm?',
   opts:['Anteile ergeben 100%','Werte steigen über 10 Jahre','Teile eines Ganzen','Prozentverteilung'],
   a:1, ex:'Zeitreihe → Kurve, nicht Kreis.'},
  {cat:'Formen', q:'Balkendiagramm und Säulendiagramm dienen vor allem dem …',
   opts:['Vergleich','Sprachlernen','Organigramm','Gedichtschreiben'],
   a:0, ex:'Balken/Säule = Vergleich mehrerer Größen.'},
  {cat:'Schritte', q:'Was machst du NACH dem Lesen?',
   opts:['Sofort bunt malen','Wichtige Aussagen / Schlüsselwörter markieren','Nur die letzte Zeile abschreiben','Form vergessen'],
   a:1, ex:'Nach dem Lesen: markieren und ordnen.'},
  {cat:'Schritte', q:'Wann wählst du die Darstellungsform?',
   opts:['Bevor du die Aufgabe liest','Nach dem Markieren der wichtigen Infos','Erst nach der Abgabe','Nie'],
   a:1, ex:'Erst Inhalt klären, dann Form wählen.'},
  {cat:'Tipps', q:'Was bedeutet „schlagwortartig"?',
   opts:['Mit ganzen Sätzen','Nur mit Stichworten / Schlüsselwörtern','Nur mit Zahlen','Ohne Überschrift'],
   a:1, ex:'schlagwortartig = stichwortartig, keine ganzen Sätze.'},
  {cat:'Tipps', q:'Warum mit Lineal zeichnen?',
   opts:['Weil es verboten ist ohne','Für ein sauberes, übersichtliches Schaubild','Nur für Mathe','Nur für Farbe'],
   a:1, ex:'Sauberkeit zählt in der Bewertung.'},
  {cat:'Tipps', q:'Gleichwertige Aussagen sollen …',
   opts:['unterschiedlich groß und bunt chaotisch sein','gleiche Farbe, Schriftgröße, Bildanteile haben','immer in ganzen Sätzen stehen','ohne Verbindung bleiben'],
   a:1, ex:'Gleiche Wichtigkeit → gleiche Darstellung.'},
  {cat:'Vokabel', q:'Was sind „Schlüsselwörter"?',
   opts:['Wichtige Stichworte im Text','Ganze Sätze','Nur die Fußnote','Nur Farben'],
   a:0, ex:'Schlüsselwörter = wichtige Stichworte im Text.'},
  {cat:'Vokabel', q:'Was ist die „Überschrift" einer Grafik?',
   opts:['Die Achsenbeschriftung','Der Titel der Grafik','Nur die Y-Achse','Nur die Pfeile'],
   a:1, ex:'Überschrift = Titel der Grafik.'},
  {cat:'Vokabel', q:'Was ist ein „Teufelskreis"?',
   opts:['Eine sich verstärkende Ursache–Wirkung-Schleife','Ein Kreisdiagramm','Ein Organigramm','Eine Tabelle'],
   a:0, ex:'Teufelskreis = sich verstärkende Ursache–Wirkung (Schleife).'},
  {cat:'Vokabel', q:'Was bedeutet „Hierarchie"?',
   opts:['Rangordnung / Über- und Unterordnung','Anteile in %','Zeitliche Entwicklung','Nur Stichworte'],
   a:0, ex:'Hierarchie = Rangordnung (z. B. Organigramm).'},
  {cat:'Vokabel', q:'Wofür stehen „Anteile" typischerweise?',
   opts:['Teile eines Ganzen (oft in %)','Nur die Überschrift','Nur Pfeile','Nur die Farbe Rot'],
   a:0, ex:'Anteile = Teile eines Ganzen, oft in Prozent.'},
  {cat:'Vokabel', q:'Was zeigt eine „Entwicklung" meist?',
   opts:['Veränderung über die Zeit','Nur die Hierarchie','Nur eine Tabelle ohne Zeit','Nur einen festen Einzelwert'],
   a:0, ex:'Entwicklung → oft Kurvendiagramm.'},
  {cat:'Praxis', q:'Getränke: Wasser 42, Softdrinks 28, Kaffee 18 … → Form?',
   opts:['Säulen-/Balkendiagramm','Organigramm','Mindmap','Strukturbild'],
   a:0, ex:'Vergleich mehrerer Kategorien → Säule/Balken.'},
  {cat:'Praxis', q:'Strommix 52% · 26% · 15% · 1% · 6% → Form?',
   opts:['Kreisdiagramm','Kurvendiagramm','Organigramm','Mindmap'],
   a:0, ex:'Anteile = 100% → Kreis.'},
  {cat:'Praxis', q:'Temperaturen mehrerer Städte in Juli und Juni → Form?',
   opts:['Tabelle','Kreisdiagramm','Organigramm','Strukturbild'],
   a:0, ex:'Exakte Zahlen + 2 Spalten → Tabelle.'},
  {cat:'Praxis', q:'Wartezeit → Unzufriedenheit → Beschwerde → Stress → … → Form?',
   opts:['Strukturbild','Tabelle','Kurvendiagramm','Kreisdiagramm'],
   a:0, ex:'Teufelskreis → Strukturbild.'},
  {cat:'Praxis', q:'Nachhaltigkeit: Einkauf, Energie, Mehrweg, Verschwendung → Form?',
   opts:['Mindmap','Kreisdiagramm','Organigramm','Tabelle'],
   a:0, ex:'Viele Aspekte → Mindmap.'},
  {cat:'Praxis', q:'Gästezahlen Mo–Fr (45, 52, 48, 61, 78) → beste Form?',
   opts:['Kurvendiagramm','Organigramm','Mindmap','Strukturbild'],
   a:0, ex:'Entwicklung über Tage → Kurve.'},
  {cat:'KA', q:'Was sollst du am Ende der Mindmap-KA tun?',
   opts:['Wörter zählen','Nur schlafen','Nur Farbe mischen','Text abschreiben 1:1'],
   a:0, ex:'Hinweis: Anzahl der Wörter zählen.'},
  {cat:'KA', q:'Welche 3 Aspekte sind im Fleischkonsum-Text zentral?',
   opts:['Gesundheit, Umweltschutz, Tierwohl','Preis, Werbung, Parkplatz','Salz, Zucker, Fett','Import, Zoll, Euro'],
   a:0, ex:'Gesundheit · Umwelt · Tierwohl.'},
  {cat:'Hirn', q:'Körpersprache (Gestik + Mimik) steuert vor allem die …',
   opts:['rechte Hirnhälfte','linke Hirnhälfte','Leber','Tabelle'],
   a:0, ex:'Rechts: kreativ, Bilder, Körpersprache.'},
  {cat:'Hirn', q:'Mathematik und logisches Denken gehören eher zur …',
   opts:['linken Hirnhälfte','rechten Hirnhälfte','nur rechten Hand','Mindmap-Mitte'],
   a:0, ex:'Links: analytisch, Logik, Sprache, Mathe.'},
  {cat:'Tipps', q:'Welche Achse trägt beim Kurvendiagramm meist die Zeit?',
   opts:['X-Achse (waagerecht)','nur die Legende','gar keine','nur der Titel'],
   a:0, ex:'Zeit auf der X-Achse, Menge auf der Y-Achse.'},
  {cat:'Tipps', q:'Was gehört in die Mitte einer Mindmap?',
   opts:['Das Thema','Ein zufälliges Verb','Nur die Quelle','20 ganze Sätze'],
   a:0, ex:'Thema in die Mitte, Äste = Aspekte.'},
  {cat:'Formen', q:'Geschäftsführer → Küchenchef / Restaurantleiter → Mitarbeiter: Form?',
   opts:['Organigramm','Kreisdiagramm','Kurvendiagramm','Tabelle'],
   a:0, ex:'Hierarchie von Personen → Organigramm.'},
  {cat:'Vokabel', q:'Was bedeutet „Massentierhaltung"?',
   opts:['Tierhaltung in sehr großer Zahl / engem Raum','Vegetarische Ernährung','Eine Unterüberschrift','Ein Kurvendiagramm'],
   a:0, ex:'Massentierhaltung = Haltung vieler Tiere auf engem Raum.'},
  {cat:'Vokabel', q:'Was bedeutet „artgerechte Haltung"?',
   opts:['Haltung, die den Bedürfnissen der Tierart entspricht','Nur Tiefkühlware','Nur Export','Nur Werbung'],
   a:0, ex:'artgerecht = den Bedürfnissen der Tierart entsprechend.'},
  {cat:'Vokabel', q:'Was ist „Lebensmittelverschwendung"?',
   opts:['Wegwerfen / Verschwenden von Lebensmitteln','Strom sparen','Eine Mindmap zeichnen','Wörter zählen'],
   a:0, ex:'Lebensmittelverschwendung = Wegwerfen von Lebensmitteln.'},
  {cat:'Definition', q:'Visualisierung bedeutet vor allem …',
   opts:['Text als Grafik/Schaubild darstellen','Text lauter vorlesen','Text ins Englische übersetzen','Text löschen'],
   a:0, ex:'Von Text → Darstellung/Grafik.'},
  {cat:'Tipps', q:'Welche Aussage ist FALSCH?',
   opts:['Immer Überschrift schreiben','Nur Stichworte verwenden','Möglichst viele ganze Sätze in die Grafik','Mit Lineal sauber zeichnen'],
   a:2, ex:'Keine ganzen Sätze in der Grafik.'},
];

  /** Challenge unterstützt nur Multiple-Choice. Fill-Fragen bleiben im normalen Fach-Quiz. */
  function normalize(list, prefix){
    return (list||[]).map((q,i)=>({
      id: prefix + ':' + i,
      subject: prefix,
      cat: q.cat || '',
      q: q.q || '',
      opts: Array.isArray(q.opts) ? q.opts.slice() : [],
      a: typeof q.a === 'number' ? q.a : -1,
      ex: q.ex || ''
    })).filter(q => q.q && q.opts.length >= 2 && q.a >= 0 && q.a < q.opts.length);
  }

  // Challenge-Pools direkt aus den Fach-Daten bauen, damit neue Quizfragen
  // automatisch auch im Challenge verfügbar sind.
  let registry = [];
  try{
    if(global.FachForm && typeof global.FachForm.buildRegistry === 'function'){
      registry = global.FachForm.buildRegistry() || [];
    }
  }catch(_){ registry = []; }

  function fachQuiz(id, fallback){
    if(id === 'bfk1' && Array.isArray(global.BFK1_QUIZ) && global.BFK1_QUIZ.length) return global.BFK1_QUIZ;
    if(id === 'bfk2' && Array.isArray(global.BFK2_QUIZ) && global.BFK2_QUIZ.length) return global.BFK2_QUIZ;
    if(id === 'deutsch' && Array.isArray(global.DEUTSCH_QUIZ) && global.DEUTSCH_QUIZ.length) return global.DEUTSCH_QUIZ;
    const fach = registry.find(f => f && f.id === id);
    return fach && Array.isArray(fach.quiz) && fach.quiz.length ? fach.quiz : (fallback || []);
  }

  const POOLS = {
    bfk1: normalize(fachQuiz('bfk1'), 'bfk1'),
    bfk2: normalize(fachQuiz('bfk2', BFK2), 'bfk2'),
    deutsch: normalize(fachQuiz('deutsch', DEUTSCH), 'deutsch'),
    englisch: normalize(fachQuiz('englisch'), 'englisch'),
    gk: normalize(fachQuiz('gk'), 'gk'),
    wiko: normalize(fachQuiz('wiko'), 'wiko')
  };

  const SUBJECT_META = [
    { id:'bfk1', label:'BfK-1 · Gastronomie', icon:'🍳', count: POOLS.bfk1.length },
    { id:'bfk2', label:'BfK-2 · Fleisch', icon:'🥩', count: POOLS.bfk2.length },
    { id:'deutsch', label:'Deutsch · Visualisierung', icon:'🇩🇪', count: POOLS.deutsch.length },
    { id:'englisch', label:'Englisch', icon:'🇬🇧', count: POOLS.englisch.length },
    { id:'gk', label:'Gemeinschaftskunde', icon:'🏛️', count: POOLS.gk.length },
    { id:'wiko', label:'WiKO', icon:'📊', count: POOLS.wiko.length }
  ].filter(s => s.count > 0);

  function mulberry32(a){
    return function(){
      let t = a += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  function pickQuestions(subjectIds, count, seed){
    const ids = (subjectIds && subjectIds.length) ? subjectIds : ['bfk2'];
    let pool = [];
    ids.forEach(id => { pool = pool.concat(POOLS[id] || []); });
    if(!pool.length) return [];
    const rnd = mulberry32(Number(seed) || 1);
    const arr = pool.slice();
    for(let i=arr.length-1;i>0;i--){
      const j = Math.floor(rnd()*(i+1));
      const tmp=arr[i]; arr[i]=arr[j]; arr[j]=tmp;
    }
    const n = Math.max(1, Math.min(Number(count)||10, arr.length));
    return arr.slice(0,n);
  }

  function getByIds(ids){
    const map = {};
    Object.keys(POOLS).forEach(k => POOLS[k].forEach(q => { map[q.id]=q; }));
    return (ids||[]).map(id => map[id]).filter(Boolean);
  }

  global.ChallengeData = {
    POOLS,
    SUBJECT_META,
    pickQuestions,
    getByIds
  };
})(typeof window !== 'undefined' ? window : globalThis);
