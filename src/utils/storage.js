// Local storage utilities for offline capability

export const storage = {
  getChildren: () => {
    try {
      const data = localStorage.getItem('kids_learning_children')
      return data ? JSON.parse(data) : []
    } catch (error) {
      // Return empty array if loading fails
      return []
    }
  },

  saveChildren: (children) => {
    try {
      localStorage.setItem('kids_learning_children', JSON.stringify(children))
    } catch (error) {
      // Silently handle save errors
    }
  },

  getSettings: () => {
    try {
      const data = localStorage.getItem('kids_learning_settings')
      return data ? JSON.parse(data) : {
        timeLimit: 30, // minutes per day
        soundEnabled: true,
        musicEnabled: true,
        language: 'hindi'
      }
    } catch (error) {
      return {
        timeLimit: 30,
        soundEnabled: true,
        musicEnabled: true,
        language: 'hindi'
      }
    }
  },

  saveSettings: (settings) => {
    try {
      localStorage.setItem('kids_learning_settings', JSON.stringify(settings))
    } catch (error) {
      // Silently handle save errors
    }
  }
}
