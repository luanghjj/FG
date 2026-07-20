/**
 * STANDARD-FORM für alle Fächer
 * ==============================
 * Jedes Fach folgt demselben Aufbau. Neue Fächer = 1 Objekt nach diesem Schema.
 *
 * FAECHER.push({
 *   id: "bfk1",                 // URL: #/fach/bfk1
 *   code: "BfK-1",
 *   name: "Grundlagen Gastronomie",
 *   icon: "🍳",
 *   accent: "#2563eb",
 *   soft: "#eff6ff",
 *   teacher: "Fr. Schuster",
 *   examDate: "2026-07-20",     // optional ISO
 *   ready: true,
 *   desc: "Kurzbeschreibung",
 *   // Themen in Gruppen (Lernfelder / Kapitel)
 *   groups: [
 *     {
 *       id: "lf6",
 *       badge: "LF 6",
 *       title: "Speisen · Ernährung · Menüs",
 *       items: [
 *         {
 *           id: "gluten",                 // URL: #/fach/bfk1/theme/gluten
 *           icon: "🌾",
 *           name: "Getreide",
 *           desc: "Kurzzeile in der Liste",
 *           content: `<h2>...</h2>...`,  // HTML, Begriffe mit:
 *           // <span class="term" data-de="Wort" data-vi="nghĩa">Wort</span>
 *           pages: { folder:"2-Bfk1-lf6", from:35, to:44, prefix:"2-Bfk1-lf6" } // optional Scan
 *         }
 *       ]
 *     }
 *   ],
 *   // Quiz: theme muss item.id treffen
 *   quiz: [
 *     { theme:"gluten", cat:"Getreide", q:"...?", opts:["A","B","C","D"], a:0, ex:"..." }
 *   ]
 * });
 *
 * UI-Flow (gleich für jedes Fach):
 *   Hub  →  Thema (Inhalt + Vokabeln + Scan)  →  Quiz (Themen wählen, mischen)
 */
