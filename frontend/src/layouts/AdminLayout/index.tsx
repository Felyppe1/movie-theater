import { Button } from "@/components/ui/button"
import { Link, Outlet, useLocation } from "react-router-dom"
import { AdminHamburger } from "./AdminHamburger"

export function AdminLayout() {
    const location = useLocation()
    const path = location.pathname

    return (
        <div className={'min-h-screen'}>
            <nav className={'hidden lg:flex flex-col gap-[.5rem] w-[18rem] fixed top-0 bottom-0 p-[.5rem] border-r bg-background'}>
                <Button asChild variant={path.includes('/admin/movie-theater') ? 'secondary' : 'link'} size={"sm"}>
                    <Link to='/admin/movie-theater'>Cinemas</Link>
                </Button>
                <Button asChild variant={path.includes('/admin/movie-selection') ? 'secondary' : 'link'} size={"sm"}>
                    <Link to='/admin/movie-selection'>Seleção de Filmes</Link>
                </Button>
            </nav>
            <main className={'min-h-screen p-[1rem] pb-[5rem] ml-0 lg:ml-[18rem] bg-background max-w-[55rem]'}>
                <header className='flex lg:hidden mb-[1rem]'>
                  <AdminHamburger />
                </header>
                <Outlet />
            </main>
        </div>
    )
}