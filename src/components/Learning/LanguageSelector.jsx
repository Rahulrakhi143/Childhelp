import React from 'react'
import './LanguageSelector.css'

const languages = [
  { id: 'hindi', name: 'हिंदी', flag: '🇮🇳', color: '#FF6B6B' },
  { id: 'english', name: 'English', flag: '🇬🇧', color: '#4ECDC4' },
  { id: 'marwadi', name: 'मारवाड़ी', flag: '🇮🇳', color: '#FFE66D' }
]

const LanguageSelector = ({ onSelect }) => {
  return (
    <div className="language-selector">
      <div className="selector-header">
        <h1>Choose Your Language</h1>
        <p>Select a language to start learning</p>
      </div>
      
      <div className="language-grid">
        {languages.map(lang => (
          <button
            key={lang.id}
            className="language-card"
            onClick={() => onSelect(lang.id)}
            style={{ backgroundColor: lang.color }}
          >
            <div className="language-flag">{lang.flag}</div>
            <div className="language-name">{lang.name}</div>
            <div className="language-arrow">→</div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default LanguageSelector
