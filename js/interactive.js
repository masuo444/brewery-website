// Interactive Sections for Masumasu Brewery
class InteractiveExplanations {
    constructor() {
        this.currentLanguage = localStorage.getItem('selectedLanguage') || 'ja';
        this.processData = this.initializeProcessData();
        this.riceData = this.initializeRiceData();
        this.init();
    }

    initializeProcessData() {
        return {
            ja: {
                'rice-washing': {
                    title: '米洗い',
                    description: '酒造りの最初の重要な工程です。精米した米を冷たい水で丁寧に洗い、表面のぬかや汚れを取り除きます。洗いすぎると米が割れてしまうため、熟練の技術が必要です。水温と洗う時間を厳密に管理し、米の品種や精米歩合に応じて調整します。',
                    details: [
                        '💧 使用する水：新潟県清流町の伏流水',
                        '⏰ 洗浄時間：品種により5-15分',
                        '🌡️ 水温：10-15℃に管理',
                        '👨‍🔬 品質管理：経験豊富な杜氏が監督'
                    ]
                },
                'steaming': {
                    title: '蒸米',
                    description: '洗った米を約30分間蒸します。この工程で米の澱粉をα化し、麹菌が作用しやすい状態にします。蒸し上がりの米は「外硬内軟」（外は硬く、中は軟らか）が理想的です。蒸気の温度と時間を調整し、均一に蒸し上げることが重要です。',
                    details: [
                        '🔥 蒸し時間：約30分',
                        '🌡️ 蒸気温度：100℃',
                        '⚖️ 理想の状態：外硬内軟',
                        '🎯 目標：澱粉の完全なα化'
                    ]
                },
                'koji': {
                    title: '麹造り',
                    description: '蒸した米に麹菌を植え付け、約48時間かけて米麹を作ります。麹菌が米の澱粉を糖に変える酵素を生成する重要な工程です。温度と湿度を24時間体制で管理し、最適な環境を維持します。「一麹、二酛、三造り」と言われるほど重要な工程です。',
                    details: [
                        '🍄 使用菌：清酒用黄麹菌',
                        '🕐 所要時間：約48時間',
                        '🌡️ 管理温度：30-35℃',
                        '💨 湿度管理：65-75%'
                    ]
                },
                'fermentation': {
                    title: '発酵',
                    description: '米麹、蒸米、水を段階的に加えて醪（もろみ）を作り、約3-4週間発酵させます。麹の酵素が米の澱粉を糖に変え、酵母がその糖をアルコールに変換する複雑な過程です。発酵温度を細かく調整し、理想的な味わいを作り出します。',
                    details: [
                        '⏳ 発酵期間：3-4週間',
                        '🌡️ 発酵温度：8-15℃',
                        '🧪 アルコール度：最終17-20%',
                        '📊 糖度管理：定期的な分析'
                    ]
                },
                'pressing': {
                    title: '圧搾',
                    description: '発酵が完了した醪を圧搾して、清酒と酒粕に分離します。伝統的な槽（ふね）や自動圧搾機を使用し、優しく圧力をかけて澄んだ酒を搾り出します。圧搾の強さによって、荒走り、中取り、責めに分かれ、それぞれ異なる味わいを持ちます。',
                    details: [
                        '🏺 使用機器：伝統的な槽（ふね）',
                        '🥇 荒走り：最初に出る最高品質部分',
                        '✨ 中取り：最も味わいが安定した部分',
                        '💪 責め：最後の圧搾部分'
                    ]
                },
                'aging': {
                    title: '熟成',
                    description: '圧搾後の清酒を低温で貯蔵し、味わいを整えます。この期間に酒質が安定し、まろやかで調和の取れた味わいに変化します。温度管理された貯蔵タンクで数ヶ月間熟成させ、最終的に瓶詰めされて出荷されます。',
                    details: [
                        '❄️ 貯蔵温度：0-5℃',
                        '📅 熟成期間：3-6ヶ月',
                        '🏠 貯蔵場所：温度管理された蔵',
                        '🍶 最終工程：濾過・瓶詰め'
                    ]
                }
            },
            en: {
                'rice-washing': {
                    title: 'Rice Washing',
                    description: 'The first crucial step in sake brewing. Polished rice is carefully washed in cold water to remove surface bran and impurities. Requires skilled technique as over-washing can crack the rice. Water temperature and washing time are strictly controlled, adjusted according to rice variety and polishing ratio.',
                    details: [
                        '💧 Water source: Underground water from Seiryu-cho, Niigata',
                        '⏰ Washing time: 5-15 minutes depending on variety',
                        '🌡️ Water temperature: Maintained at 10-15℃',
                        '👨‍🔬 Quality control: Supervised by experienced Toji'
                    ]
                },
                'steaming': {
                    title: 'Steaming',
                    description: 'Washed rice is steamed for about 30 minutes. This process gelatinizes the starch in the rice, making it accessible to koji enzymes. The ideal steamed rice is "hard outside, soft inside." Steam temperature and timing are carefully controlled for uniform steaming.',
                    details: [
                        '🔥 Steaming time: About 30 minutes',
                        '🌡️ Steam temperature: 100℃',
                        '⚖️ Ideal condition: Hard outside, soft inside',
                        '🎯 Goal: Complete starch gelatinization'
                    ]
                },
                'koji': {
                    title: 'Koji Making',
                    description: 'Koji spores are inoculated onto steamed rice, and koji is cultivated over about 48 hours. Koji enzymes convert rice starch into sugars. Temperature and humidity are monitored 24/7 to maintain optimal conditions. As the saying goes: "First koji, second yeast starter, third fermentation."',
                    details: [
                        '🍄 Koji strain: Yellow koji for sake brewing',
                        '🕐 Duration: About 48 hours',
                        '🌡️ Temperature control: 30-35℃',
                        '💨 Humidity control: 65-75%'
                    ]
                },
                'fermentation': {
                    title: 'Fermentation',
                    description: 'Koji, steamed rice, and water are added in stages to create the mash (moromi), which ferments for 3-4 weeks. Koji enzymes convert rice starch to sugars, while yeast converts these sugars to alcohol in a complex process. Fermentation temperature is precisely controlled to achieve the ideal flavor profile.',
                    details: [
                        '⏳ Fermentation period: 3-4 weeks',
                        '🌡️ Fermentation temperature: 8-15℃',
                        '🧪 Alcohol content: Final 17-20%',
                        '📊 Sugar management: Regular analysis'
                    ]
                },
                'pressing': {
                    title: 'Pressing',
                    description: 'The completed moromi is pressed to separate sake from sake lees. Using traditional fune presses or automatic presses, gentle pressure is applied to extract clear sake. Different pressing stages produce arabashiri (first run), nakadori (middle run), and seme (final pressing), each with distinct characteristics.',
                    details: [
                        '🏺 Equipment: Traditional fune press',
                        '🥇 Arabashiri: First-run highest quality portion',
                        '✨ Nakadori: Most stable flavor portion',
                        '💪 Seme: Final pressing portion'
                    ]
                },
                'aging': {
                    title: 'Aging',
                    description: 'After pressing, sake is stored at low temperatures to mature and develop flavor. During this period, the sake quality stabilizes and develops a mellow, harmonious taste. Aged in temperature-controlled tanks for several months before final filtration and bottling.',
                    details: [
                        '❄️ Storage temperature: 0-5℃',
                        '📅 Aging period: 3-6 months',
                        '🏠 Storage location: Temperature-controlled warehouse',
                        '🍶 Final process: Filtration and bottling'
                    ]
                }
            }
        };
    }

