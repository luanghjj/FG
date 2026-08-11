/* Test: race condition trong withChallengeRoom (P1)
 * Mô phỏng Supabase PostgREST in-memory + 2 client ghi đồng thời.
 * Chạy: node test/challenge-race.test.cjs
 */
'use strict';
const assert = require('assert');
const fs = require('fs');
const path = require('path');

/* ---------- localStorage stub ---------- */
const store = new Map();
globalThis.localStorage = {
  getItem: (k) => (store.has(k) ? store.get(k) : null),
  setItem: (k, v) => store.set(k, String(v)),
  removeItem: (k) => store.delete(k),
  clear: () => store.clear(),
  get length() { return store.size; },
  key: (i) => Array.from(store.keys())[i] || null,
};

/* ---------- PostgREST fake server ---------- */
const rows = new Map(); // key -> { key, value, updated_at }
let seq = 0;
function stamp() {
  seq += 1;
  return '2026-08-11T00:00:' + String(seq).padStart(2, '0') + '.000Z';
}

let readGate = null;
let openReads = null;
function gateReads() {
  readGate = new Promise((r) => { openReads = r; });
}
function releaseReads() {
  if (openReads) openReads();
  readGate = null;
  openReads = null;
}

/* blockSecondPost: chặn POST thứ 2 (B) để A kịp verify xong trước khi B ghi đè.
 * Tái hiện đúng race: A verify PASS (bản có answer A) → B overwrite sau đó. */
let blockSecondPost = false;
let postCount = 0;
let saveGate = null;
let openSave = null;
function gateSecondPost() {
  blockSecondPost = true;
  postCount = 0;
  saveGate = new Promise((r) => { openSave = r; });
}
function releaseSecondPost() {
  if (openSave) openSave();
  blockSecondPost = false;
  saveGate = null;
  openSave = null;
}

function qs(url) {
  const u = new URL(url);
  return { path: u.pathname, params: u.searchParams, raw: u.search };
}

globalThis.fetch = async (url, opts) => {
  const { path: p, params } = qs(url);
  const method = (opts && opts.method) || 'GET';
  const body = opts && opts.body ? JSON.parse(opts.body) : null;

  if (method === 'GET' && p === '/rest/v1/config' && readGate) await readGate;

  const select = params.get('select') || 'key,value,updated_at';
  function project(r) {
    const out = {};
    select.split(',').forEach((f) => {
      if (f in r) out[f] = structuredClone(r[f]);
    });
    return out;
  }

  let payload;
  if (method === 'GET' && p === '/rest/v1/config') {
    if (params.get('key') && params.get('key').startsWith('eq.')) {
      const k = decodeURIComponent(params.get('key').slice(3));
      payload = rows.has(k) ? [project(rows.get(k))] : [];
    } else if (params.get('key') && params.get('key').startsWith('like.')) {
      const like = decodeURIComponent(params.get('key').slice(5)).replace(/^%/, '');
      const patt = new RegExp('^' + like.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/%/g, '.*') + '$');
      const list = Array.from(rows.values())
        .filter((r) => patt.test(r.key))
        .map(project);
      payload = list;
    } else {
      payload = [];
    }
  } else if (method === 'POST' && p === '/rest/v1/config') {
    if (blockSecondPost) {
      postCount += 1;
      if (postCount === 2 && saveGate) await saveGate;
    }
    const r = rows.get(body.key);
    const row = { key: body.key, value: body.value, updated_at: r ? r.updated_at : stamp() };
    rows.set(body.key, row);
    payload = [project(row)];
  } else if (method === 'PATCH' && p === '/rest/v1/config') {
    const kRaw = params.get('key');
    const k = kRaw && kRaw.startsWith('eq.') ? decodeURIComponent(kRaw.slice(3)) : null;
    const row = k && rows.get(k);
    if (!row) {
      payload = [];
    } else {
      const ver = params.get('value->>v');
      let match = false;
      if (ver && ver.startsWith('eq.')) {
        match = Number(row.value && row.value.v) === Number(ver.slice(3));
      } else if (ver && ver.startsWith('is.')) {
        match = row.value == null || row.value.v == null;
      }
      if (!match) {
        payload = [];
      } else {
        const updated = { key: row.key, value: body.value, updated_at: stamp() };
        rows.set(row.key, updated);
        payload = [project(updated)];
      }
    }
  } else if (method === 'DELETE') {
    payload = [];
  } else {
    throw new Error('Unhandled request: ' + method + ' ' + url);
  }

  return {
    ok: true,
    status: 200,
    statusText: 'OK',
    text: async () => JSON.stringify(payload),
  };
};

/* ---------- load supabase.js (IIFE, attaches globalThis.LearnDB) ---------- */
const src = fs.readFileSync(path.join(__dirname, '..', 'supabase.js'), 'utf8');
eval(src);

const DB = globalThis.LearnDB;

