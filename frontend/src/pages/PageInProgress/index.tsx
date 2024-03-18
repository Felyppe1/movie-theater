import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function PageInProgress() {
  return (
    <section className='flex flex-col items-center gap-6 mt-[6rem]'>
      <h1 className='text-2xl font-semibold'>Página em construção!</h1>
      <Button asChild>
        <Link to='/'>Voltar à página inicial</Link>
      </Button>
    </section>
  )
}