    initializeRiceData() {
        return {
            ja: {
                'gohyakumangoku': {
                    title: '五百万石',
                    origin: '新潟県産',
                    description: '新潟県を代表する酒造好適米で、淡麗な味わいの日本酒造りに最適です。心白が大きく、タンパク質含有量が少ないため、雑味のないクリアな味わいを生み出します。',
                    characteristics: [
                        '🌾 心白：大きくて明瞭',
                        '⚗️ タンパク質：低含有量',
                        '🍶 味わい：淡麗でキレの良い仕上がり',
                        '📍 産地：新潟県魚沼地区'
                    ],
                    usedIn: ['純米吟醸「益々」', 'スパークリング清酒「益々」']
                },
                'koshiibuki': {
                    title: 'こしいぶき',
                    origin: '新潟県産',
                    description: '新潟県オリジナルの酒造好適米で、バランスの取れた味わいが特徴です。適度な心白と安定した品質で、本醸造酒に最適な品種です。',
                    characteristics: [
                        '🌾 心白：適度な大きさ',
                        '⚖️ バランス：優れた成分バランス',
                        '🍶 味わい：まろやかで深みのある仕上がり',
                        '📍 産地：新潟県全域'
                    ],
                    usedIn: ['本醸造「益々」']
                },
                'yamadanishiki': {
                    title: '山田錦',
                    origin: '兵庫県産',
                    description: '酒米の王様と呼ばれる最高級の酒造好適米です。大きな心白と低いタンパク質含有量により、香り高く上品な味わいの日本酒を造ることができます。',
                    characteristics: [
                        '🌾 心白：非常に大きく品質優秀',
                        '👑 品質：酒米の最高峰',
                        '🍶 味わい：香り高く上品な仕上がり',
                        '📍 産地：兵庫県特A地区'
                    ],
                    usedIn: ['古酒「益々」', '梅酒「益々」（ベース酒）']
                }
            },
            en: {
                'gohyakumangoku': {
                    title: 'Gohyakumangoku',
                    origin: 'Niigata Prefecture',
                    description: 'Representative sake rice of Niigata Prefecture, ideal for creating light and crisp sake. Large shinpaku (white core) and low protein content produce clean taste without unwanted flavors.',
                    characteristics: [
                        '🌾 Shinpaku: Large and clear',
                        '⚗️ Protein: Low content',
                        '🍶 Taste: Light and crisp finish',
                        '📍 Origin: Uonuma district, Niigata'
                    ],
                    usedIn: ['Junmai Ginjo "Masu Masu"', 'Sparkling Sake "Masu Masu"']
                },
                'koshiibuki': {
                    title: 'Koshiibuki',
                    origin: 'Niigata Prefecture',
                    description: 'Original sake rice variety from Niigata Prefecture, characterized by well-balanced flavor. Moderate shinpaku and stable quality make it perfect for honjozo sake.',
                    characteristics: [
                        '🌾 Shinpaku: Moderate size',
                        '⚖️ Balance: Excellent component balance',
                        '🍶 Taste: Mellow and deep finish',
                        '📍 Origin: Throughout Niigata Prefecture'
                    ],
                    usedIn: ['Honjozo "Masu Masu"']
                },
                'yamadanishiki': {
                    title: 'Yamada Nishiki',
                    origin: 'Hyogo Prefecture',
                    description: 'Known as the "King of Sake Rice," this is the premium sake rice variety. Large shinpaku and low protein content create fragrant and elegant sake.',
                    characteristics: [
                        '🌾 Shinpaku: Very large and excellent quality',
                        '👑 Quality: Pinnacle of sake rice',
                        '🍶 Taste: Fragrant and elegant finish',
                        '📍 Origin: Special A district, Hyogo'
                    ],
                    usedIn: ['Vintage Sake "Masu Masu"', 'Plum Wine "Masu Masu" (base sake)']
                }
            }
        };
    }