async function tick(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

/* ---------- tests ---------- */
async function testAnswerRace() {
  store.clear(); rows.clear(); readGate = null; openReads = null; releaseSecondPost();
  const room = await DB.createChallengeRoom({ host: 'Host', settings: { mode: 'classic', subjects: ['bfk2'], count: 3 } });
  const code = room.code;
  rows.get('learn:challenge:room:' + code).value.status = 'live';

  gateReads();
  gateSecondPost();
  const pA = DB.submitChallengeAnswer(code, 'PlayerA', 0, 0, true, { ms: 500 });
  const pB = DB.submitChallengeAnswer(code, 'PlayerB', 0, 1, false, { ms: 400 });
  await tick(20);
  assert(readGate, 'both submits should be blocked on read');
  releaseReads();
  // A hoàn tất verify (bản của A có answer A) → lúc này B vẫn đang bị chặn ở POST
  await tick(20);
  releaseSecondPost(); // B ghi đè bản của A
  await Promise.all([pA, pB]);

  const final = rows.get('learn:challenge:room:' + code).value;
  const ans = (final.answers && final.answers['0']) || {};
  assert(final.answers && final.answers['0'], 'answers should exist');
  assert(ans.PlayerA && ans.PlayerA.choice === 0, 'PlayerA answer must survive concurrent PlayerB write');
  assert(ans.PlayerB && ans.PlayerB.choice === 1, 'PlayerB answer must be present');
  assert(final.scores.PlayerA.correct === 1, 'PlayerA score must survive (was clobbered)');
  assert(final.scores.PlayerB.correct === 0, 'PlayerB score must be present');
  console.log('  ok testAnswerRace — both answers + scores survived');
}

async function testJoinRace() {
  store.clear(); rows.clear(); readGate = null; openReads = null; releaseSecondPost();
  const room = await DB.createChallengeRoom({ host: 'Host', settings: {} });
  const code = room.code;

  gateReads();
  gateSecondPost();
  const pA = DB.joinChallengeRoom(code, 'JoinerA');
  const pB = DB.joinChallengeRoom(code, 'JoinerB');
  await tick(20);
  releaseReads();
  await tick(20);
  releaseSecondPost();
  await Promise.all([pA, pB]);

  const final = rows.get('learn:challenge:room:' + code).value;
  assert(final.players.JoinerA, 'JoinerA must be in room');
  assert(final.players.JoinerB, 'JoinerB must be in room');
  assert(Object.keys(final.players).length === 3, 'host + 2 joiners');
  console.log('  ok testJoinRace — both joiners present');
}

async function testAdvanceRace() {
  store.clear(); rows.clear(); readGate = null; openReads = null;
  const room = await DB.createChallengeRoom({ host: 'Host', settings: {} });
  const code = room.code;
  const r = rows.get('learn:challenge:room:' + code);
  r.value.status = 'live';
  r.value.question_ids = ['q1', 'q2', 'q3'];

  gateReads();
  const pA = DB.advanceChallengeQuestion(code, 'Host');
  const pB = DB.advanceChallengeQuestion(code, 'Host');
  await tick(20);
  releaseReads();
  await Promise.all([pA, pB]);

  const final = rows.get('learn:challenge:room:' + code).value;
  assert(final.q_index === 2, 'q_index should be 2, got ' + final.q_index);
  assert(final.status === 'live', 'status should stay live');
  console.log('  ok testAdvanceRace — double advance advanced twice (no lost update)');
}

async function testLegacyRoom() {
  store.clear(); rows.clear(); readGate = null; openReads = null; releaseSecondPost();
  const room = await DB.createChallengeRoom({ host: 'Host', settings: {} });
  const code = room.code;
  // mô phỏng room được tạo trước khi có version field v
  const r = rows.get('learn:challenge:room:' + code);
  delete r.value.v;
  r.value.status = 'live';

  const pA = DB.submitChallengeAnswer(code, 'PlayerA', 0, 0, true, { ms: 500 });
  const pB = DB.submitChallengeAnswer(code, 'PlayerB', 0, 1, false, { ms: 400 });
  await Promise.all([pA, pB]);

  const final = rows.get('learn:challenge:room:' + code).value;
  const ans = (final.answers && final.answers['0']) || {};
  assert(ans.PlayerA && ans.PlayerA.choice === 0, 'legacy room: PlayerA answer must survive');
  assert(ans.PlayerB && ans.PlayerB.choice === 1, 'legacy room: PlayerB answer must be present');
  assert(final.v >= 2, 'legacy room must be migrated to versioned writes, got v=' + final.v);
  console.log('  ok testLegacyRoom — legacy room migrated to CAS writes');
}

(async () => {
  console.log('challenge race tests');
  await testAnswerRace();
  await testJoinRace();
  await testAdvanceRace();
  await testLegacyRoom();
  console.log('ALL PASS');
  process.exit(0);
})().catch((e) => {
  console.error('FAIL:', e.message);
  console.error(e);
  process.exit(1);
});
