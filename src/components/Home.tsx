import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Zap, Users, CheckCircle } from 'lucide-react';

interface HomeProps {
  isAuthenticated: boolean;
}

export function Home({ isAuthenticated }: HomeProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl">AppName</span>
          </div>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <Link 
                to="/dashboard" 
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
              >
                Личный кабинет
              </Link>
            ) : (
              <>
                <Link to="/login" className="px-6 py-2 text-gray-700 hover:text-blue-600 transition-colors">
                  Войти
                </Link>
                <Link 
                  to="/register" 
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
                >
                  Регистрация
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Добро пожаловать в будущее
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Мощная платформа для управления вашими проектами и достижения целей. 
            Присоединяйтесь к тысячам довольных пользователей.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link 
              to="/register"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-xl transition-all flex items-center gap-2"
            >
              Начать бесплатно
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-all"
            >
              Узнать больше
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl text-center mb-16">Почему выбирают нас</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-2xl mb-4">Быстро и просто</h3>
              <p className="text-gray-600">
                Интуитивный интерфейс позволяет начать работу за считанные минуты. 
                Никаких сложных настроек.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-2xl mb-4">Безопасность</h3>
              <p className="text-gray-600">
                Ваши данные защищены современными методами шифрования. 
                Полная конфиденциальность гарантирована.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-2xl mb-4">Командная работа</h3>
              <p className="text-gray-600">
                Эффективное сотрудничество в команде. Делитесь проектами 
                и работайте вместе в реальном времени.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
          <h2 className="text-4xl mb-8 text-center">Что вы получите</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              'Неограниченное хранилище',
              'Поддержка 24/7',
              'Аналитика и отчеты',
              'Интеграции с популярными сервисами',
              'Мобильное приложение',
              'Регулярные обновления'
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 flex-shrink-0" />
                <span className="text-lg">{benefit}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/register"
              className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg hover:shadow-xl transition-all"
            >
              Попробовать бесплатно
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span>AppName</span>
            </div>
            <div className="text-sm">
              © 2025 AppName. Все права защищены.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
