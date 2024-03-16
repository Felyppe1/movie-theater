import { Request, Response } from "express";
import { UpdateConfigurationUseCase } from "../../useCases/UpdateConfigurationUseCase";
import zod from 'zod'

export const updateConfigurationControllerBodySchema = zod.object({
  admin_accessible: zod.boolean()
})

export class UpdateConfigurationController {
  private updateConfigurationUseCase: UpdateConfigurationUseCase

  constructor(updateConfigurationUseCase: UpdateConfigurationUseCase) {
    this.updateConfigurationUseCase = updateConfigurationUseCase
  }

  async handle(request: Request, response: Response) {
    const body = updateConfigurationControllerBodySchema.parse(request.body)

    const configuration = await this.updateConfigurationUseCase.execute(body)
    
    return response.json(configuration)
  }
}