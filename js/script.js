// Global variables
let currentLanguage = 'ja';
let currentFilters = {
    type: 'all',
    price: 'all',
    region: 'all',
    limited: false,
    search: ''
};
let cart = [];
let filteredProducts = [...sakeData];

// DOM elements
const languageSelect = document.getElementById('languageSelect');
const globalSearch = document.getElementById('globalSearch');
const productsGrid = document.getElementById('productsGrid');
const cartBtn = document.getElementById('cartBtn');
const cartCount = document.getElementById('cartCount');
const cartSidebar = document.getElementById('cartSidebar');
const cartClose = document.getElementById('cartClose');
const cartContent = document.getElementById('cartContent');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const productModal = document.getElementById('productModal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.querySelector('.modal-close');
const aiChat = document.getElementById('aiChat');
const aiSommelierBtn = document.getElementById('aiSommelierBtn');
const chatClose = document.getElementById('chatClose');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');
const qrScanner = document.getElementById('qrScanner');
const qrScanBtn = document.getElementById('qrScanBtn');
const scannerClose = document.getElementById('scannerClose');
const quickLangBtn = document.getElementById('quickLangBtn');
const header = document.querySelector('.header');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');
const aiChatStartBtn = document.getElementById('aiChatStartBtn');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Set initial language from localStorage or default to Japanese
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage && translations[savedLanguage]) {
        currentLanguage = savedLanguage;
    } else {
        // Set initial language from browser or default to Japanese
        const browserLang = navigator.language.slice(0, 2);
        if (translations[browserLang]) {
            currentLanguage = browserLang;
        }
    }
    
    // Make current language available globally for AI chat
    window.currentLanguage = currentLanguage;
    if (languageSelect) {
        languageSelect.value = currentLanguage;
    }

    // Apply initial translations
    updateLanguage();

    // Render initial products
    renderProducts();

    // Setup event listeners
    setupEventListeners();

    // Setup filter tabs
    setupFilterTabs();

    // Scroll effect for header
    setupScrollEffects();

    // Initialize animations
    setupAnimations();
}

function setupEventListeners() {
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Language selector (disabled - using Google Translate)
    if (languageSelect) {
        languageSelect.addEventListener('change', (e) => {
            currentLanguage = e.target.value;
            window.currentLanguage = currentLanguage; // Make available globally
            updateLanguage();
            renderProducts();
        });
    }

    // Global search
    globalSearch.addEventListener('input', (e) => {
        currentFilters.search = e.target.value.toLowerCase();
        filterAndRenderProducts();
    });

    globalSearch.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            filterAndRenderProducts();
        }
    });

    // Cart functionality
    cartBtn.addEventListener('click', () => {
        cartSidebar.classList.add('active');
    });

    cartClose.addEventListener('click', () => {
        cartSidebar.classList.remove('active');
    });

    checkoutBtn.addEventListener('click', () => {
        if (cart.length > 0) {
            alert(translations[currentLanguage].checkoutMessage || 'Proceeding to checkout...');
        }
    });

    // Modal functionality
    modalClose.addEventListener('click', () => {
        productModal.classList.remove('active');
    });

    productModal.addEventListener('click', (e) => {
        if (e.target === productModal) {
            productModal.classList.remove('active');
        }
    });

    // AI Chat functionality
    aiSommelierBtn.addEventListener('click', () => {
        aiChat.classList.add('active');
    });

    // AI Chat start button from intro section
    if (aiChatStartBtn) {
        aiChatStartBtn.addEventListener('click', () => {
            aiChat.classList.add('active');
        });
    }

    chatClose.addEventListener('click', () => {
        aiChat.classList.remove('active');
    });

    chatSend.addEventListener('click', () => {
        sendChatMessage();
    });

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendChatMessage();
        }
    });

    // QR Scanner functionality
    qrScanBtn.addEventListener('click', () => {
        qrScanner.style.display = 'flex';
        // Simulate QR scanning
        setTimeout(() => {
            const randomProduct = sakeData[Math.floor(Math.random() * sakeData.length)];
            openProductModal(randomProduct);
            qrScanner.style.display = 'none';
        }, 3000);
    });

    scannerClose.addEventListener('click', () => {
        qrScanner.style.display = 'none';
    });

    // Quick language switcher (disabled - using Google Translate)
    if (quickLangBtn) {
        quickLangBtn.addEventListener('click', () => {
            const languages = ['ja', 'en', 'fr', 'zh', 'ko', 'it', 'es', 'vi'];
            const currentIndex = languages.indexOf(currentLanguage);
            const nextIndex = (currentIndex + 1) % languages.length;
            currentLanguage = languages[nextIndex];
            window.currentLanguage = currentLanguage; // Make available globally
            if (languageSelect) languageSelect.value = currentLanguage;
            updateLanguage();
            renderProducts();
        });
    }

    // Close sidebars when clicking outside
    document.addEventListener('click', (e) => {
        if (!cartSidebar.contains(e.target) && !cartBtn.contains(e.target)) {
            cartSidebar.classList.remove('active');
        }
        
        if (!aiChat.contains(e.target) && !aiSommelierBtn.contains(e.target)) {
            aiChat.classList.remove('active');
        }

        if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });
}

