'use server'

import { Subscription } from '@/generated/prisma/client'
import prisma from '@/lib/prisma'
import { Session } from 'next-auth'
import { getPlan } from './get-plan'
import { PLANS } from '@/utils/plans'
import { checkSubscriptionExpired } from './checkSubscriptionExpired'
import { ResultPermissionProps } from './planPermissions'


/**
 * Checks if the user has permission to create a new service.
 * If the user has an active subscription, it will check if the user has
 * reached the maximum number of services allowed by the plan.
 * If the user does not have an active subscription, it will check if the
 * user's trial period has expired.
 */
export async function canCreateSerivce(
  subscription: Subscription | null,
  session: Session
): Promise<ResultPermissionProps> {
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

    const checkUserLimit = await checkSubscriptionExpired(session)

    return checkUserLimit
  } catch (error) {
    console.log(error)

    return {
      hasPermission: false,
      planId: 'EXPIRED',
      expired: true,
      plan: null,
    }
  }
}
