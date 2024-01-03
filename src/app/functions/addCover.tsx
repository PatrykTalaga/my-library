"use server";

import { writeFile } from "fs/promises";
import { join } from "path";
import connectMongo from "../../../utils/connectMongo";
import Book from "../../../models/bookModel";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

export default async function addCover(data: FormData, title: string) {
  const session = await getServerSession(options);
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/");
  }

  const file: File | null = data.get("cover") as unknown as File;
  if (file.size !== 0) {
    const imageId = crypto.randomUUID();

    try {
      await connectMongo();
      const book = await Book.findOne({ title: title });
      if (book === null) return false;
      //save cover
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const path = join("public/", "bookCovers/", imageId);
      await writeFile(path, buffer);
      //save new cover id in DB
      book.cover = imageId;
      await book.save();
      return imageId; //return new cover Id to reload img
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
