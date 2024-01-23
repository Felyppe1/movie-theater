import { MovieTheater } from "@/@types/MovieTheater";
import { Room } from "@/@types/Room";
import { getMovieTheater } from "@/api/movieTheaters";
import { useQuery } from "@tanstack/react-query";

type MovieTheaterProps = MovieTheater & {
  Room: Room[]
}

type UseGetMovieTheaterProps = Pick<MovieTheater, 'id'>

export function useGetMovieTheater({ id }: UseGetMovieTheaterProps) {
  return useQuery<MovieTheaterProps>({
    queryKey: ['movieTheater', id],
    queryFn: getMovieTheater,
    retry: false
  })
}