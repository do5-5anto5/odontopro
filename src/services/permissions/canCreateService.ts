'use server'

import { Subscription } from '@/generated/prisma/client'
import prisma from '@/lib/prisma'
import { Session } from 'next-auth'
import { getPlan } from './get-plan'
import { PLANS } from '@/utils/plans'

/**
 * Checks if the user can create a new service based on the active subscription
 * and the number of services they already have. 
 */

export async function canCreateSerivce(
  subscription: Subscription | null,
  session: Session
) {
  try {
    const serviceCount = await prisma.service.count({
      where: {
        userId: session?.user?.id,
      },
    })

    if (subscription && subscription.status === 'active') {
      const plan = subscription.plan
      const planLimits = await getPlan(plan)

      return {
        hasPermission:
          planLimits.maxServices === null ||
          serviceCount < planLimits.maxServices,
        planId: 'EXPIRED',
        expired: true,
        plan: PLANS[subscription.plan],
      }
    }
  } catch (error) {
    console.log(error)
  }
}
