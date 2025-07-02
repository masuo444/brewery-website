// Visit page specific JavaScript
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
                pageTitle: '見学・ツアー',
                pageSubtitle: '伝統の酒造りを五感で体験',
                introTitle: '酒蔵見学へようこそ',
                introText: '益々酒造では、三百年の歴史ある酒蔵を巡り、伝統的な日本酒造りの全工程をご覧いただけます。杜氏による解説を聞きながら、実際の醸造現場を見学し、できたての日本酒をテイスティング。五感すべてで日本酒の奥深さを体験していただける、特別なツアーをご用意しています。',
                tourPlans: 'ツアープラン',
                tourGallery: 'ツアーの様子',
                access: 'アクセス',
                notes: 'ご注意事項',
                faq: 'よくあるご質問',
                specialEvents: '季節の特別イベント',
                bookButton: '予約する',
                inquireButton: 'お問い合わせ'
            },
            en: {
                pageTitle: 'Visit & Tours',
                pageSubtitle: 'Experience Traditional Sake Making with All Five Senses',
                introTitle: 'Welcome to Our Brewery Tour',
                introText: 'At Masumasu Brewery, you can tour our 300-year-old sake brewery and witness the entire traditional sake-making process. Listen to explanations from our toji (master brewer), observe actual brewing operations, and taste freshly made sake. We offer special tours that allow you to experience the depth of sake with all five senses.',
                tourPlans: 'Tour Plans',
                tourGallery: 'Tour Gallery',
                access: 'Access',
                notes: 'Important Notes',
                faq: 'FAQ',
                specialEvents: 'Seasonal Special Events',
                bookButton: 'Book Now',
                inquireButton: 'Contact Us'
            },
            fr: {
                pageTitle: 'Visites et Tours',
                pageSubtitle: 'Découvrez la Fabrication Traditionnelle du Saké avec Tous Vos Sens',
                introTitle: 'Bienvenue à Notre Visite de Brasserie',
                introText: 'À la Brasserie Masumasu, vous pouvez visiter notre brasserie de saké vieille de 300 ans et découvrir l\'ensemble du processus traditionnel de fabrication du saké.',
                tourPlans: 'Plans de Visite',
                tourGallery: 'Galerie de Tours',
                access: 'Accès',
                notes: 'Notes Importantes',
                faq: 'FAQ',
                specialEvents: 'Événements Spéciaux Saisonniers',
                bookButton: 'Réserver',
                inquireButton: 'Nous Contacter'
            },
            zh: {
                pageTitle: '参观与游览',
                pageSubtitle: '用五感体验传统酿酒',
                introTitle: '欢迎参观酒造',
                introText: '在益益酒造，您可以参观我们有着300年历史的酒造，观看传统日本酒酿造的全过程。在杜氏的讲解下，参观实际的酿造现场，品尝新鲜酿造的日本酒。我们提供特别的游览，让您用五感体验日本酒的深邃。',
                tourPlans: '游览计划',
                tourGallery: '游览画廊',
                access: '交通',
                notes: '注意事项',
                faq: '常见问题',
                specialEvents: '季节特别活动',
                bookButton: '预约',
                inquireButton: '联系我们'
            }
        };
        
        const trans = translations[lang] || translations.ja;
        
        // Update page content
        document.querySelector('.page-title').textContent = trans.pageTitle;
        document.querySelector('.page-subtitle').textContent = trans.pageSubtitle;
        
        // Update section titles
        const sectionTitles = document.querySelectorAll('.section-title');
        if (sectionTitles[0]) sectionTitles[0].textContent = trans.introTitle;
        if (sectionTitles[1]) sectionTitles[1].textContent = trans.tourPlans;
        if (sectionTitles[2]) sectionTitles[2].textContent = trans.tourGallery;
        if (sectionTitles[3]) sectionTitles[3].textContent = trans.specialEvents;
        
        // Update intro text
        const introText = document.querySelector('.intro-text');
        if (introText) introText.textContent = trans.introText;
        
        // Update info card titles
        const infoCards = document.querySelectorAll('.info-card h3');
        if (infoCards[0]) infoCards[0].textContent = trans.access;
        if (infoCards[1]) infoCards[1].textContent = trans.notes;
        if (infoCards[2]) infoCards[2].textContent = trans.faq;
        
        // Update buttons
        document.querySelectorAll('.tour-book-btn').forEach(btn => {
            if (!btn.textContent.includes('お問い合わせ') && !btn.textContent.includes('Contact')) {
                btn.textContent = trans.bookButton;
            } else {
                btn.textContent = trans.inquireButton;
            }
        });
    }
    
    // Tour booking button handlers
    document.querySelectorAll('.tour-book-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const tourCard = this.closest('.tour-card');
            const tourName = tourCard.querySelector('h3').textContent;
            const tourPrice = tourCard.querySelector('.tour-price').textContent;
            
            // Show booking modal or redirect to contact page
            if (this.textContent.includes('お問い合わせ') || this.textContent.includes('Contact')) {
                window.location.href = 'contact.html';
            } else {
                alert(`${tourName} のご予約を承ります。\n料金: ${tourPrice}\n\n予約フォームへ移動します。`);
                window.location.href = 'contact.html';
            }
        });
    });
    
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
    
    // Observe tour cards
    document.querySelectorAll('.tour-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.2}s`;
        observer.observe(card);
    });
    
    // Observe gallery items
    document.querySelectorAll('.gallery-item').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.9)';
        item.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });
    
    // Observe event cards
    document.querySelectorAll('.event-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.15}s`;
        observer.observe(card);
    });
    
    // Parallax effect for hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.page-hero');
        if (hero && scrolled < 600) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});