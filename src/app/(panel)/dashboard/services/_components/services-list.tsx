'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Service } from '@/generated/prisma'
import { formatCurrencyReal } from '@/utils/formatCurrency'
import { Pencil, Plus, X } from 'lucide-react'
import { useState } from 'react'
import { DialogService } from './dialog-service'
import { toast } from 'sonner'
import { deleteService } from '../_actions/delete-service'
import { useRouter } from 'next/navigation'
import { useLoading } from '@/utils/loading'
import { ResultPermissionProps } from '@/services/permissions/planPermissions'
import Link from 'next/link'

interface ServicesListProps {
  services: Service[]
  permission: ResultPermissionProps
}

export function ServicesList({ services, permission }: ServicesListProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const router = useRouter()
  const { loading, withLoading } = useLoading()

  const [updateService, setUpdateService] = useState<null | Service>(null)

  const servicesList = permission.hasPermission
    ? services
    : services.slice(0, 5)

  async function handleDeleteService(id: string) {
    withLoading(async () => {
      const response = await deleteService({ id: id })

      if (response.error) {
        toast.error(response.error)
        return
      }

      toast.success(response.data)
      router.refresh()
    })
  }

  async function handleUpdateService(service: Service) {
    setUpdateService(service)
    setIsDialogOpen(true)
  }

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => {
        setIsDialogOpen(open)

        if (!open) {
          setUpdateService(null)
        }
      }}
    >
      <section className="mx-auto">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl md:text-2xl font-bold">
              Serviços
            </CardTitle>
            {permission.hasPermission && (
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4" />
                </Button>
              </DialogTrigger>
            )}

            {!permission.hasPermission && (
              <Link
                href="/dashboard/plans"
                className="text-red-400 font font-semibold"
              >
                Limite de serviços atingido
              </Link>
            )}
            <DialogContent
              onInteractOutside={(e) => {
                e.preventDefault()
                setUpdateService(null)
                setIsDialogOpen(false)
              }}
            >
              <DialogService
                closeModal={() => {
                  setUpdateService(null)
                  setIsDialogOpen(false)
                }}
                serviceId={updateService ? updateService.id : undefined}
                initialValues={
                  updateService
                    ? {
                        name: updateService.name,
                        price: (updateService.price / 100)
                          .toFixed(2)
                          .replace('.', ','),
                        hours: Math.floor(
                          updateService.duration / 60
                        ).toString(),
                        minutes: Math.ceil(
                          updateService.duration % 60
                        ).toString(),
                      }
                    : undefined
                }
              />
            </DialogContent>
          </CardHeader>

          <CardContent>
            <section className="space-y-4 mt-5  ">
              {servicesList.map((service) => (
                <article
                  key={service.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-2">
                    <span>{service.name}</span>
                    <span className="text-gray-500"> - </span>
                    <span className="text-gray-500">
                      {formatCurrencyReal(service.price)}
                    </span>
                  </div>

                  <div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleUpdateService(service)}
                      disabled={loading}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteService(service.id)}
                      disabled={loading}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </article>
              ))}
            </section>
          </CardContent>
        </Card>
      </section>
    </Dialog>
  )
}
