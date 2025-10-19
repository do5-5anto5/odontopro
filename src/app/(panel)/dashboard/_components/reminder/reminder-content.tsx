'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { ReminderFormData, useReminderForm } from './reminder-form'

export function ReminderContent() {
  const form = useReminderForm()

  async function onSubmit(formData: ReminderFormData) {
    console.log(formData)
  }

  return (
    <div className="grid gap-4 py-4">
      <Form {...form}>
        <form className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Descreva o lembrete"
                    className="max-h-52 resize-none"
                  /> 
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={!form.watch('description')}>Salvar lembrete</Button>
        </form>
      </Form>
    </div>
  )
}
