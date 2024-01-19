import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import zod from 'zod'
import { toast } from "@/components/ui/use-toast"
import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { createMovieTheater } from "@/api/movieTheaters"

export const movieTheaterAddFormValidationSchema = zod.object({
  name: zod.string().min(1),
  street: zod.string().min(1),
  number: zod.string().min(1),
  state_id: zod.string().min(1),
  city_id: zod.string().min(1)
})

export type MovieTheaterAddForm = zod.infer<typeof movieTheaterAddFormValidationSchema>

export function useMovieTheaterAddForm() {
  const navigate = useNavigate()

  const form = useForm({
    resolver: zodResolver(movieTheaterAddFormValidationSchema),
    defaultValues: {
      name: '',
      street: '',
      number: '',
      state_id: '',
      city_id: ''
    }
  })

  const mutation = useMutation({
    mutationFn: createMovieTheater,
    onError: () => {
      toast({ description: 'Nome de cinema já cadastrado', variant: 'destructive' })
    },
    onSuccess: () => {
      toast({ description: 'Cinema cadastrado com sucesso', variant: 'success',  })
      navigate('/admin/movie-theater')
    }
  })

  return { form, mutation }
}