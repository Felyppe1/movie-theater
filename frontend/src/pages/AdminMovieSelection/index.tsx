import { AdminMainHeader } from "@/components/ui/AdminMainHeader"
import { env } from "@/env"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { ApiMoviesSection } from "./ApiMoviesSection"
import { MoviesSection } from "./MoviesSection"
import { TmdbMovie } from "@/@types/TmdbMovie"
import { Movie } from "@/@types/Movie"

export function AdminMovieSelection() {
  const movieTmdbIds = new Set<number>()

  const { data: apiMovies, error, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery({
    queryKey: ['apiMovies'],
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
    },
  })

  const { data: movies } = useQuery({
    queryKey: ['movies'],
    queryFn: async () => {
      const response = await fetch(`${env.VITE_BACKEND_URL}/movies`, { 
        method: 'GET',
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
    select: (data) => {
      data.forEach(movie => movieTmdbIds.add(movie.tmdb_id))
      return data
    }
  })

  const onMoviesListScroll = (e) => {
    const element = e.target
    const distanceToBottom = element.scrollHeight - (element.scrollTop + element.clientHeight)

    if (distanceToBottom < 300) {
      if (hasNextPage && !isFetchingNextPage)
      fetchNextPage()
    }
  }
  
  return status === 'pending' ? (
    <p>Carregando...</p>
  ) : status === 'error' ? (
    <p>{error.message}</p>
  ) : (
    <>
      <AdminMainHeader h1='Seleção de Filmes' p='Selecionar filmes para o banco de dados dos cinemas' />
      <section className='pb-[3rem] border-b'>
        <h2 className='text-2xl font-semibold text-secondary-foreground py-[1rem]'>Filmes disponíveis</h2>
        <ul onScroll={onMoviesListScroll} className='max-w-[35rem] h-[72vh] overflow-y-scroll'>
          {apiMovies?.map((movie: TmdbMovie) => {
            return (
              <ApiMoviesSection 
                movie={movie}
                movieTmdbIds={movieTmdbIds}
              />
            )
          })}
        </ul>
      </section>
      <section className='mt-[2rem]'>
        <h2 className='text-2xl font-semibold text-secondary-foreground pb-[1rem]'>Filmes no banco de dados</h2>
        {movies?.length == 0 && (
          <p>Não há filmes</p>
        )}
        <ul className='grid grid-flow-col auto-cols-[17%] gap-[.5rem] overflow-x-auto overscroll-contain snap-x'>
          {movies?.map((movie: Movie) => {
            return (
              <MoviesSection movie={movie} />
            )
          })}
        </ul>
      </section>
    </>
  )
}