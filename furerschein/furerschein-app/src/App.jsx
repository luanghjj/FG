import { useState, useEffect } from 'react'
import './index.css'
import questionsData from './data/theory_questions.json'
import TopicBrowser from './components/TopicBrowser'
import ExamSimulation from './components/ExamSimulation'
import QuestionCard from './components/QuestionCard'
import QuestionList from './components/QuestionList'
import Dashboard from './components/Dashboard'
import TipsGuide from './components/TipsGuide'
import { BookOpen, GraduationCap, AlertTriangle, RotateCcw, Search, Car, Sparkles, User, Image as ImageIcon, Star, Filter } from 'lucide-react'

const TABS = [
  { id: 'dashboard', label: 'Trang chủ', labelDe: 'Start', icon: Car },
  { id: 'tips', label: 'Mẹo thi vàng', labelDe: 'Tipps', icon: Sparkles },
  { id: 'topics', label: 'Học theo chủ đề', labelDe: 'Themen', icon: BookOpen },
  { id: 'exam', label: 'Thi thử', labelDe: 'Prüfung', icon: GraduationCap },
  { id: 'high-points', label: 'Câu 5 điểm', labelDe: '5-Punkte', icon: AlertTriangle },
  { id: 'errors', label: 'Câu sai', labelDe: 'Fehler', icon: RotateCcw },
  { id: 'search', label: 'Tìm kiếm', labelDe: 'Suche', icon: Search },
]

const PLAYER_KEY = 'learn_player_name'

function getStoredPlayer() {
  try {
    return (localStorage.getItem(PLAYER_KEY) || '').trim()
  } catch {
    return ''
  }
}

function getProgressKey(player) {
  const p = (player || '').trim().toLowerCase()
  return p ? `fuhrerschein_progress_${p}` : 'fuhrerschein_progress'
}

function loadLocalProgress(player) {
  try {
    const key = getProgressKey(player)
    const data = localStorage.getItem(key)
    if (data) return JSON.parse(data)
    // Fallback: check legacy un-prefixed data
    const legacy = localStorage.getItem('fuhrerschein_progress')
    if (legacy) {
      if (player) localStorage.setItem(key, legacy)
      return JSON.parse(legacy)
    }
    return {}
  } catch {
    return {}
  }
}

