import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-dark text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center font-heading font-bold">CBS</div>
            <span className="font-heading font-bold text-lg">CANADIAN<br/>BILINGUAL SCHOOL</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Bringing talent to life. We provide world-class bilingual education with a caring, nurturing environment.
          </p>
        </div>

        <div>
          <h4 className="font-heading font-semibold text-lg mb-4 text-primary">QUICK LINKS</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            {['Home','About Us','Academics','Admissions','Community','Careers'].map(l => (
              <li key={l}><a href="#" className="hover:text-white transition">{l}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-heading font-semibold text-lg mb-4 text-primary">NEWSLETTER</h4>
          <p className="text-sm text-gray-400 mb-3">Subscribe to our school newsletter</p>
          <div className="flex gap-2">
            <input placeholder="Your email" className="flex-1 bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary" />
            <button className="bg-primary text-white px-3 py-2 rounded text-sm hover:bg-primary-dark transition">→</button>
          </div>
        </div>

        <div>
          <h4 className="font-heading font-semibold text-lg mb-4 text-primary">CONTACT US</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>📍 123 School Ave, Ottawa, Canada</li>
            <li>📞 +1 (555) 123-4567</li>
            <li>✉️ info@cbs.edu.ca</li>
          </ul>
          <div className="flex gap-3 mt-4">
            {['f','in','▶'].map(s => (
              <a key={s} href="#" className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center text-xs hover:bg-primary hover:border-primary transition">
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 text-center text-xs text-gray-500 py-4">
        © {new Date().getFullYear()} Canadian Bilingual School. All rights reserved.
      </div>
    </footer>
  )
}
