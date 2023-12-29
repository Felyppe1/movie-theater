import { ITechnologiesRepository } from "../repositories/ITechnologiesRepository";

export class FetchTechnologiesUseCase {
  private technologiesRepository: ITechnologiesRepository

  constructor(technologiesRepository: ITechnologiesRepository) {
    this.technologiesRepository = technologiesRepository
  }

  async execute() {
    const technologies = await this.technologiesRepository.getAll()

    return technologies
  }
}