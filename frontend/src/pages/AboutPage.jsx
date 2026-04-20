import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function AboutPage() {
  return (
    <div className="font-body bg-white min-h-screen">
      <Navbar />

      <section className="pt-28 pb-16 bg-dark text-white">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-primary text-xs font-semibold tracking-[0.3em] uppercase mb-3">About Us</p>
          <h1 className="font-heading text-5xl md:text-6xl font-bold uppercase mb-4">
            Canadian Bilingual School
          </h1>
          <p className="text-gray-300 max-w-3xl leading-relaxed">
            We are committed to developing confident, compassionate, and globally-minded learners through a balanced bilingual education.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="font-heading text-4xl font-bold text-gray-900 uppercase mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              To provide excellent academic and character-focused education in a safe and inclusive environment where every child can thrive.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our teachers and staff support each student with personal attention, strong values, and modern learning practices.
            </p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200"
            alt="Students in classroom"
            className="rounded-2xl shadow-lg w-full h-80 object-cover"
          />
        </div>
      </section>

      <section className="py-16 bg-gray-50">
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

      <Footer />
    </div>
  )
}
