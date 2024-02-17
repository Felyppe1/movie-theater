import { MovieTheater } from "@prisma/client"
import { Genre } from "../@Types/Genre"
import { Movie, MovieGeneral } from "../@Types/Movie"

export type MovieCreateDTO = Omit<Movie, 'directors' | 'id'> & {
  genres: Pick<Genre, 'id'>[]
}

export type MovieFindByTmdbIdDTO = {
  tmdbId: Movie['tmdb_id']
}

export type MovieFindManyUnrelatedToTheaterDTO = {
  movieTheaterId: MovieTheater['id']
}

export type MovieFindByIdDTO = Pick<Movie, 'id'>

export type MovieDeleteDTO = MovieFindByIdDTO

export interface IMoviesRepository {
  create(data: MovieCreateDTO): Promise<MovieGeneral>
  findByTmdbId(data: MovieFindByTmdbIdDTO): Promise<Movie | null>
  findById(data: MovieFindByIdDTO): Promise<Movie | null>
  findManyUnrelatedToTheater(data: MovieFindManyUnrelatedToTheaterDTO): Promise<MovieGeneral[] | null>
  getAll(): Promise<MovieGeneral[] | null>
  delete(data: MovieDeleteDTO): Promise<void>
}