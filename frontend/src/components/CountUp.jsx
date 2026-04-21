import { useEffect, useMemo, useRef, useState } from 'react'

const parseValue = (value) => {
  if (typeof value === 'number') {
    return { prefix: '', number: value, suffix: '', decimals: Number.isInteger(value) ? 0 : 2 }
  }

  const text = String(value)
  const match = text.match(/^([^0-9.-]*)(-?\d+(?:,\d{3})*(?:\.\d+)?)(.*)$/)
  if (!match) return null

  const numberText = match[2].replace(/,/g, '')
  const decimals = numberText.includes('.') ? numberText.split('.')[1].length : 0

  return {
    prefix: match[1],
    number: Number(numberText),
    suffix: match[3],
    decimals,
  }
}

const formatNumber = (value, decimals) =>
  value.toLocaleString('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

export default function CountUp({ value, duration = 1100, className = '' }) {
  const parsed = useMemo(() => parseValue(value), [value])
  const [current, setCurrent] = useState(0)
  const ref = useRef(null)
  const hasRun = useRef(false)

  useEffect(() => {
    hasRun.current = false
    setCurrent(0)
  }, [value])

  useEffect(() => {
    if (!parsed || hasRun.current) return undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      setCurrent(parsed.number)
      hasRun.current = true
      return undefined
    }

    const start = () => {
      if (hasRun.current) return
      hasRun.current = true
      const started = performance.now()
      let animationFrame = 0

      const frame = (time) => {
        const progress = Math.min((time - started) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setCurrent(parsed.number * eased)
        if (progress < 1) animationFrame = requestAnimationFrame(frame)
      }

      animationFrame = requestAnimationFrame(frame)
      return () => cancelAnimationFrame(animationFrame)
    }

    let cleanupAnimation

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          cleanupAnimation = start()
          observer.disconnect()
        }
      },
      { threshold: 0.35 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => {
      observer.disconnect()
      cleanupAnimation?.()
    }
  }, [duration, parsed])

  if (!parsed) return <span className={className}>{value}</span>

  return (
    <span ref={ref} className={className}>
      {parsed.prefix}
      {formatNumber(current, parsed.decimals)}
      {parsed.suffix}
    </span>
  )
}
