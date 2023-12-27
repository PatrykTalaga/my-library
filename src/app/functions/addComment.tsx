"use server"

import connectMongo from '../../../utils/connectMongo';
import Book from '../../../models/bookModel';
import convertDate from './covertDate';


export default async function addComment(bookId:string, comment:string, user:string){

  console.log("Function submitComment")
  console.log(bookId)

  if (comment === "") return "Comment cannot be empty";

  try {
    await connectMongo();
    let book = await Book.findOne({ _id: bookId});
    if(book === null) return "Book of this title does not exists";

    const rawDate = new Date();
    const date = convertDate(rawDate);
    console.log(date)
    const id = crypto.randomUUID();

    const newComment = {
      id: id,
      createdAt: date,
      editedAt: date,
      user: user,
      comment: comment
    }
    console.log("adding new comment: ")
    console.log(newComment)

    book.comment.push(newComment);
    const result = await book.save();
    console.log("result")
    console.log(result);
    console.log("test");
    console.log(book.createdAt);
    console.log(typeof(book.createdAt));

    
  }
  catch (error) {
    console.error(error);
    return("Server Error");
  }
}