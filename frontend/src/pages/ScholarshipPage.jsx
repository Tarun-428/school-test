import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { enquiryService } from '../services'
import PageHero from '../components/PageHero'
import LineIcon from '../components/LineIcon'
import CountUp from '../components/CountUp'

const SYLLABUS = {
  'Class 8–9': ['Number Systems', 'Algebra', 'Geometry', 'Science Basics', 'General Aptitude'],
  'Class 10': ['Advanced Algebra', 'Trigonometry', 'Physics Concepts', 'Chemistry Basics', 'Logical Reasoning'],
  'Class 11–12': ['Mathematics (JEE/NEET level)', 'Physics', 'Chemistry', 'Biology', 'Mental Ability'],
}

const DATES = [
  { label: 'Registration Opens', date: 'Rolling Admissions' },
  { label: 'Exam Date', date: 'Every 1st Sunday of the Month' },
  { label: 'Result Declaration', date: 'Within 7 Working Days' },
  { label: 'Scholarship Award', date: 'Before Course Commencement' },
]

const SCHOLARSHIPS = [
  { rank: '1st Rank', discount: '100%', label: 'Full Scholarship', color: 'bg-primary text-white' },
  { rank: '2nd Rank', discount: '75%', label: 'Merit Scholarship', color: 'bg-blue-700 text-white' },
  { rank: '3rd Rank', discount: '50%', label: 'Excellence Award', color: 'bg-sky-600 text-white' },
  { rank: 'Top 10%', discount: '25%', label: 'Merit Award', color: 'bg-primary-light text-primary-dark' },
]

export default function ScholarshipPage() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', student_class: '', course_interest: 'scholarship', message: '',
  })
  const [status, setStatus] = useState('')

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.phone) return
    setStatus('loading')
    try {
      await enquiryService.submit({
        name: form.name,
        email: form.email,
        phone: form.phone,
        course_interest: 'scholarship',
        message: `Class: ${form.student_class}. ${form.message}`,
        source: 'website',
      })
      setStatus('success')
      setForm({ name: '', email: '', phone: '', student_class: '', course_interest: 'scholarship', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="font-body bg-white min-h-screen">
      <Navbar />

      <PageHero
        eyebrow="Scholarship Exam"
        title={<>Shakti Education Trust<br />Scholarship Exam</>}
        description="Earn up to 100% scholarship on your course fees. Register for SETSE and unlock a world-class education at little to no cost."
      />

      {/* Overview + Key Dates */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-10">
          {/* Overview */}
          <div>
            <h2 className="font-heading text-3xl font-bold text-gray-900 uppercase mb-5">About SETSE</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              The <strong>Shakti Education Trust Scholarship Exam (SETSE)</strong> is conducted monthly for students of
              Classes 8–12 who wish to join our IIT-JEE, NEET UG, Foundation, or other programmes.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Based on performance, students receive fee waivers ranging from 25% to 100%. The exam covers
              Mathematics, Science, Reasoning, and General Aptitude appropriate to the class.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4">
              {SCHOLARSHIPS.map(s => (
                <div key={s.rank} className={`${s.color} rounded-lg p-4 text-center hover-lift`}>
                  <p className="text-2xl font-bold"><CountUp value={s.discount} /></p>
                  <p className="font-semibold text-sm">{s.label}</p>
                  <p className="text-xs opacity-75 mt-1">{s.rank}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Key Dates */}
          <div>
            <h2 className="font-heading text-3xl font-bold text-gray-900 uppercase mb-5">Key Dates</h2>
            <div className="space-y-3 mb-6">
              {DATES.map(d => (
                <div key={d.label} className="flex items-center gap-4 bg-white rounded-lg p-4 border border-gray-200 hover-lift">
                  <span className="w-3 h-3 rounded-full bg-primary flex-shrink-0" />
                  <span className="text-sm font-semibold text-gray-800 flex-1">{d.label}</span>
                  <span className="text-sm text-gray-600">{d.date}</span>
                </div>
              ))}
            </div>
            <div className="bg-primary/10 border border-primary/30 rounded-lg p-5 motion-panel">
              <p className="text-primary font-semibold text-sm mb-1">Free Demo Class Available</p>
              <p className="text-gray-700 text-sm">
                Students can attend a free demo class before the exam to evaluate teaching quality.
                Contact us to schedule.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility & Syllabus */}
      <section className="py-14">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-heading text-3xl font-bold text-gray-900 uppercase mb-2 text-center">Eligibility & Syllabus</h2>
          <p className="text-gray-500 text-center mb-10">The exam is open to all students in Classes 8–12.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {Object.entries(SYLLABUS).map(([cls, topics]) => (
              <div key={cls} className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm hover-lift">
                <h3 className="font-heading text-xl font-bold text-gray-900 uppercase mb-4">{cls}</h3>
                <ul className="space-y-2">
                  {topics.map(t => (
                    <li key={t} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="text-primary font-bold">•</span> {t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-8">
            <p className="text-primary text-xs font-semibold tracking-[0.3em] uppercase mb-2">Online Registration</p>
            <h2 className="font-heading text-4xl font-bold text-gray-900 uppercase">Register for SETSE</h2>
            <p className="text-gray-500 mt-2">Fill the form below and our team will contact you within 24 hours.</p>
          </div>

          {status === 'success' ? (
            <div className="motion-panel bg-primary-light border border-primary/20 rounded-lg p-8 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-primary/15 text-primary">
                <LineIcon name="checkCircle" className="h-8 w-8" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-green-800 mb-2">Registration Submitted!</h3>
              <p className="text-green-700 mb-6">Our counsellor will call you within 24 hours to confirm your exam slot.</p>
              <button onClick={() => setStatus('')} className="btn-primary">Register Another Student</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="motion-panel bg-white rounded-lg border border-gray-200 shadow-sm p-8 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name *</label>
                  <input
                    name="name" value={form.name} onChange={handleChange} required
                    className="input w-full" placeholder="Student's full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Phone *</label>
                  <input
                    name="phone" value={form.phone} onChange={handleChange} required
                    className="input w-full" placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                  <input
                    name="email" type="email" value={form.email} onChange={handleChange}
                    className="input w-full" placeholder="email@example.com"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Current Class *</label>
                  <select name="student_class" value={form.student_class} onChange={handleChange} required className="input w-full">
                    <option value="">Select Class</option>
                    {['Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12', 'Dropper'].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Message / Additional Info</label>
                  <textarea
                    name="message" value={form.message} onChange={handleChange}
                    className="input w-full min-h-24" placeholder="Anything you'd like us to know..."
                  />
                </div>
              </div>

              {status === 'error' && (
                <p className="text-red-600 text-sm">Something went wrong. Please try again or call us directly.</p>
              )}

              <button type="submit" disabled={status === 'loading'} className="btn-primary w-full text-base py-3 inline-flex items-center justify-center gap-2">
                {status === 'loading' ? 'Submitting…' : 'Register for SETSE'}
                {status !== 'loading' && <LineIcon name="arrowRight" className="h-4 w-4" />}
              </button>

              <p className="text-xs text-gray-500 text-center">
                By registering you agree to be contacted by our counselling team.
              </p>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
