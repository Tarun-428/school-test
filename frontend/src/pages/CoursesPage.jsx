import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PageHero from '../components/PageHero'
import LineIcon from '../components/LineIcon'

const COURSES = [
  {
    id: 'iit-jee',
    category: 'iit_jee',
    badge: 'IIT-JEE',
    color: 'from-primary to-blue-700',
    title: 'IIT-JEE (Main & Advanced)',
    tagline: "Crack India's Most Competitive Engineering Entrance",
    description:
      'Our IIT-JEE programme offers systematic coverage of Physics, Chemistry, and Mathematics with expert faculty, regular mock tests, and personalised doubt-clearing sessions.',
    eligibility: 'Class 11 / 12 or Dropper (Class 12 passed)',
    duration: '1 Year / 2 Year',
    highlights: [
      'Expert faculty with IIT/NIT background',
      'Daily practice problems (DPPs)',
      'Weekly full-length mock tests',
      'Doubt-clearing sessions 6 days a week',
      'Online test portal access',
      'Study material & printed notes',
    ],
    icon: 'atom',
  },
  {
    id: 'neet-ug',
    category: 'neet_ug',
    badge: 'NEET UG',
    color: 'from-sky-500 to-primary',
    title: 'NEET UG',
    tagline: 'Your Gateway to Medical Colleges Across India',
    description:
      'Comprehensive NEET UG preparation covering Biology, Physics, and Chemistry with NCERT-focused approach, regular NEET-pattern mock exams, and biology-first methodology.',
    eligibility: 'Class 11 / 12 or Dropper (Class 12 passed)',
    duration: '1 Year / 2 Year',
    highlights: [
      'NCERT mastery & beyond',
      'Chapter-wise & full-length NEET mocks',
      'Biology-centric teaching approach',
      'Previous 10 years question analysis',
      'Regular progress tracking',
      'Personalised counselling',
    ],
    icon: 'heartPulse',
  },
  {
    id: 'foundation',
    category: 'foundation',
    badge: 'Foundation',
    color: 'from-cyan-500 to-blue-600',
    title: 'Foundation Programme (Class 8–10)',
    tagline: 'Build a Rock-Solid Base for JEE & NEET Early On',
    description:
      'The Foundation course bridges school curriculum with competitive exam requirements. Students in Class 8–10 build analytical skills and problem-solving ability for future JEE / NEET success.',
    eligibility: 'Students in Class 8, 9, or 10',
    duration: '1 Year per class',
    highlights: [
      'School + competitive exam integration',
      'Mental aptitude & IQ development',
      'Science Olympiad & NTSE preparation',
      'Strong conceptual foundation',
      'Career awareness sessions',
      'Parent-teacher progress meetings',
    ],
    icon: 'bookOpen',
  },
  {
    id: 'scholarship-prep',
    category: 'scholarship',
    badge: 'Scholarship',
    color: 'from-blue-700 to-dark-card',
    title: 'Scholarship Exam Preparation',
    tagline: 'Win Scholarships & Reduce Your Education Cost',
    description:
      'Dedicated programme for Shakti Education Trust Scholarship Exam (SETSE) and other scholarship tests. Covers reasoning, aptitude, mathematics, and science at competitive levels.',
    eligibility: 'Class 8–12 students',
    duration: '3 Months',
    highlights: [
      'SETSE mock tests & model papers',
      'Speed & accuracy training',
      'Reasoning & aptitude coaching',
      'Scholarship up to 100% on merit',
      'Flexible batch timings',
      'Free demo class available',
    ],
    icon: 'trophy',
  },
]

export default function CoursesPage() {
  const [active, setActive] = useState('all')

  const tabs = [
    { key: 'all', label: 'All Courses' },
    { key: 'iit_jee', label: 'IIT-JEE' },
    { key: 'neet_ug', label: 'NEET UG' },
    { key: 'foundation', label: 'Foundation' },
    { key: 'scholarship', label: 'Scholarship' },
  ]

  const displayed = active === 'all' ? COURSES : COURSES.filter(c => c.category === active)

  return (
    <div className="font-body bg-white min-h-screen">
      <Navbar />

      <PageHero
        eyebrow="Our Courses"
        title="Programmes We Offer"
        description="From IIT-JEE and NEET UG to Foundation and Scholarship prep, our courses are designed by expert educators to maximise your success potential."
      >
        <div className="flex flex-wrap gap-4">
          <Link to="/scholarship" className="btn-primary inline-flex items-center gap-2">
            Apply for Scholarship
            <LineIcon name="arrowRight" className="h-4 w-4" />
          </Link>
          <Link to="/contact" className="btn-outline">Book a Free Demo</Link>
        </div>
      </PageHero>

      {/* Filter tabs */}
      <section className="bg-gray-50 border-b border-gray-200 sticky top-16 z-30">
        <div className="max-w-6xl mx-auto px-6 flex gap-2 py-3 overflow-x-auto">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition ${
                active === t.key
                  ? 'bg-primary text-white shadow-md shadow-primary/20'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-primary hover:text-primary'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </section>

      {/* Course cards */}
      <section className="py-14">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8">
          {displayed.map(course => (
            <article key={course.id} className="rounded-lg border border-gray-200 shadow-sm overflow-hidden bg-white hover-lift">
              {/* Header */}
              <div className={`bg-gradient-to-br ${course.color} text-white px-6 py-5 flex items-center gap-4`}>
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/15 ring-1 ring-white/20">
                  <LineIcon name={course.icon} className="h-7 w-7" />
                </span>
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest opacity-80">{course.badge}</span>
                  <h2 className="font-heading text-2xl font-bold">{course.title}</h2>
                  <p className="text-sm opacity-90 mt-0.5">{course.tagline}</p>
                </div>
              </div>

              {/* Body */}
              <div className="p-6">
                <p className="text-gray-700 text-sm leading-relaxed mb-5">{course.description}</p>

                <div className="grid grid-cols-1 gap-3 mb-5 sm:grid-cols-2">
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Eligibility</p>
                    <p className="text-sm text-gray-800 font-medium">{course.eligibility}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Duration</p>
                    <p className="text-sm text-gray-800 font-medium">{course.duration}</p>
                  </div>
                </div>

                <ul className="space-y-1 mb-6">
                  {course.highlights.map((h, i) => (
                    <li key={i} className="flex gap-2 text-sm text-gray-700">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link to="/contact" className="btn-primary text-sm flex-1 text-center">
                    Enquire Now
                  </Link>
                  <Link to="/scholarship" className="btn-outline text-sm flex-1 text-center">
                    Apply
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-14 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-heading text-4xl font-bold uppercase mb-4">Not Sure Which Course is Right for You?</h2>
          <p className="text-blue-100 mb-8 text-lg">
            Book a free 30-minute counselling session with our academic advisor and get personalised guidance.
          </p>
          <Link to="/contact" className="bg-white text-primary font-bold px-8 py-4 rounded-lg hover:bg-gray-100 transition inline-flex items-center gap-2">
            Book Free Counselling Session
            <LineIcon name="arrowRight" className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
