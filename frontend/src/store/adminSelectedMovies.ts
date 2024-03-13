import { create } from "zustand"

interface State {
  tmdbMovieIds: Set<number>
  reset: () => void
}

export const useAdminTmdbMovieIdsStore = create<State>()(
  (set) => ({
    tmdbMovieIds: new Set(),
    reset: () => {
      set({ tmdbMovieIds: new Set() })
    }
  })
)