import { AdminMainHeader } from "@/components/ui/AdminMainHeader"
import { env } from "@/env"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { ApiMoviesSection } from "./ApiMoviesSection"
import { MoviesSection } from "./MoviesSection"
import { TmdbMovie } from "@/@types/TmdbMovie"
import { Movie } from "@/@types/Movie"
import { Genre } from "@/@types/Genre"
import { fetchMovies } from "@/api/movies"
import { Toaster } from "@/components/ui/toaster"
import { UIEventHandler } from "react"

type ApiMoviesProps = {
  results: TmdbMovie[]
}

type MovieProps = Movie & {
    genres: Genre[]
}

export function AdminMovieSelection() {
  const movieTmdbIds = new Set<number>()

  const apiMovies = useInfiniteQuery({
    queryKey: ['apiMovies'],
    queryFn: async ({ pageParam }): Promise<ApiMoviesProps> => {
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
      return data.pages.flatMap((page) => page.results)
    }
  })

  const movies = useQuery<MovieProps[]>({
    queryKey: ['movies'],
    queryFn: fetchMovies,
    select: (data) => {
      data.forEach(movie => movieTmdbIds.add(movie.tmdb_id))
      return data
    }
  })

  const onMoviesListScroll: UIEventHandler<HTMLUListElement> = (e) => {
    const element = e.currentTarget
    const distanceToBottom = element.scrollHeight - (element.scrollTop + element.clientHeight)

    if (distanceToBottom < 300) {
      if (apiMovies.hasNextPage && !apiMovies.isFetchingNextPage) {
        apiMovies.fetchNextPage()
      }
    }
  }
  
  return (
    <>
      <Toaster />
      <AdminMainHeader h1='Seleção de Filmes' p='Selecionar filmes para o banco de dados dos cinemas' backLink='/admin' />

      <section className='pb-[3rem] border-b'>
        <h2 className='text-2xl font-semibold text-secondary-foreground py-[1rem]'>Filmes disponíveis</h2>
        <ul onScroll={onMoviesListScroll} className='max-w-[35rem] h-[72vh] mr-[15vw] overflow-y-auto'>
          {apiMovies.status === 'pending' 
            ? <p>Carregando...</p>
            : apiMovies.data?.map((movie) => {
                return (
                  <ApiMoviesSection
                    movie={movie}
                    movieTmdbIds={movieTmdbIds}
                  />
                )
              })
          }
        </ul>
      </section>
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
                  <MoviesSection movie={movie} />
                )
              })
          }
        </ul>
      </section>
    </>
  )
}