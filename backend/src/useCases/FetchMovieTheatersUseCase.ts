import { IMovieTheatersRepository } from "../repositories/IMovieTheatersRepository";

export class FetchMovieTheatersUseCase {
  private movieTheatersRepository: IMovieTheatersRepository

  constructor(movieTheatersRepository: IMovieTheatersRepository) {
    this.movieTheatersRepository = movieTheatersRepository
  }

  async execute() {
    const movieTheaters = await this.movieTheatersRepository.getAll()

    return movieTheaters
  }
}