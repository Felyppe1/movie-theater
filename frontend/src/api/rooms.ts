import { AddRoomForm } from "@/components/AdminRoomView/useAdminRoomViewForm"
import { makeRequest } from "@/utils/makeRequest"
import { QueryFunctionContext } from "@tanstack/react-query"

type CreateRoomProps = {
  data: AddRoomForm
}

type UpdateRoomProps = CreateRoomProps & {
  room_id: string
}

type DeleteRoomProps = {
  room_id: string
}

export const createRoom = async ({ data }: CreateRoomProps) => {
  return await makeRequest('/rooms', {
    method: 'POST',
    data
  })
}

export const getRoom = async ({ queryKey }: QueryFunctionContext) => {
  return await makeRequest(`/rooms/${queryKey[1]}`, { method: 'GET' })
}

export const updateRoom = async ({ data, room_id }: UpdateRoomProps) => {
  return await makeRequest(`/rooms/${room_id}`, {
    method: 'PUT',
    data
  })
}

export const deleteRoom = async ({ room_id }: DeleteRoomProps) => {
  return await makeRequest(`/rooms/${room_id}`,
    { method: 'DELETE' }
  )
}