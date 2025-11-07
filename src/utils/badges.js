// Badge system for gamification

export const checkAndAwardBadges = (child) => {
  const newBadges = []
  const existingBadgeIds = (child.badges || []).map(b => b.id)
  const progress = child.progress || {}

  // First Letter Badge
  if (!existingBadgeIds.includes('first-letter')) {
    const hasAnyProgress = Object.values(progress).some(subj => 
      subj.alphabets > 0 || subj.words > 0 || subj.sentences > 0
    )
    if (hasAnyProgress) {
      newBadges.push({
        id: 'first-letter',
        name: 'First Letter',
        icon: '🔤',
        description: 'Wrote your first letter!'
      })
    }
  }

  // Alphabet Master
  if (!existingBadgeIds.includes('alphabet-master')) {
    const allAlphabets = ['hindi', 'english', 'marwadi'].every(lang => 
      progress[lang]?.alphabets >= 80
    )
    if (allAlphabets) {
      newBadges.push({
        id: 'alphabet-master',
        name: 'Alphabet Master',
        icon: '⭐',
        description: 'Mastered all alphabets!'
      })
    }
  }

  // Word Wizard
  if (!existingBadgeIds.includes('word-wizard')) {
    const allWords = ['hindi', 'english', 'marwadi'].every(lang => 
      progress[lang]?.words >= 70
    )
    if (allWords) {
      newBadges.push({
        id: 'word-wizard',
        name: 'Word Wizard',
        icon: '📝',
        description: 'Learned all words!'
      })
    }
  }

  // Sentence Builder
  if (!existingBadgeIds.includes('sentence-builder')) {
    const allSentences = ['hindi', 'english', 'marwadi'].some(lang => 
      progress[lang]?.sentences >= 60
    )
    if (allSentences) {
      newBadges.push({
        id: 'sentence-builder',
        name: 'Sentence Builder',
        icon: '📖',
        description: 'Built your first sentence!'
      })
    }
  }

  // Streak Badges
  if (!existingBadgeIds.includes('streak-3') && child.streak >= 3) {
    newBadges.push({
      id: 'streak-3',
      name: '3 Day Streak',
      icon: '🔥',
      description: 'Practice for 3 days!'
    })
  }

  if (!existingBadgeIds.includes('streak-7') && child.streak >= 7) {
    newBadges.push({
      id: 'streak-7',
      name: 'Week Warrior',
      icon: '💪',
      description: '7 days of practice!'
    })
  }

  if (!existingBadgeIds.includes('streak-30') && child.streak >= 30) {
    newBadges.push({
      id: 'streak-30',
      name: 'Monthly Champion',
      icon: '🏆',
      description: '30 days of practice!'
    })
  }

  // Perfect Score
  if (!existingBadgeIds.includes('perfect-score')) {
    const hasPerfect = Object.values(progress).some(subj => 
      subj.accuracy >= 100
    )
    if (hasPerfect) {
      newBadges.push({
        id: 'perfect-score',
        name: 'Perfect Score',
        icon: '💯',
        description: 'Got 100% accuracy!'
      })
    }
  }

  // Multilingual
  if (!existingBadgeIds.includes('multilingual')) {
    const languages = ['hindi', 'english', 'marwadi']
    const allLanguages = languages.every(lang => 
      progress[lang]?.accuracy > 50
    )
    if (allLanguages) {
      newBadges.push({
        id: 'multilingual',
        name: 'Multilingual',
        icon: '🌍',
        description: 'Learned multiple languages!'
      })
    }
  }

  return newBadges
}

export const getBadgeIcon = (badgeId) => {
  const badges = {
    'first-letter': '🔤',
    'alphabet-master': '⭐',
    'word-wizard': '📝',
    'sentence-builder': '📖',
    'streak-3': '🔥',
    'streak-7': '💪',
    'streak-30': '🏆',
    'perfect-score': '💯',
    'multilingual': '🌍'
  }
  return badges[badgeId] || '🏅'
}
