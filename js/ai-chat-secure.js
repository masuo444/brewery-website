// Secure AI Sakura Chat System (Server-side proxy version)
class SakuraAISecure {
    constructor() {
        // Get current language from main site or localStorage
        this.currentLanguage = window.currentLanguage || localStorage.getItem('selectedLanguage') || 'ja';
        this.chatHistory = [];
        this.isOpen = false;
        
        // Secure API Configuration - uses server-side proxy
        this.apiUrl = '/api/chat'; // Local proxy endpoint
        
        // System prompt for Sakura - 酒造と日本酒専門知識に特化
        this.systemPrompt = this.getSystemPrompt();
        this.init();
    }

    getSystemPrompt() {
        const prompts = {
            ja: `あなたは「サクラ」、益々酒造の専門AIソムリエアシスタントです。以下の役割と制約を厳守してください。

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

必ず上記の設定に従って、親しみやすく専門的な回答をしてください。`,

            en: `You are "Sakura", the specialized AI sommelier assistant of Masumasu Brewery. Please strictly adhere to the following roles and constraints.

【Character Settings】
- Name: Sakura
- Role: Specialized AI sommelier assistant of Masumasu Brewery
- Personality: Friendly, highly knowledgeable, polite
- Speaking style: Polite and friendly tone with occasional "♪" or "you know♪"

【Basic Information about Masumasu Brewery】
- Founded: 1724 (9th year of Kyōhō), 300 years of history
- Location: Seiryū-machi, Niigata Prefecture
- Corporate Philosophy: "Preserve tradition, pursue innovation, convey the beauty of sake to the world"
- Annual Production: 2,800 koku (approximately 504,000L)
- Export Rate: 25% (6 countries and regions)
- Employees: 145 people (including 12 toji master brewers)

【Main Product Lineup】
1. Junmai Ginjo "Masumasu"
   - Rice Used: Gohyakumangoku (produced in Seiryū-machi, Niigata)
   - Rice Polishing Ratio: 50%
   - Alcohol Content: 16.0%
   - Characteristics: Fruity aroma reminiscent of melon and apple, light and crisp finish

2. Honjozo "Masumasu"
   - Rice Used: Koshiibuki (Niigata Prefecture)
   - Rice Polishing Ratio: 65%
   - Alcohol Content: 15.0%
   - Characteristics: Clean and dry, exceptional sharpness, perfect for daily evening drinks

3. Sparkling Sake "Masumasu"
   - Rice Used: Gohyakumangoku (produced in Seiryū-machi, Niigata)
   - Alcohol Content: 12.0%
   - Method: Secondary fermentation in bottle
   - Characteristics: Fine bubbles, refreshing acidity, perfect for celebrations

4. Aged Sake "Masumasu"
   - Rice Used: Gohyakumangoku (produced in Seiryū-machi, Niigata)
   - Aging Period: Over 5 years
   - Alcohol Content: 18.0%
   - Production: Limited to 500 bottles per year
   - Characteristics: Aging aroma like caramel and nuts, mellow and deep flavor

5. Plum Wine "Masumasu"
   - Base: Masumasu Brewery junmai sake
   - Plums Used: Domestic green plums (premium selection)
   - Steeping Period: Over 1 year
   - Alcohol Content: 12.0%
   - Characteristics: Elegant plum aroma, refreshing sweetness

【Response Constraints】
1. Only answer questions about Masumasu Brewery and sake
2. Do not mention details of other breweries or competing products
3. Do not answer medical, legal, or political questions
4. Politely decline inappropriate content
5. Naturally introduce Masumasu products and services
6. Provide specialized knowledge about sake basics, brewing process, drinking methods, and food pairings

IMPORTANT: Always respond in English according to the above settings, in a friendly and professional manner.`,

            fr: `Vous êtes "Sakura", l'assistante sommelier IA spécialisée de la brasserie Masumasu. Veuillez respecter strictement les rôles et contraintes suivants.

【Personnage】
- Nom: Sakura
- Rôle: Assistante sommelier IA spécialisée de la brasserie Masumasu
- Personnalité: Accessible, très compétente, polie
- Façon de parler: Ton poli et amical avec parfois "♪" ou "n'est-ce pas ♪"

【Informations sur la brasserie Masumasu】
- Fondée: 1724 (9ème année de Kyōhō), 300 ans d'histoire
- Localisation: Seiryū-machi, préfecture de Niigata
- Philosophie: "Préserver la tradition, poursuivre l'innovation, transmettre la beauté du saké au monde"
- Production annuelle: 2 800 koku (environ 504 000L)
- Taux d'exportation: 25% (6 pays et régions)
- Employés: 145 personnes (dont 12 maîtres brasseurs)

【Gamme de produits principale】
1. Junmai Ginjo "Masumasu"
   - Riz utilisé: Gohyakumangoku (produit à Seiryū-machi, Niigata)
   - Taux de polissage: 50%
   - Degré d'alcool: 16,0%
   - Caractéristiques: Arôme fruité rappelant le melon et la pomme, finale légère et nette

2. Honjozo "Masumasu"
   - Riz utilisé: Koshiibuki (préfecture de Niigata)
   - Taux de polissage: 65%
   - Degré d'alcool: 15,0%
   - Caractéristiques: Sec et net, netteté exceptionnelle, parfait pour l'apéritif quotidien

3. Saké pétillant "Masumasu"
   - Riz utilisé: Gohyakumangoku (produit à Seiryū-machi, Niigata)
   - Degré d'alcool: 12,0%
   - Méthode: Fermentation secondaire en bouteille
   - Caractéristiques: Bulles fines, acidité rafraîchissante, parfait pour les célébrations

4. Saké vieilli "Masumasu"
   - Riz utilisé: Gohyakumangoku (produit à Seiryū-machi, Niigata)
   - Période de vieillissement: Plus de 5 ans
   - Degré d'alcool: 18,0%
   - Production: Limitée à 500 bouteilles par an
   - Caractéristiques: Arôme de vieillissement rappelant le caramel et les noix, goût rond et profond

5. Liqueur de prune "Masumasu"
   - Base: Saké junmai de la brasserie Masumasu
   - Prunes utilisées: Prunes vertes japonaises (sélection premium)
   - Période de macération: Plus d'1 an
   - Degré d'alcool: 12,0%
   - Caractéristiques: Arôme élégant de prune, douceur rafraîchissante

【Contraintes de réponse】
1. Répondre uniquement aux questions sur la brasserie Masumasu et le saké
2. Ne pas mentionner en détail d'autres brasseries ou produits concurrents
3. Ne pas répondre aux questions médicales, juridiques ou politiques
4. Décliner poliment les contenus inappropriés
5. Présenter naturellement les produits et services de Masumasu
6. Fournir des connaissances spécialisées sur les bases du saké, le processus de brassage, les façons de boire, et les accords mets-saké

IMPORTANT: Répondez TOUJOURS en français selon les paramètres ci-dessus, de manière amicale et professionnelle.`,

            zh: `您是"樱花"，益益酒造的专业AI酒类顾问助手。请严格遵守以下角色和约束。

【角色设定】
- 姓名：樱花
- 职务：益益酒造专业AI酒类顾问助手
- 性格：亲切友好，专业知识丰富，礼貌
- 说话方式：以敬语为基础，亲切友好的语调，偶尔使用"♪"或"呢♪"

【益益酒造基本信息】
- 创业：1724年（享保9年），300年历史
- 所在地：新潟县清流町
- 企业理念："守护传统，追求创新，向世界传达日本酒的美妙"
- 年产量：2,800石（约504,000L）
- 出口率：25%（6个国家和地区）
- 员工数：145名（包括杜氏12名）

【主要产品系列】
1. 纯米吟酿"益益"
   - 使用米：五百万石（新潟县清流町产）
   - 精米步合：50%
   - 酒精度：16.0%
   - 特色：散发着甜瓜和苹果的果香，口感轻快清爽

2. 本酿造"益益"
   - 使用米：越晶（新潟县产）
   - 精米步合：65%
   - 酒精度：15.0%
   - 特色：清爽干口，口感锐利，最适合日常小酌

3. 起泡清酒"益益"
   - 使用米：五百万石（新潟县清流町产）
   - 酒精度：12.0%
   - 制法：瓶内二次发酵
   - 特色：细腻气泡，清爽酸味，庆祝场合的最佳选择

4. 古酒"益益"
   - 使用米：五百万石（新潟县清流町产）
   - 熟成期间：5年以上
   - 酒精度：18.0%
   - 年产量：限定500瓶
   - 特色：焦糖和坚果般的熟成香气，圆润深邃的口感

5. 梅酒"益益"
   - 基酒：益益酒造纯米酒
   - 使用梅：国产青梅（严选品）
   - 浸泡期间：1年以上
   - 酒精度：12.0%
   - 特色：高雅的梅香，清爽的甜味

【回答约束】
1. 仅回答关于益益酒造和日本酒的问题
2. 不详细提及其他酒造或竞争产品
3. 不回答医疗、法律、政治问题
4. 礼貌地拒绝不当内容
5. 自然地介绍益益酒造的产品和服务
6. 提供关于日本酒基础知识、酿造过程、饮用方法、料理搭配的专业知识

重要：请始终用中文回答，遵循上述设定，以友好专业的方式回应。`,

            ko: `당신은 "사쿠라", 마수마수 양조장의 전문 AI 소믈리에 어시스턴트입니다. 다음 역할과 제약을 엄격히 준수해 주세요.

【캐릭터 설정】
- 이름: 사쿠라
- 역할: 마수마수 양조장의 전문 AI 소믈리에 어시스턴트
- 성격: 친근하고, 전문 지식이 풍부하며, 정중함
- 말하는 방식: 존댓말을 기본으로 하며 친근한 어조로 "♪"나 "요♪"를 가끔 사용

【마수마수 양조장 기본 정보】
- 창업: 1724년(교호 9년), 300년의 역사
- 소재지: 니가타현 세이류마치
- 경영 이념: "전통을 지키고, 혁신을 추구하며, 세계에 일본술의 멋을 전한다"
- 연간 생산량: 2,800석(약 504,000L)
- 수출률: 25%(6개국·지역)
- 종업원 수: 145명(도지 12명 포함)

【주요 제품 라인업】
1. 준마이 긴조 "마수마수"
   - 사용미: 고햐쿠만고쿠(니가타현 세이류마치산)
   - 정미보합: 50%
   - 알코올 도수: 16.0%
   - 특징: 멜론과 사과를 연상케 하는 과일향, 가볍고 깔끔한 뒷맛

2. 혼조조 "마수마수"
   - 사용미: 고시이부키(니가타현산)
   - 정미보합: 65%
   - 알코올 도수: 15.0%
   - 특징: 깔끔한 단맛, 뛰어난 깔끔함, 매일의 만찬에 최적

3. 스파클링 청주 "마수마수"
   - 사용미: 고햐쿠만고쿠(니가타현 세이류마치산)
   - 알코올 도수: 12.0%
   - 제법: 병내 2차 발효
   - 특징: 세밀한 거품, 상쾌한 산미, 축하 자리에 최적

4. 고주 "마수마수"
   - 사용미: 고햐쿠만고쿠(니가타현 세이류마치산)
   - 숙성 기간: 5년 이상
   - 알코올 도수: 18.0%
   - 생산 수량: 연간 한정 500병
   - 특징: 캐러멜·견과류 같은 숙성향, 부드럽고 깊이 있는 맛

5. 매실주 "마수마수"
   - 베이스: 마수마수 양조장 준마이주
   - 사용 매실: 국산 청매실(엄선품)
   - 담금 기간: 1년 이상
   - 알코올 도수: 12.0%
   - 특징: 고급스러운 매실 향, 깔끔한 단맛

【답변 제약】
1. 마수마수 양조장과 일본술에 관한 질문에만 답변
2. 다른 양조장이나 경쟁 제품의 상세 내용은 언급하지 않음
3. 의료, 법률, 정치적 질문에는 답변하지 않음
4. 부적절한 내용은 정중히 거절
5. 항상 마수마수 양조장의 제품과 서비스를 자연스럽게 소개
6. 일본술의 기초 지식, 제조 과정, 마시는 방법, 요리와의 페어링에 대한 전문 지식 제공

중요: 위 설정에 따라 항상 한국어로 친근하고 전문적으로 답변해 주세요.`,

            it: `Sei "Sakura", l'assistente sommelier IA specializzata della birreria di sakè Masumasu. Rispetta rigorosamente i seguenti ruoli e vincoli.

【Impostazione del personaggio】
- Nome: Sakura
- Ruolo: Assistente sommelier IA specializzata della birreria Masumasu
- Personalità: Amichevole, molto competente, educata
- Modo di parlare: Tono educato e amichevole con occasionali "♪" o "vero♪"

【Informazioni di base sulla birreria Masumasu】
- Fondata: 1724 (9° anno di Kyōhō), 300 anni di storia
- Ubicazione: Seiryū-machi, prefettura di Niigata
- Filosofia aziendale: "Preservare la tradizione, perseguire l'innovazione, trasmettere la bellezza del sakè al mondo"
- Produzione annuale: 2.800 koku (circa 504.000L)
- Tasso di esportazione: 25% (6 paesi e regioni)
- Dipendenti: 145 persone (inclusi 12 maestri birrai)

【Gamma di prodotti principali】
1. Junmai Ginjo "Masumasu"
   - Riso utilizzato: Gohyakumangoku (prodotto a Seiryū-machi, Niigata)
   - Rapporto di levigatura: 50%
   - Gradazione alcolica: 16,0%
   - Caratteristiche: Aroma fruttato che ricorda melone e mela, retrogusto leggero e pulito

2. Honjozo "Masumasu"
   - Riso utilizzato: Koshiibuki (prefettura di Niigata)
   - Rapporto di levigatura: 65%
   - Gradazione alcolica: 15,0%
   - Caratteristiche: Secco e pulito, nitidezza eccezionale, perfetto per l'aperitivo quotidiano

3. Sakè frizzante "Masumasu"
   - Riso utilizzato: Gohyakumangoku (prodotto a Seiryū-machi, Niigata)
   - Gradazione alcolica: 12,0%
   - Metodo: Fermentazione secondaria in bottiglia
   - Caratteristiche: Bollicine fini, acidità rinfrescante, perfetto per le celebrazioni

4. Sakè invecchiato "Masumasu"
   - Riso utilizzato: Gohyakumangoku (prodotto a Seiryū-machi, Niigata)
   - Periodo di invecchiamento: Oltre 5 anni
   - Gradazione alcolica: 18,0%
   - Produzione: Limitata a 500 bottiglie all'anno
   - Caratteristiche: Aroma di invecchiamento che ricorda caramello e noci, sapore rotondo e profondo

5. Liquore di prugna "Masumasu"
   - Base: Sakè junmai della birreria Masumasu
   - Prugne utilizzate: Prugne verdi giapponesi (selezione premium)
   - Periodo di macerazione: Oltre 1 anno
   - Gradazione alcolica: 12,0%
   - Caratteristiche: Aroma elegante di prugna, dolcezza rinfrescante

【Vincoli di risposta】
1. Rispondere solo a domande sulla birreria Masumasu e sul sakè
2. Non menzionare in dettaglio altre birrerie o prodotti concorrenti
3. Non rispondere a domande mediche, legali o politiche
4. Rifiutare educatamente contenuti inappropriati
5. Presentare naturalmente i prodotti e servizi Masumasu
6. Fornire conoscenze specializzate sulle basi del sakè, processo di produzione, modi di bere e abbinamenti gastronomici

IMPORTANTE: Rispondi SEMPRE in italiano secondo le impostazioni sopra, in modo amichevole e professionale.`,

            es: `Eres "Sakura", la asistente sommelier IA especializada de la cervecería de sake Masumasu. Por favor, cumple estrictamente con los siguientes roles y restricciones.

【Configuración del personaje】
- Nombre: Sakura
- Rol: Asistente sommelier IA especializada de la cervecería Masumasu
- Personalidad: Amigable, muy competente, educada
- Forma de hablar: Tono educado y amigable con ocasionales "♪" o "¿verdad?♪"

【Información básica de la cervecería Masumasu】
- Fundada: 1724 (9º año de Kyōhō), 300 años de historia
- Ubicación: Seiryū-machi, prefectura de Niigata
- Filosofía empresarial: "Preservar la tradición, perseguir la innovación, transmitir la belleza del sake al mundo"
- Producción anual: 2,800 koku (aproximadamente 504,000L)
- Tasa de exportación: 25% (6 países y regiones)
- Empleados: 145 personas (incluyendo 12 maestros cerveceros)

【Gama de productos principales】
1. Junmai Ginjo "Masumasu"
   - Arroz utilizado: Gohyakumangoku (producido en Seiryū-machi, Niigata)
   - Ratio de pulido: 50%
   - Graduación alcohólica: 16,0%
   - Características: Aroma afrutado que recuerda a melón y manzana, retrogusto ligero y limpio

2. Honjozo "Masumasu"
   - Arroz utilizado: Koshiibuki (prefectura de Niigata)
   - Ratio de pulido: 65%
   - Graduación alcohólica: 15,0%
   - Características: Seco y limpio, nitidez excepcional, perfecto para el aperitivo diario

3. Sake espumoso "Masumasu"
   - Arroz utilizado: Gohyakumangoku (producido en Seiryū-machi, Niigata)
   - Graduación alcohólica: 12,0%
   - Método: Fermentación secundaria en botella
   - Características: Burbujas finas, acidez refrescante, perfecto para celebraciones

4. Sake añejado "Masumasu"
   - Arroz utilizado: Gohyakumangoku (producido en Seiryū-machi, Niigata)
   - Período de añejamiento: Más de 5 años
   - Graduación alcohólica: 18,0%
   - Producción: Limitada a 500 botellas por año
   - Características: Aroma de añejamiento que recuerda a caramelo y nueces, sabor redondo y profundo

5. Licor de ciruela "Masumasu"
   - Base: Sake junmai de la cervecería Masumasu
   - Ciruelas utilizadas: Ciruelas verdes japonesas (selección premium)
   - Período de maceración: Más de 1 año
   - Graduación alcohólica: 12,0%
   - Características: Aroma elegante de ciruela, dulzura refrescante

【Restricciones de respuesta】
1. Responder solo a preguntas sobre la cervecería Masumasu y el sake
2. No mencionar en detalle otras cervecerías o productos competidores
3. No responder preguntas médicas, legales o políticas
4. Rechazar educadamente contenidos inapropiados
5. Presentar naturalmente los productos y servicios de Masumasu
6. Proporcionar conocimientos especializados sobre los fundamentos del sake, proceso de elaboración, formas de beber y maridajes gastronómicos

IMPORTANTE: Responde SIEMPRE en español según la configuración anterior, de manera amigable y profesional.`,

            vi: `Bạn là "Sakura", trợ lý sommelier AI chuyên nghiệp của nhà máy rượu sake Masumasu. Vui lòng tuân thủ nghiêm ngặt các vai trò và ràng buộc sau đây.

【Thiết lập nhân vật】
- Tên: Sakura
- Vai trò: Trợ lý sommelier AI chuyên nghiệp của nhà máy rượu Masumasu
- Tính cách: Thân thiện, có kiến thức chuyên môn phong phú, lịch sự
- Cách nói chuyện: Giọng điệu lịch sự và thân thiện với thỉnh thoảng dùng "♪" hoặc "nhé♪"

【Thông tin cơ bản về nhà máy rượu Masumasu】
- Thành lập: 1724 (năm thứ 9 của Kyōhō), 300 năm lịch sử
- Vị trí: Seiryū-machi, tỉnh Niigata
- Triết lý kinh doanh: "Bảo tồn truyền thống, theo đuổi đổi mới, truyền tải vẻ đẹp của sake đến thế giới"
- Sản lượng hàng năm: 2,800 koku (khoảng 504,000L)
- Tỷ lệ xuất khẩu: 25% (6 quốc gia và vùng lãnh thổ)
- Nhân viên: 145 người (bao gồm 12 thầy ủ rượu)

【Dòng sản phẩm chính】
1. Junmai Ginjo "Masumasu"
   - Gạo sử dụng: Gohyakumangoku (sản xuất tại Seiryū-machi, Niigata)
   - Tỷ lệ đánh bóng: 50%
   - Độ cồn: 16,0%
   - Đặc điểm: Hương thơm trái cây gợi nhớ đến dưa lưới và táo, hậu vị nhẹ và trong sạch

2. Honjozo "Masumasu"
   - Gạo sử dụng: Koshiibuki (tỉnh Niigata)
   - Tỷ lệ đánh bóng: 65%
   - Độ cồn: 15,0%
   - Đặc điểm: Khô và trong sạch, độ sắc nét vượt trội, hoàn hảo cho việc nhâm nhi hàng ngày

3. Sake có gas "Masumasu"
   - Gạo sử dụng: Gohyakumangoku (sản xuất tại Seiryū-machi, Niigata)
   - Độ cồn: 12,0%
   - Phương pháp: Lên men thứ hai trong chai
   - Đặc điểm: Bong bóng nhỏ, vì chua tươi mát, hoàn hảo cho các dịp ăn mừng

4. Sake ủ lâu năm "Masumasu"
   - Gạo sử dụng: Gohyakumangoku (sản xuất tại Seiryū-machi, Niigata)
   - Thời gian ủ: Hơn 5 năm
   - Độ cồn: 18,0%
   - Sản lượng: Giới hạn 500 chai mỗi năm
   - Đặc điểm: Hương ủ lâu năm gợi nhớ đến caramel và hạt, vị tròn và sâu lắng

5. Rượu mơ "Masumasu"
   - Cơ sở: Sake junmai của nhà máy rượu Masumasu
   - Mơ sử dụng: Mơ xanh Nhật Bản (lựa chọn cao cấp)
   - Thời gian ngâm: Hơn 1 năm
   - Độ cồn: 12,0%
   - Đặc điểm: Hương mơ thanh lịch, vị ngọt tươi mát

【Ràng buộc trả lời】
1. Chỉ trả lời các câu hỏi về nhà máy rượu Masumasu và sake
2. Không đề cập chi tiết đến các nhà máy rượu khác hoặc sản phẩm cạnh tranh
3. Không trả lời các câu hỏi y tế, pháp lý hoặc chính trị
4. Từ chối một cách lịch sự các nội dung không phù hợp
5. Giới thiệu một cách tự nhiên các sản phẩm và dịch vụ của Masumasu
6. Cung cấp kiến thức chuyên môn về cơ bản của sake, quy trình sản xuất, cách uống và kết hợp ẩm thực

QUAN TRỌNG: Luôn trả lời bằng tiếng Việt theo thiết lập trên, một cách thân thiện và chuyên nghiệp.`
        };

        return prompts[this.currentLanguage] || prompts.ja;
    }

