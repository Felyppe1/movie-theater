import { Configuration } from "../../@Types/Configuration";
import { prisma } from "../../lib/prisma";
import { IConfigurationsRepository } from "../IConfigurationsRepository";

export class PrismaConfigurationsRepository implements IConfigurationsRepository {
  async create(data: Configuration) {
    const configuration = await prisma.configuration.create({
      data
    })

    return configuration
  }
  
  async getAll() {
    const configurations = await prisma.configuration.findMany({})

    return configurations
  }

  async update(data: Configuration) {
    const configurations = await prisma.configuration.updateMany({
      data
    })

    return configurations
  }

}