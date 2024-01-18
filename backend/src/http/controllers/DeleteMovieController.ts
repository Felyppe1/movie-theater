import { Request, Response } from "express";
import { DeleteMovieUseCase } from "../../useCases/DeleteMovieUseCase";

export class DeleteMovieController {
  private deleteMovieUseCase: DeleteMovieUseCase

  constructor(deleteMovieUseCase: DeleteMovieUseCase) {
    this.deleteMovieUseCase = deleteMovieUseCase
  }

  async handle(request: Request, response: Response) {
    const { id } = request.params

    await this.deleteMovieUseCase.execute({ id })

    return response.status(204).send()
  }
}