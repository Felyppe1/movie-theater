import { UIEventHandler, useState } from "react"
import { Switch } from "@/components/ui/switch"
import { SearchMovies } from "./SearchMovies"
import { useInfiniteQuery } from "@tanstack/react-query"
import { fetchTmdbStreamingMovies, fetchTmdbUpcomingMovies } from "@/api/movies"
import { ApiMovieItem } from "./ApiMovieItem"


export function ApiMoviesSection() {
  const [upcomingMovies, setUpcomingMovies] = useState(false)

  const tmdbStreamingMovies = useInfiniteQuery({
    queryKey: ['tmdbStreamingMovies'],
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
      return data.pages.flatMap((page) => page.results)
    }
  })

  const tmdbUpcomingMovies = useInfiniteQuery({
    queryKey: ['tmdbUpcomingMovies'],
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
      if (upcomingMovies) {
        if (tmdbUpcomingMovies.hasNextPage && !tmdbUpcomingMovies.isFetchingNextPage) {
          tmdbUpcomingMovies.fetchNextPage()
        }
      } else {
        if (tmdbStreamingMovies.hasNextPage && !tmdbStreamingMovies.isFetchingNextPage) {
          tmdbStreamingMovies.fetchNextPage()
        }
      }
    }
  }
  
  return (
    <section className='pb-[3rem] border-b'>
      <h2 className='text-2xl font-semibold text-secondary-foreground py-[1rem]'>Filmes disponíveis</h2>
      <div className='flex gap-4'>
        <SearchMovies />
        <button onClick={() => setUpcomingMovies(state => !state)} className='flex items-center gap-1 p-1'>
          <Switch
            checked={upcomingMovies}
            tabIndex={-1}
          />
          <span>
            Em breve
          </span>
        </button>
      </div>
      {upcomingMovies 
        ? <ul onScroll={onMoviesListScroll} className='flex overflow-x-auto gap-[.5rem] mt-4 p-1'>
            {tmdbUpcomingMovies.status === 'pending'
              ? <p>Carregando...</p>
              : tmdbUpcomingMovies.data?.map((movie) => {
                  return (
                    <ApiMovieItem
                      key={movie.id}
                      movie={movie}
                    />
                  )
                })
            }
          </ul>
        : <ul onScroll={onMoviesListScroll} className='flex overflow-x-auto gap-[.5rem] mt-4 p-1'>
            {tmdbStreamingMovies.status === 'pending'
              ? <p>Carregando...</p>
              : tmdbStreamingMovies.data?.map((movie) => {
                  return (
                    <ApiMovieItem
                      key={movie.id}
                      movie={movie}
                    />
                  )
                })
            }
          </ul>
      }
    </section>
  )
}