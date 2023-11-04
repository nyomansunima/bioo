import './globals.css'
import QueryProvider from './components/providers/query-provider'
import { dmSansFont } from './fonts'
import AuthProvider from './components/providers/auth-provider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${dmSansFont.className}`}>
        <AuthProvider>
          <QueryProvider>{children}</QueryProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
