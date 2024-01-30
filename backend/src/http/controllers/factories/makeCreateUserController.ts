import { PrismaUsersRepository } from "../../../repositories/prisma/PrismaUsersRepository";
import { CreateUserController } from "../CreateUserController";
import { CreateUserUseCase } from "../../../useCases/CreateUserUseCase";
import { PrismaCellphonesRepository } from "../../../repositories/prisma/PrismaCellphonesRepository";

export function makeCreateUserController(): CreateUserController {
    const usersRepository = new PrismaUsersRepository()
    const cellphonesRepository = new PrismaCellphonesRepository()

    const createUserUseCase = new CreateUserUseCase(usersRepository, cellphonesRepository)

    const createUserController = new CreateUserController(createUserUseCase)

    return createUserController
}