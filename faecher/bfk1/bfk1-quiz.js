/* BfK-1 Quiz · Bank wird AUTOMATISCH aus BFK1_THEMES (30 LS) erzeugt.
   So bleibt das Quiz immer deckungsgleich mit dem Hub (LF2 + LF6 + LF9 + Extra).
   Die 17 Freitext-Fragen unten sind einzigartig (nicht in den LS-quiz-Arrays)
   und werden den passenden LS zugeordnet. */
(function(){
  const W = window;

  // ===== FILL-IN (Freitext, case-insensitive) — einzigartig, den LS zugeordnet =====
  const FILL = [
    {type:"fill", theme:"lf6-ls01", cat:"3S", q:"Nenne die 3 „S“ der Gästezufriedenheit (mit Komma).",
      answers:["sauberkeit, speisenqualität, service","sauberkeit, speisenqualitat, service","sauberkeit speisenqualität service"],
      answer:"Sauberkeit, Speisenqualität, Service",
      ex:"Die 3 S: Sauberkeit · Speisenqualität · Service."},
    {type:"fill", theme:"lf6-ls01", cat:"Methode", q:"Schreibe die 5 Schritte der Auswertung (Pfeile ok).",
      answers:["sammeln → kategorisieren → häufigkeit → maßnahmen → kontrolle","sammeln, kategorisieren, häufigkeit, maßnahmen, kontrolle","sammeln kategorisieren haeufigkeit massnahmen kontrolle"],
      answer:"Sammeln → Kategorisieren → Häufigkeit → Maßnahmen → Kontrolle",
      ex:"Klassischer Verbesserungskreislauf."},
    {type:"fill", theme:"lf6-ls02", cat:"Formen", q:"Was bedeutet vegan? (kurz)",
      answers:["keine tierischen produkte","verzicht auf alle tierischen produkte","keine produkte vom tier"],
      answer:"keine tierischen Produkte",
      ex:"Vegan = keine tierischen Produkte (auch Ei, Milch, Honig, Gelatine)."},
    {type:"fill", theme:"lf6-ls02", cat:"Gericht", q:"Nenne die Bausteine eines Gerichts (Schema).",
      answers:["zubereitungsart + hauptrohstoff + soße + gemüsebeilage + sättigungsbeilage","zubereitungsart hauptrohstoff garnitur soße gemüse sättigung salat","zubereitungsart + hauptrohstoff (+ garnitur) + soße + gemüsebeilage + sättigungsbeilage + salat"],
      answer:"Zubereitungsart + Hauptrohstoff (+ Garnitur) + Soße + Gemüsebeilage + Sättigungsbeilage (+ Salat)",
      ex:"Zubereitungsart gehört fest dazu!"},
    {type:"fill", theme:"lf6-ls10", cat:"Einteilung", q:"Apfel und Birne gehören zu welcher Obstgruppe?",
      answers:["kernobst"],
      answer:"Kernobst",
      ex:"Kernobst = Apfel, Birne, Quitte."},
    {type:"fill", theme:"lf6-ls10", cat:"Technik", q:"Pochieren bedeutet … (kurz)",
      answers:["sanftes garen unter dem siedepunkt","sanft in flüssigkeit garen","garen unter 100°c in flüssigkeit","sanft unter siedepunkt garen"],
      answer:"sanftes Garen unter dem Siedepunkt (in Flüssigkeit)",
      ex:"Pochieren = sanft, unter 100°C."},
    {type:"fill", theme:"lf6-ls11", cat:"Regel", q:"Richtige Reihenfolge bei getrockneten Hülsenfrüchten?",
      answers:["einweichen → wasser weg → kochen","einweichen, einweichwasser weg, kochen","einweichen wasser weg garen"],
      answer:"Einweichen → Wasser weg → Kochen",
      ex:"Nie roh essen! Giftstoffe erst durch Garen."},
    {type:"fill", theme:"lf6-ls11", cat:"Begriff", q:"Wie heißt das Kochwasser von Kichererbsen (veganer Eischnee)?",
      answers:["aquafaba"],
      answer:"Aquafaba",
      ex:"Aquafaba = Kichererbsen-Kochwasser."},
    {type:"fill", theme:"lf6-ls12", cat:"Gluten", q:"Nenne 3 glutenhaltige Getreide.",
      answers:["weizen, roggen, gerste","weizen, dinkel, roggen","weizen, gerste, dinkel","weizen roggen gerste"],
      answer:"Weizen, Roggen, Gerste",
      ex:"Auch Dinkel und Grünkern enthalten Gluten."},
    {type:"fill", theme:"lf6-ls12", cat:"Mahlgrade", q:"Mahlgrade von grob nach fein?",
      answers:["schrot → grieß → dunst → mehl","schrot, grieß, dunst, mehl","schrot gries dunst mehl"],
      answer:"Schrot → Grieß → Dunst → Mehl",
      ex:"Von grob nach fein."},
    {type:"fill", theme:"lf6-ls13", cat:"Regeln", q:"Zwei wichtige Menüregeln gegen Wiederholung?",
      answers:["keine wiederholung der rohstoffe und zubereitungsarten","keine rohstoffe doppelt, keine garmethode doppelt","keine wiederholung rohstoffe/zubereitung"],
      answer:"Keine Wiederholung der Rohstoffe und der Zubereitungsarten",
      ex:"Abwechslung ist Pflicht."},
    {type:"fill", theme:"lf9-ls01", cat:"System", q:"McDonald’s ist typischerweise welche Systemform?",
      answers:["quickservice","quick-service","quick service"],
      answer:"Quickservice",
      ex:"Systemgastronomie, schnell, standardisiert."},
    {type:"fill", theme:"lf9-ls03", cat:"USt", q:"USt-Satz Speisen vor Ort im Restaurant (ab 2026)?",
      answers:["7%","7 %","7"],
      answer:"7%",
      ex:"Alle Speisen 7 % — vor Ort und Außerhaus (Steueränderungsgesetz 2025, ab 01.01.2026)."},
    {type:"fill", theme:"lf9-ls03", cat:"USt", q:"USt-Satz Speisen außer Haus / zum Mitnehmen (ab 2026)?",
      answers:["7%","7 %","7"],
      answer:"7%",
      ex:"Außerhaus 7 % — genau wie vor Ort (ab 01.01.2026 alle Speisen 7 %)."},
    {type:"fill", theme:"lf9-ls03", cat:"USt", q:"USt-Satz für Getränke im Regelfall?",
      answers:["19%","19 %","19"],
      answer:"19%",
      ex:"Getränke bleiben bei 19 % (Ausnahme: Milch/Milchmischgetränke ≥ 75 % Milch, Leitungswasser Außerhaus → 7 %)."},
    {type:"fill", theme:"lf9-ls03", cat:"Recht", q:"Wie entsteht der Bewirtungsvertrag?",
      answers:["bestellung + annahme","bestellung und annahme","durch bestellung und bestellungsannahme"],
      answer:"Bestellung + Annahme",
      ex:"Gast bestellt, Wirt nimmt an."},
    {type:"fill", theme:"lf9-ls03", cat:"Formel", q:"Netto aus Brutto? (Formel)",
      answers:["brutto / (1 + satz)","brutto ÷ (1 + steuersatz)","brutto/(1+satz)","netto = brutto / (1 + satz)"],
      answer:"Brutto ÷ (1 + Steuersatz)",
      ex:"USt = Brutto − Netto."},
  ];

  // ===== Bank + Theme-Meta aus BFK1_THEMES erzeugen =====
  function buildFromThemes(){
    const T = W.BFK1_THEMES;
    if(!T) return { quiz: [], meta: {} };
    const groups = (W.BFK1_GROUPS || [T.lf2, T.lf6, T.lf9, W.BFK1_EXTRA]).filter(Boolean);
    const meta = {};
    const mc = [];
    groups.forEach(function(g){
      // Badge "LF 2" → "LF2", "Extra" bleibt "Extra" (für Filter-Buttons)
      const lf = String(g.badge || '').replace(/\s+/g, '') || String(g.id || '').toUpperCase();
      (g.items || []).forEach(function(it){
        meta[it.id] = { icon: it.icon || '📘', name: it.name || it.id, lf: lf };
        (it.quiz || []).forEach(function(q){
          if(!q || !q.q || !Array.isArray(q.options)) return;
          mc.push({
            theme: it.id,
            cat: it.name || it.id,
            q: q.q,
            opts: q.options,
            a: q.answer,
            ex: q.explain || '',
            bank: (q.bank==='excel' || /fk[_ -]?exel/i.test(String(q.source||'')) || /fk[_ -]?exel/i.test(String(it.source||'')) || /fk[_ -]?exel/i.test(String(it.qaNote||''))) ? 'excel' : 'app'
          });
        });
      });
    });
    return { quiz: mc, meta: meta };
  }

  const built = buildFromThemes();
  // Freitext nur anhängen, wenn der Ziel-LS wirklich existiert
  const fill = FILL.filter(function(f){ return built.meta[f.theme]; });

  function quizAllowed(q){
    if(!q) return false;
    const group=(W.bfk1GroupOf&&W.bfk1GroupOf(q.theme))||null;
    if(group && group.id==='extra' && W.Access && !W.Access.can('theme:full')) return false;
    if(q.bank==='excel' && W.Access && !W.Access.can('questionbank:excel')) return false;
    return true;
  }

  W.BFK1_QUIZ = built.quiz.concat(fill);
  W.BFK1_THEME_META = built.meta;
  W.bfk1QuestionAllowed = quizAllowed;

  W.bfk1QuizByThemes = function(themeIds){
    const set = new Set(themeIds || []);
    return (W.BFK1_QUIZ || []).filter(function(q){ return set.has(q.theme) && quizAllowed(q); });
  };

  W.bfk1QuizAllThemes = function(){
    const ids = new Set();
    (W.BFK1_QUIZ || []).forEach(function(q){ if(quizAllowed(q)) ids.add(q.theme); });
    return Array.from(ids);
  };
})();


