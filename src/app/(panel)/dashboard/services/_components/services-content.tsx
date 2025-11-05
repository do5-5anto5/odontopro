import { planPermissions } from '@/services/permissions/planPermissions'
import { getAllServices } from '../_data-access/get-all-services'
import { ServicesList } from './services-list'
import { LabelSubscription } from '@/components/ui/label-subscription'

interface ServicesContentProps {
  userId: string
}

export async function ServicesContent({ userId }: ServicesContentProps) {
  const services = await getAllServices({ userId: userId })
  const permission = await planPermissions({ type: 'service' })

  return (
    <>
      {!permission.hasPermission && (
        <LabelSubscription expired={permission.expired} />
      )}

      <ServicesList services={services.data || []} permission={permission} />
    </>
  )
}
