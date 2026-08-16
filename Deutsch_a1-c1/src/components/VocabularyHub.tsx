import React, { useState, useMemo, useRef } from 'react';
import {
  Search,
  Volume2,
  RotateCw,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List,
  Upload,
  Camera,
  Sparkles,
  Bot,
  RefreshCw,
  Award,
  FileText,
  X,
  PlusCircle
} from 'lucide-react';
import rawVocabList from '../data/tu_vung_6000.json';
import { gradeVocabHandwritingOrText, VocabHandwritingGradeResult } from '../services/geminiService';
import { getLearnDB, getStoredPlayer } from '../services/learnDB';

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

const SPECIALTY_META: { id: string; label: string }[] = [
  { id: 'ALL', label: 'Tất cả chuyên ngành' },
  { id: 'koch', label: 'Bếp (Koch)' },
  { id: 'restaurant', label: 'Nhà hàng (Restaurant)' },
  { id: 'pflege', label: 'Điều dưỡng (Pflege)' },
];

export const VocabularyHub: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('A1');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('ALL');
  const [mode, setMode] = useState<'drill' | 'ai_grade' | 'custom_drill' | 'flashcard' | 'list'>('drill');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Drill Mode State
  const [drillInput, setDrillInput] = useState('');
  const [drillRepeats, setDrillRepeats] = useState(0);
  const [drillTarget] = useState(3);
  const [drillError, setDrillError] = useState<string | null>(null);
  const [drillSuccessAnim, setDrillSuccessAnim] = useState(false);
  const [drillStats, setDrillStats] = useState({ completed: 0, mistakes: 0 });

  // Custom Vocab Drill State
  const [customInputText, setCustomInputText] = useState(
    'der Apfel - quả táo\ndas Buch - quyển sách\ndie Schule - trường học\nder Tisch - cái bàn\ndas Haus - ngôi nhà'
  );
  const [customVocabList, setCustomVocabList] = useState<VocabItem[] | null>(null);

  // AI Handwriting & Text Grader State
  const [aiInputText, setAiInputText] = useState('');
  const [selectedImageBase64, setSelectedImageBase64] = useState<string | null>(null);
  const [isGrading, setIsGrading] = useState(false);
  const [gradeResult, setGradeResult] = useState<VocabHandwritingGradeResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const baseVocabList: VocabItem[] = (rawVocabList as { totalWords: number; vocabularyList: VocabItem[] }).vocabularyList;
  const activeVocabSource = customVocabList || baseVocabList;

  // Filter vocabulary by Level, Specialty and Search
  const filteredVocab = useMemo(() => {
    return activeVocabSource.filter((item) => {
      const de = item.german || item.word || '';
      const vi = item.vietnamese || item.meaning || '';
      const level = item.level || 'A1';
      const specialty = item.specialty || '';

      const matchSearch = de.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          vi.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          specialty.toLowerCase().includes(searchTerm.toLowerCase());

      const matchLevel = customVocabList
        ? true
        : selectedLevel === 'ALL'
          ? true
          : level.toUpperCase() === selectedLevel.toUpperCase();

      const matchSpecialty = customVocabList
        ? true
        : selectedSpecialty === 'ALL'
          ? true
          : specialty === selectedSpecialty;

      return matchSearch && matchLevel && matchSpecialty;
    });
  }, [activeVocabSource, searchTerm, selectedLevel, selectedSpecialty, customVocabList]);

  const currentWord: VocabItem = filteredVocab[currentCardIndex] || filteredVocab[0] || {
    german: 'das Ziel',
    vietnamese: 'mục tiêu, đích đến',
    exampleDe: 'Mein Sprachziel ist das A1-Zertifikat.',
    exampleVi: 'Mục tiêu ngôn ngữ của tôi là chứng chỉ A1.',
    level: 'A1'
  };

  const currentDe = (currentWord.german || currentWord.word || '').trim();
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
    setDrillInput('');
    setDrillRepeats(0);
    setDrillError(null);
    setCurrentCardIndex((prev) => (prev + 1) % (filteredVocab.length || 1));
  };

  const prevCard = () => {
    setIsFlipped(false);
    setDrillInput('');
    setDrillRepeats(0);
    setDrillError(null);
    setCurrentCardIndex((prev) => (prev - 1 + filteredVocab.length) % (filteredVocab.length || 1));
  };

  // Check drill input
  const handleDrillSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const typed = drillInput.trim();
    if (!typed) return;

    const normalizeDe = (s: string) => s.toLowerCase().replace(/\s+/g, ' ').trim();
    const isCorrect = normalizeDe(typed) === normalizeDe(currentDe);

    if (isCorrect) {
      speakGerman(currentDe);
      const nextRepeats = drillRepeats + 1;
      setDrillError(null);

      if (nextRepeats >= drillTarget) {
        // Completed this word!
        setDrillSuccessAnim(true);
        setDrillStats(prev => ({ ...prev, completed: prev.completed + 1 }));
        
        // Save progress to Supabase / localStorage
        try {
          const playerName = getStoredPlayer();
          if (playerName) {
            getLearnDB().then((db) => {
              db.saveVocabDrillProgress(playerName, {
                wordId: currentWord.id || currentDe,
                german: currentDe,
                vietnamese: currentVi,
                level: currentWord.level || selectedLevel,
                specialty: currentWord.specialty || selectedSpecialty,
                repeats: nextRepeats,
                mistakes: drillStats.mistakes
              }).catch(() => {});
            }).catch(() => {});
          }
        } catch (_) {}

        setTimeout(() => {
          setDrillSuccessAnim(false);
          nextCard();
        }, 900);
      } else {
        setDrillRepeats(nextRepeats);
        setDrillInput('');
      }
    } else {
      setDrillStats(prev => ({ ...prev, mistakes: prev.mistakes + 1 }));
      setDrillError(`Chưa chính xác! Từ đúng là: "${currentDe}". Bạn cần gõ lại từ đầu!`);
      setDrillRepeats(0);
    }
  };

  const insertSpecialChar = (char: string) => {
    setDrillInput(prev => prev + char);
  };

  // Handle Image Upload for AI Vision Grading
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setSelectedImageBase64(event.target?.result as string);
      setGradeResult(null);
    };
    reader.readAsDataURL(file);
  };

  // Trigger AI Grading
  const handleRunAIGrading = async () => {
    if (!selectedImageBase64 && !aiInputText.trim()) {
      alert('Vui lòng chụp/tải ảnh bài chép tay hoặc dán danh sách từ vựng vào ô nhập liệu!');
      return;
    }

    setIsGrading(true);
    try {
      const res = await gradeVocabHandwritingOrText({
        imageBase64: selectedImageBase64 || undefined,
        text: aiInputText.trim() || undefined,
        level: selectedLevel
      });
      setGradeResult(res);

      // Save AI grade progress
      try {
        const playerName = getStoredPlayer();
        if (playerName) {
          getLearnDB().then((db) => {
            db.saveVocabDrillProgress(playerName, {
              wordId: 'ai-exam-' + Date.now(),
              german: `Chấm bài AI (${res.correctWordsCount}/${res.totalWordsChecked} từ)`,
              vietnamese: `Điểm: ${res.score}%`,
              level: selectedLevel,
              specialty: selectedSpecialty,
              repeats: 3,
              mistakes: res.totalWordsChecked - res.correctWordsCount
            }).catch(() => {});
          }).catch(() => {});
        }
      } catch (_) {}

    } catch (e) {
      console.error(e);
      alert('Không thể chấm bài lúc này. Vui lòng kiểm tra lại kết nối!');
    } finally {
      setIsGrading(false);
    }
  };

  // Parse custom pasted vocab
  const handleStartCustomDrill = () => {
    const lines = customInputText.split('\n').map(l => l.trim()).filter(Boolean);
    if (!lines.length) {
      alert('Vui lòng nhập ít nhất 1 từ vựng!');
      return;
    }

    const parsed: VocabItem[] = lines.map((line, idx) => {
      const parts = line.split(/[-–:=]/);
      const de = parts[0]?.trim() || line;
      const vi = parts[1]?.trim() || 'Nghĩa tiếng Việt';
      return {
        id: `custom-${idx}`,
        german: de,
        vietnamese: vi,
        level: selectedLevel,
        specialty: 'custom'
      };
    });

    setCustomVocabList(parsed);
    setCurrentCardIndex(0);
    setDrillInput('');
    setDrillRepeats(0);
    setMode('drill');
  };

  return (
    <div className="space-y-4 pb-16">
      {/* Compact Header & Mode Switcher */}
      <div className="rounded-2xl bg-white border border-ios-line p-3 sm:p-4 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="hidden md:block">
          <h2 className="text-lg font-extrabold font-display text-ios-ink flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-ios-accent" />
            <span>Kỷ Luật Chép Từ Vựng & AI Chấm Bài</span>
          </h2>
          <p className="text-ios-secondary text-xs mt-0.5">
            Luyện chép chính xác từ vựng theo trình độ hoặc chụp ảnh vở chép để Gemini AI chấm điểm.
          </p>
        </div>

        {/* View Mode Toggle (Sleek Horizontal Scroll on Mobile) */}
        <div className="flex items-center bg-ios-bg p-1 rounded-xl border border-ios-line overflow-x-auto scrollbar-none gap-1">
          <button
            onClick={() => setMode('drill')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 ${
              mode === 'drill' ? 'bg-ios-accent text-white shadow-xs' : 'text-ios-secondary hover:text-ios-ink'
            }`}
          >
            <span>✍️ Chép Từ (Drill)</span>
          </button>
          <button
            onClick={() => setMode('ai_grade')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 ${
              mode === 'ai_grade' ? 'bg-purple-600 text-white shadow-xs' : 'text-ios-secondary hover:text-ios-ink'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>📷 AI Chấm Bài</span>
          </button>
          <button
            onClick={() => setMode('custom_drill')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 ${
              mode === 'custom_drill' ? 'bg-white text-ios-accent shadow-xs' : 'text-ios-secondary hover:text-ios-ink'
            }`}
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>📋 Dán Từ Riêng</span>
          </button>
          <button
            onClick={() => setMode('flashcard')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 ${
              mode === 'flashcard' ? 'bg-white text-ios-accent shadow-xs' : 'text-ios-secondary hover:text-ios-ink'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Flashcard</span>
          </button>
          <button
            onClick={() => setMode('list')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 ${
              mode === 'list' ? 'bg-white text-ios-accent shadow-xs' : 'text-ios-secondary hover:text-ios-ink'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>Danh Sách</span>
          </button>
        </div>
      </div>

      {/* Level Selection Bar (Compact Mobile First) */}
      <div className="rounded-2xl bg-white border border-ios-line p-3 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-0.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-ios-muted shrink-0 hidden sm:inline mr-1">
            Trình độ:
          </span>
          {[
            { id: 'A1', label: '🟢 A1' },
            { id: 'A2', label: '🔵 A2' },
            { id: 'B1', label: '🟡 B1' },
            { id: 'B2', label: '🟣 B2' },
            { id: 'ALL', label: 'Tất Cả' }
          ].map((lvl) => (
            <button
              key={lvl.id}
              onClick={() => {
                setSelectedLevel(lvl.id);
                setCustomVocabList(null);
                setCurrentCardIndex(0);
                setDrillRepeats(0);
                setDrillError(null);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedLevel === lvl.id && !customVocabList
                  ? 'bg-ios-accent text-white shadow-xs'
                  : 'bg-ios-bg text-ios-secondary border border-ios-line hover:bg-ios-line/50'
              }`}
            >
              {lvl.label}
            </button>
          ))}
        </div>

        {/* Search and Specialty Filter */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
          <div className="relative flex-1 sm:w-44">
            <Search className="w-3.5 h-3.5 text-ios-muted absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm từ vựng..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentCardIndex(0);
              }}
              className="w-full bg-ios-bg border border-ios-line rounded-xl pl-8 pr-2.5 py-1.5 text-xs text-ios-ink focus:outline-none focus:border-ios-accent"
            />
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {SPECIALTY_META.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setSelectedSpecialty(s.id);
                  setCustomVocabList(null);
                  setCurrentCardIndex(0);
                }}
                className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all shrink-0 cursor-pointer ${
                  selectedSpecialty === s.id && !customVocabList
                    ? 'bg-purple-100 text-purple-800 border border-purple-300 font-bold'
                    : 'bg-white text-ios-secondary border border-ios-line hover:bg-ios-bg'
                }`}
              >
                {s.label.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Custom List Banner if Active */}
      {customVocabList && (
        <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-between text-xs font-bold text-purple-900">
          <span>Đang luyện tập danh sách tự chọn ({customVocabList.length} từ)</span>
          <button
            onClick={() => setCustomVocabList(null)}
            className="text-purple-700 hover:text-purple-900 underline cursor-pointer"
          >
            Quay lại kho từ chuẩn {selectedLevel}
          </button>
        </div>
      )}

      {/* ==================== 1. TYPING REPETITION DRILL MODE ==================== */}
      {mode === 'drill' && (
        <div className="max-w-xl mx-auto space-y-5 pt-2">
          {/* Progress Header */}
          <div className="bg-white border border-ios-line rounded-2xl p-4 shadow-xs flex items-center justify-between text-xs font-bold">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                ✓ Đã thuộc: <b>{drillStats.completed}</b> từ
              </span>
              <span className="px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                Lỗi sai: <b>{drillStats.mistakes}</b>
              </span>
            </div>
            <div className="text-ios-muted">
              Từ số {currentCardIndex + 1} / {filteredVocab.length} (Trình độ {currentWord.level || selectedLevel})
            </div>
          </div>

          {/* Drill Card */}
          <div className={`bg-white border-2 rounded-3xl p-6 sm:p-8 shadow-sm text-center space-y-6 transition-all ${
            drillSuccessAnim ? 'border-emerald-500 bg-emerald-50/30' : 'border-ios-line'
          }`}>
            {/* Badges & Pronunciation */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-ios-accent-soft text-ios-accent font-bold text-xs">
                  {currentWord.level || selectedLevel}
                </span>
                {currentWord.specialty && currentWord.specialty !== 'all' && (
                  <span className="px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-xs font-bold">
                    {currentWord.specialty}
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={() => speakGerman(currentDe)}
                className="p-2.5 rounded-full bg-ios-bg hover:bg-ios-accent-soft text-ios-accent transition-all cursor-pointer"
                title="Nghe phát âm chuẩn"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            {/* Vietnamese Meaning Prompt */}
            <div className="space-y-1 py-2">
              <div className="text-xs uppercase tracking-wider text-ios-muted font-bold">Nghĩa Tiếng Việt</div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-ios-ink">{currentVi}</h3>
              {currentExVi && <p className="text-xs text-ios-secondary italic">Ví dụ: {currentExVi}</p>}
            </div>

            {/* Repetition Indicators (1/3, 2/3, 3/3) */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-ios-secondary">
                Yêu cầu: Gõ đúng 3 lần liên tiếp ({drillRepeats} / {drillTarget})
              </div>
              <div className="flex items-center justify-center gap-3">
                {[1, 2, 3].map((num) => (
                  <div
                    key={num}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-sm border transition-all ${
                      drillRepeats >= num
                        ? 'bg-emerald-500 text-white border-emerald-600 shadow-sm scale-105'
                        : 'bg-ios-bg text-ios-muted border-ios-line'
                    }`}
                  >
                    {drillRepeats >= num ? '✓' : num}
                  </div>
                ))}
              </div>
            </div>

            {/* German Special Characters Toolbar */}
            <div className="flex items-center justify-center gap-1.5 flex-wrap pt-1">
              <span className="text-[11px] font-bold text-ios-muted mr-1">Ký tự Đức:</span>
              {['ä', 'ö', 'ü', 'ß', 'Ä', 'Ö', 'Ü'].map((ch) => (
                <button
                  key={ch}
                  type="button"
                  onClick={() => insertSpecialChar(ch)}
                  className="w-8 h-8 rounded-lg bg-ios-bg hover:bg-ios-accent hover:text-white text-ios-ink font-bold text-xs border border-ios-line transition-all cursor-pointer"
                >
                  {ch}
                </button>
              ))}
            </div>

            {/* Typing Input Form */}
            <form onSubmit={handleDrillSubmit} className="space-y-3">
              <input
                type="text"
                value={drillInput}
                onChange={(e) => setDrillInput(e.target.value)}
                placeholder="Gõ từ tiếng Đức (ví dụ: das Ziel)..."
                autoFocus
                className="w-full bg-ios-bg border-2 border-ios-line focus:border-ios-accent rounded-2xl px-4 py-3 text-center text-lg sm:text-xl font-bold text-ios-ink placeholder-ios-muted focus:outline-none transition-all"
              />

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-ios-accent hover:bg-[#0A6FE0] text-white font-extrabold text-sm shadow-sm transition-all cursor-pointer"
              >
                Kiểm Tra & Xác Nhận (Enter ↵)
              </button>
            </form>

            {/* Error / Correction Display */}
            {drillError && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold text-left animate-in fade-in">
                ⚠️ {drillError}
              </div>
            )}
          </div>

          {/* Navigation Bottom */}
          <div className="flex items-center justify-between">
            <button
              onClick={prevCard}
              className="px-4 py-2 rounded-xl bg-white border border-ios-line text-ios-secondary hover:text-ios-ink text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> Từ trước
            </button>
            <button
              onClick={nextCard}
              className="px-4 py-2 rounded-xl bg-white border border-ios-line text-ios-secondary hover:text-ios-ink text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              Bỏ qua / Từ sau <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ==================== 2. AI HANDWRITING & TEXT GRADER MODE ==================== */}
      {mode === 'ai_grade' && (
        <div className="max-w-2xl mx-auto space-y-6 pt-2">
          <div className="bg-white border border-ios-line rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-purple-100 text-purple-700">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-ios-ink font-display">
                  Gemini AI Chấm Vở Chép & Kiểm Tra Từ Vựng
                </h3>
                <p className="text-xs text-ios-secondary">
                  Chụp ảnh bài viết tay hoặc dán bài chép để AI kiểm tra mạo từ, chữ hoa và lỗi chính tả.
                </p>
              </div>
            </div>

            {/* Option 1: Image Upload / Camera */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-ios-muted flex items-center gap-2">
                <Camera className="w-4 h-4 text-purple-600" />
                <span>Cách 1: Chụp Ảnh Vở Chép Hoặc Tải File Ảnh Lên</span>
              </label>

              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-purple-200 hover:border-purple-400 bg-purple-50/40 rounded-2xl p-6 text-center cursor-pointer transition-all space-y-2"
              >
                <Upload className="w-8 h-8 text-purple-600 mx-auto" />
                <div className="text-xs sm:text-sm font-bold text-purple-900">
                  Chạm để chụp ảnh hoặc chọn ảnh từ thiết bị
                </div>
                <div className="text-[11px] text-purple-600">
                  Hỗ trợ định dạng JPG, PNG, WEBP (chụp rõ nét chữ viết tay)
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileChange}
                  className="hidden"
                />
              </div>

              {selectedImageBase64 && (
                <div className="relative rounded-2xl overflow-hidden border border-ios-line max-h-60 bg-black/5">
                  <img
                    src={selectedImageBase64}
                    alt="Xem trước bài chép"
                    className="w-full h-auto object-contain max-h-60"
                  />
                  <button
                    type="button"
                    onClick={() => setSelectedImageBase64(null)}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:bg-black cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Option 2: Textarea input */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-ios-muted flex items-center gap-2">
                <FileText className="w-4 h-4 text-ios-accent" />
                <span>Cách 2: Hoặc Dán Văn Bản Bài Chép Từ Vựng</span>
              </label>
              <textarea
                rows={4}
                value={aiInputText}
                onChange={(e) => setAiInputText(e.target.value)}
                placeholder="Dán các từ vựng đã chép vào đây...&#10;Ví dụ:&#10;der Apfel - quả táo&#10;das Buch - quyển sách"
                className="w-full bg-ios-bg border border-ios-line rounded-xl p-3.5 text-xs sm:text-sm font-mono text-ios-ink focus:outline-none focus:border-ios-accent"
              />
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleRunAIGrading}
              disabled={isGrading}
              className="w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-sm shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 transition-all"
            >
              {isGrading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Gemini AI đang đọc chữ và chấm bài...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Chấm & Soi Lỗi Bài Chép Ngay</span>
                </>
              )}
            </button>
          </div>

          {/* AI Result Card */}
          {gradeResult && (
            <div className="bg-white border-2 border-purple-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in">
              {/* Score Header */}
              <div className="flex items-center justify-between border-b border-ios-line pb-4">
                <div>
                  <div className="text-xs uppercase tracking-wider text-ios-muted font-bold">Kết Quả Chấm Điểm</div>
                  <h4 className="text-xl sm:text-2xl font-extrabold text-ios-ink font-display">
                    {gradeResult.summary}
                  </h4>
                </div>
                <div className="px-4 py-2 rounded-2xl bg-purple-100 border border-purple-300 text-center">
                  <div className="text-2xl sm:text-3xl font-extrabold text-purple-700">{gradeResult.score}%</div>
                  <div className="text-[10px] font-bold text-purple-600">ĐIỂM ĐẠT</div>
                </div>
              </div>

              {/* Transcribed text */}
              {gradeResult.transcribedText && (
                <div className="p-4 rounded-xl bg-ios-bg border border-ios-line space-y-1.5">
                  <div className="text-xs font-bold text-ios-muted uppercase">Chữ Nhận Diện Được:</div>
                  <div className="text-xs sm:text-sm font-mono text-ios-ink whitespace-pre-line">
                    {gradeResult.transcribedText}
                  </div>
                </div>
              )}

              {/* Word Feedback Breakdown */}
              <div className="space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-ios-muted">
                  Chi Tiết Từng Từ & Phân Tích Lỗi:
                </div>
                <div className="divide-y divide-ios-line border border-ios-line rounded-2xl overflow-hidden">
                  {gradeResult.wordFeedback.map((wf, idx) => (
                    <div key={idx} className="p-4 flex items-start justify-between gap-4 bg-white hover:bg-ios-bg">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs sm:text-sm text-ios-ink font-mono">
                            {wf.original}
                          </span>
                          {wf.status === 'correct' ? (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                              ✓ Chính xác
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800">
                              ⚠️ {wf.errorType || 'Lỗi'}
                            </span>
                          )}
                        </div>

                        {wf.status !== 'correct' && (
                          <div className="text-xs font-bold text-emerald-700 font-mono">
                            Sửa đúng: {wf.correction}
                          </div>
                        )}

                        <div className="text-xs text-ios-secondary">
                          {wf.explanation}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Teacher Advice */}
              {gradeResult.teacherAdvice && (
                <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 text-xs text-purple-900 flex items-start gap-2.5">
                  <Award className="w-5 h-5 text-purple-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Lời khuyên của giáo viên: </span>
                    {gradeResult.teacherAdvice}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ==================== 3. CUSTOM DRILL INPUT MODE ==================== */}
      {mode === 'custom_drill' && (
        <div className="max-w-xl mx-auto space-y-6 pt-2">
          <div className="bg-white border border-ios-line rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
            <div className="space-y-1">
              <h3 className="text-xl font-extrabold text-ios-ink font-display">
                Dán / Nhập Danh Sách Từ Vựng Cần Chép
              </h3>
              <p className="text-xs text-ios-secondary">
                Dán bài tập từ vựng thầy cô giao hoặc các từ bạn muốn thuộc hôm nay để tạo bài gõ lặp 3 lần.
              </p>
            </div>

            <textarea
              rows={8}
              value={customInputText}
              onChange={(e) => setCustomInputText(e.target.value)}
              placeholder="Nhập theo mẫu:&#10;der Apfel - quả táo&#10;das Buch - quyển sách&#10;die Schule - trường học"
              className="w-full bg-ios-bg border border-ios-line rounded-2xl p-4 text-xs sm:text-sm font-mono text-ios-ink focus:outline-none focus:border-ios-accent"
            />

            <button
              type="button"
              onClick={handleStartCustomDrill}
              className="w-full py-3.5 rounded-xl bg-ios-accent hover:bg-[#0A6FE0] text-white font-extrabold text-sm shadow-sm cursor-pointer transition-all"
            >
              Bắt Đầu Luyện Chép Bộ Này (3 Vòng/Từ) →
            </button>
          </div>
        </div>
      )}

      {/* ==================== 4. FLASHCARD MODE ==================== */}
      {mode === 'flashcard' && (
        <div className="flex flex-col items-center max-w-xl mx-auto space-y-6 pt-4">
          <div className="text-xs font-bold text-ios-muted uppercase tracking-wider">
            Thẻ {currentCardIndex + 1} / {filteredVocab.length} (Trình độ {selectedLevel})
          </div>

          {/* 3D Flip Card Container */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full h-80 sm:h-96 rounded-3xl bg-white border border-ios-line p-8 shadow-md flex flex-col items-center justify-between text-center cursor-pointer relative select-none hover:shadow-lg transition-shadow"
          >
            {/* Top Bar on Card */}
            <div className="w-full flex items-center justify-between z-10">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-ios-accent-soft text-ios-accent border border-ios-accent/20 text-xs font-bold uppercase">
                  {currentWord.level || selectedLevel}
                </span>
                {currentWord.specialty && currentWord.specialty !== 'all' && (
                  <span className="px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-[11px] font-bold">
                    {currentWord.specialty}
                  </span>
                )}
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  speakGerman(currentDe);
                }}
                className="p-2.5 rounded-full bg-ios-bg hover:bg-ios-accent-soft text-ios-secondary hover:text-ios-accent transition-colors"
                title="Nghe phát âm"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            {/* Card Content (Front vs Back) */}
            <div className="my-auto space-y-4">
              {!isFlipped ? (
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-ios-muted">Tiếng Đức</span>
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-ios-ink font-display">
                    {currentDe}
                  </h3>
                  {currentExDe && (
                    <p className="text-xs sm:text-sm text-ios-secondary italic max-w-sm mx-auto pt-2">
                      "{currentExDe}"
                    </p>
                  )}
                </div>
              ) : (
                <div className="space-y-2 animate-in fade-in zoom-in-95 duration-200">
                  <span className="text-xs font-bold uppercase tracking-widest text-ios-accent">Tiếng Việt</span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-ios-accent">
                    {currentVi}
                  </h3>
                  {currentExVi && (
                    <p className="text-xs sm:text-sm text-ios-secondary max-w-sm mx-auto pt-2">
                      "{currentExVi}"
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Flip Hint */}
            <div className="flex items-center gap-1.5 text-xs text-ios-muted font-bold">
              <RotateCw className="w-3.5 h-3.5" />
              <span>Chạm để lật mặt thẻ</span>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={prevCard}
              className="px-5 py-3 rounded-xl bg-white border border-ios-line hover:bg-ios-bg text-ios-secondary font-bold text-sm shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Từ Trước</span>
            </button>

            <button
              onClick={() => speakGerman(currentDe)}
              className="p-3.5 rounded-xl bg-white border border-ios-line hover:bg-ios-accent-soft text-ios-secondary hover:text-ios-accent shadow-xs cursor-pointer transition-colors"
              title="Phát âm"
            >
              <Volume2 className="w-5 h-5" />
            </button>

            <button
              onClick={nextCard}
              className="px-5 py-3 rounded-xl bg-ios-accent hover:bg-[#0A6FE0] text-white font-bold text-sm shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <span>Từ Kế Tiếp</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ==================== 5. LIST VIEW MODE ==================== */}
      {mode === 'list' && (
        <div className="rounded-2xl bg-white border border-ios-line shadow-sm overflow-hidden">
          <div className="p-4 border-b border-ios-line flex items-center justify-between text-xs font-bold text-ios-muted uppercase tracking-wider">
            <span>Tổng cộng: {filteredVocab.length} từ vựng ({selectedLevel})</span>
            <span>Chạm loa để nghe phát âm</span>
          </div>

          <div className="divide-y divide-ios-line max-h-[600px] overflow-y-auto">
            {filteredVocab.map((item, idx) => {
              const de = item.german || item.word || '';
              const vi = item.vietnamese || item.meaning || '';
              const lvl = item.level || selectedLevel;
              const exDe = item.exampleDe;
              const exVi = item.exampleVi;

              return (
                <div
                  key={idx}
                  className="p-4 hover:bg-ios-bg transition-colors flex items-start justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <span className="text-sm sm:text-base font-bold text-ios-ink">
                        {item.article && <span className="text-ios-accent mr-1">{item.article}</span>}
                        {de}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-ios-accent-soft text-ios-accent border border-ios-accent/20">
                        {lvl}
                      </span>
                    </div>

                    <div className="text-xs sm:text-sm text-ios-secondary font-medium">
                      {vi}
                    </div>

                    {exDe && (
                      <div className="text-xs text-ios-muted italic pt-0.5">
                        "{exDe}" {exVi && <span className="not-italic text-ios-muted">({exVi})</span>}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => speakGerman(de)}
                    className="p-2.5 rounded-lg bg-ios-bg hover:bg-ios-accent-soft text-ios-secondary hover:text-ios-accent transition-colors shrink-0 cursor-pointer border border-ios-line"
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
