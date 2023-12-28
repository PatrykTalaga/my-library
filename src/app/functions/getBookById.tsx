"use server"

import connectMongo from '../../../utils/connectMongo';
import Book from '../../../models/bookModel';

export default async function getBookById(bookId:string) { 

  try {
    await connectMongo();
    let book = await Book.findOne({ _id: bookId});
    if(book === null) return "Book of this title does not exists";
    return book;  
  }catch(error){
    console.error(error)
  }
}