    init() {
        this.setupProcessInteractions();
        this.setupRiceInteractions();
        this.setupLanguageListener();
    }

    setupProcessInteractions() {
        const processSteps = document.querySelectorAll('.process-step-interactive');
        const explanationContainer = document.getElementById('processExplanation');

        processSteps.forEach(step => {
            step.addEventListener('click', () => {
                // Remove active class from all steps
                processSteps.forEach(s => s.classList.remove('active'));
                
                // Add active class to clicked step
                step.classList.add('active');
                
                // Get step data
                const stepType = step.dataset.step;
                const stepData = this.processData[this.currentLanguage][stepType];
                
                // Update explanation
                this.updateProcessExplanation(explanationContainer, stepData);
            });
        });
    }

    setupRiceInteractions() {
        const riceCards = document.querySelectorAll('.interactive-rice');
        const explanationContainer = document.getElementById('riceExplanation');

        riceCards.forEach(card => {
            card.addEventListener('click', () => {
                // Remove active class from all cards
                riceCards.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked card
                card.classList.add('active');
                
                // Get rice data
                const riceType = card.dataset.rice;
                const riceData = this.riceData[this.currentLanguage][riceType];
                
                // Update explanation
                this.updateRiceExplanation(explanationContainer, riceData);
            });
        });
    }

