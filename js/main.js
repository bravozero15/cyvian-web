// ========================================
// CYVIAN - Main JavaScript
// Funcionalidad principal del sitio
// ========================================

// Esperar a que el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    
    // =================
    // Navegación
    // =================
    const header = document.querySelector('.main-header');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    // Efecto scroll en header
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Smooth scrolling para anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Cerrar menú móvil si está abierto
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });
    
    // =================
    // Animaciones
    // =================
    
    // Intersection Observer para animaciones al scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const animateOnScroll = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Si tiene delay, aplicarlo
                const delay = entry.target.dataset.delay;
                if (delay) {
                    entry.target.style.animationDelay = `${delay}ms`;
                }
            }
        });
    }, observerOptions);
    
    // Observar elementos con clase animate-on-scroll
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        animateOnScroll.observe(el);
    });
    
    // Animaciones de fade para hero
    document.querySelectorAll('.animate-fade-up').forEach((el, index) => {
        const delay = el.dataset.delay || index * 100;
        setTimeout(() => {
            el.classList.add('visible');
        }, delay);
    });
    
    // =================
    // Métricas en tiempo real
    // =================
    const metricsCounter = {
        threats: 45892,
        responseTime: 12,
        
        init() {
            this.animateNumber('threats-counter', this.threats, 2000);
            setInterval(() => this.updateMetrics(), 5000);
        },
        
        updateMetrics() {
            // Simular incremento de amenazas bloqueadas
            this.threats += Math.floor(Math.random() * 10) + 1;
            const threatsElement = document.getElementById('threats-counter');
            if (threatsElement) {
                threatsElement.textContent = this.formatNumber(this.threats);
            }
            
            // Simular variación en tiempo de respuesta
            this.responseTime = 10 + Math.floor(Math.random() * 8);
            const responseElement = document.getElementById('response-time');
            if (responseElement) {
                responseElement.textContent = `${this.responseTime}ms`;
            }
        },
        
        animateNumber(elementId, target, duration) {
            const element = document.getElementById(elementId);
            if (!element) return;
            
            const start = 0;
            const increment = target / (duration / 16);
            let current = start;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                element.textContent = this.formatNumber(Math.floor(current));
            }, 16);
        },
        
        formatNumber(num) {
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    };
    
    // Inicializar métricas
    metricsCounter.init();
    
    // =================
    // Formularios
    // =================
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            // Prevenir envío por defecto
            e.preventDefault();
            
            // Aquí iría la lógica de validación y envío
            console.log('Formulario enviado:', new FormData(form));
            
            // Mostrar mensaje de éxito (temporal)
            alert('Formulario enviado correctamente. Nos pondremos en contacto pronto.');
        });
    });
    
    // =================
    // Lazy Loading de imágenes
    // =================
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
    
    // =================
    // Tooltips
    // =================
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.dataset.tooltip;
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
            tooltip.style.left = rect.left + (rect.width - tooltip.offsetWidth) / 2 + 'px';
            
            setTimeout(() => tooltip.classList.add('visible'), 10);
        });
        
        element.addEventListener('mouseleave', function() {
            const tooltips = document.querySelectorAll('.tooltip');
            tooltips.forEach(t => t.remove());
        });
    });
    
    // =================
    // Typed effect para hero
    // =================
    class TypeWriter {
        constructor(element, words, wait = 3000) {
            this.element = element;
            this.words = words;
            this.wait = parseInt(wait, 10);
            this.txt = '';
            this.wordIndex = 0;
            this.isDeleting = false;
            this.type();
        }
        
        type() {
            const current = this.wordIndex % this.words.length;
            const fullTxt = this.words[current];
            
            if (this.isDeleting) {
                this.txt = fullTxt.substring(0, this.txt.length - 1);
            } else {
                this.txt = fullTxt.substring(0, this.txt.length + 1);
            }
            
            this.element.innerHTML = `<span class="typed-text">${this.txt}</span>`;
            
            let typeSpeed = 100;
            
            if (this.isDeleting) {
                typeSpeed /= 2;
            }
            
            if (!this.isDeleting && this.txt === fullTxt) {
                typeSpeed = this.wait;
                this.isDeleting = true;
            } else if (this.isDeleting && this.txt === '') {
                this.isDeleting = false;
                this.wordIndex++;
                typeSpeed = 500;
            }
            
            setTimeout(() => this.type(), typeSpeed);
        }
    }
    
    // Inicializar typed effect si existe el elemento
    const typedElement = document.querySelector('.typed');
    if (typedElement) {
        const words = ['adaptativa', 'inteligente', 'proactiva', 'confiable'];
        new TypeWriter(typedElement, words);
    }
    
    // =================
    // Particles background (opcional)
    // =================
    function createParticles() {
        const particlesContainer = document.querySelector('.cyber-particles');
        if (!particlesContainer) return;
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
            particlesContainer.appendChild(particle);
        }
    }
    
    createParticles();
    
    // =================
    // Prevenir click derecho en imágenes (opcional)
    // =================
    document.addEventListener('contextmenu', function(e) {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
            return false;
        }
    });
    
    // =================
    // Console message
    // =================
    console.log('%c🛡️ Cyvian Security', 'font-size: 24px; font-weight: bold; color: #1a237e;');
    console.log('%c¿Buscando vulnerabilidades? Contáctanos para un pentesting profesional.', 'font-size: 14px; color: #666;');
    console.log('%ccontacto@cyvian.cl', 'font-size: 12px; color: #00acc1;');
});

// =================
// Utilidades globales
// =================
const CyvianUtils = {
    // Validación de email
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },
    
    // Sanitizar input
    sanitizeInput(input) {
        const div = document.createElement('div');
        div.textContent = input;
        return div.innerHTML;
    },
    
    // Debounce function
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Throttle function
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Get cookie
    getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    },
    
    // Set cookie
    setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = `expires=${date.toUTCString()}`;
        document.cookie = `${name}=${value};${expires};path=/;Secure;SameSite=Strict`;
    }
};