'use server'

import prisma from '@/lib/prisma'

/**
 * Retrieves the user's subscription from the database.
 *
 * @param {object} params - Object containing the user id.
 * @param {string} params.userId - The user id.
 *
 * @returns {object|null} - The user's subscription or null if there is an error.
 */

export async function getSubscription({ userId }: { userId: string }) {
  if (!userId) {
    return null
  }

  try {
    const subscription = await prisma.subscription.findFirst({
      where: {
        userId: userId,
      },
    })

    return subscription
  } catch (error) {
    console.log(error)

    return null
  }
}
