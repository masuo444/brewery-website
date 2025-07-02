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

// Environment variable for API key (NEVER commit this)
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
    console.error('❌ OPENAI_API_KEY environment variable is required');
    process.exit(1);
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

// Serve the website
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🌸 Sakura AI Server running on port ${PORT}`);
    console.log(`🔐 API proxy active with secure key management`);
});

module.exports = app;