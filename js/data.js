// 益々酒造 実際の日本酒データベース
const sakeData = [
    {
        id: 1,
        name: {
            ja: "純米吟醸「益々」",
            en: "Masu Masu - Fragrance",
            fr: "Masu Masu - Fragrance",
            zh: "纯米吟酿「益々」",
            ko: "준마이 긴조「마수마수」",
            it: "Junmai Ginjo「Masumasu」",
            es: "Junmai Ginjo「Masumasu」",
            vi: "Junmai Ginjo「Masumasu」"
        },
        brewery: {
            ja: "益々酒造",
            en: "Masumasu Brewery",
            fr: "Brasserie Masumasu",
            zh: "益々酒造"
        },
        type: {
            ja: "純米吟醸",
            en: "Junmai Ginjo",
            fr: "Junmai Ginjo",
            zh: "纯米吟酿"
        },
        price: 3500,
        alcohol: 15.5,
        ricePalish: 50,
        riceType: {
            ja: "五百万石 (新潟県清流町産)",
            en: "Gohyakumangoku (Niigata Seiryu-cho)",
            fr: "Gohyakumangoku (Niigata Seiryu-cho)",
            zh: "五百万石 (新潟县清流町产)"
        },
        description: {
            ja: "メロンやリンゴを思わせるフルーティーな香り。軽快でキレの良い後味。杯を重ねるごとに増す、華やかな香りを表現。",
            en: "Fruity aroma reminiscent of melon and apple. Light and crisp aftertaste. Expressing gorgeous fragrance that intensifies with each cup.",
            fr: "Arôme fruité rappelant le melon et la pomme. Arrière-goût léger et vif. Exprimant un parfum magnifique qui s'intensifie à chaque verre.",
            zh: "蜜瓜和苹果般的果香。轻快爽脆的回味。表现杯盏递进中愈加浓郁的华丽香气。"
        },
        tastingNotes: {
            ja: "フルーティーな香り、軽快な飲み口、爽やかなキレ",
            en: "Fruity aroma, light taste, refreshing finish",
            fr: "Arôme fruité, goût léger, finale rafraîchissante",
            zh: "果香，轻快口感，清爽收尾"
        },
        servingTemp: {
            ja: "冷酒 (10-15℃)",
            en: "Chilled (10-15℃)",
            fr: "Frais (10-15℃)",
            zh: "冷酒 (10-15℃)"
        },
        pairing: {
            ja: "鶏肉のハーブ焼き、カプレーゼ、シーフードサラダ",
            en: "Herb-roasted chicken, Caprese, seafood salad",
            fr: "Poulet aux herbes, Caprese, salade de fruits de mer",
            zh: "香草烤鸡，卡布里沙拉，海鲜沙拉"
        },
        labelDescription: {
            ja: "杯を重ねるごとに増す、華やかな香りを表現。",
            en: "Expressing gorgeous fragrance that intensifies with each cup.",
            fr: "Exprimant un parfum magnifique qui s'intensifie à chaque verre.",
            zh: "表现杯盏递进中愈加浓郁的华丽香气。"
        },
        yeast: {
            ja: "新潟酵母G9",
            en: "Niigata Yeast G9",
            fr: "Levure Niigata G9",
            zh: "新潟酵母G9"
        },
        region: {
            ja: "新潟県",
            en: "Niigata Prefecture",
            fr: "Préfecture de Niigata",
            zh: "新潟县"
        },
        sizes: [
            { size: "720ml", price: 3500 },
            { size: "1.8L", price: 6800 }
        ],
        image: "images/products/junmai-ginjo.png",
        limited: false,
        inStock: 50
    },
    {
        id: 2,
        name: {
            ja: "本醸造「益々」",
            en: "Masu Masu - Classic",
            fr: "Masu Masu - Classic",
            zh: "本酿造「益々」"
        },
        brewery: {
            ja: "益々酒造",
            en: "Masumasu Brewery",
            fr: "Brasserie Masumasu",
            zh: "益々酒造"
        },
        type: {
            ja: "本醸造",
            en: "Honjozo",
            fr: "Honjozo",
            zh: "本酿造"
        },
        price: 2200,
        alcohol: 15.0,
        ricePalish: 65,
        riceType: {
            ja: "こしいぶき (新潟県産)",
            en: "Koshiibuki (Niigata)",
            fr: "Koshiibuki (Niigata)",
            zh: "越光 (新潟县产)"
        },
        description: {
            ja: "スッキリとした辛口で、抜群のキレ。毎日の晩酌に寄り添う味わい。日々の食卓を豊かにする、クラシックな味わい。",
            en: "Clean and dry with outstanding crispness. A taste that accompanies daily evening drinks. Classic flavor that enriches everyday dining.",
            fr: "Net et sec avec un caractère exceptionnel. Un goût qui accompagne les boissons du soir quotidiennes. Saveur classique qui enrichit les repas quotidiens.",
            zh: "清爽辛口，收尾绝佳。陪伴日常晚酌的口感。丰富日常餐桌的经典味道。"
        },
        tastingNotes: {
            ja: "米の旨み、辛口でキレの良い味わい",
            en: "Rice umami, dry and crisp taste",
            fr: "Umami du riz, goût sec et vif",
            zh: "米香，辛口爽脆"
        },
        servingTemp: {
            ja: "常温・熱燗",
            en: "Room temperature, Hot",
            fr: "Température ambiante, Chaud",
            zh: "常温・热燗"
        },
        pairing: {
            ja: "おでん、天ぷら、枝豆",
            en: "Oden, tempura, edamame",
            fr: "Oden, tempura, edamame",
            zh: "关东煮，天妇罗，毛豆"
        },
        labelDescription: {
            ja: "日々の食卓を豊かにする、クラシックな味わい。",
            en: "Classic flavor that enriches everyday dining.",
            fr: "Saveur classique qui enrichit les repas quotidiens.",
            zh: "丰富日常餐桌的经典味道。"
        },
        yeast: {
            ja: "協会601号",
            en: "Kyokai 601",
            fr: "Kyokai 601",
            zh: "协会601号"
        },
        region: {
            ja: "新潟県",
            en: "Niigata Prefecture",
            fr: "Préfecture de Niigata",
            zh: "新潟县"
        },
        sizes: [
            { size: "720ml", price: 2200 },
            { size: "1.8L", price: 4200 }
        ],
        image: "images/products/honjozo.png",
        limited: false,
        inStock: 80
    },
    {
        id: 3,
        name: {
            ja: "スパークリング清酒「益々」",
            en: "Masu Masu - Celebration",
            fr: "Masu Masu - Celebration",
            zh: "起泡清酒「益々」"
        },
        brewery: {
            ja: "益々酒造",
            en: "Masumasu Brewery",
            fr: "Brasserie Masumasu",
            zh: "益々酒造"
        },
        type: {
            ja: "スパークリング",
            en: "Sparkling",
            fr: "Mousseux",
            zh: "起泡酒"
        },
        price: 4500,
        alcohol: 12.0,
        ricePalish: null,
        riceType: {
            ja: "五百万石 (新潟県清流町産)",
            en: "Gohyakumangoku (Niigata Seiryu-cho)",
            fr: "Gohyakumangoku (Niigata Seiryu-cho)",
            zh: "五百万石 (新潟县清流町产)"
        },
        description: {
            ja: "きめ細やかな泡と、爽やかな酸味。乾杯シーンを華やかに彩る。祝いの席にふさわしい、華やかな一本。",
            en: "Fine bubbles with refreshing acidity. Beautifully decorates toasting scenes. A gorgeous bottle suitable for celebratory occasions.",
            fr: "Bulles fines avec une acidité rafraîchissante. Décore magnifiquement les scènes de toast. Une bouteille magnifique adaptée aux occasions de célébration.",
            zh: "细腻泡沫配以清爽酸味。华丽装点干杯场景。适合庆祝场合的华美一瓶。"
        },
        tastingNotes: {
            ja: "繊細な泡、爽やかな酸味、華やかな印象",
            en: "Delicate bubbles, refreshing acidity, gorgeous impression",
            fr: "Bulles délicates, acidité rafraîchissante, impression magnifique",
            zh: "精致泡沫，清爽酸味，华丽印象"
        },
        servingTemp: {
            ja: "よく冷やして (5℃) / シャンパングラス推奨",
            en: "Well chilled (5℃) / Champagne glass recommended",
            fr: "Bien frais (5℃) / Verre à champagne recommandé",
            zh: "充分冷却 (5℃) / 建议使用香槟杯"
        },
        pairing: {
            ja: "生牡蠣、カナッペ、デザート",
            en: "Fresh oysters, canapés, desserts",
            fr: "Huîtres fraîches, canapés, desserts",
            zh: "生蚝，开胃小食，甜点"
        },
        labelDescription: {
            ja: "祝いの席にふさわしい、華やかな一本。",
            en: "A gorgeous bottle suitable for celebratory occasions.",
            fr: "Une bouteille magnifique adaptée aux occasions de célébration.",
            zh: "适合庆祝场合的华美一瓶。"
        },
        region: {
            ja: "新潟県",
            en: "Niigata Prefecture",
            fr: "Préfecture de Niigata",
            zh: "新潟县"
        },
        sizes: [
            { size: "720ml", price: 4500 }
        ],
        image: "images/products/sparkling.png",
        limited: false,
        inStock: 30
    },
    {
        id: 4,
        name: {
            ja: "古酒「益々」",
            en: "Masu Masu - Vintage",
            fr: "Masu Masu - Vintage",
            zh: "古酒「益々」"
        },
        brewery: {
            ja: "益々酒造",
            en: "Masumasu Brewery",
            fr: "Brasserie Masumasu",
            zh: "益々酒造"
        },
        type: {
            ja: "古酒 (純米)",
            en: "Vintage Sake (Junmai)",
            fr: "Saké Vintage (Junmai)",
            zh: "古酒 (纯米)"
        },
        price: 12000,
        alcohol: 18.0,
        ricePalish: 65,
        riceType: {
            ja: "五百万石 (新潟県清流町産)",
            en: "Gohyakumangoku (Niigata Seiryu-cho)",
            fr: "Gohyakumangoku (Niigata Seiryu-cho)",
            zh: "五百万石 (新潟县清流町产)"
        },
        description: {
            ja: "5年以上熟成。カラメルやナッツのような熟成香と、まろやかで深みのある味わい。時が醸し出す、唯一無二の味わい。",
            en: "Aged over 5 years. Matured aroma like caramel and nuts, with mellow and deep flavor. A unique taste created by time.",
            fr: "Vieilli plus de 5 ans. Arôme mûri comme le caramel et les noix, avec une saveur moelleuse et profonde. Un goût unique créé par le temps.",
            zh: "熟成超过5年。焦糖和坚果般的熟成香气，醇厚深邃的口感。时间酿造的独一无二味道。"
        },
        tastingNotes: {
            ja: "熟成香、まろやかな甘み、深いコク",
            en: "Aged aroma, mellow sweetness, deep richness",
            fr: "Arôme vieilli, douceur moelleuse, richesse profonde",
            zh: "熟成香，醇厚甜味，深邃浓郁"
        },
        servingTemp: {
            ja: "常温・ぬる燗",
            en: "Room temperature, lukewarm",
            fr: "Température ambiante, tiède",
            zh: "常温・温燗"
        },
        pairing: {
            ja: "中華料理、鰻の蒲焼、ドライフルーツ",
            en: "Chinese cuisine, grilled eel, dried fruits",
            fr: "Cuisine chinoise, anguille grillée, fruits secs",
            zh: "中华料理，蒲烧鳗鱼，干果"
        },
        labelDescription: {
            ja: "時が醸し出す、唯一無二の味わい。",
            en: "A unique taste created by time.",
            fr: "Un goût unique créé par le temps.",
            zh: "时间酿造的独一无二味道。"
        },
        region: {
            ja: "新潟県",
            en: "Niigata Prefecture",
            fr: "Préfecture de Niigata",
            zh: "新潟县"
        },
        sizes: [
            { size: "720ml", price: 12000 }
        ],
        image: "images/products/vintage.png",
        limited: true,
        inStock: 15
    },
    {
        id: 5,
        name: {
            ja: "梅酒「益々」",
            en: "Masu Masu - Plum",
            fr: "Masu Masu - Prune",
            zh: "梅酒「益々」"
        },
        brewery: {
            ja: "益々酒造",
            en: "Masumasu Brewery",
            fr: "Brasserie Masumasu",
            zh: "益々酒造"
        },
        type: {
            ja: "リキュール (梅酒)",
            en: "Liqueur (Plum Wine)",
            fr: "Liqueur (Vin de Prune)",
            zh: "利口酒 (梅酒)"
        },
        price: 3200,
        alcohol: 12.0,
        ricePalish: null,
        riceType: {
            ja: "ベース: 益々酒造 純米酒",
            en: "Base: Masumasu Brewery Junmai",
            fr: "Base: Junmai de la Brasserie Masumasu",
            zh: "基酒: 益々酒造 纯米酒"
        },
        description: {
            ja: "純米酒で漬け込んだ、上品な梅の香りと、すっきりとした甘さ。日本酒蔵が造る、こだわりの梅酒。",
            en: "Elegant plum aroma and clean sweetness, steeped in junmai sake. A carefully crafted plum wine made by a sake brewery.",
            fr: "Arôme de prune élégant et douceur pure, trempé dans le saké junmai. Un vin de prune soigneusement élaboré par une brasserie de saké.",
            zh: "用纯米酒浸泡的优雅梅香和清爽甜味。日本酒造精心制作的梅酒。"
        },
        tastingNotes: {
            ja: "上品な梅の香り、すっきりとした甘さ、爽やかな後味",
            en: "Elegant plum aroma, clean sweetness, refreshing aftertaste",
            fr: "Arôme de prune élégant, douceur pure, arrière-goût rafraîchissant",
            zh: "优雅梅香，清爽甜味，清新回味"
        },
        servingTemp: {
            ja: "ロック・ソーダ割り",
            en: "On the rocks, with soda",
            fr: "Avec glaçons, avec soda",
            zh: "加冰・苏打水"
        },
        pairing: {
            ja: "食前酒として、バニラアイス",
            en: "As aperitif, with vanilla ice cream",
            fr: "En apéritif, avec glace à la vanille",
            zh: "作为餐前酒，配香草冰淇淋"
        },
        labelDescription: {
            ja: "日本酒蔵が造る、こだわりの梅酒。",
            en: "A carefully crafted plum wine made by a sake brewery.",
            fr: "Un vin de prune soigneusement élaboré par une brasserie de saké.",
            zh: "日本酒造精心制作的梅酒。"
        },
        region: {
            ja: "新潟県",
            en: "Niigata Prefecture",
            fr: "Préfecture de Niigata",
            zh: "新潟县"
        },
        sizes: [
            { size: "720ml", price: 3200 }
        ],
        image: "images/products/plum.png",
        limited: false,
        inStock: 25
    }
];

