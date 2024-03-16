import { useAuthStore } from "@/store/auth"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { toast } from "../ui/use-toast"
import { ROLE } from "@/@types/User"
import { useConfigurationStore } from "@/store/configuration"

type RequireAuthProps = {
  allowedRoles?: ROLE[]
  forceProtection?: boolean
}

export function RequireAuth({ allowedRoles = [], forceProtection = false }: RequireAuthProps) {
  const configuration = useConfigurationStore(state => state.configuration)
  const user = useAuthStore(state => state.user)
  
  const location = useLocation()
  
  if (!forceProtection) {
    if (configuration?.admin_accessible) return <Outlet />
  }
  
  if (allowedRoles.length > 0) {
    if (!user) {
      toast({ description: 'Você precisa estar logado', variant: 'destructive' })
      return <Navigate to='/login' state={{ from: location }} replace />
    }

    if (!allowedRoles.includes(user.role)) {
      toast({ description: 'Você não pode acessar essa página', variant: 'destructive' })
      return <Navigate to='/' replace />
    }

    return <Outlet />
  }

  if (user) {
    return <Outlet />
  }

  toast({ description: 'Você precisa estar logado', variant: 'destructive' })
  return <Navigate to='/login' state={{ from: location }} replace />
}