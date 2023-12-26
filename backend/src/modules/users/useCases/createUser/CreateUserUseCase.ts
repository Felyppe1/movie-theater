import { prisma } from "../../../../lib/prisma";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

export class CreateUserUseCase {
    private usersRepository: IUsersRepository

    constructor(usersRepository: IUsersRepository) {
        this.usersRepository = usersRepository
    }

    async execute({ 
        email, 
        password, 
        full_name, 
        social_name, 
        sex, 
        // cellphone, 
        cpf, 
        date_of_birth, 
        state, 
        city 
    }: ICreateUserDTO): Promise<void> {
        const normalized_email = email.toLowerCase()
        const userExists = await this.usersRepository.findByEmail(normalized_email)

        if (userExists) {
            throw new Error('User already exists')
        }

        await this.usersRepository.create({
            email: normalized_email,
            password_hash: password,
            full_name,
            social_name,
            sex,
            // cellphone,
            cpf,
            date_of_birth,
            state,
            city
        })
    }
}