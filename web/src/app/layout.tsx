import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'
import QueryProvider from '@components/providers/query-provider'

const dmSans = DM_Sans({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  title: 'Manage your links in one place | Bioo',
  description:
    'Grow your business by sharing your awesome links. Manage link in bio, shortlink',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.className} text-base font-normal leading-normal text-black`}
      >
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  )
}
