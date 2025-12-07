# Интеграция с Backend

Это руководство поможет вам интегрировать ваш бэкенд с приложением.

## Структура API

### Аутентификация

#### POST /api/auth/register
Регистрация нового пользователя

**Request:**
```json
{
  "name": "Иван Иванов",
  "email": "ivan@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "user_123",
    "name": "Иван Иванов",
    "email": "ivan@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### POST /api/auth/login
Вход пользователя

**Request:**
```json
{
  "email": "ivan@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "user_123",
    "name": "Иван Иванов",
    "email": "ivan@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### POST /api/auth/logout
Выход пользователя

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully logged out"
}
```

## Пример интеграции

### 1. Создайте API сервис

Создайте файл `/services/api.ts`:

```typescript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const api = {
  async login(email: string, password: string) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    if (!response.ok) {
      throw new Error('Login failed');
    }
    
    return response.json();
  },

  async register(name: string, email: string, password: string) {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    
    if (!response.ok) {
      throw new Error('Registration failed');
    }
    
    return response.json();
  },

  async logout(token: string) {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    return response.json();
  },

  async getProfile(token: string) {
    const response = await fetch(`${API_URL}/user/profile`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    return response.json();
  }
};
```

### 2. Обновите App.tsx

```typescript
import { api } from './services/api';

const handleLogin = async (email: string, password: string) => {
  try {
    const data = await api.login(email, password);
    setUser(data.user);
    setIsAuthenticated(true);
    localStorage.setItem('token', data.token);
  } catch (error) {
    console.error('Login error:', error);
    // Показать ошибку пользователю
  }
};

const handleRegister = async (name: string, email: string, password: string) => {
  try {
    const data = await api.register(name, email, password);
    setUser(data.user);
    setIsAuthenticated(true);
    localStorage.setItem('token', data.token);
  } catch (error) {
    console.error('Registration error:', error);
    // Показать ошибку пользователю
  }
};

const handleLogout = async () => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      await api.logout(token);
    }
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  } catch (error) {
    console.error('Logout error:', error);
  }
};
```

### 3. Добавьте обработку ошибок

```typescript
export class APIError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
  }
}

async function handleResponse(response: Response) {
  if (!response.ok) {
    const error = await response.json();
    throw new APIError(response.status, error.message || 'API Error');
  }
  return response.json();
}
```

### 4. Добавьте interceptor для токенов

```typescript
export async function authenticatedFetch(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem('token');
  
  const headers = {
    ...options.headers,
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  const response = await fetch(url, { ...options, headers });
  
  if (response.status === 401) {
    // Токен истек - перенаправить на логин
    localStorage.removeItem('token');
    window.location.href = '/login';
    throw new Error('Unauthorized');
  }
  
  return response;
}
```

## Backend технологии

Рекомендуемые стеки для бэкенда:

### Node.js + Express
```bash
npm install express cors dotenv jsonwebtoken bcrypt
```

### Node.js + Fastify
```bash
npm install fastify @fastify/cors @fastify/jwt bcrypt
```

### Python + FastAPI
```bash
pip install fastapi uvicorn python-jose passlib python-multipart
```

## База данных

Рекомендуемые варианты:

- **PostgreSQL** - для реляционных данных
- **MongoDB** - для документо-ориентированных данных
- **Redis** - для кэширования и сессий
- **Supabase** - полный backend as a service

## Безопасность

1. Всегда используйте HTTPS в продакшене
2. Храните токены в localStorage или httpOnly cookies
3. Валидируйте все входные данные
4. Используйте bcrypt для хеширования паролей
5. Реализуйте rate limiting
6. Добавьте CORS политику

## Примеры бэкенда

### Express.js

```javascript
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());

app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  
  // Хешируем пароль
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // Сохраняем пользователя в БД
  const user = await db.users.create({
    name,
    email,
    password: hashedPassword
  });
  
  // Создаем JWT токен
  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
  
  res.json({
    success: true,
    user: { id: user.id, name: user.name, email: user.email },
    token
  });
});

app.listen(3000);
```

## Полезные ссылки

- [Express.js Documentation](https://expressjs.com/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [JWT.io](https://jwt.io/)
- [Supabase Documentation](https://supabase.com/docs)
