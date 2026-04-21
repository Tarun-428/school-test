import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PageHero from '../components/PageHero'

const topFaculty = [
  {
    name: 'Dr. Ananya Mehta',
    subject: 'Mathematics',
    designation: 'Head of Department',
    experience: '14 Years',
    achievement: 'State Excellence in Teaching Award',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800',
  },
  {
    name: 'Mr. Rohan Verma',
    subject: 'Physics',
    designation: 'Senior Teacher',
    experience: '11 Years',
    achievement: 'National STEM Mentor Recognition',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800',
  },
  {
    name: 'Ms. Isha Kapoor',
    subject: 'English',
    designation: 'Senior Teacher',
    experience: '10 Years',
    achievement: 'Language Innovation Fellowship',
    photo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800',
  },
  {
    name: 'Mrs. Sana Qureshi',
    subject: 'Biology',
    designation: 'Teacher',
    experience: '9 Years',
    achievement: 'Best Classroom Practices Recognition',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800',
  },
]

export default function PublicFacultyPage() {
  return (
    <div className="font-body bg-white min-h-screen">
      <Navbar />

      <PageHero
        eyebrow="Faculty"
        title="Top Faculty"
        description="Meet our top educators who lead with academic excellence, mentorship, and student-first learning."
      />

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topFaculty.map((member) => (
              <article key={member.name} className="rounded-lg border border-gray-200 overflow-hidden shadow-sm bg-white hover-lift">
                <img src={member.photo} alt={member.name} className="w-full h-56 object-cover" />
                <div className="p-5">
                  <h2 className="font-heading text-2xl font-bold uppercase text-gray-900">{member.name}</h2>
                  <p className="text-primary text-sm font-semibold">{member.subject}</p>
                  <p className="text-gray-500 text-sm mt-1">{member.designation}</p>
                  <div className="mt-4 space-y-1">
                    <p className="text-xs text-gray-600"><span className="font-semibold">Experience:</span> {member.experience}</p>
                    <p className="text-xs text-gray-600"><span className="font-semibold">Recognition:</span> {member.achievement}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
