/* Shared DE→VI vocabulary for ALL pages (Themen, Quiz, Deutsch, …) */
(function (w) {
  "use strict";

  const B1_VOCAB = {
    
    "Gästebedarfe":"nhu cầu của khách","Gästebedarf":"nhu cầu khách","Auswertung":"phân tích / đánh giá",
    "Bewertungskriterien":"tiêu chí đánh giá","Kritikpunkte":"điểm phê bình","Zufriedenheit":"sự hài lòng",
    "Umsatz":"doanh thu","Umsatzrückgang":"sụt giảm doanh thu","Steakrestaurant":"nhà hàng steak",
    "Ambiente":"không gian / bầu không khí","Gemütlichkeit":"sự ấm cúng","Geschmack":"hương vị",
    "Temperatur":"nhiệt độ","Toiletten":"nhà vệ sinh","Arbeitskleidung":"đồng phục làm việc",
    "HACCP":"HACCP (vệ sinh an toàn thực phẩm)","Schulung":"đào tạo","Kompetenz":"năng lực",
    "Freundlichkeit":"sự thân thiện","arrogantes":"kiêu ngạo","unfreundlich":"không thân thiện",
    "unsaubere":"không sạch","mangelnde":"thiếu","durchgebraten":"chín kỹ / cháy hết",
    "kaltes Essen":"đồ ăn nguội","konkrete Maßnahmen":"biện pháp cụ thể","Lernfeld":"lĩnh vực học",
    "Klassenarbeit":"bài kiểm tra","Fr. Schuster":"cô Schuster","Grundlagen":"cơ sở / nền tảng",
    "Gastronomie":"ngành F&B / nhà hàng khách sạn","Sammeln":"thu thập","Kategorisieren":"phân loại",
    "Häufigkeit":"tần suất","Schwere":"mức độ nghiêm trọng","Kontrolle":"kiểm tra / kiểm soát",
    "Betreff":"tiêu đề email","Anrede":"cách xưng hô","Anlass":"lý do / dịp","Gruß":"lời chào kết",
    "Problem":"vấn đề","Maßnahme":"biện pháp","E-Mail":"email","Fragebögen":"phiếu hỏi",
    "Sterne":"sao (đánh giá)","Positiv":"tích cực","Negativ":"tiêu cực","Neutral":"trung lập",
    "Atmosphäre":"không khí / bầu không khí","Preisempfinden":"cảm nhận về giá","Sauberkeit":"sạch sẽ",
    "Service":"phục vụ","Hygiene":"vệ sinh","Garstufe":"độ chín (thịt)","Anrichtung":"cách bày món",
    "Reinigungsplan":"kế hoạch vệ sinh","Teamschulung":"đào tạo nhóm","Geschäftsleitung":"ban giám đốc",
    "Restaurantleitung":"ban quản lý nhà hàng","Umsatzzahlen":"doanh số","Gästekommentare":"nhận xét khách",
    "Verbesserungsvorschläge":"đề xuất cải thiện","Feedbackbogen":"phiếu góp ý","Internetbewertungen":"đánh giá online",
    "Briefing":"họp giao ban","Ausgabe-Check":"kiểm trước khi mang ra","Preis-Leistung":"tỷ lệ giá–chất lượng",
    "Speisenqualität":"chất lượng món","vegetarische Alternativen":"món chay thay thế","vegane Optionen":"món thuần chay",
    "Vegetarisch":"ăn chay","Vegan":"thuần chay","Flexitarier":"ăn chay linh hoạt","Pescetarier":"ăn cá, không thịt",
    "Pescetarisch":"ăn cá, không thịt","Laktosefrei":"không lactose","Glutenfrei":"không gluten","Gluten":"gluten",
    "Zöliakie":"bệnh không dung nạp gluten","Halal":"hợp chuẩn Hồi giáo","Koscher":"hợp chuẩn Do Thái",
    "Low-Carb":"ít carb","Keto":"chế độ keto","Allergene":"chất gây dị ứng","Gelatine":"gelatin",
    "Kreuzkontamination":"lây nhiễm chéo","Lebensmittel":"thực phẩm","Sättigung":"no bụng",
    "Hauptkomponente":"thành phần chính","Hauptrohstoff":"nguyên liệu chính","Zubereitungsart":"cách chế biến",
    "Garnitur":"kiểu trang trí / …-Art","Soße":"nước sốt","Gemüsebeilage":"rau kèm","Sättigungsbeilage":"món no",
    "Salat":"salad","Vorspeisen":"khai vị","Hauptgänge":"món chính","Desserts":"tráng miệng","Getränke":"đồ uống",
    "Vorspeise":"khai vị","Suppe":"súp","Hauptgericht":"món chính","Nachspeise":"tráng miệng","Dessert":"tráng miệng",
    "Menü":"set menu","Kalte Vorspeise":"khai vị nguội","Warmes Zwischengericht":"món nóng xen giữa",
    "Saisonale Produkte":"sản phẩm theo mùa","Bindestriche":"dấu gạch nối","Saison":"mùa vụ","Konsistenz":"kết cấu",
    "Garart":"cách chế biến","gebraten":"chiên/rán","geschmort":"om/hầm","gegrillt":"nướng vỉ","gedünstet":"hấp/om nhẹ",
    "Besondere Empfehlungen":"món đề xuất","Speisekarte":"thực đơn","Zielgruppe":"nhóm khách mục tiêu",
    "Obst":"trái cây","Südfrüchte":"trái cây nhiệt đới","Schalenobst":"quả hạch","Beerenobst":"quả mọng",
    "Kernobst":"quả có hạt","Steinobst":"quả có hột cứng","Kohlenhydrate":"tinh bột","Ballaststoffe":"chất xơ",
    "Pektin":"pectin","Mineralstoffe":"khoáng chất","Folsäure":"axit folic","Sekundäre Pflanzenstoffe":"hợp chất thực vật thứ cấp",
    "Carotinoide":"carotenoid","Polyphenole":"polyphenol","Durchfall":"tiêu chảy","Pürieren":"xay nhuyễn",
    "Backen":"nướng lò","Pochieren":"om nhẹ dưới sôi","Sautieren":"xào nhanh","Karamellisieren":"caramel hóa",
    "Frittieren":"chiên ngập dầu","Mazerieren":"ngâm/ướp","Röstaromen":"hương vị rang","Convenience":"tiện lợi/chế biến sẵn",
    "Kompott":"quả om","Bratapfel":"táo nướng","Hülsenfrüchte":"họ đậu","Leguminosen":"cây họ đậu",
    "Linsen":"đậu lăng","Bohnen":"đậu","Erbsen":"đậu Hà Lan","Kichererbsen":"đậu gà","Einweichen":"ngâm nước",
    "Einweichwasser":"nước ngâm","Hämagglutinine":"hemagglutinin","Phasin":"độc tố đậu","Aquafaba":"nước đậu gà",
    "Giftstoffe":"chất độc","pflanzliches Eiweiß":"đạm thực vật","Stärke":"tinh bột","Getreide":"ngũ cốc",
    "Mehlkörper":"phần lõi bột","Keimling":"mầm hạt","Randschichten":"lớp vỏ/cám","Weizen":"lúa mì",
    "Roggen":"lúa mạch đen","Gerste":"lúa mạch","Dinkel":"spelt","Grünkern":"lúa mì xanh","Buchweizen":"kiều mạch",
    "Amaranth":"amaranth","Quinoa":"quinoa","Pseudo-Getreide":"ngũ cốc giả","Ausmahlungsgrad":"tỷ lệ xay xát",
    "Vollkorn":"nguyên cám","Schrot":"bột thô","Grieß":"bột gries","Dunst":"bột mịn trung gian","Mehl":"bột mì",
    "Couscous":"couscous","Erdnüsse":"đậu phộng","Sojabohnen":"đậu nành","Fructose":"đường quả",
    "Wasser":"nước","Vitamin C":"vitamin C","Vitamin E":"vitamin E","Eiweiß":"protein / đạm","Fett":"chất béo",
    "Franchise":"nhượng quyền","Franchisegeber":"bên nhượng quyền","Franchisenehmer":"bên nhận quyền",
    "Beherbergung":"lưu trú","Stadthotel":"khách sạn nội đô","Kurhotel":"khách sạn dưỡng bệnh",
    "Hotel garni":"KS chỉ phục vụ sáng","Motel":"motel","Systemgastronomie":"nhà hàng hệ thống",
    "Quickservice":"phục vụ nhanh","Fullservice":"phục vụ đầy đủ","Gemeinschaftsverpflegung":"suất ăn tập thể",
    "Barzahlung":"tiền mặt","Debitkarte":"thẻ ghi nợ","Kreditkarte":"thẻ tín dụng","Mobile Payment":"thanh toán di động",
    "Überweisung":"chuyển khoản","Prepaid-Karte":"thẻ trả trước","Bewirtungsvertrag":"hợp đồng phục vụ",
    "gemischter Vertrag":"hợp đồng hỗn hợp","Kaufvertrag":"hợp đồng mua bán","Zechprellerei":"ăn quỵt",
    "Vorsatz":"cố ý","Betrug":"lừa đảo","Zahlungsverzug":"chậm thanh toán","Annahmeverzug":"chậm nhận hàng",
    "Schlechtleistung":"hàng/dịch vụ kém","Nacherfüllung":"giao lại / làm lại","Preisminderung":"giảm giá",
    "Lieferverzug":"chậm phục vụ","Umsatzsteuer":"thuế GTGT / VAT","MwSt":"thuế GTGT","Außerhaus":"mang về",
    "Trinkgeld":"tiền boa","Bedienungsgeld":"phụ phí phục vụ","Belegausgabepflicht":"nghĩa vụ xuất biên lai",
    "Reservierung":"đặt bàn","Bestellung":"đặt món","Annahme":"chấp nhận","bezahlen":"thanh toán","Gebühr":"phí",
    "Counter":"quầy order","Brutto":"giá gộp (gồm thuế)","Netto":"giá ròng (chưa thuế)",
    "Rind":"bò","Schwein":"heo","Schaf":"cừu","Lamm":"cừu non","Kalb":"bê","Filet":"thăn nội",
    "Roastbeef":"thăn ngoại bò","Hesse":"bắp chân / ống","Bug":"vai","Hals":"cổ","Nacken":"gáy",
    "Brust":"ức","Bauch":"bụng","Rücken":"lưng / thăn","Kollagen":"collagen","Bindegewebe":"mô liên kết",
    "Muskelgewebe":"mô cơ","Fettgewebe":"mô mỡ","Kurzbraten":"áp chảo nhanh",
    "Schmoren":"om/hầm","Kochen":"luộc/nấu","Grillen":"nướng","Garverfahren":"phương pháp chín",
    "Marmorierung":"vân mỡ","Schlachtfleisch":"thịt giết mổ","Knochen":"xương","Sehnen":"gân",
    "Wiener Schnitzel":"schnitzel kiểu Vienna","Cordon bleu":"cordon bleu","Gulasch":"gulasch / ragu",
    "Nährwert":"giá trị dinh dưỡng","Brennwert":"nhiệt lượng","Grundumsatz":"chuyển hóa cơ bản",
    "PAL-Wert":"hệ số hoạt động","Eiercode":"mã trứng","Haltungsform":"hình thức nuôi",
    "Freilandhaltung":"nuôi thả vườn","Bodenhaltung":"nuôi sàn","Biologische Wertigkeit":"giá trị sinh học (protein)",
    "Ergänzungswert":"giá trị bổ sung protein","Salmonellen":"salmonella","MHD":"hạn dùng",
    "Spiegelei":"trứng ốp la","Rührei":"trứng khuấy","Omelett":"trứng omelette","Gewichtsklasse":"hạng cân",
    "Mindmap":"sơ đồ tư duy","Diagramm":"biểu đồ","Visualisierung":"trực quan hóa","Sachtext":"văn bản thông tin",
    "Überschrift":"tiêu đề","Stichpunkte":"gạch đầu dòng","Tabelle":"bảng","Fließtext":"văn xuôi liên tục",
    "Zusammenfassung":"tóm tắt","Argument":"lập luận","Beispiel":"ví dụ","Vergleich":"so sánh",
    "Kreisdiagramm":"biểu đồ tròn","Tortendiagramm":"biểu đồ bánh","Kurvendiagramm":"biểu đồ đường",
    "Liniendiagramm":"biểu đồ đường","Säulendiagramm":"biểu đồ cột","Balkendiagramm":"biểu đồ thanh",
    "Strukturbild":"sơ đồ cấu trúc","Organigramm":"sơ đồ tổ chức","Anteile":"tỷ lệ / phần trăm",
    "Entwicklung":"sự phát triển / xu hướng","Hierarchie":"cấp bậc","Ablauf":"quy trình",
    "Teufelskreis":"vòng xoáy tiêu cực","Zeitachse":"trục thời gian","Ideensammlung":"thu thập ý tưởng",
    "Stichworte":"từ khóa","stieg":"đã tăng","sank":"đã giảm","exakte Zahlen":"số liệu chính xác",
    "Angebot":"chào hàng","Mangel":"lỗi hàng","Rechnung":"hóa đơn","Demokratie":"dân chủ",
    "Gewaltenteilung":"phân quyền","Grundrechte":"quyền cơ bản","Grundgesetz":"luật cơ bản Đức",
    "Menschenwürde":"nhân phẩm","Meinungsfreiheit":"tự do ngôn luận","Wahlen":"bầu cử",
    "Bundesrepublik":"Cộng hòa Liên bang","Gleichheit":"bình đẳng",
    "Welcome":"chào mừng","Reservation":"đặt bàn","Starter":"khai vị","Main course":"món chính",
    "Allergy":"dị ứng","Tip":"tiền boa","Receipt":"biên lai","Cash or card?":"tiền mặt hay thẻ?",
    "Frage":"câu hỏi","richtig":"đúng","Falsch":"sai","Erklärung":"giải thích","Thema":"chủ đề",
    "Themen":"các chủ đề","Fragen":"câu hỏi","Punkte":"điểm","Ergebnis":"kết quả"
  };

  // longest keys first for matching
  const VOCAB_KEYS = Object.keys(B1_VOCAB).sort((a,b)=>b.length-a.length);
  const VOCAB_RE = new RegExp(
    VOCAB_KEYS.map(k=>k.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")).join("|"),
    "g"
  );

  function lookupVi(de){
    if(!de) return "";
    if(B1_VOCAB[de]) return B1_VOCAB[de];
    const k = VOCAB_KEYS.find(x=>x.toLowerCase()===String(de).toLowerCase());
    return k ? B1_VOCAB[k] : "";
  }

  function ensureStyles(){
    if(document.getElementById("vocab-style")) return;
    const s=document.createElement("style");
    s.id="vocab-style";
    s.textContent = `
.term{display:inline!important;border-bottom:1.5px dashed #60a5fa;color:#2563eb;cursor:pointer;font-weight:650;padding:0 1px;border-radius:3px;white-space:inherit;line-height:inherit}
.term:hover,.term.open{background:#eff6ff;color:#1d4ed8}
.term::after{content:"VI";display:inline;font-size:.55em;font-weight:800;margin-left:2px;vertical-align:super;color:#93c5fd;letter-spacing:0}
.term-vi{display:inline;margin-left:4px;padding:1px 7px;border-radius:999px;background:#ecfdf5;color:#047857;border:1px solid #a7f3d0;font-size:.78em;font-weight:650;white-space:normal}
.term-vi.hidden{display:none!important}
/* never decorate navigation lists */
.theme-item .term, .theme-list .term, .subject-card .term, .tile .term,
.learn-item .term, .ka-card .term, .fach-item .term, .bottom-nav .term, .nav .term {
  all: unset; cursor: inherit; color: inherit; font-weight: inherit;
}
.theme-item .term::after, .theme-list .term::after, .subject-card .term::after, .tile .term::after { content: none !important; }
.theme-item .term-vi, .theme-list .term-vi, .subject-card .term-vi, .tile .term-vi { display:none !important; }
#termPop{position:fixed;z-index:9999;max-width:min(300px,88vw);background:#0f172a;color:#fff;border-radius:14px;padding:12px 14px;font-size:.88em;line-height:1.45;box-shadow:0 12px 32px rgba(15,23,42,.32);display:none}
#termPop.show{display:block}
#termPop .de{font-weight:700;margin-bottom:4px}
#termPop .vi{font-weight:600;color:#86efac;font-size:1.02em}
#termPop .hint{margin-top:6px;font-size:.72em;opacity:.65}
`;
    document.head.appendChild(s);
  }

  function ensurePop(){
    let pop=document.getElementById("termPop");
    if(pop) return pop;
    pop=document.createElement("div");
    pop.id="termPop";
    pop.setAttribute("role","tooltip");
    pop.innerHTML='<div class="de"></div><div class="vi"></div><div class="hint">Nghĩa tiếng Việt · bấm lại để ẩn</div>';
    document.body.appendChild(pop);
    return pop;
  }

  function showTermPop(el){
    ensureStyles(); const pop=ensurePop();
    const de=el.getAttribute("data-de") || el.textContent.trim();
    const vi=el.getAttribute("data-vi") || lookupVi(de) || "—";
    pop.querySelector(".de").textContent="🇩🇪 "+de;
    pop.querySelector(".vi").textContent="🇻🇳 "+vi;
    pop.classList.add("show");
    const r=el.getBoundingClientRect();
    const pw=Math.min(300, window.innerWidth*0.88);
    let left=r.left + r.width/2 - pw/2;
    left=Math.max(10, Math.min(left, window.innerWidth-pw-10));
    let top=r.top - 76; if(top<8) top=r.bottom+10;
    pop.style.left=left+"px"; pop.style.top=top+"px"; pop.style.width=pw+"px";
  }
  function hideTermPop(){
    const pop=document.getElementById("termPop");
    if(pop) pop.classList.remove("show");
  }

  function toggleTermVi(el){
    ensureStyles();
    const vi=el.getAttribute("data-vi") || lookupVi(el.getAttribute("data-de")||el.textContent.trim()) || "—";
    el.setAttribute("data-vi", vi);
    let chip=el.nextElementSibling;
    if(!chip || !chip.classList || !chip.classList.contains("term-vi")){
      chip=document.createElement("span");
      chip.className="term-vi hidden";
      el.insertAdjacentElement("afterend", chip);
    }
    chip.textContent="🇻🇳 "+vi;
    const willOpen=chip.classList.contains("hidden");
    document.querySelectorAll(".term-vi").forEach(c=>{ if(c!==chip) c.classList.add("hidden"); });
    document.querySelectorAll(".term.open").forEach(t=>{ if(t!==el) t.classList.remove("open"); });
    if(willOpen){ chip.classList.remove("hidden"); el.classList.add("open"); showTermPop(el); }
    else { chip.classList.add("hidden"); el.classList.remove("open"); hideTermPop(); }
  }

  function shouldSkipNode(node){
    if(!node || node.nodeType!==1) return true;
    const tag=(node.tagName||"").toLowerCase();
    if(tag==="script"||tag==="style"||tag==="textarea"||tag==="input"||tag==="select"||tag==="option"||tag==="code"||tag==="pre"||tag==="svg"||tag==="path"||tag==="button"||tag==="a"||tag==="label") return true;
    if(node.classList && (node.classList.contains("term") || node.classList.contains("term-vi") || node.classList.contains("vi-btn") || node.classList.contains("vi-pop"))) return true;
    // Never wrap navigation / list chrome (breaks layout like "Gäste bedarfe und Auswertung")
    if(node.closest){
      const skipSel = [
        ".term", "script", "style", "svg", ".img-wrap", ".hotspot",
        ".theme-item", ".theme-list", ".subject-card", ".subject-grid", ".tile",
        ".learn-item", ".learn-list", ".fach-item", ".fach-list", ".ka-card", ".ka-list",
        ".next-exam-chip", ".exam-banner", ".today-card", ".today-grid",
        ".bottom-nav", ".nav", ".crumbs", ".brand", ".user-chip",
        ".theme-quiz-bar", ".quiz-actions", ".src-thumb", ".src-grid",
        "#loginGate", ".login-card", ".btn", "button", "a.label", "nav"
      ].join(",");
      if(node.closest(skipSel)) return true;
    }
    return false;
  }

  // Only wrap inside real content surfaces
  function isContentRoot(el){
    if(!el || !el.matches) return false;
    return el.matches([
      "#bfk1ThemeBody", "#fachThemeBody", "#bfk1QuizArea", "#fachQuizArea", "#quizArea",
      ".detail-box", ".detail", ".panel.active", ".apanel.active",
      "#a-struktur", "#a-themen", ".hist-panel",
      // deutsch content cards
      ".box", ".prac", ".fb", "#formenGrid .tile .muted", ".acc .body",
      // generic content
      ".card .content", "[data-vocab-content]"
    ].join(","));
  }

  function contentRoots(scope){
    const s = scope || document;
    const list = [];
    const sels = [
      "#bfk1ThemeBody", "#fachThemeBody",
      "#bfk1QuizArea .q-text", "#bfk1QuizArea .q-feedback", "#bfk1QuizArea .q-cat",
      "#fachQuizArea .q-text", "#fachQuizArea .q-feedback",
      "#quizArea .q-text", "#quizArea .q-feedback", "#quizArea .q-cat",
      "#v-kueche .card", "#v-fleisch .card", "#v-fleisch .detail-box",
      "#v-pruefungen .card", "#v-abschluss .card", "#v-abschluss .mini",
      "#v-fach-theme #fachThemeBody",
      ".view.active #bfk1ThemeBody", ".view.active .detail-box",
      // deutsch
      ".view.active .card", ".view.active .box", ".view.active .prac",
      ".view.active .acc .body", ".view.active .hint-bar",
      "[data-vocab-content]"
    ];
    sels.forEach(sel=>{
      try{ s.querySelectorAll(sel).forEach(n=>{ if(list.indexOf(n)<0) list.push(n); }); }catch(e){}
    });
    // if scope itself is a content body
    if(scope && scope!==document && scope.id && /ThemeBody|QuizArea|quizArea/.test(scope.id)){
      if(list.indexOf(scope)<0) list.push(scope);
    }
    return list;
  }

  /** Safe wrap: walk text nodes only — does NOT destroy event handlers on buttons */
  function wrapTextNodes(root){
    if(!root || !root.querySelectorAll) return 0;
    ensureStyles();
    let count=0;
    const walker=document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node){
        if(!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        const p=node.parentElement;
        if(!p || shouldSkipNode(p)) return NodeFilter.FILTER_REJECT;
        // avoid breaking pure control labels that are only UI chrome? still allow quiz question text
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    const nodes=[];
    while(walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(textNode=>{
      const text=textNode.nodeValue;
      VOCAB_RE.lastIndex=0;
      if(!VOCAB_RE.test(text)) return;
      VOCAB_RE.lastIndex=0;
      const frag=document.createDocumentFragment();
      let last=0, m;
      while((m=VOCAB_RE.exec(text))!==null){
        // word boundary soft check: avoid mid-word if letter adjacent
        const start=m.index, end=start+m[0].length;
        const before=text[start-1]||"";
        const after=text[end]||"";
        // unicode-aware boundary (äöüß and combining)
        const letter = /[A-Za-zÀ-ÿÄÖÜäöüß]/;
        if(letter.test(before) || letter.test(after)) continue;
        if(start>last) frag.appendChild(document.createTextNode(text.slice(last,start)));
        const de=m[0];
        const vi=lookupVi(de);
        const span=document.createElement("span");
        span.className="term";
        span.setAttribute("data-de", de);
        if(vi) span.setAttribute("data-vi", vi);
        span.textContent=de;
        frag.appendChild(span);
        count++;
        last=end;
      }
      if(last===0) return; // nothing safe matched
      if(last<text.length) frag.appendChild(document.createTextNode(text.slice(last)));
      textNode.parentNode.replaceChild(frag, textNode);
    });
    return count;
  }

  // keep string enrich for offline HTML builders (optional)
  function enrichTermsInHtml(html){
    if(!html || typeof html!=="string") return html;
    // only used for static theme HTML strings before insert
    let out=html;
    VOCAB_KEYS.forEach(de=>{
      const vi=B1_VOCAB[de];
      const esc=de.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
      const re=new RegExp("("+esc+")","g");
      let result="", last=0, m;
      while((m=re.exec(out))!==null){
        const offset=m.index;
        const before=out.slice(Math.max(0,offset-100), offset);
        const lt=before.lastIndexOf("<"), gt=before.lastIndexOf(">");
        if(lt>gt) continue;
        if(before.lastIndexOf('class="term"')>before.lastIndexOf("</span>")) continue;
        if(before.includes('data-de="'+de+'"')) continue;
        result += out.slice(last, offset);
        result += '<span class="term" data-de="'+de+'" data-vi="'+String(vi).replace(/"/g,"&quot;")+'">'+de+"</span>";
        last = offset + m[0].length;
      }
      result += out.slice(last);
      out=result;
    });
    return out;
  }

  function bindTerms(root){
    ensureStyles(); ensurePop();
    const scope = root || document;
    // IMPORTANT: never rewrite whole interactive containers via innerHTML
    scope.querySelectorAll(".term").forEach(el=>{
      if(el.dataset.bound) return;
      el.dataset.bound="1";
      if(!el.getAttribute("data-vi")){
        const vi=lookupVi(el.getAttribute("data-de")||el.textContent.trim());
        if(vi) el.setAttribute("data-vi", vi);
      }
      el.addEventListener("click", e=>{
        e.preventDefault();
        e.stopPropagation();
        toggleTermVi(el);
      });
    });
  }

  /** Enable on any root: Themen, Quiz, Deutsch, … */

  function unwrapTermsInLists(root){
    try{
      const scope=root||document;
      scope.querySelectorAll('.theme-item .term, .theme-list .term, .subject-card .term, .tile .term, .learn-item .term, .ka-card .term, .fach-item .term, .bottom-nav .term').forEach(term=>{
        const text=document.createTextNode(term.getAttribute('data-de')||term.textContent||'');
        const parent=term.parentNode;
        if(!parent) return;
        // remove following term-vi chip
        const next=term.nextSibling;
        if(next && next.classList && next.classList.contains('term-vi')) next.remove();
        parent.replaceChild(text, term);
        parent.normalize && parent.normalize();
      });
    }catch(e){}
  }

  function enableVocabOn(root){
    const el = typeof root==="string" ? document.querySelector(root) : (root||document.body);
    if(!el) return;
    unwrapTermsInLists(el);
    try{
      // Prefer wrapping only content surfaces — never theme lists / hubs
      const roots = contentRoots(el);
      if(roots.length){
        roots.forEach(r=>{
          wrapTextNodes(r);
          bindTerms(r);
        });
      } else if(el.id==="bfk1ThemeBody" || el.id==="fachThemeBody" || /ThemeBody|QuizArea|quizArea/.test(el.id||"")){
        wrapTextNodes(el);
        bindTerms(el);
      } else {
        // fallback: wrap only existing .term bindings, do NOT scan whole hub lists
        bindTerms(el);
      }
    }catch(e){ console.warn("enableVocabOn", e); }
  }

  // Global delegation: works everywhere (Thema, Quiz, static HTML) even after re-render
  document.addEventListener("click", e=>{
    const termEl = e.target && e.target.closest && e.target.closest(".term");
    if(termEl){
      e.preventDefault();
      e.stopPropagation();
      toggleTermVi(termEl);
      return;
    }
    if(e.target.closest && (e.target.closest(".term-vi")||e.target.closest("#termPop"))) return;
    document.querySelectorAll(".term-vi").forEach(c=>c.classList.add("hidden"));
    document.querySelectorAll(".term.open").forEach(t=>t.classList.remove("open"));
    hideTermPop();
  }, true); // capture phase so it wins over other handlers
  document.addEventListener("scroll", hideTermPop, true);

  w.Vocab = {
    B1_VOCAB, lookupVi, enrichTermsInHtml, bindTerms, enableVocabOn,
    showTermPop, hideTermPop, toggleTermVi, wrapTextNodes
  };
  w.B1_VOCAB = B1_VOCAB;
  w.lookupVi = lookupVi;
  w.enrichTermsInHtml = enrichTermsInHtml;
  w.bindTerms = bindTerms;
  w.enableVocabOn = enableVocabOn;
  w.showTermPop = showTermPop;
  w.hideTermPop = hideTermPop;
  w.toggleTermVi = toggleTermVi;
  w.wrapTextNodes = wrapTextNodes;
})(window);
