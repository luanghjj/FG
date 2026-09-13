import { useState, useEffect, useMemo } from 'react'
import { Timer, CheckCircle2, XCircle, AlertTriangle, ChevronLeft, ChevronRight, RotateCcw, Award, ZoomIn, Eye, EyeOff, Check, X, Lightbulb, Sparkles, Flag } from 'lucide-react'
import { getQuestionExplanation } from '../utils/explanations'

function drawExamQuestions(questions) {
  const shuffle = arr => [...arr].sort(() => Math.random() - 0.5)

  // Split into Grundstoff and Zusatzstoff
  const grundstoff = questions.filter(q => q.category.includes('Grundstoff') && q.options.length > 0)
  const zusatzstoff = questions.filter(q => q.category.includes('Zusatzstoff') && q.options.length > 0)

  // Draw 20 Grundstoff (with at least two 5-point questions)
  const g5 = shuffle(grundstoff.filter(q => q.points === 5)).slice(0, 2)
  const gOther = shuffle(grundstoff.filter(q => q.points !== 5)).slice(0, 18)
  const drawnG = shuffle([...g5, ...gOther])

  // Draw 10 Zusatzstoff
  const drawnZ = shuffle(zusatzstoff).slice(0, 10)

  return shuffle([...drawnG, ...drawnZ])
}

