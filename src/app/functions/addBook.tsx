"use server";

import connectMongo from "../../../utils/connectMongo";
import Book from "../../../models/bookModel";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

type BookType = {
  title: string;
  author: string;
  isRead: boolean;
  availability: string;
  pages: number;
  pageFormat: string;
  year: number;
  rating: number;
  review: string;
  comment: Array<{
    id: string;
    createdAt: Date;
    editedAt: Date;
    userName: string;
    userId: string;
    comment: string;
  }>;
};

export default async function addBook({
  title = "",
  author = "",
  isRead = false,
  availability = "not avaible",
  pages = 0,
  pageFormat = "",
  year = 0,
  rating = 0,
  review = "",
  comment = [],
}: BookType) {
  const session = await getServerSession(options);
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/");
  }

  if (title === "") return "Book cannot have empty title";

  const date = new Date();

  try {
    await connectMongo();
    let book = await Book.findOne({ title: title });
    if (book !== null) return "Book of this title already exists";

    const myBook = {
      title: title,
      author: author,
      cover: "", //if cover exists is saved later in submitCover function;
      //lack of this field will mess up server whenever it checks
      //path to img, it would return value undefined
      year: year,
      pages: pages,
      pageFormat: pageFormat,
      isRead: isRead,
      availability: availability,
      rating: rating,
      review: review,
      createdAt: date,
      editedAt: date,
      comment: comment,
    };

    /* const result = await Book.create(myBook); */ //returns object
    await Book.create(myBook);
    return true;
  } catch (error) {
    console.error(error);
    return "Server Error";
  }
}
