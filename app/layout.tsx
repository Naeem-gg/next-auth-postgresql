import AuthProvider from '@/components/AuthProvider'
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lab Planner',
  description: 'Diabots',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='bg-slate-400'>
      <AuthProvider>

        {children}
      </AuthProvider>
        </body>
    </html>
  )
}
