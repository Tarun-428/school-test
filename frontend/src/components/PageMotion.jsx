import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const SELECTOR = [
  'section:not([data-no-motion])',
  'article',
  'form',
  '.card',
  '.motion-panel',
  '[data-motion]',
].join(',')

export default function PageMotion() {
  const { pathname } = useLocation()

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return undefined

    const observed = new WeakSet()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('motion-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )

    const observe = (root = document) => {
      root.querySelectorAll(SELECTOR).forEach((element) => {
        if (observed.has(element) || element.closest('[data-no-motion]')) return
        observed.add(element)
        element.classList.add('motion-reveal')
        observer.observe(element)
      })
    }

    const timer = window.setTimeout(() => observe(), 40)
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) observe(node)
        })
      })
    })

    mutationObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.clearTimeout(timer)
      observer.disconnect()
      mutationObserver.disconnect()
    }
  }, [pathname])

  return null
}
