import { MovieTheater, Prisma } from "@prisma/client";
import { IMovieTheatersRepository, MovieTheatersAddMovieDTO, MovieTheatersCreateDTO, MovieTheatersDeleteDTO, MovieTheatersFindByIdDTO, MovieTheatersFindByNameDTO, MovieTheatersRemoveMovieDTO } from "../IMovieTheatersRepository";
import { prisma } from "../../lib/prisma";

export class PrismaMovieTheatersRepository implements IMovieTheatersRepository {
  async create(data: MovieTheatersCreateDTO) {
    const movieTheater = await prisma.movieTheater.create({
      data,
      include: {
        city: true,
        state: true
      }
    })
    
    return movieTheater
  }
  
  async getAll() {
    const movieTheaters = await prisma.movieTheater.findMany({
      include: {
        city: true,
        state: true
      }
    })
    
    return movieTheaters
  }

  async findById({ id }: MovieTheatersFindByIdDTO) {
    const movieTheater = await prisma.movieTheater.findUnique({
      where: {
        id: id
      },
      include: {
        city: true,
        state: true,
        movies: {
          include: {
            genres: true
          }
        },
        rooms: {
          include: {
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
        }
      }
    })
    
    return movieTheater
  }

  async findByName({ name }: MovieTheatersFindByNameDTO) {
    const movieTheater = await prisma.movieTheater.findUnique({
      where: {
        name
      }
    })

    return movieTheater
  }

  async delete({ id }: MovieTheatersDeleteDTO) {
    await prisma.movieTheater.delete({
      where: {
        id
      }
    })
  }

  async addMovie({ id, movieId }: MovieTheatersAddMovieDTO) {
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
        city: true,
        state: true,
        movies: {
          include: {
            genres: true
          }
        }
      }
    })

    return movieTheater
  }

  async removeMovie({ id, movieId }: MovieTheatersRemoveMovieDTO) {
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
      },
      include: {
        city: true,
        state: true,
        movies: {
          include: {
            genres: true
          }
        }
      }
    })

    return movieTheater
  }
}