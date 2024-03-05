import { describe, expect, it } from "vitest";
import { InMemoryUserTokensRepository } from "../repositories/inMemory/InMemoryUserTokensRepository";
import { LogoutUseCase } from "./LogoutUseCase";
import { sign } from "jsonwebtoken";
import { env } from "../env";
import { AppError } from "../errors/AppError";

describe('Logout use case', () => {
  it('should be able to logout of account', async () => {
    const userTokensRepository = new InMemoryUserTokensRepository()
    const logoutUseCase = new LogoutUseCase(userTokensRepository)
    
    const refresh_token = sign(
      {},
      env.SECRET_REFRESH_TOKEN,
      {
        subject: 'abcdef',
        expiresIn: env.REFRESH_TOKEN_EXPIRES_IN
      }
    )

    const expiresDate = new Date()
    expiresDate.setDate(expiresDate.getDate() + 30)
    
    await userTokensRepository.create({
      expires_date: expiresDate,
      refresh_token,
      user_id: 'abcdef'
    })

    const deletedUserToken = await logoutUseCase.execute({
      refresh_token
    })

    expect(deletedUserToken).toBeUndefined()
  })

  it('should not be able to logout of account', async () => {
    const userTokensRepository = new InMemoryUserTokensRepository()
    const logoutUseCase = new LogoutUseCase(userTokensRepository)
    
    const refresh_token = sign(
      {},
      env.SECRET_REFRESH_TOKEN,
      {
        subject: 'abcdef',
        expiresIn: env.REFRESH_TOKEN_EXPIRES_IN
      }
    )

    expect(() =>
      logoutUseCase.execute({
        refresh_token
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})