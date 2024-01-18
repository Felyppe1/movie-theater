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
    // TODO: check if there is a session with it

    await this.moviesRepository.delete({ id })
  }
}