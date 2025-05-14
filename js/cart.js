// cart.js - Shopping Cart Functionality

// Initialize cart from localStorage or empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Add item to cart
function addToCart(productId, quantity = 1) {
    // Find the product in our products array
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        console.error('Product not found');
        return false;
    }

    // Check if item already exists in cart
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        // Update quantity if item exists
        existingItem.quantity += quantity;
    } else {
        // Add new item to cart
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }

    // Save to localStorage
    saveCart();
    
    // Update cart count in UI
    updateCartCount();
    
    return true;
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
}

// Update item quantity in cart
function updateCartItem(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        item.quantity = newQuantity;
        saveCart();
    }
}

// Clear the entire cart
function clearCart() {
    cart = [];
    saveCart();
    updateCartCount();
}

// Get cart item count
function getCartCount() {
    return cart.reduce((total, item) => total + item.quantity, 0);
}

// Get cart total price
function getCartTotal() {
    return cart.reduce((total, item) => {
        const product = products.find(p => p.id === item.id);
        return total + (product ? product.price * item.quantity : 0);
    }, 0);
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Update cart count in the UI
function updateCartCount() {
    const countElements = document.querySelectorAll('.cart-count');
    const count = getCartCount();
    
    countElements.forEach(element => {
        element.textContent = count;
    });
}

// Display cart items in the cart page
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    
    if (!cartItemsContainer) return;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h2>Your cart is empty</h2>
                <p>Looks like you haven't added anything to your cart yet</p>
                <a href="products.html" class="btn">Browse Products</a>
            </div>
        `;
        document.querySelector('.cart-summary').style.display = 'none';
        return;
    }
    
    cartItemsContainer.innerHTML = '';
    
    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (product) {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.setAttribute('data-id', item.id);
            cartItem.innerHTML = `
                <div class="cart-item-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="cart-item-details">
                    <h3 class="cart-item-title">${product.name}</h3>
                    <div class="cart-item-price">$${product.price.toFixed(2)}</div>
                    <div class="cart-item-rating">
                        ${getRatingStars(product.rating)}
                    </div>
                </div>
                <div class="cart-item-actions">
                    <div class="quantity-selector">
                        <button class="quantity-btn minus"><i class="fas fa-minus"></i></button>
                        <input type="number" value="${item.quantity}" min="1" class="quantity-input">
                        <button class="quantity-btn plus"><i class="fas fa-plus"></i></button>
                    </div>
                    <button class="remove-item">Remove</button>
                </div>
                <div class="cart-item-total">
                    $${(product.price * item.quantity).toFixed(2)}
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        }
    });
}

// Update cart summary (subtotal, shipping, total)
function updateCartSummary() {
    const subtotalElement = document.getElementById('subtotal');
    const shippingElement = document.getElementById('shipping');
    const totalElement = document.getElementById('total');
    
    if (!subtotalElement || !shippingElement || !totalElement) return;
    
    const subtotal = getCartTotal();
    const shipping = subtotal > 0 ? (subtotal > 50 ? 0 : 5.99) : 0;
    const total = subtotal + shipping;
    
    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    shippingElement.textContent = shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`;
    totalElement.textContent = `$${total.toFixed(2)}`;
}

// Helper function to generate rating stars (same as in main.js)
function getRatingStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    
    let stars = '';
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    if (halfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    return stars;
}

// Initialize cart functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Update cart count on page load
    updateCartCount();
    
    // If we're on the cart page, display items and summary
    if (document.getElementById('cart-items')) {
        displayCartItems();
        updateCartSummary();
        
        // Add event listeners for quantity changes and remove buttons
        document.getElementById('cart-items').addEventListener('click', function(e) {
            if (e.target.classList.contains('quantity-btn')) {
                const itemId = parseInt(e.target.closest('.cart-item').getAttribute('data-id'));
                const input = e.target.closest('.quantity-selector').querySelector('.quantity-input');
                let quantity = parseInt(input.value);
                
                if (e.target.classList.contains('minus') && quantity > 1) {
                    quantity--;
                    input.value = quantity;
                    updateCartItem(itemId, quantity);
                } else if (e.target.classList.contains('plus')) {
                    quantity++;
                    input.value = quantity;
                    updateCartItem(itemId, quantity);
                }
                
                // Update the cart summary after quantity change
                updateCartSummary();
            }
            
            if (e.target.classList.contains('remove-item')) {
                const itemId = parseInt(e.target.closest('.cart-item').getAttribute('data-id'));
                removeFromCart(itemId);
                displayCartItems();
                updateCartSummary();
            }
        });
    }
});

// Make functions available to other scripts
window.cartFunctions = {
    addToCart,
    removeFromCart,
    updateCartItem,
    clearCart,
    getCartCount,
    getCartTotal,
    displayCartItems,
    updateCartSummary
};