import { AppError } from "../errors/AppError";
import { IRoomsRepository } from "../repositories/IRoomsRepository";
import { convertSeatsToMatrix } from "../utils/convertSeatsToMatrix";

type GetRoomUseCaseDTO = {
  id: string
}

export class GetRoomUseCase {
  private roomsRepository: IRoomsRepository

  constructor(roomsRepository: IRoomsRepository) {
    this.roomsRepository = roomsRepository
  }

  async execute({ id }: GetRoomUseCaseDTO) {
    const room = await this.roomsRepository.findById({ id })
    if (!room) {
      throw new AppError('Sala não encontrada', 404)
    }

    const alteredRoom = {
      ...room,
      seats: convertSeatsToMatrix(room.seats)
    }

    return alteredRoom
  }
}