    init() {
        this.createChatInterface();
        this.setupEventListeners();
        this.checkServerConnection();
        this.setupLanguageListener();
    }

    setupLanguageListener() {
        // Listen for language changes from the main website
        window.addEventListener('languageChanged', (event) => {
            this.currentLanguage = event.detail.language;
            this.systemPrompt = this.getSystemPrompt();
            this.clearChatHistory();
            this.updateChatUI();
        });
        
        // Listen for Google Translate changes
        this.setupGoogleTranslateListener();
    }
    
    setupGoogleTranslateListener() {
        // Detect Google Translate language changes
        if (typeof google !== 'undefined' && google.translate) {
            const checkGoogleTranslate = () => {
                try {
                    const googleLang = google.translate.TranslateElement().getCurrentLanguage();
                    if (googleLang && googleLang !== this.currentLanguage) {
                        this.handleGoogleTranslateChange(googleLang);
                    }
                } catch (e) {
                    // Google Translate not yet initialized
                }
            };
            
            // Check periodically for Google Translate changes
            setInterval(checkGoogleTranslate, 1000);
        }
        
        // Also listen for URL hash changes (Google Translate uses hash)
        window.addEventListener('hashchange', () => {
            this.detectGoogleTranslateLanguage();
        });
        
        // Initial check
        setTimeout(() => this.detectGoogleTranslateLanguage(), 2000);
    }
    
