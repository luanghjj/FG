/* lid/lid-exam.js — Engine thi thử LiD (pure, không DOM). Đề 33 = 30 chung + 3 bang, 60 phút, đậu ≥17. */
(function (w) {
  'use strict';
  var LANDS = ['BW','BY','BE','BB','HB','HH','HE','MV','NI','NW','RP','SL','SN','ST','SH','TH'];
  var DEFAULT_LAND = 'BY';
  var STORAGE_KEY = 'lid-land';
  var PASS_MARK = 17, PAPER_N = 33, TIME_S = 3600;
  var mem = DEFAULT_LAND;
  function getLand() {
    var v = null;
    try { v = (typeof localStorage !== 'undefined') ? localStorage.getItem(STORAGE_KEY) : null; } catch (e) { v = null; }
    v = v || mem;
    return (LANDS.indexOf(v) !== -1) ? v : DEFAULT_LAND;
  }
  function setLand(code) {
    var v = (LANDS.indexOf(code) !== -1) ? code : DEFAULT_LAND;
    mem = v;
    try { if (typeof localStorage !== 'undefined') localStorage.setItem(STORAGE_KEY, v); } catch (e) {}
    return v;
  }
  function filterForLand(quiz, land) {
    var L = (LANDS.indexOf(land) !== -1) ? land : DEFAULT_LAND;
    return (quiz || []).filter(function (q) { return !q.land || q.land === L; });
  }
  function pickN(arr, n, rng) {
    var a = arr.slice(), out = [];
    var r = (typeof rng === 'function') ? rng : Math.random;
    while (out.length < n && a.length) out.push(a.splice(Math.floor(r() * a.length), 1)[0]);
    return out;
  }
  function buildLidPaper(quiz, land, rng) {
    var L = (LANDS.indexOf(land) !== -1) ? land : DEFAULT_LAND;
    var allg = (quiz || []).filter(function (q) { return !q.land; });
    var spec = (quiz || []).filter(function (q) { return q.land === L; });
    if (allg.length < 30 || spec.length < 3) return null;
    return pickN(allg, 30, rng).concat(pickN(spec, 3, rng));
  }
  function lidScore(paper, answers) {
    var correct = 0, wrong = [];
    (paper || []).forEach(function (q, i) {
      var a = answers ? answers[i] : null;
      if (Number.isInteger(a) && a === q.a) correct++;
      else wrong.push({ index: i, q: q.q, opts: q.opts, a: q.a, picked: a, ex: q.ex });
    });
    return { correct: correct, total: paper ? paper.length : 0, passed: correct >= PASS_MARK, wrong: wrong };
  }
  function lidFormatTime(sec) {
    var s = Math.max(0, Math.floor(sec));
    var m = Math.floor(s / 60);
    var r = s % 60;
    return (m < 10 ? '0' + m : '' + m) + ':' + (r < 10 ? '0' + r : '' + r);
  }
  w.LidExam = { LANDS: LANDS, DEFAULT_LAND: DEFAULT_LAND, STORAGE_KEY: STORAGE_KEY, PASS_MARK: PASS_MARK, PAPER_N: PAPER_N, TIME_S: TIME_S, getLand: getLand, setLand: setLand, filterForLand: filterForLand, buildLidPaper: buildLidPaper, lidScore: lidScore, lidFormatTime: lidFormatTime };
})(typeof window !== 'undefined' ? window : globalThis);
