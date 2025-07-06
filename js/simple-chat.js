// Simple AI Sakura Chat - 確実に動作するシンプル版
(function() {
    'use strict';

    console.log('Simple AI Sakura Chat loading...');

    // チャット状態
    let chatOpen = false;
    let messageCount = 0;

    // 益々酒造の詳細情報データベース
    const masumasuInfo = {
        company: {
            name: "株式会社益々酒造",
            nameEn: "Masumasu Brewing Co., Ltd.",
            founded: "1724年（享保9年）",
            history: "300年の歴史を持つ老舗酒蔵",
            location: "新潟県清流町",
            employees: "145名（杜氏12名含む）",
            production: "年間2,800石（約504,000L）",
            exports: "35%（15ヶ国・地域）",
            philosophy: "伝統を守り、革新を追求し、世界に日本酒の素晴らしさを伝える"
        },
        products: {
            junmaiGinjo: {
                name: "純米吟醸「益々」",
                price: "3,500円（720ml）",
                alcohol: "15.5%",
                rice: "五百万石（新潟県清流町産）",
                polishRatio: "50%",
                description: "メロンやリンゴを思わせるフルーティーな香り。軽快でキレの良い後味。",
                serving: "冷酒（10-15℃）",
                pairing: "鶏肉のハーブ焼き、カプレーゼ、シーフードサラダ"
            },
            honjozo: {
                name: "本醸造「益々」",
                price: "2,200円（720ml）",
                alcohol: "15.0%",
                rice: "こしいぶき（新潟県産）",
                polishRatio: "65%",
                description: "スッキリとした辛口で、抜群のキレ。毎日の晩酌に寄り添う味わい。",
                serving: "常温・熱燗",
                pairing: "おでん、天ぷら、枝豆"
            },
            sparkling: {
                name: "スパークリング清酒「益々」",
                price: "4,500円（720ml）",
                alcohol: "12.0%",
                rice: "五百万石（新潟県清流町産）",
                description: "きめ細やかな泡と、爽やかな酸味。乾杯シーンを華やかに彩る。",
                serving: "よく冷やして（5℃）シャンパングラス推奨",
                pairing: "生牡蠣、カナッペ、デザート"
            },
            vintage: {
                name: "古酒「益々」",
                price: "12,000円（720ml）",
                alcohol: "18.0%",
                rice: "五百万石（新潟県清流町産）",
                polishRatio: "65%",
                aging: "5年以上熟成",
                description: "カラメルやナッツのような熟成香と、まろやかで深みのある味わい。",
                serving: "常温・ぬる燗",
                pairing: "中華料理、鰻の蒲焼、ドライフルーツ",
                limited: true,
                stock: 15
            },
            plumWine: {
                name: "梅酒「益々」",
                price: "3,200円（720ml）",
                alcohol: "12.0%",
                base: "益々酒造 純米酒",
                description: "純米酒で漬け込んだ、上品な梅の香りと、すっきりとした甘さ。",
                serving: "ロック・ソーダ割り",
                pairing: "食前酒として、バニラアイス"
            }
        },
        tours: {
            standard: {
                name: "スタンダードツアー",
                duration: "90分",
                price: "3,000円",
                capacity: "20名",
                times: "10:00、14:00",
                includes: "酒蔵の歴史紹介、醸造工程見学、3種類テイスティング、お土産"
            },
            premium: {
                name: "プレミアムツアー",
                duration: "3時間",
                price: "10,000円",
                capacity: "8名",
                times: "11:00",
                includes: "杜氏による特別解説、非公開エリア見学、限定酒含む5種類テイスティング、懐石料理ペアリング"
            },
            private: {
                name: "プライベートツアー",
                price: "50,000円〜",
                capacity: "1-10名",
                includes: "完全貸切、カスタマイズ可能、当主による特別おもてなし、秘蔵酒テイスティング"
            }
        },
        awards: {
            iwc2023: "IWC 2023年 純米吟醸部門 金賞受賞",
            national: "全国新酒鑑評会 2022年・2023年 連続金賞受賞",
            london2023: "ロンドン酒チャレンジ 2023年 純米部門 銀賞受賞"
        },
        certifications: [
            "有機JAS認定",
            "ISO 14001認証",
            "ハラル認証",
            "ミシュラン星付きレストラン採用（世界12店舗）"
        ]
    };

    // 日本酒関連の応答データベース
    const responses = {
        greetings: [
            'こんにちは！AIサクラです🌸 益々酒造へようこそ！創業1724年、300年の歴史を持つ当蔵について何でもお聞きください。',
            'いらっしゃいませ！私は益々酒造のAI杜氏、サクラです🌸 新潟県清流町の老舗酒蔵で、お客様をお待ちしております。'
        ],
        recommendations: [
            '当蔵一番人気は純米吟醸「益々」（3,500円）です！新潟県清流町産の五百万石を50%まで磨き、メロンやリンゴを思わせるフルーティーな香りが特徴です🍶',
            'スパークリング清酒「益々」（4,500円）もおすすめです！きめ細やかな泡と爽やかな酸味で、お祝いの席を華やかに彩ります✨',
            '日本酒上級者には古酒「益々」（12,000円）をおすすめします。5年以上熟成で、カラメルやナッツのような深い味わいが楽しめる限定品です！',
            '梅酒「益々」（3,200円）は当蔵の純米酒をベースに作った特別な梅酒です。上品な梅の香りとすっきりとした甘さが自慢です🌸'
        ],
        pairings: [
            '純米吟醸「益々」は鶏肉のハーブ焼き、カプレーゼ、シーフードサラダとの相性が抜群です🍗',
            '本醸造「益々」はおでん、天ぷら、枝豆などの和食によく合います🍢',
            'スパークリング清酒は生牡蠣、カナッペ、デザートとの組み合わせが最高です🦪',
            '古酒「益々」は中華料理、鰻の蒲焼、ドライフルーツとペアリングしてください🥢',
            '梅酒「益々」は食前酒として、またバニラアイスクリームとの相性が抜群です🍨'
        ],
        serving: [
            '純米吟醸「益々」は冷酒（10-15℃）でお召し上がりください。フルーティーな香りが引き立ちます🍶',
            '本醸造「益々」は常温または熱燗がおすすめです。辛口のキレが楽しめます🌡️',
            'スパークリング清酒はよく冷やして（5℃）、シャンパングラスでお楽しみください🥂',
            '古酒「益々」は常温またはぬる燗で。5年以上熟成の深い味わいをご堪能ください🍯',
            '梅酒「益々」はロックやソーダ割りでどうぞ。純米酒ベースの上品な梅酒です🧊'
        ],
        visit: [
            '3つのツアーをご用意しています！\n・スタンダードツアー（90分・3,000円）10:00/14:00開催\n・プレミアムツアー（3時間・10,000円）11:00開催\n・プライベートツアー（50,000円〜）完全貸切\n事前予約必須です📞',
            '見学では醸造工程の解説、3〜5種類のテイスティング、お土産付きです。プレミアムツアーでは杜氏による特別解説と懐石料理ペアリングも楽しめます🏭'
        ],
        price: [
            '当蔵の価格帯をご案内します💰\n・本醸造「益々」2,200円\n・梅酒「益々」3,200円\n・純米吟醸「益々」3,500円\n・スパークリング清酒4,500円\n・古酒「益々」12,000円（限定品）',
            '全商品720mlです。1.8Lサイズもございます（本醸造4,200円、純米吟醸6,800円）🍶 ギフト包装も承っております🎁'
        ],
        history: [
            '益々酒造は1724年（享保9年）創業の老舗酒蔵です。初代益々八郎が新潟県清流町で酒造業を開始してから300年の歴史があります🏛️',
            '明治維新時代に品質向上により地域一番の酒蔵に成長し、1995年から海外輸出を開始。現在は15ヶ国・地域に輸出しています🌍',
            '2020年にAI技術を活用した品質管理システムを導入、2024年に創業300周年を迎えました✨'
        ],
        awards: [
            '当蔵の受賞歴をご紹介します🏆\n・IWC 2023年 純米吟醸部門 金賞\n・全国新酒鑑評会 2022年・2023年 連続金賞\n・ロンドン酒チャレンジ 2023年 純米部門 銀賞',
            '国際的な品質評価をいただいており、ミシュラン星付きレストラン世界12店舗でも当蔵の日本酒をお楽しみいただけます⭐'
        ],
        company: [
            '益々酒造は従業員145名（杜氏12名含む）、年間生産量2,800石（約504,000L）の酒蔵です👥',
            '企業理念は「伝統を守り、革新を追求し、世界に日本酒の素晴らしさを伝える」です。有機JAS認定、ISO14001認証も取得しています🌱'
        ],
        default: [
            'ありがとうございます！益々酒造について他にも何かお聞きになりたいことはありますか？🍶',
            '日本酒のことなら何でもお任せください！どのようなことが知りたいですか？✨',
            'お役に立てるよう頑張ります！他にもご質問があればお気軽にどうぞ🌸'
        ],
        welcome: [
            'こんにちは！AIサクラです🌸 益々酒造へようこそ！日本酒について何でもお聞きください。',
            'いらっしゃいませ！私は益々酒造のAI杜氏、サクラです🌸 お気軽にご質問ください。',
            'ようこそ益々酒造へ！🍶 日本酒のことなら何でもお答えします。どのようなことが知りたいですか？'
        ]
    };

    // チャットUIを作成
    function createChatUI() {
        const chatHTML = `
            <div id="sakura-chat-overlay" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 9998;">
            </div>
            <div id="sakura-chat-container" style="display: none; position: fixed; bottom: 20px; right: 20px; width: 350px; height: 500px; background: white; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); z-index: 9999; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                <!-- ヘッダー -->
                <div style="background: linear-gradient(135deg, #E8B86D 0%, #F2D194 100%); color: #0B1426; padding: 15px; border-radius: 15px 15px 0 0; display: flex; justify-content: space-between; align-items: center;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <img src="images/sakura.png" alt="AIサクラ" style="width: 40px; height: 40px; border-radius: 50%; border: 2px solid white; object-fit: cover;" onerror="this.style.display='none'; this.nextElementSibling.style.display='inline';">
                        <span style="font-size: 1.5em; display: none;">🌸</span>
                        <div>
                            <div style="font-weight: bold; font-size: 1.1em;">AIサクラ</div>
                            <div style="font-size: 0.8em; opacity: 0.8;">益々酒造 AI杜氏</div>
                        </div>
                    </div>
                    <button onclick="closeSakuraChat()" style="background: none; border: none; color: #0B1426; font-size: 1.5em; cursor: pointer; padding: 5px;">×</button>
                </div>
                
                <!-- メッセージエリア -->
                <div id="sakura-messages" style="height: 350px; overflow-y: auto; padding: 15px; background: #f8f9fa;">
                    <!-- Initial messages will be added by JavaScript -->
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
            
            <!-- モバイル用チャットボタン - 削除（インラインボタンのみ使用） -->
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
        
        if (container && overlay) {
            container.style.display = 'block';
            overlay.style.display = 'block';
            chatOpen = true;
            
            // 初回オープン時にウェルカムメッセージを追加
            const messagesDiv = document.getElementById('sakura-messages');
            if (messagesDiv && messagesDiv.children.length === 0) {
                const welcomeMessage = responses.welcome[Math.floor(Math.random() * responses.welcome.length)];
                addAIMessage(welcomeMessage);
            }
            
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
        
        if (container && overlay) {
            container.style.display = 'none';
            overlay.style.display = 'none';
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
        console.log('Generating response for:', message);
        
        if (!message || message.trim() === '') {
            return responses.default[0];
        }
        
        const lowerMessage = message.toLowerCase();
        
        // 挨拶
        if (lowerMessage.includes('こんにちは') || lowerMessage.includes('こんばんは') || lowerMessage.includes('はじめまして') || lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
            return responses.greetings[Math.floor(Math.random() * responses.greetings.length)];
        }
        
        // 商品の詳細情報
        if (lowerMessage.includes('純米吟醸') || lowerMessage.includes('吟醸')) {
            return `純米吟醸「益々」の詳細をご案内します🍶\n・価格：3,500円（720ml）、6,800円（1.8L）\n・アルコール度数：15.5%\n・使用米：五百万石（新潟県清流町産）\n・精米歩合：50%\n・香り：メロンやリンゴを思わせるフルーティーな香り\n・おすすめ温度：冷酒（10-15℃）\n・料理との相性：鶏肉のハーブ焼き、カプレーゼ、シーフードサラダ`;
        }
        
        if (lowerMessage.includes('本醸造') || lowerMessage.includes('辛口')) {
            return `本醸造「益々」の詳細をご案内します🍶\n・価格：2,200円（720ml）、4,200円（1.8L）\n・アルコール度数：15.0%\n・使用米：こしいぶき（新潟県産）\n・精米歩合：65%\n・特徴：スッキリとした辛口で抜群のキレ\n・おすすめ温度：常温・熱燗\n・料理との相性：おでん、天ぷら、枝豆`;
        }
        
        if (lowerMessage.includes('スパークリング') || lowerMessage.includes('泡') || lowerMessage.includes('シャンパン')) {
            return `スパークリング清酒「益々」の詳細をご案内します🥂\n・価格：4,500円（720ml）\n・アルコール度数：12.0%\n・使用米：五百万石（新潟県清流町産）\n・特徴：きめ細やかな泡と爽やかな酸味\n・おすすめ温度：よく冷やして（5℃）\n・おすすめグラス：シャンパングラス\n・料理との相性：生牡蠣、カナッペ、デザート`;
        }
        
        if (lowerMessage.includes('古酒') || lowerMessage.includes('熟成') || lowerMessage.includes('限定')) {
            return `古酒「益々」の詳細をご案内します🍯\n・価格：12,000円（720ml）限定品\n・アルコール度数：18.0%\n・使用米：五百万石（新潟県清流町産）\n・精米歩合：65%\n・熟成期間：5年以上\n・特徴：カラメルやナッツのような熟成香\n・おすすめ温度：常温・ぬる燗\n・料理との相性：中華料理、鰻の蒲焼、ドライフルーツ\n・在庫：限定15本`;
        }
        
        if (lowerMessage.includes('梅酒') || lowerMessage.includes('リキュール')) {
            return `梅酒「益々」の詳細をご案内します🌸\n・価格：3,200円（720ml）\n・アルコール度数：12.0%\n・ベース：益々酒造の純米酒\n・特徴：上品な梅の香りとすっきりとした甘さ\n・おすすめ：ロック・ソーダ割り\n・料理との相性：食前酒として、バニラアイス\n・こだわり：日本酒蔵が造る特別な梅酒`;
        }
        
        // おすすめ
        if (lowerMessage.includes('おすすめ') || lowerMessage.includes('人気') || lowerMessage.includes('どれが') || lowerMessage.includes('どの')) {
            return responses.recommendations[Math.floor(Math.random() * responses.recommendations.length)];
        }
        
        // ペアリング・料理
        if (lowerMessage.includes('料理') || lowerMessage.includes('相性') || lowerMessage.includes('合う') || lowerMessage.includes('ペアリング') || lowerMessage.includes('食べ物')) {
            return responses.pairings[Math.floor(Math.random() * responses.pairings.length)];
        }
        
        // 飲み方・温度
        if (lowerMessage.includes('飲み方') || lowerMessage.includes('温度') || lowerMessage.includes('冷や') || lowerMessage.includes('燗') || lowerMessage.includes('飲む')) {
            return responses.serving[Math.floor(Math.random() * responses.serving.length)];
        }
        
        // 見学・ツアー
        if (lowerMessage.includes('見学') || lowerMessage.includes('ツアー') || lowerMessage.includes('訪問') || lowerMessage.includes('行き') || lowerMessage.includes('予約')) {
            return responses.visit[Math.floor(Math.random() * responses.visit.length)];
        }
        
        // 価格
        if (lowerMessage.includes('価格') || lowerMessage.includes('値段') || lowerMessage.includes('いくら') || lowerMessage.includes('円') || lowerMessage.includes('値') || lowerMessage.includes('お金')) {
            return responses.price[Math.floor(Math.random() * responses.price.length)];
        }
        
        // 歴史・会社情報
        if (lowerMessage.includes('歴史') || lowerMessage.includes('創業') || lowerMessage.includes('会社') || lowerMessage.includes('酒蔵') || lowerMessage.includes('について')) {
            return responses.history[Math.floor(Math.random() * responses.history.length)];
        }
        
        // 受賞歴
        if (lowerMessage.includes('賞') || lowerMessage.includes('受賞') || lowerMessage.includes('コンテスト') || lowerMessage.includes('評価')) {
            return responses.awards[Math.floor(Math.random() * responses.awards.length)];
        }
        
        // 会社データ
        if (lowerMessage.includes('従業員') || lowerMessage.includes('生産') || lowerMessage.includes('データ') || lowerMessage.includes('規模')) {
            return responses.company[Math.floor(Math.random() * responses.company.length)];
        }
        
        // 感謝
        if (lowerMessage.includes('ありがとう') || lowerMessage.includes('感謝') || lowerMessage.includes('thanks')) {
            return 'どういたしまして！他にも何かご質問があればお気軽にどうぞ🌸';
        }
        
        // 日本酒関連
        if (lowerMessage.includes('日本酒') || lowerMessage.includes('酒') || lowerMessage.includes('sake')) {
            return responses.recommendations[Math.floor(Math.random() * responses.recommendations.length)];
        }
        
        // デフォルト応答
        const randomResponse = responses.default[Math.floor(Math.random() * responses.default.length)];
        console.log('Selected response:', randomResponse);
        return randomResponse;
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