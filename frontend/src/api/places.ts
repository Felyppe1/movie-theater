import { Place } from "@/@types/Place"
import { makeRequest } from "@/utils/makeRequest"

export async function fetchPlaces(): Promise<Place[]> {
  return makeRequest('/places', {
    method: 'GET'
  })
}