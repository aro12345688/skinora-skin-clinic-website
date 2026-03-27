export default function Footer() {
  return (
    <footer style={{ background: 'var(--grad-dark)', color: 'rgba(255,255,255,0.7)', padding: '3rem 2rem 2rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>

          <div>
            <p className="font-serif" style={{ fontSize: '1.6rem', color: 'white', fontWeight: 500, letterSpacing: '0.1em', marginBottom: '0.75rem' }}>SKINORA</p>
            <p style={{ fontSize: '0.82rem', lineHeight: 1.8 }}>Chennai&apos;s premium destination for advanced skin treatments and luxury beauty enhancements.</p>
          </div>

          <div>
            <p style={{ color: 'var(--peach)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1rem' }}>Quick Links</p>
            {['#home', '#services', '#about', '#instagram', '#contact'].map(href => (
              <a key={href} href={href} style={{ display: 'block', color: 'rgba(255,255,255,0.65)', textDecoration: 'none', fontSize: '0.85rem', marginBottom: '0.5rem', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--peach)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
              >
                {href.replace('#', '').charAt(0).toUpperCase() + href.slice(2)}
              </a>
            ))}
          </div>

          <div>
            <p style={{ color: 'var(--peach)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1rem' }}>Contact</p>
            <p style={{ fontSize: '0.82rem', lineHeight: 1.8 }}>19, Rutland Gate 4th St,<br />Thousand Lights West,<br />Chennai – 600006</p>
            <a href="https://wa.me/917519111234" style={{ color: 'var(--peach)', fontSize: '0.85rem', display: 'block', marginTop: '0.75rem', textDecoration: 'none' }}>
              075191 11234
            </a>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', fontSize: '0.78rem' }}>
          <p>© {new Date().getFullYear()} Skinora. All rights reserved.</p>
          <a href="https://www.instagram.com/skinoraofficial/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--peach)', textDecoration: 'none' }}>
            @skinoraofficial
          </a>
        </div>
      </div>
    </footer>
  )
}
