import { AdminMainHeader } from "@/components/ui/AdminMainHeader"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../../components/ui/carousel"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useFetch } from "@/hooks/useFetch"
import { env } from "@/env"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useMovieSelectionForm } from "./useMovieSelectionForm"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { ptBR } from 'date-fns/locale'

export function AdminMovieSelection() {
  const [errorStatus, setErrorStatus] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [specificMovie, setSpecificMovie] = useState()

  const { form } = useMovieSelectionForm()

  const { data: movies } = useFetch(`https://api.themoviedb.org/3/movie/now_playing?language=pt-BR&page=1`, { 
    method: 'GET',
    headers: {'Authorization': `Bearer ${env.VITE_TMDB_READ_ACCESS_TOKEN}`}
  })

  const selectMovie = async (id: string) => {
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

      setSpecificMovie(responseData)
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

  const handleSubmitMovieSelectionForm = (data) => {
    console.log(data)
  }
  
  return (
    <>
      <AdminMainHeader h1='Seleção de Filmes' p='Selecionar filmes para o banco de dados dos cinemas' />
      <Carousel className='mx-[4rem]'>
        <CarouselContent>
          {movies?.results?.map(movie => {
            return (
              <CarouselItem key={movie.id} className='basis-1/5'>
                <img src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`} alt="" />
                <Sheet>
                  <SheetTrigger asChild>
                    <Button onClick={() => selectMovie(movie.id)} size='tiny' className='w-full p-[.25rem] mt-[.25rem]'>Selecionar</Button>
                  </SheetTrigger>
                  <SheetContent className={cn('overflow-scroll')}>
                    <SheetHeader>
                      <SheetTitle>Informações do filme</SheetTitle>
                      <SheetDescription>
                        Preencha os campos do formulário para salvar o filme.
                      </SheetDescription>
                    </SheetHeader>

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
                        <strong>Duração:</strong> {form.getValues().duration}
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
                                format(form.getValues().max_date, 'PPP', { locale: ptBR })
                              ) : (
                                <span>Escolha uma data</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={form.getValues().max_date}
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
                   
                    <SheetFooter>
                      <Button type="submit" onClick={form.handleSubmit(handleSubmitMovieSelectionForm)}>
                        Salvar
                      </Button>
                      {/* <SheetClose asChild>
                      </SheetClose> */}
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              </CarouselItem>
            )
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  )
}