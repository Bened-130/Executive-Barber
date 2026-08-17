const Booking = {
    form: null,
    currentStep: 1,
    totalSteps: 3,
    stepIndicator: null,
    serviceSelect: null,
    dateInput: null,

    /**
     * Initialize booking form
     */
    init() {
        this.form = document.getElementById('bookingForm');
        if (!this.form) return;

        this.stepIndicator = document.getElementById('stepIndicator');
        this.serviceSelect = document.getElementById('service');
        this.dateInput = document.getElementById('date');

        this.populateServices();
        this.bindEvents();
        this.initDateRestrictions();
        this.loadDraft();
    },

    /**
     * Populate service dropdown
     */
    populateServices() {
        if (!this.serviceSelect || typeof servicesData === 'undefined') return;

        const options = servicesData.map(service => `
            <option value="${service.id}" 
                    data-advance="${service.requiresAdvance}"
                    data-days="${service.advanceDays || 0}">
                ${service.title} - $${service.price} (${service.duration})
            </option>
        `).join('');

        this.serviceSelect.innerHTML = `
            <option value="">Select a service...</option>
            ${options}
        `;
    },

    /**
     * Bind event listeners
     */
    bindEvents() {
        // Step navigation
        this.form.querySelectorAll('.next-step').forEach(btn => {
            btn.addEventListener('click', () => this.nextStep());
        });

        this.form.querySelectorAll('.prev-step').forEach(btn => {
            btn.addEventListener('click', () => this.prevStep());
        });

        // Service change - update date restrictions
        if (this.serviceSelect) {
            this.serviceSelect.addEventListener('change', () => {
                this.handleServiceChange();
                this.saveDraft();
            });
        }

        // Save draft on input change
        this.form.querySelectorAll('input, select, textarea').forEach(field => {
            field.addEventListener('change', () => this.saveDraft());
        });

        // Form submission
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    },

    /**
     * Initialize date input with min date
     */
    initDateRestrictions() {
        if (!this.dateInput) return;
        
        // Default: tomorrow
        this.dateInput.min = DateUtils.getTomorrow();
    },

    /**
     * Handle service selection change
     */
    handleServiceChange() {
        const selected = this.serviceSelect.options[this.serviceSelect.selectedIndex];
        const requiresAdvance = selected.dataset.advance === 'true';
        const advanceDays = parseInt(selected.dataset.days) || 1;
        const noticeEl = document.getElementById('advanceNotice');
        const helpEl = document.getElementById('dateHelp');

        if (requiresAdvance) {
            // Set minimum date to required advance days
            const minDate = DateUtils.getFutureDate(advanceDays);
            this.dateInput.min = minDate;
            
            if (noticeEl) noticeEl.style.display = 'flex';
            if (helpEl) {
                helpEl.textContent = `Please select a date at least ${advanceDays} days in advance`;
                helpEl.style.display = 'block';
            }
        } else {
            // Reset to tomorrow
            this.dateInput.min = DateUtils.getTomorrow();
            
            if (noticeEl) noticeEl.style.display = 'none';
            if (helpEl) helpEl.style.display = 'none';
        }

        // Clear current date if invalid
        if (this.dateInput.value) {
            const selectedDate = this.dateInput.value;
            const minDate = this.dateInput.min;
            
            if (selectedDate < minDate) {
                this.dateInput.value = '';
            }
        }
    },

    /**
     * Validate current step
     * @returns {boolean} True if valid
     */
    validateStep() {
        const stepEl = this.form.querySelector(`.form-step[data-step="${this.currentStep}"]`);
        const requiredFields = stepEl.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            FormValidation.clearFieldError(field);
            
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
                FormValidation.showFieldError(field, 'This field is required');
            } else if (field.type === 'email' && !FormValidation.isValidEmail(field.value)) {
                isValid = false;
                FormValidation.showFieldError(field, 'Please enter a valid email');
            } else if (field.type === 'tel' && !FormValidation.isValidPhone(field.value)) {
                isValid = false;
                FormValidation.showFieldError(field, 'Please enter a valid phone number');
            }
        });

        // Special validation for date on step 3
        if (this.currentStep === 3 && this.dateInput.value) {
            const selected = this.serviceSelect.options[this.serviceSelect.selectedIndex];
            const requiresAdvance = selected.dataset.advance === 'true';
            const advanceDays = parseInt(selected.dataset.days) || 1;

            if (requiresAdvance && !DateUtils.isMinDaysAhead(this.dateInput.value, advanceDays)) {
                isValid = false;
                FormValidation.showFieldError(this.dateInput, 
                    `This service requires booking ${advanceDays} days in advance`);
            }
        }

        return isValid;
    },

    /**
     * Go to next step
     */
    nextStep() {
        if (!this.validateStep()) {
            // Shake animation for error feedback
            const stepEl = this.form.querySelector(`.form-step[data-step="${this.currentStep}"]`);
            stepEl.style.animation = 'shake 0.5s';
            setTimeout(() => {
                stepEl.style.animation = '';
            }, 500);
            return;
        }

        if (this.currentStep < this.totalSteps) {
            this.currentStep++;
            this.updateStep();
        }

        // Update summary on last step
        if (this.currentStep === 3) {
            this.updateSummary();
        }
    },

    /**
     * Go to previous step
     */
    prevStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.updateStep();
        }
    },

    /**
     * Update step visibility and indicators
     */
    updateStep() {
        // Update form steps
        this.form.querySelectorAll('.form-step').forEach((step, index) => {
            step.classList.toggle('active', index + 1 === this.currentStep);
        });

        // Update step dots
        this.stepIndicator.querySelectorAll('.step-dot').forEach((dot, index) => {
            const stepNum = index + 1;
            dot.classList.remove('active', 'completed');
            
            if (stepNum === this.currentStep) {
                dot.classList.add('active');
            } else if (stepNum < this.currentStep) {
                dot.classList.add('completed');
            }
        });
    },

    /**
     * Update booking summary on final step
     */
    updateSummary() {
        const summaryEl = document.getElementById('bookingSummary');
        if (!summaryEl) return;

        const formData = new FormData(this.form);
        const service = servicesData.find(s => s.id === formData.get('service'));
        
        const date = formData.get('date');
        const time = formData.get('time');

        summaryEl.innerHTML = `
            <h4>Booking Summary</h4>
            <div class="summary-item">
                <span>Service:</span>
                <span>${service ? service.title : '-'}</span>
            </div>
            <div class="summary-item">
                <span>Date:</span>
                <span>${date ? DateUtils.formatDisplay(date) : '-'}</span>
            </div>
            <div class="summary-item">
                <span>Time:</span>
                <span>${time || '-'}</span>
            </div>
            <div class="summary-item">
                <span>Price:</span>
                <span style="color: var(--primary-gold); font-weight: 700;">
                    ${service ? '$' + service.price : '-'}
                </span>
            </div>
        `;
    },

    /**
     * Save form draft to storage
     */
    saveDraft() {
        const formData = new FormData(this.form);
        const data = {};
        formData.forEach((value, key) => {
            if (!key.startsWith('_')) { // Skip FormSubmit fields
                data[key] = value;
            }
        });
        
        Storage.saveDraft('booking', data);
    },

    /**
     * Load form draft from storage
     */
    loadDraft() {
        const draft = Storage.getDraft('booking');
        if (!draft) return;

        // Populate fields
        Object.entries(draft).forEach(([key, value]) => {
            const field = this.form.elements[key];
            if (field && value) {
                field.value = value;
            }
        });

        // Trigger service change to set date restrictions
        if (draft.service) {
            this.handleServiceChange();
        }
    },

    /**
     * Handle form submission
     * @param {Event} e - Submit event
     */
    async handleSubmit(e) {
        e.preventDefault();

        if (!this.validateStep()) return;

        const spinner = document.getElementById('formSpinner');
        const submitBtn = this.form.querySelector('button[type="submit"]');

        // Show loading state
        spinner.classList.add('active');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

        try {
            // Simulate API call (replace with actual FormSubmit in production)
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Clear draft on success
            Storage.clearDraft('booking');

            // Show success message
            Toast.success('Booking request sent successfully! We will contact you shortly.');

            // Reset form
            this.form.reset();
            this.currentStep = 1;
            this.updateStep();
            this.initDateRestrictions();

        } catch (error) {
            Toast.error('Something went wrong. Please try again.');
            console.error('Booking error:', error);
        } finally {
            spinner.classList.remove('active');
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-calendar-check"></i> Confirm Booking';
        }
    }
};

// Add shake animation
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20%, 60% { transform: translateX(-10px); }
        40%, 80% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Booking;
}