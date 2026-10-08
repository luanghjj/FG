/* Đếm số liệu LiD. Chạy: node test/lid-counts.test.cjs */
'use strict';
const assert = require('assert');
const fs = require('fs');
const path = require('path');
globalThis.window = globalThis.window || {};
const read = (f) => fs.readFileSync(path.join(__dirname, '..', 'lid', 'data', f), 'utf8');
for (const f of ['lid-allg-p1.js', 'lid-allg-p2.js', 'lid-allg-p3.js', 'lid-allg-p4.js']) eval(read(f));
const allg = window.__LID_ALLG || [];
assert.strictEqual(allg.length, 300, 'allg phải đủ 300, hiện có ' + allg.length);
const nrs = allg.map((e) => e.nr).sort((a, b) => a - b);
for (let i = 0; i < 300; i++) assert.strictEqual(nrs[i], i + 1, 'thiếu Aufgabe ' + (i + 1));
for (const e of allg) {
  assert.strictEqual(e.opts.length, 4, 'Aufgabe ' + e.nr + ' phải có 4 opts');
  assert.ok(Number.isInteger(e.a) && e.a >= 0 && e.a <= 3, 'Aufgabe ' + e.nr + ' thiếu đáp án a');
  assert.ok(e.q && e.qVi && e.ex, 'Aufgabe ' + e.nr + ' thiếu q/qVi/ex');
}
const a1 = allg.find((e) => e.nr === 1);
assert.strictEqual(a1.a, 3);
assert.ok(a1.opts[3].indexOf('Meinungsfreiheit') !== -1);
console.log('PASS lid-counts teil1 (300 allgemeine)');
for (const f of ['lid-land-p1.js', 'lid-land-p2.js']) eval(read(f));
const land = window.__LID_LAND || [];
assert.strictEqual(land.length, 160, 'land phải đủ 160, hiện có ' + land.length);
const lands = ['BW','BY','BE','BB','HB','HH','HE','MV','NI','NW','RP','SL','SN','ST','SH','TH'];
for (const L of lands) {
  const n = land.filter((e) => e.land === L).length;
  assert.strictEqual(n, 10, 'bang ' + L + ' phải có 10 câu, hiện có ' + n);
}
for (const e of land) {
  assert.strictEqual(e.opts.length, 4, 'câu bang ' + e.land + ' nr ' + e.nr + ' phải có 4 opts');
  assert.ok(Number.isInteger(e.a) && e.a >= 0 && e.a <= 3, 'câu bang ' + e.land + ' nr ' + e.nr + ' thiếu a');
  assert.strictEqual(e.theme, 'lid-land', 'câu bang phải có theme lid-land');
}
console.log('PASS lid-counts teil2 (160 Länder)');
