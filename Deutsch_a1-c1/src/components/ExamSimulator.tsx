import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Volume2, 
  RotateCcw, 
  Layers, 
  HelpCircle,
  Headphones,
  FileCheck,
  BookOpen
} from 'lucide-react';
import rawHoerenData from '../data/de_thi_audio_va_transcript_hoeren_18_bai.json';

interface OptionItem {
  de: string;
  vi: string;
  c: boolean;
}

interface ExamQuestion {
  qDe: string;
  qVi: string;
  opts: OptionItem[];
}

interface QuestionAnswerPair {
  qDe: string;
  ansDe: string;
  qVi: string;
  ansVi: string;
}

interface HoerenItem {
  title: string;
  titleVi: string;
  audioText: string;
  exam?: ExamQuestion[];
  qs?: QuestionAnswerPair[];
}

export const ExamSimulator: React.FC = () => {
  const [selectedSetIndex, setSelectedSetIndex] = useState<number>(0);
  const [selectedTab, setSelectedTab] = useState<'hoeren' | 'lesen' | 'sprachbausteine'>('hoeren');
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: number }>({});
  const [showResults, setShowResults] = useState<boolean>(false);

  const hoerenList = rawHoerenData as HoerenItem[];
  const currentItem = hoerenList[selectedSetIndex % hoerenList.length] || hoerenList[0];

  const speakGerman = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'de-DE';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSelectAnswer = (qKey: string, optIndex: number) => {
    if (showResults) return;
    setUserAnswers(prev => ({ ...prev, [qKey]: optIndex }));
  };

  const handleReset = () => {
    setUserAnswers({});
    setShowResults(false);
  };

  const questions = currentItem?.exam || [];

  const calculateScore = () => {
    let correct = 0;
    const total = questions.length;
    questions.forEach((q, idx) => {
      const chosen = userAnswers[`q_${idx}`];
      if (chosen !== undefined && q.opts[chosen]?.c === true) {
        correct++;
      }
    });
    return { correct, total, percentage: total > 0 ? Math.round((correct / total) * 100) : 0 };
  };

  const score = calculateScore();

  return (
    <div className="space-y-6 pb-16">
      {/* Header Banner */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold uppercase mb-2">
            <Layers className="w-3.5 h-3.5" />
            Phòng Thi Mô Phỏng Trực Tiếp (Exam Simulator)
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
            Bộ Đề Thi Thử Chuẩn B1 - B2 Kèm Lời Thoại & Đáp Án
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl">
            Làm bài trắc nghiệm bấm giờ, xem giải thích chi tiết đáp án AI, nghe audio script và kiểm tra trình độ theo thời gian thực.
          </p>
        </div>

        {/* Set Selector Dropdown */}
        <div className="flex flex-wrap items-center gap-3 bg-slate-800/80 p-2 rounded-2xl border border-slate-700/80 shrink-0">
          <span className="text-xs text-slate-400 font-semibold pl-2">Chọn Đề:</span>
          <select
            value={selectedSetIndex}
            onChange={(e) => {
              setSelectedSetIndex(Number(e.target.value));
              handleReset();
            }}
            className="bg-slate-900 text-amber-400 text-xs sm:text-sm font-bold px-3 py-2 rounded-xl border border-amber-500/40 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
          >
            {hoerenList.map((item, i) => (
              <option key={i} value={i}>
                Đề #{i + 1}: {item.title.substring(0, 30)}...
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Mode / Tab Selector */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 overflow-x-auto">
        <button
          onClick={() => setSelectedTab('hoeren')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            selectedTab === 'hoeren'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
          }`}
        >
          <Headphones className="w-4 h-4" />
          <span>Hörverstehen & Transcript ({hoerenList.length} bài)</span>
        </button>

        <button
          onClick={() => setSelectedTab('lesen')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            selectedTab === 'lesen'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Leseverstehen (Đọc Hiểu Teil 1-3)</span>
        </button>

        <button
          onClick={() => setSelectedTab('sprachbausteine')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            selectedTab === 'sprachbausteine'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
          }`}
        >
          <FileCheck className="w-4 h-4" />
          <span>Sprachbausteine (Điền Từ Teil 1-2)</span>
        </button>
      </div>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Text / Audio Transcript */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  Đề Số #{selectedSetIndex + 1}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                  {currentItem?.title}
                </h3>
                {currentItem?.titleVi && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    🇻🇳 {currentItem.titleVi}
                  </p>
                )}
              </div>

              <button
                onClick={() => speakGerman(currentItem?.audioText?.substring(0, 300) || '')}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-amber-500/20 text-slate-700 dark:text-slate-200 hover:text-amber-500 text-xs font-bold transition-colors cursor-pointer"
                title="Nghe phát âm lời thoại"
              >
                <Volume2 className="w-4 h-4" />
                <span>Nghe Đọc (TTS)</span>
              </button>
            </div>

            {/* Content Box */}
            <div className="bg-slate-50 dark:bg-slate-800/40 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-700/50 max-h-[480px] overflow-y-auto leading-relaxed text-sm text-slate-800 dark:text-slate-200 font-sans space-y-4">
              <div className="whitespace-pre-line leading-relaxed">
                {currentItem?.audioText}
              </div>

              {/* Analysis & Key Points */}
              {currentItem?.qs && currentItem.qs.length > 0 && (
                <div className="pt-4 border-t border-slate-200 dark:border-slate-700 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Ý Chính Và Dịch Nghĩa Nội Dung:</span>
                  </h4>
                  <div className="space-y-2">
                    {currentItem.qs.map((q, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                        <div className="font-bold text-slate-900 dark:text-white">{q.qDe}</div>
                        <div className="text-slate-600 dark:text-slate-300 font-medium">👉 {q.ansDe}</div>
                        <div className="text-slate-400 italic">🇻🇳 {q.qVi}: {q.ansVi}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Questions & AI Scoring */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-500" />
                <span>Câu Hỏi Trắc Nghiệm ({questions.length} câu)</span>
              </h4>

              {showResults && (
                <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                  Điểm: {score.correct} / {score.total} ({score.percentage}%)
                </div>
              )}
            </div>

            {/* Questions */}
            <div className="space-y-5 max-h-[460px] overflow-y-auto pr-1">
              {questions.map((q, qIdx) => {
                const qKey = `q_${qIdx}`;
                const chosenOpt = userAnswers[qKey];

                return (
                  <div key={qIdx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 space-y-3">
                    <div className="space-y-1">
                      <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                        Câu {qIdx + 1}: {q.qDe}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        🇻🇳 {q.qVi}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      {q.opts.map((opt, optIdx) => {
                        const isChosen = chosenOpt === optIdx;
                        const isThisCorrect = opt.c;

                        let optClass = 'bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:border-amber-500';
                        if (showResults) {
                          if (isThisCorrect) optClass = 'bg-emerald-500/20 border-emerald-500 text-emerald-800 dark:text-emerald-200 font-bold';
                          else if (isChosen && !isThisCorrect) optClass = 'bg-rose-500/20 border-rose-500 text-rose-800 dark:text-rose-200';
                        } else if (isChosen) {
                          optClass = 'bg-amber-500/20 border-amber-500 text-amber-900 dark:text-amber-300 font-bold';
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectAnswer(qKey, optIdx)}
                            className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all flex items-start justify-between gap-2 cursor-pointer ${optClass}`}
                          >
                            <div className="space-y-0.5">
                              <div>{['A', 'B', 'C'][optIdx]}. {opt.de}</div>
                              <div className="text-[11px] opacity-75">{opt.vi}</div>
                            </div>
                            {showResults && isThisCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />}
                            {showResults && isChosen && !isThisCorrect && <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center gap-3">
              {!showResults ? (
                <button
                  onClick={() => setShowResults(true)}
                  className="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Nộp Bài & Xem Điểm Số</span>
                </button>
              ) : (
                <button
                  onClick={handleReset}
                  className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-600 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Làm Lại Đề Này</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
