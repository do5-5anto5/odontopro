'use server'

import { auth } from '@/lib/auth'
import { PlanDetailsInfo } from './get-plan'
import prisma from '@/lib/prisma'
import { canCreateSerivce } from './canCreateService'

export type PLAN_PROP = 'BASIC' | 'PROFESSIONAL' | 'TRIAL' | 'EXPIRED'

interface CanPermissionProps {
  type: string
}

export interface ResultPermissionProps {
  hasPermission: boolean
  planId: PLAN_PROP
  expired: boolean
  plan: PlanDetailsInfo | null
}


/**
 * Checks if the user has permission to create a new service.
 */
export async function planPermissions({
  type,
}: CanPermissionProps): Promise<ResultPermissionProps> {
  const session = await auth()

  if (!session?.user?.id) {
    return {
      hasPermission: false,
      planId: 'EXPIRED',
      expired: true,
      plan: null,
    }
  }

  const subscription = await prisma.subscription.findFirst({
    where: {
      userId: session?.user?.id,
    },
  })

  switch (type) {
    case 'service':

     const permission = await canCreateSerivce(subscription, session)

     return permission
     
    default:
      return {
        hasPermission: false,
        planId: 'EXPIRED',
        expired: true,
        plan: null,
      }
  }
}
