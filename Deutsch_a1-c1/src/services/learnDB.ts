/**
 * LearnDB – shared Supabase client bridge.
 * The AzubiHub main app exposes `window.LearnDB` via js/supabase.js. Both apps
 * are hosted on the same origin (deutsch-a1-c1/ is a subfolder), so we inject
 * the same script here and reuse the exact same player / progress backend.
 */

export interface LearnDBThemeEntry {
  fach: string;
  theme: string;
  name?: string;
  status?: 'seen' | 'learning' | 'done';
  done?: boolean;
  seen_at?: string;
  done_at?: string | null;
}

export interface LearnDBProfile {
  player: string;
  created_at?: string;
  last_seen?: string;
  visits?: number;
  quiz_attempts?: number;
  total_duration_sec?: number;
  daily_duration_sec?: number;
  themes?: Record<string, { fach: string; theme: string; name?: string; status: string; seen_at?: string; done_at?: string | null }>;
  quizzes?: Record<string, unknown>;
}

export interface LearnDBQuizItem {
  key: string;
  subject: string;
  quiz: string;
  correct: number;
  total: number;
  pct: number;
  at: string;
  attempts: number;
  history: unknown[];
}

export interface LearnDBPlayerHistory {
  profile: LearnDBProfile | null;
  quizzes: LearnDBQuizItem[];
}

export interface LearnDBHandle {
  url: string;
  getPlayer(): string;
  setPlayer(name: string): string;
  clearPlayer(): void;
  loginOrRegister(nick: string): Promise<{
    player: string;
    isNew: boolean;
    history: LearnDBPlayerHistory;
  }>;
  loadPlayerHistory(player?: string): Promise<LearnDBPlayerHistory>;
  getPlayerProfile(player?: string): Promise<LearnDBProfile | null>;
  markThemeProgress(
    player: string,
    opts: { fach?: string; theme: string; name?: string; status?: 'seen' | 'learning' | 'done'; done?: boolean }
  ): Promise<LearnDBThemeEntry | null>;
  saveQuizScore(opts: {
    subject: string;
    quiz: string;
    correct: number;
    total: number;
    player?: string;
    at?: string;
  }): Promise<unknown>;
  saveVocabDrillProgress(player: string, item: unknown): Promise<unknown>;
  saveGrammarMastery(player: string, item: unknown): Promise<unknown>;
  getVocabDrillData(player?: string): Promise<Record<string, unknown>>;
  getGrammarMasteryData(player?: string): Promise<Record<string, unknown>>;
  ping(): Promise<unknown>;
}

declare global {
  interface Window {
    LearnDB?: LearnDBHandle;
  }
}

let scriptPromise: Promise<LearnDBHandle> | null = null;

export const PLAYER_KEY = 'learn_player_name';
export const TRACK_KEY = 'azubi_track';

function getPlayerFromStorage(): string {
  try {
    return (localStorage.getItem(PLAYER_KEY) || '').trim();
  } catch {
    return '';
  }
}

export function getStoredPlayer(): string {
  return getPlayerFromStorage() || (window.LearnDB && window.LearnDB.getPlayer ? window.LearnDB.getPlayer() : '');
}

export function setStoredPlayer(name: string): void {
  const n = String(name || '').trim().slice(0, 32);
  try {
    if (n) localStorage.setItem(PLAYER_KEY, n);
    else localStorage.removeItem(PLAYER_KEY);
  } catch {
    // ignore
  }
  if (window.LearnDB && window.LearnDB.setPlayer) {
    try {
      window.LearnDB.setPlayer(n);
    } catch {
      // ignore
    }
  }
}

export function clearStoredPlayer(): void {
  try {
    localStorage.removeItem(PLAYER_KEY);
  } catch {
    // ignore
  }
  if (window.LearnDB && window.LearnDB.clearPlayer) {
    try {
      window.LearnDB.clearPlayer();
    } catch {
      // ignore
    }
  }
}

export function getStoredTrack(): string {
  try {
    return localStorage.getItem(TRACK_KEY) || '';
  } catch {
    return '';
  }
}

export function setStoredTrack(track: string): void {
  try {
    localStorage.setItem(TRACK_KEY, track);
  } catch {
    // ignore
  }
}

/**
 * Ensure window.LearnDB is available by injecting the shared js/supabase.js
 * script (same origin). Returns the LearnDB handle once loaded.
 */
export function getLearnDB(): Promise<LearnDBHandle> {
  if (window.LearnDB) return Promise.resolve(window.LearnDB);
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise<LearnDBHandle>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = new URL('../js/supabase.js', window.location.href).href;
    script.async = true;
    script.onload = () => {
      if (window.LearnDB) resolve(window.LearnDB);
      else reject(new Error('supabase.js loaded but LearnDB not found'));
    };
    script.onerror = () => {
      scriptPromise = null;
      reject(new Error('Không thể tải học liệu ngoại tuyến'));
    };
    document.head.appendChild(script);
  });
  return scriptPromise;
}