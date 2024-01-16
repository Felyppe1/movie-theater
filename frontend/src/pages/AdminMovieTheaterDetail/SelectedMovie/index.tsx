import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Movie } from "@/@types/Movie"
import { Genre } from "@/@types/Genre"
import { env } from "@/env"
import { Link } from "react-router-dom"

type SelectedMovieProps = {
  movie: Movie & {
    genres: Genre[]
  },
  movieTheaterId: string
}

export function SelectedMovie({ movie, movieTheaterId }: SelectedMovieProps) {
  const queryClient = useQueryClient()

  const movieMutation = useMutation({
    mutationFn: async (movieId: string) => {
      const response = await fetch(`${env.VITE_BACKEND_URL}/movie-theaters/${movieTheaterId}/movie`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ movieId })
      })

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movies'] })
      queryClient.invalidateQueries({ queryKey: ['movieTheater', movieTheaterId] })
    }
  })

  const handleRemoveMovie = () => {
    movieMutation.mutate(movie.id)
  }

  return (
    <li className='snap-center'>
      <Sheet>
        <SheetTrigger asChild>
          <button className='rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 '>
            <img src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`} alt="" className='rounded-md w-full' />
          </button>
        </SheetTrigger>
        <SheetContent
          className={cn('overflow-y-auto')}
        >
          <SheetHeader>
            <SheetTitle>Informações do filme</SheetTitle>
            <SheetDescription>
              Você pode editar ou excluir o filme do banco de dados.
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
            <div className='flex flex-col gap-2'>
              <strong className='font-medium text-sm mr-[.25rem]'>
                Data de exibição limite:
              </strong>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] pl-3 text-left font-normal",
                      !movie.max_date && "text-muted-foreground"
                    )}
                  >
                    {format(movie.max_date!, 'PPP', { locale: ptBR })}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={movie.max_date!}
                    // onSelect={(date) => {
                    //   form.setValue('max_date', date)
                    //   form.trigger('max_date')
                    // }}
                    disabled={(date) =>
                      date < new Date()
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className='flex flex-col gap-2'>
              <Label 
                htmlFor="quantity_avaiable" 
                // className={cn(form.formState.errors?.quantity_avaiable && 'text-destructive')}
              >
                Quantidade:
              </Label>
              <Input 
                // {...form.register('quantity_avaiable', { valueAsNumber: true })}
                value={movie.quantity_avaiable}
                type='number'
                readOnly
                id='quantity_avaiable' 
                className={cn('max-w-[5rem]')} 
                min={0} 
              />
            </div>
          </div>

          <SheetFooter>
            <Button onClick={handleRemoveMovie} variant='destructive'>Remover</Button>
            <Button asChild>
              <Link to={`/admin/movie-theater/${movieTheaterId}`}>Criar sessão</Link>
            </Button>
            {/* <SheetClose asChild>
            </SheetClose> */}
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </li>
  )
}