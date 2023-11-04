import { Metadata } from 'next'
import SigninFormSection from './components/signin-form-section'
import SigninImageSection from './components/signin-image-section'
import { Button } from '~/app/components/ui/button'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Access to your links | Bioo',
  description: 'Access Bio link using your connected account',
}

export default function SigninPage() {
  return (
    <>
      <main className="flex h-screen w-screen">
        <Button
          asChild
          className="absolute top-5 left-5 laptop:left-28 animate-in duration-700 slide-in-from-top-4"
          variant={'outline'}
          size={'base'}
        >
          <Link href={'/'}>
            <i className="fi fi-rr-arrow-left" /> Back
          </Link>
        </Button>

        <SigninFormSection />
        <SigninImageSection />
      </main>
    </>
  )
}
