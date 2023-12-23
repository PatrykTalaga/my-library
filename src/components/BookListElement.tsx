import Link from "next/link"
import fs from 'fs';
import { join } from 'path'

type BookType = {
  book: {
    /* _id: string, */
    title: string,
    cover: string,
    author: string,
    isRead: boolean,
    availability: string
  },
  id: string
}

export function BookListElement ({book, id}:BookType)  {

  const path = join('public/', 'bookCovers/', book.cover)
    if(book.cover !=="") {
      if(fs.existsSync(path) !== true) {
        book.cover = "bg-dark.jpg"
    }}

  return (
    <Link href={`/${id}`} className="bg-zinc-900 bg-opacity-80 border
      rounded-lg p-5 w-64 hover:scale-105">
      <h1 className="text-2xl font-bold text-center">{book.title}</h1>
      {fs.existsSync(path) && book.cover !== "" && <img className="my-2 mx-auto
        h-60 object-scale-down" src={`/bookCovers/${book.cover}`}>
      </img>}
      <p className="text-lg"><b>Author:</b> {book.author}</p>
      <p className="text-lg"><b>Read:</b> {book.isRead?"Yes":"No"}</p>
      <p className="text-lg"><b>Avaibility:</b>{book.availability}</p>
    </Link>
  )
}

 