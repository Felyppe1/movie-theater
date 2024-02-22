import { Toaster } from "@/components/ui/toaster"
import { LuMapPin } from "react-icons/lu"
import { FaRegUser } from "react-icons/fa6"
import { Link, Outlet, useLocation } from "react-router-dom"
import { Logo } from "@/components/ui/Logo"
import { useAuthStore } from "@/store/auth"
import { useLogout } from "@/hooks/api/useLogout"
import { Hamburger } from "./Hamburger"

export function WebLayout() {
  const location = useLocation()
  const path = location.pathname
  const user = useAuthStore(state => state.user)
  const { handleLogout } = useLogout()

  document.documentElement.className = 'website'

  return (
    <div>
      <header className='bg-background text-foreground h-[5rem] px-[2rem] sm:px-[4rem] xl:px-[10rem] text-base font-semibold'>
        <nav className='flex justify-between items-center h-full'>
          <Link to='/' className='text-semibold'>
            <Logo />
          </Link>
          <button className='hidden lg:flex items-center gap-2'>
            <LuMapPin size={24} />
            <div className='flex flex-col items-start'>
              <span className='font-normal leading-none text-[90%]'>Programação em</span>
              <span className='leading-normal'>Niterói</span>
            </div>
          </button>
          <ul className='hidden lg:flex items-center gap-x-[1rem] h-full'>
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
            {user?.role == 'ADMIN' && (
              <li className='h-full'>
                <Link 
                  to='/admin' 
                  className={`flex items-center h-full relative hover:text-secondary hover:after:absolute after:inset-x-0 after:bottom-3 after:h-1 after:rounded-t-lg after:bg-secondary`}
                >
                  Admin
                </Link>
              </li>
            )}
          </ul>
          <div className='hidden lg:flex'>
            {user ? (
              <div className='flex gap-[2rem] h-full'>
                
                <div className='flex flex-col justify-center'>
                  <button onClick={handleLogout} className='self-end w-fit leading-none text-[90%] text-primary/60 font-normal underline'>Sair</button>
                  <button>{user.email}</button>
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
          </div>
          <Hamburger />
        </nav>
      </header>
      <main className='bg-background min-h-screen text-white'>
        <Toaster />
        <Outlet />
      </main>
    </div>
  )
}