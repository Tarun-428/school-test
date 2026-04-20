import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import BrandLogo from './BrandLogo'

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: '⊞', end: true },
  { to: '/admin/students', label: 'Students', icon: '🎓' },
  { to: '/admin/faculty', label: 'Faculty', icon: '👨‍🏫' },
  { to: '/admin/gallery', label: 'Gallery', icon: '🖼️' },
  { to: '/admin/transactions', label: 'Transactions', icon: '💳' },
]

export default function AdminSidebar() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <aside className="w-64 min-h-screen bg-dark flex flex-col">
      {/* Brand */}
      <div className="px-6 py-5 border-b border-gray-800">
        <div className="space-y-2">
          <BrandLogo textClassName="text-white text-sm" imageClassName="h-8" />
          <p className="text-gray-500 text-xs pl-1">Admin Panel</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ to, label, icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-primary text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`
            }
          >
            <span className="text-base">{icon}</span>
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-3 pb-6">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:bg-primary/20 hover:text-primary-light transition"
        >
          <span>🚪</span> Logout
        </button>
      </div>
    </aside>
  )
}
