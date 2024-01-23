import { AddRoomForm } from "@/components/AdminRoomView/useAdminRoomViewForm"
import { env } from "@/env"
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
  return await makeRequest(`${env.VITE_BACKEND_URL}/rooms`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}

export const getRoom = async ({ queryKey }: QueryFunctionContext) => {
  return await makeRequest(`${env.VITE_BACKEND_URL}/rooms/${queryKey[1]}`, { method: 'GET' })
}

export const updateRoom = async ({ data, room_id }: UpdateRoomProps) => {
  return await makeRequest(`${env.VITE_BACKEND_URL}/rooms/${room_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}

export const deleteRoom = async ({ room_id }: DeleteRoomProps) => {
  return await makeRequest(`${env.VITE_BACKEND_URL}/rooms/${room_id}`,
    { method: 'DELETE' }
  )
}