(function (w) {
  "use strict";

  /** @type {Array<Object>} */
  const FAECHER = [];

  function pageList(pages) {
    if (!pages) return [];
    const out = [];
    for (let i = pages.from; i <= pages.to; i++) {
      const n = String(i).padStart(2, "0");
      out.push("./" + pages.folder + "/" + pages.prefix + "-" + n + ".jpg");
    }
    return out;
  }

  function allThemes(fach) {
    const list = [];
    (fach.groups || []).forEach((g) => {
      (g.items || []).forEach((it) => {
        list.push({
          ...it,
          groupId: g.id,
          groupBadge: g.badge,
          groupTitle: g.title,
          fachId: fach.id,
        });
      });
    });
    return list;
  }

  function findFach(id) {
    return FAECHER.find((f) => f.id === id || f.code === id) || null;
  }

  function findTheme(fachId, themeId) {
    const fach = findFach(fachId);
    if (!fach) return null;
    return allThemes(fach).find((t) => t.id === themeId) || null;
  }

  function quizByThemes(fach, themeIds) {
    const set = new Set(themeIds || []);
    return (fach.quiz || []).filter((q) => set.has(q.theme));
  }

  function themeMeta(fach) {
    const meta = {};
    allThemes(fach).forEach((t) => {
      meta[t.id] = {
        icon: t.icon || "📘",
        name: t.name,
        lf: t.groupBadge || t.groupTitle || "",
      };
    });
    return meta;
  }

  /** Map legacy BfK-1 window data into the standard form */
  function ingestBfk1FromWindow() {
    const themes = w.BFK1_THEMES;
    if (!themes) return null;
    const quiz = w.BFK1_QUIZ || [];
    return {
      id: "bfk1",
      code: "BfK-1",
      name: "Grundlagen Gastronomie",
      icon: "🍳",
      accent: "#2563eb",
      soft: "#eff6ff",
      teacher: "Fr. Schuster (SLA)",
      examDate: "2026-07-20",
      ready: true,
      desc: "LF6 Speisen/Ernährung/Menüs · LF9 Zahlung/Recht",
      legacyRoutes: { hub: "#/bfk/1", quiz: "#/bfk/1/quiz", exam: "#/exam/bfk1" },
      groups: [
        {
          id: themes.lf6.id,
          badge: themes.lf6.badge || "LF 6",
          title: themes.lf6.title,
          items: (themes.lf6.items || []).map((it) => ({ ...it })),
        },
        {
          id: themes.lf9.id,
          badge: themes.lf9.badge || "LF 9",
          title: themes.lf9.title,
          items: (themes.lf9.items || []).map((it) => ({ ...it })),
        },
      ],
      quiz: quiz.slice(),
    };
  }

  /** Scaffold other Fächer – same form, content step by step */
  function scaffoldOthers() {
    return [
      {
        id: "bfk2",
        code: "BfK-2",
        name: "Fleisch & Produkte",
        icon: "🥩",
        accent: "#dc2626",
        soft: "#fef2f2",
        teacher: "IM (Imhof)",
        examDate: "2026-07-14",
        ready: true,
        desc: "Fleischteile · Küche · Quiz · Prüfungen",
        legacyRoutes: {
          hub: "#/bfk/2",
          themes: [
            { icon: "🥩", name: "Fleischteile", desc: "Rind · Schwein · Schaf", route: "#/bfk/2/fleisch" },
            { icon: "🍳", name: "Küche & Ernährung", desc: "Nährwert · Eier · BW", route: "#/bfk/2/kueche" },
            { icon: "📝", name: "Quiz", desc: "Multiple-Choice", route: "#/bfk/2/quiz" },
            { icon: "🗂️", name: "Prüfungen", desc: "Muster · Lösungen", route: "#/bfk/2/pruefungen" },
          ],
        },
        groups: [
          {
            id: "fleisch",
            badge: "Modul",
            title: "Fleisch & Küche",
            items: [
              {
                id: "fleischteile",
                icon: "🥩",
                name: "Fleischteile",
                desc: "Rind · Schwein · Schaf · Gerichte",
                route: "#/bfk/2/fleisch",
                content: `<h2>🥩 Fleischteile</h2>
<div class="hint">Rind · Schwein · Schaf/Lamm · Gerichte · Gewebe. Interaktive Karten im Modul.</div>
<p><button class="btn" type="button" onclick="go('#/bfk/2/fleisch')">Interaktives Modul öffnen →</button></p>
<h3 class="sub">1. Wichtige Rind-Teile</h3>
<table>
  <tr><th>Teil</th><th>Eigenschaft / Verwendung</th></tr>
  <tr><td><span class="term" data-de="Filet" data-vi="thăn nội">Filet</span></td><td>zartestes, bindegewebsärmstes Stück → Kurzbraten, Medaillons</td></tr>
  <tr><td><span class="term" data-de="Roastbeef" data-vi="thăn ngoại / roastbeef">Roastbeef</span> (Rücken)</td><td>Steaks, Rostbraten</td></tr>
  <tr><td><span class="term" data-de="Hesse" data-vi="bắp giò / ống chân">Hesse</span> (Beinscheibe)</td><td>viel Kollagen → Kraftbrühe, Schmoren, Osso-Buco-Art</td></tr>
</table>
<h3 class="sub">2. Gewebe & Garverfahren</h3>
<table>
  <tr><th>Gewebe</th><th>Beim Erhitzen</th><th>Garen</th></tr>
  <tr><td><span class="term" data-de="Muskelgewebe" data-vi="mô cơ">Muskelgewebe</span></td><td>Eiweiß gerinnt, Wasserverlust</td><td>Kurzbraten / Grillen (wenig Bindegewebe)</td></tr>
  <tr><td><span class="term" data-de="Bindegewebe" data-vi="mô liên kết">Bindegewebe</span> (Kollagen)</td><td>Kollagen → <span class="term" data-de="Gelatine" data-vi="gelatin">Gelatine</span>; Elastin bleibt zäh</td><td>Schmoren / Kochen (langsam & feucht)</td></tr>
  <tr><td><span class="term" data-de="Fettgewebe" data-vi="mô mỡ">Fettgewebe</span></td><td>schmilzt → saftig & aromatisch</td><td>Braten / Grillen</td></tr>
</table>
<div class="note">💡 Merksatz: <b>Viel Bindegewebe → langsam & feucht</b>. <b>Wenig Bindegewebe → schnell & heiß</b>.</div>
<h3 class="sub">3. Zusammensetzung Schlachtfleisch</h3>
<table>
  <tr><th>Stoff</th><th>ca.</th></tr>
  <tr><td>Wasser</td><td>70 %</td></tr>
  <tr><td><span class="term" data-de="Eiweiß" data-vi="đạm / protein">Eiweiß</span></td><td>20 %</td></tr>
  <tr><td>Fett</td><td>3–8 %</td></tr>
</table>
<div class="formula">4 wichtigste Schlacht-Säugetiere DE: Rind, Schwein, Schaf, Ziege</div>
<h3 class="sub">4. Gerichte (merken!)</h3>
<ul>
  <li><span class="term" data-de="Wiener Schnitzel" data-vi="schnitzel kiểu Wien">Wiener Schnitzel</span>: paniert Mehl–Ei–Semmelbrösel</li>
  <li><span class="term" data-de="Cordon bleu" data-vi="cordon bleu">Cordon bleu</span>: gefüllt mit gekochtem Schinken + Käse</li>
  <li><span class="term" data-de="Saltimbocca" data-vi="saltimbocca">Saltimbocca</span>: Parmaschinken + Salbei</li>
  <li><span class="term" data-de="Osso Buco" data-vi="osso buco">Osso Buco</span>: geschmorte Kalbshaxenscheiben</li>
  <li><span class="term" data-de="Vitello tonnato" data-vi="thịt bê sốt cá ngừ">Vitello tonnato</span>: kalt in Thunfischsoße</li>
  <li><span class="term" data-de="Szegediner Gulasch" data-vi="gulasch Szeged">Szegediner Gulasch</span>: Sauerkraut + saure Sahne</li>
  <li><span class="term" data-de="Irish Stew" data-vi="stew Ireland">Irish Stew</span>: Lamm + Zwiebeln + Kartoffel</li>
  <li><span class="term" data-de="Moussaka" data-vi="moussaka">Moussaka</span>: Lammhack + Aubergine + Tomate</li>
</ul>
<h3 class="sub">5. Schaf – Alter</h3>
<table>
  <tr><th>Name</th><th>Bedeutung</th></tr>
  <tr><td>Lamm</td><td>bis 1 Jahr</td></tr>
  <tr><td>Schaf</td><td>weiblich, ab 1 Jahr</td></tr>
  <tr><td>Bock</td><td>männlich, ab 1 Jahr</td></tr>
  <tr><td><span class="term" data-de="Hammel" data-vi="cừu thiến">Hammel</span></td><td>kastriert / verschnitten</td></tr>
</table>`,
              },
              {
                id: "kueche",
                icon: "🍳",
                name: "Küche & Ernährung",
                desc: "Nährwert · Eiercode · Wertigkeit",
                route: "#/bfk/2/kueche",
                content: `<h2>🍳 Küche & Ernährung</h2>
<div class="hint">Nährwert · Eiercode · biologische Wertigkeit</div>
<p><button class="btn" type="button" onclick="go('#/bfk/2/kueche')">Modul öffnen →</button></p>
<h3 class="sub">1. Brennwerte</h3>
<table>
  <tr><th>Nährstoff</th><th>pro 1 g</th></tr>
  <tr><td>Eiweiß / Kohlenhydrate</td><td><strong>17 kJ = 4 kcal</strong></td></tr>
  <tr><td>Fett</td><td><strong>37 kJ = 9 kcal</strong></td></tr>
</table>
<div class="formula">Energiewert (kJ) = (g EW × 17) + (g KH × 17) + (g Fett × 37)<br>1 kcal = 4,2 kJ</div>
<h3 class="sub">2. Eiercode</h3>
<p>Format: <b>Haltungsform – Land – Betriebsnr.</b> z.B. 2-DE-0812345</p>
<table>
  <tr><th>Ziffer</th><th>Haltung</th></tr>
  <tr><td><strong>0</strong></td><td><span class="term" data-de="Bio / Ökologisch" data-vi="hữu cơ">Bio / Ökologisch</span></td></tr>
  <tr><td><strong>1</strong></td><td><span class="term" data-de="Freilandhaltung" data-vi="nuôi thả vườn">Freilandhaltung</span></td></tr>
  <tr><td><strong>2</strong></td><td><span class="term" data-de="Bodenhaltung" data-vi="nuôi trên nền">Bodenhaltung</span></td></tr>
  <tr><td><strong>3</strong></td><td><span class="term" data-de="Kleingruppenhaltung" data-vi="nuôi nhóm nhỏ / lồng">Kleingruppenhaltung</span></td></tr>
</table>
<ul>
  <li>Lagerung ca. <b>5 °C</b> · MHD <b>28 Tage</b> nach Legedatum</li>
  <li>Nach MHD nur <b>durcherhitzt</b> · Salmonellen: 5 Min. kochen</li>
</ul>
<h3 class="sub">3. Biologische Wertigkeit (BW)</h3>
<div class="formula"><span class="term" data-de="Biologische Wertigkeit" data-vi="giá trị sinh học (protein)">Biologische Wertigkeit</span> = wie viel g Körpereiweiß aus 100 g Nahrungseiweiß</div>
<table>
  <tr><th>Lebensmittel</th><th>BW</th></tr>
  <tr><td><span class="term" data-de="Hühnerei" data-vi="trứng gà">Hühnerei</span> (Referenz)</td><td><strong>100</strong></td></tr>
  <tr><td>Kartoffeln</td><td>95</td></tr>
  <tr><td>Rindfleisch</td><td>87</td></tr>
  <tr><td>Kuhmilch</td><td>86</td></tr>
  <tr><td>Soja</td><td>84</td></tr>
</table>
<div class="note">💡 Ergänzungswert: Kombination hebt BW (z.B. Kartoffel + Ei, Getreide + Milch).</div>`,
              },
            ],
          },
        ],
        quiz: (w.BFK2_QUIZ || []).slice(), // themed bank from bfk2-quiz.js
      },
      {
        id: "deutsch",
        code: "D",
        name: "Deutsch",
        icon: "🇩🇪",
        accent: "#2563eb",
        soft: "#eff6ff",
        teacher: "Herrn Kling",
        examDate: "2026-07-16",
        ready: true,
        desc: "Visualisierung · Mindmap · Diagramme",
        external: "deutsch.html",
        groups: [
          {
            id: "ka",
            badge: "KA",
            title: "Klassenarbeit",
            items: [
              {
                id: "visualisierung",
                icon: "🧠",
                name: "Visualisierung",
                desc: "Mindmap, Diagramme, Text → Grafik",
                content: `<h2>🇩🇪 Visualisierung</h2>
                  <div class="hint">Text → Grafik · Mindmap · Diagrammtypen · KA-Training</div>
                  <p><a class="btn" href="deutsch.html">Deutsch-App öffnen (Theorie + Üben) →</a></p>
                  <h3 class="sub">1. Was ist Visualisierung?</h3>
                  <p><span class="term" data-de="Visualisierung" data-vi="trực quan hóa">Visualisierung</span> von Texten = Wesentliches als Grafik/Schaubild darstellen (nicht nur abschreiben).</p>
                  <h3 class="sub">2. Häufige Formen</h3>
                  <ul>
                    <li><span class="term" data-de="Mindmap" data-vi="sơ đồ tư duy">Mindmap</span> – Ideen/Struktur vom Zentrum aus</li>
                    <li><span class="term" data-de="Diagramm" data-vi="biểu đồ">Diagramm</span> – Kurve, Balken, Kreis, Fluss…</li>
                    <li><span class="term" data-de="Sachtext" data-vi="văn bản thông tin">Sachtext</span> → Kernaussagen markieren → passende Form wählen</li>
                  </ul>
                  <div class="note">💡 In der App: Theorie, Matching, Praxis &amp; 50+ Quizfragen zur KA.</div>
                  <h3 class="sub">3. Begriffe</h3>
                  <ul>
                    <li><span class="term" data-de="Mindmap" data-vi="sơ đồ tư duy">Mindmap</span></li>
                    <li><span class="term" data-de="Diagramm" data-vi="biểu đồ">Diagramm</span></li>
                    <li><span class="term" data-de="Visualisierung" data-vi="trực quan hóa">Visualisierung</span></li>
                    <li><span class="term" data-de="Sachtext" data-vi="văn bản thông tin">Sachtext</span></li>
                  </ul>`,
              },
            ],
          },
        ],
        quiz: (w.DEUTSCH_QUIZ || []).slice(),
      },
      {
        id: "englisch",
        code: "E",
        name: "Englisch",
        icon: "🇬🇧",
        accent: "#7c3aed",
        soft: "#f5f3ff",
        teacher: "HAL (Hoffmann)",
        examDate: "2026-07-21",
        ready: true,
        desc: "Telephoning · Complaints · Quantifiers · Tenses",
        groups: [
          {
            id: "business",
            badge: "Unit 1",
            title: "Business communication",
            items: [
              {
                id: "telephoning",
                icon: "📞",
                name: "Telephoning",
                desc: "Call types · phrases · polite language · role play",
                pages: { folder: "2-Englisch", from: 4, to: 7, prefix: "2-Englisch" },
                content: `
                  <h2>📞 Telephoning · Business situations</h2>
                  <div class="hint">Arbeitsblatt HAL · Problem / Information / Complaint calls</div>

                  <h3 class="sub">1. Call types</h3>
                  <table>
                    <tr><th>Type</th><th>Example</th></tr>
                    <tr><td><span class="term" data-de="Information call" data-vi="cuộc gọi hỏi thông tin">Information call</span></td><td>confirm an appointment · ask for opening hours</td></tr>
                    <tr><td><span class="term" data-de="Problem call" data-vi="cuộc gọi về sự cố">Problem call</span></td><td>delivery is late · product broken</td></tr>
                    <tr><td><span class="term" data-de="Complaint call" data-vi="cuộc gọi khiếu nại">Complaint call</span></td><td>angry client about wrong / broken product</td></tr>
                  </table>

                  <h3 class="sub">2. Useful phone phrases</h3>
                  <table>
                    <tr><th>Situation</th><th>Phrase</th></tr>
                    <tr><td>Answer</td><td><span class="term" data-de="… speaking" data-vi="… đây ạ / speaking">Good morning, Smart Logistics. Anna speaking.</span></td></tr>
                    <tr><td>Connect</td><td><span class="term" data-de="put you through" data-vi="chuyển máy / chuyển cuộc gọi">I'll put you through</span> to Mr Brown.</td></tr>
                    <tr><td>Wait</td><td><span class="term" data-de="hold on" data-vi="giữ máy / chờ một chút">Could you hold on, please?</span></td></tr>
                    <tr><td>Not available</td><td><span class="term" data-de="I'm afraid" data-vi="tôi e rằng…">I'm afraid</span> he is not in the office right now.</td></tr>
                    <tr><td>Message</td><td>Would you like to <span class="term" data-de="leave a message" data-vi="để lại lời nhắn">leave a message</span>?</td></tr>
                    <tr><td>Callback</td><td>I will <span class="term" data-de="call back" data-vi="gọi lại">call back</span> later.</td></tr>
                    <tr><td>Ask name</td><td>Certainly, may I ask who is calling?</td></tr>
                    <tr><td>Number</td><td>Can I have your phone number, please?</td></tr>
                  </table>

                  <h3 class="sub">3. Dialogue order (example)</h3>
                  <ol>
                    <li>Good morning, Tech Solutions. How can I help you?</li>
                    <li>This is Anna Schmidt speaking. I'd like to speak to Mr Miller, please.</li>
                    <li>I'll put you through.</li>
                  </ol>

                  <h3 class="sub">4. Polite language (rewrite)</h3>
                  <table>
                    <tr><th>Direct / rude</th><th>Polite</th></tr>
                    <tr><td>Give me your number.</td><td>Could you please give me your number?</td></tr>
                    <tr><td>What do you want?</td><td>How can I help you?</td></tr>
                    <tr><td>He's not here.</td><td>I'm afraid he is not available right now.</td></tr>
                    <tr><td>I can't hear you!</td><td>Could you please repeat that?</td></tr>
                  </table>

                  <h3 class="sub">5. Role play · Mr Müller / Mr Wong</h3>
                  <ul>
                    <li>Answer with <b>name + company</b></li>
                    <li>Ask for caller name + company · spell company name</li>
                    <li>Person not available → give e-mail · spell it</li>
                    <li>Take message: urgent delivery · promise to inform</li>
                    <li>End politely: Thank you for calling. Goodbye.</li>
                  </ul>
                  <div class="formula">Answer → Identify → Help / Transfer → Message → Close</div>
                  <div class="note">💡 On the phone you represent yourself <b>and</b> the company — polite language = professional image.</div>
                `
              },
              {
                id: "present-future-tenses",
                icon: "⏱️",
                name: "Present & future tenses",
                desc: "Simple present · progressive · going to",
                pages: { folder: "2-Englisch", from: 11, to: 13, prefix: "2-Englisch" },
                content: `
                  <h2>⏱️ Present &amp; future tenses</h2>
                  <div class="hint">Business communication · RAABE / Berufliche Schulen</div>

                  <h3 class="sub">1. Simple present</h3>
                  <ul>
                    <li>habits / repeated actions: <i>every day, always, often, never</i></li>
                    <li>facts in general · sequence of actions</li>
                    <li>fixed schedules: <i>The train leaves at 11.</i></li>
                  </ul>
                  <div class="formula"><span class="term" data-de="Simple present" data-vi="thì hiện tại đơn">Simple present</span>: infinitive · 3rd person +s · questions/negations with do/does</div>
                  <p>Example: I <b>go</b> to school every day. / What skills <b>do</b> you bring to this job?</p>

                  <h3 class="sub">2. Present progressive</h3>
                  <ul>
                    <li>happening <b>now</b>: <i>now, at the moment, currently, right now</i></li>
                    <li>fixed plan in the near future: <i>I am flying to New York on Sunday.</i></li>
                  </ul>
                  <div class="formula"><span class="term" data-de="Present progressive" data-vi="thì hiện tại tiếp diễn">Present progressive</span>: am/is/are + verb-ing</div>
                  <p>Example: I am currently <b>working</b> on my time management. / We are <b>interviewing</b> several candidates.</p>

                  <h3 class="sub">3. Going-to future</h3>
                  <ul>
                    <li>planned actions (may still change)</li>
                    <li>logical consequence you can already see</li>
                  </ul>
                  <div class="formula"><span class="term" data-de="going to-future" data-vi="tương lai gần (be going to)">going to-future</span>: am/is/are + going to + infinitive</div>
                  <p>Example: We are going to hire 5 new employees next year.</p>
                  <p>Signal words: <span class="term" data-de="currently" data-vi="hiện đang">currently</span>, <span class="term" data-de="at the moment" data-vi="ngay lúc này">at the moment</span>, every day, always, next year…</p>

                  <h3 class="sub">4. Quick contrast</h3>
                  <table>
                    <tr><th>Tense</th><th>Use</th><th>Signal</th></tr>
                    <tr><td>Simple present</td><td>regular / facts / timetable</td><td>every day, always, often</td></tr>
                    <tr><td>Present progressive</td><td>now / temporary / fixed near plan</td><td>now, currently, at the moment</td></tr>
                    <tr><td>going to</td><td>intention / visible future</td><td>going to, next year</td></tr>
                  </table>
                  <div class="note">💡 Job talk: skills &amp; routines → simple present · current training/project → progressive.</div>
                `
              }
            ]
          },
          {
            id: "service",
            badge: "Unit 2",
            title: "Restaurant service",
            items: [
              {
                id: "complaints-restaurant",
                icon: "🍽️",
                name: "Dealing with complaints",
                desc: "Phrases · dialogues · role play · AB S.10+14–15",
                pages: { folder: "2-Englisch", from: 10, to: 15, prefix: "2-Englisch" },
                content: `
                  <h2>🍽️ Dealing with complaints in the restaurant</h2>

                  <h3 class="sub">1. Complaint → professional response</h3>
                  <table>
                    <tr><th>Complaint</th><th>Response idea</th></tr>
                    <tr><td>The soup is cold.</td><td>Apologize · take it back · bring a fresh one</td></tr>
                    <tr><td>Waiting over 30 minutes</td><td>Understand frustration · check with kitchen immediately</td></tr>
                    <tr><td>Wrong dish</td><td>Get the correct dish right away</td></tr>
                    <tr><td>Meat undercooked</td><td>Offer to cook it more / new plate</td></tr>
                    <tr><td>Hair in food</td><td>Apologize · new plate · speak to chef</td></tr>
                    <tr><td><span class="term" data-de="Allergy" data-vi="dị ứng">Allergy</span> (nuts…)</td><td>Replace immediately · inform the chef — safety first</td></tr>
                  </table>

                  <h3 class="sub">2. Useful waiter phrases</h3>
                  <ul>
                    <li><span class="term" data-de="I'm terribly sorry about that" data-vi="tôi thực sự rất xin lỗi">I'm terribly sorry about that.</span></li>
                    <li>I <span class="term" data-de="apologize" data-vi="xin lỗi / xin lỗi chân thành">apologize</span> for the mistake / <span class="term" data-de="inconvenience" data-vi="sự bất tiện">inconvenience</span>.</li>
                    <li>I <span class="term" data-de="understand" data-vi="hiểu">understand</span> your concern. Let me <span class="term" data-de="fix" data-vi="xử lý / sửa">fix</span> this.</li>
                    <li>I'll take care of it <span class="term" data-de="immediately" data-vi="ngay lập tức">immediately</span>.</li>
                    <li>Would you like a replacement or something different?</li>
                    <li>I'll bring you a new one right away.</li>
                    <li>Thank you for pointing that out. / Thank you for your patience.</li>
                  </ul>

                  <h3 class="sub">3. Customer phrases</h3>
                  <ul>
                    <li>Excuse me, there seems to be a problem with my order.</li>
                    <li>I'm sorry, but this isn't what I ordered.</li>
                    <li>I think there's been a mistake.</li>
                    <li>Could you please check this for me?</li>
                    <li>I'd like to speak to the manager, please.</li>
                  </ul>

                  <h3 class="sub">4. Mini dialogues (patterns)</h3>
                  <div class="mini"><b>Cold pasta</b><br>
                    C: Excuse me, my pasta is cold.<br>
                    W: I'm terribly sorry about that.<br>
                    C: Could you please heat it up?<br>
                    W: Of course. I'll take it back to the kitchen immediately.</div>
                  <div class="mini"><b>Wrong bill</b><br>
                    C: I think there's a mistake on the bill. I didn't order this drink.<br>
                    W: I'm sorry. Let me check it. You're right — I'll correct the bill immediately.</div>
                  <div class="mini"><b>Allergy</b><br>
                    C: I'm allergic to nuts, but there are nuts in this dish.<br>
                    W: I'm terribly sorry. I'll replace the dish immediately and inform the chef.</div>

                  <div class="formula">Listen → Apologize → Solve (replace / fix / move) → Thank / follow-up</div>
                  <div class="note">💡 Never argue. Stay calm, polite, offer a clear solution.</div>
                `
              }
            ]
          },
          {
            id: "grammar",
            badge: "Unit 3",
            title: "Grammar focus",
            items: [
              {
                id: "quantifiers",
                icon: "🔢",
                name: "much · many · a little · a few",
                desc: "Countable vs uncountable",
                pages: { folder: "2-Englisch", from: 9, to: 9, prefix: "2-Englisch" },
                content: `
                  <h2>🔢 much · many · a little · a few</h2>

                  <table>
                    <tr><th>Word</th><th>With</th><th>Meaning</th><th>Example</th></tr>
                    <tr><td><span class="term" data-de="many" data-vi="nhiều (đếm được)">many</span></td><td>countable plural</td><td>a large number</td><td>many people / books / apples</td></tr>
                    <tr><td><span class="term" data-de="much" data-vi="nhiều (không đếm được)">much</span></td><td>uncountable</td><td>a large amount</td><td>much water / money / milk / sugar</td></tr>
                    <tr><td><span class="term" data-de="a few" data-vi="một vài (đếm được, tích cực)">a few</span></td><td>countable plural</td><td>some, positive</td><td>a few friends / books</td></tr>
                    <tr><td><span class="term" data-de="a little" data-vi="một ít (không đếm được)">a little</span></td><td>uncountable</td><td>some, positive</td><td>a little time / salt / advice</td></tr>
                  </table>

                  <h3 class="sub">Patterns</h3>
                  <ul>
                    <li>There isn't <b>much</b> water left.</li>
                    <li>She has <b>a few</b> close friends.</li>
                    <li>I only have <b>a little</b> time before my meeting.</li>
                    <li>There are <b>many</b> people waiting outside.</li>
                  </ul>
                  <div class="note">💡 <b>few/little</b> alone often sounds negative (almost none). <b>a few / a little</b> = some (enough).</div>
                  <div class="formula">countable → many / a few · uncountable → much / a little</div>
                `
              }
            ]
          }
        ],
        quiz: [
          { theme:"telephoning", cat:"Call type", q:"A client is angry about a broken product. What type of call is this?", opts:["Information call","Complaint / problem call","Private chat","Weather call"], a:1, ex:"Angry about a product = complaint / problem call." },
          { theme:"telephoning", cat:"Phrases", q:"Which phrase connects the caller to another person?", opts:["Hold on only","I'll put you through","Leave a message only","Call back never"], a:1, ex:"put you through = verbinden / durchstellen." },
          { theme:"telephoning", cat:"Polite", q:"More polite version of „He's not here.“?", opts:["Go away","I'm afraid he is not available right now","What do you want?","Talk faster"], a:1, ex:"I'm afraid… softens bad news." },
          { theme:"telephoning", cat:"Phrases", q:"„Could you hold on, please?“ means …", opts:["Hang up now","Please wait a moment","Pay the bill","Spell your name"], a:1, ex:"hold on = am Apparat bleiben / warten." },
          { theme:"telephoning", cat:"Structure", q:"Best order for answering a business phone?", opts:["Only first name","Company + name + offer help","Only goodbye","Only e-mail"], a:1, ex:"e.g. Good morning, Tech Solutions. How can I help you?" },
          { theme:"telephoning", cat:"Message", q:"Person not available. Professional option?", opts:["Just hang up","Offer to leave a message / take number / give e-mail","Shout the name","Ignore the caller"], a:1, ex:"Message, callback or alternative contact." },
          { theme:"complaints-restaurant", cat:"Service", q:"Guest: „This isn't what I ordered.“ Best first step?", opts:["Argue","Apologize and fix / bring correct dish","Ignore","Laugh"], a:1, ex:"Apologize + solve immediately." },
          { theme:"complaints-restaurant", cat:"Phrases", q:"„I'm sorry for the inconvenience“ apologizes for …", opts:["The weather","The trouble / discomfort caused","The menu design only","The tip"], a:1, ex:"inconvenience = Unannehmlichkeit / Störung." },
          { theme:"complaints-restaurant", cat:"Allergy", q:"Guest is allergic to nuts but finds nuts in the dish. You should …", opts:["Say it's fine","Replace immediately and inform the chef","Only remove nuts at the table","Charge extra"], a:1, ex:"Allergy = safety. Replace + inform kitchen." },
          { theme:"complaints-restaurant", cat:"Phrases", q:"Guest wants the bill corrected. You say:", opts:["Pay or leave","I'm sorry. Let me check it and correct it immediately","No mistakes possible","Kitchen closed"], a:1, ex:"Check + correct calmly." },
          { theme:"complaints-restaurant", cat:"Flow", q:"Complaint handling formula?", opts:["Shout → Leave","Listen → Apologize → Solve → Thank","Cook → Ignore → Bill","Argue → Discount always"], a:1, ex:"Listen, apologize, offer solution, close politely." },
          { theme:"quantifiers", cat:"Grammar", q:"Which fits uncountable nouns like water / money?", opts:["many / a few","much / a little","many only","a few only"], a:1, ex:"Uncountable → much / a little." },
          { theme:"quantifiers", cat:"Grammar", q:"„She has ___ friends, but they are very close.“", opts:["much","a few","a little","muchs"], a:1, ex:"friends = countable → a few." },
          { theme:"quantifiers", cat:"Grammar", q:"There isn't ___ water left in the bottle.", opts:["many","much","a few","friends"], a:1, ex:"water uncountable → much." },
          { theme:"quantifiers", cat:"Grammar", q:"„a little advice“ is correct because advice is …", opts:["countable plural","uncountable","a person","always wrong"], a:1, ex:"advice = uncountable → a little." },
          { theme:"present-future-tenses", cat:"Tenses", q:"Signal words every day / always / often → which tense?", opts:["Present progressive","Simple present","only going to","Past perfect only"], a:1, ex:"Habits → simple present." },
          { theme:"present-future-tenses", cat:"Tenses", q:"„I am currently working on my time management.“ → tense?", opts:["Simple present","Present progressive","Past simple","Future perfect"], a:1, ex:"currently + be + -ing." },
          { theme:"present-future-tenses", cat:"Tenses", q:"Form of going-to future?", opts:["did + verb","am/is/are + going to + infinitive","have + -ing","will + -ed"], a:1, ex:"be + going to + infinitive." },
          { theme:"present-future-tenses", cat:"Tenses", q:"Fixed timetable: „The train ___ at 11.“", opts:["is leaving always wrong","leaves (simple present)","leaved","going leave"], a:1, ex:"Schedules often use simple present." },
          {
            type: "fill",
            theme: "telephoning",
            cat: "Phrases",
            q: "Complete: I'll ___ you through to Mr Brown.",
            answers: ["put", "put you through"],
            answer: "put",
            ex: "put you through = verbinden / durchstellen."
          },
          {
            type: "fill",
            theme: "quantifiers",
            cat: "Grammar",
            q: "Countable plural → many / ___ ; uncountable → much / a little.",
            answers: ["a few", "afew"],
            answer: "a few",
            ex: "a few = ein paar (zählbar)."
          },
          {
            type: "fill",
            theme: "complaints-restaurant",
            cat: "Service",
            q: "Complaint steps in English: Listen → ___ → Solve → Thank",
            answers: ["apologize", "apologise", "say sorry", "apology"],
            answer: "Apologize",
            ex: "Always apologize before/while solving."
          }
        ]
      },
      {
        id: "gk",
        code: "GK",
        name: "Gemeinschaftskunde",
        icon: "🏛️",
        accent: "#16a34a",
        soft: "#f0fdf4",
        teacher: "BS (Buß-Schroeder)",
        examDate: "2026-07-22",
        ready: true,
        desc: "Partizipation · Demokratie GG · Gewaltenteilung · Karikatur",
        groups: [
          {
            id: "partizipation-block",
            badge: "KA",
            title: "Politische Partizipation",
            items: [
              {
                id: "partizipation",
                icon: "🗳️",
                name: "Partizipation & direkte Demokratie",
                desc: "Formen · digital · Volksinitiative/Begehren/Entscheid",
                pages: { folder: "2-GK", from: 2, to: 5, prefix: "2-GK" },
                content: `
                  <h2>🗳️ Partizipation &amp; direkte Demokratie</h2>
                  <div class="hint">KA 22.07.26 · Möglichkeiten der Partizipation</div>

                  <h3 class="sub">1. Was ist politische Partizipation?</h3>
                  <p><span class="term" data-de="Partizipation" data-vi="sự tham gia / tham chính">Partizipation</span> =
                  <span class="term" data-de="Teilhabe" data-vi="sự tham dự / tham gia">Teilhabe</span>
                  der <span class="term" data-de="Bürgerinnen und Bürger" data-vi="công dân (nam và nữ)">Bürgerinnen und Bürger</span>
                  am politischen
                  <span class="term" data-de="Willensbildungsprozess" data-vi="quá trình hình thành ý chí chính trị">Willensbildungsprozess</span>
                  und <span class="term" data-de="Entscheidungsprozess" data-vi="quá trình ra quyết định">Entscheidungsprozess</span>.</p>

                  <h3 class="sub">2. Traditionelle Formen</h3>
                  <table>
                    <tr><th>Form</th><th>Kurz</th></tr>
                    <tr><td><span class="term" data-de="Wahlen" data-vi="bầu cử">Wahlen</span></td><td>wichtigste <span class="term" data-de="demokratische Kontrolle" data-vi="sự kiểm soát dân chủ">demokratische Kontrolle</span>;
                    <span class="term" data-de="Macht auf Zeit" data-vi="quyền lực có thời hạn">Macht auf Zeit</span> an
                    <span class="term" data-de="Vertreter" data-vi="đại diện">Vertreter</span></td></tr>
                    <tr><td><span class="term" data-de="Partei" data-vi="đảng">Partei</span></td><td><span class="term" data-de="Mitwirkung" data-vi="sự tham gia / đồng hành">Mitwirkung</span> über Parteiarbeit</td></tr>
                    <tr><td><span class="term" data-de="Demonstration" data-vi="biểu tình">Demonstration</span></td><td>
                    <span class="term" data-de="Kundgebung" data-vi="buổi mít tinh / biểu dương">Kundgebung</span>, Marsch,
                    <span class="term" data-de="Mahnwache" data-vi="canh thức / tuần hành im lặng">Mahnwache</span>,
                    <span class="term" data-de="Flashmob" data-vi="flashmob (tụ tập nhanh)">Flashmob</span>… oft via
                    <span class="term" data-de="soziale Medien" data-vi="mạng xã hội">soziale Medien</span></td></tr>
                    <tr><td><span class="term" data-de="Leserbrief" data-vi="thư bạn đọc">Leserbrief</span></td><td>Meinung in
                    <span class="term" data-de="Medien" data-vi="truyền thông">Medien</span></td></tr>
                    <tr><td><span class="term" data-de="Bürgerentscheid" data-vi="trưng cầu dân ý cấp địa phương">Bürgerentscheid</span> /
                    <span class="term" data-de="Volksentscheid" data-vi="trưng cầu / quyết định của dân">Volksentscheid</span></td>
                    <td><span class="term" data-de="direkte Abstimmung" data-vi="bỏ phiếu trực tiếp">direkte Abstimmung</span> über
                    <span class="term" data-de="Sachfragen" data-vi="vấn đề nội dung / vấn đề cụ thể">Sachfragen</span>
                    (<span class="term" data-de="Kommune" data-vi="cấp địa phương / xã-thị">Kommune</span>/
                    <span class="term" data-de="Land" data-vi="bang">Land</span>; nicht
                    <span class="term" data-de="Bund" data-vi="liên bang">Bund</span> in DE)</td></tr>
                    <tr><td><span class="term" data-de="Bürgerinitiative" data-vi="sáng kiến công dân">Bürgerinitiative</span></td>
                    <td><span class="term" data-de="Zusammenschluss" data-vi="sự liên kết / liên minh">Zusammenschluss</span> zu einem Thema,
                    <span class="term" data-de="parteiunabhängig" data-vi="độc lập với đảng">parteiunabhängig</span></td></tr>
                    <tr><td><span class="term" data-de="Bürgerforum" data-vi="diễn đàn công dân">Bürgerforum</span></td>
                    <td>Diskussion; Auftrag oft von
                    <span class="term" data-de="Institutionen" data-vi="các thể chế / cơ quan">Institutionen</span>/Parteien/
                    <span class="term" data-de="Verbände" data-vi="hiệp hội / liên đoàn">Verbänden</span></td></tr>
                    <tr><td><span class="term" data-de="Verein" data-vi="hội / hiệp hội">Verein</span></td>
                    <td><span class="term" data-de="Interessen" data-vi="lợi ích / quan tâm">Interessen</span> bündeln</td></tr>
                  </table>

                  <h3 class="sub">3. Digitale Partizipation</h3>
                  <p>Beispiele: <span class="term" data-de="Internetforum" data-vi="diễn đàn internet">Internetforum</span>,
                  <span class="term" data-de="Online-Petition" data-vi="kiến nghị trực tuyến">Online-Petition</span>,
                  <span class="term" data-de="E-Mail" data-vi="email">E-Mail</span>,
                  <span class="term" data-de="Blog" data-vi="blog">Blog</span>,
                  <span class="term" data-de="Podcast" data-vi="podcast">Podcast</span>.</p>
                  <table>
                    <tr><th>Pro digital</th><th>Kontra digital</th></tr>
                    <tr><td>leichter, <span class="term" data-de="weltweiter Zugang" data-vi="tiếp cận toàn cầu">weltweiter Zugang</span></td>
                    <td><span class="term" data-de="Anonymität" data-vi="tính ẩn danh">Anonymität</span> →
                    <span class="term" data-de="unqualifizierte Beiträge" data-vi="bài viết kém chất lượng">unqualifizierte Beiträge</span></td></tr>
                    <tr><td>direktere <span class="term" data-de="Kommunikation" data-vi="giao tiếp">Kommunikation</span>
                    <span class="term" data-de="Sender" data-vi="người gửi">Sender</span>↔
                    <span class="term" data-de="Empfänger" data-vi="người nhận">Empfänger</span></td>
                    <td><span class="term" data-de="Informationsflut" data-vi="lũ thông tin">Informationsflut</span> verdeckt Wichtiges</td></tr>
                    <tr><td><span class="term" data-de="Interaktivität" data-vi="tính tương tác">Interaktivität</span></td>
                    <td>unübersichtlich, schwer zu filtern</td></tr>
                  </table>

                  <h3 class="sub">4. Direkte Demokratie – Definition</h3>
                  <p><span class="term" data-de="Direkte Demokratie" data-vi="dân chủ trực tiếp">Direkte (plebiszitäre) Demokratie</span>
                  / <span class="term" data-de="plebiszitäre Demokratie" data-vi="dân chủ trưng cầu / dân chủ trực tiếp">plebiszitäre Demokratie</span>:
                  politische Entscheidungen möglichst
                  <span class="term" data-de="unverfälscht" data-vi="không bị bóp méo">unverfälscht</span> durch das
                  <span class="term" data-de="Volk" data-vi="nhân dân">Volk</span>;
                  <span class="term" data-de="Behörde" data-vi="cơ quan hành chính">Behörde</span> setzt um.
                  Ideal: <span class="term" data-de="Regierte" data-vi="người bị cai trị / công dân">Regierte</span> =
                  <span class="term" data-de="Regierende" data-vi="người cai trị">Regierende</span> in
                  <span class="term" data-de="Abstimmungen" data-vi="các cuộc bỏ phiếu">Abstimmungen</span>.</p>
                  <div class="note">In DE: Volksentscheide v. a.
                  <span class="term" data-de="kommunal" data-vi="cấp địa phương">kommunal</span>/
                  <span class="term" data-de="landesweit" data-vi="toàn bang">landesweit</span>; auf
                  <span class="term" data-de="Bundesebene" data-vi="cấp liên bang">Bundesebene</span> nicht wie in der
                  <span class="term" data-de="Schweiz" data-vi="Thụy Sĩ">Schweiz</span>.</div>

                  <h3 class="sub">5. Weg einer Volksabstimmung (Modell)</h3>
                  <div class="formula">
                    <span class="term" data-de="Volksinitiative" data-vi="sáng kiến dân sự">Volksinitiative</span>
                    (z. B. 100.000 Unterschriften) →
                    <span class="term" data-de="Volksbegehren" data-vi="thỉnh nguyện / yêu cầu trưng cầu">Volksbegehren</span>
                    (z. B. 1 Mio. Unterschriften) →
                    <span class="term" data-de="Volksentscheid" data-vi="trưng cầu dân ý">Volksentscheid</span>
                    (Mehrheit entscheidet)
                  </div>
                  <ul>
                    <li>Bürger erarbeiten
                    <span class="term" data-de="Gesetzesentwurf" data-vi="dự thảo luật">Gesetzesentwurf</span></li>
                    <li><span class="term" data-de="Parlament" data-vi="quốc hội / nghị viện">Parlament</span> behandelt
                    <span class="term" data-de="Vorschlag" data-vi="đề xuất">Vorschlag</span>
                    (ggf. <span class="term" data-de="Alternativvorschlag" data-vi="đề xuất thay thế">Alternativvorschlag</span>)</li>
                    <li><span class="term" data-de="Abstimmungsbuch" data-vi="sổ / tài liệu bỏ phiếu">Abstimmungsbuch</span> / Info an
                    <span class="term" data-de="Haushalte" data-vi="các hộ gia đình">Haushalte</span> →
                    <span class="term" data-de="Abstimmung" data-vi="cuộc bỏ phiếu">Abstimmung</span></li>
                  </ul>

                  <h3 class="sub">6. Schweiz vs. Deutschland (Zusatz)</h3>
                  <ul>
                    <li><span class="term" data-de="Referendum" data-vi="trưng cầu / trưng cầu dân ý">Referendum</span> ≈
                    <span class="term" data-de="Notbremse" data-vi="phanh khẩn cấp">Notbremse</span> gegen ein Gesetz</li>
                    <li><span class="term" data-de="Initiative" data-vi="sáng kiến">Initiative</span> ≈
                    <span class="term" data-de="Gaspedal" data-vi="bàn đạp ga">Gaspedal</span>: Thema auf die
                    <span class="term" data-de="Agenda" data-vi="chương trình nghị sự">Agenda</span></li>
                    <li>Gefahren: <span class="term" data-de="Populismus" data-vi="chủ nghĩa dân túy">Populismus</span>,
                    komplexe Themen, <span class="term" data-de="Minderheitsrechte" data-vi="quyền của thiểu số">Minderheitsrechte</span></li>
                    <li>In DE: Prüfung auf
                    <span class="term" data-de="Verfassungsmäßigkeit" data-vi="tính hợp hiến">Verfassungsmäßigkeit</span> vor
                    <span class="term" data-de="Zulassung" data-vi="sự cho phép / chấp thuận">Zulassung</span>
                    (z. B. keine <span class="term" data-de="Todesstrafe" data-vi="án tử hình">Todesstrafe</span> per Volksentscheid)</li>
                  </ul>
                  <div class="note">💡 Wahlen bleiben Kern der
                  <span class="term" data-de="repräsentative Demokratie" data-vi="dân chủ đại diện">repräsentativen Demokratie</span>;
                  direkte Formen ergänzen.</div>
                  <div class="note">🃏 Mehr Vokabeln: Teilhabe · Willensbildung · Volksinitiative · Volksbegehren · Referendum · Populismus</div>
                `
              },
              {
                id: "karikatur-methode",
                icon: "🖼️",
                name: "Karikatur interpretieren",
                desc: "Einleitung · Beschreibung · Deutung · Fazit",
                pages: { folder: "2-GK", from: 6, to: 7, prefix: "2-GK" },
                content: `
                  <h2>🖼️ Arbeitsmethode · Karikatur</h2>
                  <div class="hint">Schema für KA: beschreiben + interpretieren</div>

                  <h3 class="sub">4 Schritte</h3>
                  <ol>
                    <li><span class="term" data-de="Einleitung" data-vi="mở bài">Einleitung</span> – Thema, Karikaturist, Jahr, Quelle</li>
                    <li><span class="term" data-de="Beschreibung" data-vi="mô tả">Beschreibung</span> – Was ist dargestellt? (ohne Deutung übertreiben)</li>
                    <li><span class="term" data-de="Interpretation" data-vi="phân tích / diễn giải">Interpretation</span> – Warum so gezeichnet? Symbole, Kritik, Aussage</li>
                    <li><span class="term" data-de="Fazit" data-vi="kết luận">Fazit</span> – eigene Meinung + sachliche Begründung</li>
                  </ol>
                  <p>Schlüsselbegriff: <span class="term" data-de="politische Beteiligung" data-vi="sự tham gia chính trị">politische Beteiligung</span> / <span class="term" data-de="Karikatur" data-vi="tranh biếm họa">Karikatur</span></p>

                  <h3 class="sub">Beispiel: „Beteiligung“ (Gerhard Mester, bpb 2023)</h3>
                  <ul>
                    <li><b>Thema:</b> <span class="term" data-de="Demokratie" data-vi="dân chủ">Demokratie</span> /
                    <span class="term" data-de="Beteiligung" data-vi="sự tham gia">Beteiligung</span> der Bürger</li>
                    <li><b><span class="term" data-de="Bildidee" data-vi="ý tưởng hình ảnh">Bildidee</span>:</b>
                    Kuh mit <span class="term" data-de="Aufschrift" data-vi="dòng chữ trên hình">Aufschrift</span> „Demokratie“;
                    Milch = Beteiligung</li>
                    <li><b><span class="term" data-de="Deutung" data-vi="cách diễn giải / giải nghĩa">Deutung</span>:</b>
                    fast leerer <span class="term" data-de="Eimer" data-vi="xô / thùng">Eimer</span> → nur wenige beteiligen sich
                    (<span class="term" data-de="Nichtwähler" data-vi="người không đi bầu">Nichtwähler</span>,
                    <span class="term" data-de="Desinteresse" data-vi="sự thờ ơ">Desinteresse</span>)</li>
                    <li><b><span class="term" data-de="Aussage" data-vi="thông điệp / luận điểm">Aussage</span>:</b>
                    Demokratie funktioniert nur, wenn Menschen
                    <span class="term" data-de="aktiv mitmachen" data-vi="tích cực tham gia">aktiv mitmachen</span></li>
                  </ul>
                  <p>Quelle oft: <span class="term" data-de="bpb" data-vi="Cục Giáo dục Chính trị Liên bang (Đức)">bpb</span>
                  · <span class="term" data-de="Karikaturist" data-vi="họa sĩ biếm họa">Karikaturist</span>: Gerhard Mester</p>
                  <div class="formula">Fazit-Satz: Meiner Meinung nach …, weil …. Ich denke, dass …, weil ….</div>
                  <div class="note">💡 Immer
                  <span class="term" data-de="Belege" data-vi="bằng chứng / dẫn chứng">Belege</span> aus dem Bild nennen
                  (<span class="term" data-de="Figuren" data-vi="nhân vật / hình tượng">Figuren</span>, Schrift,
                  <span class="term" data-de="Kontraste" data-vi="sự tương phản">Kontraste</span>) — nicht nur Allgemeinplätze.</div>
                `
              }
            ]
          },
          {
            id: "staat-gg",
            badge: "GG",
            title: "Demokratie nach dem Grundgesetz",
            items: [
              {
                id: "gewaltenteilung",
                icon: "⚖️",
                name: "Gewaltenteilung & Institutionen",
                desc: "WRV vs GG · horizontal · Kontrolle",
                pages: { folder: "2-GK", from: 8, to: 10, prefix: "2-GK" },
                content: `
                  <h2>⚖️ Gewaltenteilung &amp; Gewaltenverschränkung</h2>

                  <h3 class="sub">1. Drei Gewalten</h3>
                  <table>
                    <tr><th>Gewalt</th><th>Aufgabe</th><th>Organe (BRD heute)</th></tr>
                    <tr><td><span class="term" data-de="Legislative" data-vi="lập pháp">Legislative</span></td><td>gesetzgebende Gewalt</td><td>Bundestag, mitwirkend Bundesrat</td></tr>
                    <tr><td><span class="term" data-de="Exekutive" data-vi="hành pháp">Exekutive</span></td><td>ausführende Gewalt</td><td>Bundesregierung, Verwaltung; Bundespräsident (teilw.)</td></tr>
                    <tr><td><span class="term" data-de="Judikative" data-vi="tư pháp">Judikative</span></td><td>richterliche Gewalt</td><td>Gerichte, u. a. BVerfG</td></tr>
                  </table>
                  <p><span class="term" data-de="Gewaltenteilung" data-vi="phân quyền">Gewaltenteilung</span> teilt
                  <span class="term" data-de="Macht" data-vi="quyền lực">Macht</span> auf, damit sich die Gewalten
                  <b><span class="term" data-de="gegenseitige Kontrolle" data-vi="kiểm soát lẫn nhau">gegenseitig kontrollieren</span></b>
                  und Macht begrenzen (Lehre aus
                  <span class="term" data-de="Nationalsozialismus" data-vi="chủ nghĩa Quốc xã">NS</span>: keine
                  <span class="term" data-de="Machtkonzentration" data-vi="tập trung quyền lực">Machtkonzentration</span>).</p>
                  <p><span class="term" data-de="Gewaltenverschränkung" data-vi="đan xen quyền lực">Gewaltenverschränkung</span>:
                  die Gewalten greifen ineinander (z. B.
                  <span class="term" data-de="Bundestag" data-vi="Quốc hội Liên bang Đức">Bundestag</span> wählt
                  <span class="term" data-de="Bundeskanzler" data-vi="Thủ tướng Liên bang">Kanzler</span>; wählt
                  <span class="term" data-de="Richter" data-vi="thẩm phán">Richter</span>hälften).</p>

                  <h3 class="sub">2. Horizontal + vertikal</h3>
                  <ul>
                    <li><b><span class="term" data-de="horizontal" data-vi="theo chiều ngang">horizontal</span>:</b> Legislative · Exekutive · Judikative</li>
                    <li><b><span class="term" data-de="vertikal" data-vi="theo chiều dọc">vertikal</span>:</b>
                    <span class="term" data-de="Bund" data-vi="liên bang">Bund</span> ·
                    <span class="term" data-de="Länder" data-vi="các bang">Länder</span> ·
                    <span class="term" data-de="Kommunen" data-vi="các đơn vị địa phương">Kommunen</span></li>
                  </ul>
                  <div class="formula"><span class="term" data-de="Art. 20 Abs. 2 GG" data-vi="Điều 20 khoản 2 Luật cơ bản">Art. 20 Abs. 2 GG</span>:
                  Alle <span class="term" data-de="Staatsgewalt" data-vi="quyền lực nhà nước">Staatsgewalt</span> geht vom Volke aus —
                  Wahlen und Abstimmungen; durch besondere
                  <span class="term" data-de="Organe" data-vi="cơ quan / cơ cấu">Organe</span>.</div>

                  <h3 class="sub">3. Weimarer Reichsverfassung vs. Grundgesetz (Überblick)</h3>
                  <table>
                    <tr><th></th><th><span class="term" data-de="Weimarer Reichsverfassung" data-vi="Hiến pháp Weimar">WRV</span></th>
                    <th><span class="term" data-de="Grundgesetz" data-vi="Luật cơ bản / Hiến pháp CHLB Đức">GG</span></th></tr>
                    <tr><td><span class="term" data-de="Staatsoberhaupt" data-vi="nguyên thủ quốc gia">Staatsoberhaupt</span></td>
                    <td><span class="term" data-de="Reichspräsident" data-vi="Tổng thống Đế chế (Weimar)">Reichspräsident</span> stark
                    (u. a. Art. 48 <span class="term" data-de="Notverordnung" data-vi="sắc lệnh khẩn cấp">Notverordnung</span>)</td>
                    <td><span class="term" data-de="Bundespräsident" data-vi="Tổng thống Liên bang">Bundespräsident</span> eher
                    <span class="term" data-de="repräsentativ" data-vi="mang tính đại diện / nghi lễ">repräsentativ</span></td></tr>
                    <tr><td><span class="term" data-de="Regierung" data-vi="chính phủ">Regierung</span></td>
                    <td>leichter stürzbar (<span class="term" data-de="einfaches Misstrauensvotum" data-vi="bỏ phiếu bất tín nhiệm đơn thuần">einfaches Misstrauen</span>)</td>
                    <td><span class="term" data-de="konstruktives Misstrauensvotum" data-vi="bỏ phiếu bất tín nhiệm xây dựng">konstruktives Misstrauensvotum</span></td></tr>
                    <tr><td><span class="term" data-de="Wahlalter" data-vi="tuổi bầu cử">Wahlalter</span></td><td>ab 20 (Material)</td><td>ab 18</td></tr>
                    <tr><td><span class="term" data-de="Verfassungsgericht" data-vi="tòa án hiến pháp">Verfassungsgericht</span></td>
                    <td><span class="term" data-de="Reichsgericht" data-vi="Tòa án Đế chế">Reichsgericht</span> u. a.</td>
                    <td><span class="term" data-de="Bundesverfassungsgericht" data-vi="Tòa án Hiến pháp Liên bang">Bundesverfassungsgericht</span></td></tr>
                  </table>
                  <div class="note">💡 Merksatz: Gewaltenteilung sichert Demokratie — Kontrolle statt Machtkonzentration.</div>
                `
              },
              {
                id: "vertrauensfrage-misstrauen",
                icon: "📉",
                name: "Vertrauensfrage & Misstrauensvotum",
                desc: "Art. 67 / 68 GG · Ablauf",
                pages: { folder: "2-GK", from: 12, to: 13, prefix: "2-GK" },
                content: `
                  <h2>📉 Vertrauensfrage &amp; konstruktives Misstrauensvotum</h2>

                  <h3 class="sub">1. Konstruktives Misstrauensvotum (Art. 67 GG)</h3>
                  <p>Bundestag kann dem <span class="term" data-de="Bundeskanzler" data-vi="Thủ tướng Liên bang">Bundeskanzler</span> das Misstrauen nur aussprechen, indem er
                  <b>mit der Mehrheit seiner Mitglieder einen neuen Kanzler wählt</b>.</p>
                  <div class="formula"><span class="term" data-de="konstruktives Misstrauensvotum" data-vi="bỏ phiếu bất tín nhiệm xây dựng">konstruktives Misstrauensvotum</span> = Wahl eines neuen Kanzlers (Art. 67 GG)</div>
                  <ul>
                    <li>Ziel: Regierungsstabilität (Lehre aus Weimar)</li>
                    <li>Bundespräsident ernennt den neu Gewählten / entlässt den bisherigen</li>
                  </ul>

                  <h3 class="sub">2. <span class="term" data-de="Vertrauensfrage" data-vi="câu hỏi tín nhiệm">Vertrauensfrage</span> (Art. 68 GG)</h3>
                  <p>Der <b>Kanzler</b> stellt den
                  <span class="term" data-de="Antrag" data-vi="đơn / đề nghị">Antrag</span>, ihm das
                  <span class="term" data-de="Vertrauen" data-vi="sự tín nhiệm">Vertrauen</span> auszusprechen.</p>
                  <ul>
                    <li>Findet er <b>nicht</b> die
                    <span class="term" data-de="Mehrheit der Mitglieder" data-vi="đa số thành viên (tuyệt đối)">Mehrheit der Mitglieder</span>
                    → er kann den
                    <span class="term" data-de="Bundespräsident" data-vi="Tổng thống Liên bang">Bundespräsidenten</span>
                    <span class="term" data-de="ersuchen" data-vi="yêu cầu / thỉnh cầu">ersuchen</span>, den Bundestag
                    <span class="term" data-de="Auflösung des Bundestages" data-vi="giải tán Bundestag">aufzulösen</span></li>
                    <li><span class="term" data-de="Auflösung" data-vi="sự giải tán">Auflösung</span> binnen 21 Tagen möglich —
                    <b>außer</b> der Bundestag wählt in der
                    <span class="term" data-de="Frist" data-vi="thời hạn">Frist</span> einen neuen Kanzler</li>
                    <li>Alternative: Kanzler ersucht um eigene
                    <span class="term" data-de="Entlassung" data-vi="miễn nhiệm / sa thải">Entlassung</span></li>
                  </ul>

                  <h3 class="sub">3. Vergleich (Prüfungsfrage)</h3>
                  <table>
                    <tr><th></th><th>Vertrauensfrage</th><th>konstr. Misstrauensvotum</th></tr>
                    <tr><td>Wer startet?</td><td>Bundeskanzler</td>
                    <td>Bundestag / <span class="term" data-de="Opposition" data-vi="phe đối lập">Opposition</span></td></tr>
                    <tr><td>Kern</td><td>Vertrauen zum Kanzler?</td><td>neuen Kanzler wählen</td></tr>
                    <tr><td>Risiko Partei</td><td>eher auf Person Kanzler bezogen</td>
                    <td>Muss <span class="term" data-de="Mehrheitsalternative" data-vi="phương án đa số thay thế">Mehrheitsalternative</span> stehen</td></tr>
                  </table>
                  <p>Artikel: <span class="term" data-de="Art. 67 GG" data-vi="Điều 67 Luật cơ bản">Art. 67 GG</span> (Misstrauen) ·
                  <span class="term" data-de="Art. 68 GG" data-vi="Điều 68 Luật cơ bản">Art. 68 GG</span> (Vertrauensfrage)</p>
                  <div class="note">💡 Laut Material: Vertrauensfrage oft „weniger
                  <span class="term" data-de="nachteilig" data-vi="bất lợi">nachteilig</span>“ für die
                  <span class="term" data-de="Partei" data-vi="đảng">Partei</span>, weil Fokus auf dem Kanzler liegt — nicht automatisch auf der ganzen Partei.</div>
                `
              },
              {
                id: "medien-vierte-gewalt",
                icon: "📰",
                name: "Medien als vierte Gewalt",
                desc: "Informieren · kontrollieren",
                pages: { folder: "2-GK", from: 11, to: 11, prefix: "2-GK" },
                content: `
                  <h2>📰 Medien als „vierte Gewalt“</h2>
                  <p>Neben <span class="term" data-de="Legislative" data-vi="lập pháp">Legislative</span>,
                  <span class="term" data-de="Exekutive" data-vi="hành pháp">Exekutive</span>,
                  <span class="term" data-de="Judikative" data-vi="tư pháp">Judikative</span> gelten freie
                  <span class="term" data-de="Medien" data-vi="truyền thông">Medien</span> oft als
                  <span class="term" data-de="vierte Gewalt" data-vi="quyền lực thứ tư">vierte Gewalt</span>.</p>

                  <h3 class="sub">Warum?</h3>
                  <table>
                    <tr><th>Funktion</th><th>Beispiel</th></tr>
                    <tr><td><b><span class="term" data-de="Informieren" data-vi="thông tin / cung cấp tin">Informieren</span></b> die Bürger</td>
                    <td>TV/<span class="term" data-de="Zeitung" data-vi="báo">Zeitung</span> berichtet über
                    <span class="term" data-de="Bundestagswahl" data-vi="bầu cử Bundestag">Bundestagswahl</span>,
                    <span class="term" data-de="Gesetze" data-vi="luật">Gesetze</span>,
                    <span class="term" data-de="Debatten" data-vi="các cuộc tranh luận">Debatten</span></td></tr>
                    <tr><td><b><span class="term" data-de="Kontrollieren" data-vi="kiểm soát">Kontrollieren</span></b> Politik und Staat</td>
                    <td>Bericht über Fehler, <span class="term" data-de="Skandale" data-vi="bê bối">Skandale</span>,
                    <span class="term" data-de="Missstände" data-vi="tình trạng sai trái">Missstände</span></td></tr>
                    <tr><td><span class="term" data-de="Meinungsbildung" data-vi="hình thành dư luận / ý kiến">Meinungsbildung</span> /
                    <span class="term" data-de="Öffentlichkeit" data-vi="công chúng / không gian công">Öffentlichkeit</span></td>
                    <td>Diskussion, <span class="term" data-de="Kritik" data-vi="phê bình">Kritik</span>,
                    <span class="term" data-de="Vielfalt" data-vi="sự đa dạng">Vielfalt</span> der Positionen</td></tr>
                  </table>
                  <div class="note">💡 Medien ersetzen keine Staatsgewalt — sie üben öffentliche Kontrolle und Information aus
                  (<span class="term" data-de="Pressefreiheit" data-vi="tự do báo chí">Pressefreiheit</span>
                  <span class="term" data-de="Art. 5 GG" data-vi="Điều 5 Luật cơ bản">Art. 5 GG</span>).</div>
                `
              },
              {
                id: "demokratie-gg",
                icon: "📜",
                name: "Demokratie nach dem GG",
                desc: "Volkssouveränität · repräsentativ · Mehrheit · Menschenbild",
                pages: { folder: "2-GK", from: 14, to: 15, prefix: "2-GK" },
                content: `
                  <h2>📜 Demokratie nach dem Grundgesetz</h2>

                  <h3 class="sub">Zentrale Elemente</h3>
                  <table>
                    <tr><th>Begriff</th><th>Bedeutung</th><th>Bezug</th></tr>
                    <tr><td><span class="term" data-de="Volkssouveränität" data-vi="chủ quyền nhân dân">Volkssouveränität</span></td><td>Das Volk ist Inhaber der Staatsgewalt</td><td>Art. 20 Abs. 2 GG</td></tr>
                    <tr><td><span class="term" data-de="Repräsentative Demokratie" data-vi="dân chủ đại diện">Repräsentative Demokratie</span></td><td>Gewählte Abgeordnete üben Staatsgewalt aus</td><td>Art. 38 GG</td></tr>
                    <tr><td><span class="term" data-de="Mehrheitsprinzip" data-vi="nguyên tắc đa số">Mehrheitsprinzip</span></td><td>Die Mehrheit entscheidet</td><td>Art. 42 Abs. 2, 63 Abs. 2 GG</td></tr>
                    <tr><td><span class="term" data-de="Volksherrschaft" data-vi="chính thể dân chủ / quyền lực thuộc về nhân dân">Volksherrschaft</span></td><td>Herrschaft des Volkes</td><td>Demokratie-Idee</td></tr>
                  </table>

                  <h3 class="sub"><span class="term" data-de="Menschenbild" data-vi="quan niệm về con người">Menschenbild</span> im GG</h3>
                  <ul>
                    <li><span class="term" data-de="Menschenwürde" data-vi="nhân phẩm">Menschenwürde</span> ist
                    <span class="term" data-de="unantastbar" data-vi="bất khả xâm phạm">unantastbar</span>
                    (<span class="term" data-de="Art. 1 GG" data-vi="Điều 1 Luật cơ bản">Art. 1 GG</span></li>
                    <li>Recht auf
                    <span class="term" data-de="freie Entfaltung der Persönlichkeit" data-vi="tự do phát triển nhân cách">freie Entfaltung der Persönlichkeit</span>
                    <span class="term" data-de="Art. 2 GG" data-vi="Điều 2 Luật cơ bản">Art. 2 GG</span></li>
                    <li>aber: <span class="term" data-de="Rechte anderer" data-vi="quyền của người khác">Rechte anderer</span> dürfen nicht verletzt werden</li>
                  </ul>
                  <p>Weitere Begriffe:
                  <span class="term" data-de="Abgeordnete" data-vi="đại biểu quốc hội">Abgeordnete</span> ·
                  <span class="term" data-de="Staatsgewalt" data-vi="quyền lực nhà nước">Staatsgewalt</span> ·
                  <span class="term" data-de="Grundgesetz" data-vi="Luật cơ bản / Hiến pháp Đức">Grundgesetz</span></p>
                  <div class="formula">Volk besitzt Macht → wählt Vertreter → Mehrheit entscheidet · Würde schützt jeden Menschen</div>
                  <div class="note">💡 DE = vor allem repräsentative Demokratie; direkte Elemente ergänzen (v. a. Länder/Kommunen).</div>
                `
              },
              {
                id: "grundrechte",
                icon: "🛡️",
                name: "Grundrechte",
                desc: "Menschen- vs Bürgerrechte · Geltung für alle",
                pages: { folder: "2-GK", from: 16, to: 18, prefix: "2-GK" },
                content: `
                  <h2>🛡️ Grundrechte</h2>

                  <h3 class="sub">1. Menschenrechte vs. Bürgerrechte</h3>
                  <table>
                    <tr><th>Typ</th><th>Formulierung</th><th>Für wen?</th></tr>
                    <tr><td><span class="term" data-de="Menschenrechte" data-vi="nhân quyền">Menschenrechte</span> (M)</td><td>„Jeder…“, „Niemand…“, „Alle Menschen…“</td><td>alle Menschen</td></tr>
                    <tr><td><span class="term" data-de="Bürgerrechte" data-vi="quyền công dân">Bürgerrechte</span> (B)</td><td>„Alle Deutschen…“</td><td>deutsche Staatsangehörige</td></tr>
                  </table>

                  <h3 class="sub">2. Wichtige Artikel (Beispiele)</h3>
                  <table>
                    <tr><th>Art.</th><th>Inhalt</th></tr>
                    <tr><td>1</td><td><span class="term" data-de="Menschenwürde" data-vi="nhân phẩm">Menschenwürde</span>
                    <span class="term" data-de="unantastbar" data-vi="bất khả xâm phạm">unantastbar</span></td></tr>
                    <tr><td>2</td><td><span class="term" data-de="Persönliche Freiheitsrechte" data-vi="các quyền tự do cá nhân">Persönliche Freiheitsrechte</span> / Entfaltung</td></tr>
                    <tr><td>3</td><td><span class="term" data-de="Gleichheit vor dem Gesetz" data-vi="bình đẳng trước pháp luật">Gleichheit vor dem Gesetz</span></td></tr>
                    <tr><td>4</td><td><span class="term" data-de="Glaubens- und Gewissensfreiheit" data-vi="tự do tín ngưỡng và lương tâm">Glaubens- und Gewissensfreiheit</span></td></tr>
                    <tr><td>5</td><td><span class="term" data-de="Meinungsfreiheit" data-vi="tự do ngôn luận">Meinungsfreiheit</span>,
                    <span class="term" data-de="Pressefreiheit" data-vi="tự do báo chí">Pressefreiheit</span>,
                    Kunst-, Wissenschaftsfreiheit</td></tr>
                    <tr><td>8</td><td><span class="term" data-de="Versammlungsfreiheit" data-vi="tự do hội họp / tụ tập">Versammlungsfreiheit</span></td></tr>
                    <tr><td>9</td><td><span class="term" data-de="Vereinigungsfreiheit" data-vi="tự do lập hội">Vereinigungsfreiheit</span></td></tr>
                    <tr><td>10</td><td><span class="term" data-de="Brief-, Post- und Fernmeldegeheimnis" data-vi="bí mật thư tín, bưu chính và viễn thông">Brief-, Post- und Fernmeldegeheimnis</span></td></tr>
                    <tr><td>11</td><td><span class="term" data-de="Freizügigkeit" data-vi="tự do đi lại / cư trú">Freizügigkeit</span></td></tr>
                    <tr><td>12</td><td><span class="term" data-de="Berufsfreiheit" data-vi="tự do nghề nghiệp">Berufsfreiheit</span></td></tr>
                    <tr><td>13</td><td><span class="term" data-de="Unverletzlichkeit der Wohnung" data-vi="bất khả xâm phạm chỗ ở">Unverletzlichkeit der Wohnung</span></td></tr>
                    <tr><td>16</td><td><span class="term" data-de="Staatsangehörigkeit" data-vi="quốc tịch">Staatsangehörigkeit</span> /
                    <span class="term" data-de="Auslieferung" data-vi="dẫn độ">Auslieferung</span> (Ausschnitt Material)</td></tr>
                  </table>

                  <h3 class="sub">3. Karikatur-Aussage (Material S.17–18)</h3>
                  <p><span class="term" data-de="Grundrechte" data-vi="các quyền cơ bản">Grundrechte</span> gelten <b>für alle Menschen</b> —
                  <span class="term" data-de="unabhängig" data-vi="độc lập / không phụ thuộc">unabhängig</span> von
                  <span class="term" data-de="Meinung" data-vi="ý kiến">Meinung</span> oder
                  <span class="term" data-de="Verhalten" data-vi="hành vi">Verhalten</span>
                  (auch wenn jemand Demokratie
                  <span class="term" data-de="ablehnen" data-vi="từ chối / bác bỏ">ablehnt</span>).
                  Der Staat schützt Würde und Rechte
                  <span class="term" data-de="universell" data-vi="phổ quát">universell</span> im Rahmen des GG.</p>
                  <div class="note">💡 Art. 1 = Fundament. Grundrechte binden
                  <span class="term" data-de="Gesetzgebung" data-vi="lập pháp">Gesetzgebung</span>,
                  <span class="term" data-de="vollziehende Gewalt" data-vi="quyền lực hành pháp">vollziehende Gewalt</span> und
                  <span class="term" data-de="Rechtsprechung" data-vi="tư pháp / xét xử">Rechtsprechung</span>
                  (<span class="term" data-de="Art. 1 Abs. 3 GG" data-vi="Điều 1 khoản 3 Luật cơ bản">Art. 1 Abs. 3 GG</span>).</div>
                `
              }
            ]
          }
        ],
        quiz: [
          { theme:"partizipation", cat:"Partizipation", q:"Was bedeutet politische Partizipation?", opts:["Nur Steuern zahlen","Teilhabe am politischen Willensbildungs- und Entscheidungsprozess","Nur Urlaub im Ausland","Nur Sport im Verein"], a:1, ex:"Mitmachen in Politik und Öffentlichkeit." },
          { theme:"partizipation", cat:"Formen", q:"Welche Form gehört zur digitalen Partizipation?", opts:["Nur Schweigemarsch offline","Online-Petition / Forum / Blog","Nur geheime Absprachen","Nur Noten in der Schule"], a:1, ex:"Internetforum, Online-Petition, Blog, Podcast…" },
          { theme:"partizipation", cat:"Pro/Kontra", q:"Ein Nachteil digitaler Partizipation ist …", opts:["weltweiter Zugang","Anonymität kann zu unqualifizierten Beiträgen führen","Interaktivität","leichte Erreichbarkeit"], a:1, ex:"Anonymität + Informationsflut als Kontra." },
          { theme:"partizipation", cat:"Direkte Demokratie", q:"Richtige Reihenfolge im Modell Volksabstimmung?", opts:["Entscheid → Initiative → Begehren","Volksinitiative → Volksbegehren → Volksentscheid","Nur Bundestag ohne Volk","Nur Bundespräsident"], a:1, ex:"Initiative → Begehren → Entscheid." },
          { theme:"partizipation", cat:"Wahlen", q:"Warum sind Wahlen zentral für Demokratie?", opts:["Weil es keine Parteien gibt","Volk überträgt Macht auf Zeit an Vertreter / Kontrolle","Weil Medien verboten sind","Weil es keine Gesetze gibt"], a:1, ex:"Wichtigste Form demokratischer Kontrolle." },
          { theme:"partizipation", cat:"DE", q:"Volksentscheide in Deutschland gibt es vor allem …", opts:["nur auf Bundesebene wie Schweiz","auf Kommunal- und Landesebene","gar nicht","nur im Fußballstadion"], a:1, ex:"Nicht analog Schweiz auf Bundesebene." },
          { theme:"karikatur-methode", cat:"Methode", q:"Richtige Reihenfolge der Karikatur-Methode?", opts:["Nur Fazit","Einleitung → Beschreibung → Interpretation → Fazit","Nur Bild malen","Nur Jahreszahl"], a:1, ex:"4 Schritte wie im Arbeitsblatt." },
          { theme:"karikatur-methode", cat:"Deutung", q:"In der Karikatur „Beteiligung“ (Mester) steht die (fast leere) Milch oft für …", opts:["Steuererhöhung","geringe politische Beteiligung der Bürger","Autobahnen","Fußballergebnis"], a:1, ex:"Demokratie braucht aktive Beteiligung." },
          { theme:"gewaltenteilung", cat:"Gewalten", q:"Legislative, Exekutive, Judikative bedeuten …", opts:["Nur Polizei","gesetzgebend, ausführend, richterlich","Nur Medien","Nur Parteien"], a:1, ex:"Drei klassische Staatsgewalten." },
          { theme:"gewaltenteilung", cat:"Ziel", q:"Gewaltenteilung soll vor allem …", opts:["Machtkonzentration verhindern und Kontrolle sichern","Wahlen abschaffen","Grundrechte streichen","Nur den Präsidenten stärken"], a:1, ex:"Gegenseitige Kontrolle der Gewalten." },
          { theme:"gewaltenteilung", cat:"GG", q:"Gewaltenverschränkung bedeutet …", opts:["Gewalten haben null Kontakt","Gewalten beeinflussen sich / greifen ineinander","Nur eine Gewalt existiert","Nur Kommunen regieren"], a:1, ex:"Ineinandergreifen, z. B. Wahl des Kanzlers durch Bundestag." },
          { theme:"vertrauensfrage-misstrauen", cat:"Art. 67", q:"Konstruktives Misstrauensvotum heißt: Der Bundestag …", opts:["schreit nur","wählt mit Mehrheit einen neuen Kanzler","löscht das GG","ernennt nur Richter"], a:1, ex:"Art. 67 GG — nur mit Nachfolger." },
          { theme:"vertrauensfrage-misstrauen", cat:"Art. 68", q:"Wer stellt die Vertrauensfrage?", opts:["Nur Opposition immer","Der Bundeskanzler","Nur der Bundesrat","Nur Medien"], a:1, ex:"Art. 68 GG — Antrag des Kanzlers." },
          { theme:"medien-vierte-gewalt", cat:"Medien", q:"Medien gelten als vierte Gewalt, weil sie …", opts:["Gesetze beschließen","informieren und Politik/Staat kontrollieren","Steuern erheben","Richter ersetzen"], a:1, ex:"Information + öffentliche Kontrolle." },
          { theme:"demokratie-gg", cat:"GG", q:"Volkssouveränität bedeutet …", opts:["König hat alle Macht","Das Volk ist Inhaber der Staatsgewalt","Nur Beamte wählen","Keine Wahlen"], a:1, ex:"Art. 20 Abs. 2 GG." },
          { theme:"demokratie-gg", cat:"GG", q:"Repräsentative Demokratie heißt vor allem …", opts:["Jeder beschließt jedes Gesetz täglich","Gewählte Abgeordnete üben die Staatsgewalt aus","Keine Parteien","Nur Volksentscheide auf Bundesebene"], a:1, ex:"Vertreter des Volkes im Parlament." },
          { theme:"demokratie-gg", cat:"Art. 1", q:"Art. 1 GG schützt vor allem …", opts:["Autobahnen","die Menschenwürde","Fußball","Zölle"], a:1, ex:"Die Würde des Menschen ist unantastbar." },
          { theme:"grundrechte", cat:"Typen", q:"„Alle Deutschen …“ formuliert typischerweise …", opts:["Menschenrechte für alle","Bürgerrechte","Nur EU-Recht","Keine Rechte"], a:1, ex:"Bürgerrechte an deutsche Staatsangehörigkeit gekoppelt." },
          { theme:"grundrechte", cat:"Typen", q:"„Jeder / Alle Menschen / Niemand …“ deutet auf …", opts:["nur Beamte","Menschenrechte","nur Firmen","nur Parteien"], a:1, ex:"Geltung für alle Menschen." },
          { theme:"grundrechte", cat:"Aussage", q:"Gelten Grundrechte auch für Menschen, die Demokratie ablehnen?", opts:["Nein, nie","Ja — Grundrechte gelten für alle Menschen","Nur am Wochenende","Nur mit Parteibuch"], a:1, ex:"Karikatur/Material: Geltung unabhängig von Meinung/Verhalten." },
          {
            type: "fill",
            theme: "partizipation",
            cat: "Schema",
            q: "Reihenfolge: Volksinitiative → ________ → Volksentscheid",
            answers: ["volksbegehren", "das volksbegehren"],
            answer: "Volksbegehren",
            ex: "Initiative → Begehren → Entscheid."
          },
          {
            type: "fill",
            theme: "gewaltenteilung",
            cat: "Gewalten",
            q: "Die drei Gewalten: Legislative, Exekutive und ________",
            answers: ["judikative", "die judikative", "richterliche gewalt", "judikative (richterliche gewalt)"],
            answer: "Judikative",
            ex: "richterliche Gewalt."
          },
          {
            type: "fill",
            theme: "vertrauensfrage-misstrauen",
            cat: "Art. 67",
            q: "Art. 67 GG: konstruktives ________",
            answers: ["misstrauensvotum", "konstruktives misstrauensvotum"],
            answer: "Misstrauensvotum",
            ex: "Nur mit Wahl eines neuen Kanzlers."
          },
          {
            type: "fill",
            theme: "demokratie-gg",
            cat: "Art. 1",
            q: "Art. 1 GG: Die Würde des Menschen ist ________.",
            answers: ["unantastbar", "unantastbar.", "unantasbar"],
            answer: "unantastbar",
            ex: "Kern des Menschenbildes im GG."
          }
        ]
      },
      {
        id: "wiko",
        code: "WiKO",
        name: "Wirtschaftskompetenz",
        icon: "📊",
        accent: "#0ea5e9",
        soft: "#e0f2fe",
        teacher: "RM (Remsing)",
        examDate: null,
        ready: false,
        desc: "Kaufvertrag · Mängel · Rechnung",
        groups: [
          {
            id: "vertrag",
            badge: "WiKO",
            title: "Verträge & Betrieb",
            items: [
              {
                id: "kaufvertrag",
                icon: "📝",
                name: "Kaufvertrag",
                desc: "Angebot · Annahme · Pflichten",
                content: `<h2>📝 Kaufvertrag</h2>
                  <div class="hint">Form bereit – Inhalt folgt.</div>
                  <ul>
                    <li><span class="term" data-de="Kaufvertrag" data-vi="hợp đồng mua bán">Kaufvertrag</span></li>
                    <li><span class="term" data-de="Angebot" data-vi="chào hàng / đề nghị">Angebot</span></li>
                    <li><span class="term" data-de="Annahme" data-vi="chấp nhận">Annahme</span></li>
                    <li><span class="term" data-de="Mangel" data-vi="lỗi / khiếm khuyết">Mangel</span></li>
                    <li><span class="term" data-de="Lieferverzug" data-vi="chậm giao hàng">Lieferverzug</span></li>
                    <li><span class="term" data-de="Rechnung" data-vi="hóa đơn">Rechnung</span></li>
                  </ul>`,
              },
            ],
          },
        ],
        quiz: [
          {
            theme: "kaufvertrag",
            cat: "WiKO",
            q: "Ein Kaufvertrag entsteht durch …",
            opts: ["Nur Werbung", "Angebot und Annahme", "Nur Preisauszeichnung", "Nur Lieferung"],
            a: 1,
            ex: "Zwei übereinstimmende Willenserklärungen.",
          },
        ],
      },
    ];
  }

  /**
   * Prüfungs-Metadaten pro Fach (einheitlich, auch für ingest-basiertes bfk1):
   * - examThemes: theme-item-ids der NÄCHSTEN KA (leer → Training zeigt alle Themen + Hinweis)
   * - pruefungen: statische Prüfungsbögen [{title, desc, exam, loesung}]
   * examThemes bleibt leer, bis der Nutzer die konkrete Themenliste je Fach liefert.
   */
  const FACH_EXAM_META = {
    bfk1: {
      examThemes: [],
      pruefungen: [
        { title: "Klassenarbeit Nr. 3", desc: "Froher Seeblick · Gästebewertungen, Obst, Systemgastronomie, Beleg", exam: "bfk1-ka3.html", loesung: "bfk1-ka3-loesung.html" },
        { title: "Klassenarbeit Nr. 4", desc: "Sonnenblick · vegane Woche, Hülsenfrüchte, Bewirtungsvertrag, USt", exam: "bfk1-ka4.html", loesung: "bfk1-ka4-loesung.html" },
        { title: "Klassenarbeit Nr. 5", desc: "Stadtkrone · Getreide/Gluten, Menüregeln, Zechprellerei, USt vor Ort", exam: "bfk1-ka5.html", loesung: "bfk1-ka5-loesung.html" },
      ],
    },
    bfk2: {
      examThemes: [],
      pruefungen: [
        { title: "Musterprüfung", desc: "Klassenarbeit Nr. 2 · Prüfungsbogen", exam: "kiemtra_mau.html", loesung: "loiGiai_mau.html" },
        { title: "Zusammenfassung KA2", desc: "LF2 Waren & Lieferung · LF3", exam: "ka2.html", loesung: null },
      ],
    },
    englisch: {
      // KA: alle Themen (Telephoning, Present/Future tenses, Complaints, Quantifiers)
      examThemes: ["telephoning", "present-future-tenses", "complaints-restaurant", "quantifiers"],
      pruefungen: [],
    },
    gk: {
      // KA 1: Volksabstimmung, repräsentative Demokratie, Mehrheitsprinzip,
      // Gewaltenteilung + Gewaltenverschränkung, Menschen-/Bürgerrechte, Karikatur
      examThemes: ["partizipation", "demokratie-gg", "gewaltenteilung", "grundrechte", "karikatur-methode"],
      pruefungen: [
        { title: "Übung Nr. 1", desc: "Partizipation · Grundgesetz · Gleichberechtigung", exam: "gk-ka1.html", loesung: "gk-ka1-loesung.html" },
        { title: "Übung Nr. 2", desc: "Gewaltenteilung · Gewaltenverschränkung · Medien · Vertrauensfrage", exam: "gk-ka2.html", loesung: "gk-ka2-loesung.html" },
        { title: "Übung Nr. 3", desc: "Direkte Demokratie · Karikatur · Menschen-/Bürgerrechte · Mehrheitsprinzip", exam: "gk-ka3.html", loesung: "gk-ka3-loesung.html" },
      ],
    },
  };

  function applyExamMeta(f) {
    const meta = FACH_EXAM_META[f.id] || {};
    if (!Array.isArray(f.examThemes)) f.examThemes = (meta.examThemes || []).slice();
    if (!Array.isArray(f.pruefungen)) f.pruefungen = (meta.pruefungen || []).slice();
    return f;
  }

  function buildRegistry() {
    FAECHER.length = 0;
    const bfk1 = ingestBfk1FromWindow();
    if (bfk1) FAECHER.push(applyExamMeta(bfk1));
    scaffoldOthers().forEach((f) => {
      // don't duplicate bfk1
      if (FAECHER.some((x) => x.id === f.id)) return;
      if (f.id === "bfk2" && (!f.quiz || !f.quiz.length) && w.BFK2_QUIZ) {
        f.quiz = w.BFK2_QUIZ.slice();
      }
      if (f.id === "deutsch" && (!f.quiz || !f.quiz.length) && w.DEUTSCH_QUIZ) {
        f.quiz = w.DEUTSCH_QUIZ.slice();
      }
      FAECHER.push(applyExamMeta(f));
    });
    return FAECHER;
  }

  // Public API
  w.FachForm = w.FachForm || {
    FAECHER,
    buildRegistry,
    pageList,
    allThemes,
    findFach,
    findTheme,
    quizByThemes,
    themeMeta,
    /** Standard empty theme template for authors */
    themeTemplate(id, name) {
      return {
        id,
        icon: "📘",
        name,
        desc: "",
        content: `<h2>${name}</h2><div class="hint">Inhalt folgt.</div>`,
        pages: null,
      };
    },
  };

  // Auto-build when DOM scripts finished loading bfk1 data
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => w.FachForm.buildRegistry());
  } else {
    // bfk1-data may load after this file – build later via index.html
  }
})(window);
try{ if(typeof window!=="undefined" && window.FachForm){ /* global alias for classic scripts */ } }catch(e){}

