import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import {
  CheckCircle2,
  Sparkles,
  ChevronRight,
  BookOpen,
  BookMarked,
  PenTool,
  FileText,
  Clock,
  ArrowRight
} from 'lucide-react';
import { TabType } from './Navbar';
import { CourseLevel } from './A1CourseHub';

interface RoadmapViewProps {
  onNavigate: (tab: TabType, level?: CourseLevel, lessonId?: string) => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({ onNavigate }) => {
  const [selectedLevelKey, setSelectedLevelKey] = useState<string>('A2');

  const levels: Record<string, {
    name: string;
    target: string;
    vocabCount: string;
    grammarKey: string;
    examFocus: string;
    tips: string;
    hasCourse: boolean;
  }> = {
    A1: {
      name: 'A1 - Nhập Môn Căn Bản (Grundstufe 1)',
      target: 'Giao tiếp tình huống hàng ngày, giới thiệu bản thân, mua sắm và hỏi đường đơn giản.',
      vocabCount: '800 từ vựng cốt lõi',
      grammarKey: 'Hiện tại đơn (Präsens), Quá khứ Perfekt với haben/sein, Mạo từ der/die/das, Cách Nominativ & Akkusativ.',
      examFocus: 'Goethe-Zertifikat A1: Start Deutsch 1',
      tips: 'Tập trung phản xạ phát âm chuẩn, thuộc lòng giống danh từ và số đếm.',
      hasCourse: true
    },
    A2: {
      name: 'A2 - Giao Tiếp Nền Tảng (Grundstufe 2)',
      target: 'Mô tả công việc, môi trường sống, gia đình, thời tiết và xử lý tình huống du lịch.',
      vocabCount: '1.500 từ vựng thông dụng',
      grammarKey: 'Dativ, Giới từ chỉ vị trí và hướng (Wechselpräpositionen), So sánh hơn/nhất, Động từ khiếm khuyết (Modalverben) thì quá khứ.',
      examFocus: 'Goethe-Zertifikat A2 / TELC A2',
      tips: 'Luyện nghe các thông báo công cộng ở ga tàu, siêu thị và viết email ngắn.',
      hasCourse: true
    },
    B1: {
      name: 'B1 - Độc Lập Ngôn Ngữ & Du Học Nghề (Mittelstufe 1)',
      target: 'Đủ điều kiện xin visa du học nghề (Ausbildung), bảo lãnh, định cư và làm việc tại Đức.',
      vocabCount: '3.000 từ vựng học thuật & đời sống',
      grammarKey: 'Thể bị động (Passiv), Giả định cách (Konjunktiv II), Mệnh đề quan hệ (Relativsatz), Liên từ kép (zwar...aber, nicht nur...sondern auch).',
      examFocus: 'TELC Deutsch B1 (54 bộ đề trúng tủ) & Goethe B1 (4 kỹ năng độc lập)',
      tips: 'Học thuộc khung 5 bước thuyết trình và 25 bài mẫu viết thư 45/45 điểm.',
      hasCourse: true
    },
    B2: {
      name: 'B2 - Chuyên Ngành & Học Thuật (Mittelstufe 2)',
      target: 'Làm việc chuyên môn, hành nghề điều dưỡng, y tế, kỹ sư, quản lý nhà hàng khách sạn tại Đức.',
      vocabCount: '5.000 từ vựng chuyên ngành sâu',
      grammarKey: 'Cụm danh từ - động từ cố định (Nomen-Verb-Verbindungen), Phân từ I & II làm tính từ mở rộng (Partizipialattribute), Passiv-Ersatzformen.',
      examFocus: 'TELC B2 / Goethe B2 / TELC B1-B2 Pflege (Điều dưỡng)',
      tips: 'Đọc báo cáo y khoa, hợp đồng lao động, rèn luyện kỹ năng tranh luận học thuật.',
      hasCourse: false
    },
    C1: {
      name: 'C1 - Thành Thạo Cao Cấp (Oberstufe)',
      target: 'Nhập học đại học / thạc sĩ tại các trường Đại học Tổng hợp Đức (Universität/TU9).',
      vocabCount: '8.000+ từ vựng học thuật cao cấp',
      grammarKey: 'Văn phong khoa học (Wissenschaftssprache), Chuyển hóa cấu trúc danh từ hóa (Nominalstil), Konjunktiv I trong tường thuật báo chí.',
      examFocus: 'TestDaF (4x4, 4x5) / DSH-2 / Goethe C1 / telc Deutsch C1 Hochschule',
      tips: 'Tổng hợp tài liệu từ các tạp chí khoa học Đức (Der Spiegel, Die Zeit).',
      hasCourse: false
    }
  };

  const currentLevel = levels[selectedLevelKey] || levels.A2;

  // Load progress for each level
  const progressMap = useMemo(() => {
    const getProg = (lvl: string) => {
      try {
        const raw = localStorage.getItem(`${lvl.toLowerCase()}_course_progress`);
        if (!raw) return { count: 0, percent: 0 };
        const parsed = JSON.parse(raw);
        const count = Array.isArray(parsed.completed) ? parsed.completed.length : 0;
        return { count, percent: Math.round((count / 12) * 100) };
      } catch {
        return { count: 0, percent: 0 };
      }
    };

    return {
      A1: getProg('A1'),
      A2: getProg('A2'),
      B1: getProg('B1')
    };
  }, [selectedLevelKey]);

  const activeProg = progressMap[selectedLevelKey as keyof typeof progressMap] || { count: 0, percent: 0 };

  return (
    <div className="space-y-4 pb-16">
      {/* 🌟 1. CEFR ROADMAP PROGRESS TRAIL (Clean, Sleek, No clutter) */}
      <div className="rounded-2xl bg-white border border-ios-line p-3.5 sm:p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-ios-accent" />
            <span className="text-xs font-extrabold uppercase tracking-wider text-ios-ink">
              Lộ Trình Cấp Độ Tiếng Đức (CEFR)
            </span>
          </div>
          <span className="text-xs text-ios-muted font-medium">
            Chọn cấp độ để xem mục tiêu & vào học
          </span>
        </div>

        {/* Level Badges Row */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {[
            { id: 'A1', label: 'A1 Căn Bản', prog: progressMap.A1, hasCourse: true },
            { id: 'A2', label: 'A2 Sơ Cấp', prog: progressMap.A2, hasCourse: true },
            { id: 'B1', label: 'B1 Trung Cấp', prog: progressMap.B1, hasCourse: true },
            { id: 'B2', label: 'B2 Chuyên Ngành', prog: { count: 0, percent: 0 }, hasCourse: false },
            { id: 'C1', label: 'C1 Học Thuật', prog: { count: 0, percent: 0 }, hasCourse: false }
          ].map((item) => {
            const isSelected = selectedLevelKey === item.id;
            const isDone = item.prog.count >= 12;
            const isLearning = item.prog.count > 0 && item.prog.count < 12;

            return (
              <button
                key={item.id}
                onClick={() => setSelectedLevelKey(item.id)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-ios-accent text-white border-ios-accent shadow-xs'
                    : 'bg-ios-bg text-ios-ink border-ios-line hover:bg-ios-line/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-base sm:text-lg font-extrabold font-display ${isSelected ? 'text-white' : 'text-ios-ink'}`}>
                    {item.id}
                  </span>
                  {item.hasCourse && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : isDone
                        ? 'bg-emerald-100 text-emerald-800'
                        : isLearning
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-ios-line text-ios-muted'
                    }`}>
                      {isDone ? '✓ Xong' : isLearning ? `${item.prog.count}/12` : '12 Bài'}
                    </span>
                  )}
                </div>
                <div className={`text-[11px] font-medium mt-1 truncate ${isSelected ? 'text-white/80' : 'text-ios-muted'}`}>
                  {item.label}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 🌟 2. SELECTED LEVEL OVERVIEW CARD */}
      <motion.div
        key={selectedLevelKey}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="rounded-2xl bg-white border border-ios-line p-4 sm:p-6 shadow-xs space-y-4"
      >
        {/* Level Header */}
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-ios-line pb-3.5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-ios-accent-soft text-ios-accent border border-ios-accent/20 text-xs font-bold uppercase">
                Cấp Độ {selectedLevelKey}
              </span>
              {currentLevel.hasCourse && (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Khóa Học 12 Bài Chuẩn
                </span>
              )}
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-ios-ink font-display">
              {currentLevel.name}
            </h3>
            <p className="text-xs sm:text-sm text-ios-secondary max-w-2xl">
              {currentLevel.target}
            </p>
          </div>

          <div className="flex items-center gap-2 bg-ios-bg px-3 py-2 rounded-xl border border-ios-line">
            <Clock className="w-4 h-4 text-ios-accent" />
            <div>
              <div className="text-[10px] text-ios-muted font-semibold uppercase">Thời Gian Học Chuẩn</div>
              <div className="text-xs sm:text-sm font-bold text-ios-ink">120 - 180 Giờ</div>
            </div>
          </div>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl bg-ios-accent-soft border border-ios-accent/20 space-y-1">
            <div className="flex items-center gap-2 text-ios-accent font-bold text-xs">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Dung Lượng Từ Vựng</span>
            </div>
            <div className="text-sm sm:text-base font-bold text-ios-ink">{currentLevel.vocabCount}</div>
            <p className="text-[11px] text-ios-secondary">
              Được phân loại theo đời sống, chuyên ngành điều dưỡng và nhà hàng khách sạn.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-ios-ok-soft border border-ios-ok/20 space-y-1">
            <div className="flex items-center gap-2 text-ios-ok font-bold text-xs">
              <FileText className="w-3.5 h-3.5" />
              <span>Trọng Tâm Ngữ Pháp</span>
            </div>
            <p className="text-[11px] text-ios-secondary font-medium leading-relaxed">
              {currentLevel.grammarKey}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-ios-indigo-soft border border-ios-indigo/20 space-y-1">
            <div className="flex items-center gap-2 text-ios-indigo font-bold text-xs">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Kỳ Thi Trọng Tâm</span>
            </div>
            <div className="text-xs sm:text-sm font-bold text-ios-ink">{currentLevel.examFocus}</div>
            <p className="text-[11px] text-ios-secondary">
              {currentLevel.tips}
            </p>
          </div>
        </div>

        {/* Progress Bar for this level if available */}
        {currentLevel.hasCourse && (
          <div className="p-3 rounded-xl bg-ios-bg border border-ios-line flex items-center justify-between gap-3">
            <div className="space-y-0.5">
              <div className="text-xs font-bold text-ios-ink">
                Tiến trình hoàn thành khóa học {selectedLevelKey}:
              </div>
              <div className="text-[11px] text-ios-muted">
                Đã đạt {activeProg.count} / 12 bài học ({activeProg.percent}%)
              </div>
            </div>

            <div className="w-32 sm:w-48 h-2.5 rounded-full bg-white border border-ios-line overflow-hidden shrink-0">
              <div
                className="h-full bg-ios-ok rounded-full transition-all duration-500"
                style={{ width: `${activeProg.percent}%` }}
              />
            </div>
          </div>
        )}

        {/* Clear Action Buttons (Clean & Focused) */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-ios-line">
          <div className="text-xs text-ios-muted">
            Khóa học tích hợp từ vựng, ngữ pháp, đoạn hội thoại, luyện nói AI và bài quiz kiểm tra.
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {currentLevel.hasCourse ? (
              <button
                onClick={() => onNavigate('course', selectedLevelKey as CourseLevel)}
                className="px-5 py-2.5 rounded-xl bg-ios-ok hover:bg-[#1E7A34] text-white text-xs font-bold shadow-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <BookMarked className="w-4 h-4" />
                <span>🚀 Vào Học Khóa Học {selectedLevelKey} (12 Bài)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => onNavigate('exams')}
                className="px-4 py-2.5 rounded-xl bg-ios-accent hover:bg-[#0A6FE0] text-white text-xs font-bold shadow-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Luyện Đề Thi {selectedLevelKey}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={() => onNavigate('writing')}
              className="px-3.5 py-2.5 rounded-xl bg-ios-bg hover:bg-white text-ios-ink text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border border-ios-line"
            >
              <PenTool className="w-3.5 h-3.5 text-ios-accent" />
              <span>Viết Mẫu {selectedLevelKey}</span>
            </button>

            <button
              onClick={() => onNavigate('exams')}
              className="px-3.5 py-2.5 rounded-xl bg-ios-bg hover:bg-white text-ios-ink text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border border-ios-line"
            >
              <span>Phòng Thi {selectedLevelKey}</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
