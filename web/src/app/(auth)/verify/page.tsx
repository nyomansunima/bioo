import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { userService } from '~/services/user-service'

// check the user already activated or not
async function checkUserActivation() {
  const session = await getServerSession()

  // const isActive = await userService.checkUserActivation()
  // if (isActive) {
  //   redirect('/')
  // }
}

export default async function VerificationPage() {
  await checkUserActivation()

  return <main></main>
}
