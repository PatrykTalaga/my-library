"use client"

import { useState } from "react"
import { TextInputControlled } from "./TextInputControlled"
import { NumberInputControlled } from "./NumberInputControlled"
import { BooleanInputControlled } from "./BooleanInputControlled"
import { TextAreaInputControlled } from "./TextAreaInputControlled"

type BookType = {
  book: {
    title: string,
    cover: string,
    author: string,
    isRead: boolean,
    availability: string,
    pages: number,
    pageFormat: string,
    year: number,
    rating: number,
    review: string,
  }
}

export default function BookEditForm ({book}:BookType){
  const [newBook, setNewBook] = useState({
    title: book.title,
    cover: book.cover,
    author: book.author,
    isRead: book.isRead,
    availability: book.availability,
    pages: book.pages,
    pageFormat: book.pageFormat,
    year: book.year,
    rating: book.rating,
    review: book.review,
  });

  function isReadInput(e){
    const isReadInput = e.target.checked
    setNewBook({...newBook, isRead: !isReadInput}); //Figure out how
  }

  return(
    <div className="bg-zinc-900 bg-opacity-80 border rounded-lg flex
      w-3/4 p-5">
      {book.cover !== "" && <img className=" my-2 mx-10 h-96" 
        src={`/bookCovers/${book.cover}`}>
      </img>}


      <div className="flex">
        <div className="flex flex-col">
          <div>
            <div className="flex justify-left">
              <label className="text-lg w-32 my-auto">Title: </label>
              <input required type="text" name='title'  value={newBook.title}
                onChange={(e)=>setNewBook({...newBook, title: e.target.value})}
                className="bg-zinc-900 bg-opacity-80 border rounded-md mx-3 my-1.5"/>
            </div>
          </div>
          <TextInputControlled label={"Author: "} name={"author"} value={newBook.author}
            change={(e)=>setNewBook({...newBook, author: e.target.value})} />
          <TextInputControlled label={"Page format: "} name={"pageFormat"}
            value={newBook.pageFormat}
            change={(e)=>setNewBook({...newBook, pageFormat: e.target.value})} />
          <NumberInputControlled label={"Pages: "} name={"pages"} value={newBook.pages}
            change={(e)=>setNewBook({...newBook, pages: e.target.value})}/> 
          <BooleanInputControlled label={"Is it read: "} name={"pages"} value={newBook.pages}
            change={isReadInput} />
          
        </div>


        <div className="flex flex-col ml-5">
          <TextAreaInputControlled label={"Review: "} name={"review"} value={newBook.review}
            change={(e)=>setNewBook({...newBook, review: e.target.value})} />
        </div>
      </div>
    </div>
  )
}