import { makeRequest } from "@/utils/makeRequest";

export async function fetchPlaces() {
  return makeRequest('/places', {
    method: 'GET'
  })
}