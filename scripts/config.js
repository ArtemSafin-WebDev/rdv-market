const site = 'https://rdv-market.ru';
const asset = name => typeof window === 'undefined' ? `./assets/figma/${name}` : new URL(`../assets/figma/${name}`, import.meta.url).href;

export const config = {
  hero: {
    background: asset('hero-background@2x.webp'),
    backgroundMobile: asset('hero-background-mobile.svg'),
    image: asset('hero-brand.svg'),
    imageAlt: 'Интеграция 1С с Ozon, Wildberries и Яндекс Маркет',
    accent: 'Единая система',
    title: 'управления маркетплейсами\nв вашей 1С',
    buttons: [
      { label: 'Запросить демонстрацию', href: `${site}/#formEvent` },
      { label: 'Получить консультацию', href: `${site}/#formEvent` }
    ],
    showCards: true,
    cards: [
      { title: 'FBS-отгрузки за 12 часов', text: 'Инструменты для быстрой обработки и отгрузки 10 000+ FBS-заказов каждый день', image: asset('hero-card-1@4x.webp'), mobileIcon: { src: asset('mobile-delivery.svg') } },
      { title: 'Честный Знак', text: 'Автоматизация полного цикла работы с маркировкой на маркетплейсах', image: asset('hero-card-2@4x.webp'), mobileIcon: { src: asset('mobile-barcode.svg') } },
      { title: 'Корректный учет', text: 'Достоверные данные для налоговой отчетности\nза 1 день', image: asset('hero-card-3@4x.webp'), mobileIcon: { kind: 'financial', layers: [asset('mobile-financial-document.svg'), asset('mobile-financial-currency.svg')] } },
      { title: 'Аналитика продаж', text: 'Юнит-экономика и P&L\nс данными вашей 1С', image: asset('hero-card-4@4x.webp'), mobileIcon: { src: asset('mobile-chart.svg') } }
    ]
  },
  video: {
    type: 'rutube', // 'rutube' | 'file' | 'image'
    src: 'https://rutube.ru/play/embed/6c8477f549fd49c769395bf80a11b106',
    poster: asset('video-poster@2x.webp'),
    title: 'Посмотрите,\nкак всё устроено',
    text: 'Познакомьтесь с возможностями решения и оцените,\nкак оно впишется в ваши процессы',
    image: asset('35507.svg'),
    captions: null
  },
  methodologyTitle: 'Готовая методология и эталонные процессы\nработы с маркетплейсами',
  methodologyAccent: 'в 1С',
  chess: {
    hover: 'results', // 'results' | 'simple'
    cards: [
      { layout: 'conveyor', mobileIcon: { src: asset('mobile-conveyor.svg') }, title: 'Конвейерная\nобработка заказов', text: 'Сквозной процесс от получения заказа до отгрузки с автоматизацией и готовыми рабочими местами для склада', href: `${site}/bystraja-upakovka-fbs/`, background: asset('chess-conveyor@2x.webp'), results: [["–35%", "сокращение времени на сборку и упаковку отправлений"], ["99.8%", "точность комплектации заказов без пересорта"], ["х2.5", "увеличение пропускной способности склада"]] },
      { layout: 'supplies', mobileIcon: { src: asset('mobile-warehouse.svg') }, title: 'Работа с поставками', text: 'Удобные рабочие места для создания поставок, сверки остатков на складах и контроля расхождений', href: `${site}/integratsiya-1c-fbo/`, icon: asset('a4f25.svg'), results: [["+40%", "скорость создания поставок"], ["0%", "расхождений при приемке"]] },
      { layout: 'analytics', mobileIcon: { src: asset('mobile-analytics.svg') }, title: 'Аналитика продаж', text: 'Встраиваем интерфейсы и готовые рабочие места в вашу инфраструктуру с сохранением привычных процессов', href: `${site}/analitika-unit-ekonomika`, icon: asset('614ae.svg'), results: [["+15%", "прирост рентабельности"], ["-25%", "неликвидных запасов"]] },
      { layout: 'sync', mobileIcon: { src: asset('mobile-sync.svg') }, title: 'Синхронизация остатков', text: 'Моментальное обновление\nостатков и загрузка заказов даже\nпри высокой интенсивности продаж\nв 5 000+ заказов в день', href: `${site}/integratsiya-1c-fbs/`, icon: asset('01fc4.svg'), results: [["< 5 сек", "время обновления витрин"], ["-98%", "отмен заказов из-за ошибок"]] },
      { layout: 'reports', mobileIcon: { kind: 'report', src: asset('mobile-report.svg') }, title: 'Отражение отчетов', text: 'Автоматизация загрузки и отражения отчетов с полным соответствием налоговому законодательству', href: `${site}/finansovuy-uchet-marketpleysov/`, background: asset('chess-reports@2x.webp'), results: [["15 мин", "вместо нескольких дней на сверку и ввод отчетов вручную"], ["100%", "соответствие требованиям налогового учета РФ"], ["0", "ошибок из-за человеческого фактора при расчетах комиссий"]] },
      { layout: 'marking', mobileIcon: { kind: 'marking', src: asset('mobile-marking.svg') }, title: 'Честный Знак', text: 'Работа со сканером и понятный автоматизированный сценарий\nот приемки/выпуска кодов\nдо их вывода из оборота', href: `${site}/avtomatizaciya-markirovka-chestnyy-znak/`, background: asset('chess-marking@2x.webp'), results: [["х3", "ускорение процесса сканирования и маркировки"], ["0", "штрафов за некорректную передачу кодов регулятору"], ["1 клик", "для автоматического вывода кодов маркировки из оборота"]] }
    ]
  },
  architecture: {
    title: 'Архитектура RDV Маркет',
    image: asset('architecture-diagram@2x.webp'),
    imageAlt: 'Учетная система 1С и расширение RDV Маркет обмениваются данными с облачной платформой RDV, которая связана по API с Ozon, Wildberries и Яндекс Маркет'
  },
  stats: [
    { value: '3,5млн', text: 'заказов обрабатывается\nв экосистеме RDV Маркет каждый месяц' },
    { value: '1200+', text: 'Личных кабинетов подключено к RDV Маркет' },
    { value: '90 000+', text: 'FBS-заказов в сутки может обработать система в рамках\n1 клиента' },
    { value: '99,9%', text: 'Аптайм облачной\nплатформы' }
  ],
  workspace: {
    title: 'Ваше пространство для', accent: 'удобной работы', titleEnd: 'с маркетплейсами',
    description: 'Проектируем сервис так, чтобы ежедневная работа в RDV Маркет была удобной для пользователя,\nа не только решала функциональные задачи',
    tabs: [
      { label: 'Уникальный облачный сервис в 1С', iconName: 'cloud', background: asset('workspace-cloud@2x.webp'), showMore: true, href: `${site}/press-center/blog/kak-rabotaet-rdv-market/`, items: ['Обновления маркетплейсов без необходимости обновлять расширение в вашей 1С', 'Все «тяжёлые» интеграционные операции — в нашем облаке', 'До 15 000 FBS-заказов в день с сохранением скорости работы 1С', 'Все данные сохраняются даже в случае отказа вашего оборудования'] },
      { label: 'Клиентский опыт — в центре внимания', iconName: 'experience', background: asset('workspace-experience@2x.webp'), showMore: true, href: `${site}/#formEvent`, items: ['Принцип единого окна в интерфейсе и минималистичный дизайн', 'Личный менеджер и регулярная коммуникация по пожеланиям к развитию продукта', 'База знаний онлайн с актуальными текстовыми и видео-инструкциями'] },
      { label: 'Плавный запуск и нацеленность на результат', iconName: 'launch', background: asset('workspace-launch@2x.webp'), showMore: true, href: `${site}/#formEvent`, items: ['Бесплатное внедрение с обучением пользователей', 'Тестовый период 21 день для проверки функционала', 'Самостоятельное подключение с помощью текстовых и видео инструкций', 'Запуск работы с маркетплейсами под ключ и обучение для больших команд'] },
      { label: 'Комплекс решений для e-commerce в одном окне', iconName: 'solutions', background: asset('workspace-solutions@2x.webp'), showMore: true, href: `${site}/#formEvent`, items: ['Сервис аренды 1С и аренда выделенного сервера', 'Команда экспертов по настройке, внедрению и доработке 1С', 'Проекты по автоматизации склада и внедрение работы с маркировкой Честный ЗНАК', 'Команда по аналитике и продвижению бизнеса на маркетплейсах'] },
      { label: 'Техническая поддержка 7 дней в неделю', iconName: 'support', background: asset('workspace-support@2x.webp'), showMore: true, href: `${site}/podderzhka/`, items: ['Прозрачные процессы и гарантированный уровень качества оказания услуг (SLA)', 'Гибкие возможности коммуникации пользователей с сотрудниками поддержки', 'Сотрудники со специализацией в e-commerce уже на первой линии поддержки', 'Готовая база знаний с подробными инструкциями по работе с сервисом'] }
    ]
  }
};
