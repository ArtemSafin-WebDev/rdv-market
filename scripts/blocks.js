import { tabIcons } from './tab-icons.js';
const asset = name => typeof window === 'undefined' ? `./assets/figma/${name}` : new URL(`../assets/figma/${name}`, import.meta.url).href;
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const lines = value => esc(value).replace(/\n/g, '<br> ');
const image = (name, className = '') => `<img class="${className}" src="${asset(name)}" alt="" draggable="false">`;
const more = (href, extra = '') => `<a class="rdv-more ${extra}" href="${esc(href)}"><span class="rdv-more__label">Подробнее</span>${image('1a369.svg')}</a>`;
const mobileIcon = (icon, className) => !icon ? '' : `<span class="${className} rdv-mobile-icon${icon.kind ? ` rdv-mobile-icon--${esc(icon.kind)}` : ''}" aria-hidden="true">${(icon.layers || [icon.src]).map(src => `<img src="${esc(src)}" alt="" draggable="false">`).join('')}</span>`;

export function renderHero(data) {
  const cards = data.showCards ? data.cards.slice(0, 4) : [];
  return `<section class="rdv-hero" data-rdv-block="hero" aria-labelledby="rdv-hero__title">
    <div class="rdv-hero__inner">
      <div class="rdv-hero__intro">
      ${data.background ? `<picture class="rdv-hero__background" aria-hidden="true">${data.backgroundMobile ? `<source media="(max-width: 767px)" srcset="${esc(data.backgroundMobile)}">` : ''}<img src="${esc(data.background)}" alt="" fetchpriority="high" draggable="false"></picture>` : ''}
      ${data.image ? `<img class="rdv-hero__brand" src="${esc(data.image)}" alt="${esc(data.imageAlt)}" draggable="false">` : ''}
      <h1 class="rdv-hero__title" id="rdv-hero__title"><span>${lines(data.accent)}</span><br>${lines(data.title)}</h1>
      <div class="rdv-hero__buttons">${data.buttons.slice(0, 2).map((button, i) => `<a class="rdv-button${i ? ' rdv-button--secondary' : ''}" href="${esc(button.href)}">${esc(button.label)}</a>`).join('')}</div>
      </div>
      ${cards.length ? `<div class="rdv-hero__cards">${cards.map(card => `<article class="rdv-hero__card${card.mobileIcon ? ' rdv-hero__card--mobile-icon' : ''}"><div class="rdv-hero__copy"><h2>${esc(card.title)}</h2><p>${lines(card.text)}</p></div><div class="rdv-hero__art"><img src="${esc(card.image)}" alt="" draggable="false"></div>${mobileIcon(card.mobileIcon, 'rdv-hero__mobile-icon')}</article>`).join('')}</div>` : ''}
    </div>
  </section>`;
}

export function renderVideo(data) {
  const media = data.type === 'image'
    ? `<img class="rdv-video__poster" src="${esc(data.src)}" alt="${esc(data.imageAlt || 'Обзор RDV Маркет')}">`
    : `<button class="rdv-video__trigger" type="button" aria-label="Смотреть видео: ${esc(data.title.replace(/\n/g, ' '))}"><img class="rdv-video__poster" src="${esc(data.poster)}" alt=""><span class="rdv-video__play" aria-hidden="true"></span></button>`;
  return `<section class="rdv-video" data-rdv-block="video" data-rdv-video="${esc(JSON.stringify({type:data.type,src:data.src,poster:data.poster,captions:data.captions}))}" aria-labelledby="rdv-video-title"><div class="rdv-video__media${data.type === 'image' ? ' rdv-video__media--image' : ''}">${media}</div><div class="rdv-video__copy"><h2 id="rdv-video-title">${lines(data.title)}</h2><p>${lines(data.text)}</p>${data.image ? `<div class="rdv-video__illustration"><img src="${esc(data.image)}" alt=""></div>` : ''}</div></section>`;
}

