import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ChildProvider } from './context/ChildContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Learning from './pages/Learning'
import ParentPanel from './pages/ParentPanel'
import ProfileLogin from './pages/ProfileLogin'
import './App.css'

function App() {
  return (
    <ChildProvider>
      <Router>
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/learning" element={<Learning />} />
            <Route path="/parent" element={<ParentPanel />} />
            <Route path="/login" element={<ProfileLogin />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </ChildProvider>
  )
}

export default App
