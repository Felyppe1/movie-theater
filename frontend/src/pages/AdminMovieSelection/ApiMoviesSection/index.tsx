import { fetchTmdbStreamingMovies } from "@/api/movies"
import { useInfiniteQuery } from "@tanstack/react-query"
import { ApiMovieItem } from "./ApiMovieItem"
import { UIEventHandler } from "react"

type ApiMoviesSectionProps = {
  movieTmdbIds: Set<number>
}

export function ApiMoviesSection({ movieTmdbIds }: ApiMoviesSectionProps) {
  const apiMovies = useInfiniteQuery({
    queryKey: ['apiMovies'],
    queryFn: fetchTmdbStreamingMovies,
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
    <section className='pb-[3rem] border-b'>
      <h2 className='text-2xl font-semibold text-secondary-foreground py-[1rem]'>Filmes disponíveis</h2>
      <ul onScroll={onMoviesListScroll} className='max-w-[35rem] h-[72vh] mr-[15vw] overflow-y-auto'>
        {apiMovies.status === 'pending' 
          ? <p>Carregando...</p>
          : apiMovies.data?.map((movie) => {
              return (
                <ApiMovieItem
                  movie={movie}
                  movieTmdbIds={movieTmdbIds}
                />
              )
            })
        }
      </ul>
    </section>
  )
}