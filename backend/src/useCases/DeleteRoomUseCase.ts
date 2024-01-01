import { IRoomsRepository } from "../repositories/IRoomsRepository";

export class DeleteRoomUseCase {
  private roomsRepository: IRoomsRepository

  constructor(roomsRepository: IRoomsRepository) {
    this.roomsRepository = roomsRepository
  }

  async execute(id: string) {
    await this.roomsRepository.delete(id)
  }
}