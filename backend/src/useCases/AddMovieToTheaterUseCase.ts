import { IMovieTheatersRepository } from "../repositories/IMovieTheatersRepository";
import { addMovieToTheaterControllerBodySchema } from "../http/controllers/AddMovieToTheaterController";
import zod from 'zod'

type AddMovieToTheaterUseCaseDTO = (
  zod.infer<typeof addMovieToTheaterControllerBodySchema> & {
    id: string
  }
)

export class AddMovieToTheaterUseCase {
  private movieTheatersRepository: IMovieTheatersRepository

  constructor(movieTheatersRepository: IMovieTheatersRepository) {
    this.movieTheatersRepository = movieTheatersRepository
  }

  async execute({ id, movieId }: AddMovieToTheaterUseCaseDTO) {
    // TODO: check if there is movie theater, movie, if movie isn't already added to theater and movie number
    const movieTheater = await this.movieTheatersRepository.addMovie({ id, movieId })

    return movieTheater
  }
}