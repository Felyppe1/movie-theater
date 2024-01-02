import { useNavigate } from "react-router-dom"
import { AddRoomForm } from "./useAdminRoomViewForm"
import { useState } from "react"
import { useToast } from "../ui/use-toast"
import { env } from "@/env"

type UseSubmitRoomFormProps = {
  room_id?: string
  movie_theater_id: string
}

export function useSubmitRoomForm({ room_id, movie_theater_id }: UseSubmitRoomFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const { toast } = useToast()

  const navigate = useNavigate()
  
  const handleSubmitRoomForm = async ({ technologyIds, seats, ...formData }: AddRoomForm) => {
    setIsLoading(true)

    const cleanedData = {
      ...formData,
      movie_theater_id,
      technologyIds,
      seats: seats?.map(({ selected, ...seat }) => seat),
      id: room_id ?? undefined
    }

    try {
      const response = await fetch(`${env.VITE_BACKEND_URL}/rooms/${room_id ?? ''}`, {
        method: room_id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cleanedData)
      })
      
      if (response.status === 409) {
        const responseData = await response.json()
        setError(responseData.message)
        toast({ description: responseData.message, variant: 'destructive' })
        return
      }

      toast({ 
        description: room_id ? 'Alterações realizadas com sucesso' : 'Sala criada com sucesso', 
        variant: 'success' 
      })
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteRoom = async () => {
    setIsLoading(true)

    try {
      const response = await fetch(
        `${env.VITE_BACKEND_URL}/rooms/${room_id}`,
        { method: 'DELETE' }
      )

      if (response.status === 409) {
        const responseData = await response.json()
        setError(responseData.message)
        toast({ description: responseData.message, variant: 'destructive' })
        return
      }

      navigate(`/admin/movie-theater/${movie_theater_id}`, {
        state: {
          messages: [{
            description: `Sala excluída com sucesso`, variant: 'success'
          }]
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  return { 
    handleSubmitRoomForm, 
    handleDeleteRoom, 
    error, 
    isLoading 
  }
}