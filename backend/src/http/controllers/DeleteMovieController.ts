import { Request, Response } from "express";
import { DeleteMovieUseCase } from "../../useCases/DeleteMovieUseCase";
import zod from 'zod'

const deleteMovieParamsRequestValidationSchema = zod.object({
  id: zod.string().min(1)
})
export type DeleteMovieParamsRequestDTO = zod.infer<typeof deleteMovieParamsRequestValidationSchema>

export class DeleteMovieController {
  private deleteMovieUseCase: DeleteMovieUseCase

  constructor(deleteMovieUseCase: DeleteMovieUseCase) {
    this.deleteMovieUseCase = deleteMovieUseCase
  }

  async handle(request: Request, response: Response) {
    const params = request.params as DeleteMovieParamsRequestDTO

    deleteMovieParamsRequestValidationSchema.parse(params)

    await this.deleteMovieUseCase.execute(params)

    return response.status(204).send()
  }
}