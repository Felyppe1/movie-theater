import { Form  } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { AdminMainHeader } from "@/components/ui/AdminMainHeader"
import { useMovieTheaterAddForm } from './useMovieTheaterAddForm'
import { FormFields } from "./FormFields"
import { useMovieTheaterAddFormSubmit } from "./useMovieTheaterAddFormSubmit"

export function AdminMovieTheaterAdd() {
  const { form } = useMovieTheaterAddForm()
  const { handleSubmit: handleMovieTheaterAddForm } = useMovieTheaterAddFormSubmit()

  return (
    <>
      <AdminMainHeader h1='Cinemas' p='Cadastro de um novo cinema' />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleMovieTheaterAddForm)} className="space-y-6 pt-[1.5rem]">
          <FormFields form={form} />
          <Button type="submit">Cadastrar</Button>
        </form>
      </Form>
    </>
  )
}