    updateProcessExplanation(container, data) {
        container.innerHTML = `
            <div class="step-explanation">
                <h3>${data.title}</h3>
                <p class="step-description">${data.description}</p>
                <div class="step-details">
                    ${data.details.map(detail => `<div class="detail-item">${detail}</div>`).join('')}
                </div>
            </div>
        `;
    }

    updateRiceExplanation(container, data) {
        container.innerHTML = `
            <div class="rice-explanation-content">
                <div class="rice-header">
                    <h3>${data.title}</h3>
                    <p class="rice-origin-detail">${data.origin}</p>
                </div>
                <p class="rice-description">${data.description}</p>
                <div class="rice-characteristics">
                    <h4>特徴</h4>
                    ${data.characteristics.map(char => `<div class="characteristic-item">${char}</div>`).join('')}
                </div>
                <div class="used-products">
                    <h4>使用銘柄</h4>
                    <div class="product-list">
                        ${data.usedIn.map(product => `<span class="product-tag">${product}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    setupLanguageListener() {
        const languageSelect = document.getElementById('languageSelect');
        if (languageSelect) {
            languageSelect.addEventListener('change', (e) => {
                this.currentLanguage = e.target.value;
                
                // Clear active states and reset explanations
                document.querySelectorAll('.process-step-interactive.active').forEach(step => {
                    step.classList.remove('active');
                });
                document.querySelectorAll('.interactive-rice.active').forEach(rice => {
                    rice.classList.remove('active');
                });
                
                this.resetExplanations();
            });
        }
    }

    resetExplanations() {
        const processExplanation = document.getElementById('processExplanation');
        const riceExplanation = document.getElementById('riceExplanation');
        
        if (processExplanation) {
            processExplanation.innerHTML = `
                <div class="explanation-placeholder">
                    <h3>工程をクリックしてください</h3>
                    <p>各段階の詳細説明をご覧いただけます</p>
                    <div class="explanation-icon">👆</div>
                </div>
            `;
        }
        
        if (riceExplanation) {
            riceExplanation.innerHTML = `
                <div class="explanation-placeholder">
                    <h3>米の種類をクリックしてください</h3>
                    <p>各品種の特徴と使用される銘柄をご紹介します</p>
                    <div class="explanation-icon">👆</div>
                </div>
            `;
        }
    }
}

// Digital Signage Mode
class DigitalSignageMode {
    constructor() {
        this.isSignageMode = false;
        this.init();
    }

    init() {
        this.createSignageToggle();
        this.setupSignageStyles();
    }

