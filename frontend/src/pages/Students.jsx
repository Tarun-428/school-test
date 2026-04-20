import { useState, useEffect, useRef } from 'react'
import AdminLayout from '../components/AdminLayout'
import Modal from '../components/Modal'
import { studentService } from '../services/index'

const EMPTY = {
  student_id: '', name: '', student_class: '', section: 'A',
  email: '', phone: '', parent_name: '', address: '',
  total_fee: '', paid_fee: '', profile_photo: null,
}

export default function Students() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [delConfirm, setDelConfirm] = useState(null)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(EMPTY)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const fileRef = useRef()

  const load = async () => {
    setLoading(true)
    try {
      const res = await studentService.getAll()
      setStudents(res.data)
    } finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  const openAdd = () => { setEditing(null); setForm(EMPTY); setError(''); setModalOpen(true) }
  const openEdit = (s) => {
    setEditing(s)
    setForm({
      student_id: s.student_id, name: s.name,
      student_class: s.student_class, section: s.section,
      email: s.email || '', phone: s.phone,
      parent_name: s.parent_name || '', address: s.address || '',
      total_fee: s.total_fee, paid_fee: s.paid_fee, profile_photo: null,
    })
    setError('')
    setModalOpen(true)
  }

  const handleChange = e => {
    const { name, value, files } = e.target
    setForm(f => ({ ...f, [name]: files ? files[0] : value }))
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const fd = new FormData()
      Object.entries(form).forEach(([k, v]) => {
        if (k === 'profile_photo' && v) fd.append(k, v)
        else if (k !== 'profile_photo') fd.append(k, v)
      })
      if (editing) await studentService.update(editing.id, fd)
      else await studentService.create(fd)
      setModalOpen(false)
      load()
    } catch (err) {
      const data = err.response?.data
      setError(data ? Object.values(data).flat().join(' ') : 'Failed to save. Please try again.')
    } finally { setSaving(false) }
  }

  const handleDelete = async (id) => {
    try {
      await studentService.remove(id)
      setDelConfirm(null)
      load()
    } catch { alert('Failed to delete student.') }
  }

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.student_id.toLowerCase().includes(search.toLowerCase()) ||
    s.student_class.toLowerCase().includes(search.toLowerCase())
  )

  const fieldClass = "w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"

  return (
    <AdminLayout title="Students">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by name, ID or class..."
          className="input flex-1 max-w-md"
        />
        <button onClick={openAdd} className="btn-primary flex items-center gap-2 whitespace-nowrap">
          ➕ Add Student
        </button>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="table-th">Student</th>
                <th className="table-th">Class</th>
                <th className="table-th">Contact</th>
                <th className="table-th">Total Fee</th>
                <th className="table-th">Paid</th>
                <th className="table-th">Remaining</th>
                <th className="table-th">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan={7} className="text-center py-16">
                  <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                </td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={7} className="text-center text-gray-400 py-16 text-sm">
                  {search ? 'No students match your search.' : 'No students added yet.'}
                </td></tr>
              ) : filtered.map(s => (
                <tr key={s.id} className="hover:bg-gray-50 transition">
                  <td className="table-td">
                    <div className="flex items-center gap-3">
                      {s.profile_photo_url
                        ? <img src={s.profile_photo_url} className="w-9 h-9 rounded-full object-cover" alt={s.name} />
                        : <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">{s.name[0]}</div>
                      }
                      <div>
                        <p className="font-medium text-gray-900">{s.name}</p>
                        <p className="text-xs text-gray-400">{s.student_id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="table-td">{s.student_class}-{s.section}</td>
                  <td className="table-td">
                    <p>{s.phone}</p>
                    <p className="text-xs text-gray-400">{s.email}</p>
                  </td>
                  <td className="table-td font-medium">₹{Number(s.total_fee).toLocaleString('en-IN')}</td>
                  <td className="table-td text-green-600 font-medium">₹{Number(s.paid_fee).toLocaleString('en-IN')}</td>
                  <td className="table-td">
                    <span className={`font-medium ${parseFloat(s.remaining_fee) > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      ₹{Number(s.remaining_fee).toLocaleString('en-IN')}
                    </span>
                  </td>
                  <td className="table-td">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(s)}
                        className="px-3 py-1.5 text-xs bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition font-medium">
                        Edit
                      </button>
                      <button onClick={() => setDelConfirm(s)}
                        className="px-3 py-1.5 text-xs bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition font-medium">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-gray-100 text-xs text-gray-400">
          {filtered.length} student{filtered.length !== 1 ? 's' : ''} {search ? 'found' : 'total'}
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}
        title={editing ? `Edit — ${editing.name}` : 'Add New Student'}>
        <form onSubmit={handleSave} className="space-y-4">
          {error && <div className="bg-red-50 text-red-700 border border-red-200 rounded-lg px-4 py-2.5 text-sm">{error}</div>}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Student ID *</label>
              <input name="student_id" value={form.student_id} onChange={handleChange}
                required className={fieldClass} placeholder="CBS001" />
            </div>
            <div>
              <label className="label">Full Name *</label>
              <input name="name" value={form.name} onChange={handleChange}
                required className={fieldClass} placeholder="John Doe" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Class *</label>
              <input name="student_class" value={form.student_class} onChange={handleChange}
                required className={fieldClass} placeholder="10" />
            </div>
            <div>
              <label className="label">Section</label>
              <select name="section" value={form.section} onChange={handleChange} className={fieldClass}>
                {['A','B','C','D'].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Phone *</label>
              <input name="phone" value={form.phone} onChange={handleChange}
                required className={fieldClass} placeholder="+91 9999999999" />
            </div>
            <div>
              <label className="label">Email</label>
              <input name="email" type="email" value={form.email} onChange={handleChange}
                className={fieldClass} placeholder="student@email.com" />
            </div>
          </div>

          <div>
            <label className="label">Parent / Guardian Name</label>
            <input name="parent_name" value={form.parent_name} onChange={handleChange}
              className={fieldClass} placeholder="Parent full name" />
          </div>

          <div>
            <label className="label">Address</label>
            <textarea name="address" value={form.address} onChange={handleChange}
              rows={2} className={fieldClass + ' resize-none'} placeholder="Home address" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Total Fee (₹) *</label>
              <input name="total_fee" type="number" value={form.total_fee} onChange={handleChange}
                required min="0" className={fieldClass} placeholder="50000" />
            </div>
            <div>
              <label className="label">Already Paid (₹)</label>
              <input name="paid_fee" type="number" value={form.paid_fee} onChange={handleChange}
                min="0" className={fieldClass} placeholder="0" />
            </div>
          </div>

          <div>
            <label className="label">Profile Photo</label>
            <input ref={fileRef} name="profile_photo" type="file" accept="image/*"
              onChange={handleChange}
              className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer" />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setModalOpen(false)}
              className="flex-1 py-2.5 border border-gray-300 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="flex-1 btn-primary py-2.5">
              {saving ? 'Saving...' : editing ? 'Update Student' : 'Add Student'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete confirm */}
      <Modal isOpen={!!delConfirm} onClose={() => setDelConfirm(null)} title="Confirm Delete">
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete <strong>{delConfirm?.name}</strong> ({delConfirm?.student_id})?
          This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button onClick={() => setDelConfirm(null)}
            className="flex-1 py-2.5 border border-gray-300 rounded-xl text-sm font-medium hover:bg-gray-50 transition">
            Cancel
          </button>
          <button onClick={() => handleDelete(delConfirm.id)}
            className="flex-1 py-2.5 bg-red-600 text-white rounded-xl text-sm font-semibold hover:bg-red-700 transition">
            Delete
          </button>
        </div>
      </Modal>
    </AdminLayout>
  )
}
