'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export const reminderSchema = z.object({
  description: z.string().min(1, 'A descrição do lembrete é indispensável'),
})

export type ReminderFormData = z.infer<typeof reminderSchema>

/**
 * Returns a useForm hook with the reminderSchema and defaultValues
 * @returns an object with the useForm hook and defaultValues
 * @example
 * const { register, handleSubmit, formState } = useReminderForm()
 */
export function useReminderForm() {
  return useForm<ReminderFormData>({
    resolver: zodResolver(reminderSchema),
    defaultValues: {
      description: '',
    },
  })
}
