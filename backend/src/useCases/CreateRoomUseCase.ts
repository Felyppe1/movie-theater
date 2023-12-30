import { IRoomsRepository } from "../repositories/IRoomsRepository";
import { ITechnologiesRepository } from "../repositories/ITechnologiesRepository";
import { ICreateRoomRequestDTO } from "./dtos/ICreateRoomDTO";

export class CreateRoomUseCase {
  private roomsRepository: IRoomsRepository

  constructor(roomsRepository: IRoomsRepository) {
    this.roomsRepository = roomsRepository
  }

  async execute({ number, movie_theater_id, Technology, Seat }: ICreateRoomRequestDTO) {
    const newData = {
      number,
      movie_theater_id,
      technologyIds: Technology.map(technology => { return { id: technology } }),
      seats: Seat
    }

    await this.roomsRepository.create(newData)
  }
}