// Products Component

const Products = {
    grid: null,

    /**
     * Initialize products
     */
    init() {
        this.grid = document.getElementById('productsGrid');
        if (!this.grid) return;

        this.render();
        this.bindEvents();
    },

    /**
     * Render product cards
     */
    render() {
        if (!this.grid || typeof productsData === 'undefined') return;

        this.grid.innerHTML = productsData.map(product => `
            <div class="glass-card product-card">
                <div class="product-image">
                    <img src="${product.image}" 
                         alt="${product.name}" 
                         loading="lazy">
                </div>
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-price">$${product.price}</div>
                <button class="btn btn-outline add-inquiry" 
                        data-product="${product.name}"
                        data-id="${product.id}">
                    <i class="fas fa-envelope"></i> Add to Inquiry
                </button>
            </div>
        `).join('');
    },

    /**
     * Bind event listeners
     */
    bindEvents() {
        this.grid.querySelectorAll('.add-inquiry').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productName = e.currentTarget.dataset.product;
                this.inquire(productName);
            });
        });
    },

    /**
     * Navigate to contact with product inquiry
     * @param {string} productName - Product to inquire about
     */
    inquire(productName) {
        // Save to storage
        Storage.set('inquiry_product', productName);

        // Navigate to contact
        window.location.hash = 'contact';
        
        // Wait for section to be visible then populate form
        setTimeout(() => {
            const messageField = document.querySelector('#contactForm textarea[name="message"]');
            if (messageField) {
                messageField.value = `I am interested in purchasing: ${productName}\n\nPlease provide more information about availability and delivery options.`;
                messageField.focus();
                
                // Scroll to form
                messageField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 100);
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Products;
}