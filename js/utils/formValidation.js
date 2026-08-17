// Form Validation Utilities

const FormValidation = {
    /**
     * Validate email format
     * @param {string} email - Email to validate
     * @returns {boolean} True if valid
     */
    isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    },

    /**
     * Validate phone number (basic international format)
     * @param {string} phone - Phone number
     * @returns {boolean} True if valid
     */
    isValidPhone(phone) {
        const cleaned = phone.replace(/\s/g, '').replace(/[-]/g, '');
        // Allow + followed by 10-15 digits, or 10-15 digits
        const regex = /^\+?\d{10,15}$/;
        return regex.test(cleaned);
    },

    /**
     * Validate required field
     * @param {string} value - Field value
     * @returns {boolean} True if not empty
     */
    isRequired(value) {
        return value !== null && value !== undefined && value.trim() !== '';
    },

    /**
     * Validate minimum length
     * @param {string} value - Field value
     * @param {number} min - Minimum length
     * @returns {boolean} True if meets minimum
     */
    minLength(value, min) {
        return value.length >= min;
    },

    /**
     * Validate form field and show error
     * @param {HTMLElement} field - Input element
     * @param {Function} validator - Validation function
     * @param {string} errorMsg - Error message
     * @returns {boolean} True if valid
     */
    validateField(field, validator, errorMsg) {
        const isValid = validator(field.value);
        
        // Remove existing error
        this.clearFieldError(field);
        
        if (!isValid) {
            this.showFieldError(field, errorMsg);
        }
        
        return isValid;
    },

    /**
     * Show field error
     * @param {HTMLElement} field - Input element
     * @param {string} message - Error message
     */
    showFieldError(field, message) {
        field.classList.add('error');
        
        const errorEl = document.createElement('span');
        errorEl.className = 'field-error';
        errorEl.textContent = message;
        
        const parent = field.closest('.form-group') || field.parentElement;
        parent.appendChild(errorEl);
    },

    /**
     * Clear field error
     * @param {HTMLElement} field - Input element
     */
    clearFieldError(field) {
        field.classList.remove('error');
        const parent = field.closest('.form-group') || field.parentElement;
        const errorEl = parent.querySelector('.field-error');
        if (errorEl) {
            errorEl.remove();
        }
    },

    /**
     * Clear all errors in form
     * @param {HTMLFormElement} form - Form element
     */
    clearAllErrors(form) {
        form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
        form.querySelectorAll('.field-error').forEach(el => el.remove());
    },

    /**
     * Sanitize input value
     * @param {string} value - Input value
     * @returns {string} Sanitized value
     */
    sanitize(value) {
        const div = document.createElement('div');
        div.textContent = value;
        return div.innerHTML;
    },

    /**
     * Validate entire form
     * @param {HTMLFormElement} form - Form element
     * @param {Object} rules - Validation rules { fieldName: { required: true, validator: fn, message: '' } }
     * @returns {Object} { isValid: boolean, errors: [] }
     */
    validateForm(form, rules) {
        const errors = [];
        let isValid = true;

        this.clearAllErrors(form);

        Object.entries(rules).forEach(([fieldName, rule]) => {
            const field = form.elements[fieldName];
            if (!field) return;

            const value = field.value.trim();

            if (rule.required && !this.isRequired(value)) {
                isValid = false;
                errors.push({ field, message: rule.message || `${fieldName} is required` });
                this.showFieldError(field, rule.message || 'This field is required');
            } else if (rule.validator && value && !rule.validator(value)) {
                isValid = false;
                errors.push({ field, message: rule.message });
                this.showFieldError(field, rule.message);
            }
        });

        return { isValid, errors };
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = FormValidation;
}