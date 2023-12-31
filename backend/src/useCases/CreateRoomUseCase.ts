import { AppError } from "../errors/AppError";
import { ICreateRoomRequestDTO } from "../http/controllers/CreateRoomController";
import { IRoomsRepository } from "../repositories/IRoomsRepository";

export class CreateRoomUseCase {
  private roomsRepository: IRoomsRepository

  constructor(roomsRepository: IRoomsRepository) {
    this.roomsRepository = roomsRepository
  }

  async execute({ number, movie_theater_id, Technology, Seat }: ICreateRoomRequestDTO) {
    const roomExists = await this.roomsRepository.findByNumberAndMovieTheater(number, movie_theater_id)
    console.log(roomExists)
    
    if (roomExists) {
      throw new AppError('Número da sala já existe', 409)
    }

    const newData = {
      number,
      movie_theater_id,
      technologyIds: Technology.map(technology => { return { id: technology } }),
      seats: Seat
    }

    await this.roomsRepository.create(newData)
  }
}