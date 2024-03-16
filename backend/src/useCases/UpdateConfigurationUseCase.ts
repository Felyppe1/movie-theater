import { Configuration } from "../@Types/Configuration";
import { updateConfigurationControllerBodySchema } from "../http/controllers/UpdateConfigurationController";
import { IConfigurationsRepository } from "../repositories/IConfigurationsRepository";
import zod from 'zod'

type UpdateConfigurationUseCaseDTO = zod.infer<typeof updateConfigurationControllerBodySchema>

export class UpdateConfigurationUseCase {
  private configurationsRepository: IConfigurationsRepository

  constructor(configurationsRepository: IConfigurationsRepository) {
    this.configurationsRepository = configurationsRepository
  }

  async execute(data: UpdateConfigurationUseCaseDTO) {
    const configuration = await this.configurationsRepository.update(data)

    return configuration[0]
  }
}