// カテゴリとフィルタ用のデータ
const categories = {
    type: {
        ja: ["純米吟醸", "本醸造", "スパークリング", "古酒 (純米)", "リキュール (梅酒)"],
        en: ["Junmai Ginjo", "Honjozo", "Sparkling", "Vintage Sake (Junmai)", "Liqueur (Plum Wine)"],
        fr: ["Junmai Ginjo", "Honjozo", "Mousseux", "Saké Vintage (Junmai)", "Liqueur (Vin de Prune)"],
        zh: ["纯米吟酿", "本酿造", "起泡酒", "古酒 (纯米)", "利口酒 (梅酒)"]
    },
    price: {
        ranges: [
            { min: 0, max: 5000, label: { ja: "〜¥5,000", en: "~¥5,000", fr: "~¥5,000", zh: "~¥5,000" }},
            { min: 5000, max: 10000, label: { ja: "¥5,000-¥10,000", en: "¥5,000-¥10,000", fr: "¥5,000-¥10,000", zh: "¥5,000-¥10,000" }},
            { min: 10000, max: 100000, label: { ja: "¥10,000〜", en: "¥10,000~", fr: "¥10,000~", zh: "¥10,000~" }}
        ]
    },
    region: {
        ja: ["新潟県"],
        en: ["Niigata Prefecture"],
        fr: ["Préfecture de Niigata"],
        zh: ["新潟县"]
    }
};

