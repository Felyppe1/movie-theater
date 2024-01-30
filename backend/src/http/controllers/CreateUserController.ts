import { Request, Response } from "express";
import { CreateUserUseCase } from "../../useCases/CreateUserUseCase";
import zod from 'zod'

const cellphoneScheme = zod.object({
  ddd: zod.string().length(2),
  number: zod.string().min(8)
})

export const createUserControllerBodyScheme = zod.object({
  email: zod.string().min(1),
  password: zod.string().min(1),
  full_name: zod.string().min(1),
  social_name: zod.string().optional(),
  cpf: zod.string().length(11),
  sex: zod.enum(['M', 'F']),
  date_of_birth: zod.coerce.date(),
  cellphone: cellphoneScheme,
  city_id: zod.string().min(1),
  state_id: zod.string().min(1)
})


export class CreateUserController {
  private createUserUseCase: CreateUserUseCase

  constructor(createUserUseCase: CreateUserUseCase) {
      this.createUserUseCase = createUserUseCase
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const body = createUserControllerBodyScheme.parse(request.body)

    const user = await this.createUserUseCase.execute(body)

    return response.status(201).json(user)
  }
}