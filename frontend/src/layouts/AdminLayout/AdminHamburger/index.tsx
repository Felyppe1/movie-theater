import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useEffect, useRef } from "react"
import { Link, useLocation } from "react-router-dom"

export function AdminHamburger() {
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
      <SheetTrigger asChild>
        <Button type='button' size='tiny' className='flex lg:hidden flex-col gap-1 w-[2.5rem] p-1.5'>
          <span className='w-full h-1 rounded-md bg-background'></span>
          <span className='w-full h-1 rounded-md bg-background'></span>
          <span className='w-full h-1 rounded-md bg-background'></span>
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='w-full max-w-[18rem] sm:max-w-[18rem] lg:max-w-[18rem] px-2 py-10 overflow-y-auto'>
        <Button asChild variant='link' size={"sm"} className='w-full'>
          <Link to='/'>Ir ao site</Link>
        </Button>

        <SheetClose asChild>
          <Button asChild variant={path.includes('/admin/movie-theater') ? 'secondary' : 'link'} size='sm' className='w-full'>
            <Link to='/admin/movie-theater'>Cinemas</Link>
          </Button>
        </SheetClose>

        <SheetClose asChild>
          <Button asChild variant={path.includes('/admin/movie-selection') ? 'secondary' : 'link'} size='sm' className='w-full'>
            <Link to='/admin/movie-selection'>Seleção de Filmes</Link>
          </Button>
        </SheetClose>

        <SheetClose ref={buttonRef}></SheetClose>
      </SheetContent>
    </Sheet>
  )
}