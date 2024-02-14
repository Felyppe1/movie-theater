import { logout } from "@/api/users"
import { toast } from "@/components/ui/use-toast"
import { useAuthStore } from "@/store/auth"
import { useMutation } from "@tanstack/react-query"

export function useLogout() {
  const clearAuthStore = useAuthStore(state => state.clearAuthStore)
  
  const { mutate, status } = useMutation({
    mutationFn: logout,
    onSettled: () => {
      clearAuthStore()
      toast({ description: 'Você se desconectou', variant: 'success' })
    }
  })
  
  const handleLogout = () => {
    const refreshToken = useAuthStore.getState().refreshToken
    mutate({ refreshToken })
  }

  return { handleLogout, status }
}