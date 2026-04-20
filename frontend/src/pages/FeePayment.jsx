import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { studentService, paymentService } from '../services/index'

export default function FeePayment() {
  const [studentId, setStudentId] = useState('')
  const [student, setStudent] = useState(null)
  const [amount, setAmount] = useState('')
  const [searching, setSearching] = useState(false)
  const [paying, setPaying] = useState(false)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  const handleSearch = async (e) => {
    e.preventDefault()
    setError(null)
    setMessage(null)
    setStudent(null)
    setSearching(true)
    try {
      const res = await studentService.search(studentId.trim())
      setStudent(res.data)
      setAmount(String(res.data.remaining_fee))
    } catch (err) {
      setError(err.response?.status === 404
        ? 'No student found with this ID. Please double-check and try again.'
        : 'Network error. Please try again.')
    } finally {
      setSearching(false)
    }
  }

  const handlePayment = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount.')
      return
    }
    setError(null)
    setPaying(true)
    try {
      const { data } = await paymentService.createOrder({
        student_id: student.student_id,
        amount: parseFloat(amount),
      })

      const options = {
        key: data.razorpay_key_id,
        amount: data.amount,
        currency: 'INR',
        name: 'Canadian Bilingual School',
        description: `Fee payment for ${student.name}`,
        order_id: data.order_id,
        handler: async (response) => {
          try {
            const verify = await paymentService.verifyPayment(response)
            setMessage(`Payment of ₹${amount} successful! Remaining fee: ₹${verify.data.remaining_fee}`)
            setStudent(prev => ({
              ...prev,
              paid_fee: parseFloat(prev.paid_fee) + parseFloat(amount),
              remaining_fee: verify.data.remaining_fee,
            }))
          } catch {
            setError('Payment was deducted but verification failed. Please contact admin with payment ID: ' + response.razorpay_payment_id)
          }
        },
        prefill: { name: student.name },
        theme: { color: '#DC2626' },
        modal: { ondismiss: () => setPaying(false) },
      }
      new window.Razorpay(options).open()
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to initiate payment. Please try again.')
      setPaying(false)
    }
  }

  return (
    <div className="font-body min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-16">
        {/* Hero bar */}
        <div className="bg-dark py-14 text-white text-center relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-2 bg-primary" />
          <p className="text-primary text-xs tracking-[0.3em] uppercase font-semibold mb-2">Canadian Bilingual School</p>
          <h1 className="font-heading text-5xl font-bold uppercase">FEE PAYMENT PORTAL</h1>
          <p className="text-gray-400 mt-2">Search your student ID to view and pay fees securely</p>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-12">
          {/* Search card */}
          <div className="card p-8 mb-6">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-1 uppercase">Find Student</h2>
            <p className="text-gray-500 text-sm mb-6">Enter the unique Student ID provided at admission</p>
            <form onSubmit={handleSearch} className="flex gap-3">
              <input
                value={studentId}
                onChange={e => setStudentId(e.target.value)}
                placeholder="e.g. CBS001"
                required
                className="input flex-1 text-base"
              />
              <button type="submit" disabled={searching}
                className="btn-primary whitespace-nowrap">
                {searching ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Searching...
                  </span>
                ) : 'Search →'}
              </button>
            </form>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-5 py-4 mb-4 text-sm">
              ⚠️ {error}
            </div>
          )}

          {/* Success */}
          {message && (
            <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl px-5 py-4 mb-4 text-sm">
              ✅ {message}
            </div>
          )}

          {/* Student info & payment */}
          {student && (
            <div className="card p-8">
              {/* Student profile */}
              <div className="flex items-center gap-5 mb-8 pb-8 border-b border-gray-100">
                {student.profile_photo_url ? (
                  <img src={student.profile_photo_url} className="w-20 h-20 rounded-full object-cover border-4 border-primary/20" alt={student.name} />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-primary/10 border-4 border-primary/20 flex items-center justify-center text-primary font-heading font-bold text-2xl">
                    {student.name[0]}
                  </div>
                )}
                <div>
                  <h3 className="font-heading text-2xl font-bold text-gray-900 uppercase">{student.name}</h3>
                  <p className="text-gray-500 text-sm">Class {student.student_class}-{student.section}</p>
                  <p className="text-gray-400 text-xs mt-1">ID: {student.student_id}</p>
                </div>
              </div>

              {/* Fee summary */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { label: 'Total Fee', value: student.total_fee, bg: 'bg-gray-50', text: 'text-gray-800' },
                  { label: 'Amount Paid', value: student.paid_fee, bg: 'bg-green-50', text: 'text-green-700' },
                  { label: 'Remaining', value: student.remaining_fee, bg: 'bg-red-50', text: 'text-red-600' },
                ].map(f => (
                  <div key={f.label} className={`${f.bg} rounded-xl p-4 text-center`}>
                    <p className="text-xs text-gray-500 font-medium mb-1">{f.label}</p>
                    <p className={`font-heading text-2xl font-bold ${f.text}`}>₹{Number(f.value).toLocaleString('en-IN')}</p>
                  </div>
                ))}
              </div>

              {/* Fee progress bar */}
              <div className="mb-8">
                <div className="flex justify-between text-xs text-gray-500 mb-2">
                  <span>Fee Progress</span>
                  <span>{student.total_fee > 0 ? Math.round((student.paid_fee / student.total_fee) * 100) : 0}% paid</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${student.total_fee > 0 ? Math.min((student.paid_fee / student.total_fee) * 100, 100) : 0}%` }}
                  />
                </div>
              </div>

              {/* Payment form */}
              {parseFloat(student.remaining_fee) > 0 ? (
                <div>
                  <label className="label">Amount to Pay (₹)</label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="number"
                      value={amount}
                      onChange={e => setAmount(e.target.value)}
                      max={student.remaining_fee}
                      min="1"
                      step="1"
                      className="input flex-1"
                    />
                    <button
                      type="button"
                      onClick={() => setAmount(String(student.remaining_fee))}
                      className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-600 hover:border-primary hover:text-primary transition"
                    >
                      Pay Full
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mb-5">
                    Maximum payable: ₹{Number(student.remaining_fee).toLocaleString('en-IN')}
                  </p>
                  <button
                    onClick={handlePayment}
                    disabled={paying || !amount || parseFloat(amount) <= 0 || parseFloat(amount) > parseFloat(student.remaining_fee)}
                    className="btn-primary w-full py-4 text-base"
                  >
                    {paying ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Opening Razorpay...
                      </span>
                    ) : `Pay ₹${amount ? Number(amount).toLocaleString('en-IN') : 0} via Razorpay`}
                  </button>
                  <p className="text-center text-xs text-gray-400 mt-3">🔒 Secured by Razorpay. We never store your card details.</p>
                </div>
              ) : (
                <div className="text-center py-6 bg-green-50 rounded-xl border border-green-200">
                  <p className="text-4xl mb-2">🎉</p>
                  <p className="font-heading text-xl font-bold text-green-700">ALL FEES PAID!</p>
                  <p className="text-green-600 text-sm mt-1">No outstanding balance for this student.</p>
                </div>
              )}
            </div>
          )}

          <div className="text-center mt-8">
            <Link to="/" className="text-sm text-gray-500 hover:text-primary transition">← Back to Home</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
