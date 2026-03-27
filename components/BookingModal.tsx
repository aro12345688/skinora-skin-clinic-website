'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

const ALL_SERVICES = [
  'Jet Plasma Therapy', 'Cryo Plasma Therapy', 'Anti-Melasma Treatment',
  'Anti-Sensitivity Treatment', 'Under Eye Brightening Treatment',
  'Instant Glow Hybrid Treatment', 'BB Glow', 'Plasma Skin Tightening',
  'Hollywood Hair Reduction', 'Eyebrow Tinting', 'Lip Shading',
  'Lashes Extension', 'Micro Blading | Micro Shading',
  'Eyebrow Laminating', 'Lip Pigmentation',
]

const TIME_SLOTS = [
  '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM',
  '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
]

type Props = {
  isOpen: boolean
  onClose: () => void
  defaultService?: string
}

export default function BookingModal({ isOpen, onClose, defaultService = '' }: Props) {
  const [form, setForm] = useState({
    name: '', phone: '', service: defaultService, date: '', time: '', message: '',
  })
  const [loading, setLoading]   = useState(false)
  const [success, setSuccess]   = useState(false)
  const [error, setError]       = useState('')

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error: err } = await supabase.from('bookings').insert([form])
    setLoading(false)
    if (err) { setError('Something went wrong. Please contact us on WhatsApp.'); return }
    setSuccess(true)
  }

  const handleClose = () => {
    setSuccess(false)
    setForm({ name: '', phone: '', service: defaultService, date: '', time: '', message: '' })
    setError('')
    onClose()
  }

  // Min date: today
  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
          <div>
            <h2 className="font-serif" style={{ fontSize: '1.8rem', fontWeight: 400, color: 'var(--dark)' }}>Book a Consultation</h2>
            <p style={{ color: '#9ca3af', fontSize: '0.82rem', marginTop: '0.25rem' }}>We'll confirm via WhatsApp.</p>
          </div>
          <button onClick={handleClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.4rem', color: '#9ca3af', lineHeight: 1 }}>×</button>
        </div>

        {success ? (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🎉</div>
            <h3 className="font-serif" style={{ fontSize: '1.5rem', fontWeight: 400, color: 'var(--dark)', marginBottom: '0.5rem' }}>Booking Received!</h3>
            <p style={{ color: '#6b7280', fontSize: '0.88rem', lineHeight: 1.7 }}>
              Thank you, {form.name}! We'll confirm your appointment on WhatsApp at {form.phone}.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginTop: '1.5rem', flexWrap: 'wrap' }}>
              <a
                href={`https://wa.me/917519111234?text=Hi%20Skinora!%20I%20just%20booked%20${encodeURIComponent(form.service)}%20on%20${form.date}%20at%20${form.time}.%20My%20name%20is%20${encodeURIComponent(form.name)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-grad"
                style={{ textDecoration: 'none' }}
              >
                Confirm on WhatsApp
              </a>
              <button onClick={handleClose} style={{ background: 'none', border: '1px solid #e5d0cc', borderRadius: '40px', padding: '0.75rem 1.5rem', cursor: 'pointer', fontSize: '0.85rem', color: '#6b7280' }}>
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <input className="form-input" placeholder="Full Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
              <input className="form-input" placeholder="Phone Number" type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} required />
            </div>

            <select
              className="form-input"
              value={form.service}
              onChange={e => setForm({ ...form, service: e.target.value })}
              required
              style={{ color: form.service ? 'var(--dark)' : '#9ca3af' }}
            >
              <option value="" disabled>Select a Service</option>
              {ALL_SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <input
                className="form-input"
                type="date"
                value={form.date}
                min={today}
                onChange={e => setForm({ ...form, date: e.target.value })}
                required
              />
              <select
                className="form-input"
                value={form.time}
                onChange={e => setForm({ ...form, time: e.target.value })}
                required
                style={{ color: form.time ? 'var(--dark)' : '#9ca3af' }}
              >
                <option value="" disabled>Select Time</option>
                {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <textarea
              className="form-input"
              placeholder="Any notes or questions? (optional)"
              rows={3}
              value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              style={{ resize: 'vertical' }}
            />

            {error && <p style={{ color: '#dc2626', fontSize: '0.82rem' }}>{error}</p>}

            <button type="submit" className="btn-grad" disabled={loading} style={{ width: '100%', padding: '0.9rem' }}>
              {loading ? 'Booking…' : 'Confirm Booking'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
