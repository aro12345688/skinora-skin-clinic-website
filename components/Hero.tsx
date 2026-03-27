'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'

const STATS = [
  { value: '5000+', label: 'Happy Clients' },
  { value: '15+',   label: 'Treatments' },
  { value: '10+',   label: 'Years Experience' },
  { value: '4.9★',  label: 'Google Rating' },
]

export default function Hero({ onBook }: { onBook: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
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
    <section
      id="home"
      ref={containerRef}
      style={{
        minHeight: '100vh',
        background: 'var(--grad-dark)',
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
      {/* Decorative circles */}
      <div style={{
        position: 'absolute', top: '-10%', right: '-10%',
        width: '500px', height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(184,92,98,0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Logo */}
      <div style={{ marginBottom: '1.5rem' }}>
        <Image
          src="/logo.png"
          alt="Skinora Logo"
          width={100}
          height={100}
          style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.92 }}
          onError={(e) => {
            const el = e.target as HTMLImageElement
            el.style.display = 'none'
          }}
        />
      </div>

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

      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)' }}>
        <div style={{ width: '1px', height: '50px', background: 'linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)' }} />
      </div>
    </section>
  )
}
