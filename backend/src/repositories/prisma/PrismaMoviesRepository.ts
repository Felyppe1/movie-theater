import { Movie } from ".prisma/client";
import { prisma } from "../../lib/prisma";
import { ICreateMovieRepositoryDTO, IMoviesRepository } from "../IMoviesRepository";

export class PrismaMoviesRepository implements IMoviesRepository {
  async create({ tmdb_id, name, original_name, duration, synopsis, genres, poster_path, max_date, release_date, directors }: ICreateMovieRepositoryDTO): Promise<void> {
    await prisma.movie.create({
      data: {
        tmdb_id,
        name,
        original_name,
        synopsis,
        genres: {
          connect: genres
        },
        duration,
        poster_path,
        release_date,
        max_date,
        directors
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