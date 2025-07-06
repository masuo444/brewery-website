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

    // 日本酒基礎知識データベース
    const sakeKnowledge = {
        types: {
            "純米酒": {
                description: "米と米麹のみで造られた日本酒。醸造アルコールを一切使用しない",
                characteristics: "米本来の旨みと深いコク",
                alcohol: "15-16%程度",
                serving: "冷酒から熱燗まで幅広く"
            },
            "純米吟醸": {
                description: "純米酒で精米歩合60%以下。低温でじっくり発酵",
                characteristics: "華やかな香りとすっきりした味わい",
                alcohol: "15-16%程度", 
                serving: "冷酒がおすすめ"
            },
            "純米大吟醸": {
                description: "純米酒で精米歩合50%以下。最高級の純米酒",
                characteristics: "極めて華やかな香りと上品な味わい",
                alcohol: "15-16%程度",
                serving: "よく冷やして"
            },
            "本醸造": {
                description: "精米歩合70%以下、醸造アルコール添加",
                characteristics: "すっきりとした淡麗な味わい",
                alcohol: "15-16%程度",
                serving: "冷酒から熱燗まで"
            },
            "吟醸": {
                description: "精米歩合60%以下、醸造アルコール添加、吟醸造り",
                characteristics: "華やかな香りと軽快な味わい",
                alcohol: "15-16%程度",
                serving: "冷酒がおすすめ"
            },
            "大吟醸": {
                description: "精米歩合50%以下、醸造アルコール添加、最高級",
                characteristics: "最も華やかな香りと繊細な味わい",
                alcohol: "15-16%程度",
                serving: "よく冷やして"
            }
        },
        brewing: {
            "精米": "玄米の表面を削って白米にする工程。削る割合が精米歩合",
            "洗米・浸漬": "白米を洗い、水に浸して吸水させる",
            "蒸米": "米を蒸して酒造りに適した状態にする",
            "麹作り": "蒸米に麹菌を付けて麹を作る。日本酒造りの要",
            "酒母作り": "麹、蒸米、水に酵母を加えて酒母を作る",
            "仕込み": "酒母に麹、蒸米、水を3回に分けて加える三段仕込み",
            "発酵": "約20-30日間発酵させてもろみを作る",
            "搾り": "もろみを搾って日本酒と酒粕に分ける",
            "濾過・火入れ": "不純物を取り除き、殺菌する",
            "貯蔵・熟成": "タンクで熟成させて味を整える"
        },
        serving: {
            "冷酒": {
                temperature: "5-10℃",
                suitable: "吟醸酒、純米吟醸、大吟醸",
                effect: "香りが立ち、すっきりとした味わい"
            },
            "冷や": {
                temperature: "常温（20℃前後）",
                suitable: "純米酒、本醸造",
                effect: "日本酒本来の味わいを楽しめる"
            },
            "ぬる燗": {
                temperature: "40-45℃",
                suitable: "純米酒、本醸造、古酒",
                effect: "香りが穏やかに立ち、まろやかな味わい"
            },
            "熱燗": {
                temperature: "50-55℃",
                suitable: "本醸造、普通酒",
                effect: "キレが良くなり、体も温まる"
            },
            "飛び切り燗": {
                temperature: "55℃以上",
                suitable: "濃厚な日本酒",
                effect: "強い香りとシャープな味わい"
            }
        },
        terms: {
            "辛口": "糖分が少なく、すっきりとした味わい",
            "甘口": "糖分が多く、まろやかで甘い味わい", 
            "淡麗": "軽やかですっきりとした味わい",
            "濃醇": "コクがあり、重厚な味わい",
            "精米歩合": "玄米を削った後に残る白米の割合。数字が小さいほど高級",
            "日本酒度": "糖分の多少を表す数値。プラスが辛口、マイナスが甘口",
            "酸度": "酸の量を表す数値。高いとキレがよく、低いと穏やか",
            "アミノ酸度": "旨み成分の量。適度だと旨みがあり、多すぎると雑味",
            "生酒": "火入れ（加熱殺菌）をしていない日本酒",
            "原酒": "水で割らずにそのままの日本酒",
            "にごり酒": "もろみを粗く濾した白濁した日本酒",
            "古酒": "3年以上熟成させた日本酒"
        },
        regions: {
            "新潟": "淡麗辛口の代表格。キレの良い酒質",
            "兵庫": "山田錦の産地。上品で繊細な酒質", 
            "京都": "伏見の軟水で造る、やわらかな酒質",
            "広島": "軟水仕込みの穏やかで上品な酒質",
            "秋田": "美山錦使用の香り高い酒質",
            "山形": "出羽燦々使用の華やかな酒質",
            "福島": "多様な酒米による個性豊かな酒質"
        },
        rice: {
            "山田錦": "酒米の王様。兵庫県が主産地。大粒で心白が大きい",
            "五百万石": "新潟県の代表的酒米。淡麗な酒質を生む",
            "美山錦": "長野県生まれ。冷涼地向けの酒米",
            "出羽燦々": "山形県の酒米。香り高い酒を造る",
            "雄町": "岡山県の古い品種。濃醇な味わい",
            "愛山": "兵庫県の酒米。甘みのある酒質"
        }
    };

    // 益々酒造完全商品データベース  
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
                id: 1,
                name: "純米吟醸「益々」",
                type: "純米吟醸",
                price: "3,500円（720ml）",
                alcohol: "15.5%",
                rice: "五百万石（新潟県清流町産）",
                polishRatio: "50%",
                description: "メロンやリンゴを思わせるフルーティーな香り。軽快でキレの良い後味が特徴です。",
                taste: "華やかで上品な甘み、爽やかな酸味、キレの良い後味",
                serving: "冷酒（10-15℃）",
                pairing: "鶏肉のハーブ焼き、カプレーゼ、シーフードサラダ、白身魚のカルパッチョ",
                occasions: "特別な食事、お祝い、贈り物",
                stock: "在庫あり",
                features: ["フルーティー", "上品", "飲みやすい", "女性に人気"]
            },
            {
                id: 2,
                name: "本醸造「益々」", 
                type: "本醸造",
                price: "2,200円（720ml）",
                alcohol: "15.0%",
                rice: "こしいぶき（新潟県産）",
                polishRatio: "65%",
                description: "スッキリとした辛口で、抜群のキレ。毎日の晩酌に寄り添う味わいです。",
                taste: "すっきり辛口、クリーンな味わい、後味のキレが抜群",
                serving: "常温・熱燗（40-50℃）",
                pairing: "おでん、天ぷら、枝豆、焼き鳥、寄せ鍋",
                occasions: "毎日の食事、晩酌、居酒屋料理",
                stock: "在庫あり",
                features: ["辛口", "キレ良い", "コスパ良し", "料理に合う"]
            },
            {
                id: 3,
                name: "スパークリング清酒「益々」",
                type: "スパークリング",
                price: "4,500円（720ml）", 
                alcohol: "12.0%",
                rice: "五百万石（新潟県清流町産）",
                polishRatio: "60%",
                description: "きめ細やかな泡と、爽やかな酸味。乾杯シーンを華やかに彩ります。",
                taste: "爽やかな酸味、やさしい甘み、軽快な泡立ち",
                serving: "よく冷やして（5℃）シャンパングラス推奨",
                pairing: "生牡蠣、カナッペ、デザート、フルーツ、前菜",
                occasions: "パーティー、お祝い、乾杯、記念日",
                stock: "在庫あり",
                features: ["華やか", "爽やか", "パーティー向け", "低アルコール"]
            },
            {
                id: 4,
                name: "大吟醸「益々 極」",
                type: "大吟醸",
                price: "8,000円（720ml）",
                alcohol: "16.0%",
                rice: "山田錦（兵庫県特A地区産）",
                polishRatio: "35%",
                description: "最高級山田錦を35%まで磨き上げた究極の大吟醸。上品で繊細な香りと味わい。",
                taste: "極上の香り、絹のような口当たり、深みのある味わい",
                serving: "冷酒（8-12℃）",
                pairing: "懐石料理、高級寿司、刺身、上品な和食",
                occasions: "特別な日、贈答用、接待、記念品",
                stock: "限定在庫",
                features: ["最高級", "贈答品", "極上の香り", "職人技"]
            },
            {
                id: 5,
                name: "古酒「益々 熟成」",
                type: "古酒",
                price: "12,000円（720ml）",
                alcohol: "18.0%",
                rice: "五百万石（新潟県清流町産）",
                polishRatio: "65%",
                aging: "5年以上熟成",
                description: "5年以上じっくりと熟成させた古酒。カラメルやナッツのような熟成香。",
                taste: "まろやかで深い味わい、複雑な熟成香、長い余韻",
                serving: "常温・ぬる燗（35-40℃）",
                pairing: "中華料理、鰻の蒲焼、ドライフルーツ、チーズ",
                occasions: "特別な夜、ゆっくりとした時間、大人の嗜み",
                stock: "限定15本",
                features: ["希少", "熟成", "複雑な味", "限定品"]
            },
            {
                id: 6,
                name: "梅酒「益々 梅の香」",
                type: "梅酒",
                price: "3,200円（720ml）",
                alcohol: "12.0%",
                base: "益々酒造 純米酒",
                plum: "新潟県産南高梅",
                description: "純米酒で漬け込んだ上品な梅酒。すっきりとした甘さと梅の香り。",
                taste: "上品な梅の香り、すっきりとした甘さ、爽やかな後味",
                serving: "ロック・ソーダ割り・ストレート",
                pairing: "食前酒、デザート、バニラアイス、和菓子",
                occasions: "食前酒、女子会、リラックスタイム",
                stock: "在庫あり",
                features: ["甘口", "香り豊か", "女性向け", "食前酒"]
            },
            {
                id: 7,
                name: "にごり酒「益々 雪化粧」",
                type: "にごり酒",
                price: "2,800円（720ml）",
                alcohol: "14.5%",
                rice: "こしいぶき（新潟県産）",
                description: "もろみの旨みがそのまま残る、濃厚でクリーミーなにごり酒。",
                taste: "濃厚でクリーミー、米の旨み、やさしい甘み",
                serving: "よく振ってから冷酒で",
                pairing: "鍋料理、豚肉料理、辛い料理、チーズ",
                occasions: "冬の食事、鍋パーティー、家庭料理",
                stock: "在庫あり",
                features: ["濃厚", "クリーミー", "冬向け", "鍋料理に最適"]
            }
        ]
    };

    // API設定は env-config.js から読み込み
    function getApiConfig() {
        return window.API_CONFIG || {
            openai: {
                apiKey: 'demo-key',
                endpoint: 'https://api.openai.com/v1/chat/completions',
                model: 'gpt-3.5-turbo',
                maxTokens: 500,
                temperature: 0.7
            },
            deepl: {
                apiKey: 'demo-key',
                endpoint: 'https://api-free.deepl.com/v2/translate'
            },
            settings: {
                timeout: 10000,
                retryCount: 3
            }
        };
    }

    // GPT APIを使用したAI応答（実装版）
    async function getGPTResponse(userMessage) {
        const config = getApiConfig();
        
        try {
            // 実際のAPIキーがある場合のみAPI呼び出し
            if (config.openai.apiKey && 
                config.openai.apiKey.startsWith('sk-') && 
                !config.openai.apiKey.includes('demo') &&
                !config.openai.apiKey.includes('your-actual')) {
                
                console.log('🤖 Calling OpenAI GPT API...');
                
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), config.settings.timeout);
                
                const response = await fetch(config.openai.endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${config.openai.apiKey}`
                    },
                    body: JSON.stringify({
                        model: config.openai.model,
                        messages: [
                            {
                                role: "system",
                                content: "あなたは新潟県の老舗酒蔵「益々酒造」のAIアシスタント「AIサクラ」です。300年の歴史を持つ酒蔵の専門知識を活かし、日本酒について親しみやすく丁寧に説明します。質問に対して具体的で有用な情報を提供し、必要に応じて益々酒造の商品もご紹介ください。"
                            },
                            {
                                role: "user", 
                                content: userMessage
                            }
                        ],
                        max_tokens: config.openai.maxTokens,
                        temperature: config.openai.temperature
                    }),
                    signal: controller.signal
                });
                
                clearTimeout(timeoutId);
                
                if (response.ok) {
                    const data = await response.json();
                    console.log('✅ GPT API response received');
                    return `🤖 GPT応答:\n\n${data.choices[0].message.content}`;
                } else {
                    console.error('GPT API error:', response.status, response.statusText);
                    throw new Error(`API Error: ${response.status}`);
                }
            } else {
                console.log('🔧 No valid OpenAI API key found, using local knowledge base');
                return `🔧 デモモード: GPTモードですが、有効なAPIキーが設定されていません。\n\nローカル知識ベースでの回答:\n\n${generateLocalResponse(userMessage)}`;
            }
        } catch (error) {
            if (error.name === 'AbortError') {
                console.error('GPT API timeout');
                return '⏰ GPT API応答がタイムアウトしました。ローカル知識ベースでお答えします。\n\n' + generateLocalResponse(userMessage);
            } else {
                console.error('GPT API error:', error);
                return '❌ GPT APIでエラーが発生しました。ローカル知識ベースでお答えします。\n\n' + generateLocalResponse(userMessage);
            }
        }
    }

    // DeepL翻訳機能（実装版）
    async function translateText(text, targetLang = 'EN') {
        const config = getApiConfig();
        
        try {
            if (config.deepl.apiKey && 
                !config.deepl.apiKey.includes('demo') &&
                !config.deepl.apiKey.includes('your-actual') &&
                config.deepl.apiKey.length > 10) {
                
                console.log('🌐 Calling DeepL API...');
                
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), config.settings.timeout);
                
                const response = await fetch(config.deepl.endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': `DeepL-Auth-Key ${config.deepl.apiKey}`
                    },
                    body: new URLSearchParams({
                        'text': text,
                        'target_lang': targetLang,
                        'source_lang': 'JA'
                    }),
                    signal: controller.signal
                });
                
                clearTimeout(timeoutId);
                
                if (response.ok) {
                    const data = await response.json();
                    console.log('✅ DeepL API response received');
                    return data.translations[0].text;
                } else {
                    console.error('DeepL API error:', response.status, response.statusText);
                    throw new Error(`API Error: ${response.status}`);
                }
            } else {
                console.log('🔧 No valid DeepL API key found');
                return `🔧 デモモード: DeepL APIキーが設定されていません。\n\n簡易翻訳: "${text}" → ${targetLang}言語`;
            }
        } catch (error) {
            if (error.name === 'AbortError') {
                console.error('DeepL API timeout');
                return `⏰ DeepL API応答がタイムアウトしました。\n\n元のテキスト: "${text}"`;
            } else {
                console.error('DeepL API error:', error);
                return `❌ DeepL APIでエラーが発生しました。\n\n元のテキスト: "${text}"`;
            }
        }
    }

    // 高度なチャット応答システム
    async function generateResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        // API設定要求の検出
        if (message.includes('api') && message.includes('設定') || message.includes('apiキー')) {
            const apiStatus = window.hasRealApiKeys ? window.hasRealApiKeys() : { openai: false, deepl: false };
            return `🔑 API設定状況\n\n🤖 OpenAI GPT: ${apiStatus.openai ? '✅ 設定済み' : '❌ 未設定'}\n🌐 DeepL翻訳: ${apiStatus.deepl ? '✅ 設定済み' : '❌ 未設定'}\n\nAPIキーを設定するには、ブラウザのコンソールで以下を実行してください：\nsetApiKeys("your-openai-key", "your-deepl-key")\n\n※APIキーは提供済みのものをご使用ください。`;
        }

        // 翻訳要求の検出
        if (message.includes('翻訳') || message.includes('translate') || message.includes('english')) {
            const translatedText = await translateText(userMessage, 'EN');
            return `🌐 DeepL翻訳結果:\n${translatedText}`;
        }

        // GPTモード要求の検出
        if (message.includes('gpt') || message.includes('ai') || message.includes('詳しく')) {
            return await getGPTResponse(userMessage);
        }

        // ローカル知識ベースでの応答
        return generateLocalResponse(userMessage);
    }

    // ローカル知識ベースでの応答
    function generateLocalResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        // 日本酒基礎知識での検索
        const knowledgeResponse = searchSakeKnowledge(message);
        if (knowledgeResponse) {
            return knowledgeResponse;
        }

        // 商品名での検索
        const product = findProductByName(message);
        if (product) {
            return formatProductDetails(product);
        }
        
        // カテゴリ別検索
        if (message.includes('純米吟醸')) {
            const product = masumasuData.products.find(p => p.type === '純米吟醸');
            return formatProductDetails(product);
        }
        if (message.includes('本醸造')) {
            const product = masumasuData.products.find(p => p.type === '本醸造');
            return formatProductDetails(product);
        }
        if (message.includes('大吟醸')) {
            const product = masumasuData.products.find(p => p.type === '大吟醸');
            return formatProductDetails(product);
        }
        if (message.includes('スパークリング')) {
            const product = masumasuData.products.find(p => p.type === 'スパークリング');
            return formatProductDetails(product);
        }
        if (message.includes('古酒') || message.includes('熟成')) {
            const product = masumasuData.products.find(p => p.type === '古酒');
            return formatProductDetails(product);
        }
        if (message.includes('梅酒')) {
            const product = masumasuData.products.find(p => p.type === '梅酒');
            return formatProductDetails(product);
        }
        if (message.includes('にごり')) {
            const product = masumasuData.products.find(p => p.type === 'にごり酒');
            return formatProductDetails(product);
        }
        
        // おすすめ機能
        if (message.includes('おすすめ') || message.includes('推奨')) {
            if (message.includes('初心者') || message.includes('飲みやすい')) {
                return recommendForBeginners();
            }
            if (message.includes('贈り物') || message.includes('プレゼント') || message.includes('ギフト')) {
                return recommendForGifts();
            }
            if (message.includes('特別') || message.includes('高級')) {
                return recommendPremium();
            }
            if (message.includes('安い') || message.includes('お得') || message.includes('コスパ')) {
                return recommendBudget();
            }
            return recommendGeneral();
        }
        
        // 料理との相性
        if (message.includes('料理') || message.includes('ペアリング') || message.includes('相性')) {
            if (message.includes('魚') || message.includes('刺身') || message.includes('寿司')) {
                return pairingFish();
            }
            if (message.includes('肉') || message.includes('焼肉') || message.includes('ステーキ')) {
                return pairingMeat();
            }
            if (message.includes('鍋') || message.includes('温かい') || message.includes('煮物')) {
                return pairingHotDish();
            }
            if (message.includes('チーズ') || message.includes('洋食')) {
                return pairingWestern();
            }
            return pairingGeneral();
        }
        
        // 飲み方・温度
        if (message.includes('飲み方') || message.includes('温度') || message.includes('冷酒') || message.includes('熱燗')) {
            return servingTips();
        }
        
        // 価格関連
        if (message.includes('価格') || message.includes('値段') || message.includes('いくら')) {
            return priceList();
        }
        
        // 在庫・購入
        if (message.includes('在庫') || message.includes('買') || message.includes('購入') || message.includes('注文')) {
            return purchaseInfo();
        }
        
        // 比較
        if (message.includes('比較') || message.includes('違い') || message.includes('どちら')) {
            return productComparison();
        }
        
        // 酒蔵見学
        if (message.includes('見学') || message.includes('ツアー') || message.includes('蔵')) {
            return tourInfo();
        }
        
        // 会社情報
        if (message.includes('会社') || message.includes('歴史') || message.includes('酒造') || message.includes('創業')) {
            return companyInfo();
        }
        
        // デフォルト応答
        return defaultResponse();
    }

    // 日本酒基礎知識での検索
    function searchSakeKnowledge(message) {
        // 日本酒の種類について
        for (const [type, info] of Object.entries(sakeKnowledge.types)) {
            if (message.includes(type.toLowerCase()) || message.includes(type)) {
                return `🌸 ${type}について\n\n📝 ${info.description}\n\n✨ 特徴：${info.characteristics}\n🍶 アルコール度数：${info.alcohol}\n🌡️ おすすめの飲み方：${info.serving}\n\n日本酒の分類は製造方法と精米歩合によって決まります。他にもご質問がございましたら、お聞かせください！`;
            }
        }

        // 醸造工程について
        for (const [process, description] of Object.entries(sakeKnowledge.brewing)) {
            if (message.includes(process) || message.includes(process.replace('・', ''))) {
                return `🏭 ${process}について\n\n${description}\n\n日本酒造りは約10の工程を経て完成します。各工程が酒質に大きく影響するため、杜氏の技術と経験が重要です。\n\n他の工程についてもお聞かせください！`;
            }
        }

        // 飲み方・温度について
        for (const [method, info] of Object.entries(sakeKnowledge.serving)) {
            if (message.includes(method)) {
                return `🌡️ ${method}について\n\n🌡️ 温度：${info.temperature}\n🍶 適した日本酒：${info.suitable}\n✨ 効果：${info.effect}\n\n温度によって香りや味わいが大きく変わるのが日本酒の魅力です。ぜひ色々な温度でお試しください！`;
            }
        }

        // 日本酒用語について
        for (const [term, explanation] of Object.entries(sakeKnowledge.terms)) {
            if (message.includes(term)) {
                return `📚 ${term}とは\n\n${explanation}\n\n日本酒を理解する上で重要な用語の一つです。他にもご不明な用語がございましたら、お気軽にお聞きください！`;
            }
        }

        // 産地について
        for (const [region, characteristic] of Object.entries(sakeKnowledge.regions)) {
            if (message.includes(region)) {
                return `🗾 ${region}の日本酒について\n\n${characteristic}\n\n各地域の気候、水質、米の品種などが酒質に影響を与え、その土地ならではの個性的な日本酒が生まれます。\n\n他の産地についてもお聞かせください！`;
            }
        }

        // 酒米について
        for (const [rice, info] of Object.entries(sakeKnowledge.rice)) {
            if (message.includes(rice)) {
                return `🌾 ${rice}について\n\n${info}\n\n酒米は日本酒の品質を決める重要な要素の一つです。品種によって香りや味わいの特徴が変わります。\n\n他の酒米についてもご質問ください！`;
            }
        }

        // 一般的な日本酒の質問
        if (message.includes('日本酒とは') || message.includes('日本酒って') || message.includes('何で作る')) {
            return `🍶 日本酒について\n\n日本酒は、米と水を主原料として、麹菌と酵母の力で発酵させて造る日本の伝統的なお酒です。\n\n🌾 原料：米、米麹、水（一部に醸造アルコール）\n🔬 製法：並行複発酵という世界でも珍しい製法\n🍶 アルコール度数：一般的に15-16%\n📊 分類：原料と製法により特定名称酒と普通酒に分類\n\n何か具体的にお知りになりたいことはありますか？`;
        }

        if (message.includes('どう違う') || message.includes('違い') || message.includes('比較')) {
            return `🔍 日本酒の分類と違い\n\n【原料による分類】\n🌾 純米系：米、米麹、水のみ\n🍶 醸造酒系：上記に醸造アルコール添加\n\n【精米歩合による分類】\n✨ 大吟醸：50%以下\n🌸 吟醸：60%以下\n🍚 本醸造：70%以下\n\n【組み合わせ例】\n• 純米大吟醸：純米で精米歩合50%以下\n• 吟醸：醸造アルコール添加で精米歩合60%以下\n\n具体的にどの種類の違いを知りたいですか？`;
        }

        if (message.includes('おいしい飲み方') || message.includes('どう飲む')) {
            return `🍶 美味しい日本酒の飲み方\n\n🌡️ 温度で楽しむ\n• 冷酒：香りが立ち、すっきり\n• 常温：バランスの良い味わい\n• 燗酒：香りが穏やかで、まろやか\n\n🍽️ 料理と合わせる\n• 魚料理：吟醸系、純米吟醸\n• 肉料理：純米酒、本醸造\n• 和食：オールマイティ\n\n🥃 器で変わる\n• 猪口：香りを楽しむ\n• ワイングラス：香りが立つ\n• 徳利とお猪口：伝統的\n\nお好みの飲み方を見つけてください！`;
        }

        return null; // 基礎知識に該当しない場合はnullを返す
    }

    // 商品名で検索
    function findProductByName(message) {
        return masumasuData.products.find(product => {
            const productName = product.name.toLowerCase();
            return message.includes('益々') || 
                   message.includes('極') || 
                   message.includes('熟成') || 
                   message.includes('雪化粧') || 
                   message.includes('梅の香');
        });
    }

    // 商品詳細フォーマット
    function formatProductDetails(product) {
        if (!product) return defaultResponse();
        
        let response = `🌸 ${product.name}\n\n`;
        response += `📝 ${product.description}\n\n`;
        response += `💰 価格：${product.price}\n`;
        response += `🍶 アルコール度数：${product.alcohol}\n`;
        response += `🌾 使用米：${product.rice}\n`;
        if (product.polishRatio) response += `✨ 精米歩合：${product.polishRatio}\n`;
        if (product.aging) response += `⏰ 熟成：${product.aging}\n`;
        response += `\n🍽️ 味わい：${product.taste}\n`;
        response += `🌡️ 飲み方：${product.serving}\n`;
        response += `👨‍🍳 ペアリング：${product.pairing}\n`;
        response += `🎯 おすすめシーン：${product.occasions}\n`;
        response += `📦 在庫状況：${product.stock}\n\n`;
        response += `特徴：${product.features.join('、')}`;
        
        return response;
    }

    // 各種推奨機能
    function recommendForBeginners() {
        const product = masumasuData.products[0]; // 純米吟醸
        return `🌸 初心者の方には「${product.name}」がおすすめです！\n\n${product.description}\n\nフルーティーで飲みやすく、日本酒入門に最適です。\n価格：${product.price}\n\n他にもご質問がございましたら、お聞かせください！`;
    }

    function recommendForGifts() {
        const product = masumasuData.products[3]; // 大吟醸
        return `🎁 贈り物でしたら「${product.name}」が最適です！\n\n${product.description}\n\n最高級の山田錦を使用した極上の大吟醸で、特別な方への贈り物に相応しい品質です。\n価格：${product.price}\n\n美しい化粧箱に入れてお届けいたします。`;
    }

    function recommendPremium() {
        const product = masumasuData.products[4]; // 古酒
        return `👑 特別な日には「${product.name}」をどうぞ！\n\n${product.description}\n\n5年以上じっくりと熟成させた希少な古酒です。\n価格：${product.price}\n在庫：${product.stock}\n\n大人の嗜みとして、ゆっくりとお楽しみください。`;
    }

    function recommendBudget() {
        const product = masumasuData.products[1]; // 本醸造
        return `💝 コストパフォーマンス重視でしたら「${product.name}」がおすすめ！\n\n${product.description}\n\n毎日の晩酌にも気軽にお楽しみいただける価格設定です。\n価格：${product.price}\n\n品質は本格的でありながら、お求めやすい価格を実現しています。`;
    }

    function recommendGeneral() {
        return `🌸 おすすめ商品をご紹介いたします！\n\n【初心者向け】純米吟醸「益々」- フルーティーで飲みやすい\n【コスパ重視】本醸造「益々」- 毎日の晩酌に最適\n【特別な日】大吟醸「益々 極」- 最高級の贈答品\n【パーティー】スパークリング清酒「益々」- 華やかな乾杯に\n\nどのような用途をお考えでしょうか？`;
    }

    function pairingFish() {
        return `🐟 魚料理におすすめのペアリング！\n\n🌸 純米吟醸「益々」\n→ 白身魚のカルパッチョ、シーフードサラダ\n\n✨ 大吟醸「益々 極」\n→ 高級寿司、刺身\n\n🥂 スパークリング清酒「益々」\n→ 生牡蠣、前菜\n\n魚の種類や調理法をお聞かせいただければ、より具体的にご提案いたします！`;
    }

    function pairingMeat() {
        return `🥩 お肉料理におすすめのペアリング！\n\n🍶 本醸造「益々」\n→ 焼き鳥、豚肉料理\n\n🍯 古酒「益々 熟成」\n→ 鰻の蒲焼、中華料理\n\n☁️ にごり酒「益々 雪化粧」\n→ 豚肉料理、辛い料理\n\nお肉の種類や味付けをお聞かせください！`;
    }

    function pairingHotDish() {
        return `🔥 温かいお料理におすすめ！\n\n🍶 本醸造「益々」（熱燗で）\n→ おでん、寄せ鍋、天ぷら\n\n☁️ にごり酒「益々 雪化粧」\n→ 鍋料理全般、煮物\n\n🍯 古酒「益々 熟成」（ぬる燗で）\n→ 中華料理、濃い味付けの料理\n\n温かい料理には温めた日本酒がよく合います！`;
    }

    function pairingWestern() {
        return `🧀 洋食・チーズとのペアリング！\n\n🥂 スパークリング清酒「益々」\n→ カナッペ、フルーツ、軽いチーズ\n\n🌸 純米吟醸「益々」\n→ カプレーゼ、鶏肉のハーブ焼き\n\n☁️ にごり酒「益々 雪化粧」\n→ 濃厚なチーズ、クリーム系料理\n\n洋食にも日本酒は意外によく合います！`;
    }

    function pairingGeneral() {
        return `🍽️ お料理との相性をご案内いたします！\n\n【魚料理】純米吟醸、大吟醸、スパークリング\n【肉料理】本醸造、古酒、にごり酒\n【鍋・煮物】本醸造（熱燗）、にごり酒\n【洋食・チーズ】スパークリング、純米吟醸\n【中華・濃い味】古酒、にごり酒\n【デザート】梅酒、スパークリング\n\nどのようなお料理をご予定ですか？`;
    }

    function servingTips() {
        return `🌡️ 美味しい飲み方をご紹介！\n\n❄️ 冷酒（5-15℃）\n• 純米吟醸、大吟醸、スパークリング\n• フルーティーさや繊細な香りを楽しめます\n\n🌡️ 常温（20℃前後）\n• 本醸造、古酒\n• 日本酒本来の味わいを感じられます\n\n🔥 熱燗・ぬる燗（35-50℃）\n• 本醸造、古酒\n• 香りが立ち、体も温まります\n\n季節や気分に合わせてお楽しみください！`;
    }

    function priceList() {
        return `💰 全商品価格表\n\n【お手頃価格】\n• 本醸造「益々」：2,200円\n• にごり酒「益々 雪化粧」：2,800円\n• 梅酒「益々 梅の香」：3,200円\n\n【プレミアム】\n• 純米吟醸「益々」：3,500円\n• スパークリング清酒「益々」：4,500円\n\n【最高級】\n• 大吟醸「益々 極」：8,000円\n• 古酒「益々 熟成」：12,000円\n\n（全て720ml、税込価格）`;
    }

    function purchaseInfo() {
        return `🛒 ご購入について\n\n📦 在庫状況\n• 通常商品：在庫あり\n• 大吟醸「益々 極」：限定在庫\n• 古酒「益々 熟成」：限定15本\n\n🚚 配送\n• 全国発送承ります\n• クール便対応\n• ギフト包装可能\n\n📞 ご注文方法\n• お電話：0120-xxx-xxx\n• メール：info@masumasu-sake.jp\n• オンラインショップ準備中\n\nお気軽にお問い合わせください！`;
    }

    function productComparison() {
        return `🔍 商品比較のポイント\n\n【純米吟醸 vs 大吟醸】\n純米吟醸：バランス良く飲みやすい\n大吟醸：より繊細で香り高い\n\n【本醸造 vs 純米吟醸】\n本醸造：すっきり辛口、コスパ◎\n純米吟醸：フルーティー、上品\n\n【スパークリング vs 梅酒】\n스파링：パーティー向け、低アルコール\n梅酒：甘口、食前酒に最適\n\n具体的にどの商品を比較されたいですか？`;
    }

    function tourInfo() {
        return `🏭 酒蔵見学・ツアーのご案内\n\n【スタンダードツアー】\n• 時間：90分\n• 料金：3,000円\n• 定員：20名\n• 時間：10:00、14:00\n• 内容：醸造工程見学、3種テイスティング\n\n【プレミアムツアー】\n• 時間：3時間\n• 料金：10,000円\n• 定員：8名\n• 時間：11:00（土日のみ）\n• 内容：杜氏による特別解説、懐石料理ペアリング\n\n🎫 予約：3日前までにお電話ください\n📞 0120-xxx-xxx`;
    }

    function companyInfo() {
        return `🏢 株式会社益々酒造について\n\n📅 創業：1724年（享保9年）\n🌟 歴史：300年の老舗酒蔵\n📍 所在地：新潟県清流町\n👥 従業員：145名（杜氏12名含む）\n🍶 年間生産量：2,800石（約504,000L）\n🌍 輸出：15ヶ国・地域\n\n💭 企業理念\n「伝統を守り、革新を追求し、世界に日本酒の素晴らしさを伝える」\n\n新潟の美しい自然の中で、伝統の技術と革新的な取り組みにより、最高品質の日本酒を醸造しています。`;
    }

    function defaultResponse() {
        return `🌸 ありがとうございます！\n\n益々酒造について、詳しくお答えできます：\n\n🍶 商品詳細（純米吟醸、本醸造、大吟醸、スパークリング、古酒、梅酒、にごり酒）\n🎯 用途別おすすめ（初心者、贈り物、特別な日、コスパ重視）\n🍽️ 料理とのペアリング提案\n🌡️ 美味しい飲み方・温度\n💰 価格・購入方法\n🏭 酒蔵見学・ツアー\n🏢 会社・歴史について\n\n「純米吟醸について教えて」「初心者におすすめは？」「魚料理に合う日本酒は？」など、具体的にお聞かせください！`;
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

    // メッセージ送信（非同期対応）
    async function sendMessage() {
        const input = document.getElementById('sakura-input');
        if (!input || !input.value.trim()) return;

        const userMessage = input.value.trim();
        addUserMessage(userMessage);
        input.value = '';

        // ローディング表示
        addLoadingMessage();

        try {
            // AI応答（非同期）
            const aiResponse = await generateResponse(userMessage);
            removeLoadingMessage();
            addAIMessage(aiResponse);
        } catch (error) {
            removeLoadingMessage();
            addAIMessage('申し訳ございません。一時的にエラーが発生しました。もう一度お試しください。');
        }
    }

    // クイックメッセージ送信（非同期対応）
    async function sendQuickMessage(message) {
        addUserMessage(message);
        addLoadingMessage();
        
        try {
            const aiResponse = await generateResponse(message);
            removeLoadingMessage();
            addAIMessage(aiResponse);
        } catch (error) {
            removeLoadingMessage();
            addAIMessage('申し訳ございません。エラーが発生しました。');
        }
    }

    // ローディングメッセージ表示
    function addLoadingMessage() {
        const messagesContainer = document.getElementById('sakura-messages');
        if (!messagesContainer) return;

        const loadingHTML = `
            <div id="loading-message" style="display: flex; justify-content: flex-start; margin: 8px 0;">
                <div style="
                    background: linear-gradient(135deg, #FFFFFF 0%, #FEFEFD 50%, #F8F9FA 100%);
                    color: #2D1B2F;
                    padding: 20px 24px;
                    border-radius: 12px 28px 28px 28px;
                    box-shadow: 0 6px 20px rgba(248, 187, 217, 0.25);
                    border: 2px solid rgba(248, 187, 217, 0.4);
                    position: relative;
                ">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <div style="
                            width: 8px; height: 8px; 
                            background: #F8BBD9; 
                            border-radius: 50%; 
                            animation: bounce 1.4s ease-in-out infinite both;
                        "></div>
                        <div style="
                            width: 8px; height: 8px; 
                            background: #FADADD; 
                            border-radius: 50%; 
                            animation: bounce 1.4s ease-in-out 0.16s infinite both;
                        "></div>
                        <div style="
                            width: 8px; height: 8px; 
                            background: #FFE4E1; 
                            border-radius: 50%; 
                            animation: bounce 1.4s ease-in-out 0.32s infinite both;
                        "></div>
                        <span style="margin-left: 8px; color: #4D3A4F;">AIサクラが考えています...</span>
                    </div>
                    <style>
                        @keyframes bounce {
                            0%, 80%, 100% { transform: scale(0); }
                            40% { transform: scale(1); }
                        }
                    </style>
                </div>
            </div>
        `;
        
        messagesContainer.insertAdjacentHTML('beforeend', loadingHTML);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // ローディングメッセージ削除
    function removeLoadingMessage() {
        const loadingMessage = document.getElementById('loading-message');
        if (loadingMessage) {
            loadingMessage.remove();
        }
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