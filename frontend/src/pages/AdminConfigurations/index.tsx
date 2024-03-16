import { AdminMainHeader } from "@/components/ui/AdminMainHeader";
import { ConfigurationFormProps, useConfigurationForm } from "./useConfigurationForm";
import { useConfigurationStore } from "@/store/configuration";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormFields } from "./FormFields";

export function AdminConfigurations() {
  const configuration = useConfigurationStore(state => state.configuration)

  const { form, mutation } = useConfigurationForm({ admin_accessible: configuration!.admin_accessible })
  
  const handleUpdateConfiguration = (data: ConfigurationFormProps) => {
    mutation.mutate(data)
  }

  return (
    <>
      <AdminMainHeader h1='Configurações gerais' p='Alterar configurações gerais do site' backLink='/admin' />
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleUpdateConfiguration)} className="space-y-6 pt-[1.5rem]">
          <FormFields form={form} />
          <Button type="submit" disabled={mutation.status === 'pending'}>Atualizar</Button>
        </form>
      </Form>
    </>
  )
}