import { useState, useEffect } from 'react'
import AdminLayout from '../components/AdminLayout'
import { paymentService } from '../services/index'
import LineIcon from '../components/LineIcon'
import CountUp from '../components/CountUp'

const STATUS_STYLES = {
  success: 'bg-green-100 text-green-700',
  pending: 'bg-yellow-100 text-yellow-700',
  failed: 'bg-red-100 text-red-700',
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const load = async (sid) => {
    setLoading(true)
    try {
      const res = await paymentService.getTransactions(sid || '')
      setTransactions(res.data)
    } catch { setTransactions([]) }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    load(search.trim())
  }

  const handleClear = () => { setSearch(''); load() }

  const filtered = filterStatus === 'all'
    ? transactions
    : transactions.filter(t => t.status === filterStatus)

  // Summary stats
  const total = transactions.filter(t => t.status === 'success').reduce((s, t) => s + parseFloat(t.amount), 0)
  const successCount = transactions.filter(t => t.status === 'success').length
  const pendingCount = transactions.filter(t => t.status === 'pending').length

  return (
    <AdminLayout title="Transactions">
      {/* Summary cards */}
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total Collected', value: `₹${total.toLocaleString('en-IN')}`, color: 'border-primary', icon: 'chart' },
          { label: 'Successful Payments', value: successCount, color: 'border-blue-500', icon: 'checkCircle' },
          { label: 'Pending', value: pendingCount, color: 'border-sky-500', icon: 'clock' },
        ].map(s => (
          <div key={s.label} className={`bg-white rounded-lg p-5 shadow-sm border-l-4 ${s.color} flex items-center gap-4 hover-lift`}>
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary-light text-primary">
              <LineIcon name={s.icon} className="h-6 w-6" />
            </span>
            <div>
              <p className="text-xs text-gray-500 font-medium">{s.label}</p>
              <p className="font-heading text-2xl font-bold text-gray-900"><CountUp value={s.value} /></p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <form onSubmit={handleSearch} className="flex flex-col gap-2 sm:flex-row sm:flex-1 sm:max-w-md">
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Filter by Student ID..."
            className="input flex-1"
          />
          <button type="submit" className="btn-primary px-4">Search</button>
          {search && (
            <button type="button" onClick={handleClear}
              className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition">
              Clear
            </button>
          )}
        </form>
        <div className="flex flex-wrap gap-2">
          {['all', 'success', 'pending', 'failed'].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition capitalize ${
                filterStatus === s ? 'bg-primary text-white' : 'bg-white border border-gray-300 text-gray-600 hover:border-primary hover:text-primary'
              }`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="table-th">#</th>
                <th className="table-th">Student</th>
                <th className="table-th">Amount</th>
                <th className="table-th">Order ID</th>
                <th className="table-th">Payment ID</th>
                <th className="table-th">Status</th>
                <th className="table-th">Date & Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan={7} className="text-center py-16">
                  <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                </td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={7} className="text-center text-gray-400 py-16 text-sm">
                  No transactions found.
                </td></tr>
              ) : filtered.map((t, i) => (
                <tr key={t.id} className="hover:bg-gray-50 transition">
                  <td className="table-td text-gray-400">{i + 1}</td>
                  <td className="table-td">
                    <p className="font-medium text-gray-900">{t.student_name}</p>
                    <p className="text-xs text-gray-400">{t.student_id}</p>
                  </td>
                  <td className="table-td font-bold text-gray-900 text-base">
                    ₹{Number(t.amount).toLocaleString('en-IN')}
                  </td>
                  <td className="table-td">
                    <code className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600">{t.razorpay_order_id}</code>
                  </td>
                  <td className="table-td">
                    {t.razorpay_payment_id
                      ? <code className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600">{t.razorpay_payment_id}</code>
                      : <span className="text-gray-300 text-xs">—</span>
                    }
                  </td>
                  <td className="table-td">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${STATUS_STYLES[t.status] || 'bg-gray-100 text-gray-600'}`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="table-td text-gray-500 text-xs whitespace-nowrap">
                    {new Date(t.created_at).toLocaleString('en-IN', {
                      day: '2-digit', month: 'short', year: 'numeric',
                      hour: '2-digit', minute: '2-digit'
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-gray-100 text-xs text-gray-400">
          {filtered.length} transaction{filtered.length !== 1 ? 's' : ''} shown
          {filterStatus !== 'all' && ` (filtered: ${filterStatus})`}
        </div>
      </div>
    </AdminLayout>
  )
}
