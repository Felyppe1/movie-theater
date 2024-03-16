import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { UseFormReturn } from "react-hook-form"
import { ConfigurationFormProps } from "../useConfigurationForm"
import { Switch } from "@/components/ui/switch"

type FormFieldsProps = {
  form: UseFormReturn<ConfigurationFormProps>
}

export function FormFields({ form }: FormFieldsProps) {
  return (
    <>
    <FormField
      control={form.control}
      name="admin_accessible"
      render={({ field }) => (
        <FormItem>
          <div>
            <FormLabel>Tornar módulo administrativo acessível</FormLabel>
          </div>
          <FormControl>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <FormDescription>
            Permitir que usuários comuns acessem o módulo administrativo sem poder realizar ações
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
    </>
  )
}