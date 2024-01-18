import { Movie } from ".prisma/client";
import { prisma } from "../../lib/prisma";
import { MovieCreateDTO, IMoviesRepository, MovieFindByTmdbIdDTO, MoviefindManyUnrelatedToTheaterDTO, MovieDeleteDTO } from "../IMoviesRepository";

export class PrismaMoviesRepository implements IMoviesRepository {
  async create({ genres, ...data }: MovieCreateDTO): Promise<Movie> {
    const movie = await prisma.movie.create({
      data: {
        ...data,
        genres: {
          connect: genres
        }
      }
    })

    return movie
  }

  async findByTmdbId({ tmdbId }: MovieFindByTmdbIdDTO): Promise<Movie | null> {
    const movie = await prisma.movie.findUnique({
      where: {
        tmdb_id: tmdbId
      }
    })

    return movie
  }

  async findManyUnrelatedToTheater({ movieTheaterId }: MoviefindManyUnrelatedToTheaterDTO): Promise<Movie[] | null> {
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

  async delete({ id }: MovieDeleteDTO): Promise<void> {
    await prisma.movie.delete({
      where: {
        id: id
      }
    })
  }
}