/* ===== Answer helpers / study storage ===== */
window.bfk1NormalizeAnswer = function(s){
  return String(s||'')
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g,'')
    .replace(/ä/g,'ae').replace(/ö/g,'oe').replace(/ü/g,'ue').replace(/ß/g,'ss')
    .replace(/[^a-z0-9%]+/g,' ')
    .replace(/\s+/g,' ')
    .trim();
};
window.bfk1GetCorrectText = function(q){
  if(!q) return '';
  if(q.type==='fill') return q.answer || ((q.answers&&q.answers[0])||'');
  if(q.opts && q.a!=null && q.opts[q.a]!=null) return q.opts[q.a];
  return '';
};
window.bfk1CheckFill = function(q, user){
  const u = window.bfk1NormalizeAnswer(user);
  if(!u) return false;
  const cands = [];
  if(q.answer) cands.push(q.answer);
  (q.answers||[]).forEach(a=>cands.push(a));
  // also allow correct MC option text if present
  if(q.opts && q.a!=null) cands.push(q.opts[q.a]);
  return cands.some(a => {
    const n = window.bfk1NormalizeAnswer(a);
    if(!n) return false;
    if(u===n) return true;
    // allow contained match for longer answers
    if(n.length>=8 && (u.includes(n) || n.includes(u))) return true;
    return false;
  });
};
window.bfk1QuestionKey = function(q){
  return (q.theme||'')+'::'+(q.q||'');
};

