import { AppError } from "../errors/AppError";
import { IMoviesRepository } from "../repositories/IMoviesRepository";

type DeleteMovieUseCaseDTO = {
  id: string
}

export class DeleteMovieUseCase {
  private moviesRepository: IMoviesRepository

  constructor(moviesRepository: IMoviesRepository) {
    this.moviesRepository = moviesRepository
  }

  async execute({ id }: DeleteMovieUseCaseDTO) {
    const movie = this.moviesRepository.findById({ id })
    if (!movie) {
      throw new AppError('Filme não encontrado', 404)
    }

    // TODO: check if there is a session with it

    await this.moviesRepository.delete({ id })
  }
}