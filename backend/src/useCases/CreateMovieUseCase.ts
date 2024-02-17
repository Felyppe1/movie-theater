import { createMovieControllerBodySchema } from "../http/controllers/CreateMovieController"
import { IMoviesRepository } from "../repositories/IMoviesRepository"
import { AppError } from "../errors/AppError";
import zod from 'zod'

type CreateMovieUseCaseDTO = zod.infer<typeof createMovieControllerBodySchema>

export class CreateMovieUseCase {
  private moviesRepository: IMoviesRepository

  constructor(moviesRepository: IMoviesRepository) {
    this.moviesRepository = moviesRepository
  }

  async execute(data: CreateMovieUseCaseDTO) {
    const movieExists = await this.moviesRepository.findByTmdbId({ tmdbId: data.tmdb_id })
    if (movieExists) {
      throw new AppError('Filme já cadastrado', 409)
    }

    const movie = await this.moviesRepository.create(data)

    return movie
  }
}