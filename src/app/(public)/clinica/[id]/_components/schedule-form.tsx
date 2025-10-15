'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const appointmentSchema = z.object({
  name: z.string().min(1, { message: 'Campo nome é necessário' }),
  email: z.string().min(1, { message: 'Campo email é necessário' }),
  phone: z.string().min(1, { message: 'Campo telefone é necessário' }),
  date: z.date(),
  service: z.string().min(1, { message: 'Selecione um serviço' }),
})

export type AppointmentFormData = z.infer<typeof appointmentSchema>

/**
 * Returns a useForm hook with the appointmentSchema and defaultValues
 * @returns an object with the useForm hook and defaultValues
 * @example
 * const { register, handleSubmit, formState } = useAppointmentForm()
 */
export function useAppointmentForm() {
  return useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      date: new Date(),
    },
  })
}
