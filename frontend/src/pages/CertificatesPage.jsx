import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const certificates = [
  {
    title: 'ISO 9001:2015 Certified Institution',
    issuer: 'International Accreditation Registry',
    year: '2025',
    description: 'Certified quality management systems for academic and operational excellence.',
  },
  {
    title: 'Best Emerging School Award',
    issuer: 'National Education Council',
    year: '2024',
    description: 'Recognized for innovation in teaching, student development, and community impact.',
  },
  {
    title: 'Digital Learning Excellence Badge',
    issuer: 'Global EdTech Forum',
    year: '2025',
    description: 'Awarded for integrating modern digital pedagogy and blended classroom practices.',
  },
  {
    title: 'Safe Campus Compliance Certificate',
    issuer: 'School Safety Standards Board',
    year: '2025',
    description: 'Validated high standards in child safety, infrastructure readiness, and emergency planning.',
  },
]

export default function CertificatesPage() {
  return (
    <div className="font-body bg-white min-h-screen">
      <Navbar />

      <section className="pt-28 pb-16 bg-dark text-white">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-primary text-xs font-semibold tracking-[0.3em] uppercase mb-3">Certificates</p>
          <h1 className="font-heading text-5xl md:text-6xl font-bold uppercase mb-4">Trust & Recognition</h1>
          <p className="text-gray-300 max-w-3xl leading-relaxed">
            These are placeholder certificates and can be replaced easily from the certificates data array in code.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-6">
          {certificates.map((certificate) => (
            <article key={certificate.title} className="bg-white rounded-2xl border border-gray-200 p-6">
              <p className="text-xs font-semibold tracking-wide text-primary uppercase mb-2">{certificate.year}</p>
              <h2 className="font-heading text-2xl font-bold text-gray-900 uppercase mb-2">{certificate.title}</h2>
              <p className="text-sm text-gray-500 mb-3">Issued by: {certificate.issuer}</p>
              <p className="text-sm text-gray-600 leading-relaxed">{certificate.description}</p>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
