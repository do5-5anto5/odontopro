'use client'

import { Button } from '@/components/ui/button'
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { formatCurrency, convertRealToCents } from '@/utils/formatCurrency'
import {
  DialogServiceFormData,
  useDialogServiceForm,
} from './dialog-service-form'
import { createNewService } from '../_actions/create-service'
import { toast } from 'sonner'
import { useLoading } from '@/utils/loading'
import CircularLoading from '@/components/ui/circular-loading'
import { useRouter } from 'next/navigation'

interface DialogServiceProps {
  closeModal: () => void
}

export function DialogService({ closeModal }: DialogServiceProps) {
  const { loading, withLoading } = useLoading()
  const form = useDialogServiceForm()
  const router = useRouter()

  async function onSubmit(values: DialogServiceFormData) {
    await withLoading(async () => {
      const priceInCents = convertRealToCents(values.price)
      const hours = parseInt(values.hours) || 0
      const minutes = parseInt(values.minutes) || 0

      const duration = hours * 60 + minutes

      const response = await createNewService({
        name: values.name,
        price: priceInCents,
        duration: duration,
      })
      if (response.error) {
        toast.error(response.error)
        return
      }
    })

    toast.success('Serviço cadastrado com sucesso!')
    handleCloseModal()
    router.refresh()
  }

  function handleCloseModal() {
    closeModal()
    form.reset()
  }

  function changeCurrency(event: React.ChangeEvent<HTMLInputElement>) {
    let { value } = event.target
    value = formatCurrency(value)
    event.target.value = value
    form.setValue('price', value)
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Novo Serviço</DialogTitle>
        <DialogDescription>Adicione detalhes:</DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">
                    Nome do serviço:
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Digite o nome do serviço..."
                      disabled={loading}
                    ></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">
                    Valor do serviço:
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={changeCurrency}
                      placeholder="Ex: 120,00"
                      disabled={loading}
                    ></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <p className="font-semibold">Duração do serviço:</p>
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="hours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Horas</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="1"
                      min={'0'}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="minutes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Minutos</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="0"
                      min={'0'}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            className="w-full font-semibold text-white"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <CircularLoading borderColor="white" />
                Carregando
              </div>
            ) : (
              <>Adicionar serviço</>
            )}
          </Button>
        </form>
      </Form>
    </>
  )
}
