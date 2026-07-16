/* DE→VI: bấm từ đã đánh dấu (.term) để xem nghĩa. Không auto-bọc list/UI. */
(function (w) {
  "use strict";

  const B1_VOCAB = {
    "Atmosphäre":"không khí / bầu không khí","Preisempfinden":"cảm nhận về giá","Sauberkeit":"sạch sẽ",
    "Service":"phục vụ","Hygiene":"vệ sinh","Garstufe":"độ chín (thịt)","Anrichtung":"cách bày món",
    "Reinigungsplan":"kế hoạch vệ sinh","Teamschulung":"đào tạo nhóm","Geschäftsleitung":"ban giám đốc",
    "Restaurantleitung":"ban quản lý nhà hàng","Umsatzzahlen":"doanh số","Gästekommentare":"nhận xét khách",
    "Verbesserungsvorschläge":"đề xuất cải thiện","Feedbackbogen":"phiếu góp ý","Internetbewertungen":"đánh giá online",
    "Briefing":"họp giao ban","Ausgabe-Check":"kiểm trước khi mang ra","Preis-Leistung":"tỷ lệ giá–chất lượng",
    "Speisenqualität":"chất lượng món","vegetarische Alternativen":"món chay thay thế","vegane Optionen":"món thuần chay",
    "Gästebedarfe":"nhu cầu của khách","Auswertung":"phân tích / đánh giá","Bewertungskriterien":"tiêu chí đánh giá",
    "Kritikpunkte":"điểm phê bình","Zufriedenheit":"sự hài lòng","Umsatz":"doanh thu","Umsatzrückgang":"sụt giảm doanh thu",
    "Ambiente":"không gian","Gemütlichkeit":"sự ấm cúng","Geschmack":"hương vị","Temperatur":"nhiệt độ",
    "HACCP":"HACCP (ATTP)","Schulung":"đào tạo","Kompetenz":"năng lực","Freundlichkeit":"sự thân thiện",
    "Sammeln":"thu thập","Kategorisieren":"phân loại","Häufigkeit":"tần suất","Kontrolle":"kiểm tra",
    "Maßnahme":"biện pháp","Maßnahmen":"các biện pháp","Vegetarisch":"ăn chay","Vegan":"thuần chay",
    "Flexitarier":"ăn chay linh hoạt","Pescetarier":"ăn cá, không thịt","Pescetarisch":"ăn cá, không thịt",
    "Laktosefrei":"không lactose","Glutenfrei":"không gluten","Gluten":"gluten","Zöliakie":"bệnh Celiac",
    "Halal":"halal","Koscher":"kosher","Low-Carb":"ít carb","Keto":"keto","Allergene":"chất gây dị ứng",
    "Gelatine":"gelatin","Kreuzkontamination":"lây nhiễm chéo","Lebensmittel":"thực phẩm",
    "Hauptkomponente":"thành phần chính","Hauptrohstoff":"nguyên liệu chính","Zubereitungsart":"cách chế biến",
    "Garnitur":"garnitur / …-Art","Soße":"nước sốt","Gemüsebeilage":"rau kèm","Sättigungsbeilage":"món no",
    "Salat":"salad","Vorspeisen":"khai vị","Hauptgänge":"món chính","Desserts":"tráng miệng","Getränke":"đồ uống",
    "Vorspeise":"khai vị","Suppe":"súp","Hauptgericht":"món chính","Nachspeise":"tráng miệng","Dessert":"tráng miệng",
    "Menü":"set menu","Kalte Vorspeise":"khai vị nguội","Warmes Zwischengericht":"món nóng xen giữa",
    "Saison":"mùa vụ","Konsistenz":"kết cấu","Garart":"cách chế biến","gebraten":"chiên/rán",
    "geschmort":"om/hầm","gegrillt":"nướng vỉ","gedünstet":"hấp/om nhẹ","Speisekarte":"thực đơn",
    "Obst":"trái cây","Südfrüchte":"trái cây nhiệt đới","Schalenobst":"quả hạch","Beerenobst":"quả mọng",
    "Kernobst":"quả có hạt","Steinobst":"quả có hột cứng","Kohlenhydrate":"tinh bột","Ballaststoffe":"chất xơ",
    "Pektin":"pectin","Mineralstoffe":"khoáng chất","Folsäure":"axit folic","Sekundäre Pflanzenstoffe":"SPS",
    "Carotinoide":"carotenoid","Polyphenole":"polyphenol","Durchfall":"tiêu chảy","Pürieren":"xay nhuyễn",
    "Backen":"nướng lò","Pochieren":"om nhẹ","Sautieren":"xào nhanh","Karamellisieren":"caramel hóa",
    "Frittieren":"chiên ngập dầu","Mazerieren":"ngâm/ướp","Röstaromen":"hương rang","Convenience":"tiện lợi",
    "Kompott":"quả om","Bratapfel":"táo nướng","Hülsenfrüchte":"họ đậu","Leguminosen":"leguminosen",
    "Linsen":"đậu lăng","Bohnen":"đậu","Erbsen":"đậu Hà Lan","Kichererbsen":"đậu gà","Einweichen":"ngâm nước",
    "Einweichwasser":"nước ngâm","Hämagglutinine":"hemagglutinin","Phasin":"phasin","Aquafaba":"aquafaba",
    "Giftstoffe":"chất độc","pflanzliches Eiweiß":"đạm thực vật","Stärke":"tinh bột","Getreide":"ngũ cốc",
    "Mehlkörper":"lõi bột","Keimling":"mầm","Randschichten":"lớp vỏ","Weizen":"lúa mì","Roggen":"lúa mạch đen",
    "Gerste":"lúa mạch","Dinkel":"spelt","Grünkern":"grünkern","Buchweizen":"kiều mạch","Amaranth":"amaranth",
    "Quinoa":"quinoa","Pseudo-Getreide":"ngũ cốc giả","Ausmahlungsgrad":"tỷ lệ xay xát","Vollkorn":"nguyên cám",
    "Schrot":"bột thô","Grieß":"gries","Dunst":"dunst","Mehl":"bột mì","Couscous":"couscous",
    "Franchise":"nhượng quyền","Franchisegeber":"bên nhượng quyền","Franchisenehmer":"bên nhận quyền",
    "Beherbergung":"lưu trú","Stadthotel":"KS nội đô","Kurhotel":"KS dưỡng","Hotel garni":"hotel garni",
    "Motel":"motel","Systemgastronomie":"nhà hàng hệ thống","Quickservice":"phục vụ nhanh","Fullservice":"full service",
    "Gemeinschaftsverpflegung":"suất ăn tập thể","Barzahlung":"tiền mặt","Debitkarte":"thẻ ghi nợ",
    "Kreditkarte":"thẻ tín dụng","Mobile Payment":"thanh toán di động","Überweisung":"chuyển khoản",
    "Bewirtungsvertrag":"hợp đồng phục vụ","gemischter Vertrag":"hợp đồng hỗn hợp","Kaufvertrag":"HĐ mua bán",
    "Zechprellerei":"ăn quỵt","Vorsatz":"cố ý","Betrug":"lừa đảo","Zahlungsverzug":"chậm thanh toán",
    "Schlechtleistung":"thực hiện kém","Nacherfüllung":"thực hiện lại","Preisminderung":"giảm giá",
    "Lieferverzug":"chậm giao/phục vụ","Umsatzsteuer":"thuế GTGT","MwSt":"VAT","Außerhaus":"mang về",
    "Trinkgeld":"tiền boa","Bedienungsgeld":"phụ phí phục vụ","Belegausgabepflicht":"nghĩa vụ xuất biên lai",
    "Reservierung":"đặt bàn","Bestellung":"đặt món","Annahme":"chấp nhận","bezahlen":"thanh toán",
    "Brutto":"giá gộp","Netto":"giá ròng","Rind":"bò","Schwein":"heo","Schaf":"cừu","Lamm":"cừu non",
    "Kalb":"bê","Filet":"thăn nội","Roastbeef":"roastbeef","Hesse":"bắp chân","Bug":"vai","Hals":"cổ",
    "Nacken":"gáy","Brust":"ức","Bauch":"bụng","Rücken":"lưng","Kollagen":"collagen","Bindegewebe":"mô liên kết",
    "Muskelgewebe":"mô cơ","Fettgewebe":"mô mỡ","Kurzbraten":"áp chảo nhanh","Schmoren":"om/hầm",
    "Kochen":"nấu/luộc","Grillen":"nướng","Garverfahren":"phương pháp chín","Nährwert":"giá trị dinh dưỡng",
    "Brennwert":"nhiệt lượng","Grundumsatz":"chuyển hóa cơ bản","Eiercode":"mã trứng","Haltungsform":"hình thức nuôi",
    "Freilandhaltung":"nuôi thả","Bodenhaltung":"nuôi sàn","Biologische Wertigkeit":"giá trị sinh học",
    "Mindmap":"sơ đồ tư duy","Diagramm":"biểu đồ","Visualisierung":"trực quan hóa","Sachtext":"văn bản thông tin",
    "Tabelle":"bảng","Kreisdiagramm":"biểu đồ tròn","Kurvendiagramm":"biểu đồ đường","Säulendiagramm":"biểu đồ cột",
    "Balkendiagramm":"biểu đồ thanh","Strukturbild":"sơ đồ cấu trúc","Organigramm":"sơ đồ tổ chức",
    "Anteile":"tỷ lệ","Entwicklung":"xu hướng","Hierarchie":"cấp bậc","Ablauf":"quy trình","Teufelskreis":"vòng xoáy",
    "Angebot":"chào hàng","Mangel":"lỗi hàng","Rechnung":"hóa đơn","Demokratie":"dân chủ",
    "Gewaltenteilung":"phân quyền","Grundrechte":"quyền cơ bản","Grundgesetz":"luật cơ bản"
  };

  function lookupVi(de){
    if(!de) return "";
    const s=String(de).trim();
    if(B1_VOCAB[s]) return B1_VOCAB[s];
    const k=Object.keys(B1_VOCAB).find(x=>x.toLowerCase()===s.toLowerCase());
    return k?B1_VOCAB[k]:"";
  }

  function ensureStyles(){
    if(document.getElementById("vocab-style")) return;
    const s=document.createElement("style");
    s.id="vocab-style";
    s.textContent = `
/* only content terms */
#bfk1ThemeBody .term, #fachThemeBody .term, #v-kueche .term, #v-fleisch .term,
#v-abschluss .term, #quizArea .term, #bfk1QuizArea .term, #fachQuizArea .term,
[data-vocab-content] .term {
  display:inline !important;
  border-bottom:1.5px dashed #60a5fa;
  color:#2563eb;
  cursor:pointer;
  font-weight:650;
  padding:0 1px;
  border-radius:3px;
  white-space:inherit;
}
#bfk1ThemeBody .term::after, #fachThemeBody .term::after, #v-kueche .term::after,
#v-fleisch .term::after, #v-abschluss .term::after, #quizArea .term::after,
#bfk1QuizArea .term::after, #fachQuizArea .term::after, [data-vocab-content] .term::after {
  content:"VI"; font-size:.55em; font-weight:800; margin-left:2px; vertical-align:super; color:#93c5fd;
}
.term-vi{display:inline;margin-left:4px;padding:1px 7px;border-radius:999px;background:#ecfdf5;color:#047857;border:1px solid #a7f3d0;font-size:.78em;font-weight:650}
.term-vi.hidden{display:none!important}
/* never style navigation lists */
.theme-item .term, .theme-list .term, .subject-card .term, .tile .term, .learn-item .term,
.ka-card .term, .fach-item .term, .bottom-nav .term, .nav .term, .crumbs .term, .section-head .term {
  all:unset !important;
}
.theme-item .term::after, .theme-list .term::after, .subject-card .term::after, .tile .term::after,
.section-head .term::after { content:none !important; }
.theme-item .term-vi, .theme-list .term-vi, .section-head .term-vi { display:none !important; }
#termPop{position:fixed;z-index:10000;max-width:min(300px,90vw);background:#0f172a;color:#fff;border-radius:14px;padding:12px 14px;font-size:.9em;line-height:1.45;box-shadow:0 14px 36px rgba(15,23,42,.35);display:none}
#termPop.show{display:block}
#termPop .de{font-weight:700;margin-bottom:4px}
#termPop .vi{font-weight:700;color:#86efac;font-size:1.05em}
#termPop .hint{margin-top:6px;font-size:.72em;opacity:.7}
`;
    document.head.appendChild(s);
  }

  function ensurePop(){
    let pop=document.getElementById("termPop");
    if(pop) return pop;
    pop=document.createElement("div");
    pop.id="termPop";
    pop.innerHTML='<div class="de"></div><div class="vi"></div><div class="hint">Bấm từ có VI để xem nghĩa</div>';
    document.body.appendChild(pop);
    return pop;
  }

  function hidePop(){
    const pop=document.getElementById("termPop");
    if(pop) pop.classList.remove("show");
    document.querySelectorAll(".term.open").forEach(t=>t.classList.remove("open"));
    document.querySelectorAll(".term-vi").forEach(c=>c.classList.add("hidden"));
  }

  function showForTerm(el){
    if(!el) return;
    ensureStyles(); ensurePop();
    // ignore terms inside lists/nav
    if(el.closest && el.closest(".theme-item, .theme-list, .subject-card, .tile, .learn-item, .ka-card, .fach-item, .bottom-nav, .nav, .crumbs, .section-head")){
      return;
    }
    const de = el.getAttribute("data-de") || el.textContent.trim();
    let vi = el.getAttribute("data-vi") || lookupVi(de);
    if(vi) el.setAttribute("data-vi", vi);
    const pop=ensurePop();
    pop.querySelector(".de").textContent = "🇩🇪 " + de;
    pop.querySelector(".vi").textContent = vi ? ("🇻🇳 " + vi) : "Chưa có trong từ điển";
    pop.classList.add("show");
    el.classList.add("open");
    // inline chip
    let chip=el.nextElementSibling;
    if(!chip || !chip.classList || !chip.classList.contains("term-vi")){
      chip=document.createElement("span");
      chip.className="term-vi hidden";
      el.insertAdjacentElement("afterend", chip);
    }
    if(vi){
      chip.textContent="🇻🇳 "+vi;
      chip.classList.remove("hidden");
    }
    const r=el.getBoundingClientRect();
    const pw=Math.min(300, window.innerWidth*0.9);
    let left=r.left + r.width/2 - pw/2;
    left=Math.max(8, Math.min(left, window.innerWidth-pw-8));
    pop.style.width=pw+"px";
    pop.style.left=left+"px";
    const ph=pop.offsetHeight||70;
    let top=r.top - ph - 10;
    if(top<8) top=r.bottom+10;
    pop.style.top=top+"px";
  }

  // Primary: click marked .term only (from bfk1-data content)
  document.addEventListener("click", function(e){
    const term = e.target && e.target.closest && e.target.closest(".term");
    if(term){
      e.preventDefault();
      e.stopPropagation();
      // toggle if same open
      if(term.classList.contains("open")){ hidePop(); return; }
      hidePop();
      showForTerm(term);
      return;
    }
    if(e.target && e.target.closest && e.target.closest("#termPop")) return;
    hidePop();
  }, true);

  document.addEventListener("scroll", hidePop, true);

  // Compatibility no-ops / light binders for existing calls
  function bindTerms(root){
    ensureStyles(); ensurePop();
    const scope = root || document;
    // fill missing data-vi on existing spans only
    scope.querySelectorAll && scope.querySelectorAll(".term").forEach(el=>{
      if(!el.getAttribute("data-vi")){
        const vi=lookupVi(el.getAttribute("data-de")||el.textContent.trim());
        if(vi) el.setAttribute("data-vi", vi);
      }
    });
  }
  function enableVocabOn(root){
    // DO NOT rewrite HTML / wrap text nodes — only prepare existing .term
    bindTerms(root);
  }
  function enrichTermsInHtml(html){ return html; } // never auto-mutate strings that could affect lists
  function wrapTextNodes(){ return 0; }

  w.Vocab = { B1_VOCAB, lookupVi, bindTerms, enableVocabOn, enrichTermsInHtml, wrapTextNodes, hidePop };
  w.B1_VOCAB = B1_VOCAB;
  w.lookupVi = lookupVi;
  w.bindTerms = bindTerms;
  w.enableVocabOn = enableVocabOn;
  w.enrichTermsInHtml = enrichTermsInHtml;
  w.wrapTextNodes = wrapTextNodes;
  w.hideTermPop = hidePop;
  w.showTermPop = showForTerm;
  w.toggleTermVi = showForTerm;

  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded", function(){ ensureStyles(); ensurePop(); });
  } else { ensureStyles(); ensurePop(); }
})(window);
