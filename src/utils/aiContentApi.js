// AI Content Generation API Service
// This integrates with AI APIs to auto-generate learning content

const API_BASE_URL = import.meta.env.VITE_AI_API_URL || 'https://api.openai.com/v1'
const API_KEY = import.meta.env.VITE_AI_API_KEY || ''

// Cache for generated content to avoid repeated API calls
const contentCache = new Map()

// Generate cache key from parameters
const getCacheKey = (language, subject, level) => {
  return `${language}-${subject}-${level}`
}

// Check if content exists in cache
const getCachedContent = (language, subject, level) => {
  const key = getCacheKey(language, subject, level)
  const cached = contentCache.get(key)
  if (cached && Date.now() - cached.timestamp < 24 * 60 * 60 * 1000) {
    // Cache valid for 24 hours
    return cached.content
  }
  return null
}

// Store content in cache
const setCachedContent = (language, subject, level, content) => {
  const key = getCacheKey(language, subject, level)
  contentCache.set(key, {
    content,
    timestamp: Date.now()
  })
  
  // Also save to localStorage for persistence
  try {
    const cacheData = JSON.parse(localStorage.getItem('ai_content_cache') || '{}')
    cacheData[key] = {
      content,
      timestamp: Date.now()
    }
    localStorage.setItem('ai_content_cache', JSON.stringify(cacheData))
  } catch (error) {
    // Silently handle localStorage save errors
  }
}

// Load cache from localStorage on init
const loadCacheFromStorage = () => {
  try {
    const cacheData = JSON.parse(localStorage.getItem('ai_content_cache') || '{}')
    const now = Date.now()
    Object.entries(cacheData).forEach(([key, value]) => {
      if (value.timestamp && now - value.timestamp < 24 * 60 * 60 * 1000) {
        contentCache.set(key, value)
      }
    })
  } catch (error) {
    // Silently handle localStorage load errors
  }
}

// Initialize cache from storage
loadCacheFromStorage()

// Generate AI prompt for content creation
const generatePrompt = (language, subject, level) => {
  const languageNames = {
    hindi: 'Hindi',
    english: 'English',
    marwadi: 'Marwadi'
  }

  const levelNames = {
    alphabets: 'alphabets/letters',
    words: 'simple words',
    sentences: 'basic sentences',
    numbers: 'numbers',
    shapes: 'geometric shapes'
  }

  const langName = languageNames[language] || language
  const levelName = levelNames[level] || level

  return `Generate educational content for children aged 3-7 learning ${langName} ${subject}. 

Create a list of ${levelName} appropriate for young children. Each item should have:
1. A target (the letter/word/sentence/number/shape to learn)
2. A helpful hint in both ${langName} and English

Return ONLY a valid JSON array with this exact format:
[
  { "target": "...", "hint": "..." },
  { "target": "...", "hint": "..." }
]

Generate 10-15 items. Make them fun, educational, and age-appropriate.`
}

// Call AI API to generate content
const generateContentWithAI = async (language, subject, level) => {
  try {
    // Check cache first
    const cached = getCachedContent(language, subject, level)
    if (cached) {
      return cached
    }

    // If no API key, use fallback
    if (!API_KEY) {
      return null
    }

    const prompt = generatePrompt(language, subject, level)

    // Using OpenAI API (can be changed to other providers)
    const response = await fetch(`${API_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are an expert educational content creator for children aged 3-7. Always return valid JSON arrays only.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    const contentText = data.choices[0]?.message?.content || '[]'
    
    // Parse JSON from response
    let content
    try {
      // Remove markdown code blocks if present
      const cleanedText = contentText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      content = JSON.parse(cleanedText)
    } catch (parseError) {
      // Silently return null to use fallback content
      return null
    }

    // Validate content structure
    if (!Array.isArray(content) || content.length === 0) {
      return null
    }

    // Ensure all items have required fields
    const validContent = content
      .filter(item => item.target && item.hint)
      .slice(0, 15) // Limit to 15 items

    // Cache the generated content
    setCachedContent(language, subject, level, validContent)

    return validContent

  } catch (error) {
    // Silently return null to use fallback content
    return null
  }
}

// Alternative: Use local AI simulation (for demo/testing without API)
const generateContentWithLocalAI = async (language, subject, level) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))

  // Generate basic content patterns based on type
  const generatePattern = (type, count) => {
    const patterns = {
      alphabets: {
        hindi: ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ए', 'ऐ', 'ओ', 'औ'],
        english: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
        marwadi: ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ए', 'ऐ', 'ओ', 'औ']
      },
      words: {
        hindi: ['अम', 'आम', 'इनाम', 'उमंग', 'एक', 'ओर', 'और'],
        english: ['CAT', 'DOG', 'BALL', 'HAT', 'SUN', 'MOON', 'STAR'],
        marwadi: ['राम', 'काम', 'आम', 'पानी', 'रोटी', 'घर']
      },
      sentences: {
        hindi: ['अम खाओ', 'एक आम', 'मैं पढ़ता हूं', 'पानी पीओ'],
        english: ['I AM HAPPY', 'THE CAT SAT', 'I LOVE YOU', 'SUN IS HOT'],
        marwadi: ['कैसे हो?', 'मैं ठीक हूं', 'तुम कहाँ हो?', 'मैं यहाँ हूं']
      },
      numbers: {
        english: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
      },
      shapes: {
        english: ['○', '□', '△', '◇', '★', '♥']
      }
    }

    const langPatterns = patterns[type]?.[language] || []
    return langPatterns.slice(0, count).map(target => ({
      target,
      hint: `Learn ${target} - Practice this ${type === 'alphabets' ? 'letter' : type === 'words' ? 'word' : type === 'sentences' ? 'sentence' : type === 'numbers' ? 'number' : 'shape'}`
    }))
  }

  const content = generatePattern(level, 10)
  setCachedContent(language, subject, level, content)
  return content
}

// Main function to get AI-generated content
export const getAIGeneratedContent = async (language, subject, level) => {
  // Check cache first
  const cached = getCachedContent(language, subject, level)
  if (cached) {
    return cached
  }

  // Try AI API if configured
  if (API_KEY) {
    const aiContent = await generateContentWithAI(language, subject, level)
    if (aiContent) {
      return aiContent
    }
  }

  // Fallback to local AI simulation (for demo)
  return await generateContentWithLocalAI(language, subject, level)
}

// Clear cache (useful for testing or forcing regeneration)
export const clearContentCache = () => {
  contentCache.clear()
  try {
    localStorage.removeItem('ai_content_cache')
  } catch (error) {
    // Silently handle cache clear errors
  }
}

// Get cache statistics
export const getCacheStats = () => {
  return {
    cachedItems: contentCache.size,
    cacheKeys: Array.from(contentCache.keys())
  }
}
