import { Room } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { RoomsCreateDTO, IRoomsRepository, RoomsUpdateDTO, RoomsFindByIdDTO, RoomsFindByNumberAndMovieTheaterDTO, RoomsDeleteDTO } from "../IRoomsRepository";

export class PrismaRoomsRepository implements IRoomsRepository {
  async create({ number, movie_theater_id, technologyIds, seats }: RoomsCreateDTO) {
    const room = await prisma.room.create({
      data: {
        number,
        movie_theater_id,
        seats: {
          create: seats.flat()
        },
        technologies: {
          connect: technologyIds.map(technologyId => ({ id: technologyId }))
        }
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
        technologies: true
      }
    })

    return room
  }

  async findById({ id }: RoomsFindByIdDTO) {
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
        technologies: true
      }
    })

    return room
  }

  async findByNumberAndMovieTheater({ number, movie_theater_id }: RoomsFindByNumberAndMovieTheaterDTO) {
    const room = await prisma.room.findFirst({
      where: {
        number,
        movie_theater_id
      }
    })

    return room
  }

  async update({ id, number, seats, technologyIds }: RoomsUpdateDTO) {
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
            data: seats.flat()
          }
        }
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
        technologies: true
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