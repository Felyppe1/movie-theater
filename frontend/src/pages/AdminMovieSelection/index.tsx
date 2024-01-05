import { AdminMainHeader } from "@/components/ui/AdminMainHeader"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { env } from "@/env"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MovieSelectionForm, useMovieSelectionForm } from "./useMovieSelectionForm"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { ptBR } from 'date-fns/locale'
import { useInfiniteQuery } from "@tanstack/react-query"

export function AdminMovieSelection() {
  const [errorStatus, setErrorStatus] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const { data: movies, error, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery({
    queryKey: ['movies'],
    queryFn: async ({ pageParam }) => {
      const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?language=pt-BR&page=${pageParam}`, { 
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
    initialPageParam: 1,
    getNextPageParam: (_lastPage, pages) => {
      if (pages.length < 4) {
        return pages.length + 1
      } else {
        return undefined
      }
    },
    select: (data) => {
      // const lastFetchedPage = data.pages.length - 1
      // const lastPageData = data.pages[lastFetchedPage].results
      // const currentMovies = movies ? [...movies] : []
      // const updatedData = [...currentMovies, ...lastPageData]
      // console.log(updatedData)
      // console.log(...data.pages[lastFetchedPage].results)
      return data.pages.flatMap((page) => page.results)
    }
  })

  const handleMoviesListScroll = (e) => {
    const element = e.target
    const distanceToBottom = element.scrollHeight - (element.scrollTop + element.clientHeight)

    console.log(distanceToBottom)
    if (distanceToBottom < 300) {
      if (hasNextPage && !isFetchingNextPage)
      fetchNextPage()
    }
  }

  const handleSelectMovie = async (id: string) => {
    setIsLoading(true)
    
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=pt-BR`, { 
        method: 'GET',
        headers: {'Authorization': `Bearer ${env.VITE_TMDB_READ_ACCESS_TOKEN}`}
      })

      if (!response.ok) {
        throw (response)
      }
  
      const responseData = await response.json()

      form.setValue('tmdb_id', responseData.id)
      form.setValue('name', responseData.title)
      form.setValue('original_name', responseData.original_title)
      form.setValue('sinopse', responseData.overview)
      form.setValue('duration', responseData.runtime)
      form.setValue('release_date', new Date(responseData.release_date))
      form.setValue('poster_path', responseData.poster_path)
    } catch(error) {
      if (error instanceof Response) {
        setErrorStatus(error.status)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const { form } = useMovieSelectionForm()

  const handleSubmitMovieSelectionForm = (data: MovieSelectionForm) => {
    console.log(data)
  }
  
  return status === 'pending' ? (
    <p>Carregando...</p>
  ) : status === 'error' ? (
    <p>{error.message}</p>
  ) : (
    <>
      <AdminMainHeader h1='Seleção de Filmes' p='Selecionar filmes para o banco de dados dos cinemas' />
      <section>
        <ul onScroll={handleMoviesListScroll} className='max-w-[35rem] h-[80vh] overflow-y-scroll'>
          {movies?.map(movie => {
            return (
              // <SelectMovieSection id={movie.id} form={form} handleSubmitForm={handleSubmitMovieSelectionForm} />
              <li className='flex gap-2 max-w-[25rem] mt-[1rem] mr-[2rem]'>
                <img src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`} className='w-[8rem]' alt="" />
                <div className='flex flex-col justify-between'>
                  <div>
                    <p className='text-sm'>
                      <strong>Título:</strong> {movie.title}
                    </p>
                    <p className='text-sm'>
                      <strong>Título original:</strong> {movie.original_title}
                    </p>
                    <p className='text-sm mt-[.25rem] h-[6rem] overflow-hidden'>
                      <strong>Sinopse:</strong> {movie.overview}
                    </p>
                  </div>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button onClick={() => {handleSelectMovie(movie.id)}} size='tiny' className='w-fit py-[.25rem] px-[1rem] mt-[.25rem]'>Selecionar</Button>
                    </SheetTrigger>
                    <SheetContent onCloseAutoFocus={() => {
                      form.setValue('max_date', undefined)
                    }} className={cn('overflow-scroll')}>
                      <SheetHeader>
                        <SheetTitle>Informações do filme</SheetTitle>
                        <SheetDescription>
                          Preencha os campos do formulário para salvar o filme.
                        </SheetDescription>
                      </SheetHeader>

                      {isLoading ? (
                        <p>Carregando...</p>
                      ) : (
                        <div className='grid gap-[.5rem] py-4'>
                          <img src={`https://image.tmdb.org/t/p/w92/${movie.poster_path}`} alt="" />
                          <p className='text-sm'>
                            <strong>Título:</strong> {form.getValues().name}
                          </p>
                          <p className='text-sm'>
                            <strong>Título original:</strong> {form.getValues().original_name}
                          </p>
                          <p className='text-sm'>
                            <strong>Sinopse:</strong> {form.getValues().sinopse}
                          </p>
                          <p className='text-sm'>
                            <strong>Duração:</strong> {form.getValues().duration} min
                          </p>
                          <p className='text-sm'>
                            <strong>Data de lançamento:</strong> {format(form.getValues().release_date, 'PPP', { locale: ptBR })}
                          </p>
                          <form onSubmit={form.handleSubmit(handleSubmitMovieSelectionForm)} className='flex flex-col gap-2'>
                            <Label>
                              <strong>
                                Data de exibição limite:
                              </strong>
                            </Label>
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
                                  onSelect={(date) => form.setValue('max_date', date)}
                                  disabled={(date) =>
                                    date < new Date()
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </form>
                        </div>
                      )}

                      <SheetFooter>
                        <Button type='submit' onClick={form.handleSubmit(handleSubmitMovieSelectionForm)} disabled={isLoading}>
                          Salvar
                        </Button>
                        <SheetClose asChild>
                        </SheetClose>
                      </SheetFooter>
                    </SheetContent>
                  </Sheet>
                </div>
              </li>
            )
          })}
        </ul>
      </section>
    </>
  )
}