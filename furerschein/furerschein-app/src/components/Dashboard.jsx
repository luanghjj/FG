import { BookOpen, GraduationCap, AlertTriangle, RotateCcw, Search, CheckCircle2, Star, Target, Award, ArrowRight, Sparkles, Trophy } from 'lucide-react'

export default function Dashboard({ questions, progress, onNavigate }) {
  const answered = progress.answered || {}
  const errors = progress.errors || {}
  const favorites = progress.favorites || {}

  const totalQuestions = questions.length
  const correctCount = Object.values(answered).filter(Boolean).length
  const errorCount = Object.keys(errors).length
  const favCount = Object.keys(favorites).length
  const percent = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0

  const grundstoffCount = questions.filter(q => q.category.includes('Grundstoff')).length
  const zusatzstoffCount = questions.filter(q => q.category.includes('Zusatzstoff')).length
  const highPointsCount = questions.filter(q => q.points === 5).length

  // Top topics
  const topicMap = {}
  questions.forEach(q => {
    const key = q.category_full
    if (!topicMap[key]) {
      topicMap[key] = {
        name: q.topic || key.split('/').pop(),
        category_full: key,
        total: 0,
        correct: 0
      }
    }
    topicMap[key].total++
    if (answered[q.id] === true) {
      topicMap[key].correct++
    }
  })

  const topTopics = Object.values(topicMap)
    .sort((a, b) => b.total - a.total)
    .slice(0, 6)

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-green-700 via-green-600 to-emerald-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold mb-3">
            <span>🇩🇪 Tiêu chuẩn TÜV / DEKRA</span>
            <span>•</span>
            <span>🇻🇳 Hỗ trợ 100% tiếng Việt</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Luyện Thi Lý Thuyết Bằng Lái Đức
          </h1>
          <p className="text-green-100 text-sm sm:text-base mt-2 leading-relaxed">
            Học thông minh với 1.124 câu hỏi song ngữ chuẩn xác, 372 hình mô phỏng 3D góc nhìn thực tế và bài thi thử theo quy chế chấm điểm chính thức.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('tips')}
              className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-amber-900" />
              5 Bộ Mẹo Vàng Thi Đỗ
            </button>
            <button
              onClick={() => onNavigate('exam')}
              className="px-5 py-2.5 rounded-xl bg-white text-green-800 font-bold text-sm shadow-md hover:bg-green-50 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <GraduationCap className="w-4 h-4 text-green-700" />
              Thi thử (30 câu)
            </button>
            <button
              onClick={() => onNavigate('high-points')}
              className="px-5 py-2.5 rounded-xl bg-green-800/80 hover:bg-green-800 text-white font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer border border-green-500/30"
            >
              <AlertTriangle className="w-4 h-4 text-yellow-300" />
              138 câu điểm liệt (5P)
            </button>
          </div>
        </div>
      </div>

      {/* Progress & Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500">Tổng câu hỏi</span>
            <BookOpen className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-2">{totalQuestions}</p>
          <p className="text-xs text-gray-400 mt-0.5">Grund- & Zusatzstoff</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500">Đã học đúng</span>
            <CheckCircle2 className="w-4 h-4 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-green-600 mt-2">{correctCount}</p>
          <p className="text-xs text-gray-400 mt-0.5">{percent}% hoàn thành</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500">Cần ôn lại (Sai)</span>
            <RotateCcw className="w-4 h-4 text-red-500" />
          </div>
          <p className="text-2xl font-bold text-red-600 mt-2">{errorCount}</p>
          <p className="text-xs text-gray-400 mt-0.5">Sổ tay câu sai</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500">Đánh dấu sao</span>
            <Star className="w-4 h-4 text-yellow-500" />
          </div>
          <p className="text-2xl font-bold text-yellow-600 mt-2">{favCount}</p>
          <p className="text-xs text-gray-400 mt-0.5">Câu hỏi quan trọng</p>
        </div>
      </div>

      {/* Total Progress Bar */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="font-semibold text-gray-800">Tiến độ ôn tập chung</span>
          <span className="font-bold text-green-600">{percent}% ({correctCount}/{totalQuestions} câu)</span>
        </div>
        <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-green-500 to-emerald-600 h-full rounded-full transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {/* Chỉ số Sẵn Sàng Đi Thi (Prüfungsreife) */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎯</span>
            <div>
              <h4 className="text-sm font-bold text-gray-900">Độ Sẵn Sàng Đi Thi TÜV (Prüfungsreife)</h4>
              <p className="text-[11px] text-gray-500">Đánh giá theo độ thông thạo câu điểm liệt và tỷ lệ làm bài</p>
            </div>
          </div>
          <span className="text-2xl font-black font-mono text-emerald-600">
            {Math.min(100, Math.round((totalQuestions > 0 ? (correctCount / totalQuestions) * 60 : 0) + (highPointsCount > 0 ? (questions.filter(q => q.points === 5 && answered[q.id] === true).length / highPointsCount) * 30 : 0) + (errorCount === 0 && correctCount > 20 ? 10 : Math.max(0, 10 - errorCount * 0.5))))}%
          </span>
        </div>

        <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 via-amber-500 to-emerald-500 h-full rounded-full transition-all duration-700"
            style={{
              width: `${Math.min(100, Math.round((totalQuestions > 0 ? (correctCount / totalQuestions) * 60 : 0) + (highPointsCount > 0 ? (questions.filter(q => q.points === 5 && answered[q.id] === true).length / highPointsCount) * 30 : 0) + (errorCount === 0 && correctCount > 20 ? 10 : Math.max(0, 10 - errorCount * 0.5))))}%`
            }}
          />
        </div>

        <div className="flex items-center justify-between text-xs pt-1 border-t border-gray-50">
          <span className="text-gray-500 text-[11px]">
            Đã thuộc câu 5P: <strong>{questions.filter(q => q.points === 5 && answered[q.id] === true).length} / {highPointsCount}</strong>
          </span>
          <span className="font-semibold text-[11px] text-emerald-700">
            {Math.min(100, Math.round((totalQuestions > 0 ? (correctCount / totalQuestions) * 60 : 0) + (highPointsCount > 0 ? (questions.filter(q => q.points === 5 && answered[q.id] === true).length / highPointsCount) * 30 : 0) + (errorCount === 0 && correctCount > 20 ? 10 : Math.max(0, 10 - errorCount * 0.5)))) >= 85
              ? '🟢 Sẵn sàng 100% để thi đỗ!'
              : Math.min(100, Math.round((totalQuestions > 0 ? (correctCount / totalQuestions) * 60 : 0) + (highPointsCount > 0 ? (questions.filter(q => q.points === 5 && answered[q.id] === true).length / highPointsCount) * 30 : 0) + (errorCount === 0 && correctCount > 20 ? 10 : Math.max(0, 10 - errorCount * 0.5)))) >= 50
                ? '🟡 Tiến bộ tốt — Hãy thi thử tiếp'
                : '🔴 Hãy cày thêm 138 câu 5 điểm'}
          </span>
        </div>
      </div>

      {/* Main Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          onClick={() => onNavigate('topics')}
          className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:border-green-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold mb-4">
              G
            </div>
            <span className="text-xs bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full font-medium">
              Bắt buộc cho mọi hạng
            </span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-700 transition-colors">
            Grundstoff (Kiến thức cơ bản)
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Quy tắc giao thông, biển báo, nhường đường, nhận diện nguy hiểm, bảo vệ môi trường.
          </p>
          <div className="mt-4 flex items-center justify-between text-xs text-gray-500 border-t pt-3">
            <span>{grundstoffCount} câu hỏi</span>
            <span className="text-green-600 font-medium group-hover:translate-x-1 transition-transform flex items-center gap-1">
              Xem tất cả <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        <div
          onClick={() => onNavigate('topics')}
          className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 font-bold mb-4">
              B
            </div>
            <span className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full font-medium">
              Riêng Hạng B
            </span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
            Zusatzstoff Klasse B (Chuyên biệt ô tô)
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Lái xe trên Autobahn, kỹ thuật ô tô, kéo rơ-moóc (Anhänger), tải trọng và hành khách.
          </p>
          <div className="mt-4 flex items-center justify-between text-xs text-gray-500 border-t pt-3">
            <span>{zusatzstoffCount} câu hỏi</span>
            <span className="text-blue-600 font-medium group-hover:translate-x-1 transition-transform flex items-center gap-1">
              Xem tất cả <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>

      {/* Quick Action Navigation Grid */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Target className="w-4 h-4 text-green-600" /> Các chế độ ôn luyện
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={() => onNavigate('exam')}
            className="p-4 rounded-xl bg-gray-50 hover:bg-green-50 border border-gray-100 hover:border-green-200 transition-all text-left group cursor-pointer"
          >
            <GraduationCap className="w-6 h-6 text-green-600 mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-sm font-bold text-gray-800 group-hover:text-green-800">Thi thử 30 câu</p>
            <p className="text-xs text-gray-500 mt-0.5">Chuẩn thời gian & điểm</p>
          </button>

          <button
            onClick={() => onNavigate('high-points')}
            className="p-4 rounded-xl bg-gray-50 hover:bg-red-50 border border-gray-100 hover:border-red-200 transition-all text-left group cursor-pointer"
          >
            <AlertTriangle className="w-6 h-6 text-red-600 mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-sm font-bold text-gray-800 group-hover:text-red-800">Câu 5 điểm</p>
            <p className="text-xs text-gray-500 mt-0.5">{highPointsCount} câu điểm liệt</p>
          </button>

          <button
            onClick={() => onNavigate('errors')}
            className="p-4 rounded-xl bg-gray-50 hover:bg-orange-50 border border-gray-100 hover:border-orange-200 transition-all text-left group cursor-pointer"
          >
            <RotateCcw className="w-6 h-6 text-orange-600 mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-sm font-bold text-gray-800 group-hover:text-orange-800">Sổ tay câu sai</p>
            <p className="text-xs text-gray-500 mt-0.5">{errorCount} câu cần sửa</p>
          </button>

          <button
            onClick={() => onNavigate('search')}
            className="p-4 rounded-xl bg-gray-50 hover:bg-blue-50 border border-gray-100 hover:border-blue-200 transition-all text-left group cursor-pointer"
          >
            <Search className="w-6 h-6 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-sm font-bold text-gray-800 group-hover:text-blue-800">Tra cứu nhanh</p>
            <p className="text-xs text-gray-500 mt-0.5">Từ khóa DE & VN</p>
          </button>
        </div>
      </div>

      {/* 5. Chiến Thuật Ôn Thi Đảm Bảo 100% Đỗ Ngay Lần Đầu */}
      <div className="bg-gradient-to-br from-amber-50/70 via-orange-50/50 to-yellow-50/70 rounded-3xl p-6 sm:p-7 border border-amber-200 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-200/80 pb-4">
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 flex items-center gap-2">
              <span className="text-xl">🏆</span> Chiến Thuật Ôn Thi Đảm Bảo 100% Đỗ Ngay Lần Đầu
            </h3>
            <p className="text-xs text-amber-800/80 mt-1">
              Lộ trình 4 bước vàng chuẩn bị cho kỳ thi lý thuyết bằng lái xe Đức (TÜV / DEKRA)
            </p>
          </div>
          <button
            onClick={() => onNavigate('tips')}
            className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" /> Xem toàn bộ 5 bộ mẹo
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Bước 1 */}
          <div
            onClick={() => onNavigate('high-points')}
            className="p-5 rounded-2xl bg-white border border-red-200 hover:border-red-400 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-extrabold tracking-wide uppercase px-2.5 py-0.5 rounded-md bg-red-100 text-red-700">
                  Bước 1
                </span>
                <span className="text-xs text-red-600 font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  Ôn ngay <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
              <h4 className="font-bold text-gray-900 group-hover:text-red-700 text-sm sm:text-base">
                Cày nát tab "Câu 5 điểm" trước (138 câu)
              </h4>
              <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                Sai 2 câu 5 điểm là <strong>TRƯỢT NGAY TỨC KHẮC</strong> dù tổng điểm phạt vẫn $\le 10$. Vì vậy học thuộc lòng 138 câu này trước là bạn đã nắm chắc 70% cơ hội đỗ.
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-gray-100 text-[11px] text-red-600 font-semibold">
              ⚠️ 138 câu điểm liệt (5-Punkte-Fragen)
            </div>
          </div>

          {/* Bước 2 */}
          <div
            onClick={() => onNavigate('topics')}
            className="p-5 rounded-2xl bg-white border border-blue-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-extrabold tracking-wide uppercase px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-700">
                  Bước 2
                </span>
                <span className="text-xs text-blue-600 font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  Vào học <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
              <h4 className="font-bold text-gray-900 group-hover:text-blue-700 text-sm sm:text-base">
                Luyện theo từng chuyên đề (tab "Học theo chủ đề")
              </h4>
              <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                Ưu tiên các mục lớn: <em>Vorfahrt</em> (nhường đường), <em>Überholen</em> (vượt xe), <em>Geschwindigkeit</em> (tốc độ), <em>Gefahrenlehre</em> (nhận biết nguy hiểm).
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-gray-100 text-[11px] text-blue-600 font-semibold">
              📚 87 chuyên đề lý thuyết phân loại chuẩn
            </div>
          </div>

          {/* Bước 3 */}
          <div
            onClick={() => onNavigate('errors')}
            className="p-5 rounded-2xl bg-white border border-orange-200 hover:border-orange-400 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-extrabold tracking-wide uppercase px-2.5 py-0.5 rounded-md bg-orange-100 text-orange-700">
                  Bước 3
                </span>
                <span className="text-xs text-orange-600 font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  Mở sổ tay <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
              <h4 className="font-bold text-gray-900 group-hover:text-orange-700 text-sm sm:text-base">
                Xem kỹ "Sổ tay câu sai" (tab "Câu sai")
              </h4>
              <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                Trước ngày thi 3 ngày, chỉ mở đúng tab này để làm đi làm lại các câu từng sai đến khi danh sách về số 0.
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-gray-100 text-[11px] text-orange-600 font-semibold">
              🔄 Tự động lưu vết mọi câu sai ({errorCount} câu cần sửa)
            </div>
          </div>

          {/* Bước 4 */}
          <div
            onClick={() => onNavigate('exam')}
            className="p-5 rounded-2xl bg-white border border-green-200 hover:border-green-400 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-extrabold tracking-wide uppercase px-2.5 py-0.5 rounded-md bg-green-100 text-green-700">
                  Bước 4
                </span>
                <span className="text-xs text-green-600 font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  Thi thử <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
              <h4 className="font-bold text-gray-900 group-hover:text-green-700 text-sm sm:text-base">
                Thi thử 10 đề liên tục (tab "Thi thử")
              </h4>
              <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                Khi bạn làm 5–7 đề thi thử liên tiếp đều đạt kết quả <strong>ĐẬU (Bestanden)</strong> thì tự tin 100% đi thi thật tại TÜV/DEKRA sẽ đỗ!
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-gray-100 text-[11px] text-green-700 font-semibold">
              🎓 Mô phỏng 30 câu ngẫu nhiên 45 phút
            </div>
          </div>
        </div>
      </div>

      {/* Top Topics */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
            <Award className="w-4 h-4 text-yellow-500" /> Các chuyên đề trọng tâm
          </h3>
          <button
            onClick={() => onNavigate('topics')}
            className="text-xs text-green-700 hover:text-green-800 font-semibold cursor-pointer"
          >
            Xem tất cả 87 chuyên đề →
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {topTopics.map(t => {
            const tPct = t.total > 0 ? Math.round((t.correct / t.total) * 100) : 0
            return (
              <div
                key={t.category_full}
                onClick={() => onNavigate('topics', t.category_full)}
                className="p-4 rounded-xl border border-gray-100 hover:border-green-300 hover:bg-green-50/50 transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                  <span className="font-semibold text-gray-800 truncate max-w-[200px]">{t.name}</span>
                  <span>{t.total} câu</span>
                </div>
                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden mt-2">
                  <div className="bg-green-500 h-full rounded-full" style={{ width: `${tPct}%` }} />
                </div>
                <div className="text-[11px] text-gray-400 mt-1.5 flex justify-between">
                  <span>Đã thuộc: {t.correct}</span>
                  <span>{tPct}%</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
