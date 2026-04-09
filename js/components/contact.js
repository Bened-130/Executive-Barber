// Contact Component

const Contact = {
    form: null,
    infoCards: null,

    /**
     * Initialize contact section
     */
    init() {
        this.form = document.getElementById('contactForm');
        this.infoCards = document.getElementById('infoCards');

        this.renderInfoCards();
        this.bindEvents();
    },

    /**
     * Render contact info cards
     */
    renderInfoCards() {
        if (!this.infoCards) return;

        const infoData = [
            {
                icon: 'fa-map-marker-alt',
                title: 'Location',
                content: 'Executive Plaza, 2nd Floor<br>Kenyatta Avenue, Nakuru<br>Kenya'
            },
            {
                icon: 'fa-clock',
                title: 'Opening Hours',
                content: 'Monday - Friday: 8:00 AM - 8:00 PM<br>Saturday: 9:00 AM - 6:00 PM<br>Sunday: 10:00 AM - 4:00 PM'
            },
            {
                icon: 'fa-phone',
                title: 'Contact',
                content: 'Phone: +254 712 345 678<br>Email: info@executivebarber.co.ke'
            }
        ];

        this.infoCards.innerHTML = infoData.map(info => `
            <div class="glass-card info-card">
                <div class="info-icon">
                    <i class="fas ${info.icon}"></i>
                </div>
                <div class="info-content">
                    <h4>${info.title}</h4>
                    <p>${info.content}</p>
                </div>
            </div>
        `).join('');
    },

    /**
     * Bind event listeners
     */
    bindEvents() {
        if (!this.form) return;

        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    },

    /**
     * Handle contact form submission
     * @param {Event} e - Submit event
     */
    async handleSubmit(e) {
        e.preventDefault();

        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        // Validation
        const rules = {
            name: { required: true, message: 'Please enter your name' },
            email: { 
                required: true, 
                validator: FormValidation.isValidEmail,
                message: 'Please enter a valid email'
            },
            message: { required: true, min: 10, message: 'Please enter a message (min 10 chars)' }
        };

        const validation = FormValidation.validateForm(this.form, rules);
        if (!validation.isValid) return;

        // Loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Success
            Toast.success('Message sent successfully! We will get back to you soon.');
            this.form.reset();

            // Clear any stored inquiry
            Storage.remove('inquiry_product');

        } catch (error) {
            Toast.error('Failed to send message. Please try again.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Contact;
}