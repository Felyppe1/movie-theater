export type Movie = {
  id: string
  tmdb_id: number
  name: string
  original_name: string
  synopsis: string
  duration: number
  release_date: Date
  directors: string | null
  poster_path: string
  max_date: Date
}