'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '~/app/components/ui/form'
import { Input } from '~/app/components/ui/input'
import { Button } from '~/app/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { signIn } from 'next-auth/react'

const formSchema = z.object({
  email: z
    .string()
    .min(1, 'Please fill your email address')
    .email('Your email address looks weird'),
  password: z.string().min(8, 'The password must al least 8 characters length'),
})

function EmailPasswordForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const signUsingEmailPass = useMutation({
    mutationFn: async (formData: z.infer<typeof formSchema>) => {},
    onSuccess: () => {},
    onError: () => {},
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((formData) =>
          signUsingEmailPass.mutate(formData),
        )}
        className="flex flex-col space-y-3 mt-10"
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

        <div className="flex justify-end">
          <Link href={'/forgot-password'}>Forgot Password</Link>
        </div>

        <Button
          type="submit"
          size={'lg'}
          className="mt-1 transition-all duration-700 hover:scale-95"
        >
          Signin using Email
          <i className="fi fi-rr-arrow-right absolute right-4" />
        </Button>
      </form>
    </Form>
  )
}

export default function SigninFormSection() {
  function signUsingGoogle() {
    signIn('google', { redirect: false })
  }

  function signUsingGithub() {
    signIn('github', { redirect: false })
  }

  return (
    <section className="flex h-full laptop:w-1/2 items-center animate-in slide-in-from-bottom-24 duration-1000">
      <div className="flex flex-col px-5 laptop:px-32">
        <h2 className="text-4xl font-medium leading-tight laptop:w-10/12">
          Manage your link in one platform.
        </h2>

        <EmailPasswordForm />

        <p className="mt-5 text-center text-gray-500">Or continue with</p>

        <div className="flex flex-col space-y-3 mt-5">
          <Button
            onClick={signUsingGoogle}
            variant={'secondary'}
            size={'lg'}
            className="transition-all duration-700 hover:scale-95"
          >
            <i className="fi fi-brands-google" /> Continue With Google
          </Button>

          <Button
            onClick={signUsingGithub}
            variant={'outline'}
            size={'lg'}
            className="transition-all duration-700 hover:scale-95"
          >
            <i className="fi fi-brands-github" /> Continue With Github
          </Button>
        </div>
      </div>
    </section>
  )
}
