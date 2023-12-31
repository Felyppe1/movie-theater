import { PrismaRoomsRepository } from "../../../repositories/prisma/PrismaRoomsRepository";
import { GetRoomUseCase } from "../../../useCases/GetRoomUseCase";
import { GetRoomController } from "../GetRoomController";

export function makeGetRoomControoler(): GetRoomController {
  const roomsRepository = new PrismaRoomsRepository()

  const getRoomUseCase = new GetRoomUseCase(roomsRepository)

  const getRoomController = new GetRoomController(getRoomUseCase)

  return getRoomController
}