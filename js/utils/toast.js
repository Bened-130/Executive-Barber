// Toast Notification System

const Toast = {
    container: null,
    defaultDuration: 4000,

    /**
     * Initialize toast container
     */
    init() {
        if (!this.container) {
            this.container = document.getElementById('toastContainer');
            if (!this.container) {
                this.container = document.createElement('div');
                this.container.id = 'toastContainer';
                this.container.className = 'toast-container';
                document.body.appendChild(this.container);
            }
        }
    },

    /**
     * Show toast notification
     * @param {string} message - Toast message
     * @param {string} type - Toast type: 'success', 'error', 'warning'
     * @param {number} duration - Duration in milliseconds
     */
    show(message, type = 'success', duration = this.defaultDuration) {
        this.init();

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            warning: 'fa-exclamation-triangle'
        };

        toast.innerHTML = `
            <i class="fas ${icons[type] || icons.success}"></i>
            <span class="toast-message">${message}</span>
            <button class="toast-close" aria-label="Close">
                <i class="fas fa-times"></i>
            </button>
        `;

        // Close button handler
        toast.querySelector('.toast-close').addEventListener('click', () => {
            this.hide(toast);
        });

        this.container.appendChild(toast);

        // Trigger animation
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        // Auto hide
        if (duration > 0) {
            setTimeout(() => {
                this.hide(toast);
            }, duration);
        }

        return toast;
    },

    /**
     * Hide toast
     * @param {HTMLElement} toast - Toast element
     */
    hide(toast) {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    },

    /**
     * Quick success toast
     * @param {string} message - Message to display
     */
    success(message) {
        return this.show(message, 'success');
    },

    /**
     * Quick error toast
     * @param {string} message - Message to display
     */
    error(message) {
        return this.show(message, 'error');
    },

    /**
     * Quick warning toast
     * @param {string} message - Message to display
     */
    warning(message) {
        return this.show(message, 'warning');
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Toast;
}