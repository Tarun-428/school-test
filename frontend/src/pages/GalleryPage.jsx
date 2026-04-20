import { useState, useEffect, useRef } from 'react'
import AdminLayout from '../components/AdminLayout'
import Modal from '../components/Modal'
import { galleryService } from '../services/index'

export default function GalleryPage() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [delConfirm, setDelConfirm] = useState(null)
  const [lightbox, setLightbox] = useState(null)
  const [uploadModal, setUploadModal] = useState(false)
  const [files, setFiles] = useState([])
  const [title, setTitle] = useState('')
  const [previews, setPreviews] = useState([])
  const [progress, setProgress] = useState(0)
  const fileRef = useRef()

  const load = async () => {
    setLoading(true)
    try { const res = await galleryService.getAll(); setImages(res.data) }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  const handleFileSelect = (e) => {
    const selected = Array.from(e.target.files)
    setFiles(selected)
    setPreviews(selected.map(f => URL.createObjectURL(f)))
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    if (files.length === 0) return
    setUploading(true)
    setProgress(0)
    try {
      // Upload files one by one, updating progress
      for (let i = 0; i < files.length; i++) {
        const fd = new FormData()
        fd.append('image', files[i])
        if (title) fd.append('title', title || files[i].name)
        await galleryService.create(fd)
        setProgress(Math.round(((i + 1) / files.length) * 100))
      }
      setUploadModal(false)
      setFiles([]); setPreviews([]); setTitle('')
      if (fileRef.current) fileRef.current.value = ''
      load()
    } catch { alert('Upload failed. Please try again.') }
    finally { setUploading(false); setProgress(0) }
  }

  const handleDelete = async (id) => {
    try { await galleryService.remove(id); setDelConfirm(null); load() }
    catch { alert('Failed to delete image.') }
  }

  return (
    <AdminLayout title="Gallery">
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-500 text-sm">{images.length} image{images.length !== 1 ? 's' : ''} in gallery</p>
        <button onClick={() => { setUploadModal(true); setFiles([]); setPreviews([]) }}
          className="btn-primary flex items-center gap-2">
          📤 Upload Images
        </button>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : images.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <p className="text-5xl mb-4">🖼️</p>
          <p className="text-gray-500 font-medium">No images yet</p>
          <p className="text-gray-400 text-sm mt-1">Click "Upload Images" to add photos to the gallery</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {images.map(img => (
            <div key={img.id} className="group relative rounded-xl overflow-hidden aspect-square bg-gray-100 shadow-sm">
              <img src={img.image_url} alt={img.title || 'Gallery'}
                className="w-full h-full object-cover transition-transform group-hover:scale-105" />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                {img.title && <p className="text-white text-xs font-medium text-center line-clamp-2">{img.title}</p>}
                <div className="flex gap-2">
                  <button onClick={() => setLightbox(img)}
                    className="px-3 py-1.5 bg-white text-gray-800 rounded-lg text-xs font-semibold hover:bg-gray-100 transition">
                    View
                  </button>
                  <button onClick={() => setDelConfirm(img)}
                    className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs font-semibold hover:bg-red-700 transition">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      <Modal isOpen={uploadModal} onClose={() => setUploadModal(false)} title="Upload Images">
        <form onSubmit={handleUpload} className="space-y-4">
          <div>
            <label className="label">Title / Caption (optional)</label>
            <input value={title} onChange={e => setTitle(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="School Sports Day 2024" />
          </div>

          <div>
            <label className="label">Select Images *</label>
            <div
              onClick={() => fileRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition">
              <p className="text-3xl mb-2">📁</p>
              <p className="text-sm text-gray-600 font-medium">Click to select images</p>
              <p className="text-xs text-gray-400 mt-1">JPG, PNG, WEBP supported. Multiple files allowed.</p>
            </div>
            <input ref={fileRef} type="file" accept="image/*" multiple onChange={handleFileSelect} className="hidden" />
          </div>

          {/* Previews */}
          {previews.length > 0 && (
            <div>
              <p className="text-xs text-gray-500 mb-2">{files.length} file{files.length !== 1 ? 's' : ''} selected</p>
              <div className="grid grid-cols-4 gap-2">
                {previews.map((p, i) => (
                  <img key={i} src={p} alt="" className="w-full aspect-square object-cover rounded-lg" />
                ))}
              </div>
            </div>
          )}

          {/* Progress bar */}
          {uploading && (
            <div>
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Uploading...</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setUploadModal(false)}
              className="flex-1 py-2.5 border border-gray-300 rounded-xl text-sm font-medium hover:bg-gray-50 transition">
              Cancel
            </button>
            <button type="submit" disabled={uploading || files.length === 0} className="flex-1 btn-primary py-2.5">
              {uploading ? `Uploading ${progress}%...` : `Upload ${files.length || ''} Image${files.length !== 1 ? 's' : ''}`}
            </button>
          </div>
        </form>
      </Modal>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300">&times;</button>
          <img src={lightbox.image_url} alt={lightbox.title || 'Gallery'}
            className="max-w-full max-h-full rounded-xl shadow-2xl object-contain"
            onClick={e => e.stopPropagation()} />
          {lightbox.title && (
            <p className="absolute bottom-6 text-white text-sm font-medium bg-black/50 px-4 py-2 rounded-full">
              {lightbox.title}
            </p>
          )}
        </div>
      )}

      {/* Delete confirm */}
      <Modal isOpen={!!delConfirm} onClose={() => setDelConfirm(null)} title="Delete Image">
        <p className="text-gray-600 mb-6">Remove this image from the gallery? This cannot be undone.</p>
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
