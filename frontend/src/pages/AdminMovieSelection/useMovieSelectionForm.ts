import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import zod from 'zod'

const movieSelectionValidationSchema = zod.object({
  tmdb_id: zod.number().min(1),
  name: zod.string().min(1),
  original_name: zod.string().min(1),
  sinopse: zod.string().min(1),
  duration: zod.number().min(1),
  release_date: zod.date(),
  poster_path: zod.string().min(1),
  max_date: zod.date()
})
type MovieSelectionForm = zod.infer<typeof movieSelectionValidationSchema>

export function useMovieSelectionForm() {
  const form = useForm({
    resolver: zodResolver(movieSelectionValidationSchema),
    defaultValues: {
      tmdb_id: null,
      name: '',
      original_name: '',
      sinopse: '',
      duration: '',
      release_date: new Date(),
      poster_path: '',
      max_date: '',
    }
  })

  form.watch('max_date')
  
  return { form }
}