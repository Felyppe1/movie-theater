import { env } from "@/env"

export const fetchTechnologies = async () => {
  const response = await fetch(`${env.VITE_BACKEND_URL}/technologies`, { method: 'GET' })

  if (!response.ok) {
    throw new Error('Algo deu errado')
  }

  return response.json()
}