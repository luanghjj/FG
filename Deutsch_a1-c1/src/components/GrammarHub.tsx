import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  FileText, 
  Search, 
  CheckCircle2, 
  Sparkles, 
  BookOpen, 
  ChevronRight,
  Volume2,
  Table,
  Bot,
  RefreshCw,
  AlertTriangle,
  Lightbulb
} from 'lucide-react';
import rawGrammarData from '../data/NGU_PHAP_86_CHUYEN_DE_A1_B2.json';
import { explainGrammarWithGemini, GrammarExplainResult } from '../services/geminiService';

interface VerbLesson {
  verb: string;
  duStem: string;
  praetStem: string;
  partizip: string;
  aux: string;
  konjStem: string;
}

interface GrammarTopic {
  id: string;
  title: string;
  level: string;
  category: string;
  formula: string;
  rules: string[];
  examples: { de: string; vi: string }[];
}

const masterGrammarTopics: GrammarTopic[] = [
  {
    id: 'passiv',
    title: '1. Thể Bị Động (Das Passiv - Präsens & Präteritum)',
    level: 'B1',
    category: 'Cấu Trúc Câu',
    formula: 'Hiện tại: Subjekt + werden (chia) + ... + Partizip II | Quá khứ: Subjekt + wurden + ... + Partizip II',
    rules: [
      'Chuyển tân ngữ Akkusativ của câu chủ động thành chủ ngữ Nominativ của câu bị động.',
      'Chủ thể hành động: "von + Dativ" (cho người/tác nhân trực tiếp) hoặc "durch + Akkusativ" (cho phương tiện/nguyên nhân).',
      'Động từ "werden" được chia theo chủ ngữ mới và đứng ở vị trí II trong câu chính.'
    ],
    examples: [
      { de: 'Der Mechaniker repariert das Auto.', vi: 'Thợ máy sửa chiếc xe ô tô. (Chủ động)' },
      { de: 'Das Auto wird vom Mechaniker repariert.', vi: 'Chiếc ô tô đang được sửa bởi người thợ máy. (Bị động)' },
      { de: 'Die Brücke wurde im Jahre 1995 gebaut.', vi: 'Cây cầu đã được xây dựng vào năm 1995. (Bị động quá khứ)' }
    ]
  },
  {
    id: 'konjunktiv2',
    title: '2. Giả Định Cách II (Konjunktiv II - Mong Ước & Lịch Sự)',
    level: 'B1',
    category: 'Thì & Thức',
    formula: 'würde + Infinitiv (cho động từ thường) | wäre (sein) | hätte (haben) | könnte / müsste / sollte',
    rules: [
      'Dùng để diễn tả mong ước, giả định không có thật ở hiện tại: "Wenn ich reich wäre, ..."',
      'Dùng để đưa ra lời khuyên lịch sự: "Du solltest mehr schlafen."',
      'Dùng để nhờ vả, yêu cầu vô cùng trang trọng: "Könnten Sie mir bitte helfen? / Würden Sie das Fenster öffnen?"'
    ],
    examples: [
      { de: 'Wenn ich viel Geld hätte, würde ich nach Deutschland reisen.', vi: 'Nếu tôi có nhiều tiền, tôi sẽ đi du lịch Đức.' },
      { de: 'Könnten Sie mir bitte die Speisekarte bringen?', vi: 'Ngài có thể vui lòng mang cho tôi thực đơn được không?' }
    ]
  },
  {
    id: 'relativsatz',
    title: '3. Mệnh Đề Quan Hệ (Relativsätze mit Präpositionen)',
    level: 'B1',
    category: 'Mệnh Đề Phụ',
    formula: 'Hauptsatz, + [Giới từ + Đại từ quan hệ (der/die/das)] + ... + Verb am Ende.',
    rules: [
      'Đại từ quan hệ xác định giống (der/die/das/die Pl.) theo danh từ đứng trước.',
      'Cách (Kasus: Nom/Akk/Dat/Gen) được quyết định bởi giới từ hoặc động từ trong mệnh đề quan hệ.',
      'Động từ được chia luôn nằm ở vị trí CUỐI CÙNG của mệnh đề quan hệ.'
    ],
    examples: [
      { de: 'Das ist der Lehrer, der mir Deutsch beigebracht hat.', vi: 'Đó là người thầy giáo, người đã dạy tôi tiếng Đức. (Nominativ)' },
      { de: 'Das ist die Stadt, in der ich seit zwei Jahren wohne.', vi: 'Đó là thành phố nơi mà tôi đã sống 2 năm nay. (in + Dativ)' }
    ]
  },
  {
    id: 'wechselpraepositionen',
    title: '4. 9 Giới Từ 2 Cách (Wechselpräpositionen - Akkusativ / Dativ)',
    level: 'A2',
    category: 'Giới Từ',
    formula: 'Wohin? (Chuyển động có hướng) -> AKKUSATIV | Wo? (Vị trí tĩnh / tại chỗ) -> DATIV',
    rules: [
      '9 Giới từ gồm: an, auf, hinter, in, neben, über, unter, vor, zwischen.',
      'Cặp động từ chuyển động (Akk): stellen, legen, setzen, hängen (treo lên).',
      'Cặp động từ vị trí tĩnh (Dat): stehen, liegen, sitzen, hängen (đang treo).'
    ],
    examples: [
      { de: 'Ich stelle das Buch auf den Tisch. (Wohin? -> Akkusativ)', vi: 'Tôi đặt quyển sách lên trên bàn.' },
      { de: 'Das Buch liegt auf dem Tisch. (Wo? -> Dativ)', vi: 'Quyển sách đang nằm ở trên bàn.' }
    ]
  },
  {
    id: 'adjektivdeklination',
    title: '5. Chia Đuôi Tính Từ (Adjektivdeklination Typ 1, 2, 3)',
    level: 'A2',
    category: 'Biến Cách',
    formula: 'Typ 1 (mit bestimmtem Artikel) | Typ 2 (mit unbestimmtem Artikel) | Typ 3 (ohne Artikel / Nullartikel)',
    rules: [
      'Với mạo từ xác định (der/die/das): Giống đực Nom/Akk (-e/-en), Giống cái/trung Nom/Akk (-e), Tất cả Dativ/Genitiv/Plural đều thêm đuôi -en.',
      'Với mạo từ không xác định (ein/eine): Tính từ mang đuôi nhận diện giống ở Nominativ (ein schöner Tag, eine schöne Frau, ein schönes Haus).'
    ],
    examples: [
      { de: 'Der nette Mann hilft der alten Dame.', vi: 'Người đàn ông tốt bụng giúp đỡ bà cụ già.' },
      { de: 'Ich habe ein interessantes Buch gelesen.', vi: 'Tôi đã đọc một cuốn sách thú vị.' }
    ]
  },
  {
    id: 'nomen_verb_verbindungen',
    title: '6. Cụm Danh Từ - Động Từ Cố Định (Nomen-Verb-Verbindungen)',
    level: 'B2',
    category: 'Văn Phong Học Thuật',
    formula: 'Nomen + feste Präposition + Funktionsverb',
    rules: [
      'Thay thế động từ đơn giản bằng cụm từ học thuật, là chìa khóa ăn điểm tối đa bài thi B2/C1.',
      'Ví dụ: eine Entscheidung treffen (= sich entscheiden), zur Verfügung stehen (= verfügbar sein).'
    ],
    examples: [
      { de: 'Wir müssen eine Entscheidung treffen.', vi: 'Chúng ta phải đưa ra một quyết định. (= Wir müssen uns entscheiden)' },
      { de: 'Der Chef bringt das Thema zur Sprache.', vi: 'Sếp đề cập đến chủ đề này. (= Der Chef spricht das Thema an)' }
    ]
  },
  {
    id: 'doppelkonnektoren',
    title: '7. Liên Từ Kép (Doppelkonnektoren)',
    level: 'B1',
    category: 'Liên Từ',
    formula: 'nicht nur ... sondern auch | zwar ... aber | entweder ... oder | weder ... noch | je ... desto',
    rules: [
      'nicht nur A, sondern auch B: Không những A mà còn B (Bổ sung)',
      'zwar A, aber B: Tuy A nhưng B (Nhượng bộ)',
      'weder A noch B: Cả A lẫn B đều không (Phủ định cả hai)',
      'je + So sánh hơn (Verb cuối), desto + So sánh hơn (Verb vị trí 2): Càng... thì càng...'
    ],
    examples: [
      { de: 'Er spricht nicht nur fließend Deutsch, sondern auch Englisch.', vi: 'Anh ấy không những nói trôi chảy tiếng Đức mà còn cả tiếng Anh.' },
      { de: 'Je mehr man übt, desto besser wird man.', vi: 'Người ta càng luyện tập nhiều thì càng trở nên giỏi hơn.' }
    ]
  }
];

