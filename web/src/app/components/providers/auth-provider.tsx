'use client'

import { SessionProvider } from 'next-auth/react'
import * as React from 'react'

type Props = {
  children: React.ReactNode
}

export default function AuthProvider({ children }: Props) {
  return <SessionProvider>{children}</SessionProvider>
}
