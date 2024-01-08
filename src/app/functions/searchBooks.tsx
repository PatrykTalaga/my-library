"use server";

import connectMongo from "../../../utils/connectMongo";
import Book from "../../../models/bookModel";

export default async function searchBooks(text: string) {
  try {
    await connectMongo();
    if (
      (await Book.findOne({ title: { $regex: text, $options: "i" } })) !== null
    )
      return true;
    return false;
  } catch (error) {
    console.error(error);
    return "Server Error";
  }
}
