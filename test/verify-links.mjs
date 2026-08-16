#!/usr/bin/env node
/* AzubiHub static link checker — verify-links.mjs
 * Crawl mọi .html/.js/.webmanifest (trừ quellen/docs/.git/test/api/breakdown-plan/_bfk_1_notes)
 * và kiểm tra tồn tại file cho từng tham chiếu local (src/href/url()/PRECACHE/folder field).
 * Chấp nhận resolve theo (a) thư mục chứa file, (b) ROOT (refs page-relative nằm trong JS). */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const SKIP_DIRS = new Set(['.git', 'quellen', 'docs', 'node_modules', '_bfk_1_notes', 'breakdown-plan', 'test', 'api', 'wiko', '_ocr', 'dist']);
let errors = 0;

function findPageDir(file) {
  let d = path.dirname(file);
  while (d !== ROOT && d !== path.dirname(d)) {
    if (fs.existsSync(path.join(d, 'index.html'))) return d;
    d = path.dirname(d);
  }
  return null;
}

function walk(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.name.startsWith('.') || SKIP_DIRS.has(ent.name)) continue;
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, out);
    else if (/\.(html|js|webmanifest)$/.test(ent.name)) out.push(p);
  }
  return out;
}

function refsIn(file) {
  const txt = fs.readFileSync(file, 'utf8');
  const check = (r) => {
    const clean = r.split(/[?#]/)[0];
    if (!clean || clean.startsWith('#') || /^(https?:|data:|blob:|mailto:|tel:|\/\/|\/)/.test(clean)) return;
    if (/['"`+=${]/.test(clean)) return;                    // template/JS-concat gadget
    if (!/\.(html|js|png|jpg|jpeg|webmanifest|svg|css|xlsx|pdf|zip|md)$/.test(clean)) return;
    const a = path.resolve(path.dirname(file), clean);
    const b = path.resolve(ROOT, clean);
    if (!fs.existsSync(a) && !fs.existsSync(b)) {
      errors++;
      console.error('[MISSING] ' + path.relative(ROOT, file) + ' → ' + clean);
    }
  };
  if (file.endsWith('.html')) {
    for (const m of txt.matchAll(/(?:src|href)=["']([^"']+)["']/g)) check(m[1]);
    for (const m of txt.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/g)) check(m[1]);
    for (const m of txt.matchAll(/["'`]([^"'`\s]+?\.(?:html|js|png|jpg|jpeg|webmanifest|svg))["'`]/g)) check(m[1]);
  }
  if (file.endsWith('.js')) {
    const pageDir = findPageDir(file);
    const reported = new Set();
    const checkEither = (r) => {
      const clean = r.split(/[?#]/)[0];
      if (!clean || clean.startsWith('#') || /^(https?:|data:|blob:|mailto:|tel:|\/\/|\/)/.test(clean)) return;
      if (/['"`+=${]/.test(clean)) return;
      if (!/\.(html|js|png|jpg|jpeg|webmanifest|svg|css|xlsx|pdf|zip|md)$/.test(clean)) return;
      const a = path.resolve(path.dirname(file), clean);
      const b = path.resolve(ROOT, clean);
      const c = pageDir ? path.resolve(pageDir, clean) : a;
      if (!fs.existsSync(a) && !fs.existsSync(b) && !fs.existsSync(c)) {
        if (!reported.has(clean)) {
          reported.add(clean);
          errors++;
          console.error('[MISSING] ' + path.relative(ROOT, file) + ' → ' + clean);
        }
      }
    };
    for (const m of txt.matchAll(/["'`]([^"'`\s]+?\.(?:html|js|png|jpg|jpeg|webmanifest|svg|css))["'`]/g)) checkEither(m[1]);
    if (/faecher\.js|bfk1-data\.js$/.test(file)) {
      for (const m of txt.matchAll(/folder\s*:\s*["']([^"']+)["']/g)) checkEither(m[1] + '/');
    }
  }
  if (file.endsWith('sw.js')) {
    for (const m of txt.matchAll(/['"]\.\/([^'"]+)['"]/g)) check(m[1]);
  }
  if (file.endsWith('chatbox.js')) {
    if (/fetch\(\s*['"]api\/ai['"]/.test(txt)) {
      errors++;
      console.error('[VÁ-CHƯA-LÀM] chatbox.js vẫn dùng fetch("api/ai") tương đối');
    }
  }
}

for (const f of walk(ROOT)) refsIn(f);
console.log(errors === 0 ? 'PASS: mọi tham chiếu local đều tồn tại' : 'FAIL: ' + errors + ' lỗi');
process.exit(errors === 0 ? 0 : 1);
