import { getConfiguration } from "@/api/configurations"
import { getRefreshToken } from "@/api/users"
import { useAuthStore } from "@/store/auth"
import { useConfigurationStore } from "@/store/configuration"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useEffect } from "react"

export function useAppDependencies() {
  const refreshToken = useAuthStore(state => state.refreshToken)
  const clearAuthStore = useAuthStore(state => state.clearAuthStore)

  const configuration = useQuery({
    queryKey: ['configuration'],
    queryFn: getConfiguration
  })

  const userRefreshToken = useMutation({
    mutationFn: getRefreshToken,
    onError: () => {
      clearAuthStore()
    },
    onSuccess: (response) => {
      useAuthStore.setState({ accessToken: response.new_token })
      useAuthStore.setState({ refreshToken: response.new_refresh_token })
      useAuthStore.setState({ user: response.user})
    }
  })

  useEffect(() => {
    useConfigurationStore.setState({ configuration: configuration.data })
  }, [configuration.data])

  useEffect(() => {
    if (!refreshToken) {
      clearAuthStore()
    }

    return () => {
      if (refreshToken) userRefreshToken.mutate({ refresh_token: refreshToken })
    }
  }, [])

  const isLoading = userRefreshToken.status == 'pending' || configuration.status === 'pending'
  
  return { isLoading }
}