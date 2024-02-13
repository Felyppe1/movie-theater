import { makeRequest } from "@/utils/makeRequest"

export const fetchTechnologies = async () => {
  return await makeRequest('/technologies', { method: 'GET' })
}