import { AddRoomForm } from "@/components/AdminRoomView/useAdminRoomViewForm"
import { env } from "@/env"
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
    const response = await fetch(`${env.VITE_BACKEND_URL}/rooms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (response.status === 409) {
      const error = await response.json()
      throw new Error(error.message)
    }

    return response.json()
}

export const getRoom = async ({ queryKey }: QueryFunctionContext) => {
  const response = await fetch(`${env.VITE_BACKEND_URL}/rooms/${queryKey[1]}`, { method: 'GET' })
  
  if (!response.ok) {
    if (response.status === 404) {
      const error = await response.json()
      throw new Error(error.message)
    }

    throw new Error('Ocorreu um erro')
  }

  return response.json()
}

export const updateRoom = async ({ data, room_id }: UpdateRoomProps) => {
    const response = await fetch(`${env.VITE_BACKEND_URL}/rooms/${room_id ?? ''}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (response.status === 409) {
      const error = await response.json()
      throw new Error(error.message)
    }

    return response.json()
}

export const deleteRoom = async ({ room_id }: DeleteRoomProps) => {
  const response = await fetch(`${env.VITE_BACKEND_URL}/rooms/${room_id}`,
    { method: 'DELETE' }
  )

  if (response.status === 409) {
    const error = await response.json()
    throw new error(error.message)
  }
}