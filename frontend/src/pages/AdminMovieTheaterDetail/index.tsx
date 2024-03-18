import { AdminMainHeader } from "@/components/ui/AdminMainHeader"
import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { RoomsList } from "./RoomsList"
import { DatabaseMovie } from "./DatabaseMovie"
import { SelectedMovie } from "./SelectedMovie"
import { fetchMoviesUnrelatedToTheater } from "@/api/movies"
import { getMovieTheater } from "@/api/movieTheaters"
import { AdvancedSection } from "./AdvancedSection"

export function AdminMovieTheaterDetail() {
  const { id } = useParams()

  const { data: movieTheater, status, error } = useQuery({
    queryKey: ['movieTheater', id],
    queryFn: getMovieTheater,
    retry: false
  })

  const { data: movies, status: movieStatus } = useQuery({
    queryKey: ['moviesUnrelatedToTheater', id],
    queryFn: fetchMoviesUnrelatedToTheater
  })


  return status === 'pending' ? (
    <p>Carregando...</p>
  ) : status === 'error' ? (
    <p>{error.message}</p>
  ) : (
    <>
      <AdminMainHeader h1='Cinemas' p={`Informações do cinema ${movieTheater?.name}`} backLink='/admin/movie-theater' />

      <RoomsList rooms={movieTheater?.rooms} id={id} />

      <section className='mt-[2rem] pb-[2rem] border-b'>
        <h2 className='text-2xl font-semibold text-secondary-foreground pb-[1rem]'>
          Filmes selecionados
        </h2>

        {movieTheater.movies?.length == 0 ? (
            <p>Nenhum filme selecionado</p>
          ) : (
            <ul className='flex overflow-x-auto gap-[.5rem] p-[.5rem]'>
              {movieTheater.movies?.map(movie => {
                return (
                  <SelectedMovie movie={movie} movieTheaterId={id!} key={movie.id} />
                )
              })}
            </ul>
          )
        }
      </section>

      <section className='py-[2rem] border-b'>
        <h2 className='text-2xl font-semibold text-secondary-foreground pb-[1rem]'>
          Filmes disponíveis
        </h2>
        {movieStatus === 'pending' ? (
          <p>Carregando...</p>
        ) : (
          movies?.length == 0 ? (
            <p>Não há filmes</p>
          ) : (
            <ul className='flex overflow-x-auto gap-[.5rem] p-[.5rem]'>
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

      <AdvancedSection id={movieTheater.id} />
    </>
  )
}