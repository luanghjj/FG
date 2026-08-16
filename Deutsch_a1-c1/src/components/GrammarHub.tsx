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
  Lightbulb,
  XCircle
} from 'lucide-react';
import rawGrammarData from '../data/NGU_PHAP_86_CHUYEN_DE_A1_B2.json';
import { explainGrammarWithGemini, GrammarExplainResult } from '../services/geminiService';
import { getLearnDB, getStoredPlayer } from '../services/learnDB';

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

interface GrammarDrillQuestion {
  id: string;
  q: string;
  options: string[];
  correct: number;
  explanation: string;
}

const TOPIC_DRILL_QUESTIONS: Record<string, GrammarDrillQuestion[]> = {
  passiv: [
    {
      id: 'p1',
      q: 'Chuyển sang thể bị động hiện tại: "Der Arzt untersucht den Patienten."',
      options: [
        'Der Patient wird vom Arzt untersucht.',
        'Der Patient wurde vom Arzt untersucht.',
        'Der Patient wird durch den Arzt untersuchen.',
        'Der Patient ist vom Arzt untersucht.'
      ],
      correct: 0,
      explanation: 'Hiện tại Passiv: Subjekt (Der Patient) + wird (chia theo ngôi er) + vom Arzt (người thực hiện) + Partizip II (untersucht).'
    },
    {
      id: 'p2',
      q: 'Điền vào chỗ trống: "Die E-Mail ___ gestern von mir abgeschickt."',
      options: ['wird', 'wurde', 'hat', 'ist'],
      correct: 1,
      explanation: '"gestern" chỉ thời gian quá khứ -> Dùng Präteritum Passiv: wurde abgeschickt.'
    },
    {
      id: 'p3',
      q: 'Chủ thể hành động là đồ vật / phương tiện thì dùng giới từ nào?',
      options: ['von + Dativ', 'durch + Akkusativ', 'mit + Dativ', 'bei + Dativ'],
      correct: 1,
      explanation: 'von + Dativ (cho người), durch + Akkusativ (cho phương tiện/nguyên nhân gián tiếp).'
    }
  ],
  konjunktiv2: [
    {
      id: 'k1',
      q: 'Hoàn thành câu ước: "Wenn ich reich ___, würde ich ein Haus kaufen."',
      options: ['bin', 'war', 'wäre', 'hätte'],
      correct: 2,
      explanation: 'Động từ sein ở Konjunktiv II là "wäre" (ich wäre, du wärst, er/sie/es wäre).'
    },
    {
      id: 'k2',
      q: 'Đưa ra lời khuyên lịch sự: "Du ___ mehr Wasser trinken."',
      options: ['solltest', 'musst', 'willst', 'sollst'],
      correct: 0,
      explanation: '"solltest" là dạng Konjunktiv II của sollen dùng để khuyên nhủ nhẹ nhàng, lịch sự.'
    },
    {
      id: 'k3',
      q: 'Nhờ vả lịch sự với động từ können: "___ Sie mir bitte das Salz geben?"',
      options: ['Können', 'Könnten', 'Konnten', 'Könnt'],
      correct: 1,
      explanation: 'Konjunktiv II của können là "Könnten Sie..." mang tính lịch sự, trang trọng nhất.'
    }
  ],
  relativsatz: [
    {
      id: 'r1',
      q: 'Chọn đại từ quan hệ thích hợp: "Das ist der Tisch, ___ ich gestern gekauft habe."',
      options: ['der', 'den', 'dem', 'dessen'],
      correct: 1,
      explanation: 'Tisch (der) đóng vai trò tân ngữ Akkusativ cho động từ kaufen -> dùng "den".'
    },
    {
      id: 'r2',
      q: 'Điền đại từ quan hệ: "Die Frau, ___ ich geholfen habe, ist meine Nachbarin."',
      options: ['die', 'der', 'den', 'deren'],
      correct: 1,
      explanation: 'Động từ "helfen" luôn đi với Dativ -> Giống cái Dativ là "der".'
    }
  ],
  wechselpraepositionen: [
    {
      id: 'w1',
      q: 'Hành động chuyển động đặt quyển sách lên bàn (Wohin?): "Ich lege das Buch auf ___ Tisch."',
      options: ['der', 'den', 'dem', 'das'],
      correct: 1,
      explanation: 'Wohin? (hành động chuyển động legen) -> Akkusativ của der Tisch là "den Tisch".'
    },
    {
      id: 'w2',
      q: 'Quyển sách đang nằm trên bàn (Wo?): "Das Buch liegt auf ___ Tisch."',
      options: ['den', 'dem', 'der', 'das'],
      correct: 1,
      explanation: 'Wo? (vị trí tĩnh liegen) -> Dativ của der Tisch là "dem Tisch".'
    }
  ]
};

