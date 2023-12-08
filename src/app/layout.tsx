import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

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
      <body className={`${inter.className} text-slate-100
        bg-gradient-to-r from-zinc-800 via-blue-900 to-zinc-800
        container mx-auto py-4 px-8`}>
        <div className='flex justify-start w-full border-b-4 mt-3 mb-10'>
          <Link href={"/"} className='bg-zinc-700 text-4xl mb-5 mr-10 border px-5 py-3 rounded-lg'>
            Books</Link>
          <Link href={"/readingList"} className='bg-zinc-700 text-4xl mb-5 mr-10 px-5 py-3 border rounded-lg'>
            Reading List</Link>
          <p className='bg-zinc-700 text-4xl mb-5 border px-5 py-3 rounded-lg mr-5 ml-auto'>
            Search</p>
        </div>

        {children}
        </body>
    </html>
  )
}
