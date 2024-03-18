import { Request, Response } from "express";
import { DeleteMovieTheaterUseCase } from "../../useCases/DeleteMovieTheaterUseCase";

export class DeleteMovieTheaterController {
  private deleteMovieTheaterUseCase: DeleteMovieTheaterUseCase

  constructor(deleteMovieTheaterUseCase: DeleteMovieTheaterUseCase) {
    this.deleteMovieTheaterUseCase = deleteMovieTheaterUseCase
  }
  
  async handle(request: Request, response: Response) {
    const { id } = request.params

    await this.deleteMovieTheaterUseCase.execute({ id })

    return response.status(204).send()
  }
}