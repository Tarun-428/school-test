import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import BrandLogo from './BrandLogo'
import LineIcon from './LineIcon'

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: 'layout', end: true },
  { to: '/admin/students', label: 'Students', icon: 'users' },
  { to: '/admin/faculty', label: 'Faculty', icon: 'bookOpen' },
  { to: '/admin/gallery', label: 'Gallery', icon: 'image' },
  { to: '/admin/transactions', label: 'Transactions', icon: 'creditCard' },
]

export default function AdminSidebar() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <>
      <aside className="hidden md:flex w-64 min-h-screen bg-dark flex-col">
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
              <LineIcon name={icon} className="h-4 w-4" />
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
            <LineIcon name="logout" className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      <nav className="fixed bottom-0 left-0 right-0 z-50 grid grid-cols-6 border-t border-gray-200 bg-white/95 px-1 py-2 shadow-[0_-12px_30px_rgba(3,26,45,0.08)] backdrop-blur md:hidden">
        {navItems.map(({ to, label, icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex min-w-0 flex-col items-center justify-center gap-1 rounded-lg px-1 py-2 text-[0.68rem] font-semibold transition ${
                isActive
                  ? 'bg-primary-light text-primary'
                  : 'text-gray-500 hover:bg-primary-light hover:text-primary'
              }`
            }
          >
            <LineIcon name={icon} className="h-4 w-4" />
            <span className="max-w-full truncate">{label}</span>
          </NavLink>
        ))}
        <button
          onClick={handleLogout}
          className="flex min-w-0 flex-col items-center justify-center gap-1 rounded-lg px-1 py-2 text-[0.68rem] font-semibold text-gray-500 transition hover:bg-primary-light hover:text-primary"
        >
          <LineIcon name="logout" className="h-4 w-4" />
          <span className="max-w-full truncate">Logout</span>
        </button>
      </nav>
    </>
  )
}
