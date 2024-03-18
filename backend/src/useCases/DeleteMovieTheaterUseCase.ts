import { MovieTheater } from "../@Types/MovieTheater";
import { AppError } from "../errors/AppError";
import { IMovieTheatersRepository } from "../repositories/IMovieTheatersRepository";

type DeleteMovieTheaterUseCaseDTO = Pick<MovieTheater, 'id'>

export class DeleteMovieTheaterUseCase {
  private movieTheatersRepository: IMovieTheatersRepository

  constructor(movieTheatersRepository: IMovieTheatersRepository) {
    this.movieTheatersRepository = movieTheatersRepository
  }
  
  async execute({ id }: DeleteMovieTheaterUseCaseDTO) {
    const movieTheater = await this.movieTheatersRepository.findById({ id })
    if (!movieTheater) {
      throw new AppError('Cinema não encontrado', 404)
    }

    await this.movieTheatersRepository.delete({ id })
  }
}