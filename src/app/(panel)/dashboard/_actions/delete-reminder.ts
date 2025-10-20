'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const formSchema = z.object({
  reminderId: z
    .string({ error: () => ({ message: 'Id do lembrete é indispensável' }) })
    .min(1, { message: 'Id do lembrete é indispensável' }),
})

type FormSchema = z.infer<typeof formSchema>

/**
 * Deletes a reminder from the database
 * @param formData - The reminder data to be deleted
 * @returns {Promise<{data: string} | {error: string}>}
 * A promise that resolves to an object containing message confirming the deletion
 * or an object containing an error message if the deletion fails.
 */
export async function deleteReminder(formData: FormSchema) {
  const schema = formSchema.safeParse(formData)

  if (!schema.success) {
    return {
      error: 'Form error: \n' + schema.error.issues[0].message,
    }
  }

  try {
    await prisma.reminder.delete({
      where: {
        id: formData.reminderId,
      },
    })

    revalidatePath('/dashboard')

    return {
      data: 'Lembrete deletado com sucesso.',
    }
  } catch (error) {
    console.log(error)
    return { error: 'persist error: Falha ao deletar lembrete' }
  }
}
