import { IMoviesRepository } from "../repositories/IMoviesRepository";

export class FetchMoviesUseCase {
  private moviesRepository: IMoviesRepository

  constructor(moviesRepository: IMoviesRepository) {
    this.moviesRepository = moviesRepository
  }

  async execute() {
    const movies = await this.moviesRepository.getAll()

    return movies
  }
}