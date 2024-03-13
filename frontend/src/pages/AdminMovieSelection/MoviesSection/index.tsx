import { fetchMovies } from "@/api/movies"
import { useQuery } from "@tanstack/react-query"
import { MovieItem } from "./MovieItem"
import { useAdminTmdbMovieIdsStore } from "@/store/adminSelectedMovies"


export function MoviesSection() {
  const movies = useQuery({
    queryKey: ['movies'],
    queryFn: fetchMovies,
    select: (data) => {
      useAdminTmdbMovieIdsStore.getState().reset()

      data.forEach(movie => useAdminTmdbMovieIdsStore.setState((state) => ({
        tmdbMovieIds: new Set(state.tmdbMovieIds).add(movie.tmdb_id)
      })))
      
      return data
    }
  })
  
  return (
    <section className='mt-[2rem]'>
      <h2 className='text-2xl font-semibold text-secondary-foreground pb-[1rem]'>Filmes no banco de dados</h2>
      {movies.data?.length == 0 && (
        <p>Não há filmes</p>
      )}
      <ul className='flex overflow-x-auto gap-[.5rem] p-[.5rem]'>
        {movies.status === 'pending' 
          ? <p>Carregando...</p>
          : movies.data?.map((movie) => {
              return (
                <MovieItem movie={movie} />
              )
            })
        }
      </ul>
    </section>
  )
}