export const GrammarHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'topics' | 'irregular_verbs'>('topics');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('passiv');

  // AI Grammar Explanation States
  const [isExplaining, setIsExplaining] = useState(false);
  const [aiExplanation, setAiExplanation] = useState<GrammarExplainResult | null>(null);

  // Parse 86 Irregular Verbs
  const rawLessons = rawGrammarData.lessons || {};
  const verbList: VerbLesson[] = useMemo(() => {
    return Object.entries(rawLessons).map(([verb, data]: [string, any]) => ({
      verb,
      duStem: data.duStem || verb,
      praetStem: data.praetStem || '',
      partizip: data.partizip || '',
      aux: data.aux || 'haben',
      konjStem: data.konjStem || ''
    }));
  }, [rawLessons]);

  const filteredTopics = useMemo(() => {
    return masterGrammarTopics.filter(t => 
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      t.level.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const filteredVerbs = useMemo(() => {
    return verbList.filter(v => 
      v.verb.toLowerCase().includes(searchTerm.toLowerCase()) || 
      v.praetStem.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.partizip.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [verbList, searchTerm]);

  const currentTopic = filteredTopics.find(l => l.id === selectedTopicId) || filteredTopics[0] || masterGrammarTopics[0];

  const speakGerman = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'de-DE';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleAskAIExplanation = async () => {
    setIsExplaining(true);
    try {
      const res = await explainGrammarWithGemini(
        currentTopic.title,
        `Giải thích chi tiết bản chất, ví dụ và bẫy thi của chuyên đề ${currentTopic.title}`
      );
      setAiExplanation(res);
    } catch (e) {
      console.error(e);
      alert('Không thể tải phân tích AI lúc này.');
    } finally {
      setIsExplaining(false);
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header Banner */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase mb-2">
            <FileText className="w-3.5 h-3.5" />
            Cẩm Nang Ngữ Pháp Toàn Diện & 86 Động Từ Bất Quy Tắc
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
            Ngữ Pháp Chuẩn A1 → B2 & Gemini AI Tutor
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl">
            Tóm tắt công thức, phân tích vị trí động từ, bẫy thi và trợ lý <strong>Gemini AI</strong> giải thích sâu bản chất ngữ pháp.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center bg-slate-800 p-1.5 rounded-2xl border border-slate-700 shrink-0">
          <button
            onClick={() => {
              setActiveTab('topics');
              setAiExplanation(null);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'topics' ? 'bg-emerald-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            📚 Chuyên Đề Ngữ Pháp
          </button>
          <button
            onClick={() => setActiveTab('irregular_verbs')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'irregular_verbs' ? 'bg-emerald-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            📋 86 Động Từ Bất Quy Tắc
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-xl">
        <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={activeTab === 'topics' ? "Tìm chuyên đề (Passiv, Konjunktiv, Relativsatz, Giới từ)..." : "Tìm động từ (nehmen, sprechen, fahren, geben)..."}
          className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm placeholder:text-slate-500"
        />
      </div>

      {/* VIEW: TOPICS */}
      {activeTab === 'topics' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Lessons List */}
          <div className="lg:col-span-4 space-y-2.5 max-h-[680px] overflow-y-auto pr-1">
            {filteredTopics.map((les) => {
              const isSelected = les.id === currentTopic.id;
              return (
                <button
                  key={les.id}
                  onClick={() => {
                    setSelectedTopicId(les.id);
                    setAiExplanation(null);
                  }}
                  className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-slate-900 text-white border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                      : 'bg-slate-900/60 text-slate-300 border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="text-xs sm:text-sm font-bold line-clamp-1">
                      {les.title}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {les.level}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">
                        {les.category}
                      </span>
                    </div>
                  </div>

                  <ChevronRight className={`w-4 h-4 shrink-0 ${isSelected ? 'text-emerald-400' : 'text-slate-500'}`} />
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Lesson View & AI Tutor */}
          <div className="lg:col-span-8 space-y-6">
            <motion.div
              key={currentTopic.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-sm space-y-6"
            >
              {/* Title & Level */}
              <div className="border-b border-slate-800 pb-4 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold uppercase">
                    Trình Độ: {currentTopic.level} • {currentTopic.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white font-display mt-2">
                    {currentTopic.title}
                  </h3>
                </div>

                <button
                  onClick={handleAskAIExplanation}
                  disabled={isExplaining}
                  className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-indigo-600 text-slate-950 text-xs font-black shadow-lg shadow-emerald-500/20 hover:opacity-90 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isExplaining ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Gemini đang phân tích...</span>
                    </>
                  ) : (
                    <>
                      <Bot className="w-3.5 h-3.5" />
                      <span>AI Phân Tích Chuyên Sâu</span>
                    </>
                  )}
                </button>
              </div>

              {/* Formula Box */}
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-1.5">
                <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>Công Thức & Cấu Trúc Ngữ Pháp:</span>
                </div>
                <div className="text-xs sm:text-sm font-bold text-white font-mono bg-slate-950 p-3 rounded-xl border border-slate-800 leading-relaxed">
                  {currentTopic.formula}
                </div>
              </div>

              {/* Rules */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Quy Tắc Và Cách Sử Dụng Cốt Lõi:</span>
                </h4>
                <div className="space-y-2">
                  {currentTopic.rules.map((r, rIdx) => (
                    <div key={rIdx} className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs sm:text-sm text-slate-300 flex items-start gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-2" />
                      <span>{r}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Examples */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-indigo-400" />
                  <span>Ví Dụ Minh Họa Song Ngữ Đức - Việt:</span>
                </h4>
                <div className="space-y-2.5">
                  {currentTopic.examples.map((ex, eIdx) => (
                    <div key={eIdx} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="text-sm font-bold text-white font-sans">
                          {ex.de}
                        </div>
                        <div className="text-xs text-slate-400 font-medium">
                          👉 {ex.vi}
                        </div>
                      </div>

                      <button
                        onClick={() => speakGerman(ex.de)}
                        className="p-2 rounded-lg bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-slate-300 transition-colors shrink-0 cursor-pointer"
                        title="Nghe phát âm ví dụ"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Deep Explanation Section */}
              {aiExplanation && (
                <div className="mt-6 pt-6 border-t border-slate-800 space-y-4 animate-fadeIn">
                  <div className="p-5 rounded-2xl bg-slate-950 border border-indigo-500/30 space-y-3">
                    <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                      <Bot className="w-4 h-4" />
                      <span>Phân Tích Bản Chất Từ Gemini AI:</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {aiExplanation.ruleExplanation}
                    </p>
                  </div>

                  {/* Common Mistakes */}
                  {aiExplanation.commonMistakes?.length > 0 && (
                    <div className="p-5 rounded-2xl bg-rose-500/10 border border-rose-500/20 space-y-3">
                      <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
                        <AlertTriangle className="w-4 h-4" />
                        <span>Bẫy Thường Gặp Trong Bài Thi (Stolpersteine):</span>
                      </div>
                      <div className="space-y-2">
                        {aiExplanation.commonMistakes.map((cm, i) => (
                          <div key={i} className="text-xs space-y-1 p-3 rounded-xl bg-slate-950/80 border border-rose-500/20">
                            <div className="text-rose-400 line-through">❌ {cm.wrong}</div>
                            <div className="text-emerald-400 font-bold">✔️ {cm.correct}</div>
                            <div className="text-slate-300">{cm.explanation}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Memory Tip */}
                  {aiExplanation.memoryTip && (
                    <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-2.5 text-xs text-amber-300">
                      <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold">Mẹo Nhớ Siêu Tốc: </span>
                        {aiExplanation.memoryTip}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}

      {/* VIEW: 86 IRREGULAR VERBS TABLE */}
      {activeTab === 'irregular_verbs' && (
        <div className="rounded-3xl bg-slate-900 border border-slate-800 shadow-xl overflow-hidden">
          <div className="p-5 border-b border-slate-800 flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <Table className="w-4 h-4 text-emerald-400" />
              <span>Tổng cộng: {filteredVerbs.length} động từ bất quy tắc</span>
            </div>
            <span>Tra cứu theo Infinitiv, Präteritum hoặc Partizip II</span>
          </div>

          <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-950 text-slate-400 font-bold uppercase text-[11px] sticky top-0 z-10 border-b border-slate-800">
                <tr>
                  <th className="p-3.5 pl-6">Infinitiv</th>
                  <th className="p-3.5">Präsens (du / er,sie,es)</th>
                  <th className="p-3.5">Präteritum</th>
                  <th className="p-3.5">Partizip II (Hilfsverb)</th>
                  <th className="p-3.5">Konjunktiv II</th>
                  <th className="p-3.5 pr-6 text-center">Nghe</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium text-slate-200">
                {filteredVerbs.map((v, i) => (
                  <tr key={i} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3.5 pl-6 font-bold text-white">
                      {v.verb}
                    </td>
                    <td className="p-3.5 text-emerald-400 font-semibold">
                      {v.duStem}
                    </td>
                    <td className="p-3.5 text-amber-400 font-semibold">
                      {v.praetStem}
                    </td>
                    <td className="p-3.5">
                      <span className="text-slate-400 text-xs mr-1">({v.aux})</span>
                      <strong className="text-indigo-400">{v.partizip}</strong>
                    </td>
                    <td className="p-3.5 text-slate-400 italic">
                      {v.konjStem}
                    </td>
                    <td className="p-3.5 pr-6 text-center">
                      <button
                        onClick={() => speakGerman(`${v.verb}, ${v.praetStem}, ${v.partizip}`)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-slate-300 transition-colors cursor-pointer"
                        title="Nghe phát âm 3 thì"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
