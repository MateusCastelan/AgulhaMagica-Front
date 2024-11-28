import { NavBar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'
import PerfilUsuario, { Perfil } from '@/components/PerfilUsuario'

export default function Home() {

    return (
      <>
        <NavBar />
          <PerfilUsuario />
        <Footer />
      </>
    )
  }
  