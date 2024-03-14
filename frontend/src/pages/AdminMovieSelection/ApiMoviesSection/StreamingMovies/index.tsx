import { fetchTmdbStreamingMovies } from "@/api/movies"
import { useInfiniteQuery } from "@tanstack/react-query"
import { UIEventHandler } from "react"
import { ApiMovieItem } from "../ApiMovieItem"

export function StreamingMovies() {
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
    const distanceToEnd = element.scrollWidth - (element.scrollLeft + element.clientWidth)

    if (distanceToEnd < 400) {
      if (apiMovies.hasNextPage && !apiMovies.isFetchingNextPage) {
        apiMovies.fetchNextPage()
      }
    }
  }

  return (
    <ul onScroll={onMoviesListScroll} className='flex overflow-x-auto gap-[.5rem] mt-4 p-1'>
      {apiMovies.status === 'pending'
        ? <p>Carregando...</p>
        : apiMovies.data?.map((movie) => {
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