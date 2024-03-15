import { fetchMovieTheaters } from "@/api/movieTheaters";
import { LoadingDisplay } from "@/components/ui/LoadingDisplay";
import { MovieTheaterCard } from "@/components/ui/MovieTheaterCard";
import { useQuery } from "@tanstack/react-query";

export function MovieTheaters() {
  const movieTheaters = useQuery({
    queryKey: ['movieTheaters'],
    queryFn: fetchMovieTheaters
  })

  return (
    <section className='flex flex-col pb-[5rem] px-[2rem] sm:px-[5rem] xl:px-[10rem] pt-[3rem]'>
      <h1 className='text-2xl sm:text-3xl mb-[2rem] font-semibold'>Cinemas - Niterói</h1>
        {movieTheaters.status === 'pending' ? (
          <LoadingDisplay />
        ) : (
          movieTheaters.data?.length === 0 ? (
            <p>Não há cinemas disponíveis</p>
          ) : (
            <ul className='grid lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-5'>
              {movieTheaters.data?.map(movieTheater => (
                <li>
                  <MovieTheaterCard name={movieTheater.name} street={movieTheater.street} number={movieTheater.number} />
                </li>
              ))}
            </ul>
          )
        )}
    </section>
  )
}