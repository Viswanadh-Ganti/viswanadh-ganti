import { useEffect, useRef, useState } from 'react'

/**
 * Returns [ref, inView] — inView becomes true once the element
 * enters the viewport (fires once by default).
 */
export function useInView({ threshold = 0.1, once = true } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) obs.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold, once])

  return [ref, inView]
}
