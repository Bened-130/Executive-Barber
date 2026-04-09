// SPA Router

const Router = {
    currentRoute: 'home',
    routes: ['home', 'services', 'gallery', 'products', 'booking', 'contact'],

    /**
     * Initialize router
     */
    init() {
        // Handle initial load
        const hash = window.location.hash.substring(1) || 'home';
        this.navigate(hash);

        // Handle hash changes
        window.addEventListener('hashchange', (e) => {
            const newHash = window.location.hash.substring(1) || 'home';
            this.navigate(newHash);
        });

        // Handle browser back/forward
        window.addEventListener('popstate', () => {
            const hash = window.location.hash.substring(1) || 'home';
            this.navigate(hash, false);
        });

        // Intercept link clicks
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[data-nav]');
            if (link) {
                e.preventDefault();
                const hash = link.getAttribute('href').substring(1);
                this.navigate(hash);
                window.history.pushState({}, '', `#${hash}`);
            }
        });
    },

    /**
     * Navigate to route
     * @param {string} route - Route name
     * @param {boolean} updateHistory - Whether to update browser history
     */
    navigate(route, updateHistory = true) {
        if (!this.routes.includes(route)) {
            route = 'home';
        }

        this.currentRoute = route;

        // Update sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
            if (section.id === route) {
                section.classList.add('active');
                // Trigger section-specific init
                this.onRouteEnter(route);
            }
        });

        // Update nav
        Navbar.setActiveLink(route);

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Update document title
        this.updateTitle(route);
    },

    /**
     * Route-specific initialization
     * @param {string} route - Current route
     */
    onRouteEnter(route) {
        switch(route) {
            case 'home':
                this.animateStats();
                break;
            case 'gallery':
                // Refresh gallery layout
                if (typeof Gallery !== 'undefined') {
                    Gallery.setFilter('all');
                }
                break;
            case 'booking':
                // Load any draft
                if (typeof Booking !== 'undefined') {
                    Booking.loadDraft();
                }
                break;
        }
    },

    /**
     * Animate statistics counters
     */
    animateStats() {
        document.querySelectorAll('.stat-number[data-count]').forEach(stat => {
            const target = parseInt(stat.dataset.count);
            const duration = 2000;
            const start = performance.now();
            
            const animate = (currentTime) => {
                const elapsed = currentTime - start;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const current = Math.floor(easeOutQuart * target);
                
                stat.textContent = current + (target >= 100 ? '+' : '');
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };
            
            requestAnimationFrame(animate);
        });
    },

    /**
     * Update document title
     * @param {string} route - Current route
     */
    updateTitle(route) {
        const titles = {
            home: 'Executive Barber Shop | Premium Grooming',
            services: 'Our Services | Executive Barber Shop',
            gallery: 'Style Gallery | Executive Barber Shop',
            products: 'Premium Products | Executive Barber Shop',
            booking: 'Book Appointment | Executive Barber Shop',
            contact: 'Contact Us | Executive Barber Shop'
        };
        
        document.title = titles[route] || titles.home;
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Router;
}