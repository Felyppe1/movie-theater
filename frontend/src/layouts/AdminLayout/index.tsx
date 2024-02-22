import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/toaster"
import { Link, Outlet, useLocation } from "react-router-dom"

export function AdminLayout() {
  const location = useLocation()
  const path = location.pathname

  document.documentElement.removeAttribute('class')

  return (
    <div className={'min-h-screen'}>
      <nav className={'hidden lg:flex flex-col gap-[.5rem] w-[18rem] fixed top-0 bottom-0 p-[.5rem] border-r bg-background'}>
        <Button asChild variant='link' size={"sm"}>
          <Link to='/'>Ir ao site</Link>
        </Button>
        <Button asChild variant={path.includes('/admin/movie-theater') ? 'secondary' : 'link'} size={"sm"}>
          <Link to='/admin/movie-theater'>Cinemas</Link>
        </Button>
        <Button asChild variant={path.includes('/admin/movie-selection') ? 'secondary' : 'link'} size={"sm"}>
          <Link to='/admin/movie-selection'>Seleção de Filmes</Link>
        </Button>
      </nav>
      <main className={'min-h-screen p-[1rem] pb-[5rem] ml-0 lg:ml-[18rem] bg-background max-w-[55rem]'}>
        <Toaster />
        <Outlet />
      </main>
    </div>
  )
}