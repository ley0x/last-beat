'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { z } from 'zod'
import { toast } from 'sonner'

import { Button } from '@components/ui/button'

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@components/ui/form'
import { Input } from '@components/ui/input'
import { useNavigate } from '@tanstack/react-router'

const FormSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.'
  })
})

export function Login() {
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: ''
    }
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast.info(`Hello ${data.username}! 👋`, {
      description: 'We are contacting the Last.fm API to retrieve your data...'
    })

    navigate({ to: `/stats/${data.username}` })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 max-w-lg space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last.fm username</FormLabel>
              <FormControl>
                <Input placeholder="Last.fm username" {...field} />
              </FormControl>
              <FormDescription>This is your public last.fm username.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="outline" className="hover:cursor-pointer">
          <span>Search on Last.fm</span>
          <img src="/providers/lastfm.png" width={20} height={20} alt="Last.fm logo" />
        </Button>
      </form>
    </Form>
  )
}
