import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { galleryService } from '../../services/index'
import GravityStarsBackground from '../GravityStarsBackground'
import './ArcGallery.css'

const ARC_RADIUS = 430
const SPREAD_ANGLE = 180
const START_ANGLE = 180

export default function ArcGallery() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])
  const progressRef = useRef(0)
  const targetProgressRef = useRef(0)
  const rafRef = useRef(null)
  const radiusRef = useRef(ARC_RADIUS)
  const [loaded, setLoaded] = useState(false)
  const [galleryImages, setGalleryImages] = useState([])

  useEffect(() => {
    const loadGallery = async () => {
      try {
        const res = await galleryService.getAll()
        setGalleryImages(Array.isArray(res.data) ? res.data : [])
      } catch {
        setGalleryImages([])
      }
    }

    loadGallery()
  }, [])

  const images = useMemo(() => {
    return galleryImages.map((img) => ({
      id: img.id,
      src: img.image_url,
      title: img.title || 'Gallery photo',
    }))
  }, [galleryImages])

  const getCardTransform = (positionIndex, total) => {
    if (!total) return { x: 0, y: 0, tilt: 0, scale: 1 }

    const normalizedIndex = ((positionIndex % total) + total) % total
    const angleDeg = START_ANGLE - (normalizedIndex / Math.max(total - 1, 1)) * SPREAD_ANGLE
    const angleRad = (angleDeg * Math.PI) / 180

    const radius = radiusRef.current
    const cx = 0
    const cy = radius * 0.35
    const x = cx + radius * Math.cos(angleRad)
    const y = cy - radius * Math.sin(angleRad)
    const tilt = -(angleDeg - 90)

    const normalizedPos = normalizedIndex / Math.max(total - 1, 1)
    const distFromCenter = Math.abs(normalizedPos - 0.5) * 2
    const scale = 1 - distFromCenter * 0.27

    return { x, y, tilt, scale }
  }

  const applyProgress = (progress) => {
    const cards = cardsRef.current
    const n = cards.length
    if (!n) return

    cards.forEach((card, i) => {
      if (!card) return
      // Circular shuffle: cards keep rotating through the same arc with no empty gaps.
      const shiftedIndex = i - progress * n
      const { x, y, tilt, scale } = getCardTransform(shiftedIndex, n)

      gsap.set(card, {
        x,
        y,
        rotation: tilt,
        scale,
        transformOrigin: 'center bottom',
        zIndex: Math.round(scale * 100),
      })
    })
  }

  useEffect(() => {
    cardsRef.current = cardsRef.current.slice(0, images.length)
    progressRef.current = 0
    targetProgressRef.current = 0
    applyProgress(0)
    if (images.length) setLoaded(true)

    if (!sectionRef.current || !images.length) {
      return undefined
    }

    let swipeStart = null
    const el = sectionRef.current
    const setTarget = (next) => {
      targetProgressRef.current = next
    }

    const updateRadius = () => {
      radiusRef.current = Math.max(260, Math.min(ARC_RADIUS, window.innerWidth * 0.46))
      applyProgress(progressRef.current)
    }

    const animate = () => {
      const diff = targetProgressRef.current - progressRef.current
      progressRef.current += diff * 0.075
      applyProgress(progressRef.current)
      rafRef.current = requestAnimationFrame(animate)
    }

    const onPointerDown = (e) => {
      swipeStart = e.clientX ?? e.touches?.[0]?.clientX ?? null
      el.classList.add('arc-section--dragging')
    }

    const onPointerMove = (e) => {
      if (swipeStart === null) return
      const currentX = e.clientX ?? e.touches?.[0]?.clientX
      if (currentX == null) return
      const delta = (swipeStart - currentX) / window.innerWidth
      setTarget(targetProgressRef.current + delta * 2.4)
      swipeStart = currentX
    }

    const onPointerUp = () => {
      swipeStart = null
      el.classList.remove('arc-section--dragging')
    }

    const onWheel = (e) => {
      const rect = el.getBoundingClientRect()
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0
      if (!isVisible) return
      setTarget(targetProgressRef.current + e.deltaY * 0.0009)
    }

    updateRadius()
    animate()
    el.addEventListener('pointerdown', onPointerDown)
    el.addEventListener('pointermove', onPointerMove)
    el.addEventListener('pointerup', onPointerUp)
    el.addEventListener('pointerleave', onPointerUp)
    el.addEventListener('wheel', onWheel, { passive: true })
    el.addEventListener('touchstart', onPointerDown, { passive: true })
    el.addEventListener('touchmove', onPointerMove, { passive: true })
    el.addEventListener('touchend', onPointerUp)
    window.addEventListener('resize', updateRadius)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      el.removeEventListener('pointerdown', onPointerDown)
      el.removeEventListener('pointermove', onPointerMove)
      el.removeEventListener('pointerup', onPointerUp)
      el.removeEventListener('pointerleave', onPointerUp)
      el.removeEventListener('wheel', onWheel)
      el.removeEventListener('touchstart', onPointerDown)
      el.removeEventListener('touchmove', onPointerMove)
      el.removeEventListener('touchend', onPointerUp)
      window.removeEventListener('resize', updateRadius)
    }
  }, [images.length])

  return (
    <section ref={sectionRef} className="arc-section">
      <GravityStarsBackground
        starsCount={90}
        starsSize={1.8}
        starsOpacity={0.68}
        glowIntensity={16}
        movementSpeed={0.18}
        mouseInfluence={130}
        gravityStrength={70}
        starsInteraction
        className="arc-stars"
      />
      <div className="arc-bg-overlay" />

      <div className={`arc-track ${loaded ? 'arc-track--loaded' : ''}`}>
        {images.map((img, i) => (
          <div
            key={img.id || i}
            ref={(el) => { cardsRef.current[i] = el }}
            className="arc-card"
            style={{ backgroundImage: `url(${img.src})` }}
            title={img.title}
          />
        ))}
      </div>

      <div className="arc-hero">
        <p className="arc-eyebrow">WORK TOGETHER</p>
        <h2 className="arc-headline">
          LET&apos;S SECURE YOUR<br />KID&apos;S FUTURE
        </h2>
        <Link to="/fee-payment" className="arc-cta">
          PAY FEES NOW <span className="arc-cta-arrow">↗</span>
        </Link>
      </div>
    </section>
  )
}
