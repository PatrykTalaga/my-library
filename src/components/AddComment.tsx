"use client"

import { useState } from "react";
import { TextAreaInputControlled } from "./TextAreaInputControlled";
import addComment from "@/app/functions/addComment";

export default function AddComment({bookID}:{bookID:string}){

  const [comment, setComment] = useState("");

  async function submitComment() {
    console.log(comment)
    if(comment === "") return

    const user="user2234-1";
    await addComment(bookID, comment, user)
    
  }
  
  console.log(bookID);

  return(
    <>
    <TextAreaInputControlled label="Comment" name="Comment" value={comment}
      change={(e)=>setComment(e.target.value)}/>
    <button className=""
    onClick={submitComment}>
      Add Comment
    </button>
    </>
    
  )

}

