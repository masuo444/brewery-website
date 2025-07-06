// Environment Configuration for API Keys
// This file loads API keys from environment variables or configuration

(function() {
    'use strict';

    console.log('🔧 Loading API configuration...');

    // API Configuration with environment variable support
    window.API_CONFIG = {
        openai: {
            // Check for environment variables first, then fallback to hardcoded values
            apiKey: getEnvVar('OPENAI_API_KEY') || 'sk-proj-your-actual-openai-key-here',
            model: getEnvVar('OPENAI_MODEL') || 'gpt-3.5-turbo',
            endpoint: 'https://api.openai.com/v1/chat/completions',
            maxTokens: parseInt(getEnvVar('OPENAI_MAX_TOKENS')) || 500,
            temperature: parseFloat(getEnvVar('OPENAI_TEMPERATURE')) || 0.7
        },
        deepl: {
            apiKey: getEnvVar('DEEPL_API_KEY') || 'your-actual-deepl-key-here',
            endpoint: getEnvVar('DEEPL_ENDPOINT') || 'https://api-free.deepl.com/v2/translate'
        },
        settings: {
            timeout: parseInt(getEnvVar('API_TIMEOUT')) || 10000,
            retryCount: parseInt(getEnvVar('API_RETRY_COUNT')) || 3
        }
    };

    // Environment variable getter function
    function getEnvVar(name) {
        // In a browser environment, we can't directly access process.env
        // Instead, we'll check for window.ENV or localStorage
        if (typeof window !== 'undefined') {
            // Check window.ENV object (set by server)
            if (window.ENV && window.ENV[name]) {
                return window.ENV[name];
            }
            
            // Check localStorage for development
            const localStorageKey = `MASUMASU_${name}`;
            if (localStorage.getItem(localStorageKey)) {
                return localStorage.getItem(localStorageKey);
            }
        }
        
        // Check if running in Node.js environment
        if (typeof process !== 'undefined' && process.env) {
            return process.env[name];
        }
        
        return null;
    }

    // Check if we have real API keys
    function hasRealApiKeys() {
        const openaiKey = window.API_CONFIG.openai.apiKey;
        const deeplKey = window.API_CONFIG.deepl.apiKey;
        
        const hasOpenAI = openaiKey && 
                         openaiKey.startsWith('sk-') && 
                         !openaiKey.includes('your-actual') &&
                         openaiKey.length > 20;
                         
        const hasDeepL = deeplKey && 
                        !deeplKey.includes('your-actual') &&
                        deeplKey.length > 10;
        
        return { openai: hasOpenAI, deepl: hasDeepL };
    }

    // Set API keys from provided values (for development)
    function setApiKeys(openaiKey, deeplKey) {
        if (openaiKey) {
            localStorage.setItem('MASUMASU_OPENAI_API_KEY', openaiKey);
            window.API_CONFIG.openai.apiKey = openaiKey;
        }
        if (deeplKey) {
            localStorage.setItem('MASUMASU_DEEPL_API_KEY', deeplKey);
            window.API_CONFIG.deepl.apiKey = deeplKey;
        }
        console.log('🔑 API keys updated');
    }

    // Expose utility functions globally
    window.setApiKeys = setApiKeys;
    window.hasRealApiKeys = hasRealApiKeys;

    // Initialize and report status
    const apiStatus = hasRealApiKeys();
    console.log('🔑 API Status:', apiStatus);
    
    if (!apiStatus.openai && !apiStatus.deepl) {
        console.log('🔧 Demo mode: Add your API keys by calling setApiKeys("your-openai-key", "your-deepl-key")');
    }

    console.log('✅ API configuration loaded');

})();