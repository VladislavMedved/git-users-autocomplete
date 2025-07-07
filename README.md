# GitHub Users Autocomplete

Автодополнение для поиска пользователей GitHub с использованием GitHub API.

## Структура проекта

```
git-users-autocomplete/
├── index.html                 # Главная HTML страница
├── src/                       # Исходники
│   ├── main.js                # Точка входа, инициализация
│   ├── state.js               # Централизованное состояние
│   ├── style.css              # Стили приложения
│   ├── ui/
│   │   ├── render.js          # UI-рендеринг (DOM-обновления)
│   │   └── aria.js            # Обновление aria-атрибутов
│   │
│   ├── logic/
│   │   ├── fetchUsers.js      # Взаимодействие с GitHub API
│   │   └── debounce.js        # Утилита
│   │
│   └── events/
│       ├── onInput.js         # Обработчик ввода
│       ├── onKeyDown.js       # Обработка клавиш
│       └── onSelect.js        # Выбор юзера
│
├── test/                      # Юнит-тесты (если будут)
│   └── fetchUsers.test.js     # Мок-тест API
│
├── package.json               # Скрипты и зависимости
├── .editorconfig              # Code style
├── .prettierrc                # Prettier конфигурация
├── .eslintrc.json             # ESLint конфигурация
└── README.md                  # Документация по проекту
```

## Функциональность

- Поиск пользователей GitHub по имени
- Автодополнение с задержкой (debounce)
- Навигация по клавиатуре (стрелки вверх/вниз, Enter)
- Отмена предыдущих запросов при новом поиске
- Полная поддержка ARIA для доступности
- Адаптивный дизайн

## Запуск

Проект использует Vite для разработки:

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Сборка для продакшена
npm run build

# Предпросмотр собранного проекта
npm run preview
```

## Форматирование кода

Проект настроен с Prettier для автоматического форматирования:

```bash
# Форматировать все файлы
npm run format

# Проверить форматирование без изменений
npm run format:check
```

В VSCode настроено автоматическое форматирование при сохранении (4 пробела).

## API

Используется [GitHub Search API](https://docs.github.com/en/rest/search/search#search-users) для поиска пользователей.

## Технологии

- Vite (сборщик и dev-сервер)
- Vanilla JavaScript (ES6+)
- GitHub REST API
- CSS3 с BEM методологией
- HTML5 с ARIA атрибутами
- Prettier (форматирование кода)
