import { Request, Response } from "express";
import { CreateUserUseCase } from "../../useCases/CreateUserUseCase";

export class CreateUserController {
    private createUserUseCase: CreateUserUseCase

    constructor(createUserUseCase: CreateUserUseCase) {
        this.createUserUseCase = createUserUseCase
    }

    async handle(request: Request, response: Response): Promise<Response> {
        const data = request.body

        await this.createUserUseCase.execute(data)

        return response.sendStatus(201)
    }
}