function setupFilterTabs() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const filterSections = document.querySelectorAll('.filter-section');
    const filterContent = document.querySelector('.filter-content');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const filter = tab.dataset.filter;
            
            // Remove active class from all tabs
            filterTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');

            // Hide all filter sections
            filterSections.forEach(section => {
                section.style.display = 'none';
            });

            if (filter === 'all') {
                filterContent.classList.remove('active');
                currentFilters = { type: 'all', price: 'all', region: 'all', limited: false, search: currentFilters.search };
            } else if (filter === 'limited') {
                filterContent.classList.remove('active');
                currentFilters.limited = !currentFilters.limited;
                tab.classList.toggle('active', currentFilters.limited);
                if (!currentFilters.limited) {
                    document.querySelector('[data-filter="all"]').classList.add('active');
                }
            } else {
                filterContent.classList.add('active');
                const targetSection = document.getElementById(filter + 'Filters');
                if (targetSection) {
                    targetSection.style.display = 'block';
                }
            }

            filterAndRenderProducts();
        });
    });

    // Setup filter options
    setupFilterOptions();
}

function setupFilterOptions() {
    const filterOptions = document.querySelectorAll('.filter-option');
    
    filterOptions.forEach(option => {
        option.addEventListener('click', () => {
            const parent = option.closest('.filter-section');
            const siblings = parent.querySelectorAll('.filter-option');
            
            // Remove active class from siblings
            siblings.forEach(sibling => sibling.classList.remove('active'));
            
            // Add active class to clicked option
            option.classList.add('active');

            // Update filter
            if (option.dataset.type) {
                currentFilters.type = option.dataset.type;
            } else if (option.dataset.price) {
                currentFilters.price = option.dataset.price;
            } else if (option.dataset.region) {
                currentFilters.region = option.dataset.region;
            }

            filterAndRenderProducts();
        });
    });
}

function setupScrollEffects() {
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scrolled class to header
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
}

function setupAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe product cards
    const observeProducts = () => {
        document.querySelectorAll('.product-card').forEach(card => {
            observer.observe(card);
        });
    };

    // Initial observation
    setTimeout(observeProducts, 100);
    
    // Re-observe when products are re-rendered
    const originalRenderProducts = renderProducts;
    renderProducts = function() {
        originalRenderProducts.apply(this, arguments);
        setTimeout(observeProducts, 100);
    };
}

async function updateLanguage() {
    // Use DeepL translation for real-time translation
    if (window.deepLTranslation && currentLanguage !== 'ja') {
        await window.deepLTranslation.translatePage(currentLanguage);
    }
    
    // Update placeholders using DeepL
    if (globalSearch && window.deepLTranslation && currentLanguage !== 'ja') {
        const placeholder = await window.deepLTranslation.translateText('お酒を検索...', currentLanguage);
        globalSearch.placeholder = placeholder;
    } else if (globalSearch) {
        globalSearch.placeholder = 'お酒を検索...';
    }

    // Update document title using DeepL
    if (window.deepLTranslation && currentLanguage !== 'ja') {
        const title = await window.deepLTranslation.translateText('益々酒造', currentLanguage);
        const subtitle = await window.deepLTranslation.translateText('プレミアム日本酒コレクション', currentLanguage);
        document.title = `${title} - ${subtitle}`;
    } else {
        document.title = '益々酒造 - プレミアム日本酒コレクション';
    }
    
    // Update HTML lang attribute
    document.documentElement.lang = currentLanguage;
    
    // Store language preference
    localStorage.setItem('selectedLanguage', currentLanguage);
    
    // Notify AI Chat system of language change
    window.dispatchEvent(new CustomEvent('languageChanged', {
        detail: { language: currentLanguage }
    }));
}

