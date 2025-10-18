'use server'

import prisma from '@/lib/prisma'
import { z } from 'zod'

const formSchema = z.object({
  name: z.string().min(1, { message: 'Campo nome é indispensável' }),
  email: z.string().min(1, { message: 'Campo email é indispensável' }),
  phone: z.string().min(1, { message: 'Campo telefone é indispensável' }),
  date: z.date(),
  serviceId: z.string().min(1, { message: 'Selecione um serviço' }),
  time: z.string().min(1, { message: 'Selecione um horário' }),
  clinicId: z.string().min(1, { message: 'Id da clínica é indispensável' }),
})

type FormSchema = z.infer<typeof formSchema>

/**
 * Creates a new appointment in the database.
 *
 * @param {FormSchema} formData - The appointment data to be saved.
 *
 * @returns {Promise<{data: Appointment} | {error: string}>}
 * A promise that resolves to an object containing the saved appointment data
 * or an object containing an error message if the saving fails.
 */
export async function createNewAppointment(formData: FormSchema) {
  const schema = formSchema.safeParse(formData)

  if (!schema.success) {
    return {
      error: 'Form error: \n' + schema.error.issues[0].message,
    }
  }

  try {
    const selectedDate = new Date(formData.date)
    const year = selectedDate.getFullYear()
    const month = selectedDate.getMonth()
    const day = selectedDate.getDate()

    const appointmentDate = new Date(year, month, day, 0, 0, 0, 0)

    const newAppointment = await prisma.appointment.create({
      data: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        time: formData.time,
        serviceId: formData.serviceId,
        userId: formData.clinicId,
        appointmentDate: appointmentDate,
      },
    })

    return {
      data: newAppointment,
    }
  } catch (error) {
    console.log(error)
    return {
      error: 'Erro ao realizar agendamento',
    }
  }
}
