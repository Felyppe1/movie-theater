export async function makeRequest(url: string, config: RequestInit) {
  const response = await fetch(url, config)

  if (!response.ok) {
    if (response.status === 409 || response.status === 404) {
      const error = await response.json()
      throw new Error(error.message)
    }

    throw new Error('Ocorreu um erro')
  }

  if (response.status === 204) {
    return null
  }

  return response.json()
}