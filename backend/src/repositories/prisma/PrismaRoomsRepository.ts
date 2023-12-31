import { Room } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { ICreateRoomRepositoryDTO, IRoomsRepository } from "../IRoomsRepository";

export class PrismaRoomsRepository implements IRoomsRepository {
  async create({ number, movie_theater_id, technologyIds, seats }: ICreateRoomRepositoryDTO): Promise<void> {
    await prisma.room.create({
      data: {
        number,
        movie_theater_id,
        seats: {
          create: seats
        },
        technologies: {
          connect: technologyIds
        }
      }
    })
  }

  async findByNumber(number: string): Promise<Room | null> {
    const room = await prisma.room.findFirst({
      where: {
        number: number
      }
    })

    return room
  }

  async findByNumberAndMovieTheater(number: string, movie_theater_id: string): Promise<Room | null> {
    const room = await prisma.room.findFirst({
      where: {
        number,
        movie_theater_id
      }
    })

    return room
  }
}