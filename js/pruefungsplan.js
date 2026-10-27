/* Prüfungsplan Winter 2026 · Abschlussprüfung Fachkraft für Gastronomie (BW)
   Feste Tagesphasen 28.10.–10.11.2026: zuerst BfK, GK/WK kurz vor der Prüfung; erst lernen, dann üben, zum Schluss Probeprüfungen mit Timer.
   Route #/plan · View #v-plan · Fortschritt in localStorage. */
(function () {
  'use strict';

  const DONE_KEY = 'pruefungsplan_w2026_done_v2';
  const TIMER_KEY = 'pruefungsplan_timer_v1';

  // Bausteine
  const th = (f, id, label) => ({ a: 'theme', f, id, label });
  const quiz = (f, ids, label, mode) => ({ a: 'quiz', f, ids, label, mode: mode || 'all' });
  const exam = (f, ids, n, min, label) => ({ a: 'quiz', f, ids, label, mode: 'exam', n, min });
  const fehler = (f, label) => ({ a: 'fehler', f, label: label || 'Fehlerbuch' });
  const timer = (min, label) => ({ a: 'timer', min, label });
  const url = (href, label) => ({ a: 'url', href, label });

  // Themen-Sets
  const WK_GRUND = ['wiko-ausbildungsvertrag', 'wiko-rechte-pflichten', 'wiko-probezeit-ueberwachung', 'wiko-arbeitsschutz',
    'wiko-arbeitsvertrag', 'wiko-kuendigung-frist', 'wiko-kuendigungsschutz', 'wiko-betriebsrat-mitbestimmung', 'wiko-jav',
    'wiko-tarifvertrag', 'wiko-arbeitskampf', 'wiko-lohnabrechnung-sozial', 'wiko-steuerklassen',
    'wk-steuererklaerung', 'wk-altersvorsorge', 'wk-solidaritaet'];
  const WK_FS1 = ['wiko-rg-p1', 'wiko-rg-p2', 'wiko-rg-p3', 'kaufvertrag', 'wk-kaufvertrag', 'wk-verbraucherschutz',
    'wk-geld', 'wk-kredit', 'wk-buergschaft', 'wk-ueberschuldung'];
  const GVW_LAGER = ['lf2-ls01', 'lf2-ls02', 'lf2-ls03', 'lf2-ls04', 'lf2-ls05', 'lf2-ls06', 'lf2-ls07', 'lf2-ls08',
    'lf2-ls09', 'lf2-ls10', 'lf2-ls11'];
  const GVW_WW = ['extra-t14', 'extra-t15', 'extra-t16'];
  const GVW_GAST = ['extra-t1', 'extra-t8', 'extra-t9', 'lf9-ls04'];
  const GVW_QUIZ = GVW_LAGER.concat(['extra-t8', 'extra-t9', 'lf9-ls04', 'extra-t12', 'extra-t13']);
  const GK_THEMEN = ['wahlgrundsaetze', 'erst-zweitstimme', 'sperrklausel', 'gewaltenteilung', 'demokratie-gg', 'grundrechte',
    'vertrauensfrage', 'vertrauensfrage-misstrauen', 'partizipation', 'medien-vierte-gewalt', 'statistik-analyse', 'kalter-krieg', 'zentralismus'];
  const GK_GLE = ['gk-gle-ls26-30', 'gk-gle-ls31-35', 'gk-gle-ls36-43', 'gk-gle-ls44-49'];

  const themes = (f, ids) => ids.map((id) => th(f, id));

  // Reihenfolge: zuerst BfK (GVW), dann Deutsch, GK und WK erst kurz vor dem 10.11., damit sie frisch im Kopf sind.
  const WK_GRUND_A = WK_GRUND.slice(0, 7);
  const WK_GRUND_B = WK_GRUND.slice(7);
  const WK_ALL = WK_GRUND.concat(WK_FS1);
  const GK_A = GK_THEMEN.slice(0, 6);
  const GK_B = GK_THEMEN.slice(6);

  // kind: lernen · ueben · wiederholen · pruefung · pause · termin
  const DAYS = [
    { date: '2026-10-28', title: 'GVW · Warenlagerung', sub: 'Beschaffung, Bestellung, Warenannahme, Lagerung, Inventur, Warenwirtschaft', mode: 'frei', blocks: [
      { von: '09:00', bis: '11:30', kind: 'lernen', title: 'LF2 Beschaffung & Lagerung', note: 'Học thuộc công thức: Meldebestand, Lagerkennzahlen, Lagerdauer, Umschlagshäufigkeit.', actions: themes('bfk1', GVW_LAGER).concat(themes('bfk1', GVW_WW)) },
      { von: '13:30', bis: '15:00', kind: 'ueben', title: 'Quiz Warenlagerung', note: 'Sau quiz, làm 2 câu tự luận LF2 trong Arena.', actions: [quiz('bfk1', GVW_LAGER, 'Quiz LF2'), url('arena.html', 'Arena · Freitext')] },
      { von: '16:30', bis: '17:30', kind: 'wiederholen', title: 'Fehlerbuch BfK-1', note: 'Error deck BfK-1 là Fehlerbuch của phần GVW.', actions: [fehler('bfk1', 'Error deck BfK-1')] },
    ] },
    { date: '2026-10-29', title: 'GVW · Gasterlebnis & Verkaufsförderung', sub: 'Umgang mit Gästen, Marketing, Beratung, Reklamation', mode: 'frei', blocks: [
      { von: '09:00', bis: '11:30', kind: 'lernen', title: 'Gast & Marketing', note: 'Marketing-Mix 4P, AIDA, Verkaufsgespräch, Reklamation (L-E-A-R-N).', actions: themes('bfk1', GVW_GAST).concat([th('bfk2', 'bfk2-verkaufsfoerderung'), th('bfk2', 'bfk2-kommunikation'), th('bfk5', 'bfk5-kommunikation'), th('bfk5', 'bfk5-reklamation')]) },
      { von: '13:30', bis: '15:00', kind: 'ueben', title: 'Quiz Gast & Marketing', note: '', actions: [quiz('bfk1', ['extra-t1', 'extra-t8', 'extra-t9', 'lf9-ls04'], 'Quiz BfK-1'), quiz('bfk2', ['bfk2-verkaufsfoerderung', 'bfk2-kommunikation', 'bfk2-gastgeber-team'], 'Quiz BfK-2'), quiz('bfk5', ['bfk5-kommunikation', 'bfk5-reklamation', 'bfk5-begruessung'], 'Quiz BfK-5')] },
      { von: '16:30', bis: '17:30', kind: 'wiederholen', title: 'GVW gemischt', note: '10 câu trộn cả Lagerung lẫn Marketing.', actions: [quiz('bfk1', GVW_QUIZ, '10 Fragen gemischt', 'quick'), fehler('bfk1', 'Error deck BfK-1')] },
    ] },
    { date: '2026-10-30', title: 'Probeprüfung GVW', sub: 'Erster Test unter Zeitdruck', mode: 'frei', blocks: [
      { von: '09:00', bis: '09:30', kind: 'pruefung', title: 'GVW · 25 Fragen / 25 Min', note: 'Không mở bài học trong lúc làm. Kết quả lưu vào bảng bên dưới.', actions: [exam('bfk1', GVW_QUIZ, 25, 25, 'Probeprüfung GVW')] },
      { von: '10:00', bis: '11:30', kind: 'wiederholen', title: 'Lücken schließen', note: 'Đọc lại đúng những Thema có câu sai, rồi làm lại Error deck.', actions: [fehler('bfk1', 'Error deck BfK-1'), th('bfk1', 'lf2-ls04')] },
      { von: '13:30', bis: '15:00', kind: 'ueben', title: 'Freitext GVW', note: 'Viết 2 câu tự luận (1 Lagerung, 1 Gast/Marketing) trong Arena.', actions: [url('arena.html', 'Arena · Freitext')] },
    ] },
    { date: '2026-10-31', title: 'Deutsch', sub: 'Teil 1 Textverständnis 25 P · Teil 2 Schreibaufgabe 25 P', mode: 'frei', blocks: [
      { von: '09:00', bis: '11:00', kind: 'lernen', title: 'Prüfungsformat & Textarbeit', note: 'Teil 1: A1 4 Aussagen, A2 8 ableitbare Aussagen, A3 5 Textstellen, A4 Lückentext 16 Lücken (a/b/c). Gạch chân từ khóa trong câu hỏi trước khi đọc bài.', actions: [th('deutsch', 'muster-ka'), th('deutsch', 'text-zu-grafik'), th('gk', 'redemittel'), quiz('deutsch', null, 'Quiz Deutsch')] },
      { von: '13:30', bis: '14:30', kind: 'pruefung', title: 'Schreibaufgabe · 60 Min', note: 'Bài viết cho lời kêu gọi đăng bài trên mạng: chọn 3/4 ý, có Zwischenüberschriften, tối đa 2 trang.', actions: [timer(60, 'Schreibaufgabe')] },
      { von: '16:00', bis: '17:00', kind: 'wiederholen', title: 'Text kontrollieren', note: 'Tự soát: Anrede/Einleitung, 3 Punkte, Absätze, Schluss, Rechtschreibung (được dùng từ điển).', actions: [] },
    ] },
    { date: '2026-11-01', title: 'Generalprobe GVW', sub: 'BfK abschließen · Prüfungszeit nachspielen', mode: 'frei', blocks: [
      { von: '09:00', bis: '10:30', kind: 'pruefung', title: 'GVW · Generalprobe 90 Min', note: '30 Min quiz, sau đó 60 Min tự luận (Arena) đúng như giờ thi thật.', actions: [exam('bfk1', GVW_QUIZ, 25, 30, 'Generalprobe GVW'), timer(60, 'GVW Freitext'), url('arena.html', 'Arena · Freitext')] },
      { von: '13:30', bis: '14:30', kind: 'wiederholen', title: 'Error deck BfK-1', note: 'Làm đến khi trống. Từ mai BfK chỉ còn 10 câu ôn nhẹ.', actions: [fehler('bfk1', 'Error deck BfK-1')] },
      { von: '16:00', bis: '16:45', kind: 'wiederholen', title: 'Deutsch Lückentext', note: '', actions: [quiz('deutsch', null, '10 Fragen Deutsch', 'quick')] },
    ] },
    { date: '2026-11-02', title: 'GK · Demokratie & Wahlen', sub: 'Schule · nur abends', mode: 'abend', blocks: [
      { von: '18:30', bis: '19:45', kind: 'lernen', title: 'Themen lesen', note: 'Wahlgrundsätze, Erst-/Zweitstimme, 5-%-Hürde, Gewaltenteilung, Grundrechte.', actions: themes('gk', GK_A) },
      { von: '19:50', bis: '20:30', kind: 'ueben', title: 'Quiz GK Teil 1', note: 'Câu sai tự vào Fehlerbuch.', actions: [quiz('gk', GK_A, 'Quiz starten')] },
    ] },
    { date: '2026-11-03', title: 'GK · Staat & Gesellschaft', sub: 'Schule · nur abends', mode: 'abend', blocks: [
      { von: '18:30', bis: '19:45', kind: 'lernen', title: 'Themen lesen', note: 'Vertrauensfrage, Misstrauensvotum, Partizipation, Medien. Đọc nhanh Demografie, Migration, Strukturwandel, Sozialstaat.', actions: themes('gk', GK_B).concat(themes('gk', GK_GLE)) },
      { von: '19:50', bis: '20:30', kind: 'ueben', title: 'Quiz GK Teil 2', note: '', actions: [quiz('gk', GK_B, 'Quiz starten'), fehler('gk')] },
    ] },
    { date: '2026-11-04', title: 'Probeprüfung GK', sub: 'Schule · nur abends', mode: 'abend', blocks: [
      { von: '19:00', bis: '19:35', kind: 'pruefung', title: 'GK · 25 Fragen / 30 Min', note: 'Không mở bài học trong lúc làm.', actions: [exam('gk', GK_THEMEN, 25, 30, 'Probeprüfung GK')] },
      { von: '19:40', bis: '20:30', kind: 'wiederholen', title: 'Fehlerbuch GK + Karikatur', note: 'Tập 1 Karikatur theo 3 bước: beschreiben, deuten, beurteilen.', actions: [fehler('gk'), th('gk', 'karikatur-methode')] },
    ] },
    { date: '2026-11-05', title: 'WK · Ausbildung & Arbeitsrecht', sub: 'Schule · nur abends', mode: 'abend', blocks: [
      { von: '18:30', bis: '19:45', kind: 'lernen', title: 'Themen lesen', note: 'Ghi bảng con số (Fristen, Probezeit, Urlaub, Kündigung) ra giấy.', actions: themes('wiko', WK_GRUND_A) },
      { von: '19:50', bis: '20:30', kind: 'ueben', title: 'Quiz WK Teil 1', note: '', actions: [quiz('wiko', WK_GRUND_A, 'Quiz starten')] },
    ] },
    { date: '2026-11-06', title: 'WK · Mitbestimmung, Lohn & Steuer', sub: 'Schule · nur abends', mode: 'abend', blocks: [
      { von: '18:30', bis: '19:45', kind: 'lernen', title: 'Themen lesen', note: 'Betriebsrat, JAV, Tarifvertrag, Lohnabrechnung, Steuerklassen, Altersvorsorge.', actions: themes('wiko', WK_GRUND_B) },
      { von: '19:50', bis: '20:30', kind: 'ueben', title: 'Quiz WK Teil 2', note: '', actions: [quiz('wiko', WK_GRUND_B, 'Quiz starten'), fehler('wiko')] },
    ] },
    { date: '2026-11-07', title: 'WK Fachstufe I', sub: 'Rechtsgeschäfte, Kaufvertrag, Verbraucherschutz, Geld, Kredit, Bürgschaft, Überschuldung', mode: 'frei', blocks: [
      { von: '09:00', bis: '11:30', kind: 'lernen', title: 'Themen lesen', note: 'Trọng tâm: Geschäftsfähigkeit, Kaufvertrag-Störungen, Widerruf 14 Tage, Zinsformel.', actions: themes('wiko', WK_FS1) },
      { von: '13:30', bis: '15:00', kind: 'ueben', title: 'Quiz WK Fachstufe I', note: 'Tự tính tay 2 bài Zinsrechnung trên giấy.', actions: [quiz('wiko', WK_FS1, 'Quiz starten')] },
      { von: '16:30', bis: '17:30', kind: 'wiederholen', title: 'Fehlerbuch WK + GK kurz', note: '10 câu GK để không quên phần đầu tuần.', actions: [fehler('wiko'), quiz('gk', GK_THEMEN, '10 Fragen GK', 'quick')] },
    ] },
    { date: '2026-11-08', title: 'Probeprüfung WK · GVW auffrischen', sub: 'Kein neuer Stoff', mode: 'frei', blocks: [
      { von: '09:00', bis: '10:00', kind: 'pruefung', title: 'WK · 40 Fragen / 60 Min', note: 'Giống giờ thi thật 13:30 ngày 10.11.', actions: [exam('wiko', WK_ALL, 40, 60, 'Probeprüfung WK')] },
      { von: '10:15', bis: '11:00', kind: 'wiederholen', title: 'Fehlerbuch WK', note: '', actions: [fehler('wiko')] },
      { von: '14:00', bis: '15:30', kind: 'wiederholen', title: 'GVW für morgen', note: 'Đọc lại công thức Lager, làm 10 câu nhanh và Error deck.', actions: [th('bfk1', 'lf2-ls04'), quiz('bfk1', GVW_QUIZ, '10 Fragen GVW', 'quick'), fehler('bfk1', 'Error deck BfK-1')] },
      { von: '19:00', bis: '19:30', kind: 'termin', title: 'Tasche packen', note: 'Ausweis, Einladung, 2 Kugelschreiber, Taschenrechner, Rechtschreibwörterbuch (Deutsch). Ngủ sớm.', actions: [] },
    ] },
    { date: '2026-11-09', title: 'Prüfung GVW', sub: 'Gasterlebnis, Verkaufsförderung, Warenlagerung', mode: 'pruefung', blocks: [
      { von: '07:30', bis: '07:45', kind: 'wiederholen', title: 'Aufwärmen', note: 'Chỉ 10 câu nhanh, không đọc bài mới.', actions: [quiz('bfk1', GVW_QUIZ, '10 Fragen', 'quick')] },
      { von: '09:00', bis: '10:30', kind: 'termin', title: 'PRÜFUNG GVW', note: 'Đọc hết đề trước, làm câu chắc điểm trước.', actions: [] },
      { von: '15:00', bis: '16:30', kind: 'wiederholen', title: 'Für morgen: GK & WK kurz', note: '', actions: [quiz('gk', GK_THEMEN, '10 Fragen GK', 'quick'), quiz('wiko', WK_GRUND.concat(WK_FS1), '10 Fragen WK', 'quick')] },
      { von: '19:00', bis: '19:30', kind: 'wiederholen', title: 'Deutsch Redemittel', note: 'Đọc lại mẫu Einleitung/Schluss rồi ngủ sớm.', actions: [th('gk', 'redemittel')] },
    ] },
    { date: '2026-11-10', title: 'Prüfungen GK · Deutsch · WK', sub: '09:00 GK · 10:30 Deutsch · 13:30 WK', mode: 'pruefung', blocks: [
      { von: '09:00', bis: '10:00', kind: 'termin', title: 'PRÜFUNG GK', note: '', actions: [] },
      { von: '10:30', bis: '12:30', kind: 'termin', title: 'PRÜFUNG Deutsch', note: 'Teil 1 khoảng 50 phút, Teil 2 khoảng 60 phút, 10 phút soát lỗi.', actions: [] },
      { von: '12:30', bis: '13:15', kind: 'wiederholen', title: 'Mittagspause · WK Fristen', note: 'Ăn trưa, chỉ đọc lại bảng Fristen.', actions: [th('wiko', 'wk-verbraucherschutz'), th('wiko', 'wk-ueberschuldung')] },
      { von: '13:30', bis: '14:30', kind: 'termin', title: 'PRÜFUNG WK', note: '', actions: [] },
    ] },
  ];

  const KIND = {
    lernen: { label: 'Lernen', c: '#007AFF', bg: '#EAF3FF' },
    ueben: { label: 'Üben', c: '#248A3D', bg: '#E3F7E8' },
    wiederholen: { label: 'Wiederholen', c: '#8A6D00', bg: '#FFF9E6' },
    pruefung: { label: 'Probeprüfung', c: '#C4342B', bg: '#FFF0F0' },
    termin: { label: 'Termin', c: '#AF52DE', bg: '#F6EDFC' },
    pause: { label: 'Pause', c: '#8E8E93', bg: '#F2F2F7' },
  };
  const MODE = { frei: 'Ganzer Tag frei', abend: 'Schule · abends', pruefung: 'Prüfungstag' };
  const WD = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
  const EXAMS = [
    { at: '2026-11-09T09:00', label: 'GVW' },
    { at: '2026-11-10T09:00', label: 'GK' },
    { at: '2026-11-10T10:30', label: 'Deutsch' },
    { at: '2026-11-10T13:30', label: 'WK' },
  ];
  const SUBJ = [
    { f: 'bfk1', label: 'GVW · BfK-1' }, { f: 'wiko', label: 'WK' }, { f: 'gk', label: 'GK' },
    { f: 'deutsch', label: 'Deutsch' }, { f: 'bfk2', label: 'BfK-2' }, { f: 'bfk5', label: 'BfK-5' },
  ];

  const IC = {
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 4.5v15l12-7.5z"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5M9.5 2.5h5"/></svg>',
    redo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>',
    link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>',
    chev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>',
  };

  const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k) || 'null') || d; } catch (e) { return d; } };
  const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
  const pad = (n) => String(n).padStart(2, '0');
  const isoToday = () => { const d = new Date(); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); };
  const dayLabel = (iso) => { const d = new Date(iso + 'T12:00'); return WD[d.getDay()] + ' ' + pad(d.getDate()) + '.' + pad(d.getMonth() + 1) + '.'; };
  const blockKey = (day, i) => day.date + '#' + i;

  let openDate = null;
  let tick = null;

  function findFach(f) {
    try { if (window.ensureFachRegistry) window.ensureFachRegistry(); return window.FachForm && window.FachForm.findFach(f); } catch (e) { return null; }
  }
  function themeName(f, id) {
    const fach = findFach(f);
    try { const m = fach && window.FachForm.themeMeta(fach)[id]; if (m && m.name) return m.name; } catch (e) {}
    return id;
  }
  function fehlerN(f) {
    try {
      if (f === 'bfk1') return (window.BfK1Study && window.BfK1Study.getErrors().length) || 0;
      return window.fehlerCount ? window.fehlerCount(f) : 0;
    } catch (e) { return 0; }
  }
  function actionLabel(ac) {
    if (ac.label) return ac.label;
    if (ac.a === 'theme') return themeName(ac.f, ac.id);
    if (ac.a === 'timer') return ac.min + ' Min';
    return '';
  }
  function actionIcon(ac) {
    if (ac.a === 'theme') return IC.book;
    if (ac.a === 'fehler') return IC.redo;
    if (ac.a === 'timer') return IC.clock;
    if (ac.a === 'url') return IC.link;
    return IC.play;
  }

  function runAction(ac) {
    if (ac.a === 'theme') {
      window.go(ac.f === 'bfk1' ? '#/bfk/1/theme/' + ac.id : '#/fach/' + ac.f + '/theme/' + ac.id);
    } else if (ac.a === 'quiz') {
      if (ac.f === 'bfk1') {
        const exam = ac.mode === 'exam';
        window.bfk1QuizStartThemes(ac.ids || [], exam ? 'exam' : ac.mode, { exam, seconds: exam ? ac.min * 60 : 0 });
      } else {
        window.fachQuizStart(ac.f, ac.ids, ac.mode, { n: ac.n, min: ac.min, label: ac.label });
      }
    } else if (ac.a === 'fehler') {
      if (!fehlerN(ac.f)) { if (window.toast) window.toast('Fehlerbuch ist leer', 'info'); return; }
      if (ac.f === 'bfk1') window.bfk1QuizStartSpecial('errors');
      else window.fachQuizStart(ac.f, null, 'fehler');
    } else if (ac.a === 'timer') {
      save(TIMER_KEY, { end: Date.now() + ac.min * 60000, min: ac.min, label: ac.label || 'Timer' });
      render();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (ac.a === 'url') {
      location.href = ac.href;
    }
  }

  function defaultOpen() {
    const t = isoToday();
    if (DAYS.some((d) => d.date === t)) return t;
    return t < DAYS[0].date ? DAYS[0].date : DAYS[DAYS.length - 1].date;
  }

  function countdownHtml() {
    const now = Date.now();
    const next = EXAMS.find((e) => new Date(e.at).getTime() > now);
    if (!next) return '<div class="pp-count"><b>Geschafft</b><span>Alle Prüfungen sind vorbei.</span></div>';
    const ms = new Date(next.at).getTime() - now;
    const d = Math.floor(ms / 86400000), h = Math.floor((ms % 86400000) / 3600000);
    return '<div class="pp-count"><b>' + (d ? d + ' T ' : '') + h + ' Std</b><span>bis ' + next.label + ' · ' + dayLabel(next.at.slice(0, 10)) + ' ' + next.at.slice(11) + ' Uhr</span></div>';
  }

  function timerHtml() {
    const t = load(TIMER_KEY, null);
    if (!t) return '';
    const left = Math.max(0, t.end - Date.now());
    const s = Math.ceil(left / 1000);
    const txt = left ? Math.floor(s / 60) + ':' + pad(s % 60) : 'Zeit ist um';
    return '<div class="pp-timer' + (left ? '' : ' over') + '">' + IC.clock + '<div><b id="ppTimerTxt">' + txt + '</b><span>' + t.label + ' · ' + t.min + ' Min auf Papier</span></div>'
      + '<button type="button" class="btn ghost" data-pp="timer-stop">Beenden</button></div>';
  }

  function statsHtml(done) {
    const total = DAYS.reduce((n, d) => n + d.blocks.filter((b) => b.kind !== 'termin' && b.kind !== 'pause').length, 0);
    const n = DAYS.reduce((c, d) => c + d.blocks.filter((b, i) => b.kind !== 'termin' && b.kind !== 'pause' && done[blockKey(d, i)]).length, 0);
    const pct = total ? Math.round(n / total * 100) : 0;
    let h = '<div class="pp-card"><div class="pp-row"><span class="pp-label">Fortschritt</span><b>' + n + ' / ' + total + ' Phasen</b></div>';
    h += '<div class="progress" style="margin:8px 0 14px"><div style="width:' + pct + '%"></div></div>';
    h += '<span class="pp-label">Fehlerbuch</span><div class="pp-fehler">';
    SUBJ.forEach((s) => {
      const c = fehlerN(s.f);
      h += '<button type="button" class="pp-fb' + (c ? '' : ' empty') + '" data-pp="fehler" data-f="' + s.f + '"><b>' + c + '</b><span>' + s.label + '</span></button>';
    });
    h += '</div>';
    const log = (window.examLogLoad ? window.examLogLoad() : []).slice(-8).reverse();
    if (log.length) {
      h += '<span class="pp-label" style="margin-top:14px;display:block">Probeprüfungen</span><table class="pp-log"><tbody>';
      log.forEach((e) => {
        const d = new Date(e.date);
        h += '<tr><td>' + pad(d.getDate()) + '.' + pad(d.getMonth() + 1) + '.</td><td>' + (e.label || e.fachId) + '</td><td class="' + (e.pct >= 50 ? 'ok' : 'no') + '">' + e.pct + ' %</td><td>' + e.score + '/' + e.total + '</td></tr>';
      });
      h += '</tbody></table>';
    }
    return h + '</div>';
  }

  function dayHtml(day, done) {
    const today = isoToday();
    const st = day.date < today ? 'past' : day.date === today ? 'today' : 'future';
    const work = day.blocks.map((b, i) => i).filter((i) => !['termin', 'pause'].includes(day.blocks[i].kind));
    const n = work.filter((i) => done[blockKey(day, i)]).length;
    const open = openDate === day.date;
    let h = '<div class="pp-day ' + st + (open ? ' open' : '') + (day.mode === 'pruefung' ? ' exam' : '') + '">';
    h += '<button type="button" class="pp-dhead" data-pp="toggle" data-d="' + day.date + '">';
    h += '<div class="pp-date"><b>' + dayLabel(day.date) + '</b><span>' + (st === 'today' ? 'Heute' : MODE[day.mode]) + '</span></div>';
    h += '<div class="pp-dtitle"><b>' + day.title + '</b><span>' + day.sub + '</span></div>';
    h += '<div class="pp-dstat' + (work.length && n === work.length ? ' full' : '') + '">' + (work.length ? n + '/' + work.length : '') + '</div>';
    h += '<span class="pp-chev">' + IC.chev + '</span></button>';
    if (open) {
      h += '<div class="pp-blocks">';
      day.blocks.forEach((b, i) => {
        const k = KIND[b.kind] || KIND.lernen;
        const tickable = !['termin', 'pause'].includes(b.kind);
        const isDone = !!done[blockKey(day, i)];
        h += '<div class="pp-block' + (isDone ? ' done' : '') + '">';
        h += '<div class="pp-btop"><span class="pp-time">' + b.von + '–' + b.bis + '</span><span class="pp-kind" style="color:' + k.c + ';background:' + k.bg + '">' + k.label + '</span>';
        if (tickable) h += '<button type="button" class="pp-tick' + (isDone ? ' on' : '') + '" data-pp="tick" data-k="' + blockKey(day, i) + '" aria-label="Erledigt">' + IC.check + '</button>';
        h += '</div><b class="pp-btitle">' + b.title + '</b>';
        if (b.note) h += '<p class="pp-note">' + b.note + '</p>';
        if (b.actions.length) {
          h += '<div class="pp-actions">';
          b.actions.forEach((ac, j) => {
            let extra = '';
            if (ac.a === 'fehler') extra = ' <em>' + fehlerN(ac.f) + '</em>';
            if (ac.a === 'quiz' && ac.mode === 'exam') extra = ' <em>' + ac.min + ' Min</em>';
            if (ac.a === 'theme' && window.fachStatus && window.fachStatus(ac.f, ac.id) === 2) extra = ' <i class="pp-seen">' + IC.check + '</i>';
            h += '<button type="button" class="pp-act a-' + ac.a + (ac.mode === 'exam' ? ' a-exam' : '') + '" data-pp="act" data-d="' + day.date + '" data-b="' + i + '" data-a="' + j + '">' + actionIcon(ac) + '<span>' + actionLabel(ac) + extra + '</span></button>';
          });
          h += '</div>';
        }
        h += '</div>';
      });
      h += '</div>';
    }
    return h + '</div>';
  }

  function render() {
    const root = document.getElementById('planArea');
    if (!root) return;
    if (!openDate) openDate = defaultOpen();
    const done = load(DONE_KEY, {});
    let h = '<div class="pp-head"><div><span class="pp-label">Abschlussprüfung Winter 2026</span><h2>Prüfungsplan</h2>'
      + '<p>Mỗi ngày một môn, cố định giờ. Học trước, luyện quiz sau, tuần cuối thi thử có bấm giờ. Xong phần nào thì tích phần đó.</p></div>'
      + countdownHtml() + '</div>';
    h += timerHtml();
    h += '<div class="pp-days">' + DAYS.map((d) => dayHtml(d, done)).join('') + '</div>';
    h += statsHtml(done);
    h += '<p class="pp-foot">GVW 09.11. 09:00–10:30 · GK 10.11. 09:00–10:00 · Deutsch 10:30–12:30 · WK 13:30–14:30. Phần GVW dùng BfK-1 (LF2, Thema 1/8/9/14–16), BfK-2 và BfK-5.</p>';
    root.innerHTML = h;
    startTick();
  }

  function startTick() {
    if (tick) clearInterval(tick);
    tick = setInterval(() => {
      const view = document.getElementById('v-plan');
      if (!view || !view.classList.contains('active')) { clearInterval(tick); tick = null; return; }
      const t = load(TIMER_KEY, null);
      const el = document.getElementById('ppTimerTxt');
      if (!t || !el) return;
      const left = Math.max(0, t.end - Date.now());
      if (!left) {
        if (!t.rang) { t.rang = true; save(TIMER_KEY, t); try { navigator.vibrate && navigator.vibrate([300, 150, 300]); } catch (e) {} if (window.toast) window.toast('Zeit ist um: ' + t.label, 'info'); }
        render(); return;
      }
      const s = Math.ceil(left / 1000);
      el.textContent = Math.floor(s / 60) + ':' + pad(s % 60);
    }, 1000);
  }

  function onClick(e) {
    const btn = e.target.closest('[data-pp]');
    if (!btn) return;
    const kind = btn.getAttribute('data-pp');
    if (kind === 'toggle') {
      const d = btn.getAttribute('data-d');
      openDate = openDate === d ? '' : d;
      render();
    } else if (kind === 'tick') {
      const done = load(DONE_KEY, {});
      const k = btn.getAttribute('data-k');
      if (done[k]) delete done[k]; else done[k] = Date.now();
      save(DONE_KEY, done);
      render();
    } else if (kind === 'act') {
      const day = DAYS.find((d) => d.date === btn.getAttribute('data-d'));
      const ac = day && day.blocks[+btn.getAttribute('data-b')].actions[+btn.getAttribute('data-a')];
      if (ac) runAction(ac);
    } else if (kind === 'fehler') {
      runAction(fehler(btn.getAttribute('data-f')));
    } else if (kind === 'timer-stop') {
      localStorage.removeItem(TIMER_KEY);
      render();
    }
  }

  function init() {
    const root = document.getElementById('planArea');
    if (root && !root._ppBound) { root.addEventListener('click', onClick); root._ppBound = true; }
  }

  window.Pruefungsplan = { render: function () { init(); render(); }, DAYS };
})();
