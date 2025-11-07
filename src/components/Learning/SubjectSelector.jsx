import React from 'react'
import './SubjectSelector.css'

const subjects = [
  { id: 'hindi', name: 'हिंदी', icon: '📝' },
  { id: 'english', name: 'English', icon: '📚' },
  { id: 'math', name: 'Maths', icon: '🔢' }
]

const SubjectSelector = ({ language, onSelect, onBack }) => {
  // For Marwadi, only show Marwadi subject
  if (language === 'marwadi') {
    return (
      <div className="subject-selector">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>
        
        <div className="selector-header">
          <h1>Choose a Subject</h1>
          <p>What would you like to learn today?</p>
        </div>
        
        <div className="subject-grid">
          <button
            className="subject-card"
            onClick={() => onSelect('marwadi')}
          >
            <div className="subject-icon">📝</div>
            <div className="subject-name">मारवाड़ी</div>
            <div className="subject-arrow">→</div>
          </button>
        </div>
      </div>
    )
  }

  // For Hindi and English, show both language subjects + Math
  const filteredSubjects = subjects.filter(s => {
    if (s.id === 'math') {
      // Math available for both Hindi and English
      return language === 'hindi' || language === 'english'
    }
    // Show both Hindi and English subjects for Hindi/English languages
    if (language === 'hindi' || language === 'english') {
      return s.id === 'hindi' || s.id === 'english'
    }
    return false
  })

  return (
    <div className="subject-selector">
      <button className="back-button" onClick={onBack}>
        ← Back
      </button>
      
      <div className="selector-header">
        <h1>Choose a Subject</h1>
        <p>What would you like to learn today?</p>
      </div>
      
      <div className="subject-grid">
        {filteredSubjects.map(subject => (
          <button
            key={subject.id}
            className="subject-card"
            onClick={() => onSelect(subject.id)}
          >
            <div className="subject-icon">{subject.icon}</div>
            <div className="subject-name">{subject.name}</div>
            <div className="subject-arrow">→</div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default SubjectSelector
