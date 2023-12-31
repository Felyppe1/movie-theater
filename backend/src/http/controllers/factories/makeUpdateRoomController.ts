import { PrismaRoomsRepository } from "../../../repositories/prisma/PrismaRoomsRepository"
import { UpdateRoomUseCase } from "../../../useCases/UpdateRoomUseCase"
import { UpdateRoomController } from "../UpdateRoomController"

export function makeUpdateRoomController(): UpdateRoomController {
  const roomsRepository = new PrismaRoomsRepository()

  const editRoomUseCase = new UpdateRoomUseCase(roomsRepository)

  const editRoomController = new UpdateRoomController(editRoomUseCase)

  return editRoomController
}