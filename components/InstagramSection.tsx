export default function InstagramSection() {
  const tiles = Array.from({ length: 6 }, (_, i) => i)

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

        {/* Placeholder tiles */}
        <div className="reveal" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: '0.75rem',
          marginBottom: '2.5rem',
        }}>
          {tiles.map(i => (
            <a
              key={i}
              href="https://www.instagram.com/skinoraofficial/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                aspectRatio: '1',
                borderRadius: '12px',
                background: `linear-gradient(${135 + i * 20}deg, #A85258, #E8A898)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                textDecoration: 'none',
                opacity: 0.85,
                transition: 'opacity 0.2s, transform 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1'; (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.03)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.85'; (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)' }}
            >
              <span style={{ fontSize: '2rem' }}>✨</span>
            </a>
          ))}
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
