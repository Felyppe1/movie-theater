import { AdminMainHeader } from "@/components/ui/AdminMainHeader"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

type RoomProps = {
  name: string
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
  Room: RoomProps[]
}

export function AdminMovieTheaterDetail() {
  const [movieTheater, setMovieTheater] = useState({} as MovieTheaterProps)
  const { id } = useParams()

  useEffect(() => {
    fetch(`http://localhost:3333/movie-theaters/${id}`, {
      method: 'GET'
    })
      .then(response => {
        if (!response.ok) {
          throw (response.status)
        }
  
        return response.json()
      })
      .then(data => {
        setMovieTheater(data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])
  
  return (
    <>
      <AdminMainHeader h1='Cinemas' p={`Informações do cinema ${movieTheater?.name}`} />
      <h1>Cinema: {id}</h1>
    </>
  )
}