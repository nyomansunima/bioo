import { SigninForm } from '@components/auth/signin-form'
import { SigninImage } from '@components/auth/signin-image'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign In | Bioo',
}

export default function SigninPage() {
  return (
    <>
      <main className="flex h-screen w-screen">
        <SigninForm />
        <SigninImage />
      </main>
    </>
  )
}
