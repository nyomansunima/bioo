import * as React from 'react'
import MainHeader from './components/main-header'
import MainFooter from './components/main-footer'

type Props = {
  children: React.ReactNode
}

export default function LandingLayout({ children }: Props) {
  return (
    <>
      <MainHeader />
      {children}
      <MainFooter />
    </>
  )
}
