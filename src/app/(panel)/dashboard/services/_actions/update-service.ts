'use server'

import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const formSchema = z.object({
  serviceId: z.string().min(1, 'Id do serviço é indispensável'),
  name: z.string().min(1, { message: 'Campo nome é indispensável' }),
  price: z.number().min(1, { message: 'Campo preço é indispensável' }),
  duration: z.number(),
})

type FormSchema = z.infer<typeof formSchema>

export interface UpdateServiceProps {
  id: string
  name: string;
  price: number
  duration: number
}

/**
 * Edit service in database
 * 
 * @param formData 
 * @returns 
 */
export async function updateService(formData: FormSchema) {
  const session = await auth()

  if (!session?.user?.id)
    return {
      error: 'Falha ao editar serviço',
    }

  const schema = formSchema.safeParse(formData)

  if (!schema.success)
    return {
      error: schema.error.issues[0].message,
    }

  try {
    const updateService = await prisma.service.update({
      where: {
        id: formData.serviceId,
        userId: session?.user?.id
      },
      data: {
        name: formData.name,
        price: formData.price,
        duration: formData.duration < 30 ? 30 : formData.duration,
      }
    })

    revalidatePath('/dashboard/services')

    return {
      data: updateService,
    }
  } catch (error) {
    console.log(error)
    return {
      error: 'Falha ao editar serviço',
    }
  }
}
