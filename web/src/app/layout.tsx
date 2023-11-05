import './globals.css'
import QueryProvider from './components/providers/query-provider'
import { dmSansFont } from './fonts'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${dmSansFont.className}`}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  )
}
