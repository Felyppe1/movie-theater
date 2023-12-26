import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { z } from "zod";

export class CreateUserController {
    private createUserUseCase: CreateUserUseCase

    constructor(createUserUseCase: CreateUserUseCase) {
        this.createUserUseCase = createUserUseCase
    }

    async handle(request: Request, response: Response): Promise<Response> {
        const data = request.body

        await this.createUserUseCase.execute(data)

        return response.send(201)
    }
}