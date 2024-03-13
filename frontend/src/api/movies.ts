import { env } from "@/env"
import { QueryFunctionContext, QueryKey } from "@tanstack/react-query"
import { makeRequest } from "@/utils/makeRequest"
import { Movie, MovieGeneral } from "@/@types/Movie"
import { Genre } from "@/@types/Genre"
import { TmdbMovie } from "@/@types/TmdbMovie"

type CreateMovieProps = Omit<Movie, 'id'> & {
  genres: Pick<Genre, 'id'>[]
}

type FetchTmdbStreamingMoviesProps = {
  results: TmdbMovie[]
}

export async function createMovie(data: CreateMovieProps): Promise<MovieGeneral[]> {
  return await makeRequest('/movies', { 
    method: 'POST',
    data
  })
}

export async function fetchMovies(): Promise<MovieGeneral[]> {
  return await makeRequest('/movies', { 
    method: 'GET',
  })
}

export async function fetchMoviesUnrelatedToTheater({ queryKey }: QueryFunctionContext): Promise<MovieGeneral[]> {
  return await makeRequest(`/movies/movie-theater/${queryKey[1]}/unrelated`, {
    method: 'GET'
  })
}

export async function deleteMovie(id: string): Promise<void> {
  return await makeRequest(`/movies/${id}`, { 
    method: 'DELETE'
  })
}

export async function fetchTmdbStreamingMovies({ pageParam }: QueryFunctionContext<QueryKey, number>): Promise<FetchTmdbStreamingMoviesProps> {
  return await makeRequest(`https://api.themoviedb.org/3/movie/now_playing?language=pt-BR&page=${pageParam}`, { 
    method: 'GET',
    headers: {'Authorization': `Bearer ${env.VITE_TMDB_READ_ACCESS_TOKEN}`}
  })
}

export async function getTmdbMovie({ queryKey }: QueryFunctionContext) {
  return await makeRequest(`https://api.themoviedb.org/3/movie/${queryKey[1]}?language=pt-BR`, { 
    method: 'GET',
    headers: {'Authorization': `Bearer ${env.VITE_TMDB_READ_ACCESS_TOKEN}`}
  })
}
