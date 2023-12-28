import { PrismaUsersRepository } from "../../../repositories/prisma/PrismaUsersRepository";
import { CreateUserController } from "../CreateUserController";
import { CreateUserUseCase } from "../../../useCases/CreateUserUseCase";

export function makeCreateUserController(): CreateUserController {
    const usersRepository = new PrismaUsersRepository()

    const createUserUseCase = new CreateUserUseCase(usersRepository)

    const createUserController = new CreateUserController(createUserUseCase)

    return createUserController
}