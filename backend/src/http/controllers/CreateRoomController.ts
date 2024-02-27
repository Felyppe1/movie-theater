import { Request, Response } from "express"
import { CreateRoomUseCase } from "../../useCases/CreateRoomUseCase"
import zod from 'zod'

const seatValidationSchema = zod.object({
  row: zod.string().min(1),
  column: zod.string().min(1),
  exists: zod.boolean(),
  type: zod.string().min(1)
})

const seatsRowSchema = zod.array(seatValidationSchema).min(1)

export const createRoomControllerBodySchema = zod.object({
  number: zod.string().min(1),
  movie_theater_id: zod.string().min(1),
  technologyIds: zod.array(zod.string().min(1)),
  seats: zod.array(seatsRowSchema).min(1)
})

export class CreateRoomController {
  private createRoomUseCase: CreateRoomUseCase

  constructor(createRoomController: CreateRoomUseCase) {
    this.createRoomUseCase = createRoomController
  }

  async handle(request: Request, response: Response) {
    const body = createRoomControllerBodySchema.parse(request.body)

    const room = await this.createRoomUseCase.execute(body)

    return response.status(201).json(room)
  }
}