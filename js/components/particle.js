// Particle Background Animation

const Particles = {
    canvas: null,
    ctx: null,
    particles: [],
    animationId: null,
    isActive: false,

    config: {
        particleCount: 50,
        connectionDistance: 100,
        maxSpeed: 0.5,
        color: 'rgba(212, 175, 55, 0.5)',
        lineColor: 'rgba(212, 175, 55, 0.1)'
    },

    /**
     * Initialize particle system
     * @param {string} canvasId - Canvas element ID
     */
    init(canvasId = 'particles-canvas') {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.resize();
        this.createParticles();
        
        window.addEventListener('resize', () => this.resize());
        
        // Check for reduced motion preference
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.start();
        }
    },

    /**
     * Resize canvas to window size
     */
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        // Adjust particle count based on screen size
        const area = this.canvas.width * this.canvas.height;
        this.config.particleCount = Math.min(50, Math.floor(area / 30000));
        
        if (this.particles.length > 0) {
            this.createParticles();
        }
    },

    /**
     * Create particle objects
     */
    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.config.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 0.5,
                speedX: (Math.random() - 0.5) * this.config.maxSpeed,
                speedY: (Math.random() - 0.5) * this.config.maxSpeed,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    },

    /**
     * Start animation loop
     */
    start() {
        if (this.isActive) return;
        this.isActive = true;
        this.animate();
    },

    /**
     * Stop animation loop
     */
    stop() {
        this.isActive = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    },

    /**
     * Animation frame
     */
    animate() {
        if (!this.isActive) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw particles
        this.particles.forEach((particle, i) => {
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            // Wrap around edges
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.y > this.canvas.height) particle.y = 0;
            if (particle.y < 0) particle.y = this.canvas.height;

            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = this.config.color.replace('0.5', particle.opacity);
            this.ctx.fill();

            // Draw connections
            for (let j = i + 1; j < this.particles.length; j++) {
                const other = this.particles[j];
                const dx = particle.x - other.x;
                const dy = particle.y - other.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.config.connectionDistance) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(other.x, other.y);
                    const opacity = (1 - distance / this.config.connectionDistance) * 0.2;
                    this.ctx.strokeStyle = this.config.lineColor.replace('0.1', opacity);
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            }
        });

        this.animationId = requestAnimationFrame(() => this.animate());
    },

    /**
     * Pause when tab is hidden
     */
    handleVisibility() {
        if (document.hidden) {
            this.stop();
        } else {
            this.start();
        }
    }
};

// Auto-pause on tab switch
document.addEventListener('visibilitychange', () => {
    Particles.handleVisibility();
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Particles;
}