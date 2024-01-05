import { useState } from 'react'
import { MovieTheaterAddForm } from './useMovieTheaterAddForm'
import { useToast } from '@/components/ui/use-toast'
import { env } from '@/env'


export function useMovieTheaterAddFormSubmit() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const { toast } = useToast()

  const handleSubmit = async (data: MovieTheaterAddForm) => {
    setIsLoading(true)

    try {
      const response = await fetch(`${env.VITE_BACKEND_URL}/movie-theaters`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if (response.status === 409) {
        const responseData = await response.json()
        setError(responseData.message)
        toast({ description: responseData.message, variant: 'destructive' })
        return
      }

      toast({ description: 'Cinema cadastrado com sucesso', variant: 'success',  })
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }
  
  return { handleSubmit, isLoading }
}