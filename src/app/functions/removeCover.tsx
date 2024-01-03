"use server";

import { join } from "path";
import fs from "fs";
import connectMongo from "../../../utils/connectMongo";
import Book from "../../../models/bookModel";
import convertDate from "./covertDate";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

export default async function removeCover(title: string) {
  const session = await getServerSession(options);
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/");
  }

  const rawDate = new Date();
  const date = convertDate(rawDate);
  let oldPath: string;

  try {
    await connectMongo();
    const book = await Book.findOne({ title: title });
    if (book === null) return false;
    if (book.cover == "") return false;

    oldPath = join("public/", "bookCovers/", book.cover);
    book.cover = "";
    book.editedAt = date;
    await book.save();

    await fs.promises.access(oldPath, fs.constants.F_OK);
    fs.unlink(oldPath, function (error) {
      if (error) throw error;
    });

    return "removedCover.png"; //return new cover Id to reload img
  } catch (err) {
    console.error(err);
    return false;
  }
}
