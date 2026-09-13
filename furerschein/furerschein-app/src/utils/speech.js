/**
 * Web Speech API helper for German text-to-speech pronunciation
 */

let currentUtterance = null

export function speakGerman(text, onEnd) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser')
    return false
  }

  // Cancel any previous speech
  window.speechSynthesis.cancel()

  if (!text || !text.trim()) return false

  const utterance = new SpeechSynthesisUtterance(text.trim())
  utterance.lang = 'de-DE'
  utterance.rate = 0.88 // Slightly slower for clear learning pronunciation
  utterance.pitch = 1.0

  // Try to find a good German voice
  const voices = window.speechSynthesis.getVoices()
  const deVoice = voices.find(v => v.lang === 'de-DE' || v.lang.startsWith('de'))
  if (deVoice) {
    utterance.voice = deVoice
  }

  if (onEnd) {
    utterance.onend = onEnd
    utterance.onerror = onEnd
  }

  currentUtterance = utterance
  window.speechSynthesis.speak(utterance)
  return true
}

export function stopSpeech() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel()
    currentUtterance = null
  }
}

export function isSpeaking() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    return window.speechSynthesis.speaking
  }
  return false
}
