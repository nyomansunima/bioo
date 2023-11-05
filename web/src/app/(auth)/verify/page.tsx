import { redirect } from 'next/navigation'
import { userService } from '~/services/user-service'

// check the user already activated or not
async function checkUserActivation() {}

export default async function VerificationPage() {
  await checkUserActivation()

  return <main></main>
}
