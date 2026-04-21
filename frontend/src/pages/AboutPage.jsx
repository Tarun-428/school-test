import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const leadership = [
  {
    name: 'Shri Ramesh Agarwal',
    role: 'Founder & Chairman',
    bio: 'A visionary educationist with 30+ years in the field of competitive exam coaching, Mr. Agarwal founded Shakti Education Trust with a mission to make quality education accessible to every student in Central India.',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800',
  },
  {
    name: 'Dr. Priya Sharma',
    role: 'Director – Academics',
    bio: 'An IIT alumna and gold medallist, Dr. Sharma brings world-class academic leadership to our IIT-JEE and NEET programmes, ensuring the highest teaching standards.',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800',
  },
  {
    name: 'Mr. Vikram Joshi',
    role: 'Head of Student Affairs',
    bio: 'With a background in student counselling and psychology, Mr. Joshi ensures every student receives the support they need to perform at their best.',
    photo: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=800',
  },
]

const infrastructure = [
  { icon: '🖥️', title: 'Smart Classrooms', desc: 'Modern digital classrooms equipped with projectors, smart boards, and high-speed internet.' },
  { icon: '🔬', title: 'Science Labs', desc: 'Fully equipped Physics, Chemistry, and Biology laboratories for hands-on learning.' },
  { icon: '📖', title: 'Library & Resource Centre', desc: 'Extensive library with thousands of books, previous years papers, and digital resources.' },
  { icon: '🏃', title: 'Sports Facilities', desc: 'Indoor and outdoor sports facilities for holistic physical development.' },
  { icon: '🍽️', title: 'Cafeteria', desc: 'Hygienic and nutritious meals served in a comfortable cafeteria environment.' },
  { icon: '🚌', title: 'Transportation', desc: 'Safe and reliable transport service covering major routes in the city.' },
]

export default function AboutPage() {
  return (
    <div className="font-body bg-white min-h-screen">
      <Navbar />

      <section className="pt-28 pb-16 bg-dark text-white">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-primary text-xs font-semibold tracking-[0.3em] uppercase mb-3">About Us</p>
          <h1 className="font-heading text-5xl md:text-6xl font-bold uppercase mb-4">
            Shakti Education Trust
          </h1>
          <p className="text-gray-300 max-w-3xl leading-relaxed">
            Established in 1998, Shakti Education Trust has been a beacon of academic excellence in Central India,
            guiding thousands of students to top engineering and medical colleges.
          </p>
        </div>
      </section>

      {/* Trust Introduction */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-primary text-xs font-semibold tracking-[0.3em] uppercase mb-3">Our Story</p>
            <h2 className="font-heading text-4xl font-bold text-gray-900 uppercase mb-4">Who We Are</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Shakti Education Trust was founded with a simple but powerful belief: every child deserves access to
              world-class coaching, regardless of their economic background. Starting with a single classroom in
              1998, we have grown into one of the most trusted coaching institutes in Madhya Pradesh.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Today, we offer comprehensive coaching for IIT-JEE, NEET UG, and Foundation courses, supported by
              an experienced faculty team, state-of-the-art infrastructure, and a culture of continuous improvement.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { number: '1998', label: 'Established' },
                { number: '10,000+', label: 'Alumni' },
                { number: '98%', label: 'Selection Rate' },
              ].map(s => (
                <div key={s.label} className="text-center bg-gray-50 rounded-xl p-4">
                  <p className="font-heading text-2xl font-bold text-primary">{s.number}</p>
                  <p className="text-xs text-gray-600 font-medium">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200"
            alt="Students in classroom"
            className="rounded-2xl shadow-lg w-full h-80 object-cover"
          />
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="font-heading text-4xl font-bold text-gray-900 uppercase">Vision & Mission</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-primary text-white rounded-2xl p-8">
              <div className="text-4xl mb-4">🔭</div>
              <h3 className="font-heading text-2xl font-bold uppercase mb-3">Our Vision</h3>
              <p className="text-blue-100 leading-relaxed">
                To be the most trusted and impactful educational institution in India, producing future leaders,
                scientists, and doctors who contribute positively to society and the world.
              </p>
            </div>
            <div className="bg-white border-2 border-primary rounded-2xl p-8">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="font-heading text-2xl font-bold text-gray-900 uppercase mb-3">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                To provide excellent, affordable, and student-centred coaching that builds not only academic
                knowledge but also character, resilience, and critical thinking skills.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-heading text-4xl font-bold text-gray-900 uppercase mb-8 text-center">Our Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { title: 'Respect', desc: 'We build a culture of empathy, kindness, and mutual respect.' },
              { title: 'Excellence', desc: 'We set high standards and support every student to reach them.' },
              { title: 'Creativity', desc: 'We encourage curiosity, innovation, and independent thinking.' },
              { title: 'Responsibility', desc: 'We prepare students to become responsible global citizens.' },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl border border-gray-200 p-5">
                <h3 className="font-heading text-xl font-bold uppercase text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Profiles */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-primary text-xs font-semibold tracking-[0.3em] uppercase mb-2">Leadership</p>
            <h2 className="font-heading text-4xl font-bold text-gray-900 uppercase">Meet Our Leaders</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {leadership.map(leader => (
              <div key={leader.name} className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                <img src={leader.photo} alt={leader.name} className="w-full h-56 object-cover object-top" />
                <div className="p-5">
                  <h3 className="font-heading text-xl font-bold text-gray-900 mb-0.5">{leader.name}</h3>
                  <p className="text-primary text-sm font-semibold mb-3">{leader.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{leader.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-primary text-xs font-semibold tracking-[0.3em] uppercase mb-2">Facilities</p>
            <h2 className="font-heading text-4xl font-bold text-gray-900 uppercase">Our Infrastructure</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {infrastructure.map(item => (
              <div key={item.title} className="flex items-start gap-4 bg-gray-50 rounded-xl p-5 border border-gray-100">
                <span className="text-3xl mt-0.5">{item.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-primary text-white text-center">
        <h2 className="font-heading text-4xl font-bold uppercase mb-4">Ready to Join Shakti Education Trust?</h2>
        <p className="text-blue-100 mb-7 text-lg">Book a free counselling session or apply for our scholarship exam today.</p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link to="/courses" className="bg-white text-primary font-bold px-7 py-3 rounded-xl hover:bg-gray-100 transition">View Courses</Link>
          <Link to="/scholarship" className="border-2 border-white text-white font-bold px-7 py-3 rounded-xl hover:bg-white hover:text-primary transition">Apply for Scholarship</Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}

