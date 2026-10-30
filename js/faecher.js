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
      teacher: "Fr. Schuster (SLA)",
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
        name: "Service & Vận hành Nhà hàng (BfK2-ED)",
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/></svg>',
        accent: "#dc2626",
        soft: "#fef2f2",
        teacher: "Fr. Herrmann / BfK2-ED",
        examDate: "2026-07-14",
        ready: true,
        desc: "Năm 1: LF1 Beruf/Kommunikation · LF5 Service, Getränke, Bier/Wein, POS, Buffet | Năm 2: Fleisch & Küche · Fisch (Warenkunde & Zubereitung)",
        legacyRoutes: {
          hub: "#/bfk/2"
        },
        groups: [
          {
            id: "lf1-orientierung",
            badge: "LF 1 (Năm 1)",
            title: "Orientierung & Kommunikation",
            items: [
              {
                id: "bfk2-berufsbilder",
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12.01" y2="8"/><line x1="12" y1="11" x2="12" y2="16"/></svg>',
                name: "LS01 · Berufsbilder im Gastgewerbe",
                desc: "7 Chân dung nghề 2022 · Fachkraft für Gastronomie · Key facts",
                content: `<h2> Berufsbilder im Gastgewerbe (Trang 04 - 11)</h2>
<div class="hint">LS01 · 7 Chân dung nghề nghiệp Gastronomie (2022) · Fachkraft für Gastronomie · Key facts</div>
<h3 class="sub">1. Tình huống học tập (Lernsituation)</h3>
<p>Bạn là học viên (Azubi) tại <strong>Hotel &amp; Restaurant Schwarzwaldblick</strong> (Bad Wildbad). Nhân dịp <em>Tag der offenen Tür</em>, bạn có nhiệm vụ thiết kế Poster/Profile giới thiệu 7 khối nghề đào tạo Gastronomie cho học sinh sắp tốt nghiệp.</p>
<h3 class="sub">2. 7 Chân dung Nghề nghiệp trong Ngành (2022)</h3>
<ul>
  <li><strong>Gruppe 1:</strong> <span class="term" data-de="Fachkraft für Gastronomie" data-vi="chuyên viên dịch vụ ẩm thực (2 năm)">Fachkraft für Gastronomie</span> (hệ 2 năm)</li>
  <li><strong>Gruppe 2:</strong> <span class="term" data-de="Fachmann/-frau für Systemgastronomie" data-vi="chuyên viên ẩm thực hệ thống/chuỗi">Fachmann/-frau für Systemgastronomie</span></li>
  <li><strong>Gruppe 3:</strong> <span class="term" data-de="Fachmann/-frau für Restaurants und Veranstaltungsgastronomie" data-vi="chuyên viên nhà hàng &amp; sự kiện">Fachmann/-frau für Restaurants und Veranstaltungsgastronomie</span></li>
  <li><strong>Gruppe 4:</strong> <span class="term" data-de="Fachkraft Küche" data-vi="chuyên viên bếp (2 năm)">Fachkraft Küche</span> (hệ 2 năm)</li>
  <li><strong>Gruppe 5:</strong> <span class="term" data-de="Koch/Köchin" data-vi="đầu bếp chuyên nghiệp (3 năm)">Koch/Köchin</span> (hệ 3 năm)</li>
  <li><strong>Gruppe 6:</strong> <span class="term" data-de="Hotelfachmann/-frau" data-vi="chuyên viên quản trị khách sạn">Hotelfachmann/-frau</span></li>
  <li><strong>Gruppe 7:</strong> <span class="term" data-de="Kaufmann/-frau für Hotelmanagement" data-vi="chuyên viên quản lý kinh doanh khách sạn">Kaufmann/-frau für Hotelmanagement</span></li>
</ul>
<h3 class="sub">3. Chi tiết nghề "Fachkraft für Gastronomie"</h3>
<table>
  <tr><th>Tiêu chí</th><th>Thông tin chi tiết</th></tr>
  <tr><td><span class="term" data-de="Berufsbild" data-vi="mô tả nghề nghiệp">Berufsbild</span></td><td>Chào đón, tư vấn khách, phục vụ đồ ăn/thức uống, <span class="term" data-de="kassieren" data-vi="thu tiền / thanh toán">kassieren</span> — là gương mặt và giọng nói đại diện cho doanh nghiệp.</td></tr>
  <tr><td><span class="term" data-de="Beschäftigungsbetrieb" data-vi="nơi làm việc">Beschäftigungsbetrieb</span></td><td>Nhà hàng, quán café, Gasthof, Systemgastronomie, Khách sạn, Catering, Kantine.</td></tr>
  <tr><td><span class="term" data-de="Ausbildungsdauer" data-vi="thời gian đào tạo">Ausbildungsdauer</span></td><td><strong>2 năm</strong> (có thể học thêm 1 năm chuyển tiếp lên bằng 3 năm).</td></tr>
  <tr><td><span class="term" data-de="Anforderungsprofil" data-vi="hồ sơ yêu cầu năng lực">Anforderungsprofil</span></td><td>Thân thiện, thích làm việc nhóm, giao tiếp &amp; bán hàng tốt, có kỹ năng tổ chức.</td></tr>
</table>
<div class="note"><b>Das Gastronomie-Einmaleins:</b> Kiến thức nền tảng bắt buộc gồm phục vụ, tư vấn và thanh toán hóa đơn.</div>
<h3 class="sub">4. Bảng từ vựng LS01 (Phần 1)</h3>
<table>
  <tr><th>Thuật ngữ Đức</th><th>Ý nghĩa Việt</th></tr>
  <tr><td><span class="term" data-de="die Fachkraft, "-e" data-vi="chuyên viên / nhân lực lành nghề">die Fachkraft</span></td><td>Nhân viên đã qua đào tạo chuyên môn</td></tr>
  <tr><td><span class="term" data-de="das Gastgewerbe" data-vi="ngành dịch vụ khách sạn &amp; nhà hàng">das Gastgewerbe</span></td><td>Ngành hospitality nói chung</td></tr>
  <tr><td><span class="term" data-de="die Systemgastronomie" data-vi="ẩm thực hệ thống (chuẩn hóa)">die Systemgastronomie</span></td><td>Chuỗi nhà hàng chuẩn hóa (Vapiano, McDonald's...)</td></tr>
  <tr><td><span class="term" data-de="die Veranstaltungsgastronomie" data-vi="ẩm thực sự kiện / tiệc mừng">die Veranstaltungsgastronomie</span></td><td>Dịch vụ catering tiệc cưới, hội nghị</td></tr>
  <tr><td><span class="term" data-de="das Einmaleins" data-vi="bảng cửu chương / kiến thức cơ bản">das Einmaleins</span></td><td>Kiến thức nền tảng bắt buộc</td></tr>
  <tr><td><span class="term" data-de="der Nachwuchskraft, "-e" data-vi="nhân lực trẻ tiềm năng / Azubi">der Nachwuchskraft</span></td><td>Thế hệ học viên mới</td></tr>
</table>`
              },
              {
                id: "bfk2-gastgeber-team",
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
                name: "LS01 · Rolle als Gastgeber & im Team",
                desc: "Mindmap Anforderungen · Phản hồi đồng nghiệp · 5 Tình huống phục vụ",
                content: `<h2> Yêu cầu Vai trò Gastgeber & im Team (Trang 12 - 16)</h2>
<div class="hint">LS01 · Vai trò Gastgeber & Đồng đội · Mindmap · 5 Tình huống phục vụ thực tế</div>
<h3 class="sub">1. Sơ đồ tư duy (Mindmap Anforderungen)</h3>
<table>
  <tr><th>Vai trò</th><th>Yêu cầu năng lực cốt lõi</th></tr>
  <tr><td><span class="term" data-de="als Gastgeber/in" data-vi="với vai trò chủ nhà">Als Gastgeber/in</span></td><td><span class="term" data-de="Freundlichkeit" data-vi="sự thân thiện">Freundlichkeit</span>, <span class="term" data-de="Kommunikation" data-vi="giao tiếp">Kommunikation</span>, <span class="term" data-de="Servicequalität" data-vi="chất lượng dịch vụ">Servicequalität</span>, <span class="term" data-de="Problemlösung" data-vi="giải quyết vấn đề">Problemlösung</span>.</td></tr>
  <tr><td><span class="term" data-de="im Team" data-vi="trong đội ngũ đồng đội">Im Team</span></td><td><span class="term" data-de="Teamfähigkeit" data-vi="khả năng làm việc nhóm">Teamfähigkeit</span>, <span class="term" data-de="Zuverlässigkeit" data-vi="độ tin cậy">Zuverlässigkeit</span>, <span class="term" data-de="Respekt" data-vi="sự tôn trọng">Respekt</span>, <span class="term" data-de="Flexibilität" data-vi="sự linh hoạt">Flexibilität</span> &amp; Ordnung.</td></tr>
</table>
<h3 class="sub">2. Góc nhìn từ Đồng nghiệp (Aussagen der Kolleg/innen)</h3>
<ul>
  <li><em>"Freundlichkeit und ein souveränes Auftreten sind das A und O."</em> (Thân thiện &amp; tự tin là cốt lõi).</li>
  <li><em>"Ein gepflegtes Äußeres ist wichtig für die Gäste."</em> (Ngoại hình chỉn chu tươm tất).</li>
  <li><em>"Kritikfähig sein und konstruktives Feedback anzunehmen."</em> (Tiếp thu góp ý xây dựng).</li>
  <li><em>"In schwierigen Situationen diplomatisch und schlagfertig sein."</em> (Khéo léo &amp; ứng biến nhanh trí).</li>
  <li><em>"Ohne Vertrauen geht es nicht. Abmachungen einhalten."</em> (Tin tưởng &amp; giữ đúng cam kết).</li>
</ul>
<h3 class="sub">3. 5 Tình huống Giải quyết Phục vụ Thực tế</h3>
<table>
  <tr><th>Tình huống</th><th>Cách xử lý chuẩn (Gute Reaktion)</th></tr>
  <tr><td><strong>1. Khách muốn nói chuyện phiếm lúc đông</strong></td><td>Trả lời ngắn gọn, giải thích nhà hàng đông, hẹn quay lại sau khi vơi việc.</td></tr>
  <tr><td><strong>2. Hết phòng / xếp sai phòng khách đặt</strong></td><td>Chân thành xin lỗi, giải thích <span class="term" data-de="ausgebucht" data-vi="cháy phòng / kín chỗ">ausgebucht</span>, đền bù voucher/đồ uống miễn phí.</td></tr>
  <tr><td><strong>3. Bếp trưởng chê xốt salad loãng (<span class="term" data-de="wässrig" data-vi="bị loãng / nhạt nhòa">wässrig</span>)</strong></td><td>Vui vẻ tiếp thu chỉ trích, xin lỗi và lập tức điều chỉnh/pha lại xốt mới.</td></tr>
  <tr><td><strong>4. Đồng nghiệp bối rối trước khách giận</strong></td><td>Chủ động tới hỗ trợ, điềm tĩnh tiếp quản cuộc trò chuyện và xoa dịu khách.</td></tr>
  <tr><td><strong>5. 2 Azubi tranh công việc dễ</strong></td><td>Trao đổi ngắn gọn, chia đôi công việc công bằng và cam kết luôn luôn luân chuyển ca sau.</td></tr>
</table>
<div class="note"><b>Merksatz:</b> Phân công trách nhiệm rõ ràng tạo nên vận hành trơn tru (reibungslose Zusammenarbeit).</div>`
              },
              {
                id: "bfk2-kommunikation",
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
                name: "LS04 · Angemessen kommunizieren",
                desc: "3 Dạng giao tiếp · Phương pháp Cornell · Xử lý nhiễu giao tiếp",
                content: `<h2> Angemessen kommunizieren (Trang 17 - 20)</h2>
<div class="hint">LS04 · 3 Dạng giao tiếp · Phương pháp ghi chú Cornell · Xử lý nhiễu giao tiếp</div>
<h3 class="sub">1. 3 Dạng Giao tiếp trong Service</h3>
<table>
  <tr><th>Hình thức</th><th>Nội dung &amp; Đặc điểm</th></tr>
  <tr><td><span class="term" data-de="verbale Kommunikation" data-vi="giao tiếp bằng lời nói">Verbale Kommunikation</span></td><td>Từ ngữ phát ra, cấu trúc câu, vốn từ chuyên ngành lịch sự.</td></tr>
  <tr><td><span class="term" data-de="paraverbale Kommunikation" data-vi="giao tiếp qua giọng điệu">Paraverbale Kommunikation</span></td><td>Ngữ điệu, âm lượng, <span class="term" data-de="das Sprechtempo" data-vi="tốc độ nói">Sprechtempo</span>, độ nhấn nhá. Giọng ấm tạo niềm tin.</td></tr>
  <tr><td><span class="term" data-de="nonverbale Kommunikation" data-vi="giao tiếp phi ngôn ngữ">Nonverbale Kommunikation</span></td><td><span class="term" data-de="die Körpersprache" data-vi="ngôn ngữ cơ thể">Körpersprache</span>: Dáng đứng, nét mặt (Mimik), điệu bộ (Gestik), ánh mắt.</td></tr>
</table>
<h3 class="sub">2. Nhiễu Giao tiếp (<span class="term" data-de="die Kommunikationsstörung" data-vi="sự nhiễu / rủi ro giao tiếp">Kommunikationsstörung</span>)</h3>
<ul>
  <li><strong>Nguyên nhân:</strong> Nói mập mờ, tiếng ồn nhà bếp/khách sạn, áp lực thời gian, rào cản ngôn ngữ, tâm lý mệt mỏi/giận dữ.</li>
  <li><strong>Biện pháp khắc phục:</strong> Nói rõ ràng ngắn gọn, thực hiện <span class="term" data-de="aktives Zuhören" data-vi="lắng nghe chủ động">aktives Zuhören</span> (gật đầu, ghi chép), đặt <span class="term" data-de="die Rückfrage, -n" data-vi="câu hỏi xác nhận lại">Rückfragen</span> xác nhận đơn hàng, giữ thái độ <span class="term" data-de="die Wertschätzung" data-vi="sự tôn trọng khách hàng">Wertschätzung</span>.</li>
</ul>
<div class="formula">Giao tiếp hoàn hảo = Lời nói chuẩn + Ngữ điệu ấm + Thân thể cởi mở</div>`
              }
            ]
          },
          {
            id: "lf5-speisen-getraenke",
            badge: "LF 5 (Năm 1)",
            title: "Speisen & Getränke",
            items: [
              {
                id: "bfk2-snacks",
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12h18"/><path d="M3 12a9 9 0 0 0 18 0"/></svg>',
                name: "LS05 · Snacks und einfache Speisen",
                desc: "3 Nhóm Snack · 5 Tiêu chuẩn chất lượng · Kühlkette & Allergen",
                content: `<h2> Snacks und einfache Speisen zubereiten und servieren (Trang 21 - 24)</h2>
<div class="hint">LS05 · 3 Nhóm Món ăn nhẹ · 5 Tiêu chuẩn chất lượng · Kühlkette & Allergen</div>
<h3 class="sub">1. 3 Nhóm Món ăn nhẹ (Snack-Kategorien)</h3>
<table>
  <tr><th>Nhóm</th><th>Ví dụ món ăn tiêu biểu</th></tr>
  <tr><td><strong>Kalte Snacks</strong> (Món lạnh)</td><td>Belegte Brötchen, Sandwiches, Canapés, Wrap-Variationen, Salad hũ, <span class="term" data-de="das Fingerfood" data-vi="đồ ăn bốc tay">Fingerfood</span>.</td></tr>
  <tr><td><strong>Warme Snacks</strong> (Món nóng)</td><td>Toast Hawaii, Strammer Max, Panini <span class="term" data-de="überbacken" data-vi="nướng phô mai / bỏ lò">überbacken</span>, Súp ngày, Flammkuchen.</td></tr>
  <tr><td><strong>Süße Snacks</strong> (Món ngọt)</td><td>Waffeln/Crêpes tươi, Muffins, Blechkuchen, Sữa chua/Quark trái cây.</td></tr>
</table>
<h3 class="sub">2. 5 Tiêu chuẩn chất lượng vàng của Snack</h3>
<ul>
  <li><strong>Zubereitungszeit:</strong> Chế biến cực nhanh (5 – 10 phút).</li>
  <li><strong>Frische &amp; Qualität:</strong> Nguyên liệu tươi ngon, trình bày bắt mắt.</li>
  <li><strong>Kalkulierbarkeit:</strong> Định lượng chuẩn xác, dễ chuẩn bị trước (Mise en place).</li>
  <li><strong>Handhabung:</strong> Khách dễ ăn nhanh (dùng tay hoặc dụng cụ đơn giản).</li>
  <li><strong>Hygiene &amp; Sicherheit:</strong> Tuân thủ strictly quy tắc an toàn thực phẩm HACCP.</li>
</ul>
<h3 class="sub">3. Bảo quản lạnh &amp; Khái niệm Dị ứng</h3>
<p>Luôn duy trì <span class="term" data-de="die Kühlkette" data-vi="chuỗi lạnh (bảo quản lạnh)">Kühlkette</span> liên tục (2°C – 7°C đối với thịt, sữa, trứng). Đảm bảo <span class="term" data-de="die Allergenkennzeichnung" data-vi="ghi nhãn chất gây dị ứng">Allergenkennzeichnung</span> cho 14 nhóm dị ứng bắt buộc trên thực đơn.</p>`
              },
              {
                id: "bfk2-kaltgetraenke",
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 11h13v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z"/><path d="M17 11h2a3 3 0 0 1 0 6h-2"/></svg>',
                name: "LS06 · Alkoholfreie Kaltgetränke",
                desc: "Mineralwasser, Quellwasser, Tafelwasser · Fruchtsaft & Schorle",
                content: `<h2> Alkoholfreie Kaltgetränke bereitstellen (Trang 25 - 27)</h2>
<div class="hint">LS06 · Phân loại Nước khoáng & Nước hoa quả · Quy tắc phục vụ</div>
<h3 class="sub">1. Phân loại Nước khoáng & Nước uống</h3>
<table>
  <tr><th>Loại nước</th><th>Đặc điểm pháp lý &amp; Sản xuất</th></tr>
  <tr><td><span class="term" data-de="das Mineralwasser" data-vi="nước khoáng">Mineralwasser</span></td><td>Nguồn ngầm bảo vệ, thành phần khoáng ổn định, đóng chai tại nguồn, <span class="term" data-de="amtlich anerkannt" data-vi="được nhà nước kiểm định chứng nhận">amtlich anerkannt</span>.</td></tr>
  <tr><td><span class="term" data-de="das Tafelwasser" data-vi="nước uống pha chế công nghiệp">Tafelwasser</span></td><td>Pha chế công nghiệp từ nước máy + khoáng/muối/CO2, chiết từ vòi kẹp.</td></tr>
  <tr><td>Quellwasser / Heilwasser</td><td>Nước nguồn thiên nhiên / Nước chữa bệnh tuân theo Luật Dược phẩm.</td></tr>
</table>
<h3 class="sub">2. Nước trái cây &amp; Đồ uống hoa quả</h3>
<table>
  <tr><th>Loại đồ uống</th><th>Tỷ lệ trái cây (Fruchtgehalt)</th><th>Đặc điểm</th></tr>
  <tr><td><span class="term" data-de="der Direktsaft" data-vi="nước ép trực tiếp 100%">Fruchtsaft (Direktsaft)</span></td><td><strong>100%</strong></td><td>Ép tươi trực tiếp, không pha nước, không thêm đường.</td></tr>
  <tr><td>Fruchtnektar</td><td><strong>25% – 50%</strong></td><td>Dành cho quả nhiều axit/xốp, pha thêm nước &amp; đường (tối đa 20%).</td></tr>
  <tr><td><span class="term" data-de="die Fruchtsaftschorle" data-vi="nước ép trái cây pha sủi soda">Fruchtsaftschorle</span></td><td><strong>ca. 50% Saft + 50% Wasser</strong></td><td>Hỗn hợp nước ép quả + nước khoáng sủi (Apfelschorle).</td></tr>
</table>
<div class="note"><b>Servierregel:</b> Nhiệt độ phục vụ chuẩn 8°C – 10°C. Chai nguyên tem phải mở trước mặt khách (vor dem Gast öffnen).</div>`
              },
              {
                id: "bfk2-heissgetraenke",
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 11h13v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z"/><path d="M17 11h2a3 3 0 0 1 0 6h-2"/></svg>',
                name: "LS07 · Alkoholfreie Heißgetränke",
                desc: "Arabica vs Robusta · Kakao & Heiße Schokolade · Tee Fermentation & Ziehzeit",
                content: `<h2> Alkoholfreie Heißgetränke (Trang 28 - 38)</h2>
<div class="hint">LS07 · Cà phê Arabica/Robusta · Ca cao & Socola nóng · Trà Fermentation & Ziehzeit</div>
<h3 class="sub">1. Cà phê: Arabica vs. Robusta</h3>
<table>
  <tr><th>Tiêu chí</th><th>Arabica (Coffea Arabica)</th><th>Robusta (Coffea Canephora)</th></tr>
  <tr><td>Độ cao &amp; Vùng trồng</td><td>600m – 2000m (Brasilien, Kolumbien)</td><td>Dưới 600m (Vietnam - xuất khẩu #1 thế giới)</td></tr>
  <tr><td>Hương vị &amp; Koffein</td><td>Thơm ngậy, chua thanh (feine Säure), 1-1,5% Koffein</td><td>Đậm đà, đắng thanh (erdig, kräftig), 2-4,5% Koffein</td></tr>
</table>
<p>Rang cà phê (Röstung): 200°C – 250°C tạo hơn 800 hợp chất hương thơm. Pha Espresso chuẩn dùng <span class="term" data-de="die Dampfdruckverfahren" data-vi="phương pháp ép áp suất hơi nước">Dampfdruckverfahren</span>.</p>

<h3 class="sub">2. Ca cao vs. Socola nóng</h3>
<p>Ca cao chứa <span class="term" data-de="Theobromin" data-vi="chất kích thích dịu êm theobromin">Theobromin</span> kích thích nhẹ nhàng. Kakaogetränk pha từ bột ca cao + sữa; <strong>Heiße Schokolade</strong> chế biến bằng cách đun chảy socola miếng vào sữa nóng.</p>

<h3 class="sub">3. Trà (Tee): Lên men, Cấp độ lá &amp; Thời gian hãm</h3>
<ul>
  <li><span class="term" data-de="die Fermentation" data-vi="quá trình lên men trà">Fermentation</span>: Grüntee (nicht fermentiert), Oolong (halbfermentiert), Schwarztee (voll fermentiert).</li>
  <li><span class="term" data-de="der Blattgrad" data-vi="cấp độ / kích thước lá trà">Blattgrad</span>: Blatt-Tee (nguyên lá), Broken [B] (lá gãy), Fannings [F] (trà vụn túi lọc), Dust [D] (bụi trà).</li>
  <li><span class="term" data-de="die Ziehzeit" data-vi="thời gian hãm trà">Ziehzeit</span>: <strong>3 phút</strong> = <span class="term" data-de="anregend" data-vi="kích thích tỉnh táo">anregend</span> (giải phóng Koffein nhanh); <strong>5 phút</strong> = <span class="term" data-de="beruhigend" data-vi="thư giãn / dịu dạ dày">beruhigend</span> (giải phóng <span class="term" data-de="die Gerbstoffe" data-vi="chất chát Tanin">Gerbstoffe</span>).</li>
</ul>`
              }
            ]
          },
          {
            id: "lf5-bier-wein",
            badge: "LF 5 (Năm 1)",
            title: "Bierkunde & Weinkunde",
            items: [
              {
                id: "bfk2-bierkunde",
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 11h13v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z"/><path d="M17 11h2a3 3 0 0 1 0 6h-2"/></svg>',
                name: "LS08 · Bierkunde und Bierausschank",
                desc: "Reinheitsgebot 1516 · 4 Rohstoffe · Obergärig vs Untergärig · Zapfanlage",
                content: `<h2> Bierkunde und Bierausschank (Trang 39 - 45)</h2>
<div class="hint">LS08 · Reinheitsgebot 1516 · 4 Rohstoffe · Obergärig vs Untergärig · Zapfanlage</div>
<h3 class="sub">1. Luật tinh khiết Đức (<span class="term" data-de="das Reinheitsgebot" data-vi="luật tinh khiết nấu bia 1516">Reinheitsgebot</span> von 1516)</h3>
<p>Bia chỉ được phép nấu từ 4 nguyên liệu chính: <strong>Wasser (Nước)</strong>, <strong>Gerstenmalz (Mạch nha đại mạch)</strong>, <strong>Hopfen (Hoa bia)</strong> và <strong>Hefe (Men bia)</strong>.</p>

<h3 class="sub">2. So sánh Men nổi (<span class="term" data-de="obergärig" data-vi="lên men nổi">obergärig</span>) vs Men chìm (<span class="term" data-de="untergärig" data-vi="lên men chìm">untergärig</span>)</h3>
<table>
  <tr><th>Tiêu chí</th><th>Lên men nổi (Obergärig)</th><th>Lên men chìm (Untergärig)</th></tr>
  <tr><td>Nhiệt độ lên men</td><td>15°C – 22°C (Ấm)</td><td>6°C – 12°C (Mát/Lạnh)</td></tr>
  <tr><td>Đặc tính hương vị</td><td>Hương hoa quả phong phú</td><td>Thanh khiết, đắng tròn vị</td></tr>
  <tr><td>Dòng bia tiêu biểu</td><td>Weizenbier (<span class="term" data-de="hefetrüb" data-vi="đục tự nhiên do men">hefetrüb</span>), Altbier, Kölsch</td><td>Pils (Pilsener), Märzen, Bockbier</td></tr>
</table>
<div class="formula">Nấu bia: Maische (mạch nha+nước) → Würze (dịch cốt đun hoa bia) → Gärung (lên men)</div>
<p>Vận hành vòi rót tươi (<span class="term" data-de="die Zapfanlage, -n" data-vi="hệ thống vòi rót bia tươi">Zapfanlage</span>): Duy trì áp suất CO2 và vệ sinh định kỳ.</p>`
              },
              {
                id: "bfk2-weinkunde",
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 11h13v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z"/><path d="M17 11h2a3 3 0 0 1 0 6h-2"/></svg>',
                name: "LS09 · Weinarten darstellen und empfehlen",
                desc: "Baden & Württemberg · Fließschema Gärung · Weißwein, Rosé, Rotwein · Weißherbst",
                content: `<h2> Weinarten darstellen und empfehlen (Trang 46 - 55)</h2>
<div class="hint">LS09 · Baden & Württemberg · Fließschema · Weißwein, Rosé, Rotwein · Weißherbst</div>
<h3 class="sub">1. Hai Vùng trồng Nho trọng điểm</h3>
<ul>
  <li><strong>Baden:</strong> Vùng dài nhất Đức, >50% diện tích trồng dòng Burgunder (Spätburgunder, Grauburgunder, Weißburgunder, Chardonnay). Nổi tiếng vùng Kaiserstuhl.</li>
  <li><strong>Württemberg:</strong> Nổi tiếng vang đỏ (Trollinger, Lemberger, Schwarzriesling) và Riesling trắng. Vườn nho sườn dốc Steillagen.</li>
</ul>

<h3 class="sub">2. Sơ đồ Sản xuất &amp; Phân loại Rượu vang</h3>
<table>
  <tr><th>Loại rượu</th><th>Nguyên liệu nho</th><th>Quy trình sản xuất</th></tr>
  <tr><td><strong>Weißwein</strong> (Vang trắng)</td><td>Nho trắng</td><td><span class="term" data-de="die Mostgärung" data-vi="lên men nước ép nho đã lọc">Mostgärung</span> (Lên men nước ép nho)</td></tr>
  <tr><td><strong>Rotwein</strong> (Vang đỏ)</td><td>Nho đỏ</td><td><span class="term" data-de="die Maischegärung" data-vi="lên men cả vỏ và hạt nho">Maischegärung</span> (Lên men vỏ nho để chiết xuất màu &amp; tannin)</td></tr>
  <tr><td><strong>Roséwein</strong> (Vang hồng)</td><td>Nho đỏ</td><td>Mostgärung hoặc Maischegärung ngắn vài giờ.</td></tr>
  <tr><td><span class="term" data-de="der Rotling" data-vi="vang hồng lai">Rotling</span></td><td>Nho trắng + Nho đỏ ép chung</td><td>Ép chung cả 2 loại nho rồi lên men.</td></tr>
</table>
<div class="note"><b>Weißherbst:</b> Roséwein làm từ 100% MỘT giống nho đỏ duy nhất, đạt chuẩn Qualitätswein/Prädikatswein.</div>`
              }
            ]
          },
          {
            id: "lf5-service-betrieb",
            badge: "LF 5 (Năm 1)",
            title: "Service, Buffet & POS",
            items: [
              {
                id: "bfk2-buffetregeln",
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>',
                name: "LS04 · Buffetregeln & Vệ sinh",
                desc: "Sơ đồ bày bàn rechts nach links · Kühlkette <=7°C & Warmhalten >=65°C · Hustenschutz",
                content: `<h2> Buffetregeln & Vệ sinh an toàn thực phẩm (Trang 56 - 59)</h2>
<div class="hint">LS04 · Sơ đồ dựng bàn Buffet · Vệ sinh an toàn HACCP · Quy định Nhiệt độ 7°C / 65°C</div>
<h3 class="sub">1. Quy tắc dựng bàn Buffet (Aufbau)</h3>
<ul>
  <li>Chiều sâu bàn tối thiểu <strong>70 cm</strong>; phủ khăn quây (<span class="term" data-de="das Skirting, -s" data-vi="vải quây chân bàn buffet">Skirting</span>) sát đất.</li>
  <li>Trình tự món ăn (<span class="term" data-de="die Menüfolge" data-vi="trình tự món trong thực đơn">Menüfolge</span>) xếp từ <strong>PHẢI sang TRÁI (von rechts nach links)</strong>: Đĩa → Khai vị → Súp → Món chính lạnh → Món chính nóng → Tráng miệng → Bánh mì/Besteck.</li>
  <li>Dụng cụ gắp (<span class="term" data-de="das Vorlagebesteck" data-vi="dụng cụ gắp thức ăn chung">Vorlagebesteck</span>) đặt ở mép dưới đĩa, cán hướng sang phải.</li>
</ul>

<h3 class="sub">2. Quy định Nhiệt độ &amp; An toàn Vệ sinh</h3>
<table>
  <tr><th>Tiêu chí</th><th>Quy định bắt buộc</th></tr>
  <tr><td>Món lạnh (Kältebereich)</td><td>Giữ ở nhiệt độ <strong>&le; 7°C</strong>.</td></tr>
  <tr><td>Món nóng (Warmhaltebereich)</td><td>Khay Chafing Dishes giữ liên tục <strong>&ge; 65°C</strong>.</td></tr>
  <tr><td>Quy tắc 2 giờ</td><td>Thức ăn bày 2–3 tiếng ở nhiệt độ phòng bắt buộc phải <span class="term" data-de="entsorgen" data-vi="tiêu hủy / bỏ đi">entsorgen</span> (tiêu hủy).</td></tr>
  <tr><td>Thiết bị chắn vi khuẩn</td><td>Bắt buộc lắp vách kính chắn ho (<span class="term" data-de="der Hustenschutz" data-vi="vách kính chắn ho / bắn vi khuẩn">Hustenschutz / Spuckschutz</span>).</td></tr>
</table>`
              },
              {
                id: "bfk2-kalkulation",
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M8 6h8"/><path d="M8 10h.01"/><path d="M12 10h.01"/><path d="M16 10h.01"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>',
                name: "LS13 · Bedarfe und Materialkosten berechnen",
                desc: "Tiệc Brunch 72 khách · Standardrezepturen · Faktor-Formel & Giá vốn",
                content: `<h2> Bedarfe und Materialkosten berechnen (Trang 60 - 64)</h2>
<div class="hint">LS13 · Tính toán lượng nguyên liệu & Chi phí cho Tiệc Buffet / Brunch 72 khách</div>
<h3 class="sub">1. Tình huống &amp; Công thức tính Hệ số</h3>
<p>Nhà hàng tổ chức <em>Sonntagsbrunch</em> cho <strong>72 khách</strong>. Tính lượng nguyên liệu dựa theo công thức tiêu chuẩn (<span class="term" data-de="die Standardrezeptur" data-vi="công thức chế biến tiêu chuẩn">Standardrezeptur</span>).</p>
<div class="formula">
  \text{Hệ số (Faktor)} = \frac{\text{Số khách thực tế (72)}}{\text{Số khách gốc trong công thức}}<br>
  \text{Ví dụ cho 6 người} \rightarrow \text{Faktor} = \frac{72}{6} = 12
</div>

<h3 class="sub">2. Công thức tính Giá vốn 1 Suất ăn</h3>
<div class="formula">
  <span class="term" data-de="der Materialpreis" data-vi="chi phí nguyên vật liệu / giá vốn">Materialpreis je Portion</span> = \frac{\text{Tổng chi phí nguyên liệu cho 72 khách}}{72}
</div>
<p>Ví dụ các món ăn chuẩn: Rührei mit Speck (dùng <span class="term" data-de="der Schnittlauch" data-vi="hành hoa / hành lá">Schnittlauch</span>), <span class="term" data-de="die Kirschkaltschale" data-vi="súp anh đào chua lạnh">Kirschkaltschale</span>, <span class="term" data-de="der Rinderschmorbraten" data-vi="món thịt bò om kiểu Đức">Rinderschmorbraten</span>.</p>`
              },
              {
                id: "bfk2-kassensysteme",
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
                name: "LS10 · Kassensysteme im Gastgewerbe (POS)",
                desc: "Stakeholder Anforderungen · Orderfix vs Gastrohero · TSE & Kassenbuch",
                content: `<h2> Kassensysteme im Gastgewerbe / POS (Trang 65 - 67)</h2>
<div class="hint">LS10 · Hệ thống máy tính tiền POS · Orderfix vs. Gastrohero · TSE & Kassenbuch</div>
<h3 class="sub">1. Nhu cầu các bên (Stakeholder Requirements)</h3>
<ul>
  <li><strong>Chefin:</strong> Xem báo cáo doanh thu tức thì.</li>
  <li><strong>Küchenchef:</strong> Nhập đơn (<span class="term" data-de="die Bonierung" data-vi="việc nhập đơn hàng / in bon bếp">Bonierung</span>) nhanh &amp; chính xác xuống bếp.</li>
  <li><strong>Finanzamt:</strong> Bắt buộc có thiết bị an toàn kỹ thuật <span class="term" data-de="die Technische Sicherheitseinrichtung (TSE)" data-vi="thiết bị an toàn kỹ thuật chống gian lận thuế">TSE</span>.</li>
  <li><strong>Steuerberater:</strong> Xuất dữ liệu sổ quỹ điện tử (<span class="term" data-de="das Kassenbuch" data-vi="sổ quỹ tiền mặt">Kassenbuch</span>).</li>
</ul>

<h3 class="sub">2. So sánh POS Orderfix vs. Gastrohero</h3>
<table>
  <tr><th>Hệ thống</th><th>Điểm mạnh nổi bật</th></tr>
  <tr><td><strong>Orderfix</strong></td><td>Order di động, tách hóa đơn bàn ăn, tích hợp điểm thưởng &amp; khuyến mãi coupons.</td></tr>
  <tr><td><strong>Gastrohero</strong></td><td>Màn hình bếp (<span class="term" data-de="der Küchenmonitor" data-vi="màn hình hiển thị order trong bếp">Küchenmonitor</span>) real-time, chấm công <span class="term" data-de="die Zeiterfassung" data-vi="chấm công giờ làm việc">Zeiterfassung</span> nhân viên.</td></tr>
</table>`
              },
              {
                id: "bfk2-verkaufsfoerderung",
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>',
                name: "LS19 · Verkaufsfördernde Maßnahmen im Service",
                desc: "Sales Promotion · Corporate Design · Eye-Catcher · Tischaufsteller & Digital",
                content: `<h2> Verkaufsfördernde Maßnahmen im Service (Trang 68 - 69)</h2>
<div class="hint">LS19 · Biện pháp xúc tiến bán hàng · Corporate Design · Eye-Catcher · Analog & Digital</div>
<h3 class="sub">1. Khái niệm Xúc tiến Bán hàng (<span class="term" data-de="die Verkaufsförderung" data-vi="xúc tiến bán hàng / sales promotion">Verkaufsförderung</span>)</h3>
<p>Các hoạt động ngắn hạn nhằm kích cầu doanh số nhà hàng (ví dụ: Tuần lễ món măng tây Spargel, Tuần lễ món chay <span class="term" data-de="die Aktionswoche" data-vi="tuần lễ chương trình khuyến mãi/chủ đề">Aktionswoche</span>, minigame dự thưởng <span class="term" data-de="das Gewinnspiel" data-vi="trò chơi dự thưởng / minigame">Gewinnspiel</span>).</p>

<h3 class="sub">2. 7 Nguyên tắc thiết kế Ấn phẩm Quảng cáo</h3>
<ol>
  <li><strong>Der Kern:</strong> Chủ đề chiến dịch phải là điểm nhấn thu hút (<span class="term" data-de="der Eye-Catcher" data-vi="điểm nhấn thu hút ánh nhìn">Eye-Catcher</span>) ngay trong vài giây đầu.</li>
  <li><strong>Corporate Design:</strong> Đảm bảo bộ nhận diện màu sắc, logo của nhà hàng.</li>
  <li><strong>Sprachstil &amp; Slogan:</strong> Chọn phông văn phong xưng hô "Du" hoặc "Sie" phù hợp.</li>
  <li><strong>Analog vs. Digital:</strong> Kết hợp menu dựng bàn (<span class="term" data-de="der Tischaufsteller" data-vi="menu/biển quảng cáo dựng trên bàn">Tischaufsteller</span>), tờ rơi (<span class="term" data-de="der Flyer" data-vi="tờ rơi quảng cáo">Flyer</span>), nghệ thuật viết chữ bảng phấn (<span class="term" data-de="das Handlettering" data-vi="nghệ thuật viết chữ bằng tay">Handlettering</span>) với mã QR Code trực tuyến.</li>
</ol>`
              }
            ]
          },
          {
            id: "fleisch",
            badge: "Modul (Năm 2)",
            title: "Fleisch & Küche (Năm 2)",
            items: [
              {
                id: "fleischteile",
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="7" cy="9" r="1.6"/><circle cx="12" cy="7" r="1.6"/><circle cx="17" cy="9" r="1.6"/><path d="M5.5 13.5c0-1.5 3-2.5 6.5-2.5s6.5 1 6.5 2.5c0 2-1.5 4-3 4.5-1.5.5-2.5 1-3.5 1s-2-.5-3.5-1c-1.5-.5-3-2.5-3-4.5z"/></svg>',
                name: "Fleischteile",
                desc: "Rind · Schwein · Schaf · Gerichte",
                route: "#/bfk/2/fleisch",
                content: `<h2> Fleischteile</h2>
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
<div class="note"> Merksatz: <b>Viel Bindegewebe → langsam & feucht</b>. <b>Wenig Bindegewebe → schnell & heiß</b>.</div>
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
</table>`
              },
              {
                id: "kueche",
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="10" cy="15" r="5.5"/><path d="M15 15h6"/><path d="M8 15l2.5-3"/></svg>',
                name: "Küche & Ernährung",
                desc: "Nährwert · Eiercode · Wertigkeit",
                route: "#/bfk/2/kueche",
                content: `<h2> Küche & Ernährung</h2>
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
<div class="formula"><span class="term" data-de="Biologische Wertigkeit" data-vi="giá trị sinh học">Biologische Wertigkeit</span> = wie viel g Körpereiweiß aus 100 g Nahrungseiweiß</div>
<table>
  <tr><th>Lebensmittel</th><th>BW</th></tr>
  <tr><td><span class="term" data-de="Hühnerei" data-vi="trứng gà">Hühnerei</span> (Referenz)</td><td><strong>100</strong></td></tr>
  <tr><td>Kartoffeln</td><td>95</td></tr>
  <tr><td>Rindfleisch</td><td>87</td></tr>
  <tr><td>Kuhmilch</td><td>86</td></tr>
  <tr><td>Soja</td><td>84</td></tr>
</table>
<div class="note"> Ergänzungswert: Kombination hebt BW (z.B. Kartoffel + Ei, Getreide + Milch).</div>`
              }
            ]
          },
          {
            id: "fisch-warenkunde",
            badge: "Năm 2 · Warenkunde",
            title: "Năm 2 · Fisch — Warenkunde & Zubereitung",
            items: [
              {
                id: "fisch-warenkunde",
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.46-3.44 6-7 6-3.56 0-7.56-2.54-8.5-6z"/><path d="M18 10v4"/><path d="M2 16l4.5-4L2 8"/></svg>',
                name: "Fisch — Warenkunde & Zubereitung (DE/VI)",
                desc: "§1 Einteilung · §2 Inhaltsstoffe · §3 Merkmale · §4 Konservierung · §5 Kaviar · §6 Gerichte & Wein · §7 Bildtafel (15 loài cá có đủ ảnh) · Prüfungs-Check",
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
    <figure class="fish"><img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/wAALCAB4ANsBAREA/8QAHAABAAEFAQEAAAAAAAAAAAAAAAUBAgMEBgcI/8QAORAAAQQCAAMGBAQEBQUAAAAAAQACAwQFERIhMQYTIkFRYRQycYEHFSNSYpGhsSQlM0LBNGNy0eH/2gAIAQEAAD8A+oMc3goVm+kTR/QLZREREREREVkjS5pDXlp9Qre7ds/qO5jkNDkrpJGRM4pHta0ebjoJG9krA6N7Xt9WnYV6IiIqFUTom1SEaiYP4Qr0RERERERFoZXK1MZEHW5dOcdMjaOJ7z6Bo5lR0suVyMDpGNdja2ienFMR7DoFhp9n8VdBdaM9+RuuJtuVz+Akb0Wk6CpkcV+RwG92fgEXcjilqR8mTN89Dyd9FPY+3DfpwWqzw+GZgex3qCtlEREVOStJ0qqreTQqoiIiIiIhULmspLFYjx+Ma2XIzDfi+WFv73e3oPNamIhgcLViq4W77SGusy8w7116DqNBWs7QyRTz1LMTzYbLJwuZGS3u2gO4j9j/ADVa3aSOWlVu0sddmp2T4pgwNczmRtzTz5aVnx96xlX1KtmBz4pdyx704RlwIOv/AB2ruzpdjc1exMhb3b/8VAB0AJ8TR9Dz+66dERE+qKhbvqq6QIiIiIiIh6KDzWbbXd8HjjFYykjuBkPF8h18z9cwAsGHqDHz/DusSTZCw0zT2Szk89ND0A5aCkqlQY2kGRFr3A7eXHhDiTzK0r2XqUcjj4ZxPJNcndBFwR+FvLfi9vdbFOTvbbpKpIhL3MlZKCCC3l4B6b81sCvB+YNsSRM+J4S0TAa2CflXPdrY5cbJTy8IBFOcFw343xO5SD7cj9l1sbg9jXNIc1w2CPMK5EREVEVQiIiJsb15oiKMy+aoYrgFydrZZDqOIc3vPoAoF3bMmd0bKUYLBxPa+0wP4ddQ0b2eXRQPYOehTg7R9orbi11vIOYJXtJcGcg0aHMdV6Ga7T3JY1xEXiYeM7J9/Xr5q0wcLZBE1vC/bnCQk+L/ANKFytq9RyYys9mE9n4a+nQMhLpTIToEKa7kzwBz3lz3HbXt8DmtPPX9lrZOdlOaOeSKR8QcGHlsN/iA/wCVv2ooLEPBYa10ZHR3RQnZ+V+Mvvwlg/ptaZKbyd8cfm36t/sujRERERAiIiIqPcGMLnEAAbJJ0F5YO18k96evby87Zo5HN/ymFtiMN3y2QCQda6+6k25i7DzpZTI3P4LGMJH8wGkLiO0NjO5HESytqZCPJPmebBFQu20HwcB8hryUh+HGPqQ9p5ac9JssMlFkhcarwxkwJD/mHIkFdsynexuU72BkNllp/BZZAwBsTQf03FpPUN5FW0rdyXtbk5Mg64yvUlZXqxtYWxSNeBtx/cQeW/JdAcRB+eDLd5M602DuA0vPBre98PTfusD8rXlzcuFbFZFiKAWS8MPARvWg7oT7KmWoT5SrRjjvWqL2TNmeWcnSBvVp15FSFyFkkbm2XuMLureg176VzqrLNVsVwNmHX5dBRucxklnHaruDLlXUlSXfNrh0B9Qeh9it3B3xksZBaA4XOGnt/a4ciP5hb6IiImkCIiIToErksv2rccizG4SE2bDj45yP042g8yP3Eey5mbK4t3HPnrdu53Jf3kbY3TMYBsbcGeAdNjeytvAZq1O0fleKytmm3lG5sDKrXN5c/EQSPt5ralt5XgsGxjc9VZJIJAY7ELywa5hvi6eyYntBgp60w/PLdedwYJH2txlvCfUjh58+nVdHDHC+5BdjsRWWFzmskb4iwOA5NLfcea3ZGuhdtscG5ZWhxLuEka6k+ZTTqcE5hrPkDTtkbXAl2+ut9PNLdueCKw9lKabumBzQwt3IfNoG+o91cbMYh7x4kiBj7xxLflHv7+ysGSpNZG51uIBwboudrexsdfUAq+SzFwQzR8czZtBhjHEDvz/+rhsxT7b4+WOajlPjmOLnSRiBmhz8IAJB1r3K9Bic50TC8acWjYPkVzmH/wAn7R38fMS2veebVUnpxH/UZ9Qef0PsunREREQIhWGxAydrQ8uAa4OHCdcwsh5bK4DtL2isZG9BjcW5vw8ryyUNJM07RydwAfK3fIuJHRbvZ/se+Cvw5Wy50btaqQnhjYB0BPV3uulmxNGXGyY91aMU5G8DomjQ19lGM7KVImhsNvIxsHRrbLtAei08z2NitV4jUtz/ABULxIw2JHSMeQCOFzd8wVxPwTuzbrBu1Iq9eXx2I3V+974ADwxuJ4R4ugOlK4btDUq4HJXcbHHBM+WLu4I4eGQA8htpIaT1+VT0+ZyDpRI6JkbHS91BEG98S/h5GQt+Qb69V0Vd9owV3W+7ZM6Md62M8TWu8+HlshZg2QWdteO6O+IO678tK9jjt5c4Pbvlw+Q91cY43jZY132WplshBiMbNetbZVgZxPLW7IHsFAs7eYiXM1cfWc+y+w5rY3wkOGyN8xvevdXX6naKxmZpYW0o6bRwRETPbIeYOzoEfbSgvxAlzTMbXjbJWF4TCSvHA4vme4dOEEDl6ld/jnTuo1zcaG2TG0yNHQO1zH81sogREQIiLkPxN7QtwPZyd4llilkaW95CwOewHlsA+aifwoxWPomzJQsG2HwxOE73BzuYJI9ufkvRURFjnhjnidHNGyRjhotcNgrhu1UWFxd/BYuCrBDYv3WFvdtA0GeLZ9ug+6yVsfWZZy1GapXD7by6LgidGX8YPEXEE+3MKat482MLYxdeWaq0V/h2SB2nM0AOJpP91IUa3wleGuZJ5RBG1nePIJfrlsn19VgxGMp4VlkUxKGTzOlkMjy4Bx6630CkIHMewuj1w7I5dDzWDuXTV54ZZ2SOdxAbYNNaegI89LVNSpjyyRsNaIRDUfdxAOI18o+/oqZvMsx2NZOyIyWZtNgrE8LpHno32WDs5h315JMjkw1+Ws85Hb4hE3yjbvoB/VT6IiIiBEReO9uobfaztDmOz+Pmg+IaxhLZN7Y1gDuX1cdfZTv4K9nL/Z7C3mZSF0M0s+wxxB5Aa3yXoqIiFQfajCwZOr37YI3ZCsC+tKW+Jjhz5H30orCznKudk4WvgiZoyGR2uOQci32a3ny9V0LTFNYlY4ccgA4m7OgHf0K1njMDLxua6sMW2u7jY0fqGXfh0Ty1pamZjvWchjoMblPhXxkz2IjEHmdg0NbPIc1KDvII3t70AOJ04s+Rx6AAdQsYx7TPFKJ7EcjWkvEb+FjyeWyOn09FB5GLGN+Emf8AFZO09vBXgdISZCHcXEQemiPmKlMLiZm2XZLLubNkpBoBvNkDf2M/5PmpxERERECIhXzzJ2jjxf42X8g2csqmYV5WuGi4HTTr6HmvoUHaqiIiFchlzJ2Zuz3akbXUbrtyxn5WT9A72DuhPqNqQntZGmWvZSa+uPG8RkucRwbOvfi5Ba+NfZOZyTjkpSHxskbWkj8FfyID+hPXY8lKmZ0cznWXtbXcOBriR4if7BaeX7Q1MOYIJmvksTHhhhjG3P11PsOY5lRV3Og1KkGOpSssTu4YIHt05w1sn2aN8z9VOYPFPpl9m7KLGRm/1JNaDR+xo8mhS6IiIiIiIhXnkH4dUZe2WYyWTrw2qdvgkhY/fFHJ/u+3IL0Jo0AB0CqiIiLFbrxW60kFhjZIpGlrmu6EFc1jrbsBkGYfIzOdVk/6KzIev/acfUeW+oWXHQsfTtYqQRyRVzwzvlbylLgXH+pCy18Hip8fFSsY6E16shMUb2nhB/cN/VYs5NHi+7vzsjkuadWqws3+psgtaB68vsFtdnsO+oZLuQeJ8rZ5zS65NHkxvo0f16qbREREREREREREREQ9Fp5PHVMpUdWvwsmhd1a4efr9VzONjt9l7duK1FPdx1iTvW22jjfHy1wvb1IGuRH3W2e1GEZE/wCDsfFTu3qvCC6RxPlry+6zYXFzzWhls1p19w1FDvbKzT/tHq71K6FEREREQIiIiIiIiIiIViZXhY/jZExrz1cGgFZURERERERERERERERERERERERERF//2Q==" alt="Rochen">
      <figcaption><b>Rochen</b><span class="vi-cell">cá đuối</span></figcaption></figure>
    <figure class="fish"><img src="data:image/jpeg;base64,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" alt="Seelachs">
      <figcaption><b>Seelachs</b><span class="vi-cell">cá tuyết đen (pollock)</span></figcaption></figure>
    <figure class="fish"><img src="data:image/jpeg;base64,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" alt="Kabeljau / Dorsch">
      <figcaption><b>Kabeljau / Dorsch</b><span class="vi-cell">cá tuyết</span></figcaption></figure>
    <figure class="fish"><img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/wAALCAB/AOEBAREA/8QAHAABAAEFAQEAAAAAAAAAAAAAAAECAwQFBwYI/8QAPxAAAQMDAwEGAwUECAcAAAAAAQACAwQFEQYSITEHEyJBUWEycaEUI2KBkRVCUnIWFzOCkrHR0iRTdKKywcL/2gAIAQEAAD8A+n7YzbbqVo4AiYPoFlYTCJhMIhVmpgiqqeSCojbJDI0texwyHA9QQrduoKa3UraehhZBC3kMYMBZJGBwmOVKIiIiIERMIiIox7q3SjFNEPRgH0V1ERERMIiIiIiY5RERERQFKKOfRRHwxvyVSIiIiIiIiHogORkIiIiIiIiIoaMAKURERERERERERERERERFAUoiIiIiIiIiJlMplERERERAiIiZUZVEk8UX9pIxn8zgFgVF/tFPnv7pQx4ODunaMfVauo19paAgPvlEXHoGSbyf0ysE9pumSHGCsmqAM8wU8jwcDJ6BWR2oWN+7uae6SkML8No3DwgAk8+xBUR9pdBNu7i1XaQtIDswtbjPQnLunv7qy/tLG/ZHpy6u5AHiiGSc46u9QR81g/1qzvn7mLS9aZO6E4a6piBLM4yOTnHmPLBVU3alUQOf3ul6wCPJcW1UR4HUjnkefy5W8snaLY7maeOaSS3zzxtkjZVN2h7XdCHjwn06ry/ax2j1mnr3R2m0uip+8Y2WorJYjKIw4nAa3IBOBnqtC3tB1RbpQKi626rmAa/upqTu45WOztLHsPmQME569OMLouhtfUOqHmllhdQXVjA91LI8OyCM5a4dR9V7PKJlMoiIiBFG4ZwVOVaqZ46amlnmcGRRtL3uPkAMkri2oe0q7XeqkpNNVdHa4sAtkmG6ocw/vbXDa35HnHK8nBcK2urZaG9325VNecmEsrHRslBx4Q1hAD/QdHZ+STUtjJllqGSVQ3tjJmqHyGN5BIa7JzzyOfQeY51tJU2y2zdzTRQVjc7oJIYWyygA52SAD4gSC1469Dny29U2oFTT1tpttQzJDainZbpQ2YHGXtw3gY4xnwnotnSU+oZqp1VSWC7kPLQ5r8RngnDwCQ0PHqBz59StgdOajfVNkgs9Q3Ls5MrGbCD1HJx6geWS05B4hujNUVc0E9JT0cEtO4s3Gqy0xn44nNHUdCPNuSPILKZpPUz64RujomSBpc/vKgkSMzgZwMh2BgkebWu65zlyaB1BXimlkqbbHLG7vBKx78h+CN42gckbc+WQTjkhXD2d3eoMzX3G2DewseI2ycOxw4YILSCSQOmCR0KUPZZcKWjfSG70ktGc7aeanc9sYPxNB3Z2u8weh5GCseq7Ff2g+J1x1LWSmJgijHctOxgPDQSSTjPU5V49i8L6COhmvtQ6jjcHhraZgfn+Yk9fMYxkdFVQ9idtoa2Grpb7d4aqFwfFIzuwWkf3TleydYr8eBq6saPw0NPn6sVIsGoG5I1lXE/joqYj6MCpbadS7nCPVsb3N4IdbYzg++HBRSQ6mqIS+l1FaKlocWF/7PdjIOCOJeoIIUyR6xga6R1ysMjR0a6kkZ9e8K0NDr25S1c1EILRVVdPIyKdkFU9pje8kNDtzcDkY6r0p1FcKaMuuOn65gHU0zmzfQEFbay3ejvVH9poJC+MOLHBzS1zHDq1wPIIWcpXlO0HUslhtkcdA1sl1q3d1TMdyAfNxA5wPTzXBK66VdVJM65VjZq2SQxl1x72J8Lgedpb4WfInhZlPqPUWmbbHVVVyq4xUnfTubWsqIg3pgxOJOPxAr1Wmu0PVmo4p6AaajucbmGOSaMuhYQRjku46e6wrB2KV8sks1+uTaaFzv7Bh74uaDkNeXcEDhezo+ybRtPO2OqjfVVTx3gEk5aSB5hrSOB7Lff0P0vRte+GwWuZwI3ukiY9wyeri7PlyvR0dJS0kLWUVPDDEBw2Jga3HthS2QzO+4eNrHlsgLTn5D/VXi3Lgcnjy9VbEj3SSMbE4bcYc74XZ9EfD4C2FwicXbiWtHPPP6qp0ETnl7o2F+Nu4jnHpn0R2yCEkN2sYM4aOgHoAsGhlklMj4aMQRyEuMjhtLumCR15CzIzJtk3NJcCcbscqGQkztnc6QO2bTGHeDrnOPX3V9c17ejd4tGd/aKieCGKUOqjA4tfs8uRzjOMrhFku+qqR8TrRda8GdzQxjasSbyTx4C4kdPMBdV7K+0PUt+1FHZrjFRzBjXPmnI2PaG8HgcE5W+0VeKfTOpbvpq/yNhuFTWPrKeqkGG1bH8gbj+834cZ8gvRWSaHTt0kstVI2OKqmkqKF7jgP3uLnx/zAk49QvS1tNDW0slNUxiSKQYc08LlGoZ7TpjULoqeCqmqgRO/7QA2InB2vL/C15af43H2C1FLqPUt6rg1s93rmSyfdR26JtNDt95uTn3Bwun9ntkqbBpxlLXyd5VyTS1Eh3l+C9xdguPLiOmT1XpkXLe02ni/pXaqm4OzSsZhgGdw8WXFo6E4x1I4z1XIdYVtsp7lVwUL6+Vz6gvc0uc2N5zkHBPXP4Vm6c1RatMwtdVaJpZpQ4tM8kwc4u6keIHHBC6bp7tdp7s8U9Bpe9SvAwG0zGSN/XIA/NZty17p2qqG27UwuFkqGkOdT1jMCRpH7xYXNLSM+a9FbtUaTq2sdRXe1vMDdjXd83LG+gJ5wttHcrW4EsraIh+MkSt8X1Vz9p0AAzW0oz0+9b/qrja6ld8NTCflIFcbUQu+GVh+Tgp72Mcl7P1CoMsHeBxkj3AEDxKsTxHpIw/3gp71h43t/VBIzJ8bTjrg9FAljI4ew/IhVBwPIIP5qdwx1H6qiZsckT45Qx0bhhzXcgj0IXNdSdlOjrg90zcWyUnJMEoa3/CeFe01YdC6JkdXU1xpmVDWEOnnqwTt8xjOPosrXFTp6/09Pbam21V6qpIxURQ0TMSxNPR5c4t2A+5GfReKtnZ9q+tD4jcprfaSfu6S5ytrJGYPHA8I9sHK9nY+zyqoYtlZqq8zsI5ijl7tn5dSB+a9DQaPsdFhzKCOabGO+qCZpP8AE7JC2VttdJbWuFLFtL/ic4lznfMnlZilFqNTWCk1DbJKOt3tBB2SRuLXxn1BC5JW9i9dUNZTR11sihjwPtXcPM8gz5jdtH5L02m+x+y2yn7u5VE9zy7e9kmGRud5HaOf1K6HQUFLbqZtPQ08VPA3oyNoaAuRdsXZtcb5dze7CGzzPjDJqdz9pO3oWk8flwuTVOmrpbn/APE6euLJBGM97Td4C7PJHkOPmqKSzUZqWPrrTexEGvc9rIsZd+60Ybx7qqkoomwzGS11glnkcXs+yvxDEOQ1nB8TjwT5ALJoKSh+0RPuFpuUHPeSAwu2uJ5IGBw0Y4HUkrArC6SAuo6O500z3GQbGSAMB+GMf+yr9A+RtJUio/akk0kTIWNfFI4RuLvFID+Fo4HmSqgyKV8zH0NzhY6dro5Xd85xhaDkY6BziBz7rJpqUVTo3RU9+7+T44Y4nhrXcnDfLHQc+5XqNK9mOprrNSS1tVXWmiDQZzNMTK53mGNB4GMcnHyXWY+zbTjWNDqepe4N2ueaqTc/5+LlXGdnOmWDDKGRo9qiT/cqz2faeIAbT1LAPJtVKP8A6Q9n2nyMdxVY/wCrl/3IOz/T4PigqXD0dVykf+SuR6B0wzl1nppT6ygyf5krnXa9UQsrbdo7SttpG11U5skpjhaNjc8N6dDjJ9h7rp+krCyx24967v7jUfeVdQRzK/H+Q6AeQC3reQDyM+RUohGRhQBgADyUoiIiFRhMIGgdELGnqAfmo7tn8Df0Tu2ebW/ogY0dAP0UhoHQAKcIiIipkBdG5rXbXEEB3p7rRad0rb7K507GmpuMhc6WtnAdNIXHJyccD2HC3+ERERMBEREREREREREREQjOERERETKIiImOcoiIiIiIiIiIiIiIqce6qQqFKIiIiIiIiIiIiIiZRFH5opRE80RERECIiIqZHbGOdguwM4HUpG/exrtpbkZweoVSZREUFApRRz7IinKIiZRERR0KnKJlMoiIqHNDhgjODlVZ45TOEJGFG4IXNHmqTMxvV30VLqiL+L6FUfbqf/m/9pX/2Q==" alt="Lengfisch">
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
    <figure class="fish"><img src="data:image/jpeg;base64,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" alt="Petersfisch">
      <figcaption><b>Petersfisch</b><span class="vi-cell">cá Peter (John Dory)</span></figcaption></figure>
    <figure class="fish"><img src="data:image/jpeg;base64,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" alt="Heilbutt">
      <figcaption><b>Heilbutt</b><span class="vi-cell">cá bơn lớn (halibut)</span></figcaption></figure>
    <figure class="fish"><img src="data:image/jpeg;base64,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" alt="Seeteufel">
      <figcaption><b>Seeteufel</b><span class="vi-cell">cá cóc biển (monkfish)</span></figcaption></figure>
    <figure class="fish"><img src="data:image/jpeg;base64,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" alt="Hering">
      <figcaption><b>Hering</b><span class="vi-cell">cá trích</span></figcaption></figure>
    <figure class="fish"><img src="data:image/jpeg;base64,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" alt="Stör">
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
            badge: "Năm 2 · LF 10",
            title: "Năm 2 · Milch & Käse — Warenkunde & Service",
            items: [
              {
                id: "milch-kaese",
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 21h10a2 2 0 0 0 2-2V9l-7-6-7 6v10a2 2 0 0 0 2 2z"/><circle cx="15.5" cy="15.5" r="1.5"/><circle cx="9.5" cy="16.5" r="1"/></svg>',
                name: "Milch & Käse — Lernfeld 10 · LS 2–3 (DE/VI)",
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
        teacher: "Herrn Kling",
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
</ul>`,
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
</div>`,
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
</div>`,
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
</div>`,
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
</div>`,
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
</div>`,
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
                `
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
        teacher: "BS (Buß-Schroeder)",
        examDate: "2026-07-22",
        ready: true,
        desc: "Năm 1: GK-GLE 49 trang (Große - Stoltenberg) & KA 1 | Năm 2: 2-GK Partizipation, Grundgesetz, Gewaltenteilung",
        groups: [
          ...(window.GK_GLE_GROUPS || []),
          {
            id: "jahr1-ka1",
            badge: "Năm 1 (KA 1)",
            title: "Năm 1 · KA 1 Grundwissen & Schreibaufgaben",
            items: [
              {
                id: "gk-ka1-themen",
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
                name: "Năm 1 · 4 Formen & Grundrechte (KA 1)",
                desc: "4 Möglichkeiten · Instagram Vor/Nachteile · Grundrechte & Gleichberechtigung",
                keyPoints: [
                  "<b>4 Möglichkeiten der politischen Einflussnahme:</b> Wahlen, Demonstrationen, Partei, Petition.",
                  "<b>Instagram / Social Media:</b> Vorteile (schnell, Reichweite) vs. Nachteile (Falschinformationen, nicht alle Nutzer).",
                  "<b>Grundrechte:</b> Schützen Freiheit, Menschenwürde & Gleichheit vor staatlicher Willkür.",
                  "<b>Gleichberechtigung:</b> Rechtlich gleich, aber Lohnlücke, Sorgearbeit & Führungspositionen.",
                ],
                content: `
                  <h2> Năm 1 · KA 1 Grundwissen &amp; Schreibaufgaben</h2>
                  <div class="hint">Năm 1 · Chú ý của cô Buß-Schroeder · 6 chủ đề KA + Mẫu trả lời FS1</div>

                  <h3 class="sub">1. 4 Möglichkeiten der politischen Einflussnahme</h3>
                  <p>Mỗi người dân có 4 phương thức chính để tham gia định hình chính trị:</p>
                  <ol>
                    <li><span class="term" data-de="Wahlen" data-vi="bầu cử">Wahlen</span>: Bầu cử đại biểu Quốc hội/Hội đồng để tham gia quyết định chính sách.</li>
                    <li><span class="term" data-de="Demonstration" data-vi="biểu tình">Demonstrationen</span>: Tham gia biểu tình, tuần hành để công khai bày tỏ quan điểm.</li>
                    <li><span class="term" data-de="Partei" data-vi="đảng chính trị">Partei</span>: Gia nhập một đảng chính trị để trực tiếp hoạt động và xây dựng đường lối.</li>
                    <li><span class="term" data-de="Petition" data-vi="thỉnh nguyện / kiến nghị">Petition</span>: Ký thỉnh nguyện thư gửi cơ quan thẩm quyền để đề nghị thay đổi luật/chính sách.</li>
                  </ol>

                  <h3 class="sub">2. Instagram als Informationsquelle (Beurteilen)</h3>
                  <p>Đánh giá việc lan truyền thông tin qua mạng xã hội (Instagram, TikTok):</p>
                  <table>
                    <tr><th>Vorteile (Ưu điểm)</th><th>Nachteile (Nhược điểm)</th></tr>
                    <tr>
                      <td>1. <span class="term" data-de="viele Menschen schnell erreichen" data-vi="tiếp cận nhiều người nhanh chóng">viele Menschen schnell erreichen</span>.<br>2. <span class="term" data-de="einfach geteilt werden" data-vi="chia sẻ thông tin dễ dàng">einfach geteilt werden</span>.</td>
                      <td>1. <span class="term" data-de="falsche Informationen" data-vi="thông tin sai lệch / tin giả">falsche Informationen</span> verbreiten sich schnell.<br>2. <span class="term" data-de="nicht alle Menschen" data-vi="không phải ai cũng dùng">nicht alle Menschen</span> nutzen Instagram.</td>
                    </tr>
                  </table>

                  <h3 class="sub">3. Wichtigkeit der Grundrechte &amp; Grenzen des Staates</h3>
                  <ul>
                    <li><strong>Tại sao Grundrechte quan trọng:</strong> Bảo vệ quyền tự do, nhân phẩm (<span class="term" data-de="Menschenwürde" data-vi="nhân phẩm con người">Menschenwürde</span>) và bình đẳng trước pháp luật, chống lại sự độc đoán của nhà nước (<span class="term" data-de="staatliche Willkür" data-vi="sự độc đoán của nhà nước">staatliche Willkür</span>).</li>
                    <li><strong>Tại sao Nhà nước đặt ra giới hạn:</strong> Đảm bảo an ninh trật tự (<span class="term" data-de="Sicherheit" data-vi="an toàn / an ninh (tùy ngữ cảnh)">Sicherheit</span>), bảo vệ quyền lợi của người khác và ngăn chặn hành vi phạm tội (<span class="term" data-de="Straftaten und Missbrauch" data-vi="tội phạm và lạm dụng">Straftaten</span>).</li>
                  </ul>

                  <h3 class="sub">4. Gleichberechtigung von Frauen und Männern</h3>
                  <p>Mặc dù bình đẳng về mặt pháp lý (<span class="term" data-de="rechtlich gleichberechtigt" data-vi="bình đẳng về mặt pháp lý">rechtlich gleichberechtigt</span>), thực tế vẫn còn tồn tại khoảng cách:</p>
                  <ol>
                    <li>Phụ nữ ở một số ngành nghề vẫn nhận lương thấp hơn nam giới (<span class="term" data-de="Gender Pay Gap" data-vi="khoảng cách chênh lệch tiền lương">Lohnlücke</span>).</li>
                    <li>Phụ nữ thường đảm nhận nhiều công việc nhà và chăm sóc con cái hơn (<span class="term" data-de="Hausarbeit und Kinderbetreuung" data-vi="việc nhà và chăm sóc trẻ">Sorgearbeit</span>).</li>
                    <li>Phụ nữ ít xuất hiện hơn ở các vị trí lãnh đạo (<span class="term" data-de="Führungspositionen" data-vi="vị trí lãnh đạo">Führungspositionen</span>).</li>
                  </ol>
                  <div class="formula"><b>2 Maßnahmen:</b> 1. Thêm chỗ chăm sóc trẻ (Kinderbetreuung) để cân bằng gia đình &amp; công việc. 2. Kiểm soát chặt chẽ trả lương bình đẳng (Lohngleichheit).</div>
                `,
                qa: [
                  { q: "Nennen Sie vier Möglichkeiten der politischen Einflussnahme!", a: "1. An Wahlen teilnehmen. 2. An Demonstrationen teilnehmen. 3. Einer Partei beitreten. 4. Eine Petition unterschreiben." },
                  { q: "Nennen Sie je zwei Vor- und Nachteile von Instagram zur Informationsverbreitung!", a: "Vorteile: 1. Viele Menschen schnell erreichen. 2. Informationen einfach teilen.\nNachteile: 1. Falsche Informationen (Fake News) verbreiten sich schnell. 2. Nicht alle Menschen nutzen Instagram." },
                  { q: "Warum sind Grundrechte für ein demokratisches Zusammenleben wichtig?", a: "Grundrechte schützen die Freiheit und Menschenwürde aller Menschen, sichern die Gleichheit vor dem Gesetz und schützen vor staatlicher Willkür." },
                  { q: "Warum setzt der Staat Grenzen für Grundrechte?", a: "Der Staat setzt Grenzen, um die Sicherheit zu gewährleisten, die Rechte anderer Menschen zu schützen und Straftaten sowie Missbrauch zu verhindern." }
                ],
                vokabeln: [
                  { de: "politische Einflussnahme", vi: "sự ảnh hưởng / tham gia chính trị" },
                  { de: "Petition", vi: "kiến nghị / thỉnh nguyện thư" },
                  { de: "Demonstration", vi: "cuộc biểu tình" },
                  { de: "staatliche Willkür", vi: "sự độc đoán của nhà nước" },
                  { de: "Gleichberechtigung", vi: "bình đẳng quyền" },
                  { de: "Lohnlücke", vi: "chênh lệch tiền lương (Gender Pay Gap)" },
                  { de: "Führungsposition", vi: "vị trí lãnh đạo" }
                ]
              }
            ]
          },
          {
            id: "jahr2-partizipation",
            badge: "Năm 2 (2-GK)",
            title: "Năm 2 · Partizipation & Direkte Demokratie",
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
                `
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
                `
              }
            ]
          },
          {
            id: "staat-gg",
            badge: "Năm 2 (GG)",
            title: "Năm 2 · Demokratie nach dem Grundgesetz",
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
                `
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
                `
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
                `
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
                `
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
                `
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
                `
              }
            ]
          },
          {
            id: "jahr2-wahlen-geschichte",
            badge: "KA 12.10.26",
            title: "Năm 2 · Wahlen, Macht & Geschichte (KA 12.10.2026)",
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
                    <tr><th>Grundsatz</th><th>Bedeutung (Định nghĩa)</th><th>Verstoß (Hành vi vi phạm)</th></tr>
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
                `,
                qa: [
                  { q: "Nennen Sie die fünf Wahlrechtsgrundsätze in Deutschland!", a: "Allgemein, unmittelbar, frei, gleich und geheim (Merkwort: A-U-F-G-G)." },
                  { q: "Erklären Sie den Grundsatz „unmittelbar“ mit einem Beispiel, das dagegen verstößt!", a: "Unmittelbar bedeutet, dass die Wähler ihre Vertreter direkt wählen. Ein Verstoß läge vor, wenn Wahlmänner zwischengeschaltet wären, die stellvertretend entscheiden." },
                  { q: "Warum gibt es in Deutschland keine gesetzliche Wahlpflicht?", a: "Weil der Grundsatz der freien Wahl garantiert, dass jeder Bürger frei und ohne Zwang entscheiden darf, ob er überhaupt wählt oder der Wahl fernbleibt." }
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
                    <tr><th>Merkmal</th><th>Erststimme (Phiếu thứ nhất)</th><th>Zweitstimme (Phiếu thứ hai)</th></tr>
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
                `,
                qa: [
                  { q: "Was entscheidet die Zweitstimme bei der Bundestagswahl?", a: "Sie entscheidet über die prozentuale Stärke einer Partei und damit über die Gesamtzahl ihrer Sitze im Bundestag. Sie ist die maßgebliche Stimme." },
                  { q: "Was versteht man unter einem Direktmandat?", a: "Ein Mandat, das der Bewerber gewinnt, der in seinem Wahlkreis die einfache Mehrheit der Erststimmen erzielt hat (299 Wahlkreise insgesamt)." },
                  { q: "Warum wird das deutsche Wahlsystem als „personalisierte Verhältniswahl“ bezeichnet?", a: "Weil die Sitzverteilung im Parlament proportional nach den Zweitstimmen erfolgt, aber durch die direkte Personenwahl der Erststimme personalisiert wird." },
                  { q: "Was bedeutet Stimmensplitting?", a: "Der Wähler gibt seine Erststimme und seine Zweitstimme an zwei unterschiedliche Parteien ab." }
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
                `,
                qa: [
                  { q: "Unter welcher Bedingung zieht eine Partei mit 4,6 % der Zweitstimmen dennoch als Fraktion in den Bundestag ein?", a: "Wenn sie mindestens drei Direktmandate über die Erststimme gewonnen hat (Grundmandatsklausel)." },
                  { q: "Was geschieht mit einer Partei, die 4,2 % der Zweitstimmen und 2 Direktmandate erhält?", a: "Nur die 2 direkt gewählten Kandidaten ziehen als Abgeordnete ein; alle Zweitstimmen verfallen und die Partei erhält keine weiteren Sitze." },
                  { q: "Welches historische Ereignis führte zur Einführung der 5 %-Hürde?", a: "Die Instabilität der Weimarer Republik, in der zahlreiche Splitterparteien die Bildung stabiler Regierungen unmöglich machten und den Aufstieg des Nationalsozialismus begünstigten." }
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
                `,
                qa: [
                  { q: "Wer stellt die Vertrauensfrage und wer initiiert das konstruktive Misstrauensvotum?", a: "Die Vertrauensfrage stellt der Bundeskanzler (Art. 68 GG); das konstruktive Misstrauensvotum geht vom Bundestag aus (Art. 67 GG)." },
                  { q: "Warum heißt das Misstrauensvotum im deutschen Grundgesetz „konstruktiv“?", a: "Weil der Bundestag den amtierenden Kanzler nur stürzen kann, wenn er in derselben Abstimmung mit absoluter Mehrheit einen neuen Bundeskanzler wählt. So entsteht kein führungs- und regierungsloser Zustand." },
                  { q: "Welche verfassungsrechtliche Möglichkeit hat der Bundeskanzler, wenn er die Vertrauensfrage verliert?", a: "Er kann dem Bundespräsidenten vorschlagen, den Bundestag aufzulösen, woraufhin innerhalb von 60 Tagen Neuwahlen stattfinden müssen." }
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
                `,
                qa: [
                  { q: "Aus welchen drei Abschnitten besteht eine korrekte Statistikanalyse?", a: "1. Einleitung (Thema, Darstellungsform, Einheit, Quelle, Erhebungszeitraum), 2. Analyse (höchste/niedrigste Werte, Vergleiche mit konkreten Zahlen), 3. Fazit (Gesamtfazit und vorsichtig formulierte Ursachen)." },
                  { q: "Warum darf im Analyseteil keine persönliche Meinung stehen?", a: "Weil die Analyse eine reine, objektive Beschreibung der vorliegenden Zahlen und Fakten sein muss. Wertungen und Begründungen gehören ausschließlich in das Fazit." }
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
                `,
                qa: [
                  { q: "Definieren Sie den Begriff „Kalter Krieg“ in zwei bis drei Sätzen!", a: "Der Kalte Krieg war der weltweite Macht- und Systemkonflikt zwischen den Supermächten USA (Demokratie, Kapitalismus) und UdSSR (Diktatur, Sozialismus) von 1945 bis 1990. Er wurde nicht direkt militärisch ausgetragen, sondern durch Wettrüsten, Propaganda und Stellvertreterkriege." },
                  { q: "Was versteht man unter dem „Gleichgewicht des Schreckens“?", a: "Die Situation, in der beide Supermächte über ausreichend Atomwaffen verfügten, um die jeweils andere Seite mehrfach vollständig zu vernichten. Diese nukleare Abschreckung verhinderte einen direkten Krieg." },
                  { q: "Nennen Sie drei historische Schlüsseldaten der deutschen Geschichte zwischen 1949 und 1990!", a: "23. Mai 1949 (Gründung der BRD), 13. August 1961 (Bau der Berliner Mauer) und 3. Oktober 1990 (Deutsche Wiedervereinigung)." }
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
                `,
                qa: [
                  { q: "Erklären Sie den Unterschied zwischen Zentralismus und Dezentralisierung!", a: "Im Zentralismus liegt die gesamte Entscheidungsmacht bei einer zentralen Führung in der Hauptstadt. Bei der Dezentralisierung (Föderalismus) werden Entscheidungsrechte und Aufgaben auf regionale Einheiten (Länder und Gemeinden) verteilt." },
                  { q: "Nennen Sie ein konkretes Beispiel für Dezentralisierung in der Bundesrepublik Deutschland!", a: "Die Kulturhoheit der Länder: Die Schul- und Bildungspolitik sowie das Polizeiwesen werden eigenständig von den 16 Bundesländern gestaltet." },
                  { q: "Welche Merkmale kennzeichnen eine freiheitliche Demokratie im Gegensatz zur Diktatur?", a: "Gewaltenteilung, Achtung der Grundrechte, freie und geheime Wahlen, Schutz der Opposition und die Bindung aller staatlichen Organe an das Recht." }
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
  "name": "Wirtschaftskompetenz (Kinh tế & Luật Lao động)",
  "icon": "",
  "accent": "#0ea5e9",
  "soft": "#e0f2fe",
  "teacher": "Fr. Leyh & RM (Remsing) / WiKO-Leyh",
  "examDate": "2026-11-10",
  "ready": true,
  "desc": "Giáo trình Wiko-Leyh (Trang 01–48 / LF 1 Năm 1) & Modul Kaufvertrag (Năm 2)",
  "groups": [
    {
      "id": "lf1-duales-system",
      "badge": "LF 1 (Năm 1)",
      "title": "LF 1 (Năm 1) · Duales System & Đào tạo nghề (LS01–LS05, LS11–LS12)",
      "items": [
        {
          "id": "wiko-duales-system",
          "icon": "",
          "name": "LS01 · Das duale System der Berufsausbildung",
          "desc": "Ausbildungsbetrieb (BBiG) vs. Berufsschule (Schulgesetz) · Ưu điểm 2 bên",
          "content": "<h2> LS01 · Das duale System der Berufsausbildung (Hệ thống đào tạo kép)</h2>\n            <div class=\"hint\">Giáo trình Wiko-Leyh (Trang 01 / LF 01-LS01) · Mô hình kết hợp Trường - Doanh nghiệp</div>\n            <h3>1. 2 Địa điểm đào tạo (Lernorte)</h3>\n            <ul>\n              <li><b>Der Ausbildungsbetrieb (Doanh nghiệp đào tạo):</b> Đào tạo kỹ năng thực hành nghề (<i>praktische Ausbildung</i>). Cơ sở pháp lý: Luật <span class=\"term\" data-de=\"Berufsbildungsgesetz (BBiG)\" data-vi=\"Luật đào tạo nghề\">BBiG</span> & Quy chế <span class=\"term\" data-de=\"Ausbildungsordnung\" data-vi=\"Quy chế đào tạo\">Ausbildungsordnung</span>. Doanh nghiệp chi trả <span class=\"term\" data-de=\"Ausbildungsvergütung\" data-vi=\"Lương trợ cấp học nghề\">Ausbildungsvergütung</span>.</li>\n              <li><b>Die Berufsschule (Trường nghề):</b> Giảng dạy lý thuyết chuyên môn (<i>fachtheoretische Ausbildung</i>) & Kiến thức chung (Wirtschaft, Deutsch, Englisch). Cơ sở pháp lý: Luật giáo dục của Bang (<i>Schulgesetz des Bundeslandes</i>).</li>\n            </ul>\n            <h3>2. Ưu điểm của Hệ thống kép (Vorteile)</h3>\n            <ul>\n              <li><b>Cho Azubi:</b> Nhận lương trợ cấp hàng tháng, va chạm thực tế ngay từ đầu, cơ hội được nhận làm chính thức (<i>Übernahme</i>) cao.</li>\n              <li><b>Cho Doanh nghiệp:</b> Đào tạo nhân sự theo đúng tiêu chuẩn và văn hóa công ty, chủ động nguồn lao động tay nghề cao.</li>\n            </ul>",
          "qa": [
            {
              "q": "Mô hình đào tạo kép (Duales System) kết hợp 2 địa điểm nào?",
              "a": "Ausbildungsbetrieb (thực hành) và Berufsschule (lý thuyết)."
            },
            {
              "q": "Cơ sở pháp lý điều chỉnh việc đào tạo tại Doanh nghiệp là gì?",
              "a": "Luật Đào tạo Nghề (BBiG) và Quy chế đào tạo (Ausbildungsordnung)."
            },
            {
              "q": "Ai là bên chi trả lương trợ cấp học nghề (Ausbildungsvergütung)?",
              "a": "Doanh nghiệp đào tạo (Ausbildungsbetrieb)."
            },
            {
              "q": "[IHK Exam] Cơ quan nào quản lý và ban hành Luật giáo dục tại Trường nghề?",
              "a": "Bộ Giáo dục và Luật Giáo dục của từng Tiểu bang (Bundesland / Schulgesetz).",
              "src": "fk_exel"
            },
            {
              "q": "[IHK Exam] Mục đích chính của Ausbildungsordnung là gì?",
              "a": "Quy định khung chương trình đào tạo chuẩn quốc gia cho từng ngành nghề.",
              "src": "fk_exel"
            }
          ]
        },
        {
          "id": "wiko-rechte-pflichten",
          "icon": "",
          "name": "LS02 · Rechte und Pflichten des Auszubildenden",
          "desc": "Nghĩa vụ Azubi (Lernpflicht, Berichtsheft) vs. Quyền lợi (Freistellung, Fürsorge)",
          "content": "<h2> LS02 · Rechte und Pflichten des Auszubildenden (Quyền & Nghĩa vụ)</h2>\n            <div class=\"hint\">Giáo trình Wiko-Leyh (Trang 02 / LF 01-LS02) · BBiG § 13 & § 14</div>\n            <h3>1. Nghĩa vụ của Học viên (Pflichten des Azubis)</h3>\n            <ul>\n              <li><span class=\"term\" data-de=\"Lernpflicht\" data-vi=\"Nghĩa vụ học tập\">Lernpflicht</span>: Nỗ lực học tập đạt mục tiêu khóa học.</li>\n              <li><span class=\"term\" data-de=\"Berufsschulbesuch\" data-vi=\"Đi học trường nghề\">Berufsschulbesuch</span>: Bắt buộc tham gia đầy đủ tiết học.</li>\n              <li><span class=\"term\" data-de=\"Berichtsheftführung\" data-vi=\"Ghi nhật ký học nghề\">Berichtsheftführung</span>: Viết báo cáo học nghề thường xuyên (điều kiện dự thi).</li>\n              <li><span class=\"term\" data-de=\"Schweigepflicht\" data-vi=\"Nghĩa vụ bảo mật\">Schweigepflicht</span> & <span class=\"term\" data-de=\"Sorgfaltspflicht\" data-vi=\"Nghĩa vụ cẩn trọng\">Sorgfaltspflicht</span>: Bảo mật thông tin kinh doanh & giữ gìn dụng cụ.</li>\n              <li><span class=\"term\" data-de=\"Benachrichtigungspflicht\" data-vi=\"Nghĩa vụ thông báo nghỉ\">Benachrichtigungspflicht</span>: Báo ngay cho công ty khi ốm và nộp giấy AU.</li>\n            </ul>\n            <h3>2. Quyền của Azubi / Nghĩa vụ Doanh nghiệp</h3>\n            <ul>\n              <li><span class=\"term\" data-de=\"Ausbildungspflicht\" data-vi=\"Nghĩa vụ đào tạo\">Ausbildungspflicht</span>: Phân công Ausbilder có bằng cấp đào tạo đúng chuyên môn.</li>\n              <li><span class=\"term\" data-de=\"Freistellung\" data-vi=\"Cho phép nghỉ đi học/thi\">Freistellung</span>: Cho phép nghỉ làm đến trường nghề/đi thi vẫn hưởng nguyên lương.</li>\n              <li><span class=\"term\" data-de=\"Ausbildungsmittel\" data-vi=\"Dụng cụ đào tạo miễn phí\">Ausbildungsmittel</span>: Cung cấp miễn phí dụng cụ, trang thiết bị bảo hộ.</li>\n              <li><span class=\"term\" data-de=\"Fürsorgepflicht\" data-vi=\"Nghĩa vụ chăm sóc an toàn\">Fürsorgepflicht</span>: Đảm bảo an toàn lao động và sức khỏe cho Azubi.</li>\n            </ul>",
          "qa": [
            {
              "q": "Học viên học nghề có bắt buộc phải viết Berichtsheft (Sổ báo cáo) không?",
              "a": "Có, viết Berichtsheft là nghĩa vụ bắt buộc và là điều kiện để được dự thi tốt nghiệp IHK/HWK."
            },
            {
              "q": "Doanh nghiệp có được phép bắt Azubi tự mua trang thiết bị bảo hộ lao động không?",
              "a": "Không, doanh nghiệp có nghĩa vụ cung cấp miễn phí dụng cụ và thiết bị bảo hộ (Ausbildungsmittel)."
            },
            {
              "q": "Khi bị ốm, Azubi có nghĩa vụ gì?",
              "a": "Benachrichtigungspflicht: Báo ngay cho công ty trước giờ làm và nộp giấy khám bệnh (AU) đúng thời hạn."
            },
            {
              "q": "[IHK Exam] Doanh nghiệp giao việc làm nhà riêng cho Azubi có vi phạm luật không?",
              "a": "Có, vi phạm BBiG § 14 (Ausbildungsfremde Tätigkeiten - cấm giao việc không liên quan đến mục tiêu đào tạo).",
              "src": "fk_exel"
            },
            {
              "q": "[IHK Exam] Doanh nghiệp có được trừ tiền lương khi Azubi nghỉ đi học Berufsschule không?",
              "a": "Không, doanh nghiệp có nghĩa vụ Freistellung (cho nghỉ đi học vẫn trả nguyên lương).",
              "src": "fk_exel"
            }
          ]
        },
        {
          "id": "wiko-ausbildungsvertrag",
          "icon": "",
          "name": "LS03 · Der Berufsausbildungsvertrag (BAV)",
          "desc": "Hình thức Schriftform · 10 nội dung bắt buộc BBiG § 11 · Giám hộ (<18t)",
          "content": "<h2> LS03 · Der Berufsausbildungsvertrag (Hợp đồng đào tạo nghề)</h2>\n            <div class=\"hint\">Giáo trình Wiko-Leyh (Trang 03 / LF 01-LS03) · BBiG § 10 - § 12</div>\n            <h3>1. Hình thức & Ký kết</h3>\n            <ul>\n              <li>Bắt buộc bằng <b>văn bản (Schriftform)</b> và phải ký <b>trước khi bắt đầu đào tạo</b>.</li>\n              <li>Nếu Azubi dưới 18 tuổi: Bắt buộc có chữ ký của <span class=\"term\" data-de=\"gesetzlicher Vertreter\" data-vi=\"người giám hộ hợp pháp\">gesetzlicher Vertreter</span> (cha/mẹ/người giám hộ).</li>\n            </ul>\n            <h3>2. 10 Nội dung tối thiểu bắt buộc (Mindestinhalte BBiG § 11)</h3>\n            <ol>\n              <li>Chuyên ngành & kế hoạch lộ trình đào tạo (Gliederung).</li>\n              <li>Ngày bắt đầu & thời gian khóa học (thường 3 - 3.5 năm).</li>\n              <li>Địa điểm & các đợt đào tạo ngoài doanh nghiệp.</li>\n              <li>Thời gian làm việc hàng ngày/tuần.</li>\n              <li>Thời gian thử việc (<b>Probezeit: tối thiểu 1 tháng, tối đa 4 tháng</b>).</li>\n              <li>Mức lương trợ cấp (Ausbildungsvergütung) & thời hạn trả.</li>\n              <li>Số ngày nghỉ phép năm (Urlaub).</li>\n              <li>Điều kiện hủy hợp đồng (Kündigung).</li>\n              <li>Quy chiếu thỏa ước tập thể (Tarifvertrag / Betriebsvereinbarung).</li>\n              <li>Hình thức ghi nhật ký học nghề (Berichtsheft).</li>\n            </ol>",
          "qa": [
            {
              "q": "Thời gian thử việc (Probezeit) trong Hợp đồng đào tạo nghề là bao lâu?",
              "a": "Tối thiểu 1 tháng và tối đa 4 tháng."
            },
            {
              "q": "Nếu Azubi chưa đủ 18 tuổi, hợp đồng nghề cần chữ ký của ai?",
              "a": "Chữ ký của người đại diện doanh nghiệp, Azubi và người giám hộ hợp pháp (gesetzlicher Vertreter)."
            },
            {
              "q": "[IHK Exam] Hợp đồng đào tạo nghề ký bằng lời nói (mündlich) có hiệu lực không?",
              "a": "Không, BBiG § 11 quy định hợp đồng nghề bắt buộc phải lập bằng văn bản (Schriftform).",
              "src": "fk_exel"
            },
            {
              "q": "[IHK Exam] Thỏa thuận phạt tiền khi Azubi bỏ học nghề trước thời hạn có hợp pháp không?",
              "a": "Không, BBiG § 12 quy định mọi thỏa thuận phạt tiền hoặc hạn chế nghề nghiệp sau học nghề đều vô hiệu.",
              "src": "fk_exel"
            }
          ]
        },
        {
          "id": "wiko-probezeit-ueberwachung",
          "icon": "",
          "name": "LS04 & LS12 · Probezeit & Giám sát IHK/HWK",
          "desc": "Thử việc (Kündigung ohne Frist) · 6 nhiệm vụ giám sát của IHK/HWK",
          "content": "<h2> LS04 & LS12 · Probezeit & Überwachung durch die zuständige Stelle</h2>\n            <div class=\"hint\">Giáo trình Wiko-Leyh (Trang 04 & 12 / LF 01-LS04, LS12) · Vai trò IHK/HWK</div>\n            <h3>1. Kündigung in der Probezeit (Trong thử việc)</h3>\n            <ul>\n              <li>Có thể hủy hợp đồng bất kỳ lúc nào.</li>\n              <li><b>Không cần thời hạn báo trước (ohne Frist)</b> và <b>không cần nêu lý do (ohne Angabe von Gründen)</b>.</li>\n              <li>Bắt buộc phải lập bằng <b>văn bản (schriftlich)</b>.</li>\n            </ul>\n            <h3>2. Kündigung nach der Probezeit (Sau thử việc)</h3>\n            <ul>\n              <li><b>Fristlose Kündigung aus wichtigem Grund:</b> Sa thải ngay lập tức vì lý do đặc biệt nghiêm trọng (trộm cắp, bạo lực, cố ý phá hoại). Phải thông báo bằng văn bản trong 2 tuần từ khi phát hiện.</li>\n              <li><b>Ordentliche Kündigung durch Azubi:</b> Azubi muốn bỏ hẳn nghề báo trước <b>4 tuần (Frist von 4 Wochen)</b>.</li>\n            </ul>\n            <h3>3. 6 Nhiệm vụ giám sát của IHK / HWK (Zuständige Stelle - LS12)</h3>\n            <ol>\n              <li>Quản lý danh sách & lưu trữ hợp đồng nghề (Führung des Verzeichnisses).</li>\n              <li>Duyệt đơn rút ngắn / kéo dài thời gian học (Kürzung / Verlängerung).</li>\n              <li>Kiểm tra cơ sở vật chất & bằng cấp của Ausbilder.</li>\n              <li>Giám sát doanh nghiệp đào tạo đúng khung Ausbildungsordnung.</li>\n              <li>Thành lập hội đồng thi & tổ chức kỳ thi (Zwischen- & Abschlussprüfung).</li>\n              <li>Tổ chức các khóa đào tạo nâng cao chuyên môn (Fortbildung).</li>\n            </ol>",
          "qa": [
            {
              "q": "Trong thời gian thử việc, việc sa thải/thôi học diễn ra như thế nào?",
              "a": "Bất kỳ lúc nào, không cần báo trước, không cần nêu lý do, nhưng bắt buộc lập bằng văn bản."
            },
            {
              "q": "Sau thời gian thử việc, nếu Azubi muốn chủ động đổi sang học nghề khác thì phải báo trước bao lâu?",
              "a": "Phải báo trước 4 tuần (Frist von 4 Wochen) bằng văn bản và nêu rõ lý do."
            },
            {
              "q": "[IHK Exam] Cơ quan nào chịu trách nhiệm lưu trữ hợp đồng và tổ chức kỳ thi tốt nghiệp nghề?",
              "a": "Phòng Thương mại & Công nghiệp (IHK) hoặc Phòng Thủ công nghiệp (HWK).",
              "src": "fk_exel"
            },
            {
              "q": "[IHK Exam] Thời hạn tối đa để thông báo sa thải fristlos kể từ khi phát hiện lý do nghiêm trọng là bao lâu?",
              "a": "Trong vòng 2 tuần (2-Wochen-Frist nach § 626 Abs. 2 BGB).",
              "src": "fk_exel"
            }
          ]
        },
        {
          "id": "wiko-fall-klara",
          "icon": "",
          "name": "LS05 & LS11 · Tình huống vi phạm & Lịch sử BBiG",
          "desc": "Fallbeispiel Klara Korte (Metzgerei Wolf) · So sánh HĐLĐ 1864 vs. BBiG hiện đại",
          "content": "<h2> LS05 & LS11 · Tình huống Klara Korte & Sự tiến hóa của BBiG</h2>\n            <div class=\"hint\">Giáo trình Wiko-Leyh (Trang 05 & 11 / LF 01-LS05, LS11)</div>\n            <h3>1. Tình huống Klara Korte (Metzgerei Wolf)</h3>\n            <p>Học viên Klara Korte bị chủ tiệm thịt giao làm việc dọn dẹp nhà riêng và không cho nghỉ đi học trường nghề → Vi phạm BBiG § 14 (Ausbildungsfremde Tätigkeiten) và nghĩa vụ Freistellung.</p>\n            <h3>2. So sánh Hợp đồng học nghề năm 1864 vs. Luật BBiG hiện đại (LS11)</h3>\n            <ul>\n              <li><b>Năm 1864 (Lịch sử):</b> Học viên phải nộp tiền học cho chủ (Lehrgeld), bị đánh đập, không có ngày nghỉ phép, làm việc không giới hạn giờ.</li>\n              <li><b>Hiện đại (BBiG):</b> Được nhận lương (Ausbildungsvergütung), cấm trừng phạt thể xác, có ngày nghỉ phép (Urlaub), được bảo hộ giờ làm việc (Arbeitszeitgesetz / JArbSchG).</li>\n            </ul>",
          "qa": [
            {
              "q": "Điểm khác biệt căn bản giữa Hợp đồng học nghề năm 1864 và Luật BBiG hiện đại là gì?",
              "a": "Học nghề năm 1864 học viên phải trả tiền Lehrgeld và không được bảo vệ; BBiG hiện đại Azubi được nhận lương và được bảo vệ toàn diện."
            },
            {
              "q": "[IHK Exam] Việc chủ doanh nghiệp ép Azubi làm việc nhà riêng bị cấm theo điều khoản nào của BBiG?",
              "a": "BBiG § 14 (Cấm giao việc không phục vụ mục tiêu đào tạo nghề - Ausbildungsfremde Tätigkeiten).",
              "src": "fk_exel"
            }
          ]
        }
      ]
    },
    {
      "id": "lf1-arbeitsschutz",
      "badge": "LF 1 (Năm 1)",
      "title": "LF 1 (Năm 1) · Bảo hộ Lao động & Luật Lao động (LS06–LS10, LS13–LS16)",
      "items": [
        {
          "id": "wiko-arbeitsschutz",
          "icon": "",
          "name": "LS06 · Arbeitsschutzgesetz & Sozialer Arbeitsschutz",
          "desc": "Technischer vs. Sozialer Arbeitsschutz · Arbeitszeit, BUrlG, JArbSchG (<18t), Mutterschutz",
          "content": "<h2> LS06 · Arbeitsschutzgesetz & Sozialer Arbeitsschutz</h2>\n            <div class=\"hint\">Giáo trình Wiko-Leyh (Trang 06 / LF 01-LS06) · Bảo hộ kỹ thuật vs. Bảo hộ xã hội</div>\n            <h3>1. Phân loại Luật Bảo hộ Lao động</h3>\n            <ul>\n              <li><b>Technischer Arbeitsschutz (Kỹ thuật):</b> Ngăn ngừa tai nạn máy móc, an toàn vệ sinh (UVV, Arbeitssicherheitsgesetz, Arbeitsstättenverordnung).</li>\n              <li><b>Sozialer Arbeitsschutz (Xã hội):</b> Bảo vệ con người về giờ làm, nghỉ phép, thai sản, vị thành niên.</li>\n            </ul>\n            <h3>2. Các đạo luật bảo hộ xã hội cốt lõi</h3>\n            <ul>\n              <li><b>Arbeitszeitgesetz (Giờ làm việc):</b> Tối đa <b>8h/ngày</b> (tối đa 10h nếu trung bình 6 tháng vẫn đạt 8h). Thời gian nghỉ giữa 2 ca (<span class=\"term\" data-de=\"Ruhezeit\" data-vi=\"Nghỉ giữa 2 ca\">Ruhezeit</span>) tối thiểu <b>11 giờ</b>. Nghỉ giải lao (<span class=\"term\" data-de=\"Ruhepause\" data-vi=\"Nghỉ giải lao\">Ruhepause</span>): 30 phút (ca 6-9h), 45 phút (ca > 9h).</li>\n              <li><b>Bundesurlaubsgesetz (Nghỉ phép):</b> Tối thiểu <b>24 ngày làm việc (Werktage)</b>/năm (tính tuần 6 ngày) = 20 ngày (tính tuần 5 ngày).</li>\n              <li><b>Mutterschutzgesetz (Thai sản):</b> Cấm làm việc (<span class=\"term\" data-de=\"Beschäftigungsverbot\" data-vi=\"Cấm lao động\">Beschäftigungsverbot</span>) <b>6 tuần trước sinh</b> và <b>8 tuần sau sinh</b>.</li>\n              <li><b>Jugendarbeitsschutzgesetz (JArbSchG - Dưới 18 tuổi):</b> Tối đa <b>8h/ngày, 40h/tuần, 5 ngày/tuần</b>. Ruhezeit tối thiểu <b>12 giờ</b>. Cấm làm ca đêm sau 20:00 (Gastronomie trên 16t được làm đến 22:00). Nộp giấy khám sức khỏe định kỳ (Erstuntersuchung).</li>\n            </ul>",
          "qa": [
            {
              "q": "Thời gian nghỉ giữa 2 ca làm việc (Ruhezeit) theo Luật Arbeitszeitgesetz tối thiểu là bao nhiêu?",
              "a": "Tối thiểu 11 giờ liên tục."
            },
            {
              "q": "Mức nghỉ phép tối thiểu theo Luật Bundesurlaubsgesetz cho tuần làm việc 5 ngày là bao nhiêu?",
              "a": "20 ngày làm việc (Arbeitstage) mỗi năm."
            },
            {
              "q": "Thời gian cấm làm việc theo Luật Bảo vệ Thai sản (Mutterschutzgesetz) là bao lâu?",
              "a": "6 tuần trước khi sinh và 8 tuần sau khi sinh."
            },
            {
              "q": "[IHK Exam] Giới hạn giờ làm việc tối đa một tuần đối với thanh thiếu niên (dưới 18 tuổi) theo JArbSchG là bao nhiêu?",
              "a": "Tối đa 40 giờ/tuần và tối đa 5 ngày/tuần.",
              "src": "fk_exel"
            },
            {
              "q": "[IHK Exam] Đi học Berufsschule trên 5 tiết được tính tương đương bao nhiêu giờ làm việc cho Azubi dưới 18t?",
              "a": "Được tính tương đương 1 ngày làm việc đầy đủ (1 Arbeitstag).",
              "src": "fk_exel"
            }
          ]
        },
        {
          "id": "wiko-bewerbung-vorstellung",
          "icon": "",
          "name": "LS07, LS08 & LS10 · Hồ sơ Xin việc & Phỏng vấn",
          "desc": "Anschreiben, CV, Zeugnisse, IfSG § 43 · 6 Phasen des Vorstellungsgesprächs",
          "content": "<h2> LS07, LS08 & LS10 · Hồ sơ Xin việc & Phỏng vấn tuyển dụng</h2>\n            <div class=\"hint\">Giáo trình Wiko-Leyh (Trang 07, 08, 10 / LF 01-LS07, LS08, LS10)</div>\n            <h3>1. Bộ hồ sơ xin việc tiêu chuẩn (Bewerbungsunterlagen)</h3>\n            <ol>\n              <li><b>Das Anschreiben:</b> Thư xin việc (1 trang A4 thể hiện động lực & sự phù hợp).</li>\n              <li><b>Der Lebenslauf:</b> Sơ yếu lý lịch trình bày dạng bảng (CV).</li>\n              <li><b>Die Zeugnisse:</b> Bằng tốt nghiệp phổ thông/nghề, chứng nhận làm việc cũ (Arbeitszeugnis).</li>\n              <li><b>Nachweise & Zertifikate:</b> Chứng nhận thực tập, kỹ năng.</li>\n              <li><b>Gesundheitszeugnis (§ 43 IfSG):</b> Giấy khám sức khỏe / Vệ sinh an toàn thực phẩm (Gastronomie).</li>\n            </ol>\n            <h3>2. 6 Giai đoạn của Buổi phỏng vấn (Die 6 Phasen - LS08)</h3>\n            <ul>\n              <li><b>1. Einstieg:</b> Smalltalk, chào hỏi, tư thế, ngôn ngữ cơ thể.</li>\n              <li><b>2. Fachliche Kompetenz:</b> Trình bày CV, kinh nghiệm, năng lực thực tế.</li>\n              <li><b>3. Unternehmensdarstellung:</b> Nhà tuyển dụng giới thiệu vị trí công việc.</li>\n              <li><b>4. Fragen des Bewerbers:</b> Ứng viên đặt câu hỏi thể hiện sự chủ động.</li>\n              <li><b>5. Konditionen:</b> Trao đổi mức lương, ngày bắt đầu, ca làm việc.</li>\n              <li><b>6. Abschluss:</b> Thống nhất bước tiếp theo, chào tạm biệt lịch sự.</li>\n            </ul>",
          "qa": [
            {
              "q": "Bộ hồ sơ xin việc tiêu chuẩn tại Đức bao gồm những thành phần chính nào?",
              "a": "Anschreiben (Thư xin việc), Lebenslauf (CV), Zeugnisse (Bằng cấp) và các chứng chỉ liên quan."
            },
            {
              "q": "Trong ngành Gastronomie, chứng chỉ an toàn vệ sinh nào là bắt buộc khi đi làm?",
              "a": "Belehrung nach § 43 Infektionsschutzgesetz (IfSG - Vệ sinh an toàn thực phẩm)."
            },
            {
              "q": "[IHK Exam] Mục đích chính của phần Smalltalk (Einstieg) trong phỏng vấn là gì?",
              "a": "Tạo không khí cởi mở, đánh giá thái độ giao tiếp và sự tự tin ban đầu của ứng viên.",
              "src": "fk_exel"
            }
          ]
        },
        {
          "id": "wiko-fragen-agg",
          "icon": "",
          "name": "LS09 · Zulässige & Unzulässige Fragen (AGG)",
          "desc": "Luật bình đẳng AGG · Quyền được nói dối (Recht zur Lüge) · Stellenrelevanz",
          "content": "<h2> LS09 · Zulässige & Unzulässige Fragen im Vorstellungsgespräch</h2>\n            <div class=\"hint\">Giáo trình Wiko-Leyh (Trang 09 / LF 01-LS09) · Luật AGG & Quyền bảo vệ ứng viên</div>\n            <h3>1. Nguyên tắc vàng về Câu hỏi phỏng vấn</h3>\n            <ul>\n              <li><span class=\"term\" data-de=\"Recht zur Lüge\" data-vi=\"Quyền được nói dối\">Recht zur Lüge</span>: Nếu nhà tuyển dụng đặt câu hỏi bị cấm (<i>nicht zulässige Frage</i>), ứng viên <b>được quyền nói dối mà không chịu bất kỳ hậu quả pháp lý nào</b>.</li>\n              <li>Nếu nhà tuyển dụng đặt câu hỏi hợp pháp mà ứng viên khai gian dối: Nhà tuyển dụng có quyền hủy HĐLĐ do lừa dối cố ý (<i>Anfechtung wegen arglistiger Täuschung</i>).</li>\n            </ul>\n            <h3>2. Danh mục câu hỏi BỊ CẤM vs. HỢP PHÁP</h3>\n            <ul>\n              <li><b>CÂU HỎI BỊ CẤM (Được nói dối):</b> Mang thai/kế hoạch sinh con (Schwangerschaft), Tôn giáo (Religion), Xu hướng giới tính, Tình trạng hôn nhân, Quan điểm chính trị, Tài chính nợ nần cá nhân, Nguồn gốc chủng tộc.</li>\n              <li><b>CÂU HỎI HỢP PHÁP (Phải trả lời thật):</b> Chỉ hợp pháp khi liên quan trực tiếp đến vị trí công việc (<i>Stellenrelevanz</i>) — ví dụ: Tiền án tiền sự (Vorstrafen) đối với vị trí Thu ngân/Thủ quỹ; Bệnh truyền nhiễm đối với Đầu bếp/Nhân viên nhà hàng.</li>\n            </ul>",
          "qa": [
            {
              "q": "Nếu nhà tuyển dụng hỏi ứng viên nữ: 'Bạn có kế hoạch sinh con trong 2 năm tới không?', ứng viên có quyền gì?",
              "a": "Được quyền nói dối (Recht zur Lüge) vì đây là câu hỏi vi phạm Luật AGG."
            },
            {
              "q": "Khi nào câu hỏi về tiền án tiền sự (Vorstrafen) lại trở thành hợp pháp trong phỏng vấn?",
              "a": "Khi tiền án liên quan trực tiếp đến vị trí ứng tuyển (Stellenrelevanz), ví dụ tội trộm cắp khi ứng tuyển vị trí Thu ngân."
            },
            {
              "q": "[IHK Exam] Luật AGG bảo vệ người lao động chống lại sự phân biệt đối xử dựa trên những yếu tố nào?",
              "a": "Chủng tộc, giới tính, tôn giáo, khuyết tật, tuổi tác và xu hướng giới tính.",
              "src": "fk_exel"
            }
          ]
        },
        {
          "id": "wiko-arbeitsvertrag",
          "icon": "",
          "name": "LS13 & LS16 · Der Arbeitsvertrag & Loại hình HĐLĐ",
          "desc": "Hợp đồng cá nhân · Nachweisgesetz (4 tuần) · Befristet (Thời hạn) & Teilzeit (Bán thời gian)",
          "content": "<h2> LS13 & LS16 · Der Arbeitsvertrag & Loại hình HĐLĐ</h2>\n            <div class=\"hint\">Giáo trình Wiko-Leyh (Trang 13 & 16 / LF 01-LS13, LS16)</div>\n            <h3>1. Hình thức của Hợp đồng Lao động</h3>\n            <ul>\n              <li>Hợp đồng lao động cá nhân (Einzelarbeitsvertrag) có thể được giao kết bằng lời nói (<i>mündlich</i>) hoặc văn bản.</li>\n              <li><b>Luật Nachweisgesetz (1995):</b> Chủ lao động bắt buộc phải lập văn bản tóm tắt các điều khoản chính và trao cho NLĐ chậm nhất <b>4 tuần (1 tháng)</b> kể từ ngày bắt đầu làm việc.</li>\n            </ul>\n            <h3>2. Các loại hình Hợp đồng đặc thù (LS16)</h3>\n            <ul>\n              <li><b>Befristeter Arbeitsvertrag (HĐ xác định thời hạn):</b> Tự động kết thúc khi hết hạn mà không cần sa thải (Kündigung). Tối đa 2 năm không cần lý do (mit/ohne Sachgrund).</li>\n              <li><b>Teilzeitarbeitsvertrag (HĐ bán thời gian):</b> Làm việc ít giờ hơn ca chuẩn fulltime. Bình đẳng quyền lợi theo Teilzeit- und Befristungsgesetz (TzBfG).</li>\n            </ul>",
          "qa": [
            {
              "q": "Hợp đồng lao động cá nhân giao kết bằng lời nói (mündlich) có hiệu lực không?",
              "a": "Có hiệu lực, nhưng theo Luật Nachweisgesetz chủ lao động phải trao văn bản tóm tắt điều khoản trong vòng 4 tuần."
            },
            {
              "q": "Hợp đồng xác định thời hạn (Befristeter Arbeitsvertrag) kết thúc như thế nào?",
              "a": "Tự động chấm dứt khi hết thời hạn ghi trong hợp đồng mà không cần ra quyết định sa thải (Kündigung)."
            },
            {
              "q": "[IHK Exam] Thời gian thử việc tối đa đối với Hợp đồng lao động thông thường theo § 622 BGB là bao lâu?",
              "a": "Tối đa 6 tháng (Probezeit max 6 Monate).",
              "src": "fk_exel"
            }
          ]
        },
        {
          "id": "wiko-arbeitszeugnis",
          "icon": "",
          "name": "LS14 & LS15 · Das Arbeitszeugnis & Zeugnissprache",
          "desc": "Einfaches vs. Qualifiziertes Zeugnis · Wohlwollensgebot · Thang điểm mã hóa 1–6",
          "content": "<h2> LS14 & LS15 · Das Arbeitszeugnis: Einfaches vs. Qualifiziertes</h2>\n            <div class=\"hint\">Giáo trình Wiko-Leyh (Trang 14 & 15 / LF 01-LS14, LS15) · Mã hóa nhận xét</div>\n            <h3>1. Phân loại Chứng nhận làm việc (LS14)</h3>\n            <ul>\n              <li><b>Einfaches Arbeitszeugnis:</b> Chỉ xác nhận Loại công việc (Art) và Thời gian làm việc (Dauer). Không chứa lời nhận xét.</li>\n              <li><b>Qualifiziertes Arbeitszeugnis:</b> Bao gồm Art + Dauer + Nhận xét Thái độ/Ứng xử (Führung/Verhalten) + Nhận xét Hiệu suất công việc (Leistung).</li>\n            </ul>\n            <h3>2. Thang điểm mã hóa (Zeugnissprache - LS15)</h3>\n            <ul>\n              <li><b>Note 1 (Sehr gut):</b> <i>\"...stets zur vollsten Zufriedenheit erledigt.\"</i></li>\n              <li><b>Note 2 (Gut):</b> <i>\"...stets zur vollen Zufriedenheit erledigt.\"</i></li>\n              <li><b>Note 3 (Befriedigend):</b> <i>\"...zur vollen Zufriedenheit erledigt.\"</i></li>\n              <li><b>Note 4 (Ausreichend):</b> <i>\"...zur Zufriedenheit erledigt.\"</i></li>\n              <li><b>Note 5 (Mangelhaft):</b> <i>\"...im Großen und Ganzen zur Zufriedenheit erledigt.\"</i></li>\n              <li><b>Note 6 (Ungenügend):</b> <i>\"...hat sich bemüht, die Aufgaben zu unserer Zufriedenheit zu erledigen.\"</i> (Có cố gắng nhưng thất bại).</li>\n            </ul>",
          "qa": [
            {
              "q": "Sự khác biệt giữa Einfaches Arbeitszeugnis và Qualifiziertes Arbeitszeugnis là gì?",
              "a": "Qualifiziertes Zeugnis có thêm phần đánh giá thái độ (Führung) và hiệu suất công việc (Leistung)."
            },
            {
              "q": "Cụm từ mã hóa 'hat sich bemüht...' trong Arbeitszeugnis tương đương với Note mấy?",
              "a": "Note 6 (Ungenügend - Kém/Thất bại)."
            },
            {
              "q": "[IHK Exam] Nguyên tắc Wohlwollensgebot bắt buộc nhà tuyển dụng phải viết Arbeitszeugnis như thế nào?",
              "a": "Phải viết tích cực, thiện chí, không dùng từ ngữ xúc phạm làm cản trở sự nghiệp tương lai của NLĐ.",
              "src": "fk_exel"
            }
          ]
        }
      ]
    },
    {
      "id": "lf1-kuendigung",
      "badge": "LF 1 (Năm 1)",
      "title": "LF 1 (Năm 1) · Sa thải & Bảo vệ Chống Sa thải (LS17–LS20)",
      "items": [
        {
          "id": "wiko-kuendigung-frist",
          "icon": "",
          "name": "LS17 · Ordentliche Kündigung & Kündigungsfristen",
          "desc": "§ 622 BGB · Thời hạn báo trước 4 tuần · Điều kiện văn bản Schriftform § 623 BGB",
          "content": "<h2> LS17 · Ordentliche Kündigung & Kündigungsfristen (§ 622 BGB)</h2>\n            <div class=\"hint\">Giáo trình Wiko-Leyh (Trang 17 / LF 01-LS17) · Thôi việc thông thường</div>\n            <h3>1. Thời hạn báo trước khi thôi việc (Kündigungsfristen)</h3>\n            <ul>\n              <li><b>Quy định chung cho NLĐ & Chủ:</b> Báo trước <b>4 tuần</b> tính đến ngày 15 hoặc cuối tháng dương lịch.</li>\n              <li><b>Trong thử việc (Probezeit max 6 tháng):</b> Báo trước <b>2 tuần</b> bất kỳ ngày nào.</li>\n              <li><b>Thời hạn báo của Chủ lao động gia tăng theo thâm niên:</b> 2 năm (1 tháng), 5 năm (2 tháng), 8 năm (3 tháng), 10 năm (4 tháng), 12 năm (5 tháng), 15 năm (6 tháng), 20 năm thâm niên (7 tháng tính đến cuối tháng).</li>\n            </ul>\n            <h3>2. Điều kiện hình thức bắt buộc</h3>\n            <ol>\n              <li><b>Schriftform (§ 623 BGB):</b> Văn bản giấy có chữ ký tay. Email/SMS/Fax đều vô hiệu.</li>\n              <li><b>Zugang:</b> Đã giao đến tay/hòm thư người nhận.</li>\n              <li><b>Anhörung des Betriebsrates (§ 102 BetrVG):</b> Bắt buộc tham vấn Hội đồng công nhân trước khi phát đơn.</li>\n            </ol>",
          "qa": [
            {
              "q": "Thời hạn báo trước khi thôi việc thông thường theo § 622 BGB là bao lâu?",
              "a": "4 tuần tính đến ngày 15 hoặc cuối tháng dương lịch."
            },
            {
              "q": "Thông báo sa thải qua Email hay Tin nhắn SMS có hiệu lực pháp lý không?",
              "a": "Vô hiệu hoàn toàn (§ 623 BGB bắt buộc văn bản giấy có chữ ký tay)."
            },
            {
              "q": "[IHK Exam] Nếu người lao động có 10 năm thâm niên tại công ty, chủ lao động muốn sa thải phải báo trước bao lâu?",
              "a": "Phải báo trước 4 tháng tính đến cuối tháng.",
              "src": "fk_exel"
            }
          ]
        },
        {
          "id": "wiko-kuendigungsschutz",
          "icon": "",
          "name": "LS18 & LS19 · Kündigungsschutzgesetz (KSchG) & Tòa lao động",
          "desc": "Nhóm đối tượng cấm sa thải · 3 lý do sa thải hợp pháp · Klagefrist 3 tuần",
          "content": "<h2> LS18 & LS19 · Kündigungsschutzgesetz (KSchG) & Klage vor dem Arbeitsgericht</h2>\n            <div class=\"hint\">Giáo trình Wiko-Leyh (Trang 18 & 19 / LF 01-LS18, LS19) · Bảo vệ sa thải chung & đặc biệt</div>\n            <h3>1. Besonderer Kündigungsschutz (Cấm sa thải thông thường - LS18)</h3>\n            <ul>\n              <li>Thành viên Hội đồng công nhân (Betriebsrat / JAV).</li>\n              <li>Phụ nữ mang thai & 4 tháng sau sinh (Mutterschutz).</li>\n              <li>Cha mẹ trong thời gian nghỉ nuôi con (Elternzeit).</li>\n              <li>Người khuyết tật nặng (Schwerbehinderte - phải qua Integrationsamt).</li>\n              <li>Học viên học nghề (Azubi) sau thời gian thử việc.</li>\n            </ul>\n            <h3>2. Allgemeiner Kündigungsschutz (§ 1 KSchG) & 3 Lý do Sa thải (LS19)</h3>\n            <ul>\n              <li>Áp dụng khi làm việc > 6 tháng VÀ công ty > 10 nhân viên.</li>\n              <li><b>3 lý do sa thải hợp pháp:</b>\n                <br>1. <i>Personenbedingt:</i> Lý do cá nhân/sức khỏe mãn tính (\"Er/Sie will, kann aber nicht\").\n                <br>2. <i>Verhaltensbedingt:</i> Vi phạm kỷ luật/đi muộn/cãi chỉ đạo (\"Er/Sie kann, will aber nicht\") -> Cần Cảnh cáo (Abmahnung) trước.\n                <br>3. <i>Betriebsbedingt:</i> Cắt giảm vị trí do vận hành -> Bắt buộc chọn lọc xã hội (<span class=\"term\" data-de=\"Sozialauswahl\" data-vi=\"Lựa chọn xã hội\">Sozialauswahl</span>: tuổi, thâm niên, nghĩa vụ nuôi con).\n              </li>\n            </ul>\n            <h3>3. Thời hạn khởi kiện (Klagefrist § 4 KSchG)</h3>\n            <p>Bắt buộc nộp đơn kiện lên Tòa án Lao động (Arbeitsgericht) trong vòng <b>3 tuần</b> kể từ khi nhận đơn sa thải bằng văn bản!</p>",
          "qa": [
            {
              "q": "Thời hạn bắt buộc để người lao động nộp đơn kiện sa thải lên Tòa án Lao động (Arbeitsgericht) là bao lâu?",
              "a": "Trong vòng 3 tuần (3-Wochen-Frist nach § 4 KSchG)."
            },
            {
              "q": "Những nhóm đối tượng nào thuộc diện Bảo vệ sa thải đặc biệt (Besonderer Kündigungsschutz)?",
              "a": "Thành viên Betriebsrat/JAV, phụ nữ mang thai (Mutterschutz), cha mẹ nghỉ Elternzeit, người khuyết tật nặng, Azubi sau thử việc."
            },
            {
              "q": "[IHK Exam] Quy trình Sozialauswahl trong sa thải betriebsbedingt dựa trên các tiêu chí nào?",
              "a": "Thâm niên công tác, tuổi đời, nghĩa vụ nuôi dưỡng người phụ thuộc và mức độ khuyết tật.",
              "src": "fk_exel"
            }
          ]
        },
        {
          "id": "wiko-kuendigung-fristlos",
          "icon": "",
          "name": "LS20 · Außerordentliche Kündigung (Fristlos § 626 BGB)",
          "desc": "Sa thải ngay lập tức · Wichtiger Grund · 2-Wochen-Erklärungsfrist",
          "content": "<h2> LS20 · Außerordentliche Kündigung (Fristlos § 626 BGB)</h2>\n            <div class=\"hint\">Giáo trình Wiko-Leyh (Trang 20 / LF 01-LS20) · Sa thải bất thường aus wichtigem Grund</div>\n            <h3>1. Điều kiện cốt lõi (Wichtiger Grund)</h3>\n            <ul>\n              <li>Bắt buộc phải có lý do đặc biệt nghiêm trọng khiến hai bên không thể tiếp tục hợp đồng dù chỉ 1 ngày.</li>\n              <li><b>Lý do từ phía Chủ:</b> Trộm cắp (Diebstahl), hành hung/bạo lực (Tätlichkeiten), cố ý bỏ việc (Arbeitsverweigerung), giả ốm (erschlichene Krankmeldung), gian lận giờ làm.</li>\n              <li><b>Lý do từ phía NLĐ:</b> Nợ lương kéo dài (Nichtzahlung des Lohns), quấy rối tình dục (sexuelle Belästigung), ép làm việc phạm pháp.</li>\n            </ul>\n            <h3>2. Điều kiện hình thức đặc thù</h3>\n            <ol>\n              <li><b>2-Wochen-Frist (§ 626 Abs. 2 BGB):</b> Đơn sa thải phải được phát trong vòng <b>2 tuần kể từ khi phát hiện vi phạm</b>.</li>\n              <li><b>Schriftform (§ 623 BGB):</b> Bắt buộc văn bản giấy chữ ký tay.</li>\n              <li><b>Anhörung des Betriebsrates:</b> Phải tham vấn Hội đồng công nhân.</li>\n            </ol>",
          "qa": [
            {
              "q": "Thời hạn tối đa để chủ lao động đưa ra quyết định sa thải fristlos kể từ khi phát hiện hành vi vi phạm là bao lâu?",
              "a": "Trong vòng 2 tuần (2-Wochen-Frist § 626 Abs. 2 BGB)."
            },
            {
              "q": "Hành vi trộm cắp tài sản công ty hay giả ốm đi làm việc khác sẽ dẫn đến hình thức sa thải nào?",
              "a": "Sa thải bất thường ngay lập tức (Außerordentliche fristlose Kündigung aus wichtigem Grund)."
            },
            {
              "q": "[IHK Exam] Nếu chủ lao động không tham vấn Betriebsrat trước khi sa thải fristlos thì quyết định sa thải có hiệu lực không?",
              "a": "Hoàn toàn vô hiệu (unwirksam nach § 102 BetrVG).",
              "src": "fk_exel"
            }
          ]
        }
      ]
    },
    {
      "id": "lf1-betriebsrat-tarif",
      "badge": "LF 1 (Năm 1)",
      "title": "LF 1 (Năm 1) · Betriebsrat, JAV & Tarifrecht (LS21–LS34)",
      "items": [
        {
          "id": "wiko-betriebsrat-mitbestimmung",
          "icon": "",
          "name": "LS21, LS22 & LS23 · Betriebsrat & Mitbestimmung",
          "desc": "BetrVG · 4 Stufen der Mitbestimmung (Information, Anhörung, Echte Mitbestimmung)",
          "content": "<h2> LS21, LS22 & LS23 · Betriebsverfassungsgesetz & Mitbestimmung des Betriebsrates</h2>\n            <div class=\"hint\">Giáo trình Wiko-Leyh (Trang 21, 22, 23 / LF 01-LS21, LS22, LS23)</div>\n            <h3>1. Điều kiện thành lập Hội đồng công nhân (Betriebsrat)</h3>\n            <p>Được thành lập tại doanh nghiệp có ít nhất <b>5 nhân viên thường xuyên có quyền bầu cử</b>.</p>\n            <h3>2. 4 Cấp độ Mitbestimmung của Betriebsrat (LS22 & LS23)</h3>\n            <ol>\n              <li><b>Reine Information:</b> Doanh nghiệp thông tin kịp thời (quy hoạch nhân sự, kinh tế).</li>\n              <li><b>Mitwirkung / Anhörung:</b> Tham vấn lắng nghe ý kiến (bắt buộc trước mỗi quyết định sa thải Kündigung).</li>\n              <li><b>Zustimmungsverweigerung:</b> Từ chối chốt nhân sự (tuyển dụng Einstellung, chuyển công tác Versetzung).</li>\n              <li><b>Echte Mitbestimmung:</b> Bắt buộc đồng quyết định 2 bên mới có hiệu lực (lịch làm việc Dienstplan, lịch nghỉ phép Urlaubsplan, lắp camera giám sát).</li>\n            </ol>",
          "qa": [
            {
              "q": "Doanh nghiệp có ít nhất bao nhiêu nhân viên thì có quyền thành lập Betriebsrat?",
              "a": "Ít nhất 5 nhân viên thường xuyên có quyền bầu cử."
            },
            {
              "q": "Quy định xếp lịch làm việc (Dienstplan) thuộc cấp độ Mitbestimmung nào của Betriebsrat?",
              "a": "Echte Mitbestimmung (Đồng quyết định bắt buộc)."
            },
            {
              "q": "[IHK Exam] Nếu chủ doanh nghiệp đơn phương thông báo sa thải nhân viên mà không Anhörung Betriebsrat trước thì sao?",
              "a": "Quyết định sa thải hoàn toàn vô hiệu theo § 102 BetrVG.",
              "src": "fk_exel"
            }
          ]
        },
        {
          "id": "wiko-jav",
          "icon": "",
          "name": "LS24 · Jugend- und Auszubildendenvertretung (JAV)",
          "desc": "Đại diện thanh thiếu niên < 18t & Azubi < 25t · Phối hợp với Betriebsrat",
          "content": "<h2> LS24 · Jugend- und Auszubildendenvertretung (JAV)</h2>\n            <div class=\"hint\">Giáo trình Wiko-Leyh (Trang 24 / LF 01-LS24) · Đại diện Azubi & Thanh thiếu niên</div>\n            <h3>1. Điều kiện thành lập JAV</h3>\n            <p>Tại doanh nghiệp có ít nhất <b>5 nhân viên dưới 18 tuổi</b> hoặc <b>học viên học nghề (Azubi) dưới 25 tuổi</b>, và đã có Betriebsrat.</p>\n            <h3>2. Nhiệm vụ & Quyền hạn của JAV</h3>\n            <ul>\n              <li>Đại diện quyền lợi học tập, làm việc và an toàn cho Azubi.</li>\n              <li>Đề xuất các biện pháp cải thiện điều kiện đào tạo lên Betriebsrat.</li>\n              <li>Có quyền cử đại diện tham dự các phiên họp của Betriebsrat khi bàn thảo vấn đề liên quan đến Azubi.</li>\n            </ul>",
          "qa": [
            {
              "q": "JAV đại diện cho nhóm đối tượng nào trong doanh nghiệp?",
              "a": "Nhân viên dưới 18 tuổi và học viên học nghề (Azubi) dưới 25 tuổi."
            },
            {
              "q": "[IHK Exam] JAV có thể hoạt động độc lập không cần Betriebsrat không?",
              "a": "Không, JAV hoạt động phối hợp chặt chẽ và gửi đề xuất lên Betriebsrat.",
              "src": "fk_exel"
            }
          ]
        },
        {
          "id": "wiko-tarifvertrag",
          "icon": "",
          "name": "LS25, LS26, LS27, LS28 & LS31 · Luật Thỏa ước tập thể",
          "desc": "Manteltarif vs. Lohntarif · 4 Grundsätze · Günstigkeitsprinzip § 4 Abs. 3 TVG",
          "content": "<h2> LS25, LS26, LS27, LS28 & LS31 · Tarifvertrag & Tarifautonomie</h2>\n            <div class=\"hint\">Giáo trình Wiko-Leyh (Trang 25, 26, 27, 28, 31 / LF 01-LS25 đến LS31)</div>\n            <h3>1. Đơn vị ký kết & Tarifautonomie (LS25)</h3>\n            <ul>\n              <li>Ký kết giữa <b>Công đoàn (Gewerkschaft - z.B. NGG)</b> và <b>Hiệp hội chủ (Arbeitgeberverband - z.B. DEHOGA)</b>.</li>\n              <li><span class=\"term\" data-de=\"Tarifautonomie\" data-vi=\"Tự chủ thỏa ước\">Tarifautonomie</span> (Art. 9 Abs. 3 GG): Quyền tự do đàm phán thù lao & điều kiện làm việc <b>không có sự can thiệp của Nhà nước</b>.</li>\n            </ul>\n            <h3>2. Phân loại Tarifvertrag (LS26)</h3>\n            <ul>\n              <li><b>Manteltarifvertrag (Thỏa ước khung):</b> Điều kiện làm việc chung (giờ làm, phép năm, thời hạn sa thải). Hiệu lực dài hạn (nhiều năm).</li>\n              <li><b>Lohntarifvertrag (Thỏa ước lương):</b> Chi tiết mức lương từng bậc (Lohngruppen). Hiệu lực ngắn hạn (1-2 năm).</li>\n            </ul>\n            <h3>3. 4 Nguyên tắc vàng của Luật Thỏa ước (LS27, LS31)</h3>\n            <ol>\n              <li><i>Tarifautonomie:</i> Tự do đàm phán.</li>\n              <li><i>Unabdingbarkeit:</i> Mức chuẩn thỏa ước là tiêu chuẩn tối thiểu bắt buộc.</li>\n              <li><i>Günstigkeitsprinzip (§ 4 Abs. 3 TVG):</i> HĐLĐ cá nhân chỉ được khác Tarif nếu <b>có lợi hơn cho NLĐ</b>.</li>\n              <li><i>Friedenspflicht:</i> Nghĩa vụ hòa bình (cấm đình công khi thỏa ước còn hiệu lực).</li>\n            </ol>",
          "qa": [
            {
              "q": "Nguyên tắc Günstigkeitsprinzip quy định điều gì khi so sánh HĐLĐ cá nhân và Thỏa ước tập thể?",
              "a": "HĐLĐ cá nhân được phép khác Thỏa ước tập thể CHỈ KHÍ điều khoản đó có lợi hơn cho người lao động."
            },
            {
              "q": "Công đoàn đại diện cho ngành Gastronomie & Hotellerie tại Đức là gì?",
              "a": "NGG (Gewerkschaft Nahrung-Genuss-Gaststätten)."
            },
            {
              "q": "Hiệp hội chủ lao động ngành Nhà hàng - Khách sạn tại Đức là gì?",
              "a": "DEHOGA (Deutscher Hotel- und Gaststättenverband)."
            },
            {
              "q": "[IHK Exam] Sự khác biệt giữa Manteltarifvertrag và Lohntarifvertrag là gì?",
              "a": "Manteltarif quy định điều kiện làm việc chung (dài hạn); Lohntarif quy định bảng lương chi tiết (ngắn hạn 1-2 năm).",
              "src": "fk_exel"
            }
          ]
        },
        {
          "id": "wiko-arbeitskampf",
          "icon": "",
          "name": "LS29, LS30, LS32, LS33 & LS34 · Đấu tranh lao động",
          "desc": "NGG vs. DEHOGA · Schlichtung · Urabstimmung (>= 75%) · Streik vs. Aussperrung · Wilder Streik",
          "content": "<h2> LS29, LS30, LS32, LS33 & LS34 · Schlichtung, Streik & Arbeitskampf</h2>\n            <div class=\"hint\">Giáo trình Wiko-Leyh (Trang 29, 30, 32, 33, 34 / LF 01-LS29 đến LS34)</div>\n            <h3>1. Quy trình giải quyết bế tắc đàm phán</h3>\n            <p>Bế tắc (Scheitern) → Hòa giải (Schlichtung) → Bỏ phiếu trưng cầu (Urabstimmung >= 75%) → Đình công (Streik) / Bãi công (Aussperrung) → Thỏa thuận mới.</p>\n            <h3>2. Chi tiết các hình thức Đấu tranh lao động</h3>\n            <ul>\n              <li><b>Schlichtung (Hòa giải):</b> Trọng tài độc lập đứng ra tìm giải pháp trung hòa.</li>\n              <li><b>Urabstimmung (Bỏ phiếu):</b> Cần ít nhất <b>75% đoàn viên công đoàn</b> bỏ phiếu đồng ý để khởi động đình công.</li>\n              <li><b>Streik (Đình công):</b> NLĐ ngừng làm việc tập thể do Công đoàn tổ chức. Công đoàn chi trả tiền hỗ trợ (<span class=\"term\" data-de=\"Streikgeld\" data-vi=\"Tiền hỗ trợ đình công\">Streikgeld</span>).</li>\n              <li><b>Aussperrung (Bãi công / Khóa cửa):</b> Biện pháp đáp trả của Chủ (tạm thời không cho NLĐ vào làm và không trả lương).</li>\n              <li><span class=\"term\" data-de=\"Wilder Streik\" data-vi=\"Đình công tự phát\">Wilder Streik</span>: Đình công không do Công đoàn tổ chức  <b>TRÁI PHÁP LUẬT</b> -> NLĐ có thể bị sa thải fristlos ngay lập tức!</li>\n            </ul>",
          "qa": [
            {
              "q": "Cần bao nhiêu % đoàn viên công đoàn bỏ phiếu đồng ý trong cuộc Urabstimmung để khởi động đình công?",
              "a": "Ít nhất 75% số đoàn viên bỏ phiếu đồng ý."
            },
            {
              "q": "Đình công tự phát (Wilder Streik) không do Công đoàn tổ chức có hợp pháp không?",
              "a": "Trái pháp luật hoàn toàn, người tham gia có thể bị sa thải ngay lập tức (fristlos)."
            },
            {
              "q": "[IHK Exam] Tiền trả thay lương cho công nhân trong thời gian đình công hợp pháp do ai chi trả?",
              "a": "Do Công đoàn (Gewerkschaft) chi trả dưới dạng Streikgeld.",
              "src": "fk_exel"
            }
          ]
        }
      ]
    },
    {
      "id": "lf1-lohn-steuern",
      "badge": "LF 1 (Năm 1)",
      "title": "LF 1 (Năm 1) · Lohnabrechnung, BHXH & Thuế (LS35–LS48)",
      "items": [
        {
          "id": "wiko-lohnabrechnung-sozial",
          "icon": "",
          "name": "LS35–LS41 & LS43 · Lohnabrechnung & Sozialversicherung",
          "desc": "5 Säulen der Sozialversicherung · Tỷ lệ đóng 50/50 · Pflege 2025 · Brutto zu Netto (Leo Scienca & Frau Wolters)",
          "content": "<h2> LS35–LS41 & LS43 · Lohnabrechnung & 5 Säulen der Sozialversicherung</h2>\n            <div class=\"hint\">Giáo trình Wiko-Leyh (Trang 35–41, 43 / LF 01-LS35 đến LS43) · Tỷ lệ đóng BHXH 50/50</div>\n            <h3>1. 5 Trụ cột Bảo hiểm Xã hội (Sozialversicherung)</h3>\n            <ol>\n              <li><b>Krankenversicherung (BH Y tế):</b> Chi trả khám chữa bệnh.</li>\n              <li><b>Pflegeversicherung (BH Chăm sóc dài hạn):</b> Chi trả khi tàn tật/già yếu (Cập nhật quy định 2025 theo số con).</li>\n              <li><b>Rentenversicherung (BH Hưu trí):</b> Trả lương hưu khi về già.</li>\n              <li><b>Arbeitslosenversicherung (BH Thất nghiệp):</b> Hỗ trợ tài chính khi mất việc.</li>\n              <li><b>Unfallversicherung (BH Tai nạn lao động):</b> 100% do Chủ chi trả (Berufsgenossenschaft).</li>\n            </ol>\n            <p><i>Lưu ý: 4 quỹ đầu đóng chia đều 50/50 giữa Chủ và NLĐ. Quỹ Unfallversicherung do Chủ trả 100%.</i></p>\n            <h3>2. Khấu trừ Lương (Brutto zu Netto - Bài tập Leo Scienca LS40/41 & Frau Wolters LS43)</h3>\n            <p>Bruttolohn  (Lohnsteuer + Solidaritätszuschlag + Kirchensteuer)  Sozialversicherungsbeiträge = <b>Nettolohn</b>.</p>",
          "qa": [
            {
              "q": "5 Trụ cột của Bảo hiểm Xã hội (Sozialversicherung) tại Đức là gì?",
              "a": "Kranken-, Pflege-, Renten-, Arbeitslosen- và Unfallversicherung."
            },
            {
              "q": "Quỹ bảo hiểm xã hội nào do Chủ doanh nghiệp chi trả 100% kinh phí?",
              "a": "Unfallversicherung (Bảo hiểm tai nạn lao động qua Berufsgenossenschaft)."
            },
            {
              "q": "[IHK Exam] Tỷ lệ đóng 4 quỹ bảo hiểm xã hội chung (Y tế, Hưu trí, Thất nghiệp, Chăm sóc) giữa Chủ và NLĐ là bao nhiêu?",
              "a": "Đóng chia đều 50 / 50 (paritätische Finanzierung).",
              "src": "fk_exel"
            }
          ]
        },
        {
          "id": "wiko-steuerklassen",
          "icon": "",
          "name": "LS42 & LS44–LS48 · Steuerklassen & Lạm phát",
          "desc": "6 Steuerklassen · Lựa chọn IV/IV vs. III/V · Lạm phát (Inflation) & Bài tập tra bảng thuế",
          "content": "<h2> LS42 & LS44–LS48 · Die 6 Steuerklassen in Deutschland & Inflation</h2>\n            <div class=\"hint\">Giáo trình Wiko-Leyh (Trang 42, 44–48 / LF 01-LS42, LS44 đến LS48)</div>\n            <h3>1. Bảng phân loại 6 Bậc Thuế (Steuerklassen - LS44)</h3>\n            <ul>\n              <li><b>Steuerklasse I:</b> Độc thân (Ledig), ly hôn, sống ly thân.</li>\n              <li><b>Steuerklasse II:</b> Bố/mẹ đơn thân nuôi con (Alleinerziehend).</li>\n              <li><b>Steuerklasse III:</b> Đã kết hôn, người có thu nhập cao hơn chọn (vợ/chồng làm lớp V).</li>\n              <li><b>Steuerklasse IV:</b> Đã kết hôn, hai vợ chồng có thu nhập ngang nhau.</li>\n              <li><b>Steuerklasse V:</b> Đã kết hôn, người có thu nhập thấp hơn chọn (vợ/chồng làm lớp III).</li>\n              <li><b>Steuerklasse VI:</b> Người làm công việc thứ 2 (Zweitjob / Công việc làm thêm thứ hai).</li>\n            </ul>\n            <h3>2. Khái niệm Lạm phát (Inflation - LS42)</h3>\n            <p>Lạm phát là sự gia tăng mức giá chung kéo dài làm giảm sức mua (Kaufkraftverlust) của tiền tệ. Các loại lạm phát: Nachfrageinflation (do cầu tăng), Kostendruckinflation (do chi phí đầu vào tăng).</p>",
          "qa": [
            {
              "q": "Người làm thêm công việc thứ 2 (Zweitjob) tại Đức bắt buộc phải chịu bậc thuế nào?",
              "a": "Steuerklasse VI (Bậc thuế 6 - mức khấu trừ cao nhất)."
            },
            {
              "q": "Người bố/mẹ đơn thân nuôi con tại Đức thuộc bậc thuế nào?",
              "a": "Steuerklasse II."
            },
            {
              "q": "[IHK Exam] Cặp vợ chồng có mức thu nhập chênh lệch rất lớn (chồng 4000€, vợ 1000€) nên chọn kết hợp bậc thuế nào để tối ưu thuế hàng tháng?",
              "a": "Nên chọn kết hợp Steuerklasse III (người thu nhập cao) và Steuerklasse V (người thu nhập thấp).",
              "src": "fk_exel"
            }
          ]
        }
      ]
    },
    {
      "id": "modul-nam2-kaufvertrag",
      "badge": "Modul Năm 2",
      "title": "Modul Năm 2 · Kaufvertrag, Mängel & Leistungsstörungen",
      "items": [
        {
          "id": "kaufvertrag",
          "icon": "",
          "name": "Kaufvertrag, Mängel & Leistungsstörungen (Năm 2)",
          "desc": "Angebot & Annahme · Sachmangel vs. Rechtsmangel · Nacherfüllung & Minderung · Lieferverzug",
          "content": "<h2> Kaufvertrag, Mängel & Leistungsstörungen (Chủ đề Năm 2)</h2>\n            <div class=\"hint\">Cơ sở pháp lý Hợp đồng mua bán (§ 433 BGB) & Xử lý vi phạm/hàng lỗi (Chủ đề Năm 2)</div>\n            <h3>1. Sự hình thành Kaufvertrag</h3>\n            <p>Hình thành khi có <b>2 Tuyên bố ý chí phù hợp (zwei übereinstimmende Willenserklärungen)</b>: <span class=\"term\" data-de=\"Angebot\" data-vi=\"Chào hàng / Đề nghị\">Angebot</span> + <span class=\"term\" data-de=\"Annahme\" data-vi=\"Chấp nhận\">Annahme</span>.</p>\n            <h3>2. Nghĩa vụ hai bên (§ 433 BGB)</h3>\n            <ul>\n              <li><b>Verkäufer (Người bán):</b> Giao hàng đúng hạn, không có lỗi (mängelfrei), chuyển giao sở hữu.</li>\n              <li><b>Käufer (Người mua):</b> Nhận hàng (Abnahme) và trả tiền đúng thỏa thuận (Zahlung des Kaufpreises).</li>\n            </ul>\n            <h3>3. Quyền của Người mua khi hàng bị lỗi (Mangel)</h3>\n            <ol>\n              <li><b>Nacherfüllung (Ưu tiên số 1):</b> Yêu cầu sửa chữa (Nachbesserung) hoặc giao hàng mới thay thế (Neulieferung).</li>\n              <li><b>Nếu Nacherfüllung thất bại (sau 2 lần sửa không được):</b> Có quyền Giảm giá (Minderung), Hủy hợp đồng trả hàng (Rücktritt), hoặc Yêu cầu bồi thường thiệt hại (Schadensersatz).</li>\n            </ol>",
          "qa": [
            {
              "q": "Hợp đồng mua bán (Kaufvertrag) được hình thành như thế nào?",
              "a": "Hình thành khi có 2 tuyên bố ý chí phù hợp nhau (Angebot và Annahme)."
            },
            {
              "q": "Quyền ưu tiên hàng đầu của người mua khi nhận phải hàng bị lỗi (Mangel) là gì?",
              "a": "Nacherfüllung (Yêu cầu sửa chữa Nachbesserung hoặc đổi sản phẩm mới Neulieferung)."
            },
            {
              "q": "[IHK Exam] Khi bên bán giao hàng muộn (Lieferungsverzug), bên mua cần làm gì trước khi hủy hợp đồng?",
              "a": "Phải đặt một thời hạn gia hạn hợp lý (Angemessene Nachfrist setzen).",
              "src": "fk_exel"
            },
            {
              "q": "[IHK Exam] Sự khác biệt giữa Sachmangel (lỗi vật lý) và Rechtsmangel (lỗi pháp lý) là gì?",
              "a": "Sachmangel là hàng bị hỏng/vỡ/sai mẫu; Rechtsmangel là hàng bị quyền sở hữu của bên thứ ba tranh chấp (hàng ăn trộm/cầm cố).",
              "src": "fk_exel"
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
          "desc": "Năng lực pháp luật & Năng lực hành vi",
          "content": "<h2>Rechtsgeschäfte · Rechtsfähigkeit & Geschäftsfähigkeit</h2>\n<div class=\"hint\">Gesetzbuch zum Lernen (DE–VI) · BGB</div>\n<h3 class=\"sub\">1.1 Rechtsfähigkeit <i>— Năng lực pháp luật</i></h3>\n\n  <div class=\"block\">\n    <div class=\"de\"><b>Definition</b> \n      Rechtsfähigkeit ist die Fähigkeit von Personen, Träger von Rechten und Pflichten sein zu können.\n    </div>\n    <div class=\"vi\"><b>Übersetzung</b> \n      Năng lực pháp luật là khả năng của một người trở thành chủ thể mang các quyền và nghĩa vụ.\n    </div>\n  </div>\n\n  <div class=\"de\">Rechtsfähig sind <b>natürliche Personen</b> und <b>juristische Personen</b>.</div>\n  <div class=\"vi\">Có năng lực pháp luật gồm <b>tự nhiên nhân</b> (con người) và <b>pháp nhân</b>.</div>\n\n  <h4 style=\"font-family:&#39;IBM Plex Sans&#39;,sans-serif; color:var(--ink); margin-top:24px; font-size:1rem;\">a) Natürliche Personen</h4>\n  <ul>\n    <li class=\"de\">Das sind <b>alle Menschen</b> <span class=\"para-code\">§1 BGB</span></li>\n    <li class=\"de\">Beginn: mit der Vollendung der Geburt</li>\n    <li class=\"de\">Ende: mit dem Tod</li>\n    <li class=\"de\">Jeder Mensch ist rechtsfähig — unabhängig vom Alter.</li>\n  </ul>\n  <div class=\"vi\" style=\"margin-top:-8px;\"><b>Übersetzung</b> Đó là <b>tất cả con người</b> (§1 BGB). Bắt đầu khi sinh ra hoàn tất, kết thúc khi chết. Mọi người đều có năng lực pháp luật, không phân biệt tuổi tác.</div>\n\n  <div class=\"example\"><b>Beispiel · Ví dụ</b> \n    <span class=\"de\">Das Erbrecht eines neugeborenen Kindes.</span><br>\n    <span class=\"vi\" style=\"border:none; padding:4px 0 0;\">Quyền thừa kế của một đứa trẻ mới sinh.</span>\n  </div>\n\n  <h4 style=\"font-family:&#39;IBM Plex Sans&#39;,sans-serif; color:var(--ink); margin-top:24px; font-size:1rem;\">b) Juristische Personen</h4>\n  <div class=\"de\">\"Künstliche Personen\", denen der Staat kraft Gesetzes Rechtsfähigkeit verleiht.</div>\n  <div class=\"vi\">\"Con người nhân tạo\", được nhà nước trao tư cách chủ thể pháp luật bằng luật.</div>\n\n  <div class=\"grid2\" style=\"margin-top:14px;\">\n    <div class=\"block\" style=\"margin:0;\">\n      <div class=\"de\" style=\"border-radius:6px;\"><b>Privates Recht</b> \n        z. B. GmbH, AG, eingetragener Verein.<br>Rechtsfähig ab <b>Eintragung ins Register</b> bis zur <b>Löschung</b>.\n      </div>\n      <div class=\"vi\"><b>Luật tư</b> VD: GmbH, AG, hội đăng ký. Có tư cách pháp nhân từ khi đăng ký vào sổ đăng bạ đến khi bị xóa tên.</div>\n    </div>\n    <div class=\"block\" style=\"margin:0;\">\n      <div class=\"de\" style=\"border-radius:6px;\"><b>Öffentliches Recht</b> \n        z. B. Länder, Gemeinden, Handwerkskammer.<br>Rechtsfähig durch <b>staatliche Verleihung</b> bis zum <b>Entzug</b>.\n      </div>\n      <div class=\"vi\"><b>Luật công</b> VD: các Bang, xã/phường, phòng thủ công. Có tư cách pháp nhân qua sự ban cấp của nhà nước đến khi bị thu hồi.</div>\n    </div>\n  </div>\n\n  <h3 class=\"sub\">1.2 Geschäftsfähigkeit <i>— Năng lực hành vi dân sự</i></h3>\n\n  <div class=\"block\">\n    <div class=\"de\"><b>Definition</b> \n      Geschäftsfähigkeit ist die Fähigkeit von Personen, Willenserklärungen rechtswirksam abzugeben, entgegenzunehmen und zu widerrufen, d. h. vollgültige Rechtsgeschäfte zu tätigen.\n    </div>\n    <div class=\"vi\"><b>Übersetzung</b> \n      Là khả năng tự mình đưa ra, tiếp nhận và rút lại tuyên bố ý chí một cách hợp pháp, tức là tự thực hiện các giao dịch có hiệu lực đầy đủ.\n    </div>\n  </div>\n\n  <div class=\"timeline\">\n    <div>Geburt<span class=\"vi-mini\">sinh ra</span></div>\n    <div>→</div>\n    <div>7 Jahre</div>\n    <div>→</div>\n    <div>18 Jahre</div>\n    <div>→</div>\n    <div>Tod<span class=\"vi-mini\">chết</span></div>\n  </div>\n\n  <h4 style=\"font-family:&#39;IBM Plex Sans&#39;,sans-serif; color:var(--ink); margin-top:24px; font-size:1rem;\">1) Geschäftsunfähigkeit <span class=\"para-code\">§104 BGB</span></h4>\n  <div class=\"de\">Kinder <b>unter 7 Jahren</b> sind geschäftsunfähig. Personen mit dauernder krankhafter Störung der Geistestätigkeit gelten ebenso als geschäftsunfähig.</div>\n  <div class=\"vi\">Trẻ em <b>dưới 7 tuổi</b> mất năng lực hành vi. Người bị rối loạn tâm thần lâu dài cũng được xem như trẻ em (mất năng lực hành vi).</div>\n\n  <div class=\"note\"><b>Rechtsfolge · Hậu quả pháp lý</b> \n    <span class=\"de\">Willenserklärungen sind unwirksam. Verträge sind immer <b>nichtig</b>. <span class=\"para-code\">§105 BGB</span> Es ist ein gesetzlicher Vertreter (i. d. R. die Eltern) nötig.</span><br><br>\n    <span class=\"vi\" style=\"border:none; padding:0;\">Tuyên bố ý chí không có hiệu lực. Hợp đồng luôn <b>vô hiệu</b>. Cần người đại diện hợp pháp (thường là cha mẹ) thực hiện thay.</span>\n  </div>\n\n  <h4 style=\"font-family:&#39;IBM Plex Sans&#39;,sans-serif; color:var(--ink); margin-top:24px; font-size:1rem;\">2) Beschränkte Geschäftsfähigkeit <span class=\"para-code\">§106 BGB</span></h4>\n  <div class=\"de\">Minderjährige <b>von 7 bis unter 18 Jahren</b>. Rechtsgeschäfte benötigen die Zustimmung des gesetzlichen Vertreters.</div>\n  <div class=\"vi\">Người vị thành niên <b>từ 7 đến dưới 18 tuổi</b>. Giao dịch cần sự đồng ý của người đại diện hợp pháp.</div>\n\n  <ul style=\"margin-top:14px;\">\n    <li class=\"de\"><b>Einwilligung</b> — Zustimmung <i>vorab</i>, bevor das Geschäft geschlossen wird.</li>\n    <li class=\"de\"><b>Genehmigung</b> — Zustimmung <i>danach</i>, nachdem das Geschäft geschlossen wurde.</li>\n  </ul>\n  <div class=\"vi\" style=\"margin-top:-8px;\"><b>Einwilligung</b> (chấp thuận trước): đồng ý trước khi giao dịch diễn ra. <b>Genehmigung</b> (phê chuẩn sau): đồng ý sau khi giao dịch đã diễn ra.</div>\n\n  <div class=\"warn\" style=\"margin-top:16px;\"><b>Rechtsfolge · Hậu quả pháp lý</b> \n    <span class=\"de\">Bis zur Entscheidung des Vertreters ist der Vertrag <b>schwebend unwirksam</b>. Bei Verweigerung: von Anfang an unwirksam. Bei Genehmigung: von Anfang an wirksam.</span><br><br>\n    <span class=\"vi\" style=\"border:none; padding:0;\">Chừng nào chưa có quyết định của người đại diện, hợp đồng ở trạng thái <b>\"treo\"</b> — chưa có hiệu lực. Nếu bị từ chối: vô hiệu từ đầu. Nếu được phê chuẩn: có hiệu lực từ đầu.</span>\n  </div>\n\n  <h5 style=\"font-family:&#39;IBM Plex Sans&#39;,sans-serif; color:var(--wax); margin-top:22px; font-size:.92rem;\">Ausnahmen — keine Zustimmung nötig<span style=\"display:block; color:var(--slate); font-weight:400; font-size:.85rem; margin-top:2px;\">Ngoại lệ — không cần sự đồng ý</span></h5>\n  <ul>\n    <li class=\"de\"><b>Lediglich rechtlicher Vorteil</b> <span class=\"para-code\">§107 BGB</span> — z. B. eine Schenkung annehmen.\n      <div class=\"vi\" style=\"border:none; padding:4px 0 0 0; margin:0;\">Lợi ích pháp lý thuần túy — VD: nhận quà tặng.</div>\n    </li>\n    <li class=\"de\" style=\"margin-top:12px;\"><b>Taschengeldparagraph</b> <span class=\"para-code\">§110 BGB</span> — Geschäfte, die mit eigenen Mitteln sofort bezahlt werden.\n      <div class=\"vi\" style=\"border:none; padding:4px 0 0 0; margin:0;\">Điều khoản \"tiền tiêu vặt\" — giao dịch được thanh toán ngay bằng tiền của chính mình.</div>\n      <div class=\"warn\" style=\"margin-top:8px;\"><b>Achtung · Lưu ý</b> \n        <span class=\"de\">Gilt <b>nicht</b> für Ratenkäufe oder Handyverträge.</span><br>\n        <span class=\"vi\" style=\"border:none; padding:0;\">KHÔNG áp dụng cho mua trả góp hoặc hợp đồng điện thoại.</span>\n      </div>\n    </li>\n    <li class=\"de\" style=\"margin-top:12px;\"><b>Arbeitsverhältnis</b> <span class=\"para-code\">§113 BGB</span> — wenn der gesetzliche Vertreter zugestimmt hat.\n      <div class=\"vi\" style=\"border:none; padding:4px 0 0 0; margin:0;\">Quan hệ lao động — khi người đại diện hợp pháp đã đồng ý (không tính Ausbildung/học nghề).</div>\n    </li>\n  </ul>\n\n  <h4 style=\"font-family:&#39;IBM Plex Sans&#39;,sans-serif; color:var(--ink); margin-top:24px; font-size:1rem;\">3) Unbeschränkte Geschäftsfähigkeit <span class=\"para-code\">§2 BGB</span></h4>\n  <div class=\"de\">Personen <b>ab 18 Jahren</b> (außer bei dauernder Geistesstörung).</div>\n  <div class=\"vi\">Người <b>từ đủ 18 tuổi trở lên</b> (trừ trường hợp rối loạn tâm thần lâu dài).</div>\n  <div class=\"note\"><b>Rechtsfolge · Hậu quả pháp lý</b> \n    <span class=\"de\">Alle Rechtsgeschäfte sind voll rechtsgültig, ohne Zustimmung nötig.</span><br>\n    <span class=\"vi\" style=\"border:none; padding:0;\">Mọi giao dịch pháp lý có hiệu lực đầy đủ, không cần sự đồng ý của ai.</span>\n  </div>\n\n  <table>\n    <tbody><tr><th>Alter<span style=\"display:block;font-weight:400;font-size:.7rem;\">Độ tuổi</span></th><th>Stufe<span style=\"display:block;font-weight:400;font-size:.7rem;\">Mức độ</span></th><th>Rechtsfolge<span style=\"display:block;font-weight:400;font-size:.7rem;\">Hậu quả</span></th></tr>\n    <tr><td>Unter 7 Jahren</td><td>Geschäftsunfähig</td><td>Nichtig</td></tr>\n    <tr><td>7 – unter 18 Jahren</td><td>Beschränkt geschäftsfähig</td><td>Schwebend unwirksam</td></tr>\n    <tr><td>Ab 18 Jahren</td><td>Unbeschränkt geschäftsfähig</td><td>Voll gültig</td></tr>\n  </tbody></table>"
        },
        {
          "id": "wiko-rg-p2",
          "icon": "",
          "name": "Rechtsgeschäfte · Rechtsgeschäfte",
          "desc": "Giao dịch pháp lý",
          "content": "<h2>Rechtsgeschäfte · Rechtsgeschäfte</h2>\n<div class=\"hint\">Gesetzbuch zum Lernen (DE–VI) · BGB</div>\n<h3 class=\"sub\">2.1 Willenserklärung <i>— Tuyên bố ý chí</i></h3>\n  <div class=\"block\">\n    <div class=\"de\"><b>Definition</b> Willenserklärungen sind Äußerungen einer Person, die mit der Absicht vorgenommen werden, eine rechtliche Wirkung herbeizuführen. Sie besteht aus <b>Wille</b> und <b>Erklärung</b>.</div>\n    <div class=\"vi\"><b>Übersetzung</b> Là hành vi/tuyên bố của một người nhằm mục đích tạo ra hậu quả pháp lý. Gồm <b>ý chí</b> (mong muốn) và <b>sự thể hiện</b> ý chí đó.</div>\n  </div>\n\n  <ul>\n    <li class=\"de\"><b>Unmittelbare Handlungen</b> — mündlich, telefonisch, schriftlich, per E-Mail.\n      <div class=\"vi\" style=\"border:none; padding:4px 0 0 0; margin:0;\">Hành động trực tiếp: nói, gọi điện, viết, email.</div>\n    </li>\n    <li class=\"de\" style=\"margin-top:10px;\"><b>Schlüssige Handlungen</b> — Einsteigen in die Straßenbahn, Münzeinwurf, Kopfnicken.\n      <div class=\"vi\" style=\"border:none; padding:4px 0 0 0; margin:0;\">Hành vi ngụ ý: lên tàu điện, bỏ xu vào máy, gật đầu.</div>\n    </li>\n    <li class=\"de\" style=\"margin-top:10px;\"><b>Ausnahmsweise Schweigen</b> — nur, wenn vertraglich vereinbart.\n      <div class=\"vi\" style=\"border:none; padding:4px 0 0 0; margin:0;\">Im lặng (ngoại lệ): chỉ khi đã thỏa thuận trước trong hợp đồng.</div>\n    </li>\n  </ul>\n\n  <h3 class=\"sub\">2.2 Einseitige Rechtsgeschäfte <i>— Giao dịch đơn phương</i></h3>\n  <div class=\"de\">Es wird nur <b>eine</b> Willenserklärung benötigt.</div>\n  <div class=\"vi\">Chỉ cần <b>một</b> tuyên bố ý chí.</div>\n\n  <div class=\"grid2\" style=\"margin-top:14px;\">\n    <div class=\"block\" style=\"margin:0;\">\n      <div class=\"de\" style=\"border-radius:6px;\"><b>Nicht empfangsbedürftig</b><br>Wirksam sofort bei Abgabe.</div>\n      <div class=\"vi\">Không cần người nhận — có hiệu lực ngay khi đưa ra.</div>\n      <div class=\"example\"><b>Beispiel · Ví dụ</b> <span class=\"de\">Testament</span> — <span class=\"vi\" style=\"border:none; padding:0;\">di chúc, có hiệu lực ngay khi viết xong.</span></div>\n    </div>\n    <div class=\"block\" style=\"margin:0;\">\n      <div class=\"de\" style=\"border-radius:6px;\"><b>Empfangsbedürftig</b><br>Wirksam erst bei Zugang.</div>\n      <div class=\"vi\">Cần người nhận — chỉ có hiệu lực khi đến tay người nhận.</div>\n      <div class=\"example\"><b>Beispiel · Ví dụ</b> <span class=\"de\">Kündigung</span> — <span class=\"vi\" style=\"border:none; padding:0;\">thông báo chấm dứt hợp đồng.</span></div>\n    </div>\n  </div>\n\n  <ul style=\"margin-top:16px;\">\n    <li class=\"de\"><b>Unter Anwesenden</b> — wirksam sofort bei Abgabe.\n      <div class=\"vi\" style=\"border:none; padding:4px 0 0 0; margin:0;\">Giữa người có mặt: có hiệu lực ngay khi đưa ra.</div>\n    </li>\n    <li class=\"de\" style=\"margin-top:10px;\"><b>Unter Abwesenden</b> — wirksam bei Zugang (wenn der Empfänger unter normalen Umständen Kenntnis nehmen könnte).\n      <div class=\"vi\" style=\"border:none; padding:4px 0 0 0; margin:0;\">Giữa người vắng mặt: có hiệu lực khi đến nơi (người nhận có thể biết trong điều kiện bình thường).</div>\n    </li>\n  </ul>\n\n  <h3 class=\"sub\">2.3 Zweiseitige (mehrseitige) Rechtsgeschäfte <i>— Giao dịch nhiều bên</i></h3>\n  <div class=\"de\">Mindestens <b>zwei</b> übereinstimmende Willenserklärungen → <b>Verträge</b>: <b>Antrag</b> + <b>Annahme</b>.</div>\n  <div class=\"vi\">Cần ít nhất <b>hai</b> tuyên bố ý chí trùng khớp → gọi là <b>hợp đồng</b>: Đề nghị + Chấp nhận.</div>\n\n  <div class=\"example\"><b>Beispiel · Ví dụ</b> \n    <span class=\"de\"><b>Einseitig verpflichtend:</b> Schenkungsvertrag. <b>Zweiseitig verpflichtend:</b> Kaufvertrag, Mietvertrag, Berufsausbildungsvertrag.</span><br>\n    <span class=\"vi\" style=\"border:none; padding:4px 0 0 0;\">Ràng buộc 1 bên: hợp đồng tặng cho. Ràng buộc 2 bên: hợp đồng mua bán, thuê nhà, học nghề.</span>\n  </div>\n\n  <h3 class=\"sub\">2.4 Formfreiheit &amp; Formzwang <i>— Tự do hình thức &amp; Bắt buộc hình thức</i></h3>\n  <div class=\"block\">\n    <div class=\"de\"><b>Formfreiheit</b> Rechtsgeschäfte können in <b>jeder Form</b> geschlossen werden — mündlich, telefonisch, schriftlich, per E-Mail, schlüssig, ausnahmsweise durch Schweigen.</div>\n    <div class=\"vi\"><b>Tự do hình thức</b> Giao dịch có thể được thực hiện dưới bất kỳ hình thức nào.</div>\n  </div>\n\n  <div class=\"de\">Formzwang dient der <b>Beweissicherung</b>, dem <b>Schutz vor voreiligen Verpflichtungen</b> und der <b>genauen Abgrenzung</b> zwischen Verhandlung und Bindung.</div>\n  <div class=\"vi\">Bắt buộc hình thức nhằm đảm bảo chứng cứ, bảo vệ khỏi cam kết vội vàng, và phân định rõ ràng giữa đàm phán và cam kết ràng buộc.</div>\n\n  <table style=\"margin-top:18px;\">\n    <tbody><tr><th>Form<span style=\"display:block;font-weight:400;font-size:.7rem;\">Hình thức</span></th><th>Anforderung<span style=\"display:block;font-weight:400;font-size:.7rem;\">Yêu cầu</span></th><th>Beispiel<span style=\"display:block;font-weight:400;font-size:.7rem;\">Ví dụ</span></th></tr>\n    <tr>\n      <td><b>Schriftform</b><br><span class=\"para-code\">§126</span></td>\n      <td>Handschriftliche Unterschrift aller Beteiligten.</td>\n      <td>Kündigung, Testament, Verbraucherdarlehen<div class=\"vi-cell\">Đơn nghỉ việc, di chúc, tín dụng tiêu dùng</div></td>\n    </tr>\n    <tr>\n      <td><b>Elektronische Form</b><br><span class=\"para-code\">§126a</span></td>\n      <td>Qualifizierte elektronische Signatur.</td>\n      <td>Online-Banking, Pay-TV<div class=\"vi-cell\">Ngân hàng trực tuyến, truyền hình trả phí</div></td>\n    </tr>\n    <tr>\n      <td><b>Textform</b><br><span class=\"para-code\">§126b</span></td>\n      <td>Lesbare Erklärung, keine Unterschrift nötig.</td>\n      <td>Widerrufsbelehrung, Garantieerklärung<div class=\"vi-cell\">Hướng dẫn hủy hợp đồng, giấy bảo hành</div></td>\n    </tr>\n    <tr>\n      <td><b>Öffentliche Beglaubigung</b><br><span class=\"para-code\">§129</span></td>\n      <td>Notar bestätigt die Echtheit der Unterschrift.</td>\n      <td>Eintrag ins Handelsregister<div class=\"vi-cell\">Đăng ký vào sổ đăng ký thương mại</div></td>\n    </tr>\n    <tr>\n      <td><b>Notarielle Beurkundung</b><br><span class=\"para-code\">§128</span></td>\n      <td>Notar bestätigt Unterschrift und Inhalt.</td>\n      <td>Ehevertrag, Grundstückskauf<div class=\"vi-cell\">Hợp đồng hôn nhân, mua bán đất đai</div></td>\n    </tr>\n  </tbody></table>\n\n  <div class=\"note\"><b>Besonderheit · Lưu ý đặc biệt</b> \n    <span class=\"de\">Ein privates Testament muss <b>vollständig handschriftlich</b> verfasst und unterschrieben sein — getippt und nur unterschrieben ist formwidrig und <b>nichtig</b>.</span><br>\n    <span class=\"vi\" style=\"border:none; padding:0;\">Di chúc riêng phải viết tay hoàn toàn và ký tên — nếu đánh máy dù có ký tay vẫn vi phạm hình thức và vô hiệu.</span>\n  </div>\n  <div class=\"note\"><b>Rechtsfolge · Hậu quả pháp lý</b> \n    <span class=\"de\">Verstoß gegen Formzwang → das Rechtsgeschäft ist <b>nichtig</b>. <span class=\"para-code\">§125 BGB</span></span><br>\n    <span class=\"vi\" style=\"border:none; padding:0;\">Vi phạm hình thức bắt buộc → giao dịch vô hiệu.</span>\n  </div>\n\n  <h3 class=\"sub\">2.5 Anfechtbare Rechtsgeschäfte <i>— Giao dịch có thể bị hủy bỏ</i></h3>\n  <div class=\"block\">\n    <div class=\"de\"><b>Definition</b> Die <b>Anfechtung</b> ist eine Willenserklärung, die ein Rechtsgeschäft rückwirkend unwirksam macht. Bis zur Anfechtung ist das Geschäft voll rechtswirksam; danach ist es von Anfang an nichtig.</div>\n    <div class=\"vi\"><b>Übersetzung</b> Là tuyên bố ý chí làm cho một giao dịch vô hiệu hồi tố. Trước khi bị hủy, giao dịch vẫn có hiệu lực đầy đủ; sau khi hủy, vô hiệu từ đầu.</div>\n  </div>\n\n  <ol>\n    <li class=\"de\"><b>Irrtum</b> — Erklärungsirrtum oder falsche Übermittlung.\n      <div class=\"vi\" style=\"border:none; padding:4px 0 0 0; margin:0;\">Nhầm lẫn — sai sót khi tuyên bố hoặc truyền đạt sai.</div>\n      <div class=\"example\"><b>Beispiel · Ví dụ</b> <span class=\"de\">Ein Handwerker verschreibt sich beim Preis: 840 € statt 740 €.</span><br><span class=\"vi\" style=\"border:none; padding:0;\">Thợ thủ công viết nhầm giá 740€ thay vì 840€.</span></div>\n    </li>\n    <li class=\"de\" style=\"margin-top:14px;\"><b>Arglistige Täuschung</b> — Vorspiegeln falscher oder Unterdrücken wahrer Tatsachen.\n      <div class=\"vi\" style=\"border:none; padding:4px 0 0 0; margin:0;\">Lừa dối cố ý — đưa thông tin sai hoặc che giấu sự thật.</div>\n      <div class=\"example\"><b>Beispiel · Ví dụ</b> <span class=\"de\">Ein Verkäufer bezeichnet Parkett \"2. Wahl\" als \"1. Wahl\".</span><br><span class=\"vi\" style=\"border:none; padding:0;\">Người bán gọi sàn gỗ \"hạng 2\" là \"hạng 1\".</span></div>\n    </li>\n    <li class=\"de\" style=\"margin-top:14px;\"><b>Widerrechtliche Drohung</b> — Androhung eines Übels bei Weigerung.\n      <div class=\"vi\" style=\"border:none; padding:4px 0 0 0; margin:0;\">Đe dọa trái pháp luật — đe dọa gây hại nếu từ chối.</div>\n    </li>\n  </ol>\n\n  <div class=\"note\"><b>Nicht anfechtbar · Không thể hủy</b> \n    <span class=\"de\"><b>Motivirrtum</b> — Irrtum über Beweggründe oder das erwartete Ergebnis.</span><br>\n    <span class=\"vi\" style=\"border:none; padding:0;\">Nhầm lẫn về động cơ hoặc kết quả mong muốn không xảy ra — VD: Karl tặng nhẫn cho Karin, Karin không thích, Karl không thể hủy hợp đồng mua bán vì lý do này.</span>\n  </div>\n\n  <h3 class=\"sub\">2.6 Nichtige Rechtsgeschäfte <i>— Giao dịch vô hiệu ngay từ đầu</i></h3>\n  <div class=\"de\">Rechtsgeschäfte, die von Anfang an unwirksam sind — ohne dass eine Anfechtung nötig ist.</div>\n  <div class=\"vi\">Giao dịch vô hiệu tuyệt đối ngay từ đầu, không cần ai tuyên bố hủy.</div>\n\n  <table>\n    <tbody><tr><th>Mangel<span style=\"display:block;font-weight:400;font-size:.7rem;\">Khiếm khuyết</span></th><th>Beispiel<span style=\"display:block;font-weight:400;font-size:.7rem;\">Ví dụ</span></th></tr>\n    <tr><td><b>Mangel der Geschäftsfähigkeit</b><br><span class=\"para-code\">§105</span></td><td>Geschäft eines Geschäftsunfähigen<div class=\"vi-cell\">Giao dịch của người mất năng lực hành vi</div></td></tr>\n    <tr><td><b>Schein-/Scherzgeschäft</b><br><span class=\"para-code\">§117, §118</span></td><td>Kaufpreis im Vertrag falsch angegeben (Steuerhinterziehung); \"Verkauf\" eines Autos für 9,99 € im Spaß<div class=\"vi-cell\">Ghi sai giá để trốn thuế; \"bán\" xe giá 9,99€ trong lúc đùa</div></td></tr>\n    <tr><td><b>Verstoß gegen gesetzliches Verbot</b><br><span class=\"para-code\">§134</span></td><td>Drogen-, Waffenhandel<div class=\"vi-cell\">Buôn ma túy, vũ khí</div></td></tr>\n    <tr><td><b>Verstoß gegen Formvorschrift</b><br><span class=\"para-code\">§125</span></td><td>Mündlicher Verbraucherkredit; Grundstückskauf ohne Notar<div class=\"vi-cell\">Tín dụng tiêu dùng chỉ thỏa thuận miệng; mua đất không qua công chứng</div></td></tr>\n    <tr><td><b>Sittenwidrigkeit</b><br><span class=\"para-code\">§138</span></td><td>Kredit mit 45–50 % Zinsen<div class=\"vi-cell\">Vay với lãi suất 45-50%</div></td></tr>\n  </tbody></table>\n\n  <table>\n    <tbody><tr><th></th><th>Anfechtbar</th><th>Nichtig</th></tr>\n    <tr><td>Anfängliche Wirkung<div class=\"vi-cell\">Hiệu lực ban đầu</div></td><td>Voll gültig bis zur Anfechtung</td><td>Von Anfang an unwirksam</td></tr>\n    <tr><td>Nach Entdeckung<div class=\"vi-cell\">Sau khi phát hiện</div></td><td>Anfechtung nötig (rückwirkend)</td><td>Automatisch nichtig</td></tr>\n    <tr><td>Ursache<div class=\"vi-cell\">Nguyên nhân</div></td><td>Irrtum, Täuschung, Drohung</td><td>Geschäftsunfähigkeit, Schein-/Scherzgeschäft, Formmangel, Sittenwidrigkeit</td></tr>\n  </tbody></table>"
        },
        {
          "id": "wiko-rg-p3",
          "icon": "",
          "name": "Rechtsgeschäfte · Eigentum & Besitz",
          "desc": "Quyền sở hữu & Quyền chiếm hữu",
          "content": "<h2>Rechtsgeschäfte · Eigentum & Besitz</h2>\n<div class=\"hint\">Gesetzbuch zum Lernen (DE–VI) · BGB</div>\n<div class=\"grid2\">\n    <div class=\"block\" style=\"margin:0;\">\n      <div class=\"de\" style=\"border-radius:6px;\"><b>Besitz</b> <span class=\"para-code\">§854</span><br>Tatsächliche Gewalt über eine Sache.</div>\n      <div class=\"vi\">Nắm giữ thực tế và được phép sử dụng đồ vật.</div>\n    </div>\n    <div class=\"block\" style=\"margin:0;\">\n      <div class=\"de\" style=\"border-radius:6px;\"><b>Eigentum</b><br>Rechtliche Verfügungsgewalt einer Person über Sachen.</div>\n      <div class=\"vi\">Quyền định đoạt hợp pháp — được phép bán, thay đổi đồ vật.</div>\n    </div>\n  </div>\n\n  <div class=\"de\" style=\"margin-top:16px;\">Besitz und Eigentum können <b>auseinanderfallen</b>.</div>\n  <div class=\"vi\">Chiếm hữu và sở hữu có thể tách rời nhau.</div>\n\n  <div class=\"example\"><b>Beispiel · Ví dụ</b> \n    <span class=\"de\">Herr Fuchs vermietet das Haus an Herrn Vogel → <b>Vogel = Besitzer</b>, <b>Fuchs = Eigentümer</b>.</span><br>\n    <span class=\"vi\" style=\"border:none; padding:4px 0 0 0;\">Ông Fuchs cho ông Vogel thuê nhà → Vogel là người chiếm hữu (sử dụng thực tế), Fuchs là chủ sở hữu hợp pháp.</span>\n  </div>\n\n  <h3 class=\"sub\">3.1 Eigentumsübergang <i>— Chuyển giao quyền sở hữu</i></h3>\n  <div class=\"grid2\">\n    <div class=\"block\" style=\"margin:0;\">\n      <div class=\"de\" style=\"border-radius:6px;\"><b>Bewegliche Sachen</b><br>Durch <b>Einigung</b> + <b>Übergabe</b>. <span class=\"para-code\">§929</span></div>\n      <div class=\"vi\">Động sản: qua thỏa thuận + giao đồ vật.</div>\n    </div>\n    <div class=\"block\" style=\"margin:0;\">\n      <div class=\"de\" style=\"border-radius:6px;\"><b>Unbewegliche Sachen</b><br>Durch <b>Auflassung</b> (Notar) + <b>Eintragung ins Grundbuch</b>.</div>\n      <div class=\"vi\">Bất động sản: qua thỏa thuận trước công chứng + đăng ký vào sổ địa chính.</div>\n    </div>\n  </div>\n\n  <table style=\"margin-top:18px;\">\n    <tbody><tr><th>Situation<span style=\"display:block;font-weight:400;font-size:.7rem;\">Tình huống</span></th><th>Übergang durch<span style=\"display:block;font-weight:400;font-size:.7rem;\">Chuyển giao qua</span></th></tr>\n    <tr><td>Sache beim Verkäufer<div class=\"vi-cell\">Hàng ở chỗ người bán</div></td><td>Einigung + Übergabe</td></tr>\n    <tr><td>Sache schon beim Käufer<div class=\"vi-cell\">Hàng đã ở chỗ người mua</div></td><td>Nur Einigung</td></tr>\n    <tr><td>Käufer wird Eigentümer, Verkäufer bleibt im Besitz (Besitzkonstitut)<div class=\"vi-cell\">Người bán vẫn giữ đồ</div></td><td>Einigung + Besitzmittlungsverhältnis</td></tr>\n    <tr><td>Sache bei einem Dritten<div class=\"vi-cell\">Đồ ở nơi bên thứ ba</div></td><td>Einigung + Abtretung des Herausgabeanspruchs</td></tr>\n  </tbody></table>\n\n  <h3 class=\"sub\">3.2 Eigentumsvorbehalt <i>— Bảo lưu quyền sở hữu</i></h3>\n  <div class=\"de\">Der Käufer wird sofort <b>Besitzer</b>, der Verkäufer bleibt bis zur vollständigen Zahlung <b>Eigentümer</b>.</div>\n  <div class=\"vi\">Người mua nhận đồ ngay (trở thành người chiếm hữu), nhưng người bán vẫn là chủ sở hữu cho đến khi được thanh toán đầy đủ.</div>\n\n  <div class=\"de\" style=\"margin-top:14px;\">Der Eigentumsvorbehalt erlischt bei: vollständiger Zahlung, Verarbeitung der Ware, Rücktritt vom Vertrag, oder Weitergabe an einen gutgläubigen Dritten.</div>\n  <div class=\"vi\">Bảo lưu quyền sở hữu hết hiệu lực khi: thanh toán đủ, hàng bị chế biến, hủy hợp đồng, hoặc chuyển cho bên thứ ba ngay tình.</div>\n\n  <h3 class=\"sub\">3.3 Gutgläubiger Erwerb <i>— Mua bán ngay tình (thiện chí)</i></h3>\n  <div class=\"block\">\n    <div class=\"de\"><b>§932 BGB</b> Konnte der Erwerber nicht wissen, dass die Sache nicht im Eigentum des Veräußerers stand, wird er trotzdem Eigentümer.</div>\n    <div class=\"vi\"><b>Übersetzung</b> Nếu người mua không thể biết rằng người bán không phải chủ sở hữu thực sự, người mua vẫn trở thành chủ sở hữu hợp pháp.</div>\n  </div>\n  <div class=\"note\"><b>Ausnahme · Ngoại lệ</b> \n    <span class=\"de\">Gilt <b>nicht</b> bei gestohlenen, verlorenen oder abhandengekommenen Sachen. <span class=\"para-code\">§935</span></span><br>\n    <span class=\"vi\" style=\"border:none; padding:0;\">Không áp dụng đối với đồ bị trộm cắp, thất lạc hoặc bị mất ngoài ý muốn — dù người mua có ngay tình đến đâu.</span>\n  </div>"
        },
        {
          "id": "wiko-rg-bt1",
          "icon": "",
          "name": "Rechtsgeschäfte · Übung — Geschäftsfähigkeit",
          "desc": "Bài tập — Năng lực hành vi",
          "content": "<h2>Rechtsgeschäfte · Übung — Geschäftsfähigkeit</h2>\n<div class=\"hint\">Gesetzbuch zum Lernen (DE–VI) · BGB</div>\n<details class=\"q\"><summary><b>01</b> Unterscheiden Sie zwischen Rechtsfähigkeit und Geschäftsfähigkeit.</summary>\n    <div class=\"ans\">\n      <div class=\"de\"><b>Antwort</b> <b>Rechtsfähigkeit</b> = die Fähigkeit, Träger von Rechten und Pflichten zu sein (alle Menschen, von Geburt bis Tod). <b>Geschäftsfähigkeit</b> = die Fähigkeit, selbstständig und rechtswirksam Rechtsgeschäfte zu tätigen (abhängig von Alter/Geisteszustand).</div>\n      <div class=\"vi\"><b>Đáp án</b> <b>Năng lực pháp luật</b> = khả năng trở thành chủ thể quyền và nghĩa vụ (mọi người, từ sinh ra đến chết). <b>Năng lực hành vi</b> = khả năng tự mình thực hiện giao dịch pháp lý có hiệu lực (phụ thuộc tuổi/tình trạng tâm thần).</div>\n    </div>\n  </details>\n\n  <details class=\"q\"><summary><b>02</b> Ordnen Sie zu: a) 20 Jahre  b) 6 Jahre  c) 16 Jahre</summary>\n    <div class=\"ans\">\n      <div class=\"de\"><b>Antwort</b> a) 20 Jahre → <b>unbeschränkt geschäftsfähig</b>. b) 6 Jahre → <b>geschäftsunfähig</b>. c) 16 Jahre → <b>beschränkt geschäftsfähig</b>.</div>\n      <div class=\"vi\"><b>Đáp án</b> a) 20 tuổi → năng lực đầy đủ. b) 6 tuổi → mất năng lực hành vi. c) 16 tuổi → năng lực hạn chế.</div>\n    </div>\n  </details>\n\n  <details class=\"q\"><summary><b>03</b> Welche Geschäfte darf ein Beschränkt-Geschäftsfähiger ohne Zustimmung tätigen? Nennen Sie Beispiele.</summary>\n    <div class=\"ans\">\n      <div class=\"de\"><b>Antwort</b> \n        1) Geschäfte mit <b>lediglich rechtlichem Vorteil</b> <span class=\"para-code\">§107</span> — z. B. ein Geschenk annehmen.<br>\n        2) Geschäfte mit <b>eigenen Mitteln (Taschengeld)</b> <span class=\"para-code\">§110</span> — z. B. ein Buch für 20 € kaufen (nicht bei Ratenkäufen).<br>\n        3) Geschäfte im Rahmen eines <b>zugestimmten Arbeitsverhältnisses</b> <span class=\"para-code\">§113</span>.\n      </div>\n      <div class=\"vi\"><b>Đáp án</b> 1) Giao dịch chỉ mang lợi ích pháp lý thuần túy (§107) — VD: nhận quà tặng. 2) Giao dịch dùng tiền riêng/tiền tiêu vặt (§110) — VD: mua sách 20€ (không áp dụng mua trả góp). 3) Giao dịch trong quan hệ lao động đã được đồng ý (§113).</div>\n    </div>\n  </details>\n\n  <details class=\"q\"><summary><b>04</b> Welche Rechtsfolge hat eine Willenserklärung je nach Stufe der Geschäftsfähigkeit?</summary>\n    <div class=\"ans\">\n      <div class=\"de\"><b>Antwort</b> Geschäftsunfähig → <b>nichtig</b>. Beschränkt geschäftsfähig → <b>schwebend unwirksam</b>. Voll geschäftsfähig → <b>voll wirksam</b>.</div>\n      <div class=\"vi\"><b>Đáp án</b> Mất năng lực hành vi → vô hiệu. Năng lực hạn chế → \"treo\" chờ phê duyệt. Năng lực đầy đủ → có hiệu lực đầy đủ.</div>\n    </div>\n  </details>\n\n  <details class=\"q\"><summary><b>05a</b> Anna (6 Jahre) nimmt 10 € aus ihrem Sparschwein und kauft eine Puppe. Ist der Kaufvertrag gültig?</summary>\n    <div class=\"ans\">\n      <div class=\"de\"><b>Antwort</b> <b>Nein — nichtig.</b> Anna ist unter 7 Jahren, also geschäftsunfähig <span class=\"para-code\">§104</span>; ihre Willenserklärungen sind unwirksam <span class=\"para-code\">§105 BGB</span>.</div>\n      <div class=\"vi\"><b>Đáp án</b> <b>Không hợp lệ — vô hiệu.</b> Anna dưới 7 tuổi nên mất năng lực hành vi, mọi tuyên bố ý chí của cô bé đều vô hiệu.</div>\n    </div>\n  </details>\n\n  <details class=\"q\"><summary><b>05b</b> Martina (16) kauft einen MP3-Player für 45 € von ihrem Taschengeld. (1) Ist der Vertrag gültig? (2) Was, wenn sie in Raten zahlt?</summary>\n    <div class=\"ans\">\n      <div class=\"de\"><b>Antwort</b> (1) <b>Ja, gültig</b> — Taschengeldparagraph <span class=\"para-code\">§110</span>, da sofort mit eigenem Geld bezahlt.<br>(2) <b>Nein</b> — §110 gilt nicht für Ratenkäufe. Der Vertrag ist <b>schwebend unwirksam</b> <span class=\"para-code\">§106</span> und braucht die Zustimmung der Eltern.</div>\n      <div class=\"vi\"><b>Đáp án</b> (1) Hợp lệ — áp dụng điều khoản tiền tiêu vặt, vì trả ngay bằng tiền riêng. (2) Không hợp lệ — §110 không áp dụng cho mua trả góp. Hợp đồng ở trạng thái \"treo\", cần cha mẹ đồng ý.</div>\n    </div>\n  </details>\n\n  <details class=\"q\"><summary><b>05c</b> Anton (17) kauft einen Computer für 750 €, ohne dass die Eltern es wissen. Welche Rechtswirkung hat der Vertrag?</summary>\n    <div class=\"ans\">\n      <div class=\"de\"><b>Antwort</b> <b>Schwebend unwirksam</b> <span class=\"para-code\">§106, §108 BGB</span> — abhängig von der Genehmigung der Eltern.</div>\n      <div class=\"vi\"><b>Đáp án</b> Ở trạng thái \"treo\" — phụ thuộc vào việc cha mẹ có phê chuẩn hay không.</div>\n    </div>\n  </details>\n\n  <details class=\"q\"><summary><b>05d</b> Kurt (14) kauft eine Musikanlage stark reduziert (250 € statt 780 €) und meint, wegen des großen Rabatts brauche er keine Zustimmung. Stimmt das?</summary>\n    <div class=\"ans\">\n      <div class=\"de\"><b>Antwort</b> <b>Nein.</b> Trotz des niedrigen Preises bleibt es eine Zahlungsverpflichtung, kein rechtlicher Vorteil. Der Vertrag ist <b>schwebend unwirksam</b> — keine Ausnahme (§107, §110) greift hier.</div>\n      <div class=\"vi\"><b>Đáp án</b> <b>Không đúng.</b> Dù giá rẻ, đây vẫn là nghĩa vụ thanh toán, không phải lợi ích pháp lý thuần túy. Hợp đồng \"treo\" — không có ngoại lệ nào áp dụng.</div>\n    </div>\n  </details>"
        },
        {
          "id": "wiko-rg-bt2",
          "icon": "",
          "name": "Rechtsgeschäfte · Übung — Willenserklärung & Rechtsgeschäfte",
          "desc": "Bài tập — Tuyên bố ý chí & Giao dịch một/nhiều bên",
          "content": "<h2>Rechtsgeschäfte · Übung — Willenserklärung & Rechtsgeschäfte</h2>\n<div class=\"hint\">Gesetzbuch zum Lernen (DE–VI) · BGB</div>\n<h4 style=\"font-family:&#39;IBM Plex Sans&#39;,sans-serif; color:var(--ink); margin-top:24px; font-size:1rem;\">Nr. 1 — Liegt eine Willenserklärung vor? In welcher Form?</h4>\n\n  <details class=\"q\"><summary><b>a</b> Sie werden von Ihrem Onkel zu einer Reise eingeladen.</summary>\n    <div class=\"ans\">\n      <div class=\"de\"><b>Antwort</b> <b>Nein</b> — eine Gefälligkeit ohne Rechtsbindungswillen.</div>\n      <div class=\"vi\"><b>Đáp án</b> Không phải — đây là lời mời mang tính thiện chí, không có ý định tạo ràng buộc pháp lý.</div>\n    </div>\n  </details>\n\n  <details class=\"q\"><summary><b>b</b> Sie steigen mit gültigem Fahrschein in die Straßenbahn in Stuttgart ein.</summary>\n    <div class=\"ans\">\n      <div class=\"de\"><b>Antwort</b> <b>Ja</b> — durch <b>schlüssiges Handeln</b> (Einsteigen = Annahme des Beförderungsvertrags). Form: formfrei.</div>\n      <div class=\"vi\"><b>Đáp án</b> Có — qua hành vi ngụ ý (lên tàu = chấp nhận hợp đồng vận chuyển). Hình thức: tự do.</div>\n    </div>\n  </details>\n\n  <details class=\"q\"><summary><b>c</b> Sie winken ein Taxi heran, steigen ein und nennen Ihre Adresse.</summary>\n    <div class=\"ans\">\n      <div class=\"de\"><b>Antwort</b> <b>Ja</b> — schlüssiges Handeln (Winken) kombiniert mit unmittelbarer (mündlicher) Handlung (Adresse nennen).</div>\n      <div class=\"vi\"><b>Đáp án</b> Có — hành vi ngụ ý (giơ tay) kết hợp với hành động trực tiếp (nói địa chỉ).</div>\n    </div>\n  </details>\n\n  <details class=\"q\"><summary><b>d</b> Sie nehmen Waren im Selbstbedienungsladen und legen sie aufs Kassenband.</summary>\n    <div class=\"ans\">\n      <div class=\"de\"><b>Antwort</b> <b>Ja</b> — schlüssiges Handeln.</div>\n      <div class=\"vi\"><b>Đáp án</b> Có — qua hành vi ngụ ý (không cần lời nói).</div>\n    </div>\n  </details>\n\n  <h4 style=\"font-family:&#39;IBM Plex Sans&#39;,sans-serif; color:var(--ink); margin-top:24px; font-size:1rem;\">Nr. 2 — Einseitig oder mehrseitig? Welche Form?</h4>\n\n  <details class=\"q\"><summary><b>a</b> Der Vermieter schließt mit Ihren Eltern einen Mietvertrag.</summary>\n    <div class=\"ans\">\n      <div class=\"de\"><b>Antwort</b> <b>Zweiseitig</b> — Mietvertrag, meist in <b>Schriftform</b> (grundsätzlich formfrei, aber üblich).</div>\n      <div class=\"vi\"><b>Đáp án</b> Nhiều bên — hợp đồng thuê nhà, thường bằng văn bản (về nguyên tắc tự do, nhưng thực tế phổ biến dùng văn bản).</div>\n    </div>\n  </details>\n\n  <details class=\"q\"><summary><b>b</b> Nele Kaiser bestellt eine DVD bei amazon.de.</summary>\n    <div class=\"ans\">\n      <div class=\"de\"><b>Antwort</b> <b>Zweiseitig</b> — Kaufvertrag, elektronische Form.</div>\n      <div class=\"vi\"><b>Đáp án</b> Nhiều bên — hợp đồng mua bán, hình thức điện tử.</div>\n    </div>\n  </details>\n\n  <details class=\"q\"><summary><b>c</b> Max Lehmann kündigt sein Arbeitsverhältnis.</summary>\n    <div class=\"ans\">\n      <div class=\"de\"><b>Antwort</b> <b>Einseitig</b> (empfangsbedürftig) — Kündigung, zwingend <b>Schriftform</b> <span class=\"para-code\">§623 BGB</span>.</div>\n      <div class=\"vi\"><b>Đáp án</b> Đơn phương (cần người nhận) — bắt buộc bằng văn bản.</div>\n    </div>\n  </details>\n\n  <details class=\"q\"><summary><b>d</b> Alexander Thein verliert seinen wertvollen Ring und lobt öffentlich 150 € für den Finder aus (Auslobung).</summary>\n    <div class=\"ans\">\n      <div class=\"de\"><b>Antwort</b> <b>Einseitig</b> (nicht empfangsbedürftig) — wirksam sofort bei Bekanntmachung, formfrei.</div>\n      <div class=\"vi\"><b>Đáp án</b> Đơn phương (không cần người nhận) — có hiệu lực ngay khi công bố, hình thức tự do.</div>\n    </div>\n  </details>\n\n  <details class=\"q\"><summary><b>e</b> Ein Unternehmen nimmt eine ohne Bestellung gelieferte Maschine in Betrieb.</summary>\n    <div class=\"ans\">\n      <div class=\"de\"><b>Antwort</b> <b>Zweiseitig</b> — Kaufvertrag entsteht durch <b>Schweigen</b> (Ausnahme: Nutzung gilt als Annahme).</div>\n      <div class=\"vi\"><b>Đáp án</b> Nhiều bên — hợp đồng mua bán hình thành qua im lặng (trường hợp ngoại lệ: việc sử dụng được xem là chấp nhận).</div>\n    </div>\n  </details>"
        },
        {
          "id": "wiko-rg-bt3",
          "icon": "",
          "name": "Rechtsgeschäfte · Übung — Form der Rechtsgeschäfte",
          "desc": "Bài tập — Hình thức của giao dịch pháp lý",
          "content": "<h2>Rechtsgeschäfte · Übung — Form der Rechtsgeschäfte</h2>\n<div class=\"hint\">Gesetzbuch zum Lernen (DE–VI) · BGB</div>\n<details class=\"q\"><summary><b>01</b> Ordnen Sie den drei Formgruppen (Schriftform / Öffentliche Beglaubigung / Notarielle Beurkundung) passende Beispiele zu.</summary>\n    <div class=\"ans\">\n      <table>\n        <tbody><tr><th>Gruppe<span style=\"display:block;font-weight:400;font-size:.7rem;\">Nhóm</span></th><th>Beispiel<span style=\"display:block;font-weight:400;font-size:.7rem;\">Ví dụ</span></th></tr>\n        <tr><td><b>Schriftform</b></td><td>Kündigung von Arbeitsverträgen, Ratenkaufvertrag<div class=\"vi-cell\">Đơn nghỉ việc, hợp đồng mua trả góp</div></td></tr>\n        <tr><td><b>Öffentliche Beglaubigung</b></td><td>Anträge auf Eintrag ins Handelsregister<div class=\"vi-cell\">Đăng ký vào sổ đăng ký thương mại</div></td></tr>\n        <tr><td><b>Notarielle Beurkundung</b></td><td>Grundstückskauf, Eheverträge, Ausschlagung einer Erbschaft<div class=\"vi-cell\">Mua bán đất, hợp đồng hôn nhân, từ chối di sản</div></td></tr>\n      </tbody></table>\n      <div class=\"note\"><b>Rechtsfolge · Hậu quả</b> <span class=\"de\">Formverstoß → das Geschäft ist <b>eventuell nichtig</b>.</span><br><span class=\"vi\" style=\"border:none; padding:0;\">Vi phạm hình thức → giao dịch có thể vô hiệu.</span></div>\n    </div>\n  </details>\n\n  <details class=\"q\"><summary><b>02</b> Welche Form ist für die folgenden Geschäfte vorgeschrieben?</summary>\n    <div class=\"ans\">\n      <table>\n        <tbody><tr><th>Geschäft<span style=\"display:block;font-weight:400;font-size:.7rem;\">Giao dịch</span></th><th>Form<span style=\"display:block;font-weight:400;font-size:.7rem;\">Hình thức</span></th></tr>\n        <tr><td>Frau Putzig kauft eine Spülmaschine auf Raten<div class=\"vi-cell\">Mua máy rửa bát trả góp</div></td><td>Schriftform</td></tr>\n        <tr><td>Karl Protz zahlt sein Motorrad in bar<div class=\"vi-cell\">Trả tiền mặt mua xe máy</div></td><td>Formfrei</td></tr>\n        <tr><td>Bauer Kohl verkauft ein Grundstück an den Nachbarn<div class=\"vi-cell\">Bán đất cho hàng xóm</div></td><td>Notarielle Beurkundung</td></tr>\n        <tr><td>Ein Verein trägt sich ins Vereinsregister ein<div class=\"vi-cell\">Đăng ký vào sổ hội</div></td><td>Schriftform + Öffentliche Beglaubigung</td></tr>\n        <tr><td>Martin Stift unterschreibt einen Ausbildungsvertrag<div class=\"vi-cell\">Ký hợp đồng học nghề</div></td><td>Schriftform</td></tr>\n        <tr><td>Herr Burger verbürgt sich für den Kredit seiner Tochter<div class=\"vi-cell\">Bảo lãnh khoản vay cho con gái</div></td><td>Schriftform</td></tr>\n        <tr><td>Frau Schenker verspricht ihrem Enkel 10.000 € zum 18. Geburtstag<div class=\"vi-cell\">Hứa tặng cháu 10.000€ khi 18 tuổi</div></td><td>Notarielle Beurkundung <span class=\"para-code\">§518</span></td></tr>\n      </tbody></table>\n    </div>\n  </details>"
        },
        {
          "id": "wiko-rg-bt4",
          "icon": "",
          "name": "Rechtsgeschäfte · Übung — Anfechtbare & Nichtige Rechtsgeschäfte",
          "desc": "Bài tập — Giao dịch có thể hủy & giao dịch vô hiệu",
          "content": "<h2>Rechtsgeschäfte · Übung — Anfechtbare & Nichtige Rechtsgeschäfte</h2>\n<div class=\"hint\">Gesetzbuch zum Lernen (DE–VI) · BGB</div>\n<h4 style=\"font-family:&#39;IBM Plex Sans&#39;,sans-serif; color:var(--ink); margin-top:24px; font-size:1rem;\">Nr. 1 — Welche Fälle sind Nichtigkeit?</h4>\n  <details class=\"q\"><summary><b>a-e</b> a) Formverstoß  b) Verkauf von selbst angebautem Cannabis  c) Erklärungsirrtum  d) Arglistige Täuschung  e) Widerrechtliche Drohung</summary>\n    <div class=\"ans\">\n      <div class=\"de\"><b>Antwort</b> a) <b>nichtig</b> <span class=\"para-code\">§125</span>  b) <b>nichtig</b> <span class=\"para-code\">§134</span>  c) <b>anfechtbar</b>  d) <b>anfechtbar</b>  e) <b>anfechtbar</b></div>\n      <div class=\"vi\"><b>Đáp án</b> a) vô hiệu (§125)  b) vô hiệu (§134, vi phạm luật cấm)  c) có thể hủy  d) có thể hủy  e) có thể hủy</div>\n    </div>\n  </details>\n\n  <h4 style=\"font-family:&#39;IBM Plex Sans&#39;,sans-serif; color:var(--ink); margin-top:24px; font-size:1rem;\">Nr. 2 — Ist der Kaufvertrag anfechtbar?</h4>\n  <details class=\"q\"><summary><b>a-e</b> a) Verspätete Lieferung  b) Preiserhöhung  c) Preis versehentlich 150 € statt 510 €  d) Verkäufer ahnt finanzielle Schwierigkeiten des Käufers  e) Nur mündliche Vereinbarung</summary>\n    <div class=\"ans\">\n      <div class=\"de\"><b>Antwort</b> \n        a) <b>Nicht anfechtbar</b> (kein Anfechtungsgrund)<br>\n        b) <b>Nicht anfechtbar</b><br>\n        c) <b>Anfechtbar</b> — Irrtum in der Erklärungshandlung<br>\n        d) <b>Nicht anfechtbar</b> (kein Willensmangel)<br>\n        e) <b>Nicht anfechtbar</b> (Formfrage, kein Anfechtungsgrund)\n      </div>\n      <div class=\"vi\"><b>Đáp án</b> \n        a) Không thể hủy (giao hàng trễ không phải lý do hủy)<br>\n        b) Không thể hủy<br>\n        c) Có thể hủy — nhầm lẫn khi ghi giá<br>\n        d) Không thể hủy (không liên quan khiếm khuyết ý chí)<br>\n        e) Không thể hủy (là vấn đề hình thức, không phải lý do hủy)\n      </div>\n    </div>\n  </details>\n\n  <h4 style=\"font-family:&#39;IBM Plex Sans&#39;,sans-serif; color:var(--ink); margin-top:24px; font-size:1rem;\">Nr. 3 — Voll gültig / nichtig / anfechtbar / schwebend unwirksam?</h4>\n  <details class=\"q\"><summary><b>a</b> Zahlendreher: 58 € statt 85 €.</summary>\n    <div class=\"ans\"><div class=\"de\"><b>Antwort</b> <b>Anfechtbar</b> — Erklärungsirrtum.</div><div class=\"vi\"><b>Đáp án</b> Có thể hủy — nhầm lẫn khi viết số.</div></div>\n  </details>\n  <details class=\"q\"><summary><b>b</b> Rebecca (16) abonniert eine Zeitschrift für 18,50 €/Monat.</summary>\n    <div class=\"ans\"><div class=\"de\"><b>Antwort</b> <b>Schwebend unwirksam</b> — Rebecca ist beschränkt geschäftsfähig; ein Dauerabonnement fällt nicht unter §110, da es keine einmalige Sofortzahlung mit eigenen Mitteln ist.</div><div class=\"vi\"><b>Đáp án</b> \"Treo\" chờ phê duyệt — Rebecca 16 tuổi (năng lực hạn chế), việc đăng ký thuê bao định kỳ không thuộc §110 vì không phải thanh toán một lần ngay bằng tiền riêng.</div></div>\n  </details>\n  <details class=\"q\"><summary><b>c</b> Ein Handwerker kauft auf Empfehlung eines Freundes Aktien, deren Kurs am nächsten Tag fällt.</summary>\n    <div class=\"ans\"><div class=\"de\"><b>Antwort</b> <b>Voll gültig</b> — das ist ein Motivirrtum, nicht anfechtbar.</div><div class=\"vi\"><b>Đáp án</b> Có hiệu lực đầy đủ — đây là nhầm lẫn về động cơ, không thể hủy.</div></div>\n  </details>\n  <details class=\"q\"><summary><b>d</b> Lehmann (17, Eltern haben dem Arbeitsverhältnis zugestimmt) kündigt selbstständig seine Stelle.</summary>\n    <div class=\"ans\"><div class=\"de\"><b>Antwort</b> <b>Voll gültig</b> — die Eltern haben dem Arbeitsverhältnis zugestimmt <span class=\"para-code\">§113</span>, die Kündigung liegt im Rahmen dieser Zustimmung.</div><div class=\"vi\"><b>Đáp án</b> Có hiệu lực đầy đủ — cha mẹ đã đồng ý cho tham gia quan hệ lao động, việc chấm dứt hợp đồng nằm trong phạm vi đã ủy quyền.</div></div>\n  </details>\n  <details class=\"q\"><summary><b>e</b> Eine Baufirma addiert falsch: 18,2 Mio. € statt 20 Mio. €.</summary>\n    <div class=\"ans\"><div class=\"de\"><b>Antwort</b> <b>Anfechtbar</b> — Erklärungsirrtum (Rechenfehler bei der Abgabe der Erklärung).</div><div class=\"vi\"><b>Đáp án</b> Có thể hủy — nhầm lẫn khi tuyên bố (lỗi tính toán).</div></div>\n  </details>\n\n  <h4 style=\"font-family:&#39;IBM Plex Sans&#39;,sans-serif; color:var(--ink); margin-top:24px; font-size:1rem;\">Nr. 4 — Zwölf Fälle im Überblick</h4>\n  <details class=\"q\"><summary><b>04</b> Vollständige Lösungstabelle ansehen</summary>\n    <div class=\"ans\">\n      <table>\n        <tbody><tr><th>Fall<span style=\"display:block;font-weight:400;font-size:.7rem;\">Tình huống</span></th><th>Ergebnis</th><th>Grund<span style=\"display:block;font-weight:400;font-size:.7rem;\">Lý do</span></th></tr>\n        <tr><td>Obstverkäufer bezeichnet Ware stets als \"Bioware\"<div class=\"vi-cell\">Bán hoa quả thường nói \"hàng hữu cơ\"</div></td><td>Anfechtbar</td><td>Arglistige Täuschung</td></tr>\n        <tr><td>Chef droht der Sekretärin mit Kündigung, falls sie seinen Sohn nicht heiratet<div class=\"vi-cell\">Đe dọa sa thải nếu không kết hôn với con trai chủ</div></td><td>Anfechtbar</td><td>Widerrechtliche Drohung</td></tr>\n        <tr><td>Guru verspricht 800 € bei \"richtigem Glauben\"<div class=\"vi-cell\">Hứa 800€ nếu theo đúng tín ngưỡng</div></td><td>Nichtig</td><td>Sittenwidrigkeit</td></tr>\n        <tr><td>Hans Vogel \"verkauft\" im Spaß sein Sportauto für 9,99 €<div class=\"vi-cell\">\"Bán\" xe thể thao giá 9,99€ trong lúc đùa</div></td><td>Nichtig</td><td>Scherzgeschäft</td></tr>\n        <tr><td>Kredit mit 45 % Zinsen<div class=\"vi-cell\">Vay lãi suất 45%</div></td><td>Nichtig</td><td>Sittenwidrigkeit (Wucher)</td></tr>\n        <tr><td>Handel mit 1,2 kg Drogen<div class=\"vi-cell\">Buôn 1,2kg ma túy</div></td><td>Nichtig</td><td>Verstoß gegen gesetzliches Verbot</td></tr>\n        <tr><td>40 m²-Wohnung für 2.000 € in einer Notlage vermietet<div class=\"vi-cell\">Thuê nhà 40m² giá 2.000€ khi túng quẫn</div></td><td>Nichtig</td><td>Sittenwidrigkeit</td></tr>\n        <tr><td>Getipptes Testament nur handschriftlich unterschrieben<div class=\"vi-cell\">Di chúc đánh máy, chỉ ký tay</div></td><td>Nichtig</td><td>Verstoß gegen Formvorschrift</td></tr>\n        <tr><td>Tina (6) verkauft ihren Puppenwagen für 10 €<div class=\"vi-cell\">Bé Tina 6 tuổi bán xe đẩy búp bê 10€</div></td><td>Nichtig</td><td>Mangel der Geschäftsfähigkeit</td></tr>\n        <tr><td>Rechnung über 1.000 € statt echter 30.000 € (Steuerhinterziehung)<div class=\"vi-cell\">Ghi hóa đơn 1.000€ thay vì 30.000€ thực tế để trốn thuế</div></td><td>Nichtig</td><td>Scheingeschäft</td></tr>\n        <tr><td>Halbblinder Teppichhändler verkauft echten Perserteppich als Industrieware<div class=\"vi-cell\">Người bán thảm nửa mù bán thảm Ba Tư thật nói là hàng công nghiệp</div></td><td>Anfechtbar</td><td>Irrtum in der Erklärungshandlung</td></tr>\n        <tr><td>Verkäufer nutzt Blindheit des Kunden aus, verkauft unmodischen Anzug<div class=\"vi-cell\">Lợi dụng khách mù, bán vest lỗi mốt</div></td><td>Anfechtbar</td><td>Arglistige Täuschung</td></tr>\n      </tbody></table>\n    </div>\n  </details>"
        },
        {
          "id": "wiko-rg-bt5",
          "icon": "",
          "name": "Rechtsgeschäfte · Übung — Besitz & Eigentum",
          "desc": "Bài tập — Chiếm hữu & Sở hữu",
          "content": "<h2>Rechtsgeschäfte · Übung — Besitz & Eigentum</h2>\n<div class=\"hint\">Gesetzbuch zum Lernen (DE–VI) · BGB</div>\n<details class=\"q\"><summary><b>01</b> Herr Fuchs wohnt in seinem eigenen Haus und vermietet ein geerbtes Haus an Herrn Vogel. Wer ist Besitzer, wer Eigentümer des vermieteten Hauses?</summary>\n    <div class=\"ans\"><div class=\"de\"><b>Antwort</b> <b>Besitzer = Vogel</b> (Mieter, tatsächliche Nutzung). <b>Eigentümer = Fuchs</b>.</div><div class=\"vi\"><b>Đáp án</b> Người chiếm hữu = Vogel (người thuê, sử dụng thực tế). Chủ sở hữu = Fuchs.</div></div>\n  </details>\n\n  <details class=\"q\"><summary><b>02</b> Was unterscheidet Besitz von Eigentum?</summary>\n    <div class=\"ans\"><div class=\"de\"><b>Antwort</b> <b>Besitz</b>: tatsächliche Gewalt, darf die Sache nutzen. <b>Eigentum</b>: rechtliche Verfügungsgewalt, darf die Sache verkaufen/verändern.</div><div class=\"vi\"><b>Đáp án</b> Chiếm hữu: quyền lực thực tế, được sử dụng đồ vật. Sở hữu: quyền định đoạt hợp pháp, được bán/thay đổi đồ vật.</div></div>\n  </details>\n\n  <details class=\"q\"><summary><b>03</b> Wie erfolgt der Eigentumsübergang bei beweglichen und unbeweglichen Sachen?</summary>\n    <div class=\"ans\"><div class=\"de\"><b>Antwort</b> Bewegliche Sachen: Einigung + Übergabe. Unbewegliche Sachen: Auflassung (Notar) + Eintragung ins Grundbuch.</div><div class=\"vi\"><b>Đáp án</b> Động sản: thỏa thuận + giao hàng. Bất động sản: thỏa thuận trước công chứng + đăng ký sổ địa chính.</div></div>\n  </details>\n\n  <details class=\"q\"><summary><b>04a</b> Herr Vogel bestellt einen Schrank; der Vertrag enthält einen Eigentumsvorbehalt. Was bedeutet das?</summary>\n    <div class=\"ans\"><div class=\"de\"><b>Antwort</b> Herr Vogel wird sofort <b>Besitzer</b>, das Möbelhaus bleibt <b>Eigentümer</b> bis zur vollständigen Zahlung.</div><div class=\"vi\"><b>Đáp án</b> Ông Vogel trở thành người chiếm hữu ngay, hãng nội thất vẫn là chủ sở hữu cho đến khi được thanh toán đầy đủ.</div></div>\n  </details>\n\n  <details class=\"q\"><summary><b>04b</b> Herr Vogel verkauft seinen alten Fernseher (noch unter Eigentumsvorbehalt) an Frau Wolf, die davon nichts weiß. Wird sie neue Eigentümerin?</summary>\n    <div class=\"ans\"><div class=\"de\"><b>Antwort</b> <b>Ja</b> — gutgläubiger Erwerb <span class=\"para-code\">§932 BGB</span>, da sie nichts vom Eigentumsvorbehalt wusste oder wissen musste.</div><div class=\"vi\"><b>Đáp án</b> Có — mua bán ngay tình, vì bà không biết và không có nghĩa vụ phải biết về việc bảo lưu quyền sở hữu.</div></div>\n  </details>\n\n  <details class=\"q\"><summary><b>05</b> Ein Dieb baut die Felgen von Herrn Vogels Auto aus und verkauft sie an den ahnungslosen Herrn Sorglos. Wird Herr Sorglos neuer Eigentümer?</summary>\n    <div class=\"ans\"><div class=\"de\"><b>Antwort</b> <b>Nein.</b> Die Felgen sind gestohlen (abhandengekommen), gutgläubiger Erwerb ist ausgeschlossen <span class=\"para-code\">§935 BGB</span>.</div><div class=\"vi\"><b>Đáp án</b> Không. Vì la-zăng bị đánh cắp, mua bán ngay tình không áp dụng dù người mua có ngay tình.</div></div>\n  </details>"
        },
        {
          "id": "wiko-rg-bt6",
          "icon": "",
          "name": "Rechtsgeschäfte · Fall-Übung — Alles zusammen",
          "desc": "Bài tập tổng hợp — Áp dụng toàn bộ kiến thức",
          "content": "<h2>Rechtsgeschäfte · Fall-Übung — Alles zusammen</h2>\n<div class=\"hint\">Gesetzbuch zum Lernen (DE–VI) · BGB</div>\n<details class=\"q\"><summary><b>Fall A</b> Frank (35) kauft ein Haus von Alexandra (88) und vermietet es an Peter (21). Alle sind geistig voll gesund. Analysieren Sie den Fall vollständig.</summary>\n    <div class=\"ans\">\n      <div class=\"de\"><b>Lösung</b> \n        <ul>\n          <li><b>Rechtsfähig?</b> Alle drei — jeder Mensch ist rechtsfähig.</li>\n          <li><b>Geschäftsfähig?</b> Alle drei <b>voll geschäftsfähig</b> (über 18, geistig gesund).</li>\n          <li><b>Rechtsgeschäfte:</b> Kaufvertrag (Frank–Alexandra), Mietvertrag (Frank–Peter).</li>\n          <li><b>Ein-/mehrseitig?</b> Beide <b>zweiseitig</b> (Antrag + Annahme).</li>\n          <li><b>Wirksam?</b> Ja, beide <b>voll gültig</b> (kein Mangel).</li>\n          <li><b>Anfechtbar?</b> Nein — kein Irrtum, keine Täuschung, keine Drohung.</li>\n          <li><b>Formzwang?</b> Grundstückskauf → <b>notarielle Beurkundung</b>. Mietvertrag → formfrei (üblich: Schriftform).</li>\n          <li><b>Eigentümer/Besitzer?</b> <b>Frank = Eigentümer</b>, <b>Peter = Besitzer</b>.</li>\n        </ul>\n      </div>\n      <div class=\"vi\">\n        <b>Đáp án dịch</b> \n        <ul>\n          <li>Có năng lực pháp luật? Cả 3 đều có.</li>\n          <li>Có năng lực hành vi? Cả 3 đều đầy đủ (trên 18 tuổi, minh mẫn).</li>\n          <li>Giao dịch hình thành: hợp đồng mua bán (Frank–Alexandra), hợp đồng thuê (Frank–Peter).</li>\n          <li>Đơn/nhiều bên? Cả hai đều nhiều bên (đề nghị + chấp nhận).</li>\n          <li>Có hiệu lực? Có, cả hai đều hợp lệ đầy đủ.</li>\n          <li>Có thể hủy? Không — không có nhầm lẫn, lừa dối, đe dọa.</li>\n          <li>Hình thức bắt buộc? Mua đất → công chứng. Hợp đồng thuê → tự do (thực tế thường bằng văn bản).</li>\n          <li>Chủ sở hữu/chiếm hữu? Frank là chủ sở hữu, Peter là người chiếm hữu.</li>\n        </ul>\n      </div>\n    </div>\n  </details>\n\n  <details class=\"q\"><summary><b>Fall B</b> Alexandra (20) kauft ein Auto für 20.000 € mit einem Bankkredit. Ihre Schwester Anja (17) möchte ebenfalls per Kredit ein Auto kaufen, darf aber nicht — deshalb leiht Alexandra ihr ihr eigenes Auto. Analysieren Sie den Fall vollständig.</summary>\n    <div class=\"ans\">\n      <div class=\"de\"><b>Lösung</b> \n        <ul>\n          <li><b>Rechtsfähig?</b> Beide rechtsfähig.</li>\n          <li><b>Geschäftsfähig?</b> Alexandra (20) → voll geschäftsfähig. Anja (17) → beschränkt geschäftsfähig.</li>\n          <li><b>Drei Rechtsgeschäfte:</b> 1) Kaufvertrag (Alexandra–Händler); 2) Darlehensvertrag (Alexandra–Bank); 3) Leihvertrag (Alexandra–Anja).</li>\n          <li><b>Ein-/mehrseitig?</b> Alle drei <b>zweiseitig</b>.</li>\n          <li><b>Wirksam?</b> Ja, alle drei. Beim Leihvertrag erhält Anja nur einen <b>rechtlichen Vorteil</b> <span class=\"para-code\">§107</span> (kostenlose Nutzung, keine Pflicht) → keine Zustimmung der Eltern nötig.</li>\n          <li><b>Anfechtbar?</b> Nein.</li>\n          <li><b>Formzwang?</b> Kaufvertrag → formfrei. Darlehensvertrag (Verbraucherkredit) → <b>Schriftform</b> <span class=\"para-code\">§492</span>. Leihvertrag → formfrei.</li>\n          <li><b>Eigentümer/Besitzer des Autos?</b> <b>Alexandra = Eigentümerin</b>. <b>Anja = Besitzerin</b> während der Leihzeit.</li>\n        </ul>\n      </div>\n      <div class=\"vi\">\n        <b>Đáp án dịch</b> \n        <ul>\n          <li>Có năng lực pháp luật? Cả hai đều có.</li>\n          <li>Có năng lực hành vi? Alexandra (20) đầy đủ. Anja (17) hạn chế.</li>\n          <li>Ba giao dịch: 1) mua bán (Alexandra–đại lý); 2) vay tiền (Alexandra–ngân hàng); 3) cho mượn (Alexandra–Anja).</li>\n          <li>Đơn/nhiều bên? Cả ba đều nhiều bên.</li>\n          <li>Có hiệu lực? Có cả ba. Với hợp đồng cho mượn, Anja chỉ nhận lợi ích pháp lý thuần túy (dùng miễn phí, không nghĩa vụ) → không cần cha mẹ đồng ý.</li>\n          <li>Có thể hủy? Không.</li>\n          <li>Hình thức bắt buộc? Mua xe → tự do. Vay ngân hàng → bắt buộc văn bản. Cho mượn → tự do.</li>\n          <li>Chủ sở hữu/chiếm hữu xe? Alexandra là chủ sở hữu. Anja là người chiếm hữu trong thời gian mượn.</li>\n        </ul>\n      </div>\n    </div>\n  </details>\n\n  <div class=\"block\">\n    <div class=\"de\" style=\"border-radius:8px;\"><b>Merktipp für Fallaufgaben</b> \n      1) Rechtsfähig? — immer \"ja\". 2) Geschäftsfähigkeit prüfen (Alter). 3) Rechtsgeschäft(e) benennen. 4) Ein- oder zweiseitig? 5) Wie kam die WE zustande? 6) Wirksam? Wann nichtig? 7) Anfechtbar? 8) Formzwang? 9) Eigentümer vs. Besitzer?\n    </div>\n    <div class=\"vi\"><b>Mẹo làm bài tình huống</b> \n      1) Năng lực pháp luật? — luôn \"có\". 2) Kiểm tra năng lực hành vi (tuổi). 3) Xác định giao dịch pháp lý. 4) Đơn hay nhiều bên? 5) Tuyên bố ý chí hình thành thế nào? 6) Có hiệu lực? Khi nào vô hiệu? 7) Có thể hủy? 8) Hình thức bắt buộc? 9) Ai là chủ sở hữu, ai là người chiếm hữu?\n    </div>\n  </div>"
        }
      ]
    },
    {
      "id": "wiso-theorie",
      "badge": "WiSo (Theorie)",
      "title": "WiSo (Theorie) · 9 Themen – Tổng hợp từ file Excel 04-250925",
      "items": [
        {
          "id": "wiso-thema-1",
          "icon": "",
          "name": "WiSo Thema 1 · Ausbildungsbetrieb (Doanh nghiệp đào tạo)",
          "desc": "Aufgaben des Ausbildungsbetriebs · Rechte und Pflichten der Auszubildenden · Rechte und Pflichten der Ausbilder · Organisation und Struktur des Betriebs · Zusammenarbeit im Betrieb",
          "content": "<h2>WiSo Thema 1 · Ausbildungsbetrieb</h2>\n<div class=\"hint\">Doanh nghiệp đào tạo · Quelle: Fach Wiso (Theorie) · 5 Punkte, je 3 Theorie-Inhalte + Beispiele</div>\n<h3>A. Theorie &amp; Beispiele (5 Punkte)</h3>\n<table><tr><th>Punkt</th><th>Theorie – Lý thuyết</th><th>Beispiel – Ví dụ</th></tr>\n<tr><td><b>1. Aufgaben des Ausbildungsbetriebs</b><br><i>Nhiệm vụ của doanh nghiệp đào tạo</i></td><td>1. Fachwissen vermitteln<br><i>Truyền đạt kiến thức nghề.</i><br>2. Praktische Fertigkeiten trainieren<br><i>Rèn luyện kỹ năng thực hành.</i><br>3. Soziale Kompetenzen fördern<br><i>Phát triển kỹ năng xã hội.</i></td><td>1. „Azubi lernt Hygienevorschriften.“<br><i>Học viên học quy định vệ sinh.</i><br>2. „Azubi bereitet Sandwiches unter Anleitung zu.“<br><i>Học viên làm bánh mì dưới sự hướng dẫn.</i><br>3. „Teamarbeit im Service üben.“<br><i>Luyện kỹ năng làm việc nhóm trong phục vụ.</i></td></tr>\n<tr><td><b>2. Rechte und Pflichten der Auszubildenden</b><br><i>Quyền &amp; nghĩa vụ của học viên</i></td><td>1. Recht auf Ausbildung<br><i>Có quyền được đào tạo.</i><br>2. Pflicht zur Lernbereitschaft<br><i>Nghĩa vụ học tập nghiêm túc.</i><br>3. Betriebsordnung einhalten<br><i>Tuân thủ nội quy doanh nghiệp.</i></td><td>1. „Azubi bekommt Ausbildungsplan.“<br><i>Học viên nhận kế hoạch đào tạo.</i><br>2. „Berichtsheft regelmäßig schreiben.“<br><i>Viết sổ nhật ký nghề thường xuyên.</i><br>3. „Arbeitskleidung tragen.“<br><i>Mặc đồng phục khi làm việc.</i></td></tr>\n<tr><td><b>3. Rechte und Pflichten der Ausbilder</b><br><i>Quyền &amp; nghĩa vụ của người đào tạo</i></td><td>1. Recht auf Respekt<br><i>Có quyền được tôn trọng.</i><br>2. Pflicht zur Fürsorge<br><i>Có nghĩa vụ quan tâm &amp; bảo vệ học viên.</i><br>3. Pflicht zur Wissensvermittlung<br><i>Nghĩa vụ truyền đạt kiến thức.</i></td><td>1. „Azubi respektiert Anweisungen des Ausbilders.“<br><i>Học viên tôn trọng hướng dẫn của người đào tạo.</i><br>2. „Ausbilder sorgt für Arbeitssicherheit.“<br><i>Người đào tạo đảm bảo an toàn lao động.</i><br>3. „Ausbilder erklärt HACCP-Regeln.“<br><i>Người đào tạo giảng giải quy tắc HACCP.</i></td></tr>\n<tr><td><b>4. Organisation und Struktur des Betriebs</b><br><i>Cấu trúc &amp; tổ chức doanh nghiệp</i></td><td>1. Hierarchie kennen<br><i>Hiểu hệ thống cấp bậc.</i><br>2. Abteilungen unterscheiden<br><i>Biết các bộ phận khác nhau.</i><br>3. Kommunikationswege nutzen<br><i>Sử dụng kênh giao tiếp.</i></td><td>1. „Filialleiter über Teamleiter → Mitarbeiter.“<br><i>Quản lý → trưởng nhóm → nhân viên.</i><br>2. „Abteilungen: Küche, Service, Verwaltung.“<br><i>Bộ phận: bếp, phục vụ, quản lý.</i><br>3. „Azubi meldet Problem an Schichtleiter.“<br><i>Học viên báo sự cố cho trưởng ca.</i></td></tr>\n<tr><td><b>5. Zusammenarbeit im Betrieb</b><br><i>Hợp tác trong doanh nghiệp</i></td><td>1. Teamarbeit fördern<br><i>Khuyến khích làm việc nhóm.</i><br>2. Konflikte lösen<br><i>Giải quyết xung đột.</i><br>3. Respekt und Kommunikation pflegen<br><i>Duy trì tôn trọng &amp; giao tiếp.</i></td><td>1. „Azubi hilft Kollegen im Stoßgeschäft.“<br><i>Học viên hỗ trợ đồng nghiệp lúc cao điểm.</i><br>2. „Konflikt zwischen Küche &amp; Service klären.“<br><i>Giải quyết xung đột giữa bếp &amp; phục vụ.</i><br>3. „Feedback-Runden im Team durchführen.“<br><i>Tổ chức vòng phản hồi trong nhóm.</i></td></tr>\n</table>\n<h3>B. Wichtige Hinweise – Điểm lưu ý quan trọng</h3>\n<table><tr><th>Deutsch</th><th>Tiếng Việt</th><th>Ghi chú</th></tr>\n<tr><td>Der Ausbildungsbetrieb vermittelt Theorie und Praxis.</td><td>Doanh nghiệp đào tạo truyền đạt cả lý thuyết và thực hành.</td><td>Azubi lernt Fachwissen + praktische Arbeit. Học viên học kiến thức + thực hành công việc.</td></tr>\n<tr><td>Azubis haben Rechte und Pflichten.</td><td>Học viên có cả quyền và nghĩa vụ.</td><td>Recht: Ausbildung, Vergütung. Pflicht: Lernen, Regeln einhalten. Quyền: được đào tạo, có lương. Nghĩa vụ: học tập, tuân thủ nội quy.</td></tr>\n<tr><td>Ausbilder haben Fürsorge- und Ausbildungspflicht.</td><td>Người đào tạo có nghĩa vụ chăm lo và giảng dạy.</td><td>Ausbilder sorgt für Sicherheit + erklärt Inhalte. Người đào tạo đảm bảo an toàn + truyền đạt nội dung.</td></tr>\n<tr><td>Organisation im Betrieb schafft Klarheit.</td><td>Tổ chức trong doanh nghiệp tạo sự rõ ràng.</td><td>Hierarchie: Filialleiter → Teamleiter → Mitarbeiter. Cấp bậc: quản lý → trưởng nhóm → nhân viên.</td></tr>\n<tr><td>Zusammenarbeit ist Schlüssel zum Erfolg.</td><td>Hợp tác là chìa khóa thành công.</td><td>Teamarbeit, Kommunikation, Konfliktlösung. Làm việc nhóm, giao tiếp, giải quyết xung đột.</td></tr>\n<tr><td>Dokumentation ist Pflicht.</td><td>Ghi chép là bắt buộc.</td><td>Berichtsheft = Ausbildungsnachweis. Sổ báo cáo = chứng từ đào tạo.</td></tr>\n<tr><td>Motivation entsteht am ersten Tag.</td><td>Động lực bắt đầu từ ngày đầu tiên.</td><td>Guter Start = mehr Engagement im Betrieb. Khởi đầu tốt = gắn bó hơn trong doanh nghiệp.</td></tr>\n</table>",
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
          "name": "WiSo Thema 2 · Berufsausbildungs- und Arbeitsverhältnis (Quan hệ đào tạo nghề & lao động)",
          "desc": "Inhalte des Ausbildungsvertrags · Dauer der Ausbildung · Arbeitszeitregelungen · Vergütung und Urlaub · Beendigung und Kündigung",
          "content": "<h2>WiSo Thema 2 · Berufsausbildungs- und Arbeitsverhältnis</h2>\n<div class=\"hint\">Quan hệ đào tạo nghề &amp; lao động · Quelle: Fach Wiso (Theorie) · 5 Punkte, je 3 Theorie-Inhalte + Beispiele</div>\n<h3>A. Theorie &amp; Beispiele (5 Punkte)</h3>\n<table><tr><th>Punkt</th><th>Theorie – Lý thuyết</th><th>Beispiel – Ví dụ</th></tr>\n<tr><td><b>1. Inhalte des Ausbildungsvertrags</b><br><i>Nội dung hợp đồng đào tạo</i></td><td>1. Vertragsparteien<br><i>Các bên tham gia hợp đồng.</i><br>2. Ausbildungsdauer<br><i>Thời gian đào tạo.</i><br>3. Vergütung und Urlaub<br><i>Lương &amp; ngày nghỉ.</i></td><td>1. „Vertrag zwischen Azubi und Betrieb.“<br><i>Hợp đồng giữa học viên và doanh nghiệp.</i><br>2. „Ausbildung dauert 2 Jahre.“<br><i>Đào tạo kéo dài 2 năm.</i><br>3. „Azubi bekommt 24 Urlaubstage.“<br><i>Học viên có 24 ngày phép.</i></td></tr>\n<tr><td><b>2. Dauer der Ausbildung</b><br><i>Thời gian đào tạo</i></td><td>1. Regelausbildungszeit<br><i>Thời gian tiêu chuẩn.</i><br>2. Verkürzung möglich<br><i>Có thể rút ngắn.</i><br>3. Verlängerung bei Bedarf<br><i>Có thể kéo dài nếu cần.</i></td><td>1. „Systemgastronomie = 2 Jahre.“<br><i>Ngành Systemgastronomie = 2 năm.</i><br>2. „Verkürzung bei guten Noten möglich.“<br><i>Có thể rút ngắn nếu điểm tốt.</i><br>3. „Verlängerung bei Krankheit.“<br><i>Có thể kéo dài khi bị bệnh.</i></td></tr>\n<tr><td><b>3. Arbeitszeitregelungen</b><br><i>Quy định giờ làm việc</i></td><td>1. Jugendarbeitsschutz beachten<br><i>Luật bảo vệ lao động trẻ.</i><br>2. Maximalstunden/Tag<br><i>Số giờ làm tối đa/ngày.</i><br>3. Pausenregelung<br><i>Quy định nghỉ ngơi.</i></td><td>1. „Azubi unter 18: max. 40 Std./Woche.“<br><i>Học viên &lt;18 tuổi: tối đa 40 giờ/tuần.</i><br>2. „Nicht mehr als 10 Std./Tag.“<br><i>Không quá 10 giờ/ngày.</i><br>3. „Nach 6 Std. Arbeit → 30 Min. Pause.“<br><i>Sau 6 giờ làm → nghỉ 30 phút.</i></td></tr>\n<tr><td><b>4. Vergütung und Urlaub</b><br><i>Lương &amp; ngày nghỉ</i></td><td>1. Tarifvertrag beachten<br><i>Tuân thủ hợp đồng lao động tập thể.</i><br>2. Mindestlohnregelung<br><i>Quy định lương tối thiểu.</i><br>3. Urlaubsanspruch<br><i>Quyền nghỉ phép.</i></td><td>1. „Azubi erhält 800 €/Monat.“<br><i>Học viên nhận 800 €/tháng.</i><br>2. „Lohn darf Mindestlohn nicht unterschreiten.“<br><i>Lương không được thấp hơn mức tối thiểu.</i><br>3. „Urlaub: 24 Tage pro Jahr.“<br><i>Nghỉ phép: 24 ngày/năm.</i></td></tr>\n<tr><td><b>5. Beendigung und Kündigung</b><br><i>Kết thúc &amp; chấm dứt hợp đồng</i></td><td>1. Ende mit Bestehen der Prüfung<br><i>Kết thúc khi thi đỗ.</i><br>2. Kündigung in Probezeit<br><i>Có thể chấm dứt trong thời gian thử việc.</i><br>3. Außerordentliche Kündigung<br><i>Chấm dứt đặc biệt (lý do nghiêm trọng).</i></td><td>1. „Vertrag endet nach Abschlussprüfung.“<br><i>Hợp đồng kết thúc sau kỳ thi.</i><br>2. „Probezeit: 4 Monate kündbar.“<br><i>Thử việc: 4 tháng có thể nghỉ.</i><br>3. „Fristlose Kündigung bei Diebstahl.“<br><i>Chấm dứt ngay khi ăn cắp.</i></td></tr>\n</table>\n<h3>B. Wichtige Hinweise – Điểm lưu ý quan trọng</h3>\n<table><tr><th>Deutsch</th><th>Tiếng Việt</th><th>Ghi chú</th></tr>\n<tr><td>Der Ausbildungsvertrag ist die Grundlage.</td><td>Hợp đồng đào tạo là nền tảng.</td><td>Ohne Vertrag keine Ausbildung. Không có hợp đồng thì không có đào tạo.</td></tr>\n<tr><td>Dauer der Ausbildung kann variieren.</td><td>Thời gian đào tạo có thể thay đổi.</td><td>Verkürzung bei guten Leistungen, Verlängerung bei Krankheit. Có thể rút ngắn khi học tốt, kéo dài nếu bệnh.</td></tr>\n<tr><td>Arbeitszeit ist gesetzlich geregelt.</td><td>Giờ làm việc được quy định bởi luật.</td><td>Jugendarbeitsschutz beachten (unter 18: max. 40 Std./Woche). Luật bảo vệ lao động trẻ (&lt;18 tuổi: tối đa 40h/tuần).</td></tr>\n<tr><td>Vergütung und Urlaub sind Rechte des Azubis.</td><td>Lương &amp; ngày nghỉ là quyền của học viên.</td><td>Mindestens tariflich geregelt, Urlaub mind. 24 Tage. Theo hợp đồng tập thể, nghỉ phép ít nhất 24 ngày.</td></tr>\n<tr><td>Probezeit ist entscheidend.</td><td>Thời gian thử việc rất quan trọng.</td><td>Dauert bis 4 Monate, Kündigung jederzeit möglich. Kéo dài đến 4 tháng, có thể nghỉ bất cứ lúc nào.</td></tr>\n<tr><td>Kündigung nach Probezeit nur mit Gründen.</td><td>Sau thử việc chỉ được chấm dứt khi có lý do.</td><td>Ordentliche oder außerordentliche Kündigung. Chấm dứt thông thường hoặc đặc biệt.</td></tr>\n<tr><td>Rechte und Pflichten beider Seiten müssen im Gleichgewicht sein.</td><td>Quyền và nghĩa vụ của cả hai bên phải cân bằng.</td><td>Nur so ist die Ausbildung erfolgreich. Chỉ như vậy đào tạo mới thành công.</td></tr>\n</table>",
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
          "name": "WiSo Thema 3 · Betriebliche Mitbestimmung (Sự tham gia trong doanh nghiệp)",
          "desc": "Rechte des Betriebsrats · Aufgaben des Betriebsrats · Jugend- und Auszubildendenvertretung (JAV) · Mitbestimmung bei Arbeitszeit · Mitbestimmung bei Kündigung",
          "content": "<h2>WiSo Thema 3 · Betriebliche Mitbestimmung</h2>\n<div class=\"hint\">Sự tham gia trong doanh nghiệp · Quelle: Fach Wiso (Theorie) · 5 Punkte, je 3 Theorie-Inhalte + Beispiele</div>\n<h3>A. Theorie &amp; Beispiele (5 Punkte)</h3>\n<table><tr><th>Punkt</th><th>Theorie – Lý thuyết</th><th>Beispiel – Ví dụ</th></tr>\n<tr><td><b>1. Rechte des Betriebsrats</b><br><i>Quyền của hội đồng nhân viên</i></td><td>1. Mitbestimmung bei Arbeitszeit<br><i>Tham gia quyết định giờ làm.</i><br>2. Mitbestimmung bei Kündigungen<br><i>Tham gia quyết định việc chấm dứt hợp đồng.</i><br>3. Informationsrecht<br><i>Quyền được cung cấp thông tin.</i></td><td>1. „Betriebsrat stimmt Dienstplanänderung zu.“<br><i>Hội đồng nhân viên đồng ý thay đổi lịch làm.</i><br>2. „Betriebsrat muss bei Kündigung informiert werden.“<br><i>Hội đồng phải được thông báo khi sa thải.</i><br>3. „Chef informiert Betriebsrat über Neueinstellungen.“<br><i>Sếp báo cho hội đồng về tuyển dụng mới.</i></td></tr>\n<tr><td><b>2. Aufgaben des Betriebsrats</b><br><i>Nhiệm vụ của hội đồng nhân viên</i></td><td>1. Interessen der Mitarbeiter vertreten<br><i>Đại diện quyền lợi nhân viên.</i><br>2. Sozialpläne mitgestalten<br><i>Tham gia xây dựng kế hoạch xã hội.</i><br>3. Beschwerden aufnehmen<br><i>Tiếp nhận khiếu nại.</i></td><td>1. „Betriebsrat fordert bessere Pausenregelung.“<br><i>Hội đồng yêu cầu quy định nghỉ ngơi tốt hơn.</i><br>2. „Betriebsrat wirkt bei Arbeitszeitmodell mit.“<br><i>Tham gia vào mô hình giờ làm.</i><br>3. „Mitarbeiter beschwert sich über Überstunden.“<br><i>Nhân viên khiếu nại vì làm thêm giờ.</i></td></tr>\n<tr><td><b>3. Jugend- und Auszubildendenvertretung (JAV)</b><br><i>Đại diện học viên &amp; thanh niên</i></td><td>1. Vertretung für Azubis unter 25<br><i>Đại diện cho học viên dưới 25 tuổi.</i><br>2. Probleme der Azubis ansprechen<br><i>Nêu vấn đề của học viên.</i><br>3. Enge Zusammenarbeit mit Betriebsrat<br><i>Phối hợp chặt chẽ với hội đồng nhân viên.</i></td><td>1. „JAV kümmert sich um Azubi-Anliegen.“<br><i>JAV chăm lo cho vấn đề của học viên.</i><br>2. „Azubis melden Probleme mit Ausbilder.“<br><i>Học viên báo vấn đề với người đào tạo.</i><br>3. „JAV und Betriebsrat arbeiten zusammen.“<br><i>JAV và hội đồng nhân viên phối hợp.</i></td></tr>\n<tr><td><b>4. Mitbestimmung bei Arbeitszeit</b><br><i>Tham gia quyết định giờ làm</i></td><td>1. Einführung neuer Schichtmodelle<br><i>Áp dụng mô hình ca làm mới.</i><br>2. Überstundenregelung<br><i>Quy định làm thêm giờ.</i><br>3. Urlaubsplanung<br><i>Lập kế hoạch nghỉ phép.</i></td><td>1. „Betriebsrat stimmt Schichtsystem zu.“<br><i>Hội đồng đồng ý hệ thống ca làm.</i><br>2. „Überstunden nur mit Zustimmung.“<br><i>Chỉ làm thêm khi được đồng ý.</i><br>3. „Urlaubsplan wird mit Betriebsrat abgestimmt.“<br><i>Kế hoạch nghỉ phép được thống nhất với hội đồng.</i></td></tr>\n<tr><td><b>5. Mitbestimmung bei Kündigung</b><br><i>Tham gia quyết định chấm dứt hợp đồng</i></td><td>1. Zustimmungspflicht<br><i>Yêu cầu sự đồng ý.</i><br>2. Prüfung der Kündigungsgründe<br><i>Kiểm tra lý do sa thải.</i><br>3. Schutz vor Willkür<br><i>Bảo vệ nhân viên khỏi bị sa thải tùy tiện.</i></td><td>1. „Kündigung ohne Betriebsrat nicht gültig.“<br><i>Sa thải không có hội đồng thì không hợp lệ.</i><br>2. „Betriebsrat prüft Kündigungsgrund.“<br><i>Hội đồng kiểm tra lý do sa thải.</i><br>3. „Mitarbeiter vor ungerechter Kündigung geschützt.“<br><i>Nhân viên được bảo vệ khỏi sa thải bất công.</i></td></tr>\n</table>\n<h3>B. Wichtige Hinweise – Điểm lưu ý quan trọng</h3>\n<table><tr><th>Deutsch</th><th>Tiếng Việt</th><th>Ghi chú</th></tr>\n<tr><td>Der Betriebsrat ist die Stimme der Mitarbeiter.</td><td>Hội đồng nhân viên là tiếng nói của nhân viên.</td><td>Vertretung bei Arbeitszeit, Kündigung, Sozialfragen. Đại diện trong giờ làm, sa thải, vấn đề xã hội.</td></tr>\n<tr><td>JAV ist speziell für Azubis wichtig.</td><td>JAV đặc biệt quan trọng cho học viên.</td><td>Vertretung für Azubis &lt; 25 Jahre. Đại diện cho học viên dưới 25 tuổi.</td></tr>\n<tr><td>Arbeitszeit und Kündigung sind zentrale Mitbestimmungsrechte.</td><td>Giờ làm và chấm dứt hợp đồng là quyền tham gia quan trọng nhất.</td><td>Betriebsrat muss zustimmen oder informiert werden. Hội đồng phải đồng ý hoặc được thông báo.</td></tr>\n<tr><td>Mitbestimmung schützt vor Willkür.</td><td>Tham gia quyết định giúp chống lại sự tùy tiện.</td><td>Ohne Betriebsrat: Kündigung oft ungerecht. Không có hội đồng: sa thải dễ bất công.</td></tr>\n<tr><td>Zusammenarbeit zwischen Betriebsrat, JAV und Chef ist entscheidend.</td><td>Sự phối hợp giữa hội đồng, JAV và sếp là yếu tố then chốt.</td><td>Regelmäßige Sitzungen verbessern Zusammenarbeit. Họp thường xuyên giúp phối hợp tốt hơn.</td></tr>\n<tr><td>Alle Mitarbeiter sollten ihre Rechte kennen.</td><td>Mọi nhân viên cần biết quyền của mình.</td><td>Wichtig für Fairness im Betrieb. Quan trọng để đảm bảo công bằng trong doanh nghiệp.</td></tr>\n<tr><td>Mitbestimmung fördert Motivation und Fairness.</td><td>Tham gia quyết định giúp tăng động lực và công bằng.</td><td>Mitarbeiter fühlen sich ernst genommen. Nhân viên cảm thấy mình được coi trọng.</td></tr>\n</table>",
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
          "name": "WiSo Thema 4 · Entwicklung der Arbeitswelt (Sự phát triển của thế giới lao động)",
          "desc": "Wandel durch Digitalisierung · Strukturwandel in der Gastronomie · Arbeitsmarkt und Berufe · Fachkräftemangel · Lebenslanges Lernen",
          "content": "<h2>WiSo Thema 4 · Entwicklung der Arbeitswelt</h2>\n<div class=\"hint\">Sự phát triển của thế giới lao động · Quelle: Fach Wiso (Theorie) · 5 Punkte, je 3 Theorie-Inhalte + Beispiele</div>\n<h3>A. Theorie &amp; Beispiele (5 Punkte)</h3>\n<table><tr><th>Punkt</th><th>Theorie – Lý thuyết</th><th>Beispiel – Ví dụ</th></tr>\n<tr><td><b>1. Wandel durch Digitalisierung</b><br><i>Thay đổi do số hóa</i></td><td>1. Neue Technologien einsetzen<br><i>Ứng dụng công nghệ mới.</i><br>2. Online-Bestellungen ermöglichen<br><i>Cho phép đặt hàng online.</i><br>3. Digitale Kommunikation nutzen<br><i>Dùng giao tiếp kỹ thuật số.</i></td><td>1. „Bestellungen per Tablet aufnehmen.“<br><i>Nhận đơn bằng máy tính bảng.</i><br>2. „Kunde bestellt Sandwich über App.“<br><i>Khách đặt bánh mì qua ứng dụng.</i><br>3. „Team kommuniziert per WhatsApp-Gruppe.“<br><i>Nhóm trao đổi qua WhatsApp.</i></td></tr>\n<tr><td><b>2. Strukturwandel in der Gastronomie</b><br><i>Chuyển đổi trong ngành ẩm thực</i></td><td>1. Systemgastronomie wächst<br><i>Ngành ẩm thực hệ thống phát triển.</i><br>2. Klassische Restaurants verändern sich<br><i>Nhà hàng truyền thống thay đổi.</i><br>3. Mehr Lieferdienste<br><i>Dịch vụ giao hàng tăng.</i></td><td>1. „Subway expandiert in vielen Städten.“<br><i>Subway mở rộng ở nhiều thành phố.</i><br>2. „Traditionelles Restaurant bietet auch Takeaway.“<br><i>Nhà hàng truyền thống thêm món mang đi.</i><br>3. „Lieferando bringt Essen nach Hause.“<br><i>Lieferando giao đồ ăn tận nhà.</i></td></tr>\n<tr><td><b>3. Arbeitsmarkt und Berufe</b><br><i>Thị trường lao động &amp; nghề nghiệp</i></td><td>1. Neue Berufsbilder entstehen<br><i>Xuất hiện nghề mới.</i><br>2. Mehr Flexibilität gefordert<br><i>Yêu cầu linh hoạt hơn.</i><br>3. Internationale Arbeitskräfte wichtig<br><i>Lao động quốc tế quan trọng.</i></td><td>1. „Job: Fachkraft für Systemgastronomie.“<br><i>Nghề: Nhân viên ngành ẩm thực hệ thống.</i><br>2. „Mitarbeiter wechseln zwischen Küche und Service.“<br><i>Nhân viên luân chuyển giữa bếp và phục vụ.</i><br>3. „Viele Azubis kommen aus dem Ausland.“<br><i>Nhiều học viên đến từ nước ngoài.</i></td></tr>\n<tr><td><b>4. Fachkräftemangel</b><br><i>Thiếu hụt lao động có tay nghề</i></td><td>1. Ursachen analysieren<br><i>Phân tích nguyên nhân.</i><br>2. Attraktivität der Branche erhöhen<br><i>Tăng sức hấp dẫn ngành.</i><br>3. Azubis fördern<br><i>Đào tạo và hỗ trợ học viên.</i></td><td>1. „Viele verlassen Gastronomie wegen Arbeitszeiten.“<br><i>Nhiều người rời ngành vì giờ làm.</i><br>2. „Betrieb bietet höhere Löhne.“<br><i>Doanh nghiệp trả lương cao hơn.</i><br>3. „Mehr Ausbildungsplätze schaffen.“<br><i>Tạo thêm chỗ học nghề.</i></td></tr>\n<tr><td><b>5. Lebenslanges Lernen</b><br><i>Học tập suốt đời</i></td><td>1. Fortbildungen besuchen<br><i>Tham gia đào tạo nâng cao.</i><br>2. Neue Trends lernen<br><i>Học xu hướng mới.</i><br>3. Anpassung an Veränderungen<br><i>Thích nghi thay đổi.</i></td><td>1. „Kurs über neue Kassensysteme.“<br><i>Khóa học về hệ thống thu ngân mới.</i><br>2. „Seminar über vegane Ernährung.“<br><i>Hội thảo về dinh dưỡng thuần chay.</i><br>3. „Team passt sich an Lieferservice an.“<br><i>Nhóm thích nghi với dịch vụ giao hàng.</i></td></tr>\n</table>\n<h3>B. Wichtige Hinweise – Điểm lưu ý quan trọng</h3>\n<table><tr><th>Deutsch</th><th>Tiếng Việt</th><th>Ghi chú</th></tr>\n<tr><td>Digitalisierung verändert alle Berufe.</td><td>Số hóa thay đổi mọi ngành nghề.</td><td>Neue Kassensysteme, Online-Bestellungen. Hệ thống thu ngân mới, đặt hàng online.</td></tr>\n<tr><td>Strukturwandel betrifft Gastronomie stark.</td><td>Ngành ẩm thực chịu tác động lớn của chuyển đổi.</td><td>Mehr Systemgastronomie, mehr Lieferdienste. Ẩm thực hệ thống phát triển, dịch vụ giao hàng tăng.</td></tr>\n<tr><td>Flexibilität ist Voraussetzung auf dem Arbeitsmarkt.</td><td>Linh hoạt là điều kiện tiên quyết trên thị trường lao động.</td><td>Mitarbeiter wechseln zwischen Küche &amp; Service. Nhân viên có thể luân chuyển giữa bếp và phục vụ.</td></tr>\n<tr><td>Fachkräftemangel ist eine große Herausforderung.</td><td>Thiếu hụt lao động có tay nghề là thách thức lớn.</td><td>Viele verlassen Gastronomie wegen Arbeitszeiten. Nhiều người rời ngành vì giờ làm.</td></tr>\n<tr><td>Lebenslanges Lernen ist Pflicht, nicht Wahl.</td><td>Học tập suốt đời là bắt buộc, không phải tùy chọn.</td><td>Fortbildungen über neue Trends (z. B. vegane Ernährung). Đào tạo nâng cao về xu hướng mới (ví dụ: ăn chay).</td></tr>\n<tr><td>Internationale Arbeitskräfte sind notwendig.</td><td>Lao động quốc tế là cần thiết.</td><td>Viele Azubis kommen aus dem Ausland. Nhiều học viên đến từ nước ngoài.</td></tr>\n<tr><td>Anpassungsfähigkeit entscheidet über Erfolg.</td><td>Khả năng thích nghi quyết định thành công.</td><td>Betriebe, die Trends anpassen, bleiben wettbewerbsfähig. Doanh nghiệp nào thích nghi xu hướng thì duy trì cạnh tranh.</td></tr>\n</table>",
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
          "name": "WiSo Thema 5 · Sozialversicherung (Bảo hiểm xã hội)",
          "desc": "Krankenversicherung · Rentenversicherung · Arbeitslosenversicherung · Pflegeversicherung · Unfallversicherung",
          "content": "<h2>WiSo Thema 5 · Sozialversicherung</h2>\n<div class=\"hint\">Bảo hiểm xã hội · Quelle: Fach Wiso (Theorie) · 5 Punkte, je 3 Theorie-Inhalte + Beispiele</div>\n<h3>A. Theorie &amp; Beispiele (5 Punkte)</h3>\n<table><tr><th>Punkt</th><th>Theorie – Lý thuyết</th><th>Beispiel – Ví dụ</th></tr>\n<tr><td><b>1. Krankenversicherung</b><br><i>Bảo hiểm y tế</i></td><td>1. Kostenübernahme bei Arztbesuch<br><i>Chi trả khi đi khám bác sĩ.</i><br>2. Medikamente und Behandlungen<br><i>Thuốc và điều trị được hỗ trợ.</i><br>3. Pflichtversicherung für Arbeitnehmer<br><i>Bảo hiểm bắt buộc cho người lao động.</i></td><td>1. „Azubi geht zum Arzt, Krankenkasse zahlt.“<br><i>Học viên đi khám, bảo hiểm y tế chi trả.</i><br>2. „Medizin für Grippe wird übernommen.“<br><i>Thuốc cảm cúm được hỗ trợ.</i><br>3. „Azubi wird automatisch versichert.“<br><i>Học viên được tự động tham gia bảo hiểm.</i></td></tr>\n<tr><td><b>2. Rentenversicherung</b><br><i>Bảo hiểm hưu trí</i></td><td>1. Beiträge während der Arbeit<br><i>Đóng góp trong thời gian làm việc.</i><br>2. Anspruch im Alter<br><i>Quyền nhận lương hưu khi về già.</i><br>3. Solidarprinzip<br><i>Nguyên tắc đoàn kết (thế hệ trẻ nuôi thế hệ già).</i></td><td>1. „Monatlich wird Beitrag vom Lohn abgezogen.“<br><i>Hàng tháng trích lương để đóng.</i><br>2. „Nach 40 Jahren Arbeit → Rente.“<br><i>Sau 40 năm làm việc → nhận lương hưu.</i><br>3. „Junge zahlen für die Alten.“<br><i>Người trẻ đóng cho người già.</i></td></tr>\n<tr><td><b>3. Arbeitslosenversicherung</b><br><i>Bảo hiểm thất nghiệp</i></td><td>1. Unterstützung bei Jobverlust<br><i>Hỗ trợ khi mất việc.</i><br>2. Arbeitslosengeld I<br><i>Tiền trợ cấp thất nghiệp loại I.</i><br>3. Vermittlung durch Arbeitsagentur<br><i>Giới thiệu việc làm qua cơ quan lao động.</i></td><td>1. „Mitarbeiter verliert Job → ALG I.“<br><i>Nhân viên mất việc → nhận trợ cấp I.</i><br>2. „Höhe abhängig vom letzten Gehalt.“<br><i>Số tiền phụ thuộc vào lương cũ.</i><br>3. „Agentur hilft bei Jobsuche.“<br><i>Cơ quan lao động hỗ trợ tìm việc.</i></td></tr>\n<tr><td><b>4. Pflegeversicherung</b><br><i>Bảo hiểm chăm sóc</i></td><td>1. Unterstützung bei Pflegebedürftigkeit<br><i>Hỗ trợ khi cần chăm sóc.</i><br>2. Pflegestufen definieren Leistungen<br><i>Mức độ chăm sóc quyết định quyền lợi.</i><br>3. Entlastung für Angehörige<br><i>Giảm gánh nặng cho gia đình.</i></td><td>1. „Alter Mensch bekommt Pflegegeld.“<br><i>Người già nhận tiền chăm sóc.</i><br>2. „Pflegestufe 3 = mehr Unterstützung.“<br><i>Mức chăm sóc 3 = nhiều hỗ trợ hơn.</i><br>3. „Familie wird finanziell entlastet.“<br><i>Gia đình được giảm gánh nặng tài chính.</i></td></tr>\n<tr><td><b>5. Unfallversicherung</b><br><i>Bảo hiểm tai nạn</i></td><td>1. Schutz bei Arbeitsunfällen<br><i>Bảo vệ khi tai nạn lao động.</i><br>2. Wegeunfälle eingeschlossen<br><i>Bao gồm cả tai nạn trên đường đi làm.</i><br>3. Finanzielle Absicherung<br><i>Đảm bảo tài chính khi bị tai nạn.</i></td><td>1. „Azubi verletzt sich in Küche, Versicherung zahlt.“<br><i>Học viên bị thương trong bếp, bảo hiểm chi trả.</i><br>2. „Unfall auf dem Arbeitsweg = versichert.“<br><i>Tai nạn trên đường đi làm = được bảo hiểm.</i><br>3. „Kosten für Reha übernommen.“<br><i>Chi phí phục hồi chức năng được chi trả.</i></td></tr>\n</table>\n<h3>B. Wichtige Hinweise – Điểm lưu ý quan trọng</h3>\n<table><tr><th>Deutsch</th><th>Tiếng Việt</th><th>Ghi chú</th></tr>\n<tr><td>Sozialversicherung besteht aus 5 Säulen.</td><td>Bảo hiểm xã hội có 5 trụ cột.</td><td>Kranken-, Renten-, Arbeitslosen-, Pflege-, Unfallversicherung. Gồm: Y tế, hưu trí, thất nghiệp, chăm sóc, tai nạn.</td></tr>\n<tr><td>Jede Versicherung schützt vor speziellen Risiken.</td><td>Mỗi loại bảo hiểm bảo vệ trước một rủi ro riêng.</td><td>Beispiel: Krankenversicherung bei Krankheit. Ví dụ: bảo hiểm y tế khi ốm bệnh.</td></tr>\n<tr><td>Beiträge werden automatisch vom Lohn abgezogen.</td><td>Khoản đóng được tự động trừ từ lương.</td><td>Arbeitgeber + Arbeitnehmer zahlen zusammen. Người lao động + chủ doanh nghiệp cùng đóng.</td></tr>\n<tr><td>Versicherung ist Pflicht für alle Arbeitnehmer.</td><td>Bảo hiểm là bắt buộc cho mọi người lao động.</td><td>Ausnahme: bestimmte Minijobs. Ngoại lệ: một số việc làm nhỏ (Minijob).</td></tr>\n<tr><td>Ohne Versicherung → keine finanzielle Sicherheit.</td><td>Không có bảo hiểm → không có an toàn tài chính.</td><td>Hohe Kosten bei Unfall oder Krankheit. Chi phí cao khi tai nạn hoặc bệnh tật.</td></tr>\n<tr><td>Arbeitgeber und Arbeitnehmer teilen Beiträge.</td><td>Người lao động và chủ doanh nghiệp cùng đóng.</td><td>Ca. 50:50, je nach Versicherung. Khoảng 50:50, tùy loại bảo hiểm.</td></tr>\n<tr><td>Kenntnisse der Sozialversicherung sind prüfungsrelevant.</td><td>Hiểu biết về bảo hiểm xã hội rất quan trọng trong kỳ thi.</td><td>Fragen dazu kommen oft in WISO-Prüfung. Các câu hỏi này thường xuất hiện trong kỳ thi WISO.</td></tr>\n</table>",
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
          "name": "WiSo Thema 6 · Soziale Sicherung, Berufs- und Lebensplanung (An sinh xã hội, nghề nghiệp & kế hoạch cuộc sống)",
          "desc": "Private Vorsorge · Betriebliche Altersvorsorge · Weiterbildung · Karriereplanung · Work-Life-Balance",
          "content": "<h2>WiSo Thema 6 · Soziale Sicherung, Berufs- und Lebensplanung</h2>\n<div class=\"hint\">An sinh xã hội, nghề nghiệp &amp; kế hoạch cuộc sống · Quelle: Fach Wiso (Theorie) · 5 Punkte, je 3 Theorie-Inhalte + Beispiele</div>\n<h3>A. Theorie &amp; Beispiele (5 Punkte)</h3>\n<table><tr><th>Punkt</th><th>Theorie – Lý thuyết</th><th>Beispiel – Ví dụ</th></tr>\n<tr><td><b>1. Private Vorsorge</b><br><i>Dự phòng cá nhân</i></td><td>1. Zusatzversicherung abschließen<br><i>Tham gia bảo hiểm bổ sung.</i><br>2. Sparpläne einrichten<br><i>Thiết lập kế hoạch tiết kiệm.</i><br>3. Eigenverantwortung zeigen<br><i>Thể hiện trách nhiệm cá nhân.</i></td><td>1. „Azubi schließt Zahnzusatzversicherung ab.“<br><i>Học viên mua bảo hiểm nha khoa bổ sung.</i><br>2. „Monatlich 50 € sparen.“<br><i>Tiết kiệm 50 € mỗi tháng.</i><br>3. „Mitarbeiter legt Geld für Notfälle zurück.“<br><i>Nhân viên để dành tiền cho tình huống khẩn cấp.</i></td></tr>\n<tr><td><b>2. Betriebliche Altersvorsorge</b><br><i>Lương hưu doanh nghiệp</i></td><td>1. Arbeitgeber bietet Zusatzrente<br><i>Chủ doanh nghiệp hỗ trợ lương hưu thêm.</i><br>2. Steuervorteile nutzen<br><i>Hưởng lợi về thuế.</i><br>3. Langfristige Sicherheit<br><i>Đảm bảo lâu dài.</i></td><td>1. „Firma zahlt in Rentenkasse ein.“<br><i>Công ty đóng góp vào quỹ hưu.</i><br>2. „Beiträge steuerlich absetzbar.“<br><i>Khoản đóng được khấu trừ thuế.</i><br>3. „Azubi baut Zusatzrente auf.“<br><i>Học viên tích lũy lương hưu bổ sung.</i></td></tr>\n<tr><td><b>3. Weiterbildung</b><br><i>Đào tạo nâng cao</i></td><td>1. Fachliche Kurse besuchen<br><i>Tham gia khóa chuyên môn.</i><br>2. Soft Skills entwickeln<br><i>Phát triển kỹ năng mềm.</i><br>3. Lebenslanges Lernen fördern<br><i>Khuyến khích học suốt đời.</i></td><td>1. „Azubi besucht Hygiene-Seminar.“<br><i>Học viên tham dự hội thảo vệ sinh.</i><br>2. „Mitarbeiter trainiert Kommunikation.“<br><i>Nhân viên luyện kỹ năng giao tiếp.</i><br>3. „Team nimmt an Digital-Kurs teil.“<br><i>Nhóm tham gia khóa học số hóa.</i></td></tr>\n<tr><td><b>4. Karriereplanung</b><br><i>Lập kế hoạch nghề nghiệp</i></td><td>1. Ziele definieren<br><i>Xác định mục tiêu.</i><br>2. Fortbildungsschritte planen<br><i>Lập kế hoạch học tập tiếp theo.</i><br>3. Mentoren nutzen<br><i>Nhờ sự cố vấn từ người đi trước.</i></td><td>1. „Azubi möchte später Filialleiter werden.“<br><i>Học viên muốn trở thành quản lý chi nhánh.</i><br>2. „Besuch eines Meisterkurses geplant.“<br><i>Dự định tham gia khóa học Meister.</i><br>3. „Azubi fragt Ausbilder um Rat.“<br><i>Học viên xin lời khuyên từ người đào tạo.</i></td></tr>\n<tr><td><b>5. Work-Life-Balance</b><br><i>Cân bằng công việc &amp; cuộc sống</i></td><td>1. Gesundheit erhalten<br><i>Duy trì sức khỏe.</i><br>2. Freizeit gestalten<br><i>Tận hưởng thời gian rảnh.</i><br>3. Stress abbauen<br><i>Giảm căng thẳng.</i></td><td>1. „Mitarbeiter treibt regelmäßig Sport.“<br><i>Nhân viên tập thể dục thường xuyên.</i><br>2. „Azubi geht ins Kino am Wochenende.“<br><i>Học viên đi xem phim cuối tuần.</i><br>3. „Team macht gemeinsame Ausflüge.“<br><i>Nhóm tổ chức đi chơi chung.</i></td></tr>\n</table>\n<h3>B. Wichtige Hinweise – Điểm lưu ý quan trọng</h3>\n<table><tr><th>Deutsch</th><th>Tiếng Việt</th><th>Ghi chú</th></tr>\n<tr><td>Soziale Sicherung ist mehr als Pflichtversicherung.</td><td>An sinh xã hội không chỉ là bảo hiểm bắt buộc.</td><td>Auch private Vorsorge zählt. Bao gồm cả dự phòng cá nhân.</td></tr>\n<tr><td>Betriebliche Altersvorsorge lohnt sich langfristig.</td><td>Lương hưu doanh nghiệp có lợi về lâu dài.</td><td>Steuervorteile + zusätzliche Rente. Vừa giảm thuế vừa có thêm hưu trí.</td></tr>\n<tr><td>Weiterbildung erhöht Karrierechancen.</td><td>Đào tạo nâng cao giúp tăng cơ hội nghề nghiệp.</td><td>Häufiges Prüfungsthema in WISO. Thường xuất hiện trong đề thi WISO.</td></tr>\n<tr><td>Klare Karriereplanung motiviert.</td><td>Lập kế hoạch nghề nghiệp rõ ràng tạo động lực.</td><td>Azubis sollen Ziele formulieren. Học viên nên xác định mục tiêu.</td></tr>\n<tr><td>Work-Life-Balance ist Voraussetzung für Gesundheit.</td><td>Cân bằng công việc &amp; cuộc sống là điều kiện để khỏe mạnh.</td><td>Stressabbau = weniger Krankmeldungen. Giảm stress → ít nghỉ bệnh hơn.</td></tr>\n<tr><td>Arbeitgeber profitieren von motivierten Mitarbeitern.</td><td>Doanh nghiệp hưởng lợi khi nhân viên có động lực.</td><td>Weniger Fluktuation, mehr Produktivität. Ít nghỉ việc, năng suất cao hơn.</td></tr>\n<tr><td>Sozial- und Lebensplanung gehört ins Prüfungsthema.</td><td>An sinh &amp; kế hoạch cuộc sống nằm trong nội dung thi.</td><td>Fragen oft in mündlicher Prüfung. Thường có trong phần thi nói.</td></tr>\n</table>",
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
          "name": "WiSo Thema 7 · Unternehmen und Verbraucher (Doanh nghiệp & người tiêu dùng)",
          "desc": "Rechte der Verbraucher · Pflichten der Unternehmen · Vertragsabschluss · Produkthaftung · Werbung und Marketing",
          "content": "<h2>WiSo Thema 7 · Unternehmen und Verbraucher</h2>\n<div class=\"hint\">Doanh nghiệp &amp; người tiêu dùng · Quelle: Fach Wiso (Theorie) · 5 Punkte, je 3 Theorie-Inhalte + Beispiele</div>\n<h3>A. Theorie &amp; Beispiele (5 Punkte)</h3>\n<table><tr><th>Punkt</th><th>Theorie – Lý thuyết</th><th>Beispiel – Ví dụ</th></tr>\n<tr><td><b>1. Rechte der Verbraucher</b><br><i>Quyền của người tiêu dùng</i></td><td>1. Widerrufsrecht<br><i>Quyền hủy đơn hàng.</i><br>2. Garantie und Gewährleistung<br><i>Bảo hành &amp; bảo đảm chất lượng.</i><br>3. Transparenz bei Preisen<br><i>Minh bạch về giá cả.</i></td><td>1. „Kunde kann Online-Bestellung innerhalb 14 Tage stornieren.“<br><i>Khách có thể hủy đơn online trong 14 ngày.</i><br>2. „Defektes Produkt wird ersetzt.“<br><i>Sản phẩm hỏng được thay thế.</i><br>3. „Preise müssen klar auf Speisekarte stehen.“<br><i>Giá phải ghi rõ trong menu.</i></td></tr>\n<tr><td><b>2. Pflichten der Unternehmen</b><br><i>Nghĩa vụ của doanh nghiệp</i></td><td>1. Informationspflicht<br><i>Nghĩa vụ cung cấp thông tin.</i><br>2. Produktsicherheit gewährleisten<br><i>Bảo đảm an toàn sản phẩm.</i><br>3. Einhaltung von Verträgen<br><i>Tuân thủ hợp đồng.</i></td><td>1. „Subway informiert über Allergene.“<br><i>Subway cung cấp thông tin về chất gây dị ứng.</i><br>2. „Nur sichere Zutaten verwenden.“<br><i>Chỉ dùng nguyên liệu an toàn.</i><br>3. „Lieferant muss pünktlich liefern.“<br><i>Nhà cung cấp phải giao đúng hạn.</i></td></tr>\n<tr><td><b>3. Vertragsabschluss</b><br><i>Ký kết hợp đồng</i></td><td>1. Angebot und Annahme<br><i>Đề nghị &amp; chấp nhận.</i><br>2. Formfreiheit<br><i>Tự do về hình thức.</i><br>3. Verbindlichkeit<br><i>Tính ràng buộc.</i></td><td>1. „Kunde bestellt Menü = Angebot angenommen.“<br><i>Khách đặt combo = chấp nhận đề nghị.</i><br>2. „Mündliche Vereinbarung ist gültig.“<br><i>Thỏa thuận miệng vẫn có hiệu lực.</i><br>3. „Liefervertrag ist bindend.“<br><i>Hợp đồng giao hàng có tính ràng buộc.</i></td></tr>\n<tr><td><b>4. Produkthaftung</b><br><i>Trách nhiệm sản phẩm</i></td><td>1. Unternehmen haftet für Fehler<br><i>Doanh nghiệp chịu trách nhiệm cho lỗi.</i><br>2. Schutz der Verbraucher<br><i>Bảo vệ người tiêu dùng.</i><br>3. Folgeschäden berücksichtigen<br><i>Cân nhắc thiệt hại phát sinh.</i></td><td>1. „Kunde erkrankt wegen verdorbenem Essen.“<br><i>Khách bị bệnh vì đồ ăn hỏng.</i><br>2. „Unternehmen zahlt Schadensersatz.“<br><i>Doanh nghiệp phải bồi thường.</i><br>3. „Produktrückruf bei Gefahr.“<br><i>Thu hồi sản phẩm khi có nguy cơ.</i></td></tr>\n<tr><td><b>5. Werbung und Marketing</b><br><i>Quảng cáo &amp; tiếp thị</i></td><td>1. Wahrheitspflicht<br><i>Nghĩa vụ trung thực.</i><br>2. Keine Täuschung<br><i>Không được lừa dối.</i><br>3. Jugendschutz beachten<br><i>Tuân thủ luật bảo vệ thanh thiếu niên.</i></td><td>1. „Aktion: 2 Sandwiches zum Preis von 1.“<br><i>Khuyến mãi: mua 2 bánh mì giá 1.</i><br>2. „Keine falschen Versprechen machen.“<br><i>Không được hứa sai sự thật.</i><br>3. „Keine Alkoholwerbung für Jugendliche.“<br><i>Không quảng cáo rượu cho thanh thiếu niên.</i></td></tr>\n</table>\n<h3>B. Wichtige Hinweise – Điểm lưu ý quan trọng</h3>\n<table><tr><th>Deutsch</th><th>Tiếng Việt</th><th>Ghi chú</th></tr>\n<tr><td>Verbraucherrechte sichern Fairness.</td><td>Quyền người tiêu dùng đảm bảo công bằng.</td><td>Wichtig: Widerrufsrecht, Garantie. Quan trọng: quyền hủy đơn, bảo hành.</td></tr>\n<tr><td>Unternehmen haben Informationspflicht.</td><td>Doanh nghiệp có nghĩa vụ cung cấp thông tin.</td><td>Z. B. Allergene im Essen. Ví dụ: thông tin dị ứng trong thực phẩm.</td></tr>\n<tr><td>Vertragsabschluss ist alltäglich.</td><td>Ký kết hợp đồng diễn ra hằng ngày.</td><td>Auch beim Kauf im Laden oder Restaurant. Ngay cả khi mua hàng tại cửa hàng/nhà hàng.</td></tr>\n<tr><td>Produkthaftung schützt den Kunden.</td><td>Trách nhiệm sản phẩm bảo vệ khách hàng.</td><td>Unternehmen haftet auch bei Folgeschäden. Doanh nghiệp chịu trách nhiệm cả với thiệt hại phát sinh.</td></tr>\n<tr><td>Werbung darf nicht täuschen.</td><td>Quảng cáo không được lừa dối.</td><td>Täuschung = Abmahnung, Strafe. Lừa dối = bị kiện, bị phạt.</td></tr>\n<tr><td>Jugendschutz ist zwingend einzuhalten.</td><td>Luật bảo vệ thanh thiếu niên bắt buộc tuân thủ.</td><td>Kein Alkohol, keine Tabakwerbung. Không quảng cáo rượu, thuốc lá.</td></tr>\n<tr><td>Thema oft in Prüfungen: Vertragsrecht + Verbraucherrechte.</td><td>Chủ đề thường ra thi: luật hợp đồng + quyền người tiêu dùng.</td><td>Besonders im WISO-Schriftteil. Thường xuất hiện trong phần thi viết WISO.</td></tr>\n</table>",
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
          "name": "WiSo Thema 8 · Rechtsgeschäfte (Giao dịch pháp lý)",
          "desc": "Rechtsfähigkeit · Geschäftsfähigkeit · Vertragsschluss · Anfechtung · Nichtigkeit",
          "content": "<h2>WiSo Thema 8 · Rechtsgeschäfte</h2>\n<div class=\"hint\">Giao dịch pháp lý · Quelle: Fach Wiso (Theorie) · 5 Punkte, je 3 Theorie-Inhalte + Beispiele</div>\n<h3>A. Theorie &amp; Beispiele (5 Punkte)</h3>\n<table><tr><th>Punkt</th><th>Theorie – Lý thuyết</th><th>Beispiel – Ví dụ</th></tr>\n<tr><td><b>1. Rechtsfähigkeit</b><br><i>Năng lực pháp luật</i></td><td>1. Jeder Mensch von Geburt an<br><i>Mọi người có năng lực pháp luật từ khi sinh ra.</i><br>2. Fähigkeit, Rechte und Pflichten zu haben<br><i>Có quyền &amp; nghĩa vụ.</i><br>3. Endet mit dem Tod<br><i>Kết thúc khi chết.</i></td><td>1. „Azubi darf Eigentum besitzen.“<br><i>Học viên có thể sở hữu tài sản.</i><br>2. „Mitarbeiter hat Anspruch auf Lohn.“<br><i>Nhân viên có quyền nhận lương.</i><br>3. „Nach Tod keine Rechtsfähigkeit mehr.“<br><i>Sau khi chết thì không còn năng lực pháp luật.</i></td></tr>\n<tr><td><b>2. Geschäftsfähigkeit</b><br><i>Năng lực hành vi dân sự</i></td><td>1. Volle Geschäftsfähigkeit ab 18<br><i>Đủ năng lực từ 18 tuổi.</i><br>2. Beschränkte Geschäftsfähigkeit: 7–17 Jahre<br><i>Năng lực hạn chế từ 7–17 tuổi.</i><br>3. Geschäftsunfähigkeit unter 7 Jahre<br><i>Không có năng lực dưới 7 tuổi.</i></td><td>1. „Azubi mit 19 schließt Vertrag selbst.“<br><i>Học viên 19 tuổi tự ký hợp đồng.</i><br>2. „16-Jähriger braucht Zustimmung Eltern.“<br><i>Người 16 tuổi cần cha mẹ đồng ý.</i><br>3. „Kind mit 6 darf keinen Vertrag schließen.“<br><i>Trẻ 6 tuổi không thể ký hợp đồng.</i></td></tr>\n<tr><td><b>3. Vertragsschluss</b><br><i>Giao kết hợp đồng</i></td><td>1. Angebot + Annahme<br><i>Đề nghị + chấp nhận.</i><br>2. Übereinstimmende Willenserklärung<br><i>Thỏa thuận ý chí.</i><br>3. Rechtsbindungswille<br><i>Ý chí ràng buộc pháp lý.</i></td><td>1. „Kunde bestellt Menü = Angebot angenommen.“<br><i>Khách đặt combo = chấp nhận đề nghị.</i><br>2. „Lieferant und Subway schließen Vertrag.“<br><i>Nhà cung cấp và Subway ký hợp đồng.</i><br>3. „Mitarbeiter akzeptiert Arbeitsvertrag.“<br><i>Nhân viên đồng ý hợp đồng lao động.</i></td></tr>\n<tr><td><b>4. Anfechtung</b><br><i>Hủy bỏ hợp đồng</i></td><td>1. Bei Irrtum möglich<br><i>Có thể khi nhầm lẫn.</i><br>2. Bei Täuschung möglich<br><i>Có thể khi bị lừa dối.</i><br>3. Frist muss eingehalten werden<br><i>Phải tuân thủ thời hạn.</i></td><td>1. „Preis falsch angegeben → Vertrag anfechtbar.“<br><i>Giá ghi sai → có thể hủy hợp đồng.</i><br>2. „Kunde wurde getäuscht.“<br><i>Khách bị lừa dối.</i><br>3. „Anfechtung innerhalb 14 Tage.“<br><i>Hủy hợp đồng trong vòng 14 ngày.</i></td></tr>\n<tr><td><b>5. Nichtigkeit</b><br><i>Vô hiệu hợp đồng</i></td><td>1. Gesetzeswidrig<br><i>Trái luật.</i><br>2. Sittenwidrig<br><i>Trái đạo đức xã hội.</i><br>3. Formmangel<br><i>Sai hình thức bắt buộc.</i></td><td>1. „Drogenhandel-Vertrag = nichtig.“<br><i>Hợp đồng buôn ma túy = vô hiệu.</i><br>2. „Wucherzinsen = sittenwidrig.“<br><i>Cho vay nặng lãi = trái đạo đức.</i><br>3. „Kaufvertrag ohne Schriftform (bei Pflicht) = nichtig.“<br><i>Hợp đồng mua bán không có văn bản (khi luật bắt buộc) = vô hiệu.</i></td></tr>\n</table>\n<h3>B. Wichtige Hinweise – Điểm lưu ý quan trọng</h3>\n<table><tr><th>Deutsch</th><th>Tiếng Việt</th><th>Ghi chú</th></tr>\n<tr><td>Rechtsfähigkeit hat jeder Mensch.</td><td>Mọi người đều có năng lực pháp luật.</td><td>Von Geburt bis Tod. Từ khi sinh đến khi chết.</td></tr>\n<tr><td>Geschäftsfähigkeit hängt vom Alter ab.</td><td>Năng lực hành vi phụ thuộc vào độ tuổi.</td><td>&lt; 7 = unfähig, 7–17 = beschränkt, ab 18 = voll. &lt;7 = không có, 7–17 = hạn chế, từ 18 = đầy đủ.</td></tr>\n<tr><td>Jeder Vertrag braucht Angebot + Annahme.</td><td>Mọi hợp đồng cần có đề nghị + chấp nhận.</td><td>Ohne Übereinstimmung = kein Vertrag. Không có đồng thuận = không có hợp đồng.</td></tr>\n<tr><td>Anfechtung schützt vor Fehlern und Täuschung.</td><td>Hủy hợp đồng bảo vệ khỏi sai sót &amp; lừa dối.</td><td>Nur innerhalb bestimmter Frist gültig. Chỉ có hiệu lực trong thời hạn nhất định.</td></tr>\n<tr><td>Nichtigkeit macht Vertrag von Anfang an ungültig.</td><td>Vô hiệu = hợp đồng không có giá trị từ đầu.</td><td>Z. B. Gesetzesverstoß, Formmangel. Ví dụ: trái luật, sai hình thức.</td></tr>\n<tr><td>Verträge sind Prüfungsstoff Nr. 1.</td><td>Hợp đồng là chủ đề số 1 trong thi WISO.</td><td>Oft in schriftlichen Aufgaben. Thường xuất hiện trong phần thi viết.</td></tr>\n<tr><td>Praxis: Arbeitsverträge, Kaufverträge, Lieferverträge.</td><td>Thực tế: hợp đồng lao động, mua bán, giao hàng.</td><td>Diese Beispiele kommen in Prüfungen oft. Các ví dụ này thường ra trong thi.</td></tr>\n</table>",
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
          "name": "WiSo Thema 9 · Weltwirtschaftliche Verflechtungen (Liên kết kinh tế toàn cầu)",
          "desc": "Globalisierung · Außenhandel · Europäische Union (EU) · Internationale Organisationen · Chancen und Risiken",
          "content": "<h2>WiSo Thema 9 · Weltwirtschaftliche Verflechtungen</h2>\n<div class=\"hint\">Liên kết kinh tế toàn cầu · Quelle: Fach Wiso (Theorie) · 5 Punkte, je 3 Theorie-Inhalte + Beispiele</div>\n<h3>A. Theorie &amp; Beispiele (5 Punkte)</h3>\n<table><tr><th>Punkt</th><th>Theorie – Lý thuyết</th><th>Beispiel – Ví dụ</th></tr>\n<tr><td><b>1. Globalisierung</b><br><i>Toàn cầu hóa</i></td><td>1. Weltweite Vernetzung<br><i>Kết nối toàn cầu.</i><br>2. Waren- und Dienstleistungsaustausch<br><i>Trao đổi hàng hóa &amp; dịch vụ.</i><br>3. Internationale Arbeitsteilung<br><i>Phân công lao động quốc tế.</i></td><td>1. „Subway hat Filialen weltweit.“<br><i>Subway có chi nhánh toàn cầu.</i><br>2. „Kaffee wird aus Brasilien importiert.“<br><i>Cà phê nhập khẩu từ Brazil.</i><br>3. „Arbeitskleidung aus Asien hergestellt.“<br><i>Đồng phục được sản xuất ở châu Á.</i></td></tr>\n<tr><td><b>2. Außenhandel</b><br><i>Ngoại thương</i></td><td>1. Export von Waren<br><i>Xuất khẩu hàng hóa.</i><br>2. Import von Rohstoffen<br><i>Nhập khẩu nguyên liệu.</i><br>3. Handelsbilanz beachten<br><i>Lưu ý cán cân thương mại.</i></td><td>1. „Deutschland exportiert Maschinen.“<br><i>Đức xuất khẩu máy móc.</i><br>2. „Deutschland importiert Bananen.“<br><i>Đức nhập khẩu chuối.</i><br>3. „Mehr Export als Import = Überschuss.“<br><i>Xuất nhiều hơn nhập = thặng dư.</i></td></tr>\n<tr><td><b>3. Europäische Union (EU)</b><br><i>Liên minh châu Âu</i></td><td>1. Binnenmarkt ohne Grenzen<br><i>Thị trường chung không biên giới.</i><br>2. Freier Waren- und Personenverkehr<br><i>Tự do lưu thông hàng hóa &amp; con người.</i><br>3. Gemeinsame Währung (Euro)<br><i>Đồng tiền chung (Euro).</i></td><td>1. „Azubi kann in jedem EU-Land arbeiten.“<br><i>Học viên có thể làm việc ở bất kỳ nước EU nào.</i><br>2. „Waren frei zwischen Deutschland und Frankreich.“<br><i>Hàng hóa tự do giữa Đức và Pháp.</i><br>3. „Subway in EU rechnet in Euro ab.“<br><i>Subway tại EU tính bằng Euro.</i></td></tr>\n<tr><td><b>4. Internationale Organisationen</b><br><i>Tổ chức quốc tế</i></td><td>1. WTO: Freihandel fördern<br><i>WTO: thúc đẩy tự do thương mại.</i><br>2. ILO: Arbeitsrechte sichern<br><i>ILO: đảm bảo quyền lao động.</i><br>3. UNO: Globale Zusammenarbeit<br><i>LHQ: hợp tác toàn cầu.</i></td><td>1. „WTO senkt Zölle.“<br><i>WTO giảm thuế quan.</i><br>2. „ILO schützt Kinder vor Kinderarbeit.“<br><i>ILO bảo vệ trẻ em khỏi lao động trẻ em.</i><br>3. „UNO hilft bei Krisen weltweit.“<br><i>LHQ giúp đỡ trong khủng hoảng toàn cầu.</i></td></tr>\n<tr><td><b>5. Chancen und Risiken</b><br><i>Cơ hội &amp; rủi ro</i></td><td>1. Neue Märkte erschließen<br><i>Mở ra thị trường mới.</i><br>2. Konkurrenz steigt<br><i>Cạnh tranh tăng.</i><br>3. Abhängigkeit von anderen Ländern<br><i>Phụ thuộc vào quốc gia khác.</i></td><td>1. „Subway expandiert nach Asien.“<br><i>Subway mở rộng sang châu Á.</i><br>2. „Mehr Konkurrenz durch internationale Ketten.“<br><i>Cạnh tranh tăng do chuỗi quốc tế.</i><br>3. „Lieferprobleme bei Importwaren.“<br><i>Gặp vấn đề cung ứng khi nhập khẩu.</i></td></tr>\n</table>\n<h3>B. Wichtige Hinweise – Điểm lưu ý quan trọng</h3>\n<table><tr><th>Deutsch</th><th>Tiếng Việt</th><th>Ghi chú</th></tr>\n<tr><td>Globalisierung betrifft alle Branchen.</td><td>Toàn cầu hóa ảnh hưởng đến mọi ngành.</td><td>Besonders Gastronomie: Zutaten weltweit. Đặc biệt ngành ẩm thực: nguyên liệu từ khắp nơi.</td></tr>\n<tr><td>Außenhandel ist Grundlage für Wohlstand.</td><td>Ngoại thương là nền tảng cho sự thịnh vượng.</td><td>Deutschland exportiert viel, Import auch wichtig. Đức xuất khẩu nhiều, nhập khẩu cũng quan trọng.</td></tr>\n<tr><td>EU bedeutet Freiheit und gemeinsame Regeln.</td><td>EU mang lại tự do &amp; luật chung.</td><td>Binnenmarkt = keine Zölle, freier Verkehr. Thị trường chung = không thuế, tự do lưu thông.</td></tr>\n<tr><td>Internationale Organisationen fördern Stabilität.</td><td>Tổ chức quốc tế thúc đẩy ổn định.</td><td>WTO = Handel, ILO = Arbeit, UNO = Frieden. WTO = thương mại, ILO = lao động, LHQ = hòa bình.</td></tr>\n<tr><td>Chancen und Risiken immer abwägen.</td><td>Luôn cân nhắc cơ hội &amp; rủi ro.</td><td>Mehr Märkte = mehr Gewinn, aber auch mehr Konkurrenz. Nhiều thị trường = nhiều lợi nhuận, nhưng cũng nhiều cạnh tranh.</td></tr>\n<tr><td>Abhängigkeit ist gefährlich.</td><td>Phụ thuộc quá nhiều là nguy hiểm.</td><td>Lieferengpässe wie bei Corona-Krise. Ví dụ: đứt gãy chuỗi cung ứng trong dịch Corona.</td></tr>\n<tr><td>Thema sehr prüfungsrelevant.</td><td>Chủ đề này rất quan trọng trong kỳ thi.</td><td>Oft Fragen zu EU, WTO und Globalisierung. Thường có câu hỏi về EU, WTO và toàn cầu hóa.</td></tr>\n</table>",
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
      "q": "Mô hình Duales System kết hợp 2 địa điểm đào tạo nào?",
      "opts": [
        "Trường đại học và Công ty",
        "Ausbildungsbetrieb và Berufsschule",
        "Bộ Lao động và IHK",
        "Trường phổ thông và Trung tâm dạy nghề"
      ],
      "a": 1,
      "ex": "Ausbildungsbetrieb (thực hành) và Berufsschule (lý thuyết)."
    },
    {
      "theme": "wiko-rechte-pflichten",
      "cat": "WiKO",
      "q": "Viết Berichtsheft (Sổ nhật ký học nghề) thuộc về nghĩa vụ nào?",
      "opts": [
        "Nghĩa vụ doanh nghiệp",
        "Nghĩa vụ học tập bắt buộc của Azubi",
        "Không bắt buộc",
        "Nghĩa vụ của IHK"
      ],
      "a": 1,
      "ex": "Berichtsheftführung là nghĩa vụ bắt buộc của Azubi để được dự thi tốt nghiệp."
    },
    {
      "theme": "wiko-ausbildungsvertrag",
      "cat": "WiKO",
      "q": "Thời gian thử việc (Probezeit) trong Hợp đồng đào tạo nghề theo BBiG là bao lâu?",
      "opts": [
        "Tối đa 6 tháng",
        "Từ 1 đến 4 tháng",
        "Không có thử việc",
        "Tối đa 1 năm"
      ],
      "a": 1,
      "ex": "Mindestens 1 bis höchstens 4 Monate (§ 20 BBiG)."
    },
    {
      "theme": "wiko-probezeit-ueberwachung",
      "cat": "WiKO",
      "q": "Trong thời gian thử việc, việc sa thải/thôi học diễn ra như thế nào?",
      "opts": [
        "Báo trước 4 tuần",
        "Bất kỳ lúc nào, không cần thời hạn báo trước và không cần nêu lý do",
        "Phải qua Tòa lao động",
        "Phải được IHK đồng ý"
      ],
      "a": 1,
      "ex": "Probezeit: Ohne Einhaltung einer Frist und ohne Angabe von Gründen."
    },
    {
      "theme": "wiko-arbeitsschutz",
      "cat": "WiKO",
      "q": "Thời gian nghỉ giữa 2 ca làm việc (Ruhezeit) theo Luật Arbeitszeitgesetz tối thiểu là bao nhiêu?",
      "opts": [
        "8 giờ",
        "10 giờ",
        "11 giờ liên tục",
        "12 giờ"
      ],
      "a": 2,
      "ex": "Mindestens 11 Stunden ununterbrochene Ruhezeit (§ 5 ArbZG)."
    },
    {
      "theme": "wiko-fragen-agg",
      "cat": "WiKO",
      "q": "Nếu nhà tuyển dụng hỏi câu hỏi bị cấm (như mang thai, tôn giáo), ứng viên có quyền gì theo AGG?",
      "opts": [
        "Bắt buộc trả lời thật",
        "Quyền được nói dối (Recht zur Lüge)",
        "Bị hủy phỏng vấn",
        "Phải nộp phạt"
      ],
      "a": 1,
      "ex": "Recht zur Lüge bei unzulässigen Fragen."
    },
    {
      "theme": "wiko-kuendigung-frist",
      "cat": "WiKO",
      "q": "Hình thức thông báo sa thải hợp pháp theo § 623 BGB bắt buộc phải là gì?",
      "opts": [
        "Email",
        "SMS/Zalo",
        "Văn bản giấy có chữ ký tay (Schriftform)",
        "Nói bằng lời"
      ],
      "a": 2,
      "ex": "Schriftform mit eigenhändiger Unterschrift (§ 623 BGB)."
    },
    {
      "theme": "wiko-kuendigungsschutz",
      "cat": "WiKO",
      "q": "Thời hạn nộp đơn kiện sa thải lên Tòa án Lao động (Arbeitsgericht) là bao lâu?",
      "opts": [
        "1 tuần",
        "2 tuần",
        "3 tuần kể từ khi nhận đơn sa thải bằng văn bản",
        "1 tháng"
      ],
      "a": 2,
      "ex": "3-Wochen-Klagefrist nach § 4 KSchG."
    },
    {
      "theme": "wiko-betriebsrat-mitbestimmung",
      "cat": "WiKO",
      "q": "Quy định xếp lịch làm việc (Dienstplan) thuộc cấp độ Mitbestimmung nào của Betriebsrat?",
      "opts": [
        "Reine Information",
        "Anhörung",
        "Echte Mitbestimmung (Đồng quyết định bắt buộc)",
        "Không có quyền"
      ],
      "a": 2,
      "ex": "Echte Mitbestimmung bei Arbeitszeit und Dienstplänen (§ 87 BetrVG)."
    },
    {
      "theme": "wiko-tarifvertrag",
      "cat": "WiKO",
      "q": "Nguyên tắc Günstigkeitsprinzip (§ 4 Abs. 3 TVG) cho phép điều gì?",
      "opts": [
        "HĐLĐ cá nhân luôn đè lên Tarifvertrag",
        "HĐLĐ cá nhân chỉ được khác Tarifvertrag khi có lợi hơn cho NLĐ",
        "Tarifvertrag không có hiệu lực",
        "Chính phủ quyết định mức lương"
      ],
      "a": 1,
      "ex": "Günstigkeitsprinzip: Abweichungen nur zugunsten des Arbeitnehmers."
    },
    {
      "theme": "wiko-lohnabrechnung-sozial",
      "cat": "WiKO",
      "q": "Quỹ bảo hiểm xã hội nào do Chủ doanh nghiệp chi trả 100% kinh phí?",
      "opts": [
        "Krankenversicherung",
        "Rentenversicherung",
        "Unfallversicherung",
        "Arbeitslosenversicherung"
      ],
      "a": 2,
      "ex": "Unfallversicherung do Berufsgenossenschaft quản lý do chủ trả 100%."
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
      teacher: "BSI (Brunnenkant)",
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
    <p>📞 <b>Telefon-Reservierung:</b> Höchstens <b>3× läuten</b> lassen; Formel: <i>Betriebsname + eigener Name</i>. Notieren: Tag, Datum, Uhrzeit, Personenanzahl, Name + Telefonnummer, Sonderwünsche. Tisch <b>15–20 Minuten</b> freihalten.</p>
    <p>→ Đặt bàn qua điện thoại: để chuông reo tối đa 3 lần; công thức chào: tên quán + tên mình. Ghi: ngày, giờ, số khách, tên + SĐT, yêu cầu đặc biệt. Giữ bàn 15–20 phút.</p>
    <p>→ Chào khách ngay khi bước vào, cười, nhìn vào mắt khách. Nhận giữ áo khoác. Hỏi khách có đặt bàn trước không.</p>
    <h3 class="sub">3. Platzierung — Reihenfolge beachten</h3>
    <p>Zum Tisch begleiten und Stühle anbieten. Reihenfolge: <b>Damen zuerst</b>, dann ältere Gäste, dann Herren — der <span class="term" data-de="Gastgeber" data-vi="chủ tiệc / người mời">Gastgeber</span> (Einladende) zuletzt.</p>
    <p>→ Dẫn khách vào bàn, kéo ghế mời ngồi. Thứ tự: phụ nữ trước, khách lớn tuổi, rồi đến nam giới — chủ tiệc ngồi cuối cùng.</p>
    <div class="hint">⚠️ HỌC THUỘC: Begrüßung sofort · Damen zuerst · Gastgeber zuletzt.</div>`,
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
    <div class="hint">⚠️ HỌC THUỘC: Ehrengast → Damen (alt vor jung) → Herren → Gastgeber · Wiederholen · Allergien notieren.</div>`,
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
    <p>🖼️ <a href="https://gmbh.vorarlberg.travel/wp-content/uploads/2023/07/Service-Wein-einschenken-bei-gedecktem-Tisch-mit-Hirschpfeffer-c-Angela-Lamprecht-Vorarlberg-Tourismus-Webqualitaet-1920x600.jpg" target="_blank" rel="noopener">Bild: Weinservice — Einschenken am gedeckten Tisch</a></p>
    <h3 class="sub">4. Nachservice</h3>
    <p>Nach kurzer Zeit nachfragen: <i>„Hat es Ihnen geschmeckt? Darf es noch etwas sein?"</i> Getränke <span class="term" data-de="nachschenken" data-vi="rót thêm">nachschenken</span>, leere Gläser/Teller im Blick behalten.</p>
    <p>→ Sau một lúc hỏi thăm khách có hài lòng không, rót thêm đồ uống, để ý ly đĩa đã hết.</p>
    <div class="hint">⚠️ HỌC THUỘC: Von RECHTS servieren · Damen zuerst · Nachfragen: „Hat es geschmeckt?"</div>`,
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
    <div class="hint">⚠️ HỌC THUỘC: Abräumen von rechts · erst wenn ALLE fertig · Rechnung nur auf Wunsch.</div>`,
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
    <p>🖼️ <a href="https://www.schoenstezeit.de/wp-content/uploads/2019/04/eindecken-haushirt.jpg" target="_blank" rel="noopener">Bild: Eindecken eines Restauranttischs</a> · 🎬 <a href="https://www.youtube.com/watch?v=nAHGmqA3p3s" target="_blank" rel="noopener">Video: Tisch richtig eindecken (HilfreichTV)</a></p>
    <div class="hint">⚠️ HỌC THUỘC: Messer RECHTS (Schneide innen) · Gabel LINKS · von außen nach innen.</div>`,
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
    <div class="hint">⚠️ HỌC THUỘC: Gläser OBEN RECHTS · Brotteller OBEN LINKS.</div>`,
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
    <p>🎬 <a href="https://www.youtube.com/watch?v=YtxTeLji5Lg" target="_blank" rel="noopener">Video: 1000 wichtige Sätze für Kellner:innen (sprichdeutsch)</a></p>
    <div class="hint">⚠️ HỌC THUỘC: Zuhören → Beraten → dezent verkaufen (nie aufdringlich).</div>`,
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
    <tr><th>#</th><th>Schritt</th><th>Nghĩa</th></tr>
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
    <div class="hint">⚠️ HỌC THUỘC: Zuhören → Entschuldigen → Lösen → Danken → Nachfassen. Nie streiten!</div>`,
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
    <tr><th>#</th><th>Gang</th><th>Ví dụ</th></tr>
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
    <div class="hint">⚠️ HỌC THUỘC: Fisch VOR Fleisch · Sorbet in der Mitte · Dessert VOR Käse.</div>`,
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
    <p>🎬 <a href="https://www.youtube.com/watch?v=nMXwJ05tLZk" target="_blank" rel="noopener">Video: Wie trägt man drei Teller richtig?</a> · <a href="https://www.youtube.com/watch?v=bFExAOpzPoo" target="_blank" rel="noopener">Video: 3 Teller tragen — Anleitung</a></p>
    <h3 class="sub">2. <span class="term" data-de="Eindecken" data-vi="trải thêm dao nĩa cho món tiếp theo">Eindecken</span> &amp; <span class="term" data-de="Ausdecken" data-vi="dọn bớt dao nĩa/đĩa đã dùng">Ausdecken</span></h3>
    <p>Zwischen den Gängen: benutztes Geschirr/Besteck <b>ausdecken</b> (abräumen), Besteck für den nächsten Gang <b>eindecken</b> (auflegen).</p>
    <p>→ Giữa các món: dọn đĩa/dụng cụ đã dùng, trải thêm dao nĩa cho món tiếp theo.</p>
    <h3 class="sub">3. <span class="term" data-de="Cloche" data-vi="nắp đậy đĩa (speiseglocke)">Cloche</span> (Speiseglocke)</h3>
    <p>Bei mehreren Gästen die Cloche <b>gleichzeitig</b> vor allen Gästen abheben.</p>

    <p>→ Khi nhiều khách, nhấc nắp đậy đĩa <b>đồng thời</b> trước mặt mọi người.</p>
    <h3 class="sub">4. Einschenken</h3>
    <p>Von <b>rechts einschenken</b>, <span class="term" data-de="Etikett" data-vi="nhãn chai">Etikett</span> der Flasche zum Gast zeigen.</p>
    <div class="hint">⚠️ HỌC THUỘC: Links tragen · rechts servieren · max. 3 Teller · Cloche gleichzeitig.</div>`,
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
    <p>🖼️ <a href="https://old.easterntabletop.com/Photos/Product/9410_2.jpg" target="_blank" rel="noopener">Bild: Cloche (Speiseglocke)</a></p>
    <div class="hint">⚠️ HỌC THUỘC: Amerikanisch = Teller fertig · Englisch = Tranchieren am Tisch · Französisch = Guéridon · Deutsch = Gast bedient sich selbst.</div>`,
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

