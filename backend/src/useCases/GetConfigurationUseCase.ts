import { IConfigurationsRepository } from "../repositories/IConfigurationsRepository";

export class GetConfigurationUseCase {
  private configurationsRepository: IConfigurationsRepository

  constructor(configurationsRepository: IConfigurationsRepository) {
    this.configurationsRepository = configurationsRepository
  }

  async execute() {
    const configurations = await this.configurationsRepository.getAll()
    
    return configurations[0]
  }
}