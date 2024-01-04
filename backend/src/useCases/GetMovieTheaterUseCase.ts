import { AppError } from "../errors/AppError";
import { IMovieTheatersRepository } from "../repositories/IMovieTheatersRepository";

export class GetMovieTheaterUseCase {
  private movieTheatersRepository: IMovieTheatersRepository

  constructor(movieTheatersRepository: IMovieTheatersRepository) {
    this.movieTheatersRepository = movieTheatersRepository
  }

  async execute(id: string) {
    const movieTheater = await this.movieTheatersRepository.findById(id)
    if (!movieTheater) {
      throw new AppError('Cinema não encontrado', 409)
    }
    
    return movieTheater
  }
}