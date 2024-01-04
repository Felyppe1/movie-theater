import { AdminRoomView } from "@/components/AdminRoomView"
import { AdminMainHeader } from "@/components/ui/AdminMainHeader"
import { env } from "@/env"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

type SeatProps = {
  row: string
  column: string
  exists: boolean
  type: string
}

type RoomProps = {
  id: string
  number: string
  movie_theater_id: string
  seats: SeatProps[]
  technologies: { id: string }[]
}

export function AdminRoomDetail() {
  const { id } = useParams()

  const { data: room, status, error } = useQuery<RoomProps>({
    queryKey: ['room', id],
    queryFn: async ({ queryKey }) => {
      const response = await fetch(`${env.VITE_BACKEND_URL}/rooms/${queryKey[1]}`, { method: 'GET' })
      
      if (!response.ok) {
        if (response.status === 409) {
          const error = await response.json()
          throw new Error(error.message)
        }

        throw new Error('Algo deu errado')
      }
  
      return response.json()
    }
  })

  return (
    <>
    <AdminMainHeader h1='Cinemas' p={`Alterar sala do cinema`} />
    {status === 'pending' ? (
      <p>Carregando...</p>
    ) : status === 'error' ? (
      <p>{error.message}</p>
    ) : (
      <>
      <AdminRoomView
        number={room.number}
        selectedTechnologyIds={room.technologies?.map(technology => technology.id)}
        seats={room.seats}
        movie_theater_id={room.movie_theater_id}
        room_id={room.id}
      />
      </>
    )}
    </>
  )
}