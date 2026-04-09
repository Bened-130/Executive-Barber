// Navigation Component

const Navbar = {
    navbar: null,
    mobileMenuBtn: null,
    navLinks: null,
    themeToggle: null,

    /**
     * Initialize navbar
     */
    init() {
        this.navbar = document.getElementById('navbar');
        this.mobileMenuBtn = document.getElementById('mobileMenuBtn');
        this.navLinks = document.getElementById('navLinks');
        this.themeToggle = document.getElementById('themeToggle');

        this.bindEvents();
        this.handleScroll();
    },

    /**
     * Bind event listeners
     */
    bindEvents() {
        // Mobile menu toggle
        if (this.mobileMenuBtn) {
            this.mobileMenuBtn.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }

        // Close mobile menu on link click
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });

        // Scroll effects
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });

        // Close menu on outside click
        document.addEventListener('click', (e) => {
            if (!this.navbar.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
    },

    /**
     * Handle scroll effects
     */
    handleScroll() {
        if (window.scrollY > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    },

    /**
     * Toggle mobile menu
     */
    toggleMobileMenu() {
        this.navLinks.classList.toggle('active');
        const icon = this.mobileMenuBtn.querySelector('i');
        
        if (this.navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    },

    /**
     * Close mobile menu
     */
    closeMobileMenu() {
        this.navLinks.classList.remove('active');
        const icon = this.mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    },

    /**
     * Update active nav link
     * @param {string} sectionId - Current section ID
     */
    setActiveLink(sectionId) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Navbar;
}