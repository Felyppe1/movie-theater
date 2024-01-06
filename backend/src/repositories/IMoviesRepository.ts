import { Movie } from "@prisma/client"

export type ICreateMovieRepositoryDTO = {
  tmdb_id: number
  name: string
  original_name: string
  synopsis: string
  duration: number
  release_date: Date
  poster_path: string
  max_date: Date
  directors?: string
}

export interface IMoviesRepository {
  create(data: ICreateMovieRepositoryDTO): Promise<void>
  findByTmdbId(tmdbId: number): Promise<Movie | null>
  getAll(): Promise<Movie[] | null>
}