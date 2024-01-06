import { IMoviesRepository } from "../repositories/IMoviesRepository";

export class FetchMovieTmdbIdsUseCase {
  private moviesRepository: IMoviesRepository

  constructor(moviesRepository: IMoviesRepository) {
    this.moviesRepository = moviesRepository
  }

  async execute() {
    const movies = await this.moviesRepository.getAll()

    const movieTmdbIds = movies?.flatMap(movie => movie.tmdb_id)

    return movieTmdbIds
  }
}