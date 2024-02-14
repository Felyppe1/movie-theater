import { Toaster } from "@/components/ui/toaster"
import { LuMapPin } from "react-icons/lu"
import { FaRegUser } from "react-icons/fa6"
import { Link, Outlet, useLocation } from "react-router-dom"
import { Logo } from "@/components/ui/Logo"
import { useAuthStore } from "@/store/auth"
import { useLogout } from "@/hooks/api/useLogout"

export function WebLayout() {
  const location = useLocation()
  const path = location.pathname
  const user = useAuthStore(state => state.user)
  const { handleLogout } = useLogout()

  return (
    <div className='website'>
      <header className='bg-background text-foreground h-[5rem] px-[10rem] text-base font-semibold'>
        <nav className='flex justify-between items-center h-full'>
          <Link to='/' className='text-semibold'>
            <Logo />
          </Link>
          <button className='flex items-center gap-2'>
            <LuMapPin size={24} />
            <div className='flex flex-col items-start'>
              <span className='font-normal leading-none text-[90%]'>Programação em</span>
              <span className='leading-normal'>Niterói</span>
            </div>
          </button>
          <ul className='flex items-center gap-x-[2rem] h-full'>
            <li className='h-full'>
              <Link to='/em-cartaz' className={`flex items-center h-full relative hover:text-secondary hover:after:absolute after:inset-x-0 after:bottom-3 after:h-1 after:rounded-t-lg after:bg-secondary 
              ${path.includes('/em-cartaz') && 'text-secondary after:absolute'}`}>Em cartaz</Link>
            </li>
            <li className='h-full'>
              <Link to='/em-cartaz' className={`flex items-center h-full relative hover:text-secondary hover:after:absolute after:inset-x-0 after:bottom-3 after:h-1 after:rounded-t-lg after:bg-secondary 
              `
            }>Em breve</Link>
            </li>
            <li className='h-full'>
              <Link to='/em-cartaz' className={`flex items-center h-full relative hover:text-secondary hover:after:absolute after:inset-x-0 after:bottom-3 after:h-1 after:rounded-t-lg after:bg-secondary 
              `
            }>Cinemas</Link>
            </li>
          </ul>
          {user ? (
            <div className='flex gap-[2rem] h-full'>
              {user.role == 'ADMIN' && (
                <Link 
                  to='/admin' 
                  className={`flex items-center h-full relative hover:text-secondary hover:after:absolute after:inset-x-0 after:bottom-3 after:h-1 after:rounded-t-lg after:bg-secondary`}
                >
                  Admin
                </Link>
              )}
              <div className='flex flex-col justify-center'>
                <button onClick={handleLogout} className='self-end w-fit leading-none text-[90%] font-normal underline'>Sair</button>
                <button>felyppe.nunes@gmail.com</button>
              </div>
            </div>
          ) : (
            <Link to='/login' className='flex items-center gap-2'>
              <FaRegUser color='text-secondary' size={20} />
              <span>
                Conectar-se
              </span>
            </Link>
          )}
        </nav>
      </header>
      <main className='bg-background min-h-screen text-white'>
        <Toaster />
        <Outlet />
      </main>
    </div>
  )
}