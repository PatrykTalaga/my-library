"use server"

import connectMongo from '../../../utils/connectMongo';
import Book from '../../../models/bookModel';

export default async function editComment(bookId:string, commentId:string,
  comment:string, user:string){

  if (comment === "") return "Comment cannot be empty";

  try {
    await connectMongo();
    let book = await Book.findOne({ _id: bookId});
    if(book === null) return "Book of this title does not exists";

    const date = new Date();
    const oldComment = book.comment.filter(
      (comment:{id:string}) => comment.id == commentId
    )

    const newComment = {
      id: commentId,
      createdAt: oldComment[0].createdAt,
      editedAt: date,
      user: user,
      comment: comment
    }

    //remove old comment
    const newComments = book.comment.filter(
      (comment:{id:string}) => comment.id !== commentId
    )
    book.comment = newComments;
    //add new comment
    book.comment.push(newComment);
    await book.save();
  }
  catch (error) {
    console.error(error);
    return("Server Error");
  }
}