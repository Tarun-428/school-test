import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

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
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-center items-start w-1/2 p-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=900')] bg-cover bg-center opacity-20" />
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-heading font-bold">CBS</div>
            <div>
              <p className="font-heading font-bold text-white text-lg leading-none">CANADIAN BILINGUAL</p>
              <p className="text-gray-400 text-xs tracking-widest">SCHOOL MANAGEMENT</p>
            </div>
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
              { label: 'Students', icon: '🎓' },
              { label: 'Faculty', icon: '👨‍🏫' },
              { label: 'Payments', icon: '💳' },
              { label: 'Gallery', icon: '🖼️' },
            ].map(f => (
              <div key={f.label} className="bg-gray-800/50 rounded-xl p-4 flex items-center gap-3">
                <span className="text-xl">{f.icon}</span>
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
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-heading font-bold">CBS</div>
            <p className="font-heading font-bold text-white text-lg">CANADIAN BILINGUAL SCHOOL</p>
          </div>

          <div className="bg-gray-900 rounded-2xl p-10 border border-gray-800">
            <h2 className="font-heading text-3xl font-bold text-white mb-1 uppercase">Sign In</h2>
            <p className="text-gray-500 text-sm mb-8">Enter your admin credentials to continue</p>

            {error && (
              <div className="bg-red-900/40 border border-red-700 text-red-300 rounded-xl px-4 py-3 mb-6 text-sm">
                ⚠️ {error}
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
                className="w-full bg-primary text-white py-3.5 rounded-xl font-semibold text-base hover:bg-primary-dark transition disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Signing in...
                  </>
                ) : 'SIGN IN →'}
              </button>
            </form>
          </div>

          <p className="text-center text-gray-600 text-xs mt-6">
            © {new Date().getFullYear()} Canadian Bilingual School. Admin access only.
          </p>
        </div>
      </div>
    </div>
  )
}
