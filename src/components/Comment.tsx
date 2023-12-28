"use client"

import deleteComment from "@/app/functions/deleteComment"
import { useRouter } from "next/navigation";

export default function Comment({commentId, createdAt, bookId, editedAt,
  user, comment}:
  {
  commentId: string,
  bookId: string,
  createdAt: string,
  editedAt: string,
  user: string,
  comment: string
  }
){

  const router = useRouter();

  function handleDelete(){
    deleteComment(bookId, commentId)
    router.refresh()
  }

  return(
    <li className=' mx-auto flex flex-col align-baseline justify-center
    bg-zinc-900 bg-opacity-80  my-2 px-2 py-2 border rounded-lg'>
      <div className='flex flex-col'>
        <div className='flex justify-between'>
          <div className='flex py-1 my-1'>
            <p className='font-bold text-xl'>{user}</p>
            {createdAt === editedAt && 
              <p className='text-xl text-zinc-400 ml-5'>
                Posted: {createdAt}</p>}
            {createdAt !== editedAt && 
              <p className='text-xl text-zinc-400 ml-5'>
                Edited: {editedAt}</p>}
          </div>
          <div className='flex'>
            <button className='my-1 mx-5 text-xl bg-orange-500 w-24
             text-center py-1 border-slate-950 rounded-lg hover:scale-110'>
              Edit
            </button>
            <button className='my-1 mx-5 text-xl bg-red-600 w-24
              text-center py-1 rounded-lg order-slate-950 hover:scale-110'
              onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
        <p>{comment}</p>
      </div>
    </li>
  )
}