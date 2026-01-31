// Cart management
function getCart() {
    const cart = localStorage.getItem('atelierCart');
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem('atelierCart', JSON.stringify(cart));
}

function addToCartFromDetail(product, quantity) {
    const cart = getCart();
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ ...product, quantity });
    }
    
    saveCart(cart);
    updateCartCount();
}

function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountEl = document.getElementById('cartCount');
    if (cartCountEl) {
        cartCountEl.textContent = count;
    }
}

function updateCartQuantity(index, newQuantity) {
    const cart = getCart();
    if (cart[index]) {
        cart[index].quantity = newQuantity;
        saveCart(cart);
    }
}

function removeFromCart(index) {
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
}

function clearCart() {
    localStorage.removeItem('atelierCart');
    updateCartCount();
}

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
});