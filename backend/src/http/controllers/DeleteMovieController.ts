import { Request, Response } from "express";
import { DeleteMovieUseCase } from "../../useCases/DeleteMovieUseCase";
import zod from 'zod'

export const deleteMovieControllerParamsSchema = zod.object({
  id: zod.string().min(1)
})


export class DeleteMovieController {
  private deleteMovieUseCase: DeleteMovieUseCase

  constructor(deleteMovieUseCase: DeleteMovieUseCase) {
    this.deleteMovieUseCase = deleteMovieUseCase
  }

  async handle(request: Request, response: Response) {
    const params = deleteMovieControllerParamsSchema.parse(request.params)

    await this.deleteMovieUseCase.execute(params)

    return response.status(204).send()
  }
}