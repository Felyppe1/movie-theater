import { AdminRoomContent } from "@/components/AdminRoomContent"
import { AdminMainHeader } from "@/components/ui/AdminMainHeader"
import { useFetch } from "@/hooks/useFetch"
import { useParams } from "react-router-dom"


type TechnologiesProps = {
  id: string
  name: string
}

type SeatProps = {
  id: number
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
  technologies: TechnologiesProps[]
}

export function AdminRoomDetail() {
  const { id } = useParams()

  const { data: room, isLoading } = useFetch<RoomProps>(
    `http://localhost:3333/rooms/${id}`,
    { method: 'GET' }
  )

  return (
    <>
    <AdminMainHeader h1='Cinemas' p='Alterar sala de cinema' />
    {!isLoading && (
      <>
      <AdminRoomContent
        number={room.number}
        selectedTechnologies={room.technologies}
        seats={room.seats}
        movie_theater_id={room.movie_theater_id}
      />
      </>
    )}
    </>
  )
}