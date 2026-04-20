import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AdminLayout from '../components/AdminLayout'
import { studentService, facultyService, paymentService } from '../services/index'

function StatCard({ icon, label, value, sub, color, to }) {
  return (
    <Link to={to} className={`block bg-white rounded-2xl p-6 shadow-sm border-l-4 ${color} hover:shadow-md transition-shadow`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium mb-1">{label}</p>
          <p className="font-heading text-3xl font-bold text-gray-900">{value}</p>
          {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
        </div>
        <span className="text-3xl">{icon}</span>
      </div>
    </Link>
  )
}

export default function Dashboard() {
  const [stats, setStats] = useState({ students: 0, faculty: 0, transactions: 0, revenue: 0 })
  const [recentTxns, setRecentTxns] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const [stuRes, facRes, txnRes] = await Promise.all([
          studentService.getAll(),
          facultyService.getAll(),
          paymentService.getTransactions(),
        ])
        const students = stuRes.data
        const txns = txnRes.data
        const revenue = txns
          .filter(t => t.status === 'success')
          .reduce((sum, t) => sum + parseFloat(t.amount), 0)

        setStats({
          students: students.length,
          faculty: facRes.data.length,
          transactions: txns.filter(t => t.status === 'success').length,
          revenue,
        })
        setRecentTxns(txns.slice(0, 6))
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <AdminLayout title="Dashboard">
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          {/* Stat cards */}
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
            <StatCard icon="🎓" label="Total Students" value={stats.students}
              sub="Enrolled" color="border-blue-500" to="/admin/students" />
            <StatCard icon="👨‍🏫" label="Faculty Members" value={stats.faculty}
              sub="Active staff" color="border-green-500" to="/admin/faculty" />
            <StatCard icon="💳" label="Successful Payments" value={stats.transactions}
              sub="Verified transactions" color="border-purple-500" to="/admin/transactions" />
            <StatCard icon="₹" label="Total Revenue"
              value={`₹${stats.revenue.toLocaleString('en-IN')}`}
              sub="Collected fees" color="border-primary" to="/admin/transactions" />
          </div>

          {/* Quick actions */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-heading text-xl font-bold text-gray-900 mb-4 uppercase">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { to: '/admin/students', icon: '➕', label: 'Add Student', color: 'bg-blue-50 hover:bg-blue-100 text-blue-700' },
                  { to: '/admin/faculty', icon: '➕', label: 'Add Faculty', color: 'bg-green-50 hover:bg-green-100 text-green-700' },
                  { to: '/admin/gallery', icon: '📤', label: 'Upload Images', color: 'bg-purple-50 hover:bg-purple-100 text-purple-700' },
                  { to: '/admin/transactions', icon: '📊', label: 'View Reports', color: 'bg-orange-50 hover:bg-orange-100 text-orange-700' },
                ].map(a => (
                  <Link key={a.to} to={a.to}
                    className={`${a.color} rounded-xl p-4 flex items-center gap-3 transition font-medium text-sm`}>
                    <span className="text-xl">{a.icon}</span>
                    {a.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Fee overview */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-heading text-xl font-bold text-gray-900 mb-4 uppercase">Fee Overview</h2>
              <div className="space-y-3">
                {[
                  { label: 'Total Fees Collected', value: `₹${stats.revenue.toLocaleString('en-IN')}`, color: 'text-green-600' },
                  { label: 'Successful Transactions', value: stats.transactions, color: 'text-blue-600' },
                ].map(item => (
                  <div key={item.label} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                    <span className="text-sm text-gray-600">{item.label}</span>
                    <span className={`font-bold font-heading text-lg ${item.color}`}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent transactions */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-heading text-xl font-bold text-gray-900 uppercase">Recent Transactions</h2>
              <Link to="/admin/transactions" className="text-sm text-primary font-medium hover:underline">View all →</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="table-th">Student</th>
                    <th className="table-th">Amount</th>
                    <th className="table-th">Status</th>
                    <th className="table-th">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentTxns.length === 0 ? (
                    <tr><td colSpan={4} className="text-center text-gray-400 py-10 text-sm">No transactions yet</td></tr>
                  ) : recentTxns.map(t => (
                    <tr key={t.id} className="hover:bg-gray-50 transition">
                      <td className="table-td">
                        <p className="font-medium">{t.student_name}</p>
                        <p className="text-xs text-gray-400">{t.student_id}</p>
                      </td>
                      <td className="table-td font-bold text-gray-900">₹{Number(t.amount).toLocaleString('en-IN')}</td>
                      <td className="table-td">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          t.status === 'success' ? 'bg-green-100 text-green-700' :
                          t.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {t.status}
                        </span>
                      </td>
                      <td className="table-td text-gray-500">
                        {new Date(t.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  )
}
