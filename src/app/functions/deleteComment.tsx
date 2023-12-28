"use server"

import connectMongo from '../../../utils/connectMongo';
import Book from '../../../models/bookModel';

export default async function deleteComment(bookId:string, commentId:string){

  try {
    await connectMongo();
    let book = await Book.findOne({ _id: bookId});
    if(book === null) return "Book of this title does not exists";

    const newComments = book.comment.filter(
      (comment:{id:string}) => comment.id !== commentId
    )

    book.comment = newComments;
    await book.save();
  }
  catch (error) {
    console.error(error);
    return("Server Error");
  }
}