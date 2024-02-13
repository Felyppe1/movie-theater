import { MovieTheaterAddForm } from "@/pages/AdminMovieTheaterAdd/useMovieTheaterAddForm"
import { makeRequest } from "@/utils/makeRequest"
import { QueryFunctionContext } from "@tanstack/react-query"

type AddMovieToTheaterProps = {
  movieTheaterId: string
  movieId: string
}

type RemoveMovieFromTheaterProps = AddMovieToTheaterProps


export const getMovieTheater = async ({ queryKey }: QueryFunctionContext) => {
  return await makeRequest(`/movie-theaters/${queryKey[1]}`, { method: 'GET' })
}

export const createMovieTheater = async (data: MovieTheaterAddForm) => {
  return await makeRequest('/movie-theaters', { 
    method: 'POST',
    data
  })
}

export const fetchMovieTheaters = async () => {
  return await makeRequest('/movie-theaters', { method: 'GET' })
}

export const addMovieToTheater = async ({ movieTheaterId, movieId }: AddMovieToTheaterProps) => {
  return await makeRequest(`/movie-theaters/${movieTheaterId}/movie`, {
    method: 'POST',
    data: { movieId }
  })
}

export const removeMovieFromTheater =  async ({ movieTheaterId, movieId }: RemoveMovieFromTheaterProps) => {
  return await makeRequest(`/movie-theaters/${movieTheaterId}/movie/${movieId}`, {
    method: 'DELETE',
  })
}
