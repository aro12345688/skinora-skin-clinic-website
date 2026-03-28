'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'

type Phase = 'in' | 'hold' | 'out' | 'hidden'

export default function Loader() {
  const [phase, setPhase] = useState<Phase>('in')

  // Initial page load sequence
  useEffect(() => {
    const t1 = setTimeout(() => setPhase('hold'), 400)
    const t2 = setTimeout(() => setPhase('out'),  1600)
    const t3 = setTimeout(() => setPhase('hidden'), 2200)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  // Section navigation trigger
  useEffect(() => {
    const handler = (e: Event) => {
      const target = (e as CustomEvent<{ target: string }>).detail?.target
      setPhase('in')
      const t1 = setTimeout(() => setPhase('hold'), 200)
      const t2 = setTimeout(() => {
        if (target) {
          document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' })
        }
      }, 500)
      const t3 = setTimeout(() => setPhase('out'),  800)
      const t4 = setTimeout(() => setPhase('hidden'), 1300)
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4) }
    }
    window.addEventListener('skinora:navigate', handler)
    return () => window.removeEventListener('skinora:navigate', handler)
  }, [])

  if (phase === 'hidden') return null

  const opacity   = phase === 'in' ? 1 : phase === 'hold' ? 1 : 0
  const logoScale = phase === 'hold' ? 'scale(1.05)' : 'scale(1)'

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0%, 100% { opacity: 0.85; transform: scale(1); }
          50%       { opacity: 1;    transform: scale(1.07); }
        }
        .loader-logo {
          animation: shimmer 1.4s ease-in-out infinite;
        }
        .loader-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(184,92,98,0.25);
          animation: expand 2s ease-out infinite;
        }
        @keyframes expand {
          0%   { transform: scale(0.8); opacity: 0.6; }
          100% { transform: scale(1.6); opacity: 0;   }
        }
      `}</style>

      <div
        style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          background: 'var(--cream)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexDirection: 'column',
          opacity,
          transition: 'opacity 0.55s ease',
          pointerEvents: phase === 'out' ? 'none' : 'all',
        }}
      >
        {/* Decorative rings */}
        <div className="loader-ring" style={{ width: '220px', height: '220px', animationDelay: '0s' }} />
        <div className="loader-ring" style={{ width: '220px', height: '220px', animationDelay: '0.6s' }} />

        {/* Logo */}
        <div
          className="loader-logo"
          style={{ position: 'relative', transition: 'transform 0.4s ease', transform: logoScale }}
        >
          <Image
            src="/logo.png"
            alt="Skinora"
            width={200}
            height={80}
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>

        {/* Tagline */}
        <p style={{
          marginTop: '1.5rem',
          fontSize: '0.7rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'var(--rose-mid)',
          opacity: phase === 'hold' ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}>
          Elevating Skincare to Perfection
        </p>

        {/* Thin progress bar */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0,
          height: '2px',
          background: 'var(--grad)',
          width: phase === 'out' ? '100%' : phase === 'hold' ? '65%' : '20%',
          transition: 'width 0.9s ease',
        }} />
      </div>
    </>
  )
}
