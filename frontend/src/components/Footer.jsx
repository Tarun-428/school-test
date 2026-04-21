import { Link } from 'react-router-dom'
import BrandLogo from './BrandLogo'

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
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-4 h-4 fill-white">
              <path d="M16.004 2C8.28 2 2 8.278 2 16c0 2.44.638 4.73 1.752 6.718L2 30l7.476-1.732A13.935 13.935 0 0 0 16.004 30C23.726 30 30 23.724 30 16 30 8.278 23.726 2 16.004 2zm0 2.154c6.534 0 11.842 5.306 11.842 11.846 0 6.538-5.308 11.844-11.842 11.844a11.78 11.78 0 0 1-5.998-1.638l-.43-.258-4.44 1.028.99-4.32-.282-.446A11.78 11.78 0 0 1 4.162 16c0-6.54 5.31-11.846 11.842-11.846zm-3.22 5.44a1.23 1.23 0 0 0-.87.396c-.3.326-1.14 1.11-1.14 2.71 0 1.6 1.164 3.144 1.326 3.36.162.216 2.28 3.488 5.526 4.754 2.718 1.068 3.27.856 3.858.8.588-.056 1.9-.776 2.168-1.524.27-.748.27-1.388.19-1.524-.08-.134-.294-.214-.618-.374-.324-.162-1.9-.938-2.196-1.044-.296-.108-.512-.162-.728.162-.216.324-.836 1.044-1.024 1.26-.188.216-.376.244-.7.082-.324-.162-1.366-.504-2.602-1.604-.962-.854-1.612-1.912-1.8-2.234-.188-.324-.02-.5.142-.66.146-.144.324-.374.486-.562.16-.188.212-.324.318-.54.106-.216.054-.406-.026-.568-.08-.162-.716-1.728-.98-2.368-.258-.622-.522-.524-.728-.532-.188-.006-.404-.008-.62-.008z" />
            </svg>
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
            <li>📍 123 Education Avenue, Indore, MP – 452001</li>
            <li>📞 <a href="tel:+917310000000" className="hover:text-white transition">+91 731 000 0000</a></li>
            <li>✉️ <a href="mailto:info@shaktieducationtrust.org" className="hover:text-white transition">info@shaktieducationtrust.org</a></li>
            <li>🕗 Mon–Sat: 8:00 AM – 6:00 PM</li>
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
              className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center hover:bg-green-500 hover:border-green-500 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-4 h-4 fill-gray-300">
                <path d="M16.004 2C8.28 2 2 8.278 2 16c0 2.44.638 4.73 1.752 6.718L2 30l7.476-1.732A13.935 13.935 0 0 0 16.004 30C23.726 30 30 23.724 30 16 30 8.278 23.726 2 16.004 2zm0 2.154c6.534 0 11.842 5.306 11.842 11.846 0 6.538-5.308 11.844-11.842 11.844a11.78 11.78 0 0 1-5.998-1.638l-.43-.258-4.44 1.028.99-4.32-.282-.446A11.78 11.78 0 0 1 4.162 16c0-6.54 5.31-11.846 11.842-11.846zm-3.22 5.44a1.23 1.23 0 0 0-.87.396c-.3.326-1.14 1.11-1.14 2.71 0 1.6 1.164 3.144 1.326 3.36.162.216 2.28 3.488 5.526 4.754 2.718 1.068 3.27.856 3.858.8.588-.056 1.9-.776 2.168-1.524.27-.748.27-1.388.19-1.524-.08-.134-.294-.214-.618-.374-.324-.162-1.9-.938-2.196-1.044-.296-.108-.512-.162-.728.162-.216.324-.836 1.044-1.024 1.26-.188.216-.376.244-.7.082-.324-.162-1.366-.504-2.602-1.604-.962-.854-1.612-1.912-1.8-2.234-.188-.324-.02-.5.142-.66.146-.144.324-.374.486-.562.16-.188.212-.324.318-.54.106-.216.054-.406-.026-.568-.08-.162-.716-1.728-.98-2.368-.258-.622-.522-.524-.728-.532-.188-.006-.404-.008-.62-.008z" />
              </svg>
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

