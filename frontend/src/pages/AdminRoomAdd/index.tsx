import { AdminRoomView } from "@/components/AdminRoomView";
import { AdminMainHeader } from "@/components/ui/AdminMainHeader";
import { ErrorDisplay } from "@/components/ui/ErrorDisplay";
import { LoadingDisplay } from "@/components/ui/LoadingDisplay";
import { useGetMovieTheater } from "@/hooks/api/useGetMovieTheater";
import { useParams } from "react-router-dom";

export function AdminRoomAdd() {
  const { id } = useParams()

  const { data: movieTheater, status, error } = useGetMovieTheater({ id: id! })
  
  return status === 'pending' ? (
    <LoadingDisplay />
  ) : status === 'error' ? (
    <ErrorDisplay message={error.message} />
  ) : (
    <>
      <AdminMainHeader h1='Cinemas' p={`Adicionar sala ao ${movieTheater?.name}`} backLink={`/admin/movie-theater/${id}`} />
      <AdminRoomView movie_theater_id={movieTheater.id} />
    </>
  )
}