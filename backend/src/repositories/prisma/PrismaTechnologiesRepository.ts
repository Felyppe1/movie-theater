import { Technology } from "@prisma/client";
import { ITechnologiesRepository } from "../ITechnologiesRepository";
import { prisma } from "../../lib/prisma";

export class PrismaTechnologiesRepository implements ITechnologiesRepository {
  async getAll(): Promise<Technology[]> {
    const technologies = await prisma.technology.findMany()

    return technologies
  }

}