import { AdminMainHeader } from "@/components/ui/AdminMainHeader"
import { env } from "@/env"
import { MovieSelectionForm, useMovieSelectionForm } from "./useMovieSelectionForm"
import { useInfiniteQuery, useMutation } from "@tanstack/react-query"
import { SelectMovieSection } from "./SelectMovieSection"

export function AdminMovieSelection() {
  const { data: movies, error, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery({
    queryKey: ['movies'],
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
    }
  })

  const handleMoviesListScroll = (e) => {
    const element = e.target
    const distanceToBottom = element.scrollHeight - (element.scrollTop + element.clientHeight)

    console.log(distanceToBottom)
    if (distanceToBottom < 300) {
      if (hasNextPage && !isFetchingNextPage)
      fetchNextPage()
    }
  }

  const { form } = useMovieSelectionForm()

  const addMovieMutation = useMutation({
    mutationFn: async (data: MovieSelectionForm) => {
      const response = await fetch(`${env.VITE_BACKEND_URL}/movies`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        if (response.status == 409) {
          const error = await response.json()
          throw new Error(error.message)
        }

        throw new Error(response.message)
      }

      return response.json()
    },
    onError: (error) => {
      console.log(error)
    }
  })

  const handleSubmitMovieSelectionForm = (data: MovieSelectionForm) => {
    console.log(data)
    addMovieMutation.mutate(data)
  }
  
  return status === 'pending' ? (
    <p>Carregando...</p>
  ) : status === 'error' ? (
    <p>{error.message}</p>
  ) : (
    <>
      <AdminMainHeader h1='Seleção de Filmes' p='Selecionar filmes para o banco de dados dos cinemas' />
      <section>
        <ul onScroll={handleMoviesListScroll} className='max-w-[35rem] h-[72vh] overflow-y-scroll'>
          {movies?.map(movie => {
            return (
              <SelectMovieSection basicInfo={movie} id={movie.id} form={form} handleSubmitForm={handleSubmitMovieSelectionForm} status={addMovieMutation.status} />
            )
          })}
        </ul>
      </section>
    </>
  )
}