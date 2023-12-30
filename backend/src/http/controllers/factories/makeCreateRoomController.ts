import { PrismaRoomsRepository } from "../../../repositories/prisma/PrismaRoomsRepository";
import { CreateRoomUseCase } from "../../../useCases/CreateRoomUseCase";
import { CreateRoomController } from "../CreateRoomController";

export function makeCreateRoomController(): CreateRoomController {
  const roomsRepository = new PrismaRoomsRepository()

  const createRoomUseCase = new CreateRoomUseCase(roomsRepository)

  const createRoomController = new CreateRoomController(createRoomUseCase)

  return createRoomController
}