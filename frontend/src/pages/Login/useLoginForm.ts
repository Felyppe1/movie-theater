import { login } from '@/api/users'
import { toast } from '@/components/ui/use-toast'
import { useAuthStore } from '@/store/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import zod from 'zod'

const loginFormScheme = zod.object({
  email: zod.string().min(1),
  password: zod.string().min(1)
})
export type LoginFormProps = zod.infer<typeof loginFormScheme>

export function useLoginForm() {
  const form = useForm<LoginFormProps>({
    resolver: zodResolver(loginFormScheme),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const { setUser, setAccessToken, setRefreshToken } = useAuthStore()
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setUser(data.user)
      setAccessToken(data.token)
      setRefreshToken(data.refresh_token)
      toast({ description: 'Login realizado com sucesso', variant: 'success' })
      navigate('/')
    },
    onError: (error) => {
      toast({ description: error.message, variant: 'destructive' })
    }
  })

  return { form, mutation }
}