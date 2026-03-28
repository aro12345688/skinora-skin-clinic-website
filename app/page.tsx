import Nav from '@/components/Nav'
import BookingController from '@/components/BookingController'
import About from '@/components/About'
import InstagramSection from '@/components/InstagramSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import FloatingWhatsApp from '@/components/FloatingWhatsApp'
import Loader from '@/components/Loader'

export default function Home() {
  return (
    <>
      <Loader />
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
