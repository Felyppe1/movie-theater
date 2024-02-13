import { env } from "@/env"
import { QueryFunctionContext } from "@tanstack/react-query"
import { AddMovieForm } from "../pages/AdminMovieSelection/ApiMoviesSection/useAddMovieForm"
import { makeRequest } from "@/utils/makeRequest"

type CreateMovieProps = Omit<AddMovieForm, 'genres'> & {
  genres: { id: number }[]
}

export async function fetchMovies() {
  return await makeRequest('/movies', { 
    method: 'GET',
  })
}

export async function fetchMoviesUnrelatedToTheater({ queryKey }: QueryFunctionContext) {
  return await makeRequest(`/movies/movie-theater/${queryKey[1]}/unrelated`, {
    method: 'GET'
  })
}

export async function getTmdbMovie({ queryKey }: QueryFunctionContext) {
  return await makeRequest(`https://api.themoviedb.org/3/movie/${queryKey[1]}?language=pt-BR`, { 
    method: 'GET',
    headers: {'Authorization': `Bearer ${env.VITE_TMDB_READ_ACCESS_TOKEN}`}
  })
}

export async function createMovie(data: CreateMovieProps) {
  return await makeRequest('/movies', { 
    method: 'POST',
    data
  })
}

export async function deleteMovie(id: string) {
  return await makeRequest(`/movies/${id}`, { 
    method: 'DELETE'
  })
}
