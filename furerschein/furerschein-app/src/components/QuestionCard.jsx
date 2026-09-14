import { useState } from 'react'
import { Star, Check, X, Eye, EyeOff, ZoomIn, Info, CheckCircle2, XCircle, Lightbulb, Sparkles, ChevronDown, ChevronUp, Volume2, VolumeX, AlertTriangle } from 'lucide-react'
import { getQuestionExplanation } from '../utils/explanations'
import { speakGerman, stopSpeech } from '../utils/speech'

export default function QuestionCard({ question, showVn, onAnswer, isFavorite, onToggleFavorite, wasAnswered, errorCount }) {
  const [selected, setSelected] = useState(new Set())
  const [submitted, setSubmitted] = useState(false)
  const [showImage, setShowImage] = useState(false)
  const [localShowVn, setLocalShowVn] = useState(showVn)
  const [showExplanation, setShowExplanation] = useState(false)
  const [speakingText, setSpeakingText] = useState(null)

  const q = question
  const explanation = getQuestionExplanation(q)
  const correctIds = new Set(q.options.filter(o => o.isCorrect).map(o => o.id))
  const numCorrect = correctIds.size
  const isQuestionFullyCorrect = submitted && selected.size === correctIds.size && [...selected].every(id => correctIds.has(id))

  const handleSpeak = (text) => {
    if (speakingText === text) {
      stopSpeech()
      setSpeakingText(null)
    } else {
      setSpeakingText(text)
      speakGerman(text, () => setSpeakingText(null))
    }
  }

  const handleToggle = (optId) => {
    if (submitted) return
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(optId)) next.delete(optId)
      else next.add(optId)
      return next
    })
  }

  const handleSubmit = () => {
    if (selected.size === 0) return
    setSubmitted(true)
    setShowExplanation(true)
    const isCorrect = selected.size === correctIds.size &&
      [...selected].every(id => correctIds.has(id))
    onAnswer(isCorrect)
  }

  const handleReset = () => {
    setSelected(new Set())
    setSubmitted(false)
    setShowExplanation(false)
  }

  const pointsBadgeColor = q.points === 5 ? 'bg-red-600' : q.points === 4 ? 'bg-orange-500' : q.points === 3 ? 'bg-yellow-500 text-yellow-950' : 'bg-blue-600'

  return (
    <div className={`bg-white rounded-3xl shadow-sm border-2 overflow-hidden transition-all
      ${submitted
        ? (isQuestionFullyCorrect ? 'border-green-400 ring-2 ring-green-100' : 'border-red-400 ring-2 ring-red-100')
        : 'border-gray-100 hover:border-gray-300'}`}>

      {/* Header Bar */}
      <div className="flex items-center justify-between px-5 py-3 bg-gray-50/80 border-b border-gray-100">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-mono text-gray-400">#{q.id}</span>
          <span className="text-xs font-mono font-bold text-gray-700 bg-gray-200/70 px-2 py-0.5 rounded-md">{q.code}</span>
          <span className={`text-xs font-bold text-white px-2.5 py-0.5 rounded-full ${pointsBadgeColor}`}>
            {q.points} Punkte
          </span>

          {/* Question Status Badge */}
          {wasAnswered === true && (
            <span className="text-[11px] font-bold text-green-700 bg-green-100 border border-green-200 px-2 py-0.5 rounded-full">
              🟢 Đã làm đúng
            </span>
          )}
          {wasAnswered === false && (
            <span className="text-[11px] font-bold text-red-700 bg-red-100 border border-red-200 px-2 py-0.5 rounded-full">
              🔴 Cần sửa lại
            </span>
          )}
          {wasAnswered === undefined && (
            <span className="text-[11px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
              ⚪ Chưa làm
            </span>
          )}

          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
            {numCorrect > 1 ? `Có ${numCorrect} đáp án đúng` : 'Có 1 đáp án đúng'}
          </span>
          {errorCount && (
            <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-semibold">
              Từng sai {errorCount} lần
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setLocalShowVn(!localShowVn)}
            className="p-2 rounded-xl hover:bg-gray-200/70 cursor-pointer text-gray-500 transition-colors"
            title={localShowVn ? 'Ẩn tiếng Việt để luyện phản xạ tiếng Đức' : 'Hiện bản dịch tiếng Việt'}
          >
            {localShowVn ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>
          <button
            onClick={onToggleFavorite}
            className={`p-2 rounded-xl hover:bg-yellow-50 cursor-pointer transition-colors ${isFavorite ? 'text-yellow-500' : 'text-gray-300 hover:text-yellow-400'}`}
            title="Gắn sao lưu câu hỏi"
          >
            <Star className="w-4 h-4" fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>

      {/* Question Image (Zoomable) */}
      {q.image && (
        <div className="relative cursor-pointer bg-gray-950" onClick={() => setShowImage(!showImage)}>
          <img
            src={q.image.startsWith('/') ? '.' + q.image : q.image}
            alt="Hình ảnh mô phỏng giao thông"
            className={`w-full object-contain mx-auto transition-all duration-300 ${showImage ? 'max-h-[600px]' : 'max-h-[260px]'}`}
          />
          <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-xs text-white rounded-lg px-2.5 py-1 text-xs flex items-center gap-1.5 pointer-events-none">
            <ZoomIn className="w-3.5 h-3.5" />
            <span>{showImage ? 'Thu nhỏ' : 'Chạm để phóng to ảnh'}</span>
          </div>
        </div>
      )}

      {/* Question Text with Audio Pronunciation */}
      <div className="p-5">
        <div className="flex items-start gap-2.5 justify-between">
          <p className="text-base sm:text-lg font-bold text-gray-900 leading-relaxed flex-1">
            {q.question_de}
          </p>
          <button
            onClick={() => handleSpeak(q.question_de)}
            className={`p-2 rounded-xl border transition-all cursor-pointer shrink-0 ${speakingText === q.question_de ? 'bg-green-100 text-green-700 border-green-300 animate-pulse' : 'bg-gray-50 hover:bg-green-50 text-gray-400 hover:text-green-700 border-gray-200'}`}
            title="Nghe phát âm câu hỏi tiếng Đức chuẩn"
          >
            {speakingText === q.question_de ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>

        {localShowVn && q.question_vn && (
          <p className="text-sm text-blue-600 mt-2 leading-relaxed font-medium bg-blue-50/50 p-2.5 rounded-xl border border-blue-100/60">
            🇻🇳 {q.question_vn}
          </p>
        )}
      </div>

      {/* Options List */}
      {q.options.length > 0 && (
        <div className="px-5 pb-4 space-y-2.5">
          {q.options.map(opt => {
            const isSelected = selected.has(opt.id)
            const isCorrectOpt = opt.isCorrect

            let containerStyle = 'border-gray-200 bg-white hover:border-blue-400 hover:bg-blue-50/30'
            let checkboxStyle = 'border-gray-300 bg-white text-transparent'
            let textStyle = 'text-gray-800'
            let badgeComponent = null

            if (!submitted) {
              if (isSelected) {
                containerStyle = 'border-blue-500 bg-blue-50/70 shadow-xs'
                checkboxStyle = 'bg-blue-600 border-blue-600 text-white'
                textStyle = 'font-semibold text-blue-950'
              }
            } else {
              if (isCorrectOpt) {
                containerStyle = 'border-green-500 bg-green-50/80'
                checkboxStyle = 'bg-green-600 border-green-600 text-white'
                textStyle = 'font-semibold text-green-950'
                badgeComponent = isSelected ? (
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-green-200 text-green-800 shrink-0">
                    ✓ Bạn đã chọn đúng
                  </span>
                ) : (
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 shrink-0">
                    ⚠️ Bỏ sót đáp án này
                  </span>
                )
              } else {
                if (isSelected) {
                  containerStyle = 'border-red-400 bg-red-50/80'
                  checkboxStyle = 'bg-red-600 border-red-600 text-white'
                  textStyle = 'font-semibold text-red-950 line-through opacity-80'
                  badgeComponent = (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-red-200 text-red-800 shrink-0">
                      ✗ Bạn đã chọn sai
                    </span>
                  )
                } else {
                  containerStyle = 'border-gray-200 bg-gray-50/60 opacity-60'
                  checkboxStyle = 'border-gray-300 bg-gray-100 text-transparent'
                  textStyle = 'text-gray-500'
                }
              }
            }

            return (
              <div
                key={opt.id}
                role="button"
                tabIndex={submitted ? -1 : 0}
                onClick={() => handleToggle(opt.id)}
                onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault()
                    handleToggle(opt.id)
                  }
                }}
                className={`w-full text-left p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3 select-none ${containerStyle}`}
              >
                {/* Checkbox Box */}
                <div className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors ${checkboxStyle}`}>
                  {submitted ? (
                    isCorrectOpt ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : (isSelected ? <X className="w-3.5 h-3.5 stroke-[3]" /> : null)
                  ) : (
                    isSelected ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : null
                  )}
                </div>

                {/* Text Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-sm sm:text-base leading-relaxed ${textStyle}`}>
                      {opt.text_de}
                    </p>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {badgeComponent}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleSpeak(opt.text_de)
                        }}
                        className={`p-1 rounded-lg transition-colors cursor-pointer ${speakingText === opt.text_de ? 'text-green-600 animate-pulse bg-green-50' : 'text-gray-300 hover:text-green-600 hover:bg-gray-100'}`}
                        title="Nghe phát âm đáp án"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  {localShowVn && opt.text_vn && (
                    <p className={`text-xs sm:text-sm mt-1 leading-relaxed ${submitted && isCorrectOpt ? 'text-green-700 font-medium' : 'text-blue-500'}`}>
                      🇻🇳 {opt.text_vn}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Result Feedback Banner after Submit */}
      {submitted && (
        <div className="px-5 pb-3">
          {isQuestionFullyCorrect ? (
            <div className="p-3.5 rounded-2xl bg-green-100 border border-green-300 text-green-900 flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0" />
              <div className="text-sm">
                <p className="font-bold">Chính xác! (+0 điểm phạt)</p>
                <p className="text-xs text-green-700 mt-0.5">Bạn đã chọn đúng và đủ tất cả các đáp án theo quy chế TÜV.</p>
              </div>
            </div>
          ) : (
            <div className="p-3.5 rounded-2xl bg-red-100 border border-red-300 text-red-900 flex items-center gap-3">
              <XCircle className="w-6 h-6 text-red-600 shrink-0" />
              <div className="text-sm">
                <p className="font-bold">Chưa chính xác! (+{q.points} điểm phạt)</p>
                <p className="text-xs text-red-700 mt-0.5">
                  Bạn phải chọn đúng toàn bộ các đáp án có viền xanh lá cây (và không chọn các đáp án viền đỏ) thì mới được điểm!
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Explanation Section */}
      {explanation && (submitted || showExplanation) && (
        <div className="px-5 pb-3">
          <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200 text-gray-800 space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-1.5">
              <div className="flex items-center gap-1.5 text-amber-950 font-bold text-xs sm:text-sm">
                <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Giải thích: Tại sao đáp án này đúng? (Erklärung)</span>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {explanation.isCrucial && (
                  <span className="text-[11px] font-extrabold text-red-700 bg-red-100 px-2 py-0.5 rounded-md border border-red-200 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3 text-red-600" />
                    <span>Câu 5 Điểm (Điểm Liệt)</span>
                  </span>
                )}
                <span className="text-[11px] font-semibold text-amber-800 bg-amber-100/90 px-2 py-0.5 rounded-md border border-amber-200">
                  {explanation.ruleName}
                </span>
              </div>
            </div>

            {/* Context Content */}
            <p className="text-xs sm:text-sm text-gray-800 leading-relaxed font-medium">
              {explanation.content}
            </p>

            {/* Formula Calculation Box */}
            {explanation.formulaCalculation && (
              <div className="p-3 bg-white/90 border border-amber-300 rounded-xl font-mono text-xs text-amber-950 space-y-1">
                <p className="font-bold font-sans text-amber-900 text-[11px]">Công thức tính toán từng bước (Faustformel):</p>
                <p className="whitespace-pre-line leading-relaxed">{explanation.formulaCalculation}</p>
              </div>
            )}

            {/* Breakdown of correct options */}
            {explanation.correctBreakdown && explanation.correctBreakdown.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <p className="text-xs font-bold text-green-900">Vì sao phương án đúng được chọn?</p>
                <div className="space-y-1">
                  {explanation.correctBreakdown.map((item, idx) => (
                    <div key={idx} className="text-xs text-gray-700 bg-white/80 p-2 rounded-xl border border-green-200 flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-green-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-gray-900">{item.de}</span>
                        {item.vn && <span className="text-gray-500"> ({item.vn})</span>}
                        {item.reason && <p className="text-green-800 mt-0.5 font-medium">{item.reason}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Breakdown of trap / wrong options */}
            {explanation.trapBreakdown && explanation.trapBreakdown.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <p className="text-xs font-bold text-red-900">Bẫy cần tránh ở các phương án sai:</p>
                <div className="space-y-1">
                  {explanation.trapBreakdown.map((item, idx) => (
                    <div key={idx} className="text-xs text-gray-700 bg-white/80 p-2 rounded-xl border border-red-200 flex items-start gap-1.5">
                      <X className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium text-gray-700 line-through">{item.de}</span>
                        {item.vn && <span className="text-gray-500"> ({item.vn})</span>}
                        {item.trap && <p className="text-red-700 mt-0.5">{item.trap}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key takeaway */}
            {explanation.keyTakeaway && (
              <div className="pt-2 border-t border-amber-200/80 flex items-start gap-1.5 text-xs text-amber-950 font-bold">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <span>Mẹo cốt lõi: {explanation.keyTakeaway}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Numerical question info */}
      {q.is_numerical && (
        <div className="px-5 pb-3">
          <div className="text-sm text-orange-800 bg-orange-50 border border-orange-200 px-4 py-3 rounded-2xl flex items-center gap-2">
            <Info className="w-4 h-4 text-orange-600 shrink-0" />
            <div>
              <strong>Câu hỏi tự điền số (Zahlenfrage):</strong> Hãy tự tính toán và nhập con số cụ thể vào ô khi thi thật.
            </div>
          </div>
        </div>
      )}

      {/* Actions & Hint Bar */}
      {q.options.length > 0 && (
        <div className="px-5 pb-4 pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-gray-100">
          <div className="flex items-center gap-2.5 flex-wrap">
            {!submitted ? (
              <button
                onClick={handleSubmit}
                disabled={selected.size === 0}
                className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer active:scale-95 ${selected.size > 0 ? 'bg-green-600 text-white hover:bg-green-700 shadow-md' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
              >
                Kiểm tra / Prüfen ({selected.size} đã chọn)
              </button>
            ) : (
              <button
                onClick={handleReset}
                className="px-5 py-2.5 rounded-xl font-bold text-sm bg-blue-600 text-white hover:bg-blue-700 shadow-md cursor-pointer transition-all active:scale-95"
              >
                Làm lại (Nochmal)
              </button>
            )}

            {explanation && (
              <button
                onClick={() => setShowExplanation(!showExplanation)}
                className="px-3 py-2 rounded-xl text-xs font-semibold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-colors flex items-center gap-1 cursor-pointer"
                title="Bật/tắt giải thích chi tiết"
              >
                <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                <span>{showExplanation ? 'Ẩn giải thích' : 'Xem giải thích'}</span>
                {showExplanation ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
            )}

            <span className="text-xs text-gray-400 truncate max-w-[180px]">
              {q.topic || q.category}
            </span>
          </div>

          <p className="text-[11px] text-gray-400 flex items-center gap-1">
            <Info className="w-3.5 h-3.5 shrink-0" />
            Có thể chọn 1, 2 hoặc 3 đáp án (Mehrfachauswahl)
          </p>
        </div>
      )}
    </div>
  )
}
