// Simple AI Sakura Chat - 確実に動作するシンプル版
(function() {
    'use strict';

    console.log('Simple AI Sakura Chat loading...');

    // チャット状態
    let chatOpen = false;
    let messageCount = 0;

    // 日本酒関連の応答データベース
    const responses = {
        greetings: [
            'こんにちは！AIサクラです🌸 益々酒造へようこそ！日本酒について何でもお聞きください。',
            'いらっしゃいませ！私は益々酒造のAI杜氏、サクラです🌸 お気軽にご質問ください。'
        ],
        recommendations: [
            '当蔵のおすすめは純米吟醸「益々」です！フルーティーな香りとすっきりとした味わいが特徴で、初心者の方にも飲みやすい一本です。🍶',
            'スパークリング清酒もとても人気です！シャンパンのような泡立ちで、お祝いの席にピッタリです✨',
            '古酒「益々」は熟成された深い味わいが楽しめます。日本酒上級者の方におすすめです！'
        ],
        pairings: [
            '純米吟醸は刺身や寿司との相性が抜群です🍣 また、天ぷらや焼き鳥にもよく合います。',
            '梅酒「益々」はバニラアイスクリームとの相性が最高です🍨 デザート酒としてお楽しみください。',
            'スパークリング清酒は前菜やサラダ、チーズとの相性が良いです🧀'
        ],
        serving: [
            '純米吟醸は冷やして（5-10℃）お召し上がりください❄️ 香りが引き立ちます。',
            '本醸造は常温またはぬる燗（40-45℃）がおすすめです🌡️',
            'スパークリング清酒はよく冷やして、シャンパングラスでお楽しみください🥂'
        ],
        visit: [
            '酒蔵見学ツアーを開催しています！スタンダードツアー（90分・3,000円）とプレミアムツアー（3時間・10,000円）があります。事前予約をお願いします📞',
            '醸造工程の見学や、杜氏による解説、テイスティング体験もお楽しみいただけます🏭'
        ],
        price: [
            '商品価格は720mlで2,000円～5,000円の範囲です💰 詳しくは商品ページをご覧ください。',
            'ギフト包装も承っております🎁 特別な日の贈り物にいかがでしょうか。'
        ],
        default: [
            '申し訳ございませんが、その件についてはお電話でお問い合わせください📞 025-123-4567',
            'より詳しい情報は当蔵のスタッフがご案内いたします。お気軽にお問い合わせください✨',
            'その他のご質問がございましたら、お問い合わせページからご連絡ください📧'
        ]
    };

    // チャットUIを作成
    function createChatUI() {
        const chatHTML = `
            <div id="sakura-chat-overlay" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 9998;">
            </div>
            <div id="sakura-chat-container" style="display: none; position: fixed; bottom: 20px; right: 20px; width: 350px; height: 500px; background: white; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); z-index: 9999; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                <!-- ヘッダー -->
                <div style="background: linear-gradient(135deg, #ff6b8a 0%, #ff8e8e 100%); color: white; padding: 15px; border-radius: 15px 15px 0 0; display: flex; justify-content: space-between; align-items: center;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span style="font-size: 1.5em;">🌸</span>
                        <div>
                            <div style="font-weight: bold; font-size: 1.1em;">AIサクラ</div>
                            <div style="font-size: 0.8em; opacity: 0.9;">益々酒造 AI杜氏</div>
                        </div>
                    </div>
                    <button onclick="closeSakuraChat()" style="background: none; border: none; color: white; font-size: 1.5em; cursor: pointer; padding: 5px;">×</button>
                </div>
                
                <!-- メッセージエリア -->
                <div id="sakura-messages" style="height: 350px; overflow-y: auto; padding: 15px; background: #f8f9fa;">
                    <div style="background: white; padding: 12px; border-radius: 10px; margin-bottom: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 5px;">
                            <span>🌸</span>
                            <strong style="color: #ff6b8a;">AIサクラ</strong>
                        </div>
                        <div>こんにちは！AIサクラです🌸<br>益々酒造について何でもお聞きください！</div>
                    </div>
                </div>
                
                <!-- クイック返信ボタン -->
                <div style="padding: 10px; background: #f1f3f4; display: flex; gap: 5px; flex-wrap: wrap;">
                    <button onclick="sendQuickMessage('おすすめの日本酒は？')" style="background: #e3f2fd; border: 1px solid #bbdefb; border-radius: 15px; padding: 5px 10px; font-size: 0.8em; cursor: pointer;">おすすめ</button>
                    <button onclick="sendQuickMessage('料理との相性は？')" style="background: #e8f5e8; border: 1px solid #c8e6c9; border-radius: 15px; padding: 5px 10px; font-size: 0.8em; cursor: pointer;">ペアリング</button>
                    <button onclick="sendQuickMessage('飲み方を教えて')" style="background: #fff3e0; border: 1px solid #ffcc02; border-radius: 15px; padding: 5px 10px; font-size: 0.8em; cursor: pointer;">飲み方</button>
                    <button onclick="sendQuickMessage('見学できますか？')" style="background: #fce4ec; border: 1px solid #f8bbd9; border-radius: 15px; padding: 5px 10px; font-size: 0.8em; cursor: pointer;">見学</button>
                </div>
                
                <!-- 入力エリア -->
                <div style="padding: 10px; display: flex; gap: 8px; border-top: 1px solid #e0e0e0;">
                    <input type="text" id="sakura-input" placeholder="メッセージを入力..." style="flex: 1; padding: 10px; border: 1px solid #ddd; border-radius: 20px; outline: none; font-size: 0.9em;" onkeypress="handleEnterKey(event)">
                    <button onclick="sendMessage()" style="background: linear-gradient(135deg, #ff6b8a 0%, #ff8e8e 100%); color: white; border: none; border-radius: 50%; width: 40px; height: 40px; cursor: pointer; display: flex; align-items: center; justify-content: center;">
                        <span style="font-size: 1.2em;">→</span>
                    </button>
                </div>
            </div>
            
            <!-- モバイル用チャットボタン -->
            <div id="sakura-chat-button" style="position: fixed; bottom: 80px; left: 50%; transform: translateX(-50%); z-index: 9997;">
                <button onclick="openSakuraChat()" style="background: linear-gradient(135deg, #ff6b8a 0%, #ff8e8e 100%); color: white; border: none; padding: 12px 24px; border-radius: 25px; font-size: 0.9em; font-weight: bold; cursor: pointer; box-shadow: 0 4px 15px rgba(255, 107, 138, 0.4); transition: all 0.3s ease;">
                    🌸 AIサクラに相談する
                </button>
            </div>
        `;

        // モバイルスタイル
        const mobileStyle = `
            <style>
            @media (max-width: 768px) {
                #sakura-chat-container {
                    width: 100% !important;
                    height: 100% !important;
                    bottom: 0 !important;
                    right: 0 !important;
                    border-radius: 0 !important;
                }
            }
            </style>
        `;

        document.head.insertAdjacentHTML('beforeend', mobileStyle);
        document.body.insertAdjacentHTML('beforeend', chatHTML);
    }

    // チャット開く
    window.openSakuraChat = function() {
        console.log('Opening Sakura Chat');
        const container = document.getElementById('sakura-chat-container');
        const overlay = document.getElementById('sakura-chat-overlay');
        const button = document.getElementById('sakura-chat-button');
        
        if (container && overlay && button) {
            container.style.display = 'block';
            overlay.style.display = 'block';
            button.style.display = 'none';
            chatOpen = true;
            
            // 入力フィールドにフォーカス
            setTimeout(() => {
                const input = document.getElementById('sakura-input');
                if (input) input.focus();
            }, 100);
        }
    };

    // チャット閉じる
    window.closeSakuraChat = function() {
        console.log('Closing Sakura Chat');
        const container = document.getElementById('sakura-chat-container');
        const overlay = document.getElementById('sakura-chat-overlay');
        const button = document.getElementById('sakura-chat-button');
        
        if (container && overlay && button) {
            container.style.display = 'none';
            overlay.style.display = 'none';
            button.style.display = 'block';
            chatOpen = false;
        }
    };

    // メッセージ送信
    window.sendMessage = function() {
        const input = document.getElementById('sakura-input');
        if (!input || !input.value.trim()) return;
        
        const message = input.value.trim();
        addUserMessage(message);
        input.value = '';
        
        // AI応答を生成
        setTimeout(() => {
            const response = generateResponse(message);
            addAIMessage(response);
        }, 500);
    };

    // クイック返信
    window.sendQuickMessage = function(message) {
        addUserMessage(message);
        setTimeout(() => {
            const response = generateResponse(message);
            addAIMessage(response);
        }, 500);
    };

    // Enterキー処理
    window.handleEnterKey = function(event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    // ユーザーメッセージ追加
    function addUserMessage(message) {
        const messagesDiv = document.getElementById('sakura-messages');
        const messageHTML = `
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px; border-radius: 10px; margin-bottom: 10px; margin-left: 20px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 5px;">
                    <span>👤</span>
                    <strong>あなた</strong>
                </div>
                <div>${message}</div>
            </div>
        `;
        messagesDiv.insertAdjacentHTML('beforeend', messageHTML);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    // AI応答追加
    function addAIMessage(message) {
        const messagesDiv = document.getElementById('sakura-messages');
        const messageHTML = `
            <div style="background: white; padding: 12px; border-radius: 10px; margin-bottom: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 5px;">
                    <span>🌸</span>
                    <strong style="color: #ff6b8a;">AIサクラ</strong>
                </div>
                <div>${message}</div>
            </div>
        `;
        messagesDiv.insertAdjacentHTML('beforeend', messageHTML);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    // 応答生成
    function generateResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // 挨拶
        if (lowerMessage.includes('こんにちは') || lowerMessage.includes('こんばんは') || lowerMessage.includes('はじめまして')) {
            return responses.greetings[Math.floor(Math.random() * responses.greetings.length)];
        }
        
        // おすすめ
        if (lowerMessage.includes('おすすめ') || lowerMessage.includes('人気') || lowerMessage.includes('どれが')) {
            return responses.recommendations[Math.floor(Math.random() * responses.recommendations.length)];
        }
        
        // ペアリング・料理
        if (lowerMessage.includes('料理') || lowerMessage.includes('相性') || lowerMessage.includes('合う') || lowerMessage.includes('ペアリング')) {
            return responses.pairings[Math.floor(Math.random() * responses.pairings.length)];
        }
        
        // 飲み方・温度
        if (lowerMessage.includes('飲み方') || lowerMessage.includes('温度') || lowerMessage.includes('冷や') || lowerMessage.includes('燗')) {
            return responses.serving[Math.floor(Math.random() * responses.serving.length)];
        }
        
        // 見学・ツアー
        if (lowerMessage.includes('見学') || lowerMessage.includes('ツアー') || lowerMessage.includes('訪問')) {
            return responses.visit[Math.floor(Math.random() * responses.visit.length)];
        }
        
        // 価格
        if (lowerMessage.includes('価格') || lowerMessage.includes('値段') || lowerMessage.includes('いくら') || lowerMessage.includes('円')) {
            return responses.price[Math.floor(Math.random() * responses.price.length)];
        }
        
        // デフォルト応答
        return responses.default[Math.floor(Math.random() * responses.default.length)];
    }

    // 初期化
    function init() {
        console.log('Initializing Simple AI Sakura Chat');
        createChatUI();
        
        // 既存のopenAIChat関数を上書き
        window.openAIChat = window.openSakuraChat;
        
        console.log('Simple AI Sakura Chat initialized successfully');
    }

    // DOMが読み込まれたら初期化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();