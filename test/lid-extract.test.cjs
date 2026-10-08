/* Test parser tách Aufgaben từ text pdftotext. Chạy: node test/lid-extract.test.cjs */
'use strict';
const assert = require('assert');
const { lidParseAufgaben } = require('../tools/lid-extract.mjs');
const sample = [
  'Aufgabe 1', '', 'In Deutschland dürfen Menschen offen etwas gegen die Regierung sagen, weil …',
  '        ▣     hier Religionsfreiheit gilt.',
  '        ▣     die Menschen Steuern zahlen.',
  '        ▣     die Menschen das Wahlrecht haben.',
  '        ▣     hier Meinungsfreiheit gilt.', '', '', 'Aufgabe 2', '',
  'In Deutschland können Eltern bis zum 14. Lebensjahr ihres Kindes entscheiden, ob es in der',
  'Schule am …',
  '        ▣     Geschichtsunterricht teilnimmt.',
  '        ▣     Religionsunterricht teilnimmt.',
  '        ▣     Politikunterricht teilnimmt.',
  '        ▣     Sprachunterricht teilnimmt.'
].join('\n');
const out = lidParseAufgaben(sample);
assert.strictEqual(out.length, 2);
assert.strictEqual(out[0].nr, 1);
assert.ok(out[0].q.indexOf('gegen die Regierung') !== -1);
assert.deepStrictEqual(out[0].opts, [
  'hier Religionsfreiheit gilt.',
  'die Menschen Steuern zahlen.',
  'die Menschen das Wahlrecht haben.',
  'hier Meinungsfreiheit gilt.'
]);
assert.strictEqual(out[1].nr, 2);
assert.ok(out[1].q.indexOf('bis zum 14. Lebensjahr') !== -1);
assert.strictEqual(out[1].opts[1], 'Religionsunterricht teilnimmt.');
console.log('PASS lid-extract');
