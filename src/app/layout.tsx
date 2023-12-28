import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import MainHeaderLink from '@/components/MainHeaderLink'

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
        <div className='flex justify-start w-full border-b-4 mt-3 mb-10'>
          <MainHeaderLink label="Books" link="/" />
          <MainHeaderLink label="Add Book" link="/addBook" />
          <MainHeaderLink label="Reading List" link="/readingList" />
          <p className='bg-zinc-900 bg-opacity-80 text-4xl mb-5 border px-5
            py-3 rounded-lg mr-5 ml-auto hover:scale-110'>
            Search</p>
        </div>
        {children}
        </body>
    </html>
  )
}
