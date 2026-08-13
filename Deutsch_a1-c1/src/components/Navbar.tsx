import React, { useState } from 'react';
import { 
  BookOpen, 
  GraduationCap, 
  PenTool, 
  Mic, 
  FileText, 
  FolderDown, 
  LayoutDashboard,
  Sparkles,
  Bot
} from 'lucide-react';
import { getStoredGeminiKey } from '../services/geminiService';
import { GeminiApiKeyModal } from './GeminiApiKeyModal';

export type TabType = 'roadmap' | 'exams' | 'vocab' | 'writing' | 'speaking' | 'grammar' | 'materials';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const hasApiKey = Boolean(getStoredGeminiKey());

  const navItems: { id: TabType; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'roadmap', label: 'Lộ Trình A1-C1', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'exams', label: 'Luyện Đề TELC/Goethe', icon: <LayoutDashboard className="w-4 h-4" />, badge: '54 Đề' },
    { id: 'vocab', label: 'Từ Vựng & Flashcard', icon: <BookOpen className="w-4 h-4" />, badge: '6.000 từ' },
    { id: 'writing', label: 'Viết Mẫu & AI Grader', icon: <PenTool className="w-4 h-4" />, badge: 'Gemini AI' },
    { id: 'speaking', label: 'Luyện Nói & AI Partner', icon: <Mic className="w-4 h-4" /> },
    { id: 'grammar', label: '86 Ngữ Pháp', icon: <FileText className="w-4 h-4" /> },
    { id: 'materials', label: 'Kho Sách PDF & Drive', icon: <FolderDown className="w-4 h-4" />, badge: 'Free' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Logo */}
            <div 
              onClick={() => setActiveTab('roadmap')}
              className="flex items-center gap-3 cursor-pointer group shrink-0"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-rose-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
                <span className="text-xl font-black">🇩🇪</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display font-bold text-lg text-white tracking-tight">Sprachziel Master</span>
                  <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">Pro 100%</span>
                </div>
                <p className="text-[11px] text-slate-400 font-medium hidden sm:block">Hệ Thống Ôn Thi & Cơ Sở Dữ Liệu Toàn Diện A1 - C1</p>
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
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-all cursor-pointer whitespace-nowrap ${
                      isActive 
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/25' 
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        isActive ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-amber-400 border border-amber-500/20'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right Action: Gemini AI Key Setup Button */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setIsModalOpen(true)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl text-xs font-bold transition-all cursor-pointer border shadow-sm ${
                  hasApiKey
                    ? 'bg-gradient-to-r from-emerald-500/20 to-indigo-500/20 border-emerald-500/40 text-emerald-400 hover:border-emerald-400'
                    : 'bg-gradient-to-r from-amber-500/20 to-rose-500/20 border-amber-500/40 text-amber-400 hover:border-amber-400'
                }`}
                title="Cài đặt cấu hình Gemini AI API Key"
              >
                <Bot className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">
                  {hasApiKey ? 'Gemini AI: Đã Kết Nối' : 'Cài Đặt Gemini AI'}
                </span>
                <span className="sm:hidden">Gemini</span>
                <Sparkles className="w-3 h-3 text-amber-400" />
              </button>
            </div>
          </div>

          {/* Mobile / Tablet Horizontal Scroll Nav */}
          <div className="xl:hidden flex items-center gap-1.5 overflow-x-auto py-2.5 scrollbar-none border-t border-slate-800/60">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 cursor-pointer ${
                    isActive 
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-sm' 
                      : 'text-slate-300 hover:text-white bg-slate-800/60'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
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
