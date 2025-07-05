// Mobile Enhancements - Google Translate & AI Chatbot
(function() {
    'use strict';

    // Initialize on DOM content loaded
    document.addEventListener('DOMContentLoaded', function() {
        initializeMobileEnhancements();
    });

    function initializeMobileEnhancements() {
        addGoogleTranslateToHeader();
        addMobileAIChatbot();
        setupMobileOptimizations();
    }

    // Add Google Translate to header if not present
    function addGoogleTranslateToHeader() {
        const navRight = document.querySelector('.nav-right');
        if (!navRight) return;

        // Check if Google Translate already exists
        if (document.getElementById('google_translate_element')) {
            return;
        }

        // Create Google Translate container
        const translateContainer = document.createElement('div');
        translateContainer.className = 'google-translate-container';
        translateContainer.innerHTML = '<div id="google_translate_element"></div>';

        // Insert before cart button or at the beginning
        const cartBtn = navRight.querySelector('.cart-btn');
        if (cartBtn) {
            navRight.insertBefore(translateContainer, cartBtn);
        } else {
            navRight.appendChild(translateContainer);
        }

        // Load Google Translate script
        loadGoogleTranslateScript();
    }

    // Load Google Translate API
    function loadGoogleTranslateScript() {
        // Add Google Translate initialization function to global scope
        window.googleTranslateElementInit = function() {
            new google.translate.TranslateElement({
                pageLanguage: 'ja',
                includedLanguages: 'en,fr,zh,ko,it,es,vi,ar,de,ru,pt,th,hi,tr,pl,nl,sv,da,no,fi,he,id,ms,tl,bg,hr,cs,et,lv,lt,hu,mt,sk,sl,ro,uk,el,ca,eu,ga,cy,is,fa,ur,bn,ta,te,ml,kn,gu,pa,ne,si,my,km,lo,ka,am,sw,zu,af,sq,az,be,bs,mk,mn,sr,uz,ky,kk,tg,hy,ka',
                layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                gaTrack: true,
                gaId: 'UA-XXXXX-Y'
            }, 'google_translate_element');
        };

        // Load the Google Translate script
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;
        document.head.appendChild(script);
    }

    // Add Mobile AI Chatbot
    function addMobileAIChatbot() {
        // Check if already exists
        if (document.querySelector('.mobile-ai-chatbot')) {
            return;
        }

        // Create chatbot container
        const chatbotContainer = document.createElement('div');
        chatbotContainer.className = 'mobile-ai-chatbot';
        
        const chatbotButton = document.createElement('button');
        chatbotButton.className = 'chatbot-btn';
        chatbotButton.textContent = '🌸 AIサクラに相談する';
        
        // Add click event listener directly
        chatbotButton.addEventListener('click', function() {
            console.log('Chatbot button clicked');
            if (typeof window.openAIChat === 'function') {
                window.openAIChat();
            } else {
                alert('チャットボット機能を読み込み中です...');
                console.error('openAIChat function not available');
            }
        });
        
        chatbotContainer.appendChild(chatbotButton);

        // Add to body
        document.body.appendChild(chatbotContainer);

        // Add padding to body to prevent content overlap
        document.body.classList.add('mobile-chatbot-active');
    }

    // Setup mobile optimizations
    function setupMobileOptimizations() {
        // Only run on mobile devices
        if (window.innerWidth <= 768) {
            // Add mobile-specific classes
            document.body.classList.add('mobile-device');
            
            // Optimize touch interactions
            const touchElements = document.querySelectorAll('a, button, .nav-link');
            touchElements.forEach(element => {
                element.style.touchAction = 'manipulation';
            });
        }
    }

    // Global function to open AI chat
    window.openAIChat = function() {
        console.log('openAIChat called');
        // Check if AI Sakura chat exists
        if (typeof window.openSakuraChat === 'function') {
            console.log('Opening Sakura chat');
            window.openSakuraChat();
        } else {
            console.log('Sakura chat not loaded, attempting to load and open');
            // Try a simple alert first to test if function is called
            alert('AIサクラチャットボットを読み込み中...');
            
            // Load AI Sakura chat script if not loaded
            const script = document.createElement('script');
            script.src = 'js/ai-sakura-chat.js';
            script.onload = function() {
                console.log('Sakura chat script loaded');
                if (typeof window.openSakuraChat === 'function') {
                    window.openSakuraChat();
                } else {
                    alert('チャットボットの読み込みに失敗しました。');
                }
            };
            script.onerror = function() {
                console.error('Failed to load ai-sakura-chat.js');
                alert('チャットボットスクリプトの読み込みに失敗しました。');
            };
            document.head.appendChild(script);
        }
    };

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            document.body.classList.remove('mobile-device');
        } else {
            document.body.classList.add('mobile-device');
        }
    });

})();