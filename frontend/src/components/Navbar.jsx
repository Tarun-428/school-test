import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import BrandLogo from './BrandLogo'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const lastScrollY = useRef(0)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY
      const delta = currentY - lastScrollY.current

      if (currentY <= 10) {
        setIsVisible(true)
      } else if (Math.abs(delta) > 6) {
        setIsVisible(delta < 0)
      }

      lastScrollY.current = currentY
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { to: '/', label: 'Home' },
    { to: '/fee-payment', label: 'Fee Payment' },
    { to: '/about', label: 'About Us' },
    { to: '/academics', label: 'Academics' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/contact', label: 'Contact' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-white shadow-md transition-transform duration-300 ${
      isVisible || open ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <BrandLogo
            textClassName="text-gray-900 text-sm"
            imageClassName="h-10"
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === l.to ? 'text-primary' : 'text-gray-700'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/admin/login"
            className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-dark transition"
          >
            LOGIN
          </Link>
        </div>

        {/* Hamburger */}
        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          <div className={`w-5 h-0.5 bg-gray-800 transition-all ${open ? 'rotate-45 translate-y-1.5' : ''}`} />
          <div className={`w-5 h-0.5 bg-gray-800 my-1 transition-all ${open ? 'opacity-0' : ''}`} />
          <div className={`w-5 h-0.5 bg-gray-800 transition-all ${open ? '-rotate-45 -translate-y-1.5' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4">
          {links.map(l => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)}
              className="block py-2.5 text-sm text-gray-700 hover:text-primary border-b border-gray-50">
              {l.label}
            </Link>
          ))}
          <Link to="/admin/login" className="block mt-3 btn-primary text-center text-sm">
            LOGIN
          </Link>
        </div>
      )}
    </nav>
  )
}
