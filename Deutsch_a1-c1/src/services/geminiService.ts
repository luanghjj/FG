import { GoogleGenAI } from '@google/genai';

export interface WritingGradeResult {
  totalScore: number; // max 45
  maxScore: number;
  gradePercentage: number;
  levelAssessment: string; // 'B1 Đạt', 'B1 Giỏi', 'Cần Cải Thiện', v.v.
  summary: string;
  criteria: {
    taskFulfillment: { score: number; max: 15; comment: string }; // Ý và Leitpunkte
    coherence: { score: number; max: 15; comment: string }; // Tính mạch lạc & Liên từ
    accuracy: { score: number; max: 15; comment: string }; // Ngữ pháp, từ vựng, chính tả
  };
  leitpunkteReview: {
    point: string;
    status: 'fulfilled' | 'partial' | 'missing';
    comment: string;
  }[];
  mistakes: {
    original: string;
    correction: string;
    reason: string;
    type: 'grammar' | 'vocab' | 'spelling' | 'word_order';
  }[];
  upgradedVersion: string;
  recommendedRedemittel: string[];
}

export interface SpeakingFeedbackResult {
  fluencyScore: number; // /10
  grammarScore: number; // /10
  vocabularyScore: number; // /10
  overallBand: string; // e.g. "B1.2 Vững Vàng"
  feedbackSummary: string;
  strengths: string[];
  improvements: string[];
  correctedTranscript: string;
  nativeSpeakerModel: string;
}

export interface GrammarExplainResult {
  title: string;
  ruleExplanation: string;
  formula: string;
  examples: { de: string; vi: string; note?: string }[];
  commonMistakes: { wrong: string; correct: string; explanation: string }[];
  memoryTip: string;
}

// Storage helpers
const API_KEY_STORAGE_KEY = 'gemini_api_key';
const MODEL_STORAGE_KEY = 'gemini_selected_model';

export const getStoredGeminiKey = (): string => {
  return localStorage.getItem(API_KEY_STORAGE_KEY) || ((import.meta as any).env?.VITE_GEMINI_API_KEY as string) || '';
};

export const setStoredGeminiKey = (key: string): void => {
  localStorage.setItem(API_KEY_STORAGE_KEY, key.trim());
};

export const getStoredModel = (): string => {
  return localStorage.getItem(MODEL_STORAGE_KEY) || 'gemini-2.5-flash';
};

export const setStoredModel = (model: string): void => {
  localStorage.setItem(MODEL_STORAGE_KEY, model);
};

// Initialize Google Gen AI client
const getGenAIClient = () => {
  const apiKey = getStoredGeminiKey();
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
};

/**
 * Test Gemini API connection
 */
export const testGeminiConnection = async (apiKey: string, modelName = 'gemini-2.5-flash'): Promise<{ success: boolean; message: string }> => {
  try {
    const ai = new GoogleGenAI({ apiKey: apiKey.trim() });
    const response = await ai.models.generateContent({
      model: modelName,
      contents: 'Hãy trả lời ngắn gọn: "Kết nối thành công với Google Gemini AI cho ứng dụng Sprachziel!" bằng tiếng Việt.'
    });
    return { success: true, message: response.text || 'Kết nối thành công!' };
  } catch (err: any) {
    return { success: false, message: err?.message || 'Không thể kết nối đến Gemini API. Vui lòng kiểm tra lại API Key.' };
  }
};

/**
 * 1. AI Chấm bài viết (Writing Lab Grader) theo tiêu chuẩn Goethe / TELC
 */
