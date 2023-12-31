import { Request, Response } from "express";
import { GetRoomUseCase } from "../../useCases/GetRoomUseCase";
import zod from 'zod'

const getRoomRequestValidationSchema = zod.object({
  id: zod.string().min(1),
})

export type IGetRoomRequestDTO = zod.infer<typeof getRoomRequestValidationSchema>

export class GetRoomController {
  private getRoomUseCase: GetRoomUseCase

  constructor(getRoomUseCase: GetRoomUseCase) {
    this.getRoomUseCase = getRoomUseCase
  }

  async handle(request: Request, response: Response) {
    const id = request.params as IGetRoomRequestDTO

    getRoomRequestValidationSchema.parse(id)

    const room = await this.getRoomUseCase.execute(id)
    
    return response.status(200).json(room)
  }
}