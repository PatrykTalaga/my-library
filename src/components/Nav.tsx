"use server"

import { getServerSession } from "next-auth";
import MainHeaderLink from "./MainHeaderLink";
import SearchComponent from "./SearchComponent";
import Link from "next/link";
import { options } from "@/app/api/auth/[...nextauth]/options";

export default async function NAV() {
  const session = await getServerSession(options);
  console.log(session?.user)

  return(
    <div className='flex justify-start w-full border-b-4 mt-3 mb-10 pb-5'>
      <MainHeaderLink label="Books" link="/" />
      <MainHeaderLink label="Add Book" link="/addBook" />
      <MainHeaderLink label="Reading List" link="/readingList" />
      <SearchComponent />
      {session ? 
      (<Link href={'/api/auth/signout?callbackUrl=/'} className='text-2xl ml-auto bg-violet-600 w-28 my-auto text-center py-2
          rounded-lg border-slate-950 hover:scale-110'>
          Logout</Link>
      ) : (
        <Link href={'/api/auth/signin'}
          className='text-2xl ml-auto bg-blue-600 w-28 my-auto text-center py-2
          rounded-lg border-slate-950 hover:scale-110'>
          Login</Link>
      )}
    </div>
  )
}