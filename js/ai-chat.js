// AI Chat System for Masumasu Brewery
class MasumasuAI {
    constructor() {
        this.currentLanguage = localStorage.getItem('selectedLanguage') || 'ja';
        this.chatHistory = [];
        this.isOpen = false;
        this.knowledgeBase = this.initializeKnowledgeBase();
        this.init();
    }

    initializeKnowledgeBase() {
        return {
            ja: {
                greeting: "こんにちは！私はサクラ、益々酒造のAIアシスタントです。300年の伝統と経験を活かして、日本酒に関するご質問にお答えします。何でもお聞きください♪",
                farewell: "ご質問ありがとうございました。益々酒造の日本酒をぜひお楽しみください！",
                brewery: {
                    history: "益々酒造は1724年創業の300年の歴史を持つ老舗酒蔵です。新潟県の清流町で、伝統的な製法と革新的な技術を融合させ、最高品質の日本酒を醸造しています。",
                    philosophy: "私たちは「伝統を守り、革新を追求する」という理念のもと、一本一本丁寧に醸造しています。",
                    location: "新潟県清流町の豊かな自然環境と清らかな伏流水に恵まれた地で酒造りを行っています。"
                },
                products: {
                    junmaiGinjo: "純米吟醸「益々」は、五百万石を50%まで磨き上げ、新潟酵母G9で丁寧に醸造した逸品です。メロンやリンゴを思わせるフルーティーな香りと軽快でキレの良い後味が特徴です。",
                    honjozo: "本醸造「益々」は、新潟県産こしいぶきを使用したクラシックな味わいです。スッキリとした辛口で抜群のキレがあり、毎日の晩酌にぴったりです。",
                    sparkling: "スパークリング清酒「益々」は、きめ細やかな泡と爽やかな酸味が特徴的です。祝いの席にふさわしい華やかな一本で、よく冷やしてシャンパングラスでお楽しみください。",
                    vintage: "古酒「益々」は、5年以上熟成させた希少な日本酒です。カラメルやナッツのような熟成香と、まろやかで深みのある味わいが楽しめます。",
                    plum: "梅酒「益々」は、純米酒をベースに梅を漬け込んだこだわりの梅酒です。上品な梅の香りとすっきりとした甘さが特徴で、ロックやソーダ割りでお楽しみいただけます。"
                },
                brewing: {
                    process: "私たちの酒造りは、米洗いから始まり、蒸米、麹造り、酒母造り、仕込み、発酵、搾り、貯蔵、瓶詰めまで、すべての工程で職人の技と心を込めています。",
                    water: "新潟県清流町の伏流水を使用しており、この軟水が私たちの日本酒の繊細で上品な味わいを生み出しています。",
                    rice: "主に五百万石、こしいぶきなど新潟県産の酒造好適米を使用し、精米歩合にもこだわって最高品質の原料を使用しています。"
                },
                tasting: {
                    temperature: "日本酒の温度帯によって味わいが変化します。冷酒（5-10℃）、常温（15-20℃）、ぬる燗（40-45℃）、熱燗（50-55℃）など、銘柄に応じた温度でお楽しみください。",
                    pairing: "日本酒は日本料理だけでなく、フレンチ、イタリアン、中華料理とも相性が良いです。料理の味わいと日本酒の特徴を合わせることで、より美味しくお楽しみいただけます。",
                    serving: "適切なグラスや徳利、おちょこを使用することで、香りや味わいを最大限に引き出すことができます。"
                }
            },
            en: {
                greeting: "Hello! I'm Sakura, the AI Assistant of Masumasu Brewery. Drawing from 300 years of tradition and experience, I'm here to answer any questions about sake. Please feel free to ask anything!",
                farewell: "Thank you for your questions. Please enjoy Masumasu Brewery's sake!",
                brewery: {
                    history: "Masumasu Brewery was founded in 1724 and has 300 years of history. Located in Seiryu-cho, Niigata Prefecture, we combine traditional methods with innovative techniques to brew the highest quality sake.",
                    philosophy: "We operate under the principle of 'preserving tradition while pursuing innovation,' carefully brewing each bottle.",
                    location: "We brew sake in the rich natural environment of Seiryu-cho, Niigata Prefecture, blessed with clear underground water."
                },
                products: {
                    junmaiGinjo: "Junmai Ginjo 'Masu Masu' is crafted from Gohyakumangoku rice polished to 50% using Niigata Yeast G9. It features fruity aromas reminiscent of melon and apple with a light, crisp finish.",
                    honjozo: "Honjozo 'Masu Masu' uses Koshiibuki rice from Niigata for a classic taste. It's clean and dry with outstanding crispness, perfect for daily evening drinks.",
                    sparkling: "Sparkling Sake 'Masu Masu' features fine bubbles and refreshing acidity. It's a gorgeous bottle perfect for celebrations, best enjoyed well-chilled in champagne glasses.",
                    vintage: "Vintage Sake 'Masu Masu' is a rare sake aged for over 5 years. It offers matured aromas like caramel and nuts with mellow, deep flavors.",
                    plum: "Plum Wine 'Masu Masu' is crafted by steeping plums in our junmai sake base. It features elegant plum aroma and clean sweetness, enjoyable on the rocks or with soda."
                },
                brewing: {
                    process: "Our sake brewing starts with rice washing and continues through steaming, koji making, yeast starter preparation, fermentation, pressing, storage, and bottling - each step crafted with artisan skill and heart.",
                    water: "We use underground water from Seiryu-cho, Niigata Prefecture. This soft water creates the delicate and elegant taste of our sake.",
                    rice: "We primarily use sake-specific rice varieties like Gohyakumangoku and Koshiibuki from Niigata Prefecture, carefully controlling the rice polishing ratio for the highest quality ingredients."
                },
                tasting: {
                    temperature: "Sake's flavor changes with temperature. Enjoy chilled (5-10°C), room temperature (15-20°C), warm (40-45°C), or hot (50-55°C) according to each brand's characteristics.",
                    pairing: "Sake pairs well not only with Japanese cuisine but also with French, Italian, and Chinese dishes. Matching the food's flavor profile with sake characteristics enhances the dining experience.",
                    serving: "Using appropriate glassware, tokkuri, and ochoko can maximize the aroma and flavor experience."
                }
            },
            fr: {
                greeting: "Bonjour ! Je suis l'IA Toji (Maître Brasseur) de la Brasserie Masumasu. Fort de 300 ans de tradition et d'expérience, je suis là pour répondre à toutes vos questions sur le saké. N'hésitez pas à me demander quoi que ce soit !",
                farewell: "Merci pour vos questions. Profitez bien du saké de la Brasserie Masumasu !",
                brewery: {
                    history: "La Brasserie Masumasu a été fondée en 1724 et possède 300 ans d'histoire. Située à Seiryu-cho, Préfecture de Niigata, nous combinons méthodes traditionnelles et techniques innovantes pour brasser le saké de la plus haute qualité.",
                    philosophy: "Nous opérons selon le principe de 'préserver la tradition tout en poursuivant l'innovation', brassant soigneusement chaque bouteille.",
                    location: "Nous brassons le saké dans l'environnement naturel riche de Seiryu-cho, Préfecture de Niigata, béni par une eau souterraine claire."
                }
            },
            zh: {
                greeting: "您好！我是益々酒造的AI杜氏（酿酒师）。凭借300年的传统和经验，我将为您解答关于日本酒的任何问题。请随时询问！",
                farewell: "感谢您的提问。请享用益々酒造的日本酒！",
                brewery: {
                    history: "益々酒造创立于1724年，拥有300年的历史。位于新潟县清流町，我们结合传统工艺与创新技术，酿造最高品质的日本酒。",
                    philosophy: "我们秉承'传承传统，追求创新'的理念，用心酿造每一瓶酒。",
                    location: "我们在新潟县清流町丰富的自然环境中酿酒，这里有清澈的地下水源。"
                }
            }
        };
    }

