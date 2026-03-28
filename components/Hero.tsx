'use client'
import { useEffect, useRef } from 'react'

const STATS = [
  { value: '5000+', label: 'Happy Clients' },
  { value: '15+',   label: 'Treatments' },
  { value: '10+',   label: 'Years Experience' },
  { value: '4.9★',  label: 'Google Rating' },
]

const IMAGES = ['/vip1.jpg', '/vip2.jpg', '/vip3.jpg', '/vip4.jpg', '/vip5.jpg']
const STRIP  = [...IMAGES, ...IMAGES, ...IMAGES]

export default function Hero({ onBook }: { onBook: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const sparks: HTMLElement[] = []
    for (let i = 0; i < 18; i++) {
      const s = document.createElement('div')
      s.className = 'sparkle'
      s.style.left  = Math.random() * 100 + '%'
      s.style.top   = (40 + Math.random() * 50) + '%'
      s.style.animationDuration = (3 + Math.random() * 4) + 's'
      s.style.animationDelay    = (Math.random() * 4) + 's'
      s.style.opacity = String(0.3 + Math.random() * 0.5)
      container.appendChild(s)
      sparks.push(s)
    }
    return () => sparks.forEach(s => s.remove())
  }, [])

  return (
    <>
      <style>{`
        @keyframes hero-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }
        .hero-strip { animation: hero-scroll 32s linear infinite; }
        .hero-strip-item { width: 33vw; }

        .hero-eyebrow { letter-spacing: 0.25em; font-size: 0.75rem; }
        .hero-h1 { font-size: clamp(2.6rem, 8vw, 6rem); }
        .hero-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          width: 100%;
          max-width: 700px;
        }
        .hero-btns {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 3rem;
        }
        .hero-btn-outline {
          padding: 0.9rem 2.2rem;
          font-size: 0.9rem;
          border-radius: 40px;
          border: 1.5px solid rgba(255,255,255,0.4);
          color: white;
          text-decoration: none;
          letter-spacing: 0.05em;
          transition: border-color 0.2s;
          text-align: center;
        }

        @media (max-width: 640px) {
          .hero-strip-item { width: 80vw; }
          .hero-eyebrow { letter-spacing: 0.1em; font-size: 0.68rem; }
          .hero-h1 { font-size: 2.4rem; }
          .hero-stats { grid-template-columns: repeat(2, 1fr); }
          .hero-btns { flex-direction: column; align-items: stretch; width: 100%; max-width: 320px; }
          .hero-btn-outline { display: block; }
          .hero-section { padding: 6rem 1.25rem 3rem !important; }
        }
      `}</style>

      <section
        id="home"
        ref={containerRef}
        className="hero-section"
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '8rem 2rem 4rem',
          position: 'relative',
          overflow: 'hidden',
          textAlign: 'center',
        }}
      >
        {/* ── Background: horizontally scrolling image strip ── */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
          <div className="hero-strip" style={{ display: 'flex', height: '100%', width: 'max-content' }}>
            {STRIP.map((src, i) => (
              <div key={i} className="hero-strip-item" style={{ flexShrink: 0, height: '100%', position: 'relative' }}>
                <img
                  src={src}
                  alt=""
                  aria-hidden="true"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ── Dark overlay ── */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(135deg, rgba(20,6,6,0.88) 0%, rgba(36,14,14,0.82) 50%, rgba(50,22,22,0.86) 100%)',
        }} />

        {/* ── Content ── */}
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <p className="hero-eyebrow" style={{ color: 'var(--peach)', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Chennai&apos;s Premium Skin & Beauty Clinic
          </p>

          <h1
            className="font-serif hero-h1"
            style={{ fontWeight: 300, color: 'white', lineHeight: 1.1, marginBottom: '1.25rem' }}
          >
            Reveal Your<br />
            <span style={{ fontStyle: 'italic', fontWeight: 600, background: 'var(--grad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Radiant Skin
            </span>
          </h1>

          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '460px', lineHeight: 1.8, marginBottom: '2rem', fontSize: '0.95rem', padding: '0 0.5rem' }}>
            Advanced skin treatments and luxury beauty enhancements tailored for you — guided by Geetha and a dedicated team of specialists.
          </p>

          <div className="hero-btns">
            <button onClick={onBook} className="btn-grad" style={{ padding: '0.9rem 2.2rem', fontSize: '0.9rem' }}>
              Book a Consultation
            </button>
            <a href="#services" className="hero-btn-outline">
              Explore Services
            </a>
          </div>

          {/* Stats */}
          <div className="hero-stats">
            {STATS.map(s => (
              <div key={s.label} className="stat-card">
                <div className="font-serif" style={{ fontSize: '1.8rem', fontWeight: 600, color: 'var(--peach)' }}>{s.value}</div>
                <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.04em', marginTop: '0.25rem' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)', zIndex: 2 }}>
          <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)' }} />
        </div>
      </section>
    </>
  )
}
