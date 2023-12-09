import mongoose from "mongoose";
import connectMongo from '../../utils/connectMongo';
import Book from '../../models/bookModel';
import Link from 'next/link'
import { Unlock } from "next/font/google";

export default async function Home() {

  const books = await Book.find()

  return <>
    <ul className="grid auto-rows-max grid-flow-row grid-cols-4 gap-5 mt-15">
      {books.map(book=>(
        <Link href="/" key={book._id} className="bg-slate-700 border rounded-lg w-fit p-5">
          <h1 className="text-2xl font-bold">{book.title}</h1>
          <p className="text-lg">{book.cover}</p>
          <p className="text-lg"><b>Author:</b> {book.author}</p>
          <p className="text-lg"><b>Read:</b> {book.isRead?"Yes":"No"}</p>
          <p className="text-lg"><b>Avaibility:</b> {book.isOnTheShelf?"On the shelf":"Not Avaiable"}</p>
        </Link>
      ))}
    </ul>
  </>
}