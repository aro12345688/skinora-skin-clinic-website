'use client'
import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

const NAV = [
  { href: '/admin/dashboard',    icon: '📊', label: 'Dashboard' },
  { href: '/admin/bookings',     icon: '📅', label: 'Bookings' },
  { href: '/admin/enquiries',    icon: '💬', label: 'Enquiries' },
  { href: '/admin/subscribers',  icon: '📧', label: 'Subscribers' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router   = useRouter()
  const pathname = usePathname()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    // On login page, no auth check needed
    if (pathname === '/admin') { setChecked(true); return }
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) router.replace('/admin')
      else setChecked(true)
    })
  }, [pathname, router])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/admin')
  }

  if (!checked) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--pale-blush)' }}>
      <p style={{ color: 'var(--rose-mid)' }}>Loading…</p>
    </div>
  )

  // Login page: no sidebar
  if (pathname === '/admin') return <>{children}</>

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f9fafb' }}>
      {/* Sidebar */}
      <aside style={{
        width: '240px', minHeight: '100vh', background: 'white',
        borderRight: '1px solid #f0e0dc', padding: '2rem 1rem',
        display: 'flex', flexDirection: 'column',
        position: 'sticky', top: 0, height: '100vh',
      }}>
        <Link href="/" style={{ textDecoration: 'none', marginBottom: '2.5rem', display: 'block' }}>
          <p className="font-serif" style={{ fontSize: '1.4rem', fontWeight: 500, color: 'var(--rose)', letterSpacing: '0.1em' }}>SKINORA</p>
          <p style={{ fontSize: '0.72rem', color: '#9ca3af', marginTop: '2px' }}>Admin Portal</p>
        </Link>

        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {NAV.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`admin-sidebar-link ${pathname === item.href ? 'active' : ''}`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <button
          onClick={handleSignOut}
          style={{
            background: 'none', border: '1px solid #fee2e2', borderRadius: '10px',
            padding: '0.65rem 1rem', cursor: 'pointer', color: '#991b1b',
            fontSize: '0.85rem', width: '100%', textAlign: 'left',
            display: 'flex', alignItems: 'center', gap: '0.5rem',
          }}
        >
          🚪 Sign Out
        </button>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
        {children}
      </main>
    </div>
  )
}
