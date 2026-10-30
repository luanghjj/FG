/**
 * STANDARD-FORM für alle Fächer
 * ==============================
 * Jedes Fach folgt demselben Aufbau. Neue Fächer = 1 Objekt nach diesem Schema.
 *
 * FAECHER.push({
 *   id: "bfk1",                 // URL: #/fach/bfk1
 *   code: "BfK-1",
 *   name: "Grundlagen Gastronomie",
 *   icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="10" cy="15" r="5.5"/><path d="M15 15h6"/><path d="M8 15l2.5-3"/></svg>',
 *   accent: "#2563eb",
 *   soft: "#eff6ff",
 *   teacher: "",
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
 *           icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>',
 *           name: "Getreide",
 *           desc: "Kurzzeile in der Liste",
 *           content: `<h2>...</h2>...`,  // HTML, Begriffe mit:
 *           // <span class="term" data-de="Wort" data-vi="nghĩa">Wort</span>
 *           pages: { folder:"images/scans/2-Bfk1-lf6", from:35, to:44, prefix:"2-Bfk1-lf6" } // optional Scan
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
        icon: t.icon || '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
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
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="10" cy="15" r="5.5"/><path d="M15 15h6"/><path d="M8 15l2.5-3"/></svg>',
      accent: "#2563eb",
      soft: "#eff6ff",
      teacher: "",
      examDate: "2026-07-20",
      ready: true,
      desc: "LF2 Beschaffung/Lagerung · LF6 Speisen/Menüs · LF9 Zahlung/Recht",
      legacyRoutes: { hub: "#/bfk/1", quiz: "#/bfk/1/quiz", exam: "#/exam/bfk1" },
      groups: (w.BFK1_GROUPS || [themes.lf2, themes.lf6, themes.lf9, w.BFK1_EXTRA])
        .filter(Boolean)
        .map((g) => ({
          id: g.id,
          badge: g.badge || "",
          title: g.title || "",
          items: (g.items || []).map((it) => ({ ...it })),
        })),
      quiz: quiz.slice(),
    };
  }

  /** Scaffold other Fächer – same form, content step by step */
  function scaffoldOthers() {
    return [
      {
        id: "bfk2",
        code: "BfK-2",
        name: "Service, Getränke & Warenkunde (BfK-2)",
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/></svg>',
        accent: "#dc2626",
        soft: "#fef2f2",
        teacher: "",
        examDate: "2026-07-14",
        ready: true,
        desc: "1. Ausbildungsjahr: LF 1 Beruf & Kommunikation · LF 5 Service, Getränke, Bier/Wein, POS, Buffet | 2. Ausbildungsjahr: Fleisch, Küche, Fisch & Milch/Käse (LF 10)",
        legacyRoutes: {
          hub: "#/bfk/2"
        },
        groups: [
          {
            id: "lf1-orientierung",
            badge: "LF 1 · 1. Jahr",
            title: "Orientierung & Kommunikation",
            items: [
              {
                id: "bfk2-berufsbilder",
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12.01" y2="8"/><line x1="12" y1="11" x2="12" y2="16"/></svg>',
                name: "LS01 · Berufsbilder im Gastgewerbe",
                desc: "7 Ausbildungsberufe (GastroAusbV 2022) · Fachkraft für Gastronomie · Anforderungsprofil",
                content: `<h2>Berufsbilder im Gastgewerbe (S. 04–11)</h2>
<div class="hint">LS01 · 7 Ausbildungsberufe im Gastgewerbe (Neuordnung 2022) · Fachkraft für Gastronomie</div>
<h3 class="sub">1. Lernsituation</h3>
<p>Sie absolvieren Ihre Ausbildung im <strong>Hotel &amp; Restaurant Schwarzwaldblick</strong> (Bad Wildbad). Für den <em>Tag der offenen Tür</em> erstellen Sie Steckbriefe der 7 Ausbildungsberufe im Gastgewerbe, um Schulabgängerinnen und Schulabgänger zu informieren.</p>
<div class="vi"><b>Tình huống học tập:</b> Bạn là học viên (Azubi) tại <b>Hotel &amp; Restaurant Schwarzwaldblick</b> (Bad Wildbad). Nhân dịp <i>Tag der offenen Tür</i>, bạn thiết kế hồ sơ giới thiệu 7 ngành nghề đào tạo trong lĩnh vực Gastronomie cho học sinh sắp tốt nghiệp.</div>

<h3 class="sub">2. Die 7 Ausbildungsberufe im Gastgewerbe (seit 2022)</h3>
<ul>
  <li><strong>Gruppe 1:</strong> <span class="term" data-de="Fachkraft für Gastronomie" data-vi="chuyên viên dịch vụ ẩm thực (2 năm)">Fachkraft für Gastronomie</span> (2-jährige Ausbildung: Schwerpunkt Restaurantservice oder Systemgastronomie)</li>
  <li><strong>Gruppe 2:</strong> <span class="term" data-de="Fachmann/-frau für Systemgastronomie" data-vi="chuyên viên ẩm thực hệ thống/chuỗi">Fachmann/-frau für Systemgastronomie</span> (3-jährig)</li>
  <li><strong>Gruppe 3:</strong> <span class="term" data-de="Fachmann/-frau für Restaurants und Veranstaltungsgastronomie" data-vi="chuyên viên nhà hàng &amp; sự kiện">Fachmann/-frau für Restaurants und Veranstaltungsgastronomie</span> (3-jährig)</li>
  <li><strong>Gruppe 4:</strong> <span class="term" data-de="Fachkraft Küche" data-vi="chuyên viên bếp (2 năm)">Fachkraft Küche</span> (2-jährige Ausbildung)</li>
  <li><strong>Gruppe 5:</strong> <span class="term" data-de="Koch/Köchin" data-vi="đầu bếp chuyên nghiệp (3 năm)">Koch/Köchin</span> (3-jährig)</li>
  <li><strong>Gruppe 6:</strong> <span class="term" data-de="Hotelfachmann/-frau" data-vi="chuyên viên quản trị khách sạn">Hotelfachmann/-frau</span> (3-jährig)</li>
  <li><strong>Gruppe 7:</strong> <span class="term" data-de="Kaufmann/-frau für Hotelmanagement" data-vi="chuyên viên quản lý kinh doanh khách sạn">Kaufmann/-frau für Hotelmanagement</span> (3-jährig)</li>
</ul>
<div class="vi"><b>7 Ngành nghề đào tạo (GastroAusbV 2022):</b> Gồm 2 nghề hệ 2 năm (<i>Fachkraft für Gastronomie</i>, <i>Fachkraft Küche</i>) và 5 nghề hệ 3 năm (<i>Systemgastronomie, Restaurants und Veranstaltungsgastronomie, Koch/Köchin, Hotelfachmann/-frau, Hotelmanagement</i>).</div>

<h3 class="sub">3. Steckbrief: Fachkraft für Gastronomie</h3>
<table>
  <tr><th>Kriterium</th><th>Beschreibung</th></tr>
  <tr><td><span class="term" data-de="Berufsbild" data-vi="mô tả nghề nghiệp">Berufsbild</span></td><td>Gäste empfangen, beraten, Speisen und Getränke servieren sowie <span class="term" data-de="kassieren" data-vi="thu tiền / thanh toán">kassieren</span> — Visitenkarte und Gesicht des Betriebs.</td></tr>
  <tr><td><span class="term" data-de="Beschäftigungsbetrieb" data-vi="nơi làm việc">Beschäftigungsbetrieb</span></td><td>Restaurants, Cafés, Gasthöfe, Systemgastronomie, Hotels, Catering-Betriebe und Kantinen.</td></tr>
  <tr><td><span class="term" data-de="Ausbildungsdauer" data-vi="thời gian đào tạo">Ausbildungsdauer</span></td><td><strong>2 Jahre</strong> (mit Möglichkeit zur Fortsetzung im 3. Ausbildungsjahr zum 3-jährigen Abschluss).</td></tr>
  <tr><td><span class="term" data-de="Anforderungsprofil" data-vi="hồ sơ yêu cầu năng lực">Anforderungsprofil</span></td><td>Gastfreundlichkeit, Teamfähigkeit, Kommunikations- und Verkaufsstärke, Organisationsgeschick, Belastbarkeit.</td></tr>
</table>
<div class="vi"><b>Hồ sơ nghề Fachkraft für Gastronomie:</b> Đón tiếp, tư vấn khách, phục vụ món ăn/đồ uống và thanh toán hóa đơn. Làm việc tại nhà hàng, quán café, khách sạn, chuỗi ẩm thực hệ thống. Đào tạo <b>2 năm</b> (có thể học liên thông năm thứ 3).</div>
<div class="note"><b>Das Gastronomie-Einmaleins:</b> Grundfertigkeiten im Servieren, Beraten, Zubereiten einfacher Speisen und Kassieren.</div>`,
                qa: [
                  {
                    q: "Wie lange dauert die Ausbildung zur Fachkraft für Gastronomie und welche Schwerpunkte gibt es?",
                    qVi: "Thời gian đào tạo nghề Fachkraft für Gastronomie kéo dài bao lâu và có những chuyên ngành trọng tâm nào?",
                    a: "Die Ausbildung dauert 2 Jahre (Stufenausbildung mit Übergangsmöglichkeit ins 3. Jahr) und umfasst die Schwerpunkte Restaurantservice sowie Systemgastronomie.",
                    aVi: "Thời gian đào tạo kéo dài 2 năm (có thể học tiếp năm 3) với 2 chuyên ngành trọng tâm là Restaurantservice và Systemgastronomie."
                  },
                  {
                    q: "Welche Hauptaufgaben gehören zum Berufsbild der Fachkraft für Gastronomie?",
                    qVi: "Những nhiệm vụ chính nào thuộc về mô tả nghề nghiệp của Fachkraft für Gastronomie?",
                    a: "Gäste empfangen und betreuen, Speisen und Getränke zubereiten und servieren, Verkaufsgespräche führen sowie Kassieren und Abrechnen.",
                    aVi: "Đón tiếp và chăm sóc khách, chuẩn bị và phục vụ món ăn/đồ uống, tư vấn bán hàng cũng như thu ngân và thanh toán."
                  }
                ]
              },
              {
                id: "bfk2-gastgeber-team",
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
                name: "LS01 · Rolle als Gastgeber & im Team",
                desc: "Mindmap Anforderungen · Aussagen der Mitarbeitenden · 5 Praxissituationen im Service",
                content: `<h2>Rolle als Gastgeber &amp; im Team (S. 12–16)</h2>
<div class="hint">LS01 · Anforderungen an Gastgeber und Teammitglieder · 5 Praxissituationen</div>
<h3 class="sub">1. Mindmap der Kernanforderungen</h3>
<table>
  <tr><th>Rolle</th><th>Zentrale Kompetenzen</th></tr>
  <tr><td><span class="term" data-de="als Gastgeber/in" data-vi="với vai trò chủ nhà">Als Gastgeber/in</span></td><td><span class="term" data-de="Freundlichkeit" data-vi="sự thân thiện">Freundlichkeit</span>, sichere <span class="term" data-de="Kommunikation" data-vi="giao tiếp">Kommunikation</span>, hohe <span class="term" data-de="Servicequalität" data-vi="chất lượng dịch vụ">Servicequalität</span>, souveräne <span class="term" data-de="Problemlösung" data-vi="giải quyết vấn đề">Problemlösung</span>.</td></tr>
  <tr><td><span class="term" data-de="im Team" data-vi="trong đội ngũ đồng đội">Im Team</span></td><td><span class="term" data-de="Teamfähigkeit" data-vi="khả năng làm việc nhóm">Teamfähigkeit</span>, <span class="term" data-de="Zuverlässigkeit" data-vi="độ tin cậy">Zuverlässigkeit</span>, gegenseitiger <span class="term" data-de="Respekt" data-vi="sự tôn trọng">Respekt</span>, <span class="term" data-de="Flexibilität" data-vi="sự linh hoạt">Flexibilität</span> und Ordnungssinn.</td></tr>
</table>
<div class="vi"><b>Yêu cầu cốt lõi:</b> Với vai trò chủ nhà (<i>Gastgeber</i>): thân thiện, giao tiếp tốt, chất lượng phục vụ cao và xử lý tình huống khéo léo. Trong đội ngũ (<i>im Team</i>): tinh thần đồng đội, đáng tin cậy, tôn trọng lẫn nhau và linh hoạt.</div>

<h3 class="sub">2. Aussagen aus dem Kollegenkreis</h3>
<ul>
  <li><em>„Freundlichkeit und ein souveränes Auftreten sind das A und O.“</em></li>
  <li><em>„Ein gepflegtes Äußeres und saubere Arbeitskleidung sind entscheidend für den ersten Eindruck.“</em></li>
  <li><em>„Kritikfähig sein und konstruktives Feedback annehmen.“</em></li>
  <li><em>„In schwierigen Situationen diplomatisch, ruhig und lösungsorientiert bleiben.“</em></li>
  <li><em>„Ohne Vertrauen geht es nicht – Absprachen im Team müssen zuverlässig eingehalten werden.“</em></li>
</ul>
<div class="vi"><b>Kinh nghiệm từ đồng nghiệp:</b> Thân thiện và tự tin là cốt lõi; ngoại hình và đồng phục luôn chỉn chu; biết tiếp thu góp ý xây dựng; bình tĩnh và khéo léo trong tình huống khó; giữ chữ tín với đồng đội.</div>

<h3 class="sub">3. Fünf typische Praxissituationen im Service</h3>
<table>
  <tr><th>Situation</th><th>Professionelle Reaktion</th></tr>
  <tr><td><strong>1. Gast sucht langes Gespräch im Stoßgeschäft</strong></td><td>Freundlich und kurz antworten, auf den vollen Betrieb hinweisen und anbieten, später nochmals vorbeizuschauen.</td></tr>
  <tr><td><strong>2. Überbuchung / falsches Zimmer vergeben</strong></td><td>Höflich entschuldigen, erklären, dass das Haus <span class="term" data-de="ausgebucht" data-vi="cháy phòng / kín chỗ">ausgebucht</span> ist, gleichwertige Alternative sowie Getränkegutschein anbieten.</td></tr>
  <tr><td><strong>3. Küchenchef kritisiert zu <span class="term" data-de="wässrig" data-vi="bị loãng / nhạt nhòa">wässrige</span> Salatsauce</strong></td><td>Kritik sachlich annehmen, entschuldigen und das Dressing sofort nach Rezeptur korrigieren.</td></tr>
  <tr><td><strong>4. Kollege ist mit verärgertem Gast überfordert</strong></td><td>Ruhig hinzutreten, Unterstützung anbieten, das Gespräch deeskalierend übernehmen und eine Lösung finden.</td></tr>
  <tr><td><strong>5. Zwei Azubis streiten um beliebte Aufgaben</strong></td><td>Aufgaben fair aufteilen und einen festen Wechselplan für die nächsten Schichten vereinbaren.</td></tr>
</table>
<div class="vi"><b>5 Tình huống thực tế:</b> (1) Khách muốn trò chuyện lâu lúc đông khách: trả lời lịch sự, ngắn gọn và hẹn quay lại sau; (2) Xếp nhầm phòng/kín chỗ: xin lỗi, đổi phương án tương đương + tặng đồ uống; (3) Bếp trưởng góp ý xốt salad bị loãng: tiếp thu và pha lại ngay; (4) Đồng nghiệp lúng túng trước khách giận: chủ động hỗ trợ hạ nhiệt; (5) Hai Azubi giành việc nhẹ: chia đều và luân phiên theo ca.</div>
<div class="note"><b>Merksatz:</b> Klare Aufgabenverteilung und Respekt sichern eine reibungslose Zusammenarbeit zwischen Küche, Service und Empfang.</div>`,
                qa: [
                  {
                    q: "Welche Eigenschaften zeichnen einen guten Gastgeber im Service aus?",
                    qVi: "Những phẩm chất nào tạo nên một người chủ nhà (Gastgeber) tốt trong phục vụ?",
                    a: "Freundlichkeit, gepflegtes Erscheinungsbild, Aufmerksamkeit, gute Kommunikationsfähigkeit und lösungsorientiertes Handeln bei Problemen.",
                    aVi: "Sự thân thiện, ngoại hình chỉn chu, sự chu đáo, kỹ năng giao tiếp tốt và thái độ hướng tới giải pháp khi có sự cố."
                  },
                  {
                    q: "Wie reagieren Sie professionell, wenn ein Gast während des Stoßgeschäfts ein langes Gespräch beginnen möchte?",
                    qVi: "Bạn xử lý chuyên nghiệp như thế nào khi khách muốn trò chuyện lâu đúng vào giờ cao điểm?",
                    a: "Ich antworte höflich und wertschätzend, weise freundlich auf die wartenden Gäste hin und biete an, zu einem ruhigeren Zeitpunkt noch einmal an den Tisch zu kommen.",
                    aVi: "Trả lời lịch sự và trân trọng, khéo léo giải thích nhà hàng đang đông khách chờ và hẹn sẽ quay lại trò chuyện khi vơi việc."
                  }
                ]
              },
              {
                id: "bfk2-kommunikation",
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
                name: "LS04 · Angemessen kommunizieren",
                desc: "Verbale, paraverbale & nonverbale Kommunikation · Kommunikationsstörungen vermeiden",
                content: `<h2>Angemessen kommunizieren (S. 17–20)</h2>
<div class="hint">LS04 · Die 3 Ebenen der Kommunikation · Kommunikationsstörungen erkennen &amp; beheben</div>
<h3 class="sub">1. Die drei Ebenen der Kommunikation im Service</h3>
<table>
  <tr><th>Ebene</th><th>Merkmale &amp; Bedeutung</th></tr>
  <tr><td><span class="term" data-de="verbale Kommunikation" data-vi="giao tiếp bằng lời nói">Verbale Kommunikation</span></td><td>Gesprochenes Wort, Wortwahl, Satzbau, höfliche Fachsprache gegenüber dem Gast.</td></tr>
  <tr><td><span class="term" data-de="paraverbale Kommunikation" data-vi="giao tiếp qua giọng điệu">Paraverbale Kommunikation</span></td><td>Tonfall, Stimmlage, Lautstärke, Betonung und <span class="term" data-de="das Sprechtempo" data-vi="tốc độ nói">Sprechtempo</span>. Eine ruhige, warme Stimme schafft Vertrauen.</td></tr>
  <tr><td><span class="term" data-de="nonverbale Kommunikation" data-vi="giao tiếp phi ngôn ngữ">Nonverbale Kommunikation</span></td><td><span class="term" data-de="die Körpersprache" data-vi="ngôn ngữ cơ thể">Körpersprache</span>: Körperhaltung, Gesichtsausdruck (Mimik), Gestik, Blickkontakt und Lächeln.</td></tr>
</table>
<div class="vi"><b>3 Cấp độ giao tiếp:</b> (1) <b>Verbal</b> (ngôn từ, câu chữ lịch sự); (2) <b>Paraverbal</b> (ngữ điệu, âm lượng, tốc độ nói ấm áp); (3) <b>Nonverbal</b> (ngôn ngữ cơ thể: dáng đứng, nét mặt, nụ cười, giao tiếp bằng mắt).</div>

<h3 class="sub">2. Kommunikationsstörungen (<span class="term" data-de="die Kommunikationsstörung" data-vi="sự nhiễu / rủi ro giao tiếp">Kommunikationsstörungen</span>)</h3>
<ul>
  <li><strong>Ursachen:</strong> Undeutliche Aussprache, Lärm in Küche oder Gastraum, Zeitdruck, Sprachbarrieren, Stress oder unaufmerksames Zuhören.</li>
  <li><strong>Gegenmaßnahmen:</strong> Deutlich und strukturiert sprechen, <span class="term" data-de="aktives Zuhören" data-vi="lắng nghe chủ động">aktives Zuhören</span> (Blickkontakt, Nicken, Notizen), gezielte <span class="term" data-de="die Rückfrage, -n" data-vi="câu hỏi xác nhận lại">Rückfragen</span> zur Bestellbestätigung sowie gegenseitige <span class="term" data-de="die Wertschätzung" data-vi="sự tôn trọng khách hàng">Wertschätzung</span>.</li>
</ul>
<div class="vi"><b>Nhiễu giao tiếp &amp; Cách khắc phục:</b> Nguyên nhân do tiếng ồn, áp lực thời gian, nói không rõ hoặc rào cản ngôn ngữ. Khắc phục bằng cách nói rõ ràng, lắng nghe chủ động (<i>aktives Zuhören</i>), đặt câu hỏi xác nhận lại order (<i>Rückfragen</i>) và giữ thái độ tôn trọng.</div>
<div class="formula">Gelungene Gästekommunikation = Höfliche Wortwahl (verbal) + Ruhiger Tonfall (paraverbal) + Offene Körpersprache (nonverbal)</div>`,
                qa: [
                  {
                    q: "Unterscheiden Sie verbale, paraverbale und nonverbale Kommunikation mit je einem Beispiel!",
                    qVi: "Hãy phân biệt giao tiếp verbal, paraverbal và nonverbal kèm ví dụ!",
                    a: "Verbal: das gesprochene Wort (z. B. höfliche Begrüßung). Paraverbal: Art des Sprechens (z. B. Stimmklang, Lautstärke, Sprechtempo). Nonverbal: Körpersprache ohne Worte (z. B. Lächeln, Blickkontakt, aufrechte Haltung).",
                    aVi: "Verbal: lời nói, từ ngữ (VD: lời chào lịch sự). Paraverbal: cách phát âm (VD: tông giọng, âm lượng, tốc độ nói). Nonverbal: ngôn ngữ cơ thể không lời (VD: nụ cười, ánh mắt, tư thế đứng thẳng)."
                  },
                  {
                    q: "Wie lassen sich Kommunikationsstörungen bei der Bestellaufnahme vermeiden?",
                    qVi: "Làm thế nào để tránh nhiễu giao tiếp khi nhận order của khách?",
                    a: "Durch aktives Zuhören, Blickkontakt, Mitschreiben der Bestellung, gezielte Rückfragen bei Unklarheiten und das abschließende Wiederholen der Bestellung.",
                    aVi: "Bằng cách lắng nghe chủ động, nhìn vào mắt khách, ghi chép lại order, hỏi lại ngay khi chưa rõ và nhắc lại toàn bộ order để xác nhận."
                  }
                ]
              }
            ]
          },
          {
            id: "lf5-speisen-getraenke",
            badge: "LF 5 · 1. Jahr",
            title: "Speisen & Getränke",
            items: [
              {
                id: "bfk2-snacks",
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12h18"/><path d="M3 12a9 9 0 0 0 18 0"/></svg>',
                name: "LS05 · Snacks und einfache Speisen",
                desc: "3 Snack-Kategorien · 5 Qualitätskriterien · Kühlkette & Allergenkennzeichnung",
                content: `<h2>Snacks und einfache Speisen zubereiten und servieren (S. 21–24)</h2>
<div class="hint">LS05 · 3 Snack-Gruppen · 5 Qualitätsanforderungen · Kühlkette &amp; Allergene</div>
<h3 class="sub">1. Einteilung in drei Snack-Kategorien</h3>
<table>
  <tr><th>Kategorie</th><th>Typische Beispiele</th></tr>
  <tr><td><strong>Kalte Snacks</strong></td><td>Belegte Brötchen, Sandwiches, Canapés, Wraps, Salat im Glas, <span class="term" data-de="das Fingerfood" data-vi="đồ ăn bốc tay">Fingerfood</span>.</td></tr>
  <tr><td><strong>Warme Snacks</strong></td><td>Toast Hawaii, Strammer Max, <span class="term" data-de="überbacken" data-vi="nướng phô mai / bỏ lò">überbackene</span> Panini/Baguettes, Tagessuppe, Flammkuchen.</td></tr>
  <tr><td><strong>Süße Snacks</strong></td><td>Frische Waffeln, Crêpes, Muffins, Blechkuchen, Joghurt- und Quarkspeisen mit Früchten.</td></tr>
</table>
<div class="vi"><b>3 Nhóm món ăn nhẹ (Snacks):</b> (1) <b>Kalte Snacks</b> (món lạnh: sandwich, canapé, salad, fingerfood); (2) <b>Warme Snacks</b> (món nóng: Toast Hawaii, Strammer Max, panini bỏ lò, súp, Flammkuchen); (3) <b>Süße Snacks</b> (món ngọt: Waffeln, Crêpes, Muffin, bánh ngọt, sữa chua trái cây).</div>

<h3 class="sub">2. Fünf Qualitätskriterien für erfolgreiche Snacks</h3>
<ul>
  <li><strong>Kurze Zubereitungszeit:</strong> Schnelle Fertigstellung à la minute (ca. 5–10 Minuten).</li>
  <li><strong>Frische &amp; Optik:</strong> Knackige Zutaten, appetitliche Garnitur und sauberes Anrichten.</li>
  <li><strong>Kalkulierbarkeit:</strong> Standardisierte Rezepturen und gute Vorbereitbarkeit (Mise en place).</li>
  <li><strong>Einfache Handhabung:</strong> Unkompliziert zu verzehren (auch im Stehen oder unterwegs).</li>
  <li><strong>Hygiene &amp; Lebensmittelsicherheit:</strong> Strikte Einhaltung der HACCP-Vorgaben.</li>
</ul>
<div class="vi"><b>5 Tiêu chuẩn chất lượng của Snack:</b> Chế biến nhanh (5–10 phút); nguyên liệu tươi ngon &amp; trình bày đẹp; định lượng chuẩn xác dễ chuẩn bị trước (Mise en place); dễ cầm ăn; đảm bảo vệ sinh an toàn thực phẩm HACCP.</div>

<h3 class="sub">3. Kühlkette &amp; Allergenkennzeichnung</h3>
<p>Bei leicht verderblichen Zutaten (Fleisch, Fisch, Milchprodukte, Ei) darf <span class="term" data-de="die Kühlkette" data-vi="chuỗi lạnh (bảo quản lạnh)">die Kühlkette</span> (+2 °C bis +7 °C) nicht unterbrochen werden. Zudem gilt die gesetzliche <span class="term" data-de="die Allergenkennzeichnung" data-vi="ghi nhãn chất gây dị ứng">Allergenkennzeichnung</span> für die 14 Hauptallergene (z. B. Gluten, Laktose, Ei, Schalenfrüchte, Sellerie, Senf).</p>
<div class="vi"><b>Bảo quản lạnh &amp; Dị ứng:</b> Luôn duy trì chuỗi lạnh (<i>Kühlkette</i> +2 °C đến +7 °C) đối với thực phẩm dễ hỏng và ghi nhãn đầy đủ 14 nhóm chất gây dị ứng bắt buộc (<i>Allergenkennzeichnung</i>) trên thực đơn.</div>`,
                qa: [
                  {
                    q: "In welche drei Kategorien werden Snacks eingeteilt? Nennen Sie je zwei Beispiele!",
                    qVi: "Snacks được chia thành 3 nhóm nào? Nêu 2 ví dụ cho mỗi nhóm!",
                    a: "1. Kalte Snacks (z. B. Canapés, Wraps). 2. Warme Snacks (z. B. Toast Hawaii, Flammkuchen). 3. Süße Snacks (z. B. Waffeln, Muffins).",
                    aVi: "1. Món lạnh (Kalte Snacks: Canapés, Wraps). 2. Món nóng (Warme Snacks: Toast Hawaii, Flammkuchen). 3. Món ngọt (Süße Snacks: Waffeln, Muffins)."
                  },
                  {
                    q: "Welche fünf Anforderungen muss ein guter Snack in der Gastronomie erfüllen?",
                    qVi: "Một món Snack đạt chuẩn trong nhà hàng cần đáp ứng 5 yêu cầu nào?",
                    a: "Kurze Zubereitungszeit (5–10 Min.), hohe Frische und ansprechende Optik, gute Kalkulier- und Vorbereitbarkeit, einfache Handhabung beim Verzehr sowie einwandfreie Hygiene (Kühlkette/HACCP).",
                    aVi: "Thời gian chế biến nhanh (5–10 phút), tươi ngon và bắt mắt, dễ định lượng và chuẩn bị trước, dễ ăn và đảm bảo vệ sinh HACCP/chuỗi lạnh."
                  }
                ]
              },
              {
                id: "bfk2-kaltgetraenke",
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 11h13v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z"/><path d="M17 11h2a3 3 0 0 1 0 6h-2"/></svg>',
                name: "LS06 · Alkoholfreie Kaltgetränke",
                desc: "Mineral-, Quell-, Tafel- & Heilwasser · Fruchtsaft, Nektar & Schorle · Servierregeln",
                content: `<h2>Alkoholfreie Kaltgetränke bereitstellen (S. 25–27)</h2>
<div class="hint">LS06 · Wasserarten · Fruchtsaftgetränke nach Fruchtgehalt · Servierregeln</div>
<h3 class="sub">1. Unterscheidung der Wasserarten</h3>
<table>
  <tr><th>Wasserart</th><th>Rechtliche Merkmale &amp; Gewinnung</th></tr>
  <tr><td><span class="term" data-de="das Mineralwasser" data-vi="nước khoáng">Natürliches Mineralwasser</span></td><td>Unterirdisches, vor Verunreinigungen geschütztes Vorkommen, konstante Mineralstoffzusammensetzung, direkt an der Quelle abgefüllt, einziges Lebensmittel mit <span class="term" data-de="amtlich anerkannt" data-vi="được nhà nước kiểm định chứng nhận">amtlicher Anerkennung</span>.</td></tr>
  <tr><td><span class="term" data-de="das Quellwasser" data-vi="nước suối nguồn tự nhiên">Quellwasser</span></td><td>Aus unterirdischen Wasservorkommen an der Quelle abgefüllt; keine amtliche Anerkennung nötig, entspricht Trinkwasserverordnung.</td></tr>
  <tr><td><span class="term" data-de="das Tafelwasser" data-vi="nước uống pha chế công nghiệp">Tafelwasser</span></td><td>Industriell hergestelltes Gemisch aus Trinkwasser, Mineralstoffen, Salz und Kohlensäure; darf überall abgefüllt oder gezapft werden.</td></tr>
  <tr><td><span class="term" data-de="das Heilwasser" data-vi="nước khoáng trị liệu">Heilwasser</span></td><td>Natürliches Wasser mit nachgewiesener vorbeugender oder heilender Wirkung; unterliegt dem Arzneimittelgesetz.</td></tr>
</table>
<div class="vi"><b>Phân loại nước uống:</b> (1) <b>Mineralwasser</b>: nước khoáng thiên nhiên đóng chai ngay tại nguồn ngầm và là thực phẩm duy nhất phải được nhà nước công nhận chính thức (<i>amtlich anerkannt</i>); (2) <b>Quellwasser</b>: nước nguồn tự nhiên; (3) <b>Tafelwasser</b>: nước pha chế công nghiệp từ nước uống + khoáng + CO₂; (4) <b>Heilwasser</b>: nước khoáng trị liệu theo Luật Dược phẩm.</div>

<h3 class="sub">2. Fruchtsaft, Fruchtnektar &amp; Fruchtsaftschorle</h3>
<table>
  <tr><th>Getränk</th><th>Fruchtgehalt</th><th>Besonderheiten</th></tr>
  <tr><td><span class="term" data-de="der Fruchtsaft" data-vi="nước ép trái cây 100%">Fruchtsaft</span> (Direktsaft / aus Konzentrat)</td><td><strong>100 %</strong></td><td>Kein Zusatz von Zucker, Farb- oder Konservierungsstoffen erlaubt.</td></tr>
  <tr><td><span class="term" data-de="der Fruchtnektar" data-vi="nước trái cây nektar (25–50%)">Fruchtnektar</span></td><td><strong>25 % – 50 %</strong></td><td>Für säurereiche oderfruchtfleischreiche Früchte (z. B. Sauerkirsche, Johannisbeere, Banane, Maracuja); Zusatz von Wasser und bis zu 20 % Zucker erlaubt.</td></tr>
  <tr><td><span class="term" data-de="das Fruchtsaftgetränk" data-vi="nước giải khát hương trái cây">Fruchtsaftgetränk</span></td><td><strong>mind. 6 % – 30 %</strong></td><td>6 % bei Zitrusfrüchten, 10 % bei Kernobst, 30 % bei Steinobst.</td></tr>
  <tr><td><span class="term" data-de="die Fruchtsaftschorle" data-vi="nước ép trái cây pha sủi soda">Fruchtsaftschorle</span></td><td><strong>ca. 50 % Saft + 50 % Mineralwasser</strong></td><td>Erfrischende Mischung aus Fruchtsaft und kohlensäurehaltigem Wasser (z. B. Apfelschorle).</td></tr>
</table>
<div class="vi"><b>Phân biệt theo tỷ lệ trái cây (Fruchtgehalt):</b> <b>Fruchtsaft</b> = 100 % nguyên chất không thêm đường; <b>Fruchtnektar</b> = 25–50 % (dùng cho quả quá chua hoặc đặc như chanh dây, chuối, anh đào chua, được phép pha nước và tối đa 20 % đường); <b>Fruchtsaftgetränk</b> = 6–30 %; <b>Fruchtsaftschorle</b> = khoảng 50 % nước ép + 50 % nước khoáng có ga.</div>
<div class="note"><b>Servierregel:</b> Serviertemperatur für Kaltgetränke: <b>8 °C – 10 °C</b>. Originalverschlossene Flaschen werden stets rechts vor dem Gast geöffnet und eingeschenkt.</div>`,
                qa: [
                  {
                    q: "Worin unterscheiden sich natürliches Mineralwasser und Tafelwasser?",
                    qVi: "Nước khoáng tự nhiên (Mineralwasser) và nước uống pha chế (Tafelwasser) khác nhau như thế nào?",
                    a: "Natürliches Mineralwasser stammt aus einer geschützten unterirdischen Quelle, muss direkt vor Ort abgefüllt werden und ist amtlich anerkannt. Tafelwasser wird industriell aus Trinkwasser und Zutaten gemischt und darf überall abgefüllt oder gezapft werden.",
                    aVi: "Mineralwasser lấy từ nguồn ngầm tự nhiên, bắt buộc đóng chai tại nguồn và được nhà nước chứng nhận. Tafelwasser được pha chế công nghiệp từ nước uống và khoáng chất, có thể đóng chai hoặc chiết vòi ở bất kỳ đâu."
                  },
                  {
                    q: "Welchen Fruchtgehalt haben Fruchtsaft und Fruchtnektar?",
                    qVi: "Tỷ lệ trái cây (Fruchtgehalt) của Fruchtsaft và Fruchtnektar là bao nhiêu?",
                    a: "Fruchtsaft hat immer 100 % Fruchtgehalt ohne Zuckerzusatz. Fruchtnektar hat je nach Fruchtart mindestens 25 % bis 50 % Fruchtgehalt und enthält Wasser sowie ggf. Zucker.",
                    aVi: "Fruchtsaft luôn có 100 % trái cây nguyên chất không thêm đường. Fruchtnektar có từ 25 % đến 50 % tùy loại quả, phần còn lại là nước và đường."
                  }
                ]
              },
              {
                id: "bfk2-heissgetraenke",
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 11h13v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z"/><path d="M17 11h2a3 3 0 0 1 0 6h-2"/></svg>',
                name: "LS07 · Alkoholfreie Heißgetränke",
                desc: "Kaffee (Arabica vs. Robusta) · Kakao & Heiße Schokolade · Tee (Fermentation & Ziehzeit)",
                content: `<h2>Alkoholfreie Heißgetränke zubereiten und servieren (S. 28–38)</h2>
<div class="hint">LS07 · Kaffeebohnen Arabica &amp; Robusta · Kakao · Tee-Herstellung, Blattgrade &amp; Ziehzeit</div>
<h3 class="sub">1. Kaffee: Arabica vs. Robusta</h3>
<table>
  <tr><th>Merkmal</th><th>Arabica (Coffea arabica)</th><th>Robusta (Coffea canephora)</th></tr>
  <tr><td>Anbauhöhe &amp; Herkunft</td><td>Hochland: 600 m – 2.000 m (z. B. Brasilien, Kolumbien, Äthiopien)</td><td>Tiefland: unter 600 m (z. B. Vietnam – weltweit größter Robusta-Exporteur)</td></tr>
  <tr><td>Geschmack &amp; Koffeingehalt</td><td>Mild, aromatisch, feine Säure · <strong>1,0 – 1,5 % Koffein</strong></td><td>Kräftig, erdig, schöne Crema · <strong>2,0 – 4,5 % Koffein</strong></td></tr>
  <tr><td>Bohnenform</td><td>Länglich-oval mit geschwungener S-Naht</td><td>Rundlich-klein mit gerader Naht</td></tr>
</table>
<p>Durch die <strong>Röstung</strong> (bei 200 °C – 250 °C) entstehen über 800 Aromastoffe. Für Espresso wird das <span class="term" data-de="das Druckbrühverfahren" data-vi="phương pháp pha ép áp suất cao">Druckbrühverfahren</span> (ca. 9 bar, 88–92 °C, 25–30 Sekunden Durchlaufzeit) genutzt.</p>
<div class="vi"><b>So sánh hạt cà phê Arabica &amp; Robusta:</b> <b>Arabica</b> trồng ở vùng cao (600–2000 m), hạt bầu dục rãnh chữ S, hương thơm dịu, chua thanh, ít caffein (1–1,5 %). <b>Robusta</b> trồng ở vùng thấp (&lt; 600 m, Việt Nam xuất khẩu số 1 thế giới), hạt tròn nhỏ rãnh thẳng, vị đậm đắng, nhiều lớp bọt Crema và hàm lượng caffein cao (2–4,5 %).</div>

<h3 class="sub">2. Kakao vs. Heiße Schokolade</h3>
<p>Kakaobohnen enthalten den mild anregenden Wirkstoff <span class="term" data-de="Theobromin" data-vi="chất kích thích dịu êm theobromin">Theobromin</span>. Ein <strong>Kakaogetränk</strong> wird aus Kakaopulver, Zucker und heißer Milch angerührt; für echte <strong>Heiße Schokolade</strong> wird feste Kuvertüre bzw. Schokolade in heißer Milch geschmolzen.</p>
<div class="vi"><b>Ca cao &amp; Socola nóng:</b> Hạt ca cao chứa chất kích thích nhẹ <i>Theobromin</i>. <i>Kakaogetränk</i> pha từ bột ca cao với sữa, còn <i>Heiße Schokolade</i> đun chảy trực tiếp socola nguyên miếng trong sữa nóng.</div>

<h3 class="sub">3. Tee: Fermentation, Blattgrade &amp; Ziehzeit</h3>
<ul>
  <li><span class="term" data-de="die Fermentation" data-vi="quá trình lên men oxy hóa lá trà">Fermentation</span> (Oxidation des Zellsafts): <strong>Grüner Tee</strong> = nicht fermentiert (Blätter werden gedämpft/geröstet); <strong>Oolong-Tee</strong> = halbfermentiert; <strong>Schwarzer Tee</strong> = voll fermentiert.</li>
  <li><span class="term" data-de="der Blattgrad" data-vi="cấp độ / kích thước lá trà">Blattgrade</span>: <strong>Blatt-Tee</strong> (ganze Blätter, z. B. Flowery Orange Pekoe FOP), <strong>Broken [B]</strong> (gebrochene Blätter, kräftiger), <strong>Fannings [F]</strong> und <strong>Dust [D]</strong> (feine Siebung für Aufgussbeutel).</li>
  <li><span class="term" data-de="die Ziehzeit" data-vi="thời gian hãm trà">Ziehzeit &amp; Wirkung</span>: <strong>2–3 Minuten</strong> = <span class="term" data-de="anregend" data-vi="kích thích tỉnh táo">anregend</span> (Teein/Koffein löst sich zuerst); <strong>4–5 Minuten</strong> = <span class="term" data-de="beruhigend" data-vi="thư giãn / dịu dạ dày">beruhigend</span> für Magen und Darm (<span class="term" data-de="die Gerbstoffe" data-vi="chất chát Tanin">Gerbstoffe / Tannine</span> lösen sich und binden das Koffein).</li>
</ul>
<div class="vi"><b>Kiến thức về Trà (Tee):</b> (1) <b>Lên men (Fermentation)</b>: Trà xanh không lên men, Oolong bán lên men, Trà đen lên men hoàn toàn; (2) <b>Cấp độ lá (Blattgrad)</b>: Nguyên lá (Blatt-Tee) → Lá gãy (Broken) → Vụn nhỏ túi lọc (Fannings &amp; Dust); (3) <b>Thời gian hãm (Ziehzeit)</b>: Hãm 2–3 phút giúp tỉnh táo (<i>anregend</i> do giải phóng caffein trước); hãm 4–5 phút giúp dịu dạ dày (<i>beruhigend</i> do giải phóng chất chát <i>Gerbstoffe</i>).</div>`,
                qa: [
                  {
                    q: "Nennen Sie drei Unterschiede zwischen Arabica- und Robusta-Kaffeebohnen!",
                    qVi: "Hãy nêu 3 điểm khác biệt giữa hạt cà phê Arabica và Robusta!",
                    a: "1. Anbauhöhe: Arabica im Hochland (600–2000 m), Robusta im Tiefland (< 600 m). 2. Koffeingehalt: Arabica 1–1,5 %, Robusta 2–4,5 %. 3. Geschmack & Aussehen: Arabica mild mit S-Naht, Robusta kräftig-erdig mit gerader Naht.",
                    aVi: "1. Độ cao trồng: Arabica ở vùng cao (600–2000 m), Robusta ở vùng thấp (< 600 m). 2. Hàm lượng caffein: Arabica 1–1,5 %, Robusta 2–4,5 %. 3. Hương vị & hình dáng: Arabica thơm dịu, rãnh chữ S; Robusta đậm mạnh, rãnh thẳng."
                  },
                  {
                    q: "Wie beeinflusst die Ziehzeit von schwarzem Tee seine Wirkung?",
                    qVi: "Thời gian hãm trà đen (Ziehzeit) ảnh hưởng đến tác dụng của trà như thế nào?",
                    a: "Kurze Ziehzeit (2–3 Minuten) wirkt anregend, da sich zuerst das Koffein (Teein) löst. Längere Ziehzeit (4–5 Minuten) wirkt beruhigend, da sich Gerbstoffe (Tannine) lösen, die das Koffein binden.",
                    aVi: "Hãm ngắn (2–3 phút) có tác dụng kích thích tỉnh táo (anregend) vì caffein tan ra trước. Hãm lâu (4–5 phút) có tác dụng làm dịu (beruhigend) vì chất chát (Gerbstoffe) tiết ra kết hợp với caffein."
                  }
                ]
              }
            ]
          },
          {
            id: "lf5-bier-wein",
            badge: "LF 5 · 1. Jahr",
            title: "Bierkunde & Weinkunde",
            items: [
              {
                id: "bfk2-bierkunde",
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 11h13v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z"/><path d="M17 11h2a3 3 0 0 1 0 6h-2"/></svg>',
                name: "LS08 · Bierkunde und Bierausschank",
                desc: "Reinheitsgebot 1516 · 4 Grundrohstoffe · Obergärig vs. untergärig · Bierausschank",
                content: `<h2>Bierkunde und Bierausschank (S. 39–45)</h2>
<div class="hint">LS08 · Reinheitsgebot von 1516 · Brauprozess · Obergärige &amp; untergärige Biere · Zapftechnik</div>
<h3 class="sub">1. Das deutsche Reinheitsgebot von 1516</h3>
<p>Nach dem <span class="term" data-de="das Reinheitsgebot" data-vi="luật tinh khiết nấu bia 1516">Reinheitsgebot</span> (Herzog Wilhelm IV. von Bayern, 1516) darf Bier in Deutschland ausschließlich aus vier Grundrohstoffen gebraut werden: <strong>Wasser</strong>, <strong>Malz</strong> (Gersten- oder Weizenmalz), <strong>Hopfen</strong> und <strong>Hefe</strong>.</p>
<div class="vi"><b>Luật tinh khiết (Reinheitsgebot 1516):</b> Quy định bia Đức chỉ được nấu từ 4 nguyên liệu duy nhất: Nước (<i>Wasser</i>), Mạch nha (<i>Malz</i>), Hoa bia (<i>Hopfen</i>) và Men bia (<i>Hefe</i>).</div>

<h3 class="sub">2. Obergärige vs. untergärige Biere</h3>
<table>
  <tr><th>Kriterium</th><th><span class="term" data-de="obergärig" data-vi="lên men nổi">Obergärig</span></th><th><span class="term" data-de="untergärig" data-vi="lên men chìm">Untergärig</span></th></tr>
  <tr><td>Verhalten der Hefe</td><td>Hefe steigt bei der Gärung an die Oberfläche</td><td>Hefe sinkt am Ende der Gärung auf den Gefäßboden</td></tr>
  <tr><td>Gärtemperatur</td><td>Wärmer: <strong>15 °C – 22 °C</strong></td><td>Kühler: <strong>6 °C – 12 °C</strong></td></tr>
  <tr><td>Geschmacksprofil</td><td>Fruchtig, vollmundig, aromatisch</td><td>Schlank, frisch, feinherb, längere Haltbarkeit</td></tr>
  <tr><td>Typische Biersorten</td><td>Weizenbier / Weißbier (<span class="term" data-de="hefetrüb" data-vi="đục tự nhiên do men">hefetrüb</span> oder Kristall), Altbier, Kölsch, Berliner Weiße</td><td>Pils (Pilsener), Export, Helles, Märzen, Bockbier</td></tr>
</table>
<div class="vi"><b>So sánh bia lên men nổi (obergärig) và lên men chìm (untergärig):</b> <b>Obergärig</b> lên men ở 15–22 °C, men nổi lên bề mặt, hương trái cây (gồm <i>Weizenbier, Altbier, Kölsch, Berliner Weiße</i>). <b>Untergärig</b> lên men lạnh 6–12 °C, men lắng xuống đáy, vị thanh đắng dịu (gồm <i>Pils, Export, Helles, Märzen, Bockbier</i>).</div>

<h3 class="sub">3. Brauprozess &amp; Bierausschank</h3>
<div class="formula">Mälzen → Maischen (Malzschrot + Wasser) → Läutern → Würzekochen mit Hopfen → Gärung mit Hefe → Reifung &amp; Filtration</div>
<p>Beim Zapfen an der <span class="term" data-de="die Zapfanlage, -n" data-vi="hệ thống vòi rót bia tươi">Zapfanlage</span> müssen Gläser kalt, fettfrei und kurz mit klarem Wasser vorgespült sein. Optimale Trinktemperatur für Fassbier: <strong>7 °C – 9 °C</strong>.</p>
<div class="vi"><b>Quy trình nấu &amp; Rót bia:</b> Nảy mầm mạch nha (<i>Mälzen</i>) → Nấu dịch nha (<i>Maischen</i>) → Lọc bã (<i>Läutern</i>) → Đun sôi dịch đường với hoa bia (<i>Würzekochen</i>) → Lên men (<i>Gärung</i>). Khi rót bia tươi, ly phải sạch mỡ và tráng nước lạnh, nhiệt độ phục vụ chuẩn 7–9 °C.</div>`,
                qa: [
                  {
                    q: "Welche vier Rohstoffe sind nach dem deutschen Reinheitsgebot von 1516 für das Bierbrauen erlaubt?",
                    qVi: "Theo Luật tinh khiết Đức năm 1516, 4 nguyên liệu nào được phép dùng để nấu bia?",
                    a: "Wasser, Malz (Gersten-/Weizenmalz), Hopfen und Hefe.",
                    aVi: "Nước (Wasser), mạch nha (Malz), hoa bia (Hopfen) và men bia (Hefe)."
                  },
                  {
                    q: "Unterscheiden Sie obergäriges und untergäriges Bier anhand der Gärtemperatur und nennen Sie je zwei Beispiele!",
                    qVi: "Hãy phân biệt bia lên men nổi (obergärig) và lên men chìm (untergärig) theo nhiệt độ lên men và nêu 2 ví dụ mỗi loại!",
                    a: "Obergärig: Gärung bei 15–22 °C, Hefe steigt nach oben (z. B. Weizenbier, Kölsch, Altbier). Untergärig: Gärung bei 6–12 °C, Hefe sinkt nach unten (z. B. Pils, Export, Helles, Bockbier).",
                    aVi: "Obergärig: lên men ở 15–22 °C, men nổi lên trên (VD: Weizenbier, Kölsch, Altbier). Untergärig: lên men ở 6–12 °C, men lắng xuống đáy (VD: Pils, Export, Helles, Bockbier)."
                  }
                ]
              },
              {
                id: "bfk2-weinkunde",
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 11h13v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z"/><path d="M17 11h2a3 3 0 0 1 0 6h-2"/></svg>',
                name: "LS09 · Weinarten darstellen und empfehlen",
                desc: "Anbaugebiete Baden & Württemberg · Weiß-, Rosé- & Rotweinbereitung · Weißherbst",
                content: `<h2>Weinarten darstellen und empfehlen (S. 46–55)</h2>
<div class="hint">LS09 · Weinbaugebiete Baden &amp; Württemberg · Mostgärung vs. Maischegärung · Weinarten</div>
<h3 class="sub">1. Die regionalen Anbaugebiete Baden und Württemberg</h3>
<ul>
  <li><strong>Baden:</strong> Südlichstes und wärmstes deutsches Weinanbaugebiet (z. B. Kaiserstuhl, Ortenau, Markgräflerland). Über 50 % der Rebfläche sind mit Burgundersorten bestockt: <em>Spätburgunder, Grauburgunder, Weißburgunder, Müller-Thurgau, Gutedel</em>.</li>
  <li><strong>Württemberg:</strong> Bekannt als Rotweinland entlang des Neckars mit vielen Steillagen. Leitrebsorten: <em>Trollinger, Lemberger, Schwarzriesling, Spätburgunder</em> sowie <em>Riesling</em>.</li>
</ul>
<div class="vi"><b>Hai vùng rượu vang trọng điểm tại Baden-Württemberg:</b> <b>Baden</b> là vùng ấm nhất nước Đức, nổi tiếng với dòng nho Burgunder (<i>Spätburgunder, Grauburgunder, Weißburgunder</i>). <b>Württemberg</b> nổi tiếng với các giống nho đỏ trên sườn đồi dốc (<i>Trollinger, Lemberger, Schwarzriesling</i>) và nho trắng <i>Riesling</i>.</div>

<h3 class="sub">2. Weinbereitung und Weinarten im Überblick</h3>
<table>
  <tr><th>Weinart</th><th>Traubenmaterial</th><th>Herstellungsverfahren</th></tr>
  <tr><td><strong>Weißwein</strong></td><td>Weiße Trauben (oder rote Trauben ohne Schalenkontakt: <em>Blanc de Noirs</em>)</td><td><span class="term" data-de="die Mostgärung" data-vi="lên men nước ép nho đã lọc">Mostgärung</span>: Trauben werden sofort abgepresst (gekeltert); nur der klare Traubenmost gärt.</td></tr>
  <tr><td><strong>Rotwein</strong></td><td>Dunkle / blaue Trauben</td><td><span class="term" data-de="die Maischegärung" data-vi="lên men cả vỏ và hạt nho">Maischegärung</span> (oder Maischeocherhitzung): Gärung mit den Beerenschalen, um rote Farbstoffe und Tannine zu lösen.</td></tr>
  <tr><td><strong>Roséwein</strong></td><td>Ausschließlich dunkle / blaue Trauben</td><td>Hell gekeltert wie Weißwein oder nach kurzer Standzeit auf der Maische abgepresst.</td></tr>
  <tr><td><span class="term" data-de="der Rotling" data-vi="vang hồng pha trộn nho trắng và đỏ">Rotling</span> (z. B. Schillerwein)</td><td>Weiße + rote Trauben gemischt</td><td>Beide Traubenarten werden vor dem Keltern gemeinsam verarbeitet und vergoren.</td></tr>
</table>
<div class="vi"><b>Phân biệt quy trình sản xuất các dòng vang:</b> <b>Weißwein</b> ép lấy nước nho ngay rồi mới lên men (<i>Mostgärung</i>); <b>Rotwein</b> lên men cả vỏ nho đỏ (<i>Maischegärung</i>) để lấy màu đỏ và chất chát Tannin; <b>Roséwein</b> làm từ nho đỏ nhưng ép sớm nên có màu hồng nhạt; <b>Rotling</b> ép chung cả nho trắng và nho đỏ.</div>
<div class="note"><b>Weißherbst:</b> Ein deutscher Qualitäts- oder Prädikats-Roséwein, der zu <strong>100 % aus einer einzigen roten Rebsorte</strong> (meist Spätburgunder) aus demselben Anbaugebiet gekeltert wurde.</div>`,
                qa: [
                  {
                    q: "Worin besteht der Hauptunterschied zwischen der Herstellung von Weißwein und Rotwein?",
                    qVi: "Điểm khác biệt chính giữa quy trình sản xuất vang trắng (Weißwein) và vang đỏ (Rotwein) là gì?",
                    a: "Weißwein entsteht durch Mostgärung (Trauben werden vor der Gärung abgepresst). Rotwein entsteht durch Maischegärung (die Trauben gären zusammen mit den roten Beerenschalen, in denen die Farbstoffe sitzen).",
                    aVi: "Vang trắng sản xuất bằng Mostgärung (ép lấy nước nho trước rồi mới lên men). Vang đỏ sản xuất bằng Maischegärung (lên men cả xác vỏ nho để chiết xuất sắc tố đỏ và chất chát)."
                  },
                  {
                    q: "Was ist der Unterschied zwischen einem Roséwein, einem Weißherbst und einem Rotling?",
                    qVi: "Sự khác nhau giữa Roséwein, Weißherbst và Rotling là gì?",
                    a: "Roséwein wird nur aus roten Trauben hell gekeltert. Weißherbst ist ein deutscher Qualitäts-Roséwein aus 100 % einer einzigen roten Rebsorte. Rotling entsteht durch gemeinsames Keltern von weißen und roten Trauben.",
                    aVi: "Roséwein làm hoàn toàn từ nho đỏ nhưng ép lấy nước sớm. Weißherbst là vang hồng chất lượng cao của Đức làm từ 100 % một giống nho đỏ duy nhất. Rotling được ép chung từ cả nho trắng và nho đỏ."
                  }
                ]
              }
            ]
          },
          {
            id: "lf5-service-betrieb",
            badge: "LF 5 · 1. Jahr",
            title: "Service, Buffet & Kassensysteme",
            items: [
              {
                id: "bfk2-buffetregeln",
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>',
                name: "LS04 · Buffetregeln & Hygiene",
                desc: "Buffetaufbau nach Menüfolge · Kühlkette (≤ 7 °C) & Warmhalten (≥ 65 °C) · Hustenschutz",
                content: `<h2>Buffetregeln &amp; Lebensmittelhygiene (S. 56–59)</h2>
<div class="hint">LS04 · Aufbau eines Buffets · HACCP-Temperaturvorgaben (7 °C / 65 °C) · Spuckschutz</div>
<h3 class="sub">1. Grundregeln für den Buffetaufbau</h3>
<ul>
  <li>Tischtiefe mindestens <strong>70 cm</strong>; Verkleidung der Tischbeine mit bodenlangem <span class="term" data-de="das Skirting, -s" data-vi="vải quây chân bàn buffet">Skirting</span> und <span class="term" data-de="das Molton" data-vi="lớp vải lót mặt bàn chống trượt/ồn">Molton</span> als Unterlage.</li>
  <li>Anordnung nach der klassischen <span class="term" data-de="die Menüfolge" data-vi="trình tự món trong thực đơn">Menüfolge</span> in Laufrichtung der Gäste: Teller → kalte Vorspeisen &amp; Salate → Suppen → warme Hauptgerichte mit Beilagen → Desserts &amp; Käse → Brot &amp; Besteck.</li>
  <li><span class="term" data-de="das Vorlagebesteck" data-vi="dụng cụ gắp thức ăn chung">Vorlagebesteck</span> (Vorlegegabel und Vorlegelöffel) griffbereit am unteren Plattenrand platzieren; Schilder zur Speisen- und Allergenkennzeichnung aufstellen.</li>
</ul>
<div class="vi"><b>Quy tắc dựng bàn Buffet:</b> Bàn sâu tối thiểu 70 cm, có lót vải <i>Molton</i> và quây chân bàn bằng <i>Skirting</i>. Sắp xếp món theo đúng trình tự thực đơn (<i>Menüfolge</i>): Đĩa → Khai vị lạnh &amp; Salad → Súp → Món chính nóng → Tráng miệng &amp; Phô mai → Bánh mì &amp; Dao nĩa, kèm bảng tên món và nhãn dị ứng.</div>

<h3 class="sub">2. Temperatur- und Hygienevorschriften am Buffet (HACCP)</h3>
<table>
  <tr><th>Bereich</th><th>Verbindliche Vorgabe</th></tr>
  <tr><td><strong>Kalte Speisen (Kühlbereich)</strong></td><td>Durchgehend bei <strong>&le; +7 °C</strong> kühlhalten (Hackfleisch/Fisch noch kühler auf Eis/Kühlplatten).</td></tr>
  <tr><td><strong>Warme Speisen (Warmhaltebereich)</strong></td><td>Im Chafing Dish oder Bain-Marie konstant bei <strong>&ge; +65 °C</strong> für maximal 3 Stunden warmhalten.</td></tr>
  <tr><td><strong>Standzeit &amp; Reste</strong></td><td>Ungekühlte Speisen nach spätestens 2–3 Stunden <span class="term" data-de="entsorgen" data-vi="tiêu hủy / bỏ đi">entsorgen</span>; alte Platten niemals auf frische Speisen umschütten!</td></tr>
  <tr><td><strong>Infektionsschutz</strong></td><td>Offene Speisen am Buffet müssen durch einen <span class="term" data-de="der Hustenschutz" data-vi="vách kính chắn ho / bắn vi khuẩn">Hustenschutz / Spuckschutz</span> geschützt sein.</td></tr>
</table>
<div class="vi"><b>Quy định nhiệt độ &amp; vệ sinh tại quầy Buffet:</b> Món lạnh phải giữ <b>&le; +7 °C</b>; món nóng giữ liên tục <b>&ge; +65 °C</b> trong khay <i>Chafing Dish</i>. Thực phẩm đã mang ra quầy Buffet quá 2–3 giờ phải hủy bỏ (<i>entsorgen</i>), tuyệt đối không trộn đồ cũ vào khay mới, và phải có kính chắn giọt bắn (<i>Hustenschutz / Spuckschutz</i>).</div>`,
                qa: [
                  {
                    q: "Welche Temperaturvorgaben gelten am Buffet für kalte und warme Speisen?",
                    qVi: "Quy định nhiệt độ bắt buộc tại quầy Buffet đối với món lạnh và món nóng là bao nhiêu?",
                    a: "Kalte Speisen müssen bei maximal +7 °C gekühlt werden; warme Speisen müssen durchgehend bei mindestens +65 °C warmgehalten werden.",
                    aVi: "Món lạnh phải được bảo quản ở mức tối đa +7 °C; món nóng phải được giữ nóng liên tục ở mức tối thiểu +65 °C."
                  },
                  {
                    q: "Welche Hygieneregeln gelten beim Nachlegen von Speisen am Buffet?",
                    qVi: "Quy tắc vệ sinh nào áp dụng khi bổ sung thêm thức ăn ra quầy Buffet?",
                    a: "Immer komplett frische Platten und sauberes Vorlagebesteck einsetzen; Reste alter Platten dürfen niemals auf frische Platten umgefüllt werden. Zudem ist ein Hustenschutz Pflicht.",
                    aVi: "Luôn thay khay mới hoàn toàn kèm dụng cụ gắp sạch; tuyệt đối không đổ thức ăn thừa từ khay cũ sang khay mới và phải có kính chắn giọt bắn (Hustenschutz)."
                  }
                ]
              },
              {
                id: "bfk2-kalkulation",
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M8 6h8"/><path d="M8 10h.01"/><path d="M12 10h.01"/><path d="M16 10h.01"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>',
                name: "LS13 · Bedarfe und Materialkosten berechnen",
                desc: "Sonntagsbrunch für 72 Gäste · Standardrezepturen · Umrechnungsfaktor & Materialpreis",
                content: `<h2>Bedarfe und Materialkosten berechnen (S. 60–64)</h2>
<div class="hint">LS13 · Mengen- und Materialkostenberechnung für ein Brunch-Buffet (72 Personen)</div>
<h3 class="sub">1. Umrechnungsfaktor für Standardrezepturen</h3>
<p>Für einen <em>Sonntagsbrunch</em> mit <strong>72 Gästen</strong> werden die benötigten Rohstoffmengen anhand einer <span class="term" data-de="die Standardrezeptur" data-vi="công thức chế biến tiêu chuẩn">Standardrezeptur</span> (z. B. für 4, 6 oder 10 Personen) umgerechnet.</p>
<div class="formula">
  Umrechnungsfaktor = Gewünschte Portionszahl ÷ Portionszahl der Rezeptur<br>
  Beispiel (Rezept für 6 Personen, Bedarf für 72 Gäste): Faktor = 72 ÷ 6 = 12
</div>
<div class="vi"><b>Công thức tính hệ số quy đổi (Umrechnungsfaktor):</b> Lấy số khách thực tế (72) chia cho số suất gốc trong công thức chuẩn (<i>Standardrezeptur</i>). Ví dụ công thức gốc cho 6 người → Hệ số = 72 ÷ 6 = 12 (nhân toàn bộ nguyên liệu lên 12 lần).</div>

<h3 class="sub">2. Berechnung des Materialpreises (Wareneinsatz) je Portion</h3>
<div class="formula">
  <span class="term" data-de="der Materialpreis" data-vi="chi phí nguyên vật liệu / giá vốn">Materialpreis je Portion</span> = Gesamte Materialkosten (alle Zutaten) ÷ Anzahl der Portionen (72)
</div>
<p>Typische Prüfungsgerichte im Kalkulationsbogen: <em>Rührei mit Speck und <span class="term" data-de="der Schnittlauch" data-vi="hành hoa / hành lá">Schnittlauch</span></em>, <em><span class="term" data-de="die Kirschkaltschale" data-vi="súp anh đào chua lạnh">Kirschkaltschale</span></em> sowie <em><span class="term" data-de="der Rinderschmorbraten" data-vi="món thịt bò om kiểu Đức">Rinderschmorbraten</span></em>.</p>
<div class="vi"><b>Tính chi phí nguyên vật liệu (Materialpreis) cho 1 khẩu phần:</b> Cộng tổng tiền nguyên liệu của tất cả thành phần rồi chia cho tổng số suất (72).</div>`,
                qa: [
                  {
                    q: "Eine Standardrezeptur ist für 6 Personen ausgelegt. Wie berechnen Sie die Zutatenmenge für 72 Brunch-Gäste?",
                    qVi: "Một công thức chuẩn được viết cho 6 người. Làm thế nào để tính lượng nguyên liệu cho 72 khách?",
                    a: "Man berechnet den Umrechnungsfaktor: 72 geteilt durch 6 ergibt den Faktor 12. Anschließend wird jede Zutat der Rezeptur mit 12 multipliziert.",
                    aVi: "Tính hệ số quy đổi: 72 chia 6 bằng 12. Sau đó nhân khối lượng của từng nguyên liệu trong công thức với 12."
                  },
                  {
                    q: "Wie berechnet man den Materialpreis (Wareneinsatz) für eine einzelne Portion?",
                    qVi: "Làm thế nào để tính giá vốn nguyên liệu (Materialpreis) cho 1 suất ăn?",
                    a: "Man addiert die Einkaufskosten aller benötigten Zutaten (Gesamtmaterialkosten) und teilt diese Summe durch die Anzahl der hergestellten Portionen.",
                    aVi: "Cộng tổng chi phí mua tất cả nguyên liệu cần dùng (Gesamtmaterialkosten) rồi chia cho tổng số khẩu phần chế biến được."
                  }
                ]
              },
              {
                id: "bfk2-kassensysteme",
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
                name: "LS10 · Kassensysteme im Gastgewerbe (POS)",
                desc: "Anforderungen der Beteiligten · TSE-Pflicht & Belegausgabepflicht · Kassenbuch",
                content: `<h2>Kassensysteme im Gastgewerbe / POS (S. 65–67)</h2>
<div class="hint">LS10 · Point-of-Sale-Systeme (POS) · Anforderungen · TSE-Pflicht &amp; Kassenbuch</div>
<h3 class="sub">1. Anforderungen an ein modernes POS-Kassensystem</h3>
<ul>
  <li><strong>Geschäftsführung:</strong> Tagesaktuelle Umsatzstatistiken, Renner-Penner-Analysen und Warenwirtschaftsanbindung.</li>
  <li><strong>Service &amp; Küche:</strong> Schnelle mobile <span class="term" data-de="die Bonierung" data-vi="việc nhập đơn hàng / in bon bếp">Bonierung</span> am Tisch, Funkbonierung direkt an den <span class="term" data-de="der Küchenmonitor" data-vi="màn hình hiển thị order trong bếp">Küchenmonitor</span> oder Bondrucker, einfaches Rechnungssplitten.</li>
  <li><strong>Finanzamt (Kassensicherungsverordnung):</strong> Manipulationssichere Aufzeichnung durch eine zertifizierte <span class="term" data-de="die Technische Sicherheitseinrichtung (TSE)" data-vi="thiết bị an toàn kỹ thuật chống gian lận thuế">Technische Sicherheitseinrichtung (TSE)</span> sowie Belegausgabepflicht.</li>
  <li><strong>Steuerberatung &amp; Buchhaltung:</strong> Exportfähiges elektronisches <span class="term" data-de="das Kassenbuch" data-vi="sổ quỹ tiền mặt">Kassenbuch</span>, korrekte Umsatzsteuersätze (7 % / 19 %) und Arbeitszeiterfassung (<span class="term" data-de="die Zeiterfassung" data-vi="chấm công giờ làm việc">Zeiterfassung</span>).</li>
</ul>
<div class="vi"><b>Yêu cầu đối với hệ thống máy tính tiền POS:</b> Quản lý cần xem báo cáo doanh thu tức thời; Phục vụ &amp; Bếp cần nhập order di động (<i>Bonierung</i>), tách hóa đơn nhanh và truyền thẳng xuống màn hình bếp (<i>Küchenmonitor</i>); Cơ quan thuế (<i>Finanzamt</i>) bắt buộc phải có thiết bị bảo mật chống sửa dữ liệu <b>TSE</b> và xuất biên lai cho khách.</div>

<h3 class="sub">2. Systemvergleich im Unterricht (Orderfix vs. Gastrohero)</h3>
<table>
  <tr><th>Kassensystem</th><th>Besondere Stärken</th></tr>
  <tr><td><strong>Orderfix</strong></td><td>Mobiles Handterminal, schnelles Splitten von Rechnungen am Tisch, integrierte Gutschein- und Rabattverwaltung.</td></tr>
  <tr><td><strong>Gastrohero</strong></td><td>Echtzeit-Küchenmonitor, integrierte Personal-<span class="term" data-de="die Zeiterfassung" data-vi="chấm công giờ làm việc">Zeiterfassung</span>, automatische Bestandsbuchung im Lager.</td></tr>
</table>
<div class="vi"><b>So sánh 2 hệ thống POS mẫu:</b> <b>Orderfix</b> mạnh về thiết bị cầm tay order tại bàn, tách hóa đơn và quản lý voucher; <b>Gastrohero</b> mạnh về màn hình bếp thời gian thực, chấm công nhân viên và trừ kho tự động.</div>`,
                qa: [
                  {
                    q: "Was bedeutet die Abkürzung TSE bei Kassensystemen und warum ist sie gesetzlich vorgeschrieben?",
                    qVi: "TSE trong hệ thống máy tính tiền là viết tắt của từ gì và tại sao pháp luật lại bắt buộc?",
                    a: "TSE steht für Technische Sicherheitseinrichtung. Sie speichert alle Kassenvorgänge manipulationssicher für das Finanzamt, um Steuerhinterziehung zu verhindern.",
                    aVi: "TSE là viết tắt của Technische Sicherheitseinrichtung (Thiết bị an toàn kỹ thuật). Thiết bị này lưu trữ mọi giao dịch không thể chỉnh sửa để cơ quan thuế kiểm tra, chống gian lận thuế."
                  },
                  {
                    q: "Welche Vorteile bietet ein mobiles Funk-Kassensystem für den Serviceablauf?",
                    qVi: "Hệ thống máy order cầm tay không dây mang lại những lợi ích gì cho quy trình phục vụ?",
                    a: "Bestellungen werden direkt am Tisch aufgenommen und sofort an Küche und Schankbüfett übermittelt. Das spart Laufwege, verkürzt Wartezeiten, vermeidet Übertragungsfehler und erleichtert das Splitten der Rechnung.",
                    aVi: "Đơn hàng được nhập ngay tại bàn và truyền tức thì xuống bếp/quầy bar, giúp tiết kiệm thời gian di chuyển, giảm thời gian chờ của khách, tránh nhầm lẫn và tách hóa đơn dễ dàng."
                  }
                ]
              },
              {
                id: "bfk2-verkaufsfoerderung",
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>',
                name: "LS19 · Verkaufsfördernde Maßnahmen im Service",
                desc: "Verkaufsförderung (Sales Promotion) · Corporate Design · Eye-Catcher · Analog & Digital",
                content: `<h2>Verkaufsfördernde Maßnahmen im Service (S. 68–69)</h2>
<div class="hint">LS19 · Verkaufsförderung · Gestaltung von Werbemitteln · Tischaufsteller, Flyer &amp; Social Media</div>
<h3 class="sub">1. Ziele der Verkaufsförderung (<span class="term" data-de="die Verkaufsförderung" data-vi="xúc tiến bán hàng / sales promotion">Verkaufsförderung</span>)</h3>
<p>Zeitlich begrenzte Aktionen steigern den Umsatz, gewinnen Neugäste und erhöhen den Durchschnittsbon (z. B. saisonale <span class="term" data-de="die Aktionswoche" data-vi="tuần lễ chương trình khuyến mãi/chủ đề">Aktionswochen</span> wie Spargel- oder Wildwochen, Happy Hour, Degustationsmenüs oder ein <span class="term" data-de="das Gewinnspiel" data-vi="trò chơi dự thưởng / minigame">Gewinnspiel</span>).</p>
<div class="vi"><b>Mục tiêu xúc tiến bán hàng (Verkaufsförderung):</b> Các chiến dịch ngắn hạn giúp kích cầu doanh số, thu hút khách mới và tăng giá trị hóa đơn trung bình (VD: tuần lễ món theo mùa <i>Aktionswoche</i>, <i>Happy Hour</i>, minigame trúng thưởng).</div>

<h3 class="sub">2. Sieben Grundsätze für wirksame Werbemittel</h3>
<ol>
  <li><strong>Der Kern (<span class="term" data-de="der Eye-Catcher" data-vi="điểm nhấn thu hút ánh nhìn">Eye-Catcher</span>):</strong> Die Hauptbotschaft muss in wenigen Sekunden Aufmerksamkeit wecken (AIDA-Formel: Attention – Interest – Desire – Action).</li>
  <li><strong>Corporate Design:</strong> Einheitliche Verwendung von Logo, Hausfarben und Schriftarten des Betriebs.</li>
  <li><strong>Zielgruppengerechte Ansprache:</strong> Passender Sprachstil („Sie“ im klassischen Restaurant, „Du“ im jungen Szenecafé) und kurzer Slogan.</li>
  <li><strong>Analoge &amp; digitale Kanäle kombinieren:</strong> <span class="term" data-de="der Tischaufsteller" data-vi="menu/biển quảng cáo dựng trên bàn">Tischaufsteller</span>, <span class="term" data-de="der Flyer" data-vi="tờ rơi quảng cáo">Flyer</span>, Kreidetafeln mit <span class="term" data-de="das Handlettering" data-vi="nghệ thuật viết chữ bằng tay">Handlettering</span> sowie QR-Codes, Website und Social-Media-Posts.</li>
</ol>
<div class="vi"><b>Nguyên tắc thiết kế ấn phẩm quảng cáo:</b> (1) Có điểm nhấn thu hút ánh nhìn ngay lập tức (<i>Eye-Catcher</i> theo mô hình AIDA); (2) Đồng bộ nhận diện thương hiệu (<i>Corporate Design</i>: logo, màu sắc, phông chữ); (3) Ngôn từ phù hợp đối tượng khách hàng; (4) Kết hợp kênh truyền thống (<i>Tischaufsteller, Flyer, bảng phấn Handlettering</i>) với kênh số (QR-Code, mạng xã hội).</div>`,
                qa: [
                  {
                    q: "Nennen Sie vier Beispiele für verkaufsfördernde Maßnahmen in einem Restaurant!",
                    qVi: "Hãy nêu 4 ví dụ về các biện pháp xúc tiến bán hàng trong nhà hàng!",
                    a: "1. Saisonale Aktionswochen (z. B. Spargelwochen). 2. Tischaufsteller und Kreidetafeln für Tagesempfehlungen. 3. Aktive Zusatzempfehlung durch den Service (Aperitif, Dessert, Espresso). 4. Social-Media-Aktionen oder Gutscheine.",
                    aVi: "1. Tuần lễ ẩm thực theo mùa (Aktionswochen). 2. Biển dựng trên bàn (Tischaufsteller) và bảng phấn giới thiệu món đặc biệt trong ngày. 3. Nhân viên chủ động gợi ý bán thêm (khai vị, tráng miệng, cà phê). 4. Chương trình trên mạng xã hội hoặc phiếu giảm giá."
                  },
                  {
                    q: "Worauf muss bei der optischen Gestaltung eines Tischaufstellers oder Flyers geachtet werden?",
                    qVi: "Khi thiết kế hình thức cho biển để bàn (Tischaufsteller) hoặc tờ rơi (Flyer) cần lưu ý điều gì?",
                    a: "Ein klarer Eye-Catcher, übersichtliche Struktur (wenig Text, große Schrift), Einhaltung des Corporate Designs (Logo, Farben, Schriftart) und zielgruppengerechte Sprache.",
                    aVi: "Có điểm nhấn bắt mắt (Eye-Catcher), bố cục rõ ràng ngắn gọn dễ đọc, tuân thủ bộ nhận diện thương hiệu (Corporate Design) và ngôn ngữ phù hợp với tệp khách hàng."
                  }
                ]
              }
            ]
          },
          {
            id: "fleisch",
            badge: "2. Jahr · Modul",
            title: "Fleisch & Küche",
            items: [
              {
                id: "fleischteile",
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="7" cy="9" r="1.6"/><circle cx="12" cy="7" r="1.6"/><circle cx="17" cy="9" r="1.6"/><path d="M5.5 13.5c0-1.5 3-2.5 6.5-2.5s6.5 1 6.5 2.5c0 2-1.5 4-3 4.5-1.5.5-2.5 1-3.5 1s-2-.5-3.5-1c-1.5-.5-3-2.5-3-4.5z"/></svg>',
                name: "Fleischteile & Garverfahren",
                desc: "Rind · Schwein · Schaf/Lamm · Gewebearten · Klassische Fleischgerichte",
                route: "#/bfk/2/fleisch",
                content: `<h2>Fleischteile &amp; Garverfahren</h2>
<div class="hint">Rind · Schwein · Schaf/Lamm · Gewebearten · Klassische Gerichte</div>
<p><button class="btn" type="button" onclick="go('#/bfk/2/fleisch')">Interaktives Modul öffnen →</button></p>
<h3 class="sub">1. Wichtige Teilstücke vom Rind</h3>
<table>
  <tr><th>Teilstück</th><th>Eigenschaft &amp; Verwendung</th></tr>
  <tr><td><span class="term" data-de="Filet" data-vi="thăn nội">Filet</span> (Lende)</td><td>Zartestes, bindegewebsärmstes Teilstück → Kurzbraten, Grillen (Chateaubriand, Tournedos, Filetsteak, Medaillons).</td></tr>
  <tr><td><span class="term" data-de="Roastbeef" data-vi="thăn ngoại / roastbeef">Roastbeef</span> (Rücken)</td><td>Sehr zart mit Fettrand → Kurzbraten (Rumpsteak, Entrecôte, Zwiebelrostbraten) oder Braten am Stück.</td></tr>
  <tr><td><span class="term" data-de="Hesse" data-vi="bắp giò / ống chân">Hesse</span> (Beinscheibe)</td><td>Reich an Bindegewebe (Kollagen) → Kochen (Kraftbrühe) und Schmoren (Osso Buco vom Kalb).</td></tr>
</table>
<div class="vi"><b>Các phần thịt bò quan trọng:</b> <b>Filet</b> (thăn nội) mềm nhất, ít mô liên kết nhất → áp chảo/nướng nhanh; <b>Roastbeef</b> (thăn ngoại) → làm steak hoặc Zwiebelrostbraten; <b>Hesse</b> (bắp giò) nhiều gân/kollagen → hầm nước dùng hoặc om (Osso Buco).</div>

<h3 class="sub">2. Gewebearten &amp; passende Garverfahren</h3>
<table>
  <tr><th>Gewebeart</th><th>Verhalten beim Erhitzen</th><th>Geeignetes Garverfahren</th></tr>
  <tr><td><span class="term" data-de="Muskelgewebe" data-vi="mô cơ">Muskelgewebe</span></td><td>Eiweiß gerinnt ab ca. 60 °C, gibt Fleischsaft ab</td><td>Kurzbraten, Grillen, Braten (bei zarten Stücken mit wenig Bindegewebe)</td></tr>
  <tr><td><span class="term" data-de="Bindegewebe" data-vi="mô liên kết">Bindegewebe</span> (Kollagen &amp; Elastin)</td><td>Kollagen quillt in feuchter Hitze und wandelt sich in weiche <span class="term" data-de="Gelatine" data-vi="gelatin">Gelatine</span> um; gelbes Elastin (Sehnen) bleibt zäh</td><td>Schmoren, Kochen, Dünsten (langsam &amp; mit Flüssigkeit)</td></tr>
  <tr><td><span class="term" data-de="Fettgewebe" data-vi="mô mỡ">Fettgewebe</span> (Marmorierung)</td><td>Schmilzt beim Erhitzen → hält das Fleisch saftig und ist Geschmacksträger</td><td>Braten, Grillen, Schmoren</td></tr>
</table>
<div class="note"><b>Merksatz:</b> <b>Viel Bindegewebe → langsam &amp; feucht garen</b> (Kochen, Schmoren). <b>Wenig Bindegewebe → schnell &amp; trocken garen</b> (Kurzbraten, Grillen).</div>
<div class="vi"><b>Quy tắc chọn phương pháp chế biến theo mô thịt:</b> Thịt <b>nhiều mô liên kết (Bindegewebe)</b> phải nấu <b>chậm và có nước</b> (luộc, hầm, om) để Kollagen chuyển hóa thành Gelatine mềm. Thịt <b>ít mô liên kết (nhiều mô cơ mềm)</b> chế biến <b>nhanh bằng nhiệt khô</b> (áp chảo, nướng).</div>

<h3 class="sub">3. Durchschnittliche Zusammensetzung von Schlachtfleisch</h3>
<table>
  <tr><th>Inhaltsstoff</th><th>Anteil (ca.)</th></tr>
  <tr><td>Wasser</td><td>ca. 70–75 %</td></tr>
  <tr><td><span class="term" data-de="Eiweiß" data-vi="đạm / protein">Eiweiß</span> (Protein)</td><td>ca. 20 %</td></tr>
  <tr><td>Fett</td><td>ca. 3–8 % (je nach Tierart und Teilstück)</td></tr>
  <tr><td>Mineralstoffe (Eisen, Zink) &amp; B-Vitamine</td><td>ca. 1 %</td></tr>
</table>
<div class="formula">Die 4 wichtigsten Schlachtsäugetiere in Deutschland: Rind, Schwein, Schaf, Ziege</div>

<h3 class="sub">4. Klassische Fleischgerichte (Prüfungswissen)</h3>
<ul>
  <li><span class="term" data-de="Wiener Schnitzel" data-vi="schnitzel kiểu Wien">Wiener Schnitzel</span>: dünnes Kalbsschnitzel aus der Keule (Oberschale), klassisch paniert (Mehl – Ei – Semmelbrösel).</li>
  <li><span class="term" data-de="Cordon bleu" data-vi="cordon bleu">Cordon bleu</span>: Kalbs- oder Schweineschnitzel, gefüllt mit gekochtem Schinken und schmelzendem Käse, paniert.</li>
  <li><span class="term" data-de="Saltimbocca" data-vi="saltimbocca">Saltimbocca alla romana</span>: Kalbsschnitzel mit Parmaschinken und frischem Salbeiblatt, in Butter und Weißwein gebraten.</li>
  <li><span class="term" data-de="Osso Buco" data-vi="osso buco">Osso Buco</span>: geschmorte Kalbshaxenscheiben mit Wurzelgemüse, Tomaten und Gremolata.</li>
  <li><span class="term" data-de="Vitello tonnato" data-vi="thịt bê sốt cá ngừ">Vitello tonnato</span>: dünn aufgeschnittenes, gekochtes Kalbfleisch, kalt serviert mit Thunfisch-Kapern-Sauce.</li>
  <li><span class="term" data-de="Szegediner Gulasch" data-vi="gulasch Szeged">Szegediner Gulasch</span>: Schweinegulasch mit Sauerkraut, Paprika und saurer Sahne.</li>
  <li><span class="term" data-de="Irish Stew" data-vi="stew Ireland">Irish Stew</span>: Eintopf aus Lamm-/Hammelfleisch, Weißkohl, Kartoffeln und Zwiebeln.</li>
  <li><span class="term" data-de="Moussaka" data-vi="moussaka">Moussaka</span>: griechischer Auflauf aus Lammhackfleisch, Auberginen, Kartoffeln, Tomaten und Béchamelsauce.</li>
</ul>
<div class="vi"><b>Các món thịt kinh điển cần nhớ:</b> <i>Wiener Schnitzel</i> (thịt bê tẩm bột chiên); <i>Cordon bleu</i> (cuộn dăm bông + phô mai); <i>Saltimbocca</i> (thịt bê + đùi heo Parma + lá xô thơm Salbei); <i>Osso Buco</i> (bắp giò bê cắt khoanh hầm); <i>Vitello tonnato</i> (thịt bê nguội rưới xốt cá ngừ); <i>Szegediner Gulasch</i> (gulasch heo nấu dưa cải chua Sauerkraut + kem chua); <i>Irish Stew</i> (cừu hầm bắp cải và khoai tây); <i>Moussaka</i> (thịt cừu băm đút lò với cà tím).</div>

<h3 class="sub">5. Alters- und Geschlechtsbezeichnungen beim Schaf</h3>
<table>
  <tr><th>Bezeichnung</th><th>Bedeutung</th></tr>
  <tr><td><strong>Milchlamm / Mastlamm</strong></td><td>Jungtier bis zu 6 bzw. 12 Monaten (besonders zartes Fleisch)</td></tr>
  <tr><td><strong>Schaf</strong></td><td>Weibliches Tier ab 1 Jahr</td></tr>
  <tr><td><strong>Bock (Widder)</strong></td><td>Männliches, unverschnittenes Tier ab 1 Jahr</td></tr>
  <tr><td><span class="term" data-de="Hammel" data-vi="cừu đực thiến">Hammel</span></td><td>Kastriertes (verschnittenes) männliches Tier unter 2 Jahren</td></tr>
</table>
<div class="vi"><b>Phân loại cừu theo độ tuổi:</b> <b>Lamm</b> (cừu non dưới 1 năm tuổi), <b>Schaf</b> (cừu cái trên 1 năm), <b>Bock</b> (cừu đực giống), <b>Hammel</b> (cừu đực đã thiến).</div>`,
                qa: [
                  {
                    q: "Warum müssen bindegewebsreiche Fleischstücke langsam und feucht gegart werden?",
                    qVi: "Tại sao các phần thịt có nhiều mô liên kết (Bindegewebe) phải được nấu chậm trong môi trường ẩm?",
                    a: "Weil das im Bindegewebe enthaltene Kollagen erst durch langes Erhitzen mit Flüssigkeit aufquillt und in wasserlösliche, weiche Gelatine umgewandelt wird, wodurch das Fleisch zart wird.",
                    aVi: "Vì chất Kollagen trong mô liên kết chỉ trương nở và chuyển hóa thành Gelatine mềm khi được đun lâu cùng chất lỏng, nhờ đó miếng thịt mới mềm ngon."
                  },
                  {
                    q: "Woraus bestehen ein klassisches Wiener Schnitzel, ein Saltimbocca und ein Vitello tonnato?",
                    qVi: "Món Wiener Schnitzel, Saltimbocca và Vitello tonnato cổ điển được làm từ nguyên liệu gì?",
                    a: "Wiener Schnitzel: paniertes Kalbsschnitzel (Mehl, Ei, Semmelbrösel). Saltimbocca: Kalbsschnitzel mit Parmaschinken und Salbei. Vitello tonnato: kaltes, dünn geschnittenes Kalbfleisch mit Thunfisch-Kapern-Sauce.",
                    aVi: "Wiener Schnitzel: thịt bê tẩm bột mì, trứng, vụn bánh mì chiên vàng. Saltimbocca: thịt bê áp chảo với thịt nguội Parma và lá xô thơm (Salbei). Vitello tonnato: thịt bê thái mỏng dùng lạnh với xốt cá ngừ và nụ bạch hoa."
                  }
                ]
              },
              {
                id: "kueche",
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="10" cy="15" r="5.5"/><path d="M15 15h6"/><path d="M8 15l2.5-3"/></svg>',
                name: "Küche & Ernährung",
                desc: "Physikalischer Brennwert · Eierkennzeichnung & Frische · Biologische Wertigkeit",
                route: "#/bfk/2/kueche",
                content: `<h2>Küche &amp; Ernährung</h2>
<div class="hint">Brennwertberechnung · Eiercode &amp; Lagerung · Biologische Wertigkeit von Eiweiß</div>
<p><button class="btn" type="button" onclick="go('#/bfk/2/kueche')">Interaktives Modul öffnen →</button></p>
<h3 class="sub">1. Energiegehalt der Nährstoffe (Brennwerte)</h3>
<table>
  <tr><th>Energieliefernder Nährstoff</th><th>Brennwert pro 1 Gramm</th></tr>
  <tr><td>Eiweiß (Proteine)</td><td><strong>17 kJ = 4 kcal</strong></td></tr>
  <tr><td>Kohlenhydrate</td><td><strong>17 kJ = 4 kcal</strong></td></tr>
  <tr><td>Fett (Lipide)</td><td><strong>37 kJ = 9 kcal</strong></td></tr>
</table>
<div class="formula">Energiewert (kJ) = (g Eiweiß × 17) + (g Kohlenhydrate × 17) + (g Fett × 37)<br>Umrechnung: 1 kcal ≈ 4,2 kJ</div>
<div class="vi"><b>Giá trị năng lượng (Brennwerte):</b> 1 g Đạm (Eiweiß) hoặc 1 g Tinh bột (Kohlenhydrate) cung cấp <b>17 kJ (4 kcal)</b>; 1 g Chất béo (Fett) cung cấp <b>37 kJ (9 kcal)</b>.</div>

<h3 class="sub">2. Eierkennzeichnung (Erzeugercode) &amp; Umgang mit Eiern</h3>
<p>Aufbau des Stempelcodes auf dem Ei: <b>Haltungsform – Herkunftsland – Betriebsnummer</b> (z. B. <code>1-DE-0812345</code>).</p>
<table>
  <tr><th>Ziffer</th><th>Haltungsform</th></tr>
  <tr><td><strong>0</strong></td><td><span class="term" data-de="Bio / Ökologisch" data-vi="chăn nuôi hữu cơ">Ökologische Erzeugung (Bio)</span></td></tr>
  <tr><td><strong>1</strong></td><td><span class="term" data-de="Freilandhaltung" data-vi="chăn nuôi thả vườn">Freilandhaltung</span></td></tr>
  <tr><td><strong>2</strong></td><td><span class="term" data-de="Bodenhaltung" data-vi="chăn nuôi trên nền chuồng">Bodenhaltung</span></td></tr>
  <tr><td><strong>3</strong></td><td><span class="term" data-de="Kleingruppenhaltung" data-vi="chăn nuôi lồng nhóm nhỏ">Kleingruppenhaltung (Käfighaltung)</span></td></tr>
</table>
<ul>
  <li><strong>Mindesthaltbarkeitsdatum (MHD):</strong> <b>28 Tage</b> ab dem Legedatum; Kühlung ab dem 18. Tag bei ca. <b>+5 °C bis +8 °C</b>.</li>
  <li><strong>Nach Ablauf des MHD:</strong> Eier dürfen nur noch <b>vollständig durcherhitzt</b> (mind. 70 °C im Kern) zum Backen und Kochen verwendet werden (Schutz vor <em>Salmonellen</em>).</li>
</ul>
<div class="vi"><b>Mã số đóng dấu trên trứng gà (Eiercode):</b> Số đầu tiên chỉ hình thức nuôi: <b>0</b> = Hữu cơ (Bio), <b>1</b> = Thả vườn (Freiland), <b>2</b> = Nuôi trên nền chuồng (Bodenhaltung), <b>3</b> = Nuôi lồng nhóm nhỏ (Kleingruppenhaltung). Hạn sử dụng (MHD) là <b>28 ngày</b> kể từ ngày đẻ; sau hạn MHD chỉ được dùng khi nấu chín kỹ hoàn toàn để diệt khuẩn Salmonella.</div>

<h3 class="sub">3. Biologische Wertigkeit (BW) von Proteinen</h3>
<div class="formula"><span class="term" data-de="Biologische Wertigkeit" data-vi="giá trị sinh học của đạm">Biologische Wertigkeit (BW)</span> = Wie viel Gramm körpereigenes Eiweiß aus 100 g Nahrungseiweiß gebildet werden kann.</div>
<table>
  <tr><th>Lebensmittel</th><th>Biologische Wertigkeit (BW)</th></tr>
  <tr><td><span class="term" data-de="Hühnerei" data-vi="trứng gà">Vollei / Hühnerei</span> (Referenzwert)</td><td><strong>100</strong></td></tr>
  <tr><td>Kartoffeln</td><td>95</td></tr>
  <tr><td>Rindfleisch</td><td>87</td></tr>
  <tr><td>Kuhmilch</td><td>86</td></tr>
  <tr><td>Sojabohnen</td><td>84</td></tr>
</table>
<div class="note"><b>Ergänzungswert:</b> Durch geschickte Kombination tierischer und pflanzlicher Eiweiße steigt die biologische Wertigkeit über 100 (z. B. <b>Kartoffeln + Ei = BW 136</b>, Getreide + Milch, Bohnen + Mais).</div>
<div class="vi"><b>Giá trị sinh học của đạm (Biologische Wertigkeit):</b> Cho biết từ 100 g đạm thực phẩm cơ thể tổng hợp được bao nhiêu gam đạm cơ thể. Trứng gà (<i>Hühnerei</i>) được lấy làm chuẩn = <b>100</b>. Khi kết hợp khoai tây + trứng gà, các axit amin bổ sung cho nhau giúp BW tăng lên tới <b>136</b>.</div>`,
                qa: [
                  {
                    q: "Wie lauten die vier Ziffern der Haltungsformen beim Eiercode?",
                    qVi: "4 chữ số ký hiệu hình thức chăn nuôi trong mã số trứng (Eiercode) có ý nghĩa gì?",
                    a: "0 = Ökologische Erzeugung (Bio), 1 = Freilandhaltung, 2 = Bodenhaltung, 3 = Kleingruppenhaltung.",
                    aVi: "0 = Chăn nuôi hữu cơ (Bio), 1 = Nuôi thả vườn (Freilandhaltung), 2 = Nuôi trên nền chuồng (Bodenhaltung), 3 = Nuôi lồng nhóm nhỏ (Kleingruppenhaltung)."
                  },
                  {
                    q: "Was versteht man unter der biologischen Wertigkeit (BW) von Eiweiß und warum kombiniert man Kartoffeln mit Ei?",
                    qVi: "Giá trị sinh học (Biologische Wertigkeit) của protein là gì và tại sao người ta kết hợp khoai tây với trứng?",
                    a: "Die biologische Wertigkeit gibt an, wie viel Gramm Körpereiweiß der Mensch aus 100 g Nahrungseiweiß aufbauen kann (Referenz Vollei = 100). Durch die Kombination von Kartoffeln und Ei ergänzen sich die unentbehrlichen Aminosäuren optimal (Ergänzungswert: BW 136).",
                    aVi: "Giá trị sinh học cho biết cơ thể tạo ra được bao nhiêu gam protein từ 100 g protein thực phẩm (chuẩn trứng gà = 100). Kết hợp khoai tây với trứng giúp các axit amin thiết yếu bổ khuyết cho nhau, nâng giá trị sinh học lên 136."
                  }
                ]
              }
            ]
          },
          {
            id: "fisch-warenkunde",
            badge: "2. Jahr · Warenkunde",
            title: "Fisch — Warenkunde & Zubereitung",
            items: [
              {
                id: "fisch-warenkunde",
qa: [
                  {
                    q: "Wie unterscheidet man Rundfische und Plattfische nach dem Filetier-Ertrag?",
                    qVi: "Phân biệt cá thân tròn (Rundfische) và cá thân dẹt (Plattfische) theo số lượng phi-lê thu được như thế nào?",
                    a: "<b>Rundfische</b> (z. B. Lachs, Kabeljau, Forelle, Zander) liefern beim Filetieren <b>2 Filets</b> (links und rechts der Mittelgräte). <b>Plattfische</b> (z. B. Seezunge, Scholle, Steinbutt) liefern <b>4 Filets</b> (2 auf der dunklen Oberseite, 2 auf der hellen Blindseite).",
                    aVi: "<b>Rundfische</b> (VD: cá hồi, cá tuyết, cá rô phi) khi phi-lê cho <b>2 miếng phi-lê</b>. <b>Plattfische</b> (VD: cá bơn Seezunge, Scholle, Steinbutt) cho <b>4 miếng phi-lê</b>."
                  },
                  {
                    q: "Welche Frischemerkmale weist ein absolut frischer Speisefisch auf?",
                    qVi: "Cá thực phẩm tươi sống hoàn hảo có những dấu hiệu nhận biết độ tươi nào?",
                    a: "1. <b>Augen:</b> klar, prall und nach außen gewölbt.<br>2. <b>Kiemen:</b> leuchtend hellrot, feucht, ohne Schleim.<br>3. <b>Haut:</b> glänzend mit klarem Schleim, Schuppen sitzen fest.<br>4. <b>Fleisch:</b> fest und elastisch.<br>5. <b>Geruch:</b> frisch nach Meer oder Algen, niemals fischig oder nach Ammoniak.",
                    aVi: "1. <b>Mắt:</b> trong suốt, căng phồng lồi ra ngoài.<br>2. <b>Mang:</b> đỏ tươi sáng, ẩm.<br>3. <b>Da:</b> sáng bóng, vảy bám chặt.<br>4. <b>Thịt:</b> săn chắc, đàn hồi.<br>5. <b>Mùi:</b> thơm mát mùi biển/tảo, không tanh khai."
                  },
                  {
                    q: "Wie lauten die drei Schritte der klassischen 3-S-Regel bei der Fischvorbereitung?",
                    qVi: "Ba bước trong quy tắc 3-S cổ điển khi sơ chế cá là gì?",
                    a: "<b>Säubern</b> (Waschen, Schuppen, Ausnehmen) → <b>Säuern</b> (mit Zitronensaft beträufeln zur Eiweißfestigung und Geruchsbindung) → <b>Salzen</b> (erst unmittelbar vor dem Garen salzen, damit das Fischfleisch keinen Saft verliert).",
                    aVi: "<b>Säubern</b> (Làm sạch) → <b>Säuern</b> (Ướp chanh làm săn và khử mùi) → <b>Salzen</b> (Muối ngay trước khi nấu để cá không chảy nước)."
                  }
                ],
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.46-3.44 6-7 6-3.56 0-7.56-2.54-8.5-6z"/><path d="M18 10v4"/><path d="M2 16l4.5-4L2 8"/></svg>',
                name: "Fisch — Warenkunde & Zubereitung",
                desc: "§1 Einteilung · §2 Inhaltsstoffe · §3 Frischemerkmale · §4 Konservierung · §5 Kaviar · §6 Gerichte & Wein · §7 Bildtafel (15 Speisefische)",
                vokabeln: [
          {
                    "de": "Wanderfische",
                    "vi": "cá di cư"
          },
          {
                    "de": "Flussaal",
                    "vi": "lươn sông"
          },
          {
                    "de": "Laichen",
                    "vi": "đẻ trứng (cá)"
          },
          {
                    "de": "Plattfische",
                    "vi": "cá thân bẹt (hai mắt cùng 1 bên)"
          },
          {
                    "de": "Rundfische",
                    "vi": "cá thân tròn / hình thoi"
          },
          {
                    "de": "Hecht",
                    "vi": "cá măng sông (mõm dài)"
          },
          {
                    "de": "Karpfen",
                    "vi": "cá chép (có râu mép)"
          },
          {
                    "de": "Bartfäden",
                    "vi": "râu mép cá chép"
          },
          {
                    "de": "Zander",
                    "vi": "cá vược sông (gai nắp mang)"
          },
          {
                    "de": "Kiemendeckel",
                    "vi": "nắp mang cá"
          },
          {
                    "de": "Fettfisch",
                    "vi": "cá béo (> 10 % chất béo)"
          },
          {
                    "de": "Magerfisch",
                    "vi": "cá nạc (< 10 % chất béo)"
          },
          {
                    "de": "Eiweißanteil",
                    "vi": "hàm lượng đạm (protein)"
          },
          {
                    "de": "Fettanteil",
                    "vi": "hàm lượng chất béo"
          },
          {
                    "de": "Jod",
                    "vi": "khoáng chất i-ốt"
          },
          {
                    "de": "Omega-3",
                    "vi": "axit béo omega-3 không bão hòa"
          },
          {
                    "de": "Halbkonserven",
                    "vi": "bán đồ hộp"
          },
          {
                    "de": "Vollkonserven",
                    "vi": "đồ hộp hoàn toàn"
          },
          {
                    "de": "Bückling",
                    "vi": "cá trích nguyên con có đầu hun nóng"
          },
          {
                    "de": "Schillerlocken",
                    "vi": "lườn bụng cá nhám cuộn hun nóng"
          },
          {
                    "de": "osmotischer Druck",
                    "vi": "áp suất thẩm thấu"
          },
          {
                    "de": "Matjeshering",
                    "vi": "cá trích trẻ muối nhẹ lên men lactic"
          },
          {
                    "de": "Stockfisch",
                    "vi": "cá tuyết phơi khô không muối"
          },
          {
                    "de": "Klippfisch",
                    "vi": "cá tuyết muối trước rồi phơi khô"
          },
          {
                    "de": "Bismarckhering",
                    "vi": "phi lê cá trích ngâm giấm"
          },
          {
                    "de": "Rollmops",
                    "vi": "cá trích cuộn dưa chuột ngâm giấm"
          },
          {
                    "de": "Stör",
                    "vi": "cá tầm (sản xuất Kaviar thật)"
          },
          {
                    "de": "Kaviar",
                    "vi": "trứng cá tầm muối"
          },
          {
                    "de": "Müllerin Art",
                    "vi": "kiểu bà chủ cối xay (lăn bột mì chiên bơ)"
          },
          {
                    "de": "Forelle blau",
                    "vi": "cá hồi luộc nước giấm nhẹ giữ màu xanh bạc"
          },
          {
                    "de": "Renke",
                    "vi": "cá Renke hồ Bodensee"
          },
          {
                    "de": "Vitello tonnato",
                    "vi": "thịt bê lát lạnh sốt cá ngừ"
          },
          {
                    "de": "Müller-Thurgau",
                    "vi": "rượu vang trắng Müller-Thurgau"
          },
          {
                    "de": "Weißburgunder",
                    "vi": "rượu vang trắng Pinot Blanc"
          },
          {
                    "de": "Chardonnay",
                    "vi": "rượu vang trắng Chardonnay"
          },
          {
                    "de": "Viognier",
                    "vi": "rượu vang trắng Viognier"
          },
          {
                    "de": "Knurrhahn",
                    "vi": "cá chào mào biển"
          },
          {
                    "de": "Rochen",
                    "vi": "cá đuối"
          },
          {
                    "de": "Seelachs",
                    "vi": "cá tuyết đen"
          },
          {
                    "de": "Kabeljau",
                    "vi": "cá tuyết Đại Tây Dương"
          },
          {
                    "de": "Rotbarsch",
                    "vi": "cá vược đỏ"
          },
          {
                    "de": "Schellfisch",
                    "vi": "cá tuyết chấm đen"
          },
          {
                    "de": "Seeteufel",
                    "vi": "cá mặt quỷ"
          }
],
                content: `<style>

/* ===== DESIGN TOKENS =====
  ink    #1B1F2A  primary text / spine
  paper  #F1ECDE  parchment ground
  wax    #7A2E2E  paragraph seal / DE accent
  brass  #9C7A3C  rule / numerals
  slate  #48586B  VI translation voice
  line   #D8CFB8  hairline
*/
.fisch-skript-wrap {
  --ink:#1B1F2A; --paper:#F1ECDE; --paper2:#EAE3D0; --wax:#7A2E2E;
  --brass:#9C7A3C; --slate:#48586B; --line:#D8CFB8; --slateline:#c7d0da;
  --green:#5b7a52; --greenbg:#eef3ea;
}

.fisch-skript-wrap, .fisch-skript-wrap * {box-sizing:border-box;}

.fisch-skript-wrap {scroll-behavior:smooth;}

.fisch-skript-wrap {
  margin:0; background:var(--paper);
  background-image:
    repeating-linear-gradient(0deg, rgba(0,0,0,0.012) 0px, rgba(0,0,0,0.012) 1px, transparent 1px, transparent 3px);
  color:var(--ink); font-family:"Source Serif 4",Georgia,serif; line-height:1.65;
  font-size:17px;
}

.fisch-skript-wrap ::selection {background:#d9c9a3;}

.fisch-skript-wrap a {color:var(--wax);}


/* ---- Header: title block like a statute cover page ---- */
.fisch-skript-wrap header.cover {
  padding:60px 24px 42px; text-align:center; position:relative;
  border-bottom:3px double var(--brass);
  background:linear-gradient(180deg, var(--paper2), var(--paper));
}

.fisch-skript-wrap header.cover .kicker {
  font-family:"IBM Plex Mono",monospace; letter-spacing:.18em; font-size:.72rem;
  text-transform:uppercase; color:var(--brass); margin-bottom:14px;
}

.fisch-skript-wrap header.cover h1 {
  font-family:"Fraunces",serif; font-weight:600; font-size:clamp(1.9rem,5vw,3.1rem);
  margin:0 0 10px; color:var(--ink); letter-spacing:-.01em;
}

.fisch-skript-wrap header.cover h1 em {font-style:italic; color:var(--wax); font-weight:500;}

.fisch-skript-wrap header.cover .subtitle-de {font-size:1.02rem; color:var(--ink); margin:4px 0;}

.fisch-skript-wrap header.cover .subtitle-vi {
  font-family:"IBM Plex Sans",sans-serif; font-size:.92rem; color:var(--slate);
  margin:2px 0 0; font-style:normal;
}

.fisch-skript-wrap header.cover .subtitle-vi:before {content:"VI · "; font-weight:600; letter-spacing:.03em; color:var(--slate); opacity:.7;}

.fisch-skript-wrap header.cover .exam-meta {
  display:flex; gap:10px; justify-content:center; flex-wrap:wrap; margin-top:18px;
  font-family:"IBM Plex Mono",monospace; font-size:.72rem;
}

.fisch-skript-wrap header.cover .exam-meta span {
  border:1px solid var(--brass); color:var(--wax); padding:4px 12px; border-radius:20px;
  letter-spacing:.04em;
}


/* ---- Legend + controls ---- */
.fisch-skript-wrap .legend {
  max-width:820px; margin:22px auto 0; display:flex; gap:18px; justify-content:center;
  flex-wrap:wrap; align-items:center; font-family:"IBM Plex Sans",sans-serif; font-size:.82rem; color:var(--ink);
}

.fisch-skript-wrap .legend .item {display:flex; align-items:center; gap:8px;}

.fisch-skript-wrap .legend .swatch {width:16px; height:16px; border-radius:2px; flex-shrink:0;}

.fisch-skript-wrap .legend .swatch.de {background:var(--wax);}

.fisch-skript-wrap .legend .swatch.vi {background:var(--slate);}

.fisch-skript-wrap .toggle-btn {
  cursor:pointer; font-family:"IBM Plex Mono",monospace; font-size:.72rem; letter-spacing:.05em;
  background:var(--ink); color:var(--paper); border:none; padding:8px 14px; border-radius:6px;
  text-transform:uppercase; transition:.15s;
}

.fisch-skript-wrap .toggle-btn:hover {background:var(--wax);}


/* ---- Sticky paragraph nav ---- */
.fisch-skript-wrap nav.spine {
  position:sticky; top:0; z-index:20; background:var(--ink); color:var(--paper);
  display:flex; gap:0; overflow-x:auto; white-space:nowrap; padding:0 10px;
  box-shadow:0 2px 10px rgba(0,0,0,.15);
}

.fisch-skript-wrap nav.spine a {
  color:var(--paper); text-decoration:none; font-family:"IBM Plex Mono",monospace;
  font-size:.74rem; letter-spacing:.03em; padding:13px 14px; border-right:1px solid rgba(255,255,255,.12);
  opacity:.72; transition:.15s;
}

.fisch-skript-wrap nav.spine a:hover {opacity:1; background:rgba(255,255,255,.06); color:#EFC9A0;}

.fisch-skript-wrap nav.spine a.exam {color:#EFC9A0; opacity:.9;}

.fisch-skript-wrap nav.spine .grp {
  font-family:"IBM Plex Mono",monospace; font-size:.64rem; letter-spacing:.1em; text-transform:uppercase;
  color:var(--brass); padding:13px 8px 13px 14px; align-self:center; opacity:.9;
}


.fisch-skript-wrap main {max-width:840px; margin:0 auto; padding:10px 24px 100px;}


/* ---- Section shell: like a numbered § chapter ---- */
.fisch-skript-wrap section.chapter {padding:50px 0 20px; border-bottom:1px solid var(--line); scroll-margin-top:54px;}

.fisch-skript-wrap section.chapter:last-of-type {border-bottom:none;}

.fisch-skript-wrap .chapter-head {display:flex; align-items:baseline; gap:16px; margin-bottom:6px;}

.fisch-skript-wrap .chapter-num {
  font-family:"Fraunces",serif; font-weight:700; font-size:2.5rem; color:var(--brass);
  line-height:1; flex-shrink:0;
}

.fisch-skript-wrap .chapter-title-de {font-family:"Fraunces",serif; font-weight:600; font-size:1.5rem; color:var(--ink); margin:0;}

.fisch-skript-wrap .chapter-title-vi {
  font-family:"IBM Plex Sans",sans-serif; font-size:.95rem; color:var(--slate); margin:4px 0 0 60px;
}

.fisch-skript-wrap .chapter-title-vi:before {content:"VI · "; font-weight:600; opacity:.7;}

.fisch-skript-wrap .lf-tag {
  font-family:"IBM Plex Mono",monospace; font-size:.62rem; letter-spacing:.1em; text-transform:uppercase;
  background:var(--wax); color:var(--paper); padding:3px 9px; border-radius:4px; margin-left:auto; align-self:center;
}


.fisch-skript-wrap h3.sub {
  font-family:"Fraunces",serif; font-weight:600; font-size:1.16rem; color:var(--wax);
  margin:32px 0 4px; padding-left:14px; border-left:3px solid var(--wax);
}

.fisch-skript-wrap h3.sub .vi-sub {
  display:block; font-family:"IBM Plex Sans",sans-serif; font-weight:500; font-size:.82rem;
  color:var(--slate); margin-top:3px; border-left:none; padding-left:0; letter-spacing:0;
}

.fisch-skript-wrap h4.h4 {font-family:'IBM Plex Sans',sans-serif; color:var(--ink); margin:24px 0 6px; font-size:1rem;}

.fisch-skript-wrap h4.h4 .vi-sub {display:block; color:var(--slate); font-weight:400; font-size:.82rem; margin-top:2px;}


/* ---- The core DE→VI stacked block ---- */
.fisch-skript-wrap .block {margin:16px 0 22px;}

.fisch-skript-wrap .de {
  position:relative; padding:14px 18px 14px 20px; background:rgba(122,46,46,.045);
  border-left:3px solid var(--wax); border-radius:0 6px 6px 0; font-size:1rem;
}

.fisch-skript-wrap .de .tag {
  font-family:"IBM Plex Mono",monospace; font-size:.66rem; letter-spacing:.12em;
  text-transform:uppercase; color:var(--wax); display:block; margin-bottom:5px; opacity:.85;
}

.fisch-skript-wrap .vi {
  font-family:"IBM Plex Sans",sans-serif; font-size:.9rem; color:var(--slate);
  padding:10px 18px 4px 20px; border-left:3px solid var(--slateline); margin-top:-4px;
}

.fisch-skript-wrap .vi .tag {
  font-family:"IBM Plex Mono",monospace; font-size:.64rem; letter-spacing:.12em;
  text-transform:uppercase; color:var(--slate); display:block; margin-bottom:4px; opacity:.75;
}

/* Vietnamese hide toggle */
.fisch-skript-wrap.hide-vi .vi {display:none !important;}

.fisch-skript-wrap.hide-vi .vi-sub {display:none !important;}

.fisch-skript-wrap.hide-vi .vi-cell {display:none !important;}

.fisch-skript-wrap.hide-vi .vi-mini {display:none !important;}

.fisch-skript-wrap.hide-vi .chapter-title-vi {display:none !important;}


.fisch-skript-wrap ul, .fisch-skript-wrap ol {margin:10px 0; padding-left:26px;}

.fisch-skript-wrap li {margin:5px 0;}

.fisch-skript-wrap li.de {border-radius:0 6px 6px 0; margin:7px 0;}


.fisch-skript-wrap .para-code {
  font-family:"IBM Plex Mono",monospace; font-size:.7rem; font-weight:600; color:#fff;
  background:var(--brass); padding:2px 8px; border-radius:10px; margin-left:6px; letter-spacing:.02em;
  display:inline-block;
}

.fisch-skript-wrap b, .fisch-skript-wrap strong {color:var(--ink);}

.fisch-skript-wrap .vi b, .fisch-skript-wrap .vi strong {color:#324150;}


.fisch-skript-wrap table {width:100%; border-collapse:collapse; margin:16px 0; font-size:.9rem; background:#fff;}

.fisch-skript-wrap th, .fisch-skript-wrap td {border:1px solid var(--line); padding:9px 11px; text-align:left; vertical-align:top;}

.fisch-skript-wrap th {background:var(--ink); color:var(--paper); font-family:"IBM Plex Sans",sans-serif; font-weight:600; font-size:.78rem; letter-spacing:.03em; text-transform:uppercase;}

.fisch-skript-wrap tr:nth-child(even) td {background:var(--paper2);}

.fisch-skript-wrap td.vi-cell {color:var(--slate); font-family:"IBM Plex Sans",sans-serif; font-size:.82rem;}

.fisch-skript-wrap .vi-cell {color:var(--slate); font-family:"IBM Plex Sans",sans-serif; font-size:.82rem; display:block; margin-top:3px;}


.fisch-skript-wrap .example {
  background:var(--greenbg); border-left:4px solid var(--green); border-radius:0 6px 6px 0;
  padding:10px 16px; margin:12px 0; font-size:.92rem;
}

.fisch-skript-wrap .example .tag {font-family:"IBM Plex Mono",monospace; font-size:.65rem; letter-spacing:.1em; color:#3f5c39; text-transform:uppercase; display:block; margin-bottom:4px;}

.fisch-skript-wrap .example .vi {border:none; padding:4px 0 0; margin:0;}


.fisch-skript-wrap .warn {
  background:#f7e9df; border-left:4px solid var(--wax); border-radius:0 6px 6px 0;
  padding:10px 16px; margin:12px 0; font-size:.92rem;
}

.fisch-skript-wrap .warn .tag {font-family:"IBM Plex Mono",monospace; font-size:.65rem; letter-spacing:.1em; color:var(--wax); text-transform:uppercase; display:block; margin-bottom:4px;}

.fisch-skript-wrap .warn .vi {border:none; padding:4px 0 0; margin:0;}


.fisch-skript-wrap .timeline {
  display:flex; justify-content:space-between; margin:26px 0 8px; padding:16px 10px;
  border:1px solid var(--line); border-radius:8px; background:#fff;
  font-family:"IBM Plex Mono",monospace; font-size:.78rem; text-align:center; color:var(--ink);
}

.fisch-skript-wrap .timeline div {flex:1;}

.fisch-skript-wrap .timeline .vi-mini {display:block; font-family:"IBM Plex Sans",sans-serif; font-size:.68rem; color:var(--slate); margin-top:2px;}


.fisch-skript-wrap .grid2 {display:grid; grid-template-columns:1fr 1fr; gap:16px;}

@media(max-width:640px){
.fisch-skript-wrap .grid2 {grid-template-columns:1fr;}
 .fisch-skript-wrap .chapter-title-vi {margin-left:0;}

}


.fisch-skript-wrap .badge-set {
  font-family:"IBM Plex Mono",monospace; font-size:.72rem; letter-spacing:.05em; text-transform:uppercase;
  background:var(--ink); color:var(--paper); padding:5px 12px; border-radius:4px; display:inline-block; margin-bottom:14px;
}

.fisch-skript-wrap .pill {display:inline-block; font-family:"IBM Plex Mono",monospace; font-size:.66rem; font-weight:600;
  padding:2px 9px; border-radius:12px; letter-spacing:.03em; text-transform:uppercase;}

.fisch-skript-wrap .pill.ok {background:#e2efdb; color:#3f5c39; border:1px solid #a9c39b;}

.fisch-skript-wrap .pill.no {background:#f4ddd6; color:#8a3324; border:1px solid #d3a294;}

.fisch-skript-wrap .pill.al {background:#f4ddd6; color:#7A2E2E; border:1px solid #d3a294;}


/* ---- Q&A / Lösung accordion ---- */
.fisch-skript-wrap details.q {border:1px solid var(--line); border-radius:8px; margin:14px 0; overflow:hidden; background:#fff;}

.fisch-skript-wrap details.q summary {
  cursor:pointer; list-style:none; padding:14px 18px; font-family:"IBM Plex Sans",sans-serif;
  font-weight:600; font-size:.95rem; color:var(--ink); position:relative; padding-right:40px;
}

.fisch-skript-wrap details.q summary::-webkit-details-marker {display:none;}

.fisch-skript-wrap details.q summary:after {
  content:"+"; position:absolute; right:16px; top:50%; transform:translateY(-50%);
  font-size:1.3rem; color:var(--brass); font-weight:400;
}

.fisch-skript-wrap details.q[open] summary:after {content:"–";}

.fisch-skript-wrap details.q[open] summary {background:rgba(122,46,46,.04); border-bottom:1px dashed var(--line);}

.fisch-skript-wrap details.q summary .qnum {
  font-family:"IBM Plex Mono",monospace; color:var(--brass); font-weight:600; margin-right:8px;
}

.fisch-skript-wrap details.q .ans {padding:2px 18px 16px;}

.fisch-skript-wrap details.q .ans .de {margin-top:12px;}

.fisch-skript-wrap details.q .ans .vi {margin-bottom:6px;}


/* ---- Math / calculation card ---- */
.fisch-skript-wrap .calc {
  font-family:"IBM Plex Mono",monospace; font-size:.86rem; background:var(--ink); color:var(--paper);
  border-radius:8px; padding:16px 18px; margin:14px 0; line-height:1.9;
}

.fisch-skript-wrap .calc .op {color:var(--brass);}

.fisch-skript-wrap .calc .val {color:#EFC9A0;}

.fisch-skript-wrap .calc .res {color:#a9d39b; border-top:1px dashed rgba(255,255,255,.25); padding-top:4px; margin-top:4px; display:block;}


/* ---- Exam sheet ---- */
.fisch-skript-wrap .exam-intro {
  background:var(--paper2); border:1px solid var(--line); border-radius:8px;
  padding:14px 18px; margin:16px 0; font-size:.94rem;
}

.fisch-skript-wrap .aufgabe {margin:22px 0; padding-left:16px; border-left:3px solid var(--brass);}

.fisch-skript-wrap .aufgabe-num {font-family:"IBM Plex Sans",sans-serif; font-weight:600; color:var(--wax); font-size:1rem; display:block; margin-bottom:4px;}

.fisch-skript-wrap .pts {float:right; font-family:"IBM Plex Mono",monospace; color:var(--brass); font-size:.78rem;}

.fisch-skript-wrap kbd {font-family:"IBM Plex Mono",monospace; background:var(--paper2); border:1px solid var(--line); border-radius:4px; padding:1px 6px; font-size:.78rem; color:var(--ink);}

.fisch-skript-wrap code {font-family:"IBM Plex Mono",monospace; background:var(--paper2); border:1px solid var(--line); border-radius:4px; padding:1px 6px; font-size:.86em;}


.fisch-skript-wrap footer {
  text-align:center; padding:44px 20px 70px; font-family:"IBM Plex Sans",sans-serif;
  font-size:.82rem; color:var(--slate); border-top:1px solid var(--line);
}

.fisch-skript-wrap footer .de {background:none; border:none; padding:0;}

.fisch-skript-wrap footer .vi {border:none; padding:0; margin-top:4px;}



/* ---- Bildtafel ---- */
.fisch-skript-wrap .fishgrid {display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin:18px 0;}

@media(max-width:640px){
.fisch-skript-wrap .fishgrid {grid-template-columns:repeat(2,1fr);}

}

.fisch-skript-wrap figure.fish {margin:0; background:#fff; border:1px solid var(--line); border-radius:6px; overflow:hidden;}

.fisch-skript-wrap figure.fish img {display:block; width:100%; height:auto; background:#fff;}

.fisch-skript-wrap figure.fish figcaption {padding:8px 12px 10px; border-top:3px solid var(--brass); font-family:"Fraunces",serif; font-size:1rem; color:var(--ink);}

.fisch-skript-wrap figure.fish figcaption .vi-cell {font-size:.78rem; margin-top:2px;}


@media (prefers-reduced-motion: reduce){
 .fisch-skript-wrap {scroll-behavior:auto;}
 
}

@media print{

  .fisch-skript-wrap nav.spine, .fisch-skript-wrap .toggle-btn {display:none;}

  .fisch-skript-wrap {font-size:12pt; background:#fff;}

  .fisch-skript-wrap details.q, .fisch-skript-wrap details.q .ans {display:block !important;}

  .fisch-skript-wrap details.q[open] summary:after, .fisch-skript-wrap details.q summary:after {content:"";}

  .fisch-skript-wrap section.chapter {page-break-inside:auto;}


}


</style>
<div class="fisch-skript-wrap">
<header class="cover">
  <div class="kicker">Berufsfachschule Küche · Lernskript · Warenkunde</div>
  <h1>§ <em>Fisch</em> — Einteilung, Inhaltsstoffe &amp; Konservierung</h1>
  <p class="subtitle-de">Fischarten · Wanderfische · Fettgehalt · Räuchern, Salzen, Marinieren · Kaviar · Fischgerichte</p>
  <p class="subtitle-vi">Phân loại cá, thành phần dinh dưỡng, bảo quản, trứng cá và món ăn từ cá</p>
  <div class="exam-meta">
    <span>Warenkunde</span><span>Fisch</span><span>DE / VI zweisprachig</span>
  </div>
  <div class="legend">
    <div class="item"><span class="swatch de"></span> Deutsch (Original — luôn đọc trước)</div>
    <div class="item"><span class="swatch vi"></span> Tiếng Việt (bản dịch — đọc sau để hiểu)</div>
    <button class="toggle-btn" id="viToggle" onclick="(function(){ var wrap=document.querySelector('.fisch-skript-wrap'); if(!wrap)return; wrap.classList.toggle('hide-vi'); var b=document.getElementById('viToggle'); if(b) b.textContent=wrap.classList.contains('hide-vi')?'DE · Tiếng Việt: TẮT':'VI · Tiếng Việt: BẬT'; })()"> Tiếng Việt: AN</button>
  </div>
</header>

<nav class="spine">
  <span class="grp">Grundlagen</span>
  <a href="#p1" onclick="event.preventDefault(); var el=document.getElementById('p1'); if(el) el.scrollIntoView({behavior:'smooth'});">1 · Einteilung</a>
  <a href="#p2" onclick="event.preventDefault(); var el=document.getElementById('p2'); if(el) el.scrollIntoView({behavior:'smooth'});">2 · Inhaltsstoffe</a>
  <a href="#p3" onclick="event.preventDefault(); var el=document.getElementById('p3'); if(el) el.scrollIntoView({behavior:'smooth'});">3 · Fischarten</a>
  <span class="grp">Verarbeitung</span>
  <a href="#p4" onclick="event.preventDefault(); var el=document.getElementById('p4'); if(el) el.scrollIntoView({behavior:'smooth'});">4 · Konservierung</a>
  <a href="#p5" onclick="event.preventDefault(); var el=document.getElementById('p5'); if(el) el.scrollIntoView({behavior:'smooth'});">5 · Kaviar</a>
  <a href="#p6" onclick="event.preventDefault(); var el=document.getElementById('p6'); if(el) el.scrollIntoView({behavior:'smooth'});">6 · Gerichte &amp; Wein</a>
  <a href="#p7" onclick="event.preventDefault(); var el=document.getElementById('p7'); if(el) el.scrollIntoView({behavior:'smooth'});">7 · Bildtafel</a>
  <span class="grp">TEST</span>
  <a href="#quiz" onclick="event.preventDefault(); var el=document.getElementById('quiz'); if(el) el.scrollIntoView({behavior:'smooth'});" class="exam">Prüfungs-Check</a>
</nav>

<main>
<span class="badge-set">Teil 1 · Fische kennen &amp; einteilen</span>

<!-- ============ §1 ============ -->
<section class="chapter" id="p1">
  <div class="chapter-head">
    <span class="chapter-num">§1</span>
    <h2 class="chapter-title-de">Einteilung der Fische</h2>
    <span class="lf-tag">Warenkunde</span>
  </div>
  <p class="chapter-title-vi">Phân loại cá theo 5 tiêu chí: môi trường sống, di cư, hình dáng, nguồn gốc, hàm lượng béo</p>

  <div class="block">
    <div class="de"><span class="tag">Überblick</span>
      Fische werden nach <b>fünf Kriterien</b> eingeteilt: (a) Herkunft / Lebensraum, (b) Wanderverhalten, (c) Körperform, (d) Fang oder Zucht, (e) Fettgehalt.</div>
    <div class="vi"><span class="tag">VI</span>
      Cá được chia theo <b>5 tiêu chí</b>: (a) nguồn gốc / môi trường sống, (b) tập tính di cư, (c) hình dáng cơ thể, (d) đánh bắt hay nuôi, (e) hàm lượng chất béo.</div>
  </div>

  <h3 class="sub">a) Herkunft &amp; Lebensraum
    <span class="vi-sub">Theo môi trường sống: nước ngọt và nước mặn</span>
  </h3>
  <table>
    <tr><th>Gruppe</th><th>Fischarten / Loài cá</th></tr>
    <tr><td><b>Süßwasserfische</b><span class="vi-cell">Cá nước ngọt</span></td>
      <td>Forelle, Pangasius, Zander, Barsch, Karpfen, Hecht, Flussaal
        <span class="vi-cell">Cá hồi suối, cá tra/basa, cá vược sông, cá vược, cá chép, cá măng sông, lươn sông</span></td></tr>
    <tr><td><b>Salzwasserfische / Seefische</b><span class="vi-cell">Cá nước mặn / cá biển</span></td>
      <td>Scholle, Seelachs, Hering, Seezunge, Makrele, Heilbutt, Kabeljau / Dorsch, Thunfisch, Steinbutt, Flunder, Knurrhahn, Rochen, Lengfisch, Rotbarsch, Schellfisch, Petersfisch, Seeteufel, Stör, Rotzunge, Steinbeisser, Wolfsbarsch, Seeaal (Dornhai)
        <span class="vi-cell">Gồm cá bơn, cá tuyết, cá trích, cá thu, cá ngừ, cá tầm, cá nhám góc… sống ở biển</span></td></tr>
  </table>

  <h3 class="sub">b) Wanderfische
    <span class="vi-sub">Cá di cư — đẻ trứng ở môi trường khác nơi sinh sống</span>
  </h3>

  <div class="block">
    <div class="de"><span class="tag">Flussaal · Süß- ins Salzwasser</span>
      Der Aal wächst im Süßwasser auf und wandert zum <b>Laichen ins Meer</b>.</div>
    <div class="vi"><span class="tag">VI</span>
      Lươn sông lớn lên ở nước ngọt, rồi di cư <b>ra biển để đẻ trứng</b>.</div>
  </div>
  <div class="timeline">
    <div>Glasaal<span class="vi-mini">cá chình thủy tinh · ở biển</span></div>
    <div>Steigaal<span class="vi-mini">di cư vào sông</span></div>
    <div>4–10 Jahre<span class="vi-mini">sống ở nước ngọt</span></div>
    <div>Laichen<span class="vi-mini">quay về biển đẻ trứng</span></div>
  </div>

  <div class="block">
    <div class="de"><span class="tag">Lachs · Salz- ins Süßwasser</span>
      Der Lachs schlüpft im Süßwasser, wandert als <b>Junglachs</b> ins Meer und nimmt dort sehr schnell an Gewicht zu. Zum Laichen schwimmt er flussaufwärts zurück ins Süßwasser. Auch die <b>Lachsforelle</b> gehört zu den Wanderfischen.</div>
    <div class="vi"><span class="tag">VI</span>
      Cá hồi sinh ra ở nước ngọt, khi còn trẻ (<i>Junglachs</i>) ra biển và tăng cân rất nhanh, rồi bơi ngược dòng sông về nước ngọt để đẻ trứng. <i>Lachsforelle</i> cũng là cá di cư.</div>
  </div>
  <div class="timeline">
    <div>Süßwasser<span class="vi-mini">nơi nở</span></div>
    <div>Junglachs<span class="vi-mini">cá hồi trẻ ra biển</span></div>
    <div>Meer<span class="vi-mini">tăng cân nhanh</span></div>
    <div>Fluss aufwärts<span class="vi-mini">ngược sông, đẻ trứng</span></div>
  </div>

  <div class="warn"><span class="tag">Merksatz · Câu dễ nhầm</span>
    Aal: <b>Süß → Salz</b> (laicht im Meer). Lachs: <b>Salz → Süß</b> (laicht im Fluss).
    <div class="vi"><span class="tag">VI</span>Lươn: ngọt → mặn (đẻ ở biển). Cá hồi: mặn → ngọt (đẻ ở sông).</div>
  </div>

  <h3 class="sub">c) Körperform
    <span class="vi-sub">Cá thân bẹt và cá thân tròn</span>
  </h3>
  <div class="grid2">
    <div>
      <span class="pill no">Plattfische</span>
      <div class="block">
        <div class="de"><span class="tag">Platt · Bodenfische</span>
          Körper flach und asymmetrisch, <b>beide Augen auf einer Seite</b>. Leben am Meeresboden und schwimmen seitlich liegend.</div>
        <div class="vi"><span class="tag">VI</span>
          Thân phẳng, bất đối xứng, <b>hai mắt cùng một bên</b>. Sống ở đáy biển, bơi nằm nghiêng.</div>
      </div>
      <div class="example"><span class="tag">Beispiele</span>Scholle, Seezunge, Flunder, Steinbutt, Heilbutt, Rotzunge</div>
    </div>
    <div>
      <span class="pill ok">Rundfische</span>
      <div class="block">
        <div class="de"><span class="tag">Rund · freischwimmend</span>
          Körper rund bis spindelförmig und symmetrisch, <b>je ein Auge pro Seite</b>. Schwimmen frei im Wasser.</div>
        <div class="vi"><span class="tag">VI</span>
          Thân tròn, hình thoi, đối xứng, <b>mỗi bên một mắt</b>. Bơi tự do trong tầng nước.</div>
      </div>
      <div class="example"><span class="tag">Beispiele</span>Forelle, Hecht, Seelachs, Zander, Hering, Makrele, Lachs, Pangasius, Kabeljau, Aal, Steinbeisser, Wolfsbarsch, Thunfisch</div>
    </div>
  </div>

  <h3 class="sub">d) Fang oder Zucht
    <span class="vi-sub">Cá tự nhiên và cá nuôi</span>
  </h3>
  <table>
    <tr><th>Begriff</th><th>Bedeutung</th></tr>
    <tr><td><b>Wildfisch</b></td><td>Fisch aus natürlichem Fang <span class="vi-cell">Cá đánh bắt tự nhiên</span></td></tr>
    <tr><td><b>Zuchtfisch</b></td><td>Fisch aus Farmhaltung <span class="vi-cell">Cá nuôi trang trại</span></td></tr>
  </table>

  <h3 class="sub">e) Fettgehalt
    <span class="vi-sub">Cá béo và cá nạc</span>
  </h3>
  <div class="grid2">
    <div>
      <span class="pill al">Fettfisch &gt; 10 %</span>
      <div class="block">
        <div class="de"><span class="tag">Cá béo</span>Makrele, Hering, Aal, Sardine, Lachs, Thunfisch</div>
        <div class="vi"><span class="tag">VI</span>Cá thu, cá trích, lươn, cá mòi, cá hồi, cá ngừ — chất béo trên 10 %.</div>
      </div>
    </div>
    <div>
      <span class="pill ok">Magerfisch &lt; 10 %</span>
      <div class="block">
        <div class="de"><span class="tag">Cá nạc · oft &lt; 2 %</span>Kabeljau / Dorsch, Seelachs, Zander, Schellfisch, Hecht, Scholle, Seezunge, Flunder, Steinbutt, Forelle</div>
        <div class="vi"><span class="tag">VI</span>Chất béo dưới 10 %, nhiều loài dưới 2 %.</div>
      </div>
    </div>
  </div>
</section>

<!-- ============ §2 ============ -->
<section class="chapter" id="p2">
  <div class="chapter-head">
    <span class="chapter-num">§2</span>
    <h2 class="chapter-title-de">Inhaltsstoffe des Fisches</h2>
    <span class="lf-tag">Warenkunde</span>
  </div>
  <p class="chapter-title-vi">Thành phần dinh dưỡng của cá</p>

  <table>
    <tr><th>Inhaltsstoff</th><th>Anteil</th><th>Hinweis</th></tr>
    <tr><td><b>Fettanteil</b><span class="vi-cell">Chất béo</span></td><td>0,5 – 25 %</td>
      <td>Schwankt stark je nach Art <span class="vi-cell">Dao động lớn tùy loài</span></td></tr>
    <tr><td><b>Eiweißanteil</b><span class="vi-cell">Đạm</span></td><td>15 – 23 %</td>
      <td>Relativ gleichbleibend <span class="vi-cell">Khá ổn định</span></td></tr>
    <tr><td><b>Kohlenhydrate</b><span class="vi-cell">Carbohydrate</span></td><td>&lt; 1 %</td>
      <td>Praktisch keine <span class="vi-cell">Hầu như không có</span></td></tr>
    <tr><td><b>Mineralstoffe</b><span class="vi-cell">Khoáng chất</span></td><td>Jod bis 330 µg / 100 g</td>
      <td>Wichtige Jodquelle <span class="vi-cell">Nguồn iốt quan trọng</span></td></tr>
    <tr><td><b>Fettsäuren</b><span class="vi-cell">Axit béo</span></td><td>—</td>
      <td>Viele ungesättigte Fettsäuren, besonders <b>Omega-3</b> <span class="vi-cell">Giàu axit béo không bão hòa, nhất là Omega-3</span></td></tr>
  </table>

  <div class="warn"><span class="tag">Prüfungsfalle · Bẫy thi</span>
    Der <b>Fettgehalt</b> schwankt stark (0,5–25 %), der <b>Eiweißgehalt</b> bleibt relativ stabil (15–23 %).
    <div class="vi"><span class="tag">VI</span>Chất béo biến động mạnh, đạm thì ổn định.</div>
  </div>
</section>

<!-- ============ §3 ============ -->
<section class="chapter" id="p3">
  <div class="chapter-head">
    <span class="chapter-num">§3</span>
    <h2 class="chapter-title-de">Merkmale einzelner Fischarten</h2>
    <span class="lf-tag">Warenkunde</span>
  </div>
  <p class="chapter-title-vi">Đặc điểm nhận biết của từng loài cá</p>

  <table>
    <tr><th>Fisch</th><th>Merkmale / Đặc điểm</th></tr>
    <tr><td><b>Lachs</b><span class="vi-cell">Cá hồi</span></td>
      <td>Wanderfisch: Süßwasser → Meer (schnelles Wachstum) → zurück zum Laichen.
        <span class="vi-cell">Nở ở nước ngọt, ra biển lớn nhanh, về sông đẻ trứng.</span></td></tr>
    <tr><td><b>Flussaal</b><span class="vi-cell">Lươn sông</span></td>
      <td>Glasaal (Meer) → Steigaal (Fluss) → 4–10 Jahre Süßwasser → Laichen im Meer.
        <span class="vi-cell">Từ biển vào sông, 4–10 năm ở nước ngọt rồi về biển.</span></td></tr>
    <tr><td><b>Forelle</b><span class="vi-cell">Cá hồi suối</span></td>
      <td>Regenbogenforelle, Goldforelle, Bachforelle und die wandernde <b>Lachsforelle</b>.
        <span class="vi-cell">Cá hồi cầu vồng, cá hồi vàng, cá hồi suối; Lachsforelle là dạng di cư.</span></td></tr>
    <tr><td><b>Hecht</b><span class="vi-cell">Cá măng sông</span></td>
      <td>Raubfisch mit <b>langer Schnauze</b>; einjährig = <i>Grashecht</i>. Fleisch eignet sich für <b>Farcen</b>.
        <span class="vi-cell">Cá săn mồi, mõm dài; 1 tuổi gọi là Grashecht; thịt hợp làm chả cá / thịt xay.</span></td></tr>
    <tr><td><b>Karpfen</b><span class="vi-cell">Cá chép</span></td>
      <td><b>Bartfäden</b> beidseits des Mauls. Formen: Spiegelkarpfen, Zeilkarpfen, Lederkarpfen, Schuppenkarpfen.
        <span class="vi-cell">Có râu hai bên miệng. Chia theo vảy: chép gương, Zeilkarpfen, chép trần, chép vảy.</span></td></tr>
    <tr><td><b>Zander</b><span class="vi-cell">Cá vược sông</span></td>
      <td>Raubfisch mit <b>kleinem Dorn am Kiemendeckel</b>; Fleisch ähnlich wie Hecht.
        <span class="vi-cell">Cá săn mồi, có gai nhỏ ở nắp mang; thịt giống cá măng sông.</span></td></tr>
  </table>

  <div class="example"><span class="tag">Merkhilfe · Mẹo nhớ</span>
    Hecht = <b>lange Schnauze</b> · Karpfen = <b>Bartfäden</b> · Zander = <b>Dorn am Kiemendeckel</b>
    <div class="vi"><span class="tag">VI</span>Măng sông = mõm dài · Chép = có râu · Vược sông = gai ở nắp mang.</div>
  </div>
</section>

<span class="badge-set">Teil 2 · Konservieren, Verarbeiten &amp; Anrichten</span>

<!-- ============ §4 ============ -->
<section class="chapter" id="p4">
  <div class="chapter-head">
    <span class="chapter-num">§4</span>
    <h2 class="chapter-title-de">Fischerzeugnisse &amp; Konservierung</h2>
    <span class="lf-tag">Warenkunde</span>
  </div>
  <p class="chapter-title-vi">Sản phẩm từ cá và các phương pháp bảo quản</p>

  <div class="block">
    <div class="de"><span class="tag">Grundsatz</span>
      Fisch <b>verdirbt leicht</b>. Er wird daher in verschiedenen Formen angeboten: Kühlfisch, TK-Fisch, Räucherfisch, Salzfisch, Trockenfisch, marinierter Fisch und Konserven.</div>
    <div class="vi"><span class="tag">VI</span>
      Cá <b>rất dễ hư</b>. Vì vậy cá được bán dưới dạng: cá tươi làm lạnh, đông lạnh, hun khói, muối, khô, ngâm chua và đồ hộp.</div>
  </div>

  <table>
    <tr><th>Art</th><th>Haltbarkeit</th></tr>
    <tr><td><b>Halbkonserven</b><span class="vi-cell">Bán đồ hộp</span></td><td>Tage bis Wochen <span class="vi-cell">Vài ngày đến vài tuần</span></td></tr>
    <tr><td><b>Vollkonserven</b><span class="vi-cell">Đồ hộp hoàn toàn</span></td><td>Monate bis Jahre <span class="vi-cell">Vài tháng đến nhiều năm</span></td></tr>
  </table>

  <h3 class="sub">1 · Räuchern
    <span class="vi-sub">Cá hun khói</span>
  </h3>
  <table>
    <tr><th>Produkt</th><th>Beschreibung</th></tr>
    <tr><td><b>Bückling</b></td><td>Ganzer, ausgenommener Hering <b>mit Kopf</b>, gesalzen und <b>heiß</b> geräuchert.
      <span class="vi-cell">Cá trích nguyên con bỏ ruột, giữ đầu, muối rồi hun khói nóng.</span></td></tr>
    <tr><td><b>Schillerlocken</b></td><td>Bauchlappen des Dornhais (Seeaal), gesalzen, gerollt, heiß geräuchert.
      <span class="vi-cell">Phần lườn bụng cá nhám góc, muối, cuộn lại, hun khói nóng.</span></td></tr>
  </table>

  <h3 class="sub">2 · Salzen
    <span class="vi-sub">Cá muối — nguyên lý: áp suất thẩm thấu</span>
  </h3>
  <div class="block">
    <div class="de"><span class="tag">Prinzip</span>
      Salz entzieht dem Fisch Wasser (<b>osmotischer Druck</b>). Mikroorganismen verlieren ihren Lebensraum und vermehren sich nicht.</div>
    <div class="vi"><span class="tag">VI</span>
      Muối rút nước khỏi cá nhờ <b>áp suất thẩm thấu</b>, vi sinh vật mất môi trường sống nên không phát triển.</div>
  </div>
  <table>
    <tr><th>Produkt</th><th>Beschreibung</th></tr>
    <tr><td><b>Matjeshering</b></td><td>Junger Hering <b>vor der Laichreife</b>, mild gesalzen, milchsauer angereift.
      <span class="vi-cell">Cá trích trẻ chưa đến tuổi đẻ, muối nhẹ, ủ lên men lactic.</span></td></tr>
    <tr><td><b>Salzhering</b></td><td>Hering stark gesalzen. <span class="vi-cell">Cá trích muối đậm.</span></td></tr>
    <tr><td><b>Kaviar</b></td><td>Rogen, meist vom Stör, stark gesalzen. <span class="vi-cell">Trứng cá (thường là cá tầm), muối đậm.</span></td></tr>
  </table>

  <h3 class="sub">3 · Trocknen
    <span class="vi-sub">Cá khô — nguyên lý: rút kiệt nước</span>
  </h3>
  <div class="block">
    <div class="de"><span class="tag">Prinzip</span>
      Durch <b>Lufttrocknung</b> wird dem Fisch das Wasser entzogen. Ohne Wasser können sich Bakterien nicht vermehren.</div>
    <div class="vi"><span class="tag">VI</span>
      Phơi khô tự nhiên trong không khí để rút hết nước; không có nước vi khuẩn không phát triển được.</div>
  </div>
  <div class="grid2">
    <div class="example"><span class="tag">Stockfisch</span>Kabeljau / Dorsch, luftgetrocknet, <b>ohne Salz</b>.
      <div class="vi"><span class="tag">VI</span>Cá tuyết phơi khô, <b>không ướp muối</b>.</div></div>
    <div class="example"><span class="tag">Klippfisch</span>Kabeljau / Dorsch, <b>erst gesalzen</b>, dann getrocknet.
      <div class="vi"><span class="tag">VI</span>Cá tuyết <b>ướp muối trước</b>, rồi mới phơi khô.</div></div>
  </div>

  <h3 class="sub">4 · Säuern &amp; Marinieren
    <span class="vi-sub">Ngâm chua / giấm — nguyên lý: hạ độ pH</span>
  </h3>
  <div class="block">
    <div class="de"><span class="tag">Prinzip</span>
      Essigsäure <b>senkt den pH-Wert</b> und hemmt Fäulnisbakterien.</div>
    <div class="vi"><span class="tag">VI</span>
      Axit axetic / giấm <b>hạ độ pH</b>, ngăn vi khuẩn gây thối phát triển.</div>
  </div>
  <table>
    <tr><th>Produkt</th><th>Beschreibung</th></tr>
    <tr><td><b>Bismarckhering</b></td><td>Entgrätetes Heringsfilet in Essig-Gewürz-Aufguss.
      <span class="vi-cell">Phi lê cá trích bỏ xương ngâm giấm và gia vị.</span></td></tr>
    <tr><td><b>Rollmops</b></td><td>Heringsfilet, gerollt, mit Gurke und Gewürzen gefüllt, in Essigsud.
      <span class="vi-cell">Phi lê cá trích cuộn nhân dưa chuột và gia vị, ngâm nước giấm.</span></td></tr>
  </table>

  <h3 class="sub">5 · Kombinierte Verfahren
    <span class="vi-sub">Kết hợp nhiều phương pháp</span>
  </h3>
  <table>
    <tr><th>Produkt</th><th>Verfahren</th></tr>
    <tr><td><b>Räucherlachs</b></td><td>Salzen + <b>Kalträuchern</b> <span class="vi-cell">Muối + hun khói lạnh</span></td></tr>
    <tr><td><b>Anchovis</b></td><td>Stark salzen + <b>milchsaure Reifung</b> <span class="vi-cell">Muối đậm + ủ lên men lactic (cá cơm)</span></td></tr>
  </table>

  <div class="warn"><span class="tag">Vorsicht · Dễ nhầm</span>
    <b>Bückling</b> = heiß geräuchert, mit Kopf. <b>Räucherlachs</b> = kalt geräuchert. <b>Stockfisch</b> = ohne Salz, <b>Klippfisch</b> = mit Salz.
    <div class="vi"><span class="tag">VI</span>Bückling: hun nóng, giữ đầu. Hồi hun khói: hun lạnh. Stockfisch: không muối; Klippfisch: có muối.</div>
  </div>
</section>

<!-- ============ §5 ============ -->
<section class="chapter" id="p5">
  <div class="chapter-head">
    <span class="chapter-num">§5</span>
    <h2 class="chapter-title-de">Kaviar &amp; Kaviarersatz</h2>
    <span class="lf-tag">Warenkunde</span>
  </div>
  <p class="chapter-title-vi">Trứng cá tầm và các sản phẩm thay thế</p>

  <div class="block">
    <div class="de"><span class="tag">Echter Kaviar</span>
      Nur der Rogen vom <b>Stör</b> darf als echter Kaviar bezeichnet werden.</div>
    <div class="vi"><span class="tag">VI</span>
      Chỉ trứng của <b>cá tầm (Stör)</b> mới là caviar thật.</div>
  </div>

  <table>
    <tr><th>Kaviarersatz</th><th>Merkmal</th></tr>
    <tr><td><b>Lachskaviar</b></td><td>Lachsrogen, <b>orange-rot</b> <span class="vi-cell">Trứng cá hồi, màu cam đỏ</span></td></tr>
    <tr><td><b>Keta-Kaviar</b></td><td>Rogen vom Ketalachs <span class="vi-cell">Trứng cá hồi Keta</span></td></tr>
    <tr><td><b>Deutscher Kaviar</b></td><td>Rogen, <b>schwarz gefärbt</b> <span class="vi-cell">Trứng cá nhuộm đen</span></td></tr>
    <tr><td><b>Tobiko</b></td><td>Rogen vom Flugfisch <span class="vi-cell">Trứng cá chuồn</span></td></tr>
  </table>
</section>

<!-- ============ §6 ============ -->
<section class="chapter" id="p6">
  <div class="chapter-head">
    <span class="chapter-num">§6</span>
    <h2 class="chapter-title-de">Fischgerichte &amp; Weinempfehlung</h2>
    <span class="lf-tag">Warenkunde</span>
  </div>
  <p class="chapter-title-vi">Món ăn từ cá, cá phục vụ tại nhà hàng và rượu vang đi kèm</p>

  <h3 class="sub">Gerichte
    <span class="vi-sub">Các món trong tài liệu</span>
  </h3>
  <table>
    <tr><th>Gericht</th><th>Erklärung / Giải thích</th></tr>
    <tr><td><b>Renke aus dem Bodensee</b>, geräuchert, mit Meerrettichsahne</td>
      <td>Renke vom Bodensee, geräuchert, mit Meerrettichsahne.
        <span class="vi-cell">Cá Renke hồ Bodensee hun khói, ăn kèm kem mù tạt ngựa.</span></td></tr>
    <tr><td><b>Renke Müllerin Art</b> mit Petersilienkartoffeln</td>
      <td>In Mehl gewendet, in Butter gebraten; dazu Petersilienkartoffeln.
        <span class="vi-cell">Kiểu “bà chủ cối xay”: tẩm bột mì, chiên bơ; kèm khoai tây rau mùi tây.</span></td></tr>
    <tr><td><b>Forelle blau</b> mit Salzkartoffeln und zerlassener Butter</td>
      <td>Forelle im Essigsud gegart, behält das silbrig-blaue Aussehen.
        <span class="vi-cell">Cá hồi suối luộc nước giấm nhẹ để giữ màu xanh bạc; kèm khoai luộc và bơ tan chảy.</span></td></tr>
    <tr><td><b>Lachs-Steak</b> mit Orange-Curry-Creme, Jasminreis und Salat mit Sesam-Dressing</td>
      <td>Gebratenes Lachssteak mit Orangen-Curry-Sauce.
        <span class="vi-cell">Bít tết cá hồi, sốt kem cam curry, cơm hương lài, salad sốt mè.</span></td></tr>
    <tr><td><b>Vitello tonnato</b></td>
      <td>Kaltes Kalbfleisch in Thunfischsoße.
        <span class="vi-cell">Thịt bê lát lạnh phủ sốt cá ngừ.</span></td></tr>
  </table>

  <h3 class="sub">Restaurant „Zum goldenen Karpfen“
    <span class="vi-sub">Các loại cá trong thực đơn nhà hàng</span>
  </h3>
  <div class="block">
    <div class="de"><span class="tag">Fischangebot</span>
      Kabeljau, Forelle, Heilbutt, Zander, Seelachs, Scholle, Thunfisch, Seezunge, Makrele, Karpfen, Aal, Wolfsbarsch, Lachs.</div>
    <div class="vi"><span class="tag">VI</span>
      13 loại cá nhà hàng phục vụ: tuyết, hồi suối, cá bơn lớn, vược sông, tuyết đen, cá bơn, cá ngừ, cá bơn lưỡi trâu, cá thu, cá chép, lươn, cá vược biển, cá hồi.</div>
  </div>

  <h3 class="sub">Weinempfehlung zu Fisch
    <span class="vi-sub">Rượu vang trắng hợp với món cá</span>
  </h3>
  <div class="block">
    <div class="de"><span class="tag">Weißweine</span>
      <b>Müller-Thurgau</b> · <b>Weißburgunder</b> · <b>Chardonnay</b> · <b>Viognier</b></div>
    <div class="vi"><span class="tag">VI</span>
      Bốn loại vang trắng gợi ý cho món cá.</div>
  </div>
</section>


<!-- ============ §7 ============ -->
<section class="chapter" id="p7">
  <div class="chapter-head">
    <span class="chapter-num">§7</span>
    <h2 class="chapter-title-de">Bildtafel: Fische erkennen</h2>
    <span class="lf-tag">Technologie</span>
  </div>
  <p class="chapter-title-vi">Bảng hình cá — nhìn hình, gọi tên (tên đã viết lại rõ ràng)</p>

  <h3 class="sub">Seefische mit Bild
    <span class="vi-sub">Cá biển có hình</span>
  </h3>
  <div class="fishgrid">
    <figure class="fish"><img src="data:image/jpeg;base64,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" alt="Knurrhahn">
      <figcaption><b>Knurrhahn</b><span class="vi-cell">cá chào mào biển (gurnard)</span></figcaption></figure>
    <figure class="fish"><img src="data:image/jpeg;base64,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" alt="Rochen">
      <figcaption><b>Rochen</b><span class="vi-cell">cá đuối</span></figcaption></figure>
    <figure class="fish"><img src="data:image/jpeg;base64,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" alt="Seelachs">
      <figcaption><b>Seelachs</b><span class="vi-cell">cá tuyết đen (pollock)</span></figcaption></figure>
    <figure class="fish"><img src="data:image/jpeg;base64,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" alt="Kabeljau / Dorsch">
      <figcaption><b>Kabeljau / Dorsch</b><span class="vi-cell">cá tuyết</span></figcaption></figure>
    <figure class="fish"><img src="data:image/jpeg;base64,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" alt="Lengfisch">
      <figcaption><b>Lengfisch</b><span class="vi-cell">cá ling</span></figcaption></figure>
    <figure class="fish"><img src="data:image/jpeg;base64,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" alt="Rotbarsch">
      <figcaption><b>Rotbarsch</b><span class="vi-cell">cá vược đỏ</span></figcaption></figure>
    <figure class="fish"><img src="data:image/jpeg;base64,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" alt="Schellfisch">
      <figcaption><b>Schellfisch</b><span class="vi-cell">cá tuyết chấm đen (haddock)</span></figcaption></figure>
    <figure class="fish"><img src="data:image/jpeg;base64,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" alt="Seelachs">
      <figcaption><b>Seelachs</b><span class="vi-cell">cá tuyết đen (pollock)</span></figcaption></figure>
    <figure class="fish"><img src="data:image/jpeg;base64,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" alt="Makrele">
      <figcaption><b>Makrele</b><span class="vi-cell">cá thu</span></figcaption></figure>
    <figure class="fish"><img src="data:image/jpeg;base64,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+6Hb9eIdlcNL+MudxDoq+ZhF+u07OcRwybf2JXZtKeI2ndSuZFUuCK04f8vOOB/07FXAEEAjmCpREXzIxsjHMeA5rhsQR1C4tq3EWtDy2JaGMgt4G4OB5B4DXdvu0k+gO/Nenh1qEUMiZorEMmDvvaJWH3JKk55Bzm/yvOw4hy326Lsu6+h0RERERERAtVqTC1c9iZ6F6KOSN490vbxcLux2+BX5Mv4ijiLcuOyz5xkK8hifC2LYv58nNd0II57Ffozwhx1OPQWO2gjeXcTnOkjHETxHr8eSuBxlEniNOuXevltXtFVrw/uoImf6WAL2A26DkoI57qURfL2NkbwvaHNPY81pcppLA5QO9txVWQu6u4AD+YWi/wALNKB7Xtx3luadxwSOCuVGrFSrMgrtLYmDZoJJ2C90REXlZgjsQPhnjbJG8bOY4bghcR1xoG1gJJbmKrvyWDkJM1Rh4Zq+/eMjqO+yuHhDrBmosZPj7Ekj79BxYXTN4XyxfwvI7HoD8QuhoihSiIiIiLmvi14bx6sjjyGMIgzEPIHfhEzfQnsR2Ks/h9iLOC0jQx94g2Ymnj2O/Mknr9VY0RR3UoiIiIiIiKCN1hwYqhXvPuQVII7T28LpWMAc4fFZoRERERERERERERERERERERFBUoiIOiInZebIy2Z7zI8h23uno35L0RERERERETZEREREREREUKURERERERERERECIiIiIiIURQpRERERERERERERERERERERQOqlAiKCVPZERERFAO4QqQidkRQealN+adlBPJN035oTtup7KAEPUIe6jfupHMbqdl//2Q==" alt="Thunfisch">
      <figcaption><b>Thunfisch</b><span class="vi-cell">cá ngừ</span></figcaption></figure>
    <figure class="fish"><img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/wAALCAChAQQBAREA/8QAHAABAAEFAQEAAAAAAAAAAAAAAAYBAgQFBwMI/8QAPhAAAQQCAQMCBAQDBQYHAQAAAQACAwQFEQYSITFBURMiYXEHFDKBFUKRIzNDUqEWU2Jyc6IkNTeCk7HBsv/aAAgBAQAAPwD6oReNqtDbgkgsxslhkaWvY8bDgfIIXqAANDwqoiIiLDy2RgxlN1iySGjsGju5xPgAepWLSinhls5HIWiI3tBbD+lkLB37/wDF7laGmw8tvfxK+C3BVnE1IXdhO4f4rvdvt/VajNZ/K8tuy4bhz2w02kttZTZ0wA6LWfVbCN2K4NTjxGDrG3l5xsRN7ySu/wA7z6DfqVlYrjbmzjM8rttt5Bo62tJ6YKv0YPf6lY1vmU+XsS0OGVRemYel91/avEfv/MfoFsMRxCnUlN3MSnK5J3zOsWQCGH2Y3w0K6/zLG17Jp0Gy5G6O3wajerR+rvAW9xU9i1Rimt1XVJ3jboXPDi39x2WWiIiIiIioFVERERERWyvbFG6R5DWNBJJ9AozhoDncj/G7vU6rGS2hA4dmt8GUj1LvT2Cwsha/2uyzsVRJdiacur87ToSPH+C0+v1/osLmFm5nMlFxbj0jYIQAb1iP/Aj9GAeNkeityeUbhvg8U4RXilynSfiEfprNPmR5Hr9PVZdeviPw7ws+Qytp89ycgzWZPmlnf6NaPb2AWkjxue/EOWObNiXE8cB6mU2OLZbHt1+w+ikFzO43j7W4TjOPFu/G3TadRvyx/V7vDf37q6LjmSzOpeV5BxjPf+H0nGOEfRzh8z//AKWey/xzjfwqNd9Oo95DWQRAdbifoO5UiHhVRERERERNBB4REREREUW5vPLYOPwVRxbPk5S2RzfLIGjcjvsezf8A3K7mWXZgcLDTojV+2RUoxNHl5Ggfs0dz9lq8lbg4BxHH43HxibIWHCCCPR3NM7u5x1387JKwp3R/h3w9sFYm1nLjy7cjup0srj3O/JA3oBZGIgx/4dcVs5LMzB2QsuM1mQ6+JNKfDG+/sAtbg8JLl7Q5hzd5jZFuWrSedR1mDw5w9XaV8PJ8pzq1LV4w2XH4aM9M2TeNOePaMe/1WdRyWLwsj8PwvH/xG/vc0kZ21rvV0sp8n115WxbxjJZQB3I8xO5hOzVpH4MY+hI+YrdYfjuJwwP8NoQQPP6pA3b3fdx7n+q2yIiIiIiIm0REREREUUwwbPyfPZe0WhtYClC7/LG0B7/6uP8A2haHjr2cj51Lm7jHthpVRJUD/wBLWPc5od9yGE/ZwWBg3NyvMLHKMzZDqdOs+xVjP6YIy4tY77kMLv3C8cMBdzw5dyqw1grUzcgrnQbBG4ks+7ukA/cquOgfyLKTco5s6OtjcZo1qZO2xuIB6n+7tEdvdY+YyjOYwyZPLzSY7hlIkNjDtPvv2O2h/L6a9dre4qjkeT49otwOwPGmAfCpxnplnZ7vI/SPp5Wzr8k4/hof4bx+rNcdF8vwMdAZO/1d439ypZj53Wqkc0leWu542YpddTfvolZKIiIiIiIiefZERERERWSuDI3uO9AE9lCeIOjv8Lyj/mInlsOIJ+bvvW/20sJ01jDYW/bgx01mK1joRD8LXylrCCD7a3teOS4q9vFcdJWmkY0Uoa9iuzv8bQ+Xv6aLifstxy3FVJhg8e7FwWuuaOEOk/kjb3d99AFYXMcS69lZY6+69KpUltzd9RyTkaZsepGif6KGNtVoLdS/nq0sjKscZxmFgbsOL/Dz/mPYbJ8EqZQYrMcgayxzG1FQx/6mYys/p2PQSP8AX7BTmhSq0K7IaMEUELRoNjaAP9FkoiIiIiIiKhVR9ECIiIiIrXt6mlp8EaXNzisnHgc7QxDIXRytfAQZDG6JwBHUO3fbSPZbOhdrVvw+xDbJdI2RkdXXc9bj8uj+62XJLkte9g8bVLozasAOc0dgxg6i399AL3DPzGdNq3XfEynE8RyvOmnqPc/fQ/1UdzdmLJy0MPA4V22D+cyI31H8o3Z0XenUekfYlQ7kOV/iZbdqNsR5m7JHHihCzZqVw/pEjvQdRJ/oPZT6h+H+LDmWMy+1l7x0XzW5nEE/RoIaP6KZNAa0NaAABoBVRERERERERWn7q5ERERERROy59Hkd2vY1+UysP9hr/etaepp+pHcfYrluPuudjOIVZbJZ+SyUzZYQ/W+h46QR9A7a6ByzO4yhy/FSTyNEtUSfGJOi1pYSO3jvpQ8523luC5+91yVTlbcjgJ3kdFURg/Lvxto9PdR7OcjpzX8s0WmflL0sNWWSJ2y2nG0nQ16vII7eNqtDO24ZLGdgt1KzfzANaGRhLHsa3paxzvQM6joD1JUlo895lLYx3Xj8aG3Gl0cbnlhLd6Du/geqnUnJ8njIw7OYG0yMDvLTP5hoPrsDuFv8NmKGZqixjbUdiLeiWHwfYj0K2CIqbCqiIiIiom9KqIiIiIi0fMa1WxhpTdm+BHERMJQAXMLe+279fT91x3BcBt8gdcuwCavELQkikvQmJ07Ht+fbR6g60Qup1uFY2WvVfmImXr8cUccszv8AF6PGx6hbOfjWJsSdVqnHPp/W1svzNYda+Vp7Aa9Flx4qhGAI6NVoHjULRr/RarkPFaOXZAfgwRy19mEmIOaxx9deFEMrwnI0ppcqMzLaFcfF1LXEkjg0b6Wjxr2AA7rZ8L/ERnJr7qkeKuwfDG5JZekMZ9zvz9Ftc7g46tx2exDIoL8LHGQa6WTt9evXkgA6K3mHyNfLY2vepyCSCZoe1wWYSANnsFD+Tc5p458lTFmO9kGt24B4EUP1kf4b9vP0XO7NvluSmZlf4z+TpxOJ+PM8V67/APkYR1Obv1Pn0XRPw35WOSYpzZyDdrHolc1pa2T2e0HvoqYoiIiK31VR9lVEREREXjbsRVK7555GxxRguc4nsAFEIKc3KbkeQyhMWGYd1aR7GU77SSf/AI391M267a1pXKyV5jjc8Nc8gb6W+SrmnqaCQQT6H0VU0tFnsOLFD4NGlTe50okc2UlgJ3vfy9yVpeR85iw1Swyzh8g+00uayu2MO+K0fzggnTO/k915/hhlGjgjcjkBDSrGWV7WdmtjZ1HQUV5V+IMubttxmGkNOu7bnyyODXSM9/drf+4+g9VqccylXDIsdE18m+r400Jf83vDXHc/8z9LZyMlbKJrv5SrJrf5rMyiaffuyBvyt+21j8MyklX8Qqbvzkl6vbDqz7Bg+AHuI6mBrPVo6T3Huu4IiIiKhRVRERERY9+7XoVJLNyZkMEY257joBclz3NpM3lY2VaUc2HicHRssT/BFlwP6iNElo1232JXpluUZTJVPiWqUGPx9WZrbEkVkSSxud2ic0aHhxB+o2pPxvC8hiz0F3PZuO2yKKRscMFfoDg7WnOO/PZTdCqDwqohUf5Pg4Mma1vrZDbqdRikkJDBseHAEbHg6+ijNPhFVmKkhyOakvOhifJFG3TIYS7Z6+gHv3PYkriNTJccw8jvyWPvZfJteQLM8nwot+Nhre5C6LSsPbGWuErGSNBMcBbWj2fTbQ6Q/uV70GSiR0sL3VB6CnjOp/8A8sxO/voLyuWDFl8ZO1uRknFuFn5m/Yjc6Pbw0iONnYEgnf02u2BVRERFQKqoqoieEB2iFc15LlnZGzbyMdOW/icQ/ojgY4ATz+ru/kMOh91oDj+UWeO4d/GYoI57kxnvTEjqjId/dHf8oA129lqOVYyt/G72JxE5nisujfeDSS2N7eqQMB9OzT9tqb4e9yvI4yOCi2kXU7AY6d8x3K1vcAt12JBCm2EyjcjUke+MwzwvMU8Tj/dvHp9vB39VF/xk5Jb43wyazjT02p3thZJ/u9+XffS5b+BnKs7c5s2jdv2rlWaKR0jZn9XQQN9X9e37r6NWmu43JPtvmpZh8LXHfwZIGyNH28FYdjD56xoHkZgbvv8AAqMB/qSVgXuN4jFY+1kOR2ruVDB1uNuQuH0DYxpuyT2AHqsWplMw+t8PE8RjiqGPojbPO2MlvsWjZA+iiF3iecfkorMPFcbUjjBbqtI1xIPnbXDRPsfRWgZSs0/xbDTwxx/3fxarZAAfPdrgP6qtgMfBG6fHUg2T5mOlxjpGu+o6ZDtWcPczL80xdKlVoRQ0pHXbL6tF0Oi1pa1pLjvuXb/ZdxREREVFX9lQKqIiIo9y21ZMdXGUHmO1kHmL4o/wowNvePqB4+pCwOT4OccZp4Lj8YgidLFE6QNB+DGDtzjvye37kqPZDGVa9h2F41Pfs5WxuS04XXtiZv8AU+XXgk+g0SvS/wAdq8O/D+yYWRPu/FEr5g0nqe93QT3Ps4juvbheRhxMOSlsnprMx9W47XuWuaf3Pwwovhstd5Ryq/Wg/s8NdvRSWJC7pJ6IWkxt9xto2VJ+W8z4NlLB4/mLcVlrnhri0Esjf6fOOwK3XC+BYXitma3jGyPmmb0/Ekd1FrfOgfr2UuRFyz8b79i1Vx/G6JMcuRl2+XpLgxre+tNBO9j07jyopgK1zg9urblyrZZGuDLsU1pxD4ifLWnwR2/1XfI3iSNr2nbXDYPuFUjY0ViXMZRuhgt1IZuj9PWwEt+y88Zhcdi3yPx9OGCSTs97G/M722fK2CIiInqqKv7KjVVERFRx0Ce/bv2XMs47K27cmds3JcMKQeyCo1jJZDDsB0rhv1I8DwAtnB8fJx0cdnbFprHt2y3Vk6YroPjZHdp+ileIxFDD1zDjascEZO3dI7uPuT5P7qH/AIs2o21MdTfPIwy2GPdE1mxK1p3on0A8rlk09m7lKcU77AwVtjaM0EAJkmdAOos8dtuk19gU5RluQ0MHkKlbEuxVeOV0liZ5AeOrQDI/oGgDYUOxuPnMGMx+LswyWM0fhzRNY10kTC7Wt99bHf8AZfX1Ku2pTgrsO2xMbGCfYDS9kWBncpVwmJs5G+4trV2F7yBs6+n1XGLcWKyX4hSM/jE46nfmZJXncLGPHaJmwRs6GzsKW5zD46vwu7PJ+armRvw2uc5z+ouPS0hrCQdkjwug49rmUa7H/qbG0HtrvpZCIiIiIhVNqqIiIi8Lxc2nM6NzWPDHFrneAdeq4fUdlLk9ubKZjG5KnH2d+Ud/aUyfD29htux3H3Uj49K2Wr/Abknwq1kllZwOzWsM7lrf+Hw5v0OlPOM5KTIUHi0A27WeYLDR/nb6j6Hsf3XOeVTW+T85ZhWDpjpuMj3BpAbH6u6vG9bHp+v6LM/BzDTuhlyt9oEbZJW1Weduc9xkl/f5Wj6N+qk/M+EY7l1mi7Kl/wAGr1fIzsX79Cfb6K7j/A+P4K6LlCi0W29myu7lvbXb2UpRD2XGfxTyNi3ZuVmOnnMkLfyFJuxHJo/2j5AO5140pRwDD0cLgv7djYmNjBfLK1o6gO7vmB0W78eNKhs/7Y5mnVx1Zn+zlGT40lhzCGzvaflERHbQPcnwp+iIiIiIhVo2qhVRERFRw2NEbB7FajKcfp3ar442NqykECWFjQ4A+Qe3cH1BXH+UYXM4CI05bkfwi5oo2gzUnxYxuNzj4AP6Ptrypjx3Ptn5HQZtoyF2tJHkKrCNwzRD9RHpvuP6LTYOpk8jJbx0TjHfuneRt6P/AISuCemEb8yOB39N79l1mjVhpU4atWMRwQtDGNHgAL3RNrQcn5ZiONxNdkrIErx/Zwxjqkf9mjuoHe/ErL2sVanx+DfVjBaI5rOz8riB1dI7+ux76XhxOrVwVfVejPyTPvkMrZjCWfCLj4c9/wCnRUrg4tkM5M2zy+y10LSHRYyqS2BhB38x8vP37KZQQRV4WxQRtjjaNNawaAH0C9UREREREKt2mz6bVyIiIiLHvU696rLXtwsmgkHS9jxsELnPOruM4bjzToR2MY+aJ74rFOFsj5X/AORxIJ79jtefBuYcKwOEgpR5hsVh4+LYNkuDzIR8xcSPdTvFcjxGUpx2qGQrTQSOLGODwOojyBtQ7kn4o1KuVixnHa38Zuua4uEMgDWlvkb9T2PYLBx/NuaZZhOO4vAwHXS+aY67g9/t2XhPj+e8odDJflrU6DHse6nGTH8bTvmY53n0+xV8+GhxHK5S7HtrQvJljuROdI+LegCSd6b30WeO+1ky1bVGscfnWyjGN6jHag7tiYfPWPBYd+vcLe0bOR4xARcByGCYA6G1F880cehrraP1Ae49FLqVqG7Uhs1XiSCVoex4HkH1XsiJ6oiIiIrXnsqIVeiIiIiK1zGuIJaCfqFi2sXQttAs0q0oDg4dcYPceq57+MnE6F3i8D4IYan5Ww1/XHGAGh2mk9v2/ouZ4+pVr5erkxBLSuUHMjtMjr9THPZ5c3uNdTdEfdfRmIv08jTZPQe10Tu5AGi0+zh6H6FZqjvKahgbLk45LA6YDDMyLuC0ns/Xu3ufqNrUYyWTC41zeRZCO9ibjuiOYtc7s8fzHw1uj6+Fp7M1xuTkwnAcpXmrCMPmiEgeajSdf2bjsb1vTT40ulY+u6rShgfM+d0bQ0yP/U/XqfqshERERERFY7uVQb32ReiIiIiIiLGyNKDIUp6luMSQTMLHtPqCuMZTD3mmarp5v0SW9nGNt2p/K5pI7vYOx+y9ILeQoNgdiOv4ldzJZmwyB8ksHbq009nnp3sb6mn3XW8Jmsfm6gs4yyyeM+deWn2I8g/QrYOaHNIcAQfQqEZriWSNSejhcmyLG2pNzVrDOvoaf1Njd/KD37em1JMFgcbg6rYMXThrNaNbY3ufXufJW0RERERERF5OJ2dKre4V47KqIiKnqiqiIhCxLtCvbkgknZ1Pgd1xu8Fp+65vyAYKo2zbo3jHGLpZMIm6MEuvR3bo7689v2XhxPOtxOctWspAa1S0xkc08UYEQmB7OkaO7HEdvZdWhmjnibJE9r43DYc07BC9EREREREREXkf1K8IfurkREVAqoiIiEbUDznDRUns5TDxG5ZsF356rZf1MuRuPdvfsHAfpUXu4+ziZ4c3ueajLtoNhmixjjr4Fhv+Qej9fLr1C86+Ug4xcry4ue5Tpy22PsYwx9Yf1DpHwpD8vRvvoLszHBzA7xsb7q4IiIiIiIiKmtHwnqqK5ERCqN8I3yVVFQKqIqHyPsf/AMWFkv7m1/0T/wDRUHzH/pdJ/wAim2B/8no/9Fn/APIWe3wFVChVD5VzfCofIQoh8oFVFQorX+V//9k=" alt="Petersfisch">
      <figcaption><b>Petersfisch</b><span class="vi-cell">cá Peter (John Dory)</span></figcaption></figure>
    <figure class="fish"><img src="data:image/jpeg;base64,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" alt="Heilbutt">
      <figcaption><b>Heilbutt</b><span class="vi-cell">cá bơn lớn (halibut)</span></figcaption></figure>
    <figure class="fish"><img src="data:image/jpeg;base64,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" alt="Seeteufel">
      <figcaption><b>Seeteufel</b><span class="vi-cell">cá cóc biển (monkfish)</span></figcaption></figure>
    <figure class="fish"><img src="data:image/jpeg;base64,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" alt="Hering">
      <figcaption><b>Hering</b><span class="vi-cell">cá trích</span></figcaption></figure>
    <figure class="fish"><img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/wAALCACoAQcBAREA/8QAHAABAAIDAQEBAAAAAAAAAAAAAAEFAgQGBwMI/8QAPhAAAQQCAQMBBQUGAwcFAAAAAQACAwQFEQYSITFBBxMiUWEUMnGBkRUjQlKhsRYkMxdTY4KSwdE0YnKiw//aAAgBAQAAPwD9UEIiIiIiIiIo8KURERERERERETW0RERCiIiIiKFKIiIiIiIiIiIiIhRPVEREREREREUKUREREREREREREREREREREREREREREUH0UoiBQPKlERERFjI9sbS57mtaPJJ0AjHB7Q5pDmnwQexWSIiIiIEREREREREREREQIuO9o3OafDscHPaJ78oPuK4Ot/U/IBeRW+UZLl8Tb2fgDaEUfRBVgc4Nml3ou93vb/kNnQ+p7L0b2WXbeMmk41l2vilEIu0myn4vcuPxMP1YdfkV6QiIiKEUonqiIiIiIhRERERNquzuYpYTGzXclOyGCNuyXHufoB81+enxZD2mWczPUdG2/wBp2QSkBzoWnUbGfIeST42rTj8Qw7LtPG42U2ome7uXbNgQiu/q2SBvTRrwR3W7lsxlDPjMpE+XJ5fGT9DBUrOeJGSA9UbnjQ7gdtDXbyvW+KcjpclxYuUHHqaeiaJ40+J/q1w9CrpERFCBE2nqpRFDthp6dE+gQb137FSoUoieqjYVDnuX4HBfDk8pWhk0SI+rqef+Ud1zsftFlykPvOMcazGUjJ0JixsMX1+JxXxucq5a2/QoyYWhjZr7nMhNiwZe4G+/QND8yttuM59Z39ozuKqD0+z1S8/1KrcNW5NlMjkKEvIcrUkpOaHSSUI2Ml36sPqF8stxrlbM7i6o5BmLeLs9bbU8RjYYT6eBvRV5R9muDjnFjJG3l7ABa19+Yy9P4A9gs63DbmNEf7HzT4vcs91CJ60chZH/ACdWg4j81zPMfZzl89aF6y/E3bbWFmuh8HvB6dRaTvS5S1w7mjPd1pMW1lFnSP8AIzBx0Ow01zwD6b2rTiBZw/LSZC7iuVMkfH0SsixrGwP+RLYye4+fqu/pe0rjFiQRTX30Zv8Ad3YXwH/7DX9V0VXNYu2dVcjTmPyjma7+xW+1wcNgghShUIqnkvIMdxzGPu5SdsUbezW7255+QHqV5wz2pZqy1ppcXkk9/IRXBkPU5utjbQNj8ewXXcL5XcytubGZ/GHFZeNgmEJf1CSM+rT9PUei7BERNKPC5bk/M6WDmFWGGxkcg4dX2Wmz3jmj1Ltfd/NdUi+c00cEbpJntjjb3LnHQH5rjMt7RMcyR1bAwWM7eB17qk3qaD/7n+AtUYXlnKA1/IL7cJQPmjQd1SOHydL6fkr7FcJ49jGOFbF1y97el8kret7/AMSe6tcPi6eGoNp4+L3Vdhc5rAd6JJJ1+ZVJT5th58tfx1t0lCxSk6D9tAja/wBOphJ7hWX+I8KRsZagfr79v/lbMWVx8x1FeqvOt/DK09v1X3Zarv8AuTxO9Ozwe6+oc0+CPyKdXxaWSjXdYyRtkidG7fS4Fp0deVX3cHQu4k461CJaxj93qQ9Ttfie+1R5vgWCyArlmKx7Hskb1uMJBcz+IDpI7/InarMd7OG1J7nusvkasBk6qrath7TE3Xdp2SD3+i3HcUz8Df8AIcyvgjwLMEco/sF8nt9oVD4mS4HKsHbocH13H677hYN5BzmMD33DqspHkw5Fo3+G2qtucn5ndx9mxWwsGLggeY5S4us2GkeemNoG/I9VxeFuYa/njb5o7I2XgO0y8OgMIPY+7Otlx3prd61387Xdt5FJTyb4MUMPVxLCwtDpAx/T0kuJ8DyR43pcpdztTIe7s5Hk1avmq0z5KthjgY4gOwaWt2S1w7H1XovAObVOV1XMax8V+Bo9/H0no3vXUxxHcH9V16bRVGc5HisJH1ZK7FC4+Gb6nu/Bo7rhsnyi/ni2OEWMRjXk66dOt2BrwGD/AEx9T/RaMc9Pj8AsY5luGK61ry2ORvvHuHYmSV5LR+Dd7XoeX5VhMQHfb8nVjcP4OsFx/Bo7qgk5jlss8RcUwE87HeLt4mCEfXWuo/osYeDz5QifmmWnyb99YqxEw1o/oGjufzK6jj0WJjxrP2FHWbT2WtMDQG7BIP8AUFWgRFq3MdSvN6blSCdvykjDv7rn85wTBZOoI46UNKZruqOevCwOYfzBBH0IKrcp7NsTLxY4yjXrR3GRBjLkkXxkgg7cW6Pf11pRV9nGLi44yrLVqnKCDoNlgcwGTX3tAqux3s5ldgsgy48V8nJIXVXQ2pXthAAABJIJ2QSe3bassFwCFlNxy81oWnSOcG1r83Qxvo0EkEpX4M9uVsNlu3zi3DcRbkZhK09vh1vWvJ3vfdWH+CYGg+6zXIIj6Ft9x1+u1Q5TE8wxmZqVsPm79rGz6D5rEUUr4e56iXEDtrWux77Vlfw/Nq1aWTF8nr3JwPght0GMB7/zNPb9FUnknPI7DYZ8NjYXusNrN6mSua8kff6m9g36kLoftHN/Sjx/t6faJe5/6VDbvNm934fCO+jb0g//ADWX7Z5RGP3/ABaOQ/8AAyLTv/qaFiOUZVnafiOWB9eh8Tx+vUsv8VXA7T+K5tpPfsyM/wBnrG3n4LBEd3jOVka5vfrpteBv08qmlbxF8hNvidiIH+N+NOv6Ktn457PrDgDgrkW++2V5m/2W9iePYud4r4DPcix4A+GIOPQNfLraf7rcbx3PuZK7H86viNhLX+/pxyEEee/ZfO3xzl7Me+atzKzYkDepsYpxt6/pv0WxW4TkZBG69y3OysI2+ESMj7/LYCpuYY/FcXrx1cTVuS5a24dJDi57wTrTpXAlrdkbI7rnjV5hJFYiiGFwkBd7t9gP/eSFo8BxO3f0VbUbkqcjhJyOg267u6Z3Q6UD+VnT1nXz2vV+NUeF1A1+DbiS938bJGvefzJJW3zDJZSjTruwdZk4c4tmlDDKYW67EMBBd3+q4rhec5nk8kauZq++pySOilLqjq/TFojra7t+nleg8W47j+M480sS2VlYvMgZJKX6J862trNZODD4uxftk+5gb1HpGyfQAfUnQXL4/nE8zZpLuEs1omztqxlsjXuklJHw6HjQOz+C+Fr2hmHI+5jxM80D3uihcyRvXI5r+gnpPgdWwO/fRVVF7W4Zcp7j9kTw14ZC23JLI0OiaCWl4aO7gCDsjwF6dXniswRz15GSwyAOY9hDmuB8EH1X0RETssZHtjjc95Aa0Ek/IKK80dmCOaFwfFIA5rh4IPgrNVM3I8XFkXUXW2m20OLo2NLiOlvUR29dd9eVaRPa+Jkjd9LgCCQsbNiKrBJPYkbFDGC5z3nQaPmSsatqG2wvryB7AdFw8eAf+4VdNlpo4b8raMsjasoYGtPxSN0C5wH02e3rpakOdtvyMzXUP8lFC6UyMJe8kEdI6QOxPfY8jSumTSmvDIYXdT9dTQfu7XygvarufkPdVHhxGnSjWt9jv6qmyvN+O46QNmzFPrb96ON3vHkfg1aP+0TFS/8AoaWWukefc0n6/UgBQ/l2Ymka3H8RyUjT36p3siH9SUPI+Vs+OTiLjEO5DLjC/X4aUUfaLRmuto2sZlquQIJ+zPrkuIHkgjyFlZ5jg5/fOloZKUNa6KUmi8gD1adhUNC4OS2YaOLw8NLBtcXSyGNjpCNeno3Y0N+dLO/xbDciyMWFx1KCnQpxiazNAAHlzhpkYcO/jZPf0C6S57OeI2y50mBpNe7uXxM92f1bpVDfZNhIHl1C9mKRP+5uOCqc1xjlHH7lWXjWYzV+ppwmhkmbK4H0ID9Aj6LcxHMeRUPejPcezVlp0I3Q0QCPnvpcd/0WrnOcwZfDWsfewmfrue4bc2g/4dODgf1AXKTc+r1TXrtx957YMp9uMphLS5p3sdJHkb1+SpMTzeCll6151K04Vyddu3d0rzv/AJpB+QWOG/zjZLFetqz7wze9MYbK/q+MtJ1sOG9gg7I15Xd8F5fj+OizRyFyKGnI0TwPJ3FG87Lmbb2bvz0/iR2XQH2ocYZNLCcyZ2vdvbK79MbrRAIHlfGjzbj81SIV+RVIpxH7oddwhrWl33tP7l4A33H0Ww3k1aerBHJy3Ftb1Se9cyZjJT8X7sAgkDxo/PataPLsdLL7yfN4npEbGyV2WGfunnyeskbCpcxk+OOy7M1LyWiLdVjhC2G22MP7khjhvTh9CpPtI4yKpZaz9WSSZrBIxpIDAW/F0Fu/7+fVasPtB419jpR4uXNOr0z8LIKsrxIACA1ztHY/NYWPaBA+Z8tCryX3rnhwY+g98fgDQGtgev4r45HkOPuwMfPiuU1bJfG+aavjywyuY4EdWh38foSuw4/n8Byd1ptK0ZJ5AGzVJnFkjNf8M9x9dK+jqN+wmtbd9qYdh3vWj4gT4I8a9FxfPeW2sHZr47HNirzSBrmSza6HjuCxncAPHbQdoFc7DmzLIYcvza3hbLnbMNinHXc7fqHEEOH1BXS0uKyXq4kj5pmbTH9+uvYY1rvzaF9pPZ7TsdrmZz9kfKS+/wD7LOH2Z8UY4OmxTLL973ZkdKT+pXRY7CYzGsazH4+rWa0aAiia3Q/IKwDQPCaU6VLyfjtPkFRsdkPisRHqgsxHplgd/M13kLnMHmI+PzyYXk4r17chMkVwnpivdvvbPh/YbB/JVlWyzCZtuQpVIn1bUJknjrP/AHYZ5Lmn7rteo+pVh7PpKkHJuR1arI2xzPZahMZHS5hHSda8aIK9ARETSwMbD5a0/ksXQROYWGNnSRojpC/PWao/4ZzuShsRTGpWmEjHscW6j+9D8Q7j+Jm/Qtaucmjjz9Bk9SEm4C8yVTJ3n6e+/T4w0k+NHRVxjK2LrW4L2M6qMob0EunLfdk9w2Qt3rfo/u0+CAV1dDk1TH2m0+V0KliF0gjd9prMFqHfguABbKw/zNP4helDiHGpWh/7DxpDhsH7O3x+i+c3BuLzdPvMDjj09hqBo/svvX4jx2udw4THNPz+zt/8KxhxlCD/AEaVaP8A+ETR/wBltNjYwaY0NHyA0p0mlz3JeIYvPD3s0P2e+3/TuwfBNGfmHDz+BXkvIH8qweTGMzuVtSUn6bUt7DIpfPwvd6P7+vb8PIqbNOGWxq6LkV0u6xkGOLnxPGtB7D37+B9PBctrIw5mjWa/H5XHWG9IlfHYgEMUgPlu3/AT8wQ0qeEYrNckjsW6OHp4mxGB0WYzLVEhO+7Qz4Xfppey8KxeWxeL93nco/I23kOLiOzO3cA6Gx+K6JEREVfm8RRzdCSllK0diu8d2vG9fUfIry3KYDO8UqzValexl8EWlkRg0Z6rCduBZ26wf1W17OpIMhzizbxNLI1cZBQEB+1xlnxl+9Df4FesIO6IiKHHWvxXnHtToxw2YcjZ9+MdYiNK46Fgc5oJ3G7R7fe7fmvP5YI8JnpoGs97O09Twa2tP+85zB5JA+MD1HUB4Cxu168lh1jGxV2ZXXvZImE/5hhH+pGddL9/xMI7juNEK74LRHKOQY58lIRUsS500z2yPfG+Y/dY3rGwR5I9OwXt48IiIiIq/OYmnmsbPRyMQlrTDTmn+4+q4J/sq1CIK/I8nHXZ2ja9rHljf5eojZH0VrgvZngcbJHPYZLkbbAB762/rJ147eOy7ZrGsa1rAGtaNADwAsgigKURFHqpUaAOwO6n0UBSigqQi1Mtj6+VxtijdZ1152GN7fmCvDclibmJyAx1mWw6akwkTxyAyzVtksnbv+OI+R6t2PC3C2Onip8i8QzV6+pm1hIG6meC1skRBI6HdWyw+PI0vWeJYlmGwFSm09Ugb1yvPl7z3cT+auERERERQhRNqT3QeEREUHypREREREXNc2403P04pK72w5OoS+tO5ocO405jh6scNgheKtrx0clj8VN72takyMDXY+Zp/dMD9ksPh7N70T48L9HjwiIiIiIoRPRQskRERERERERERfCanWnnhmmgikmhJMb3NBcwn5H0X3RPQoPCIiIEUIU9E9UClEREQqDshSoUoiIiIiKPVSiIoKlEUInzQeFKIiglN/NB3U7RR4U7REREREREREUFShRFCkKNd9oDtSigqVipRAgClFHlSiIiIiIiIoUooRPxUoERQpUJtEUoiIiIiIiIoPYEgE/QKGnqaHaI36FTpSiFPRR4RCEHjupREUO7KB37r//Z" alt="Stör">
      <figcaption><b>Stör</b><span class="vi-cell">cá tầm</span></figcaption></figure>
  </div>

  <div class="warn"><span class="tag">Bitte prüfen · Kiểm tra lại</span>
    Auf dem Blatt steht <b>„Seelachs“ zweimal</b> (Bild 3 und Bild 8). Vergleiche mit deinem Lösungsblatt.
    <div class="vi"><span class="tag">VI</span>Trên phiếu bạn viết “Seelachs” hai lần (hình 3 và hình 8). Hãy đối chiếu lại với bản đáp án của giáo viên.</div>
  </div>

  <h3 class="sub">Weitere Seefische (Blatt 1)
    <span class="vi-sub">Các cá biển khác trên phiếu số 1 — chưa có hình</span>
  </h3>
  <table>
    <tr><th>Seefisch</th><th>Tiếng Việt</th></tr>
    <tr><td><b>Steinbutt</b></td><td class="vi-cell" style="display:table-cell">cá bơn turbot</td></tr>
    <tr><td><b>Scholle</b></td><td class="vi-cell" style="display:table-cell">cá bơn sao (plaice)</td></tr>
    <tr><td><b>Seezunge</b></td><td class="vi-cell" style="display:table-cell">cá bơn lưỡi trâu (sole)</td></tr>
    <tr><td><b>Rotzunge</b></td><td class="vi-cell" style="display:table-cell">cá bơn đỏ</td></tr>
    <tr><td><b>Seehecht</b></td><td class="vi-cell" style="display:table-cell">cá tuyết hake</td></tr>
    <tr><td><b>Steinbeisser</b></td><td class="vi-cell" style="display:table-cell">cá sói biển (wolffish)</td></tr>
    <tr><td><b>Wolfsbarsch</b></td><td class="vi-cell" style="display:table-cell">cá vược biển</td></tr>
    <tr><td><b>Seeaal</b></td><td class="vi-cell" style="display:table-cell">cá nhám góc (Dornhai)</td></tr>
  </table>

  <h3 class="sub">Süßwasserfische (Blatt 3)
    <span class="vi-sub">Cá nước ngọt trên phiếu số 3 — chưa có hình</span>
  </h3>
  <table>
    <tr><th>Süßwasserfisch</th><th>Tiếng Việt</th></tr>
    <tr><td><b>Forelle (Regenbogenforelle)</b></td><td class="vi-cell" style="display:table-cell">cá hồi vân</td></tr>
    <tr><td><b>Saibling</b></td><td class="vi-cell" style="display:table-cell">cá hồi suối</td></tr>
    <tr><td><b>Lachs</b></td><td class="vi-cell" style="display:table-cell">cá hồi</td></tr>
    <tr><td><b>Flussbarsch</b></td><td class="vi-cell" style="display:table-cell">rô châu Âu</td></tr>
    <tr><td><b>Zander</b></td><td class="vi-cell" style="display:table-cell">cá vược sông</td></tr>
    <tr><td><b>Aal</b></td><td class="vi-cell" style="display:table-cell">lươn</td></tr>
    <tr><td><b>Hecht</b></td><td class="vi-cell" style="display:table-cell">cá măng sông / cá chó</td></tr>
    <tr><td><b>Wels</b></td><td class="vi-cell" style="display:table-cell">cá da trơn, cá nheo</td></tr>
    <tr><td><b>Stör</b></td><td class="vi-cell" style="display:table-cell">cá tầm</td></tr>
    <tr><td><b>Schleie</b></td><td class="vi-cell" style="display:table-cell">cá tench (họ cá chép)</td></tr>
    <tr><td><b>Karpfen</b></td><td class="vi-cell" style="display:table-cell">cá chép</td></tr>
    <tr><td><b>Brasse</b></td><td class="vi-cell" style="display:table-cell">cá mè trắng</td></tr>
  </table>
</section>

<span class="badge-set">Prüfungsvorbereitung · Test</span>

<!-- ============ QUIZ ============ -->
<section class="chapter" id="quiz">
  <div class="chapter-head">
    <span class="chapter-num">?</span>
    <h2 class="chapter-title-de">Prüfungs-Check (Schnellfragen)</h2>
    <span class="lf-tag">Fisch</span>
  </div>
  <p class="chapter-title-vi">Câu hỏi nhanh — bấm để xem đáp án</p>

  <details class="q"><summary><span class="qnum">F1</span> Nach welchen 5 Kriterien werden Fische eingeteilt?</summary>
    <div class="ans"><div class="de">Herkunft/Lebensraum · Wanderverhalten · Körperform · Fang oder Zucht · Fettgehalt.</div>
    <div class="vi"><span class="tag">VI</span>Nguồn gốc/môi trường · di cư · hình dáng · đánh bắt hay nuôi · hàm lượng béo.</div></div></details>

  <details class="q"><summary><span class="qnum">F2</span> Wohin wandert der Aal zum Laichen, wohin der Lachs?</summary>
    <div class="ans"><div class="de">Aal: vom Süßwasser ins <b>Meer</b>. Lachs: vom Meer ins <b>Süßwasser</b>.</div>
    <div class="vi"><span class="tag">VI</span>Lươn ra biển đẻ trứng; cá hồi về nước ngọt đẻ trứng.</div></div></details>

  <details class="q"><summary><span class="qnum">F3</span> Wie unterscheiden sich Plattfische und Rundfische?</summary>
    <div class="ans"><div class="de">Plattfische: flach, asymmetrisch, beide Augen auf einer Seite, Bodenfische. Rundfische: symmetrisch, je ein Auge pro Seite, freischwimmend.</div>
    <div class="vi"><span class="tag">VI</span>Cá bẹt: hai mắt một bên, sống đáy. Cá tròn: mỗi bên một mắt, bơi tự do.</div></div></details>

  <details class="q"><summary><span class="qnum">F4</span> Ab wann gilt ein Fisch als Fettfisch? Nenne 3 Beispiele.</summary>
    <div class="ans"><div class="de">Über <b>10 %</b> Fett: z. B. Makrele, Hering, Aal, Lachs.</div>
    <div class="vi"><span class="tag">VI</span>Trên 10 % chất béo: cá thu, cá trích, lươn, cá hồi…</div></div></details>

  <details class="q"><summary><span class="qnum">F5</span> Nenne die Inhaltsstoffe des Fisches mit Zahlen.</summary>
    <div class="ans"><div class="de">Fett 0,5–25 % · Eiweiß 15–23 % · Kohlenhydrate &lt; 1 % · Jod bis 330 µg/100 g · viele Omega-3-Fettsäuren.</div></div></details>

  <details class="q"><summary><span class="qnum">F6</span> Woran erkennt man Hecht, Karpfen und Zander?</summary>
    <div class="ans"><div class="de">Hecht: lange Schnauze. Karpfen: Bartfäden am Maul. Zander: kleiner Dorn am Kiemendeckel.</div>
    <div class="vi"><span class="tag">VI</span>Măng sông: mõm dài. Chép: râu. Vược sông: gai nhỏ ở nắp mang.</div></div></details>

  <details class="q"><summary><span class="qnum">F7</span> Was ist der Unterschied zwischen Stockfisch und Klippfisch?</summary>
    <div class="ans"><div class="de">Beide sind getrockneter Kabeljau. Stockfisch wird <b>ohne Salz</b> luftgetrocknet, Klippfisch wird <b>erst gesalzen</b>, dann getrocknet.</div>
    <div class="vi"><span class="tag">VI</span>Stockfisch: không muối. Klippfisch: muối trước rồi phơi.</div></div></details>

  <details class="q"><summary><span class="qnum">F8</span> Was ist ein Bückling, was sind Schillerlocken?</summary>
    <div class="ans"><div class="de">Bückling: ganzer, ausgenommener Hering mit Kopf, heiß geräuchert. Schillerlocken: gerollte Bauchlappen vom Dornhai, heiß geräuchert.</div></div></details>

  <details class="q"><summary><span class="qnum">F9</span> Welches Konservierungsprinzip steckt hinter Matjes, Stockfisch und Rollmops?</summary>
    <div class="ans"><div class="de">Matjes: Salz (osmotischer Druck, dazu milchsaure Reifung). Stockfisch: Trocknen (Wasserentzug). Rollmops: Säuern (pH-Wert sinkt durch Essigsäure).</div>
    <div class="vi"><span class="tag">VI</span>Muối · phơi khô · giấm (hạ pH).</div></div></details>

  <details class="q"><summary><span class="qnum">F10</span> Nenne 3 Kaviarersatz-Produkte und ihr Merkmal.</summary>
    <div class="ans"><div class="de">Lachskaviar (orange-rot) · Deutscher Kaviar (schwarz gefärbt) · Tobiko (Flugfisch-Rogen) · Keta-Kaviar (Ketalachs).</div></div></details>

  <details class="q"><summary><span class="qnum">F11</span> Welche Weißweine passen zu Fischgerichten?</summary>
    <div class="ans"><div class="de">Müller-Thurgau, Weißburgunder, Chardonnay, Viognier.</div></div></details>
</section>
</main>

<footer>
  <div class="de">Zusammengestellt als Lernskript zum Thema Fisch — Warenkunde.</div>
  <div class="vi">Tổng hợp tài liệu ôn tập về Cá (Fisch). Chúc bạn ôn thi hiệu quả! </div>
</footer>

<script>
function toggleViFisch(){ var wrap=document.querySelector('.fisch-skript-wrap'); if(!wrap) return; wrap.classList.toggle('hide-vi'); var b=document.getElementById('viToggle'); if(b) b.textContent=wrap.classList.contains('hide-vi') ? 'DE · Tiếng Việt: TẮT' : 'VI · Tiếng Việt: BẬT'; } window.toggleViFisch = toggleViFisch;
</script>

</div>`
              }
            ]
          },
          {
            id: "milch-kaese",
            badge: "2. Jahr · LF 10",
            title: "Milch & Käse — Warenkunde & Service (LF 10)",
            items: [
              {
                id: "milch-kaese",
qa: [
                  {
                    q: "Welche Wärmebehandlungsverfahren für Konsummilch gibt es und wie unterscheiden sie sich?",
                    qVi: "Có những phương pháp xử lý nhiệt nào cho sữa tiêu dùng và chúng khác nhau ra sao?",
                    a: "<ul><li><b>Pasteurisieren (Frischmilch):</b> 72–75 °C für 15–30 Sek.; gekühlt ca. 7–10 Tage haltbar.</li><li><b>ESL-Milch (Extended Shelf Life):</b> 127 °C für 2–4 Sek.; gekühlt ca. 3 Wochen haltbar.</li><li><b>Ultrahocherhitzen (H-Milch):</b> 135–150 °C für 2–4 Sek.; ungeöffnet mehrere Monate haltbar.</li><li><b>Sterilisieren:</b> 110–120 °C für 20–30 Min.; bis zu 1 Jahr haltbar.</li></ul>",
                    aVi: "<ul><li><b>Thanh trùng Pasteur (Frischmilch):</b> 72–75 °C trong 15–30 giây; giữ lạnh 7–10 ngày.</li><li><b>Sữa ESL:</b> 127 °C trong 2–4 giây; giữ lạnh 3 tuần.</li><li><b>Tiệt trùng UHT (H-Milch):</b> 135–150 °C trong 2–4 giây; để nhiệt độ phòng được nhiều tháng.</li><li><b>Tiệt trùng Sterilisieren:</b> 110–120 °C trong 20–30 phút; để được 1 năm.</li></ul>"
                  },
                  {
                    q: "Was bedeutet die Angabe „45 % Fett i. Tr.“ bei Käse?",
                    qVi: "Ký hiệu „45 % Fett i. Tr.“ trên phô mai có nghĩa là gì?",
                    a: "<b>Fett i. Tr.</b> bedeutet <b>Fett in der Trockenmasse</b> (Anteil des Fettes an der wasserfreien Käsemasse). Der absolute Fettgehalt im gesamten Käse ist deutlich geringer (bei Hartkäse ca. Fett i. Tr. × 0,7; bei Weichkäse × 0,5).",
                    aVi: "<b>Fett i. Tr.</b> nghĩa là <b>Hàm lượng chất béo tính trên chất khô</b>. Hàm lượng béo thực tế thấp hơn nhiều (phô mai cứng × 0,7; phô mai mềm × 0,5)."
                  }
                ],
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 21h10a2 2 0 0 0 2-2V9l-7-6-7 6v10a2 2 0 0 0 2 2z"/><circle cx="15.5" cy="15.5" r="1.5"/><circle cx="9.5" cy="16.5" r="1"/></svg>',
                name: "Milch & Käse — Lernfeld 10 (LS 2–3)",
                desc: "§1 Milchprodukte · §2 6 Käsegruppen · §3 Sorten-Tabelle · §4 Herstellung · §5 Zusammensetzung · §6 Fettstufen · §7 Fett i. Tr. · §8 Verwendung · §9 Käseplatte · §10 Getränke · §11 Concept Map · Prüfungs-Check",
                vokabeln: [
          {
                    "de": "Trinkmilch",
                    "vi": "sữa uống"
          },
          {
                    "de": "Rohmilch",
                    "vi": "sữa thô (chưa xử lý nhiệt)"
          },
          {
                    "de": "Pasteurisierte Milch",
                    "vi": "sữa thanh trùng (đun nóng ngắn)"
          },
          {
                    "de": "Frischmilch",
                    "vi": "sữa tươi bảo quản lạnh"
          },
          {
                    "de": "ESL-Milch",
                    "vi": "sữa ESL (lâu hỏng / bảo quản kéo dài)"
          },
          {
                    "de": "Sahne / Rahm",
                    "vi": "kem sữa"
          },
          {
                    "de": "Zentrifugieren",
                    "vi": "ly tâm (tách chất béo)"
          },
          {
                    "de": "Separator",
                    "vi": "máy ly tâm tách béo"
          },
          {
                    "de": "Schlagsahne",
                    "vi": "kem đánh bông"
          },
          {
                    "de": "Crème fraîche",
                    "vi": "kem chua crème fraîche"
          },
          {
                    "de": "Butter",
                    "vi": "bơ"
          },
          {
                    "de": "Käse",
                    "vi": "phô mai"
          },
          {
                    "de": "Lab",
                    "vi": "men đông tụ sữa (men dịch vị/rennet)"
          },
          {
                    "de": "Säuerung",
                    "vi": "lên men chua (làm đông sữa)"
          },
          {
                    "de": "Käsebruch",
                    "vi": "phần đông tụ phô mai (sữa vón cục)"
          },
          {
                    "de": "Molke",
                    "vi": "nước whey (nước sữa sau khi tách đông)"
          },
          {
                    "de": "Quark",
                    "vi": "phô mai tươi quark"
          },
          {
                    "de": "Joghurt",
                    "vi": "sữa chua"
          },
          {
                    "de": "Hartkäse",
                    "vi": "phô mai cứng (ủ lâu, chất khô cao)"
          },
          {
                    "de": "Schnittkäse",
                    "vi": "phô mai cắt lát"
          },
          {
                    "de": "Halbfeste Schnittkäse",
                    "vi": "phô mai cắt lát nửa cứng"
          },
          {
                    "de": "Weichkäse",
                    "vi": "phô mai mềm"
          },
          {
                    "de": "Frischkäse",
                    "vi": "phô mai tươi (không qua ủ chín)"
          },
          {
                    "de": "Sauermilchkäse",
                    "vi": "phô mai sữa chua (ít béo, giàu đạm)"
          },
          {
                    "de": "Blauschimmelkäse",
                    "vi": "phô mai mốc xanh (Penicillium roqueforti)"
          },
          {
                    "de": "Rotschmierekäse",
                    "vi": "phô mai bôi đỏ (Brevibacterium linens)"
          },
          {
                    "de": "Trockenmasse (TM)",
                    "vi": "hàm lượng chất khô trong phô mai"
          },
          {
                    "de": "Wassergehalt",
                    "vi": "hàm lượng nước"
          },
          {
                    "de": "Fett i. Tr.",
                    "vi": "hàm lượng béo trong chất khô"
          },
          {
                    "de": "absoluter Fettgehalt",
                    "vi": "hàm lượng béo tuyệt đối thực tế"
          },
          {
                    "de": "Doppelrahmstufe",
                    "vi": "bậc béo kép (≥ 60 % Fett i. Tr.)"
          },
          {
                    "de": "Rahmstufe",
                    "vi": "bậc béo kem (50 – 59 % Fett i. Tr.)"
          },
          {
                    "de": "Vollfettstufe",
                    "vi": "bậc nguyên béo (45 – 49 % Fett i. Tr.)"
          },
          {
                    "de": "Fettstufe",
                    "vi": "bậc béo (40 – 44 % Fett i. Tr.)"
          },
          {
                    "de": "Dreiviertelfettstufe",
                    "vi": "bậc ba phần tư béo (30 – 39 % Fett i. Tr.)"
          },
          {
                    "de": "Halbfettstufe",
                    "vi": "bậc nửa béo (20 – 29 % Fett i. Tr.)"
          },
          {
                    "de": "Viertelfettstufe",
                    "vi": "bậc một phần tư béo (10 – 19 % Fett i. Tr.)"
          },
          {
                    "de": "Magerstufe",
                    "vi": "bậc ít béo (< 10 % Fett i. Tr.)"
          },
          {
                    "de": "Käseplatte",
                    "vi": "khay phô mai bày tiệc"
          },
          {
                    "de": "Käseuhr",
                    "vi": "đồng hồ phô mai (thứ tự ăn từ nhẹ đến đậm)"
          },
          {
                    "de": "Kühlkette",
                    "vi": "chuỗi bảo quản lạnh liên tục"
          },
          {
                    "de": "Käsespätzle",
                    "vi": "món mì Spätzle phô mai Đức"
          },
          {
                    "de": "Raclette",
                    "vi": "món phô mai nướng chảo Raclette Thụy Sĩ"
          }
],
                content: `<style>

/* ===== DESIGN TOKENS =====
  ink    #1B1F2A  primary text / spine
  paper  #F1ECDE  parchment ground
  wax    #7A2E2E  paragraph seal / DE accent
  brass  #9C7A3C  rule / numerals
  slate  #48586B  VI translation voice
  line   #D8CFB8  hairline
*/
.kaese-skript-wrap {
  --ink:#1B1F2A; --paper:#F1ECDE; --paper2:#EAE3D0; --wax:#7A2E2E;
  --brass:#9C7A3C; --slate:#48586B; --line:#D8CFB8; --slateline:#c7d0da;
  --green:#5b7a52; --greenbg:#eef3ea;
}

.kaese-skript-wrap, .kaese-skript-wrap * {box-sizing:border-box;}

.kaese-skript-wrap {scroll-behavior:smooth;}

.kaese-skript-wrap {
  margin:0; background:var(--paper);
  background-image:
    repeating-linear-gradient(0deg, rgba(0,0,0,0.012) 0px, rgba(0,0,0,0.012) 1px, transparent 1px, transparent 3px);
  color:var(--ink); font-family:"Source Serif 4",Georgia,serif; line-height:1.65;
  font-size:17px;
}

.kaese-skript-wrap ::selection {background:#d9c9a3;}

.kaese-skript-wrap a {color:var(--wax);}


/* ---- Header: title block like a statute cover page ---- */
.kaese-skript-wrap header.cover {
  padding:60px 24px 42px; text-align:center; position:relative;
  border-bottom:3px double var(--brass);
  background:linear-gradient(180deg, var(--paper2), var(--paper));
}

.kaese-skript-wrap header.cover .kicker {
  font-family:"IBM Plex Mono",monospace; letter-spacing:.18em; font-size:.72rem;
  text-transform:uppercase; color:var(--brass); margin-bottom:14px;
}

.kaese-skript-wrap header.cover h1 {
  font-family:"Fraunces",serif; font-weight:600; font-size:clamp(1.9rem,5vw,3.1rem);
  margin:0 0 10px; color:var(--ink); letter-spacing:-.01em;
}

.kaese-skript-wrap header.cover h1 em {font-style:italic; color:var(--wax); font-weight:500;}

.kaese-skript-wrap header.cover .subtitle-de {font-size:1.02rem; color:var(--ink); margin:4px 0;}

.kaese-skript-wrap header.cover .subtitle-vi {
  font-family:"IBM Plex Sans",sans-serif; font-size:.92rem; color:var(--slate);
  margin:2px 0 0; font-style:normal;
}

.kaese-skript-wrap header.cover .subtitle-vi:before {content:"VI · "; font-weight:600; letter-spacing:.03em; color:var(--slate); opacity:.7;}

.kaese-skript-wrap header.cover .exam-meta {
  display:flex; gap:10px; justify-content:center; flex-wrap:wrap; margin-top:18px;
  font-family:"IBM Plex Mono",monospace; font-size:.72rem;
}

.kaese-skript-wrap header.cover .exam-meta span {
  border:1px solid var(--brass); color:var(--wax); padding:4px 12px; border-radius:20px;
  letter-spacing:.04em;
}


/* ---- Legend + controls ---- */
.kaese-skript-wrap .legend {
  max-width:820px; margin:22px auto 0; display:flex; gap:18px; justify-content:center;
  flex-wrap:wrap; align-items:center; font-family:"IBM Plex Sans",sans-serif; font-size:.82rem; color:var(--ink);
}

.kaese-skript-wrap .legend .item {display:flex; align-items:center; gap:8px;}

.kaese-skript-wrap .legend .swatch {width:16px; height:16px; border-radius:2px; flex-shrink:0;}

.kaese-skript-wrap .legend .swatch.de {background:var(--wax);}

.kaese-skript-wrap .legend .swatch.vi {background:var(--slate);}

.kaese-skript-wrap .toggle-btn {
  cursor:pointer; font-family:"IBM Plex Mono",monospace; font-size:.72rem; letter-spacing:.05em;
  background:var(--ink); color:var(--paper); border:none; padding:8px 14px; border-radius:6px;
  text-transform:uppercase; transition:.15s;
}

.kaese-skript-wrap .toggle-btn:hover {background:var(--wax);}


/* ---- Sticky paragraph nav ---- */
.kaese-skript-wrap nav.spine {
  position:sticky; top:0; z-index:20; background:var(--ink); color:var(--paper);
  display:flex; gap:0; overflow-x:auto; white-space:nowrap; padding:0 10px;
  box-shadow:0 2px 10px rgba(0,0,0,.15);
}

.kaese-skript-wrap nav.spine a {
  color:var(--paper); text-decoration:none; font-family:"IBM Plex Mono",monospace;
  font-size:.74rem; letter-spacing:.03em; padding:13px 14px; border-right:1px solid rgba(255,255,255,.12);
  opacity:.72; transition:.15s;
}

.kaese-skript-wrap nav.spine a:hover {opacity:1; background:rgba(255,255,255,.06); color:#EFC9A0;}

.kaese-skript-wrap nav.spine a.exam {color:#EFC9A0; opacity:.9;}

.kaese-skript-wrap nav.spine .grp {
  font-family:"IBM Plex Mono",monospace; font-size:.64rem; letter-spacing:.1em; text-transform:uppercase;
  color:var(--brass); padding:13px 8px 13px 14px; align-self:center; opacity:.9;
}


.kaese-skript-wrap main {max-width:840px; margin:0 auto; padding:10px 24px 100px;}


/* ---- Section shell: like a numbered § chapter ---- */
.kaese-skript-wrap section.chapter {padding:50px 0 20px; border-bottom:1px solid var(--line); scroll-margin-top:54px;}

.kaese-skript-wrap section.chapter:last-of-type {border-bottom:none;}

.kaese-skript-wrap .chapter-head {display:flex; align-items:baseline; gap:16px; margin-bottom:6px;}

.kaese-skript-wrap .chapter-num {
  font-family:"Fraunces",serif; font-weight:700; font-size:2.5rem; color:var(--brass);
  line-height:1; flex-shrink:0;
}

.kaese-skript-wrap .chapter-title-de {font-family:"Fraunces",serif; font-weight:600; font-size:1.5rem; color:var(--ink); margin:0;}

.kaese-skript-wrap .chapter-title-vi {
  font-family:"IBM Plex Sans",sans-serif; font-size:.95rem; color:var(--slate); margin:4px 0 0 60px;
}

.kaese-skript-wrap .chapter-title-vi:before {content:"VI · "; font-weight:600; opacity:.7;}

.kaese-skript-wrap .lf-tag {
  font-family:"IBM Plex Mono",monospace; font-size:.62rem; letter-spacing:.1em; text-transform:uppercase;
  background:var(--wax); color:var(--paper); padding:3px 9px; border-radius:4px; margin-left:auto; align-self:center;
}


.kaese-skript-wrap h3.sub {
  font-family:"Fraunces",serif; font-weight:600; font-size:1.16rem; color:var(--wax);
  margin:32px 0 4px; padding-left:14px; border-left:3px solid var(--wax);
}

.kaese-skript-wrap h3.sub .vi-sub {
  display:block; font-family:"IBM Plex Sans",sans-serif; font-weight:500; font-size:.82rem;
  color:var(--slate); margin-top:3px; border-left:none; padding-left:0; letter-spacing:0;
}

.kaese-skript-wrap h4.h4 {font-family:'IBM Plex Sans',sans-serif; color:var(--ink); margin:24px 0 6px; font-size:1rem;}

.kaese-skript-wrap h4.h4 .vi-sub {display:block; color:var(--slate); font-weight:400; font-size:.82rem; margin-top:2px;}


/* ---- The core DE→VI stacked block ---- */
.kaese-skript-wrap .block {margin:16px 0 22px;}

.kaese-skript-wrap .de {
  position:relative; padding:14px 18px 14px 20px; background:rgba(122,46,46,.045);
  border-left:3px solid var(--wax); border-radius:0 6px 6px 0; font-size:1rem;
}

.kaese-skript-wrap .de .tag {
  font-family:"IBM Plex Mono",monospace; font-size:.66rem; letter-spacing:.12em;
  text-transform:uppercase; color:var(--wax); display:block; margin-bottom:5px; opacity:.85;
}

.kaese-skript-wrap .vi {
  font-family:"IBM Plex Sans",sans-serif; font-size:.9rem; color:var(--slate);
  padding:10px 18px 4px 20px; border-left:3px solid var(--slateline); margin-top:-4px;
}

.kaese-skript-wrap .vi .tag {
  font-family:"IBM Plex Mono",monospace; font-size:.64rem; letter-spacing:.12em;
  text-transform:uppercase; color:var(--slate); display:block; margin-bottom:4px; opacity:.75;
}

/* Vietnamese hide toggle */
.kaese-skript-wrap.hide-vi .vi {display:none !important;}

.kaese-skript-wrap.hide-vi .vi-sub {display:none !important;}

.kaese-skript-wrap.hide-vi .vi-cell {display:none !important;}

.kaese-skript-wrap.hide-vi .vi-mini {display:none !important;}

.kaese-skript-wrap.hide-vi .chapter-title-vi {display:none !important;}


.kaese-skript-wrap ul, .kaese-skript-wrap ol {margin:10px 0; padding-left:26px;}

.kaese-skript-wrap li {margin:5px 0;}

.kaese-skript-wrap li.de {border-radius:0 6px 6px 0; margin:7px 0;}


.kaese-skript-wrap .para-code {
  font-family:"IBM Plex Mono",monospace; font-size:.7rem; font-weight:600; color:#fff;
  background:var(--brass); padding:2px 8px; border-radius:10px; margin-left:6px; letter-spacing:.02em;
  display:inline-block;
}

.kaese-skript-wrap b, .kaese-skript-wrap strong {color:var(--ink);}

.kaese-skript-wrap .vi b, .kaese-skript-wrap .vi strong {color:#324150;}


.kaese-skript-wrap table {width:100%; border-collapse:collapse; margin:16px 0; font-size:.9rem; background:#fff;}

.kaese-skript-wrap th, .kaese-skript-wrap td {border:1px solid var(--line); padding:9px 11px; text-align:left; vertical-align:top;}

.kaese-skript-wrap th {background:var(--ink); color:var(--paper); font-family:"IBM Plex Sans",sans-serif; font-weight:600; font-size:.78rem; letter-spacing:.03em; text-transform:uppercase;}

.kaese-skript-wrap tr:nth-child(even) td {background:var(--paper2);}

.kaese-skript-wrap td.vi-cell {color:var(--slate); font-family:"IBM Plex Sans",sans-serif; font-size:.82rem;}

.kaese-skript-wrap .vi-cell {color:var(--slate); font-family:"IBM Plex Sans",sans-serif; font-size:.82rem; display:block; margin-top:3px;}


.kaese-skript-wrap .example {
  background:var(--greenbg); border-left:4px solid var(--green); border-radius:0 6px 6px 0;
  padding:10px 16px; margin:12px 0; font-size:.92rem;
}

.kaese-skript-wrap .example .tag {font-family:"IBM Plex Mono",monospace; font-size:.65rem; letter-spacing:.1em; color:#3f5c39; text-transform:uppercase; display:block; margin-bottom:4px;}

.kaese-skript-wrap .example .vi {border:none; padding:4px 0 0; margin:0;}


.kaese-skript-wrap .warn {
  background:#f7e9df; border-left:4px solid var(--wax); border-radius:0 6px 6px 0;
  padding:10px 16px; margin:12px 0; font-size:.92rem;
}

.kaese-skript-wrap .warn .tag {font-family:"IBM Plex Mono",monospace; font-size:.65rem; letter-spacing:.1em; color:var(--wax); text-transform:uppercase; display:block; margin-bottom:4px;}

.kaese-skript-wrap .warn .vi {border:none; padding:4px 0 0; margin:0;}


.kaese-skript-wrap .timeline {
  display:flex; justify-content:space-between; margin:26px 0 8px; padding:16px 10px;
  border:1px solid var(--line); border-radius:8px; background:#fff;
  font-family:"IBM Plex Mono",monospace; font-size:.78rem; text-align:center; color:var(--ink);
}

.kaese-skript-wrap .timeline div {flex:1;}

.kaese-skript-wrap .timeline .vi-mini {display:block; font-family:"IBM Plex Sans",sans-serif; font-size:.68rem; color:var(--slate); margin-top:2px;}


.kaese-skript-wrap .grid2 {display:grid; grid-template-columns:1fr 1fr; gap:16px;}

@media(max-width:640px){
.kaese-skript-wrap .grid2 {grid-template-columns:1fr;}
 .kaese-skript-wrap .chapter-title-vi {margin-left:0;}

}


.kaese-skript-wrap .badge-set {
  font-family:"IBM Plex Mono",monospace; font-size:.72rem; letter-spacing:.05em; text-transform:uppercase;
  background:var(--ink); color:var(--paper); padding:5px 12px; border-radius:4px; display:inline-block; margin-bottom:14px;
}

.kaese-skript-wrap .pill {display:inline-block; font-family:"IBM Plex Mono",monospace; font-size:.66rem; font-weight:600;
  padding:2px 9px; border-radius:12px; letter-spacing:.03em; text-transform:uppercase;}

.kaese-skript-wrap .pill.ok {background:#e2efdb; color:#3f5c39; border:1px solid #a9c39b;}

.kaese-skript-wrap .pill.no {background:#f4ddd6; color:#8a3324; border:1px solid #d3a294;}

.kaese-skript-wrap .pill.al {background:#f4ddd6; color:#7A2E2E; border:1px solid #d3a294;}


/* ---- Q&A / Lösung accordion ---- */
.kaese-skript-wrap details.q {border:1px solid var(--line); border-radius:8px; margin:14px 0; overflow:hidden; background:#fff;}

.kaese-skript-wrap details.q summary {
  cursor:pointer; list-style:none; padding:14px 18px; font-family:"IBM Plex Sans",sans-serif;
  font-weight:600; font-size:.95rem; color:var(--ink); position:relative; padding-right:40px;
}

.kaese-skript-wrap details.q summary::-webkit-details-marker {display:none;}

.kaese-skript-wrap details.q summary:after {
  content:"+"; position:absolute; right:16px; top:50%; transform:translateY(-50%);
  font-size:1.3rem; color:var(--brass); font-weight:400;
}

.kaese-skript-wrap details.q[open] summary:after {content:"–";}

.kaese-skript-wrap details.q[open] summary {background:rgba(122,46,46,.04); border-bottom:1px dashed var(--line);}

.kaese-skript-wrap details.q summary .qnum {
  font-family:"IBM Plex Mono",monospace; color:var(--brass); font-weight:600; margin-right:8px;
}

.kaese-skript-wrap details.q .ans {padding:2px 18px 16px;}

.kaese-skript-wrap details.q .ans .de {margin-top:12px;}

.kaese-skript-wrap details.q .ans .vi {margin-bottom:6px;}


/* ---- Math / calculation card ---- */
.kaese-skript-wrap .calc {
  font-family:"IBM Plex Mono",monospace; font-size:.86rem; background:var(--ink); color:var(--paper);
  border-radius:8px; padding:16px 18px; margin:14px 0; line-height:1.9;
}

.kaese-skript-wrap .calc .op {color:var(--brass);}

.kaese-skript-wrap .calc .val {color:#EFC9A0;}

.kaese-skript-wrap .calc .res {color:#a9d39b; border-top:1px dashed rgba(255,255,255,.25); padding-top:4px; margin-top:4px; display:block;}


/* ---- Exam sheet ---- */
.kaese-skript-wrap .exam-intro {
  background:var(--paper2); border:1px solid var(--line); border-radius:8px;
  padding:14px 18px; margin:16px 0; font-size:.94rem;
}

.kaese-skript-wrap .aufgabe {margin:22px 0; padding-left:16px; border-left:3px solid var(--brass);}

.kaese-skript-wrap .aufgabe-num {font-family:"IBM Plex Sans",sans-serif; font-weight:600; color:var(--wax); font-size:1rem; display:block; margin-bottom:4px;}

.kaese-skript-wrap .pts {float:right; font-family:"IBM Plex Mono",monospace; color:var(--brass); font-size:.78rem;}

.kaese-skript-wrap kbd {font-family:"IBM Plex Mono",monospace; background:var(--paper2); border:1px solid var(--line); border-radius:4px; padding:1px 6px; font-size:.78rem; color:var(--ink);}

.kaese-skript-wrap code {font-family:"IBM Plex Mono",monospace; background:var(--paper2); border:1px solid var(--line); border-radius:4px; padding:1px 6px; font-size:.86em;}


.kaese-skript-wrap footer {
  text-align:center; padding:44px 20px 70px; font-family:"IBM Plex Sans",sans-serif;
  font-size:.82rem; color:var(--slate); border-top:1px solid var(--line);
}

.kaese-skript-wrap footer .de {background:none; border:none; padding:0;}

.kaese-skript-wrap footer .vi {border:none; padding:0; margin-top:4px;}


@media (prefers-reduced-motion: reduce){
 .kaese-skript-wrap {scroll-behavior:auto;}
 
}

@media print{

  .kaese-skript-wrap nav.spine, .kaese-skript-wrap .toggle-btn {display:none;}

  .kaese-skript-wrap {font-size:12pt; background:#fff;}

  .kaese-skript-wrap details.q, .kaese-skript-wrap details.q .ans {display:block !important;}

  .kaese-skript-wrap details.q[open] summary:after, .kaese-skript-wrap details.q summary:after {content:"";}

  .kaese-skript-wrap section.chapter {page-break-inside:auto;}


}


/* ---- übernommen & angepasst: Quiz, Balken, Zeitstrahl ---- */
.kaese-skript-wrap .mc {background:#fff;border:1px solid var(--line);border-radius:10px;padding:14px 18px;margin:12px 0}

.kaese-skript-wrap .mc h4 {margin:0 0 2px;font-family:"IBM Plex Sans",sans-serif;font-size:1rem}

.kaese-skript-wrap .mc .opts {display:grid;gap:6px;margin-top:8px}

.kaese-skript-wrap .mc .opts button {font-family:"IBM Plex Sans",sans-serif;text-align:left;background:var(--paper);color:var(--ink);border:1px solid var(--line);padding:8px 12px;border-radius:8px;cursor:pointer;font-size:.92rem}

.kaese-skript-wrap .mc .opts button:hover {background:var(--paper2)}

.kaese-skript-wrap .mc .opts button.right {background:var(--greenbg);border-color:var(--green);color:#3f5c39;font-weight:600}

.kaese-skript-wrap .mc .opts button.wrong {background:#f7e9df;border-color:var(--wax);color:var(--wax)}

.kaese-skript-wrap .mc .why {display:none;margin-top:8px;font-size:.9rem;font-family:"IBM Plex Sans",sans-serif;color:var(--slate)}

.kaese-skript-wrap .mc.done .why {display:block}

.kaese-skript-wrap #score {position:sticky;bottom:10px;margin:14px 0;background:var(--ink);color:var(--paper);padding:8px 14px;border-radius:8px;display:inline-block;font-family:"IBM Plex Mono",monospace;font-size:.8rem}

.kaese-skript-wrap .bars {background:#fff;border:1px solid var(--line);border-radius:10px;padding:14px 18px;margin:14px 0}

.kaese-skript-wrap .bar {display:grid;grid-template-columns:90px 1fr 64px;gap:8px;align-items:center;margin:6px 0;font-size:.9rem;font-family:"IBM Plex Sans",sans-serif}

.kaese-skript-wrap .bar i {display:block;height:20px;border-radius:3px;background:var(--c);width:var(--w)}

.kaese-skript-wrap .bar span:last-child {text-align:right;font-variant-numeric:tabular-nums;font-family:"IBM Plex Mono",monospace;font-size:.8rem}

.kaese-skript-wrap .bars .note {font-size:.82rem;color:var(--slate);margin:8px 0 0;font-family:"IBM Plex Sans",sans-serif}

.kaese-skript-wrap ul.time {list-style:none;margin:16px 0;padding:0 0 0 20px;border-left:3px solid var(--brass)}

.kaese-skript-wrap ul.time li {position:relative;margin:0 0 14px;padding-left:14px}

.kaese-skript-wrap ul.time li::before {content:"";position:absolute;left:-28px;top:7px;width:11px;height:11px;border-radius:50%;background:var(--wax);border:2px solid var(--paper)}

.kaese-skript-wrap ul.time b {font-family:"Fraunces",serif;color:var(--wax)}

.kaese-skript-wrap ul.time .de {margin:6px 0 0}

.kaese-skript-wrap {--wine:#7A2E2E;--olive:#6f7d1c;--olive-soft:#eef1d2}

/* ---- Karten (Karteikarten) ---- */
.kaese-skript-wrap .cards {display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:14px;margin:12px 0}

.kaese-skript-wrap .card {background:#fff;border:1px solid var(--line);border-radius:12px;overflow:hidden;border-top:6px solid var(--olive);box-shadow:0 1px 6px rgba(0,0,0,.06)}

.kaese-skript-wrap .card.rot {border-top-color:var(--wine)}

.kaese-skript-wrap .card header {padding:10px 14px 0;display:flex;justify-content:space-between;align-items:baseline;gap:8px}

.kaese-skript-wrap .card header h3 {margin:0;font-size:1.2rem;font-family:"Fraunces",serif;border:none;padding:0}

.kaese-skript-wrap .card .tag {font-size:.78rem;padding:2px 10px;border-radius:999px;background:var(--olive-soft);color:var(--olive);white-space:nowrap;font-family:"IBM Plex Sans",sans-serif}

.kaese-skript-wrap .card.rot .tag {background:#f3dfe5;color:var(--wine)}

.kaese-skript-wrap .cbody {padding:2px 14px 12px}

.kaese-skript-wrap .cbody h4 {color:var(--ink);font-size:.85rem;font-family:"IBM Plex Sans",sans-serif;margin:12px 0 2px;text-transform:uppercase;letter-spacing:.05em}

.kaese-skript-wrap .cbody p.de {margin:2px 0 0;font-size:.95rem;font-weight:600;color:var(--ink)}

.kaese-skript-wrap .cbody p.vi {font-size:.88rem;color:var(--slate);font-family:"IBM Plex Sans",sans-serif;margin:2px 0 6px;padding-left:10px;border-left:3px solid var(--slateline)}

.kaese-skript-wrap .card .note {font-size:.85rem;background:#f7e9df;border-radius:6px;padding:6px 10px;margin:10px 0 0;color:#6b3500;font-family:"IBM Plex Sans",sans-serif}

.kaese-skript-wrap .card.extra {border-style:dashed}

.kaese-skript-wrap .card.extra .tag::after {content:" (bổ sung)"}

.kaese-skript-wrap .quiz .card {cursor:pointer}

.kaese-skript-wrap .quiz .card:not(.open) .cbody {display:none}

.kaese-skript-wrap .quiz .card:not(.open) header::after {content:"bấm để lật";font-size:.8rem;color:var(--slate);font-family:"IBM Plex Sans",sans-serif}

/* ---- Aufgabenliste ---- */
.kaese-skript-wrap ol.tasks {counter-reset:t;list-style:none;padding:0;margin:14px 0}

.kaese-skript-wrap ol.tasks>li {background:#fff;border:1px solid var(--line);border-radius:10px;padding:12px 16px 10px 58px;margin:10px 0;position:relative}

.kaese-skript-wrap ol.tasks>li::before {counter-increment:t;content:counter(t);position:absolute;left:14px;top:14px;width:30px;height:30px;border-radius:50%;background:var(--wax);color:#fff;display:flex;align-items:center;justify-content:center;font-family:"Fraunces",serif;font-weight:700}

.kaese-skript-wrap ol.tasks a {color:var(--wax);font-weight:600}

/* ---- Ablauf-Lanes ---- */
.kaese-skript-wrap .lanes {display:grid;grid-template-columns:1fr 1fr;gap:18px;margin:14px 0}

@media(max-width:760px){
.kaese-skript-wrap .lanes {grid-template-columns:1fr}

}

.kaese-skript-wrap .lane h3 {margin:0 0 10px;padding:10px 14px;border-radius:8px;color:#fff;background:var(--olive);font-family:"IBM Plex Sans",sans-serif;font-size:1rem;border:none}

.kaese-skript-wrap .lane.rot h3 {background:var(--wax)}

.kaese-skript-wrap .step {position:relative;background:#fff;border:1px solid var(--line);border-left:5px solid var(--olive);border-radius:8px;padding:10px 14px 6px;margin:0 0 24px;box-shadow:0 1px 4px rgba(0,0,0,.05)}

.kaese-skript-wrap .lane.rot .step {border-left-color:var(--wax)}

.kaese-skript-wrap .step::after {content:"▼";position:absolute;left:50%;bottom:-21px;transform:translateX(-50%);color:var(--brass);font-size:.8rem}

.kaese-skript-wrap .step:last-child::after {display:none}

.kaese-skript-wrap .step.opt {border-style:dashed;border-left-style:solid}

.kaese-skript-wrap .step .sn {font-weight:600;font-family:"Fraunces",serif;font-size:1.05rem;color:var(--ink)}

.kaese-skript-wrap .step .sn .vi {display:inline-block;margin:0 0 0 8px;font-weight:400;font-size:.8rem;padding:2px 10px;font-family:"IBM Plex Sans",sans-serif;color:var(--slate);background:var(--paper2);border-radius:10px;border:none}

.kaese-skript-wrap .step p.de {margin:6px 0 0;font-size:.95rem}

.kaese-skript-wrap .step p.vi {font-size:.88rem;color:var(--slate);font-family:"IBM Plex Sans",sans-serif;margin:2px 0 6px;padding-left:10px;border-left:3px solid var(--slateline)}

.kaese-skript-wrap .opt-tag {font-size:.78rem;color:var(--wax);margin-left:6px;font-family:"IBM Plex Sans",sans-serif}

/* ---- Pyramiden ---- */
.kaese-skript-wrap .two {display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:14px 0}

@media(max-width:760px){
.kaese-skript-wrap .two {grid-template-columns:1fr}

}

.kaese-skript-wrap .two .box {background:#fff;border:1px solid var(--line);border-radius:10px;padding:14px 16px}

.kaese-skript-wrap .two .box h4 {font-family:"IBM Plex Sans",sans-serif;font-size:.9rem;margin:0 0 8px;color:var(--ink)}

.kaese-skript-wrap .pyr {display:flex;flex-direction:column;align-items:center;gap:4px;margin:12px 0}

.kaese-skript-wrap .pyr div {padding:8px 10px;color:#fff;text-align:center;border-radius:4px;font-size:.9rem;font-family:"IBM Plex Sans",sans-serif}

.kaese-skript-wrap .pyr div small {display:block;opacity:.92;font-size:.78rem}

.kaese-skript-wrap .p1 {width:100%;background:#a9a2ad}
.kaese-skript-wrap .p2 {width:78%;background:#7d4f65}
.kaese-skript-wrap .p3 {width:56%;background:var(--wax)}

.kaese-skript-wrap .l1 {width:100%;background:#8c8a4a}
.kaese-skript-wrap .l2 {width:74%;background:#6e7021}
.kaese-skript-wrap .l3 {width:48%;background:#475006}

.kaese-skript-wrap .l4 {width:30%;background:#2d3304}

/* ---- Prädikat-Leiter ---- */
.kaese-skript-wrap .ladder {display:grid;gap:8px;margin:12px 0}

.kaese-skript-wrap .lad {display:grid;grid-template-columns:34px 1fr;gap:10px;background:#fff;border:1px solid var(--line);border-radius:10px;padding:10px 12px;position:relative;overflow:hidden}

.kaese-skript-wrap .lad::before {content:"";position:absolute;left:0;bottom:0;height:5px;background:var(--wax);width:var(--w)}

.kaese-skript-wrap .lad .n {width:30px;height:30px;border-radius:50%;border:2px solid var(--wax);display:flex;align-items:center;justify-content:center;font-weight:700;color:var(--wax);font-family:"Fraunces",serif}

.kaese-skript-wrap .lad strong {font-family:"Fraunces",serif;font-size:1.1rem}

.kaese-skript-wrap .lad .meta {font-size:.8rem;color:var(--slate);font-family:"IBM Plex Sans",sans-serif;margin-left:8px}

.kaese-skript-wrap .lad p.de {margin:6px 0 0;font-size:.95rem}

.kaese-skript-wrap .lad p.vi {font-size:.88rem;color:var(--slate);font-family:"IBM Plex Sans",sans-serif;margin:2px 0 4px;padding-left:10px;border-left:3px solid var(--slateline)}

/* ---- JS-generierte Tabellen: vietnamesische Spans kompakt ---- */
.kaese-skript-wrap td .vi {display:block;font-size:.8rem;color:var(--slate);font-family:"IBM Plex Sans",sans-serif;margin-top:3px;padding:0;border:none}



</style>
<div class="kaese-skript-wrap">
<header class="cover">
  <div class="kicker">BFK · Lernfeld 10 · Lernsituation 2–3 · Lernskript</div>
  <h1>§ <em>Milch & Käse</em></h1>
  <p class="subtitle-de">Mindmap Milchprodukte · 6 Käsegruppen · Zusammensetzung · Fettgehaltsstufen · Käseplatte</p>
  <p class="subtitle-vi">Sơ đồ tư duy sản phẩm sữa · 6 nhóm phô mai · thành phần · các mức hàm lượng béo · khay phô mai — tài liệu ôn thi song ngữ</p>
  <div class="exam-meta"><span>LS 2 · Milchprodukte</span><span>LS 3 · Käse</span><span>DE / VI zweisprachig</span></div>
  <div class="legend">
    <div class="item"><span class="swatch de"></span> Deutsch (Original — luôn đọc trước)</div>
    <div class="item"><span class="swatch vi"></span> Tiếng Việt (bản dịch — đọc sau để hiểu)</div>
    <button class="toggle-btn" id="viToggle" onclick="(function(){ var wrap=document.querySelector('.kaese-skript-wrap'); if(!wrap)return; wrap.classList.toggle('hide-vi'); var b=document.getElementById('viToggle'); if(b) b.textContent=wrap.classList.contains('hide-vi')?'DE · Tiếng Việt: TẮT':'VI · Tiếng Việt: BẬT'; })()">VI · Tiếng Việt: BẬT</button>
  </div>
</header>
<nav class="spine"><span class="grp">Kapitel</span><a href="#p1" onclick="event.preventDefault(); var el=document.getElementById('p1'); if(el) el.scrollIntoView({behavior:'smooth'});">§1 · Milchprodukte</a><a href="#p2" onclick="event.preventDefault(); var el=document.getElementById('p2'); if(el) el.scrollIntoView({behavior:'smooth'});">§2 · Käsegruppen</a><a href="#p3" onclick="event.preventDefault(); var el=document.getElementById('p3'); if(el) el.scrollIntoView({behavior:'smooth'});">§3 · Sorten-Tabelle</a><a href="#p4" onclick="event.preventDefault(); var el=document.getElementById('p4'); if(el) el.scrollIntoView({behavior:'smooth'});">§4 · Herstellung</a><a href="#p5" onclick="event.preventDefault(); var el=document.getElementById('p5'); if(el) el.scrollIntoView({behavior:'smooth'});">§5 · Zusammensetzung</a><a href="#p6" onclick="event.preventDefault(); var el=document.getElementById('p6'); if(el) el.scrollIntoView({behavior:'smooth'});">§6 · Fettstufen</a><a href="#p7" onclick="event.preventDefault(); var el=document.getElementById('p7'); if(el) el.scrollIntoView({behavior:'smooth'});">§7 · Fett i. Tr.</a><a href="#p8" onclick="event.preventDefault(); var el=document.getElementById('p8'); if(el) el.scrollIntoView({behavior:'smooth'});">§8 · Verwendung</a><a href="#p9" onclick="event.preventDefault(); var el=document.getElementById('p9'); if(el) el.scrollIntoView({behavior:'smooth'});">§9 · Käseplatte</a><a href="#p10" onclick="event.preventDefault(); var el=document.getElementById('p10'); if(el) el.scrollIntoView({behavior:'smooth'});">§10 · Getränke</a><a href="#p11" onclick="event.preventDefault(); var el=document.getElementById('p11'); if(el) el.scrollIntoView({behavior:'smooth'});">§11 · Concept Map</a><span class="grp">Selbsttest</span><a href="#quiz" onclick="event.preventDefault(); var el=document.getElementById('quiz'); if(el) el.scrollIntoView({behavior:'smooth'});" class="exam">Prüfungs-Check</a></nav>
<main>

<section class="chapter" id="p1"><div class="chapter-head"><span class="chapter-num">§1</span><h2 class="chapter-title-de">Mindmap: Milchprodukte & Weiterverarbeitung</h2><span class="lf-tag">LF 10 · LS 2</span></div><p class="chapter-title-vi">Sơ đồ tư duy: các sản phẩm từ sữa và cách chế biến tiếp</p>
<div class="cards">
<div class="card"><header><h3>Trinkmilch</h3><span class="tag">sữa uống</span></header><div class="cbody">
<p class="de">Rohmilch — nicht für den Verkauf, erst Verarbeitung.</p><p class="vi">Sữa thô — không bán trực tiếp, phải qua chế biến trước.</p>
<p class="de">Pasteurisierte Milch — kurz erhitzt.</p><p class="vi">Sữa thanh trùng — đun nóng trong thời gian ngắn.</p>
<p class="de">Frischmilch — gekühlt.</p><p class="vi">Sữa tươi — bảo quản lạnh.</p>
<p class="de">ESL-Milch — länger haltbar.</p><p class="vi">Sữa ESL — bảo quản được lâu hơn.</p>
</div></div>
<div class="card"><header><h3>Sahne / Rahm</h3><span class="tag">kem sữa</span></header><div class="cbody">
<p class="de">Weiterverarbeitung: Abtrennen des Milchfetts durch Zentrifugieren (Separator).</p><p class="vi">Chế biến tiếp: tách chất béo của sữa bằng phương pháp ly tâm (máy tách).</p>
<p class="de">→ Schlagsahne, Crème fraîche, Sahnesoße.</p><p class="vi">→ kem đánh bông, crème fraîche, sốt kem.</p>
</div></div>
<div class="card rot"><header><h3>Butter</h3><span class="tag">bơ</span></header><div class="cbody">
<p class="de">Die Sahne wird geschlagen, das Milchfett wird abgetrennt.</p><p class="vi">Đánh bông kem, tách chất béo sữa ra.</p>
</div></div>
<div class="card"><header><h3>Käse</h3><span class="tag">phô mai</span></header><div class="cbody">
<p class="de">Die Milch wird durch Lab oder Säuerung zum Gerinnen gebracht. Der Käsebruch wird weiterverarbeitet.</p><p class="vi">Sữa được làm đông tụ bằng men đông (Lab) hoặc lên men chua. Phần đông tụ (Käsebruch) được chế biến tiếp.</p>
<p class="de">→ Frischkäse, Weichkäse, Hartkäse.</p><p class="vi">→ phô mai tươi, phô mai mềm, phô mai cứng.</p>
</div></div>
<div class="card"><header><h3>Quark</h3><span class="tag">quark</span></header><div class="cbody">
<p class="de">Die Milch wird durch Säuerung zum Gerinnen gebracht. Der Molkeanteil wird abgetrennt.</p><p class="vi">Sữa được làm đông bằng lên men chua. Phần whey (Molke) được tách ra.</p>
<p class="de">→ Speisequark, Magerquark, Kräuterquark.</p><p class="vi">→ quark ăn liền, quark ít béo, quark thảo mộc.</p>
</div></div>
<div class="card"><header><h3>Joghurt</h3><span class="tag">sữa chua</span></header><div class="cbody">
<p class="de">Die Milch wird mit Milchsäurekulturen versetzt und fermentiert.</p><p class="vi">Sữa được cấy men lactic rồi lên men.</p>
<p class="de">→ Natur, Frucht, Trinkjoghurt.</p><p class="vi">→ sữa chua nguyên vị, sữa chua trái cây, sữa chua uống.</p>
</div></div>
</div>
<div class="warn"><span class="tag">Lernsituation 2 — Auftrag</span>Erstellen Sie eine Mindmap, die sowohl die Produkte als auch deren jeweilige Weiterverarbeitungsmöglichkeit in der Molkerei darstellt.<div class="vi">Vẽ sơ đồ tư duy thể hiện cả các sản phẩm lẫn khả năng chế biến tiếp theo của từng sản phẩm trong nhà máy sữa.</div></div>
</section>

<section class="chapter" id="p2"><div class="chapter-head"><span class="chapter-num">§2</span><h2 class="chapter-title-de">Die 6 Käsegruppen</h2><span class="lf-tag">LF 10 · LS 3</span></div><p class="chapter-title-vi">6 nhóm phô mai</p>

<h3 class="sub">1. Hartkäse <span class="vi-sub">Phô mai cứng</span></h3>
<div class="block"><div class="de"><span class="tag">Definition</span>Bestehen aus einem festen bis sehr festem Käseteig. Wegen ihrer langen Reifungs- und Lagerdauer (bis zu einigen Jahren) erreichen sie einen hohen Trockenmassegehalt.</div><div class="vi"><span class="tag">VI</span>Gồm bột phô mai cứng đến rất cứng. Do thời gian ủ chín và lưu kho dài (tới vài năm) nên có hàm lượng chất khô cao.</div></div>
<div class="block"><div class="de"><span class="tag">Beispiele</span>Emmentaler — gelbe Farbe, regelmäßige kirschengroße Löcher, vollmundiger Geschmack. Bergkäse — mattgelbe Farbe, erbsengroße Löcher, würziger bzw. kräftiger als Emmentaler. Cheddar — wird hauptsächlich in England hergestellt; besonders zur Schmelzkäseherstellung verwendet. Comté und Beaufort — aus Frankreich. Parmesan und Provolone — italienische Spezialitäten. Gruyère und Appenzeller — aus der Schweiz.</div><div class="vi"><span class="tag">VI</span>Emmentaler — màu vàng, lỗ tròn đều cỡ quả anh đào, vị đầy đặn. Bergkäse — màu vàng xỉn, lỗ cỡ hạt đậu, đậm vị hơn Emmentaler. Cheddar — chủ yếu sản xuất ở Anh; dùng nhiều để làm phô mai tan chảy. Comté và Beaufort — từ Pháp. Parmesan và Provolone — đặc sản Ý. Gruyère và Appenzeller — từ Thụy Sĩ.</div></div>

<h3 class="sub">2. Schnittkäse <span class="vi-sub">Phô mai cắt lát</span></h3>
<div class="block"><div class="de"><span class="tag">Definition</span>Ist weicher und saftiger als Hartkäse. Der Trockenmassegehalt liegt etwas niedriger als beim Hartkäse.</div><div class="vi"><span class="tag">VI</span>Mềm và mọng hơn phô mai cứng. Hàm lượng chất khô thấp hơn một chút so với phô mai cứng.</div></div>
<div class="block"><div class="de"><span class="tag">Beispiele</span>Gouda — glatte und trockene Rinde, elfenbeinfarben bis gelb, je älter desto würziger; Holland. Edamer — häufig mit Paraffinschicht, hell bis goldgelb, milder Geschmack; Holland. Tilsiter — viele runde und schlitzförmige Löcher, pikanter Geschmack; Deutschland. Raclette — aus dem Schweizer Wallis; Spezialität, bei der verschiedene Lebensmittel mit dem Käse in kleinen Pfännchen überbacken werden. Danbo und Havarti — aus Dänemark; dem Gouda vergleichbare Erzeugnisse.</div><div class="vi"><span class="tag">VI</span>Gouda — vỏ nhẵn khô, màu ngà đến vàng, càng để lâu càng đậm; Hà Lan. Edamer — thường bọc lớp parafin, màu vàng nhạt đến vàng kim, vị nhẹ; Hà Lan. Tilsiter — nhiều lỗ tròn và lỗ dài, vị cay nồng; Đức. Raclette — từ vùng Wallis (Thụy Sĩ); món đặc sản nướng phô mai chảy lên đồ ăn trong chảo nhỏ. Danbo và Havarti — từ Đan Mạch; tương tự Gouda.</div></div>

<h3 class="sub">3. Halbfeste Schnittkäse <span class="vi-sub">Phô mai cắt lát nửa cứng</span></h3>
<div class="block"><div class="de"><span class="tag">Definition</span>Sind weicher als Schnittkäse und gleichmäßig durch die ganze Masse gereift. Ihr Trockenmassegehalt liegt unter dem der Schnittkäse.</div><div class="vi"><span class="tag">VI</span>Mềm hơn Schnittkäse, chín đều khắp khối. Hàm lượng chất khô thấp hơn Schnittkäse.</div></div>
<div class="block"><div class="de"><span class="tag">a) Blauschimmelkäse</span>Haben ein weiß-gelbliches Inneres mit dunkelgrünen bis blauen Schimmeladern. Die Schnittfläche wirkt marmoriert. Kräftiger bis scharf pikanter Geschmack. Die pikantesten sind: Roquefort (Schafsmilch) aus Frankreich, Danablu aus Dänemark, Stilton aus England, Gorgonzola aus Italien, Bavaria Blu aus Deutschland.</div><div class="vi"><span class="tag">VI</span>Phô mai mốc xanh: ruột trắng-vàng với vân mốc xanh đậm đến xanh dương; mặt cắt như đá cẩm thạch; vị đậm đến cay nồng gắt. Những loại cay nồng nhất: Roquefort (sữa cừu) từ Pháp, Danablu từ Đan Mạch, Stilton từ Anh, Gorgonzola từ Ý, Bavaria Blu từ Đức.</div></div>
<div class="block"><div class="de"><span class="tag">b) Rotschmierekäse</span>Geschmeidige rotbraune Haut, gelbliche Farbe mit geringer Lochung, mildes Aroma. Bekannte Sorten: Esrom aus Dänemark, Taleggio aus Italien. Romadur: weißgelbe Würfel mit lackartiger Schmiere, wenig Löcher, gleichmäßig gereift, sehr pikant.</div><div class="vi"><span class="tag">VI</span>Phô mai bôi đỏ: vỏ nâu đỏ dẻo mịn, màu vàng nhạt, ít lỗ, hương nhẹ. Các loại nổi tiếng: Esrom (Đan Mạch), Taleggio (Ý). Romadur: khối vuông trắng-vàng với lớp bôi bóng như sơn, ít lỗ, chín đều, rất cay nồng.</div></div>

<h3 class="sub">4. Weichkäse <span class="vi-sub">Phô mai mềm</span></h3>
<div class="block"><div class="de"><span class="tag">Definition</span>Der Trockenmassegehalt liegt unter dem der halbfesten Schnittkäse. Man unterscheidet zwei Arten: Weichkäse mit Schimmelbildung und Weichkäse mit Rotschmiere.</div><div class="vi"><span class="tag">VI</span>Hàm lượng chất khô thấp hơn nhóm halbfest. Có hai loại: phô mai mềm mốc trắng và phô mai mềm bôi đỏ.</div></div>
<div class="block"><div class="de"><span class="tag">a) mit Schimmelbildung</span>Camembert — wird unter Verwendung von essbarem, weißem Schimmel hergestellt, der nur an der Oberfläche wächst; milder, aromatischer Geschmack. Brie — wird im Allgemeinen weniger reif verzehrt als Camembert; milder; „Tortenstücke".</div><div class="vi"><span class="tag">VI</span>Camembert — làm bằng mốc trắng ăn được, chỉ mọc trên bề mặt; vị nhẹ, thơm. Brie — thường ăn khi chưa chín bằng Camembert; vị nhẹ; dạng "miếng bánh".</div></div>
<div class="block"><div class="de"><span class="tag">b) mit Rotschmiere</span>Romadur und Limburger — gelbbraune bis rötliche geschmeidige Haut; weißer bis hellgelber Teig, wenig Löcher, kräftiger, würziger Geschmack. Münster — feste, gelblichrote Haut, etwas feucht, gelblichweiß, keine Löcher, feiner, pikanter Geschmack.</div><div class="vi"><span class="tag">VI</span>Romadur và Limburger — vỏ dẻo màu vàng-nâu đến đỏ; ruột trắng đến vàng nhạt, ít lỗ, vị đậm, cay. Münster — vỏ chắc màu vàng-đỏ, hơi ẩm, ruột trắng-vàng, không lỗ, vị tinh tế, cay nồng.</div></div>

<h3 class="sub">5. Frischkäse <span class="vi-sub">Phô mai tươi</span></h3>
<div class="block"><div class="de"><span class="tag">Definition</span>Sind alle Käsesorten, die zwar eine Milchsäureumwandlung, jedoch keinen Reifungsprozess durchmachen.</div><div class="vi"><span class="tag">VI</span>Gồm mọi loại phô mai có chuyển hóa acid lactic nhưng không qua quá trình ủ chín.</div></div>
<div class="block"><div class="de"><span class="tag">Sorten</span>Frischkäse — wird in allen Fettgehaltsstufen hergestellt. Schichtkäse — gleicht dem Speisequark in seiner Zusammensetzung, festere Struktur, erkennbare Schichtenbildung. Rahmfrischkäse — Gehalt von mindestens 50 % Fett i. Tr. Doppelrahmfrischkäse — immer mindestens 60 % Fett i. Tr. Beispiele: Mozzarella, Ricotta, Mascarpone, Quark, Hüttenkäse.</div><div class="vi"><span class="tag">VI</span>Frischkäse — sản xuất ở mọi mức hàm lượng béo. Schichtkäse — thành phần giống quark ăn liền, kết cấu chắc hơn, thấy rõ lớp. Rahmfrischkäse — ít nhất 50% béo trong chất khô. Doppelrahmfrischkäse — luôn ít nhất 60% béo trong chất khô. Ví dụ: Mozzarella, Ricotta, Mascarpone, Quark, Hüttenkäse.</div></div>

<h3 class="sub">6. Sauermilchkäse <span class="vi-sub">Phô mai sữa chua</span></h3>
<div class="block"><div class="de"><span class="tag">Definition</span>Werden aus Sauermilchquark gewonnen. Sie werden überwiegend in der Magerstufe hergestellt. Hoher Eiweißgehalt, glattes Äußeres, gelbliche Farbe.</div><div class="vi"><span class="tag">VI</span>Làm từ quark sữa chua (Sauermilchquark). Chủ yếu sản xuất ở mức ít béo (Magerstufe). Giàu đạm, mặt ngoài nhẵn, màu vàng nhạt.</div></div>
<div class="block"><div class="de"><span class="tag">Bekannteste</span>Harzer, Mainzer, Handkäse, Korbkäse, Olmützer Quargel, Nieheimer, Stangenkäse.</div><div class="vi"><span class="tag">VI</span>Nổi tiếng nhất: Harzer, Mainzer, Handkäse, Korbkäse, Olmützer Quargel, Nieheimer, Stangenkäse.</div></div>
</section>

<section class="chapter" id="p3"><div class="chapter-head"><span class="chapter-num">§3</span><h2 class="chapter-title-de">Käsesorten-Tabelle (20+ Sorten)</h2><span class="lf-tag">LF 10 · LS 3</span></div><p class="chapter-title-vi">Bảng các loại phô mai — bài tập: liệt kê ít nhất 20 loại kèm nhóm và xuất xứ</p>
<table><thead><tr><th>Käsesorte <span class="vi-cell">Loại phô mai</span></th><th>Käsegruppe <span class="vi-cell">Nhóm</span></th><th>Land <span class="vi-cell">Xuất xứ</span></th></tr></thead><tbody>
<tr><td>Emmentaler</td><td>Hartkäse</td><td>Schweiz <span class="vi-cell">Thụy Sĩ</span></td></tr>
<tr><td>Bergkäse</td><td>Hartkäse</td><td>Deutschland / Österreich <span class="vi-cell">Đức / Áo</span></td></tr>
<tr><td>Cheddar (Chester)</td><td>Hartkäse</td><td>England <span class="vi-cell">Anh</span></td></tr>
<tr><td>Comté</td><td>Hartkäse</td><td>Frankreich <span class="vi-cell">Pháp</span></td></tr>
<tr><td>Beaufort</td><td>Hartkäse</td><td>Frankreich <span class="vi-cell">Pháp</span></td></tr>
<tr><td>Parmesan (Parmigiano)</td><td>Hartkäse</td><td>Italien <span class="vi-cell">Ý</span></td></tr>
<tr><td>Provolone</td><td>Hartkäse</td><td>Italien <span class="vi-cell">Ý</span></td></tr>
<tr><td>Gruyère</td><td>Hartkäse</td><td>Schweiz <span class="vi-cell">Thụy Sĩ</span></td></tr>
<tr><td>Appenzeller</td><td>Hartkäse</td><td>Schweiz <span class="vi-cell">Thụy Sĩ</span></td></tr>
<tr><td>Gouda</td><td>Schnittkäse</td><td>Holland <span class="vi-cell">Hà Lan</span></td></tr>
<tr><td>Edamer</td><td>Schnittkäse</td><td>Holland <span class="vi-cell">Hà Lan</span></td></tr>
<tr><td>Tilsiter</td><td>Schnittkäse</td><td>Deutschland <span class="vi-cell">Đức</span></td></tr>
<tr><td>Raclette</td><td>Schnittkäse</td><td>Schweiz (Wallis) <span class="vi-cell">Thụy Sĩ (Wallis)</span></td></tr>
<tr><td>Danbo</td><td>Schnittkäse</td><td>Dänemark <span class="vi-cell">Đan Mạch</span></td></tr>
<tr><td>Havarti</td><td>Schnittkäse</td><td>Dänemark <span class="vi-cell">Đan Mạch</span></td></tr>
<tr><td>Roquefort (Schafsmilch)</td><td>halbfester Schnittkäse · Blauschimmel</td><td>Frankreich <span class="vi-cell">Pháp</span></td></tr>
<tr><td>Danablu</td><td>halbfester Schnittkäse · Blauschimmel</td><td>Dänemark <span class="vi-cell">Đan Mạch</span></td></tr>
<tr><td>Stilton</td><td>halbfester Schnittkäse · Blauschimmel</td><td>England <span class="vi-cell">Anh</span></td></tr>
<tr><td>Gorgonzola</td><td>halbfester Schnittkäse · Blauschimmel</td><td>Italien <span class="vi-cell">Ý</span></td></tr>
<tr><td>Bavaria Blu</td><td>halbfester Schnittkäse · Blauschimmel</td><td>Deutschland <span class="vi-cell">Đức</span></td></tr>
<tr><td>Esrom</td><td>halbfester Schnittkäse · Rotschmiere</td><td>Dänemark <span class="vi-cell">Đan Mạch</span></td></tr>
<tr><td>Taleggio</td><td>halbfester Schnittkäse · Rotschmiere</td><td>Italien <span class="vi-cell">Ý</span></td></tr>
<tr><td>Romadur</td><td>halbfester Schnittkäse / Weichkäse · Rotschmiere</td><td>Deutschland <span class="vi-cell">Đức</span></td></tr>
<tr><td>Camembert</td><td>Weichkäse · Schimmelbildung</td><td>Frankreich <span class="vi-cell">Pháp</span></td></tr>
<tr><td>Brie</td><td>Weichkäse · Schimmelbildung</td><td>Frankreich <span class="vi-cell">Pháp</span></td></tr>
<tr><td>Limburger</td><td>Weichkäse · Rotschmiere</td><td>Deutschland <span class="vi-cell">Đức</span></td></tr>
<tr><td>Münster</td><td>Weichkäse · Rotschmiere</td><td>Frankreich <span class="vi-cell">Pháp</span></td></tr>
<tr><td>Feta</td><td>Weichkäse</td><td>Griechenland <span class="vi-cell">Hy Lạp</span></td></tr>
<tr><td>Mozzarella</td><td>Frischkäse</td><td>Italien <span class="vi-cell">Ý</span></td></tr>
<tr><td>Ricotta</td><td>Frischkäse</td><td>Italien <span class="vi-cell">Ý</span></td></tr>
<tr><td>Mascarpone</td><td>Frischkäse</td><td>Italien <span class="vi-cell">Ý</span></td></tr>
<tr><td>Quark</td><td>Frischkäse</td><td>Deutschland <span class="vi-cell">Đức</span></td></tr>
<tr><td>Hüttenkäse</td><td>Frischkäse</td><td>England <span class="vi-cell">Anh</span></td></tr>
<tr><td>Schichtkäse</td><td>Frischkäse</td><td>Deutschland <span class="vi-cell">Đức</span></td></tr>
<tr><td>Exquisa</td><td>Frischkäse</td><td>Deutschland <span class="vi-cell">Đức</span></td></tr>
<tr><td>Harzer</td><td>Sauermilchkäse</td><td>Deutschland <span class="vi-cell">Đức</span></td></tr>
<tr><td>Mainzer</td><td>Sauermilchkäse</td><td>Deutschland <span class="vi-cell">Đức</span></td></tr>
<tr><td>Handkäse</td><td>Sauermilchkäse</td><td>Deutschland <span class="vi-cell">Đức</span></td></tr>
<tr><td>Korbkäse</td><td>Sauermilchkäse</td><td>Deutschland <span class="vi-cell">Đức</span></td></tr>
<tr><td>Olmützer Quargel</td><td>Sauermilchkäse</td><td>Tschechien <span class="vi-cell">Séc</span></td></tr>
<tr><td>Nieheimer</td><td>Sauermilchkäse</td><td>Deutschland <span class="vi-cell">Đức</span></td></tr>
<tr><td>Stangenkäse</td><td>Sauermilchkäse</td><td>Deutschland <span class="vi-cell">Đức</span></td></tr>
</tbody></table>
<div class="example"><span class="tag">Lernsituation 3 — Auftrag</span>Erstellen Sie eine Liste mit mindestens 20 Käsesorten und ergänzen Sie die Liste mit Tierart der Milch oder Herkunftsland. Stellen Sie das Thema Käse in einer Concept Map dar (Käseherstellung, Käsezusammensetzung, Käsearten, Fettgehaltsstufen).<div class="vi">Liệt kê ít nhất 20 loại phô mai, bổ sung thêm loại sữa (động vật) hoặc nước xuất xứ. Trình bày chủ đề phô mai bằng Concept Map (cách làm phô mai, thành phần, các loại phô mai, các mức hàm lượng béo).</div></div>
</section>

<section class="chapter" id="p4"><div class="chapter-head"><span class="chapter-num">§4</span><h2 class="chapter-title-de">Käseherstellung</h2><span class="lf-tag">LF 10</span></div><p class="chapter-title-vi">Cách làm phô mai</p>
<div class="lanes"><div class="lane">
<div class="step"><span class="sn">1. Milch <span class="vi">nguyên liệu sữa</span></span><p class="de">Ausgangsstoff für alle Milchprodukte.</p><p class="vi">Nguyên liệu cho mọi sản phẩm từ sữa.</p></div>
<div class="step"><span class="sn">2. Gerinnen <span class="vi">làm đông tụ</span></span><p class="de">Die Milch wird durch <b>Lab</b> oder <b>Säuerung</b> zum Gerinnen gebracht.</p><p class="vi">Sữa được làm đông tụ bằng <b>men đông (Lab)</b> hoặc <b>lên men chua</b>.</p></div>
<div class="step"><span class="sn">3. Trennung <span class="vi">tách</span></span><p class="de">Der <b>Käsebruch</b> trennt sich von der <b>Molke</b> (wässriger Anteil).</p><p class="vi">Phần <b>đông tụ (Käsebruch)</b> tách khỏi <b>whey (Molke)</b> — phần nước.</p></div>
<div class="step"><span class="sn">4. Weiterverarbeitung <span class="vi">chế biến tiếp</span></span><p class="de">Je nach Sorte: formen, pressen, salzen, reifen — oder frisch verzehren.</p><p class="vi">Tùy loại: tạo hình, ép, ướp muối, ủ chín — hoặc ăn tươi.</p></div>
</div></div>
</section>

<section class="chapter" id="p5"><div class="chapter-head"><span class="chapter-num">§5</span><h2 class="chapter-title-de">Zusammensetzung von Käse</h2><span class="lf-tag">LF 10</span></div><p class="chapter-title-vi">Thành phần của phô mai</p>
<div class="block"><div class="de"><span class="tag">Grundregel</span>Käse besteht aus <b>Wasser</b> und <b>Trockenmasse</b>. Die Trockenmasse enthält Protein, Fett und andere Inhaltsstoffe.</div><div class="vi"><span class="tag">VI</span>Phô mai gồm <b>nước</b> và <b>chất khô</b>. Chất khô chứa đạm (protein), chất béo và các thành phần khác.</div></div>
<div class="bars">
<div class="bar"><span>Wasser</span><i style="--w:42%;--c:#48586B"></i><span>42 %</span></div>
<div class="bar"><span>Trockenmasse</span><i style="--w:58%;--c:#9C7A3C"></i><span>58 %</span></div>
<div class="bar"><span>— Fett</span><i style="--w:29%;--c:#7A2E2E"></i><span>29 %</span></div>
<div class="bar"><span>— Eiweiß</span><i style="--w:25%;--c:#6f7d1c"></i><span>25 %</span></div>
<div class="bar"><span>— andere</span><i style="--w:4%;--c:#a9a2ad"></i><span>4 %</span></div>
<p class="note">Beispiel-Diagramm: 100 g Käse = 42 g Wasser + 58 g Trockenmasse (29 g Fett + 25 g Eiweiß + 4 g andere Inhaltsstoffe).</p>
<p class="note vi-mini">Ví dụ: 100 g phô mai = 42 g nước + 58 g chất khô (29 g béo + 25 g đạm + 4 g thành phần khác).</p>
</div>
</section>

<section class="chapter" id="p6"><div class="chapter-head"><span class="chapter-num">§6</span><h2 class="chapter-title-de">Fettgehaltsstufen bei Käse</h2><span class="lf-tag">LF 10</span></div><p class="chapter-title-vi">Các mức hàm lượng béo của phô mai</p>
<div class="block"><div class="de"><span class="tag">Regel</span>Käse wird häufig nach seinem <b>Fettgehalt in der Trockenmasse (Fett i. Tr.)</b> eingeteilt.</div><div class="vi"><span class="tag">VI</span>Phô mai thường được phân loại theo <b>hàm lượng béo trong chất khô (Fett i. Tr.)</b>.</div></div>
<table><thead><tr><th>Fettgehaltsstufe <span class="vi-cell">Mức hàm lượng béo</span></th><th>Fett i. Tr. (%)</th></tr></thead><tbody>
<tr><td>Doppelrahmstufe</td><td>≥ 60 %</td></tr>
<tr><td>Rahmstufe</td><td>50 – 59 %</td></tr>
<tr><td>Vollfettstufe</td><td>45 – 49 %</td></tr>
<tr><td>Fettstufe</td><td>40 – 44 %</td></tr>
<tr><td>Dreiviertelfettstufe</td><td>30 – 39 %</td></tr>
<tr><td>Halbfettstufe</td><td>20 – 29 %</td></tr>
<tr><td>Viertelfettstufe</td><td>10 – 19 %</td></tr>
<tr><td>Magerstufe</td><td>&lt; 10 %</td></tr>
</tbody></table>
<h3 class="sub">Aufgabe 1 — Zuordnung <span class="vi-sub">Bài 1 — Xếp đúng mức</span></h3>
<div class="block"><div class="de"><span class="tag">Aufgabe</span>Ordne die folgenden Käsesorten der richtigen Fettstufe zu: a) 62 % Fett i. Tr. · b) 48 % Fett i. Tr. · c) 25 % Fett i. Tr. · d) 12 % Fett i. Tr.</div><div class="vi"><span class="tag">VI</span>Xếp các mức béo sau vào đúng bậc: a) 62% · b) 48% · c) 25% · d) 12% Fett i. Tr.</div></div>
<details class="q"><summary><span class="qnum">Lösung</span>Lösung anzeigen</summary><div class="ans">
<div class="de">a) 62 % → Doppelrahmstufe (≥ 60 %). b) 48 % → Vollfettstufe (45–49 %). c) 25 % → Halbfettstufe (20–29 %). d) 12 % → Viertelfettstufe (10–19 %).</div>
<div class="vi">a) 62% → bậc Doppelrahm (≥ 60%). b) 48% → bậc Vollfett (45–49%). c) 25% → bậc Halbfett (20–29%). d) 12% → bậc Viertelfett (10–19%).</div>
</div></details>
</section>

<section class="chapter" id="p7"><div class="chapter-head"><span class="chapter-num">§7</span><h2 class="chapter-title-de">Fett i. Tr. vs. absoluter Fettgehalt</h2><span class="lf-tag">LF 10</span></div><p class="chapter-title-vi">Hàm lượng béo trong chất khô so với hàm lượng béo tuyệt đối</p>
<div class="block"><div class="de"><span class="tag">Regel</span>Der Fettgehalt wird meist als <b>Fett in der Trockenmasse (Fett i. Tr.)</b> angegeben. Für den tatsächlichen Fettgehalt im Käse muss man den <b>absoluten Fettgehalt</b> berechnen.</div><div class="vi"><span class="tag">VI</span>Hàm lượng béo thường được ghi là <b>béo trong chất khô (Fett i. Tr.)</b>. Muốn biết lượng béo thực tế trong phô mai phải tính <b>hàm lượng béo tuyệt đối</b>.</div></div>
<div class="calc">
<span class="op">TM</span> <span class="op">=</span> <span class="val">100 % − Wasser %</span><br>
<span class="op">Fett_abs</span> <span class="op">=</span> <span class="val">Fett i. Tr. × TM ÷ 100</span><br>
<span class="op">Fett i. Tr.</span> <span class="op">=</span> <span class="val">Fett_abs ÷ TM × 100</span>
<span class="res">TM = chất khô · Fett_abs = béo tuyệt đối</span>
</div>
<div class="aufgabe"><span class="aufgabe-num">Aufgabe 2</span><div class="de">Ein Käse hat 45 % Fett i. Tr. und 50 % Wasser. Berechne den absoluten Fettgehalt.</div><div class="vi">Một loại phô mai có 45% Fett i. Tr. và 50% nước. Tính hàm lượng béo tuyệt đối.</div>
<details class="q"><summary><span class="qnum">Lösung</span>Lösung anzeigen</summary><div class="ans"><div class="calc">TM <span class="op">=</span> <span class="val">100 − 50 = 50 %</span><br>Fett_abs <span class="op">=</span> <span class="val">45 % × 50 % ÷ 100 = 22,5 %</span></div><div class="vi">Chất khô TM = 50%; béo tuyệt đối = 45% × 50% ÷ 100 = 22,5%.</div></div></details></div>
<div class="aufgabe"><span class="aufgabe-num">Aufgabe 3</span><div class="de">Ein Käse hat 60 % Fett i. Tr. und 35 % Wasser. Berechne den absoluten Fettgehalt.</div><div class="vi">Một loại phô mai có 60% Fett i. Tr. và 35% nước. Tính hàm lượng béo tuyệt đối.</div>
<details class="q"><summary><span class="qnum">Lösung</span>Lösung anzeigen</summary><div class="ans"><div class="calc">TM <span class="op">=</span> <span class="val">100 − 35 = 65 %</span><br>Fett_abs <span class="op">=</span> <span class="val">60 % × 65 % ÷ 100 = 39 %</span></div><div class="vi">Chất khô TM = 65%; béo tuyệt đối = 60% × 65% ÷ 100 = 39%.</div></div></details></div>
<div class="aufgabe"><span class="aufgabe-num">Aufgabe 4</span><div class="de">Ein Käse enthält 28 % Fett absolut und hat eine Trockenmasse von 56 %. Berechne den Fettgehalt i. Tr.</div><div class="vi">Một loại phô mai chứa 28% béo tuyệt đối, chất khô 56%. Tính Fett i. Tr.</div>
<details class="q"><summary><span class="qnum">Lösung</span>Lösung anzeigen</summary><div class="ans"><div class="calc">Fett i. Tr. <span class="op">=</span> <span class="val">28 ÷ 56 × 100 = 50 %</span> <span class="res">→ Rahmstufe</span></div><div class="vi">Fett i. Tr. = 28 ÷ 56 × 100 = 50% → thuộc bậc Rahmstufe.</div></div></details></div>
<div class="example"><span class="tag">Beispiel aus der Mitschrift</span><div class="de">100 g Käse · 70 % Trockenmasse · 45 % Fett i. Tr. → 45 % × 70 g = <b>31,5 g Fett</b> absolut.</div><div class="vi">100 g phô mai · 70% chất khô · 45% Fett i. Tr. → 45% × 70 g = <b>31,5 g béo</b> tuyệt đối.</div></div>
<div class="warn"><span class="tag">Aufgabe 5 — Warum?</span><div class="de">Warum ist der Fettgehalt i. Tr. für den Vergleich von Käse sinnvoller als der absolute Fettgehalt?</div><div class="vi">Vì sao dùng Fett i. Tr. để so sánh các loại phô mai hợp lý hơn dùng hàm lượng béo tuyệt đối?</div>
<div class="de" style="margin-top:8px"><b>Antwort:</b> Der Fettgehalt i. Tr. ist besser zum Vergleichen geeignet, weil der Wassergehalt von Käse je nach Sorte und Reifegrad stark unterschiedlich ist. Würde man nur den absoluten Fettgehalt vergleichen, könnte ein wasserreicher Käse fälschlicherweise „fettärmer" wirken als ein trockener Käse, obwohl beide den gleichen Fettanteil in der Trockenmasse haben. Der Fett i. Tr.-Wert ist also unabhängig vom Wassergehalt und macht Käsesorten vergleichbar.</div>
<div class="vi"><b>Trả lời:</b> Dùng Fett i. Tr. so sánh tốt hơn vì lượng nước trong phô mai khác nhau rất nhiều tùy loại và độ chín. Nếu chỉ so sánh béo tuyệt đối, phô mai nhiều nước sẽ trông "ít béo" hơn phô mai khô một cách sai lầm, dù cả hai có cùng tỷ lệ béo trong chất khô. Giá trị Fett i. Tr. không phụ thuộc vào lượng nước nên các loại phô mai mới so sánh được với nhau.</div></div>
</section>

<section class="chapter" id="p8"><div class="chapter-head"><span class="chapter-num">§8</span><h2 class="chapter-title-de">Käseverwendung in der Gastronomie</h2><span class="lf-tag">LF 10</span></div><p class="chapter-title-vi">Cách dùng phô mai trong ẩm thực</p>
<h3 class="sub">1. Einsatz pro Käse <span class="vi-sub">Mỗi loại phô mai dùng làm gì</span></h3>
<table><thead><tr><th>Käse</th><th>Verwendung (mind. 2 Möglichkeiten) <span class="vi-cell">Cách dùng</span></th></tr></thead><tbody>
<tr><td>Emmentaler</td><td>Käsespätzle <span class="vi-cell">mì Spätzle phô mai</span></td></tr>
<tr><td>Gouda</td><td>Wurstsalat <span class="vi-cell">salad xúc xích</span></td></tr>
<tr><td>Camembert</td><td>gebackener Camembert <span class="vi-cell">Camembert nướng/chiên</span></td></tr>
<tr><td>Roquefort</td><td>Salat / Salatdressing <span class="vi-cell">salad / sốt salad</span></td></tr>
<tr><td>Exquisa</td><td>Käsekuchen <span class="vi-cell">bánh phô mai</span></td></tr>
<tr><td>Harzer</td><td>Handkäse mit Musik <span class="vi-cell">Handkäse với hành ngâm</span></td></tr>
<tr><td>Parmesan</td><td>Pasta / Pizza <span class="vi-cell">mì Ý / pizza</span></td></tr>
</tbody></table>
<h3 class="sub">2. Gerichte → passender Käse <span class="vi-sub">Món ăn → phô mai phù hợp</span></h3>
<table><thead><tr><th>Gericht <span class="vi-cell">Món ăn</span></th><th>Käse <span class="vi-cell">Phô mai</span></th></tr></thead><tbody>
<tr><td>Kartoffelgratin</td><td>Parmesan</td></tr>
<tr><td>Käsewindbeutel</td><td>Cheddar</td></tr>
<tr><td>Käsekuchen</td><td>Frischkäse</td></tr>
<tr><td>Salatdressing</td><td>Roquefort</td></tr>
<tr><td>Cordon Bleu</td><td>Emmentaler</td></tr>
<tr><td>Käsefondue</td><td>Appenzeller</td></tr>
<tr><td>Welsh Rarebit</td><td>Cheddar</td></tr>
<tr><td>Schweizer Käsesalat</td><td>Emmentaler / Appenzeller</td></tr>
</tbody></table>
<div class="example"><span class="tag">Käseauswahl</span><div class="de">Emmentaler, Quark, Roquefort, Parmesan, Gruyère (Greyerzer), Frischkäse (z. B. Exquisa), Chester (Cheddar).</div><div class="vi">Các loại phô mai cho sẵn trong bài: Emmentaler, Quark, Roquefort, Parmesan, Gruyère, Frischkäse (ví dụ Exquisa), Chester (Cheddar).</div></div>
</section>

<section class="chapter" id="p9"><div class="chapter-head"><span class="chapter-num">§9</span><h2 class="chapter-title-de">Käseplatte & Käseuhr</h2><span class="lf-tag">LF 10 · LS 3</span></div><p class="chapter-title-vi">Khay phô mai và "đồng hồ phô mai"</p>
<h3 class="sub">Käseuhr — Anordnung <span class="vi-sub">"Đồng hồ" sắp xếp phô mai</span></h3>
<table><thead><tr><th>Position</th><th>Käse</th><th>Beigabe <span class="vi-cell">Đồ ăn kèm</span></th></tr></thead><tbody>
<tr><td>1</td><td>Ziegenfrischkäse</td><td>Honig, Trauben <span class="vi-cell">mật ong, nho</span></td></tr>
<tr><td>2</td><td>Brie</td><td>Apfel <span class="vi-cell">táo</span></td></tr>
<tr><td>3</td><td>Gouda</td><td>Cracker <span class="vi-cell">bánh quy mặn</span></td></tr>
<tr><td>4</td><td>Gruyère</td><td>Birnen <span class="vi-cell">lê</span></td></tr>
<tr><td>5</td><td>Parmigiano</td><td>Chutney <span class="vi-cell">sốt chutney</span></td></tr>
<tr><td>6</td><td>Gorgonzola</td><td>Marmelade <span class="vi-cell">mứt</span></td></tr>
</tbody></table>
<h3 class="sub">Regeln für die Käseplatte <span class="vi-sub">Quy tắc bày khay phô mai</span></h3>
<div class="block"><div class="de"><span class="tag">Reihenfolge</span>Von mild nach kräftig.</div><div class="vi"><span class="tag">VI</span>Xếp từ vị nhẹ đến vị đậm.</div></div>
<div class="block"><div class="de"><span class="tag">Stücke</span>Stücke, keine Scheiben.</div><div class="vi"><span class="tag">VI</span>Cắt thành miếng, không thái lát mỏng.</div></div>
<div class="block"><div class="de"><span class="tag">Unverpackt</span>Unverpackt anrichten.</div><div class="vi"><span class="tag">VI</span>Bày không bọc bao bì.</div></div>
<div class="block"><div class="de"><span class="tag">Beigaben</span>Passende Beigaben: Obst, Gemüse, Brot, Dips.</div><div class="vi"><span class="tag">VI</span>Đồ ăn kèm phù hợp: trái cây, rau củ, bánh mì, sốt chấm.</div></div>
<div class="block"><div class="de"><span class="tag">Variation</span>Verschiedene Käsegruppen verwenden und mit Deko ergänzen.</div><div class="vi"><span class="tag">VI</span>Dùng nhiều nhóm phô mai khác nhau và trang trí thêm.</div></div>
</section>

<section class="chapter" id="p10"><div class="chapter-head"><span class="chapter-num">§10</span><h2 class="chapter-title-de">Getränkebegleitung & Hygiene</h2><span class="lf-tag">LF 10</span></div><p class="chapter-title-vi">Đồ uống đi kèm và vệ sinh</p>
<div class="block"><div class="de"><span class="tag">Weißweine</span>Müller-Thurgau, Weißburgunder, Chardonnay, Viognier.</div><div class="vi"><span class="tag">VI</span>Các loại vang trắng: Müller-Thurgau, Weißburgunder, Chardonnay, Viognier.</div></div>
<div class="block"><div class="de"><span class="tag">Aperitif / Cocktails</span>Aperol (Spritz), Hugo, Espresso Martini.</div><div class="vi"><span class="tag">VI</span>Khai vị / cocktail: Aperol (Spritz), Hugo, Espresso Martini.</div></div>
<div class="warn"><span class="tag">Hygiene</span><div class="de">Kühlkette einhalten!</div><div class="vi">Luôn giữ chuỗi lạnh (Kühlkette)!</div></div>
</section>

<section class="chapter" id="p11"><div class="chapter-head"><span class="chapter-num">§11</span><h2 class="chapter-title-de">Concept Map — die 4 Leitbegriffe</h2><span class="lf-tag">LF 10 · LS 3</span></div><p class="chapter-title-vi">Bản đồ khái niệm — 4 thuật ngữ bắt buộc</p>
<div class="block"><div class="de"><span class="tag">1 · Käseherstellung</span>Milch → Gerinnen durch Lab oder Säuerung → Trennung in Käsebruch und Molke → Formen, Pressen, Reifen (<a href="#p4" onclick="event.preventDefault(); var el=document.getElementById('p4'); if(el) el.scrollIntoView({behavior:'smooth'});">§4</a>).</div><div class="vi"><span class="tag">VI</span>Sữa → đông tụ bằng men đông hoặc lên men chua → tách thành phần đông và whey → tạo hình, ép, ủ chín.</div></div>
<div class="block"><div class="de"><span class="tag">2 · Käsezusammensetzung</span>Wasser (42 %) + Trockenmasse (58 %) = Fett (29 %) + Eiweiß (25 %) + andere Inhaltsstoffe (4 %) (<a href="#p5" onclick="event.preventDefault(); var el=document.getElementById('p5'); if(el) el.scrollIntoView({behavior:'smooth'});">§5</a>).</div><div class="vi"><span class="tag">VI</span>Nước (42%) + chất khô (58%) = béo (29%) + đạm (25%) + thành phần khác (4%).</div></div>
<div class="block"><div class="de"><span class="tag">3 · Käsearten</span>Die 6 Käsegruppen: Hartkäse, Schnittkäse, halbfeste Schnittkäse, Weichkäse, Frischkäse, Sauermilchkäse (<a href="#p2" onclick="event.preventDefault(); var el=document.getElementById('p2'); if(el) el.scrollIntoView({behavior:'smooth'});">§2</a>).</div><div class="vi"><span class="tag">VI</span>6 nhóm phô mai: cứng, cắt lát, cắt lát nửa cứng, mềm, tươi, sữa chua.</div></div>
<div class="block"><div class="de"><span class="tag">4 · Fettgehaltsstufen</span>Einteilung nach Fett i. Tr.: Doppelrahmstufe (≥ 60 %) → Rahmstufe → Vollfettstufe → Fettstufe → Dreiviertelfettstufe → Halbfettstufe → Viertelfettstufe → Magerstufe (&lt; 10 %) (<a href="#p6" onclick="event.preventDefault(); var el=document.getElementById('p6'); if(el) el.scrollIntoView({behavior:'smooth'});">§6</a>).</div><div class="vi"><span class="tag">VI</span>Phân loại theo Fett i. Tr.: từ bậc Doppelrahm (≥ 60%) xuống bậc Mager (&lt; 10%).</div></div>
</section>

<section class="chapter" id="quiz"><div class="chapter-head"><span class="chapter-num">§?</span><h2 class="chapter-title-de">Prüfungs-Check</h2><span class="lf-tag">Selbsttest</span></div><p class="chapter-title-vi">Tự kiểm tra nhanh (10 câu)</p>
<details class="q"><summary><span class="qnum">Frage 1</span>Nenne die 6 Käsegruppen.</summary><div class="ans"><div class="de">Hartkäse, Schnittkäse, halbfeste Schnittkäse, Weichkäse, Frischkäse, Sauermilchkäse.</div><div class="vi">Phô mai cứng, phô mai cắt lát, phô mai cắt lát nửa cứng, phô mai mềm, phô mai tươi, phô mai sữa chua.</div></div></details>
<details class="q"><summary><span class="qnum">Frage 2</span>Wie entsteht Käse aus Milch? Nenne die 4 Schritte.</summary><div class="ans"><div class="de">1. Milch. 2. Gerinnen durch Lab oder Säuerung. 3. Trennung in Käsebruch und Molke. 4. Weiterverarbeitung (formen, pressen, reifen).</div><div class="vi">1. Sữa. 2. Đông tụ bằng men đông hoặc lên men chua. 3. Tách thành phần đông và whey. 4. Chế biến tiếp (tạo hình, ép, ủ chín).</div></div></details>
<details class="q"><summary><span class="qnum">Frage 3</span>Was bedeutet „Fett i. Tr."?</summary><div class="ans"><div class="de">Fettgehalt in der Trockenmasse — der Fettanteil bezogen auf die Trockenmasse, nicht auf das Gesamtgewicht.</div><div class="vi">Hàm lượng béo trong chất khô — tỷ lệ béo tính trên chất khô, không phải trên tổng trọng lượng.</div></div></details>
<details class="q"><summary><span class="qnum">Frage 4</span>62 % Fett i. Tr. — welche Fettgehaltsstufe?</summary><div class="ans"><div class="de">Doppelrahmstufe (≥ 60 %).</div><div class="vi">Bậc Doppelrahm (≥ 60%).</div></div></details>
<details class="q"><summary><span class="qnum">Frage 5</span>Ein Käse hat 45 % Fett i. Tr. und 50 % Wasser. Wie hoch ist der absolute Fettgehalt?</summary><div class="ans"><div class="de">TM = 100 − 50 = 50 %; Fett_abs = 45 % × 50 % ÷ 100 = 22,5 %.</div><div class="vi">Chất khô = 50%; béo tuyệt đối = 22,5%.</div></div></details>
<details class="q"><summary><span class="qnum">Frage 6</span>Warum ist Fett i. Tr. zum Vergleichen sinnvoller als der absolute Fettgehalt?</summary><div class="ans"><div class="de">Weil der Fett i. Tr.-Wert unabhängig vom Wassergehalt ist — ein wasserreicher Käse wirkt sonst fälschlicherweise „fettärmer".</div><div class="vi">Vì giá trị Fett i. Tr. không phụ thuộc vào lượng nước — nếu không, phô mai nhiều nước sẽ trông "ít béo" một cách sai lầm.</div></div></details>
<details class="q"><summary><span class="qnum">Frage 7</span>Nenne 3 Hartkäse-Sorten mit Herkunftsland.</summary><div class="ans"><div class="de">z. B. Emmentaler (Schweiz), Parmesan (Italien), Cheddar (England).</div><div class="vi">Ví dụ: Emmentaler (Thụy Sĩ), Parmesan (Ý), Cheddar (Anh).</div></div></details>
<details class="q"><summary><span class="qnum">Frage 8</span>Camembert oder Brie — welcher wird reifer verzehrt?</summary><div class="ans"><div class="de">Camembert wird reifer verzehrt; Brie wird im Allgemeinen weniger reif verzehrt („Tortenstücke"), milder.</div><div class="vi">Camembert ăn khi chín hơn; Brie thường ăn khi chưa chín bằng ("miếng bánh"), vị nhẹ hơn.</div></div></details>
<details class="q"><summary><span class="qnum">Frage 9</span>Wie wird Butter aus Sahne hergestellt?</summary><div class="ans"><div class="de">Die Sahne wird geschlagen, das Milchfett wird abgetrennt.</div><div class="vi">Đánh bông kem, tách chất béo sữa ra.</div></div></details>
<details class="q"><summary><span class="qnum">Frage 10</span>Käseplatte: In welcher Reihenfolge werden die Käse angeordnet?</summary><div class="ans"><div class="de">Von mild nach kräftig — z. B. Ziegenfrischkäse → Brie → Gouda → Gruyère → Parmigiano → Gorgonzola. Stücke (keine Scheiben), unverpackt, mit passenden Beigaben.</div><div class="vi">Xếp từ vị nhẹ đến vị đậm — ví dụ: Ziegenfrischkäse → Brie → Gouda → Gruyère → Parmigiano → Gorgonzola. Cắt miếng (không thái lát), không bọc bao bì, kèm đồ ăn phù hợp.</div></div></details>
</section>
</main>
<footer>
  <div class="de">BFK · Lernfeld 10 — erstellt aus den Arbeitsblättern und Mitschriften (Milch & Milchprodukte, Käsesorten, Fettgehaltsstufen, Käseverwendung, Käseplatte).</div>
  <div class="vi">Tài liệu ôn thi BFK · Lernfeld 10 — biên soạn từ các tờ bài tập và ghi chép (sữa & sản phẩm sữa, các loại phô mai, mức hàm lượng béo, cách dùng phô mai, khay phô mai).</div>
</footer>
<script>
function toggleViKaese(){ var wrap=document.querySelector('.kaese-skript-wrap'); if(!wrap) return; wrap.classList.toggle('hide-vi'); var b=document.getElementById('viToggle'); if(b) b.textContent=wrap.classList.contains('hide-vi') ? 'DE · Tiếng Việt: TẮT' : 'VI · Tiếng Việt: BẬT'; } window.toggleViKaese = toggleViKaese;
</script>

</div>`
              }
            ]
          }
        ],
        quiz: (w.BFK2_QUIZ || []).slice(), // themed bank from bfk2-quiz.js
      },
      {
        id: "deutsch",
        code: "D",
        name: "Deutsch",
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
        accent: "#9A4607",
        soft: "#FDF8EE",
        teacher: "",
        examDate: "2026-07-16",
        ready: true,
        desc: "Visualisierung · Mindmap · Diagramme · Text → Grafik",
        groups: [
          {
            id: "visualisierung",
            badge: "KA · Visualisierung",
            title: "Visualisierung & Darstellungsformen",
            items: [
              {
                id: "mindmap-diagramme",
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><circle cx="6" cy="6" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/><line x1="7.5" y1="7.5" x2="10" y2="10"/><line x1="16.5" y1="7.5" x2="14" y2="10"/><line x1="7.5" y1="16.5" x2="10" y2="14"/><line x1="16.5" y1="16.5" x2="14" y2="14"/></svg>',
                name: "Mindmap & Diagrammtypen (6 Grundformen)",
                desc: "Mindmap, Fluss-, Säulen-, Balken-, Kreis- & Liniendiagramm · Zweck & Regeln",
                content: `<h2>Mindmap &amp; Diagrammtypen</h2>
<div class="hint">Visualisierung von Texten · 6 Grundformen · Gestaltungsregeln · Gehirnhälften-Modell</div>

<h3 class="sub">1. Was ist Visualisierung?</h3>
<p><span class="term" data-de="Visualisierung" data-vi="trực quan hóa">Visualisierung</span> von Texten bedeutet, einen Sachtext oder Sachverhalt als <span class="term" data-de="Schaubild" data-vi="sơ đồ / hình minh họa">Schaubild</span> oder <span class="term" data-de="Grafik" data-vi="đồ họa / biểu đồ">Grafik</span> darzustellen.</p>
<div class="note"><b>Merkhilfe:</b> „Bilder sagen mehr als tausend Worte." Text auf das Wesentliche reduzieren und den roten Faden sichtbar machen.</div>

<h4 style="margin:14px 0 6px">Ziele &amp; Vorteile</h4>
<ul>
  <li><b>Wesentliches reduzieren:</b> Überflüssige Füllwörter weglassen, nur zentrale Aussagen erfassen.</li>
  <li><b>Roten Faden sichtbar machen:</b> Zusammenhänge und logische Strukturen auf einen Blick erkennbar machen.</li>
  <li><b>Besseres Behalten:</b> Grafische Darstellungen bleiben schneller und länger im Gedächtnis verankert.</li>
  <li><b>Keine ganzen Sätze:</b> In Schaubildern werden ausschließlich <span class="term" data-de="Stichwort" data-vi="từ khóa / ý chính">Stichworte</span> und <span class="term" data-de="Schlüsselwort" data-vi="từ khóa cốt lõi">Schlüsselwörter</span> verwendet!</li>
</ul>

<h3 class="sub">2. Die 6 Grundformen der Visualisierung</h3>
<p>Je nach Art der Information muss die passende Darstellungsform gewählt werden:</p>
<table class="t" style="margin:10px 0;width:100%">
  <thead>
    <tr><th>Diagrammform</th><th>Wann einsetzen? (Zweck)</th><th>Wichtigste Merkmale</th></tr>
  </thead>
  <tbody>
    <tr>
      <td><b><span class="term" data-de="Kurvendiagramm" data-vi="biểu đồ đường / đồ thị">Kurvendiagramm</span></b> (Liniendiagramm)</td>
      <td><span class="term" data-de="Entwicklung" data-vi="xu hướng / sự phát triển">Entwicklung</span> über einen Zeitraum (Zeitreihen)</td>
      <td>Zeitachse immer auf der waagerechten X-Achse (Jahre, Monate, Stunden), Menge/Werte auf der senkrechten Y-Achse.</td>
    </tr>
    <tr>
      <td><b><span class="term" data-de="Säulendiagramm" data-vi="biểu đồ cột dọc">Säulendiagramm</span> / <span class="term" data-de="Balkendiagramm" data-vi="biểu đồ thanh ngang">Balkendiagramm</span></b></td>
      <td><span class="term" data-de="Vergleich" data-vi="so sánh">Vergleich</span> mehrerer Größen oder Kategorien</td>
      <td>Mehrere Größen visuell nebeneinander stellen. Säulen = vertikal, Balken = horizontal.</td>
    </tr>
    <tr>
      <td><b><span class="term" data-de="Kreisdiagramm" data-vi="biểu đồ tròn">Kreisdiagramm</span></b> (Tortendiagramm)</td>
      <td><span class="term" data-de="Anteile" data-vi="tỷ lệ phần trăm">Anteile</span> eines Ganzen (Prozentwerte, Summe = 100 %)</td>
      <td>Zeigt, wie sich eine Gesamtheit aufteilt. Wichtig: Nicht für Zeitverläufe verwenden!</td>
    </tr>
    <tr>
      <td><b><span class="term" data-de="Tabelle" data-vi="bảng số liệu">Tabelle</span></b></td>
      <td>Exakte Zahlen, genaue Messwerte, mehrere Spalten</td>
      <td>Präzise Gegenüberstellung mit klaren Spaltenköpfen und Maßeinheiten.</td>
    </tr>
    <tr>
      <td><b><span class="term" data-de="Strukturbild" data-vi="sơ đồ cấu trúc / nhân–quả">Strukturbild</span></b> (Flussdiagramm)</td>
      <td>Abläufe, Prozesse, <span class="term" data-de="Ursache-Wirkung" data-vi="nguyên nhân – kết quả">Ursache und Wirkung</span></td>
      <td>Pfeile zeigen Richtungen (A → B → C). Gut geeignet für Kreisläufe und Zusammenhänge.</td>
    </tr>
    <tr>
      <td><b><span class="term" data-de="Organigramm" data-vi="sơ đồ tổ chức / cấp bậc">Organigramm</span></b></td>
      <td><span class="term" data-de="Hierarchie" data-vi="hệ thống cấp bậc">Hierarchie</span>, Über- und Unterordnung von Personen/Abteilungen</td>
      <td>Zeigt Organisationsstrukturen (z.B. Geschäftsführer → Abteilungsleiter → Mitarbeiter).</td>
    </tr>
    <tr>
      <td><b><span class="term" data-de="Mindmap" data-vi="sơ đồ tư duy">Mindmap</span></b></td>
      <td>Ideensammlung, Erfassen komplexer Texte, Themenübersicht</td>
      <td>Thema im Zentrum, 4–6 Hauptäste für Kernaspekte, verzweigte Unteräste, nur Stichworte.</td>
    </tr>
  </tbody>
</table>

<div class="note"><b>Schnellmerkformel:</b> % → Kreis · Zeit → Kurve · Vergleich → Säule · exakte Zahlen → Tabelle · Text/Ideen → Mindmap · Kausalität/Ablauf → Strukturbild · Hierarchie → Organigramm.</div>

<h3 class="sub">3. Regeln für eine korrekte Mindmap</h3>
<ol>
  <li><b>Zentrum:</b> Das Hauptthema steht deutlich hervorgehoben in der Mitte des Blattes (z.B. in einem Kreis oder Kasten).</li>
  <li><b>Hauptäste:</b> Vom Zentrum gehen dicke Hauptäste für die zentralen Oberthemen/Aspekte aus.</li>
  <li><b>Unteräste:</b> An den Hauptästen verzweigen sich dünnere Unteräste für Detailinformationen.</li>
  <li><b>Nur Stichworte:</b> Keine ganzen Sätze! Maximal 1 bis 3 Wörter pro Ast.</li>
  <li><b>Lesbarkeit &amp; Sauberkeit:</b> Deutlich und waagerecht schreiben, damit man das Blatt beim Lesen nicht drehen muss.</li>
  <li><b>Farben &amp; Symbole:</b> Äste farblich unterscheiden und sinnvolle Symbole/Pfeile zur Verknüpfung nutzen.</li>
</ol>

<h3 class="sub">4. Gehirnhälften-Modell (Mindmap-Hintergrund)</h3>
<p>Das menschliche Gehirn besteht aus zwei Hälften, die unterschiedliche Denkweisen steuern:</p>
<ul>
  <li><b><span class="term" data-de="Rechte Hirnhälfte" data-vi="bán cầu não phải">Rechte Hirnhälfte</span>:</b> Arbeitet analog und ganzheitlich. Denkt in Bildern, Mustern, Gefühlen und Farben. Zuständig für Kreativität, Musikalität, Intuition und Körpersprache (Gestik &amp; Mimik).</li>
  <li><b><span class="term" data-de="Linke Hirnhälfte" data-vi="bán cầu não trái">Linke Hirnhälfte</span>:</b> Arbeitet analytisch, digital und logisch. Speichert abstrakte Daten wie Texte, Tabellen, Zahlen und Grammatik. Zuständig für Mathematik, Logik, Planung und strukturierte Gliederung.</li>
</ul>
<div class="hint">Mindmaps verbinden beide Hirnhälften: Die logische Textstruktur (links) wird mit bildhafter Anordnung und Farben (rechts) verknüpft!</div>

<h3 class="sub">5. Gestaltungs- und Bewertungskriterien</h3>
<ul>
  <li><b>Überschrift:</b> Jede Grafik braucht eine aussagekräftige Überschrift, die das Thema benennt.</li>
  <li><b>Lineal verwenden:</b> Achsen, Tabellenstriche und Rahmen immer sauber mit Lineal zeichnen!</li>
  <li><b>Achsenbeschriftung &amp; Einheiten:</b> Bei Diagrammen immer Achsen beschriften und Maßeinheiten (€, %, kg, Jahre) angeben.</li>
  <li><b>Groß- und Kleinschreibung:</b> Auch in Stichworten gilt: Nur Substantive und Satzanfänge großschreiben!</li>
</ul>
              <div class="vi"><b>Tóm tắt Tiếng Việt:</b><ul><li><b>Mindmap (Sơ đồ tư duy):</b> Chủ đề chính nằm ở chính giữa, các nhánh chính (Hauptäste) tỏa ra xung quanh kèm từ khóa ngắn gọn (Stichworte), giúp hệ thống hóa ý tưởng.</li><li><b>5 dạng biểu đồ quan trọng (Diagrammtypen):</b><ul><li><b>Säulendiagramm (Biểu đồ cột đứng):</b> So sánh các giá trị tại một thời điểm hoặc giữa các nhóm.</li><li><b>Balkendiagramm (Biểu đồ cột ngang):</b> Giống biểu đồ cột đứng nhưng nằm ngang, rất hợp cho bảng xếp hạng (Ranking).</li><li><b>Kreis- / Tortendiagramm (Biểu đồ tròn):</b> Thể hiện tỷ lệ phần trăm (%) trong một tổng thể 100%.</li><li><b>Liniendiagramm / Kurvendiagramm (Biểu đồ đường):</b> Thể hiện sự biến thiên, xu hướng phát triển theo thời gian (Jahren/Monaten).</li><li><b>Flussdiagramm (Lưu đồ quy trình):</b> Mô tả trình tự các bước hoặc quan hệ nhân quả (Ursache → Wirkung).</li></ul></li></ul></div>
            `,
            "qa": [
              {
                "q": "Wann verwendet man ein Kreisdiagramm (Tortendiagramm) und wann ein Liniendiagramm?",
                "qVi": "Khi nào sử dụng biểu đồ tròn (Kreisdiagramm) và khi nào sử dụng biểu đồ đường (Liniendiagramm)?",
                "a": "Ein <b>Kreisdiagramm</b> zeigt <b>Anteile an einem Ganzen (100 %)</b> zu einem festen Zeitpunkt. Ein <b>Liniendiagramm (Kurvendiagramm)</b> stellt eine <b>zeitliche Entwicklung oder einen Trend</b> über mehrere Jahre oder Monate dar.",
                "aVi": "<b>Kreisdiagramm (Biểu đồ tròn)</b> thể hiện <b>tỷ lệ phần trăm của các thành phần trong một tổng thể (100%)</b> tại một thời điểm cố định. <b>Liniendiagramm (Biểu đồ đường)</b> thể hiện <b>sự phát triển hoặc xu hướng biến đổi theo thời gian</b> qua nhiều tháng/năm."
              },
              {
                "q": "Was ist der Unterschied zwischen einem Säulendiagramm und einem Balkendiagramm?",
                "qVi": "Sự khác biệt giữa biểu đồ cột đứng (Säulendiagramm) và biểu đồ cột ngang (Balkendiagramm) là gì?",
                "a": "Beim <b>Säulendiagramm</b> stehen die Werte als <b>senkrechte Säulen</b> nebeneinander. Beim <b>Balkendiagramm</b> verlaufen die Werte als <b>waagerechte Balken</b> untereinander (ideal für Ranglisten mit langen Beschriftungen).",
                "aVi": "Ở <b>Säulendiagramm</b>, các giá trị được biểu diễn bằng <b>các cột thẳng đứng</b> đặt cạnh nhau. Ở <b>Balkendiagramm</b>, các giá trị chạy <b>ngang từ trái sang phải</b> xếp chồng lên nhau (rất lý tưởng cho bảng xếp hạng có tên mục dài)."
              },
              {
                "q": "Welche Grundregeln gelten beim Erstellen einer Mindmap?",
                "qVi": "Những quy tắc cơ bản nào cần tuân thủ khi lập sơ đồ tư duy (Mindmap)?",
                "a": "Das <b>Zentralthema</b> steht in der Mitte des Querformats. Von dort gehen <b>Hauptäste</b> (Oberbegriffe) und <b>Nebenäste</b> (Details) ab. Es werden nur <b>Stichworte (Substantive/Schlüsselbegriffe)</b> statt ganzer Sätze notiert.",
                "aVi": "<b>Chủ đề trung tâm (Zentralthema)</b> đặt ở chính giữa trang giấy ngang. Từ đó tỏa ra các <b>nhánh chính (Hauptäste - khái niệm lớn)</b> và <b>nhánh phụ (Nebenäste - chi tiết)</b>. Chỉ ghi <b>từ khóa ngắn gọn (Stichworte)</b> thay vì viết cả câu dài."
              }
            ]
          },
              {
                id: "text-zu-grafik",
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>',
                name: "Text → Grafik: 4 Schritte & Kernaussagen",
                desc: "Lesen, Kernaussagen filtern, Form begründet wählen, Struktur gestalten · Teufelskreis",
                content: `<h2>Text → Grafik: 4 Schritte &amp; Kernaussagen</h2>
<div class="hint">Systematische Methode · Sachtexte erfassen · Ursache-Wirkungs-Ketten · Teufelskreis</div>

<h3 class="sub">1. Die 4 Arbeitsschritte zur Visualisierung</h3>
<p>Um aus einem fortlaufenden Sachtext eine fehlerfreie Grafik zu erstellen, folgt man stets dieser bewährten Reihenfolge:</p>

<div class="step-card" style="border:1px solid var(--line);border-radius:12px;padding:12px;margin:8px 0;background:var(--surface)">
  <b>Schritt 1: Fragestellung analysieren</b>
  <p style="margin:4px 0 0;font-size:.9em">Was genau wird verlangt? Die Aufgabenstellung gründlich lesen und das geforderte Produkt markieren (z.B. „Erstelle eine Mindmap" oder „Vergleiche die Werte in einem Diagramm").</p>
</div>

<div class="step-card" style="border:1px solid var(--line);border-radius:12px;padding:12px;margin:8px 0;background:var(--surface)">
  <b>Schritt 2: Text gründlich lesen</b>
  <p style="margin:4px 0 0;font-size:.9em">Den <span class="term" data-de="Sachtext" data-vi="văn bản thông tin / văn bản nhật dụng">Sachtext</span> mindestens einmal vollständig von Anfang bis Ende lesen, um den Gesamtzusammenhang und die Hauptaussage zu erfassen.</p>
</div>

<div class="step-card" style="border:1px solid var(--line);border-radius:12px;padding:12px;margin:8px 0;background:var(--surface)">
  <b>Schritt 3: Kernaussagen filtern &amp; markieren</b>
  <p style="margin:4px 0 0;font-size:.9em"><span class="term" data-de="Kernaussage" data-vi="thông điệp cốt lõi / ý chính">Kernaussagen</span> und <span class="term" data-de="Schlüsselwort" data-vi="từ khóa cốt lõi">Schlüsselwörter</span> mit Textmarker unterstreichen. Unwichtige Ausschmückungen, Füllwörter und Wiederholungen bewusst weglassen.</p>
</div>

<div class="step-card" style="border:1px solid var(--line);border-radius:12px;padding:12px;margin:8px 0;background:var(--surface)">
  <b>Schritt 4: Darstellungsform begründet wählen &amp; gestalten</b>
  <p style="margin:4px 0 0;font-size:.9em">Die passende Form nach den Datenmerkmalen auswählen (Zeitverlauf, Anteile, Vergleich, Hierarchie, Kausalität). Anschließend die Grafik sauber mit Überschrift, Einheiten und Lineal zeichnen.</p>
</div>

<h3 class="sub">2. Kausalitätsdiagramme &amp; der Teufelskreis</h3>
<p>Wenn ein Text Ursachen und Folgen beschreibt, eignet sich ein <span class="term" data-de="Strukturbild" data-vi="sơ đồ cấu trúc / nhân–quả">Strukturbild</span> mit logischen Pfeilen (A → B → C).</p>
<p>Ein besonderer Fall ist der <b><span class="term" data-de="Teufelskreis" data-vi="vòng luẩn quẩn / vòng xoáy tiêu cực">Teufelskreis</span></b> (Vicious Circle): Eine Kette von negativen Ereignissen, bei der das Endergebnis die ursprüngliche Ursache wieder verstärkt.</p>

<div class="note">
  <b>Beispiel aus dem Unterricht: Teufelskreis „Negatives Denken bei Azubis"</b>
  <p style="margin:6px 0 0">
    Negatives Denken („Das schaffe ich nie")<br>
    → Angst und übervorsichtiges Zögern beim Arbeiten<br>
    → Fehler und Verzögerungen im Service/Küche<br>
    → Kritik durch den Ausbilder / Küchenchef<br>
    → Gefühl des Versagens und sinkendes Selbstwertgefühl<br>
    → <b>verstärkt wiederum das negative Denken!</b> (Kreislauf schließt sich)
  </p>
</div>

<h3 class="sub">3. Praxisszenarien: Welcher Text verlangt welche Form?</h3>
<ul>
  <li><b>Stromerzeugung (Erneuerbare 52 %, Kohle 26 %, Gas 15 %, Sonstige 7 %):</b> Gesamtheit = 100 % Anteile → <b>Kreisdiagramm</b>.</li>
  <li><b>Umsatzentwicklung eines Restaurants 2018 bis 2026:</b> Zeitverlauf auf X-Achse, Umsatz auf Y-Achse → <b>Kurvendiagramm</b>.</li>
  <li><b>Gästezufriedenheit in 4 verschiedenen Hotelabteilungen:</b> Vergleich mehrerer eigenständiger Gruppen → <b>Balken- oder Säulendiagramm</b>.</li>
  <li><b>Bestellablauf von der Warenannahme bis zur Einlagerung:</b> Prozessschritte in zeitlicher Abfolge → <b>Flussdiagramm / Strukturbild</b>.</li>
  <li><b>Personelle Struktur einer Hotelbrigade:</b> Hoteldirektor über F&amp;B-Manager, Chef de Cuisine und Restaurantleiter → <b>Organigramm</b>.</li>
</ul>

<h3 class="sub">4. Typische Fehler vermeiden</h3>
<div class="hint">
  <ul>
    <li>Falsche Form: Ein Kreisdiagramm für eine Zeitreihe wählen (z.B. Jahre im Tortenstück) ist ein schwerer Fehler!</li>
    <li>Ganze Sätze: Fließtext in die Äste einer Mindmap schreiben führt zu Punktabzug. Nur prägnante Stichwörter verwenden.</li>
    <li>Fehlende Überschrift: Jede Visualisierung muss sofort erkennen lassen, welches Thema behandelt wird.</li>
    <li>Freihand zeichnen: Achsen, Tabellenlinien und Kästen müssen immer mit Lineal gezeichnet werden.</li>
  </ul>
</div>
              <div class="vi"><b>Tóm tắt Tiếng Việt — 5 bước chuyển văn bản thành biểu đồ & phân tích:</b><ol><li><b>Bước 1 (Lesen & Markieren):</b> Đọc kỹ văn bản, gạch chân số liệu, mốc thời gian, đơn vị (%, Euro, người) và nguồn.</li><li><b>Bước 2 (Diagrammtyp wählen):</b> Chọn đúng loại biểu đồ (100% → Kreisdiagramm; chuỗi thời gian → Liniendiagramm; so sánh nhóm → Säulen-/Balkendiagramm).</li><li><b>Bước 3 (Achsen & Legende):</b> Ghi rõ tiêu đề (Überschrift), trục hoành (x-Achse), trục tung (y-Achse), đơn vị và nguồn (Quelle).</li><li><b>Bước 4 (Grafikbeschreibung):</b> Viết bài mô tả theo cấu trúc: <b>Einleitung</b> (Chủ đề, nguồn, năm, loại biểu đồ) → <b>Hauptteil</b> (Giá trị cao nhất/thấp nhất, xu hướng tăng/giảm, so sánh nổi bật) → <b>Schluss</b> (Nhận xét tổng kết & nguyên nhân/hệ quả).</li></ol></div>
            `,
            "qa": [
              {
                "q": "Wie ist eine schriftliche Grafikbeschreibung im Fach Deutsch aufgebaut?",
                "qVi": "Một bài viết mô tả biểu đồ (Grafikbeschreibung) trong môn Tiếng Đức có bố cục như thế nào?",
                "a": "1. <b>Einleitung:</b> Thema, Quelle, Erscheinungsjahr, Erhebungszeitraum, Diagrammtyp und Einheit.<br>2. <b>Hauptteil:</b> Beschreibung der Extremwerte (Maximum/Minimum), Entwicklungen (Steigung/Rückgang) und auffälligen Vergleiche.<br>3. <b>Schluss:</b> Zusammenfassung der Kernaussage, mögliche Ursachen und Ausblick.",
                "aVi": "1. <b>Mở bài (Einleitung):</b> Chủ đề, nguồn trích dẫn, năm công bố, giai đoạn khảo sát, loại biểu đồ và đơn vị tính.<br>2. <b>Thân bài (Hauptteil):</b> Mô tả giá trị cực đại/cực tiểu (Maximum/Minimum), xu hướng tăng/giảm và các phép so sánh nổi bật.<br>3. <b>Kết bài (Schluss):</b> Tóm tắt thông điệp chính, giải thích nguyên nhân và dự báo xu hướng."
              },
              {
                "q": "Welche Redemittel eignen sich für die Einleitung und den Hauptteil einer Grafikbeschreibung?",
                "qVi": "Những mẫu câu (Redemittel) nào phù hợp cho phần Mở bài và Thân bài khi mô tả biểu đồ?",
                "a": "<ul><li><b>Einleitung:</b> „Das vorliegende Säulendiagramm mit dem Titel … stammt aus … und zeigt … / Die Angaben erfolgen in Prozent.“</li><li><b>Hauptteil:</b> „An erster Stelle steht … mit … %“, „Den geringsten Anteil bildet …“, „Zwischen … und … ist die Zahl von … auf … gestiegen / gesunken.“</li></ul>",
                "aVi": "<ul><li><b>Mở bài:</b> „Biểu đồ cột hiện tại có tiêu đề … trích từ … và thể hiện … / Các số liệu được tính bằng phần trăm.“</li><li><b>Thân bài:</b> „Đứng ở vị trí đầu tiên là … với … %“, „Chiếm tỷ lệ thấp nhất là …“, „Trong khoảng từ … đến …, con số đã tăng / giảm từ … lên/xuống …“</li></ul>"
              }
            ]
          },
            ],
          },
          {
            id: "ka-praxis",
            badge: "KA · Training",
            title: "Klassenarbeit Praxis & Musteraufgabe",
            items: [
              {
                id: "muster-ka",
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
                name: "Muster-Klassenarbeit (Herrn Kling) & Checkliste",
                desc: "Originaltext Fleischkonsum · Kernaussagen · Muster-Mindmap · Bewertungskriterien",
                content: `<h2>Muster-Klassenarbeit (Herrn Kling) &amp; Checkliste</h2>
<div class="hint">Prüfungsaufgabe · Original-Sachtext · Kernaussagen · Muster-Mindmap · Bewertungskriterien</div>

<p><a class="btn" href="klassenarbeiten/deutsch.html">Interaktive Deutsch-App öffnen (Training + Musterlösung) →</a></p>

<h3 class="sub">1. Aufgabenstellung der Klassenarbeit</h3>
<div class="note">
  <b>Aufgabe:</b> Visualisiere den folgenden Sachtext <i>„Fleischkonsum in Deutschland"</i> in Form einer vollständigen und übersichtlichen <b>Mindmap</b> auf einem separaten Blatt. Übernimm alle wichtigen Kerninformationen und zähle am Ende die Anzahl deiner verwendeten Wörter.
</div>

<h3 class="sub">2. Originaltext: „Fleischkonsum in Deutschland"</h3>
<div style="background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:14px;margin:10px 0;line-height:1.6">
  <p><b>Fleischkonsum in Deutschland</b></p>
  <p>In der <b>Vergangenheit</b> galt Fleisch in Deutschland als <span class="term" data-de="Wohlstand" data-vi="sự giàu có / thịnh vượng">Zeichen von Wohlstand</span>. Nur Menschen mit ausreichend Geld konnten es sich leisten, regelmäßig Fleisch zu essen. Mit dem steigenden Lebensstandard wurde Fleisch jedoch immer günstiger und für fast alle Menschen verfügbar. Heute gehört es für viele zum Alltag, sei es zu Hause, in der Kantine oder unterwegs.</p>
  <p>In den letzten Jahren hat sich die Einstellung zum Fleischkonsum jedoch verändert. Immer mehr Menschen beschäftigen sich mit den Folgen ihres Essverhaltens. Dabei spielen vor allem <b>drei Aspekte</b> eine wichtige Rolle: die <b>Gesundheit</b>, der <b>Umweltschutz</b> und das <b>Tierwohl</b>.</p>
  <p><b>Gesundheit:</b> Aus gesundheitlicher Sicht liefert Fleisch wichtige Nährstoffe wie <span class="term" data-de="Eiweiß" data-vi="chất đạm / protein">Eiweiß</span> und <span class="term" data-de="Eisen" data-vi="sắt (khoáng chất)">Eisen</span>. Ein mäßiger Verzehr kann daher sinnvoll sein. Zu viel rotes oder verarbeitetes Fleisch kann jedoch das Risiko für verschiedene Krankheiten erhöhen. Ernährungsexperten empfehlen deshalb, den Fleischkonsum zu reduzieren und häufiger pflanzliche Lebensmittel wie Gemüse, Obst oder <span class="term" data-de="Hülsenfrüchte" data-vi="các loại đậu">Hülsenfrüchte</span> zu essen.</p>
  <p><b>Umweltschutz:</b> Auch die Umwelt wird durch die Fleischproduktion stark belastet. Für die Tierhaltung werden große Mengen an Wasser, Energie und Anbauflächen benötigt. Zudem entstehen <span class="term" data-de="Treibhausgase" data-vi="khí nhà kính">Treibhausgase</span>, die zur <span class="term" data-de="Klimaerwärmung" data-vi="sự nóng lên toàn cầu">Klimaerwärmung</span> beitragen. Häufig werden Wälder gerodet, um Platz für Futtermittel zu schaffen. Dadurch gehen wichtige Lebensräume verloren und das Klima wird weiter geschädigt.</p>
  <p><b>Tierwohl:</b> Ein weiterer wichtiger Punkt ist das Tierwohl. In der <span class="term" data-de="Massentierhaltung" data-vi="chăn nuôi công nghiệp tập trung">Massentierhaltung</span> leben viele Tiere auf engem Raum und unter schlechten Bedingungen. Deshalb achten immer mehr Verbraucher auf die Herkunft des Fleisches und bevorzugen Produkte aus <span class="term" data-de="artgerechte Haltung" data-vi="chăn nuôi nhân đạo / phù hợp tập tính">artgerechter Haltung</span>.</p>
  <p>Diese <b>Entwicklungen</b> führen zu einem veränderten Ernährungsverhalten. Viele Menschen essen heute bewusster und reduzieren Fleischkonsum. Andere verzichten ganz auf tierische Produkte und ernähren sich vegetarisch oder vegan. Langfristig könnte ein geringerer Fleischkonsum dazu beitragen, die Umwelt zu schützen, die Gesundheit zu verbessern und das Leben der Tiere zu erleichtern.</p>
</div>

<h3 class="sub">3. Kernaussagen &amp; Mindmap-Struktur</h3>
<ul>
  <li><b>Zentrum der Mindmap:</b> „Fleischkonsum in Deutschland"</li>
  <li><b>Hauptast 1: Vergangenheit &amp; Wandel:</b> Früher Zeichen von Wohlstand · steigender Lebensstandard → günstig &amp; für alle verfügbar · Alltagskonsum.</li>
  <li><b>Hauptast 2: Gesundheit:</b> Liefert Eiweiß &amp; Eisen (mäßig sinnvoll) · Risiko bei zu viel rotem/verarbeitetem Fleisch · Empfehlung: Reduzieren, mehr Hülsenfrüchte &amp; Gemüse.</li>
  <li><b>Hauptast 3: Umweltschutz:</b> Hoher Verbrauch an Wasser, Energie, Fläche · Treibhausgase &amp; Klimaerwärmung · Waldrodung für Tierfutter · Verlust von Lebensräumen.</li>
  <li><b>Hauptast 4: Tierwohl:</b> Problem Massentierhaltung (Enge, schlechte Bedingungen) · Herkunft prüfen · Trend zu artgerechter Haltung.</li>
  <li><b>Hauptast 5: Zukünftige Entwicklungen:</b> Bewussterer Konsum · Trend zu vegetarisch / vegan · langfristige Vorteile für Mensch, Tier &amp; Umwelt.</li>
</ul>

<h3 class="sub">4. Prüfungs-Checkliste für die Klassenarbeit</h3>
<div class="note">
  <b>Vor der Abgabe prüfen:</b>
  <ol>
    <li>Steht das Thema deutlich in der Mitte des Blattes?</li>
    <li>Sind alle 5–6 Hauptäste vorhanden (Vergangenheit, Gesundheit, Umwelt, Tierwohl, Entwicklung)?</li>
    <li>Wurden ausschließlich Stichworte verwendet (keine ganzen Sätze)?</li>
    <li>Wurden die Äste hierarchisch unterteilt und farblich/visuell gegliedert?</li>
    <li>Wurde die Gesamtzahl der geschriebenen Wörter am Rand notiert?</li>
    <li>Sind alle Substantive und Eigennamen korrekt großgeschrieben?</li>
  </ol>
</div>
              <div class="vi"><b>Tóm tắt Tiếng Việt — Đề thi mẫu Klassenarbeit 1 (Mindmap & Biểu đồ):</b><ul><li><b>Phần A (Mindmap):</b> Đọc văn bản thông tin (VD: <i>Ausbildung im Gastgewerbe</i> hoặc <i>Nachhaltigkeit im Hotel</i>) và lập Mindmap gồm 4–5 nhánh chính (Aufgaben, Arbeitszeiten, Vorteile, Herausforderungen, Zukunftschancen).</li><li><b>Phần B (Diagramm zeichnen & beschreiben):</b> Từ bảng số liệu hoặc đoạn văn có chứa số liệu thống kê, vẽ biểu đồ thích hợp (ghi đủ tiêu đề, trục, đơn vị, nguồn) và viết đoạn văn 120–150 từ phân tích biểu đồ bằng thì <b>Präsens</b> (hoặc Perfekt/Präteritum cho số liệu quá khứ).</li></ul></div>
            `,
            "qa": [
              {
                "q": "Welche Pflichtangaben dürfen beim Zeichnen eines Diagramms in der Klassenarbeit niemals fehlen?",
                "qVi": "Những thông tin bắt buộc nào không bao giờ được thiếu khi vẽ biểu đồ trong bài kiểm tra (Klassenarbeit)?",
                "a": "1. <b>Aussagekräftige Überschrift (Titel)</b>.<br>2. <b>Achsenbeschriftung</b> (x-Achse und y-Achse mit <b>Maßeinheit</b> wie % oder Euro).<br>3. <b>Skalierung</b> in gleichmäßigen Abständen.<br>4. <b>Legende</b> (falls mehrere Datenreihen).<br>5. <b>Quellenangabe und Erhebungsjahr</b>.",
                "aVi": "1. <b>Tiêu đề rõ ràng (Überschrift/Titel)</b>.<br>2. <b>Chú thích trục</b> (trục hoành x và trục tung y kèm <b>đơn vị đo</b> như % hoặc Euro).<br>3. <b>Chia vạch tỷ lệ (Skalierung)</b> đều nhau.<br>4. <b>Chú giải (Legende)</b> nếu có nhiều nhóm dữ liệu.<br>5. <b>Nguồn và năm thống kê (Quelle & Jahr)</b>."
              },
              {
                "q": "In welcher Zeitform (Tempus) schreibt man eine Grafikbeschreibung?",
                "qVi": "Bài mô tả biểu đồ được viết ở thì (Tempus) nào?",
                "a": "Grundsätzlich im <b>Präsens</b> (z. B. <i>„Das Diagramm zeigt…“, „An der Spitze liegt…“</i>). Vergangene Entwicklungen werden im <b>Präteritum</b> oder <b>Perfekt</b> dargestellt (z. B. <i>„Im Jahr 2020 sank der Wert auf… / ist der Wert auf … gesunken.“</i>).",
                "aVi": "Về nguyên tắc dùng thì <b>Hiện tại đơn (Präsens)</b> (VD: <i>„Biểu đồ cho thấy…“, „Đứng đầu là…“</i>). Các diễn biến đã kết thúc trong quá khứ dùng thì <b>Präteritum</b> hoặc <b>Perfekt</b> (VD: <i>„Năm 2020 giá trị đã giảm xuống…“</i>)."
              }
            ]
          },
            ],
          },
          {
            id: "inhaltsangabe",
            badge: "KA · Inhaltsangabe",
            title: "Inhaltsangabe schreiben (Sachtext & Kurzgeschichte)",
            items: [
              {
                id: "inhaltsangabe-formel",
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',
                name: "Inhaltsangabe: Formel, Aufbau & Checkliste",
                desc: "TATTE-Formel · Einleitungssatz · 4-Farben-Methode · Zeitform Präsens · Todsünden",
                content: `<h2>Inhaltsangabe: Formel, Aufbau &amp; Checkliste</h2>
<div class="hint">Grundregeln · TATTE-Einleitungssatz · 4-Farben-Methode · Zeitform Präsens · 5 Todsünden</div>

<p><a class="btn" href="klassenarbeiten/deutsch-inhaltsangabe.html">Interaktives Übungsmaterial &amp; Prüfungsbogen öffnen (DE/VI) →</a></p>

<h3 class="sub">1. Was ist eine Inhaltsangabe?</h3>
<div class="note">
  Eine <b>Inhaltsangabe</b> ist eine <b>knappe, sachliche und objektive</b> Zusammenfassung eines Textes in <b>eigenen Worten</b> und in der Zeitform <b>Präsens</b>.
  <br><b>Ziel:</b> Der Leser soll das Wesentliche verstehen, ohne den Originaltext gelesen zu haben.
</div>

<h3 class="sub">2. Die goldene Einleitungs-Formel (TATTE)</h3>
<p>Der Einleitungssatz besteht aus 5 festen Bausteinen:</p>
<table>
  <thead><tr><th>Kürzel</th><th>Baustein</th><th>Bedeutung / Beispiel</th><th>Tiếng Việt</th></tr></thead>
  <tbody>
    <tr><td><b>T</b></td><td><span class="term" data-de="Titel" data-vi="tiêu đề tác phẩm">Titel</span></td><td>in Anführungszeichen: <i>„Hauptsache weit“</i>, <i>„Trachtenmode“</i></td><td>Tên tác phẩm</td></tr>
    <tr><td><b>A</b></td><td><span class="term" data-de="Autor" data-vi="tác giả">Autor / Autorin</span></td><td>Vor- und Nachname: Sibylle Berg, Elke Heidenreich</td><td>Tác giả</td></tr>
    <tr><td><b>T</b></td><td><span class="term" data-de="Textsorte" data-vi="thể loại văn bản">Textsorte / Textart</span></td><td>Kurzgeschichte, Sachtext, Zeitungsbericht, Glosse</td><td>Thể loại văn bản</td></tr>
    <tr><td><b>T</b></td><td><span class="term" data-de="Thema" data-vi="chủ đề cốt lõi">Thema / Kernaussage</span></td><td>Worum geht es im Kern? (1–2 präzise Sätze)</td><td>Chủ đề tóm tắt ngắn</td></tr>
    <tr><td><b>E</b></td><td><span class="term" data-de="Erscheinungsjahr" data-vi="năm xuất bản / nguồn">Erscheinungsjahr / Quelle</span></td><td>Jahr (z. B. 2001) oder Medium (z. B. Stuttgarter Zeitung)</td><td>Năm / nguồn xuất bản</td></tr>
  </tbody>
</table>

<div class="note">
  <b>Mustersatz (Schablone):</b><br>
  <i>„In der/dem <span style="color:#7A2E2E;font-weight:600">[Textsorte]</span> ‚<span style="color:#5b7a52;font-weight:600">[Titel]</span>‘ von <span style="color:#48586B;font-weight:600">[Autor]</span>, erschienen im Jahr <span style="color:#9C7A3C;font-weight:600">[Jahr]</span> in <span style="color:#9C7A3C;font-weight:600">[Quelle]</span>, geht es um <span style="font-weight:600">[Thema]</span>.“</i>
</div>

<h3 class="sub">3. Der Hauptteil (Chronologisch in Sinnabschnitten)</h3>
<ul>
  <li><b>Sinnabschnitte bilden:</b> Den Text in logische Abschnitte unterteilen (z. B. Einleitung, Konflikt, Wendepunkt, Ausgang).</li>
  <li><b>Zeitform: Immer Präsens!</b> Auch wenn der Originaltext im Präteritum geschrieben ist. Bei Vorzeitigkeit: Perfekt.</li>
  <li><b>Eigene Worte:</b> Keine langen Sätze aus dem Text abschreiben (Paraphrasieren!).</li>
  <li><b>Keine wörtliche Rede:</b> Niemals direkte Rede mit Anführungszeichen („...“) übernehmen. Stattdessen <b>indirekte Rede</b> oder Handlungen zusammenfassen.</li>
</ul>

<h3 class="sub">4. Die 5 Todsünden einer Inhaltsangabe</h3>
<div class="warn" style="background:#FFF3CD;border:1px solid #FFE69C;border-radius:10px;padding:12px;margin:10px 0;line-height:1.6">
  <ol>
    <li><b>Keine Zitate / wörtliche Rede</b> (keine Anführungszeichen im Hauptteil!).</li>
    <li><b>Kein Präteritum / Perfekt</b> als Haupterzählzeit (durchgehend Präsens!).</li>
    <li><b>Keine eigene Meinung / Wertung</b> („Ich finde gut...“, „Der böse Mann...“).</li>
    <li><b>Keine Spannungsmacher</b> („Plötzlich geschah etwas Schreckliches...“).</li>
    <li><b>Keine unwichtigen Details</b> (Ausschmückungen, Nebensächlichkeiten weglassen!).</li>
  </ol>
</div>

<h3 class="sub">5. Prüfungs-Checkliste vor Abgabe</h3>
<div class="note">
  <ol>
    <li>Nennt der Einleitungssatz alle TATTE-Elemente (Titel, Autor, Textart, Thema, Erscheinungsjahr)?</li>
    <li>Ist die gesamte Inhaltsangabe im Präsens verfasst?</li>
    <li>Gibt es keine wörtliche Rede und keine Anführungszeichen im Hauptteil?</li>
    <li>Ist der Text in eigene Worte umformuliert (kein wörtliches Abschreiben)?</li>
    <li>Werden die Ereignisse in der richtigen zeitlichen Reihenfolge dargestellt?</li>
    <li>Ist der Ton sachlich, neutral und frei von persönlicher Meinung?</li>
    <li>Enthält der Schluss (falls gefordert) die Kernaussage bzw. Botschaft?</li>
  </ol>
</div>
              <div class="vi"><b>Tóm tắt Tiếng Việt — Công thức viết Inhaltsangabe (Tóm tắt văn bản):</b><ul><li><b>5 Quy tắc vàng:</b> (1) Viết ở thì <b>Präsens</b> (sự việc xảy ra trước đó dùng <b>Perfekt</b>); (2) Ngôi thứ 3 khách quan (<b>sachlich</b>, không nêu ý kiến cá nhân ở mở bài/thân bài); (3) <b>Không trích dẫn trực tiếp (keine wörtliche Rede)</b> → chuyển sang câu gián tiếp (<b>Konjunktiv I</b> hoặc <i>dass</i>-Satz); (4) Dùng từ ngữ riêng (<b>eigene Worte</b>), chỉ giữ lại cốt truyện chính (W-Fragen: Wer? Wann? Wo? Was? Warum? Wie endet es?); (5) Độ dài khoảng 1/3 văn bản gốc.</li><li><b>Cấu trúc 3 phần:</b> <b>Einleitung (Basissatz)</b> (Textsorte, Titel, Autor, Erscheinungsjahr, Thema/Kernaussage) → <b>Hauptteil</b> (Các bước hành động chính theo trình tự logic, dùng từ nối <i>zunächst, daraufhin, schließlich</i>) → <b>Schluss</b> (Ý đồ tác giả / thông điệp bài học).</li></ul></div>
            `,
            "qa": [
              {
                "q": "Welche fünf Angaben gehören zwingend in den Einleitungssatz (Basissatz) einer Inhaltsangabe?",
                "qVi": "5 thông tin nào bắt buộc phải có trong câu mở đầu (Basissatz) của một bài Inhaltsangabe?",
                "a": "1. <b>Textsorte</b> (z. B. Kurzgeschichte, Fabel, Kalendergeschichte, Sachtext).<br>2. <b>Autor/in</b>.<br>3. <b>Titel</b> des Textes.<br>4. <b>Erscheinungsjahr / Quelle</b> (falls angegeben).<br>5. <b>Kernaussage / Thema</b> (Worum geht es im Kern?).",
                "aVi": "1. <b>Thể loại văn bản (Textsorte)</b> (VD: truyện ngắn, ngụ ngôn, văn bản thông tin).<br>2. <b>Tác giả (Autor/in)</b>.<br>3. <b>Tiêu đề (Titel)</b>.<br>4. <b>Năm xuất bản / Nguồn (Erscheinungsjahr / Quelle)</b>.<br>5. <b>Chủ đề cốt lõi (Kernaussage / Thema)</b> (Văn bản nói về vấn đề chính gì?)."
              },
              {
                "q": "Welche sprachlichen Regeln gelten für den Hauptteil einer Inhaltsangabe?",
                "qVi": "Những quy tắc ngôn ngữ nào áp dụng cho phần Thân bài (Hauptteil) của bài Inhaltsangabe?",
                "a": "<ul><li><b>Tempus:</b> <b>Präsens</b> (Vorzeitigkeit im <b>Perfekt</b>).</li><li><b>Stil:</b> sachlich, neutral, in <b>eigenen Worten</b>, ohne Spannungsmacher und ohne Details/Ausschmückungen.</li><li><b>Rede:</b> <b>keine direkte Rede (keine Zitate)</b>, sondern <b>indirekte Rede (Konjunktiv I)</b>.</li></ul>",
                "aVi": "<ul><li><b>Thì (Tempus):</b> <b>Hiện tại đơn (Präsens)</b> (hành động xảy ra trước đó dùng <b>Perfekt</b>).</li><li><b>Văn phong:</b> khách quan, trung lập, diễn đạt bằng <b>từ ngữ của chính mình</b>, bỏ các chi tiết rườm rà/gây kịch tính.</li><li><b>Lời thoại:</b> <b>cấm trích dẫn trực tiếp</b>, bắt buộc chuyển sang <b>câu gián tiếp (Konjunktiv I)</b>.</li></ul>"
              }
            ]
          },
              {
                id: "inhaltsangabe-muster",
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>',
                name: "Mustertexte: Spaghettieis & Trachtenmode",
                desc: "2 vollständige Musterlösungen mit Farbzerlegung (Titel, Autor, Textsorte, Thema)",
                content: `<h2>Mustertexte: Spaghettieis &amp; Trachtenmode</h2>
<div class="hint">2 vollständige Musterlösungen mit Analyse der TATTE-Bestandteile und Sinnabschnitte</div>

<p><a class="btn" href="klassenarbeiten/deutsch-inhaltsangabe.html">Vollständiges Material in der Deutsch-App öffnen →</a></p>

<h3 class="sub">Musterbeispiel 1: Sachtext / Zeitungsbericht („Spaghettieis“)</h3>
<div style="background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:14px;margin:10px 0;line-height:1.6">
  <p><b>Originalangaben:</b> Titel: <i>„Das Eis, das aus der Spätzlepresse kam“</i> · Autorin: Nicole Hess · Textart: Zeitungsbericht · Erschienen: 28.02.2014, Stuttgarter Zeitung</p>
  
  <p><b>1. Einleitungssatz:</b><br>
  Der Zeitungsbericht <i>„Das Eis, das aus der Spätzlepresse kam“</i> von Nicole Hess, erschienen am 28.02.2014 in der Stuttgarter Zeitung, thematisiert die Erfindung des beliebten Spaghettieises durch den Mannheimer Eismacher Dario Fontanella.</p>

  <p><b>2. Hauptteil:</b><br>
  Im Jahr 1969 entwickelt der Eismacher Dario Fontanella in Mannheim die Idee, Vanilleeis durch eine gekühlte <span class="term" data-de="Spätzlepresse" data-vi="dụng cụ ép mì spätzle">Spätzlepresse</span> zu drücken, um die Form von Spaghetti nachzubilden. Garniert mit Erdbeersoße als Tomatensauce und geriebener weißer Schokolade als Parmesankäse entsteht so das erste Spaghettieis. Obwohl sein ursprünglicher Plan, die Farben der italienischen Flagge nachzubilden, vom Vater abgelehnt wird, setzt sich die süße Nudel-Kopie schnell durch.<br><br>
  Heute ist Dario Fontanella 62 Jahre alt und betreibt mehrere Eisdielen sowie eine eigene Manufaktur in Mannheim. Trotz seines bundesweiten Erfolgs und zahlreicher Ehrungen bedauert er, seine Erfindung damals nicht patentiert zu haben, wodurch ihm erhebliche finanzielle Einnahmen entgangen sind.</p>

  <p><b>Analyse der Qualität:</b><br>
  Der Text verwendet durchgehend das <b>Präsens</b> („entwickelt“, „ist“, „bedauert“), fasst die Geschichte in zwei klare Sinnabschnitte (Erfindung 1969 → Gegenwart) zusammen und verzichtet auf direkte Zitate.</p>
</div>

<h3 class="sub">Musterbeispiel 2: Literarischer Text / Kurzgeschichte („Trachtenmode“)</h3>
<div style="background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:14px;margin:10px 0;line-height:1.6">
  <p><b>Originalangaben:</b> Titel: <i>„Trachtenmode“</i> · Autorin: Elke Heidenreich · Textart: Kurzgeschichte · Jahr: 2005 · Verlag: Hanser</p>
  
  <p><b>1. Einleitungssatz:</b><br>
  In der Kurzgeschichte <i>„Trachtenmode“</i> von Elke Heidenreich aus dem Jahr 2005 geht es um eine deutsche Filmcrew in Australien, deren leichtsinniger Streich mit einem scheinbar toten Känguru eine unerwartete Wendung nimmt.</p>

  <p><b>2. Hauptteil:</b><br>
  Eine Münchner Dokumentarfilmgruppe unternimmt eine Jeepfahrt durch einen australischen Nationalpark. Als ein Känguru neben dem Fahrzeug herläuft, streift der Fahrer das Tier versehentlich. Die entsetzten Filmer glauben, das Tier sei tot, und lehnen es an einen Baumstamm.<br><br>
  Während zwei Teammitglieder Hilfe holen, verkleidet der zurückgebliebene Begleiter Waldi das Känguru im <span class="term" data-de="Übermut" data-vi="sự bồng bột / nghịch dại">Übermut</span> mit seiner bayerischen Trachtenjacke und einem Hut, während der Kameramann die Szene filmt. Plötzlich erwacht das Tier aus seiner Betäubung und flieht mit hoher Geschwindigkeit in den Busch – mitsamt der Jacke, in der sich alle Flugtickets und Ausweispapiere der Gruppe befinden.</p>

  <p><b>3. Schluss (Kernaussage / Botschaft):</b><br>
  Die Geschichte verdeutlicht, dass respektloser Leichtsinn und unüberlegter Übermut gravierende, unvorhersehbare Konsequenzen nach sich ziehen können.</p>

  <p><b>Analyse der Qualität:</b><br>
  Der literarische Text besitzt einen deutlichen Wendepunkt (Känguru wacht auf), der chronologisch dargestellt wird. Unwichtige Details (Marken, Gamsbart) wurden weggelassen, die Kernaussage wird im Schlusssatz sachlich formuliert.</p>
</div>
              <div class="vi"><b>Tóm tắt Tiếng Việt — Các bài mẫu Inhaltsangabe kinh điển:</b><ul><li>Tổng hợp phân tích và bài viết mẫu chuẩn IHK/Berufsschule cho các truyện ngắn thường gặp trong chương trình năm 2: <b>„Spaghetti für zwei“</b> (Federica de Cesco — định kiến và sự hiểu lầm hài hước tại quán ăn), <b>„Die Küchenuhr“</b> (Wolfgang Borchert — nỗi mất mát sau chiến tranh và giá trị của những điều bình dị), cùng các văn bản báo chí/chuyên ngành Gastronomie.</li><li>Mỗi bài mẫu đều chia rõ: <b>Basissatz</b> → <b>Sinnabschnitte (Chia đoạn ý)</b> → <b>Inhaltsangabe hoàn chỉnh ở thì Präsens</b> → <b>Deutung / Schluss (Nhận xét ý nghĩa)</b>.</li></ul></div>
            `,
            "qa": [
              {
                "q": "Wie lautet der Kerngedanke (Thema) der Kurzgeschichte „Spaghetti für zwei“ von Federica de Cesco?",
                "qVi": "Tư tưởng cốt lõi (Chủ đề) của truyện ngắn „Spaghetti für zwei“ (Federica de Cesco) là gì?",
                "a": "Die Kurzgeschichte handelt von <b>Vorurteilen, Rassismus und einem peinlichen Missverständnis</b> im Selbstbedienungsrestaurant: Der jugendliche Heinz hält einen dunkelhäutigen Tischgenossen für einen dreisten Dieb seines Essens, erkennt am Ende jedoch beschämt, dass sein eigener Teller unberührt am Nachbartisch steht und der Fremde sein Essen großzügig mit ihm geteilt hat.",
                "aVi": "Truyện ngắn xoay quanh <b>định kiến, sự phân biệt đối xử và một hiểu lầm đáng xấu hổ</b> trong nhà hàng tự phục vụ: Cậu thiếu niên Heinz tưởng người đàn ông da màu ngồi cùng bàn ăn trộm đĩa mì của mình, nhưng cuối cùng bẽ bàng nhận ra đĩa mì của cậu vẫn nằm nguyên ở bàn bên cạnh và chính người lạ mặt đã hào phóng chia sẻ phần ăn cho cậu."
              },
              {
                "q": "Wie formuliert man die indirekte Rede im Konjunktiv I korrekt?",
                "qVi": "Cách chia động từ ở câu gián tiếp (Konjunktiv I) chuẩn xác như thế nào?",
                "a": "Man bildet den Konjunktiv I vom <b>Verbstamm + Endung -e</b> (3. Person Singular: <i>er sage, er habe, er sei, er könne, er wolle, er gehe</i>). Ist der Konjunktiv I identisch mit dem Indikativ (oft im Plural: <i>sie haben</i>), weicht man auf den <b>Konjunktiv II</b> (<i>sie hätten, sie würden…</i>) aus.",
                "aVi": "Lập Konjunktiv I bằng <b>Gốc động từ + đuôi -e</b> ở ngôi thứ 3 số ít (<i>er sage, er habe, er sei, er könne, er wolle, er gehe</i>). Nếu dạng Konjunktiv I trùng với hiện tại thường (hay gặp ở ngôi số nhiều: <i>sie haben</i>) thì chuyển sang dùng <b>Konjunktiv II</b> (<i>sie hätten, sie würden…</i>)."
              }
            ]
          },
              {
                id: "inhaltsangabe-uebung",
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>',
                name: "Übung & Originaltext: ‚Hauptsache weit‘",
                desc: "Kurzgeschichte von Sibylle Berg (2001) · 5 Sinnabschnitte · Aufgabenstellung KA",
                content: `<h2>Übung &amp; Originaltext: ‚Hauptsache weit‘</h2>
<div class="hint">Kurzgeschichte von Sibylle Berg (2001) · 5 Sinnabschnitte · Textmarkierung &amp; Aufgabenstellung KA</div>

<p><a class="btn" href="klassenarbeiten/deutsch-inhaltsangabe.html#p6">Interaktive Übung &amp; Musterlösung in der App öffnen →</a></p>

<h3 class="sub">1. Aufgabenstellung (Klassenarbeit)</h3>
<div class="note">
  <b>Aufgabe:</b>
  <ol>
    <li>Lies die folgende Kurzgeschichte <i>„Hauptsache weit“</i> von Sibylle Berg sorgfältig durch.</li>
    <li>Gliedere den Text in sinnvolle <b>Sinnabschnitte</b> und formuliere für jeden Abschnitt eine kurze Überschrift.</li>
    <li>Verfasse eine vollständige <b>Inhaltsangabe</b> (Einleitungssatz mit TATTE, Hauptteil im Präsens, Schlusssatz mit Kernaussage).</li>
  </ol>
</div>

<h3 class="sub">2. Originaltext: „Hauptsache weit“ von Sibylle Berg</h3>
<div style="background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:16px;margin:10px 0;line-height:1.7;font-size:.95em">
  <p><b>Und weg</b>, hatte er gedacht. Die Schule war zu Ende, das Leben noch nicht, hatte noch nicht begonnen, das Leben. Er hatte nicht viel Angst davor, weil er noch keine Enttäuschungen kannte. Er war ein schöner Junge mit langen dunklen Haaren, er spielte Gitarre, komponierte am Computer und dachte, irgendwie werde ich wohl später nach London gehen, was Kreatives machen. Aber das war später. Und nun? Warum kommt der Spaß nicht?</p>
  
  <p>Der Junge hockt in einem Zimmer, das Zimmer ist grün, wegen der Neonleuchte, es hat kein Fenster und der Ventilator ist sehr laut. Schatten huschen über den Betonboden, das Glück ist das nicht, eine Wolldecke auf dem Bett, auf der schon einige Kriege ausgetragen wurden. Magen gegen Tom Yam, Darm gegen Curry. Immer verloren, die Eingeweide. Der Junge ist 18, und jetzt aber Asien, hatte er sich gedacht. Mit 1000 Dollar durch Thailand, Indien, Kambodscha, drei Monate unterwegs, und dann wieder heim, nach Deutschland. Das ist so eng, so langweilig, jetzt was erleben und vielleicht nie wieder zurück. Hast du keine Angst, hatten blasse Freunde zu Hause gefragt, so ganz alleine? Nein, hatte er geantwortet, man lernt ja so viele Leute kennen unterwegs. Bis jetzt hatte er hauptsächlich Mädchen kennengelernt, nett waren die schon, wenn man Leute mag, die einen bei jedem Satz anfassen. Mädchen, die aussahen wie dreißig und doch so alt waren wie er, seit Monaten unterwegs, die Mädchen, da werden sie komisch. Übermorgen würde er in Laos sein, da mag er jetzt gar nicht dran denken, in seinem hässlichen Pensionszimmer, muss Obacht geben, dass er sich nicht aufs Bett wirft und weint, auf die Decke, wo schon die anderen Dinge drauf sind. In dem kleinen Fernseher kommen nur Leute vor, die ihm völlig fremd sind, das ist das Zeichen, dass man einsam ist, wenn man die Fernsehstars eines Landes nicht kennt und die eigenen keine Bedeutung haben. Der Junge sehnt sich nach Stefan Raab, nach Harald Schmidt. Er merkt weiter, dass er gar nicht existiert, wenn er nichts hat, was er kennt. Wenn er keine Zeitung in seiner Sprache kaufen kann, keine Klatschgeschichten über einheimische Prominente lesen, wenn keiner anruft und fragt, wie es ihm geht. Dann gibt es ihn nicht. Denkt er. Und ist unterdessen aus seinem Zimmer in die heiße Nacht gegangen, hat fremdes Essen vor sich, von einer fremdsprachigen Serviererin gebracht, die sich nicht für ihn interessiert, wie niemand hier. Das ist wie tot sein, denkt der Junge. Weit weg von zu Hause, um anderen beim Leben zuzusehen, könnte man umfallen und sterben in der tropischen Nacht und niemand würde weinen darum. Jetzt weint er doch, denkt an die lange Zeit, die er noch rumbekommen muss, alleine in heißen Ländern mit seinem Rucksack, und das stimmt so gar nicht mit den Bildern überein, die er zu Hause von sich hatte. Wie er entspannt mit Wasserbüffeln spielen wollte, in Straßencafés sitzen und cool sein. Was ist, ist einer mit Sonnenbrand und Heimweh nach den Stars zu Hause, die sind wie ein Geländer zum Festhalten.</p>
  
  <p>Er geht durch die Nacht, selbst Tiere reden ausländisch, und dann sieht er etwas, sein Herz schlägt schneller. Ein Computer, ein Internet-Café. Und er setzt sich, schaltet den Computer an, liest seine E-Mails. Kleine Sätze von seinen Freunden, und denen antwortet er, dass es ihm gut gehe und alles großartig ist, und er schreibt und schreibt und es ist auf einmal völlig egal, dass zu seinen Füßen ausländische Insekten so groß wie Meerkatzen herumlaufen, dass das fremde Essen im Magen drückt. Er schreibt seinen Freunden über die kleinen Katastrophen, und die fremde Welt um ihn verschwimmt, er ist nicht mehr allein, taucht in den Bildschirm ein, der ist wie ein weiches Bett; er denkt an Bill Gates und Fred Apple, er schickt eine Mail an Sat 1, und für ein paar Stunden ist er wieder am Leben, in der heißen Nacht weit weg von zu Hause.</p>
</div>

<h3 class="sub">3. Sinnabschnitte &amp; Strukturhilfe</h3>
<table>
  <thead><tr><th>Abschnitt</th><th>Zeilen / Inhalt</th><th>Schwerpunkt</th></tr></thead>
  <tbody>
    <tr><td><b>1. Ausgangssituation</b></td><td>Schulabschluss, Zukunftspläne, Wunsch nach Ausbruch aus Deutschland</td><td>Reisemotiv &amp; Euphorie</td></tr>
    <tr><td><b>2. Ernüchternde Realität</b></td><td>Tristes Pensionszimmer, Magenprobleme, Einsamkeit in der Fremde</td><td>Diskrepanz Traum vs. Realität</td></tr>
    <tr><td><b>3. Identitätsverlust</b></td><td>Fremde Fernsehstars, fehlende Sprache, Gefühl der Nicht-Existenz</td><td>Krise &amp; tiefes Heimweh</td></tr>
    <tr><td><b>4. Wendepunkt</b></td><td>Fund des Internet-Cafés, Kontakt zu Freunden per E-Mail</td><td>Rettungsanker Internet</td></tr>
    <tr><td><b>5. Auflösung &amp; Botschaft</b></td><td>Scheinbare Stärke nach außen, vorübergehende Beruhigung durch virtuelle Heimat</td><td>Bedeutung von Bindung</td></tr>
  </tbody>
</table>

<h3 class="sub">4. Musterlösung (Zum Abgleich)</h3>
<div class="note">
  <p><b>Einleitung:</b><br>
  In der Kurzgeschichte <i>„Hauptsache weit“</i> von Sibylle Berg (2001) geht es um einen 18-jährigen Schulabgänger, der allein durch Südostasien reist und fernab der Heimat von tiefer Einsamkeit und Heimweh überwältigt wird.</p>
  
  <p><b>Hauptteil:</b><br>
  Nach dem Schulabschluss reist ein 18-jähriger Deutscher mit wenig Geld allein für drei Monate durch Asien, um dem gewohnten Alltag zu entfliehen. Anstatt der erhofften Abenteuer findet er sich jedoch in einem trostlosen, fensterlosen Pensionszimmer wieder. Die fremde Umgebung, Sprachbarrieren und gesundheitliche Probleme verstärken sein Gefühl der Isolation. Da ihm vertraute kulturelle Bezugspunkte fehlen, fühlt er sich fremd und bedeutungslos.<br><br>
  Als er ziellos durch die Stadt irrt und weint, entdeckt er ein Internet-Café. Beim Lesen und Beantworten der E-Mails seiner Freunde zu Hause verdrängt er seine Einsamkeit. Er täuscht ihnen vor, dass seine Reise ein voller Erfolg sei, und findet in der digitalen Verbindung zu seiner Heimat für einige Stunden emotionalen Halt.</p>

  <p><b>Schluss:</b><br>
  Die Kurzgeschichte zeigt, dass das Streben nach exotischen Reisen und Selbstfindung oft an der Sehnsucht nach Vertrautheit und Heimat scheitert, wenn feste soziale Bindungen fehlen.</p>
</div>
              <div class="vi"><b>Tóm tắt Tiếng Việt — Bài tập thực hành viết Inhaltsangabe & Sửa lỗi sai:</b><ul><li><b>Bài tập chuyển đổi câu:</b> Chuyển từ thì quá khứ (Präteritum) sang hiện tại (Präsens), chuyển lời thoại trực tiếp sang gián tiếp (Konjunktiv I), và rút gọn đoạn văn dài thành 1–2 câu súc tích bằng danh từ hóa (Nominalstil) hoặc mệnh đề phụ.</li><li><b>Checklist tự kiểm tra trước khi nộp bài:</b> Đã đủ 5 yếu tố trong Basissatz chưa? Có bị sót câu Präteritum hay dấu ngoặc kép trích dẫn nào không? Có lỡ chèn bình luận cá nhân vào Hauptteil không?</li></ul></div>
            `,
            "qa": [
              {
                "q": "Forme die direkte Rede in die indirekte Rede um: Der Küchenchef fragte den Azubi: „Hast du die Kühlhaus-Temperatur schon kontrolliert?“",
                "qVi": "Chuyển câu trực tiếp sau sang câu gián tiếp: Bếp trưởng hỏi Azubi: „Em đã kiểm tra nhiệt độ kho lạnh chưa?“",
                "a": "Der Küchenchef fragt den Auszubildenden, <b>ob er die Kühlhaus-Temperatur bereits kontrolliert habe</b>.",
                "aVi": "Der Küchenchef fragt den Auszubildenden, <b>ob er die Kühlhaus-Temperatur bereits kontrolliert habe</b> (Câu hỏi Yes/No chuyển sang mệnh đề phụ bắt đầu bằng liên từ <b>ob</b> + động từ chia ở Perfekt Konjunktiv I <b>habe kontrolliert</b>)."
              },
              {
                "q": "Welche typischen Fehler führen in der Klassenarbeit zur Inhaltsangabe zum Punktabzug?",
                "qVi": "Những lỗi điển hình nào dẫn đến bị trừ điểm trong bài kiểm tra viết Inhaltsangabe?",
                "a": "1. Wechsel ins <b>Präteritum</b> (Nacherzählung statt Inhaltsangabe).<br>2. <b>Wörtliche Rede / Zitate</b> im Hauptteil.<br>3. <b>Eigene Meinung</b> schon in der Einleitung oder im Hauptteil.<br>4. Fehlende Angaben im <b>Basissatz</b> (z. B. Textsorte oder Thema vergessen).",
                "aVi": "1. Dùng nhầm thì <b>Quá khứ Präteritum</b> (biến thành kể lại truyện Nacherzählung thay vì tóm tắt).<br>2. Dùng <b>lời thoại trực tiếp / trích dẫn</b> trong thân bài.<br>3. Đưa <b>ý kiến cá nhân</b> vào mở bài hoặc thân bài.<br>4. Thiếu thông tin trong câu <b>Basissatz</b> (quên thể loại hoặc chủ đề)."
              }
            ]
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
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 12h18"/></svg>',
        accent: "#7c3aed",
        soft: "#f5f3ff",
        teacher: "",
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
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
                name: "Telephoning",
                desc: "Call types · phrases · polite language · role play",
                pages: { folder: "images/scans/2-Englisch", from: 4, to: 7, prefix: "2-Englisch" },
                content: `
                  <h2> Telephoning · Business situations</h2>
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
                  <div class="note"> On the phone you represent yourself <b>and</b> the company — polite language = professional image.</div>
              <div class="vi"><b>Tóm tắt Tiếng Việt — Giao tiếp điện thoại trong khách sạn & nhà hàng (Telephoning):</b><ul><li><b>Chào hỏi & Xưng danh:</b> <i>„Good morning/afternoon, Hotel …, [Name] speaking. How may I help you?“</i></li><li><b>Hỏi tên & Đánh vần (Spelling):</b> <i>„May I have your name, please? — Could you spell that for me, please?“</i> (Sử dụng bảng chữ cái ICAO/NATO hoặc ví dụ rõ ràng).</li><li><b>Nối máy & Để lại lời nhắn:</b> <i>„Hold the line, please. I’ll put you through to…“ / „I’m afraid Mr/Ms … is not available at the moment. Would you like to leave a message?“</i></li><li><b>Nhận đặt bàn / đặt phòng:</b> Xác nhận ngày (Date), giờ (Time), số lượng khách (Number of guests/covers), khu vực ngồi (smoking/non-smoking, terrace, window table) và số điện thoại liên hệ.</li></ul></div>
            `,
            "qa": [
              {
                "q": "How do you politely answer the phone at a restaurant or hotel reception in English?",
                "qVi": "Bạn trả lời điện thoại lịch sự tại quầy lễ tân khách sạn hoặc nhà hàng bằng tiếng Anh như thế nào?",
                "a": "<b>“Good morning / Good afternoon / Good evening, [Restaurant/Hotel Name], [Your Name] speaking. How may I help you?”</b>",
                "aVi": "<b>“Good morning / Good afternoon / Good evening, [Tên Nhà hàng/Khách sạn], [Tên bạn] speaking. How may I help you?”</b> (Xin chào, Nhà hàng/Khách sạn ..., tôi là ... đang nghe. Tôi có thể giúp gì cho quý khách?)."
              },
              {
                "q": "What phrases do you use when the person called is busy or unavailable?",
                "qVi": "Bạn dùng những mẫu câu nào khi người được gọi đang bận hoặc không có mặt?",
                "a": "<ul><li>“I’m sorry, the line is busy / engaged at the moment. Would you like to hold?”</li><li>“I’m afraid Ms Miller is not available right now. Can I take a message / ask her to call you back?”</li></ul>",
                "aVi": "<ul><li>“Xin lỗi, hiện đường dây đang bận. Quý khách có muốn giữ máy chờ không?”</li><li>“Tôi e rằng cô Miller hiện không có mặt. Tôi có thể ghi lại lời nhắn hoặc nhắn cô ấy gọi lại cho quý khách không?”</li></ul>"
              }
            ]
          },
              {
                id: "present-future-tenses",
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/></svg>',
                name: "Present & future tenses",
                desc: "Simple present · progressive · going to",
                pages: { folder: "images/scans/2-Englisch", from: 11, to: 13, prefix: "2-Englisch" },
                content: `
                  <h2>Present &amp; future tenses</h2>
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
                  <div class="note"> Job talk: skills &amp; routines → simple present · current training/project → progressive.</div>
              <div class="vi"><b>Tóm tắt Tiếng Việt — Các thì Hiện tại & Tương lai trong tiếng Anh ngành dịch vụ:</b><ul><li><b>Simple Present (V / V-s):</b> Thói quen, lịch trình cố định, giờ mở cửa (<i>„Breakfast is served from 6:30 to 10:30 a.m.“</i>).</li><li><b>Present Progressive (am/is/are + V-ing):</b> Hành động đang diễn ra ngay lúc nói hoặc kế hoạch đã thu xếp chắc chắn trong tương lai gần (<i>„The chef is preparing your steak right now.“</i>).</li><li><b>Will-Future (will + V):</b> Quyết định tức thời tại thời điểm nói (Spontaneous decision), lời hứa, đề nghị lịch sự trong phục vụ (<i>„I’ll bring you a fresh glass immediately.“</i>).</li><li><b>Going-to-Future (am/is/are going to + V):</b> Dự định có kế hoạch từ trước hoặc dự đoán có dấu hiệu rõ ràng (<i>„We are going to renovate the bar next month.“</i>).</li></ul></div>
            `,
            "qa": [
              {
                "q": "Why do waiters and receptionists use the Will-Future (“I’ll…”) when reacting to a guest’s request or complaint?",
                "qVi": "Tại sao nhân viên phục vụ và lễ tân luôn dùng thì Will-Future (“I’ll…”) khi phản hồi yêu cầu hoặc phàn nàn của khách?",
                "a": "Because it is a <b>spontaneous decision or promise made at the moment of speaking</b> (e.g., <i>“I’m sorry about that, Madam. I’ll bring you a clean fork right away.”</i>).",
                "aVi": "Vì đó là một <b>quyết định tức thời hoặc lời hứa được đưa ra ngay tại thời điểm nói</b> để hỗ trợ khách (VD: <i>“Tôi rất xin lỗi bà về điều đó. Tôi sẽ mang cho bà một chiếc nĩa sạch ngay lập tức.”</i>)."
              },
              {
                "q": "Which tense is used for fixed timetables and opening hours in hotels and restaurants?",
                "qVi": "Thì nào được sử dụng cho lịch trình cố định và giờ mở cửa tại khách sạn, nhà hàng?",
                "a": "The <b>Simple Present</b> (e.g., <i>“Our restaurant opens at 6 p.m.” / “Check-out is until 11 a.m.”</i>).",
                "aVi": "Thì <b>Hiện tại đơn (Simple Present)</b> (VD: <i>“Nhà hàng chúng tôi mở cửa lúc 6 giờ chiều.” / “Giờ trả phòng là đến 11 giờ trưa.”</i>)."
              }
            ]
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
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/></svg>',
                name: "Dealing with complaints",
                desc: "Phrases · dialogues · role play · AB S.10+14–15",
                pages: { folder: "images/scans/2-Englisch", from: 10, to: 15, prefix: "2-Englisch" },
                content: `
                  <h2> Dealing with complaints in the restaurant</h2>

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
                  <div class="note"> Never argue. Stay calm, polite, offer a clear solution.</div>
              <div class="vi"><b>Tóm tắt Tiếng Việt — Xử lý phàn nàn tại nhà hàng & khách sạn (Dealing with Complaints):</b><ul><li><b>Quy trình 5 bước chuyên nghiệp (LEARN):</b> (1) <b>Listen</b> (Lắng nghe không ngắt lời) → (2) <b>Empathize & Apologize</b> (<i>„I am terribly sorry to hear that / Please accept my apologies“</i>) → (3) <b>Ask / Clarify</b> (Hỏi rõ chi tiết nếu cần) → (4) <b>Resolve / Offer a solution</b> (Đổi món mới, làm lại món, tặng đồ uống/tráng miệng hoặc giảm hóa đơn) → (5) <b>Notify & Follow up</b> (Báo bếp/quản lý và quay lại hỏi thăm khách).</li><li><b>Từ vựng lỗi món ăn/phục vụ thường gặp:</b> <i>overcooked / burnt</i> (quá lửa/cháy), <i>undercooked / raw</i> (chưa chín/sống), <i>tough</i> (dai), <i>cold</i> (nguội), <i>too salty / spicy</i> (quá mặn/cay), <i>chipped glass / dirty cutlery</i> (ly sứt / dao nĩa bẩn), <i>wrong order / bill mistake</i> (nhầm món / sai hóa đơn).</li></ul></div>
            `,
            "qa": [
              {
                "q": "What are the five professional steps for handling a guest complaint in English?",
                "qVi": "5 bước chuyên nghiệp để xử lý phàn nàn của khách bằng tiếng Anh là gì?",
                "a": "1. <b>Listen</b> carefully without interrupting.<br>2. <b>Apologize</b> sincerely (<i>“I’m terribly sorry about that…”</i>).<br>3. <b>Show empathy</b> and understanding.<br>4. <b>Offer an immediate solution</b> (replace the dish, offer a complimentary drink/coffee).<br>5. <b>Follow up</b> to make sure the guest is satisfied.",
                "aVi": "1. <b>Lắng nghe</b> cẩn thận không ngắt lời.<br>2. <b>Xin lỗi</b> chân thành (<i>“I’m terribly sorry about that…”</i>).<br>3. <b>Thể hiện sự đồng cảm</b>.<br>4. <b>Đưa ra giải pháp ngay lập tức</b> (đổi món mới, mời đồ uống/cà phê miễn phí).<br>5. <b>Kiểm tra lại (Follow up)</b> để chắc chắn khách đã hài lòng."
              },
              {
                "q": "How do you respond politely if a guest says: “Excuse me, my steak is completely overcooked – I ordered it medium rare!”?",
                "qVi": "Bạn đáp lại lịch sự thế nào nếu khách nói: “Xin lỗi, miếng bít tết của tôi bị chín kỹ quá mức – tôi đã gọi tái vừa (medium rare)!”?",
                "a": "<b>“Please accept my sincere apologies, Sir/Madam. I will take it back to the kitchen immediately and have the chef prepare a fresh medium-rare steak for you right away. May I offer you a complimentary drink while you wait?”</b>",
                "aVi": "<b>“Xin quý khách nhận lời xin lỗi chân thành của tôi. Tôi sẽ mang đĩa về bếp ngay lập tức và báo bếp trưởng làm lại một phần bít tết tái vừa mới cho quý khách. Tôi có thể mời quý khách một ly đồ uống miễn phí trong lúc chờ đợi được không ạ?”</b>"
              }
            ]
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
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9h16"/><path d="M4 15h16"/><path d="M10 3 8 21"/><path d="M16 3l-2 18"/></svg>',
                name: "much · many · a little · a few",
                desc: "Countable vs uncountable",
                pages: { folder: "images/scans/2-Englisch", from: 9, to: 9, prefix: "2-Englisch" },
                content: `
                  <h2> much · many · a little · a few</h2>

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
                  <div class="note"><b>few/little</b> alone often sounds negative (almost none). <b>a few / a little</b> = some (enough).</div>
                  <div class="formula">countable → many / a few · uncountable → much / a little</div>
              <div class="vi"><b>Tóm tắt Tiếng Việt — Danh từ đếm được / không đếm được & Lượng từ (Quantifiers):</b><ul><li><b>Countable Nouns (Đếm được):</b> <i>table, reservation, bottle, glass, napkin, fork, complaint</i> → đi với <b>many, a few / few</b>.</li><li><b>Uncountable Nouns (Không đếm được):</b> <i>information, advice, luggage/baggage, furniture, cutlery, crockery, water, wine, milk, bread, money, time</i> → luôn chia động từ số ít, đi với <b>much, a little / little, a piece of / a glass of</b>.</li><li><b>Some vs. Any:</b> <b>Some</b> dùng trong câu khẳng định và câu mời/đề nghị lịch sự (<i>„Would you like some more wine / bread?“</i>); <b>Any</b> dùng trong câu phủ định và câu hỏi thông thường (<i>„Do you have any allergies?“</i>).</li></ul></div>
            `,
            "qa": [
              {
                "q": "When do we use “some” in questions instead of “any” in gastronomy?",
                "qVi": "Khi nào chúng ta dùng “some” trong câu hỏi thay vì “any” trong ngành nhà hàng - khách sạn?",
                "a": "We use <b>“some”</b> in polite <b>offers and requests</b> where we expect a positive answer (e.g., <i>“Would you like some coffee?” / “Could I have some more water, please?”</i>). For open information questions (e.g., <i>“Do you have any food allergies?”</i>) we use <b>“any”</b>.",
                "aVi": "Dùng <b>“some”</b> trong các <b>lời mời và lời yêu cầu lịch sự</b> khi mong đợi câu trả lời đồng ý (VD: <i>“Quý khách có dùng thêm chút cà phê không ạ?” / “Cho tôi xin thêm chút nước được không?”</i>). Với câu hỏi thông tin thông thường (VD: <i>“Quý khách có bị dị ứng thực phẩm nào không?”</i>) thì dùng <b>“any”</b>."
              },
              {
                "q": "Explain the difference between “much / many” and “a little / a few”.",
                "qVi": "Giải thích sự khác biệt giữa “much / many” và “a little / a few”.",
                "a": "<ul><li><b>many / a few</b> are used with <b>countable plural nouns</b> (<i>many guests, a few free tables</i>).</li><li><b>much / a little</b> are used with <b>uncountable nouns</b> (<i>not much time, a little milk, a little information</i>).</li></ul>",
                "aVi": "<ul><li><b>many / a few</b> đi với <b>danh từ đếm được số nhiều</b> (<i>many guests – nhiều khách, a few free tables – một vài bàn trống</i>).</li><li><b>much / a little</b> đi với <b>danh từ không đếm được</b> (<i>not much time – không nhiều thời gian, a little milk – một chút sữa</i>).</li></ul>"
              }
            ]
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
          },
          { theme:"telephoning", cat:"Phrases", q:"How do you politely answer a business call?", opts:["Yeah, what?","Good morning, Tech Solutions. Anna speaking.","Who is this?","Wait."], a:1, ex:"Company + name is professional." },
          { theme:"telephoning", cat:"Message", q:"The person is not available. What do you offer?", opts:["Nothing, hang up","Would you like to leave a message?","Call again in a year","Shout the name"], a:1, ex:"Offer to take a message or a callback." },
          { theme:"telephoning", cat:"Call type", q:"A customer asks about your opening hours. This is a(n) …", opts:["complaint call","information call","problem call","private call"], a:1, ex:"Asking for information = information call." },
          { theme:"complaints-restaurant", cat:"Service", q:"Best reaction to „My soup is cold.“?", opts:["That's normal.","I'm terribly sorry. I'll bring you a fresh one right away.","Not my problem.","Pay first."], a:1, ex:"Apologize + solve immediately." },
          { theme:"complaints-restaurant", cat:"Attitude", q:"What should you NEVER do with a complaining guest?", opts:["Listen","Argue with the guest","Apologize","Offer a solution"], a:1, ex:"Never argue — stay calm and polite." },
          { theme:"quantifiers", cat:"Grammar", q:"How ___ customers are waiting?", opts:["much","many","a little","less"], a:1, ex:"customers = countable plural → many." },
          { theme:"quantifiers", cat:"Grammar", q:"We only have ___ time before we open.", opts:["many","a few","a little","few ones"], a:2, ex:"time = uncountable → a little." },
          { theme:"present-future-tenses", cat:"Tenses", q:"„Look at the queue — we ___ a busy day.“", opts:["have had","are going to have","had","have been having"], a:1, ex:"Visible evidence → going-to future." },
          { theme:"present-future-tenses", cat:"Tenses", q:"„The shop ___ at 8 a.m. every morning.“", opts:["is opening","opens","is going to open","opened"], a:1, ex:"Routine/timetable → simple present (+s)." },
          {
            type: "fill",
            theme: "present-future-tenses",
            cat: "Tenses",
            q: "Now / at the moment → am/is/are + verb-___",
            answers: ["ing", "-ing", "ing form"],
            answer: "ing",
            ex: "Present progressive = am/is/are + verb-ing."
          },
          {
            type: "fill",
            theme: "telephoning",
            cat: "Polite",
            q: "Polite request to wait: „Could you ___ on, please?“",
            answers: ["hold", "hold on"],
            answer: "hold",
            ex: "hold on = warten / am Apparat bleiben."
          }
        ]
      },
      {
        id: "gk",
        code: "GK",
        name: "Gemeinschaftskunde",
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="2" width="16" height="20" rx="1"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M12 6h.01"/><path d="M16 6h.01"/><path d="M8 10h.01"/><path d="M12 10h.01"/><path d="M16 10h.01"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/></svg>',
        accent: "#16a34a",
        soft: "#f0fdf4",
        teacher: "",
        examDate: "2026-07-22",
        ready: true,
        desc: "1. Lehrjahr: GK-GLE (LS 01–49) & KA 1 · 2. Lehrjahr: Partizipation, Grundgesetz, Gewaltenteilung, Wahlen & Kalter Krieg",
        groups: [
          ...(window.GK_GLE_GROUPS || []),
          {
            id: "jahr1-ka1",
            badge: "1. Jahr · KA 1",
            title: "1. Lehrjahr · KA 1 Grundwissen & Schreibaufgaben",
            items: [
                        {
            id: "gk-ka1-themen",
            name: "1. Lehrjahr · 4 Formen der Einflussnahme & Grundrechte (KA 1)",
            desc: "Bürgerbeteiligung, Grundrechte vs. Menschenrechte, Jugendgemeinderat, Muster-Schreibaufgaben",
            keyPoints: [
              "4 Formen: Wahlen, Bürgerinitiative (BI)/Demonstrationen, Parteien, Verbände/Gewerkschaften/NGOs",
              "Menschenrechte (für alle Menschen) vs. Bürgerrechte/Deutschenrechte (Art. 8, 9, 11, 12 GG)",
              "Einschränkung der Grundrechte nur durch Gesetz; Wesensgehalt ist unantastbar (Art. 19 GG)"
            ],
            content: `
              <h2>1. Vier Möglichkeiten der politischen Einflussnahme</h2>
              <p>In einer parlamentarischen Demokratie können Bürgerinnen und Bürger auf <b>vier Hauptwegen</b> Einfluss auf politische Entscheidungen nehmen:</p>
              <table class="tbl">
                <thead>
                  <tr><th>Form der Einflussnahme</th><th>Merkmale &amp; Beispiele</th><th>Vorteile (+) / Grenzen (−)</th></tr>
                </thead>
                <tbody>
                  <tr>
                    <td><b>1. Wahlen &amp; Abstimmungen</b><br><i>(Bundestag, Landtag, Kommunalwahl, Bürgerentscheid)</i></td>
                    <td>Wahl von Abgeordneten auf Zeit; auf kommunaler Ebene auch direkte Sachentscheidungen (Bürgerbegehren / Bürgerentscheid).</td>
                    <td><b>+</b> Geringer Zeitaufwand, hohe demokratische Legitimation.<br><b>−</b> Nur alle 4–5 Jahre; kein direkter Einfluss auf einzelne Gesetze im Bund.</td>
                  </tr>
                  <tr>
                    <td><b>2. Parteien</b><br><i>(Art. 21 GG: Mitwirkung an der politischen Willensbildung)</i></td>
                    <td>Mitgliedschaft in einer Partei oder Jugendorganisation (z. B. Jusos, Junge Union, Grüne Jugend), Aufstellung von Kandidaten, Wahlkampf.</td>
                    <td><b>+</b> Langfristige Gestaltung vieler Politikfelder, direkter Zugang zu Parlamenten.<br><b>−</b> Hoher Zeitaufwand, Kompromisse und Parteidisziplin nötig.</td>
                  </tr>
                  <tr>
                    <td><b>3. Bürgerinitiativen (BI) &amp; Demonstrationen</b><br><i>(Art. 8 GG Versammlungsfreiheit, Art. 17 GG Petitionsrecht)</i></td>
                    <td>Zeitlich begrenzter Zusammenschluss von Bürgern zu einem konkreten lokalen Problem (z. B. Umgehungsstraße, Erhalt eines Jugendzentrums, Fridays for Future).</td>
                    <td><b>+</b> Schnell gründbar, bürgernah, gezielter Druck auf Lokalpolitik und Medien.<br><b>−</b> Meist nur Einzelthema (Single-Issue); löst sich nach Erfolg/Misserfolg oft wieder auf.</td>
                  </tr>
                  <tr>
                    <td><b>4. Verbände, Gewerkschaften &amp; NGOs</b><br><i>(Art. 9 GG Vereinigungs- und Koalitionsfreiheit)</i></td>
                    <td>Interessenvertretung bestimmter Gruppen: Gewerkschaften (NGG, ver.di, IG Metall), Arbeitgeberverbände (DEHOGA), Umwelt- und Menschenrechtsorganisationen (BUND, Amnesty).</td>
                    <td><b>+</b> Große Fachkompetenz, Finanzkraft und Verhandlungsmacht (z. B. Tarifverträge, Lobbyarbeit).<br><b>−</b> Vertritt primär Gruppeninteressen statt des gesamten Gemeinwohls.</td>
                  </tr>
                </tbody>
              </table>
              <div class="vi">
                <b>Giải thích Tiếng Việt (4 hình thức tham gia chính trị):</b>
                <ul>
                  <li><b>1. Bầu cử &amp; Trưng cầu dân ý (Wahlen &amp; Abstimmungen):</b> Bầu đại biểu quốc hội/địa phương định kỳ 4–5 năm; ở cấp xã/thành phố có thêm <i>Bürgerbegehren / Bürgerentscheid</i> (kiến nghị &amp; bỏ phiếu trực tiếp của dân). Ưu điểm: tốn ít thời gian; Nhược: chỉ diễn ra định kỳ.</li>
                  <li><b>2. Đảng phái chính trị (Parteien – Điều 21 GG):</b> Tham gia đảng hoặc đoàn thanh niên của đảng, xây dựng cương lĩnh và ứng cử. Ưu điểm: ảnh hưởng lâu dài đến nhiều lĩnh vực; Nhược: tốn nhiều thời gian, phải thỏa hiệp theo kỷ luật đảng.</li>
                  <li><b>3. Sáng kiến công dân &amp; Biểu tình (Bürgerinitiativen &amp; Demonstrationen – Điều 8, 17 GG):</b> Nhóm công dân tự tập hợp vì một vấn đề cụ thể tại địa phương (VD: phản đối chặt cây, giữ nhà văn hóa thanh niên). Ưu điểm: lập nhanh, sát thực tế; Nhược: chỉ giải quyết 1 chủ đề ngắn hạn.</li>
                  <li><b>4. Hiệp hội, Công đoàn &amp; NGOs (Verbände &amp; Gewerkschaften – Điều 9 GG):</b> Đại diện quyền lợi nghề nghiệp/xã hội (Công đoàn ngành ẩm thực NGG, Hiệp hội khách sạn DEHOGA, tổ chức môi trường). Ưu điểm: chuyên môn sâu, sức mạnh đàm phán lớn.</li>
                </ul>
              </div>

              <h2>2. Grundrechte im Grundgesetz (Art. 1–19 GG)</h2>
              <table class="tbl">
                <thead>
                  <tr><th>Kategorie</th><th>Geltungsbereich</th><th>Wichtige Artikel im Grundgesetz</th></tr>
                </thead>
                <tbody>
                  <tr>
                    <td><b>Menschenrechte</b><br><i>(Jedermannsrechte)</i></td>
                    <td>Gelten für <b>alle Menschen</b> in Deutschland (unabhängig von der Staatsangehörigkeit).</td>
                    <td>
                      • <b>Art. 1 GG:</b> Schutz der Menschenwürde (unantastbar)<br>
                      • <b>Art. 2 GG:</b> Freie Entfaltung der Persönlichkeit, Recht auf Leben und körperliche Unversehrtheit<br>
                      • <b>Art. 3 GG:</b> Gleichheit vor dem Gesetz, Diskriminierungsverbot<br>
                      • <b>Art. 4 GG:</b> Glaubens-, Gewissens- und Religionsfreiheit<br>
                      • <b>Art. 5 GG:</b> Meinungs-, Presse-, Kunst- und Wissenschaftsfreiheit
                    </td>
                  </tr>
                  <tr>
                    <td><b>Bürgerrechte</b><br><i>(Deutschenrechte)</i></td>
                    <td>Gelten laut Grundgesetz für <b>deutsche Staatsbürgerinnen und Staatsbürger</b> (EU-Bürger sind vielfach gesetzlich gleichgestellt).</td>
                    <td>
                      • <b>Art. 8 GG:</b> Versammlungsfreiheit (friedlich und ohne Waffen)<br>
                      • <b>Art. 9 GG:</b> Vereinigungs- und Koalitionsfreiheit<br>
                      • <b>Art. 11 GG:</b> Freizügigkeit (freie Wahl des Wohnortes)<br>
                      • <b>Art. 12 GG:</b> Berufsfreiheit (freie Wahl von Beruf und Ausbildungsstätte)
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="callout">
                <b>Schranken der Grundrechte &amp; Ewigkeitsklausel:</b><br>
                • Grundrechte sind <b>Abwehrrechte des Bürgers gegen den Staat</b>.<br>
                • Sie dürfen nur auf Grundlage eines Gesetzes eingeschränkt werden, wenn die <b>Rechte anderer</b> oder die <b>verfassungsmäßige Ordnung</b> verletzt werden. Der <b>Wesensgehalt</b> eines Grundrechts darf niemals angetastet werden (<b>Art. 19 Abs. 2 GG</b>).<br>
                • <b>Art. 79 Abs. 3 GG (Ewigkeitsklausel):</b> Art. 1 GG (Menschenwürde) und Art. 20 GG (Demokratie-, Rechts- und Sozialstaatsprinzip) dürfen auch durch eine Zweidrittelmehrheit niemals abgeschafft werden.
              </div>
              <div class="vi">
                <b>Giải thích Tiếng Việt (Quyền cơ bản trong Hiến pháp Đức):</b>
                <ul>
                  <li><b>Menschenrechte (Nhân quyền):</b> Áp dụng cho <b>mọi con người</b> sống tại Đức bất kể quốc tịch (Điều 1: Nhân phẩm bất khả xâm phạm; Điều 2: Tự do cá nhân &amp; quyền sống; Điều 3: Bình đẳng trước pháp luật; Điều 4: Tự do tín ngưỡng; Điều 5: Tự do ngôn luận &amp; báo chí).</li>
                  <li><b>Bürgerrechte (Quyền công dân Đức):</b> Dành cho người mang quốc tịch Đức (Điều 8: Tự do hội họp/biểu tình ôn hòa; Điều 9: Tự do lập hội/công đoàn; Điều 11: Tự do cư trú; Điều 12: Tự do lựa chọn nghề nghiệp &amp; nơi học nghề).</li>
                  <li><b>Giới hạn quyền cơ bản (Art. 19 &amp; 79 GG):</b> Quyền cơ bản bảo vệ công dân trước sự lạm quyền của Nhà nước. Chỉ được giới hạn bằng luật khi xâm phạm quyền của người khác, nhưng <b>bản chất cốt lõi (Wesensgehalt)</b> và <b>Nhân phẩm (Art. 1 GG)</b> là bất khả xâm phạm vĩnh viễn (Ewigkeitsklausel).</li>
                </ul>
              </div>

              <h2>3. Beteiligung von Jugendlichen: Jugendgemeinderat (JGR)</h2>
              <ul>
                <li><b>Aufgabe:</b> Überparteiliche Interessenvertretung der Jugendlichen in einer Stadt oder Gemeinde gegenüber dem Gemeinderat und dem Bürgermeister (§ 41a GemO BW).</li>
                <li><b>Rechte im Gemeinderat:</b> <b>Rederecht</b> (Stellungnahme zu jugendrelevanten Themen), <b>Antragsrecht</b> (eigene Vorschläge einbringen) und ein <b>eigenes Budget</b> für Projekte (z. B. Skaterpark, Kulturveranstaltungen, Nachtbusse).</li>
              </ul>
              <div class="vi">
                <b>Giải thích Tiếng Việt (Hội đồng thanh thiếu niên – Jugendgemeinderat):</b> Đại diện tiếng nói của giới trẻ tại thành phố/địa phương trước Hội đồng thành phố và Thị trưởng; có <b>quyền phát biểu (Rederecht)</b>, <b>quyền đệ trình kiến nghị (Antragsrecht)</b> và <b>ngân sách riêng</b> để tổ chức các dự án cho thanh thiếu niên.
              </div>
            `,
            qa: [
              {
                q: "Nenne die vier Möglichkeiten der politischen Einflussnahme für Bürgerinnen und Bürger und gib jeweils ein Beispiel an.",
                qVi: "Nêu 4 hình thức tham gia gây ảnh hưởng chính trị của công dân và cho ví dụ mỗi hình thức.",
                a: "1. <b>Wahlen &amp; Abstimmungen</b> (z. B. Bundestagswahl, kommunaler Bürgerentscheid).<br>2. <b>Mitarbeit in Parteien</b> (z. B. Eintritt in SPD, CDU, Grüne oder deren Jugendorganisationen).<br>3. <b>Bürgerinitiativen (BI) &amp; Demonstrationen</b> (z. B. BI gegen eine geplante Umgehungsstraße, Demonstration nach Art. 8 GG).<br>4. <b>Verbände, Gewerkschaften &amp; NGOs</b> (z. B. Gewerkschaft NGG, DEHOGA, BUND, Amnesty International).",
                aVi: "1. <b>Bầu cử &amp; Bỏ phiếu (Wahlen &amp; Abstimmungen)</b>.<br>2. <b>Tham gia Đảng phái chính trị (Parteien)</b>.<br>3. <b>Sáng kiến công dân &amp; Biểu tình (Bürgerinitiativen &amp; Demonstrationen)</b>.<br>4. <b>Hiệp hội, Công đoàn &amp; Tổ chức phi chính phủ (Verbände, Gewerkschaften &amp; NGOs)</b>."
              },
              {
                q: "Was ist der Unterschied zwischen einer Partei und einer Bürgerinitiative (BI)?",
                qVi: "Sự khác biệt giữa Đảng chính trị (Partei) và Sáng kiến công dân (Bürgerinitiative - BI) là gì?",
                a: "Eine <b>Partei</b> ist auf Dauer angelegt, hat ein umfassendes Parteiprogramm für alle Politikbereiche und tritt bei Wahlen an, um Mandate im Parlament zu gewinnen (Art. 21 GG). Eine <b>Bürgerinitiative</b> ist meist <b>zeitlich begrenzt</b>, konzentriert sich auf <b>ein konkretes Einzelthema</b> (oft lokal) und tritt nicht bei Parlamentswahlen an.",
                aVi: "<b>Đảng chính trị (Partei)</b> hoạt động lâu dài, có cương lĩnh toàn diện cho mọi lĩnh vực và tranh cử vào nghị viện (Điều 21 GG). <b>Sáng kiến công dân (BI)</b> chỉ hoạt động <b>ngắn hạn</b>, tập trung vào <b>một vấn đề cụ thể tại địa phương</b> và không tham gia tranh cử nghị viện."
              },
              {
                q: "Wie unterscheiden sich Menschenrechte und Bürgerrechte im Grundgesetz? Nenne je zwei Beispiele.",
                qVi: "Nhân quyền (Menschenrechte) và Quyền công dân (Bürgerrechte) trong Hiến pháp Đức khác nhau thế nào? Cho 2 ví dụ mỗi loại.",
                a: "<b>Menschenrechte (Jedermannsrechte)</b> gelten für alle Menschen unabhängig von ihrer Staatsangehörigkeit (z. B. Art. 1 GG Menschenwürde, Art. 2 GG Recht auf Leben, Art. 5 GG Meinungsfreiheit). <b>Bürgerrechte (Deutschenrechte)</b> gelten laut Grundgesetz nur für deutsche Staatsangehörige (z. B. Art. 8 GG Versammlungsfreiheit, Art. 12 GG Berufsfreiheit).",
                aVi: "<b>Menschenrechte (Nhân quyền)</b> áp dụng cho tất cả mọi người không phân biệt quốc tịch (VD: Điều 1 Nhân phẩm, Điều 2 Quyền sống, Điều 5 Tự do ngôn luận). <b>Bürgerrechte (Quyền công dân)</b> theo Hiến pháp chỉ áp dụng cho công dân có quốc tịch Đức (VD: Điều 8 Tự do hội họp, Điều 12 Tự do nghề nghiệp)."
              },
              {
                q: "Dürfen Grundrechte in Deutschland eingeschränkt oder abgeschafft werden?",
                qVi: "Các quyền cơ bản ở Đức có thể bị giới hạn hoặc bãi bỏ không?",
                a: "Grundrechte dürfen nur durch oder aufgrund eines Gesetzes eingeschränkt werden, soweit die Rechte anderer geschützt werden müssen. Ihr <b>Wesensgehalt darf in keinem Fall angetastet werden (Art. 19 Abs. 2 GG)</b>. Zudem schützt die <b>Ewigkeitsklausel (Art. 79 Abs. 3 GG)</b> die Menschenwürde (Art. 1 GG) und die Staatsstrukturprinzipien (Art. 20 GG) vor jeder Abschaffung.",
                aVi: "Quyền cơ bản chỉ có thể bị giới hạn dựa trên một đạo luật nhằm bảo vệ quyền của người khác. Tuy nhiên <b>bản chất cốt lõi của quyền cơ bản tuyệt đối không được xâm phạm (Điều 19 khoản 2 GG)</b>, và <b>Điều khoản vĩnh cửu (Điều 79 khoản 3 GG)</b> cấm mọi hành vi xóa bỏ Nhân phẩm (Điều 1) hay chế độ Dân chủ (Điều 20)."
              }
            ]
          }
            ]
          },
          {
            id: "jahr2-partizipation",
            badge: "2. Jahr · 2-GK",
            title: "2. Lehrjahr · Partizipation & Direkte Demokratie",
            items: [
              {
                id: "partizipation",
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 13l3 3 7-7"/></svg>',
                name: "Partizipation & direkte Demokratie",
                desc: "Formen · digital · Volksinitiative/Begehren/Entscheid",
                keyPoints: [
                  "<b>Partizipation</b> = Teilhabe der Bürger am politischen Willensbildungs- und Entscheidungsprozess.",
                  "Formen: Wahlen, Partei, Demonstration, Bürgerinitiative, Petition + digital (Online-Petition, Blog).",
                  "<b>Volksabstimmung</b> (Reihenfolge!): <b>Volksinitiative → Volksbegehren → Volksentscheid</b>.",
                  "In DE <b>kein bundesweiter Volksentscheid</b> über Sachfragen — nur auf Kommunal-/Landesebene.",
                ],
                pages: { folder: "images/scans/2-GK", from: 2, to: 5, prefix: "2-GK" },
                content: `
                  <h2> Partizipation &amp; direkte Demokratie</h2>
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
                    <tr><td><span class="term" data-de="Partei" data-vi="đảng chính trị">Partei</span></td><td><span class="term" data-de="Mitwirkung" data-vi="sự tham gia / đồng hành">Mitwirkung</span> über Parteiarbeit</td></tr>
                    <tr><td><span class="term" data-de="Demonstration" data-vi="biểu tình">Demonstration</span></td><td>
                    <span class="term" data-de="Kundgebung" data-vi="buổi mít tinh / biểu dương">Kundgebung</span>, Marsch,
                    <span class="term" data-de="Mahnwache" data-vi="canh thức / tuần hành im lặng">Mahnwache</span>,
                    <span class="term" data-de="Flashmob" data-vi="flashmob (tụ tập nhanh)">Flashmob</span>… oft via
                    <span class="term" data-de="soziale Medien" data-vi="mạng xã hội">soziale Medien</span></td></tr>
                    <tr><td><span class="term" data-de="Leserbrief" data-vi="thư bạn đọc">Leserbrief</span></td><td>Meinung in
                    <span class="term" data-de="Medien" data-vi="truyền thông">Medien</span></td></tr>
                    <tr><td><span class="term" data-de="Bürgerentscheid" data-vi="trưng cầu dân ý cấp địa phương">Bürgerentscheid</span> /
                    <span class="term" data-de="Volksentscheid" data-vi="trưng cầu dân ý">Volksentscheid</span></td>
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
                    <td><span class="term" data-de="Informationsflut" data-vi="bão/lũ thông tin">Informationsflut</span> verdeckt Wichtiges</td></tr>
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
                  <div class="note"> Wahlen bleiben Kern der
                  <span class="term" data-de="repräsentative Demokratie" data-vi="dân chủ đại diện">repräsentativen Demokratie</span>;
                  direkte Formen ergänzen.</div>
                  <div class="note"> Mehr Vokabeln: Teilhabe · Willensbildung · Volksinitiative · Volksbegehren · Referendum · Populismus</div>
                  <div class="note" style="background:#fef2f2;border-left-color:#dc2626;color:#b91c1c"><b>Häufiger Fehler:</b> In Deutschland gibt es <b>keinen bundesweiten Volksentscheid</b> über Sachfragen wie in der Schweiz — direkte Abstimmungen nur auf <b>Kommunal-</b> und <b>Landesebene</b>. Reihenfolge merken: <b>Volksinitiative → Volksbegehren → Volksentscheid</b>.<br><span style="font-size:.92em"> Ở Đức <b>không có</b> trưng cầu dân ý toàn liên bang như Thụy Sĩ — chỉ ở cấp địa phương/bang. Nhớ thứ tự: sáng kiến → thỉnh nguyện → trưng cầu.</span></div>
              <div class="vi"><b>Tóm tắt Tiếng Việt — Tham gia chính trị & Dân chủ trực tiếp (Partizipation):</b><ul><li><b>4 hình thức tham gia chính (Konventionell & Unkonventionell):</b> Bầu cử (Wahlen), Đảng phái (Parteien), Sáng kiến công dân & Biểu tình (Bürgerinitiativen & Demonstrationen), Hiệp hội & Công đoàn (Verbände & Gewerkschaften).</li><li><b>Dân chủ trực tiếp ở cấp xã/thành phố (Kommunale Ebene):</b> <b>Bürgerbegehren</b> (Đơn kiến nghị thu thập chữ ký của công dân để yêu cầu bỏ phiếu) → nếu đủ chữ ký hợp lệ sẽ dẫn tới <b>Bürgerentscheid</b> (Cuộc bỏ phiếu trực tiếp của công dân có giá trị ràng buộc như nghị quyết của Hội đồng thành phố).</li><li><b>Dân chủ đại diện vs. Dân chủ trực tiếp:</b> Cộng hòa Liên bang Đức theo mô hình <b>Dân chủ đại diện (repräsentative Demokratie)</b> ở cấp Liên bang (rút kinh nghiệm lịch sử từ Cộng hòa Weimar), kết hợp các yếu tố <b>Dân chủ trực tiếp (plebiszitäre Elemente)</b> ở cấp tiểu bang và địa phương.</li></ul></div>
            `,
            "qa": [
              {
                "q": "Was ist der Unterschied zwischen einem Bürgerbegehren und einem Bürgerentscheid auf kommunaler Ebene?",
                "qVi": "Sự khác biệt giữa Kiến nghị công dân (Bürgerbegehren) và Quyết định công dân (Bürgerentscheid) ở cấp địa phương là gì?",
                "a": "Das <b>Bürgerbegehren</b> ist der <b>Antrag mit Unterschriftensammlung</b> der Bürgerinnen und Bürger, um eine Abstimmung über eine kommunale Sachfrage zu erzwingen. Ist das Bürgerbegehren zulässig, folgt der <b>Bürgerentscheid</b>: die <b>verbindliche Abstimmung aller Wahlberechtigten</b>, die einem Beschluss des Gemeinderats gleichsteht.",
                "aVi": "<b>Bürgerbegehren</b> là <b>đơn kiến nghị kèm thu thập chữ ký</b> của công dân nhằm yêu cầu mở cuộc bỏ phiếu về một vấn đề của địa phương. Nếu kiến nghị hợp lệ, bước tiếp theo là <b>Bürgerentscheid</b>: <b>cuộc bỏ phiếu trực tiếp có giá trị ràng buộc pháp lý</b> tương đương nghị quyết của Hội đồng thành phố."
              },
              {
                "q": "Welche Vor- und Nachteile hat die direkte (plebiszitäre) Demokratie gegenüber der repräsentativen Demokratie?",
                "qVi": "Dân chủ trực tiếp (plebiszitäre Demokratie) có ưu điểm và nhược điểm gì so với dân chủ đại diện (repräsentative Demokratie)?",
                "a": "<b>Vorteile:</b> Höhere Bürgernähe, direkte Mitbestimmung bei konkreten Sachfragen, geringere Politikverdrossenheit.<br><b>Nachteile:</b> Gefahr von Populismus und emotionalen Stimmungsentscheidungen, Vereinfachung hochkomplexer Gesetze auf Ja/Nein-Fragen, geringere Beteiligung bildungsferner Schichten.",
                "aVi": "<b>Ưu điểm:</b> Gần dân hơn, người dân được quyết định trực tiếp các vấn đề cụ thể, giảm sự thờ ơ chính trị.<br><b>Nhược điểm:</b> Nguy cơ dân粹 (Populismus) và quyết định theo cảm tính nhất thời, đơn giản hóa các vấn đề phức tạp thành Có/Không."
              }
            ]
              },
              {
                id: "karikatur-methode",
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',
                name: "Karikatur interpretieren",
                desc: "Einleitung · Beschreibung · Deutung · Fazit",
                keyPoints: [
                  "4 Schritte: <b>Einleitung → Beschreibung → Deutung → Fazit</b>.",
                  "Erst <b>beschreiben</b> (was man sieht), dann <b>deuten</b> (was gemeint ist) — nicht vermischen.",
                  "Immer <b>Belege aus dem Bild</b> nennen (Figuren, Aufschrift, Übertreibung, Symbole).",
                  "Fazit = eigene Meinung mit sachlicher Begründung („Meiner Meinung nach …, weil …“).",
                ],
                pages: { folder: "images/scans/2-GK", from: 6, to: 7, prefix: "2-GK" },
                content: `
                  <h2> Arbeitsmethode · Karikatur</h2>
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
                  <div class="note"> Immer
                  <span class="term" data-de="Belege" data-vi="bằng chứng / dẫn chứng">Belege</span> aus dem Bild nennen
                  (<span class="term" data-de="Figuren" data-vi="nhân vật / hình tượng">Figuren</span>, Schrift,
                  <span class="term" data-de="Kontraste" data-vi="sự tương phản">Kontraste</span>) — nicht nur Allgemeinplätze.</div>

                  <h3 class="sub"> Redemittel · Satzbausteine (für jede Karikatur)</h3>
                  <p class="muted" style="font-size:.85em">Fertige Satzanfänge – auf jede Karikatur anwendbar. VN antippen.</p>

                  <p><b>1. Einleitung</b></p>
                  <ul>
                    <li><span class="term" data-de="Die Karikatur „…“ von … aus dem Jahr … thematisiert …" data-vi="Bức biếm họa „…“ của … năm … nói về chủ đề …">Die Karikatur „…“ von … aus dem Jahr … thematisiert …</span></li>
                    <li><span class="term" data-de="Bei der vorliegenden Karikatur handelt es sich um …" data-vi="Bức biếm họa này là …">Bei der vorliegenden Karikatur handelt es sich um …</span></li>
                    <li><span class="term" data-de="Sie wurde … (Quelle) veröffentlicht." data-vi="Nó được đăng tại … (nguồn).">Sie wurde … (Quelle) veröffentlicht.</span></li>
                  </ul>

                  <p><b>2. Beschreibung</b> <span class="muted">(nur beschreiben, noch nicht deuten)</span></p>
                  <ul>
                    <li><span class="term" data-de="Im Vordergrund / im Hintergrund ist … zu sehen." data-vi="Ở tiền cảnh / hậu cảnh thấy …">Im Vordergrund / im Hintergrund ist … zu sehen.</span></li>
                    <li><span class="term" data-de="In der Mitte / auf der linken Seite befindet sich …" data-vi="Ở giữa / bên trái có …">In der Mitte / auf der linken Seite befindet sich …</span></li>
                    <li><span class="term" data-de="Die Figur trägt die Aufschrift „…“." data-vi="Nhân vật mang dòng chữ „…“.">Die Figur trägt die Aufschrift „…“.</span></li>
                    <li><span class="term" data-de="Man erkennt … / Dargestellt ist …" data-vi="Nhận ra … / Được vẽ là …">Man erkennt … / Dargestellt ist …</span></li>
                  </ul>

                  <p><b>3. Deutung / Interpretation</b></p>
                  <ul>
                    <li><span class="term" data-de="Die Figur / das Symbol steht für … / symbolisiert …" data-vi="Nhân vật / biểu tượng tượng trưng cho …">Die Figur / das Symbol steht für … / symbolisiert …</span></li>
                    <li><span class="term" data-de="Der Karikaturist möchte ausdrücken, dass …" data-vi="Họa sĩ biếm họa muốn diễn đạt rằng …">Der Karikaturist möchte ausdrücken, dass …</span></li>
                    <li><span class="term" data-de="Damit kritisiert er … / Die Übertreibung verdeutlicht …" data-vi="Qua đó ông phê phán … / Sự phóng đại làm rõ …">Damit kritisiert er … / Die Übertreibung verdeutlicht …</span></li>
                  </ul>

                  <p><b>4. Fazit / Stellungnahme</b></p>
                  <ul>
                    <li><span class="term" data-de="Meiner Meinung nach …, weil …" data-vi="Theo ý tôi …, vì …">Meiner Meinung nach …, weil …</span></li>
                    <li><span class="term" data-de="Ich stimme der Aussage (nicht) zu, weil …" data-vi="Tôi (không) đồng ý với luận điểm, vì …">Ich stimme der Aussage (nicht) zu, weil …</span></li>
                    <li><span class="term" data-de="Abschließend lässt sich sagen, dass …" data-vi="Cuối cùng có thể nói rằng …">Abschließend lässt sich sagen, dass …</span></li>
                  </ul>
              <div class="vi"><b>Tóm tắt Tiếng Việt — Phương pháp 3 bước phân tích tranh biếm họa chính trị (Karikaturanalyse):</b><ol><li><b>Bước 1 – Beschreibung (Mô tả khách quan):</b> Nêu thông tin cơ bản (tác giả, ngày/năm, tiêu đề) và mô tả chi tiết những gì nhìn thấy ở tiền cảnh (Vordergrund), trung cảnh (Mittelgrund), hậu cảnh (Hintergrund), nhân vật, biểu cảm, chữ viết (Sprechblase/Unterschrift) — <b>chưa giải thích ý nghĩa</b>.</li><li><b>Bước 2 – Deutung / Erklärung (Giải mã ý nghĩa & bối cảnh chính trị):</b> Giải thích các biểu tượng (Symbole), phép phóng đại/mỉa mai (Übertreibung/Ironie), liên hệ với sự kiện chính trị thực tế và chỉ ra thông điệp phê phán của họa sĩ (Aussageabsicht des Karikaturisten).</li><li><b>Bước 3 – Bewertung / Stellungnahme (Đánh giá & nêu quan điểm cá nhân):</b> Nhận xét xem bức tranh có thuyết phục hay phiến diện không và trình bày lập luận cá nhân có dẫn chứng.</li></ol></div>
            `,
            "qa": [
              {
                "q": "Aus welchen drei Schritten besteht eine vollständige Karikaturanalyse im Fach Gemeinschaftskunde?",
                "qVi": "Một bài phân tích tranh biếm họa (Karikaturanalyse) hoàn chỉnh trong môn GK gồm 3 bước nào?",
                "a": "1. <b>Beschreibung (Deskription):</b> Sachliche Bestandsaufnahme aller Bildelemente (Vorder-/Hintergrund, Personen, Text) im Präsens ohne Deutung.<br>2. <b>Deutung (Interpretation):</b> Entschlüsselung der Symbole, Darstellungsmittel (Ironie, Übertreibung) und des politischen Hintergrunds sowie Formulierung der Kernaussage.<br>3. <b>Bewertung (Beurteilung):</b> Kritische Stellungnahme zur Aussage des Zeichners mit eigener Begründung.",
                "aVi": "1. <b>Mô tả (Beschreibung):</b> Liệt kê khách quan mọi chi tiết hình ảnh (tiền cảnh, hậu cảnh, nhân vật, chữ viết) ở thì Präsens mà chưa suy diễn.<br>2. <b>Giải mã (Deutung):</b> Giải thích các biểu tượng, thủ pháp châm biếm/phóng đại, bối cảnh chính trị và thông điệp cốt lõi của tác giả.<br>3. <b>Đánh giá (Bewertung):</b> Bày tỏ quan điểm phản biện cá nhân kèm lập luận."
              },
              {
                "q": "Welche sprachlichen Wendungen (Redemittel) passen für Schritt 1 (Beschreibung) und Schritt 2 (Deutung)?",
                "qVi": "Những mẫu câu (Redemittel) nào phù hợp cho Bước 1 (Mô tả) và Bước 2 (Giải mã)?",
                "a": "<ul><li><b>Schritt 1:</b> „Die Karikatur von … aus dem Jahr … trägt den Titel …“, „Im Vordergrund / Im Mittelpunkt sieht man …“</li><li><b>Schritt 2:</b> „Das Symbol … steht für …“, „Damit kritisiert der Karikaturist den Missstand, dass …“</li></ul>",
                "aVi": "<ul><li><b>Bước 1:</b> „Bức biếm họa của … năm … có tiêu đề …“, „Ở tiền cảnh / Ở trung tâm ta thấy …“</li><li><b>Bước 2:</b> „Biểu tượng … đại diện cho …“, „Qua đó họa sĩ phê phán thực trạng rằng …“</li></ul>"
              }
            ]
              }
            ]
          },
          {
            id: "staat-gg",
            badge: "2. Jahr · GG",
            title: "2. Lehrjahr · Demokratie nach dem Grundgesetz",
            items: [
              {
                id: "gewaltenteilung",
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v16"/><path d="M9 20h6"/><path d="M4 9h16"/><path d="M4 9l-2.5 4"/><path d="M20 9l2.5 4"/><path d="M1.5 13h5"/><path d="M17.5 13h5"/></svg>',
                name: "Gewaltenteilung & Institutionen",
                desc: "WRV vs GG · horizontal · Kontrolle",
                keyPoints: [
                  "3 Gewalten: <b>Legislative</b> (Gesetze), <b>Exekutive</b> (ausführen), <b>Judikative</b> (Recht sprechen).",
                  "Ziel: <b>Kontrolle statt Machtkonzentration</b> (Lehre aus dem NS).",
                  "<b>Gewaltenverschränkung</b> = Gewalten greifen ineinander (nicht völlig getrennt).",
                  "4 Beispiele: Bundestag→Kanzler · Bundespräsident→16 Richter · Landesregierungen→Bundesrat · Bundestag+Bundesrat→BVerfG (je zur Hälfte).",
                ],
                pages: { folder: "images/scans/2-GK", from: 8, to: 10, prefix: "2-GK" },
                content: `
                  <h2> Gewaltenteilung &amp; Gewaltenverschränkung</h2>

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
                  <p><span class="term" data-de="Gewaltenverschränkung" data-vi="sự đan xen quyền lực">Gewaltenverschränkung</span>:
                  die Gewalten sind nicht völlig getrennt, sondern
                  <b>greifen ineinander</b> und kontrollieren sich gegenseitig.</p>

                  <h3 class="sub">2. Beispiele der Gewaltenverschränkung</h3>
                  <ol class="verschr">
                    <li>
                      <b><span class="term" data-de="Bundespräsident" data-vi="Tổng thống Liên bang">Bundespräsident</span> → <span class="term" data-de="Judikative" data-vi="tư pháp">Judikative</span></b><br>
                      Der Bundespräsident <span class="term" data-de="ernennt" data-vi="bổ nhiệm">ernennt</span> nach der Wahl die 16 <span class="term" data-de="Richterinnen und Richter" data-vi="các thẩm phán (nữ và nam)">Richterinnen und Richter</span> des <span class="term" data-de="Bundesverfassungsgericht" data-vi="Tòa án Hiến pháp Liên bang">Bundesverfassungsgerichts</span>.
                    </li>
                    <li>
                      <b><span class="term" data-de="Bundestag" data-vi="Quốc hội Liên bang Đức">Bundestag</span> → <span class="term" data-de="Bundeskanzler" data-vi="Thủ tướng Liên bang">Bundeskanzler</span></b><br>
                      Der Bundestag (<span class="term" data-de="Legislative" data-vi="lập pháp">Legislative</span>) wählt den Bundeskanzler (<span class="term" data-de="Exekutive" data-vi="hành pháp">Exekutive</span>).<br>
                      Der Bundestag kann den Bundeskanzler durch ein <span class="term" data-de="konstruktives Misstrauensvotum" data-vi="bỏ phiếu bất tín nhiệm xây dựng">konstruktives Misstrauensvotum</span> auch wieder <span class="term" data-de="abwählen" data-vi="bãi nhiệm / phế truất bằng bầu cử">abwählen</span>.
                    </li>
                    <li>
                      <b><span class="term" data-de="Landesregierungen" data-vi="chính phủ các bang">Landesregierungen</span> → <span class="term" data-de="Bundesrat" data-vi="Hội đồng Liên bang">Bundesrat</span></b><br>
                      Die Landesregierungen (Exekutive) <span class="term" data-de="entsenden" data-vi="cử / phái đi">entsenden</span> ihre <span class="term" data-de="Vertreter" data-vi="đại diện">Vertreter</span> in den Bundesrat (Legislative).
                    </li>
                    <li>
                      <b>Bundestag + Bundesrat → Bundesverfassungsgericht</b><br>
                      Bundestag und Bundesrat (Legislative) <span class="term" data-de="wählen je zur Hälfte" data-vi="mỗi bên bầu một nửa">wählen je zur Hälfte</span> die 16 Richterinnen und Richter des Bundesverfassungsgerichts (Judikative).
                    </li>
                  </ol>

                  <h3 class="sub">3. Horizontal + vertikal</h3>
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

                  <h3 class="sub">4. Weimarer Reichsverfassung vs. Grundgesetz (Überblick)</h3>
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
                  <div class="note"> Merksatz: Gewaltenteilung sichert Demokratie — Kontrolle statt Machtkonzentration.</div>
              <div class="vi"><b>Tóm tắt Tiếng Việt — Tam quyền phân lập & Các cơ quan hiến định (Gewaltenteilung):</b><ul><li><b>3 nhánh quyền lực ngang hàng (Horizontale Gewaltenteilung):</b><ul><li><b>Legislative (Lập pháp – Làm luật):</b> <b>Bundestag</b> (Quốc hội Liên bang do dân bầu trực tiếp) & <b>Bundesrat</b> (Hội đồng Liên bang đại diện cho chính phủ 16 tiểu bang).</li><li><b>Exekutive (Hành pháp – Thi hành luật):</b> <b>Bundesregierung</b> (Chính phủ Liên bang gồm <b>Bundeskanzler/in</b> + <b>Bundesminister</b>), <b>Bundespräsident</b> (Tổng thống Liên bang – nguyên thủ quốc gia), Cảnh sát & Hành chính công.</li><li><b>Judikative (Tư pháp – Xét xử & Bảo hiến):</b> <b>Bundesverfassungsgericht (BVerfG)</b> tại Karlsruhe và hệ thống Tòa án độc lập.</li></ul></li><li><b>Phân quyền theo chiều dọc (Vertikale Gewaltenteilung / Föderalismus):</b> Chia sẻ quyền lực giữa Liên bang (Bund), 16 Tiểu bang (Länder) và Địa phương (Kommunen).</li></ul></div>
            `,
            "qa": [
              {
                "q": "Welche drei Staatsgewalten bilden die horizontale Gewaltenteilung und welche Verfassungsorgane gehören jeweils dazu?",
                "qVi": "Ba nhánh quyền lực nhà nước nào tạo nên sự phân quyền theo chiều ngang (horizontale Gewaltenteilung) và gồm những cơ quan hiến định nào?",
                "a": "1. <b>Legislative (gesetzgebende Gewalt):</b> Bundestag und Bundesrat.<br>2. <b>Exekutive (ausführende / vollziehende Gewalt):</b> Bundesregierung (Bundeskanzler und Bundesminister), Bundespräsident sowie Verwaltung und Polizei.<br>3. <b>Judikative (rechtsprechende Gewalt):</b> Bundesverfassungsgericht und unabhängige Gerichte.",
                "aVi": "1. <b>Legislative (Quyền lập pháp – làm luật):</b> Hạ viện Liên bang (Bundestag) và Thượng viện/Hội đồng Liên bang (Bundesrat).<br>2. <b>Exekutive (Quyền hành pháp – thi hành luật):</b> Chính phủ Liên bang (Thủ tướng & các Bộ trưởng), Tổng thống Liên bang, cơ quan hành chính và cảnh sát.<br>3. <b>Judikative (Quyền tư pháp – xét xử):</b> Tòa án Hiến pháp Liên bang và các tòa án độc lập."
              },
              {
                "q": "Warum ist die Gewaltenteilung ein unverzichtbares Merkmal des demokratischen Rechtsstaates?",
                "qVi": "Tại sao tam quyền phân lập là đặc trưng không thể thiếu của nhà nước pháp quyền dân chủ?",
                "a": "Sie verhindert den <b>Machtmissbrauch und eine Diktatur</b>, indem die staatliche Macht auf verschiedene Organe verteilt wird, die sich gegenseitig <b>kontrollieren und begrenzen (Gewaltenverschränkung / Checks and Balances)</b>, und sichert so die Freiheit und Grundrechte der Bürger.",
                "aVi": "Nó ngăn chặn <b>sự lạm quyền và chế độ độc tài</b> bằng cách phân chia quyền lực nhà nước cho nhiều cơ quan khác nhau để <b>kiểm soát và kiềm chế lẫn nhau (Checks and Balances)</b>, qua đó bảo vệ tự do và quyền cơ bản của công dân."
              }
            ]
              },
              {
                id: "vertrauensfrage-misstrauen",
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>',
                name: "Vertrauensfrage & Misstrauensvotum",
                desc: "Art. 67 / 68 GG · Ablauf",
                pages: { folder: "images/scans/2-GK", from: 12, to: 13, prefix: "2-GK" },
                content: `
                  <h2> Vertrauensfrage &amp; konstruktives Misstrauensvotum</h2>

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
                  <div class="note"> Laut Material: Vertrauensfrage oft „weniger
                  <span class="term" data-de="nachteilig" data-vi="bất lợi">nachteilig</span>“ für die
                  <span class="term" data-de="Partei" data-vi="đảng chính trị">Partei</span>, weil Fokus auf dem Kanzler liegt — nicht automatisch auf der ganzen Partei.</div>

                  <h3 class="sub">4. Beispiele aus der Geschichte</h3>
                  <ul>
                    <li><b>Art. 67 (Misstrauensvotum):</b> 1982 wurde <span class="term" data-de="Helmut Kohl" data-vi="Helmut Kohl (Thủ tướng CDU)">Helmut Kohl</span> (CDU) durch ein konstruktives Misstrauensvotum zum Kanzler gewählt und löste <span class="term" data-de="Helmut Schmidt" data-vi="Helmut Schmidt (Thủ tướng SPD)">Helmut Schmidt</span> (SPD) ab — bisher das <b>einzige erfolgreiche</b>. <span class="term" data-de="1972" data-vi="năm 1972">1972</span> scheiterte ein Versuch gegen <span class="term" data-de="Willy Brandt" data-vi="Willy Brandt (Thủ tướng SPD)">Willy Brandt</span>.</li>
                    <li><b>Art. 68 (Vertrauensfrage):</b> 2005 stellte <span class="term" data-de="Gerhard Schröder" data-vi="Gerhard Schröder (Thủ tướng SPD)">Gerhard Schröder</span> die Vertrauensfrage und verlor sie <b>absichtlich</b> → <span class="term" data-de="Neuwahlen" data-vi="bầu cử lại / bầu cử sớm">Neuwahlen</span>. 2024 tat <span class="term" data-de="Olaf Scholz" data-vi="Olaf Scholz (Thủ tướng SPD)">Olaf Scholz</span> dasselbe → Neuwahlen 2025.</li>
                  </ul>
                  <div class="note" style="background:#fef2f2;border-left-color:#dc2626;color:#b91c1c"><b>Nicht verwechseln:</b> Die <b>Vertrauensfrage</b> stellt der <b>Kanzler selbst</b> (Art. 68). Das <b>Misstrauensvotum</b> geht vom <b>Parlament/der Opposition</b> aus (Art. 67).<br><span style="font-size:.92em"> Vertrauensfrage do <b>chính Thủ tướng</b> đặt ra; Misstrauensvotum do <b>Quốc hội / phe đối lập</b> khởi xướng.</span></div>
              <div class="vi"><b>Tóm tắt Tiếng Việt — Bỏ phiếu bất tín nhiệm mang tính xây dựng (Art. 67 GG) vs. Bỏ phiếu tín nhiệm (Art. 68 GG):</b><ul><li><b>Konstruktives Misstrauensvotum (Điều 67 GG):</b> Khởi phát từ <b>Bundestag</b> nhằm lật đổ Thủ tướng đương nhiệm. Quốc hội chỉ có thể phế truất Thủ tướng nếu bầu được <b>một Thủ tướng kế nhiệm mới với đa số tuyệt đối (> 50% tổng số nghị sĩ)</b> → Tránh khủng hoảng chính phủ không người đứng đầu như thời Weimar (Ví dụ lịch sử: 1982 Helmut Kohl thay Helmut Schmidt).</li><li><b>Vertrauensfrage (Điều 68 GG):</b> Khởi phát từ chính <b>Bundeskanzler</b> đề nghị Quốc hội bỏ phiếu tín nhiệm mình (thường gắn với một dự luật quan trọng hoặc để mở đường giải tán Quốc hội bầu cử sớm). Nếu không đạt đa số tuyệt đối (> 50%), Tổng thống Liên bang có thể giải tán Quốc hội trong vòng 21 ngày theo đề nghị của Thủ tướng (Ví dụ: 1982, 2005 Gerhard Schröder, 2024 Olaf Scholz).</li></ul></div>
            `,
            "qa": [
              {
                "q": "Worin besteht der Unterschied zwischen dem konstruktiven Misstrauensvotum (Art. 67 GG) und der Vertrauensfrage (Art. 68 GG)?",
                "qVi": "Sự khác biệt giữa Bỏ phiếu bất tín nhiệm mang tính xây dựng (Điều 67 GG) và Bỏ phiếu tín nhiệm (Điều 68 GG) là gì?",
                "a": "<ul><li>Beim <b>konstruktiven Misstrauensvotum (Art. 67 GG)</b> geht die Initiative vom <b>Bundestag</b> aus: Er kann den Kanzler nur stürzen, indem er gleichzeitig mit der Mehrheit seiner Mitglieder (Kanzlermehrheit) einen <b>neuen Nachfolger wählt</b>.</li><li>Bei der <b>Vertrauensfrage (Art. 68 GG)</b> geht die Initiative vom <b>Bundeskanzler selbst</b> aus: Er beantragt im Bundestag, ihm das Vertrauen auszusprechen. Verfehlt er die Kanzlermehrheit, kann der Bundespräsident auf Vorschlag des Kanzlers binnen 21 Tagen den Bundestag auflösen.</li></ul>",
                "aVi": "<ul><li><b>Konstruktives Misstrauensvotum (Điều 67 GG)</b> do <b>Quốc hội (Bundestag)</b> khởi xướng: Quốc hội chỉ có thể phế truất Thủ tướng khi đồng thời <b>bầu được một Thủ tướng mới</b> với đa số tuyệt đối (> 50% tổng số nghị sĩ).</li><li><b>Vertrauensfrage (Điều 68 GG)</b> do chính <b>Thủ tướng (Bundeskanzler)</b> khởi xướng: Thủ tướng yêu cầu Quốc hội bỏ phiếu tín nhiệm mình. Nếu không đạt trên 50%, Tổng thống Liên bang có thể giải tán Quốc hội trong 21 ngày để tổ chức bầu cử sớm.</li></ul>"
              },
              {
                "q": "Warum haben die Mütter und Väter des Grundgesetzes das Misstrauensvotum „konstruktiv“ gestaltet?",
                "qVi": "Tại sao những người soạn thảo Hiến pháp Đức lại thiết kế cơ chế bất tín nhiệm mang tính „xây dựng“ (konstruktiv)?",
                "a": "Als Lehre aus dem Scheitern der <b>Weimarer Republik</b>: Damals konnten extremistische Parteien (NSDAP und KPD) gemeinsam Regierungen durch ein einfaches („destruktives“) Misstrauensvotum stürzen, ohne sich auf einen neuen Kanzler einigen zu können. Art. 67 GG verhindert ein solches Machtvakuum.",
                "aVi": "Đó là bài học xương máu từ sự sụp đổ của <b>Cộng hòa Weimar</b>: Thời đó các đảng cực đoan có thể hợp sức bỏ phiếu lật đổ Chính phủ nhưng lại không bầu được người thay thế, gây tê liệt đất nước. Điều 67 GG ngăn chặn khoảng trống quyền lực này."
              }
            ]
              },
              {
                id: "medien-vierte-gewalt",
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
                name: "Medien als vierte Gewalt",
                desc: "Informieren · kontrollieren",
                pages: { folder: "images/scans/2-GK", from: 11, to: 11, prefix: "2-GK" },
                content: `
                  <h2> Medien als „vierte Gewalt“</h2>
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
                  <div class="note"> Medien ersetzen keine Staatsgewalt — sie üben öffentliche Kontrolle und Information aus
                  (<span class="term" data-de="Pressefreiheit" data-vi="tự do báo chí">Pressefreiheit</span>
                  <span class="term" data-de="Art. 5 GG" data-vi="Điều 5 Luật cơ bản">Art. 5 GG</span>).</div>
              <div class="vi"><b>Tóm tắt Tiếng Việt — Truyền thông với vai trò „Quyền lực thứ tư“ (Medien als 4. Gewalt):</b><ul><li><b>4 Chức năng chính của báo chí – truyền thông trong nền dân chủ (Art. 5 GG):</b> (1) <b>Information</b> (Cung cấp thông tin khách quan, đa chiều); (2) <b>Meinungsbildung</b> (Giúp công dân hình thành quan điểm chính trị); (3) <b>Kritik & Kontrolle („Wachhund“ / 4. Gewalt)</b> (Giám sát, phanh phui bê bối tham nhũng/lạm quyền của nhà nước); (4) <b>Artikulation</b> (Diễn đàn phản ánh tiếng nói của người dân).</li><li><b>Nguy cơ & Thách thức hiện đại:</b> <b>Fake News / Desinformation</b>, <b>Filterblasen & Echokammern</b> (Thuật toán mạng xã hội chỉ hiển thị nội dung đồng quan điểm gây phân cực xã hội), và sự lệ thuộc kinh tế/chính trị của truyền thông.</li></ul></div>
            `,
            "qa": [
              {
                "q": "Welche vier Hauptfunktionen erfüllen freie Medien („Vierte Gewalt“) in einer Demokratie?",
                "qVi": "Bốn chức năng chính của truyền thông tự do („Quyền lực thứ tư“) trong nền dân chủ là gì?",
                "a": "1. <b>Informationsfunktion:</b> Umfassende, sachliche Unterrichtung der Bürger.<br>2. <b>Meinungsbildungsfunktion:</b> Bereitstellung vielfältiger Kommentare und Perspektiven.<br>3. <b>Kritik- und Kontrollfunktion:</b> Aufdecken von Skandalen und Machtmissbrauch in Politik und Wirtschaft.<br>4. <b>Artikulationsfunktion:</b> Sprachrohr für Anliegen der Bürgerinnen und Bürger.",
                "aVi": "1. <b>Chức năng thông tin (Information):</b> Cung cấp thông tin đầy đủ, khách quan.<br>2. <b>Chức năng định hình quan điểm (Meinungsbildung):</b> Đưa ra nhiều góc nhìn đa chiều.<br>3. <b>Chức năng phê bình và giám sát (Kritik & Kontrolle):</b> Phanh phui bê bối và sự lạm quyền.<br>4. <b>Chức năng biểu đạt (Artikulation):</b> Diễn đàn phản ánh tiếng nói của công dân."
              },
              {
                "q": "Welche Gefahren entstehen durch Filterblasen (Filter Bubbles), Echokammern und Fake News in sozialen Medien?",
                "qVi": "Những nguy cơ nào phát sinh từ bong bóng bộ lọc (Filterblasen), buồng vang thông tin (Echokammern) và tin giả (Fake News) trên mạng xã hội?",
                "a": "Algorithmen zeigen Nutzern bevorzugt Inhalte, die ihre bestehende Sichtweise bestätigen (<b>Filterblase / Echokammer</b>). Dadurch gehen der offene demokratische Diskurs und die Kompromissfähigkeit verloren; <b>Desinformation (Fake News)</b> manipuliert Wähler und fördert gesellschaftliche Polarisierung.",
                "aVi": "Thuật toán ưu tiên hiển thị nội dung củng cố định kiến sẵn có của người dùng (<b>Filterblase / Echokammer</b>), làm mất đi sự tranh luận đa chiều và khả năng thỏa hiệp dân chủ; đồng thời <b>tin giả (Fake News)</b> thao túng cử tri và gây chia rẽ, cực đoan hóa xã hội."
              }
            ]
              },
              {
                id: "demokratie-gg",
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 17V5a2 2 0 0 0-2-2H4"/><path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3"/></svg>',
                name: "Demokratie nach dem GG",
                desc: "Volkssouveränität · repräsentativ · Mehrheit · Menschenbild",
                keyPoints: [
                  "<b>Volkssouveränität</b>: Das Volk ist Inhaber der Staatsgewalt (Art. 20 Abs. 2 GG).",
                  "<b>Repräsentative Demokratie</b>: gewählte Abgeordnete üben die Staatsgewalt aus (Art. 38 GG).",
                  "<b>Mehrheitsprinzip</b>: die Mehrheit entscheidet, aber Minderheiten- und Grundrechte bleiben geschützt.",
                  "DE = vor allem repräsentativ; direkte Elemente ergänzen nur.",
                ],
                pages: { folder: "images/scans/2-GK", from: 14, to: 15, prefix: "2-GK" },
                content: `
                  <h2> Demokratie nach dem Grundgesetz</h2>

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
                    <li><span class="term" data-de="Menschenwürde" data-vi="nhân phẩm con người">Menschenwürde</span> ist
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
                  <span class="term" data-de="Grundgesetz" data-vi="Luật cơ bản / Hiến pháp CHLB Đức">Grundgesetz</span></p>
                  <div class="formula">Volk besitzt Macht → wählt Vertreter → Mehrheit entscheidet · Würde schützt jeden Menschen</div>
                  <div class="note"> DE = vor allem repräsentative Demokratie; direkte Elemente ergänzen (v. a. Länder/Kommunen).</div>
              <div class="vi"><b>Tóm tắt Tiếng Việt — Các nguyên tắc hiến định tại Điều 20 Hiến pháp Đức (Art. 20 GG):</b><ul><li><b>1. Demokratie (Nhà nước dân chủ):</b> Mọi quyền lực nhà nước xuất phát từ nhân dân (Volkssouveränität) thông qua bầu cử tự do, định kỳ và sự cạnh tranh đa đảng.</li><li><b>2. Rechtsstaat (Nhà nước pháp quyền):</b> Mọi cơ quan nhà nước đều bị ràng buộc bởi Hiến pháp và pháp luật; tam quyền phân lập; tòa án độc lập; bảo vệ quyền cơ bản.</li><li><b>3. Sozialstaat (Nhà nước phúc lợi xã hội):</b> Nhà nước bảo đảm mức sống tối thiểu xứng đáng với nhân phẩm (Existenzminimum, Bürgergeld), an sinh xã hội (5 trụ cột bảo hiểm) và công bằng xã hội.</li><li><b>4. Bundesstaat / Föderalismus (Nhà nước Liên bang):</b> Gồm Liên bang và 16 Tiểu bang có hiến pháp, nghị viện và chính phủ riêng.</li><li><b>5. Republik (Cộng hòa):</b> Nguyên thủ quốc gia là Tổng thống Liên bang được bầu theo nhiệm kỳ (không có vua/nữ hoàng cha truyền con nối).</li></ul></div>
            `,
            "qa": [
              {
                "q": "Welche Staatsstrukturprinzipien (Verfassungsprinzipien) sind in Artikel 20 des Grundgesetzes verankert?",
                "qVi": "Những nguyên tắc cấu trúc nhà nước nào được hiến định tại Điều 20 Hiến pháp Đức (Art. 20 GG)?",
                "a": "1. <b>Demokratieprinzip</b> (Volkssouveränität – alle Staatsgewalt geht vom Volke aus).<br>2. <b>Rechtsstaatsprinzip</b> (Gewaltenteilung, Bindung an Recht und Gesetz).<br>3. <b>Sozialstaatsprinzip</b> (soziale Sicherheit und Gerechtigkeit).<br>4. <b>Bundesstaatsprinzip / Föderalismus</b> (Gliederung in Bund und 16 Länder).<br>5. <b>Republikprinzip</b> (gewähltes Staatsoberhaupt auf Zeit statt Monarchie).",
                "aVi": "1. <b>Nguyên tắc Dân chủ (Demokratie)</b>: Chủ quyền thuộc về nhân dân.<br>2. <b>Nguyên tắc Nhà nước pháp quyền (Rechtsstaat)</b>: Tam quyền phân lập, thượng tôn pháp luật.<br>3. <b>Nguyên tắc Nhà nước phúc lợi xã hội (Sozialstaat)</b>: Đảm bảo an sinh và công bằng xã hội.<br>4. <b>Nguyên tắc Nhà nước Liên bang (Bundesstaat / Föderalismus)</b>: Chia thành Liên bang và 16 Tiểu bang.<br>5. <b>Nguyên tắc Cộng hòa (Republik)</b>: Nguyên thủ quốc gia do bầu cử theo nhiệm kỳ, không có quân chủ."
              },
              {
                "q": "Was besagt das Widerstandsrecht nach Art. 20 Abs. 4 GG?",
                "qVi": "Quyền kháng cự theo Điều 20 khoản 4 Hiến pháp Đức (Art. 20 Abs. 4 GG) quy định điều gì?",
                "a": "Gegen jeden, der es unternimmt, die freiheitlich-demokratische Grundordnung (Art. 20 Abs. 1–3 GG) zu beseitigen, haben alle Deutschen das <b>Recht zum Widerstand, wenn andere Abhilfe (z. B. durch Polizei oder Gerichte) nicht möglich ist</b> (Ultima Ratio).",
                "aVi": "Chống lại bất kỳ kẻ nào tìm cách lật đổ trật tự cơ bản dân chủ tự do (Điều 20 khoản 1–3 GG), mọi công dân Đức đều có <b>quyền kháng cự nếu không còn biện pháp cứu vãn hợp pháp nào khác (như thông qua cảnh sát hay tòa án)</b>."
              }
            ]
              },
              {
                id: "grundrechte",
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
                name: "Grundrechte",
                desc: "Menschen- vs Bürgerrechte · Geltung für alle",
                keyPoints: [
                  "<b>Menschenrechte</b> = für alle („Jeder…“, „Alle Menschen…“, „Niemand…“).",
                  "<b>Bürgerrechte</b> = nur für Deutsche („Alle Deutschen…“, z. B. Art. 8, 11, 12).",
                  "Grundrechte gelten <b>auch für Demokratie-Gegner</b> — nicht an Verhalten geknüpft.",
                  "Art. 1: die <b>Würde des Menschen ist unantastbar</b> (Fundament, bindet alle Staatsgewalt).",
                ],
                pages: { folder: "images/scans/2-GK", from: 16, to: 18, prefix: "2-GK" },
                content: `
                  <h2> Grundrechte</h2>

                  <h3 class="sub">1. Menschenrechte vs. Bürgerrechte</h3>
                  <table>
                    <tr><th>Typ</th><th>Formulierung</th><th>Für wen?</th></tr>
                    <tr><td><span class="term" data-de="Menschenrechte" data-vi="nhân quyền">Menschenrechte</span> (M)</td><td>„Jeder…“, „Niemand…“, „Alle Menschen…“</td><td>alle Menschen</td></tr>
                    <tr><td><span class="term" data-de="Bürgerrechte" data-vi="quyền công dân">Bürgerrechte</span> (B)</td><td>„Alle Deutschen…“</td><td>deutsche Staatsangehörige</td></tr>
                  </table>

                  <h3 class="sub">2. Wichtige Artikel (Beispiele)</h3>
                  <table>
                    <tr><th>Art.</th><th>Inhalt</th></tr>
                    <tr><td>1</td><td><span class="term" data-de="Menschenwürde" data-vi="nhân phẩm con người">Menschenwürde</span>
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
                  <div class="note"> Art. 1 = Fundament. Grundrechte binden
                  <span class="term" data-de="Gesetzgebung" data-vi="lập pháp">Gesetzgebung</span>,
                  <span class="term" data-de="vollziehende Gewalt" data-vi="quyền lực hành pháp">vollziehende Gewalt</span> und
                  <span class="term" data-de="Rechtsprechung" data-vi="tư pháp / xét xử">Rechtsprechung</span>
                  (<span class="term" data-de="Art. 1 Abs. 3 GG" data-vi="Điều 1 khoản 3 Luật cơ bản">Art. 1 Abs. 3 GG</span>).</div>

                  <div class="note" style="background:#fef2f2;border-left-color:#dc2626;color:#b91c1c"><b>Nicht verwechseln:</b> Am <b>Wortlaut</b> erkennen — <b>Menschenrechte</b> stehen für <b>alle</b> („Jeder…“, „Niemand…“, „Alle Menschen…“), <b>Bürgerrechte</b> nur für Deutsche („Alle Deutschen…“, z. B. Art. 8, 11, 12). Grundrechte gelten <b>auch für Menschen, die die Demokratie ablehnen</b> — sie sind nicht an „richtiges“ Verhalten geknüpft.<br><span style="font-size:.92em"> Nhìn <b>cách diễn đạt</b>: „Jeder/Alle Menschen“ = nhân quyền (cho mọi người); „Alle Deutschen“ = quyền công dân (chỉ người Đức). Quyền cơ bản áp dụng cho <b>cả</b> người phản đối dân chủ.</span></div>
              <div class="vi"><b>Tóm tắt Tiếng Việt — Hệ thống Quyền cơ bản chuyên sâu (Art. 1–19 GG):</b><ul><li><b>Art. 1 Abs. 1 GG:</b> <i>„Die Würde des Menschen ist unantastbar.“</i> — Nhân phẩm con người là bất khả xâm phạm; con người không bao giờ bị biến thành công cụ/đối tượng thuần túy của nhà nước.</li><li><b>Xung đột giữa các quyền cơ bản (Grundrechtskollision):</b> Khi quyền của người này va chạm với quyền của người khác (VD: Tự do báo chí Art. 5 vs. Quyền riêng tư Art. 2; Tự do biểu tình Art. 8 vs. Bảo vệ sức khỏe cộng đồng Art. 2), Tòa án Hiến pháp áp dụng nguyên tắc <b>Verhältnismäßigkeit / Praktische Konkordanz</b> (Cân bằng hợp lý để cả hai quyền đều phát huy hiệu lực tối đa).</li></ul></div>
            `,
            "qa": [
              {
                "q": "Was bedeutet der Satz „Die Würde des Menschen ist unantastbar“ (Art. 1 Abs. 1 GG) konkret?",
                "qVi": "Câu „Nhân phẩm của con người là bất khả xâm phạm“ (Điều 1 khoản 1 GG) cụ thể có ý nghĩa gì?",
                "a": "Jeder Mensch besitzt allein kraft seines Menschseins einen <b>unverlierbaren Eigenwert</b>. Der Staat muss die Menschenwürde achten (z. B. Verbot von Folter, Todesstrafe und erniedrigender Behandlung) und schützen (z. B. Sicherung des menschenwürdigen Existenzminimums).",
                "aVi": "Mỗi con người ngay từ khi sinh ra đã có <b>giá trị tự thân không thể tước đoạt</b>. Nhà nước có nghĩa vụ tôn trọng (cấm tra tấn, cấm án tử hình, cấm đối xử hạ nhục) và bảo vệ nhân phẩm (đảm bảo mức sống tối thiểu xứng đáng với con người)."
              },
              {
                "q": "Wie wird ein Konflikt zwischen zwei Grundrechten (Grundrechtskollision) im Rechtsstaat gelöst?",
                "qVi": "Xung đột giữa hai quyền cơ bản (Grundrechtskollision) được giải quyết như thế nào trong nhà nước pháp quyền?",
                "a": "Durch eine <b>Güterabwägung nach dem Grundsatz der Verhältnismäßigkeit (praktische Konkordanz)</b>: Beide Grundrechte müssen so in Ausgleich gebracht werden, dass jedes von ihnen möglichst weitgehend wirksam bleibt.",
                "aVi": "Thông qua việc <b>cân nhắc lợi ích theo nguyên tắc tương xứng (Verhältnismäßigkeit / praktische Konkordanz)</b>: Cả hai quyền cơ bản phải được điều hòa sao cho mỗi quyền đều giữ được hiệu lực tối đa có thể."
              }
            ]
              }
            ]
          },
          {
            id: "methode",
            badge: "Methode",
            title: "Redemittel · Schreibaufgaben",
            items: [
              {
                id: "redemittel",
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>',
                name: "Redemittel · Satzbausteine",
                desc: "Für jede Schreibaufgabe: Erläutern · Beurteilen · Vergleichen · Stellung nehmen",
                content: `
                  <h2> Redemittel für Schreibaufgaben</h2>
                  <div class="hint">Fertige Satzanfänge für die KA – passend zu jedem Thema. Begriffe mit VI antippen.</div>

                  <h3 class="sub"> Operatoren verstehen (was ist gefragt?)</h3>
                  <table>
                    <tr><th>Operator</th><th>Was tun?</th></tr>
                    <tr><td><span class="term" data-de="Nennen / Aufzählen" data-vi="Nêu / Liệt kê">Nennen / Aufzählen</span></td><td>nur Stichpunkte, keine Erklärung</td></tr>
                    <tr><td><span class="term" data-de="Beschreiben" data-vi="Mô tả">Beschreiben</span></td><td>sachlich darstellen, wie etwas ist</td></tr>
                    <tr><td><span class="term" data-de="Erläutern / Erklären" data-vi="Trình bày / Giải thích">Erläutern / Erklären</span></td><td>mit eigenen Worten + Beispiel verständlich machen</td></tr>
                    <tr><td><span class="term" data-de="Begründen" data-vi="Lập luận / Nêu lý do">Begründen</span></td><td>Warum? – Gründe mit „weil / da“ geben</td></tr>
                    <tr><td><span class="term" data-de="Vergleichen" data-vi="so sánh">Vergleichen</span></td><td>Gemeinsamkeiten + Unterschiede</td></tr>
                    <tr><td><span class="term" data-de="Beurteilen" data-vi="Đánh giá (có lý lẽ)">Beurteilen</span></td><td>Vor- und Nachteile abwägen → sachliches Urteil</td></tr>
                    <tr><td><span class="term" data-de="Stellung nehmen" data-vi="Nêu quan điểm">Stellung nehmen</span></td><td>eigene Meinung + Begründung</td></tr>
                  </table>

                  <h3 class="sub">1. Einleitung · einen Text/ein Thema einführen</h3>
                  <ul>
                    <li><span class="term" data-de="In der Aufgabe geht es um …" data-vi="Bài tập nói về …">In der Aufgabe geht es um …</span></li>
                    <li><span class="term" data-de="Im Folgenden erläutere ich …" data-vi="Sau đây tôi trình bày …">Im Folgenden erläutere ich …</span></li>
                    <li><span class="term" data-de="Zunächst möchte ich … darstellen." data-vi="Trước tiên tôi muốn trình bày …">Zunächst möchte ich … darstellen.</span></li>
                  </ul>

                  <h3 class="sub">2. Erläutern / Erklären</h3>
                  <ul>
                    <li><span class="term" data-de="Unter … versteht man …" data-vi="… được hiểu là …">Unter … versteht man …</span></li>
                    <li><span class="term" data-de="Das bedeutet, dass …" data-vi="Điều đó có nghĩa là …">Das bedeutet, dass …</span></li>
                    <li><span class="term" data-de="Ein Beispiel dafür ist …" data-vi="Một ví dụ cho điều đó là …">Ein Beispiel dafür ist …</span></li>
                    <li><span class="term" data-de="Konkret heißt das, …" data-vi="Cụ thể là …">Konkret heißt das, …</span></li>
                  </ul>

                  <h3 class="sub">3. Begründen · Ursache & Folge</h3>
                  <ul>
                    <li><span class="term" data-de="…, weil / da …" data-vi="…, vì / bởi …">…, weil / da …</span></li>
                    <li><span class="term" data-de="Der Grund dafür ist, dass …" data-vi="Lý do cho điều đó là …">Der Grund dafür ist, dass …</span></li>
                    <li><span class="term" data-de="Das führt dazu, dass …" data-vi="Điều đó dẫn đến việc …">Das führt dazu, dass …</span></li>
                    <li><span class="term" data-de="Deshalb / Daher / Folglich …" data-vi="Vì vậy / Do đó / Suy ra …">Deshalb / Daher / Folglich …</span></li>
                  </ul>

                  <h3 class="sub">4. Vergleichen · Gegenüberstellen</h3>
                  <ul>
                    <li><span class="term" data-de="Im Vergleich zu … ist …" data-vi="So với … thì …">Im Vergleich zu … ist …</span></li>
                    <li><span class="term" data-de="Beide haben gemeinsam, dass …" data-vi="Cả hai có điểm chung là …">Beide haben gemeinsam, dass …</span></li>
                    <li><span class="term" data-de="Ein Unterschied besteht darin, dass …" data-vi="Một khác biệt nằm ở chỗ …">Ein Unterschied besteht darin, dass …</span></li>
                    <li><span class="term" data-de="Während … , ist / hat …" data-vi="Trong khi … thì …">Während … , ist / hat …</span></li>
                  </ul>

                  <h3 class="sub">5. Beurteilen · Vor- und Nachteile abwägen</h3>
                  <ul>
                    <li><span class="term" data-de="Einerseits … , andererseits …" data-vi="Một mặt … , mặt khác …">Einerseits … , andererseits …</span></li>
                    <li><span class="term" data-de="Ein Vorteil ist … , ein Nachteil ist …" data-vi="Một ưu điểm là … , một nhược điểm là …">Ein Vorteil ist … , ein Nachteil ist …</span></li>
                    <li><span class="term" data-de="Dafür spricht … , dagegen spricht …" data-vi="Ủng hộ điều này là … , phản đối là …">Dafür spricht … , dagegen spricht …</span></li>
                    <li><span class="term" data-de="Insgesamt überwiegen die Vorteile / Nachteile, weil …" data-vi="Nhìn chung ưu / nhược điểm chiếm ưu thế, vì …">Insgesamt überwiegen die Vorteile / Nachteile, weil …</span></li>
                  </ul>

                  <h3 class="sub">6. Stellung nehmen · eigene Meinung</h3>
                  <ul>
                    <li><span class="term" data-de="Meiner Meinung nach …, weil …" data-vi="Theo ý tôi …, vì …">Meiner Meinung nach …, weil …</span></li>
                    <li><span class="term" data-de="Ich bin der Ansicht, dass …" data-vi="Tôi cho rằng …">Ich bin der Ansicht, dass …</span></li>
                    <li><span class="term" data-de="Ich stimme (nicht) zu, weil …" data-vi="Tôi (không) đồng ý, vì …">Ich stimme (nicht) zu, weil …</span></li>
                  </ul>

                  <h3 class="sub">7. Schluss / Fazit</h3>
                  <ul>
                    <li><span class="term" data-de="Zusammenfassend lässt sich sagen, dass …" data-vi="Tóm lại có thể nói rằng …">Zusammenfassend lässt sich sagen, dass …</span></li>
                    <li><span class="term" data-de="Abschließend …" data-vi="Cuối cùng …">Abschließend …</span></li>
                    <li><span class="term" data-de="Aus den genannten Gründen …" data-vi="Vì những lý do đã nêu …">Aus den genannten Gründen …</span></li>
                  </ul>

                  <h3 class="sub"> Nützliche Verbindungswörter</h3>
                  <p><span class="term" data-de="außerdem" data-vi="ngoài ra">außerdem</span> ·
                  <span class="term" data-de="zudem" data-vi="hơn nữa">zudem</span> ·
                  <span class="term" data-de="jedoch" data-vi="tuy nhiên">jedoch</span> ·
                  <span class="term" data-de="trotzdem" data-vi="mặc dù vậy">trotzdem</span> ·
                  <span class="term" data-de="dagegen" data-vi="ngược lại">dagegen</span> ·
                  <span class="term" data-de="zum Beispiel" data-vi="ví dụ">zum Beispiel</span> ·
                  <span class="term" data-de="im Gegensatz dazu" data-vi="trái lại">im Gegensatz dazu</span></p>

                  <div class="note"> Tipp: In der KA immer <b>in ganzen Sätzen</b> antworten und die Redemittel passend zum <b>Operator</b> wählen (Erläutern ≠ Beurteilen).</div>
              <div class="vi"><b>Tóm tắt Tiếng Việt — Kho mẫu câu học thuật (Redemittel) ăn điểm tối đa trong bài thi GK:</b><ul><li><b>Phân tích biểu đồ / Thống kê (Statistik):</b> <i>„Das vorliegende Diagramm veranschaulicht…“, „Auf den ersten Blick fällt auf, dass…“, „Der Anteil hat sich im Zeitraum von … bis … fast verdoppelt / halbiert.“</i></li><li><b>Phân tích tranh biếm họa (Karikatur):</b> <i>„Im Vordergrund / Hintergrund ist … dargestellt“, „Überspitzt dargestellt wird hierbei…“, „Der Zeichner kritisiert damit…“</i></li><li><b>Nghị luận / Tranh biện Pro & Contra (Erörterung / Stellungnahme):</b> <i>„Ein gewichtiges Argument dafür/dagegen ist…“, „Dem lässt sich jedoch entgegenhalten, dass…“, „Abschließend komme ich zu dem Ergebnis, dass…“</i></li></ul></div>
            `,
            "qa": [
              {
                "q": "Wie gliedert man eine begründete Stellungnahme (Pro-Contra-Argumentation) in einer GK-Klassenarbeit?",
                "qVi": "Cách triển khai một đoạn văn nêu quan điểm có lập luận (Pro-Contra-Argumentation) trong bài kiểm tra GK như thế nào?",
                "a": "1. <b>Einleitung:</b> Streitfrage / Problem kurz benennen.<br>2. <b>Hauptteil (Sanduhr-Prinzip):</b> Zuerst die Argumente der Gegenseite mit Beispielen darlegen, dann die stärkeren Argumente der eigenen Position (jeweils <b>Behauptung → Begründung → Beispiel</b>).<br>3. <b>Schluss (Fazit):</b> Abwägendes Gesamturteil und eigener Lösungsvorschlag.",
                "aVi": "1. <b>Mở đoạn:</b> Nêu ngắn gọn vấn đề tranh luận.<br>2. <b>Thân đoạn (Nguyên tắc đồng hồ cát):</b> Nêu các luận điểm của phía đối lập trước, sau đó đưa ra các luận điểm mạnh hơn của phía mình (mỗi ý đều theo công thức: <b>Luận điểm → Lý lẽ giải thích → Ví dụ thực tế</b>).<br>3. <b>Kết đoạn:</b> Đưa ra phán đoán tổng kết và đề xuất giải pháp."
              },
              {
                "q": "Nenne drei überzeugende Redemittel für das Abwägen von Argumenten.",
                "qVi": "Nêu 3 mẫu câu (Redemittel) thuyết phục dùng để cân nhắc các lập luận.",
                "a": "<ul><li>„Zwar wird häufig argumentiert, dass …, doch dabei wird übersehen, dass …“</li><li>„Ein entscheidendes Argument, das für / gegen … spricht, ist …“</li><li>„Wägt man die genannten Vor- und Nachteile gegeneinander ab, überwiegt der Aspekt, dass …“</li></ul>",
                "aVi": "<ul><li>„Tuy người ta thường lập luận rằng …, nhưng điều đó lại bỏ qua thực tế rằng …“</li><li>„Một luận điểm quyết định ủng hộ / phản đối … là …“</li><li>„Khi cân nhắc các ưu và nhược điểm nêu trên, khía cạnh vượt trội hơn là …“</li></ul>"
              }
            ]
              }
            ]
          },
          {
            id: "jahr2-wahlen-geschichte",
            badge: "KA 12.10.26",
            title: "2. Lehrjahr · Wahlen, Macht & Geschichte (KA 12.10.2026)",
            items: [
              {
                id: "wahlgrundsaetze",
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="m9 12 2 2 4-4"/></svg>',
                name: "Wahlrechtsgrundsätze & Wahlrecht",
                desc: "5 Grundsätze (A-U-F-G-G) · Aktives & passives Wahlrecht · Wahlpflicht",
                keyPoints: [
                  "<b>Merkwort A-U-F-G-G:</b> allgemein, unmittelbar, frei, gleich, geheim.",
                  "<b>Unmittelbar:</b> Wähler stimmen direkt ohne Zwischenschaltung von Wahlmännern ab.",
                  "<b>Frei & keine Wahlpflicht:</b> Jede Person entscheidet ohne Zwang, ob und wen sie wählt.",
                  "<b>Aktives Wahlrecht:</b> Ab 18 Jahren, deutsche Staatsbürgerschaft, mindestens 3 Monate Wohnsitz.",
                  "<b>Wahlperioden:</b> Bundestag alle 4 Jahre, Landtag alle 5 Jahre (in BW Landtagswahl ab 16 Jahren)."
                ],
                content: `
                  <h2>§ 1 Wahlrechtsgrundsätze &amp; Wahlrecht</h2>
                  <div class="hint">Klassenarbeit 12.10.2026 · 5 Wahlrechtsgrundsätze &amp; Voraussetzungen</div>

                  <h3 class="sub">1. Die fünf Wahlrechtsgrundsätze (Merkwort: A-U-F-G-G)</h3>
                  <div class="formula"><b>Merkwort A-U-F-G-G:</b> <span class="term" data-de="allgemein" data-vi="phổ thông">Allgemein</span> · <span class="term" data-de="unmittelbar" data-vi="trực tiếp">Unmittelbar</span> · <span class="term" data-de="frei" data-vi="tự do">Frei</span> · <span class="term" data-de="gleich" data-vi="bình đẳng">Gleich</span> · <span class="term" data-de="geheim" data-vi="bí mật">Geheim</span></div>

                  <p>Für den <span class="term" data-de="Bundestag" data-vi="Quốc hội liên bang Đức">Bundestag</span> und die <span class="term" data-de="Landtag" data-vi="Nghị viện bang">Landtage</span> gelten dieselben fünf Grundsätze:</p>

                  <table>
                    <tr><th>Grundsatz</th><th>Bedeutung (Định nghĩa)</th><th>Verstoß</th></tr>
                    <tr>
                      <td><b>allgemein</b><br><span class="muted">phổ thông</span></td>
                      <td>Jede Person, die die Wahlvoraussetzungen erfüllt, darf wählen – unabhängig von Religion, Bildung, Geschlecht, Einkommen oder Beruf.</td>
                      <td>Frauen oder einkommensschwache Bürger werden von der Wahl ausgeschlossen.</td>
                    </tr>
                    <tr>
                      <td><b>unmittelbar</b><br><span class="muted">trực tiếp</span></td>
                      <td>Die Wähler wählen Kandidaten und Parteien direkt; es sind keine <span class="term" data-de="Wahlmänner" data-vi="đại cử tri">Wahlmänner</span> dazwischengeschaltet.</td>
                      <td>Ein Gremium von Wahlmännern stimmt stellvertretend für die Wähler ab (wie im US-System).</td>
                    </tr>
                    <tr>
                      <td><b>frei</b><br><span class="muted">tự do</span></td>
                      <td>Jede Person entscheidet ohne Zwang, Druck oder Kontrolle, wen sie wählt – und <i>ob</i> sie überhaupt wählt.</td>
                      <td>Arbeitgeber oder Familienmitglieder drohen mit Konsequenzen bei falscher Stimmabgabe.</td>
                    </tr>
                    <tr>
                      <td><b>gleich</b><br><span class="muted">bình đẳng</span></td>
                      <td>Jede Stimme hat denselben Zählwert und denselben Einfluss auf das Wahlergebnis.</td>
                      <td>Reiche oder Akademiker erhalten ein Mehrstimmrecht (z. B. zwei Stimmen).</td>
                    </tr>
                    <tr>
                      <td><b>geheim</b><br><span class="muted">bí mật</span></td>
                      <td>Die Stimmabgabe erfolgt unbeobachtet in einer <span class="term" data-de="Wahlkabine" data-vi="buồng bỏ phiếu">Wahlkabine</span>; der gefaltete Zettel kommt in eine versiegelte <span class="term" data-de="Wahlurne" data-vi="thùng phiếu niêm phong">Wahlurne</span>.</td>
                      <td>Offene Stimmabgabe per Handzeichen oder Beaufsichtigung in der Wahlkabine.</td>
                    </tr>
                  </table>

                  <h3 class="sub">2. Aktives und passives Wahlrecht</h3>
                  <table>
                    <tr><th>Kriterium</th><th>Aktives Wahlrecht (wählen dürfen)</th><th>Passives Wahlrecht (gewählt werden)</th></tr>
                    <tr><td><b>Wer?</b></td><td>Alle deutschen Staatsbürger</td><td>Jeder Wahlberechtigte</td></tr>
                    <tr><td><b>Mindestalter</b></td><td>Vollendung des 18. Lebensjahres am Wahltag</td><td>Vollendung des 18. Lebensjahres am Wahltag</td></tr>
                    <tr><td><b>Aufenthalt / Status</b></td><td>Mindestens 3 Monate Wohnsitz im Wahlgebiet</td><td>Seit mindestens 1 Jahr Deutscher im Sinne des Art. 116 Abs. 1 GG</td></tr>
                  </table>

                  <div class="note"><b>Keine Wahlpflicht in Deutschland:</b> Eine gesetzliche Wahlpflicht widerspräche dem Grundsatz „frei“, da jeder Bürger auch das Recht hat, nicht zur Wahl zu gehen.</div>
                  <div class="formula">Bundestagswahl: alle <b>4 Jahre</b> · Landtagswahl (z. B. Baden-Württemberg): alle <b>5 Jahre</b> (in BW ab 16 Jahren wahlberechtigt).</div>
              <div class="vi"><b>Tóm tắt Tiếng Việt — 5 Nguyên tắc bầu cử theo Điều 38 Hiến pháp Đức (Art. 38 Abs. 1 GG):</b><ul><li><b>1. Allgemein (Phổ thông):</b> Mọi công dân Đức từ đủ 18 tuổi (ở một số cuộc bầu cử tiểu bang/địa phương/EU là từ 16 tuổi) đều có quyền bầu cử và ứng cử, không phân biệt giới tính, tài sản, tôn giáo hay trình độ học vấn.</li><li><b>2. Unmittelbar (Trực tiếp):</b> Cử tri bầu trực tiếp các ứng cử viên và đảng phái, không qua đại cử tri trung gian (Wahlmänner).</li><li><b>3. Frei (Tự do):</b> Không ai bị ép buộc phải đi bầu hoặc phải bầu cho một đảng nhất định; không được mua chuộc hay đe dọa cử tri.</li><li><b>4. Gleich (Bình đẳng):</b> Mỗi lá phiếu đều có <b>cùng một giá trị đếm (Zählwertgleichheit)</b> và cơ hội tác động ngang nhau.</li><li><b>5. Geheim (Bỏ phiếu kín):</b> Không ai được biết cử tri đã gạch phiếu cho ai (bắt buộc dùng buồng bỏ phiếu kín Wahlkabine và thùng phiếu niêm phong).</li></ul></div>
            `,
            "qa": [
              {
                "q": "Wie lauten die fünf demokratischen Wahlgrundsätze nach Art. 38 Abs. 1 GG und was bedeuten sie?",
                "qVi": "5 nguyên tắc bầu cử dân chủ theo Điều 38 khoản 1 Hiến pháp Đức (Art. 38 Abs. 1 GG) là gì và có ý nghĩa gì?",
                "a": "1. <b>Allgemein:</b> Alle Staatsbürger ab dem Wahlalter dürfen wählen und gewählt werden.<br>2. <b>Unmittelbar:</b> Direkte Wahl der Abgeordneten/Parteien ohne Wahlmänner.<br>3. <b>Frei:</b> Kein Zwang, kein Druck bei der Stimmabgabe.<br>4. <b>Gleich:</b> Jede Stimme zählt exakt gleich viel (gleicher Zählwert).<br>5. <b>Geheim:</b> Die Stimmabgabe ist anonym und unbeobachtet (Wahlkabine).",
                "aVi": "1. <b>Allgemein (Phổ thông):</b> Mọi công dân đủ tuổi đều có quyền bầu cử và ứng cử.<br>2. <b>Unmittelbar (Trực tiếp):</b> Bầu trực tiếp đại biểu/đảng phái không qua đại cử tri.<br>3. <b>Frei (Tự do):</b> Không cưỡng ép, không gây áp lực khi bỏ phiếu.<br>4. <b>Gleich (Bình đẳng):</b> Mỗi lá phiếu có giá trị ngang nhau.<br>5. <b>Geheim (Bỏ phiếu kín):</b> Việc đánh dấu phiếu hoàn toàn bí mật trong buồng kín."
              },
              {
                "q": "Welcher Wahlgrundsatz wird verletzt, wenn ein Ehepaar gemeinsam in eine Wahlkabine geht oder jemand seinen ausgefüllten Stimmzettel im Wahllokal fotografiert?",
                "qVi": "Nguyên tắc bầu cử nào bị vi phạm nếu hai vợ chồng cùng vào chung một buồng bỏ phiếu hoặc có người chụp ảnh phiếu bầu đã đánh dấu trong phòng bỏ phiếu?",
                "a": "Der Grundsatz der <b>geheimen Wahl</b> (und mittelbar der <b>freien Wahl</b>), da das Wahlgeheimnis auch den Wähler selbst vor sozialem Druck oder Kontrolle durch Dritte schützen muss.",
                "aVi": "Nguyên tắc <b>Bỏ phiếu kín (geheime Wahl)</b> (và gián tiếp là nguyên tắc <b>Bầu cử tự do</b>), vì bí mật lá phiếu còn nhằm bảo vệ chính cử tri khỏi sức ép hoặc sự kiểm soát của người khác."
              }
            ],
                
                vokabeln: [
                  { de: "Wahlrechtsgrundsätze", vi: "các nguyên tắc bầu cử" },
                  { de: "unmittelbar", vi: "trực tiếp (không qua đại cử tri)" },
                  { de: "Wahlmänner", vi: "đại cử tri" },
                  { de: "Wahlkabine", vi: "buồng bỏ phiếu kín" },
                  { de: "Wahlurne", vi: "thùng bỏ phiếu niêm phong" },
                  { de: "aktives Wahlrecht", vi: "quyền bầu cử (đi bỏ phiếu)" },
                  { de: "passives Wahlrecht", vi: "quyền ứng cử (được người khác bầu)" },
                  { de: "Wahlpflicht", vi: "nghĩa vụ bắt buộc đi bầu" }
                ]
              },
              {
                id: "erst-zweitstimme",
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
                name: "Erststimme & Zweitstimme (Wahlsystem)",
                desc: "Mehrheits- vs. Verhältniswahl · Direktmandat · Personalisierte Verhältniswahl",
                keyPoints: [
                  "<b>Erststimme:</b> Wählt eine Person im Wahlkreis (Mehrheitswahl in 299 Wahlkreisen → Direktmandat).",
                  "<b>Zweitstimme:</b> Wählt eine Partei über die Landesliste (Verhältniswahl → bestimmt Sitzverteilung).",
                  "<b>Zweitstimme ist wichtiger:</b> Sie entscheidet über die prozentuale Stärke der Parteien im Bundestag.",
                  "<b>Personalisierte Verhältniswahl:</b> Kombination aus Verhältniswahl und Persönlichkeitswahl.",
                  "<b>Stimmensplitting:</b> Erststimme und Zweitstimme an unterschiedliche Parteien vergeben."
                ],
                content: `
                  <h2>§ 2 Erststimme und Zweitstimme</h2>
                  <div class="hint">Bundestagswahl: System der personalisierten Verhältniswahl</div>

                  <h3 class="sub">1. Vergleich Erststimme vs. Zweitstimme</h3>
                  <table>
                    <tr><th>Merkmal</th><th>Erststimme (Direktmandat)</th><th>Zweitstimme (Phiếu thứ hai)</th></tr>
                    <tr><td><b>Was wählt man?</b></td><td>Einen konkreten Kandidaten (Person) im eigenen Wahlkreis</td><td>Eine politische Partei über deren <span class="term" data-de="Landesliste" data-vi="danh sách ứng viên của bang">Landesliste</span></td></tr>
                    <tr><td><b>Wahlsystem</b></td><td><span class="term" data-de="Mehrheitswahl" data-vi="bầu cử theo đa số">Mehrheitswahl</span> (Einfache Mehrheit im Wahlkreis)</td><td><span class="term" data-de="Verhältniswahl" data-vi="bầu cử theo tỷ lệ">Verhältniswahl</span> (Prozentsatz der Stimmen)</td></tr>
                    <tr><td><b>Ergebnis</b></td><td>Der Sieger im Wahlkreis erhält ein <span class="term" data-de="Direktmandat" data-vi="ghế nghị sĩ trực tiếp">Direktmandat</span></td><td>Bestimmt maßgeblich die Zahl der Gesamtsitze der Partei im Bundestag</td></tr>
                    <tr><td><b>Struktur</b></td><td>Deutschland ist in exakt <b>299 Wahlkreise</b> aufgeteilt</td><td>Pro Bundesland stellt jede Partei eine geordnete Landesliste auf</td></tr>
                  </table>

                  <h3 class="sub">2. Das Wahlsystem: Personalisierte Verhältniswahl</h3>
                  <div class="formula"><b>Personalisierte Verhältniswahl:</b> Das Gesamtergebnis richtet sich nach dem <b>Verhältnis der Zweitstimmen</b>, wird aber durch Direktkandidaten der Erststimme <b>personalisiert</b>.</div>

                  <p><b>Stimmensplitting:</b> Ein Wähler kann seine Erststimme einem Direktkandidaten einer Partei geben und seine Zweitstimme einer anderen Partei (z. B. Erststimme CDU, Zweitstimme FDP).</p>

                  <h3 class="sub">3. Regierungsbildung und Aufgaben des Bundestages</h3>
                  <ul>
                    <li><b>Regierungsbildung:</b> Eine Bundesregierung benötigt die <span class="term" data-de="absolute Mehrheit" data-vi="đa số tuyệt đối (> 50 %)">absolute Mehrheit</span> (&gt; 50 % der Sitze). Erreicht keine Partei allein 50 %, bilden Parteien eine <span class="term" data-de="Koalition" data-vi="liên minh chính phủ">Koalition</span>.</li>
                    <li><b>Hauptaufgaben des Bundestages (Legislative):</b>
                      <ol>
                        <li>Wahl des Bundeskanzlers</li>
                        <li><span class="term" data-de="Gesetzgebung" data-vi="lập pháp / làm luật">Gesetzgebung</span> (Verabschiedung von Gesetzen und Bundeshaushalt)</li>
                        <li>Kontrolle der Regierungsarbeit (<span class="term" data-de="parlamentarische Kontrolle" data-vi="giám sát của quốc hội">parlamentarische Kontrolle</span>)</li>
                      </ol>
                    </li>
                  </ul>
                  <div class="note"><b>Wahlrechtsreform 2023:</b> Feste Bundestagsgröße von 630 Sitzen, Abschaffung von Überhang- und Ausgleichsmandaten (Zweitstimmendeckung erforderlich).</div>
              <div class="vi"><b>Tóm tắt Tiếng Việt — Hệ thống bầu cử Quốc hội Liên bang: Phiếu thứ nhất (Erststimme) & Phiếu thứ hai (Zweitstimme):</b><ul><li>Hệ thống bầu cử của Đức là <b>Personalisierte Verhältniswahl</b> (Bầu cử đại diện tỷ lệ có yếu tố cá nhân hóa), tổng số ghế cố định là <b>630 nghị sĩ</b> (theo Luật bầu cử cải cách 2023).</li><li><b>Erststimme (Phiếu thứ nhất – Cột bên trái):</b> Bầu cho <b>1 ứng cử viên trực tiếp (Direktkandidat/in)</b> tại khu vực bầu cử địa phương (299 Wahlkreise) → giúp mỗi vùng đều có đại diện trong Quốc hội (được trao ghế nếu đảng có đủ thị phần Zweitstimmendeckig).</li><li><b>Zweitstimme (Phiếu thứ hai – Cột bên phải – QUAN TRỌNG NHẤT):</b> Bầu cho <b>danh sách tiểu bang của một Đảng (Landesliste einer Partei)</b> → Quyết định <b>tỷ lệ phần trăm (%) tổng số ghế của mỗi đảng trong Bundestag</b> và quyết định liên minh nào đủ đa số bầu Thủ tướng.</li></ul></div>
            `,
            "qa": [
              {
                "q": "Welche der beiden Stimmen bei der Bundestagswahl ist die wichtigere und warum?",
                "qVi": "Trong hai phiếu bầu tại cuộc bầu cử Quốc hội Liên bang (Bundestagswahl), phiếu nào quan trọng hơn và tại sao?",
                "a": "Die <b>Zweitstimme</b> ist die entscheidende Stimme: Mit ihr wählt man die <b>Landesliste einer Partei</b>. Sie allein bestimmt das <b>prozentuale Kräfteverhältnis (die Sitzverteilung) der Parteien im Bundestag</b> (630 Sitze) und damit die Mehrheit für die Wahl des Bundeskanzlers.",
                "aVi": "<b>Phiếu thứ hai (Zweitstimme)</b> là phiếu quyết định quan trọng nhất: Dùng để bầu cho <b>danh sách ứng cử viên của một Đảng (Landesliste)</b>. Chính phiếu này quyết định <b>tỷ lệ phần trăm số ghế của các đảng trong Quốc hội (630 ghế)</b> và đa số để bầu Thủ tướng."
              },
              {
                "q": "Wen wählt man mit der Erststimme und welchem Zweck dient sie?",
                "qVi": "Cử tri bầu cho ai bằng Phiếu thứ nhất (Erststimme) và phiếu này có mục đích gì?",
                "a": "Mit der <b>Erststimme</b> wählt man eine <b>Person (Direktkandidatin / Direktkandidaten)</b> im eigenen Wahlkreis (299 Wahlkreise). Sie sorgt dafür, dass die Regionen personell im Bundestag vertreten sind (seit der Wahlrechtsreform 2023 ziehen Wahlkreissieger ein, sofern ihre Partei über genügend Zweitstimmendeckung verfügt).",
                "aVi": "Với <b>Erststimme</b>, cử tri bầu trực tiếp cho <b>một cá nhân ứng cử viên (Direktkandidat)</b> tại đơn vị bầu cử địa phương của mình (299 đơn vị). Nó đảm bảo các vùng miền đều có đại diện cá nhân tại Quốc hội (theo luật bầu cử mới 2023, ứng viên thắng cuộc nhận ghế nếu nằm trong tổng số ghế Zweitstimme của đảng mình)."
              }
            ],
                
                vokabeln: [
                  { de: "Erststimme", vi: "phiếu thứ nhất (bầu ứng viên trực tiếp)" },
                  { de: "Zweitstimme", vi: "phiếu thứ hai (bầu danh sách đảng)" },
                  { de: "Direktmandat", vi: "ghế đại biểu trực tiếp tại khu vực" },
                  { de: "Landesliste", vi: "danh sách ứng viên cấp bang của đảng" },
                  { de: "Mehrheitswahl", vi: "bầu cử theo đa số" },
                  { de: "Verhältniswahl", vi: "bầu cử theo tỷ lệ" },
                  { de: "Stimmensplitting", vi: "chia phiếu (bầu ứng viên đảng A, danh sách đảng B)" },
                  { de: "Koalition", vi: "liên minh các đảng cầm quyền" }
                ]
              },
              {
                id: "sperrklausel",
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>',
                name: "Sperrklausel (5 %-Hürde)",
                desc: "5 % bundesweit · Grundmandatsklausel (3 Direktmandate) · Zersplitterung",
                keyPoints: [
                  "<b>5 %-Hürde:</b> Parteien müssen bundesweit mindestens 5 % der Zweitstimmen erzielen.",
                  "<b>Grundmandatsklausel:</b> Mindestens 3 Direktmandate heben die 5 %-Hürde auf (Verteilung nach Zweitstimmen).",
                  "<b>Unter 5 % und nur 1–2 Direktmandate:</b> Nur die Direktkandidaten ziehen ein; Zweitstimmen verfallen.",
                  "<b>Zweck:</b> Schutz vor Parteizersplitterung und instabilen Regierungen (Lehre aus Weimarer Republik).",
                  "<b>Achtung Klausurfalle:</b> Bei der Bundestagswahl gilt die Hürde bundesweit, nicht pro Bundesland."
                ],
                content: `
                  <h2>§ 3 <span class="term" data-de="Sperrklausel" data-vi="ngưỡng tối thiểu vào quốc hội">Sperrklausel</span> (<span class="term" data-de="5 %-Hürde" data-vi="ngưỡng 5 %">5 %-Hürde</span>)</h2>
                  <div class="hint">Regelung zur Parlamentsstabilität &amp; <span class="term" data-de="Grundmandatsklausel" data-vi="điều khoản ghế tối thiểu (3 ghế)">Grundmandatsklausel</span></div>

                  <h3 class="sub">1. Grundregel der Sperrklausel</h3>
                  <div class="formula">Nur Parteien, die <b>bundesweit mindestens 5 % der Zweitstimmen</b> erreichen ODER <b>mindestens 3 Direktmandate</b> gewinnen (<span class="term" data-de="Grundmandatsklausel" data-vi="điều khoản 3 ghế trực tiếp">Grundmandatsklausel</span>), ziehen mit vollem Zweitstimmenergebnis in den Bundestag ein.</div>

                  <h3 class="sub">2. Drei typische Klausur-Fallbeispiele</h3>
                  <table>
                    <tr><th>Partei</th><th>Zweitstimmen</th><th>Direktmandate</th><th>Ergebnis &amp; Begründung</th></tr>
                    <tr>
                      <td><b>Partei A</b></td>
                      <td><b>5,3 %</b></td>
                      <td>0</td>
                      <td><b>Zieht voll ein:</b> Erreicht &ge; 5 % der Zweitstimmen. Erhält Sitze entsprechend ihrem Zweitstimmenanteil.</td>
                    </tr>
                    <tr>
                      <td><b>Partei B</b></td>
                      <td><b>4,8 %</b></td>
                      <td><b>3 Direktmandate</b></td>
                      <td><b>Zieht voll ein (Grundmandatsklausel):</b> Trotz &lt; 5 % heben die 3 Direktmandate die Hürde auf; Sitze nach 4,8 % Zweitstimmen.</td>
                    </tr>
                    <tr>
                      <td><b>Partei C</b></td>
                      <td><b>4,0 %</b></td>
                      <td><b>2 Direktmandate</b></td>
                      <td><b>Nur 2 Sitze:</b> Nur die 2 direkt gewählten Abgeordneten ziehen ein; alle Zweitstimmen verfallen ersatzlos.</td>
                    </tr>
                  </table>

                  <h3 class="sub">3. Warum gibt es die 5 %-Hürde? (Pro &amp; Kontra)</h3>
                  <table>
                    <tr><th>Vorteile / Absicht (Pro)</th><th>Kritikpunkte (Kontra)</th></tr>
                    <tr>
                      <td>• Verhindert die <span class="term" data-de="Zersplitterung" data-vi="sự chia nhỏ / phân mảnh">Zersplitterung</span> des Parlaments in viele Kleinstparteien.<br>• Ermöglicht stabile Regierungsmehrheiten und <span class="term" data-de="handlungsfähig" data-vi="có năng lực hành động điều hành">handlungsfähige</span> Koalitionen (Lehre aus dem Scheitern der <span class="term" data-de="Weimarer Republik" data-vi="Cộng hòa Weimar (1919–1933)">Weimarer Republik</span>).</td>
                      <td>• Stimmen für Parteien unter 5 % verfallen (oft Millionen Wählerstimmen ohne Repräsentation im Parlament).<br>• Erschwert neuen Parteien den Einstieg in die Bundespolitik.</td>
                    </tr>
                  </table>

                  <div class="note"><b>Wichtige Klausurfalle:</b> Bei der Bundestagswahl zählt das bundesweite Gesamtergebnis. Ein Ergebnis von 4,1 % in einem Bundesland bedeutet nicht, dass eine Partei draußen ist, wenn sie bundesweit über 5 % liegt!</div>
              <div class="vi"><b>Tóm tắt Tiếng Việt — Ngưỡng 5% (5-%-Sperrklausel / Fünf-Prozent-Hürde):</b><ul><li><b>Quy định:</b> Một đảng chỉ được tham gia chia ghế trong Bundestag nếu đạt <b>tối thiểu 5% tổng số phiếu Zweitstimme hợp lệ trên toàn quốc</b> (hoặc thắng ít nhất <b>3 Direktmandate</b> theo điều khoản Grundmandatsklausel).</li><li><b>Mục đích (Tại sao cần có?):</b> Ngăn chặn <b>sự phân mảnh Quốc hội thành quá nhiều đảng nhỏ lẻ (Zersplitterung des Parlaments)</b> như thời Cộng hòa Weimar, đảm bảo Quốc hội có thể thành lập được <b>chính phủ liên minh ổn định, có khả năng hành động (stabile und handlungsfähige Regierung)</b>.</li><li><b>Mặt trái:</b> Các phiếu bầu cho những đảng dưới 5% không được quy đổi thành ghế trong Quốc hội.</li></ul></div>
            `,
            "qa": [
              {
                "q": "Was besagt die 5-%-Sperrklausel (Fünf-Prozent-Hürde) und warum wurde sie eingeführt?",
                "qVi": "Ngưỡng 5% (5-%-Sperrklausel) quy định điều gì và tại sao nó được đưa vào áp dụng?",
                "a": "Eine Partei zieht nur dann in den Bundestag ein, wenn sie mindestens <b>5 % der gültigen Zweitstimmen</b> im Wahlgebiet (oder mindestens 3 Direktmandate) erreicht. Sie verhindert eine <b>Parteienzersplitterung</b> wie in der Weimarer Republik und sichert <b>stabile, regierungsfähige Mehrheiten</b> im Parlament.",
                "aVi": "Một đảng chỉ được vào Quốc hội Liên bang nếu giành được tối thiểu <b>5% tổng số phiếu Zweitstimme hợp lệ</b> (hoặc tối thiểu 3 ghế trực tiếp). Quy định này nhằm ngăn chặn <b>tình trạng Quốc hội bị chia năm xẻ bảy bởi quá nhiều đảng nhỏ</b> như thời Cộng hòa Weimar, giúp đảm bảo <b>chính phủ ổn định và hiệu quả</b>."
              },
              {
                "q": "Inwiefern steht die 5-%-Hürde in einem Spannungsverhältnis zu den Wahlgrundsätzen?",
                "qVi": "Ngưỡng 5% có sự xung đột nhất định với nguyên tắc bầu cử nào?",
                "a": "Sie schränkt die <b>Erfolgswertgleichheit</b> (Teil der <b>gleichen Wahl</b>) ein, da die Stimmen für Kleinparteien unter 5 % bei der Sitzverteilung im Bundestag unberücksichtigt bleiben. Das Bundesverfassungsgericht hält diesen Eingriff jedoch zum Schutz der Funktionsfähigkeit des Parlaments für gerechtfertigt.",
                "aVi": "Nó hạn chế <b>sự bình đẳng về giá trị hiệu quả của lá phiếu (Erfolgswertgleichheit)</b> thuộc nguyên tắc <b>Bầu cử bình đẳng</b>, vì phiếu bầu cho các đảng nhỏ dưới 5% không chuyển thành ghế nghị sĩ. Tuy nhiên Tòa án Hiến pháp công nhận điều này là hợp hiến để bảo vệ khả năng vận hành của Quốc hội."
              }
            ],
                
                vokabeln: [
                  { de: "Sperrklausel", vi: "điều khoản ngăn chặn (rào cản)" },
                  { de: "5 %-Hürde", vi: "rào cản 5 % phiếu bầu" },
                  { de: "Grundmandatsklausel", vi: "điều khoản ghế trực tiếp tối thiểu (3 ghế)" },
                  { de: "Zersplitterung", vi: "sự phân mảnh / chia nhỏ quốc hội" },
                  { de: "Weimarer Republik", vi: "Cộng hòa Weimar (1919–1933)" }
                ]
              },
              {
                id: "vertrauensfrage",
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
                name: "Vertrauensfrage & Misstrauensvotum",
                desc: "Art. 68 GG vs. Art. 67 GG · Konstruktiver Kanzlersturz · Stabilität",
                keyPoints: [
                  "<b>Vertrauensfrage (Art. 68 GG):</b> Geht vom Bundeskanzler aus, um die Mehrheit im Bundestag zu testen.",
                  "<b>Konstruktives Misstrauensvotum (Art. 67 GG):</b> Bundestag stürzt Kanzler nur bei gleichzeitiger Wahl eines Nachfolgers.",
                  "<b>Bedeutung „konstruktiv“:</b> Verhindert Regierungskrise ohne Kanzler (Schutz vor Machtvakuum).",
                  "<b>Folge bei verlorener Vertrauensfrage:</b> Bundespräsident kann Bundestag auflösen → Neuwahlen.",
                  "<b>Beispiele:</b> 1982 Helmut Schmidt gestürzt → Helmut Kohl; Dez 2024 Olaf Scholz → Neuwahlen Feb 2025."
                ],
                content: `
                  <h2>§ 4 <span class="term" data-de="Vertrauensfrage" data-vi="bỏ phiếu tín nhiệm (Art. 68 GG)">Vertrauensfrage</span> &amp; <span class="term" data-de="konstruktives Misstrauensvotum" data-vi="bất tín nhiệm xây dựng (Art. 67 GG)">Misstrauensvotum</span></h2>
                  <div class="hint">Regierungsstabilität &amp; vorzeitiges Ende einer Kanzlerschaft</div>

                  <h3 class="sub">1. Vertrauensfrage vs. Konstruktives Misstrauensvotum</h3>
                  <table>
                    <tr><th>Kriterium</th><th><span class="term" data-de="Vertrauensfrage" data-vi="bỏ phiếu tín nhiệm">Vertrauensfrage</span> (Art. 68 GG)</th><th><span class="term" data-de="konstruktives Misstrauensvotum" data-vi="bỏ phiếu bất tín nhiệm xây dựng">Konstruktives Misstrauensvotum</span> (Art. 67 GG)</th></tr>
                    <tr><td><b>Wer ergreift die Initiative?</b></td><td>Der <b><span class="term" data-de="Bundeskanzler" data-vi="Thủ tướng Liên bang">Bundeskanzler</span></b></td><td>Der <b>Bundestag</b> (Parlamentsmehrheit)</td></tr>
                    <tr><td><b>Inhalt &amp; Antrag</b></td><td>Kanzler beantragt, dass ihm der Bundestag das Vertrauen ausspricht</td><td>Bundestag entzieht Kanzler das Vertrauen und wählt <b>zugleich einen Nachfolger</b></td></tr>
                    <tr><td><b>Erforderliche Mehrheit</b></td><td>Absolute Mehrheit der Mitglieder des Bundestages</td><td>Absolute Mehrheit der Mitglieder des Bundestages für den Gegenkandidaten</td></tr>
                    <tr><td><b>Rechtsfolge bei Misserfolg</b></td><td>Verliert der Kanzler, kann der <span class="term" data-de="Bundespräsident" data-vi="Tổng thống Liên bang">Bundespräsident</span> den Bundestag auflösen &rarr; <b><span class="term" data-de="Neuwahlen" data-vi="bầu cử lại / trước hạn">Neuwahlen</span></b></td><td>Der alte Kanzler ist sofort entlassen; der Bundespräsident ernennt den neuen Kanzler</td></tr>
                    <tr><td><b>Zweck</b></td><td>Kanzler prüft, ob seine Koalitionsmehrheit noch steht (oder strebt gezielt Neuwahlen an)</td><td>Kanzlersturz durch das Parlament, aber nur bei vorhandener regierungsfähiger Alternative</td></tr>
                  </table>

                  <h3 class="sub">2. Das Prinzip der „Konstruktivität“</h3>
                  <div class="formula"><b>Warum „konstruktiv“?</b> Ein Kanzler kann im Grundgesetz nicht einfach abgewählt werden, ohne dass <b>im selben Wahlgang ein neuer Bundeskanzler mit absoluter Mehrheit gewählt wird</b>. Dies verhindert ein gefährliches Machtvakuum.</div>

                  <h3 class="sub">3. Historische und aktuelle Beispiele</h3>
                  <ul>
                    <li><b>1982:</b> Helmut Schmidt (SPD) verlor die FDP als Koalitionspartner. Helmut Kohl (CDU) wurde durch ein konstruktives Misstrauensvotum neuer Bundeskanzler.</li>
                    <li><b>Dezember 2024:</b> Olaf Scholz (SPD) stellte nach dem Bruch der Ampel-Koalition die Vertrauensfrage und verlor sie. Bundespräsident Frank-Walter Steinmeier leitete die <span class="term" data-de="Auflösung des Bundestages" data-vi="giải tán Quốc hội">Auflösung des Bundestages</span> ein &rarr; Neuwahlen im Februar 2025.</li>
                  </ul>
              <div class="vi"><b>Tóm tắt Tiếng Việt — So sánh toàn diện Vertrauensfrage (Art. 68 GG) & Konstruktives Misstrauensvotum (Art. 67 GG):</b><ul><li>Bảng đối chiếu chi tiết dùng cho kỳ thi KA ngày 12.10: Ai là người khởi xướng (Kanzler vs. Bundestag), mục tiêu chính trị (kiểm tra sự ủng hộ của liên minh hoặc mở đường giải tán Quốc hội bầu cử sớm vs. thay thế Thủ tướng ngay tại nghị trường), đa số phiếu cần thiết (<b>Kanzlermehrheit</b> = trên 50% tổng số nghị sĩ Bundestag) và hệ quả pháp lý.</li></ul></div>
            `,
            "qa": [
              {
                "q": "Was versteht man unter der „Kanzlermehrheit“ im Grundgesetz?",
                "qVi": "Khái niệm „Kanzlermehrheit“ (Đa số Thủ tướng) trong Hiến pháp Đức nghĩa là gì?",
                "a": "Die <b>absolute Mehrheit der gesetzlichen Mitglieder des Bundestages</b> (also mehr als 50 % aller Abgeordneten, bei 630 Sitzen mindestens <b>316 Stimmen</b> – nicht bloß die Mehrheit der zufällig Anwesenden). Sie ist für die Kanzlerwahl (Art. 63), das konstruktive Misstrauensvotum (Art. 67) und die Vertrauensfrage (Art. 68) erforderlich.",
                "aVi": "Là <b>đa số tuyệt đối trên tổng số nghị sĩ theo luật định của Quốc hội Liên bang</b> (hơn 50% tổng số ghế, tức tối thiểu <b>316/630 phiếu</b> chứ không chỉ tính trên số nghị sĩ có mặt tại phiên họp). Đa số này áp dụng khi bầu Thủ tướng (Điều 63), bỏ phiếu bất tín nhiệm (Điều 67) và bỏ phiếu tín nhiệm (Điều 68)."
              },
              {
                "q": "Was passiert, wenn eine Vertrauensfrage des Bundeskanzlers nach Art. 68 GG keine Mehrheit findet?",
                "qVi": "Chuyện gì xảy ra nếu cuộc bỏ phiếu tín nhiệm của Thủ tướng theo Điều 68 GG không đạt được đa số?",
                "a": "Der Bundeskanzler muss nicht zurücktreten, kann aber dem <b>Bundespräsidenten</b> vorschlagen, den <b>Bundestag innerhalb von 21 Tagen aufzulösen</b>, sodass es innerhalb von 60 Tagen zu <b>Neuwahlen</b> kommt (sofern der Bundestag nicht zwischenzeitlich mit Kanzlermehrheit einen neuen Kanzler wählt).",
                "aVi": "Thủ tướng không bắt buộc phải từ chức, nhưng có thể đề nghị <b>Tổng thống Liên bang giải tán Quốc hội trong vòng 21 ngày</b> để tổ chức <b>bầu cử Quốc hội mới</b> trong vòng 60 ngày (trừ khi Quốc hội bầu được một Thủ tướng mới trong thời gian đó)."
              }
            ],
                
                vokabeln: [
                  { de: "Vertrauensfrage", vi: "cuộc bỏ phiếu tín nhiệm (Thủ tướng yêu cầu)" },
                  { de: "konstruktives Misstrauensvotum", vi: "bỏ phiếu bất tín nhiệm mang tính xây dựng" },
                  { de: "Bundeskanzler", vi: "Thủ tướng liên bang Đức" },
                  { de: "Bundespräsident", vi: "Tổng thống liên bang Đức" },
                  { de: "Auflösung des Bundestages", vi: "giải tán Quốc hội" },
                  { de: "Neuwahlen", vi: "bầu cử lại / bầu cử trước thời hạn" }
                ]
              },
              {
                id: "statistik-analyse",
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
                name: "Statistik analysieren (Methode)",
                desc: "3 Schritte: Einleitung · Analyse · Fazit · Formulierungshilfen · Fallbeispiele",
                keyPoints: [
                  "<b>Dreischritt der Analyse:</b> 1. Einleitung (Basisdaten), 2. Analyse (konkrete Zahlen & Vergleiche), 3. Fazit (Zusammenfassung & Ursachen).",
                  "<b>Analyse-Gebot:</b> Ausschließlich Fakten und Zahlen aus der Grafik nennen – keine persönliche Meinung!",
                  "<b>Fazit-Gebot:</b> Begründungen stets vorsichtig als Vermutung formulieren („Mögliche Gründe könnten sein...“).",
                  "<b>Wahlergebnis BW:</b> CDU/CSU 30,6 % (Spitze), AfD 19,8 %, SPD 14,2 %, Grüne 13,8 %, BSW 4,1 %.",
                  "<b>Alterspyramide Bundestag:</b> 40–59 Jahre dominieren; Frauen und Jüngere (&lt;30) sind unterrepräsentiert."
                ],
                content: `
                  <h2>§ 5 <span class="term" data-de="Statistikanalyse" data-vi="phân tích số liệu thống kê">Statistik analysieren</span> (Methodenkompetenz)</h2>
                  <div class="hint">Dreischritt: Einleitung – Analyse – Fazit &amp; nützliche Redemittel</div>

                  <h3 class="sub">1. Der Dreischritt einer perfekten Statistikanalyse</h3>
                  <table>
                    <tr><th>Teil</th><th>Was muss zwingend hinein?</th></tr>
                    <tr>
                      <td><b>1. <span class="term" data-de="Einleitung" data-vi="phần mở bài">Einleitung</span></b><br><span class="muted">Mở bài</span></td>
                      <td>• <b>Thema</b> der Statistik<br>• <b>Darstellungsform</b> (z. B. <span class="term" data-de="Balkendiagramm" data-vi="biểu đồ thanh">Balkendiagramm</span>, <span class="term" data-de="Kreisdiagramm" data-vi="biểu đồ tròn">Kreisdiagramm</span>, <span class="term" data-de="Säulendiagramm" data-vi="biểu đồ cột">Säulendiagramm</span>)<br>• <b>Einheit</b> (z. B. Prozent, absolute Zahlen)<br>• <b>Quelle</b> (z. B. Infratest dimap, Statistisches Bundesamt)<br>• <b>Erscheinungsjahr</b> / Erhebungszeitraum</td>
                    </tr>
                    <tr>
                      <td><b>2. <span class="term" data-de="Analyse" data-vi="phần phân tích">Analyse</span></b><br><span class="muted">Phân tích</span></td>
                      <td>• <b>Höchster</b> Wert (Spitzenreiter)<br>• <b>Niedrigster</b> Wert<br>• <b>Auffälligkeiten &amp; Vergleiche</b> (wer liegt gleichauf, wer hat großen Abstand?)<br>• <i>Wichtig:</i> Immer die <b>exakten Zahlen</b> nennen! <i>Keine</i> eigene Meinung in diesen Teil!</td>
                    </tr>
                    <tr>
                      <td><b>3. <span class="term" data-de="Fazit" data-vi="kết luận / nhận định">Fazit</span></b><br><span class="muted">Kết luận</span></td>
                      <td>• Kurze Zusammenfassung der Kernaussage<br>• <b>Vorsichtige Begründung</b> / Deutung möglicher Ursachen<br>• Formulierung: „Mögliche Gründe könnten sein, dass...“</td>
                    </tr>
                  </table>

                  <h3 class="sub">2. Redemittel &amp; Formulierungshilfen</h3>
                  <table>
                    <tr><th>Deutsch</th><th>Tiếng Việt</th></tr>
                    <tr><td>Das Thema der vorliegenden Statistik lautet …</td><td>Chủ đề của bảng thống kê này là …</td></tr>
                    <tr><td>Die Daten werden in einem Balkendiagramm in Prozent dargestellt.</td><td>Số liệu được thể hiện qua biểu đồ cột theo tỷ lệ phần trăm.</td></tr>
                    <tr><td>Die Quelle ist … (z. B. Infratest dimap).</td><td>Nguồn dữ liệu là …</td></tr>
                    <tr><td>Mit … % hat … den höchsten Stimmenanteil erzielt.</td><td>Với … %, … đạt tỷ lệ phiếu bầu cao nhất.</td></tr>
                    <tr><td>Dagegen erhielt … mit lediglich … % das schwächste Ergebnis.</td><td>Ngược lại, … chỉ đạt kết quả thấp nhất với … %.</td></tr>
                    <tr><td>Fast gleichauf liegen … mit … % und … mit … %.</td><td>Gần như bằng điểm nhau là … và …</td></tr>
                    <tr><td>Deutlich vor / hinter … liegt … mit … %.</td><td>Xếp vượt trội / thấp hơn rõ rệt so với … là …</td></tr>
                    <tr><td>Zusammenfassend lässt sich sagen, dass …</td><td>Tóm lại có thể rút ra nhận định rằng …</td></tr>
                    <tr><td>Mögliche Gründe dafür könnten sein, dass Wähler …</td><td>Những nguyên nhân khả dĩ cho điều này có thể là do cử tri …</td></tr>
                  </table>

                  <h3 class="sub">3. Musterbeispiel: Bundestagswahl in Baden-Württemberg</h3>
                  <div class="formula"><b>Daten:</b> CDU/CSU 30,6 % · AfD 19,8 % · SPD 14,2 % · Grüne 13,8 % · Linke 6,8 % · FDP 5,6 % · BSW 4,1 %</div>
                  <ul>
                    <li><b>Einleitung:</b> Das Thema der Statistik lautet „Ergebnisse der Bundestagswahl in Baden-Württemberg“. Die Daten werden in einem Balkendiagramm in Prozent dargestellt. Die Quelle ist Infratest dimap.</li>
                    <li><b>Analyse:</b> Mit 30,6 % erzielte die CDU/CSU das mit Abstand stärkste Ergebnis. Die AfD folgt mit 19,8 % auf Rang zwei und liegt damit deutlich vor SPD (14,2 %) und Grünen (13,8 %), die nahezu gleichauf liegen. Linke (6,8 %) und FDP (5,6 %) überwinden die 5 %-Hürde knapp, während das BSW mit 4,1 % das schwächste Ergebnis verzeichnet und scheitert.</li>
                    <li><b>Fazit:</b> Zusammenfassend behauptet die CDU ihre Vormachtstellung in BW, während Oppositionsparteien zulegen konnten. Mögliche Gründe könnten sein, dass viele Wähler Stabilität suchen oder Unmut über die Wirtschaftslage ausdrücken wollten.</li>
                  </ul>
              <div class="vi"><b>Tóm tắt Tiếng Việt — Phương pháp 3 bước phân tích bảng biểu & số liệu thống kê trong môn GK:</b><ol><li><b>Bước 1 – Beschreibung (Mô tả hình thức & nội dung):</b> Nêu chủ đề (Thema), nguồn phát hành (Herausgeber/Quelle), năm khảo sát (Erhebungszeitraum), đối tượng/cỡ mẫu (Befragte), loại biểu đồ (Diagrammtyp), đơn vị tính (Prozent, absolute Zahlen) và các giá trị cực đại/cực tiểu (Maximum/Minimum) cùng xu hướng chính.</li><li><b>Bước 2 – Erklärung / Deutung (Giải thích nguyên nhân chính trị – xã hội):</b> Kết nối các con số với kiến thức GK (tại sao tỷ lệ đi bầu thay đổi, tại sao giới trẻ hoặc nhóm thu nhập thấp ít đi bầu hơn...).</li><li><b>Bước 3 – Bewertung / Kritische Prüfung (Đánh giá độ tin cậy & hệ quả):</b> Kiểm tra xem nguồn có khách quan không, trục biểu đồ có bị cắt xén gây hiểu lầm (Manipulation) không, và rút ra kết luận chính trị.</li></ol></div>
            `,
            "qa": [
              {
                "q": "Wie kann eine Statistik oder ein Diagramm optisch manipuliert sein, um den Betrachter zu täuschen?",
                "qVi": "Một thống kê hoặc biểu đồ có thể bị thao túng thị giác như thế nào để đánh lừa người xem?",
                "a": "<ul><li><b>Verkürzte oder nicht bei null beginnende y-Achse:</b> Kleine Unterschiede wirken dadurch dramatisch groß.</li><li><b>Unregelmäßige Zeitabstände</b> auf der x-Achse oder <b>einseitige Auswahl des Vergleichszeitraums</b>.</li><li><b>Verschweigen der Befragtenzahl (Stichprobe)</b> oder unklare Bezugsgrößen (Prozent vs. Prozentpunkte).</li></ul>",
                "aVi": "<ul><li><b>Trục tung (y-Achse) bị cắt bớt không bắt đầu từ số 0:</b> Khiến những chênh lệch rất nhỏ trông có vẻ cực kỳ lớn.</li><li><b>Khoảng cách thời gian không đều</b> trên trục hoành hoặc <b>chọn mốc thời gian so sánh có chủ đích</b>.</li><li><b>Giấu cỡ mẫu khảo sát</b> hoặc đánh tráo giữa phần trăm (%) và điểm phần trăm (Prozentpunkte).</li></ul>"
              },
              {
                "q": "Was ist der Unterschied zwischen „Prozent (%)“ und „Prozentpunkten“?",
                "qVi": "Sự khác biệt giữa „Phần trăm (%)“ và „Điểm phần trăm (Prozentpunkte)“ là gì?",
                "a": "Steigt der Stimmenanteil einer Partei von <b>10 % auf 15 %</b>, so ist das ein Anstieg um <b>5 Prozentpunkte</b> (absolute Differenz der Prozentwerte), aber relativ gesehen ein Zuwachs um <b>50 Prozent</b>.",
                "aVi": "Nếu tỷ lệ phiếu của một đảng tăng từ <b>10% lên 15%</b>, mức tăng tuyệt đối giữa hai con số phần trăm là <b>5 điểm phần trăm (5 Prozentpunkte)</b>, còn xét tương đối thì số phiếu đã tăng thêm <b>50 phần trăm (50%)</b>."
              }
            ],
                
                vokabeln: [
                  { de: "Statistikanalyse", vi: "phân tích số liệu thống kê" },
                  { de: "Balkendiagramm", vi: "biểu đồ thanh ngang / cột" },
                  { de: "Einleitung", vi: "phần mở bài" },
                  { de: "Analyse", vi: "phần phân tích dữ liệu" },
                  { de: "Fazit", vi: "phần kết luận / nhận định" },
                  { de: "Bevölkerungspyramide", vi: "tháp dân số / cơ cấu tuổi" }
                ]
              },
              {
                id: "kalter-krieg",
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
                name: "Kalter Krieg & Deutsche Teilung (1945–1990)",
                desc: "Ost-West-Konflikt · Merkmale · Gleichgewicht des Schreckens · Chronologie",
                keyPoints: [
                  "<b>Definition:</b> Globaler Ost-West-Konflikt zwischen den Supermächten USA und UdSSR nach dem Zweiten Weltkrieg.",
                  "<b>Merkmale:</b> Wettrüsten, atomare Abschreckung, Propaganda und Stellvertreterkriege – kein direkter Militärschlag gegeneinander.",
                  "<b>Begriffsursprung:</b> 1947 vom US-Publizisten Walter Lippmann geprägt; Truman-Doktrin formulierte Systemspaltung.",
                  "<b>Gleichgewicht des Schreckens:</b> Beide Seiten besaßen genug Nuklearwaffen zur gegenseitigen Totalvernichtung (Overkill).",
                  "<b>Wichtige Daten:</b> Mai 1949 GG/BRD · Okt 1949 DDR · 13.08.1961 Mauerbau · 09.11.1989 Mauerfall · 03.10.1990 Wiedervereinigung."
                ],
                content: `
                  <h2>§ 6 Kalter Krieg &amp; Deutsche Teilung (1945–1990)</h2>
                  <div class="hint">Ideologischer Konflikt, Wettrüsten &amp; Chronologie der deutschen Einheit</div>

                  <h3 class="sub">1. Was war der Kalte Krieg?</h3>
                  <div class="formula"><b>Definition:</b> Der Kalte Krieg war die Konfrontation im Rahmen des <b>Ost-West-Konflikts</b> zwischen der westlichen Welt unter Führung der <b>USA</b> und dem Ostblock unter Führung der <b>UdSSR</b> von 1945 bis 1990.</div>

                  <p>Er wurde <b>nie als direkter Krieg</b> zwischen den Supermächten geführt, sondern war geprägt von <span class="term" data-de="Wettrüsten" data-vi="chạy đua vũ trang">Wettrüsten</span>, Drohung mit Atomwaffen, Propaganda und <span class="term" data-de="Stellvertreterkriege" data-vi="chiến tranh ủy nhiệm">Stellvertreterkriegen</span> (z. B. Korea- und Vietnamkrieg).</p>

                  <h3 class="sub">2. Die beiden Systeme im Systemvergleich</h3>
                  <table>
                    <tr><th>Bereich</th><th>Westblock (USA, BRD, Westeuropa)</th><th>Ostblock (UdSSR, DDR, Osteuropa)</th></tr>
                    <tr><td><b>Staatsform</b></td><td><span class="term" data-de="Demokratie" data-vi="dân chủ">Demokratie</span> (Gewaltenteilung, Menschenrechte)</td><td><span class="term" data-de="Diktatur" data-vi="độc tài">Diktatur</span> (Einparteienherrschaft, SED)</td></tr>
                    <tr><td><b>Gesellschaft</b></td><td>Freiheitlich, Pluralismus, <span class="term" data-de="Kapitalismus" data-vi="chủ nghĩa tư bản">Kapitalismus</span></td><td><span class="term" data-de="Sozialismus" data-vi="chủ nghĩa xã hội">Sozialismus</span>, Kollektivismus</td></tr>
                    <tr><td><b>Wirtschaftssystem</b></td><td>Soziale <span class="term" data-de="Marktwirtschaft" data-vi="kinh tế thị trường">Marktwirtschaft</span></td><td>Zentral gesteuerte <span class="term" data-de="Planwirtschaft" data-vi="kinh tế kế hoạch hóa">Planwirtschaft</span></td></tr>
                    <tr><td><b>Militärbündnis</b></td><td><span class="term" data-de="NATO" data-vi="Khối quân sự Bắc Đại Tây Dương (NATO)">NATO</span> (gegründet 1949)</td><td><span class="term" data-de="Warschauer Pakt" data-vi="Khối Hiệp ước Warszawa">Warschauer Pakt</span> (gegründet 1955)</td></tr>
                  </table>

                  <h3 class="sub">3. Wichtige Begriffe des Kalten Krieges</h3>
                  <ul>
                    <li><b>Gleichgewicht des Schreckens:</b> Beide Seiten besaßen so viele Atomwaffen, dass ein Erstschlag die Vernichtung beider Seiten zur Folge gehabt hätte. Diese Abschreckung verhinderte den Dritten Weltkrieg.</li>
                    <li><b>Walter Lippmann (1947):</b> US-Publizist, der den Begriff „Kalter Krieg“ (Cold War) prägte und weltweit bekannt machte.</li>
                    <li><b>Höhepunkte:</b> Berliner Mauerbau (1961), Kubakrise (1962), US-Mondlandung (1969).</li>
                  </ul>

                  <h3 class="sub">4. Chronologie der deutschen Teilung und Wiedervereinigung</h3>
                  <table>
                    <tr><th>Datum</th><th>Historisches Ereignis</th><th>Bedeutung für Deutschland</th></tr>
                    <tr><td><b>08. Mai 1945</b></td><td>Kapitulation der Wehrmacht</td><td>Ende des Zweiten Weltkriegs in Europa; Aufteilung in 4 Besatzungszonen.</td></tr>
                    <tr><td><b>23. Mai 1949</b></td><td>Verkündung des Grundgesetzes</td><td>Gründung der <b>Bundesrepublik Deutschland (BRD)</b>; Konrad Adenauer Kanzler.</td></tr>
                    <tr><td><b>07. Oktober 1949</b></td><td>Gründung der DDR</td><td>Gründung der <b>Deutschen Demokratischen Republik</b>; Walter Ulbricht an der Spitze.</td></tr>
                    <tr><td><b>13. August 1961</b></td><td>Bau der Berliner Mauer</td><td>Abriegelung Westberlins durch die DDR; Zementierung der Teilung.</td></tr>
                    <tr><td><b>09. November 1989</b></td><td>Fall der Berliner Mauer</td><td>Öffnung der innerdeutschen Grenze nach friedlicher Revolution in der DDR.</td></tr>
                    <tr><td><b>03. Oktober 1990</b></td><td>Wiedervereinigung</td><td>Beitritt der DDR zur BRD; Nationalfeiertag (Tag der Deutschen Einheit).</td></tr>
                    <tr><td><b>02. Dezember 1990</b></td><td>Erste gesamtdeutsche Wahl</td><td>Helmut Kohl bleibt Bundeskanzler des wiedervereinigten Deutschlands.</td></tr>
                  </table>
              <div class="vi"><b>Tóm tắt Tiếng Việt — Chiến tranh Lạnh (Kalter Krieg 1945/47–1989/91) & Sự chia cắt nước Đức:</b><ul><li><b>Thế giới lưỡng cực (Bipolarität):</b> Đối đầu toàn diện về hệ tư tưởng, chính trị, kinh tế và quân sự giữa <b>Khối phương Tây (USA & NATO – Dân chủ tự do + Kinh tế thị trường tư bản)</b> và <b>Khối phía Đông (Liên Xô UdSSR & Khối Hiệp ước Warszawa – Độc đảng XHCN + Kinh tế kế hoạch tập trung)</b> mà không xảy ra chiến tranh trực tiếp bằng vũ khí hạt nhân giữa hai siêu cường (nhưng có các cuộc chiến tranh ủy nhiệm <i>Stellvertreterkriege</i> như Triều Tiên, Việt Nam, Afghanistan).</li><li><b>Các mốc lịch sử trọng tâm:</b> Phong tỏa Berlin & Cầu hàng không (1948/49) → Thành lập BRD & DDR (1949) → Xây dựng Bức tường Berlin (13.08.1961) → Khủng hoảng tên lửa Cuba (1962) → Sụp đổ Bức tường Berlin (09.11.1989) & Tái thống nhất nước Đức (03.10.1990).</li></ul></div>
            `,
            "qa": [
              {
                "q": "Warum bezeichnet man den Konflikt zwischen den USA und der UdSSR (1947–1989/91) als „Kalten Krieg“?",
                "qVi": "Tại sao cuộc đối đầu giữa Mỹ (USA) và Liên Xô (UdSSR) giai đoạn 1947–1989/91 được gọi là „Chiến tranh Lạnh“ (Kalter Krieg)?",
                "a": "Weil sich die beiden nuklearen Supermächte <b>USA (NATO)</b> und <b>UdSSR (Warschauer Pakt)</b> zwar politisch, ideologisch, wirtschaftlich und durch Wettrüsten feindlich gegenüberstanden, es aber aus Angst vor der gegenseitigen atomaren Vernichtung (<b>Gleichgewicht des Schreckens</b>) zu <b>keiner direkten militärischen Konfrontation („heißer Krieg“)</b> zwischen ihnen kam, sondern zu <b>Stellvertreterkriegen</b> (z. B. Korea, Vietnam, Afghanistan).",
                "aVi": "Vì hai siêu cường hạt nhân <b>Mỹ (NATO)</b> và <b>Liên Xô (Khối Warszawa)</b> đối đầu gay gắt về chính trị, hệ tư tưởng, kinh tế và chạy đua vũ trang, nhưng do sự răn đe hủy diệt hạt nhân lẫn nhau (<b>Cân bằng khủng bố</b>) nên <b>không nổ ra chiến tranh quân sự trực tiếp („chiến tranh nóng“)</b> giữa hai nước, mà diễn ra qua các <b>cuộc chiến tranh ủy nhiệm (Stellvertreterkriege)</b>."
              },
              {
                "q": "In welchen zentralen Punkten unterschieden sich das westliche System (USA/BRD) und das östliche System (UdSSR/DDR)?",
                "qVi": "Hệ thống phương Tây (Mỹ/Tây Đức BRD) và hệ thống phương Đông (Liên Xô/Đông Đức DDR) khác biệt nhau ở những điểm cốt lõi nào?",
                "a": "<ul><li><b>Westblock (USA / BRD):</b> Parlamentarische Mehrparteiendemokratie, Rechtsstaat und Grundrechte, <b>kapitalistische / soziale Marktwirtschaft</b> (Privateigentum, freier Wettbewerb), Militärbündnis <b>NATO</b>.</li><li><b>Ostblock (UdSSR / DDR):</b> Sozialistische <b>Einparteienherrschaft (Zentralismus)</b>, <b>Zentralverwaltungswirtschaft (Planwirtschaft</b> mit Staatseigentum und Fünfjahresplänen), Militärbündnis <b>Warschauer Pakt</b>.</li></ul>",
                "aVi": "<ul><li><b>Khối phương Tây (Mỹ / Tây Đức BRD):</b> Dân chủ nghị viện đa đảng, nhà nước pháp quyền bảo vệ quyền cơ bản, <b>kinh tế thị trường tư bản / xã hội</b> (sở hữu tư nhân, cạnh tranh tự do), liên minh quân sự <b>NATO</b>.</li><li><b>Khối phía Đông (Liên Xô / Đông Đức DDR):</b> Chế độ <b>độc đảng XHCN tập quyền</b>, <b>kinh tế kế hoạch hóa tập trung (Planwirtschaft</b> với sở hữu nhà nước và kế hoạch 5 năm), liên minh quân sự <b>Hiệp ước Warszawa</b>.</li></ul>"
              }
            ],
                
                vokabeln: [
                  { de: "Kalter Krieg", vi: "Chiến tranh Lạnh (1945–1990)" },
                  { de: "Wettrüsten", vi: "chạy đua vũ trang" },
                  { de: "Gleichgewicht des Schreckens", vi: "cân bằng nỗi sợ hãi (răn đe hạt nhân)" },
                  { de: "Stellvertreterkriege", vi: "chiến tranh ủy nhiệm" },
                  { de: "Planwirtschaft", vi: "kinh tế kế hoạch hóa tập trung" },
                  { de: "Marktwirtschaft", vi: "kinh tế thị trường" },
                  { de: "Mauerbau", vi: "sự kiện xây Bức tường Berlin (13.08.1961)" },
                  { de: "Wiedervereinigung", vi: "sự kiện thống nhất nước Đức (03.10.1990)" }
                ]
              },
              {
                id: "zentralismus",
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="9" y1="22" x2="9" y2="18"/><line x1="15" y1="22" x2="15" y2="18"/></svg>',
                name: "Zentralismus, Dezentralisierung & Staatsformen",
                desc: "Zentralismus vs. Föderalismus · Demokratie vs. Diktatur im Systemvergleich",
                keyPoints: [
                  "<b>Zentralismus:</b> Alle Macht und Entscheidungen liegen bei der Zentralregierung in der Hauptstadt (Beispiel: DDR).",
                  "<b>Dezentralisierung (Föderalismus):</b> Aufgabenverteilung auf Bund, 16 Bundesländer und Kommunen (Beispiel: BRD).",
                  "<b>Vorteile Dezentralisierung:</b> Bürgernähe, Berücksichtigung regionaler Bedürfnisse, Machtbegrenzung.",
                  "<b>Demokratie:</b> Volkssouveränität, Gewaltenteilung, Grundrechte, freie Wahlen und Rechtsstaatlichkeit.",
                  "<b>Diktatur:</b> Machtmonopol einer Person/Partei, Zensur, Verletzung der Menschenrechte, keine Gewaltenteilung."
                ],
                content: `
                  <h2>§ 7 <span class="term" data-de="Zentralismus" data-vi="chế độ tập quyền">Zentralismus</span>, <span class="term" data-de="Dezentralisierung" data-vi="sự phân quyền">Dezentralisierung</span> &amp; Staatsformen</h2>
                  <div class="hint">Staatsaufbau im Vergleich: Föderalismus vs. Zentralstaat &amp; Demokratie vs. Diktatur</div>

                  <h3 class="sub">1. Zentralismus vs. Dezentralisierung (Föderalismus)</h3>
                  <table>
                    <tr><th>Kriterium</th><th><span class="term" data-de="Zentralismus" data-vi="chế độ tập quyền">Zentralismus</span> (Tập quyền)</th><th><span class="term" data-de="Dezentralisierung" data-vi="sự phân quyền">Dezentralisierung</span> / <span class="term" data-de="Föderalismus" data-vi="chế độ liên bang">Föderalismus</span> (Phân quyền)</th></tr>
                    <tr><td><b>Definition</b></td><td>Entscheidungsgewalt liegt konzentriert bei einer zentralen Stelle in der Hauptstadt.</td><td>Aufgaben, Kompetenzen und Finanzen werden auf Bund, Länder und Gemeinden aufgeteilt.</td></tr>
                    <tr><td><b>Rolle der Regionen</b></td><td>Untergeordnete Verwaltungseinheiten ohne nennenswerte eigene Autonomie.</td><td>Eigenständige Gliedstaaten (Bundesländer) mit eigenen Parlamenten und Gesetzen.</td></tr>
                    <tr><td><b>Vorteile</b></td><td>Einheitliche Standards im gesamten Land, schnelle und unkomplizierte Entscheidungswege.</td><td>Größere <span class="term" data-de="Bürgernähe" data-vi="sự gần gũi với người dân">Bürgernähe</span>, Schutz vor Machtmissbrauch, Berücksichtigung regionaler Kultur.</td></tr>
                    <tr><td><b>Nachteile</b></td><td>Gefahr von Machtkonzentration, Vernachlässigung regionaler Interessen.</td><td>Komplizierte Abstimmungsprozesse, uneinheitliche Regelungen (z. B. Schulnoten).</td></tr>
                    <tr><td><b>Beispiel</b></td><td><b>DDR:</b> 1952 Auflösung der 5 Länder und Ersetzung durch 14 zentral geführte Bezirke.</td><td><b>BRD:</b> 16 Bundesländer; Bildungspolitik, Polizei und Kulturhoheit liegen bei den Ländern.</td></tr>
                  </table>

                  <h3 class="sub">2. Systemvergleich: Demokratie vs. Diktatur</h3>
                  <table>
                    <tr><th>Merkmal</th><th><span class="term" data-de="Demokratie" data-vi="chế độ dân chủ">Demokratie</span> (Dân chủ)</th><th><span class="term" data-de="Diktatur" data-vi="chế độ độc tài">Diktatur</span> (Độc tài)</th></tr>
                    <tr><td><b>Souveränität</b></td><td><b><span class="term" data-de="Volkssouveränität" data-vi="chủ quyền nhân dân">Volkssouveränität</span>:</b> Alle Staatsgewalt geht vom Volke aus (Art. 20 GG).</td><td><b>Machtmonopol:</b> Herrschaft eines Alleinherrschers oder einer Einheitspartei.</td></tr>
                    <tr><td><b>Gewaltenteilung</b></td><td>Strikte Trennung in Legislative, Exekutive und Judikative (<span class="term" data-de="Gewaltenteilung" data-vi="tam quyền phân lập">Gewaltenteilung</span>).</td><td>Keine Gewaltenteilung; Justiz und Polizei unterstehen dem Diktator.</td></tr>
                    <tr><td><b>Grundrechte</b></td><td>Umfassender Grundrechtekatalog; einklagbar vor unabhängigen Gerichten.</td><td>Menschenrechte werden missachtet; Zensur, Willkür, Verfolgung Andersdenkender.</td></tr>
                    <tr><td><b>Partizipation</b></td><td>Freie, geheime, gleiche, unmittelbare und allgemeine Wahlen; Opposition existiert.</td><td>Scheinwahlen oder Wahlverbot; keine legale Opposition geduldet.</td></tr>
                  </table>
              <div class="vi"><b>Tóm tắt Tiếng Việt — Đối chiếu Chế độ Tập quyền độc đảng (Zentralismus / Diktatur) vs. Dân chủ Liên bang (Föderale Demokratie):</b><ul><li><b>Zentralismus / Demokratischer Zentralismus (VD: Đông Đức DDR / Liên Xô):</b> Quyền lực tập trung tuyệt đối vào một đảng duy nhất (SED/KPdSU) từ trên xuống dưới (<i>von oben nach unten</i>); xóa bỏ các tiểu bang (1952 chia thành 14 Bezirke phụ thuộc trung ương Đông Berlin); không có tam quyền phân lập, tòa án và báo chí chịu sự chỉ đạo của Đảng; bầu cử theo danh sách thống nhất (Einheitsliste) không có đối lập thực sự.</li><li><b>Föderale Demokratie (Cộng hòa Liên bang Đức BRD):</b> Quyền lực từ nhân dân đi lên (<i>von unten nach oben</i>); đa đảng cạnh tranh tự do; tam quyền phân lập ngang & dọc (Liên bang – 16 Tiểu bang); tòa án và báo chí độc lập.</li></ul></div>
            `,
            "qa": [
              {
                "q": "Was versteht man unter „Zentralismus“ im Gegensatz zum „Föderalismus“ und zur „Demokratie“?",
                "qVi": "„Tập quyền (Zentralismus)“ có nghĩa là gì khi đặt đối lập với „Chế độ Liên bang (Föderalismus)“ và „Dân chủ (Demokratie)“?",
                "a": "Im <b>Zentralismus</b> (insbesondere im „demokratischen Zentralismus“ sozialistischer Staaten wie der DDR) liegt alle politische und staatliche Macht bei einer <b>einzigen zentralen Führung (Einheitspartei)</b>; Entscheidungen erfolgen <b>von oben nach unten</b>, ohne Gewaltenteilung, ohne freie Opposition und ohne eigenständige Bundesländer. In der <b>föderalen Demokratie</b> geht die Macht durch freie Wahlen <b>von unten nach oben</b> und ist auf Bund, Länder und getrennte Staatsgewalten verteilt.",
                "aVi": "Trong chế độ <b>Tập quyền (Zentralismus)</b> (đặc biệt là tập trung dân chủ ở Đông Đức DDR), toàn bộ quyền lực nhà nước nằm trong tay <b>một ban lãnh đạo trung ương duy nhất (độc đảng)</b>; quyết định truyền <b>từ trên xuống dưới</b>, không có tam quyền phân lập, không có phe đối lập tự do và không có các tiểu bang tự chủ. Ngược lại, trong <b>Dân chủ Liên bang</b>, quyền lực đi <b>từ dưới lên trên</b> qua bầu cử tự do và được phân chia giữa Liên bang, Tiểu bang cùng 3 nhánh quyền lực độc lập."
              },
              {
                "q": "Wie unterschieden sich Wahlen in einer zentralistischen Einparteiendiktatur (z. B. DDR) von demokratischen Wahlen in der Bundesrepublik?",
                "qVi": "Bầu cử trong chế độ độc đảng tập quyền (VD: Đông Đức DDR) khác với bầu cử dân chủ tại Cộng hòa Liên bang Đức như thế nào?",
                "a": "In der DDR gab es sogenannte <b>Scheinwahlen mit einer Einheitsliste</b> der Nationalen Front ohne echte Auswahl zwischen konkurrierenden Parteien und mit starkem gesellschaftlichem Druck zum „Falten“ ohne Kabine (keine freie und geheime Wahl). In der BRD garantieren <b>Art. 38 GG</b> eine echte Auswahl zwischen mehreren Parteien sowie eine freie, gleiche und geheime Stimmabgabe.",
                "aVi": "Ở Đông Đức DDR là <b>bầu cử hình thức với một danh sách ứng viên thống nhất (Einheitsliste)</b>, không có sự cạnh tranh thực sự giữa các đảng đối lập và cử tri chịu áp lực xã hội không vào buồng kín (vi phạm nguyên tắc tự do và bỏ phiếu kín). Ở Tây Đức BRD, <b>Điều 38 GG</b> bảo đảm sự lựa chọn thực sự giữa nhiều đảng phái và lá phiếu tự do, bình đẳng, bí mật."
              }
            ],
                
                vokabeln: [
                  { de: "Zentralismus", vi: "chế độ tập quyền" },
                  { de: "Dezentralisierung", vi: "sự phân quyền / phi tập trung hóa" },
                  { de: "Föderalismus", vi: "chế độ liên bang" },
                  { de: "Bürgernähe", vi: "sự gần dân / sát với dân" },
                  { de: "Volkssouveränität", vi: "chủ quyền nhân dân" },
                  { de: "Gewaltenteilung", vi: "tam quyền phân lập" }
                ]
              }
            ]
          },
],
        quiz: [
          // --- Quests für Wahlen, Macht & Geschichte (KA 12.10.2026) ---
          // 1. Wahlrechtsgrundsätze & Wahlrecht (5 MC + 2 Fill)
          { theme:"wahlgrundsaetze", cat:"Wahlgrundsätze", q:"Welcher Wahlrechtsgrundsatz verbietet die Zwischenschaltung von Wahlmännern?", opts:["allgemein","unmittelbar","geheim","frei"], a:1, ex:"Unmittelbar bedeutet: Die Wähler stimmen direkt ohne Wahlmänner ab." },
          { theme:"wahlgrundsaetze", cat:"Wahlrecht", q:"Ab welchem Alter gilt das aktive Wahlrecht bei der Bundestagswahl?", opts:["16 Jahre","18 Jahre","21 Jahre","25 Jahre"], a:1, ex:"Vollendung des 18. Lebensjahres am Wahltag (aktives und passives Wahlrecht)." },
          { theme:"wahlgrundsaetze", cat:"Wahlrecht", q:"Warum gibt es in Deutschland keine gesetzliche Wahlpflicht?", opts:["Weil es keine Strafen gäbe","Weil der Grundsatz „frei“ auch das Recht garantiert, nicht zu wählen","Weil die Urnen zu klein sind","Weil Parteien verboten sind"], a:1, ex:"Frei bedeutet: Wahlentscheidung ohne Zwang, inklusive Nicht-Wählen." },
          { theme:"wahlgrundsaetze", cat:"Wahlgrundsätze", q:"Welcher Grundsatz besagt, dass jede abgegebene Stimme denselben Einfluss auf das Wahlergebnis hat?", opts:["frei","gleich","allgemein","geheim"], a:1, ex:"Gleich bedeutet: Jede Stimme hat denselben Zählwert und Erfolgswert." },
          { theme:"wahlgrundsaetze", cat:"Wahlgrundsätze", q:"Welcher Grundsatz verbietet den Ausschluss von Wählern aufgrund von Einkommen, Geschlecht oder Religion?", opts:["allgemein","unmittelbar","gleich","geheim"], a:0, ex:"Allgemein bedeutet: Alle Staatsbürger ab 18 dürfen wählen, ohne Diskriminierung." },
          { type:"fill", theme:"wahlgrundsaetze", cat:"Merkwort", q:"Wie lautet das Merkwort für die fünf Wahlrechtsgrundsätze im Grundgesetz?", answers:["a-u-f-g-g","aufgg"], answer:"A-U-F-G-G", ex:"Allgemein, unmittelbar, frei, gleich, geheim." },
          { type:"fill", theme:"wahlgrundsaetze", cat:"Wohnsitz", q:"Wie viele Monate muss man vor der Bundestagswahl mindestens seinen Wohnsitz in Deutschland haben?", answers:["3","3 monate","drei","drei monate"], answer:"3 Monate", ex:"Mindestens 3 Monate ununterbrochener Wohnsitz in Deutschland." },

          // 2. Erststimme & Zweitstimme (5 MC + 2 Fill)
          { theme:"erst-zweitstimme", cat:"Erststimme", q:"Wie viele Wahlkreise gibt es bei der Bundestagswahl für die Erststimme?", opts:["16","299","630","598"], a:1, ex:"Deutschland ist für die Erststimme in genau 299 Wahlkreise unterteilt." },
          { theme:"erst-zweitstimme", cat:"Zweitstimme", q:"Wofür steht die Zweitstimme bei der Bundestagswahl maßgeblich?", opts:["Wahl des Bundespräsidenten","Direktkandidat im Wahlkreis","Partei über die Landesliste (bestimmt Sitzverteilung)","Bürgermeister"], a:2, ex:"Die Zweitstimme wählt eine Partei und bestimmt die prozentuale Sitzverteilung." },
          { theme:"erst-zweitstimme", cat:"Erststimme", q:"Wer zieht über die Erststimme direkt in den Bundestag ein?", opts:["Der älteste Kandidat","Der Kandidat mit den meisten Erststimmen im Wahlkreis (Direktmandat)","Alle Kandidaten der Regierungspartei","Nur Parteivorsitzende"], a:1, ex:"Einfache Mehrheit im Wahlkreis reicht für den Gewinn des Direktmandats." },
          { theme:"erst-zweitstimme", cat:"Wahlsystem", q:"Was versteht man unter dem Begriff „Stimmensplitting“?", opts:["Zwei Stimmzettel abgeben","Erst- und Zweitstimme an unterschiedliche Parteien vergeben","Stimme für ungültig erklären","Halbe Stimmen abgeben"], a:1, ex:"Stimmensplitting: Erststimme für Kandidat von Partei A, Zweitstimme für Partei B." },
          { theme:"erst-zweitstimme", cat:"Wahlsystem", q:"Wie heißt das deutsche Wahlsystem offiziell?", opts:["Reines Mehrheitswahlrecht","Personalisierte Verhältniswahl","Absolute Mehrheitswahl","Listenwahl ohne Personen"], a:1, ex:"Personalisierte Verhältniswahl verbindet Personenwahl (Erststimme) mit Parteien-Verhältniswahl (Zweitstimme)." },
          { type:"fill", theme:"erst-zweitstimme", cat:"Direktmandat", q:"Wie nennt man das Mandat, das ein Bewerber bei Gewinn seines Wahlkreises erhält?", answers:["direktmandat"], answer:"Direktmandat", ex:"Über die Erststimme wird der Wahlkreissieger als Direktmandat gewählt." },
          { type:"fill", theme:"erst-zweitstimme", cat:"Reform 2023", q:"Auf wie viele Sitze wurde der Deutsche Bundestag durch die Wahlrechtsreform 2023 fest begrenzt?", answers:["630","630 sitze"], answer:"630 Sitze", ex:"Feste Sollgröße von 630 Abgeordneten ohne Überhang- und Ausgleichsmandate." },

          // 3. Sperrklausel (5 %-Hürde) (5 MC + 2 Fill)
          { theme:"sperrklausel", cat:"Sperrklausel", q:"Wo gilt die 5 %-Hürde bei der Bundestagswahl?", opts:["pro Wahlkreis","pro Bundesland","bundesweit auf das Gesamtergebnis","nur in Berlin"], a:2, ex:"Bei der Bundestagswahl gilt die 5 %-Sperrklausel bundesweit." },
          { theme:"sperrklausel", cat:"Grundmandate", q:"Eine Partei erzielt 4,6 % Zweitstimmen und 3 Direktmandate. Was passiert?", opts:["Sie zieht nicht ein","Sie zieht voll entsprechend ihrem Zweitstimmenanteil ein","Es gibt Neuwahlen","Nur 1 Kandidat zieht ein"], a:1, ex:"Grundmandatsklausel: Mindestens 3 Direktmandate heben die 5 %-Hürde auf." },
          { theme:"sperrklausel", cat:"Geschichte", q:"Welche historische Erfahrung aus der Weimarer Republik führte zur 5 %-Hürde?", opts:["Die Zersplitterung des Reichstags in Kleinparteien und Regierungskrisen","Zu hohe Wahlbeteiligung","Zu wenige Bundesländer","Mangel an Parteien"], a:0, ex:"Lehre aus Weimar: Zersplitterung verhinderte stabile Koalitionen und begünstigte Diktatur." },
          { theme:"sperrklausel", cat:"Fallbeispiel", q:"Eine Partei erhält bundesweit 3,8 % der Zweitstimmen und 2 Direktmandate. Wie viele Sitze erhält sie?", opts:["Keine Sitze","Genau 2 Sitze für die Direktkandidaten (Zweitstimmen verfallen)","Alle Sitze nach 3,8 %","Neuwahl"], a:1, ex:"Unter 5 % und weniger als 3 Direktmandate: Nur die gewonnenen Wahlkreiskandidaten ziehen ein." },
          { theme:"sperrklausel", cat:"Zweck", q:"Welcher Hauptvorteil wird der 5 %-Sperrklausel zugeschrieben?", opts:["Abschaffung der Opposition","Sicherung stabiler Mehrheiten und handlungsfähiger Regierungen","Kostensenkung im Parlament","Verkürzung der Wahlperioden"], a:1, ex:"Sie schützt vor Handlungsunfähigkeit durch zu viele Klein- und Splitterparteien." },
          { type:"fill", theme:"sperrklausel", cat:"Grundmandat", q:"Wie viele Direktmandate muss eine Partei mindestens gewinnen, um trotz weniger als 5 % Zweitstimmen in Fraktionsstärke einzuziehen?", answers:["3","drei","3 direktmandate"], answer:"3 Direktmandate", ex:"Die Grundmandatsklausel greift ab exakt 3 gewonnenen Wahlkreisen." },
          { type:"fill", theme:"sperrklausel", cat:"Fachbegriff", q:"Wie nennt man die Gefahr der Zersetzung des Parlaments in viele winzige Splitterparteien?", answers:["zersplitterung","parlamentszersplitterung"], answer:"Zersplitterung", ex:"Die Sperrklausel verhindert eine Lähmung durch Zersplitterung." },

          // 4. Vertrauensfrage & Misstrauensvotum (5 MC + 2 Fill)
          { theme:"vertrauensfrage", cat:"Vertrauensfrage", q:"Wer stellt im deutschen Grundgesetz die Vertrauensfrage (Art. 68 GG)?", opts:["Der Bundespräsident","Der Bundeskanzler","Der Bundestagspräsident","Das Bundesverfassungsgericht"], a:1, ex:"Der Bundeskanzler stellt die Vertrauensfrage, um seine Parlamentsmehrheit zu prüfen." },
          { theme:"vertrauensfrage", cat:"Misstrauensvotum", q:"Was bedeutet das Wort „konstruktiv“ beim Misstrauensvotum (Art. 67 GG)?", opts:["Der Kanzler tritt freiwillig zurück","Der Bundestag wählt im selben Wahlgang einen neuen Kanzler","Das Volk stimmt ab","Die Minister bleiben im Amt"], a:1, ex:"Nur wer gleichzeitig mit Mehrheit einen Nachfolger wählt, kann den alten Kanzler stürzen." },
          { theme:"vertrauensfrage", cat:"Geschichte", q:"Welcher Bundeskanzler wurde 1982 durch ein erfolgreiches konstruktives Misstrauensvotum gestürzt?", opts:["Willy Brandt","Helmut Schmidt","Konrad Adenauer","Gerhard Schröder"], a:1, ex:"Helmut Schmidt (SPD) verlor die FDP; Helmut Kohl (CDU) wurde im selben Votum Kanzler." },
          { theme:"vertrauensfrage", cat:"Rechtsfolge", q:"Was kann der Bundespräsident tun, wenn der Kanzler die Vertrauensfrage verliert?", opts:["Kanzler verhaften","Den Bundestag auf Vorschlag des Kanzlers auflösen","Sofort allein regieren","Ein Gesetz erlassen"], a:1, ex:"Nach Art. 68 GG kann der Bundespräsident innerhalb von 21 Tagen den Bundestag auflösen." },
          { theme:"vertrauensfrage", cat:"Frist", q:"Innerhalb welcher Frist müssen nach Auflösung des Bundestages Neuwahlen stattfinden?", opts:["Innerhalb von 14 Tagen","Innerhalb von 60 Tagen","Nach einem Jahr","Erst nach 4 Jahren"], a:1, ex:"Art. 39 GG schreibt Neuwahlen innerhalb von 60 Tagen nach Parlamentsauflösung vor." },
          { type:"fill", theme:"vertrauensfrage", cat:"Artikel", q:"Welcher Artikel des Grundgesetzes regelt das konstruktive Misstrauensvotum?", answers:["art. 67","art. 67 gg","artikel 67","67"], answer:"Art. 67 GG", ex:"Art. 67 regelt das Misstrauensvotum, Art. 68 die Vertrauensfrage." },
          { type:"fill", theme:"vertrauensfrage", cat:"Mehrheit", q:"Welche Art von Mehrheit im Bundestag ist nötig, um einen Kanzler per Misstrauensvotum zu stürzen?", answers:["absolute mehrheit","kanzlermehrheit","absolute"], answer:"Absolute Mehrheit", ex:"Mehrheit der gesetzlichen Mitglieder des Bundestages (Kanzlermehrheit)." },

          // 5. Statistik analysieren (Methode) (5 MC + 2 Fill)
          { theme:"statistik-analyse", cat:"Methode", q:"In welchem Teil der Statistikanalyse werden mögliche Begründungen vorsichtig formuliert?", opts:["In der Einleitung","In der Tabelle","Im Fazit","Nirgendwo"], a:2, ex:"Begründungen und vorsichtige Vermutungen gehören ausschließlich in das Fazit." },
          { theme:"statistik-analyse", cat:"Einleitung", q:"Welche Pflichtangaben gehören zwingend in die Einleitung einer Statistikanalyse?", opts:["Persönliche Wahlempfehlung","Thema, Darstellungsform, Einheit, Quelle und Erhebungszeitraum","Nur Seitenzahl","Ergebnis der Regierung"], a:1, ex:"Die Einleitung benennt Thema, Form, Einheit, Quelle und Zeitbezug." },
          { theme:"statistik-analyse", cat:"Analyse", q:"Was ist im Analyseteil einer Statistik streng zu vermeiden?", opts:["Zahlen nennen","Die eigene persönliche Meinung oder Begründungen einfließen lassen","Vergleiche anstellen","Spitzenreiter benennen"], a:1, ex:"Der Analyseteil ist rein sachlich und objektiv; Wertungen gehören nur ins Fazit." },
          { theme:"statistik-analyse", cat:"Formulierung", q:"Welche Formulierung eignet sich besonders für das vorsichtige Fazit einer Statistikanalyse?", opts:["„Es ist unumstößlich bewiesen, dass...“","„Mögliche Gründe dafür könnten sein, dass...“","„Ich persönlich finde, dass...“","„Die Statistik ist falsch, weil...“"], a:1, ex:"Hypothesen und Deutungen im Fazit immer als vorsichtige Vermutung formulieren." },
          { theme:"statistik-analyse", cat:"Bundestag", q:"Welche Altersgruppe dominiert laut Alterspyramide den Deutschen Bundestag?", opts:["Unter 25 Jahre","40 bis 59 Jahre","Über 80 Jahre","Nur 30-Jährige"], a:1, ex:"Die Altersgruppe der 40- bis 59-Jährigen stellt die deutliche Mehrheit der Abgeordneten." },
          { type:"fill", theme:"statistik-analyse", cat:"Dreischritt", q:"Wie heißt der dreiteilige Aufbau einer systematischen Grafikanalyse?", answers:["einleitung, analyse, fazit","einleitung analyse fazit","einleitung - analyse - fazit"], answer:"Einleitung – Analyse – Fazit", ex:"Klassischer Dreischritt der Methodenkompetenz." },
          { type:"fill", theme:"statistik-analyse", cat:"Diagrammtyp", q:"Wie nennt man ein Diagramm mit horizontalen Balken zur Darstellung von Werten?", answers:["balkendiagramm"], answer:"Balkendiagramm", ex:"Balkendiagramm (horizontal) oder Säulendiagramm (vertikal)." },

          // 6. Kalter Krieg & Deutsche Teilung (5 MC + 2 Fill)
          { theme:"kalter-krieg", cat:"Kalter Krieg", q:"Wer prägte im Jahr 1947 den Begriff „Kalter Krieg“?", opts:["Harry S. Truman","Walter Lippmann","Winston Churchill","Konrad Adenauer"], a:1, ex:"Der amerikanische Publizist Walter Lippmann prägte den Begriff 1947." },
          { theme:"kalter-krieg", cat:"Chronologie", q:"An welchem Datum wurde die Berliner Mauer errichtet?", opts:["13. August 1961","9. November 1989","23. Mai 1949","17. Juni 1953"], a:0, ex:"13. August 1961: Beginn des Mauerbaus durch die DDR." },
          { theme:"kalter-krieg", cat:"Abschreckung", q:"Was versteht man unter dem „Gleichgewicht des Schreckens“?", opts:["Beide Seiten konnten sich nuklear mehrfach vernichten, was direkten Krieg verhinderte","Konventionelle Waffen waren verboten","Die USA waren unbewaffnet","Es gab nur Propaganda"], a:0, ex:"Nukleare Abschreckung (Overkill-Kapazität) verhinderte den Ausbruch eines Dritten Weltkriegs." },
          { theme:"kalter-krieg", cat:"BRD-Gründung", q:"Welches Datum markiert die offizielle Gründung der Bundesrepublik Deutschland?", opts:["08. Mai 1945","23. Mai 1949 (Verkündung des Grundgesetzes)","07. Oktober 1949","13. August 1961"], a:1, ex:"Mit der Verkündung des Grundgesetzes am 23. Mai 1949 wurde die BRD gegründet." },
          { theme:"kalter-krieg", cat:"Wirtschaftssysteme", q:"Welche gegensätzlichen Wirtschaftssysteme standen sich im Kalten Krieg gegenüber?", opts:["Marktwirtschaft (Westen) vs. Planwirtschaft (Osten)","Beide hatten Feudalismus","Keine Wirtschaft in der DDR","Reine Tauschwirtschaft"], a:0, ex:"Westen: Kapitalismus & freie/soziale Marktwirtschaft; Osten: Sozialismus & staatliche Planwirtschaft." },
          { type:"fill", theme:"kalter-krieg", cat:"Mauerfall", q:"An welchem genauen Datum fiel die Berliner Mauer?", answers:["09.11.1989","9. november 1989","09. november 1989","9.11.1989"], answer:"09. November 1989", ex:"Öffnung der innerdeutschen Grenze nach friedlicher Revolution in der DDR." },
          { type:"fill", theme:"kalter-krieg", cat:"Stellvertreter", q:"Wie nennt man Kriege, die von Supermächten indirekt über Drittstaaten geführt wurden?", answers:["stellvertreterkriege","stellvertreterkrieg"], answer:"Stellvertreterkriege", ex:"Zum Beispiel Koreakrieg, Vietnamkrieg, Afghanistankrieg." },

          // 7. Zentralismus, Dezentralisierung & Staatsformen (5 MC + 2 Fill)
          { theme:"zentralismus", cat:"Staatsaufbau", q:"Was kennzeichnet das Prinzip der Dezentralisierung (Föderalismus)?", opts:["Alle Macht liegt in der Hauptstadt","Aufgaben und Entscheidungen werden auf Länder und Gemeinden aufgeteilt","Abschaffung von Wahlen","Einparteienherrschaft"], a:1, ex:"Aufteilung der staatlichen Aufgaben auf Bund, Länder und Kommunen." },
          { theme:"zentralismus", cat:"DDR-Vergleich", q:"Welches war ein typisches Merkmal des zentralistischen Staatsaufbaus in der DDR ab 1952?", opts:["Starke Länderparlamente","Auflösung der Länder und Ersetzung durch 14 zentral geführte Bezirke","Freie Wahlen mit 20 Parteien","Unabhängige Justiz"], a:1, ex:"Die DDR schaffte 1952 ihre Länder ab und regierte zentral aus Ost-Berlin über 14 Bezirke." },
          { theme:"zentralismus", cat:"Vorteil", q:"Was ist ein wesentlicher Vorteil der Dezentralisierung / des Föderalismus?", opts:["Schnellere Diktatur","Bürgernähe, Machtbegrenzung und Berücksichtigung regionaler Interessen","Abschaffung von Steuern","Nur ein Minister für alles"], a:1, ex:"Föderalismus garantiert Bürgernähe und schützt vor Machtkonzentration." },
          { theme:"zentralismus", cat:"Grundgesetz", q:"Welches fundamentale Staatsprinzip besagt: „Alle Staatsgewalt geht vom Volke aus“?", opts:["Zentralismus","Volkssouveränität (Art. 20 Abs. 2 GG)","Planwirtschaft","Diktatur des Proletariats"], a:1, ex:"Volkssouveränität ist das Herzstück der parlamentarischen Demokratie." },
          { theme:"zentralismus", cat:"Demokratie vs. Diktatur", q:"Was unterscheidet eine freiheitliche Demokratie grundlegend von einer Diktatur?", opts:["Demokratie hat keine Gesetze","Gewaltenteilung, Grundrechte, freie Wahlen und echte Opposition","In der Demokratie regiert das Militär","Es gibt keinen Unterschied"], a:1, ex:"Rechtsstaatlichkeit, Gewaltenteilung und Grundrechte schützen die Bürger vor Willkür." },
          { type:"fill", theme:"zentralismus", cat:"Bundesländer", q:"Aus wie vielen Bundesländern besteht die Bundesrepublik Deutschland?", answers:["16","sechzehn","16 bundesländer"], answer:"16", ex:"Deutschland ist ein Bundesstaat aus 16 Bundesländern." },
          { type:"fill", theme:"zentralismus", cat:"Gewalten", q:"In welche drei Gewalten ist die Staatsmacht in der Demokratie aufgeteilt?", answers:["legislative, exekutive, judikative","legislative exekutive judikative"], answer:"Legislative, Exekutive, Judikative", ex:"Gesetzgebung, vollziehende Gewalt und rechtsprechende Gewalt." },
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
          },
          { theme:"gewaltenteilung", cat:"Verschränkung", q:"Welches Beispiel zeigt Gewaltenverschränkung?", opts:["Ein Gericht kocht das Mittagessen","Der Bundestag (Legislative) wählt den Bundeskanzler (Exekutive)","Ein Richter fährt Bus","Ein Bürger zahlt Steuern"], a:1, ex:"Legislative und Exekutive greifen ineinander (Art. 63 GG)." },
          { theme:"gewaltenteilung", cat:"Verschränkung", q:"Zu welcher Gewalt gehört der Bundesrat?", opts:["Judikative","Legislative","Exekutive","Zu keiner"], a:1, ex:"Legislative — obwohl die Mitglieder aus den Landesregierungen (Exekutive) kommen." },
          { theme:"gewaltenteilung", cat:"BVerfG", q:"Wer wählt die 16 Bundesverfassungsrichter?", opts:["Nur der Bundespräsident allein","Bundestag und Bundesrat je zur Hälfte","Nur die Bundesregierung","Das Volk direkt"], a:1, ex:"Je zur Hälfte von Bundestag und Bundesrat; der Bundespräsident ernennt sie." },
          { theme:"demokratie-gg", cat:"Mehrheitsprinzip", q:"Was bedeutet das Mehrheitsprinzip?", opts:["Der Stärkste entscheidet allein","Die Mehrheit entscheidet, Minderheitenrechte bleiben geschützt","Nur Einstimmigkeit zählt","Nur der Kanzler entscheidet"], a:1, ex:"Mehrheit entscheidet, aber Grund- und Minderheitsrechte gelten weiter." },
          { theme:"vertrauensfrage-misstrauen", cat:"Geschichte", q:"Wer wurde 1982 durch ein konstruktives Misstrauensvotum Kanzler?", opts:["Willy Brandt","Helmut Kohl","Gerhard Schröder","Olaf Scholz"], a:1, ex:"Kohl (CDU) löste Helmut Schmidt (SPD) ab — bisher das einzige erfolgreiche." },
          { theme:"vertrauensfrage-misstrauen", cat:"Geschichte", q:"Warum stellte Schröder 2005 (und Scholz 2024) die Vertrauensfrage?", opts:["Um mehr Gehalt zu bekommen","Um sie absichtlich zu verlieren und Neuwahlen zu erreichen","Um Richter zu ernennen","Um den Bundesrat aufzulösen"], a:1, ex:"Verlorene Vertrauensfrage (Art. 68) → Auflösung des Bundestages → Neuwahlen." },
          { theme:"karikatur-methode", cat:"Methode", q:"In welcher Reihenfolge interpretiert man eine Karikatur?", opts:["Fazit → Beschreibung → Einleitung","Einleitung → Beschreibung → Deutung → Fazit","Nur Deutung","Nur eigene Meinung"], a:1, ex:"Erst beschreiben, dann deuten, dann werten." },
          { theme:"karikatur-methode", cat:"Redemittel", q:"Welcher Satzanfang passt zur Beschreibung (nicht zur Deutung)?", opts:["Der Karikaturist möchte ausdrücken, dass …","Im Vordergrund ist … zu sehen.","Damit kritisiert er …","Meiner Meinung nach …"], a:1, ex:"Beschreibung = was man sieht; Deutung/Kritik kommt später." },
          { theme:"partizipation", cat:"Digital", q:"Ein Vorteil digitaler Partizipation ist …", opts:["Anonymität","weltweiter, schneller Zugang","Informationsflut","unqualifizierte Beiträge"], a:1, ex:"Schneller, breiter Zugang; Nachteile sind Anonymität und Informationsflut." }
        ]
      },
      {
  "id": "wiko",
  "code": "WiKO",
  "name": "Wirtschaftskompetenz (WiKO / WiSo)",
  "icon": "",
  "accent": "#0ea5e9",
  "soft": "#e0f2fe",
  "teacher": "",
  "examDate": "2026-11-10",
  "ready": true,
  "desc": "Berufsausbildung (LF 1) · Arbeitsrecht · Betriebsrat & Tarifrecht · Sozialversicherung & Steuern · Kaufvertrag & Rechtsgeschäfte (BGB)",
  "groups": [
    {
      "id": "lf1-duales-system",
      "badge": "LF 1",
      "title": "LF 1 · Duales System & Berufsausbildung (LS01–05, LS11–12)",
      "items": [
                {
          "id": "wiko-duales-system",
          "icon": "",
          "name": "LS01 · Das duale System der Berufsausbildung",
          "desc": "Ausbildungsbetrieb (BBiG) vs. Berufsschule (Schulgesetz) · Lernorte & Vorteile",
          "content": "<h2>LS01 · Das duale System der Berufsausbildung</h2>\n<div class=\"hint\">Lernortkooperation Betrieb &amp; Berufsschule · Berufsbildungsgesetz (BBiG) · Rahmenlehrplan</div>\n<h3 class=\"sub\">1. Zwei Lernorte im Überblick</h3>\n<table class=\"tbl\">\n  <thead>\n    <tr><th>Merkmal</th><th>Ausbildungsbetrieb</th><th>Berufsschule</th></tr>\n  </thead>\n  <tbody>\n    <tr><td><b>Hauptaufgabe</b></td><td>Praktische Ausbildung: Vermittlung von Fertigkeiten, Kenntnissen und beruflichen Handlungskompetenzen im Echtbetrieb.</td><td>Fachtheoretische Ausbildung und Vertiefung der Allgemeinbildung (Deutsch, Englisch, Gemeinschaftskunde, WiKO).</td></tr>\n    <tr><td><b>Gesetzliche Grundlage</b></td><td><b>Berufsbildungsgesetz (BBiG)</b> und bundeseinheitliche <b>Ausbildungsordnung</b>.</td><td><b>Schulgesetz des jeweiligen Bundeslandes</b> und <b>Rahmenlehrplan der Kultusministerkonferenz (KMK)</b>.</td></tr>\n    <tr><td><b>Zuständigkeit</b></td><td>Betrieb (Arbeitgeber); Überwachung durch die zuständige Kammer (<b>IHK / HWK</b>).</td><td>Bundesland (Kultusministerium) und kommunaler Schulträger.</td></tr>\n    <tr><td><b>Finanzierung</b></td><td>Finanzierung durch den Betrieb; Zahlung einer monatlichen <b>Ausbildungsvergütung</b>.</td><td>Öffentliche Finanzierung durch Steuergelder des Landes und der Kommunen.</td></tr>\n  </tbody>\n</table>\n<h3 class=\"sub\">2. Vorteile des dualen Systems</h3>\n<ul>\n  <li><b>Für Auszubildende:</b> Praxisnahe Qualifikation ab dem ersten Tag, finanzielle Unabhängigkeit durch monatliche Vergütung, hohe Übernahmechancen und anerkannter Berufsabschluss.</li>\n  <li><b>Für Unternehmen:</b> Passgenaue Ausbildung des eigenen Fachkräftenachwuchses; Einsparung von Rekrutierungs- und Einarbeitungskosten.</li>\n  <li><b>Für Gesellschaft und Wirtschaft:</b> Sehr niedrige Jugendarbeitslosigkeit und hohe internationale Wettbewerbsfähigkeit des Standorts Deutschland.</li>\n</ul>\n<div class=\"vi\">\n  <b>Tóm tắt Tiếng Việt — Hệ thống đào tạo kép (Duales System):</b>\n  <ul>\n    <li><b>2 Địa điểm đào tạo:</b>\n      <ul>\n        <li><b>Ausbildungsbetrieb (Doanh nghiệp đào tạo):</b> Đào tạo kỹ năng thực hành nghề. Cơ sở pháp lý: Luật BBiG và Quy chế đào tạo liên bang (Ausbildungsordnung). Doanh nghiệp trả lương học nghề hàng tháng và chịu sự giám sát của IHK/HWK.</li>\n        <li><b>Berufsschule (Trường dạy nghề):</b> Giảng dạy lý thuyết chuyên ngành và các môn đại cương (Đức, Anh, GK, WiKO). Cơ sở pháp lý: Luật giáo dục của từng Bang (Schulgesetz); kinh phí từ ngân sách nhà nước.</li>\n      </ul>\n    </li>\n    <li><b>Ưu điểm:</b> Học viên được trả lương, không phải đóng học phí, tay nghề vững vàng và cơ hội ở lại làm việc chính thức rất cao.</li>\n  </ul>\n</div>",
          "qa": [
                    {
                              "q": "Welche beiden Lernorte bilden das duale Ausbildungssystem in Deutschland?",
                              "qVi": "Mô hình đào tạo kép (Duales System) kết hợp 2 địa điểm nào?",
                              "a": "Der <b>Ausbildungsbetrieb</b> (praktische Ausbildung) und die <b>Berufsschule</b> (theoretische Fachausbildung und Allgemeinbildung).",
                              "aVi": "<b>Ausbildungsbetrieb (thực hành)</b> và <b>Berufsschule (lý thuyết chuyên môn)</b>.",
                              "src": "IHK / Berufsschule"
                    },
                    {
                              "q": "Auf welcher rechtlichen Grundlage basiert die betriebliche Ausbildung im Unterschied zur Berufsschule?",
                              "qVi": "Cơ sở pháp lý điều chỉnh việc đào tạo tại Doanh nghiệp khác gì so với Trường nghề?",
                              "a": "Für den Betrieb gilt das bundeseinheitliche <b>Berufsbildungsgesetz (BBiG)</b> und die Ausbildungsordnung; für die Berufsschule gilt das <b>Schulgesetz des jeweiligen Bundeslandes</b>.",
                              "aVi": "Tại Doanh nghiệp áp dụng <b>Luật BBiG và Quy chế Ausbildungsordnung</b> của Liên bang; tại Trường nghề áp dụng <b>Luật Giáo dục (Schulgesetz)</b> của từng Tiểu bang.",
                              "src": "IHK / Berufsschule"
                    },
                    {
                              "q": "Wer trägt die Kosten für die monatliche Ausbildungsvergütung?",
                              "qVi": "Ai là bên chi trả lương trợ cấp học nghề (Ausbildungsvergütung)?",
                              "a": "Der <b>Ausbildungsbetrieb</b> zahlt die Ausbildungsvergütung an den Auszubildenden (§ 17 BBiG).",
                              "aVi": "<b>Doanh nghiệp đào tạo (Ausbildungsbetrieb)</b> chi trả 100% lương trợ cấp cho học viên.",
                              "src": "IHK / Berufsschule"
                    },
                    {
                              "q": "Welchen Hauptzweck verfolgt die bundeseinheitliche Ausbildungsordnung?",
                              "qVi": "Mục đích chính của Ausbildungsordnung là gì?",
                              "a": "Sie sichert einheitliche <b>Mindeststandards, Berufsbezeichnungen, Ausbildungsdauer und Prüfungsinhalte</b> für den jeweiligen Ausbildungsberuf in ganz Deutschland.",
                              "aVi": "Quy định khung chương trình chuẩn quốc gia, bảo đảm chất lượng và nội dung thi cử đồng đều trên toàn nước Đức.",
                              "src": "IHK / Berufsschule"
                    }
          ]
},
                {
          "id": "wiko-rechte-pflichten",
          "icon": "",
          "name": "LS02 · Rechte und Pflichten des Auszubildenden",
          "desc": "BBiG § 13–15 · Lernpflicht & Fürsorgepflicht · Berichtsheft & Freistellung",
          "content": "<h2>LS02 · Rechte und Pflichten des Auszubildenden</h2>\n<div class=\"hint\">Berufsbildungsgesetz §§ 13–15 · Reziproke Rechte und Pflichten im Ausbildungsverhältnis</div>\n<h3 class=\"sub\">1. Pflichten des Auszubildenden (§ 13 BBiG)</h3>\n<ul>\n  <li><b>Lernpflicht:</b> Pflicht, sich planmäßig zu bemühen, die berufliche Handlungsfähigkeit zu erwerben und das Ausbildungsziel zu erreichen.</li>\n  <li><b>Sorgfaltspflicht:</b> Aufgetragene Arbeiten ordentlich, gewissenhaft und termingerecht ausführen; Werkzeuge und Maschinen schonend behandeln.</li>\n  <li><b>Weisungsgebundenheit (Gehorsamspflicht):</b> Den arbeitsbezogenen Weisungen des Ausbilders und weisungsberechtigter Personen Folge leisten.</li>\n  <li><b>Führung des Berichtshefts (Ausbildungsnachweis):</b> Regelmäßige, wahrheitsgemäße Dokumentation; Zulassungsvoraussetzung zur IHK-/HWK-Abschlussprüfung! Darf während der betrieblichen Arbeitszeit geführt werden (§ 14 Abs. 2 BBiG).</li>\n  <li><b>Schweigepflicht:</b> Stillschweigen über Betriebs- und Geschäftsgeheimnisse wahren.</li>\n  <li><b>Benachrichtigungspflicht bei Arbeitsunfähigkeit:</b> Den Betrieb unverzüglich vor Dienstbeginn über eine Erkrankung informieren; AU-Bescheinigung spätestens am 4. Kalendertag vorlegen (Arbeitgeber kann sie ab Tag 1 verlangen).</li>\n</ul>\n<h3 class=\"sub\">2. Pflichten des Ausbildenden (§§ 14, 15 BBiG) / Rechte des Azubis</h3>\n<ul>\n  <li><b>Ausbildungspflicht:</b> Planmäßige Vermittlung aller Ausbildungsinhalte gemäß Ausbildungsrahmenplan.</li>\n  <li><b>Verbot ausbildungsfremder Tätigkeiten:</b> Keine ausbildungsfremden Arbeiten (wie private Besorgungen für den Chef) oder gesundheitsgefährdende Aufgaben übertragen.</li>\n  <li><b>Kostenlose Ausbildungsmittel:</b> Fachliteratur, Werkzeuge und Schutzkleidung (Sicherheitsschuhe) müssen kostenlos bereitgestellt werden.</li>\n  <li><b>Freistellungspflicht (§ 15 BBiG):</b> Freistellung für den Berufsschulunterricht und Prüfungen unter Fortzahlung der Vergütung.</li>\n  <li><b>Zahlung der Ausbildungsvergütung:</b> Pünktliche monatliche Überweisung der vertraglich vereinbarten Vergütung.</li>\n  <li><b>Zeugnisausstellung:</b> Pflicht zur Erteilung eines schriftlichen Ausbildungszeugnisses bei Beendigung.</li>\n</ul>\n<div class=\"vi\">\n  <b>Tóm tắt Tiếng Việt — Quyền &amp; Nghĩa vụ trong đào tạo nghề:</b>\n  <ul>\n    <li><b>Nghĩa vụ học viên (BBiG § 13):</b> Học tập nghiêm túc, làm việc cẩn thận, chấp hành chỉ đạo, viết Berichtsheft đầy đủ (điều kiện để đi thi tốt nghiệp, được viết trong giờ làm), giữ bí mật kinh doanh, báo ốm ngay trước giờ làm và nộp AU đúng hạn.</li>\n    <li><b>Nghĩa vụ doanh nghiệp (BBiG §§ 14, 15):</b> Dạy nghề đúng giáo trình, cấm giao việc vặt riêng tư, phát miễn phí đồ bảo hộ và dụng cụ học, cho nghỉ đi học trường nghề vẫn trả đủ lương, trả lương đúng hạn và cấp bằng/chứng chỉ tốt nghiệp.</li>\n  </ul>\n</div>",
          "qa": [
                    {
                              "q": "Ist das Führen des Berichtshefts (Ausbildungsnachweises) verpflichtend und darf es in der Arbeitszeit erfolgen?",
                              "qVi": "Học viên học nghề có bắt buộc phải viết Berichtsheft (Sổ báo cáo) không và có được làm trong giờ làm không?",
                              "a": "<b>Ja, es ist gesetzliche Pflicht (§ 13 BBiG) und Zulassungsvoraussetzung zur Abschlussprüfung.</b> Es darf während der regulären betrieblichen Ausbildungszeit geführt werden.",
                              "aVi": "<b>Có, bắt buộc theo luật (§ 13 BBiG) và là điều kiện để được dự thi tốt nghiệp.</b> Doanh nghiệp phải tạo điều kiện cho viết trong giờ làm.",
                              "src": "IHK / Berufsschule"
                    },
                    {
                              "q": "Darf ein Betrieb vom Azubi verlangen, Schutzkleidung und Fachliteratur selbst zu bezahlen?",
                              "qVi": "Doanh nghiệp có được phép bắt Azubi tự mua trang thiết bị bảo hộ lao động và sách vở không?",
                              "a": "<b>Nein.</b> Der Betrieb muss alle für die Ausbildung erforderlichen Ausbildungsmittel und Schutzkleidungen <b>kostenlos zur Verfügung stellen (§ 14 BBiG)</b>.",
                              "aVi": "<b>Không được.</b> Doanh nghiệp có nghĩa vụ cung cấp miễn phí mọi thiết bị bảo hộ và đồ dùng học tập cần thiết.",
                              "src": "IHK / Berufsschule"
                    },
                    {
                              "q": "Wie muss sich der Auszubildende bei einer Erkrankung verhalten?",
                              "qVi": "Khi bị ốm, Azubi có nghĩa vụ gì?",
                              "a": "Er muss den Betrieb <b>unverzüglich vor Dienstbeginn informieren</b> und bei einer Dauer von mehr als 3 Tagen (bzw. auf Verlangen ab Tag 1) eine <b>ärztliche Arbeitsunfähigkeitsbescheinigung (AU)</b> vorlegen.",
                              "aVi": "Báo ngay cho công ty trước giờ vào ca và nộp giấy khám bệnh AU đúng hạn quy định.",
                              "src": "IHK / Berufsschule"
                    },
                    {
                              "q": "Darf der Ausbildungsbetrieb den Lohn kürzen, wenn der Azubi die Berufsschule besucht?",
                              "qVi": "Doanh nghiệp có được trừ tiền lương khi Azubi nghỉ đi học Berufsschule không?",
                              "a": "<b>Nein.</b> Nach § 15 BBiG besteht eine gesetzliche <b>Freistellungspflicht unter Fortzahlung der vollen Vergütung</b>.",
                              "aVi": "<b>Không.</b> Doanh nghiệp có nghĩa vụ Freistellung (cho nghỉ đi học vẫn trả nguyên lương).",
                              "src": "IHK / Berufsschule"
                    }
          ]
},
                {
          "id": "wiko-ausbildungsvertrag",
          "icon": "",
          "name": "LS03 · Der Berufsausbildungsvertrag (BAV)",
          "desc": "Schriftform (§ 11 BBiG) · Mindestinhalte · Rechte Minderjähriger",
          "content": "<h2>LS03 · Der Berufsausbildungsvertrag (BAV)</h2>\n<div class=\"hint\">Berufsbildungsgesetz §§ 10, 11 · Vertragsschluss, Formvorschrift &amp; Mindestinhalte</div>\n<h3 class=\"sub\">1. Formvorschrift und Wirksamkeit (§§ 10, 11 BBiG)</h3>\n<ul>\n  <li><b>Schriftformgebot:</b> Der Ausbildungsvertrag muss zwingend <b>vor Beginn der Ausbildung</b> schriftlich niedergelegt werden.</li>\n  <li><b>Unterschriften:</b> Der Vertrag muss eigenhändig unterschrieben werden vom <b>Ausbildenden</b>, vom <b>Auszubildenden</b> sowie bei Minderjährigen (unter 18 Jahren) zwingend von den <b>gesetzlichen Vertretern (Eltern)</b> nach § 107 BGB.</li>\n  <li><b>Registrierung:</b> Der Betrieb muss den Vertrag unverzüglich zur <b>Eintragung in das Verzeichnis der Berufsausbildungsverhältnisse</b> bei der zuständigen Kammer (IHK / HWK) einreichen.</li>\n</ul>\n<h3 class=\"sub\">2. Wichtige gesetzliche Pflichtinhalte (§ 11 BBiG)</h3>\n<p>Im Vertrag müssen unter anderem zwingend geregelt sein: Art und Ziel der Ausbildung, Beginn und Dauer, tägliche Arbeitszeit, Dauer der Probezeit (1 bis 4 Monate), Höhe der Ausbildungsvergütung, Urlaubsanspruch, Kündigungsbedingungen sowie Hinweis auf geltende Tarifverträge.</p>\n<div class=\"vi\">\n  <b>Tóm tắt Tiếng Việt — Hợp đồng đào tạo nghề (BAV):</b>\n  <ul>\n    <li>Bắt buộc lập thành <b>văn bản giấy (Schriftform)</b> trước khi bắt đầu khóa học.</li>\n    <li>Có chữ ký của đại diện doanh nghiệp, học viên và <b>cha mẹ/người giám hộ hợp pháp</b> nếu học viên dưới 18 tuổi.</li>\n    <li>Doanh nghiệp có nghĩa vụ nộp hợp đồng lên IHK/HWK để đăng ký vào sổ quản lý nghề.</li>\n    <li>Nội dung bắt buộc: Tên nghề, thời hạn, thời gian làm việc, thử việc (1–4 tháng), lương trợ cấp, ngày phép, điều kiện sa thải.</li>\n  </ul>\n</div>",
          "qa": [
                    {
                              "q": "Welche gesetzliche Formvorschrift gilt für den Berufsausbildungsvertrag nach § 11 BBiG?",
                              "qVi": "Hợp đồng đào tạo nghề bắt buộc phải tuân thủ hình thức nào theo luật?",
                              "a": "Die <b>Schriftform mit eigenhändiger Unterschrift</b> vor Beginn der Ausbildung. Bei Minderjährigen müssen auch die gesetzlichen Vertreter unterschreiben.",
                              "aVi": "Bắt buộc bằng <b>văn bản giấy có chữ ký tay (Schriftform)</b> trước khi bắt đầu học nghề; dưới 18 tuổi cần chữ ký cha mẹ.",
                              "src": "IHK / Berufsschule"
                    },
                    {
                              "q": "Wie viele Monate darf die Probezeit in einem Berufsausbildungsvertrag maximal dauern?",
                              "qVi": "Thời gian thử việc trong hợp đồng học nghề được kéo dài tối đa bao lâu?",
                              "a": "Sie muss <b>mindestens einen Monat und darf höchstens vier Monate</b> betragen (§ 20 BBiG).",
                              "aVi": "Từ <b>tối thiểu 1 tháng đến tối đa 4 tháng</b> (§ 20 BBiG).",
                              "src": "IHK / Berufsschule"
                    }
          ]
},
                {
          "id": "wiko-probezeit-ueberwachung",
          "icon": "",
          "name": "LS04 & LS12 · Probezeit & Überwachung durch die Kammer",
          "desc": "Dauer (§ 20 BBiG) · Fristlose Kündigung · Überwachungsaufgaben von IHK & HWK",
          "content": "<h2>LS04 &amp; LS12 · Probezeit &amp; Überwachung durch IHK/HWK</h2>\n<div class=\"hint\">Berufsbildungsgesetz §§ 20, 22 Abs. 1, 71 ff. · Schutzrechte und Kontrollfunktion der Kammern</div>\n<h3 class=\"sub\">1. Probezeit im Ausbildungsverhältnis (§ 20 BBiG)</h3>\n<ul>\n  <li><b>Dauer:</b> Mindestens 1 Monat bis höchstens 4 Monate.</li>\n  <li><b>Kündigung in der Probezeit (§ 22 Abs. 1 BBiG):</b> Beide Seiten können das Ausbildungsverhältnis <b>jederzeit, ohne Einhaltung einer Frist und ohne Angabe von Gründen schriftlich kündigen</b>.</li>\n</ul>\n<h3 class=\"sub\">2. Überwachungsaufgaben der Kammer (IHK / HWK)</h3>\n<ul>\n  <li>Prüfung der fachlichen und persönlichen Eignung von Ausbildungsstätte und Ausbilder.</li>\n  <li>Führung des Verzeichnisses der Ausbildungsverhältnisse und Schlichtung bei Streitigkeiten (§ 111 ArbGG).</li>\n  <li>Organisation und Abnahme der Zwischen- und Abschlussprüfungen.</li>\n</ul>\n<div class=\"vi\">\n  <b>Tóm tắt Tiếng Việt — Thời gian thử việc &amp; Giám sát IHK/HWK:</b>\n  <ul>\n    <li>Thử việc: 1 đến 4 tháng. Trong thời gian này sa thải hoặc xin nghỉ <b>bất kỳ lúc nào, không cần báo trước, không cần nêu lý do</b>, nhưng phải bằng văn bản.</li>\n    <li>IHK/HWK kiểm tra tư cách dạy nghề của công ty, đăng ký hợp đồng, tổ chức thi tốt nghiệp và giải quyết tranh chấp thông qua Hội đồng hòa giải.</li>\n  </ul>\n</div>",
          "qa": [
                    {
                              "q": "Wie kann ein Ausbildungsverhältnis während der Probezeit gekündigt werden?",
                              "qVi": "Trong thời gian thử việc, việc chấm dứt hợp đồng học nghề diễn ra như thế nào?",
                              "a": "Jederzeit <b>ohne Einhaltung einer Kündigungsfrist und ohne Angabe von Gründen</b> schriftlich (§ 22 Abs. 1 BBiG).",
                              "aVi": "Bất kỳ lúc nào <b>không cần thời hạn báo trước và không cần nêu lý do</b>, nhưng bắt buộc bằng văn bản.",
                              "src": "IHK / Berufsschule"
                    },
                    {
                              "q": "Welche Institution überwacht die Eignung der Ausbilder und führt die Abschlussprüfung durch?",
                              "qVi": "Cơ quan nào kiểm tra tư cách người dạy nghề và tổ chức kỳ thi tốt nghiệp?",
                              "a": "Die <b>zuständige Stelle (IHK oder HWK)</b> nach dem Berufsbildungsgesetz.",
                              "aVi": "<b>Phòng Thương mại và Công nghiệp (IHK) hoặc HWK</b> theo luật BBiG.",
                              "src": "IHK / Berufsschule"
                    }
          ]
},
                {
          "id": "wiko-fall-klara",
          "icon": "",
          "name": "LS05 & LS11 · Fallbeispiel Klara Korte & Geschichte des BBiG",
          "desc": "Ausbildungsfremde Tätigkeiten (§ 14 BBiG) · Historischer Wandel seit 1864",
          "content": "<h2>LS05 &amp; LS11 · Fall Klara Korte &amp; Historische Entwicklung des BBiG</h2>\n<div class=\"hint\">BBiG § 14 Abs. 3 · Schutz vor Ausbeutung · Entwicklung vom Lehrlingswesen zum modernen Bildungsrecht</div>\n<h3 class=\"sub\">1. Fall Klara Korte (Ausbildungsfremde Arbeiten)</h3>\n<p>Das Zuweisen von Arbeiten wie privatem Hausputz oder Botengängen für die Familie des Chefs verstößt gegen § 14 Abs. 3 BBiG. Auszubildende dürfen diese Tätigkeiten verweigern.</p>\n<h3 class=\"sub\">2. Historischer Vergleich</h3>\n<p>Im 19. Jahrhundert (Lehrvertrag 1864) mussten Lehrlinge oft Lehrgeld zahlen, arbeiteten bis zu 16 Stunden ohne Schutz. Heute sichert das BBiG Schutzrechte, Arbeitszeitgrenzen und gesetzliche Vergütung.</p>\n<div class=\"vi\">\n  <b>Tóm tắt Tiếng Việt — Tình huống Klara Korte &amp; Lịch sử BBiG:</b>\n  <ul>\n    <li>Giao việc riêng tư gia đình sếp là vi phạm BBiG § 14 (Ausbildungsfremde Tätigkeiten). Azubi có quyền từ chối làm.</li>\n    <li>Lịch sử: Trước đây học việc không có lương, bị bóc lột; ngày nay BBiG bảo vệ toàn diện về tiền lương, giờ làm và điều kiện học tập.</li>\n  </ul>\n</div>",
          "qa": [
                    {
                              "q": "Darf ein Betrieb dem Auszubildenden ausbildungsfremde Arbeiten (wie private Besorgungen) auftragen?",
                              "qVi": "Doanh nghiệp giao việc làm nhà riêng cho Azubi có vi phạm luật không?",
                              "a": "<b>Nein.</b> Das ist nach <b>§ 14 Abs. 3 BBiG verboten</b>. Der Azubi darf diese Arbeiten verweigern.",
                              "aVi": "<b>Vi phạm luật.</b> Theo § 14 BBiG cấm giao việc không phục vụ đào tạo; Azubi có quyền từ chối.",
                              "src": "IHK / Berufsschule"
                    }
          ]
}
      ]
    },
    {
      "id": "lf1-arbeitsschutz",
      "badge": "LF 1",
      "title": "LF 1 · Arbeitsschutz, Bewerbung & Arbeitsvertrag (LS06–10, LS13–16)",
      "items": [
                {
          "id": "wiko-arbeitsschutz",
          "icon": "",
          "name": "LS06 · Gesetzlicher Arbeitsschutz",
          "desc": "Technischer & sozialer Arbeitsschutz · ArbZG · JArbSchG · MuSchG · BUrlG",
          "content": "<h2>LS06 · Gesetzlicher Arbeitsschutz</h2>\n<div class=\"hint\">Arbeitszeitgesetz (ArbZG) · Jugendarbeitsschutzgesetz (JArbSchG) · Bundesurlaubsgesetz (BUrlG)</div>\n<h3 class=\"sub\">1. Technischer vs. Sozialer Arbeitsschutz</h3>\n<ul>\n  <li><b>Technischer Arbeitsschutz:</b> Verhütung von Arbeitsunfällen und Berufskrankheiten (Arbeitsschutzgesetz, Berufsgenossenschaft, Sicherheitskleidung, Maschinenschutz).</li>\n  <li><b>Sozialer Arbeitsschutz:</b> Schutz von Arbeitszeit, Urlaub und besonders schutzbedürftigen Personengruppen.</li>\n</ul>\n<h3 class=\"sub\">2. Kernregelungen der Schutzgesetze</h3>\n<table class=\"tbl\">\n  <thead><tr><th>Gesetz</th><th>Wichtigste Schutzvorschriften</th></tr></thead>\n  <tbody>\n    <tr><td><b>Arbeitszeitgesetz (ArbZG)</b></td><td>Regelarbeitszeit max. 8 Stunden/Werktag (Verlängerung auf 10h möglich); <b>mindestens 11 Stunden ununterbrochene Ruhezeit</b> (§ 5 ArbZG).</td></tr>\n    <tr><td><b>Jugendarbeitsschutzgesetz (JArbSchG)</b></td><td>Für Jugendliche unter 18 Jahren: Max. 8h/Tag, 40h/Woche, 5-Tage-Woche; Ruhepause 30 Min (bei 4,5–6h) bzw. 60 Min (bei >6h); Mindesturlaub 30/27/25 Werktage (nach Alter 15/16/17).</td></tr>\n    <tr><td><b>Mutterschutzgesetz (MuSchG)</b></td><td>Schutzfrist 6 Wochen vor und 8 Wochen nach der Entbindung (Beschäftigungsverbot unter Fortzahlung des Mutterschaftsgeldes).</td></tr>\n    <tr><td><b>Bundesurlaubsgesetz (BUrlG)</b></td><td>Gesetzlicher Mindesturlaub für Erwachsene: <b>24 Werktage</b> bei einer 6-Tage-Woche (bzw. 20 Arbeitstage bei 5-Tage-Woche).</td></tr>\n  </tbody>\n</table>\n<div class=\"vi\">\n  <b>Tóm tắt Tiếng Việt — Luật Bảo hộ Lao động (Arbeitsschutz):</b>\n  <ul>\n    <li><b>ArbZG (Luật Giờ làm việc):</b> Tối đa 8 giờ/ngày (ngoại lệ 10 giờ); <b>nghỉ giữa 2 ca tối thiểu 11 giờ liên tục</b>.</li>\n    <li><b>JArbSchG (Bảo hộ thanh thiếu niên &lt; 18 tuổi):</b> Tối đa 8h/ngày, 40h/tuần, tuần làm 5 ngày; nghỉ giữa ca 30–60 phút; nghỉ phép 30/27/25 ngày làm việc theo độ tuổi.</li>\n    <li><b>MuSchG (Nghỉ thai sản):</b> Cấm làm việc 6 tuần trước sinh và 8 tuần sau sinh, vẫn hưởng nguyên thu nhập.</li>\n    <li><b>BUrlG (Nghỉ phép năm):</b> Tối thiểu 24 ngày làm việc/năm (cho tuần 6 ngày) hoặc 20 ngày (cho tuần 5 ngày).</li>\n  </ul>\n</div>",
          "qa": [
                    {
                              "q": "Wie lang ist die gesetzliche ununterbrochene Mindestruhezeit zwischen zwei Schichten nach § 5 ArbZG?",
                              "qVi": "Thời gian nghỉ giữa 2 ca làm việc (Ruhezeit) theo Luật Arbeitszeitgesetz tối thiểu là bao nhiêu?",
                              "a": "Sie beträgt <b>mindestens 11 Stunden ununterbrochene Ruhezeit</b>.",
                              "aVi": "<b>Tối thiểu 11 giờ liên tục</b> (§ 5 ArbZG).",
                              "src": "IHK / Berufsschule"
                    },
                    {
                              "q": "Welche maximale Arbeitszeit gilt für Jugendliche unter 18 Jahren nach dem JArbSchG?",
                              "qVi": "Thời gian làm việc tối đa của thanh thiếu niên dưới 18 tuổi theo JArbSchG là bao nhiêu?",
                              "a": "Höchstens <b>8 Stunden täglich</b> und <b>40 Stunden wöchentlich</b> bei einer <b>5-Tage-Woche</b> (§ 8 JArbSchG).",
                              "aVi": "Tối đa <b>8 giờ/ngày</b> và <b>40 giờ/tuần</b> trong tuần làm việc 5 ngày.",
                              "src": "IHK / Berufsschule"
                    }
          ]
},
                {
          "id": "wiko-bewerbung-vorstellung",
          "icon": "",
          "name": "LS07, LS08 & LS10 · Bewerbung & Vorstellungsgespräch",
          "desc": "Bewerbungsunterlagen · Phasen des Vorstellungsgesprächs · Vorbereitung",
          "content": "<h2>LS07, LS08 &amp; LS10 · Bewerbung &amp; Vorstellungsgespräch</h2>\n<div class=\"hint\">Bewerbungsmappe nach DIN 5008 · Vorstellungsgespräch Phasen 1–6 · Gastronomie-Voraussetzungen</div>\n<h3 class=\"sub\">1. Bestandteile einer vollständigen Bewerbungsmappe</h3>\n<ul>\n  <li><b>Anschreiben (Bewerbungsschreiben):</b> Auf 1 DIN-A4-Seite gegliedert (Briefkopf, Betreffzeile, Motivation, bisherige Qualifikationen, Stärken und Schlusssatz mit Gesprächswunsch).</li>\n  <li><b>Tabellarischer Lebenslauf:</b> Lückenlose Übersicht (Persönliche Daten, Schulbildung, Praktika, Sprach- und EDV-Kenntnisse, Hobbys/Engagement, Datum und eigenhändige Unterschrift).</li>\n  <li><b>Anlagen:</b> Aktuelle Schulzeugnisse, Praktikumsbeurteilungen, Zertifikate und in der Gastronomie die Bescheinigung über die Erstbelehrung nach <b>§ 43 Infektionsschutzgesetz (IfSG / Rote Karte)</b>.</li>\n</ul>\n<h3 class=\"sub\">2. Die 6 Phasen des Vorstellungsgesprächs</h3>\n<ol>\n  <li><b>Smalltalk &amp; Begrüßung:</b> Eisbrechen, Blickkontakt, freundlicher erster Eindruck.</li>\n  <li><b>Vorstellung des Unternehmens:</b> Der Arbeitgeber präsentiert den Betrieb und die Ausbildungsstelle.</li>\n  <li><b>Selbstpräsentation des Bewerbers:</b> Kurze Zusammenfassung des Werdegangs, der Stärken und der Motivation für den Beruf.</li>\n  <li><b>Fragen des Arbeitgebers:</b> Vertiefung von Fachkenntnissen, Belastbarkeit, Teamfähigkeit und Motivation.</li>\n  <li><b>Eigene Rückfragen des Bewerbers:</b> Interesse zeigen (z. B. nach Ausbildungsablauf, Mentorensystem).</li>\n  <li><b>Abschluss &amp; Verabschiedung:</b> Vereinbarung über das weitere Vorgehen und den Zeithorizont für die Entscheidung.</li>\n</ol>\n<div class=\"vi\">\n  <b>Tóm tắt Tiếng Việt — Hồ sơ xin việc &amp; Phỏng vấn:</b>\n  <ul>\n    <li><b>Hồ sơ (Bewerbungsmappe):</b> Đơn xin việc (Anschreiben 1 trang), Sơ yếu lý lịch bảng biểu (Lebenslauf), Học bạ/chứng chỉ và Giấy khám an toàn vệ sinh thực phẩm (IfSG § 43 / Rote Karte).</li>\n    <li><b>6 Giai đoạn phỏng vấn:</b> 1. Chào hỏi &amp; trò chuyện xã giao → 2. Công ty giới thiệu → 3. Ứng viên tự giới thiệu bản thân → 4. Phỏng vấn chuyên sâu → 5. Ứng viên đặt câu hỏi lại → 6. Tạm biệt và hẹn ngày thông báo kết quả.</li>\n  </ul>\n</div>",
          "qa": [
                    {
                              "q": "Welcher behördliche Nachweis ist für eine Tätigkeit in der Gastronomie und Lebensmittelverarbeitung zwingend erforderlich?",
                              "qVi": "Chứng chỉ vệ sinh nào bắt buộc phải có khi làm việc trong ngành ẩm thực?",
                              "a": "Die Bescheinigung über die Belehrung nach <b>§ 43 Infektionsschutzgesetz (IfSG)</b> durch das Gesundheitsamt (umgangssprachlich 'Rote Karte').",
                              "aVi": "Chứng chỉ tập huấn theo <b>Điều 43 Luật Bảo vệ Chống Nhiễm khuẩn (IfSG)</b> do Sở Y tế cấp (Rote Karte).",
                              "src": "IHK / Berufsschule"
                    }
          ]
},
                {
          "id": "wiko-fragen-agg",
          "icon": "",
          "name": "LS09 · Zulässige & unzulässige Fragen (AGG)",
          "desc": "Allgemeines Gleichbehandlungsgesetz · Recht zur Lüge · Fragerecht des Arbeitgebers",
          "content": "<h2>LS09 · Zulässige &amp; unzulässige Fragen (AGG)</h2>\n<div class=\"hint\">Allgemeines Gleichbehandlungsgesetz (AGG) § 1 · Fragerecht des Arbeitgebers &amp; Recht zur Notlüge</div>\n<h3 class=\"sub\">1. Fragerecht des Arbeitgebers</h3>\n<p>Der Arbeitgeber darf nur Fragen stellen, an denen er ein <b>berechtigtes, billigenswertes und schutzwürdiges Interesse</b> für den konkreten Arbeitsplatz hat (Stellenrelevanz).</p>\n<table class=\"tbl\">\n  <thead><tr><th>Zulässige Fragen (müssen wahrheitsgemäß beantwortet werden)</th><th>Unzulässige Fragen (Recht zur Lüge greift)</th></tr></thead>\n  <tbody>\n    <tr><td>• Bisherige Ausbildung, Qualifikationen und Zeugnisse</td><td>• Bestehende Schwangerschaft oder Kinderwunsch</td></tr>\n    <tr><td>• Fachspezifische Kenntnisse und Berufserfahrung</td><td>• Heiratsabsichten, Partnerschaft und Familienplanung</td></tr>\n    <tr><td>• Relevante Vorstrafen (z. B. Vermögensdelikte bei Kassierern)</td><td>• Religionszugehörigkeit oder Weltanschauung</td></tr>\n    <tr><td>• Bestehende Wettbewerbsverbote oder Wehr-/Zivildienst</td><td>• Parteimitgliedschaft oder Gewerkschaftszugehörigkeit</td></tr>\n    <tr><td>• Krankheiten, die die Eignung dauerhaft ausschließen oder Dritte gefährden (z. B. ansteckende Infektionen in der Küche)</td><td>• Sexuelle Orientierung oder ethnische Herkunft</td></tr>\n  </tbody>\n</table>\n<h3 class=\"sub\">2. Das „Recht zur Lüge“ (Notlüge)</h3>\n<p>Stellt der Arbeitgeber eine <b>unzulässige Frage</b>, darf der Bewerber die Frage <b>bewusst wahrheitswidrig (mit einer Lüge) beantworten</b>, ohne dass der Arbeitgeber den Vertrag später wegen arglistiger Täuschung anfechten oder kündigen darf (§§ 1, 7 AGG).</p>\n<div class=\"vi\">\n  <b>Tóm tắt Tiếng Việt — Câu hỏi phỏng vấn &amp; Luật Bình đẳng (AGG):</b>\n  <ul>\n    <li><b>Câu hỏi được phép:</b> Trình độ, bằng cấp, kinh nghiệm, tiền án liên quan trực tiếp đến vị trí (như tội trộm cắp khi ứng tuyển thu ngân). Phải trả lời thành thật.</li>\n    <li><b>Câu hỏi bị cấm:</b> Mang thai, kế hoạch sinh con, kết hôn, tôn giáo, đảng phái chính trị, công đoàn, xu hướng tính dục.</li>\n    <li><b>Quyền được nói dối (Recht zur Lüge):</b> Nếu nhà tuyển dụng hỏi câu hỏi bị cấm, ứng viên có quyền <b>nói dối hợp pháp</b> mà sau này không bị sa thải hay kiện tụng vì gian dối.</li>\n  </ul>\n</div>",
          "qa": [
                    {
                              "q": "Welches Recht hat ein Bewerber bei unzulässigen Fragen im Vorstellungsgespräch (z. B. nach Schwangerschaft oder Familienplanung)?",
                              "qVi": "Nếu nhà tuyển dụng hỏi câu hỏi bị cấm (như mang thai, gia đình), ứng viên có quyền gì theo AGG?",
                              "a": "Ein <b>Recht zur Lüge (Notlüge)</b>: Der Bewerber darf die Frage wahrheitswidrig beantworten, ohne rechtliche Nachteile oder eine spätere Kündigung befürchten zu müssen.",
                              "aVi": "<b>Quyền được nói dối (Recht zur Lüge)</b> mà không sợ bị hủy hợp đồng hay sa thải sau này.",
                              "src": "IHK / Berufsschule"
                    }
          ]
},
                {
          "id": "wiko-arbeitsvertrag",
          "icon": "",
          "name": "LS13 & LS16 · Der Arbeitsvertrag & Vertragsarten",
          "desc": "Form und Nachweisgesetz · Unbefristet vs. befristet (TzBfG) · Teilzeit & Minijob",
          "content": "<h2>LS13 &amp; LS16 · Der Arbeitsvertrag &amp; Vertragsarten</h2>\n<div class=\"hint\">BGB §§ 611a ff. · Nachweisgesetz · Teilzeit- und Befristungsgesetz (TzBfG)</div>\n<h3 class=\"sub\">1. Zustandekommen und Nachweisgesetz</h3>\n<p>Ein Arbeitsvertrag ist grundsätzlich <b>formfrei</b> (auch mündlich wirksam). Allerdings verpflichtet das <b>Nachweisgesetz (NachwG)</b> den Arbeitgeber, die wesentlichen Vertragsbedingungen (Arbeitszeit, Gehalt, Urlaub, Kündigungsfrist) spätestens einen Monat nach Beginn schriftlich niederzulegen und dem Arbeitnehmer auszuhändigen.</p>\n<h3 class=\"sub\">2. Vertragsarten im Arbeitsrecht</h3>\n<ul>\n  <li><b>Unbefristeter Arbeitsvertrag:</b> Der gesetzliche Regelfall; endet nur durch Kündigung, Aufhebungsvertrag oder Renteneintritt.</li>\n  <li><b>Befristeter Arbeitsvertrag (TzBfG):</b> Endet automatisch mit Zeitablauf ohne Kündigung. Zulässig mit Sachgrund (z. B. Elternzeitvertretung, Saisonspitze) oder sachgrundlos bis zu <b>maximal 2 Jahren</b> (innerhalb dieser Zeit max. 3-mal verlängerbar).</li>\n  <li><b>Teilzeitbeschäftigung:</b> Regelmäßige Wochenarbeitszeit kürzer als bei vergleichbaren Vollzeitkräften; Diskriminierungsverbot.</li>\n  <li><b>Geringfügige Beschäftigung (Minijob):</b> Verdienstgrenze bis zu 538 € monatlich; für den Arbeitnehmer steuer- und sozialversicherungsfrei (Rentenversicherungspflicht mit Befreiungsoption).</li>\n</ul>\n<div class=\"vi\">\n  <b>Tóm tắt Tiếng Việt — Hợp đồng lao động &amp; Các loại hợp đồng:</b>\n  <ul>\n    <li><b>Hình thức:</b> Có thể thỏa thuận miệng, nhưng Luật Nachweisgesetz bắt buộc chủ phải gửi bản cam kết bằng văn bản có đủ điều kiện làm việc trong vòng 1 tháng.</li>\n    <li><b>Hợp đồng không thời hạn (Unbefristet):</b> Phổ biến nhất, chỉ kết thúc khi sa thải/nghỉ việc.</li>\n    <li><b>Hợp đồng có thời hạn (Befristet - TzBfG):</b> Tự động chấm dứt khi hết hạn; không cần lý do thì tối đa 2 năm.</li>\n    <li><b>Minijob (538 €/tháng):</b> Không phải đóng thuế và bảo hiểm xã hội (có thể chọn miễn đóng quỹ hưu).</li>\n  </ul>\n</div>",
          "qa": [
                    {
                              "q": "Wie lange darf ein befristeter Arbeitsvertrag ohne Sachgrund nach dem TzBfG maximal befristet werden?",
                              "qVi": "Hợp đồng lao động có thời hạn không cần lý do (sachgrundlos) được kéo dài tối đa bao lâu theo TzBfG?",
                              "a": "Maximal bis zu <b>zwei Jahren</b>; innerhalb dieser Zeitspanne darf der Vertrag höchstens dreimal verlängert werden (§ 14 Abs. 2 TzBfG).",
                              "aVi": "Tối đa <b>2 năm</b>, và trong khoảng thời gian đó chỉ được phép gia hạn tối đa 3 lần.",
                              "src": "IHK / Berufsschule"
                    }
          ]
},
                {
          "id": "wiko-arbeitszeugnis",
          "icon": "",
          "name": "LS14 & LS15 · Das Arbeitszeugnis & Zeugnissprache",
          "desc": "Einfaches vs. qualifiziertes Zeugnis · Grundsätze der Wahrheit & des Wohlwollens · Codierte Noten",
          "content": "<h2>LS14 &amp; LS15 · Das Arbeitszeugnis &amp; Zeugnissprache</h2>\n<div class=\"hint\">Gewerbeordnung (GewO) § 109 · Einfaches vs. qualifiziertes Zeugnis · Wohlwollensgebot &amp; Zeugniscode</div>\n<h3 class=\"sub\">1. Arten des Arbeitszeugnisses (§ 109 GewO)</h3>\n<ul>\n  <li><b>Einfaches Zeugnis:</b> Enthält lediglich Angaben zur Person, Art der Tätigkeit und genaue Dauer des Beschäftigungsverhältnisses (keine Leistungs- oder Verhaltensbewertung).</li>\n  <li><b>Qualifiziertes Zeugnis:</b> Enthält zusätzlich eine ausführliche Beurteilung von <b>Leistung</b> (Arbeitsbereitschaft, Fachwissen, Arbeitsweise, Erfolge) und <b>Verhalten</b> (Führung gegenüber Vorgesetzten, Kollegen und Gästen).</li>\n</ul>\n<h3 class=\"sub\">2. Zeugnisgrundsätze und Decodierung der Formulierungen</h3>\n<p>Ein Arbeitszeugnis muss der <b>Wahrheit</b> entsprechen, aber gleichzeitig <b>wohlwollend</b> formuliert sein, um das berufliche Fortkommen des Arbeitnehmers nicht unberechtigt zu behindern. Daher entstand der sogenannte „Zeugniscode“:</p>\n<table class=\"tbl\">\n  <thead><tr><th>Note</th><th>Standardformulierung im Zeugniscode</th></tr></thead>\n  <tbody>\n    <tr><td><b>Sehr gut (Note 1)</b></td><td>„… erledigte Aufgaben <b>stets zur vollsten Zufriedenheit</b>.“</td></tr>\n    <tr><td><b>Gut (Note 2)</b></td><td>„… erledigte Aufgaben <b>stets zur vollen Zufriedenheit</b>.“ / „… zur vollsten Zufriedenheit.“</td></tr>\n    <tr><td><b>Befriedigend (Note 3)</b></td><td>„… erledigte Aufgaben <b>zur vollen Zufriedenheit</b>.“</td></tr>\n    <tr><td><b>Ausreichend (Note 4)</b></td><td>„… erledigte Aufgaben <b>zur Zufriedenheit</b>.“</td></tr>\n    <tr><td><b>Mangelhaft (Note 5)</b></td><td>„… hat sich <b>bemüht</b>, die Aufgaben zur Zufriedenheit zu erledigen.“</td></tr>\n  </tbody>\n</table>\n<div class=\"vi\">\n  <b>Tóm tắt Tiếng Việt — Bằng chứng nhận làm việc (Arbeitszeugnis):</b>\n  <ul>\n    <li><b>Einfaches Zeugnis:</b> Chỉ ghi thông tin cá nhân, vị trí làm việc và thời gian làm việc.</li>\n    <li><b>Qualifiziertes Zeugnis:</b> Ghi thêm đánh giá về năng lực làm việc (Leistung) và thái độ ứng xử (Verhalten).</li>\n    <li><b>Nguyên tắc:</b> Trung thực (Wahrheit) nhưng phải thiện chí (Wohlwollen). Do cấm dùng từ ngữ xúc phạm trực tiếp nên các công ty dùng bộ mã ngôn từ (Zeugniscode): từ „stets zur vollsten Zufriedenheit“ (loại 1 xuất sắc) đến „hat sich bemüht“ (loại 5 yếu kém).</li>\n  </ul>\n</div>",
          "qa": [
                    {
                              "q": "Was unterscheidet ein einfaches Arbeitszeugnis von einem qualifizierten Arbeitszeugnis?",
                              "qVi": "Sự khác biệt giữa chứng nhận làm việc đơn giản (einfach) và chuyên sâu (qualifiziert) là gì?",
                              "a": "Das einfache Zeugnis enthält nur Angaben zu Art und Dauer der Tätigkeit; das <b>qualifizierte Zeugnis bewertet zusätzlich Leistung und Führungsverhalten</b> (§ 109 GewO).",
                              "aVi": "Einfaches Zeugnis chỉ ghi thời gian và chức danh; Qualifiziertes Zeugnis có thêm <b>đánh giá kết quả làm việc và thái độ ứng xử</b>.",
                              "src": "IHK / Berufsschule"
                    },
                    {
                              "q": "Welcher Schulnote entspricht im Zeugniscode die Formulierung: „Er erledigte seine Aufgaben stets zur vollsten Zufriedenheit“?",
                              "qVi": "Cụm từ „stets zur vollsten Zufriedenheit“ tương đương điểm số mấy trong hệ thống điểm Đức?",
                              "a": "Sie entspricht der <b>Note 1 (sehr gut)</b>.",
                              "aVi": "Tương đương <b>điểm 1 (xuất sắc - sehr gut)</b>.",
                              "src": "IHK / Berufsschule"
                    }
          ]
}
      ]
    },
    {
      "id": "lf1-kuendigung",
      "badge": "LF 1",
      "title": "LF 1 · Kündigungsrecht & Kündigungsschutz (LS17–20)",
      "items": [
                {
          "id": "wiko-kuendigung-frist",
          "icon": "",
          "name": "LS17 · Ordentliche Kündigung & Kündigungsfristen",
          "desc": "§ 622 BGB · Gesetzliche Kündigungsfrist · Schriftform (§ 623 BGB)",
          "content": "<h2>LS17 · Ordentliche Kündigung &amp; Kündigungsfristen</h2>\n<div class=\"hint\">BGB §§ 622, 623 · Kündigungsfristen, Termine &amp; Formvorschrift</div>\n<h3 class=\"sub\">1. Zwingende Schriftform (§ 623 BGB)</h3>\n<p>Jede Kündigung eines Arbeitsverhältnisses bedarf zwingend der <b>Schriftform mit eigenhändiger Unterschrift</b>. Eine Kündigung per E-Mail, SMS, Fax oder mündlich ist nach § 125 BGB <b>nichtig</b>!</p>\n<h3 class=\"sub\">2. Gesetzliche Kündigungsfristen nach § 622 BGB</h3>\n<ul>\n  <li><b>Grundkündigungsfrist (§ 622 Abs. 1 BGB):</b> <b>4 Wochen zum 15. oder zum Ende eines Kalendermonats</b>. Gilt für Kündigungen durch den Arbeitnehmer und während der ersten 2 Jahre auch für den Arbeitgeber.</li>\n  <li><b>Probezeit im Arbeitsvertrag (§ 622 Abs. 3 BGB):</b> Während einer vereinbarten Probezeit (max. 6 Monate) beträgt die Frist <b>2 Wochen zu jedem Tag</b>.</li>\n  <li><b>Verlängerte Fristen bei Betriebszugehörigkeit (§ 622 Abs. 2 BGB):</b> Bei Kündigung <b>durch den Arbeitgeber</b> verlängert sich die Frist gestaffelt nach Betriebszugehörigkeit (z. B. nach 5 Jahren: 2 Monate zum Monatsende; nach 10 Jahren: 4 Monate zum Monatsende).</li>\n</ul>\n<div class=\"vi\">\n  <b>Tóm tắt Tiếng Việt — Sa thải định kỳ &amp; Thời hạn báo trước (Ordentliche Kündigung):</b>\n  <ul>\n    <li><b>Hình thức:</b> Bắt buộc lập thành <b>văn bản giấy có chữ ký tay (§ 623 BGB)</b>; cấm gửi qua email/tin nhắn.</li>\n    <li><b>Thời hạn báo trước (§ 622 BGB):</b> Tiêu chuẩn là <b>4 tuần báo trước vào ngày 15 hoặc cuối tháng</b>. Trong thử việc (tối đa 6 tháng) thời hạn là 2 tuần vào bất kỳ ngày nào. Người làm việc lâu năm thì thời hạn chủ phải báo trước sẽ tăng dần theo thâm niên.</li>\n  </ul>\n</div>",
          "qa": [
                    {
                              "q": "Welche gesetzliche Formvorschrift gilt zwingend für die Kündigung von Arbeitsverhältnissen?",
                              "qVi": "Hình thức thông báo sa thải hợp pháp theo § 623 BGB bắt buộc phải là gì?",
                              "a": "Die <b>Schriftform mit eigenhändiger Namensunterschrift</b> auf Papier (§ 623 BGB).",
                              "aVi": "<b>Văn bản giấy có chữ ký tay (Schriftform)</b> theo Điều 623 BGB.",
                              "src": "IHK / Berufsschule"
                    },
                    {
                              "q": "Wie lautet die gesetzliche Grundkündigungsfrist für Arbeitnehmer nach § 622 Abs. 1 BGB?",
                              "qVi": "Thời hạn báo trước tiêu chuẩn theo luật là bao lâu?",
                              "a": "<b>4 Wochen zum 15. oder zum Ende eines Kalendermonats</b>.",
                              "aVi": "<b>4 tuần trước ngày 15 hoặc trước ngày cuối tháng</b>.",
                              "src": "IHK / Berufsschule"
                    }
          ]
},
                {
          "id": "wiko-kuendigungsschutz",
          "icon": "",
          "name": "LS18 & LS19 · Kündigungsschutzgesetz & Arbeitsgericht",
          "desc": "Allgemeiner Kündigungsschutz (§ 1 KSchG) · Besonderer Kündigungsschutz · 3-Wochen-Klagefrist",
          "content": "<h2>LS18 &amp; LS19 · Kündigungsschutzgesetz (KSchG) &amp; Arbeitsgericht</h2>\n<div class=\"hint\">Kündigungsschutzgesetz §§ 1 ff. · Sozial ungerechtfertigte Kündigung · 3-Wochen-Frist</div>\n<h3 class=\"sub\">1. Voraussetzungen des allgemeinen Kündigungsschutzes</h3>\n<p>Das Kündigungsschutzgesetz greift, wenn der Betrieb <b>mehr als 10 Arbeitnehmer</b> beschäftigt und das Arbeitsverhältnis <b>länger als 6 Monate ohne Unterbrechung</b> bestanden hat (Wartezeit).</p>\n<h3 class=\"sub\">2. Die drei sozial gerechtfertigten Kündigungsgründe (§ 1 Abs. 2 KSchG)</h3>\n<ul>\n  <li><b>Personenbedingte Kündigung:</b> Gründe in der Person (z. B. dauerhafte schwere Krankheit mit negativer Gesundheitsprognose und betrieblicher Beeinträchtigung). Keine vorherige Abmahnung nötig.</li>\n  <li><b>Verhaltensbedingte Kündigung:</b> Steuerbares Fehlverhalten des Arbeitnehmers (z. B. wiederholte Unpünktlichkeit, Arbeitsverweigerung). Erfordert zwingend eine <b>vorherige einschlägige Abmahnung</b>!</li>\n  <li><b>Betriebsbedingte Kündigung:</b> Dringende betriebliche Erfordernisse (z. B. Schließung einer Abteilung, Auftragsrückgang). Erfordert eine ordnungsgemäße <b>Sozialauswahl</b> nach 4 Kriterien: Lebensalter, Betriebszugehörigkeit, Unterhaltspflichten, Schwerbehinderung.</li>\n</ul>\n<h3 class=\"sub\">3. Besonderer Kündigungsschutz &amp; Klagefrist</h3>\n<p>Absolutes bzw. behördlich genehmigungspflichtiges Kündigungsverbot gilt für: Schwangere (MuSchG), Elternzeitler (BEEG), Schwerbehinderte (SGB IX), Betriebsratsmitglieder, JAV und Azubis nach der Probezeit.</p>\n<p><b>Klagefrist:</b> Will der Arbeitnehmer die Unwirksamkeit geltend machen, muss er <b>innerhalb von 3 Wochen nach Zugang der schriftlichen Kündigung Kündigungsschutzklage beim Arbeitsgericht</b> einreichen (§ 4 KSchG)!</p>\n<div class=\"vi\">\n  <b>Tóm tắt Tiếng Việt — Luật Bảo vệ Chống Sa thải (KSchG) &amp; Tòa Lao động:</b>\n  <ul>\n    <li><b>Điều kiện áp dụng KSchG:</b> Doanh nghiệp có trên 10 nhân viên và người lao động đã làm việc trên 6 tháng.</li>\n    <li><b>3 Lý do sa thải hợp pháp:</b>\n      <ul>\n        <li><b>Personenbedingt (Do yếu tố cá nhân):</b> Ốm đau dài hạn không có khả năng hồi phục.</li>\n        <li><b>Verhaltensbedingt (Do hành vi):</b> Vi phạm kỷ luật, đi muộn nhiều lần (bắt buộc phải có thư cảnh cáo Abmahnung trước đó).</li>\n        <li><b>Betriebsbedingt (Do kinh tế/cơ cấu):</b> Cắt giảm biên chế, bắt buộc phải chọn lọc theo tiêu chí xã hội (tuổi tác, thâm niên, con nhỏ, khuyết tật).</li>\n      </ul>\n    </li>\n    <li><b>Thời hạn khởi kiện:</b> Phải nộp đơn lên Tòa án Lao động (Arbeitsgericht) trong vòng <b>3 tuần kể từ ngày nhận thông báo sa thải</b>; quá 3 tuần thì đơn sa thải tự động có hiệu lực hợp pháp.</li>\n  </ul>\n</div>",
          "qa": [
                    {
                              "q": "Innerhalb welcher Frist muss nach Erhalt einer Kündigung Klage beim Arbeitsgericht erhoben werden?",
                              "qVi": "Thời hạn nộp đơn kiện sa thải lên Tòa án Lao động (Arbeitsgericht) là bao lâu?",
                              "a": "Innerhalb von <b>drei Wochen nach Zugang der schriftlichen Kündigung</b> (§ 4 KSchG).",
                              "aVi": "Trong vòng <b>3 tuần kể từ khi nhận đơn sa thải bằng văn bản</b> (§ 4 KSchG).",
                              "src": "IHK / Berufsschule"
                    },
                    {
                              "q": "Welche vier sozialen Kriterien müssen bei einer betriebsbedingten Kündigung in der Sozialauswahl berücksichtigt werden?",
                              "qVi": "Bốn tiêu chí xã hội nào bắt buộc phải xem xét khi sa thải vì lý do kinh tế (Sozialauswahl)?",
                              "a": "1. <b>Dauer der Betriebszugehörigkeit</b>, 2. <b>Lebensalter</b>, 3. <b>Unterhaltspflichten</b> (z. B. Kinder/Ehepartner), 4. <b>Schwerbehinderung</b>.",
                              "aVi": "1. Thâm niên công tác, 2. Độ tuổi, 3. Nghĩa vụ nuôi dưỡng (con cái, vợ/chồng), 4. Tình trạng khuyết tật.",
                              "src": "IHK / Berufsschule"
                    }
          ]
},
                {
          "id": "wiko-kuendigung-fristlos",
          "icon": "",
          "name": "LS20 · Außerordentliche (fristlose) Kündigung",
          "desc": "§ 626 BGB · Wichtiger Grund · 2-Wochen-Erklärungsfrist · Abmahnung",
          "content": "<h2>LS20 · Außerordentliche (fristlose) Kündigung (§ 626 BGB)</h2>\n<div class=\"hint\">BGB § 626 · Fristlose Kündigung aus wichtigem Grund · Ausschlussfrist von 2 Wochen</div>\n<h3 class=\"sub\">1. Voraussetzungen nach § 626 Abs. 1 BGB</h3>\n<p>Eine außerordentliche Kündigung beendet das Arbeitsverhältnis <b>ohne Einhaltung einer Kündigungsfrist</b>. Sie ist nur wirksam, wenn ein <b>wichtiger Grund</b> vorliegt, durch den dem Kündigenden die Fortsetzung des Arbeitsverhältnisses selbst bis zum Ablauf der regulären Kündigungsfrist unzumutbar ist.</p>\n<p><b>Typische wichtige Gründe:</b> Diebstahl oder Unterschlagung am Arbeitsplatz, tätliche Angriffe oder schwere Beleidigungen, beharrliche Arbeitsverweigerung, schwerer Spesen- oder Arbeitszeitbetrug.</p>\n<h3 class=\"sub\">2. Die 2-Wochen-Ausschlussfrist (§ 626 Abs. 2 BGB)</h3>\n<p>Die Kündigung kann nur <b>innerhalb von zwei Wochen</b> erfolgen, nachdem der Kündigungsberechtigte von den maßgebenden Tatsachen für den Kündigungsgrund Kenntnis erlangt hat. Verstreicht diese Frist, ist eine fristlose Kündigung aus diesem Vorfall unwirksam.</p>\n<div class=\"vi\">\n  <b>Tóm tắt Tiếng Việt — Sa thải ngay lập tức / Không báo trước (Fristlose Kündigung):</b>\n  <ul>\n    <li>Áp dụng khi có <b>lý do đặc biệt nghiêm trọng (Wichtiger Grund)</b> khiến không thể tiếp tục làm việc cùng nhau dù chỉ một ngày (như trộm cắp, đánh nhau, gian lận giờ làm việc).</li>\n    <li><b>Thời hạn 2 tuần (§ 626 Abs. 2 BGB):</b> Kể từ thời điểm phát hiện ra hành vi vi phạm, công ty chỉ có tối đa 2 tuần để ra quyết định sa thải; quá 2 tuần thì mất quyền sa thải không báo trước vì lý do đó.</li>\n  </ul>\n</div>",
          "qa": [
                    {
                              "q": "Innerhalb welcher Frist muss eine außerordentliche (fristlose) Kündigung nach Bekanntwerden des Kündigungsgrundes ausgesprochen werden?",
                              "qVi": "Thời hạn đưa ra thông báo sa thải không báo trước là bao lâu kể từ khi phát hiện sai phạm?",
                              "a": "Innerhalb von <b>zwei Wochen</b> ab Kenntnis der maßgebenden Tatsachen (§ 626 Abs. 2 BGB).",
                              "aVi": "Trong vòng <b>2 tuần</b> kể từ khi người có thẩm quyền biết được sự việc (§ 626 BGB).",
                              "src": "IHK / Berufsschule"
                    }
          ]
}
      ]
    },
    {
      "id": "lf1-betriebsrat-tarif",
      "badge": "LF 1",
      "title": "LF 1 · Betriebsrat, JAV & Tarifvertragsrecht (LS21–34)",
      "items": [
                {
          "id": "wiko-betriebsrat-mitbestimmung",
          "icon": "",
          "name": "LS21, LS22 & LS23 · Betriebsrat & Mitbestimmung",
          "desc": "Betriebsverfassungsgesetz (BetrVG) · 4 Mitbestimmungsstufen · Aufgaben & Rechte",
          "content": "<h2>LS21, LS22 &amp; LS23 · Betriebsrat &amp; Mitbestimmung</h2>\n<div class=\"hint\">Betriebsverfassungsgesetz (BetrVG) · 4 Stufen der Beteiligungsrechte · Betriebsvereinbarung</div>\n<h3 class=\"sub\">1. Wahl und Organisation (§ 1 BetrVG)</h3>\n<p>In Betrieben mit in der Regel <b>mindestens 5 ständigen wahlberechtigten Arbeitnehmern</b> (davon mindestens 3 wählbar) kann ein Betriebsrat gewählt werden. Die Amtszeit beträgt <b>4 Jahre</b>.</p>\n<h3 class=\"sub\">2. Die 4 Stufen der Mitbestimmung</h3>\n<table class=\"tbl\">\n  <thead><tr><th>Stufe</th><th>Beteiligungsrecht</th><th>Typische Praxisbeispiele</th></tr></thead>\n  <tbody>\n    <tr><td><b>1. Information</b></td><td>Recht auf rechtzeitige und umfassende Unterrichtung.</td><td>Wirtschaftliche Lage des Betriebs, Personalplanung, geplante Umbauten.</td></tr>\n    <tr><td><b>2. Anhörung &amp; Beratung</b></td><td>Arbeitgeber muss den Betriebsrat vor Maßnahmen anhören und beraten.</td><td>Anhörung vor <b>jeder Kündigung (§ 102 BetrVG)</b>; eine Kündigung ohne vorherige Anhörung ist nichtig!</td></tr>\n    <tr><td><b>3. Mitwirkung / Widerspruch</b></td><td>Betriebsrat kann unter gesetzlichen Gründen die Zustimmung verweigern.</td><td>Personelle Einzelmaßnahmen: Einstellungen, Ein- und Umgruppierungen, Versetzungen (§ 99 BetrVG).</td></tr>\n    <tr><td><b>4. Echte Mitbestimmung</b></td><td>Maßnahme ist ohne Einigung mit dem Betriebsrat unwirksam; Einigungsstelle entscheidet bei Konflikten.</td><td><b>Arbeitszeiten, Schicht- und Dienstpläne, Überstunden</b> (§ 87 BetrVG), Urlaubsregelungen, Gesundheitsschutz, Zeiterfassung.</td></tr>\n  </tbody>\n</table>\n<div class=\"vi\">\n  <b>Tóm tắt Tiếng Việt — Hội đồng Nhân viên &amp; Quyền Đồng quyết định (Betriebsrat):</b>\n  <ul>\n    <li>Thành lập tại doanh nghiệp có từ 5 nhân viên đủ điều kiện bầu cử trở lên; nhiệm kỳ 4 năm.</li>\n    <li><b>4 Cấp độ tham gia:</b>\n      <ul>\n        <li>1. Thông tin (Information): Được biết tình hình kinh doanh, quy hoạch nhân sự.</li>\n        <li>2. Lắng nghe ý kiến (Anhörung): Bắt buộc trước mỗi quyết định sa thải nhân viên (§ 102 BetrVG).</li>\n        <li>3. Phản đối/Đồng thuận (Mitwirkung): Tuyển dụng mới, thuyên chuyển công tác.</li>\n        <li>4. <b>Đồng quyết định bắt buộc (Echte Mitbestimmung § 87 BetrVG):</b> Lịch làm việc (Dienstplan), chia ca, tăng ca, kế hoạch nghỉ phép. Không có chữ ký của Betriebsrat thì quy định đó không có hiệu lực.</li>\n      </ul>\n    </li>\n  </ul>\n</div>",
          "qa": [
                    {
                              "q": "Welche Mitbestimmungsstufe des Betriebsrats gilt nach § 87 BetrVG für die Festlegung von Dienstplänen und Überstunden?",
                              "qVi": "Quy định xếp lịch làm việc (Dienstplan) và tăng ca thuộc cấp độ Mitbestimmung nào của Betriebsrat?",
                              "a": "Die <b>echte Mitbestimmung</b> (§ 87 Abs. 1 Nr. 2 BetrVG): Ohne Zustimmung des Betriebsrats darf der Arbeitgeber die Maßnahme nicht anordnen.",
                              "aVi": "<b>Echte Mitbestimmung (Đồng quyết định bắt buộc)</b>: Chủ không được tự ý ban hành nếu Betriebsrat chưa đồng ý.",
                              "src": "IHK / Berufsschule"
                    },
                    {
                              "q": "Was passiert mit einer Kündigung, wenn der Arbeitgeber den Betriebsrat vor Ausspruch der Kündigung nicht angehört hat?",
                              "qVi": "Quyết định sa thải có giá trị pháp lý không nếu chủ chưa hỏi ý kiến của Betriebsrat?",
                              "a": "Die Kündigung ist <b>nach § 102 Abs. 1 Satz 3 BetrVG unwirksam (nichtig)</b>.",
                              "aVi": "Quyết định sa thải đó bị <b>vô hiệu hoàn toàn (nichtig)</b> theo § 102 BetrVG.",
                              "src": "IHK / Berufsschule"
                    }
          ]
},
                {
          "id": "wiko-jav",
          "icon": "",
          "name": "LS24 · Jugend- und Auszubildendenvertretung (JAV)",
          "desc": "Interessenvertretung der Jugendlichen & Azubis · Aufgaben nach BetrVG",
          "content": "<h2>LS24 · Jugend- und Auszubildendenvertretung (JAV)</h2>\n<div class=\"hint\">Betriebsverfassungsgesetz §§ 60 ff. · Schutzrechte junger Beschäftigter · Übernahmeanspruch</div>\n<h3 class=\"sub\">1. Wahl und Voraussetzungen</h3>\n<p>Eine JAV wird in Betrieben mit Betriebsrat gewählt, die mindestens <b>5 Jugendliche unter 18 Jahren</b> oder <b>Auszubildende unter 25 Jahren</b> beschäftigen. Wahlberechtigt sind alle Beschäftigten unter 18 sowie alle Azubis unter 25. Wählbar sind alle Beschäftigten unter 25 Jahren.</p>\n<h3 class=\"sub\">2. Aufgaben und Übernahmeanspruch (§ 78a BetrVG)</h3>\n<ul>\n  <li>Wahrnehmung der Belange von Jugendlichen und Azubis gegenüber dem Betriebsrat.</li>\n  <li>Überwachung der Einhaltung von Schutzgesetzen (JArbSchG, BBiG, Unfallverhütung).</li>\n  <li>Teilnahme an Betriebsratssitzungen mit vollem Stimmrecht bei Angelegenheiten, die Jugendliche/Azubis betreffen.</li>\n  <li><b>Schutz bei Ausbildungsende (§ 78a BetrVG):</b> JAV-Mitglieder haben das Recht, innerhalb der letzten 3 Monate der Ausbildung die Weiterbeschäftigung in einem unbefristeten Arbeitsverhältnis schriftlich zu verlangen.</li>\n</ul>\n<div class=\"vi\">\n  <b>Tóm tắt Tiếng Việt — Ban đại diện thanh niên &amp; học nghề (JAV):</b>\n  <ul>\n    <li>Bảo vệ quyền lợi cho thanh thiếu niên &lt; 18 tuổi và học viên học nghề &lt; 25 tuổi.</li>\n    <li>Giám sát thực thi luật bảo hộ lao động và luật BBiG; dự họp Hội đồng nhân viên.</li>\n    <li>Thành viên JAV được luật bảo vệ đặc biệt: có quyền yêu cầu được nhận làm nhân viên chính thức không xác định thời hạn sau khi học xong (§ 78a BetrVG).</li>\n  </ul>\n</div>",
          "qa": [
                    {
                              "q": "Wer ist für die Jugend- und Auszubildendenvertretung (JAV) wahlberechtigt?",
                              "qVi": "Những ai có quyền đi bầu cử Ban đại diện JAV?",
                              "a": "Alle Arbeitnehmer <b>unter 18 Jahren</b> sowie alle <b>Auszubildenden unter 25 Jahren</b> (§ 60 BetrVG).",
                              "aVi": "Tất cả nhân viên <b>dưới 18 tuổi</b> và tất cả học viên học nghề <b>dưới 25 tuổi</b>.",
                              "src": "IHK / Berufsschule"
                    }
          ]
},
                {
          "id": "wiko-tarifvertrag",
          "icon": "",
          "name": "LS25–28 & LS31 · Tarifvertragsrecht & Tarifautonomie",
          "desc": "Mantel- vs. Entgelttarifvertrag · Friedenspflicht · Günstigkeitsprinzip (§ 4 TVG)",
          "content": "<h2>LS25–28 &amp; LS31 · Tarifvertragsrecht &amp; Tarifautonomie</h2>\n<div class=\"hint\">Tarifvertragsgesetz (TVG) · Grundgesetz Art. 9 Abs. 3 (Tarifautonomie) · Günstigkeitsprinzip</div>\n<h3 class=\"sub\">1. Tarifvertragsparteien &amp; Tarifautonomie</h3>\n<p>Tarifverträge werden zwischen <b>Gewerkschaften</b> (z. B. NGG im Gastgewerbe) und <b>Arbeitgeberverbänden</b> (z. B. DEHOGA) oder einzelnen Arbeitgebern ausgehandelt. Nach <b>Art. 9 Abs. 3 GG (Koalitionsfreiheit / Tarifautonomie)</b> regeln die Tarifpartner Löhne und Arbeitsbedingungen eigenverantwortlich ohne Einmischung des Staates.</p>\n<h3 class=\"sub\">2. Arten von Tarifverträgen</h3>\n<ul>\n  <li><b>Manteltarifvertrag (MTV):</b> Regelt die allgemeinen Rahmenbedingungen des Arbeitsverhältnisses (wöchentliche Arbeitszeit, Urlaubstage, Kündigungsfristen, Zuschläge für Nacht- und Feiertagsarbeit). Laufzeit: meist 2 bis 5 Jahre.</li>\n  <li><b>Entgelt-/Lohntarifvertrag:</b> Regelt die konkrete Bezahlung in verschiedenen Entgeltgruppen sowie die Ausbildungsvergütungen. Laufzeit: meist 12 Monate.</li>\n</ul>\n<h3 class=\"sub\">3. Wichtige Tarifgrundsätze</h3>\n<ul>\n  <li><b>Friedenspflicht:</b> Während der Laufzeit eines Tarifvertrags darf über die geregelten Punkte nicht gestreikt werden.</li>\n  <li><b>Günstigkeitsprinzip (§ 4 Abs. 3 TVG):</b> Einzelarbeitsverträge dürfen von Tarifverträgen nur dann abweichen, wenn die Regelung für den Arbeitnehmer <b>günstiger</b> ist (z. B. mehr Urlaub, höherer Lohn).</li>\n</ul>\n<div class=\"vi\">\n  <b>Tóm tắt Tiếng Việt — Luật Thỏa ước Lao động Tập thể (Tarifvertrag):</b>\n  <ul>\n    <li>Ký giữa Công đoàn (NGG) và Hiệp hội giới chủ (DEHOGA). Nhà nước không can thiệp vào đàm phán lương (Tarifautonomie - Điều 9 GG).</li>\n    <li><b>Manteltarifvertrag (Thỏa ước khung):</b> Quy định ngày phép, giờ làm việc tuần, phụ cấp ca đêm, thời hạn báo trước sa thải (hiệu lực 2–5 năm).</li>\n    <li><b>Entgelttarifvertrag (Thỏa ước tiền lương):</b> Quy định mức lương theo bậc và trợ cấp học nghề (hiệu lực 1 năm).</li>\n    <li><b>Günstigkeitsprinzip (§ 4 Abs. 3 TVG):</b> Hợp đồng cá nhân chỉ được khác thỏa ước tập thể khi có lợi hơn cho người lao động.</li>\n  </ul>\n</div>",
          "qa": [
                    {
                              "q": "Was besagt das Günstigkeitsprinzip im Tarifvertragsrecht (§ 4 Abs. 3 TVG)?",
                              "qVi": "Nguyên tắc Günstigkeitsprinzip (§ 4 Abs. 3 TVG) cho phép điều gì?",
                              "a": "Abweichungen vom Tarifvertrag im Einzelarbeitsvertrag sind <b>nur zulässig, wenn sie für den Arbeitnehmer günstiger sind</b> (z. B. höherer Lohn oder mehr Urlaubstage).",
                              "aVi": "Hợp đồng cá nhân <b>chỉ được khác thỏa ước tập thể khi có lợi hơn cho người lao động</b>.",
                              "src": "IHK / Berufsschule"
                    },
                    {
                              "q": "Worin unterscheiden sich Manteltarifvertrag und Entgelttarifvertrag?",
                              "qVi": "Thỏa ước khung (Manteltarif) và Thỏa ước tiền lương (Entgelttarif) khác nhau thế nào?",
                              "a": "Der <b>Manteltarifvertrag</b> regelt allgemeine Arbeitsbedingungen (Arbeitszeit, Urlaub, Kündigungsfristen, Mehrarbeitszuschläge); der <b>Entgelttarifvertrag</b> legt die Höhe der Löhne, Gehälter und Ausbildungsvergütungen fest.",
                              "aVi": "<b>Manteltarif</b> quy định khung điều kiện làm việc (giờ làm, phép, phụ cấp); <b>Entgelttarif</b> quy định mức tiền lương và trợ cấp cụ thể.",
                              "src": "IHK / Berufsschule"
                    }
          ]
},
                {
          "id": "wiko-arbeitskampf",
          "icon": "",
          "name": "LS29–34 · Arbeitskampf & Streikrecht",
          "desc": "Ablauf der Tarifverhandlung · Schlichtung · Urabstimmung (75 %) · Streik vs. Aussperrung",
          "content": "<h2>LS29–34 · Arbeitskampf &amp; Streikrecht</h2>\n<div class=\"hint\">Art. 9 Abs. 3 GG · Phasen des Tarifkonflikts · Friedenspflicht, Warnstreik &amp; Urabstimmung</div>\n<h3 class=\"sub\">1. Ablauf einer Tarifauseinandersetzung</h3>\n<ol>\n  <li><b>Kündigung des Tarifvertrags</b> durch die Gewerkschaft und Aufstellung von Forderungen.</li>\n  <li><b>Tarifverhandlungen:</b> Währenddessen gilt die Friedenspflicht. Scheitern die Verhandlungen, endet die Friedenspflicht.</li>\n  <li><b>Warnstreiks:</b> Kurze befristete Arbeitsniederlegungen zur Druckerhöhung ohne Urabstimmung zulässig.</li>\n  <li><b>Schlichtungsverfahren:</b> Versuch einer Einigung durch einen unabhängigen Schlichter.</li>\n  <li><b>1. Urabstimmung:</b> Gewerkschaftsmitglieder stimmen ab; mindestens <b>75 % Zustimmung</b> für den Streik nötig.</li>\n  <li><b>Streik (Hauptarbeitskampf):</b> Planmäßige Arbeitsniederlegung; Arbeitgeber können mit <b>Aussperrung</b> reagieren. Streikende erhalten kein Gehalt, aber <b>Streikgeld</b> von der Gewerkschaft.</li>\n  <li><b>2. Urabstimmung:</b> Mindestens <b>25 % Zustimmung</b> genügen zur Annahme des neuen Verhandlungsergebnisses.</li>\n</ol>\n<h3 class=\"sub\">2. Wilder Streik</h3>\n<p>Ein Streik ohne Aufruf und Organisation durch eine Gewerkschaft ist ein <b>wilder Streik</b>. Er ist <b>rechtswidrig</b> und berechtigt den Arbeitgeber zur fristlosen Kündigung der Beteiligten!</p>\n<div class=\"vi\">\n  <b>Tóm tắt Tiếng Việt — Đấu tranh lao động &amp; Quyền đình công (Arbeitskampf):</b>\n  <ul>\n    <li>Đình công chỉ hợp pháp khi do <b>Công đoàn chính thức phát động</b> sau khi đàm phán thất bại và bỏ phiếu Urabstimmung đạt trên <b>75% đồng thuận</b>.</li>\n    <li>Đình công tự phát không qua công đoàn (Wilder Streik) là <b>bất hợp pháp</b> và có thể bị sa thải ngay lập tức.</li>\n    <li>Trong lúc đình công, công ty không trả lương nhưng thành viên công đoàn nhận tiền hỗ trợ đình công (Streikgeld). Giới chủ có thể đáp trả bằng đóng cửa xưởng không cho làm việc (Aussperrung).</li>\n  </ul>\n</div>",
          "qa": [
                    {
                              "q": "Wie viel Prozent der Gewerkschaftsmitglieder müssen in der 1. Urabstimmung für einen Streik stimmen?",
                              "qVi": "Trong cuộc bỏ phiếu Urabstimmung lần 1, cần bao nhiêu % phiếu đồng ý để được đình công hợp pháp?",
                              "a": "Mindestens <b>75 % der wahlberechtigten Gewerkschaftsmitglieder</b> müssen für den Streik stimmen.",
                              "aVi": "Tối thiểu <b>75% số thành viên công đoàn</b> tham gia bỏ phiếu đồng ý.",
                              "src": "IHK / Berufsschule"
                    },
                    {
                              "q": "Was versteht man unter einem 'wilden Streik' und welche Folgen hat er?",
                              "qVi": "Đình công tự phát (Wilder Streik) là gì và có hậu quả gì?",
                              "a": "Ein Streik ohne Gewerkschaftsaufruf. Er ist <b>rechtswidrig</b> und kann zu Schadenersatzforderungen und <b>fristlosen Kündigungen</b> führen.",
                              "aVi": "Là cuộc đình công do người lao động tự ý tổ chức không thông qua công đoàn, là hành vi <b>bất hợp pháp</b> và có thể bị sa thải ngay lập tức.",
                              "src": "IHK / Berufsschule"
                    }
          ]
}
      ]
    },
    {
      "id": "lf1-lohn-steuern",
      "badge": "LF 1",
      "title": "LF 1 · Lohnabrechnung, Sozialversicherung & Steuern (LS35–48)",
      "items": [
                {
          "id": "wiko-lohnabrechnung-sozial",
          "icon": "",
          "name": "LS35–41 & LS43 · Lohnabrechnung & Sozialversicherung",
          "desc": "5 Zweige der Sozialversicherung · Brutto-Netto-Ermittlung · Gesetzliche Abzüge",
          "content": "<h2>LS35–41 &amp; LS43 · Lohnabrechnung &amp; Sozialversicherung</h2>\n<div class=\"hint\">5 Säulen der gesetzlichen Sozialversicherung · Paritätische Finanzierung · Brutto zu Netto</div>\n<h3 class=\"sub\">1. Die 5 Säulen der gesetzlichen Sozialversicherung</h3>\n<table class=\"tbl\">\n  <thead><tr><th>Versicherungszweig</th><th>Beitragssatz (ca.)</th><th>Finanzierung</th><th>Träger / Aufgabe</th></tr></thead>\n  <tbody>\n    <tr><td><b>Krankenversicherung</b></td><td>14,6 % + Zusatzbeitrag</td><td>50 % AN / 50 % AG</td><td>Gesetzliche Krankenkassen (AOK, TK, Barmer); Heilbehandlung, Krankengeld.</td></tr>\n    <tr><td><b>Pflegeversicherung</b></td><td>4,0 % (Kinderlose +0,6 %)</td><td>Paritätisch (Zuschlag zahlt AN)</td><td>Pflegekassen bei den Krankenkassen; Unterstützung bei Pflegebedürftigkeit.</td></tr>\n    <tr><td><b>Rentenversicherung</b></td><td>18,6 %</td><td>50 % AN / 50 % AG</td><td>Deutsche Rentenversicherung; Altersrente, Erwerbsminderungsrente, Reha.</td></tr>\n    <tr><td><b>Arbeitslosenversicherung</b></td><td>2,6 %</td><td>50 % AN / 50 % AG</td><td>Bundesagentur für Arbeit; Arbeitslosengeld I, Berufsberatung, Umschulung.</td></tr>\n    <tr><td><b>Unfallversicherung</b></td><td>Nach Gefahrenklasse</td><td><b>100 % Arbeitgeber</b></td><td>Berufsgenossenschaften (z. B. BGN im Gastgewerbe); Arbeitsunfälle, Wegeunfälle.</td></tr>\n  </tbody>\n</table>\n<h3 class=\"sub\">2. Berechnungsschema: Vom Brutto zum Netto</h3>\n<div class=\"formula\">\n  <b>Bruttolohn</b><br>\n  − Steuern (Lohnsteuer + Solidaritätszuschlag + ggf. Kirchensteuer)<br>\n  − Sozialversicherungsbeiträge (Arbeitnehmeranteile KV, PV, RV, AV)<br>\n  <b>= Gesetzliches Nettoentgelt (Nettolohn)</b>\n</div>\n<div class=\"vi\">\n  <b>Tóm tắt Tiếng Việt — Tính lương &amp; 5 Trụ cột Bảo hiểm Xã hội:</b>\n  <ul>\n    <li>5 Quỹ bảo hiểm bắt buộc: BHYT (Kranken), Điều dưỡng (Pflege), Hưu trí (Renten), Thất nghiệp (Arbeitslosen), Tai nạn lao động (Unfall).</li>\n    <li><b>Nguyên tắc chia đôi 50/50 (Parität):</b> 4 quỹ đầu tiên do công ty và người lao động đóng chia đều 50/50. <b>Riêng Bảo hiểm Tai nạn (Unfallversicherung) do Berufsgenossenschaft quản lý thì CHỦ TRẢ 100%</b>.</li>\n    <li>Lương Netto nhận về = Lương Brutto − Tiền thuế (Lohnsteuer, Kirchensteuer) − Tiền bảo hiểm xã hội (phần người lao động).</li>\n  </ul>\n</div>",
          "qa": [
                    {
                              "q": "Welcher Zweig der gesetzlichen Sozialversicherung wird zu 100 % allein vom Arbeitgeber finanziert?",
                              "qVi": "Quỹ bảo hiểm xã hội nào do Chủ doanh nghiệp chi trả 100% kinh phí?",
                              "a": "Die <b>gesetzliche Unfallversicherung</b> (über die Berufsgenossenschaften wie die BGN).",
                              "aVi": "<b>Bảo hiểm Tai nạn lao động (Unfallversicherung)</b> thông qua Berufsgenossenschaft do chủ trả 100%.",
                              "src": "IHK / Berufsschule"
                    },
                    {
                              "q": "Welche fünf Säulen bilden die gesetzliche Sozialversicherung in Deutschland?",
                              "qVi": "Năm trụ cột của bảo hiểm xã hội bắt buộc tại Đức là gì?",
                              "a": "1. Krankenversicherung, 2. Pflegeversicherung, 3. Rentenversicherung, 4. Arbeitslosenversicherung, 5. Unfallversicherung.",
                              "aVi": "1. Bảo hiểm Y tế, 2. Bảo hiểm Điều dưỡng, 3. Bảo hiểm Hưu trí, 4. Bảo hiểm Thất nghiệp, 5. Bảo hiểm Tai nạn lao động.",
                              "src": "IHK / Berufsschule"
                    }
          ]
},
                {
          "id": "wiko-steuerklassen",
          "icon": "",
          "name": "LS42 & LS44–48 · Lohnsteuerklassen & Kaufkraft",
          "desc": "6 Steuerklassen im Überblick · Steuerklassenwechsel III/V vs. IV/IV · Inflation",
          "content": "<h2>LS42 &amp; LS44–48 · Steuerklassen &amp; Lạm phát / Kaufkraft</h2>\n<div class=\"hint\">Lohnsteuerklassen I bis VI · Steuerklassenwahl bei Ehegatten · Inflation &amp; Reallohn</div>\n<h3 class=\"sub\">1. Übersicht der 6 Lohnsteuerklassen</h3>\n<table class=\"tbl\">\n  <thead><tr><th>Klasse</th><th>Zielgruppe / Familienstand</th><th>Besonderheit / Freibeträge</th></tr></thead>\n  <tbody>\n    <tr><td><b>I</b></td><td>Ledige, Geschiedene, dauernd getrennt Lebende.</td><td>Voller Grundfreibetrag, Arbeitnehmerpauschale.</td></tr>\n    <tr><td><b>II</b></td><td>Alleinerziehende mit mindestens einem kindergeldberechtigten Kind.</td><td>Zusätzlicher Entlastungsbetrag für Alleinerziehende.</td></tr>\n    <tr><td><b>III</b></td><td>Verheiratete/Verpartnerte, wenn Partner Steuerklasse V wählt.</td><td>Doppelter Grundfreibetrag; sehr geringe Steuerabzüge (ideal für Hauptverdiener).</td></tr>\n    <tr><td><b>IV</b></td><td>Verheiratete/Verpartnerte, wenn beide Partner etwa gleich viel verdienen.</td><td>Einfacher Grundfreibetrag für beide (Standard nach Heirat).</td></tr>\n    <tr><td><b>V</b></td><td>Verheiratete/Verpartnerte, wenn Partner Steuerklasse III gewählt hat.</td><td>Kein Grundfreibetrag; hohe monatliche Abzüge (für Zweitverdiener).</td></tr>\n    <tr><td><b>VI</b></td><td>Arbeitnehmer mit Zweitjob oder Nebenbeschäftigung über die Minijob-Grenze.</td><td>Keinerlei Freibeträge; höchste monatliche Steuerabzüge.</td></tr>\n  </tbody>\n</table>\n<h3 class=\"sub\">2. Kaufkraft und Inflation</h3>\n<p><b>Inflation</b> bezeichnet den dauerhaften Anstieg des allgemeinen Preisniveaus, wodurch die Kaufkraft des Geldes sinkt. Steigen die Löhne (Nominallohn) langsamer als die Preise, sinkt der <b>Reallohn</b> der Beschäftigten.</p>\n<div class=\"vi\">\n  <b>Tóm tắt Tiếng Việt — 6 Bậc Thuế &amp; Lạm phát / Sức mua:</b>\n  <ul>\n    <li>Bậc I: Độc thân, ly hôn.</li>\n    <li>Bậc II: Bố/mẹ đơn thân nuôi con (được cộng thêm tiền miễn trừ Entlastungsbetrag).</li>\n    <li>Bậc III &amp; V: Vợ chồng có thu nhập chênh lệch lớn (người kiếm nhiều chọn bậc III đóng thuế rất ít, người kiếm ít chọn bậc V đóng thuế cao).</li>\n    <li>Bậc IV: Vợ chồng có thu nhập ngang nhau.</li>\n    <li>Bậc VI: Người làm thêm công việc thứ hai (Zweitjob); không có mức giảm trừ gia cảnh nào, thuế khấu trừ cao nhất.</li>\n    <li>Lạm phát (Inflation): Làm tiền mất giá; nếu lương tăng chậm hơn lạm phát thì lương thực tế (Reallohn) bị giảm sút.</li>\n  </ul>\n</div>",
          "qa": [
                    {
                              "q": "Welche Steuerklasse gilt für einen Arbeitnehmer, der einen zweiten sozialversicherungspflichtigen Job ausübt?",
                              "qVi": "Bậc thuế nào áp dụng cho người đi làm thêm công việc thứ hai ngoài công việc chính?",
                              "a": "Die <b>Steuerklasse VI</b> (hier gelten keinerlei Grundfreibeträge).",
                              "aVi": "<b>Bậc thuế VI (Steuerklasse VI)</b>, không có mức miễn trừ gia cảnh nào.",
                              "src": "IHK / Berufsschule"
                    },
                    {
                              "q": "Welche Steuerklassenkombination wählen Ehegatten typischerweise, wenn einer deutlich mehr verdient als der andere?",
                              "qVi": "Cặp vợ chồng có mức thu nhập chênh lệch lớn thường chọn kết hợp bậc thuế nào?",
                              "a": "Die Kombination <b>Steuerklasse III (für den Besserverdienenden) und Steuerklasse V (für den Geringerverdienenden)</b>.",
                              "aVi": "Kết hợp <b>Bậc III (người kiếm nhiều) và Bậc V (người kiếm ít)</b>.",
                              "src": "IHK / Berufsschule"
                    }
          ]
}
      ]
    },
    {
      "id": "modul-nam2-kaufvertrag",
      "badge": "LF 1",
      "title": "Kaufvertrag, Mängel & Leistungsstörungen",
      "items": [
                {
          "id": "kaufvertrag",
          "icon": "",
          "name": "Kaufvertrag, Mängel & Leistungsstörungen",
          "desc": "Zustandekommen (§ 433 BGB) · Sachmangel & Rechtsmangel · Nacherfüllung · Lieferungsverzug",
          "content": "<h2>Kaufvertrag, Mängel &amp; Leistungsstörungen</h2>\n<div class=\"hint\">BGB §§ 433, 434, 437, 439 · Zustandekommen, Mängelrüge &amp; Rechte des Käufers</div>\n<h3 class=\"sub\">1. Zustandekommen des Kaufvertrags (§ 433 BGB)</h3>\n<p>Ein Kaufvertrag entsteht durch <b>zwei übereinstimmende Willenserklärungen</b>: <b>Antrag (Angebot)</b> und <b>Annahme</b>.</p>\n<ul>\n  <li><b>Angebot:</b> Verbindliche Erklärung an eine bestimmte Person mit allen wesentlichen Vertragsbestandteilen (Ware, Menge, Preis).</li>\n  <li><b>invitatio ad offerendum:</b> Unverbindliche Aufforderung zur Abgabe eines Angebots (z. B. Schaufensterauslage, Speisekarte, Flyer, Webshop).</li>\n</ul>\n<h3 class=\"sub\">2. Pflichten beim Kaufvertrag (§ 433 BGB)</h3>\n<ul>\n  <li><b>Verkäufer:</b> Übergabe und Eigentumsverschaffung an der mangelfreien Ware; Annahme des Kaufpreises.</li>\n  <li><b>Käufer:</b> Zahlung des vereinbarten Kaufpreises; Abnahme der gekauften Ware.</li>\n</ul>\n<h3 class=\"sub\">3. Mängelarten &amp; Rechte des Käufers (§§ 434, 437 BGB)</h3>\n<ul>\n  <li><b>Sachmangel:</b> Ware ist beschädigt, fehlerhaft montiert, falsche Ware (Falschlieferung) oder zu geringe Menge geliefert.</li>\n  <li><b>Rechtsmangel:</b> Ein Dritter hat Rechte an der Sache (z. B. gestohlene Ware, Pfandrechte).</li>\n  <li><b>1. Vorrangiges Recht (Nacherfüllung § 439 BGB):</b> Der Käufer kann nach seiner Wahl <b>Beseitigung des Mangels (Nachbesserung)</b> oder <b>Lieferung einer mangelfreien Sache (Neulieferung)</b> verlangen.</li>\n  <li><b>2. Nachrangige Rechte:</b> Nach erfolglosem Ablauf einer angemessenen Frist zur Nacherfüllung (in der Regel nach 2 erfolglosen Nachbesserungsversuchen): <b>Rücktritt vom Vertrag</b> (Geld zurück) oder <b>Minderung</b> (Kaufpreisherabsetzung) und eventuell <b>Schadenersatz</b>.</li>\n</ul>\n<div class=\"vi\">\n  <b>Tóm tắt Tiếng Việt — Hợp đồng Mua bán &amp; Xử lý hàng lỗi:</b>\n  <ul>\n    <li>Hợp đồng xác lập khi có <b>2 tuyên bố ý chí thống nhất (Angebot + Annahme)</b>. Hàng bày trong tủ kính hay menu chỉ là lời mời chào giá (invitatio ad offerendum).</li>\n    <li>Nghĩa vụ: Người bán giao hàng không lỗi và sang tên quyền sở hữu; Người mua trả tiền và nhận hàng.</li>\n    <li>Khi hàng bị lỗi (Mangel):\n      <ul>\n        <li><b>Quyền ưu tiên số 1 (Nacherfüllung):</b> Yêu cầu đổi mới (Neulieferung) hoặc sửa chữa miễn phí (Nachbesserung).</li>\n        <li><b>Quyền thứ cấp (khi Nacherfüllung bất thành sau 2 lần sửa):</b> Hủy hợp đồng lấy lại tiền (Rücktritt) hoặc Giảm giá (Minderung) và bồi thường thiệt hại.</li>\n      </ul>\n    </li>\n  </ul>\n</div>",
          "qa": [
                    {
                              "q": "Wie kommt ein Kaufvertrag rechtlich zustande?",
                              "qVi": "Một hợp đồng mua bán được xác lập về mặt pháp lý như thế nào?",
                              "a": "Durch <b>zwei übereinstimmende Willenserklärungen</b>: Antrag (Angebot) und Annahme (§ 433 BGB).",
                              "aVi": "Thông qua <b>hai tuyên bố ý chí phù hợp nhau (Angebot và Annahme)</b>.",
                              "src": "IHK / Berufsschule"
                    },
                    {
                              "q": "Welches vorrangige Recht hat der Käufer bei Lieferung einer mangelhaften Sache?",
                              "qVi": "Quyền ưu tiên hàng đầu của người mua khi nhận phải hàng bị lỗi (Mangel) là gì?",
                              "a": "Das Recht auf <b>Nacherfüllung (§ 439 BGB)</b>: Der Käufer kann wahlweise Nachbesserung (Reparatur) oder Neulieferung einer mangelfreien Sache verlangen.",
                              "aVi": "<b>Nacherfüllung</b>: Người mua có quyền chọn yêu cầu sửa chữa (Nachbesserung) hoặc đổi sản phẩm mới (Neulieferung).",
                              "src": "IHK / Berufsschule"
                    },
                    {
                              "q": "Was ist der Unterschied zwischen einem Sachmangel und einem Rechtsmangel?",
                              "qVi": "Sự khác biệt giữa Sachmangel (lỗi vật lý) và Rechtsmangel (lỗi pháp lý) là gì?",
                              "a": "Ein <b>Sachmangel</b> betrifft die Beschaffenheit der Ware (z. B. defekt, falsch, zu wenig geliefert); ein <b>Rechtsmangel</b> liegt vor, wenn ein Dritter Rechte an der Sache geltend machen kann (z. B. gestohlene Ware oder Pfandrecht).",
                              "aVi": "<b>Sachmangel</b> là hàng bị hỏng, sai mẫu hoặc thiếu; <b>Rechtsmangel</b> là hàng bị quyền sở hữu của bên thứ ba tranh chấp (hàng ăn trộm, cầm cố).",
                              "src": "IHK / Berufsschule"
                    }
          ]
}
      ]
    },
    {
      "id": "lf-rechtsgeschaefte",
      "badge": "Recht (BGB)",
      "title": "Rechtsgeschäfte · Geschäftsfähigkeit · Eigentum & Besitz",
      "items": [
        {
          "id": "wiko-rg-p1",
          "icon": "",
          "name": "Rechtsgeschäfte · Rechtsfähigkeit & Geschäftsfähigkeit",
          "desc": "Rechtsfähigkeit (§ 1 BGB) vs. Geschäftsfähigkeit (§§ 104 ff. BGB)",
          "content": "<h2>Rechtsgeschäfte · Rechtsfähigkeit & Geschäftsfähigkeit</h2>\n<div class=\"hint\">Gesetzbuch zum Lernen (DE–VI) · BGB</div>\n<h3 class=\"sub\">1.1 Rechtsfähigkeit <span class=\'vi-sub\'>— Năng lực pháp luật</span></h3>\n\n  <div class=\"block\">\n    <div class=\"de\"><b>Definition</b> \n      Rechtsfähigkeit ist die Fähigkeit von Personen, Träger von Rechten und Pflichten sein zu können.\n    </div>\n    <div class=\"vi\"><b>Übersetzung</b> \n      Năng lực pháp luật là khả năng của một người trở thành chủ thể mang các quyền và nghĩa vụ.\n    </div>\n  </div>\n\n  <div class=\"de\">Rechtsfähig sind <b>natürliche Personen</b> und <b>juristische Personen</b>.</div>\n  <div class=\"vi\">Có năng lực pháp luật gồm <b>tự nhiên nhân</b> (con người) và <b>pháp nhân</b>.</div>\n\n  <h4 style=\"font-family:&#39;IBM Plex Sans&#39;,sans-serif; color:var(--ink); margin-top:24px; font-size:1rem;\">a) Natürliche Personen</h4>\n  <ul>\n    <li class=\"de\">Das sind <b>alle Menschen</b> <span class=\"para-code\">§1 BGB</span></li>\n    <li class=\"de\">Beginn: mit der Vollendung der Geburt</li>\n    <li class=\"de\">Ende: mit dem Tod</li>\n    <li class=\"de\">Jeder Mensch ist rechtsfähig — unabhängig vom Alter.</li>\n  </ul>\n  <div class=\"vi\" style=\"margin-top:-8px;\"><b>Übersetzung</b> Đó là <b>tất cả con người</b> (§1 BGB). Bắt đầu khi sinh ra hoàn tất, kết thúc khi chết. Mọi người đều có năng lực pháp luật, không phân biệt tuổi tác.</div>\n\n  <div class=\"example\"><b>Beispiel · Ví dụ</b> \n    <span class=\"de\">Das Erbrecht eines neugeborenen Kindes.</span><br>\n    <span class=\"vi\" style=\"border:none; padding:4px 0 0;\">Quyền thừa kế của một đứa trẻ mới sinh.</span>\n  </div>\n\n  <h4 style=\"font-family:&#39;IBM Plex Sans&#39;,sans-serif; color:var(--ink); margin-top:24px; font-size:1rem;\">b) Juristische Personen</h4>\n  <div class=\"de\">\"Künstliche Personen\", denen der Staat kraft Gesetzes Rechtsfähigkeit verleiht.</div>\n  <div class=\"vi\">\"Con người nhân tạo\", được nhà nước trao tư cách chủ thể pháp luật bằng luật.</div>\n\n  <div class=\"grid2\" style=\"margin-top:14px;\">\n    <div class=\"block\" style=\"margin:0;\">\n      <div class=\"de\" style=\"border-radius:6px;\"><b>Privates Recht</b> \n        z. B. GmbH, AG, eingetragener Verein.<br>Rechtsfähig ab <b>Eintragung ins Register</b> bis zur <b>Löschung</b>.\n      </div>\n      <div class=\"vi\"><b>Luật tư</b> VD: GmbH, AG, hội đăng ký. Có tư cách pháp nhân từ khi đăng ký vào sổ đăng bạ đến khi bị xóa tên.</div>\n    </div>\n    <div class=\"block\" style=\"margin:0;\">\n      <div class=\"de\" style=\"border-radius:6px;\"><b>Öffentliches Recht</b> \n        z. B. Länder, Gemeinden, Handwerkskammer.<br>Rechtsfähig durch <b>staatliche Verleihung</b> bis zum <b>Entzug</b>.\n      </div>\n      <div class=\"vi\"><b>Luật công</b> VD: các Bang, xã/phường, phòng thủ công. Có tư cách pháp nhân qua sự ban cấp của nhà nước đến khi bị thu hồi.</div>\n    </div>\n  </div>\n\n  <h3 class=\"sub\">1.2 Geschäftsfähigkeit <span class=\'vi-sub\'>— Năng lực hành vi dân sự</span></h3>\n\n  <div class=\"block\">\n    <div class=\"de\"><b>Definition</b> \n      Geschäftsfähigkeit ist die Fähigkeit von Personen, Willenserklärungen rechtswirksam abzugeben, entgegenzunehmen und zu widerrufen, d. h. vollgültige Rechtsgeschäfte zu tätigen.\n    </div>\n    <div class=\"vi\"><b>Übersetzung</b> \n      Là khả năng tự mình đưa ra, tiếp nhận và rút lại tuyên bố ý chí một cách hợp pháp, tức là tự thực hiện các giao dịch có hiệu lực đầy đủ.\n    </div>\n  </div>\n\n  <div class=\"timeline\">\n    <div>Geburt<span class=\"vi-mini\">sinh ra</span></div>\n    <div>→</div>\n    <div>7 Jahre</div>\n    <div>→</div>\n    <div>18 Jahre</div>\n    <div>→</div>\n    <div>Tod<span class=\"vi-mini\">chết</span></div>\n  </div>\n\n  <h4 style=\"font-family:&#39;IBM Plex Sans&#39;,sans-serif; color:var(--ink); margin-top:24px; font-size:1rem;\">1) Geschäftsunfähigkeit <span class=\"para-code\">§104 BGB</span></h4>\n  <div class=\"de\">Kinder <b>unter 7 Jahren</b> sind geschäftsunfähig. Personen mit dauernder krankhafter Störung der Geistestätigkeit gelten ebenso als geschäftsunfähig.</div>\n  <div class=\"vi\">Trẻ em <b>dưới 7 tuổi</b> mất năng lực hành vi. Người bị rối loạn tâm thần lâu dài cũng được xem như trẻ em (mất năng lực hành vi).</div>\n\n  <div class=\"note\"><b>Rechtsfolge · Hậu quả pháp lý</b> \n    <span class=\"de\">Willenserklärungen sind unwirksam. Verträge sind immer <b>nichtig</b>. <span class=\"para-code\">§105 BGB</span> Es ist ein gesetzlicher Vertreter (i. d. R. die Eltern) nötig.</span><br><br>\n    <span class=\"vi\" style=\"border:none; padding:0;\">Tuyên bố ý chí không có hiệu lực. Hợp đồng luôn <b>vô hiệu</b>. Cần người đại diện hợp pháp (thường là cha mẹ) thực hiện thay.</span>\n  </div>\n\n  <h4 style=\"font-family:&#39;IBM Plex Sans&#39;,sans-serif; color:var(--ink); margin-top:24px; font-size:1rem;\">2) Beschränkte Geschäftsfähigkeit <span class=\"para-code\">§106 BGB</span></h4>\n  <div class=\"de\">Minderjährige <b>von 7 bis unter 18 Jahren</b>. Rechtsgeschäfte benötigen die Zustimmung des gesetzlichen Vertreters.</div>\n  <div class=\"vi\">Người vị thành niên <b>từ 7 đến dưới 18 tuổi</b>. Giao dịch cần sự đồng ý của người đại diện hợp pháp.</div>\n\n  <ul style=\"margin-top:14px;\">\n    <li class=\"de\"><b>Einwilligung</b> — Zustimmung <i>vorab</i>, bevor das Geschäft geschlossen wird.</li>\n    <li class=\"de\"><b>Genehmigung</b> — Zustimmung <i>danach</i>, nachdem das Geschäft geschlossen wurde.</li>\n  </ul>\n  <div class=\"vi\" style=\"margin-top:-8px;\"><b>Einwilligung</b> (chấp thuận trước): đồng ý trước khi giao dịch diễn ra. <b>Genehmigung</b> (phê chuẩn sau): đồng ý sau khi giao dịch đã diễn ra.</div>\n\n  <div class=\"warn\" style=\"margin-top:16px;\"><b>Rechtsfolge · Hậu quả pháp lý</b> \n    <span class=\"de\">Bis zur Entscheidung des Vertreters ist der Vertrag <b>schwebend unwirksam</b>. Bei Verweigerung: von Anfang an unwirksam. Bei Genehmigung: von Anfang an wirksam.</span><br><br>\n    <span class=\"vi\" style=\"border:none; padding:0;\">Chừng nào chưa có quyết định của người đại diện, hợp đồng ở trạng thái <b>\"treo\"</b> — chưa có hiệu lực. Nếu bị từ chối: vô hiệu từ đầu. Nếu được phê chuẩn: có hiệu lực từ đầu.</span>\n  </div>\n\n  <h5 style=\"font-family:&#39;IBM Plex Sans&#39;,sans-serif; color:var(--wax); margin-top:22px; font-size:.92rem;\">Ausnahmen — keine Zustimmung nötig<span style=\"display:block; color:var(--slate); font-weight:400; font-size:.85rem; margin-top:2px;\">Ngoại lệ — không cần sự đồng ý</span></h5>\n  <ul>\n    <li class=\"de\"><b>Lediglich rechtlicher Vorteil</b> <span class=\"para-code\">§107 BGB</span> — z. B. eine Schenkung annehmen.\n      <div class=\"vi\" style=\"border:none; padding:4px 0 0 0; margin:0;\">Lợi ích pháp lý thuần túy — VD: nhận quà tặng.</div>\n    </li>\n    <li class=\"de\" style=\"margin-top:12px;\"><b>Taschengeldparagraph</b> <span class=\"para-code\">§110 BGB</span> — Geschäfte, die mit eigenen Mitteln sofort bezahlt werden.\n      <div class=\"vi\" style=\"border:none; padding:4px 0 0 0; margin:0;\">Điều khoản \"tiền tiêu vặt\" — giao dịch được thanh toán ngay bằng tiền của chính mình.</div>\n      <div class=\"warn\" style=\"margin-top:8px;\"><b>Achtung · Lưu ý</b> \n        <span class=\"de\">Gilt <b>nicht</b> für Ratenkäufe oder Handyverträge.</span><br>\n        <span class=\"vi\" style=\"border:none; padding:0;\">KHÔNG áp dụng cho mua trả góp hoặc hợp đồng điện thoại.</span>\n      </div>\n    </li>\n    <li class=\"de\" style=\"margin-top:12px;\"><b>Arbeitsverhältnis</b> <span class=\"para-code\">§113 BGB</span> — wenn der gesetzliche Vertreter zugestimmt hat.\n      <div class=\"vi\" style=\"border:none; padding:4px 0 0 0; margin:0;\">Quan hệ lao động — khi người đại diện hợp pháp đã đồng ý (không tính Ausbildung/học nghề).</div>\n    </li>\n  </ul>\n\n  <h4 style=\"font-family:&#39;IBM Plex Sans&#39;,sans-serif; color:var(--ink); margin-top:24px; font-size:1rem;\">3) Unbeschränkte Geschäftsfähigkeit <span class=\"para-code\">§2 BGB</span></h4>\n  <div class=\"de\">Personen <b>ab 18 Jahren</b> (außer bei dauernder Geistesstörung).</div>\n  <div class=\"vi\">Người <b>từ đủ 18 tuổi trở lên</b> (trừ trường hợp rối loạn tâm thần lâu dài).</div>\n  <div class=\"note\"><b>Rechtsfolge · Hậu quả pháp lý</b> \n    <span class=\"de\">Alle Rechtsgeschäfte sind voll rechtsgültig, ohne Zustimmung nötig.</span><br>\n    <span class=\"vi\" style=\"border:none; padding:0;\">Mọi giao dịch pháp lý có hiệu lực đầy đủ, không cần sự đồng ý của ai.</span>\n  </div>\n\n  <table>\n    <tbody><tr><th>Alter<span style=\"display:block;font-weight:400;font-size:.7rem;\">Độ tuổi</span></th><th>Stufe<span style=\"display:block;font-weight:400;font-size:.7rem;\">Mức độ</span></th><th>Rechtsfolge<span style=\"display:block;font-weight:400;font-size:.7rem;\">Hậu quả</span></th></tr>\n    <tr><td>Unter 7 Jahren</td><td>Geschäftsunfähig</td><td>Nichtig</td></tr>\n    <tr><td>7 – unter 18 Jahren</td><td>Beschränkt geschäftsfähig</td><td>Schwebend unwirksam</td></tr>\n    <tr><td>Ab 18 Jahren</td><td>Unbeschränkt geschäftsfähig</td><td>Voll gültig</td></tr>\n  </tbody></table>"
        ,
          "qa": [
            {
                        "q": "Wann beginnt und wann endet die Rechtsfähigkeit einer natürlichen Person nach dem BGB?",
                        "qVi": "Năng lực pháp luật của một tự nhiên nhân bắt đầu và kết thúc khi nào theo BGB?",
                        "a": "Die Rechtsfähigkeit einer natürlichen Person beginnt mit der <b>Vollendung der Geburt (§ 1 BGB)</b> und endet mit dem <b>Tod</b>.",
                        "aVi": "Bắt đầu từ khi <b>sinh ra hoàn tất (§ 1 BGB)</b> và chấm dứt khi <b>chết</b>.",
                        "src": "IHK / Berufsschule"
            },
            {
                        "q": "In welche drei Stufen wird die Geschäftsfähigkeit im BGB eingeteilt?",
                        "qVi": "Năng lực hành vi dân sự được chia thành 3 mức độ nào trong BGB?",
                        "a": "1. <b>Geschäftsunfähigkeit</b> (0 bis unter 7 Jahre sowie dauerhaft geistig Behinderte; Willenserklärungen sind nichtig nach § 104 BGB).<br>2. <b>Beschränkte Geschäftsfähigkeit</b> (7 bis unter 18 Jahre; Rechtsgeschäfte sind schwebend unwirksam bis zur Zustimmung der Eltern nach §§ 106, 107 BGB, Ausnahme Taschengeldparagraph § 110 BGB).<br>3. <b>Volle Geschäftsfähigkeit</b> (ab Vollendung des 18. Lebensjahres nach § 2 BGB).",
                        "aVi": "1. <b>Geschäftsunfähigkeit:</b> Trẻ dưới 7 tuổi và người mất trí; giao dịch vô hiệu.<br>2. <b>Beschränkte Geschäftsfähigkeit:</b> Từ 7 đến dưới 18 tuổi; giao dịch treo chờ cha mẹ đồng ý (trừ điều khoản tiền tiêu vặt § 110 BGB).<br>3. <b>Volle Geschäftsfähigkeit:</b> Từ đủ 18 tuổi trở lên.",
                        "src": "IHK / Berufsschule"
            }
]
        },
        {
          "id": "wiko-rg-p2",
          "icon": "",
          "name": "Rechtsgeschäfte · Rechtsgeschäfte",
          "desc": "Willenserklärungen, ein- & mehrseitige Rechtsgeschäfte, Formvorschriften & Anfechtung",
          "content": "<h2>Rechtsgeschäfte · Rechtsgeschäfte</h2>\n<div class=\"hint\">Gesetzbuch zum Lernen (DE–VI) · BGB</div>\n<h3 class=\"sub\">2.1 Willenserklärung <span class=\'vi-sub\'>— Tuyên bố ý chí</span></h3>\n  <div class=\"block\">\n    <div class=\"de\"><b>Definition</b> Willenserklärungen sind Äußerungen einer Person, die mit der Absicht vorgenommen werden, eine rechtliche Wirkung herbeizuführen. Sie besteht aus <b>Wille</b> und <b>Erklärung</b>.</div>\n    <div class=\"vi\"><b>Übersetzung</b> Là hành vi/tuyên bố của một người nhằm mục đích tạo ra hậu quả pháp lý. Gồm <b>ý chí</b> (mong muốn) và <b>sự thể hiện</b> ý chí đó.</div>\n  </div>\n\n  <ul>\n    <li class=\"de\"><b>Unmittelbare Handlungen</b> — mündlich, telefonisch, schriftlich, per E-Mail.\n      <div class=\"vi\" style=\"border:none; padding:4px 0 0 0; margin:0;\">Hành động trực tiếp: nói, gọi điện, viết, email.</div>\n    </li>\n    <li class=\"de\" style=\"margin-top:10px;\"><b>Schlüssige Handlungen</b> — Einsteigen in die Straßenbahn, Münzeinwurf, Kopfnicken.\n      <div class=\"vi\" style=\"border:none; padding:4px 0 0 0; margin:0;\">Hành vi ngụ ý: lên tàu điện, bỏ xu vào máy, gật đầu.</div>\n    </li>\n    <li class=\"de\" style=\"margin-top:10px;\"><b>Ausnahmsweise Schweigen</b> — nur, wenn vertraglich vereinbart.\n      <div class=\"vi\" style=\"border:none; padding:4px 0 0 0; margin:0;\">Im lặng (ngoại lệ): chỉ khi đã thỏa thuận trước trong hợp đồng.</div>\n    </li>\n  </ul>\n\n  <h3 class=\"sub\">2.2 Einseitige Rechtsgeschäfte <span class=\'vi-sub\'>— Giao dịch đơn phương</span></h3>\n  <div class=\"de\">Es wird nur <b>eine</b> Willenserklärung benötigt.</div>\n  <div class=\"vi\">Chỉ cần <b>một</b> tuyên bố ý chí.</div>\n\n  <div class=\"grid2\" style=\"margin-top:14px;\">\n    <div class=\"block\" style=\"margin:0;\">\n      <div class=\"de\" style=\"border-radius:6px;\"><b>Nicht empfangsbedürftig</b><br>Wirksam sofort bei Abgabe.</div>\n      <div class=\"vi\">Không cần người nhận — có hiệu lực ngay khi đưa ra.</div>\n      <div class=\"example\"><b>Beispiel · Ví dụ</b> <span class=\"de\">Testament</span> — <span class=\"vi\" style=\"border:none; padding:0;\">di chúc, có hiệu lực ngay khi viết xong.</span></div>\n    </div>\n    <div class=\"block\" style=\"margin:0;\">\n      <div class=\"de\" style=\"border-radius:6px;\"><b>Empfangsbedürftig</b><br>Wirksam erst bei Zugang.</div>\n      <div class=\"vi\">Cần người nhận — chỉ có hiệu lực khi đến tay người nhận.</div>\n      <div class=\"example\"><b>Beispiel · Ví dụ</b> <span class=\"de\">Kündigung</span> — <span class=\"vi\" style=\"border:none; padding:0;\">thông báo chấm dứt hợp đồng.</span></div>\n    </div>\n  </div>\n\n  <ul style=\"margin-top:16px;\">\n    <li class=\"de\"><b>Unter Anwesenden</b> — wirksam sofort bei Abgabe.\n      <div class=\"vi\" style=\"border:none; padding:4px 0 0 0; margin:0;\">Giữa người có mặt: có hiệu lực ngay khi đưa ra.</div>\n    </li>\n    <li class=\"de\" style=\"margin-top:10px;\"><b>Unter Abwesenden</b> — wirksam bei Zugang (wenn der Empfänger unter normalen Umständen Kenntnis nehmen könnte).\n      <div class=\"vi\" style=\"border:none; padding:4px 0 0 0; margin:0;\">Giữa người vắng mặt: có hiệu lực khi đến nơi (người nhận có thể biết trong điều kiện bình thường).</div>\n    </li>\n  </ul>\n\n  <h3 class=\"sub\">2.3 Zweiseitige (mehrseitige) Rechtsgeschäfte <span class=\'vi-sub\'>— Giao dịch nhiều bên</span></h3>\n  <div class=\"de\">Mindestens <b>zwei</b> übereinstimmende Willenserklärungen → <b>Verträge</b>: <b>Antrag</b> + <b>Annahme</b>.</div>\n  <div class=\"vi\">Cần ít nhất <b>hai</b> tuyên bố ý chí trùng khớp → gọi là <b>hợp đồng</b>: Đề nghị + Chấp nhận.</div>\n\n  <div class=\"example\"><b>Beispiel · Ví dụ</b> \n    <span class=\"de\"><b>Einseitig verpflichtend:</b> Schenkungsvertrag. <b>Zweiseitig verpflichtend:</b> Kaufvertrag, Mietvertrag, Berufsausbildungsvertrag.</span><br>\n    <span class=\"vi\" style=\"border:none; padding:4px 0 0 0;\">Ràng buộc 1 bên: hợp đồng tặng cho. Ràng buộc 2 bên: hợp đồng mua bán, thuê nhà, học nghề.</span>\n  </div>\n\n  <h3 class=\"sub\">2.4 Formfreiheit &amp; Formzwang <span class=\'vi-sub\'>— Tự do hình thức &amp; Bắt buộc hình thức</span></h3>\n  <div class=\"block\">\n    <div class=\"de\"><b>Formfreiheit</b> Rechtsgeschäfte können in <b>jeder Form</b> geschlossen werden — mündlich, telefonisch, schriftlich, per E-Mail, schlüssig, ausnahmsweise durch Schweigen.</div>\n    <div class=\"vi\"><b>Tự do hình thức</b> Giao dịch có thể được thực hiện dưới bất kỳ hình thức nào.</div>\n  </div>\n\n  <div class=\"de\">Formzwang dient der <b>Beweissicherung</b>, dem <b>Schutz vor voreiligen Verpflichtungen</b> und der <b>genauen Abgrenzung</b> zwischen Verhandlung und Bindung.</div>\n  <div class=\"vi\">Bắt buộc hình thức nhằm đảm bảo chứng cứ, bảo vệ khỏi cam kết vội vàng, và phân định rõ ràng giữa đàm phán và cam kết ràng buộc.</div>\n\n  <table style=\"margin-top:18px;\">\n    <tbody><tr><th>Form<span style=\"display:block;font-weight:400;font-size:.7rem;\">Hình thức</span></th><th>Anforderung<span style=\"display:block;font-weight:400;font-size:.7rem;\">Yêu cầu</span></th><th>Beispiel<span style=\"display:block;font-weight:400;font-size:.7rem;\">Ví dụ</span></th></tr>\n    <tr>\n      <td><b>Schriftform</b><br><span class=\"para-code\">§126</span></td>\n      <td>Handschriftliche Unterschrift aller Beteiligten.</td>\n      <td>Kündigung, Testament, Verbraucherdarlehen<div class=\"vi-cell\">Đơn nghỉ việc, di chúc, tín dụng tiêu dùng</div></td>\n    </tr>\n    <tr>\n      <td><b>Elektronische Form</b><br><span class=\"para-code\">§126a</span></td>\n      <td>Qualifizierte elektronische Signatur.</td>\n      <td>Online-Banking, Pay-TV<div class=\"vi-cell\">Ngân hàng trực tuyến, truyền hình trả phí</div></td>\n    </tr>\n    <tr>\n      <td><b>Textform</b><br><span class=\"para-code\">§126b</span></td>\n      <td>Lesbare Erklärung, keine Unterschrift nötig.</td>\n      <td>Widerrufsbelehrung, Garantieerklärung<div class=\"vi-cell\">Hướng dẫn hủy hợp đồng, giấy bảo hành</div></td>\n    </tr>\n    <tr>\n      <td><b>Öffentliche Beglaubigung</b><br><span class=\"para-code\">§129</span></td>\n      <td>Notar bestätigt die Echtheit der Unterschrift.</td>\n      <td>Eintrag ins Handelsregister<div class=\"vi-cell\">Đăng ký vào sổ đăng ký thương mại</div></td>\n    </tr>\n    <tr>\n      <td><b>Notarielle Beurkundung</b><br><span class=\"para-code\">§128</span></td>\n      <td>Notar bestätigt Unterschrift und Inhalt.</td>\n      <td>Ehevertrag, Grundstückskauf<div class=\"vi-cell\">Hợp đồng hôn nhân, mua bán đất đai</div></td>\n    </tr>\n  </tbody></table>\n\n  <div class=\"note\"><b>Besonderheit · Lưu ý đặc biệt</b> \n    <span class=\"de\">Ein privates Testament muss <b>vollständig handschriftlich</b> verfasst und unterschrieben sein — getippt und nur unterschrieben ist formwidrig und <b>nichtig</b>.</span><br>\n    <span class=\"vi\" style=\"border:none; padding:0;\">Di chúc riêng phải viết tay hoàn toàn và ký tên — nếu đánh máy dù có ký tay vẫn vi phạm hình thức và vô hiệu.</span>\n  </div>\n  <div class=\"note\"><b>Rechtsfolge · Hậu quả pháp lý</b> \n    <span class=\"de\">Verstoß gegen Formzwang → das Rechtsgeschäft ist <b>nichtig</b>. <span class=\"para-code\">§125 BGB</span></span><br>\n    <span class=\"vi\" style=\"border:none; padding:0;\">Vi phạm hình thức bắt buộc → giao dịch vô hiệu.</span>\n  </div>\n\n  <h3 class=\"sub\">2.5 Anfechtbare Rechtsgeschäfte <span class=\'vi-sub\'>— Giao dịch có thể bị hủy bỏ</span></h3>\n  <div class=\"block\">\n    <div class=\"de\"><b>Definition</b> Die <b>Anfechtung</b> ist eine Willenserklärung, die ein Rechtsgeschäft rückwirkend unwirksam macht. Bis zur Anfechtung ist das Geschäft voll rechtswirksam; danach ist es von Anfang an nichtig.</div>\n    <div class=\"vi\"><b>Übersetzung</b> Là tuyên bố ý chí làm cho một giao dịch vô hiệu hồi tố. Trước khi bị hủy, giao dịch vẫn có hiệu lực đầy đủ; sau khi hủy, vô hiệu từ đầu.</div>\n  </div>\n\n  <ol>\n    <li class=\"de\"><b>Irrtum</b> — Erklärungsirrtum oder falsche Übermittlung.\n      <div class=\"vi\" style=\"border:none; padding:4px 0 0 0; margin:0;\">Nhầm lẫn — sai sót khi tuyên bố hoặc truyền đạt sai.</div>\n      <div class=\"example\"><b>Beispiel · Ví dụ</b> <span class=\"de\">Ein Handwerker verschreibt sich beim Preis: 840 € statt 740 €.</span><br><span class=\"vi\" style=\"border:none; padding:0;\">Thợ thủ công viết nhầm giá 740€ thay vì 840€.</span></div>\n    </li>\n    <li class=\"de\" style=\"margin-top:14px;\"><b>Arglistige Täuschung</b> — Vorspiegeln falscher oder Unterdrücken wahrer Tatsachen.\n      <div class=\"vi\" style=\"border:none; padding:4px 0 0 0; margin:0;\">Lừa dối cố ý — đưa thông tin sai hoặc che giấu sự thật.</div>\n      <div class=\"example\"><b>Beispiel · Ví dụ</b> <span class=\"de\">Ein Verkäufer bezeichnet Parkett \"2. Wahl\" als \"1. Wahl\".</span><br><span class=\"vi\" style=\"border:none; padding:0;\">Người bán gọi sàn gỗ \"hạng 2\" là \"hạng 1\".</span></div>\n    </li>\n    <li class=\"de\" style=\"margin-top:14px;\"><b>Widerrechtliche Drohung</b> — Androhung eines Übels bei Weigerung.\n      <div class=\"vi\" style=\"border:none; padding:4px 0 0 0; margin:0;\">Đe dọa trái pháp luật — đe dọa gây hại nếu từ chối.</div>\n    </li>\n  </ol>\n\n  <div class=\"note\"><b>Nicht anfechtbar · Không thể hủy</b> \n    <span class=\"de\"><b>Motivirrtum</b> — Irrtum über Beweggründe oder das erwartete Ergebnis.</span><br>\n    <span class=\"vi\" style=\"border:none; padding:0;\">Nhầm lẫn về động cơ hoặc kết quả mong muốn không xảy ra — VD: Karl tặng nhẫn cho Karin, Karin không thích, Karl không thể hủy hợp đồng mua bán vì lý do này.</span>\n  </div>\n\n  <h3 class=\"sub\">2.6 Nichtige Rechtsgeschäfte <span class=\'vi-sub\'>— Giao dịch vô hiệu ngay từ đầu</span></h3>\n  <div class=\"de\">Rechtsgeschäfte, die von Anfang an unwirksam sind — ohne dass eine Anfechtung nötig ist.</div>\n  <div class=\"vi\">Giao dịch vô hiệu tuyệt đối ngay từ đầu, không cần ai tuyên bố hủy.</div>\n\n  <table>\n    <tbody><tr><th>Mangel<span style=\"display:block;font-weight:400;font-size:.7rem;\">Khiếm khuyết</span></th><th>Beispiel<span style=\"display:block;font-weight:400;font-size:.7rem;\">Ví dụ</span></th></tr>\n    <tr><td><b>Mangel der Geschäftsfähigkeit</b><br><span class=\"para-code\">§105</span></td><td>Geschäft eines Geschäftsunfähigen<div class=\"vi-cell\">Giao dịch của người mất năng lực hành vi</div></td></tr>\n    <tr><td><b>Schein-/Scherzgeschäft</b><br><span class=\"para-code\">§117, §118</span></td><td>Kaufpreis im Vertrag falsch angegeben (Steuerhinterziehung); \"Verkauf\" eines Autos für 9,99 € im Spaß<div class=\"vi-cell\">Ghi sai giá để trốn thuế; \"bán\" xe giá 9,99€ trong lúc đùa</div></td></tr>\n    <tr><td><b>Verstoß gegen gesetzliches Verbot</b><br><span class=\"para-code\">§134</span></td><td>Drogen-, Waffenhandel<div class=\"vi-cell\">Buôn ma túy, vũ khí</div></td></tr>\n    <tr><td><b>Verstoß gegen Formvorschrift</b><br><span class=\"para-code\">§125</span></td><td>Mündlicher Verbraucherkredit; Grundstückskauf ohne Notar<div class=\"vi-cell\">Tín dụng tiêu dùng chỉ thỏa thuận miệng; mua đất không qua công chứng</div></td></tr>\n    <tr><td><b>Sittenwidrigkeit</b><br><span class=\"para-code\">§138</span></td><td>Kredit mit 45–50 % Zinsen<div class=\"vi-cell\">Vay với lãi suất 45-50%</div></td></tr>\n  </tbody></table>\n\n  <table>\n    <tbody><tr><th></th><th>Anfechtbar</th><th>Nichtig</th></tr>\n    <tr><td>Anfängliche Wirkung<div class=\"vi-cell\">Hiệu lực ban đầu</div></td><td>Voll gültig bis zur Anfechtung</td><td>Von Anfang an unwirksam</td></tr>\n    <tr><td>Nach Entdeckung<div class=\"vi-cell\">Sau khi phát hiện</div></td><td>Anfechtung nötig (rückwirkend)</td><td>Automatisch nichtig</td></tr>\n    <tr><td>Ursache<div class=\"vi-cell\">Nguyên nhân</div></td><td>Irrtum, Täuschung, Drohung</td><td>Geschäftsunfähigkeit, Schein-/Scherzgeschäft, Formmangel, Sittenwidrigkeit</td></tr>\n  </tbody></table>"
        ,
          "qa": [
            {
                        "q": "Was ist der Unterschied zwischen einem einseitigen und einem zweiseitigen Rechtsgeschäft?",
                        "qVi": "Sự khác biệt giữa giao dịch pháp lý đơn phương và giao dịch hai/nhiều bên là gì?",
                        "a": "Ein <b>einseitiges Rechtsgeschäft</b> erfordert nur <b>eine Willenserklärung</b> (z. B. Kündigung, Testament, Mahnung, Anfechtung). Ein <b>zweiseitiges Rechtsgeschäft (Vertrag)</b> erfordert <b>zwei übereinstimmende Willenserklärungen</b> (Antrag und Annahme, z. B. Kaufvertrag, Mietvertrag, Arbeitsvertrag).",
                        "aVi": "<b>Giao dịch đơn phương:</b> Chỉ cần <b>một tuyên bố ý chí</b> (sa thải, di chúc). <b>Giao dịch hai bên:</b> Cần <b>hai tuyên bố ý chí phù hợp nhau</b> (hợp đồng mua bán, thuê nhà, việc làm).",
                        "src": "IHK / Berufsschule"
            },
            {
                        "q": "Was bedeutet der Begriff 'Anfechtbarkeit' im Gegensatz zur 'Nichtigkeit' eines Rechtsgeschäfts?",
                        "qVi": "Khái niệm 'giao dịch có thể bị hủy (Anfechtbar)' khác gì với 'giao dịch vô hiệu (Nichtig)'?",
                        "a": "Ein <b>nichtiges Rechtsgeschäft</b> ist von Anfang an <b>vollkommen unwirksam</b> (§§ 105, 134, 138 BGB). Ein <b>anfechtbares Rechtsgeschäft</b> ist zunächst <b>voll wirksam</b>, wird aber durch eine erfolgreiche Anfechtung (z. B. wegen Irrtums § 119 BGB oder arglistiger Täuschung / Drohung § 123 BGB) rückwirkend von Anfang an (ex tunc) nichtig.",
                        "aVi": "<b>Nichtig:</b> Vô hiệu hoàn toàn ngay từ đầu. <b>Anfechtbar:</b> Ban đầu có hiệu lực, nhưng nếu khiếu nại hủy hợp pháp (do nhầm lẫn hoặc lừa dối) thì sẽ trở nên vô hiệu hồi tố từ đầu.",
                        "src": "IHK / Berufsschule"
            }
]
        },
        {
          "id": "wiko-rg-p3",
          "icon": "",
          "name": "Rechtsgeschäfte · Eigentum & Besitz",
          "desc": "Eigentumsübergang (§ 929 BGB), Eigentumsvorbehalt & gutgläubiger Erwerb",
          "content": "<h2>Rechtsgeschäfte · Eigentum & Besitz</h2>\n<div class=\"hint\">Gesetzbuch zum Lernen (DE–VI) · BGB</div>\n<div class=\"grid2\">\n    <div class=\"block\" style=\"margin:0;\">\n      <div class=\"de\" style=\"border-radius:6px;\"><b>Besitz</b> <span class=\"para-code\">§854</span><br>Tatsächliche Gewalt über eine Sache.</div>\n      <div class=\"vi\">Nắm giữ thực tế và được phép sử dụng đồ vật.</div>\n    </div>\n    <div class=\"block\" style=\"margin:0;\">\n      <div class=\"de\" style=\"border-radius:6px;\"><b>Eigentum</b><br>Rechtliche Verfügungsgewalt einer Person über Sachen.</div>\n      <div class=\"vi\">Quyền định đoạt hợp pháp — được phép bán, thay đổi đồ vật.</div>\n    </div>\n  </div>\n\n  <div class=\"de\" style=\"margin-top:16px;\">Besitz und Eigentum können <b>auseinanderfallen</b>.</div>\n  <div class=\"vi\">Chiếm hữu và sở hữu có thể tách rời nhau.</div>\n\n  <div class=\"example\"><b>Beispiel · Ví dụ</b> \n    <span class=\"de\">Herr Fuchs vermietet das Haus an Herrn Vogel → <b>Vogel = Besitzer</b>, <b>Fuchs = Eigentümer</b>.</span><br>\n    <span class=\"vi\" style=\"border:none; padding:4px 0 0 0;\">Ông Fuchs cho ông Vogel thuê nhà → Vogel là người chiếm hữu (sử dụng thực tế), Fuchs là chủ sở hữu hợp pháp.</span>\n  </div>\n\n  <h3 class=\"sub\">3.1 Eigentumsübergang <span class=\'vi-sub\'>— Chuyển giao quyền sở hữu</span></h3>\n  <div class=\"grid2\">\n    <div class=\"block\" style=\"margin:0;\">\n      <div class=\"de\" style=\"border-radius:6px;\"><b>Bewegliche Sachen</b><br>Durch <b>Einigung</b> + <b>Übergabe</b>. <span class=\"para-code\">§929</span></div>\n      <div class=\"vi\">Động sản: qua thỏa thuận + giao đồ vật.</div>\n    </div>\n    <div class=\"block\" style=\"margin:0;\">\n      <div class=\"de\" style=\"border-radius:6px;\"><b>Unbewegliche Sachen</b><br>Durch <b>Auflassung</b> (Notar) + <b>Eintragung ins Grundbuch</b>.</div>\n      <div class=\"vi\">Bất động sản: qua thỏa thuận trước công chứng + đăng ký vào sổ địa chính.</div>\n    </div>\n  </div>\n\n  <table style=\"margin-top:18px;\">\n    <tbody><tr><th>Situation<span style=\"display:block;font-weight:400;font-size:.7rem;\">Tình huống</span></th><th>Übergang durch<span style=\"display:block;font-weight:400;font-size:.7rem;\">Chuyển giao qua</span></th></tr>\n    <tr><td>Sache beim Verkäufer<div class=\"vi-cell\">Hàng ở chỗ người bán</div></td><td>Einigung + Übergabe</td></tr>\n    <tr><td>Sache schon beim Käufer<div class=\"vi-cell\">Hàng đã ở chỗ người mua</div></td><td>Nur Einigung</td></tr>\n    <tr><td>Käufer wird Eigentümer, Verkäufer bleibt im Besitz (Besitzkonstitut)<div class=\"vi-cell\">Người bán vẫn giữ đồ</div></td><td>Einigung + Besitzmittlungsverhältnis</td></tr>\n    <tr><td>Sache bei einem Dritten<div class=\"vi-cell\">Đồ ở nơi bên thứ ba</div></td><td>Einigung + Abtretung des Herausgabeanspruchs</td></tr>\n  </tbody></table>\n\n  <h3 class=\"sub\">3.2 Eigentumsvorbehalt <span class=\'vi-sub\'>— Bảo lưu quyền sở hữu</span></h3>\n  <div class=\"de\">Der Käufer wird sofort <b>Besitzer</b>, der Verkäufer bleibt bis zur vollständigen Zahlung <b>Eigentümer</b>.</div>\n  <div class=\"vi\">Người mua nhận đồ ngay (trở thành người chiếm hữu), nhưng người bán vẫn là chủ sở hữu cho đến khi được thanh toán đầy đủ.</div>\n\n  <div class=\"de\" style=\"margin-top:14px;\">Der Eigentumsvorbehalt erlischt bei: vollständiger Zahlung, Verarbeitung der Ware, Rücktritt vom Vertrag, oder Weitergabe an einen gutgläubigen Dritten.</div>\n  <div class=\"vi\">Bảo lưu quyền sở hữu hết hiệu lực khi: thanh toán đủ, hàng bị chế biến, hủy hợp đồng, hoặc chuyển cho bên thứ ba ngay tình.</div>\n\n  <h3 class=\"sub\">3.3 Gutgläubiger Erwerb <span class=\'vi-sub\'>— Mua bán ngay tình (thiện chí)</span></h3>\n  <div class=\"block\">\n    <div class=\"de\"><b>§932 BGB</b> Konnte der Erwerber nicht wissen, dass die Sache nicht im Eigentum des Veräußerers stand, wird er trotzdem Eigentümer.</div>\n    <div class=\"vi\"><b>Übersetzung</b> Nếu người mua không thể biết rằng người bán không phải chủ sở hữu thực sự, người mua vẫn trở thành chủ sở hữu hợp pháp.</div>\n  </div>\n  <div class=\"note\"><b>Ausnahme · Ngoại lệ</b> \n    <span class=\"de\">Gilt <b>nicht</b> bei gestohlenen, verlorenen oder abhandengekommenen Sachen. <span class=\"para-code\">§935</span></span><br>\n    <span class=\"vi\" style=\"border:none; padding:0;\">Không áp dụng đối với đồ bị trộm cắp, thất lạc hoặc bị mất ngoài ý muốn — dù người mua có ngay tình đến đâu.</span>\n  </div>"
        ,
          "qa": [
            {
                        "q": "Wie unterscheiden sich Besitz und Eigentum nach dem Bürgerlichen Gesetzbuch (BGB)?",
                        "qVi": "Quyền chiếm hữu (Besitz) và Quyền sở hữu (Eigentum) khác nhau thế nào theo BGB?",
                        "a": "<b>Besitz (§ 854 BGB)</b> ist die <b>tatsächliche Herrschaft</b> über eine Sache (wer die Sache gerade hat, z. B. Mieter, Entleiher). <b>Eigentum (§ 903 BGB)</b> ist die <b>rechtliche Herrschaft</b> über eine Sache (wem die Sache rechtlich gehört; der Eigentümer darf nach Belieben mit der Sache verfahren).",
                        "aVi": "<b>Besitz (§ 854 BGB):</b> Nắm giữ thực tế đồ vật (người đang cầm/thuê). <b>Eigentum (§ 903 BGB):</b> Quyền sở hữu hợp pháp theo luật (chủ thực sự có toàn quyền định đoạt).",
                        "src": "IHK / Berufsschule"
            },
            {
                        "q": "Was regelt ein Eigentumsvorbehalt (§ 449 BGB) beim Kaufvertrag?",
                        "qVi": "Điều khoản bảo lưu quyền sở hữu (§ 449 BGB) trong hợp đồng mua bán quy định điều gì?",
                        "a": "Die Ware wird dem Käufer sofort übergeben (er wird Besitzer), das <b>Eigentum geht aber erst mit der vollständigen Bezahlung des Kaufpreises auf den Käufer über</b>.",
                        "aVi": "Hàng được giao ngay cho người mua (người mua là Besitzer), nhưng <b>quyền sở hữu (Eigentum) chỉ chuyển giao khi người mua đã trả hết 100% tiền hàng</b>.",
                        "src": "IHK / Berufsschule"
            }
]
        },
        {
          "id": "wiko-rg-bt1",
          "icon": "",
          "name": "Rechtsgeschäfte · Übung — Geschäftsfähigkeit",
          "desc": "Übungsfälle zur Geschäftsfähigkeit (Geschäftsunfähigkeit, beschränkte & volle Geschäftsfähigkeit)",
          "content": "<h2>Rechtsgeschäfte · Übung — Geschäftsfähigkeit</h2>\n<div class=\"hint\">Gesetzbuch zum Lernen (DE–VI) · BGB</div>\n<details class=\"q\"><summary><b>01</b> Unterscheiden Sie zwischen Rechtsfähigkeit und Geschäftsfähigkeit.</summary>\n    <div class=\"ans\">\n      <div class=\"de\"><b>Antwort</b> <b>Rechtsfähigkeit</b> = die Fähigkeit, Träger von Rechten und Pflichten zu sein (alle Menschen, von Geburt bis Tod). <b>Geschäftsfähigkeit</b> = die Fähigkeit, selbstständig und rechtswirksam Rechtsgeschäfte zu tätigen (abhängig von Alter/Geisteszustand).</div>\n      <div class=\"vi\"><b>Đáp án</b> <b>Năng lực pháp luật</b> = khả năng trở thành chủ thể quyền và nghĩa vụ (mọi người, từ sinh ra đến chết). <b>Năng lực hành vi</b> = khả năng tự mình thực hiện giao dịch pháp lý có hiệu lực (phụ thuộc tuổi/tình trạng tâm thần).</div>\n    </div>\n  </details>\n\n  <details class=\"q\"><summary><b>02</b> Ordnen Sie zu: a) 20 Jahre  b) 6 Jahre  c) 16 Jahre</summary>\n    <div class=\"ans\">\n      <div class=\"de\"><b>Antwort</b> a) 20 Jahre → <b>unbeschränkt geschäftsfähig</b>. b) 6 Jahre → <b>geschäftsunfähig</b>. c) 16 Jahre → <b>beschränkt geschäftsfähig</b>.</div>\n      <div class=\"vi\"><b>Đáp án</b> a) 20 tuổi → năng lực đầy đủ. b) 6 tuổi → mất năng lực hành vi. c) 16 tuổi → năng lực hạn chế.</div>\n    </div>\n  </details>\n\n  <details class=\"q\"><summary><b>03</b> Welche Geschäfte darf ein Beschränkt-Geschäftsfähiger ohne Zustimmung tätigen? Nennen Sie Beispiele.</summary>\n    <div class=\"ans\">\n      <div class=\"de\"><b>Antwort</b> \n        1) Geschäfte mit <b>lediglich rechtlichem Vorteil</b> <span class=\"para-code\">§107</span> — z. B. ein Geschenk annehmen.<br>\n        2) Geschäfte mit <b>eigenen Mitteln (Taschengeld)</b> <span class=\"para-code\">§110</span> — z. B. ein Buch für 20 € kaufen (nicht bei Ratenkäufen).<br>\n        3) Geschäfte im Rahmen eines <b>zugestimmten Arbeitsverhältnisses</b> <span class=\"para-code\">§113</span>.\n      </div>\n      <div class=\"vi\"><b>Đáp án</b> 1) Giao dịch chỉ mang lợi ích pháp lý thuần túy (§107) — VD: nhận quà tặng. 2) Giao dịch dùng tiền riêng/tiền tiêu vặt (§110) — VD: mua sách 20€ (không áp dụng mua trả góp). 3) Giao dịch trong quan hệ lao động đã được đồng ý (§113).</div>\n    </div>\n  </details>\n\n  <details class=\"q\"><summary><b>04</b> Welche Rechtsfolge hat eine Willenserklärung je nach Stufe der Geschäftsfähigkeit?</summary>\n    <div class=\"ans\">\n      <div class=\"de\"><b>Antwort</b> Geschäftsunfähig → <b>nichtig</b>. Beschränkt geschäftsfähig → <b>schwebend unwirksam</b>. Voll geschäftsfähig → <b>voll wirksam</b>.</div>\n      <div class=\"vi\"><b>Đáp án</b> Mất năng lực hành vi → vô hiệu. Năng lực hạn chế → \"treo\" chờ phê duyệt. Năng lực đầy đủ → có hiệu lực đầy đủ.</div>\n    </div>\n  </details>\n\n  <details class=\"q\"><summary><b>05a</b> Anna (6 Jahre) nimmt 10 € aus ihrem Sparschwein und kauft eine Puppe. Ist der Kaufvertrag gültig?</summary>\n    <div class=\"ans\">\n      <div class=\"de\"><b>Antwort</b> <b>Nein — nichtig.</b> Anna ist unter 7 Jahren, also geschäftsunfähig <span class=\"para-code\">§104</span>; ihre Willenserklärungen sind unwirksam <span class=\"para-code\">§105 BGB</span>.</div>\n      <div class=\"vi\"><b>Đáp án</b> <b>Không hợp lệ — vô hiệu.</b> Anna dưới 7 tuổi nên mất năng lực hành vi, mọi tuyên bố ý chí của cô bé đều vô hiệu.</div>\n    </div>\n  </details>\n\n  <details class=\"q\"><summary><b>05b</b> Martina (16) kauft einen MP3-Player für 45 € von ihrem Taschengeld. (1) Ist der Vertrag gültig? (2) Was, wenn sie in Raten zahlt?</summary>\n    <div class=\"ans\">\n      <div class=\"de\"><b>Antwort</b> (1) <b>Ja, gültig</b> — Taschengeldparagraph <span class=\"para-code\">§110</span>, da sofort mit eigenem Geld bezahlt.<br>(2) <b>Nein</b> — §110 gilt nicht für Ratenkäufe. Der Vertrag ist <b>schwebend unwirksam</b> <span class=\"para-code\">§106</span> und braucht die Zustimmung der Eltern.</div>\n      <div class=\"vi\"><b>Đáp án</b> (1) Hợp lệ — áp dụng điều khoản tiền tiêu vặt, vì trả ngay bằng tiền riêng. (2) Không hợp lệ — §110 không áp dụng cho mua trả góp. Hợp đồng ở trạng thái \"treo\", cần cha mẹ đồng ý.</div>\n    </div>\n  </details>\n\n  <details class=\"q\"><summary><b>05c</b> Anton (17) kauft einen Computer für 750 €, ohne dass die Eltern es wissen. Welche Rechtswirkung hat der Vertrag?</summary>\n    <div class=\"ans\">\n      <div class=\"de\"><b>Antwort</b> <b>Schwebend unwirksam</b> <span class=\"para-code\">§106, §108 BGB</span> — abhängig von der Genehmigung der Eltern.</div>\n      <div class=\"vi\"><b>Đáp án</b> Ở trạng thái \"treo\" — phụ thuộc vào việc cha mẹ có phê chuẩn hay không.</div>\n    </div>\n  </details>\n\n  <details class=\"q\"><summary><b>05d</b> Kurt (14) kauft eine Musikanlage stark reduziert (250 € statt 780 €) und meint, wegen des großen Rabatts brauche er keine Zustimmung. Stimmt das?</summary>\n    <div class=\"ans\">\n      <div class=\"de\"><b>Antwort</b> <b>Nein.</b> Trotz des niedrigen Preises bleibt es eine Zahlungsverpflichtung, kein rechtlicher Vorteil. Der Vertrag ist <b>schwebend unwirksam</b> — keine Ausnahme (§107, §110) greift hier.</div>\n      <div class=\"vi\"><b>Đáp án</b> <b>Không đúng.</b> Dù giá rẻ, đây vẫn là nghĩa vụ thanh toán, không phải lợi ích pháp lý thuần túy. Hợp đồng \"treo\" — không có ngoại lệ nào áp dụng.</div>\n    </div>\n  </details>"
        ,
          "qa": [
            {
                        "q": "Fall: Ein 6-jähriges Kind kauft im Kiosk eine Packung Kaugummis für 1 €. Ist der Kaufvertrag wirksam?",
                        "qVi": "Tình huống: Trẻ em 6 tuổi tự mua kẹo cao su 1 € tại quầy báo. Hợp đồng mua bán có hiệu lực không?",
                        "a": "<b>Nein.</b> Kinder unter 7 Jahren sind <b>geschäftsunfähig (§ 104 BGB)</b>. Ihre Willenserklärungen sind <b>nichtig (§ 105 BGB)</b>; der Vertrag ist von Anfang an unwirksam.",
                        "aVi": "<b>Không.</b> Trẻ dưới 7 tuổi là người <b>chưa có năng lực hành vi (§ 104 BGB)</b>; hợp đồng vô hiệu ngay từ đầu.",
                        "src": "IHK / Berufsschule"
            },
            {
                        "q": "Fall: Eine 16-jährige Auszubildende kauft ein Smartphone für 800 € auf Raten ohne Wissen ihrer Eltern. Ist der Vertrag gültig?",
                        "qVi": "Tình huống: Học viên 16 tuổi mua điện thoại trả góp 800 € không cho cha mẹ biết. Hợp đồng có hiệu lực không?",
                        "a": "Der Vertrag ist <b>schwebend unwirksam (§§ 106, 108 BGB)</b>. Der Taschengeldparagraph (§ 110 BGB) gilt nicht für Ratenkredite.",
                        "aVi": "Hợp đồng ở trạng thái <b>chưa có hiệu lực dứt khoát (schwebend unwirksam)</b>. Tiền tiêu vặt § 110 BGB không áp dụng cho trả góp.",
                        "src": "IHK / Berufsschule"
            }
]
        },
        {
          "id": "wiko-rg-bt2",
          "icon": "",
          "name": "Rechtsgeschäfte · Übung — Willenserklärung & Rechtsgeschäfte",
          "desc": "Übungsfälle zu Willenserklärungen und einseitigen/mehrseitigen Rechtsgeschäften",
          "content": "<h2>Rechtsgeschäfte · Übung — Willenserklärung & Rechtsgeschäfte</h2>\n<div class=\"hint\">Gesetzbuch zum Lernen (DE–VI) · BGB</div>\n<h4 style=\"font-family:&#39;IBM Plex Sans&#39;,sans-serif; color:var(--ink); margin-top:24px; font-size:1rem;\">Nr. 1 — Liegt eine Willenserklärung vor? In welcher Form?</h4>\n\n  <details class=\"q\"><summary><b>a</b> Sie werden von Ihrem Onkel zu einer Reise eingeladen.</summary>\n    <div class=\"ans\">\n      <div class=\"de\"><b>Antwort</b> <b>Nein</b> — eine Gefälligkeit ohne Rechtsbindungswillen.</div>\n      <div class=\"vi\"><b>Đáp án</b> Không phải — đây là lời mời mang tính thiện chí, không có ý định tạo ràng buộc pháp lý.</div>\n    </div>\n  </details>\n\n  <details class=\"q\"><summary><b>b</b> Sie steigen mit gültigem Fahrschein in die Straßenbahn in Stuttgart ein.</summary>\n    <div class=\"ans\">\n      <div class=\"de\"><b>Antwort</b> <b>Ja</b> — durch <b>schlüssiges Handeln</b> (Einsteigen = Annahme des Beförderungsvertrags). Form: formfrei.</div>\n      <div class=\"vi\"><b>Đáp án</b> Có — qua hành vi ngụ ý (lên tàu = chấp nhận hợp đồng vận chuyển). Hình thức: tự do.</div>\n    </div>\n  </details>\n\n  <details class=\"q\"><summary><b>c</b> Sie winken ein Taxi heran, steigen ein und nennen Ihre Adresse.</summary>\n    <div class=\"ans\">\n      <div class=\"de\"><b>Antwort</b> <b>Ja</b> — schlüssiges Handeln (Winken) kombiniert mit unmittelbarer (mündlicher) Handlung (Adresse nennen).</div>\n      <div class=\"vi\"><b>Đáp án</b> Có — hành vi ngụ ý (giơ tay) kết hợp với hành động trực tiếp (nói địa chỉ).</div>\n    </div>\n  </details>\n\n  <details class=\"q\"><summary><b>d</b> Sie nehmen Waren im Selbstbedienungsladen und legen sie aufs Kassenband.</summary>\n    <div class=\"ans\">\n      <div class=\"de\"><b>Antwort</b> <b>Ja</b> — schlüssiges Handeln.</div>\n      <div class=\"vi\"><b>Đáp án</b> Có — qua hành vi ngụ ý (không cần lời nói).</div>\n    </div>\n  </details>\n\n  <h4 style=\"font-family:&#39;IBM Plex Sans&#39;,sans-serif; color:var(--ink); margin-top:24px; font-size:1rem;\">Nr. 2 — Einseitig oder mehrseitig? Welche Form?</h4>\n\n  <details class=\"q\"><summary><b>a</b> Der Vermieter schließt mit Ihren Eltern einen Mietvertrag.</summary>\n    <div class=\"ans\">\n      <div class=\"de\"><b>Antwort</b> <b>Zweiseitig</b> — Mietvertrag, meist in <b>Schriftform</b> (grundsätzlich formfrei, aber üblich).</div>\n      <div class=\"vi\"><b>Đáp án</b> Nhiều bên — hợp đồng thuê nhà, thường bằng văn bản (về nguyên tắc tự do, nhưng thực tế phổ biến dùng văn bản).</div>\n    </div>\n  </details>\n\n  <details class=\"q\"><summary><b>b</b> Nele Kaiser bestellt eine DVD bei amazon.de.</summary>\n    <div class=\"ans\">\n      <div class=\"de\"><b>Antwort</b> <b>Zweiseitig</b> — Kaufvertrag, elektronische Form.</div>\n      <div class=\"vi\"><b>Đáp án</b> Nhiều bên — hợp đồng mua bán, hình thức điện tử.</div>\n    </div>\n  </details>\n\n  <details class=\"q\"><summary><b>c</b> Max Lehmann kündigt sein Arbeitsverhältnis.</summary>\n    <div class=\"ans\">\n      <div class=\"de\"><b>Antwort</b> <b>Einseitig</b> (empfangsbedürftig) — Kündigung, zwingend <b>Schriftform</b> <span class=\"para-code\">§623 BGB</span>.</div>\n      <div class=\"vi\"><b>Đáp án</b> Đơn phương (cần người nhận) — bắt buộc bằng văn bản.</div>\n    </div>\n  </details>\n\n  <details class=\"q\"><summary><b>d</b> Alexander Thein verliert seinen wertvollen Ring und lobt öffentlich 150 € für den Finder aus (Auslobung).</summary>\n    <div class=\"ans\">\n      <div class=\"de\"><b>Antwort</b> <b>Einseitig</b> (nicht empfangsbedürftig) — wirksam sofort bei Bekanntmachung, formfrei.</div>\n      <div class=\"vi\"><b>Đáp án</b> Đơn phương (không cần người nhận) — có hiệu lực ngay khi công bố, hình thức tự do.</div>\n    </div>\n  </details>\n\n  <details class=\"q\"><summary><b>e</b> Ein Unternehmen nimmt eine ohne Bestellung gelieferte Maschine in Betrieb.</summary>\n    <div class=\"ans\">\n      <div class=\"de\"><b>Antwort</b> <b>Zweiseitig</b> — Kaufvertrag entsteht durch <b>Schweigen</b> (Ausnahme: Nutzung gilt als Annahme).</div>\n      <div class=\"vi\"><b>Đáp án</b> Nhiều bên — hợp đồng mua bán hình thành qua im lặng (trường hợp ngoại lệ: việc sử dụng được xem là chấp nhận).</div>\n    </div>\n  </details>"
        ,
          "qa": [
            {
                        "q": "Ordne zu: Handelt es sich bei einer Kündigung um ein einseitiges oder zweiseitiges Rechtsgeschäft?",
                        "qVi": "Phân loại: Việc sa thải (Kündigung) là giao dịch đơn phương hay hai bên?",
                        "a": "Es ist ein <b>einseitiges empfangsbedürftiges Rechtsgeschäft</b>: Die Kündigung wird bereits mit dem Zugang beim Empfänger wirksam, ohne dass dieser zustimmen muss.",
                        "aVi": "Là <b>giao dịch đơn phương cần tiếp nhận</b>: Có hiệu lực ngay khi đến tay người nhận mà không cần người đó đồng ý.",
                        "src": "IHK / Berufsschule"
            }
]
        },
        {
          "id": "wiko-rg-bt3",
          "icon": "",
          "name": "Rechtsgeschäfte · Übung — Form der Rechtsgeschäfte",
          "desc": "Übungsfälle zu Formvorschriften (Schriftform, notarielle Beurkundung)",
          "content": "<h2>Rechtsgeschäfte · Übung — Form der Rechtsgeschäfte</h2>\n<div class=\"hint\">Gesetzbuch zum Lernen (DE–VI) · BGB</div>\n<details class=\"q\"><summary><b>01</b> Ordnen Sie den drei Formgruppen (Schriftform / Öffentliche Beglaubigung / Notarielle Beurkundung) passende Beispiele zu.</summary>\n    <div class=\"ans\">\n      <table>\n        <tbody><tr><th>Gruppe<span style=\"display:block;font-weight:400;font-size:.7rem;\">Nhóm</span></th><th>Beispiel<span style=\"display:block;font-weight:400;font-size:.7rem;\">Ví dụ</span></th></tr>\n        <tr><td><b>Schriftform</b></td><td>Kündigung von Arbeitsverträgen, Ratenkaufvertrag<div class=\"vi-cell\">Đơn nghỉ việc, hợp đồng mua trả góp</div></td></tr>\n        <tr><td><b>Öffentliche Beglaubigung</b></td><td>Anträge auf Eintrag ins Handelsregister<div class=\"vi-cell\">Đăng ký vào sổ đăng ký thương mại</div></td></tr>\n        <tr><td><b>Notarielle Beurkundung</b></td><td>Grundstückskauf, Eheverträge, Ausschlagung einer Erbschaft<div class=\"vi-cell\">Mua bán đất, hợp đồng hôn nhân, từ chối di sản</div></td></tr>\n      </tbody></table>\n      <div class=\"note\"><b>Rechtsfolge · Hậu quả</b> <span class=\"de\">Formverstoß → das Geschäft ist <b>eventuell nichtig</b>.</span><br><span class=\"vi\" style=\"border:none; padding:0;\">Vi phạm hình thức → giao dịch có thể vô hiệu.</span></div>\n    </div>\n  </details>\n\n  <details class=\"q\"><summary><b>02</b> Welche Form ist für die folgenden Geschäfte vorgeschrieben?</summary>\n    <div class=\"ans\">\n      <table>\n        <tbody><tr><th>Geschäft<span style=\"display:block;font-weight:400;font-size:.7rem;\">Giao dịch</span></th><th>Form<span style=\"display:block;font-weight:400;font-size:.7rem;\">Hình thức</span></th></tr>\n        <tr><td>Frau Putzig kauft eine Spülmaschine auf Raten<div class=\"vi-cell\">Mua máy rửa bát trả góp</div></td><td>Schriftform</td></tr>\n        <tr><td>Karl Protz zahlt sein Motorrad in bar<div class=\"vi-cell\">Trả tiền mặt mua xe máy</div></td><td>Formfrei</td></tr>\n        <tr><td>Bauer Kohl verkauft ein Grundstück an den Nachbarn<div class=\"vi-cell\">Bán đất cho hàng xóm</div></td><td>Notarielle Beurkundung</td></tr>\n        <tr><td>Ein Verein trägt sich ins Vereinsregister ein<div class=\"vi-cell\">Đăng ký vào sổ hội</div></td><td>Schriftform + Öffentliche Beglaubigung</td></tr>\n        <tr><td>Martin Stift unterschreibt einen Ausbildungsvertrag<div class=\"vi-cell\">Ký hợp đồng học nghề</div></td><td>Schriftform</td></tr>\n        <tr><td>Herr Burger verbürgt sich für den Kredit seiner Tochter<div class=\"vi-cell\">Bảo lãnh khoản vay cho con gái</div></td><td>Schriftform</td></tr>\n        <tr><td>Frau Schenker verspricht ihrem Enkel 10.000 € zum 18. Geburtstag<div class=\"vi-cell\">Hứa tặng cháu 10.000€ khi 18 tuổi</div></td><td>Notarielle Beurkundung <span class=\"para-code\">§518</span></td></tr>\n      </tbody></table>\n    </div>\n  </details>"
        ,
          "qa": [
            {
                        "q": "Welche Rechtsfolge hat die Nichteinhaltung einer gesetzlich vorgeschriebenen Form (z. B. mündliche Kündigung eines Arbeitsvertrags)?",
                        "qVi": "Vi phạm quy định hình thức bắt buộc theo luật dẫn tới hậu quả pháp lý gì?",
                        "a": "Das Rechtsgeschäft ist <b>nach § 125 BGB nichtig (völlig unwirksam)</b>.",
                        "aVi": "Giao dịch đó bị <b>vô hiệu hoàn toàn (nichtig)</b> theo Điều 125 BGB.",
                        "src": "IHK / Berufsschule"
            }
]
        },
        {
          "id": "wiko-rg-bt4",
          "icon": "",
          "name": "Rechtsgeschäfte · Übung — Anfechtbare & Nichtige Rechtsgeschäfte",
          "desc": "Übungsfälle zu nichtigen und anfechtbaren Rechtsgeschäften (§§ 119, 123 BGB)",
          "content": "<h2>Rechtsgeschäfte · Übung — Anfechtbare & Nichtige Rechtsgeschäfte</h2>\n<div class=\"hint\">Gesetzbuch zum Lernen (DE–VI) · BGB</div>\n<h4 style=\"font-family:&#39;IBM Plex Sans&#39;,sans-serif; color:var(--ink); margin-top:24px; font-size:1rem;\">Nr. 1 — Welche Fälle sind Nichtigkeit?</h4>\n  <details class=\"q\"><summary><b>a-e</b> a) Formverstoß  b) Verkauf von selbst angebautem Cannabis  c) Erklärungsirrtum  d) Arglistige Täuschung  e) Widerrechtliche Drohung</summary>\n    <div class=\"ans\">\n      <div class=\"de\"><b>Antwort</b> a) <b>nichtig</b> <span class=\"para-code\">§125</span>  b) <b>nichtig</b> <span class=\"para-code\">§134</span>  c) <b>anfechtbar</b>  d) <b>anfechtbar</b>  e) <b>anfechtbar</b></div>\n      <div class=\"vi\"><b>Đáp án</b> a) vô hiệu (§125)  b) vô hiệu (§134, vi phạm luật cấm)  c) có thể hủy  d) có thể hủy  e) có thể hủy</div>\n    </div>\n  </details>\n\n  <h4 style=\"font-family:&#39;IBM Plex Sans&#39;,sans-serif; color:var(--ink); margin-top:24px; font-size:1rem;\">Nr. 2 — Ist der Kaufvertrag anfechtbar?</h4>\n  <details class=\"q\"><summary><b>a-e</b> a) Verspätete Lieferung  b) Preiserhöhung  c) Preis versehentlich 150 € statt 510 €  d) Verkäufer ahnt finanzielle Schwierigkeiten des Käufers  e) Nur mündliche Vereinbarung</summary>\n    <div class=\"ans\">\n      <div class=\"de\"><b>Antwort</b> \n        a) <b>Nicht anfechtbar</b> (kein Anfechtungsgrund)<br>\n        b) <b>Nicht anfechtbar</b><br>\n        c) <b>Anfechtbar</b> — Irrtum in der Erklärungshandlung<br>\n        d) <b>Nicht anfechtbar</b> (kein Willensmangel)<br>\n        e) <b>Nicht anfechtbar</b> (Formfrage, kein Anfechtungsgrund)\n      </div>\n      <div class=\"vi\"><b>Đáp án</b> \n        a) Không thể hủy (giao hàng trễ không phải lý do hủy)<br>\n        b) Không thể hủy<br>\n        c) Có thể hủy — nhầm lẫn khi ghi giá<br>\n        d) Không thể hủy (không liên quan khiếm khuyết ý chí)<br>\n        e) Không thể hủy (là vấn đề hình thức, không phải lý do hủy)\n      </div>\n    </div>\n  </details>\n\n  <h4 style=\"font-family:&#39;IBM Plex Sans&#39;,sans-serif; color:var(--ink); margin-top:24px; font-size:1rem;\">Nr. 3 — Voll gültig / nichtig / anfechtbar / schwebend unwirksam?</h4>\n  <details class=\"q\"><summary><b>a</b> Zahlendreher: 58 € statt 85 €.</summary>\n    <div class=\"ans\"><div class=\"de\"><b>Antwort</b> <b>Anfechtbar</b> — Erklärungsirrtum.</div><div class=\"vi\"><b>Đáp án</b> Có thể hủy — nhầm lẫn khi viết số.</div></div>\n  </details>\n  <details class=\"q\"><summary><b>b</b> Rebecca (16) abonniert eine Zeitschrift für 18,50 €/Monat.</summary>\n    <div class=\"ans\"><div class=\"de\"><b>Antwort</b> <b>Schwebend unwirksam</b> — Rebecca ist beschränkt geschäftsfähig; ein Dauerabonnement fällt nicht unter §110, da es keine einmalige Sofortzahlung mit eigenen Mitteln ist.</div><div class=\"vi\"><b>Đáp án</b> \"Treo\" chờ phê duyệt — Rebecca 16 tuổi (năng lực hạn chế), việc đăng ký thuê bao định kỳ không thuộc §110 vì không phải thanh toán một lần ngay bằng tiền riêng.</div></div>\n  </details>\n  <details class=\"q\"><summary><b>c</b> Ein Handwerker kauft auf Empfehlung eines Freundes Aktien, deren Kurs am nächsten Tag fällt.</summary>\n    <div class=\"ans\"><div class=\"de\"><b>Antwort</b> <b>Voll gültig</b> — das ist ein Motivirrtum, nicht anfechtbar.</div><div class=\"vi\"><b>Đáp án</b> Có hiệu lực đầy đủ — đây là nhầm lẫn về động cơ, không thể hủy.</div></div>\n  </details>\n  <details class=\"q\"><summary><b>d</b> Lehmann (17, Eltern haben dem Arbeitsverhältnis zugestimmt) kündigt selbstständig seine Stelle.</summary>\n    <div class=\"ans\"><div class=\"de\"><b>Antwort</b> <b>Voll gültig</b> — die Eltern haben dem Arbeitsverhältnis zugestimmt <span class=\"para-code\">§113</span>, die Kündigung liegt im Rahmen dieser Zustimmung.</div><div class=\"vi\"><b>Đáp án</b> Có hiệu lực đầy đủ — cha mẹ đã đồng ý cho tham gia quan hệ lao động, việc chấm dứt hợp đồng nằm trong phạm vi đã ủy quyền.</div></div>\n  </details>\n  <details class=\"q\"><summary><b>e</b> Eine Baufirma addiert falsch: 18,2 Mio. € statt 20 Mio. €.</summary>\n    <div class=\"ans\"><div class=\"de\"><b>Antwort</b> <b>Anfechtbar</b> — Erklärungsirrtum (Rechenfehler bei der Abgabe der Erklärung).</div><div class=\"vi\"><b>Đáp án</b> Có thể hủy — nhầm lẫn khi tuyên bố (lỗi tính toán).</div></div>\n  </details>\n\n  <h4 style=\"font-family:&#39;IBM Plex Sans&#39;,sans-serif; color:var(--ink); margin-top:24px; font-size:1rem;\">Nr. 4 — Zwölf Fälle im Überblick</h4>\n  <details class=\"q\"><summary><b>04</b> Vollständige Lösungstabelle ansehen</summary>\n    <div class=\"ans\">\n      <table>\n        <tbody><tr><th>Fall<span style=\"display:block;font-weight:400;font-size:.7rem;\">Tình huống</span></th><th>Ergebnis</th><th>Grund<span style=\"display:block;font-weight:400;font-size:.7rem;\">Lý do</span></th></tr>\n        <tr><td>Obstverkäufer bezeichnet Ware stets als \"Bioware\"<div class=\"vi-cell\">Bán hoa quả thường nói \"hàng hữu cơ\"</div></td><td>Anfechtbar</td><td>Arglistige Täuschung</td></tr>\n        <tr><td>Chef droht der Sekretärin mit Kündigung, falls sie seinen Sohn nicht heiratet<div class=\"vi-cell\">Đe dọa sa thải nếu không kết hôn với con trai chủ</div></td><td>Anfechtbar</td><td>Widerrechtliche Drohung</td></tr>\n        <tr><td>Guru verspricht 800 € bei \"richtigem Glauben\"<div class=\"vi-cell\">Hứa 800€ nếu theo đúng tín ngưỡng</div></td><td>Nichtig</td><td>Sittenwidrigkeit</td></tr>\n        <tr><td>Hans Vogel \"verkauft\" im Spaß sein Sportauto für 9,99 €<div class=\"vi-cell\">\"Bán\" xe thể thao giá 9,99€ trong lúc đùa</div></td><td>Nichtig</td><td>Scherzgeschäft</td></tr>\n        <tr><td>Kredit mit 45 % Zinsen<div class=\"vi-cell\">Vay lãi suất 45%</div></td><td>Nichtig</td><td>Sittenwidrigkeit (Wucher)</td></tr>\n        <tr><td>Handel mit 1,2 kg Drogen<div class=\"vi-cell\">Buôn 1,2kg ma túy</div></td><td>Nichtig</td><td>Verstoß gegen gesetzliches Verbot</td></tr>\n        <tr><td>40 m²-Wohnung für 2.000 € in einer Notlage vermietet<div class=\"vi-cell\">Thuê nhà 40m² giá 2.000€ khi túng quẫn</div></td><td>Nichtig</td><td>Sittenwidrigkeit</td></tr>\n        <tr><td>Getipptes Testament nur handschriftlich unterschrieben<div class=\"vi-cell\">Di chúc đánh máy, chỉ ký tay</div></td><td>Nichtig</td><td>Verstoß gegen Formvorschrift</td></tr>\n        <tr><td>Tina (6) verkauft ihren Puppenwagen für 10 €<div class=\"vi-cell\">Bé Tina 6 tuổi bán xe đẩy búp bê 10€</div></td><td>Nichtig</td><td>Mangel der Geschäftsfähigkeit</td></tr>\n        <tr><td>Rechnung über 1.000 € statt echter 30.000 € (Steuerhinterziehung)<div class=\"vi-cell\">Ghi hóa đơn 1.000€ thay vì 30.000€ thực tế để trốn thuế</div></td><td>Nichtig</td><td>Scheingeschäft</td></tr>\n        <tr><td>Halbblinder Teppichhändler verkauft echten Perserteppich als Industrieware<div class=\"vi-cell\">Người bán thảm nửa mù bán thảm Ba Tư thật nói là hàng công nghiệp</div></td><td>Anfechtbar</td><td>Irrtum in der Erklärungshandlung</td></tr>\n        <tr><td>Verkäufer nutzt Blindheit des Kunden aus, verkauft unmodischen Anzug<div class=\"vi-cell\">Lợi dụng khách mù, bán vest lỗi mốt</div></td><td>Anfechtbar</td><td>Arglistige Täuschung</td></tr>\n      </tbody></table>\n    </div>\n  </details>"
        ,
          "qa": [
            {
                        "q": "Binnen welcher Frist muss ein Rechtsgeschäft wegen arglistiger Täuschung angefochten werden (§ 124 BGB)?",
                        "qVi": "Thời hạn khiếu nại hủy hợp đồng do bị lừa dối (arglistige Täuschung § 124 BGB) là bao lâu?",
                        "a": "Binnen <b>eines Jahres</b> ab dem Zeitpunkt, in dem der Getäuschte die Täuschung entdeckt.",
                        "aVi": "Trong vòng <b>1 năm</b> kể từ ngày người bị lừa phát hiện ra sự gian dối.",
                        "src": "IHK / Berufsschule"
            }
]
        },
        {
          "id": "wiko-rg-bt5",
          "icon": "",
          "name": "Rechtsgeschäfte · Übung — Besitz & Eigentum",
          "desc": "Übungsfälle zu Besitz und Eigentum im Alltag",
          "content": "<h2>Rechtsgeschäfte · Übung — Besitz & Eigentum</h2>\n<div class=\"hint\">Gesetzbuch zum Lernen (DE–VI) · BGB</div>\n<details class=\"q\"><summary><b>01</b> Herr Fuchs wohnt in seinem eigenen Haus und vermietet ein geerbtes Haus an Herrn Vogel. Wer ist Besitzer, wer Eigentümer des vermieteten Hauses?</summary>\n    <div class=\"ans\"><div class=\"de\"><b>Antwort</b> <b>Besitzer = Vogel</b> (Mieter, tatsächliche Nutzung). <b>Eigentümer = Fuchs</b>.</div><div class=\"vi\"><b>Đáp án</b> Người chiếm hữu = Vogel (người thuê, sử dụng thực tế). Chủ sở hữu = Fuchs.</div></div>\n  </details>\n\n  <details class=\"q\"><summary><b>02</b> Was unterscheidet Besitz von Eigentum?</summary>\n    <div class=\"ans\"><div class=\"de\"><b>Antwort</b> <b>Besitz</b>: tatsächliche Gewalt, darf die Sache nutzen. <b>Eigentum</b>: rechtliche Verfügungsgewalt, darf die Sache verkaufen/verändern.</div><div class=\"vi\"><b>Đáp án</b> Chiếm hữu: quyền lực thực tế, được sử dụng đồ vật. Sở hữu: quyền định đoạt hợp pháp, được bán/thay đổi đồ vật.</div></div>\n  </details>\n\n  <details class=\"q\"><summary><b>03</b> Wie erfolgt der Eigentumsübergang bei beweglichen und unbeweglichen Sachen?</summary>\n    <div class=\"ans\"><div class=\"de\"><b>Antwort</b> Bewegliche Sachen: Einigung + Übergabe. Unbewegliche Sachen: Auflassung (Notar) + Eintragung ins Grundbuch.</div><div class=\"vi\"><b>Đáp án</b> Động sản: thỏa thuận + giao hàng. Bất động sản: thỏa thuận trước công chứng + đăng ký sổ địa chính.</div></div>\n  </details>\n\n  <details class=\"q\"><summary><b>04a</b> Herr Vogel bestellt einen Schrank; der Vertrag enthält einen Eigentumsvorbehalt. Was bedeutet das?</summary>\n    <div class=\"ans\"><div class=\"de\"><b>Antwort</b> Herr Vogel wird sofort <b>Besitzer</b>, das Möbelhaus bleibt <b>Eigentümer</b> bis zur vollständigen Zahlung.</div><div class=\"vi\"><b>Đáp án</b> Ông Vogel trở thành người chiếm hữu ngay, hãng nội thất vẫn là chủ sở hữu cho đến khi được thanh toán đầy đủ.</div></div>\n  </details>\n\n  <details class=\"q\"><summary><b>04b</b> Herr Vogel verkauft seinen alten Fernseher (noch unter Eigentumsvorbehalt) an Frau Wolf, die davon nichts weiß. Wird sie neue Eigentümerin?</summary>\n    <div class=\"ans\"><div class=\"de\"><b>Antwort</b> <b>Ja</b> — gutgläubiger Erwerb <span class=\"para-code\">§932 BGB</span>, da sie nichts vom Eigentumsvorbehalt wusste oder wissen musste.</div><div class=\"vi\"><b>Đáp án</b> Có — mua bán ngay tình, vì bà không biết và không có nghĩa vụ phải biết về việc bảo lưu quyền sở hữu.</div></div>\n  </details>\n\n  <details class=\"q\"><summary><b>05</b> Ein Dieb baut die Felgen von Herrn Vogels Auto aus und verkauft sie an den ahnungslosen Herrn Sorglos. Wird Herr Sorglos neuer Eigentümer?</summary>\n    <div class=\"ans\"><div class=\"de\"><b>Antwort</b> <b>Nein.</b> Die Felgen sind gestohlen (abhandengekommen), gutgläubiger Erwerb ist ausgeschlossen <span class=\"para-code\">§935 BGB</span>.</div><div class=\"vi\"><b>Đáp án</b> Không. Vì la-zăng bị đánh cắp, mua bán ngay tình không áp dụng dù người mua có ngay tình.</div></div>\n  </details>"
        ,
          "qa": [
            {
                        "q": "Gast A vergisst seinen Regenschirm im Restaurant. Kellner B nimmt ihn an sich und stellt ihn hinter den Tresen. Wer ist Besitzer und wer Eigentümer?",
                        "qVi": "Khách A để quên ô tại nhà hàng. Bồi bàn B cất ô sau quầy thu ngân. Ai là người chiếm hữu và ai là người sở hữu?",
                        "a": "Gast A bleibt der <b>Eigentümer</b> des Schirms. Kellner B (bzw. der Restaurantinhaber) ist der <b>Besitzer</b>, da er die tatsächliche Sachherrschaft ausübt.",
                        "aVi": "Khách A vẫn là <b>chủ sở hữu (Eigentümer)</b>. Bồi bàn B là <b>người chiếm hữu (Besitzer)</b> vì đang nắm giữ trực tiếp.",
                        "src": "IHK / Berufsschule"
            }
]
        },
        {
          "id": "wiko-rg-bt6",
          "icon": "",
          "name": "Rechtsgeschäfte · Fall-Übung — Alles zusammen",
          "desc": "Komplexe Fallstudie zu Rechtsgeschäften und Eigentumsübertragung",
          "content": "<h2>Rechtsgeschäfte · Fall-Übung — Alles zusammen</h2>\n<div class=\"hint\">Gesetzbuch zum Lernen (DE–VI) · BGB</div>\n<details class=\"q\"><summary><b>Fall A</b> Frank (35) kauft ein Haus von Alexandra (88) und vermietet es an Peter (21). Alle sind geistig voll gesund. Analysieren Sie den Fall vollständig.</summary>\n    <div class=\"ans\">\n      <div class=\"de\"><b>Lösung</b> \n        <ul>\n          <li><b>Rechtsfähig?</b> Alle drei — jeder Mensch ist rechtsfähig.</li>\n          <li><b>Geschäftsfähig?</b> Alle drei <b>voll geschäftsfähig</b> (über 18, geistig gesund).</li>\n          <li><b>Rechtsgeschäfte:</b> Kaufvertrag (Frank–Alexandra), Mietvertrag (Frank–Peter).</li>\n          <li><b>Ein-/mehrseitig?</b> Beide <b>zweiseitig</b> (Antrag + Annahme).</li>\n          <li><b>Wirksam?</b> Ja, beide <b>voll gültig</b> (kein Mangel).</li>\n          <li><b>Anfechtbar?</b> Nein — kein Irrtum, keine Täuschung, keine Drohung.</li>\n          <li><b>Formzwang?</b> Grundstückskauf → <b>notarielle Beurkundung</b>. Mietvertrag → formfrei (üblich: Schriftform).</li>\n          <li><b>Eigentümer/Besitzer?</b> <b>Frank = Eigentümer</b>, <b>Peter = Besitzer</b>.</li>\n        </ul>\n      </div>\n      <div class=\"vi\">\n        <b>Đáp án dịch</b> \n        <ul>\n          <li>Có năng lực pháp luật? Cả 3 đều có.</li>\n          <li>Có năng lực hành vi? Cả 3 đều đầy đủ (trên 18 tuổi, minh mẫn).</li>\n          <li>Giao dịch hình thành: hợp đồng mua bán (Frank–Alexandra), hợp đồng thuê (Frank–Peter).</li>\n          <li>Đơn/nhiều bên? Cả hai đều nhiều bên (đề nghị + chấp nhận).</li>\n          <li>Có hiệu lực? Có, cả hai đều hợp lệ đầy đủ.</li>\n          <li>Có thể hủy? Không — không có nhầm lẫn, lừa dối, đe dọa.</li>\n          <li>Hình thức bắt buộc? Mua đất → công chứng. Hợp đồng thuê → tự do (thực tế thường bằng văn bản).</li>\n          <li>Chủ sở hữu/chiếm hữu? Frank là chủ sở hữu, Peter là người chiếm hữu.</li>\n        </ul>\n      </div>\n    </div>\n  </details>\n\n  <details class=\"q\"><summary><b>Fall B</b> Alexandra (20) kauft ein Auto für 20.000 € mit einem Bankkredit. Ihre Schwester Anja (17) möchte ebenfalls per Kredit ein Auto kaufen, darf aber nicht — deshalb leiht Alexandra ihr ihr eigenes Auto. Analysieren Sie den Fall vollständig.</summary>\n    <div class=\"ans\">\n      <div class=\"de\"><b>Lösung</b> \n        <ul>\n          <li><b>Rechtsfähig?</b> Beide rechtsfähig.</li>\n          <li><b>Geschäftsfähig?</b> Alexandra (20) → voll geschäftsfähig. Anja (17) → beschränkt geschäftsfähig.</li>\n          <li><b>Drei Rechtsgeschäfte:</b> 1) Kaufvertrag (Alexandra–Händler); 2) Darlehensvertrag (Alexandra–Bank); 3) Leihvertrag (Alexandra–Anja).</li>\n          <li><b>Ein-/mehrseitig?</b> Alle drei <b>zweiseitig</b>.</li>\n          <li><b>Wirksam?</b> Ja, alle drei. Beim Leihvertrag erhält Anja nur einen <b>rechtlichen Vorteil</b> <span class=\"para-code\">§107</span> (kostenlose Nutzung, keine Pflicht) → keine Zustimmung der Eltern nötig.</li>\n          <li><b>Anfechtbar?</b> Nein.</li>\n          <li><b>Formzwang?</b> Kaufvertrag → formfrei. Darlehensvertrag (Verbraucherkredit) → <b>Schriftform</b> <span class=\"para-code\">§492</span>. Leihvertrag → formfrei.</li>\n          <li><b>Eigentümer/Besitzer des Autos?</b> <b>Alexandra = Eigentümerin</b>. <b>Anja = Besitzerin</b> während der Leihzeit.</li>\n        </ul>\n      </div>\n      <div class=\"vi\">\n        <b>Đáp án dịch</b> \n        <ul>\n          <li>Có năng lực pháp luật? Cả hai đều có.</li>\n          <li>Có năng lực hành vi? Alexandra (20) đầy đủ. Anja (17) hạn chế.</li>\n          <li>Ba giao dịch: 1) mua bán (Alexandra–đại lý); 2) vay tiền (Alexandra–ngân hàng); 3) cho mượn (Alexandra–Anja).</li>\n          <li>Đơn/nhiều bên? Cả ba đều nhiều bên.</li>\n          <li>Có hiệu lực? Có cả ba. Với hợp đồng cho mượn, Anja chỉ nhận lợi ích pháp lý thuần túy (dùng miễn phí, không nghĩa vụ) → không cần cha mẹ đồng ý.</li>\n          <li>Có thể hủy? Không.</li>\n          <li>Hình thức bắt buộc? Mua xe → tự do. Vay ngân hàng → bắt buộc văn bản. Cho mượn → tự do.</li>\n          <li>Chủ sở hữu/chiếm hữu xe? Alexandra là chủ sở hữu. Anja là người chiếm hữu trong thời gian mượn.</li>\n        </ul>\n      </div>\n    </div>\n  </details>\n\n  <div class=\"block\">\n    <div class=\"de\" style=\"border-radius:8px;\"><b>Merktipp für Fallaufgaben</b> \n      1) Rechtsfähig? — immer \"ja\". 2) Geschäftsfähigkeit prüfen (Alter). 3) Rechtsgeschäft(e) benennen. 4) Ein- oder zweiseitig? 5) Wie kam die WE zustande? 6) Wirksam? Wann nichtig? 7) Anfechtbar? 8) Formzwang? 9) Eigentümer vs. Besitzer?\n    </div>\n    <div class=\"vi\"><b>Mẹo làm bài tình huống</b> \n      1) Năng lực pháp luật? — luôn \"có\". 2) Kiểm tra năng lực hành vi (tuổi). 3) Xác định giao dịch pháp lý. 4) Đơn hay nhiều bên? 5) Tuyên bố ý chí hình thành thế nào? 6) Có hiệu lực? Khi nào vô hiệu? 7) Có thể hủy? 8) Hình thức bắt buộc? 9) Ai là chủ sở hữu, ai là người chiếm hữu?\n    </div>\n  </div>"
        ,
          "qa": [
            {
                        "q": "Kann jemand an einer gestohlenen Sache gutgläubig Eigentum erwerben?",
                        "qVi": "Một người mua ngay tình có thể trở thành chủ sở hữu của món đồ bị trộm cắp không?",
                        "a": "<b>Nein.</b> An gestohlenen oder abhandengekommenen Sachen ist ein <b>gutgläubiger Erwerb nach § 935 Abs. 1 BGB gesetzlich ausgeschlossen</b>.",
                        "aVi": "<b>Tuyệt đối không.</b> Theo § 935 BGB, đồ vật bị trộm cắp thì <b>không ai có thể xác lập quyền sở hữu ngay tình</b>.",
                        "src": "IHK / Berufsschule"
            }
]
        }
      ]
    },
    {
      "id": "wiso-theorie",
      "badge": "WiSo (Theorie)",
      "title": "WiSo (Theorie) · 9 Prüfungsthemen im Überblick",
      "items": [
        {
          "id": "wiso-thema-1",
          "icon": "",
          "name": "WiSo Thema 1 · Ausbildungsbetrieb",
          "desc": "Aufgaben des Ausbildungsbetriebs · Rechte und Pflichten der Auszubildenden · Rechte und Pflichten der Ausbilder · Organisation und Struktur des Betriebs · Zusammenarbeit im Betrieb",
          "content": "<h2>WiSo Thema 1 · Ausbildungsbetrieb</h2>\n<div class=\"hint\">Themenüberblick · Quelle: Fach Wiso (Theorie) · 5 Punkte, je 3 Theorie-Inhalte + Beispiele</div>\n<h3>A. Theorie &amp; Beispiele (5 Punkte)</h3>\n<table><tr><th>Punkt</th><th>Theorie</th><th>Beispiel</th></tr>\n<tr><td><b>1. Aufgaben des Ausbildungsbetriebs</b><div class=\'vi-sub\'>Nhiệm vụ của doanh nghiệp đào tạo</div></td><td>1. Fachwissen vermitteln<div class=\'vi-sub\'>Truyền đạt kiến thức nghề.</div><br>2. Praktische Fertigkeiten trainieren<div class=\'vi-sub\'>Rèn luyện kỹ năng thực hành.</div><br>3. Soziale Kompetenzen fördern<div class=\'vi-sub\'>Phát triển kỹ năng xã hội.</div></td><td>1. „Azubi lernt Hygienevorschriften.“<div class=\'vi-sub\'>Học viên học quy định vệ sinh.</div><br>2. „Azubi bereitet Sandwiches unter Anleitung zu.“<div class=\'vi-sub\'>Học viên làm bánh mì dưới sự hướng dẫn.</div><br>3. „Teamarbeit im Service üben.“<div class=\'vi-sub\'>Luyện kỹ năng làm việc nhóm trong phục vụ.</div></td></tr>\n<tr><td><b>2. Rechte und Pflichten der Auszubildenden</b><div class=\'vi-sub\'>Quyền &amp; nghĩa vụ của học viên</div></td><td>1. Recht auf Ausbildung<div class=\'vi-sub\'>Có quyền được đào tạo.</div><br>2. Pflicht zur Lernbereitschaft<div class=\'vi-sub\'>Nghĩa vụ học tập nghiêm túc.</div><br>3. Betriebsordnung einhalten<div class=\'vi-sub\'>Tuân thủ nội quy doanh nghiệp.</div></td><td>1. „Azubi bekommt Ausbildungsplan.“<div class=\'vi-sub\'>Học viên nhận kế hoạch đào tạo.</div><br>2. „Berichtsheft regelmäßig schreiben.“<div class=\'vi-sub\'>Viết sổ nhật ký nghề thường xuyên.</div><br>3. „Arbeitskleidung tragen.“<div class=\'vi-sub\'>Mặc đồng phục khi làm việc.</div></td></tr>\n<tr><td><b>3. Rechte und Pflichten der Ausbilder</b><div class=\'vi-sub\'>Quyền &amp; nghĩa vụ của người đào tạo</div></td><td>1. Recht auf Respekt<div class=\'vi-sub\'>Có quyền được tôn trọng.</div><br>2. Pflicht zur Fürsorge<div class=\'vi-sub\'>Có nghĩa vụ quan tâm &amp; bảo vệ học viên.</div><br>3. Pflicht zur Wissensvermittlung<div class=\'vi-sub\'>Nghĩa vụ truyền đạt kiến thức.</div></td><td>1. „Azubi respektiert Anweisungen des Ausbilders.“<div class=\'vi-sub\'>Học viên tôn trọng hướng dẫn của người đào tạo.</div><br>2. „Ausbilder sorgt für Arbeitssicherheit.“<div class=\'vi-sub\'>Người đào tạo đảm bảo an toàn lao động.</div><br>3. „Ausbilder erklärt HACCP-Regeln.“<div class=\'vi-sub\'>Người đào tạo giảng giải quy tắc HACCP.</div></td></tr>\n<tr><td><b>4. Organisation und Struktur des Betriebs</b><div class=\'vi-sub\'>Cấu trúc &amp; tổ chức doanh nghiệp</div></td><td>1. Hierarchie kennen<div class=\'vi-sub\'>Hiểu hệ thống cấp bậc.</div><br>2. Abteilungen unterscheiden<div class=\'vi-sub\'>Biết các bộ phận khác nhau.</div><br>3. Kommunikationswege nutzen<div class=\'vi-sub\'>Sử dụng kênh giao tiếp.</div></td><td>1. „Filialleiter über Teamleiter → Mitarbeiter.“<div class=\'vi-sub\'>Quản lý → trưởng nhóm → nhân viên.</div><br>2. „Abteilungen: Küche, Service, Verwaltung.“<div class=\'vi-sub\'>Bộ phận: bếp, phục vụ, quản lý.</div><br>3. „Azubi meldet Problem an Schichtleiter.“<div class=\'vi-sub\'>Học viên báo sự cố cho trưởng ca.</div></td></tr>\n<tr><td><b>5. Zusammenarbeit im Betrieb</b><div class=\'vi-sub\'>Hợp tác trong doanh nghiệp</div></td><td>1. Teamarbeit fördern<div class=\'vi-sub\'>Khuyến khích làm việc nhóm.</div><br>2. Konflikte lösen<div class=\'vi-sub\'>Giải quyết xung đột.</div><br>3. Respekt und Kommunikation pflegen<div class=\'vi-sub\'>Duy trì tôn trọng &amp; giao tiếp.</div></td><td>1. „Azubi hilft Kollegen im Stoßgeschäft.“<div class=\'vi-sub\'>Học viên hỗ trợ đồng nghiệp lúc cao điểm.</div><br>2. „Konflikt zwischen Küche &amp; Service klären.“<div class=\'vi-sub\'>Giải quyết xung đột giữa bếp &amp; phục vụ.</div><br>3. „Feedback-Runden im Team durchführen.“<div class=\'vi-sub\'>Tổ chức vòng phản hồi trong nhóm.</div></td></tr>\n</table>\n<h3>B. Wichtige Hinweise – Điểm lưu ý quan trọng</h3>\n<table><tr><th>Deutsch</th><th>Tiếng Việt</th><th>Ghi chú</th></tr>\n<tr><td>Der Ausbildungsbetrieb vermittelt Theorie und Praxis.</td><td>Doanh nghiệp đào tạo truyền đạt cả lý thuyết và thực hành.</td><td>Azubi lernt Fachwissen + praktische Arbeit. Học viên học kiến thức + thực hành công việc.</td></tr>\n<tr><td>Azubis haben Rechte und Pflichten.</td><td>Học viên có cả quyền và nghĩa vụ.</td><td>Recht: Ausbildung, Vergütung. Pflicht: Lernen, Regeln einhalten. Quyền: được đào tạo, có lương. Nghĩa vụ: học tập, tuân thủ nội quy.</td></tr>\n<tr><td>Ausbilder haben Fürsorge- und Ausbildungspflicht.</td><td>Người đào tạo có nghĩa vụ chăm lo và giảng dạy.</td><td>Ausbilder sorgt für Sicherheit + erklärt Inhalte. Người đào tạo đảm bảo an toàn + truyền đạt nội dung.</td></tr>\n<tr><td>Organisation im Betrieb schafft Klarheit.</td><td>Tổ chức trong doanh nghiệp tạo sự rõ ràng.</td><td>Hierarchie: Filialleiter → Teamleiter → Mitarbeiter. Cấp bậc: quản lý → trưởng nhóm → nhân viên.</td></tr>\n<tr><td>Zusammenarbeit ist Schlüssel zum Erfolg.</td><td>Hợp tác là chìa khóa thành công.</td><td>Teamarbeit, Kommunikation, Konfliktlösung. Làm việc nhóm, giao tiếp, giải quyết xung đột.</td></tr>\n<tr><td>Dokumentation ist Pflicht.</td><td>Ghi chép là bắt buộc.</td><td>Berichtsheft = Ausbildungsnachweis. Sổ báo cáo = chứng từ đào tạo.</td></tr>\n<tr><td>Motivation entsteht am ersten Tag.</td><td>Động lực bắt đầu từ ngày đầu tiên.</td><td>Guter Start = mehr Engagement im Betrieb. Khởi đầu tốt = gắn bó hơn trong doanh nghiệp.</td></tr>\n</table>",
          "qa": [
            {
              "q": "Thema 1 – Aufgaben des Ausbildungsbetriebs: Welche Inhalte gehören dazu?",
              "qVi": "Nhiệm vụ của doanh nghiệp đào tạo: gồm những nội dung nào?",
              "a": "1. Fachwissen vermitteln\n2. Praktische Fertigkeiten trainieren\n3. Soziale Kompetenzen fördern",
              "aVi": "1. Truyền đạt kiến thức nghề.\n2. Rèn luyện kỹ năng thực hành.\n3. Phát triển kỹ năng xã hội.",
              "why": "Điểm Theorie trong bảng tổng hợp WiSo (mỗi Punkt có 3 nội dung).",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Nenne ein praktisches Beispiel zu: Aufgaben des Ausbildungsbetriebs",
              "qVi": "Nêu một ví dụ thực tế cho: Nhiệm vụ của doanh nghiệp đào tạo",
              "a": "1. „Azubi lernt Hygienevorschriften.“\n2. „Azubi bereitet Sandwiches unter Anleitung zu.“\n3. „Teamarbeit im Service üben.“",
              "aVi": "1. Học viên học quy định vệ sinh.\n2. Học viên làm bánh mì dưới sự hướng dẫn.\n3. Luyện kỹ năng làm việc nhóm trong phục vụ.",
              "why": "Ví dụ giúp trả lời câu hỏi tình huống trong thi WiSo.",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Thema 1 – Rechte und Pflichten der Auszubildenden: Welche Inhalte gehören dazu?",
              "qVi": "Quyền & nghĩa vụ của học viên: gồm những nội dung nào?",
              "a": "1. Recht auf Ausbildung\n2. Pflicht zur Lernbereitschaft\n3. Betriebsordnung einhalten",
              "aVi": "1. Có quyền được đào tạo.\n2. Nghĩa vụ học tập nghiêm túc.\n3. Tuân thủ nội quy doanh nghiệp.",
              "why": "Điểm Theorie trong bảng tổng hợp WiSo (mỗi Punkt có 3 nội dung).",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Nenne ein praktisches Beispiel zu: Rechte und Pflichten der Auszubildenden",
              "qVi": "Nêu một ví dụ thực tế cho: Quyền & nghĩa vụ của học viên",
              "a": "1. „Azubi bekommt Ausbildungsplan.“\n2. „Berichtsheft regelmäßig schreiben.“\n3. „Arbeitskleidung tragen.“",
              "aVi": "1. Học viên nhận kế hoạch đào tạo.\n2. Viết sổ nhật ký nghề thường xuyên.\n3. Mặc đồng phục khi làm việc.",
              "why": "Ví dụ giúp trả lời câu hỏi tình huống trong thi WiSo.",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Thema 1 – Rechte und Pflichten der Ausbilder: Welche Inhalte gehören dazu?",
              "qVi": "Quyền & nghĩa vụ của người đào tạo: gồm những nội dung nào?",
              "a": "1. Recht auf Respekt\n2. Pflicht zur Fürsorge\n3. Pflicht zur Wissensvermittlung",
              "aVi": "1. Có quyền được tôn trọng.\n2. Có nghĩa vụ quan tâm & bảo vệ học viên.\n3. Nghĩa vụ truyền đạt kiến thức.",
              "why": "Điểm Theorie trong bảng tổng hợp WiSo (mỗi Punkt có 3 nội dung).",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Nenne ein praktisches Beispiel zu: Rechte und Pflichten der Ausbilder",
              "qVi": "Nêu một ví dụ thực tế cho: Quyền & nghĩa vụ của người đào tạo",
              "a": "1. „Azubi respektiert Anweisungen des Ausbilders.“\n2. „Ausbilder sorgt für Arbeitssicherheit.“\n3. „Ausbilder erklärt HACCP-Regeln.“",
              "aVi": "1. Học viên tôn trọng hướng dẫn của người đào tạo.\n2. Người đào tạo đảm bảo an toàn lao động.\n3. Người đào tạo giảng giải quy tắc HACCP.",
              "why": "Ví dụ giúp trả lời câu hỏi tình huống trong thi WiSo.",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Thema 1 – Organisation und Struktur des Betriebs: Welche Inhalte gehören dazu?",
              "qVi": "Cấu trúc & tổ chức doanh nghiệp: gồm những nội dung nào?",
              "a": "1. Hierarchie kennen\n2. Abteilungen unterscheiden\n3. Kommunikationswege nutzen",
              "aVi": "1. Hiểu hệ thống cấp bậc.\n2. Biết các bộ phận khác nhau.\n3. Sử dụng kênh giao tiếp.",
              "why": "Điểm Theorie trong bảng tổng hợp WiSo (mỗi Punkt có 3 nội dung).",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Nenne ein praktisches Beispiel zu: Organisation und Struktur des Betriebs",
              "qVi": "Nêu một ví dụ thực tế cho: Cấu trúc & tổ chức doanh nghiệp",
              "a": "1. „Filialleiter über Teamleiter → Mitarbeiter.“\n2. „Abteilungen: Küche, Service, Verwaltung.“\n3. „Azubi meldet Problem an Schichtleiter.“",
              "aVi": "1. Quản lý → trưởng nhóm → nhân viên.\n2. Bộ phận: bếp, phục vụ, quản lý.\n3. Học viên báo sự cố cho trưởng ca.",
              "why": "Ví dụ giúp trả lời câu hỏi tình huống trong thi WiSo.",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Thema 1 – Zusammenarbeit im Betrieb: Welche Inhalte gehören dazu?",
              "qVi": "Hợp tác trong doanh nghiệp: gồm những nội dung nào?",
              "a": "1. Teamarbeit fördern\n2. Konflikte lösen\n3. Respekt und Kommunikation pflegen",
              "aVi": "1. Khuyến khích làm việc nhóm.\n2. Giải quyết xung đột.\n3. Duy trì tôn trọng & giao tiếp.",
              "why": "Điểm Theorie trong bảng tổng hợp WiSo (mỗi Punkt có 3 nội dung).",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Nenne ein praktisches Beispiel zu: Zusammenarbeit im Betrieb",
              "qVi": "Nêu một ví dụ thực tế cho: Hợp tác trong doanh nghiệp",
              "a": "1. „Azubi hilft Kollegen im Stoßgeschäft.“\n2. „Konflikt zwischen Küche & Service klären.“\n3. „Feedback-Runden im Team durchführen.“",
              "aVi": "1. Học viên hỗ trợ đồng nghiệp lúc cao điểm.\n2. Giải quyết xung đột giữa bếp & phục vụ.\n3. Tổ chức vòng phản hồi trong nhóm.",
              "why": "Ví dụ giúp trả lời câu hỏi tình huống trong thi WiSo.",
              "src": "Fach Wiso (Theorie)"
            }
          ],
          "vokabeln": [
            {
              "de": "Aufgaben des Ausbildungsbetriebs",
              "vi": "Nhiệm vụ của doanh nghiệp đào tạo"
            },
            {
              "de": "Rechte und Pflichten der Auszubildenden",
              "vi": "Quyền & nghĩa vụ của học viên"
            },
            {
              "de": "Rechte und Pflichten der Ausbilder",
              "vi": "Quyền & nghĩa vụ của người đào tạo"
            },
            {
              "de": "Organisation und Struktur des Betriebs",
              "vi": "Cấu trúc & tổ chức doanh nghiệp"
            },
            {
              "de": "Zusammenarbeit im Betrieb",
              "vi": "Hợp tác trong doanh nghiệp"
            }
          ]
        },
        {
          "id": "wiso-thema-2",
          "icon": "",
          "name": "WiSo Thema 2 · Berufsausbildungs- und Arbeitsverhältnis",
          "desc": "Inhalte des Ausbildungsvertrags · Dauer der Ausbildung · Arbeitszeitregelungen · Vergütung und Urlaub · Beendigung und Kündigung",
          "content": "<h2>WiSo Thema 2 · Berufsausbildungs- und Arbeitsverhältnis</h2>\n<div class=\"hint\">Themenüberblick · Quelle: Fach Wiso (Theorie) · 5 Punkte, je 3 Theorie-Inhalte + Beispiele</div>\n<h3>A. Theorie &amp; Beispiele (5 Punkte)</h3>\n<table><tr><th>Punkt</th><th>Theorie</th><th>Beispiel</th></tr>\n<tr><td><b>1. Inhalte des Ausbildungsvertrags</b><div class=\'vi-sub\'>Nội dung hợp đồng đào tạo</div></td><td>1. Vertragsparteien<div class=\'vi-sub\'>Các bên tham gia hợp đồng.</div><br>2. Ausbildungsdauer<div class=\'vi-sub\'>Thời gian đào tạo.</div><br>3. Vergütung und Urlaub<div class=\'vi-sub\'>Lương &amp; ngày nghỉ.</div></td><td>1. „Vertrag zwischen Azubi und Betrieb.“<div class=\'vi-sub\'>Hợp đồng giữa học viên và doanh nghiệp.</div><br>2. „Ausbildung dauert 2 Jahre.“<div class=\'vi-sub\'>Đào tạo kéo dài 2 năm.</div><br>3. „Azubi bekommt 24 Urlaubstage.“<div class=\'vi-sub\'>Học viên có 24 ngày phép.</div></td></tr>\n<tr><td><b>2. Dauer der Ausbildung</b><div class=\'vi-sub\'>Thời gian đào tạo</div></td><td>1. Regelausbildungszeit<div class=\'vi-sub\'>Thời gian tiêu chuẩn.</div><br>2. Verkürzung möglich<div class=\'vi-sub\'>Có thể rút ngắn.</div><br>3. Verlängerung bei Bedarf<div class=\'vi-sub\'>Có thể kéo dài nếu cần.</div></td><td>1. „Systemgastronomie = 2 Jahre.“<div class=\'vi-sub\'>Ngành Systemgastronomie = 2 năm.</div><br>2. „Verkürzung bei guten Noten möglich.“<div class=\'vi-sub\'>Có thể rút ngắn nếu điểm tốt.</div><br>3. „Verlängerung bei Krankheit.“<div class=\'vi-sub\'>Có thể kéo dài khi bị bệnh.</div></td></tr>\n<tr><td><b>3. Arbeitszeitregelungen</b><div class=\'vi-sub\'>Quy định giờ làm việc</div></td><td>1. Jugendarbeitsschutz beachten<div class=\'vi-sub\'>Luật bảo vệ lao động trẻ.</div><br>2. Maximalstunden/Tag<div class=\'vi-sub\'>Số giờ làm tối đa/ngày.</div><br>3. Pausenregelung<div class=\'vi-sub\'>Quy định nghỉ ngơi.</div></td><td>1. „Azubi unter 18: max. 40 Std./Woche.“<div class=\'vi-sub\'>Học viên &lt;18 tuổi: tối đa 40 giờ/tuần.</div><br>2. „Nicht mehr als 10 Std./Tag.“<div class=\'vi-sub\'>Không quá 10 giờ/ngày.</div><br>3. „Nach 6 Std. Arbeit → 30 Min. Pause.“<div class=\'vi-sub\'>Sau 6 giờ làm → nghỉ 30 phút.</div></td></tr>\n<tr><td><b>4. Vergütung und Urlaub</b><div class=\'vi-sub\'>Lương &amp; ngày nghỉ</div></td><td>1. Tarifvertrag beachten<div class=\'vi-sub\'>Tuân thủ hợp đồng lao động tập thể.</div><br>2. Mindestlohnregelung<div class=\'vi-sub\'>Quy định lương tối thiểu.</div><br>3. Urlaubsanspruch<div class=\'vi-sub\'>Quyền nghỉ phép.</div></td><td>1. „Azubi erhält 800 €/Monat.“<div class=\'vi-sub\'>Học viên nhận 800 €/tháng.</div><br>2. „Lohn darf Mindestlohn nicht unterschreiten.“<div class=\'vi-sub\'>Lương không được thấp hơn mức tối thiểu.</div><br>3. „Urlaub: 24 Tage pro Jahr.“<div class=\'vi-sub\'>Nghỉ phép: 24 ngày/năm.</div></td></tr>\n<tr><td><b>5. Beendigung und Kündigung</b><div class=\'vi-sub\'>Kết thúc &amp; chấm dứt hợp đồng</div></td><td>1. Ende mit Bestehen der Prüfung<div class=\'vi-sub\'>Kết thúc khi thi đỗ.</div><br>2. Kündigung in Probezeit<div class=\'vi-sub\'>Có thể chấm dứt trong thời gian thử việc.</div><br>3. Außerordentliche Kündigung<div class=\'vi-sub\'>Chấm dứt đặc biệt (lý do nghiêm trọng).</div></td><td>1. „Vertrag endet nach Abschlussprüfung.“<div class=\'vi-sub\'>Hợp đồng kết thúc sau kỳ thi.</div><br>2. „Probezeit: 4 Monate kündbar.“<div class=\'vi-sub\'>Thử việc: 4 tháng có thể nghỉ.</div><br>3. „Fristlose Kündigung bei Diebstahl.“<div class=\'vi-sub\'>Chấm dứt ngay khi ăn cắp.</div></td></tr>\n</table>\n<h3>B. Wichtige Hinweise – Điểm lưu ý quan trọng</h3>\n<table><tr><th>Deutsch</th><th>Tiếng Việt</th><th>Ghi chú</th></tr>\n<tr><td>Der Ausbildungsvertrag ist die Grundlage.</td><td>Hợp đồng đào tạo là nền tảng.</td><td>Ohne Vertrag keine Ausbildung. Không có hợp đồng thì không có đào tạo.</td></tr>\n<tr><td>Dauer der Ausbildung kann variieren.</td><td>Thời gian đào tạo có thể thay đổi.</td><td>Verkürzung bei guten Leistungen, Verlängerung bei Krankheit. Có thể rút ngắn khi học tốt, kéo dài nếu bệnh.</td></tr>\n<tr><td>Arbeitszeit ist gesetzlich geregelt.</td><td>Giờ làm việc được quy định bởi luật.</td><td>Jugendarbeitsschutz beachten (unter 18: max. 40 Std./Woche). Luật bảo vệ lao động trẻ (&lt;18 tuổi: tối đa 40h/tuần).</td></tr>\n<tr><td>Vergütung und Urlaub sind Rechte des Azubis.</td><td>Lương &amp; ngày nghỉ là quyền của học viên.</td><td>Mindestens tariflich geregelt, Urlaub mind. 24 Tage. Theo hợp đồng tập thể, nghỉ phép ít nhất 24 ngày.</td></tr>\n<tr><td>Probezeit ist entscheidend.</td><td>Thời gian thử việc rất quan trọng.</td><td>Dauert bis 4 Monate, Kündigung jederzeit möglich. Kéo dài đến 4 tháng, có thể nghỉ bất cứ lúc nào.</td></tr>\n<tr><td>Kündigung nach Probezeit nur mit Gründen.</td><td>Sau thử việc chỉ được chấm dứt khi có lý do.</td><td>Ordentliche oder außerordentliche Kündigung. Chấm dứt thông thường hoặc đặc biệt.</td></tr>\n<tr><td>Rechte und Pflichten beider Seiten müssen im Gleichgewicht sein.</td><td>Quyền và nghĩa vụ của cả hai bên phải cân bằng.</td><td>Nur so ist die Ausbildung erfolgreich. Chỉ như vậy đào tạo mới thành công.</td></tr>\n</table>",
          "qa": [
            {
              "q": "Thema 2 – Inhalte des Ausbildungsvertrags: Welche Inhalte gehören dazu?",
              "qVi": "Nội dung hợp đồng đào tạo: gồm những nội dung nào?",
              "a": "1. Vertragsparteien\n2. Ausbildungsdauer\n3. Vergütung und Urlaub",
              "aVi": "1. Các bên tham gia hợp đồng.\n2. Thời gian đào tạo.\n3. Lương & ngày nghỉ.",
              "why": "Điểm Theorie trong bảng tổng hợp WiSo (mỗi Punkt có 3 nội dung).",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Nenne ein praktisches Beispiel zu: Inhalte des Ausbildungsvertrags",
              "qVi": "Nêu một ví dụ thực tế cho: Nội dung hợp đồng đào tạo",
              "a": "1. „Vertrag zwischen Azubi und Betrieb.“\n2. „Ausbildung dauert 2 Jahre.“\n3. „Azubi bekommt 24 Urlaubstage.“",
              "aVi": "1. Hợp đồng giữa học viên và doanh nghiệp.\n2. Đào tạo kéo dài 2 năm.\n3. Học viên có 24 ngày phép.",
              "why": "Ví dụ giúp trả lời câu hỏi tình huống trong thi WiSo.",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Thema 2 – Dauer der Ausbildung: Welche Inhalte gehören dazu?",
              "qVi": "Thời gian đào tạo: gồm những nội dung nào?",
              "a": "1. Regelausbildungszeit\n2. Verkürzung möglich\n3. Verlängerung bei Bedarf",
              "aVi": "1. Thời gian tiêu chuẩn.\n2. Có thể rút ngắn.\n3. Có thể kéo dài nếu cần.",
              "why": "Điểm Theorie trong bảng tổng hợp WiSo (mỗi Punkt có 3 nội dung).",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Nenne ein praktisches Beispiel zu: Dauer der Ausbildung",
              "qVi": "Nêu một ví dụ thực tế cho: Thời gian đào tạo",
              "a": "1. „Systemgastronomie = 2 Jahre.“\n2. „Verkürzung bei guten Noten möglich.“\n3. „Verlängerung bei Krankheit.“",
              "aVi": "1. Ngành Systemgastronomie = 2 năm.\n2. Có thể rút ngắn nếu điểm tốt.\n3. Có thể kéo dài khi bị bệnh.",
              "why": "Ví dụ giúp trả lời câu hỏi tình huống trong thi WiSo.",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Thema 2 – Arbeitszeitregelungen: Welche Inhalte gehören dazu?",
              "qVi": "Quy định giờ làm việc: gồm những nội dung nào?",
              "a": "1. Jugendarbeitsschutz beachten\n2. Maximalstunden/Tag\n3. Pausenregelung",
              "aVi": "1. Luật bảo vệ lao động trẻ.\n2. Số giờ làm tối đa/ngày.\n3. Quy định nghỉ ngơi.",
              "why": "Điểm Theorie trong bảng tổng hợp WiSo (mỗi Punkt có 3 nội dung).",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Nenne ein praktisches Beispiel zu: Arbeitszeitregelungen",
              "qVi": "Nêu một ví dụ thực tế cho: Quy định giờ làm việc",
              "a": "1. „Azubi unter 18: max. 40 Std./Woche.“\n2. „Nicht mehr als 10 Std./Tag.“\n3. „Nach 6 Std. Arbeit → 30 Min. Pause.“",
              "aVi": "1. Học viên <18 tuổi: tối đa 40 giờ/tuần.\n2. Không quá 10 giờ/ngày.\n3. Sau 6 giờ làm → nghỉ 30 phút.",
              "why": "Ví dụ giúp trả lời câu hỏi tình huống trong thi WiSo.",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Thema 2 – Vergütung und Urlaub: Welche Inhalte gehören dazu?",
              "qVi": "Lương & ngày nghỉ: gồm những nội dung nào?",
              "a": "1. Tarifvertrag beachten\n2. Mindestlohnregelung\n3. Urlaubsanspruch",
              "aVi": "1. Tuân thủ hợp đồng lao động tập thể.\n2. Quy định lương tối thiểu.\n3. Quyền nghỉ phép.",
              "why": "Điểm Theorie trong bảng tổng hợp WiSo (mỗi Punkt có 3 nội dung).",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Nenne ein praktisches Beispiel zu: Vergütung und Urlaub",
              "qVi": "Nêu một ví dụ thực tế cho: Lương & ngày nghỉ",
              "a": "1. „Azubi erhält 800 €/Monat.“\n2. „Lohn darf Mindestlohn nicht unterschreiten.“\n3. „Urlaub: 24 Tage pro Jahr.“",
              "aVi": "1. Học viên nhận 800 €/tháng.\n2. Lương không được thấp hơn mức tối thiểu.\n3. Nghỉ phép: 24 ngày/năm.",
              "why": "Ví dụ giúp trả lời câu hỏi tình huống trong thi WiSo.",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Thema 2 – Beendigung und Kündigung: Welche Inhalte gehören dazu?",
              "qVi": "Kết thúc & chấm dứt hợp đồng: gồm những nội dung nào?",
              "a": "1. Ende mit Bestehen der Prüfung\n2. Kündigung in Probezeit\n3. Außerordentliche Kündigung",
              "aVi": "1. Kết thúc khi thi đỗ.\n2. Có thể chấm dứt trong thời gian thử việc.\n3. Chấm dứt đặc biệt (lý do nghiêm trọng).",
              "why": "Điểm Theorie trong bảng tổng hợp WiSo (mỗi Punkt có 3 nội dung).",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Nenne ein praktisches Beispiel zu: Beendigung und Kündigung",
              "qVi": "Nêu một ví dụ thực tế cho: Kết thúc & chấm dứt hợp đồng",
              "a": "1. „Vertrag endet nach Abschlussprüfung.“\n2. „Probezeit: 4 Monate kündbar.“\n3. „Fristlose Kündigung bei Diebstahl.“",
              "aVi": "1. Hợp đồng kết thúc sau kỳ thi.\n2. Thử việc: 4 tháng có thể nghỉ.\n3. Chấm dứt ngay khi ăn cắp.",
              "why": "Ví dụ giúp trả lời câu hỏi tình huống trong thi WiSo.",
              "src": "Fach Wiso (Theorie)"
            }
          ],
          "vokabeln": [
            {
              "de": "Inhalte des Ausbildungsvertrags",
              "vi": "Nội dung hợp đồng đào tạo"
            },
            {
              "de": "Dauer der Ausbildung",
              "vi": "Thời gian đào tạo"
            },
            {
              "de": "Arbeitszeitregelungen",
              "vi": "Quy định giờ làm việc"
            },
            {
              "de": "Vergütung und Urlaub",
              "vi": "Lương & ngày nghỉ"
            },
            {
              "de": "Beendigung und Kündigung",
              "vi": "Kết thúc & chấm dứt hợp đồng"
            }
          ]
        },
        {
          "id": "wiso-thema-3",
          "icon": "",
          "name": "WiSo Thema 3 · Betriebliche Mitbestimmung",
          "desc": "Rechte des Betriebsrats · Aufgaben des Betriebsrats · Jugend- und Auszubildendenvertretung (JAV) · Mitbestimmung bei Arbeitszeit · Mitbestimmung bei Kündigung",
          "content": "<h2>WiSo Thema 3 · Betriebliche Mitbestimmung</h2>\n<div class=\"hint\">Themenüberblick · Quelle: Fach Wiso (Theorie) · 5 Punkte, je 3 Theorie-Inhalte + Beispiele</div>\n<h3>A. Theorie &amp; Beispiele (5 Punkte)</h3>\n<table><tr><th>Punkt</th><th>Theorie</th><th>Beispiel</th></tr>\n<tr><td><b>1. Rechte des Betriebsrats</b><div class=\'vi-sub\'>Quyền của hội đồng nhân viên</div></td><td>1. Mitbestimmung bei Arbeitszeit<div class=\'vi-sub\'>Tham gia quyết định giờ làm.</div><br>2. Mitbestimmung bei Kündigungen<div class=\'vi-sub\'>Tham gia quyết định việc chấm dứt hợp đồng.</div><br>3. Informationsrecht<div class=\'vi-sub\'>Quyền được cung cấp thông tin.</div></td><td>1. „Betriebsrat stimmt Dienstplanänderung zu.“<div class=\'vi-sub\'>Hội đồng nhân viên đồng ý thay đổi lịch làm.</div><br>2. „Betriebsrat muss bei Kündigung informiert werden.“<div class=\'vi-sub\'>Hội đồng phải được thông báo khi sa thải.</div><br>3. „Chef informiert Betriebsrat über Neueinstellungen.“<div class=\'vi-sub\'>Sếp báo cho hội đồng về tuyển dụng mới.</div></td></tr>\n<tr><td><b>2. Aufgaben des Betriebsrats</b><div class=\'vi-sub\'>Nhiệm vụ của hội đồng nhân viên</div></td><td>1. Interessen der Mitarbeiter vertreten<div class=\'vi-sub\'>Đại diện quyền lợi nhân viên.</div><br>2. Sozialpläne mitgestalten<div class=\'vi-sub\'>Tham gia xây dựng kế hoạch xã hội.</div><br>3. Beschwerden aufnehmen<div class=\'vi-sub\'>Tiếp nhận khiếu nại.</div></td><td>1. „Betriebsrat fordert bessere Pausenregelung.“<div class=\'vi-sub\'>Hội đồng yêu cầu quy định nghỉ ngơi tốt hơn.</div><br>2. „Betriebsrat wirkt bei Arbeitszeitmodell mit.“<div class=\'vi-sub\'>Tham gia vào mô hình giờ làm.</div><br>3. „Mitarbeiter beschwert sich über Überstunden.“<div class=\'vi-sub\'>Nhân viên khiếu nại vì làm thêm giờ.</div></td></tr>\n<tr><td><b>3. Jugend- und Auszubildendenvertretung (JAV)</b><div class=\'vi-sub\'>Đại diện học viên &amp; thanh niên</div></td><td>1. Vertretung für Azubis unter 25<div class=\'vi-sub\'>Đại diện cho học viên dưới 25 tuổi.</div><br>2. Probleme der Azubis ansprechen<div class=\'vi-sub\'>Nêu vấn đề của học viên.</div><br>3. Enge Zusammenarbeit mit Betriebsrat<div class=\'vi-sub\'>Phối hợp chặt chẽ với hội đồng nhân viên.</div></td><td>1. „JAV kümmert sich um Azubi-Anliegen.“<div class=\'vi-sub\'>JAV chăm lo cho vấn đề của học viên.</div><br>2. „Azubis melden Probleme mit Ausbilder.“<div class=\'vi-sub\'>Học viên báo vấn đề với người đào tạo.</div><br>3. „JAV und Betriebsrat arbeiten zusammen.“<div class=\'vi-sub\'>JAV và hội đồng nhân viên phối hợp.</div></td></tr>\n<tr><td><b>4. Mitbestimmung bei Arbeitszeit</b><div class=\'vi-sub\'>Tham gia quyết định giờ làm</div></td><td>1. Einführung neuer Schichtmodelle<div class=\'vi-sub\'>Áp dụng mô hình ca làm mới.</div><br>2. Überstundenregelung<div class=\'vi-sub\'>Quy định làm thêm giờ.</div><br>3. Urlaubsplanung<div class=\'vi-sub\'>Lập kế hoạch nghỉ phép.</div></td><td>1. „Betriebsrat stimmt Schichtsystem zu.“<div class=\'vi-sub\'>Hội đồng đồng ý hệ thống ca làm.</div><br>2. „Überstunden nur mit Zustimmung.“<div class=\'vi-sub\'>Chỉ làm thêm khi được đồng ý.</div><br>3. „Urlaubsplan wird mit Betriebsrat abgestimmt.“<div class=\'vi-sub\'>Kế hoạch nghỉ phép được thống nhất với hội đồng.</div></td></tr>\n<tr><td><b>5. Mitbestimmung bei Kündigung</b><div class=\'vi-sub\'>Tham gia quyết định chấm dứt hợp đồng</div></td><td>1. Zustimmungspflicht<div class=\'vi-sub\'>Yêu cầu sự đồng ý.</div><br>2. Prüfung der Kündigungsgründe<div class=\'vi-sub\'>Kiểm tra lý do sa thải.</div><br>3. Schutz vor Willkür<div class=\'vi-sub\'>Bảo vệ nhân viên khỏi bị sa thải tùy tiện.</div></td><td>1. „Kündigung ohne Betriebsrat nicht gültig.“<div class=\'vi-sub\'>Sa thải không có hội đồng thì không hợp lệ.</div><br>2. „Betriebsrat prüft Kündigungsgrund.“<div class=\'vi-sub\'>Hội đồng kiểm tra lý do sa thải.</div><br>3. „Mitarbeiter vor ungerechter Kündigung geschützt.“<div class=\'vi-sub\'>Nhân viên được bảo vệ khỏi sa thải bất công.</div></td></tr>\n</table>\n<h3>B. Wichtige Hinweise – Điểm lưu ý quan trọng</h3>\n<table><tr><th>Deutsch</th><th>Tiếng Việt</th><th>Ghi chú</th></tr>\n<tr><td>Der Betriebsrat ist die Stimme der Mitarbeiter.</td><td>Hội đồng nhân viên là tiếng nói của nhân viên.</td><td>Vertretung bei Arbeitszeit, Kündigung, Sozialfragen. Đại diện trong giờ làm, sa thải, vấn đề xã hội.</td></tr>\n<tr><td>JAV ist speziell für Azubis wichtig.</td><td>JAV đặc biệt quan trọng cho học viên.</td><td>Vertretung für Azubis &lt; 25 Jahre. Đại diện cho học viên dưới 25 tuổi.</td></tr>\n<tr><td>Arbeitszeit und Kündigung sind zentrale Mitbestimmungsrechte.</td><td>Giờ làm và chấm dứt hợp đồng là quyền tham gia quan trọng nhất.</td><td>Betriebsrat muss zustimmen oder informiert werden. Hội đồng phải đồng ý hoặc được thông báo.</td></tr>\n<tr><td>Mitbestimmung schützt vor Willkür.</td><td>Tham gia quyết định giúp chống lại sự tùy tiện.</td><td>Ohne Betriebsrat: Kündigung oft ungerecht. Không có hội đồng: sa thải dễ bất công.</td></tr>\n<tr><td>Zusammenarbeit zwischen Betriebsrat, JAV und Chef ist entscheidend.</td><td>Sự phối hợp giữa hội đồng, JAV và sếp là yếu tố then chốt.</td><td>Regelmäßige Sitzungen verbessern Zusammenarbeit. Họp thường xuyên giúp phối hợp tốt hơn.</td></tr>\n<tr><td>Alle Mitarbeiter sollten ihre Rechte kennen.</td><td>Mọi nhân viên cần biết quyền của mình.</td><td>Wichtig für Fairness im Betrieb. Quan trọng để đảm bảo công bằng trong doanh nghiệp.</td></tr>\n<tr><td>Mitbestimmung fördert Motivation und Fairness.</td><td>Tham gia quyết định giúp tăng động lực và công bằng.</td><td>Mitarbeiter fühlen sich ernst genommen. Nhân viên cảm thấy mình được coi trọng.</td></tr>\n</table>",
          "qa": [
            {
              "q": "Thema 3 – Rechte des Betriebsrats: Welche Inhalte gehören dazu?",
              "qVi": "Quyền của hội đồng nhân viên: gồm những nội dung nào?",
              "a": "1. Mitbestimmung bei Arbeitszeit\n2. Mitbestimmung bei Kündigungen\n3. Informationsrecht",
              "aVi": "1. Tham gia quyết định giờ làm.\n2. Tham gia quyết định việc chấm dứt hợp đồng.\n3. Quyền được cung cấp thông tin.",
              "why": "Điểm Theorie trong bảng tổng hợp WiSo (mỗi Punkt có 3 nội dung).",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Nenne ein praktisches Beispiel zu: Rechte des Betriebsrats",
              "qVi": "Nêu một ví dụ thực tế cho: Quyền của hội đồng nhân viên",
              "a": "1. „Betriebsrat stimmt Dienstplanänderung zu.“\n2. „Betriebsrat muss bei Kündigung informiert werden.“\n3. „Chef informiert Betriebsrat über Neueinstellungen.“",
              "aVi": "1. Hội đồng nhân viên đồng ý thay đổi lịch làm.\n2. Hội đồng phải được thông báo khi sa thải.\n3. Sếp báo cho hội đồng về tuyển dụng mới.",
              "why": "Ví dụ giúp trả lời câu hỏi tình huống trong thi WiSo.",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Thema 3 – Aufgaben des Betriebsrats: Welche Inhalte gehören dazu?",
              "qVi": "Nhiệm vụ của hội đồng nhân viên: gồm những nội dung nào?",
              "a": "1. Interessen der Mitarbeiter vertreten\n2. Sozialpläne mitgestalten\n3. Beschwerden aufnehmen",
              "aVi": "1. Đại diện quyền lợi nhân viên.\n2. Tham gia xây dựng kế hoạch xã hội.\n3. Tiếp nhận khiếu nại.",
              "why": "Điểm Theorie trong bảng tổng hợp WiSo (mỗi Punkt có 3 nội dung).",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Nenne ein praktisches Beispiel zu: Aufgaben des Betriebsrats",
              "qVi": "Nêu một ví dụ thực tế cho: Nhiệm vụ của hội đồng nhân viên",
              "a": "1. „Betriebsrat fordert bessere Pausenregelung.“\n2. „Betriebsrat wirkt bei Arbeitszeitmodell mit.“\n3. „Mitarbeiter beschwert sich über Überstunden.“",
              "aVi": "1. Hội đồng yêu cầu quy định nghỉ ngơi tốt hơn.\n2. Tham gia vào mô hình giờ làm.\n3. Nhân viên khiếu nại vì làm thêm giờ.",
              "why": "Ví dụ giúp trả lời câu hỏi tình huống trong thi WiSo.",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Thema 3 – Jugend- und Auszubildendenvertretung (JAV): Welche Inhalte gehören dazu?",
              "qVi": "Đại diện học viên & thanh niên: gồm những nội dung nào?",
              "a": "1. Vertretung für Azubis unter 25\n2. Probleme der Azubis ansprechen\n3. Enge Zusammenarbeit mit Betriebsrat",
              "aVi": "1. Đại diện cho học viên dưới 25 tuổi.\n2. Nêu vấn đề của học viên.\n3. Phối hợp chặt chẽ với hội đồng nhân viên.",
              "why": "Điểm Theorie trong bảng tổng hợp WiSo (mỗi Punkt có 3 nội dung).",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Nenne ein praktisches Beispiel zu: Jugend- und Auszubildendenvertretung (JAV)",
              "qVi": "Nêu một ví dụ thực tế cho: Đại diện học viên & thanh niên",
              "a": "1. „JAV kümmert sich um Azubi-Anliegen.“\n2. „Azubis melden Probleme mit Ausbilder.“\n3. „JAV und Betriebsrat arbeiten zusammen.“",
              "aVi": "1. JAV chăm lo cho vấn đề của học viên.\n2. Học viên báo vấn đề với người đào tạo.\n3. JAV và hội đồng nhân viên phối hợp.",
              "why": "Ví dụ giúp trả lời câu hỏi tình huống trong thi WiSo.",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Thema 3 – Mitbestimmung bei Arbeitszeit: Welche Inhalte gehören dazu?",
              "qVi": "Tham gia quyết định giờ làm: gồm những nội dung nào?",
              "a": "1. Einführung neuer Schichtmodelle\n2. Überstundenregelung\n3. Urlaubsplanung",
              "aVi": "1. Áp dụng mô hình ca làm mới.\n2. Quy định làm thêm giờ.\n3. Lập kế hoạch nghỉ phép.",
              "why": "Điểm Theorie trong bảng tổng hợp WiSo (mỗi Punkt có 3 nội dung).",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Nenne ein praktisches Beispiel zu: Mitbestimmung bei Arbeitszeit",
              "qVi": "Nêu một ví dụ thực tế cho: Tham gia quyết định giờ làm",
              "a": "1. „Betriebsrat stimmt Schichtsystem zu.“\n2. „Überstunden nur mit Zustimmung.“\n3. „Urlaubsplan wird mit Betriebsrat abgestimmt.“",
              "aVi": "1. Hội đồng đồng ý hệ thống ca làm.\n2. Chỉ làm thêm khi được đồng ý.\n3. Kế hoạch nghỉ phép được thống nhất với hội đồng.",
              "why": "Ví dụ giúp trả lời câu hỏi tình huống trong thi WiSo.",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Thema 3 – Mitbestimmung bei Kündigung: Welche Inhalte gehören dazu?",
              "qVi": "Tham gia quyết định chấm dứt hợp đồng: gồm những nội dung nào?",
              "a": "1. Zustimmungspflicht\n2. Prüfung der Kündigungsgründe\n3. Schutz vor Willkür",
              "aVi": "1. Yêu cầu sự đồng ý.\n2. Kiểm tra lý do sa thải.\n3. Bảo vệ nhân viên khỏi bị sa thải tùy tiện.",
              "why": "Điểm Theorie trong bảng tổng hợp WiSo (mỗi Punkt có 3 nội dung).",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Nenne ein praktisches Beispiel zu: Mitbestimmung bei Kündigung",
              "qVi": "Nêu một ví dụ thực tế cho: Tham gia quyết định chấm dứt hợp đồng",
              "a": "1. „Kündigung ohne Betriebsrat nicht gültig.“\n2. „Betriebsrat prüft Kündigungsgrund.“\n3. „Mitarbeiter vor ungerechter Kündigung geschützt.“",
              "aVi": "1. Sa thải không có hội đồng thì không hợp lệ.\n2. Hội đồng kiểm tra lý do sa thải.\n3. Nhân viên được bảo vệ khỏi sa thải bất công.",
              "why": "Ví dụ giúp trả lời câu hỏi tình huống trong thi WiSo.",
              "src": "Fach Wiso (Theorie)"
            }
          ],
          "vokabeln": [
            {
              "de": "Rechte des Betriebsrats",
              "vi": "Quyền của hội đồng nhân viên"
            },
            {
              "de": "Aufgaben des Betriebsrats",
              "vi": "Nhiệm vụ của hội đồng nhân viên"
            },
            {
              "de": "Jugend- und Auszubildendenvertretung (JAV)",
              "vi": "Đại diện học viên & thanh niên"
            },
            {
              "de": "Mitbestimmung bei Arbeitszeit",
              "vi": "Tham gia quyết định giờ làm"
            },
            {
              "de": "Mitbestimmung bei Kündigung",
              "vi": "Tham gia quyết định chấm dứt hợp đồng"
            }
          ]
        },
        {
          "id": "wiso-thema-4",
          "icon": "",
          "name": "WiSo Thema 4 · Entwicklung der Arbeitswelt",
          "desc": "Wandel durch Digitalisierung · Strukturwandel in der Gastronomie · Arbeitsmarkt und Berufe · Fachkräftemangel · Lebenslanges Lernen",
          "content": "<h2>WiSo Thema 4 · Entwicklung der Arbeitswelt</h2>\n<div class=\"hint\">Themenüberblick · Quelle: Fach Wiso (Theorie) · 5 Punkte, je 3 Theorie-Inhalte + Beispiele</div>\n<h3>A. Theorie &amp; Beispiele (5 Punkte)</h3>\n<table><tr><th>Punkt</th><th>Theorie</th><th>Beispiel</th></tr>\n<tr><td><b>1. Wandel durch Digitalisierung</b><div class=\'vi-sub\'>Thay đổi do số hóa</div></td><td>1. Neue Technologien einsetzen<div class=\'vi-sub\'>Ứng dụng công nghệ mới.</div><br>2. Online-Bestellungen ermöglichen<div class=\'vi-sub\'>Cho phép đặt hàng online.</div><br>3. Digitale Kommunikation nutzen<div class=\'vi-sub\'>Dùng giao tiếp kỹ thuật số.</div></td><td>1. „Bestellungen per Tablet aufnehmen.“<div class=\'vi-sub\'>Nhận đơn bằng máy tính bảng.</div><br>2. „Kunde bestellt Sandwich über App.“<div class=\'vi-sub\'>Khách đặt bánh mì qua ứng dụng.</div><br>3. „Team kommuniziert per WhatsApp-Gruppe.“<div class=\'vi-sub\'>Nhóm trao đổi qua WhatsApp.</div></td></tr>\n<tr><td><b>2. Strukturwandel in der Gastronomie</b><div class=\'vi-sub\'>Chuyển đổi trong ngành ẩm thực</div></td><td>1. Systemgastronomie wächst<div class=\'vi-sub\'>Ngành ẩm thực hệ thống phát triển.</div><br>2. Klassische Restaurants verändern sich<div class=\'vi-sub\'>Nhà hàng truyền thống thay đổi.</div><br>3. Mehr Lieferdienste<div class=\'vi-sub\'>Dịch vụ giao hàng tăng.</div></td><td>1. „Subway expandiert in vielen Städten.“<div class=\'vi-sub\'>Subway mở rộng ở nhiều thành phố.</div><br>2. „Traditionelles Restaurant bietet auch Takeaway.“<div class=\'vi-sub\'>Nhà hàng truyền thống thêm món mang đi.</div><br>3. „Lieferando bringt Essen nach Hause.“<div class=\'vi-sub\'>Lieferando giao đồ ăn tận nhà.</div></td></tr>\n<tr><td><b>3. Arbeitsmarkt und Berufe</b><div class=\'vi-sub\'>Thị trường lao động &amp; nghề nghiệp</div></td><td>1. Neue Berufsbilder entstehen<div class=\'vi-sub\'>Xuất hiện nghề mới.</div><br>2. Mehr Flexibilität gefordert<div class=\'vi-sub\'>Yêu cầu linh hoạt hơn.</div><br>3. Internationale Arbeitskräfte wichtig<div class=\'vi-sub\'>Lao động quốc tế quan trọng.</div></td><td>1. „Job: Fachkraft für Systemgastronomie.“<div class=\'vi-sub\'>Nghề: Nhân viên ngành ẩm thực hệ thống.</div><br>2. „Mitarbeiter wechseln zwischen Küche und Service.“<div class=\'vi-sub\'>Nhân viên luân chuyển giữa bếp và phục vụ.</div><br>3. „Viele Azubis kommen aus dem Ausland.“<div class=\'vi-sub\'>Nhiều học viên đến từ nước ngoài.</div></td></tr>\n<tr><td><b>4. Fachkräftemangel</b><div class=\'vi-sub\'>Thiếu hụt lao động có tay nghề</div></td><td>1. Ursachen analysieren<div class=\'vi-sub\'>Phân tích nguyên nhân.</div><br>2. Attraktivität der Branche erhöhen<div class=\'vi-sub\'>Tăng sức hấp dẫn ngành.</div><br>3. Azubis fördern<div class=\'vi-sub\'>Đào tạo và hỗ trợ học viên.</div></td><td>1. „Viele verlassen Gastronomie wegen Arbeitszeiten.“<div class=\'vi-sub\'>Nhiều người rời ngành vì giờ làm.</div><br>2. „Betrieb bietet höhere Löhne.“<div class=\'vi-sub\'>Doanh nghiệp trả lương cao hơn.</div><br>3. „Mehr Ausbildungsplätze schaffen.“<div class=\'vi-sub\'>Tạo thêm chỗ học nghề.</div></td></tr>\n<tr><td><b>5. Lebenslanges Lernen</b><div class=\'vi-sub\'>Học tập suốt đời</div></td><td>1. Fortbildungen besuchen<div class=\'vi-sub\'>Tham gia đào tạo nâng cao.</div><br>2. Neue Trends lernen<div class=\'vi-sub\'>Học xu hướng mới.</div><br>3. Anpassung an Veränderungen<div class=\'vi-sub\'>Thích nghi thay đổi.</div></td><td>1. „Kurs über neue Kassensysteme.“<div class=\'vi-sub\'>Khóa học về hệ thống thu ngân mới.</div><br>2. „Seminar über vegane Ernährung.“<div class=\'vi-sub\'>Hội thảo về dinh dưỡng thuần chay.</div><br>3. „Team passt sich an Lieferservice an.“<div class=\'vi-sub\'>Nhóm thích nghi với dịch vụ giao hàng.</div></td></tr>\n</table>\n<h3>B. Wichtige Hinweise – Điểm lưu ý quan trọng</h3>\n<table><tr><th>Deutsch</th><th>Tiếng Việt</th><th>Ghi chú</th></tr>\n<tr><td>Digitalisierung verändert alle Berufe.</td><td>Số hóa thay đổi mọi ngành nghề.</td><td>Neue Kassensysteme, Online-Bestellungen. Hệ thống thu ngân mới, đặt hàng online.</td></tr>\n<tr><td>Strukturwandel betrifft Gastronomie stark.</td><td>Ngành ẩm thực chịu tác động lớn của chuyển đổi.</td><td>Mehr Systemgastronomie, mehr Lieferdienste. Ẩm thực hệ thống phát triển, dịch vụ giao hàng tăng.</td></tr>\n<tr><td>Flexibilität ist Voraussetzung auf dem Arbeitsmarkt.</td><td>Linh hoạt là điều kiện tiên quyết trên thị trường lao động.</td><td>Mitarbeiter wechseln zwischen Küche &amp; Service. Nhân viên có thể luân chuyển giữa bếp và phục vụ.</td></tr>\n<tr><td>Fachkräftemangel ist eine große Herausforderung.</td><td>Thiếu hụt lao động có tay nghề là thách thức lớn.</td><td>Viele verlassen Gastronomie wegen Arbeitszeiten. Nhiều người rời ngành vì giờ làm.</td></tr>\n<tr><td>Lebenslanges Lernen ist Pflicht, nicht Wahl.</td><td>Học tập suốt đời là bắt buộc, không phải tùy chọn.</td><td>Fortbildungen über neue Trends (z. B. vegane Ernährung). Đào tạo nâng cao về xu hướng mới (ví dụ: ăn chay).</td></tr>\n<tr><td>Internationale Arbeitskräfte sind notwendig.</td><td>Lao động quốc tế là cần thiết.</td><td>Viele Azubis kommen aus dem Ausland. Nhiều học viên đến từ nước ngoài.</td></tr>\n<tr><td>Anpassungsfähigkeit entscheidet über Erfolg.</td><td>Khả năng thích nghi quyết định thành công.</td><td>Betriebe, die Trends anpassen, bleiben wettbewerbsfähig. Doanh nghiệp nào thích nghi xu hướng thì duy trì cạnh tranh.</td></tr>\n</table>",
          "qa": [
            {
              "q": "Thema 4 – Wandel durch Digitalisierung: Welche Inhalte gehören dazu?",
              "qVi": "Thay đổi do số hóa: gồm những nội dung nào?",
              "a": "1. Neue Technologien einsetzen\n2. Online-Bestellungen ermöglichen\n3. Digitale Kommunikation nutzen",
              "aVi": "1. Ứng dụng công nghệ mới.\n2. Cho phép đặt hàng online.\n3. Dùng giao tiếp kỹ thuật số.",
              "why": "Điểm Theorie trong bảng tổng hợp WiSo (mỗi Punkt có 3 nội dung).",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Nenne ein praktisches Beispiel zu: Wandel durch Digitalisierung",
              "qVi": "Nêu một ví dụ thực tế cho: Thay đổi do số hóa",
              "a": "1. „Bestellungen per Tablet aufnehmen.“\n2. „Kunde bestellt Sandwich über App.“\n3. „Team kommuniziert per WhatsApp-Gruppe.“",
              "aVi": "1. Nhận đơn bằng máy tính bảng.\n2. Khách đặt bánh mì qua ứng dụng.\n3. Nhóm trao đổi qua WhatsApp.",
              "why": "Ví dụ giúp trả lời câu hỏi tình huống trong thi WiSo.",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Thema 4 – Strukturwandel in der Gastronomie: Welche Inhalte gehören dazu?",
              "qVi": "Chuyển đổi trong ngành ẩm thực: gồm những nội dung nào?",
              "a": "1. Systemgastronomie wächst\n2. Klassische Restaurants verändern sich\n3. Mehr Lieferdienste",
              "aVi": "1. Ngành ẩm thực hệ thống phát triển.\n2. Nhà hàng truyền thống thay đổi.\n3. Dịch vụ giao hàng tăng.",
              "why": "Điểm Theorie trong bảng tổng hợp WiSo (mỗi Punkt có 3 nội dung).",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Nenne ein praktisches Beispiel zu: Strukturwandel in der Gastronomie",
              "qVi": "Nêu một ví dụ thực tế cho: Chuyển đổi trong ngành ẩm thực",
              "a": "1. „Subway expandiert in vielen Städten.“\n2. „Traditionelles Restaurant bietet auch Takeaway.“\n3. „Lieferando bringt Essen nach Hause.“",
              "aVi": "1. Subway mở rộng ở nhiều thành phố.\n2. Nhà hàng truyền thống thêm món mang đi.\n3. Lieferando giao đồ ăn tận nhà.",
              "why": "Ví dụ giúp trả lời câu hỏi tình huống trong thi WiSo.",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Thema 4 – Arbeitsmarkt und Berufe: Welche Inhalte gehören dazu?",
              "qVi": "Thị trường lao động & nghề nghiệp: gồm những nội dung nào?",
              "a": "1. Neue Berufsbilder entstehen\n2. Mehr Flexibilität gefordert\n3. Internationale Arbeitskräfte wichtig",
              "aVi": "1. Xuất hiện nghề mới.\n2. Yêu cầu linh hoạt hơn.\n3. Lao động quốc tế quan trọng.",
              "why": "Điểm Theorie trong bảng tổng hợp WiSo (mỗi Punkt có 3 nội dung).",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Nenne ein praktisches Beispiel zu: Arbeitsmarkt und Berufe",
              "qVi": "Nêu một ví dụ thực tế cho: Thị trường lao động & nghề nghiệp",
              "a": "1. „Job: Fachkraft für Systemgastronomie.“\n2. „Mitarbeiter wechseln zwischen Küche und Service.“\n3. „Viele Azubis kommen aus dem Ausland.“",
              "aVi": "1. Nghề: Nhân viên ngành ẩm thực hệ thống.\n2. Nhân viên luân chuyển giữa bếp và phục vụ.\n3. Nhiều học viên đến từ nước ngoài.",
              "why": "Ví dụ giúp trả lời câu hỏi tình huống trong thi WiSo.",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Thema 4 – Fachkräftemangel: Welche Inhalte gehören dazu?",
              "qVi": "Thiếu hụt lao động có tay nghề: gồm những nội dung nào?",
              "a": "1. Ursachen analysieren\n2. Attraktivität der Branche erhöhen\n3. Azubis fördern",
              "aVi": "1. Phân tích nguyên nhân.\n2. Tăng sức hấp dẫn ngành.\n3. Đào tạo và hỗ trợ học viên.",
              "why": "Điểm Theorie trong bảng tổng hợp WiSo (mỗi Punkt có 3 nội dung).",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Nenne ein praktisches Beispiel zu: Fachkräftemangel",
              "qVi": "Nêu một ví dụ thực tế cho: Thiếu hụt lao động có tay nghề",
              "a": "1. „Viele verlassen Gastronomie wegen Arbeitszeiten.“\n2. „Betrieb bietet höhere Löhne.“\n3. „Mehr Ausbildungsplätze schaffen.“",
              "aVi": "1. Nhiều người rời ngành vì giờ làm.\n2. Doanh nghiệp trả lương cao hơn.\n3. Tạo thêm chỗ học nghề.",
              "why": "Ví dụ giúp trả lời câu hỏi tình huống trong thi WiSo.",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Thema 4 – Lebenslanges Lernen: Welche Inhalte gehören dazu?",
              "qVi": "Học tập suốt đời: gồm những nội dung nào?",
              "a": "1. Fortbildungen besuchen\n2. Neue Trends lernen\n3. Anpassung an Veränderungen",
              "aVi": "1. Tham gia đào tạo nâng cao.\n2. Học xu hướng mới.\n3. Thích nghi thay đổi.",
              "why": "Điểm Theorie trong bảng tổng hợp WiSo (mỗi Punkt có 3 nội dung).",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Nenne ein praktisches Beispiel zu: Lebenslanges Lernen",
              "qVi": "Nêu một ví dụ thực tế cho: Học tập suốt đời",
              "a": "1. „Kurs über neue Kassensysteme.“\n2. „Seminar über vegane Ernährung.“\n3. „Team passt sich an Lieferservice an.“",
              "aVi": "1. Khóa học về hệ thống thu ngân mới.\n2. Hội thảo về dinh dưỡng thuần chay.\n3. Nhóm thích nghi với dịch vụ giao hàng.",
              "why": "Ví dụ giúp trả lời câu hỏi tình huống trong thi WiSo.",
              "src": "Fach Wiso (Theorie)"
            }
          ],
          "vokabeln": [
            {
              "de": "Wandel durch Digitalisierung",
              "vi": "Thay đổi do số hóa"
            },
            {
              "de": "Strukturwandel in der Gastronomie",
              "vi": "Chuyển đổi trong ngành ẩm thực"
            },
            {
              "de": "Arbeitsmarkt und Berufe",
              "vi": "Thị trường lao động & nghề nghiệp"
            },
            {
              "de": "Fachkräftemangel",
              "vi": "Thiếu hụt lao động có tay nghề"
            },
            {
              "de": "Lebenslanges Lernen",
              "vi": "Học tập suốt đời"
            }
          ]
        },
        {
          "id": "wiso-thema-5",
          "icon": "",
          "name": "WiSo Thema 5 · Sozialversicherung",
          "desc": "Krankenversicherung · Rentenversicherung · Arbeitslosenversicherung · Pflegeversicherung · Unfallversicherung",
          "content": "<h2>WiSo Thema 5 · Sozialversicherung</h2>\n<div class=\"hint\">Themenüberblick · Quelle: Fach Wiso (Theorie) · 5 Punkte, je 3 Theorie-Inhalte + Beispiele</div>\n<h3>A. Theorie &amp; Beispiele (5 Punkte)</h3>\n<table><tr><th>Punkt</th><th>Theorie</th><th>Beispiel</th></tr>\n<tr><td><b>1. Krankenversicherung</b><div class=\'vi-sub\'>Bảo hiểm y tế</div></td><td>1. Kostenübernahme bei Arztbesuch<div class=\'vi-sub\'>Chi trả khi đi khám bác sĩ.</div><br>2. Medikamente und Behandlungen<div class=\'vi-sub\'>Thuốc và điều trị được hỗ trợ.</div><br>3. Pflichtversicherung für Arbeitnehmer<div class=\'vi-sub\'>Bảo hiểm bắt buộc cho người lao động.</div></td><td>1. „Azubi geht zum Arzt, Krankenkasse zahlt.“<div class=\'vi-sub\'>Học viên đi khám, bảo hiểm y tế chi trả.</div><br>2. „Medizin für Grippe wird übernommen.“<div class=\'vi-sub\'>Thuốc cảm cúm được hỗ trợ.</div><br>3. „Azubi wird automatisch versichert.“<div class=\'vi-sub\'>Học viên được tự động tham gia bảo hiểm.</div></td></tr>\n<tr><td><b>2. Rentenversicherung</b><div class=\'vi-sub\'>Bảo hiểm hưu trí</div></td><td>1. Beiträge während der Arbeit<div class=\'vi-sub\'>Đóng góp trong thời gian làm việc.</div><br>2. Anspruch im Alter<div class=\'vi-sub\'>Quyền nhận lương hưu khi về già.</div><br>3. Solidarprinzip<div class=\'vi-sub\'>Nguyên tắc đoàn kết (thế hệ trẻ nuôi thế hệ già).</div></td><td>1. „Monatlich wird Beitrag vom Lohn abgezogen.“<div class=\'vi-sub\'>Hàng tháng trích lương để đóng.</div><br>2. „Nach 40 Jahren Arbeit → Rente.“<div class=\'vi-sub\'>Sau 40 năm làm việc → nhận lương hưu.</div><br>3. „Junge zahlen für die Alten.“<div class=\'vi-sub\'>Người trẻ đóng cho người già.</div></td></tr>\n<tr><td><b>3. Arbeitslosenversicherung</b><div class=\'vi-sub\'>Bảo hiểm thất nghiệp</div></td><td>1. Unterstützung bei Jobverlust<div class=\'vi-sub\'>Hỗ trợ khi mất việc.</div><br>2. Arbeitslosengeld I<div class=\'vi-sub\'>Tiền trợ cấp thất nghiệp loại I.</div><br>3. Vermittlung durch Arbeitsagentur<div class=\'vi-sub\'>Giới thiệu việc làm qua cơ quan lao động.</div></td><td>1. „Mitarbeiter verliert Job → ALG I.“<div class=\'vi-sub\'>Nhân viên mất việc → nhận trợ cấp I.</div><br>2. „Höhe abhängig vom letzten Gehalt.“<div class=\'vi-sub\'>Số tiền phụ thuộc vào lương cũ.</div><br>3. „Agentur hilft bei Jobsuche.“<div class=\'vi-sub\'>Cơ quan lao động hỗ trợ tìm việc.</div></td></tr>\n<tr><td><b>4. Pflegeversicherung</b><div class=\'vi-sub\'>Bảo hiểm chăm sóc</div></td><td>1. Unterstützung bei Pflegebedürftigkeit<div class=\'vi-sub\'>Hỗ trợ khi cần chăm sóc.</div><br>2. Pflegestufen definieren Leistungen<div class=\'vi-sub\'>Mức độ chăm sóc quyết định quyền lợi.</div><br>3. Entlastung für Angehörige<div class=\'vi-sub\'>Giảm gánh nặng cho gia đình.</div></td><td>1. „Alter Mensch bekommt Pflegegeld.“<div class=\'vi-sub\'>Người già nhận tiền chăm sóc.</div><br>2. „Pflegestufe 3 = mehr Unterstützung.“<div class=\'vi-sub\'>Mức chăm sóc 3 = nhiều hỗ trợ hơn.</div><br>3. „Familie wird finanziell entlastet.“<div class=\'vi-sub\'>Gia đình được giảm gánh nặng tài chính.</div></td></tr>\n<tr><td><b>5. Unfallversicherung</b><div class=\'vi-sub\'>Bảo hiểm tai nạn</div></td><td>1. Schutz bei Arbeitsunfällen<div class=\'vi-sub\'>Bảo vệ khi tai nạn lao động.</div><br>2. Wegeunfälle eingeschlossen<div class=\'vi-sub\'>Bao gồm cả tai nạn trên đường đi làm.</div><br>3. Finanzielle Absicherung<div class=\'vi-sub\'>Đảm bảo tài chính khi bị tai nạn.</div></td><td>1. „Azubi verletzt sich in Küche, Versicherung zahlt.“<div class=\'vi-sub\'>Học viên bị thương trong bếp, bảo hiểm chi trả.</div><br>2. „Unfall auf dem Arbeitsweg = versichert.“<div class=\'vi-sub\'>Tai nạn trên đường đi làm = được bảo hiểm.</div><br>3. „Kosten für Reha übernommen.“<div class=\'vi-sub\'>Chi phí phục hồi chức năng được chi trả.</div></td></tr>\n</table>\n<h3>B. Wichtige Hinweise – Điểm lưu ý quan trọng</h3>\n<table><tr><th>Deutsch</th><th>Tiếng Việt</th><th>Ghi chú</th></tr>\n<tr><td>Sozialversicherung besteht aus 5 Säulen.</td><td>Bảo hiểm xã hội có 5 trụ cột.</td><td>Kranken-, Renten-, Arbeitslosen-, Pflege-, Unfallversicherung. Gồm: Y tế, hưu trí, thất nghiệp, chăm sóc, tai nạn.</td></tr>\n<tr><td>Jede Versicherung schützt vor speziellen Risiken.</td><td>Mỗi loại bảo hiểm bảo vệ trước một rủi ro riêng.</td><td>Beispiel: Krankenversicherung bei Krankheit. Ví dụ: bảo hiểm y tế khi ốm bệnh.</td></tr>\n<tr><td>Beiträge werden automatisch vom Lohn abgezogen.</td><td>Khoản đóng được tự động trừ từ lương.</td><td>Arbeitgeber + Arbeitnehmer zahlen zusammen. Người lao động + chủ doanh nghiệp cùng đóng.</td></tr>\n<tr><td>Versicherung ist Pflicht für alle Arbeitnehmer.</td><td>Bảo hiểm là bắt buộc cho mọi người lao động.</td><td>Ausnahme: bestimmte Minijobs. Ngoại lệ: một số việc làm nhỏ (Minijob).</td></tr>\n<tr><td>Ohne Versicherung → keine finanzielle Sicherheit.</td><td>Không có bảo hiểm → không có an toàn tài chính.</td><td>Hohe Kosten bei Unfall oder Krankheit. Chi phí cao khi tai nạn hoặc bệnh tật.</td></tr>\n<tr><td>Arbeitgeber und Arbeitnehmer teilen Beiträge.</td><td>Người lao động và chủ doanh nghiệp cùng đóng.</td><td>Ca. 50:50, je nach Versicherung. Khoảng 50:50, tùy loại bảo hiểm.</td></tr>\n<tr><td>Kenntnisse der Sozialversicherung sind prüfungsrelevant.</td><td>Hiểu biết về bảo hiểm xã hội rất quan trọng trong kỳ thi.</td><td>Fragen dazu kommen oft in WISO-Prüfung. Các câu hỏi này thường xuất hiện trong kỳ thi WISO.</td></tr>\n</table>",
          "qa": [
            {
              "q": "Thema 5 – Krankenversicherung: Welche Inhalte gehören dazu?",
              "qVi": "Bảo hiểm y tế: gồm những nội dung nào?",
              "a": "1. Kostenübernahme bei Arztbesuch\n2. Medikamente und Behandlungen\n3. Pflichtversicherung für Arbeitnehmer",
              "aVi": "1. Chi trả khi đi khám bác sĩ.\n2. Thuốc và điều trị được hỗ trợ.\n3. Bảo hiểm bắt buộc cho người lao động.",
              "why": "Điểm Theorie trong bảng tổng hợp WiSo (mỗi Punkt có 3 nội dung).",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Nenne ein praktisches Beispiel zu: Krankenversicherung",
              "qVi": "Nêu một ví dụ thực tế cho: Bảo hiểm y tế",
              "a": "1. „Azubi geht zum Arzt, Krankenkasse zahlt.“\n2. „Medizin für Grippe wird übernommen.“\n3. „Azubi wird automatisch versichert.“",
              "aVi": "1. Học viên đi khám, bảo hiểm y tế chi trả.\n2. Thuốc cảm cúm được hỗ trợ.\n3. Học viên được tự động tham gia bảo hiểm.",
              "why": "Ví dụ giúp trả lời câu hỏi tình huống trong thi WiSo.",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Thema 5 – Rentenversicherung: Welche Inhalte gehören dazu?",
              "qVi": "Bảo hiểm hưu trí: gồm những nội dung nào?",
              "a": "1. Beiträge während der Arbeit\n2. Anspruch im Alter\n3. Solidarprinzip",
              "aVi": "1. Đóng góp trong thời gian làm việc.\n2. Quyền nhận lương hưu khi về già.\n3. Nguyên tắc đoàn kết (thế hệ trẻ nuôi thế hệ già).",
              "why": "Điểm Theorie trong bảng tổng hợp WiSo (mỗi Punkt có 3 nội dung).",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Nenne ein praktisches Beispiel zu: Rentenversicherung",
              "qVi": "Nêu một ví dụ thực tế cho: Bảo hiểm hưu trí",
              "a": "1. „Monatlich wird Beitrag vom Lohn abgezogen.“\n2. „Nach 40 Jahren Arbeit → Rente.“\n3. „Junge zahlen für die Alten.“",
              "aVi": "1. Hàng tháng trích lương để đóng.\n2. Sau 40 năm làm việc → nhận lương hưu.\n3. Người trẻ đóng cho người già.",
              "why": "Ví dụ giúp trả lời câu hỏi tình huống trong thi WiSo.",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Thema 5 – Arbeitslosenversicherung: Welche Inhalte gehören dazu?",
              "qVi": "Bảo hiểm thất nghiệp: gồm những nội dung nào?",
              "a": "1. Unterstützung bei Jobverlust\n2. Arbeitslosengeld I\n3. Vermittlung durch Arbeitsagentur",
              "aVi": "1. Hỗ trợ khi mất việc.\n2. Tiền trợ cấp thất nghiệp loại I.\n3. Giới thiệu việc làm qua cơ quan lao động.",
              "why": "Điểm Theorie trong bảng tổng hợp WiSo (mỗi Punkt có 3 nội dung).",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Nenne ein praktisches Beispiel zu: Arbeitslosenversicherung",
              "qVi": "Nêu một ví dụ thực tế cho: Bảo hiểm thất nghiệp",
              "a": "1. „Mitarbeiter verliert Job → ALG I.“\n2. „Höhe abhängig vom letzten Gehalt.“\n3. „Agentur hilft bei Jobsuche.“",
              "aVi": "1. Nhân viên mất việc → nhận trợ cấp I.\n2. Số tiền phụ thuộc vào lương cũ.\n3. Cơ quan lao động hỗ trợ tìm việc.",
              "why": "Ví dụ giúp trả lời câu hỏi tình huống trong thi WiSo.",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Thema 5 – Pflegeversicherung: Welche Inhalte gehören dazu?",
              "qVi": "Bảo hiểm chăm sóc: gồm những nội dung nào?",
              "a": "1. Unterstützung bei Pflegebedürftigkeit\n2. Pflegestufen definieren Leistungen\n3. Entlastung für Angehörige",
              "aVi": "1. Hỗ trợ khi cần chăm sóc.\n2. Mức độ chăm sóc quyết định quyền lợi.\n3. Giảm gánh nặng cho gia đình.",
              "why": "Điểm Theorie trong bảng tổng hợp WiSo (mỗi Punkt có 3 nội dung).",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Nenne ein praktisches Beispiel zu: Pflegeversicherung",
              "qVi": "Nêu một ví dụ thực tế cho: Bảo hiểm chăm sóc",
              "a": "1. „Alter Mensch bekommt Pflegegeld.“\n2. „Pflegestufe 3 = mehr Unterstützung.“\n3. „Familie wird finanziell entlastet.“",
              "aVi": "1. Người già nhận tiền chăm sóc.\n2. Mức chăm sóc 3 = nhiều hỗ trợ hơn.\n3. Gia đình được giảm gánh nặng tài chính.",
              "why": "Ví dụ giúp trả lời câu hỏi tình huống trong thi WiSo.",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Thema 5 – Unfallversicherung: Welche Inhalte gehören dazu?",
              "qVi": "Bảo hiểm tai nạn: gồm những nội dung nào?",
              "a": "1. Schutz bei Arbeitsunfällen\n2. Wegeunfälle eingeschlossen\n3. Finanzielle Absicherung",
              "aVi": "1. Bảo vệ khi tai nạn lao động.\n2. Bao gồm cả tai nạn trên đường đi làm.\n3. Đảm bảo tài chính khi bị tai nạn.",
              "why": "Điểm Theorie trong bảng tổng hợp WiSo (mỗi Punkt có 3 nội dung).",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Nenne ein praktisches Beispiel zu: Unfallversicherung",
              "qVi": "Nêu một ví dụ thực tế cho: Bảo hiểm tai nạn",
              "a": "1. „Azubi verletzt sich in Küche, Versicherung zahlt.“\n2. „Unfall auf dem Arbeitsweg = versichert.“\n3. „Kosten für Reha übernommen.“",
              "aVi": "1. Học viên bị thương trong bếp, bảo hiểm chi trả.\n2. Tai nạn trên đường đi làm = được bảo hiểm.\n3. Chi phí phục hồi chức năng được chi trả.",
              "why": "Ví dụ giúp trả lời câu hỏi tình huống trong thi WiSo.",
              "src": "Fach Wiso (Theorie)"
            }
          ],
          "vokabeln": [
            {
              "de": "Krankenversicherung",
              "vi": "Bảo hiểm y tế"
            },
            {
              "de": "Rentenversicherung",
              "vi": "Bảo hiểm hưu trí"
            },
            {
              "de": "Arbeitslosenversicherung",
              "vi": "Bảo hiểm thất nghiệp"
            },
            {
              "de": "Pflegeversicherung",
              "vi": "Bảo hiểm chăm sóc"
            },
            {
              "de": "Unfallversicherung",
              "vi": "Bảo hiểm tai nạn"
            }
          ]
        },
        {
          "id": "wiso-thema-6",
          "icon": "",
          "name": "WiSo Thema 6 · Soziale Sicherung, Berufs- und Lebensplanung",
          "desc": "Private Vorsorge · Betriebliche Altersvorsorge · Weiterbildung · Karriereplanung · Work-Life-Balance",
          "content": "<h2>WiSo Thema 6 · Soziale Sicherung, Berufs- und Lebensplanung</h2>\n<div class=\"hint\">Themenüberblick · Quelle: Fach Wiso (Theorie) · 5 Punkte, je 3 Theorie-Inhalte + Beispiele</div>\n<h3>A. Theorie &amp; Beispiele (5 Punkte)</h3>\n<table><tr><th>Punkt</th><th>Theorie</th><th>Beispiel</th></tr>\n<tr><td><b>1. Private Vorsorge</b><div class=\'vi-sub\'>Dự phòng cá nhân</div></td><td>1. Zusatzversicherung abschließen<div class=\'vi-sub\'>Tham gia bảo hiểm bổ sung.</div><br>2. Sparpläne einrichten<div class=\'vi-sub\'>Thiết lập kế hoạch tiết kiệm.</div><br>3. Eigenverantwortung zeigen<div class=\'vi-sub\'>Thể hiện trách nhiệm cá nhân.</div></td><td>1. „Azubi schließt Zahnzusatzversicherung ab.“<div class=\'vi-sub\'>Học viên mua bảo hiểm nha khoa bổ sung.</div><br>2. „Monatlich 50 € sparen.“<div class=\'vi-sub\'>Tiết kiệm 50 € mỗi tháng.</div><br>3. „Mitarbeiter legt Geld für Notfälle zurück.“<div class=\'vi-sub\'>Nhân viên để dành tiền cho tình huống khẩn cấp.</div></td></tr>\n<tr><td><b>2. Betriebliche Altersvorsorge</b><div class=\'vi-sub\'>Lương hưu doanh nghiệp</div></td><td>1. Arbeitgeber bietet Zusatzrente<div class=\'vi-sub\'>Chủ doanh nghiệp hỗ trợ lương hưu thêm.</div><br>2. Steuervorteile nutzen<div class=\'vi-sub\'>Hưởng lợi về thuế.</div><br>3. Langfristige Sicherheit<div class=\'vi-sub\'>Đảm bảo lâu dài.</div></td><td>1. „Firma zahlt in Rentenkasse ein.“<div class=\'vi-sub\'>Công ty đóng góp vào quỹ hưu.</div><br>2. „Beiträge steuerlich absetzbar.“<div class=\'vi-sub\'>Khoản đóng được khấu trừ thuế.</div><br>3. „Azubi baut Zusatzrente auf.“<div class=\'vi-sub\'>Học viên tích lũy lương hưu bổ sung.</div></td></tr>\n<tr><td><b>3. Weiterbildung</b><div class=\'vi-sub\'>Đào tạo nâng cao</div></td><td>1. Fachliche Kurse besuchen<div class=\'vi-sub\'>Tham gia khóa chuyên môn.</div><br>2. Soft Skills entwickeln<div class=\'vi-sub\'>Phát triển kỹ năng mềm.</div><br>3. Lebenslanges Lernen fördern<div class=\'vi-sub\'>Khuyến khích học suốt đời.</div></td><td>1. „Azubi besucht Hygiene-Seminar.“<div class=\'vi-sub\'>Học viên tham dự hội thảo vệ sinh.</div><br>2. „Mitarbeiter trainiert Kommunikation.“<div class=\'vi-sub\'>Nhân viên luyện kỹ năng giao tiếp.</div><br>3. „Team nimmt an Digital-Kurs teil.“<div class=\'vi-sub\'>Nhóm tham gia khóa học số hóa.</div></td></tr>\n<tr><td><b>4. Karriereplanung</b><div class=\'vi-sub\'>Lập kế hoạch nghề nghiệp</div></td><td>1. Ziele definieren<div class=\'vi-sub\'>Xác định mục tiêu.</div><br>2. Fortbildungsschritte planen<div class=\'vi-sub\'>Lập kế hoạch học tập tiếp theo.</div><br>3. Mentoren nutzen<div class=\'vi-sub\'>Nhờ sự cố vấn từ người đi trước.</div></td><td>1. „Azubi möchte später Filialleiter werden.“<div class=\'vi-sub\'>Học viên muốn trở thành quản lý chi nhánh.</div><br>2. „Besuch eines Meisterkurses geplant.“<div class=\'vi-sub\'>Dự định tham gia khóa học Meister.</div><br>3. „Azubi fragt Ausbilder um Rat.“<div class=\'vi-sub\'>Học viên xin lời khuyên từ người đào tạo.</div></td></tr>\n<tr><td><b>5. Work-Life-Balance</b><div class=\'vi-sub\'>Cân bằng công việc &amp; cuộc sống</div></td><td>1. Gesundheit erhalten<div class=\'vi-sub\'>Duy trì sức khỏe.</div><br>2. Freizeit gestalten<div class=\'vi-sub\'>Tận hưởng thời gian rảnh.</div><br>3. Stress abbauen<div class=\'vi-sub\'>Giảm căng thẳng.</div></td><td>1. „Mitarbeiter treibt regelmäßig Sport.“<div class=\'vi-sub\'>Nhân viên tập thể dục thường xuyên.</div><br>2. „Azubi geht ins Kino am Wochenende.“<div class=\'vi-sub\'>Học viên đi xem phim cuối tuần.</div><br>3. „Team macht gemeinsame Ausflüge.“<div class=\'vi-sub\'>Nhóm tổ chức đi chơi chung.</div></td></tr>\n</table>\n<h3>B. Wichtige Hinweise – Điểm lưu ý quan trọng</h3>\n<table><tr><th>Deutsch</th><th>Tiếng Việt</th><th>Ghi chú</th></tr>\n<tr><td>Soziale Sicherung ist mehr als Pflichtversicherung.</td><td>An sinh xã hội không chỉ là bảo hiểm bắt buộc.</td><td>Auch private Vorsorge zählt. Bao gồm cả dự phòng cá nhân.</td></tr>\n<tr><td>Betriebliche Altersvorsorge lohnt sich langfristig.</td><td>Lương hưu doanh nghiệp có lợi về lâu dài.</td><td>Steuervorteile + zusätzliche Rente. Vừa giảm thuế vừa có thêm hưu trí.</td></tr>\n<tr><td>Weiterbildung erhöht Karrierechancen.</td><td>Đào tạo nâng cao giúp tăng cơ hội nghề nghiệp.</td><td>Häufiges Prüfungsthema in WISO. Thường xuất hiện trong đề thi WISO.</td></tr>\n<tr><td>Klare Karriereplanung motiviert.</td><td>Lập kế hoạch nghề nghiệp rõ ràng tạo động lực.</td><td>Azubis sollen Ziele formulieren. Học viên nên xác định mục tiêu.</td></tr>\n<tr><td>Work-Life-Balance ist Voraussetzung für Gesundheit.</td><td>Cân bằng công việc &amp; cuộc sống là điều kiện để khỏe mạnh.</td><td>Stressabbau = weniger Krankmeldungen. Giảm stress → ít nghỉ bệnh hơn.</td></tr>\n<tr><td>Arbeitgeber profitieren von motivierten Mitarbeitern.</td><td>Doanh nghiệp hưởng lợi khi nhân viên có động lực.</td><td>Weniger Fluktuation, mehr Produktivität. Ít nghỉ việc, năng suất cao hơn.</td></tr>\n<tr><td>Sozial- und Lebensplanung gehört ins Prüfungsthema.</td><td>An sinh &amp; kế hoạch cuộc sống nằm trong nội dung thi.</td><td>Fragen oft in mündlicher Prüfung. Thường có trong phần thi nói.</td></tr>\n</table>",
          "qa": [
            {
              "q": "Thema 6 – Private Vorsorge: Welche Inhalte gehören dazu?",
              "qVi": "Dự phòng cá nhân: gồm những nội dung nào?",
              "a": "1. Zusatzversicherung abschließen\n2. Sparpläne einrichten\n3. Eigenverantwortung zeigen",
              "aVi": "1. Tham gia bảo hiểm bổ sung.\n2. Thiết lập kế hoạch tiết kiệm.\n3. Thể hiện trách nhiệm cá nhân.",
              "why": "Điểm Theorie trong bảng tổng hợp WiSo (mỗi Punkt có 3 nội dung).",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Nenne ein praktisches Beispiel zu: Private Vorsorge",
              "qVi": "Nêu một ví dụ thực tế cho: Dự phòng cá nhân",
              "a": "1. „Azubi schließt Zahnzusatzversicherung ab.“\n2. „Monatlich 50 € sparen.“\n3. „Mitarbeiter legt Geld für Notfälle zurück.“",
              "aVi": "1. Học viên mua bảo hiểm nha khoa bổ sung.\n2. Tiết kiệm 50 € mỗi tháng.\n3. Nhân viên để dành tiền cho tình huống khẩn cấp.",
              "why": "Ví dụ giúp trả lời câu hỏi tình huống trong thi WiSo.",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Thema 6 – Betriebliche Altersvorsorge: Welche Inhalte gehören dazu?",
              "qVi": "Lương hưu doanh nghiệp: gồm những nội dung nào?",
              "a": "1. Arbeitgeber bietet Zusatzrente\n2. Steuervorteile nutzen\n3. Langfristige Sicherheit",
              "aVi": "1. Chủ doanh nghiệp hỗ trợ lương hưu thêm.\n2. Hưởng lợi về thuế.\n3. Đảm bảo lâu dài.",
              "why": "Điểm Theorie trong bảng tổng hợp WiSo (mỗi Punkt có 3 nội dung).",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Nenne ein praktisches Beispiel zu: Betriebliche Altersvorsorge",
              "qVi": "Nêu một ví dụ thực tế cho: Lương hưu doanh nghiệp",
              "a": "1. „Firma zahlt in Rentenkasse ein.“\n2. „Beiträge steuerlich absetzbar.“\n3. „Azubi baut Zusatzrente auf.“",
              "aVi": "1. Công ty đóng góp vào quỹ hưu.\n2. Khoản đóng được khấu trừ thuế.\n3. Học viên tích lũy lương hưu bổ sung.",
              "why": "Ví dụ giúp trả lời câu hỏi tình huống trong thi WiSo.",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Thema 6 – Weiterbildung: Welche Inhalte gehören dazu?",
              "qVi": "Đào tạo nâng cao: gồm những nội dung nào?",
              "a": "1. Fachliche Kurse besuchen\n2. Soft Skills entwickeln\n3. Lebenslanges Lernen fördern",
              "aVi": "1. Tham gia khóa chuyên môn.\n2. Phát triển kỹ năng mềm.\n3. Khuyến khích học suốt đời.",
              "why": "Điểm Theorie trong bảng tổng hợp WiSo (mỗi Punkt có 3 nội dung).",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Nenne ein praktisches Beispiel zu: Weiterbildung",
              "qVi": "Nêu một ví dụ thực tế cho: Đào tạo nâng cao",
              "a": "1. „Azubi besucht Hygiene-Seminar.“\n2. „Mitarbeiter trainiert Kommunikation.“\n3. „Team nimmt an Digital-Kurs teil.“",
              "aVi": "1. Học viên tham dự hội thảo vệ sinh.\n2. Nhân viên luyện kỹ năng giao tiếp.\n3. Nhóm tham gia khóa học số hóa.",
              "why": "Ví dụ giúp trả lời câu hỏi tình huống trong thi WiSo.",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Thema 6 – Karriereplanung: Welche Inhalte gehören dazu?",
              "qVi": "Lập kế hoạch nghề nghiệp: gồm những nội dung nào?",
              "a": "1. Ziele definieren\n2. Fortbildungsschritte planen\n3. Mentoren nutzen",
              "aVi": "1. Xác định mục tiêu.\n2. Lập kế hoạch học tập tiếp theo.\n3. Nhờ sự cố vấn từ người đi trước.",
              "why": "Điểm Theorie trong bảng tổng hợp WiSo (mỗi Punkt có 3 nội dung).",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Nenne ein praktisches Beispiel zu: Karriereplanung",
              "qVi": "Nêu một ví dụ thực tế cho: Lập kế hoạch nghề nghiệp",
              "a": "1. „Azubi möchte später Filialleiter werden.“\n2. „Besuch eines Meisterkurses geplant.“\n3. „Azubi fragt Ausbilder um Rat.“",
              "aVi": "1. Học viên muốn trở thành quản lý chi nhánh.\n2. Dự định tham gia khóa học Meister.\n3. Học viên xin lời khuyên từ người đào tạo.",
              "why": "Ví dụ giúp trả lời câu hỏi tình huống trong thi WiSo.",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Thema 6 – Work-Life-Balance: Welche Inhalte gehören dazu?",
              "qVi": "Cân bằng công việc & cuộc sống: gồm những nội dung nào?",
              "a": "1. Gesundheit erhalten\n2. Freizeit gestalten\n3. Stress abbauen",
              "aVi": "1. Duy trì sức khỏe.\n2. Tận hưởng thời gian rảnh.\n3. Giảm căng thẳng.",
              "why": "Điểm Theorie trong bảng tổng hợp WiSo (mỗi Punkt có 3 nội dung).",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Nenne ein praktisches Beispiel zu: Work-Life-Balance",
              "qVi": "Nêu một ví dụ thực tế cho: Cân bằng công việc & cuộc sống",
              "a": "1. „Mitarbeiter treibt regelmäßig Sport.“\n2. „Azubi geht ins Kino am Wochenende.“\n3. „Team macht gemeinsame Ausflüge.“",
              "aVi": "1. Nhân viên tập thể dục thường xuyên.\n2. Học viên đi xem phim cuối tuần.\n3. Nhóm tổ chức đi chơi chung.",
              "why": "Ví dụ giúp trả lời câu hỏi tình huống trong thi WiSo.",
              "src": "Fach Wiso (Theorie)"
            }
          ],
          "vokabeln": [
            {
              "de": "Private Vorsorge",
              "vi": "Dự phòng cá nhân"
            },
            {
              "de": "Betriebliche Altersvorsorge",
              "vi": "Lương hưu doanh nghiệp"
            },
            {
              "de": "Weiterbildung",
              "vi": "Đào tạo nâng cao"
            },
            {
              "de": "Karriereplanung",
              "vi": "Lập kế hoạch nghề nghiệp"
            },
            {
              "de": "Work-Life-Balance",
              "vi": "Cân bằng công việc & cuộc sống"
            }
          ]
        },
        {
          "id": "wiso-thema-7",
          "icon": "",
          "name": "WiSo Thema 7 · Unternehmen und Verbraucher",
          "desc": "Rechte der Verbraucher · Pflichten der Unternehmen · Vertragsabschluss · Produkthaftung · Werbung und Marketing",
          "content": "<h2>WiSo Thema 7 · Unternehmen und Verbraucher</h2>\n<div class=\"hint\">Themenüberblick · Quelle: Fach Wiso (Theorie) · 5 Punkte, je 3 Theorie-Inhalte + Beispiele</div>\n<h3>A. Theorie &amp; Beispiele (5 Punkte)</h3>\n<table><tr><th>Punkt</th><th>Theorie</th><th>Beispiel</th></tr>\n<tr><td><b>1. Rechte der Verbraucher</b><div class=\'vi-sub\'>Quyền của người tiêu dùng</div></td><td>1. Widerrufsrecht<div class=\'vi-sub\'>Quyền hủy đơn hàng.</div><br>2. Garantie und Gewährleistung<div class=\'vi-sub\'>Bảo hành &amp; bảo đảm chất lượng.</div><br>3. Transparenz bei Preisen<div class=\'vi-sub\'>Minh bạch về giá cả.</div></td><td>1. „Kunde kann Online-Bestellung innerhalb 14 Tage stornieren.“<div class=\'vi-sub\'>Khách có thể hủy đơn online trong 14 ngày.</div><br>2. „Defektes Produkt wird ersetzt.“<div class=\'vi-sub\'>Sản phẩm hỏng được thay thế.</div><br>3. „Preise müssen klar auf Speisekarte stehen.“<div class=\'vi-sub\'>Giá phải ghi rõ trong menu.</div></td></tr>\n<tr><td><b>2. Pflichten der Unternehmen</b><div class=\'vi-sub\'>Nghĩa vụ của doanh nghiệp</div></td><td>1. Informationspflicht<div class=\'vi-sub\'>Nghĩa vụ cung cấp thông tin.</div><br>2. Produktsicherheit gewährleisten<div class=\'vi-sub\'>Bảo đảm an toàn sản phẩm.</div><br>3. Einhaltung von Verträgen<div class=\'vi-sub\'>Tuân thủ hợp đồng.</div></td><td>1. „Subway informiert über Allergene.“<div class=\'vi-sub\'>Subway cung cấp thông tin về chất gây dị ứng.</div><br>2. „Nur sichere Zutaten verwenden.“<div class=\'vi-sub\'>Chỉ dùng nguyên liệu an toàn.</div><br>3. „Lieferant muss pünktlich liefern.“<div class=\'vi-sub\'>Nhà cung cấp phải giao đúng hạn.</div></td></tr>\n<tr><td><b>3. Vertragsabschluss</b><div class=\'vi-sub\'>Ký kết hợp đồng</div></td><td>1. Angebot und Annahme<div class=\'vi-sub\'>Đề nghị &amp; chấp nhận.</div><br>2. Formfreiheit<div class=\'vi-sub\'>Tự do về hình thức.</div><br>3. Verbindlichkeit<div class=\'vi-sub\'>Tính ràng buộc.</div></td><td>1. „Kunde bestellt Menü = Angebot angenommen.“<div class=\'vi-sub\'>Khách đặt combo = chấp nhận đề nghị.</div><br>2. „Mündliche Vereinbarung ist gültig.“<div class=\'vi-sub\'>Thỏa thuận miệng vẫn có hiệu lực.</div><br>3. „Liefervertrag ist bindend.“<div class=\'vi-sub\'>Hợp đồng giao hàng có tính ràng buộc.</div></td></tr>\n<tr><td><b>4. Produkthaftung</b><div class=\'vi-sub\'>Trách nhiệm sản phẩm</div></td><td>1. Unternehmen haftet für Fehler<div class=\'vi-sub\'>Doanh nghiệp chịu trách nhiệm cho lỗi.</div><br>2. Schutz der Verbraucher<div class=\'vi-sub\'>Bảo vệ người tiêu dùng.</div><br>3. Folgeschäden berücksichtigen<div class=\'vi-sub\'>Cân nhắc thiệt hại phát sinh.</div></td><td>1. „Kunde erkrankt wegen verdorbenem Essen.“<div class=\'vi-sub\'>Khách bị bệnh vì đồ ăn hỏng.</div><br>2. „Unternehmen zahlt Schadensersatz.“<div class=\'vi-sub\'>Doanh nghiệp phải bồi thường.</div><br>3. „Produktrückruf bei Gefahr.“<div class=\'vi-sub\'>Thu hồi sản phẩm khi có nguy cơ.</div></td></tr>\n<tr><td><b>5. Werbung und Marketing</b><div class=\'vi-sub\'>Quảng cáo &amp; tiếp thị</div></td><td>1. Wahrheitspflicht<div class=\'vi-sub\'>Nghĩa vụ trung thực.</div><br>2. Keine Täuschung<div class=\'vi-sub\'>Không được lừa dối.</div><br>3. Jugendschutz beachten<div class=\'vi-sub\'>Tuân thủ luật bảo vệ thanh thiếu niên.</div></td><td>1. „Aktion: 2 Sandwiches zum Preis von 1.“<div class=\'vi-sub\'>Khuyến mãi: mua 2 bánh mì giá 1.</div><br>2. „Keine falschen Versprechen machen.“<div class=\'vi-sub\'>Không được hứa sai sự thật.</div><br>3. „Keine Alkoholwerbung für Jugendliche.“<div class=\'vi-sub\'>Không quảng cáo rượu cho thanh thiếu niên.</div></td></tr>\n</table>\n<h3>B. Wichtige Hinweise – Điểm lưu ý quan trọng</h3>\n<table><tr><th>Deutsch</th><th>Tiếng Việt</th><th>Ghi chú</th></tr>\n<tr><td>Verbraucherrechte sichern Fairness.</td><td>Quyền người tiêu dùng đảm bảo công bằng.</td><td>Wichtig: Widerrufsrecht, Garantie. Quan trọng: quyền hủy đơn, bảo hành.</td></tr>\n<tr><td>Unternehmen haben Informationspflicht.</td><td>Doanh nghiệp có nghĩa vụ cung cấp thông tin.</td><td>Z. B. Allergene im Essen. Ví dụ: thông tin dị ứng trong thực phẩm.</td></tr>\n<tr><td>Vertragsabschluss ist alltäglich.</td><td>Ký kết hợp đồng diễn ra hằng ngày.</td><td>Auch beim Kauf im Laden oder Restaurant. Ngay cả khi mua hàng tại cửa hàng/nhà hàng.</td></tr>\n<tr><td>Produkthaftung schützt den Kunden.</td><td>Trách nhiệm sản phẩm bảo vệ khách hàng.</td><td>Unternehmen haftet auch bei Folgeschäden. Doanh nghiệp chịu trách nhiệm cả với thiệt hại phát sinh.</td></tr>\n<tr><td>Werbung darf nicht täuschen.</td><td>Quảng cáo không được lừa dối.</td><td>Täuschung = Abmahnung, Strafe. Lừa dối = bị kiện, bị phạt.</td></tr>\n<tr><td>Jugendschutz ist zwingend einzuhalten.</td><td>Luật bảo vệ thanh thiếu niên bắt buộc tuân thủ.</td><td>Kein Alkohol, keine Tabakwerbung. Không quảng cáo rượu, thuốc lá.</td></tr>\n<tr><td>Thema oft in Prüfungen: Vertragsrecht + Verbraucherrechte.</td><td>Chủ đề thường ra thi: luật hợp đồng + quyền người tiêu dùng.</td><td>Besonders im WISO-Schriftteil. Thường xuất hiện trong phần thi viết WISO.</td></tr>\n</table>",
          "qa": [
            {
              "q": "Thema 7 – Rechte der Verbraucher: Welche Inhalte gehören dazu?",
              "qVi": "Quyền của người tiêu dùng: gồm những nội dung nào?",
              "a": "1. Widerrufsrecht\n2. Garantie und Gewährleistung\n3. Transparenz bei Preisen",
              "aVi": "1. Quyền hủy đơn hàng.\n2. Bảo hành & bảo đảm chất lượng.\n3. Minh bạch về giá cả.",
              "why": "Điểm Theorie trong bảng tổng hợp WiSo (mỗi Punkt có 3 nội dung).",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Nenne ein praktisches Beispiel zu: Rechte der Verbraucher",
              "qVi": "Nêu một ví dụ thực tế cho: Quyền của người tiêu dùng",
              "a": "1. „Kunde kann Online-Bestellung innerhalb 14 Tage stornieren.“\n2. „Defektes Produkt wird ersetzt.“\n3. „Preise müssen klar auf Speisekarte stehen.“",
              "aVi": "1. Khách có thể hủy đơn online trong 14 ngày.\n2. Sản phẩm hỏng được thay thế.\n3. Giá phải ghi rõ trong menu.",
              "why": "Ví dụ giúp trả lời câu hỏi tình huống trong thi WiSo.",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Thema 7 – Pflichten der Unternehmen: Welche Inhalte gehören dazu?",
              "qVi": "Nghĩa vụ của doanh nghiệp: gồm những nội dung nào?",
              "a": "1. Informationspflicht\n2. Produktsicherheit gewährleisten\n3. Einhaltung von Verträgen",
              "aVi": "1. Nghĩa vụ cung cấp thông tin.\n2. Bảo đảm an toàn sản phẩm.\n3. Tuân thủ hợp đồng.",
              "why": "Điểm Theorie trong bảng tổng hợp WiSo (mỗi Punkt có 3 nội dung).",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Nenne ein praktisches Beispiel zu: Pflichten der Unternehmen",
              "qVi": "Nêu một ví dụ thực tế cho: Nghĩa vụ của doanh nghiệp",
              "a": "1. „Subway informiert über Allergene.“\n2. „Nur sichere Zutaten verwenden.“\n3. „Lieferant muss pünktlich liefern.“",
              "aVi": "1. Subway cung cấp thông tin về chất gây dị ứng.\n2. Chỉ dùng nguyên liệu an toàn.\n3. Nhà cung cấp phải giao đúng hạn.",
              "why": "Ví dụ giúp trả lời câu hỏi tình huống trong thi WiSo.",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Thema 7 – Vertragsabschluss: Welche Inhalte gehören dazu?",
              "qVi": "Ký kết hợp đồng: gồm những nội dung nào?",
              "a": "1. Angebot und Annahme\n2. Formfreiheit\n3. Verbindlichkeit",
              "aVi": "1. Đề nghị & chấp nhận.\n2. Tự do về hình thức.\n3. Tính ràng buộc.",
              "why": "Điểm Theorie trong bảng tổng hợp WiSo (mỗi Punkt có 3 nội dung).",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Nenne ein praktisches Beispiel zu: Vertragsabschluss",
              "qVi": "Nêu một ví dụ thực tế cho: Ký kết hợp đồng",
              "a": "1. „Kunde bestellt Menü = Angebot angenommen.“\n2. „Mündliche Vereinbarung ist gültig.“\n3. „Liefervertrag ist bindend.“",
              "aVi": "1. Khách đặt combo = chấp nhận đề nghị.\n2. Thỏa thuận miệng vẫn có hiệu lực.\n3. Hợp đồng giao hàng có tính ràng buộc.",
              "why": "Ví dụ giúp trả lời câu hỏi tình huống trong thi WiSo.",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Thema 7 – Produkthaftung: Welche Inhalte gehören dazu?",
              "qVi": "Trách nhiệm sản phẩm: gồm những nội dung nào?",
              "a": "1. Unternehmen haftet für Fehler\n2. Schutz der Verbraucher\n3. Folgeschäden berücksichtigen",
              "aVi": "1. Doanh nghiệp chịu trách nhiệm cho lỗi.\n2. Bảo vệ người tiêu dùng.\n3. Cân nhắc thiệt hại phát sinh.",
              "why": "Điểm Theorie trong bảng tổng hợp WiSo (mỗi Punkt có 3 nội dung).",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Nenne ein praktisches Beispiel zu: Produkthaftung",
              "qVi": "Nêu một ví dụ thực tế cho: Trách nhiệm sản phẩm",
              "a": "1. „Kunde erkrankt wegen verdorbenem Essen.“\n2. „Unternehmen zahlt Schadensersatz.“\n3. „Produktrückruf bei Gefahr.“",
              "aVi": "1. Khách bị bệnh vì đồ ăn hỏng.\n2. Doanh nghiệp phải bồi thường.\n3. Thu hồi sản phẩm khi có nguy cơ.",
              "why": "Ví dụ giúp trả lời câu hỏi tình huống trong thi WiSo.",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Thema 7 – Werbung und Marketing: Welche Inhalte gehören dazu?",
              "qVi": "Quảng cáo & tiếp thị: gồm những nội dung nào?",
              "a": "1. Wahrheitspflicht\n2. Keine Täuschung\n3. Jugendschutz beachten",
              "aVi": "1. Nghĩa vụ trung thực.\n2. Không được lừa dối.\n3. Tuân thủ luật bảo vệ thanh thiếu niên.",
              "why": "Điểm Theorie trong bảng tổng hợp WiSo (mỗi Punkt có 3 nội dung).",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Nenne ein praktisches Beispiel zu: Werbung und Marketing",
              "qVi": "Nêu một ví dụ thực tế cho: Quảng cáo & tiếp thị",
              "a": "1. „Aktion: 2 Sandwiches zum Preis von 1.“\n2. „Keine falschen Versprechen machen.“\n3. „Keine Alkoholwerbung für Jugendliche.“",
              "aVi": "1. Khuyến mãi: mua 2 bánh mì giá 1.\n2. Không được hứa sai sự thật.\n3. Không quảng cáo rượu cho thanh thiếu niên.",
              "why": "Ví dụ giúp trả lời câu hỏi tình huống trong thi WiSo.",
              "src": "Fach Wiso (Theorie)"
            }
          ],
          "vokabeln": [
            {
              "de": "Rechte der Verbraucher",
              "vi": "Quyền của người tiêu dùng"
            },
            {
              "de": "Pflichten der Unternehmen",
              "vi": "Nghĩa vụ của doanh nghiệp"
            },
            {
              "de": "Vertragsabschluss",
              "vi": "Ký kết hợp đồng"
            },
            {
              "de": "Produkthaftung",
              "vi": "Trách nhiệm sản phẩm"
            },
            {
              "de": "Werbung und Marketing",
              "vi": "Quảng cáo & tiếp thị"
            }
          ]
        },
        {
          "id": "wiso-thema-8",
          "icon": "",
          "name": "WiSo Thema 8 · Rechtsgeschäfte",
          "desc": "Rechtsfähigkeit · Geschäftsfähigkeit · Vertragsschluss · Anfechtung · Nichtigkeit",
          "content": "<h2>WiSo Thema 8 · Rechtsgeschäfte</h2>\n<div class=\"hint\">Themenüberblick · Quelle: Fach Wiso (Theorie) · 5 Punkte, je 3 Theorie-Inhalte + Beispiele</div>\n<h3>A. Theorie &amp; Beispiele (5 Punkte)</h3>\n<table><tr><th>Punkt</th><th>Theorie</th><th>Beispiel</th></tr>\n<tr><td><b>1. Rechtsfähigkeit</b><div class=\'vi-sub\'>Năng lực pháp luật</div></td><td>1. Jeder Mensch von Geburt an<div class=\'vi-sub\'>Mọi người có năng lực pháp luật từ khi sinh ra.</div><br>2. Fähigkeit, Rechte und Pflichten zu haben<div class=\'vi-sub\'>Có quyền &amp; nghĩa vụ.</div><br>3. Endet mit dem Tod<div class=\'vi-sub\'>Kết thúc khi chết.</div></td><td>1. „Azubi darf Eigentum besitzen.“<div class=\'vi-sub\'>Học viên có thể sở hữu tài sản.</div><br>2. „Mitarbeiter hat Anspruch auf Lohn.“<div class=\'vi-sub\'>Nhân viên có quyền nhận lương.</div><br>3. „Nach Tod keine Rechtsfähigkeit mehr.“<div class=\'vi-sub\'>Sau khi chết thì không còn năng lực pháp luật.</div></td></tr>\n<tr><td><b>2. Geschäftsfähigkeit</b><div class=\'vi-sub\'>Năng lực hành vi dân sự</div></td><td>1. Volle Geschäftsfähigkeit ab 18<div class=\'vi-sub\'>Đủ năng lực từ 18 tuổi.</div><br>2. Beschränkte Geschäftsfähigkeit: 7–17 Jahre<div class=\'vi-sub\'>Năng lực hạn chế từ 7–17 tuổi.</div><br>3. Geschäftsunfähigkeit unter 7 Jahre<div class=\'vi-sub\'>Không có năng lực dưới 7 tuổi.</div></td><td>1. „Azubi mit 19 schließt Vertrag selbst.“<div class=\'vi-sub\'>Học viên 19 tuổi tự ký hợp đồng.</div><br>2. „16-Jähriger braucht Zustimmung Eltern.“<div class=\'vi-sub\'>Người 16 tuổi cần cha mẹ đồng ý.</div><br>3. „Kind mit 6 darf keinen Vertrag schließen.“<div class=\'vi-sub\'>Trẻ 6 tuổi không thể ký hợp đồng.</div></td></tr>\n<tr><td><b>3. Vertragsschluss</b><div class=\'vi-sub\'>Giao kết hợp đồng</div></td><td>1. Angebot + Annahme<div class=\'vi-sub\'>Đề nghị + chấp nhận.</div><br>2. Übereinstimmende Willenserklärung<div class=\'vi-sub\'>Thỏa thuận ý chí.</div><br>3. Rechtsbindungswille<div class=\'vi-sub\'>Ý chí ràng buộc pháp lý.</div></td><td>1. „Kunde bestellt Menü = Angebot angenommen.“<div class=\'vi-sub\'>Khách đặt combo = chấp nhận đề nghị.</div><br>2. „Lieferant und Subway schließen Vertrag.“<div class=\'vi-sub\'>Nhà cung cấp và Subway ký hợp đồng.</div><br>3. „Mitarbeiter akzeptiert Arbeitsvertrag.“<div class=\'vi-sub\'>Nhân viên đồng ý hợp đồng lao động.</div></td></tr>\n<tr><td><b>4. Anfechtung</b><div class=\'vi-sub\'>Hủy bỏ hợp đồng</div></td><td>1. Bei Irrtum möglich<div class=\'vi-sub\'>Có thể khi nhầm lẫn.</div><br>2. Bei Täuschung möglich<div class=\'vi-sub\'>Có thể khi bị lừa dối.</div><br>3. Frist muss eingehalten werden<div class=\'vi-sub\'>Phải tuân thủ thời hạn.</div></td><td>1. „Preis falsch angegeben → Vertrag anfechtbar.“<div class=\'vi-sub\'>Giá ghi sai → có thể hủy hợp đồng.</div><br>2. „Kunde wurde getäuscht.“<div class=\'vi-sub\'>Khách bị lừa dối.</div><br>3. „Anfechtung innerhalb 14 Tage.“<div class=\'vi-sub\'>Hủy hợp đồng trong vòng 14 ngày.</div></td></tr>\n<tr><td><b>5. Nichtigkeit</b><div class=\'vi-sub\'>Vô hiệu hợp đồng</div></td><td>1. Gesetzeswidrig<div class=\'vi-sub\'>Trái luật.</div><br>2. Sittenwidrig<div class=\'vi-sub\'>Trái đạo đức xã hội.</div><br>3. Formmangel<div class=\'vi-sub\'>Sai hình thức bắt buộc.</div></td><td>1. „Drogenhandel-Vertrag = nichtig.“<div class=\'vi-sub\'>Hợp đồng buôn ma túy = vô hiệu.</div><br>2. „Wucherzinsen = sittenwidrig.“<div class=\'vi-sub\'>Cho vay nặng lãi = trái đạo đức.</div><br>3. „Kaufvertrag ohne Schriftform (bei Pflicht) = nichtig.“<div class=\'vi-sub\'>Hợp đồng mua bán không có văn bản (khi luật bắt buộc) = vô hiệu.</div></td></tr>\n</table>\n<h3>B. Wichtige Hinweise – Điểm lưu ý quan trọng</h3>\n<table><tr><th>Deutsch</th><th>Tiếng Việt</th><th>Ghi chú</th></tr>\n<tr><td>Rechtsfähigkeit hat jeder Mensch.</td><td>Mọi người đều có năng lực pháp luật.</td><td>Von Geburt bis Tod. Từ khi sinh đến khi chết.</td></tr>\n<tr><td>Geschäftsfähigkeit hängt vom Alter ab.</td><td>Năng lực hành vi phụ thuộc vào độ tuổi.</td><td>&lt; 7 = unfähig, 7–17 = beschränkt, ab 18 = voll. &lt;7 = không có, 7–17 = hạn chế, từ 18 = đầy đủ.</td></tr>\n<tr><td>Jeder Vertrag braucht Angebot + Annahme.</td><td>Mọi hợp đồng cần có đề nghị + chấp nhận.</td><td>Ohne Übereinstimmung = kein Vertrag. Không có đồng thuận = không có hợp đồng.</td></tr>\n<tr><td>Anfechtung schützt vor Fehlern und Täuschung.</td><td>Hủy hợp đồng bảo vệ khỏi sai sót &amp; lừa dối.</td><td>Nur innerhalb bestimmter Frist gültig. Chỉ có hiệu lực trong thời hạn nhất định.</td></tr>\n<tr><td>Nichtigkeit macht Vertrag von Anfang an ungültig.</td><td>Vô hiệu = hợp đồng không có giá trị từ đầu.</td><td>Z. B. Gesetzesverstoß, Formmangel. Ví dụ: trái luật, sai hình thức.</td></tr>\n<tr><td>Verträge sind Prüfungsstoff Nr. 1.</td><td>Hợp đồng là chủ đề số 1 trong thi WISO.</td><td>Oft in schriftlichen Aufgaben. Thường xuất hiện trong phần thi viết.</td></tr>\n<tr><td>Praxis: Arbeitsverträge, Kaufverträge, Lieferverträge.</td><td>Thực tế: hợp đồng lao động, mua bán, giao hàng.</td><td>Diese Beispiele kommen in Prüfungen oft. Các ví dụ này thường ra trong thi.</td></tr>\n</table>",
          "qa": [
            {
              "q": "Thema 8 – Rechtsfähigkeit: Welche Inhalte gehören dazu?",
              "qVi": "Năng lực pháp luật: gồm những nội dung nào?",
              "a": "1. Jeder Mensch von Geburt an\n2. Fähigkeit, Rechte und Pflichten zu haben\n3. Endet mit dem Tod",
              "aVi": "1. Mọi người có năng lực pháp luật từ khi sinh ra.\n2. Có quyền & nghĩa vụ.\n3. Kết thúc khi chết.",
              "why": "Điểm Theorie trong bảng tổng hợp WiSo (mỗi Punkt có 3 nội dung).",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Nenne ein praktisches Beispiel zu: Rechtsfähigkeit",
              "qVi": "Nêu một ví dụ thực tế cho: Năng lực pháp luật",
              "a": "1. „Azubi darf Eigentum besitzen.“\n2. „Mitarbeiter hat Anspruch auf Lohn.“\n3. „Nach Tod keine Rechtsfähigkeit mehr.“",
              "aVi": "1. Học viên có thể sở hữu tài sản.\n2. Nhân viên có quyền nhận lương.\n3. Sau khi chết thì không còn năng lực pháp luật.",
              "why": "Ví dụ giúp trả lời câu hỏi tình huống trong thi WiSo.",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Thema 8 – Geschäftsfähigkeit: Welche Inhalte gehören dazu?",
              "qVi": "Năng lực hành vi dân sự: gồm những nội dung nào?",
              "a": "1. Volle Geschäftsfähigkeit ab 18\n2. Beschränkte Geschäftsfähigkeit: 7–17 Jahre\n3. Geschäftsunfähigkeit unter 7 Jahre",
              "aVi": "1. Đủ năng lực từ 18 tuổi.\n2. Năng lực hạn chế từ 7–17 tuổi.\n3. Không có năng lực dưới 7 tuổi.",
              "why": "Điểm Theorie trong bảng tổng hợp WiSo (mỗi Punkt có 3 nội dung).",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Nenne ein praktisches Beispiel zu: Geschäftsfähigkeit",
              "qVi": "Nêu một ví dụ thực tế cho: Năng lực hành vi dân sự",
              "a": "1. „Azubi mit 19 schließt Vertrag selbst.“\n2. „16-Jähriger braucht Zustimmung Eltern.“\n3. „Kind mit 6 darf keinen Vertrag schließen.“",
              "aVi": "1. Học viên 19 tuổi tự ký hợp đồng.\n2. Người 16 tuổi cần cha mẹ đồng ý.\n3. Trẻ 6 tuổi không thể ký hợp đồng.",
              "why": "Ví dụ giúp trả lời câu hỏi tình huống trong thi WiSo.",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Thema 8 – Vertragsschluss: Welche Inhalte gehören dazu?",
              "qVi": "Giao kết hợp đồng: gồm những nội dung nào?",
              "a": "1. Angebot + Annahme\n2. Übereinstimmende Willenserklärung\n3. Rechtsbindungswille",
              "aVi": "1. Đề nghị + chấp nhận.\n2. Thỏa thuận ý chí.\n3. Ý chí ràng buộc pháp lý.",
              "why": "Điểm Theorie trong bảng tổng hợp WiSo (mỗi Punkt có 3 nội dung).",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Nenne ein praktisches Beispiel zu: Vertragsschluss",
              "qVi": "Nêu một ví dụ thực tế cho: Giao kết hợp đồng",
              "a": "1. „Kunde bestellt Menü = Angebot angenommen.“\n2. „Lieferant und Subway schließen Vertrag.“\n3. „Mitarbeiter akzeptiert Arbeitsvertrag.“",
              "aVi": "1. Khách đặt combo = chấp nhận đề nghị.\n2. Nhà cung cấp và Subway ký hợp đồng.\n3. Nhân viên đồng ý hợp đồng lao động.",
              "why": "Ví dụ giúp trả lời câu hỏi tình huống trong thi WiSo.",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Thema 8 – Anfechtung: Welche Inhalte gehören dazu?",
              "qVi": "Hủy bỏ hợp đồng: gồm những nội dung nào?",
              "a": "1. Bei Irrtum möglich\n2. Bei Täuschung möglich\n3. Frist muss eingehalten werden",
              "aVi": "1. Có thể khi nhầm lẫn.\n2. Có thể khi bị lừa dối.\n3. Phải tuân thủ thời hạn.",
              "why": "Điểm Theorie trong bảng tổng hợp WiSo (mỗi Punkt có 3 nội dung).",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Nenne ein praktisches Beispiel zu: Anfechtung",
              "qVi": "Nêu một ví dụ thực tế cho: Hủy bỏ hợp đồng",
              "a": "1. „Preis falsch angegeben → Vertrag anfechtbar.“\n2. „Kunde wurde getäuscht.“\n3. „Anfechtung innerhalb 14 Tage.“",
              "aVi": "1. Giá ghi sai → có thể hủy hợp đồng.\n2. Khách bị lừa dối.\n3. Hủy hợp đồng trong vòng 14 ngày.",
              "why": "Ví dụ giúp trả lời câu hỏi tình huống trong thi WiSo.",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Thema 8 – Nichtigkeit: Welche Inhalte gehören dazu?",
              "qVi": "Vô hiệu hợp đồng: gồm những nội dung nào?",
              "a": "1. Gesetzeswidrig\n2. Sittenwidrig\n3. Formmangel",
              "aVi": "1. Trái luật.\n2. Trái đạo đức xã hội.\n3. Sai hình thức bắt buộc.",
              "why": "Điểm Theorie trong bảng tổng hợp WiSo (mỗi Punkt có 3 nội dung).",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Nenne ein praktisches Beispiel zu: Nichtigkeit",
              "qVi": "Nêu một ví dụ thực tế cho: Vô hiệu hợp đồng",
              "a": "1. „Drogenhandel-Vertrag = nichtig.“\n2. „Wucherzinsen = sittenwidrig.“\n3. „Kaufvertrag ohne Schriftform (bei Pflicht) = nichtig.“",
              "aVi": "1. Hợp đồng buôn ma túy = vô hiệu.\n2. Cho vay nặng lãi = trái đạo đức.\n3. Hợp đồng mua bán không có văn bản (khi luật bắt buộc) = vô hiệu.",
              "why": "Ví dụ giúp trả lời câu hỏi tình huống trong thi WiSo.",
              "src": "Fach Wiso (Theorie)"
            }
          ],
          "vokabeln": [
            {
              "de": "Rechtsfähigkeit",
              "vi": "Năng lực pháp luật"
            },
            {
              "de": "Geschäftsfähigkeit",
              "vi": "Năng lực hành vi dân sự"
            },
            {
              "de": "Vertragsschluss",
              "vi": "Giao kết hợp đồng"
            },
            {
              "de": "Anfechtung",
              "vi": "Hủy bỏ hợp đồng"
            },
            {
              "de": "Nichtigkeit",
              "vi": "Vô hiệu hợp đồng"
            }
          ]
        },
        {
          "id": "wiso-thema-9",
          "icon": "",
          "name": "WiSo Thema 9 · Weltwirtschaftliche Verflechtungen",
          "desc": "Globalisierung · Außenhandel · Europäische Union (EU) · Internationale Organisationen · Chancen und Risiken",
          "content": "<h2>WiSo Thema 9 · Weltwirtschaftliche Verflechtungen</h2>\n<div class=\"hint\">Themenüberblick · Quelle: Fach Wiso (Theorie) · 5 Punkte, je 3 Theorie-Inhalte + Beispiele</div>\n<h3>A. Theorie &amp; Beispiele (5 Punkte)</h3>\n<table><tr><th>Punkt</th><th>Theorie</th><th>Beispiel</th></tr>\n<tr><td><b>1. Globalisierung</b><div class=\'vi-sub\'>Toàn cầu hóa</div></td><td>1. Weltweite Vernetzung<div class=\'vi-sub\'>Kết nối toàn cầu.</div><br>2. Waren- und Dienstleistungsaustausch<div class=\'vi-sub\'>Trao đổi hàng hóa &amp; dịch vụ.</div><br>3. Internationale Arbeitsteilung<div class=\'vi-sub\'>Phân công lao động quốc tế.</div></td><td>1. „Subway hat Filialen weltweit.“<div class=\'vi-sub\'>Subway có chi nhánh toàn cầu.</div><br>2. „Kaffee wird aus Brasilien importiert.“<div class=\'vi-sub\'>Cà phê nhập khẩu từ Brazil.</div><br>3. „Arbeitskleidung aus Asien hergestellt.“<div class=\'vi-sub\'>Đồng phục được sản xuất ở châu Á.</div></td></tr>\n<tr><td><b>2. Außenhandel</b><div class=\'vi-sub\'>Ngoại thương</div></td><td>1. Export von Waren<div class=\'vi-sub\'>Xuất khẩu hàng hóa.</div><br>2. Import von Rohstoffen<div class=\'vi-sub\'>Nhập khẩu nguyên liệu.</div><br>3. Handelsbilanz beachten<div class=\'vi-sub\'>Lưu ý cán cân thương mại.</div></td><td>1. „Deutschland exportiert Maschinen.“<div class=\'vi-sub\'>Đức xuất khẩu máy móc.</div><br>2. „Deutschland importiert Bananen.“<div class=\'vi-sub\'>Đức nhập khẩu chuối.</div><br>3. „Mehr Export als Import = Überschuss.“<div class=\'vi-sub\'>Xuất nhiều hơn nhập = thặng dư.</div></td></tr>\n<tr><td><b>3. Europäische Union (EU)</b><div class=\'vi-sub\'>Liên minh châu Âu</div></td><td>1. Binnenmarkt ohne Grenzen<div class=\'vi-sub\'>Thị trường chung không biên giới.</div><br>2. Freier Waren- und Personenverkehr<div class=\'vi-sub\'>Tự do lưu thông hàng hóa &amp; con người.</div><br>3. Gemeinsame Währung (Euro)<div class=\'vi-sub\'>Đồng tiền chung (Euro).</div></td><td>1. „Azubi kann in jedem EU-Land arbeiten.“<div class=\'vi-sub\'>Học viên có thể làm việc ở bất kỳ nước EU nào.</div><br>2. „Waren frei zwischen Deutschland und Frankreich.“<div class=\'vi-sub\'>Hàng hóa tự do giữa Đức và Pháp.</div><br>3. „Subway in EU rechnet in Euro ab.“<div class=\'vi-sub\'>Subway tại EU tính bằng Euro.</div></td></tr>\n<tr><td><b>4. Internationale Organisationen</b><div class=\'vi-sub\'>Tổ chức quốc tế</div></td><td>1. WTO: Freihandel fördern<div class=\'vi-sub\'>WTO: thúc đẩy tự do thương mại.</div><br>2. ILO: Arbeitsrechte sichern<div class=\'vi-sub\'>ILO: đảm bảo quyền lao động.</div><br>3. UNO: Globale Zusammenarbeit<div class=\'vi-sub\'>LHQ: hợp tác toàn cầu.</div></td><td>1. „WTO senkt Zölle.“<div class=\'vi-sub\'>WTO giảm thuế quan.</div><br>2. „ILO schützt Kinder vor Kinderarbeit.“<div class=\'vi-sub\'>ILO bảo vệ trẻ em khỏi lao động trẻ em.</div><br>3. „UNO hilft bei Krisen weltweit.“<div class=\'vi-sub\'>LHQ giúp đỡ trong khủng hoảng toàn cầu.</div></td></tr>\n<tr><td><b>5. Chancen und Risiken</b><div class=\'vi-sub\'>Cơ hội &amp; rủi ro</div></td><td>1. Neue Märkte erschließen<div class=\'vi-sub\'>Mở ra thị trường mới.</div><br>2. Konkurrenz steigt<div class=\'vi-sub\'>Cạnh tranh tăng.</div><br>3. Abhängigkeit von anderen Ländern<div class=\'vi-sub\'>Phụ thuộc vào quốc gia khác.</div></td><td>1. „Subway expandiert nach Asien.“<div class=\'vi-sub\'>Subway mở rộng sang châu Á.</div><br>2. „Mehr Konkurrenz durch internationale Ketten.“<div class=\'vi-sub\'>Cạnh tranh tăng do chuỗi quốc tế.</div><br>3. „Lieferprobleme bei Importwaren.“<div class=\'vi-sub\'>Gặp vấn đề cung ứng khi nhập khẩu.</div></td></tr>\n</table>\n<h3>B. Wichtige Hinweise – Điểm lưu ý quan trọng</h3>\n<table><tr><th>Deutsch</th><th>Tiếng Việt</th><th>Ghi chú</th></tr>\n<tr><td>Globalisierung betrifft alle Branchen.</td><td>Toàn cầu hóa ảnh hưởng đến mọi ngành.</td><td>Besonders Gastronomie: Zutaten weltweit. Đặc biệt ngành ẩm thực: nguyên liệu từ khắp nơi.</td></tr>\n<tr><td>Außenhandel ist Grundlage für Wohlstand.</td><td>Ngoại thương là nền tảng cho sự thịnh vượng.</td><td>Deutschland exportiert viel, Import auch wichtig. Đức xuất khẩu nhiều, nhập khẩu cũng quan trọng.</td></tr>\n<tr><td>EU bedeutet Freiheit und gemeinsame Regeln.</td><td>EU mang lại tự do &amp; luật chung.</td><td>Binnenmarkt = keine Zölle, freier Verkehr. Thị trường chung = không thuế, tự do lưu thông.</td></tr>\n<tr><td>Internationale Organisationen fördern Stabilität.</td><td>Tổ chức quốc tế thúc đẩy ổn định.</td><td>WTO = Handel, ILO = Arbeit, UNO = Frieden. WTO = thương mại, ILO = lao động, LHQ = hòa bình.</td></tr>\n<tr><td>Chancen und Risiken immer abwägen.</td><td>Luôn cân nhắc cơ hội &amp; rủi ro.</td><td>Mehr Märkte = mehr Gewinn, aber auch mehr Konkurrenz. Nhiều thị trường = nhiều lợi nhuận, nhưng cũng nhiều cạnh tranh.</td></tr>\n<tr><td>Abhängigkeit ist gefährlich.</td><td>Phụ thuộc quá nhiều là nguy hiểm.</td><td>Lieferengpässe wie bei Corona-Krise. Ví dụ: đứt gãy chuỗi cung ứng trong dịch Corona.</td></tr>\n<tr><td>Thema sehr prüfungsrelevant.</td><td>Chủ đề này rất quan trọng trong kỳ thi.</td><td>Oft Fragen zu EU, WTO und Globalisierung. Thường có câu hỏi về EU, WTO và toàn cầu hóa.</td></tr>\n</table>",
          "qa": [
            {
              "q": "Thema 9 – Globalisierung: Welche Inhalte gehören dazu?",
              "qVi": "Toàn cầu hóa: gồm những nội dung nào?",
              "a": "1. Weltweite Vernetzung\n2. Waren- und Dienstleistungsaustausch\n3. Internationale Arbeitsteilung",
              "aVi": "1. Kết nối toàn cầu.\n2. Trao đổi hàng hóa & dịch vụ.\n3. Phân công lao động quốc tế.",
              "why": "Điểm Theorie trong bảng tổng hợp WiSo (mỗi Punkt có 3 nội dung).",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Nenne ein praktisches Beispiel zu: Globalisierung",
              "qVi": "Nêu một ví dụ thực tế cho: Toàn cầu hóa",
              "a": "1. „Subway hat Filialen weltweit.“\n2. „Kaffee wird aus Brasilien importiert.“\n3. „Arbeitskleidung aus Asien hergestellt.“",
              "aVi": "1. Subway có chi nhánh toàn cầu.\n2. Cà phê nhập khẩu từ Brazil.\n3. Đồng phục được sản xuất ở châu Á.",
              "why": "Ví dụ giúp trả lời câu hỏi tình huống trong thi WiSo.",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Thema 9 – Außenhandel: Welche Inhalte gehören dazu?",
              "qVi": "Ngoại thương: gồm những nội dung nào?",
              "a": "1. Export von Waren\n2. Import von Rohstoffen\n3. Handelsbilanz beachten",
              "aVi": "1. Xuất khẩu hàng hóa.\n2. Nhập khẩu nguyên liệu.\n3. Lưu ý cán cân thương mại.",
              "why": "Điểm Theorie trong bảng tổng hợp WiSo (mỗi Punkt có 3 nội dung).",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Nenne ein praktisches Beispiel zu: Außenhandel",
              "qVi": "Nêu một ví dụ thực tế cho: Ngoại thương",
              "a": "1. „Deutschland exportiert Maschinen.“\n2. „Deutschland importiert Bananen.“\n3. „Mehr Export als Import = Überschuss.“",
              "aVi": "1. Đức xuất khẩu máy móc.\n2. Đức nhập khẩu chuối.\n3. Xuất nhiều hơn nhập = thặng dư.",
              "why": "Ví dụ giúp trả lời câu hỏi tình huống trong thi WiSo.",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Thema 9 – Europäische Union (EU): Welche Inhalte gehören dazu?",
              "qVi": "Liên minh châu Âu: gồm những nội dung nào?",
              "a": "1. Binnenmarkt ohne Grenzen\n2. Freier Waren- und Personenverkehr\n3. Gemeinsame Währung (Euro)",
              "aVi": "1. Thị trường chung không biên giới.\n2. Tự do lưu thông hàng hóa & con người.\n3. Đồng tiền chung (Euro).",
              "why": "Điểm Theorie trong bảng tổng hợp WiSo (mỗi Punkt có 3 nội dung).",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Nenne ein praktisches Beispiel zu: Europäische Union (EU)",
              "qVi": "Nêu một ví dụ thực tế cho: Liên minh châu Âu",
              "a": "1. „Azubi kann in jedem EU-Land arbeiten.“\n2. „Waren frei zwischen Deutschland und Frankreich.“\n3. „Subway in EU rechnet in Euro ab.“",
              "aVi": "1. Học viên có thể làm việc ở bất kỳ nước EU nào.\n2. Hàng hóa tự do giữa Đức và Pháp.\n3. Subway tại EU tính bằng Euro.",
              "why": "Ví dụ giúp trả lời câu hỏi tình huống trong thi WiSo.",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Thema 9 – Internationale Organisationen: Welche Inhalte gehören dazu?",
              "qVi": "Tổ chức quốc tế: gồm những nội dung nào?",
              "a": "1. WTO: Freihandel fördern\n2. ILO: Arbeitsrechte sichern\n3. UNO: Globale Zusammenarbeit",
              "aVi": "1. WTO: thúc đẩy tự do thương mại.\n2. ILO: đảm bảo quyền lao động.\n3. LHQ: hợp tác toàn cầu.",
              "why": "Điểm Theorie trong bảng tổng hợp WiSo (mỗi Punkt có 3 nội dung).",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Nenne ein praktisches Beispiel zu: Internationale Organisationen",
              "qVi": "Nêu một ví dụ thực tế cho: Tổ chức quốc tế",
              "a": "1. „WTO senkt Zölle.“\n2. „ILO schützt Kinder vor Kinderarbeit.“\n3. „UNO hilft bei Krisen weltweit.“",
              "aVi": "1. WTO giảm thuế quan.\n2. ILO bảo vệ trẻ em khỏi lao động trẻ em.\n3. LHQ giúp đỡ trong khủng hoảng toàn cầu.",
              "why": "Ví dụ giúp trả lời câu hỏi tình huống trong thi WiSo.",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Thema 9 – Chancen und Risiken: Welche Inhalte gehören dazu?",
              "qVi": "Cơ hội & rủi ro: gồm những nội dung nào?",
              "a": "1. Neue Märkte erschließen\n2. Konkurrenz steigt\n3. Abhängigkeit von anderen Ländern",
              "aVi": "1. Mở ra thị trường mới.\n2. Cạnh tranh tăng.\n3. Phụ thuộc vào quốc gia khác.",
              "why": "Điểm Theorie trong bảng tổng hợp WiSo (mỗi Punkt có 3 nội dung).",
              "src": "Fach Wiso (Theorie)"
            },
            {
              "q": "Nenne ein praktisches Beispiel zu: Chancen und Risiken",
              "qVi": "Nêu một ví dụ thực tế cho: Cơ hội & rủi ro",
              "a": "1. „Subway expandiert nach Asien.“\n2. „Mehr Konkurrenz durch internationale Ketten.“\n3. „Lieferprobleme bei Importwaren.“",
              "aVi": "1. Subway mở rộng sang châu Á.\n2. Cạnh tranh tăng do chuỗi quốc tế.\n3. Gặp vấn đề cung ứng khi nhập khẩu.",
              "why": "Ví dụ giúp trả lời câu hỏi tình huống trong thi WiSo.",
              "src": "Fach Wiso (Theorie)"
            }
          ],
          "vokabeln": [
            {
              "de": "Globalisierung",
              "vi": "Toàn cầu hóa"
            },
            {
              "de": "Außenhandel",
              "vi": "Ngoại thương"
            },
            {
              "de": "Europäische Union (EU)",
              "vi": "Liên minh châu Âu"
            },
            {
              "de": "Internationale Organisationen",
              "vi": "Tổ chức quốc tế"
            },
            {
              "de": "Chancen und Risiken",
              "vi": "Cơ hội & rủi ro"
            }
          ]
        }
      ]
    }
  ],
  "quiz": [
        {
      "theme": "wiko-duales-system",
      "cat": "WiKO",
      "q": "Welche beiden Lernorte kombiniert das duale System der Berufsausbildung?",
      "opts": [
            "Universität und Wirtschaftsministerium",
            "Ausbildungsbetrieb und Berufsschule",
            "Arbeitsagentur und Handwerkskammer",
            "Allgemeinbildende Schule und Weiterbildungszentrum"
      ],
      "a": 1,
      "ex": "Ausbildungsbetrieb (praktische Ausbildung) und Berufsschule (fachtheoretische Ausbildung)."
},
        {
      "theme": "wiko-rechte-pflichten",
      "cat": "WiKO",
      "q": "Zu welchen Pflichten gehört die Führung des Ausbildungsnachweises (Berichtsheft)?",
      "opts": [
            "Freiwillige Zusatzaufgabe des Betriebs",
            "Gesetzliche Pflicht des Auszubildenden (§ 13 BBiG)",
            "Alleinige Aufgabe des Ausbilders",
            "Verpflichtung der Berufsschullehrer"
      ],
      "a": 1,
      "ex": "Die Führung des Berichtshefts ist gesetzliche Pflicht des Azubis und Zulassungsvoraussetzung zur Abschlussprüfung."
},
        {
      "theme": "wiko-ausbildungsvertrag",
      "cat": "WiKO",
      "q": "Wie lange dauert die gesetzliche Probezeit im Berufsausbildungsverhältnis nach § 20 BBiG?",
      "opts": [
            "Maximal 6 Monate",
            "Mindestens 1 Monat bis höchstens 4 Monate",
            "Keine Probezeit zulässig",
            "Mindestens 6 Monate bis maximal 1 Jahr"
      ],
      "a": 1,
      "ex": "Die Probezeit muss mindestens 1 Monat und darf höchstens 4 Monate betragen (§ 20 BBiG)."
},
        {
      "theme": "wiko-probezeit-ueberwachung",
      "cat": "WiKO",
      "q": "Wie kann das Berufsausbildungsverhältnis während der Probezeit gekündigt werden?",
      "opts": [
            "Mit einer Frist von 4 Wochen zum Monatsende",
            "Jederzeit ohne Kündigungsfrist und ohne Angabe von Gründen schriftlich",
            "Nur mit vorheriger Zustimmung des Arbeitsgerichts",
            "Nur mit Genehmigung der zuständigen Kammer (IHK)"
      ],
      "a": 1,
      "ex": "Während der Probezeit kann jederzeit ohne Einhaltung einer Frist und ohne Angabe von Gründen gekündigt werden (§ 22 BBiG)."
},
        {
      "theme": "wiko-arbeitsschutz",
      "cat": "WiKO",
      "q": "Wie lang ist die ununterbrochene Mindestruhezeit zwischen zwei Arbeitsschichten nach § 5 ArbZG?",
      "opts": [
            "Mindestens 8 Stunden",
            "Mindestens 10 Stunden",
            "Mindestens 11 Stunden ununterbrochen",
            "Mindestens 12 Stunden"
      ],
      "a": 2,
      "ex": "Nach Beendigung der täglichen Arbeitszeit müssen Arbeitnehmer mindestens 11 Stunden ununterbrochene Ruhezeit haben (§ 5 ArbZG)."
},
        {
      "theme": "wiko-fragen-agg",
      "cat": "WiKO",
      "q": "Welches Recht hat ein Bewerber bei unzulässigen Fragen im Vorstellungsgespräch (z. B. nach Schwangerschaft oder Familienplanung)?",
      "opts": [
            "Pflicht zur wahrheitsgemäßen Antwort",
            "Recht zur Lüge (Notlüge ohne Kündigungsrisiko)",
            "Ausschluss aus dem Bewerbungsverfahren",
            "Pflicht zur Zahlung von Schadenersatz"
      ],
      "a": 1,
      "ex": "Bei unzulässigen Fragen greift das Recht zur Lüge; der Arbeitgeber darf deswegen später nicht kündigen."
},
        {
      "theme": "wiko-kuendigung-frist",
      "cat": "WiKO",
      "q": "Welche Formvorschrift gilt zwingend für die Kündigung eines Arbeitsverhältnisses nach § 623 BGB?",
      "opts": [
            "E-Mail mit Lesebestätigung",
            "SMS oder WhatsApp-Nachricht",
            "Schriftform mit eigenhändiger Namensunterschrift auf Papier",
            "Mündliche Erklärung vor zwei Zeugen"
      ],
      "a": 2,
      "ex": "Kündigungen bedürfen zu ihrer Wirksamkeit der Schriftform (§ 623 BGB); elektronische Form ist ausgeschlossen."
},
        {
      "theme": "wiko-kuendigungsschutz",
      "cat": "WiKO",
      "q": "Innerhalb welcher Frist muss nach Erhalt einer schriftlichen Kündigung Kündigungsschutzklage erhoben werden?",
      "opts": [
            "Innerhalb von 1 Woche",
            "Innerhalb von 2 Wochen",
            "Innerhalb von 3 Wochen nach Zugang der Kündigung",
            "Innerhalb von 1 Monat zum Monatsende"
      ],
      "a": 2,
      "ex": "Die Kündigungsschutzklage muss innerhalb von 3 Wochen nach Zugang beim Arbeitsgericht erhoben werden (§ 4 KSchG)."
},
        {
      "theme": "wiko-betriebsrat-mitbestimmung",
      "cat": "WiKO",
      "q": "Welche Beteiligungsstufe hat der Betriebsrat nach § 87 BetrVG bei der Aufstellung von Dienstplänen?",
      "opts": [
            "Reine Information",
            "Einfache Anhörung",
            "Echte Mitbestimmung (Zustimmung zwingend erforderlich)",
            "Keinerlei Mitwirkungsrechte"
      ],
      "a": 2,
      "ex": "Bei Beginn und Ende der täglichen Arbeitszeit sowie Dienstplänen gilt echte Mitbestimmung nach § 87 Abs. 1 Nr. 2 BetrVG."
},
        {
      "theme": "wiko-tarifvertrag",
      "cat": "WiKO",
      "q": "Was besagt das Günstigkeitsprinzip im Tarifvertragsrecht (§ 4 Abs. 3 TVG)?",
      "opts": [
            "Der Einzelarbeitsvertrag bricht in jedem Fall den Tarifvertrag",
            "Abweichungen vom Tarifvertrag sind nur zugunsten des Arbeitnehmers zulässig",
            "Tarifverträge haben nur unverbindlichen Empfehlungscharakter",
            "Der Arbeitgeber kann tarifliche Mindestlöhne frei unterschreiten"
      ],
      "a": 1,
      "ex": "Günstigkeitsprinzip: Regelungen im Arbeitsvertrag dürfen nur abweichen, wenn sie für den Arbeitnehmer vorteilhafter sind."
},
        {
      "theme": "wiko-lohnabrechnung-sozial",
      "cat": "WiKO",
      "q": "Welcher Zweig der gesetzlichen Sozialversicherung wird zu 100 % allein vom Arbeitgeber getragen?",
      "opts": [
            "Gesetzliche Krankenversicherung",
            "Gesetzliche Rentenversicherung",
            "Gesetzliche Unfallversicherung (Berufsgenossenschaft)",
            "Gesetzliche Arbeitslosenversicherung"
      ],
      "a": 2,
      "ex": "Die Beiträge zur gesetzlichen Unfallversicherung zahlt der Arbeitgeber zu 100 % allein an die Berufsgenossenschaft."
},
    {
      "theme": "kaufvertrag",
      "cat": "WiKO",
      "q": "Ein Kaufvertrag entsteht durch …",
      "opts": [
        "Nur Werbung",
        "Zwei übereinstimmende Willenserklärungen (Angebot und Annahme)",
        "Nur Preisauszeichnung",
        "Nur Lieferung"
      ],
      "a": 1,
      "ex": "Angebot und Annahme."
    },
    {"theme": "wiso-thema-1", "cat": "WiSo Theorie", "q": "Thema 1 – Welcher Merksatz gehört zu „Aufgaben des Ausbildungsbetriebs“?", "opts": ["Zusammenarbeit ist Schlüssel zum Erfolg.", "Der Ausbildungsbetrieb vermittelt Theorie und Praxis.", "Dokumentation ist Pflicht.", "Motivation entsteht am ersten Tag."], "a": 1, "ex": "Der Ausbildungsbetrieb vermittelt Theorie und Praxis. – Doanh nghiệp đào tạo truyền đạt cả lý thuyết và thực hành."},
    {"theme": "wiso-thema-1", "cat": "WiSo Theorie", "q": "Thema 1 – Welcher Merksatz gehört zu „Rechte und Pflichten der Auszubildenden“?", "opts": ["Dokumentation ist Pflicht.", "Zusammenarbeit ist Schlüssel zum Erfolg.", "Azubis haben Rechte und Pflichten.", "Ausbilder haben Fürsorge- und Ausbildungspflicht."], "a": 2, "ex": "Azubis haben Rechte und Pflichten. – Học viên có cả quyền và nghĩa vụ."},
    {"theme": "wiso-thema-1", "cat": "WiSo Theorie", "q": "Thema 1 – Welcher Merksatz gehört zu „Rechte und Pflichten der Ausbilder“?", "opts": ["Der Ausbildungsbetrieb vermittelt Theorie und Praxis.", "Organisation im Betrieb schafft Klarheit.", "Azubis haben Rechte und Pflichten.", "Ausbilder haben Fürsorge- und Ausbildungspflicht."], "a": 3, "ex": "Ausbilder haben Fürsorge- und Ausbildungspflicht. – Người đào tạo có nghĩa vụ chăm lo và giảng dạy."},
    {"theme": "wiso-thema-1", "cat": "WiSo Theorie", "q": "Thema 1 – Welcher Merksatz gehört zu „Organisation und Struktur des Betriebs“?", "opts": ["Zusammenarbeit ist Schlüssel zum Erfolg.", "Azubis haben Rechte und Pflichten.", "Dokumentation ist Pflicht.", "Organisation im Betrieb schafft Klarheit."], "a": 3, "ex": "Organisation im Betrieb schafft Klarheit. – Tổ chức trong doanh nghiệp tạo sự rõ ràng."},
    {"theme": "wiso-thema-1", "cat": "WiSo Theorie", "q": "Thema 1 – Welcher Merksatz gehört zu „Zusammenarbeit im Betrieb“?", "opts": ["Azubis haben Rechte und Pflichten.", "Zusammenarbeit ist Schlüssel zum Erfolg.", "Motivation entsteht am ersten Tag.", "Der Ausbildungsbetrieb vermittelt Theorie und Praxis."], "a": 1, "ex": "Zusammenarbeit ist Schlüssel zum Erfolg. – Hợp tác là chìa khóa thành công."},
    {"theme": "wiso-thema-1", "cat": "WiSo Beispiel", "q": "Thema 1 – Zu welchem Punkt passt das Beispiel: „Azubi lernt Hygienevorschriften.“?", "opts": ["Organisation und Struktur des Betriebs", "Aufgaben des Ausbildungsbetriebs", "Rechte und Pflichten der Ausbilder", "Zusammenarbeit im Betrieb"], "a": 1, "ex": "Aufgaben des Ausbildungsbetriebs (Nhiệm vụ của doanh nghiệp đào tạo)"},
    {"theme": "wiso-thema-1", "cat": "WiSo Beispiel", "q": "Thema 1 – Zu welchem Punkt passt das Beispiel: „Azubi bekommt Ausbildungsplan.“?", "opts": ["Aufgaben des Ausbildungsbetriebs", "Rechte und Pflichten der Ausbilder", "Organisation und Struktur des Betriebs", "Rechte und Pflichten der Auszubildenden"], "a": 3, "ex": "Rechte und Pflichten der Auszubildenden (Quyền & nghĩa vụ của học viên)"},
    {"theme": "wiso-thema-1", "cat": "WiSo Beispiel", "q": "Thema 1 – Zu welchem Punkt passt das Beispiel: „Azubi respektiert Anweisungen des Ausbilders.“?", "opts": ["Aufgaben des Ausbildungsbetriebs", "Rechte und Pflichten der Ausbilder", "Zusammenarbeit im Betrieb", "Organisation und Struktur des Betriebs"], "a": 1, "ex": "Rechte und Pflichten der Ausbilder (Quyền & nghĩa vụ của người đào tạo)"},
    {"theme": "wiso-thema-1", "cat": "WiSo Beispiel", "q": "Thema 1 – Zu welchem Punkt passt das Beispiel: „Filialleiter über Teamleiter → Mitarbeiter.“?", "opts": ["Aufgaben des Ausbildungsbetriebs", "Zusammenarbeit im Betrieb", "Rechte und Pflichten der Ausbilder", "Organisation und Struktur des Betriebs"], "a": 3, "ex": "Organisation und Struktur des Betriebs (Cấu trúc & tổ chức doanh nghiệp)"},
    {"theme": "wiso-thema-1", "cat": "WiSo Beispiel", "q": "Thema 1 – Zu welchem Punkt passt das Beispiel: „Azubi hilft Kollegen im Stoßgeschäft.“?", "opts": ["Rechte und Pflichten der Ausbilder", "Aufgaben des Ausbildungsbetriebs", "Rechte und Pflichten der Auszubildenden", "Zusammenarbeit im Betrieb"], "a": 3, "ex": "Zusammenarbeit im Betrieb (Hợp tác trong doanh nghiệp)"},
    {"theme": "wiso-thema-2", "cat": "WiSo Theorie", "q": "Thema 2 – Welcher Merksatz gehört zu „Inhalte des Ausbildungsvertrags“?", "opts": ["Der Ausbildungsvertrag ist die Grundlage.", "Rechte und Pflichten beider Seiten müssen im Gleichgewicht sein.", "Arbeitszeit ist gesetzlich geregelt.", "Dauer der Ausbildung kann variieren."], "a": 0, "ex": "Der Ausbildungsvertrag ist die Grundlage. – Hợp đồng đào tạo là nền tảng."},
    {"theme": "wiso-thema-2", "cat": "WiSo Theorie", "q": "Thema 2 – Welcher Merksatz gehört zu „Dauer der Ausbildung“?", "opts": ["Arbeitszeit ist gesetzlich geregelt.", "Dauer der Ausbildung kann variieren.", "Probezeit ist entscheidend.", "Der Ausbildungsvertrag ist die Grundlage."], "a": 1, "ex": "Dauer der Ausbildung kann variieren. – Thời gian đào tạo có thể thay đổi."},
    {"theme": "wiso-thema-2", "cat": "WiSo Theorie", "q": "Thema 2 – Welcher Merksatz gehört zu „Arbeitszeitregelungen“?", "opts": ["Vergütung und Urlaub sind Rechte des Azubis.", "Rechte und Pflichten beider Seiten müssen im Gleichgewicht sein.", "Arbeitszeit ist gesetzlich geregelt.", "Der Ausbildungsvertrag ist die Grundlage."], "a": 2, "ex": "Arbeitszeit ist gesetzlich geregelt. – Giờ làm việc được quy định bởi luật."},
    {"theme": "wiso-thema-2", "cat": "WiSo Theorie", "q": "Thema 2 – Welcher Merksatz gehört zu „Vergütung und Urlaub“?", "opts": ["Kündigung nach Probezeit nur mit Gründen.", "Der Ausbildungsvertrag ist die Grundlage.", "Dauer der Ausbildung kann variieren.", "Vergütung und Urlaub sind Rechte des Azubis."], "a": 3, "ex": "Vergütung und Urlaub sind Rechte des Azubis. – Lương & ngày nghỉ là quyền của học viên."},
    {"theme": "wiso-thema-2", "cat": "WiSo Theorie", "q": "Thema 2 – Welcher Merksatz gehört zu „Beendigung und Kündigung“?", "opts": ["Dauer der Ausbildung kann variieren.", "Probezeit ist entscheidend.", "Kündigung nach Probezeit nur mit Gründen.", "Rechte und Pflichten beider Seiten müssen im Gleichgewicht sein."], "a": 1, "ex": "Probezeit ist entscheidend. – Thời gian thử việc rất quan trọng."},
    {"theme": "wiso-thema-2", "cat": "WiSo Beispiel", "q": "Thema 2 – Zu welchem Punkt passt das Beispiel: „Vertrag zwischen Azubi und Betrieb.“?", "opts": ["Vergütung und Urlaub", "Beendigung und Kündigung", "Arbeitszeitregelungen", "Inhalte des Ausbildungsvertrags"], "a": 3, "ex": "Inhalte des Ausbildungsvertrags (Nội dung hợp đồng đào tạo)"},
    {"theme": "wiso-thema-2", "cat": "WiSo Beispiel", "q": "Thema 2 – Zu welchem Punkt passt das Beispiel: „Systemgastronomie = 2 Jahre.“?", "opts": ["Arbeitszeitregelungen", "Beendigung und Kündigung", "Dauer der Ausbildung", "Inhalte des Ausbildungsvertrags"], "a": 2, "ex": "Dauer der Ausbildung (Thời gian đào tạo)"},
    {"theme": "wiso-thema-2", "cat": "WiSo Beispiel", "q": "Thema 2 – Zu welchem Punkt passt das Beispiel: „Azubi unter 18: max. 40 Std./Woche.“?", "opts": ["Dauer der Ausbildung", "Beendigung und Kündigung", "Inhalte des Ausbildungsvertrags", "Arbeitszeitregelungen"], "a": 3, "ex": "Arbeitszeitregelungen (Quy định giờ làm việc)"},
    {"theme": "wiso-thema-2", "cat": "WiSo Beispiel", "q": "Thema 2 – Zu welchem Punkt passt das Beispiel: „Azubi erhält 800 €/Monat.“?", "opts": ["Vergütung und Urlaub", "Inhalte des Ausbildungsvertrags", "Beendigung und Kündigung", "Dauer der Ausbildung"], "a": 0, "ex": "Vergütung und Urlaub (Lương & ngày nghỉ)"},
    {"theme": "wiso-thema-2", "cat": "WiSo Beispiel", "q": "Thema 2 – Zu welchem Punkt passt das Beispiel: „Vertrag endet nach Abschlussprüfung.“?", "opts": ["Arbeitszeitregelungen", "Beendigung und Kündigung", "Vergütung und Urlaub", "Inhalte des Ausbildungsvertrags"], "a": 1, "ex": "Beendigung und Kündigung (Kết thúc & chấm dứt hợp đồng)"},
    {"theme": "wiso-thema-3", "cat": "WiSo Theorie", "q": "Thema 3 – Welcher Merksatz gehört zu „Rechte des Betriebsrats“?", "opts": ["Der Betriebsrat ist die Stimme der Mitarbeiter.", "JAV ist speziell für Azubis wichtig.", "Mitbestimmung schützt vor Willkür.", "Alle Mitarbeiter sollten ihre Rechte kennen."], "a": 0, "ex": "Der Betriebsrat ist die Stimme der Mitarbeiter. – Hội đồng nhân viên là tiếng nói của nhân viên."},
    {"theme": "wiso-thema-3", "cat": "WiSo Theorie", "q": "Thema 3 – Welcher Merksatz gehört zu „Aufgaben des Betriebsrats“?", "opts": ["Alle Mitarbeiter sollten ihre Rechte kennen.", "JAV ist speziell für Azubis wichtig.", "Zusammenarbeit zwischen Betriebsrat, JAV und Chef ist entscheidend.", "Arbeitszeit und Kündigung sind zentrale Mitbestimmungsrechte."], "a": 1, "ex": "JAV ist speziell für Azubis wichtig. – JAV đặc biệt quan trọng cho học viên."},
    {"theme": "wiso-thema-3", "cat": "WiSo Theorie", "q": "Thema 3 – Welcher Merksatz gehört zu „Jugend- und Auszubildendenvertretung (JAV)“?", "opts": ["Mitbestimmung schützt vor Willkür.", "Arbeitszeit und Kündigung sind zentrale Mitbestimmungsrechte.", "JAV ist speziell für Azubis wichtig.", "Mitbestimmung fördert Motivation und Fairness."], "a": 1, "ex": "Arbeitszeit und Kündigung sind zentrale Mitbestimmungsrechte. – Giờ làm và chấm dứt hợp đồng là quyền tham gia quan trọng nhất."},
    {"theme": "wiso-thema-3", "cat": "WiSo Theorie", "q": "Thema 3 – Welcher Merksatz gehört zu „Mitbestimmung bei Arbeitszeit“?", "opts": ["Mitbestimmung schützt vor Willkür.", "Alle Mitarbeiter sollten ihre Rechte kennen.", "JAV ist speziell für Azubis wichtig.", "Mitbestimmung fördert Motivation und Fairness."], "a": 0, "ex": "Mitbestimmung schützt vor Willkür. – Tham gia quyết định giúp chống lại sự tùy tiện."},
    {"theme": "wiso-thema-3", "cat": "WiSo Theorie", "q": "Thema 3 – Welcher Merksatz gehört zu „Mitbestimmung bei Kündigung“?", "opts": ["Mitbestimmung schützt vor Willkür.", "Alle Mitarbeiter sollten ihre Rechte kennen.", "Zusammenarbeit zwischen Betriebsrat, JAV und Chef ist entscheidend.", "Der Betriebsrat ist die Stimme der Mitarbeiter."], "a": 2, "ex": "Zusammenarbeit zwischen Betriebsrat, JAV und Chef ist entscheidend. – Sự phối hợp giữa hội đồng, JAV và sếp là yếu tố then chốt."},
    {"theme": "wiso-thema-3", "cat": "WiSo Beispiel", "q": "Thema 3 – Zu welchem Punkt passt das Beispiel: „Betriebsrat stimmt Dienstplanänderung zu.“?", "opts": ["Rechte des Betriebsrats", "Jugend- und Auszubildendenvertretung (JAV)", "Mitbestimmung bei Kündigung", "Aufgaben des Betriebsrats"], "a": 0, "ex": "Rechte des Betriebsrats (Quyền của hội đồng nhân viên)"},
    {"theme": "wiso-thema-3", "cat": "WiSo Beispiel", "q": "Thema 3 – Zu welchem Punkt passt das Beispiel: „Betriebsrat fordert bessere Pausenregelung.“?", "opts": ["Mitbestimmung bei Arbeitszeit", "Aufgaben des Betriebsrats", "Mitbestimmung bei Kündigung", "Jugend- und Auszubildendenvertretung (JAV)"], "a": 1, "ex": "Aufgaben des Betriebsrats (Nhiệm vụ của hội đồng nhân viên)"},
    {"theme": "wiso-thema-3", "cat": "WiSo Beispiel", "q": "Thema 3 – Zu welchem Punkt passt das Beispiel: „JAV kümmert sich um Azubi-Anliegen.“?", "opts": ["Rechte des Betriebsrats", "Jugend- und Auszubildendenvertretung (JAV)", "Mitbestimmung bei Kündigung", "Mitbestimmung bei Arbeitszeit"], "a": 1, "ex": "Jugend- und Auszubildendenvertretung (JAV) (Đại diện học viên & thanh niên)"},
    {"theme": "wiso-thema-3", "cat": "WiSo Beispiel", "q": "Thema 3 – Zu welchem Punkt passt das Beispiel: „Betriebsrat stimmt Schichtsystem zu.“?", "opts": ["Rechte des Betriebsrats", "Jugend- und Auszubildendenvertretung (JAV)", "Mitbestimmung bei Kündigung", "Mitbestimmung bei Arbeitszeit"], "a": 3, "ex": "Mitbestimmung bei Arbeitszeit (Tham gia quyết định giờ làm)"},
    {"theme": "wiso-thema-3", "cat": "WiSo Beispiel", "q": "Thema 3 – Zu welchem Punkt passt das Beispiel: „Kündigung ohne Betriebsrat nicht gültig.“?", "opts": ["Mitbestimmung bei Arbeitszeit", "Aufgaben des Betriebsrats", "Rechte des Betriebsrats", "Mitbestimmung bei Kündigung"], "a": 3, "ex": "Mitbestimmung bei Kündigung (Tham gia quyết định chấm dứt hợp đồng)"},
    {"theme": "wiso-thema-4", "cat": "WiSo Theorie", "q": "Thema 4 – Welcher Merksatz gehört zu „Wandel durch Digitalisierung“?", "opts": ["Anpassungsfähigkeit entscheidet über Erfolg.", "Flexibilität ist Voraussetzung auf dem Arbeitsmarkt.", "Fachkräftemangel ist eine große Herausforderung.", "Digitalisierung verändert alle Berufe."], "a": 3, "ex": "Digitalisierung verändert alle Berufe. – Số hóa thay đổi mọi ngành nghề."},
    {"theme": "wiso-thema-4", "cat": "WiSo Theorie", "q": "Thema 4 – Welcher Merksatz gehört zu „Strukturwandel in der Gastronomie“?", "opts": ["Fachkräftemangel ist eine große Herausforderung.", "Lebenslanges Lernen ist Pflicht, nicht Wahl.", "Flexibilität ist Voraussetzung auf dem Arbeitsmarkt.", "Strukturwandel betrifft Gastronomie stark."], "a": 3, "ex": "Strukturwandel betrifft Gastronomie stark. – Ngành ẩm thực chịu tác động lớn của chuyển đổi."},
    {"theme": "wiso-thema-4", "cat": "WiSo Theorie", "q": "Thema 4 – Welcher Merksatz gehört zu „Arbeitsmarkt und Berufe“?", "opts": ["Fachkräftemangel ist eine große Herausforderung.", "Digitalisierung verändert alle Berufe.", "Anpassungsfähigkeit entscheidet über Erfolg.", "Flexibilität ist Voraussetzung auf dem Arbeitsmarkt."], "a": 3, "ex": "Flexibilität ist Voraussetzung auf dem Arbeitsmarkt. – Linh hoạt là điều kiện tiên quyết trên thị trường lao động."},
    {"theme": "wiso-thema-4", "cat": "WiSo Theorie", "q": "Thema 4 – Welcher Merksatz gehört zu „Fachkräftemangel“?", "opts": ["Lebenslanges Lernen ist Pflicht, nicht Wahl.", "Flexibilität ist Voraussetzung auf dem Arbeitsmarkt.", "Fachkräftemangel ist eine große Herausforderung.", "Digitalisierung verändert alle Berufe."], "a": 2, "ex": "Fachkräftemangel ist eine große Herausforderung. – Thiếu hụt lao động có tay nghề là thách thức lớn."},
    {"theme": "wiso-thema-4", "cat": "WiSo Theorie", "q": "Thema 4 – Welcher Merksatz gehört zu „Lebenslanges Lernen“?", "opts": ["Digitalisierung verändert alle Berufe.", "Flexibilität ist Voraussetzung auf dem Arbeitsmarkt.", "Fachkräftemangel ist eine große Herausforderung.", "Lebenslanges Lernen ist Pflicht, nicht Wahl."], "a": 3, "ex": "Lebenslanges Lernen ist Pflicht, nicht Wahl. – Học tập suốt đời là bắt buộc, không phải tùy chọn."},
    {"theme": "wiso-thema-4", "cat": "WiSo Beispiel", "q": "Thema 4 – Zu welchem Punkt passt das Beispiel: „Bestellungen per Tablet aufnehmen.“?", "opts": ["Arbeitsmarkt und Berufe", "Fachkräftemangel", "Wandel durch Digitalisierung", "Strukturwandel in der Gastronomie"], "a": 2, "ex": "Wandel durch Digitalisierung (Thay đổi do số hóa)"},
    {"theme": "wiso-thema-4", "cat": "WiSo Beispiel", "q": "Thema 4 – Zu welchem Punkt passt das Beispiel: „Subway expandiert in vielen Städten.“?", "opts": ["Arbeitsmarkt und Berufe", "Strukturwandel in der Gastronomie", "Wandel durch Digitalisierung", "Lebenslanges Lernen"], "a": 1, "ex": "Strukturwandel in der Gastronomie (Chuyển đổi trong ngành ẩm thực)"},
    {"theme": "wiso-thema-4", "cat": "WiSo Beispiel", "q": "Thema 4 – Zu welchem Punkt passt das Beispiel: „Job: Fachkraft für Systemgastronomie.“?", "opts": ["Fachkräftemangel", "Lebenslanges Lernen", "Wandel durch Digitalisierung", "Arbeitsmarkt und Berufe"], "a": 3, "ex": "Arbeitsmarkt und Berufe (Thị trường lao động & nghề nghiệp)"},
    {"theme": "wiso-thema-4", "cat": "WiSo Beispiel", "q": "Thema 4 – Zu welchem Punkt passt das Beispiel: „Viele verlassen Gastronomie wegen Arbeitszeiten.“?", "opts": ["Strukturwandel in der Gastronomie", "Fachkräftemangel", "Arbeitsmarkt und Berufe", "Lebenslanges Lernen"], "a": 1, "ex": "Fachkräftemangel (Thiếu hụt lao động có tay nghề)"},
    {"theme": "wiso-thema-4", "cat": "WiSo Beispiel", "q": "Thema 4 – Zu welchem Punkt passt das Beispiel: „Kurs über neue Kassensysteme.“?", "opts": ["Wandel durch Digitalisierung", "Strukturwandel in der Gastronomie", "Lebenslanges Lernen", "Fachkräftemangel"], "a": 2, "ex": "Lebenslanges Lernen (Học tập suốt đời)"},
    {"theme": "wiso-thema-5", "cat": "WiSo Theorie", "q": "Thema 5 – Welcher Merksatz gehört zu „Krankenversicherung“?", "opts": ["Jede Versicherung schützt vor speziellen Risiken.", "Sozialversicherung besteht aus 5 Säulen.", "Kenntnisse der Sozialversicherung sind prüfungsrelevant.", "Ohne Versicherung → keine finanzielle Sicherheit."], "a": 1, "ex": "Sozialversicherung besteht aus 5 Säulen. – Bảo hiểm xã hội có 5 trụ cột."},
    {"theme": "wiso-thema-5", "cat": "WiSo Theorie", "q": "Thema 5 – Welcher Merksatz gehört zu „Rentenversicherung“?", "opts": ["Beiträge werden automatisch vom Lohn abgezogen.", "Jede Versicherung schützt vor speziellen Risiken.", "Kenntnisse der Sozialversicherung sind prüfungsrelevant.", "Versicherung ist Pflicht für alle Arbeitnehmer."], "a": 1, "ex": "Jede Versicherung schützt vor speziellen Risiken. – Mỗi loại bảo hiểm bảo vệ trước một rủi ro riêng."},
    {"theme": "wiso-thema-5", "cat": "WiSo Theorie", "q": "Thema 5 – Welcher Merksatz gehört zu „Arbeitslosenversicherung“?", "opts": ["Beiträge werden automatisch vom Lohn abgezogen.", "Ohne Versicherung → keine finanzielle Sicherheit.", "Arbeitgeber und Arbeitnehmer teilen Beiträge.", "Versicherung ist Pflicht für alle Arbeitnehmer."], "a": 0, "ex": "Beiträge werden automatisch vom Lohn abgezogen. – Khoản đóng được tự động trừ từ lương."},
    {"theme": "wiso-thema-5", "cat": "WiSo Theorie", "q": "Thema 5 – Welcher Merksatz gehört zu „Pflegeversicherung“?", "opts": ["Kenntnisse der Sozialversicherung sind prüfungsrelevant.", "Beiträge werden automatisch vom Lohn abgezogen.", "Versicherung ist Pflicht für alle Arbeitnehmer.", "Jede Versicherung schützt vor speziellen Risiken."], "a": 2, "ex": "Versicherung ist Pflicht für alle Arbeitnehmer. – Bảo hiểm là bắt buộc cho mọi người lao động."},
    {"theme": "wiso-thema-5", "cat": "WiSo Theorie", "q": "Thema 5 – Welcher Merksatz gehört zu „Unfallversicherung“?", "opts": ["Beiträge werden automatisch vom Lohn abgezogen.", "Jede Versicherung schützt vor speziellen Risiken.", "Ohne Versicherung → keine finanzielle Sicherheit.", "Versicherung ist Pflicht für alle Arbeitnehmer."], "a": 2, "ex": "Ohne Versicherung → keine finanzielle Sicherheit. – Không có bảo hiểm → không có an toàn tài chính."},
    {"theme": "wiso-thema-5", "cat": "WiSo Beispiel", "q": "Thema 5 – Zu welchem Punkt passt das Beispiel: „Azubi geht zum Arzt, Krankenkasse zahlt.“?", "opts": ["Arbeitslosenversicherung", "Rentenversicherung", "Unfallversicherung", "Krankenversicherung"], "a": 3, "ex": "Krankenversicherung (Bảo hiểm y tế)"},
    {"theme": "wiso-thema-5", "cat": "WiSo Beispiel", "q": "Thema 5 – Zu welchem Punkt passt das Beispiel: „Monatlich wird Beitrag vom Lohn abgezogen.“?", "opts": ["Pflegeversicherung", "Krankenversicherung", "Rentenversicherung", "Arbeitslosenversicherung"], "a": 2, "ex": "Rentenversicherung (Bảo hiểm hưu trí)"},
    {"theme": "wiso-thema-5", "cat": "WiSo Beispiel", "q": "Thema 5 – Zu welchem Punkt passt das Beispiel: „Mitarbeiter verliert Job → ALG I.“?", "opts": ["Arbeitslosenversicherung", "Unfallversicherung", "Rentenversicherung", "Pflegeversicherung"], "a": 0, "ex": "Arbeitslosenversicherung (Bảo hiểm thất nghiệp)"},
    {"theme": "wiso-thema-5", "cat": "WiSo Beispiel", "q": "Thema 5 – Zu welchem Punkt passt das Beispiel: „Alter Mensch bekommt Pflegegeld.“?", "opts": ["Arbeitslosenversicherung", "Pflegeversicherung", "Unfallversicherung", "Krankenversicherung"], "a": 1, "ex": "Pflegeversicherung (Bảo hiểm chăm sóc)"},
    {"theme": "wiso-thema-5", "cat": "WiSo Beispiel", "q": "Thema 5 – Zu welchem Punkt passt das Beispiel: „Azubi verletzt sich in Küche, Versicherung zahlt.“?", "opts": ["Arbeitslosenversicherung", "Unfallversicherung", "Rentenversicherung", "Pflegeversicherung"], "a": 1, "ex": "Unfallversicherung (Bảo hiểm tai nạn)"},
    {"theme": "wiso-thema-6", "cat": "WiSo Theorie", "q": "Thema 6 – Welcher Merksatz gehört zu „Private Vorsorge“?", "opts": ["Sozial- und Lebensplanung gehört ins Prüfungsthema.", "Weiterbildung erhöht Karrierechancen.", "Soziale Sicherung ist mehr als Pflichtversicherung.", "Work-Life-Balance ist Voraussetzung für Gesundheit."], "a": 2, "ex": "Soziale Sicherung ist mehr als Pflichtversicherung. – An sinh xã hội không chỉ là bảo hiểm bắt buộc."},
    {"theme": "wiso-thema-6", "cat": "WiSo Theorie", "q": "Thema 6 – Welcher Merksatz gehört zu „Betriebliche Altersvorsorge“?", "opts": ["Klare Karriereplanung motiviert.", "Arbeitgeber profitieren von motivierten Mitarbeitern.", "Weiterbildung erhöht Karrierechancen.", "Betriebliche Altersvorsorge lohnt sich langfristig."], "a": 3, "ex": "Betriebliche Altersvorsorge lohnt sich langfristig. – Lương hưu doanh nghiệp có lợi về lâu dài."},
    {"theme": "wiso-thema-6", "cat": "WiSo Theorie", "q": "Thema 6 – Welcher Merksatz gehört zu „Weiterbildung“?", "opts": ["Work-Life-Balance ist Voraussetzung für Gesundheit.", "Klare Karriereplanung motiviert.", "Soziale Sicherung ist mehr als Pflichtversicherung.", "Weiterbildung erhöht Karrierechancen."], "a": 3, "ex": "Weiterbildung erhöht Karrierechancen. – Đào tạo nâng cao giúp tăng cơ hội nghề nghiệp."},
    {"theme": "wiso-thema-6", "cat": "WiSo Theorie", "q": "Thema 6 – Welcher Merksatz gehört zu „Karriereplanung“?", "opts": ["Weiterbildung erhöht Karrierechancen.", "Klare Karriereplanung motiviert.", "Work-Life-Balance ist Voraussetzung für Gesundheit.", "Betriebliche Altersvorsorge lohnt sich langfristig."], "a": 1, "ex": "Klare Karriereplanung motiviert. – Lập kế hoạch nghề nghiệp rõ ràng tạo động lực."},
    {"theme": "wiso-thema-6", "cat": "WiSo Theorie", "q": "Thema 6 – Welcher Merksatz gehört zu „Work-Life-Balance“?", "opts": ["Arbeitgeber profitieren von motivierten Mitarbeitern.", "Soziale Sicherung ist mehr als Pflichtversicherung.", "Work-Life-Balance ist Voraussetzung für Gesundheit.", "Klare Karriereplanung motiviert."], "a": 2, "ex": "Work-Life-Balance ist Voraussetzung für Gesundheit. – Cân bằng công việc & cuộc sống là điều kiện để khỏe mạnh."},
    {"theme": "wiso-thema-6", "cat": "WiSo Beispiel", "q": "Thema 6 – Zu welchem Punkt passt das Beispiel: „Azubi schließt Zahnzusatzversicherung ab.“?", "opts": ["Karriereplanung", "Private Vorsorge", "Work-Life-Balance", "Betriebliche Altersvorsorge"], "a": 1, "ex": "Private Vorsorge (Dự phòng cá nhân)"},
    {"theme": "wiso-thema-6", "cat": "WiSo Beispiel", "q": "Thema 6 – Zu welchem Punkt passt das Beispiel: „Firma zahlt in Rentenkasse ein.“?", "opts": ["Betriebliche Altersvorsorge", "Weiterbildung", "Karriereplanung", "Private Vorsorge"], "a": 0, "ex": "Betriebliche Altersvorsorge (Lương hưu doanh nghiệp)"},
    {"theme": "wiso-thema-6", "cat": "WiSo Beispiel", "q": "Thema 6 – Zu welchem Punkt passt das Beispiel: „Azubi besucht Hygiene-Seminar.“?", "opts": ["Weiterbildung", "Betriebliche Altersvorsorge", "Karriereplanung", "Private Vorsorge"], "a": 0, "ex": "Weiterbildung (Đào tạo nâng cao)"},
    {"theme": "wiso-thema-6", "cat": "WiSo Beispiel", "q": "Thema 6 – Zu welchem Punkt passt das Beispiel: „Azubi möchte später Filialleiter werden.“?", "opts": ["Work-Life-Balance", "Private Vorsorge", "Betriebliche Altersvorsorge", "Karriereplanung"], "a": 3, "ex": "Karriereplanung (Lập kế hoạch nghề nghiệp)"},
    {"theme": "wiso-thema-6", "cat": "WiSo Beispiel", "q": "Thema 6 – Zu welchem Punkt passt das Beispiel: „Mitarbeiter treibt regelmäßig Sport.“?", "opts": ["Karriereplanung", "Private Vorsorge", "Betriebliche Altersvorsorge", "Work-Life-Balance"], "a": 3, "ex": "Work-Life-Balance (Cân bằng công việc & cuộc sống)"},
    {"theme": "wiso-thema-7", "cat": "WiSo Theorie", "q": "Thema 7 – Welcher Merksatz gehört zu „Rechte der Verbraucher“?", "opts": ["Unternehmen haben Informationspflicht.", "Produkthaftung schützt den Kunden.", "Thema oft in Prüfungen: Vertragsrecht + Verbraucherrechte.", "Verbraucherrechte sichern Fairness."], "a": 3, "ex": "Verbraucherrechte sichern Fairness. – Quyền người tiêu dùng đảm bảo công bằng."},
    {"theme": "wiso-thema-7", "cat": "WiSo Theorie", "q": "Thema 7 – Welcher Merksatz gehört zu „Pflichten der Unternehmen“?", "opts": ["Werbung darf nicht täuschen.", "Unternehmen haben Informationspflicht.", "Produkthaftung schützt den Kunden.", "Jugendschutz ist zwingend einzuhalten."], "a": 1, "ex": "Unternehmen haben Informationspflicht. – Doanh nghiệp có nghĩa vụ cung cấp thông tin."},
    {"theme": "wiso-thema-7", "cat": "WiSo Theorie", "q": "Thema 7 – Welcher Merksatz gehört zu „Vertragsabschluss“?", "opts": ["Verbraucherrechte sichern Fairness.", "Unternehmen haben Informationspflicht.", "Werbung darf nicht täuschen.", "Vertragsabschluss ist alltäglich."], "a": 3, "ex": "Vertragsabschluss ist alltäglich. – Ký kết hợp đồng diễn ra hằng ngày."},
    {"theme": "wiso-thema-7", "cat": "WiSo Theorie", "q": "Thema 7 – Welcher Merksatz gehört zu „Produkthaftung“?", "opts": ["Produkthaftung schützt den Kunden.", "Werbung darf nicht täuschen.", "Unternehmen haben Informationspflicht.", "Thema oft in Prüfungen: Vertragsrecht + Verbraucherrechte."], "a": 0, "ex": "Produkthaftung schützt den Kunden. – Trách nhiệm sản phẩm bảo vệ khách hàng."},
    {"theme": "wiso-thema-7", "cat": "WiSo Theorie", "q": "Thema 7 – Welcher Merksatz gehört zu „Werbung und Marketing“?", "opts": ["Werbung darf nicht täuschen.", "Jugendschutz ist zwingend einzuhalten.", "Verbraucherrechte sichern Fairness.", "Produkthaftung schützt den Kunden."], "a": 0, "ex": "Werbung darf nicht täuschen. – Quảng cáo không được lừa dối."},
    {"theme": "wiso-thema-7", "cat": "WiSo Beispiel", "q": "Thema 7 – Zu welchem Punkt passt das Beispiel: „Kunde kann Online-Bestellung innerhalb 14 Tage stornieren.“?", "opts": ["Rechte der Verbraucher", "Vertragsabschluss", "Werbung und Marketing", "Produkthaftung"], "a": 0, "ex": "Rechte der Verbraucher (Quyền của người tiêu dùng)"},
    {"theme": "wiso-thema-7", "cat": "WiSo Beispiel", "q": "Thema 7 – Zu welchem Punkt passt das Beispiel: „Subway informiert über Allergene.“?", "opts": ["Pflichten der Unternehmen", "Vertragsabschluss", "Rechte der Verbraucher", "Werbung und Marketing"], "a": 0, "ex": "Pflichten der Unternehmen (Nghĩa vụ của doanh nghiệp)"},
    {"theme": "wiso-thema-7", "cat": "WiSo Beispiel", "q": "Thema 7 – Zu welchem Punkt passt das Beispiel: „Kunde bestellt Menü = Angebot angenommen.“?", "opts": ["Rechte der Verbraucher", "Pflichten der Unternehmen", "Werbung und Marketing", "Vertragsabschluss"], "a": 3, "ex": "Vertragsabschluss (Ký kết hợp đồng)"},
    {"theme": "wiso-thema-7", "cat": "WiSo Beispiel", "q": "Thema 7 – Zu welchem Punkt passt das Beispiel: „Kunde erkrankt wegen verdorbenem Essen.“?", "opts": ["Rechte der Verbraucher", "Produkthaftung", "Vertragsabschluss", "Werbung und Marketing"], "a": 1, "ex": "Produkthaftung (Trách nhiệm sản phẩm)"},
    {"theme": "wiso-thema-7", "cat": "WiSo Beispiel", "q": "Thema 7 – Zu welchem Punkt passt das Beispiel: „Aktion: 2 Sandwiches zum Preis von 1.“?", "opts": ["Vertragsabschluss", "Produkthaftung", "Rechte der Verbraucher", "Werbung und Marketing"], "a": 3, "ex": "Werbung und Marketing (Quảng cáo & tiếp thị)"},
    {"theme": "wiso-thema-8", "cat": "WiSo Theorie", "q": "Thema 8 – Welcher Merksatz gehört zu „Rechtsfähigkeit“?", "opts": ["Rechtsfähigkeit hat jeder Mensch.", "Praxis: Arbeitsverträge, Kaufverträge, Lieferverträge.", "Anfechtung schützt vor Fehlern und Täuschung.", "Nichtigkeit macht Vertrag von Anfang an ungültig."], "a": 0, "ex": "Rechtsfähigkeit hat jeder Mensch. – Mọi người đều có năng lực pháp luật."},
    {"theme": "wiso-thema-8", "cat": "WiSo Theorie", "q": "Thema 8 – Welcher Merksatz gehört zu „Geschäftsfähigkeit“?", "opts": ["Geschäftsfähigkeit hängt vom Alter ab.", "Jeder Vertrag braucht Angebot + Annahme.", "Anfechtung schützt vor Fehlern und Täuschung.", "Nichtigkeit macht Vertrag von Anfang an ungültig."], "a": 0, "ex": "Geschäftsfähigkeit hängt vom Alter ab. – Năng lực hành vi phụ thuộc vào độ tuổi."},
    {"theme": "wiso-thema-8", "cat": "WiSo Theorie", "q": "Thema 8 – Welcher Merksatz gehört zu „Vertragsschluss“?", "opts": ["Geschäftsfähigkeit hängt vom Alter ab.", "Nichtigkeit macht Vertrag von Anfang an ungültig.", "Rechtsfähigkeit hat jeder Mensch.", "Jeder Vertrag braucht Angebot + Annahme."], "a": 3, "ex": "Jeder Vertrag braucht Angebot + Annahme. – Mọi hợp đồng cần có đề nghị + chấp nhận."},
    {"theme": "wiso-thema-8", "cat": "WiSo Theorie", "q": "Thema 8 – Welcher Merksatz gehört zu „Anfechtung“?", "opts": ["Verträge sind Prüfungsstoff Nr. 1.", "Rechtsfähigkeit hat jeder Mensch.", "Anfechtung schützt vor Fehlern und Täuschung.", "Praxis: Arbeitsverträge, Kaufverträge, Lieferverträge."], "a": 2, "ex": "Anfechtung schützt vor Fehlern und Täuschung. – Hủy hợp đồng bảo vệ khỏi sai sót & lừa dối."},
    {"theme": "wiso-thema-8", "cat": "WiSo Theorie", "q": "Thema 8 – Welcher Merksatz gehört zu „Nichtigkeit“?", "opts": ["Verträge sind Prüfungsstoff Nr. 1.", "Rechtsfähigkeit hat jeder Mensch.", "Nichtigkeit macht Vertrag von Anfang an ungültig.", "Jeder Vertrag braucht Angebot + Annahme."], "a": 2, "ex": "Nichtigkeit macht Vertrag von Anfang an ungültig. – Vô hiệu = hợp đồng không có giá trị từ đầu."},
    {"theme": "wiso-thema-8", "cat": "WiSo Beispiel", "q": "Thema 8 – Zu welchem Punkt passt das Beispiel: „Azubi darf Eigentum besitzen.“?", "opts": ["Geschäftsfähigkeit", "Rechtsfähigkeit", "Nichtigkeit", "Vertragsschluss"], "a": 1, "ex": "Rechtsfähigkeit (Năng lực pháp luật)"},
    {"theme": "wiso-thema-8", "cat": "WiSo Beispiel", "q": "Thema 8 – Zu welchem Punkt passt das Beispiel: „Azubi mit 19 schließt Vertrag selbst.“?", "opts": ["Nichtigkeit", "Geschäftsfähigkeit", "Rechtsfähigkeit", "Vertragsschluss"], "a": 1, "ex": "Geschäftsfähigkeit (Năng lực hành vi dân sự)"},
    {"theme": "wiso-thema-8", "cat": "WiSo Beispiel", "q": "Thema 8 – Zu welchem Punkt passt das Beispiel: „Kunde bestellt Menü = Angebot angenommen.“?", "opts": ["Rechtsfähigkeit", "Vertragsschluss", "Anfechtung", "Geschäftsfähigkeit"], "a": 1, "ex": "Vertragsschluss (Giao kết hợp đồng)"},
    {"theme": "wiso-thema-8", "cat": "WiSo Beispiel", "q": "Thema 8 – Zu welchem Punkt passt das Beispiel: „Preis falsch angegeben → Vertrag anfechtbar.“?", "opts": ["Anfechtung", "Vertragsschluss", "Nichtigkeit", "Geschäftsfähigkeit"], "a": 0, "ex": "Anfechtung (Hủy bỏ hợp đồng)"},
    {"theme": "wiso-thema-8", "cat": "WiSo Beispiel", "q": "Thema 8 – Zu welchem Punkt passt das Beispiel: „Drogenhandel-Vertrag = nichtig.“?", "opts": ["Geschäftsfähigkeit", "Rechtsfähigkeit", "Vertragsschluss", "Nichtigkeit"], "a": 3, "ex": "Nichtigkeit (Vô hiệu hợp đồng)"},
    {"theme": "wiso-thema-9", "cat": "WiSo Theorie", "q": "Thema 9 – Welcher Merksatz gehört zu „Globalisierung“?", "opts": ["Außenhandel ist Grundlage für Wohlstand.", "EU bedeutet Freiheit und gemeinsame Regeln.", "Globalisierung betrifft alle Branchen.", "Internationale Organisationen fördern Stabilität."], "a": 2, "ex": "Globalisierung betrifft alle Branchen. – Toàn cầu hóa ảnh hưởng đến mọi ngành."},
    {"theme": "wiso-thema-9", "cat": "WiSo Theorie", "q": "Thema 9 – Welcher Merksatz gehört zu „Außenhandel“?", "opts": ["Abhängigkeit ist gefährlich.", "Außenhandel ist Grundlage für Wohlstand.", "EU bedeutet Freiheit und gemeinsame Regeln.", "Chancen und Risiken immer abwägen."], "a": 1, "ex": "Außenhandel ist Grundlage für Wohlstand. – Ngoại thương là nền tảng cho sự thịnh vượng."},
    {"theme": "wiso-thema-9", "cat": "WiSo Theorie", "q": "Thema 9 – Welcher Merksatz gehört zu „Europäische Union (EU)“?", "opts": ["Internationale Organisationen fördern Stabilität.", "Globalisierung betrifft alle Branchen.", "EU bedeutet Freiheit und gemeinsame Regeln.", "Außenhandel ist Grundlage für Wohlstand."], "a": 2, "ex": "EU bedeutet Freiheit und gemeinsame Regeln. – EU mang lại tự do & luật chung."},
    {"theme": "wiso-thema-9", "cat": "WiSo Theorie", "q": "Thema 9 – Welcher Merksatz gehört zu „Internationale Organisationen“?", "opts": ["Abhängigkeit ist gefährlich.", "Außenhandel ist Grundlage für Wohlstand.", "Internationale Organisationen fördern Stabilität.", "Globalisierung betrifft alle Branchen."], "a": 2, "ex": "Internationale Organisationen fördern Stabilität. – Tổ chức quốc tế thúc đẩy ổn định."},
    {"theme": "wiso-thema-9", "cat": "WiSo Theorie", "q": "Thema 9 – Welcher Merksatz gehört zu „Chancen und Risiken“?", "opts": ["Internationale Organisationen fördern Stabilität.", "Abhängigkeit ist gefährlich.", "Chancen und Risiken immer abwägen.", "Globalisierung betrifft alle Branchen."], "a": 2, "ex": "Chancen und Risiken immer abwägen. – Luôn cân nhắc cơ hội & rủi ro."},
    {"theme": "wiso-thema-9", "cat": "WiSo Beispiel", "q": "Thema 9 – Zu welchem Punkt passt das Beispiel: „Subway hat Filialen weltweit.“?", "opts": ["Chancen und Risiken", "Globalisierung", "Internationale Organisationen", "Außenhandel"], "a": 1, "ex": "Globalisierung (Toàn cầu hóa)"},
    {"theme": "wiso-thema-9", "cat": "WiSo Beispiel", "q": "Thema 9 – Zu welchem Punkt passt das Beispiel: „Deutschland exportiert Maschinen.“?", "opts": ["Chancen und Risiken", "Globalisierung", "Europäische Union (EU)", "Außenhandel"], "a": 3, "ex": "Außenhandel (Ngoại thương)"},
    {"theme": "wiso-thema-9", "cat": "WiSo Beispiel", "q": "Thema 9 – Zu welchem Punkt passt das Beispiel: „Azubi kann in jedem EU-Land arbeiten.“?", "opts": ["Internationale Organisationen", "Europäische Union (EU)", "Chancen und Risiken", "Außenhandel"], "a": 1, "ex": "Europäische Union (EU) (Liên minh châu Âu)"},
    {"theme": "wiso-thema-9", "cat": "WiSo Beispiel", "q": "Thema 9 – Zu welchem Punkt passt das Beispiel: „WTO senkt Zölle.“?", "opts": ["Globalisierung", "Chancen und Risiken", "Internationale Organisationen", "Europäische Union (EU)"], "a": 2, "ex": "Internationale Organisationen (Tổ chức quốc tế)"},
    {"theme": "wiso-thema-9", "cat": "WiSo Beispiel", "q": "Thema 9 – Zu welchem Punkt passt das Beispiel: „Subway expandiert nach Asien.“?", "opts": ["Internationale Organisationen", "Außenhandel", "Chancen und Risiken", "Europäische Union (EU)"], "a": 2, "ex": "Chancen und Risiken (Cơ hội & rủi ro)"}
  ]
},
    {
      id: "bfk5",
      code: "BfK-5",
      name: "Service Praxis",
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5.5 17a6.5 6.5 0 0 1 13 0"/><path d="M3 17h18"/><path d="M12 7.3V6"/><circle cx="12" cy="5" r="1"/><path d="M3.5 20h17"/></svg>',
      accent: "#AF52DE",
      soft: "#F6EDFC",
      teacher: "",
      ready: true,
      desc: "Service-Praxis: Serviceablauf, Gedeck, Gästekommunikation & Menüservice — Theorie, Fragen & Quiz.",
      groups: [
        {
          id: "serviceablauf",
          badge: "Thema 1",
          title: "Serviceablauf",
          items: [
            {
              id: "bfk5-begruessung",
              icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6"/><path d="M22 11h-6"/></svg>',
              name: "Begrüßung, Empfang & Platzierung",
              desc: "Gäste willkommen heißen, Garderobe & zum Tisch begleiten.",
              content: `<h2>Begrüßung, Empfang & Platzierung</h2>
    <div class="hint">Thema 1 · Serviceablauf — Schritt 1–3: Der erste Eindruck entscheidet.</div>
    <h3 class="sub">1. Vorbereitung (Mise en place)</h3>
    <p>Vor Servicebeginn: Tische eingedeckt, <span class="term" data-de="Mise en place" data-vi="công tác chuẩn bị trước giờ phục vụ">Mise en place</span> kontrolliert (Besteck, Gläser, Servietten, Karten), Kleidung &amp; Erscheinungsbild prüfen.</p>
    <p>→ Chuẩn bị trước giờ mở cửa: bàn đã trải, kiểm tra dao nĩa/ly/khăn giấy/thực đơn, trang phục chỉnh tề.</p>
    <h3 class="sub">2. Begrüßung &amp; Empfang</h3>
    <ul>
      <li>Gäste <b>sofort</b> beim Betreten begrüßen — <span class="term" data-de="Blickkontakt" data-vi="giao tiếp bằng mắt">Blickkontakt</span>, Lächeln, freundliche Anrede.</li>
      <li><span class="term" data-de="Garderobe" data-vi="quầy giữ áo khoác / mũ nón">Garderobe</span> (Mantel, Jacke) abnehmen und sicher verwahren.</li>
      <li>Nach Reservierung fragen: <i>„Haben Sie reserviert? Auf welchen Namen?"</i> — einladender: <i>„Sind Sie spontan zu uns gekommen?"</i></li>
    </ul>
    <p><b>Telefon-Reservierung:</b> Höchstens <b>3× läuten</b> lassen; Formel: <i>Betriebsname + eigener Name</i>. Notieren: Tag, Datum, Uhrzeit, Personenanzahl, Name + Telefonnummer, Sonderwünsche. Tisch <b>15–20 Minuten</b> freihalten.</p>
    <p>→ Đặt bàn qua điện thoại: để chuông reo tối đa 3 lần; công thức chào: tên quán + tên mình. Ghi: ngày, giờ, số khách, tên + SĐT, yêu cầu đặc biệt. Giữ bàn 15–20 phút.</p>
    <p>→ Chào khách ngay khi bước vào, cười, nhìn vào mắt khách. Nhận giữ áo khoác. Hỏi khách có đặt bàn trước không.</p>
    <h3 class="sub">3. Platzierung — Reihenfolge beachten</h3>
    <p>Zum Tisch begleiten und Stühle anbieten. Reihenfolge: <b>Damen zuerst</b>, dann ältere Gäste, dann Herren — der <span class="term" data-de="Gastgeber" data-vi="chủ tiệc / người mời">Gastgeber</span> (Einladende) zuletzt.</p>
    <p>→ Dẫn khách vào bàn, kéo ghế mời ngồi. Thứ tự: phụ nữ trước, khách lớn tuổi, rồi đến nam giới — chủ tiệc ngồi cuối cùng.</p>
    <div class="hint">Merksatz: Begrüßung sofort · Damen zuerst · Gastgeber zuletzt.</div>`,
              qa: [
                { q: "In welcher Reihenfolge werden Gäste platziert?", qVi: "Thứ tự xếp chỗ ngồi cho khách như thế nào?", a: "Damen zuerst, dann ältere Gäste, dann Herren — der Gastgeber zuletzt.", aVi: "Phụ nữ trước, rồi khách lớn tuổi, rồi nam giới — chủ tiệc cuối cùng.", why: "Höflichkeitsregel im Service; der Gastgeber als Einladender nimmt zuletzt Platz.", src: "DEHOGA Service-Grundlagen" },
                { q: "Was gehört zur Vorbereitung (Mise en place) vor dem Service?", qVi: "Chuẩn bị trước giờ phục vụ gồm những gì?", a: "Tische eindecken, Besteck/Gläser/Servietten/Karten prüfen, Erscheinungsbild kontrollieren.", aVi: "Trải bàn, kiểm tra dao nĩa/ly/khăn/thực đơn, trang phục chỉnh tề.", why: "Ohne Mise en place kein reibungsloser Service.", src: "IHK Ausbildungsrahmenplan" },
              ],
            },
            {
              id: "bfk5-bestellaufnahme",
              icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
              name: "Bestellaufnahme & Bonieren",
              desc: "Karten überreichen, Beratung, Bestellung notieren & weitergeben.",
              content: `<h2>Bestellaufnahme &amp; Bonieren</h2>
    <div class="hint">Thema 1 · Serviceablauf — Schritt 4–6: Karten, Beratung, Bestellung.</div>
    <h3 class="sub">1. Karten überreichen</h3>
    <p><span class="term" data-de="Speisekarte" data-vi="thực đơn món ăn">Speisekarte</span> und <span class="term" data-de="Getränkekarte" data-vi="thực đơn đồ uống">Getränkekarte</span> überreichen, Zeit zum Auswählen lassen. <span class="term" data-de="Aperitif" data-vi="đồ uống khai vị">Aperitif</span> empfehlen: <i>„Darf ich Ihnen einen Aperitif empfehlen?"</i></p>
    <p>→ Đưa thực đơn món ăn và đồ uống, để khách có thời gian chọn. Gợi ý đồ uống khai vị.</p>
    <h3 class="sub">2. Bestellung aufnehmen — Reihenfolge!</h3>
    <p>Reihenfolge (Ausbildungsrahmenplan: <i>„Ehrengäste · Ladies first · alt vor jung"</i>): <b>Ehrengast zuerst</b>, dann Damen (alt vor jung), dann Herren — <b>Gastgeber zuletzt</b>. Kinder am Tisch zuerst. Bestellung <b>wiederholen/zusammenfassen</b>, <span class="term" data-de="Sonderwünsche" data-vi="yêu cầu đặc biệt">Sonderwünsche</span> und <span class="term" data-de="Allergien" data-vi="dị ứng">Allergien</span> notieren. Üblich: erst Getränke-, dann Speisenbestellung.</p>
    <p>→ Nhận order theo thứ tự: nữ trước, nam sau, chủ tiệc cuối. Nhắc lại order để xác nhận, ghi chú yêu cầu đặc biệt và dị ứng. Thường nhận order đồ uống trước, món ăn sau.</p>
    <h3 class="sub">3. Bonieren</h3>
    <p>Bestellung sofort an Küche/Bar weitergeben — per <span class="term" data-de="Bon" data-vi="phiếu order (bon)">Bon</span> oder Kassensystem. Getränke kommen zuerst an den Tisch.</p>
    <p>→ Chuyển order ngay cho bếp/bar qua phiếu bon hoặc máy tính tiền. Đồ uống ra bàn trước.</p>
    <div class="hint">Merksatz: Ehrengast → Damen (alt vor jung) → Herren → Gastgeber · Wiederholen · Allergien notieren.</div>`,
              qa: [
                { q: "In welcher Reihenfolge wird die Bestellung aufgenommen?", qVi: "Thứ tự nhận order như thế nào?", a: "Zuerst Damen, dann Herren, der Gastgeber zuletzt.", aVi: "Nữ trước, nam sau, chủ tiệc cuối cùng.", why: "Höflichkeitsregel — gilt für Platzierung und Bestellaufnahme.", src: "DEHOGA Service-Grundlagen" },
                { q: "Was bedeutet 'Bonieren'?", qVi: "'Bonieren' nghĩa là gì?", a: "Die Bestellung per Bon/Kassensystem an Küche und Bar weitergeben.", aVi: "Chuyển order qua phiếu bon/máy tính tiền cho bếp và bar.", why: "Ohne Bon keine Produktion in Küche/Bar.", src: "IHK Ausbildungsrahmenplan" },
              ],
            },
            {
              id: "bfk5-servieren",
              icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5.5 17a6.5 6.5 0 0 1 13 0"/><path d="M3 17h18"/><path d="M12 7.3V6"/><circle cx="12" cy="5" r="1"/><path d="M3.5 20h17"/></svg>',
              name: "Servieren & Nachservice",
              desc: "Von rechts servieren, Damen zuerst, Nachfragen nicht vergessen.",
              content: `<h2>Servieren &amp; Nachservice</h2>
    <div class="hint">Thema 1 · Serviceablauf — Schritt 7–8: Die Hauptregeln des Servierens.</div>
    <h3 class="sub">1. Servierregeln (Deutschland)</h3>
    <ul>
      <li><b>Von rechts servieren</b> — Teller/Getränke werden von der rechten Seite des Gastes angereicht.</li>
      <li><b>Damen zuerst</b>, dann Herren, Gastgeber zuletzt (Ehrengast zuerst).</li>
      <li>Ankündigen, was serviert wird: <i>„Zum Wohl — Ihr Schnitzel."</i></li>
      <li>Gläser am <span class="term" data-de="Stiel" data-vi="chân ly">Stiel</span> anfassen, nie am Kelchrand.</li>
    </ul>
    <p>→ Phục vụ từ <b>bên phải</b> khách, nữ trước nam sau. Báo tên món khi dọn. Cầm ly ở chân ly, không chạm vành ly.</p>
    <h3 class="sub">2. Seitenregel — links vs. rechts</h3>
    <p><b>Von rechts:</b> Teller einsetzen, abräumen, einschenken. <b>Von links:</b> Vorlegen von Platten sowie alles, was <b>links vom Gast</b> steht (Brotteller, Salat, Beilagen) — um den Gast nicht zu stören.</p>
    <p>→ Dọn/rót từ <b>bên phải</b>; gắp đồ từ khay chung và những món ở bên trái khách (đĩa bánh mì, salad) thì phục vụ từ <b>bên trái</b>.</p>
    <h3 class="sub">3. Weinservice (wichtig!)</h3>
    <ul>
      <li><b>Probeschluck</b> zuerst für den <b>Gastgeber</b> (Degustieren); danach alle Gäste: älteste Dame → jüngste Dame → ältester Herr → jüngster Herr; <b>Gastgeber zuletzt</b>.</li>
      <li>Von <b>rechts einschenken</b>, Glas bleibt auf dem Tisch stehen; Flasche schräg halten, <b>Etikett zum Gast</b>.</li>
      <li>Gläser nur bis zur <b>Hälfte</b> füllen; Weinflasche immer <b>am Tisch</b> vor den Gästen öffnen.</li>
    </ul>
    <p><a href="https://gmbh.vorarlberg.travel/wp-content/uploads/2023/07/Service-Wein-einschenken-bei-gedecktem-Tisch-mit-Hirschpfeffer-c-Angela-Lamprecht-Vorarlberg-Tourismus-Webqualitaet-1920x600.jpg" target="_blank" rel="noopener">Bild: Weinservice — Einschenken am gedeckten Tisch</a></p>
    <h3 class="sub">4. Nachservice</h3>
    <p>Nach kurzer Zeit nachfragen: <i>„Hat es Ihnen geschmeckt? Darf es noch etwas sein?"</i> Getränke <span class="term" data-de="nachschenken" data-vi="rót thêm">nachschenken</span>, leere Gläser/Teller im Blick behalten.</p>
    <p>→ Sau một lúc hỏi thăm khách có hài lòng không, rót thêm đồ uống, để ý ly đĩa đã hết.</p>
    <div class="hint">Merksatz: Von RECHTS servieren · Damen zuerst · Nachfragen: „Hat es geschmeckt?"</div>`,
              qa: [
                { q: "Von welcher Seite wird in Deutschland serviert?", qVi: "Ở Đức phục vụ từ phía nào?", a: "Von rechts — Speisen und Getränke werden von der rechten Seite angereicht.", aVi: "Từ bên phải — dọn món và đồ uống từ phía bên phải của khách.", why: "Deutsche Servierregel (in anderen Ländern teils von links).", src: "DEHOGA Service-Grundlagen" },
                { q: "Was gehört zum Nachservice?", qVi: "Nachservice gồm những gì?", a: "Nachfragen ob es geschmeckt hat, nachschenken, leere Gläser beachten.", aVi: "Hỏi khách có ngon không, rót thêm, để ý ly đã hết.", why: "Aktiver Service statt nur Abwarten.", src: "IHK Ausbildungsrahmenplan" },
              ],
            },
            {
              id: "bfk5-abraumen",
              icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>',
              name: "Abräumen, Kassieren & Verabschiedung",
              desc: "Von rechts abräumen, Rechnung auf Wunsch, herzlich verabschieden.",
              content: `<h2>Abräumen, Kassieren &amp; Verabschiedung</h2>
    <div class="hint">Thema 1 · Serviceablauf — Schritt 9–11: Abschluss des Gästebesuchs.</div>
    <h3 class="sub">1. Abräumen</h3>
    <p><b>Von rechts abräumen</b> — und erst, wenn <b>alle Gäste am Tisch</b> mit dem Gang fertig sind. Nie einzelne Teller vorzeitig wegnehmen.</p>
    <p>→ Dọn đĩa từ bên phải, chỉ dọn khi <b>tất cả</b> khách trong bàn đã ăn xong món đó.</p>
    <h3 class="sub">2. Bestecksignale des Gastes</h3>
    <p><b>Pause:</b> Besteck ungekreuzt auf dem Teller, Gabelrücken nach oben → <b>nicht</b> abräumen! <b>Fertig:</b> Bestecke parallel, Griffe nach rechts unten, Gabelrücken nach unten, Messerschneide zur Gabel → abräumen. Benutztes Besteck nie zurück aufs Tischtuch legen.</p>
    <p>→ Khách để dao nĩa <b>song song, cán hướng xuống phải</b> = đã ăn xong → dọn. Để <b>chéo/ngửa</b> = đang nghỉ → đừng dọn.</p>
    <h3 class="sub">3. Abräum-Reihenfolge</h3>
    <p>Zuerst <b>Platten, Beilagenteller, Beischüsseln</b>, dann <b>Teller und Bestecke</b>. Im exklusiven Service max. <b>4 Gedecke</b> pro Gang; Wein- und Wassergläser bleiben bis zum Menüende stehen.</p>
    <h3 class="sub">4. Kassieren</h3>
    <p>Rechnung <b>nur auf Wunsch</b> bringen (<i>„Zahlen, bitte."</i>). <span class="term" data-de="Wechselgeld" data-vi="tiền thối">Wechselgeld</span> korrekt herausgeben, <span class="term" data-de="Beleg" data-vi="hóa đơn/biên lai">Beleg</span> anbieten (Belegausgabepflicht seit 2020).</p>
    <p>→ Chỉ mang hóa đơn khi khách yêu cầu. Thối tiền chính xác, đưa biên lai (nghĩa vụ xuất biên lai từ 2020).</p>
    <h3 class="sub">5. Verabschiedung</h3>
    <p>Herzlich verabschieden, Garderobe überreichen: <i>„Vielen Dank für Ihren Besuch — auf Wiedersehen!"</i> Zum Wiederkommen einladen.</p>
    <p>→ Chào tạm biệt niềm nở, trả áo khoác, mời khách quay lại.</p>
    <div class="hint">Merksatz: Abräumen von rechts · erst wenn ALLE fertig · Rechnung nur auf Wunsch.</div>`,
              qa: [
                { q: "Wann darf abgeräumt werden?", qVi: "Khi nào được dọn đĩa?", a: "Von rechts — erst wenn alle Gäste am Tisch mit dem Gang fertig sind.", aVi: "Dọn từ bên phải — chỉ khi mọi khách trong bàn đã xong món.", why: "Vorzeitiges Abräumen wirkt unhöflich und drängt die Gäste.", src: "DEHOGA Service-Grundlagen" },
                { q: "Wann wird die Rechnung gebracht?", qVi: "Khi nào mang hóa đơn ra?", a: "Nur auf Wunsch des Gastes ('Zahlen, bitte.').", aVi: "Chỉ khi khách yêu cầu thanh toán.", why: "Unaufgefordertes Kassieren wirkt wie Hinauswerfen.", src: "IHK Ausbildungsrahmenplan" },
              ],
            },
          ],
        },
        {
          id: "gedeck",
          badge: "Thema 2",
          title: "Gedeck",
          items: [
            {
              id: "bfk5-gedeck-grundlagen",
              icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/></svg>',
              name: "Gedeck-Grundlagen & Besteckpositionen",
              desc: "Messer rechts, Gabel links — die festen Positionen.",
              content: `<h2>Gedeck-Grundlagen &amp; Besteckpositionen</h2>
    <div class="hint">Thema 2 · Gedeck — Das Grundgerüst jedes eingedeckten Tisches.</div>
    <h3 class="sub">1. Die festen Positionen</h3>
    <table>
    <tr><th>Teil</th><th>Position</th><th>Merksatz</th></tr>
    <tr><td><span class="term" data-de="Platzteller" data-vi="đĩa lót">Platzteller</span></td><td>Mitte des Gedecks</td><td>trung tâm</td></tr>
    <tr><td><span class="term" data-de="Messer" data-vi="dao">Messer</span></td><td><b>rechts</b> vom Teller, <span class="term" data-de="Schneide" data-vi="lưỡi dao">Schneide</span> nach innen (zum Teller)</td><td>dao phải, lưỡi hướng vào đĩa</td></tr>
    <tr><td><span class="term" data-de="Gabel" data-vi="nĩa">Gabel</span></td><td><b>links</b> vom Teller</td><td>nĩa trái</td></tr>
    <tr><td><span class="term" data-de="Löffel" data-vi="thìa">Löffel</span></td><td>rechts vom Messer (bei Suppe)</td><td>thìa bên phải dao</td></tr>
    <tr><td>Dessertbesteck</td><td>oberhalb des Tellers (Gabel-Griff links, Löffel-Griff rechts)</td><td>dao nĩa tráng miệng phía trên đĩa</td></tr>
    <tr><td><span class="term" data-de="Serviette" data-vi="khăn ăn">Serviette</span></td><td>links neben der Gabel oder auf dem Teller</td><td>khăn ăn bên trái nĩa hoặc trên đĩa</td></tr>
    </table>
    <h3 class="sub">2. Grundregeln</h3>
    <ul>
      <li>Besteck wird <b>von außen nach innen</b> benutzt.</li>
      <li>Abstand pro Gedeck: <b>60–70 cm</b> (Gedeckmitte zu Gedeckmitte).</li>
      <li>Alles sauber, fleckenfrei und poliert.</li>
    </ul>
    <p><b>Reihenfolge beim Eindecken:</b> Geschirr → Besteck → Gläser → Servietten. Besteck nur an den Griffen anfassen (idealerweise mit Handschuhen); im Uhrzeigersinn um den Tisch gehen.</p>
    <p>→ Thứ tự trải bàn: đĩa → dao nĩa → ly → khăn ăn. Chỉ cầm cán dao nĩa, đồ phải sạch bóng.</p>
    <p><a href="https://www.schoenstezeit.de/wp-content/uploads/2019/04/eindecken-haushirt.jpg" target="_blank" rel="noopener">Bild: Eindecken eines Restauranttischs</a> · <a href="https://www.youtube.com/watch?v=nAHGmqA3p3s" target="_blank" rel="noopener">Video: Tisch richtig eindecken (HilfreichTV)</a></p>
    <div class="hint">Merksatz: Messer RECHTS (Schneide innen) · Gabel LINKS · von außen nach innen.</div>`,
              qa: [
                { q: "Wo liegen Messer und Gabel im Gedeck?", qVi: "Dao và nĩa đặt ở đâu?", a: "Messer rechts (Schneide nach innen), Gabel links vom Teller.", aVi: "Dao bên phải (lưỡi hướng vào đĩa), nĩa bên trái đĩa.", why: "Feste internationale Gedeck-Regel.", src: "DEHOGA Service-Grundlagen" },
                { q: "In welcher Reihenfolge wird das Besteck benutzt?", qVi: "Dùng dao nĩa theo thứ tự nào?", a: "Von außen nach innen.", aVi: "Từ ngoài vào trong.", why: "Äußeres Besteck gehört zum ersten Gang.", src: "IHK Ausbildungsrahmenplan" },
              ],
            },
            {
              id: "bfk5-gedeck-arten",
              icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 3l1 6a2.6 2.6 0 0 0 5 0l1-6z"/><path d="M11.5 11.6v6"/><path d="M9 20.5h5"/></svg>',
              name: "Gedeck-Arten, Gläser & Brotteller",
              desc: "Einfaches vs. Menügedeck, Glaspositionen oben rechts.",
              content: `<h2>Gedeck-Arten, Gläser &amp; Brotteller</h2>
    <div class="hint">Thema 2 · Gedeck — Vom einfachen Gedeck bis zum Menügedeck.</div>
    <h3 class="sub">1. Gedeck-Arten</h3>
    <ul>
      <li><b>Einfaches Gedeck:</b> Teller, Messer + Gabel, Glas, Serviette — für einfache Gerichte.</li>
      <li><b>Menügedeck (erweitertes Gedeck):</b> mehrere Bestecke/Gänge, mehrere Gläser, Dessertbesteck oben.</li>
      <li>Besteck <b>rechts max. 4 Teile</b> (innen → außen: Tafelmesser, Menümesser, Fischmesser, Suppenlöffel), <b>links max. 3</b> (Tafelgabel, Menügabel, Fischgabel); Dessertbesteck ca. 1 cm über dem Teller.</li>
    </ul>
    <h3 class="sub">2. Gläser — oben rechts</h3>
    <p>Gläser stehen <b>oben rechts</b> in diagonaler Linie über dem Messer: <span class="term" data-de="Wasserglas" data-vi="ly nước">Wasserglas</span> dem Teller am nächsten, dann Weißweinglas, dann Rotweinglas (größtes Glas ganz oben). Das <b>Richtglas</b> (Wein des Hauptgangs) steht genau über dem Hauptgangmesser. Max. 4 Gläser pro Gast — nur am Stiel anfassen.</p>
    <p>→ Ly đặt phía <b>trên bên phải</b> theo đường chéo: ly nước gần đĩa nhất, rồi ly vang trắng, rồi ly vang đỏ (ly to nhất ở trên cùng). Tối đa 4 ly/khách, chỉ cầm chân ly.</p>
    <h3 class="sub">3. Brotteller</h3>
    <p><span class="term" data-de="Brotteller" data-vi="đĩa bánh mì">Brotteller</span> <b>links oben</b> mit <span class="term" data-de="Buttermesser" data-vi="dao phết bơ">Buttermesser</span> darauf.</p>
    <p>→ Đĩa bánh mì ở trên bên trái, có dao phết bơ đặt trên.</p>
    <div class="hint">Merksatz: Gläser OBEN RECHTS · Brotteller OBEN LINKS.</div>`,
              qa: [
                { q: "Wo stehen die Gläser im Gedeck?", qVi: "Ly đặt ở đâu?", a: "Oben rechts in diagonaler Linie — Wasserglas dem Teller am nächsten, dann Weißwein, dann Rotwein.", aVi: "Trên bên phải theo đường chéo — ly nước gần đĩa nhất, rồi vang trắng, rồi vang đỏ.", why: "Feste Gedeck-Regel; größtes Glas (Rotwein) ganz oben.", src: "DEHOGA Service-Grundlagen" },
                { q: "Wo liegt der Brotteller?", qVi: "Đĩa bánh mì đặt ở đâu?", a: "Links oben, mit Buttermesser darauf.", aVi: "Trên bên trái, có dao phết bơ đặt trên.", why: "Links = Brotseite (Eselsbrücke: 'Brot links').", src: "IHK Ausbildungsrahmenplan" },
              ],
            },
          ],
        },
        {
          id: "gaestekommunikation",
          badge: "Thema 3",
          title: "Gästekommunikation",
          items: [
            {
              id: "bfk5-kommunikation",
              icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
              name: "Begrüßung, Beratung & Zusatzverkauf",
              desc: "Aktives Zuhören, Empfehlungen, dezentes Upselling.",
              content: `<h2>Begrüßung, Beratung &amp; Zusatzverkauf</h2>
    <div class="hint">Thema 3 · Gästekommunikation — Der Gast ist König, aber ehrlich beraten.</div>
    <h3 class="sub">1. Grundlagen der Kommunikation</h3>
    <ul>
      <li>Lächeln, <span class="term" data-de="Blickkontakt" data-vi="giao tiếp bằng mắt">Blickkontakt</span>, aufrechte <span class="term" data-de="Körpersprache" data-vi="ngôn ngữ cơ thể">Körpersprache</span>.</li>

      <li><span class="term" data-de="Aktives Zuhören" data-vi="lắng nghe chủ động">Aktives Zuhören</span>: ausreden lassen, nicht unterbrechen, nachfragen.</li>
      <li>Offene Fragen stellen: <i>„Was darf ich Ihnen empfehlen?"</i></li>
      <li>Namen merken und verwenden, wenn bekannt.</li>
    </ul>
    <h3 class="sub">2. Beratung &amp; <span class="term" data-de="Zusatzverkauf" data-vi="bán thêm (upselling)">Zusatzverkauf</span></h3>
    <p>Speisen/Getränke ehrlich empfehlen (Tageskarte, Saisonales). Zusatzverkauf <b>dezent</b>: Aperitif, Dessert, Kaffee/Digestif anbieten — nie aufdringlich.</p>
    <p>→ Tư vấn trung thực (món trong ngày, món theo mùa). Bán thêm một cách tinh tế: gợi ý khai vị, tráng miệng, cà phê — không chèo kéo.</p>
    <p><b>Zwei-Alternativen-Technik</b> (statt Ja/Nein-Frage): <i>„Darf ich Ihnen den Espresso mit einer Praline servieren oder lieber unseren Eierlikörkuchen?"</i> — Empfehlung konkret aussprechen: <i>„Zu Ihrem Essen passt besonders gut der …"</i></p>
    <p>→ Kỹ thuật đưa <b>2 lựa chọn</b> thay vì hỏi có/không. Gợi ý cụ thể: „Món này hợp nhất với …"</p>
    <p><a href="https://www.youtube.com/watch?v=YtxTeLji5Lg" target="_blank" rel="noopener">Video: 1000 wichtige Sätze für Kellner:innen (sprichdeutsch)</a></p>
    <div class="hint">Merksatz: Zuhören → Beraten → dezent verkaufen (nie aufdringlich).</div>`,
              qa: [
                { q: "Was bedeutet 'aktives Zuhören' im Service?", qVi: "'Lắng nghe chủ động' trong phục vụ là gì?", a: "Ausreden lassen, nicht unterbrechen, nachfragen, Verständnis zeigen.", aVi: "Để khách nói hết, không ngắt lời, hỏi lại, thể hiện sự thấu hiểu.", why: "Basis für Beratung und Reklamationsbehandlung.", src: "DEHOGA Service-Grundlagen" },
                { q: "Wie soll Zusatzverkauf sein?", qVi: "Bán thêm nên như thế nào?", a: "Dezent und ehrlich — Empfehlungen geben, nie aufdringlich verkaufen.", aVi: "Tinh tế và trung thực — gợi ý chứ không chèo kéo.", why: "Aufdringlichkeit verärgert Gäste und schadet dem Ruf.", src: "IHK Ausbildungsrahmenplan" },
              ],
            },
            {
              id: "bfk5-reklamation",
              icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
              name: "Reklamationsbehandlung",
              desc: "Beschwerden ernst nehmen — die 5 Schritte.",
              content: `<h2>Reklamationsbehandlung</h2>
    <div class="hint">Thema 3 · Gästekommunikation — Eine gut gelöste Reklamation bindet Gäste.</div>
    <h3 class="sub">Die 5 Schritte der Reklamationsbehandlung</h3>
    <table>
    <tr><th>#</th><th>Schritt</th><th>Bedeutung</th></tr>
    <tr><td>1</td><td><b>Zuhören</b> — ausreden lassen, nicht unterbrechen</td><td>lắng nghe, không ngắt lời</td></tr>
    <tr><td>2</td><td><b>Verständnis zeigen &amp; entschuldigen</b></td><td>thấu hiểu &amp; xin lỗi</td></tr>
    <tr><td>3</td><td><b>Lösung anbieten</b> (Ersatzgericht, neues Getränk, Nachlass)</td><td>đề xuất giải pháp</td></tr>
    <tr><td>4</td><td><b>Danken</b> — für den Hinweis ehrlich bedanken</td><td>cảm ơn vì đã góp ý</td></tr>
    <tr><td>5</td><td><b>Nachfassen &amp; dokumentieren</b> — zufrieden? intern notieren</td><td>hỏi lại &amp; ghi chép</td></tr>
    </table>
    <h3 class="sub">Grundsätze</h3>
    <ul>
      <li>Reklamation <b>immer ernst nehmen</b> — nie mit dem Gast streiten, keine Schuld zuweisen.</li>
      <li>Ruhig und freundlich bleiben, auch bei schwierigen Gästen.</li>
      <li>Beschwerde als <b>Chance</b> sehen — ein gut gelöster Fehler bindet stärker als ein Abend ohne Fehler.</li>
      <li>Bei Beleidigung/Bedrohung: <b>keine</b> Entschuldigung — Kollegen/Vorgesetzten einbeziehen.</li>
      <li>Beispiel-Formulierung: <i>„Entschuldigung. Sie erhalten natürlich sofort ein neues Gericht in der gewünschten Garstufe."</i></li>
    </ul>
    <div class="hint">Merksatz: Zuhören → Entschuldigen → Lösen → Danken → Nachfassen. Nie streiten!</div>`,
              qa: [
                { q: "Nennen Sie die Schritte der Reklamationsbehandlung.", qVi: "Nêu các bước xử lý khiếu nại.", a: "Zuhören, Verständnis zeigen & entschuldigen, Lösung anbieten, danken, nachfassen & dokumentieren.", aVi: "Lắng nghe, thấu hiểu & xin lỗi, đề xuất giải pháp, cảm ơn, hỏi lại & ghi chép.", why: "Standardablauf (5 Schritte) im Beschwerdemanagement.", src: "DEHOGA Service-Grundlagen" },
                { q: "Was darf man bei einer Reklamation niemals tun?", qVi: "Khi bị khiếu nại tuyệt đối không được làm gì?", a: "Nie mit dem Gast streiten oder ihm die Schuld zuweisen.", aVi: "Không bao giờ cãi nhau với khách hay đổ lỗi cho khách.", why: "Der Gast muss sich ernst genommen fühlen.", src: "IHK Ausbildungsrahmenplan" },
              ],
            },
          ],
        },
        {
          id: "menueservice",
          badge: "Thema 4",
          title: "Menüservice",
          items: [
            {
              id: "bfk5-menuefolge",
              icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
              name: "Menüfolge — klassische Reihenfolge",
              desc: "Vom Aperitif bis zum Digestif: die klassische Gangfolge.",
              content: `<h2>Menüfolge — klassische Reihenfolge</h2>
    <div class="hint">Thema 4 · Menüservice — Die festgelegte Abfolge eines klassischen Menüs.</div>
    <h3 class="sub">Klassische <span class="term" data-de="Menüfolge" data-vi="trình tự các món trong thực đơn">Menüfolge</span></h3>
    <table>
    <tr><th>#</th><th>Gang</th><th>Beispiel</th></tr>
    <tr><td>1</td><td><span class="term" data-de="Aperitif" data-vi="đồ uống khai vị">Aperitif</span></td><td>Sekt, Sherry</td></tr>
    <tr><td>2</td><td>Kalte <span class="term" data-de="Vorspeise" data-vi="món khai vị">Vorspeise</span></td><td>Räucherlachs, Carpaccio</td></tr>
    <tr><td>3</td><td><span class="term" data-de="Suppe" data-vi="súp">Suppe</span></td><td>Kraftbrühe, Cremesuppe</td></tr>
    <tr><td>4</td><td>Warme <span class="term" data-de="Vorspeise" data-vi="món khai vị">Vorspeise</span></td><td>Strudel, Pasta</td></tr>
    <tr><td>5</td><td><span class="term" data-de="Fisch" data-vi="món cá">Fisch</span></td><td>gebratenes Fischfilet</td></tr>
    <tr><td>6</td><td><span class="term" data-de="Sorbet" data-vi="kem trái cây (làm sạch vị)">Sorbet</span> (zur Erfrischung)</td><td>Zitronensorbet</td></tr>
    <tr><td>7</td><td><span class="term" data-de="Hauptgang" data-vi="món chính">Hauptgang</span> (Fleisch)</td><td>Rinderfilet, Ente</td></tr>
    <tr><td>8</td><td>(Warmes) <span class="term" data-de="Dessert" data-vi="món tráng miệng">Dessert</span></td><td>Mousse, Eis</td></tr>
    <tr><td>9</td><td><span class="term" data-de="Käse" data-vi="phô mai">Käse</span></td><td>Käseplatte</td></tr>
    <tr><td>10</td><td>Kaffee / <span class="term" data-de="Digestif" data-vi="rượu tiêu hóa (sau ăn)">Digestif</span></td><td>Espresso, Cognac</td></tr>
    </table>
    <p>→ Thứ tự kinh điển: khai vị lạnh → súp → khai vị nóng → cá → sorbet làm sạch vị → món chính (thịt) → tráng miệng → phô mai → cà phê/rượu tiêu hóa. Modern verkürzt: Vorspeise/Suppe → Hauptgang → Dessert/Käse.</p>
    <div class="hint">Merksatz: Fisch VOR Fleisch · Sorbet in der Mitte · Dessert VOR Käse.</div>`,
              qa: [
                { q: "Nennen Sie die klassische Menüfolge.", qVi: "Nêu trình tự thực đơn kinh điển.", a: "Aperitif, kalte Vorspeise, Suppe, warme Vorspeise, Fisch, Sorbet, Hauptgang, (warmes) Dessert, Käse, Kaffee/Digestif.", aVi: "Khai vị lạnh, súp, khai vị nóng, cá, sorbet, món chính, tráng miệng, phô mai, cà phê/rượu tiêu hóa.", why: "Feste Reihenfolge im klassischen Menüservice.", src: "DEHOGA Service-Grundlagen" },
                { q: "Wozu dient das Sorbet im Menü?", qVi: "Sorbet trong thực đơn có tác dụng gì?", a: "Zur Erfrischung/Neutralisierung des Gaumens zwischen den Gängen.", aVi: "Làm sạch/làm mới vị giác giữa các món.", why: "Vorbereitung auf den Hauptgang.", src: "IHK Ausbildungsrahmenplan" },
              ],
            },
            {
              id: "bfk5-tragen",
              icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2v4"/><path d="M5 8h14l-1.5 12.5a1 1 0 0 1-1-.5z"/></svg>',
              name: "Tragen, Servierregeln & Ausdecken",
              desc: "Teller tragen, Eindecken/Ausdecken, Cloche.",
              content: `<h2>Tragen, Servierregeln &amp; Ausdecken</h2>
    <div class="hint">Thema 4 · Menüservice — Technik und Regeln am Tisch.</div>
    <h3 class="sub">1. Tragen</h3>
    <ul>
      <li>Teller auf dem <b>linken Unterarm</b> / der linken Hand tragen — mit <b>rechts</b> servieren.</li>
      <li>Maximal <b>2–3 Teller</b> gleichzeitig (nie stapeln!).</li>
      <li>Tablett mit der linken Hand tragen, mit rechts anbieten.</li>
    </ul>
    <p>→ Bưng đĩa bằng <b>tay trái</b> (cẳng tay trái), dọn bằng <b>tay phải</b>. Tối đa 2–3 đĩa một lúc, không chồng đĩa lên nhau.</p>
    <p><b>3-Teller-Technik:</b> 1. Teller mit der linken Hand am Tellerrand (Daumen/Zeigefinger), 2. Teller auf Daumenballen &amp; Handgelenk, 3. Teller in der rechten Hand. Abstellen in umgekehrter Reihenfolge. <b>Nie</b> Teller wie einen Turm aufeinander stapeln.</p>
    <p><a href="https://www.youtube.com/watch?v=nMXwJ05tLZk" target="_blank" rel="noopener">Video: Wie trägt man drei Teller richtig?</a> ·<a href="https://www.youtube.com/watch?v=bFExAOpzPoo" target="_blank" rel="noopener">Video: 3 Teller tragen — Anleitung</a></p>
    <h3 class="sub">2. <span class="term" data-de="Eindecken" data-vi="trải thêm dao nĩa cho món tiếp theo">Eindecken</span> &amp; <span class="term" data-de="Ausdecken" data-vi="dọn bớt dao nĩa/đĩa đã dùng">Ausdecken</span></h3>
    <p>Zwischen den Gängen: benutztes Geschirr/Besteck <b>ausdecken</b> (abräumen), Besteck für den nächsten Gang <b>eindecken</b> (auflegen).</p>
    <p>→ Giữa các món: dọn đĩa/dụng cụ đã dùng, trải thêm dao nĩa cho món tiếp theo.</p>
    <h3 class="sub">3. <span class="term" data-de="Cloche" data-vi="nắp đậy đĩa (speiseglocke)">Cloche</span> (Speiseglocke)</h3>
    <p>Bei mehreren Gästen die Cloche <b>gleichzeitig</b> vor allen Gästen abheben.</p>

    <p>→ Khi nhiều khách, nhấc nắp đậy đĩa <b>đồng thời</b> trước mặt mọi người.</p>
    <h3 class="sub">4. Einschenken</h3>
    <p>Von <b>rechts einschenken</b>, <span class="term" data-de="Etikett" data-vi="nhãn chai">Etikett</span> der Flasche zum Gast zeigen.</p>
    <div class="hint">Merksatz: Links tragen · rechts servieren · max. 3 Teller · Cloche gleichzeitig.</div>`,
              qa: [
                { q: "Wie werden Teller getragen und serviert?", qVi: "Bưng và dọn đĩa như thế nào?", a: "Auf dem linken Unterarm tragen, mit rechts servieren — max. 2–3 Teller.", aVi: "Bưng bằng cẳng tay trái, dọn bằng tay phải — tối đa 2–3 đĩa.", why: "Rechte Hand bleibt frei zum Servieren von rechts.", src: "DEHOGA Service-Grundlagen" },
                { q: "Was bedeuten Eindecken und Ausdecken?", qVi: "Eindecken và Ausdecken là gì?", a: "Ausdecken: benutztes Geschirr abräumen; Eindecken: Besteck für den nächsten Gang auflegen.", aVi: "Ausdecken: dọn đĩa đã dùng; Eindecken: trải dao nĩa cho món tiếp.", why: "Wechsel zwischen den Menügängen.", src: "IHK Ausbildungsrahmenplan" },
              ],
            },
            {
              id: "bfk5-servierarten",
              icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5.5 17a6.5 6.5 0 0 1 13 0"/><path d="M3 17h18"/><path d="M12 7.3V6"/><circle cx="12" cy="5" r="1"/><path d="M3.5 20h17"/></svg>',
              name: "Servierarten: amerikanisch, englisch, französisch, deutsch",
              desc: "Tellerservice vs. Plattenservice — die 4 klassischen Arten.",
              content: `<h2>Servierarten</h2>
    <div class="hint">Thema 4 · Menüservice — Ausbildungsrahmenplan: Full Service, Counterservice, Selbstbedienung, Außer-Haus-Verkauf.</div>
    <table>
    <tr><th>Art</th><th>Prinzip</th><th>Wo?</th></tr>
    <tr><td><b>Amerikanisch</b> (Tellerservice)</td><td>Speisen in der Küche <b>fertig angerichtet</b>; Teller von rechts eingesetzt</td><td>Standard in Mittelklasse-Lokalen</td></tr>
    <tr><td><b>Englisch</b> (Vorlegeservice)</td><td>Fleisch wird <b>am Tisch tranchiert</b> und vorgelegt; gegen den Uhrzeigersinn, von rechts</td><td>gehobene Lokale</td></tr>
    <tr><td><b>Französisch</b></td><td>Anrichten &amp; Tranchieren am <span class="term" data-de="Guéridon" data-vi="xe đẩy phục vụ bên bàn">Guéridon</span> (Beistelltisch); aufwendigste Form</td><td>exklusive Restaurants</td></tr>
    <tr><td><b>Deutsch</b> (Platten-/Schüsselservice)</td><td>Platten auf den Tisch, <b>Gast bedient sich selbst</b>; leerer Teller von rechts</td><td>größere Gesellschaften</td></tr>
    </table>
    <p>→ Mỹ: dọn đĩa đã bày sẵn từ bếp. Anh: xẻ thịt tại bàn. Pháp: bày/xẻ trên xe Guéridon. Đức: đặt khay lên bàn, khách tự lấy.</p>
    <p><b>Gloschenservice:</b> Teller unter der <span class="term" data-de="Cloche" data-vi="nắp đậy đĩa">Cloche</span> (Speiseglocke) — synchronisiertes Servieren und Abheben vor dem Gast; Zeichen für Exklusivität.</p>
    <p><a href="https://old.easterntabletop.com/Photos/Product/9410_2.jpg" target="_blank" rel="noopener">Bild: Cloche (Speiseglocke)</a></p>
    <div class="hint">Merksatz: Amerikanisch = Teller fertig · Englisch = Tranchieren am Tisch · Französisch = Guéridon · Deutsch = Gast bedient sich selbst.</div>`,
              qa: [
                { q: "Was ist der Unterschied zwischen amerikanischem und deutschem Service?", qVi: "Phục vụ kiểu Mỹ và kiểu Đức khác nhau thế nào?", a: "Amerikanisch: Teller in der Küche fertig angerichtet. Deutsch: Platten auf den Tisch — Gast bedient sich selbst.", aVi: "Mỹ: đĩa bày sẵn từ bếp. Đức: đặt khay lên bàn, khách tự lấy.", why: "Kernunterscheidung der Servierarten.", src: "DEHOGA Service-Grundlagen" },
                { q: "Wo wird beim französischen Service tranchiert?", qVi: "Phục vụ kiểu Pháp xẻ thịt ở đâu?", a: "Am Guéridon — dem Beistelltisch im Gastraum.", aVi: "Trên xe Guéridon — bàn phụ trong phòng ăn.", why: "Französischer Service = aufwendigste Form mit Guéridon.", src: "IHK Ausbildungsrahmenplan" },
              ],
            },
          ],
        },
      ],
      quiz: [
        { theme: "bfk5-begruessung", cat: "Serviceablauf", q: "In welcher Reihenfolge werden Gäste platziert?", opts: ["Herren zuerst, dann Damen", "Damen zuerst, dann Herren, Gastgeber zuletzt", "Gastgeber zuerst, dann alle anderen", "Nach Alter, ohne Regel"], a: 1, ex: "Damen zuerst, dann Herren — der Gastgeber zuletzt." },
        { theme: "bfk5-begruessung", cat: "Serviceablauf", q: "Was gehört zur Mise en place vor dem Service?", opts: ["Nur die Kasse zählen", "Tische eindecken, Besteck/Gläser prüfen, Erscheinungsbild kontrollieren", "Nur die Speisekarte lesen", "Nichts — man beginnt direkt"], a: 1, ex: "Vollständige Vorbereitung: Gedecke, Karten, Erscheinungsbild." },
        { theme: "bfk5-bestellaufnahme", cat: "Serviceablauf", q: "Was muss bei der Bestellaufnahme unbedingt notiert werden?", opts: ["Nur die Tischnummer", "Sonderwünsche und Allergien", "Nur die Uhrzeit", "Nichts — man merkt es sich"], a: 1, ex: "Sonderwünsche & Allergien notieren + Bestellung wiederholen." },
        { theme: "bfk5-bestellaufnahme", cat: "Serviceablauf", q: "Was bedeutet 'Bonieren'?", opts: ["Trinkgeld kassieren", "Bestellung an Küche/Bar weitergeben", "Tisch reservieren", "Rechnung schreiben"], a: 1, ex: "Per Bon/Kassensystem an Küche und Bar weitergeben." },
        { theme: "bfk5-servieren", cat: "Serviceablauf", q: "Von welcher Seite wird in Deutschland serviert?", opts: ["Von links", "Von rechts", "Von vorne", "Egal"], a: 1, ex: "Deutsche Regel: von rechts servieren." },
        { theme: "bfk5-servieren", cat: "Serviceablauf", q: "Was gehört zum Nachservice?", opts: ["Sofort kassieren", "Nachfragen ob es geschmeckt hat, nachschenken", "Tisch neu eindecken", "Nichts mehr tun"], a: 1, ex: "'Hat es Ihnen geschmeckt?' + nachschenken." },
        { theme: "bfk5-abraumen", cat: "Serviceablauf", q: "Wann darf abgeräumt werden?", opts: ["Sobald ein Gast fertig ist", "Erst wenn alle am Tisch fertig sind — von rechts", "Vor dem Dessert", "Nie"], a: 1, ex: "Von rechts, erst wenn ALLE fertig sind." },
        { theme: "bfk5-abraumen", cat: "Serviceablauf", q: "Wann wird die Rechnung gebracht?", opts: ["Sofort nach dem Hauptgang", "Nur auf Wunsch des Gastes", "Mit dem Dessert", "Vor der Bestellung"], a: 1, ex: "Nur auf Wunsch ('Zahlen, bitte.')." },
        { theme: "bfk5-gedeck-grundlagen", cat: "Gedeck", q: "Wo liegen Messer und Gabel?", opts: ["Messer links, Gabel rechts", "Messer rechts (Schneide innen), Gabel links", "Beide rechts", "Beide links"], a: 1, ex: "Messer rechts, Schneide zum Teller; Gabel links." },
        { theme: "bfk5-gedeck-grundlagen", cat: "Gedeck", q: "In welcher Reihenfolge wird Besteck benutzt?", opts: ["Von innen nach außen", "Von außen nach innen", "Beliebig", "Nur ein Besteck"], a: 1, ex: "Von außen nach innen — äußeres Besteck = erster Gang." },
        { theme: "bfk5-gedeck-arten", cat: "Gedeck", q: "Wo stehen die Gläser?", opts: ["Oben links", "Oben rechts", "In der Tischmitte", "Unterm Tisch"], a: 1, ex: "Oben rechts über dem Messer." },
        { theme: "bfk5-gedeck-arten", cat: "Gedeck", q: "Wo liegt der Brotteller?", opts: ["Rechts oben", "Links oben, mit Buttermesser", "In der Mitte", "Gibt es nicht"], a: 1, ex: "Links oben + Buttermesser darauf." },
        { theme: "bfk5-kommunikation", cat: "Gästekommunikation", q: "Was ist 'aktives Zuhören'?", opts: ["Schnell antworten", "Ausreden lassen, nicht unterbrechen, nachfragen", "Notizen machen ohne hinzuhören", "Den Gast ignorieren"], a: 1, ex: "Ausreden lassen, nachfragen, Verständnis zeigen." },
        { theme: "bfk5-kommunikation", cat: "Gästekommunikation", q: "Wie soll Zusatzverkauf sein?", opts: ["Aufdringlich und laut", "Dezent und ehrlich", "Gar nicht", "Nur bei Stammgästen"], a: 1, ex: "Dezent empfehlen — nie aufdringlich." },
        { theme: "bfk5-reklamation", cat: "Gästekommunikation", q: "Was ist der erste Schritt bei einer Reklamation?", opts: ["Sofort widersprechen", "Zuhören — ausreden lassen", "Den Chef rufen", "Den Gast ignorieren"], a: 1, ex: "Zuhören ohne zu unterbrechen." },
        { theme: "bfk5-reklamation", cat: "Gästekommunikation", q: "Was darf man bei einer Reklamation niemals tun?", opts: ["Sich entschuldigen", "Mit dem Gast streiten / Schuld zuweisen", "Eine Lösung anbieten", "Dokumentieren"], a: 1, ex: "Nie streiten, nie Schuld zuweisen." },
        { theme: "bfk5-menuefolge", cat: "Menüservice", q: "Was kommt im klassischen Menü nach der Suppe?", opts: ["Dessert", "Warme Vorspeise / Fisch", "Käse", "Kaffee"], a: 1, ex: "Reihenfolge: Suppe → warme Vorspeise/Fisch → Sorbet → Hauptgang." },
        { theme: "bfk5-menuefolge", cat: "Menüservice", q: "Wozu dient das Sorbet?", opts: ["Als Dessert", "Zur Erfrischung des Gaumens", "Als Vorspeise", "Keine Funktion"], a: 1, ex: "Neutralisiert den Gaumen vor dem Hauptgang." },
        { theme: "bfk5-tragen", cat: "Menüservice", q: "Wie werden Teller getragen?", opts: ["Auf dem Kopf", "Linker Unterarm, mit rechts servieren, max. 2–3 Teller", "Gestapelt zu fünft", "Nur mit Tablett"], a: 1, ex: "Links tragen, rechts servieren, max. 2–3 Teller." },
        { theme: "bfk5-tragen", cat: "Menüservice", q: "Was ist 'Ausdecken'?", opts: ["Tisch abwischen", "Benutztes Geschirr/Besteck zwischen Gängen abräumen", "Neu eindecken morgens", "Stühle stapeln"], a: 1, ex: "Ausdecken = abräumen; Eindecken = neu auflegen." },
        { theme: "bfk5-servierarten", cat: "Menüservice", q: "Beim amerikanischen Service werden die Speisen …", opts: ["am Tisch tranchiert", "in der Küche fertig auf dem Teller angerichtet", "vom Gast selbst vom Tablett genommen", "am Guéridon angerichtet"], a: 1, ex: "Amerikanisch = Tellerservice: Küche richtet an, Teller von rechts." },
        { theme: "bfk5-servierarten", cat: "Menüservice", q: "Was ist der Guéridon beim französischen Service?", opts: ["Ein Weinkühler", "Der Beistelltisch zum Anrichten/Tranchieren im Gastraum", "Eine Suppenart", "Der Kassentresen"], a: 1, ex: "Guéridon = Beistelltisch; aufwendigste Serviceform." },
        { theme: "bfk5-abraumen", cat: "Serviceablauf", q: "Wie signalisiert der Gast 'Ich bin fertig'?", opts: ["Besteck kreuzweise auf dem Teller", "Bestecke parallel, Griffe nach rechts unten", "Besteck aufs Tischtuch legen", "Serviette auf den Teller"], a: 1, ex: "Parallel, Griffe rechts unten = fertig; ungekreuzt = Pause." },
      ],
    },
    {
      id: "bfk6",
      code: "BfK-6",
      name: "Getränke & Ausschank",
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/></svg>',
      accent: "#0284c7",
      soft: "#e0f2fe",
      teacher: "",
      ready: true,
      desc: "Getränkekunde, Weinservice, Bierzapfen, Heißgetränke & Schankanlagentechnik.",
      legacyRoutes: {
        hub: "#/bfk/6"
      },
      groups: [
        {
          id: "getraenkekunde",
          badge: "Getränke",
          title: "Getränkekunde, Gläser & Ausschank",
          items: [
            {
              id: "bfk6-glaeser",
              icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 3h10l-1 7a4 4 0 0 1-8 0L7 3z"/><path d="M12 14v7"/><path d="M8 21h8"/></svg>',
              name: "Gläserkunde & Ausschankmaße",
              desc: "17 Gläserarten nach DIN · Eichstrich · Handhabung & Gläserpflege",
              content: `<h2>Gläserkunde &amp; Ausschankmaße</h2>
<div class="hint">Gläserwahl nach Getränkeart · Eichstrich (Füllstrich) · Sensorik &amp; Pflege</div>
<h3 class="sub">1. Die vier Hauptglasgruppen</h3>
<ul>
  <li><b>Weingläser (Ausschankmaß 0,2 l / 0,25 l):</b> Rotweinglas (großer, bauchiger Kelch für Sauerstoffkontakt), Weißweinglas (schlankerer Kelch zur Bewahrung kühler Frische), Roséweinglas und Dessertweinglas (kleiner Kelch, 5 cl z. B. für Sherry/Portwein).</li>
  <li><b>Schaumweingläser (Ausschankmaß 8–16 cl):</b> Sektflöte (hoher schlanker Körper mit Moussierpunkt am Boden), Sektkelch und Sektspitz.</li>
  <li><b>Biergläser (Ausschankmaß 0,2 l bis 0,5 l):</b> Biertulpe (Pils), Willibecher (Universal-Bierglas), Weizenbierglas (hoher, geschwungener Körper für dichte Schaumkrone), Bierstange (Kölsch) und Henkelglas (Bierkrug).</li>
  <li><b>Spirituosen- &amp; Cocktailgläser (Ausschankmaß 2 cl / 4 cl / 5–38 cl):</b> Cognacschwenker (bauchig zur Handwärmeübertragung), Grappaglas (Kaminform), Likörkelch, Martiniglas (Spitzkelch) und Tumbler.</li>
</ul>
<h3 class="sub">2. Gesetzliche Ausschankmaße &amp; Eichstrich</h3>
<p>In der Gastronomie müssen Gläser für gewerblichen Getränkeausschank mit einem amtlichen <b>Eichstrich (Füllstrich)</b> und dem Nennvolumen versehen sein (Mess- und Eichgesetz). Das Getränk muss beim Servieren bis exakt an den Strich reichen (ohne Schaumkrone).</p>
<div class="vi">
  <b>Tóm tắt Tiếng Việt — Phân loại Ly &amp; Định lượng rót (Gläserkunde):</b>
  <ul>
    <li><b>Ly rượu vang (0,2 l / 0,25 l):</b> Ly vang đỏ (bầu tròn rộng để tiếp xúc oxy giải phóng hương bouquet), Ly vang trắng (thân thon gọn giữ độ lạnh), Ly vang ngọt/Sherry (5 cl).</li>
    <li><b>Ly sủi bọt Sekt/Champagner (8–16 cl):</b> Dáng ống thon dài (Sektflöte), đáy có điểm sủi bọt (Moussierpunkt) giúp bọt khí sủi tăm đều lên trên.</li>
    <li><b>Ly bia (0,2 l đến 0,5 l):</b> Biertulpe (bia Pils), Willibecher (bia thông dụng), Weizenbierglas (thân cao lượn sóng giữ lớp bọt dày), Bierstange (bia Kölsch), Henkelglas (ly có quai).</li>
    <li><b>Ly rượu mạnh &amp; Cocktail (2 cl / 4 cl / 5–38 cl):</b> Ly Cognac (bầu tròn áp lòng bàn tay làm ấm rượu), Ly Grappa (dáng hoa tulip), Ly Martini (tam giác), Tumbler (ly đáy dày).</li>
    <li><b>Vạch định mức (Eichstrich):</b> Bắt buộc theo luật đo lường của Đức để bảo vệ khách hàng nhận đúng lượng đồ uống đã trả tiền.</li>
  </ul>
</div>`,
              qa: [
                {
                  q: "Warum hat ein Rotweinglas einen deutlich größeren und bauchigeren Kelch als ein Weißweinglas?",
                  qVi: "Tại sao ly vang đỏ có bầu ly to và phình tròn hơn hẳn so với ly vang trắng?",
                  a: "Der bauchige Kelch bietet eine <b>große Oberfläche für den Sauerstoffkontakt</b>, wodurch der Rotwein „atmen“ kann und sich seine komplexen Aromen und Tannine optimal entfalten. Weißwein hingegen soll kühl bleiben und wird daher in schlankeren Kelchen serviert.",
                  "aVi": "Bầu ly phình to giúp tăng <b>diện tích tiếp xúc với oxy</b>, giúp rượu vang đỏ thở và bung tỏa hết các tầng hương cùng vị chát tannin. Còn vang trắng cần giữ lạnh nên phục vụ trong ly thon nhỏ hơn."
                },
                {
                  q: "Welchem Zweck dient der Moussierpunkt am Boden eines Schaumweinglases?",
                  "qVi": "Điểm sủi bọt (Moussierpunkt) ở đáy ly vang sủi bọt có tác dụng gì?",
                  a: "Der <b>Moussierpunkt</b> ist eine mikroskopisch aufgeraute Stelle am Glasboden, an der sich die im Schaumwein gelöste Kohlensäure sammelt und in <b>gleichmäßigen, feinen Perlenketten nach oben steigt</b>.",
                  "aVi": "Là một điểm nhám siêu nhỏ ở đáy ly giúp khí CO2 hòa tan giải phóng liên tục thành <b>những chuỗi tăm bọt mịn màng dâng đều lên miệng ly</b>."
                }
              ]
            },
            {
              id: "bfk6-bier",
              icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 11h1a3 3 0 0 1 0 6h-1"/><path d="M9 12v6"/><path d="M13 12v6"/><path d="M5 7h12v11a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3Z"/><path d="M5 7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2"/></svg>',
              name: "Biersorten, Ausschank & Schankanlage",
              desc: "Unter- vs. obergärig · Zapftechnik in 3 Schritten · Schankanlagenhygiene",
              content: `<h2>Biersorten, Ausschank &amp; Schankanlagentechnik</h2>
<div class="hint">Gärungsarten · Deutsches Reinheitsgebot 1516 · Der perfekte Zapfvorgang</div>
<h3 class="sub">1. Gärungsarten und Biersorten</h3>
<ul>
  <li><b>Untergärige Biere (Gärtemperatur 4–9 °C, Hefe sinkt ab):</b> Pilsener (feinherb, stark gehopft), Helles / Export (malzbetont, mild), Märzen, Bockbier.</li>
  <li><b>Obergärige Biere (Gärtemperatur 15–20 °C, Hefe steigt auf):</b> Weizenbier / Weißbier (fruchtig, hefetrüb), Kölsch, Altbier, Berliner Weiße.</li>
  <li><b>Deutsches Reinheitsgebot (1516):</b> Nur 4 Zutaten sind erlaubt: <b>Wasser, Gerstenmalz, Hopfen und Hefe</b>.</li>
</ul>
<h3 class="sub">2. Der professionelle Bierzapfvorgang</h3>
<ol>
  <li>Glas vor dem Zapfen mit kaltem, klarem Wasser vorsichtig <b>ausspülen</b> (kühl, staubfrei, vermindert Schaumbildung).</li>
  <li>Glas im <b>45-Grad-Winkel</b> an den Zapfhahn halten; Zapfhahn <b>voll öffnen</b> und das Bier an der Glaswand einlaufen lassen, bis das Glas zu zwei Dritteln gefüllt ist.</li>
  <li>Kurz absetzen lassen, dann gerade nachzapfen und eine <b>feste, feinporige Schaumkrone („Blume“)</b> aufsetzen. Nicht mit dem Hahn in den Schaum eintauchen!</li>
</ol>
<div class="vi">
  <b>Tóm tắt Tiếng Việt — Các loại bia &amp; Kỹ thuật rót bia (Bierservice):</b>
  <ul>
    <li><b>Untergärig (Lên men chìm 4–9 °C):</b> Men chìm xuống đáy bồn; gồm Pils (đắng thanh đậm vị hoa bia), Helles/Export (vị êm dịu), Bockbier.</li>
    <li><b>Obergärig (Lên men nổi 15–20 °C):</b> Men nổi lên bề mặt; gồm Weizenbier (bia lúa mì thơm mùi chuối/đinh hương), Kölsch, Altbier.</li>
    <li><b>Đạo luật Tinh khiết bia Đức 1516:</b> Chỉ dùng đúng 4 nguyên liệu: <b>Nước, Mạch nha lúa mạch, Hoa bia (Hopfen) và Men bia (Hefe)</b>.</li>
    <li><b>Kỹ thuật rót bia chuẩn:</b> Tráng ly bằng nước lạnh → Nghiêng ly 45 độ, mở hết cỡ vòi rót dọc theo thành ly → Đặt ly xuống vài giây rồi rót dựng đứng tạo chóp bọt mịn (Blume). Cấm nhúng vòi rót vào trong bọt bia.</li>
  </ul>
</div>`,
              qa: [
                {
                  q: "Welche vier Rohstoffe sind nach dem deutschen Reinheitsgebot von 1516 für das Bierbrauen zugelassen?",
                  "qVi": "4 nguyên liệu nào được phép dùng để nấu bia theo Đạo luật Tinh khiết 1516 của Đức?",
                  a: "<b>Wasser, Malz (Gerstenmalz), Hopfen und Hefe</b>.",
                  "aVi": "<b>Nước, Mạch nha, Hoa bia (Hopfen) và Men bia (Hefe)</b>."
                },
                {
                  q: "Worin besteht der Unterschied zwischen untergärigen und obergärigen Bieren?",
                  "qVi": "Sự khác biệt giữa bia lên men chìm (untergärig) và bia lên men nổi (obergärig) là gì?",
                  a: "Untergärige Hefe arbeitet bei <b>kühlen Temperaturen (4–9 °C)</b> und setzt sich am <b>Boden</b> ab (z. B. Pils, Export). Obergärige Hefe benötigt <b>wärmere Temperaturen (15–20 °C)</b> und steigt während der Gärung an die <b>Oberfläche</b> (z. B. Weizenbier, Kölsch).",
                  "aVi": "Men chìm hoạt động ở <b>nhiệt độ lạnh 4–9 °C</b> và lắng xuống <b>đáy</b> (như bia Pils, Helles). Men nổi hoạt động ở <b>nhiệt độ ấm hơn 15–20 °C</b> và nổi lên trên <b>mặt</b> (như Weizenbier, Kölsch)."
                }
              ]
            },
            {
              id: "bfk6-wein",
              icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 22h8"/><path d="M12 15v7"/><path d="M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5Z"/></svg>',
              name: "Weinservice & Weinsensorik",
              desc: "Serviertemperaturen · Weinservice am Tisch · Dekantieren vs. Karaffieren",
              content: `<h2>Weinservice &amp; Weinbehandlung</h2>
<div class="hint">Serviertemperaturen · Flaschenöffnung · Probeschluck · Dekantieren vs. Karaffieren</div>
<h3 class="sub">1. Richtige Serviertemperaturen</h3>
<table class="tbl">
  <thead><tr><th>Weinart</th><th>Empfohlene Serviertemperatur</th><th>Beispiele</th></tr></thead>
  <tbody>
    <tr><td><b>Sekt &amp; Champagner</b></td><td>6–8 °C</td><td>Deutscher Winzersekt, Prosecco, Champagne.</td></tr>
    <tr><td><b>Leichte Weißweine &amp; Rosé</b></td><td>8–10 °C</td><td>Riesling trocken, Weißburgunder, Sauvignon Blanc.</td></tr>
    <tr><td><b>Körperreiche Weißweine</b></td><td>10–12 °C</td><td>Grauburgunder im Barrique, Chardonnay.</td></tr>
    <tr><td><b>Leichte Rotweine</b></td><td>14–16 °C</td><td>Spätburgunder (Pinot Noir), Trollinger.</td></tr>
    <tr><td><b>Schwere, kräftige Rotweine</b></td><td>16–18 °C</td><td>Bordeaux, Cabernet Sauvignon, Barolo.</td></tr>
  </tbody>
</table>
<h3 class="sub">2. Dekantieren vs. Karaffieren</h3>
<ul>
  <li><b>Dekantieren:</b> Trennen eines <b>alten Weines vom Bodensatz (Depot / Weinstein)</b>. Die Flasche wird vorsichtig über einer Lichtquelle (Kerze) in die Dekantierkaraffe umgefüllt; sobald das trübe Depot im Flaschenhals erscheint, wird gestoppt.</li>
  <li><b>Karaffieren:</b> Zuführen von <b>Sauerstoff bei jungen, tanninreichen Rotweinen</b> in einer breitbauchigen Karaffe, damit sich Aromen öffnen und der Wein runder schmeckt.</li>
</ul>
<div class="vi">
  <b>Tóm tắt Tiếng Việt — Phục vụ Rượu vang &amp; Xử lý vang (Weinservice):</b>
  <ul>
    <li><b>Nhiệt độ phục vụ chuẩn:</b> Sekt/Champagner: 6–8 °C; Vang trắng &amp; Rosé: 8–10 °C; Vang đỏ nhẹ: 14–16 °C; Vang đỏ đậm: 16–18 °C.</li>
    <li><b>Dekantieren (Gạn cặn):</b> Dành cho vang lâu năm để <b>tách nước rượu trong ra khỏi cặn lắng (Depot)</b> ở đáy chai bằng cách rót từ từ qua ánh nến.</li>
    <li><b>Karaffieren (Thở vang):</b> Rót vang trẻ nhiều tannin vào bình thở đáy rộng để <b>tiếp xúc oxy</b> giúp rượu mềm mại, bớt gắt và bung tỏa hương thơm.</li>
  </ul>
</div>`,
              qa: [
                {
                  q: "Was ist der fachliche Unterschied zwischen Dekantieren und Karaffieren eines Weines?",
                  "qVi": "Sự khác biệt chuyên môn giữa gạn lắng (Dekantieren) và cho vang thở (Karaffieren) là gì?",
                  a: "Beim <b>Dekantieren</b> wird ein älterer Wein behutsam vom <b>Bodensatz (Depot)</b> getrennt. Beim <b>Karaffieren</b> wird ein junger Wein mit viel <b>Sauerstoff</b> in Verbindung gebracht, um seine Aromen zu belüften und Tannine zu harmonisieren.",
                  "aVi": "<b>Dekantieren</b> là tách rượu cũ khỏi <b>cặn lắng (Depot)</b>. <b>Karaffieren</b> là cho rượu trẻ tiếp xúc với <b>oxy</b> để mở hương và làm dịu vị chát tannin."
                }
              ]
            },
            {
              id: "bfk6-heissgetraenke",
              icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4Z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>',
              name: "Kaffee, Tee & Heißgetränke",
              desc: "Siebträgermaschine · 5 M des Espresso · Teezubereitung & Ziehzeiten",
              content: `<h2>Kaffee, Tee &amp; Heißgetränke</h2>
<div class="hint">Kaffee-Extraktion · Die 5 M des perfekten Espresso · Tee-Kunde &amp; Ziehzeiten</div>
<h3 class="sub">1. Die „5 M“ des perfekten Espresso</h3>
<ul>
  <li><b>Mischung:</b> Hochwertige Bohnen (Arabica für feine Säure/Aroma, Robusta für dichte Crema und Körper).</li>
  <li><b>Mühle:</b> Exakter Mahlgrad (nicht zu fein → überextrahiert/bitter; nicht zu grob → unterextrahiert/wässrig).</li>
  <li><b>Menge:</b> Ca. 7–9 g Kaffeepulver für einen einfachen Espresso (ca. 25–30 ml Extrakt in 25 Sekunden).</li>
  <li><b>Maschine:</b> Brühdruck ca. 9 bar, Wassertemperatur ca. 90–94 °C; saubere Brühgruppe und Siebträger.</li>
  <li><b>Mensch:</b> Das handwerkliche Geschick des Baristas (gleichmäßiges Tampen mit ca. 15 kg Anpressdruck).</li>
</ul>
<h3 class="sub">2. Teekunde &amp; Ziehzeiten</h3>
<table class="tbl">
  <thead><tr><th>Teeart</th><th>Wassertemperatur</th><th>Ziehzeit</th><th>Wirkung / Besonderheit</th></tr></thead>
  <tbody>
    <tr><td><b>Schwarzer Tee</b></td><td>100 °C (sprudelnd kochend)</td><td>2–3 Min. anregend; 4–5 Min. beruhigend</td><td>Vollständig fermentiert (z. B. Darjeeling, Assam, Earl Grey).</td></tr>
    <tr><td><b>Grüner Tee</b></td><td>70–80 °C (nicht kochend!)</td><td>1,5–2,5 Min.</td><td>Unfermentiert; bei kochendem Wasser wird er bitter.</td></tr>
    <tr><td><b>Kräuter- &amp; Früchtetee</b></td><td>100 °C</td><td>5–8 Min.</td><td>Muss aus hygienischen Gründen immer mit sprudelnd kochendem Wasser aufgegossen werden!</td></tr>
  </tbody>
</table>
<div class="vi">
  <b>Tóm tắt Tiếng Việt — Cà phê &amp; Trà chuyên nghiệp (Heißgetränke):</b>
  <ul>
    <li><b>Quy tắc 5M pha Espresso hoàn hảo:</b> Mischung (Phối hạt Arabica/Robusta), Mühle (Độ mịn máy xay), Menge (Lượng cà phê 7–9g chiết xuất 25–30ml trong 25 giây), Maschine (Áp suất 9 bar, nhiệt độ nước 90–94 °C), Mensch (Kỹ thuật nén tamper 15kg phẳng đều).</li>
    <li><b>Pha trà đúng chuẩn:</b>
      <ul>
        <li>Trà đen: Nước sôi 100 °C; hãm 2–3 phút tạo hưng phấn, hãm 4–5 phút giúp tĩnh tâm.</li>
        <li>Trà xanh: Nước 70–80 °C (không dùng nước sôi sùng sục vì làm trà bị đắng chát); hãm 1,5–2,5 phút.</li>
        <li>Trà thảo mộc &amp; Trái cây: Bắt buộc dùng nước sôi 100 °C để diệt khuẩn, ngâm 5–8 phút.</li>
      </ul>
    </li>
  </ul>
</div>`,
              qa: [
                {
                  q: "Warum darf grüner Tee niemals mit sprudelnd kochendem Wasser (100 °C) aufgegossen werden?",
                  qVi: "Tại sao trà xanh không bao giờ được pha bằng nước sôi 100 °C?",
                  a: "Weil bei 100 °C die empfindlichen Gerbstoffe und Bitterstoffe zerstört bzw. zu schnell gelöst werden, wodurch der grüne Tee <b>unangenehm bitter und herb</b> schmeckt. Die ideale Wassertemperatur liegt bei <b>70–80 °C</b>.",
                  "aVi": "Vì nước sôi 100 °C giải phóng quá nhanh các chất chát tannin làm trà bị <b>đắng ngắt và mất hương thơm thanh khiết</b>. Nhiệt độ lý tưởng là <b>70–80 °C</b>."
                }
              ]
            }
          ]
        }
      ],
      quiz: [
        { theme: "bfk6-glaeser", cat: "Getränke", q: "Welches Glas verwendet man klassisch für einen schweren Rotwein?", opts: ["Sektflöte", "Bauchiges Rotweinglas mit weiter Öffnung", "Kleiner Tumbler", "Bierstange"], a: 1, ex: "Bauchige Gläser bieten Sauerstoffkontakt zur Aromaentfaltung." },
        { theme: "bfk6-glaeser", cat: "Getränke", q: "Was bedeutet der Füllstrich (Eichstrich) auf Gastronomiegläsern?", opts: ["Mindesthöhe für Schaum", "Gesetzlich vorgeschriebenes Nennvolumen", "Verzierung des Glasherstellers", "Hitzegrenze"], a: 1, ex: "Der Eichstrich sichert die gesetzlich vorgeschriebene Ausschankmenge." },
        { theme: "bfk6-bier", cat: "Getränke", q: "Welche vier Zutaten erlaubt das Reinheitsgebot von 1516?", opts: ["Wasser, Malz, Zucker, Hefe", "Wasser, Gerstenmalz, Hopfen, Hefe", "Wasser, Weizen, Früchte, Hopfen", "Wasser, Hefe, Aromen, Gerste"], a: 1, ex: "Wasser, Malz, Hopfen und Hefe." },
        { theme: "bfk6-bier", cat: "Getränke", q: "Wie wird das Glas zu Beginn des Bierzapfens gehalten?", opts: ["Senkrecht unter den Hahn", "Im 45-Grad-Winkel schräg", "Über Kopf", "Mit dem Hahn im Schaum"], a: 1, ex: "Im 45-Grad-Winkel an der Glaswand einlaufen lassen." },
        { theme: "bfk6-wein", cat: "Getränke", q: "Bei welcher Temperatur wird ein klassischer trockener Weißwein serviert?", opts: ["16–18 °C", "8–10 °C", "0–2 °C", "20–22 °C"], a: 1, ex: "Weißwein schmeckt bei 8–10 °C erfrischend und aromatisch." },
        { theme: "bfk6-wein", cat: "Getränke", q: "Wozu dient das Dekantieren bei einem gereiften Rotwein?", opts: ["Zum Kühlen des Weines", "Zur Trennung vom ungenießbaren Bodensatz (Depot)", "Zur Vermischung mit Wasser", "Zur Kohlensäureanreicherung"], a: 1, ex: "Dekantieren trennt den klaren Wein vom festen Depot." },
        { theme: "bfk6-heissgetraenke", cat: "Getränke", q: "Welche Brühwassertemperatur ist für die Zubereitung von grünem Tee ideal?", opts: ["100 °C sprudelnd kochend", "70–80 °C abgekühlt", "50 °C lauwarm", "120 °C unter Dampf"], a: 1, ex: "70–80 °C verhindern ein Bitterwerden des Tees." }
      ]
    },

    {
      id: "bfks",
      code: "BfK-S",
      name: "Service Schwerpunkt",
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
      accent: "#d97706",
      soft: "#fef3c7",
      teacher: "",
      ready: true,
      desc: "Vertiefte Gästebetreuung, Menügestaltung, Tranchieren, Filetieren & Beschwerdemanagement.",
      legacyRoutes: {
        hub: "#/bfk/s"
      },
      groups: [
        {
          id: "service-spezial",
          badge: "Service",
          title: "Gehobener Restaurantservice & Tischzubereitung",
          items: [
            {
              id: "bfks-tranchieren",
              icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m14 10 7-7"/><path d="m20 10-7-7"/><path d="M3 21l9-9"/><path d="M9 21l9-9"/></svg>',
              name: "Tranchieren & Filetieren am Tisch",
              desc: "Geflügel & Fisch am Guéridon · Fachbesteck · Schnittführung & Hygiene",
              content: `<h2>Tranchieren &amp; Filetieren am Tisch des Gastes</h2>
<div class="hint">Tischservice am Guéridon · Fachgerechte Zerlegung · Arbeitsablauf &amp; Präsentation</div>
<h3 class="sub">1. Arbeitsplatz &amp; Mise en place am Guéridon</h3>
<ul>
  <li>Beistelltisch (<b>Guéridon</b>) rechts neben dem Gästetisch platzieren mit freier Sicht für den Gast.</li>
  <li>Schneidebrett mit Saftrille, vorgewärmte Servierplatten, Tranchierbesteck (Tranchiermesser, Tranchiergabel) und Fischvorlegebesteck.</li>
  <li>Rechaud (Warmhalteplatte) zum Warmhalten der vorgewärmten Teller und Speisenkomponenten.</li>
</ul>
<h3 class="sub">2. Tranchieren von Geflügel (z. B. Ente, Poularde)</h3>
<ol>
  <li>Präsentation des ganzen Geflügels auf der Platte vor dem Gast.</li>
  <li>Keulen durch leichten Druck nach außen abspreizen, Gelenk ertasten und mit einem sauberen Schnitt durchtrennen.</li>
  <li>Brustfilets entlang des Brustbeins (Kiel) links und rechts in dünnen, gleichmäßigen Tranchen schräg herunterschneiden.</li>
  <li>Fleischteile auf der vorgewärmten Servierplatte anrichten, Beilagen und Saucenteil dekorativ komplettieren.</li>
</ol>
<div class="vi">
  <b>Tóm tắt Tiếng Việt — Xẻ thịt &amp; Lọc phi-lê tại bàn khách (Tranchieren &amp; Filetieren):</b>
  <ul>
    <li>Thực hiện trên xe đẩy phục vụ (Guéridon) đặt bên phải bàn khách để khách chiêm ngưỡng kỹ nghệ của nhân viên phục vụ.</li>
    <li><b>Tranchieren Geflügel (Xẻ thịt gia cầm):</b> Trình bày cả con vịt/gà trước mặt khách → Cắt rời 2 đùi tại khớp xương → Rạch dọc xương ức để lạng 2 miếng ức phi-lê thành từng lát xéo đẹp mắt → Bày đĩa giữ nóng trên Rechaud và rưới sốt.</li>
    <li><b>Filetieren Fisch (Lọc phi-lê cá):</b> Dùng dao và nĩa chuyên dụng gạt vây lưng, vây bụng, rạch dọc sống lưng lấy 2 miếng phi-lê trên, nhấc bỏ toàn bộ xương sống rồi lấy tiếp 2 miếng phi-lê dưới.</li>
  </ul>
</div>`,
              qa: [
                {
                  q: "Von welcher Seite wird der Beistelltisch (Guéridon) zum Tranchieren am Gästetisch platziert?",
                  "qVi": "Xe đẩy phục vụ Guéridon được đặt ở vị trí nào cạnh bàn của khách?",
                  a: "Der Guéridon wird <b>rechts vom Tisch bzw. in Sichtweite der Gäste</b> so platziert, dass die Gäste den handwerklichen Vorgang aufmerksam verfolgen können und der Servierablauf nicht behindert wird.",
                  "aVi": "Đặt ở <b>phía bên phải hoặc nơi khách dễ quan sát nhất</b> để khách chiêm ngưỡng kỹ năng phục vụ mà không làm vướng lối đi."
                }
              ]
            },
            {
              id: "bfks-flambieren",
              icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>',
              name: "Flambieren am Gast",
              desc: "Crepes Suzette & Pfeffersteak · Rechaud · Alkoholika & Sicherheitsregeln",
              content: `<h2>Flambieren am Gast</h2>
<div class="hint">Show-Element der klassischen Gastronomie · Brandgefahr · Typische Gerichte</div>
<h3 class="sub">1. Sicherheitsregeln beim Flambieren</h3>
<ul>
  <li>Sicherer Abstand zu brennbaren Materialien (Tischdecken, Gardinen, Deko) und zu den Gästen (insbesondere Haare und Kleidung).</li>
  <li>Spirituosen niemals direkt aus der Flasche in die heiße Pfanne gießen (<b>Rückschlaggefahr!</b>). Immer einen Portionsgießer oder Schöpflöffel verwenden.</li>
  <li>Einen passenden Pfannendeckel griffbereit halten, um eventuelle Flammen im Notfall sofort durch Sauerstoffentzug zu ersticken.</li>
</ul>
<h3 class="sub">2. Klassische Gerichte</h3>
<ul>
  <li><b>Süßspeisen:</b> <b>Crêpes Suzette</b> (flambiert mit Grand Marnier / Cointreau und Orangenkaramell).</li>
  <li><b>Fleischgerichte:</b> <b>Flambiertes Pfeffersteak</b> (flambiert mit Cognac / Weinbrand).</li>
</ul>
<div class="vi">
  <b>Tóm tắt Tiếng Việt — Nghệ thuật đốt rượu biểu diễn tại bàn (Flambieren):</b>
  <ul>
    <li><b>Quy tắc an toàn sống còn:</b> Tuyệt đối <b>không rót rượu trực tiếp từ chai vào chảo đang nóng</b> (nguy cơ lửa bén ngược nổ chai); luôn đong qua muôi hoặc ly rót nhỏ. Luôn để sẵn nắp vung để dập lửa khi cần.</li>
    <li><b>Món ăn kinh điển:</b> Bánh Crêpes Suzette (sốt cam đốt bằng rượu mùi Grand Marnier) và Bít tết tiêu đen (đốt bằng rượu mạnh Cognac).</li>
  </ul>
</div>`,
              qa: [
                {
                  q: "Warum darf beim Flambieren niemals Spirituose direkt aus der Originalflasche in die Pfanne gegossen werden?",
                  "qVi": "Tại sao khi đốt rượu tuyệt đối không được rót trực tiếp từ chai vào chảo?",
                  a: "Es besteht akute <b>Rückschlag- und Explosionsgefahr</b>: Die Flamme kann über den Alkoholstrahl in das Innere der Flasche schlagen und die Glasflasche zersprengen.",
                  "aVi": "Nguy cơ <b>lửa bắt ngược vào chai gây nổ vỡ chai thủy tinh</b> và bỏng nặng cho nhân viên cùng khách."
                }
              ]
            },
            {
              id: "bfks-beschwerdemanagement",
              icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
              name: "Professionelles Beschwerdemanagement",
              desc: "Die LEARN-Methode · Deeskalation · Kulanz & Wiedergutmachung",
              content: `<h2>Professionelles Beschwerdemanagement im Service</h2>
<div class="hint">Umgang mit schwierigen Situationen · Deeskalation · Kundenbindung durch Kulanz</div>
<h3 class="sub">1. Die LEARN-Methode bei Gästereklamationen</h3>
<ol>
  <li><b>L – Listen (Aktiv zuhören):</b> Den Gast ausreden lassen, nicht ins Wort fallen, Blickkontakt halten und durch Nicken Aufmerksamkeit signalisieren.</li>
  <li><b>E – Empathize (Verständnis zeigen):</b> Sich in die Situation des Gastes hineinversetzen (<i>„Ich verstehe vollkommen, dass Sie verärgert sind...“</i>).</li>
  <li><b>A – Apologize (Entschuldigen):</b> Aufrichtig im Namen des Hauses um Entschuldigung bitten – ohne Ausreden oder Schuldzuweisungen an Kollegen.</li>
  <li><b>R – Resolve (Sofortige Lösung bieten):</b> Schnelle Abhilfe schaffen (Gericht austauschen, neues Getränk bringen, Kaffee aufs Haus anbieten).</li>
  <li><b>N – Notify / Follow-up (Nachfragen &amp; Informieren):</b> Nach wenigen Minuten diskret nachfragen, ob alles zur Zufriedenheit ist; Vorfall intern dokumentieren.</li>
</ol>
<div class="vi">
  <b>Tóm tắt Tiếng Việt — Xử lý phàn nàn &amp; khiếu nại chuyên nghiệp (LEARN):</b>
  <ul>
    <li><b>Listen (Lắng nghe):</b> Để khách nói hết bức xúc, không cãi lại, không đổ lỗi cho bộ phận bếp.</li>
    <li><b>Empathize (Đồng cảm):</b> Thấu hiểu cảm xúc của khách, thể hiện sự chia sẻ.</li>
    <li><b>Apologize (Xin lỗi):</b> Chân thành xin lỗi đại diện cho nhà hàng.</li>
    <li><b>Resolve (Giải quyết):</b> Đổi món mới ngay lập tức, mời tráng miệng/cà phê miễn phí.</li>
    <li><b>Notify (Hỏi thăm &amp; Lưu lại):</b> Quay lại bàn hỏi thăm xem khách đã hài lòng với đĩa mới chưa và báo cáo quản lý để cải tiến quy trình.</li>
  </ul>
</div>`,
              qa: [
                {
                  q: "Wofür stehen die Buchstaben der LEARN-Methode bei einer Gästereklamation?",
                  "qVi": "Các chữ cái trong phương pháp xử lý phàn nàn LEARN đại diện cho điều gì?",
                  a: "<b>L</b>isten (Zuhören), <b>E</b>mpathize (Verständnis zeigen), <b>A</b>pologize (Entschuldigen), <b>R</b>esolve (Lösung anbieten), <b>N</b>otify / Follow-up (Nachfragen und Weiterleiten).",
                  "aVi": "<b>L</b>ắng nghe, <b>E</b> Đồng cảm, <b>A</b> Xin lỗi, <b>R</b> Đưa ra giải pháp, <b>N</b> Hỏi thăm kiểm tra lại."
                }
              ]
            },
            {
              id: "bfks-menueberatung",
              icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
              name: "Speisen- & Getränkekorrespondenz",
              desc: "Klassische Menüregeln · Weinbegleitung · Harmonie der Speisenfolgen",
              content: `<h2>Speisen- und Getränkekorrespondenz</h2>
<div class="hint">Klassische Menügesetze · Korrespondenz von Speise und Wein · Verkaufsfördernde Empfehlungen</div>
<h3 class="sub">1. Klassische Menüregeln</h3>
<ul>
  <li>Keine Wiederholung von Grundstoffen, Zubereitungsarten (z. B. nicht zweimal frittiert) oder Saucengrundlagen im selben Menü.</li>
  <li>Steigerung im Menüverlauf: <b>Vom Leichten zum Schweren</b>, <b>von kalt nach warm</b>, <b>von hell nach dunkel</b>.</li>
</ul>
<h3 class="sub">2. Grundregeln der Weinbegleitung</h3>
<ul>
  <li>Weißwein vor Rotwein (Ausnahme: edelsüße Dessertweine am Schluss).</li>
  <li>Leichte, trockene Weine vor schweren, gehaltvollen Weinen.</li>
  <li>Junge, fruchtige Weine vor gereiften, älteren Weinen.</li>
  <li>Die Säure im Wein sollte mit der Säure im Essen harmonieren; fettreiche Speisen vertragen säurebetontere oder tanninhaltige Weine.</li>
</ul>
<div class="vi">
  <b>Tóm tắt Tiếng Việt — Kết hợp Món ăn &amp; Đồ uống (Speisen- &amp; Weinkorrespondenz):</b>
  <ul>
    <li><b>Quy tắc thực đơn:</b> Không lặp lại nguyên liệu chính và cách chế biến trong một bữa ăn; trình tự từ món nhẹ đến món đậm đà, từ món lạnh đến món nóng.</li>
    <li><b>Quy tắc chọn rượu vang:</b> Vang trắng trước vang đỏ, vang nhẹ trước vang nặng, vang trẻ trước vang ủ lâu năm. Món ăn nhiều mỡ hợp với vang có độ chua thanh hoặc tannin đậm để cân bằng vị giác.</li>
  </ul>
</div>`,
              qa: [
                {
                  q: "Welche Grundregeln gelten für die Reihenfolge der Weine bei einem mehrgängigen Menü?",
                  "qVi": "Những quy tắc cơ bản nào áp dụng cho thứ tự phục vụ rượu vang trong thực đơn nhiều món?",
                  a: "1. <b>Weißwein vor Rotwein</b>.<br>2. <b>Leichte Weine vor schweren Weinen</b>.<br>3. <b>Trockene Weine vor süßen Weinen</b> (süße Weine erst zum Dessert).",
                  "aVi": "1. <b>Vang trắng trước vang đỏ</b>.<br>2. <b>Vang nhẹ trước vang đậm đà</b>.<br>3. <b>Vang chát/khô trước vang ngọt</b> (vang ngọt phục vụ cùng món tráng miệng)."
                }
              ]
            }
          ]
        }
      ],
      quiz: [
        { theme: "bfks-tranchieren", cat: "Service", q: "Auf welcher Seite des Gastes wird der Guéridon platziert?", opts: ["Links", "Rechts bzw. in Sichtweite", "Hinter dem Rücken des Gastes", "Im Küchenbereich"], a: 1, ex: "Der Guéridon steht rechts in guter Sichtweite des Gastes." },
        { theme: "bfks-flambieren", cat: "Service", q: "Was darf man beim Flambieren niemals tun?", opts: ["Eine Pfanne benutzen", "Alkohol direkt aus der Flasche in die heiße Pfanne gießen", "Den Gast informieren", "Einen Rechaud verwenden"], a: 1, ex: "Wegen Rückschlag- und Explosionsgefahr niemals aus der Flasche gießen." },
        { theme: "bfks-beschwerdemanagement", cat: "Service", q: "Was ist der erste Schritt der LEARN-Methode?", opts: ["Sofort widersprechen", "Listen – Aufmerksam und aktiv zuhören", "Rechnung stornieren", "Die Küche beschuldigen"], a: 1, ex: "Listen: Den Gast ausreden lassen und aktiv zuhören." },
        { theme: "bfks-menueberatung", cat: "Service", q: "In welcher Reihenfolge werden Weine im Menü serviert?", opts: ["Rotwein vor Weißwein", "Weißwein vor Rotwein, trocken vor süß", "Süßwein zu Beginn", "Nur ein Wein für alle Gänge"], a: 1, ex: "Vom Leichten zum Schweren: Weiß vor Rot, trocken vor süß." }
      ]
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
        { title: "Klassenarbeit Nr. 3", desc: "Froher Seeblick · Gästebewertungen, Obst, Systemgastronomie, Beleg", exam: "klassenarbeiten/bfk1-ka3.html", loesung: "klassenarbeiten/bfk1-ka3-loesung.html" },
        { title: "Klassenarbeit Nr. 4", desc: "Sonnenblick · vegane Woche, Hülsenfrüchte, Bewirtungsvertrag, USt", exam: "klassenarbeiten/bfk1-ka4.html", loesung: "klassenarbeiten/bfk1-ka4-loesung.html" },
        { title: "Klassenarbeit Nr. 5", desc: "Stadtkrone · Getreide/Gluten, Menüregeln, Zechprellerei, USt vor Ort", exam: "klassenarbeiten/bfk1-ka5.html", loesung: "klassenarbeiten/bfk1-ka5-loesung.html" },
      ],
    },
    bfk2: {
      examThemes: [],
      pruefungen: [
        { title: "Musterprüfung", desc: "Klassenarbeit Nr. 2 · Prüfungsbogen", exam: "klassenarbeiten/kiemtra_mau.html", loesung: "klassenarbeiten/loiGiai_mau.html" },
        { title: "Zusammenfassung KA2", desc: "LF2 Waren & Lieferung · LF3", exam: "klassenarbeiten/ka2.html", loesung: null },
      ],
    },
    deutsch: {
      zusammenfassung: "klassenarbeiten/deutsch.html",
      examThemes: [
        "mindmap-diagramme",
        "text-zu-grafik",
        "muster-ka",
        "inhaltsangabe-formel",
        "inhaltsangabe-muster",
        "inhaltsangabe-uebung",
      ],
      examChecklist: [
        "6 Grundformen (Mindmap, Fluss-, Säulen-, Balken-, Kreis-, Liniendiagramm)",
        "Formauswahl begründen (Zeitverlauf, Anteile %, Vergleich, Hierarchie, Kausalität)",
        "Regeln für eine korrekte Mindmap (Zentrum, Hauptäste, Unteräste, Stichworte)",
        "4-Schritte-Methode (Fragestellung analysieren → Text lesen → Markieren → Form wählen → Zeichnen)",
        "Ursache-Wirkungs-Kette / Teufelskreis (Pfeile A → B → C)",
        "Muster-KA Fleischkonsum: 3 Aspekte erfassen (Gesundheit, Umwelt, Tierwohl)",
        "Prüfungsregeln einhalten: Lineal, nur Stichworte, keine ganzen Sätze, Wörter zählen",
        "Inhaltsangabe-Formel: TATTE (Titel, Autor, Textsorte, Thema, Erscheinungsjahr)",
        "Inhaltsangabe-Sprache: Präsens, sachlich, objektiv, eigene Worte, indirekte Rede",
        "Todsünden vermeiden: Keine wörtliche Rede (Zitate), kein Präteritum/Perfekt, keine eigene Meinung/Wertung",
        "Sinnabschnitte bilden & chronologisch die Haupthandlung wiedergeben",
      ],
      pruefungen: [
        { title: "Klassenarbeit Deutsch · Visualisierung", desc: "Mindmap, Diagramme, Sachtext → Grafik (Herrn Kling) · Interaktive Lern- & Übungsapp", exam: "klassenarbeiten/deutsch.html", loesung: "klassenarbeiten/deutsch.html" },
        { title: "Klassenarbeit Deutsch · Inhaltsangabe", desc: "Formel TATTE, Checkliste, Mustertexte (Spaghettieis, Trachtenmode) & Übung „Hauptsache weit“ (DE/VI)", exam: "klassenarbeiten/deutsch-inhaltsangabe.html", loesung: "klassenarbeiten/deutsch-inhaltsangabe.html" },
      ],
    },
    englisch: {
      // KA: alle Themen (Telephoning, Present/Future tenses, Complaints, Quantifiers)
      examThemes: ["telephoning", "present-future-tenses", "complaints-restaurant", "quantifiers"],
      pruefungen: [
        { title: "Class Test 1 (Mock)", desc: "Telephoning · Complaints · Quantifiers · Tenses · 50 P.", exam: "klassenarbeiten/englisch-ka1.html", loesung: "klassenarbeiten/englisch-ka1-loesung.html" },
        { title: "Class Test 2 (Mock)", desc: "Problem call · complaints · few/little · tenses · 50 P.", exam: "klassenarbeiten/englisch-ka2.html", loesung: "klassenarbeiten/englisch-ka2-loesung.html" },
        { title: "Class Test 3 (Mock)", desc: "Dialogue writing · C/U nouns · error correction · tenses · 50 P.", exam: "klassenarbeiten/englisch-ka3.html", loesung: "klassenarbeiten/englisch-ka3-loesung.html" },
      ],
    },
    gk: {
      // KA 1: Volksabstimmung, repräsentative Demokratie, Mehrheitsprinzip,
      // Gewaltenteilung + Gewaltenverschränkung, Menschen-/Bürgerrechte, Karikatur
      zusammenfassung: "klassenarbeiten/gk-zusammenfassung.html",
      examThemes: ["partizipation", "demokratie-gg", "gewaltenteilung", "grundrechte", "karikatur-methode", "wahlgrundsaetze", "erst-zweitstimme", "sperrklausel", "vertrauensfrage", "statistik-analyse", "kalter-krieg", "zentralismus"],
      examChecklist: [
        "Volksabstimmung (Initiative → Begehren → Entscheid)",
        "Repräsentative Demokratie",
        "Mehrheitsprinzip",
        "Gewaltenteilung",
        "Gewaltenverschränkung + Beispiele",
        "Menschen- und Bürgerrechte",
        "Karikatur interpretieren",
        "5 Wahlrechtsgrundsätze (A-U-F-G-G)",
        "Erststimme vs. Zweitstimme (Direktmandat & personalisierte Verhältniswahl)",
        "Sperrklausel (5 %-Hürde & Grundmandatsklausel)",
        "Vertrauensfrage (Art. 68 GG) vs. konstruktives Misstrauensvotum (Art. 67 GG)",
        "Statistikanalyse: Dreischritt (Einleitung – Analyse – Fazit)",
        "Kalter Krieg: Merkmale, Systemvergleich & Chronologie 1945–1990",
        "Zentralismus vs. Dezentralisierung / Föderalismus",
      ],
      pruefungen: [
        { title: "Klassenarbeit 12.10.2026", desc: "Wahlen, Macht & Geschichte · 9 Aufgaben (50 P.) mit Musterlösung", exam: "klassenarbeiten/gk-ka-2026-10-12.html", loesung: "klassenarbeiten/gk-ka-2026-10-12.html" },
        { title: "Übung Nr. 1", desc: "Partizipation · Grundgesetz · Gleichberechtigung", exam: "klassenarbeiten/gk-ka1.html", loesung: "klassenarbeiten/gk-ka1-loesung.html" },
        { title: "Übung Nr. 2", desc: "Gewaltenteilung · Gewaltenverschränkung · Medien · Vertrauensfrage", exam: "klassenarbeiten/gk-ka2.html", loesung: "klassenarbeiten/gk-ka2-loesung.html" },
        { title: "Übung Nr. 3", desc: "Direkte Demokratie · Karikatur · Menschen-/Bürgerrechte · Mehrheitsprinzip", exam: "klassenarbeiten/gk-ka3.html", loesung: "klassenarbeiten/gk-ka3-loesung.html" },
      ],
    },
  };

  function applyExamMeta(f) {
    const meta = FACH_EXAM_META[f.id] || {};
    if (!Array.isArray(f.examThemes)) f.examThemes = (meta.examThemes || []).slice();
    if (!Array.isArray(f.pruefungen)) f.pruefungen = (meta.pruefungen || []).slice();
    if (!Array.isArray(f.examChecklist)) f.examChecklist = (meta.examChecklist || []).slice();
    if (!f.zusammenfassung) f.zusammenfassung = meta.zusammenfassung || null;
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
      if (f.id === "wiko" && w.WIKO_EXTRA_GROUPS && !f.groups.some((g) => g.id === "wk-fachstufe1")) {
        f.groups = f.groups.concat(w.WIKO_EXTRA_GROUPS);
        f.quiz = (f.quiz || []).concat(w.WIKO_EXTRA_QUIZ || []);
      }
      FAECHER.push(applyExamMeta(f));
    });
    if (w.SYMBOLE_FACH && !FAECHER.some((x) => x.id === "symbole")) {
      FAECHER.push(applyExamMeta(w.SYMBOLE_FACH));
    }
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
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
        name,
        desc: "",
        content: `<h2>${name}</h2><div class="hint">Inhalt folgt.</div>`,
        pages: null,
      };
    },
    registerFach(fach) {
      if (!fach || !fach.id) return null;
      if (FAECHER.some((f) => f.id === fach.id)) return null;
      FAECHER.push(fach);
      return fach;
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

