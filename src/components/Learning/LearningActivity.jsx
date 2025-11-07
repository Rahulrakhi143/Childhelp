import React, { useState, useEffect } from 'react'
import { useChild } from '../../context/ChildContext'
import HandwritingCanvas from './HandwritingCanvas'
import SpeechRecognition from './SpeechRecognition'
import { getLearningContent } from '../../utils/learningContent'
import { evaluateHandwriting, evaluateSpeech } from '../../utils/aiEvaluation'
import { triggerCelebration } from '../../utils/celebration'
import './LearningActivity.css'

const LearningActivity = ({ language, subject, level, childId, onBack }) => {
  const { updateProgress } = useChild()
  const [currentItem, setCurrentItem] = useState(0)
  const [mode, setMode] = useState('tracing') // 'tracing' or 'free'
  const [activityType, setActivityType] = useState('writing') // 'writing' or 'speaking'
  const [showHint, setShowHint] = useState(false)
  const [feedback, setFeedback] = useState(null)
  const [isCorrect, setIsCorrect] = useState(null)
  const [score, setScore] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [content, setContent] = useState([])
  const [isLoadingContent, setIsLoadingContent] = useState(true)

  const item = content && content.length > 0 ? content[currentItem] : null

  // Load content on mount or when language/subject/level changes
  useEffect(() => {
    const loadContent = async () => {
      setIsLoadingContent(true)
      try {
        const loadedContent = await getLearningContent(language, subject, level)
        setContent(loadedContent || [])
      } catch (error) {
        // Silently set empty content if loading fails
        setContent([])
      } finally {
        setIsLoadingContent(false)
      }
    }
    loadContent()
  }, [language, subject, level])

  // Content loaded, no need for debug logging

  useEffect(() => {
    // Speak the target when activity starts
    if (item && activityType === 'writing') {
      speakText(item.target, language)
    }
  }, [currentItem, activityType, item, language])

  const speakText = (text, lang) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = lang === 'hindi' ? 'hi-IN' : lang === 'marwadi' ? 'hi-IN' : 'en-US'
      utterance.rate = 0.8
      utterance.pitch = 1.2
      speechSynthesis.speak(utterance)
    }
  }

  const handleHandwritingSubmit = async (drawing) => {
    setAttempts(attempts + 1)
    const result = await evaluateHandwriting(drawing, item.target, language, subject, level)
    
    if (result.correct) {
      setIsCorrect(true)
      setScore(score + 1)
      setFeedback({
        type: 'success',
        message: result.message || 'Bahut accha! Good job! 🎉'
      })
      triggerCelebration()
      
      // Update progress
      const accuracy = Math.round((score / (currentItem + 1)) * 100)
      updateProgress(childId, subject, level, accuracy)
      
      // Move to next item after delay
      setTimeout(() => {
        if (currentItem < content.length - 1) {
          setCurrentItem(currentItem + 1)
          setIsCorrect(null)
          setFeedback(null)
        } else {
          // Level complete
          setFeedback({
            type: 'complete',
            message: 'Level Complete! 🏆'
          })
        }
      }, 2000)
    } else {
      setIsCorrect(false)
      setFeedback({
        type: 'error',
        message: result.message || 'Ye galat hai, phir se try karo...'
      })
      
      if (result.hint) {
        setShowHint(true)
      }
    }
  }

  const handleSpeechSubmit = async (audioBlob, transcript) => {
    setAttempts(attempts + 1)
    const result = await evaluateSpeech(transcript, item.target, language)
    
    if (result.correct) {
      setIsCorrect(true)
      setScore(score + 1)
      setFeedback({
        type: 'success',
        message: result.message || 'Perfect pronunciation! 🎉'
      })
      triggerCelebration()
      
      const accuracy = Math.round((score / (currentItem + 1)) * 100)
      updateProgress(childId, subject, level, accuracy)
      
      setTimeout(() => {
        if (currentItem < content.length - 1) {
          setCurrentItem(currentItem + 1)
          setIsCorrect(null)
          setFeedback(null)
        } else {
          setFeedback({
            type: 'complete',
            message: 'Level Complete! 🏆'
          })
        }
      }, 2000)
    } else {
      setIsCorrect(false)
      setFeedback({
        type: 'error',
        message: result.message || 'Try again, listen carefully...'
      })
    }
  }

  const handleNext = () => {
    if (currentItem < content.length - 1) {
      setCurrentItem(currentItem + 1)
      setIsCorrect(null)
      setFeedback(null)
      setShowHint(false)
    }
  }

  const handleRepeat = () => {
    speakText(item.target, language)
  }

  if (isLoadingContent) {
    return (
      <div className="learning-activity">
        <div className="activity-container">
          <button className="back-button" onClick={onBack}>
            ← Back
          </button>
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🤖</div>
            <h2>Generating Content with AI...</h2>
            <p style={{ fontSize: '1rem', color: '#666', marginTop: '10px' }}>
              Creating personalized learning content for you
            </p>
            <div style={{ 
              marginTop: '30px',
              width: '200px',
              height: '4px',
              background: '#e0e0e0',
              borderRadius: '2px',
              overflow: 'hidden',
              margin: '30px auto'
            }}>
              <div style={{
                height: '100%',
                background: 'linear-gradient(90deg, var(--primary-color) 0%, var(--secondary-color) 100%)',
                animation: 'loading 1.5s ease-in-out infinite',
                width: '60%'
              }}></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!content || content.length === 0) {
    return (
      <div className="learning-activity">
        <div className="activity-container">
          <button className="back-button" onClick={onBack}>
            ← Back
          </button>
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <h2>No content available</h2>
            <p>Content not found for: {language} - {subject} - {level}</p>
            <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '20px' }}>
              Please select a different level or contact support.
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (!item) {
    return (
      <div className="learning-activity">
        <div className="activity-container">
          <button className="back-button" onClick={onBack}>
            ← Back
          </button>
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <h2>Level Complete! 🎉</h2>
            <p>You've finished all items in this level!</p>
            <button 
              onClick={onBack}
              style={{
                marginTop: '20px',
                padding: '12px 30px',
                background: 'var(--primary-color)',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--border-radius)',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Go Back to Levels
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="learning-activity">
      <div className="activity-container">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>

        <div className="activity-header">
          <div className="progress-indicator">
            <div className="progress-text">
              {currentItem + 1} / {content.length}
            </div>
            <div className="progress-bar-activity">
              <div 
                className="progress-fill-activity" 
                style={{ width: `${((currentItem + 1) / content.length) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="score-display">
            <span className="score-icon">⭐</span>
            <span className="score-value">{score}</span>
          </div>
        </div>

        <div className="activity-content">
          <div className="target-display">
            <div className="target-label">Try this:</div>
            <div className="target-text">{item.target}</div>
            <div className="target-actions">
              <button className="repeat-btn" onClick={handleRepeat}>
                🔊 Repeat
              </button>
              <button 
                className="hint-btn" 
                onClick={() => setShowHint(!showHint)}
              >
                💡 Hint
              </button>
            </div>
          </div>

          {showHint && item.hint && (
            <div className="hint-box">
              <p>{item.hint}</p>
            </div>
          )}

          <div className="mode-selector">
            <button
              className={`mode-btn ${activityType === 'writing' ? 'active' : ''}`}
              onClick={() => {
                setActivityType('writing')
                setFeedback(null)
                setIsCorrect(null)
              }}
            >
              ✍️ Writing
            </button>
            <button
              className={`mode-btn ${activityType === 'speaking' ? 'active' : ''}`}
              onClick={() => {
                setActivityType('speaking')
                setFeedback(null)
                setIsCorrect(null)
              }}
            >
              🗣️ Speaking
            </button>
          </div>

          {activityType === 'writing' && (
            <div className="writing-activity">
              <div className="tracing-mode-selector">
                <button
                  className={`tracing-btn ${mode === 'tracing' ? 'active' : ''}`}
                  onClick={() => setMode('tracing')}
                >
                  📝 Tracing Mode
                </button>
                <button
                  className={`tracing-btn ${mode === 'free' ? 'active' : ''}`}
                  onClick={() => setMode('free')}
                >
                  ✏️ Free Writing
                </button>
              </div>
              
              <HandwritingCanvas
                target={item.target}
                mode={mode}
                language={language}
                subject={subject}
                onSubmit={handleHandwritingSubmit}
                disabled={isCorrect === true}
              />
            </div>
          )}

          {activityType === 'speaking' && (
            <div className="speaking-activity">
              <SpeechRecognition
                target={item.target}
                language={language}
                onSubmit={handleSpeechSubmit}
                disabled={isCorrect === true}
              />
            </div>
          )}

          {feedback && (
            <div className={`feedback-box ${feedback.type}`}>
              <div className="feedback-icon">
                {feedback.type === 'success' && '✅'}
                {feedback.type === 'error' && '❌'}
                {feedback.type === 'complete' && '🏆'}
              </div>
              <div className="feedback-message">{feedback.message}</div>
              {feedback.type === 'complete' && (
                <button className="next-level-btn" onClick={onBack}>
                  Go to Levels
                </button>
              )}
            </div>
          )}

          {isCorrect && currentItem < content.length - 1 && (
            <button className="next-item-btn" onClick={handleNext}>
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default LearningActivity
