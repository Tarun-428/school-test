import { useEffect, useRef } from 'react'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function GravityStarsBackground({
  starsCount = 75,
  starsSize = 2,
  starsOpacity = 0.75,
  glowIntensity = 15,
  movementSpeed = 0.3,
  mouseInfluence = 100,
  mouseGravity = 'attract',
  gravityStrength = 75,
  starsInteraction = false,
  starsInteractionType = 'bounce',
  className = '',
  ...props
}) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return undefined

    let animationFrame = 0
    let width = 0
    let height = 0
    let dpr = 1
    const reduceMotion = prefersReducedMotion()
    const pointer = { x: -9999, y: -9999, active: false }
    let stars = []

    const createStar = () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * movementSpeed,
      vy: (Math.random() - 0.5) * movementSpeed,
      radius: Math.max(0.8, starsSize * (0.5 + Math.random())),
      alpha: starsOpacity * (0.55 + Math.random() * 0.45),
    })

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.offsetWidth
      height = canvas.offsetHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      stars = Array.from({ length: starsCount }, createStar)
    }

    const drawStar = (star) => {
      const glow = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, glowIntensity)
      glow.addColorStop(0, `rgba(226, 244, 255, ${star.alpha})`)
      glow.addColorStop(0.35, `rgba(10, 132, 216, ${star.alpha * 0.35})`)
      glow.addColorStop(1, 'rgba(10, 132, 216, 0)')

      ctx.fillStyle = glow
      ctx.beginPath()
      ctx.arc(star.x, star.y, glowIntensity, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`
      ctx.beginPath()
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
      ctx.fill()
    }

    const moveStar = (star) => {
      if (pointer.active) {
        const dx = pointer.x - star.x
        const dy = pointer.y - star.y
        const distance = Math.hypot(dx, dy)

        if (distance > 0 && distance < mouseInfluence) {
          const direction = mouseGravity === 'repel' ? -1 : 1
          const force = ((mouseInfluence - distance) / mouseInfluence) * gravityStrength * 0.00008
          star.vx += (dx / distance) * force * direction
          star.vy += (dy / distance) * force * direction
        }
      }

      star.x += star.vx
      star.y += star.vy

      if (star.x < 0 || star.x > width) {
        star.vx *= -1
        star.x = Math.max(0, Math.min(width, star.x))
      }
      if (star.y < 0 || star.y > height) {
        star.vy *= -1
        star.y = Math.max(0, Math.min(height, star.y))
      }

      if (starsInteraction && starsInteractionType === 'bounce') {
        stars.forEach((other) => {
          if (other === star) return
          const dx = other.x - star.x
          const dy = other.y - star.y
          const distance = Math.hypot(dx, dy)
          if (distance < star.radius + other.radius + 4) {
            star.vx *= -1
            star.vy *= -1
          }
        })
      }
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = '#031A2D'
      ctx.fillRect(0, 0, width, height)

      stars.forEach((star) => {
        if (!reduceMotion) moveStar(star)
        drawStar(star)
      })

      animationFrame = window.requestAnimationFrame(render)
    }

    const onPointerMove = (event) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = event.clientX - rect.left
      pointer.y = event.clientY - rect.top
      pointer.active = true
    }

    const onPointerLeave = () => {
      pointer.active = false
    }

    resize()
    render()
    window.addEventListener('resize', resize)
    canvas.addEventListener('pointermove', onPointerMove)
    canvas.addEventListener('pointerleave', onPointerLeave)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [
    starsCount,
    starsSize,
    starsOpacity,
    glowIntensity,
    movementSpeed,
    mouseInfluence,
    mouseGravity,
    gravityStrength,
    starsInteraction,
    starsInteractionType,
  ])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 h-full w-full ${className}`}
      {...props}
    />
  )
}
