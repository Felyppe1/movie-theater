import { env } from "@/env"
import { makeRequest } from "@/utils/makeRequest"

export const fetchTechnologies = async () => {
  return await makeRequest(`${env.VITE_BACKEND_URL}/technologies`, { method: 'GET' })
}