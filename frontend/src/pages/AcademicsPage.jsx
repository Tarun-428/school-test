import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PageHero from '../components/PageHero'

const programs = [
  {
    grade: 'Kindergarten',
    details: 'Play-based learning, language development, social confidence, and foundational numeracy.',
  },
  {
    grade: 'Primary School',
    details: 'Strong fundamentals in mathematics, science, languages, and inquiry-led learning.',
  },
  {
    grade: 'Middle School',
    details: 'Project-based academics, critical thinking, and collaborative communication skills.',
  },
  {
    grade: 'High School',
    details: 'Rigorous preparation for university with advanced coursework and career guidance.',
  },
]

export default function AcademicsPage() {
  return (
    <div className="font-body bg-white min-h-screen">
      <Navbar />

      <PageHero
        eyebrow="Academics"
        title="Learning Pathways"
        description="Our curriculum blends international standards with student-centered teaching and bilingual fluency."
      />

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-heading text-4xl font-bold text-gray-900 uppercase mb-8 text-center">
            Programs By Stage
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {programs.map((program) => (
              <div key={program.grade} className="rounded-lg border border-gray-200 p-6 bg-white shadow-sm hover-lift">
                <h3 className="font-heading text-2xl font-bold text-gray-900 uppercase mb-3">{program.grade}</h3>
                <p className="text-gray-600 leading-relaxed">{program.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6">
          {[
            { title: 'Bilingual Mastery', desc: 'Balanced instruction in two languages across key subjects.' },
            { title: 'STEM Focus', desc: 'Hands-on lab work, coding exposure, and scientific exploration.' },
            { title: 'Arts & Sports', desc: 'Creative and physical development through clubs and activities.' },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-lg border border-gray-200 p-5 hover-lift">
              <h3 className="font-heading text-xl font-bold uppercase text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
