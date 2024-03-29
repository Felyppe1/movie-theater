import { Movie } from "../@Types/Movie"
import { MovieTheater, MovieTheaterAdditional, MovieTheaterFull, MovieTheaterGeneral } from "../@Types/MovieTheater"
import { Room } from "../@Types/Room"

export type MovieTheatersCreateDTO = Pick<MovieTheater, 
  'name' | 'street' | 'number' | 'state_id' | 'city_id'
>

export type MovieTheatersFindByIdDTO = Pick<MovieTheater, 'id'>

export type MovieTheatersFindByNameDTO = Pick<MovieTheater, 'name'>

export type MovieTheatersDeleteDTO = Pick<MovieTheater, 'id'>

export type MovieTheatersAddMovieDTO = Pick<MovieTheater, 'id'> & {
  movieId: Movie['id']
}

export type MovieTheatersRemoveMovieDTO = MovieTheatersAddMovieDTO

export type MovieTheaterFullEdited = MovieTheaterGeneral & {
  rooms: (
    Room & { 
    _count: { 
      seats: number 
    }}
  )[]
}

export interface IMovieTheatersRepository {
  create(data: MovieTheatersCreateDTO): Promise<MovieTheaterAdditional>
  getAll(): Promise<MovieTheaterAdditional[]>
  findById(data: MovieTheatersFindByIdDTO): Promise<MovieTheaterFullEdited | null>
  findByName(data: MovieTheatersFindByNameDTO): Promise<MovieTheater | null>
  delete(data: MovieTheatersDeleteDTO): Promise<void>
  addMovie(data: MovieTheatersAddMovieDTO): Promise<MovieTheaterGeneral>
  removeMovie(data: MovieTheatersRemoveMovieDTO): Promise<MovieTheaterGeneral>
}