import { AppError } from "../errors/AppError";
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
    const roomExists = await this.roomsRepository.findById({ id: data.id })
    if (!roomExists) {
      throw new AppError('Sala não encontrada', 404)
    }

    await this.roomsRepository.delete(data)
  }
}