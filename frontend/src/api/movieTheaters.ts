import { MovieTheaterAdditional, MovieTheaterGeneral } from "@/@types/MovieTheater"
import { Room } from "@/@types/Room"
import { MovieTheaterAddForm } from "@/pages/AdminMovieTheaterAdd/useMovieTheaterAddForm"
import { makeRequest } from "@/utils/makeRequest"
import { QueryFunctionContext } from "@tanstack/react-query"

type GetMovieTheaterResponse = MovieTheaterGeneral & {
  rooms: (Room & {
    _count: {
      seats: number
    }
  })[]
}

type AddMovieToTheaterProps = {
  movieTheaterId: string
  movieId: string
}

type RemoveMovieFromTheaterProps = AddMovieToTheaterProps


export const getMovieTheater = async ({ queryKey }: QueryFunctionContext): Promise<GetMovieTheaterResponse> => {
  return await makeRequest(`/movie-theaters/${queryKey[1]}`, { method: 'GET' })
}

export const createMovieTheater = async (data: MovieTheaterAddForm): Promise<MovieTheaterAdditional> => {
  return await makeRequest('/movie-theaters', { 
    method: 'POST',
    data
  })
}

export const fetchMovieTheaters = async (): Promise<MovieTheaterAdditional[]> => {
  return await makeRequest('/movie-theaters', { method: 'GET' })
}

export const addMovieToTheater = async ({ movieTheaterId, movieId }: AddMovieToTheaterProps): Promise<MovieTheaterGeneral> => {
  return await makeRequest(`/movie-theaters/${movieTheaterId}/movie`, {
    method: 'POST',
    data: { movieId }
  })
}

export const removeMovieFromTheater = async ({ movieTheaterId, movieId }: RemoveMovieFromTheaterProps): Promise<MovieTheaterGeneral>  => {
  return await makeRequest(`/movie-theaters/${movieTheaterId}/movie/${movieId}`, {
    method: 'DELETE',
  })
}
