import { IStatesRepository } from "../IStatesRepository";
import { prisma } from "../../lib/prisma";

export class PrismaStatesRepository implements IStatesRepository {
  async getAll() {
    const states = await prisma.state.findMany({
      include: {
        cities: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })

    return states
  }

}