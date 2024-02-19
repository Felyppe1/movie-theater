import { fetchMovieTheaters } from "@/api/movieTheaters";
import { useQuery } from "@tanstack/react-query";

export function useFetchMovieTheaters() {
  return useQuery({
    queryKey: ['movieTheaters'],
    queryFn: fetchMovieTheaters
  })
}