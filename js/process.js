// Process page specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Language switching functionality
    const languageSelect = document.getElementById('languageSelect');
    let currentLanguage = localStorage.getItem('selectedLanguage') || 'ja';
    
    // Set initial language
    languageSelect.value = currentLanguage;
    updatePageLanguage(currentLanguage);
    
    // Language change handler
    languageSelect.addEventListener('change', (e) => {
        currentLanguage = e.target.value;
        localStorage.setItem('selectedLanguage', currentLanguage);
        updatePageLanguage(currentLanguage);
    });
    
    // Update page content based on language
    function updatePageLanguage(lang) {
        const translations = {
            ja: {
                pageTitle: '醸造工程',
                pageSubtitle: '伝統の技が生み出す至高の一滴',
                overviewTitle: '日本酒ができるまで',
                overviewText: '益々酒造では、三百年の伝統を守りながら、最新の技術も取り入れた酒造りを行っています。原料選びから瓶詰めまで、すべての工程において妥協のない品質管理を徹底し、世界に誇る日本酒を醸造しています。',
                specialTechniques: '伝統の技法',
                steps: [
                    {
                        title: '原料米の選定',
                        subtitle: 'Rice Selection',
                        description: '最高品質の酒造好適米を厳選。山田錦、五百万石、雄町など、それぞれの特性を活かした酒造りのため、契約農家と共に土壌づくりから取り組んでいます。'
                    },
                    {
                        title: '精米',
                        subtitle: 'Rice Polishing',
                        description: '酒質に応じて精米歩合を調整。大吟醸では35%以下まで磨き上げ、雑味の原因となる外側の部分を取り除きます。この工程には最大72時間かかることもあります。'
                    },
                    {
                        title: '洗米・浸漬',
                        subtitle: 'Washing & Soaking',
                        description: '精米した米を丁寧に洗い、適切な水分を吸収させます。秒単位での浸漬時間管理により、理想的な蒸米の状態を実現。この工程が酒質の基礎を決定します。'
                    },
                    {
                        title: '蒸米',
                        subtitle: 'Steaming',
                        description: '和釜で約60分間蒸し上げます。外硬内軟の理想的な蒸米を目指し、温度と蒸気量を細かく調整。麹菌が活動しやすい状態を作ります。'
                    },
                    {
                        title: '麹造り',
                        subtitle: 'Koji Making',
                        description: '日本酒造りの要となる麹造り。温度と湿度を厳密に管理した麹室で、48時間かけて丁寧に育てます。杜氏の経験と勘が最も問われる工程です。'
                    },
                    {
                        title: '酒母造り',
                        subtitle: 'Yeast Starter',
                        description: '優良な酵母を大量に培養する酒母造り。乳酸を加えて雑菌を抑制し、約14日間かけて強健な酵母を育成します。'
                    },
                    {
                        title: '仕込み・発酵',
                        subtitle: 'Fermentation',
                        description: '三段仕込みで慎重に仕込みを行い、約30日間の発酵期間を経てアルコールと香味成分が生成されます。温度管理が酒質を左右します。'
                    },
                    {
                        title: '上槽（搾り）',
                        subtitle: 'Pressing',
                        description: '発酵を終えたもろみを搾り、清酒と酒粕に分離します。搾り方により味わいが変化するため、目指す酒質に応じて最適な方法を選択します。'
                    },
                    {
                        title: '貯蔵・熟成',
                        subtitle: 'Storage & Aging',
                        description: '搾りたての新酒を低温で貯蔵し、熟成させます。この期間に角が取れ、まろやかで深みのある味わいへと変化します。'
                    },
                    {
                        title: '瓶詰め',
                        subtitle: 'Bottling',
                        description: '最終的な品質検査を経て、一本一本丁寧に瓶詰めします。お客様の手に届くまで、品質を保つための最後の重要な工程です。'
                    }
                ]
            },
            en: {
                pageTitle: 'Brewing Process',
                pageSubtitle: 'Traditional Craftsmanship Creates the Ultimate Drop',
                overviewTitle: 'How Sake is Made',
                overviewText: 'At Masumasu Brewery, we create sake while preserving three centuries of tradition and incorporating the latest technology. From ingredient selection to bottling, we maintain uncompromising quality control at every step.',
                specialTechniques: 'Traditional Techniques',
                steps: [
                    {
                        title: 'Rice Selection',
                        subtitle: '原料米の選定',
                        description: 'We carefully select the highest quality sake rice. Working with contract farmers, we engage in soil preparation to maximize the characteristics of Yamada Nishiki, Gohyakumangoku, and Omachi varieties.'
                    },
                    {
                        title: 'Rice Polishing',
                        subtitle: '精米',
                        description: 'We adjust the polishing ratio according to the desired sake quality. For Daiginjo, we polish down to 35% or less, removing the outer portions that cause off-flavors. This process can take up to 72 hours.'
                    }
                    // Continue with other translations...
                ]
            },
            fr: {
                pageTitle: 'Processus de Brassage',
                pageSubtitle: 'L\'artisanat traditionnel crée la goutte ultime',
                overviewTitle: 'Comment le Saké est Fait',
                overviewText: 'À la Brasserie Masumasu, nous créons du saké en préservant trois siècles de tradition tout en incorporant les dernières technologies.',
                specialTechniques: 'Techniques Traditionnelles'
            },
            zh: {
                pageTitle: '酿造工艺',
                pageSubtitle: '传统技艺酿造极致美酒',
                overviewTitle: '日本酒的酿造过程',
                overviewText: '益益酒造在保持三百年传统的同时，也融入了最新技术。从原料选择到装瓶，我们在每个步骤都坚持不妥协的质量控制。',
                specialTechniques: '传统技法'
            }
        };
        
        const trans = translations[lang] || translations.ja;
        
        // Update page content
        document.querySelector('.page-title').textContent = trans.pageTitle;
        document.querySelector('.page-subtitle').textContent = trans.pageSubtitle;
        document.querySelector('.overview-content h2').textContent = trans.overviewTitle;
        document.querySelector('.overview-text').textContent = trans.overviewText;
        document.querySelector('.special-techniques h2').textContent = trans.specialTechniques;
        
        // Update step content if available
        if (trans.steps) {
            const stepInfos = document.querySelectorAll('.step-info');
            stepInfos.forEach((info, index) => {
                if (trans.steps[index]) {
                    info.querySelector('h3').textContent = trans.steps[index].title;
                    info.querySelector('h4').textContent = trans.steps[index].subtitle;
                    info.querySelector('p').textContent = trans.steps[index].description;
                }
            });
        }
    }
    
    // Scroll animations for process steps
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animate step number
                const stepNumber = entry.target.querySelector('.step-number');
                if (stepNumber) {
                    stepNumber.style.opacity = '0.3';
                    stepNumber.style.transform = 'scale(1)';
                }
            }
        });
    }, observerOptions);
    
    // Observe process steps
    document.querySelectorAll('.process-step').forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(50px)';
        step.style.transition = `all 0.8s ease ${index * 0.1}s`;
        
        const stepNumber = step.querySelector('.step-number');
        if (stepNumber) {
            stepNumber.style.opacity = '0';
            stepNumber.style.transform = 'scale(0.5)';
            stepNumber.style.transition = 'all 0.6s ease';
        }
        
        observer.observe(step);
    });
    
    // Observe technique cards
    document.querySelectorAll('.technique-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.page-hero');
        if (hero && scrolled < 600) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
});