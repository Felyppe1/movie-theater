import { Movie } from "@prisma/client"

export type MovieCreateDTO = {
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

export type MovieFindByTmdbIdDTO = {
  tmdbId: number
}

export type MoviefindManyUnrelatedToTheaterDTO = {
  movieTheaterId: string
}

export type MovieFindByIdDTO = {
  id: string
}

export type MovieDeleteDTO = MovieFindByIdDTO

export interface IMoviesRepository {
  create(data: MovieCreateDTO): Promise<Movie>
  findByTmdbId(data: MovieFindByTmdbIdDTO): Promise<Movie | null>
  findById(data: MovieFindByIdDTO): Promise<Movie | null>
  findManyUnrelatedToTheater(data: MoviefindManyUnrelatedToTheaterDTO): Promise<Movie[] | null>
  getAll(): Promise<Movie[] | null>
  delete(data: MovieDeleteDTO): Promise<void>
}