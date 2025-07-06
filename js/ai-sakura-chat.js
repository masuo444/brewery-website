// AI Sakura Chat - 完全実装版 v4.0
(function() {
    'use strict';

    console.log('🌸 AI Sakura Chat v4.0 - Complete Implementation Loading...');

    // チャット状態管理
    let chatState = {
        isOpen: false,
        messageCount: 0,
        isInitialized: false
    };

    // 益々酒造データベース
    const masumasuData = {
        company: {
            name: "株式会社益々酒造",
            nameEn: "Masumasu Brewing Co., Ltd.",
            founded: "1724年（享保9年）",
            history: "300年の歴史を持つ老舗酒蔵",
            location: "新潟県清流町",
            philosophy: "伝統を守り、革新を追求し、世界に日本酒の素晴らしさを伝える"
        },
        products: [
            {
                name: "純米吟醸「益々」",
                price: "3,500円（720ml）",
                description: "メロンやリンゴを思わせるフルーティーな香り",
                pairing: "鶏肉のハーブ焼き、カプレーゼ"
            },
            {
                name: "本醸造「益々」", 
                price: "2,200円（720ml）",
                description: "スッキリとした辛口で、抜群のキレ",
                pairing: "おでん、天ぷら、枝豆"
            },
            {
                name: "スパークリング清酒「益々」",
                price: "4,500円（720ml）", 
                description: "きめ細やかな泡と、爽やかな酸味",
                pairing: "生牡蠣、カナッペ、デザート"
            }
        ]
    };

    // チャット応答システム
    function generateResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        if (message.includes('おすすめ') || message.includes('推奨')) {
            return `🌸 おすすめは純米吟醸「益々」です！\n\nメロンやリンゴを思わせるフルーティーな香りが特徴で、軽快でキレの良い後味をお楽しみいただけます。\n\n価格：3,500円（720ml）\nペアリング：鶏肉のハーブ焼き、カプレーゼ\n\n他にもご質問がございましたら、お気軽にお聞かせください！`;
        }
        
        if (message.includes('料理') || message.includes('ペアリング') || message.includes('相性')) {
            return `🍽️ お料理との相性についてご案内いたします！\n\n【純米吟醸】鶏肉のハーブ焼き、カプレーゼ、シーフードサラダ\n【本醸造】おでん、天ぷら、枝豆\n【スパークリング】生牡蠣、カナッペ、デザート\n\nどのようなお料理をご予定でしょうか？`;
        }
        
        if (message.includes('飲み方') || message.includes('温度')) {
            return `🍶 美味しい飲み方をご紹介いたします！\n\n【純米吟醸】冷酒（10-15℃）がおすすめ\n【本醸造】常温または熱燗で\n【スパークリング】よく冷やして（5℃）シャンパングラスで\n\nお好みの温度でお楽しみください！`;
        }
        
        if (message.includes('見学') || message.includes('ツアー')) {
            return `🏭 酒蔵見学についてご案内いたします！\n\n【スタンダードツアー】\n時間：90分 / 料金：3,000円\n醸造工程見学、3種テイスティング付き\n\n【プレミアムツアー】\n時間：3時間 / 料金：10,000円\n杜氏による特別解説、懐石料理ペアリング\n\nご予約は3日前までにお願いいたします！`;
        }
        
        if (message.includes('価格') || message.includes('値段')) {
            return `💰 商品価格をご案内いたします！\n\n• 純米吟醸「益々」：3,500円（720ml）\n• 本醸造「益々」：2,200円（720ml）\n• スパークリング清酒「益々」：4,500円（720ml）\n\n全国発送も承っております。詳しくはお問い合わせください！`;
        }
        
        // デフォルト応答
        return `🌸 ありがとうございます！\n\n益々酒造について、お答えできることは：\n\n🍶 おすすめの日本酒\n🍽️ お料理との相性\n🌡️ 美味しい飲み方\n🏭 酒蔵見学・ツアー\n💰 価格について\n\nどのようなことをお知りになりたいですか？`;
    }

    // チャットUI作成
    function createChatUI() {
        if (document.getElementById('sakura-chat-container')) {
            console.log('Chat UI already exists');
            return;
        }

        const chatHTML = `
            <div id="sakura-chat-container" style="
                position: fixed;
                bottom: 100px;
                right: 20px;
                width: min(400px, calc(100vw - 40px));
                height: min(600px, 70vh);
                background: linear-gradient(135deg, #FFFFFF 0%, #FEFEFD 50%, #F8F9FA 100%);
                border-radius: 28px 28px 28px 8px;
                box-shadow: 0 20px 60px rgba(248, 187, 217, 0.4), 0 8px 32px rgba(240, 166, 202, 0.3);
                z-index: 10000;
                display: none;
                flex-direction: column;
                border: 3px solid rgba(248, 187, 217, 0.6);
                backdrop-filter: blur(16px);
                font-family: 'Noto Sans JP', sans-serif;
            ">
                <!-- ヘッダー -->
                <div style="
                    background: linear-gradient(135deg, #F8BBD9 0%, #FADADD 30%, #F0A6CA 70%, #FFE4E1 100%);
                    color: #2D1B2F;
                    padding: 24px;
                    border-radius: 28px 28px 0 0;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    box-shadow: 0 4px 16px rgba(248, 187, 217, 0.3);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.7);
                ">
                    <div>
                        <div style="font-weight: 800; font-size: 1.3em; color: #2D1B2F;">AIサクラ</div>
                        <div style="font-size: 0.9em; opacity: 0.85; color: #3D2A3F; font-weight: 600;">益々酒造 AIアシスタント 🌸</div>
                        <div style="font-size: 0.75em; color: #4D3A4F; margin-top: 2px;">やさしく相談に乗ります</div>
                    </div>
                    <button onclick="closeSakuraChat()" style="
                        background: linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(248, 187, 217, 0.4));
                        border: 3px solid rgba(93, 78, 117, 0.3);
                        color: #2D1B2F;
                        font-size: 1.6em;
                        cursor: pointer;
                        padding: 8px;
                        border-radius: 50%;
                        width: 44px;
                        height: 44px;
                        transition: all 0.3s ease;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-weight: 700;
                    " onmouseover="this.style.background='linear-gradient(135deg, rgba(255,255,255,0.9), rgba(240,166,202,0.6))'; this.style.transform='scale(1.1)'" onmouseout="this.style.background='linear-gradient(135deg, rgba(255,255,255,0.8), rgba(248,187,217,0.4))'; this.style.transform='scale(1)'">×</button>
                </div>

                <!-- クイックボタン -->
                <div style="padding: 20px; border-bottom: 1px solid rgba(248, 187, 217, 0.3);">
                    <div style="display: flex; gap: 8px; flex-wrap: wrap; justify-content: center;">
                        <button onclick="sendQuickMessage('おすすめの日本酒は？')" style="
                            background: linear-gradient(145deg, #F8BBD9 0%, #FADADD 50%, #FFE4E1 100%);
                            border: 2px solid rgba(248, 187, 217, 0.6);
                            border-radius: 22px;
                            padding: 10px 16px;
                            font-size: 0.8em;
                            cursor: pointer;
                            color: #2D1B2F;
                            font-weight: 700;
                            transition: all 0.3s ease;
                        " onmouseover="this.style.transform='translateY(-3px) scale(1.05)'" onmouseout="this.style.transform='translateY(0) scale(1)'">🌸 おすすめ</button>
                        <button onclick="sendQuickMessage('料理との相性は？')" style="
                            background: linear-gradient(145deg, #F8BBD9 0%, #FADADD 50%, #FFE4E1 100%);
                            border: 2px solid rgba(248, 187, 217, 0.6);
                            border-radius: 22px;
                            padding: 10px 16px;
                            font-size: 0.8em;
                            cursor: pointer;
                            color: #2D1B2F;
                            font-weight: 700;
                            transition: all 0.3s ease;
                        " onmouseover="this.style.transform='translateY(-3px) scale(1.05)'" onmouseout="this.style.transform='translateY(0) scale(1)'">🍽️ ペアリング</button>
                        <button onclick="sendQuickMessage('飲み方を教えて')" style="
                            background: linear-gradient(145deg, #F8BBD9 0%, #FADADD 50%, #FFE4E1 100%);
                            border: 2px solid rgba(248, 187, 217, 0.6);
                            border-radius: 22px;
                            padding: 10px 16px;
                            font-size: 0.8em;
                            cursor: pointer;
                            color: #2D1B2F;
                            font-weight: 700;
                            transition: all 0.3s ease;
                        " onmouseover="this.style.transform='translateY(-3px) scale(1.05)'" onmouseout="this.style.transform='translateY(0) scale(1)'">🍶 飲み方</button>
                    </div>
                </div>

                <!-- メッセージエリア -->
                <div id="sakura-messages" style="
                    flex: 1;
                    padding: 20px;
                    overflow-y: auto;
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                    background: linear-gradient(135deg, #FFFFFF 0%, #FEFEFD 100%);
                ">
                    <div style="
                        background: linear-gradient(135deg, #FFFFFF 0%, #FEFEFD 50%, #F8F9FA 100%);
                        color: #2D1B2F;
                        padding: 20px 24px;
                        border-radius: 12px 28px 28px 28px;
                        box-shadow: 0 6px 20px rgba(248, 187, 217, 0.25);
                        border: 2px solid rgba(248, 187, 217, 0.4);
                        position: relative;
                    ">
                        <div style="font-size: 1.05em; line-height: 1.7; font-weight: 500; color: #2D1B2F;">
                            🌸 こんにちは！益々酒造のAIサクラです。<br><br>
                            日本酒のことなら何でもお聞きください！<br>
                            おすすめの銘柄、お料理との相性、飲み方など、お気軽にご相談ください。
                        </div>
                        <div style="position: absolute; bottom: 6px; right: 16px; font-size: 0.75em; color: #4D3A4F; font-weight: 700; opacity: 0.9;">AIサクラ</div>
                    </div>
                </div>

                <!-- 入力エリア -->
                <div style="
                    padding: 20px;
                    border-top: 1px solid rgba(248, 187, 217, 0.3);
                    background: linear-gradient(135deg, #FEFEFD 0%, #F8F9FA 100%);
                    border-radius: 0 0 28px 28px;
                ">
                    <div style="display: flex; gap: 12px; align-items: flex-end;">
                        <input type="text" id="sakura-input" placeholder="✨ メッセージを入力してください... 🌸" style="
                            flex: 1;
                            padding: 16px 20px;
                            border: 3px solid rgba(248, 187, 217, 0.6);
                            border-radius: 28px;
                            outline: none;
                            font-size: 1em;
                            background: linear-gradient(135deg, #FFFFFF 0%, #FEFEFD 100%);
                            color: #2D1B2F;
                            box-shadow: inset 0 3px 6px rgba(248, 187, 217, 0.15);
                            transition: all 0.3s ease;
                            font-weight: 500;
                        " onkeypress="handleEnterKey(event)" onfocus="this.style.borderColor='rgba(240, 166, 202, 0.8)'" onblur="this.style.borderColor='rgba(248, 187, 217, 0.6)'">
                        <button onclick="sendMessage()" style="
                            background: linear-gradient(135deg, #F8BBD9 0%, #F0A6CA 40%, #FADADD 100%);
                            color: #2D1B2F;
                            border: 2px solid rgba(248, 187, 217, 0.6);
                            border-radius: 50%;
                            width: 52px;
                            height: 52px;
                            cursor: pointer;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            box-shadow: 0 6px 16px rgba(248, 187, 217, 0.4);
                            transition: all 0.3s ease;
                            font-size: 1.4em;
                            font-weight: 700;
                        " onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">📤</button>
                    </div>
                </div>
            </div>

            <!-- モバイル用スタイル -->
            <style>
                @media (max-width: 768px) {
                    #sakura-chat-container {
                        bottom: 90px !important;
                        right: 10px !important;
                        left: 10px !important;
                        width: calc(100vw - 20px) !important;
                        height: min(55vh, 480px) !important;
                        border-radius: 20px 20px 20px 4px !important;
                    }
                }
            </style>
        `;

        document.body.insertAdjacentHTML('beforeend', chatHTML);
        chatState.isInitialized = true;
        console.log('🌸 Chat UI created successfully');
    }

    // チャットを開く
    function openSakuraChat() {
        console.log('🌸 Opening Sakura Chat...');
        
        if (!chatState.isInitialized) {
            createChatUI();
        }
        
        const chatContainer = document.getElementById('sakura-chat-container');
        if (chatContainer) {
            chatContainer.style.display = 'flex';
            chatState.isOpen = true;
            console.log('🌸 Chat opened successfully');
        } else {
            console.error('Chat container not found');
        }
    }

    // チャットを閉じる
    function closeSakuraChat() {
        console.log('🌸 Closing Sakura Chat...');
        const chatContainer = document.getElementById('sakura-chat-container');
        if (chatContainer) {
            chatContainer.style.display = 'none';
            chatState.isOpen = false;
        }
    }

    // メッセージ送信
    function sendMessage() {
        const input = document.getElementById('sakura-input');
        if (!input || !input.value.trim()) return;

        const userMessage = input.value.trim();
        addUserMessage(userMessage);
        input.value = '';

        // AI応答（少し遅延して自然に）
        setTimeout(() => {
            const aiResponse = generateResponse(userMessage);
            addAIMessage(aiResponse);
        }, 800);
    }

    // クイックメッセージ送信
    function sendQuickMessage(message) {
        addUserMessage(message);
        setTimeout(() => {
            const aiResponse = generateResponse(message);
            addAIMessage(aiResponse);
        }, 600);
    }

    // ユーザーメッセージ追加
    function addUserMessage(message) {
        const messagesContainer = document.getElementById('sakura-messages');
        if (!messagesContainer) return;

        const messageHTML = `
            <div style="display: flex; justify-content: flex-end; margin: 8px 0;">
                <div style="
                    background: linear-gradient(135deg, #F8BBD9 0%, #F0A6CA 50%, #FADADD 100%);
                    color: #2D1B2F;
                    padding: 18px 22px;
                    border-radius: 25px 25px 8px 25px;
                    max-width: 80%;
                    box-shadow: 0 6px 16px rgba(248, 187, 217, 0.4);
                    position: relative;
                    border: 2px solid rgba(248, 187, 217, 0.3);
                    font-weight: 600;
                ">
                    ${message}
                    <div style="position: absolute; bottom: -2px; right: 10px; font-size: 0.75em; opacity: 0.8; font-weight: 500; color: #3D2A3F;">You</div>
                </div>
            </div>
        `;
        
        messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        chatState.messageCount++;
    }

    // AI メッセージ追加
    function addAIMessage(message) {
        const messagesContainer = document.getElementById('sakura-messages');
        if (!messagesContainer) return;

        const messageHTML = `
            <div style="display: flex; justify-content: flex-start; margin: 8px 0;">
                <div style="
                    background: linear-gradient(135deg, #FFFFFF 0%, #FEFEFD 50%, #F8F9FA 100%);
                    color: #2D1B2F;
                    padding: 20px 24px;
                    border-radius: 12px 28px 28px 28px;
                    max-width: 85%;
                    box-shadow: 0 6px 20px rgba(248, 187, 217, 0.25);
                    border: 2px solid rgba(248, 187, 217, 0.4);
                    position: relative;
                ">
                    <div style="font-size: 1.05em; line-height: 1.7; white-space: pre-line; font-weight: 500; color: #2D1B2F;">${message}</div>
                    <div style="position: absolute; bottom: 6px; right: 16px; font-size: 0.75em; color: #4D3A4F; font-weight: 700; opacity: 0.9;">AIサクラ</div>
                </div>
            </div>
        `;
        
        messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // エンターキー処理
    function handleEnterKey(event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    }

    // グローバル関数として公開
    window.openSakuraChat = openSakuraChat;
    window.closeSakuraChat = closeSakuraChat;
    window.sendMessage = sendMessage;
    window.sendQuickMessage = sendQuickMessage;
    window.handleEnterKey = handleEnterKey;

    // 初期化
    function initializeChatSystem() {
        console.log('🌸 Initializing AI Sakura Chat System v4.0');
        
        // DOMが準備できてから実行
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                createChatUI();
                console.log('🌸 AI Sakura Chat System v4.0 initialized successfully');
            });
        } else {
            createChatUI();
            console.log('🌸 AI Sakura Chat System v4.0 initialized successfully');
        }
    }

    // システム初期化
    initializeChatSystem();

    console.log('🌸 AI Sakura Chat v4.0 - Complete Implementation Loaded Successfully!');

})();