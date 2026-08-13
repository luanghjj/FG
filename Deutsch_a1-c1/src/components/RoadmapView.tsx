import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  Sparkles, 
  GraduationCap, 
  ChevronRight, 
  BookOpen, 
  PenTool, 
  FileText,
  Clock,
  ArrowRight
} from 'lucide-react';
import { TabType } from './Navbar';

interface RoadmapViewProps {
  onNavigate: (tab: TabType) => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({ onNavigate }) => {
  const [selectedLevelKey, setSelectedLevelKey] = useState<string>('B1');

  const levels: Record<string, {
    name: string;
    target: string;
    vocabCount: string;
    grammarKey: string;
    examFocus: string;
    tips: string;
  }> = {
    A1: {
      name: 'A1 - Nhập Môn Căn Bản (Grundstufe 1)',
      target: 'Giao tiếp tình huống hàng ngày, giới thiệu bản thân, mua sắm và hỏi đường đơn giản.',
      vocabCount: '800 từ vựng cốt lõi',
      grammarKey: 'Hiện tại đơn (Präsens), Quá khứ Perfekt với haben/sein, Mạo từ der/die/das, Cách Nominativ & Akkusativ.',
      examFocus: 'Goethe-Zertifikat A1: Start Deutsch 1',
      tips: 'Tập trung phản xạ phát âm chuẩn, thuộc lòng giống danh từ và số đếm.'
    },
    A2: {
      name: 'A2 - Giao Tiếp Nền Tảng (Grundstufe 2)',
      target: 'Mô tả công việc, môi trường sống, gia đình, thời tiết và xử lý tình huống du lịch.',
      vocabCount: '1.500 từ vựng thông dụng',
      grammarKey: 'Dativ, Giới từ chỉ vị trí và hướng (Wechselpräpositionen), So sánh hơn/nhất, Động từ khiếm khuyết (Modalverben) thì quá khứ.',
      examFocus: 'Goethe-Zertifikat A2 / TELC A2',
      tips: 'Luyện nghe các thông báo công cộng ở ga tàu, siêu thị và viết email ngắn.'
    },
    B1: {
      name: 'B1 - Độc Lập Ngôn Ngữ & Du Học Nghề (Mittelstufe 1)',
      target: 'Đủ điều kiện xin visa du học nghề (Ausbildung), bảo lãnh, định cư và làm việc tại Đức.',
      vocabCount: '3.000 từ vựng học thuật & đời sống',
      grammarKey: 'Thể bị động (Passiv), Giả định cách (Konjunktiv II), Mệnh đề quan hệ (Relativsatz), Liên từ kép (zwar...aber, nicht nur...sondern auch).',
      examFocus: 'TELC Deutsch B1 (54 bộ đề trúng tủ) & Goethe B1 (4 kỹ năng độc lập)',
      tips: 'Học thuộc khung 5 bước thuyết trình và 25 bài mẫu viết thư 45/45 điểm.'
    },
    B2: {
      name: 'B2 - Chuyên Ngành & Học Thuật (Mittelstufe 2)',
      target: 'Làm việc chuyên môn, hành nghề điều dưỡng, y tế, kỹ sư, quản lý nhà hàng khách sạn tại Đức.',
      vocabCount: '5.000 từ vựng chuyên ngành sâu',
      grammarKey: 'Cụm danh từ - động từ cố định (Nomen-Verb-Verbindungen), Phân từ I & II làm tính từ mở rộng (Partizipialattribute), Passiv-Ersatzformen.',
      examFocus: 'TELC B2 / Goethe B2 / TELC B1-B2 Pflege (Điều dưỡng)',
      tips: 'Đọc báo cáo y khoa, hợp đồng lao động, rèn luyện kỹ năng tranh luận học thuật.'
    },
    C1: {
      name: 'C1 - Thành Thạo Cao Cấp (Oberstufe)',
      target: 'Nhập học đại học / thạc sĩ tại các trường Đại học Tổng hợp Đức (Universität/TU9).',
      vocabCount: '8.000+ từ vựng học thuật cao cấp',
      grammarKey: 'Văn phong khoa học (Wissenschaftssprache), Chuyển hóa cấu trúc danh từ hóa (Nominalstil), Konjunktiv I trong tường thuật báo chí.',
      examFocus: 'TestDaF (4x4, 4x5) / DSH-2 / Goethe C1 / telc Deutsch C1 Hochschule',
      tips: 'Tổng hợp tài liệu từ các tạp chí khoa học Đức (Der Spiegel, Die Zeit).'
    }
  };

  const currentLevel = levels[selectedLevelKey] || levels.B1;

  return (
    <div className="space-y-8 pb-16">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 p-6 sm:p-10 shadow-2xl text-white">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Bản Đồ Lộ Trình CEFR Chuẩn Đức (A1 → C1)
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white">
            Chinh Phục Chứng Chỉ Tiếng Đức <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-400">TELC & Goethe</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Hệ thống hóa toàn diện 100% kho tài liệu ôn thi tiếng Đức với <strong>54 bộ đề thi thật</strong>, <strong>6.000 từ vựng song ngữ</strong>, <strong>86 chuyên đề ngữ pháp</strong>, <strong>25 bài viết mẫu max điểm</strong> và <strong>24 sách giáo trình PDF</strong>.
          </p>

          {/* Quick Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('exams')}
              className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Luyện Thi Đề B1/B2 Ngay</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('vocab')}
              className="px-5 py-3 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 transition-all flex items-center gap-2 cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>Học Thẻ Flashcard Từ Vựng</span>
            </button>
          </div>
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Level Selector Tabs */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-amber-500" />
            <span>Chọn Cấp Độ Mục Tiêu Của Bạn</span>
          </h2>
          <span className="text-xs text-slate-500 font-semibold hidden sm:inline">Khung tham chiếu Châu Âu CEFR</span>
        </div>

        {/* Level Badges Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {['A1', 'A2', 'B1', 'B2', 'C1'].map((lvl) => {
            const isSelected = selectedLevelKey === lvl;
            return (
              <button
                key={lvl}
                onClick={() => setSelectedLevelKey(lvl)}
                className={`p-4 rounded-2xl border text-center transition-all cursor-pointer relative overflow-hidden ${
                  isSelected 
                    ? 'bg-slate-900 text-white border-amber-500 shadow-xl ring-2 ring-amber-500/20' 
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <div className="text-2xl font-black font-display text-amber-500">{lvl}</div>
                <div className="text-xs font-bold mt-1 line-clamp-1">{lvl === 'A1' ? 'Căn Bản' : lvl === 'A2' ? 'Nền Tảng' : lvl === 'B1' ? 'Du Học Nghề' : lvl === 'B2' ? 'Chuyên Ngành' : 'Học Thuật'}</div>
                {isSelected && (
                  <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-amber-500 to-rose-500" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Level Deep Dive Card */}
      <motion.div
        key={selectedLevelKey}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xl space-y-6"
      >
        {/* Header Level Info */}
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
          <div className="space-y-1">
            <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-bold uppercase">
              Cấp Độ {selectedLevelKey}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display mt-1">
              {currentLevel.name}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl mt-1">
              {currentLevel.target}
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700">
            <Clock className="w-5 h-5 text-amber-500" />
            <div>
              <div className="text-[11px] text-slate-400 font-semibold uppercase">Thời Gian Chuẩn</div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">120 - 180 Giờ Học</div>
            </div>
          </div>
        </div>

        {/* 4 Feature Pillars of this Level */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Vocab Pillar */}
          <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-2">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm">
              <BookOpen className="w-4 h-4" />
              <span>Dung Lượng Từ Vựng</span>
            </div>
            <div className="text-lg font-bold text-slate-900 dark:text-white">{currentLevel.vocabCount}</div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Được phân loại theo chủ đề đời sống, chuyên ngành điều dưỡng và nhà hàng khách sạn.
            </p>
          </div>

          {/* Grammar Pillar */}
          <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-2">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
              <FileText className="w-4 h-4" />
              <span>Trọng Tâm Ngữ Pháp</span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
              {currentLevel.grammarKey}
            </p>
          </div>

          {/* Exam Pillar */}
          <div className="p-5 rounded-2xl bg-indigo-500/5 border border-indigo-500/20 space-y-2 md:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>Kỳ Thi Trọng Tâm</span>
            </div>
            <div className="text-sm font-bold text-slate-900 dark:text-white">{currentLevel.examFocus}</div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {currentLevel.tips}
            </p>
          </div>
        </div>

        {/* Level Navigation Footer Actions */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 dark:border-slate-800">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Khóa học bao gồm đầy đủ tài liệu PDF, bài tập trắc nghiệm và kho đề mô phỏng.
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('writing')}
              className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>Xem Bài Viết Mẫu {selectedLevelKey}</span>
            </button>

            <button
              onClick={() => onNavigate('exams')}
              className="px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-amber-500 text-white dark:text-slate-950 text-xs font-bold shadow-md hover:bg-slate-800 dark:hover:bg-amber-400 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Vào Phòng Thi {selectedLevelKey}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