function filterAndRenderProducts() {
    filteredProducts = sakeData.filter(product => {
        // Search filter
        if (currentFilters.search) {
            const searchLower = currentFilters.search;
            const searchableText = [
                product.name[currentLanguage] || product.name.en,
                product.brewery[currentLanguage] || product.brewery.en,
                product.region[currentLanguage] || product.region.en,
                product.riceType[currentLanguage] || product.riceType.en
            ].join(' ').toLowerCase();
            
            if (!searchableText.includes(searchLower)) {
                return false;
            }
        }

        // Type filter
        if (currentFilters.type !== 'all') {
            const productType = (product.type.en || '').toLowerCase().replace(/\s+/g, '-');
            if (productType !== currentFilters.type) {
                return false;
            }
        }

        // Price filter
        if (currentFilters.price !== 'all') {
            const [min, max] = currentFilters.price.split('-').map(p => parseInt(p) || 0);
            if (max && (product.price < min || product.price > max)) {
                return false;
            } else if (!max && product.price < min) {
                return false;
            }
        }

        // Region filter
        if (currentFilters.region !== 'all') {
            const productRegion = (product.region.en || '').toLowerCase();
            const filterRegion = currentFilters.region.toLowerCase();
            
            if (filterRegion === 'other') {
                const mainRegions = ['hyogo', 'kyoto', 'niigata', 'yamagata'];
                if (mainRegions.some(region => productRegion.includes(region))) {
                    return false;
                }
            } else if (!productRegion.includes(filterRegion)) {
                return false;
            }
        }

        // Limited filter
        if (currentFilters.limited && !product.limited) {
            return false;
        }

        return true;
    });

    renderProducts();
}

async function renderProducts() {
    if (!productsGrid) return;
    
    if (filteredProducts.length === 0) {
        let noProductsTitle = 'No products found';
        let noProductsDesc = 'Try adjusting your filters or search terms.';
        
        if (window.deepLTranslation && currentLanguage !== 'ja') {
            noProductsTitle = await window.deepLTranslation.translateText('商品が見つかりません', currentLanguage);
            noProductsDesc = await window.deepLTranslation.translateText('フィルターや検索条件を調整してください。', currentLanguage);
        } else if (currentLanguage === 'ja') {
            noProductsTitle = '商品が見つかりません';
            noProductsDesc = 'フィルターや検索条件を調整してください。';
        }
        
        productsGrid.innerHTML = `
            <div class="no-products">
                <h3>${noProductsTitle}</h3>
                <p>${noProductsDesc}</p>
            </div>
        `;
        return;
    }

    // Render products with DeepL translations
    const productCards = await Promise.all(filteredProducts.map(async (product) => {
        const stockClass = product.inStock > 20 ? '' : product.inStock > 0 ? 'low' : 'out';
        
        // Translate labels and text
        let bottlesText = 'bottles';
        let outOfStockText = 'Out of Stock';
        let detailsText = 'もっと詳しく';
        let addToCartText = 'Add to Cart';
        let alcoholLabel = 'Alcohol';
        let ricePolishLabel = 'Rice Polish';
        let riceTypeLabel = 'Rice Type';
        let regionLabel = 'Region';
        
        if (window.deepLTranslation && currentLanguage !== 'ja') {
            [bottlesText, outOfStockText, detailsText, addToCartText, 
             alcoholLabel, ricePolishLabel, riceTypeLabel, regionLabel] = await Promise.all([
                window.deepLTranslation.translateText('本', currentLanguage),
                window.deepLTranslation.translateText('在庫切れ', currentLanguage),
                window.deepLTranslation.translateText('もっと詳しく', currentLanguage),
                window.deepLTranslation.translateText('カートに追加', currentLanguage),
                window.deepLTranslation.translateText('アルコール度数', currentLanguage),
                window.deepLTranslation.translateText('精米歩合', currentLanguage),
                window.deepLTranslation.translateText('使用米', currentLanguage),
                window.deepLTranslation.translateText('産地', currentLanguage)
            ]);
        } else if (currentLanguage === 'ja') {
            bottlesText = '本';
            outOfStockText = '在庫切れ';
            detailsText = 'もっと詳しく';
            addToCartText = 'カートに追加';
            alcoholLabel = 'アルコール度数';
            ricePolishLabel = '精米歩合';
            riceTypeLabel = '使用米';
            regionLabel = '産地';
        }
        
        const stockText = product.inStock > 0 ? `${product.inStock} ${bottlesText}` : outOfStockText;
        
        // Translate product data
        let translatedProduct = product;
        if (window.deepLTranslation && currentLanguage !== 'ja') {
            translatedProduct = await window.deepLTranslation.translateProduct(product, currentLanguage);
        }
        
        const productName = translatedProduct.name || product.name.ja;
        const productBrewery = translatedProduct.brewery || product.brewery.ja;
        const productType = translatedProduct.type || product.type.ja;
        const productDescription = translatedProduct.description || product.description.ja;
        const productRiceType = translatedProduct.riceType || product.riceType.ja;
        const productRegion = translatedProduct.region || product.region.ja;
        
        return `
            <div class="product-card ${product.limited ? 'limited' : ''}" data-id="${product.id}">
                <div class="product-image" onclick="window.location.href='product.html?id=${product.id}'">
                    <img src="${product.image}" alt="${productName}" loading="lazy">
                </div>
                <div class="product-info">
                    <div class="product-header">
                        <div class="product-left">
                            <h3 class="product-name ${currentLanguage === 'ja' ? 'japanese' : ''}">${productName}</h3>
                            <p class="product-brewery">${productBrewery}</p>
                            <span class="product-type">${productType}</span>
                        </div>
                        <div class="product-price">¥${product.sizes[0].price.toLocaleString()}</div>
                    </div>
                    
                    <p class="product-description">${productDescription}</p>
                    
                    <div class="product-details">
                        <div class="product-detail">
                            <div class="product-detail-label">${alcoholLabel}</div>
                            <div class="product-detail-value">${product.alcohol}%</div>
                        </div>
                        <div class="product-detail">
                            <div class="product-detail-label">${ricePolishLabel}</div>
                            <div class="product-detail-value">${product.ricePalish ? product.ricePalish + '%' : '-'}</div>
                        </div>
                        <div class="product-detail">
                            <div class="product-detail-label">${riceTypeLabel}</div>
                            <div class="product-detail-value">${productRiceType}</div>
                        </div>
                        <div class="product-detail">
                            <div class="product-detail-label">${regionLabel}</div>
                            <div class="product-detail-value">${productRegion}</div>
                        </div>
                    </div>

                    <div class="product-stock">
                        <span class="stock-indicator ${stockClass}"></span>
                        <span>${stockText}</span>
                    </div>

                    <div class="product-actions">
                        <button class="btn-secondary" onclick="window.location.href='product.html?id=${product.id}'">
                            ${detailsText}
                        </button>
                        <button class="btn-primary" onclick="addToCart(${product.id})" ${product.inStock === 0 ? 'disabled' : ''}>
                            ${addToCartText}
                        </button>
                    </div>
                </div>
            </div>
        `;
    }));
    
    productsGrid.innerHTML = productCards.join('');
}

