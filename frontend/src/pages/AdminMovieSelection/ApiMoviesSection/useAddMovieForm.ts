import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import zod from 'zod'

const genresValidationSchema = zod.object({
  id: zod.number().min(1),
  name: zod.string().min(1)
})

const movieSelectionValidationSchema = zod.object({
  tmdb_id: zod.number().min(1),
  name: zod.string().min(1),
  original_name: zod.string().min(1),
  synopsis: zod.string().min(1),
  genres: zod.array(genresValidationSchema),
  duration: zod.number().min(1),
  release_date: zod.date(),
  poster_path: zod.string().min(1),
  max_date: zod.date({
    required_error: 'Selecione uma data limite de exibição'
  }),
  quantity_avaiable: zod.number().min(1)
})
export type AddMovieForm = zod.infer<typeof movieSelectionValidationSchema>

export function useAddMovieForm() {
  const form = useForm<AddMovieForm>({
    resolver: zodResolver(movieSelectionValidationSchema),
    defaultValues: {
      tmdb_id: 0,
      name: '',
      original_name: '',
      synopsis: '',
      genres: [],
      duration: 0,
      release_date: new Date(),
      poster_path: '',
      max_date: undefined,
      quantity_avaiable: 0
    }
  })

  form.watch('max_date')
  
  return { form }
}