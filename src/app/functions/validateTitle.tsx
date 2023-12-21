"use server"

import connectMongo from '../../../utils/connectMongo';
import Book from '../../../models/bookModel';

export default async function validateTittle(title:string){
  try{
    await connectMongo();
    const result = await Book.findOne({ title: title});
    if(result == null) return true;
    return "Book of this title is already in library";
  }catch(error){
    console.error(error);
    return "Server error, book was not added  to the library";
  }
}