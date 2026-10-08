/* LiD · Quiz merge 460 (300 chung + 160 bang) — chunks + lid-data.js load TRƯỚC */
(function () {
  'use strict';
  var out = [];
  (window.__LID_ALLG || []).forEach(function (e) {
    out.push({ theme: e.theme, cat: e.cat, land: null, q: e.q, opts: e.opts.slice(), a: e.a, ex: e.ex + (e.tip ? " · " + e.tip : "") });
  });
  (window.__LID_LAND || []).forEach(function (e) {
    out.push({ theme: "lid-land-" + e.land, cat: (window.LID_LAND_NAMES || {})[e.land] || e.land, land: e.land, q: e.q, opts: e.opts.slice(), a: e.a, ex: e.ex + (e.tip ? " · " + e.tip : "") });
  });
  window.LID_QUIZ = out;
})();
