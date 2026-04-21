import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { galleryService } from '../services/index'
import PageHero from '../components/PageHero'

export default function PublicGalleryPage() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    const loadImages = async () => {
      setLoading(true)
      try {
        const res = await galleryService.getAll()
        setImages(Array.isArray(res.data) ? res.data : [])
      } catch {
        setImages([])
      } finally {
        setLoading(false)
      }
    }

    loadImages()
  }, [])

  return (
    <div className="font-body bg-white min-h-screen">
      <Navbar />

      <PageHero
        eyebrow="School Gallery"
        title="Memories & Moments"
        description="Browse all photos uploaded by admin in a Pinterest-style gallery wall."
      />

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          {loading ? (
            <div className="flex items-center justify-center h-52">
              <div className="w-9 h-9 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : images.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 motion-panel">
              <p className="text-gray-600 font-medium">No gallery photos available right now.</p>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
              {images.map((img) => (
                <div
                  key={img.id}
                  className="mb-4 break-inside-avoid cursor-pointer group overflow-hidden rounded-lg bg-gray-100 shadow-sm hover-lift"
                  onClick={() => setSelected(img)}
                >
                  <img
                    src={img.image_url}
                    alt={img.title || 'School gallery'}
                    className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    loading="lazy"
                  />
                  {img.title && (
                    <div className="px-3 py-2 bg-white">
                      <p className="text-sm text-gray-700 font-medium">{img.title}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 motion-panel"
          onClick={() => setSelected(null)}
        >
          <button className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300">&times;</button>
          <img
            src={selected.image_url}
            alt={selected.title || 'School gallery'}
            className="max-w-full max-h-full rounded-xl shadow-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          {selected.title && (
            <p className="absolute bottom-6 text-white text-sm font-medium bg-black/50 px-4 py-2 rounded-full">
              {selected.title}
            </p>
          )}
        </div>
      )}

      <Footer />
    </div>
  )
}
