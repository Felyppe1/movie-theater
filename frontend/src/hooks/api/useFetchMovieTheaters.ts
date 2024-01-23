import { fetchMovieTheaters } from "@/api/movieTheaters";
import { useQuery } from "@tanstack/react-query";

type MovieTheaterProps = {
  id: string
  name: string
  number: string
  street: string
  updated_at: Date
}

export function useFetchMovieTheaters() {
  return useQuery<MovieTheaterProps[]>({
    queryKey: ['movieTheaters'],
    queryFn: fetchMovieTheaters
  })
}