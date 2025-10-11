import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { useForm } from 'react-hook-form'

const formSchema = z.object({
  name: z.string().min(1, { message: 'Campo nome é necessário' }),
  price: z.string().min(1, { message: 'Campo preço é necessário' }),
  hours: z.string(),
  minutes: z.string(),
})

export interface UserDialogServiceFormProps {
  initialValue?: {
    name: string
    price: string
    hours: string
    minutes: string
  }
}

export type DialogServiceFormData = z.infer<typeof formSchema>

export function useDialogServiceForm() {
  return useForm<DialogServiceFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      price: '',
      hours: '',
      minutes: '',
    },
  })
}
