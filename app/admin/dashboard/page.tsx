'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function Dashboard() {
  const [counts, setCounts]   = useState({ bookings: 0, pending: 0, enquiries: 0, subscribers: 0 })
  const [recent, setRecent]   = useState<Array<{ id: string; name: string; service: string; date: string; status: string }>>([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState('')

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const [b, p, e, s, r] = await Promise.all([
          supabase.from('bookings').select('id', { count: 'exact', head: true }),
          supabase.from('bookings').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
          supabase.from('enquiries').select('id', { count: 'exact', head: true }),
          supabase.from('subscribers').select('id', { count: 'exact', head: true }),
          supabase.from('bookings').select('id,name,service,date,status').order('created_at', { ascending: false }).limit(5),
        ])
        if (b.error || p.error || e.error || s.error || r.error) {
          setError('Could not load some dashboard data.')
        }
        setCounts({
          bookings:    b.count ?? 0,
          pending:     p.count ?? 0,
          enquiries:   e.count ?? 0,
          subscribers: s.count ?? 0,
        })
        setRecent(r.data ?? [])
      } catch {
        setError('Failed to connect. Check your internet connection.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const stats = [
    { label: 'Total Bookings',   value: counts.bookings,    icon: '📅', href: '/admin/bookings',    color: '#dbeafe' },
    { label: 'Pending Bookings', value: counts.pending,     icon: '⏳', href: '/admin/bookings',    color: '#fef3c7' },
    { label: 'Enquiries',        value: counts.enquiries,   icon: '💬', href: '/admin/enquiries',   color: '#f3e8ff' },
    { label: 'Subscribers',      value: counts.subscribers, icon: '📧', href: '/admin/subscribers', color: '#d1fae5' },
  ]

  return (
    <div>
      <h1 className="font-serif" style={{ fontSize: '2rem', fontWeight: 400, color: 'var(--dark)', marginBottom: '0.25rem' }}>Dashboard</h1>
      <p style={{ color: '#9ca3af', fontSize: '0.85rem', marginBottom: '2rem' }}>Welcome back, Geetha!</p>

      {error && (
        <p style={{ color: '#dc2626', fontSize: '0.85rem', marginBottom: '1.5rem', background: '#fef2f2', padding: '0.75rem 1rem', borderRadius: '8px' }}>{error}</p>
      )}

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
        {stats.map(s => (
          <Link key={s.label} href={s.href} style={{ textDecoration: 'none' }}>
            <div style={{
              background: 'white', borderRadius: '16px', padding: '1.5rem',
              border: '1px solid #f0e0dc',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'pointer',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 24px rgba(184,92,98,0.1)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'none'; (e.currentTarget as HTMLDivElement).style.boxShadow = 'none' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ background: s.color, borderRadius: '10px', padding: '0.5rem', fontSize: '1.2rem' }}>{s.icon}</span>
              </div>
              <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--dark)', fontFamily: 'Jost, sans-serif' }}>
                {loading ? '—' : s.value}
              </p>
              <p style={{ color: '#9ca3af', fontSize: '0.8rem', marginTop: '0.25rem' }}>{s.label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent bookings */}
      <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #f0e0dc', overflow: 'hidden' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #f0e0dc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--dark)' }}>Recent Bookings</h2>
          <Link href="/admin/bookings" style={{ color: 'var(--rose-mid)', fontSize: '0.8rem', textDecoration: 'none' }}>View all →</Link>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#fdf8f7' }}>
                {['Name', 'Service', 'Date', 'Status'].map(h => (
                  <th key={h} style={{ padding: '0.75rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recent.map(row => (
                <tr key={row.id} style={{ borderTop: '1px solid #f9f1f0' }}>
                  <td style={{ padding: '1rem 1.5rem', fontSize: '0.88rem', fontWeight: 500, color: 'var(--dark)' }}>{row.name}</td>
                  <td style={{ padding: '1rem 1.5rem', fontSize: '0.82rem', color: '#6b7280' }}>{row.service}</td>
                  <td style={{ padding: '1rem 1.5rem', fontSize: '0.82rem', color: '#6b7280' }}>{row.date}</td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <span className={`badge badge-${row.status}`}>{row.status}</span>
                  </td>
                </tr>
              ))}
              {recent.length === 0 && (
                <tr><td colSpan={4} style={{ padding: '2rem', textAlign: 'center', color: '#9ca3af', fontSize: '0.85rem' }}>No bookings yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
