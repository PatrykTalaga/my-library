"use server";

import fs from "fs";
import connectMongo from "../../../utils/connectMongo";
import Book from "../../../models/bookModel";
import { join } from "path";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

export default async function clearCoverStorage() {
  const session = await getServerSession(options);
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/");
  }

  try {
    await connectMongo();
    const books = await Book.find();
    let coversArray = books.map((book) => {
      return book.cover;
    });

    coversArray.push("missingCover.png");
    coversArray.push("removedCover.png");
    const path = join("public/", "bookCovers/");
    const allFiles = await fs.promises.readdir(path);

    //get files that are not existing covers from db
    let difference = allFiles.filter((x) => !coversArray.includes(x));

    if (difference.length !== 0) {
      difference.map((file) => {
        const deletePath = join("public/", "bookCovers/", file);
        fs.unlink(deletePath, function (error) {
          if (error) throw error;
        });
      });
    }
  } catch (error) {
    console.error(error);
  }
}
