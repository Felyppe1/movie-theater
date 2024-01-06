import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Movie } from "@/@types/Movie"

type MoviesSectionProps = {
  movie: Movie
}

export function MoviesSection({ movie }: MoviesSectionProps) {
  return (
    <li className='snap-center'>
      <Sheet>
        <SheetTrigger asChild>
          <button>
            <img src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`} alt="" className='rounded-md w-full' />
          </button>
        </SheetTrigger>
        <SheetContent
          className={cn('overflow-y-auto')}
        >
          <SheetHeader>
            <SheetTitle>Informações do filme</SheetTitle>
            <SheetDescription>
              Preencha os campos do formulário para salvar o filme.
            </SheetDescription>
          </SheetHeader>

          <div className='grid gap-[.5rem] py-6'>
            <img src={`https://image.tmdb.org/t/p/w92/${movie.poster_path}`} alt="" />
            <p className='text-sm'>
              <strong>Título:</strong> {movie.name}
            </p>
            <p className='text-sm'>
              <strong>Título original:</strong> {movie.original_name}
            </p>
            <p className='text-sm'>
              <strong>Sinopse:</strong> {movie.synopsis}
            </p>
            <p className='text-sm'>
              <strong>Duração:</strong> {movie.duration} min
            </p>
            <p className='text-sm'>
              <strong>Data de lançamento:</strong> {format(movie.release_date, 'PPP', { locale: ptBR })}
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
          </div>

          <SheetFooter>
            <Button 
              type='submit' 
              // onClick={form.handleSubmit(handleSubmitForm)} 
            >
              Faz nada
            </Button>
            {/* <SheetClose asChild>
            </SheetClose> */}
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </li>
  )
}