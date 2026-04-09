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
        this.navigate(hash, false);

        // Handle hash changes (back/forward buttons)
        window.addEventListener('hashchange', (e) => {
            const newHash = window.location.hash.substring(1) || 'home';
            // Only navigate if it's a different route
            if (newHash !== this.currentRoute) {
                this.navigate(newHash, false);
            }
        });

        // Handle browser back/forward
        window.addEventListener('popstate', () => {
            const hash = window.location.hash.substring(1) || 'home';
            this.navigate(hash, false);
        });
    },

    /**
     * Navigate to route
     * @param {string} route - Route name
     * @param {boolean} pushState - Whether to update browser history
     */
    navigate(route, pushState = true) {
        // Validate route
        if (!this.routes.includes(route)) {
            route = 'home';
        }

        // Don't re-navigate to same route
        if (route === this.currentRoute && document.querySelector('.section.active')) {
            return;
        }

        this.currentRoute = route;

        // Update sections visibility
        this.updateSections(route);

        // Update nav active state
        if (typeof Navbar !== 'undefined') {
            Navbar.setActiveLink(route);
        }

        // Update URL if needed
        if (pushState) {
            window.history.pushState({ route }, '', `#${route}`);
        }

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Update document title
        this.updateTitle(route);

        // Trigger route-specific initialization
        this.onRouteEnter(route);
    },

    /**
     * Update section visibility
     * @param {string} route - Current route
     */
    updateSections(route) {
        const sections = document.querySelectorAll('.section');
        
        sections.forEach(section => {
            if (section.id === route) {
                section.classList.add('active');
                section.style.display = 'block';
                // Small delay for fade-in animation
                setTimeout(() => {
                    section.style.opacity = '1';
                }, 10);
            } else {
                section.classList.remove('active');
                section.style.opacity = '0';
                setTimeout(() => {
                    if (!section.classList.contains('active')) {
                        section.style.display = 'none';
                    }
                }, 300);
            }
        });
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
                // Ensure gallery is properly rendered
                if (typeof Gallery !== 'undefined') {
                    setTimeout(() => Gallery.setFilter('all'), 100);
                }
                break;
            case 'booking':
                // Load any draft
                if (typeof Booking !== 'undefined') {
                    setTimeout(() => Booking.loadDraft(), 100);
                }
                break;
            case 'contact':
                // Check for product inquiry
                const inquiry = Storage.get('inquiry_product');
                if (inquiry) {
                    setTimeout(() => {
                        const messageField = document.querySelector('#contactForm textarea[name="message"]');
                        if (messageField && !messageField.value) {
                            messageField.value = `I am interested in purchasing: ${inquiry}\n\nPlease provide more information about availability and delivery options.`;
                        }
                    }, 100);
                }
                break;
        }
    },

    /**
     * Animate statistics counters
     */
    animateStats() {
        document.querySelectorAll('.stat-number[data-count]').forEach(stat => {
            // Reset first
            stat.textContent = '0';
            
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