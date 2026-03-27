'use client'
import { useEffect, useState } from 'react'
import { supabase, Booking } from '@/lib/supabase'

export default function Bookings() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading]   = useState(true)
  const [filter, setFilter]     = useState('all')

  const load = async () => {
    setLoading(true)
    let q = supabase.from('bookings').select('*').order('created_at', { ascending: false })
    if (filter !== 'all') q = q.eq('status', filter)
    const { data } = await q
    setBookings(data ?? [])
    setLoading(false)
  }

  useEffect(() => { load() }, [filter])

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('bookings').update({ status }).eq('id', id)
    load()
  }

  return (
    <div>
      <h1 className="font-serif" style={{ fontSize: '2rem', fontWeight: 400, color: 'var(--dark)', marginBottom: '0.25rem' }}>Bookings</h1>
      <p style={{ color: '#9ca3af', fontSize: '0.85rem', marginBottom: '1.5rem' }}>{bookings.length} record(s)</p>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {['all', 'pending', 'confirmed', 'cancelled'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: '0.4rem 1rem', borderRadius: '20px', border: '1.5px solid',
              borderColor: filter === f ? 'var(--rose-mid)' : '#e5d0cc',
              background: filter === f ? 'var(--grad)' : 'white',
              color: filter === f ? 'white' : '#6b7280',
              fontSize: '0.8rem', cursor: 'pointer', textTransform: 'capitalize',
            }}
          >
            {f}
          </button>
        ))}
      </div>

      <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #f0e0dc', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
            <thead>
              <tr style={{ background: '#fdf8f7' }}>
                {['Name', 'Phone', 'Service', 'Date', 'Time', 'Status', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.72rem', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} style={{ padding: '2rem', textAlign: 'center', color: '#9ca3af' }}>Loading…</td></tr>
              ) : bookings.length === 0 ? (
                <tr><td colSpan={7} style={{ padding: '2rem', textAlign: 'center', color: '#9ca3af', fontSize: '0.85rem' }}>No bookings found.</td></tr>
              ) : bookings.map(row => (
                <tr key={row.id} style={{ borderTop: '1px solid #f9f1f0' }}>
                  <td style={{ padding: '0.9rem 1rem', fontSize: '0.85rem', fontWeight: 500, color: 'var(--dark)' }}>{row.name}</td>
                  <td style={{ padding: '0.9rem 1rem', fontSize: '0.82rem' }}>
                    <a href={`https://wa.me/91${row.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ color: '#25D366', textDecoration: 'none' }}>
                      {row.phone}
                    </a>
                  </td>
                  <td style={{ padding: '0.9rem 1rem', fontSize: '0.82rem', color: '#6b7280', maxWidth: '160px' }}>{row.service}</td>
                  <td style={{ padding: '0.9rem 1rem', fontSize: '0.82rem', color: '#6b7280', whiteSpace: 'nowrap' }}>{row.date}</td>
                  <td style={{ padding: '0.9rem 1rem', fontSize: '0.82rem', color: '#6b7280', whiteSpace: 'nowrap' }}>{row.time}</td>
                  <td style={{ padding: '0.9rem 1rem' }}>
                    <span className={`badge badge-${row.status ?? 'pending'}`}>{row.status ?? 'pending'}</span>
                  </td>
                  <td style={{ padding: '0.9rem 1rem' }}>
                    <select
                      defaultValue=""
                      onChange={e => { if (e.target.value) updateStatus(row.id!, e.target.value) }}
                      style={{ fontSize: '0.78rem', border: '1px solid #e5d0cc', borderRadius: '6px', padding: '0.25rem 0.5rem', cursor: 'pointer', background: 'white' }}
                    >
                      <option value="" disabled>Update</option>
                      <option value="confirmed">Confirm</option>
                      <option value="cancelled">Cancel</option>
                      <option value="pending">Pending</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
