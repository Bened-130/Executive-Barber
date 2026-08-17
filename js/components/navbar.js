// Navigation Component

const Navbar = {
    navbar: null,
    mobileMenuBtn: null,
    navLinks: null,
    navLinksContainer: null,
    themeToggle: null,
    isMenuOpen: false,

    /**
     * Initialize navbar
     */
    init() {
        this.navbar = document.getElementById('navbar');
        this.mobileMenuBtn = document.getElementById('mobileMenuBtn');
        this.navLinksContainer = document.getElementById('navLinks');
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
            this.mobileMenuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleMobileMenu();
            });
        }

        // Handle ALL navigation clicks (both desktop and mobile)
        document.querySelectorAll('a[data-nav]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const hash = link.getAttribute('href');
                const route = hash.substring(1);
                
                // Navigate using router
                if (typeof Router !== 'undefined') {
                    Router.navigate(route);
                    window.history.pushState({}, '', hash);
                }
                
                // Always close mobile menu after navigation
                this.closeMobileMenu();
            });
        });

        // Scroll effects
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isMenuOpen && !this.navbar.contains(e.target)) {
                this.closeMobileMenu();
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.closeMobileMenu();
            }
        });

        // Handle window resize - close mobile menu on large screens
        window.addEventListener('resize', () => {
            if (window.innerWidth > 968 && this.isMenuOpen) {
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
        if (this.isMenuOpen) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    },

    /**
     * Open mobile menu
     */
    openMobileMenu() {
        this.isMenuOpen = true;
        this.navLinksContainer.classList.add('active');
        
        const icon = this.mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = 'hidden';
        
        // Add animation class
        this.navLinksContainer.style.animation = 'slideDown 0.3s ease';
    },

    /**
     * Close mobile menu
     */
    closeMobileMenu() {
        this.isMenuOpen = false;
        this.navLinksContainer.classList.remove('active');
        
        const icon = this.mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        
        // Restore body scroll
        document.body.style.overflow = '';
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

// Add slide down animation
const navStyle = document.createElement('style');
navStyle.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @media (max-width: 968px) {
        .nav-links {
            position: fixed;
            top: 70px;
            left: 0;
            width: 100%;
            background: rgba(10, 10, 10, 0.98);
            flex-direction: column;
            padding: 2rem;
            gap: 0;
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            max-height: calc(100vh - 70px);
            overflow-y: auto;
            z-index: 999;
        }
        
        [data-theme="light"] .nav-links {
            background: rgba(255, 255, 255, 0.98);
        }
        
        .nav-links.active {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }
        
        .nav-links li {
            width: 100%;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        [data-theme="light"] .nav-links li {
            border-bottom-color: rgba(0, 0, 0, 0.1);
        }
        
        .nav-links li:last-child {
            border-bottom: none;
        }
        
        .nav-links a {
            display: block;
            padding: 1.2rem 0;
            font-size: 1.1rem;
        }
        
        .mobile-menu-btn {
            display: flex !important;
            align-items: center;
            justify-content: center;
            width: 45px;
            height: 45px;
            border-radius: 50%;
            background: var(--glass-bg);
            border: 1px solid var(--glass-border);
        }
        
        .desktop-only {
            display: none !important;
        }
    }
    
    @media (min-width: 969px) {
        .mobile-menu-btn {
            display: none !important;
        }
    }
`;
document.head.appendChild(navStyle);

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Navbar;
}