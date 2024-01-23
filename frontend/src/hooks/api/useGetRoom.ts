import { Room } from "@/@types/Room";
import { Seat } from "@/@types/Seat";
import { Technology } from "@/@types/Technology";
import { getRoom } from "@/api/rooms";
import { useQuery } from "@tanstack/react-query";

type RoomProps = Room & {
  seats: Seat[]
  technologies: Pick<Technology, 'id'>[]
}

type UseGetRoomProps = Pick<Room, 'id'>

export function useGetRoom({ id }: UseGetRoomProps) {
  return useQuery<RoomProps>({
    queryKey: ['room', id],
    queryFn: getRoom,
    retry: false
  })
}