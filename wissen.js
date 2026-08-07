/* ============================================================
 * wissen.js – Knowledge index (RAG) for the Lern-App
 * Gom toàn bộ kiến thức nội bộ từ faecher.js, bfk1-*, quiz globals,
 * GK_GLE_GROUPS, GK_UEBUNGEN, B1_VOCAB thành các chunk có thể tìm kiếm.
 * Chatbox AI (/ai) dùng window.Wissen.searchContext() để trả lời
 * ƯU TIÊN từ tài liệu trong app trước khi dùng kiến thức chung.
 * ============================================================ */
(function (w) {
  'use strict';

  var STOP = new Set([
    'cua','de','cho','la','the','va','tu','ra','khong','khong','trong','tai','ve','vao',
    'moi','lam','la','mot','nhung','cung','voi','gi','nao','sao','roi','nay','do',
    'der','die','das','und','ist','ein','eine','von','auf','fur','fur','mit','im','am','an',
    'den','dem','zu','nicht','were','was','wer','wie','bei','sind','auf','that','to','in',
    'vil','ila','nguoi','ban','ai','day','cho'
  ]);

  var chunks = [];   // { src, title, text, tokens:Set, full }
  var vocab = {};    // lowercased term -> vi
  var built = false;
  var buildAt = 0;

  function escHtml(s) {
    return String(s)
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");
  }

  function stripHtml(html, keepTerms) {
    var div = (w.document && document.createElement) ? document.createElement('div') : null;
    var s = html || '';
    if (div) {
      div.innerHTML = escHtml(s);
      var terms = div.querySelectorAll('.term');
      for (var i = 0; i < terms.length; i++) {
        var t = terms[i];
        var de = t.getAttribute && (t.getAttribute('data-de') || '');
        var vi = t.getAttribute && (t.getAttribute('data-vi') || '');
        var rep = de || (t.textContent || '');
        if (vi) rep += ' (' + vi + ')';
        var frag = document.createDocumentFragment();
        frag.appendChild(document.createTextNode(rep));
        t.parentNode.replaceChild(frag, t);
      }
      div.querySelectorAll('script,style,button,input,.flashcard,.quiz').forEach(function (e) {
        e.parentNode.removeChild(e);
      });
      var txt = (div.textContent || '').replace(/\s+/g, ' ').trim();
      if (txt) return txt;
    }
    // no DOM or DOM gave nothing → crude strip
    return String(s).replace(/<[^>]+>/g, ' ').replace(/[ \t\r\n]+/g, ' ').trim();
  }

  function norm(t) {
    var n = String(t || '').toLowerCase();
    return n.replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a')
      .replace(/[èéẹẻẽêềếệểễ]/g, 'e')
      .replace(/[ìíịỉĩ]/g, 'i')
      .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o')
      .replace(/[ùúụủũưừứựửữ]/g, 'u')
      .replace(/[ỳýỵỷỹ]/g, 'y')
      .replace(/đ/g, 'd');
  }

  function tokens(s) {
    s = String(s || '').toLowerCase();
    var raw = s.match(/[a-zà-ỹ0-9]+/gi) || [];
    var out = [];
    for (var i = 0; i < raw.length; i++) {
      var t = norm(raw[i]);
      if (t.length > 1 && !STOP.has(t)) out.push(t);
    }
    return out;
  }

  function addChunk(src, title, text) {
    var t = String(text || '');
    if (t.indexOf('<') > -1) t = stripHtml(t);
    t = t.replace(/\s+/g, ' ').trim();
    if (!t || t.length < 14) return;
    chunks.push({ src: src, title: title, text: t, toks: tokens(t) });
  }

  function addQuiz(arr, srcName) {
    if (!arr || !arr.length) return;
    for (var i = 0; i < arr.length; i++) {
      var q = arr[i];
      if (!q) continue;
      var line = q.q || '';
      if (q.ex) line += ' → ' + q.ex;
      if (q.answer && !q.ex) line += ' → ' + q.answer;
      if (q.answers && !q.ex) line += ' → ' + q.answers.join(' / ');
      if (line) addChunk(srcName + ' · Quiz', srcName + ' · Quiz', line);
    }
  }

  function collect() {
    if (built) return chunks.length > 0;
    chunks = [];
    vocab = {};

    try {
      // 1) Standard regimen: w.FachForm.FAECHER (index.html đã build)
      if (w.FachForm && w.FachForm.FAECHER && w.FachForm.FAECHER.length) {
        w.FachForm.FAECHER.forEach(function (f) {
          var fn = f.name || f.code || f.id;
          (f.groups || []).forEach(function (g) {
            (g.items || []).forEach(function (it) {
              if (!it) return;
              var title = (fn + ' · ' + (it.name || it.id));
              if (it.content) addChunk(title, title, it.content);
              if (it.desc) addChunk(title, title + ' — ' + it.desc);
              if (it.longdesc) addChunk(title, title + ' — ' + it.longdesc);
            });
          });
          addQuiz(f.quiz, fn);
        });
      }

      /* 2) BFK1 window data fallback (nếu chưa qua registry) */
      if (!chunks.length && w.BFK1_GROUPS) {
        w.BFK1_GROUPS.forEach(function (g) {
          (g.items || []).forEach(function (it) {
            if (!it) return;
            var title = 'BfK-1 + ' + it.name;
            if (it.content) addChunk(title, title, it.content);
            if (it.desc) addChunk(title, title + ' — ' + it.desc);
          });
        });
      }

      /* 3) Quiz globals chưa vào registry */
      addQuiz(w.BFK1_QUIZ, 'BfK-1');
      addQuiz(w.BFK2_QUIZ, 'BfK-2');
      addQuiz(w.DEUTSCH_QUIZ, 'Deutsch');
      if (w.GK_UEBUNGEN && w.GK_UEBUNGEN.length) {
        w.GK_UEBUNGEN.forEach(function (s) {
          var title = 'GK · ' + (s.title || 'Übungsaufgaben');
          if (s.hint) addChunk(title, title, s.hint);
          (s.tasks || []).forEach(function (ta) {
            var line = ta && ta.q || '';
            if (ta && ta.solution) line += ' → ' + ta.solution;
            if (line) addChunk(title + ' · Aufgabe', title, line);
          });
        });
      }

      /* 3) GK_GLE_GROUPS (content + keyPoints) */
      if (w.GK_GLE_GROUPS) {
        w.GK_GLE_GROUPS.forEach(function (g) {
          (g.items || []).forEach(function (it) {
            if (!it) return;
            var title = 'GK-GLE · ' + (it.name || it.id);
            if (it.content) addChunk(title, title, it.content);
            (it.keyPoints || []).forEach(function (kp) {
              addChunk(title, title, kp);
            });
          });
        });
      }

      /* 5) Từ vựng DE→VI */
      if (w.B1_VOCAB) {
        for (var k in w.B1_VOCAB) {
          try { vocab[norm(k)] = w.B1_VOCAB[k]; } catch (_) {}
        }
        var vcount = 0;
        for (k in vocab) {
          if (++vcount > 1600) break;
        }
      }
    } catch (e) {
      // ignore partial collection errors
    }

    built = true;
    return chunks.length > 0;
  }

  function rebuildTwice() {
    if (collect()) return true;
    setTimeout(function () {
      chunks = [];
      built = false;
      collect();
    }, 400);
    setTimeout(function () {
      if (!chunks.length) {
        chunks = [];
        built = false;
        collect();
      }
    }, 1400);
    return chunks.length > 0;
  }

  function search(query, top) {
    if (!collect()) rebuildTwice();
    if (!chunks.length) return [];
    var qs = tokens(query);
    if (!qs.length) return [];
    var scored = [];
    for (var i = 0; i < chunks.length; i++) {
      var ch = chunks[i];
      var s = 0;
      for (var j = 0; j < qs.length; j++) {
        var q = qs[j];
        if (ch.toks.indexOf(q) >= 0) s += 3;
        else if (ch.text.length > 24 && ch.text.toLowerCase().indexOf(q) > -1) s += 1;
      }
      if (s > 0) scored.push({ ch: ch, s: s, len: ch.text.length });
    }
    scored.sort(function (a, b) {
      if (b.s !== a.s) return b.s - a.s;
      // longer coverage but prefer shorter for relevance; equal -> shorter
      return a.len - b.len;
    });
    var out = [];
    var seen = {};
    for (var m = 0; m < scored.length && out.length < (top || 4); m++) {
      var item = scored[m];
      if (seen[item.ch.src + '|' + item.ch.title]) continue;
      seen[item.ch.src + '|' + item.ch.title] = true;
      out.push(item.ch);
    }
    return out;
  }

  function vocabLookup(query) {
    if (!vocab || !Object.keys(vocab).length) {
      if (!built) rebuildTwice();
      return null;
    }
    var q = norm(String(query || '').trim().toLowerCase());
    var hits = [];
    for (var k in vocab) {
      var n = norm(k);
      if (n === q) hits.push([k, vocab[k], 100]);
    }
    if (hits.length) {
      hits.sort(function (a, b) { return b[2] - a[2]; });
      var best = hits[0];
      return best[0] + ' = ' + best[1] + ' (từ điển DE→VI)';
    }
    // prefix match cho tra từ
    var q2 = q.slice(0, 3);
    if (q.length >= 3) {
      var cnt = 0;
      var parts = [];
      for (var k2 in vocab) {
        var n2 = norm(k2);
        if (n2.indexOf(q) === 0 && n2.length > q.length) {
          parts.push(k2 + ' = ' + vocab[k2]);
          if (++cnt >= 4) break;
        }
      }
      if (cnt) return 'Gợi ý từ vựng DE→VI:\n' + parts.join('\n');
    }
    return null;
  }

  function searchContext(query, top) {
    var parts = [];
    var v = vocabLookup(query);
    if (v) parts.push(v);
    var hits = search(query, top || 4);
    hits.forEach(function (ch) {
      var txt = ch.text.length > 1300 ? ch.text.slice(0, 1300) + '…' : ch.text;
      parts.push('[' + ch.title + ']\n' + txt);
    });
    return parts;
  }

  w.Wissen = {
    status: function () {
      return { ready: !!chunks.length, total: chunks.length, vocabKeys: Object.keys(vocab).length };
    },
    count: function () { collect(); return chunks.length; },
    rebuild: function () { chunks = []; built = false; collect(); return chunks.length; },
    search: search,
    searchContext: searchContext,
    vocabLookup: vocabLookup,
  };

  // Warm-up: build after data scripts likely loaded, plus retry.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { setTimeout(rebuildTwice, 250); });
  } else {
    setTimeout(rebuildTwice, 250);
  }
})(typeof window !== 'undefined' ? window : globalThis);