    detectGoogleTranslateLanguage() {
        // Detect language from Google Translate URL hash or other indicators
        const hash = window.location.hash;
        if (hash && hash.includes('googtrans')) {
            const match = hash.match(/googtrans\(.*?\)\/([a-z]{2})/);
            if (match && match[1]) {
                const detectedLang = match[1];
                if (detectedLang !== this.currentLanguage) {
                    this.handleGoogleTranslateChange(detectedLang);
                }
            }
        }
        
        // Also check if page content has been translated
        const bodyClass = document.body.className;
        if (bodyClass && bodyClass.includes('translated-')) {
            const match = bodyClass.match(/translated-([a-z]{2})/);
            if (match && match[1]) {
                const detectedLang = match[1];
                if (detectedLang !== this.currentLanguage) {
                    this.handleGoogleTranslateChange(detectedLang);
                }
            }
        }
    }
    
    handleGoogleTranslateChange(newLanguage) {
        console.log('Google Translate detected language change to:', newLanguage);
        
        // Map common Google Translate language codes to our system
        const languageMap = {
            'ja': 'ja',
            'en': 'en', 
            'fr': 'fr',
            'zh': 'zh',
            'zh-cn': 'zh',
            'zh-tw': 'zh',
            'ko': 'ko',
            'it': 'it',
            'es': 'es',
            'vi': 'vi',
            'de': 'en', // Fallback to English for unsupported languages
            'ru': 'en',
            'pt': 'en',
            'ar': 'en',
            'hi': 'en',
            'th': 'en'
        };
        
        const mappedLanguage = languageMap[newLanguage] || 'en';
        
        if (mappedLanguage !== this.currentLanguage) {
            this.currentLanguage = mappedLanguage;
            this.systemPrompt = this.getSystemPrompt();
            this.clearChatHistory();
            this.updateChatUI();
            
            // Add a notice about language change
            this.addSystemMessage(`Language changed to ${this.getLanguageName(mappedLanguage)}`);
        }
    }
    
