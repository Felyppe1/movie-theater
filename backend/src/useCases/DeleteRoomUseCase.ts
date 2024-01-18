import { IRoomsRepository } from "../repositories/IRoomsRepository";

type DeleteRoomUseCaseDTO = {
  id: string
}

export class DeleteRoomUseCase {
  private roomsRepository: IRoomsRepository

  constructor(roomsRepository: IRoomsRepository) {
    this.roomsRepository = roomsRepository
  }

  async execute(data: DeleteRoomUseCaseDTO) {
    await this.roomsRepository.delete(data)
  }
}