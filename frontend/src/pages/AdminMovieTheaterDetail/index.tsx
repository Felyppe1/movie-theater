import { AdminMainHeader } from "@/components/ui/AdminMainHeader"
import { useParams } from "react-router-dom"
import { Toaster } from "@/components/ui/toaster"
import { useQuery } from "@tanstack/react-query"
import { env } from "@/env"
import { RoomsList } from "./RoomsList"
import { DatabaseMovie } from "./DatabaseMovie"
import { Movie } from "@/@types/Movie"
import { Genre } from "@/@types/Genre"
import { SelectedMovie } from "./SelectedMovie"

export type RoomProps = {
  id: string
  number: string
  _count: { seats: number }
}

type MovieProps = Movie & {
  genres: Genre[]
}

type MovieTheaterProps = {
  id: string
  name: string
  street: string
  number: string
  created_at: Date
  updated_at: Date
  state_id: string
  city_id: string
  Room: RoomProps[]
  movies: MovieProps[]
}

export function AdminMovieTheaterDetail() {
  const { id } = useParams()

  const { data: movieTheater, status, error } = useQuery<MovieTheaterProps>({
    queryKey: ['movieTheater', id],
    queryFn: async ({ queryKey }) => {
      const response = await fetch(`${env.VITE_BACKEND_URL}/movie-theaters/${queryKey[1]}`, { method: 'GET' })
      
      if (!response.ok) {
        if (response.status === 409) {
          const error = await response.json()
          throw new Error(error.message)
        }

        throw new Error('Algo deu errado')
      }
  
      return response.json()
    },
    retry: false
  })

  const { data: movies, status: movieStatus } = useQuery<MovieProps[]>({
    queryKey: ['movies'],
    queryFn: async () => {
      const response = await fetch(`${env.VITE_BACKEND_URL}/movies/movie-theater/${id}/unrelated`, { method: 'GET' })
      
      if (!response.ok) {
        throw new Error('Ocorreu um erro')
      }

      return response.json()
    }
  })


  return status === 'pending' ? (
    <p>Carregando...</p>
  ) : status === 'error' ? (
    <p>{error.message}</p>
  ) : (
    <>
      <Toaster />
      <AdminMainHeader h1='Cinemas' p={`Informações do cinema ${movieTheater?.name}`} />

      <RoomsList rooms={movieTheater?.Room} id={id} />

      <section className='mt-[2rem]'>
        <h2 className='text-2xl font-semibold text-secondary-foreground pb-[1rem]'>
          Selecionados
        </h2>

        {movieTheater.movies?.length == 0 ? (
            <p>Nenhum filme selecionado</p>
          ) : (
            <ul className='grid grid-flow-col auto-cols-[17%] gap-[.5rem] p-[.5rem] overflow-x-auto overscroll-contain snap-x'>
              {movieTheater.movies?.map(movie => {
                return (
                  <SelectedMovie movie={movie} movieTheaterId={id!} key={movie.id} />
                )
              })}
            </ul>
          )
        }
      </section>

      <section className='mt-[2rem]'>
        <h2 className='text-2xl font-semibold text-secondary-foreground pb-[1rem]'>
          Disponíveis
        </h2>
        {movieStatus === 'pending' ? (
          <p>Carregando...</p>
        ) : (
          movies?.length == 0 ? (
            <p>Não há filmes</p>
          ) : (
            <ul className='grid grid-flow-col auto-cols-[17%] gap-[.5rem] p-[.5rem] overflow-x-auto overscroll-contain snap-x'>
              {movies?.map(movie => {
                if (movie.quantity_avaiable > 0) {
                  return (
                    <DatabaseMovie movie={movie} movieTheaterId={id!} key={movie.id} />
                  )
                }
              })}
            </ul>
          )
        )}
      </section>
    </>
  )
}