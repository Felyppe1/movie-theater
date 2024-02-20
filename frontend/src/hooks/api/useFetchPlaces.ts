import { Place } from "@/@types/Place"
import { fetchPlaces } from "@/api/places"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"


export function useFetchPlaces() {
  const [selectedState, setSelectedState] = useState({} as Place | undefined)

  const places = useQuery({
    queryKey: ['places'],
    queryFn: fetchPlaces
  })

  const handleStateChange = (value: string) => {
    setSelectedState(places?.data?.find(state => state.id == value))
  }

  return { places, handleStateChange, selectedState }
}