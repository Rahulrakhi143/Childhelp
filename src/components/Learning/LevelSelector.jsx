import React from 'react'
import './LevelSelector.css'

const levels = [
  { id: 'alphabets', name: 'Alphabets', icon: '🔤', description: 'Learn letters A-Z' },
  { id: 'words', name: 'Simple Words', icon: '📝', description: 'Learn basic words' },
  { id: 'sentences', name: 'Sentences', icon: '📖', description: 'Build sentences' }
]

const mathLevels = [
  { id: 'numbers', name: 'Numbers', icon: '🔢', description: 'Learn 1-100' },
  { id: 'shapes', name: 'Shapes', icon: '🔷', description: 'Learn shapes' },
  { id: 'pahade', name: 'Pahade (Tables)', icon: '📊', description: 'Learn multiplication tables' }
]

const LevelSelector = ({ language, subject, childProgress, onSelect, onBack }) => {
  const availableLevels = subject === 'math' ? mathLevels : levels
  const progress = childProgress?.[subject] || {}

  const canAccessLevel = (levelId) => {
    // All levels are now unlocked - children can access any level freely
    return true
  }

  return (
    <div className="level-selector">
      <button className="back-button" onClick={onBack}>
        ← Back
      </button>
      
      <div className="selector-header">
        <h1>Choose a Level</h1>
        <p>Master each level before moving to the next!</p>
      </div>
      
      <div className="level-grid">
        {availableLevels.map((level, index) => {
          const unlocked = canAccessLevel(level.id)
          const levelProgress = progress[level.id] || 0
          
          return (
            <button
              key={level.id}
              className={`level-card ${!unlocked ? 'locked' : ''}`}
              onClick={() => unlocked && onSelect(level.id)}
              disabled={!unlocked}
            >
              {!unlocked && <div className="lock-icon">🔒</div>}
              <div className="level-icon">{level.icon}</div>
              <div className="level-name">{level.name}</div>
              <div className="level-description">{level.description}</div>
              {unlocked && levelProgress > 0 && (
                <div className="level-progress">
                  <div className="progress-bar-small">
                    <div 
                      className="progress-fill-small" 
                      style={{ width: `${levelProgress}%` }}
                    ></div>
                  </div>
                  <span className="progress-text">{levelProgress}%</span>
                </div>
              )}
              {unlocked && <div className="level-arrow">→</div>}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default LevelSelector