export const GrammarHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'topics' | 'irregular_verbs'>('topics');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('passiv');
  const [searchTerm, setSearchTerm] = useState('');
  const [aiExplanation, setAiExplanation] = useState<GrammarExplainResult | null>(null);
  const [isExplaining, setIsExplaining] = useState(false);

  // Mastery State
  const [masteryState, setMasteryState] = useState<Record<string, { is100Pct: boolean; mistakes: number; retries: number }>>({});
  const [drillTopicId, setDrillTopicId] = useState<string>('passiv');
  const [drillQueue, setDrillQueue] = useState<GrammarDrillQuestion[]>(() => TOPIC_DRILL_QUESTIONS['passiv'] || []);
  const [drillChosenOpt, setDrillChosenOpt] = useState<number | null>(null);
  const [drillFeedback, setDrillFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [drillRetries, setDrillRetries] = useState(0);
  const [drillMistakes, setDrillMistakes] = useState(0);

  // Parse raw verbs
  const verbList: VerbLesson[] = useMemo(() => {
    const raw = rawGrammarData as unknown as { lessons?: Record<string, Partial<VerbLesson>> };
    if (!raw.lessons) return [];
    return Object.entries(raw.lessons).map(([v, val]) => ({
      verb: v,
      duStem: val.duStem || v,
      praetStem: val.praetStem || '',
      partizip: val.partizip || '',
      aux: val.aux || 'haben',
      konjStem: val.konjStem || ''
    }));
  }, []);

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

  // Initialize drill queue when switching topic
  const startTopicDrill = (topicId: string) => {
    const qList = TOPIC_DRILL_QUESTIONS[topicId] || [
      {
        id: topicId + '_1',
        q: `Xác định cấu trúc chính xác của: ${currentTopic.title}`,
        options: [
          currentTopic.formula,
          'Cấu trúc đảo trật tự sai',
          'Động từ đứng không đúng vị trí',
          'Thiếu mạo từ và đuôi ngữ pháp'
        ],
        correct: 0,
        explanation: 'Công thức chuẩn: ' + currentTopic.formula
      }
    ];
    setDrillTopicId(topicId);
    setDrillQueue([...qList]);
    setDrillChosenOpt(null);
    setDrillFeedback(null);
    setDrillRetries(0);
    setDrillMistakes(0);
  };

  const handleAnswerDrill = (chosenIdx: number) => {
    if (drillFeedback !== null) return;
    const currentQ = drillQueue[0];
    if (!currentQ) return;

    setDrillChosenOpt(chosenIdx);
    const isCorrect = chosenIdx === currentQ.correct;

    if (isCorrect) {
      setDrillFeedback({ isCorrect: true, text: 'Chính xác! ' + currentQ.explanation });
      setTimeout(() => {
        const nextQueue = drillQueue.slice(1);
        setDrillQueue(nextQueue);
        setDrillChosenOpt(null);
        setDrillFeedback(null);

        if (nextQueue.length === 0) {
          // Completed 100%!
          setMasteryState(prev => ({
            ...prev,
            [drillTopicId]: { is100Pct: true, mistakes: drillMistakes, retries: drillRetries }
          }));
          try {
            const playerName = getStoredPlayer();
            if (playerName) {
              getLearnDB().then((db) => {
                db.saveGrammarMastery(playerName, {
                  topicId: drillTopicId,
                  title: currentTopic.title,
                  score: 10,
                  total: 10,
                  retryCount: drillRetries,
                  mistakes: drillMistakes
                }).catch(() => {});
              }).catch(() => {});
            }
          } catch (_) {}
        }
      }, 1200);
    } else {
      setDrillRetries(prev => prev + 1);
      setDrillMistakes(prev => prev + 1);
      setDrillFeedback({
        isCorrect: false,
        text: `Sai rồi! Đáp án đúng: "${currentQ.options[currentQ.correct]}". Câu hỏi này sẽ được xếp vào cuối vòng để bạn làm lại!`
      });
      setTimeout(() => {
        // Append question to the end of the queue
        const nextQueue = [...drillQueue.slice(1), currentQ];
        setDrillQueue(nextQueue);
        setDrillChosenOpt(null);
        setDrillFeedback(null);
      }, 2500);
    }
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

  const renderMasteryDrill = (topic: GrammarTopic) => {
    if (drillTopicId !== topic.id) {
      return (
        <div className="p-6 rounded-2xl bg-ios-bg border border-ios-line text-center space-y-3">
          <p className="text-xs sm:text-sm text-ios-secondary font-medium">
            Sẵn sàng kiểm tra và rèn luyện vòng lặp cho chuyên đề <b>{topic.title}</b>?
          </p>
          <button
            type="button"
            onClick={() => startTopicDrill(topic.id)}
            className="px-5 py-2.5 rounded-xl bg-ios-accent hover:bg-[#0A6FE0] text-white font-bold text-xs shadow-sm cursor-pointer"
          >
            Bắt Đầu Vòng Luyện 100%
          </button>
        </div>
      );
    }

    if (drillQueue.length === 0) {
      return (
        <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3 animate-in fade-in">
          <div className="text-3xl">🎉</div>
          <h4 className="text-base font-extrabold text-emerald-800">
            Xuất Sắc! Bạn Đã Làm Chủ 100% Chuyên Đề Này!
          </h4>
          <p className="text-xs text-emerald-700">
            Số lần làm lại: {drillRetries} lượt • Lỗi sai: {drillMistakes} • Đã lưu vào hồ sơ học viên.
          </p>
          <button
            type="button"
            onClick={() => startTopicDrill(topic.id)}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm cursor-pointer"
          >
            Luyện Lại Từ Đầu
          </button>
        </div>
      );
    }

    const currentQ = drillQueue[0];
    const letter = (idx: number) => ['A', 'B', 'C', 'D'][idx] || String(idx + 1);

    return (
      <div className="p-5 sm:p-6 rounded-2xl bg-ios-bg border-2 border-purple-200 space-y-5">
        <div className="flex items-center justify-between text-xs font-bold text-purple-800">
          <span>Câu hỏi còn lại trong vòng lặp: {drillQueue.length} câu</span>
          <span>Số lượt Retry: {drillRetries}</span>
        </div>

        <div className="space-y-1">
          <div className="text-xs uppercase tracking-wider text-ios-muted font-bold">Câu hỏi:</div>
          <h4 className="text-sm sm:text-base font-bold text-ios-ink">{currentQ.q}</h4>
        </div>

        <div className="grid grid-cols-1 gap-2.5 pt-1">
          {currentQ.options.map((opt, oIdx) => {
            const isSelected = drillChosenOpt === oIdx;
            return (
              <button
                key={oIdx}
                type="button"
                onClick={() => handleAnswerDrill(oIdx)}
                disabled={drillFeedback !== null}
                className={`p-3.5 rounded-xl border text-left text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-3 ${
                  isSelected
                    ? drillFeedback?.isCorrect
                      ? 'bg-emerald-500 text-white border-emerald-600'
                      : 'bg-rose-500 text-white border-rose-600'
                    : 'bg-white text-ios-ink border-ios-line hover:border-ios-accent hover:bg-ios-accent-soft'
                }`}
              >
                <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-ios-bg text-ios-muted'
                }`}>
                  {letter(oIdx)}
                </span>
                <span>{opt}</span>
              </button>
            );
          })}
        </div>

        {drillFeedback && (
          <div className={`p-4 rounded-xl text-xs font-bold ${
            drillFeedback.isCorrect
              ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
              : 'bg-rose-100 text-rose-900 border border-rose-300'
          }`}>
            {drillFeedback.text}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4 pb-16">
      {/* Compact Header & Mode Switcher */}
      <div className="rounded-2xl bg-white border border-ios-line p-3 sm:p-4 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="hidden md:block">
          <h2 className="text-lg font-extrabold font-display text-ios-ink flex items-center gap-2">
            <FileText className="w-4 h-4 text-ios-ok" />
            <span>Ngữ Pháp Chuẩn A1 → B2 & Gemini AI Tutor</span>
          </h2>
          <p className="text-ios-secondary text-xs mt-0.5">
            Tóm tắt công thức, vị trí động từ và luyện tập vòng lặp 100%.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center bg-ios-bg p-1 rounded-xl border border-ios-line overflow-x-auto scrollbar-none gap-1">
          <button
            onClick={() => {
              setActiveTab('topics');
              setAiExplanation(null);
            }}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 ${
              activeTab === 'topics' ? 'bg-white text-ios-accent shadow-xs' : 'text-ios-secondary hover:text-ios-ink'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Chuyên Đề Ngữ Pháp</span>
          </button>
          <button
            onClick={() => setActiveTab('irregular_verbs')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 ${
              activeTab === 'irregular_verbs' ? 'bg-white text-ios-accent shadow-xs' : 'text-ios-secondary hover:text-ios-ink'
            }`}
          >
            <Table className="w-3.5 h-3.5" />
            <span>86 Động Từ Bất Quy Tắc</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-ios-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={activeTab === 'topics' ? "Tìm chuyên đề (Passiv, Konjunktiv, Relativsatz, Giới từ)..." : "Tìm động từ (nehmen, sprechen, fahren, geben)..."}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-ios-line text-xs sm:text-sm text-ios-ink focus:outline-none focus:border-ios-accent shadow-xs placeholder:text-ios-muted"
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
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-ios-accent-soft text-ios-ink border-ios-accent shadow-sm'
                      : 'bg-white text-ios-secondary border-ios-line hover:bg-ios-bg'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="text-xs sm:text-sm font-bold line-clamp-1">
                      {les.title}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${isSelected ? 'bg-white text-ios-ok' : 'bg-ios-ok-soft text-ios-ok border border-ios-ok/20'}`}>
                        {les.level}
                      </span>
                      <span className="text-[11px] text-ios-muted font-medium">
                        {les.category}
                      </span>
                    </div>
                  </div>

                  <ChevronRight className={`w-4 h-4 shrink-0 ${isSelected ? 'text-ios-accent' : 'text-ios-muted'}`} />
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
              className="rounded-2xl bg-white border border-ios-line p-6 sm:p-8 shadow-sm space-y-6"
            >
              {/* Title & Level */}
              <div className="border-b border-ios-line pb-4 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="px-2.5 py-1 rounded-md bg-ios-ok-soft text-ios-ok border border-ios-ok/20 text-xs font-bold uppercase">
                    Trình Độ: {currentTopic.level} • {currentTopic.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-ios-ink font-display mt-2">
                    {currentTopic.title}
                  </h3>
                </div>

                <button
                  onClick={handleAskAIExplanation}
                  disabled={isExplaining}
                  className="px-4 py-2.5 rounded-lg bg-ios-accent hover:bg-[#0A6FE0] text-white text-xs font-bold shadow-sm transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
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
              <div className="p-4 rounded-xl bg-ios-ok-soft border border-ios-ok/20 space-y-1.5">
                <div className="text-xs font-bold text-ios-ok flex items-center gap-1.5 uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>Công Thức & Cấu Trúc Ngữ Pháp:</span>
                </div>
                <div className="text-xs sm:text-sm font-bold text-ios-ink font-mono bg-white p-3 rounded-lg border border-ios-line leading-relaxed">
                  {currentTopic.formula}
                </div>
              </div>

              {/* Rules */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-ios-muted flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-ios-ok" />
                  <span>Quy Tắc Và Cách Sử Dụng Cốt Lõi:</span>
                </h4>
                <div className="space-y-2">
                  {currentTopic.rules.map((r, rIdx) => (
                    <div key={rIdx} className="p-3 rounded-lg bg-ios-bg border border-ios-line text-xs sm:text-sm text-ios-secondary flex items-start gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-ios-ok shrink-0 mt-2" />
                      <span>{r}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Examples */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-ios-muted flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-ios-indigo" />
                  <span>Ví Dụ Minh Họa Song Ngữ Đức - Việt:</span>
                </h4>
                <div className="space-y-2.5">
                  {currentTopic.examples.map((ex, eIdx) => (
                    <div key={eIdx} className="p-3.5 rounded-xl bg-ios-bg border border-ios-line flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="text-sm font-bold text-ios-ink font-sans">
                          {ex.de}
                        </div>
                        <div className="text-xs text-ios-muted font-medium">
                          {ex.vi}
                        </div>
                      </div>

                      <button
                        onClick={() => speakGerman(ex.de)}
                        className="p-2 rounded-lg bg-white hover:bg-ios-accent-soft hover:text-ios-accent text-ios-secondary transition-colors shrink-0 cursor-pointer border border-ios-line"
                        title="Nghe phát âm ví dụ"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* ==================== MASTERY LOOP 100% PRACTICE SECTION ==================== */}
              <div className="mt-8 pt-6 border-t border-ios-line space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-xl bg-purple-50 text-purple-700 border border-purple-200">
                      <RefreshCw className="w-4 h-4" />
                    </span>
                    <div>
                      <h4 className="text-sm sm:text-base font-extrabold text-ios-ink font-display">
                        Luyện Tập Vòng Lặp 100% (Mastery Loop)
                      </h4>
                      <p className="text-xs text-ios-secondary">
                        Quy tắc kỷ luật: Sai câu nào phải làm lại câu đó ở cuối vòng cho đến khi đúng 100%.
                      </p>
                    </div>
                  </div>

                  {masteryState[currentTopic.id]?.is100Pct && (
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Đã Thuộc 100%
                    </span>
                  )}
                </div>

                {/* Practice Interactive Box */}
                {renderMasteryDrill(currentTopic)}
              </div>

              {/* AI Deep Explanation Section */}
              {aiExplanation && (
                <div className="mt-6 pt-6 border-t border-ios-line space-y-4 animate-fadeIn">
                  <div className="p-5 rounded-xl bg-ios-indigo-soft border border-ios-indigo/30 space-y-3">
                    <div className="flex items-center gap-2 text-ios-indigo font-bold text-sm">
                      <Bot className="w-4 h-4" />
                      <span>Phân Tích Bản Chất Từ Gemini AI:</span>
                    </div>
                    <p className="text-xs sm:text-sm text-ios-ink leading-relaxed">
                      {aiExplanation.ruleExplanation}
                    </p>
                  </div>

                  {/* Common Mistakes */}
                  {aiExplanation.commonMistakes?.length > 0 && (
                    <div className="p-5 rounded-xl bg-ios-bad-soft border border-ios-bad/20 space-y-3">
                      <div className="flex items-center gap-2 text-ios-bad font-bold text-xs uppercase tracking-wider">
                        <AlertTriangle className="w-4 h-4" />
                        <span>Bẫy Thường Gặp Trong Bài Thi (Stolpersteine):</span>
                      </div>
                      <div className="space-y-2">
                        {aiExplanation.commonMistakes.map((cm, i) => (
                          <div key={i} className="text-xs space-y-1 p-3 rounded-lg bg-white border border-ios-bad/20">
                            <div className="text-ios-bad flex items-center gap-1.5"><XCircle className="w-3.5 h-3.5" />{cm.wrong}</div>
                            <div className="text-ios-ok font-bold flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" />{cm.correct}</div>
                            <div className="text-ios-secondary">{cm.explanation}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Memory Tip */}
                  {aiExplanation.memoryTip && (
                    <div className="p-4 rounded-xl bg-ios-warn-soft border border-ios-warn/20 flex items-start gap-2.5 text-xs text-ios-warn">
                      <Lightbulb className="w-4 h-4 text-ios-warn shrink-0 mt-0.5" />
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
        <div className="rounded-2xl bg-white border border-ios-line shadow-sm overflow-hidden">
          <div className="p-5 border-b border-ios-line flex items-center justify-between text-xs font-bold text-ios-muted uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <Table className="w-4 h-4 text-ios-accent" />
              <span>Tổng cộng: {filteredVerbs.length} động từ bất quy tắc</span>
            </div>
            <span>Tra cứu theo Infinitiv, Präteritum hoặc Partizip II</span>
          </div>

          <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-ios-bg text-ios-muted font-bold uppercase text-[11px] sticky top-0 z-10 border-b border-ios-line">
                <tr>
                  <th className="p-3.5 pl-6">Infinitiv</th>
                  <th className="p-3.5">Präsens (du / er,sie,es)</th>
                  <th className="p-3.5">Präteritum</th>
                  <th className="p-3.5">Partizip II (Hilfsverb)</th>
                  <th className="p-3.5">Konjunktiv II</th>
                  <th className="p-3.5 pr-6 text-center">Nghe</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ios-line font-medium text-ios-secondary">
                {filteredVerbs.map((v, i) => (
                  <tr key={i} className="hover:bg-ios-bg transition-colors">
                    <td className="p-3.5 pl-6 font-bold text-ios-ink">
                      {v.verb}
                    </td>
                    <td className="p-3.5 text-ios-ok font-semibold">
                      {v.duStem}
                    </td>
                    <td className="p-3.5 text-ios-warn font-semibold">
                      {v.praetStem}
                    </td>
                    <td className="p-3.5">
                      <span className="text-ios-muted text-xs mr-1">({v.aux})</span>
                      <strong className="text-ios-indigo">{v.partizip}</strong>
                    </td>
                    <td className="p-3.5 text-ios-muted italic">
                      {v.konjStem}
                    </td>
                    <td className="p-3.5 pr-6 text-center">
                      <button
                        onClick={() => speakGerman(`${v.verb}, ${v.praetStem}, ${v.partizip}`)}
                        className="p-1.5 rounded-lg bg-ios-bg hover:bg-ios-accent-soft hover:text-ios-accent text-ios-secondary transition-colors cursor-pointer border border-ios-line"
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
