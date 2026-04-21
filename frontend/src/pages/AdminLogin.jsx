import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import BrandLogo from '../components/BrandLogo'
import GravityStarsBackground from '../components/GravityStarsBackground'
import LineIcon from '../components/LineIcon'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(username, password)
      navigate('/admin')
    } catch {
      setError('Invalid username or password. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark flex">
      <Link
        to="/"
        className="fixed left-5 top-5 z-20 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-primary hover:border-primary"
      >
        <LineIcon name="home" className="h-4 w-4" />
        Home
      </Link>

      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-center items-start w-1/2 p-16 relative overflow-hidden">
        <GravityStarsBackground starsCount={55} movementSpeed={0.15} glowIntensity={12} starsOpacity={0.62} />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,26,45,0.98),rgba(3,26,45,0.72))]" />
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <BrandLogo textClassName="text-white text-lg" imageClassName="h-12" />
          </div>
          <h1 className="font-heading text-6xl font-bold text-white leading-tight uppercase mb-6">
            ADMIN<br/>
            <span className="text-primary">CONTROL</span><br/>
            PANEL
          </h1>
          <p className="text-gray-400 text-lg max-w-sm leading-relaxed">
            Manage students, faculty, fees, gallery and everything from one powerful dashboard.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-4">
            {[
              { label: 'Students', icon: 'users' },
              { label: 'Faculty', icon: 'bookOpen' },
              { label: 'Payments', icon: 'creditCard' },
              { label: 'Gallery', icon: 'image' },
            ].map(f => (
              <div key={f.label} className="bg-gray-800/50 rounded-lg p-4 flex items-center gap-3 hover-lift">
                <LineIcon name={f.icon} className="h-5 w-5 text-primary-light" />
                <span className="text-gray-300 text-sm font-medium">{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right login form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <BrandLogo textClassName="text-white text-lg" imageClassName="h-10" />
          </div>

          <div className="motion-panel bg-gray-900 rounded-lg p-10 border border-gray-800">
            <h2 className="font-heading text-3xl font-bold text-white mb-1 uppercase">Sign In</h2>
            <p className="text-gray-500 text-sm mb-8">Enter your admin credentials to continue</p>

            {error && (
              <div className="motion-panel bg-red-900/40 border border-red-700 text-red-300 rounded-lg px-4 py-3 mb-6 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  required
                  placeholder="admin"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-3.5 rounded-lg font-semibold text-base hover:bg-primary-dark transition disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    SIGN IN
                    <LineIcon name="arrowRight" className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          <p className="text-center text-gray-600 text-xs mt-6">
            © {new Date().getFullYear()} Shakti Education trust. Admin access only.
          </p>
        </div>
      </div>
    </div>
  )
}
