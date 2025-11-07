import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useChild } from '../context/ChildContext'
import LanguageSelector from '../components/Learning/LanguageSelector'
import SubjectSelector from '../components/Learning/SubjectSelector'
import LevelSelector from '../components/Learning/LevelSelector'
import LearningActivity from '../components/Learning/LearningActivity'
import './Learning.css'

const Learning = () => {
  const navigate = useNavigate()
  const { currentChild } = useChild()
  const [selectedLanguage, setSelectedLanguage] = useState(null)
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [selectedLevel, setSelectedLevel] = useState(null)

  if (!currentChild) {
    return (
      <div className="learning-no-profile">
        <p>Please select a profile to start learning</p>
        <button onClick={() => navigate('/login')}>Select Profile</button>
      </div>
    )
  }

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language)
    setSelectedSubject(null)
    setSelectedLevel(null)
  }

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject)
    setSelectedLevel(null)
  }

  const handleLevelSelect = (level) => {
    setSelectedLevel(level)
  }

  const handleBack = () => {
    if (selectedLevel) {
      setSelectedLevel(null)
    } else if (selectedSubject) {
      setSelectedSubject(null)
    } else if (selectedLanguage) {
      setSelectedLanguage(null)
    } else {
      navigate('/')
    }
  }

  return (
    <div className="learning">
      <div className="learning-container">
        {!selectedLanguage && (
          <LanguageSelector onSelect={handleLanguageSelect} />
        )}

        {selectedLanguage && !selectedSubject && (
          <SubjectSelector 
            language={selectedLanguage}
            onSelect={handleSubjectSelect}
            onBack={handleBack}
          />
        )}

        {selectedLanguage && selectedSubject && !selectedLevel && (
          <LevelSelector
            language={selectedLanguage}
            subject={selectedSubject}
            childProgress={currentChild.progress}
            onSelect={handleLevelSelect}
            onBack={handleBack}
          />
        )}

        {selectedLanguage && selectedSubject && selectedLevel && (
          <LearningActivity
            language={selectedLanguage}
            subject={selectedSubject}
            level={selectedLevel}
            childId={currentChild.id}
            onBack={handleBack}
          />
        )}
      </div>
    </div>
  )
}

export default Learning
