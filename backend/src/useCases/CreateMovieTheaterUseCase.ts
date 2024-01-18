import { IMovieTheatersRepository } from "../repositories/IMovieTheatersRepository";
import { createMovieTheaterControllerBodySchema } from "../http/controllers/CreateMovieTheaterController";
import { AppError } from "../errors/AppError";
import zod from 'zod'

type CreateMovieTheaterUseCaseDTO = zod.infer<typeof createMovieTheaterControllerBodySchema>

export class CreateMovieTheaterUseCase {
  private movieTheatersRepository: IMovieTheatersRepository

  constructor(movieTheatersRepository: IMovieTheatersRepository) {
    this.movieTheatersRepository = movieTheatersRepository
  }

  async execute(data: CreateMovieTheaterUseCaseDTO) {
    const movieTheaterExists = await this.movieTheatersRepository.findByName({ name: data.name })
    if (movieTheaterExists) {
      throw new AppError('Nome de cinema já existe', 409)
    }

    const movieTheater = await this.movieTheatersRepository.create(data)
    
    return movieTheater
  }
}