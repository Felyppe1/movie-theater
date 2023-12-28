import { MovieTheaterAddForm } from './useMovieTheaterAddForm'


export function useMovieTheaterAddFormSubmit() {
  function handleSubmit(data: MovieTheaterAddForm) {
    fetch('http://localhost:3333/movie-theaters', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (!response.ok) {
          throw (response.status)
        }

        return response.json()
      })
      .then(responseData => {
        console.log(responseData)
      })
      .catch(error => {
        console.log(error)
      })
  }
  
  return { handleSubmit }
}