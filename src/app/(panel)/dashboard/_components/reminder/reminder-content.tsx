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
import { createReminder } from '../../_actions/create-reminder'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useLoading } from '@/utils/loading'
import CircularLoading from '@/components/ui/circular-loading'

interface ReminderContentProps {
  closeDialog: () => void
}

/**
 * Component that renders a form to create a new reminder
 * The form has a single field for the reminder title and a submit button
 * When the form is submitted, the `onSubmit` function is called with the form data
 * @returns {React.ReactElement} - Reminder form component
 */
export function ReminderContent({ closeDialog }: ReminderContentProps) {
  const form = useReminderForm()
  const router = useRouter()
  const { loading, withLoading } = useLoading()

  async function onSubmit(formData: ReminderFormData) {
    withLoading(async () => {
      const response = await createReminder({
        description: formData.description,
      })

      if (response.error) {
        toast.error(response.error)
        return
      }

      toast.success(response.data)
      router.refresh()
      closeDialog()
    })
  }

  return (
    <div className="grid gap-4 py-4">
      <Form {...form}>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
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
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={!form.watch('description') || loading}
          >
            {loading ? (
              <CircularLoading borderColor="white" />
            ) : (
              'Registrar lembrete'
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}
