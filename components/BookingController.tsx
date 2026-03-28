'use client'
import { useState, useEffect } from 'react'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import BookingModal from '@/components/BookingModal'

export default function BookingController() {
  const [modalOpen, setModalOpen]             = useState(false)
  const [selectedService, setSelectedService] = useState('')

  const openBooking = (service = '') => {
    setSelectedService(service)
    setModalOpen(true)
  }

  // Scroll reveal — runs after ALL components (including server-rendered ones) are in the DOM
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Hero onBook={() => openBooking()} />
      <Services onBook={openBooking} />
      <BookingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultService={selectedService}
      />
    </>
  )
}
