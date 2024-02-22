import { useAuthStore } from "@/store/auth"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { toast } from "../ui/use-toast"
import { ROLE } from "@/@types/User"

type RequireAuthProps = {
  allowedRoles?: ROLE[]
}

export function RequireAuth({ allowedRoles = [] }: RequireAuthProps) {
  const user = useAuthStore(state => state.user)

  const location = useLocation()
  
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