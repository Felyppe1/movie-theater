import { AdminRoomView } from "@/components/AdminRoomView";
import { AdminMainHeader } from "@/components/ui/AdminMainHeader";
import { useFetch } from "@/hooks/useFetch";
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

  const { data: movieTheater } = useFetch<MovieTheaterProps>(
    `http://localhost:3333/movie-theaters/${id}`, { method: 'GET' }
  )
  
  return (
    <>
      <AdminMainHeader h1='Cinemas' p={`Adicionar sala ao ${movieTheater?.name}`} />
      <AdminRoomView movie_theater_id={movieTheater.id} />
    </>
  )
}