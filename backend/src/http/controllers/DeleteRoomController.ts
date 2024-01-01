import { Request, Response } from "express"
import { DeleteRoomUseCase } from "../../useCases/DeleteRoomUseCase"
import zod from 'zod'


const deleteRoomParamsRequestValidationSchema = zod.object({
  id: zod.string().min(1)
})
type DeleteRoomParamsRequestDTO = zod.infer<typeof deleteRoomParamsRequestValidationSchema>

export class DeleteRoomController {
  private deleteRoomUseCase: DeleteRoomUseCase

  constructor(deleteRoomUseCase: DeleteRoomUseCase) {
    this.deleteRoomUseCase = deleteRoomUseCase
  }

  async handle(request: Request, response: Response){
    const params = request.params as DeleteRoomParamsRequestDTO

    deleteRoomParamsRequestValidationSchema.parse(params)
    
    await this.deleteRoomUseCase.execute(params.id)

    return response.sendStatus(204)
  }
}