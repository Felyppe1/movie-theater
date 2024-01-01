import { PrismaRoomsRepository } from "../../../repositories/prisma/PrismaRoomsRepository";
import { DeleteRoomUseCase } from "../../../useCases/DeleteRoomUseCase";
import { DeleteRoomController } from "../DeleteRoomController";

export function makeDeleteRoomController(): DeleteRoomController {
  const roomsRepository = new PrismaRoomsRepository()

  const deleteRoomUseCase = new DeleteRoomUseCase(roomsRepository)

  const deleteRoomController = new DeleteRoomController(deleteRoomUseCase)

  return deleteRoomController
}