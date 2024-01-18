import { Room } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { RoomsCreateDTO, IRoomsRepository, RoomsUpdateDTO, RoomsFindByIdDTO, RoomsFindByNumberAndMovieTheaterDTO, RoomsDeleteDTO } from "../IRoomsRepository";

export class PrismaRoomsRepository implements IRoomsRepository {
  async create({ number, movie_theater_id, technologyIds, seats }: RoomsCreateDTO): Promise<Room> {
    const room = await prisma.room.create({
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

    return room
  }

  async findById({ id }: RoomsFindByIdDTO): Promise<Room | null> {
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

  async findByNumberAndMovieTheater({ number, movie_theater_id }: RoomsFindByNumberAndMovieTheaterDTO): Promise<Room | null> {
    const room = await prisma.room.findFirst({
      where: {
        number,
        movie_theater_id
      }
    })

    return room
  }

  async update({ id, number, seats, technologyIds }: RoomsUpdateDTO): Promise<Room> {
    const room =await prisma.room.update({
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

    return room
  }

  async delete({ id }: RoomsDeleteDTO): Promise<void> {
    await prisma.room.delete({
      where: { id }
    })
  }
}