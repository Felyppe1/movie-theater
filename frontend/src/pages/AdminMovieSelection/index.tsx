import { AdminMainHeader } from "@/components/ui/AdminMainHeader"
import { ApiMoviesSection } from "./ApiMoviesSection"
import { MoviesSection } from "./MoviesSection"


export function AdminMovieSelection() {
  return (
    <>
      <AdminMainHeader h1='Seleção de Filmes' p='Selecionar filmes para o banco de dados dos cinemas' backLink='/admin' />

      <ApiMoviesSection />
      <MoviesSection />
    </>
  )
}