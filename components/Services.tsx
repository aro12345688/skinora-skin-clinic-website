'use client'
import { useState } from 'react'

const SKIN = [
  { icon: '⚡', name: 'Jet Plasma Therapy', desc: 'Non-invasive plasma treatment for skin rejuvenation, tightening, and resurfacing without surgery.' },
  { icon: '❄️', name: 'Cryo Plasma Therapy', desc: 'Cold plasma technology to calm inflammation, reduce redness, and accelerate skin healing.' },
  { icon: '✨', name: 'Anti-Melasma Treatment', desc: 'Advanced protocol targeting pigmentation and dark spots for a visibly even, luminous complexion.' },
  { icon: '🌿', name: 'Anti-Sensitivity Treatment', desc: 'Gentle therapy to restore the skin barrier, reduce reactivity, and soothe sensitive skin.' },
  { icon: '👁️', name: 'Under Eye Brightening', desc: 'Targeted brightening treatment to reduce dark circles, puffiness, and fine lines around the eyes.' },
  { icon: '💫', name: 'Instant Glow Hybrid Treatment', desc: 'A signature multi-step glow treatment combining actives and light therapy for immediate radiance.' },
  { icon: '🎯', name: 'BB Glow', desc: 'Semi-permanent foundation treatment that gives a naturally flawless, airbrushed complexion.' },
  { icon: '🔥', name: 'Plasma Skin Tightening', desc: 'Plasma energy used to tighten lax skin and smooth fine lines with precision and minimal downtime.' },
  { icon: '🌸', name: 'Hollywood Hair Reduction', desc: 'Premium long-lasting hair reduction treatment for silky, smooth skin using advanced technology.' },
]

const BEAUTY = [
  { icon: '🖌️', name: 'Eyebrow Tinting', desc: 'Professionally tinted brows to enhance shape, definition, and fullness — perfectly framing your face.' },
  { icon: '💋', name: 'Lip Shading', desc: 'Expert lip shading to add dimension, correct asymmetry, and create a naturally fuller look.' },
  { icon: '👁️', name: 'Lashes Extension', desc: 'Luxurious lash extensions applied strand by strand for dramatic, long-lasting fullness and curl.' },
  { icon: '✏️', name: 'Micro Blading | Micro Shading', desc: 'Hair-stroke or powder brow technique for beautifully realistic, semi-permanent eyebrows.' },
  { icon: '🌊', name: 'Eyebrow Laminating', desc: 'Brow lamination for a sleek, brushed-up, perfectly groomed finish that lasts weeks.' },
  { icon: '🎀', name: 'Lip Pigmentation', desc: 'Semi-permanent lip colour correction and enhancement for naturally beautiful, defined lips every day.' },
]

export default function Services({ onBook }: { onBook: (service: string) => void }) {
  const [tab, setTab] = useState<'skin' | 'beauty'>('skin')
  const items = tab === 'skin' ? SKIN : BEAUTY

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
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}>
          {items.map((item, i) => (
            <div
              key={item.name}
              className="service-card reveal"
              style={{ animationDelay: `${i * 60}ms` }}
            >
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
          ))}
        </div>
      </div>
    </section>
  )
}
