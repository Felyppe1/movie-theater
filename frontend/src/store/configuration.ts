import { Configuration } from "@/@types/Configuration"
import { create } from "zustand"

interface State {
  configuration: Configuration | undefined
  setConfiguration: (data: Configuration | undefined) => void
}

export const useConfigurationStore = create<State>()(
  (set) => ({
    configuration: undefined,
    setConfiguration: (configuration) => {
      set({ configuration })
    }
  })
)