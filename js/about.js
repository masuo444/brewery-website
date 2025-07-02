// About page specific JavaScript
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
                pageTitle: '酒蔵について',
                pageSubtitle: '三百年の歴史と伝統',
                history: '歴史',
                philosophy: '酒造りの哲学',
                team: '蔵人たち',
                awards: '受賞歴',
                philosophyQuote: '一滴入魂',
                philosophyMeaning: 'Every drop contains our soul',
                principle1Title: '自然との調和',
                principle1Text: '山から湧き出る清水、厳選された酒米、そして自然の恵みを最大限に活かす酒造り。四季の移ろいとともに、自然と対話しながら醸造を行います。',
                principle2Title: '伝統技術の継承',
                principle2Text: '三百年にわたり受け継がれてきた技術と知恵。杜氏から杜氏へ、世代を超えて伝えられる匠の技が、唯一無二の味わいを生み出します。',
                principle3Title: '革新への挑戦',
                principle3Text: '伝統を守りながらも、常に新しい可能性を追求。最新の技術と古来の知恵を融合させ、世界に誇る日本酒を造り続けています。'
            },
            en: {
                pageTitle: 'About Our Brewery',
                pageSubtitle: 'Three Centuries of History and Tradition',
                history: 'History',
                philosophy: 'Brewing Philosophy',
                team: 'Our Team',
                awards: 'Awards',
                philosophyQuote: 'One Drop, One Soul',
                philosophyMeaning: '一滴入魂',
                principle1Title: 'Harmony with Nature',
                principle1Text: 'Pure spring water from the mountains, carefully selected sake rice, and maximizing nature\'s blessings. We brew while conversing with nature through the changing seasons.',
                principle2Title: 'Inheriting Traditional Techniques',
                principle2Text: 'Techniques and wisdom passed down for three hundred years. The craft transmitted from toji to toji across generations creates our unique flavors.',
                principle3Title: 'Challenging Innovation',
                principle3Text: 'While preserving tradition, we constantly pursue new possibilities. We continue to create world-class sake by fusing cutting-edge technology with ancient wisdom.'
            },
            fr: {
                pageTitle: 'À Propos de Notre Brasserie',
                pageSubtitle: 'Trois Siècles d\'Histoire et de Tradition',
                history: 'Histoire',
                philosophy: 'Philosophie de Brassage',
                team: 'Notre Équipe',
                awards: 'Récompenses',
                philosophyQuote: 'Une Goutte, Une Âme',
                philosophyMeaning: '一滴入魂',
                principle1Title: 'Harmonie avec la Nature',
                principle1Text: 'Eau de source pure des montagnes, riz à saké soigneusement sélectionné, et maximisation des bénédictions de la nature.',
                principle2Title: 'Héritage des Techniques Traditionnelles',
                principle2Text: 'Techniques et sagesse transmises depuis trois cents ans. L\'artisanat transmis de toji en toji crée nos saveurs uniques.',
                principle3Title: 'Défier l\'Innovation',
                principle3Text: 'Tout en préservant la tradition, nous poursuivons constamment de nouvelles possibilités.'
            },
            zh: {
                pageTitle: '关于酒造',
                pageSubtitle: '三百年的历史与传统',
                history: '历史',
                philosophy: '酿酒哲学',
                team: '酿酒师团队',
                awards: '获奖记录',
                philosophyQuote: '一滴入魂',
                philosophyMeaning: '每一滴都蕴含着我们的灵魂',
                principle1Title: '与自然和谐',
                principle1Text: '山泉清水、精选酒米，最大限度地发挥自然的恩赐。随着四季更迭，与自然对话中进行酿造。',
                principle2Title: '传统技术的传承',
                principle2Text: '三百年来代代相传的技术和智慧。从杜氏到杜氏，跨越世代传承的匠人技艺，创造出独一无二的风味。',
                principle3Title: '挑战创新',
                principle3Text: '在守护传统的同时，不断追求新的可能性。融合最新技术与古老智慧，继续酿造世界级的日本酒。'
            }
        };
        
        const trans = translations[lang] || translations.ja;
        
        // Update page content
        document.querySelector('.page-title').textContent = trans.pageTitle;
        document.querySelector('.page-subtitle').textContent = trans.pageSubtitle;
        
        // Update section titles
        const sectionTitles = document.querySelectorAll('.section-title');
        sectionTitles[0].textContent = trans.history;
        sectionTitles[1].textContent = trans.philosophy;
        sectionTitles[2].textContent = trans.team;
        sectionTitles[3].textContent = trans.awards;
        
        // Update philosophy content
        document.querySelector('.quote-text').textContent = trans.philosophyQuote;
        document.querySelector('.quote-meaning').textContent = trans.philosophyMeaning;
        
        const principles = document.querySelectorAll('.principle');
        principles[0].querySelector('h3').textContent = trans.principle1Title;
        principles[0].querySelector('p').textContent = trans.principle1Text;
        principles[1].querySelector('h3').textContent = trans.principle2Title;
        principles[1].querySelector('p').textContent = trans.principle2Text;
        principles[2].querySelector('h3').textContent = trans.principle3Title;
        principles[2].querySelector('p').textContent = trans.principle3Text;
    }
    
    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe timeline items
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s ease';
        observer.observe(item);
    });
    
    // Observe team members
    document.querySelectorAll('.team-member').forEach((member, index) => {
        member.style.opacity = '0';
        member.style.transform = 'translateY(30px)';
        member.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(member);
    });
    
    // Observe award items
    document.querySelectorAll('.award-item').forEach((award, index) => {
        award.style.opacity = '0';
        award.style.transform = 'scale(0.9)';
        award.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(award);
    });
});