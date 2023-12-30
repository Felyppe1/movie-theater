import { Router } from "express";
import { makeCreateRoomController } from "../controllers/factories/makeCreateRoomController";

export const roomsRoutes = Router()

roomsRoutes.post('/', (request, response) => {
  return makeCreateRoomController().handle(request, response)
})