// local study data
window.BfK1Study = {
  ERR_KEY: 'bfk1_error_deck_v1',
  MASTERY_KEY: 'bfk1_mastery_v1',
  SPACE_KEY: 'bfk1_spaced_v1',
  load(key, fallback){
    try{ return JSON.parse(localStorage.getItem(key)||JSON.stringify(fallback)); }catch(e){ return fallback; }
  },
  save(key, val){ try{ localStorage.setItem(key, JSON.stringify(val)); }catch(e){} },
  getErrors(){ return this.load(this.ERR_KEY, []); },
  addError(q){
    if(!q) return;
    const list=this.getErrors().filter(x=>x.key!==window.bfk1QuestionKey(q));
    list.unshift({
      key: window.bfk1QuestionKey(q),
      theme: q.theme, cat:q.cat, q:q.q, type:q.type||'mc',
      opts:q.opts||null, a:q.a, answer:q.answer||null, answers:q.answers||null, ex:q.ex||'', bank:q.bank||'app',
      ts: Date.now()
    });
    this.save(this.ERR_KEY, list.slice(0,100));
    this.schedule(q, false);
  },
  clearError(q){
    const key=window.bfk1QuestionKey(q);
    this.save(this.ERR_KEY, this.getErrors().filter(x=>x.key!==key));
    this.schedule(q, true);
  },
  getMastery(){ return this.load(this.MASTERY_KEY, {}); },
  bumpMastery(theme, ok){
    const m=this.getMastery();
    const cur=m[theme]||{attempts:0,correct:0,score:0,last:0,streak:0};
    cur.attempts++;
    if(ok){ cur.correct++; cur.streak=(cur.streak||0)+1; }
    else cur.streak=0;
    const rate = cur.attempts? (cur.correct/cur.attempts) : 0;
    // score 0-3
    let score=0;
    if(cur.attempts>=3 && rate>=0.5) score=1;
    if(cur.attempts>=5 && rate>=0.7) score=2;
    if(cur.attempts>=8 && rate>=0.85) score=3;
    if(cur.streak>=5 && rate>=0.8) score=Math.max(score,3);
    cur.score=score; cur.last=Date.now();
    m[theme]=cur; this.save(this.MASTERY_KEY,m); return cur;
  },
  // spaced 1-3-7 days in ms
  schedule(q, ok){
    const key=window.bfk1QuestionKey(q);
    const all=this.load(this.SPACE_KEY,{});
    const day=86400000;
    const cur=all[key]||{interval:0, due:Date.now()};
    if(ok){
      if(cur.interval<1) cur.interval=1;
      else if(cur.interval<3) cur.interval=3;
      else cur.interval=7;
    }else{
      cur.interval=1;
    }
    cur.due = Date.now() + cur.interval*day;
    cur.theme=q.theme; cur.q=q.q; cur.type=q.type||'mc';
    cur.opts=q.opts||null; cur.a=q.a; cur.answer=q.answer||null; cur.answers=q.answers||null; cur.ex=q.ex||''; cur.cat=q.cat||''; cur.bank=q.bank||'app';
    all[key]=cur; this.save(this.SPACE_KEY, all);
  },
  dueReviews(){
    const all=this.load(this.SPACE_KEY,{});
    const now=Date.now();
    return Object.keys(all).map(k=>all[k]).filter(x=>x.due<=now);
  }
};
