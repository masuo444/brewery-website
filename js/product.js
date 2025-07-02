// Product page specific JavaScript
let currentProduct = null;
let currentLanguage = 'ja';
let cart = [];

document.addEventListener('DOMContentLoaded', function() {
    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id')) || 1;
    
    // Language switching
    const languageSelect = document.getElementById('languageSelect');
    currentLanguage = localStorage.getItem('selectedLanguage') || 'ja';
    languageSelect.value = currentLanguage;
    
    languageSelect.addEventListener('change', (e) => {
        currentLanguage = e.target.value;
        localStorage.setItem('selectedLanguage', currentLanguage);
        updateLanguage();
    });
    
    // Load product data
    loadProduct(productId);
    
    // Initialize cart
    loadCart();
    updateCartDisplay();
    
    // Setup event listeners
    setupEventListeners();
    
    // Setup tabs
    setupTabs();
    
    // Load related products
    loadRelatedProducts(productId);
});

function loadProduct(productId) {
    currentProduct = sakeData.find(p => p.id === productId);
    
    if (!currentProduct) {
        console.error('Product not found');
        return;
    }
    
    updateProductDisplay();
    updateLanguage();
}

function updateProductDisplay() {
    if (!currentProduct) return;
    
    // Update basic product info
    document.getElementById('productName').textContent = currentProduct.name[currentLanguage] || currentProduct.name.ja;
    document.getElementById('productTitle').textContent = currentProduct.name[currentLanguage] || currentProduct.name.ja;
    document.getElementById('productBrewery').textContent = currentProduct.brewery[currentLanguage] || currentProduct.brewery.ja;
    document.getElementById('productType').textContent = currentProduct.type[currentLanguage] || currentProduct.type.ja;
    document.getElementById('productPrice').textContent = currentProduct.price.toLocaleString();
    document.getElementById('productDescription').textContent = currentProduct.description[currentLanguage] || currentProduct.description.ja;
    
    // Update specifications
    document.getElementById('specAlcohol').textContent = currentProduct.alcohol + '%';
    document.getElementById('specRicePolish').textContent = currentProduct.ricePalish + '%';
    document.getElementById('specRiceType').textContent = currentProduct.riceType[currentLanguage] || currentProduct.riceType.ja;
    document.getElementById('specRegion').textContent = currentProduct.region[currentLanguage] || currentProduct.region.ja;
    
    // Update tasting notes
    document.getElementById('tastingNotes').textContent = currentProduct.tastingNotes[currentLanguage] || currentProduct.tastingNotes.ja;
    
    // Update awards
    document.getElementById('awardsInfo').textContent = currentProduct.awards[currentLanguage] || currentProduct.awards.ja;
    
    // Update stock status
    updateStockDisplay();
    
    // Show/hide limited badge
    const limitedBadge = document.getElementById('productLimited');
    if (currentProduct.limited) {
        limitedBadge.style.display = 'inline-block';
    } else {
        limitedBadge.style.display = 'none';
    }
    
    // Update page title
    document.title = `${currentProduct.name[currentLanguage] || currentProduct.name.ja} - 益々酒造`;
}

function updateStockDisplay() {
    const stockIndicator = document.getElementById('stockIndicator');
    const stockText = document.getElementById('stockText');
    
    if (currentProduct.inStock > 20) {
        stockIndicator.className = 'stock-indicator';
        stockText.textContent = `在庫あり (${currentProduct.inStock}本)`;
    } else if (currentProduct.inStock > 0) {
        stockIndicator.className = 'stock-indicator low';
        stockText.textContent = `残りわずか (${currentProduct.inStock}本)`;
    } else {
        stockIndicator.className = 'stock-indicator out';
        stockText.textContent = '在庫切れ';
        document.getElementById('addToCartBtn').disabled = true;
    }
}

function setupEventListeners() {
    // Quantity controls
    const qtyMinus = document.getElementById('qtyMinus');
    const qtyPlus = document.getElementById('qtyPlus');
    const quantityInput = document.getElementById('quantity');
    
    qtyMinus.addEventListener('click', () => {
        const current = parseInt(quantityInput.value);
        if (current > 1) {
            quantityInput.value = current - 1;
        }
    });
    
    qtyPlus.addEventListener('click', () => {
        const current = parseInt(quantityInput.value);
        const max = Math.min(10, currentProduct.inStock);
        if (current < max) {
            quantityInput.value = current + 1;
        }
    });
    
    quantityInput.addEventListener('change', () => {
        const value = parseInt(quantityInput.value);
        const max = Math.min(10, currentProduct.inStock);
        if (value < 1) quantityInput.value = 1;
        if (value > max) quantityInput.value = max;
    });
    
    // Add to cart
    const addToCartBtn = document.getElementById('addToCartBtn');
    addToCartBtn.addEventListener('click', addToCart);
    
    // Cart functionality
    const cartBtn = document.getElementById('cartBtn');
    const cartSidebar = document.getElementById('cartSidebar');
    const cartClose = document.getElementById('cartClose');
    
    cartBtn.addEventListener('click', () => {
        cartSidebar.classList.add('active');
    });
    
    cartClose.addEventListener('click', () => {
        cartSidebar.classList.remove('active');
    });
    
    // Thumbnail images
    document.querySelectorAll('.thumbnail').forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
            // Here you would update the main image based on the thumbnail
        });
    });
}

function setupTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.dataset.tab;
            
            // Remove active class from all tabs and panels
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding panel
            btn.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

function addToCart() {
    const quantity = parseInt(document.getElementById('quantity').value);
    
    if (!currentProduct || currentProduct.inStock === 0) {
        alert('この商品は現在在庫切れです。');
        return;
    }
    
    // Check if product already in cart
    const existingItem = cart.find(item => item.id === currentProduct.id);
    
    if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        if (newQuantity <= currentProduct.inStock) {
            existingItem.quantity = newQuantity;
        } else {
            alert('在庫数を超えています。');
            return;
        }
    } else {
        cart.push({
            id: currentProduct.id,
            quantity: quantity,
            product: currentProduct
        });
    }
    
    saveCart();
    updateCartDisplay();
    showNotification('カートに追加しました！');
}

function updateCartDisplay() {
    const cartCount = document.getElementById('cartCount');
    const cartContent = document.getElementById('cartContent');
    const cartTotal = document.getElementById('cartTotal');
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    
    cartCount.textContent = totalItems;
    cartTotal.textContent = totalPrice.toLocaleString();
    
    if (cart.length === 0) {
        cartContent.innerHTML = `
            <div class="cart-empty">
                <p>カートは空です</p>
                <div class="empty-cart-icon">🛒</div>
            </div>
        `;
    } else {
        cartContent.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">🍶</div>
                <div class="cart-item-info">
                    <h4>${item.product.name[currentLanguage] || item.product.name.ja}</h4>
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

function updateCartQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else if (quantity <= item.product.inStock) {
            item.quantity = quantity;
            saveCart();
            updateCartDisplay();
        } else {
            alert('在庫数を超えています。');
        }
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartDisplay();
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

function loadRelatedProducts(currentProductId) {
    const relatedGrid = document.getElementById('relatedGrid');
    const related = sakeData.filter(p => p.id !== currentProductId).slice(0, 3);
    
    relatedGrid.innerHTML = related.map(product => `
        <div class="product-card">
            <div class="product-image" onclick="window.location.href='product.html?id=${product.id}'">
                🍶
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name[currentLanguage] || product.name.ja}</h3>
                <p class="product-brewery">${product.brewery[currentLanguage] || product.brewery.ja}</p>
                <div class="product-price">¥${product.price.toLocaleString()}</div>
                <button class="btn-primary" onclick="window.location.href='product.html?id=${product.id}'">
                    詳細を見る
                </button>
            </div>
        </div>
    `).join('');
}

function updateLanguage() {
    const translations = {
        ja: {
            breadcrumbHome: 'ホーム',
            productDetail: '商品詳細',
            addToCart: 'カートに追加',
            inStock: '在庫あり',
            lowStock: '残りわずか',
            outOfStock: '在庫切れ',
            relatedProducts: '関連商品',
            viewDetails: '詳細を見る',
            tabs: {
                tasting: 'テイスティングノート',
                awards: '受賞歴',
                pairing: '料理との相性',
                brewing: '醸造について'
            }
        },
        en: {
            breadcrumbHome: 'Home',
            productDetail: 'Product Details',
            addToCart: 'Add to Cart',
            inStock: 'In Stock',
            lowStock: 'Low Stock',
            outOfStock: 'Out of Stock',
            relatedProducts: 'Related Products',
            viewDetails: 'View Details',
            tabs: {
                tasting: 'Tasting Notes',
                awards: 'Awards',
                pairing: 'Food Pairing',
                brewing: 'Brewing Info'
            }
        }
    };
    
    const trans = translations[currentLanguage] || translations.ja;
    
    // Update page content
    updateProductDisplay();
    
    // Update tab labels
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns[0].textContent = trans.tabs.tasting;
    tabBtns[1].textContent = trans.tabs.awards;
    tabBtns[2].textContent = trans.tabs.pairing;
    tabBtns[3].textContent = trans.tabs.brewing;
    
    // Update other elements
    const relatedTitle = document.querySelector('.related-products .section-title');
    if (relatedTitle) relatedTitle.textContent = trans.relatedProducts;
    
    const addToCartBtn = document.getElementById('addToCartBtn');
    if (addToCartBtn) addToCartBtn.querySelector('span').textContent = trans.addToCart;
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

// Make functions available globally for onclick handlers
window.updateCartQuantity = updateCartQuantity;
window.removeFromCart = removeFromCart;