/* ============================================================
   exam-sim.js  —  Prüfungssimulation Engine für AzubiHub
   Chế độ thi thử bấm giờ tương tác chuẩn IHK (Herbst 2023, A, B, C)
   ============================================================ */
(function(){
"use strict";

/* ---------- EXAM DATA ---------- */
const EXAMS = {
  "herbst2023": {
    title: "Zwischenprüfung Herbst 2023",
    subtitle: "Fachkraft für Gastronomie 6131 · Wirtschaftsdienst",
    time: 3600,
    situations: [
      {range:"1–12", text:"Sie sind Mitarbeiter im Restaurant Zum Schloss. Herr Josef Baum feiert am 26. August 2023 mit 40 Personen seinen 50. Geburtstag."},
      {range:"13–18", text:"Sie helfen dem Sicherheitsbeauftragten und dem Umweltschutzbeauftragten bei der Erfüllung ihrer Aufgaben."},
      {range:"19–20", text:"Sie sind am Getränkebüfett eingesetzt."}
    ],
    questions: [
      {id:1,sit:0,q:"Sie sollen den Raum laut den Regeln des Brandschutzes kontrollieren. Welchen Mangel müssen Sie beanstanden?",
       opts:["Die Rettungswege sind ausgeschildert.","Die Feuerlöscher sind gut sichtbar angebracht.","Die Notausgänge sind nicht frei zugänglich.","Die Feuerlöscher sind alle 2 Jahre überprüft worden.","Die Notausgänge sind mit dem grünen Schild gekennzeichnet."],
       ans:[2],type:"single",topic:"Brandschutz"},
      {id:2,sit:0,q:"Sie sollen den Gastraum reinigen. Welche Reinigungsarbeit müssen Sie nicht zwingend vor jeder Veranstaltung durchführen?",
       opts:["Staub wischen","Teppichboden shampoonieren","Fensterbänke auswischen","Staubsaugen","Tische abwischen"],
       ans:[1],type:"single",topic:"Reinigung"},
      {id:3,sit:0,q:"Wie müssen Sie die Verschmutzung des Teppichbodens fachgerecht behandeln?",
       opts:["Ein Wachsfleck soll durch Bügeln mit Löschpapier entfernt werden.","Ein alter Rotweinfleck soll durch Bestreuen mit Salz vorbehandelt werden.","Ein Farbfleck soll mit einem Mikrofasertuch entfernt werden.","Ein Kaugummi soll mit Hilfe von Scheuerpulver und einem Reinigungsschwamm entfernt werden.","Frische Blutflecken sollen mit heißem Wasser vorbehandelt werden."],
       ans:[0],type:"single",topic:"Fleckenbehandlung"},
      {id:4,sit:0,q:"Welches Merkmal spielt keine Rolle bei der Beurteilung der Qualität eines Teppichbodens?",
       opts:["schwer entflammbar","antistatisch","optisch ansprechend","trittschalldämmend","schmutzabweisend"],
       ans:[2],type:"single",topic:"Bodenbeläge"},
      {id:5,sit:0,q:"Welche Eigenschaft zeichnet einen Staubsauger als besonders ökologisch aus?",
       opts:["Auswechselbare Bodenbürsten für verschiedene Bodenbeläge.","Höhenverstellbarer Griff.","Kann auch mit Batterien betrieben werden.","Modisches Design.","Energieeffizienzklasse A."],
       ans:[4],type:"single",topic:"Umweltschutz"},
      {id:6,sit:0,q:"Tisch: 160 cm lang, 80 cm breit, Überhang 25 cm. Berechnen Sie die Größe der Tischdecke! (Länge × Breite in cm)",
       opts:["210 × 130"],ans:[0],type:"open",topic:"Rechenaufgabe",
       explain:"Länge: 160+(2×25)=210 cm | Breite: 80+(2×25)=130 cm"},
      {id:7,sit:0,q:"Welche 2 Dekorationselemente sind für einen Geburtstag am 26. August geeignet?",
       opts:["Blühende Pflanzen mit Erde im Topf","Adventsgesteck","Ausgehöhlter Kürbis","Farbige Kerzen und Servietten","Kastanien und buntes Laub","Tischgesteck mit Sommerblumen"],
       ans:[3,5],type:"multi",multi:2,topic:"Tischdekoration"},
      {id:8,sit:0,q:"Welche Sicherheitsmaßnahme bei der Dekoration entspricht den Vorschriften?",
       opts:["Vor Notausgängen dürfen Dekorationselemente gestellt werden, wenn die Türen nicht verschlossen sind.","Fluchtwegsymbole dürfen zeitweise mit Dekorationsgegenständen verhängt werden.","Heizquellen und Beleuchtungskörper dürfen nicht direkt mit Papierdekoration in Berührung kommen.","Gardinen müssen nur dann aus flammhemmendem Material sein, wenn sie Heizkörper verdecken.","Plastik- und Seidenblumen dürfen ohne Einschränkung verwendet werden."],
       ans:[2],type:"single",topic:"Sicherheit"},
      {id:9,sit:0,q:"Wie entfernen Sie Kerzenwachs von versilberten Kerzenleuchtern schonend?",
       opts:["Mit einem feuchten Tuch abwischen.","Mit einem Reinigungstuch für Edelstahl polieren.","In Essigreiniger einweichen.","Mit einem harten Putzschwamm abreiben.","Mit heißem Wasser abspülen."],
       ans:[4],type:"single",topic:"Pflege"},
      {id:10,sit:0,q:"Pflegeetikett: 100% Baumwolle, 95°C, Dreieck durchgestrichen, Trockner durchgestrichen, Bügeleisen 3 Punkte, Kreis P. Welcher Pflegehinweis stimmt?",
       opts:["Im Schonwaschgang gewaschen und chemisch gereinigt.","Gechlort und mit normaler Wärme im Trockner getrocknet.","Gechlort, aber nicht geschleudert.","Chemisch gereinigt und auf Stufe 3 gebügelt.","Chemisch gereinigt und mit normaler Wärme im Trockner getrocknet."],
       ans:[3],type:"single",topic:"Pflegeetiketten"},
      {id:11,sit:0,q:"Welche Materialmischung ist für Tischdecken geeignet?",
       opts:["Seide und Baumwolle","Viskose und Seide","Baumwolle und Leinen","Wolle und Leinen","Halbleinen und Polyester"],
       ans:[2],type:"single",topic:"Tischwäsche"},
      {id:12,sit:0,q:"Was versteht man unter Outsourcing bei der Reinigung der Tischdecken?",
       opts:["Die Reinigung wird an eine externe Firma übergeben.","Die Tischdecken sind gemietet, werden aber im Restaurant gewaschen.","Die Wäscherei befindet sich außerhalb des Restaurants.","Die Tischdecken werden von Aushilfskräften gewaschen.","Die Tischdecken werden für mehrere Restaurants angeschafft."],
       ans:[0],type:"single",topic:"Betriebsorganisation"},
      {id:13,sit:1,q:"Sie überprüfen die Lagerung der Kohlensäureflaschen. Worauf müssen Sie achten?",
       opts:["An einem kühlen Ort flach hinlegen.","Können über 25 °C gelagert werden.","Im Getränkekühlhaus mit Druckmesser gesichert.","Müssen stehend gelagert und gegen Umfallen gesichert werden.","Verschlusskappe bei Anlieferung entfernen."],
       ans:[3],type:"single",topic:"Gefahrstofflagerung"},
      {id:14,sit:1,q:"Welche Arbeitsanweisung zum Umgang mit Messern ist falsch?",
       opts:["Bei Bedarf Schutzkleidung tragen","Das geeignete Messer auswählen","Messer nicht ins Spülwasser legen","Fallende Messer auffangen","Nicht benötigte Messer wegräumen"],
       ans:[3],type:"single",topic:"Arbeitssicherheit"},
      {id:15,sit:1,q:"Geben Sie ein Beispiel für Recycling an!",
       opts:["Abfälle beseitigen","Wiederverwertbare Stoffe/Abfälle aufbereiten","Energie einsparen","Papierabfälle verbrennen","Umweltfreundliche Waschmittel verwenden"],
       ans:[1],type:"single",topic:"Recycling"},
      {id:16,sit:1,q:"Ordnen Sie die 6 Abfälle den zutreffenden Behältern zu: 1.Alte Zeitungen 2.Kartoffelschalen 3.Leere Weinflaschen 4.Benutzter Putzlappen 5.Batterien 6.Tetra Pak",
       opts:["Biotonne→2, Glas→3, Gelb→6, Rest→4, Papier→1, Sonder→5"],ans:[0],type:"open",topic:"Mülltrennung",
       explain:"Biotonne: 2 | Glascontainer: 3 | Gelbe Tonne: 6 | Restmüll: 4 | Papiertonne: 1 | Sondermüll: 5"},
      {id:17,sit:1,q:"Welches Kaufkriterium für Reinigungsmittel erfüllt die Vorgaben zu Sicherheit und Umweltschutz nicht?",
       opts:["Konzentrate kaufen.","Nachfüllpackungen kaufen.","Spraydosen kaufen.","Deklarierte Inhaltsstoffe.","Kindersicherheitsverschluss."],
       ans:[2],type:"single",topic:"Reinigungsmittel"},
      {id:18,sit:1,q:"Gäste beschweren sich über Lärm. Welche Maßnahme ist geeignet?",
       opts:["Hintergrundmusik auf mittlere Lautstärke einstellen","Auf Moltons verzichten","Unter den Stuhlbeinen Filzgleiter befestigen","Die Vorhänge abhängen","Keine Tassendeckchen benutzen"],
       ans:[2],type:"single",topic:"Lärmschutz"},
      {id:19,sit:2,q:"Wasserhahn tropft. 10 Liter in 8 Stunden. Wie viel Liter an einem Tag (24h)?",
       opts:["30 Liter"],ans:[0],type:"open",topic:"Rechenaufgabe",
       explain:"24÷8 × 10 = 3 × 10 = 30 Liter"},
      {id:20,sit:2,q:"Welches Mittel für Kalkflecken im Spülbecken ist wirkungsvoll, schonend und umweltfreundlich?",
       opts:["Flüssiges Scheuermittel","Kochsalzlösung","Essigwasser","Spülmittel","Kochendes Wasser"],
       ans:[2],type:"single",topic:"Reinigung"},
      {id:21,sit:2,q:"6 Schritte zur Reinigung einer Gefriertruhe – richtige Reihenfolge:",
       opts:["1.Abtauen → 2.Auswischen → 3.Desinfizieren → 4.Trocknen → 5.Vorkühlen → 6.Einräumen"],ans:[0],type:"open",topic:"Reihenfolge",
       explain:"1. Abschalten/abtauen → 2. Auswischen → 3. Desinfizieren → 4. Austrocknen → 5. Schließen/vorkühlen → 6. Wieder einräumen"},
      {id:22,sit:2,q:"Welche 3 Kontrollen verhindern Lebensmittelverderb im Magazin?",
       opts:["Kontrolle der Lagertemperatur","Kontrolle des MHD der Ware","Kontrolle auf Diebstahl","Kontrolle auf Schädlingsbefall","Kontrolle ob Mindestbestand unterschritten","Kontrolle ob Lieferer pünktlich liefert","Kontrolle ob Verpackung ordnungsgemäß entsorgt"],
       ans:[0,1,3],type:"multi",multi:3,topic:"Lagerkontrolle"},
      {id:23,sit:2,q:"Pfandberechnung: 2 Kisten Weizen (8ct), 3 Kisten alk.frei (8ct), 4 Kisten Wasser (15ct), 12 Einweg (25ct). Kastenpfand 1,50€.",
       opts:["28,34 Euro"],ans:[0],type:"open",topic:"Rechenaufgabe",
       explain:"Kisten: 9×1,50=13,50€ | Flaschen: 1,76+2,88+7,20+3,00=14,84€ | Gesamt: 28,34€"},
      {id:24,sit:2,q:"Eine Steckdose hängt lose aus der Wand. Wie verhalten Sie sich richtig?",
       opts:["Mit Klebeband festkleben.","Zurück in die Wand drücken.","Defekt-Schild anhängen und Vorgesetzten melden.","Dem örtlichen Stromanbieter melden.","Nicht melden, da die Steckdose noch funktioniert."],
       ans:[2],type:"single",topic:"Arbeitssicherheit"},
      {id:25,sit:2,q:"Ihre Schürze hat Flecken. Sie sollen am Büfett arbeiten. Wie verhalten Sie sich?",
       opts:["Schürze umdrehen.","Ohne Schürze zum Büfett gehen.","Alles lassen, wie es ist.","Eine saubere Schürze holen.","Fleck mit Wasser abwaschen."],
       ans:[3],type:"single",topic:"Personalhygiene"},
      {id:26,sit:2,q:"Butter wurde auf dem Teppichboden zertreten. Wie entfernen Sie den Fleck fachgerecht?",
       opts:["Mit kaltem Wasser","Mit warmer Feinwaschmittel-Lösung","Mit Zitronensäure","Mit lauwarmem Essigwasser","Mit Löschpapier und Bügeleisen"],
       ans:[1],type:"single",topic:"Fleckenbehandlung"},
      {id:27,sit:2,q:"Gast wünscht Spaghetti Carbonara. Welches Besteck decken Sie ein?",
       opts:["Mittelmesser und Mittelgabel","Mittellöffel und Mittelgabel","Tafelmesser und Tafelgabel","Tafellöffel und Tafelgabel","Tafellöffel und Mittelgabel"],
       ans:[3],type:"single",topic:"Besteck"},
      {id:28,sit:2,q:"EDV-Anlage im Küchenbereich. Für welchen Einsatzbereich ist der PC nicht unmittelbar geeignet?",
       opts:["Qualitätskontrolle der produzierten Gerichte","Kalkulation der Gerichte","Führen einer Rezeptdatei","Führen einer Lagerdatei","Schreiben einer Speisenkarte"],
       ans:[0],type:"single",topic:"EDV"},
      {id:29,sit:2,q:"Woran erkennen Sie im Internet jede E-Mail-Adresse?",
       opts:["Enthält mindestens ein /.","Enthält mindestens ein ~.","Enthält ein @.","Enthält mehr als ein @.","Beginnt mit #.","Beginnt mit www."],
       ans:[2],type:"single",topic:"EDV"},
      {id:30,sit:2,q:"Wozu dient eine Suchmaschine im Internet unmittelbar?",
       opts:["Richtige Informationen aus dem riesigen Angebot an Dokumenten und Webseiten finden.","Wirksamer Schutz gegen Viren.","Gästebefragungen durchführen und auswerten.","Alle Texte und Bilder dürfen kostenlos kommerziell genutzt werden.","Apps aus dem App-Store installieren."],
       ans:[0],type:"single",topic:"EDV"}
    ]
  },

  "form_a": {
    title: "Musterprüfung A · Jubiläumsfeier im Herbst",
    subtitle: "Silberhochzeit im Oktober · Prüfungszeit: 60 Minuten",
    time: 3600,
    situations: [
      {range:"1–12", text:"Hotel Seeblick: Am 15. Oktober feiern 60 Gäste eine Silberhochzeit. Sie bereiten den Gastraum und die Tischwäsche vor."},
      {range:"13–17", text:"Sie kontrollieren Sicherheit und Umweltstandards im Betrieb."},
      {range:"18–23", text:"Sie sind an der Bar và im Vorratslager eingeteilt."}
    ],
    questions: [
      {id:1,sit:0,q:"Welcher Zustand im Bankettsaal stellt einen Verstoß gegen Brandschutzvorschriften dar?",
       opts:["Feuerlöscher sind frei zugänglich und geprüft.","Ein Notausgang ist mit Dekorationstischen teilweise verstellt.","Fluchtwegbeschilderung ist beleuchtet.","Türen öffnen in Fluchtrichtung.","Rauchmelder sind unbeschädigt."],
       ans:[1],type:"single",topic:"Brandschutz"},
      {id:2,sit:0,q:"Welche Arbeit gehört zur Grundreinigung und muss nicht vor jedem Bankett gemacht werden?",
       opts:["Absaugen des Teppichbodens","Feuchtes Abwischen der Tische","Maschinelle Grundreinigung und Neuversiegelung des Parkettbodens","Entstauben der Fensterbänke","Leeren der Abfalleimer"],
       ans:[2],type:"single",topic:"Reinigung"},
      {id:3,sit:0,q:"Frischer Kerzenwachsfleck auf dem Teppichboden. Wie entfernen Sie ihn fachgerecht?",
       opts:["Mit kochendem Seifenwasser einreiben","Löschpapier auflegen und vorsichtig mit mäßiger Hitze darüberbügeln","Mit feinem Speisesalz bestreuen","Mit reinem Aceton übergießen","Mit heißem Dampf anblasen"],
       ans:[1],type:"single",topic:"Fleckenbehandlung"},
      {id:4,sit:0,q:"Welches Merkmal kennzeichnet einen neuen Staubsauger als besonders energieeffizient?",
       opts:["Kabel mit 15m Länge","Motor mit 2.200 Watt","EU-Energielabel mit hoher Energieeffizienzklasse A","Chrom-Gehäuse","Nur Einwegbeutel"],
       ans:[2],type:"single",topic:"Umweltschutz"},
      {id:5,sit:0,q:"Welche Stoffeigenschaft ist für hochwertige Restaurant-Tischdecken aus Baumwolle entscheidend?",
       opts:["Geringe Saugfähigkeit","Hohe Koch- und Bügelfestigkeit sowie Strapazierfähigkeit (Vollzwirn)","Elastischer Stretch-Anteil","Kunststoff-Beschichtung","Sehr dünner Stoff"],
       ans:[1],type:"single",topic:"Tischwäsche"},
      {id:6,sit:0,q:"Tisch: 180 cm lang, 90 cm breit, Überhang 25 cm. Berechnen Sie die Maße der Tischdecke in cm!",
       opts:["230 × 140"],ans:[0],type:"open",topic:"Rechenaufgabe",
       explain:"180+(2×25)=230 cm | 90+(2×25)=140 cm"},
      {id:7,sit:0,q:"Welche 2 Dekorationselemente passen stilvoll zur Silberhochzeit im Oktober?",
       opts:["Narzissen und Tulpen","Silberne Kerzenleuchter mit weißen Tafelkerzen","Adventskranz mit Tannenzapfen","Gruselige Halloween-Kürbisse","Herbstliches Tischgesteck mit dezenten Silberakzenten","Topfpflanzen mit feuchter Erde"],
       ans:[1,4],type:"multi",multi:2,topic:"Tischdekoration"},
      {id:8,sit:0,q:"Welche Sicherheitsregel ist beim Aufstellen echter Kerzen zwingend einzuhalten?",
       opts:["Kerzen direkt auf Papierservietten stellen","In standfesten, unbrennbaren Leuchtern, nicht im Luftzug oder nah an Vorhängen","Erst beim Hauptgang anzünden","Über Nacht brennen lassen","Mit brennbarem Plastikband verzieren"],
       ans:[1],type:"single",topic:"Sicherheit"},
      {id:9,sit:0,q:"Angelaufenes Silberbesteck (Silbersulfid) reinigen Sie schonend durch:",
       opts:["Drahtwolle und Scheuerpulver","Salzsäurebad","Warmes Alufolie-Salzbad oder spezielles Silberpoliertuch","Spülmaschine bei 90°C mit Lauge","Essigreiniger pH 1"],
       ans:[2],type:"single",topic:"Pflege"},
      {id:10,sit:0,q:"Pflegeetikett: Waschbottich 60°C, Dreieck durchgestrichen, Bügeleisen 2 Punkte, Kreis P, Trockner 1 Punkt. Welche Aussage ist richtig?",
       opts:["Mit Chlor gebleicht werden","Bei mittlerer Hitze (150°C) gebügelt und bei niedriger Temperatur getrocknet werden","Darf nicht gewaschen werden","Kochend bei 95°C waschen","Nicht im Trockner trocknen"],
       ans:[1],type:"single",topic:"Pflegeetiketten"},
      {id:11,sit:0,q:"Welcher Grund ist kein Zweck einer Molton-Unterlage unter dem Tischtuch?",
       opts:["Dämpfung von Klirrgeräuschen","Schutz der Tischplatte vor Hitzeschäden","Verhinderung des Verrutschens der Tischdecke","Vollständiger Ersatz des Tischtuches","Aufsaugen verschütteter Flüssigkeiten"],
       ans:[3],type:"single",topic:"Tischwäsche"},
      {id:12,sit:0,q:"Was ist der wesentliche Vorteil von Mietwäsche / Leasing gegenüber Eigenwäsche?",
       opts:["Keine hohen Investitionskosten für teure Waschmaschinen und Wäschekauf","Mitarbeiter müssen im Restaurant bügeln","Wäsche wird nach 2 Wochen Eigentum","Keine Lagerfläche nötig","Kein Umtausch möglich"],
       ans:[0],type:"single",topic:"Betriebsorganisation"},
      {id:13,sit:1,q:"Welche Vorschrift zur Gefahrstofflagerung ist korrekt?",
       opts:["In leere Mineralwasserflaschen umfüllen","Zusammen mit offenen Lebensmitteln lagern","Im Originalgebinde mit Kennzeichnung, Sicherheitsdatenblatt und unter Verschluss","Säuren und Laugen offen mischen","Über 40°C in der Sonne lagern"],
       ans:[2],type:"single",topic:"Gefahrstofflagerung"},
      {id:14,sit:1,q:"Wasserkaraffe zerbricht im Buffetbereich. Welche Maßnahmenkette ist korrekt?",
       opts:["Weitergehen und später kehren","Scherben mit bloßen Händen aufheben","Warnschild aufstellen, Scherben mit Handfeger/Schaufel aufnehmen, Boden trockenwischen","Teppich darüberlegen","Licht ausschalten"],
       ans:[2],type:"single",topic:"Arbeitssicherheit"},
      {id:15,sit:1,q:"Welche Stufe hat in der 5-stufigen Abfallhierarchie nach KrWG die oberste Priorität?",
       opts:["Beseitigung","Energetische Verwertung","Abfallvermeidung","Recycling","Deponierung"],
       ans:[2],type:"single",topic:"Umweltschutz"},
      {id:16,sit:1,q:"Ordnen Sie zu: 1.Bierkronkorken 2.Kaffeesatz 3.Porzellanscherben 4.Sektflaschen 5.Pappkarton 6.Leuchtstoffröhren → Behälter: Biotonne, Glas, Gelber Sack, Papier, Restmüll, Sondermüll",
       opts:["Bio→2, Glas→4, Gelb→1, Papier→5, Rest→3, Sonder→6"],ans:[0],type:"open",topic:"Mülltrennung",
       explain:"Biotonne: 2 | Glas: 4 | Gelber Sack: 1 | Papier: 5 | Restmüll: 3 | Sondermüll: 6"},
      {id:17,sit:1,q:"Warum führt eine Überdosierung von Allzweckreiniger zu Nachteilen?",
       opts:["Einwirkzeit sinkt auf 0","Klebrige Tensidschichten bauen sich auf, ziehen Schmutz an và machen Böden rutschig","pH-Wert wird 0","Wasser gefriert sofort","Tücher verlieren Farbe"],
       ans:[1],type:"single",topic:"Reinigungsmittel"},
      {id:18,sit:2,q:"Gäste beschweren sich über lautes Besteckgeklapper. Welche Maßnahme hilft direkt am Tisch?",
       opts:["Tischdecken weglassen","Molton-Tischpolster unter dem Tischtuch verwenden","Plastikbesteck eindecken","Musik verdoppeln","Nur Suppe servieren"],
       ans:[1],type:"single",topic:"Lärmschutz"},
      {id:19,sit:2,q:"Mischbatterie tropft: 7,5 Liter in 5 Stunden. Wie viel Liter in 24 Stunden?",
       opts:["36 Liter"],ans:[0],type:"open",topic:"Rechenaufgabe",
       explain:"7,5 ÷ 5 = 1,5 l/h → 1,5 × 24 = 36 Liter"},
      {id:20,sit:2,q:"Welches Entkalkungsmittel für Kaffeemaschinen ist materialschonend und umweltfreundlich?",
       opts:["Salzsäure pH 0","Zitronensäure- oder Milchsäurebasis (organische Säuren)","Natronlauge pH 14","Scheuersand mit Chlor","Schmierseife"],
       ans:[1],type:"single",topic:"Reinigung"},
      {id:21,sit:2,q:"Reihenfolge Gläserspülmaschine reinigen: 1.Ausschalten 2.Wasser ablassen 3.Siebe/Wascharme herausnehmen 4.Innenraum auswischen 5.Siebe einsetzen 6.Tür offen lassen",
       opts:["1→2→3→4→5→6"],ans:[0],type:"open",topic:"Reihenfolge",
       explain:"1. Gerät ausschalten → 2. Wasser abpumpen → 3. Siebe/Arme reinigen → 4. Innenraum auswischen → 5. Einsetzen → 6. Tür belüften"},
      {id:22,sit:2,q:"Welche 3 Prüfungen verhindern den Verderb im Vorratslager?",
       opts:["Tägliche Kontrolle/Protokoll der Lagertemperaturen","Überprüfung der Haltbarkeitsdaten (MHD / FIFO)","Kontrolle auf Schädlingsspuren","Kontrolle des Firmenlogos","Unterschrift Lieferschein prüfen","Supermarkt-Prospekt prüfen"],
       ans:[0,1,2],type:"multi",multi:3,topic:"Lagerkontrolle"},
      {id:23,sit:2,q:"Pfandberechnung: 4 Kisten Pils (20 Fl. à 8ct), 3 Kisten Cola (12 Fl. à 15ct), 16 Einwegflaschen (25ct). Kastenpfand 1,50€.",
       opts:["28,30 Euro"],ans:[0],type:"open",topic:"Rechenaufgabe",
       explain:"Kisten: 7×1,50=10,50€ | Flaschen: (80×0,08)+(36×0,15)+(16×0,25) = 6,40+5,40+4,00 = 15,80€ | Gesamt: 28,30€"}
    ]
  },

  "form_b": {
    title: "Musterprüfung B · Weihnachtsbankett im Winter",
    subtitle: "Weihnachtsfeier im Dezember · Prüfungszeit: 60 Minuten",
    time: 3600,
    situations: [
      {range:"1–12", text:"Schlosshotel Bellevue: Am 20. Dezember feiern 80 Personen eine Weihnachtsfeier mit 4-Gänge-Menü. Sie decken das Menügedeck ein."},
      {range:"13–17", text:"Sie prüfen Arbeitssicherheit, Chemieeinsatz và Brandschutz im Küchenbereich."},
      {range:"18–23", text:"Sie bedienen Gäste im Service và verwalten Leergut."}
    ],
    questions: [
      {id:1,sit:0,q:"Welche Maßnahme entspricht den Brandschutzbestimmungen bei Weihnachtsdekoration?",
       opts:["Brennende Kerzen direkt in trockene Tannenzweige stecken","Fluchtwege mit Geschenketischen verstellen","Lichterketten mit VDE-/GS-Zeichen nutzen, Steckdosen nicht überlasten","Papiergirlanden über Heizstrahlern aufhängen","Notausgangsschilder verdecken"],
       ans:[2],type:"single",topic:"Brandschutz"},
      {id:2,sit:0,q:"Welche Arbeiten gehören zur Unterhaltsreinigung vor dem Eindecken?",
       opts:["Grundreinigung der Polstermöbel","Fensterbänke abwischen, Tische ausrichten và reinigen, Boden saugen/wischen","Abschleifen der Holztheke","Chemisches Reinigen der Decken","Wände streichen"],
       ans:[1],type:"single",topic:"Reinigung"},
      {id:3,sit:0,q:"Rotweinfleck auf weißer Baumwolltischdecke. Richtige Sofortmaßnahme?",
       opts:["Mit heißem Kaffee übergießen","Flüssigkeit mit sauberem Tuch abtupfen, mit Mineralwasser oder Salz behandeln solange feucht","Mit Feuerzeug erhitzen","3 Tage eintrocknen lassen","Tinte darüber gießen"],
       ans:[1],type:"single",topic:"Fleckenbehandlung"},
      {id:4,sit:0,q:"Tisch: 200 cm lang, 100 cm breit, Überhang 30 cm. Berechnen Sie die Tischdeckengröße in cm!",
       opts:["260 × 160"],ans:[0],type:"open",topic:"Rechenaufgabe",
       explain:"200+(2×30)=260 cm | 100+(2×30)=160 cm"},
      {id:5,sit:0,q:"Welche 2 Dekorationselemente passen zu einem traditionellen Weihnachtsbankett im Dezember?",
       opts:["Frische Kirschblütenzweige","Rote/goldene Bänder mit dezenten Tannenzweigen und Zapfen","Ostereier im Heunest","Wassermelonen mit Schirmchen","Weihnachtliche Menükarten mit Teelichtern im Glas","Strandmuscheln und Sand"],
       ans:[1,4],type:"multi",multi:2,topic:"Tischdekoration"},
      {id:6,sit:0,q:"Menü: 1.Suppe 2.Fisch 3.Hauptgang (Fleisch). Besteckanordnung rechts von AUSSEN nach INNEN?",
       opts:["Menümesser → Fischmesser → Suppenlöffel","Suppenlöffel → Fischmesser → Menümesser (Schneide nach links)","Fischgabel → Menügabel → Suppenlöffel","Dessertlöffel → Menümesser → Suppenlöffel","Menümesser → Suppenlöffel → Fischmesser"],
       ans:[1],type:"single",topic:"Besteck"},
      {id:7,sit:0,q:"Wo wird das Richtglas (Wasserglas) normgerecht platziert?",
       opts:["Links neben der Menügabel","Genau 1 cm über der Spitze des Menümessers (Hauptgangmesser)","In der Mitte des Platztellers","Hinter dem Brotteller","Links des Dessertbestecks"],
       ans:[1],type:"single",topic:"Gläser"},
      {id:8,sit:0,q:"An welcher Position wird der Brotteller mit dem Buttermesser eingedeckt?",
       opts:["Rechts neben dem Suppenlöffel","Links neben der äußeren Gabel, Buttermesser auf dem Teller (Schneide nach links)","Oberhalb des Dessertbestecks","Auf dem Platzteller","Unter der Serviette"],
       ans:[1],type:"single",topic:"Besteck"},
      {id:9,sit:0,q:"Warum sollten Mundservietten mit möglichst wenigen Handgriffen gefaltet werden?",
       opts:["Damit sie schneller zerreißt","Aus Hygienegründen, um Keimübertragung durch Handkontakt zu minimieren","Damit sie schwerer wird","Wird nur 1x pro Jahr gewaschen","Damit man keine Handschuhe braucht"],
       ans:[1],type:"single",topic:"Hygiene"},
      {id:10,sit:0,q:"Pflegeetikett mit durchgestrichenem Wäschetrockner-Symbol. Was bedeutet das?",
       opts:["Bei maximaler Hitze trocknen","Darf nicht im Wäschetrockner getrocknet werden (nur Lufttrocknung)","Darf nicht gebügelt werden","Chemisch reinigen","Nur schleudern"],
       ans:[1],type:"single",topic:"Pflegeetiketten"},
      {id:11,sit:0,q:"Was zeichnet hochwertige Damast-Tischdecken aus?",
       opts:["Aufgedruckte Farbmuster","Eingewebte Muster durch Wechsel von Kett- und Schussfäden mit Glanzeffekt","Grobe Struktur wie Kartoffelsack","Dehnbar wie Gummi","Reines Plastik"],
       ans:[1],type:"single",topic:"Tischwäsche"},
      {id:12,sit:0,q:"Wie werden Gläser vor dem Eindecken fachgerecht poliert?",
       opts:["Mit den Fingern auswischen","Über Wasserdampf halten und mit fusselfreiem Leinentuch an Fuß und Kelch polieren (nicht am Stiel drehen)","Mit Zeitungspapier reiben","Mit Spülmittelschaum einreiben","Mit feuchtem Küchenpapier"],
       ans:[1],type:"single",topic:"Pflege"},
      {id:13,sit:1,q:"Wo dürfen Kohlensäureflaschen CO2 keinesfalls gelagert werden?",
       opts:["In gut belüfteten kühlen Räumen","In engen, ungelüfteten Fluren, Treppenhäusern oder nah an Wärmequellen/Öfen","Im Flaschenlager mit Wandhalterung","Im Getränkekeller mit Kette","Im separaten Gasflaschenraum"],
       ans:[1],type:"single",topic:"Gefahrstofflagerung"},
      {id:14,sit:1,q:"Welcher Griff schützt die Fingerkuppen beim Schneiden mit dem Messer?",
       opts:["Flachhandgriff","Krallengriff (Fingerkuppen nach innen gebogen, Daumen hinten)","Scherengriff","Faustgriff","Festhalten mit Gabel"],
       ans:[1],type:"single",topic:"Arbeitssicherheit"},
      {id:15,sit:1,q:"Welche Maßnahme vermeidet aktiv Abfall im Service?",
       opts:["Portionspackungen für Butter","Mehrweg-Karaffen und Großgebinde statt Einweg-Portionspackungen","Stoffservietten nach 1x wegwerfen","Einweg-Pappbecher nutzen","Täglich neue Putzlappen"],
       ans:[1],type:"single",topic:"Umweltschutz"},
      {id:16,sit:1,q:"Ordnen Sie pH-Werte zu: Allzweckreiniger (pH 7), Grillreiniger (pH 13), Urinsteinentferner (pH 1), Sanitärreiniger (pH 4), Bodenwischpflege (pH 9)",
       opts:["Allzweck→pH7, Grill→pH13, Urinstein→pH1, Sanitär→pH4, Boden→pH9"],ans:[0],type:"open",topic:"Chemie",
       explain:"pH 1: stark sauer (Kalk/Urinstein) | pH 4: schwach sauer (Sanitär) | pH 7: neutral (Allzweck) | pH 9: schwach alkalisch | pH 13: stark alkalisch (Fett/Grill)"},
      {id:17,sit:1,q:"Waschtemperatur sinkt von 90°C auf 40°C. Wie muss der Waschprozess nach Sinner angepasst werden?",
       opts:["Gar nichts ändern","Waschzeit verlängern (Zeit) und enzymatische Waschmittel nutzen (Chemie)","Ohne Waschmittel waschen","Trommel nur 10% beladen","Nass aufhängen"],
       ans:[1],type:"single",topic:"Sinnerscher Kreis"},
      {id:18,sit:2,q:"Beim Amerikanischen Service: Von welcher Seite wird der Hauptgang serviert?",
       opts:["Grundsätzlich von LINKS","Grundsätzlich von RECHTS","Von der freien Seite","Über die Tischmitte","Gast holt selbst ab"],
       ans:[1],type:"single",topic:"Service"},
      {id:19,sit:2,q:"Defekter Spülkasten verliert 6 Liter in 4 Stunden. Wasserverlust in 24 Stunden?",
       opts:["36 Liter"],ans:[0],type:"open",topic:"Rechenaufgabe",
       explain:"6 ÷ 4 = 1,5 l/h → 1,5 × 24 = 36 Liter"},
      {id:20,sit:2,q:"Fettbrand in der Fritteuse. Welcher Feuerlöscher ist zwingend einzusetzen?",
       opts:["Wasserlöscher (Klasse A)","Fettbrandlöscher (Brandklasse F)","Kohlendioxidlöscher für Holz","Sandeimer mit Wasser","Schaumlöscher für Metalle"],
       ans:[1],type:"single",topic:"Brandschutz"},
      {id:21,sit:2,q:"Reihenfolge Kombidämpfer reinigen: 1.Abkühlen (<60°C) 2.Speisereste entfernen 3.Fettlöser einsprühen/einwirken 4.Klar nachspülen 5.Trockenwischen 6.Tür offen lassen",
       opts:["1→2→3→4→5→6"],ans:[0],type:"open",topic:"Reihenfolge",
       explain:"1. Abkühlen → 2. Reste entfernen → 3. Reiniger einsprühen → 4. Nachspülen → 5. Trocknen → 6. Belüften"},
      {id:22,sit:2,q:"Höchsttemperatur für frisches Geflügelfleisch und frisches Hackfleisch?",
       opts:["Geflügel: +10°C | Hack: +8°C","Geflügel: ≤ +4°C | Hackfleisch: ≤ +2°C","Geflügel: +7°C | Hack: +7°C","Geflügel: 0°C | Hack: -18°C","Beide bei +15°C"],
       ans:[1],type:"single",topic:"Kühlkette"},
      {id:23,sit:2,q:"Pfandberechnung: 5 Kisten Wasser (12 Fl. à 15ct), 2 Kisten Bier (24 Fl. à 8ct), 20 Einweg-PET (25ct). Kastenpfand 1,50€.",
       opts:["28,34 Euro"],ans:[0],type:"open",topic:"Rechenaufgabe",
       explain:"Kisten: 7×1,50=10,50€ | Flaschen: (60×0,15)+(48×0,08)+(20×0,25) = 9,00+3,84+5,00 = 17,84€ | Gesamt: 28,34€"}
    ]
  },

  "form_c": {
    title: "Musterprüfung C · Frühlings-Hochzeitsfeier",
    subtitle: "Hochzeit im Mai · Prüfungszeit: 60 Minuten",
    time: 3600,
    situations: [
      {range:"1–12", text:"Landgasthof zur Post: Am 18. Mai feiern 100 Gäste eine Hochzeit. Sie helfen bei Raumvorbereitung, Bankettgedeck và Gästebetreuung."},
      {range:"13–17", text:"Sie achten auf Arbeitsschutz, Chlorgas-Vermeidung và nachhaltige Mülltrennung."},
      {range:"18–23", text:"Sie übernehmen Thekendienst, Warenannahme và Reklamationsbehandlung."}
    ],
    questions: [
      {id:1,sit:0,q:"Wie müssen Flucht- und Rettungswege im Gastraum vorschriftsmäßig gekennzeichnet sein?",
       opts:["Rote runde Verbotsschilder","Grüne rechteckige Schilder mit weißem Pfeil/Rettungszeichen (beleuchtet/nachleuchtend)","Gelbe Dreiecke","Handgeschriebene Zettel","Kreidemarkierung am Boden"],
       ans:[1],type:"single",topic:"Brandschutz"},
      {id:2,sit:0,q:"Nach welcher Grundregel wird der Gastraum hygienisch gereinigt?",
       opts:["Von unten nach oben","Von oben nach unten, von innen nach außen und von sauber zu unrein","Querfeldein","Vom WC zum Tisch mit demselben Tuch","Erst eindecken, dann Decke entstauben"],
       ans:[1],type:"single",topic:"Reinigung"},
      {id:3,sit:0,q:"Frischer Kaffeefleck auf weißer Stoffserviette. Fachgerechte Vorbehandlung?",
       opts:["Mit lauwarmem Wasser auswaschen, Fleckensalz/Sauerstoffbleiche vor der Wäsche auftragen","Mit Schmieröl einreiben","Bei 200°C trocken einbügeln","Mit Rotwein übergießen","In Essigsäure kochen"],
       ans:[0],type:"single",topic:"Fleckenbehandlung"},
      {id:4,sit:0,q:"Tisch: 160 cm lang, 80 cm breit, Überhang 20 cm. Berechnen Sie die Tischdeckengröße in cm!",
       opts:["200 × 120"],ans:[0],type:"open",topic:"Rechenaufgabe",
       explain:"160+(2×20)=200 cm | 80+(2×20)=120 cm"},
      {id:5,sit:0,q:"Welche 2 Dekorationselemente passen besonders gut zu einer Hochzeit im Mai?",
       opts:["Frühlingsblumen (weiße Tulpen, Maiglöckchen) in Glasvasen","Getrocknete Maiskolben","Grüne Buchsbaumkränze mit zarten weißen Bändern","Eiszapfen aus Plastik","Halloween-Kürbisse","Tontöpfe mit Gartenerde"],
       ans:[0,2],type:"multi",multi:2,topic:"Tischdekoration"},
      {id:6,sit:0,q:"Was ist das typische Merkmal eines festlichen Bankettgedecks im Vergleich zum Grundgedeck?",
       opts:["Kein Besteck auf dem Tisch","Platzteller als Basis, vollständiges Besteck für alle Gänge (max. 3 Besteckteile je Seite) và Gläsersatz","Pappteller và Plastikbesteck","Keine Gläser","Gäste bringen Besteck mit"],
       ans:[1],type:"single",topic:"Gedeckarten"},
      {id:7,sit:0,q:"Wie wird das Dessertbesteck oberhalb des Platztellers eingedeckt?",
       opts:["Löffel nach links, Gabel nach rechts","Dessertgabel liegt unten (Griff nach LINKS), Dessertlöffel liegt oben (Griff nach RECHTS)","Beide Griffe nach unten","Senkrecht im Wasserglas","Unter dem Teller"],
       ans:[1],type:"single",topic:"Besteck"},
      {id:8,sit:0,q:"Wie läuft der Französische Service (Plattenservice) korrekt ab?",
       opts:["Teller wird in der Küche angerichtet và von rechts serviert","Speisen auf Platten von LINKS herangereicht, Gast bedient sich mit Vorlegebesteck selbst","Kellner legt am Gueridon vor","Nur Buffet-Selbstbedienung","Speisen werden hingestellt"],
       ans:[1],type:"single",topic:"Service"},
      {id:9,sit:0,q:"Gast meldet schwere Glutenunverträglichkeit (Zöliakie). Welche Zutat muss zwingend vermieden werden?",
       opts:["Reines Rindfleisch","Weizen, Roggen, Gerste, Dinkel und herkömmliches Mehl","Frisches Quellwasser","Frische Äpfel","Gekochte Kartoffeln"],
       ans:[1],type:"single",topic:"Allergene"},
      {id:10,sit:0,q:"Bügeleisensymbol mit 3 Punkten auf dem Etikett bedeutet:",
       opts:["Nicht bügeln","Nur mit kaltem Dampf bügeln","Bügeln mit hoher Hitze bis maximal 200°C (für Baumwolle/Leinen)","Nur Stufe 1","Muss nass gebügelt werden"],
       ans:[2],type:"single",topic:"Pflegeetiketten"},
      {id:11,sit:0,q:"Gast reklamiert verärgert kalte Suppe. Professionelles Verhalten nach L-A-S-T:",
       opts:["Sagen, dass er zu langsam isst","Lautstark diskutieren","Ruhig zuhören (Listen), entschuldigen (Apologize), sofort heiße Suppe bringen (Solve), bedanken (Thank)","Ignorieren","Dem Koch die Schuld geben"],
       ans:[2],type:"single",topic:"Reklamation"},
      {id:12,sit:0,q:"Wie wird die 3-Teller-Tragetechnik mit der linken Hand korrekt ausgeführt?",
       opts:["Alle 3 Teller aufeinander stapeln","Teller 1 mit Daumen/Zeigefinger greifen, Teller 2 unter den ersten schieben (Unterarm stützen), Teller 3 in rechter Hand","Teller mit Zähnen halten","Auf dem Kopf balancieren","Nur mit Fingerspitzen"],
       ans:[1],type:"single",topic:"Service"},
      {id:13,sit:1,q:"Warum darf saurer Kalklöser niemals mit chlorhaltigem Reiniger gemischt werden?",
       opts:["Gemisch gefriert sofort","Es entsteht hochgiftiges Chlorgas (schwere Lungenverätzung und Erstickung)","Reinigungskraft verdoppelt sich","Flasche wird rosa","Wird zu Speiseöl"],
       ans:[1],type:"single",topic:"Gefahrstoffe"},
      {id:14,sit:1,q:"Welche PSA ist beim Ansetzen ätzender Reinigungslauge zur Grundreinigung vorgeschrieben?",
       opts:["Kurze Hose und Sandalen","Chemikalienbeständige Schutzhandschuhe (Nitril) und dichtschließende Schutzbrille","Wollmütze und Sonnenbrille","Lederschürze ohne Handschuhe","Stoffmaske"],
       ans:[1],type:"single",topic:"Arbeitssicherheit"},
      {id:15,sit:1,q:"Welche Einrichtung an Handwaschbecken spart wirkungsvoll Wasser?",
       opts:["Entfernen des Abflusses","Strahlregler mit Luftbeimischung (Perlatoren) oder Sensorarmaturen","Voll aufgedrehte Drehventile","Loch im Becken","Nur Heißwasser"],
       ans:[1],type:"single",topic:"Umweltschutz"},
      {id:16,sit:1,q:"Ordnen Sie zu: 1.Naturkorken 2.Altspeiseöl 3.Konservendosen 4.Speisekartenpapier 5.Fettige Papierservietten 6.Altglas",
       opts:["Altglas→6, Fettabscheider→2, Gelber Sack→3, Papier→4, Restmüll→5, Wertstoffhof→1"],ans:[0],type:"open",topic:"Mülltrennung",
       explain:"Altglas: 6 | Fettabscheider: 2 | Gelber Sack: 3 | Papier: 4 | Restmüll: 5 | Korksammlung: 1"},
      {id:17,sit:1,q:"Welches Reinigungstuch wird für Waschbecken, Fliesen und Armaturen im Sanitärbereich genutzt?",
       opts:["Rotes Tuch (WC)","Gelbes Tuch (Waschbecken/Armaturen)","Blaues Tuch (Gastraum)","Grünes Tuch (Küche)","Schwarzes Tuch"],
       ans:[1],type:"single",topic:"Vier-Farben-System"},
      {id:18,sit:2,q:"Warum schäumt Bier im fettigen Glas stark auf và die Schaumkrone zerfällt sofort?",
       opts:["Fett zerstört die Oberflächenspannung und wirkt als Schaumzerstörer","Bier enthält kein Wasser","Glas ist zu kalt","Kohlensäure wird vermehrt","Alkoholgehalt steigt"],
       ans:[0],type:"single",topic:"Getränkekunde"},
      {id:19,sit:2,q:"Wasserhahn tropft: 4,5 Liter in 3 Stunden. Wasserverlust in 24 Stunden?",
       opts:["36 Liter"],ans:[0],type:"open",topic:"Rechenaufgabe",
       explain:"4,5 ÷ 3 = 1,5 l/h → 1,5 × 24 = 36 Liter"},
      {id:20,sit:2,q:"Warum darf saurer Kalklöser (pH 1) nicht auf Marmor-Waschtischen verwendet werden?",
       opts:["Marmor besteht aus Calciumcarbonat (Kalkstein) und wird durch Säure zersetzt und matt angeätzt","Marmor fängt Feuer","Verwandelt Säure in Zucker","Wird fest wie Stein","Ist kein Stein"],
       ans:[0],type:"single",topic:"Materialkunde"},
      {id:21,sit:2,q:"Reihenfolge Wareneingang Rindfleisch: 1.Fahrzeug prüfen 2.Lieferschein mit Bestellung abgleichen 3.Kerntemperatur messen 4.Sensorische Prüfung 5.Kompensieren/Unterschreiben 6.Sofort Kühlhaus einlagern",
       opts:["1→2→3→4→5→6"],ans:[0],type:"open",topic:"Reihenfolge",
       explain:"1. Fahrzeugkontrolle → 2. Lieferscheinabgleich → 3. Temperaturmessung (≤7°C) → 4. Sensorik → 5. Quittierung → 6. Kühlhaus"},
      {id:22,sit:2,q:"Was bedeutet das Lagerprinzip FIFO (First In – First Out)?",
       opts:["Teuerste Ware zuerst","Waren mit früherem Einlagerungsdatum/kürzerem MHD zuerst verbrauchen; Neulieferung hinten/unten einräumen","Alles gleichzeitig wegwerfen","Nur montags einlagern","Schwerste Kiste oben"],
       ans:[1],type:"single",topic:"Lagergrundsätze"},
      {id:23,sit:2,q:"Pfandberechnung: 6 Kisten Bier (20 Fl. à 8ct), 4 Kisten Limonade (12 Fl. à 15ct), 10 Einwegdosen (25ct). Kastenpfand 1,50€.",
       opts:["34,30 Euro"],ans:[0],type:"open",topic:"Rechenaufgabe",
       explain:"Kisten: 10×1,50=15,00€ | Flaschen/Dosen: (120×0,08)+(48×0,15)+(10×0,25) = 9,60+7,20+2,50 = 19,30€ | Gesamt: 34,30€"}
    ]
  }
};

/* ---------- UI ENGINE ---------- */
let _exam = null;
let _answers = {};
let _timer = null;
let _remaining = 0;
let _marked = new Set();
let _submitted = false;

function startExam(examId){
  const data = EXAMS[examId];
  if(!data) return;
  _exam = data;
  _answers = {};
  _marked = new Set();
  _submitted = false;
  _remaining = data.time;
  renderExamUI();
  _timer = setInterval(tick, 1000);
  document.body.style.overflow = 'hidden';
}

function tick(){
  _remaining--;
  updateTimerDisplay();
  if(_remaining <= 0){ clearInterval(_timer); submitExam(); }
}

function updateTimerDisplay(){
  const el = document.getElementById('exam-timer');
  if(!el) return;
  const m = Math.floor(_remaining/60);
  const s = _remaining % 60;
  el.textContent = String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');
  if(_remaining <= 300) el.classList.add('warn');
  if(_remaining <= 60) el.classList.add('danger');
}

function renderExamUI(){
  let overlay = document.getElementById('exam-overlay');
  if(!overlay){
    overlay = document.createElement('div');
    overlay.id = 'exam-overlay';
    document.body.appendChild(overlay);
  }
  const qs = _exam.questions;
  const answeredCount = Object.keys(_answers).length;

  overlay.innerHTML = `
<style>
#exam-overlay{position:fixed;inset:0;z-index:9999;background:var(--bg,#F2F2F7);overflow-y:auto;-webkit-overflow-scrolling:touch;padding:0;font-family:-apple-system,BlinkMacSystemFont,system-ui,sans-serif}
.ex-header{position:sticky;top:0;z-index:10;background:rgba(255,255,255,.95);backdrop-filter:blur(12px);border-bottom:1px solid #e5e5ea;padding:12px 16px;display:flex;align-items:center;justify-content:space-between;gap:10px}
.ex-title{font-size:.92em;font-weight:600;color:#1e293b;flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ex-timer{font-size:1.15em;font-weight:700;font-variant-numeric:tabular-nums;color:#007aff;background:#eaf3ff;padding:5px 12px;border-radius:20px;min-width:70px;text-align:center}
.ex-timer.warn{color:#b45309;background:#fef3c7}
.ex-timer.danger{color:#b91c1c;background:#fee2e2;animation:pulse-danger 1s infinite}
@keyframes pulse-danger{0%,100%{opacity:1}50%{opacity:.6}}
.ex-progress{height:4px;background:#e5e5ea;border-radius:2px;margin:0 16px 8px}
.ex-progress span{display:block;height:100%;background:#007aff;border-radius:2px;transition:width .3s}
.ex-body{max-width:720px;margin:0 auto;padding:8px 16px 100px}
.ex-sit{background:#f0f4ff;border-left:3px solid #007aff;border-radius:0 10px 10px 0;padding:12px 14px;margin:16px 0 12px;font-size:.88em;color:#475569;font-style:italic}
.ex-card{background:#fff;border:1px solid #e5e5ea;border-radius:14px;padding:16px;margin-bottom:14px;transition:border-color .2s}
.ex-card.answered{border-color:#007aff}
.ex-card.marked{border-color:#f59e0b;box-shadow:0 0 0 2px rgba(245,158,11,.15)}
.ex-card.correct{border-color:#22c55e;background:#f0fdf4}
.ex-card.wrong{border-color:#ef4444;background:#fef2f2}
.ex-q-head{display:flex;align-items:flex-start;gap:8px;margin-bottom:10px}
.ex-q-num{background:#007aff;color:#fff;font-weight:700;font-size:.82em;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.ex-q-text{font-size:.92em;font-weight:500;color:#1e293b;line-height:1.5;flex:1}
.ex-q-mark{cursor:pointer;font-size:1.2em;opacity:.3;transition:.15s;flex-shrink:0}
.ex-q-mark.active{opacity:1}
.ex-opts{display:flex;flex-direction:column;gap:6px;margin-top:8px}
.ex-opt{display:flex;align-items:flex-start;gap:10px;padding:10px 12px;border:1px solid #e5e5ea;border-radius:10px;cursor:pointer;font-size:.88em;color:#334155;line-height:1.45;transition:.15s;-webkit-tap-highlight-color:transparent}
.ex-opt:hover{border-color:#007aff;background:#f8faff}
.ex-opt.selected{border-color:#007aff;background:#eaf3ff;color:#004b99;font-weight:500}
.ex-opt.correct-opt{border-color:#22c55e;background:#dcfce7;color:#166534}
.ex-opt.wrong-opt{border-color:#ef4444;background:#fee2e2;color:#991b1b}
.ex-opt .radio{width:20px;height:20px;border:2px solid #c4c4c6;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;transition:.15s}
.ex-opt .checkbox{width:20px;height:20px;border:2px solid #c4c4c6;border-radius:5px;flex-shrink:0;display:flex;align-items:center;justify-content:center;transition:.15s}
.ex-opt.selected .radio{border-color:#007aff;background:#007aff}
.ex-opt.selected .radio::after{content:'';width:8px;height:8px;background:#fff;border-radius:50%}
.ex-opt.selected .checkbox{border-color:#007aff;background:#007aff}
.ex-opt.selected .checkbox::after{content:'✓';color:#fff;font-size:.75em;font-weight:700}
.ex-open-input{width:100%;padding:10px 14px;border:1px solid #e5e5ea;border-radius:10px;font-size:.92em;margin-top:8px;outline:none;transition:.15s}
.ex-open-input:focus{border-color:#007aff;box-shadow:0 0 0 3px rgba(0,122,255,.12)}
.ex-explain{margin-top:10px;background:#f0fdf4;border-left:3px solid #22c55e;border-radius:0 8px 8px 0;padding:10px 12px;font-size:.85em;color:#166534;display:none}
.ex-explain.show{display:block}
.ex-footer{position:fixed;bottom:0;left:0;right:0;z-index:11;background:rgba(255,255,255,.95);backdrop-filter:blur(12px);border-top:1px solid #e5e5ea;padding:12px 16px;display:flex;align-items:center;justify-content:space-between;gap:10px}
.ex-btn{padding:10px 22px;border-radius:12px;font-weight:600;font-size:.92em;border:none;cursor:pointer;transition:.15s;-webkit-tap-highlight-color:transparent}
.ex-btn-primary{background:#007aff;color:#fff}
.ex-btn-primary:hover{background:#005ecb}
.ex-btn-danger{background:#ef4444;color:#fff}
.ex-btn-danger:hover{background:#dc2626}
.ex-btn-ghost{background:transparent;color:#8e8e93;border:1px solid #e5e5ea}
.ex-progress-text{font-size:.82em;color:#8e8e93;font-weight:500}
.ex-result-box{text-align:center;padding:30px 20px;background:#fff;border-radius:16px;border:1px solid #e5e5ea;margin:20px 0}
.ex-result-box h2{font-size:1.4em;margin-bottom:8px}
.ex-result-score{font-size:3em;font-weight:800;margin:10px 0}
.ex-result-score.pass{color:#22c55e}
.ex-result-score.fail{color:#ef4444}
.ex-result-bar{height:12px;background:#e5e5ea;border-radius:6px;margin:16px auto;max-width:300px;overflow:hidden}
.ex-result-bar span{display:block;height:100%;border-radius:6px;transition:width .8s}
.ex-topic-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:8px;margin:16px 0}
.ex-topic-item{display:flex;justify-content:space-between;align-items:center;padding:8px 12px;background:#f8fafc;border-radius:8px;font-size:.85em}
.ex-topic-item .score{font-weight:700}
.ex-topic-item .score.good{color:#22c55e}
.ex-topic-item .score.bad{color:#ef4444}
</style>
<div class="ex-header">
  <button class="ex-btn ex-btn-ghost" onclick="ExamSim.quit()" style="padding:6px 12px;font-size:.85em">✕ Thoát</button>
  <div class="ex-title">${_exam.title}</div>
  <div class="ex-timer" id="exam-timer">60:00</div>
</div>
<div class="ex-progress"><span style="width:${(answeredCount/qs.length*100)}%"></span></div>
<div class="ex-body" id="exam-body"></div>
<div class="ex-footer">
  <div class="ex-progress-text" id="exam-progress">${answeredCount}/${qs.length} câu đã trả lời</div>
  <button class="ex-btn ex-btn-primary" onclick="ExamSim.submit()">📤 Nộp bài</button>
</div>`;

  updateTimerDisplay();
  renderQuestions();
}

function renderQuestions(){
  const body = document.getElementById('exam-body');
  if(!body) return;
  let html = '';
  let lastSit = -1;

  _exam.questions.forEach((q,i) => {
    if(q.sit !== undefined && q.sit !== lastSit && _exam.situations && _exam.situations[q.sit]){
      lastSit = q.sit;
      const sit = _exam.situations[q.sit];
      html += `<div class="ex-sit">📋 <strong>Situation (Câu ${sit.range}):</strong> ${sit.text}</div>`;
    }

    const answered = _answers[q.id] !== undefined;
    const marked = _marked.has(q.id);
    let cardClass = 'ex-card';
    if(answered) cardClass += ' answered';
    if(marked) cardClass += ' marked';
    if(_submitted){
      const correct = checkAnswer(q);
      cardClass += correct ? ' correct' : ' wrong';
    }

    html += `<div class="${cardClass}" id="q-${q.id}">`;
    html += `<div class="ex-q-head">`;
    html += `<div class="ex-q-num">${q.id}</div>`;
    html += `<div class="ex-q-text">${q.q}</div>`;
    if(!_submitted) html += `<span class="ex-q-mark ${marked?'active':''}" onclick="ExamSim.toggleMark(${q.id})" title="Đánh dấu">${marked?'⭐':'☆'}</span>`;
    html += `</div>`;

    if(q.type === 'open'){
      const val = _answers[q.id] || '';
      html += `<input class="ex-open-input" type="text" placeholder="Nhập đáp án..." value="${val}" onchange="ExamSim.answerOpen(${q.id},this.value)" ${_submitted?'disabled':''}/>`;
    } else {
      html += `<div class="ex-opts">`;
      q.opts.forEach((opt,oi) => {
        const sel = isSelected(q.id, oi);
        let optClass = 'ex-opt';
        if(sel) optClass += ' selected';
        if(_submitted){
          if(q.ans.includes(oi)) optClass += ' correct-opt';
          else if(sel) optClass += ' wrong-opt';
        }
        const indicator = (q.type === 'multi') ? 'checkbox' : 'radio';
        const clickFn = _submitted ? '' : `onclick="ExamSim.answer(${q.id},${oi},'${q.type}',${q.multi||1})"`;
        html += `<div class="${optClass}" ${clickFn}><div class="${indicator}"></div><span>${opt}</span></div>`;
      });
      html += `</div>`;
    }

    if(_submitted && q.explain){
      html += `<div class="ex-explain show">💡 ${q.explain}</div>`;
    }
    if(_submitted){
      const correct = checkAnswer(q);
      const correctAns = q.ans.map(a => q.type==='open' ? q.opts[a] : `${a+1}. ${q.opts[a]}`).join(', ');
      if(!correct){
        html += `<div class="ex-explain show" style="background:#fef2f2;border-color:#ef4444;color:#991b1b;">❌ Đáp án đúng: ${correctAns}</div>`;
      } else {
        html += `<div class="ex-explain show">✅ Chính xác!</div>`;
      }
    }
    html += `</div>`;
  });

  body.innerHTML = html;
}

function isSelected(qId, optIdx){
  const a = _answers[qId];
  if(a === undefined) return false;
  if(Array.isArray(a)) return a.includes(optIdx);
  return a === optIdx;
}

function answer(qId, optIdx, type, multi){
  if(_submitted) return;
  if(type === 'multi'){
    let curr = _answers[qId] || [];
    if(!Array.isArray(curr)) curr = [];
    const idx = curr.indexOf(optIdx);
    if(idx >= 0) curr.splice(idx,1);
    else { if(curr.length >= multi) curr.shift(); curr.push(optIdx); }
    _answers[qId] = curr;
  } else {
    _answers[qId] = optIdx;
  }
  updateProgress();
  renderQuestions();
}

function answerOpen(qId, val){
  if(_submitted) return;
  _answers[qId] = val.trim();
  updateProgress();
}

function toggleMark(qId){
  if(_marked.has(qId)) _marked.delete(qId);
  else _marked.add(qId);
  renderQuestions();
}

function updateProgress(){
  const total = _exam.questions.length;
  const answered = Object.keys(_answers).filter(k => {
    const v = _answers[k];
    if(Array.isArray(v)) return v.length > 0;
    if(typeof v === 'string') return v.length > 0;
    return v !== undefined;
  }).length;
  const bar = document.querySelector('#exam-overlay .ex-progress span');
  if(bar) bar.style.width = (answered/total*100)+'%';
  const txt = document.getElementById('exam-progress');
  if(txt) txt.textContent = `${answered}/${total} câu đã trả lời`;
}

function checkAnswer(q){
  const a = _answers[q.id];
  if(a === undefined) return false;
  if(q.type === 'open'){
    const norm = s => String(s).replace(/[^0-9,×x.]/g,'').replace(',','.').toLowerCase();
    return norm(a) === norm(q.opts[q.ans[0]]) || String(a).toLowerCase().includes(String(q.opts[q.ans[0]]).split(' ')[0].toLowerCase());
  }
  if(q.type === 'multi'){
    if(!Array.isArray(a)) return false;
    if(a.length !== q.ans.length) return false;
    return q.ans.every(x => a.includes(x));
  }
  return a === q.ans[0];
}

function submitExam(){
  if(_submitted) return;
  if(!_submitted && _remaining > 0){
    const answered = Object.keys(_answers).length;
    const total = _exam.questions.length;
    if(answered < total){
      if(!confirm(`Bạn mới trả lời ${answered}/${total} câu. Chắc chắn muốn nộp bài?`)) return;
    }
  }
  _submitted = true;
  clearInterval(_timer);

  // Calculate results
  let correct = 0;
  const topicStats = {};
  _exam.questions.forEach(q => {
    const isCorrect = checkAnswer(q);
    if(isCorrect) correct++;
    if(!topicStats[q.topic]) topicStats[q.topic] = {total:0,correct:0};
    topicStats[q.topic].total++;
    if(isCorrect) topicStats[q.topic].correct++;
  });

  const total = _exam.questions.length;
  const pct = Math.round(correct/total*100);
  const pass = pct >= 50;
  const timeUsed = _exam.time - _remaining;
  const minUsed = Math.floor(timeUsed/60);
  const secUsed = timeUsed%60;

  // Save to localStorage
  const history = JSON.parse(localStorage.getItem('exam_history')||'[]');
  history.push({date:new Date().toISOString(), exam:_exam.title, correct, total, pct, timeUsed});
  localStorage.setItem('exam_history', JSON.stringify(history));

  // Re-render with results
  const body = document.getElementById('exam-body');
  const footer = document.querySelector('#exam-overlay .ex-footer');
  
  // Insert result box at top
  const resultHTML = `
<div class="ex-result-box">
  <h2>${pass?'🎉 Bestanden!':'😔 Leider nicht bestanden'}</h2>
  <div class="ex-result-score ${pass?'pass':'fail'}">${pct}%</div>
  <p style="color:#64748b;font-size:.92em;">${correct} / ${total} câu đúng · Thời gian: ${minUsed}m ${secUsed}s</p>
  <div class="ex-result-bar"><span style="width:${pct}%;background:${pass?'#22c55e':'#ef4444'}"></span></div>
  <h3 style="margin-top:20px;font-size:1em;color:#1e293b;">📊 Phân tích theo chủ đề</h3>
  <div class="ex-topic-grid">
    ${Object.entries(topicStats).map(([t,s]) => {
      const tpct = Math.round(s.correct/s.total*100);
      return `<div class="ex-topic-item"><span>${t}</span><span class="score ${tpct>=50?'good':'bad'}">${s.correct}/${s.total}</span></div>`;
    }).join('')}
  </div>
</div>`;

  body.insertAdjacentHTML('afterbegin', resultHTML);
  renderQuestions();

  // Update footer
  if(footer){
    footer.innerHTML = `
<button class="ex-btn ex-btn-ghost" onclick="ExamSim.quit()">← Quay lại</button>
<button class="ex-btn ex-btn-primary" onclick="document.getElementById('exam-body').scrollTo({top:0,behavior:'smooth'});document.getElementById('exam-overlay').scrollTo({top:0,behavior:'smooth'})">🔝 Lên đầu trang</button>`;
  }
  document.getElementById('exam-overlay').scrollTo({top:0,behavior:'smooth'});
}

function quitExam(){
  if(!_submitted && _remaining > 0){
    if(!confirm('Bạn chưa nộp bài. Chắc chắn muốn thoát?')) return;
  }
  clearInterval(_timer);
  const overlay = document.getElementById('exam-overlay');
  if(overlay) overlay.remove();
  document.body.style.overflow = '';
  _exam = null; _answers = {}; _submitted = false;
}

/* ---------- PUBLIC API ---------- */
window.ExamSim = {
  start: startExam,
  answer: answer,
  answerOpen: answerOpen,
  toggleMark: toggleMark,
  submit: submitExam,
  quit: quitExam,
  EXAMS: EXAMS
};

})();
