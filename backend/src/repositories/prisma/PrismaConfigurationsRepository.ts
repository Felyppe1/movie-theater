import { prisma } from "../../lib/prisma";
import { ConfigurationsCreateDTO, ConfigurationsUpdateDTO, IConfigurationsRepository } from "../IConfigurationsRepository";

export class PrismaConfigurationsRepository implements IConfigurationsRepository {
  async create(data: ConfigurationsCreateDTO) {
    const configuration = await prisma.configuration.create({
      data
    })

    return configuration
  }
  
  async getAll() {
    const configurations = await prisma.configuration.findMany({})

    return configurations
  }

  async update(data: ConfigurationsUpdateDTO) {
    await prisma.configuration.deleteMany({})
    const configuration = await prisma.configuration.create({
      data
    })

    return configuration
  }

}