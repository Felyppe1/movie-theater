import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSignupForm } from "../useSignupForm"
import { SignupForm as SignupFormType } from "../useSignupForm"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CgSpinner } from "react-icons/cg"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useFetchPlaces } from "@/hooks/api/useFetchPlaces"

interface SignupFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SignupForm({ ...props }: SignupFormProps) {
  const { places, handleStateChange, selectedState } = useFetchPlaces()
  
  const { form, mutation } = useSignupForm()

  const handleSignup = (data: SignupFormType) => {
    event?.preventDefault()

    const [year, month, day] = data.date_of_birth.split("-").map(Number)
    const cleanedData = {
      ...data,
      date_of_birth: new Date(year, month - 1, day)
    }

    mutation.mutate(cleanedData)
  }
  
  return (
    <div {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSignup)} className="space-y-2 pt-[1.5rem]">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input {...field} type='password' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel>Nome completo</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          <FormField
            control={form.control}
            name="social_name"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel>Nome social</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          <FormField
            control={form.control}
            name="date_of_birth"
            render={({ field }) => {
              return (
                <>
                  <FormItem>
                    <FormLabel>Data de nascimento</FormLabel>
                    <FormControl>
                      <Input {...field} type='date' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </>
              )
            }}
          />
          <FormField
            control={form.control}
            name="sex"
            render={({ field }) => (
              <>
                <FormItem className="space-y-3">
                  <FormLabel>Gênero</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="M" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Masculino
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="F" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Feminino
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          <FormField
            control={form.control}
            name="cpf"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel>CPF (apenas números)</FormLabel>
                  <FormControl>
                    <Input {...field} maxLength={11} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          <FormField
            control={form.control}
            name="state_id"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel>Estado</FormLabel>
                    <Select 
                      onValueChange={(value) => {
                        handleStateChange(value)
                        field.onChange(value)
                      }} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Clique para selecionar" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent {...field} >
                        {places?.data?.map(state => {
                          return (
                            <SelectItem key={state.id} value={state.id}>
                              {state.name}
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          <FormField
            control={form.control}
            name="city_id"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel>Cidade</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Clique para selecionar" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent {...field} >
                        {selectedState?.cities?.map(city => {
                          return (
                            <SelectItem key={city.id} value={city.id}>
                              {city.name}
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          <div className='grid grid-cols-[20%_1fr] gap-x-3'>
            <FormField
              control={form.control}
              name="cellphone.ddd"
              render={({ field }) => (
                <>
                  <FormItem>
                    <FormLabel>DDD</FormLabel>
                    <FormControl>
                      <Input {...field} maxLength={2} className='mt-1' />
                    </FormControl>
                  </FormItem>
                </>
              )}
            />
            <FormField
              control={form.control}
              name="cellphone.number"
              render={({ field }) => (
                <>
                  <FormItem>
                    <FormLabel>Celular</FormLabel>
                    <FormControl>
                      <Input {...field} maxLength={9} className='mt-1' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </>
              )}
            />
          </div>
          {/* <div className='grid grid-cols-[20%_1fr] gap-x-3'>
              <div>
                <Label>DDD</Label>
                <Input {...form.register('cellphone.ddd')} maxLength={2} className='mt-1' />
              </div>
              <div>
                <Label>Celular</Label>
                <Input {...form.register('cellphone.number')} maxLength={9} className='mt-1' />
              </div>
          </div> */}
          <Button type="submit" disabled={mutation.status == 'pending'} className='w-full'>
            {mutation.status == 'pending' && (
              <span className='animate-spin mr-2'>
                <CgSpinner size={20} />
              </span>
            )}
            Cadastrar
          </Button>
        </form>
      </Form>
    </div>
  )
}