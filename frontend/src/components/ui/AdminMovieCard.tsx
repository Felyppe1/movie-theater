import { HTMLAttributes, forwardRef } from "react"

type AdminMovieCardProps = HTMLAttributes<HTMLButtonElement> & {
  poster_path: string
}

export const AdminMovieCard = forwardRef<HTMLButtonElement, AdminMovieCardProps>((props, ref) => {
  const { poster_path, ...rest } = props
  
  return (
    <button ref={ref} {...rest} className='rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-[6rem] sm:w-[8rem] overflow-hidden'>
      <img src={`https://image.tmdb.org/t/p/w185/${poster_path}`} alt="" />
    </button>
  )
})