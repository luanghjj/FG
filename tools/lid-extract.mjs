/* tools/lid-extract.mjs — parse pdftotext -layout của BAMF Gesamtfragenkatalog.
 * Dùng: pdftotext -f 4 -l 170 -layout /tmp/lid-katalog.pdf - | node tools/lid-extract.mjs > /tmp/lid-teil1.json */
'use strict';
function lidParseAufgaben(text) {
  const lines = String(text).split('\n');
  const out = [];
  let cur = null;
  const flush = () => { if (cur && cur.opts.length === 4) out.push(cur); cur = null; };
  for (const raw of lines) {
    const mNr = raw.match(/^\s*Aufgabe\s+(\d+)\s*$/);
    if (mNr) { flush(); cur = { nr: Number(mNr[1]), qLines: [], opts: [] }; continue; }
    if (/^\s*Seite \d+ von \d+\s*$/.test(raw)) continue;
    if (!cur) continue;
    const mOpt = raw.match(/\u25a3\s+(.*\S)\s*$/);
    if (mOpt) { cur.opts.push(mOpt[1].trim()); continue; }
    if (/^\s*$/.test(raw)) continue;
    if (cur.opts.length === 0) cur.qLines.push(raw.trim());
    else cur.opts[cur.opts.length - 1] += ' ' + raw.trim();
  }
  flush();
  return out.map((e) => ({ nr: e.nr, q: e.qLines.join(' ').replace(/\s+/g, ' ').trim(), opts: e.opts }));
}
if (typeof module !== 'undefined' && module.exports) module.exports = { lidParseAufgaben };
export { lidParseAufgaben };
if (typeof window !== 'undefined') window.__lidParse = { lidParseAufgaben };
if (typeof process !== 'undefined' && process.argv[1] && process.argv[1].endsWith('lid-extract.mjs')) {
  let s = '';
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', (c) => { s += c; });
  process.stdin.on('end', () => { console.log(JSON.stringify(lidParseAufgaben(s), null, 1)); });
}
