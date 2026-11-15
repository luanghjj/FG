import { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import {
  Compass,
  Volume2,
  Square,
  Play,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  RotateCw,
  AlertTriangle,
  ShieldAlert,
  Lightbulb,
  Wrench,
  Eye,
  Brain,
  Navigation,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Search,
  Award,
  Check,
  Car,
  XCircle,
  Sparkles,
} from 'lucide-react'
import {
  PRACTICAL_GROUPS,
  PRACTICAL_ALL_COMMANDS,
  FINISH_STEPS,
  FINISH_WARNINGS,
  ABFAHRKONTROLLE_TOPICS,
  INSTRUCTOR_ADVICE,
} from '../data/practical_commands'
import { speakGerman, stopSpeech } from '../utils/speech'

function getPraxisStorageKey(player) {
  const clean = (player || '').trim().toLowerCase()
  return clean ? `fuhrerschein_praxis_${clean}` : 'fuhrerschein_praxis'
}

function loadPraxisState(player) {
  try {
    const raw = localStorage.getItem(getPraxisStorageKey(player))
    if (!raw) return { learned: {}, finishDone: {}, techDone: {} }
    const parsed = JSON.parse(raw)
    return {
      learned: parsed?.learned || {},
      finishDone: parsed?.finishDone || {},
      techDone: parsed?.techDone || {},
    }
  } catch {
    return { learned: {}, finishDone: {}, techDone: {} }
  }
}

function savePraxisState(player, state) {
  try {
    localStorage.setItem(getPraxisStorageKey(player), JSON.stringify(state))
  } catch (e) {
    console.error('Failed to save praxis progress:', e)
  }
}

function ActionIcon({ action }) {
  const cls = 'w-4 h-4 shrink-0 text-amber-800'
  switch (action) {
    case 'turn-right':
      return <ArrowRight className={cls} />
    case 'turn-left':
      return <ArrowLeft className={cls} />
    case 'straight':
      return <ArrowUp className={cls} />
    case 'roundabout':
    case 'uturn':
      return <RotateCw className={cls} />
    case 'brake':
    case 'stop':
      return <AlertTriangle className={cls} />
    case 'ok':
      return <CheckCircle2 className={cls} />
    case 'highway':
    case 'priority':
      return <Navigation className={cls} />
    default:
      return <Compass className={cls} />
  }
}

function highlightKeywords(text, keywords) {
  if (!keywords || keywords.length === 0) return text
  const escaped = keywords
    .map((kw) => kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .sort((a, b) => b.length - a.length)
  if (escaped.length === 0) return text
  const regex = new RegExp(`(${escaped.join('|')})`, 'gi')
  const parts = text.split(regex)
  return parts.map((part, idx) => {
    const matched = keywords.some((kw) => kw.toLowerCase() === part.toLowerCase())
    return matched ? (
      <mark key={idx} className="bg-amber-100 text-amber-900 px-1 rounded font-bold">
        {part}
      </mark>
    ) : (
      <span key={idx}>{part}</span>
    )
  })
}

function CalloutBox({ callout }) {
  if (!callout) return null
  const isWarn = callout.type === 'warn'
  return (
    <div
      className={`mt-4 rounded-2xl p-4 border text-xs leading-relaxed space-y-2 ${
        isWarn
          ? 'bg-red-50/70 border-red-200 text-red-950'
          : 'bg-amber-50/70 border-amber-200 text-amber-950'
      }`}
    >
      <div className="flex items-center gap-2 font-bold text-xs sm:text-sm">
        {isWarn ? (
          <ShieldAlert className="w-4 h-4 text-red-700 shrink-0" />
        ) : (
          <Lightbulb className="w-4 h-4 text-amber-700 shrink-0" />
        )}
        <span>{callout.title}</span>
      </div>

      {callout.ordinals && (
        <div className="grid grid-cols-3 gap-2 pt-1">
          {callout.ordinals.map((ord) => (
            <div
              key={ord.de}
              className="bg-white rounded-xl border border-amber-200 px-2.5 py-2 text-center"
            >
              <div className="font-bold text-amber-900 text-xs sm:text-sm">{ord.de}</div>
              <div className="text-[11px] text-gray-600">
                {ord.num} = {ord.vi}
              </div>
            </div>
          ))}
        </div>
      )}

      <ul className="space-y-1.5 list-disc pl-4">
        {callout.points.map((pt, idx) => (
          <li key={idx}>{pt}</li>
        ))}
      </ul>
    </div>
  )
}

function CommandRow({
  cmd,
  showVn,
  isLearned,
  isSpeaking,
  onSpeak,
  onToggleLearned,
}) {
  const [revealVn, setRevealVn] = useState(false)
  const vnVisible = showVn || revealVn

  return (
    <div
      className={`rounded-2xl border p-3.5 sm:p-4 transition-all ${
        isSpeaking
          ? 'bg-amber-50 border-amber-500 shadow-sm'
          : isLearned
          ? 'bg-emerald-50/40 border-emerald-200'
          : 'bg-gray-50/70 border-gray-200 hover:border-amber-300'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="flex flex-col items-center gap-1.5 shrink-0 pt-0.5">
          <span className="w-7 h-7 rounded-lg bg-amber-100 border border-amber-300 text-amber-900 font-bold text-xs flex items-center justify-center">
            {String(cmd.id).padStart(2, '0')}
          </span>
          <div className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
            <ActionIcon action={cmd.action} />
          </div>
        </div>

        <div className="flex-1 min-w-0 space-y-1.5">
          <p className="text-sm sm:text-base font-bold text-gray-900 leading-snug">
            {highlightKeywords(cmd.de, cmd.keywords)}
          </p>

          {vnVisible ? (
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-dashed border-gray-200 pt-1.5">
              {cmd.vi}
            </p>
          ) : (
            <button
              type="button"
              onClick={() => setRevealVn(true)}
              className="text-xs font-semibold text-amber-800 hover:underline cursor-pointer pt-0.5"
            >
              Hiện nghĩa tiếng Việt
            </button>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => onSpeak(cmd)}
            className={`px-2.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
              isSpeaking
                ? 'bg-amber-700 text-white border-amber-800'
                : 'bg-white hover:bg-amber-50 text-gray-700 border-gray-200 hover:border-amber-400'
            }`}
            title="Nghe giám khảo đọc bằng tiếng Đức"
          >
            {isSpeaking ? <Square className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isSpeaking ? 'Dừng' : 'Nghe'}</span>
          </button>

          <button
            type="button"
            onClick={() => onToggleLearned(cmd.id)}
            className={`p-2 rounded-xl border transition-all cursor-pointer flex items-center gap-1 text-xs font-semibold ${
              isLearned
                ? 'bg-green-100 text-green-800 border-green-300'
                : 'bg-white text-gray-400 border-gray-200 hover:text-green-700 hover:border-green-300'
            }`}
            title={isLearned ? 'Đã thuộc hiệu lệnh này' : 'Đánh dấu đã thuộc'}
            aria-label={isLearned ? 'Đã thuộc' : 'Đánh dấu đã thuộc'}
          >
            <CheckCircle2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

function buildQuizOptions(targetCmd, seed) {
  const sameGroup = PRACTICAL_ALL_COMMANDS.filter(
    (c) => c.id !== targetCmd.id && c.groupId === targetCmd.groupId
  )
  const otherCmds = PRACTICAL_ALL_COMMANDS.filter(
    (c) => c.id !== targetCmd.id && c.groupId !== targetCmd.groupId
  )

  const mixShuffle = (arr, offset) =>
    [...arr].sort((a, b) => {
      const ha = ((a.id * 37 + offset * 13) % 97) - ((b.id * 37 + offset * 13) % 97)
      return ha
    })

  const distractors = [
    ...mixShuffle(sameGroup, seed),
    ...mixShuffle(otherCmds, seed + 7),
  ]
    .filter((c, idx, self) => self.findIndex((x) => x.vi === c.vi) === idx)
    .slice(0, 3)

  const pool = [targetCmd, ...distractors]
  return mixShuffle(pool, seed + 19)
}

function DrillMode({ learned, onToggleLearned, showVn }) {
  const [onlyUnlearned, setOnlyUnlearned] = useState(false)
  const [blindAudio, setBlindAudio] = useState(false)
  const [revealDe, setRevealDe] = useState(false)
  const [index, setIndex] = useState(0)
  const [selectedId, setSelectedId] = useState(null)
  const [seed, setSeed] = useState(1)
  const [score, setScore] = useState({ correct: 0, total: 0, streak: 0 })

  const deck = useMemo(() => {
    const base = onlyUnlearned
      ? PRACTICAL_ALL_COMMANDS.filter((c) => !learned[c.id])
      : PRACTICAL_ALL_COMMANDS
    const list = base.length > 0 ? base : PRACTICAL_ALL_COMMANDS
    return [...list].sort(
      (a, b) => ((a.id * 29 + seed * 11) % 83) - ((b.id * 29 + seed * 11) % 83)
    )
  }, [onlyUnlearned, learned, seed])

  const current = deck[index % deck.length] || PRACTICAL_ALL_COMMANDS[0]

  const options = useMemo(
    () => buildQuizOptions(current, seed + index),
    [current, seed, index]
  )

  const handlePlay = useCallback(() => {
    speakGerman(current.de)
  }, [current.de])

  const handlePick = (opt) => {
    if (selectedId !== null) return
    setSelectedId(opt.id)
    const ok = opt.id === current.id
    setScore((prev) => ({
      correct: prev.correct + (ok ? 1 : 0),
      total: prev.total + 1,
      streak: ok ? prev.streak + 1 : 0,
    }))
  }

  const handleNext = () => {
    stopSpeech()
    setSelectedId(null)
    setRevealDe(false)
    setIndex((i) => (i + 1 >= deck.length ? 0 : i + 1))
  }

  const handleResetDeck = () => {
    stopSpeech()
    setSelectedId(null)
    setRevealDe(false)
    setIndex(0)
    setSeed((s) => s + 1)
  }

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setOnlyUnlearned((v) => !v)
              setIndex(0)
              setSelectedId(null)
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border cursor-pointer transition-all ${
              onlyUnlearned
                ? 'bg-amber-700 text-white border-amber-800'
                : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-amber-400'
            }`}
          >
            {onlyUnlearned ? 'Đang lọc: Câu chưa thuộc' : 'Tất cả 41 câu'}
          </button>

          <button
            type="button"
            onClick={() => setBlindAudio((v) => !v)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border cursor-pointer transition-all flex items-center gap-1.5 ${
              blindAudio
                ? 'bg-amber-700 text-white border-amber-800'
                : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-amber-400'
            }`}
            title="Giấu chữ tiếng Đức để luyện nghe trực tiếp như trong xe thi thật"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>{blindAudio ? 'Thi nghe (Ẩn chữ Đức)' : 'Chế độ Nghe & Đọc'}</span>
          </button>
        </div>

        <div className="flex items-center gap-3 text-xs font-bold text-gray-700">
          <span>
            Đúng: <strong className="text-green-700">{score.correct}</strong>/{score.total}
          </span>
          <span>
            Chuỗi: <strong className="text-amber-700">{score.streak}</strong>
          </span>
          <button
            type="button"
            onClick={handleResetDeck}
            className="px-2.5 py-1.5 rounded-lg bg-gray-100 hover:bg-amber-50 text-gray-700 border border-gray-200 cursor-pointer flex items-center gap-1"
            title="Trộn lại bộ thẻ"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Trộn đề</span>
          </button>
        </div>
      </div>

      {/* Prompt Card */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-gray-200 shadow-sm space-y-5">
        <div className="flex items-center justify-between gap-2 text-xs text-gray-500">
          <span className="font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full">
            Nhóm {current.groupNumber}: {current.groupTitle}
          </span>
          <span className="font-semibold">
            Câu #{String(current.id).padStart(2, '0')} • Thẻ {(index % deck.length) + 1}/{deck.length}
          </span>
        </div>

        <div className="rounded-2xl bg-amber-50/70 border border-amber-200 p-5 text-center space-y-3">
          {!blindAudio || revealDe || selectedId !== null ? (
            <p className="text-lg sm:text-xl font-bold text-gray-900 leading-snug">
              „{current.de}“
            </p>
          ) : (
            <div className="space-y-2 py-2">
              <p className="text-sm font-semibold text-amber-900">
                Bấm nút bên dưới để nghe hiệu lệnh từ giám khảo (đang ẩn chữ tiếng Đức)
              </p>
              <button
                type="button"
                onClick={() => setRevealDe(true)}
                className="text-xs font-semibold text-gray-600 underline cursor-pointer"
              >
                Hiện câu tiếng Đức
              </button>
            </div>
          )}

          <div className="flex justify-center">
            <button
              type="button"
              onClick={handlePlay}
              className="px-5 py-2.5 rounded-full bg-amber-700 hover:bg-amber-800 text-white text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer flex items-center gap-2 active:scale-95"
            >
              <Volume2 className="w-4 h-4" />
              <span>Phát hiệu lệnh (DE)</span>
            </button>
          </div>
        </div>

        {/* Options */}
        <div className="space-y-2.5">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
            Giám khảo vừa yêu cầu bạn làm gì?
          </p>
          {options.map((opt, idx) => {
            const picked = selectedId === opt.id
            const isRight = opt.id === current.id
            const answered = selectedId !== null

            let btnStyle =
              'bg-gray-50 hover:bg-amber-50 border-gray-200 hover:border-amber-400 text-gray-800'
            if (answered) {
              if (isRight) {
                btnStyle = 'bg-green-50 border-green-500 text-green-900 font-bold'
              } else if (picked) {
                btnStyle = 'bg-red-50 border-red-400 text-red-900'
              } else {
                btnStyle = 'bg-gray-50 border-gray-200 text-gray-400 opacity-75'
              }
            }

            return (
              <button
                key={opt.id}
                type="button"
                disabled={answered}
                onClick={() => handlePick(opt)}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center gap-3 cursor-pointer disabled:cursor-default ${btnStyle}`}
              >
                <span className="w-7 h-7 rounded-lg bg-white border border-gray-200 font-bold text-xs flex items-center justify-center shrink-0">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="flex-1 text-xs sm:text-sm leading-relaxed">{opt.vi}</span>
                {answered && isRight && <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />}
                {answered && picked && !isRight && (
                  <XCircle className="w-5 h-5 text-red-600 shrink-0" />
                )}
              </button>
            )
          })}
        </div>

        {/* Post-answer footer */}
        {selectedId !== null && (
          <div className="pt-2 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs text-gray-600">
              {selectedId === current.id ? (
                <span className="font-bold text-green-700">Chính xác! Phản xạ rất tốt.</span>
              ) : (
                <span className="font-bold text-red-700">
                  Chưa đúng — xem lại nghĩa đúng phía trên nhé.
                </span>
              )}
              {!showVn && (
                <span className="block text-[11px] text-gray-500 mt-0.5">
                  ({current.groupTitleDe})
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onToggleLearned(current.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold border cursor-pointer flex items-center gap-1.5 ${
                  learned[current.id]
                    ? 'bg-green-100 text-green-800 border-green-300'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-green-400'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{learned[current.id] ? 'Đã thuộc' : 'Đánh dấu đã thuộc'}</span>
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-amber-700 hover:bg-amber-800 text-white cursor-pointer flex items-center gap-1.5"
              >
                <span>Câu tiếp theo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function FinishAndTechView({ finishDone, onToggleFinish, techDone, onToggleTech }) {
  const [openTopic, setOpenTopic] = useState(ABFAHRKONTROLLE_TOPICS[0].id)
  const finishCount = FINISH_STEPS.filter((s) => finishDone[s.step]).length
  const techCount = ABFAHRKONTROLLE_TOPICS.filter((t) => techDone[t.id]).length

  return (
    <div className="space-y-6">
      {/* Section 12: 7 thao tác kết thúc bài thi */}
      <section className="bg-white p-5 sm:p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 font-extrabold flex items-center justify-center text-base shrink-0">
              12
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                Những thao tác khi kết thúc bài thi
              </h2>
              <p className="text-xs text-gray-500">
                Checklist 7 bước tự thực hiện khi giám khảo yêu cầu „Fahrzeug parkfertig abstellen“ &amp; „Steigen Sie bitte aus“
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
            Đã tích {finishCount}/{FINISH_STEPS.length} bước
          </span>
        </div>

        <div className="space-y-2.5">
          {FINISH_STEPS.map((item) => {
            const checked = Boolean(finishDone[item.step])
            return (
              <button
                key={item.step}
                type="button"
                onClick={() => onToggleFinish(item.step)}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start gap-3 cursor-pointer ${
                  checked
                    ? 'bg-emerald-50/50 border-emerald-300'
                    : 'bg-gray-50/70 border-gray-200 hover:border-amber-400'
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    checked
                      ? 'bg-green-700 border-green-800 text-white'
                      : 'bg-white border-gray-300 text-gray-400'
                  }`}
                >
                  {checked ? <Check className="w-4 h-4" /> : <span className="text-xs font-bold">{item.step}</span>}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                    <span className={`text-sm font-bold ${checked ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                      {item.step}. {item.title}
                    </span>
                    <span className="text-[11px] font-semibold text-amber-800">({item.deHint})</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">{item.detail}</p>
                </div>
              </button>
            )
          })}
        </div>

        <div className="rounded-2xl p-4 bg-red-50/70 border border-red-200 text-red-950 text-xs space-y-2">
          <div className="flex items-center gap-2 font-bold">
            <ShieldAlert className="w-4 h-4 text-red-700 shrink-0" />
            <span>Đặc biệt quan trọng khi rời khỏi xe!</span>
          </div>
          <ul className="list-disc pl-4 space-y-1">
            {FINISH_WARNINGS.map((w, idx) => (
              <li key={idx}>{w}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Section 13: Các câu hỏi kỹ thuật trước kỳ thi (Abfahrkontrolle) */}
      <section className="bg-white p-5 sm:p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 font-extrabold flex items-center justify-center shrink-0">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                Câu hỏi kỹ thuật trước kỳ thi (Abfahrkontrolle)
              </h2>
              <p className="text-xs text-gray-500">
                Chuẩn bị kỹ 7 chủ đề — trước khi chạy giám khảo có thể hỏi 3 câu hoặc yêu cầu kiểm tra trực tiếp trên xe
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
            Đã ôn {techCount}/{ABFAHRKONTROLLE_TOPICS.length} mục
          </span>
        </div>

        <div className="space-y-2.5">
          {ABFAHRKONTROLLE_TOPICS.map((topic, idx) => {
            const isOpen = openTopic === topic.id
            const isDone = Boolean(techDone[topic.id])
            return (
              <div
                key={topic.id}
                className={`rounded-2xl border overflow-hidden transition-all ${
                  isDone ? 'border-emerald-300 bg-emerald-50/30' : 'border-gray-200 bg-gray-50/60'
                }`}
              >
                <div className="flex items-center justify-between gap-2 p-3.5 sm:p-4">
                  <button
                    type="button"
                    onClick={() => setOpenTopic(isOpen ? null : topic.id)}
                    className="flex-1 text-left flex items-center gap-3 cursor-pointer min-w-0"
                  >
                    <span className="w-7 h-7 rounded-lg bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-gray-900 truncate">{topic.title}</p>
                      <p className="text-xs font-medium text-amber-800 truncate">{topic.de}</p>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-gray-500 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-500 shrink-0" />
                    )}
                  </button>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => speakGerman(topic.speakDe)}
                      className="p-2 rounded-xl bg-white border border-gray-200 hover:border-amber-400 text-gray-700 cursor-pointer"
                      title={`Nghe câu hỏi mẫu: ${topic.speakDe}`}
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onToggleTech(topic.id)}
                      className={`p-2 rounded-xl border cursor-pointer ${
                        isDone
                          ? 'bg-green-100 text-green-800 border-green-300'
                          : 'bg-white text-gray-400 border-gray-200 hover:text-green-700'
                      }`}
                      title={isDone ? 'Đã nắm vững chủ đề này' : 'Đánh dấu đã ôn'}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {isOpen && (
                  <div className="px-4 pb-4 pt-1 border-t border-gray-200/70 bg-white space-y-2 text-xs text-gray-700">
                    <p className="font-semibold text-amber-900">
                      Câu hỏi mẫu: „{topic.speakDe}“
                    </p>
                    <p className="text-gray-600">{topic.summary}</p>
                    <ul className="list-disc pl-4 space-y-1">
                      {topic.checks.map((c, cIdx) => (
                        <li key={cIdx}>{c}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* Instructor Advice: Fahrlehrer Bülent */}
      <section className="bg-amber-50/70 p-5 sm:p-6 rounded-3xl border border-amber-200 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-700 text-white flex items-center justify-center shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-gray-900">
              Lời khuyên của giáo viên dạy lái xe ({INSTRUCTOR_ADVICE.author})
            </h2>
            <p className="text-xs text-amber-800">Nguyên tắc vàng khi cầm vô lăng thi {INSTRUCTOR_ADVICE.org}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          {INSTRUCTOR_ADVICE.pillars.map((pillar, idx) => {
            const Icon = idx === 0 ? Eye : idx === 1 ? Brain : Car
            return (
              <div
                key={pillar.key}
                className="bg-white rounded-2xl border border-amber-200 p-3 text-center space-y-1"
              >
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
                  <Icon className="w-4 h-4" />
                </div>
                <p className="text-xs sm:text-sm font-extrabold text-gray-900">{pillar.vi}</p>
                <p className="text-[11px] font-semibold text-amber-800">{pillar.de}</p>
              </div>
            )
          })}
        </div>

        <ul className="space-y-1.5 text-xs sm:text-sm text-gray-700 list-disc pl-4 leading-relaxed">
          {INSTRUCTOR_ADVICE.notes.map((n, i) => (
            <li key={i}>{n}</li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default function PracticalGuide({ showVn, player }) {
  const [subMode, setSubMode] = useState('commands') // 'commands' | 'drill' | 'checklist'
  const [groupFilter, setGroupFilter] = useState('all')
  const [onlyUnlearned, setOnlyUnlearned] = useState(false)
  const [search, setSearch] = useState('')
  const [speakingId, setSpeakingId] = useState(null)
  const [playingGroupId, setPlayingGroupId] = useState(null)
  const [praxisState, setPraxisState] = useState(() => loadPraxisState(player))
  const queueActiveRef = useRef(false)

  useEffect(() => {
    savePraxisState(player, praxisState)
  }, [player, praxisState])

  useEffect(() => {
    return () => {
      queueActiveRef.current = false
      stopSpeech()
    }
  }, [])

  const stopAllAudio = useCallback(() => {
    queueActiveRef.current = false
    setPlayingGroupId(null)
    setSpeakingId(null)
    stopSpeech()
  }, [])

  const handleSpeakCommand = useCallback(
    (cmd) => {
      if (speakingId === cmd.id && !queueActiveRef.current) {
        stopAllAudio()
        return
      }
      queueActiveRef.current = false
      setPlayingGroupId(null)
      setSpeakingId(cmd.id)
      const ok = speakGerman(cmd.de, () => {
        setSpeakingId((prev) => (prev === cmd.id ? null : prev))
      })
      if (!ok) setSpeakingId(null)
    },
    [speakingId, stopAllAudio]
  )

  const handlePlayGroup = useCallback(
    (group) => {
      if (playingGroupId === group.id) {
        stopAllAudio()
        return
      }
      stopAllAudio()
      queueActiveRef.current = true
      setPlayingGroupId(group.id)

      const playStep = (idx) => {
        if (!queueActiveRef.current || idx >= group.commands.length) {
          queueActiveRef.current = false
          setPlayingGroupId(null)
          setSpeakingId(null)
          return
        }
        const item = group.commands[idx]
        setSpeakingId(item.id)
        const ok = speakGerman(item.de, () => {
          if (queueActiveRef.current) playStep(idx + 1)
        })
        if (!ok) {
          queueActiveRef.current = false
          setPlayingGroupId(null)
          setSpeakingId(null)
        }
      }
      playStep(0)
    },
    [playingGroupId, stopAllAudio]
  )

  const toggleLearned = (id) => {
    setPraxisState((prev) => {
      const nextLearned = { ...prev.learned }
      if (nextLearned[id]) delete nextLearned[id]
      else nextLearned[id] = true
      return { ...prev, learned: nextLearned }
    })
  }

  const toggleFinishStep = (step) => {
    setPraxisState((prev) => {
      const nextFinish = { ...prev.finishDone }
      if (nextFinish[step]) delete nextFinish[step]
      else nextFinish[step] = true
      return { ...prev, finishDone: nextFinish }
    })
  }

  const toggleTechTopic = (id) => {
    setPraxisState((prev) => {
      const nextTech = { ...prev.techDone }
      if (nextTech[id]) delete nextTech[id]
      else nextTech[id] = true
      return { ...prev, techDone: nextTech }
    })
  }

  const learnedCount = Object.keys(praxisState.learned || {}).length
  const totalCommands = PRACTICAL_ALL_COMMANDS.length
  const percentLearned = Math.round((learnedCount / totalCommands) * 100)

  const filteredGroups = useMemo(() => {
    const q = search.trim().toLowerCase()
    return PRACTICAL_GROUPS.filter((g) => groupFilter === 'all' || g.id === groupFilter)
      .map((g) => {
        const cmds = g.commands.filter((cmd) => {
          if (onlyUnlearned && praxisState.learned[cmd.id]) return false
          if (!q) return true
          return (
            cmd.de.toLowerCase().includes(q) ||
            cmd.vi.toLowerCase().includes(q) ||
            String(cmd.id) === q
          )
        })
        return { ...g, commands: cmds }
      })
      .filter((g) => g.commands.length > 0)
  }, [groupFilter, onlyUnlearned, search, praxisState.learned])

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header Banner (tương thích azubi-skin.css: không đặt button trong Hero có h1) */}
      <div className="bg-gradient-to-br from-green-700 via-green-600 to-emerald-700 text-white p-6 sm:p-8 rounded-3xl shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold">
            <Compass className="w-3.5 h-3.5" />
            <span>DEKRA &amp; TÜV • Praktische Fahrprüfung</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            41 Hiệu Lệnh Thi Thực Hành Lái Xe Đức
          </h1>
          <p className="text-green-100 text-xs sm:text-sm leading-relaxed">
            Học thuộc 41 hiệu lệnh thường gặp của giám khảo DEKRA &amp; TÜV kèm phát âm tiếng Đức chuẩn, luyện nghe phản xạ không chữ, checklist 7 bước kết thúc và 7 chủ đề Abfahrkontrolle.
          </p>

          <div className="pt-2 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold">
              <span>Tiến độ ghi nhớ hiệu lệnh</span>
              <span>
                {learnedCount} / {totalCommands} câu ({percentLearned}%)
              </span>
            </div>
            <div className="w-full h-2.5 bg-black/15 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-700 rounded-full transition-all duration-300"
                style={{ width: `${percentLearned}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mode Switcher Bar (Segmented Tabs) */}
      <div
        role="tablist"
        aria-label="Chế độ ôn thi thực hành"
        className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-amber-100/70 border border-amber-300"
      >
        {[
          { id: 'commands', label: '41 Hiệu lệnh (1–41)', short: '41 Hiệu lệnh', icon: Compass },
          { id: 'drill', label: 'Luyện phản xạ (Nghe)', short: 'Phản xạ nghe', icon: Sparkles },
          { id: 'checklist', label: 'Kết thúc & Kỹ thuật', short: 'Kết thúc & KT', icon: Wrench },
        ].map((tab) => {
          const Icon = tab.icon
          const active = subMode === tab.id
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={active}
              type="button"
              onClick={() => {
                stopAllAudio()
                setSubMode(tab.id)
              }}
              className={`px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                active
                  ? 'bg-white text-amber-900 shadow-xs border border-amber-300'
                  : 'text-gray-600 hover:text-gray-900 border border-transparent'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.short}</span>
            </button>
          )
        })}
      </div>

      {/* MODE 1: 41 COMMANDS BY 11 GROUPS */}
      {subMode === 'commands' && (
        <div className="space-y-5">
          {/* Filter & Search Bar */}
          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Tìm nhanh theo tiếng Đức, tiếng Việt hoặc số (vd: Ampel, 18, lùi)..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 bg-gray-50 text-xs sm:text-sm focus:outline-none focus:border-amber-700"
                />
              </div>

              <button
                type="button"
                onClick={() => setOnlyUnlearned((v) => !v)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer shrink-0 ${
                  onlyUnlearned
                    ? 'bg-amber-700 text-white border-amber-800'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-amber-400'
                }`}
              >
                {onlyUnlearned ? 'Đang ẩn câu đã thuộc' : `Chưa thuộc (${totalCommands - learnedCount})`}
              </button>
            </div>

            {/* Group filter chips */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              <button
                type="button"
                onClick={() => setGroupFilter('all')}
                className={`px-2.5 py-1 rounded-full text-[11px] font-bold border cursor-pointer transition-all ${
                  groupFilter === 'all'
                    ? 'bg-amber-700 text-white border-amber-800'
                    : 'bg-gray-100 text-gray-700 border-gray-200 hover:border-amber-400'
                }`}
              >
                Tất cả (11 nhóm)
              </button>
              {PRACTICAL_GROUPS.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setGroupFilter(g.id)}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border cursor-pointer transition-all ${
                    groupFilter === g.id
                      ? 'bg-amber-700 text-white border-amber-800'
                      : 'bg-gray-100 text-gray-700 border-gray-200 hover:border-amber-400'
                  }`}
                >
                  {g.number}. {g.titleDe}
                </button>
              ))}
            </div>
          </div>

          {filteredGroups.length === 0 ? (
            <div className="bg-white p-8 rounded-3xl border border-gray-200 text-center space-y-2">
              <p className="text-sm font-bold text-gray-800">Không có hiệu lệnh phù hợp bộ lọc</p>
              <button
                type="button"
                onClick={() => {
                  setGroupFilter('all')
                  setOnlyUnlearned(false)
                  setSearch('')
                }}
                className="px-4 py-2 rounded-xl bg-amber-700 text-white text-xs font-bold cursor-pointer"
              >
                Hiện lại tất cả 41 câu
              </button>
            </div>
          ) : (
            filteredGroups.map((group) => {
              const isPlayingGroup = playingGroupId === group.id
              return (
                <section
                  key={group.id}
                  className="bg-white p-4 sm:p-6 rounded-3xl border border-gray-200 shadow-sm space-y-3.5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-8 h-8 rounded-xl bg-amber-100 border border-amber-300 text-amber-900 font-extrabold text-sm flex items-center justify-center shrink-0">
                        {group.number}
                      </span>
                      <div className="min-w-0">
                        <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
                          {group.title}
                        </h2>
                        <p className="text-xs text-gray-500">{group.titleDe}</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handlePlayGroup(group)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                        isPlayingGroup
                          ? 'bg-amber-700 text-white border-amber-800'
                          : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-200'
                      }`}
                    >
                      {isPlayingGroup ? (
                        <Square className="w-3.5 h-3.5" />
                      ) : (
                        <Play className="w-3.5 h-3.5" />
                      )}
                      <span>{isPlayingGroup ? 'Dừng phát nhóm' : 'Nghe cả nhóm'}</span>
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {group.commands.map((cmd) => (
                      <CommandRow
                        key={cmd.id}
                        cmd={cmd}
                        showVn={showVn}
                        isLearned={Boolean(praxisState.learned[cmd.id])}
                        isSpeaking={speakingId === cmd.id}
                        onSpeak={handleSpeakCommand}
                        onToggleLearned={toggleLearned}
                      />
                    ))}
                  </div>

                  <CalloutBox callout={group.callout} />
                </section>
              )
            })
          )}
        </div>
      )}

      {/* MODE 2: LISTENING & REACTION DRILL */}
      {subMode === 'drill' && (
        <DrillMode
          learned={praxisState.learned}
          onToggleLearned={toggleLearned}
          showVn={showVn}
        />
      )}

      {/* MODE 3: FINISH CHECKLIST + ABFAHRKONTROLLE + INSTRUCTOR ADVICE */}
      {subMode === 'checklist' && (
        <FinishAndTechView
          finishDone={praxisState.finishDone}
          onToggleFinish={toggleFinishStep}
          techDone={praxisState.techDone}
          onToggleTech={toggleTechTopic}
        />
      )}
    </div>
  )
}
