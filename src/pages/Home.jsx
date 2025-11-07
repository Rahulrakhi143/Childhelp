import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useChild } from '../context/ChildContext'
import './Home.css'

const Home = () => {
  const navigate = useNavigate()
  const { currentChild } = useChild()

  if (!currentChild) {
    return (
      <div className="home-no-profile">
        <div className="welcome-card">
          <h1>👋 Welcome to Kids Learning AI!</h1>
          <p>Please select or create a profile to start learning</p>
          <button onClick={() => navigate('/login')} className="cta-button">
            Get Started
          </button>
        </div>
      </div>
    )
  }

  const mascots = ['🐼', '🐰', '🐤', '🐶', '🐵', '🦊']
  const randomMascot = mascots[Math.floor(Math.random() * mascots.length)]

  const progress = currentChild.progress || {}
  const totalProgress = 
    (progress.hindi?.accuracy || 0) +
    (progress.english?.accuracy || 0) +
    (progress.marwadi?.accuracy || 0) +
    (progress.math?.accuracy || 0)
  const avgProgress = Math.round(totalProgress / 4)

  return (
    <div className="home">
      <div className="home-container">
        <div className="welcome-section">
          <div className="mascot-display">
            <div className="mascot-avatar">{randomMascot}</div>
            <div className="speech-bubble">
              <p>Namaste! Let's learn together! 🎉</p>
            </div>
          </div>
          
          <div className="welcome-content">
            <h1>Hello, {currentChild.name}! 👋</h1>
            <p className="welcome-subtitle">Ready to learn something new today?</p>
          </div>
        </div>

        <div className="quick-stats">
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-value">{avgProgress}%</div>
            <div className="stat-label">Overall Progress</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🔥</div>
            <div className="stat-value">{currentChild.streak || 0}</div>
            <div className="stat-label">Day Streak</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🏆</div>
            <div className="stat-value">{currentChild.badges?.length || 0}</div>
            <div className="stat-label">Badges Earned</div>
          </div>
        </div>

        <div className="action-cards">
          <div className="action-card" onClick={() => navigate('/learning')}>
            <div className="action-icon">📚</div>
            <h2>Start Learning</h2>
            <p>Learn alphabets, words, and sentences</p>
            <div className="action-arrow">→</div>
          </div>

          <div className="action-card" onClick={() => navigate('/parent')}>
            <div className="action-icon">👨‍👩‍👧</div>
            <h2>Parent Panel</h2>
            <p>View progress and reports</p>
            <div className="action-arrow">→</div>
          </div>
        </div>

        <div className="subject-progress">
          <h2>Your Progress</h2>
          <div className="progress-grid">
            {['hindi', 'english', 'marwadi', 'math'].map(subject => {
              const subjProgress = progress[subject] || {}
              const accuracy = subjProgress.accuracy || 0
              const subjectNames = {
                hindi: 'हिंदी',
                english: 'English',
                marwadi: 'मारवाड़ी',
                math: 'Maths'
              }
              return (
                <div key={subject} className="progress-card">
                  <div className="progress-header">
                    <span className="subject-name">{subjectNames[subject]}</span>
                    <span className="progress-percent">{accuracy}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${accuracy}%` }}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
