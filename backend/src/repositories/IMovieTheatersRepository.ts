import { MovieTheater, Prisma } from "@prisma/client";

export interface IMovieTheatersRepository {
  create(data: Prisma.MovieTheaterUncheckedCreateInput): Promise<MovieTheater>
}