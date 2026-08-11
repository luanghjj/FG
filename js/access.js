/* ============================================================
 * access.js — 3-Tier Zugriffssystem für die AzubiHub
 * ------------------------------------------------------------
 *  free  = Tầng 1: tất cả Thema, nhưng chỉ phần kiến thức cơ bản
 *  paid  = Tầng 2: full nội dung, quiz, Zusammenfassung, Prüfungen
 *  super = Tầng 3: full + Admin-Dashboard + cấp/thu quyền
 *
 * Nguồn sự thật (Supabase, bảng `config`):
 *   learn:role:<nickname>     → { player, tier, granted_by, granted_at, note }
 *   learn:access:paid_pass    → { code:"..." }        (Freischaltcode cho tầng 2)
 *   learn:access:manifest     → { "feature": "tier" } (ghi đè bảng mặc định)
 *   learn:admin:pass_hash     → { hash:"<sha256>" }   (mật khẩu super admin)
 *
 * Không có row learn:role:<nick> → mặc định "free".
 * Lưu ý: đây là khoá mềm (kiểm ở client). Đủ cho lớp học,
 * không chống được người biết devtools. Xem README-ACCESS.md.
 * ============================================================ */
(function (global) {
  'use strict';

  var TIERS = { free: 0, paid: 1, super: 2 };
  var ROLE_PREFIX = 'learn:role:';
  var PAID_PASS_KEY = 'learn:access:paid_pass';
  var MANIFEST_KEY = 'learn:access:manifest';
  var ADMIN_HASH_KEY = 'learn:admin:pass_hash';
  var AUDIT_PREFIX = 'learn:audit:';

  // Session-Cache (sessionStorage → sống trong 1 tab, không lưu lâu dài)
  var SS_TIER = 'learn_tier';
  var SS_TIER_PLAYER = 'learn_tier_player';
  var SS_SUPER_OK = 'learn_super_ok';

  // Default: Freischaltcode cho tầng 2 khi super admin chưa đặt code riêng
  var DEFAULT_PAID_CODE = 'matcha';
  // Startpasswort für Super-Admin, nur als SHA-256-Hash.
  // Im Dashboard änderbar (schreibt learn:admin:pass_hash).
  var DEFAULT_ADMIN_HASH =
    'a8e216f596e5ba95eae778677b6f9e497ef5d50eff442408647f6c31e2edaca4';
  // Notfall-Vergleich, wenn crypto.subtle fehlt (http:// statt https://)
  var DEFAULT_ADMIN_FNV = 'c3bb9b75';

  /* ---------- Bảng quyền mặc định ----------
   * Giá trị = tầng tối thiểu để dùng được.
   * Super admin sửa được trong Dashboard (ghi vào learn:access:manifest).
   */
  var DEFAULT_MANIFEST = {
    // Nội dung học
    'theme:list': 'free', // xem danh sách Thema
    'theme:basic': 'free', // phần kiến thức cơ bản trong Thema
    'theme:full': 'paid', // phần nội dung sâu (ví dụ, bảng chi tiết, mẹo thi)
    'theme:pages': 'paid', // ảnh scan trang sách
    'theme:flashcards': 'free',
    // Ngân hàng câu hỏi Excel (QA trong các Lernfeld; độc lập với Extra)
    'questionbank:excel': 'paid',
    // Luyện tập
    'quiz:demo': 'free', // quiz giới hạn số câu
    'quiz:full': 'paid', // quiz đầy đủ
    'training': 'paid',
    'zusammenfassung': 'paid',
    'pruefungen': 'paid', // đề KA + Lösung
    'challenge': 'paid',
    // Quản trị
    'admin': 'super',
  };

  var FREE_QUIZ_LIMIT = 3; // free: tối đa 3 câu / lượt quiz

  var _manifest = null;
  var _paidCode = null;
  var _tier = null;
  var _player = null;

  /* ---------- helpers ---------- */
  function clean(s) {
    return String(s == null ? '' : s).trim().toLowerCase();
  }
  function roleKey(player) {
    return ROLE_PREFIX + clean(player);
  }
  function normTier(t) {
    t = clean(t);
    return TIERS.hasOwnProperty(t) ? t : 'free';
  }
  function ss(key, val) {
    try {
      if (val === undefined) return sessionStorage.getItem(key);
      if (val === null) sessionStorage.removeItem(key);
      else sessionStorage.setItem(key, val);
    } catch (_) {}
    return null;
  }
  function db() {
    return global.LearnDB || null;
  }

  async function sha256Hex(text) {
    try {
      var buf = new TextEncoder().encode(String(text || ''));
      var hash = await crypto.subtle.digest('SHA-256', buf);
      return Array.from(new Uint8Array(hash))
        .map(function (b) {
          return b.toString(16).padStart(2, '0');
        })
        .join('');
    } catch (_) {
      return null; // crypto.subtle chỉ có trên https/localhost
    }
  }

  /** Fallback-Hash (FNV-1a) für http:// wo crypto.subtle fehlt.
   *  Schwächer als SHA-256, aber besser als Klartext im Quellcode. */
  function fnv1a(text) {
    var s = String(text || '');
    var h = 0x811c9dc5;
    for (var i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = (h + (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24)) >>> 0;
    }
    return h.toString(16).padStart(8, '0');
  }

  /* ---------- Manifest ---------- */
  async function loadManifest() {
    if (_manifest) return _manifest;
    _manifest = Object.assign({}, DEFAULT_MANIFEST);
    var D = db();
    if (!D || !D.getConfig) return _manifest;
    try {
      var row = await D.getConfig(MANIFEST_KEY);
      if (row && row.value && typeof row.value === 'object') {
        Object.keys(row.value).forEach(function (k) {
          var v = normTier(row.value[k]);
          if (DEFAULT_MANIFEST.hasOwnProperty(k)) _manifest[k] = v;
        });
      }
    } catch (_) {}
    return _manifest;
  }
  function manifest() {
    return _manifest || DEFAULT_MANIFEST;
  }
  async function saveManifest(patch, by) {
    var D = db();
    if (!D || !D.upsertConfig) throw new Error('Keine Verbindung');
    var next = Object.assign({}, manifest());
    Object.keys(patch || {}).forEach(function (k) {
      if (DEFAULT_MANIFEST.hasOwnProperty(k)) next[k] = normTier(patch[k]);
    });
    await D.upsertConfig(MANIFEST_KEY, next);
    _manifest = next;
    audit('manifest.update', by, { changed: Object.keys(patch || {}) });
    return next;
  }

  /* ---------- Rolle lesen / setzen ---------- */
  async function getRole(player) {
    var D = db();
    if (!D || !D.getConfig || !clean(player)) return null;
    try {
      var row = await D.getConfig(roleKey(player));
      return row && row.value ? row.value : null;
    } catch (_) {
      return null;
    }
  }

  async function setRole(player, tier, by, note) {
    var D = db();
    if (!D || !D.upsertConfig) throw new Error('Keine Verbindung');
    var p = String(player || '').trim().slice(0, 32);
    if (!p) throw new Error('Nickname fehlt');
    var t = normTier(tier);
    var rec = {
      player: p,
      tier: t,
      granted_by: by || 'super',
      granted_at: new Date().toISOString(),
      note: note || '',
      app: 'on-thi',
    };
    await D.upsertConfig(roleKey(p), rec);
    audit('role.set', by, { player: p, tier: t, note: note || '' });
    // Nếu đang là chính mình → cập nhật ngay trong tab này
    if (_player && clean(_player) === clean(p)) applyTier(t, _player);
    return rec;
  }

  async function revokeRole(player, by) {
    return setRole(player, 'free', by, 'zurückgesetzt');
  }

  async function listRoles() {
    var D = db();
    if (!D || !D.listConfig) return [];
    try {
      var rows = await D.listConfig(ROLE_PREFIX + '%', 500);
      return (rows || [])
        .map(function (r) {
          return Object.assign({ _key: r.key, updated_at: r.updated_at }, r.value || {});
        })
        .filter(function (r) {
          return r.player;
        });
    } catch (_) {
      return [];
    }
  }

  /* ---------- Freischaltcode (tầng 2) ---------- */
  async function loadPaidCode() {
    if (_paidCode != null) return _paidCode;
    _paidCode = DEFAULT_PAID_CODE;
    var D = db();
    if (!D || !D.getConfig) return _paidCode;
    try {
      var row = await D.getConfig(PAID_PASS_KEY);
      var c = row && row.value && row.value.code;
      if (c) _paidCode = String(c);
    } catch (_) {}
    return _paidCode;
  }
  async function setPaidCode(code, by) {
    var D = db();
    if (!D || !D.upsertConfig) throw new Error('Keine Verbindung');
    var c = String(code || '').trim();
    if (c.length < 3) throw new Error('Code: mindestens 3 Zeichen');
    await D.upsertConfig(PAID_PASS_KEY, { code: c, updated_by: by || 'super', updated_at: new Date().toISOString() });
    _paidCode = c;
    audit('paidcode.set', by, {});
    return c;
  }
  async function getPaidCode() {
    return loadPaidCode();
  }

  /** Nhập code để tự nâng lên tầng 2 (paid). */
  async function redeemPaidCode(player, code) {
    var want = String(code || '').trim();
    if (!want) throw new Error('Bitte Code eingeben');
    var real = await loadPaidCode();
    if (clean(want) !== clean(real)) throw new Error('Code ist falsch');
    var p = player || (db() && db().getPlayer && db().getPlayer());
    if (!p) throw new Error('Bitte zuerst anmelden');
    // Không hạ cấp super admin
    var cur = await getRole(p);
    if (cur && normTier(cur.tier) === 'super') {
      applyTier('super', p);
      return 'super';
    }
    await setRole(p, 'paid', 'code:' + p, 'per Freischaltcode');
    applyTier('paid', p);
    return 'paid';
  }

  /* ---------- Super-Admin-Passwort ---------- */
  async function checkSuperPassword(pass) {
    var D = db();
    var stored = null;
    if (D && D.getConfig) {
      try {
        var row = await D.getConfig(ADMIN_HASH_KEY);
        stored = row && row.value && row.value.hash ? String(row.value.hash) : null;
      } catch (_) {}
    }
    var hash = await sha256Hex(pass);
    if (hash) return hash === (stored || DEFAULT_ADMIN_HASH);
    // crypto.subtle fehlt (kein https) → schwacher FNV-Vergleich als Notfall.
    // Nur gültig, solange kein eigener Hash gesetzt wurde.
    if (!stored) return fnv1a(String(pass || '')) === DEFAULT_ADMIN_FNV;
    return false;
  }
  async function setSuperPassword(newPass, by) {
    var D = db();
    if (!D || !D.upsertConfig) throw new Error('Keine Verbindung');
    var p = String(newPass || '');
    if (p.length < 4) throw new Error('Passwort: mindestens 4 Zeichen');
    var hash = await sha256Hex(p);
    if (!hash) throw new Error('Hashing nicht verfügbar (https nötig)');
    await D.upsertConfig(ADMIN_HASH_KEY, { hash: hash, updated_by: by || 'super', updated_at: new Date().toISOString() });
    audit('adminpass.set', by, {});
    return true;
  }
  function markSuperVerified(ok) {
    ss(SS_SUPER_OK, ok ? '1' : null);
  }
  function isSuperVerified() {
    return ss(SS_SUPER_OK) === '1';
  }

  /* ---------- Audit-Log ---------- */
  var _auditSeq = 0;
  function auditKey() {
    // Zähler anhängen: mehrere Einträge in derselben Millisekunde
    // würden sich sonst gegenseitig überschreiben.
    _auditSeq = (_auditSeq + 1) % 1000;
    return AUDIT_PREFIX + Date.now() + '-' + String(_auditSeq).padStart(3, '0');
  }
  function audit(action, by, data) {
    var D = db();
    if (!D || !D.upsertConfig) return;
    try {
      D.upsertConfig(auditKey(), {
        action: action,
        by: by || 'unknown',
        at: new Date().toISOString(),
        data: data || {},
        app: 'on-thi',
      }).catch(function () {});
    } catch (_) {}
  }
  async function listAudit(limit) {
    var D = db();
    if (!D || !D.listConfig) return [];
    try {
      var rows = await D.listConfig(AUDIT_PREFIX + '%', limit || 60);
      return (rows || []).map(function (r) {
        return Object.assign({ _key: r.key }, r.value || {});
      });
    } catch (_) {
      return [];
    }
  }

  /* ---------- Tier des aktuellen Nutzers ---------- */
  function applyTier(tier, player) {
    _tier = normTier(tier);
    _player = player || _player;
    ss(SS_TIER, _tier);
    ss(SS_TIER_PLAYER, clean(_player));
    try {
      if (global.document && document.body) {
        document.body.dataset.tier = _tier;
        document.body.classList.toggle('tier-free', _tier === 'free');
        document.body.classList.toggle('tier-paid', _tier === 'paid');
        document.body.classList.toggle('tier-super', _tier === 'super');
      }
      global.dispatchEvent(new CustomEvent('learn-tier', { detail: { tier: _tier, player: _player } }));
    } catch (_) {}
    return _tier;
  }

  /**
   * Tier laden. Super admin phải xác nhận mật khẩu (trừ khi đã xác nhận
   * trong tab này). needsSuperPass=true → gọi UI hỏi mật khẩu.
   */
  async function loadTier(player) {
    var p = String(player || '').trim();
    _player = p;
    await loadManifest();
    var rec = await getRole(p);
    var raw = rec ? normTier(rec.tier) : 'free';
    var needsSuperPass = false;
    if (raw === 'super' && !isSuperVerified()) {
      needsSuperPass = true;
      raw = 'free'; // chưa xác nhận thì chỉ được quyền free
    }
    applyTier(raw, p);
    return { tier: _tier, needsSuperPass: needsSuperPass, record: rec };
  }

  /** Sau khi nhập đúng mật khẩu super admin → mở full quyền. */
  async function elevateSuper(pass) {
    var ok = await checkSuperPassword(pass);
    if (!ok) throw new Error('Falsches Passwort');
    markSuperVerified(true);
    applyTier('super', _player);
    return 'super';
  }

  function tier() {
    if (_tier) return _tier;
    var cached = ss(SS_TIER);
    var who = ss(SS_TIER_PLAYER);
    var cur = db() && db().getPlayer ? clean(db().getPlayer()) : '';
    if (cached && who && cur && who === cur) {
      _tier = normTier(cached);
      return _tier;
    }
    return 'free';
  }
  function is(t) {
    return tier() === normTier(t);
  }
  function atLeast(t) {
    return TIERS[tier()] >= TIERS[normTier(t)];
  }
  function can(feature) {
    var need = manifest()[feature];
    if (!need) return true; // không khai báo → mở
    return atLeast(need);
  }
  function needFor(feature) {
    return manifest()[feature] || 'free';
  }
  function tierLabel(t) {
    t = normTier(t || tier());
    return t === 'super' ? 'Admin' : t === 'paid' ? 'Pro' : 'Basic';
  }
  function reset() {
    _tier = null;
    _player = null;
    ss(SS_TIER, null);
    ss(SS_TIER_PLAYER, null);
    markSuperVerified(false);
  }

  /* ---------- Inhalte filtern (Thema-Text) ----------
   * Quy tắc:
   *  1. Có marker <div class="pro"> → xoá đúng những khối đó (free).
   *     <div class="free"> → luôn giữ.
   *  2. Không có marker → tự cắt: giữ các khối đầu cho tới khi đủ
   *     ~MIN_CHARS ký tự, phần còn lại khoá.
   */
  var MIN_CHARS = 550;
  var MIN_BLOCKS = 2;

  function lockNotice(what) {
    return (
      '<div class="pro-lock" data-lock="' + (what || 'theme:full') + '">' +
      '<div class="pro-lock-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<rect x="4.5" y="10.5" width="15" height="9.5" rx="2.5"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"/></svg></div>' +
      '<div class="pro-lock-tx"><b>Vollständiger Inhalt · Pro</b>' +
      '<span>Beispiele, Detailtabellen und Prüfungstipps sind in der Pro-Stufe.<br>' +
      '<i>Nội dung đầy đủ nằm ở tầng Pro.</i></span></div>' +
      '<button type="button" class="btn pro-lock-btn" data-unlock="1">Freischalten</button>' +
      '</div>'
    );
  }

  function filterContent(html, opts) {
    if (atLeast(needFor('theme:full'))) return html;
    var host;
    try {
      host = document.createElement('div');
      host.innerHTML = String(html || '');
    } catch (_) {
      return html;
    }
    var kids = Array.prototype.slice.call(host.children);
    if (!kids.length) return html;

    var hasMarker = kids.some(function (el) {
      return el.classList && (el.classList.contains('pro') || el.querySelector('.pro'));
    });

    var removed = 0;
    if (hasMarker) {
      kids.forEach(function (el) {
        if (el.classList && el.classList.contains('pro')) {
          el.remove();
          removed++;
          return;
        }
        var inner = el.querySelectorAll ? el.querySelectorAll('.pro') : [];
        Array.prototype.forEach.call(inner, function (n) {
          n.remove();
          removed++;
        });
      });
    } else {
      var chars = 0;
      kids.forEach(function (el, i) {
        var keep = i < MIN_BLOCKS || chars < MIN_CHARS;
        if (keep) {
          chars += (el.textContent || '').trim().length;
          if (el.classList && el.classList.contains('free')) chars = Math.min(chars, MIN_CHARS - 1);
        } else {
          el.remove();
          removed++;
        }
      });
    }
    if (!removed) return host.innerHTML;
    return host.innerHTML + lockNotice((opts && opts.what) || 'theme:full');
  }

  /* ---------- Public API ---------- */
  global.Access = {
    TIERS: TIERS,
    FREE_QUIZ_LIMIT: FREE_QUIZ_LIMIT,
    DEFAULT_MANIFEST: DEFAULT_MANIFEST,
    // Zustand
    loadTier: loadTier,
    applyTier: applyTier,
    tier: tier,
    is: is,
    atLeast: atLeast,
    can: can,
    needFor: needFor,
    tierLabel: tierLabel,
    reset: reset,
    player: function () {
      return _player;
    },
    // Rollen
    getRole: getRole,
    setRole: setRole,
    revokeRole: revokeRole,
    listRoles: listRoles,
    // Freischaltcode
    getPaidCode: getPaidCode,
    setPaidCode: setPaidCode,
    redeemPaidCode: redeemPaidCode,
    // Super admin
    checkSuperPassword: checkSuperPassword,
    setSuperPassword: setSuperPassword,
    elevateSuper: elevateSuper,
    isSuperVerified: isSuperVerified,
    markSuperVerified: markSuperVerified,
    // Manifest
    loadManifest: loadManifest,
    manifest: manifest,
    saveManifest: saveManifest,
    // Audit
    listAudit: listAudit,
    // Inhalte
    filterContent: filterContent,
    lockNotice: lockNotice,
    sha256Hex: sha256Hex,
  };
})(window);
