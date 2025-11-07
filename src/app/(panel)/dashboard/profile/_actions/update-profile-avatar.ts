'use server'

import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

/**
 * Changes the user's avatar in database.
 */
export async function updateProfileAvatar({ avatarUrl }: { avatarUrl: string }) {
  const session = await auth()

  if (!session?.user?.id) {
    return {
      error: 'User not found',
    }
  }

  if (!avatarUrl) {
    return {
      error: 'Falha ao alterar imagem',
    }
  }

  try {
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        image: avatarUrl,
      },
    })

    revalidatePath('/dashboard/profile')

    return {
      data: 'Imagem alterada.',
    }
  } catch (error) {
    console.log(error)
    return {
      error: 'Falha ao alterar imagem',
    }
  }
}
