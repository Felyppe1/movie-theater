import { Genre } from "@/@types/Genre"
import { Movie } from "@/@types/Movie"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { ReactNode } from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

type AdminMovieDetailsProps = {
  Trigger: ReactNode
  description: string
  movie: Movie & {
    genres: Genre[]
  },
  BodyBottom: ReactNode
  Footer: ReactNode[]
}

export function AdminMovieDetails({ Trigger, description, movie, BodyBottom, Footer }: AdminMovieDetailsProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        {Trigger}
      </SheetTrigger>
      <SheetContent
        className='overflow-y-auto w-full sm:max-w-[30rem]'
      >
        <SheetHeader>
          <SheetTitle>Informações do filme</SheetTitle>
          <SheetDescription>
            {description}
          </SheetDescription>
        </SheetHeader>

        <div className='grid gap-[.5rem] py-6'>
          <img src={`https://image.tmdb.org/t/p/w92/${movie.poster_path}`} alt="" />
          <div className='flex gap-x-[.5rem]'>
            {movie.genres?.map(genre => {
              return (
                <Badge key={genre.id}>{genre.name}</Badge>
              )
            })}
          </div>
          <div className='text-sm'>
            <strong className='font-medium'>Título: </strong> 
            {movie.name}
          </div>
          <div className='text-sm'>
            <strong className='font-medium'>Título original: </strong> 
            {movie.original_name}
          </div>
          <div className='text-sm'>
            <strong className='font-medium'>Sinopse: </strong> 
            {movie.synopsis}
          </div>
          <div className='text-sm'>
            <strong className='font-medium'>Duração: </strong> 
            {movie.duration} min
          </div>
          <div className='text-sm'>
            <strong className='font-medium'>Data de lançamento: </strong> 
            {format(movie.release_date, 'PPP', { locale: ptBR })}
          </div>
          {BodyBottom}
        </div>

        <SheetFooter>
          {Footer.map((element, index) => {
            return (
              <SheetClose key={index} asChild>
                {element}
              </SheetClose>
            )
          })}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}