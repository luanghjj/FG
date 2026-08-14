import { useState } from 'react';
import { Navbar, TabType } from './components/Navbar';
import { RoadmapView } from './components/RoadmapView';
import { A1CourseHub, CourseLevel } from './components/A1CourseHub';
import { ExamSimulator } from './components/ExamSimulator';
import { VocabularyHub } from './components/VocabularyHub';
import { WritingSamplesHub } from './components/WritingSamplesHub';
import { SpeakingHub } from './components/SpeakingHub';
import { GrammarHub } from './components/GrammarHub';
import { MaterialsDriveHub } from './components/MaterialsDriveHub';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('roadmap');
  const [courseLevel, setCourseLevel] = useState<CourseLevel>('A2');
  const [courseLessonId, setCourseLessonId] = useState<string | null>(null);

  const handleNavigate = (tab: TabType, level?: CourseLevel, lessonId?: string) => {
    if (level) setCourseLevel(level);
    if (lessonId !== undefined) setCourseLessonId(lessonId);
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-ios-bg text-ios-ink selection:bg-ios-accent selection:text-white font-sans antialiased">
      {/* Top Sticky Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Learning Hub Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 pt-3 sm:pt-6">
        {activeTab === 'roadmap' && <RoadmapView onNavigate={handleNavigate} />}
        {activeTab === 'a1course' && (
          <A1CourseHub
            key={`${courseLevel}-${courseLessonId || 'all'}`}
            onNavigate={setActiveTab}
            initialLevel={courseLevel}
            initialLessonId={courseLessonId}
          />
        )}
        {activeTab === 'exams' && <ExamSimulator />}
        {activeTab === 'vocab' && <VocabularyHub />}
        {activeTab === 'writing' && <WritingSamplesHub />}
        {activeTab === 'speaking' && <SpeakingHub />}
        {activeTab === 'grammar' && <GrammarHub />}
        {activeTab === 'materials' && <MaterialsDriveHub />}
      </main>

      {/* Footer */}
      <footer className="border-t border-ios-line bg-white py-4 sm:py-6 text-center text-xs text-ios-muted">
        <div className="max-w-7xl mx-auto px-4 space-y-1">
          <div className="flex items-center justify-center gap-2 font-bold text-ios-ink text-xs">
            <span>Sprachziel Master Learning Hub</span>
            <span>•</span>
            <span>Cơ Sở Dữ Liệu Ôn Thi Tiếng Đức</span>
          </div>
          <p className="hidden sm:block text-[11px]">
            Đầy đủ 54 bộ đề TELC/Goethe B1-B2, 6.000 từ vựng chuyên ngành, 86 bài ngữ pháp, 25 bài viết mẫu & 24 sách PDF.
          </p>
        </div>
      </footer>
    </div>
  );
}
