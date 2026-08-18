import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  BookOpen,
  Trophy,
  Sparkles,
  Bot,
  CheckCircle2,
  ArrowLeft,
  Crown
} from 'lucide-react';
import { getStoredGeminiKey } from '../services/geminiService';
import { GeminiApiKeyModal } from './GeminiApiKeyModal';
import { setStoredTrack, clearStoredPlayer, getStoredPlayer, getLearnDB } from '../services/learnDB';

export type MainMode = 'learn' | 'exam';

export type LearnSubTab = 'course' | 'vocab' | 'grammar' | 'roadmap';
export type ExamSubTab = 'exams' | 'writing' | 'speaking' | 'materials';

export type TabType =
  | 'learn'
  | 'exam'
  | 'course'
  | 'vocab'
  | 'grammar'
  | 'roadmap'
  | 'exams'
  | 'writing'
  | 'speaking'
  | 'materials';

interface NavbarProps {
  mainMode: MainMode;
  setMainMode: (mode: MainMode) => void;
  activeSubTab?: string;
  onNavigateHome?: () => void;
  player?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  mainMode,
  setMainMode,
  onNavigateHome,
  player
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPro, setIsPro] = useState(false);
  const hasApiKey = Boolean(getStoredGeminiKey());

  // Detect Pro tier from parent AzubiHub access system & Supabase
  useEffect(() => {
    const applyPro = (t: string) => {
      if (t === 'paid' || t === 'super') {
        setIsPro(true);
        document.body.classList.add(`tier-${t}`);
        document.body.dataset.tier = t;
      }
    };

    const checkTier = () => {
      const body = document.body;
      if (body.classList.contains('tier-paid')) { setIsPro(true); return; }
      if (body.classList.contains('tier-super')) { setIsPro(true); return; }
      
      try {
        const ssTier = sessionStorage.getItem('learn_tier');
        if (ssTier) { applyPro(ssTier); return; }
        const lsTier = localStorage.getItem('access_tier');
        if (lsTier) { applyPro(lsTier); return; }
      } catch { /* ignore */ }
    };

    checkTier();

    // Query Supabase directly if player is logged in
    const p = player || getStoredPlayer();
    if (p) {
      getLearnDB().then(async (db) => {
        try {
          const row = await db.getConfig('learn:role:' + p.trim().toLowerCase());
          if (row && row.value && (row.value.tier === 'paid' || row.value.tier === 'super')) {
            applyPro(row.value.tier);
          }
        } catch { /* ignore */ }
      }).catch(() => {});
    }
  }, [player]);

  const goBackToHub = () => {
    setStoredTrack('fachkraft');
    window.location.href = new URL('../', window.location.href).href;
  };

  const doLogout = () => {
    clearStoredPlayer();
    setStoredTrack('fachkraft');
    window.location.reload();
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-xl border-b border-ios-line shadow-xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 gap-2 sm:gap-4">
            {/* Logo */}
            <div
              onClick={onNavigateHome || (() => setMainMode('learn'))}
              className="flex items-center gap-2 sm:gap-3 cursor-pointer group shrink-0"
            >
              <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shadow-xs group-hover:opacity-90 transition-opacity ${isPro ? 'bg-gradient-to-br from-amber-500 to-amber-700' : 'bg-ios-accent'}`}>
                <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-bold text-base sm:text-lg text-ios-ink tracking-tight">
                    AzubiHub
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md text-ios-muted hidden sm:inline-flex">
                    Deutsch
                  </span>
                  {isPro && (
                    <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded-full hidden sm:inline-flex items-center gap-0.5" style={{ background: '#E7D9BE', color: '#8A6D1E' }}>
                      <Crown className="w-2.5 h-2.5" />
                      Pro
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-ios-muted font-medium hidden sm:block">
                  Học & Ôn Thi Tiếng Đức Toàn Diện A1 - C1
                </p>
              </div>
            </div>

            {/* Central 2-Tab Segmented Switcher */}
            <nav className="flex items-center bg-ios-bg p-1 rounded-2xl border border-ios-line shadow-inner max-w-md w-full sm:w-auto justify-center">
              <button
                type="button"
                onClick={() => setMainMode('learn')}
                className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex-1 sm:flex-initial ${
                  mainMode === 'learn'
                    ? 'bg-white text-ios-accent shadow-xs'
                    : 'text-ios-secondary hover:text-ios-ink'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-ios-accent" />
                <span>Học (A1 - B1)</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold hidden md:inline-flex ${
                    mainMode === 'learn'
                      ? 'bg-ios-accent-soft text-ios-accent'
                      : 'bg-ios-line text-ios-muted'
                  }`}
                >
                  36 Bài
                </span>
              </button>

              <button
                type="button"
                onClick={() => setMainMode('exam')}
                className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex-1 sm:flex-initial ${
                  mainMode === 'exam'
                    ? 'bg-white text-ios-accent shadow-xs'
                    : 'text-ios-secondary hover:text-ios-ink'
                }`}
              >
                <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500" />
                <span>Ôn Thi (TELC - Goethe)</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold hidden md:inline-flex ${
                    mainMode === 'exam'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-ios-line text-ios-muted'
                  }`}
                >
                  54 Đề
                </span>
              </button>
            </nav>

            {/* Right Action: Player + Back to Hub + Gemini AI Key */}
            <div className="flex items-center gap-2 shrink-0">
              {player && (
                <>
                  <span className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-ios-accent-soft text-ios-accent text-xs font-bold max-w-[110px]">
                    <span className="truncate">👤 {player}</span>
                  </span>
                  <button
                    onClick={doLogout}
                    title="Đăng xuất"
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold text-ios-secondary hover:text-ios-bad hover:bg-ios-bad-soft transition-colors border border-ios-line/60"
                  >
                    <span>↺</span>
                    <span className="hidden xl:inline">Đăng xuất</span>
                  </button>
                  <button
                    onClick={goBackToHub}
                    title="Về AzubiHub"
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold text-ios-secondary hover:text-ios-accent hover:bg-ios-accent-soft transition-colors border border-ios-line/60"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span className="hidden lg:inline">Về AzubiHub</span>
                  </button>
                </>
              )}
              <button
                onClick={() => setIsModalOpen(true)}
                className={`flex items-center gap-1 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  hasApiKey
                    ? 'bg-ios-ok-soft border-ios-ok/30 text-ios-ok hover:border-ios-ok/60'
                    : 'bg-ios-accent-soft border-ios-accent/30 text-ios-accent hover:border-ios-accent/60'
                }`}
                title="Cài đặt cấu hình Gemini AI API Key"
              >
                {hasApiKey && <CheckCircle2 className="w-3.5 h-3.5" />}
                {!hasApiKey && <Bot className="w-3.5 h-3.5" />}
                <span className="hidden lg:inline">
                  {hasApiKey ? 'Gemini AI: Đã Kết Nối' : 'Cài Đặt Gemini AI'}
                </span>
                <span className="lg:hidden text-[11px]">AI</span>
                {!hasApiKey && <Sparkles className="w-3 h-3 hidden sm:inline" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Gemini AI Settings Modal */}
      <GeminiApiKeyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
