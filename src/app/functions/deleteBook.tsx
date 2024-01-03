"use server";

import { redirect } from "next/navigation";
import Book from "../../../models/bookModel";
import connectMongo from "../../../utils/connectMongo";
import { join } from "path";
import fs from "fs";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

export default async function deleteBook(id: string) {
  const session = await getServerSession(options);
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/");
  }
  try {
    await connectMongo();
    //check if book exists
    const book = await Book.findOne({ _id: id });
    if (book === null) return;
    //check if cover exists and delete it
    if (book.cover != "") {
      const path = join("public/", "bookCovers/", book.cover);
      try {
        await fs.promises.access(path, fs.constants.F_OK);
      } catch (error) {
        fs.unlinkSync(path);
        console.error(error);
      }
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
