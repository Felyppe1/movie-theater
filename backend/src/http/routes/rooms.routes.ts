import { Router } from "express";
import { makeCreateRoomController } from "../controllers/factories/makeCreateRoomController";
import { makeGetRoomControoler } from "../controllers/factories/makeGetRoomController";

export const roomsRoutes = Router()

roomsRoutes.post('/', (request, response) => {
  return makeCreateRoomController().handle(request, response)
})

roomsRoutes.get('/:id', (request, response) => {
  return makeGetRoomControoler().handle(request, response)
})