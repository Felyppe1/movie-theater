import { IMovieTheatersRepository } from "../repositories/IMovieTheatersRepository";

export class GetMovieTheaterUseCase {
  private movieTheatersRepository: IMovieTheatersRepository

  constructor(movieTheatersRepository: IMovieTheatersRepository) {
    this.movieTheatersRepository = movieTheatersRepository
  }

  async execute(id: string) {
    const movieTheater = await this.movieTheatersRepository.findById(id)
    
    return movieTheater
  }
}