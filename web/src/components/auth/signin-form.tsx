'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@components/ui/form'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import Link from 'next/link'

const formSchema = z.object({
  email: z.string().min(2).max(50),
  password: z.string(),
})

export function SigninForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <section className="flex h-full w-1/2 items-center">
      <div className="flex flex-col px-32">
        <h2 className="text-4xl font-medium leading-tight laptop:w-10/12">
          Manage your link in one platform.
        </h2>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-3"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Your email address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Your passsword" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Link href={'/forgot-password'}>Forgot Password</Link>
            <Button type="submit">Signin using Email</Button>
          </form>
        </Form>

        <p>Or continue with</p>

        <div className="flex flex-col space-y-3">
          <Button variant={'secondary'}>
            <i className="fi fi-brands-google" /> Continue With Google
          </Button>

          <Button variant={'outline'}>
            <i className="fi fi-brands-github" /> Continue With Github
          </Button>
        </div>
      </div>
    </section>
  )
}
