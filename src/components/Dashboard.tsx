import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { 
  Shield, 
  LogOut, 
  Home, 
  Settings, 
  User, 
  Bell, 
  TrendingUp,
  Activity,
  Clock,
  FileText,
  ChevronRight,
  Star,
  Users,
  Calendar,
  Award,
  Zap,
  Search,
  X,
  Mail,
  MapPin
} from 'lucide-react';

interface DashboardProps {
  user: { name: string; email: string; bio?: string; location?: string } | null;
  onLogout: () => void;
  onUpdateUser: (user: { name?: string; email?: string; bio?: string; location?: string }) => Promise<void>;
}

export function Dashboard({ user, onLogout, onUpdateUser }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [editEmail, setEditEmail] = useState(user?.email || '');
  const [editBio, setEditBio] = useState(user?.bio || '');
  const [editLocation, setEditLocation] = useState(user?.location || '');
  const [searchQuery, setSearchQuery] = useState('');

  // Обновляем поля редактирования при изменении user
  useEffect(() => {
    setEditName(user?.name || '');
    setEditEmail(user?.email || '');
    setEditBio(user?.bio || '');
    setEditLocation(user?.location || '');
  }, [user]);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'analytics', label: 'Analytics', icon: Activity },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const stats = [
    { label: 'Всего проектов', value: '12', icon: FileText, color: 'from-blue-500 to-cyan-500', bg: 'bg-blue-500/10', change: '+12%' },
    { label: 'Активные задачи', value: '28', icon: Activity, color: 'from-green-500 to-emerald-500', bg: 'bg-green-500/10', change: '+8%' },
    { label: 'Завершено', value: '156', icon: TrendingUp, color: 'from-purple-500 to-pink-500', bg: 'bg-purple-500/10', change: '+23%' },
    { label: 'В процессе', value: '8', icon: Clock, color: 'from-orange-500 to-amber-500', bg: 'bg-orange-500/10', change: '+5%' },
  ];

  const recentActivities = [
    { title: 'Завершен проект "Дизайн сайта"', time: '2 часа назад', icon: Award, color: 'text-purple-400' },
    { title: 'Добавлена новая задача', time: '5 часов назад', icon: FileText, color: 'text-blue-400' },
    { title: 'Обновлен профиль', time: '1 день назад', icon: User, color: 'text-green-400' },
    { title: 'Создан новый проект', time: '2 дня назад', icon: Zap, color: 'text-orange-400' },
  ];

  const projects = [
    { name: 'Редизайн сайта', progress: 75, status: 'В работе', color: 'from-blue-500 to-cyan-500' },
    { name: 'Мобильное приложение', progress: 45, status: 'В работе', color: 'from-purple-500 to-pink-500' },
    { name: 'Маркетинг кампания', progress: 90, status: 'Завершается', color: 'from-green-500 to-emerald-500' },
  ];

  const notifications = [
    { id: 1, title: 'Новое сообщение от команды', time: '5 минут назад', unread: true },
    { id: 2, title: 'Обновление проекта "Дизайн"', time: '1 час назад', unread: true },
    { id: 3, title: 'Завершена задача #234', time: '2 часа назад', unread: false },
    { id: 4, title: 'Приглашение в команду', time: '3 часа назад', unread: false },
  ];

  const handleSaveProfile = async () => {
    try {
      await onUpdateUser({
        name: editName,
        email: editEmail,
        bio: editBio,
        location: editLocation,
      });
      setShowEditModal(false);
      // Обновляем локальное состояние после успешного сохранения
      // Это будет обновлено через App.tsx
    } catch (error: any) {
      alert(error.message || 'Ошибка обновления профиля');
    }
  };

  const handleOpenEditModal = () => {
    setEditName(user?.name || '');
    setEditEmail(user?.email || '');
    setEditBio(user?.bio || '');
    setEditLocation(user?.location || '');
    setShowEditModal(true);
  };

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
            </Link>
            
            {/* Search bar - GitHub style */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7d8590]" />
              <input
                type="text"
                placeholder="Search or jump to..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-80 bg-[#0d1117] border border-[#30363d] rounded-md pl-10 pr-4 py-1.5 text-sm text-[#c9d1d9] placeholder-[#7d8590] focus:outline-none focus:border-[#58a6ff]"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 hover:bg-[#30363d]/50 rounded-md transition-colors relative"
              >
                <Bell className="w-5 h-5 text-[#7d8590]" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#1f6feb] rounded-full"></span>
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-[#161b22] border border-[#30363d] rounded-lg shadow-xl z-50">
                  <div className="p-3 border-b border-[#30363d] flex items-center justify-between">
                    <h3 className="text-[#c9d1d9]">Notifications</h3>
                    <button onClick={() => setShowNotifications(false)}>
                      <X className="w-4 h-4 text-[#7d8590] hover:text-[#c9d1d9]" />
                    </button>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-3 border-b border-[#30363d] hover:bg-[#0d1117] cursor-pointer ${
                          notif.unread ? 'bg-[#1f6feb]/5' : ''
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {notif.unread && (
                            <div className="w-2 h-2 bg-[#1f6feb] rounded-full mt-1.5"></div>
                          )}
                          <div className="flex-1">
                            <div className="text-sm text-[#c9d1d9]">{notif.title}</div>
                            <div className="text-xs text-[#7d8590] mt-1">{notif.time}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 pl-3 border-l border-[#30363d]">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs - GitHub style */}
        <div className="px-4 flex gap-2 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm flex items-center gap-2 transition-colors border-b-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-[#c9d1d9] border-[#f78166]'
                    : 'text-[#7d8590] hover:text-[#c9d1d9] border-transparent hover:bg-[#30363d]/30'
                }`}
              >
                {Icon && <Icon className="w-4 h-4" />}
                {tab.label}
              </button>
            );
          })}
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - GitHub style */}
        <aside className="w-72 bg-[#0d1117] border-r border-[#30363d] min-h-[calc(100vh-105px)] p-4">
          {/* User Profile Card */}
          <div className="mb-6 p-4 bg-[#161b22] border border-[#30363d] rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-[#c9d1d9]">{user?.name}</div>
                <div className="text-sm text-[#7d8590]">{user?.email}</div>
              </div>
            </div>
            <button 
              onClick={handleOpenEditModal}
              className="w-full py-1.5 text-sm bg-[#21262d] border border-[#30363d] text-[#c9d1d9] rounded-md hover:bg-[#30363d] transition-colors"
            >
              Edit profile
            </button>
          </div>

          <nav className="space-y-1">
            <button
              onClick={() => setActiveSection('dashboard')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                activeSection === 'dashboard'
                  ? 'text-[#c9d1d9] bg-[#161b22] border border-[#30363d]'
                  : 'text-[#7d8590] hover:text-[#c9d1d9] hover:bg-[#161b22]'
              }`}
            >
              <Home className="w-4 h-4" />
              <span className="text-sm">Dashboard</span>
            </button>
            <button
              onClick={() => setActiveSection('activity')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                activeSection === 'activity'
                  ? 'text-[#c9d1d9] bg-[#161b22] border border-[#30363d]'
                  : 'text-[#7d8590] hover:text-[#c9d1d9] hover:bg-[#161b22]'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span className="text-sm">Activity</span>
            </button>
            <button
              onClick={() => setActiveSection('team')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                activeSection === 'team'
                  ? 'text-[#c9d1d9] bg-[#161b22] border border-[#30363d]'
                  : 'text-[#7d8590] hover:text-[#c9d1d9] hover:bg-[#161b22]'
              }`}
            >
              <Users className="w-4 h-4" />
              <span className="text-sm">Team</span>
            </button>
            <button
              onClick={() => setActiveSection('settings')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                activeSection === 'settings'
                  ? 'text-[#c9d1d9] bg-[#161b22] border border-[#30363d]'
                  : 'text-[#7d8590] hover:text-[#c9d1d9] hover:bg-[#161b22]'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span className="text-sm">Settings</span>
            </button>
          </nav>

          {/* Empty sections for future customization */}
          <div className="mt-6 pt-6 border-t border-[#30363d]">
            <div className="text-xs text-[#7d8590] mb-3">SECTION 1</div>
            <div className="space-y-1">
              <a href="#" className="block px-3 py-2 text-sm text-[#7d8590] hover:text-[#c9d1d9] hover:bg-[#161b22] rounded-md transition-colors">
                Item 1
              </a>
              <a href="#" className="block px-3 py-2 text-sm text-[#7d8590] hover:text-[#c9d1d9] hover:bg-[#161b22] rounded-md transition-colors">
                Item 2
              </a>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-[#30363d]">
            <div className="text-xs text-[#7d8590] mb-3">SECTION 2</div>
            <div className="space-y-1">
              <a href="#" className="block px-3 py-2 text-sm text-[#7d8590] hover:text-[#c9d1d9] hover:bg-[#161b22] rounded-md transition-colors">
                Item 1
              </a>
              <a href="#" className="block px-3 py-2 text-sm text-[#7d8590] hover:text-[#c9d1d9] hover:bg-[#161b22] rounded-md transition-colors">
                Item 2
              </a>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-[#30363d]">
            <Link
              to="/"
              onClick={onLogout}
              className="flex items-center gap-3 px-3 py-2 text-[#f85149] hover:bg-[#161b22] rounded-md transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm">Sign out</span>
            </Link>
          </div>
        </aside>

        {/* Main Content - GitHub style */}
        <main className="flex-1 p-6 bg-[#0d1117]">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Section */}
            <div className="mb-6">
              <h1 className="text-2xl text-[#c9d1d9] mb-1">
                {activeSection === 'dashboard' && `Welcome back, `}
                {activeSection === 'activity' && `Activity `}
                {activeSection === 'team' && `Team `}
                {activeSection === 'settings' && `Settings `}
                <span className="text-[#58a6ff]">{user?.name}</span>
              </h1>
              <p className="text-sm text-[#7d8590] flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date().toLocaleDateString('ru-RU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>

            {/* Dashboard Section */}
            {activeSection === 'dashboard' && (
              <>
                {/* Stats Grid - GitHub style */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <div
                        key={index}
                        className="bg-[#161b22] border border-[#30363d] p-4 rounded-lg hover:border-[#58a6ff] transition-colors"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="w-10 h-10 bg-[#0d1117] rounded-lg flex items-center justify-center">
                            <Icon className="w-5 h-5 text-[#58a6ff]" />
                          </div>
                          <span className="text-[#3fb950] text-xs flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            {stat.change}
                          </span>
                        </div>
                        <div className="text-2xl text-[#c9d1d9] mb-1">{stat.value}</div>
                        <div className="text-xs text-[#7d8590]">{stat.label}</div>
                      </div>
                    );
                  })}
                </div>

                <div className="grid lg:grid-cols-3 gap-4">
                  {/* Projects - GitHub style */}
                  <div className="lg:col-span-2 bg-[#161b22] border border-[#30363d] rounded-lg">
                    <div className="p-4 border-b border-[#30363d] flex items-center justify-between">
                      <h2 className="text-[#c9d1d9]">Active projects</h2>
                      <button className="text-[#58a6ff] hover:text-[#79c0ff] text-sm flex items-center gap-1">
                        View all
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="p-4 space-y-3">
                      {projects.map((project, index) => (
                        <div
                          key={index}
                          className="p-3 bg-[#0d1117] border border-[#30363d] rounded-md hover:border-[#58a6ff] transition-colors"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-sm text-[#c9d1d9]">{project.name}</div>
                            <span className="text-xs px-2 py-0.5 bg-[#1f6feb]/20 text-[#58a6ff] rounded-full border border-[#1f6feb]/30">
                              {project.status}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex-1">
                              <div className="flex justify-between text-xs mb-1.5">
                                <span className="text-[#7d8590]">Progress</span>
                                <span className="text-[#c9d1d9]">{project.progress}%</span>
                              </div>
                              <div className="w-full bg-[#21262d] rounded-full h-1.5 overflow-hidden">
                                <div 
                                  className="bg-[#58a6ff] h-1.5 rounded-full transition-all"
                                  style={{ width: `${project.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Activity - GitHub style */}
                  <div className="bg-[#161b22] border border-[#30363d] rounded-lg">
                    <div className="p-4 border-b border-[#30363d]">
                      <h2 className="text-[#c9d1d9]">Recent activity</h2>
                    </div>
                    <div className="p-4 space-y-3">
                      {recentActivities.map((activity, index) => {
                        const Icon = activity.icon;
                        return (
                          <div
                            key={index}
                            className="flex items-start gap-3 pb-3 border-b border-[#30363d] last:border-b-0 last:pb-0"
                          >
                            <div className="w-8 h-8 bg-[#0d1117] rounded-md flex items-center justify-center flex-shrink-0">
                              <Icon className="w-4 h-4 text-[#58a6ff]" />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm text-[#c9d1d9] mb-1">{activity.title}</div>
                              <div className="text-xs text-[#7d8590]">{activity.time}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Activity Section */}
            {activeSection === 'activity' && (
              <div className="space-y-4">
                <div className="bg-[#161b22] border border-[#30363d] rounded-lg">
                  <div className="p-4 border-b border-[#30363d]">
                    <h2 className="text-[#c9d1d9]">All Activity</h2>
                  </div>
                  <div className="p-4 space-y-3">
                    {recentActivities.map((activity, index) => {
                      const Icon = activity.icon;
                      return (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-3 bg-[#0d1117] border border-[#30363d] rounded-md hover:border-[#58a6ff] transition-colors"
                        >
                          <div className="w-10 h-10 bg-[#161b22] rounded-lg flex items-center justify-center flex-shrink-0">
                            <Icon className="w-5 h-5 text-[#58a6ff]" />
                          </div>
                          <div className="flex-1">
                            <div className="text-sm text-[#c9d1d9] mb-1">{activity.title}</div>
                            <div className="text-xs text-[#7d8590]">{activity.time}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Team Section */}
            {activeSection === 'team' && (
              <div className="space-y-4">
                <div className="bg-[#161b22] border border-[#30363d] rounded-lg">
                  <div className="p-4 border-b border-[#30363d] flex items-center justify-between">
                    <h2 className="text-[#c9d1d9]">Team Members</h2>
                    <button className="px-3 py-1.5 bg-[#238636] text-white rounded-md hover:bg-[#2ea043] transition-colors text-sm">
                      Add member
                    </button>
                  </div>
                  <div className="p-4 space-y-3">
                    {[
                      { name: 'John Doe', role: 'Developer', email: 'john@example.com' },
                      { name: 'Jane Smith', role: 'Designer', email: 'jane@example.com' },
                      { name: 'Bob Johnson', role: 'Manager', email: 'bob@example.com' },
                    ].map((member, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-[#0d1117] border border-[#30363d] rounded-md hover:border-[#58a6ff] transition-colors"
                      >
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm text-[#c9d1d9] font-medium">{member.name}</div>
                          <div className="text-xs text-[#7d8590]">{member.role} • {member.email}</div>
                        </div>
                        <button className="text-[#58a6ff] hover:text-[#79c0ff] text-sm">
                          View
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Settings Section */}
            {activeSection === 'settings' && (
              <div className="space-y-4">
                <div className="bg-[#161b22] border border-[#30363d] rounded-lg">
                  <div className="p-4 border-b border-[#30363d]">
                    <h2 className="text-[#c9d1d9]">Account Settings</h2>
                  </div>
                  <div className="p-4 space-y-4">
                    <div>
                      <label className="block text-sm text-[#c9d1d9] mb-2">Email notifications</label>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4 rounded border-[#30363d]" defaultChecked />
                        <span className="text-sm text-[#7d8590]">Receive email notifications</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-[#c9d1d9] mb-2">Theme</label>
                      <select className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-2 text-[#c9d1d9] focus:outline-none focus:border-[#58a6ff]">
                        <option>Dark</option>
                        <option>Light</option>
                        <option>System</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-[#c9d1d9] mb-2">Language</label>
                      <select className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-2 text-[#c9d1d9] focus:outline-none focus:border-[#58a6ff]">
                        <option>Русский</option>
                        <option>English</option>
                      </select>
                    </div>
                    <div className="pt-4 border-t border-[#30363d]">
                      <button className="px-4 py-2 bg-[#238636] text-white rounded-md hover:bg-[#2ea043] transition-colors">
                        Save changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[#30363d] flex items-center justify-between sticky top-0 bg-[#161b22]">
              <h2 className="text-xl text-[#c9d1d9]">Edit profile</h2>
              <button onClick={() => setShowEditModal(false)}>
                <X className="w-5 h-5 text-[#7d8590] hover:text-[#c9d1d9]" />
              </button>
            </div>

            <div className="p-6">
              {/* Profile Picture */}
              <div className="mb-6">
                <label className="block text-sm text-[#c9d1d9] mb-3">Profile picture</label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  <button className="px-4 py-2 bg-[#21262d] border border-[#30363d] text-[#c9d1d9] text-sm rounded-md hover:bg-[#30363d] transition-colors">
                    Change avatar
                  </button>
                </div>
              </div>

              {/* Name */}
              <div className="mb-4">
                <label className="block text-sm text-[#c9d1d9] mb-2">Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-2 text-[#c9d1d9] focus:outline-none focus:border-[#58a6ff]"
                />
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="block text-sm text-[#c9d1d9] mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-2 text-[#c9d1d9] focus:outline-none focus:border-[#58a6ff]"
                />
              </div>

              {/* Bio */}
              <div className="mb-4">
                <label className="block text-sm text-[#c9d1d9] mb-2">Bio</label>
                <textarea
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  rows={4}
                  placeholder="Tell us about yourself..."
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-2 text-[#c9d1d9] placeholder-[#7d8590] focus:outline-none focus:border-[#58a6ff] resize-none"
                />
              </div>

              {/* Location */}
              <div className="mb-6">
                <label className="block text-sm text-[#c9d1d9] mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Location
                </label>
                <input
                  type="text"
                  value={editLocation}
                  onChange={(e) => setEditLocation(e.target.value)}
                  placeholder="City, Country"
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-2 text-[#c9d1d9] placeholder-[#7d8590] focus:outline-none focus:border-[#58a6ff]"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 justify-end pt-4 border-t border-[#30363d]">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 bg-[#21262d] border border-[#30363d] text-[#c9d1d9] rounded-md hover:bg-[#30363d] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProfile}
                  className="px-4 py-2 bg-[#238636] text-white rounded-md hover:bg-[#2ea043] transition-colors"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}