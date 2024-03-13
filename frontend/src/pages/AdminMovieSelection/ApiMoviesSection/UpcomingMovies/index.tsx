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
    const distanceToBottom = element.scrollHeight - (element.scrollTop + element.clientHeight)

    if (distanceToBottom < 300) {
      if (apiUpcomingMovies.hasNextPage && !apiUpcomingMovies.isFetchingNextPage) {
        apiUpcomingMovies.fetchNextPage()
      }
    }
  }
  
  return (
    <ul onScroll={onMoviesListScroll} className='max-w-[35rem] h-[72vh] mt-2 mr-[15vw] overflow-y-auto'>
      {apiUpcomingMovies.status === 'pending'
        ? <p>Carregando...</p>
        : apiUpcomingMovies.data?.map((movie) => {
            return (
              <ApiMovieItem
                movie={movie}
              />
            )
          })
      }
    </ul>
  )
}