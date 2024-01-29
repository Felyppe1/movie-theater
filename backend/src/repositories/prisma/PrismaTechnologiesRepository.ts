import { ITechnologiesRepository } from "../ITechnologiesRepository";
import { prisma } from "../../lib/prisma";

export class PrismaTechnologiesRepository implements ITechnologiesRepository {
  async getAll() {
    const technologies = await prisma.technology.findMany()

    return technologies
  }

}