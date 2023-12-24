"use server"

import connectMongo from '../../../utils/connectMongo';
import Book from '../../../models/bookModel';

/* export default async function addComment({bookId, comment, user}:{bookId:string, comment:string, user:string}){ */
export default async function addComment(bookId:string, comment:string, user:string){

  console.log("Function submitComment")
  console.log(bookId)

  if (comment === "") return "Comment cannot be empty";

  try {
    await connectMongo();
    let book = await Book.findOne({ _id: bookId});
    if(book === null) return "Book of this title does not exists";

    const date = new Date();
    const newComment = {
      id: crypto.randomUUID(),
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
    
  }
  catch (error) {
    console.error(error);
    return("Server Error");
  }
}

/* comment: Array<{
  id:string,
  createdAt:Date,
  editedAt:Date,
  user:string,
  comment:string
}> */