import { MovieTheater, Prisma } from "@prisma/client";
import { IMovieTheatersRepository, MovieTheatersAddMovie, MovieTheatersCreateDTO, MovieTheatersFindById, MovieTheatersFindByName, MovieTheatersRemoveMovie } from "../IMovieTheatersRepository";
import { prisma } from "../../lib/prisma";

export class PrismaMovieTheatersRepository implements IMovieTheatersRepository {
  async create(data: MovieTheatersCreateDTO) {
    const movieTheater = await prisma.movieTheater.create({ data })
    
    return movieTheater
  }
  
  async getAll() {
    const movieTheaters = await prisma.movieTheater.findMany({
      select: {
        id: true,
        name: true,
        street: true,
        number: true,
        updated_at: true
      }
    })
    
    return movieTheaters
  }

  async findById({ id }: MovieTheatersFindById): Promise<MovieTheater | null> {
    const movieTheater = await prisma.movieTheater.findUnique({
      where: {
        id: id
      },
      include: {
        Room: {
          select: {
            id: true,
            number: true,
            _count: {
              select: {
                seats: {
                  where: {
                    exists: true
                  }
                }
              }
            }
          }
        },
        movies: {
          include: {
            genres: true
          }
        }
      }
    })
    
    return movieTheater
  }

  async findByName({ name }: MovieTheatersFindByName): Promise<MovieTheater | null> {
    const movieTheater = await prisma.movieTheater.findUnique({
      where: {
        name
      }
    })

    return movieTheater
  }

  async addMovie({ id, movieId }: MovieTheatersAddMovie): Promise<MovieTheater> {
    const movieTheater = await prisma.movieTheater.update({
      where: {
        id: id
      },
      data: {
        movies: {
          connect: {
            id: movieId
          }
        }
      },
      include: {
        movies: true
      }
    })

    return movieTheater
  }

  async removeMovie({ id, movieId }: MovieTheatersRemoveMovie): Promise<MovieTheater> {
    const movieTheater = await prisma.movieTheater.update({
      where: {
        id: id
      },
      data: {
        movies: {
          disconnect: {
            id: movieId
          }
        }
      }
    })

    return movieTheater
  }
}