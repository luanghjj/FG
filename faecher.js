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
                content: `<h2>🥩 Fleischteile</h2><p>Interaktive Übersicht – öffne das Modul.</p>
                  <p><button class="btn" type="button" onclick="go('#/bfk/2/fleisch')">Öffnen →</button></p>`,
              },
              {
                id: "kueche",
                icon: "🍳",
                name: "Küche & Ernährung",
                desc: "Nährwert · Eiercode · Wertigkeit",
                route: "#/bfk/2/kueche",
                content: `<h2>🍳 Küche & Ernährung</h2><p>Nährwert, Eiercode, biologische Wertigkeit.</p>
                  <p><button class="btn" type="button" onclick="go('#/bfk/2/kueche')">Öffnen →</button></p>`,
              },
            ],
          },
        ],
        quiz: [], // uses existing BfK-2 QUIZ bank in index.html
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
                  <p>Hauptseite für Deutsch-Übungen (Mindmap, Diagramme, Text → Grafik).</p>
                  <p><a class="btn" href="deutsch.html">Deutsch-App öffnen →</a></p>
                  <h3 class="sub">Begriffe</h3>
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
        quiz: [],
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
        ready: false,
        desc: "Service English · Dialoge · Vokabeln",
        groups: [
          {
            id: "service",
            badge: "Unit",
            title: "Service English",
            items: [
              {
                id: "welcome",
                icon: "🗣️",
                name: "Greeting & Seating",
                desc: "Gäste begrüßen · platzieren",
                content: `<h2>🗣️ Greeting & Seating</h2>
                  <div class="hint">Inhalt folgt – Form bereits vorbereitet.</div>
                  <ul>
                    <li><span class="term" data-de="Welcome" data-vi="chào mừng">Welcome</span></li>
                    <li><span class="term" data-de="Reservation" data-vi="đặt bàn">Reservation</span></li>
                    <li><span class="term" data-de="Table for two" data-vi="bàn cho hai người">Table for two</span></li>
                    <li><span class="term" data-de="Follow me, please" data-vi="xin mời đi theo tôi">Follow me, please</span></li>
                  </ul>`,
              },
              {
                id: "ordering",
                icon: "📋",
                name: "Taking orders",
                desc: "Bestellung aufnehmen",
                content: `<h2>📋 Taking orders</h2>
                  <div class="hint">Inhalt folgt – Form bereits vorbereitet.</div>
                  <ul>
                    <li><span class="term" data-de="Are you ready to order?" data-vi="quý khách sẵn sàng order chưa?">Are you ready to order?</span></li>
                    <li><span class="term" data-de="Starter" data-vi="món khai vị">Starter</span></li>
                    <li><span class="term" data-de="Main course" data-vi="món chính">Main course</span></li>
                    <li><span class="term" data-de="Dessert" data-vi="món tráng miệng">Dessert</span></li>
                    <li><span class="term" data-de="Allergy" data-vi="dị ứng">Allergy</span></li>
                  </ul>`,
              },
              {
                id: "payment-en",
                icon: "💳",
                name: "Bill & payment",
                desc: "Rechnung · Bezahlen",
                content: `<h2>💳 Bill & payment</h2>
                  <ul>
                    <li><span class="term" data-de="The bill, please" data-vi="làm ơn tính tiền">The bill, please</span></li>
                    <li><span class="term" data-de="Cash or card?" data-vi="tiền mặt hay thẻ?">Cash or card?</span></li>
                    <li><span class="term" data-de="Tip" data-vi="tiền boa">Tip</span></li>
                    <li><span class="term" data-de="Receipt" data-vi="biên lai / hóa đơn">Receipt</span></li>
                  </ul>`,
              },
            ],
          },
        ],
        quiz: [
          {
            theme: "welcome",
            cat: "Greeting",
            q: "What do you say when guests arrive?",
            opts: ["Welcome, do you have a reservation?", "Pay now!", "Kitchen closed", "Go away"],
            a: 0,
            ex: "Begrüßung + Reservierung fragen.",
          },
          {
            theme: "ordering",
            cat: "Order",
            q: "„Main course“ bedeutet …",
            opts: ["Vorspeise", "Hauptgericht", "Getränk", "Rechnung"],
            a: 1,
            ex: "Main course = Hauptgericht.",
          },
          {
            theme: "payment-en",
            cat: "Payment",
            q: "Guest wants the bill. You say:",
            opts: ["The bill, please / Certainly, I'll bring it", "No food", "Only cash forever", "Tip is illegal"],
            a: 0,
            ex: "Rechnung bringen – höflich bestätigen.",
          },
        ],
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
        ready: false,
        desc: "Politik · Gesellschaft · Demokratie",
        groups: [
          {
            id: "politik",
            badge: "GK",
            title: "Grundlagen",
            items: [
              {
                id: "demokratie",
                icon: "🗳️",
                name: "Demokratie",
                desc: "Grundprinzipien",
                content: `<h2>🗳️ Demokratie</h2>
                  <div class="hint">Form bereit – Inhalt wird ergänzt.</div>
                  <ul>
                    <li><span class="term" data-de="Demokratie" data-vi="dân chủ">Demokratie</span></li>
                    <li><span class="term" data-de="Gewaltenteilung" data-vi="phân quyền">Gewaltenteilung</span></li>
                    <li><span class="term" data-de="Grundrechte" data-vi="quyền cơ bản">Grundrechte</span></li>
                    <li><span class="term" data-de="Wahlen" data-vi="bầu cử">Wahlen</span></li>
                    <li><span class="term" data-de="Bundesrepublik" data-vi="Cộng hòa Liên bang">Bundesrepublik</span></li>
                  </ul>`,
              },
              {
                id: "grundrechte",
                icon: "📜",
                name: "Grundrechte",
                desc: "GG · wichtige Artikel",
                content: `<h2>📜 Grundrechte</h2>
                  <ul>
                    <li><span class="term" data-de="Grundgesetz" data-vi="luật cơ bản / hiến pháp Đức">Grundgesetz</span></li>
                    <li><span class="term" data-de="Menschenwürde" data-vi="nhân phẩm">Menschenwürde</span> (Art. 1)</li>
                    <li><span class="term" data-de="Meinungsfreiheit" data-vi="tự do ngôn luận">Meinungsfreiheit</span></li>
                    <li><span class="term" data-de="Gleichheit" data-vi="bình đẳng">Gleichheit</span> vor dem Gesetz</li>
                  </ul>`,
              },
            ],
          },
        ],
        quiz: [
          {
            theme: "demokratie",
            cat: "GK",
            q: "Gewaltenteilung teilt die Macht in …",
            opts: ["Nur Polizei", "Legislative, Exekutive, Judikative", "Nur Parteien", "Nur Medien"],
            a: 1,
            ex: "Gesetzgebung, Verwaltung, Rechtsprechung.",
          },
          {
            theme: "grundrechte",
            cat: "GK",
            q: "Art. 1 GG schützt vor allem …",
            opts: ["Steuern", "Menschenwürde", "Autobahnen", "Fußball"],
            a: 1,
            ex: "Die Würde des Menschen ist unantastbar.",
          },
        ],
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

  function buildRegistry() {
    FAECHER.length = 0;
    const bfk1 = ingestBfk1FromWindow();
    if (bfk1) FAECHER.push(bfk1);
    scaffoldOthers().forEach((f) => {
      // don't duplicate bfk1
      if (FAECHER.some((x) => x.id === f.id)) return;
      FAECHER.push(f);
    });
    return FAECHER;
  }

  // Public API
  w.FachForm = {
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
