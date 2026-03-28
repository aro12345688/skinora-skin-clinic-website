import Nav from '@/components/Nav'
import BookingController from '@/components/BookingController'
import About from '@/components/About'
import InstagramSection from '@/components/InstagramSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import FloatingWhatsApp from '@/components/FloatingWhatsApp'

export default function Home() {
  return (
    <>
      <Nav />
      <BookingController />
      <About />
      <InstagramSection />
      <ContactSection />
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}
