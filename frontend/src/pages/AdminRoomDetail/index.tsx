import { useFetch } from "@/hooks/useFetch"
import { useParams } from "react-router-dom"

type TechnologiesProps = {
  id: string
  name: string
}

type Seat = {
  id: string
  row: string
  column: string
  exists: boolean
  type: string
}

type RoomProps = {
  id: string
  number: string
  movie_theater_id: string
  seats: Seat[]
  technologies: TechnologiesProps[]
}

export function AdminRoomDetail() {
  const { id } = useParams()

  const { data: room } = useFetch<RoomProps>(
    `http://localhost:3333/rooms/${id}`,
    { method: 'GET' }
  )

  const { data: technologies } = useFetch<TechnologiesProps[]>(
    `http://localhost:3333/technologies`, { method: 'GET' }
  )

  return (
    <>
    <h1>{room.id}</h1>
    <p>{room.number}</p>
    </>
  )
}