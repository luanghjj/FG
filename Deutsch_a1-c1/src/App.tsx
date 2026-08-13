import { useState } from 'react';
import { Navbar, TabType } from './components/Navbar';
import { RoadmapView } from './components/RoadmapView';
import { ExamSimulator } from './components/ExamSimulator';
import { VocabularyHub } from './components/VocabularyHub';
import { WritingSamplesHub } from './components/WritingSamplesHub';
import { SpeakingHub } from './components/SpeakingHub';
import { GrammarHub } from './components/GrammarHub';
import { MaterialsDriveHub } from './components/MaterialsDriveHub';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('roadmap');

  return (
    <div className="min-h-screen flex flex-col bg-[#0f172a] text-slate-100 selection:bg-amber-500 selection:text-slate-950 font-sans antialiased">
      {/* Top Sticky Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Learning Hub Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {activeTab === 'roadmap' && <RoadmapView onNavigate={setActiveTab} />}
        {activeTab === 'exams' && <ExamSimulator />}
        {activeTab === 'vocab' && <VocabularyHub />}
        {activeTab === 'writing' && <WritingSamplesHub />}
        {activeTab === 'speaking' && <SpeakingHub />}
        {activeTab === 'grammar' && <GrammarHub />}
        {activeTab === 'materials' && <MaterialsDriveHub />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <div className="flex items-center justify-center gap-2 font-bold text-slate-400">
            <span>🇩🇪 Sprachziel Master Learning Hub</span>
            <span>•</span>
            <span>Cơ Sở Dữ Liệu Ôn Thi Tiếng Đức 100% Offline</span>
          </div>
          <p>
            Đầy đủ 54 bộ đề TELC/Goethe B1-B2, 6.000 từ vựng chuyên ngành, 86 bài ngữ pháp, 25 bài viết mẫu & 24 sách PDF.
          </p>
        </div>
      </footer>
    </div>
  );
}
