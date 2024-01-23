import { AdminRoomView } from "@/components/AdminRoomView"
import { AdminMainHeader } from "@/components/ui/AdminMainHeader"
import { ErrorDisplay } from "@/components/ui/ErrorDisplay"
import { LoadingDisplay } from "@/components/ui/LoadingDisplay"
import { useGetRoom } from "@/hooks/api/useGetRoom"
import { useParams } from "react-router-dom"

export function AdminRoomDetail() {
  const { id } = useParams()

  const { data: room, status, error } = useGetRoom({ id: id! })

  return (
    <>
    <AdminMainHeader h1='Cinemas' p={`Alterar sala do cinema`} backLink={`/admin/movie-theater/${room?.movie_theater_id}`} />
    {status === 'pending' ? (
      <LoadingDisplay />
    ) : status === 'error' ? (
      <ErrorDisplay message={error.message} />
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