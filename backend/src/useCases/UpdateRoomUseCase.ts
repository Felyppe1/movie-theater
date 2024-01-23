import { AppError } from "../errors/AppError";
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
    const roomExists = await this.roomsRepository.findById({ id: data.id })
    if (!roomExists) {
      throw new AppError('Sala não encontrada', 404)
    }
    
    const roomWithSameNumber = await this.roomsRepository.findByNumberAndMovieTheater({
      movie_theater_id: data.movie_theater_id,
      number: data.number
    })
    if (roomWithSameNumber && roomWithSameNumber.id != data.id) {
      throw new AppError('Número da sala já cadastrado', 409)
    }

    const room = await this.roomsRepository.update(data)

    return room
  }
}