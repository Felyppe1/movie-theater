import { Request, Response } from "express";
import { UpdateRoomUseCase } from "../../useCases/UpdateRoomUseCase";
import zod from 'zod'

const seatValidationSchema = zod.object({
  row: zod.string().min(1),
  column: zod.string().min(1),
  exists: zod.boolean(),
  type: zod.string().min(1)
})

const updateRoomBodyRequestValidationSchema = zod.object({
  number: zod.string().min(1).max(5),
  technologyIds: zod.array(zod.string().min(1)).min(1),
  seats: zod.array(seatValidationSchema).min(1),
  movie_theater_id: zod.string().min(1),
})
export type IUpdateRoomBodyRequestDTO = zod.infer<typeof updateRoomBodyRequestValidationSchema>

const updateRoomParamsRequestValidationSchema = zod.object({
  id: zod.string().min(1)
})
export type IUpdateRoomParamsRequestDTO = zod.infer<typeof updateRoomParamsRequestValidationSchema>


export class UpdateRoomController {
  private updateRoomUseCase: UpdateRoomUseCase

  constructor(updateRoomUseCase: UpdateRoomUseCase) {
    this.updateRoomUseCase = updateRoomUseCase
  }

  async handle(request: Request, response: Response) {
    const id = request.params as IUpdateRoomParamsRequestDTO
    const data = request.body as IUpdateRoomBodyRequestDTO

    updateRoomParamsRequestValidationSchema.parse(id)
    updateRoomBodyRequestValidationSchema.parse(data)
    
    await this.updateRoomUseCase.execute(id, data)

    return response.status(200).send()
  }
}