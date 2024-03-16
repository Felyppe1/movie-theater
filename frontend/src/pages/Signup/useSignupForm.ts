import { signup } from "@/api/users"
import { toast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import zod from 'zod'

const cellphoneScheme = zod.object({
  ddd: zod.string().length(2),
  number: zod.string().min(8, 'O número deve conter pelo menos 8 dígitos')
})

const signupFormScheme = zod.object({
  email: zod.string().email('Email inválido'),
  password: zod.string().min(8, 'A senha deve conter pelo menos 8 caracteres'),
  full_name: zod.string().min(1, 'Esse campo é obrigatório'),
  social_name: zod.string(),
  cpf: zod.string().length(11, 'O CPF deve conter 11 números').refine(value => /^\d+$/.test(value), {
    message: 'O CPF deve conter apenas números'
  }),
  sex: zod.enum(['M', 'F']),
  date_of_birth: zod.string()
    // .refine(value => {
    //   const dateRegex = /^\d{4}-\d{2}-\d{2}$/

    //   return dateRegex.test(value)
    // }, 'Formato de data inválido')
    .refine(value => {
      const [year, month, day] = value.split("-").map(Number)

      const date = new Date(year, month - 1, day)

      return (
        !isNaN(date.getTime()) &&
        date.getDate() === day &&
        date.getMonth() === month - 1 &&
        date.getFullYear() === year
      )
    }, 'Data de nascimento inválida')
      .refine(value => {
        const [year, month, day] = value.split("-").map(Number)

        const date = new Date(year, month - 1, day)
        const ageDifferenceMilliseconds = Date.now() - date.getTime()
        const ageDate = new Date(ageDifferenceMilliseconds)

        const age = ageDate.getUTCFullYear() - 1970

        return age >= 18
      }, 'É necessário ser maior de 18 anos para se cadastrar'),
  // date_of_birth: zod.string()
  //   .refine((value) => {
  //     const dateFormatRegex = /^\d{2}\/\d{2}\/\d{4}$/
      
  //     return dateFormatRegex.test(value)
  //   }, 'Formato de data inválido. Utilize o formato dd/mm/aaaa')
  //   .refine(value => {
  //     const [day, month, year] = value.split("/").map(Number)

  //     const date = new Date(year, month - 1, day)

  //     return (
  //       !isNaN(date.getTime()) &&
  //       date.getDate() === day &&
  //       date.getMonth() === month - 1 &&
  //       date.getFullYear() === year
  //     )
  //   }, 'Data de nascimento inválida')
  //   .transform(value => {
  //     const [day, month, year] = value.split("/").map(Number)
  //     return new Date(year, month - 1, day)
  //   }),
  cellphone: cellphoneScheme,
  city_id: zod.string().min(1, 'Esse campo é obrigatório'),
  state_id: zod.string().min(1, 'Esse campo é obrigatório')
})
export type SignupForm = zod.infer<typeof signupFormScheme>

export function useSignupForm() {
  const form = useForm<SignupForm>({
    resolver: zodResolver(signupFormScheme),
    defaultValues: {
      email: '',
      password: '',
      full_name: '',
      social_name: '',
      cpf: '',
      sex: 'M',
      date_of_birth: '',
      cellphone: {
        ddd: '',
        number: ''
      },
      city_id: '',
      state_id: ''
    }
  })

  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      toast({ description: 'Conta criada com sucesso', variant: 'success' }),
      navigate('/login')
    },
    onError: (error) => {
      toast({ description: error.message, variant: 'destructive' })
    }
  })
  
  return { form, mutation }
}