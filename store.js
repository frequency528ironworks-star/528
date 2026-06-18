// Shopping Cart Management
class ShoppingCart {
    constructor() {
        this.items = this.loadCart();
        this.init();
    }

    init() {
        document.querySelectorAll('.add-to-cart').forEach(btn => {
            btn.addEventListener('click', (e) => this.addToCart(e));
        });

        document.getElementById('checkoutBtn').addEventListener('click', () => this.checkout());
        document.getElementById('newsletterForm').addEventListener('submit', (e) => this.subscribeNewsletter(e));

        this.updateCart();
    }

    addToCart(e) {
        const card = e.target.closest('.product-card');
        const product = {
            name: card.querySelector('h3').textContent,
            price: parseFloat(card.querySelector('.price').textContent.replace('$', '')),
            category: card.dataset.category,
            id: Math.random().toString(36).substr(2, 9)
        };

        this.items.push(product);
        this.saveCart();
        this.updateCart();

        // Show feedback
        e.target.textContent = '✓ Added!';
        e.target.disabled = true;
        setTimeout(() => {
            e.target.textContent = 'Add to Cart';
            e.target.disabled = false;
        }, 1500);
    }

    removeFromCart(index) {
        this.items.splice(index, 1);
        this.saveCart();
        this.updateCart();
    }

    updateCart() {
        const cartItemsDiv = document.getElementById('cartItems');
        
        if (this.items.length === 0) {
            cartItemsDiv.innerHTML = '<p class="empty-cart">Your cart is empty. Add items to get started!</p>';
            this.updateSummary(0);
            return;
        }

        let html = '';
        this.items.forEach((item, index) => {
            html += `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>${item.category === 'ebook' ? 'eBook' : 'Digital Art'}</p>
                    </div>
                    <div style="display: flex; align-items: center;">
                        <span class="cart-item-price">$${item.price.toFixed(2)}</span>
                        <button class="remove-btn" onclick="cart.removeFromCart(${index})">Remove</button>
                    </div>
                </div>
            `;
        });

        cartItemsDiv.innerHTML = html;
        this.updateSummary(this.getTotal());
    }

    updateSummary(subtotal) {
        const tax = subtotal * 0.08; // 8% tax
        const total = subtotal + tax;

        document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
        document.getElementById('total').textContent = `$${total.toFixed(2)}`;
    }

    getTotal() {
        return this.items.reduce((sum, item) => sum + item.price, 0);
    }

    saveCart() {
        localStorage.setItem('frequencyCart', JSON.stringify(this.items));
    }

    loadCart() {
        const saved = localStorage.getItem('frequencyCart');
        return saved ? JSON.parse(saved) : [];
    }

    checkout() {
        if (this.items.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        const total = this.getTotal();
        alert(`Proceeding to checkout with total: $${total.toFixed(2)}\n\nNote: Stripe integration would be set up here.\nIntegration Code:\n- Use Stripe.js for secure payment processing\n- Redirect to checkout.html with cart data`);
        
        // In production, this would redirect to a Stripe checkout page
        // window.location.href = '/checkout.html';
    }

    subscribeNewsletter(e) {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        alert(`Thank you for subscribing with ${email}!\n\nYou'll receive exclusive offers on new digital products.`);
        e.target.reset();
    }
}

// Product Filtering
function filterProducts(category) {
    const products = document.querySelectorAll('.product-card');
    const buttons = document.querySelectorAll('.tab-btn');

    // Update active button
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // Filter products
    products.forEach(product => {
        if (category === 'all' || product.dataset.category === category) {
            product.style.display = 'block';
            // Trigger animation
            setTimeout(() => {
                product.style.opacity = '1';
            }, 10);
        } else {
            product.style.display = 'none';
        }
    });
}

// Initialize cart when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.cart = new ShoppingCart();
});
