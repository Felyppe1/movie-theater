import { env } from "@/env";
import { makeRequest } from "@/utils/makeRequest";

export async function fetchPlaces() {
  return makeRequest(`${env.VITE_BACKEND_URL}/places`, {
    method: 'GET'
  })
}