"use server";

import { redirect } from "next/navigation";
import Book from "../../../models/bookModel";
import connectMongo from "../../../utils/connectMongo";
import { join } from "path";
import fs from "fs";

export default async function deleteBook(id: string) {
  try {
    await connectMongo();
    //check if book exists
    const book = await Book.findOne({ _id: id });
    if (book === null) return;
    //check if cover exists and delete it
    if (book.cover != "") {
      const path = join("public/", "bookCovers/", book.cover);
      if (fs.existsSync(path) == true) fs.unlinkSync(path);
    }
    //delete book
    const result = await Book.deleteOne({ _id: id });
    if (result.acknowledged !== true) return false;
  } catch (error) {
    console.error(error);
    return false;
  }
  redirect("/");
}
