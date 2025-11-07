import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useChild } from '../context/ChildContext'
import './Navbar.css'

const Navbar = () => {
  const location = useLocation()
  const { currentChild } = useChild()

  const isActive = (path) => location.pathname === path

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🎓</span>
          <span className="logo-text">Kids Learning AI</span>
        </Link>
        
        <div className="navbar-links">
          <Link 
            to="/" 
            className={`navbar-link ${isActive('/') ? 'active' : ''}`}
          >
            🏠 Home
          </Link>
          <Link 
            to="/learning" 
            className={`navbar-link ${isActive('/learning') ? 'active' : ''}`}
          >
            📚 Learning
          </Link>
          <Link 
            to="/parent" 
            className={`navbar-link ${isActive('/parent') ? 'active' : ''}`}
          >
            👨‍👩‍👧 Parent Panel
          </Link>
        </div>

        {currentChild && (
          <div className="navbar-profile">
            <div className="profile-avatar">
              {currentChild.avatar || '👶'}
            </div>
            <span className="profile-name">{currentChild.name}</span>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
