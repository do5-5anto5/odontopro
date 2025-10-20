'use server'

import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const formSchema = z.object({
  description: z.string().min(1, { message: 'Id do lembrete é indispensável' }),
})

type FormSchema = z.infer<typeof formSchema>

/**
 * Creates a new reminder in the database.
 *
 * @param {FormSchema} formData - The reminder data to be saved.
 *
 * @returns {Promise<{data: string} | {error: string}>}
 * A promise that resolves to an object containing the saved reminder data
 * or an object containing an error message if the saving fails.
 */
export async function createReminder(formData: FormSchema) {
  const session = await auth()

  if (!session?.user?.id) {
    return {
      error: 'User not found',
    }
  }

  const schema = formSchema.safeParse(formData)

  if (!schema.success) {
    return {
      error: 'Form error: \n' + schema.error.issues[0].message,
    }
  }

  try {
    await prisma.reminder.create({
      data: {
        description: formData.description,
        userId: session?.user?.id,
      },
    })

    revalidatePath('/dashboard')

    return {
      data: 'Lembrete registrado com sucesso.',
    }
  } catch (error) {
    console.log(error)
    return { error: 'persist error: Falha ao registrar lembrete' }
  }
}
