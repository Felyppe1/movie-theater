import { Technology } from "@/@types/Technology"
import { makeRequest } from "@/utils/makeRequest"

export const fetchTechnologies = async (): Promise<Technology[]> => {
  return await makeRequest('/technologies', { method: 'GET' })
}