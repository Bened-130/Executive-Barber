// Gallery Component

const Gallery = {
    grid: null,
    filters: null,
    modal: null,
    modalImage: null,
    modalClose: null,
    currentFilter: 'all',

    /**
     * Initialize gallery
     */
    init() {
        this.grid = document.getElementById('galleryGrid');
        this.filters = document.getElementById('galleryFilters');
        this.modal = document.getElementById('imageModal');
        this.modalImage = document.getElementById('modalImage');
        this.modalClose = document.getElementById('modalClose');

        if (!this.grid) return;

        this.render();
        this.bindEvents();
    },

    /**
     * Render gallery items
     */
    render() {
        if (!this.grid || typeof galleryData === 'undefined') return;

        this.grid.innerHTML = galleryData.map(item => `
            <div class="gallery-item" 
                 data-category="${item.category}" 
                 data-id="${item.id}"
                 role="button"
                 tabindex="0"
                 aria-label="View ${item.title}">
                <img src="${item.image}" 
                     alt="${item.title}" 
                     loading="lazy">
                <div class="gallery-overlay">
                    <h4>${item.title}</h4>
                    <p>${item.description}</p>
                </div>
            </div>
        `).join('');
    },

    /**
     * Bind event listeners
     */
    bindEvents() {
        // Filter buttons
        if (this.filters) {
            this.filters.querySelectorAll('.filter-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const filter = e.target.dataset.filter;
                    this.setFilter(filter);
                });
            });
        }

        // Gallery items
        this.grid.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', () => {
                const id = parseInt(item.dataset.id);
                this.openModal(id);
            });

            // Keyboard accessibility
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const id = parseInt(item.dataset.id);
                    this.openModal(id);
                }
            });
        });

        // Modal close
        if (this.modalClose) {
            this.modalClose.addEventListener('click', () => this.closeModal());
        }

        if (this.modal) {
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) {
                    this.closeModal();
                }
            });

            // Keyboard close
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                    this.closeModal();
                }
            });
        }
    },

    /**
     * Set active filter
     * @param {string} filter - Category filter
     */
    setFilter(filter) {
        this.currentFilter = filter;

        // Update buttons
        this.filters.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });

        // Filter items with animation
        this.grid.querySelectorAll('.gallery-item').forEach(item => {
            const category = item.dataset.category;
            const matches = filter === 'all' || category === filter;

            if (matches) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    },

    /**
     * Open image modal
     * @param {number} id - Image ID
     */
    openModal(id) {
        const item = galleryData.find(img => img.id === id);
        if (!item || !this.modal) return;

        this.modalImage.src = item.image;
        this.modalImage.alt = item.title;
        this.modal.classList.add('active');
        this.modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    },

    /**
     * Close image modal
     */
    closeModal() {
        if (!this.modal) return;
        
        this.modal.classList.remove('active');
        this.modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        
        // Clear image after animation
        setTimeout(() => {
            this.modalImage.src = '';
        }, 300);
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Gallery;
}