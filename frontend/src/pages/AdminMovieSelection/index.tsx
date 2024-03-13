import { AdminMainHeader } from "@/components/ui/AdminMainHeader"
import { ApiMoviesSection } from "./ApiMoviesSection"
import { MoviesSection } from "./MoviesSection"


export function AdminMovieSelection() {
  const movieTmdbIds = new Set<number>()

  return (
    <>
      <AdminMainHeader h1='Seleção de Filmes' p='Selecionar filmes para o banco de dados dos cinemas' backLink='/admin' />

      <ApiMoviesSection movieTmdbIds={movieTmdbIds} />
      <MoviesSection movieTmdbIds={movieTmdbIds} />
    </>
  )
}