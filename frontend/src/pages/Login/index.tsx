import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { LoginForm } from "./LoginForm"
  
export function Login() {
  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Entre na sua conta
        </h1>
        <p className="text-sm text-muted-foreground">
          Insira seu email e senha para conectar-se
        </p>
      </div>
      <LoginForm />
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Não tem uma conta?
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" asChild>
        <Link to='/cadastrar'>
          Cadastrar-se
        </Link>
      </Button>
    </>
  )
}