import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Dashboard } from './components/Dashboard';
import { apiService, User } from './services/api';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      // Проверяем доступность API в режиме разработки
      if (import.meta.env.DEV) {
        try {
          const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
          const response = await fetch(`${apiUrl}/health`);
          if (response.ok) {
            console.log('✅ Backend API доступен');
          } else {
            console.warn(`⚠️ Backend API недоступен. Убедитесь, что сервер запущен: ${apiUrl}`);
          }
        } catch (error) {
          console.error('❌ Не удалось подключиться к бэкенду:', error);
          console.log('💡 Запустите бэкенд: cd server && npm run dev');
        }
      }

      if (apiService.isAuthenticated()) {
        try {
          const response = await apiService.getCurrentUser();
          setUser(response.user);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Auth check failed:', error);
          apiService.logout();
          setIsAuthenticated(false);
        }
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await apiService.login(email, password);
      setUser(response.user);
      setIsAuthenticated(true);
    } catch (error: any) {
      throw new Error(error.message || 'Login failed');
    }
  };

  const handleRegister = async (name: string, email: string, password: string) => {
    try {
      const response = await apiService.register(name, email, password);
      setUser(response.user);
      setIsAuthenticated(true);
    } catch (error: any) {
      throw new Error(error.message || 'Registration failed');
    }
  };

  const handleLogout = () => {
    apiService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const handleUpdateUser = async (updatedUser: Partial<User>) => {
    try {
      const response = await apiService.updateUser(updatedUser);
      setUser(response.user);
    } catch (error: any) {
      throw new Error(error.message || 'Update failed');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
        <div className="text-[#c9d1d9]">Loading...</div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home isAuthenticated={isAuthenticated} />} />
        <Route 
          path="/login" 
          element={
            isAuthenticated ? 
            <Navigate to="/dashboard" /> : 
            <Login onLogin={handleLogin} />
          } 
        />
        <Route 
          path="/register" 
          element={
            isAuthenticated ? 
            <Navigate to="/dashboard" /> : 
            <Register onRegister={handleRegister} />
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            isAuthenticated ? 
            <Dashboard user={user} onLogout={handleLogout} onUpdateUser={handleUpdateUser} /> : 
            <Navigate to="/login" />
          } 
        />
      </Routes>
    </Router>
  );
}