'use server'

import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const formSchema = z.object({
  id: z.string().min(1, { message: 'Id do serviço é indispensável' }),
})

type FormSchema = z.infer<typeof formSchema>

/**
 * Deletes a service from the database
 *
 * @param {FormSchema} formData - The service data to be deleted
 * @returns {Promise<{data: string} | {error: string}>}
 * A promise that resolves to an object containing the deleted service data
 * or an object containing an error message if the deletion fails.
 */
export async function deleteService(formData: FormSchema) {
  const session = await auth()

  if (!session?.user?.id)
    return {
      error: 'Falha ao deletar serviço',
    }

  const schema = formSchema.safeParse(formData)

  if (!schema.success)
    return {
      error: schema.error.issues[0].message,
    }

  try {
    await prisma.service.update({
      where: {
        id: formData.id,
      },
      data: {
        status: false,
      }
    })

    revalidatePath('/dashboard/services')

    return {
      data: 'Serviço deletado.',
    }
  } catch (error) {
    console.log(error)
    return {
      error: 'Falha ao deletar serviço',
    }
  }
}
