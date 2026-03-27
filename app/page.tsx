'use client'
import { useState, useEffect } from 'react'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import About from '@/components/About'
import InstagramSection from '@/components/InstagramSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import FloatingWhatsApp from '@/components/FloatingWhatsApp'
import BookingModal from '@/components/BookingModal'

export default function Home() {
  const [modalOpen, setModalOpen]       = useState(false)
  const [selectedService, setSelectedService] = useState('')

  const openBooking = (service = '') => {
    setSelectedService(service)
    setModalOpen(true)
  }

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) } }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Nav />
      <Hero onBook={() => openBooking()} />
      <Services onBook={openBooking} />
      <About />
      <InstagramSection />
      <ContactSection />
      <Footer />
      <FloatingWhatsApp />
      <BookingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultService={selectedService}
      />
    </>
  )
}
