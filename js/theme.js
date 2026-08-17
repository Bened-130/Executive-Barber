// Theme Toggle Module

const Theme = {
    toggle: null,
    currentTheme: 'dark',

    /**
     * Initialize theme
     */
    init() {
        this.toggle = document.getElementById('themeToggle');
        
        // Check for saved preference
        const saved = Storage.get('theme');
        if (saved) {
            this.currentTheme = saved;
        } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
            this.currentTheme = 'light';
        }

        this.apply();
        this.bindEvents();
    },

    /**
     * Apply current theme
     */
    apply() {
        document.body.setAttribute('data-theme', this.currentTheme);
        
        if (this.toggle) {
            const icon = this.toggle.querySelector('i');
            icon.className = this.currentTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
        }
    },

    /**
     * Toggle theme
     */
    toggle() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.apply();
        Storage.set('theme', this.currentTheme);
    },

    /**
     * Bind event listeners
     */
    bindEvents() {
        if (this.toggle) {
            this.toggle.addEventListener('click', () => this.toggle());
        }

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!Storage.get('theme')) { // Only if no manual preference saved
                this.currentTheme = e.matches ? 'dark' : 'light';
                this.apply();
            }
        });
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Theme;
}