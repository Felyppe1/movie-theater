import { State } from "@prisma/client";
import { IStatesRepository } from "../repositories/IStatesRepository";

export class FetchPlacesUseCase {
  private statesRepository: IStatesRepository

  constructor(statesRepository: IStatesRepository) {
    this.statesRepository = statesRepository
  }

  async execute(): Promise<State[]> {
    const states = await this.statesRepository.getAll()

    return states
  }
}