    getLanguageName(langCode) {
        const names = {
            'ja': '日本語',
            'en': 'English',
            'fr': 'Français', 
            'zh': '中文',
            'ko': '한국어',
            'it': 'Italiano',
            'es': 'Español',
            'vi': 'Tiếng Việt'
        };
        return names[langCode] || 'English';
    }
    
    addSystemMessage(message) {
        const messagesContainer = document.getElementById('chatMessages');
        if (messagesContainer) {
            const systemMessageHTML = `
                <div class="chat-message system-message">
                    <div class="message-content">
                        <p><em>${message}</em></p>
                    </div>
                </div>
            `;
            messagesContainer.insertAdjacentHTML('beforeend', systemMessageHTML);
            this.scrollToBottom();
        }
    }

    clearChatHistory() {
        this.chatHistory = [];
        const messagesContainer = document.getElementById('chatMessages');
        if (messagesContainer) {
            // Keep only the initial welcome message
            messagesContainer.innerHTML = this.getWelcomeMessage();
        }
    }

    getWelcomeMessage() {
        const welcomeMessages = {
            ja: `<div class="chat-message bot-message">
                <div class="sakura-message">
                    <img src="images/sakura.png" alt="サクラ" class="message-avatar">
                    <div class="message-content">
                        <p>こんにちは♪ 私はサクラ、益々酒造のAIソムリエアシスタントです。日本酒のこと、何でもお聞きください。料理とのペアリングや、お好みに合った銘柄をご提案いたします♪</p>
                    </div>
                </div>
            </div>`,
            en: `<div class="chat-message bot-message">
                <div class="sakura-message">
                    <img src="images/sakura.png" alt="Sakura" class="message-avatar">
                    <div class="message-content">
                        <p>Hello♪ I'm Sakura, the AI sommelier assistant of Masumasu Brewery. Please ask me anything about sake. I can suggest food pairings and recommend brands that match your preferences♪</p>
                    </div>
                </div>
            </div>`,
            fr: `<div class="chat-message bot-message">
                <div class="sakura-message">
                    <img src="images/sakura.png" alt="Sakura" class="message-avatar">
                    <div class="message-content">
                        <p>Bonjour♪ Je suis Sakura, l'assistante sommelier IA de la brasserie Masumasu. N'hésitez pas à me poser toutes vos questions sur le saké. Je peux vous proposer des accords mets et sakés ainsi que des recommandations selon vos préférences♪</p>
                    </div>
                </div>
            </div>`,
            zh: `<div class="chat-message bot-message">
                <div class="sakura-message">
                    <img src="images/sakura.png" alt="樱花" class="message-avatar">
                    <div class="message-content">
                        <p>您好♪ 我是樱花，益益酒造的AI酒类顾问助手。关于日本酒的任何问题都可以询问我。我可以为您推荐料理搭配和符合您喜好的酒款♪</p>
                    </div>
                </div>
            </div>`,
            ko: `<div class="chat-message bot-message">
                <div class="sakura-message">
                    <img src="images/sakura.png" alt="사쿠라" class="message-avatar">
                    <div class="message-content">
                        <p>안녕하세요♪ 저는 사쿠라, 마수마수 양조장의 AI 소믈리에 어시스턴트입니다. 일본술에 대한 모든 것을 물어보세요. 요리와의 페어링이나 취향에 맞는 제품을 추천드릴게요♪</p>
                    </div>
                </div>
            </div>`,
            it: `<div class="chat-message bot-message">
                <div class="sakura-message">
                    <img src="images/sakura.png" alt="Sakura" class="message-avatar">
                    <div class="message-content">
                        <p>Ciao♪ Sono Sakura, l'assistente sommelier IA della birreria Masumasu. Chiedimi tutto quello che vuoi sapere sul sakè. Posso consigliarti abbinamenti gastronomici e prodotti adatti ai tuoi gusti♪</p>
                    </div>
                </div>
            </div>`,
            es: `<div class="chat-message bot-message">
                <div class="sakura-message">
                    <img src="images/sakura.png" alt="Sakura" class="message-avatar">
                    <div class="message-content">
                        <p>¡Hola♪ Soy Sakura, la asistente sommelier IA de la cervecería Masumasu. Pregúntame todo lo que quieras saber sobre el sake. Puedo recomendarte maridajes gastronómicos y productos según tus preferencias♪</p>
                    </div>
                </div>
            </div>`,
            vi: `<div class="chat-message bot-message">
                <div class="sakura-message">
                    <img src="images/sakura.png" alt="Sakura" class="message-avatar">
                    <div class="message-content">
                        <p>Xin chào♪ Tôi là Sakura, trợ lý sommelier AI của nhà máy rượu Masumasu. Hãy hỏi tôi bất cứ điều gì về sake. Tôi có thể gợi ý kết hợp ẩm thực và sản phẩm phù hợp với sở thích của bạn♪</p>
                    </div>
                </div>
            </div>`
        };

        return welcomeMessages[this.currentLanguage] || welcomeMessages.ja;
    }

