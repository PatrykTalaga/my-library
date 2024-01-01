import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NAV from '@/components/Nav'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My Library',
  description: 'My Library app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-slate-100 mx-auto py-4 px-8
        bg-[url('../../public/bg-dark-hq.jpg')] w-full bg-center-bottom
        bg-no-repeat bg-cover container`}>
        <NAV />
        {children}
      </body>
    </html>
  )
}
