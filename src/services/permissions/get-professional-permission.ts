'use server'

import prisma from '@/lib/prisma'

/**
 * Retrieves a user with an active subscription to the Professional plan.
 * If the user does not have an active subscription to the Professional plan, it returns null.
 */
export async function getProfessionalPermission({
  userId,
}: {
  userId: string
}) {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    include: {
      subscription: true,
    },
  })

  if (!user?.subscription || user.subscription.plan !== 'PROFESSIONAL') {
    return null
  }

  return user
}
