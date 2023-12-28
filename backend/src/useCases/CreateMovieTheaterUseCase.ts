import { MovieTheater } from "@prisma/client";
import { IMovieTheatersRepository } from "../repositories/IMovieTheatersRepository";
import { ICreateMovieTheaterDTO } from "./dtos/ICreateMovieTheaterDTO";

export class CreateMovieTheaterUseCase {
  private movieTheatersRepository: IMovieTheatersRepository

  constructor(movieTheatersRepository: IMovieTheatersRepository) {
    this.movieTheatersRepository = movieTheatersRepository
  }

  async execute({ name, street, number, state_id, city_id }: ICreateMovieTheaterDTO) {
    const movieTheater = await this.movieTheatersRepository.create({ name, street, number, state_id, city_id })
    
    return movieTheater
  }
}