import { useState } from 'react'
import QuestionCard from './QuestionCard'
import { ChevronDown } from 'lucide-react'

export default function QuestionList({ questions, title, onBack, showVn, progress, markAnswered, toggleFavorite }) {
  const [visibleCount, setVisibleCount] = useState(15)

  const visibleQuestions = questions.slice(0, visibleCount)
  const hasMore = visibleCount < questions.length

  return (
    <div>
      {onBack && (
        <button
          onClick={onBack}
          className="mb-4 text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 cursor-pointer transition-colors"
        >
          ← Quay lại danh sách / Zurück
        </button>
      )}

      {title && (
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <span className="text-xs bg-gray-100 text-gray-600 font-semibold px-2.5 py-1 rounded-full">
            {questions.length} câu hỏi
          </span>
        </div>
      )}

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
      </div>

      {hasMore && (
        <div className="text-center mt-8 mb-4">
          <button
            onClick={() => setVisibleCount(prev => prev + 15)}
            className="px-6 py-3 rounded-2xl bg-white border border-gray-200 text-gray-800 hover:border-green-500 hover:text-green-700 font-bold text-sm shadow-sm transition-all cursor-pointer inline-flex items-center gap-2 active:scale-95"
          >
            <span>Xem thêm ({questions.length - visibleCount} câu tiếp theo)</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}
