// Original header markup/classes; only the standalone preview interactions live here.
const header = document.querySelector('.rdv-site-shell .header');
if (header) {
  // Резервируем место под исходную fixed-шапку только в локальном превью.
  const headerSize = new ResizeObserver(() => {
    document.documentElement.style.setProperty('--rdv-preview-header-height', `${header.offsetHeight}px`);
  });
  headerSize.observe(header);
  const tabs = [...header.querySelectorAll('.js-tab')];
  const panels = [...header.querySelectorAll('.js-tab-content')];
  const container = header.querySelector('.header__tabs-contents');
  const menu = header.querySelector('.js-tabs-scroll');
  const close = () => {
    tabs.forEach(tab => { tab.classList.remove('tab-active'); tab.setAttribute('aria-expanded', 'false'); });
    panels.forEach(panel => panel.classList.remove('active'));
    container.style.display = 'none'; menu.classList.remove('active');
  };
  tabs.forEach(tab => {
    tab.setAttribute('aria-expanded', 'false');
    tab.addEventListener('click', () => {
      const wasOpen = tab.classList.contains('tab-active'); close();
      if (wasOpen) return;
      tab.classList.add('tab-active'); tab.setAttribute('aria-expanded', 'true');
      panels.find(panel => panel.dataset.id === tab.dataset.href)?.classList.add('active');
      container.style.display = 'block'; menu.classList.add('active');
      menu.style.setProperty('--active-tab-offset', `${tab.offsetLeft}px`);
      menu.style.setProperty('--active-tab-width', `${tab.clientWidth}px`);
    });
  });
  const closeButton = document.createElement('button');
  closeButton.className = 'icon-close-menu js-close-menu';
  closeButton.type = 'button'; closeButton.setAttribute('aria-label', 'Закрыть меню');
  closeButton.addEventListener('click', close); container.append(closeButton);
  const search = header.querySelector('.header__search');
  header.querySelector('.header__search-button').setAttribute('aria-label', 'Поиск');
  header.querySelector('.header__search-button').addEventListener('click', () => {
    close(); search.classList.toggle('active');
    if (search.classList.contains('active')) search.querySelector('input').focus();
  });
  document.addEventListener('click', event => { if (!header.contains(event.target)) close(); if (!search.contains(event.target)) search.classList.remove('active'); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') { close(); search.classList.remove('active'); } });
}

// Preserve the production button markup/styles; the preview opens the live form.
document.querySelectorAll('.rdv-site-shell [data-modal]').forEach(button => button.addEventListener('click', () => { window.location.href = 'https://rdv-market.ru/#formEvent'; }));
