'use client'
import { useEffect } from 'react'

export default function InstagramSection() {
  useEffect(() => {
    // Load Behold widget script once
    if (document.querySelector('script[src="https://w.behold.so/widget.js"]')) return
    const s = document.createElement('script')
    s.type = 'module'
    s.src = 'https://w.behold.so/widget.js'
    document.head.appendChild(s)
  }, [])

  return (
    <section id="instagram" style={{ padding: '6rem 2rem', background: 'var(--pale-blush)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
        <div className="reveal" style={{ marginBottom: '3rem' }}>
          <p style={{ color: 'var(--rose-mid)', letterSpacing: '0.2em', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            Follow Along
          </p>
          <h2 className="font-serif" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 400, marginBottom: '1rem', color: 'var(--dark)' }}>
            @<span className="gradient-text">skinoraofficial</span>
          </h2>
          <p style={{ color: '#6b7280', maxWidth: '500px', margin: '0 auto', lineHeight: 1.7 }}>
            See our latest transformations, treatment results, and behind-the-scenes moments on Instagram.
          </p>
        </div>

        {/* Behold live feed */}
        <div className="reveal" style={{ marginBottom: '2.5rem' }}>
          {/* @ts-expect-error behold-widget is a custom element */}
          <behold-widget feed-id="byRPzeOOY9myLfEfrrF1"></behold-widget>
        </div>

        <a
          href="https://www.instagram.com/skinoraofficial/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-grad"
          style={{ textDecoration: 'none', display: 'inline-block' }}
        >
          View on Instagram
        </a>
      </div>
    </section>
  )
}
