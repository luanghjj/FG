// Sinh js/search-pages-data.js: full text của các trang HTML tĩnh (klassenarbeiten/*, zwischenpruefung) cho tìm kiếm.
// Chạy lại khi sửa các trang đó:  node tools/build-search-pages.mjs
import fs from 'fs'; import path from 'path';
const files=[...fs.readdirSync('klassenarbeiten').filter(f=>f.endsWith('.html')).map(f=>'klassenarbeiten/'+f),'zwischenpruefung.html'].filter(f=>fs.existsSync(f));
const dec=s=>s.replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#0?39;/g,"'").replace(/&#(\d+);/g,(_,n)=>String.fromCharCode(+n));
const pages=files.map(f=>{
  const h=fs.readFileSync(f,'utf8');
  const title=dec((h.match(/<title>([\s\S]*?)<\/title>/i)||[,path.basename(f)])[1]).trim();
  const text=dec(h.replace(/<head[\s\S]*?<\/head>/i,' ').replace(/<(script|style|svg)[\s\S]*?<\/\1>/gi,' ').replace(/<[^>]+>/g,' ')).replace(/\s+/g,' ').trim();
  return {title,route:f,text};
});
fs.writeFileSync('js/search-pages-data.js','/* AUTO-GENERATED bởi tools/build-search-pages.mjs — không sửa tay */\nwindow.SEARCH_PAGES='+JSON.stringify(pages)+';\n');
console.log(pages.length,'pages');
