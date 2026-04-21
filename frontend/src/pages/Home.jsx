import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ArcGallery from '../components/ArcGallery/ArcGallery'
import WhatsAppButton from '../components/WhatsAppButton'
import GravityStarsBackground from '../components/GravityStarsBackground'
import LineIcon from '../components/LineIcon'
import CountUp from '../components/CountUp'
import { enquiryService } from '../services'

const features = [
  { icon: 'atom', title: 'IIT-JEE Preparation', desc: 'Comprehensive Physics, Chemistry & Maths coaching for IIT-JEE Main & Advanced.' },
  { icon: 'heartPulse', title: 'NEET UG Coaching', desc: 'NCERT-focused Biology, Physics & Chemistry programme for NEET aspirants.' },
  { icon: 'bookOpen', title: 'Foundation Course', desc: 'Build analytical skills and competitive edge from Class 8 onwards.' },
  { icon: 'trophy', title: 'Scholarship Exam', desc: 'Earn up to 100% scholarship on course fees through our SETSE exam.' },
]

const courseHighlights = [
  { icon: 'atom', title: 'IIT-JEE', badge: '2-Year & 1-Year', color: 'from-primary to-blue-700', link: '/courses' },
  { icon: 'heartPulse', title: 'NEET UG', badge: '2-Year & 1-Year', color: 'from-sky-500 to-primary', link: '/courses' },
  { icon: 'bookOpen', title: 'Foundation', badge: 'Class 8-10', color: 'from-cyan-500 to-blue-600', link: '/courses' },
  { icon: 'trophy', title: 'Scholarship Prep', badge: '3 Months', color: 'from-blue-700 to-dark-card', link: '/scholarship' },
]

const results = [
  { number: '50+', label: 'IIT Selections (2025)' },
  { number: '80+', label: 'NEET Qualifiers (2025)' },
  { number: '100%', label: 'Max Scholarship Available' },
  { number: '25+', label: 'Years of Excellence' },
]

const testimonials = [
  { name: 'Ms. Jenna Blemas', role: 'Parent', text: 'I would like to thank Shakti Education trust administration for giving us the chance to share our experience. I have seen huge improvement in English language and Arabic language with my children.' },
  { name: 'Mr. Ravi Sharma', role: 'Parent', text: 'The teachers are exceptional. My daughter joined Shakti Education trust in Grade 3 and has flourished academically and socially. Highly recommended school!' },
  { name: 'Dr. Aisha Malik', role: 'Parent', text: 'World-class facilities combined with compassionate teaching staff. Shakti Education trust truly lives up to its reputation for excellence.' },
]

const calendarEvents = [
  { date: 'Sep 1', label: 'First Installment Fees Due', color: 'bg-blue-700' },
  { date: 'Sep 3', label: 'First Day of School — Gr 3–12', color: 'bg-sky-600' },
  { date: 'Sep 5', label: 'First Day of School — Gr K–2', color: 'bg-cyan-500' },
  { date: 'Sep 10', label: 'KG Extended Day Program Begins', color: 'bg-blue-500' },
  { date: 'Sep 20', label: 'Parent Open House', color: 'bg-indigo-500' },
]

const quickLinks = [
  { icon: 'clipboard', title: 'Registration Enquiry', desc: 'New students may click the link below to submit an inquiry form for admission.' },
  { icon: 'creditCard', title: 'Fee Payment', desc: 'Parents can click the link below and pay fee online. Online payment is safe and secure.' },
  { icon: 'users', title: 'Parent Portal', desc: 'Parents of current Shakti Education trust students can access the parent portal.' },
  { icon: 'refresh', title: 'Online Re-Registration', desc: 'Parents of current Shakti Education trust students may re-register online for the next academic year.' },
]

