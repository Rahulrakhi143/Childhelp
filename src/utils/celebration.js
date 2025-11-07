// Celebration animations and effects
export const triggerCelebration = () => {
  // Dynamically import confetti
  import('canvas-confetti').then((confettiModule) => {
    const confetti = confettiModule.default
    // Confetti effect
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    })

    // Additional burst after delay
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      })
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      })
    }, 250)
  })

  // Play success sound (if available)
  playSuccessSound()
}

const playSuccessSound = () => {
  // Create a simple beep sound using Web Audio API
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.value = 800
    oscillator.type = 'sine'

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.5)
  } catch (error) {
    // Silently handle audio errors
  }
}

export const createBalloons = () => {
  const colors = ['#FF6B9D', '#4ECDC4', '#FFE66D', '#95E1D3']
  const balloons = []

  for (let i = 0; i < 10; i++) {
    const balloon = document.createElement('div')
    balloon.className = 'balloon'
    balloon.textContent = '🎈'
    balloon.style.left = `${Math.random() * 100}%`
    balloon.style.animationDelay = `${Math.random() * 2}s`
    balloon.style.color = colors[Math.floor(Math.random() * colors.length)]
    document.body.appendChild(balloon)
    
    balloons.push(balloon)
    
    setTimeout(() => {
      balloon.remove()
    }, 4000)
  }

  return balloons
}
