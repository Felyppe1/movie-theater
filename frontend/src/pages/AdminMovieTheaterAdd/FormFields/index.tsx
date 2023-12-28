import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { UseFormReturn } from "react-hook-form"
import { MovieTheaterAddForm } from "../useMovieTheaterAddForm"

type City = {
  id: string
  name: string
}

type StatesProps = {
  id: string
  name: string
  cities: City[]
}

type FormFieldsProps = {
  form: UseFormReturn<MovieTheaterAddForm>
}

export function FormFields({ form }: FormFieldsProps) {
  const [states, setStates] = useState<StatesProps[]>([])
  const [selectedState, setSelectedState] = useState({} as StatesProps | undefined)

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

  const handleStateChange = (value: string) => {
    setSelectedState(states.find(state => state.id == value))
  }


  return (
    <>
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
    </>
  )
}