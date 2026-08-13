import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  Mic, 
  Volume2, 
  Award,
  Sparkles,
  Bot,
  RefreshCw,
  Square,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { evaluateSpeakingWithGemini, SpeakingFeedbackResult } from '../services/geminiService';

export const SpeakingHub: React.FC = () => {
  const [activePart, setActivePart] = useState<'teil1' | 'teil2' | 'teil3'>('teil1');
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [feedback, setFeedback] = useState<SpeakingFeedbackResult | null>(null);

  const recognitionRef = useRef<any>(null);

  const speakGerman = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'de-DE';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const startVoiceRecording = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Trình duyệt của bạn chưa hỗ trợ Web Speech API nhận diện giọng nói trực tiếp. Bạn có thể gõ câu nói tiếng Đức vào ô bên dưới nhé!');
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
        let currentTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript + ' ';
        }
        setTranscript(currentTranscript.trim());
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.start();
      recognitionRef.current = recognition;
    } catch (e) {
      console.error(e);
      setIsRecording(false);
    }
  };

  const stopVoiceRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleEvaluateSpeaking = async () => {
    if (!transcript.trim()) {
      alert('Vui lòng nói hoặc gõ câu trả lời tiếng Đức trước khi nhờ AI đánh giá!');
      return;
    }

    setIsEvaluating(true);
    try {
      const res = await evaluateSpeakingWithGemini(
        currentData.title,
        currentData.description,
        transcript
      );
      setFeedback(res);
    } catch (e) {
      console.error(e);
      alert('Có lỗi khi đánh giá. Vui lòng thử lại!');
    } finally {
      setIsEvaluating(false);
    }
  };

  const redemittelData = {
    teil1: {
      title: 'Teil 1: Thuyết Trình Đề Tài Xã Hội (Präsentation)',
      duration: '3 phút thuyết trình cá nhân',
      description: 'Cấu trúc bài thuyết trình 5 bước chuẩn mực giúp đạt điểm tuyệt đối:',
      steps: [
        {
          step: '1. Giới thiệu đề tài & Cấu trúc bài',
          phrases: [
            { de: 'Das Thema meiner Präsentation ist...', vi: 'Chủ đề bài thuyết trình của tôi là...' },
            { de: 'Meine Präsentation besteht aus folgenden Teilen: Zuerst...', vi: 'Bài nói của tôi gồm các phần sau: Đầu tiên...' },
            { de: 'Ich möchte Ihnen heute über... berichten.', vi: 'Hôm nay tôi muốn trình bày với quý vị về...' }
          ]
        },
        {
          step: '2. Trải nghiệm cá nhân (Eigene Erfahrung)',
          phrases: [
            { de: 'In Bezug auf meine persönlichen Erfahrungen kann ich sagen, dass...', vi: 'Về trải nghiệm cá nhân, tôi có thể nói rằng...' },
            { de: 'Als ich in Vietnam lebte, habe ich oft...', vi: 'Khi tôi còn sống ở Việt Nam, tôi thường...' },
            { de: 'Ich persönlich habe die Erfahrung gemacht, dass...', vi: 'Bản thân tôi đã có kinh nghiệm rằng...' }
          ]
        },
        {
          step: '3. Tình hình chung tại Việt Nam (Situation im Heimatland)',
          phrases: [
            { de: 'In meinem Heimatland Vietnam ist die Situation so, dass...', vi: 'Ở quê hương tôi Việt Nam, tình hình là...' },
            { de: 'Die meisten Menschen in Vietnam bevorzugen es, ...', vi: 'Đa số người dân ở Việt Nam ưa chuộng việc...' },
            { de: 'In Vietnam spielt dieses Thema eine sehr wichtige Rolle.', vi: 'Ở Việt Nam, chủ đề này đóng vai trò rất quan trọng.' }
          ]
        },
        {
          step: '4. Ưu & Nhược điểm (Vor- und Nachteile)',
          phrases: [
            { de: 'Ein großer Vorteil davon ist, dass...', vi: 'Một ưu điểm lớn của điều này là...' },
            { de: 'Auf der anderen Seite gibt es auch einige Nachteile, zum Beispiel...', vi: 'Mặt khác cũng có một số nhược điểm, ví dụ như...' },
            { de: 'Man muss sowohl die positiven als auch die negativen Aspekte berücksichtigen.', vi: 'Người ta phải cân nhắc cả mặt tích cực lẫn tiêu cực.' }
          ]
        },
        {
          step: '5. Quan điểm cá nhân & Lời cảm ơn (Meinung & Abschluss)',
          phrases: [
            { de: 'Meiner Meinung nach sollte man...', vi: 'Theo ý kiến của tôi, người ta nên...' },
            { de: 'Ich bin der Ansicht, dass...', vi: 'Tôi giữ quan điểm rằng...' },
            { de: 'Das war alles. Vielen Dank für Ihre Aufmerksamkeit! Haben Sie Fragen?', vi: 'Đó là tất cả. Cảm ơn quý vị đã chú ý lắng nghe! Quý vị có câu hỏi nào không?' }
          ]
        }
      ]
    },
    teil2: {
      title: 'Teil 2: Mô Tả Tranh & Thảo Luận (Bildbeschreibung)',
      duration: '2 - 3 phút',
      description: 'Các mẫu câu miêu tả chi tiết vị trí và không khí trong bức tranh:',
      steps: [
        {
          step: '1. Mô tả tổng quát & Vị trí trong tranh',
          phrases: [
            { de: 'Auf dem Bild sehe ich...', vi: 'Trong bức ảnh tôi nhìn thấy...' },
            { de: 'Im Vordergrund / Im Hintergrund befindet sich...', vi: 'Ở tiền cảnh / Ở hậu cảnh có...' },
            { de: 'Auf der linken / rechten Seite sieht man...', vi: 'Ở phía bên trái / bên phải người ta thấy...' }
          ]
        },
        {
          step: '2. Phỏng đoán cảm xúc & Không khí',
          phrases: [
            { de: 'Die Atmosphäre scheint sehr fröhlich / entspannt zu sein.', vi: 'Bầu không khí có vẻ rất vui vẻ / thư giãn.' },
            { de: 'Die Personen sehen glücklich aus, weil...', vi: 'Những người này trông có vẻ hạnh phúc, vì...' },
            { de: 'Es sieht so aus, als ob sie gerade...', vi: 'Trông có vẻ như họ đang vừa mới...' }
          ]
        }
      ]
    },
    teil3: {
      title: 'Teil 3: Lập Kế Hoạch Chung (Gemeinsam Planen)',
      duration: '3 phút hội thoại tương tác với bạn thi',
      description: 'Các mẫu câu đưa ra đề xuất, đồng thuận, từ chối lịch sự và chốt phân công:',
      steps: [
        {
          step: '1. Đưa ra đề xuất (Vorschläge machen)',
          phrases: [
            { de: 'Ich schlage vor, dass wir...', vi: 'Tôi đề xuất rằng chúng ta nên...' },
            { de: 'Wie wäre es, wenn wir am Samstag...?', vi: 'Sẽ thế nào nếu chúng ta vào thứ Bảy...?' },
            { de: 'Wollen wir vielleicht zusammen...?', vi: 'Chúng ta có muốn cùng nhau... không?' }
          ]
        },
        {
          step: '2. Đồng ý (Zustimmen)',
          phrases: [
            { de: 'Das ist eine hervorragende Idee!', vi: 'Đó là một ý tưởng tuyệt vời!' },
            { de: 'Da stimme ich dir vollkommen zu.', vi: 'Tôi hoàn toàn đồng ý với bạn về điểm đó.' },
            { de: 'Das passt mir sehr gut.', vi: 'Điều đó rất phù hợp với tôi.' }
          ]
        },
        {
          step: '3. Từ chối & Đề xuất giải pháp thay thế (Ablehnen & Gegenvorschlag)',
          phrases: [
            { de: 'Das klingt gut, aber leider habe ich am Freitag keine Zeit.', vi: 'Nghe hay đấy, nhưng tiếc là thứ Sáu tôi không có thời gian.' },
            { de: 'Könnten wir stattdessen vielleicht am Sonntag...?', vi: 'Liệu thay vào đó chúng ta có thể làm vào Chủ Nhật được không...?' },
            { de: 'Ich bin mir không sicher, ob das klappt.', vi: 'Tôi không chắc liệu điều đó có ổn không.' }
          ]
        },
        {
          step: '4. Chốt hẹn & Phân công công việc (Aufgaben verteilen)',
          phrases: [
            { de: 'Wann und wo treffen wir uns genau?', vi: 'Chúng ta sẽ gặp nhau chính xác khi nào và ở đâu?' },
            { de: 'Ich übernehme die Getränke, kümmerst du dich um das Essen?', vi: 'Tôi sẽ lo phần đồ uống, bạn lo phần đồ ăn nhé?' },
            { de: 'Abgemacht! Ich freue mich schon darauf.', vi: 'Thống nhất thế nhé! Tôi rất mong chờ đến ngày đó.' }
          ]
        }
      ]
    }
  };

  const currentData = redemittelData[activePart];

  return (
    <div className="space-y-6 pb-16">
      {/* Header Banner */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 text-xs font-bold uppercase mb-2">
            <Mic className="w-3.5 h-3.5" />
            Luyện Nói Phản Xạ & Gemini AI Speaking Partner
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
            Bí Quyết Điểm Max Kỹ Năng Nói (Sprechen)
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl">
            Luyện tập với kho mẫu câu <strong>Redemittel</strong> trúng tủ và sử dụng tính năng <strong>AI nhận diện giọng nói & chấm điểm phản xạ</strong>.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2 bg-slate-800/80 px-4 py-2 rounded-2xl border border-slate-700">
            <Award className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold text-slate-300">Goethe & TELC Sprechen</span>
          </div>
        </div>
      </div>

      {/* Part Navigation Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { id: 'teil1', label: 'Teil 1: Thuyết Trình (Präsentation)', desc: '5 bước ăn điểm đề tài xã hội' },
          { id: 'teil2', label: 'Teil 2: Miêu Tả Tranh (Bildbeschreibung)', desc: 'Bố cục & cảm xúc bức tranh' },
          { id: 'teil3', label: 'Teil 3: Lập Kế Hoạch (Gemeinsam Planen)', desc: 'Đối đáp, đề xuất & chốt hẹn' }
        ].map((p) => {
          const isSelected = activePart === p.id;
          return (
            <button
              key={p.id}
              onClick={() => {
                setActivePart(p.id as any);
                setFeedback(null);
              }}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'bg-slate-900 text-white border-amber-500 shadow-lg ring-2 ring-amber-500/20'
                  : 'bg-slate-900/60 text-slate-300 border-slate-800 hover:bg-slate-800'
              }`}
            >
              <div className="text-sm font-bold">{p.label}</div>
              <div className="text-xs text-slate-400 mt-1 font-medium">{p.desc}</div>
            </button>
          );
        })}
      </div>

      {/* Interactive AI Speaking Practice Studio */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-sm space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">
                Phòng Luyện Nói Trực Tiếp Với AI (Speaking Studio)
              </h4>
              <p className="text-xs text-slate-400">
                Bấm Micro để ghi âm giọng nói tiếng Đức hoặc gõ câu trả lời để AI phân tích độ lưu loát và ngữ pháp.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isRecording ? (
              <button
                onClick={startVoiceRecording}
                className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-rose-500 hover:bg-rose-400 text-white text-xs font-bold transition-all cursor-pointer shadow-lg shadow-rose-500/20"
              >
                <Mic className="w-4 h-4" />
                <span>Bắt Đầu Nói (Ghi Âm)</span>
              </button>
            ) : (
              <button
                onClick={stopVoiceRecording}
                className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-800 text-rose-400 border border-rose-500/40 text-xs font-bold animate-pulse cursor-pointer"
              >
                <Square className="w-4 h-4 fill-current" />
                <span>Dừng Ghi Âm</span>
              </button>
            )}
          </div>
        </div>

        {/* Spoken transcript input */}
        <div className="space-y-3">
          <textarea
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Nội dung bạn nói sẽ hiển thị tại đây theo thời gian thực (hoặc bạn có thể gõ trực tiếp câu tiếng Đức)..."
            rows={3}
            className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans leading-relaxed placeholder:text-slate-600"
          />

          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => {
                setTranscript("Das Thema meiner Präsentation ist sehr wichtig. Meiner persönlichen Erfahrung nach spielen die sozialen Medien eine große Rolle im Leben.");
              }}
              className="text-xs text-slate-400 hover:text-amber-400 font-semibold cursor-pointer transition-colors"
            >
              👉 Điền câu nói mẫu để thử nghiệm
            </button>

            <button
              onClick={handleEvaluateSpeaking}
              disabled={isEvaluating}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-amber-500 text-slate-950 text-xs font-black shadow-md hover:opacity-90 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isEvaluating ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>AI đang phân tích câu nói...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Chấm Điểm & Đánh Giá Giọng Nói</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* AI Speaking Feedback Result */}
        {feedback && (
          <div className="mt-6 pt-6 border-t border-slate-800 space-y-4 animate-fadeIn">
            <div className="p-5 rounded-2xl bg-slate-950 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                  Đánh Giá Trình Độ Phản Xạ
                </span>
                <h4 className="text-xl font-black text-white">{feedback.overallBand}</h4>
                <p className="text-xs text-slate-300 mt-1">{feedback.feedbackSummary}</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-center bg-slate-900 p-3 rounded-xl border border-slate-800 min-w-[75px]">
                  <div className="text-lg font-black text-amber-400">{feedback.fluencyScore}/10</div>
                  <div className="text-[10px] text-slate-400 font-bold">Lưu loát</div>
                </div>
                <div className="text-center bg-slate-900 p-3 rounded-xl border border-slate-800 min-w-[75px]">
                  <div className="text-lg font-black text-indigo-400">{feedback.grammarScore}/10</div>
                  <div className="text-[10px] text-slate-400 font-bold">Ngữ pháp</div>
                </div>
                <div className="text-center bg-slate-900 p-3 rounded-xl border border-slate-800 min-w-[75px]">
                  <div className="text-lg font-black text-rose-400">{feedback.vocabularyScore}/10</div>
                  <div className="text-[10px] text-slate-400 font-bold">Từ vựng</div>
                </div>
              </div>
            </div>

            {/* Strengths and Improvements */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-1.5">
                <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Điểm Mạnh Ghi Nhận:</span>
                </div>
                <ul className="text-xs text-slate-300 space-y-1 pl-4 list-disc">
                  {feedback.strengths.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-1.5">
                <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Gợi Ý Cải Thiện:</span>
                </div>
                <ul className="text-xs text-slate-300 space-y-1 pl-4 list-disc">
                  {feedback.improvements.map((im, i) => (
                    <li key={i}>{im}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Native Speaker Model Answer */}
            <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold text-indigo-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Cách Diễn Đạt Tự Nhiên Của Người Bản Xứ (Model Answer):</span>
                </div>
                <button
                  onClick={() => speakGerman(feedback.nativeSpeakerModel)}
                  className="text-xs text-indigo-300 hover:text-white font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Nghe mẫu</span>
                </button>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 font-medium italic">
                "{feedback.nativeSpeakerModel}"
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Main Redemittel Display */}
      <motion.div
        key={activePart}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-sm space-y-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              {currentData.duration}
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white font-display mt-0.5">
              {currentData.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {currentData.description}
            </p>
          </div>
        </div>

        {/* Steps List */}
        <div className="space-y-6">
          {currentData.steps.map((st, idx) => (
            <div key={idx} className="space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center text-xs font-black">
                  {idx + 1}
                </div>
                <span>{st.step}</span>
              </h4>

              <div className="grid grid-cols-1 gap-2.5">
                {st.phrases.map((ph, pIdx) => (
                  <div
                    key={pIdx}
                    className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80 flex items-center justify-between gap-4 hover:border-amber-500/50 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="text-sm sm:text-base font-bold text-white">
                        {ph.de}
                      </div>
                      <div className="text-xs sm:text-sm text-slate-400 font-medium">
                        {ph.vi}
                      </div>
                    </div>

                    <button
                      onClick={() => speakGerman(ph.de)}
                      className="p-2.5 rounded-xl bg-slate-800 hover:bg-amber-500 text-slate-300 hover:text-slate-950 transition-all shadow-sm shrink-0 cursor-pointer"
                      title="Nghe phát âm câu này"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
