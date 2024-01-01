import { Router } from "express";
import { makeCreateRoomController } from "../controllers/factories/makeCreateRoomController";
import { makeGetRoomControoler } from "../controllers/factories/makeGetRoomController";
import { makeUpdateRoomController } from "../controllers/factories/makeUpdateRoomController";
import { makeDeleteRoomController } from "../controllers/factories/makeDeleteRoomController";

export const roomsRoutes = Router()

roomsRoutes.post('/', (request, response) => {
  return makeCreateRoomController().handle(request, response)
})

roomsRoutes.get('/:id', (request, response) => {
  return makeGetRoomControoler().handle(request, response)
})

roomsRoutes.put('/:id', (request, response) => {
  return makeUpdateRoomController().handle(request, response)
})

roomsRoutes.delete('/:id', (request, response) => {
  return makeDeleteRoomController().handle(request, response)
})