import { makeRequest } from "@/utils/makeRequest";

type LoginProps = {
  email: string
  password: string
}

type SignupProps = {
  date_of_birth: Date
  email: string
  password: string
  full_name: string
  cpf: string
  sex: "M" | "F"
  cellphone: {
      number: string
      ddd: string
  };
  city_id: string
  state_id: string
  social_name?: string
}

export async function login(data: LoginProps) {
  return await makeRequest('/users/login', {
    method: 'POST',
    data
  })
}

export async function signup(data: SignupProps) {
  return await makeRequest('/users/', {
    method: 'POST',
    data
  })
}