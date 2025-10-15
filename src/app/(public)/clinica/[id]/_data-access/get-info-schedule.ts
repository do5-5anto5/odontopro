'use server'

import prisma from '@/lib/prisma'

/**
 * Retrieves user data from the database to interact with the schedule
 */
export async function getInfoSchedule({ userId }: { userId: string }) {
  try {
    if (!userId) return null

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        subscription: true,
        services: {
          where: {
            status: true
          }
        },
      },
    })

    if (!user) return null

    return user
  } catch (error) {
    console.log(error)
  }
}
