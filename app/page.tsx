import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Manifiesto from '@/components/Manifiesto'
import Proyectos from '@/components/Proyectos'
import Contacto from '@/components/Contacto'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Manifiesto />
        <Proyectos />
        <Contacto />
      </main>
      <Footer />
    </>
  )
}
