import { deleteMovieControllerParamsSchema } from "../http/controllers/DeleteMovieController";
import { IMoviesRepository } from "../repositories/IMoviesRepository";
import zod from 'zod'

type DeleteMovieUseCaseDTO = zod.infer<typeof deleteMovieControllerParamsSchema>

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