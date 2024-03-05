import { describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "../repositories/inMemory/InMemoryUsersRepository";
import { InMemoryUserTokensRepository } from "../repositories/inMemory/InMemoryUserTokensRepository";
import { LoginUseCase } from "./LoginUseCase";
import { InMemoryCellphonesRepository } from "../repositories/inMemory/InMemoryCellphonesRepository";
import { hash } from "bcrypt";
import { AppError } from "../errors/AppError";

describe('Login use case', () => {
  it('should be able to login into account', async () => {
    const cellphonesRepository = new InMemoryCellphonesRepository()
    const usersRepository = new InMemoryUsersRepository()
    const userTokensRepository = new InMemoryUserTokensRepository()
    const loginUseCase = new LoginUseCase(usersRepository, userTokensRepository)
    
    const cellphone = await cellphonesRepository.create({
      ddd: "21",
      number: "988887777"
    })

    await usersRepository.create({
      email: "teste@gmail.com",
      password: await hash("123456789", 6),
      full_name: "Nome Teste",
      social_name: null,
      cpf: "11122233344",
      sex: "M",
      date_of_birth: new Date(),
      cellphone_id: cellphone.id,
      state_id: "abcdef",
      city_id: "abcdef"
    })

    const loginData = {
      email: "teste@gmail.com",
      password: "123456789"
    }

    const auth = await loginUseCase.execute(loginData)

    expect(auth).toHaveProperty('token')
  })

  it('should not be able to login into account with wrong email', async () => {
    const cellphonesRepository = new InMemoryCellphonesRepository()
    const usersRepository = new InMemoryUsersRepository()
    const userTokensRepository = new InMemoryUserTokensRepository()
    const loginUseCase = new LoginUseCase(usersRepository, userTokensRepository)
    
    const cellphone = await cellphonesRepository.create({
      ddd: "21",
      number: "988887777"
    })

    await usersRepository.create({
      email: "teste@gmail.com",
      password: await hash("123456789", 6),
      full_name: "Nome Teste",
      social_name: null,
      cpf: "11122233344",
      sex: "M",
      date_of_birth: new Date(),
      cellphone_id: cellphone.id,
      state_id: "abcdef",
      city_id: "abcdef"
    })

    const loginData = {
      email: "errado@gmail.com",
      password: "123456789"
    }

    expect(() => 
      loginUseCase.execute(loginData)
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to login into account with wrong password', async () => {
    const cellphonesRepository = new InMemoryCellphonesRepository()
    const usersRepository = new InMemoryUsersRepository()
    const userTokensRepository = new InMemoryUserTokensRepository()
    const loginUseCase = new LoginUseCase(usersRepository, userTokensRepository)
    
    const cellphone = await cellphonesRepository.create({
      ddd: "21",
      number: "988887777"
    })

    await usersRepository.create({
      email: "teste@gmail.com",
      password: await hash("123456789", 6),
      full_name: "Nome Teste",
      social_name: null,
      cpf: "11122233344",
      sex: "M",
      date_of_birth: new Date(),
      cellphone_id: cellphone.id,
      state_id: "abcdef",
      city_id: "abcdef"
    })

    const loginData = {
      email: "teste@gmail.com",
      password: "111122223"
    }

    expect(() => 
      loginUseCase.execute(loginData)
    ).rejects.toBeInstanceOf(AppError)
  })
})