export default function Home() {
  const [enqForm, setEnqForm] = useState({ name: '', phone: '', course_interest: 'general' })
  const [enqStatus, setEnqStatus] = useState('')

  const handleEnqChange = (e) => setEnqForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleEnqSubmit = async (e) => {
    e.preventDefault()
    if (!enqForm.name || !enqForm.phone) return
    setEnqStatus('loading')
    try {
      await enquiryService.submit({ ...enqForm, source: 'website' })
      setEnqStatus('success')
      setEnqForm({ name: '', phone: '', course_interest: 'general' })
    } catch {
      setEnqStatus('error')
    }
  }

  return (
    <div className="font-body">
      <Navbar />
      <WhatsAppButton />

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center bg-dark overflow-hidden pt-16">
        <GravityStarsBackground
          starsCount={95}
          starsSize={2}
          glowIntensity={18}
          movementSpeed={0.22}
          mouseInfluence={140}
          gravityStrength={80}
          starsInteraction
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(10,132,216,0.28),transparent_30%),linear-gradient(90deg,rgba(3,26,45,0.98),rgba(3,26,45,0.82)_48%,rgba(3,26,45,0.45))]" />
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary" />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 py-20">
          <p className="animate-fade-up text-primary-light text-sm font-semibold uppercase mb-4">
            Bringing Talent to Life
          </p>
          <h1 className="animate-fade-up animation-delay-100 font-heading text-5xl sm:text-6xl md:text-8xl font-bold text-white leading-none mb-6 uppercase">
            SHAKTI<br />
            <span className="text-primary">EDUCATION</span><br />
            TRUST
          </h1>
          <p className="animate-fade-up animation-delay-200 text-blue-50/85 text-lg max-w-xl mb-10 leading-relaxed">
            Excellence in education since 1998. We nurture every child's unique potential in a caring, future-ready community.
          </p>
          <div className="animate-fade-up animation-delay-300 flex flex-wrap gap-4">
            <Link to="/courses" className="btn-primary inline-flex items-center gap-2 text-base px-8 py-4">
              EXPLORE COURSES
              <LineIcon name="arrowRight" className="h-4 w-4" />
            </Link>
            <Link to="/scholarship" className="btn-outline text-base px-8 py-4">
              WIN SCHOLARSHIP
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-blue-100/60">
          <div className="w-px h-10 bg-blue-100/35 animate-pulse" />
          <span className="text-xs tracking-widest">SCROLL</span>
        </div>
      </section>

      {/* ── About ────────────────────────────────────────────────── */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-primary text-xs font-semibold tracking-[0.3em] uppercase mb-3">Case to Story</p>
            <h2 className="font-heading text-5xl font-bold text-gray-900 mb-6 leading-tight uppercase">
              WELCOME TO <span className="text-primary">SHAKTI</span> EDUCATION TRUST
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              At Shakti Education trust, our team is committed to provide the very best for every child and create ever-better learning outcomes with a caring environment where everyone feels happy, safe, and secure.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              With dedication and support from well-experienced professional staff, every child is guided and motivated to develop their full potential in all areas of education. We encourage active participation from parents, teachers and community members.
            </p>
            <Link to="/contact" className="btn-primary inline-flex">
              ENQUIRE NOW →
            </Link>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=700"
              alt="Students learning"
              className="rounded-lg shadow-2xl w-full object-cover h-80"
            />
            <div className="absolute -bottom-6 -left-6 bg-primary text-white p-6 rounded-lg shadow-xl">
              <p className="font-heading text-4xl font-bold"><CountUp value="25+" /></p>
              <p className="text-sm font-medium">Years of Excellence</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Courses Overview ─────────────────────────────────────── */}
      <section id="courses" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-14">
            <p className="text-primary text-xs font-semibold tracking-[0.3em] uppercase mb-2">Programmes</p>
            <h2 className="font-heading text-5xl font-bold text-gray-900 uppercase">OUR COURSES</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {courseHighlights.map((c) => (
              <Link
                key={c.title}
                to={c.link}
                className={`bg-gradient-to-br ${c.color} text-white rounded-lg p-6 flex min-h-52 flex-col items-start gap-3 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl`}
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/15 text-white ring-1 ring-white/20">
                  <LineIcon name={c.icon} className="h-7 w-7" />
                </span>
                <div>
                  <p className="font-heading text-xl font-bold uppercase">{c.title}</p>
                  <p className="text-sm opacity-80">{c.badge}</p>
                </div>
                <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold">
                  Learn More
                  <LineIcon name="arrowRight" className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link to="/courses" className="btn-primary px-8 py-3">View All Courses & Fees</Link>
          </div>
        </div>
      </section>

      {/* ── Results & Achievements ────────────────────────────────── */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-12">
            <p className="text-blue-200 text-xs font-semibold tracking-[0.3em] uppercase mb-2">Results</p>
            <h2 className="font-heading text-5xl font-bold uppercase">OUR ACHIEVEMENTS</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {results.map((r) => (
              <div key={r.label} className="text-center">
                <p className="font-heading text-5xl font-bold mb-2"><CountUp value={r.number} /></p>
                <p className="text-blue-100 text-sm font-medium">{r.label}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/scholarship" className="bg-white text-primary font-bold px-8 py-3 rounded-xl hover:bg-gray-100 transition inline-block">
              Apply for Scholarship →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ────────────────────────────────────────── */}
      <section id="academics" className="py-20 bg-dark">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-14">
            <p className="text-primary text-xs font-semibold tracking-[0.3em] uppercase mb-2">Choose Shakti?</p>
            <h2 className="font-heading text-5xl font-bold text-white uppercase">WHY LEARN WITH US?</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={i} className="group rounded-lg border border-white/10 bg-dark-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/70 hover:bg-primary cursor-default">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/15 text-primary-light ring-1 ring-white/10 group-hover:bg-white/15 group-hover:text-white">
                  <LineIcon name={f.icon} className="h-7 w-7" />
                </div>
                <h3 className="font-heading text-xl font-bold text-white uppercase mb-2">{f.title}</h3>
                <p className="text-gray-400 group-hover:text-blue-100 text-sm leading-relaxed transition">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Academic Calendar ─────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-12">
            <p className="text-primary text-xs font-semibold tracking-[0.3em] uppercase mb-2">Important Dates</p>
            <h2 className="font-heading text-5xl font-bold text-gray-900 uppercase">ACADEMIC CALENDAR</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-10 items-start">
            {/* Mini calendar */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <button className="text-gray-400 hover:text-primary" aria-label="Previous month">
                  <LineIcon name="chevronLeft" className="h-5 w-5" />
                </button>
                <h3 className="font-heading font-bold text-xl text-gray-900">SEPTEMBER 2025</h3>
                <button className="text-gray-400 hover:text-primary" aria-label="Next month">
                  <LineIcon name="chevronRight" className="h-5 w-5" />
                </button>
              </div>
              <div className="grid grid-cols-7 text-center text-xs text-gray-500 font-semibold mb-2">
                {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => <div key={d}>{d}</div>)}
              </div>
              <div className="grid grid-cols-7 text-center text-sm gap-y-1">
                {/* Empty cells for Sep 1 = Monday */}
                <div />
                {Array.from({length: 30}, (_, i) => {
                  const day = i + 1
                  const isEvent = [1,3,5,10,20].includes(day)
                  return (
                    <div key={day} className={`w-8 h-8 mx-auto flex items-center justify-center rounded-full text-xs cursor-default
                      ${isEvent ? 'bg-primary text-white font-bold' : 'text-gray-700 hover:bg-gray-100'}`}>
                      {day}
                    </div>
                  )
                })}
              </div>
            </div>
            {/* Events list */}
            <div className="space-y-3">
              {calendarEvents.map((ev, i) => (
                <div key={i} className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm">
                  <span className={`w-3 h-3 rounded-full flex-shrink-0 ${ev.color}`} />
                  <span className="text-xs font-semibold text-gray-500 w-12 flex-shrink-0">{ev.date}</span>
                  <span className="text-sm text-gray-800 font-medium">{ev.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-12">
            <p className="text-primary text-xs font-semibold tracking-[0.3em] uppercase mb-2">Testimonial</p>
            <h2 className="font-heading text-5xl font-bold text-gray-900 uppercase">WHAT PARENTS SAY<br/>ABOUT US</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-7 border border-gray-100">
                <div className="text-primary text-5xl font-serif leading-none mb-4">"</div>
                <p className="text-gray-700 text-sm leading-relaxed mb-6 italic">{t.text}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ArcGallery />

      {/* ── Quick Links / Contact ─────────────────────────────────── */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-10">
            <p className="text-primary text-xs font-semibold tracking-[0.3em] uppercase mb-2">Contact Us</p>
            <h2 className="font-heading text-5xl font-bold text-gray-900 uppercase">QUICK LINK TO CONNECT</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((item, i) => (
              <div key={i} className={`rounded-lg p-6 border ${i === 1 ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' : 'bg-white border-gray-200 hover:border-primary transition'}`}>
                <div className={`mb-3 flex h-11 w-11 items-center justify-center rounded-lg ${i === 1 ? 'bg-white/15 text-white' : 'bg-primary-light text-primary'}`}>
                  <LineIcon name={item.icon} className="h-6 w-6" />
                </div>
                <h3 className={`font-heading font-bold text-lg mb-2 uppercase ${i === 1 ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
                <p className={`text-sm leading-relaxed ${i === 1 ? 'text-blue-100' : 'text-gray-500'}`}>{item.desc}</p>
                {i === 1 && (
                  <Link to="/fee-payment" className="mt-4 inline-flex items-center gap-2 bg-dark-card text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-primary-dark transition">
                    Pay Now
                    <LineIcon name="arrowRight" className="h-4 w-4" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quick Enquiry Form ───────────────────────────────────── */}
      <section className="py-20 bg-dark text-white">
        <div className="max-w-5xl mx-auto px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-primary text-xs font-semibold tracking-[0.3em] uppercase mb-3">Get Started</p>
            <h2 className="font-heading text-4xl font-bold uppercase mb-4">
              Start Your <span className="text-primary">Success Journey</span> Today
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Drop your details and our counsellor will reach out within 24 hours to guide you towards the
              right course and help you win a scholarship.
            </p>
            <a
              href="https://wa.me/919100000000?text=Hello%2C%20I%20want%20to%20enquire%20about%20courses"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-lg transition"
            >
              <LineIcon name="message" className="h-5 w-5" />
              Chat on WhatsApp
            </a>
          </div>

          {enqStatus === 'success' ? (
            <div className="bg-gray-800 rounded-lg p-8 text-center border border-gray-700">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-primary/15 text-primary-light">
                <LineIcon name="checkCircle" className="h-8 w-8" />
              </div>
              <h3 className="font-heading text-2xl font-bold mb-2">Enquiry Received!</h3>
              <p className="text-gray-400 mb-5">Our counsellor will call you within 24 hours.</p>
              <button onClick={() => setEnqStatus('')} className="btn-primary inline-flex items-center gap-2">
                Submit Another
                <LineIcon name="arrowRight" className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <form onSubmit={handleEnqSubmit} className="bg-gray-800 rounded-lg p-8 border border-gray-700 space-y-4">
              <h3 className="font-heading text-xl font-bold uppercase">Quick Enquiry</h3>

              <input
                name="name" value={enqForm.name} onChange={handleEnqChange} required
                className="w-full bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary"
                placeholder="Your Name *"
              />
              <input
                name="phone" value={enqForm.phone} onChange={handleEnqChange} required
                className="w-full bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary"
                placeholder="Phone Number *"
              />
              <select
                name="course_interest" value={enqForm.course_interest} onChange={handleEnqChange}
                className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary"
              >
                <option value="general">General Enquiry</option>
                <option value="iit_jee">IIT-JEE</option>
                <option value="neet_ug">NEET UG</option>
                <option value="foundation">Foundation (Class 8–10)</option>
                <option value="scholarship">Scholarship Exam</option>
              </select>

              {enqStatus === 'error' && (
                <p className="text-red-400 text-xs">Submission failed. Please call us directly.</p>
              )}

              <button type="submit" disabled={enqStatus === 'loading'} className="btn-primary w-full py-3 inline-flex items-center justify-center gap-2">
                {enqStatus === 'loading' ? 'Sending…' : 'Get Free Counselling'}
                {enqStatus !== 'loading' && <LineIcon name="arrowRight" className="h-4 w-4" />}
              </button>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
