import { fetchMovies } from "@/api/movies"
import { ErrorDisplay } from "@/components/ui/ErrorDisplay"
import { LoadingDisplay } from "@/components/ui/LoadingDisplay"
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"

export function Home() {
  const { data: movies, status } = useQuery({
    queryKey: ['nowPlayingMovies'],
    queryFn: fetchMovies
  })

  return (
    <>
      <section className='flex flex-col px-[10rem] pt-[3rem] pb-[5rem]'>
        <h2 className='text-2xl mb-[2rem] font-bold text-secondary hover:text-secondary/90'>
          <Link to='/em-cartaz'>
            Em Cartaz {'>'}
          </Link>
        </h2>
        {status == 'pending'
        ? <LoadingDisplay />
        : status == 'error' 
          ? <ErrorDisplay /> 
          : (
            <ul className='flex gap-[1rem]'>
              {movies?.slice(0, 6).map(movie => {
                return (
                  <li 
                    key={movie.id} 
                    // className='bg-gradient-to-t from-blue-950 to-blue-900 to-20%'
                  >
                    <a href="" className='flex flex-col gap-1'>
                      <div className='overflow-hidden rounded-sm w-full'>
                        <img src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`} alt="" className='transition-transform ease-in-out duration-300 hover:scale-[1.075] w-[12rem]' />
                      </div>
                      <div className='max-w-[12rem]'>
                        <span className='text-white text-lg font-semibold'>{movie.name}</span>
                      </div>
                    </a>
                  </li>
                )
              })}
            </ul>
          )
        }
      </section>
    </>
  )
}