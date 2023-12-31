import { IGetRoomRequestDTO } from "../http/controllers/GetRoomController";
import { IRoomsRepository } from "../repositories/IRoomsRepository";

export class GetRoomUseCase {
  private roomsRepository: IRoomsRepository

  constructor(roomsRepository: IRoomsRepository) {
    this.roomsRepository = roomsRepository
  }

  async execute({ id }: IGetRoomRequestDTO) {
    const room = await this.roomsRepository.findById(id)
    
    return room
  }
}