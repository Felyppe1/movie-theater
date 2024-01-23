import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Movie } from "@/@types/Movie"
import { Genre } from "@/@types/Genre"
import { Link } from "react-router-dom"
import { removeMovieFromTheater } from "@/api/movieTheaters"
import { AdminMovieDetails } from "@/components/AdminMovieDetails"
import { AdminMovieCard } from "@/components/ui/AdminMovieCard"

type SelectedMovieProps = {
  movie: Movie & {
    genres: Genre[]
  },
  movieTheaterId: string
}

export function SelectedMovie({ movie, movieTheaterId }: SelectedMovieProps) {
  const queryClient = useQueryClient()

  const movieMutation = useMutation({
    mutationFn: removeMovieFromTheater,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['moviesUnrelatedToTheater', movieTheaterId] })
      queryClient.invalidateQueries({ queryKey: ['movieTheater', movieTheaterId] })
    }
  })

  const handleRemoveMovie = () => {
    movieMutation.mutate({
      movieTheaterId,
      movieId: movie.id
    })
  }

  return (
    <li className='snap-center'>
      <AdminMovieDetails
        Trigger={
          <AdminMovieCard poster_path={movie.poster_path} />
        }
        description="Crie sessões ou remova o filme do seu cinema."
        movie={movie}
        BodyBottom={
          <>
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
          </>
        }
        Footer={[
          <Button onClick={handleRemoveMovie} variant='destructive'>Remover</Button>,
          <Button asChild>
            <Link to={`/admin/movie-theater/${movieTheaterId}`}>Criar sessão</Link>
          </Button>
        ]}
      />
    </li>
  )
}