    init() {
        this.createChatWidget();
        this.setupEventListeners();
    }

    createChatWidget() {
        const chatHTML = `
            <div id="ai-chat-widget" class="ai-chat-widget">
                <button id="ai-chat-toggle" class="ai-chat-toggle">
                    🤖 AI杜氏に相談
                </button>
                <div id="ai-chat-window" class="ai-chat-window" style="display: none;">
                    <div class="ai-chat-header">
                        <div class="ai-chat-title">
                            <h4>🍶 AI杜氏 - 益々さん</h4>
                            <span class="ai-status online">オンライン</span>
                        </div>
                        <button id="ai-chat-close" class="ai-chat-close">×</button>
                    </div>
                    <div id="ai-chat-messages" class="ai-chat-messages">
                        <div class="ai-message welcome-message">
                            <div class="message-avatar">🍶</div>
                            <div class="message-content">
                                <strong>AI杜氏:</strong> ${this.knowledgeBase[this.currentLanguage].greeting}
                            </div>
                        </div>
                    </div>
                    <div class="ai-chat-input">
                        <input type="text" id="ai-chat-input" placeholder="質問を入力してください...">
                        <button id="ai-chat-send">送信</button>
                    </div>
                    <div class="ai-quick-questions">
                        <button class="quick-question" data-question="brewery">酒蔵について</button>
                        <button class="quick-question" data-question="products">商品について</button>
                        <button class="quick-question" data-question="brewing">醸造について</button>
                        <button class="quick-question" data-question="pairing">料理との相性</button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', chatHTML);
    }

    setupEventListeners() {
        const chatToggle = document.getElementById('ai-chat-toggle');
        const chatWindow = document.getElementById('ai-chat-window');
        const chatClose = document.getElementById('ai-chat-close');
        const chatInput = document.getElementById('ai-chat-input');
        const chatSend = document.getElementById('ai-chat-send');

        chatToggle.addEventListener('click', () => this.toggleChat());
        chatClose.addEventListener('click', () => this.closeChat());
        chatSend.addEventListener('click', () => this.sendMessage());
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        // Quick questions
        document.querySelectorAll('.quick-question').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const question = e.target.dataset.question;
                this.handleQuickQuestion(question);
            });
        });

        // Language change listener
        const languageSelect = document.getElementById('languageSelect');
        if (languageSelect) {
            languageSelect.addEventListener('change', (e) => {
                this.currentLanguage = e.target.value;
                this.updateLanguage();
            });
        }
    }

    toggleChat() {
        const chatWindow = document.getElementById('ai-chat-window');
        this.isOpen = !this.isOpen;
        chatWindow.style.display = this.isOpen ? 'flex' : 'none';
        
        if (this.isOpen) {
            document.getElementById('ai-chat-input').focus();
        }
    }

    closeChat() {
        const chatWindow = document.getElementById('ai-chat-window');
        this.isOpen = false;
        chatWindow.style.display = 'none';
    }

    addMessage(message, isUser = false) {
        const messagesContainer = document.getElementById('ai-chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = isUser ? 'user-message' : 'ai-message';
        
        messageDiv.innerHTML = `
            ${!isUser ? '<div class="message-avatar">🍶</div>' : ''}
            <div class="message-content">
                <strong>${isUser ? 'あなた' : 'AI杜氏'}:</strong> ${message}
            </div>
        `;
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    sendMessage() {
        const input = document.getElementById('ai-chat-input');
        const message = input.value.trim();
        
        if (!message) return;

        this.addMessage(message, true);
        input.value = '';

        // Show typing indicator
        this.showTypingIndicator();

        // Simulate AI processing time
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.generateResponse(message);
            this.addMessage(response);
            
            // Track AI interaction
            if (window.masumasuAnalytics) {
                window.masumasuAnalytics.trackAIMessage(message, response);
            }
        }, 1500);
    }

    showTypingIndicator() {
        const messagesContainer = document.getElementById('ai-chat-messages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'ai-message typing-indicator';
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = `
            <div class="message-avatar">🍶</div>
            <div class="message-content">
                <div class="typing-dots">
                    <span></span><span></span><span></span>
                </div>
            </div>
        `;
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    generateResponse(userMessage) {
        const message = userMessage.toLowerCase();
        const kb = this.knowledgeBase[this.currentLanguage];

        // Product-specific responses
        if (message.includes('純米吟醸') || message.includes('junmai ginjo')) {
            return kb.products.junmaiGinjo;
        }
        if (message.includes('本醸造') || message.includes('honjozo')) {
            return kb.products.honjozo;
        }
        if (message.includes('スパークリング') || message.includes('sparkling')) {
            return kb.products.sparkling;
        }
        if (message.includes('古酒') || message.includes('vintage')) {
            return kb.products.vintage;
        }
        if (message.includes('梅酒') || message.includes('plum')) {
            return kb.products.plum;
        }

        // General topic responses
        if (message.includes('歴史') || message.includes('創業') || message.includes('history')) {
            return kb.brewery.history;
        }
        if (message.includes('醸造') || message.includes('製造') || message.includes('brewing')) {
            return kb.brewing.process;
        }
        if (message.includes('水') || message.includes('water')) {
            return kb.brewing.water;
        }
        if (message.includes('米') || message.includes('rice')) {
            return kb.brewing.rice;
        }
        if (message.includes('温度') || message.includes('飲み方') || message.includes('temperature')) {
            return kb.tasting.temperature;
        }
        if (message.includes('料理') || message.includes('相性') || message.includes('pairing')) {
            return kb.tasting.pairing;
        }
        if (message.includes('グラス') || message.includes('器') || message.includes('serving')) {
            return kb.tasting.serving;
        }

        // Default responses
        const defaultResponses = [
            `ご質問ありがとうございます。益々酒造では5つの銘柄をご用意しております：純米吟醸、本醸造、スパークリング清酒、古酒、梅酒。どちらについて詳しくお聞きになりたいですか？`,
            `300年の歴史を持つ益々酒造として、${message}について詳しくご説明させていただきます。具体的にどのような点についてお知りになりたいでしょうか？`,
            `日本酒に関するご質問ですね。新潟県の伝統的な製法で醸造している私たちの酒について、もう少し具体的にお聞かせください。`,
            `興味深いご質問ですね。益々酒造の杜氏として、${message}についてお答えします。どの銘柄や製法について詳しく知りたいですか？`
        ];

        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }

    handleQuickQuestion(questionType) {
        const kb = this.knowledgeBase[this.currentLanguage];
        let response = '';

        switch (questionType) {
            case 'brewery':
                response = kb.brewery.history;
                break;
            case 'products':
                response = '益々酒造では5つの銘柄をご用意しております：\n\n🍶 純米吟醸「益々」- フルーティーな香りと軽快な味わい\n🍶 本醸造「益々」- クラシックな辛口\n🍶 スパークリング清酒「益々」- 華やかな泡\n🍶 古酒「益々」- 5年熟成の深い味わい\n🍶 梅酒「益々」- 上品な梅の香り\n\nどちらについて詳しくお聞きになりたいですか？';
                break;
            case 'brewing':
                response = kb.brewing.process;
                break;
            case 'pairing':
                response = kb.tasting.pairing;
                break;
        }

        this.addMessage(response);
    }

    updateLanguage() {
        // Update chat interface language
        const greeting = this.knowledgeBase[this.currentLanguage].greeting;
        const welcomeMessage = document.querySelector('.welcome-message .message-content');
        if (welcomeMessage) {
            welcomeMessage.innerHTML = `<strong>AI杜氏:</strong> ${greeting}`;
        }

        // Update placeholder
        const input = document.getElementById('ai-chat-input');
        if (input) {
            const placeholders = {
                ja: '質問を入力してください...',
                en: 'Enter your question...',
                fr: 'Entrez votre question...',
                zh: '请输入您的问题...'
            };
            input.placeholder = placeholders[this.currentLanguage];
        }
    }
}

// CSS Styles for AI Chat
const chatStyles = `
<style>
.ai-chat-widget {
    position: fixed;
    bottom: 30px;
    right: 30px;
    z-index: 1000;
    font-family: var(--font-primary, 'Noto Sans JP', sans-serif);
}

.ai-chat-toggle {
    background: var(--gradient-accent, linear-gradient(135deg, #D4AF37 0%, #F4E4A6 100%));
    color: white;
    border: none;
    padding: 16px 24px;
    border-radius: 50px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 4px 20px rgba(212, 175, 55, 0.3);
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
}

.ai-chat-toggle:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(212, 175, 55, 0.4);
}

.ai-chat-window {
    position: absolute;
    bottom: 80px;
    right: 0;
    width: 400px;
    height: 500px;
    background: white;
    border-radius: 20px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border: 1px solid rgba(212, 175, 55, 0.2);
}

.ai-chat-header {
    background: var(--gradient-accent, linear-gradient(135deg, #D4AF37 0%, #F4E4A6 100%));
    color: white;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.ai-chat-title h4 {
    margin: 0;
    font-size: 1.2rem;
    font-weight: 700;
}

.ai-status {
    font-size: 0.8rem;
    opacity: 0.9;
    display: flex;
    align-items: center;
    gap: 4px;
}

.ai-status.online::before {
    content: '●';
    color: #22c55e;
    font-size: 0.6rem;
}

.ai-chat-close {
    background: none;
    border: none;
    color: white;
    font-size: 1.8rem;
    cursor: pointer;
    padding: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background 0.2s ease;
}

.ai-chat-close:hover {
    background: rgba(255, 255, 255, 0.2);
}

.ai-chat-messages {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    max-height: 300px;
    scroll-behavior: smooth;
}

.ai-message, .user-message {
    margin-bottom: 20px;
    display: flex;
    align-items: flex-start;
    gap: 12px;
    animation: messageSlide 0.3s ease-out;
}

.user-message {
    flex-direction: row-reverse;
    text-align: right;
}

.message-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: var(--gradient-accent);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    flex-shrink: 0;
}

.message-content {
    background: #f8f9fa;
    padding: 12px 16px;
    border-radius: 16px;
    line-height: 1.5;
    max-width: 280px;
    word-wrap: break-word;
}

.user-message .message-content {
    background: var(--color-accent, #D4AF37);
    color: white;
}

.ai-message.welcome-message .message-content {
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    border: 2px solid var(--color-accent, #D4AF37);
}

.typing-indicator .message-content {
    background: #f8f9fa;
    padding: 16px;
}

.typing-dots {
    display: flex;
    gap: 4px;
    align-items: center;
}

.typing-dots span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #9ca3af;
    animation: typing 1.4s infinite ease-in-out;
}

.typing-dots span:nth-child(2) {
    animation-delay: 0.2s;
}

.typing-dots span:nth-child(3) {
    animation-delay: 0.4s;
}

.ai-chat-input {
    display: flex;
    padding: 16px 20px;
    border-top: 1px solid #e5e7eb;
    gap: 12px;
    background: white;
}

.ai-chat-input input {
    flex: 1;
    padding: 12px 16px;
    border: 1px solid #e5e7eb;
    border-radius: 25px;
    font-size: 0.9rem;
    outline: none;
    transition: border-color 0.2s ease;
}

.ai-chat-input input:focus {
    border-color: var(--color-accent, #D4AF37);
}

.ai-chat-input button {
    background: var(--color-accent, #D4AF37);
    color: white;
    border: none;
    padding: 12px 20px;
    border-radius: 25px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.2s ease;
}

.ai-chat-input button:hover {
    background: #c19b2e;
    transform: translateY(-1px);
}

.ai-quick-questions {
    padding: 16px 20px;
    border-top: 1px solid #e5e7eb;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    background: #f8f9fa;
}

.quick-question {
    background: white;
    border: 1px solid #e5e7eb;
    color: var(--color-primary, #1A1611);
    padding: 8px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.2s ease;
}

.quick-question:hover {
    background: var(--color-accent, #D4AF37);
    color: white;
    border-color: var(--color-accent, #D4AF37);
}

@keyframes messageSlide {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
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
    .ai-chat-widget {
        bottom: 20px;
        right: 20px;
    }
    
    .ai-chat-window {
        width: 320px;
        height: 450px;
    }
    
    .ai-chat-messages {
        padding: 16px;
    }
    
    .message-content {
        max-width: 220px;
    }
}
</style>
`;

// Initialize AI Chat when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add styles to head
    document.head.insertAdjacentHTML('beforeend', chatStyles);
    
    // Initialize AI Chat
    window.masumasuAI = new MasumasuAI();
});