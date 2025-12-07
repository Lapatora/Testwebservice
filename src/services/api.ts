const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Логируем используемый API URL в режиме разработки
if (import.meta.env.DEV) {
  console.log('🔗 API URL:', API_URL);
}

export interface User {
  id: number;
  name: string;
  email: string;
  bio?: string;
  location?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

class ApiService {
  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = this.getToken();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
      });

      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.json();
          if (errorData.error) {
            errorMessage = errorData.error;
          } else if (errorData.errors && Array.isArray(errorData.errors)) {
            errorMessage = errorData.errors.map((e: any) => e.msg || e.message).join(', ');
          }
        } catch {
          // Если не удалось распарсить JSON, используем текст ответа
          const text = await response.text().catch(() => '');
          errorMessage = text || errorMessage;
        }
        throw new Error(errorMessage);
      }

      return response.json();
    } catch (error: any) {
      // Обработка различных типов ошибок
      if (error instanceof TypeError) {
        if (error.message.includes('fetch') || error.message.includes('Failed to fetch')) {
          throw new Error(`Не удалось подключиться к серверу (${API_URL}). Убедитесь, что бэкенд запущен на порту 5000.`);
        }
        if (error.message.includes('NetworkError')) {
          throw new Error('Ошибка сети. Проверьте подключение к интернету.');
        }
      }
      
      // CORS ошибка
      if (error.message && error.message.includes('CORS')) {
        throw new Error('Ошибка CORS. Проверьте настройки сервера.');
      }
      
      // Если это уже наша ошибка, просто пробрасываем
      if (error.message && !error.message.includes('HTTP error')) {
        throw error;
      }
      
      // Общая ошибка
      throw new Error(error.message || 'Произошла неизвестная ошибка. Попробуйте позже.');
    }
  }

  async register(name: string, email: string, password: string): Promise<AuthResponse> {
    const data = await this.request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    return data;
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const data = await this.request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    return data;
  }

  async getCurrentUser(): Promise<{ user: User }> {
    return this.request<{ user: User }>('/user/me');
  }

  async updateUser(userData: Partial<User>): Promise<{ user: User }> {
    return this.request<{ user: User }>('/user/me', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export const apiService = new ApiService();

