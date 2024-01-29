import { prisma } from "../../lib/prisma";
import { MovieCreateDTO, IMoviesRepository, MovieFindByTmdbIdDTO, MoviefindManyUnrelatedToTheaterDTO, MovieDeleteDTO, MovieFindByIdDTO } from "../IMoviesRepository";

export class PrismaMoviesRepository implements IMoviesRepository {
  async create({ genres, ...data }: MovieCreateDTO) {
    const movie = await prisma.movie.create({
      data: {
        ...data,
        genres: {
          connect: genres
        }
      },
      include: {
        genres: true
      }
    })

    return movie
  }

  async findByTmdbId({ tmdbId }: MovieFindByTmdbIdDTO) {
    const movie = await prisma.movie.findUnique({
      where: {
        tmdb_id: tmdbId
      }
    })

    return movie
  }

  async findById({ id }: MovieFindByIdDTO) {
    const movie = await prisma.movie.findUnique({
      where: { id }
    })

    return movie
  }

  async findManyUnrelatedToTheater({ movieTheaterId }: MoviefindManyUnrelatedToTheaterDTO) {
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

  async getAll() {
    const movies = await prisma.movie.findMany({
      include: {
        genres: true
      }
    })

    return movies
  }

  async delete({ id }: MovieDeleteDTO) {
    await prisma.movie.delete({
      where: {
        id: id
      }
    })
  }
}