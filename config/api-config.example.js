// API Configuration for Sakura AI Chat System
// 
// 🔐 IMPORTANT: OpenAI API Key Setup Required
// 
// To enable full GPT functionality:
// 1. Sign up at https://platform.openai.com/
// 2. Generate an API key
// 3. Copy this file to 'api-config.js'
// 4. Replace 'YOUR_OPENAI_API_KEY_HERE' with your actual API key
// 5. NEVER commit api-config.js to version control!

// ⚠️ SECURITY WARNING: 
// This file is safe to commit. Your actual API key should go in api-config.js
// which is ignored by git

document.addEventListener('DOMContentLoaded', () => {
    if (window.sakuraAI) {
        // Set your OpenAI API key here
        const OPENAI_API_KEY = 'YOUR_OPENAI_API_KEY_HERE';
        
        if (OPENAI_API_KEY && OPENAI_API_KEY !== 'YOUR_OPENAI_API_KEY_HERE') {
            window.sakuraAI.setApiKey(OPENAI_API_KEY);
            console.log('✅ GPT API integrated successfully');
            console.log('🌸 Sakura AI is now fully operational!');
        } else {
            console.log('⚠️ Running in demo mode - Set API key in config/api-config.js for full functionality');
            console.log('📝 Copy api-config.example.js to api-config.js and add your API key');
        }
    }
});

// Alternative: Server-side proxy configuration (recommended for production)
const API_CONFIG = {
    useProxy: false, // Set to true if using server-side proxy
    proxyUrl: '/api/chat', // Your server endpoint
    apiKey: 'YOUR_OPENAI_API_KEY_HERE', // Only for client-side (not recommended for production)
    model: 'gpt-4o-mini', // GPT model to use
    maxTokens: 500, // Maximum response length
    temperature: 0.7 // Response creativity (0.0 - 2.0)
};

// Export configuration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = API_CONFIG;
}