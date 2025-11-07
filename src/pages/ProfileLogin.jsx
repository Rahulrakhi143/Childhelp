import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useChild } from '../context/ChildContext'
import './ProfileLogin.css'

const avatars = [
  '👶', '🐼', '🐰', '🐤', '🐶', '🐵', '🦊', '🐻', 
  '🐸', '🦁', '🐯', '🐨', '🐭', '🐹', '🐷', '🦄'
]

const ProfileLogin = () => {
  const navigate = useNavigate()
  const { children, addChild, selectChild } = useChild()
  const [showAddForm, setShowAddForm] = useState(false)
  const [newChildName, setNewChildName] = useState('')
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0])

  const handleSelectChild = (child) => {
    selectChild(child)
    navigate('/')
  }

  const handleAddChild = (e) => {
    e.preventDefault()
    if (newChildName.trim()) {
      const newChild = addChild({
        name: newChildName.trim(),
        avatar: selectedAvatar,
        photo: null
      })
      selectChild(newChild)
      setShowAddForm(false)
      setNewChildName('')
      navigate('/')
    }
  }

  return (
    <div className="profile-login">
      <div className="profile-login-container">
        <h1 className="login-title">👋 Who's Learning Today?</h1>
        
        {children.length > 0 && (
          <div className="existing-profiles">
            <h2>Select Your Profile</h2>
            <div className="profile-grid">
              {children.map(child => (
                <button
                  key={child.id}
                  className="profile-card"
                  onClick={() => handleSelectChild(child)}
                >
                  <div className="profile-card-avatar">{child.avatar}</div>
                  <div className="profile-card-name">{child.name}</div>
                  {child.streak > 0 && (
                    <div className="profile-card-streak">🔥 {child.streak} days</div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="add-profile-section">
          {!showAddForm ? (
            <button
              className="add-profile-btn"
              onClick={() => setShowAddForm(true)}
            >
              ➕ Add New Child
            </button>
          ) : (
            <form className="add-profile-form" onSubmit={handleAddChild}>
              <h2>Create New Profile</h2>
              <input
                type="text"
                placeholder="Enter child's name"
                value={newChildName}
                onChange={(e) => setNewChildName(e.target.value)}
                className="name-input"
                autoFocus
                maxLength={20}
              />
              <div className="avatar-selection">
                <h3>Choose an Avatar</h3>
                <div className="avatar-grid">
                  {avatars.map((avatar, index) => (
                    <button
                      key={`avatar-${index}`}
                      type="button"
                      className={`avatar-option ${selectedAvatar === avatar ? 'selected' : ''}`}
                      onClick={() => setSelectedAvatar(avatar)}
                    >
                      {avatar}
                    </button>
                  ))}
                </div>
              </div>
              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  Create Profile
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => {
                    setShowAddForm(false)
                    setNewChildName('')
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfileLogin
