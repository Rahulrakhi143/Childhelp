// AI-powered evaluation utilities for handwriting and speech with comprehensive feedback

// Enhanced handwriting evaluation with AI-generated feedback
export const evaluateHandwriting = async (imageData, target, language, subject, level) => {
  // Simulate API call delay for realistic experience
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Basic validation - check if something was drawn
  if (!imageData || imageData.length < 100) {
    return {
      correct: false,
      message: getErrorMessage(language, 'empty'),
      hint: getHint(language, target, 'draw_first'),
      accuracy: 0
    }
  }

  // Simulate AI evaluation - in production, this would use ML models or APIs like:
  // - Google Cloud Vision API
  // - Azure Computer Vision
  // - Custom ML model trained on children's handwriting
  
  // For demo: randomly pass 70% of attempts (simulating learning curve)
  // In production, actual ML model would analyze:
  // - Stroke direction and order
  // - Shape accuracy
  // - Proportions and spacing
  // - Letter formation quality
  
  const isCorrect = Math.random() > 0.3

  if (isCorrect) {
    const accuracy = 85 + Math.floor(Math.random() * 15) // 85-100%
    
    return {
      correct: true,
      message: getSuccessMessage(language, accuracy),
      accuracy: accuracy,
      feedback: getDetailedFeedback(language, 'correct', target)
    }
  } else {
    const accuracy = 40 + Math.floor(Math.random() * 40) // 40-80%
    
    return {
      correct: false,
      message: getErrorMessage(language, 'incorrect'),
      hint: getHint(language, target, 'improve'),
      accuracy: accuracy,
      feedback: getDetailedFeedback(language, 'incorrect', target)
    }
  }
}

// Enhanced speech evaluation with AI-generated feedback
export const evaluateSpeech = async (transcript, target, language) => {
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 500))

  // Normalize comparison (case-insensitive, remove spaces, handle accents)
  const normalizedTranscript = transcript.trim().toUpperCase().replace(/\s+/g, '').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  const normalizedTarget = target.trim().toUpperCase().replace(/\s+/g, '').normalize('NFD').replace(/[\u0300-\u036f]/g, '')

  // Check for exact match
  const isExactMatch = normalizedTranscript === normalizedTarget
  
  // Calculate similarity using advanced algorithm
  const similarity = calculateSimilarity(normalizedTranscript, normalizedTarget)
  const isCorrect = isExactMatch || similarity > 0.7

  // In production, this would use:
  // - Google Cloud Speech-to-Text API with pronunciation scoring
  // - Azure Speech Services
  // - Custom ML model for accent detection and pronunciation evaluation

  if (isCorrect) {
    const accuracy = similarity === 1 ? 100 : Math.round(90 + (similarity * 10))
    
    return {
      correct: true,
      message: getSuccessMessage(language, accuracy),
      accuracy: accuracy,
      feedback: getDetailedFeedback(language, 'correct', target),
      similarity: similarity
    }
  } else {
    const accuracy = Math.round(similarity * 100)
    
    return {
      correct: false,
      message: getErrorMessage(language, 'incorrect'),
      hint: getPronunciationHint(language, target, transcript),
      accuracy: accuracy,
      feedback: getDetailedFeedback(language, 'incorrect', target),
      similarity: similarity,
      suggestion: getPronunciationSuggestion(language, target)
    }
  }
}

// Advanced similarity calculation using multiple algorithms
const calculateSimilarity = (str1, str2) => {
  if (str1 === str2) return 1.0
  
  const longer = str1.length > str2.length ? str1 : str2
  const shorter = str1.length > str2.length ? str2 : str1
  
  if (longer.length === 0) return 1.0
  
  // Levenshtein distance
  const distance = levenshteinDistance(longer, shorter)
  const levenshteinSimilarity = (longer.length - distance) / longer.length
  
  // Character frequency similarity
  const freqSimilarity = calculateFrequencySimilarity(str1, str2)
  
  // Common substring similarity
  const substringSimilarity = calculateSubstringSimilarity(str1, str2)
  
  // Weighted average
  return (levenshteinSimilarity * 0.5 + freqSimilarity * 0.3 + substringSimilarity * 0.2)
}

const levenshteinDistance = (str1, str2) => {
  const matrix = []
  
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i]
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j
  }
  
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1]
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        )
      }
    }
  }
  
  return matrix[str2.length][str1.length]
}

const calculateFrequencySimilarity = (str1, str2) => {
  const freq1 = getCharFrequency(str1)
  const freq2 = getCharFrequency(str2)
  
  const allChars = new Set([...Object.keys(freq1), ...Object.keys(freq2)])
  let totalDiff = 0
  let totalChars = 0
  
  for (const char of allChars) {
    const count1 = freq1[char] || 0
    const count2 = freq2[char] || 0
    totalDiff += Math.abs(count1 - count2)
    totalChars += Math.max(count1, count2)
  }
  
  return totalChars === 0 ? 1 : 1 - (totalDiff / totalChars)
}

const getCharFrequency = (str) => {
  const freq = {}
  for (const char of str) {
    freq[char] = (freq[char] || 0) + 1
  }
  return freq
}

const calculateSubstringSimilarity = (str1, str2) => {
  const longer = str1.length > str2.length ? str1 : str2
  const shorter = str1.length > str2.length ? str2 : str1
  
  let maxCommonLength = 0
  
  for (let i = 0; i <= shorter.length; i++) {
    for (let j = i + 1; j <= shorter.length; j++) {
      const substring = shorter.substring(i, j)
      if (longer.includes(substring)) {
        maxCommonLength = Math.max(maxCommonLength, substring.length)
      }
    }
  }
  
  return longer.length === 0 ? 1 : maxCommonLength / longer.length
}

// AI-generated success messages in multiple languages
const getSuccessMessage = (language, accuracy) => {
  const messages = {
    hindi: [
      `बहुत अच्छा! ${accuracy}% सही! 🎉`,
      `शाबाश! तुमने ${accuracy}% सही किया! 🌟`,
      `बेहतरीन! ${accuracy}% सटीक! ⭐`,
      `वाह! तुम बहुत अच्छे हो! ${accuracy}% 🎊`,
      `अद्भुत! ${accuracy}% सही! 🏆`
    ],
    english: [
      `Excellent! ${accuracy}% correct! 🎉`,
      `Well done! You got ${accuracy}% right! 🌟`,
      `Perfect! ${accuracy}% accurate! ⭐`,
      `Wonderful! Great job! ${accuracy}% 🎊`,
      `Amazing! ${accuracy}% correct! 🏆`
    ],
    marwadi: [
      `बहुत सारो! ${accuracy}% सही! 🎉`,
      `शाबाश! ${accuracy}% सही किया! 🌟`,
      `बेहतरीन! ${accuracy}% सटीक! ⭐`,
      `वाह! ${accuracy}% 🎊`,
      `अद्भुत! ${accuracy}% सही! 🏆`
    ]
  }
  
  const langMessages = messages[language] || messages.english
  return langMessages[Math.floor(Math.random() * langMessages.length)]
}

// AI-generated error messages with encouragement
const getErrorMessage = (language, type) => {
  const messages = {
    hindi: {
      empty: [
        'कृपया कुछ लिखें!',
        'पहले कुछ बनाएं!',
        'कैनवास पर कुछ ड्रॉ करें!'
      ],
      incorrect: [
        'यह गलत है, फिर से कोशिश करो!',
        'लगभग सही था, एक बार और कोशिश करो!',
        'यह सही नहीं है, फिर से कोशिश करो!',
        'तुम कर सकते हो! फिर से कोशिश करो!'
      ]
    },
    english: {
      empty: [
        'Please draw something!',
        'Try drawing first!',
        'Draw on the canvas!'
      ],
      incorrect: [
        'Not quite right, try again!',
        'Almost there! Give it another try!',
        'Not correct, try once more!',
        'You can do it! Try again!'
      ]
    },
    marwadi: {
      empty: [
        'कृपया कुछ लिखें!',
        'पहले कुछ बनाएं!',
        'कैनवास पर कुछ ड्रॉ करें!'
      ],
      incorrect: [
        'यो गलत है, फिर से कोशिश करो!',
        'लगभग सही था, एक बार और कोशिश करो!',
        'यह सही नहीं है, फिर से कोशिश करो!',
        'तुम कर सकते हो! फिर से कोशिश करो!'
      ]
    }
  }
  
  const langMessages = messages[language] || messages.english
  const typeMessages = langMessages[type] || langMessages.incorrect
  return typeMessages[Math.floor(Math.random() * typeMessages.length)]
}

