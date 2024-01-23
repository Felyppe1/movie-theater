import { Form  } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { AdminMainHeader } from "@/components/ui/AdminMainHeader"
import { MovieTheaterAddForm, useMovieTheaterAddForm } from './useMovieTheaterAddForm'
import { FormFields } from "./FormFields"

export function AdminMovieTheaterAdd() {
  const { form, mutation } = useMovieTheaterAddForm()

  const handleCreateMovieTheater = (data: MovieTheaterAddForm) => {
    mutation.mutate(data)
  }

  return (
    <>
      <AdminMainHeader h1='Cinemas' p='Cadastro de um novo cinema' backLink='/admin/movie-theater' />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleCreateMovieTheater)} className="space-y-6 pt-[1.5rem]">
          <FormFields form={form} />
          <Button type="submit" disabled={mutation.status == 'pending'}>Cadastrar</Button>
        </form>
      </Form>
    </>
  )
}

