import { env } from "@/env"
import { MovieTheaterAddForm } from "@/pages/AdminMovieTheaterAdd/useMovieTheaterAddForm"
import { makeRequest } from "@/utils/makeRequest"
import { QueryFunctionContext } from "@tanstack/react-query"

type AddMovieToTheaterProps = {
  movieTheaterId: string
  movieId: string
}

type RemoveMovieFromTheaterProps = AddMovieToTheaterProps


export const getMovieTheater = async ({ queryKey }: QueryFunctionContext) => {
  return await makeRequest(`${env.VITE_BACKEND_URL}/movie-theaters/${queryKey[1]}`, { method: 'GET' })
}

export const createMovieTheater = async (data: MovieTheaterAddForm) => {
  return await makeRequest(`${env.VITE_BACKEND_URL}/movie-theaters`, { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}

export const fetchMovieTheaters = async () => {
  return await makeRequest(`${env.VITE_BACKEND_URL}/movie-theaters`, { method: 'GET' })
}

export const addMovieToTheater = async ({ movieTheaterId, movieId }: AddMovieToTheaterProps) => {
  return await makeRequest(`${env.VITE_BACKEND_URL}/movie-theaters/${movieTheaterId}/movie`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ movieId })
  })
}

export const removeMovieFromTheater =  async ({ movieTheaterId, movieId }: RemoveMovieFromTheaterProps) => {
  return await makeRequest(`${env.VITE_BACKEND_URL}/movie-theaters/${movieTheaterId}/movie/${movieId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
