'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail]     = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error: err } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (err) { setError(err.message); return }
    router.push('/admin/dashboard')
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--grad-dark)', padding: '2rem',
    }}>
      <div style={{ background: 'white', borderRadius: '20px', padding: '3rem', width: '100%', maxWidth: '420px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <p className="font-serif" style={{ fontSize: '2rem', fontWeight: 500, color: 'var(--dark)', letterSpacing: '0.1em' }}>SKINORA</p>
          <p style={{ color: '#9ca3af', fontSize: '0.85rem', marginTop: '0.25rem' }}>Admin Portal</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--rose-mid)', display: 'block', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>Email</label>
            <input className="form-input" type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="geetha@skinora.in" />
          </div>
          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--rose-mid)', display: 'block', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>Password</label>
            <input className="form-input" type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" />
          </div>
          {error && <p style={{ color: '#dc2626', fontSize: '0.82rem' }}>{error}</p>}
          <button type="submit" className="btn-grad" disabled={loading} style={{ width: '100%', padding: '0.9rem', marginTop: '0.5rem' }}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
