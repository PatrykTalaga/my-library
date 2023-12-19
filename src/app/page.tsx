import mongoose from "mongoose";
import connectMongo from '../../utils/connectMongo';
import Book from '../../models/bookModel';
import { BookListElement } from "@/components/BookListElement";



export default async function Home() {

  await connectMongo();
  const books = await Book.find();

  return <>
    <ul className="grid auto-rows-max grid-flow-row grid-cols-4 gap-5 mt-15">
      {books.map(book=>(
        <BookListElement key={book._id} id={book._id.toString()} book={book} />
      ))}
    </ul>
  </>
}