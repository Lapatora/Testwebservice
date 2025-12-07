# Testwebservice

Полнофункциональное современное веб-приложение на React 18 + TypeScript + Tailwind CSS с бэкендом на Node.js + Express + PostgreSQL + JWT.

## ✨ Основные возможности

- ✅ Современный UI с GitHub-стилем и темной темой
- ✅ Аутентификация: регистрация/вход с JWT токенами
- ✅ Личный кабинет с дашбордом и редактированием профиля
- ✅ Быстрая и плавная навигация: React Router
- ✅ Переиспользуемые компоненты UI
- ✅ Полноценный бэкенд с PostgreSQL и JWT аутентификацией
- ✅ Готовность к деплою на Vercel

## 🚀 Быстрый старт

### Автоматический запуск (рекомендуется)

```bash
./start.sh
```

Скрипт автоматически запустит фронтенд и бэкенд.

### Ручной запуск

**1. Установите зависимости:**

```bash
# Фронтенд
npm install

# Бэкенд
cd server
npm install
cd ..
```

**2. Настройте базу данных:**

```bash
# Запустите PostgreSQL (macOS)
brew services start postgresql@14

# Создайте базу данных
createdb testwebservice
```

**3. Настройте переменные окружения:**

**server/.env:**
```env
PORT=5001
DATABASE_URL=postgresql://localhost:5432/testwebservice
JWT_SECRET=your-secret-key-minimum-32-characters
NODE_ENV=development
```

**.env (в корне проекта):**
```env
VITE_API_URL=http://localhost:5001/api
```

**4. Запустите серверы:**

```bash
# Терминал 1 - Бэкенд
cd server
npm run dev

# Терминал 2 - Фронтенд
npm run dev
```

## 📁 Структура проекта

```
Testwebservice/
├── src/                    # Frontend (React + TypeScript)
│   ├── components/         # React компоненты
│   ├── services/           # API сервисы
│   └── App.tsx             # Главный компонент
├── server/                 # Backend (Node.js + Express)
│   ├── src/
│   │   ├── routes/         # API маршруты
│   │   ├── middleware/     # Middleware (auth)
│   │   ├── config/         # Конфигурация (database)
│   │   └── migrations/     # Миграции БД
│   └── package.json
├── start.sh                # Скрипт запуска обоих серверов
└── package.json            # Frontend зависимости
```

## 🛠 Технологии

### Frontend
- React 18 + TypeScript
- Tailwind CSS
- React Router
- Vite

### Backend
- Node.js + Express
- TypeScript
- PostgreSQL
- JWT (jsonwebtoken)
- bcryptjs для хэширования паролей

## 📡 API Endpoints

### Auth
- `POST /api/auth/register` - Регистрация
- `POST /api/auth/login` - Вход

### User
- `GET /api/user/me` - Получить текущего пользователя (требует токен)
- `PUT /api/user/me` - Обновить профиль (требует токен)

### Health
- `GET /api/health` - Проверка состояния сервера

## 🔧 Разработка

### Проверка конфигурации

```bash
# Проверить бэкенд
cd server
npm run test-server

# Проверить базу данных
npm run check-db
```

### Сборка для продакшна

```bash
# Frontend
npm run build

# Backend
cd server
npm run build
npm start
```

## 🐛 Решение проблем

### Ошибка "Load failed" при регистрации

1. **Проверьте что бэкенд запущен:**
   ```bash
   curl http://localhost:5001/api/health
   ```

2. **Проверьте порт:**
   - Бэкенд должен быть на порту 5001 (или указанном в `.env`)
   - Фронтенд должен использовать правильный `VITE_API_URL`

3. **Проверьте базу данных:**
   ```bash
   cd server
   npm run check-db
   ```

### Порт занят

Если порт 5001 занят:
```bash
# Используйте другой порт
cd server
PORT=5002 npm run dev
```

И обновите `.env`:
```env
VITE_API_URL=http://localhost:5002/api
```

### База данных не подключается

1. **Проверьте что PostgreSQL запущен:**
   ```bash
   brew services list | grep postgresql
   ```

2. **Запустите PostgreSQL:**
   ```bash
   brew services start postgresql@14
   ```

3. **Создайте базу данных:**
   ```bash
   createdb testwebservice
   ```

4. **Проверьте DATABASE_URL в `server/.env`:**
   ```env
   DATABASE_URL=postgresql://localhost:5432/testwebservice
   ```

## 📦 Деплой

### Деплой на Vercel

**Фронтенд:**
1. Загрузите код на GitHub
2. Импортируйте проект в Vercel
3. Настройки:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Добавьте переменную: `VITE_API_URL` = URL вашего бэкенда

**Бэкенд (Railway/Render):**
1. Создайте проект на Railway или Render
2. Подключите GitHub репозиторий
3. Укажите корневую директорию: `server`
4. Добавьте переменные:
   - `DATABASE_URL` (автоматически из PostgreSQL сервиса)
   - `JWT_SECRET`
   - `FRONTEND_URL` (URL вашего фронтенда)

Подробные инструкции в `VERCEL_DEPLOY.md`.

## 📝 Скрипты

### Frontend
- `npm run dev` - Запуск dev сервера
- `npm run build` - Сборка для продакшна

### Backend
- `npm run dev` - Запуск dev сервера
- `npm run build` - Компиляция TypeScript
- `npm start` - Запуск продакшн сервера
- `npm run migrate` - Запуск миграций БД
- `npm run check-db` - Проверка подключения к БД
- `npm run test-server` - Проверка конфигурации

## 🔒 Безопасность

- Пароли хэшируются с помощью bcryptjs
- JWT токены для аутентификации
- CORS настроен для безопасности
- Helmet для защиты заголовков
- Валидация данных на бэкенде

## 📄 Лицензия

MIT