function openProductModal(product) {
    const trans = translations[currentLanguage];
    
    modalBody.innerHTML = `
        <div class="modal-product">
            <div class="modal-product-image">
                🍶
            </div>
            <div class="modal-product-info">
                <h2 class="modal-product-name ${currentLanguage === 'ja' ? 'japanese' : ''}">${product.name[currentLanguage] || product.name.en}</h2>
                <p class="modal-product-brewery">${product.brewery[currentLanguage] || product.brewery.en}</p>
                <div class="modal-product-price">¥${product.price.toLocaleString()}</div>
                
                <div class="modal-product-description">
                    <p>${product.description[currentLanguage] || product.description.en}</p>
                </div>

                <div class="modal-product-details">
                    <h4>${trans.tastingNotes || 'Tasting Notes'}</h4>
                    <p>${product.tastingNotes[currentLanguage] || product.tastingNotes.en}</p>
                    
                    <h4>${trans.awards || 'Awards'}</h4>
                    <p>${product.awards[currentLanguage] || product.awards.en}</p>
                    
                    <div class="modal-specs">
                        <div class="spec">
                            <span class="spec-label">${trans.alcohol || 'Alcohol'}</span>
                            <span class="spec-value">${product.alcohol}%</span>
                        </div>
                        <div class="spec">
                            <span class="spec-label">${trans.ricePalish || 'Rice Polish'}</span>
                            <span class="spec-value">${product.ricePalish}%</span>
                        </div>
                        <div class="spec">
                            <span class="spec-label">${trans.riceType || 'Rice Type'}</span>
                            <span class="spec-value">${product.riceType[currentLanguage] || product.riceType.en}</span>
                        </div>
                        <div class="spec">
                            <span class="spec-label">${trans.region || 'Region'}</span>
                            <span class="spec-value">${product.region[currentLanguage] || product.region.en}</span>
                        </div>
                    </div>
                </div>

                <div class="modal-actions">
                    <button class="btn-primary" onclick="addToCart(${product.id}); productModal.classList.remove('active');" ${product.inStock === 0 ? 'disabled' : ''}>
                        ${trans.addToCart || 'Add to Cart'} - ¥${product.price.toLocaleString()}
                    </button>
                    <button class="btn-secondary" onclick="generateQR(${product.id})">
                        📱 Generate QR Code
                    </button>
                </div>
            </div>
        </div>
    `;
    
    productModal.classList.add('active');
}

function addToCart(productId) {
    const product = sakeData.find(p => p.id === productId);
    if (!product || product.inStock === 0) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        if (existingItem.quantity < product.inStock) {
            existingItem.quantity++;
        } else {
            alert('Maximum stock reached for this item.');
            return;
        }
    } else {
        cart.push({
            id: productId,
            quantity: 1,
            product: product
        });
    }

    updateCartDisplay();
    
    // Show brief success feedback
    showNotification('Added to cart!');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
}

function updateCartQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = Math.min(quantity, item.product.inStock);
        }
        updateCartDisplay();
    }
}

