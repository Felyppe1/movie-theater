import { fetchTmdbUpcomingMovies } from "@/api/movies"
import { useInfiniteQuery } from "@tanstack/react-query"
import { UIEventHandler } from "react"
import { ApiMovieItem } from "../ApiMovieItem"


export function UpcomingMovies() {
  const apiUpcomingMovies = useInfiniteQuery({
    queryKey: ['apiUpcomingMovies'],
    queryFn: fetchTmdbUpcomingMovies,
    initialPageParam: 1,
    getNextPageParam: (_lastPage, pages) => {
      if (pages.length < 4) {
        return pages.length + 1
      } else {
        return undefined
      }
    },
    select: (data) => {
      return data.pages.flatMap((page) => page.results)
    }
  })
  
  const onMoviesListScroll: UIEventHandler<HTMLUListElement> = (e) => {
    const element = e.currentTarget
    const distanceToEnd = element.scrollWidth - (element.scrollLeft + element.clientWidth)

    if (distanceToEnd < 400) {
      if (apiUpcomingMovies.hasNextPage && !apiUpcomingMovies.isFetchingNextPage) {
        apiUpcomingMovies.fetchNextPage()
      }
    }
  }
  
  return (
    <ul onScroll={onMoviesListScroll} className='flex overflow-x-auto gap-[.5rem] mt-4 p-1'>
      {apiUpcomingMovies.status === 'pending'
        ? <p>Carregando...</p>
        : apiUpcomingMovies.data?.map((movie) => {
            return (
              <ApiMovieItem
                key={movie.id}
                movie={movie}
              />
            )
          })
      }
    </ul>
  )
}