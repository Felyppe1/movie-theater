import { fetchTmdbDiscoverMovies, fetchTmdbSearchMovies } from "@/api/movies";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useInfiniteQuery } from "@tanstack/react-query";
import { UIEventHandler, useEffect, useState } from "react";
import { SearchMovieItem } from "./SearchMovieItem";

export function SearchMovies() {
  const [movieName, setMovieName] = useState('')

  const tmdbDiscoverMovies = useInfiniteQuery({
    queryKey: ['tmdbDiscoverMovies'],
    queryFn: fetchTmdbDiscoverMovies,
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
  
  const tmdbSearchMovies = useInfiniteQuery({
    queryKey: ['tmdbSearchMovies'],
    queryFn: (args) => fetchTmdbSearchMovies({ ...args, query: movieName }),
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

    if (distanceToBottom < 400) {
      if (movieName !== '') {
        if (tmdbSearchMovies.hasNextPage && !tmdbSearchMovies.isFetchingNextPage) {
          tmdbSearchMovies.fetchNextPage()
        }
      } else {
        if (tmdbDiscoverMovies.hasNextPage && !tmdbDiscoverMovies.isFetchingNextPage) {
          tmdbDiscoverMovies.fetchNextPage()
        }
      }
    }
  }

  useEffect(() => {
    tmdbSearchMovies.refetch()
  }, [movieName, tmdbSearchMovies])
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size='sm'>Pesquisar</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Procurar filme</DialogTitle>
        </DialogHeader>
        <div>
          <Input type='text' value={movieName} onChange={e => setMovieName(e.target.value)} placeholder='Digite o nome do filme' />
          <ul onScroll={onMoviesListScroll} className='flex flex-col gap-4 h-[60vh] mt-8 overflow-y-auto'>
            {movieName !== '' 
              ? tmdbSearchMovies.status === 'pending'
                ? <p>Carregando...</p>
                : tmdbSearchMovies.data?.map((movie) => {
                    return (
                      <SearchMovieItem
                        key={movie.id}
                        movie={movie}
                      />
                    )
                  })
              : tmdbDiscoverMovies.status === 'pending'
                ? <p>Carregando...</p>
                : tmdbDiscoverMovies.data?.map((movie) => {
                    return (
                      <SearchMovieItem
                        key={movie.id}
                        movie={movie}
                      />
                    )
                  })
            }
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  )
}