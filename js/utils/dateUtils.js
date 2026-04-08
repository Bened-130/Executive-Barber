// Date Utility Functions

const DateUtils = {
    /**
     * Get tomorrow's date as YYYY-MM-DD string
     * @returns {string} ISO date string
     */
    getTomorrow() {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return this.toISODate(tomorrow);
    },

    /**
     * Get date N days from now
     * @param {number} days - Number of days
     * @returns {string} ISO date string
     */
    getFutureDate(days) {
        const date = new Date();
        date.setDate(date.getDate() + days);
        return this.toISODate(date);
    },

    /**
     * Convert Date to YYYY-MM-DD string
     * @param {Date} date - Date object
     * @returns {string} ISO date string
     */
    toISODate(date) {
        return date.toISOString().split('T')[0];
    },

    /**
     * Parse date string to Date object
     * @param {string} dateString - YYYY-MM-DD format
     * @returns {Date} Date object
     */
    parseDate(dateString) {
        return new Date(dateString + 'T00:00:00');
    },

    /**
     * Check if date is at least N days from today
     * @param {string} dateString - Date to check
     * @param {number} minDays - Minimum days required
     * @returns {boolean} True if valid
     */
    isMinDaysAhead(dateString, minDays) {
        const selected = this.parseDate(dateString);
        const minDate = new Date();
        minDate.setDate(minDate.getDate() + minDays);
        minDate.setHours(0, 0, 0, 0);
        
        return selected >= minDate;
    },

    /**
     * Get day of week name
     * @param {string} dateString - YYYY-MM-DD
     * @returns {string} Day name
     */
    getDayName(dateString) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const date = this.parseDate(dateString);
        return days[date.getDay()];
    },

    /**
     * Format date for display
     * @param {string} dateString - YYYY-MM-DD
     * @returns {string} Formatted date (e.g., "Monday, January 1, 2024")
     */
    formatDisplay(dateString) {
        const date = this.parseDate(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },

    /**
     * Check if date is a weekend
     * @param {string} dateString - YYYY-MM-DD
     * @returns {boolean} True if weekend
     */
    isWeekend(dateString) {
        const date = this.parseDate(dateString);
        const day = date.getDay();
        return day === 0 || day === 6;
    },

    /**
     * Get available time slots based on day
     * @param {string} dateString - Selected date
     * @returns {Array} Array of time slot objects
     */
    getTimeSlots(dateString) {
        const isWeekend = this.isWeekend(dateString);
        
        const weekdaySlots = [
            { value: '09:00', label: '9:00 AM' },
            { value: '10:00', label: '10:00 AM' },
            { value: '11:00', label: '11:00 AM' },
            { value: '12:00', label: '12:00 PM' },
            { value: '14:00', label: '2:00 PM' },
            { value: '15:00', label: '3:00 PM' },
            { value: '16:00', label: '4:00 PM' },
            { value: '17:00', label: '5:00 PM' },
            { value: '18:00', label: '6:00 PM' }
        ];

        const weekendSlots = [
            { value: '09:00', label: '9:00 AM' },
            { value: '10:00', label: '10:00 AM' },
            { value: '11:00', label: '11:00 AM' },
            { value: '12:00', label: '12:00 PM' },
            { value: '14:00', label: '2:00 PM' },
            { value: '15:00', label: '3:00 PM' },
            { value: '16:00', label: '4:00 PM' }
        ];

        return isWeekend ? weekendSlots : weekdaySlots;
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = DateUtils;
}