export function renderChess(data) {
  return `<section class="rdv-chess" data-rdv-block="chess" data-hover="${esc(data.hover)}">${data.cards.map(card => `<a class="rdv-chess__card rdv-chess__card--${esc(card.layout)}" href="${esc(card.href)}" data-hover="${esc(card.hover || data.hover)}" aria-label="${esc(card.title.replace(/\n/g, ' '))} — подробнее">
    ${card.background ? `<img class="rdv-chess__art" src="${esc(card.background)}" alt="" aria-hidden="true" draggable="false">` : ''}
    <div class="rdv-chess__default">
      <h3>${lines(card.title)}</h3><span class="rdv-chess__arrow">${image('950f6.svg')}</span>
      <p class="rdv-chess__description">${lines(card.text)}</p>
      ${card.icon ? `<img class="rdv-chess__icon" src="${esc(card.icon)}" alt="">` : ''}
      <span class="rdv-chess__mobile-more">Подробнее <span class="rdv-chess__mobile-more-arrow" aria-hidden="true">${image('mobile-more-arrow.svg')}</span></span>
      ${mobileIcon(card.mobileIcon, 'rdv-chess__mobile-icon')}
    </div>
    ${(card.hover || data.hover) === 'results' ? `<div class="rdv-chess__result">
      <div class="rdv-chess__result-header"><div><span class="rdv-chess__eyebrow">В результате</span><h3 aria-hidden="true">${lines(card.title)}</h3></div><span class="rdv-chess__more"><span class="rdv-chess__more-label">Подробнее</span>${image('e387d.svg')}</span></div>
      <dl class="rdv-chess__metrics" data-count="${Math.min(4, (card.results || []).length)}">${(card.results || []).slice(0, 4).map(([value, text]) => `<div><dt>${esc(value)}</dt><dd>${lines(text)}</dd></div>`).join('')}</dl>
    </div>` : ''}
  </a>`).join('')}</section>`;
}

export function renderStats(data) {
  return `<section class="rdv-stats" data-rdv-block="stats" aria-label="RDV Маркет в цифрах">${data.slice(0, 4).map(stat => `<article class="rdv-stats__item"><h2>${esc(stat.value)}</h2><p>${lines(stat.text)}</p></article>`).join('')}</section>`;
}

export function renderArchitecture(data, stats) {
  return `<section class="rdv-architecture" data-rdv-block="architecture" aria-label="${esc(data.title)}"><h2 class="rdv-architecture__title">${esc(data.title)}</h2><div class="rdv-architecture__diagram"><img src="${esc(data.image)}" alt="${esc(data.imageAlt)}" width="1238" height="442" loading="lazy" decoding="async"></div>${renderStats(stats)}</section>`;
}

export function renderWorkspace(data) {
  return `<section class="rdv-workspace" data-rdv-block="workspace" aria-labelledby="rdv-workspace-title"><div class="rdv-workspace__inner"><h2 id="rdv-workspace-title">${esc(data.title)} <span>${esc(data.accent)}</span><br>${esc(data.titleEnd)}</h2>${data.description ? `<p class="rdv-workspace__description">${lines(data.description)}</p>` : ''}
    <div class="rdv-workspace__tabs"><div class="rdv-workspace__tablist" role="tablist" aria-label="Преимущества RDV Маркет" aria-orientation="vertical">${data.tabs.map((tab, i) => `<div class="rdv-workspace__item"><button type="button" class="rdv-workspace__tab" role="tab" id="rdv-tab-${i}" aria-controls="rdv-panel-${i}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}"><span class="rdv-workspace__icon${tab.iconHasBackground ? ' rdv-workspace__icon--complete' : ''}">${tab.iconName && tabIcons[tab.iconName] ? tabIcons[tab.iconName] : `<img src="${esc(tab.icon)}" alt="">`}</span><span class="rdv-workspace__label">${lines(tab.label)}</span><span class="rdv-workspace__toggle" aria-hidden="true">${image('mobile-plus.svg', 'rdv-workspace__plus')}${image('mobile-minus.svg', 'rdv-workspace__minus')}</span></button></div>`).join('')}</div>
    ${data.tabs.map((tab, i) => `<div class="rdv-workspace__panel" role="tabpanel" id="rdv-panel-${i}" aria-labelledby="rdv-tab-${i}" tabindex="0"${i ? ' hidden' : ''}>${tab.background ? `<img class="rdv-workspace__art" src="${esc(tab.background)}" alt="" aria-hidden="true" draggable="false">` : ''}<div class="rdv-workspace__panel-inner"><div class="rdv-workspace__copy">${tab.items ? `<ul class="rdv-workspace__list">${tab.items.map(item => `<li>${esc(item)}</li>`).join('')}</ul>` : `<p class="rdv-workspace__text">${lines(tab.text)}</p>`}${tab.showMore && tab.href ? more(tab.href) : ''}</div></div></div>`).join('')}</div>
  </div></section>`;
}

