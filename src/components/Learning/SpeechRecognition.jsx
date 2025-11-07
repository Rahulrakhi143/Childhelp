import React, { useState, useEffect } from 'react'
import './SpeechRecognition.css'

const SpeechRecognition = ({ target, language, onSubmit, disabled }) => {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [recognition, setRecognition] = useState(null)

  useEffect(() => {
    // Initialize Web Speech API
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const rec = new SpeechRecognition()
      rec.continuous = false
      rec.interimResults = false
      rec.lang = language === 'hindi' ? 'hi-IN' : language === 'marwadi' ? 'hi-IN' : 'en-US'

      rec.onstart = () => {
        setIsListening(true)
      }

      rec.onresult = (event) => {
        const result = event.results[0][0].transcript
        setTranscript(result)
        setIsListening(false)
        onSubmit(null, result)
      }

      rec.onerror = (event) => {
        setIsListening(false)
        if (event.error === 'no-speech') {
          // Silently handle no speech error
        } else if (event.error !== 'aborted') {
          // Only show error for non-aborted errors
        }
      }

      rec.onend = () => {
        setIsListening(false)
      }

      setRecognition(rec)
    }
    // If speech recognition not supported, component will show fallback message

    return () => {
      if (recognition) {
        recognition.stop()
      }
    }
  }, [language, onSubmit])

  const startListening = () => {
    if (disabled || !recognition) return
    setTranscript('')
    try {
      recognition.start()
    } catch (error) {
      // Silently handle recognition start errors
      setIsListening(false)
    }
  }

  const speakTarget = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(target)
      utterance.lang = language === 'hindi' ? 'hi-IN' : language === 'marwadi' ? 'hi-IN' : 'en-US'
      utterance.rate = 0.7
      utterance.pitch = 1.2
      speechSynthesis.speak(utterance)
    }
  }

  return (
    <div className="speech-recognition-container">
      <div className="speech-instructions">
        <h3>🎤 Say the word/letter clearly</h3>
        <p>Listen to the pronunciation and repeat it</p>
      </div>

      <div className="speech-display">
        <div className="target-word">{target}</div>
        <button className="play-target-btn" onClick={speakTarget}>
          🔊 Play
        </button>
      </div>

      <div className="recording-section">
        <button
          className={`record-btn ${isListening ? 'listening' : ''}`}
          onClick={startListening}
          disabled={disabled || isListening}
        >
          {isListening ? (
            <>
              <span className="pulse-dot"></span>
              Listening...
            </>
          ) : (
            <>
              🎤 Record
            </>
          )}
        </button>

        {transcript && (
          <div className="transcript-display">
            <p>You said: <strong>{transcript}</strong></p>
          </div>
        )}
      </div>

      {!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) && (
        <div className="fallback-message">
          <p>⚠️ Speech recognition is not supported in your browser.</p>
          <p>Please use Chrome or Edge for the best experience.</p>
        </div>
      )}
    </div>
  )
}

export default SpeechRecognition
