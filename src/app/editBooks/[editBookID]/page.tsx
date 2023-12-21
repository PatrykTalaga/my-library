import connectMongo from '../../../../utils/connectMongo';
import Book from '../../../../models/bookModel';
import BookEditForm from '@/components/BookEditForm';

import fs from 'fs';
import { join } from 'path'

type BookType = {
  id: string,
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

export default async function EditBook({params}:{params:{editBookID:string}} ){

  async function findBook(bookID:string) {
    try{
      await connectMongo();
      const book = await Book.findOne({ _id: bookID});
      return book;
    }catch(error){
      console.error(error);
    }
  }

  const book = await findBook(params.editBookID);
  if(book == null) return <h2>Serwer Error</h2>

  const bookNoId:BookType = {
    id: book._id.toString(),
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
  }
  const path = join('public/', 'bookCovers/', book.cover)
    if(book.cover !=="") {
      if(fs.existsSync(path) !== true) {
        bookNoId.cover= "bg-dark.jpg"
    }}

  return(
    <BookEditForm {...bookNoId} />
  )
}