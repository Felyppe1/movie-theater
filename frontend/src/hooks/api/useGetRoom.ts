import { getRoom } from "@/api/rooms";
import { useQuery } from "@tanstack/react-query";

type Seat = {
  id: number
  row: string
  column: string
  exists: boolean
  type: string
  room_id: string
}

type Technology = {
  id: string
}

type RoomProps = {
  id: string
  number: string
  movie_theater_id: string
  seats: Seat[]
  technologies: Technology[]
}

type UseGetRoomProps = Pick<RoomProps, 'id'>

export function useGetRoom({ id }: UseGetRoomProps) {
  return useQuery<RoomProps>({
    queryKey: ['room', id],
    queryFn: getRoom,
    retry: false
  })
}