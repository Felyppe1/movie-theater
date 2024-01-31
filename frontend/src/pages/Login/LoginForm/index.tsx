import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { CgSpinner } from "react-icons/cg"
import { useLoginForm } from "../useLoginForm"
import { LoginFormProps } from "../useLoginForm"
import { useState } from "react"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LoginForm({ className, ...props }: UserAuthFormProps) {
  const [status, setStatus] = useState<'settled' | 'pending'>('settled')
  
  const { form } = useLoginForm()
  const { register, handleSubmit } = form

  async function onSubmit(data: LoginFormProps) {
    event.preventDefault()

    setStatus('pending')
    setTimeout(() => {
      setStatus('settled')
    }, 1000)
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label htmlFor="email" className='sr-only'>
              Email
            </Label>
            <Input
              {...register('email')}
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={status == 'pending'}
            />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="password" className='sr-only'>
              Senha
            </Label>
            <Input
              {...register('password')}
              id="password"
              placeholder="senha"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={status == 'pending'}
            />
          </div>
          <Button disabled={status == 'pending'}>
            {status == 'pending' && (
              <span className='animate-spin mr-2'>
                <CgSpinner size={20} />
              </span>
            )}
            Entrar
          </Button>
        </div>
      </form>
    </div>
  )
}