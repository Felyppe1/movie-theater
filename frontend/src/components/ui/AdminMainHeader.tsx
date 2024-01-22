import { AdminHamburger } from "@/layouts/AdminLayout/AdminHamburger"
import { FaArrowLeft } from "react-icons/fa6"
import { Link } from "react-router-dom"

type AdminHeaderProps = {
  h1: string
  p: string
  backLink: string
}

export function AdminMainHeader({ h1, p, backLink }: AdminHeaderProps) {
  return (
    <header>
      <div className='flex justify-between items-center mb-[1rem]'>
        <Link to={backLink}>
          <FaArrowLeft size={26} />
        </Link>
        <AdminHamburger />
      </div>
      <div>
        <h1 className={'text-3xl font-semibold'}>{h1}</h1>
        <p className={'text-lg text-muted-foreground pb-[1.5rem] border-b-2'}>{p}</p>
      </div>
    </header>
  )
}