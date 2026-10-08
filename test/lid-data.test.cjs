/* Test gom LiD. Chạy: node test/lid-data.test.cjs */
'use strict';
const assert = require('assert');
const fs = require('fs');
const path = require('path');
globalThis.window = globalThis.window || {};
const D = path.join(__dirname, '..', 'lid', 'data');
for (const f of ['lid-allg-p1.js','lid-allg-p2.js','lid-allg-p3.js','lid-allg-p4.js','lid-land-p1.js','lid-land-p2.js','lid-data.js','lid-quiz.js','lid-tipps.js']) eval(fs.readFileSync(path.join(D, f), 'utf8'));
assert.strictEqual(window.LID_QUIZ.length, 460);
const ids = new Set();
window.LID_GROUPS.forEach((g) => (g.items || []).forEach((it) => ids.add(g.id === 'lid-g5' ? it.id : it.id)));
for (const q of window.LID_QUIZ) assert.ok(ids.has(q.theme), 'quiz.theme lạ: ' + q.theme);
const byLand = window.LID_QUIZ.filter((q) => q.land === 'BY').length;
assert.strictEqual(byLand, 10);
assert.ok(window.LID_TIPPS.length >= 20, 'tipps tối thiểu 20, hiện có ' + window.LID_TIPPS.length);
console.log('PASS lid-data (460 quiz, theme khớp, BY=10, tipps đủ)');
