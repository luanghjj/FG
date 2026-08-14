import React, { useState } from 'react';
import {
  BookMarked,
  BookOpen,
  GraduationCap,
  PenTool,
  Mic,
  FileText,
  FolderDown,
  LayoutDashboard,
  Sparkles,
  Bot,
  CheckCircle2
} from 'lucide-react';
import { getStoredGeminiKey } from '../services/geminiService';
import { GeminiApiKeyModal } from './GeminiApiKeyModal';

export type TabType = 'roadmap' | 'a1course' | 'exams' | 'vocab' | 'writing' | 'speaking' | 'grammar' | 'materials';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const hasApiKey = Boolean(getStoredGeminiKey());

  const navItems: { id: TabType; label: string; shortLabel: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'roadmap', label: 'Lộ Trình A1-C1', shortLabel: 'Lộ Trình', icon: <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> },
    { id: 'a1course', label: 'Khóa Học A1-B1', shortLabel: 'Khóa A1-B1', icon: <BookMarked className="w-3.5 h-3.5 sm:w-4 sm:h-4" />, badge: '36 Bài' },
    { id: 'exams', label: 'Luyện Đề TELC/Goethe', shortLabel: '54 Đề Thi', icon: <LayoutDashboard className="w-3.5 h-3.5 sm:w-4 sm:h-4" />, badge: '54 Đề' },
    { id: 'vocab', label: 'Từ Vựng & Flashcard', shortLabel: 'Từ Vựng', icon: <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />, badge: '6.000 từ' },
    { id: 'writing', label: 'Viết Mẫu & AI Grader', shortLabel: 'Viết Mẫu', icon: <PenTool className="w-3.5 h-3.5 sm:w-4 sm:h-4" />, badge: 'AI' },
    { id: 'speaking', label: 'Luyện Nói & AI Partner', shortLabel: 'Luyện Nói', icon: <Mic className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> },
    { id: 'grammar', label: '86 Ngữ Pháp', shortLabel: 'Ngữ Pháp', icon: <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> },
    { id: 'materials', label: 'Kho Sách PDF & Drive', shortLabel: 'Tài Liệu', icon: <FolderDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />, badge: 'Free' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-xl border-b border-ios-line shadow-xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-13 sm:h-16 gap-2">
            {/* Logo */}
            <div
              onClick={() => setActiveTab('roadmap')}
              className="flex items-center gap-2 sm:gap-3 cursor-pointer group shrink-0"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-ios-accent flex items-center justify-center shadow-xs group-hover:opacity-90 transition-opacity">
                <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-bold text-base sm:text-lg text-ios-ink tracking-tight">Sprachziel Master</span>
                  <span className="text-[9px] uppercase font-bold px-1.5 py-0.2 rounded bg-ios-accent-soft text-ios-accent hidden sm:inline-flex">Pro</span>
                </div>
                <p className="text-[10px] text-ios-muted font-medium hidden sm:block">Ôn Thi Tiếng Đức Toàn Diện A1 - C1</p>
              </div>
            </div>

            {/* Desktop Nav Items */}
            <nav className="hidden xl:flex items-center gap-1 overflow-x-auto py-1">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] transition-all cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'bg-ios-accent-soft text-ios-accent font-bold'
                        : 'text-ios-secondary hover:text-ios-ink hover:bg-ios-bg'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                        isActive ? 'bg-white text-ios-accent' : 'bg-ios-bg text-ios-muted'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right Action: Gemini AI Key Setup Button */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setIsModalOpen(true)}
                className={`flex items-center gap-1 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  hasApiKey
                    ? 'bg-ios-ok-soft border-ios-ok/30 text-ios-ok hover:border-ios-ok/60'
                    : 'bg-ios-accent-soft border-ios-accent/30 text-ios-accent hover:border-ios-accent/60'
                }`}
                title="Cài đặt cấu hình Gemini AI API Key"
              >
                {hasApiKey && <CheckCircle2 className="w-3.5 h-3.5" />}
                {!hasApiKey && <Bot className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">
                  {hasApiKey ? 'Gemini AI: Đã Kết Nối' : 'Cài Đặt Gemini AI'}
                </span>
                <span className="sm:hidden text-[11px]">AI</span>
                {!hasApiKey && <Sparkles className="w-3 h-3 hidden sm:inline" />}
              </button>
            </div>
          </div>

          {/* Mobile / Tablet Horizontal Scroll Nav */}
          <div className="xl:hidden flex items-center gap-1 overflow-x-auto py-1.5 scrollbar-none border-t border-ios-line">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-ios-accent text-white font-bold shadow-xs'
                      : 'text-ios-secondary hover:text-ios-ink bg-ios-bg'
                  }`}
                >
                  {item.icon}
                  <span>{item.shortLabel}</span>
                </button>
              );
            })}
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
