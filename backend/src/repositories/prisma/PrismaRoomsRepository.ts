import { Room } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { ICreateRoomRepositoryDTO, IRoomsRepository, IUpdateRoomRepositoryDTO } from "../IRoomsRepository";

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
          connect: technologyIds.map(technologyId => ({ id: technologyId }))
        }
      }
    })
  }

  async findById(id: string): Promise<Room | null> {
    const room = await prisma.room.findUnique({
      where: {
        id: id
      },
      include: {
        seats: {
          select: {
            row: true,
            column: true,
            exists: true,
            type: true
          }
        },
        technologies: {
          select: {
            id: true
          }
        }
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

  async update({ id, number, seats, technologyIds }: IUpdateRoomRepositoryDTO): Promise<void> {
    await prisma.room.update({
      where: {
        id: id
      },
      data: {
        number,
        technologies: {
          set: technologyIds.map(technologyId => ({ id: technologyId }))
        },
        seats: {
          deleteMany: {
            room_id: id
          },
          createMany: {
            data: seats
          }
        }
      }
    })
  }

  async delete(id: string): Promise<void> {
    await prisma.room.delete({
      where: { id }
    })
  }
}