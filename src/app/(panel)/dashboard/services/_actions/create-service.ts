'use server'

import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const formSchema = z.object({
  name: z.string().min(1, { message: 'Campo nome é indispensável' }),
  price: z.number().min(1, { message: 'Campo preço é indispensável' }),
  duration: z.number(),
})

type FormSchema = z.infer<typeof formSchema>

/**
 * Create new service in database
 * 
 * @param formData 
 * @returns 
 */
export async function createNewService(formData: FormSchema) {
  const session = await auth()

  if (!session?.user?.id)
    return {
      error: 'Falha ao cadastrar serviço',
    }

  const schema = formSchema.safeParse(formData)

  if (!schema.success)
    return {
      error: schema.error.issues[0].message,
    }

  try {
    const newService = await prisma.service.create({
      data: {
        name: formData.name,
        price: formData.price,
        duration: formData.duration,
        userId: session.user.id,
      },
    })

    revalidatePath('/dashboard/services')

    return {
      data: newService,
    }
  } catch (error) {
    console.log(error)
    return {
      error: 'Falha ao cadastrar serviço',
    }
  }
}
