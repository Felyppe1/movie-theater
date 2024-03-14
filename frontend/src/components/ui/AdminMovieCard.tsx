import clsx from "clsx"
import { HTMLAttributes, forwardRef } from "react"

type AdminMovieCardProps = HTMLAttributes<HTMLButtonElement> & {
  poster_path: string
  selected: boolean
}

export const AdminMovieCard = forwardRef<HTMLButtonElement, AdminMovieCardProps>((props, ref) => {
  const { poster_path, selected, ...rest } = props
  
  return (
    <button ref={ref} {...rest} disabled={selected} className={clsx('rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-[6rem] sm:w-[8rem] overflow-hidden relative',
    selected && 'before:content-["Selecionado"] before:absolute before:z-10 before:top-1/2 before:right-1/2 before:translate-x-1/2 before:-translate-y-1/2 before:-rotate-[55deg] before:text-xl sm:before:text-[1.75rem] before:font-semibold before:text-background')}>
      <img src={`https://image.tmdb.org/t/p/w185/${poster_path}`} alt="" className={clsx(selected && 'brightness-[.3]')} />
    </button>
  )
})