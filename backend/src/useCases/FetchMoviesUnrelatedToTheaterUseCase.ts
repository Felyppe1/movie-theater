import { AppError } from "../errors/AppError";
import { IMoviesRepository } from "../repositories/IMoviesRepository";

export class FetchMoviesUnrelatedToTheaterUseCase {
  private moviesRepository: IMoviesRepository

  constructor(moviesRepository: IMoviesRepository) {
    this.moviesRepository = moviesRepository
  }

  async execute(movieTheaterId: string) {
    const movie = await this.moviesRepository.findManyUnrelatedToTheater(movieTheaterId)
    
    return movie
  } 
}