export function renderHeading(data) {
  return data.methodologyTitle ? `<section class="rdv-heading" data-rdv-block="heading"><h2 class="rdv-heading__title">${lines(data.methodologyTitle)} <span>${esc(data.methodologyAccent)}</span></h2></section>` : '';
}

export function renderPageMarkup(data) {
  return renderHero(data.hero) + renderVideo(data.video) + renderHeading(data)
    + renderChess(data.chess) + renderArchitecture(data.architecture, data.stats) + renderWorkspace(data.workspace);
}

export function renderPage(root, data) {
  root.innerHTML = renderPageMarkup(data);
  return bindInteractions(root);
}

/** Возвращает cleanup для повторного монтажа в CMS/SPA. */
let instanceId = 0;
const mounted = new WeakMap();

/** Инициализирует независимые экземпляры; повторный вызов не дублирует обработчики. */
export function bindInteractions(root = document) {
  const blocks = [...(root.matches?.('[data-rdv-block]') ? [root] : []), ...root.querySelectorAll('[data-rdv-block]')];
  const cleanups = blocks.map(block => {
    if (mounted.has(block)) return mounted.get(block);
    const cleanup = bindBlock(block);
    const dispose = () => { cleanup(); mounted.delete(block); };
    mounted.set(block, dispose);
    return dispose;
  });
  return () => cleanups.forEach(cleanup => cleanup());
}

