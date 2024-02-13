import axios, { AxiosRequestConfig, AxiosError } from 'axios'
import { env } from "@/env"

axios.defaults.baseURL = env.VITE_BACKEND_URL

export async function makeRequest(url: string, config: AxiosRequestConfig) {
  try {
    const response = await axios(url, config)

    if (response.status === 204) {
      return null
    }

    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 409 || error.response?.status === 404) {
        throw {
          message: error.response?.data.message,
          status: error.response?.status
        }
      }
  
      throw {
        message: 'Ocorreu um erro',
        status: error.response?.status
      }
    }
  }
}
