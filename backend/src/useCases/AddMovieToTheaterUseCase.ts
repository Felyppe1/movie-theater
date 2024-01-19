import { IMovieTheatersRepository } from "../repositories/IMovieTheatersRepository";
import { addMovieToTheaterControllerBodySchema } from "../http/controllers/AddMovieToTheaterController";
import zod from 'zod'
import { AppError } from "../errors/AppError";
import { IMoviesRepository } from "../repositories/IMoviesRepository";

type AddMovieToTheaterUseCaseDTO = (
  zod.infer<typeof addMovieToTheaterControllerBodySchema> & {
    id: string
  }
)

export class AddMovieToTheaterUseCase {
  private movieTheatersRepository: IMovieTheatersRepository
  private moviesRepository: IMoviesRepository

  constructor(
    movieTheatersRepository: IMovieTheatersRepository,
    moviesRepository: IMoviesRepository
  ) {
    this.movieTheatersRepository = movieTheatersRepository
    this.moviesRepository = moviesRepository
  }

  async execute({ id, movieId }: AddMovieToTheaterUseCaseDTO) {
    const movieTheaterExists = await this.movieTheatersRepository.findById({ id })
    if (!movieTheaterExists) {
      throw new AppError('Cinema não encontrado', 404)
    }

    const movieExists = await this.moviesRepository.findById({ id: movieId })
    if (!movieExists) {
      throw new AppError('Filme não encontrado', 404)
    }

    const isMovieAlreadyRelatedToTheater = movieTheaterExists.movies?.some(movie => movie.id == movieId)
    if (isMovieAlreadyRelatedToTheater) {
      throw new AppError('Filme já pertence ao cinema', 409)
    }

    // TODO: check if there are avaiable movies

    const movieTheater = await this.movieTheatersRepository.addMovie({ id, movieId })

    return movieTheater
  }
}