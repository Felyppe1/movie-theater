import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import zod from 'zod'

export const movieTheaterAddFormValidationSchema = zod.object({
  name: zod.string().min(1),
  street: zod.string().min(1),
  number: zod.string().min(1),
  state_id: zod.string().min(1),
  city_id: zod.string().min(1)
})

export type MovieTheaterAddForm = zod.infer<typeof movieTheaterAddFormValidationSchema>

export function useMovieTheaterAddForm() {
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
  
  return { form }
}