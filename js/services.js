(async function() {
  try {
    const res = await fetch('/data/services.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('No se pudo cargar services.json');
    const data = await res.json();
    
    const servicesGrid = document.querySelector('.services-grid');
    if (!servicesGrid || !data.services) return;
    
    servicesGrid.innerHTML = '';
    
    data.services.forEach((service, index) => {
      const serviceCard = document.createElement('div');
      serviceCard.className = 'service-card animate-on-scroll';
      if (index > 0) serviceCard.setAttribute('data-delay', index * 100);
      
      serviceCard.innerHTML = `
        <div class="service-icon">
          <i class="${service.icon}"></i>
        </div>
        <h3>${service.title}</h3>
        <p>${service.description}</p>
        <ul class="service-features">
          ${service.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
        </ul>
        <a href="${service.link}" class="service-link">
          Más información <i class="fas fa-arrow-right"></i>
        </a>
      `;
      
      servicesGrid.appendChild(serviceCard);
    });
  } catch(e) {
    console.error('Error cargando servicios:', e);
  }
})();