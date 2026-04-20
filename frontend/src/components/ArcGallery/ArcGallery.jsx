import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Observer } from 'gsap/Observer'
import { galleryService } from '../../services/index'
import './ArcGallery.css'

gsap.registerPlugin(ScrollTrigger, Observer)

const ARC_RADIUS = 430
const SPREAD_ANGLE = 180
const START_ANGLE = 180

export default function ArcGallery() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])
  const progressRef = useRef(0)
  const rafRef = useRef(null)
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

    const cx = 0
    const cy = ARC_RADIUS * 0.35
    const x = cx + ARC_RADIUS * Math.cos(angleRad)
    const y = cy - ARC_RADIUS * Math.sin(angleRad)
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

  const smoothDrive = (target) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)

    const animate = () => {
      const diff = target - progressRef.current
      if (Math.abs(diff) < 0.0005) {
        progressRef.current = target
        applyProgress(target)
        return
      }
      progressRef.current += diff * 0.08
      applyProgress(progressRef.current)
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    cardsRef.current = cardsRef.current.slice(0, images.length)
    progressRef.current = 0
    applyProgress(0)
    if (images.length) setLoaded(true)

    if (!sectionRef.current || !images.length) {
      return undefined
    }

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=200%',
      pin: true,
      scrub: false,
      onUpdate: (self) => {
        smoothDrive(self.progress)
      },
    })

    let swipeStart = null
    const el = sectionRef.current

    const onPointerDown = (e) => {
      swipeStart = e.clientX ?? e.touches?.[0]?.clientX ?? null
    }

    const onPointerMove = (e) => {
      if (swipeStart === null) return
      const currentX = e.clientX ?? e.touches?.[0]?.clientX
      if (currentX == null) return
      const delta = (swipeStart - currentX) / window.innerWidth
      const target = Math.min(1, Math.max(0, progressRef.current + delta * 1.5))
      smoothDrive(target)
      swipeStart = currentX
    }

    const onPointerUp = () => {
      swipeStart = null
    }

    el.addEventListener('pointerdown', onPointerDown)
    el.addEventListener('pointermove', onPointerMove)
    el.addEventListener('pointerup', onPointerUp)
    el.addEventListener('touchstart', onPointerDown, { passive: true })
    el.addEventListener('touchmove', onPointerMove, { passive: true })
    el.addEventListener('touchend', onPointerUp)

    return () => {
      st.kill()
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      el.removeEventListener('pointerdown', onPointerDown)
      el.removeEventListener('pointermove', onPointerMove)
      el.removeEventListener('pointerup', onPointerUp)
      el.removeEventListener('touchstart', onPointerDown)
      el.removeEventListener('touchmove', onPointerMove)
      el.removeEventListener('touchend', onPointerUp)
    }
  }, [images.length])

  return (
    <section ref={sectionRef} className="arc-section">
      <span className="deco deco-heart deco-1">♥</span>
      <span className="deco deco-heart deco-2">♥</span>
      <span className="deco deco-star deco-3">✦</span>
      <span className="deco deco-star deco-4">✦</span>

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
