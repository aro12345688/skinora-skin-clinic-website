'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error: err } = await supabase.from('enquiries').insert([form])
    setLoading(false)
    if (err) { setError('Something went wrong. Please try WhatsApp instead.'); return }
    setSent(true)
    setForm({ name: '', phone: '', message: '' })
  }

  return (
    <section id="contact" style={{ padding: '6rem 2rem', background: 'var(--cream)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>

        {/* Info */}
        <div className="reveal">
          <p style={{ color: 'var(--rose-mid)', letterSpacing: '0.2em', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            Get In Touch
          </p>
          <h2 className="font-serif" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400, lineHeight: 1.2, marginBottom: '1.5rem', color: 'var(--dark)' }}>
            Visit <span className="gradient-text">Skinora</span>
          </h2>

          {[
            { label: 'Address', value: '19, Rutland Gate 4th St, Srirampuram, Thousand Lights West, Chennai – 600006', href: 'https://maps.google.com/?q=19+Rutland+Gate+4th+Street+Thousand+Lights+Chennai+600006' },
            { label: 'Phone / WhatsApp', value: '075191 11234', href: 'https://wa.me/917519111234' },
            { label: 'Instagram', value: '@skinoraofficial', href: 'https://www.instagram.com/skinoraofficial/' },
          ].map(item => (
            <div key={item.label} style={{ marginBottom: '1.5rem' }}>
              <p style={{ fontSize: '0.75rem', color: 'var(--rose-mid)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.3rem' }}>{item.label}</p>
              <a href={item.href} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--dark)', textDecoration: 'none', fontSize: '0.92rem', lineHeight: 1.6 }}>
                {item.value}
              </a>
            </div>
          ))}

          {/* Map */}
          <div style={{ borderRadius: '16px', overflow: 'hidden', height: '220px', marginTop: '1rem' }}>
            <iframe
              src="https://maps.google.com/maps?q=19+Rutland+Gate+4th+Street+Thousand+Lights+Chennai+600006&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Enquiry form */}
        <div className="reveal">
          <div style={{ background: 'white', borderRadius: '20px', padding: '2.5rem', boxShadow: '0 4px 30px rgba(184,92,98,0.08)' }}>
            <h3 className="font-serif" style={{ fontSize: '1.8rem', fontWeight: 400, marginBottom: '0.5rem', color: 'var(--dark)' }}>Send an Enquiry</h3>
            <p style={{ color: '#9ca3af', fontSize: '0.85rem', marginBottom: '2rem' }}>We'll respond on WhatsApp.</p>

            {sent ? (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                <p className="font-serif" style={{ fontSize: '1.3rem', color: 'var(--dark)' }}>Enquiry received!</p>
                <p style={{ color: '#6b7280', fontSize: '0.85rem', marginTop: '0.5rem' }}>We'll be in touch on WhatsApp shortly.</p>
                <button onClick={() => setSent(false)} style={{ marginTop: '1.5rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--rose-mid)', fontSize: '0.85rem' }}>
                  Send another →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input className="form-input" placeholder="Your Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required maxLength={100} />
                <input className="form-input" placeholder="Phone Number" type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} required maxLength={20} />
                <textarea className="form-input" placeholder="Your message or question..." rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required style={{ resize: 'vertical' }} maxLength={1000} />
                {error && <p style={{ color: '#dc2626', fontSize: '0.82rem' }}>{error}</p>}
                <button type="submit" className="btn-grad" disabled={loading} style={{ width: '100%', padding: '0.9rem' }}>
                  {loading ? 'Sending…' : 'Send Enquiry'}
                </button>
              </form>
            )}
          </div>

          {/* Newsletter */}
          <NewsletterWidget />
        </div>
      </div>
    </section>
  )
}

function NewsletterWidget() {
  const [email, setEmail] = useState('')
  const [done, setDone]   = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error: err } = await supabase.from('subscribers').insert([{ email }])
    setLoading(false)
    if (err) {
      setError(err.code === '23505' ? "You're already subscribed!" : 'Could not subscribe. Please try again.')
      return
    }
    setDone(true)
  }

  if (done) return (
    <div style={{ marginTop: '1.5rem', padding: '1.2rem', background: 'var(--pale-blush)', borderRadius: '12px', textAlign: 'center' }}>
      <p style={{ color: 'var(--rose)', fontSize: '0.9rem' }}>You're on the list!</p>
    </div>
  )

  return (
    <form onSubmit={handleSubscribe} style={{ marginTop: '1.5rem', padding: '1.5rem', background: 'var(--pale-blush)', borderRadius: '12px' }}>
      <p style={{ fontSize: '0.85rem', color: 'var(--dark)', fontWeight: 500, marginBottom: '0.75rem' }}>Stay updated with offers & tips</p>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <input
          className="form-input"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ flex: 1 }}
        />
        <button type="submit" className="btn-grad" disabled={loading} style={{ padding: '0.75rem 1.2rem', whiteSpace: 'nowrap' }}>
          {loading ? '…' : 'Subscribe'}
        </button>
      </div>
      {error && <p style={{ color: '#dc2626', fontSize: '0.78rem', marginTop: '0.5rem' }}>{error}</p>}
    </form>
  )
}
