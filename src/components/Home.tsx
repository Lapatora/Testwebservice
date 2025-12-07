import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Zap, Users, CheckCircle, Search } from 'lucide-react';

interface HomeProps {
  isAuthenticated: boolean;
}

export function Home({ isAuthenticated }: HomeProps) {
  return (
    <div className="min-h-screen bg-[#0d1117]">
      {/* Header - GitHub style */}
      <header className="bg-[#161b22] border-b border-[#30363d] sticky top-0 z-50">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-black" />
              </div>
              <span className="text-[#c9d1d9] font-semibold">AppName</span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <Link 
                to="/dashboard" 
                className="px-4 py-2 bg-[#238636] text-white rounded-md hover:bg-[#2ea043] transition-colors text-sm"
              >
                Личный кабинет
              </Link>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="px-4 py-2 text-[#c9d1d9] hover:text-white transition-colors text-sm"
                >
                  Войти
                </Link>
                <Link 
                  to="/register" 
                  className="px-4 py-2 bg-[#238636] text-white rounded-md hover:bg-[#2ea043] transition-colors text-sm"
                >
                  Регистрация
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl mb-6 text-[#c9d1d9]">
            Добро пожаловать в <span className="text-[#58a6ff]">будущее</span>
          </h1>
          <p className="text-xl text-[#7d8590] mb-8 max-w-2xl mx-auto">
            Мощная платформа для управления вашими проектами и достижения целей. 
            Присоединяйтесь к тысячам довольных пользователей.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link 
              to="/register"
              className="px-8 py-4 bg-[#238636] text-white rounded-md hover:bg-[#2ea043] transition-all flex items-center gap-2"
            >
              Начать бесплатно
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 border border-[#30363d] text-[#c9d1d9] rounded-md hover:border-[#58a6ff] hover:text-[#58a6ff] transition-all"
            >
              Узнать больше
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl text-center mb-16 text-[#c9d1d9]">Почему выбирают нас</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#161b22] border border-[#30363d] p-8 rounded-lg hover:border-[#58a6ff] transition-colors">
              <div className="w-14 h-14 bg-[#0d1117] border border-[#30363d] rounded-lg flex items-center justify-center mb-6">
                <Zap className="w-7 h-7 text-[#58a6ff]" />
              </div>
              <h3 className="text-2xl mb-4 text-[#c9d1d9]">Быстро и просто</h3>
              <p className="text-[#7d8590]">
                Интуитивный интерфейс позволяет начать работу за считанные минуты. 
                Никаких сложных настроек.
              </p>
            </div>

            <div className="bg-[#161b22] border border-[#30363d] p-8 rounded-lg hover:border-[#58a6ff] transition-colors">
              <div className="w-14 h-14 bg-[#0d1117] border border-[#30363d] rounded-lg flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-[#58a6ff]" />
              </div>
              <h3 className="text-2xl mb-4 text-[#c9d1d9]">Безопасность</h3>
              <p className="text-[#7d8590]">
                Ваши данные защищены современными методами шифрования. 
                Полная конфиденциальность гарантирована.
              </p>
            </div>

            <div className="bg-[#161b22] border border-[#30363d] p-8 rounded-lg hover:border-[#58a6ff] transition-colors">
              <div className="w-14 h-14 bg-[#0d1117] border border-[#30363d] rounded-lg flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-[#58a6ff]" />
              </div>
              <h3 className="text-2xl mb-4 text-[#c9d1d9]">Командная работа</h3>
              <p className="text-[#7d8590]">
                Эффективное сотрудничество в команде. Делитесь проектами 
                и работайте вместе в реальном времени.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto bg-[#161b22] border border-[#30363d] rounded-lg p-12">
          <h2 className="text-4xl mb-8 text-center text-[#c9d1d9]">Что вы получите</h2>
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
                <CheckCircle className="w-6 h-6 flex-shrink-0 text-[#3fb950]" />
                <span className="text-lg text-[#c9d1d9]">{benefit}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/register"
              className="inline-block px-8 py-4 bg-[#238636] text-white rounded-md hover:bg-[#2ea043] transition-all"
            >
              Попробовать бесплатно
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#161b22] border-t border-[#30363d] py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-black" />
              </div>
              <span className="text-[#c9d1d9]">AppName</span>
            </div>
            <div className="text-sm text-[#7d8590]">
              © 2025 AppName. Все права защищены.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
