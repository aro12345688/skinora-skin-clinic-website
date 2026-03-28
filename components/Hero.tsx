'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'

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
        .hero-strip {
          animation: hero-scroll 32s linear infinite;
        }
      `}</style>

      <section
        id="home"
        ref={containerRef}
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
          <div className="hero-strip" style={{ display: 'flex', height: '100%', gap: 0, width: 'max-content' }}>
            {STRIP.map((src, i) => (
              <div key={i} style={{ flexShrink: 0, width: '33vw', height: '100%', position: 'relative' }}>
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

        {/* ── Dark overlay for readability ── */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(135deg, rgba(20,6,6,0.88) 0%, rgba(36,14,14,0.82) 50%, rgba(50,22,22,0.86) 100%)',
        }} />

        {/* ── Text content ── */}
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p style={{ color: 'var(--peach)', letterSpacing: '0.25em', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Chennai&apos;s Premium Skin & Beauty Clinic
          </p>

          <h1
            className="font-serif"
            style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 300, color: 'white', lineHeight: 1.1, marginBottom: '1.5rem' }}
          >
            Reveal Your<br />
            <span style={{ fontStyle: 'italic', fontWeight: 600, background: 'var(--grad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Radiant Skin
            </span>
          </h1>

          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '480px', lineHeight: 1.8, marginBottom: '2.5rem', fontSize: '1rem' }}>
            Advanced skin treatments and luxury beauty enhancements tailored for you — guided by Geetha and a dedicated team of specialists.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '4rem' }}>
            <button onClick={onBook} className="btn-grad" style={{ padding: '0.9rem 2.2rem', fontSize: '0.9rem' }}>
              Book a Consultation
            </button>
            <a
              href="#services"
              style={{
                padding: '0.9rem 2.2rem', fontSize: '0.9rem', borderRadius: '40px',
                border: '1.5px solid rgba(255,255,255,0.4)', color: 'white',
                textDecoration: 'none', letterSpacing: '0.05em',
                transition: 'border-color 0.2s',
              }}
            >
              Explore Services
            </a>
          </div>

          {/* Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '1rem', width: '100%', maxWidth: '700px',
          }}>
            {STATS.map(s => (
              <div key={s.label} className="stat-card">
                <div className="font-serif" style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--peach)' }}>{s.value}</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.05em', marginTop: '0.25rem' }}>{s.label}</div>
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
