import { useEffect, useRef } from 'react'

// FX: Dot Grid Ripple. A dot matrix that parts and glows around the pointer, with a slow idle wave.
export default function DotField() {
  const ref = useRef(null)
  useEffect(() => {
    const c = ref.current, g = c.getContext('2d'), calm = matchMedia('(prefers-reduced-motion: reduce)').matches
    const S = innerWidth < 640 ? 44 : 36, m = { x: -999, y: -999 }
    let w, h, raf
    const size = () => { const d = Math.min(devicePixelRatio, innerWidth < 640 ? 1 : 2); w = innerWidth; h = innerHeight; c.width = w * d; c.height = h * d; g.setTransform(d, 0, 0, d, 0, 0) }
    const move = e => { const t = e.touches?.[0] || e; m.x = t.clientX; m.y = t.clientY }
    const leave = e => { if (!e.relatedTarget) m.x = m.y = -999 }
    let last = 0; const slow = matchMedia('(hover: none)').matches
    const draw = t => {
      if (slow && !calm && t - last < 33) { raf = requestAnimationFrame(draw); return }
      last = t
      g.clearRect(0, 0, w, h)
      for (let x = S / 2; x < w; x += S) for (let y = S / 2; y < h; y += S) {
        const dx = x - m.x, dy = y - m.y, d = Math.hypot(dx, dy), k = d < 150 ? 1 - d / 150 : 0
        const wv = calm ? 0 : Math.sin(x * .01 + y * .012 + t * .0006) * 1.5
        g.fillStyle = `rgba(98,217,232,${.1 + k * .7})`
        g.beginPath(); g.arc(x + (d ? dx / d : 0) * k * 18 + wv, y + (d ? dy / d : 0) * k * 18 + wv, 1 + k * 1.8, 0, 6.283); g.fill()
      }
      if (!calm) raf = requestAnimationFrame(draw)
    }
    const onResize = () => { size(); if (calm) draw(0) }
    size(); raf = requestAnimationFrame(draw)
    addEventListener('resize', onResize); addEventListener('mousemove', move); addEventListener('touchmove', move, { passive: true }); addEventListener('mouseout', leave)
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', onResize); removeEventListener('mousemove', move); removeEventListener('touchmove', move); removeEventListener('mouseout', leave) }
  }, [])
  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 h-full w-full" />
}
