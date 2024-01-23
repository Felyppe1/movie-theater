import { getMovieTheater } from "@/api/movieTheaters";
import { useQuery } from "@tanstack/react-query";

type Room = {
  id: string
  number: string
  movie_theater_id: string
}

type MovieTheaterProps = {
  id: string
  name: string
  street: string
  number: string
  created_at: Date
  updated_at: Date
  state_id: string
  city_id: string
  Room: Room[]
}

type UseGetMovieTheaterProps = Pick<MovieTheaterProps, 'id'>

export function useGetMovieTheater({ id }: UseGetMovieTheaterProps) {
  return useQuery<MovieTheaterProps>({
    queryKey: ['movieTheater', id],
    queryFn: getMovieTheater,
    retry: false
  })
}