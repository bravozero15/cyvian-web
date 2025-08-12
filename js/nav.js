(async function () {
  try {
    const res = await fetch('/data/navigation.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('No se pudo cargar navigation.json');
    const data = await res.json();
    const ul = document.getElementById('main-nav');
    if (!ul) return;
    ul.innerHTML = '';
    data.items.forEach((i) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = i.href;
      a.className = 'nav-link';
      a.textContent = i.label;
      li.appendChild(a);
      ul.appendChild(li);
    });
  } catch (e) {
    console.error('Menu error:', e);
  }
})();
