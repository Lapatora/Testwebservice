# Настройка приложения

Это руководство поможет вам настроить приложение под свои нужды.

## Изменение названия приложения

1. Обновите `package.json`:
```json
{
  "name": "your-app-name",
  "description": "Your app description"
}
```

2. Обновите компоненты:
- Найдите все упоминания "AppName" и замените на ваше название
- Обновите логотип в header компонентах

## Настройка цветов (GitHub Theme)

Текущая цветовая схема использует GitHub стиль:

```css
/* Основные цвета */
--bg-primary: #0d1117;      /* Основной фон */
--bg-secondary: #161b22;    /* Вторичный фон */
--border: #30363d;          /* Границы */
--text-primary: #c9d1d9;    /* Основной текст */
--text-secondary: #7d8590;  /* Вторичный текст */
--accent: #58a6ff;          /* Акцентный цвет */
--success: #3fb950;         /* Успех */
--danger: #f85149;          /* Ошибка */
```

Для изменения на свою тему, обновите эти цвета в компонентах.

## Добавление новых вкладок

В `Dashboard.tsx` найдите массив `tabs` и добавьте новую вкладку:

```typescript
const tabs = [
  // ... существующие вкладки
  { id: 'analytics', label: 'Analytics', icon: BarChart },
  { id: 'settings', label: 'Settings', icon: Settings },
];
```

Затем добавьте контент для вкладки:

```typescript
{activeTab === 'analytics' && (
  <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
    <h2>Analytics Content</h2>
    {/* Ваш контент */}
  </div>
)}
```

## Настройка sidebar секций

В файле `Dashboard.tsx` найдите секции sidebar:

```typescript
<div className="mt-6 pt-6 border-t border-[#30363d]">
  <div className="text-xs text-[#7d8590] mb-3">МОЯ СЕКЦИЯ</div>
  <div className="space-y-1">
    <a href="#" className="...">
      Мой элемент 1
    </a>
    <a href="#" className="...">
      Мой элемент 2
    </a>
  </div>
</div>
```

## Добавление Backend секций

Найдите блоки "Backend Section" и настройте их:

```typescript
<div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
  <h3 className="text-[#c9d1d9] mb-3">Моя Backend Секция</h3>
  <p className="text-sm text-[#7d8590] mb-4">
    Описание секции
  </p>
  
  {/* Добавьте ваш контент */}
  {data.map(item => (
    <div key={item.id} className="...">
      {item.name}
    </div>
  ))}
</div>
```

## Настройка статистики

Измените массив `stats` в `Dashboard.tsx`:

```typescript
const stats = [
  { 
    label: 'Моя метрика', 
    value: '42', 
    icon: YourIcon, 
    color: 'from-blue-500 to-cyan-500',
    bg: 'bg-blue-500/10',
    change: '+15%'
  },
  // ... больше метрик
];
```

## Добавление новых страниц

1. Создайте компонент в `/components`:

```typescript
// /components/MyNewPage.tsx
export function MyNewPage() {
  return (
    <div className="min-h-screen bg-[#0d1117]">
      <h1 className="text-[#c9d1d9]">Моя новая страница</h1>
    </div>
  );
}
```

2. Добавьте маршрут в `App.tsx`:

```typescript
import { MyNewPage } from './components/MyNewPage';

// В Routes
<Route path="/my-page" element={<MyNewPage />} />
```

3. Добавьте ссылку в навигацию:

```typescript
<Link to="/my-page">Моя страница</Link>
```

## Настройка проектов

Измените массив `projects`:

```typescript
const projects = [
  { 
    name: 'Мой проект', 
    progress: 60, 
    status: 'В разработке',
    color: 'from-blue-500 to-cyan-500'
  },
  // ... больше проектов
];
```

## Добавление API endpoints

Создайте файл `/services/api.ts`:

```typescript
const API_URL = import.meta.env.VITE_API_URL;

export const api = {
  async getMyData() {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/my-endpoint`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
  },
  
  async postMyData(data: any) {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/my-endpoint`, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return response.json();
  }
};
```

## Использование данных из API

В компоненте:

```typescript
import { useEffect, useState } from 'react';
import { api } from '../services/api';

export function MyComponent() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await api.getMyData();
        setData(result);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {data.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
```

## Изменение логотипа

Замените SVG в header:

```typescript
<div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
  {/* Замените на свой логотип */}
  <img src="/your-logo.svg" alt="Logo" className="w-6 h-6" />
</div>
```

## Добавление уведомлений

Установите библиотеку:

```bash
npm install sonner@2.0.3
```

Используйте в компонентах:

```typescript
import { toast } from 'sonner@2.0.3';

// Успех
toast.success('Операция выполнена успешно!');

// Ошибка
toast.error('Произошла ошибка');

// Информация
toast.info('Важная информация');
```

## Советы по кастомизации

1. **Сохраняйте консистентность** - используйте одинаковые отступы и стили
2. **Тестируйте на разных экранах** - проверьте адаптивность
3. **Документируйте изменения** - оставляйте комментарии в коде
4. **Используйте переменные** - для повторяющихся значений
5. **Следуйте GitHub стилю** - для единообразия интерфейса
