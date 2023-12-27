"use client"

import getBookById from "@/app/functions/getBookbyId"
import Comment from "./Comment";
import AddComment from "./AddComment";
import { useEffect, useState } from "react";

type CommentType = {
  id: string,
  createdAt: string,
  editedAt: string,
  user: string,
  comment: string
}

type BookType = {
  _id: string,
  title: string,
  cover: string,
  author: string,
  isRead: boolean,
  availability: string
  pages: Number,
  pageFormat: String,
  year: Number,
  rating: Number,
  review: String,
  comment: Array<CommentType>
}

export default async function CommentsSection({bookId}:{bookId:string}){
  const[book, setBook] = useState()
  const[loading, setLoading] = useState(true)
  const[error, setError] = useState(null)
  
  useEffect(() => {
    console.log(bookId)
    console.log(book)
    /* async () => { setBook(await getBookById(bookId)) } */
    async () => {
      try{
        const myBook = await getBookById(bookId);
        if(myBook === "Book of this title does not exists") {
          throw new Error("Book of this title does not exists")
        }
        setBook(myBook);
        console.log(book)
        setError(null);
      }catch(error){
        console.error(error);
      }
      finally{
        setLoading(false);
      }
      
    }
  },[]);

  console.log(bookId)
  console.log(book)


  return(
    <div className=" w-3/4 mx-auto flex
          flex-col align-baseline justify-center">
        <p className="w-44 text-center text-2xl font-bold bg-zinc-900
            bg-opacity-80  my-2 px-2 py-2 border rounded-lg">Comments: </p>
      {loading && <p>Loading Comments...</p>}
      {loading == false && 
 
        <ul>
          {book.comment.map(item =>(
            <Comment key={item.id} commentId={item.id}
            bookId={bookId}
            createdAt={item.createdAt}
            editedAt={item.editedAt}
            user={item.user}
            comment={item.comment} />
          ))}
        </ul>
      
      
      }
        {/* {book.comment.length !== 0 && 
          <ul>
            {book.comment.map(item =>(
              <Comment key={item.id} commentId={item.id}
              bookId={bookId}
              createdAt={item.createdAt}
              editedAt={item.editedAt}
              user={item.user}
              comment={item.comment} />
            ))}
          </ul>
        } */}
        <AddComment bookID={bookId} />
        </div>
  )
}