export default function ExamSimulation({ questions, showVn: globalShowVn, onComplete, player }) {
  const [examState, setExamState] = useState('intro') // 'intro' | 'testing' | 'result'
  const [examQuestions, setExamQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState({}) // { [qId]: Set of optId }
  const [timeLeft, setTimeLeft] = useState(45 * 60)
  const [showImageZoom, setShowImageZoom] = useState(false)
  const [showVn, setShowVn] = useState(globalShowVn)
  const [reviewFilter, setReviewFilter] = useState('all') // 'all' | 'wrong' | 'correct'

  const [markedQuestions, setMarkedQuestions] = useState(new Set())

  // Timer countdown during testing
  useEffect(() => {
    if (examState !== 'testing') return
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          setExamState('result')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [examState])

  const startExam = () => {
    const drawn = drawExamQuestions(questions)
    setExamQuestions(drawn)
    setUserAnswers({})
    setMarkedQuestions(new Set())
    setCurrentIndex(0)
    setTimeLeft(45 * 60)
    setExamState('testing')
  }

  const handleToggleOption = (qId, optId) => {
    setUserAnswers(prev => {
      const current = new Set(prev[qId] || [])
      if (current.has(optId)) {
        current.delete(optId)
      } else {
        current.add(optId)
      }
      return { ...prev, [qId]: current }
    })
  }

  const handleToggleMark = (qId) => {
    setMarkedQuestions(prev => {
      const next = new Set(prev)
      if (next.has(qId)) {
        next.delete(qId)
      } else {
        next.add(qId)
      }
      return next
    })
  }

  const handleSubmitExam = (force = false) => {
    if (!force) {
      const answeredCount = Object.keys(userAnswers).filter(k => userAnswers[k]?.size > 0).length
      const markedCount = markedQuestions.size

      if (markedCount > 0 && answeredCount < examQuestions.length) {
        const confirmSubmit = window.confirm(
          `Bạn còn ${markedCount} câu đang đánh dấu xem lại và mới làm ${answeredCount}/${examQuestions.length} câu. Bạn có chắc chắn muốn nộp bài ngay?`
        )
        if (!confirmSubmit) return
      } else if (markedCount > 0) {
        const confirmSubmit = window.confirm(
          `Bạn có ${markedCount} câu đang đánh dấu xem lại (Markieren). Bạn có chắc chắn muốn nộp bài luôn không?`
        )
        if (!confirmSubmit) return
      } else if (answeredCount < examQuestions.length) {
        const confirmSubmit = window.confirm(
          `Bạn mới làm ${answeredCount}/${examQuestions.length} câu hỏi. Bạn có chắc chắn muốn nộp bài ngay không?`
        )
        if (!confirmSubmit) return
      }
    }
    setExamState('result')
  }

  // Calculate results
  const resultData = useMemo(() => {
    if (examQuestions.length === 0) return null

    let totalPenalty = 0
    let wrongFivePoints = 0
    const details = []

    examQuestions.forEach(q => {
      const correctSet = new Set(q.options.filter(o => o.isCorrect).map(o => o.id))
      const userSet = userAnswers[q.id] || new Set()

      const isCorrect = correctSet.size === userSet.size &&
        [...correctSet].every(id => userSet.has(id))

      if (!isCorrect) {
        totalPenalty += q.points
        if (q.points === 5) {
          wrongFivePoints++
        }
      }

      details.push({
        question: q,
        userSet,
        correctSet,
        isCorrect
      })
    })

    // TÜV Rules:
    // Passed if total penalty <= 10 AND wrong 5-point questions < 2
    const passed = totalPenalty <= 10 && wrongFivePoints < 2

    return {
      passed,
      totalPenalty,
      wrongFivePoints,
      correctCount: details.filter(d => d.isCorrect).length,
      wrongCount: details.filter(d => !d.isCorrect).length,
      details
    }
  }, [examQuestions, userAnswers])

  // Inform parent when exam is completed & sync to LearnDB
  useEffect(() => {
    if (examState === 'result' && resultData) {
      if (onComplete) {
        const resultsToSave = resultData.details.map(d => ({
          id: d.question.id,
          correct: d.isCorrect
        }))
        onComplete(resultsToSave)
      }
      if (window.LearnDB && player) {
        window.LearnDB.saveQuizScore({
          subject: 'fuehrerschein',
          quiz: 'pruefungssimulation',
          correct: resultData.correctCount,
          total: resultData.totalQuestions,
          player: player
        }).catch(() => {})
      }
    }
  }, [examState, resultData])

  // Format timer MM:SS
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  // SCREEN 1: INTRO
  if (examState === 'intro') {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-lg text-center space-y-6">
        <div className="w-16 h-16 bg-green-100 text-green-700 rounded-2xl flex items-center justify-center mx-auto shadow-xs">
          <Award className="w-9 h-9" />
        </div>

        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Mô Phỏng Kỳ Thi Lý Thuyết Đức
          </h2>
          <p className="text-gray-500 text-sm mt-1">Offizielle Theorieprüfung Simulation (Klasse B)</p>
        </div>

        <div className="bg-gray-50 p-5 rounded-2xl text-left text-sm space-y-3 border border-gray-100">
          <h4 className="font-bold text-gray-800 text-base mb-2">📋 Thể lệ phòng thi chính thức:</h4>
          <div className="flex items-center justify-between border-b border-gray-200/60 pb-2">
            <span className="text-gray-600">Số lượng câu hỏi:</span>
            <span className="font-bold text-gray-900">30 câu (20 Cơ bản + 10 Hạng B)</span>
          </div>
          <div className="flex items-center justify-between border-b border-gray-200/60 pb-2">
            <span className="text-gray-600">Thời gian làm bài:</span>
            <span className="font-bold text-gray-900">45 phút</span>
          </div>
          <div className="flex items-center justify-between border-b border-gray-200/60 pb-2">
            <span className="text-gray-600">Điểm phạt tối đa được phép:</span>
            <span className="font-bold text-green-700">Tối đa 10 điểm (≤ 10 Fehlerpunkte)</span>
          </div>
          <div className="flex items-start justify-between pt-1">
            <span className="text-gray-600">Điều kiện trượt đặc biệt:</span>
            <span className="font-bold text-red-600 text-right">
              Sai từ 2 câu 5 điểm trở lên sẽ TRƯỢT NGAY (dù tổng điểm ≤ 10)
            </span>
          </div>
        </div>

        <button
          onClick={startExam}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-lg shadow-lg hover:from-green-700 hover:to-emerald-700 transition-all cursor-pointer active:scale-98"
        >
          Bắt đầu thi ngay (Starten)
        </button>
      </div>
    )
  }

  // SCREEN 2: TESTING
  if (examState === 'testing') {
    const q = examQuestions[currentIndex]
    const currentAnswers = userAnswers[q?.id] || new Set()
    const isLastQuestion = currentIndex === examQuestions.length - 1
    const answeredCount = Object.keys(userAnswers).filter(k => userAnswers[k].size > 0).length

    return (
      <div className="space-y-4 max-w-4xl mx-auto">
        {/* Exam Header: Timer & Progress */}
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-green-100 text-green-800">
              Câu {currentIndex + 1} / {examQuestions.length}
            </span>
            <span className="text-xs text-gray-400">
              (Đã làm: {answeredCount}/30)
            </span>
          </div>

          {/* Countdown Timer */}
          <div className={`flex items-center gap-1.5 font-mono font-bold text-base px-3 py-1 rounded-xl ${timeLeft < 300 ? 'bg-red-100 text-red-700 animate-pulse' : 'bg-gray-100 text-gray-800'}`}>
            <Timer className="w-4 h-4" />
            <span>{formatTime(timeLeft)}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowVn(!showVn)}
              className="px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer"
            >
              {showVn ? '🇻🇳 Ẩn TV' : '🇻🇳 Hiện TV'}
            </button>
            <button
              onClick={handleSubmitExam}
              className="px-3 py-1 rounded-lg text-xs font-bold bg-red-600 hover:bg-red-700 text-white transition-colors cursor-pointer"
            >
              Nộp bài
            </button>
          </div>
        </div>

        {/* Question Bubble Map */}
        <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm space-y-2.5">
          <div className="flex flex-wrap gap-1.5 justify-center">
            {examQuestions.map((eq, idx) => {
              const hasAnswer = (userAnswers[eq.id] || new Set()).size > 0
              const isCurrent = idx === currentIndex
              const isMarked = markedQuestions.has(eq.id)
              return (
                <button
                  key={eq.id}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`relative w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    isCurrent
                      ? 'ring-2 ring-blue-600 bg-blue-600 text-white shadow-xs'
                      : hasAnswer
                      ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  } ${isMarked ? 'ring-2 ring-amber-500 font-extrabold' : ''}`}
                  title={`Câu ${idx + 1}${isMarked ? ' (Đã đánh dấu xem lại)' : ''}`}
                >
                  {idx + 1}
                  {isMarked && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-500 ring-1 ring-white" />
                  )}
                </button>
              )
            })}
          </div>

          {markedQuestions.size > 0 && (
            <div className="pt-2 border-t border-gray-100 flex flex-wrap items-center justify-between gap-1.5 text-xs text-amber-900 bg-amber-50/80 px-3 py-2 rounded-xl">
              <span className="flex items-center gap-1.5 font-semibold">
                <Flag className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
                <span>{markedQuestions.size} câu cần xem lại:</span>
              </span>
              <div className="flex flex-wrap gap-1">
                {examQuestions.map((eq, idx) => {
                  if (!markedQuestions.has(eq.id)) return null
                  return (
                    <button
                      key={eq.id}
                      type="button"
                      onClick={() => setCurrentIndex(idx)}
                      className={`px-2 py-0.5 rounded-md text-[11px] font-bold cursor-pointer transition-colors ${
                        idx === currentIndex
                          ? 'bg-amber-600 text-white shadow-xs'
                          : 'bg-amber-200/90 text-amber-900 hover:bg-amber-300'
                      }`}
                    >
                      Câu {idx + 1}
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Active Question Box */}
        {q && (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-md overflow-hidden">
            {/* Header info */}
            <div className="px-4 sm:px-5 py-3 bg-gray-50 border-b flex items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-gray-500">Mã: {q.code}</span>
                <span className={`font-bold px-2 py-0.5 rounded-full text-white ${q.points === 5 ? 'bg-red-600' : q.points === 4 ? 'bg-orange-500' : 'bg-blue-600'}`}>
                  {q.points} Punkte
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleToggleMark(q.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold cursor-pointer transition-all active:scale-95 text-xs ${
                  markedQuestions.has(q.id)
                    ? 'bg-amber-500 text-white shadow-xs hover:bg-amber-600'
                    : 'bg-white border border-gray-200 text-gray-700 hover:border-amber-400 hover:text-amber-700'
                }`}
                title="Đánh dấu câu này để xem lại trước khi nộp bài (TÜV Markieren)"
              >
                <Flag className={`w-3.5 h-3.5 ${markedQuestions.has(q.id) ? 'fill-white' : 'text-gray-500'}`} />
                <span>{markedQuestions.has(q.id) ? 'Đã đánh dấu xem lại' : 'Đánh dấu xem lại'}</span>
              </button>
            </div>

            {/* Image if any */}
            {q.image && (
              <div className="relative bg-gray-900 cursor-pointer" onClick={() => setShowImageZoom(!showImageZoom)}>
                <img
                  src={q.image.startsWith('/') ? '.' + q.image : q.image}
                  alt="Tình huống giao thông"
                  className={`w-full object-contain mx-auto transition-all ${showImageZoom ? 'max-h-[550px]' : 'max-h-[260px]'}`}
                />
                <span className="absolute bottom-2 right-2 bg-black/60 text-white text-[11px] px-2 py-0.5 rounded flex items-center gap-1">
                  <ZoomIn className="w-3 h-3" /> {showImageZoom ? 'Thu nhỏ' : 'Phóng to'}
                </span>
              </div>
            )}

            {/* Question Text */}
            <div className="p-5">
              <p className="text-base sm:text-lg font-bold text-gray-900 leading-relaxed">
                {q.question_de}
              </p>
              {showVn && q.question_vn && (
                <p className="text-sm text-blue-600 mt-1 leading-relaxed font-medium">
                  {q.question_vn}
                </p>
              )}
            </div>

            {/* Options */}
            <div className="px-5 pb-5 space-y-2.5">
              {q.options.map(opt => {
                const isSelected = currentAnswers.has(opt.id)
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleToggleOption(q.id, opt.id)}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3.5 ${isSelected ? 'border-blue-500 bg-blue-50/70 shadow-xs' : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'}`}
                  >
                    <div className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors ${isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-300 bg-white'}`}>
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm sm:text-base leading-relaxed ${isSelected ? 'font-semibold text-blue-950' : 'text-gray-800'}`}>
                        {opt.text_de}
                      </p>
                      {showVn && opt.text_vn && (
                        <p className="text-xs sm:text-sm text-blue-600 mt-0.5 leading-relaxed">
                          {opt.text_vn}
                        </p>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Bottom Nav inside Question Card */}
            <div className="p-4 bg-gray-50 border-t flex items-center justify-between">
              <button
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex(prev => prev - 1)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-1 cursor-pointer ${currentIndex === 0 ? 'opacity-30 cursor-not-allowed text-gray-400' : 'text-gray-700 hover:bg-gray-200'}`}
              >
                <ChevronLeft className="w-4 h-4" /> Câu trước
              </button>

              {isLastQuestion ? (
                <button
                  onClick={handleSubmitExam}
                  className="px-6 py-2.5 rounded-xl text-sm font-bold bg-green-600 hover:bg-green-700 text-white shadow-md cursor-pointer transition-all active:scale-95"
                >
                  Nộp bài thi & Xem kết quả
                </button>
              ) : (
                <button
                  onClick={() => setCurrentIndex(prev => prev + 1)}
                  className="px-6 py-2.5 rounded-xl text-sm font-bold bg-green-600 hover:bg-green-700 text-white shadow-md flex items-center gap-1 cursor-pointer transition-all active:scale-95"
                >
                  Câu tiếp theo <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    )
  }

  // SCREEN 3: RESULT
  if (examState === 'result' && resultData) {
    const { passed, totalPenalty, wrongFivePoints, correctCount, wrongCount, details } = resultData

    const filteredDetails = details.filter(d => {
      if (reviewFilter === 'wrong') return !d.isCorrect
      if (reviewFilter === 'correct') return d.isCorrect
      return true
    })

    return (
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Pass/Fail Banner */}
        <div className={`rounded-3xl p-6 sm:p-8 text-white text-center shadow-xl ${passed ? 'bg-gradient-to-br from-green-600 to-emerald-700' : 'bg-gradient-to-br from-red-600 to-rose-700'}`}>
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto mb-3">
            {passed ? <CheckCircle2 className="w-10 h-10" /> : <XCircle className="w-10 h-10" />}
          </div>
          <h2 className="text-3xl font-extrabold">
            {passed ? 'ĐẬU KỲ THI! (Bestanden!)' : 'CHƯA ĐẠT (Nicht bestanden)'}
          </h2>
          <p className="text-white/90 text-sm mt-1 max-w-md mx-auto">
            {passed
              ? 'Chúc mừng bạn! Bạn đã vượt qua bài thi thử theo đúng tiêu chuẩn quy chế chấm điểm TÜV/DEKRA.'
              : wrongFivePoints >= 2
                ? 'Bạn bị trượt do làm sai từ 2 câu 5 điểm (câu điểm liệt) trở lên.'
                : `Bạn bị trượt do tổng điểm phạt vượt quá 10 điểm (${totalPenalty}/10 điểm).`}
          </p>

          {/* Stats Badges */}
          <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3 max-w-lg mx-auto text-left">
            <div className="bg-white/15 backdrop-blur-md p-3 rounded-2xl">
              <span className="text-xs text-white/80">Điểm phạt</span>
              <p className="text-2xl font-bold">{totalPenalty} <span className="text-xs font-normal">/ 10 max</span></p>
            </div>
            <div className="bg-white/15 backdrop-blur-md p-3 rounded-2xl">
              <span className="text-xs text-white/80">Sai câu 5P</span>
              <p className="text-2xl font-bold">{wrongFivePoints} <span className="text-xs font-normal">/ 2 max</span></p>
            </div>
            <div className="bg-white/15 backdrop-blur-md p-3 rounded-2xl">
              <span className="text-xs text-white/80">Số câu đúng</span>
              <p className="text-2xl font-bold">{correctCount} <span className="text-xs font-normal">/ 30</span></p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={startExam}
              className="px-6 py-2.5 rounded-xl bg-white text-gray-900 font-bold text-sm shadow-md hover:bg-gray-100 transition-all flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" /> Thi lại đề khác
            </button>
          </div>
        </div>

        {/* Detailed Review Section */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4">
            <h3 className="font-bold text-lg text-gray-900">Chi tiết bài làm</h3>
            <div className="flex p-1 bg-gray-100 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setReviewFilter('all')}
                className={`px-3 py-1.5 rounded-lg cursor-pointer ${reviewFilter === 'all' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500'}`}
              >
                Tất cả (30)
              </button>
              <button
                onClick={() => setReviewFilter('wrong')}
                className={`px-3 py-1.5 rounded-lg cursor-pointer ${reviewFilter === 'wrong' ? 'bg-white text-red-600 shadow-xs' : 'text-gray-500'}`}
              >
                Câu sai ({wrongCount})
              </button>
              <button
                onClick={() => setReviewFilter('correct')}
                className={`px-3 py-1.5 rounded-lg cursor-pointer ${reviewFilter === 'correct' ? 'bg-white text-green-700 shadow-xs' : 'text-gray-500'}`}
              >
                Câu đúng ({correctCount})
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {filteredDetails.map(({ question: q, userSet, correctSet, isCorrect }, idx) => (
              <div
                key={q.id}
                className={`p-4 rounded-2xl border-2 ${isCorrect ? 'border-green-200 bg-green-50/30' : 'border-red-200 bg-red-50/30'}`}
              >
                <div className="flex items-center justify-between text-xs mb-2">
                  <div className="flex items-center gap-2">
                    {isCorrect ? (
                      <span className="inline-flex items-center gap-1 text-green-700 font-bold">
                        <CheckCircle2 className="w-4 h-4" /> Đúng
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-red-600 font-bold">
                        <XCircle className="w-4 h-4" /> Sai (+{q.points} điểm phạt)
                      </span>
                    )}
                    <span className="text-gray-400 font-mono">#{q.code}</span>
                  </div>
                  <span className="text-xs bg-gray-100 px-2 py-0.5 rounded font-medium text-gray-600">
                    {q.points} Punkte
                  </span>
                </div>

                {q.image && (
                  <img src={q.image.startsWith('/') ? '.' + q.image : q.image} alt="Minh họa" className="max-h-48 rounded-xl object-contain mb-3 bg-gray-900 w-full" />
                )}

                <p className="font-semibold text-gray-900 text-sm">{q.question_de}</p>
                {q.question_vn && <p className="text-xs text-blue-600 mt-0.5">{q.question_vn}</p>}

                {/* Options with color marking */}
                <div className="mt-3 space-y-1.5">
                  {q.options.map(opt => {
                    const isRightOpt = opt.isCorrect
                    const userChecked = userSet.has(opt.id)

                    let optStyle = 'border-gray-200 bg-white text-gray-700'
                    if (isRightOpt) {
                      optStyle = 'border-green-500 bg-green-100/80 text-green-900 font-semibold'
                    } else if (userChecked && !isRightOpt) {
                      optStyle = 'border-red-400 bg-red-100/80 text-red-900 line-through'
                    }

                    return (
                      <div key={opt.id} className={`p-2.5 rounded-xl border text-xs flex items-start gap-2 ${optStyle}`}>
                        <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${isRightOpt ? 'bg-green-600 border-green-600 text-white' : userChecked ? 'bg-red-500 border-red-500 text-white' : 'border-gray-300'}`}>
                          {isRightOpt && <Check className="w-3 h-3" />}
                          {userChecked && !isRightOpt && <X className="w-3 h-3" />}
                        </div>
                        <div className="flex-1">
                          <p>{opt.text_de}</p>
                          {opt.text_vn && <p className="text-[11px] text-gray-500 mt-0.5">{opt.text_vn}</p>}
                        </div>
                        {isRightOpt && <span className="text-[10px] font-bold text-green-700 px-1.5 py-0.5 rounded bg-green-200/60">Đáp án đúng</span>}
                        {userChecked && !isRightOpt && <span className="text-[10px] font-bold text-red-700 px-1.5 py-0.5 rounded bg-red-200/60">Bạn chọn sai</span>}
                      </div>
                    )
                  })}
                </div>

                {/* Explanation in Exam Review */}
                {(() => {
                  const exp = getQuestionExplanation(q)
                  if (!exp) return null
                  return (
                    <div className="mt-3 p-3.5 rounded-xl bg-amber-50/90 border border-amber-200 text-xs text-gray-800 space-y-1.5">
                      <div className="flex items-center justify-between flex-wrap gap-1">
                        <span className="font-bold text-amber-950 flex items-center gap-1">
                          <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          Giải thích: Tại sao đáp án này đúng? (Erklärung)
                        </span>
                        <span className="text-[10px] text-amber-800 bg-amber-100/90 px-1.5 py-0.5 rounded font-medium border border-amber-200">
                          {exp.ruleName}
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{exp.content}</p>
                      {exp.keyTakeaway && (
                        <p className="text-[11px] text-amber-950 font-semibold pt-1 border-t border-amber-200/60 flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-amber-600 shrink-0" />
                          Mẹo cốt lõi: {exp.keyTakeaway}
                        </p>
                      )}
                    </div>
                  )
                })()}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return null
}
