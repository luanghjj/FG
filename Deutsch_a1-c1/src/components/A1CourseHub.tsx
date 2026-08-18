import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Mic,
  RefreshCw,
  RotateCcw,
  Sparkles,
  Square,
  Target,
  Volume2,
  Clock,
  PlayCircle
} from 'lucide-react';
import rawA1Course from '../data/a1_course.json';
import rawA2Course from '../data/a2_course.json';
import rawB1Course from '../data/b1_course.json';
import { evaluateSpeakingWithGemini, explainAnswerWithGemini, SpeakingFeedbackResult, AnswerExplanationResult } from '../services/geminiService';
import { getLearnDB, getStoredPlayer } from '../services/learnDB';
import { TabType } from './Navbar';

export type CourseLevel = 'A1' | 'A2' | 'B1';
type LessonSection = 'vocab' | 'grammar' | 'dialogue' | 'speaking' | 'quiz';

interface VocabItem {
  de: string;
  vi: string;
  exampleDe: string;
  exampleVi: string;
}

interface GrammarExample {
  de: string;
  vi: string;
}

interface GrammarRule {
  topic: string;
  formula: string;
  explanation: string;
  examples: GrammarExample[];
}

interface Dialogue {
  title: string;
  de: string;
  vi: string;
}

interface SpeakingPrompt {
  task: string;
  taskVi: string;
  prompt: string;
  sample: string;
}

interface QuizOption {
  de: string;
  correct: boolean;
}

interface QuizQuestion {
  q: string;
  qVi: string;
  options: QuizOption[];
  explain: string;
}

interface Lesson {
  id: string;
  lesson: number;
  day: number;
  title: string;
  titleVi: string;
  duration: string;
  theme: string;
  goals: string[];
  vocab: VocabItem[];
  grammar: GrammarRule;
  dialogue: Dialogue;
  speaking: SpeakingPrompt;
  quiz: QuizQuestion[];
}

interface CourseData {
  meta: { title: string; subtitle: string; totalLessons: number };
  lessons: Lesson[];
}

interface ProgressRecord {
  completed: string[];
  quizScores: Record<string, number>;
  lastLessonId?: string;
}

const PASS_PERCENT = 60;

const getProgressKey = (level: CourseLevel) => `${level.toLowerCase()}_course_progress`;

const emptyProgress = (): ProgressRecord => ({ completed: [], quizScores: {} });

const loadProgress = (level: CourseLevel): ProgressRecord => {
  try {
    const raw = localStorage.getItem(getProgressKey(level));
    if (!raw) return emptyProgress();
    const parsed = JSON.parse(raw);
    return {
      completed: Array.isArray(parsed.completed) ? parsed.completed : [],
      quizScores: typeof parsed.quizScores === 'object' && parsed.quizScores ? parsed.quizScores : {},
      lastLessonId: parsed.lastLessonId
    };
  } catch {
    return emptyProgress();
  }
};

const saveProgress = (level: CourseLevel, progress: ProgressRecord) => {
  localStorage.setItem(getProgressKey(level), JSON.stringify(progress));
};

export interface A1CourseHubProps {
  onNavigate: (tab: TabType) => void;
  initialLevel?: CourseLevel;
  initialLessonId?: string | null;
}

