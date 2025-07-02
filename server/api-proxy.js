// Server-side API Proxy for secure OpenAI integration
// Node.js + Express implementation

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3003;

// Rate limiting
const rateLimit = require('express-rate-limit');

// Configure rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});

// CORS configuration
const corsOptions = {
    origin: process.env.NODE_ENV === 'production' 
        ? ['https://your-domain.com', 'https://your-username.github.io']
        : ['http://localhost:3003', 'http://127.0.0.1:3003'],
    optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(limiter);
app.use(express.static(path.join(__dirname, '..')));

// Environment variables for API keys (NEVER commit these)
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const DEEPL_API_KEY = process.env.DEEPL_API_KEY;
const DEEPL_API_URL = process.env.DEEPL_API_URL || 'https://api-free.deepl.com/v2/translate';

if (!OPENAI_API_KEY) {
    console.error('❌ OPENAI_API_KEY environment variable is required');
    process.exit(1);
}

if (!DEEPL_API_KEY) {
    console.error('⚠️ DEEPL_API_KEY environment variable is not set - translation features will be disabled');
}

// API Proxy endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { messages, model = 'gpt-4o-mini', max_tokens = 500 } = req.body;

        // Basic validation
        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ error: 'Invalid messages format' });
        }

        // Rate limiting check (simple implementation)
        const userIP = req.ip;
        // TODO: Implement proper rate limiting here

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model,
                messages,
                max_tokens,
                temperature: 0.7,
                presence_penalty: 0.1,
                frequency_penalty: 0.1
            })
        });

        if (!response.ok) {
            console.error('OpenAI API error:', response.status);
            return res.status(500).json({ error: 'AI service temporarily unavailable' });
        }

        const data = await response.json();
        res.json(data);

    } catch (error) {
        console.error('Proxy error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// DeepL Translation API Proxy endpoint
app.post('/api/translate', async (req, res) => {
    try {
        if (!DEEPL_API_KEY) {
            return res.status(503).json({ error: 'Translation service not configured' });
        }

        const { text, target_lang, source_lang = 'JA' } = req.body;

        // Basic validation
        if (!text || !target_lang) {
            return res.status(400).json({ error: 'Text and target_lang are required' });
        }

        // Validate target language
        const supportedLanguages = ['EN-US', 'FR', 'ZH', 'KO', 'IT', 'ES', 'VI', 'JA'];
        if (!supportedLanguages.includes(target_lang.toUpperCase())) {
            return res.status(400).json({ error: 'Unsupported target language' });
        }

        const formData = new URLSearchParams();
        formData.append('text', text);
        formData.append('target_lang', target_lang.toUpperCase());
        
        if (source_lang !== target_lang) {
            formData.append('source_lang', source_lang.toUpperCase());
        }

        const response = await fetch(DEEPL_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `DeepL-Auth-Key ${DEEPL_API_KEY}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData
        });

        if (!response.ok) {
            console.error('DeepL API error:', response.status, await response.text());
            return res.status(500).json({ error: 'Translation service temporarily unavailable' });
        }

        const data = await response.json();
        res.json(data);

    } catch (error) {
        console.error('Translation proxy error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Serve the website
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🌸 Sakura AI Server running on port ${PORT}`);
    console.log(`🔐 API proxy active with secure key management`);
    console.log(`🌍 Translation service: ${DEEPL_API_KEY ? '✅ DeepL API configured' : '❌ DeepL API not configured'}`);
    console.log(`📱 Visit: http://localhost:${PORT}`);
});

module.exports = app;