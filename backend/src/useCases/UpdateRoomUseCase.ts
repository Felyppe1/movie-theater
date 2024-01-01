import { IUpdateRoomBodyRequestDTO, IUpdateRoomParamsRequestDTO } from "../http/controllers/UpdateRoomController";
import { IRoomsRepository } from "../repositories/IRoomsRepository";

export class UpdateRoomUseCase {
  private roomsRepository: IRoomsRepository

  constructor(roomsRepository: IRoomsRepository) {
    this.roomsRepository = roomsRepository
  }

  async execute(
    { id }: IUpdateRoomParamsRequestDTO, 
    { number, seats, technologyIds, movie_theater_id }: IUpdateRoomBodyRequestDTO
  ) {
    const room = await this.roomsRepository.update({ number, seats, technologyIds, movie_theater_id, id })
  }
}