import { useState, useEffect } from 'react'
import AdminLayout from '../components/AdminLayout'
import Modal from '../components/Modal'
import { facultyService } from '../services/index'

const EMPTY = { name: '', subject: '', designation: 'Teacher', email: '', phone: '', bio: '', photo: null }

export default function FacultyPage() {
  const [faculty, setFaculty] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [delConfirm, setDelConfirm] = useState(null)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(EMPTY)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')

  const load = async () => {
    setLoading(true)
    try { const res = await facultyService.getAll(); setFaculty(res.data) }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  const openAdd = () => { setEditing(null); setForm(EMPTY); setError(''); setModalOpen(true) }
  const openEdit = (f) => {
    setEditing(f)
    setForm({ name: f.name, subject: f.subject, designation: f.designation,
      email: f.email || '', phone: f.phone, bio: f.bio || '', photo: null })
    setError(''); setModalOpen(true)
  }

  const handleChange = e => {
    const { name, value, files } = e.target
    setForm(f => ({ ...f, [name]: files ? files[0] : value }))
  }

  const handleSave = async (e) => {
    e.preventDefault(); setSaving(true); setError('')
    try {
      const fd = new FormData()
      Object.entries(form).forEach(([k, v]) => {
        if (k === 'photo' && v) fd.append(k, v)
        else if (k !== 'photo') fd.append(k, v)
      })
      if (editing) await facultyService.update(editing.id, fd)
      else await facultyService.create(fd)
      setModalOpen(false); load()
    } catch (err) {
      const data = err.response?.data
      setError(data ? Object.values(data).flat().join(' ') : 'Failed to save.')
    } finally { setSaving(false) }
  }

  const handleDelete = async (id) => {
    try { await facultyService.remove(id); setDelConfirm(null); load() }
    catch { alert('Failed to delete.') }
  }

  const filtered = faculty.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.subject.toLowerCase().includes(search.toLowerCase())
  )

  const fc = "w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"

  return (
    <AdminLayout title="Faculty">
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search by name or subject..." className="input flex-1 max-w-md" />
        <button onClick={openAdd} className="btn-primary flex items-center gap-2 whitespace-nowrap">
          ➕ Add Faculty
        </button>
      </div>

      {/* Cards grid */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center text-gray-400 py-20 text-sm">
          {search ? 'No faculty match your search.' : 'No faculty added yet. Click "Add Faculty" to get started.'}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map(f => (
            <div key={f.id} className="card group">
              <div className="relative">
                {f.photo_url
                  ? <img src={f.photo_url} className="w-full h-44 object-cover" alt={f.name} />
                  : <div className="w-full h-44 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <span className="font-heading text-5xl font-bold text-primary/40">{f.name[0]}</span>
                    </div>
                }
                {/* Action overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button onClick={() => openEdit(f)}
                    className="px-4 py-1.5 bg-white text-gray-800 rounded-lg text-xs font-semibold hover:bg-gray-100 transition">
                    Edit
                  </button>
                  <button onClick={() => setDelConfirm(f)}
                    className="px-4 py-1.5 bg-red-600 text-white rounded-lg text-xs font-semibold hover:bg-red-700 transition">
                    Delete
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-heading font-bold text-gray-900 uppercase truncate">{f.name}</h3>
                <p className="text-primary text-sm font-medium">{f.subject}</p>
                <p className="text-gray-500 text-xs mt-0.5">{f.designation}</p>
                {f.phone && <p className="text-gray-400 text-xs mt-2">📞 {f.phone}</p>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}
        title={editing ? `Edit — ${editing.name}` : 'Add New Faculty'}>
        <form onSubmit={handleSave} className="space-y-4">
          {error && <div className="bg-red-50 text-red-600 border border-red-200 rounded-lg px-4 py-2.5 text-sm">{error}</div>}

          <div>
            <label className="label">Full Name *</label>
            <input name="name" value={form.name} onChange={handleChange} required className={fc} placeholder="Dr. Jane Smith" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Subject *</label>
              <input name="subject" value={form.subject} onChange={handleChange} required className={fc} placeholder="Mathematics" />
            </div>
            <div>
              <label className="label">Designation</label>
              <select name="designation" value={form.designation} onChange={handleChange} className={fc}>
                {['Teacher','Senior Teacher','Head of Department','Principal','Vice Principal','Coordinator'].map(d => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Phone *</label>
              <input name="phone" value={form.phone} onChange={handleChange} required className={fc} placeholder="+91 9999999999" />
            </div>
            <div>
              <label className="label">Email</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} className={fc} placeholder="faculty@cbs.edu" />
            </div>
          </div>

          <div>
            <label className="label">Bio</label>
            <textarea name="bio" value={form.bio} onChange={handleChange}
              rows={3} className={fc + ' resize-none'} placeholder="Short biography..." />
          </div>

          <div>
            <label className="label">Photo</label>
            <input name="photo" type="file" accept="image/*" onChange={handleChange}
              className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer" />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setModalOpen(false)}
              className="flex-1 py-2.5 border border-gray-300 rounded-xl text-sm font-medium hover:bg-gray-50 transition">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="flex-1 btn-primary py-2.5">
              {saving ? 'Saving...' : editing ? 'Update Faculty' : 'Add Faculty'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete confirm */}
      <Modal isOpen={!!delConfirm} onClose={() => setDelConfirm(null)} title="Confirm Delete">
        <p className="text-gray-600 mb-6">
          Delete <strong>{delConfirm?.name}</strong> from faculty? This cannot be undone.
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
