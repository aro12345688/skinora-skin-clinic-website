'use client'
import { useEffect, useState } from 'react'
import { supabase, Enquiry } from '@/lib/supabase'

export default function Enquiries() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [loading, setLoading]     = useState(true)

  const load = async () => {
    setLoading(true)
    const { data } = await supabase.from('enquiries').select('*').order('created_at', { ascending: false })
    setEnquiries(data ?? [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('enquiries').update({ status }).eq('id', id)
    load()
  }

  return (
    <div>
      <h1 className="font-serif" style={{ fontSize: '2rem', fontWeight: 400, color: 'var(--dark)', marginBottom: '0.25rem' }}>Enquiries</h1>
      <p style={{ color: '#9ca3af', fontSize: '0.85rem', marginBottom: '1.5rem' }}>{enquiries.length} enquiry(ies)</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {loading && <p style={{ color: '#9ca3af', padding: '2rem', textAlign: 'center' }}>Loading…</p>}
        {!loading && enquiries.length === 0 && (
          <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #f0e0dc', padding: '3rem', textAlign: 'center', color: '#9ca3af', fontSize: '0.85rem' }}>
            No enquiries yet.
          </div>
        )}
        {enquiries.map(row => (
          <div key={row.id} style={{
            background: 'white', borderRadius: '16px', border: '1px solid #f0e0dc',
            padding: '1.5rem', display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem',
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--dark)' }}>{row.name}</span>
                <a href={`https://wa.me/91${row.phone?.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ color: '#25D366', fontSize: '0.82rem', textDecoration: 'none' }}>{row.phone}</a>
                <span className={`badge badge-${row.status ?? 'new'}`}>{row.status ?? 'new'}</span>
                <span style={{ color: '#d1d5db', fontSize: '0.75rem' }}>{row.created_at ? new Date(row.created_at).toLocaleDateString() : ''}</span>
              </div>
              <p style={{ color: '#6b7280', fontSize: '0.88rem', lineHeight: 1.7 }}>{row.message}</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-end' }}>
              {['read', 'replied'].filter(s => s !== row.status).map(s => (
                <button
                  key={s}
                  onClick={() => updateStatus(row.id!, s)}
                  style={{
                    padding: '0.35rem 0.8rem', borderRadius: '8px', border: '1px solid #e5d0cc',
                    background: 'white', cursor: 'pointer', fontSize: '0.75rem', color: '#6b7280',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Mark {s}
                </button>
              ))}
              <a
                href={`https://wa.me/91${row.phone?.replace(/\D/g, '')}?text=Hi%20${encodeURIComponent(row.name ?? '')}!%20This%20is%20Skinora%20responding%20to%20your%20enquiry.`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '0.35rem 0.8rem', borderRadius: '8px', background: '#25D366',
                  color: 'white', fontSize: '0.75rem', textDecoration: 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                Reply on WA
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
