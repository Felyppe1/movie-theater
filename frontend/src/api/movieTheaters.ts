import { env } from "@/env"
import { MovieTheaterAddForm } from "@/pages/AdminMovieTheaterAdd/useMovieTheaterAddForm"
import { QueryFunctionContext } from "@tanstack/react-query"

type AddMovieToTheaterProps = {
  movieTheaterId: string
  movieId: string
}

type RemoveMovieFromTheaterProps = AddMovieToTheaterProps


export const getMovieTheater = async ({ queryKey }: QueryFunctionContext) => {
  const response = await fetch(`${env.VITE_BACKEND_URL}/movie-theaters/${queryKey[1]}`, { method: 'GET' })
  
  if (!response.ok) {
    if (response.status === 404) {
      const error = await response.json()
      throw new Error(error.message)
    }

    throw new Error('Algo deu errado')
  }

  return response.json()
}

export const createMovieTheater = async (data: MovieTheaterAddForm) => {
  const response = await fetch(`${env.VITE_BACKEND_URL}/movie-theaters`, { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  if (response.status === 409) {
    const error = await response.json()
    throw new Error(error.message)
  }
}

export const fetchMovieTheaters = async () => {
  const response = await fetch(`${env.VITE_BACKEND_URL}/movie-theaters`, { method: 'GET' })
  
  if (!response.ok) {
    throw new Error('Algo deu errado')
  }

  return response.json()
}

export const addMovieToTheater = async ({ movieTheaterId, movieId }: AddMovieToTheaterProps) => {
  const response = await fetch(`${env.VITE_BACKEND_URL}/movie-theaters/${movieTheaterId}/movie`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ movieId })
  })

  if (!response.ok) {
    if (response.status === 404 || response.status === 409) {
      const error = await response.json()
      throw new Error(error.message)
    }
  }
}

export const removeMovieFromTheater =  async ({ movieTheaterId, movieId }: RemoveMovieFromTheaterProps) => {
  const response = await fetch(`${env.VITE_BACKEND_URL}/movie-theaters/${movieTheaterId}/movie/${movieId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (!response.ok) {
    throw new Error('Ocorreu um erro')
  }
}
