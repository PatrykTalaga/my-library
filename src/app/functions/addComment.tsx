"use server";

import connectMongo from "../../../utils/connectMongo";
import Book from "../../../models/bookModel";

export default async function addComment(
  bookId: string,
  comment: string,
  userName: string,
  userId: string
) {
  if (comment === "") return "Comment cannot be empty";

  try {
    await connectMongo();
    let book = await Book.findOne({ _id: bookId });
    if (book === null) return "Book of this title does not exists";

    const date = new Date();
    const id = crypto.randomUUID();

    const newComment = {
      id: id,
      createdAt: date,
      editedAt: date,
      userName: userName,
      userId: userId,
      comment: comment,
    };
    console.log("newComment: ");
    console.log(newComment);

    book.comment.push(newComment);
    await book.save();
    /* console.log("book: ");
    console.log(book); */
  } catch (error) {
    console.error(error);
    return "Server Error";
  }
}
