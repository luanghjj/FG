/* Shared DE→VI vocabulary for all Fächer */
(function(w){
  "use strict";

  const B1_VOCAB = {
    // Gäste / Service
    "Atmosphäre":"không khí / bầu không khí","Preisempfinden":"cảm nhận về giá","Sauberkeit":"sạch sẽ",
    "Service":"phục vụ","Hygiene":"vệ sinh","Garstufe":"độ chín (thịt)","Anrichtung":"cách bày món",
    "Reinigungsplan":"kế hoạch vệ sinh","Teamschulung":"đào tạo nhóm","Geschäftsleitung":"ban giám đốc",
    "Restaurantleitung":"ban quản lý nhà hàng","Umsatzzahlen":"doanh số","Gästekommentare":"nhận xét khách",
    "Verbesserungsvorschläge":"đề xuất cải thiện","Feedbackbogen":"phiếu góp ý","Internetbewertungen":"đánh giá online",
    "Briefing":"họp giao ban","Ausgabe-Check":"kiểm trước khi mang ra","Preis-Leistung":"tỷ lệ giá–chất lượng",
    "Speisenqualität":"chất lượng món","vegetarische Alternativen":"món chay thay thế","vegane Optionen":"món thuần chay",
    // Ernährung
    "Vegetarisch":"ăn chay","Vegan":"thuần chay","Flexitarier":"ăn chay linh hoạt","Pescetarier":"ăn cá, không thịt",
    "Pescetarisch":"ăn cá, không thịt","Laktosefrei":"không lactose","Glutenfrei":"không gluten","Gluten":"gluten",
    "Zöliakie":"bệnh không dung nạp gluten","Halal":"hợp chuẩn Hồi giáo","Koscher":"hợp chuẩn Do Thái",
    "Low-Carb":"ít carb","Keto":"chế độ keto","Allergene":"chất gây dị ứng","Gelatine":"gelatin",
    "Kreuzkontamination":"lây nhiễm chéo","Lebensmittel":"thực phẩm","Sättigung":"no bụng",
    // Gericht
    "Hauptkomponente":"thành phần chính","Hauptrohstoff":"nguyên liệu chính","Zubereitungsart":"cách chế biến",
    "Garnitur":"kiểu trang trí / …-Art","Soße":"nước sốt","Gemüsebeilage":"rau kèm","Sättigungsbeilage":"món no",
    "Salat":"salad","Vorspeisen":"khai vị","Hauptgänge":"món chính","Desserts":"tráng miệng","Getränke":"đồ uống",
    "Vorspeise":"khai vị","Suppe":"súp","Hauptgericht":"món chính","Nachspeise":"tráng miệng","Dessert":"tráng miệng",
    "Menü":"set menu","Kalte Vorspeise":"khai vị nguội","Warmes Zwischengericht":"món nóng xen giữa",
    "Saisonale Produkte":"sản phẩm theo mùa","Bindestriche":"dấu gạch nối","Saison":"mùa vụ","Konsistenz":"kết cấu",
    "Garart":"cách chế biến","gebraten":"chiên/rán","geschmort":"om/hầm","gegrillt":"nướng vỉ","gedünstet":"hấp/om nhẹ",
    "Besondere Empfehlungen":"món đề xuất","Speisekarte":"thực đơn","Zielgruppe":"nhóm khách mục tiêu",
    // Obst / Hülsen / Getreide
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
    // Zahlung / Recht
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
    // Fleisch / BfK-2
    "Rind":"bò","Schwein":"heo","Schaf":"cừu","Lamm":"cừu non","Kalb":"bê","Filet":"thăn nội",
    "Roastbeef":"thăn ngoại bò","Hesse":"bắp chân / ống","Bug":"vai","Hals":"cổ","Nacken":"gáy",
    "Brust":"ức","Bauch":"bụng","Rücken":"lưng / thăn","Kollagen":"collagen","Bindegewebe":"mô liên kết",
    "Gelatine":"gelatin","Muskelgewebe":"mô cơ","Fettgewebe":"mô mỡ","Kurzbraten":"áp chảo nhanh",
    "Schmoren":"om/hầm","Kochen":"luộc/nấu","Grillen":"nướng","Garverfahren":"phương pháp chín",
    "Marmorierung":"vân mỡ","Schlachtfleisch":"thịt giết mổ","Knochen":"xương","Sehnen":"gân",
    "Wiener Schnitzel":"schnitzel kiểu Vienna","Cordon bleu":"cordon bleu","Gulasch":"gulasch / ragu",
    // Küche / Nährwert
    "Nährwert":"giá trị dinh dưỡng","Brennwert":"nhiệt lượng","kcal":"kcal","kJ":"kilojoule",
    "Grundumsatz":"chuyển hóa cơ bản","PAL-Wert":"hệ số hoạt động","Eiercode":"mã trứng",
    "Haltungsform":"hình thức nuôi","Freilandhaltung":"nuôi thả vườn","Bodenhaltung":"nuôi sàn",
    "Biologische Wertigkeit":"giá trị sinh học (protein)","Ergänzungswert":"giá trị bổ sung protein",
    "Salmonellen":"salmonella","MHD":"hạn dùng","Spiegelei":"trứng ốp la","Rührei":"trứng khuấy",
    "Omelett":"trứng omelette","pochiert":"trứng chần","Gewichtsklasse":"hạng cân",
    // Deutsch / Visualisierung
    "Mindmap":"sơ đồ tư duy","Diagramm":"biểu đồ","Visualisierung":"trực quan hóa","Sachtext":"văn bản thông tin",
    // Deutsch Visualisierung – 7 Formen
    "Kreisdiagramm":"biểu đồ tròn / bánh","Tortendiagramm":"biểu đồ bánh",
    "Kurvendiagramm":"biểu đồ đường","Liniendiagramm":"biểu đồ đường",
    "Säulendiagramm":"biểu đồ cột","Balkendiagramm":"biểu đồ thanh",
    "Säulen-/Balkendiagramm":"biểu đồ cột / thanh","Balken-/Säulendiagramm":"biểu đồ cột / thanh",
    "Kreis-/Tortendiagramm":"biểu đồ tròn / bánh",
    "Strukturbild":"sơ đồ cấu trúc","Organigramm":"sơ đồ tổ chức",
    "Anteile":"tỷ lệ / phần trăm","Anteile (%)":"tỷ lệ (%)",
    "Entwicklung":"sự phát triển / xu hướng","Vergleich":"so sánh",
    "Hierarchie":"cấp bậc","Ablauf":"quy trình","Ursache–Wirkung":"nhân–quả",
    "Teufelskreis":"vòng xoáy tiêu cực","Zeitachse":"trục thời gian",
    "Ideensammlung":"thu thập ý tưởng","Stichworte":"từ khóa",
    "stieg":"đã tăng","sank":"đã giảm","exakte Zahlen":"số liệu chính xác",

    "Überschrift":"tiêu đề","Stichpunkte":"gạch đầu dòng","Tabelle":"bảng","Fließtext":"văn xuôi liên tục",
    "Zusammenfassung":"tóm tắt","Argument":"lập luận","Beispiel":"ví dụ","Vergleich":"so sánh",
    // WiKO / GK
    "Angebot":"chào hàng","Mangel":"lỗi hàng","Rechnung":"hóa đơn","Demokratie":"dân chủ",
    "Gewaltenteilung":"phân quyền","Grundrechte":"quyền cơ bản","Grundgesetz":"luật cơ bản Đức",
    "Menschenwürde":"nhân phẩm","Meinungsfreiheit":"tự do ngôn luận","Wahlen":"bầu cử",
    "Bundesrepublik":"Cộng hòa Liên bang","Gleichheit":"bình đẳng",
    // English service
    "Welcome":"chào mừng","Reservation":"đặt bàn","Starter":"khai vị","Main course":"món chính",
    "Allergy":"dị ứng","Tip":"tiền boa","Receipt":"biên lai","Cash or card?":"tiền mặt hay thẻ?"
  };

  function lookupVi(de){
    if(!de) return '';
    if(B1_VOCAB[de]) return B1_VOCAB[de];
    const k=Object.keys(B1_VOCAB).find(x=>x.toLowerCase()===String(de).toLowerCase());
    return k?B1_VOCAB[k]:'';
  }

  function enrichTermsInHtml(html){
    if(!html || typeof html!=='string') return html;
    let out=html;
    const keys=Object.keys(B1_VOCAB).sort((a,b)=>b.length-a.length);
    keys.forEach(de=>{
      const vi=B1_VOCAB[de];
      const esc=de.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
      const re=new RegExp('('+esc+')','g');
      let result='', last=0, m;
      while((m=re.exec(out))!==null){
        const offset=m.index;
        const before=out.slice(Math.max(0,offset-120), offset);
        // skip inside tags
        const lt=before.lastIndexOf('<'), gt=before.lastIndexOf('>');
        if(lt>gt) { continue; }
        // skip if already in term
        if(before.lastIndexOf('class="term"')>before.lastIndexOf('</span>')) continue;
        if(before.includes('data-de="'+de+'"')) continue;
        result += out.slice(last, offset);
        result += '<span class="term" data-de="'+de+'" data-vi="'+String(vi).replace(/"/g,'&quot;')+'">'+de+'</span>';
        last = offset + m[0].length;
      }
      result += out.slice(last);
      out = result;
    });
    return out;
  }

  function ensureStyles(){
    if(document.getElementById('vocab-style')) return;
    const s=document.createElement('style');
    s.id='vocab-style';
    s.textContent = `
.term{border-bottom:1.5px dashed #60a5fa;color:#2563eb;cursor:pointer;font-weight:650;padding:0 2px;border-radius:4px;transition:background .12s}
.term:hover,.term.open{background:#eff6ff;color:#1d4ed8}
.term::after{content:"VI";font-size:.58em;font-weight:800;margin-left:3px;vertical-align:super;color:#93c5fd}
.term-vi{display:inline;margin-left:4px;padding:1px 7px;border-radius:999px;background:#ecfdf5;color:#047857;border:1px solid #a7f3d0;font-size:.78em;font-weight:650}
.term-vi.hidden{display:none!important}
#termPop{position:fixed;z-index:9999;max-width:min(300px,88vw);background:#0f172a;color:#fff;border-radius:14px;padding:12px 14px;font-size:.88em;line-height:1.45;box-shadow:0 12px 32px rgba(15,23,42,.32);display:none}
#termPop.show{display:block}
#termPop .de{font-weight:700;margin-bottom:4px}
#termPop .vi{font-weight:600;color:#86efac;font-size:1.02em}
#termPop .hint{margin-top:6px;font-size:.72em;opacity:.65}
`;
    document.head.appendChild(s);
  }

  function ensurePop(){
    let pop=document.getElementById('termPop');
    if(pop) return pop;
    pop=document.createElement('div');
    pop.id='termPop';
    pop.setAttribute('role','tooltip');
    pop.innerHTML='<div class="de"></div><div class="vi"></div><div class="hint">Nghĩa tiếng Việt · bấm lại để ẩn</div>';
    document.body.appendChild(pop);
    return pop;
  }

  function showTermPop(el){
    ensureStyles(); const pop=ensurePop();
    const de=el.getAttribute('data-de') || el.textContent.trim();
    const vi=el.getAttribute('data-vi') || lookupVi(de) || '—';
    pop.querySelector('.de').textContent='🇩🇪 '+de;
    pop.querySelector('.vi').textContent='🇻🇳 '+vi;
    pop.classList.add('show');
    const r=el.getBoundingClientRect();
    const pw=Math.min(300, window.innerWidth*0.88);
    let left=r.left + r.width/2 - pw/2;
    left=Math.max(10, Math.min(left, window.innerWidth-pw-10));
    let top=r.top - 76; if(top<8) top=r.bottom+10;
    pop.style.left=left+'px'; pop.style.top=top+'px'; pop.style.width=pw+'px';
  }
  function hideTermPop(){
    const pop=document.getElementById('termPop');
    if(pop) pop.classList.remove('show');
  }

  function toggleTermVi(el){
    ensureStyles();
    const vi=el.getAttribute('data-vi') || lookupVi(el.getAttribute('data-de')||el.textContent.trim()) || '—';
    el.setAttribute('data-vi', vi);
    let chip=el.nextElementSibling;
    if(!chip || !chip.classList.contains('term-vi')){
      chip=document.createElement('span');
      chip.className='term-vi hidden';
      el.insertAdjacentElement('afterend', chip);
    }
    chip.textContent='🇻🇳 '+vi;
    const willOpen=chip.classList.contains('hidden');
    document.querySelectorAll('.term-vi').forEach(c=>{ if(c!==chip) c.classList.add('hidden'); });
    document.querySelectorAll('.term.open').forEach(t=>{ if(t!==el) t.classList.remove('open'); });
    if(willOpen){ chip.classList.remove('hidden'); el.classList.add('open'); showTermPop(el); }
    else { chip.classList.add('hidden'); el.classList.remove('open'); hideTermPop(); }
  }

  function bindTerms(root){
    ensureStyles(); ensurePop();
    const scope = root || document;
    try{
      if(scope && scope!==document && scope.innerHTML && !scope.dataset.vocabEnriched){
        scope.dataset.vocabEnriched='1';
        // Don't re-enrich huge interactive maps endlessly; still ok
        scope.innerHTML = enrichTermsInHtml(scope.innerHTML);
      }
    }catch(e){}
    scope.querySelectorAll('.term').forEach(el=>{
      if(el.dataset.bound) return;
      el.dataset.bound='1';
      if(!el.getAttribute('data-vi')){
        const vi=lookupVi(el.getAttribute('data-de')||el.textContent.trim());
        if(vi) el.setAttribute('data-vi', vi);
      }
      el.addEventListener('click', e=>{ e.preventDefault(); e.stopPropagation(); toggleTermVi(el); });
    });
  }

  /** Enrich + bind a whole view/page (all Fächer) */
  function enableVocabOn(root){
    const el = typeof root==='string' ? document.querySelector(root) : (root||document.body);
    if(!el) return;
    // For large static views: mark terms without rewriting whole interactive SVG if data-no-vocab
    if(el.getAttribute && el.getAttribute('data-no-vocab')==='1') return;
    if(!el.dataset.vocabEnriched){
      // Prefer enriching content cards only
      const cards=el.querySelectorAll('.card, .mini, .panel, .apanel, .section-head, #fachThemeBody, #bfk1ThemeBody, .detail-box, table, .formula, .note, .hint, li, p, td, th, h2, h3, h4');
      if(cards.length){
        cards.forEach(c=>{
          if(c.dataset.vocabEnriched) return;
          // skip scripty interactive image wraps
          if(c.closest && (c.closest('.img-wrap') || c.closest('.svg-box') || c.closest('.hotspot'))) return;
          try{
            c.dataset.vocabEnriched='1';
            c.innerHTML = enrichTermsInHtml(c.innerHTML);
          }catch(e){}
        });
        el.dataset.vocabEnriched='1';
      }else if(el!==document.body){
        try{ el.dataset.vocabEnriched='1'; el.innerHTML=enrichTermsInHtml(el.innerHTML);}catch(e){}
      }
    }
    bindTerms(el);
  }

  // global click outside
  document.addEventListener('click', e=>{
    if(e.target.closest && (e.target.closest('.term')||e.target.closest('.term-vi')||e.target.closest('#termPop'))) return;
    document.querySelectorAll('.term-vi').forEach(c=>c.classList.add('hidden'));
    document.querySelectorAll('.term.open').forEach(t=>t.classList.remove('open'));
    hideTermPop();
  });
  document.addEventListener('scroll', hideTermPop, true);

  w.Vocab = {
    B1_VOCAB, lookupVi, enrichTermsInHtml, bindTerms, enableVocabOn, showTermPop, hideTermPop, toggleTermVi
  };
  // legacy aliases used by index.html
  w.B1_VOCAB = B1_VOCAB;
  w.lookupVi = lookupVi;
  w.enrichTermsInHtml = enrichTermsInHtml;
  w.bindTerms = bindTerms;
  w.enableVocabOn = enableVocabOn;
  w.showTermPop = showTermPop;
  w.hideTermPop = hideTermPop;
  w.toggleTermVi = toggleTermVi;
})(window);
