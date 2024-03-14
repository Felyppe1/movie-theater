import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ptBR } from 'date-fns/locale'
import { AddMovieForm, useAddMovieForm } from "./useAddMovieForm"
import { useQuery } from "@tanstack/react-query"
import { TmdbMovie } from "@/@types/TmdbMovie"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { getTmdbMovie } from "@/api/movies"
import { useAdminTmdbMovieIdsStore } from "@/store/adminSelectedMovies"
import { AdminMovieCard } from "@/components/ui/AdminMovieCard"

type ApiMovieItemProps = {
  movie: TmdbMovie
}


export function ApiMovieItem({ movie }: ApiMovieItemProps) {
  const { status: movieDetailStatus, refetch } = useQuery({
    queryKey: ['apiMovie', movie.id],
    queryFn: getTmdbMovie,
    select: (data) => {
      form.setValue('tmdb_id', data.id)
      form.setValue('name', data.title)
      form.setValue('original_name', data.original_title)
      form.setValue('synopsis', data.overview)
      form.setValue('genres', data.genres)
      form.setValue('duration', data.runtime)
      form.setValue('release_date', new Date(data.release_date))
      form.setValue('poster_path', data.poster_path)

      return { tmdb_id: data.id }
    },
    enabled: false,
  })

  const handleSelectMovie = () => {
    refetch() // TODO: only refetch once
  }

  const { form, mutation } = useAddMovieForm()

  const handleSubmitAddMovieForm = (data: AddMovieForm) => {
    const cleanedData = {
      ...data,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      genres: data.genres.map(({ id }) => ({ id: id })),
      max_date: data.max_date!
    }

    mutation.mutate(cleanedData) // FIX
  }

  const onCloseMovieDetail = () => {
    // form.resetField('max_date') // TODO: make it work
    form.setValue('max_date', null)
    form.setValue('quantity_avaiable', 0)
    form.clearErrors(['max_date', 'quantity_avaiable'])
  }

  return (
    <li>
      {useAdminTmdbMovieIdsStore().tmdbMovieIds.has(movie.id)
        ? (
          <AdminMovieCard poster_path={movie.poster_path} selected={true} />
        ) : (
          <Sheet>
            <SheetTrigger asChild>
              <AdminMovieCard poster_path={movie.poster_path} onClick={handleSelectMovie} selected={false} />
            </SheetTrigger>
            <SheetContent 
              onCloseAutoFocus={onCloseMovieDetail} 
              className='overflow-y-auto w-full sm:max-w-[30rem]'
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
                  <div className='flex gap-x-[.5rem]'>
                    {form.getValues().genres?.map(genre => {
                      return (
                        <Badge key={genre.id}>{genre.name}</Badge>
                      )
                    })}
                  </div>
                  <div className='text-sm'>
                    <strong className='font-medium'>Título: </strong>
                    <span>
                      {form.getValues().name}
                    </span>
                  </div>
                  <div className='text-sm'>
                    <strong className='font-medium'>Título original: </strong>
                    <span>
                      {form.getValues().original_name}
                    </span>
                  </div>
                  <div className='text-sm'>
                    <strong className='font-medium'>Sinopse: </strong>
                    <span>
                      {form.getValues().synopsis}
                    </span>
                  </div>
                  <div className='text-sm'>
                    <strong className='font-medium'>Duração: </strong> 
                    <span>
                      {form.getValues().duration} min
                    </span>
                  </div>
                  <div className='text-sm'>
                    <strong className='font-medium'>Data de lançamento: </strong>
                    <span>
                      {format(form.getValues().release_date, 'PPP', { locale: ptBR })}
                    </span>
                  </div>
                  <div className='flex flex-col gap-1'>
                    <strong className={`font-medium text-sm ${form.formState.errors?.max_date && "text-destructive"}`}>
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
                      {/* {form.formState.errors?.max_date && (
                        <p className='text-sm font-medium text-destructive'>{form.formState.errors.max_date.message}</p>
                      )} */}
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={form.getValues().max_date!}
                          onSelect={(date) => {
                            form.setValue('max_date', date!)
                            form.trigger('max_date')
                          }}
                          disabled={(date) => {
                            if (form.getValues().release_date > new Date()) {
                              return date < form.getValues().release_date
                            }

                            return date < new Date()
                          }}
                          initialFocus
                          defaultMonth={form.getValues().release_date > new Date() ? form.getValues().release_date : new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <form onSubmit={form.handleSubmit(handleSubmitAddMovieForm)} className='flex flex-col gap-2'>
                    <Label 
                      htmlFor="quantity_avaiable" 
                      className={cn(form.formState.errors?.quantity_avaiable && 'text-destructive')}
                    >
                      Quantidade:
                    </Label>
                    <Input 
                      {...form.register('quantity_avaiable', { valueAsNumber: true })}
                      type='number' 
                      id='quantity_avaiable' 
                      className={cn('max-w-[5rem]')} 
                      min={0} 
                    />
                  </form>
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
    </li>
  )
}