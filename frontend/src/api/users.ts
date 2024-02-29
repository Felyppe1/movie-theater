import { Cellphone } from "@/@types/Cellphone";
import { RefreshTokenAdditional, User } from "@/@types/User";
import { makeRequest } from "@/utils/makeRequest";


type SignupProps = Omit<User, 'id' | 'role' | 'cellphone_id' | 'created_at'> & {
  cellphone: Omit<Cellphone, 'id'>
}

type LoginProps = Pick<User, 'email' | 'password'>

type LoginResponse = {
  user: Pick<User, 'email' | 'role'>
  token: string
  refresh_token: string
}

type LogoutProps = {
  refreshToken: string | undefined
}

type GetRefreshTokenProps = {
  refresh_token: string | undefined
}

export async function signup(data: SignupProps): Promise<User> {
  return await makeRequest('/users/', {
    method: 'POST',
    data
  })
}

export async function login(data: LoginProps): Promise<LoginResponse> {
  return await makeRequest('/users/login', {
    method: 'POST',
    data
  })
}

export async function logout({ refreshToken }: LogoutProps) {
  return await makeRequest(`/users/logout/${refreshToken}`, {
    method: 'DELETE'
  })
}

export async function getRefreshToken(data: GetRefreshTokenProps): Promise<RefreshTokenAdditional> {
  return await makeRequest(`/users/refresh-token`, {
    method: 'POST',
    data
  })
}

