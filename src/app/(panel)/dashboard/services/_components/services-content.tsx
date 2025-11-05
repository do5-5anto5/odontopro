import { planPermissions } from '@/services/permissions/planPermissions'
import { getAllServices } from '../_data-access/get-all-services'
import { ServicesList } from './services-list'

interface ServicesContentProps {
  userId: string
}

export async function ServicesContent({ userId }: ServicesContentProps) {
  const services = await getAllServices({ userId: userId })
  const permission = await planPermissions({ type: 'service' })

  return <ServicesList services={services.data || []} permission={permission} />
}
