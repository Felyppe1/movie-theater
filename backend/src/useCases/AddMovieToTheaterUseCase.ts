import { IMovieTheatersRepository } from "../repositories/IMovieTheatersRepository";

export class AddMovieToTheaterUseCase {
  private movieTheatersRepository: IMovieTheatersRepository

  constructor(movieTheatersRepository: IMovieTheatersRepository) {
    this.movieTheatersRepository = movieTheatersRepository
  }

  async execute(id: string, movieId: string) {
    // TODO: check if there is movie theater, movie, if movie isn't already added to theater and movie number
    const movieTheater = await this.movieTheatersRepository.addMovie(id, movieId)

    return movieTheater
  }
}