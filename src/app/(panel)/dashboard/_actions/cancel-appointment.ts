'use server'

import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const formSchema = z.object({
  appointmentId: z
    .string()
    .min(1, { message: 'Id do agendamento é indispensável' }),
})

type FormSchema = z.infer<typeof formSchema>

/**
 * Deletes an appointment from the database.
 *
 * @param {FormSchema} formData - The appointment data to be cancelled.
 *
 * @returns {Promise<{data: string} | {error: string}>}
 * A promise that resolves to an object containing the cancelled appointment data
 * or an object containing an error message if the cancellation fails.
 */
export async function cancelAppointment(formData: FormSchema) {
  const session = await auth()

  if (!session?.user?.id) {
    return {
      error: 'User not found.',
    }
  }

  const schema = formSchema.safeParse(formData)

  if (!schema.success) {
    return {
      error: 'Form error: \n' + schema.error.issues[0].message,
    }
  }

  try {
    await prisma.appointment.delete({
      where: {
        id: formData.appointmentId,
        userId: session.user.id
      },
    })

    revalidatePath('/dashboard')

    return {
      data: 'Agendamento cancelado.',
    }
  } catch (error) {
    console.log(error)
    return { error: 'persist error: Falha ao cancelar agendamento.' }
  }
}
