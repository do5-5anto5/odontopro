'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Prisma } from '@/generated/prisma'
import { formatPhone } from '@/utils/formatPhone'
import { MapPin } from 'lucide-react'
import Image from 'next/image'
import 'react-datepicker/dist/react-datepicker.css'
import imgTest from '../../../../../../public/foto1.png'
import { DateTimePicker } from './date-picker'
import { useAppointmentForm } from './schedule-form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type UserWithServiceAndSubscription = Prisma.UserGetPayload<{
  include: {
    subscription: true
    services: true
  }
}>

interface ScheduleContentProps {
  clinic: UserWithServiceAndSubscription
}

/**
 * Render clinic data and appointment form*
 *
 * @param {ScheduleContentProps} props - Propriedades do componente
 * @returns {JSX.Element} - Elemento JSX renderizado
 */
export function ScheduleContent({ clinic }: ScheduleContentProps) {
  const form = useAppointmentForm()

  return (
    <div className="min-h-screen flex flex-col">
      <div className="h-32 bg-emerald-500" />
      <section className="container mx-auto px-4 -mt-16">
        <div className="max-w-2xl mx-auto">
          <article className="flex flex-col items-center">
            <div
              className="relative w-48 h-48 rounded-full overflow-hidden 
            border-4 border-white mb-8"
            >
              <Image
                src={clinic.image || imgTest}
                alt="Foto da clínica"
                className="object-cover"
                fill
              />
            </div>

            <h1 className="text-2xl font-bold mb-2">{clinic.name} </h1>

            <div className=" flex items-center gap-1">
              <MapPin className="w-5 h-5" />
              <span>
                {clinic.adress ? clinic.adress : 'Endereço não informado'}
              </span>
            </div>
          </article>
        </div>
      </section>

      <section className="max-w-2xl mx-auto w-full">
        <Form {...form}>
          <form className="mx-2 space-y-6 bg-white p-6 border rounded-md shadow-sm">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="my-2">
                  <FormLabel className="font-semibold">
                    Nome completo:
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="name"
                      placeholder="Digite seu nome completo"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="my-2">
                  <FormLabel className="font-semibold">Email:</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      placeholder="Digite seu email..."
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="my-2">
                  <FormLabel className="font-semibold">Telefone</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="phone"
                      placeholder="(XX) XXXXX-XXXX"
                      onChange={(e) => {
                        const formattedValue = formatPhone(e.target.value)
                        field.onChange(formattedValue)
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2 space-y-1">
                  <FormLabel className="font-semibold">
                    Data de agendamento
                  </FormLabel>
                  <FormControl>
                    <DateTimePicker
                      initialDate={new Date()}
                      className="w-full rounded border p-2"
                      onChange={(date) => {
                        if (date) {
                          field.onChange(date)
                        }
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="serviceId"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="font-semibold">Selecione:</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Serviço" />
                      </SelectTrigger>
                      <SelectContent>
                        {clinic.services.map((service) => (
                          <SelectItem key={service.id} value={service.id}>
                            {service.name} - {Math.floor(service.duration / 60)}
                            h {service.duration % 60}min
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="bg-emerald-500">
              Agendar
            </Button>
          </form>
        </Form>
      </section>
    </div>
  )
}
