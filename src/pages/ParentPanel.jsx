import React, { useState } from 'react'
import { useChild } from '../context/ChildContext'
import { storage } from '../utils/storage'
import './ParentPanel.css'

const ParentPanel = () => {
  const { children, deleteChild, updateChild } = useChild()
  const [selectedChild, setSelectedChild] = useState(null)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [settings, setSettings] = useState(storage.getSettings())

  const handleTimeLimitChange = (minutes) => {
    const newSettings = { ...settings, timeLimit: minutes }
    setSettings(newSettings)
    storage.saveSettings(newSettings)
  }

  const handleToggleSound = () => {
    const newSettings = { ...settings, soundEnabled: !settings.soundEnabled }
    setSettings(newSettings)
    storage.saveSettings(newSettings)
  }

  const handleToggleMusic = () => {
    const newSettings = { ...settings, musicEnabled: !settings.musicEnabled }
    setSettings(newSettings)
    storage.saveSettings(newSettings)
  }

  const selectedChildData = selectedChild 
    ? children.find(c => c.id === selectedChild)
    : children[0]

  if (children.length === 0) {
    return (
      <div className="parent-panel">
        <div className="panel-container">
          <h1>Parent Panel</h1>
          <p>No child profiles found. Please create a profile first.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="parent-panel">
      <div className="panel-container">
        <h1 className="panel-title">👨‍👩‍👧 Parent Panel</h1>

        <div className="tabs">
          <button
            className={`tab ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            📊 Dashboard
          </button>
          <button
            className={`tab ${activeTab === 'progress' ? 'active' : ''}`}
            onClick={() => setActiveTab('progress')}
          >
            📈 Progress Report
          </button>
          <button
            className={`tab ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            ⚙️ Settings
          </button>
        </div>

        {activeTab === 'dashboard' && (
          <DashboardTab 
            children={children}
            selectedChild={selectedChild || children[0].id}
            onSelectChild={setSelectedChild}
            onDeleteChild={deleteChild}
          />
        )}

        {activeTab === 'progress' && selectedChildData && (
          <ProgressReportTab child={selectedChildData} />
        )}

        {activeTab === 'settings' && (
          <SettingsTab
            settings={settings}
            onTimeLimitChange={handleTimeLimitChange}
            onToggleSound={handleToggleSound}
            onToggleMusic={handleToggleMusic}
          />
        )}
      </div>
    </div>
  )
}

const DashboardTab = ({ children, selectedChild, onSelectChild, onDeleteChild }) => {
  const child = children.find(c => c.id === selectedChild) || children[0]

  return (
    <div className="dashboard-tab">
      <div className="child-selector">
        <h2>Select Child Profile</h2>
        <div className="child-grid">
          {children.map(c => (
            <button
              key={c.id}
              className={`child-profile-card ${selectedChild === c.id ? 'active' : ''}`}
              onClick={() => onSelectChild(c.id)}
            >
              <div className="profile-avatar-large">{c.avatar}</div>
              <div className="profile-name-large">{c.name}</div>
              {c.streak > 0 && (
                <div className="streak-badge">🔥 {c.streak} days</div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card-large">
          <div className="stat-icon-large">📊</div>
          <div className="stat-content">
            <div className="stat-label-large">Overall Progress</div>
            <div className="stat-value-large">
              {calculateOverallProgress(child)}%
            </div>
          </div>
        </div>

        <div className="stat-card-large">
          <div className="stat-icon-large">🔥</div>
          <div className="stat-content">
            <div className="stat-label-large">Practice Streak</div>
            <div className="stat-value-large">{child.streak || 0} days</div>
          </div>
        </div>

        <div className="stat-card-large">
          <div className="stat-icon-large">⏱️</div>
          <div className="stat-content">
            <div className="stat-label-large">Practice Time</div>
            <div className="stat-value-large">
              {Math.round((child.practiceTime || 0) / 60)} min
            </div>
          </div>
        </div>

        <div className="stat-card-large">
          <div className="stat-icon-large">🏆</div>
          <div className="stat-content">
            <div className="stat-label-large">Badges Earned</div>
            <div className="stat-value-large">{child.badges?.length || 0}</div>
          </div>
        </div>
      </div>

      <div className="subject-breakdown">
        <h2>Subject Breakdown</h2>
        <div className="breakdown-grid">
          {['hindi', 'english', 'marwadi', 'math'].map(subject => {
            const progress = child.progress?.[subject] || {}
            const accuracy = progress.accuracy || 0
            const subjectNames = {
              hindi: 'हिंदी',
              english: 'English',
              marwadi: 'मारवाड़ी',
              math: 'Maths'
            }
            return (
              <div key={subject} className="breakdown-card">
                <div className="breakdown-header">
                  <span className="breakdown-subject">{subjectNames[subject]}</span>
                  <span className="breakdown-percent">{accuracy}%</span>
                </div>
                <div className="breakdown-bar">
                  <div
                    className="breakdown-fill"
                    style={{ width: `${accuracy}%` }}
                  ></div>
                </div>
                <div className="breakdown-levels">
                  {subject === 'math' ? (
                    <>
                      <div className="level-item">
                        <span>Numbers:</span>
                        <span>{progress.numbers || 0}%</span>
                      </div>
                      <div className="level-item">
                        <span>Shapes:</span>
                        <span>{progress.shapes || 0}%</span>
                      </div>
                      <div className="level-item">
                        <span>Pahade:</span>
                        <span>{progress.pahade || 0}%</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="level-item">
                        <span>Alphabets:</span>
                        <span>{progress.alphabets || 0}%</span>
                      </div>
                      <div className="level-item">
                        <span>Words:</span>
                        <span>{progress.words || 0}%</span>
                      </div>
                      <div className="level-item">
                        <span>Sentences:</span>
                        <span>{progress.sentences || 0}%</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="action-buttons">
        <button
          className="delete-btn"
          onClick={() => {
            if (window.confirm(`Delete profile for ${child.name}?`)) {
              onDeleteChild(child.id)
            }
          }}
        >
          🗑️ Delete Profile
        </button>
      </div>
    </div>
  )
}

const ProgressReportTab = ({ child }) => {
  const progress = child.progress || {}

  return (
    <div className="progress-report-tab">
      <div className="report-header">
        <h2>Progress Report for {child.name}</h2>
        <div className="report-date">
          Last updated: {new Date(child.lastPractice || child.createdAt).toLocaleDateString()}
        </div>
      </div>

      <div className="report-content">
        {['hindi', 'english', 'marwadi', 'math'].map(subject => {
          const subjProgress = progress[subject] || {}
          const subjectNames = {
            hindi: 'हिंदी',
            english: 'English',
            marwadi: 'मारवाड़ी',
            math: 'Maths'
          }

          return (
            <div key={subject} className="report-section">
              <h3>{subjectNames[subject]}</h3>
              <div className="report-details">
                <div className="detail-item">
                  <span className="detail-label">Overall Accuracy:</span>
                  <span className="detail-value">{subjProgress.accuracy || 0}%</span>
                </div>
                {subject === 'math' ? (
                  <>
                    <div className="detail-item">
                      <span className="detail-label">Numbers:</span>
                      <span className="detail-value">{subjProgress.numbers || 0}%</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Shapes:</span>
                      <span className="detail-value">{subjProgress.shapes || 0}%</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Pahade:</span>
                      <span className="detail-value">{subjProgress.pahade || 0}%</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="detail-item">
                      <span className="detail-label">Alphabets:</span>
                      <span className="detail-value">{subjProgress.alphabets || 0}%</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Words:</span>
                      <span className="detail-value">{subjProgress.words || 0}%</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Sentences:</span>
                      <span className="detail-value">{subjProgress.sentences || 0}%</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <div className="report-summary">
        <h3>Summary</h3>
        <div className="summary-stats">
          <div className="summary-item">
            <span>Total Practice Time:</span>
            <strong>{Math.round((child.practiceTime || 0) / 60)} minutes</strong>
          </div>
          <div className="summary-item">
            <span>Current Streak:</span>
            <strong>{child.streak || 0} days</strong>
          </div>
          <div className="summary-item">
            <span>Badges Earned:</span>
            <strong>{child.badges?.length || 0}</strong>
          </div>
        </div>
      </div>
    </div>
  )
}

const SettingsTab = ({ settings, onTimeLimitChange, onToggleSound, onToggleMusic }) => {
  return (
    <div className="settings-tab">
      <h2>Settings</h2>
      
      <div className="settings-section">
        <h3>Time Limit</h3>
        <p>Daily practice time limit (minutes)</p>
        <div className="time-limit-controls">
          <input
            type="range"
            min="15"
            max="120"
            step="15"
            value={settings.timeLimit}
            onChange={(e) => onTimeLimitChange(parseInt(e.target.value))}
            className="time-slider"
          />
          <div className="time-display">{settings.timeLimit} minutes</div>
        </div>
      </div>

      <div className="settings-section">
        <h3>Sound Effects</h3>
        <div className="toggle-switch">
          <label>
            <input
              type="checkbox"
              checked={settings.soundEnabled}
              onChange={onToggleSound}
            />
            <span className="slider"></span>
          </label>
          <span className="toggle-label">
            {settings.soundEnabled ? 'Enabled' : 'Disabled'}
          </span>
        </div>
      </div>

      <div className="settings-section">
        <h3>Background Music</h3>
        <div className="toggle-switch">
          <label>
            <input
              type="checkbox"
              checked={settings.musicEnabled}
              onChange={onToggleMusic}
            />
            <span className="slider"></span>
          </label>
          <span className="toggle-label">
            {settings.musicEnabled ? 'Enabled' : 'Disabled'}
          </span>
        </div>
      </div>
    </div>
  )
}

const calculateOverallProgress = (child) => {
  const progress = child.progress || {}
  const subjects = ['hindi', 'english', 'marwadi', 'math']
  const total = subjects.reduce((sum, subject) => {
    return sum + (progress[subject]?.accuracy || 0)
  }, 0)
  return Math.round(total / subjects.length)
}

export default ParentPanel
