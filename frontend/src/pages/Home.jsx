import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ArcGallery from '../components/ArcGallery/ArcGallery'

const features = [
  { icon: '🏫', title: 'Boutique School', desc: 'Small class sizes ensuring personal attention for every student.' },
  { icon: '🌍', title: 'International Education', desc: 'Globally recognised curriculum with bilingual excellence.' },
  { icon: '📚', title: 'American Core Curriculum', desc: 'Rigorous standards aligned with American academic benchmarks.' },
  { icon: '🚀', title: 'Door to a Bright Future', desc: 'Preparing students for top universities worldwide.' },
]

const testimonials = [
  { name: 'Ms. Jenna Blemas', role: 'Parent', text: 'I would like to thank CBS administration for giving us the chance to share our experience. I have seen huge improvement in English language and Arabic language with my children.' },
  { name: 'Mr. Ravi Sharma', role: 'Parent', text: 'The teachers are exceptional. My daughter joined CBS in Grade 3 and has flourished academically and socially. Highly recommended school!' },
  { name: 'Dr. Aisha Malik', role: 'Parent', text: 'World-class facilities combined with compassionate teaching staff. CBS truly lives up to its reputation for excellence.' },
]

const calendarEvents = [
  { date: 'Sep 1', label: 'First Installment Fees Due', color: 'bg-red-500' },
  { date: 'Sep 3', label: 'First Day of School — Gr 3–12', color: 'bg-blue-500' },
  { date: 'Sep 5', label: 'First Day of School — Gr K–2', color: 'bg-green-500' },
  { date: 'Sep 10', label: 'KG Extended Day Program Begins', color: 'bg-purple-500' },
  { date: 'Sep 20', label: 'Parent Open House', color: 'bg-orange-500' },
]

export default function Home() {
  return (
    <div className="font-body">
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center bg-dark overflow-hidden pt-16">
        {/* Background image overlay */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1600')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

        {/* Red accent bar */}
        <div className="absolute left-0 top-0 bottom-0 w-2 bg-primary" />

        <div className="relative max-w-7xl mx-auto px-8 py-20">
          <p className="text-primary text-sm font-semibold tracking-[0.3em] uppercase mb-4">
            Bringing Talent to Life
          </p>
          <h1 className="font-heading text-6xl md:text-8xl font-bold text-white leading-none mb-6 uppercase">
            CANADIAN<br />
            <span className="text-primary">BILINGUAL</span><br />
            SCHOOL
          </h1>
          <p className="text-gray-300 text-lg max-w-xl mb-10 leading-relaxed">
            Excellence in bilingual education since 1998. We nurture every child's unique potential in a caring, internationally-minded community.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/fee-payment" className="btn-primary text-base px-8 py-4">
              PAY FEES ONLINE
            </Link>
            <a href="#about" className="btn-outline text-base px-8 py-4">
              ABOUT US
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500">
          <div className="w-px h-10 bg-gray-600 animate-pulse" />
          <span className="text-xs tracking-widest">SCROLL</span>
        </div>
      </section>

      {/* ── About ────────────────────────────────────────────────── */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-primary text-xs font-semibold tracking-[0.3em] uppercase mb-3">Case to Story</p>
            <h2 className="font-heading text-5xl font-bold text-gray-900 mb-6 leading-tight uppercase">
              WELCOME TO <span className="text-primary">CANADIAN</span> BILINGUAL SCHOOL
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              At Canadian Bilingual School, our team is committed to provide the very best for every child and create ever-better learning outcomes with a caring environment where everyone feels happy, safe, and secure.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              With dedication and support from well-experienced professional staff, every child is guided and motivated to develop their full potential in all areas of education. We encourage active participation from parents, teachers and community members.
            </p>
            <Link to="/fee-payment" className="btn-primary inline-flex">
              ENQUIRE NOW →
            </Link>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=700"
              alt="Students learning"
              className="rounded-2xl shadow-2xl w-full object-cover h-80"
            />
            <div className="absolute -bottom-6 -left-6 bg-primary text-white p-6 rounded-2xl shadow-xl">
              <p className="font-heading text-4xl font-bold">25+</p>
              <p className="text-sm font-medium">Years of Excellence</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ────────────────────────────────────────── */}
      <section id="academics" className="py-20 bg-dark">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-14">
            <p className="text-primary text-xs font-semibold tracking-[0.3em] uppercase mb-2">Choose CBS?</p>
            <h2 className="font-heading text-5xl font-bold text-white uppercase">WHY LEARN WITH US?</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={i} className="group bg-gray-900 rounded-2xl p-6 hover:bg-primary transition-all duration-300 cursor-default">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="font-heading text-xl font-bold text-white uppercase mb-2">{f.title}</h3>
                <p className="text-gray-400 group-hover:text-red-100 text-sm leading-relaxed transition">{f.desc}</p>
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
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <button className="text-gray-400 hover:text-primary">‹</button>
                <h3 className="font-heading font-bold text-xl text-gray-900">SEPTEMBER 2025</h3>
                <button className="text-gray-400 hover:text-primary">›</button>
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
              <div key={i} className="bg-gray-50 rounded-2xl p-7 border border-gray-100">
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
            {[
              { icon: '📋', title: 'Registration Enquiry', desc: 'New students may click the link below to submit an inquiry form for admission.' },
              { icon: '💰', title: 'Fee Payment', desc: 'Parents can click the link below and pay fee online. Online payment is safe and secure.' },
              { icon: '👨‍👩‍👧', title: 'Parent Portal', desc: 'Parents of current CBS students can access the parent portal.' },
              { icon: '🔄', title: 'Online Re-Registration', desc: 'Parents of current CBS students may re-register online for the next academic year.' },
            ].map((item, i) => (
              <div key={i} className={`rounded-2xl p-6 border-2 ${i === 1 ? 'bg-primary border-primary text-white' : 'bg-white border-gray-200 hover:border-primary transition'}`}>
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className={`font-heading font-bold text-lg mb-2 uppercase ${i === 1 ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
                <p className={`text-sm leading-relaxed ${i === 1 ? 'text-red-100' : 'text-gray-500'}`}>{item.desc}</p>
                {i === 1 && (
                  <Link to="/fee-payment" className="mt-4 inline-block bg-white text-primary text-sm font-semibold px-4 py-2 rounded-lg hover:bg-red-50 transition">
                    Pay Now →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
