import { AppError } from "../errors/AppError";
import { createRoomControllerBodySchema } from "../http/controllers/CreateRoomController";
import { IRoomsRepository } from "../repositories/IRoomsRepository";
import zod from 'zod'
import { convertSeatsToMatrix } from "../utils/convertSeatsToMatrix";

type CreateRoomUseCaseDTO = zod.infer<typeof createRoomControllerBodySchema>

export class CreateRoomUseCase {
  private roomsRepository: IRoomsRepository

  constructor(roomsRepository: IRoomsRepository) {
    this.roomsRepository = roomsRepository
  }

  async execute(data: CreateRoomUseCaseDTO) {
    const roomExists = await this.roomsRepository.findByNumberAndMovieTheater({
      number: data.number,
      movie_theater_id: data.movie_theater_id 
    })
    
    if (roomExists) {
      throw new AppError('Número da sala já cadastrado', 409)
    }

    // const newData = {
    //   number,
    //   movie_theater_id,
    //   technologyIds: Technology.map(technology => { return { id: technology } }),
    //   seats: Seat
    // }

    // await this.roomsRepository.create(newData)
    const room = await this.roomsRepository.create(data)

    const alteredRoom = {
      ...room,
      seats: convertSeatsToMatrix(room.seats)
    }

    return alteredRoom
  }
}