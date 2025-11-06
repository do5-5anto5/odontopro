'use server'

import { addDays, isAfter } from 'date-fns'
import { Session } from 'next-auth'
import { ResultPermissionProps } from './planPermissions'
import { TRIAL_DAYS } from './trial-limits'

/**
 * Checks if the user's trial period has expired.
 */
export async function checkSubscriptionExpired(
  session: Session
): Promise<ResultPermissionProps> {
  const trialEndDate = addDays(session.user.createdAt, TRIAL_DAYS)

  if (isAfter(new Date(), trialEndDate)) {
    return {
      hasPermission: false,
      planId: 'EXPIRED',
      expired: true,
      plan: null,
    }
  }

  return {
    hasPermission: true,
    planId: 'TRIAL',
    expired: false,
    plan: null,
  }
}
