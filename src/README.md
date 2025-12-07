# AppName - Современное веб-приложение

Полнофункциональное веб-приложение с системой аутентификации и личным кабинетом, созданное на React, TypeScript и Tailwind CSS.

## 🚀 Возможности

- ✨ Современный дизайн с темной темой
- 🔐 Система регистрации и входа
- 📊 Личный кабинет с дашбордом
- 🎨 Адаптивный интерфейс
- 🌙 Glassmorphism эффекты
- ⚡ Быстрая навигация между страницами
- 🔮 Готовность к интеграции бэкенда

## 📦 Технологии

- **React 18** - UI библиотека
- **TypeScript** - Типизация
- **Tailwind CSS** - Стилизация
- **React Router** - Маршрутизация
- **Lucide React** - Иконки
- **Vite** - Сборщик

## 🛠️ Установка

```bash
# Клонировать репозиторий
git clone https://github.com/your-username/your-repo.git

# Перейти в директорию
cd your-repo

# Установить зависимости
npm install

# Запустить в режиме разработки
npm run dev
```

## 📁 Структура проекта

```
/
├── components/          # React компоненты
│   ├── Home.tsx        # Главная страница
│   ├── Login.tsx       # Страница входа
│   ├── Register.tsx    # Страница регистрации
│   └── Dashboard.tsx   # Личный кабинет
├── styles/             # Стили
│   └── globals.css     # Глобальные стили
├── App.tsx             # Главный компонент
└── README.md           # Документация
```

## 🔧 Настройка

### Переменные окружения

Создайте файл `.env` в корне проекта:

```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=AppName
```

### Интеграция бэкенда

Для подключения вашего бэкенда:

1. Обновите функции `handleLogin` и `handleRegister` в `App.tsx`
2. Добавьте API вызовы вместо mock данных
3. Настройте обработку токенов аутентификации

Пример интеграции:

```typescript
const handleLogin = async (email: string, password: string) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    setUser(data.user);
    setIsAuthenticated(true);
    localStorage.setItem('token', data.token);
  } catch (error) {
    console.error('Login error:', error);
  }
};
```

## 🎨 Кастомизация

### Изменение темы

Отредактируйте файл `/styles/globals.css` для изменения цветовой схемы.

### Добавление новых страниц

1. Создайте компонент в `/components`
2. Добавьте маршрут в `App.tsx`
3. Обновите навигацию

## 📝 Доступные скрипты

```bash
npm run dev          # Запуск в режиме разработки
npm run build        # Сборка для продакшена
npm run preview      # Предпросмотр продакшен сборки
npm run lint         # Проверка кода
```

## 🌐 Деплой

### Vercel

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# Загрузите содержимое папки dist на Netlify
```

### GitHub Pages

```bash
npm run build
# Настройте GitHub Actions для автоматического деплоя
```

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте ветку (`git checkout -b feature/amazing-feature`)
3. Закоммитьте изменения (`git commit -m 'Add amazing feature'`)
4. Запушьте в ветку (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

## 📄 Лицензия

MIT License - смотрите файл [LICENSE](LICENSE) для деталей

## 👤 Автор

Ваше имя - [@your-username](https://github.com/your-username)

## 🙏 Благодарности

- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [Vite](https://vitejs.dev/)

---

⭐ Если проект был полезен, поставьте звезду на GitHub!
