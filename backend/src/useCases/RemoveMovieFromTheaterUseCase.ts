import { IMovieTheatersRepository } from "../repositories/IMovieTheatersRepository";

export class RemoveMovieFromTheaterUseCase {
  private movieTheatersRepository: IMovieTheatersRepository

  constructor(movieTheatersRepository: IMovieTheatersRepository) {
    this.movieTheatersRepository = movieTheatersRepository
  }

  async execute(id: string, movieId: string) {
    // TODO: check if there is movie theater, movie, if movie is realyy added to theater and movie number
    const movieTheater = await this.movieTheatersRepository.removeMovie(id, movieId)

    return movieTheater
  }
}