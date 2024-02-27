import { Room, RoomGeneral } from "@/@types/Room"
import { SeatCreate } from "@/@types/Seat"
import { Technology } from "@/@types/Technology"
import { makeRequest } from "@/utils/makeRequest"
import { QueryFunctionContext } from "@tanstack/react-query"

type CreateRoomProps = Omit<Room, 'id'> & {
  seats: SeatCreate[][],
  technologyIds: Technology['id'][]
}

type UpdateRoomProps = CreateRoomProps & {
  room_id: Room['id']
}

type DeleteRoomProps = {
  room_id: Room['id']
}

export const createRoom = async (data: CreateRoomProps): Promise<RoomGeneral> => {
  return await makeRequest('/rooms', {
    method: 'POST',
    data
  })
}

export const getRoom = async ({ queryKey }: QueryFunctionContext): Promise<RoomGeneral> => {
  return await makeRequest(`/rooms/${queryKey[1]}`, { method: 'GET' })
}

export const updateRoom = async ({ room_id, ...data }: UpdateRoomProps): Promise<RoomGeneral> => {
  return await makeRequest(`/rooms/${room_id}`, {
    method: 'PUT',
    data
  })
}

export const deleteRoom = async ({ room_id }: DeleteRoomProps): Promise<void> => {
  return await makeRequest(`/rooms/${room_id}`,
    { method: 'DELETE' }
  )
}