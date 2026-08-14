import React, { useState, useCallback } from 'react';
import {
  Layers,
  Volume2,
  RotateCcw,
  HelpCircle,
  Headphones,
  BookOpen,
  FileCheck,
  Sparkles,
  Bot,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { BANKS, speakerLabel } from '../services/examBankUtils';
import { explainAnswerWithGemini, AnswerExplanationResult } from '../services/geminiService';

type TabId = 'hoeren' | 'lesen' | 'sprach';
type Level = 'B1' | 'B2';

const TAB_META: { id: TabId; label: string; levels: Level[] }[] = [
  { id: 'hoeren', label: 'Hörverstehen (Nghe hiểu)', levels: ['B1'] },
  { id: 'lesen', label: 'Leseverstehen (Đọc hiểu)', levels: ['B1', 'B2'] },
  { id: 'sprach', label: 'Sprachbausteine (Ngữ pháp)', levels: ['B1'] },
];

export const ExamSimulator: React.FC = () => {
  const [level, setLevel] = useState<Level>('B1');
  const [tab, setTab] = useState<TabId>('hoeren');
  const [selectedItem, setSelectedItem] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [explanations, setExplanations] = useState<{ [key: string]: AnswerExplanationResult | null }>({});
  const [explainingKey, setExplainingKey] = useState<string | null>(null);

  const bank =
    tab === 'hoeren'
      ? BANKS.hoeren.B1
      : tab === 'sprach'
        ? BANKS.sprach.B1
        : level === 'B2'
          ? BANKS.lesen.B2
          : BANKS.lesen.B1;

  const item = bank.items[selectedItem] || bank.items[0];

  const resetForNewContext = useCallback(() => {
    setSelectedItem(0);
    setUserAnswers({});
    setShowResults(false);
    setExplanations({});
    setExplainingKey(null);
  }, []);

  const changeTab = (t: TabId) => {
    setTab(t);
    if (t !== 'lesen') setLevel('B1');
    resetForNewContext();
  };

  const changeLevel = (l: Level) => {
    setLevel(l);
    resetForNewContext();
  };

  const changeItem = (idx: number) => {
    setSelectedItem(idx);
    setUserAnswers({});
    setShowResults(false);
    setExplanations({});
    setExplainingKey(null);
  };

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

  const handleExplain = async (qKey: string, qIdx: number) => {
    if (explanations[qKey]) return;
    setExplainingKey(qKey);
    const q = item.questions[qIdx];
    const result = await explainAnswerWithGemini(
      q.stem,
      q.options.map(o => o.de),
      q.correctIdx,
      userAnswers[qKey] ?? -1,
      item.passage
    );
    setExplanations(prev => ({ ...prev, [qKey]: result }));
    setExplainingKey(null);
  };

  const questions = item?.questions || [];
  const score = (() => {
    let correct = 0;
    questions.forEach((q, idx) => {
      if (userAnswers[`q_${idx}`] === q.correctIdx) correct++;
    });
    const total = questions.length;
    return { correct, total, percentage: total > 0 ? Math.round((correct / total) * 100) : 0 };
  })();

  const letter = (i: number) => ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'][i] || String(i + 1);

  return (
    <div className="space-y-6 pb-16">
      {/* Compact Header */}
      <div className="rounded-2xl bg-white border border-ios-line p-3 sm:p-4 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="hidden md:block">
          <h2 className="text-lg font-extrabold font-display text-ios-ink flex items-center gap-2">
            <Layers className="w-4 h-4 text-ios-accent" />
            <span>Phòng Thi Mô Phỏng TELC & Goethe (B1 - B2)</span>
          </h2>
        </div>

        {/* Item Selector Dropdown */}
        {bank.items.length > 0 && (
          <div className="flex items-center justify-between sm:justify-start gap-2 bg-ios-bg p-1.5 rounded-xl border border-ios-line">
            <span className="text-xs text-ios-muted font-bold pl-2 shrink-0">Chọn Đề:</span>
            <select
              value={selectedItem}
              onChange={(e) => changeItem(Number(e.target.value))}
              className="bg-white text-ios-accent text-xs sm:text-sm font-bold px-3 py-1.5 rounded-lg border border-ios-line focus:outline-none cursor-pointer flex-1 sm:max-w-[280px]"
            >
              {bank.items.map((it, i) => (
                <option key={i} value={i}>
                  Đề #{i + 1}: {it.title.substring(0, 32)}{it.title.length > 32 ? '…' : ''}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Mode / Tab Selector */}
      <div className="flex flex-col lg:flex-row gap-3 border-b border-ios-line pb-3">
        <div className="flex items-center gap-2 overflow-x-auto">
          {TAB_META.map((m) => {
            const isActive = tab === m.id;
            const Icon = m.id === 'hoeren' ? Headphones : m.id === 'lesen' ? BookOpen : FileCheck;
            return (
              <button
                key={m.id}
                onClick={() => changeTab(m.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-ios-accent-soft text-ios-accent'
                    : 'bg-white text-ios-secondary border border-ios-line hover:bg-ios-bg'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{m.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${isActive ? 'bg-white text-ios-accent' : 'bg-ios-bg text-ios-muted'}`}>
                  {bank.items.length} đề
                </span>
              </button>
            );
          })}
        </div>

        {/* Level Selector (only for lesen) */}
        {tab === 'lesen' && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-ios-muted font-semibold pl-1">Trình độ:</span>
            {TAB_META.find((m) => m.id === 'lesen')!.levels.map((l) => (
              <button
                key={l}
                onClick={() => changeLevel(l)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  level === l
                    ? 'bg-ios-accent text-white shadow-sm'
                    : 'bg-white text-ios-secondary border border-ios-line hover:bg-ios-bg'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        )}
      </div>

      {!item ? (
        <div className="rounded-2xl bg-white border border-ios-line p-10 text-center text-sm text-ios-muted">
          Chưa có đề nào cho phần này.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Passage / Transcript */}
          <div className="lg:col-span-7 space-y-4">
            <div className="rounded-2xl bg-white border border-ios-line p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ios-line pb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-ios-accent">
                    {bank.label} · Đề Số #{selectedItem + 1}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-ios-ink mt-0.5">
                    {item.title}
                  </h3>
                  {item.titleVi && (
                    <p className="text-xs text-ios-muted mt-0.5">
                      {item.titleVi}
                    </p>
                  )}
                </div>

                {item.passage && (
                  <button
                    onClick={() => speakGerman(item.passage?.substring(0, 300) || '')}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-ios-bg hover:bg-ios-accent-soft text-ios-secondary hover:text-ios-accent text-xs font-bold transition-colors cursor-pointer border border-ios-line"
                    title="Nghe phát âm lời thoại"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Nghe Đọc (TTS)</span>
                  </button>
                )}
              </div>

              {item.passage ? (
                <div className="bg-ios-bg rounded-xl p-5 border border-ios-line max-h-[480px] overflow-y-auto leading-relaxed text-sm text-ios-ink font-sans whitespace-pre-line">
                  {item.passage}
                </div>
              ) : (
                <div className="bg-ios-bg rounded-xl p-5 border border-ios-line text-xs text-ios-muted">
                  Chọn mạo từ (giống) đúng cho danh từ tính từ trong bài tập bên phải.
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Interactive Questions */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl bg-white border border-ios-line p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold text-ios-ink flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-ios-accent" />
                  <span>Câu Hỏi ({questions.length} câu)</span>
                </h4>

                {showResults && (
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${score.percentage >= 60 ? 'bg-ios-ok-soft border border-ios-ok/30 text-ios-ok' : 'bg-ios-bad-soft border border-ios-bad/30 text-ios-bad'}`}>
                    Điểm: {score.correct} / {score.total} ({score.percentage}%)
                  </div>
                )}
              </div>

              {/* Questions */}
              <div className="space-y-5 max-h-[620px] overflow-y-auto pr-1">
                {questions.map((q, qIdx) => {
                  const qKey = `q_${qIdx}`;
                  const chosenOpt = userAnswers[qKey];
                  const isZuordnung = item.kind === 'zuordnung';
                  const expl = explanations[qKey];

                  return (
                    <div key={qKey} className="p-4 rounded-xl bg-ios-bg border border-ios-line space-y-3">
                      <div className="space-y-1">
                        <div className="font-bold text-xs sm:text-sm text-ios-ink">
                          {isZuordnung ? `Câu ${qIdx + 1}` : `Câu ${qIdx + 1}: ${q.stem}`}
                        </div>
                        {q.stemVi && (
                          <div className="text-xs text-ios-muted">
                            {q.stemVi}
                          </div>
                        )}
                      </div>

                      {isZuordnung ? (
                        <div className="space-y-1.5">
                          <div className="text-xs text-ios-muted italic pb-0.5">
                            Người nói nào nói câu này? (Điền đúng người nói để được điểm)
                          </div>
                          <select
                            value={chosenOpt ?? ''}
                            disabled={showResults}
                            onChange={(e) => handleSelectAnswer(qKey, Number(e.target.value))}
                            className={`w-full p-2.5 rounded-lg border text-xs font-bold cursor-pointer focus:outline-none focus:ring-2 focus:ring-ios-accent/30 ${
                              showResults
                                ? chosenOpt === q.correctIdx
                                  ? 'bg-ios-ok-soft border-ios-ok text-ios-ok'
                                  : 'bg-ios-bad-soft border-ios-bad text-ios-bad'
                                : 'bg-white border-ios-line text-ios-ink'
                            }`}
                          >
                            <option value="" disabled>Chọn người nói…</option>
                            {q.options.map((o, oi) => (
                              <option key={oi} value={oi}>{speakerLabel(o.de)}</option>
                            ))}
                          </select>
                          {showResults && (
                            <div className="text-[11px] font-bold text-ios-ok flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Đáp án: {speakerLabel(q.options[q.correctIdx].de)}</span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-1.5">
                          {q.options.map((opt, optIdx) => {
                            const isChosen = chosenOpt === optIdx;
                            const isThisCorrect = opt.correct;

                            let optClass = 'bg-white border-ios-line text-ios-ink hover:border-ios-accent';
                            if (showResults) {
                              if (isThisCorrect) optClass = 'bg-ios-ok-soft border-ios-ok text-ios-ok font-bold';
                              else if (isChosen && !isThisCorrect) optClass = 'bg-ios-bad-soft border-ios-bad text-ios-bad';
                            } else if (isChosen) {
                              optClass = 'bg-ios-accent-soft border-ios-accent text-ios-accent font-bold';
                            }

                            return (
                              <button
                                key={optIdx}
                                onClick={() => handleSelectAnswer(qKey, optIdx)}
                                className={`w-full text-left p-2.5 rounded-lg border text-xs transition-all flex items-start justify-between gap-2 cursor-pointer ${optClass}`}
                              >
                                <div className="space-y-0.5">
                                  <div>{letter(optIdx)}. {opt.de}</div>
                                  {opt.vi && <div className="text-[11px] opacity-75">{opt.vi}</div>}
                                </div>
                                {showResults && isThisCorrect && <CheckCircle2 className="w-4 h-4 text-ios-ok shrink-0 mt-0.5" />}
                                {showResults && isChosen && !isThisCorrect && <XCircle className="w-4 h-4 text-ios-bad shrink-0 mt-0.5" />}
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {/* AI Explanation */}
                      {showResults && (
                        <div className="pt-1 border-t border-ios-line">
                          {!expl ? (
                            <button
                              onClick={() => handleExplain(qKey, qIdx)}
                              disabled={explainingKey === qKey}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-ios-accent-soft border border-ios-accent/30 text-ios-accent text-xs font-bold hover:bg-[#DDEBFF] transition-colors cursor-pointer disabled:opacity-60"
                            >
                              <Bot className="w-3.5 h-3.5" />
                              {explainingKey === qKey ? 'Đang giải thích…' : 'Giải thích đáp án'}
                            </button>
                          ) : (
                            <div className="text-xs space-y-1.5">
                              <div className="font-bold text-ios-accent flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5" />
                                Giải thích đáp án
                              </div>
                              <div className="text-ios-secondary leading-relaxed">{expl.explanation}</div>
                              {expl.translation && (
                                <div className="text-ios-muted italic">{expl.translation}</div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center gap-3">
                {!showResults ? (
                  <button
                    onClick={() => setShowResults(true)}
                    className="flex-1 py-3 px-4 rounded-lg bg-ios-accent hover:bg-[#0A6FE0] text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Nộp Bài & Xem Điểm Số</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setShowResults(false);
                      setExplanations({});
                    }}
                    className="flex-1 py-3 px-4 rounded-lg bg-ios-bg hover:bg-ios-accent-soft text-ios-ink font-bold text-sm border border-ios-line transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Làm Lại Đề Này</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
