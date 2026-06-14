import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Manifiesto from '@/components/Manifiesto'
import Servicios from '@/components/Servicios'
import Contacto from '@/components/Contacto'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Manifiesto />
        <Servicios />
        <Contacto />
      </main>
      <Footer />
    </>
  )
}
