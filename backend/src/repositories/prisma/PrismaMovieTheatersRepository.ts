import { MovieTheater, Prisma } from "@prisma/client";
import { IMovieTheatersRepository } from "../IMovieTheatersRepository";
import { prisma } from "../../lib/prisma";

export class PrismaMovieTheatersRepository implements IMovieTheatersRepository {
  async create(data: Prisma.MovieTheaterUncheckedCreateInput) {
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

  async findById(id: string): Promise<MovieTheater | null> {
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
        }
        
      }
    })
    
    return movieTheater
  }
}