import { deleteMovieTheater } from "@/api/movieTheaters";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

type AdvancedSectionProps = {
  id: string
}

export function AdvancedSection({ id }: AdvancedSectionProps) {
  const navigate = useNavigate()
  
  const { mutate, status } = useMutation({
    mutationFn: deleteMovieTheater,
    onError: (error) => {
      toast({ description: error.message, variant: 'destructive' })
    },
    onSuccess: () => {
      toast({ description: 'Cinema excluído com sucesso', variant: 'success' })
      navigate(`/admin/movie-theater`)
    }
  })

  const handleDeleteMovieTheater = () => {
    mutate({ id })
  }
  
  return (
    <section className='mt-[1.5rem] pb-[2rem]'>
      <h2 className='text-2xl font-semibold text-secondary-foreground mb-[1rem]'>
        Opções avançadas
      </h2>
      <Button
        onClick={handleDeleteMovieTheater}
        disabled={status === 'pending'}
        variant='destructive'
      >
        Deletar cinema
      </Button>
    </section>
  )
}