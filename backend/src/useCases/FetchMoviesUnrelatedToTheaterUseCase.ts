import { IMoviesRepository } from "../repositories/IMoviesRepository";

type FetchMoviesUnrelatedToTheaterUseCaseDTO = {
  movieTheaterId: string
}

export class FetchMoviesUnrelatedToTheaterUseCase {
  private moviesRepository: IMoviesRepository

  constructor(moviesRepository: IMoviesRepository) {
    this.moviesRepository = moviesRepository
  }

  async execute({ movieTheaterId }: FetchMoviesUnrelatedToTheaterUseCaseDTO) {
    const movie = await this.moviesRepository.findManyUnrelatedToTheater({ movieTheaterId })
    
    return movie
  } 
}