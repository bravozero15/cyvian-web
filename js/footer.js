<script>
(async function(){
  try {
    const res = await fetch('/data/footer.json', { cache: 'no-store' });
    const f = await res.json();

    const about = document.querySelector('[data-footer-about]');
    const serv  = document.querySelector('[data-footer-servicios]');
    const rec   = document.querySelector('[data-footer-recursos]');
    const cont  = document.querySelector('[data-footer-contacto]');
    const soc   = document.querySelector('[data-footer-social]');

    if (about) {
      const t = about.querySelector('h3'); const p = about.querySelector('p');
      if(t) t.textContent = f.about.title;
      if(p) p.textContent = f.about.text;
    }
    if (serv) {
      serv.innerHTML = '';
      f.links.servicios.forEach(l => serv.insertAdjacentHTML('beforeend', `<li><a href="${l.href}">${l.label}</a></li>`));
    }
    if (rec) {
      rec.innerHTML = '';
      f.links.recursos.forEach(l => rec.insertAdjacentHTML('beforeend', `<li><a href="${l.href}">${l.label}</a></li>`));
    }
    if (cont) {
      cont.innerHTML = `
        <li><i class="fas fa-envelope"></i> ${f.contacto.email}</li>
        <li><i class="fas fa-phone"></i> ${f.contacto.telefono}</li>
        <li><i class="fas fa-map-marker-alt"></i> ${f.contacto.ubicacion}</li>
      `;
    }
    if (soc) {
      soc.innerHTML = '';
      f.social.forEach(s => soc.insertAdjacentHTML('beforeend', `<a href="${s.href}" aria-label="${s.name}"><i class="${s.icon}"></i></a>`));
    }
  } catch(e){ console.error('No se pudo cargar el footer', e); }
})();
</script>