// AI-generated hints
const getHint = (language, target, type) => {
  const hints = {
    hindi: {
      draw_first: 'कैनवास पर अपनी उंगली से लिखें।',
      improve: `'${target}' को ध्यान से देखें और उसी तरह लिखने की कोशिश करें।`,
      shape: `'${target}' का आकार याद रखें और उसी तरह बनाएं।`
    },
    english: {
      draw_first: 'Draw on the canvas with your finger.',
      improve: `Look carefully at '${target}' and try to write it the same way.`,
      shape: `Remember the shape of '${target}' and draw it the same way.`
    },
    marwadi: {
      draw_first: 'कैनवास पर अपनी उंगली से लिखें।',
      improve: `'${target}' को ध्यान से देखें और उसी तरह लिखने की कोशिश करें।`,
      shape: `'${target}' का आकार याद रखें और उसी तरह बनाएं।`
    }
  }
  
  const langHints = hints[language] || hints.english
  return langHints[type] || langHints.improve
}

// AI-generated pronunciation hints
const getPronunciationHint = (language, target, attempt) => {
  const hints = {
    hindi: [
      `'${target}' को धीरे-धीरे और स्पष्ट रूप से बोलें।`,
      `'${target}' के उच्चारण पर ध्यान दें।`,
      `सुनें और फिर से बोलें: '${target}'`
    ],
    english: [
      `Pronounce '${target}' slowly and clearly.`,
      `Focus on the pronunciation of '${target}'.`,
      `Listen and repeat: '${target}'`
    ],
    marwadi: [
      `'${target}' को धीरे-धीरे और स्पष्ट रूप से बोलें।`,
      `'${target}' के उच्चारण पर ध्यान दें।`,
      `सुनें और फिर से बोलें: '${target}'`
    ]
  }
  
  const langHints = hints[language] || hints.english
  return langHints[Math.floor(Math.random() * langHints.length)]
}

const getPronunciationSuggestion = (language, target) => {
  const suggestions = {
    hindi: `'${target}' को इस तरह बोलें: धीरे-धीरे और स्पष्ट रूप से।`,
    english: `Pronounce '${target}' like this: slowly and clearly.`,
    marwadi: `'${target}' को इस तरह बोलें: धीरे-धीरे और स्पष्ट रूप से।`
  }
  
  return suggestions[language] || suggestions.english
}

// Detailed feedback for learning improvement
const getDetailedFeedback = (language, type, target) => {
  const feedback = {
    hindi: {
      correct: [
        `तुमने '${target}' बहुत अच्छी तरह से लिखा/बोला!`,
        `'${target}' सही है! तुम बहुत अच्छे हो!`,
        `बहुत बढ़िया! '${target}' सही तरीके से लिखा/बोला गया!`
      ],
      incorrect: [
        `'${target}' को फिर से देखें और कोशिश करें।`,
        `'${target}' का अभ्यास करें, तुम कर सकते हो!`,
        `'${target}' को ध्यान से देखें और फिर से कोशिश करें।`
      ]
    },
    english: {
      correct: [
        `You wrote/spoke '${target}' very well!`,
        `'${target}' is correct! You are doing great!`,
        `Excellent! '${target}' was written/spoken correctly!`
      ],
      incorrect: [
        `Look at '${target}' again and try.`,
        `Practice '${target}', you can do it!`,
        `Look carefully at '${target}' and try again.`
      ]
    },
    marwadi: {
      correct: [
        `तुमने '${target}' बहुत अच्छी तरह से लिखा/बोला!`,
        `'${target}' सही है! तुम बहुत अच्छे हो!`,
        `बहुत बढ़िया! '${target}' सही तरीके से लिखा/बोला गया!`
      ],
      incorrect: [
        `'${target}' को फिर से देखें और कोशिश करें।`,
        `'${target}' का अभ्यास करें, तुम कर सकते हो!`,
        `'${target}' को ध्यान से देखें और फिर से कोशिश करें।`
      ]
    }
  }
  
  const langFeedback = feedback[language] || feedback.english
  const typeFeedback = langFeedback[type] || langFeedback.correct
  return typeFeedback[Math.floor(Math.random() * typeFeedback.length)]
}