function updateCartDisplay() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    
    cartCount.textContent = totalItems;
    cartTotal.textContent = totalPrice.toLocaleString();

    if (cart.length === 0) {
        cartContent.innerHTML = `
            <div class="cart-empty">
                <p>Your cart is empty</p>
                <div class="empty-cart-icon">🛒</div>
            </div>
        `;
    } else {
        cartContent.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">🍶</div>
                <div class="cart-item-info">
                    <h4>${item.product.name[currentLanguage] || item.product.name.en}</h4>
                    <p>¥${item.product.price.toLocaleString()}</p>
                    <div class="cart-item-controls">
                        <button onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
                        <button onclick="removeFromCart(${item.id})" class="remove-btn">🗑️</button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

function sendChatMessage() {
    const message = chatInput.value.trim();
    if (!message) return;

    // Add user message
    const userMessage = document.createElement('div');
    userMessage.className = 'chat-message user-message';
    userMessage.innerHTML = `
        <div class="message-content">
            <p>${message}</p>
        </div>
    `;
    chatMessages.appendChild(userMessage);

    // Clear input
    chatInput.value = '';

    // Simulate AI response
    setTimeout(() => {
        const botResponse = generateAIResponse(message);
        const botMessage = document.createElement('div');
        botMessage.className = 'chat-message bot-message';
        botMessage.innerHTML = `
            <div class="message-content">
                <p>${botResponse}</p>
            </div>
        `;
        chatMessages.appendChild(botMessage);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);

    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function generateAIResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    // Japanese language responses
    if (currentLanguage === 'ja') {
        if (lowerMessage.includes('おすすめ') || lowerMessage.includes('推奨') || lowerMessage.includes('選んで')) {
            const randomProduct = sakeData[Math.floor(Math.random() * sakeData.length)];
            return `${randomProduct.name.ja || randomProduct.name.en}をおすすめします。${randomProduct.brewery.ja || randomProduct.brewery.en}の${randomProduct.type.ja || randomProduct.type.en}で、${randomProduct.tastingNotes.ja || randomProduct.tastingNotes.en}という特徴があります。こだわりの逸品です！`;
        }
        
        if (lowerMessage.includes('値段') || lowerMessage.includes('価格') || lowerMessage.includes('いくら')) {
            return 'プレミアム日本酒コレクションは8,000円から30,000円の価格帯です。それぞれが職人の技と伝統を体現した逸品となっております。ご予算に合わせたおすすめもできますよ！';
        }
        
        if (lowerMessage.includes('大吟醸') || lowerMessage.includes('純米')) {
            return '素晴らしい選択です！大吟醸は精米歩合50%以下、純米は米・水・麹・酵母のみで造られる最高級の日本酒です。どちらも純粋で複雑な味わいをお楽しみいただけます。';
        }
        
        if (lowerMessage.includes('料理') || lowerMessage.includes('食事') || lowerMessage.includes('合う')) {
            return '日本酒は様々な料理と素晴らしく合います！純米系は焼き魚などの濃厚な料理に、大吟醸は刺身や軽い前菜に最適です。具体的なペアリングのご提案もできますよ！';
        }
        
        if (lowerMessage.includes('限定') || lowerMessage.includes('特別')) {
            const limitedProducts = sakeData.filter(p => p.limited);
            return `現在${limitedProducts.length}本の限定品をご用意しております！${limitedProducts[0]?.name.ja || limitedProducts[0]?.name.en}や${limitedProducts[1]?.name.ja || limitedProducts[1]?.name.en}などの希少な銘柄です。限定品は特別な醸造技術や季節の素材を使用しています。`;
        }
        
        if (lowerMessage.includes('ツアー') || lowerMessage.includes('見学')) {
            return '酒蔵見学ツアーは90分の体験プログラムです。創業300年の歴史ある蔵で、杜氏による解説とプレミアムテイスティング（5種）をお楽しみいただけます。10言語対応で海外のお客様にも安心です！';
        }
        
        return 'ありがとうございます！私は益々酒造専属のAI杜氏です。日本酒のこと、料理とのペアリング、醸造方法など何でもお聞きください。お客様に最適な日本酒をご提案いたします。';
    }
    
    // English responses
    if (lowerMessage.includes('recommend') || lowerMessage.includes('suggest')) {
        const randomProduct = sakeData[Math.floor(Math.random() * sakeData.length)];
        return `I recommend trying "${randomProduct.name.en}" from ${randomProduct.brewery.en}. It's a ${randomProduct.type.en} with ${randomProduct.tastingNotes.en}. Perfect for connoisseurs!`;
    }
    
    if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
        return 'Our premium sake collection ranges from ¥8,000 to ¥30,000. Each bottle represents exceptional craftsmanship and tradition. Would you like me to recommend something within a specific price range?';
    }
    
    if (lowerMessage.includes('daiginjo') || lowerMessage.includes('junmai')) {
        return 'Excellent choice! Daiginjo and Junmai are among the highest grades of sake. Daiginjo uses rice polished to at least 50%, while Junmai is made with only rice, water, yeast, and koji. Both offer exceptional purity and complexity.';
    }
    
    if (lowerMessage.includes('food') || lowerMessage.includes('pairing')) {
        return 'Sake pairs wonderfully with many foods! Junmai types complement rich dishes like grilled fish, while Daiginjo is perfect with delicate sashimi or light appetizers. Would you like specific pairing suggestions for any of our bottles?';
    }
    
    if (lowerMessage.includes('tour') || lowerMessage.includes('visit')) {
        return 'Our brewery tour is a 90-minute experience showcasing 300 years of sake-making tradition. Includes expert guidance from our master brewer and premium tasting of 5 varieties. Available in 10 languages for international guests!';
    }
    
    if (lowerMessage.includes('limited') || lowerMessage.includes('exclusive')) {
        const limitedProducts = sakeData.filter(p => p.limited);
        return `We have ${limitedProducts.length} limited edition bottles available! These include rare finds like "${limitedProducts[0]?.name.en}" and "${limitedProducts[1]?.name.en}". Limited editions often feature unique brewing techniques or seasonal ingredients.`;
    }
    
    return 'Thank you for your question! As your AI Sake Sommelier, I\'m here to help you discover the perfect sake. Feel free to ask about our collection, food pairings, brewing methods, or for personalized recommendations based on your preferences.';
}

function generateQR(productId) {
    const product = sakeData.find(p => p.id === productId);
    if (!product) return;

    // Simulate QR code generation
    alert(`QR Code generated for ${product.name.en}!\n\nThis QR code would contain:\n- Product details\n- Direct purchase link\n- Tasting notes\n- Brewery information\n\nScan to share or access on mobile devices.`);
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 24px;
        background: var(--color-accent);
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        z-index: 3000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }

    .cart-item {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 16px;
        border-bottom: 1px solid var(--color-gray-200);
    }

    .cart-item-image {
        font-size: 32px;
        width: 48px;
        text-align: center;
    }

    .cart-item-info {
        flex: 1;
    }

    .cart-item-info h4 {
        margin: 0 0 4px 0;
        font-size: 16px;
        color: var(--color-primary);
    }

    .cart-item-info p {
        margin: 0 0 8px 0;
        color: var(--color-accent);
        font-weight: 600;
    }

    .cart-item-controls {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .cart-item-controls button {
        background: var(--color-gray-200);
        border: none;
        width: 28px;
        height: 28px;
        border-radius: 4px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        transition: var(--transition-fast);
    }

    .cart-item-controls button:hover {
        background: var(--color-accent);
        color: white;
    }

    .cart-item-controls .remove-btn {
        background: #ef4444;
        color: white;
        margin-left: 8px;
    }

    .cart-item-controls .remove-btn:hover {
        background: #dc2626;
    }

    .modal-product {
        display: grid;
        grid-template-columns: 300px 1fr;
        gap: 40px;
    }

    .modal-product-image {
        font-size: 200px;
        text-align: center;
        background: linear-gradient(135deg, var(--color-gray-100) 0%, var(--color-gray-200) 100%);
        border-radius: var(--border-radius);
        display: flex;
        align-items: center;
        justify-content: center;
        height: 400px;
    }

    .modal-product-name {
        font-family: var(--font-heading);
        font-size: 32px;
        margin-bottom: 8px;
        color: var(--color-primary);
    }

    .modal-product-brewery {
        color: var(--color-gray-600);
        margin-bottom: 16px;
        font-size: 18px;
    }

    .modal-product-price {
        font-family: var(--font-heading);
        font-size: 36px;
        color: var(--color-accent);
        font-weight: 700;
        margin-bottom: 24px;
    }

    .modal-product-description {
        margin-bottom: 32px;
        line-height: 1.6;
        color: var(--color-gray-700);
    }

    .modal-product-details h4 {
        color: var(--color-primary);
        margin: 24px 0 12px 0;
        font-size: 18px;
    }

    .modal-specs {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
        margin: 24px 0;
        padding: 20px;
        background: var(--color-gray-50);
        border-radius: var(--border-radius);
    }

    .spec {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .spec-label {
        color: var(--color-gray-600);
        font-size: 14px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .spec-value {
        color: var(--color-primary);
        font-weight: 600;
    }

    .modal-actions {
        display: flex;
        gap: 16px;
        margin-top: 32px;
    }

    .modal-actions .btn-primary {
        flex: 1;
    }

    .no-products {
        grid-column: 1 / -1;
        text-align: center;
        padding: 80px 20px;
        color: var(--color-gray-600);
    }

    .no-products h3 {
        font-size: 24px;
        margin-bottom: 16px;
        color: var(--color-primary);
    }

    @media (max-width: 768px) {
        .modal-product {
            grid-template-columns: 1fr;
            gap: 24px;
        }

        .modal-product-image {
            height: 200px;
            font-size: 120px;
        }

        .modal-specs {
            grid-template-columns: 1fr;
        }

        .modal-actions {
            flex-direction: column;
        }
    }
`;

document.head.appendChild(notificationStyles);

// Media Player Functions
class MediaPlayerController {
    constructor() {
        this.currentAudio = null;
        this.isPlaying = false;
        this.audioData = this.initializeAudioData();
        this.videoData = this.initializeVideoData();
        this.init();
    }

    init() {
        this.setupAudioPlayer();
    }

    initializeAudioData() {
        return {
            'master-brewer-intro': {
                title: '杜氏からのご挨拶',
                duration: '2:30',
                description: '益々酒造の杜氏が、酒造りへの想いをお話しします。'
            },
            'brewing-philosophy': {
                title: '酒造りの哲学',
                duration: '3:45',
                description: '300年受け継がれてきた酒造りの哲学と、現代への継承について。'
            },
            'history-300years': {
                title: '300年の歴史物語',
                duration: '4:20',
                description: '1724年の創業から現在まで、益々酒造の歴史を辿ります。'
            },
            'sake-tasting-guide': {
                title: '日本酒テイスティングガイド',
                duration: '5:10',
                description: '日本酒の正しい味わい方と、テイスティングのポイント。'
            }
        };
    }

    initializeVideoData() {
        return {
            'brewery-tour': {
                title: '蔵内部ツアー',
                duration: '5:30',
                description: '益々酒造の蔵内部をご案内。醸造設備と職人の技をご覧ください。',
                // プレースホルダー動画URL（実際の実装では実際の動画ファイルを使用）
                url: 'data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDE='
            },
            'brewing-process': {
                title: '醸造工程詳細',
                duration: '8:15',
                description: '日本酒造りの全工程を詳細に解説。米洗いから瓶詰めまで。',
                url: 'data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDE='
            },
            'master-interview': {
                title: '杜氏インタビュー',
                duration: '6:45',
                description: '杜氏が語る、酒造りの極意と未来への展望。',
                url: 'data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDE='
            }
        };
    }

    setupAudioPlayer() {
        const audioPlayer = document.getElementById('audioPlayer');
        if (audioPlayer) {
            this.updateAudioDisplay();
        }
    }

    updateAudioDisplay(audioId = null) {
        const currentAudioInfo = document.getElementById('currentAudioInfo');
        const playPauseBtn = document.getElementById('playPauseBtn');
        
        if (audioId && this.audioData[audioId]) {
            const audioInfo = this.audioData[audioId];
            currentAudioInfo.innerHTML = `
                <div class="audio-title">${audioInfo.title}</div>
                <div class="audio-description">${audioInfo.description}</div>
            `;
            
            // Update duration display
            const totalTime = document.getElementById('totalTime');
            if (totalTime) {
                totalTime.textContent = audioInfo.duration;
            }
        } else {
            currentAudioInfo.innerHTML = `
                <div class="audio-title" data-translate="select_audio">音声ガイドを選択してください</div>
            `;
        }
    }

    playVideo(videoId) {
        const videoData = this.videoData[videoId];
        if (!videoData) {
            console.warn(`Video not found: ${videoId}`);
            return;
        }

        // Update modal content
        const videoModal = document.getElementById('videoModal');
        const videoModalTitle = document.getElementById('videoModalTitle');
        const videoPlayer = document.getElementById('videoPlayer');
        const videoDescription = document.getElementById('videoDescription');

        videoModalTitle.textContent = videoData.title;
        videoDescription.innerHTML = `<p>${videoData.description}</p>`;
        
        // For demo purposes, show a placeholder message
        videoPlayer.innerHTML = `
            <div style="
                width: 100%; 
                height: 300px; 
                background: linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 8px;
                color: #666;
                font-size: 16px;
                text-align: center;
                flex-direction: column;
                gap: 16px;
            ">
                <div style="font-size: 48px;">🎬</div>
                <div>
                    <div style="font-weight: bold; margin-bottom: 8px;">${videoData.title}</div>
                    <div style="font-size: 14px; opacity: 0.8;">動画プレーヤー（デモ版）</div>
                    <div style="font-size: 14px; opacity: 0.8;">${videoData.description}</div>
                </div>
            </div>
        `;

        // Show modal
        videoModal.style.display = 'flex';
        
        // Track video play event
        if (window.masumasuAnalytics) {
            window.masumasuAnalytics.trackEvent('video_play', {
                videoId: videoId,
                videoTitle: videoData.title
            });
        }
    }

    closeVideoModal() {
        const videoModal = document.getElementById('videoModal');
        const videoPlayer = document.getElementById('videoPlayer');
        
        videoModal.style.display = 'none';
        
        // Stop any playing video
        videoPlayer.innerHTML = `
            <source src="" type="video/mp4">
            <p data-translate="video_not_supported">お使いのブラウザは動画再生に対応していません。</p>
        `;
    }

    playAudio(audioId) {
        const audioData = this.audioData[audioId];
        if (!audioData) {
            console.warn(`Audio not found: ${audioId}`);
            return;
        }

        // Stop current audio if playing
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio = null;
        }

        // Update display
        this.updateAudioDisplay(audioId);
        
        // For demo purposes, simulate audio playback
        this.simulateAudioPlayback(audioData);
        
        // Update all audio items to show which is playing
        document.querySelectorAll('.audio-item').forEach(item => {
            item.classList.remove('playing');
        });
        
        const clickedItem = document.querySelector(`[onclick="playAudio('${audioId}')"]`);
        if (clickedItem) {
            clickedItem.classList.add('playing');
        }

        // Track audio play event
        if (window.masumasuAnalytics) {
            window.masumasuAnalytics.trackEvent('audio_play', {
                audioId: audioId,
                audioTitle: audioData.title
            });
        }
    }

    simulateAudioPlayback(audioData) {
        const playPauseBtn = document.getElementById('playPauseBtn');
        const progressBar = document.getElementById('progressBar');
        const currentTime = document.getElementById('currentTime');
        
        // Change button to pause
        playPauseBtn.textContent = '⏸️';
        this.isPlaying = true;
        
        // Simulate progress for demo
        let progress = 0;
        const duration = this.parseDuration(audioData.duration);
        
        const progressInterval = setInterval(() => {
            if (!this.isPlaying) {
                clearInterval(progressInterval);
                return;
            }
            
            progress += 1;
            const percentage = (progress / duration) * 100;
            
            if (progressBar) {
                progressBar.style.width = percentage + '%';
            }
            
            if (currentTime) {
                currentTime.textContent = this.formatTime(progress);
            }
            
            if (progress >= duration) {
                clearInterval(progressInterval);
                this.stopAudio();
            }
        }, 1000);
    }

    parseDuration(duration) {
        // Convert "2:30" to seconds
        const parts = duration.split(':');
        return parseInt(parts[0]) * 60 + parseInt(parts[1]);
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    toggleAudio() {
        const playPauseBtn = document.getElementById('playPauseBtn');
        
        if (this.isPlaying) {
            this.pauseAudio();
        } else {
            this.resumeAudio();
        }
    }

    pauseAudio() {
        this.isPlaying = false;
        const playPauseBtn = document.getElementById('playPauseBtn');
        if (playPauseBtn) {
            playPauseBtn.textContent = '▶️';
        }
    }

    resumeAudio() {
        this.isPlaying = true;
        const playPauseBtn = document.getElementById('playPauseBtn');
        if (playPauseBtn) {
            playPauseBtn.textContent = '⏸️';
        }
    }

    stopAudio() {
        this.isPlaying = false;
        this.currentAudio = null;
        
        const playPauseBtn = document.getElementById('playPauseBtn');
        const progressBar = document.getElementById('progressBar');
        const currentTime = document.getElementById('currentTime');
        
        if (playPauseBtn) playPauseBtn.textContent = '▶️';
        if (progressBar) progressBar.style.width = '0%';
        if (currentTime) currentTime.textContent = '0:00';
        
        // Remove playing class from all audio items
        document.querySelectorAll('.audio-item').forEach(item => {
            item.classList.remove('playing');
        });
        
        // Reset audio display
        this.updateAudioDisplay();
    }
}

// Initialize media player
let mediaPlayerController;

// Global functions for onclick handlers
function playVideo(videoId) {
    if (mediaPlayerController) {
        mediaPlayerController.playVideo(videoId);
    }
}

function closeVideoModal() {
    if (mediaPlayerController) {
        mediaPlayerController.closeVideoModal();
    }
}

function playAudio(audioId) {
    if (mediaPlayerController) {
        mediaPlayerController.playAudio(audioId);
    }
}

function toggleAudio() {
    if (mediaPlayerController) {
        mediaPlayerController.toggleAudio();
    }
}

// Initialize media player when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize after a short delay to ensure other components are ready
    setTimeout(() => {
        mediaPlayerController = new MediaPlayerController();
    }, 100);
});

// Console welcome message
console.log('%c🍶 益々酒造', 'color: #D4A574; font-size: 24px; font-weight: bold;');
console.log('%cVan Cleef & Arpels Inspired Design', 'color: #1A1A1A; font-size: 14px;');
console.log('Application initialized successfully! ✨');