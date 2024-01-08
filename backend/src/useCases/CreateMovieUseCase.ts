import { ICreateMovieRequestDTO } from "../http/controllers/CreateMovieController"
import { IMoviesRepository } from "../repositories/IMoviesRepository"

export class CreateMovieUseCase {
  private moviesRepository: IMoviesRepository

  constructor(moviesRepository: IMoviesRepository) {
    this.moviesRepository = moviesRepository
  }

  async execute({ tmdb_id, name, original_name, synopsis, genres, duration, poster_path, release_date, max_date, directors }: ICreateMovieRequestDTO) {
    const movie = await this.moviesRepository.findByTmdbId(tmdb_id)
    if (movie) {
      return
    }

    await this.moviesRepository.create({ tmdb_id, name, original_name, synopsis, genres, duration, poster_path, release_date, max_date, directors })
  }
}