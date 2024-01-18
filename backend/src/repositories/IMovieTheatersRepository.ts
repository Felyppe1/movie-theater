import { MovieTheater, Prisma } from "@prisma/client";

export type MovieTheatersCreateDTO = {
  name: string
  street: string
  number: string
  state_id: string
  city_id: string
}

export type MovieTheatersFindById = {
  id: string
}

export type MovieTheatersFindByName = {
  name: string
}

export type MovieTheatersAddMovie = {
  id: string
  movieId: string
}

export type MovieTheatersRemoveMovie = MovieTheatersAddMovie

type MovieTheaterSubset = {
  id: string
  name: string
  street: string
  number: string
  updated_at: Date
}

export interface IMovieTheatersRepository {
  create(data: MovieTheatersCreateDTO): Promise<MovieTheater>
  getAll(): Promise<MovieTheaterSubset[]>
  findById(data: MovieTheatersFindById): Promise<MovieTheater | null>
  findByName(data: MovieTheatersFindByName): Promise<MovieTheater | null>
  addMovie(data: MovieTheatersAddMovie): Promise<MovieTheater>
  removeMovie(data: MovieTheatersRemoveMovie): Promise<MovieTheater>
}