export type TmdbMovie = {
  id: number
  title: string
  original_title: string
  overview: string
  genre_ids: number[]
  poster_path: string
  release_date: string
  original_language: string
}

export type TmdbMovieDetails = {
  id: number
  imdb_id: number
  title: string
  original_title: string
  overview: string
  runtime: number
  genres: {
    id: number
    name: string
  }[]
  poster_path: string
  release_date: string
  original_language: string
}