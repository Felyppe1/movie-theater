import { Request, Response } from "express"
import { CreateRoomUseCase } from "../../useCases/CreateRoomUseCase"
import zod from 'zod'

const seatValidationSchema = zod.object({
  row: zod.string().min(1),
  column: zod.string().min(1),
  exists: zod.boolean(),
  type: zod.string().min(1)
})

const createRoomRequestValidationSchema = zod.object({
  number: zod.string().min(1),
  movie_theater_id: zod.string().min(1),
  Technology: zod.array(zod.string().min(1)),
  Seat: zod.array(seatValidationSchema)
})

export type ICreateRoomRequestDTO = zod.infer<typeof createRoomRequestValidationSchema>

export class CreateRoomController {
  private createRoomUseCase: CreateRoomUseCase

  constructor(createRoomController: CreateRoomUseCase) {
    this.createRoomUseCase = createRoomController
  }

  async handle(request: Request, response: Response) {
    const data = request.body as ICreateRoomRequestDTO

    createRoomRequestValidationSchema.parse(data)

    await this.createRoomUseCase.execute(data)

    return response.sendStatus(201)
  }
}