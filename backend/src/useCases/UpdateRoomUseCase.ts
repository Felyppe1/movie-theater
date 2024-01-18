import { updateRoomControllerBodySchema } from "../http/controllers/UpdateRoomController";
import { IRoomsRepository } from "../repositories/IRoomsRepository";
import zod from 'zod'

type UpdateRoomUseCaseDTO = zod.infer<typeof updateRoomControllerBodySchema> & {
  id: string
}

export class UpdateRoomUseCase {
  private roomsRepository: IRoomsRepository

  constructor(roomsRepository: IRoomsRepository) {
    this.roomsRepository = roomsRepository
  }

  async execute(data: UpdateRoomUseCaseDTO) {
    const room = await this.roomsRepository.update(data)

    return room
  }
}