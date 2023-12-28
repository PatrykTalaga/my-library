"use client"

import deleteBook from "@/app/functions/deleteBook";

export default function DeleteBookBtn({id}:{id:string}){

  return(
    <button className='mt-5 text-xl bg-red-600 w-28 text-center py-3
      rounded-lg border-slate-950 hover:scale-110'
      onClick={()=>deleteBook(id)}>
      Delete
    </button>
  )
}