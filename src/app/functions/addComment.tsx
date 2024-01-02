"use server";

import connectMongo from "../../../utils/connectMongo";
import Book from "../../../models/bookModel";

export default async function addComment(
  bookId: string,
  comment: string,
  user: string
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
      user: user,
      comment: comment,
    };

    book.comment.push(newComment);
    await book.save();
  } catch (error) {
    console.error(error);
    return "Server Error";
  }
}
