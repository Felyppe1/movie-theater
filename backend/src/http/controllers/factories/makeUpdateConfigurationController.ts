import { PrismaConfigurationsRepository } from "../../../repositories/prisma/PrismaConfigurationsRepository";
import { UpdateConfigurationUseCase } from "../../../useCases/UpdateConfigurationUseCase";
import { UpdateConfigurationController } from "../UpdateConfigurationController";

export function makeUpdateConfigurationController() {
  const configurationsRepository = new PrismaConfigurationsRepository()

  const updateConfigurationUseCase = new UpdateConfigurationUseCase(configurationsRepository)

  const updateConfigurationController = new UpdateConfigurationController(updateConfigurationUseCase)

  return updateConfigurationController
}