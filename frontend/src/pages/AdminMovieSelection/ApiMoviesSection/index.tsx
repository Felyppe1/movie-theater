import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { UpcomingMovies } from "./UpcomingMovies"
import { StreamingMovies } from "./StreamingMovies"
import { SearchMovies } from "./SearchMovies"


export function ApiMoviesSection() {
  const [upcomingMovies, setUpcomingMovies] = useState(false)
  
  return (
    <section className='pb-[3rem] border-b'>
      <h2 className='text-2xl font-semibold text-secondary-foreground py-[1rem]'>Filmes disponíveis</h2>
      <div className='flex gap-4'>
        <SearchMovies />
        <button onClick={() => setUpcomingMovies(state => !state)} className='flex items-center gap-1 p-1'>
          <Switch
            checked={upcomingMovies}
            tabIndex={-1}
          />
          <span>
            Em breve
          </span>
        </button>
      </div>
      {upcomingMovies ? <UpcomingMovies /> : <StreamingMovies />}
    </section>
  )
}