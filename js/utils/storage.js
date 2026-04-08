// LocalStorage Utilities

const Storage = {
    prefix: 'executive_barber_',

    /**
     * Set item in localStorage with prefix
     * @param {string} key - Storage key
     * @param {*} value - Value to store (will be JSON stringified)
     */
    set(key, value) {
        try {
            const prefixedKey = this.prefix + key;
            localStorage.setItem(prefixedKey, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('Storage set error:', e);
            return false;
        }
    },

    /**
     * Get item from localStorage
     * @param {string} key - Storage key
     * @param {*} defaultValue - Default value if not found
     * @returns {*} Parsed value or default
     */
    get(key, defaultValue = null) {
        try {
            const prefixedKey = this.prefix + key;
            const item = localStorage.getItem(prefixedKey);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.error('Storage get error:', e);
            return defaultValue;
        }
    },

    /**
     * Remove item from localStorage
     * @param {string} key - Storage key
     */
    remove(key) {
        const prefixedKey = this.prefix + key;
        localStorage.removeItem(prefixedKey);
    },

    /**
     * Clear all app data from localStorage
     */
    clear() {
        Object.keys(localStorage)
            .filter(key => key.startsWith(this.prefix))
            .forEach(key => localStorage.removeItem(key));
    },

    /**
     * Save form draft
     * @param {string} formId - Form identifier
     * @param {Object} data - Form data
     */
    saveDraft(formId, data) {
        this.set(`draft_${formId}`, {
            data,
            timestamp: Date.now()
        });
    },

    /**
     * Get form draft
     * @param {string} formId - Form identifier
     * @param {number} maxAge - Maximum age in milliseconds (default 24 hours)
     * @returns {Object|null} Draft data or null if expired/not found
     */
    getDraft(formId, maxAge = 24 * 60 * 60 * 1000) {
        const draft = this.get(`draft_${formId}`);
        if (!draft) return null;
        
        const age = Date.now() - draft.timestamp;
        if (age > maxAge) {
            this.remove(`draft_${formId}`);
            return null;
        }
        
        return draft.data;
    },

    /**
     * Clear form draft
     * @param {string} formId - Form identifier
     */
    clearDraft(formId) {
        this.remove(`draft_${formId}`);
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Storage;
}