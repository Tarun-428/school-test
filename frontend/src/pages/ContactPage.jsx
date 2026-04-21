import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { enquiryService, appointmentService } from '../services'

const TABS = ['Send Enquiry', 'Book Counselling']

export default function ContactPage() {
  const [tab, setTab] = useState(0)

  const [enquiryForm, setEnquiryForm] = useState({
    name: '', email: '', phone: '', course_interest: 'general', message: '',
  })
  const [enquiryStatus, setEnquiryStatus] = useState('')

  const [apptForm, setApptForm] = useState({
    name: '', email: '', phone: '', preferred_date: '', preferred_time: '', course_interest: '', notes: '',
  })
  const [apptStatus, setApptStatus] = useState('')

  const handleEnquiryChange = (e) =>
    setEnquiryForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleEnquirySubmit = async (e) => {
    e.preventDefault()
    if (!enquiryForm.name || !enquiryForm.phone) return
    setEnquiryStatus('loading')
    try {
      await enquiryService.submit({ ...enquiryForm, source: 'website' })
      setEnquiryStatus('success')
      setEnquiryForm({ name: '', email: '', phone: '', course_interest: 'general', message: '' })
    } catch {
      setEnquiryStatus('error')
    }
  }

  const handleApptChange = (e) =>
    setApptForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleApptSubmit = async (e) => {
    e.preventDefault()
    if (!apptForm.name || !apptForm.phone || !apptForm.preferred_date || !apptForm.preferred_time) return
    setApptStatus('loading')
    try {
      await appointmentService.book(apptForm)
      setApptStatus('success')
      setApptForm({ name: '', email: '', phone: '', preferred_date: '', preferred_time: '', course_interest: '', notes: '' })
    } catch {
      setApptStatus('error')
    }
  }

  return (
    <div className="font-body bg-white min-h-screen">
      <Navbar />

      <section className="pt-28 pb-16 bg-dark text-white">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-primary text-xs font-semibold tracking-[0.3em] uppercase mb-3">Contact & Counselling</p>
          <h1 className="font-heading text-5xl md:text-6xl font-bold uppercase mb-4">Get In Touch</h1>
          <p className="text-gray-300 max-w-3xl leading-relaxed">
            Reach out for admissions, course enquiries, or book a free personalised counselling session
            with our academic advisors.
          </p>
        </div>
      </section>

      {/* Contact Details + Map */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-8">
          {/* Contact info */}
          <div className="space-y-6">
            <h2 className="font-heading text-3xl font-bold text-gray-900 uppercase">Our Office</h2>

            {[
              { icon: '📍', label: 'Address', value: '123 Education Avenue, Indore, Madhya Pradesh – 452001' },
              { icon: '📞', label: 'Phone', value: '+91 731 000 0000' },
              { icon: '✉️', label: 'Email', value: 'info@shaktieducationtrust.org' },
              { icon: '🕗', label: 'Office Hours', value: 'Monday – Saturday: 8:00 AM – 6:00 PM' },
            ].map(item => (
              <div key={item.label} className="flex items-start gap-4 bg-white rounded-xl p-4 border border-gray-200">
                <span className="text-2xl mt-0.5">{item.icon}</span>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-0.5">{item.label}</p>
                  <p className="text-gray-800 font-medium">{item.value}</p>
                </div>
              </div>
            ))}

            {/* WhatsApp quick link */}
            <a
              href="https://wa.me/919100000000?text=Hello%2C%20I%20want%20to%20know%20more%20about%20your%20courses"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-green-500 text-white rounded-xl px-5 py-4 font-semibold hover:bg-green-600 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-6 h-6 fill-white">
                <path d="M16.004 2C8.28 2 2 8.278 2 16c0 2.44.638 4.73 1.752 6.718L2 30l7.476-1.732A13.935 13.935 0 0 0 16.004 30C23.726 30 30 23.724 30 16 30 8.278 23.726 2 16.004 2zm0 2.154c6.534 0 11.842 5.306 11.842 11.846 0 6.538-5.308 11.844-11.842 11.844a11.78 11.78 0 0 1-5.998-1.638l-.43-.258-4.44 1.028.99-4.32-.282-.446A11.78 11.78 0 0 1 4.162 16c0-6.54 5.31-11.846 11.842-11.846zm-3.22 5.44a1.23 1.23 0 0 0-.87.396c-.3.326-1.14 1.11-1.14 2.71 0 1.6 1.164 3.144 1.326 3.36.162.216 2.28 3.488 5.526 4.754 2.718 1.068 3.27.856 3.858.8.588-.056 1.9-.776 2.168-1.524.27-.748.27-1.388.19-1.524-.08-.134-.294-.214-.618-.374-.324-.162-1.9-.938-2.196-1.044-.296-.108-.512-.162-.728.162-.216.324-.836 1.044-1.024 1.26-.188.216-.376.244-.7.082-.324-.162-1.366-.504-2.602-1.604-.962-.854-1.612-1.912-1.8-2.234-.188-.324-.02-.5.142-.66.146-.144.324-.374.486-.562.16-.188.212-.324.318-.54.106-.216.054-.406-.026-.568-.08-.162-.716-1.728-.98-2.368-.258-.622-.522-.524-.728-.532-.188-.006-.404-.008-.62-.008z" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>

          {/* Google Maps embed */}
          <div className="rounded-2xl overflow-hidden shadow-md border border-gray-200 h-80 lg:h-auto">
            <iframe
              title="Shakti Education Trust Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3681.0388!2d75.8577!3d22.7196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDQzJzEwLjYiTiA3NcKwNTEnMjcuNyJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '320px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* Enquiry / Appointment tabs */}
      <section className="py-14">
        <div className="max-w-2xl mx-auto px-6">
          {/* Tab switcher */}
          <div className="flex rounded-xl overflow-hidden border border-gray-300 mb-8">
            {TABS.map((t, i) => (
              <button
                key={t}
                onClick={() => setTab(i)}
                className={`flex-1 py-3 text-sm font-semibold transition ${
                  tab === i ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Enquiry Form */}
          {tab === 0 && (
            enquiryStatus === 'success' ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="font-heading text-2xl font-bold text-green-800 mb-2">Enquiry Sent!</h3>
                <p className="text-green-700 mb-6">We will get back to you within 24 hours.</p>
                <button onClick={() => setEnquiryStatus('')} className="btn-primary">Send Another Enquiry</button>
              </div>
            ) : (
              <form onSubmit={handleEnquirySubmit} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 space-y-4">
                <h2 className="font-heading text-2xl font-bold text-gray-900 uppercase">Send Us a Message</h2>

                <input name="name" value={enquiryForm.name} onChange={handleEnquiryChange} required
                  className="input w-full" placeholder="Full Name *" />

                <div className="grid grid-cols-2 gap-4">
                  <input name="phone" value={enquiryForm.phone} onChange={handleEnquiryChange} required
                    className="input" placeholder="Phone *" />
                  <input name="email" type="email" value={enquiryForm.email} onChange={handleEnquiryChange}
                    className="input" placeholder="Email Address" />
                </div>

                <select name="course_interest" value={enquiryForm.course_interest} onChange={handleEnquiryChange} className="input w-full">
                  <option value="general">General Enquiry</option>
                  <option value="iit_jee">IIT-JEE</option>
                  <option value="neet_ug">NEET UG</option>
                  <option value="foundation">Foundation</option>
                  <option value="scholarship">Scholarship Exam</option>
                </select>

                <textarea name="message" value={enquiryForm.message} onChange={handleEnquiryChange}
                  className="input w-full min-h-28" placeholder="Your message or question..." />

                {enquiryStatus === 'error' && (
                  <p className="text-red-600 text-sm">Could not submit. Please call us directly at +91 731 000 0000.</p>
                )}

                <button type="submit" disabled={enquiryStatus === 'loading'} className="btn-primary w-full py-3">
                  {enquiryStatus === 'loading' ? 'Sending…' : 'Submit Enquiry →'}
                </button>
              </form>
            )
          )}

          {/* Appointment Booking Form */}
          {tab === 1 && (
            apptStatus === 'success' ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                <div className="text-5xl mb-4">📅</div>
                <h3 className="font-heading text-2xl font-bold text-green-800 mb-2">Appointment Booked!</h3>
                <p className="text-green-700 mb-6">
                  Our counsellor will confirm your session time via phone call within a few hours.
                </p>
                <button onClick={() => setApptStatus('')} className="btn-primary">Book Another Appointment</button>
              </div>
            ) : (
              <form onSubmit={handleApptSubmit} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 space-y-4">
                <h2 className="font-heading text-2xl font-bold text-gray-900 uppercase">Book a Counselling Session</h2>
                <p className="text-gray-500 text-sm">Our academic advisors offer free 30-minute counselling sessions. Pick a date and time that suits you.</p>

                <input name="name" value={apptForm.name} onChange={handleApptChange} required
                  className="input w-full" placeholder="Full Name *" />

                <div className="grid grid-cols-2 gap-4">
                  <input name="phone" value={apptForm.phone} onChange={handleApptChange} required
                    className="input" placeholder="Phone *" />
                  <input name="email" type="email" value={apptForm.email} onChange={handleApptChange}
                    className="input" placeholder="Email Address" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Preferred Date *</label>
                    <input name="preferred_date" type="date" value={apptForm.preferred_date} onChange={handleApptChange} required
                      className="input w-full" min={new Date().toISOString().split('T')[0]} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Preferred Time *</label>
                    <select name="preferred_time" value={apptForm.preferred_time} onChange={handleApptChange} required className="input w-full">
                      <option value="">Select time</option>
                      {['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'].map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <select name="course_interest" value={apptForm.course_interest} onChange={handleApptChange} className="input w-full">
                  <option value="">Course Interest (optional)</option>
                  <option value="iit_jee">IIT-JEE</option>
                  <option value="neet_ug">NEET UG</option>
                  <option value="foundation">Foundation</option>
                  <option value="scholarship">Scholarship Exam</option>
                  <option value="general">General Guidance</option>
                </select>

                <textarea name="notes" value={apptForm.notes} onChange={handleApptChange}
                  className="input w-full min-h-20" placeholder="Any specific questions or topics you'd like to discuss?" />

                {apptStatus === 'error' && (
                  <p className="text-red-600 text-sm">Could not book appointment. Please call us at +91 731 000 0000.</p>
                )}

                <button type="submit" disabled={apptStatus === 'loading'} className="btn-primary w-full py-3">
                  {apptStatus === 'loading' ? 'Booking…' : 'Book Counselling Session →'}
                </button>

                <p className="text-xs text-gray-400 text-center">
                  Free 30-min session • No obligation • Expert academic guidance
                </p>
              </form>
            )
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}

