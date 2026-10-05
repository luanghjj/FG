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
        desc: "Năm 1: LF1 Beruf/Kommunikation · LF5 Service, Getränke, Bier/Wein, POS, Buffet | Năm 2: Fleisch & Produkte",
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
          }
        ],
        quiz: (w.BFK2_QUIZ || []).slice(), // themed bank from bfk2-quiz.js
      },
      {
        id: "deutsch",
        code: "D",
        name: "Deutsch",
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 12h18"/></svg>',
        accent: "#2563eb",
        soft: "#eff6ff",
        teacher: "Herrn Kling",
        examDate: "2026-07-16",
        ready: true,
        desc: "Visualisierung · Mindmap · Diagramme",
        external: "klassenarbeiten/deutsch.html",
        groups: [
          {
            id: "ka",
            badge: "KA",
            title: "Klassenarbeit",
            items: [
              {
                id: "visualisierung",
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2z"/></svg>',
                name: "Visualisierung",
                desc: "Mindmap, Diagramme, Text → Grafik",
                content: `<h2> Visualisierung</h2>
                  <div class="hint">Text → Grafik · Mindmap · Diagrammtypen · KA-Training</div>
                  <p><a class="btn" href="klassenarbeiten/deutsch.html">Deutsch-App öffnen (Theorie + Üben) →</a></p>
                  <h3 class="sub">1. Was ist Visualisierung?</h3>
                  <p><span class="term" data-de="Visualisierung" data-vi="trực quan hóa">Visualisierung</span> von Texten = Wesentliches als Grafik/Schaubild darstellen (nicht nur abschreiben).</p>
                  <h3 class="sub">2. Häufige Formen</h3>
                  <ul>
                    <li><span class="term" data-de="Mindmap" data-vi="sơ đồ tư duy">Mindmap</span> – Ideen/Struktur vom Zentrum aus</li>
                    <li><span class="term" data-de="Diagramm" data-vi="biểu đồ">Diagramm</span> – Kurve, Balken, Kreis, Fluss…</li>
                    <li><span class="term" data-de="Sachtext" data-vi="văn bản thông tin">Sachtext</span> → Kernaussagen markieren → passende Form wählen</li>
                  </ul>
                  <div class="note"> In der App: Theorie, Matching, Praxis &amp; 50+ Quizfragen zur KA.</div>
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
  "examDate": null,
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
    }
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
      examThemes: ["partizipation", "demokratie-gg", "gewaltenteilung", "grundrechte", "karikatur-methode"],
      examChecklist: [
        "Volksabstimmung (Initiative → Begehren → Entscheid)",
        "Repräsentative Demokratie",
        "Mehrheitsprinzip",
        "Gewaltenteilung",
        "Gewaltenverschränkung + Beispiele",
        "Menschen- und Bürgerrechte",
        "Karikatur interpretieren",
      ],
      pruefungen: [
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

