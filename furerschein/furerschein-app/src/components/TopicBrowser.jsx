import { useState, useMemo } from 'react'
import { BookOpen, CheckCircle2, ChevronRight, Search, Filter } from 'lucide-react'

export default function TopicBrowser({ questions, progress, onSelectTopic }) {
  const [filterType, setFilterType] = useState('all') // 'all' | 'grundstoff' | 'zusatzstoff'
  const [searchQuery, setSearchQuery] = useState('')

  const answered = progress.answered || {}

  // Group questions by full category path
  const topics = useMemo(() => {
    const topicMap = {}
    questions.forEach(q => {
      const key = q.category_full
      if (!topicMap[key]) {
        const isGrundstoff = key.includes('Grundstoff')
        const parts = key.split('/')
        const name = parts[parts.length - 1].trim()
        const section = parts.length > 2 ? parts[1].trim() : ''

        topicMap[key] = {
          category_full: key,
          name,
          section,
          isGrundstoff,
          typeLabel: isGrundstoff ? 'Grundstoff' : 'Zusatzstoff B',
          total: 0,
          correct: 0
        }
      }
      topicMap[key].total++
      if (answered[q.id] === true) {
        topicMap[key].correct++
      }
    })

    return Object.values(topicMap).map(t => ({
      ...t,
      pct: t.total > 0 ? Math.round((t.correct / t.total) * 100) : 0
    }))
  }, [questions, answered])

  const filteredTopics = useMemo(() => {
    return topics.filter(t => {
      if (filterType === 'grundstoff' && !t.isGrundstoff) return false
      if (filterType === 'zusatzstoff' && t.isGrundstoff) return false
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        return t.name.toLowerCase().includes(q) || t.category_full.toLowerCase().includes(q)
      }
      return true
    })
  }, [topics, filterType, searchQuery])

  const grundstoffList = filteredTopics.filter(t => t.isGrundstoff)
  const zusatzstoffList = filteredTopics.filter(t => !t.isGrundstoff)

  const renderTopicCard = (t) => {
    const isDone = t.pct === 100 && t.total > 0
    const isInProgress = t.pct > 0 && t.pct < 100

    let badgeClass = 'bg-gray-100 text-gray-600'
    let badgeText = 'Chưa học'
    if (isDone) {
      badgeClass = 'bg-green-100 text-green-700'
      badgeText = 'Hoàn thành'
    } else if (isInProgress) {
      badgeClass = 'bg-amber-100 text-amber-700'
      badgeText = `${t.pct}%`
    }

    return (
      <div
        key={t.category_full}
        onClick={() => onSelectTopic(t.category_full)}
        className="bg-white p-4 rounded-2xl border border-gray-100 hover:border-green-400 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
      >
        <div>
          <div className="flex items-start justify-between gap-2 mb-2">
            <span className="text-[11px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-md bg-gray-50 text-gray-500">
              {t.section || (t.isGrundstoff ? 'Cơ bản' : 'Hạng B')}
            </span>
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${badgeClass}`}>
              {badgeText}
            </span>
          </div>
          <h4 className="font-bold text-gray-900 group-hover:text-green-700 transition-colors text-sm sm:text-base leading-snug">
            {t.name}
          </h4>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-50">
          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${isDone ? 'bg-green-500' : 'bg-green-600'}`}
              style={{ width: `${t.pct}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs text-gray-400 mt-2">
            <span>{t.correct} / {t.total} câu</span>
            <span className="text-green-600 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center">
              Luyện tập <ChevronRight className="w-3 h-3 ml-0.5" />
            </span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header & Filter Controls */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-green-600" /> Học Theo Chủ Đề (Themenkatalog)
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              87 chuyên đề lý thuyết được phân loại chuẩn theo luật giao thông CHLB Đức
            </p>
          </div>

          {/* Type Filter Buttons */}
          <div className="flex p-1 bg-gray-100 rounded-xl self-start sm:self-auto text-xs font-semibold">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${filterType === 'all' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500 hover:text-gray-900'}`}
            >
              Tất cả ({topics.length})
            </button>
            <button
              onClick={() => setFilterType('grundstoff')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${filterType === 'grundstoff' ? 'bg-white text-green-700 shadow-xs' : 'text-gray-500 hover:text-gray-900'}`}
            >
              Grundstoff ({topics.filter(t => t.isGrundstoff).length})
            </button>
            <button
              onClick={() => setFilterType('zusatzstoff')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${filterType === 'zusatzstoff' ? 'bg-white text-blue-700 shadow-xs' : 'text-gray-500 hover:text-gray-900'}`}
            >
              Zusatzstoff B ({topics.filter(t => !t.isGrundstoff).length})
            </button>
          </div>
        </div>

        {/* Search inside topics */}
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm chủ đề (ví dụ: Überholen, Vorfahrt, Parken, Cao tốc...)"
            className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-green-500"
          />
        </div>
      </div>

      {/* Topics Content */}
      {filterType === 'all' && !searchQuery.trim() ? (
        <>
          {/* Section Grundstoff */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <h3 className="text-lg font-bold text-gray-900">
                Grundstoff — Kiến thức cơ bản ({grundstoffList.length} chủ đề)
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {grundstoffList.map(renderTopicCard)}
            </div>
          </div>

          {/* Section Zusatzstoff */}
          <div className="pt-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-3 h-3 rounded-full bg-blue-500" />
              <h3 className="text-lg font-bold text-gray-900">
                Zusatzstoff — Hạng B nâng cao ({zusatzstoffList.length} chủ đề)
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {zusatzstoffList.map(renderTopicCard)}
            </div>
          </div>
        </>
      ) : (
        <div>
          {filteredTopics.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 text-gray-400">
              <Search className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>Không tìm thấy chủ đề phù hợp với "{searchQuery}"</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredTopics.map(renderTopicCard)}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
