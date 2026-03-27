'use client'
import { useEffect, useState } from 'react'
import { supabase, Subscriber } from '@/lib/supabase'

export default function Subscribers() {
  const [subs, setSubs]       = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('subscribers').select('*').order('created_at', { ascending: false })
      .then(({ data }) => { setSubs(data ?? []); setLoading(false) })
  }, [])

  const exportCsv = () => {
    const rows = [['Name', 'Email', 'Phone', 'Signed Up'], ...subs.map(s => [s.name ?? '', s.email ?? '', s.phone ?? '', s.created_at ? new Date(s.created_at).toLocaleDateString() : ''])]
    const csv = rows.map(r => r.map(v => `"${v}"`).join(',')).join('\n')
    const a = document.createElement('a'); a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv); a.download = 'skinora-subscribers.csv'; a.click()
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 className="font-serif" style={{ fontSize: '2rem', fontWeight: 400, color: 'var(--dark)', marginBottom: '0.25rem' }}>Subscribers</h1>
          <p style={{ color: '#9ca3af', fontSize: '0.85rem' }}>{subs.length} subscriber(s)</p>
        </div>
        <button onClick={exportCsv} className="btn-grad" style={{ padding: '0.6rem 1.4rem', fontSize: '0.82rem' }}>
          Export CSV
        </button>
      </div>

      <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #f0e0dc', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#fdf8f7' }}>
                {['Email', 'Name', 'Phone', 'Signed Up'].map(h => (
                  <th key={h} style={{ padding: '0.75rem 1.5rem', textAlign: 'left', fontSize: '0.72rem', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} style={{ padding: '2rem', textAlign: 'center', color: '#9ca3af' }}>Loading…</td></tr>
              ) : subs.length === 0 ? (
                <tr><td colSpan={4} style={{ padding: '2rem', textAlign: 'center', color: '#9ca3af', fontSize: '0.85rem' }}>No subscribers yet.</td></tr>
              ) : subs.map(row => (
                <tr key={row.id} style={{ borderTop: '1px solid #f9f1f0' }}>
                  <td style={{ padding: '0.9rem 1.5rem', fontSize: '0.85rem', color: 'var(--dark)' }}>{row.email ?? '—'}</td>
                  <td style={{ padding: '0.9rem 1.5rem', fontSize: '0.85rem', color: '#6b7280' }}>{row.name ?? '—'}</td>
                  <td style={{ padding: '0.9rem 1.5rem', fontSize: '0.82rem', color: '#6b7280' }}>
                    {row.phone ? (
                      <a href={`https://wa.me/91${row.phone.replace(/\D/g,'')}`} target="_blank" rel="noopener noreferrer" style={{ color: '#25D366', textDecoration: 'none' }}>{row.phone}</a>
                    ) : '—'}
                  </td>
                  <td style={{ padding: '0.9rem 1.5rem', fontSize: '0.82rem', color: '#9ca3af' }}>
                    {row.created_at ? new Date(row.created_at).toLocaleDateString() : ''}
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
