import { Link } from 'react-router-dom'
import BrandLogo from './BrandLogo'
import LineIcon from './LineIcon'

export default function Footer() {
  return (
    <footer className="bg-dark text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <BrandLogo className="mb-4" textClassName="text-white text-lg" imageClassName="h-10" />
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            Excellence in IIT-JEE & NEET coaching since 1998. We nurture talent and guide students to top colleges.
          </p>
          {/* WhatsApp link in footer */}
          <a
            href="https://wa.me/919100000000?text=Hello%2C%20I%20want%20to%20know%20more%20about%20your%20courses"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
          >
            <LineIcon name="message" className="h-4 w-4" />
            WhatsApp Us
          </a>
        </div>

        <div>
          <h4 className="font-heading font-semibold text-lg mb-4 text-primary">QUICK LINKS</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            {[
              { to: '/', label: 'Home' },
              { to: '/about', label: 'About Us' },
              { to: '/courses', label: 'Courses' },
              { to: '/scholarship', label: 'Scholarship Exam' },
              { to: '/faculty', label: 'Faculty' },
              { to: '/blog', label: 'Blog' },
              { to: '/contact', label: 'Contact Us' },
            ].map(l => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-white transition">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-heading font-semibold text-lg mb-4 text-primary">NEWSLETTER</h4>
          <p className="text-sm text-gray-400 mb-3">Subscribe to our newsletter for exam tips and updates</p>
          <div className="flex gap-2">
            <input placeholder="Your email" className="flex-1 bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary" />
            <button className="bg-primary text-white px-3 py-2 rounded text-sm hover:bg-primary-dark transition">→</button>
          </div>
          <div className="mt-6">
            <h4 className="font-heading font-semibold text-base mb-3 text-primary">COURSES</h4>
            <ul className="space-y-1 text-sm text-gray-400">
              {['IIT-JEE (Main & Advanced)', 'NEET UG', 'Foundation (Cl 8–10)', 'Scholarship Prep'].map(c => (
                <li key={c}>
                  <Link to="/courses" className="hover:text-white transition">{c}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h4 className="font-heading font-semibold text-lg mb-4 text-primary">CONTACT US</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex gap-2"><LineIcon name="mapPin" className="mt-0.5 h-4 w-4 flex-shrink-0" />123 Education Avenue, Indore, MP - 452001</li>
            <li className="flex gap-2"><LineIcon name="phone" className="mt-0.5 h-4 w-4 flex-shrink-0" /><a href="tel:+917310000000" className="hover:text-white transition">+91 731 000 0000</a></li>
            <li className="flex gap-2"><LineIcon name="mail" className="mt-0.5 h-4 w-4 flex-shrink-0" /><a href="mailto:info@shaktieducationtrust.org" className="hover:text-white transition">info@shaktieducationtrust.org</a></li>
            <li className="flex gap-2"><LineIcon name="clock" className="mt-0.5 h-4 w-4 flex-shrink-0" />Mon-Sat: 8:00 AM - 6:00 PM</li>
          </ul>
          <div className="flex gap-3 mt-4">
            <a href="#" aria-label="Facebook" className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center text-xs hover:bg-primary hover:border-primary transition">f</a>
            <a href="#" aria-label="Instagram" className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center text-xs hover:bg-primary hover:border-primary transition">in</a>
            <a href="#" aria-label="YouTube" className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center text-xs hover:bg-primary hover:border-primary transition">▶</a>
            <a
              href="https://wa.me/919100000000"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center hover:bg-primary hover:border-primary transition"
            >
              <LineIcon name="message" className="h-4 w-4 text-gray-300" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 text-center text-xs text-gray-500 py-4">
        © {new Date().getFullYear()} Shakti Education Trust. All rights reserved.
      </div>
    </footer>
  )
}
