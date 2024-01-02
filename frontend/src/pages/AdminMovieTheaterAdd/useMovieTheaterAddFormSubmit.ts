import { useState } from 'react'
import { MovieTheaterAddForm } from './useMovieTheaterAddForm'
import { useToast } from '@/components/ui/use-toast'
import { useNavigate } from 'react-router-dom'


export function useMovieTheaterAddFormSubmit() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const { toast } = useToast()

  const navigate = useNavigate()

  const handleSubmit = async (data: MovieTheaterAddForm) => {
    setIsLoading(true)

    try {
      const response = await fetch('http://localhost:3333/movie-theaters', { 
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

      navigate('/admin/movie-theater/', {
        state: {
          messages: [{
            description: `Cinema cadastrado com sucesso`, variant: 'success'
          }]
        }
      })
      toast({ description: 'Cinema cadastrado com sucesso', variant: 'success' })
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }
  
  return { handleSubmit, isLoading }
}