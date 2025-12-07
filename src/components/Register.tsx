import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Mail, Lock, User, ArrowLeft } from 'lucide-react';

interface RegisterProps {
  onRegister: (name: string, email: string, password: string) => void;
}

export function Register({ onRegister }: RegisterProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: {
      name?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    if (!name) {
      newErrors.name = 'Введите имя';
    } else if (name.length < 2) {
      newErrors.name = 'Минимум 2 символа';
    }

    if (!email) {
      newErrors.email = 'Введите email';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Некорректный email';
    }

    if (!password) {
      newErrors.password = 'Введите пароль';
    } else if (password.length < 6) {
      newErrors.password = 'Минимум 6 символов';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Подтвердите пароль';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onRegister(name, email, password);
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          На главную
        </Link>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
              <Shield className="w-9 h-9 text-white" />
            </div>
          </div>

          <h1 className="text-3xl text-center mb-2">Регистрация</h1>
          <p className="text-gray-600 text-center mb-8">
            Создайте аккаунт, чтобы начать
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm mb-2 text-gray-700">
                Имя
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:border-blue-600 transition-colors ${
                    errors.name ? 'border-red-500' : 'border-gray-200'
                  }`}
                  placeholder="Иван Иванов"
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm mb-2 text-gray-700">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:border-blue-600 transition-colors ${
                    errors.email ? 'border-red-500' : 'border-gray-200'
                  }`}
                  placeholder="ваш@email.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm mb-2 text-gray-700">
                Пароль
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:border-blue-600 transition-colors ${
                    errors.password ? 'border-red-500' : 'border-gray-200'
                  }`}
                  placeholder="••••••••"
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div>
              <label className="block text-sm mb-2 text-gray-700">
                Подтвердите пароль
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:border-blue-600 transition-colors ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-200'
                  }`}
                  placeholder="••••••••"
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            <div>
              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 mt-0.5 rounded border-gray-300" required />
                <span className="text-sm text-gray-600">
                  Я согласен с условиями использования и политикой конфиденциальности
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all"
            >
              Зарегистрироваться
            </button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-gray-600">Уже есть аккаунт? </span>
            <Link to="/login" className="text-blue-600 hover:text-blue-700">
              Войти
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
