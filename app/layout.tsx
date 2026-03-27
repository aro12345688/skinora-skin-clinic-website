import type { Metadata } from 'next'
import { Cormorant_Garamond, Jost } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-jost',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Skinora — Skin & Beauty Clinic, Chennai',
  description:
    'Skinora is a premium skin and beauty clinic in Chennai offering Jet Plasma, Cryo Plasma, Anti-Melasma, Micro Blading, Lash Extensions, and more. Book your consultation today.',
  keywords: 'skin clinic Chennai, skinora, plasma therapy, anti-melasma, micro blading, lash extensions, beauty clinic',
  openGraph: {
    title: 'Skinora — Skin & Beauty Clinic, Chennai',
    description: 'Premium skin treatments & beauty enhancements in Chennai.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body>{children}</body>
    </html>
  )
}
