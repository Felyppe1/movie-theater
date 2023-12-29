import { Button } from "@/components/ui/button"
import { Link, Outlet } from "react-router-dom"

export function WebLayout() {
    return (
        <>
            <header className='p-[1rem]'>
              <nav>
                <ul className='flex gap-x-[1rem]'>
                  <li>
                    <Button asChild>
                      <Link to='/'>Página inicial</Link>
                    </Button>
                  </li>
                  <li>
                    <Button asChild>
                      <Link to='/admin'>Admin</Link>
                    </Button>
                  </li>
                </ul>
              </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </>
    )
}