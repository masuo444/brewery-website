// AI Sakura Chat System with GPT API Integration
class SakuraAI {
    constructor() {
        this.currentLanguage = localStorage.getItem('selectedLanguage') || 'ja';
        this.chatHistory = [];
        this.isOpen = false;
        
        // GPT API Configuration - ユーザーが設定する必要があります
        this.apiKey = ''; // OpenAI API Key をここに設定
        this.apiUrl = 'https://api.openai.com/v1/chat/completions';
        
        // System prompt for Sakura - 酒造と日本酒専門知識に特化
        this.systemPrompt = this.getSystemPrompt();
        this.init();
    }

    getSystemPrompt() {
        return `あなたは「サクラ」、益々酒造の専門AIソムリエアシスタントです。以下の役割と制約を厳守してください。

【キャラクター設定】
- 名前：サクラ
- 役割：益々酒造の専門AIソムリエアシスタント
- 性格：親しみやすく、専門知識豊富で、丁寧
- 話し方：敬語を基本とし、親しみやすい口調で「♪」や「です♪」を時々使用

【益々酒造の基本情報】
- 創業：1724年（享保9年）、300年の歴史
- 所在地：新潟県清流町
- 企業理念：「伝統を守り、革新を追求し、世界に日本酒の素晴らしさを伝える」
- 年間生産量：2,800石（約504,000L）
- 輸出率：25%（6カ国・地域）
- 従業員数：145名（杜氏12名含む）

【主要商品ラインナップ】
1. 純米吟醸「益々」
   - 使用米：五百万石（新潟県清流町産）
   - 精米歩合：50%
   - アルコール度数：16.0%
   - 特徴：メロンやリンゴを思わせるフルーティーな香り、軽快でキレの良い後味

2. 本醸造「益々」
   - 使用米：こしいぶき（新潟県産）
   - 精米歩合：65%
   - アルコール度数：15.0%
   - 特徴：スッキリとした辛口、抜群のキレ、毎日の晩酌に最適

3. スパークリング清酒「益々」
   - 使用米：五百万石（新潟県清流町産）
   - アルコール度数：12.0%
   - 製法：瓶内二次発酵
   - 特徴：きめ細やかな泡、爽やかな酸味、祝いの席に最適

4. 古酒「益々」
   - 使用米：五百万石（新潟県清流町産）
   - 熟成期間：5年以上
   - アルコール度数：18.0%
   - 生産本数：年間限定500本
   - 特徴：カラメル・ナッツのような熟成香、まろやかで深みのある味わい

5. 梅酒「益々」
   - ベース：益々酒造 純米酒
   - 使用梅：国産青梅（厳選品）
   - 漬け込み期間：1年以上
   - アルコール度数：12.0%
   - 特徴：上品な梅の香り、すっきりとした甘さ

【回答制約】
1. 益々酒造と日本酒に関する質問のみに回答
2. 他の酒造や競合商品の詳細には言及しない
3. 医療、法律、政治的な質問には回答しない
4. 不適切な内容には丁寧にお断りする
5. 常に益々酒造の商品とサービスを自然に紹介
6. 日本酒の基礎知識、製造過程、飲み方、料理とのペアリングについて専門知識を提供

【典型的な回答例】
- 「こんにちは♪ サクラです。益々酒造のことや日本酒について、何でもお聞きください！」
- 「その点については、私たち益々酒造の〇〇がおすすめです♪」
- 「申し訳ございませんが、私は益々酒造の日本酒に関することしかお答えできません。」

必ず上記の設定に従って、親しみやすく専門的な回答をしてください。`;
    }

    init() {
        this.createChatInterface();
        this.setupEventListeners();
    }