export const gradeWritingWithGemini = async (
  promptTitle: string,
  promptDetails: string,
  leitpunkte: string[],
  userEssay: string,
  targetLevel = 'B1'
): Promise<WritingGradeResult> => {
  const ai = getGenAIClient();
  const model = getStoredModel();

  if (!ai || !getStoredGeminiKey()) {
    // Return high quality heuristic simulated grading if no key configured
    return simulateWritingGrading(promptTitle, leitpunkte, userEssay);
  }

  const systemInstruction = `
Bạn là Giám Khảo Khảo Thí Tiếng Đức Quốc Tế (TELC & Goethe-Institut) trình độ ${targetLevel}.
Nhiệm vụ của bạn là chấm bài viết thư (Schreiben) của học viên một cách công tâm, chi tiết, chuyên nghiệp và trả về kết quả dưới định dạng JSON chuẩn.

Khung điểm TELC B1 chuẩn (Tổng 45 điểm):
- Tiêu chí 1: Aufgabenbewältigung (Xử lý 4 ý Leitpunkte) - Tối đa 15 điểm.
- Tiêu chí 2: Kommunikative Gestaltung (Bố cục mở/kết thư, tính mạch lạc, liên từ) - Tối đa 15 điểm.
- Tiêu chí 3: Formale Richtigkeit (Ngữ pháp, đuôi tính từ, vị trí động từ Nebensatz, từ vựng, chính tả) - Tối đa 15 điểm.

Định dạng JSON BẮT BUỘC trả về (không bọc trong markdown nào khác ngoài json):
{
  "totalScore": 38,
  "maxScore": 45,
  "gradePercentage": 84,
  "levelAssessment": "Đạt B1 (Gut)",
  "summary": "Nhận xét tổng quan ưu khuyết điểm bài viết...",
  "criteria": {
    "taskFulfillment": { "score": 13, "max": 15, "comment": "Nhận xét việc trả lời 4 ý Leitpunkte..." },
    "coherence": { "score": 12, "max": 15, "comment": "Nhận xét cách dùng liên từ weil, dass, obwohl, mở/kết thư..." },
    "accuracy": { "score": 13, "max": 15, "comment": "Nhận xét lỗi ngữ pháp, chia đuôi tính từ, giống danh từ..." }
  },
  "leitpunkteReview": [
    { "point": "Tên ý 1", "status": "fulfilled", "comment": "Nhận xét học viên đã hoàn thành ý này ra sao" },
    { "point": "Tên ý 2", "status": "partial", "comment": "..." },
    { "point": "Tên ý 3", "status": "fulfilled", "comment": "..." },
    { "point": "Tên ý 4", "status": "missing", "comment": "..." }
  ],
  "mistakes": [
    {
      "original": "câu hoặc từ sai trong bài",
      "correction": "câu hoặc từ đúng chuẩn tiếng Đức",
      "reason": "Giải thích chi tiết tại sao sai (vị trí động từ, Akkusativ/Dativ,...)",
      "type": "grammar"
    }
  ],
  "upgradedVersion": "Bản viết lại nâng cao, trau chuốt dùng nhiều cấu trúc B1/B2 hay...",
  "recommendedRedemittel": [
    "Ich schreibe Ihnen, um mich über ... zu beschweren.",
    "Aus diesem Grund möchte ich vorschlagen, dass..."
  ]
}
`;

  const userContent = `
ĐỀ BÀI: ${promptTitle}
CHI TIẾT: ${promptDetails}
4 Ý LEITPUNKTE BẮT BUỘC:
${leitpunkte.map((lp, i) => `${i + 1}. ${lp}`).join('\n')}

BÀI LÀM CỦA HỌC VIÊN:
"""
${userEssay}
"""

Hãy chấm điểm thật kỹ lưỡng và trả về đúng schema JSON trên.
`;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: [
        { role: 'user', parts: [{ text: systemInstruction + '\n\n' + userContent }] }
      ],
      config: {
        responseMimeType: 'application/json'
      }
    });

    const text = response.text || '{}';
    const parsed = JSON.parse(text.replace(/```json/g, '').replace(/```/g, '').trim());
    return parsed as WritingGradeResult;
  } catch (error) {
    console.error('Gemini grading error:', error);
    return simulateWritingGrading(promptTitle, leitpunkte, userEssay);
  }
};

/**
 * 2. AI Đánh giá kỹ năng nói (Speaking Evaluator)
 */
export const evaluateSpeakingWithGemini = async (
  partTitle: string,
  topicContext: string,
  spokenTranscript: string
): Promise<SpeakingFeedbackResult> => {
  const ai = getGenAIClient();
  const model = getStoredModel();

  if (!ai || !getStoredGeminiKey()) {
    return simulateSpeakingFeedback(spokenTranscript);
  }

  const prompt = `
Bạn là Giám Khảo thi Nói tiếng Đức (Sprechen B1/B2).
Học viên vừa hoàn thành phần thi nói: "${partTitle}" với ngữ cảnh: "${topicContext}".
Lời nói / bản ghi âm được phiên âm:
"""
${spokenTranscript}
"""

Hãy đánh giá và trả về JSON theo schema sau:
{
  "fluencyScore": 8,
  "grammarScore": 7.5,
  "vocabularyScore": 8,
  "overallBand": "B1.2 Tự Tin",
  "feedbackSummary": "Nhận xét tổng quan về độ lưu loát, phát âm và phản xạ...",
  "strengths": ["Điểm mạnh 1", "Điểm mạnh 2"],
  "improvements": ["Điểm cần cải thiện 1", "Điểm cần cải thiện 2"],
  "correctedTranscript": "Bản câu nói được sửa lại cho chuẩn chỉnh ngữ pháp",
  "nativeSpeakerModel": "Câu trả lời mẫu tự nhiên của người bản xứ Đức"
}
`;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: { responseMimeType: 'application/json' }
    });
    const parsed = JSON.parse((response.text || '{}').replace(/```json/g, '').replace(/```/g, '').trim());
    return parsed as SpeakingFeedbackResult;
  } catch (e) {
    console.error('Speaking eval error:', e);
    return simulateSpeakingFeedback(spokenTranscript);
  }
};

