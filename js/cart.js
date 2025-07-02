// Shopping Cart Functionality for Masumasu Brewery
class ShoppingCart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('masumasuCart')) || [];
        this.init();
    }

    init() {
        this.updateCartDisplay();
        this.setupCartEventListeners();
    }

    setupCartEventListeners() {
        // Cart button click
        const cartBtn = document.getElementById('cartBtn');
        if (cartBtn) {
            cartBtn.addEventListener('click', () => this.showCart());
        }

        // Update cart display on page load
        this.updateCartDisplay();
    }

    addToCart(productId, quantity = 1, sizeIndex = 0) {
        const product = sakeData.find(p => p.id === productId);
        if (!product) return;

        const size = product.sizes[sizeIndex];
        const cartItem = {
            id: productId,
            name: product.name,
            type: product.type,
            image: product.image,
            size: size.size,
            price: size.price,
            quantity: quantity,
            sizeIndex: sizeIndex
        };

        // Check if item already exists in cart
        const existingItemIndex = this.items.findIndex(
            item => item.id === productId && item.sizeIndex === sizeIndex
        );

        if (existingItemIndex !== -1) {
            this.items[existingItemIndex].quantity += quantity;
        } else {
            this.items.push(cartItem);
        }

        this.saveCart();
        this.updateCartDisplay();
        this.showCartNotification();
    }

    removeFromCart(productId, sizeIndex) {
        this.items = this.items.filter(
            item => !(item.id === productId && item.sizeIndex === sizeIndex)
        );
        this.saveCart();
        this.updateCartDisplay();
    }

    updateQuantity(productId, sizeIndex, newQuantity) {
        const itemIndex = this.items.findIndex(
            item => item.id === productId && item.sizeIndex === sizeIndex
        );

        if (itemIndex !== -1) {
            if (newQuantity <= 0) {
                this.removeFromCart(productId, sizeIndex);
            } else {
                this.items[itemIndex].quantity = newQuantity;
                this.saveCart();
                this.updateCartDisplay();
            }
        }
    }

    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    getTotalPrice() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    saveCart() {
        localStorage.setItem('masumasuCart', JSON.stringify(this.items));
    }

    updateCartDisplay() {
        const cartCount = document.getElementById('cartCount');
        if (cartCount) {
            cartCount.textContent = this.getTotalItems();
        }

        // Update cart sidebar if it exists
        this.updateCartSidebar();
    }

    updateCartSidebar() {
        const cartContent = document.getElementById('cartContent');
        if (!cartContent) return;

        if (this.items.length === 0) {
            cartContent.innerHTML = `
                <div class="cart-empty">
                    <div class="empty-cart-icon">🛒</div>
                    <p>カートが空です</p>
                    <a href="#products" class="continue-shopping">商品を見る</a>
                </div>
            `;
        } else {
            const currentLanguage = localStorage.getItem('selectedLanguage') || 'ja';
            cartContent.innerHTML = this.items.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name[currentLanguage]}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h4>${item.name[currentLanguage]}</h4>
                        <p class="cart-item-type">${item.type[currentLanguage]}</p>
                        <p class="cart-item-size">${item.size}</p>
                        <div class="cart-item-controls">
                            <button class="qty-btn" onclick="cart.updateQuantity(${item.id}, ${item.sizeIndex}, ${item.quantity - 1})">-</button>
                            <span class="quantity">${item.quantity}</span>
                            <button class="qty-btn" onclick="cart.updateQuantity(${item.id}, ${item.sizeIndex}, ${item.quantity + 1})">+</button>
                        </div>
                    </div>
                    <div class="cart-item-price">
                        <span class="item-total">¥${(item.price * item.quantity).toLocaleString()}</span>
                        <button class="remove-item" onclick="cart.removeFromCart(${item.id}, ${item.sizeIndex})">削除</button>
                    </div>
                </div>
            `).join('');
        }

        // Update total
        const cartTotal = document.getElementById('cartTotal');
        if (cartTotal) {
            cartTotal.textContent = this.getTotalPrice().toLocaleString();
        }
    }

    showCart() {
        const cartSidebar = document.getElementById('cartSidebar');
        if (cartSidebar) {
            cartSidebar.classList.add('active');
        } else {
            // Create cart modal if sidebar doesn't exist
            this.createCartModal();
        }
    }

    hideCart() {
        const cartSidebar = document.getElementById('cartSidebar');
        if (cartSidebar) {
            cartSidebar.classList.remove('active');
        }
    }

    createCartModal() {
        const modalHTML = `
            <div id="cartModal" class="cart-modal">
                <div class="cart-modal-content">
                    <div class="cart-modal-header">
                        <h3>🛒 ショッピングカート</h3>
                        <button class="close-cart" onclick="cart.hideCartModal()">&times;</button>
                    </div>
                    <div id="cartModalContent" class="cart-modal-body">
                        ${this.getCartHTML()}
                    </div>
                    <div class="cart-modal-footer">
                        <div class="cart-total">
                            <strong>合計: ¥${this.getTotalPrice().toLocaleString()}</strong>
                        </div>
                        <button class="checkout-btn" onclick="cart.checkout()">注文手続きへ</button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Add modal styles
        const modalStyles = `
            <style>
                .cart-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 2000;
                }
                
                .cart-modal-content {
                    background: white;
                    border-radius: 20px;
                    width: 90%;
                    max-width: 600px;
                    max-height: 80vh;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                }
                
                .cart-modal-header {
                    padding: 20px;
                    border-bottom: 1px solid #e5e7eb;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background: var(--gradient-accent);
                    color: white;
                }
                
                .cart-modal-body {
                    flex: 1;
                    padding: 20px;
                    overflow-y: auto;
                }
                
                .cart-modal-footer {
                    padding: 20px;
                    border-top: 1px solid #e5e7eb;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .close-cart {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 2rem;
                    cursor: pointer;
                }
                
                .checkout-btn {
                    background: var(--color-accent);
                    color: white;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                }
                
                .cart-item {
                    display: flex;
                    gap: 16px;
                    padding: 16px 0;
                    border-bottom: 1px solid #e5e7eb;
                }
                
                .cart-item-image {
                    width: 80px;
                    height: 80px;
                    object-fit: cover;
                    border-radius: 8px;
                }
                
                .cart-item-details {
                    flex: 1;
                }
                
                .cart-item-controls {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    margin-top: 8px;
                }
                
                .qty-btn {
                    background: var(--color-accent);
                    color: white;
                    border: none;
                    width: 24px;
                    height: 24px;
                    border-radius: 4px;
                    cursor: pointer;
                }
                
                .cart-item-price {
                    text-align: right;
                }
                
                .remove-item {
                    background: #ef4444;
                    color: white;
                    border: none;
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-size: 0.8rem;
                    cursor: pointer;
                    margin-top: 8px;
                }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', modalStyles);
    }

    hideCartModal() {
        const cartModal = document.getElementById('cartModal');
        if (cartModal) {
            cartModal.remove();
        }
    }

    getCartHTML() {
        if (this.items.length === 0) {
            return `
                <div class="cart-empty">
                    <div class="empty-cart-icon">🛒</div>
                    <p>カートが空です</p>
                    <a href="#products" class="continue-shopping">商品を見る</a>
                </div>
            `;
        }

        const currentLanguage = localStorage.getItem('selectedLanguage') || 'ja';
        return this.items.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name[currentLanguage]}" class="cart-item-image">
                <div class="cart-item-details">
                    <h4>${item.name[currentLanguage]}</h4>
                    <p class="cart-item-type">${item.type[currentLanguage]}</p>
                    <p class="cart-item-size">${item.size}</p>
                    <div class="cart-item-controls">
                        <button class="qty-btn" onclick="cart.updateQuantity(${item.id}, ${item.sizeIndex}, ${item.quantity - 1})">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="qty-btn" onclick="cart.updateQuantity(${item.id}, ${item.sizeIndex}, ${item.quantity + 1})">+</button>
                    </div>
                </div>
                <div class="cart-item-price">
                    <span class="item-total">¥${(item.price * item.quantity).toLocaleString()}</span>
                    <button class="remove-item" onclick="cart.removeFromCart(${item.id}, ${item.sizeIndex})">削除</button>
                </div>
            </div>
        `).join('');
    }

    showCartNotification() {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">✓</span>
                <span class="notification-text">カートに追加しました</span>
            </div>
        `;

        // Add styles for notification
        const notificationStyles = `
            <style>
                .cart-notification {
                    position: fixed;
                    top: 100px;
                    right: 30px;
                    background: #22c55e;
                    color: white;
                    padding: 16px 20px;
                    border-radius: 12px;
                    box-shadow: 0 4px 20px rgba(34, 197, 94, 0.3);
                    z-index: 1500;
                    animation: slideInFromRight 0.3s ease-out;
                }
                
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                
                @keyframes slideInFromRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
            </style>
        `;

        if (!document.querySelector('style[data-cart-notification]')) {
            const styleElement = document.createElement('style');
            styleElement.setAttribute('data-cart-notification', 'true');
            styleElement.textContent = notificationStyles;
            document.head.appendChild(styleElement);
        }

        document.body.appendChild(notification);

        // Remove notification after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    }

    checkout() {
        if (this.items.length === 0) {
            alert('カートが空です');
            return;
        }

        // Create order summary
        const orderSummary = {
            items: this.items,
            total: this.getTotalPrice(),
            timestamp: new Date().toISOString()
        };

        // Save order to localStorage (in a real app, send to server)
        localStorage.setItem('lastOrder', JSON.stringify(orderSummary));

        // Clear cart
        this.items = [];
        this.saveCart();
        this.updateCartDisplay();
        this.hideCartModal();

        // Show success message
        alert(`ご注文ありがとうございます！\n合計金額: ¥${orderSummary.total.toLocaleString()}\n\n注文確認メールをお送りいたします。`);

        // In a real application, redirect to checkout page
        // window.location.href = '/checkout';
    }
}

// Global functions for easy access
function addToCart(productId, quantity = 1, sizeIndex = 0) {
    window.cart.addToCart(productId, quantity, sizeIndex);
}

function updateCartDisplay() {
    window.cart.updateCartDisplay();
}

// Initialize cart when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.cart = new ShoppingCart();
});