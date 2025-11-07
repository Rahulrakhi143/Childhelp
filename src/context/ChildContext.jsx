import React, { createContext, useContext, useState, useEffect } from 'react'
import { storage } from '../utils/storage'
import { checkAndAwardBadges } from '../utils/badges'

const ChildContext = createContext()

export const useChild = () => {
  const context = useContext(ChildContext)
  if (!context) {
    throw new Error('useChild must be used within ChildProvider')
  }
  return context
}

export const ChildProvider = ({ children: providerChildren }) => {
  const [currentChild, setCurrentChild] = useState(null)
  const [children, setChildren] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load children from local storage
    const savedChildren = storage.getChildren()
    setChildren(savedChildren)
    
    // Load last active child
    const lastChildId = localStorage.getItem('lastActiveChild')
    if (lastChildId) {
      const child = savedChildren.find(c => c.id === lastChildId)
      if (child) {
        setCurrentChild(child)
      }
    }
    setIsLoading(false)
  }, [])

  const addChild = (childData) => {
    const newChild = {
      id: Date.now().toString(),
      ...childData,
      progress: {
        hindi: { alphabets: 0, words: 0, sentences: 0, accuracy: 0 },
        english: { alphabets: 0, words: 0, sentences: 0, accuracy: 0 },
        marwadi: { alphabets: 0, words: 0, sentences: 0, accuracy: 0 },
        math: { numbers: 0, shapes: 0, pahade: 0, accuracy: 0 }
      },
      badges: [],
      streak: 0,
      lastPractice: null,
      practiceTime: 0,
      createdAt: new Date().toISOString()
    }
    const updatedChildren = [...children, newChild]
    setChildren(updatedChildren)
    storage.saveChildren(updatedChildren)
    return newChild
  }

  const updateChild = (childId, updates) => {
    const updatedChildren = children.map(child =>
      child.id === childId ? { ...child, ...updates } : child
    )
    setChildren(updatedChildren)
    storage.saveChildren(updatedChildren)
    
    if (currentChild?.id === childId) {
      setCurrentChild(updatedChildren.find(c => c.id === childId))
    }
  }

  const updateProgress = (childId, subject, level, accuracy) => {
    const child = children.find(c => c.id === childId)
    if (!child) return

    const progress = { ...child.progress }
    if (progress[subject]) {
      progress[subject][level] = Math.max(progress[subject][level] || 0, accuracy)
      progress[subject].accuracy = Math.round(
        (progress[subject].accuracy * 0.7) + (accuracy * 0.3)
      )
    }

    // Update streak
    const today = new Date().toDateString()
    const lastPractice = new Date(child.lastPractice || 0).toDateString()
    let streak = child.streak || 0
    if (today === lastPractice) {
      // Same day, maintain streak
    } else if (new Date(today) - new Date(lastPractice) === 86400000) {
      // Consecutive day
      streak += 1
    } else {
      streak = 1
    }

    // Check for new badges
    const updatedChild = {
      ...child,
      progress,
      streak,
      lastPractice: new Date().toISOString(),
      practiceTime: (child.practiceTime || 0) + 5
    }
    const newBadges = checkAndAwardBadges(updatedChild)
    
    if (newBadges.length > 0) {
      updatedChild.badges = [...(child.badges || []), ...newBadges]
    }

    updateChild(childId, updatedChild)
  }

  const selectChild = (child) => {
    setCurrentChild(child)
    localStorage.setItem('lastActiveChild', child.id)
  }

  const deleteChild = (childId) => {
    const updatedChildren = children.filter(c => c.id !== childId)
    setChildren(updatedChildren)
    storage.saveChildren(updatedChildren)
    
    if (currentChild?.id === childId) {
      setCurrentChild(null)
      localStorage.removeItem('lastActiveChild')
    }
  }

  const value = {
    currentChild,
    children,
    isLoading,
    addChild,
    updateChild,
    updateProgress,
    selectChild,
    deleteChild
  }

  return <ChildContext.Provider value={value}>{providerChildren}</ChildContext.Provider>
}
