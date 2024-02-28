import { describe, it, expect } from 'vitest'
import { InMemoryUsersRepository } from '../repositories/inMemory/InMemoryUsersRepository'
import { CreateUserUseCase } from './CreateUserUseCase'
import { InMemoryCellphonesRepository } from '../repositories/inMemory/InMemoryCellphonesRepository'
import { AppError } from '../errors/AppError'
import { compare } from 'bcrypt'

describe('Create user use case', () => {
  it('should be able to create a user', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const cellphonesRepository = new InMemoryCellphonesRepository()
    const createUserUseCase = new CreateUserUseCase(usersRepository, cellphonesRepository)

    const user = await createUserUseCase.execute({
      email: "teste@gmail.com",
      password: "123456789",
      full_name: "Nome Teste",
      social_name: null,
      cpf: "11122233344",
      sex: "M",
      date_of_birth: new Date(),
      cellphone: {
        ddd: "21",
        number: "988887777"
      },
      state_id: "abcdef",
      city_id: "abcdef"
    })

    expect(user).toHaveProperty('id')
  })

  it('should not be able to create user with the same cellphone ddd and number', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const cellphonesRepository = new InMemoryCellphonesRepository()
    const createUserUseCase = new CreateUserUseCase(usersRepository, cellphonesRepository)
    
    const cellphone = {
      ddd: "21",
      number: "988887777"
    }

    await createUserUseCase.execute({
      email: "teste@gmail.com",
      password: "123456789",
      full_name: "Nome Teste",
      social_name: null,
      cpf: "11122233344",
      sex: "M",
      date_of_birth: new Date(),
      cellphone,
      state_id: "abcdef",
      city_id: "abcdef"
    })

    expect(() => 
      createUserUseCase.execute({
        email: "teste@gmail.com",
        password: "123456789",
        full_name: "Nome Teste",
        social_name: null,
        cpf: "11122233344",
        sex: "M",
        date_of_birth: new Date(),
        cellphone,
        state_id: "abcdef",
        city_id: "abcdef"
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create user with the same email', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const cellphonesRepository = new InMemoryCellphonesRepository()
    const createUserUseCase = new CreateUserUseCase(usersRepository, cellphonesRepository)

    const email = 'teste@gmail.com'

    await createUserUseCase.execute({
      email,
      password: "123456789",
      full_name: "Nome Teste",
      social_name: null,
      cpf: "11122233344",
      sex: "M",
      date_of_birth: new Date(),
      cellphone: {
        ddd: '21',
        number: '988887777'
      },
      state_id: "abcdef",
      city_id: "abcdef"
    })

    expect(() =>
      createUserUseCase.execute({
        email,
        password: "123456789",
        full_name: "Nome Teste",
        social_name: null,
        cpf: "11122233344",
        sex: "M",
        date_of_birth: new Date(),
        cellphone: {
          ddd: '21',
          number: '911112222'
        },
        state_id: "abcdef",
        city_id: "abcdef"
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should create user with password hashed', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const cellphonesRepository = new InMemoryCellphonesRepository()
    const createUserUseCase = new CreateUserUseCase(usersRepository, cellphonesRepository)

    const user = await createUserUseCase.execute({
      email: 'teste@gmail.com',
      password: "123456789",
      full_name: "Nome Teste",
      social_name: null,
      cpf: "11122233344",
      sex: "M",
      date_of_birth: new Date(),
      cellphone: {
        ddd: '21',
        number: '988887777'
      },
      state_id: "abcdef",
      city_id: "abcdef"
    })

    const isPasswordCorrectlyHashed = await compare('123456789', user.password)
    
    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})