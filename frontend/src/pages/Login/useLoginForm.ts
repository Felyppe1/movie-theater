import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
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

  return { form }
}