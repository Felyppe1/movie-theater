import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { env } from "@/env"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ptBR } from 'date-fns/locale'
import { AddMovieForm, useAddMovieForm } from "./useMovieSelectionForm"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { TmdbMovie, TmdbMovieDetails } from "@/@types/TmdbMovie"


type ApiMoviesSectionProps = {
  movie: TmdbMovie
  movieTmdbIds: Set<number>
}

export function ApiMoviesSection({ movie, movieTmdbIds }: ApiMoviesSectionProps) {
  const queryClient = useQueryClient()

  const { status: movieDetailStatus, refetch } = useQuery({
    queryKey: ['movie', movie.id],
    queryFn: async () => {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?language=pt-BR`, { 
        method: 'GET',
        headers: {'Authorization': `Bearer ${env.VITE_TMDB_READ_ACCESS_TOKEN}`}
      })

      if (!response.ok) {
        if (response.status === 409) {
          const error = await response.json()
          throw new Error(error.message)
        }
  
        throw new Error('Algo deu errado')
      }

      return response.json()
    },
    select: (data: TmdbMovieDetails) => {
      form.setValue('tmdb_id', data.id)
      form.setValue('name', data.title)
      form.setValue('original_name', data.original_title)
      form.setValue('synopsis', data.overview)
      form.setValue('duration', data.runtime)
      form.setValue('release_date', new Date(data.release_date))
      form.setValue('poster_path', data.poster_path)

      return {
        tmdb_id: data.id,
        name: data.title,
        original_name: data.original_title,
        synopsis: data.overview,
        duration: data.runtime,
        release_date: data.release_date,
        poster_path: data.poster_path
      }
    },
    enabled: false
  })

  const handleSelectMovie = () => {
    refetch()
  }

  const { form } = useAddMovieForm()

  const addMovieMutation = useMutation({
    mutationFn: async (data: AddMovieForm) => {
      const response = await fetch(`${env.VITE_BACKEND_URL}/movies`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        if (response.status == 409) {
          const error = await response.json()
          throw new Error(error.message)
        }

        throw new Error(response.message)
      }

      return response.json()
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['movies'] })
    }
  })

  const handleSubmitAddMovieForm = (data: AddMovieForm) => {
    addMovieMutation.mutate(data)
  }

  return (
    <li key={movie.id} className='flex gap-2 max-w-[25rem] mt-[1rem] mr-[2rem]'>
      <img src={`https://image.tmdb.org/t/p/w185/${movie?.poster_path}`} className='w-[8.5rem]' alt="" />
      <div className='flex flex-col justify-between'>
        <div>
          <p className='text-sm'>
            <strong>Título:</strong> {movie?.title}
          </p>
          <p className='text-sm'>
            <strong>Título original:</strong> {movie?.original_title}
          </p>
          <p className='text-sm mt-[.25rem] line-clamp-4'>
            <strong>Sinopse:</strong> {movie?.overview}
          </p>
        </div>
        {movieTmdbIds.has(movie.id) 
          ? (
            <span className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background pointer-events-none bg-success text-success-foreground hover:bg-success/90 w-fit py-[.25rem] px-[1rem] mt-[.25rem]'>
              Selecionado
            </span>
          ) : (
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  onClick={handleSelectMovie}
                  size='tiny'
                  className={cn('w-fit py-[.25rem] px-[1rem] mt-[.25rem]')}
                >
                  Selecionar
                </Button>
              </SheetTrigger>
              <SheetContent 
                onCloseAutoFocus={() => form.setValue('max_date', undefined)} 
                className={cn('overflow-y-auto')}
              >
                <SheetHeader>
                  <SheetTitle>Informações do filme</SheetTitle>
                  <SheetDescription>
                    Preencha os campos do formulário para salvar o filme.
                  </SheetDescription>
                </SheetHeader>

                {movieDetailStatus === 'pending' ? (
                  <p>Carregando...</p>
                ) : (
                  <div className='grid gap-[.5rem] py-6'>
                    <img src={`https://image.tmdb.org/t/p/w92/${form.getValues().poster_path}`} alt="" />
                    <p className='text-sm'>
                      <strong>Título:</strong> {form.getValues().name}
                    </p>
                    <p className='text-sm'>
                      <strong>Título original:</strong> {form.getValues().original_name}
                    </p>
                    <p className='text-sm'>
                      <strong>Sinopse:</strong> {form.getValues().synopsis}
                    </p>
                    <p className='text-sm'>
                      <strong>Duração:</strong> {form.getValues().duration} min
                    </p>
                    <p className='text-sm'>
                      <strong>Data de lançamento:</strong> {format(form.getValues().release_date, 'PPP', { locale: ptBR })}
                    </p>
                    <div className='flex flex-col gap-2'>
                      <strong className='text-sm'>
                        Data de exibição limite:
                      </strong>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !form.getValues().max_date && "text-muted-foreground"
                            )}
                          >
                            {form.getValues().max_date ? (
                              format(form.getValues().max_date!, 'PPP', { locale: ptBR })
                            ) : (
                              <span>Escolha uma data</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={form.getValues().max_date!}
                            onSelect={(date) => {
                              form.setValue('max_date', date)
                              form.trigger('max_date')
                            }}
                            disabled={(date) =>
                              date < new Date()
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                )}

                <SheetFooter>
                  <Button 
                    type='submit' 
                    onClick={form.handleSubmit(handleSubmitAddMovieForm)} 
                    disabled={movieDetailStatus === 'pending'}
                  >
                    Salvar
                  </Button>
                  <SheetClose asChild>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          )}
      </div>
    </li>
  )
}