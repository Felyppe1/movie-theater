import { Request, Response } from "express";
import { GetRoomUseCase } from "../../useCases/GetRoomUseCase";


export class GetRoomController {
  private getRoomUseCase: GetRoomUseCase

  constructor(getRoomUseCase: GetRoomUseCase) {
    this.getRoomUseCase = getRoomUseCase
  }

  async handle(request: Request, response: Response) {
    const { id } = request.params

    const room = await this.getRoomUseCase.execute({ id })
    
    return response.status(200).json(room)
  }
}