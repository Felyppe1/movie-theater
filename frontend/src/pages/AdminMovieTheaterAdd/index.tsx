import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import zod from 'zod'
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { AdminMainHeader } from "@/components/ui/AdminMainHeader"

const addMovieTheaterFormValidationSchema = zod.object({
  name: zod.string().min(1),
  street: zod.string().min(1),
  number: zod.string().min(1),
  state_id: zod.string().min(1),
  city_id: zod.string().min(1)
})

type AddMovieTheaterForm = zod.infer<typeof addMovieTheaterFormValidationSchema>

type City = {
  id: string
  name: string
}

type StatesProps = {
  id: string
  name: string
  cities: City[]
}

export function AdminMovieTheaterAdd() {
  const [states, setStates] = useState<StatesProps[]>([])
  const [selectedState, setSelectedState] = useState({} as StatesProps | undefined)

  const form = useForm({
    resolver: zodResolver(addMovieTheaterFormValidationSchema),
    defaultValues: {
      name: '',
      street: '',
      number: '',
      state_id: '',
      city_id: ''
    }
  })

  function handleAddMovieTheaterForm(data: AddMovieTheaterForm) {
    console.log(data)
  }

  const handleStateChange = (value: string) => {
    setSelectedState(states.find(state => state.id == value))
  }

  useEffect(() => {
    const url = 'http://localhost:3333/places/'
    const conf = {
      method: 'GET'
    }

    fetch(url, conf)
      .then(response => {
        if (!response.ok) {
          throw (response.status)
        }

        return response.json()
      })
      .then(data => {
        setStates(data)
      })
      .catch(error => {
        console.log(error)
      })

  }, [])

  return (
    <>
      <AdminMainHeader h1='Cinemas' p='Cadastro de um novo cinema' />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleAddMovieTheaterForm)} className="space-y-6 pt-[1.5rem]">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Cinelândia" {...field} />
                  </FormControl>
                  <FormDescription>
                    Nome do cinema a ser criado.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel>Endereço</FormLabel>
                  <FormControl>
                    <Input placeholder="Rua de exemplo" {...field} />
                  </FormControl>
                  <FormDescription>
                    Endereço onde o cinema está localizado.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          <FormField
            control={form.control}
            name="number"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel>Número</FormLabel>
                  <FormControl>
                    <Input placeholder="27" {...field} />
                  </FormControl>
                  <FormDescription>
                    Número do endereço.
                  </FormDescription>
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
                        {states?.map(state => {
                          return (
                            <SelectItem key={state.id} value={state.id}>
                              {state.name}
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                  <FormDescription>
                    Estado onde o cinema está localizado.
                  </FormDescription>
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
                  <FormDescription>
                    Cidade onde o cinema está localizado.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          <Button type="submit">Cadastrar</Button>
        </form>
      </Form>
    </>
  )
}

