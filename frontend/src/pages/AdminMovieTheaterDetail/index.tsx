import { useParams } from "react-router-dom"

export function AdminMovieTheaterDetail() {
  const { id } = useParams()
  
  return (
    <h1>Cinema: {id}</h1>
  )
}