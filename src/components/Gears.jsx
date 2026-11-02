import { useEffect, useRef } from 'react'
import { AmbientLight, DirectionalLight, ExtrudeGeometry, Group, Mesh, MeshStandardMaterial, Path, PerspectiveCamera, PMREMGenerator, Raycaster, Scene, Shape, Vector2, WebGLRenderer } from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

const TINTS = [0x4b9eff, 0xdfe6f2, 0x62d9e8, 0x9fb2cf]
const SPEC = [[24, -1, 0], [16, 0, .7], [20, 0, -.55], [12, 2, -2.2]] // [teeth, parent gear, angle from parent]
const M = .1 // module: pitch radius = teeth * M

function gear(N) {
  const R = N * M, Ro = R + .1, Rr = R - .12, p = Math.PI * 2 / N, s = new Shape()
  for (let k = 0; k < N; k++) {
    [[Rr, -.3], [Ro, -.16], [Ro, .16], [Rr, .3]].forEach(([r, a], j) => { const t = (k + a) * p, x = Math.cos(t) * r, y = Math.sin(t) * r; k || j ? s.lineTo(x, y) : s.moveTo(x, y) })
  }
  s.closePath()
  const hole = (x, y, r) => { const h = new Path(); h.absarc(x, y, r, 0, Math.PI * 2, true); s.holes.push(h) }
  hole(0, 0, R * .22)
  for (let i = 0; i < 5; i++) { const a = i / 5 * Math.PI * 2; hole(Math.cos(a) * R * .6, Math.sin(a) * R * .6, R * .17) }
  const g = new ExtrudeGeometry(s, { depth: .5, bevelEnabled: true, bevelThickness: .05, bevelSize: .04, bevelSegments: 2, curveSegments: 20 })
  g.translate(0, 0, -.25); return g
}

// The Workshop: interlocking metal gears, one per project. Hover, tap or click a gear.
export default function Gears({ count, active, onHover, onPick }) {
  const box = useRef(null), act = useRef(-1)
  useEffect(() => { act.current = active }, [active])
  useEffect(() => {
    const el = box.current, calm = matchMedia('(prefers-reduced-motion: reduce)').matches
    let r
    try { r = new WebGLRenderer({ antialias: true, alpha: true }) } catch { return }
    r.setPixelRatio(Math.min(devicePixelRatio, innerWidth < 640 ? 1.25 : 2)); el.appendChild(r.domElement); r.domElement.setAttribute('aria-hidden', 'true')
    const scene = new Scene(), cam = new PerspectiveCamera(40, 1, .1, 100), root = new Group()
    scene.add(root, new AmbientLight(0xffffff, .3))
    scene.environment = new PMREMGenerator(r).fromScene(new RoomEnvironment(), .04).texture
    const key = new DirectionalLight(0xffffff, 1.6); key.position.set(3, 5, 8); scene.add(key)
    const specs = SPEC.slice(0, count), pos = []
    const gears = specs.map(([N, par, phi], i) => {
      const mesh = new Mesh(gear(N), new MeshStandardMaterial({ color: TINTS[i % 4], metalness: .92, roughness: .28, emissive: 0x62d9e8, emissiveIntensity: 0 }))
      const d = par < 0 ? 0 : (N + specs[par][0]) * M
      const p = par < 0 ? [0, 0] : [pos[par][0] + Math.cos(phi) * d, pos[par][1] + Math.sin(phi) * d]
      pos.push(p); mesh.userData.i = i; mesh.position.set(p[0] - 1.9, p[1] + 1.1, 0); root.add(mesh)
      return { mesh, N, par, phi }
    })
    const ray = new Raycaster(), m = new Vector2(2, 2), tgt = { x: 0, y: 0 }, cv = r.domElement
    let hov = -1, vis = true, raf, ang = .4, t0 = performance.now(), slow = 0
    const pick = () => { ray.setFromCamera(m, cam); const h = ray.intersectObjects(gears.map(g => g.mesh))[0]; return h ? h.object.userData.i : -1 }
    const aim = e => { const b = cv.getBoundingClientRect(); m.set(((e.clientX - b.left) / b.width) * 2 - 1, -((e.clientY - b.top) / b.height) * 2 + 1); tgt.x = m.x * .45; tgt.y = -m.y * .3 }
    const set = i => { if (i === hov) return; hov = i; el.style.cursor = i < 0 ? '' : 'pointer'; i < 0 ? el.removeAttribute('data-cursor') : el.setAttribute('data-cursor', 'view'); onHover(i) }
    cv.addEventListener('pointermove', e => { aim(e); set(pick()) })
    cv.addEventListener('pointerleave', () => { tgt.x = tgt.y = 0; m.set(2, 2); set(-1) })
    cv.addEventListener('click', e => { aim(e); if (pick() >= 0) onPick(pick()) })
    const io = new IntersectionObserver(([e]) => { vis = e.isIntersecting }); io.observe(el)
    const size = () => { const w = el.clientWidth, h = el.clientHeight; r.setSize(w, h, false); cam.aspect = w / h; cam.position.set(0, 0, w / h < 1 ? 21 : 18); cam.updateProjectionMatrix() }
    const ro = new ResizeObserver(size); ro.observe(el); size()
    const frame = t => {
      raf = requestAnimationFrame(frame)
      if (!vis) return
      const dt = Math.min(.05, (t - t0) / 1000); t0 = t
      // Weak device? Drop to 1x resolution once so the page stays smooth.
      slow = dt > .034 ? slow + 1 : Math.max(0, slow - 1)
      if (slow > 40 && r.getPixelRatio() > 1) { r.setPixelRatio(1); r.setSize(el.clientWidth, el.clientHeight, false); slow = 0 }
      if (!calm) ang += dt * .28
      const th = []
      gears.forEach((g, i) => {
        const P = gears[g.par]
        th[i] = g.par < 0 ? ang : -(P.N / g.N) * th[g.par] + (1 + P.N / g.N) * g.phi + Math.PI * (1 - 1 / g.N)
        g.mesh.rotation.z = th[i]
        const on = i === (hov >= 0 ? hov : act.current), mat = g.mesh.material
        mat.emissiveIntensity += ((on ? .45 : 0) - mat.emissiveIntensity) * .12
        g.mesh.position.z += ((on ? 1 : 0) - g.mesh.position.z) * .12
      })
      root.rotation.y += (tgt.x - root.rotation.y) * .05; root.rotation.x += (tgt.y - root.rotation.x) * .05
      r.render(scene, cam)
    }
    raf = requestAnimationFrame(frame)
    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect()
      scene.traverse(o => { o.geometry?.dispose(); o.material?.dispose?.() })
      scene.environment.dispose(); r.dispose(); cv.remove()
    }
  }, [])
  return <div ref={box} className="gl h-full w-full" />
}
