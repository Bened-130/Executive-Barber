// Main Application Entry Point

const App = {
    /**
     * Initialize application
     */
    init() {
        // Initialize utilities first
        this.initUtils();
        
        // Initialize components
        this.initComponents();
        
        // Initialize router last
        Router.init();

        // Register service worker for PWA
        this.registerSW();

        console.log('Executive Barber Shop App initialized');
    },

    /**
     * Initialize utility modules
     */
    initUtils() {
        // Storage is auto-initialized
        // DateUtils is static
        // FormValidation is static
        Toast.init();
    },

    /**
     * Initialize components
     */
    initComponents() {
        Particles.init();
        Navbar.init();
        Gallery.init();
        Products.init();
        Booking.init();
        Contact.init();
        Theme.init();
    },

    /**
     * Register Service Worker
     */
    registerSW() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('sw.js')
                .then(registration => {
                    console.log('SW registered:', registration);
                })
                .catch(error => {
                    console.log('SW registration failed:', error);
                });
        }
    }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => App.init());
} else {
    App.init();
}

// Expose for debugging
window.App = App;