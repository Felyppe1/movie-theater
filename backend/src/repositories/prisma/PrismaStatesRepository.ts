import { State } from "@prisma/client";
import { IStatesRepository } from "../IStatesRepository";
import { prisma } from "../../lib/prisma";

export class PrismaStatesRepository implements IStatesRepository {
  async getAll(): Promise<State[]> {
    const states = await prisma.state.findMany({
      include: {
        cities: true
      }
    })

    return states
  }

}