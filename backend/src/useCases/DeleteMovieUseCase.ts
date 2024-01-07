import { DeleteMovieParamsRequestDTO } from "../http/controllers/DeleteMovieController";
import { IMoviesRepository } from "../repositories/IMoviesRepository";

export class DeleteMovieUseCase {
  private moviesRepository: IMoviesRepository

  constructor(moviesRepository: IMoviesRepository) {
    this.moviesRepository = moviesRepository
  }

  async execute({ id }: DeleteMovieParamsRequestDTO) {
    // TODO: check if there is a session with it

    await this.moviesRepository.delete(id)
  }
}