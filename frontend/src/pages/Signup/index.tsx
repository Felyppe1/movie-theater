import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { SignupForm } from "./SignupForm";

export function Signup() {
  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Crie uma conta
        </h1>
        <p className="text-sm text-muted-foreground">
          Preencha seus dados para registrar-se
        </p>
      </div>

      <SignupForm />

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Já tem uma conta?
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" asChild>
        <Link to='/login'>
          Entrar
        </Link>
      </Button>
    </>
  )
}