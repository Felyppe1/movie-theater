import { Movie } from ".prisma/client";
import { prisma } from "../../lib/prisma";
import { ICreateMovieRepositoryDTO, IMoviesRepository } from "../IMoviesRepository";

export class PrismaMoviesRepository implements IMoviesRepository {
  async create({ genres, ...data }: ICreateMovieRepositoryDTO): Promise<void> {
    await prisma.movie.create({
      data: {
        ...data,
        genres: {
          connect: genres
        }
      }
    })
  }

  async findByTmdbId(tmdbId: number): Promise<Movie | null> {
    const movie = await prisma.movie.findUnique({
      where: {
        tmdb_id: tmdbId
      }
    })

    return movie
  }

  async findManyUnrelatedToTheater(movieTheaterId: string): Promise<Movie[] | null> {
    const movies = await prisma.movie.findMany({
      where: {
        movieTheaters: {
          none: {
            id: movieTheaterId
          }
        }
      },
      include: {
        genres: true
      }
    })

    return movies
  }

  async getAll(): Promise<Movie[] | null> {
    const movies = await prisma.movie.findMany({
      include: {
        genres: true
      }
    })

    return movies
  }

  async delete(id: string): Promise<void> {
    await prisma.movie.delete({
      where: {
        id: id
      }
    })
  }
}