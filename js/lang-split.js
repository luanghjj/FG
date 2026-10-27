/* Lang-Split · Bài học hiện tiếng Đức trước, tiếng Việt ẩn sau nút.
 *
 * Nội dung LS đang viết song song DE + VI theo vài kiểu:
 *   "Deutscher Satz. → Câu tiếng Việt"     (mũi tên)
 *   "Situation / Tình huống"               (dấu / : = –)
 *   "Weizen (lúa mì)"                      (chú thích trong ngoặc)
 *   bảng có cột "Nghĩa Việt" / "Tiếng Việt"
 *   đoạn chỉ có tiếng Việt, hoặc <div class="vi"> (faecher.js)
 * langSplit(root) đánh dấu phần tiếng Việt:
 *   .vi-seg  → ẩn, có chip "VI" phía trước để mở riêng từng đoạn
 *   .vi-par  → chú thích ngoặc, ẩn (không chip)
 *   .vi-col  → cột tiếng Việt trong bảng, ẩn
 * Container cha mang class .lang-de (chỉ Đức) hoặc .lang-vi (hiện cả hai).
 */
(function (w) {
  // Chữ cái chỉ tiếng Việt mới có (loại à á è é û vì có trong từ mượn: Crème brûlée, à la carte)
  var VI_CH = /[ăâđêôơưạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹãĩõũìíòóùúýĂÂĐÊÔƠƯ]/;
  var BLOCK = { P:1, LI:1, TD:1, TH:1, H1:1, H2:1, H3:1, H4:1, H5:1, H6:1, DIV:1, BLOCKQUOTE:1,
    DT:1, DD:1, FIGCAPTION:1, CAPTION:1, SUMMARY:1, UL:1, OL:1, TABLE:1, THEAD:1, TBODY:1,
    TR:1, DL:1, SECTION:1, ARTICLE:1, FIGURE:1, DETAILS:1, PRE:1, HR:1, MAIN:1, HEADER:1, FOOTER:1, NAV:1, ASIDE:1, BR:0 };
  var NOTEXT = { STYLE:1, SCRIPT:1, TEMPLATE:1, NOSCRIPT:1 };
  var SKIP = '.vi-seg,.vi-par,.vi-col,.src-pages,button,script,style,svg,code,.formula';
  // Class tiếng Việt có sẵn trong dữ liệu (Lernskript, KA2…)
  var VI_CLASSES = '.vi-cell,.vi-sub,.vi-mini,.subtitle-vi,.chapter-title-vi';
  var DELIMS = ':=/–—|→;';

  // à á è é cũng có trong từ mượn Pháp (Café, Crème, à la carte) → chỉ tính khi viết thường và không phải từ mượn
  var VI_EXT = /[àáèé]/;
  var LOAN = /^(à|crème|café|cafés|entrée|entrées|purée|rosé|soufflé|frappé|gelée|chicorée|dragée|négociant|brûlée|varieté|séparée|matière|résumé|décor|fumé|flambé|glacé|sauté|pâté|consommé|élevage|méthode|cuvée|crémant|médaillon|médaillons|praliné|liqueur|blé)$/i;
  function isViWord(x) {
    var w = String(x).replace(/^[^A-Za-zÀ-ỹ]+|[^A-Za-zÀ-ỹ]+$/g, '');
    if (!w) return false;
    if (VI_CH.test(w)) return true;
    return VI_EXT.test(w) && !LOAN.test(w);
  }
  function viCount(s) {
    var n = 0;
    String(s || '').split(/\s+/).forEach(function (x) { if (isViWord(x)) n++; });
    return n;
  }
  function wordCount(s) { return String(s || '').split(/\s+/).filter(function (x) { return /[A-Za-zÀ-ỹ]/.test(x); }).length; }
  function isVi(s) {
    var v = viCount(s), n = wordCount(s);
    return v >= 2 || (v >= 1 && n > 0 && v / n >= 0.5);
  }
  // Bỏ nội dung trong ngoặc (để kiểm tra phần tiếng Đức có lẫn Việt không)
  function stripParens(s) { return String(s).replace(/\([^()]*\)/g, ' '); }

  function pill(seg) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'vi-pill';
    b.textContent = 'VI';
    b.setAttribute('aria-label', 'Tiếng Việt anzeigen');
    b.setAttribute('aria-expanded', 'false');
    b.onclick = function (e) {
      e.stopPropagation();
      var open = seg.classList.toggle('open');
      b.classList.toggle('on', open);
      b.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    return b;
  }
  function markSeg(el) {
    el.classList.add('vi-seg');
    el.parentNode.insertBefore(pill(el), el);
  }

  // Tìm (textNode, offset) cho vị trí ký tự idx trong textContent của root
  function locate(root, idx) {
    var tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    var pos = 0, n;
    while ((n = tw.nextNode())) {
      var len = n.nodeValue.length;
      if (idx <= pos + len) return { node: n, off: idx - pos };
      pos += len;
    }
    return null;
  }
  // Tách run tại idx: phần sau thành .vi-seg
  function splitAt(run, idx) {
    var p = locate(run, idx);
    if (!p) return false;
    var r = document.createRange();
    r.setStart(p.node, p.off);
    r.setEnd(run, run.childNodes.length);
    var frag = r.extractContents();
    var seg = document.createElement('span');
    seg.appendChild(frag);
    run.appendChild(seg);
    markSeg(seg);
    return true;
  }
  // Chú thích tiếng Việt trong ngoặc: "Weizen (lúa mì)" → ẩn "(lúa mì)"
  function markParens(root) {
    var tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        var p = n.parentNode;
        if (!p || (p.closest && p.closest(SKIP))) return NodeFilter.FILTER_REJECT;
        return /\([^()]*\)/.test(n.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
      }
    });
    var list = [], n;
    while ((n = tw.nextNode())) list.push(n);
    list.forEach(function (t) {
      var s = t.nodeValue, re = /\s?\([^()]*\)/g, m, last = 0, out = [], hit = false;
      while ((m = re.exec(s))) {
        if (!isVi(m[0])) continue;
        hit = true;
        out.push(document.createTextNode(s.slice(last, m.index)));
        var sp = document.createElement('span');
        sp.className = 'vi-par';
        sp.textContent = m[0];
        out.push(sp);
        last = m.index + m[0].length;
      }
      if (!hit) return;
      out.push(document.createTextNode(s.slice(last)));
      var f = document.createDocumentFragment();
      out.forEach(function (x) { f.appendChild(x); });
      t.parentNode.replaceChild(f, t);
    });
  }

  // Cột tiếng Việt trong bảng (header "Nghĩa Việt", "Tiếng Việt", "Việt", "VI"…)
  function markColumns(root) {
    root.querySelectorAll('table').forEach(function (tb) {
      var rows = tb.querySelectorAll('tr');
      if (!rows.length) return;
      var head = rows[0].children, cols = [];
      for (var i = 0; i < head.length; i++) {
        var t = (head[i].textContent || '').trim();
        if (/việt|^vi$|nghĩa|dịch/i.test(t)) cols.push(i);
      }
      if (!cols.length || cols.length === head.length) return;
      rows.forEach(function (tr) {
        cols.forEach(function (c) { if (tr.children[c]) tr.children[c].classList.add('vi-col'); });
      });
    });
  }

  // Lấy các "run" inline liền nhau trong 1 block (cắt tại block con và <br>)
  var BLOCK_SEL = Object.keys(BLOCK).filter(function (k) { return BLOCK[k]; }).join(',').toLowerCase();
  function hasBlock(el) { return !!(el.querySelector && el.querySelector(BLOCK_SEL)); }
  function isBlockish(el) { return !!BLOCK[el.tagName] || hasBlock(el); }
  function runsOf(block) {
    var runs = [], cur = [];
    function flush() { if (cur.length) { runs.push(cur); cur = []; } }
    Array.prototype.slice.call(block.childNodes).forEach(function (ch) {
      if (ch.nodeType === 1 && (BLOCK[ch.tagName] !== undefined || NOTEXT[ch.tagName] || hasBlock(ch))) flush();
      else cur.push(ch);
    });
    flush();
    return runs;
  }
  function wrapRun(nodes) {
    var sp = document.createElement('span');
    sp.className = 'ls-run';
    nodes[0].parentNode.insertBefore(sp, nodes[0]);
    nodes.forEach(function (n) { sp.appendChild(n); });
    return sp;
  }
  // Text của run, bỏ qua phần đã đánh dấu .vi-par
  function runText(run) {
    var s = '';
    (function walk(n) {
      if (n.nodeType === 3) { s += n.nodeValue; return; }
      if (n.nodeType !== 1) return;
      if (n.classList.contains('vi-par')) { s += new Array(n.textContent.length + 1).join(' '); return; }
      for (var c = n.firstChild; c; c = c.nextSibling) walk(c);
    })(run);
    return s;
  }

  function processRun(nodes) {
    var raw = nodes.map(function (n) { return n.textContent; }).join('');
    if (!raw.trim() || !viCount(raw)) return;
    if (nodes.length === 1 && nodes[0].nodeType === 1 && nodes[0].closest && nodes[0].closest(SKIP)) return;
    var run = wrapRun(nodes);
    var text = runText(run);
    if (!isVi(stripParens(text))) { markChunks(run); return; } // chủ yếu tiếng Đức → chỉ ẩn cụm Việt còn sót
    // 1) Mũi tên: "Deutsch → Việt"
    var a = text.indexOf('→');
    while (a !== -1) {
      var left = text.slice(0, a), right = text.slice(a + 1);
      var nextA = right.indexOf('→'), head = nextA === -1 ? right : right.slice(0, nextA);
      if (!isVi(stripParens(left)) && isVi(head) && wordCount(left) >= 1) {
        splitAt(run, a); return;
      }
      a = text.indexOf('→', a + 1);
    }
    // 2) Nhãn ngắn kiểu "Situation / Tình huống", "Gast: nhận và trả…"
    for (var i = 0; i < text.length; i++) {
      if (DELIMS.indexOf(text[i]) === -1) continue;
      var L = text.slice(0, i), R = text.slice(i + 1);
      if (!L.trim()) continue;
      if (isVi(stripParens(L))) break;           // tiếng Việt đã bắt đầu trước dấu → không tách
      // chỉ tách nếu phần sau chủ yếu là Việt
      if (isVi(R) && viCount(R) / Math.max(1, wordCount(R)) >= 0.35) {
        // "Situation / Tình huống": ẩn luôn dấu "/"; "Gast: …" giữ dấu ":"
        var cut = (text[i] === ':' || text[i] === '=') ? i + 1 : i;
        while (cut > 0 && /\s/.test(text[cut - 1]) && cut <= i) cut--;
        splitAt(run, cut); return;
      }
    }
    // 3) Cả đoạn chủ yếu là tiếng Việt (có thể lẫn thuật ngữ Đức)
    if (viCount(text) / Math.max(1, wordCount(text)) >= 0.45) {
      markSeg(run); return;
    }
    // 4) Câu trộn: chỉ ẩn từng cụm từ tiếng Việt, giữ thuật ngữ Đức
    markChunks(run);
  }

  // Từ tiếng Việt không dấu hay gặp (để nối cụm)
  var VI_PLAIN = /^(trong|theo|cho|khi|hay|con|nhanh|tin|in|sinh|xin|nhin|ra|vi|lam|tai|hai|ba|ban|anh|em|chi|nay|kia|thi|ma|nhu|sau|cao|xanh|canh|hoa|phong|nhiem|so|tinh|thanh|dinh|minh|binh|ninh|khach|banh|than|tan|van)$/i;
  function isViTok(t) {
    var w = t.replace(/^[^A-Za-zÀ-ỹ]+|[^A-Za-zÀ-ỹ]+$/g, '');
    return !!w && (isViWord(w) || VI_PLAIN.test(w));
  }
  function markChunks(run) {
    var tw = document.createTreeWalker(run, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        return (n.parentNode.closest && n.parentNode.closest('.vi-par,.vi-seg,code,.formula')) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
      }
    });
    var nodes = [], n;
    while ((n = tw.nextNode())) if (viCount(n.nodeValue)) nodes.push(n);
    nodes.forEach(function (t) {
      var toks = t.nodeValue.split(/(\s+)/), out = [], buf = [], inVi = false, pend = [];
      function flushVi() {
        if (!buf.length) return;
        var sp = document.createElement('span'); sp.className = 'vi-par'; sp.textContent = buf.join('');
        out.push(sp); buf = [];
      }
      for (var i = 0; i < toks.length; i++) {
        var tk = toks[i];
        if (/^\s*$/.test(tk)) { (inVi ? pend : out).push(inVi ? tk : document.createTextNode(tk)); continue; }
        if (isViTok(tk)) {
          if (inVi) { buf = buf.concat(pend); pend = []; } else { inVi = true; buf.push(' '); if (out.length && out[out.length - 1].nodeType === 3 && /\s$/.test(out[out.length - 1].nodeValue)) out[out.length - 1].nodeValue = out[out.length - 1].nodeValue.replace(/\s+$/, ''); }
          buf.push(tk);
        } else if (inVi && /^[\d.,:;%\/()\-–+×=·]+$/.test(tk)) {
          pend.push(tk);             // số/dấu nằm giữa hai từ Việt → có thể thuộc cụm
        } else {
          if (inVi) { flushVi(); inVi = false; pend.forEach(function (x) { out.push(document.createTextNode(x)); }); pend = []; }
          out.push(document.createTextNode(tk));
        }
      }
      if (inVi) { flushVi(); pend.forEach(function (x) { out.push(document.createTextNode(x)); }); }
      var f = document.createDocumentFragment();
      out.forEach(function (x) { f.appendChild(x); });
      t.parentNode.replaceChild(f, t);
    });
  }

  function processBlocks(root) {
    var blocks = [root];
    root.querySelectorAll('*').forEach(function (el) {
      if (!NOTEXT[el.tagName] && isBlockish(el) && !(el.closest && el.closest(SKIP))) blocks.push(el);
    });
    blocks.forEach(function (b) {
      if (b.classList && b.classList.contains('vi-col')) return;
      runsOf(b).forEach(processRun);
    });
  }

  function langSplit(root) {
    if (!root || root.__langSplit) return;
    root.__langSplit = true;
    // Khối .vi có sẵn (faecher.js) → ẩn nguyên khối
    root.querySelectorAll('div.vi').forEach(function (d) { if (viCount(d.textContent)) markSeg(d); });
    root.querySelectorAll(VI_CLASSES).forEach(function (d) { if (!d.closest('.vi-seg')) d.classList.add('vi-par'); });
    markColumns(root);
    markParens(root);
    processBlocks(root);
    // Gỡ chip trùng nếu .vi-seg nằm trong .vi-seg khác
    root.querySelectorAll('.vi-seg .vi-pill').forEach(function (p) {
      if (p.parentNode && p.parentNode.closest('.vi-seg')) p.remove();
    });
  }

  function apply(host, on) {
    host.classList.toggle('lang-vi', on);
    host.classList.toggle('lang-de', !on);
    var b = host.querySelector('.lang-toggle');
    if (b) {
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      b.querySelector('.lt-label').textContent = on ? 'Tiếng Việt ausblenden' : 'Tiếng Việt';
    }
    var h = host.querySelector('.lang-hint');
    if (h) h.innerHTML = on ? 'Deutsch + Tiếng Việt' : 'Nur Deutsch · tippe <b>VI</b> für einzelne Abschnitte';
  }
  var ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5h8"/><path d="M8 3v2"/><path d="M5 11c2-1.5 4-4 5-6"/><path d="M6 8c1 2 3 3.5 5 4"/><path d="M13 21l4-9 4 9"/><path d="M14.5 18h5"/></svg>';

  /* Gắn vào panel bài học: tách DE/VI + thanh nút bật tiếng Việt. */
  function mount(panel) {
    if (!panel) return;
    langSplit(panel);
    var hasVi = panel.querySelector('.vi-seg,.vi-par,.vi-col,.qa-vi,.qa-avi');
    if (!hasVi) return;
    var bar = document.createElement('div');
    bar.className = 'lang-bar';
    bar.innerHTML = '<button type="button" class="lang-toggle" aria-pressed="false">' + ICON
      + '<span class="lt-label">Tiếng Việt</span></button>'
      + '<span class="lang-hint">Nur Deutsch · tippe <b>VI</b> für einzelne Abschnitte</span>';
    panel.insertBefore(bar, panel.firstChild);
    bar.querySelector('.lang-toggle').onclick = function () {
      apply(panel, !panel.classList.contains('lang-vi'));
    };
    apply(panel, false); // luôn bắt đầu bằng tiếng Đức
  }

  w.LangSplit = { split: langSplit, mount: mount, isVi: isVi };
})(window);
