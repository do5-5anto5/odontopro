'use server'

import prisma from '@/lib/prisma'

/**
 * Retrieves the available times for a given user id.
 *
 * @param {object} params - Object containing the user id.
 * @param {string} params.userId - The user id.
 *
 * @returns {object} - Object containing the available times and the user id.
 * @returns {string[]} times - The available times.
 * @returns {string} userId - The user id.
 */
export async function getTimesClinic({userId}: {userId: string}) {
  if (!userId)
    return {
      times: [],
      userId: '',
    }

  try {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        id: true,
        times: true,
      },
    })

    if (!user) {
      return {
        times: [],
        userId: '',
      }
    }

    return {
      times: user.times,
      userid: user.id
    }
  } catch (error) {
    console.log(error)
    return {
      times: [],
      userId: '',
    }
  }
}
