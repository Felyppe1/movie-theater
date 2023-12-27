import { prisma } from "../../../../lib/prisma";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

export class CreateUserUseCase {
    private usersRepository: IUsersRepository

    constructor(usersRepository: IUsersRepository) {
        this.usersRepository = usersRepository
    }

    async execute({ email, password, full_name, social_name, cpf, sex, date_of_birth, cellphone, state_id, city_id }: ICreateUserDTO): Promise<void> {
        const normalized_email = email.toLowerCase()

        const userExists = await this.usersRepository.findByEmail(normalized_email)
        if (userExists) {
            throw new Error('User already exists')
        }

        const cellphone_ddd = cellphone.substring(0, 2)
        const cellphone_number = cellphone.substring(2)
        
        await this.usersRepository.create({
            email: normalized_email,
            password_hash: password,
            full_name,
            social_name,
            cpf,
            sex,
            date_of_birth,
            cellphone: {
                create: {
                    ddd: cellphone_ddd,
                    number: cellphone_number
                }
            },
            city: {
                connect: {
                    id: city_id
                }
            },
            state: {
                connect: {
                    id: state_id
                }
            }
        })
    }
}