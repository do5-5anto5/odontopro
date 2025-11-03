'use server'

import { Plan } from "@/generated/prisma/client"
import { PlansProps } from "@/utils/plans"

export interface PlanDetailsInfo {
    maxServices: number
}

const PLANS_LIMITS: PlansProps = {
    BASIC: {
        maxServices: 5,
    },
    PROFESSIONAL: {
        maxServices: 50,
    },
}

/**
 * Retrieves the details of a plan, given its id.
 */
export function getPlan(planId: Plan) {
return PLANS_LIMITS[planId]
}