import connectMongo from "../../../utils/connectMongo";
import Book from "../../../models/bookModel";
import BookDetails from "../../components/BookDetails";
import Link from "next/link";

import fs from "fs";
import { join } from "path";

import DeleteBookBtn from "@/components/DeleteBookBtn";
import Comment from "@/components/Comment";
import AddComment from "@/components/AddComment";

type CommentType = {
  id: string;
  createdAt: Date;
  editedAt: Date;
  user: string;
  comment: string;
};

type BookType = {
  _id: string;
  title: string;
  cover: string;
  author: string;
  isRead: boolean;
  availability: string;
  pages: Number;
  pageFormat: String;
  year: Number;
  rating: Number;
  review: String;
  comment: Array<CommentType>;
};

export default async function BookID({
  params,
}: {
  params: { bookID: string };
}) {
  async function findBook(bookID: string) {
    try {
      await connectMongo();
      const book = await Book.findOne({ _id: bookID });
      book.comment.sort(function (a: CommentType, b: CommentType) {
        return a.editedAt.getTime() - b.editedAt.getTime();

        /* return a.editedAt - b.editedAt; */
      });
      book.comment.reverse();
      return book;
    } catch (error) {
      console.error(error);
    }
  }

  const book: BookType = await findBook(params.bookID[0]);
  if (book === null) {
    return <h1>Book not found</h1>;
  } else {
    const path = join("public/", "bookCovers/", book.cover);
    if (book.cover !== "") {
      if (fs.existsSync(path) !== true) {
        book.cover = "bg-dark.jpg";
      }
    }

    return (
      <div className="flex flex-col items-center">
        <div className="flex justify-between w-3/4">
          <div
            className="w-56 flex align-middle justify-center bg-zinc-900
            bg-opacity-80 text-4xl mb-5 px-2 py-2 border rounded-lg
              hover:scale-110"
          >
            <a href={`/${params.bookID[0]}`} className="text-3xl">
              Refresh page
            </a>
          </div>
          <Link
            href={`/editBooks/${params.bookID[0]}`}
            className="mb-5 text-xl
            bg-orange-500 w-28 text-center py-3 border-slate-950 rounded-lg
            hover:scale-110"
          >
            Edit
          </Link>
        </div>
        <BookDetails book={book} />
        <div className="flex justify-end  w-3/4">
          <DeleteBookBtn id={params.bookID[0]} />
        </div>
        <div
          className=" w-3/4 mx-auto flex
          flex-col align-baseline justify-center"
        >
          <p
            className="w-44 text-center text-2xl font-bold bg-zinc-900
            bg-opacity-80  my-2 px-2 py-2 border rounded-lg"
          >
            Comments:{" "}
          </p>
          {book.comment.length !== 0 && (
            <ul>
              {book.comment.map((item) => (
                <Comment
                  key={item.id}
                  commentId={item.id}
                  bookId={params.bookID[0]}
                  createdAt={item.createdAt}
                  editedAt={item.editedAt}
                  user={item.user}
                  comment={item.comment}
                />
              ))}
            </ul>
          )}
          <AddComment bookID={params.bookID[0]} />
        </div>
      </div>
    );
  }
}
