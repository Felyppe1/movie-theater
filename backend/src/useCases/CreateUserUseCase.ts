import { AppError } from "../errors/AppError";
import { IUsersRepository } from "../repositories/IUsersRepository"
import zod from 'zod'
import { createUserControllerBodyScheme } from "../http/controllers/CreateUserController"
import { hash } from 'bcrypt'
import { ICellphonesRepository } from "../repositories/ICellphonesRepository";

type CreateUserUseCaseDTO = zod.infer<typeof createUserControllerBodyScheme>

export class CreateUserUseCase {
  private usersRepository: IUsersRepository
  private cellphonesRepository: ICellphonesRepository

  constructor(
    usersRepository: IUsersRepository, 
    cellphonesRepository: ICellphonesRepository
  ) {
    this.usersRepository = usersRepository
    this.cellphonesRepository = cellphonesRepository
  }

  async execute({ email, password, cellphone, ...data}: CreateUserUseCaseDTO) {
    const cellphoneExists = await this.cellphonesRepository.findByDDDAndNumber({
      ddd: cellphone.ddd,
      number: cellphone.number
    })
    if (cellphoneExists) {
      throw new AppError('Celular já cadastrado', 409)
    }

    const newCellphone = await this.cellphonesRepository.create({
      ddd: cellphone.ddd,
      number: cellphone.number
    })

    const normalized_email = email.toLowerCase()

    const userExists = await this.usersRepository.findByEmail({ email: normalized_email })
    if (userExists) {
      throw new AppError('Email já cadastrado', 409)
    }

    const password_hash = await hash(password, 6)

    const user = await this.usersRepository.create({
      ...data,
      cellphone_id: newCellphone.id,
      email: normalized_email, 
      password: password_hash,
    })

    return user
  }
}