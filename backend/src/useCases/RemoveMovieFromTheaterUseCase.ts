import { IMovieTheatersRepository } from "../repositories/IMovieTheatersRepository";


type RemoveMovieFromTheaterUseCaseDTO = {
  id: string
  movieId: string
}

export class RemoveMovieFromTheaterUseCase {
  private movieTheatersRepository: IMovieTheatersRepository

  constructor(movieTheatersRepository: IMovieTheatersRepository) {
    this.movieTheatersRepository = movieTheatersRepository
  }

  async execute({ id, movieId }: RemoveMovieFromTheaterUseCaseDTO) {
    // TODO: check if there is movie theater, movie, if movie is realyy added to theater and movie number
    const movieTheater = await this.movieTheatersRepository.removeMovie({ id, movieId })

    return movieTheater
  }
}