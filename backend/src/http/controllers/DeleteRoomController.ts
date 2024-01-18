import { Request, Response } from "express"
import { DeleteRoomUseCase } from "../../useCases/DeleteRoomUseCase"


export class DeleteRoomController {
  private deleteRoomUseCase: DeleteRoomUseCase

  constructor(deleteRoomUseCase: DeleteRoomUseCase) {
    this.deleteRoomUseCase = deleteRoomUseCase
  }

  async handle(request: Request, response: Response){
    const { id } = request.params
    
    await this.deleteRoomUseCase.execute({ id })

    return response.sendStatus(204)
  }
}