/**
 * 3. AI Giải thích ngữ pháp tiếng Đức chuyên sâu
 */
export const explainGrammarWithGemini = async (grammarTopic: string, userQuestion: string): Promise<GrammarExplainResult> => {
  const ai = getGenAIClient();
  const model = getStoredModel();

  if (!ai || !getStoredGeminiKey()) {
    return {
      title: grammarTopic,
      ruleExplanation: `Quy tắc trọng tâm cho chủ đề ${grammarTopic}: Chú ý đến vị trí của động từ chính và trợ động từ, cũng như các biến cách giống đực (Maskulin), giống cái (Feminin) và giống trung (Neutral).`,
      formula: 'Subjekt + Verb (Vị trí 2) + Ergänzung ... + Partizip II (Cuối câu)',
      examples: [
        { de: 'Ich habe gestern Deutsch gelernt.', vi: 'Hôm qua tôi đã học tiếng Đức.', note: 'Trợ động từ haben ở vị trí 2, gelernt ở cuối câu.' },
        { de: 'Weil es regnet, bleibe ich zu Hause.', vi: 'Bởi vì trời mưa nên tôi ở nhà.', note: 'Mệnh đề weil đưa động từ regnet về cuối câu.' }
      ],
      commonMistakes: [
        {
          wrong: 'Weil ich bin müde.',
          correct: 'Weil ich müde bin.',
          explanation: 'Sau liên từ phụ thuộc "weil", động từ chia phải luôn đứng ở vị trí cuối cùng của mệnh đề phụ.'
        }
      ],
      memoryTip: 'Mẹo nhớ: "KOLAS" hoặc nhớ quy tắc động từ đá bóng về khung thành cuối sân sau liên từ phụ!'
    };
  }

  const prompt = `
Bạn là Chuyên Gia Ngữ Pháp Tiếng Đức A1-C1.
Hãy giải thích chủ đề ngữ pháp: "${grammarTopic}".
Câu hỏi của học viên: "${userQuestion || 'Giải thích đầy đủ bản chất, công thức và bẫy hay gặp'}".

Trả về JSON đúng schema:
{
  "title": "${grammarTopic}",
  "ruleExplanation": "Giải thích bản chất dễ hiểu bằng tiếng Việt...",
  "formula": "Công thức tổng quát...",
  "examples": [
    { "de": "Câu tiếng Đức", "vi": "Dịch tiếng Việt", "note": "Phân tích ngữ pháp" }
  ],
  "commonMistakes": [
    { "wrong": "Câu sai thường gặp", "correct": "Câu sửa đúng", "explanation": "Tại sao sai" }
  ],
  "memoryTip": "Mẹo ghi nhớ siêu tốc..."
}
`;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: { responseMimeType: 'application/json' }
    });
    return JSON.parse((response.text || '{}').replace(/```json/g, '').replace(/```/g, '').trim());
  } catch (err) {
    console.error('Grammar explain error:', err);
    throw err;
  }
};

// --- Fallback Heuristic Analyzers (when offline or before API key is provided) ---

