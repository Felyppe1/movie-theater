import { MovieTheater, Prisma } from "@prisma/client";
import { IMovieTheatersRepository } from "../IMovieTheatersRepository";
import { prisma } from "../../lib/prisma";

export class PrismaMovieTheatersRepository implements IMovieTheatersRepository {
  async create(data: Prisma.MovieTheaterUncheckedCreateInput): Promise<MovieTheater> {
    const movieTheater = await prisma.movieTheater.create({ data })

    return movieTheater
  }

}