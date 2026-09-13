import { useState, useEffect } from 'react'
import QuestionCard from './QuestionCard'
import { ChevronDown, ChevronLeft, ChevronRight, List, Layers, ArrowLeft } from 'lucide-react'

export default function QuestionList({ questions, title, onBack, showVn, progress, markAnswered, toggleFavorite }) {
  const [viewMode, setViewMode] = useState(() => {
    try {
      return localStorage.getItem('fuhrerschein_view_mode') || 'single'
    } catch {
      return 'single'
    }
  })
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(15)

  // Save viewMode preference
  useEffect(() => {
    try {
      localStorage.setItem('fuhrerschein_view_mode', viewMode)
    } catch {}
  }, [viewMode])

  // Reset or adjust currentIndex if questions length changes
  useEffect(() => {
    if (currentIndex >= questions.length) {
      setCurrentIndex(Math.max(0, questions.length - 1))
    }
  }, [questions.length, currentIndex])

  // Keyboard navigation for single card mode
  useEffect(() => {
    if (viewMode !== 'single') return

    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return

      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        setCurrentIndex(prev => Math.max(0, prev - 1))
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [viewMode, questions.length])

  if (!questions || questions.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 text-gray-400">
        <p>Không có câu hỏi nào trong danh sách này.</p>
      </div>
    )
  }

  const currentQ = questions[currentIndex]
  const visibleQuestions = questions.slice(0, visibleCount)
  const hasMore = visibleCount < questions.length

  return (
    <div className="space-y-4">
      {/* Top action row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {onBack ? (
          <button
            onClick={onBack}
            className="text-sm text-green-700 hover:text-green-800 font-bold inline-flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Quay lại chủ đề / Zurück
          </button>
        ) : <div />}

        {/* View mode segmented switcher */}
        <div className="inline-flex p-1 bg-gray-200/70 rounded-xl self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setViewMode('single')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === 'single'
                ? 'bg-white text-green-700 shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Từng câu</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('list')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === 'list'
                ? 'bg-white text-green-700 shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>Cuộn danh sách</span>
          </button>
        </div>
      </div>

      {/* Title & Stats */}
      {title && (
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug">{title}</h2>
          <span className="text-xs bg-gray-100 text-gray-600 font-semibold px-2.5 py-1 rounded-full shrink-0">
            {questions.length} câu hỏi
          </span>
        </div>
      )}

      {/* SINGLE CARD MODE */}
      {viewMode === 'single' && currentQ && (
        <div className="space-y-4">
          {/* Card Progress Header */}
          <div className="bg-white p-3 sm:p-4 rounded-2xl border border-gray-100 shadow-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold px-2.5 py-1 rounded-lg bg-green-100 text-green-800">
                Câu {currentIndex + 1} / {questions.length}
              </span>
              <span className="text-xs text-gray-400 hidden xs:inline">
                (Dùng phím mũi tên trái/phải trên bàn phím)
              </span>
            </div>

            {/* Quick jump select */}
            <select
              value={currentIndex}
              onChange={(e) => {
                setCurrentIndex(Number(e.target.value))
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="text-xs font-semibold bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-gray-700 cursor-pointer focus:outline-none focus:border-green-500"
            >
              {questions.map((q, idx) => {
                const isAns = progress.answered?.[q.id]
                const mark = isAns === true ? '[Đúng] ' : isAns === false ? '[Sai] ' : ''
                return (
                  <option key={q.id} value={idx}>
                    {mark}Câu {idx + 1} ({q.points}P)
                  </option>
                )
              })}
            </select>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-green-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${Math.round(((currentIndex + 1) / questions.length) * 100)}%` }}
            />
          </div>

          {/* Current Question */}
          <QuestionCard
            key={currentQ.id}
            question={currentQ}
            showVn={showVn}
            onAnswer={(correct) => markAnswered(currentQ.id, correct)}
            isFavorite={!!progress.favorites?.[currentQ.id]}
            onToggleFavorite={() => toggleFavorite(currentQ.id)}
            wasAnswered={progress.answered?.[currentQ.id]}
            errorCount={progress.errors?.[currentQ.id]}
          />

          {/* Navigation Controls */}
          <div className="flex items-center justify-between gap-2 pt-2">
            <button
              disabled={currentIndex === 0}
              onClick={() => {
                setCurrentIndex(prev => Math.max(0, prev - 1))
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                currentIndex === 0
                  ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                  : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-400 hover:bg-gray-50 active:scale-95 shadow-xs'
              }`}
            >
              <ChevronLeft className="w-4 h-4" /> Câu trước
            </button>

            <span className="text-xs text-gray-400 font-medium">
              {currentIndex + 1} / {questions.length}
            </span>

            <button
              disabled={currentIndex === questions.length - 1}
              onClick={() => {
                setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                currentIndex === questions.length - 1
                  ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700 active:scale-95 shadow-sm'
              }`}
            >
              Câu sau <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* LIST SCROLL MODE */}
      {viewMode === 'list' && (
        <div className="space-y-6">
          {visibleQuestions.map(q => (
            <QuestionCard
              key={q.id}
              question={q}
              showVn={showVn}
              onAnswer={(correct) => markAnswered(q.id, correct)}
              isFavorite={!!progress.favorites?.[q.id]}
              onToggleFavorite={() => toggleFavorite(q.id)}
              wasAnswered={progress.answered?.[q.id]}
              errorCount={progress.errors?.[q.id]}
            />
          ))}

          {hasMore && (
            <div className="text-center mt-8 mb-4">
              <button
                onClick={() => setVisibleCount(prev => prev + 15)}
                className="px-6 py-3 rounded-2xl bg-white border border-gray-200 text-gray-800 hover:border-green-500 hover:text-green-700 font-bold text-sm shadow-xs transition-all cursor-pointer inline-flex items-center gap-2 active:scale-95"
              >
                <span>Xem thêm ({questions.length - visibleCount} câu tiếp theo)</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
