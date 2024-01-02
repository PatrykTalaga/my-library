"use server";

import { writeFile } from "fs/promises";
import { join } from "path";
import fs from "fs";
import connectMongo from "../../../utils/connectMongo";
import Book from "../../../models/bookModel";
import convertDate from "./covertDate";

export default async function sumbitCover(data: FormData, title: string) {
  const file: File | null = data.get("cover") as unknown as File;
  if (file.size !== 0) {
    const imageId = crypto.randomUUID();

    const rawDate = new Date();
    const date = convertDate(rawDate);

    try {
      await connectMongo();
      const book = await Book.findOne({ title: title });
      if (book === null) return false;
      //save cover
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const path = join("public/", "bookCovers/", imageId);
      await writeFile(path, buffer);
      //remove old cover if it exist
      const oldPath = join("public/", "bookCovers/", book.cover);
      if (fs.existsSync(oldPath)) {
        try {
          console.log(fs.existsSync(oldPath));
          console.log("here before delete");
          fs.unlinkSync(oldPath);
          console.log("here after delete");
        } catch (error) {
          console.error(error);
        }
      }
      //save new cover id in DB
      book.cover = imageId;
      book.editedAt = date;
      await book.save();
      return imageId; //return new cover Id to reload img
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
