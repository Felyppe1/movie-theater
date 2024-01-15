import { MovieTheater, Prisma } from "@prisma/client";

type MovieTheaterSubset = {
  id: string
  name: string
  street: string
  number: string
  updated_at: Date
}

export interface IMovieTheatersRepository {
  create(data: Prisma.MovieTheaterUncheckedCreateInput): Promise<MovieTheater>
  getAll(): Promise<MovieTheaterSubset[]>
  findById(id: string): Promise<MovieTheater | null>
  findByName(name: string): Promise<MovieTheater | null>
  addMovie(id: string, movieId: string): Promise<MovieTheater>
}