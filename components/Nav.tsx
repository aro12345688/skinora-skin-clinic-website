'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const links = [
  { href: '#home',      label: 'Home' },
  { href: '#services',  label: 'Services' },
  { href: '#about',     label: 'About' },
  { href: '#instagram', label: 'Gallery' },
  { href: '#contact',   label: 'Contact' },
]

export default function Nav() {
  const [scrolled, setScrolled]   = useState(false)
  const [open, setOpen]           = useState(false)
  const [active, setActive]       = useState('')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
      const sections = document.querySelectorAll('section[id]')
      let cur = ''
      sections.forEach(s => {
        if (window.scrollY >= (s as HTMLElement).offsetTop - 100) cur = s.getAttribute('id') ?? ''
      })
      setActive(cur)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      document.body.style.overflow = '' // Restore scroll if Nav unmounts while menu is open
    }
  }, [])

  const close = () => { setOpen(false); document.body.style.overflow = '' }
  const toggle = () => {
    const next = !open
    setOpen(next)
    document.body.style.overflow = next ? 'hidden' : ''
  }

  return (
    <nav
      id="nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'nav-scrolled' : 'bg-transparent'
      }`}
      style={{ padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
    >
      {/* Logo */}
      <a href="#home" onClick={close} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
        <Image
          src="/logo.png"
          alt="Skinora"
          width={120}
          height={48}
          style={{ objectFit: 'contain' }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
        />
      </a>

      {/* Desktop links */}
      <ul className="hidden md:flex" style={{ listStyle: 'none', gap: '2rem', alignItems: 'center' }}>
        {links.map(l => (
          <li key={l.href}>
            <a
              href={l.href}
              style={{
                textDecoration: 'none',
                fontSize: '0.85rem',
                letterSpacing: '0.08em',
                fontWeight: 500,
                textTransform: 'uppercase',
                color: scrolled
                  ? (active === l.href.slice(1) ? 'var(--rose)' : 'var(--dark)')
                  : 'rgba(255,255,255,0.9)',
                transition: 'color 0.2s',
              }}
            >
              {l.label}
            </a>
          </li>
        ))}
        <li>
          <a
            href="https://wa.me/917519111234?text=Hello%20Skinora!%20I%27d%20like%20to%20book%20a%20consultation."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-grad"
            style={{ padding: '0.55rem 1.4rem', fontSize: '0.8rem' }}
          >
            Book Now
          </a>
        </li>
      </ul>

      {/* Hamburger */}
      <button
        className="flex md:hidden flex-col justify-center items-center"
        onClick={toggle}
        aria-label="Toggle menu"
        aria-expanded={open}
        style={{ background: 'none', border: 'none', cursor: 'pointer', gap: '5px', padding: '4px' }}
      >
        {[0,1,2].map(i => (
          <span key={i} style={{
            display: 'block', width: '24px', height: '2px',
            background: scrolled ? 'var(--dark)' : 'white',
            borderRadius: '2px',
            transition: 'all 0.3s',
            transformOrigin: 'center',
            transform: open
              ? i === 0 ? 'translateY(7px) rotate(45deg)'
              : i === 2 ? 'translateY(-7px) rotate(-45deg)'
              : 'scaleX(0)'
              : 'none',
          }} />
        ))}
      </button>

      {/* Mobile menu */}
      <div
        className="md:hidden"
        style={{
          position: 'fixed', top: 0, right: open ? 0 : '-100%', width: '75vw', maxWidth: '320px',
          height: '100vh', background: 'white',
          boxShadow: '-8px 0 40px rgba(0,0,0,0.12)',
          transition: 'right 0.35s ease',
          display: 'flex', flexDirection: 'column', padding: '5rem 2rem 2rem',
          zIndex: 40,
        }}
      >
        {links.map(l => (
          <a
            key={l.href}
            href={l.href}
            onClick={close}
            style={{
              textDecoration: 'none', padding: '1rem 0',
              borderBottom: '1px solid var(--light-blush)',
              fontSize: '1rem', fontWeight: 500,
              color: active === l.href.slice(1) ? 'var(--rose)' : 'var(--dark)',
              letterSpacing: '0.06em',
            }}
          >
            {l.label}
          </a>
        ))}
        <a
          href="https://wa.me/917519111234?text=Hello%20Skinora!%20I%27d%20like%20to%20book%20a%20consultation."
          target="_blank"
          rel="noopener noreferrer"
          className="btn-grad"
          onClick={close}
          style={{ marginTop: '2rem', textDecoration: 'none', textAlign: 'center' }}
        >
          Book Now
        </a>
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="md:hidden"
          onClick={close}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 30 }}
        />
      )}
    </nav>
  )
}
