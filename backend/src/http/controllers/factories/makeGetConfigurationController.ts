import { PrismaConfigurationsRepository } from "../../../repositories/prisma/PrismaConfigurationsRepository";
import { GetConfigurationUseCase } from "../../../useCases/GetConfigurationUseCase";
import { GetConfigurationController } from "../GetConfigurationController";

export function makeGetConfigurationController() {
  const configurationsRepository = new PrismaConfigurationsRepository()

  const getConfigurationUseCase = new GetConfigurationUseCase(configurationsRepository)

  const getConfigurationController = new GetConfigurationController(getConfigurationUseCase)

  return getConfigurationController
}