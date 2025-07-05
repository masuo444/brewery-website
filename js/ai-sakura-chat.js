// AI Sakura Chatbot with GPT and DeepL API Integration
(function() {
    'use strict';

    // Configuration - Replace with your actual API keys
    const CONFIG = {
        openai: {
            apiKey: 'YOUR_OPENAI_API_KEY', // OpenAI APIキーをここに入力
            model: 'gpt-3.5-turbo',
            apiUrl: 'https://api.openai.com/v1/chat/completions'
        },
        deepl: {
            apiKey: 'YOUR_DEEPL_API_KEY', // DeepL APIキーをここに入力
            apiUrl: 'https://api-free.deepl.com/v2/translate' // Free版の場合
            // apiUrl: 'https://api.deepl.com/v2/translate' // Pro版の場合
        }
    };

    // Chatbot state
    let chatState = {
        isOpen: false,
        messages: [],
        currentLanguage: 'ja',
        context: {
            brewery: '益々酒造',
            products: ['純米吟醸「益々」', 'スパークリング清酒', '古酒「益々」', '本醸造「益々」', '梅酒「益々」'],
            specialties: '300年の歴史を持つ伝統的な日本酒醸造'
        }
    };

    // Initialize chatbot
    function initializeChatbot() {
        createChatbotUI();
        setupEventListeners();
        addInitialMessage();
    }

    // Create chatbot UI
    function createChatbotUI() {
        const chatbotHTML = `
            <div id="ai-sakura-chat" class="ai-sakura-chat-container" style="display: none;">
                <div class="ai-chat-header">
                    <div class="ai-chat-header-content">
                        <div class="ai-chat-avatar">🌸</div>
                        <div class="ai-chat-title">
                            <h3>AIサクラ - 日本酒コンシェルジュ</h3>
                            <p class="ai-chat-subtitle">益々酒造の専属AI杜氏</p>
                        </div>
                    </div>
                    <button class="ai-chat-close" onclick="closeSakuraChat()">✕</button>
                </div>
                
                <div class="ai-chat-language-selector">
                    <select id="ai-language-select" onchange="changeAILanguage(this.value)">
                        <option value="ja">日本語</option>
                        <option value="en">English</option>
                        <option value="zh">中文</option>
                        <option value="ko">한국어</option>
                        <option value="fr">Français</option>
                        <option value="es">Español</option>
                        <option value="de">Deutsch</option>
                        <option value="it">Italiano</option>
                        <option value="pt">Português</option>
                        <option value="ru">Русский</option>
                    </select>
                </div>
                
                <div class="ai-chat-messages" id="ai-chat-messages">
                    <!-- Messages will be added here -->
                </div>
                
                <div class="ai-chat-suggestions">
                    <button class="suggestion-btn" onclick="sendSuggestion('おすすめの日本酒を教えて')">おすすめの日本酒</button>
                    <button class="suggestion-btn" onclick="sendSuggestion('日本酒の飲み方を教えて')">飲み方のコツ</button>
                    <button class="suggestion-btn" onclick="sendSuggestion('料理との相性')">ペアリング</button>
                </div>
                
                <div class="ai-chat-input-container">
                    <input type="text" id="ai-chat-input" placeholder="メッセージを入力..." 
                           onkeypress="handleChatKeypress(event)">
                    <button class="ai-chat-send" onclick="sendChatMessage()">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M22 2L11 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>
        `;

        // Add CSS styles
        const styles = `
            <style>
            .ai-sakura-chat-container {
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 380px;
                height: 600px;
                background: white;
                border-radius: 20px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
                z-index: 10000;
                display: flex;
                flex-direction: column;
                overflow: hidden;
                animation: slideUp 0.3s ease-out;
            }

            @keyframes slideUp {
                from {
                    transform: translateY(100%);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }

            .ai-chat-header {
                background: linear-gradient(135deg, #ff6b6b 0%, #ff8787 100%);
                color: white;
                padding: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .ai-chat-header-content {
                display: flex;
                align-items: center;
                gap: 12px;
            }

            .ai-chat-avatar {
                font-size: 2.5rem;
                filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
            }

            .ai-chat-title h3 {
                margin: 0;
                font-size: 1.1rem;
                font-weight: 700;
            }

            .ai-chat-subtitle {
                margin: 2px 0 0;
                font-size: 0.85rem;
                opacity: 0.9;
            }

            .ai-chat-close {
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: background 0.2s;
            }

            .ai-chat-close:hover {
                background: rgba(255, 255, 255, 0.2);
            }

            .ai-chat-language-selector {
                padding: 10px 20px;
                background: #f8f9fa;
                border-bottom: 1px solid #e9ecef;
            }

            #ai-language-select {
                width: 100%;
                padding: 8px 12px;
                border: 1px solid #dee2e6;
                border-radius: 8px;
                font-size: 0.9rem;
                background: white;
                cursor: pointer;
            }

            .ai-chat-messages {
                flex: 1;
                overflow-y: auto;
                padding: 20px;
                background: #f8f9fa;
            }

            .ai-message {
                display: flex;
                gap: 12px;
                margin-bottom: 16px;
                animation: fadeIn 0.3s ease-out;
            }

            @keyframes fadeIn {
                from {
                    opacity: 0;
                    transform: translateY(10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .ai-message-avatar {
                font-size: 1.5rem;
                width: 36px;
                height: 36px;
                display: flex;
                align-items: center;
                justify-content: center;
                background: white;
                border-radius: 50%;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            }

            .ai-message-content {
                flex: 1;
                background: white;
                padding: 12px 16px;
                border-radius: 12px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
            }

            .user-message {
                flex-direction: row-reverse;
            }

            .user-message .ai-message-content {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
            }

            .ai-message-time {
                font-size: 0.75rem;
                color: #6c757d;
                margin-top: 4px;
            }

            .ai-chat-suggestions {
                padding: 12px;
                background: white;
                border-top: 1px solid #e9ecef;
                display: flex;
                gap: 8px;
                overflow-x: auto;
            }

            .suggestion-btn {
                background: #f0f0f0;
                border: 1px solid #dee2e6;
                border-radius: 20px;
                padding: 6px 16px;
                font-size: 0.85rem;
                cursor: pointer;
                white-space: nowrap;
                transition: all 0.2s;
            }

            .suggestion-btn:hover {
                background: #e9ecef;
                transform: translateY(-1px);
            }

            .ai-chat-input-container {
                display: flex;
                gap: 12px;
                padding: 16px;
                background: white;
                border-top: 1px solid #e9ecef;
            }

            #ai-chat-input {
                flex: 1;
                padding: 12px 16px;
                border: 1px solid #dee2e6;
                border-radius: 24px;
                font-size: 0.95rem;
                outline: none;
                transition: border-color 0.2s;
            }

            #ai-chat-input:focus {
                border-color: #ff6b6b;
            }

            .ai-chat-send {
                background: linear-gradient(135deg, #ff6b6b 0%, #ff8787 100%);
                border: none;
                border-radius: 50%;
                width: 44px;
                height: 44px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                color: white;
                transition: transform 0.2s;
            }

            .ai-chat-send:hover {
                transform: scale(1.05);
            }

            .ai-chat-send:active {
                transform: scale(0.95);
            }

            .typing-indicator {
                display: flex;
                gap: 4px;
                padding: 12px;
            }

            .typing-dot {
                width: 8px;
                height: 8px;
                background: #6c757d;
                border-radius: 50%;
                animation: typing 1.4s infinite;
            }

            .typing-dot:nth-child(2) {
                animation-delay: 0.2s;
            }

            .typing-dot:nth-child(3) {
                animation-delay: 0.4s;
            }

            @keyframes typing {
                0%, 60%, 100% {
                    transform: translateY(0);
                }
                30% {
                    transform: translateY(-10px);
                }
            }

            @media (max-width: 768px) {
                .ai-sakura-chat-container {
                    width: 100%;
                    height: 100%;
                    bottom: 0;
                    right: 0;
                    border-radius: 0;
                    max-width: 100vw;
                    max-height: 100vh;
                }

                .mobile-ai-chatbot {
                    position: fixed;
                    bottom: 70px;
                    left: 50%;
                    transform: translateX(-50%);
                    z-index: 9999;
                }

                .chatbot-btn {
                    background: linear-gradient(135deg, #ff6b6b 0%, #ff8787 100%);
                    color: white;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 30px;
                    font-size: 0.95rem;
                    font-weight: 600;
                    cursor: pointer;
                    box-shadow: 0 4px 20px rgba(255, 107, 107, 0.3);
                    transition: all 0.3s ease;
                    white-space: nowrap;
                }

                .chatbot-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 30px rgba(255, 107, 107, 0.4);
                }
            }
            </style>
        `;

        // Add to page
        document.head.insertAdjacentHTML('beforeend', styles);
        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    }

    // Setup event listeners
    function setupEventListeners() {
        // Global functions
        window.openAIChat = openSakuraChat;
        window.closeSakuraChat = closeSakuraChat;
        window.sendChatMessage = sendChatMessage;
        window.handleChatKeypress = handleChatKeypress;
        window.sendSuggestion = sendSuggestion;
        window.changeAILanguage = changeAILanguage;
    }

    // Add initial message
    function addInitialMessage() {
        const welcomeMessages = {
            ja: 'こんにちは！AIサクラです🌸\n益々酒造の日本酒について、何でもお聞きください。おすすめの銘柄、飲み方、お料理との相性など、お手伝いさせていただきます。',
            en: 'Hello! I\'m AI Sakura 🌸\nI\'m here to help you discover the wonderful world of Masumasu Brewery sake. Feel free to ask about recommendations, serving suggestions, or food pairings!',
            zh: '您好！我是AI樱花🌸\n我是益益酒造的专属AI侍酒师。请随时询问有关我们日本酒的任何问题。',
            ko: '안녕하세요! AI 사쿠라입니다🌸\n마스마스 양조장의 사케에 대해 무엇이든 물어보세요.',
            fr: 'Bonjour! Je suis AI Sakura 🌸\nJe suis votre guide pour découvrir les sakés de la brasserie Masumasu.',
            es: '¡Hola! Soy AI Sakura 🌸\nEstoy aquí para ayudarte a descubrir el maravilloso mundo del sake de Masumasu.',
            de: 'Hallo! Ich bin AI Sakura 🌸\nIch bin Ihr persönlicher Sake-Sommelier der Masumasu-Brauerei.',
            it: 'Ciao! Sono AI Sakura 🌸\nSono qui per guidarti nel meraviglioso mondo del sake Masumasu.',
            pt: 'Olá! Eu sou AI Sakura 🌸\nEstou aqui para ajudá-lo a descobrir o maravilhoso mundo do saquê Masumasu.',
            ru: 'Привет! Я AI Сакура 🌸\nЯ ваш персональный сомелье саке от пивоварни Масумасу.'
        };

        addMessage('ai', welcomeMessages[chatState.currentLanguage] || welcomeMessages.ja);
    }

    // Open chatbot
    function openSakuraChat() {
        console.log('openSakuraChat function called');
        const chatContainer = document.getElementById('ai-sakura-chat');
        if (chatContainer) {
            console.log('Chat container found, opening chat');
            chatContainer.style.display = 'flex';
            chatState.isOpen = true;
            const input = document.getElementById('ai-chat-input');
            if (input) {
                input.focus();
            }
        } else {
            console.error('Chat container not found');
        }
    }

    // Close chatbot
    function closeSakuraChat() {
        const chatContainer = document.getElementById('ai-sakura-chat');
        if (chatContainer) {
            chatContainer.style.display = 'none';
            chatState.isOpen = false;
        }
    }

    // Send message
    async function sendChatMessage() {
        const input = document.getElementById('ai-chat-input');
        const message = input.value.trim();
        
        if (!message) return;
        
        // Add user message
        addMessage('user', message);
        input.value = '';
        
        // Show typing indicator
        showTypingIndicator();
        
        try {
            // Get AI response
            const response = await getAIResponse(message);
            
            // Remove typing indicator
            hideTypingIndicator();
            
            // Add AI response
            addMessage('ai', response);
        } catch (error) {
            hideTypingIndicator();
            addMessage('ai', getErrorMessage());
        }
    }

    // Get AI response using OpenAI API
    async function getAIResponse(userMessage) {
        // Check if API key is configured
        if (CONFIG.openai.apiKey === 'YOUR_OPENAI_API_KEY') {
            return getFallbackResponse(userMessage);
        }

        try {
            const response = await fetch(CONFIG.openai.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${CONFIG.openai.apiKey}`
                },
                body: JSON.stringify({
                    model: CONFIG.openai.model,
                    messages: [
                        {
                            role: 'system',
                            content: `You are AI Sakura, a knowledgeable and friendly sake sommelier for Masumasu Brewery (益々酒造). 
                            The brewery has 300 years of history and produces premium sake including:
                            - 純米吟醸「益々」 (Junmai Ginjo)
                            - スパークリング清酒 (Sparkling Sake)
                            - 古酒「益々」 (Aged Sake)
                            - 本醸造「益々」 (Honjozo)
                            - 梅酒「益々」 (Plum Wine)
                            
                            Provide helpful, concise responses about sake recommendations, serving suggestions, food pairings, and brewery information.
                            Respond in the language of the user's message.`
                        },
                        {
                            role: 'user',
                            content: userMessage
                        }
                    ],
                    temperature: 0.7,
                    max_tokens: 200
                })
            });

            if (!response.ok) {
                throw new Error('API request failed');
            }

            const data = await response.json();
            return data.choices[0].message.content;
        } catch (error) {
            console.error('OpenAI API error:', error);
            return getFallbackResponse(userMessage);
        }
    }

    // Get fallback response when API is not available
    function getFallbackResponse(message) {
        const lowerMessage = message.toLowerCase();
        const responses = {
            ja: {
                greeting: ['こんにちは', 'hello', 'hi'],
                recommendation: ['おすすめ', 'オススメ', '推薦'],
                pairing: ['料理', 'ペアリング', '相性', '合う'],
                serving: ['飲み方', '温度', '冷や', '熱燗'],
                price: ['価格', '値段', 'いくら'],
                visit: ['見学', 'ツアー', '訪問'],
                default: '申し訳ございません。お答えできる情報が限られています。詳しくは直接お問い合わせください。'
            }
        };

        // Greeting
        if (responses.ja.greeting.some(word => lowerMessage.includes(word))) {
            return 'こんにちは！益々酒造へようこそ。日本酒について何かご質問はありますか？';
        }

        // Recommendation
        if (responses.ja.recommendation.some(word => lowerMessage.includes(word))) {
            return '当蔵のおすすめは純米吟醸「益々」です。フルーティーな香りとすっきりとした味わいが特徴で、初めての方にも飲みやすい一本です。また、暑い季節にはスパークリング清酒もおすすめです！';
        }

        // Food pairing
        if (responses.ja.pairing.some(word => lowerMessage.includes(word))) {
            return '純米吟醸は刺身や寿司との相性が抜群です。本醸造は焼き鳥や天ぷらなど、少し濃い味の料理にも合います。梅酒はデザートと一緒にお楽しみください。';
        }

        // Serving temperature
        if (responses.ja.serving.some(word => lowerMessage.includes(word))) {
            return '純米吟醸は冷やして（5-10℃）、本醸造は常温またはぬる燗（40-45℃）がおすすめです。スパークリング清酒はよく冷やしてお召し上がりください。';
        }

        // Price
        if (responses.ja.price.some(word => lowerMessage.includes(word))) {
            return '価格は商品により異なりますが、720mlで2,000円～5,000円の範囲です。詳しい価格は商品ページをご覧ください。';
        }

        // Visit
        if (responses.ja.visit.some(word => lowerMessage.includes(word))) {
            return '酒蔵見学ツアーを実施しています。スタンダードツアー（90分、3,000円）とプレミアムツアー（3時間、10,000円）があります。事前予約が必要です。';
        }

        return responses.ja.default;
    }

    // Add message to chat
    function addMessage(sender, content) {
        const messagesContainer = document.getElementById('ai-chat-messages');
        const messageTime = new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });
        
        const messageHTML = `
            <div class="ai-message ${sender === 'user' ? 'user-message' : ''}">
                <div class="ai-message-avatar">
                    ${sender === 'user' ? '👤' : '🌸'}
                </div>
                <div class="ai-message-content">
                    <div>${content.replace(/\n/g, '<br>')}</div>
                    <div class="ai-message-time">${messageTime}</div>
                </div>
            </div>
        `;
        
        messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Save to chat history
        chatState.messages.push({ sender, content, time: messageTime });
    }

    // Show typing indicator
    function showTypingIndicator() {
        const messagesContainer = document.getElementById('ai-chat-messages');
        const typingHTML = `
            <div class="ai-message typing-indicator-message">
                <div class="ai-message-avatar">🌸</div>
                <div class="typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;
        messagesContainer.insertAdjacentHTML('beforeend', typingHTML);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Hide typing indicator
    function hideTypingIndicator() {
        const typingIndicator = document.querySelector('.typing-indicator-message');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    // Handle keypress in input
    function handleChatKeypress(event) {
        if (event.key === 'Enter') {
            sendChatMessage();
        }
    }

    // Send suggestion
    function sendSuggestion(suggestion) {
        document.getElementById('ai-chat-input').value = suggestion;
        sendChatMessage();
    }

    // Change language
    async function changeAILanguage(language) {
        chatState.currentLanguage = language;
        
        // Translate last AI message if DeepL is configured
        if (CONFIG.deepl.apiKey !== 'YOUR_DEEPL_API_KEY' && chatState.messages.length > 0) {
            const lastAIMessage = chatState.messages.filter(m => m.sender === 'ai').pop();
            if (lastAIMessage) {
                try {
                    const translated = await translateWithDeepL(lastAIMessage.content, language);
                    addMessage('ai', translated);
                } catch (error) {
                    console.error('Translation error:', error);
                }
            }
        }
    }

    // Translate with DeepL API
    async function translateWithDeepL(text, targetLang) {
        if (CONFIG.deepl.apiKey === 'YOUR_DEEPL_API_KEY') {
            return text; // Return original if API key not configured
        }

        try {
            const response = await fetch(CONFIG.deepl.apiUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `DeepL-Auth-Key ${CONFIG.deepl.apiKey}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    text: text,
                    target_lang: targetLang.toUpperCase(),
                    source_lang: 'JA'
                })
            });

            if (!response.ok) {
                throw new Error('Translation failed');
            }

            const data = await response.json();
            return data.translations[0].text;
        } catch (error) {
            console.error('DeepL API error:', error);
            return text;
        }
    }

    // Get error message
    function getErrorMessage() {
        const errorMessages = {
            ja: '申し訳ございません。現在接続に問題があります。しばらくしてからもう一度お試しください。',
            en: 'Sorry, there seems to be a connection issue. Please try again later.',
            zh: '抱歉，目前连接出现问题。请稍后再试。',
            ko: '죄송합니다. 현재 연결 문제가 있습니다. 나중에 다시 시도해주세요.',
            fr: 'Désolé, il semble y avoir un problème de connexion. Veuillez réessayer plus tard.',
            es: 'Lo siento, parece haber un problema de conexión. Por favor, inténtelo más tarde.',
            de: 'Entschuldigung, es scheint ein Verbindungsproblem zu geben. Bitte versuchen Sie es später erneut.',
            it: 'Spiacenti, sembra esserci un problema di connessione. Riprova più tardi.',
            pt: 'Desculpe, parece haver um problema de conexão. Por favor, tente novamente mais tarde.',
            ru: 'Извините, похоже, возникла проблема с подключением. Пожалуйста, попробуйте позже.'
        };
        
        return errorMessages[chatState.currentLanguage] || errorMessages.ja;
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeChatbot);
    } else {
        initializeChatbot();
    }

})();