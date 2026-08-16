import React, { useEffect, useState } from 'react';
import { GraduationCap, Loader2, LogIn } from 'lucide-react';
import {
  getLearnDB,
  getStoredPlayer,
  setStoredPlayer,
  setStoredTrack
} from '../services/learnDB';

export const AuthGate: React.FC = () => {
  const [nick, setNick] = useState('');
  const [player, setPlayer] = useState<string>(() => getStoredPlayer());
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [showGate, setShowGate] = useState(false);

  useEffect(() => {
    if (!player) setShowGate(true);
  }, [player]);

  const doLogin = async () => {
    const n = nick.trim();
    if (!n) {
      setError('Vui lòng nhập tên người dùng');
      return;
    }
    setBusy(true);
    setError('');
    try {
      const db = await getLearnDB();
      await db.loginOrRegister(n);
      setStoredPlayer(n);
      setPlayer(n);
      setShowGate(false);
      window.location.reload();
    } catch (e) {
      setError((e as Error).message || String(e));
    } finally {
      setBusy(false);
    }
  };

  const goBackToHub = () => {
    setStoredTrack('fachkraft');
    window.location.href = new URL('../', window.location.href).href;
  };

  if (!showGate && player) return null;

  return (
    <div className="fixed inset-0 z-[300] bg-ios-bg flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-md">
        <div className="bg-ios-surface border border-ios-line rounded-3xl shadow-xl p-6 sm:p-8">
          <div className="flex items-center justify-center w-14 h-14 mx-auto rounded-2xl bg-ios-accent shadow-md mb-4">
            <GraduationCap className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-center font-display font-bold text-xl text-ios-ink">
            Sprachziel Master
          </h1>
          <p className="text-center text-sm text-ios-muted mt-1 mb-6">
            Đăng nhập để đồng bộ tiến độ với AzubiHub
          </p>
          {player && !showGate && (
            <p className="text-center text-xs text-ios-ok mb-4">✓ Đang đăng nhập với {player}</p>
          )}
          <label className="block text-xs font-bold text-ios-secondary mb-1.5">
            Tên người dùng (Nickname)
          </label>
          <input
            value={nick}
            onChange={(e) => setNick(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && doLogin()}
            placeholder="VD: hocvien01"
            className="w-full px-4 py-3 rounded-xl border border-ios-line bg-ios-bg text-ios-ink text-sm focus:outline-none focus:border-ios-accent focus:ring-2 focus:ring-ios-accent/20"
          />
          {error && <p className="text-xs text-ios-bad mt-2">{error}</p>}
          <button
            onClick={doLogin}
            disabled={busy}
            className="w-full mt-4 flex items-center justify-center gap-2 py-3 rounded-xl bg-ios-accent text-white font-bold text-sm hover:bg-[#0062CC] transition-colors disabled:opacity-60"
          >
            {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogIn className="w-4 h-4" />}
            {busy ? 'Đang đăng nhập…' : 'Đăng nhập'}
          </button>
          <button
            onClick={goBackToHub}
            className="w-full mt-2 py-2.5 rounded-xl border border-ios-line text-ios-secondary font-semibold text-sm hover:bg-ios-bg transition-colors"
          >
            ← Về AzubiHub
          </button>
        </div>
      </div>
    </div>
  );
};