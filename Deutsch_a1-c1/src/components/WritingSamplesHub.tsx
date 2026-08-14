import React, { useState } from 'react';
import {
  PenTool,
  CheckCircle2,
  Sparkles,
  FileText,
  Copy,
  Check,
  Award,
  HelpCircle,
  Volume2,
  Bot,
  AlertCircle,
  TrendingUp,
  RefreshCw,
  Zap,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import writingRawData from '../data/kho_bai_viet_mau_telc_b1_b2.json';
import { gradeWritingWithGemini, WritingGradeResult, getStoredGeminiKey } from '../services/geminiService';

interface WritingItem {
  id: string;
  index: number;
  title: string;
  type: string;
  prompt: string;
  sample: string;
  leitpunkte: string[];
  tips: string;
}

const titlesAndPrompts: Record<string, { title: string; prompt: string; leitpunkte: string[] }> = {
  b1_1_1: {
    title: 'Đề 1: Lời Mời Sang Đức & Thăm Bạn Bè (Einladung nach Deutschland)',
    prompt: 'Bạn nhận được thư mời của người bạn tên Petra sang thăm nước Đức. Hãy viết thư hồi âm gồm 4 ý Leitpunkte.',
    leitpunkte: [
      'Lý do vì sao bạn muốn sang thăm Đức và gặp lại Petra',
      'Phương tiện bạn dự định sử dụng để di chuyển (tàu hỏa / ô tô)',
      'Các hoạt động muốn cùng làm (đi dã ngoại, nấu món ăn Đức)',
      'Hỏi ý kiến bạn về việc dẫn theo một người bạn khác (Anna)'
    ]
  },
  b1_1_2: {
    title: 'Đề 2: Chúc Mừng Công Việc Mới & Kể Về Việc Học Tiếng Đức',
    prompt: 'Người bạn Eva vừa nhận được công việc mới. Hãy viết thư chúc mừng và kể về cuộc sống hiện tại của bạn.',
    leitpunkte: [
      'Kể về sự tiến bộ khi học tiếng Đức mỗi ngày',
      'Chúc mừng Eva có công việc mới và hỏi về cảm nhận làm việc',
      'Kể về khóa học Yoga bạn mới tham gia để giảm căng thẳng',
      'Chia sẻ về công việc mơ ước trong tương lai (Kiến trúc sư cảnh quan)'
    ]
  },
  b1_1_3: {
    title: 'Đề 3: Bắt Đầu Khóa Học Mới & Lời Khuyên Sở Thích Cho Bạn',
    prompt: 'Bạn của bạn muốn tìm một sở thích mới. Hãy viết thư chia sẻ về hoạt động của bạn và đưa ra lời khuyên.',
    leitpunkte: [
      'Kể về khóa học tiếng Tây Ban Nha bạn vừa bắt đầu',
      'Mô tả các hoạt động thư giãn cuối tuần (đọc sách, dạo bộ thiên nhiên)',
      'Đưa ra lời khuyên cho bạn (tham gia CLB thể thao, học nấu ăn)',
      'Đồng ý và hẹn lịch gặp uống cà phê vào tuần tới'
    ]
  },
  b1_1_4: {
    title: 'Đề 4: Lời Mời Đến Thăm Khu Vườn & Hỏi Cách Di Chuyển',
    prompt: 'Bạn nhận được lời mời từ Nadja đến chơi khu vườn mới. Hãy viết thư phản hồi.',
    leitpunkte: [
      'Bày tỏ sự vui mừng và cảm ơn lời mời thăm vườn',
      'Hỏi về diện tích khu vườn và các loại cây trồng (rau, hoa quả)',
      'Hỏi phương tiện và cách di chuyển đến vườn thuận tiện nhất',
      'Cập nhật tin tức cá nhân về khóa học Yoga đang tham gia'
    ]
  },
  b1_1_5: {
    title: 'Đề 5: Lời Khuyên Mâu Thuẫn Anh Chị Em Gia Đình',
    prompt: 'Bạn Nicole đang gặp rắc rối và bất hòa với anh trai. Hãy viết thư động viên và cho lời khuyên.',
    leitpunkte: [
      'Đồng cảm và chia sẻ trải nghiệm tương tự của bản thân trong quá khứ',
      'Khuyên bạn nên nói chuyện thẳng thắn và tìm hoạt động chung',
      'Phân tích góc nhìn của người anh trai để tìm sự thấu hiểu',
      'Kể về sở thích dã ngoại, nấu ăn cùng bạn bè của bạn'
    ]
  },
  b1_1_6: {
    title: 'Đề 6: Thư Đăng Ký Khóa Học Nấu Ăn (Anmeldung zum Kochkurs)',
    prompt: 'Bạn muốn đăng ký tham gia một khóa học nấu ăn món Âu. Hãy viết thư gửi trung tâm.',
    leitpunkte: [
      'Lý do đăng ký và niềm đam mê ẩm thực',
      'Kinh nghiệm nấu ăn hiện tại và món ăn yêu thích',
      'Hỏi về lịch học, học phí và nguyên liệu chuẩn bị',
      'Yêu cầu xác nhận chỗ và gửi tài liệu khóa học'
    ]
  },
  b1_1_7: {
    title: 'Đề 7: Thư Xin Nghỉ Học / Nghỉ Làm Tạm Thời (Entschuldigungsschreiben)',
    prompt: 'Bạn bị ốm hoặc có việc gia đình đột xuất không thể tham gia lớp học. Hãy viết thư xin phép.',
    leitpunkte: [
      'Lý do vắng mặt và thời gian xin nghỉ cụ thể',
      'Kèm theo giấy xác nhận của bác sĩ (Attest)',
      'Hỏi về bài tập và nội dung bài học đã bỏ lỡ',
      'Hẹn ngày trở lại lớp và cam kết tự học bù bài'
    ]
  },
  b1_1_8: {
    title: 'Đề 8: Thư Phàn Nàn Dịch Vụ Khách Sạn (Beschwerdebrief Hotel)',
    prompt: 'Bạn có kỳ nghỉ không như ý tại một khách sạn do phòng bẩn và tiếng ồn. Hãy viết thư phàn nàn.',
    leitpunkte: [
      'Thông tin đặt phòng (thời gian lưu trú, số phòng)',
      'Mô tả chi tiết các sự cố (phòng bẩn, máy lạnh hỏng, tiếng ồn đêm)',
      'Thái độ xử lý chưa thỏa đáng của nhân viên lễ tân',
      'Yêu cầu hoàn trả một phần chi phí hoặc bồi thường'
    ]
  },
  b1_1_9: {
    title: 'Đề 9: Thư Mời Dự Tiệc Sinh Nhật (Einladung zur Geburtstagsfeier)',
    prompt: 'Sắp tới là sinh nhật của bạn. Hãy viết thư mời bạn bè đến tham dự buổi tiệc.',
    leitpunkte: [
      'Thời gian, địa điểm tổ chức buổi tiệc sinh nhật',
      'Chủ đề trang phục và các hoạt động vui chơi trong tiệc',
      'Phần ẩm thực, đồ uống và yêu cầu người tham gia chuẩn bị (nếu có)',
      'Hạn chót xác nhận tham dự (R.S.V.P)'
    ]
  },
  b1_1_10: {
    title: 'Đề 10: Thư Xin Việc Làm Thêm Sinh Viên (Bewerbung um einen Nebenjob)',
    prompt: 'Bạn thấy thông báo tuyển nhân viên phục vụ / bán hàng. Hãy viết thư ứng tuyển.',
    leitpunkte: [
      'Nguồn thông tin tuyển dụng và vị trí muốn ứng tuyển',
      'Kinh nghiệm làm việc, kỹ năng giao tiếp và vốn tiếng Đức',
      'Thời gian có thể đi làm (ca tối, cuối tuần)',
      'Mong muốn được phỏng vấn trực tiếp'
    ]
  }
};

export const WritingSamplesHub: React.FC = () => {
  const [selectedTopicKey, setSelectedTopicKey] = useState<string>('b1_1_1');
  const [copied, setCopied] = useState(false);
  const [userDraft, setUserDraft] = useState('');

  // AI Grading States
  const [isGrading, setIsGrading] = useState(false);
  const [gradeResult, setGradeResult] = useState<WritingGradeResult | null>(null);

  const b1Letters = writingRawData.b1Writing?.T || {};

  // Build full 25 letters list
  const topicsList: WritingItem[] = Object.entries(b1Letters).map(([key, text], idx) => {
    const meta = titlesAndPrompts[key] || {
      title: `Đề ${idx + 1}: Bài Viết Mẫu TELC B1 Chuẩn 45 Điểm #${idx + 1}`,
      prompt: `Đề thi yêu cầu viết một bức thư hoàn chỉnh (khoảng 80-120 từ) trả lời đầy đủ 4 ý gợi ý (Leitpunkte) theo đúng quy chuẩn TELC B1.`,
      leitpunkte: [
        'Lý do viết thư và giới thiệu hoàn cảnh',
        'Mô tả chi tiết sự việc hoặc trải nghiệm cá nhân',
        'Đưa ra ý kiến hoặc lời khuyên chân thành',
        'Hẹn gặp lại hoặc yêu cầu phản hồi từ người nhận'
      ]
    };

    return {
      id: key,
      index: idx + 1,
      title: meta.title,
      type: 'TELC B1',
      prompt: meta.prompt,
      sample: String(text),
      leitpunkte: meta.leitpunkte,
      tips: 'Đảm bảo viết hoa danh từ, chia đúng đuôi tính từ, dùng liên từ phụ thuộc weil/dass để đưa động từ về cuối câu.'
    };
  });

  const currentTopic = topicsList.find(t => t.id === selectedTopicKey) || topicsList[0];

  const handleCopy = (textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const speakGerman = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text.substring(0, 400));
      utterance.lang = 'de-DE';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleGradeWithAI = async () => {
    if (!userDraft.trim() || userDraft.trim().length < 15) {
      alert('Vui lòng viết ít nhất 1-2 câu tiếng Đức trước khi nhờ AI chấm bài nhé!');
      return;
    }

    setIsGrading(true);
    try {
      const res = await gradeWritingWithGemini(
        currentTopic.title,
        currentTopic.prompt,
        currentTopic.leitpunkte,
        userDraft,
        'B1'
      );
      setGradeResult(res);
    } catch (err) {
      console.error(err);
      alert('Có lỗi xảy ra khi chấm bài. Vui lòng thử lại.');
    } finally {
      setIsGrading(false);
    }
  };

  const wordCount = userDraft.trim() ? userDraft.trim().split(/\s+/).length : 0;
  const hasApiKey = Boolean(getStoredGeminiKey());

  return (
    <div className="space-y-4 pb-16">
      {/* Compact Header */}
      <div className="rounded-2xl bg-white border border-ios-line p-3 sm:p-4 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base sm:text-lg font-extrabold font-display text-ios-ink flex items-center gap-2">
            <PenTool className="w-4 h-4 text-ios-bad" />
            <span>25 Bài Viết Mẫu (Schreiben) & AI Chấm Điểm</span>
          </h2>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1.5 bg-ios-bg px-3 py-1.5 rounded-lg border border-ios-line text-xs font-bold text-ios-ink">
            <Award className="w-3.5 h-3.5 text-ios-accent" />
            <span>25 Đề B1 Chuẩn</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-ios-accent-soft border border-ios-accent/30 text-ios-accent text-xs font-bold">
            <Bot className="w-3.5 h-3.5" />
            <span>Gemini AI</span>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Topics Navigation List */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-ios-muted pl-1">
            Danh Sách 25 Đề Viết Mẫu Thư
          </h3>

          <div className="space-y-2 max-h-[720px] overflow-y-auto pr-1">
            {topicsList.map((t) => {
              const isSelected = t.id === selectedTopicKey;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    setSelectedTopicKey(t.id);
                    setGradeResult(null);
                  }}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                    isSelected
                      ? 'bg-ios-accent-soft text-ios-ink border-ios-accent shadow-sm'
                      : 'bg-white text-ios-secondary border-ios-line hover:bg-ios-bg'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="text-xs font-bold line-clamp-2">
                      {t.title}
                    </div>
                    <span className={`inline-block text-[10px] px-2 py-0.5 rounded-full font-semibold ${isSelected ? 'bg-white text-ios-bad' : 'bg-ios-bad-soft text-ios-bad border border-ios-bad/20'}`}>
                      Đề Số #{t.index} • TELC B1
                    </span>
                  </div>

                  {isSelected && <CheckCircle2 className="w-4 h-4 text-ios-accent shrink-0 mt-0.5" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Prompt, Model Answer & AI Grader */}
        <div className="lg:col-span-8 space-y-6">
          {/* Selected Sample Card */}
          <div className="rounded-2xl bg-white border border-ios-line p-6 sm:p-8 shadow-sm space-y-6">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ios-line pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-ios-bad">
                  Bài Viết Mẫu Đạt Điểm Tuyệt Đối (45/45)
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-ios-ink font-display mt-0.5">
                  {currentTopic.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => speakGerman(currentTopic.sample)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-ios-bg hover:bg-ios-accent-soft text-ios-secondary hover:text-ios-accent text-xs font-bold transition-all cursor-pointer border border-ios-line"
                  title="Nghe phát âm bài viết"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Nghe Đọc</span>
                </button>

                <button
                  onClick={() => handleCopy(currentTopic.sample)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-ios-accent hover:bg-[#0A6FE0] text-white text-xs font-bold transition-all cursor-pointer shadow-sm"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Đã Sao Chép!' : 'Sao Chép'}</span>
                </button>
              </div>
            </div>

            {/* Prompt Box */}
            <div className="p-4 rounded-xl bg-ios-warn-soft border border-ios-warn/20 space-y-2">
              <div className="text-xs font-bold text-ios-warn flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4" />
                <span>Yêu Cầu Đề Bài & 4 Điểm Gợi Ý (Leitpunkte):</span>
              </div>
              <p className="text-xs sm:text-sm text-ios-ink font-medium leading-relaxed">
                {currentTopic.prompt}
              </p>

              {/* Leitpunkte Checklist */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {currentTopic.leitpunkte.map((lp, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-ios-secondary">
                    <div className="w-1.5 h-1.5 rounded-full bg-ios-warn shrink-0" />
                    <span><strong>Ý {i + 1}:</strong> {lp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Model Sample Text */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-ios-muted flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-ios-bad" />
                <span>Bài Viết Mẫu Hoàn Chỉnh (Model Essay):</span>
              </h4>
              <div className="p-5 rounded-xl bg-ios-bg border border-ios-line font-sans text-sm sm:text-base text-ios-ink leading-relaxed whitespace-pre-line">
                {currentTopic.sample}
              </div>
            </div>

            {/* Tips Box */}
            <div className="p-4 rounded-xl bg-ios-indigo-soft border border-ios-indigo/20 text-xs text-ios-indigo font-medium flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-ios-indigo shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Mẹo ăn điểm tối đa: </span>
                {currentTopic.tips}
              </div>
            </div>
          </div>

          {/* Interactive Draft Writing & AI Grader Box */}
          <div className="rounded-2xl bg-white border border-ios-line p-6 sm:p-8 shadow-sm space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h4 className="text-sm font-bold text-ios-ink flex items-center gap-2">
                <PenTool className="w-4 h-4 text-ios-accent" />
                <span>Phòng Viết Thử & Giám Khảo Gemini AI Chấm Điểm</span>
              </h4>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-ios-muted">
                  Số từ: <strong className={wordCount >= 80 && wordCount <= 120 ? 'text-ios-ok' : 'text-ios-warn'}>{wordCount}</strong> / 80-120 từ
                </span>
                {!hasApiKey && (
                  <span className="text-[10px] bg-ios-warn-soft text-ios-warn px-2 py-0.5 rounded-full border border-ios-warn/30">
                    Chế độ Đánh giá mô phỏng
                  </span>
                )}
              </div>
            </div>

            <textarea
              value={userDraft}
              onChange={(e) => setUserDraft(e.target.value)}
              placeholder="Nhập bài viết của bạn tại đây (ví dụ: Lieber Thomas, ich habe mich sehr über deinen Brief gefreut...)..."
              rows={7}
              className="w-full p-4 rounded-xl bg-ios-bg border border-ios-line text-sm text-ios-ink focus:outline-none focus:ring-2 focus:ring-ios-accent/30 font-sans leading-relaxed placeholder:text-ios-muted"
            />

            <div className="flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  setUserDraft(`Liebe Petra,\n\nich habe deinen Brief bekommen und mich sehr darüber gefreut. Ich möchte dich unbedingt in Deutschland besuchen, weil ich schon lange nicht mehr da war. Ich fahre mit dem Zug, weil das sehr schnell ist.\n\nWir können zusammen in den Park gehen und deutsches Essen kochen. Kann meine Freundin Anna auch mitkommen?\n\nSchreib mir bald wieder!\n\nViele Grüße\nLinh`);
                }}
                className="text-xs text-ios-accent hover:text-[#0A6FE0] font-semibold flex items-center gap-1 cursor-pointer transition-colors"
              >
                <Zap className="w-3.5 h-3.5 text-ios-accent" />
                <span>Điền bài mẫu thử để chấm thử</span>
              </button>

              <button
                onClick={handleGradeWithAI}
                disabled={isGrading}
                className="px-6 py-3 rounded-lg bg-ios-accent hover:bg-[#0A6FE0] text-white font-black text-xs shadow-sm transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isGrading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Giám khảo AI đang chấm bài...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>AI Giám Khảo Chấm Điểm & Sửa Lỗi</span>
                  </>
                )}
              </button>
            </div>

            {/* AI Grading Report Results */}
            {gradeResult && (
              <div className="mt-8 pt-6 border-t border-ios-line space-y-6 animate-fadeIn">
                {/* Score Summary Banner */}
                <div className="p-6 rounded-2xl bg-ios-accent-soft border border-ios-accent/30 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="space-y-1 text-center md:text-left">
                    <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white text-ios-accent text-xs font-bold border border-ios-accent/30">
                      <Award className="w-3.5 h-3.5" />
                      Kết Quả Đánh Giá Giám Khảo TELC B1
                    </div>
                    <h3 className="text-2xl font-black text-ios-ink">
                      {gradeResult.levelAssessment}
                    </h3>
                    <p className="text-xs text-ios-secondary max-w-xl">
                      {gradeResult.summary}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 bg-white px-6 py-4 rounded-xl border border-ios-line shrink-0">
                    <div className="text-center">
                      <div className="text-3xl font-black text-ios-accent">
                        {gradeResult.totalScore}<span className="text-base text-ios-muted">/{gradeResult.maxScore}</span>
                      </div>
                      <div className="text-[11px] font-bold text-ios-muted uppercase tracking-wider">
                        Tổng Điểm ({gradeResult.gradePercentage}%)
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3 Criteria Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-ios-bg border border-ios-line space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-ios-secondary">1. Xử Lý 4 Ý (Leitpunkte)</span>
                      <span className="text-xs font-black text-ios-warn">{gradeResult.criteria.taskFulfillment.score}/15</span>
                    </div>
                    <div className="w-full bg-ios-line h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-ios-warn h-full rounded-full"
                        style={{ width: `${(gradeResult.criteria.taskFulfillment.score / 15) * 100}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-ios-muted leading-relaxed">
                      {gradeResult.criteria.taskFulfillment.comment}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-ios-bg border border-ios-line space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-ios-secondary">2. Mạch Lạc & Bố Cục</span>
                      <span className="text-xs font-black text-ios-indigo">{gradeResult.criteria.coherence.score}/15</span>
                    </div>
                    <div className="w-full bg-ios-line h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-ios-indigo h-full rounded-full"
                        style={{ width: `${(gradeResult.criteria.coherence.score / 15) * 100}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-ios-muted leading-relaxed">
                      {gradeResult.criteria.coherence.comment}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-ios-bg border border-ios-line space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-ios-secondary">3. Ngữ Pháp & Chính Tả</span>
                      <span className="text-xs font-black text-ios-bad">{gradeResult.criteria.accuracy.score}/15</span>
                    </div>
                    <div className="w-full bg-ios-line h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-ios-bad h-full rounded-full"
                        style={{ width: `${(gradeResult.criteria.accuracy.score / 15) * 100}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-ios-muted leading-relaxed">
                      {gradeResult.criteria.accuracy.comment}
                    </p>
                  </div>
                </div>

                {/* 4 Leitpunkte Evaluation */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-ios-muted flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-ios-accent" />
                    <span>Đánh Giá Chi Tiết 4 Ý Bắt Buộc (Leitpunkte Review):</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {gradeResult.leitpunkteReview.map((lp, idx) => (
                      <div
                        key={idx}
                        className={`p-3.5 rounded-xl border ${
                          lp.status === 'fulfilled'
                            ? 'bg-ios-ok-soft border-ios-ok/30'
                            : lp.status === 'partial'
                            ? 'bg-ios-warn-soft border-ios-warn/30'
                            : 'bg-ios-bad-soft border-ios-bad/30'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs font-bold">
                          <span className="text-ios-ink">Ý {idx + 1}: {lp.point}</span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-black ${
                              lp.status === 'fulfilled'
                                ? 'bg-ios-ok/10 text-ios-ok'
                                : lp.status === 'partial'
                                ? 'bg-ios-warn/10 text-ios-warn'
                                : 'bg-ios-bad/10 text-ios-bad'
                            }`}
                          >
                            {lp.status === 'fulfilled' ? 'Hoàn thành' : lp.status === 'partial' ? 'Một phần' : 'Chưa có'}
                          </span>
                        </div>
                        <p className="text-[11px] text-ios-secondary mt-1">{lp.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mistakes & Corrections */}
                {gradeResult.mistakes.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-ios-muted flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-ios-bad" />
                      <span>Danh Sách Lỗi Sai Cần Sửa (Grammatik & Wortschatz):</span>
                    </h4>
                    <div className="space-y-2">
                      {gradeResult.mistakes.map((m, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-ios-bg border border-ios-line space-y-1.5">
                          <div className="flex flex-wrap items-center gap-2 text-xs">
                            <span className="line-through text-ios-bad bg-ios-bad-soft px-2 py-0.5 rounded font-mono">
                              {m.original}
                            </span>
                            <ArrowRight className="w-3.5 h-3.5 text-ios-muted" />
                            <span className="text-ios-ok bg-ios-ok-soft px-2 py-0.5 rounded font-mono font-bold">
                              {m.correction}
                            </span>
                          </div>
                          <p className="text-xs text-ios-secondary">{m.reason}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Upgraded Model Version */}
                <div className="p-6 rounded-2xl bg-ios-indigo-soft border border-ios-indigo/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-ios-indigo flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" />
                      <span>Bản Viết Lại Nâng Cao (Trau chuốt theo chuẩn Giám Khảo):</span>
                    </h4>
                    <button
                      onClick={() => handleCopy(gradeResult.upgradedVersion)}
                      className="text-xs text-ios-indigo hover:text-ios-ink font-bold flex items-center gap-1"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Sao chép bản sửa</span>
                    </button>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-ios-line text-sm text-ios-ink leading-relaxed whitespace-pre-line">
                    {gradeResult.upgradedVersion}
                  </div>
                </div>

                {/* Recommended Redemittel */}
                {gradeResult.recommendedRedemittel?.length > 0 && (
                  <div className="p-4 rounded-xl bg-ios-bg border border-ios-line space-y-2">
                    <div className="text-xs font-bold text-ios-accent flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4" />
                      <span>Mẫu Câu Redemittel Gợi Ý Cho Dạng Bài Này:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {gradeResult.recommendedRedemittel.map((r, i) => (
                        <span key={i} className="text-xs px-3 py-1.5 rounded-lg bg-white text-ios-secondary border border-ios-line font-medium">
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
