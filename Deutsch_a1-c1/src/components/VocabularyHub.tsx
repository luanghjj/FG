import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Volume2, 
  RotateCw, 
  BookOpen, 
  ChevronLeft, 
  ChevronRight
} from 'lucide-react';
import rawVocabList from '../data/tu_vung_curated.json';

interface VocabItem {
  id?: string;
  german?: string;
  word?: string;
  vietnamese?: string;
  meaning?: string;
  article?: string;
  exampleDe?: string;
  exampleVi?: string;
  level?: string;
  specialty?: string;
  theme?: string;
}

export const VocabularyHub: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('ALL');
  const [mode, setMode] = useState<'flashcard' | 'list'>('flashcard');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const vocabList: VocabItem[] = rawVocabList as VocabItem[];

  // Filter vocabulary
  const filteredVocab = useMemo(() => {
    return vocabList.filter((item) => {
      const de = item.german || item.word || '';
      const vi = item.vietnamese || item.meaning || '';
      const level = item.level || 'B1';
      const specialty = item.specialty || '';

      const matchSearch = de.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          vi.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          specialty.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchLevel = selectedLevel === 'ALL' 
        ? true 
        : selectedLevel === 'PFLEGE' 
        ? specialty.toLowerCase().includes('pflege')
        : level.toUpperCase().includes(selectedLevel);

      return matchSearch && matchLevel;
    });
  }, [vocabList, searchTerm, selectedLevel]);

  const currentWord: VocabItem = filteredVocab[currentCardIndex] || filteredVocab[0] || {
    german: 'das Ziel',
    vietnamese: 'mục tiêu, đích đến',
    exampleDe: 'Mein Sprachziel ist das B1-Zertifikat.',
    exampleVi: 'Mục tiêu ngôn ngữ của tôi là chứng chỉ B1.',
    level: 'B1'
  };

  const currentDe = currentWord.german || currentWord.word || '';
  const currentVi = currentWord.vietnamese || currentWord.meaning || '';
  const currentExDe = currentWord.exampleDe || '';
  const currentExVi = currentWord.exampleVi || '';

  const speakGerman = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'de-DE';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const nextCard = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prev) => (prev + 1) % (filteredVocab.length || 1));
  };

  const prevCard = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prev) => (prev - 1 + filteredVocab.length) % (filteredVocab.length || 1));
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header Banner */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold uppercase mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            Kho Từ Vựng 6.000 Từ & Chuyên Ngành
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
            Flashcard & Tra Cứu Từ Vựng Thông Minh
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl">
            Tích hợp phát âm chuẩn bản xứ, dịch song ngữ Đức - Việt, kèm câu ví dụ thực tế cho các cấp độ A1, A2, B1, B2 và chuyên ngành Điều dưỡng / Bếp.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center bg-slate-800 p-1.5 rounded-2xl border border-slate-700 shrink-0">
          <button
            onClick={() => setMode('flashcard')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              mode === 'flashcard' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            🎴 Thẻ Flashcard
          </button>
          <button
            onClick={() => setMode('list')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              mode === 'list' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            📋 Danh Sách Từ
          </button>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentCardIndex(0); }}
            placeholder="Tìm từ vựng tiếng Đức hoặc nghĩa tiếng Việt..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm"
          />
        </div>

        {/* Level Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {['ALL', 'A1', 'A2', 'B1', 'B2', 'PFLEGE'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => { setSelectedLevel(lvl); setCurrentCardIndex(0); }}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedLevel === lvl
                  ? 'bg-slate-900 dark:bg-amber-500 text-white dark:text-slate-950 shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
              }`}
            >
              {lvl === 'PFLEGE' ? 'Điều Dưỡng' : lvl}
            </button>
          ))}
        </div>
      </div>

      {/* FLASHCARD MODE */}
      {mode === 'flashcard' && (
        <div className="flex flex-col items-center max-w-xl mx-auto space-y-6 pt-4">
          {/* Card Counter */}
          <div className="text-xs font-bold text-slate-500 dark:text-slate-400">
            Thẻ {currentCardIndex + 1} / {filteredVocab.length || 1}
          </div>

          {/* Flip Card Container */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full min-h-[340px] rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-8 flex flex-col justify-between items-center text-center cursor-pointer relative overflow-hidden transition-all hover:border-amber-500/50 group select-none"
          >
            {/* Top Bar on Card */}
            <div className="w-full flex items-center justify-between z-10">
              <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-bold uppercase">
                {currentWord.level || 'B1'}
              </span>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  speakGerman(currentDe);
                }}
                className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-amber-500/20 text-slate-700 dark:text-slate-200 hover:text-amber-500 flex items-center justify-center transition-colors cursor-pointer"
                title="Phát âm từ này"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            {/* Main Center Content */}
            <div className="my-auto space-y-3 z-10">
              {!isFlipped ? (
                <>
                  <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight">
                    {currentWord.article && <span className="text-amber-500 mr-2 text-2xl font-bold">{currentWord.article}</span>}
                    {currentDe}
                  </div>
                  <p className="text-xs text-slate-400 font-medium pt-2">
                    (Chạm hoặc nhấp vào thẻ để xem nghĩa tiếng Việt)
                  </p>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-4"
                >
                  <div className="text-2xl sm:text-3xl font-bold text-amber-600 dark:text-amber-400 font-display">
                    {currentVi}
                  </div>

                  {currentExDe && (
                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-700 dark:text-slate-300 italic max-w-md space-y-1">
                      <div>"{currentExDe}"</div>
                      {currentExVi && <div className="text-xs text-slate-400 not-italic">👉 {currentExVi}</div>}
                    </div>
                  )}
                </motion.div>
              )}
            </div>

            {/* Bottom Flip Indicator */}
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium z-10">
              <RotateCw className="w-3.5 h-3.5" />
              <span>{isFlipped ? 'Quay lại tiếng Đức' : 'Lật xem tiếng Việt'}</span>
            </div>

            {/* Background Aesthetic Glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={prevCard}
              className="px-5 py-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-sm shadow-sm hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Từ Trước</span>
            </button>

            <button
              onClick={() => speakGerman(currentDe)}
              className="p-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-lg shadow-amber-500/20 cursor-pointer"
              title="Nghe phát âm"
            >
              <Volume2 className="w-5 h-5" />
            </button>

            <button
              onClick={nextCard}
              className="px-5 py-3 rounded-2xl bg-slate-900 dark:bg-amber-500 text-white dark:text-slate-950 font-bold text-sm shadow-sm hover:bg-slate-800 dark:hover:bg-amber-400 flex items-center gap-2 cursor-pointer"
            >
              <span>Từ Kế Tiếp</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* LIST VIEW MODE */}
      {mode === 'list' && (
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            <span>Tổng cộng: {filteredVocab.length} từ vựng</span>
            <span>Chạm loa để nghe phát âm</span>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-[600px] overflow-y-auto">
            {filteredVocab.map((item, idx) => {
              const de = item.german || item.word || '';
              const vi = item.vietnamese || item.meaning || '';
              const lvl = item.level || 'B1';
              const exDe = item.exampleDe;
              const exVi = item.exampleVi;

              return (
                <div 
                  key={idx}
                  className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex items-start justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                        {item.article && <span className="text-amber-500 mr-1">{item.article}</span>}
                        {de}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                        {lvl}
                      </span>
                    </div>

                    <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">
                      {vi}
                    </div>

                    {exDe && (
                      <div className="text-xs text-slate-400 italic pt-0.5">
                        "{exDe}" {exVi && <span className="not-italic text-slate-500">({exVi})</span>}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => speakGerman(de)}
                    className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-amber-500/20 text-slate-600 dark:text-slate-300 hover:text-amber-500 transition-colors shrink-0 cursor-pointer"
                    title="Nghe phát âm"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