export const A1CourseHub: React.FC<A1CourseHubProps> = ({
  onNavigate,
  initialLevel = 'A1',
  initialLessonId = null
}) => {
  const [currentLevel, setCurrentLevel] = useState<CourseLevel>(initialLevel);

  const courseMap: Record<CourseLevel, CourseData> = {
    A1: rawA1Course as unknown as CourseData,
    A2: rawA2Course as unknown as CourseData,
    B1: rawB1Course as unknown as CourseData
  };

  const course = courseMap[currentLevel];
  const lessons = course.lessons;

  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(initialLessonId);
  const [activeSection, setActiveSection] = useState<LessonSection>('vocab');
  const [progress, setProgress] = useState<ProgressRecord>(() => loadProgress(initialLevel));
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [explanations, setExplanations] = useState<Record<string, AnswerExplanationResult>>({});
  const [explainingKey, setExplainingKey] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [feedback, setFeedback] = useState<SpeakingFeedbackResult | null>(null);
  const recognitionRef = useRef<any>(null);

  // Sync course progress from Supabase LearnDB (shared backend)
  useEffect(() => {
    const p = getStoredPlayer();
    if (!p) return;
    getLearnDB().then(async (db) => {
      try {
        const profile = await db.getPlayerProfile(p);
        if (profile && profile.themes) {
          const fachPrefix = `deutsch-${currentLevel.toLowerCase()}:`;
          const completedFromDb: string[] = [];
          Object.entries(profile.themes).forEach(([tk, val]: [string, any]) => {
            if (tk.startsWith(fachPrefix) && val && val.status === 'done') {
              const lessonId = tk.slice(fachPrefix.length);
              completedFromDb.push(lessonId);
            }
          });
          if (completedFromDb.length > 0) {
            setProgress((prev) => {
              const merged = Array.from(new Set([...prev.completed, ...completedFromDb]));
              const next = { ...prev, completed: merged };
              saveProgress(currentLevel, next);
              return next;
            });
          }
        }
      } catch (_) {}
    }).catch(() => {});
  }, [currentLevel]);

  // Switch Course Level
  const handleLevelChange = (lvl: CourseLevel) => {
    stopRecordingIfNeeded();
    setCurrentLevel(lvl);
    setSelectedLessonId(null);
    setProgress(loadProgress(lvl));
    setAnswers({});
    setExplanations({});
    setTranscript('');
    setFeedback(null);
    setActiveSection('vocab');
  };

  const activeLesson = lessons.find((l) => l.id === selectedLessonId) || null;
  const completedCount = lessons.filter((l) => progress.completed.includes(l.id)).length;
  const progressPercent = Math.round((completedCount / (lessons.length || 1)) * 100);

  // Find next uncompleted lesson
  const nextUncompletedLesson = useMemo(() => {
    return lessons.find((l) => !progress.completed.includes(l.id)) || lessons[0];
  }, [lessons, progress.completed]);

  const speakGerman = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'de-DE';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopRecordingIfNeeded = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // recognition already stopped
      }
      recognitionRef.current = null;
    }
    setIsRecording(false);
  };

  const selectLesson = (lessonId: string) => {
    stopRecordingIfNeeded();
    setSelectedLessonId(lessonId);
    setActiveSection('vocab');
    setAnswers({});
    setExplanations({});
    setExplainingKey(null);
    setTranscript('');
    setFeedback(null);

    // Save as last accessed lesson
    const nextProg = { ...progress, lastLessonId: lessonId };
    setProgress(nextProg);
    saveProgress(currentLevel, nextProg);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startVoiceRecording = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Trình duyệt của bạn chưa hỗ trợ nhận diện giọng nói. Bạn có thể gõ câu nói tiếng Đức vào ô bên dưới nhé!');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'de-DE';
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsRecording(true);
      };

      recognition.onresult = (event: any) => {
        let finalStr = '';
        for (let i = 0; i < event.results.length; i++) {
          finalStr += event.results[i][0].transcript + ' ';
        }
        setTranscript(finalStr.trim());
      };

      recognition.onerror = () => {
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (e) {
      console.error(e);
      setIsRecording(false);
    }
  };

  const stopVoiceRecording = () => {
    stopRecordingIfNeeded();
  };

  const handleEvaluateSpeaking = async () => {
    if (!activeLesson || !transcript.trim()) {
      alert('Vui lòng nói hoặc gõ câu trả lời tiếng Đức trước khi yêu cầu AI chấm điểm!');
      return;
    }
    setIsEvaluating(true);
    try {
      const res = await evaluateSpeakingWithGemini(
        activeLesson.speaking.task,
        `${activeLesson.speaking.prompt} | ${activeLesson.speaking.taskVi}`,
        transcript
      );
      setFeedback(res);
    } catch (e) {
      console.error(e);
      alert('Có lỗi khi chấm điểm nói. Vui lòng thử lại!');
    } finally {
      setIsEvaluating(false);
    }
  };

  const questionKey = (lessonId: string, questionIndex: number) => `${lessonId}-q${questionIndex}`;

  const answerQuestion = (lessonId: string, questionIndex: number, optionIndex: number) => {
    const key = questionKey(lessonId, questionIndex);
    const question = lessons.find((l) => l.id === lessonId)?.quiz[questionIndex];
    if (!question) return;

    setAnswers((prev) => ({ ...prev, [key]: optionIndex }));
    setExplainingKey(key);
    setExplanations((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });

    explainAnswerWithGemini(
      `${question.q} ${question.qVi}`,
      question.options.map((o) => o.de),
      question.options.findIndex((o) => o.correct),
      optionIndex
    ).then((res) => {
      setExplanations((prev) => ({ ...prev, [key]: res }));
    }).catch((e) => {
      console.error(e);
      setExplanations((prev) => ({ ...prev, [key]: {
        explanation: question.explain,
        correctAnswer: question.options.find((o) => o.correct)?.de || '',
        yourAnswer: question.options[optionIndex]?.de || '',
        isCorrect: question.options[optionIndex]?.correct || false,
        translation: question.qVi
      }}));
    }).finally(() => {
      setExplainingKey(null);
    });
  };

  const quizStats = useMemo(() => {
    if (!activeLesson) return { total: 0, answered: 0, correct: 0, percent: 0, allAnswered: false };
    const total = activeLesson.quiz.length;
    let answered = 0;
    let correct = 0;
    activeLesson.quiz.forEach((question, idx) => {
      const chosen = answers[questionKey(activeLesson.id, idx)];
      if (chosen !== undefined) {
        answered += 1;
        if (question.options[chosen]?.correct) correct += 1;
      }
    });
    const percent = total ? Math.round((correct / total) * 100) : 0;
    return { total, answered, correct, percent, allAnswered: answered === total };
  }, [activeLesson, answers]);

  const handleCompleteLesson = () => {
    if (!activeLesson) return;
    const isPassed = quizStats.percent >= PASS_PERCENT;
    const nextCompleted = Array.from(new Set([...progress.completed, activeLesson.id]));
    const nextScores = { ...progress.quizScores, [activeLesson.id]: quizStats.percent };
    const nextProgress = {
      completed: isPassed ? nextCompleted : progress.completed,
      quizScores: nextScores,
      lastLessonId: activeLesson.id
    };
    setProgress(nextProgress);
    saveProgress(currentLevel, nextProgress);

    // Sync to Supabase (shared LearnDB with AzubiHub)
    const playerName = getStoredPlayer();
    if (playerName) {
      getLearnDB().then((db) => {
        const fach = `deutsch-${currentLevel.toLowerCase()}`;
        const theme = activeLesson.id;
        const name = `[${currentLevel}] Bài ${activeLesson.lesson}: ${activeLesson.title}`;
        db.markThemeProgress(playerName, {
          fach,
          theme,
          name,
          status: isPassed ? 'done' : 'seen'
        }).catch(() => {});
        if (quizStats.total > 0) {
          db.saveQuizScore({
            subject: fach,
            quiz: theme,
            correct: quizStats.correct,
            total: quizStats.total,
            player: playerName
          }).catch(() => {});
        }
      }).catch(() => {});
    }
  };

  const handleResetQuiz = () => {
    if (!activeLesson) return;
    setAnswers({});
    setExplanations({});
  };

  const quickLinks: { tab: TabType; label: string; icon: React.ReactNode }[] = [
    { tab: 'vocab', label: 'Từ Vựng & Flashcard', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { tab: 'speaking', label: 'Luyện Nói AI', icon: <Mic className="w-3.5 h-3.5" /> },
    { tab: 'exams', label: 'Luyện Đề TELC/Goethe', icon: <LayoutDashboard className="w-3.5 h-3.5" /> },
    { tab: 'grammar', label: 'Ngữ Pháp', icon: <FileText className="w-3.5 h-3.5" /> }
  ];

  return (
    <div className="space-y-4 pb-16">
      {/* Level Selection Tabs */}
      <div className="rounded-2xl bg-white border border-ios-line p-3 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          <span className="text-[11px] font-bold uppercase tracking-wider text-ios-muted mr-1 shrink-0">
            Khóa học:
          </span>
          {[
            { id: 'A1', label: '🟢 A1 Căn Bản', badge: '12 Bài' },
            { id: 'A2', label: '🔵 A2 Sơ Cấp', badge: '12 Bài' },
            { id: 'B1', label: '🟡 B1 Trung Cấp', badge: '12 Bài' }
          ].map((lvl) => (
            <button
              key={lvl.id}
              onClick={() => handleLevelChange(lvl.id as CourseLevel)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                currentLevel === lvl.id
                  ? 'bg-ios-accent text-white shadow-xs'
                  : 'bg-ios-bg text-ios-secondary border border-ios-line hover:bg-ios-line/50'
              }`}
            >
              <span>{lvl.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                currentLevel === lvl.id ? 'bg-white/20 text-white' : 'bg-ios-line text-ios-muted'
              }`}>
                {lvl.badge}
              </span>
            </button>
          ))}
        </div>

        {/* Progress Stats Summary */}
        <div className="flex items-center justify-between sm:justify-end gap-3 text-xs font-bold">
          <div className="flex items-center gap-1.5">
            <span className="text-ios-muted font-medium">Tiến trình {currentLevel}:</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              {completedCount}/{lessons.length} bài ({progressPercent}%)
            </span>
          </div>
        </div>
      </div>

      {/* 🌟 INTERACTIVE LESSON PROGRESS BUBBLES BAR (1 to 12) */}
      <div className="bg-white border border-ios-line rounded-2xl p-3 shadow-xs space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-ios-ink flex items-center gap-1.5">
            <span>Tiến trình từng bài</span>
            <span className="text-[11px] text-ios-muted font-normal">
              (Bấm số bài để nhảy ngay vào học)
            </span>
          </span>

          {nextUncompletedLesson && !activeLesson && (
            <button
              onClick={() => selectLesson(nextUncompletedLesson.id)}
              className="text-ios-accent hover:underline font-bold flex items-center gap-1 cursor-pointer"
            >
              <span>Tiếp tục: Bài {nextUncompletedLesson.lesson}</span>
              <PlayCircle className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* 12 Bubbles row */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
          {lessons.map((l) => {
            const isCompleted = progress.completed.includes(l.id);
            const isCurrent = activeLesson?.id === l.id;
            const score = progress.quizScores[l.id];

            let bubbleClass = 'bg-ios-bg text-ios-secondary border-ios-line hover:border-ios-accent/50';
            if (isCompleted) {
              bubbleClass = 'bg-emerald-500 text-white border-emerald-600 shadow-xs font-extrabold';
            } else if (isCurrent) {
              bubbleClass = 'bg-ios-accent text-white border-ios-accent shadow-xs font-extrabold ring-2 ring-ios-accent/30';
            }

            return (
              <button
                key={l.id}
                onClick={() => selectLesson(l.id)}
                title={`Bài ${l.lesson}: ${l.title} ${isCompleted ? `(Đã hoàn thành ${score || 100}%)` : ''}`}
                className={`min-w-[40px] sm:min-w-[46px] h-10 rounded-xl border flex flex-col items-center justify-center text-xs transition-all shrink-0 cursor-pointer ${bubbleClass}`}
              >
                <span className="text-[11px] leading-none">B{l.lesson}</span>
                <span className="text-[9px] leading-none opacity-80 mt-0.5">
                  {isCompleted ? '✓' : isCurrent ? '⏳' : '○'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick learning links (compact) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {quickLinks.map((link) => (
          <button
            key={link.tab}
            onClick={() => onNavigate(link.tab)}
            className="flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl bg-white border border-ios-line text-ios-ink text-xs font-bold shadow-xs hover:bg-ios-accent-soft hover:text-ios-accent hover:border-ios-accent/40 transition-all cursor-pointer"
          >
            {link.icon}
            <span>{link.label}</span>
          </button>
        ))}
      </div>

      {/* Main Course Content: Lesson List vs Active Lesson Detail */}
      {!activeLesson ? (
        /* LESSON SELECTION CARDS GRID */
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-ios-muted">
              Danh Sách 12 Bài Học Khóa {currentLevel}
            </h3>
            <span className="text-xs text-ios-muted font-medium">
              Chạm bài học để bắt đầu
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {lessons.map((lesson) => {
              const isCompleted = progress.completed.includes(lesson.id);
              const score = progress.quizScores[lesson.id];

              return (
                <div
                  key={lesson.id}
                  onClick={() => selectLesson(lesson.id)}
                  className={`rounded-2xl border p-4 transition-all cursor-pointer flex flex-col justify-between group hover:shadow-sm ${
                    isCompleted
                      ? 'bg-emerald-50/30 border-emerald-200'
                      : 'bg-white border-ios-line hover:border-ios-accent/40'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-full bg-ios-accent-soft text-ios-accent font-bold text-[11px]">
                        Bài {lesson.lesson} · {lesson.duration}
                      </span>
                      {isCompleted ? (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Đã Thuộc {score ? `(${score}%)` : ''}
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-ios-bg text-ios-muted text-[10px] font-semibold">
                          Chưa học
                        </span>
                      )}
                    </div>

                    <div>
                      <h4 className="font-extrabold text-sm text-ios-ink group-hover:text-ios-accent transition-colors truncate">
                        {lesson.title}
                      </h4>
                      <p className="text-xs text-ios-secondary truncate">
                        {lesson.titleVi}
                      </p>
                    </div>

                    <div className="text-[11px] text-ios-muted line-clamp-1">
                      {lesson.goals[0]}
                    </div>
                  </div>

                  <div className="pt-3 mt-2 border-t border-ios-line flex items-center justify-between text-xs">
                    <span className="text-[11px] text-ios-muted font-medium">
                      {lesson.vocab.length} từ vựng · 1 ngữ pháp
                    </span>
                    <span className="font-bold text-ios-accent group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                      Vào Học <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* 🌟 MINIMALIST ACCORDION/SECTION TABS FOR ACTIVE LESSON */
        <div className="space-y-4">
          {/* Back Navigation Bar */}
          <div className="flex items-center justify-between bg-white border border-ios-line p-2.5 rounded-2xl shadow-xs">
            <button
              onClick={() => setSelectedLessonId(null)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-ios-bg text-ios-ink hover:bg-ios-line/50 font-bold text-xs cursor-pointer transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Tất Cả Bài Học ({currentLevel})</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-ios-accent">
                Bài {activeLesson.lesson}: {activeLesson.title.substring(0, 24)}…
              </span>
            </div>
          </div>

          {/* Lesson Header Mini */}
          <div className="rounded-2xl bg-white border border-ios-line p-3.5 sm:p-4 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-ios-accent uppercase">
                <span>{currentLevel}</span>
                <span>•</span>
                <span>Bài {activeLesson.lesson}: {activeLesson.theme}</span>
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-ios-ink font-display">
                {activeLesson.title} <span className="font-normal text-xs text-ios-secondary">({activeLesson.titleVi})</span>
              </h3>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-ios-muted shrink-0">
              <Clock className="w-3.5 h-3.5" />
              <span>{activeLesson.duration}</span>
            </div>
          </div>

          {/* 🌟 SUB-SECTION TABS: CLICK TO EXPAND/VIEW ONLY WHAT YOU NEED */}
          <div className="flex items-center bg-ios-bg p-1 rounded-xl border border-ios-line overflow-x-auto scrollbar-none gap-1">
            {[
              { id: 'vocab', label: `1. Từ Vựng (${activeLesson.vocab.length})`, icon: <BookOpen className="w-3.5 h-3.5" /> },
              { id: 'grammar', label: '2. Ngữ Pháp', icon: <FileText className="w-3.5 h-3.5" /> },
              { id: 'dialogue', label: '3. Hội Thoại', icon: <GraduationCap className="w-3.5 h-3.5" /> },
              { id: 'speaking', label: '4. Luyện Nói AI', icon: <Mic className="w-3.5 h-3.5" /> },
              { id: 'quiz', label: `5. Quiz (${activeLesson.quiz.length})`, icon: <Target className="w-3.5 h-3.5" /> }
            ].map((sec) => (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id as LessonSection)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  activeSection === sec.id
                    ? 'bg-white text-ios-accent shadow-xs'
                    : 'text-ios-secondary hover:text-ios-ink'
                }`}
              >
                {sec.icon}
                <span>{sec.label}</span>
              </button>
            ))}
          </div>

          {/* ==================== 1. VOCABULARY SECTION ==================== */}
          {activeSection === 'vocab' && (
            <div className="rounded-2xl bg-white border border-ios-line p-4 sm:p-5 shadow-xs space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-ios-line pb-2.5">
                <h4 className="font-extrabold text-sm text-ios-ink flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-ios-accent" />
                  <span>Từ Vựng Cốt Lõi Bài Học ({activeLesson.vocab.length} từ)</span>
                </h4>
                <span className="text-[11px] text-ios-muted">Chạm loa để nghe phát âm</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {activeLesson.vocab.map((v, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-ios-bg border border-ios-line hover:border-ios-accent/40 transition-all flex items-start justify-between gap-2.5"
                  >
                    <div className="space-y-0.5">
                      <div className="font-bold text-xs sm:text-sm text-ios-ink">
                        {v.de} <span className="font-normal text-ios-secondary text-xs">({v.vi})</span>
                      </div>
                      <div className="text-xs text-ios-muted italic">
                        "{v.exampleDe}"
                      </div>
                      <div className="text-[11px] text-ios-secondary">
                        → {v.exampleVi}
                      </div>
                    </div>

                    <button
                      onClick={() => speakGerman(v.de)}
                      className="p-2 rounded-lg bg-white border border-ios-line hover:bg-ios-accent-soft hover:text-ios-accent text-ios-secondary transition-colors cursor-pointer shrink-0"
                      title="Nghe phát âm"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setActiveSection('grammar')}
                  className="px-4 py-2 rounded-xl bg-ios-accent text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <span>Học Tiếp: 2. Ngữ Pháp</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* ==================== 2. GRAMMAR SECTION ==================== */}
          {activeSection === 'grammar' && (
            <div className="rounded-2xl bg-white border border-ios-line p-4 sm:p-5 shadow-xs space-y-4 animate-in fade-in">
              <div className="border-b border-ios-line pb-2.5">
                <h4 className="font-extrabold text-sm text-ios-ink flex items-center gap-2">
                  <FileText className="w-4 h-4 text-ios-ok" />
                  <span>Ngữ Pháp Trọng Tâm: {activeLesson.grammar.topic}</span>
                </h4>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-200 font-mono text-xs sm:text-sm text-emerald-900 font-bold">
                Công thức: {activeLesson.grammar.formula}
              </div>

              <p className="text-xs sm:text-sm text-ios-ink leading-relaxed">
                {activeLesson.grammar.explanation}
              </p>

              <div className="space-y-2 pt-1">
                <div className="text-xs font-bold uppercase tracking-wider text-ios-muted">Ví dụ mẫu:</div>
                <div className="divide-y divide-ios-line border border-ios-line rounded-xl overflow-hidden bg-ios-bg">
                  {activeLesson.grammar.examples.map((ex, i) => (
                    <div key={i} className="p-2.5 sm:p-3 flex items-center justify-between gap-3 text-xs sm:text-sm">
                      <div>
                        <span className="font-bold text-ios-ink">{ex.de}</span>
                        <span className="text-ios-secondary ml-2">({ex.vi})</span>
                      </div>
                      <button
                        onClick={() => speakGerman(ex.de)}
                        className="p-1.5 rounded-lg bg-white text-ios-secondary hover:text-ios-accent cursor-pointer shrink-0 border border-ios-line"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setActiveSection('dialogue')}
                  className="px-4 py-2 rounded-xl bg-ios-accent text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <span>Học Tiếp: 3. Hội Thoại</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* ==================== 3. DIALOGUE SECTION ==================== */}
          {activeSection === 'dialogue' && (
            <div className="rounded-2xl bg-white border border-ios-line p-4 sm:p-5 shadow-xs space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-ios-line pb-2.5">
                <h4 className="font-extrabold text-sm text-ios-ink flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-purple-600" />
                  <span>Đoạn Hội Thoại: {activeLesson.dialogue.title}</span>
                </h4>
                <button
                  onClick={() => speakGerman(activeLesson.dialogue.de)}
                  className="px-3 py-1.5 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Nghe Toàn Bài</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
                <div className="p-3.5 rounded-xl bg-ios-bg border border-ios-line space-y-1.5 whitespace-pre-line font-medium text-ios-ink leading-relaxed">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-purple-700 mb-1">Tiếng Đức:</div>
                  {activeLesson.dialogue.de}
                </div>
                <div className="p-3.5 rounded-xl bg-purple-50/30 border border-purple-100 space-y-1.5 whitespace-pre-line font-medium text-purple-950 leading-relaxed">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-purple-700 mb-1">Bản Dịch Tiếng Việt:</div>
                  {activeLesson.dialogue.vi}
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setActiveSection('speaking')}
                  className="px-4 py-2 rounded-xl bg-ios-accent text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <span>Học Tiếp: 4. Luyện Nói AI</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* ==================== 4. SPEAKING WITH AI ==================== */}
          {activeSection === 'speaking' && (
            <div className="rounded-2xl bg-white border border-ios-line p-4 sm:p-5 shadow-xs space-y-4 animate-in fade-in">
              <div className="border-b border-ios-line pb-2.5">
                <h4 className="font-extrabold text-sm text-ios-ink flex items-center gap-2">
                  <Mic className="w-4 h-4 text-ios-bad" />
                  <span>Luyện Nói & Gemini AI Chấm Điểm</span>
                </h4>
                <p className="text-xs text-ios-secondary mt-0.5">
                  Nhiệm vụ: {activeLesson.speaking.taskVi}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-amber-50/50 border border-amber-200 text-xs text-amber-900 font-medium">
                💡 Gợi ý cấu trúc: <strong>{activeLesson.speaking.prompt}</strong>
              </div>

              {/* Voice Recording Interface */}
              <div className="space-y-2.5">
                <div className="flex flex-wrap items-center gap-2">
                  {!isRecording ? (
                    <button
                      onClick={startVoiceRecording}
                      className="px-3.5 py-2 rounded-xl bg-ios-bad hover:bg-[#A52B24] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <Mic className="w-3.5 h-3.5" />
                      <span>Bấm Ghi Âm Giọng Nói</span>
                    </button>
                  ) : (
                    <button
                      onClick={stopVoiceRecording}
                      className="px-3.5 py-2 rounded-xl bg-rose-100 border border-rose-300 text-rose-800 text-xs font-bold flex items-center gap-1.5 animate-pulse cursor-pointer"
                    >
                      <Square className="w-3.5 h-3.5 fill-current" />
                      <span>Dừng Ghi Âm</span>
                    </button>
                  )}

                  <button
                    onClick={handleEvaluateSpeaking}
                    disabled={isEvaluating || !transcript.trim()}
                    className="px-3.5 py-2 rounded-xl bg-ios-accent hover:bg-[#0A6FE0] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer disabled:opacity-50"
                  >
                    {isEvaluating ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Gemini AI Đang Chấm...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Chấm Bài Nói Bằng AI</span>
                      </>
                    )}
                  </button>
                </div>

                <textarea
                  value={transcript}
                  onChange={(e) => setTranscript(e.target.value)}
                  placeholder="Câu trả lời của bạn sẽ hiển thị tại đây khi bạn nói (hoặc gõ trực tiếp câu tiếng Đức)..."
                  rows={3}
                  className="w-full bg-ios-bg border border-ios-line rounded-xl p-3 text-xs sm:text-sm text-ios-ink focus:outline-none focus:border-ios-accent"
                />
              </div>

              {/* AI Feedback Display */}
              {feedback && (
                <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200 space-y-2.5 animate-in fade-in">
                  <div className="flex items-center justify-between border-b border-purple-200 pb-1.5">
                    <span className="text-xs font-bold uppercase text-purple-900">Đánh Giá Từ Giáo Viên AI:</span>
                    <span className="px-2 py-0.5 rounded-full bg-purple-200 text-purple-900 font-bold text-[11px]">
                      {feedback.overallBand}
                    </span>
                  </div>
                  <p className="text-xs text-purple-900 leading-relaxed">
                    {feedback.feedbackSummary}
                  </p>
                  {feedback.nativeSpeakerModel && (
                    <div className="text-xs text-purple-800 bg-white p-2.5 rounded-lg border border-purple-200">
                      <strong>Câu mẫu người bản xứ:</strong> "{feedback.nativeSpeakerModel}"
                    </div>
                  )}
                </div>
              )}

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setActiveSection('quiz')}
                  className="px-4 py-2 rounded-xl bg-ios-accent text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <span>Làm Bài Kiểm Tra: 5. Quiz</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* ==================== 5. QUIZ SECTION ==================== */}
          {activeSection === 'quiz' && (
            <div className="rounded-2xl bg-white border border-ios-line p-4 sm:p-5 shadow-xs space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-ios-line pb-2.5">
                <div>
                  <h4 className="font-extrabold text-sm text-ios-ink flex items-center gap-2">
                    <Target className="w-4 h-4 text-ios-accent" />
                    <span>Bài Kiểm Tra Đánh Giá ({activeLesson.quiz.length} câu hỏi)</span>
                  </h4>
                  <p className="text-xs text-ios-secondary mt-0.5">
                    Đạt từ {PASS_PERCENT}% để hoàn thành bài học
                  </p>
                </div>

                <button
                  onClick={handleResetQuiz}
                  className="p-1.5 px-2 rounded-lg bg-ios-bg text-ios-secondary hover:text-ios-ink border border-ios-line text-xs font-bold flex items-center gap-1 cursor-pointer"
                  title="Làm lại bài kiểm tra"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Làm Lại</span>
                </button>
              </div>

              <div className="space-y-3">
                {activeLesson.quiz.map((q, qIdx) => {
                  const key = questionKey(activeLesson.id, qIdx);
                  const chosen = answers[key];
                  const explanation = explanations[key];
                  const isExplaining = explainingKey === key;

                  return (
                    <div key={qIdx} className="p-3.5 rounded-xl bg-ios-bg border border-ios-line space-y-2.5">
                      <div className="font-bold text-xs sm:text-sm text-ios-ink">
                        Câu {qIdx + 1}: {q.q} <span className="font-normal text-ios-secondary text-xs">({q.qVi})</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {q.options.map((opt, optIdx) => {
                          const isChosen = chosen === optIdx;
                          let btnStyle = 'bg-white text-ios-ink border-ios-line hover:bg-ios-line/40';

                          if (chosen !== undefined) {
                            if (opt.correct) {
                              btnStyle = 'bg-emerald-500 text-white border-emerald-600 font-bold';
                            } else if (isChosen && !opt.correct) {
                              btnStyle = 'bg-rose-500 text-white border-rose-600 font-bold';
                            }
                          }

                          return (
                            <button
                              key={optIdx}
                              disabled={chosen !== undefined}
                              onClick={() => answerQuestion(activeLesson.id, qIdx, optIdx)}
                              className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${btnStyle}`}
                            >
                              {opt.de}
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation */}
                      {isExplaining && (
                        <div className="text-xs text-ios-muted flex items-center gap-1.5 pt-0.5">
                          <RefreshCw className="w-3 h-3 animate-spin" />
                          <span>AI đang phân tích đáp án...</span>
                        </div>
                      )}

                      {explanation && (
                        <div className={`p-2.5 rounded-xl text-xs ${
                          explanation.isCorrect ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-rose-50 text-rose-900 border border-rose-200'
                        }`}>
                          <div className="font-bold mb-0.5">
                            {explanation.isCorrect ? '✓ Chính xác!' : '⚠️ Chưa đúng!'}
                          </div>
                          <div>{explanation.explanation}</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Quiz Result & Complete Button */}
              {quizStats.allAnswered && (
                <div className="p-3.5 rounded-xl bg-ios-bg border border-ios-line flex flex-col sm:flex-row items-center justify-between gap-2.5 animate-in fade-in">
                  <div>
                    <div className="text-xs font-bold text-ios-ink">
                      Kết quả: {quizStats.correct} / {quizStats.total} câu đúng ({quizStats.percent}%)
                    </div>
                    <div className="text-xs text-ios-secondary">
                      {quizStats.percent >= PASS_PERCENT
                        ? '🎉 Xuất sắc! Bạn đã vượt qua bài kiểm tra.'
                        : 'Cần đạt từ 60% để hoàn thành. Hãy bấm "Làm Lại" để thử lại!'}
                    </div>
                  </div>

                  <button
                    onClick={handleCompleteLesson}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs cursor-pointer transition-all"
                  >
                    Xác Nhận Hoàn Thành Bài {activeLesson.lesson} ✓
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
