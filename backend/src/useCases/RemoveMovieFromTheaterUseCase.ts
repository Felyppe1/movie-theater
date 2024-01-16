import { removeMovieFromTheaterRequestBodySchema, removeMovieFromTheaterRequestParamsSchema } from "../http/controllers/RemoveMovieFromTheaterController";
import { IMovieTheatersRepository } from "../repositories/IMovieTheatersRepository";
import zod from 'zod'

type RemoveMovieFromTheaterUseCaseDTO = (
  zod.infer<typeof removeMovieFromTheaterRequestParamsSchema> &
  zod.infer<typeof removeMovieFromTheaterRequestBodySchema>
)

export class RemoveMovieFromTheaterUseCase {
  private movieTheatersRepository: IMovieTheatersRepository

  constructor(movieTheatersRepository: IMovieTheatersRepository) {
    this.movieTheatersRepository = movieTheatersRepository
  }

  async execute({ id, movieId }: RemoveMovieFromTheaterUseCaseDTO) {
    // TODO: check if there is movie theater, movie, if movie is realyy added to theater and movie number
    const movieTheater = await this.movieTheatersRepository.removeMovie(id, movieId)

    return movieTheater
  }
}