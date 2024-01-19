import { env } from "@/env"
import { QueryFunctionContext } from "@tanstack/react-query"
import { AddMovieForm } from "../pages/AdminMovieSelection/ApiMoviesSection/useAddMovieForm"

type CreateMovieProps = Omit<AddMovieForm, 'genres'> & {
  genres: { id: number }[]
}

export async function fetchMovies() {
  const response = await fetch(`${env.VITE_BACKEND_URL}/movies`, { 
    method: 'GET',
  })
  
  if (!response.ok) {
    throw new Error('Ocorre um erro')
  }

  return response.json()
}

export async function fetchMoviesUnrelatedToTheater({ queryKey }: QueryFunctionContext) {
  const response = await fetch(`${env.VITE_BACKEND_URL}/movies/movie-theater/${queryKey[1]}/unrelated`, { method: 'GET' })
  
  if (!response.ok) {
    if (response.status === 404) {
      const error = await response.json()
      throw new Error(error.message)
    }

    throw new Error('Ocorreu um erro')
  }

  return response.json()
}

export async function getTmdbMovie({ queryKey }: QueryFunctionContext) {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${queryKey[1]}?language=pt-BR`, { 
    method: 'GET',
    headers: {'Authorization': `Bearer ${env.VITE_TMDB_READ_ACCESS_TOKEN}`}
  })

  if (!response.ok) {
    throw new Error('Ocorreu um erro')
  }

  return response.json()
}

export async function createMovie(data: CreateMovieProps) {
  const response = await fetch(`${env.VITE_BACKEND_URL}/movies`, { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    if (response.status == 409) {
      const error = await response.json()
      throw new Error(error.message)
    }

    throw new Error('Ocorreu um erro')
  }
}

export async function deleteMovie(id: string) {
  const response = await fetch(`${env.VITE_BACKEND_URL}/movies/${id}`, { 
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (!response.ok) {
    throw new Error('Ocorreu um erro')
  }
}
