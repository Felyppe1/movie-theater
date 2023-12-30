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
}