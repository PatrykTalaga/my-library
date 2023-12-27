"use client"

import { useState } from "react";
import addComment from "@/app/functions/addComment";
import { useRouter } from "next/navigation";



export default function AddComment({bookID}:{bookID:string}){

  const [comment, setComment] = useState("");
  const router = useRouter();

  async function submitComment() {
    console.log(comment)
    if(comment === "") return

    const user="user2234-1";
    await addComment(bookID, comment, user)
    
    // Force refresh the page
    
    /* router.replace(`/${bookID}`); */
    router.refresh()
  }

  return(
    <>
    <textarea rows={4}  name={comment} className="bg-zinc-900 bg-opacity-80 
      border rounded-md my-2" value={comment || ""}
      onChange={(e)=>setComment(e.target.value)}/>
    <button className="mx-auto w-48 text-2xl p-2 mt-2 bg-zinc-900
      bg-opacity-80 border rounded-md hover:scale-110"
    onClick={submitComment}>
      Add Comment
    </button>
    </>
    
  )

}

