import { Movie } from "@prisma/client"

export type ICreateMovieRepositoryDTO = {
  tmdb_id: number
  name: string
  original_name: string
  synopsis: string
  genres: { id: number }[]
  duration: number
  release_date: Date
  poster_path: string
  max_date: Date
  directors?: string
  quantity_avaiable: number
}

export interface IMoviesRepository {
  create(data: ICreateMovieRepositoryDTO): Promise<void>
  findByTmdbId(tmdbId: number): Promise<Movie | null>
  getAll(): Promise<Movie[] | null>
  delete(id: string): Promise<void>
}