import { MovieTheater } from "@prisma/client";
import { IMovieTheatersRepository } from "../repositories/IMovieTheatersRepository";
import { ICreateMovieTheaterDTO } from "./dtos/ICreateMovieTheaterDTO";
import { AppError } from "../errors/AppError";

export class CreateMovieTheaterUseCase {
  private movieTheatersRepository: IMovieTheatersRepository

  constructor(movieTheatersRepository: IMovieTheatersRepository) {
    this.movieTheatersRepository = movieTheatersRepository
  }

  async execute({ name, street, number, state_id, city_id }: ICreateMovieTheaterDTO) {
    const movieTheaterExists = await this.movieTheatersRepository.findByName(name)
    if (movieTheaterExists) {
      throw new AppError('Nome de cinema já existe', 409)
    }

    const movieTheater = await this.movieTheatersRepository.create({ name, street, number, state_id, city_id })
    
    return movieTheater
  }
}