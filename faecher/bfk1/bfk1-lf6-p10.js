/* BfK-1 · LF6 · P10 — Schaumwein & Wein empfehlen */
(function(){
  window.toggleVi = function(){
    var wrap = document.querySelector('.schaumwein-skript-wrap') || document.querySelector('.wein-empfehlen-skript-wrap') || document.querySelector('.weine-skript-wrap') || document.querySelector('.bier-skript-wrap') || document.body;
    wrap.classList.toggle('hide-vi');
    var b = document.getElementById('viToggle');
    var hidden = wrap.classList.contains('hide-vi');
    if(b) b.textContent = hidden ? 'Tiếng Việt: TẮT' : 'Tiếng Việt: BẬT';
  };
  window.toggleAns = function(id){
    var e = document.getElementById(id);
    if(e) e.style.display = (e.style.display==='none'||!e.style.display) ? 'block' : 'none';
  };
})();

window.__LF6 = (window.__LF6 || []).concat([
{
  "id": "lf6-schaumwein",
  "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M8 22h8\"/><path d=\"M12 15v7\"/><path d=\"M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5z\"/><circle cx=\"12\" cy=\"6\" r=\"0.5\"/><circle cx=\"10\" cy=\"9\" r=\"0.5\"/><circle cx=\"14\" cy=\"10\" r=\"0.5\"/></svg>",
  "name": "LS04 · Schaumwein — Zusammenfassung",
  "nameVi": "Vang sủi — Sản xuất, Độ ngọt, Phân cấp 4 nước & Nhãn chai",
  "desc": "Definition · Perlwein vs. Schaumwein · 3 Herstellungsverfahren · Fachbegriffe · Süßegrade · Qualitätsstufen (DE, IT, ES, FR) · Etikett · Selbsttest",
  "source": "BFK 1 · LF07 LS04 · Getränke (Schaumwein)",
  "theory": "<div class=\"schaumwein-skript-wrap\">\n<style>\n\n.schaumwein-skript-wrap {\n  --ink:#1B1F2A; --paper:#F1ECDE; --paper2:#EAE3D0; --wax:#7A2E2E; --brass:#9C7A3C; --slate:#48586B; --line:#D8CFB8; --slateline:#c7d0da; --green:#5b7a52; --greenbg:#eef3ea;\n  --wine:#7A2E2E; --olive:#6f7d1c; --olive-soft:#eef1d2;\n  background: var(--paper);\n  color: var(--ink);\n  font-family: \"Source Serif 4\", Georgia, serif;\n  line-height: 1.65;\n  font-size: 16px;\n  border-radius: 14px;\n  overflow: hidden;\n  box-shadow: 0 2px 10px rgba(0,0,0,.08);\n  margin-bottom: 24px;\n  position: relative;\n}\n.schaumwein-skript-wrap * { box-sizing: border-box; }\n.schaumwein-skript-wrap header.cover {\n  padding: 40px 20px 30px; text-align: center; position: relative;\n  border-bottom: 3px double var(--brass);\n  background: linear-gradient(180deg, var(--paper2), var(--paper));\n}\n.schaumwein-skript-wrap header.cover .kicker {\n  font-family: \"IBM Plex Mono\", monospace; letter-spacing: .18em; font-size: .72rem;\n  text-transform: uppercase; color: var(--brass); margin-bottom: 10px;\n}\n.schaumwein-skript-wrap header.cover h1 {\n  font-family: \"Fraunces\", Georgia, serif; font-weight: 600; font-size: clamp(1.8rem, 4.5vw, 2.6rem);\n  margin: 0 0 8px; color: var(--ink); letter-spacing: -.01em;\n}\n.schaumwein-skript-wrap header.cover h1 em { font-style: italic; color: var(--wax); font-weight: 500; }\n.schaumwein-skript-wrap header.cover .subtitle-de { font-size: 1rem; color: var(--ink); margin: 4px 0; }\n.schaumwein-skript-wrap header.cover .subtitle-vi {\n  font-family: \"IBM Plex Sans\", sans-serif; font-size: .9rem; color: var(--slate);\n  margin: 2px 0 0; font-style: normal;\n}\n.schaumwein-skript-wrap header.cover .subtitle-vi:before { content: \"VI · \"; font-weight: 600; letter-spacing: .03em; color: var(--slate); opacity: .7; }\n.schaumwein-skript-wrap header.cover .exam-meta {\n  display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; margin-top: 14px;\n  font-family: \"IBM Plex Mono\", monospace; font-size: .7rem;\n}\n.schaumwein-skript-wrap header.cover .exam-meta span {\n  border: 1px solid var(--brass); color: var(--wax); padding: 3px 10px; border-radius: 20px;\n  letter-spacing: .04em;\n}\n.schaumwein-skript-wrap .legend {\n  max-width: 820px; margin: 18px auto 0; display: flex; gap: 14px; justify-content: center;\n  flex-wrap: wrap; align-items: center; font-family: \"IBM Plex Sans\", sans-serif; font-size: .8rem; color: var(--ink);\n}\n.schaumwein-skript-wrap .legend .item { display: flex; align-items: center; gap: 6px; }\n.schaumwein-skript-wrap .legend .swatch { width: 14px; height: 14px; border-radius: 2px; flex-shrink: 0; }\n.schaumwein-skript-wrap .legend .swatch.de { background: var(--wax); }\n.schaumwein-skript-wrap .legend .swatch.vi { background: var(--slate); }\n.schaumwein-skript-wrap .toggle-btn {\n  cursor: pointer; font-family: \"IBM Plex Mono\", monospace; font-size: .72rem; letter-spacing: .05em;\n  background: var(--ink); color: var(--paper); border: none; padding: 6px 12px; border-radius: 6px;\n  text-transform: uppercase; transition: .15s;\n}\n.schaumwein-skript-wrap .toggle-btn:hover { background: var(--wax); }\n.schaumwein-skript-wrap nav.spine {\n  position: sticky; top: 0; z-index: 10; background: var(--ink); color: var(--paper);\n  display: flex; gap: 0; overflow-x: auto; white-space: nowrap; padding: 0 10px;\n  box-shadow: 0 2px 10px rgba(0,0,0,.15);\n}\n.schaumwein-skript-wrap nav.spine a {\n  color: var(--paper); text-decoration: none; font-family: \"IBM Plex Mono\", monospace;\n  font-size: .72rem; letter-spacing: .03em; padding: 11px 12px; border-right: 1px solid rgba(255,255,255,.12);\n  opacity: .72; transition: .15s;\n}\n.schaumwein-skript-wrap nav.spine a:hover { opacity: 1; background: rgba(255,255,255,.06); color: #EFC9A0; }\n.schaumwein-skript-wrap nav.spine a.exam { color: #EFC9A0; opacity: .9; }\n.schaumwein-skript-wrap nav.spine .grp {\n  font-family: \"IBM Plex Mono\", monospace; font-size: .62rem; letter-spacing: .1em; text-transform: uppercase;\n  color: var(--brass); padding: 11px 8px 11px 12px; align-self: center; opacity: .9;\n}\n.schaumwein-skript-wrap main { max-width: 840px; margin: 0 auto; padding: 10px 20px 60px; }\n.schaumwein-skript-wrap section.chapter { padding: 40px 0 20px; border-bottom: 1px solid var(--line); scroll-margin-top: 54px; }\n.schaumwein-skript-wrap section.chapter:last-of-type { border-bottom: none; }\n.schaumwein-skript-wrap .chapter-head { display: flex; align-items: baseline; gap: 14px; margin-bottom: 6px; }\n.schaumwein-skript-wrap .chapter-num {\n  font-family: \"Fraunces\", Georgia, serif; font-weight: 700; font-size: 2.2rem; color: var(--brass);\n  line-height: 1; flex-shrink: 0;\n}\n.schaumwein-skript-wrap .chapter-title-de { font-family: \"Fraunces\", Georgia, serif; font-weight: 600; font-size: 1.4rem; color: var(--ink); margin: 0; }\n.schaumwein-skript-wrap .chapter-title-vi {\n  font-family: \"IBM Plex Sans\", sans-serif; font-size: .92rem; color: var(--slate); margin: 4px 0 0 54px;\n}\n.schaumwein-skript-wrap .chapter-title-vi:before { content: \"VI · \"; font-weight: 600; opacity: .7; }\n.schaumwein-skript-wrap .lf-tag {\n  font-family: \"IBM Plex Mono\", monospace; font-size: .62rem; letter-spacing: .1em; text-transform: uppercase;\n  background: var(--wax); color: var(--paper); padding: 3px 8px; border-radius: 4px; margin-left: auto; align-self: center;\n}\n.schaumwein-skript-wrap .block { margin: 14px 0 20px; }\n.schaumwein-skript-wrap .de {\n  position: relative; padding: 12px 16px 12px 18px; background: rgba(122,46,46,.045);\n  border-left: 3px solid var(--wax); border-radius: 0 6px 6px 0; font-size: .96rem;\n}\n.schaumwein-skript-wrap .de .tag {\n  font-family: \"IBM Plex Mono\", monospace; font-size: .64rem; letter-spacing: .12em;\n  text-transform: uppercase; color: var(--wax); display: block; margin-bottom: 4px; opacity: .85;\n}\n.schaumwein-skript-wrap .vi {\n  font-family: \"IBM Plex Sans\", sans-serif; font-size: .88rem; color: var(--slate);\n  padding: 8px 16px 4px 18px; border-left: 3px solid var(--slateline); margin-top: -4px;\n}\n.schaumwein-skript-wrap .vi .tag {\n  font-family: \"IBM Plex Mono\", monospace; font-size: .62rem; letter-spacing: .12em;\n  text-transform: uppercase; color: var(--slate); display: block; margin-bottom: 3px; opacity: .75;\n}\n.schaumwein-skript-wrap.hide-vi .vi,\n.schaumwein-skript-wrap.hide-vi .vi-sub,\n.schaumwein-skript-wrap.hide-vi .vi-cell,\n.schaumwein-skript-wrap.hide-vi .vi-mini,\n.schaumwein-skript-wrap.hide-vi .chapter-title-vi { display: none !important; }\n.schaumwein-skript-wrap ul, .schaumwein-skript-wrap ol { margin: 8px 0; padding-left: 24px; }\n.schaumwein-skript-wrap li { margin: 4px 0; font-size: .92rem; }\n.schaumwein-skript-wrap b, .schaumwein-skript-wrap strong { color: var(--ink); }\n.schaumwein-skript-wrap .vi b, .schaumwein-skript-wrap .vi strong { color: #324150; }\n.schaumwein-skript-wrap table.bier { width: 100%; border-collapse: collapse; margin: 14px 0; font-family: \"IBM Plex Sans\", sans-serif; font-size: .86rem; background: #fff; }\n.schaumwein-skript-wrap table.bier th { background: var(--ink); color: var(--paper); text-align: left; padding: 8px 10px; font-weight: 600; font-size: .78rem; text-transform: uppercase; }\n.schaumwein-skript-wrap table.bier td { border: 1px solid var(--line); padding: 8px 10px; vertical-align: top; }\n.schaumwein-skript-wrap table.bier tr:nth-child(even) td { background: var(--paper2); }\n.schaumwein-skript-wrap .warn {\n  background: #f7e9df; border-left: 4px solid var(--wax); border-radius: 0 6px 6px 0;\n  padding: 10px 14px; margin: 12px 0; font-size: .9rem;\n}\n.schaumwein-skript-wrap .warn .tag { font-family: \"IBM Plex Mono\", monospace; font-size: .64rem; letter-spacing: .1em; color: var(--wax); text-transform: uppercase; display: block; margin-bottom: 4px; }\n.schaumwein-skript-wrap .warn .vi { border: none; padding: 4px 0 0; margin: 0; }\n.schaumwein-skript-wrap .q { font-weight: 600; margin-bottom: 8px; font-size: .95rem; }\n.schaumwein-skript-wrap .ans {\n  background: var(--greenbg); border: 1px solid var(--green); border-radius: 8px;\n  padding: 10px 12px; margin: 10px 0; font-family: \"IBM Plex Sans\", sans-serif; font-size: .9rem; color: #2e4d28;\n}\n.schaumwein-skript-wrap footer {\n  text-align: center; padding: 32px 16px 50px; font-family: \"IBM Plex Sans\", sans-serif;\n  font-size: .8rem; color: var(--slate); border-top: 1px solid var(--line);\n}\n.schaumwein-skript-wrap footer .de { background: none; border: none; padding: 0; }\n.schaumwein-skript-wrap footer .vi { border: none; padding: 0; margin-top: 4px; }\n\n/* Styles specific to Schaumwein Etikett */\n.schaumwein-skript-wrap .etikett {\n  background: #fdf8ec; border: 2px solid var(--brass); outline: 1px solid var(--brass);\n  outline-offset: -8px; max-width: 400px; margin: 18px auto; padding: 26px 20px; text-align: center; color: var(--ink);\n}\n.schaumwein-skript-wrap .etikett .et-lage { font-size: .76rem; letter-spacing: .2em; text-transform: uppercase; color: var(--brass); font-family: \"IBM Plex Sans\", sans-serif; }\n.schaumwein-skript-wrap .etikett .et-sorte { font-family: \"Fraunces\", Georgia, serif; font-size: 1.8rem; font-weight: 600; margin: 6px 0 2px; }\n.schaumwein-skript-wrap .etikett .et-jahr { font-family: \"IBM Plex Mono\", monospace; font-size: .82rem; }\n.schaumwein-skript-wrap .etikett .et-qual { font-family: \"Fraunces\", Georgia, serif; font-size: 1.05rem; font-weight: 600; margin-top: 14px; }\n.schaumwein-skript-wrap .etikett .et-gebiet { font-family: \"Fraunces\", Georgia, serif; font-size: .95rem; }\n.schaumwein-skript-wrap .etikett .et-verfahren { font-style: italic; font-size: .82rem; margin-top: 8px; }\n.schaumwein-skript-wrap .etikett .et-row { display: flex; justify-content: space-between; margin-top: 14px; font-family: \"IBM Plex Sans\", sans-serif; font-size: .82rem; }\n.schaumwein-skript-wrap .etikett .et-ap { font-family: \"IBM Plex Mono\", monospace; font-size: .78rem; margin-top: 10px; }\n.schaumwein-skript-wrap .etikett .et-ab { font-size: .78rem; margin-top: 6px; font-family: \"IBM Plex Sans\", sans-serif; }\n.schaumwein-skript-wrap .badge {\n  display: inline-flex; align-items: center; justify-content: center; min-width: 18px; height: 18px;\n  border-radius: 50%; background: var(--wax); color: #fff; font-family: \"IBM Plex Sans\", sans-serif;\n  font-size: .68rem; font-weight: 600; vertical-align: middle; margin-left: 3px; padding: 0 3px;\n}\n.schaumwein-skript-wrap .legende ul { list-style: none; padding: 0; }\n.schaumwein-skript-wrap .legende li { margin: 6px 0; font-family: \"IBM Plex Sans\", sans-serif; font-size: .86rem; }\n.schaumwein-skript-wrap .et-caption { text-align: center; font-family: \"IBM Plex Sans\", sans-serif; font-size: .82rem; color: var(--slate); margin-top: 8px; }\n\n</style>\n\n<header class=\"cover\">\n  <div class=\"kicker\">Lernfeld 07 · LS04 · Lernskript</div>\n  <h1>§ <em>Schaumwein</em></h1>\n  <p class=\"subtitle-de\">Herstellung, Süßegrade, Qualitätsstufen, Etikett — mit Prüfungs-Check</p>\n  <p class=\"subtitle-vi\">Sản xuất, độ ngọt, phân cấp chất lượng, nhãn chai — kèm tự kiểm tra</p>\n  <div class=\"exam-meta\">\n    <span>BFK 1 · LF07 LS04</span><span>DE / VI zweisprachig</span>\n  </div>\n  <div class=\"legend\">\n    <div class=\"item\"><span class=\"swatch de\"></span> Deutsch (Original — luôn đọc trước)</div>\n    <div class=\"item\"><span class=\"swatch vi\"></span> Tiếng Việt (bản dịch — đọc sau để hiểu)</div>\n    <button class=\"toggle-btn\" id=\"viToggle\" onclick=\"toggleVi()\">Tiếng Việt: BẬT</button>\n  </div>\n</header>\n\n<nav class=\"spine\">\n  <span class=\"grp\">Kapitel</span>\n  <a href=\"#p1\">1 · Definition</a>\n  <a href=\"#p2\">2 · Perlwein</a>\n  <a href=\"#p3\">3 · Herstellung</a>\n  <a href=\"#p4\">4 · Begriffe</a>\n  <a href=\"#p5\">5 · Süßegrade</a>\n  <a href=\"#p6\">6 · 4 Länder</a>\n  <a href=\"#p7\">7 · Etikett</a>\n  <span class=\"grp\">Test</span>\n  <a href=\"#quiz\" class=\"exam\">Prüfungs-Check</a>\n</nav>\n\n<main>\n<section class=\"chapter\" id=\"p1\">\n  <div class=\"chapter-head\">\n    <span class=\"chapter-num\">§1</span>\n    <h2 class=\"chapter-title-de\">Schaumwein — Definition</h2>\n    <span class=\"lf-tag\">Getränke</span>\n  </div>\n  <p class=\"chapter-title-vi\">Rượu vang sủi — định nghĩa</p>\n\n  <div class=\"block\">\n    <div class=\"de\"><span class=\"tag\">Definition</span>Schaumwein ist ein Wein mit CO₂ — weiß, rosé oder rot. Mindestdruck: <strong>3 bar bei 20 °C</strong>. Mindestalkohol: <strong>9,5 % vol</strong>.</div>\n    <div class=\"vi\"><span class=\"tag\">VI</span>Rượu vang sủi là rượu vang chứa khí CO₂ — trắng, hồng hoặc đỏ. Áp suất tối thiểu: <strong>3 bar ở 20 °C</strong>. Cồn tối thiểu: <strong>9,5% vol</strong>.</div>\n  </div>\n  <div class=\"block\">\n    <div class=\"de\"><span class=\"tag\">CO₂ aus 1. Gärung</span>Méthode rurale / Asti-Methode. Handelsname: <strong>Aromatischer Qualitätsschaumwein</strong> (oder b.A.). Beispiele: Moscato spumante d'Asti, Clairette de Die.</div>\n    <div class=\"vi\"><span class=\"tag\">VI</span>CO₂ từ lần lên men thứ 1: phương pháp Méthode rurale / Asti. Tên thương mại: <strong>Aromatischer Qualitätsschaumwein</strong> (hoặc b.A.). Ví dụ: Moscato spumante d'Asti, Clairette de Die.</div>\n  </div>\n  <div class=\"block\">\n    <div class=\"de\"><span class=\"tag\">CO₂ aus 2. Gärung</span>Beispiele: Champagner, Winzersekt, Qualitätsschaumwein (= Sekt), Qualitätsschaumwein b.A.</div>\n    <div class=\"vi\"><span class=\"tag\">VI</span>CO₂ từ lần lên men thứ 2. Ví dụ: Champagner, Winzersekt, Qualitätsschaumwein (= Sekt), Qualitätsschaumwein b.A.</div>\n  </div>\n</section>\n\n<section class=\"chapter\" id=\"p2\">\n  <div class=\"chapter-head\">\n    <span class=\"chapter-num\">§2</span>\n    <h2 class=\"chapter-title-de\">Schaumwein vs. Perlwein</h2>\n    <span class=\"lf-tag\">Getränke</span>\n  </div>\n  <p class=\"chapter-title-vi\">Vang sủi vs vang sủi nhẹ (Perlwein)</p>\n\n  <div class=\"block\">\n    <div class=\"de\"><span class=\"tag\">Perlwein</span>Perlwein (auch Vino Frizzante) ist ein „leicht perlender\" Wein: nur <strong>1,0–2,5 bar bei 20 °C</strong>. Das CO₂ kann zugesetzt werden — es muss nicht aus der Gärung kommen.</div>\n    <div class=\"vi\"><span class=\"tag\">VI</span>Perlwein (còn gọi là Vino Frizzante) là vang \"sủi nhẹ\": chỉ <strong>1,0–2,5 bar ở 20 °C</strong>. CO₂ có thể được bơm thêm vào — không bắt buộc phải từ lên men.</div>\n  </div>\n  <div class=\"block\">\n    <div class=\"de\"><span class=\"tag\">Steuer &amp; Verschluss</span>Perlwein: <strong>keine Sektsteuer</strong> in Deutschland, meist Schraubverschluss. Schaumwein: <strong>Korkverschluss Pflicht</strong>.</div>\n    <div class=\"vi\"><span class=\"tag\">VI</span>Perlwein: <strong>không chịu thuế Sektsteuer</strong> ở Đức, thường dùng nắp vặn. Vang sủi: <strong>bắt buộc nút bần</strong>.</div>\n  </div>\n</section>\n\n<section class=\"chapter\" id=\"p3\">\n  <div class=\"chapter-head\">\n    <span class=\"chapter-num\">§3</span>\n    <h2 class=\"chapter-title-de\">Herstellung — 3 Verfahren</h2>\n    <span class=\"lf-tag\">Getränke</span>\n  </div>\n  <p class=\"chapter-title-vi\">Sản xuất — 3 phương pháp</p>\n\n  <div class=\"block\">\n    <div class=\"de\"><span class=\"tag\">Cuvée</span>Die Cuvée ist der Verschnitt von Grundweinen — aus verschiedenen Rebsorten oder Jahrgängen — für gleichbleibende Qualität und einen typischen Geschmack.</div>\n    <div class=\"vi\"><span class=\"tag\">VI</span>Cuvée là sự phối trộn các loại rượu vang cơ bản (Grundweine) — từ các giống nho hoặc niên vụ khác nhau — để đạt chất lượng ổn định và hương vị đặc trưng.</div>\n  </div>\n  <div class=\"block\">\n    <div class=\"de\"><span class=\"tag\">1 · Traditionelle Flaschengärung</span>Méthode Champenoise. Ablauf: <strong>Fülldosage</strong> (Hefe + Zucker) zur Cuvée geben → in Flaschen füllen, verschließen, waagerecht lagern → <strong>Rütteln</strong> auf dem Rüttelpult (täglich drehen + Neigung erhöhen, Hefe sinkt in den Flaschenhals) → <strong>Degorgieren</strong> (Flaschenhals tiefkühlen, Hefepfropfen gefriert, Druck schießt ihn heraus) → <strong>Versanddosage</strong> (Wein + Zucker: Süße einstellen + Verlust ausgleichen) → Korken + <strong>Agraffe</strong>. Hefelagerung: <strong>mind. 9 Monate</strong>.</div>\n    <div class=\"vi\"><span class=\"tag\">VI</span>Phương pháp lên men trong chai truyền thống. Quy trình: thêm <strong>Fülldosage</strong> (men + đường) vào Cuvée → chiết vào chai, đậy nắp, để nằm ngang → <strong>Rütteln</strong> (xoay chai trên giá Rüttelpult: hàng ngày xoay + tăng dần độ dốc, cặn men lắng xuống cổ chai) → <strong>Degorgieren</strong> (làm lạnh sâu cổ chai, khối men đóng băng, áp suất đẩy khối men ra ngoài) → <strong>Versanddosage</strong> (rượu + đường: chỉnh độ ngọt + bù lượng hao hụt) → nút bần + <strong>Agraffe</strong> (khung dây thép). Thời gian ủ men: <strong>tối thiểu 9 tháng</strong>.</div>\n  </div>\n  <div class=\"block\">\n    <div class=\"de\"><span class=\"tag\">2 · Großraumgärung / Tankgärung</span>Die 2. Gärung läuft komplett im geschlossenen Drucktank. Danach: Enthefung durch Filtration → Versanddosage → Abfüllung unter Gegendruck. Hefelagerung: <strong>mind. 90 Tage</strong> (bei Rührtank).</div>\n    <div class=\"vi\"><span class=\"tag\">VI</span>Lên men lần 2 diễn ra hoàn toàn trong bồn kín chịu áp suất. Sau đó: tách cặn men bằng lọc → Versanddosage → chiết vào chai dưới áp suất đối ứng. Thời gian ủ men: <strong>tối thiểu 90 ngày</strong> (đối với bồn có cánh khuấy).</div>\n  </div>\n  <div class=\"block\">\n    <div class=\"de\"><span class=\"tag\">3 · Transvasierverfahren</span>Kombination: 2. Gärung in der Flasche wie bei der traditionellen Methode. Danach alles in einen Drucktank umfüllen, filtrieren, Versanddosage dazu, wieder abfüllen unter Gegendruck. Hefelagerung: <strong>mind. 90 Tage</strong>.</div>\n    <div class=\"vi\"><span class=\"tag\">VI</span>Phương pháp kết hợp: lên men lần 2 trong chai như phương pháp truyền thống. Sau đó xả toàn bộ dung dịch vào bồn chịu áp suất, lọc bỏ men, bổ sung Versanddosage, đóng chai lại dưới áp suất đối ứng. Thời gian ủ men: <strong>tối thiểu 90 ngày</strong>.</div>\n  </div>\n  <div class=\"warn\">\n    <span class=\"tag\">Merke</span>\n    Flaschengärung = 9 Monate. Tankgärung / Transvasier = 90 Tage.\n    <div class=\"vi\">Lên men trong chai = 9 tháng. Lên men bồn / Transvasier = 90 ngày.</div>\n  </div>\n</section>\n\n<section class=\"chapter\" id=\"p4\">\n  <div class=\"chapter-head\">\n    <span class=\"chapter-num\">§4</span>\n    <h2 class=\"chapter-title-de\">Fachbegriffe</h2>\n    <span class=\"lf-tag\">Getränke</span>\n  </div>\n  <p class=\"chapter-title-vi\">Thuật ngữ chuyên ngành</p>\n\n  <div class=\"block\">\n    <div class=\"de\"><span class=\"tag\">Cuvée</span>Verschnitt mehrerer Grundweine für eine Zielqualität und einen Zielgeschmack.</div>\n    <div class=\"vi\"><span class=\"tag\">VI</span>Hỗn hợp phối trộn nhiều rượu vang cơ bản để đạt phẩm chất và phong cách hương vị mục tiêu.</div>\n  </div>\n  <div class=\"block\">\n    <div class=\"de\"><span class=\"tag\">Fülldosage</span>Hefe + Zucker, zur Cuvée gegeben — startet die 2. Gärung.</div>\n    <div class=\"vi\"><span class=\"tag\">VI</span>Hỗn hợp men + đường thêm vào Cuvée — khởi động lần lên men thứ 2.</div>\n  </div>\n  <div class=\"block\">\n    <div class=\"de\"><span class=\"tag\">Degorgieren</span>Flaschenhals einfrieren und den Hefepfropfen nach dem Rütteln herausschießen lassen.</div>\n    <div class=\"vi\"><span class=\"tag\">VI</span>Đóng băng cổ chai và bật bỏ khối cặn men sau quá trình xoay chai.</div>\n  </div>\n  <div class=\"block\">\n    <div class=\"de\"><span class=\"tag\">Versanddosage</span>Wein + gelöster Zucker, nach dem Degorgieren zugegeben — bestimmt die endgültige Süße.</div>\n    <div class=\"vi\"><span class=\"tag\">VI</span>Hỗn hợp rượu + đường hòa tan, chêm vào sau khi loại bỏ cặn men — quyết định độ ngọt cuối cùng.</div>\n  </div>\n  <div class=\"block\">\n    <div class=\"de\"><span class=\"tag\">Agraffe</span>Drahtkorb, der den Korken auf der Schaumweinflasche festhält.</div>\n    <div class=\"vi\"><span class=\"tag\">VI</span>Khung dây thép giữ chặt nút bần trên miệng chai vang sủi.</div>\n  </div>\n</section>\n\n<section class=\"chapter\" id=\"p5\">\n  <div class=\"chapter-head\">\n    <span class=\"chapter-num\">§5</span>\n    <h2 class=\"chapter-title-de\">Süßegrade — Restzucker</h2>\n    <span class=\"lf-tag\">Getränke</span>\n  </div>\n  <p class=\"chapter-title-vi\">Độ ngọt — hàm lượng đường dư</p>\n\n  <table class=\"bier\">\n    <tr><th>Stufe</th><th>Deutsch</th><th>Englisch</th><th>Französisch</th><th>Restzucker</th></tr>\n    <tr><td>Kein Zucker</td><td>Brut Nature / Naturherb</td><td>Brut Nature</td><td>Brut Nature / Pas Dosé</td><td>≤ 3 g/l (kein Zucker nach der Gärung)</td></tr>\n    <tr><td>Fast nicht süß</td><td>Extra Herb</td><td>Extra Brut</td><td>Extra Brut</td><td>0–6 g/l</td></tr>\n    <tr><td>Sehr wenig süß</td><td>Herb</td><td>Brut</td><td>Brut</td><td>&lt; 12 g/l (bis 12 g/l)</td></tr>\n    <tr><td>Wenig süß</td><td>Extra Trocken</td><td>Extra Dry</td><td>Extra Sec</td><td>12–17 g/l</td></tr>\n    <tr><td>Mittelsüß</td><td>Trocken</td><td>Dry</td><td>Sec</td><td>17–32 g/l</td></tr>\n    <tr><td>Deutlich süß</td><td>Halbtrocken</td><td>Medium Dry</td><td>Demi-Sec</td><td>32–50 g/l</td></tr>\n    <tr><td>Sehr süß</td><td>Mild / Süß</td><td>Sweet</td><td>Doux</td><td>&gt; 50 g/l</td></tr>\n  </table>\n  <div class=\"vi\">Bảng: mức độ ngọt — tên tiếng Đức / Anh / Pháp — hàm lượng đường dư (Restzucker).</div>\n  <div class=\"warn\">\n    <span class=\"tag\">Falle!</span>\n    Extra Trocken (12–17 g/l) ist WENIGER süß als Trocken (17–32 g/l)!\n    <div class=\"vi\">Bẫy: Extra Trocken (12–17 g/l) ÍT ngọt hơn Trocken (17–32 g/l)!</div>\n  </div>\n</section>\n\n<section class=\"chapter\" id=\"p6\">\n  <div class=\"chapter-head\">\n    <span class=\"chapter-num\">§6</span>\n    <h2 class=\"chapter-title-de\">Qualitätsstufen — 4 Länder</h2>\n    <span class=\"lf-tag\">Getränke</span>\n  </div>\n  <p class=\"chapter-title-vi\">Phân cấp chất lượng — 4 nước</p>\n\n  <div class=\"block\">\n    <div class=\"de\"><span class=\"tag\">Deutschland — Schaumwein / Sekt</span><strong>Schaumwein (niedrigste Stufe):</strong> ≥ 3,0 bar; ≥ 9,5 % vol; keine Hefelagerung / Region vorgeschrieben; meist Tankgärung (z. B. Rotkäppchen Sekt, Henkell Freixenet). <strong>Qualitätsschaumwein (Sekt) / Sekt b.A. (mittlere Stufe):</strong> ≥ 3,5 bar; ≥ 10 % vol; Hefelagerung ≥ 90 Tage (Tank) oder ≥ 9 Monate (Flasche); Sekt b.A. aus einem bestimmten Anbaugebiet (z. B. Henkell Trocken, Mumm Extra Dry, Fürst von Metternich Riesling Sekt, Geldermann Grand Brut). <strong>Winzersekt (höchste Stufe):</strong> ≥ 3,5 bar; &gt; 10 % vol; Hefelagerung ≥ 9 Monate; 100 % Trauben vom eigenen Betrieb; nur traditionelle Flaschengärung.</div>\n    <div class=\"vi\"><span class=\"tag\">VI</span><strong>Đức — Schaumwein / Sekt:</strong> <strong>Schaumwein (cấp thấp nhất):</strong> ≥ 3,0 bar; ≥ 9,5% vol; không quy định ủ men &amp; vùng nguyên liệu; thường lên men bồn (ví dụ Rotkäppchen Sekt, Henkell Freixenet). <strong>Qualitätsschaumwein (Sekt) / Sekt b.A. (cấp trung bình):</strong> ≥ 3,5 bar; ≥ 10% vol; ủ men ≥ 90 ngày (bồn) hoặc ≥ 9 tháng (chai); Sekt b.A. phải từ vùng trồng chỉ định (ví dụ Henkell Trocken, Mumm Extra Dry, Fürst von Metternich Riesling Sekt, Geldermann Grand Brut). <strong>Winzersekt (cấp cao nhất):</strong> ≥ 3,5 bar; &gt; 10% vol; ủ men ≥ 9 tháng; 100% nho từ trang trại của chính nhà sản xuất; bắt buộc phương pháp Flaschengärung truyền thống.</div>\n  </div>\n  <div class=\"block\">\n    <div class=\"de\"><span class=\"tag\">Italien — Spumante</span><strong>Vino Spumante – VS (niedrigste Stufe):</strong> ≥ 3,0 bar; ≥ 9,5 % vol; keine Hefelagerung / Region (z. B. Asti Spumante aus Muskateller, Piemont). <strong>Vino Spumante di Qualità – VSQ (mittlere Stufe):</strong> ≥ 3,5 bar; ≥ 10 % vol; Hefelagerung ≥ 90 Tage; aus bestimmter Region; meist Tankgärung (z. B. Felsina Spumante Brut). <strong>DOC / DOCG Spumante (höchste Stufe):</strong> ≥ 3,5 bar; ≥ 10 % vol; Hefelagerung ≥ 9 Monate (oft länger); strenge Kontrolle von Region und Rebsorte (z. B. Prosecco Spumante DOC/DOCG aus Glera, Tankgärung; Franciacorta aus Chardonnay &amp; Pinot Nero, Flaschengärung ≥ 18 Monate).</div>\n    <div class=\"vi\"><span class=\"tag\">VI</span><strong>Ý — Spumante:</strong> <strong>Vino Spumante – VS (cấp thấp nhất):</strong> ≥ 3,0 bar; ≥ 9,5% vol; không quy định ủ men &amp; vùng trồng (ví dụ Asti Spumante từ nho Muskateller, vùng Piemont). <strong>Vino Spumante di Qualità – VSQ (cấp trung bình):</strong> ≥ 3,5 bar; ≥ 10% vol; ủ men ≥ 90 ngày; từ vùng xác định; thường lên men bồn (ví dụ Felsina Spumante Brut). <strong>DOC / DOCG Spumante (cấp cao nhất):</strong> ≥ 3,5 bar; ≥ 10% vol; ủ men ≥ 9 tháng (thường lâu hơn); kiểm soát nghiêm ngặt vùng trồng và giống nho (ví dụ Prosecco Spumante DOC/DOCG từ nho Glera, lên men bồn; Franciacorta từ Chardonnay &amp; Pinot Nero, lên men chai ≥ 18 tháng).</div>\n  </div>\n  <div class=\"block\">\n    <div class=\"de\"><span class=\"tag\">Spanien — Espumoso / Cava</span><strong>Vino Espumoso (niedrigste Stufe):</strong> ≥ 3,0 bar; ≥ 9,5 % vol; keine Hefelagerung / Region. <strong>Vino Espumoso de Calidad – VEQ (mittlere Stufe):</strong> ≥ 3,5 bar; ≥ 10 % vol; Hefelagerung ≥ 90 Tage; begrenzte Region. <strong>DO / DOP / DOC Espumoso – Cava (höchste Stufe):</strong> ≥ 3,5 bar; 11,5–12,0 % vol; über 90 % Trauben aus Penedès (Parellada, Xarel-lo, Macabeo); nur traditionelle Flaschengärung. Reifestufen: Cava de Guarda (≥ 9 Monate), Reserva (≥ 18 Monate), Gran Reserva (≥ 30 Monate), Paraje Calificado (≥ 36 Monate).</div>\n    <div class=\"vi\"><span class=\"tag\">VI</span><strong>Tây Ban Nha — Espumoso / Cava:</strong> <strong>Vino Espumoso (cấp thấp nhất):</strong> ≥ 3,0 bar; ≥ 9,5% vol; không quy định ủ men &amp; vùng. <strong>Vino Espumoso de Calidad – VEQ (cấp trung bình):</strong> ≥ 3,5 bar; ≥ 10% vol; ủ men ≥ 90 ngày; vùng giới hạn. <strong>DO / DOP / DOC Espumoso – Cava (cấp cao nhất):</strong> ≥ 3,5 bar; 11,5–12,0% vol; trên 90% nho từ vùng Penedès (Parellada, Xarel-lo, Macabeo); bắt buộc Flaschengärung truyền thống. Cấp độ ủ men: Cava de Guarda (≥ 9 tháng), Reserva (≥ 18 tháng), Gran Reserva (≥ 30 tháng), Paraje Calificado (≥ 36 tháng).</div>\n  </div>\n  <div class=\"block\">\n    <div class=\"de\"><span class=\"tag\">Frankreich — Vin Mousseux / Champagner</span><strong>Vin Mousseux – VM (niedrigste Stufe):</strong> ≥ 3,0 bar; ≥ 9,5 % vol; keine Hefelagerung. <strong>Vin Mousseux de Qualité – VMQ (mittlere Stufe):</strong> ≥ 3,5 bar; ≥ 10 % vol; Hefelagerung ≥ 90 Tage; bestimmte Region (z. B. Veuve du Vernay, Louis Perdrier). <strong>AOC Crémant &amp; AOC Champagner (höchste Stufe):</strong> ≥ 3,5 bar; 10–12,5 % vol; nur traditionelle Flaschengärung / Méthode Champenoise. Crémant: Hefelagerung ≥ 9 Monate, aus AOC-Regionen (z. B. Crémant d'Alsace, Crémant de Loire). Champagner: Hefelagerung ≥ 12 Monate, nur aus der Champagne, nur Chardonnay, Pinot Noir, Pinot Meunier (z. B. Moët &amp; Chandon, Veuve Clicquot).</div>\n    <div class=\"vi\"><span class=\"tag\">VI</span><strong>Pháp — Vin Mousseux / Champagner:</strong> <strong>Vin Mousseux – VM (cấp thấp nhất):</strong> ≥ 3,0 bar; ≥ 9,5% vol; không quy định ủ men. <strong>Vin Mousseux de Qualité – VMQ (cấp trung bình):</strong> ≥ 3,5 bar; ≥ 10% vol; ủ men ≥ 90 ngày; vùng quy định (ví dụ Veuve du Vernay, Louis Perdrier). <strong>AOC Crémant &amp; AOC Champagner (cấp cao nhất):</strong> ≥ 3,5 bar; 10–12,5% vol; bắt buộc Flaschengärung truyền thống / Méthode Champenoise. Crémant: ủ men ≥ 9 tháng, từ các vùng AOC (ví dụ Crémant d'Alsace, Crémant de Loire). Champagner: ủ men ≥ 12 tháng, độc quyền tại vùng Champagne, chỉ dùng Chardonnay, Pinot Noir, Pinot Meunier (ví dụ Moët &amp; Chandon, Veuve Clicquot).</div>\n  </div>\n</section>\n\n<section class=\"chapter\" id=\"p7\">\n  <div class=\"chapter-head\">\n    <span class=\"chapter-num\">§7</span>\n    <h2 class=\"chapter-title-de\">Schaumwein-Etikett</h2>\n    <span class=\"lf-tag\">Getränke</span>\n  </div>\n  <p class=\"chapter-title-vi\">Nhãn chai vang sủi</p>\n\n    <div class=\"block\">\n    <div class=\"de\"><span class=\"tag\">Beispiel-Etikett</span>Beispiel nach dem Muster aus dem Skript: Heilbronner Staufenberg Muskateller Deutscher Sekt b.A. — jede Zahl auf dem Etikett = eine Angabe (siehe Legende).</div>\n    <div class=\"vi\"><span class=\"tag\">VI</span>Nhãn mẫu theo ví dụ trong tài liệu: Heilbronner Staufenberg Muskateller Deutscher Sekt b.A. — mỗi số trên nhãn = một thông tin (xem chú thích bên dưới).</div>\n  </div>\n\n  <div class=\"etikett\">\n    <div class=\"et-lage\">Heilbronner Staufenberg <span class=\"badge\">11</span></div>\n    <div class=\"et-sorte\">Muskateller <span class=\"badge\">8</span></div>\n    <div class=\"et-jahr\">2016 <span class=\"badge\">9</span></div>\n    <div class=\"et-qual\">Deutscher Sekt b.A. <span class=\"badge\">1</span></div>\n    <div class=\"et-gebiet\">Württemberg <span class=\"badge\">2</span></div>\n    <div class=\"et-verfahren\">Flaschengärung <span class=\"badge\">10</span></div>\n    <div class=\"et-row\"><span>Trocken <span class=\"badge\">7</span></span><span>11,5 % vol <span class=\"badge\">5</span></span><span>0,75 l <span class=\"badge\">6</span></span></div>\n    <div class=\"et-ap\">A.P.Nr. 1 234 567 <span class=\"badge\">3</span></div>\n    <div class=\"et-ab\">Abfüller: Weingut Staufenberg, Heilbronn <span class=\"badge\">4</span></div>\n  </div>\n  <div class=\"et-caption\">Modell-Etikett nach dem Skript-Muster — kein echtes Markenetikett. A.P.Nr. und Alkoholgehalt sind Beispielwerte.</div>\n  <div class=\"et-caption\">Nhãn mẫu theo ví dụ trong tài liệu — không phải nhãn thật của hãng. A.P.Nr. và nồng độ cồn là giá trị ví dụ.</div>\n\n  <div class=\"legende\">\n    <p><strong>Pflichtangaben (bắt buộc — 7 mục):</strong></p>\n    <ul>\n      <li><span class=\"badge\">1</span> <strong>Deutscher Sekt b.A.</strong> — Qualitätsbezeichnung / tên chất lượng thương mại</li>\n      <li><span class=\"badge\">2</span> <strong>Württemberg</strong> — bestimmtes Anbaugebiet / vùng trồng chỉ định</li>\n      <li><span class=\"badge\">3</span> <strong>A.P.Nr.</strong> — amtliche Prüfnummer / mã kiểm định chất lượng</li>\n      <li><span class=\"badge\">4</span> <strong>Abfüller</strong> — Hersteller / nhà sản xuất, đơn vị đóng chai</li>\n      <li><span class=\"badge\">5</span> <strong>11,5 % vol</strong> — Alkohol / nồng độ cồn</li>\n      <li><span class=\"badge\">6</span> <strong>0,75 l</strong> — Flascheninhalt / dung tích chai</li>\n      <li><span class=\"badge\">7</span> <strong>Trocken</strong> — Süßegrad / chỉ số độ ngọt</li>\n    </ul>\n    <p><strong>Zulässige Angaben (được phép ghi thêm):</strong></p>\n    <ul>\n      <li><span class=\"badge\">8</span> <strong>Muskateller</strong> — Rebsorte / giống nho</li>\n      <li><span class=\"badge\">9</span> <strong>2016</strong> — Jahrgang / niên vụ thu hoạch</li>\n      <li><span class=\"badge\">10</span> <strong>Flaschengärung</strong> — Herstellungsverfahren / phương pháp sản xuất</li>\n      <li><span class=\"badge\">11</span> <strong>Heilbronner Staufenberg</strong> — Lage / thửa đất trồng</li>\n    </ul>\n  </div>\n\n<div class=\"warn\">\n    <span class=\"tag\">Regel</span>\n    Weinbau, Weingut, Winzer nur dann auf dem Etikett, wenn 100 % der Trauben und der gesamte Prozess im eigenen Betrieb stattfinden.\n    <div class=\"vi\">Các từ Weinbau, Weingut, Winzer chỉ được ghi trên nhãn khi 100% nho thu hoạch và toàn bộ quy trình làm rượu diễn ra tại chính trang trại/cơ sở đó.</div>\n  </div>\n</section>\n\n<section class=\"chapter\" id=\"quiz\">\n  <div class=\"chapter-head\">\n    <span class=\"chapter-num\"><svg viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" style=\"display:inline-block;vertical-align:-4px;\"><path d=\"M12 20h9\"/><path d=\"M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z\"/></svg></span>\n    <h2 class=\"chapter-title-de\">Prüfungs-Check — Selbsttest</h2>\n    <span class=\"lf-tag\">10 Fragen</span>\n  </div>\n  <p class=\"chapter-title-vi\">Tự kiểm tra — 10 câu</p>\n\n  <div class=\"block\">\n    <div class=\"q\"><strong>1.</strong> Was ist Schaumwein? (Druck + Alkohol)</div>\n    <button class=\"toggle-btn\" onclick=\"toggleAns('a1')\">Musterlösung anzeigen</button>\n    <div class=\"ans\" id=\"a1\" style=\"display:none\">Wein mit CO₂ (weiß, rosé oder rot), mind. 3 bar bei 20 °C, mind. 9,5 % vol.</div>\n  </div>\n  <div class=\"block\">\n    <div class=\"q\"><strong>2.</strong> Schaumwein vs. Perlwein: Druck, Sektsteuer, Verschluss?</div>\n    <button class=\"toggle-btn\" onclick=\"toggleAns('a2')\">Musterlösung anzeigen</button>\n    <div class=\"ans\" id=\"a2\" style=\"display:none\">Schaumwein: ≥ 3 bar, Korkverschluss Pflicht. Perlwein: 1,0–2,5 bar, keine Sektsteuer, meist Schraubverschluss.</div>\n  </div>\n  <div class=\"block\">\n    <div class=\"q\"><strong>3.</strong> Was ist eine Cuvée?</div>\n    <button class=\"toggle-btn\" onclick=\"toggleAns('a3')\">Musterlösung anzeigen</button>\n    <div class=\"ans\" id=\"a3\" style=\"display:none\">Verschnitt von Grundweinen (verschiedene Rebsorten / Jahrgänge) für gleichbleibende Qualität und typischen Geschmack.</div>\n  </div>\n  <div class=\"block\">\n    <div class=\"q\"><strong>4.</strong> Nenne die 3 Verfahren der 2. Gärung + Hefelagerung.</div>\n    <button class=\"toggle-btn\" onclick=\"toggleAns('a4')\">Musterlösung anzeigen</button>\n    <div class=\"ans\" id=\"a4\" style=\"display:none\">Traditionelle Flaschengärung: ≥ 9 Monate. Großraumgärung (Tank): ≥ 90 Tage. Transvasierverfahren: ≥ 90 Tage.</div>\n  </div>\n  <div class=\"block\">\n    <div class=\"q\"><strong>5.</strong> Was ist Fülldosage? Versanddosage? Degorgieren? Agraffe?</div>\n    <button class=\"toggle-btn\" onclick=\"toggleAns('a5')\">Musterlösung anzeigen</button>\n    <div class=\"ans\" id=\"a5\" style=\"display:none\">Fülldosage: Hefe + Zucker, startet die 2. Gärung. Versanddosage: Wein + Zucker nach dem Degorgieren, bestimmt die Süße. Degorgieren: Hefepfropfen einfrieren + herausschießen. Agraffe: Drahtkorb, hält den Korken fest.</div>\n  </div>\n  <div class=\"block\">\n    <div class=\"q\"><strong>6.</strong> Süßegrade: Brut? Trocken? Halbtrocken? (g/l)</div>\n    <button class=\"toggle-btn\" onclick=\"toggleAns('a6')\">Musterlösung anzeigen</button>\n    <div class=\"ans\" id=\"a6\" style=\"display:none\">Brut (Herb): &lt; 12 g/l. Trocken: 17–32 g/l. Halbtrocken: 32–50 g/l. Achtung: Extra Trocken (12–17 g/l) ist weniger süß als Trocken!</div>\n  </div>\n  <div class=\"block\">\n    <div class=\"q\"><strong>7.</strong> Winzersekt: 3 Bedingungen?</div>\n    <button class=\"toggle-btn\" onclick=\"toggleAns('a7')\">Musterlösung anzeigen</button>\n    <div class=\"ans\" id=\"a7\" style=\"display:none\">100 % eigene Trauben, nur traditionelle Flaschengärung, Hefelagerung ≥ 9 Monate (≥ 3,5 bar, &gt; 10 % vol).</div>\n  </div>\n  <div class=\"block\">\n    <div class=\"q\"><strong>8.</strong> Champagner: Region + Rebsorten + Hefelagerung?</div>\n    <button class=\"toggle-btn\" onclick=\"toggleAns('a8')\">Musterlösung anzeigen</button>\n    <div class=\"ans\" id=\"a8\" style=\"display:none\">Nur aus der Champagne, nur Chardonnay / Pinot Noir / Pinot Meunier, Hefelagerung ≥ 12 Monate, nur traditionelle Flaschengärung.</div>\n  </div>\n  <div class=\"block\">\n    <div class=\"q\"><strong>9.</strong> Nenne 4 Pflichtangaben auf dem Schaumwein-Etikett.</div>\n    <button class=\"toggle-btn\" onclick=\"toggleAns('a9')\">Musterlösung anzeigen</button>\n    <div class=\"ans\" id=\"a9\" style=\"display:none\">Z. B.: Qualitätsbezeichnung (Deutscher Sekt b.A.), Anbaugebiet (Württemberg), A.P.Nr., Hersteller/Abfüller, Alkohol (% vol), Flascheninhalt (0,75 l), Süßegrad (Trocken).</div>\n  </div>\n  <div class=\"block\">\n    <div class=\"q\"><strong>10.</strong> Wann darf „Winzer\" auf dem Etikett stehen?</div>\n    <button class=\"toggle-btn\" onclick=\"toggleAns('a10')\">Musterlösung anzeigen</button>\n    <div class=\"ans\" id=\"a10\" style=\"display:none\">Nur wenn 100 % der Trauben und der gesamte Prozess im eigenen Betrieb stattfinden.</div>\n  </div>\n</section>\n</main>\n\n<footer>\n  <div class=\"de\">Zusammenfassung zum Lernen — keine offizielle IHK-Antwort. Quelle: BFK 1 (LF07, LS04).</div>\n  <div class=\"vi\">Tài liệu tổng hợp để ôn thi — không phải đáp án chính thức của IHK. Nguồn: BFK 1 (LF07, LS04).</div>\n</footer>\n\n\n\n</div>",
  "qa": [
    {
      "q": "Was ist Schaumwein und welche gesetzlichen Grenzwerte gelten für Druck und Alkoholgehalt?",
      "qVi": "Vang sủi là gì và các tiêu chuẩn định lượng bắt buộc theo luật về áp suất và độ cồn là bao nhiêu?",
      "a": "Schaumwein ist Wein mit gelöstem CO₂ (weiß, rosé oder rot). Gesetzliche Mindestwerte: mind. 3 bar Überdruck bei 20 °C und mind. 9,5 % vol Alkoholgehalt.",
      "aVi": "Vang sủi là rượu vang chứa khí CO₂ hòa tan (trắng, hồng hoặc đỏ). Tiêu chuẩn luật định: áp suất tối thiểu 3 bar ở 20 °C và nồng độ cồn tối thiểu 9,5% vol.",
      "why": "Khí CO₂ tạo bọt sủi bọt khí (Mousseux), áp suất cao đòi hỏi vỏ chai dày chịu lực và nút bần đặc biệt."
    },
    {
      "q": "Wie unterscheidet sich Schaumwein von Perlwein (Druck, Steuer, Verschluss)?",
      "qVi": "Phân biệt vang sủi (Schaumwein) và vang sủi nhẹ (Perlwein) qua áp suất, thuế và nắp chai?",
      "a": "Perlwein (Vino Frizzante): nur 1,0–2,5 bar, CO₂ darf zugesetzt werden, keine Sektsteuer in Deutschland, meist Schraubverschluss. Schaumwein: ≥ 3 bar, Korkverschluss mit Agraffe Pflicht, Sektsteuerpflichtig.",
      "aVi": "Perlwein: chỉ 1,0–2,5 bar, cho phép bơm thêm CO₂, không chịu thuế Sektsteuer tại Đức, thường dùng nắp vặn. Schaumwein: áp suất ≥ 3 bar, bắt buộc nút bần có khung thép Agraffe, chịu thuế Sektsteuer.",
      "why": "Mức chênh lệch áp suất 2,5 bar là ranh giới pháp lý phân chia 2 loại đồ uống và nghĩa vụ thuế."
    },
    {
      "q": "Was versteht man unter einer Cuvée?",
      "qVi": "Thế nào là một mẻ Cuvée?",
      "a": "Der Verschnitt mehrerer Grundweine aus verschiedenen Rebsorten, Lagen oder Jahrgängen, um eine gleichbleibende Markenqualität und einen typischen Hausgeschmack zu erzielen.",
      "aVi": "Sự phối trộn nhiều loại rượu vang cơ bản (Grundweine) từ các giống nho, vùng trồng hoặc niên vụ khác nhau nhằm duy trì chất lượng ổn định và phong cách hương vị đặc trưng của nhà sản xuất.",
      "why": "Cuvée là bí quyết tạo nên sự đồng nhất hàng năm của các hãng rượu sủi nổi tiếng."
    },
    {
      "q": "Nenne die 3 Herstellungsverfahren der 2. Gärung und die jeweilige Mindest-Hefelagerung.",
      "qVi": "Kể 3 phương pháp sản xuất lên men lần 2 và thời gian ủ men tối thiểu của từng phương pháp?",
      "a": "1. Traditionelle Flaschengärung (Méthode Champenoise): mind. 9 Monate auf der Hefe. 2. Großraumgärung (Tankgärung / Méthode Charmat): mind. 90 Tage. 3. Transvasierverfahren: mind. 90 Tage.",
      "aVi": "1. Lên men trong chai truyền thống: tối thiểu 9 tháng ủ men. 2. Lên men trong bồn kín (Tankgärung): tối thiểu 90 ngày. 3. Phương pháp chuyển bồn lọc (Transvasier): tối thiểu 90 ngày.",
      "why": "Thời gian tiếp xúc với men chết (Hefelagerung) càng lâu thì bọt khí càng mịn và mùi thơm bánh mì nướng (Brioche) càng phong phú."
    },
    {
      "q": "Erkläre die Fachbegriffe Fülldosage, Rütteln, Degorgieren, Versanddosage und Agraffe.",
      "qVi": "Giải thích các thuật ngữ chuyên ngành: Fülldosage, Rütteln, Degorgieren, Versanddosage và Agraffe?",
      "a": "Fülldosage: Hefe + Zucker zum Start der 2. Gärung. Rütteln: tägliches Drehen und Aufrichten auf dem Rüttelpult, damit die Hefe in den Hals wandert. Degorgieren: Kälteschock am Flaschenhals, gefrorener Hefepfropfen schießt heraus. Versanddosage: Wein + Zuckerlösung zur Süßeeinstellung. Agraffe: Drahtkorb zur Sicherung des Korkens.",
      "aVi": "Fülldosage: hỗn hợp men + đường để kích hoạt lên men lần 2. Rütteln: xoay và dựng dốc chai trên giá để dồn men về cổ chai. Degorgieren: làm lạnh sâu cổ chai để tống khứ cặn men đóng băng. Versanddosage: rượu + siro đường chỉnh độ ngọt. Agraffe: khung dây thép giữ chặt nút bần.",
      "why": "Đây là 5 bước kỹ thuật đặc trưng và tối quan trọng trong phương pháp Flaschengärung truyền thống."
    },
    {
      "q": "Welche Süßegrade gibt es bei Schaumwein und welche geschmackliche Besonderheit ist eine typische Prüfungsfalle?",
      "qVi": "Kể tên các cấp độ ngọt của vang sủi và đâu là bẫy thi trắc nghiệm thường gặp?",
      "a": "Brut Nature (≤ 3 g/l), Extra Herb/Extra Brut (0–6 g/l), Herb/Brut (< 12 g/l), Extra Trocken/Extra Dry (12–17 g/l), Trocken/Sec (17–32 g/l), Halbtrocken/Demi-Sec (32–50 g/l), Mild/Doux (> 50 g/l). Prüfungsfalle: 'Extra Trocken' (12–17 g/l) ist WENIGER süß als 'Trocken' (17–32 g/l)!",
      "aVi": "Brut Nature (≤ 3 g/l), Extra Brut (0–6 g/l), Brut (< 12 g/l), Extra Trocken (12–17 g/l), Trocken (17–32 g/l), Halbtrocken (32–50 g/l), Mild/Doux (> 50 g/l). Bẫy thi: 'Extra Trocken' (12–17 g/l) ÍT ngọt hơn 'Trocken' (17–32 g/l)!",
      "why": "Quy chuẩn độ ngọt của vang sủi khác với vang thường (vang thường Trocken tối đa 9 g/l)."
    },
    {
      "q": "Welche 3 Bedingungen muss ein deutscher Winzersekt erfüllen?",
      "qVi": "3 điều kiện khắt khe bắt buộc để được dán nhãn Winzersekt tại Đức là gì?",
      "a": "1. 100 % Trauben stammen aus dem eigenen Betrieb. 2. Ausschließlich traditionelle Flaschengärung. 3. Mindestens 9 Monate Hefelagerung (Druck ≥ 3,5 bar, Alkohol > 10 % vol).",
      "aVi": "1. 100% nho từ trang trại của chính cơ sở làm rượu. 2. Duy nhất phương pháp lên men trong chai truyền thống. 3. Thời gian ủ men tối thiểu 9 tháng (áp suất ≥ 3,5 bar, cồn > 10% vol).",
      "why": "Winzersekt là phân hạng đỉnh cao thể hiện tay nghề thủ công cá nhân của người trồng nho Đức."
    },
    {
      "q": "Welche Regeln gelten für echten Champagner (Region, Rebsorten, Reifezeit)?",
      "qVi": "Những quy định pháp lý bất biến đối với Champagne chính gốc của Pháp là gì?",
      "a": "Ausschließlich aus der Region Champagne; nur aus Chardonnay, Pinot Noir und Pinot Meunier; nur traditionelle Flaschengärung (Méthode Champenoise); mindestens 12 Monate Hefelagerung (insgesamt mind. 15 Monate Reifung).",
      "aVi": "Độc quyền từ vùng Champagne (Pháp); chỉ dùng 3 giống nho: Chardonnay, Pinot Noir, Pinot Meunier; chỉ dùng lên men trong chai truyền thống; ủ men tối thiểu 12 tháng (tổng thời gian ủ tối thiểu 15 tháng).",
      "why": "Champagne là tên gọi xuất xứ được bảo hộ nghiêm ngặt nhất thế giới (AOC/AOP)."
    },
    {
      "q": "Wie unterscheiden sich Prosecco Spumante DOC và Franciacorta DOCG ở Ý?",
      "qVi": "So sánh Prosecco Spumante DOC và Franciacorta DOCG tại Ý?",
      "a": "Prosecco Spumante: Rebsorte Glera, meist Großraumgärung (Tankgärung / Méthode Charmat) für frische Fruchtaromen. Franciacorta: Chardonnay, Pinot Nero, Pinot Bianco; streng nach traditioneller Flaschengärung mit mind. 18 Monaten Hefelagerung.",
      "aVi": "Prosecco Spumante: giống nho Glera, chủ yếu lên men bồn để giữ hương hoa quả tươi trẻ. Franciacorta: giống nho Chardonnay, Pinot Nero; bắt buộc lên men chai truyền thống và ủ men tối thiểu 18 tháng.",
      "why": "Franciacorta được ví như 'Champagne của nước Ý' với độ sâu và độ phức hợp hương vị vượt trội."
    },
    {
      "q": "Welche Traubensorten und Reifestufen kennzeichnen den spanischen Cava DO?",
      "qVi": "Các giống nho và các phân cấp thời gian ủ của Cava Tây Ban Nha là gì?",
      "a": "Über 90 % aus dem Penedès mit Parellada, Xarel-lo und Macabeo (traditionelle Flaschengärung). Reifestufen: Cava de Guarda (≥ 9 Monate), Reserva (≥ 18 Monate), Gran Reserva (≥ 30 Monate), Paraje Calificado (≥ 36 Monate).",
      "aVi": "Trên 90% từ vùng Penedès gồm nho Parellada, Xarel-lo và Macabeo (lên men chai truyền thống). Phân hạng ủ: Cava de Guarda (≥ 9 tháng), Reserva (≥ 18 tháng), Gran Reserva (≥ 30 tháng), Paraje Calificado (≥ 36 tháng).",
      "why": "Cava mang hương vị đất đá vôi và trái cây Địa Trung Hải với giá trị xuất khẩu lớn bậc nhất Tây Ban Nha."
    },
    {
      "q": "Nenne die 7 Pflichtangaben auf dem Schaumweinetikett nach deutschem Weinrecht.",
      "qVi": "Kể tên 7 thông tin bắt buộc phải có trên nhãn chai vang sủi theo luật rượu vang Đức?",
      "a": "1. Qualitätsbezeichnung (z. B. Deutscher Sekt b.A.) · 2. Bestimmtes Anbaugebiet (z. B. Württemberg) · 3. Amtliche Prüfnummer (A.P.Nr.) · 4. Hersteller / Abfüller · 5. Alkoholgehalt (% vol) · 6. Flascheninhalt (z. B. 0,75 l) · 7. Süßegrad (z. B. Trocken).",
      "aVi": "1. Tên phẩm cấp chất lượng · 2. Vùng trồng nho chỉ định · 3. Mã kiểm định chính thức A.P.Nr. · 4. Nhà sản xuất / đóng chai · 5. Nồng độ cồn (% vol) · 6. Dung tích chai · 7. Độ ngọt (Süßegrad).",
      "why": "Bảo đảm quyền lợi người tiêu dùng và xác thực nguồn gốc kiểm định chất lượng phòng thí nghiệm."
    },
    {
      "q": "Wann dürfen Begriffe wie 'Weingut', 'Winzer' oder 'Weinbau' auf dem Etikett stehen?",
      "qVi": "Khi nào nhãn chai mới được phép sử dụng các từ ngữ như 'Weingut', 'Winzer' hoặc 'Weinbau'?",
      "a": "Nur dann, wenn 100 % der verwendeten Trauben von eigenen Rebflächen stammen und die gesamte Vinifikation im eigenen Betrieb erfolgt ist.",
      "aVi": "Chỉ khi 100% số nho sử dụng được thu hoạch từ chính diện tích vườn nho sở hữu và toàn bộ quy trình làm rượu diễn ra tại chính cơ sở đó.",
      "why": "Ngăn chặn các hãng đóng chai công nghiệp mua gom nho trôi nổi mạo danh nhà làm vang nông trại."
    }
  ],
  "quiz": [
    {
      "q": "Welcher Mindestdruck und welcher Mindestalkoholgehalt sind für Schaumwein vorgeschrieben?",
      "qVi": "Áp suất tối thiểu và nồng độ cồn tối thiểu theo luật định đối với vang sủi (Schaumwein) là bao nhiêu?",
      "options": [
        "Mind. 1,0 bar / 7,0 % vol",
        "Mind. 2,5 bar / 8,5 % vol",
        "Mind. 3,0 bar / 9,5 % vol",
        "Mind. 4,5 bar / 11,0 % vol"
      ],
      "answer": 2,
      "why": "Schaumwein muss bei 20 °C mindestens 3 bar CO₂-Überdruck und mindestens 9,5 % vol Alkohol aufweisen."
    },
    {
      "q": "Was unterscheidet Perlwein rechtlich und steuerlich von Schaumwein in Deutschland?",
      "qVi": "Perlwein khác biệt gì với Schaumwein về mặt pháp lý và thuế tại Đức?",
      "options": [
        "Perlwein hat 1,0–2,5 bar, keine Sektsteuer und meist Schraubverschluss",
        "Perlwein muss mindestens 12 Monate auf der Hefe lagern",
        "Perlwein ist teurer, weil er doppelte Sektsteuer zahlt",
        "Perlwein darf nur in traditioneller Flaschengärung erzeugt werden"
      ],
      "answer": 0,
      "why": "Perlwein hat geringeren Druck (1,0–2,5 bar) und ist von der deutschen Schaumweinsteuer befreit."
    },
    {
      "q": "Wie lange muss Schaumwein bei der traditionellen Flaschengärung mindestens auf der Hefe lagern?",
      "qVi": "Trong phương pháp lên men chai truyền thống, vang sủi bắt buộc phải ủ trên cặn men tối thiểu bao lâu?",
      "options": [
        "Mindestens 30 Tage",
        "Mindestens 90 Tage",
        "Mindestens 9 Monate",
        "Mindestens 24 Monate"
      ],
      "answer": 2,
      "why": "Traditionelle Flaschengärung verlangt mind. 9 Monate Hefelagerung (Tankgärung nur mind. 90 Tage)."
    },
    {
      "q": "Welche Funktion hat die Fülldosage (Tiragelikör)?",
      "qVi": "Hỗn hợp Fülldosage có vai trò gì trong quy trình sản xuất vang sủi?",
      "options": [
        "Sie stoppt die Gärung und tötet die Bakterien ab",
        "Sie besteht aus Hefe + Zucker und startet die 2. Gärung",
        "Sie reguliert nach dem Degorgieren die endgültige Restsüße",
        "Sie reinigt die Flasche vor dem Etikettieren"
      ],
      "answer": 1,
      "why": "Fülldosage = Hefe und Zucker, die zur Cuvée gegeben werden, um die 2. Gärung in Gang zu setzen."
    },
    {
      "q": "Was passiert beim Schritt des Degorgierens?",
      "qVi": "Điều gì diễn ra trong công đoạn Degorgieren?",
      "options": [
        "Die Trauben werden entrappt und gemaischt",
        "Der Flaschenhals wird tiefgekühlt und der gefrorene Hefepfropfen schießt heraus",
        "Der Drahtkorb (Agraffe) wird auf den Korken gepresst",
        "Die Flaschen werden im Keller waagerecht gestapelt"
      ],
      "answer": 1,
      "why": "Degorgieren ist das Entfernen des Hefepfropfens durch Einfrieren des Flaschenhalses und Öffnen des Kronkorkens."
    },
    {
      "q": "Welcher Süßegrad enthält 12 bis 17 g/l Restzucker?",
      "qVi": "Cấp độ ngọt nào có hàm lượng đường dư từ 12 đến 17 g/l?",
      "options": [
        "Brut Nature",
        "Brut (Herb)",
        "Extra Trocken (Extra Dry)",
        "Trocken (Dry)"
      ],
      "answer": 2,
      "why": "Extra Trocken hat 12–17 g/l. Typische Prüfungsfalle: 'Extra Trocken' ist weniger süß als 'Trocken' (17–32 g/l)!"
    },
    {
      "q": "Welche Bedingungen müssen für einen 'Winzersekt' in Deutschland erfüllt sein?",
      "qVi": "Để được chứng nhận là Winzersekt tại Đức, sản phẩm phải thỏa mãn những điều kiện nào?",
      "options": [
        "Beliebige Trauben, aber Tankgärung über 12 Monate",
        "100 % eigene Trauben, traditionelle Flaschengärung und mind. 9 Monate Hefelagerung",
        "Zukauf von Most aus anderen EU-Ländern ist bis 50 % erlaubt",
        "Ausschließlich mit Schraubverschluss verschlossen"
      ],
      "answer": 1,
      "why": "Winzersekt steht für 100 % Trauben aus eigenem Betrieb und reine traditionelle Flaschengärung."
    },
    {
      "q": "Welche Rebsorten sind für echten Champagner AOC zugelassen?",
      "qVi": "3 giống nho chính thức được phép dùng làm rượu Champagne AOC là gì?",
      "options": [
        "Riesling, Silvaner và Müller-Thurgau",
        "Chardonnay, Pinot Noir và Pinot Meunier",
        "Glera, Trebbiano và Sangiovese",
        "Parellada, Xarel-lo và Macabeo"
      ],
      "answer": 1,
      "why": "Champagne darf nur aus Chardonnay (weiß), Pinot Noir (Spätburgunder) und Pinot Meunier (Schwarzriesling) gekeltert werden."
    },
    {
      "q": "Aus welcher Rebsorte und mit welchem Verfahren wird Prosecco Spumante DOC meist erzeugt?",
      "qVi": "Prosecco Spumante DOC thường được sản xuất từ giống nho nào và bằng phương pháp gì?",
      "options": [
        "Aus Glera in Großraum-Tankgärung",
        "Aus Cabernet Sauvignon in traditioneller Flaschengärung",
        "Aus Riesling durch Zusetzen von Kohlensäure",
        "Aus Muskateller ohne Gärung"
      ],
      "answer": 0,
      "why": "Prosecco Spumante wird aus Glera gewonnen và meist im Drucktank (Charmat-Methode) vergoren."
    },
    {
      "q": "Welche Angabe gehört NICHT zu den 7 gesetzlichen Pflichtangaben auf dem Schaumweinetikett?",
      "qVi": "Thông tin nào dưới đây KHÔNG thuộc 7 thông tin bắt buộc trên nhãn chai vang sủi?",
      "options": [
        "Amtliche Prüfnummer (A.P.Nr.)",
        "Alkoholgehalt (% vol)",
        "Jahrgang (Niên vụ thu hoạch)",
        "Nennvolumen / Flascheninhalt (z. B. 0,75 l)"
      ],
      "answer": 2,
      "why": "Der Jahrgang ist eine freiwillige / zulässige Angabe; Pflicht sind Qualitätsstufe, Gebiet, AP-Nr, Abfüller, Alkohol, Inhalt, Süßegrad."
    }
  ],
  "vokabeln": [
    {
      "de": "der Schaumwein",
      "vi": "Rượu vang sủi (áp suất ≥ 3 bar ở 20 °C, cồn ≥ 9,5% vol)"
    },
    {
      "de": "der Perlwein (Vino Frizzante)",
      "vi": "Rượu vang sủi nhẹ (áp suất 1,0–2,5 bar, không chịu thuế Sektsteuer)"
    },
    {
      "de": "die Cuvée",
      "vi": "Mẻ phối trộn nhiều rượu vang cơ sở từ giống nho/niên vụ khác nhau"
    },
    {
      "de": "der Grundwein",
      "vi": "Rượu vang cơ bản (rượu tĩnh) dùng làm nguyên liệu ban đầu để sủi bọt"
    },
    {
      "de": "die Fülldosage (der Tiragelikör)",
      "vi": "Hỗn hợp men + đường cho vào Cuvée để kích hoạt lần lên men thứ 2"
    },
    {
      "de": "die Versanddosage (der Versandlikör)",
      "vi": "Dung dịch rượu + đường thêm vào sau Degorgieren để ấn định độ ngọt"
    },
    {
      "de": "das Rütteln (das Rüttelpult)",
      "vi": "Động tác xoay và dựng dốc chai trên giá xoay để dồn men về cổ chai"
    },
    {
      "de": "das Degorgieren",
      "vi": "Công đoạn làm lạnh đóng băng cổ chai để áp suất bật khối cặn men ra"
    },
    {
      "de": "die Agraffe",
      "vi": "Khung dây thép chụp giữ chặt nút bần trên miệng chai sủi áp suất"
    },
    {
      "de": "die Hefelagerung",
      "vi": "Thời gian ủ trên cặn men (tạo hương bánh mì nướng Brioche và bọt mịn)"
    },
    {
      "de": "die Flaschengärung (Méthode Champenoise)",
      "vi": "Phương pháp lên men lần 2 trong chai truyền thống (tối thiểu 9 tháng)"
    },
    {
      "de": "die Großraumgärung (Tankgärung / Charmat)",
      "vi": "Phương pháp lên men lần 2 trong bồn áp suất lớn (tối thiểu 90 ngày)"
    },
    {
      "de": "das Transvasierverfahren",
      "vi": "Phương pháp lên men trong chai rồi chuyển xả vào bồn lọc áp suất"
    },
    {
      "de": "Brut Nature / Naturherb",
      "vi": "Không thêm đường sau lên men, đường dư cực thấp (≤ 3 g/l)"
    },
    {
      "de": "Herb / Brut",
      "vi": "Độ chát khô tiêu chuẩn của vang sủi (< 12 g/l đường dư)"
    },
    {
      "de": "Extra Trocken (Extra Dry)",
      "vi": "Độ ngọt nhẹ (12–17 g/l đường dư) — ít ngọt hơn mức Trocken"
    },
    {
      "de": "Trocken (Sec)",
      "vi": "Độ ngọt trung bình (17–32 g/l đường dư)"
    },
    {
      "de": "Halbtrocken (Demi-Sec)",
      "vi": "Độ ngọt đậm rõ nét (32–50 g/l đường dư)"
    },
    {
      "de": "der Winzersekt",
      "vi": "Vang sủi đỉnh cao của Đức: 100% nho trang trại nhà, lên men chai ≥ 9 tháng"
    },
    {
      "de": "der Champagner (AOC)",
      "vi": "Vang sủi độc quyền vùng Champagne (Pháp), lên men chai, ủ men ≥ 12 tháng"
    }
  ]
},
{
  "id": "lf6-wein-empfehlen",
  "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2\"/><path d=\"M7 2v20\"/><path d=\"M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7\"/></svg>",
  "name": "LS07 & LS11 · Wein empfehlen",
  "nameVi": "Tư vấn & Kết hợp rượu vang với món ăn — Thực đơn đồ uống & 4-Gänge-Menü",
  "desc": "3 Faktoren · Zubereitungsart · Geschmackskombinationen · Reihenfolge im Menü · Getränkekarte Baden/Württemberg · 4-Gänge-Menü Begründung · Selbsttest",
  "source": "BFK 1 · LF07 LS07 & LS11 · Getränke (Weinempfehlung)",
  "theory": "<div class=\"wein-empfehlen-skript-wrap\">\n<style>\n\n.wein-empfehlen-skript-wrap {\n  --ink:#1B1F2A; --paper:#F1ECDE; --paper2:#EAE3D0; --wax:#7A2E2E; --brass:#9C7A3C; --slate:#48586B; --line:#D8CFB8; --slateline:#c7d0da; --green:#5b7a52; --greenbg:#eef3ea;\n  --wine:#7A2E2E; --olive:#6f7d1c; --olive-soft:#eef1d2;\n  background: var(--paper);\n  color: var(--ink);\n  font-family: \"Source Serif 4\", Georgia, serif;\n  line-height: 1.65;\n  font-size: 16px;\n  border-radius: 14px;\n  overflow: hidden;\n  box-shadow: 0 2px 10px rgba(0,0,0,.08);\n  margin-bottom: 24px;\n  position: relative;\n}\n.wein-empfehlen-skript-wrap * { box-sizing: border-box; }\n.wein-empfehlen-skript-wrap header.cover {\n  padding: 40px 20px 30px; text-align: center; position: relative;\n  border-bottom: 3px double var(--brass);\n  background: linear-gradient(180deg, var(--paper2), var(--paper));\n}\n.wein-empfehlen-skript-wrap header.cover .kicker {\n  font-family: \"IBM Plex Mono\", monospace; letter-spacing: .18em; font-size: .72rem;\n  text-transform: uppercase; color: var(--brass); margin-bottom: 10px;\n}\n.wein-empfehlen-skript-wrap header.cover h1 {\n  font-family: \"Fraunces\", Georgia, serif; font-weight: 600; font-size: clamp(1.8rem, 4.5vw, 2.6rem);\n  margin: 0 0 8px; color: var(--ink); letter-spacing: -.01em;\n}\n.wein-empfehlen-skript-wrap header.cover h1 em { font-style: italic; color: var(--wax); font-weight: 500; }\n.wein-empfehlen-skript-wrap header.cover .subtitle-de { font-size: 1rem; color: var(--ink); margin: 4px 0; }\n.wein-empfehlen-skript-wrap header.cover .subtitle-vi {\n  font-family: \"IBM Plex Sans\", sans-serif; font-size: .9rem; color: var(--slate);\n  margin: 2px 0 0; font-style: normal;\n}\n.wein-empfehlen-skript-wrap header.cover .subtitle-vi:before { content: \"VI · \"; font-weight: 600; letter-spacing: .03em; color: var(--slate); opacity: .7; }\n.wein-empfehlen-skript-wrap header.cover .exam-meta {\n  display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; margin-top: 14px;\n  font-family: \"IBM Plex Mono\", monospace; font-size: .7rem;\n}\n.wein-empfehlen-skript-wrap header.cover .exam-meta span {\n  border: 1px solid var(--brass); color: var(--wax); padding: 3px 10px; border-radius: 20px;\n  letter-spacing: .04em;\n}\n.wein-empfehlen-skript-wrap .legend {\n  max-width: 820px; margin: 18px auto 0; display: flex; gap: 14px; justify-content: center;\n  flex-wrap: wrap; align-items: center; font-family: \"IBM Plex Sans\", sans-serif; font-size: .8rem; color: var(--ink);\n}\n.wein-empfehlen-skript-wrap .legend .item { display: flex; align-items: center; gap: 6px; }\n.wein-empfehlen-skript-wrap .legend .swatch { width: 14px; height: 14px; border-radius: 2px; flex-shrink: 0; }\n.wein-empfehlen-skript-wrap .legend .swatch.de { background: var(--wax); }\n.wein-empfehlen-skript-wrap .legend .swatch.vi { background: var(--slate); }\n.wein-empfehlen-skript-wrap .toggle-btn {\n  cursor: pointer; font-family: \"IBM Plex Mono\", monospace; font-size: .72rem; letter-spacing: .05em;\n  background: var(--ink); color: var(--paper); border: none; padding: 6px 12px; border-radius: 6px;\n  text-transform: uppercase; transition: .15s;\n}\n.wein-empfehlen-skript-wrap .toggle-btn:hover { background: var(--wax); }\n.wein-empfehlen-skript-wrap nav.spine {\n  position: sticky; top: 0; z-index: 10; background: var(--ink); color: var(--paper);\n  display: flex; gap: 0; overflow-x: auto; white-space: nowrap; padding: 0 10px;\n  box-shadow: 0 2px 10px rgba(0,0,0,.15);\n}\n.wein-empfehlen-skript-wrap nav.spine a {\n  color: var(--paper); text-decoration: none; font-family: \"IBM Plex Mono\", monospace;\n  font-size: .72rem; letter-spacing: .03em; padding: 11px 12px; border-right: 1px solid rgba(255,255,255,.12);\n  opacity: .72; transition: .15s;\n}\n.wein-empfehlen-skript-wrap nav.spine a:hover { opacity: 1; background: rgba(255,255,255,.06); color: #EFC9A0; }\n.wein-empfehlen-skript-wrap nav.spine a.exam { color: #EFC9A0; opacity: .9; }\n.wein-empfehlen-skript-wrap nav.spine .grp {\n  font-family: \"IBM Plex Mono\", monospace; font-size: .62rem; letter-spacing: .1em; text-transform: uppercase;\n  color: var(--brass); padding: 11px 8px 11px 12px; align-self: center; opacity: .9;\n}\n.wein-empfehlen-skript-wrap main { max-width: 840px; margin: 0 auto; padding: 10px 20px 60px; }\n.wein-empfehlen-skript-wrap section.chapter { padding: 40px 0 20px; border-bottom: 1px solid var(--line); scroll-margin-top: 54px; }\n.wein-empfehlen-skript-wrap section.chapter:last-of-type { border-bottom: none; }\n.wein-empfehlen-skript-wrap .chapter-head { display: flex; align-items: baseline; gap: 14px; margin-bottom: 6px; }\n.wein-empfehlen-skript-wrap .chapter-num {\n  font-family: \"Fraunces\", Georgia, serif; font-weight: 700; font-size: 2.2rem; color: var(--brass);\n  line-height: 1; flex-shrink: 0;\n}\n.wein-empfehlen-skript-wrap .chapter-title-de { font-family: \"Fraunces\", Georgia, serif; font-weight: 600; font-size: 1.4rem; color: var(--ink); margin: 0; }\n.wein-empfehlen-skript-wrap .chapter-title-vi {\n  font-family: \"IBM Plex Sans\", sans-serif; font-size: .92rem; color: var(--slate); margin: 4px 0 0 54px;\n}\n.wein-empfehlen-skript-wrap .chapter-title-vi:before { content: \"VI · \"; font-weight: 600; opacity: .7; }\n.wein-empfehlen-skript-wrap .lf-tag {\n  font-family: \"IBM Plex Mono\", monospace; font-size: .62rem; letter-spacing: .1em; text-transform: uppercase;\n  background: var(--wax); color: var(--paper); padding: 3px 8px; border-radius: 4px; margin-left: auto; align-self: center;\n}\n.wein-empfehlen-skript-wrap .block { margin: 14px 0 20px; }\n.wein-empfehlen-skript-wrap .de {\n  position: relative; padding: 12px 16px 12px 18px; background: rgba(122,46,46,.045);\n  border-left: 3px solid var(--wax); border-radius: 0 6px 6px 0; font-size: .96rem;\n}\n.wein-empfehlen-skript-wrap .de .tag {\n  font-family: \"IBM Plex Mono\", monospace; font-size: .64rem; letter-spacing: .12em;\n  text-transform: uppercase; color: var(--wax); display: block; margin-bottom: 4px; opacity: .85;\n}\n.wein-empfehlen-skript-wrap .vi {\n  font-family: \"IBM Plex Sans\", sans-serif; font-size: .88rem; color: var(--slate);\n  padding: 8px 16px 4px 18px; border-left: 3px solid var(--slateline); margin-top: -4px;\n}\n.wein-empfehlen-skript-wrap .vi .tag {\n  font-family: \"IBM Plex Mono\", monospace; font-size: .62rem; letter-spacing: .12em;\n  text-transform: uppercase; color: var(--slate); display: block; margin-bottom: 3px; opacity: .75;\n}\n.wein-empfehlen-skript-wrap.hide-vi .vi,\n.wein-empfehlen-skript-wrap.hide-vi .vi-sub,\n.wein-empfehlen-skript-wrap.hide-vi .vi-cell,\n.wein-empfehlen-skript-wrap.hide-vi .vi-mini,\n.wein-empfehlen-skript-wrap.hide-vi .chapter-title-vi { display: none !important; }\n.wein-empfehlen-skript-wrap ul, .wein-empfehlen-skript-wrap ol { margin: 8px 0; padding-left: 24px; }\n.wein-empfehlen-skript-wrap li { margin: 4px 0; font-size: .92rem; }\n.wein-empfehlen-skript-wrap b, .wein-empfehlen-skript-wrap strong { color: var(--ink); }\n.wein-empfehlen-skript-wrap .vi b, .wein-empfehlen-skript-wrap .vi strong { color: #324150; }\n.wein-empfehlen-skript-wrap table.bier { width: 100%; border-collapse: collapse; margin: 14px 0; font-family: \"IBM Plex Sans\", sans-serif; font-size: .86rem; background: #fff; }\n.wein-empfehlen-skript-wrap table.bier th { background: var(--ink); color: var(--paper); text-align: left; padding: 8px 10px; font-weight: 600; font-size: .78rem; text-transform: uppercase; }\n.wein-empfehlen-skript-wrap table.bier td { border: 1px solid var(--line); padding: 8px 10px; vertical-align: top; }\n.wein-empfehlen-skript-wrap table.bier tr:nth-child(even) td { background: var(--paper2); }\n.wein-empfehlen-skript-wrap .warn {\n  background: #f7e9df; border-left: 4px solid var(--wax); border-radius: 0 6px 6px 0;\n  padding: 10px 14px; margin: 12px 0; font-size: .9rem;\n}\n.wein-empfehlen-skript-wrap .warn .tag { font-family: \"IBM Plex Mono\", monospace; font-size: .64rem; letter-spacing: .1em; color: var(--wax); text-transform: uppercase; display: block; margin-bottom: 4px; }\n.wein-empfehlen-skript-wrap .warn .vi { border: none; padding: 4px 0 0; margin: 0; }\n.wein-empfehlen-skript-wrap .q { font-weight: 600; margin-bottom: 8px; font-size: .95rem; }\n.wein-empfehlen-skript-wrap .ans {\n  background: var(--greenbg); border: 1px solid var(--green); border-radius: 8px;\n  padding: 10px 12px; margin: 10px 0; font-family: \"IBM Plex Sans\", sans-serif; font-size: .9rem; color: #2e4d28;\n}\n.wein-empfehlen-skript-wrap footer {\n  text-align: center; padding: 32px 16px 50px; font-family: \"IBM Plex Sans\", sans-serif;\n  font-size: .8rem; color: var(--slate); border-top: 1px solid var(--line);\n}\n.wein-empfehlen-skript-wrap footer .de { background: none; border: none; padding: 0; }\n.wein-empfehlen-skript-wrap footer .vi { border: none; padding: 0; margin-top: 4px; }\n\n/* Styles specific to Schaumwein Etikett */\n.wein-empfehlen-skript-wrap .etikett {\n  background: #fdf8ec; border: 2px solid var(--brass); outline: 1px solid var(--brass);\n  outline-offset: -8px; max-width: 400px; margin: 18px auto; padding: 26px 20px; text-align: center; color: var(--ink);\n}\n.wein-empfehlen-skript-wrap .etikett .et-lage { font-size: .76rem; letter-spacing: .2em; text-transform: uppercase; color: var(--brass); font-family: \"IBM Plex Sans\", sans-serif; }\n.wein-empfehlen-skript-wrap .etikett .et-sorte { font-family: \"Fraunces\", Georgia, serif; font-size: 1.8rem; font-weight: 600; margin: 6px 0 2px; }\n.wein-empfehlen-skript-wrap .etikett .et-jahr { font-family: \"IBM Plex Mono\", monospace; font-size: .82rem; }\n.wein-empfehlen-skript-wrap .etikett .et-qual { font-family: \"Fraunces\", Georgia, serif; font-size: 1.05rem; font-weight: 600; margin-top: 14px; }\n.wein-empfehlen-skript-wrap .etikett .et-gebiet { font-family: \"Fraunces\", Georgia, serif; font-size: .95rem; }\n.wein-empfehlen-skript-wrap .etikett .et-verfahren { font-style: italic; font-size: .82rem; margin-top: 8px; }\n.wein-empfehlen-skript-wrap .etikett .et-row { display: flex; justify-content: space-between; margin-top: 14px; font-family: \"IBM Plex Sans\", sans-serif; font-size: .82rem; }\n.wein-empfehlen-skript-wrap .etikett .et-ap { font-family: \"IBM Plex Mono\", monospace; font-size: .78rem; margin-top: 10px; }\n.wein-empfehlen-skript-wrap .etikett .et-ab { font-size: .78rem; margin-top: 6px; font-family: \"IBM Plex Sans\", sans-serif; }\n.wein-empfehlen-skript-wrap .badge {\n  display: inline-flex; align-items: center; justify-content: center; min-width: 18px; height: 18px;\n  border-radius: 50%; background: var(--wax); color: #fff; font-family: \"IBM Plex Sans\", sans-serif;\n  font-size: .68rem; font-weight: 600; vertical-align: middle; margin-left: 3px; padding: 0 3px;\n}\n.wein-empfehlen-skript-wrap .legende ul { list-style: none; padding: 0; }\n.wein-empfehlen-skript-wrap .legende li { margin: 6px 0; font-family: \"IBM Plex Sans\", sans-serif; font-size: .86rem; }\n.wein-empfehlen-skript-wrap .et-caption { text-align: center; font-family: \"IBM Plex Sans\", sans-serif; font-size: .82rem; color: var(--slate); margin-top: 8px; }\n\n</style>\n\n<header class=\"cover\">\n  <div class=\"kicker\">Lernfeld 07 · LS07 &amp; LS11 · Lernskript</div>\n  <h1>§ <em>Wein empfehlen</em></h1>\n  <p class=\"subtitle-de\">Wein &amp; Speisen kombinieren, Getränkekarte, 4-Gänge-Menü — mit Prüfungs-Check</p>\n  <p class=\"subtitle-vi\">Kết hợp rượu vang &amp; món ăn, thực đơn đồ uống, thực đơn 4 món — kèm tự kiểm tra</p>\n  <div class=\"exam-meta\">\n    <span>BFK 1 · LF07 LS07 &amp; LS11</span><span>DE / VI zweisprachig</span>\n  </div>\n  <div class=\"legend\">\n    <div class=\"item\"><span class=\"swatch de\"></span> Deutsch (Original — luôn đọc trước)</div>\n    <div class=\"item\"><span class=\"swatch vi\"></span> Tiếng Việt (bản dịch — đọc sau để hiểu)</div>\n    <button class=\"toggle-btn\" id=\"viToggle\" onclick=\"toggleVi()\">Tiếng Việt: BẬT</button>\n  </div>\n</header>\n\n<nav class=\"spine\">\n  <span class=\"grp\">Kapitel</span>\n  <a href=\"#p1\">1 · Regeln</a>\n  <a href=\"#p2\">2 · Tabelle</a>\n  <a href=\"#p3\">3 · Aufgaben</a>\n  <a href=\"#p4\">4 · Getränkekarte</a>\n  <a href=\"#p5\">5 · 4-Gänge-Menü</a>\n  <span class=\"grp\">Test</span>\n  <a href=\"#quiz\" class=\"exam\">Prüfungs-Check</a>\n</nav>\n\n<main>\n<section class=\"chapter\" id=\"p1\">\n  <div class=\"chapter-head\">\n    <span class=\"chapter-num\">§1</span>\n    <h2 class=\"chapter-title-de\">Regeln für Wein &amp; Speisen</h2>\n    <span class=\"lf-tag\">Getränke</span>\n  </div>\n  <p class=\"chapter-title-vi\">Nguyên tắc kết hợp rượu vang và món ăn</p>\n\n  <div class=\"block\">\n    <div class=\"de\"><span class=\"tag\">Faktor 1 · Zubereitungsart</span>Gebraten, gegrillt, geschmort (chiên, rán, nướng, hầm) → kräftiger Wein. Gedünstet, pochiert, gekocht (hấp, chần, luộc) → dezenter / leichter Wein.</div>\n    <div class=\"vi\"><span class=\"tag\">VI</span>Chế biến đậm vị (chiên, rán, nướng, hầm) → rượu vang đậm đà, mạnh mẽ. Chế biến thanh nhẹ (hấp, chần, luộc) → rượu vang tinh tế, thanh nhẹ.</div>\n  </div>\n  <div class=\"block\">\n    <div class=\"de\"><span class=\"tag\">Faktor 2 · Fülle &amp; Gehalt</span>Kräftige, gehaltvolle Speisen (z. B. Rumpsteak, Rostbraten, Schmorgerichte) → kräftige, gehaltvolle Weine. Leichte Speisen (z. B. Hähnchen, gedünstetes Gemüse, gedünsteter Fisch) → leichte Weine.</div>\n    <div class=\"vi\"><span class=\"tag\">VI</span>Món ăn béo, ngậy, nhiều đạm (ví dụ bít tết Rumpsteak, bò nướng Rostbraten, thịt hầm) → rượu vang đậm đà, có cấu trúc tốt. Món ăn nhẹ nhàng (ví dụ thịt gà, rau củ hấp, cá hấp) → rượu vang nhẹ, thanh thoát.</div>\n  </div>\n  <div class=\"block\">\n    <div class=\"de\"><span class=\"tag\">Faktor 3 · Aromaintensität</span>Intensive, kräftige Speisen → aromatische Weine. Dezente Speisen (z. B. gedünsteter Fisch) → leichte Weine.</div>\n    <div class=\"vi\"><span class=\"tag\">VI</span>Món ăn hương vị đậm đà, nồng nàn → rượu vang có hương thơm mạnh mẽ. Món ăn hương vị thanh dịu (ví dụ cá hấp) → rượu vang nhẹ nhàng.</div>\n  </div>\n\n  <div class=\"block\">\n    <div class=\"de\"><span class=\"tag\">Geschmack + Geschmack</span><strong>Süß + Süß = ausgleichend</strong> (z. B. Panna Cotta + Riesling Beerenauslese; Thai-Curry + Gewürztraminer Spätlese; Schweinerippchen + Riesling Q.b.A.). <strong>Salzig + Sauer = ausgleichend</strong> (mäßig salzige Speise + frische Säure im Wein). <strong>Würzig + Würzig = ausgleichend</strong> (würzige Speise + würziger, charaktervoller Wein).</div>\n    <div class=\"vi\"><span class=\"tag\">VI</span><strong>Ngọt + Ngọt = cân bằng</strong> (ví dụ Panna Cotta + Riesling Beerenauslese; cà ri Thái + Gewürztraminer Spätlese; sườn heo + Riesling Q.b.A.). <strong>Mặn + Chua = cân bằng</strong> (món mặn vừa phải + rượu có độ axit tươi). <strong>Cay / đậm vị + Cay / đậm vị = cân bằng</strong> (món nhiều gia vị + rượu hương đậm, cá tính).</div>\n  </div>\n  <div class=\"warn\">\n    <span class=\"tag\">Nicht kombinieren!</span>\n    Sauer + Sauer = Sauer² — extrem sauer, der Geschmack wird verdorben. Saure Speise + saurer Wein = doppelte Säure.\n    <div class=\"vi\">KHÔNG kết hợp: Chua + Chua = Chua² — cực kỳ chua, hỏng vị. Món chua đi với rượu chua sẽ làm tăng độ chua gấp đôi, gây gắt và hỏng vị.</div>\n  </div>\n\n  <div class=\"block\">\n    <div class=\"de\"><span class=\"tag\">Reihenfolge der Weine</span>Im mehrgängigen Menü: <strong>dezent vor kräftig/gehaltvoll</strong> · <strong>weiß vor rot</strong> · <strong>jung vor alt</strong> · <strong>trocken vor süß</strong>.</div>\n    <div class=\"vi\"><span class=\"tag\">VI</span>Thứ tự phục vụ rượu trong bữa nhiều món: <strong>nhẹ trước, đậm sau</strong> · <strong>trắng trước, đỏ sau</strong> · <strong>trẻ trước, lâu năm sau</strong> · <strong>khô trước, ngọt sau</strong>.</div>\n  </div>\n</section>\n\n<section class=\"chapter\" id=\"p2\">\n  <div class=\"chapter-head\">\n    <span class=\"chapter-num\">§2</span>\n    <h2 class=\"chapter-title-de\">Zubereitung → Speise → Wein</h2>\n    <span class=\"lf-tag\">Getränke</span>\n  </div>\n  <p class=\"chapter-title-vi\">Phương pháp chế biến → món ăn → rượu phù hợp</p>\n\n  <table class=\"bier\">\n    <tr><th>Intensität</th><th>Zubereitungsart</th><th>Beispiel Speise</th><th>Wein</th><th>Beispiel Rebsorte</th></tr>\n    <tr><td>Mild und leicht</td><td>Pochieren, Dünsten, Kochen</td><td>Pochierter Fisch, Spargel mit Sauce Hollandaise, gedünstetes Gemüse</td><td>Leichter bis mittlerer Weißwein</td><td>Riesling Q.b.A, Gutedel Kabinett, Weißburgunder Q.b.A.</td></tr>\n    <tr><td>Mittel</td><td>Braten, Grillen</td><td>Gebratenes vom Rind, gebratene Fischfilets</td><td>Mittlerer bis kräftiger Weißwein, Rosé, leichter bis mittlerer Rotwein</td><td>Gewürztraminer Spätlese, Spätburgunder Spätlese</td></tr>\n    <tr><td>Kräftig, intensiv</td><td>Schmoren</td><td>Geschmortes Fleisch, Rumpsteak</td><td>Mittlerer bis kräftiger Rotwein</td><td>Lemberger Q.b.A, Spätburgunder trocken</td></tr>\n  </table>\n  <div class=\"vi\">Bảng: cường độ — phương pháp chế biến — ví dụ món ăn — dòng rượu phù hợp — ví dụ giống nho / loại rượu.</div>\n</section>\n\n<section class=\"chapter\" id=\"p3\">\n  <div class=\"chapter-head\">\n    <span class=\"chapter-num\">§3</span>\n    <h2 class=\"chapter-title-de\">Aufgaben — Beispiele analysieren</h2>\n    <span class=\"lf-tag\">Getränke</span>\n  </div>\n  <p class=\"chapter-title-vi\">Bài tập — phân tích các ví dụ kết hợp</p>\n\n  <div class=\"block\">\n    <div class=\"de\"><span class=\"tag\">Aufgabe 1 · Beispiel 1</span>Gebratenes Filet von der Bachforelle mit Alblinsen und Petersilienkartoffeln → <strong>2024er Neuweier Schlossberg Riesling halbtrocken</strong> (Qualitätswein, Baden — Schloss Neuweier, Baden-Baden).</div>\n    <div class=\"vi\"><span class=\"tag\">VI</span>Filet cá hồi suối chiên ăn kèm đậu Alblinsen và khoai tây xào cần tây → <strong>Riesling halbtrocken 2024, Neuweier Schlossberg</strong> (Qualitätswein, Baden — Schloss Neuweier, Baden-Baden).</div>\n  </div>\n  <div class=\"block\">\n    <div class=\"de\"><span class=\"tag\">Aufgabe 1 · Beispiel 2</span>Gebratenes Lammfilet mit Thymiansauce, Ratatouille und Kartoffelgratin → <strong>2023er Kleinbottwarer Süßmund Riesling Kabinett trocken</strong> (Prädikatswein, Württemberg — Graf Adelmann, Kleinbottwar).</div>\n    <div class=\"vi\"><span class=\"tag\">VI</span>Thăn cừu áp chảo sốt cỏ xạ hương, rau củ Ratatouille và khoai tây đút lò → <strong>Riesling Kabinett trocken 2023, Kleinbottwarer Süßmund</strong> (Prädikatswein, Württemberg — Graf Adelmann, Kleinbottwar).</div>\n  </div>\n  <div class=\"block\">\n    <div class=\"de\"><span class=\"tag\">Aufgabe 1 · Beispiel 3</span>Feldsalat mit karamellisierten Feigen, Ziegenfrischkäse und gerösteten Walnüssen → <strong>2022er Hanweiler Berg Lemberger trocken</strong> (Qualitätswein, Württemberg — Gerhard Aldinger, Fellbach).</div>\n    <div class=\"vi\"><span class=\"tag\">VI</span>Salad Feldsalat với quả vả caramen, phô mai dê tươi và hạt óc chó rang → <strong>Lemberger trocken 2022, Hanweiler Berg</strong> (Qualitätswein, Württemberg — Gerhard Aldinger, Fellbach).</div>\n  </div>\n  <div class=\"block\">\n    <div class=\"de\"><span class=\"tag\">Aufgabe 2 · A</span>Gegrillte Schweinemedaillons mit Pfifferlingrahmsoße, Brokkoliröschen und Kartoffelkroketten → <strong>Durbacher Kochberg Weißer Burgunder Spätlese trocken</strong> (Prädikatswein, Baden — Heinrich Männle).</div>\n    <div class=\"vi\"><span class=\"tag\">VI</span>Thịt heo nướng sốt kem nấm Pfifferling, bông cải xanh và bánh khoai tây chiên xù Kroketten → <strong>Weißer Burgunder Spätlese trocken, Durbacher Kochberg</strong> (Prädikatswein, Baden — Heinrich Männle).</div>\n  </div>\n  <div class=\"block\">\n    <div class=\"de\"><span class=\"tag\">Aufgabe 2 · B</span>Auf der Haut gebratenes Zanderfilet mit Buttersauce, weißem und grünem Spargel, hausgemachte Bandnudeln → <strong>Durbacher Plauelrain Chardonnay trocken</strong> oder <strong>Untertürkheimer Gips Weißburgunder trocken</strong>.</div>\n    <div class=\"vi\"><span class=\"tag\">VI</span>Cá vược Zander áp chảo giòn da sốt bơ, măng tây trắng &amp; xanh, mì dẹt nhà làm → <strong>Chardonnay trocken, Durbacher Plauelrain</strong> hoặc <strong>Weißburgunder trocken, Untertürkheimer Gips</strong>.</div>\n  </div>\n</section>\n\n<section class=\"chapter\" id=\"p4\">\n  <div class=\"chapter-head\">\n    <span class=\"chapter-num\">§4</span>\n    <h2 class=\"chapter-title-de\">Getränkekarte — Baden &amp; Württemberg</h2>\n    <span class=\"lf-tag\">Getränke</span>\n  </div>\n  <p class=\"chapter-title-vi\">Thực đơn đồ uống — rượu vang vùng Baden &amp; Württemberg</p>\n\n  <p><strong>Weißweine — Baden</strong></p>\n  <table class=\"bier\">\n    <tr><th>Wein</th><th>Erzeuger</th><th>0,2 l</th><th>0,75 l</th></tr>\n    <tr><td>2026 Rivaner trocken (Qualitätswein)</td><td>Karl H. Johner, Bischoffingen</td><td>5,20 €</td><td>24,00 €</td></tr>\n    <tr><td>2025 Neuweier Schlossberg Riesling halbtrocken (Qualitätswein)</td><td>Schloss Neuweier, Baden-Baden</td><td>6,40 €</td><td>31,00 €</td></tr>\n    <tr><td>2025 Burg Ravensburger Husarenkappe Riesling Kabinett trocken (Prädikatswein)</td><td>Burg Ravensburg, Sulzfeld</td><td>6,20 €</td><td>29,50 €</td></tr>\n    <tr><td>2024 Durbacher Plauelrain Chardonnay trocken (Qualitätswein)</td><td>Andreas Laible, Durbach</td><td>7,20 €</td><td>35,00 €</td></tr>\n    <tr><td>2024 Durbacher Kochberg Weißer Burgunder Spätlese trocken (Prädikatswein)</td><td>Heinrich Männle, Durbach</td><td>7,50 €</td><td>36,00 €</td></tr>\n    <tr><td>2023 Grauer Burgunder trocken, Selection S (Qualitätswein)</td><td>Franz Keller, Vogtsburg-Oberbergen</td><td>8,50 €</td><td>41,00 €</td></tr>\n    <tr><td>2023 Ihringer Winkelberg Gewürztraminer Spätlese trocken (Prädikatswein)</td><td>Dr. Heger, Ihringen</td><td>8,80 €</td><td>42,00 €</td></tr>\n  </table>\n  <p><strong>Weißweine — Württemberg</strong></p>\n  <table class=\"bier\">\n    <tr><th>Wein</th><th>Erzeuger</th><th>0,2 l</th><th>0,75 l</th></tr>\n    <tr><td>2025 Kleinbottwarer Süßmund Riesling Kabinett trocken (Prädikatswein)</td><td>Graf Adelmann, Kleinbottwar</td><td>6,40 €</td><td>30,00 €</td></tr>\n    <tr><td>2024 Untertürkheimer Gips Weißburgunder trocken (Qualitätswein)</td><td>Gerhard Aldinger, Fellbach</td><td>6,80 €</td><td>32,50 €</td></tr>\n    <tr><td>2024 Neipperger Schlossberg Weißburgunder trocken (Qualitätswein)</td><td>Graf Neipperg, Schwaigern</td><td>6,90 €</td><td>33,00 €</td></tr>\n    <tr><td>2023 Traminer Spätlese (Prädikatswein)</td><td>Herzog von Württemberg, Ludwigsburg</td><td>7,80 €</td><td>37,00 €</td></tr>\n  </table>\n  <p><strong>Roséweine — Baden</strong></p>\n  <table class=\"bier\">\n    <tr><th>Wein</th><th>Erzeuger</th><th>0,2 l</th><th>0,75 l</th></tr>\n    <tr><td>2025 Jechtinger Rosé Nostalgie trocken (Qualitätswein)</td><td>Winzergenossenschaft Jechtingen</td><td>5,40 €</td><td>25,50 €</td></tr>\n    <tr><td>2025 Meersburger Bengel Spätburgunder Weißherbst trocken (Qualitätswein)</td><td>Staatsweingut Meersburg</td><td>6,20 €</td><td>29,50 €</td></tr>\n  </table>\n  <p><strong>Roséweine — Württemberg</strong></p>\n  <table class=\"bier\">\n    <tr><th>Wein</th><th>Erzeuger</th><th>0,2 l</th><th>0,75 l</th></tr>\n    <tr><td>2025 Trollinger Rosé (Qualitätswein)</td><td>Sonnenhof, Vaihingen/Enz</td><td>5,20 €</td><td>24,50 €</td></tr>\n    <tr><td>2025 Schillerwein Rosé halbtrocken (Qualitätswein)</td><td>Remstalkellerei, Weinstadt</td><td>5,00 €</td><td>23,50 €</td></tr>\n  </table>\n  <p><strong>Rotweine — Baden</strong></p>\n  <table class=\"bier\">\n    <tr><th>Wein</th><th>Erzeuger</th><th>0,2 l</th><th>0,75 l</th></tr>\n    <tr><td>2024 Emmendinger Keulenbuckel Schwarzriesling trocken (Qualitätswein)</td><td>Winzergenossenschaft Weingarten</td><td>5,60 €</td><td>26,50 €</td></tr>\n    <tr><td>2024 Kiechlingsberger Ölberg Spätburgunder lieblich (Qualitätswein)</td><td>Winzergenossenschaft Kiechlingsbergen</td><td>5,40 €</td><td>25,50 €</td></tr>\n    <tr><td>2022 Durbacher Plauelrain Spätburgunder Spätlese trocken (Prädikatswein)</td><td>Andreas Laible, Durbach</td><td>8,90 €</td><td>43,00 €</td></tr>\n  </table>\n  <p><strong>Rotweine — Württemberg</strong></p>\n  <table class=\"bier\">\n    <tr><th>Wein</th><th>Erzeuger</th><th>0,2 l</th><th>0,75 l</th></tr>\n    <tr><td>2024 Fellbacher Lämmler Trollinger trocken (Qualitätswein)</td><td>Gerhard Aldinger, Fellbach</td><td>5,60 €</td><td>26,50 €</td></tr>\n    <tr><td>2024 Heilbronner Stiftsberg Schwarzriesling halbtrocken (Qualitätswein)</td><td>Martin Able, Heilbronn</td><td>5,80 €</td><td>27,50 €</td></tr>\n    <tr><td>2023 Beilsteiner Steinberg Samtrot Spätlese halbtrocken (Prädikatswein)</td><td>Amalienhof, Heilbronn</td><td>7,40 €</td><td>35,50 €</td></tr>\n    <tr><td>2023 Bönnigheimer Sonnenberg Spätburgunder trocken (Qualitätswein)</td><td>Ernst Dautel, Bönnigheim</td><td>8,20 €</td><td>39,00 €</td></tr>\n    <tr><td>2022 Hanweiler Berg Lemberger trocken (Qualitätswein)</td><td>Gerhard Aldinger, Fellbach</td><td>7,60 €</td><td>36,50 €</td></tr>\n  </table>\n  <p><strong>Edelsüße Weine — Baden</strong></p>\n  <table class=\"bier\">\n    <tr><th>Wein</th><th>Erzeuger</th><th>0,1 l</th><th>0,375 l</th></tr>\n    <tr><td>2022 Neuweierer Mauerberg Riesling Beerenauslese (Prädikatswein)</td><td>Schloss Neuweier, Baden-Baden</td><td>11,50 €</td><td>42,00 €</td></tr>\n    <tr><td>2022 Sasbacher Limburg Gewürztraminer Eiswein (Prädikatswein)</td><td>Winzergenossenschaft Sasbach</td><td>12,50 €</td><td>48,00 €</td></tr>\n  </table>\n  <p><strong>Edelsüße Weine — Württemberg</strong></p>\n  <table class=\"bier\">\n    <tr><th>Wein</th><th>Erzeuger</th><th>0,1 l</th><th>0,375 l</th></tr>\n    <tr><td>2024 Endersbacher Hintere Klinge Lemberger Weißherbst Eiswein (Prädikatswein)</td><td>Remstalkellerei, Weinstadt</td><td>11,00 €</td><td>42,00 €</td></tr>\n    <tr><td>2022 Neipperger Schloßberg Traminer Eiswein (Prädikatswein)</td><td>Graf Neipperg, Schwaigern</td><td>13,50 €</td><td>52,00 €</td></tr>\n    <tr><td>2023 Strümpfelbacher Nonnenberg Kerner Trockenbeerenauslese (Prädikatswein)</td><td>Remstalkellerei, Weinstadt</td><td>14,00 €</td><td>55,00 €</td></tr>\n  </table>\n  <div class=\"vi\">Thực đơn đồ uống mẫu: vang trắng / vang hồng / vang đỏ / vang ngọt tráng miệng cao cấp, vùng Baden &amp; Württemberg, kèm giá theo ly và theo chai.</div>\n</section>\n\n<section class=\"chapter\" id=\"p5\">\n  <div class=\"chapter-head\">\n    <span class=\"chapter-num\">§5</span>\n    <h2 class=\"chapter-title-de\">4-Gänge-Menü &amp; Weinbegleitung (LS11)</h2>\n    <span class=\"lf-tag\">Getränke</span>\n  </div>\n  <p class=\"chapter-title-vi\">Thực đơn 4 món &amp; rượu vang đi kèm (LS11)</p>\n\n  <div class=\"block\">\n    <div class=\"de\"><span class=\"tag\">Aufgabe (LS11)</span>2 Schaumweine als Aperitif vorschlagen (wie auf der Getränkekarte). Zu jedem Gang einen passenden Wein vorschlagen. Die Weinauswahl begründen.</div>\n    <div class=\"vi\"><span class=\"tag\">VI</span>Đề xuất 2 loại vang sủi làm Aperitif (theo đúng chuẩn trình bày thực đơn). Đề xuất rượu vang đi kèm từng món. Giải thích căn cứ lựa chọn rượu.</div>\n  </div>\n  <div class=\"block\">\n    <div class=\"de\"><span class=\"tag\">Aperitif · Schaumwein</span><strong>2019 Aldinger Sekt Brut Nature</strong> (Weingut Aldinger, Fellbach — 50 % Chardonnay, 25 % Pinot Meunier, 25 % Pinot Noir — Flaschengärung, 12,0 % vol — 23,50 €). <strong>2019 Aldinger No. 532 Blanc Brut</strong> (Weingut Aldinger — Chardonnay, Pinot Blanc, Pinot Meunier, Pinot Noir — Flaschengärung, BIO, 12,0 % vol).</div>\n    <div class=\"vi\"><span class=\"tag\">VI</span><strong>Rượu khai vị · Vang sủi:</strong> <strong>2019 Aldinger Sekt Brut Nature</strong> (Weingut Aldinger, Fellbach — 50% Chardonnay, 25% Pinot Meunier, 25% Pinot Noir — lên men chai, 12,0% vol — 23,50 €). <strong>2019 Aldinger No. 532 Blanc Brut</strong> (Weingut Aldinger — Chardonnay, Pinot Blanc, Pinot Meunier, Pinot Noir — lên men chai, BIO, 12,0% vol).</div>\n  </div>\n  <div class=\"block\">\n    <div class=\"de\"><span class=\"tag\">Gang 1 · Suppe</span>Maronen-Creme-Suppe mit gerösteten Haselnüssen und Thymian → <strong>2023 Grauer Burgunder trocken, Selection S</strong> (Franz Keller, Vogtsburg-Oberbergen — Qualitätswein, Baden).</div>\n    <div class=\"vi\"><span class=\"tag\">VI</span><strong>Món 1 · Súp:</strong> Súp kem hạt dẻ rừng với hạt dẻ nướng và cỏ xạ hương → <strong>Grauer Burgunder trocken 2023, Selection S</strong> (Franz Keller, Vogtsburg-Oberbergen — Qualitätswein, Baden).</div>\n  </div>\n  <div class=\"block\">\n    <div class=\"de\"><span class=\"tag\">Gang 2 · Fisch</span>Gebratene Jakobsmuschel mit brauner Butter, Blumenkohlpüree und Zitronenabrieb → <strong>2025 Meersburger Bengel Spätburgunder Weißherbst trocken</strong> (Staatsweingut Meersburg) oder <strong>2024 Untertürkheimer Gips Weißburgunder trocken</strong> (Gerhard Aldinger, Fellbach).</div>\n    <div class=\"vi\"><span class=\"tag\">VI</span><strong>Món 2 · Cá:</strong> Sò điệp áp chảo bơ nâu, purée súp lơ trắng &amp; vỏ chanh bào → <strong>Spätburgunder Weißherbst trocken 2025, Meersburger Bengel</strong> (Staatsweingut Meersburg) hoặc <strong>Weißburgunder trocken 2024, Untertürkheimer Gips</strong> (Gerhard Aldinger, Fellbach).</div>\n  </div>\n  <div class=\"block\">\n    <div class=\"de\"><span class=\"tag\">Gang 3 · Hauptgang</span>Rosa gebratene Hirschmedaillons mit Rotweinjus, glasiertem Rosenkohl und Kartoffelgratin → <strong>2023 Beilsteiner Steinberg Samtrot Spätlese halbtrocken</strong> (Prädikatswein, Württemberg — Amalienhof, Heilbronn).</div>\n    <div class=\"vi\"><span class=\"tag\">VI</span><strong>Món 3 · Món chính:</strong> Thịt tuần lộc áp chảo tái hồng với sốt rượu vang đỏ, bắp cải Rosenkohl tráng đường &amp; khoai tây đút lò → <strong>Samtrot Spätlese halbtrocken 2023, Beilsteiner Steinberg</strong> (Prädikatswein, Württemberg — Amalienhof, Heilbronn).</div>\n  </div>\n  <div class=\"block\">\n    <div class=\"de\"><span class=\"tag\">Gang 4 · Dessert</span>Gefüllter Bratapfel mit Marzipan, Rosinen und Zimt, dazu hausgemachtes Vanilleeis → <strong>2022 Neuweierer Mauerberg Riesling Beerenauslese</strong> (Schloss Neuweier, Baden-Baden).</div>\n    <div class=\"vi\"><span class=\"tag\">VI</span><strong>Món 4 · Tráng miệng:</strong> Táo nướng nhân hạnh nhân Marzipan, nho khô &amp; quế, ăn kèm kem vani nhà làm → <strong>Riesling Beerenauslese 2022, Neuweierer Mauerberg</strong> (Schloss Neuweier, Baden-Baden).</div>\n  </div>\n  <div class=\"warn\">\n    <span class=\"tag\">Begründung · Hauptgang</span>\n    Hirschmedaillons: sehr kräftig, gehaltvoll, aromaintensiv → dazu ein kräftiger, gehaltvoller Rotwein (Samtrot Spätlese). Der glasierte Rosenkohl bringt eine süßliche Komponente → halbtrocken wirkt ausgleichend (Süß + Süß = ausgleichend).\n    <div class=\"vi\">Lập luận · Món chính: Thịt tuần lộc rất đậm đà, giàu dinh dưỡng, hương vị nồng nàn → cần rượu vang đỏ mạnh mẽ, đậm đà tương xứng (Samtrot Spätlese). Bắp cải tráng đường tạo vị ngọt nhẹ trong đĩa ăn → chọn rượu halbtrocken (ngọt nhẹ) sẽ tương tác cân bằng (Ngọt + Ngọt = cân bằng).</div>\n  </div>\n</section>\n\n<section class=\"chapter\" id=\"quiz\">\n  <div class=\"chapter-head\">\n    <span class=\"chapter-num\"><svg viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" style=\"display:inline-block;vertical-align:-4px;\"><path d=\"M12 20h9\"/><path d=\"M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z\"/></svg></span>\n    <h2 class=\"chapter-title-de\">Prüfungs-Check — Selbsttest</h2>\n    <span class=\"lf-tag\">10 Fragen</span>\n  </div>\n  <p class=\"chapter-title-vi\">Tự kiểm tra — 10 câu</p>\n\n  <div class=\"block\">\n    <div class=\"q\"><strong>1.</strong> Nenne die 3 Faktoren für die Weinauswahl.</div>\n    <button class=\"toggle-btn\" onclick=\"toggleAns('a1')\">Musterlösung anzeigen</button>\n    <div class=\"ans\" id=\"a1\" style=\"display:none\">Zubereitungsart, Fülle &amp; Gehalt, Aromaintensität.</div>\n  </div>\n  <div class=\"block\">\n    <div class=\"q\"><strong>2.</strong> Gebratenes Rumpsteak → welcher Wein? Gedünsteter Fisch → welcher Wein?</div>\n    <button class=\"toggle-btn\" onclick=\"toggleAns('a2')\">Musterlösung anzeigen</button>\n    <div class=\"ans\" id=\"a2\" style=\"display:none\">Rumpsteak (gebraten, kräftig): mittlerer bis kräftiger Rotwein, z. B. Lemberger Q.b.A. Gedünsteter Fisch (leicht, dezent): leichter Weißwein, z. B. Riesling Q.b.A.</div>\n  </div>\n  <div class=\"block\">\n    <div class=\"q\"><strong>3.</strong> Süß + Süß = ? Nenne ein Beispiel.</div>\n    <button class=\"toggle-btn\" onclick=\"toggleAns('a3')\">Musterlösung anzeigen</button>\n    <div class=\"ans\" id=\"a3\" style=\"display:none\">Ausgleichend. Beispiel: Panna Cotta + Riesling Beerenauslese.</div>\n  </div>\n  <div class=\"block\">\n    <div class=\"q\"><strong>4.</strong> Warum nicht Sauer + Sauer kombinieren?</div>\n    <button class=\"toggle-btn\" onclick=\"toggleAns('a4')\">Musterlösung anzeigen</button>\n    <div class=\"ans\" id=\"a4\" style=\"display:none\">Sauer + Sauer = Sauer² — die Säure verdoppelt sich, der Geschmack wird extrem sauer und verdorben.</div>\n  </div>\n  <div class=\"block\">\n    <div class=\"q\"><strong>5.</strong> Nenne die 4 Regeln für die Reihenfolge der Weine im Menü.</div>\n    <button class=\"toggle-btn\" onclick=\"toggleAns('a5')\">Musterlösung anzeigen</button>\n    <div class=\"ans\" id=\"a5\" style=\"display:none\">Dezent vor kräftig · weiß vor rot · jung vor alt · trocken vor süß.</div>\n  </div>\n  <div class=\"block\">\n    <div class=\"q\"><strong>6.</strong> Welcher Wein zum Hauptgang (Hirschmedaillons mit glasiertem Rosenkohl) — und warum halbtrocken?</div>\n    <button class=\"toggle-btn\" onclick=\"toggleAns('a6')\">Musterlösung anzeigen</button>\n    <div class=\"ans\" id=\"a6\" style=\"display:none\">2023 Beilsteiner Steinberg Samtrot Spätlese halbtrocken. Hirsch = sehr kräftig → kräftiger Rotwein. Glasierter Rosenkohl = süßliche Komponente → halbtrocken wirkt ausgleichend.</div>\n  </div>\n  <div class=\"block\">\n    <div class=\"q\"><strong>7.</strong> Nenne 2 Schaumweine als Aperitif aus dem Menü.</div>\n    <button class=\"toggle-btn\" onclick=\"toggleAns('a7')\">Musterlösung anzeigen</button>\n    <div class=\"ans\" id=\"a7\" style=\"display:none\">2019 Aldinger Sekt Brut Nature und 2019 Aldinger No. 532 Blanc Brut (beide Flaschengärung, 12,0 % vol).</div>\n  </div>\n  <div class=\"block\">\n    <div class=\"q\"><strong>8.</strong> Welcher Wein zur Maronen-Creme-Suppe?</div>\n    <button class=\"toggle-btn\" onclick=\"toggleAns('a8')\">Musterlösung anzeigen</button>\n    <div class=\"ans\" id=\"a8\" style=\"display:none\">2023 Grauer Burgunder trocken, Selection S (Franz Keller).</div>\n  </div>\n  <div class=\"block\">\n    <div class=\"q\"><strong>9.</strong> Welcher Wein zum Dessert (Bratapfel + Vanilleeis)?</div>\n    <button class=\"toggle-btn\" onclick=\"toggleAns('a9')\">Musterlösung anzeigen</button>\n    <div class=\"ans\" id=\"a9\" style=\"display:none\">2022 Neuweierer Mauerberg Riesling Beerenauslese — süß zu süß = ausgleichend.</div>\n  </div>\n  <div class=\"block\">\n    <div class=\"q\"><strong>10.</strong> Zanderfilet mit Buttersauce und Spargel → welcher Wein?</div>\n    <button class=\"toggle-btn\" onclick=\"toggleAns('a10')\">Musterlösung anzeigen</button>\n    <div class=\"ans\" id=\"a10\" style=\"display:none\">Durbacher Plauelrain Chardonnay trocken oder Untertürkheimer Gips Weißburgunder trocken.</div>\n  </div>\n</section>\n</main>\n\n<footer>\n  <div class=\"de\">Zusammenfassung zum Lernen — keine offizielle IHK-Antwort. Quelle: BFK 1 (LF07, LS07 &amp; LS11).</div>\n  <div class=\"vi\">Tài liệu tổng hợp để ôn thi — không phải đáp án chính thức của IHK. Nguồn: BFK 1 (LF07, LS07 &amp; LS11).</div>\n</footer>\n\n\n\n</div>",
  "qa": [
    {
      "q": "Nenne die 3 zentralen Faktoren bei der Weinauswahl zu einer Speise.",
      "qVi": "Nêu 3 yếu tố trọng tâm quyết định việc lựa chọn rượu vang phù hợp với một món ăn?",
      "a": "1. Zubereitungsart (Phương pháp chế biến) · 2. Fülle & Gehalt (Độ đạm béo và đậm đà của thực phẩm) · 3. Aromaintensität (Cường độ và độ phức hợp của hương vị).",
      "aVi": "1. Phương pháp chế biến · 2. Độ đạm béo và cấu trúc món ăn · 3. Cường độ hương thơm và gia vị.",
      "why": "3 yếu tố này quyết định rượu sẽ hỗ trợ tôn vinh món ăn hay lấn át, phá vỡ cấu trúc của món ăn."
    },
    {
      "q": "Wie beeinflusst die Zubereitungsart die Wahl des Weines? Nenne Beispiele.",
      "qVi": "Phương pháp chế biến tác động thế nào đến việc chọn vang? Cho ví dụ minh họa?",
      "a": "Gebraten, gegrillt, geschmort (Röstaromen, Kruste) erfordert kräftige Weine mit Körper und Tannin. Gedünstet, pochiert, gekocht erfordert dezente, elegante, säurebetonte Weißweine.",
      "aVi": "Chiên rán, nướng than, hầm nhừ (nhiều hương nướng cháy, đậm vị) đòi hỏi vang đậm, có cấu trúc tốt. Hấp, chần, luộc (thanh nhẹ, giữ vị tươi) đòi hỏi vang trắng thanh lịch, chua nhẹ tinh tế.",
      "why": "Nhiệt độ cao và phản ứng Maillard tạo ra các hợp chất hương vị nồng đậm đòi hỏi rượu có nồng độ tương xứng."
    },
    {
      "q": "Welche Geschmacksinteraktionen wirken ausgleichend và welche Kombination ist ein absolutes No-Go?",
      "qVi": "Những tương tác vị giác nào đem lại sự cân bằng và sự kết hợp nào là điều tối kỵ?",
      "a": "Ausgleichend: Süß + Süß (z. B. Dessert + Auslese), Salzig + Sauer (Salz bindet Weinsäure), Würzig + Würzig. Absolutes No-Go: Sauer + Sauer = Sauer² (doppelte Säure wirkt aggressiv, ätzend und zerstört den Geschmack).",
      "aVi": "Cân bằng: Ngọt + Ngọt (tráng miệng + vang ngọt), Mặn + Chua (muối làm dịu axit rượu), Đậm gia vị + Đậm gia vị. Tối kỵ: Chua + Chua = Chua bình phương (vị chua nhân đôi gây gắt họng và phá hủy vị giác).",
      "why": "Món ăn chua (ví dụ gỏi giấm nồng) gặp vang chua cao (Riesling trẻ) sẽ tạo cảm giác chua xót buốt miệng."
    },
    {
      "q": "Nenne die 4 Grundregeln für die Reihenfolge der Weine in einem Menü.",
      "qVi": "Kể 4 nguyên tắc vàng về thứ tự phục vụ các loại rượu vang trong một thực đơn nhiều món?",
      "a": "1. Dezent vor kräftig/gehaltvoll · 2. Weiß vor rot · 3. Jung vor alt/gereift · 4. Trocken vor süß.",
      "aVi": "1. Vang thanh nhẹ trước vang đậm đà · 2. Vang trắng trước vang đỏ · 3. Vang trẻ trước vang lâu năm · 4. Vang chát (khô) trước vang ngọt.",
      "why": "Bảo vệ gai vị giác của thực khách không bị tê liệt hoặc bão hòa trước khi thưởng thức các món tiếp theo."
    },
    {
      "q": "Welcher Wein passt zu gebratenem Bachforellenfilet mit Alblinsen und Petersilienkartoffeln?",
      "qVi": "Loại rượu nào phù hợp nhất với filet cá hồi suối chiên ăn kèm đậu Alblinsen và khoai tây cần tây?",
      "a": "Ein 2024er Neuweier Schlossberg Riesling halbtrocken (Qualitätswein, Baden).",
      "aVi": "Riesling halbtrocken 2024, Neuweier Schlossberg (Qualitätswein, Baden).",
      "why": "Độ ngọt nhẹ (halbtrocken) và vị chua thanh của Riesling cân bằng tuyệt vời với vị bùi đất của đậu lăng và mỡ cá chiên."
    },
    {
      "q": "Welcher Wein empfiehlt sich zu gegrillten Schweinemedaillons mit Pfifferlingrahmsoße?",
      "qVi": "Gợi ý rượu vang cho món thăn heo nướng sốt kem nấm Pfifferling ăn kèm bông cải xanh?",
      "a": "Durbacher Kochberg Weißer Burgunder Spätlese trocken (Prädikatswein, Baden) oder ein kräftiger Grauburgunder.",
      "aVi": "Weißer Burgunder Spätlese trocken, Durbacher Kochberg (Baden) hoặc Grauburgunder đậm đà.",
      "why": "Sốt kem béo ngậy và nấm rừng cần rượu vang trắng ủ muộn có độ đậm (Körper), cấu trúc béo mượt và axit êm dịu."
    },
    {
      "q": "Welcher Wein passt zu auf der Haut gebratenem Zanderfilet mit Buttersauce und Spargel?",
      "qVi": "Món cá vược Zander áp chảo da giòn kèm sốt bơ và măng tây hợp với rượu vang nào?",
      "a": "Durbacher Plauelrain Chardonnay trocken oder Untertürkheimer Gips Weißburgunder trocken.",
      "aVi": "Chardonnay trocken, Durbacher Plauelrain hoặc Weißburgunder trocken, Untertürkheimer Gips.",
      "why": "Măng tây kỵ vị chua gắt và tannin; Chardonnay hoặc Weißburgunder êm đằm với sốt bơ mà không làm đắng măng tây."
    },
    {
      "q": "Welche Weine eignen sich im 4-Gänge-Menü (LS11) als Aperitif und warum?",
      "qVi": "Trong thực đơn 4 món (LS11), những loại vang sủi nào được đề xuất làm Aperitif và lý do?",
      "a": "2019 Aldinger Sekt Brut Nature (Chardonnay, Pinot Meunier, Pinot Noir) oder Aldinger No. 532 Blanc Brut. Durch die feine Kohlensäure und die trockene Art (Brut Nature) wird der Speichelfluss angeregt und der Appetit geweckt.",
      "aVi": "Aldinger Sekt Brut Nature 2019 hoặc Aldinger No. 532 Blanc Brut. Bọt khí tinh tế và độ chát khô thanh sạch kích thích tuyến nước bọt và đánh thức vị giác trước bữa ăn.",
      "why": "Aperitif không được làm ngấy bụng hay quá ngọt để chuẩn bị tốt nhất cho món súp đầu tiên."
    },
    {
      "q": "Welcher Wein begleitet die Maronen-Creme-Suppe mit gerösteten Haselnüssen und Thymian?",
      "qVi": "Rượu vang nào đi kèm món súp kem hạt dẻ rừng với hạt phỉ nướng và cỏ xạ hương?",
      "a": "2023 Grauer Burgunder trocken, Selection S (Franz Keller, Qualitätswein, Baden).",
      "aVi": "Grauer Burgunder trocken 2023, Selection S (Franz Keller, Qualitätswein, Baden).",
      "why": "Món súp kem bùi béo cần một dòng vang Grauburgunder nồng nàn, đượm vị hạt nướng và cấu trúc dầy dặn."
    },
    {
      "q": "Welcher Wein begleitet den Hauptgang (Hirschmedaillons mit Rotweinjus và glasiertem Rosenkohl)? Begründe die Wahl!",
      "qVi": "Loại rượu nào đi kèm món thịt tuần lộc áp chảo với sốt vang đỏ & bắp cải tráng đường? Giải thích lập luận chuyên môn!",
      "a": "2023 Beilsteiner Steinberg Samtrot Spätlese halbtrocken (Württemberg). Begründung: Hirsch ist kräftig und gehaltvoll → kräftiger Rotwein nötig. Der glasierte Rosenkohl bringt Süße ins Spiel → die halbtrockene Note gleicht die Süße perfekt aus (Süß + Süß = ausgleichend).",
      "aVi": "Samtrot Spätlese halbtrocken 2023, Beilsteiner Steinberg (Württemberg). Lập luận: thịt nai rừng nồng đậm cần vang đỏ mạnh mẽ; bắp cải tráng đường mang vị ngọt nhẹ nên vị bán ngọt (halbtrocken) của rượu sẽ hòa quyện cân bằng (Ngọt + Ngọt = Cân bằng).",
      "why": "Nếu chọn vang đỏ quá khô chát (trocken), vị đắng chát sẽ bùng lên khi ăn kèm rau củ tráng đường."
    },
    {
      "q": "Welcher Wein passt zum Dessert (Gefüllter Bratapfel mit Marzipan und Vanilleeis)?",
      "qVi": "Loại rượu nào phù hợp nhất với món tráng miệng Táo nướng nhân Marzipan kèm kem vani?",
      "a": "2022 Neuweierer Mauerberg Riesling Beerenauslese (Schloss Neuweier, Baden).",
      "aVi": "Riesling Beerenauslese 2022, Neuweierer Mauerberg (Schloss Neuweier, Baden).",
      "why": "Món ngọt đòi hỏi rượu phải có độ ngọt cao hơn hoặc tương đương món ăn để rượu không bị nhạt nhẽo hay chua gắt."
    },
    {
      "q": "Warum ist ein schwerer Rotwein zu zart gedünstetem Forellenfilet ein gastronomischer Fehler?",
      "qVi": "Tại sao phục vụ một ly vang đỏ nặng nhiều tannin cho món cá hồi hấp thanh nhẹ lại là một lỗi phục vụ nghiêm trọng?",
      "a": "Das kräftige Tannin und der hohe Alkohol überdecken das zarte Fischeiweiß vollkommen; zudem erzeugt die Kombination von Tannin mit Fischeiweiß einen metallisch-bitteren Fehlgeschmack.",
      "aVi": "Chất chát tannin và nồng độ cồn cao sẽ hoàn toàn lấn át vị ngọt thanh của thịt cá; ngoài ra tannin khi gặp đạm cá hấp sẽ phản ứng tạo ra vị tanh kim loại đắng ngắt.",
      "why": "Quy tắc kinh điển trong ngành ẩm thực khách sạn: cá hấp thanh nhẹ chỉ đi với vang trắng tinh tế."
    }
  ],
  "quiz": [
    {
      "q": "Welche 3 Faktoren sind entscheidend für die Auswahl des passenden Weines zu einer Speise?",
      "qVi": "3 yếu tố quan trọng hàng đầu khi chọn rượu vang phù hợp với món ăn là gì?",
      "options": [
        "Preis des Weines, Farbe der Tischdecke, Jahreszeit",
        "Zubereitungsart, Fülle & Gehalt, Aromaintensität",
        "Flaschenform, Korkenart, Trinktemperatur",
        "Herkunftsland des Gastes, Besteckart, Uhrzeit"
      ],
      "answer": 1,
      "why": "Zubereitungsart, Fülle & Gehalt der Speise sowie Aromaintensität bilden das gastronomische Fundament."
    },
    {
      "q": "Welche Geschmacksverbindung gilt in der Gastronomie als absolutes No-Go?",
      "qVi": "Sự kết hợp vị giác nào bị coi là điều cấm kỵ tuyệt đối trong ẩm thực?",
      "options": [
        "Süß + Süß",
        "Salzig + Sauer",
        "Sauer + Sauer",
        "Würzig + Würzig"
      ],
      "answer": 2,
      "why": "Sauer + Sauer = Sauer² — die Säuren potenzieren sich, der Geschmack wird ungenießbar sauer und kratzend."
    },
    {
      "q": "Wie lautet die Regel für die Reihenfolge der Weine in einem mehrgängigen Menü?",
      "qVi": "Quy tắc chuẩn về thứ tự phục vụ rượu vang trong thực đơn nhiều món là gì?",
      "options": [
        "Kräftig vor dezent · rot vor weiß · alt vor jung",
        "Süß vor trocken · rot vor weiß · schwer vor leicht",
        "Dezent vor kräftig · weiß vor rot · jung vor alt · trocken vor süß",
        "Immer Rotwein zuerst, danach Weißwein und Sekt"
      ],
      "answer": 2,
      "why": "Reihenfolge: dezent vor kräftig, weiß vor rot, jung vor alt, trocken vor süß."
    },
    {
      "q": "Welcher Wein empfiehlt sich zu gegrillten Schweinemedaillons mit Pfifferlingrahmsoße?",
      "qVi": "Dòng rượu nào phù hợp nhất với thăn heo nướng sốt kem nấm Pfifferling?",
      "options": [
        "Sehr leichter, junger Riesling mit rassiger Säure",
        "Durbacher Kochberg Weißer Burgunder Spätlese trocken (oder kräftiger Grauburgunder)",
        "Extrem süßer Eiswein",
        "Leichter Perlwein mit Schraubverschluss"
      ],
      "answer": 1,
      "why": "Die gehaltvolle Rahmsoße und die Pilzaromen verlangen einen körperreichen, säuremilden Weißburgunder."
    },
    {
      "q": "Welcher Wein passt hervorragend zu auf der Haut gebratenem Zanderfilet mit Spargel?",
      "qVi": "Món cá vược Zander chiên giòn da ăn cùng măng tây và sốt bơ nên đi kèm rượu gì?",
      "options": [
        "Tanninreicher Cabernet Sauvignon",
        "Chardonnay trocken oder Weißburgunder trocken",
        "Süßer Glühwein",
        "Schwerer Barrique-Spätburgunder"
      ],
      "answer": 1,
      "why": "Spargel verträgt weder starke Säure noch kräftiges Tannin; Chardonnay und Weißburgunder harmonieren ideal mit Butter und Spargel."
    },
    {
      "q": "Warum wählt man zum Hauptgang Hirschmedaillons mit glasiertem Rosenkohl einen 'halbtrockenen' Rotwein (Samtrot Spätlese)?",
      "qVi": "Vì sao món thịt tuần lộc áp chảo kèm bắp cải tráng đường lại chọn vang đỏ 'halbtrocken'?",
      "options": [
        "Weil kein anderer Rotwein im Keller verfügbar ist",
        "Weil der glasierte Rosenkohl eine süße Komponente hat und 'Süß + Süß' ausgleichend wirkt",
        "Weil halbtrockener Wein den Wildgeschmack komplett übertüncht",
        "Weil Wildfleisch gesetzlich nur mit Süßwein serviert werden darf"
      ],
      "answer": 1,
      "why": "Die leichte Restsüße des Samtrot halbtrocken fängt die Süße des glasierten Rosenkohls harmonisch auf."
    },
    {
      "q": "Welcher Wein eignet sich zu einem gefüllten Bratapfel mit Marzipan und Vanilleeis?",
      "qVi": "Món tráng miệng Táo nướng nhân Marzipan và kem vani phù hợp nhất với loại rượu nào?",
      "options": [
        "Trockener Lemberger Qualitätswein",
        "Neuweierer Mauerberg Riesling Beerenauslese (edelsüß)",
        "Herber Champagner Brut Nature",
        "Tanninreicher Bordeaux"
      ],
      "answer": 1,
      "why": "Ein üppiges, süßes Dessert verlangt einen edelsüßen Dessertwein (Beerenauslese), damit der Wein nicht sauer wirkt."
    },
    {
      "q": "Welche Eigenschaft macht Sekt Brut Nature zum perfekten Aperitif vor dem Menü?",
      "qVi": "Đặc tính nào khiến vang sủi Brut Nature trở thành thức uống khai vị hoàn hảo trước bữa ăn?",
      "options": [
        "Er macht schnell betrunken, sodass der Gast mehr bestellt",
        "Er regt durch feines Mousseux und trockenen Geschmack die Magensäfte an und weckt den Appetit",
        "Er sättigt den Gast, damit kleinere Portionen gereicht werden können",
        "Er neutralisiert den Mund so stark, dass man kein Wasser mehr braucht"
      ],
      "answer": 1,
      "why": "Feine Perlage und trockene Art wirken appetitanregend und bereiten den Gaumen auf das Menü vor."
    },
    {
      "q": "Was geschieht, wenn man einen gerbstoffreichen Rotwein zu zart pochiertem Fischfilet serviert?",
      "qVi": "Điều gì sẽ xảy ra nếu phục vụ một chai vang đỏ nhiều tannin chát cho món cá hấp thanh nhẹ?",
      "options": [
        "Der Fisch schmeckt süßer und fruchtiger",
        "Die Tannine überdecken den zarten Fisch und erzeugen einen metallisch-bitteren Fehlgeschmack",
        "Die Fischgräten lösen sich magisch auf",
        "Es entsteht die perfekte Harmonie der Provence"
      ],
      "answer": 1,
      "why": "Gerbstoffe (Tannine) reagieren mit feinem Fischeiweiß und erzeugen einen abstoßend metallischen Geschmack."
    },
    {
      "q": "Aus welchem Anbaugebiet stammt die Rebsorte 'Lemberger' vorwiegend im deutschen Menü?",
      "qVi": "Giống nho đỏ 'Lemberger' chủ yếu là đặc sản nổi tiếng của vùng trồng nho nào ở Đức?",
      "options": [
        "Mosel",
        "Württemberg",
        "Mittelrhein",
        "Ahr"
      ],
      "answer": 1,
      "why": "Württemberg ist die unbestrittene Hochburg des Lembergers (Blaufränkisch) in Deutschland."
    }
  ],
  "vokabeln": [
    {
      "de": "die Weinempfehlung / Weinbegleitung",
      "vi": "Tư vấn chọn rượu / Rượu vang đi kèm xuyên suốt các món ăn"
    },
    {
      "de": "die Zubereitungsart",
      "vi": "Phương pháp chế biến nhiệt (chiên, nướng, hầm, luộc, hấp, chần)"
    },
    {
      "de": "die Aromaintensität",
      "vi": "Cường độ và độ nồng nàn của hương vị món ăn và rượu"
    },
    {
      "de": "die Fülle und der Gehalt",
      "vi": "Cấu trúc độ béo, đạm và độ đậm đặc của thực phẩm / rượu"
    },
    {
      "de": "ausgleichend wirken",
      "vi": "Tác động cân bằng hài hòa giữa các vị (Ngọt + Ngọt, Mặn + Chua)"
    },
    {
      "de": "die Geschmacksinteraktion",
      "vi": "Sự tương tác qua lại giữa các vị cơ bản trên gai vị giác"
    },
    {
      "de": "der Speisenbegleiter",
      "vi": "Dòng rượu lý tưởng để kết hợp đồng điệu với thức ăn"
    },
    {
      "de": "die Menüabfolge",
      "vi": "Trình tự các món ăn và thứ tự phục vụ rượu trong thực đơn"
    },
    {
      "de": "der Aperitif",
      "vi": "Đồ uống khai vị trước bữa ăn (kích thích thèm ăn và tiết nước bọt)"
    },
    {
      "de": "der Digestif",
      "vi": "Đồ uống tiêu vị sau bữa ăn (hỗ trợ tiêu hóa thức ăn)"
    },
    {
      "de": "pochieren / dünsten",
      "vi": "Chần chín trong nước nóng / Hấp chín nhẹ nhàng (cần vang thanh nhẹ)"
    },
    {
      "de": "schmoren / braten",
      "vi": "Nấu hầm kỹ / Chiên rán áp chảo đậm vị (cần vang đậm đà)"
    },
    {
      "de": "edelsüß",
      "vi": "Vang ngọt quý tộc tự nhiên (Auslese, Beerenauslese, Eiswein, TBA)"
    },
    {
      "de": "der Weißherbst",
      "vi": "Vang hồng chất lượng của Đức từ 1 giống nho đỏ duy nhất ép nhẹ"
    },
    {
      "de": "der Schillerwein",
      "vi": "Đặc sản vang Württemberg ép chung nho đỏ và nho trắng từ khi hái"
    },
    {
      "de": "der Sommelier",
      "vi": "Chuyên gia tư vấn và phục vụ rượu vang chuyên nghiệp tại nhà hàng"
    },
    {
      "de": "die Degustation",
      "vi": "Buổi nếm thử và đánh giá phẩm chất rượu vang"
    },
    {
      "de": "der Körper (körperreich)",
      "vi": "Cấu trúc độ đậm và cảm giác đầy đặn của rượu trong vòm miệng"
    },
    {
      "de": "die Weinsäure",
      "vi": "Axit tự nhiên trong rượu (tạo cảm giác tươi mát, sắc sảo)"
    },
    {
      "de": "die Harmonie",
      "vi": "Sự hòa quyện tuyệt hảo không bên nào lấn át giữa món ăn và rượu vang"
    }
  ]
}
]);
