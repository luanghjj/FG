/* Test wiring app lid/. Chạy: node test/lid-app.test.cjs */
'use strict';
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const R = (f) => fs.readFileSync(path.join(__dirname, '..', f), 'utf8');
const html = R('lid/index.html');
const order = ['data/lid-allg-p1.js','data/lid-allg-p2.js','data/lid-allg-p3.js','data/lid-allg-p4.js','data/lid-land-p1.js','data/lid-land-p2.js','data/lid-data.js','data/lid-quiz.js','data/lid-tipps.js','lid-exam.js','lid-app.js'];
let last = -1;
for (const s of order) {
  const i = html.indexOf(s);
  assert.ok(i !== -1, 'lid/index.html thiếu script ' + s);
  assert.ok(i > last, 'sai thứ tự script tại ' + s);
  last = i;
}
for (const id of ['lidLand','tabLernen','tabTipps','tabPruefung','panelLernen','panelTipps','panelPruefung','quizArea','examArea']) {
  assert.ok(html.includes('id="' + id + '"'), 'lid/index.html thiếu #' + id);
}
assert.ok(html.includes('../index.html?choose=1'), 'thiếu link về track gate');
const app = R('lid/lid-app.js');
for (const fn of ['bootLid','renderLernen','renderTipps','startLidPaper']) {
  assert.ok(app.includes('function ' + fn), 'lid-app.js thiếu ' + fn + '()');
}
assert.ok(app.includes('lid-hist-v1'), 'thiếu lưu lịch sử lid-hist-v1');
console.log('PASS lid-app (wiring shell + UI)');
