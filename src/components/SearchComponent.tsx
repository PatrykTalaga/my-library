"use client"

import searchBooks from "@/app/functions/searchBooks";
import { useRouter } from "next/navigation";
import { useState } from "react";



export default function SearchComponent() {
  
  const [text, setText] = useState("");
  const router = useRouter();

  async function submit(){
    try{
      const books = await searchBooks(text);
      if(books === false) {
        setText("No book was found");
        return;
      }
      if(books === "Server Error") {
        setText("Server Error");
        return;
      }
    }catch(error){
      console.error(error);
      return;
    }
    router.replace(`/search/${text}`)
  }


  return (
  <>
    <div className="my-auto bg-zinc-900 bg-opacity-80 w-96 flex
      justify-end items-center border rounded-lg h-14">
      <div className="flex justify-center items-center">
        <input type="text" value={text} className="bg-zinc-700 bg-opacity-80
          border rounded-lg mx-3 p-1"
          onChange={(e)=>setText(e.target.value)}>
        </input>
        <button className='text-xl bg-blue-600 w-24 mx-3 text-center py-1
          my-3 rounded-lg border-slate-950 hover:scale-110'
          onClick={()=>submit()}>Search</button>
      </div>
    </div>
</>
)
}