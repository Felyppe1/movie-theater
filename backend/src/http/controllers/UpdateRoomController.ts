import { Request, Response } from "express";
import { UpdateRoomUseCase } from "../../useCases/UpdateRoomUseCase";
import zod from 'zod'

const seatValidationSchema = zod.object({
  row: zod.string().min(1),
  column: zod.string().min(1),
  exists: zod.boolean(),
  type: zod.string().min(1)
})

const seatsRowSchema = zod.array(seatValidationSchema).min(1)

export const updateRoomControllerBodySchema = zod.object({
  number: zod.string().min(1).max(5),
  technologyIds: zod.array(zod.string().min(1)).min(1),
  seats: zod.array(seatsRowSchema).min(1),
  movie_theater_id: zod.string().min(1),
})


export class UpdateRoomController {
  private updateRoomUseCase: UpdateRoomUseCase

  constructor(updateRoomUseCase: UpdateRoomUseCase) {
    this.updateRoomUseCase = updateRoomUseCase
  }

  async handle(request: Request, response: Response) {
    const { id } = request.params
    const body = updateRoomControllerBodySchema.parse(request.body)
    
    const room = await this.updateRoomUseCase.execute({ id, ...body })

    return response.status(200).json(room)
  }
}