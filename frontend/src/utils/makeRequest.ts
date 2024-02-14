import axios, { AxiosRequestConfig, AxiosError } from 'axios'
import { env } from "@/env"
import { useAuthStore } from '@/store/auth'
import { RefreshToken } from '@/@types/Auth'

axios.defaults.baseURL = env.VITE_BACKEND_URL

axios.interceptors.response.use(response => response, async error => {
  if (error.response.status === 401) {
    const response = await axios.post<RefreshToken>('/users/refresh-token', {
      refresh_token: useAuthStore.getState().refreshToken
    })

    if (response.status === 200) {
      const newToken = response.data.new_token
      const newRefreshToken = response.data.new_refresh_token

      useAuthStore.setState({ accessToken: newToken })
      useAuthStore.setState({ refreshToken: newRefreshToken })
      
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`

      return axios(error.config)
    }
  }

  return Promise.reject(error)
})

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
