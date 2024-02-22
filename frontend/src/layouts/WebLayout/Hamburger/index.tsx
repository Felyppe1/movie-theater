import { useEffect, useRef } from "react"
import { Link, useLocation } from "react-router-dom"
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/store/auth"
import { LuMapPin } from "react-icons/lu"
import { FaRegUser } from "react-icons/fa6"
import { useLogout } from "@/hooks/api/useLogout"


export function Hamburger() {
  const user = useAuthStore(state => state.user)
  const { handleLogout } = useLogout()

  const buttonRef = useRef<HTMLButtonElement>(null)

  const location = useLocation()
  const path = location.pathname
  
  useEffect(() => {
    window.addEventListener('resize', closeMenuIfLargeScreen)

    return () => {
      window.removeEventListener('resize', closeMenuIfLargeScreen)
    }
  }, [])

  const closeMenuIfLargeScreen = () => {
    if (window.innerWidth > 1023) {
      buttonRef.current?.click()
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild className="website">
        <Button type='button' size='tiny' variant='ghost' className='flex lg:hidden flex-col gap-[.375rem] w-[2.5rem] p-1.5'>
          <span className='w-full h-[.125rem] rounded-md bg-primary'></span>
          <span className='w-full h-[.125rem] rounded-md bg-primary'></span>
          <span className='w-full h-[.125rem] rounded-md bg-primary'></span>
        </Button>
      </SheetTrigger>
      <SheetContent className='website flex flex-col items-start w-full max-w-[18rem] sm:max-w-[18rem] lg:max-w-[18rem] px-3 py-10 overflow-y-auto'>
        <div className='flex pl-4'>
          {user ? (
            <div className='flex gap-[2rem] h-full'>
              
              <div className='flex flex-col justify-center'>
                <button onClick={handleLogout} className='w-fit leading-none text-[90%] text-primary/60 font-normal underline mb-1'>Sair</button>
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

        <nav className='mt-[3rem]'>
          <ul className='flex flex-col justify-start gap-3'>
            <li className='flex'>
              <SheetClose asChild>
                <Button asChild variant='ghost' size='tiny' className={`flex h-7 pl-5 text-base relative hover:text-secondary hover:after:absolute after:inset-y-0 after:left-0 after:w-1 after:rounded-r-lg after:bg-secondary 
                  ${path.includes('/em-cartaz') && 'text-secondary after:absolute'}`}>
                  <Link to='/em-cartaz'>
                    Em cartaz
                  </Link>
                </Button>
              </SheetClose>
            </li>
            <li className='flex'>
              <SheetClose asChild>
                <Button asChild variant='ghost' size='tiny' className={`flex h-7 pl-5 text-base relative hover:text-secondary hover:after:absolute after:inset-y-0 after:left-0 after:w-1 after:rounded-r-lg after:bg-secondary`}>
                  <Link to='/em-cartaz'>
                    Em breve
                  </Link>
                </Button>
              </SheetClose>
            </li>
            <li className='flex'>
              <SheetClose asChild>
                <Button asChild variant='ghost' size='tiny' className={`flex h-7 pl-5 text-base relative hover:text-secondary hover:after:absolute after:inset-y-0 after:left-0 after:w-1 after:rounded-r-lg after:bg-secondary`}>
                  <Link to='/em-cartaz'>
                    Cinemas
                  </Link>
                </Button>
              </SheetClose>
            </li>
            {user?.role == 'ADMIN' && (
              <li className='flex'>
                <SheetClose asChild>
                  <Button asChild variant='ghost' size='tiny' className={`flex h-7 pl-5 text-base relative hover:text-secondary hover:after:absolute after:inset-y-0 after:left-0 after:w-1 after:rounded-r-lg after:bg-secondary`}>
                    <Link to='/admin'>
                      Admin
                    </Link>
                  </Button>
                </SheetClose>
              </li>
            )}
          </ul>
        </nav>
        
        <button className='flex items-center gap-2 mt-[2rem] pl-4'>
          <LuMapPin size={24} color='white' />
          <div className='flex flex-col items-start'>
            <span className='font-normal leading-none text-[90%]'>Programação em</span>
            <span className='leading-normal'>Niterói</span>
          </div>
        </button>



        <SheetClose ref={buttonRef}></SheetClose>
      </SheetContent>
    </Sheet>
  )
}