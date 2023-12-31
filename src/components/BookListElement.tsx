import Link from "next/link";
import fs from "fs";
import { join } from "path";

type BookType = {
  book: {
    title: string;
    cover: string;
    author: string;
    isRead: boolean;
    availability: string;
  };
  id: string;
};

export async function BookListElement({ book, id }: BookType) {
  const path = join("public/", "bookCovers/", book.cover);
  if (book.cover !== "") {
    try {
      await fs.promises.access(path, fs.constants.F_OK);
    } catch (error) {
      book.cover = "missingCover.png";
      console.error(error);
    }
  }

  return (
    <Link
      href={`/${id}`}
      className="bg-zinc-900 bg-opacity-80 border
      rounded-lg p-5 w-64 hover:scale-105"
    >
      <h1 className="text-2xl font-bold text-center">{book.title}</h1>
      {book.cover !== "" && (
        <img
          className="my-2 mx-auto
        h-60 object-scale-down"
          src={`/bookCovers/${book.cover}`}
        ></img>
      )}
      {book.author !== "" && (
        <p className="text-lg">
          <b>Author:</b> {book.author}
        </p>
      )}
      <p className="text-lg">
        <b>Read: </b> {book.isRead ? "Yes" : "No"}
      </p>
      <p className="text-lg">
        <b>Avaibility: </b>
        {book.availability}
      </p>
    </Link>
  );
}
