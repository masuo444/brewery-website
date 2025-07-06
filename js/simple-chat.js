// Simple AI Sakura Chat - エレガント桜風デザイン v3.1
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
            'いらっしゃいませ！私は益々酒造のAIアシスタント、サクラです🌸 お気軽にご質問ください。',
            'ようこそ益々酒造へ！🍶 日本酒のことなら何でもお答えします。どのようなことが知りたいですか？'
        ]
    };

    // チャットUIを作成 - 桜風プレミアムデザイン
    function createChatUI() {
        const chatHTML = `
            <div id="sakura-chat-overlay" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: radial-gradient(circle at 30% 20%, rgba(255, 182, 193, 0.15) 0%, rgba(255, 228, 225, 0.2) 40%, rgba(252, 228, 236, 0.25) 100%); backdrop-filter: blur(12px); z-index: 9998;">
            </div>
            <div id="sakura-chat-container" style="display: none; position: fixed; bottom: 20px; right: 20px; width: 400px; height: 580px; background: linear-gradient(145deg, #FADADD 0%, #F8BBD9 30%, #FFE4E1 100%); border-radius: 28px; box-shadow: 0 20px 60px rgba(248, 187, 217, 0.4), 0 12px 40px rgba(250, 218, 221, 0.3), inset 0 2px 0 rgba(255, 255, 255, 0.9); z-index: 9999; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; border: 3px solid rgba(248, 187, 217, 0.5); overflow: hidden; position: relative;">
                <!-- 桜の花びら背景パターン -->
                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; overflow: hidden; opacity: 0.6;">
                    <div style="position: absolute; top: 5%; left: 3%; font-size: 1.4em; color: rgba(255, 182, 193, 0.3); animation: sakuraFloat1 12s infinite;">🌸</div>
                    <div style="position: absolute; top: 25%; right: 5%; font-size: 1em; color: rgba(255, 192, 203, 0.4); animation: sakuraFloat2 15s infinite;">🌸</div>
                    <div style="position: absolute; bottom: 30%; left: 8%; font-size: 1.2em; color: rgba(255, 182, 193, 0.2); animation: sakuraFloat3 18s infinite;">🌸</div>
                    <div style="position: absolute; top: 45%; right: 12%; font-size: 0.9em; color: rgba(255, 210, 220, 0.5); animation: sakuraFloat1 20s infinite reverse;">🌸</div>
                    <div style="position: absolute; bottom: 15%; right: 25%; font-size: 1.1em; color: rgba(255, 192, 203, 0.3); animation: sakuraFloat2 14s infinite;">🌸</div>
                </div>
                
                <!-- 上部桜模様デコレーション -->
                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 8px; background: linear-gradient(90deg, #FFB6C1 0%, #FFC0CB 25%, #FFCCCB 50%, #FFC0CB 75%, #FFB6C1 100%); opacity: 0.8;"></div>
                
                <!-- エレガント桜ヘッダー -->
                <div style="background: linear-gradient(135deg, #F8BBD9 0%, #FADADD 30%, #F0A6CA 70%, #FFE4E1 100%); color: #2D1B2F; padding: 24px; border-radius: 28px 28px 0 0; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 4px 16px rgba(248, 187, 217, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.9); position: relative; border-bottom: 1px solid rgba(255, 255, 255, 0.7);">
                    <div style="display: flex; align-items: center; gap: 16px;">
                        <div style="position: relative;">
                            <img src="images/sakura.png" alt="AIサクラ" style="width: 52px; height: 52px; border-radius: 50%; border: 4px solid rgba(255, 255, 255, 0.95); object-fit: cover; box-shadow: 0 6px 16px rgba(255, 105, 180, 0.4), 0 2px 8px rgba(255, 182, 193, 0.3);" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                            <div style="display: none; width: 52px; height: 52px; border-radius: 50%; background: linear-gradient(135deg, #FF69B4, #FFB6C1); align-items: center; justify-content: center; font-size: 2em; border: 4px solid white; box-shadow: 0 6px 16px rgba(255, 105, 180, 0.4);">🌸</div>
                            <div style="position: absolute; bottom: 0; right: 0; width: 18px; height: 18px; background: linear-gradient(135deg, #00FF7F, #32CD32); border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 6px rgba(0, 255, 127, 0.4);"></div>
                            <div style="position: absolute; top: -2px; right: -2px; font-size: 0.8em; animation: sparkle 2.5s infinite;">✨</div>
                        </div>
                        <div>
                            <div style="font-weight: 800; font-size: 1.3em; color: #2D1B2F; text-shadow: 0 1px 2px rgba(255, 255, 255, 0.9);">AIサクラ</div>
                            <div style="font-size: 0.9em; opacity: 0.85; color: #3D2A3F; font-weight: 600;">益々酒造 AIアシスタント 🌸</div>
                            <div style="font-size: 0.75em; color: #4D3A4F; margin-top: 2px;">やさしく相談に乗ります</div>
                        </div>
                    </div>
                    <button onclick="closeSakuraChat()" style="background: linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(248, 187, 217, 0.4)); border: 3px solid rgba(93, 78, 117, 0.3); color: #2D1B2F; font-size: 1.6em; cursor: pointer; padding: 8px; border-radius: 50%; width: 44px; height: 44px; transition: all 0.3s ease; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(248, 187, 217, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.9); font-weight: 700;" onmouseover="this.style.background='linear-gradient(135deg, rgba(255,255,255,0.9), rgba(240,166,202,0.6))'; this.style.transform='scale(1.1)'; this.style.borderColor='rgba(93,78,117,0.5)'" onmouseout="this.style.background='linear-gradient(135deg, rgba(255,255,255,0.8), rgba(248,187,217,0.4))'; this.style.transform='scale(1)'; this.style.borderColor='rgba(93,78,117,0.3)'">×</button>
                </div>
                
                <!-- プレミアムメッセージエリア -->
                <div id="sakura-messages" style="height: 400px; overflow-y: auto; padding: 24px 20px; background: linear-gradient(180deg, rgba(255, 248, 248, 0.95) 0%, rgba(255, 240, 245, 0.9) 50%, rgba(254, 254, 254, 0.95) 100%); position: relative; scroll-behavior: smooth;">
                    <!-- 背景桜模様 -->
                    <div style="position: absolute; top: 20px; right: 15px; font-size: 3em; color: rgba(255, 182, 193, 0.08); pointer-events: none; transform: rotate(15deg);">🌸</div>
                    <div style="position: absolute; bottom: 30px; left: 10px; font-size: 2.5em; color: rgba(255, 192, 203, 0.06); pointer-events: none; transform: rotate(-10deg);">🌸</div>
                    <!-- Messages will be added here -->
                </div>
                
                <!-- 優雅な桜風クイック返信ボタン（見学削除・3つのみ） -->
                <div style="padding: 16px 20px; background: linear-gradient(135deg, #FEFEFD 0%, #F8BBD9 50%, #FFE4E1 100%); display: flex; gap: 12px; flex-wrap: wrap; border-top: 2px solid rgba(248, 187, 217, 0.4); box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.9);">
                    <button onclick="sendQuickMessage('おすすめの日本酒は？')" style="background: linear-gradient(145deg, #F8BBD9 0%, #FADADD 50%, #FFE4E1 100%); border: 2px solid rgba(248, 187, 217, 0.6); border-radius: 22px; padding: 10px 16px; font-size: 0.8em; cursor: pointer; color: #2D1B2F; font-weight: 700; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 4px 8px rgba(248, 187, 217, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.8); position: relative; overflow: hidden;" onmouseover="this.style.transform='translateY(-3px) scale(1.05)'; this.style.boxShadow='0 8px 16px rgba(248, 187, 217, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.9)'; this.style.borderColor='rgba(240, 166, 202, 0.8)'" onmouseout="this.style.transform='translateY(0) scale(1)'; this.style.boxShadow='0 4px 8px rgba(248, 187, 217, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.8)'; this.style.borderColor='rgba(248, 187, 217, 0.6)'">🌸 おすすめ</button>
                    <button onclick="sendQuickMessage('料理との相性は？')" style="background: linear-gradient(145deg, #F8BBD9 0%, #FADADD 50%, #FFE4E1 100%); border: 2px solid rgba(248, 187, 217, 0.6); border-radius: 22px; padding: 10px 16px; font-size: 0.8em; cursor: pointer; color: #2D1B2F; font-weight: 700; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 4px 8px rgba(248, 187, 217, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.8);" onmouseover="this.style.transform='translateY(-3px) scale(1.05)'; this.style.boxShadow='0 8px 16px rgba(248, 187, 217, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.9)'; this.style.borderColor='rgba(240, 166, 202, 0.8)'" onmouseout="this.style.transform='translateY(0) scale(1)'; this.style.boxShadow='0 4px 8px rgba(248, 187, 217, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.8)'; this.style.borderColor='rgba(248, 187, 217, 0.6)'">🍽️ ペアリング</button>
                    <button onclick="sendQuickMessage('飲み方を教えて')" style="background: linear-gradient(145deg, #F8BBD9 0%, #FADADD 50%, #FFE4E1 100%); border: 2px solid rgba(248, 187, 217, 0.6); border-radius: 22px; padding: 10px 16px; font-size: 0.8em; cursor: pointer; color: #2D1B2F; font-weight: 700; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 4px 8px rgba(248, 187, 217, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.8);" onmouseover="this.style.transform='translateY(-3px) scale(1.05)'; this.style.boxShadow='0 8px 16px rgba(248, 187, 217, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.9)'; this.style.borderColor='rgba(240, 166, 202, 0.8)'" onmouseout="this.style.transform='translateY(0) scale(1)'; this.style.boxShadow='0 4px 8px rgba(248, 187, 217, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.8)'; this.style.borderColor='rgba(248, 187, 217, 0.6)'">🍶 飲み方</button>
                </div>
                
                <!-- エレガント桜風入力エリア -->
                <div style="padding: 20px; display: flex; gap: 12px; background: linear-gradient(135deg, #FEFEFD 0%, #F8BBD9 50%, #FADADD 100%); border-top: 3px solid rgba(248, 187, 217, 0.5); box-shadow: inset 0 2px 0 rgba(255, 255, 255, 0.9), 0 -6px 12px rgba(248, 187, 217, 0.2); position: relative;">
                    <!-- 入力欄装飾 -->
                    <div style="position: absolute; top: 8px; left: 50%; transform: translateX(-50%); width: 40px; height: 4px; background: linear-gradient(90deg, #FFB6C1, #FFC0CB); border-radius: 2px; opacity: 0.6;"></div>
                    
                    <input type="text" id="sakura-input" placeholder="✨ メッセージを入力してください... 🌸" style="flex: 1; padding: 16px 20px; border: 3px solid rgba(248, 187, 217, 0.6); border-radius: 28px; outline: none; font-size: 1em; background: linear-gradient(135deg, #FFFFFF 0%, #FEFEFD 100%); color: #2D1B2F; box-shadow: inset 0 3px 6px rgba(248, 187, 217, 0.15), 0 2px 8px rgba(248, 187, 217, 0.1); transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); font-weight: 500;" onkeypress="handleEnterKey(event)" onfocus="this.style.borderColor='rgba(240, 166, 202, 0.8)'; this.style.boxShadow='inset 0 3px 6px rgba(248, 187, 217, 0.2), 0 0 0 4px rgba(248, 187, 217, 0.15), 0 4px 12px rgba(248, 187, 217, 0.2)'; this.style.transform='translateY(-1px)'" onblur="this.style.borderColor='rgba(248, 187, 217, 0.6)'; this.style.boxShadow='inset 0 3px 6px rgba(248, 187, 217, 0.15), 0 2px 8px rgba(248, 187, 217, 0.1)'; this.style.transform='translateY(0)'">
                    
                    <button onclick="sendMessage()" style="background: linear-gradient(135deg, #F8BBD9 0%, #F0A6CA 40%, #FADADD 100%); color: #2D1B2F; border: 2px solid rgba(248, 187, 217, 0.6); border-radius: 50%; width: 52px; height: 52px; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 6px 16px rgba(248, 187, 217, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.8); transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); font-size: 1.4em; position: relative; overflow: hidden; font-weight: 700;" onmouseover="this.style.transform='scale(1.1) translateY(-2px)'; this.style.boxShadow='0 10px 24px rgba(248, 187, 217, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.9)'; this.style.borderColor='rgba(240, 166, 202, 0.8)'" onmouseout="this.style.transform='scale(1) translateY(0)'; this.style.boxShadow='0 6px 16px rgba(248, 187, 217, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.8)'; this.style.borderColor='rgba(248, 187, 217, 0.6)'">
                        <span style="position: relative; z-index: 1;">🚀</span>
                        <div style="position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.2) 50%, transparent 70%); animation: shimmer 2s infinite;"></div>
                    </button>
                </div>
            </div>
            
            </div>
        `;
        
        // プレミアム桜アニメーションCSSを追加
        const sakuraAnimationCSS = `
            <style>
            @keyframes sakuraFloat1 {
                0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0.3; }
                25% { transform: translateY(-15px) translateX(5px) rotate(5deg); opacity: 0.6; }
                50% { transform: translateY(-5px) translateX(-3px) rotate(-3deg); opacity: 0.4; }
                75% { transform: translateY(-20px) translateX(8px) rotate(8deg); opacity: 0.5; }
            }
            @keyframes sakuraFloat2 {
                0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0.4; }
                33% { transform: translateY(-10px) translateX(-5px) rotate(-5deg); opacity: 0.7; }
                66% { transform: translateY(-25px) translateX(3px) rotate(3deg); opacity: 0.3; }
            }
            @keyframes sakuraFloat3 {
                0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0.2; }
                20% { transform: translateY(-8px) translateX(4px) rotate(4deg); opacity: 0.5; }
                40% { transform: translateY(-18px) translateX(-2px) rotate(-2deg); opacity: 0.6; }
                60% { transform: translateY(-12px) translateX(6px) rotate(6deg); opacity: 0.4; }
                80% { transform: translateY(-22px) translateX(-4px) rotate(-4deg); opacity: 0.3; }
            }
            @keyframes sparkle {
                0%, 100% { opacity: 0.3; transform: scale(1) rotate(0deg); }
                25% { opacity: 0.6; transform: scale(1.1) rotate(90deg); }
                50% { opacity: 0.9; transform: scale(1.3) rotate(180deg); }
                75% { opacity: 0.7; transform: scale(1.15) rotate(270deg); }
            }
            @keyframes shimmer {
                0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
                100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
            }
            </style>
        `;

        // モバイルスタイル - 桜風デザイン対応（キーボード対応強化）
        const mobileStyle = `
            <style>
            @keyframes messageSlideIn {
                0% { opacity: 0; transform: translateY(15px) scale(0.95); }
                100% { opacity: 1; transform: translateY(0) scale(1); }
            }
            
            @media (max-width: 768px) {
                #sakura-chat-container {
                    width: 95% !important;
                    max-width: 420px !important;
                    height: min(55vh, 480px) !important;
                    bottom: 80px !important;
                    right: 50% !important;
                    transform: translateX(50%) !important;
                    border-radius: 25px !important;
                    box-shadow: 0 12px 40px rgba(248, 187, 217, 0.4), 0 6px 24px rgba(250, 218, 221, 0.3) !important;
                }
                #sakura-messages {
                    height: calc(100% - 220px) !important;
                    padding-bottom: 20px !important;
                }
                
                /* モバイルキーボード表示時の調整 */
                @media (max-height: 500px) {
                    #sakura-chat-container {
                        height: 90vh !important;
                        bottom: 10px !important;
                    }
                    #sakura-messages {
                        height: calc(100% - 200px) !important;
                    }
                }
                
                /* 小さな画面での最適化 */
                @media (max-width: 480px) {
                    #sakura-chat-container {
                        width: 98% !important;
                        height: min(90vh, 700px) !important;
                        border-radius: 20px !important;
                    }
                }
                
                /* フォントサイズをモバイル向けに調整 */
                #sakura-messages div[style*="font-size: 1.05em"] {
                    font-size: 1.15em !important;
                    line-height: 1.8 !important;
                }
                #sakura-messages div[style*="font-size: 1.1em"] {
                    font-size: 1.2em !important;
                    line-height: 1.7 !important;
                }
            }
            </style>
        `;

        document.head.insertAdjacentHTML('beforeend', sakuraAnimationCSS);
        document.head.insertAdjacentHTML('beforeend', mobileStyle);
        document.body.insertAdjacentHTML('beforeend', chatHTML);
    }

    // チャット開く（モバイルキーボード対応強化）
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
            
            // モバイルビューポート調整とキーボード対応
            if (window.innerWidth <= 768) {
                document.body.style.overflow = 'hidden';
                
                // iOSサファリのビューポート問題対応
                if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
                    const viewport = document.querySelector('meta[name=viewport]');
                    if (viewport) {
                        viewport.content = 'width=device-width, initial-scale=1.0, viewport-fit=cover, user-scalable=no';
                    }
                }
            }
            
            // 入力フィールドにフォーカス（遅延でキーボード対応）
            setTimeout(() => {
                const input = document.getElementById('sakura-input');
                if (input) {
                    input.focus();
                    
                    // キーボード表示時のスクロール調整
                    input.addEventListener('focus', () => {
                        setTimeout(() => {
                            const messagesDiv = document.getElementById('sakura-messages');
                            if (messagesDiv) {
                                messagesDiv.scrollTop = messagesDiv.scrollHeight;
                            }
                        }, 300);
                    });
                }
            }, 200);
        }
    };

    // チャット閉じる（モバイル対応強化）
    window.closeSakuraChat = function() {
        console.log('Closing Sakura Chat');
        const container = document.getElementById('sakura-chat-container');
        const overlay = document.getElementById('sakura-chat-overlay');
        
        if (container && overlay) {
            container.style.display = 'none';
            overlay.style.display = 'none';
            chatOpen = false;
            
            // モバイル時のスクロール復元
            if (window.innerWidth <= 768) {
                document.body.style.overflow = '';
                
                // iOSサファリのビューポート復元
                if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
                    const viewport = document.querySelector('meta[name=viewport]');
                    if (viewport) {
                        viewport.content = 'width=device-width, initial-scale=1.0';
                    }
                }
            }
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

    // ユーザーメッセージ追加 - 桜風プレミアムデザイン（視認性向上）
    function addUserMessage(message) {
        const messagesDiv = document.getElementById('sakura-messages');
        const messageHTML = `
            <div style="display: flex; justify-content: flex-end; margin-bottom: 24px; animation: messageSlideIn 0.4s ease-out;">
                <div style="background: linear-gradient(135deg, #F8BBD9 0%, #F0A6CA 50%, #FADADD 100%); color: #2D1B2F; padding: 18px 22px; border-radius: 25px 25px 8px 25px; max-width: 80%; box-shadow: 0 6px 16px rgba(248, 187, 217, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.8); position: relative; backdrop-filter: blur(8px); border: 2px solid rgba(248, 187, 217, 0.3);">
                    <div style="font-size: 1.1em; line-height: 1.6; font-weight: 600; text-shadow: 0 1px 2px rgba(255,255,255,0.8); letter-spacing: 0.3px;">${message}</div>
                    <div style="position: absolute; bottom: -2px; right: 10px; font-size: 0.75em; opacity: 0.8; font-weight: 500; color: #3D2A3F;">You</div>
                </div>
            </div>
        `;
        messagesDiv.insertAdjacentHTML('beforeend', messageHTML);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
        
        // モバイルキーボード対応：メッセージ送信後にスクロール調整
        setTimeout(() => {
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        }, 100);
    }

    // AI応答追加 - 桜風プレミアムデザイン（視認性大幅向上）
    function addAIMessage(message) {
        const messagesDiv = document.getElementById('sakura-messages');
        const messageHTML = `
            <div style="display: flex; justify-content: flex-start; margin-bottom: 28px; animation: messageSlideIn 0.5s ease-out;">
                <div style="display: flex; align-items: flex-start; gap: 16px; max-width: 90%;">
                    <div style="width: 38px; height: 38px; background: linear-gradient(135deg, #F8BBD9, #FADADD); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.2em; border: 3px solid white; box-shadow: 0 4px 12px rgba(248, 187, 217, 0.5), 0 2px 6px rgba(240, 166, 202, 0.3); flex-shrink: 0; position: relative;">
                        🌸
                        <div style="position: absolute; top: -2px; right: -2px; font-size: 0.6em; animation: sparkle 2.5s infinite;">✨</div>
                    </div>
                    <div style="background: linear-gradient(135deg, #FFFFFF 0%, #FEFEFD 50%, #F8F9FA 100%); color: #2D1B2F; padding: 20px 24px; border-radius: 12px 28px 28px 28px; box-shadow: 0 6px 20px rgba(248, 187, 217, 0.25), 0 3px 12px rgba(240, 166, 202, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.9); border: 2px solid rgba(248, 187, 217, 0.4); position: relative; backdrop-filter: blur(4px);">
                        <div style="font-size: 1.05em; line-height: 1.7; white-space: pre-line; font-weight: 500; letter-spacing: 0.2px; color: #2D1B2F;">${message}</div>
                        <div style="position: absolute; bottom: 6px; right: 16px; font-size: 0.75em; color: #4D3A4F; font-weight: 700; opacity: 0.9; text-shadow: 0 1px 2px rgba(255,255,255,0.9);">AIサクラ</div>
                        <div style="position: absolute; top: -6px; left: -6px; font-size: 0.9em; opacity: 0.4; animation: sparkle 3s infinite;">✨</div>
                    </div>
                </div>
            </div>
        `;
        messagesDiv.insertAdjacentHTML('beforeend', messageHTML);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
        
        // モバイルキーボード対応：AI応答後のスクロール調整
        setTimeout(() => {
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        }, 100);
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