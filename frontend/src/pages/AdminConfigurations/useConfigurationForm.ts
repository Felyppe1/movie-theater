import { updateConfiguration } from "@/api/configurations"
import { toast } from "@/components/ui/use-toast"
import { useConfigurationStore } from "@/store/configuration"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import zod from 'zod'

const configurationFormSchema = zod.object({
  admin_accessible: zod.boolean()
})

export type ConfigurationFormProps = zod.infer<typeof configurationFormSchema>

type UseConfigurationsFormProps = {
  admin_accessible: boolean
}

export function useConfigurationForm({ admin_accessible }: UseConfigurationsFormProps) {
  const setConfiguration = useConfigurationStore(state => state.setConfiguration)
  
  const form = useForm<ConfigurationFormProps>({
    resolver: zodResolver(configurationFormSchema),
    defaultValues: {
      admin_accessible
    }
  })

  const mutation = useMutation({
    mutationFn: updateConfiguration,
    onError: (error) => {
      toast({ description: error.message, variant: 'destructive' })
    },
    onSuccess: () => {
      setConfiguration(form.getValues())
      toast({ description: 'Alterações realizadas com sucesso', variant: 'success',  })
    }
  })
  
  return { form, mutation }
}