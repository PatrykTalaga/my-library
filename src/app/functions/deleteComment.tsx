"use server"

import connectMongo from '../../../utils/connectMongo';
import Book from '../../../models/bookModel';

export default async function deleteComment(bookId:string, commentId:string){

  console.log("Function submitComment")
  console.log(bookId)


  try {
    await connectMongo();
    let book = await Book.findOne({ _id: bookId});
    if(book === null) return "Book of this title does not exists";

    /* const newComments = book.comment.filter((item)) => {if(item.id !== commentId) return item;}) */
    const newComments = book.comment.filter(
      (comment:{id:string}) => comment.id !== commentId
    )
    console.log(newComments);
    book.comment = newComments;
    await book.save();
    
  }
  catch (error) {
    console.error(error);
    return("Server Error");
  }
}