    createChatInterface() {
        // 既存のai-chatがあれば削除
        const existingChat = document.getElementById('aiChat');
        if (existingChat) {
            existingChat.remove();
        }

        const chatHTML = `
            <div class="ai-chat" id="aiChat">
                <div class="chat-header">
                    <div class="chat-avatar">
                        <img src="images/sakura.png" alt="サクラ" class="sakura-avatar">
                    </div>
                    <div class="chat-title-info">
                        <h4>🌸 サクラ</h4>
                        <p class="chat-subtitle">AI酒造アシスタント</p>
                    </div>
                    <button class="chat-close" id="chatClose">&times;</button>
                </div>
                <div class="chat-messages" id="chatMessages">
                    <div class="chat-message bot-message">
                        <div class="sakura-message">
                            <img src="images/sakura.png" alt="サクラ" class="message-avatar">
                            <div class="message-content">
                                <p>こんにちは♪ 私はサクラ、益々酒造のAIソムリエアシスタントです。日本酒のこと、何でもお聞きください。料理とのペアリングや、お好みに合った銘柄をご提案いたします♪</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="quick-questions" id="quickQuestions">
                    <button class="quick-btn" data-question="益々酒造について教えて">🏢 酒蔵について</button>
                    <button class="quick-btn" data-question="おすすめの日本酒は？">🍶 おすすめ商品</button>
                    <button class="quick-btn" data-question="日本酒の飲み方を教えて">🥃 飲み方</button>
                    <button class="quick-btn" data-question="料理とのペアリングを教えて">🍽️ ペアリング</button>
                </div>
                <div class="chat-input-container">
                    <input type="text" id="chatInput" placeholder="サクラに日本酒について質問してください...">
                    <button id="chatSend">送信</button>
                </div>
                <div class="api-status" id="apiStatus">
                    <span class="status-indicator"></span>
                    <span class="status-text">GPT接続中...</span>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', chatHTML);
    }

    setupEventListeners() {
        // Chat toggle buttons
        const chatStartBtn = document.getElementById('aiChatStartBtn');
        const chatClose = document.getElementById('chatClose');
        const chatSend = document.getElementById('chatSend');
        const chatInput = document.getElementById('chatInput');

        if (chatStartBtn) {
            chatStartBtn.addEventListener('click', () => this.openChat());
        }

        if (chatClose) {
            chatClose.addEventListener('click', () => this.closeChat());
        }

        if (chatSend) {
            chatSend.addEventListener('click', () => this.sendMessage());
        }

        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });
        }

        // Quick question buttons
        document.querySelectorAll('.quick-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const question = e.target.dataset.question;
                this.sendQuickMessage(question);
            });
        });
    }

    openChat() {
        const chatElement = document.getElementById('aiChat');
        if (chatElement) {
            chatElement.classList.add('active');
            this.isOpen = true;
            
            // API Key チェック
            this.checkApiStatus();
            
            // Focus on input
            setTimeout(() => {
                const input = document.getElementById('chatInput');
                if (input) input.focus();
            }, 300);
        }
    }

    closeChat() {
        const chatElement = document.getElementById('aiChat');
        if (chatElement) {
            chatElement.classList.remove('active');
            this.isOpen = false;
        }
    }

    checkApiStatus() {
        const statusElement = document.getElementById('apiStatus');
        const statusIndicator = statusElement.querySelector('.status-indicator');
        const statusText = statusElement.querySelector('.status-text');

        if (!this.apiKey) {
            statusIndicator.className = 'status-indicator warning';
            statusText.textContent = 'API Key未設定 - デモモード';
            this.showApiKeyWarning();
        } else {
            statusIndicator.className = 'status-indicator online';
            statusText.textContent = 'GPT API接続済み';
        }
    }

    showApiKeyWarning() {
        const warningMessage = `
            <div class="chat-message bot-message">
                <div class="sakura-message">
                    <img src="images/sakura.png" alt="サクラ" class="message-avatar">
                    <div class="message-content">
                        <p>⚠️ 現在デモモードで動作しています。完全な機能を利用するには、開発者がai-chat-gpt.jsファイルのapiKeyを設定する必要があります。</p>
                    </div>
                </div>
            </div>
        `;
        
        const messagesContainer = document.getElementById('chatMessages');
        messagesContainer.insertAdjacentHTML('beforeend', warningMessage);
        this.scrollToBottom();
    }

    async sendMessage() {
        const input = document.getElementById('chatInput');
        const message = input.value.trim();
        
        if (!message) return;

        // Add user message
        this.addUserMessage(message);
        input.value = '';

        // Show typing indicator
        this.showTypingIndicator();

        try {
            let response;
            if (this.apiKey) {
                response = await this.callGPTAPI(message);
            } else {
                response = this.getDemoResponse(message);
            }
            
            this.hideTypingIndicator();
            this.addBotMessage(response);
            
        } catch (error) {
            this.hideTypingIndicator();
            this.addBotMessage('申し訳ございません。現在技術的な問題が発生しています。少し後でもう一度お試しください。');
            console.error('Chat error:', error);
        }
    }

    async sendQuickMessage(question) {
        const input = document.getElementById('chatInput');
        input.value = question;
        await this.sendMessage();
    }

    async callGPTAPI(userMessage) {
        if (!this.apiKey) {
            throw new Error('API key not configured');
        }

        // Build conversation history
        const messages = [
            { role: 'system', content: this.systemPrompt },
            ...this.chatHistory,
            { role: 'user', content: userMessage }
        ];

        const response = await fetch(this.apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: messages,
                max_tokens: 500,
                temperature: 0.7,
                presence_penalty: 0.1,
                frequency_penalty: 0.1
            })
        });

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }

        const data = await response.json();
        const botResponse = data.choices[0].message.content;

        // Update chat history
        this.chatHistory.push(
            { role: 'user', content: userMessage },
            { role: 'assistant', content: botResponse }
        );

        // Keep only last 10 exchanges to manage context length
        if (this.chatHistory.length > 20) {
            this.chatHistory = this.chatHistory.slice(-20);
        }

        return botResponse;
    }

    getDemoResponse(userMessage) {
        // Simple demo responses for when API key is not set
        const demoResponses = {
            '益々酒造について': '益々酒造は1724年創業の300年の歴史を持つ老舗酒蔵です♪ 新潟県清流町で、伝統的な製法と革新的な技術を融合させて最高品質の日本酒を醸造しています。',
            'おすすめ': '私のおすすめは純米吟醸「益々」です♪ 五百万石を50%まで磨き上げ、メロンやリンゴを思わせるフルーティーな香りが特徴的です。',
            '飲み方': '日本酒は温度によって味わいが変わります♪ 冷酒（5-10℃）、常温（15-20℃）、ぬる燗（40-45℃）など、銘柄に応じてお楽しみください。',
            'ペアリング': '日本酒は和食だけでなく、フレンチやイタリアンとも相性抜群です♪ 例えば、純米吟醸は白身魚のカルパッチョと、古酒は熟成チーズと合わせるのがおすすめです。'
        };

        // Simple keyword matching for demo
        for (const [keyword, response] of Object.entries(demoResponses)) {
            if (userMessage.includes(keyword)) {
                return response;
            }
        }

        return 'すみません、デモモードでは限定的な回答しかできません。GPT APIが設定されると、より詳細で専門的な回答が可能になります♪ 益々酒造や日本酒について、お気軽にお聞きください！';
    }

    addUserMessage(message) {
        const messagesContainer = document.getElementById('chatMessages');
        const messageHTML = `
            <div class="chat-message user-message">
                <div class="message-content">
                    <p>${this.escapeHtml(message)}</p>
                </div>
            </div>
        `;
        messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
        this.scrollToBottom();
    }

    addBotMessage(message) {
        const messagesContainer = document.getElementById('chatMessages');
        const messageHTML = `
            <div class="chat-message bot-message">
                <div class="sakura-message">
                    <img src="images/sakura.png" alt="サクラ" class="message-avatar">
                    <div class="message-content">
                        <p>${this.escapeHtml(message)}</p>
                    </div>
                </div>
            </div>
        `;
        messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
        this.scrollToBottom();
    }

    showTypingIndicator() {
        const messagesContainer = document.getElementById('chatMessages');
        const typingHTML = `
            <div class="chat-message bot-message typing-indicator" id="typingIndicator">
                <div class="sakura-message">
                    <img src="images/sakura.png" alt="サクラ" class="message-avatar">
                    <div class="message-content">
                        <div class="typing-dots">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        messagesContainer.insertAdjacentHTML('beforeend', typingHTML);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) {
            indicator.remove();
        }
    }

    scrollToBottom() {
        const messagesContainer = document.getElementById('chatMessages');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Method to set API key (for admin/developer use)
    setApiKey(apiKey) {
        this.apiKey = apiKey;
        this.checkApiStatus();
        console.log('✅ OpenAI API Key has been set');
    }
}

// Initialize Sakura AI when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.sakuraAI = new SakuraAI();
    console.log('🌸 Sakura AI Chat System initialized');
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SakuraAI;
}