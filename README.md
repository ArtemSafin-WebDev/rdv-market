# RDV Маркет

Адаптивная верстка на HTML, CSS и JavaScript. Нужен Node.js 18+.

```sh
npm run dev
```

Откройте адрес, который появится в терминале. По умолчанию — http://127.0.0.1:4173/. Если порт занят, сервер автоматически выберет следующий свободный. Остановка — `Ctrl+C`.

```sh
npm run build
npm run preview
```

Сборка — в `dist/`, отдельные блоки — в `dist/blocks/`.
Контент и настройки — в `scripts/config.js`, стили — в `styles/blocks.css`.

Разводящий блок настраивается в `config.business`: `showTitle`, `showCallouts`, `showMore`, `showArrow`. У карточек можно переопределить `showMore` и `showArrow`, задать подпись сверху (`callout`), отключить переход и ховер (`clickable: false`), изменить текст, ссылку и изображение. Высота изображения рассчитывается автоматически по его пропорциям; карточка растёт вместе с текстом и изображением.

Заголовок и карточки доступны отдельно в `dist/blocks/business-heading.html` и `dist/blocks/business-cards.html`, весь блок — в `dist/blocks/business.html`.
