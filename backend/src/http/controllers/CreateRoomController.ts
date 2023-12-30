import { Request, Response } from "express"
import { CreateRoomUseCase } from "../../useCases/CreateRoomUseCase"

export class CreateRoomController {
  private createRoomUseCase: CreateRoomUseCase

  constructor(createRoomController: CreateRoomUseCase) {
    this.createRoomUseCase = createRoomController
  }

  async handle(request: Request, response: Response) {
    const data = request.body

    await this.createRoomUseCase.execute(data)

    return response.sendStatus(201)
  }
}