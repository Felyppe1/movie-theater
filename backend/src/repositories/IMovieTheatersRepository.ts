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
}