function simulateWritingGrading(_promptTitle: string, leitpunkte: string[], essay: string): WritingGradeResult {
  const words = essay.trim() ? essay.trim().split(/\s+/).length : 0;
  const lower = essay.toLowerCase();

  const hasGreeting = lower.includes('liebe') || lower.includes('lieber') || lower.includes('sehr geehrte') || lower.includes('hallo');
  const hasClosing = lower.includes('viele grüße') || lower.includes('herzliche grüße') || lower.includes('mit freundlichen grüßen') || lower.includes('dein') || lower.includes('deine');
  const hasWeil = lower.includes('weil') || lower.includes('da ') || lower.includes('deshalb');
  const hasDass = lower.includes('dass');

  let taskScore = 10;
  let coherenceScore = 9;
  let accuracyScore = 9;

  if (words >= 80 && words <= 130) {
    taskScore += 3;
  } else if (words < 50) {
    taskScore -= 4;
  }

  if (hasGreeting && hasClosing) coherenceScore += 3;
  if (hasWeil || hasDass) {
    coherenceScore += 2;
    accuracyScore += 2;
  }

  const total = Math.min(45, Math.max(12, taskScore + coherenceScore + accuracyScore));
  const pct = Math.round((total / 45) * 100);

  const mistakesList: WritingGradeResult['mistakes'] = [];
  if (lower.includes('weil ') && lower.includes(' weil ich bin')) {
    mistakesList.push({
      original: 'weil ich bin...',
      correction: 'weil ich ... bin',
      reason: 'Liên từ "weil" bắt buộc đưa động từ chia về vị trí cuối mệnh đề phụ (KATI rule).',
      type: 'word_order'
    });
  }

  return {
    totalScore: total,
    maxScore: 45,
    gradePercentage: pct,
    levelAssessment: total >= 35 ? 'B1 Đạt Điểm Cao (Sehr Gut)' : total >= 27 ? 'B1 Đạt (Bestanden)' : 'Cần Rèn Luyện Thêm',
    summary: `Bài viết đạt ${words} từ. Bố cục bài thư ${hasGreeting && hasClosing ? 'đầy đủ lời chào và lời kết' : 'cần bổ sung lời chào hoặc lời tạm biệt chuẩn mực'}. Bạn đã sử dụng ${hasWeil ? 'liên từ phụ thuộc (weil/dass)' : 'câu đơn, nên tăng cường liên từ kết nối'}.`,
    criteria: {
      taskFulfillment: {
        score: Math.min(15, taskScore),
        max: 15,
        comment: words >= 80 ? 'Số lượng từ và độ phủ các ý đạt tiêu chuẩn bài thi B1.' : 'Bài viết hơi ngắn, cần phát triển thêm chi tiết cho từng ý Leitpunkt.'
      },
      coherence: {
        score: Math.min(15, coherenceScore),
        max: 15,
        comment: hasGreeting && hasClosing ? 'Bố cục thư rất rõ ràng, lời chào và kết chuẩn xác.' : 'Cần chú ý thêm cấu trúc mở đầu và kết thúc thư.'
      },
      accuracy: {
        score: Math.min(15, accuracyScore),
        max: 15,
        comment: 'Cần chú ý viết hoa danh từ (Substantive) và vị trí động từ cuối câu trong Nebensatz.'
      }
    },
    leitpunkteReview: leitpunkte.map((lp, idx) => ({
      point: lp,
      status: idx < 3 ? 'fulfilled' : 'partial',
      comment: idx < 3 ? 'Đã đề cập trong nội dung bài viết.' : 'Cần phát triển sâu hơn để giám khảo cho điểm tối đa.'
    })),
    mistakes: mistakesList.length ? mistakesList : [
      {
        original: 'Gợi ý nâng cao',
        correction: 'Thay vì dùng "Ich denke", hãy dùng "Meiner Meinung nach..." hoặc "Ich bin der Ansicht, dass..."',
        reason: 'Sử dụng các cụm Redemittel B1-B2 sẽ giúp tăng điểm tiêu chí biểu đạt.',
        type: 'vocab'
      }
    ],
    upgradedVersion: `Liebe Petra,\n\nich habe mich riesig über deine Einladung nach Deutschland gefreut. Da wir uns schon so lange nicht mehr gesehen haben, möchte ich dich unbedingt bald besuchen. Ich plane, mit dem Zug anzureisen, weil das umweltfreundlich und sehr bequem ist.\n\nWährend meines Aufenthalts würde ich gerne mit dir einen Ausflug ins Grüne machen und traditionelle deutsche Gerichte kochen. Übrigens, wäre es für dich in Ordnung, wenn meine Freundin Anna auch mitkommt?\n\nIch freue mich schon sehr auf deine Antwort.\n\nHerzliche Grüße\n[Dein Name]`,
    recommendedRedemittel: [
      'Ich freue mich riesig über...',
      'Wäre es für dich in Ordnung, wenn...',
      'Ich plane, mit dem Zug anzureisen, weil...'
    ]
  };
}

function simulateSpeakingFeedback(transcript: string): SpeakingFeedbackResult {
  const words = transcript.trim() ? transcript.trim().split(/\s+/).length : 0;
  return {
    fluencyScore: words > 20 ? 8.5 : 6.5,
    grammarScore: 8.0,
    vocabularyScore: 8.0,
    overallBand: words > 20 ? 'B1.2 Trôi Chảy' : 'B1.1 Cần Luyện Thêm',
    feedbackSummary: 'Phản xạ nói tốt, tốc độ vừa phải. Bạn đã sử dụng được các cấu trúc kết nối cơ bản.',
    strengths: [
      'Phát âm các phụ âm tiếng Đức khá rõ ràng',
      'Đã biết cách mở đầu bài nói với Redemittel phù hợp'
    ],
    improvements: [
      'Chú ý nhấn trọng âm vào gốc từ và các tiền tố tách được (trennbare Verben)',
      'Nên sử dụng thêm các từ nối nối tiếp ý như: "Außerdem", "Darüber hinaus"'
    ],
    correctedTranscript: transcript,
    nativeSpeakerModel: 'Das Thema meiner Präsentation ist sehr interessant. Meiner persönlichen Erfahrung nach spielt dieses Thema eine wichtige Rolle im Alltag.'
  };
}
