/* Select-to-translate DE→VI for the whole Lern-App */
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
    "Gästebedarfe":"nhu cầu của khách","Gästebedarf":"nhu cầu khách","Auswertung":"phân tích / đánh giá",
    "Bewertungskriterien":"tiêu chí đánh giá","Kritikpunkte":"điểm phê bình","Zufriedenheit":"sự hài lòng",
    "Umsatz":"doanh thu","Umsatzrückgang":"sụt giảm doanh thu","Steakrestaurant":"nhà hàng steak",
    "Ambiente":"không gian / bầu không khí","Gemütlichkeit":"sự ấm cúng","Geschmack":"hương vị",
    "Temperatur":"nhiệt độ","Toiletten":"nhà vệ sinh","Arbeitskleidung":"đồng phục làm việc",
    "HACCP":"HACCP (vệ sinh an toàn thực phẩm)","Schulung":"đào tạo","Kompetenz":"năng lực",
    "Freundlichkeit":"sự thân thiện","Sammeln":"thu thập","Kategorisieren":"phân loại",
    "Häufigkeit":"tần suất","Schwere":"mức độ nghiêm trọng","Kontrolle":"kiểm tra / kiểm soát",
    "Betreff":"tiêu đề email","Anrede":"cách xưng hô","Anlass":"lý do / dịp","Gruß":"lời chào kết",
    "Problem":"vấn đề","Maßnahme":"biện pháp","Maßnahmen":"các biện pháp","E-Mail":"email",
    "Fragebögen":"phiếu hỏi","Sterne":"sao (đánh giá)","Positiv":"tích cực","Negativ":"tiêu cực","Neutral":"trung lập",
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
    "Themen":"các chủ đề","Fragen":"câu hỏi","Punkte":"điểm","Ergebnis":"kết quả",
    "Lernfeld":"lĩnh vực học","Klassenarbeit":"bài kiểm tra","Gastronomie":"ngành F&B",
    "Kriterien":"tiêu chí","Kritik":"phê bình","Formulierung":"cách diễn đạt","Rechtschreibung":"chính tả",
    "Speisenfolge":"thứ tự món","Inhaltsstoffe":"thành phần dinh dưỡng","Zubereitung":"cách chế biến",
    "Einteilung":"phân loại","Nährstoffe":"chất dinh dưỡng","Gararten":"các cách làm chín",
    "Pseudogetreide":"ngũ cốc giả","Mahlgrade":"cấp độ xay","Korn":"hạt ngũ cốc",
    "Essformen":"hình thức ăn uống","Kartenstruktur":"cấu trúc thực đơn"
  };

  const KEYS = Object.keys(B1_VOCAB).sort((a,b)=>b.length-a.length);

  function normKey(s){
    return String(s||"").trim().replace(/\s+/g," ");
  }

  function lookupVi(raw){
    const s = normKey(raw);
    if(!s) return "";
    if(B1_VOCAB[s]) return B1_VOCAB[s];
    // case-insensitive exact
    let hit = KEYS.find(k=>k.toLowerCase()===s.toLowerCase());
    if(hit) return B1_VOCAB[hit];
    // strip punctuation edges
    const stripped = s.replace(/^[„“"'\(\)\[\]\.,;:!?]+|[„“"'\(\)\[\]\.,;:!?]+$/g,"");
    if(stripped!==s){
      if(B1_VOCAB[stripped]) return B1_VOCAB[stripped];
      hit = KEYS.find(k=>k.toLowerCase()===stripped.toLowerCase());
      if(hit) return B1_VOCAB[hit];
    }
    // try without trailing plural s / n (very light)
    const variants = [stripped];
    if(/e$/.test(stripped)) variants.push(stripped.slice(0,-1));
    if(/en$/.test(stripped)) variants.push(stripped.slice(0,-2));
    if(/n$/.test(stripped)) variants.push(stripped.slice(0,-1));
    for(const v of variants){
      if(B1_VOCAB[v]) return B1_VOCAB[v];
      hit = KEYS.find(k=>k.toLowerCase()===v.toLowerCase());
      if(hit) return B1_VOCAB[hit];
    }
    // contains longest key (for short compounds)
    hit = KEYS.find(k=>stripped.toLowerCase().includes(k.toLowerCase()) && k.length>=5);
    if(hit && Math.abs(hit.length-stripped.length)<=4) return B1_VOCAB[hit];
    return "";
  }

  function ensureStyles(){
    if(document.getElementById("vocab-style")) return;
    const s=document.createElement("style");
    s.id="vocab-style";
    s.textContent = `
#termPop{position:fixed;z-index:10000;max-width:min(320px,90vw);background:#0f172a;color:#fff;border-radius:14px;
  padding:12px 14px;font-size:.9em;line-height:1.45;box-shadow:0 14px 36px rgba(15,23,42,.35);display:none}
#termPop.show{display:block}
#termPop .de{font-weight:700;margin-bottom:4px;font-size:.95em}
#termPop .vi{font-weight:700;color:#86efac;font-size:1.05em}
#termPop .hint{margin-top:7px;font-size:.72em;opacity:.7}
#termPop .miss{color:#fca5a5;font-weight:600}
.vocab-tip{display:flex;align-items:flex-start;gap:8px;margin:0 0 14px;padding:10px 12px;border-radius:12px;
  background:#eff6ff;border:1px solid #bfdbfe;color:#1e40af;font-size:.84em;line-height:1.4}
.vocab-tip b{font-weight:800}
`;
    document.head.appendChild(s);
  }

  function ensurePop(){
    let pop=document.getElementById("termPop");
    if(pop) return pop;
    pop=document.createElement("div");
    pop.id="termPop";
    pop.setAttribute("role","tooltip");
    pop.innerHTML='<div class="de"></div><div class="vi"></div><div class="hint">Bôi đen từ bất kỳ để tra tiếng Việt</div>';
    document.body.appendChild(pop);
    return pop;
  }

  function hidePop(){
    const pop=document.getElementById("termPop");
    if(pop) pop.classList.remove("show");
  }

  function showPopAt(de, vi, rect){
    ensureStyles();
    const pop=ensurePop();
    pop.querySelector(".de").textContent = "🇩🇪 " + de;
    const viEl=pop.querySelector(".vi");
    if(vi){
      viEl.className="vi";
      viEl.textContent = "🇻🇳 " + vi;
    }else{
      viEl.className="vi miss";
      viEl.textContent = "Chưa có trong từ điển ôn thi";
    }
    pop.classList.add("show");
    const pw=Math.min(320, window.innerWidth*0.9);
    let left = rect.left + rect.width/2 - pw/2;
    left = Math.max(8, Math.min(left, window.innerWidth - pw - 8));
    let top = rect.top - 12;
    // measure after show
    pop.style.width = pw+"px";
    pop.style.left = left+"px";
    pop.style.top = "0px";
    const ph = pop.offsetHeight || 70;
    top = rect.top - ph - 10;
    if(top < 8) top = rect.bottom + 10;
    pop.style.top = top+"px";
  }

  function getSelectionInfo(){
    const sel = window.getSelection && window.getSelection();
    if(!sel || sel.isCollapsed || !sel.rangeCount) return null;
    const text = normKey(sel.toString());
    if(!text || text.length > 60) return null; // avoid whole paragraphs
    // ignore pure numbers / tiny
    if(text.length < 2) return null;
    let rect = null;
    try{
      const range = sel.getRangeAt(0);
      const r = range.getBoundingClientRect();
      if(r && (r.width || r.height)) rect = r;
      else {
        const rects = range.getClientRects();
        if(rects && rects.length) rect = rects[0];
      }
    }catch(e){}
    if(!rect) return null;
    return { text, rect };
  }

  function handleSelection(){
    const info = getSelectionInfo();
    if(!info){ hidePop(); return; }
    // don't trigger inside inputs
    const ae = document.activeElement;
    if(ae && /^(INPUT|TEXTAREA|SELECT)$/.test(ae.tagName)) { hidePop(); return; }
    const vi = lookupVi(info.text);
    showPopAt(info.text, vi, info.rect);
  }

  // Primary UX: select text → translate
  document.addEventListener("mouseup", ()=> setTimeout(handleSelection, 0));
  document.addEventListener("touchend", ()=> setTimeout(handleSelection, 30), {passive:true});
  document.addEventListener("keyup", (e)=>{
    if(e.key==="Shift" || e.key.startsWith("Arrow")) setTimeout(handleSelection, 0);
  });
  document.addEventListener("scroll", hidePop, true);
  document.addEventListener("mousedown", (e)=>{
    if(e.target && e.target.closest && e.target.closest("#termPop")) return;
    // delay hide so mouseup selection can run
  });
  document.addEventListener("click", (e)=>{
    if(e.target && e.target.closest && e.target.closest("#termPop")) return;
    const sel = window.getSelection && window.getSelection();
    if(!sel || sel.isCollapsed) hidePop();
  });

  // Keep tiny compatibility stubs so old calls don't crash
  function noop(){}
  function enableVocabOn(){ /* selection mode: no auto-wrap */ ensureStyles(); ensurePop(); }
  function bindTerms(){ ensureStyles(); ensurePop(); }
  function enrichTermsInHtml(html){ return html; }
  function wrapTextNodes(){ return 0; }

  // Optional: still allow explicit .term spans if present in content
  document.addEventListener("click", (e)=>{
    const term = e.target && e.target.closest && e.target.closest(".term");
    if(!term) return;
    e.preventDefault();
    e.stopPropagation();
    const de = term.getAttribute("data-de") || term.textContent.trim();
    const vi = term.getAttribute("data-vi") || lookupVi(de);
    const r = term.getBoundingClientRect();
    showPopAt(de, vi, r);
  }, true);

  // Legacy CSS for any remaining .term marks (inline, non-breaking)
  function legacyTermCss(){
    if(document.getElementById("vocab-term-legacy")) return;
    const s=document.createElement("style");
    s.id="vocab-term-legacy";
    s.textContent = `.term{display:inline;border-bottom:1px dashed #93c5fd;cursor:pointer}
.term::after{content:none}
.theme-item .term,.theme-list .term,.subject-card .term,.tile .term{all:unset}`;
    document.head.appendChild(s);
  }
  legacyTermCss();

  w.Vocab = {
    B1_VOCAB, lookupVi, enableVocabOn, bindTerms, enrichTermsInHtml, wrapTextNodes,
    showSelection: handleSelection, hidePop
  };
  w.B1_VOCAB = B1_VOCAB;
  w.lookupVi = lookupVi;
  w.enableVocabOn = enableVocabOn;
  w.bindTerms = bindTerms;
  w.enrichTermsInHtml = enrichTermsInHtml;
  w.wrapTextNodes = wrapTextNodes;
  w.showTermPop = function(el){
    if(!el) return;
    const de=el.getAttribute && (el.getAttribute("data-de")||el.textContent);
    const vi=lookupVi(de);
    showPopAt(de, vi, el.getBoundingClientRect());
  };
  w.hideTermPop = hidePop;
  w.toggleTermVi = function(el){ w.showTermPop(el); };

  // boot
  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded", ()=>{ ensureStyles(); ensurePop(); });
  } else { ensureStyles(); ensurePop(); }
})(window);