    createSignageToggle() {
        // Add signage mode toggle to floating actions
        const floatingActions = document.querySelector('.floating-actions');
        if (floatingActions) {
            const signageBtn = document.createElement('button');
            signageBtn.className = 'float-btn signage-btn';
            signageBtn.innerHTML = '📺';
            signageBtn.title = 'デジタルサイネージモード';
            signageBtn.addEventListener('click', () => this.toggleSignageMode());
            
            floatingActions.appendChild(signageBtn);
        }
    }

    toggleSignageMode() {
        this.isSignageMode = !this.isSignageMode;
        document.body.classList.toggle('signage-mode', this.isSignageMode);
        
        if (this.isSignageMode) {
            this.startSignageMode();
        } else {
            this.stopSignageMode();
        }
    }

    startSignageMode() {
        // Hide navigation and other UI elements
        document.querySelector('.header').style.display = 'none';
        document.querySelector('.floating-actions').style.display = 'none';
        document.querySelector('.footer').style.display = 'none';
        
        // Show exit button
        this.createExitButton();
        
        // Start auto-rotation of interactive elements
        this.startAutoRotation();
        
        // Increase font sizes for better readability
        document.body.style.fontSize = '1.2em';
        
        // Track signage mode usage
        if (window.masumasuAnalytics) {
            window.masumasuAnalytics.trackSignageMode('enter');
        }
    }

    stopSignageMode() {
        // Restore navigation and UI elements
        document.querySelector('.header').style.display = 'block';
        document.querySelector('.floating-actions').style.display = 'flex';
        document.querySelector('.footer').style.display = 'block';
        
        // Remove exit button
        const exitBtn = document.getElementById('signageExitBtn');
        if (exitBtn) exitBtn.remove();
        
        // Stop auto-rotation
        this.stopAutoRotation();
        
        // Reset font size
        document.body.style.fontSize = '';
        
        // Track signage mode exit
        if (window.masumasuAnalytics) {
            window.masumasuAnalytics.trackSignageMode('exit');
        }
    }

    createExitButton() {
        const exitBtn = document.createElement('button');
        exitBtn.id = 'signageExitBtn';
        exitBtn.innerHTML = '✕ サイネージモードを終了';
        exitBtn.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            background: var(--color-accent);
            color: var(--color-primary);
            border: none;
            padding: 15px 25px;
            border-radius: 10px;
            font-weight: 700;
            cursor: pointer;
            box-shadow: var(--shadow-luxury);
        `;
        exitBtn.addEventListener('click', () => this.toggleSignageMode());
        document.body.appendChild(exitBtn);
    }

    startAutoRotation() {
        // Auto-click through process steps every 10 seconds
        this.rotationInterval = setInterval(() => {
            const processSteps = document.querySelectorAll('.process-step-interactive');
            const riceCards = document.querySelectorAll('.interactive-rice');
            
            if (processSteps.length > 0) {
                const activeStep = document.querySelector('.process-step-interactive.active');
                let nextIndex = 0;
                
                if (activeStep) {
                    const currentIndex = Array.from(processSteps).indexOf(activeStep);
                    nextIndex = (currentIndex + 1) % processSteps.length;
                }
                
                processSteps[nextIndex].click();
            }
        }, 10000);
    }

    stopAutoRotation() {
        if (this.rotationInterval) {
            clearInterval(this.rotationInterval);
        }
    }

    setupSignageStyles() {
        const signageStyles = `
            <style>
            .signage-mode {
                cursor: none;
            }
            
            .signage-mode .process-step-interactive,
            .signage-mode .interactive-rice {
                transform: scale(1.1);
                animation: gentle-pulse 3s ease-in-out infinite;
            }
            
            .signage-mode .process-explanation,
            .signage-mode .rice-explanation {
                font-size: 1.1em;
                line-height: 1.8;
            }
            
            @keyframes gentle-pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.8; }
            }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', signageStyles);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.interactiveExplanations = new InteractiveExplanations();
    window.digitalSignageMode = new DigitalSignageMode();
});