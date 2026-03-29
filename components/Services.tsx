'use client'
import { useState, useEffect, useRef } from 'react'
import { SKIN_SERVICES as SKIN, BEAUTY_SERVICES as BEAUTY } from '@/lib/services'

export default function Services({ onBook }: { onBook: (service: string) => void }) {
  const [tab, setTab] = useState<'skin' | 'beauty'>('skin')
  const gridRef       = useRef<HTMLDivElement>(null)
  const items         = tab === 'skin' ? SKIN : BEAUTY

  // Re-run IntersectionObserver whenever the tab changes so newly rendered
  // cards (which the root-level observer never saw) get the reveal animation.
  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) }
      }),
      { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
    )
    grid.querySelectorAll('.reveal').forEach(el => {
      el.classList.remove('visible')
      observer.observe(el)
    })
    return () => observer.disconnect()
  }, [tab])

  return (
    <section id="services" style={{ padding: '6rem 2rem', background: 'var(--pale-blush)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        <div className="reveal" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ color: 'var(--rose-mid)', letterSpacing: '0.2em', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            What We Offer
          </p>
          <h2 className="font-serif" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 400, color: 'var(--dark)' }}>
            Our <span className="gradient-text">Treatments</span>
          </h2>
        </div>

        {/* Tabs */}
        <div className="reveal" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem' }}>
          <button className={`tab-btn ${tab === 'skin' ? 'active' : ''}`} onClick={() => setTab('skin')}>
            Skin Treatments
          </button>
          <button className={`tab-btn ${tab === 'beauty' ? 'active' : ''}`} onClick={() => setTab('beauty')}>
            Beauty Enhancements
          </button>
        </div>

        {/* Cards */}
        <div ref={gridRef} className="service-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}>
          {items.map((item, i) => (
            <div
              key={item.name}
              className="service-card reveal"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="service-card__img">
                <img src={item.image} alt={item.name} loading="lazy" />
              </div>
              <div className="service-card__body">
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{item.icon}</div>
                <h3 className="font-serif" style={{ fontSize: '1.3rem', fontWeight: 500, marginBottom: '0.6rem', color: 'var(--dark)' }}>
                  {item.name}
                </h3>
                <p style={{ color: '#6b7280', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: '1.2rem' }}>
                  {item.desc}
                </p>
                <button
                  onClick={() => onBook(item.name)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: 'var(--rose-mid)', fontSize: '0.82rem', fontWeight: 500,
                    letterSpacing: '0.05em', padding: 0,
                    display: 'flex', alignItems: 'center', gap: '0.3rem',
                  }}
                >
                  Book This Treatment →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
