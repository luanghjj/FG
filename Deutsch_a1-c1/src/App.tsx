import { useState } from 'react';
import {
  Navbar,
  MainMode,
  LearnSubTab,
  ExamSubTab,
  TabType
} from './components/Navbar';
import { AuthGate } from './components/AuthGate';
import { getStoredPlayer } from './services/learnDB';
import { RoadmapView } from './components/RoadmapView';
import { A1CourseHub, CourseLevel } from './components/A1CourseHub';
import { ExamSimulator } from './components/ExamSimulator';
import { VocabularyHub } from './components/VocabularyHub';
import { WritingSamplesHub } from './components/WritingSamplesHub';
import { SpeakingHub } from './components/SpeakingHub';
import { GrammarHub } from './components/GrammarHub';
import { MaterialsDriveHub } from './components/MaterialsDriveHub';
import {
  BookMarked,
  BookOpen,
  FileText,
  GraduationCap,
  LayoutDashboard,
  PenTool,
  Mic,
  FolderDown,
  Sparkles,
  Award
} from 'lucide-react';

export default function App() {
  const [mainMode, setMainMode] = useState<MainMode>('learn');
  const [learnSubTab, setLearnSubTab] = useState<LearnSubTab>('course');
  const [examSubTab, setExamSubTab] = useState<ExamSubTab>('exams');
  const [courseLevel, setCourseLevel] = useState<CourseLevel>('A1');
  const [courseLessonId, setCourseLessonId] = useState<string | null>(null);
  const [player] = useState<string>(() => getStoredPlayer());

  const handleNavigate = (tab: TabType, level?: CourseLevel, lessonId?: string) => {
    if (level) setCourseLevel(level);
    if (lessonId !== undefined) setCourseLessonId(lessonId);

    if (tab === 'learn') {
      setMainMode('learn');
    } else if (tab === 'exam') {
      setMainMode('exam');
    } else if (tab === 'course') {
      setMainMode('learn');
      setLearnSubTab('course');
    } else if (tab === 'vocab') {
      setMainMode('learn');
      setLearnSubTab('vocab');
    } else if (tab === 'grammar') {
      setMainMode('learn');
      setLearnSubTab('grammar');
    } else if (tab === 'roadmap') {
      setMainMode('learn');
      setLearnSubTab('roadmap');
    } else if (tab === 'exams') {
      setMainMode('exam');
      setExamSubTab('exams');
    } else if (tab === 'writing') {
      setMainMode('exam');
      setExamSubTab('writing');
    } else if (tab === 'speaking') {
      setMainMode('exam');
      setExamSubTab('speaking');
    } else if (tab === 'materials') {
      setMainMode('exam');
      setExamSubTab('materials');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const learnSubItems: {
    id: LearnSubTab;
    label: string;
    shortLabel: string;
    icon: React.ReactNode;
    badge?: string;
  }[] = [
    {
      id: 'course',
      label: 'Khóa Học A1-B1',
      shortLabel: 'Khóa Học',
      icon: <BookMarked className="w-4 h-4" />,
      badge: '36 Bài'
    },
    {
      id: 'vocab',
      label: 'Từ Vựng & Flashcard',
      shortLabel: 'Từ Vựng',
      icon: <BookOpen className="w-4 h-4" />,
      badge: '6.000 từ'
    },
    {
      id: 'grammar',
      label: '86 Chủ Điểm Ngữ Pháp',
      shortLabel: 'Ngữ Pháp',
      icon: <FileText className="w-4 h-4" />,
      badge: 'A1-C1'
    },
    {
      id: 'roadmap',
      label: 'Lộ Trình CEFR',
      shortLabel: 'Lộ Trình',
      icon: <GraduationCap className="w-4 h-4" />,
      badge: 'A1-C1'
    }
  ];

  const examSubItems: {
    id: ExamSubTab;
    label: string;
    shortLabel: string;
    icon: React.ReactNode;
    badge?: string;
  }[] = [
    {
      id: 'exams',
      label: '54 Bộ Đề TELC / Goethe',
      shortLabel: '54 Đề Thi',
      icon: <LayoutDashboard className="w-4 h-4" />,
      badge: 'B1 - B2'
    },
    {
      id: 'writing',
      label: 'Viết Mẫu & AI Grader',
      shortLabel: 'Viết Mẫu',
      icon: <PenTool className="w-4 h-4" />,
      badge: 'AI Chấm'
    },
    {
      id: 'speaking',
      label: 'Luyện Nói AI Partner',
      shortLabel: 'Luyện Nói',
      icon: <Mic className="w-4 h-4" />,
      badge: 'Phản Xạ'
    },
    {
      id: 'materials',
      label: 'Kho Sách PDF & Drive',
      shortLabel: 'Tài Liệu',
      icon: <FolderDown className="w-4 h-4" />,
      badge: 'Download'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-ios-bg text-ios-ink selection:bg-ios-accent selection:text-white font-sans antialiased">
      {/* Top 2-Tab Navigation Bar */}
      <Navbar
        mainMode={mainMode}
        setMainMode={setMainMode}
        onNavigateHome={() => handleNavigate('learn')}
        player={player}
      />

      {/* Auth gate + player chip */}
      <AuthGate />

      {/* Secondary Sub-Navigation Pill Bar */}
      <div className="bg-white/80 backdrop-blur-md border-b border-ios-line sticky top-14 sm:top-16 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-2.5">
          <div className="flex items-center justify-between gap-2">
            {/* Header info badge */}
            <div className="hidden lg:flex items-center gap-2 text-xs font-bold shrink-0">
              {mainMode === 'learn' ? (
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-ios-accent-soft text-ios-accent">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Phân hệ Học Tiếng Đức</span>
                </span>
              ) : (
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900">
                  <Award className="w-3.5 h-3.5 text-amber-600" />
                  <span>Phân hệ Luyện Thi Chứng Chỉ</span>
                </span>
              )}
            </div>

            {/* Sub Tabs */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none w-full lg:w-auto justify-start lg:justify-end py-0.5">
              {mainMode === 'learn'
                ? learnSubItems.map((item) => {
                    const isActive = learnSubTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setLearnSubTab(item.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs sm:text-[13px] font-bold transition-all shrink-0 cursor-pointer ${
                          isActive
                            ? 'bg-ios-accent text-white shadow-xs'
                            : 'bg-ios-bg text-ios-secondary hover:text-ios-ink hover:bg-ios-line/60 border border-ios-line/60'
                        }`}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                        {item.badge && (
                          <span
                            className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold hidden sm:inline-flex ${
                              isActive
                                ? 'bg-white/20 text-white'
                                : 'bg-ios-line text-ios-muted'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })
                : examSubItems.map((item) => {
                    const isActive = examSubTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setExamSubTab(item.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs sm:text-[13px] font-bold transition-all shrink-0 cursor-pointer ${
                          isActive
                            ? 'bg-ios-accent text-white shadow-xs'
                            : 'bg-ios-bg text-ios-secondary hover:text-ios-ink hover:bg-ios-line/60 border border-ios-line/60'
                        }`}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                        {item.badge && (
                          <span
                            className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold hidden sm:inline-flex ${
                              isActive
                                ? 'bg-white/20 text-white'
                                : 'bg-ios-line text-ios-muted'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Learning Hub Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 pt-3 sm:pt-5">
        {/* Render for Learn Mode */}
        {mainMode === 'learn' && (
          <>
            {learnSubTab === 'course' && (
              <A1CourseHub
                key={`${courseLevel}-${courseLessonId || 'all'}`}
                onNavigate={(tab) => handleNavigate(tab)}
                initialLevel={courseLevel}
                initialLessonId={courseLessonId}
              />
            )}
            {learnSubTab === 'vocab' && <VocabularyHub />}
            {learnSubTab === 'grammar' && <GrammarHub />}
            {learnSubTab === 'roadmap' && <RoadmapView onNavigate={handleNavigate} />}
          </>
        )}

        {/* Render for Exam Mode */}
        {mainMode === 'exam' && (
          <>
            {examSubTab === 'exams' && <ExamSimulator />}
            {examSubTab === 'writing' && <WritingSamplesHub />}
            {examSubTab === 'speaking' && <SpeakingHub />}
            {examSubTab === 'materials' && <MaterialsDriveHub />}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-ios-line bg-white py-4 sm:py-6 text-center text-xs text-ios-muted mt-8">
        <div className="max-w-7xl mx-auto px-4 space-y-1.5">
          <div className="flex items-center justify-center gap-2 font-bold text-ios-ink text-xs">
            <span>Sprachziel Master Learning Hub</span>
            <span>•</span>
            <span>Cơ Sở Dữ Liệu Học & Ôn Thi Tiếng Đức</span>
          </div>
          <p className="hidden sm:block text-[11px]">
            Đầy đủ 36 bài khóa học A1-B1, 54 bộ đề TELC/Goethe B1-B2, 6.000 từ vựng chuyên ngành, 86 bài ngữ pháp, 25 bài viết mẫu & 24 sách PDF.
          </p>
        </div>
      </footer>
    </div>
  );
}
