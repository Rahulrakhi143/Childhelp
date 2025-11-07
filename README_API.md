# AI Content Generation API Setup

The Kids Learning AI platform now supports **automatic AI-generated content** using API integration.

## Features

✅ **Auto-generated learning content** - Content is dynamically created using AI  
✅ **Smart caching** - Content is cached for 24 hours to reduce API calls  
✅ **Fallback support** - Uses local content if API fails  
✅ **Loading states** - Beautiful loading animations while content generates  
✅ **Local persistence** - Cached content saved to browser storage  

## Setup Instructions

### Option 1: Using OpenAI API (Recommended)

1. Create a `.env` file in the project root:
```env
VITE_AI_API_KEY=your_openai_api_key_here
VITE_AI_API_URL=https://api.openai.com/v1
```

2. Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)

3. Restart the development server

### Option 2: Using Other AI Providers

You can modify `src/utils/aiContentApi.js` to use:
- Google Gemini API
- Anthropic Claude API
- Azure OpenAI
- Custom AI service

### Option 3: Local Simulation (No API Key Required)

If no API key is configured, the system will:
- Use intelligent local content generation
- Provide educational content based on patterns
- Still cache content for performance

## How It Works

1. **User selects** language, subject, and level
2. **System checks cache** - If content exists and is fresh, uses it immediately
3. **If not cached** - Calls AI API to generate personalized content
4. **Content is cached** - Saved for 24 hours to avoid repeated API calls
5. **Fallback** - If API fails, uses local fallback content

## API Configuration

### Environment Variables

```env
# Required for OpenAI
VITE_AI_API_KEY=sk-...
VITE_AI_API_URL=https://api.openai.com/v1

# Optional: Custom API endpoint
# VITE_AI_API_URL=https://your-custom-api.com/v1
```

### Customizing the AI Prompt

Edit `src/utils/aiContentApi.js` → `generatePrompt()` function to customize:
- Content style
- Number of items
- Difficulty level
- Language-specific instructions

## Cache Management

### View Cache Statistics
```javascript
import { getCacheStats } from './utils/aiContentApi'
console.log(getCacheStats())
```

### Clear Cache
```javascript
import { clearContentCache } from './utils/aiContentApi'
clearContentCache()
```

Or manually clear browser localStorage:
- Open DevTools (F12)
- Application → Local Storage
- Delete `ai_content_cache`

## Cost Optimization

1. **Smart Caching** - Content cached for 24 hours
2. **Local Fallback** - Uses local content if API fails
3. **Batch Generation** - Generate once per language/subject/level combination
4. **Cache Persistence** - Survives browser refresh

## Testing

1. **Without API Key**: System uses local simulation
2. **With API Key**: System generates real AI content
3. **Check Console**: Logs show which content source is used

## Troubleshooting

### API Not Working?
- Check API key in `.env` file
- Verify API URL is correct
- Check browser console for errors
- System will automatically fallback to local content

### Content Not Loading?
- Check browser console for debug logs
- Verify network connection
- Clear cache if needed
- Check API rate limits

## Support

For issues or questions:
1. Check browser console for error messages
2. Verify API key is correct
3. Test with local simulation first
4. Check API provider documentation