// 翻訳用テキスト
const translations = {
    ja: {
        title: "プレミアム日本酒コレクション",
        subtitle: "世界最高峰の日本酒を貴方に",
        searchPlaceholder: "銘柄名・酒蔵・地域で検索",
        filterAll: "すべて",
        filterType: "種類",
        filterPrice: "価格",
        filterRegion: "地域",
        limited: "限定品",
        inStock: "在庫",
        outOfStock: "在庫切れ",
        addToCart: "カートに追加",
        viewDetails: "詳細を見る",
        aiSommelier: "AI酒ソムリエに相談",
        currency: "¥",
        bottles: "本",
        alcohol: "アルコール度数",
        ricePalish: "精米歩合",
        riceType: "使用米",
        awards: "受賞歴",
        tastingNotes: "テイスティングノート",
        brewery: "酒蔵",
        region: "地域",
        
        // Interactive sections
        brewing_process_title: "🏭 醸造工程を見て学ぶ",
        brewing_process_subtitle: "各工程をクリックして詳細説明をご覧ください",
        click_process_title: "工程をクリックしてください",
        click_process_subtitle: "各段階の詳細説明をご覧いただけます",
        
        step_rice_washing: "米洗い",
        step_steaming: "蒸米",
        step_koji: "麹造り",
        step_fermentation: "発酵",
        step_pressing: "圧搾",
        step_aging: "熟成",
        
        rice_types_title: "🌾 酒造好適米について",
        rice_types_subtitle: "使用している米の種類をクリックして特徴をご覧ください",
        click_rice_title: "米の種類をクリックしてください",
        click_rice_subtitle: "各品種の特徴と使用される銘柄をご紹介します",
        
        rice_gohyaku_name: "五百万石",
        rice_gohyaku_origin: "新潟県産",
        rice_koshi_name: "こしいぶき",
        rice_koshi_origin: "新潟県産",
        rice_yamada_name: "山田錦",
        rice_yamada_origin: "兵庫県産",
        
        awards_title: "🏆 受賞歴・海外展開",
        awards_subtitle: "国際的に認められた品質と信頼",
        international_awards: "国際品評会受賞歴",
        ifa_award: "IWC（インターナショナル・ワイン・チャレンジ）",
        ifa_year: "2023年 純米吟醸部門 金賞受賞",
        sake_competition: "全国新酒鑑評会",
        sake_comp_year: "2022年・2023年 連続金賞受賞",
        london_sake: "ロンドン酒チャレンジ",
        london_year: "2023年 純米部門 銀賞受賞",
        
        export_destinations: "海外輸出先",
        country_usa: "アメリカ",
        country_uk: "イギリス",
        country_france: "フランス",
        country_hk: "香港",
        country_sg: "シンガポール",
        country_au: "オーストラリア",
        export_countries: "輸出国・地域",
        brewing_history: "醸造の歴史",
        premium_lineup: "プレミアムライン",
        
        // Company Information
        company_title: "🏢 益々酒造について",
        company_subtitle: "300年の歴史と伝統を受け継ぐ老舗酒蔵",
        company_name: "株式会社益々酒造",
        company_name_en: "Masumasu Brewing Co., Ltd.",
        company_mission_title: "企業理念",
        company_mission: "伝統を守り、革新を追求し、世界に日本酒の素晴らしさを伝える",
        
        company_history_title: "🏛️ 沿革",
        history_1724: "新潟県清流町にて初代益々八郎が酒造業を開始",
        history_1868: "明治維新時代、品質向上により地域一番の酒蔵に成長",
        history_1945: "戦後復興期、近代的な醸造設備を導入",
        history_1995: "海外輸出開始、初の国際品評会出品",
        history_2020: "デジタル化推進、AI技術を活用した品質管理システム導入",
        history_2024: "創業300周年、10言語対応の国際観光酒蔵として事業拡大",
        
        company_facts_title: "📊 企業データ",
        company_established: "設立",
        company_established_value: "1724年（享保9年）",
        company_capital: "資本金",
        company_capital_value: "3億2,000万円",
        company_employees: "従業員数",
        company_employees_value: "145名（杜氏12名含む）",
        company_production: "年間生産量",
        company_production_value: "2,800石（約504,000L）",
        company_export: "輸出率",
        company_export_value: "35%（15ヶ国・地域）",
        company_location: "所在地",
        company_location_value: "新潟県清流町",
        
        company_certifications_title: "🏆 認定・資格",
        cert_organic: "有機JAS認定",
        cert_organic_desc: "オーガニック酒米使用銘柄で取得",
        cert_iso: "ISO 14001認証",
        cert_iso_desc: "環境マネジメントシステム",
        cert_halal: "ハラル認証",
        cert_halal_desc: "イスラム圏輸出向け特定銘柄",
        cert_michelin: "ミシュラン星付きレストラン採用",
        cert_michelin_desc: "世界12店舗で当蔵の日本酒を提供",
        
        leadership_title: "👥 経営陣・杜氏",
        ceo_name: "益々 太郎",
        ceo_title: "代表取締役社長（第15代当主）",
        ceo_desc: "東京大学農学部卒業後、フランス・ボルドー大学にて醸造学を学ぶ。2015年より現職。",
        toji_name: "田中 和明",
        toji_title: "杜氏（とうじ）- 醸造責任者",
        toji_desc: "越後杜氏組合認定。当蔵勤続35年のベテラン杜氏。国際品評会での受賞を多数牽引。",
        cto_name: "佐藤 美香",
        cto_title: "CTO（最高技術責任者）",
        cto_desc: "AI・IoT技術を活用した次世代酒造システムの開発責任者。東工大博士課程修了。",
        farmer_name: "高橋 健一",
        farmer_title: "契約農家統括責任者",
        farmer_desc: "新潟県内の契約農家50軒との連携を統括。酒造好適米の品質向上を推進。",
        
        philosophy_title: "💭 経営理念・ビジョン",
        tradition_title: "伝統の継承",
        tradition_desc: "300年受け継がれてきた醸造技術と職人の心を次世代に伝える",
        innovation_title: "革新への挑戦",
        innovation_desc: "AI技術やデジタル化により、伝統的な酒造りをアップデート",
        global_title: "世界への架け橋",
        global_desc: "日本酒の素晴らしさを世界中の人々に伝え、文化交流を促進",
        sustainability_title: "持続可能性",
        sustainability_desc: "環境に配慮した酒造りで、未来の世代に美しい地球を残す",
        
        contact_info_title: "📞 お問い合わせ",
        headquarters: "本社・工場",
        headquarters_address: "〒123-4567 新潟県清流町益々1-1-1",
        phone: "電話番号",
        phone_number: "025-123-4567（代表）",
        email: "メールアドレス",
        email_address: "info@masumasu-sake.co.jp",
        website: "ウェブサイト",
        website_url: "www.masumasu-sake.co.jp",
        
        // Tour Translation System
        tour_title: "🌐 酒造ツアーの多言語サポート",
        tour_subtitle: "五感で体験する、日本酒造りの現場",
        tour_image_caption: "300年の歴史を感じる酒蔵見学",
        tour_description_1: "ガイドによる丁寧な説明とともに、五感を使って米と水の変化の物語を体験。",
        tour_description_2: "仕込み蔵の香り、もろみの音、そして完成した酒の味わい──それらをあなたの言葉で理解できるよう、多言語ガイド・音声解説をご用意しています。",
        tour_example_title: "🗣️ 翻訳例",
        tour_example_ja: "この工程では、蒸した米に麹菌を植え付けます。温度管理が非常に重要で、職人の経験と技術が活かされる場面です。",
        tour_example_en: "In this process, we inoculate steamed rice with koji spores. Temperature control is crucial, and this is where our craftsmen's experience and expertise truly shine."
    },
    en: {
        title: "Premium Sake Collection",
        subtitle: "World's Finest Sake for Connoisseurs",
        searchPlaceholder: "Search by name, brewery, or region",
        filterAll: "All",
        filterType: "Type",
        filterPrice: "Price",
        filterRegion: "Region",
        limited: "Limited Edition",
        inStock: "In Stock",
        outOfStock: "Out of Stock",
        addToCart: "Add to Cart",
        viewDetails: "View Details",
        aiSommelier: "Ask AI Sommelier",
        currency: "¥",
        bottles: "bottles",
        alcohol: "Alcohol",
        ricePalish: "Rice Polish",
        riceType: "Rice Type",
        awards: "Awards",
        tastingNotes: "Tasting Notes",
        brewery: "Brewery",
        region: "Region",
        
        // Interactive sections
        brewing_process_title: "🏭 Learn the Brewing Process",
        brewing_process_subtitle: "Click each step for detailed explanations",
        click_process_title: "Click on a process step",
        click_process_subtitle: "View detailed explanations of each stage",
        
        step_rice_washing: "Rice Washing",
        step_steaming: "Steaming",
        step_koji: "Koji Making",
        step_fermentation: "Fermentation",
        step_pressing: "Pressing",
        step_aging: "Aging",
        
        rice_types_title: "🌾 About Sake Rice Varieties",
        rice_types_subtitle: "Click on rice varieties to learn about their characteristics",
        click_rice_title: "Click on a rice variety",
        click_rice_subtitle: "Learn about each variety's characteristics and usage",
        
        rice_gohyaku_name: "Gohyakumangoku",
        rice_gohyaku_origin: "Niigata Prefecture",
        rice_koshi_name: "Koshiibuki",
        rice_koshi_origin: "Niigata Prefecture",
        rice_yamada_name: "Yamada Nishiki",
        rice_yamada_origin: "Hyogo Prefecture",
        
        awards_title: "🏆 Awards & International Expansion",
        awards_subtitle: "Internationally recognized quality and trust",
        international_awards: "International Competition Awards",
        ifa_award: "IWC (International Wine Challenge)",
        ifa_year: "2023 Junmai Ginjo Category Gold Award",
        sake_competition: "National New Sake Competition",
        sake_comp_year: "2022-2023 Consecutive Gold Awards",
        london_sake: "London Sake Challenge",
        london_year: "2023 Junmai Category Silver Award",
        
        export_destinations: "Export Destinations",
        country_usa: "United States",
        country_uk: "United Kingdom",
        country_france: "France",
        country_hk: "Hong Kong",
        country_sg: "Singapore",
        country_au: "Australia",
        export_countries: "Export Countries/Regions",
        brewing_history: "Years of Brewing History",
        premium_lineup: "Premium Lineup",
        
        // Company Information
        company_title: "🏢 About Masumasu Brewery",
        company_subtitle: "A traditional brewery with 300 years of history and heritage",
        company_name: "Masumasu Brewing Co., Ltd.",
        company_name_en: "Masumasu Brewing Co., Ltd.",
        company_mission_title: "Corporate Philosophy",
        company_mission: ""Preserving tradition, pursuing innovation, sharing the beauty of sake with the world"",
        company_facts_title: "📊 Company Data",
        company_established: "Established",
        company_established_value: "1724 (9th year of Kyōhō)",
        company_production: "Annual Production",
        company_production_value: "2,800 koku (approx. 504,000L)",
        company_export: "Export Rate", 
        company_export_value: "35% (15 countries/regions)",
        company_location: "Location",
        company_location_value: "Seiryū-machi, Niigata Prefecture",
        company_certifications_title: "🏆 Major Certifications",
        cert_organic: "JAS Organic Certified",
        cert_iso: "ISO 14001 Certified",
        cert_michelin: "Michelin-starred Restaurant Approved",
        
        // AI Features
        ai_greeting: "Hello! I'm Sakura, Masumasu Brewery's AI assistant.",
        ai_example_1: "What dishes pair with this sake?",
        ai_example_2: "What's the difference between sweet and dry?",
        ai_features_title: "🌸 AI Sommelier Sakura - 24/7 Support",
        ai_feature_1: "🍶 Instant detailed information on all brands",
        ai_feature_2: "🍽️ Food and sake pairing suggestions",
        ai_feature_3: "🌐 10-language support for global guests",
        ai_feature_4: "📚 AI trained on 300 years of brewing knowledge",
        ai_chat_start: "🌸 Start Chat with Sakura",
        
        // Products
        products_title: "🍶 Premium Sake Collection",
        products_subtitle: "World's finest sake, for you.",
        sake_junmai_ginjo_name: "Junmai Ginjo \"Masumasu\"",
        sake_junmai_ginjo_type: "Junmai Ginjo",
        sake_junmai_ginjo_desc: "Fruity aroma reminiscent of melon and apple. Light and crisp finish. Expressing gorgeous fragrance that intensifies with each cup.",
        sake_honjozo_name: "Honjozo \"Masumasu\"",
        sake_honjozo_type: "Honjozo",
        sake_honjozo_desc: "Clean and dry with exceptional sharpness. A taste that accompanies daily evening drinks. Classic flavor that enriches everyday dining.",
        sake_sparkling_name: "Sparkling Sake \"Masumasu\"",
        sake_sparkling_type: "Sparkling Sake",
        sake_sparkling_desc: "Fine bubbles and refreshing acidity. Gorgeously decorates celebratory moments. A brilliant bottle perfect for festive occasions.",
        sake_vintage_name: "Aged Sake \"Masumasu\"",
        sake_vintage_type: "Aged Sake",
        sake_vintage_desc: "Aged over 5 years. Matured aroma like caramel and nuts, with a mellow and deep flavor. Unique taste brewed by time.",
        sake_plum_name: "Plum Wine \"Masumasu\"",
        sake_plum_type: "Plum Liqueur",
        sake_plum_desc: "Elegant plum aroma and refreshing sweetness, steeped in junmai sake. Artisanal plum wine made by a sake brewery.",
        
        // Navigation
        navigation_products: "Sake",
        navigation_tour: "Tour",
        navigation_about: "About Brewery",
        navigation_visit: "Visit",
        navigation_contact: "Contact",
        
        // Tour System
        tour_title: "🌐 Multilingual Support for Brewery Tours",
        tour_subtitle: "Experience sake brewing with all five senses",
        tour_image_caption: "Feel 300 years of history in our brewery tour",
        tour_description_1: "Experience the story of rice and water transformation with all five senses, guided by detailed explanations.",
        tour_description_2: "The aroma of the brewing room, sounds of moromi fermentation, and taste of finished sake—we provide multilingual guides and audio commentary so you can understand everything in your own language.",
        tour_example_title: "🗣️ Translation Example",
        tour_example_ja: "この工程では、蒸した米に麹菌を植え付けます。温度管理が非常に重要で、職人の経験と技術が活かされる場面です。",
        tour_example_en: "In this process, we inoculate steamed rice with koji spores. Temperature control is crucial, and this is where our craftsmen's experience and expertise truly shine."
        
        company_history_title: "🏛️ History",
        history_1724: "Founded by Masumasu Hachiro in Seiryu-cho, Niigata Prefecture",
        history_1868: "Grew to become the region's top brewery through quality improvements during the Meiji Restoration",
        history_1945: "Introduced modern brewing equipment during post-war reconstruction",
        history_1995: "Started overseas exports and first international competition entry",
        history_2020: "Advanced digitalization and introduced AI-powered quality management systems",
        history_2024: "300th anniversary, expanded as a 10-language international tourism brewery",
        
        company_facts_title: "📊 Company Data",
        company_established: "Founded",
        company_established_value: "1724 (9th year of Kyōhō era)",
        company_capital: "Capital",
        company_capital_value: "320 million yen",
        company_employees: "Employees",
        company_employees_value: "145 staff (including 12 Toji)",
        company_production: "Annual Production",
        company_production_value: "2,800 koku (approx. 504,000L)",
        company_export: "Export Ratio",
        company_export_value: "35% (15 countries/regions)",
        company_location: "Location",
        company_location_value: "Seiryu-cho, Niigata Prefecture",
        
        company_certifications_title: "🏆 Certifications & Qualifications",
        cert_organic: "Organic JAS Certification",
        cert_organic_desc: "Obtained for organic rice sake products",
        cert_iso: "ISO 14001 Certification",
        cert_iso_desc: "Environmental Management System",
        cert_halal: "Halal Certification",
        cert_halal_desc: "For specific products exported to Islamic regions",
        cert_michelin: "Michelin-starred Restaurant Adoption",
        cert_michelin_desc: "Our sake served at 12 restaurants worldwide",
        
        leadership_title: "👥 Management Team & Toji",
        ceo_name: "Masumasu Taro",
        ceo_title: "President & CEO (15th Generation Head)",
        ceo_desc: "After graduating from Tokyo University Faculty of Agriculture, studied brewing science at University of Bordeaux, France. In current position since 2015.",
        toji_name: "Tanaka Kazuaki",
        toji_title: "Toji - Head Brewer",
        toji_desc: "Certified by Echigo Toji Association. Veteran Toji with 35 years at our brewery. Led numerous international competition awards.",
        cto_name: "Sato Mika",
        cto_title: "CTO (Chief Technology Officer)",
        cto_desc: "Development head for next-generation brewing systems using AI and IoT technology. PhD from Tokyo Institute of Technology.",
        farmer_name: "Takahashi Kenichi",
        farmer_title: "Contract Farm Coordination Manager",
        farmer_desc: "Oversees partnerships with 50 contract farms in Niigata Prefecture. Promotes quality improvement of sake-brewing rice.",
        
        philosophy_title: "💭 Philosophy & Vision",
        tradition_title: "Heritage Preservation",
        tradition_desc: "Passing down 300 years of brewing techniques and craftsman spirit to the next generation",
        innovation_title: "Innovation Challenge",
        innovation_desc: "Upgrading traditional brewing through AI technology and digitalization",
        global_title: "Global Bridge",
        global_desc: "Sharing the beauty of sake worldwide and promoting cultural exchange",
        sustainability_title: "Sustainability",
        sustainability_desc: "Environmentally conscious brewing for a beautiful planet for future generations",
        
        contact_info_title: "📞 Contact Information",
        headquarters: "Headquarters & Factory",
        headquarters_address: "〒123-4567 1-1-1 Masumasu, Seiryu-cho, Niigata Prefecture",
        phone: "Phone",
        phone_number: "025-123-4567 (Main)",
        email: "Email",
        email_address: "info@masumasu-sake.co.jp",
        website: "Website",
        website_url: "www.masumasu-sake.co.jp",
        
        // Tour Translation System
        tour_title: "🌐 Brewery Tour Multilingual Support",
        tour_subtitle: "Experience sake brewing with all five senses",
        tour_image_caption: "Brewery tour experiencing 300 years of history",
        tour_description_1: "Experience the story of rice and water transformation through all five senses with detailed explanations from our guides.",
        tour_description_2: "The aroma of the brewing room, the sounds of moromi fermentation, and the taste of the finished sake—we provide multilingual guides and audio commentary so you can understand it all in your own language.",
        tour_example_title: "🗣️ Translation Example",
        tour_example_ja: "この工程では、蒸した米に麹菌を植え付けます。温度管理が非常に重要で、職人の経験と技術が活かされる場面です。",
        tour_example_en: "In this process, we inoculate steamed rice with koji spores. Temperature control is crucial, and this is where our craftsmen's experience and expertise truly shine."
    },
    fr: {
        title: "Collection Premium de Saké",
        subtitle: "Les Meilleurs Sakés du Monde pour Connaisseurs",
        searchPlaceholder: "Rechercher par nom, brasserie ou région",
        filterAll: "Tous",
        filterType: "Type",
        filterPrice: "Prix",
        filterRegion: "Région",
        limited: "Édition Limitée",
        inStock: "En Stock",
        outOfStock: "Rupture de Stock",
        addToCart: "Ajouter au Panier",
        viewDetails: "Voir Détails",
        aiSommelier: "Demander à l'IA Sommelier",
        currency: "¥",
        bottles: "bouteilles",
        alcohol: "Alcool",
        ricePalish: "Polissage du Riz",
        riceType: "Type de Riz",
        awards: "Récompenses",
        tastingNotes: "Notes de Dégustation",
        brewery: "Brasserie",
        region: "Région",
        
        // Interactive sections
        brewing_process_title: "🏭 Apprendre le Processus de Brassage",
        brewing_process_subtitle: "Cliquez sur chaque étape pour des explications détaillées",
        click_process_title: "Cliquez sur une étape du processus",
        click_process_subtitle: "Voir les explications détaillées de chaque étape",
        
        step_rice_washing: "Lavage du Riz",
        step_steaming: "Cuisson à la Vapeur",
        step_koji: "Fabrication du Koji",
        step_fermentation: "Fermentation",
        step_pressing: "Pressage",
        step_aging: "Vieillissement",
        
        rice_types_title: "🌾 À Propos des Variétés de Riz à Saké",
        rice_types_subtitle: "Cliquez sur les variétés de riz pour connaître leurs caractéristiques",
        click_rice_title: "Cliquez sur une variété de riz",
        click_rice_subtitle: "Découvrez les caractéristiques et l'utilisation de chaque variété",
        
        rice_gohyaku_name: "Gohyakumangoku",
        rice_gohyaku_origin: "Préfecture de Niigata",
        rice_koshi_name: "Koshiibuki",
        rice_koshi_origin: "Préfecture de Niigata",
        rice_yamada_name: "Yamada Nishiki",
        rice_yamada_origin: "Préfecture de Hyogo",
        
        awards_title: "🏆 Récompenses et Expansion Internationale",
        awards_subtitle: "Qualité et confiance reconnues internationalement",
        international_awards: "Prix de Concours Internationaux",
        ifa_award: "IWC (International Wine Challenge)",
        ifa_year: "2023 Médaille d'Or Catégorie Junmai Ginjo",
        sake_competition: "Concours National des Nouveaux Sakés",
        sake_comp_year: "2022-2023 Médailles d'Or Consécutives",
        london_sake: "London Sake Challenge",
        london_year: "2023 Médaille d'Argent Catégorie Junmai",
        
        export_destinations: "Destinations d'Exportation",
        country_usa: "États-Unis",
        country_uk: "Royaume-Uni",
        country_france: "France",
        country_hk: "Hong Kong",
        country_sg: "Singapour",
        country_au: "Australie",
        export_countries: "Pays/Régions d'Exportation",
        brewing_history: "Années d'Histoire de Brassage",
        premium_lineup: "Gamme Premium",
        
        // Tour Translation System
        tour_title: "🌐 Support Multilingue pour la Visite de la Brasserie",
        tour_subtitle: "Découvrez le brassage du saké avec tous vos sens",
        tour_image_caption: "Visite de brasserie découvrant 300 ans d'histoire",
        tour_description_1: "Découvrez l'histoire de la transformation du riz et de l'eau avec tous vos sens grâce aux explications détaillées de nos guides.",
        tour_description_2: "L'arôme de la salle de brassage, les sons de la fermentation moromi, et le goût du saké fini—nous fournissons des guides multilingues et des commentaires audio pour que vous puissiez tout comprendre dans votre propre langue.",
        tour_example_title: "🗣️ Exemple de Traduction",
        tour_example_ja: "この工程では、蒸した米に麹菌を植え付けます。温度管理が非常に重要で、職人の経験と技術が活かされる場面です。",
        tour_example_en: "In this process, we inoculate steamed rice with koji spores. Temperature control is crucial, and this is where our craftsmen's experience and expertise truly shine."
    },
    zh: {
        title: "顶级日本酒收藏",
        subtitle: "为鉴赏家呈现世界最顶级日本酒",
        searchPlaceholder: "按名称、酒造或地区搜索",
        filterAll: "全部",
        filterType: "类型",
        filterPrice: "价格",
        filterRegion: "地区",
        limited: "限定版",
        inStock: "有库存",
        outOfStock: "缺货",
        addToCart: "加入购物车",
        viewDetails: "查看详情",
        aiSommelier: "咨询AI侍酒师",
        currency: "¥",
        bottles: "瓶",
        alcohol: "酒精度",
        ricePalish: "精米步合",
        riceType: "使用米",
        awards: "获奖记录",
        tastingNotes: "品酒笔记",
        brewery: "酒造",
        region: "地区",
        
        // Interactive sections
        brewing_process_title: "🏭 学习酿造工艺",
        brewing_process_subtitle: "点击各工序查看详细说明",
        click_process_title: "请点击工艺步骤",
        click_process_subtitle: "查看各阶段的详细说明",
        
        step_rice_washing: "洗米",
        step_steaming: "蒸米",
        step_koji: "制曲",
        step_fermentation: "发酵",
        step_pressing: "压榨",
        step_aging: "熟成",
        
        rice_types_title: "🌾 关于酿酒用米品种",
        rice_types_subtitle: "点击米种了解其特性",
        click_rice_title: "请点击米种",
        click_rice_subtitle: "了解各品种的特性和使用情况",
        
        rice_gohyaku_name: "五百万石",
        rice_gohyaku_origin: "新潟县产",
        rice_koshi_name: "越吹雪",
        rice_koshi_origin: "新潟县产",
        rice_yamada_name: "山田锦",
        rice_yamada_origin: "兵库县产",
        
        awards_title: "🏆 获奖经历・海外发展",
        awards_subtitle: "国际认可的品质与信赖",
        international_awards: "国际品评会获奖经历",
        ifa_award: "IWC（国际葡萄酒挑战赛）",
        ifa_year: "2023年 纯米吟酿部门金奖",
        sake_competition: "全国新酒鉴评会",
        sake_comp_year: "2022年・2023年 连续金奖",
        london_sake: "伦敦清酒挑战赛",
        london_year: "2023年 纯米部门银奖",
        
        export_destinations: "海外出口目的地",
        country_usa: "美国",
        country_uk: "英国",
        country_france: "法国",
        country_hk: "香港",
        country_sg: "新加坡",
        country_au: "澳大利亚",
        export_countries: "出口国家・地区",
        brewing_history: "酿造历史",
        premium_lineup: "高级产品线",
        
        // Company Information
        company_title: "🏢 关于益々酒造",
        company_subtitle: "传承300年历史与传统的老字号酒造",
        company_name: "益々酒造株式会社",
        company_name_en: "Masumasu Brewing Co., Ltd.",
        company_mission_title: "企业理念",
        company_mission: ""传承传统，追求创新，向世界传播日本酒的美好"",
        
        company_history_title: "🏛️ 发展历程",
        history_1724: "初代益々八郎在新潟县清流町创业",
        history_1868: "明治维新时期，凭借品质提升成为地区第一酒造",
        history_1945: "战后复兴期，引进现代化酿造设备",
        history_1995: "开始海外出口，首次参加国际品评会",
        history_2020: "推进数字化，引进AI技术品质管理系统",
        history_2024: "创业300周年，作为10语言对应的国际观光酒造扩大事业",
        
        company_facts_title: "📊 企业数据",
        company_established: "成立",
        company_established_value: "1724年（享保9年）",
        company_capital: "注册资本",
        company_capital_value: "3.2亿日元",
        company_employees: "员工人数",
        company_employees_value: "145名（含杜氏12名）",
        company_production: "年产量",
        company_production_value: "2,800石（约504,000L）",
        company_export: "出口比例",
        company_export_value: "35%（15个国家・地区）",
        company_location: "所在地",
        company_location_value: "新潟县清流町",
        
        company_certifications_title: "🏆 认证・资格",
        cert_organic: "有机JAS认证",
        cert_organic_desc: "有机酒米使用产品获得",
        cert_iso: "ISO 14001认证",
        cert_iso_desc: "环境管理体系",
        cert_halal: "清真认证",
        cert_halal_desc: "面向伊斯兰地区出口特定产品",
        cert_michelin: "米其林星级餐厅采用",
        cert_michelin_desc: "全球12家店铺提供本酒造日本酒",
        
        leadership_title: "👥 经营团队・杜氏",
        ceo_name: "益々 太郎",
        ceo_title: "代表取締役社長（第15代当主）",
        ceo_desc: "东京大学农学部毕业后，在法国波尔多大学学习酿酒学。2015年起任现职。",
        toji_name: "田中 和明",
        toji_title: "杜氏 - 酿造负责人",
        toji_desc: "越后杜氏组合认定。在本酒造工作35年的资深杜氏。多次获得国际品评会奖项。",
        cto_name: "佐藤 美香",
        cto_title: "CTO（最高技术官）",
        cto_desc: "运用AI・IoT技术的新一代酿酒系统开发负责人。东工大博士课程毕业。",
        farmer_name: "高橋 健一",
        farmer_title: "合同农家统括负责人",
        farmer_desc: "统括与新潟县内50家合同农家的合作。推进酿酒适用米的品质改善。",
        
        philosophy_title: "💭 经营理念・愿景",
        tradition_title: "传统传承",
        tradition_desc: "将300年传承的酿造技术和工匠精神传递给下一代",
        innovation_title: "创新挑战",
        innovation_desc: "通过AI技术和数字化，升级传统酿酒工艺",
        global_title: "世界桥梁",
        global_desc: "向全世界传播日本酒的美好，促进文化交流",
        sustainability_title: "可持续发展",
        sustainability_desc: "以环保的酿酒方式，为后代留下美丽地球",
        
        contact_info_title: "📞 联系方式",
        headquarters: "总部・工厂",
        headquarters_address: "〒123-4567 新潟县清流町益々1-1-1",
        phone: "电话号码",
        phone_number: "025-123-4567（总机）",
        email: "邮箱地址",
        email_address: "info@masumasu-sake.co.jp",
        website: "网站",
        website_url: "www.masumasu-sake.co.jp",
        
        // Tour Translation System
        tour_title: "🌐 酒造参观多语言支持",
        tour_subtitle: "用五感体验日本酒酿造现场",
        tour_image_caption: "感受300年历史的酒造参观",
        tour_description_1: "在导游的详细说明下，用五感体验米与水变化的故事。",
        tour_description_2: "酿造室的香气、醪液的声音、以及成品酒的味道——为了让您能用自己的语言理解这一切，我们准备了多语言导游和音频解说。",
        tour_example_title: "🗣️ 翻译示例",
        tour_example_ja: "この工程では、蒸した米に麹菌を植え付けます。温度管理が非常に重要で、職人の経験と技術が活かされる場面です。",
        tour_example_en: "In this process, we inoculate steamed rice with koji spores. Temperature control is crucial, and this is where our craftsmen's experience and expertise truly shine."
    },
    ko: {
        title: "프리미엄 일본술 컬렉션",
        subtitle: "세계 최고봉의 일본술을 당신에게",
        searchPlaceholder: "브랜드명·양조장·지역으로 검색",
        filterAll: "전체",
        filterType: "종류",
        filterPrice: "가격",
        filterRegion: "지역",
        limited: "한정품",
        inStock: "재고 있음",
        outOfStock: "품절",
        addToCart: "카트에 추가",
        viewDetails: "상세보기",
        aiSommelier: "AI 소믈리에 상담",
        currency: "¥",
        
        // Navigation
        navigation_products: "일본술",
        navigation_tour: "투어",
        navigation_about: "양조장 소개",
        navigation_visit: "견학",
        navigation_contact: "문의",
        
        // Company Info
        company_name: "마수마수 양조장 주식회사",
        company_name_en: "Masumasu Brewing Co., Ltd.",
        company_history: "창업 1724년, 300년 역사",
        company_philosophy: "전통을 지키고, 혁신을 추구하며, 세계에 일본술의 멋을 전한다",
        
        // Tour System
        tour_title: "🌐 양조장 견학 다국어 지원",
        tour_subtitle: "오감으로 체험하는 일본술 양조 현장",
        tour_description_1: "가이드의 상세한 설명과 함께 쌀과 물이 변화하는 이야기를 오감으로 체험하세요.",
        tour_description_2: "양조장의 향기, 모로미의 소리, 완성된 술의 맛 등 모든 것을 귀하의 언어로 이해할 수 있도록 다국어 가이드와 오디오 해설을 제공합니다.",
        tour_example_title: "🗣️ 번역 예시",
        tour_example_ja: "この工程では、蒸した米に麹菌を植え付けます。温度管理が非常に重要で、職人の経験と技術が活かされる場面です。",
        tour_example_en: "이 공정에서는 찐 쌀에 누룩균을 접종합니다. 온도 관리가 매우 중요하며, 장인의 경험과 기술이 발휘되는 단계입니다.",
        
        // Company Info
        company_title: "🏢 마수마수 양조장 소개",
        company_subtitle: "300년 역사와 전통을 이어받은 노포 양조장",
        company_mission_title: "기업 이념",
        company_mission: "전통을 지키고, 혁신을 추구하며, 세계에 일본술의 멋을 전한다",
        company_facts_title: "📊 기업 데이터",
        company_established: "설립",
        company_established_value: "1724년（교호 9년）",
        company_production: "연간 생산량",
        company_production_value: "2,800석（약 504,000L）",
        company_export: "수출률",
        company_export_value: "35%（15개국·지역）",
        company_location: "소재지",
        company_location_value: "니가타현 세이류마치",
        company_certifications_title: "🏆 주요 인증",
        cert_organic: "유기 JAS 인증",
        cert_iso: "ISO 14001 인증",
        cert_michelin: "미슐랭 스타 레스토랑 채용",
        
        // AI Features
        ai_greeting: "안녕하세요! 저는 사쿠라, 마수마수 양조장의 AI 어시스턴트입니다.",
        ai_example_1: "이 술에 맞는 요리는?",
        ai_example_2: "단맛과 매운맛의 차이는?",
        ai_features_title: "🌸 AI 소믈리에·사쿠라가 24시간 지원",
        ai_feature_1: "🍶 전 브랜드의 상세 정보를 즉시 답변",
        ai_feature_2: "🍽️ 요리와의 페어링 제안",
        ai_feature_3: "🌐 10개 언어 지원으로 전 세계 손님 대응",
        ai_feature_4: "📚 300년 역사와 양조 지식을 AI가 학습",
        ai_chat_start: "🌸 사쿠라와 채팅 시작",
        
        // Products
        products_title: "🍶 프리미엄 일본술 컬렉션",
        products_subtitle: "세계 최고봉의 일본술을 당신에게",
        alcohol: "알코올 도수",
        ricePalish: "정미보합",
        sake_junmai_ginjo_name: "준마이 긴조「마수마수」",
        sake_junmai_ginjo_type: "Junmai Ginjo",
        sake_junmai_ginjo_desc: "멜론과 사과를 연상케 하는 과일향. 가볍고 깔끔한 뒷맛. 잔을 거듭할수록 더해지는 화려한 향기를 표현.",
        sake_honjozo_name: "혼조조「마수마수」",
        sake_honjozo_type: "Honjozo",
        sake_honjozo_desc: "깔끔한 매운맛으로 뛰어난 깔끔함. 매일의 만찬에 어울리는 맛. 일상의 식탁을 풍요롭게 하는 클래식한 맛.",
        sake_sparkling_name: "스파클링 청주「마수마수」",
        sake_sparkling_type: "Sparkling Sake",
        sake_sparkling_desc: "세밀한 거품과 상쾌한 산미. 건배 장면을 화려하게 장식. 축하 자리에 어울리는 화려한 한 병.",
        sake_vintage_name: "고주「마수마수」",
        sake_vintage_type: "Aged Sake",
        sake_vintage_desc: "5년 이상 숙성. 캐러멜이나 견과류 같은 숙성향과 부드럽고 깊이 있는 맛. 시간이 빚어내는 유일무이한 맛.",
        sake_plum_name: "매실주「마수마수」",
        sake_plum_type: "Plum Liqueur",
        sake_plum_desc: "준마이주로 담근 고급스러운 매실 향과 깔끔한 단맛. 일본술 양조장이 만드는 정성스러운 매실주."
    },
    it: {
        title: "Collezione Premium di Sake",
        subtitle: "I migliori sake del mondo per voi",
        searchPlaceholder: "Cerca per nome, birreria o regione",
        filterAll: "Tutti",
        filterType: "Tipo",
        filterPrice: "Prezzo",
        filterRegion: "Regione",
        limited: "Edizione limitata",
        inStock: "Disponibile",
        outOfStock: "Esaurito",
        addToCart: "Aggiungi al carrello",
        viewDetails: "Vedi dettagli",
        aiSommelier: "Consulta il sommelier IA",
        currency: "¥",
        
        // Navigation
        navigation_products: "Sake",
        navigation_tour: "Tour",
        navigation_about: "Sulla birreria",
        navigation_visit: "Visita",
        navigation_contact: "Contatti",
        
        // Company Info
        company_name: "Masumasu Brewing Co., Ltd.",
        company_name_en: "Masumasu Brewing Co., Ltd.",
        company_history: "Fondata nel 1724, 300 anni di storia",
        company_philosophy: "Preservare la tradizione, perseguire l'innovazione, trasmettere la bellezza del sake al mondo",
        
        // Tour System
        tour_title: "🌐 Supporto multilingue per visite alla birreria",
        tour_subtitle: "Esperienza del sito di produzione del sake con i cinque sensi",
        tour_description_1: "Sperimenta con i cinque sensi la storia della trasformazione di riso e acqua con spiegazioni dettagliate della guida.",
        tour_description_2: "L'aroma della sala di produzione, i suoni della fermentazione moromi e il gusto del sake finito: forniamo guide multilingue e commenti audio per comprendere tutto nella vostra lingua.",
        tour_example_title: "🗣️ Esempio di traduzione",
        tour_example_ja: "この工程では、蒸した米に麹菌を植え付けます。温度管理が非常に重要で、職人の経験と技術が活かされる場面です。",
        tour_example_en: "In questo processo, inoculiamo il riso cotto a vapore con le spore di koji. Il controllo della temperatura è cruciale, ed è qui che l'esperienza e l'expertise dei nostri artigiani brillano davvero."
    },
    es: {
        title: "Colección Premium de Sake",
        subtitle: "Los mejores sakes del mundo para ustedes",
        searchPlaceholder: "Buscar por nombre, cervecería o región",
        filterAll: "Todos",
        filterType: "Tipo",
        filterPrice: "Precio",
        filterRegion: "Región",
        limited: "Edición limitada",
        inStock: "Disponible",
        outOfStock: "Agotado",
        addToCart: "Añadir al carrito",
        viewDetails: "Ver detalles",
        aiSommelier: "Consultar sommelier IA",
        currency: "¥",
        
        // Navigation
        navigation_products: "Sake",
        navigation_tour: "Tour",
        navigation_about: "Sobre la cervecería",
        navigation_visit: "Visita",
        navigation_contact: "Contacto",
        
        // Company Info
        company_name: "Masumasu Brewing Co., Ltd.",
        company_name_en: "Masumasu Brewing Co., Ltd.",
        company_history: "Fundada en 1724, 300 años de historia",
        company_philosophy: "Preservar la tradición, perseguir la innovación, transmitir la belleza del sake al mundo",
        
        // Tour System
        tour_title: "🌐 Soporte multilingüe para visitas a la cervecería",
        tour_subtitle: "Experiencia del sitio de elaboración de sake con los cinco sentidos",
        tour_description_1: "Experimenta con los cinco sentidos la historia de la transformación del arroz y agua con explicaciones detalladas del guía.",
        tour_description_2: "El aroma de la sala de elaboración, los sonidos de la fermentación moromi y el sabor del sake terminado: proporcionamos guías multilingües y comentarios de audio para que puedas entender todo en tu idioma.",
        tour_example_title: "🗣️ Ejemplo de traducción",
        tour_example_ja: "この工程では、蒸した米に麹菌を植え付けます。温度管理が非常に重要で、職人の経験と技術が活かされる場面です。",
        tour_example_en: "En este proceso, inoculamos el arroz cocido al vapor con esporas de koji. El control de temperatura es crucial, y aquí es donde la experiencia y pericia de nuestros artesanos realmente brillan."
    },
    vi: {
        title: "Bộ sưu tập Sake cao cấp",
        subtitle: "Những sake tốt nhất thế giới dành cho bạn",
        searchPlaceholder: "Tìm kiếm theo tên, nhà máy bia hoặc vùng",
        filterAll: "Tất cả",
        filterType: "Loại",
        filterPrice: "Giá",
        filterRegion: "Vùng",
        limited: "Phiên bản giới hạn",
        inStock: "Còn hàng",
        outOfStock: "Hết hàng",
        addToCart: "Thêm vào giỏ",
        viewDetails: "Xem chi tiết",
        aiSommelier: "Tư vấn sommelier AI",
        currency: "¥",
        
        // Navigation
        navigation_products: "Sake",
        navigation_tour: "Tour",
        navigation_about: "Về nhà máy bia",
        navigation_visit: "Thăm quan",
        navigation_contact: "Liên hệ",
        
        // Company Info
        company_name: "Công ty TNHH Masumasu Brewing",
        company_name_en: "Masumasu Brewing Co., Ltd.",
        company_history: "Thành lập năm 1724, 300 năm lịch sử",
        company_philosophy: "Bảo tồn truyền thống, theo đuổi đổi mới, truyền tải vẻ đẹp của sake đến thế giới",
        
        // Tour System
        tour_title: "🌐 Hỗ trợ đa ngôn ngữ cho tham quan nhà máy bia",
        tour_subtitle: "Trải nghiệm hiện trường sản xuất sake bằng năm giác quan",
        tour_description_1: "Trải nghiệm câu chuyện biến đổi của gạo và nước bằng năm giác quan với lời giải thích chi tiết của hướng dẫn viên.",
        tour_description_2: "Hương thơm của phòng sản xuất, âm thanh lên men moromi, và hương vị của sake hoàn thành - chúng tôi cung cấp hướng dẫn viên đa ngôn ngữ và bình luận âm thanh để bạn có thể hiểu mọi thứ bằng ngôn ngữ của mình.",
        tour_example_title: "🗣️ Ví dụ về dịch thuật",
        tour_example_ja: "この工程では、蒸した米に麹菌を植え付けます。温度管理が非常に重要で、職人の経験と技術が活かされる場面です。",
        tour_example_en: "Trong quy trình này, chúng tôi tiêm bào tử koji vào gạo đã hấp. Kiểm soát nhiệt độ rất quan trọng, và đây là nơi kinh nghiệm và chuyên môn của các nghệ nhân thực sự tỏa sáng."
    }
};