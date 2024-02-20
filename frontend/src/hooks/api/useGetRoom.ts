import { Room } from "@/@types/Room";
import { getRoom } from "@/api/rooms";
import { useQuery } from "@tanstack/react-query";


type UseGetRoomProps = Pick<Room, 'id'>

export function useGetRoom({ id }: UseGetRoomProps) {
  return useQuery({
    queryKey: ['room', id],
    queryFn: getRoom,
    retry: false
  })
}