function saveLocalProgress(progress, player) {
  try {
    const key = getProgressKey(player)
    localStorage.setItem(key, JSON.stringify(progress))
  } catch (e) {
    console.error('Failed to save progress:', e)
  }
  // Sync to Supabase LearnDB if available
  if (typeof window !== 'undefined' && window.LearnDB && player) {
    const p = player.trim().toLowerCase()
    window.LearnDB.upsertConfig(`learn:fuehrerschein:progress:${p}`, progress).catch(() => {})
  }
}

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [player, setPlayer] = useState(getStoredPlayer)
  const [progress, setProgress] = useState(() => loadLocalProgress(player))
  const [isEditingPlayer, setIsEditingPlayer] = useState(false)
  const [tempPlayerName, setTempPlayerName] = useState('')
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchFilter, setSearchFilter] = useState('all') // 'all' | 'image' | 'points5' | 'wrong' | 'favorite'
  const [showVn, setShowVn] = useState(true)
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return localStorage.getItem('fuhrerschein_dark') === 'true'
    } catch { return false }
  })

  // Dynamically load ../js/supabase.js for shared cloud storage
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.LearnDB) {
      const script = document.createElement('script')
      script.src = new URL('../js/supabase.js', window.location.href).href
      script.async = true
      script.onload = () => {
        if (player && window.LearnDB && window.LearnDB.getConfig) {
          const p = player.trim().toLowerCase()
          window.LearnDB.getConfig(`learn:fuehrerschein:progress:${p}`).then(res => {
            if (res && res.value && typeof res.value === 'object') {
              setProgress(prev => {
                const localCount = Object.keys(prev.answered || {}).length
                const remoteCount = Object.keys(res.value.answered || {}).length
                if (remoteCount >= localCount) {
                  saveLocalProgress(res.value, player)
                  return res.value
                }
                return prev
              })
            }
          }).catch(() => {})
        }
      }
      document.head.appendChild(script)
    }
  }, [player])

  // When player changes, load progress and try cloud sync
  useEffect(() => {
    const currentProg = loadLocalProgress(player)
    setProgress(currentProg)

    if (player && typeof window !== 'undefined' && window.LearnDB && window.LearnDB.getConfig) {
      const p = player.trim().toLowerCase()
      window.LearnDB.getConfig(`learn:fuehrerschein:progress:${p}`).then(res => {
        if (res && res.value && typeof res.value === 'object') {
          const remoteProg = res.value
          const localAnswered = Object.keys(currentProg.answered || {}).length
          const remoteAnswered = Object.keys(remoteProg.answered || {}).length
          if (remoteAnswered >= localAnswered) {
            saveLocalProgress(remoteProg, player)
            setProgress(remoteProg)
          }
        }
      }).catch(() => {})
    }
  }, [player])

  useEffect(() => {
    saveLocalProgress(progress, player)
  }, [progress, player])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    try {
      localStorage.setItem('fuhrerschein_dark', darkMode ? 'true' : 'false')
    } catch (e) {}
  }, [darkMode])

  const errorIds = progress.errors ? Object.keys(progress.errors).map(Number) : []
  const errorQuestions = questionsData.filter(q => errorIds.includes(q.id))
  const highPointQuestions = questionsData.filter(q => q.points === 5)

  const markAnswered = (qId, wasCorrect) => {
    setProgress(prev => {
      const next = { ...prev }
      if (!next.answered) next.answered = {}
      next.answered[qId] = wasCorrect

      if (!wasCorrect) {
        if (!next.errors) next.errors = {}
        next.errors[qId] = (next.errors[qId] || 0) + 1
      } else {
        if (next.errors) delete next.errors[qId]
      }
      return next
    })
  }

  const toggleFavorite = (qId) => {
    setProgress(prev => {
      const next = { ...prev }
      if (!next.favorites) next.favorites = {}
      if (next.favorites[qId]) delete next.favorites[qId]
      else next.favorites[qId] = true
      return next
    })
  }

  const baseQuestions = searchQuery.trim().length >= 2
    ? questionsData.filter(q => {
        const s = searchQuery.toLowerCase().trim()
        const deMatch = (q.question_de || '').toLowerCase().includes(s)
        const vnMatch = (q.question_vn || '').toLowerCase().includes(s)
        const codeMatch = (q.code || '').toLowerCase().includes(s)
        const optMatch = (q.options || []).some(o =>
          (o.text_de || '').toLowerCase().includes(s) ||
          (o.text_vn || '').toLowerCase().includes(s)
        )
        return deMatch || vnMatch || codeMatch || optMatch
      })
    : (searchFilter !== 'all' ? questionsData : [])

  const filteredSearchResults = baseQuestions.filter(q => {
    if (searchFilter === 'image') return Boolean(q.image)
    if (searchFilter === 'points5') return q.points === 5
    if (searchFilter === 'wrong') return errorIds.includes(q.id)
    if (searchFilter === 'favorite') return Boolean(progress.favorites?.[q.id])
    return true
  })

  const topicQuestions = selectedTopic
    ? questionsData.filter(q => q.category_full === selectedTopic)
    : []

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col transition-colors duration-200">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-700 via-green-600 to-emerald-700 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between gap-2">
          <div
            onClick={() => { setActiveTab('dashboard'); setSelectedTopic(null) }}
            className="flex items-center gap-2 sm:gap-2.5 cursor-pointer select-none min-w-0"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
              <Car className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="min-w-0">
              <h1 className="text-sm sm:text-lg font-bold leading-tight truncate">
                Führerschein Lernen
              </h1>
              <p className="text-green-100 text-[10px] sm:text-xs truncate hidden sm:block">Học Lý Thuyết Lái Xe Đức</p>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={() => { setTempPlayerName(player); setIsEditingPlayer(true) }}
              className="px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-semibold cursor-pointer bg-white/20 hover:bg-white/30 backdrop-blur-md transition-all active:scale-95 flex items-center gap-1 text-white max-w-[80px] sm:max-w-[150px] truncate"
              title="Đổi Nickname người học (tiến độ lưu theo Nickname)"
            >
              <User className="w-3 h-3 shrink-0" />
              <span className="truncate">{player || 'Nickname'}</span>
            </button>

            <button
              type="button"
              onClick={() => setShowVn(!showVn)}
              className="px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold cursor-pointer bg-white/20 hover:bg-white/30 backdrop-blur-md transition-all active:scale-95 flex items-center gap-0.5 text-white shrink-0"
              title="Bật/tắt song ngữ tiếng Việt"
            >
              <span>{showVn ? 'TV' : 'DE'}</span>
            </button>
            <a
              href="../"
              onClick={() => {
                try { localStorage.setItem('azubi_track', 'fachkraft'); } catch (_) {}
              }}
              className="px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold cursor-pointer bg-white/20 hover:bg-white/30 backdrop-blur-md transition-all active:scale-95 flex items-center gap-0.5 text-white no-underline shrink-0"
              title="Quay lại AzubiHub"
            >
              <span className="hidden sm:inline">← AzubiHub</span>
              <span className="sm:hidden">← Hub</span>
            </a>
          </div>
        </div>
      </header>

      {/* Desktop/Tablet Tab Navigation (Hidden on Mobile) */}
      <nav className="hidden md:block bg-white shadow-xs border-b border-gray-200/80 sticky top-[57px] z-40 overflow-x-auto scrollbar-none">
        <div className="max-w-6xl mx-auto px-2 flex">
          {TABS.map(tab => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setSelectedTopic(null) }}
                className={`flex items-center gap-1.5 px-3.5 py-3 text-sm font-bold whitespace-nowrap border-b-2 transition-all cursor-pointer ${isActive ? 'border-green-600 text-green-700 bg-green-50/50' : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-200'}`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-green-600' : 'text-gray-400'}`} />
                <span>{tab.label}</span>
                {tab.id === 'errors' && errorIds.length > 0 && (
                  <span className="bg-red-500 text-white text-[11px] font-bold rounded-full px-1.5 py-0.2 min-w-[18px] text-center">
                    {errorIds.length}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-6 flex-1 w-full pb-24 md:pb-8">
        {activeTab === 'dashboard' && (
          <Dashboard
            questions={questionsData}
            progress={progress}
            onNavigate={(tab, topic) => {
              setActiveTab(tab)
              if (topic) setSelectedTopic(topic)
            }}
          />
        )}

        {activeTab === 'tips' && (
          <TipsGuide
            onNavigate={(tab) => {
              setActiveTab(tab)
              setSelectedTopic(null)
            }}
          />
        )}

        {activeTab === 'topics' && !selectedTopic && (
          <TopicBrowser
            questions={questionsData}
            progress={progress}
            onSelectTopic={(t) => setSelectedTopic(t)}
          />
        )}

        {activeTab === 'topics' && selectedTopic && (
          <QuestionList
            questions={topicQuestions}
            title={selectedTopic.split('/').pop()}
            onBack={() => setSelectedTopic(null)}
            showVn={showVn}
            progress={progress}
            markAnswered={markAnswered}
            toggleFavorite={toggleFavorite}
          />
        )}

        {activeTab === 'exam' && (
          <ExamSimulation
            questions={questionsData}
            showVn={showVn}
            player={player}
            onComplete={(results) => {
              results.forEach(r => markAnswered(r.id, r.correct))
            }}
          />
        )}

        {activeTab === 'high-points' && (
          <div>
            <div className="mb-4 bg-red-50 border border-red-200 rounded-2xl p-4 text-red-950">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
                Câu 5 Điểm / 5-Punkte-Fragen ({highPointQuestions.length} câu)
              </h2>
              <p className="text-xs text-red-700 mt-1">
                ⚠️ Trong kỳ thi thật của TÜV / DEKRA: Nếu sai từ 2 câu 5 điểm trở lên, bạn sẽ bị <strong>TRƯỢT NGAY LẬP TỨC</strong> dù tổng điểm phạt vẫn $\le 10$ điểm.
              </p>
            </div>
            <QuestionList
              questions={highPointQuestions}
              showVn={showVn}
              progress={progress}
              markAnswered={markAnswered}
              toggleFavorite={toggleFavorite}
            />
          </div>
        )}

        {activeTab === 'errors' && (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <RotateCcw className="w-5 h-5 text-red-600" /> Sổ Tay Câu Sai (Fehlerliste)
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Tự động lưu các câu bạn làm sai. Câu hỏi chỉ tự động xóa khỏi sổ tay khi bạn làm đúng lại.
                </p>
              </div>
            </div>

            {errorQuestions.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm text-gray-400">
                <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Car className="w-8 h-8" />
                </div>
                <p className="text-lg font-bold text-gray-700">Chưa có câu sai nào!</p>
                <p className="text-xs text-gray-400 mt-1">Sehr gut! Bạn đang làm rất tốt, hãy tiếp tục phát huy!</p>
              </div>
            ) : (
              <QuestionList
                questions={errorQuestions}
                showVn={showVn}
                progress={progress}
                markAnswered={markAnswered}
                toggleFavorite={toggleFavorite}
              />
            )}
          </div>
        )}

        {activeTab === 'search' && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-1">
                <Search className="w-5 h-5 text-blue-600" /> Tra Cứu Câu Hỏi (Suche)
              </h2>
              <p className="text-xs text-gray-500">
                Nhập từ khóa tiếng Đức, tiếng Việt hoặc mã câu hỏi (ví dụ: Vorfahrt, Überholen, 1.1.01-001...)
              </p>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Nhập từ khóa hoặc mã câu hỏi..."
                className="w-full pl-11 pr-16 py-3 rounded-2xl border-2 border-gray-200 focus:border-green-500 focus:outline-none text-base bg-white shadow-xs transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-3 text-xs font-bold bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg px-2.5 py-1 cursor-pointer transition-colors"
                >
                  Xóa
                </button>
              )}
            </div>

            {/* Quick Filter Chips */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
              <span className="text-gray-400 font-semibold flex items-center gap-1 shrink-0">
                <Filter className="w-3.5 h-3.5" /> Lọc nhanh:
              </span>
              <button
                type="button"
                onClick={() => setSearchFilter('all')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer shrink-0 ${
                  searchFilter === 'all'
                    ? 'bg-green-700 text-white shadow-xs'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                Tất cả
              </button>
              <button
                type="button"
                onClick={() => setSearchFilter('image')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                  searchFilter === 'image'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Có hình ảnh</span>
              </button>
              <button
                type="button"
                onClick={() => setSearchFilter('points5')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                  searchFilter === 'points5'
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Câu 5 điểm</span>
              </button>
              <button
                type="button"
                onClick={() => setSearchFilter('wrong')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                  searchFilter === 'wrong'
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Đã từng làm sai</span>
                {errorIds.length > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    searchFilter === 'wrong' ? 'bg-white/30 text-white' : 'bg-red-100 text-red-600'
                  }`}>
                    {errorIds.length}
                  </span>
                )}
              </button>
              <button
                type="button"
                onClick={() => setSearchFilter('favorite')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                  searchFilter === 'favorite'
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                <Star className="w-3.5 h-3.5" />
                <span>Đã gắn sao</span>
              </button>
            </div>

            {/* Results count indicator */}
            {(searchQuery.trim().length >= 2 || searchFilter !== 'all') && (
              <div className="flex items-center justify-between text-xs text-gray-500 px-1">
                <span>
                  Tìm thấy <strong>{filteredSearchResults.length}</strong> câu hỏi phù hợp
                  {searchFilter !== 'all' && ' (theo bộ lọc)'}
                </span>
                {(searchQuery || searchFilter !== 'all') && (
                  <button
                    type="button"
                    onClick={() => { setSearchQuery(''); setSearchFilter('all') }}
                    className="text-green-700 hover:underline cursor-pointer font-semibold"
                  >
                    Đặt lại bộ lọc
                  </button>
                )}
              </div>
            )}

            {/* Search list */}
            {filteredSearchResults.length > 0 && (
              <QuestionList
                questions={filteredSearchResults}
                showVn={showVn}
                progress={progress}
                markAnswered={markAnswered}
                toggleFavorite={toggleFavorite}
              />
            )}

            {/* No matches */}
            {(searchQuery.trim().length >= 2 || searchFilter !== 'all') && filteredSearchResults.length === 0 && (
              <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 text-gray-400 shadow-xs">
                <Search className="w-12 h-12 mx-auto mb-2 opacity-30" />
                <p className="font-semibold text-gray-600">Không tìm thấy câu hỏi nào phù hợp</p>
                <p className="text-xs text-gray-400 mt-1">Thử thay đổi từ khóa hoặc bấm "Đặt lại bộ lọc"</p>
              </div>
            )}

            {/* Default guide when idle */}
            {searchQuery.trim().length < 2 && searchFilter === 'all' && (
              <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-xs space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-1">Gợi ý từ khóa tra cứu nhanh:</h3>
                  <p className="text-xs text-gray-500">
                    Bấm vào các từ khóa phổ biến dưới đây để tra cứu nhanh các tình huống hay thi:
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Vorfahrt', 'Geschwindigkeit', 'Überholen', 'Alkohol', 'Bremsweg', 'Kreisverkehr', 'Autobahn', 'Halten und Parken', 'Reißverschlussverfahren', 'Stau'].map(tag => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setSearchQuery(tag)}
                      className="px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-green-50 hover:text-green-700 text-gray-700 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Mobile Bottom Navigation Bar (Fixed at bottom for thumb-friendly ergonomics) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-gray-200/90 md:hidden safe-bottom shadow-2xl">
        <div className="grid grid-cols-6 h-16 items-center px-1">
          {TABS.filter(t => t.id !== 'high-points').map(tab => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setSelectedTopic(null) }}
                className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all cursor-pointer relative ${isActive ? 'text-green-700 font-extrabold scale-105' : 'text-gray-400 hover:text-gray-700 font-medium'}`}
              >
                <div className="relative">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-green-600 stroke-[2.5]' : 'text-gray-400'}`} />
                  {tab.id === 'errors' && errorIds.length > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[9px] font-bold rounded-full px-1 min-w-[15px] text-center shadow-xs">
                      {errorIds.length}
                    </span>
                  )}
                </div>
                <span className="text-[10px] mt-1 leading-none truncate max-w-[54px]">
                  {tab.labelDe}
                </span>
                {isActive && (
                  <span className="w-1 h-1 rounded-full bg-green-600 mt-1" />
                )}
              </button>
            )
          })}
          {/* Direct link to 5-Punkte */}
          <button
            onClick={() => { setActiveTab('high-points'); setSelectedTopic(null) }}
            className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all cursor-pointer ${activeTab === 'high-points' ? 'text-red-700 font-extrabold scale-105' : 'text-gray-400 hover:text-red-600 font-medium'}`}
          >
            <AlertTriangle className={`w-5 h-5 ${activeTab === 'high-points' ? 'text-red-600 stroke-[2.5]' : 'text-gray-400'}`} />
            <span className="text-[10px] mt-1 leading-none truncate max-w-[54px]">5-P</span>
            {activeTab === 'high-points' && (
              <span className="w-1 h-1 rounded-full bg-red-600 mt-1" />
            )}
          </button>
        </div>
      </nav>

      {/* Footer (Desktop only) */}
      <footer className="hidden md:block bg-gray-900 text-gray-400 text-center py-6 text-xs border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 space-y-1">
          <p className="font-semibold text-gray-300">Führerschein Lernen — Học Lý Thuyết Lái Xe Đức Song Ngữ 🇩🇪🇻🇳</p>
          <p>Dữ liệu chuẩn hóa 1.127 câu hỏi thi chính thức • Tiêu chuẩn TÜV / DEKRA</p>
        </div>
      </footer>
      {/* Nickname Editor Modal */}
      {isEditingPlayer && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <User className="w-5 h-5 text-green-600" /> Nickname Người Học
            </h3>
            <p className="text-xs text-gray-500">
              Nhập nickname để hệ thống lưu riêng tiến độ học, danh sách câu sai và điểm thi thử của bạn (đồng bộ cùng AzubiHub).
            </p>
            <input
              type="text"
              value={tempPlayerName}
              onChange={(e) => setTempPlayerName(e.target.value)}
              placeholder="Ví dụ: Linh, Nam, Trang..."
              className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-green-600 text-sm bg-gray-50"
              maxLength={32}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const clean = tempPlayerName.trim().slice(0, 32)
                  setPlayer(clean)
                  try {
                    if (clean) localStorage.setItem(PLAYER_KEY, clean)
                    else localStorage.removeItem(PLAYER_KEY)
                  } catch (_) {}
                  setIsEditingPlayer(false)
                }
              }}
            />
            <div className="flex gap-2 justify-end pt-2">
              <button
                type="button"
                onClick={() => setIsEditingPlayer(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 cursor-pointer"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={() => {
                  const clean = tempPlayerName.trim().slice(0, 32)
                  setPlayer(clean)
                  try {
                    if (clean) localStorage.setItem(PLAYER_KEY, clean)
                    else localStorage.removeItem(PLAYER_KEY)
                  } catch (_) {}
                  setIsEditingPlayer(false)
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-green-600 hover:bg-green-700 text-white shadow-xs cursor-pointer"
              >
                Lưu Nickname
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