function bindBlock(root) {
  const id = ++instanceId;
  const heading = root.querySelector('[id]');
  if (root.hasAttribute('aria-labelledby') && heading) {
    heading.id = `rdv-heading-${id}`;
    root.setAttribute('aria-labelledby', heading.id);
  }
  const controller = new AbortController();
  const options = { signal: controller.signal };
  const tabs = [...root.querySelectorAll('.rdv-workspace__tab')];
  const panels = [...root.querySelectorAll('.rdv-workspace__panel')];
  tabs.forEach((tab, i) => {
    tab.id = `rdv-tab-${id}-${i}`;
    panels[i].id = `rdv-panel-${id}-${i}`;
    tab.setAttribute('aria-controls', panels[i].id);
    panels[i].setAttribute('aria-labelledby', tab.id);
  });
  const tablist = root.querySelector('.rdv-workspace__tablist');
  const layout = root.querySelector('.rdv-workspace__tabs');
  const mobile = tabs.length ? window.matchMedia('(max-width: 767px)') : null;
  let selected = mobile?.matches ? -1 : Math.max(0, tabs.findIndex(tab => tab.getAttribute('aria-selected') === 'true'));
  const select = index => {
    selected = index;
    tabs.forEach((tab, i) => {
      const active = i === index;
      if (mobile.matches) {
        tab.setAttribute('aria-expanded', String(active));
        tab.removeAttribute('aria-selected');
        tab.tabIndex = 0;
      } else {
        tab.setAttribute('aria-selected', String(active));
        tab.removeAttribute('aria-expanded');
        tab.tabIndex = active ? 0 : -1;
      }
      tab.closest('.rdv-workspace__item').classList.toggle('rdv-workspace__item--open', active);
      // Мобильные панели остаются в потоке для CSS-перехода 0fr ↔ 1fr.
      panels[i].hidden = !mobile.matches && !active;
      panels[i].inert = mobile.matches && !active;
      if (mobile.matches && !active) panels[i].setAttribute('aria-hidden', 'true');
      else panels[i].removeAttribute('aria-hidden');
    });
  };
  const setLayout = () => {
    const accordion = mobile.matches;
    if (accordion) {
      tablist.removeAttribute('role');
      tablist.removeAttribute('aria-orientation');
    } else {
      tablist.setAttribute('role', 'tablist');
      tablist.setAttribute('aria-orientation', 'vertical');
    }
    tabs.forEach((tab, i) => {
      if (accordion) tab.removeAttribute('role');
      else tab.setAttribute('role', 'tab');
      panels[i].setAttribute('role', accordion ? 'region' : 'tabpanel');
      if (accordion) panels[i].removeAttribute('tabindex');
      else panels[i].tabIndex = 0;
      (accordion ? tab.closest('.rdv-workspace__item') : layout).append(panels[i]);
    });
    select(!accordion && selected < 0 ? 0 : selected);
  };
  if (mobile) {
    setLayout();
    mobile.addEventListener('change', setLayout, options);
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => select(mobile.matches && selected === index ? -1 : index), options);
    tab.addEventListener('keydown', event => {
      const keys = { ArrowDown: (index + 1) % tabs.length, ArrowUp: (index - 1 + tabs.length) % tabs.length, Home: 0, End: tabs.length - 1 };
      if (!(event.key in keys)) return;
      event.preventDefault();
      if (!mobile.matches) select(keys[event.key]);
      tabs[keys[event.key]].focus();
    }, options);
  });
  let dialog;
  root.querySelector('.rdv-video__trigger')?.addEventListener('click', event => {
    const trigger = event.currentTarget;
    dialog = document.createElement('dialog');
    dialog.className = 'rdv-video__player';
    dialog.setAttribute('aria-label', 'Видео о RDV Маркет');
    const video = JSON.parse(root.dataset.rdvVideo);
    dialog.innerHTML = `<button class="rdv-video__close" aria-label="Закрыть видео" type="button">×</button><div class="rdv-video__content"></div>`;
    const content = dialog.querySelector('.rdv-video__content');
    if (video.type === 'file') {
      const player = document.createElement('video');
      player.src = video.src;
      player.poster = video.poster;
      player.controls = true;
      player.autoplay = true;
      player.playsInline = true;
      if (video.captions) {
        const track = document.createElement('track');
        track.kind = 'captions'; track.src = video.captions; track.srclang = 'ru'; track.label = 'Русский'; player.append(track);
      }
      content.append(player);
      player.addEventListener('error', () => { content.append(Object.assign(document.createElement('p'), { textContent: 'Не удалось загрузить видео. Проверьте путь к файлу.' })); }, { once: true });
    } else {
      const player = document.createElement('iframe');
      const url = new URL(video.src);
      if (url.hostname !== 'rutube.ru' || !url.pathname.startsWith('/play/embed/')) throw new Error('Для Rutube требуется ссылка https://rutube.ru/play/embed/…');
      url.searchParams.set('autoplay', '1');
      player.src = url.href;
      player.title = 'RDV Маркет — обзор решения';
      player.allow = 'autoplay; fullscreen; picture-in-picture';
      player.allowFullscreen = true;
      content.append(player);
    }
    root.append(dialog);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.addEventListener('close', () => { dialog.remove(); document.body.style.overflow = previousOverflow; if (trigger.isConnected) trigger.focus({ preventScroll: true }); }, { once: true });
    dialog.querySelector('button').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
    dialog.showModal();
  }, options);
  return () => { controller.abort(); if (dialog?.open) dialog.close(); };
}
