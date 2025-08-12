// Animaciones para elementos del sitio
(function() {
  // Observer para elementos con animate-on-scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const delay = element.getAttribute('data-delay') || 0;
        
        setTimeout(() => {
          element.classList.add('animate-visible');
        }, delay);
        
        observer.unobserve(element);
      }
    });
  }, observerOptions);

  // Observar elementos con clase animate-on-scroll
  document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(el => observer.observe(el));

    // Animaciones para elementos fade-up
    const fadeUpElements = document.querySelectorAll('.animate-fade-up');
    fadeUpElements.forEach((el, index) => {
      const delay = el.getAttribute('data-delay') || index * 100;
      setTimeout(() => {
        el.classList.add('fade-up-visible');
      }, delay);
    });
  });

  // Animación de contadores
  function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
      const target = counter.textContent;
      const isNumeric = !isNaN(target);
      
      if (!isNumeric) return;
      
      const increment = target / 30;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current);
        }
      }, 50);
    });
  }

  // Activar contadores cuando sean visibles
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        statsObserver.unobserve(entry.target);
      }
    });
  });

  document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.why-us-stats');
    if (statsSection) {
      statsObserver.observe(statsSection);
    }
  });
})();