import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { enquiryService, appointmentService } from '../services'
import PageHero from '../components/PageHero'
import LineIcon from '../components/LineIcon'

const TABS = ['Send Enquiry', 'Book Counselling']
const CONTACT_ITEMS = [
  { icon: 'mapPin', label: 'Address', value: '123 Education Avenue, Indore, Madhya Pradesh - 452001' },
  { icon: 'phone', label: 'Phone', value: '+91 731 000 0000' },
  { icon: 'mail', label: 'Email', value: 'info@shaktieducationtrust.org' },
  { icon: 'clock', label: 'Office Hours', value: 'Monday - Saturday: 8:00 AM - 6:00 PM' },
]

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

      <PageHero
        eyebrow="Contact & Counselling"
        title="Get In Touch"
        description="Reach out for admissions, course enquiries, or book a free personalised counselling session with our academic advisors."
      />

      {/* Contact Details + Map */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-8">
          {/* Contact info */}
          <div className="space-y-6">
            <h2 className="font-heading text-3xl font-bold text-gray-900 uppercase">Our Office</h2>

            {CONTACT_ITEMS.map(item => (
              <div key={item.label} className="flex items-start gap-4 bg-white rounded-lg p-4 border border-gray-200 hover-lift">
                <span className="mt-0.5 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary">
                  <LineIcon name={item.icon} className="h-6 w-6" />
                </span>
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
              className="flex items-center gap-3 bg-primary text-white rounded-lg px-5 py-4 font-semibold hover:bg-primary-dark transition hover-lift"
            >
              <LineIcon name="message" className="h-6 w-6" />
              Chat on WhatsApp
            </a>
          </div>

          {/* Google Maps embed */}
          <div className="rounded-lg overflow-hidden shadow-md border border-gray-200 h-80 lg:h-auto hover-lift">
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
          <div className="flex rounded-lg overflow-hidden border border-gray-300 mb-8">
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
              <div className="motion-panel bg-primary-light border border-primary/20 rounded-lg p-8 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <LineIcon name="checkCircle" className="h-8 w-8" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-green-800 mb-2">Enquiry Sent!</h3>
                <p className="text-green-700 mb-6">We will get back to you within 24 hours.</p>
                <button onClick={() => setEnquiryStatus('')} className="btn-primary">Send Another Enquiry</button>
              </div>
            ) : (
              <form onSubmit={handleEnquirySubmit} className="motion-panel bg-white rounded-lg border border-gray-200 shadow-sm p-8 space-y-4">
                <h2 className="font-heading text-2xl font-bold text-gray-900 uppercase">Send Us a Message</h2>

                <input name="name" value={enquiryForm.name} onChange={handleEnquiryChange} required
                  className="input w-full" placeholder="Full Name *" />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                  {enquiryStatus === 'loading' ? 'Sending…' : 'Submit Enquiry'}
                </button>
              </form>
            )
          )}

          {/* Appointment Booking Form */}
          {tab === 1 && (
            apptStatus === 'success' ? (
              <div className="motion-panel bg-primary-light border border-primary/20 rounded-lg p-8 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <LineIcon name="calendar" className="h-8 w-8" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-green-800 mb-2">Appointment Booked!</h3>
                <p className="text-green-700 mb-6">
                  Our counsellor will confirm your session time via phone call within a few hours.
                </p>
                <button onClick={() => setApptStatus('')} className="btn-primary">Book Another Appointment</button>
              </div>
            ) : (
              <form onSubmit={handleApptSubmit} className="motion-panel bg-white rounded-lg border border-gray-200 shadow-sm p-8 space-y-4">
                <h2 className="font-heading text-2xl font-bold text-gray-900 uppercase">Book a Counselling Session</h2>
                <p className="text-gray-500 text-sm">Our academic advisors offer free 30-minute counselling sessions. Pick a date and time that suits you.</p>

                <input name="name" value={apptForm.name} onChange={handleApptChange} required
                  className="input w-full" placeholder="Full Name *" />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <input name="phone" value={apptForm.phone} onChange={handleApptChange} required
                    className="input" placeholder="Phone *" />
                  <input name="email" type="email" value={apptForm.email} onChange={handleApptChange}
                    className="input" placeholder="Email Address" />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                  {apptStatus === 'loading' ? 'Booking…' : 'Book Counselling Session'}
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
