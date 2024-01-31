import { fetchPlaces } from "@/api/places"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

type City = {
  id: string
  name: string
}

type StatesProps = {
  id: string
  name: string
  cities: City[]
}

export function useFetchPlaces() {
  const [selectedState, setSelectedState] = useState({} as StatesProps | undefined)

  const places = useQuery<StatesProps[]>({
    queryKey: ['places'],
    queryFn: fetchPlaces
  })

  const handleStateChange = (value: string) => {
    setSelectedState(places?.data?.find(state => state.id == value))
  }

  return { places, handleStateChange, selectedState }
}