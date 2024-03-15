import { Link } from "react-router-dom";

type MovieTheaterCardProps = {
  name: string
  street: string
  number: string
}

export function MovieTheaterCard({ name, street, number }: MovieTheaterCardProps) {
  return (
    <Link to='/' className='flex flex-col gap-1 bg-zinc-800 px-4 py-3 lg:p-5 rounded-md hover:bg-accent hover:text-accent-foreground ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'>
      <p className='text-lg font-semibold line-clamp-2'>{name}</p>
      <p className='text-sm text-primary/50 line-clamp-1'>{street}, Nº {number}</p>
    </Link>
  )
}