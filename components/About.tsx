import Image from 'next/image'

export default function About() {
  return (
    <section id="about" style={{ padding: '6rem 2rem', background: 'var(--cream)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>

        {/* Image side */}
        <div className="reveal" style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="about-image-card" style={{
            width: '320px', height: '400px',
            borderRadius: '20px',
            background: 'var(--grad-dark)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            position: 'relative', overflow: 'hidden',
          }}>
            <Image
              src="/logo.png"
              alt="Skinora"
              width={120}
              height={120}
              style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.85, marginBottom: '1.5rem' }}
            />
            <p className="font-serif" style={{ color: 'white', fontSize: '1.4rem', fontWeight: 300, letterSpacing: '0.1em', textAlign: 'center' }}>
              Where Science<br />Meets Beauty
            </p>
            {/* Decorative ring */}
            <div style={{
              position: 'absolute', bottom: '-60px', right: '-60px',
              width: '200px', height: '200px', borderRadius: '50%',
              border: '1px solid rgba(232,168,152,0.3)',
            }} />
          </div>
        </div>

        {/* Text side */}
        <div className="reveal">
          <p style={{ color: 'var(--rose-mid)', letterSpacing: '0.2em', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            About Us
          </p>
          <h2 className="font-serif" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400, lineHeight: 1.2, marginBottom: '1.5rem', color: 'var(--dark)' }}>
            Meet the Founder,<br />
            <span className="gradient-text">Geetha</span>
          </h2>
          <p style={{ color: '#6b7280', lineHeight: 1.9, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
            Skinora was born from a passion for helping every client feel confidently beautiful in their own skin. As Founder and Skin Expert, Geetha brings years of hands-on expertise in advanced aesthetic treatments and a deep commitment to personalised care.
          </p>
          <p style={{ color: '#6b7280', lineHeight: 1.9, marginBottom: '2rem', fontSize: '0.95rem' }}>
            Backed by a dedicated team of skilled dermatologists and aestheticians, Skinora offers clinical precision paired with a luxury experience — right in the heart of Chennai.
          </p>

          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {[
              { label: 'Location', value: 'Thousand Lights, Chennai' },
              { label: 'Speciality', value: 'Skin & Aesthetic Treatments' },
            ].map(item => (
              <div key={item.label}>
                <p style={{ fontSize: '0.75rem', color: 'var(--rose-mid)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>{item.label}</p>
                <p style={{ fontWeight: 500, color: 'var(--dark)', fontSize: '0.9rem' }}>{item.value}</p>
              </div>
            ))}
          </div>

          <a
            href="https://wa.me/917519111234?text=Hello%20Skinora!%20I%27d%20like%20to%20know%20more."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-grad"
            style={{ textDecoration: 'none', display: 'inline-block' }}
          >
            Chat With Us
          </a>
        </div>
      </div>
    </section>
  )
}
