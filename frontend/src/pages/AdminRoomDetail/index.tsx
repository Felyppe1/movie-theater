import { AdminMainHeader } from "@/components/ui/AdminMainHeader"
import { ErrorDisplay } from "@/components/ui/ErrorDisplay"
import { LoadingDisplay } from "@/components/ui/LoadingDisplay"
import { useGetRoom } from "@/hooks/api/useGetRoom"
import { useParams } from "react-router-dom"
import { AdminRoomDetailContent } from "./AdminRoomDetailContent"

export function AdminRoomDetail() {
  const { id } = useParams()

  const { data: room, status, error } = useGetRoom({ id: id! })

  return status === 'pending' ? (
    <LoadingDisplay />
  ) : status === 'error' ? (
    <ErrorDisplay message={error.message} />
  ) : (
    <>
      <AdminMainHeader h1='Cinemas' p={`Alterar sala do cinema`} backLink={`/admin/movie-theater/${room?.movie_theater_id}`} />
      <AdminRoomDetailContent
        movie_theater_id={room.movie_theater_id}
        room={room}
      />
    </>
  )
}