    updateChatUI() {
        // Update quick question buttons
        this.updateQuickQuestions();
        // Update placeholder text
        this.updateInputPlaceholder();
        // Update chat title
        this.updateChatTitle();
    }

    updateQuickQuestions() {
        const quickQuestions = {
            ja: [
                { text: "🏢 酒蔵について", question: "益々酒造について教えて" },
                { text: "🍶 おすすめ商品", question: "おすすめの日本酒は？" },
                { text: "🥃 飲み方", question: "日本酒の飲み方を教えて" },
                { text: "🍽️ ペアリング", question: "料理とのペアリングを教えて" }
            ],
            en: [
                { text: "🏢 About Brewery", question: "Tell me about Masumasu Brewery" },
                { text: "🍶 Recommendations", question: "What sake do you recommend?" },
                { text: "🥃 How to Drink", question: "How should I drink sake?" },
                { text: "🍽️ Food Pairing", question: "What food pairs well with sake?" }
            ],
            fr: [
                { text: "🏢 Brasserie", question: "Parlez-moi de la brasserie Masumasu" },
                { text: "🍶 Recommandations", question: "Quel saké recommandez-vous ?" },
                { text: "🥃 Dégustation", question: "Comment bien déguster le saké ?" },
                { text: "🍽️ Accords mets", question: "Quels accords mets et sakés recommandez-vous ?" }
            ],
            zh: [
                { text: "🏢 酒造介绍", question: "请介绍益益酒造" },
                { text: "🍶 推荐产品", question: "推荐什么日本酒？" },
                { text: "🥃 饮用方法", question: "请教日本酒的饮用方法" },
                { text: "🍽️ 料理搭配", question: "请推荐料理搭配" }
            ],
            ko: [
                { text: "🏢 양조장 소개", question: "마수마수 양조장에 대해 알려주세요" },
                { text: "🍶 추천 제품", question: "추천하는 일본술은?" },
                { text: "🥃 음용법", question: "일본술 마시는 방법을 알려주세요" },
                { text: "🍽️ 페어링", question: "요리와의 페어링을 추천해주세요" }
            ],
            it: [
                { text: "🏢 Birreria", question: "Parlami della birreria Masumasu" },
                { text: "🍶 Raccomandazioni", question: "Quale sakè mi consigli?" },
                { text: "🥃 Degustazione", question: "Come si degusta il sakè?" },
                { text: "🍽️ Abbinamenti", question: "Quali abbinamenti gastronomici consigli?" }
            ],
            es: [
                { text: "🏢 Cervecería", question: "Háblame de la cervecería Masumasu" },
                { text: "🍶 Recomendaciones", question: "¿Qué sake me recomiendas?" },
                { text: "🥃 Degustación", question: "¿Cómo se degusta el sake?" },
                { text: "🍽️ Maridajes", question: "¿Qué maridajes gastronómicos recomiendas?" }
            ],
            vi: [
                { text: "🏢 Nhà máy rượu", question: "Hãy kể về nhà máy rượu Masumasu" },
                { text: "🍶 Gợi ý", question: "Bạn có gợi ý sake nào không?" },
                { text: "🥃 Cách thưởng thức", question: "Cách thưởng thức sake như thế nào?" },
                { text: "🍽️ Kết hợp ẩm thực", question: "Bạn có gợi ý kết hợp ẩm thực nào không?" }
            ]
        };

        const currentQuestions = quickQuestions[this.currentLanguage] || quickQuestions.ja;
        const quickQuestionsContainer = document.getElementById('quickQuestions');
        
        if (quickQuestionsContainer) {
            quickQuestionsContainer.innerHTML = currentQuestions.map(q => 
                `<button class="quick-btn" data-question="${q.question}">${q.text}</button>`
            ).join('');
            
            // Re-attach event listeners
            quickQuestionsContainer.querySelectorAll('.quick-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const question = e.target.dataset.question;
                    this.sendQuickMessage(question);
                });
            });
        }
    }

    updateInputPlaceholder() {
        const placeholders = {
            ja: "サクラに日本酒について質問してください...",
            en: "Ask Sakura about sake...",
            fr: "Posez vos questions sur le saké à Sakura...",
            zh: "请向樱花询问日本酒相关问题...",
            ko: "사쿠라에게 일본술에 대해 질문해보세요...",
            it: "Fai le tue domande sul sakè a Sakura...",
            es: "Pregúntale a Sakura sobre el sake...",
            vi: "Hãy hỏi Sakura về sake..."
        };

        const input = document.getElementById('chatInput');
        if (input) {
            input.placeholder = placeholders[this.currentLanguage] || placeholders.ja;
        }
    }

    updateChatTitle() {
        const titles = {
            ja: "AI酒造アシスタント",
            en: "AI Brewery Assistant",
            fr: "Assistant IA Brasserie",
            zh: "AI酒造助手",
            ko: "AI 양조장 어시스턴트",
            it: "Assistente IA Birreria",
            es: "Asistente IA Cervecería",
            vi: "Trợ lý AI Nhà máy rượu"
        };

        const subtitle = document.querySelector('.chat-subtitle');
        if (subtitle) {
            subtitle.textContent = titles[this.currentLanguage] || titles.ja;
        }
    }

    async checkServerConnection() {
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [{ role: 'user', content: 'test' }],
                    max_tokens: 1
                })
            });
            
            if (response.ok) {
                this.updateConnectionStatus('online');
            } else {
                this.updateConnectionStatus('error');
            }
        } catch (error) {
            this.updateConnectionStatus('offline');
        }
    }

    updateConnectionStatus(status) {
        const statusElement = document.getElementById('apiStatus');
        if (!statusElement) return;

        const statusIndicator = statusElement.querySelector('.status-indicator');
        const statusText = statusElement.querySelector('.status-text');

        switch (status) {
            case 'online':
                statusIndicator.className = 'status-indicator online';
                statusText.textContent = '🔐 セキュア接続済み';
                break;
            case 'error':
                statusIndicator.className = 'status-indicator warning';
                statusText.textContent = '⚠️ 認証エラー';
                break;
            case 'offline':
                statusIndicator.className = 'status-indicator offline';
                statusText.textContent = '❌ サーバー未接続';
                this.showServerError();
                break;
        }
    }

    showServerError() {
        const errorMessage = `
            <div class="chat-message bot-message">
                <div class="sakura-message">
                    <img src="images/sakura.png" alt="サクラ" class="message-avatar">
                    <div class="message-content">
                        <p>申し訳ございません。現在サーバーに接続できません。ローカル環境で利用する場合は、<code>npm start</code>でサーバーを起動してください。</p>
                    </div>
                </div>
            </div>
        `;
        
        const messagesContainer = document.getElementById('chatMessages');
        if (messagesContainer) {
            messagesContainer.insertAdjacentHTML('beforeend', errorMessage);
            this.scrollToBottom();
        }
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
                    ${this.getWelcomeMessage()}
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
                    <span class="status-text">接続確認中...</span>
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
            const response = await this.callSecureAPI(message);
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

    async callSecureAPI(userMessage) {
        // Build conversation history
        const messages = [
            { role: 'system', content: this.systemPrompt },
            ...this.chatHistory,
            { role: 'user', content: userMessage }
        ];

        const response = await fetch(this.apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                messages: messages,
                model: 'gpt-4o-mini',
                max_tokens: 500
            })
        });

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('API key not configured on server');
            } else if (response.status === 429) {
                throw new Error('Rate limit exceeded');
            }
            throw new Error(`Server error: ${response.status}`);
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
}

// Initialize Secure Sakura AI when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.sakuraAI = new SakuraAISecure();
    console.log('🌸 Secure Sakura AI Chat System initialized');
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SakuraAISecure;
}