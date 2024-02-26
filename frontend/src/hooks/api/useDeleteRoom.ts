import { MovieTheater } from "@/@types/MovieTheater"
import { deleteRoom } from "@/api/rooms"
import { toast } from "@/components/ui/use-toast"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"

type UseDeleteRoomProps = {
  movieTheaterId: MovieTheater['id']
}

export function useDeleteRoom({ movieTheaterId }: UseDeleteRoomProps) {
  const navigate = useNavigate()
  
  const mutation = useMutation({
    mutationFn: deleteRoom,
    onError: (error) => {
      toast({ description: error.message, variant: 'destructive' })
    },
    onSuccess: () => {
      toast({ description: 'Sala excluída com sucesso', variant: 'success' })
      navigate(`/admin/movie-theater/${movieTheaterId}`)
    }
  })

  return { mutation }
}