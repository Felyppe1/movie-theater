import { Movie } from "../@Types/Movie"
import { MovieTheater, MovieTheaterAdditional, MovieTheaterFull, MovieTheaterGeneral } from "../@Types/MovieTheater"
import { Room } from "../@Types/Room"

export type MovieTheatersCreateDTO = Pick<MovieTheater, 
  'name' | 'street' | 'number' | 'state_id' | 'city_id'
>

export type MovieTheatersFindByIdDTO = Pick<MovieTheater, 'id'>

export type MovieTheatersFindByNameDTO = Pick<MovieTheater, 'name'>

export type MovieTheatersAddMovieDTO = Pick<MovieTheater, 'id'> & {
  movieId: Movie['id']
}

export type MovieTheatersRemoveMovieDTO = MovieTheatersAddMovieDTO

export type MovieTheaterFullEdited = MovieTheaterGeneral & {
  Room: (
    Room & { 
    _count: { 
      seats: number 
    }}
  )[]
}

export interface IMovieTheatersRepository {
  create(data: MovieTheatersCreateDTO): Promise<MovieTheater>
  getAll(): Promise<MovieTheaterAdditional[]>
  findById(data: MovieTheatersFindByIdDTO): Promise<MovieTheaterFullEdited | null>
  findByName(data: MovieTheatersFindByNameDTO): Promise<MovieTheater | null>
  addMovie(data: MovieTheatersAddMovieDTO): Promise<MovieTheaterGeneral>
  removeMovie(data: MovieTheatersRemoveMovieDTO): Promise<MovieTheaterGeneral>
}