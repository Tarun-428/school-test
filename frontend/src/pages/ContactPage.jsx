import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function ContactPage() {
  return (
    <div className="font-body bg-white min-h-screen">
      <Navbar />

      <section className="pt-28 pb-16 bg-dark text-white">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-primary text-xs font-semibold tracking-[0.3em] uppercase mb-3">Contact</p>
          <h1 className="font-heading text-5xl md:text-6xl font-bold uppercase mb-4">Get In Touch</h1>
          <p className="text-gray-300 max-w-3xl leading-relaxed">
            Reach out to admissions and support teams for enrollment, fees, and general school information.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-10">
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <h2 className="font-heading text-3xl font-bold text-gray-900 uppercase mb-5">Contact Details</h2>
            <div className="space-y-4 text-gray-700">
              <p><span className="font-semibold">Address:</span> 123 School Ave, Ottawa, Canada</p>
              <p><span className="font-semibold">Phone:</span> +1 (555) 123-4567</p>
              <p><span className="font-semibold">Email:</span> info@cbs.edu.ca</p>
              <p><span className="font-semibold">Office Hours:</span> Monday to Friday, 8:00 AM - 4:00 PM</p>
            </div>
          </div>

          <form className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm space-y-4">
            <h2 className="font-heading text-3xl font-bold text-gray-900 uppercase">Send Message</h2>
            <input className="input" type="text" placeholder="Full Name" />
            <input className="input" type="email" placeholder="Email Address" />
            <input className="input" type="text" placeholder="Phone Number" />
            <textarea className="input min-h-32" placeholder="Your message" />
            <button type="button" className="btn-primary">Submit Enquiry</button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  )
}
