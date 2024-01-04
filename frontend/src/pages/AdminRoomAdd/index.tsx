import { AdminRoomView } from "@/components/AdminRoomView";
import { AdminMainHeader } from "@/components/ui/AdminMainHeader";
import { env } from "@/env";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export type Room = {
  id: string
  name: string
}

type MovieTheaterProps = {
  id: string
  name: string
  street: string
  number: string
  created_at: Date
  updated_at: Date
  state_id: string
  city_id: string
  Room: Room[]
}

export function AdminRoomAdd() {
  const { id } = useParams()

  const { data: movieTheater, status, error } = useQuery<MovieTheaterProps>({
    queryKey: ['movieTheater', id],
    queryFn: async ({ queryKey }) => {
      const response = await fetch(`${env.VITE_BACKEND_URL}/movie-theaters/${queryKey[1]}`, { method: 'GET' })
      
      if (!response.ok) {
        if (response.status === 409) {
          const error = await response.json()
          throw new Error(error.message)
        }

        throw new Error('Algo deu errado')
      }
  
      return response.json()
    },
    retry: false
  })
  
  return status === 'pending' ? (
    <p>Carregando...</p>
  ) : status === 'error' ? (
    <p>{error.message}</p>
  ) : (
    <>
      <AdminMainHeader h1='Cinemas' p={`Adicionar sala ao ${movieTheater?.name}`} />
      <AdminRoomView movie_theater_id={movieTheater.id} />
    </>
  )
}